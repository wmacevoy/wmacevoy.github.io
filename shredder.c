#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <dirent.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <libgen.h>
#include <pthread.h>
#include <sodium.h>

// ------------------- CPRNG -------------------------------------
// Same as before

typedef struct
{
    uint64_t seed[(randombytes_SEEDBYTES + 7) / 8];
    uint64_t ctr;
} cprng_t;

void cprng_init(cprng_t *me, cprng_t *from);
void cprng_read(cprng_t *me, size_t n, void *data);
void cprng_fini(cprng_t *me);

void cprng_init(cprng_t *me, cprng_t *from)
{
    if (from == NULL)
    {
        randombytes_buf(me->seed, sizeof(me->seed));
    }
    else
    {
        cprng_read(from, sizeof(me->seed), (unsigned char *)me->seed);
    }
    me->ctr = 0;
}

void cprng_read(cprng_t *me, size_t size, void *data)
{
    me->seed[0] ^= me->ctr;
    randombytes_buf_deterministic(data, size, (unsigned char *)me->seed);
    me->seed[0] ^= me->ctr;
    me->ctr += 1;
}

void cprng_fini(cprng_t *me)
{
    sodium_memzero(me, sizeof(*me));
}

// ------------------- UTILITY ------------------------------------

// Get file size in bytes
static off_t get_file_size(const char *file)
{
    struct stat st;
    if (stat(file, &st) != 0)
    {
        perror(file);
        return -1;
    }
    return st.st_size;
}

// Overwrite a file with random data, single pass
int overwrite_file(const char *file, cprng_t *cprng)
{
    off_t size = get_file_size(file);
    if (size < 0)
    {
        return -1;
    }

    // Round up to 512 bytes
    off_t rounded_size = 512 * ((size / 512) + 1);

    int fd = open(file, O_WRONLY);
    if (fd < 0)
    {
        perror("open");
        return -1;
    }

    unsigned char buffer[64 * 1024];
    off_t written = 0;

    while (written < rounded_size)
    {
        size_t chunk = (rounded_size - written < (off_t)sizeof(buffer))
                           ? (size_t)(rounded_size - written)
                           : sizeof(buffer);

        cprng_read(cprng, chunk, buffer);

        // handle partial writes carefully
        size_t offset = 0;
        while (offset < chunk)
        {
            ssize_t ret = write(fd, buffer + offset, chunk - offset);
            if (ret < 0)
            {
                perror("write");
                close(fd);
                return -1;
            }
            offset += (size_t)ret;
        }

        written += chunk;
    }

    fsync(fd); // flush
    close(fd);
    return 0;
}

static const char charset[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Generate random string of length n
void generate_random_string(char *str, size_t n, cprng_t *cprng)
{
    uint32_t *rnd = malloc(n * sizeof(uint32_t));
    if (!rnd)
    {
        fprintf(stderr, "Out of memory in generate_random_string\n");
        exit(1);
    }
    cprng_read(cprng, n * sizeof(uint32_t), rnd);
    size_t charset_len = strlen(charset);

    for (size_t i = 0; i < n; i++)
    {
        str[i] = charset[rnd[i] % charset_len];
    }
    str[n] = '\0';
    free(rnd);
}

// ------------------- FILE QUEUE ----------------------------------

// We store 'char *' paths. Workers can push new subpaths for directories.

typedef struct
{
    char **files;
    size_t max_size;
    size_t head;
    size_t tail;
    size_t size; // number of items in queue
    pthread_mutex_t mutex;
    pthread_cond_t change;

    int closed;       // if 1, no more pushes
    int active_count; // number of tasks actively being processed
} file_queue_t;

// Initialize
void file_queue_init(file_queue_t *me, size_t max_size)
{
    me->max_size = max_size;
    me->files = calloc(max_size, sizeof(char *));
    me->head = 0;
    me->tail = 0;
    me->size = 0;
    pthread_mutex_init(&me->mutex, NULL);
    pthread_cond_init(&me->change, NULL);
    me->closed = 0;
    me->active_count = 0;
}

// Close the queue (no more pushes). Usually called
// when we know no further items will be added.
static void file_queue_close(file_queue_t *me)
{
    me->closed = 1;
    pthread_cond_broadcast(&me->change);
}

// Destroy the queue
void file_queue_fini(file_queue_t *me)
{
    // free any remaining strings
    for (size_t i = 0; i < me->size; i++)
    {
        size_t index = (me->head + i) % me->max_size;
        free(me->files[index]);
    }
    free(me->files);

    pthread_cond_destroy(&me->change);
    pthread_mutex_destroy(&me->mutex);
}

// Push a path onto the queue
int file_queue_push(file_queue_t *me, const char *path)
{
    pthread_mutex_lock(&me->mutex);

    if (me->closed)
    {
        // Queue closed, cannot push
        pthread_mutex_unlock(&me->mutex);
        return -1;
    }

    // Wait for space
    while (me->size >= me->max_size)
    {
        pthread_cond_wait(&me->change, &me->mutex);
    }

    // Copy the path
    size_t len = strlen(path);
    char *copy = malloc(len + 1);
    if (!copy)
    {
        fprintf(stderr, "Out of memory in file_queue_push\n");
        pthread_mutex_unlock(&me->mutex);
        exit(1);
    }
    strcpy(copy, path);

    // Insert
    me->files[me->tail] = copy;
    me->tail = (me->tail + 1) % me->max_size;
    me->size++;

    pthread_cond_broadcast(&me->change);
    pthread_mutex_unlock(&me->mutex);
    return 0;
}

// Pop a path from the queue. Returns NULL if queue is closed & empty.
char *file_queue_pop(file_queue_t *me)
{
    pthread_mutex_lock(&me->mutex);

    for (;;)
    {
        if (me->size > 0)
        {
            // We have an item
            char *res = me->files[me->head];
            me->files[me->head] = NULL;
            me->head = (me->head + 1) % me->max_size;
            me->size--;

            // We are now "active" on this item
            me->active_count++;

            pthread_cond_broadcast(&me->change);
            pthread_mutex_unlock(&me->mutex);
            return res;
        }
        else
        {
            // queue is empty
            if (me->closed)
            {
                // closed & empty → no more items
                pthread_mutex_unlock(&me->mutex);
                return NULL;
            }
            // else wait for something to be pushed
            pthread_cond_wait(&me->change, &me->mutex);
        }
    }
}

// Mark current item as done, possibly close queue if empty & no actives
static void file_queue_task_done(file_queue_t *me)
{
    pthread_mutex_lock(&me->mutex);
    me->active_count--;

    // If no active tasks remain and queue is empty, we can close
    if (me->active_count == 0 && me->size == 0 && !me->closed)
    {
        file_queue_close(me);
    }

    pthread_cond_broadcast(&me->change);
    pthread_mutex_unlock(&me->mutex);
}

// ------------------- WORKERS -------------------------------------

typedef struct
{
    pthread_t thread;
    cprng_t cprng;
    file_queue_t *queue;
} worker_t;

static void *worker_run(void *arg);

// Initialize a worker
void worker_init(worker_t *me, file_queue_t *queue)
{
    cprng_init(&me->cprng, NULL);
    me->queue = queue;
    pthread_create(&me->thread, NULL, worker_run, me);
}

// Worker main loop
static void *worker_run(void *arg)
{
    worker_t *me = (worker_t *)arg;

    for (;;)
    {
        char *path = file_queue_pop(me->queue);
        if (!path)
        {
            // Queue closed & empty
            break;
        }

        // rename to random name
        char new_name[16]; // enough for 8 random chars + null
        generate_random_string(new_name, 8, &me->cprng);
        char *path_copy = strdup(path);
        if (path_copy)
        {
            char *d = dirname(path_copy);
            char new_path[4096];
            snprintf(new_path, sizeof(new_path), "%s/%s", d, new_name);
            if (rename(path, new_path) != 0)
            {
                fprintf(stderr, "rename '%s'->'%s' failed\n", path, new_path);
                perror("rename");
            } else {
                free(path);
                path = strdup(new_path);
            }
            free(path_copy);
        }
        struct stat st;
        if (stat(path, &st) == 0)
        {
            if (S_ISREG(st.st_mode))
            {
                overwrite_file(path, &me->cprng);
            }
            else if (S_ISDIR(st.st_mode))
            {
                // Open dir and push subpaths
                DIR *dir = opendir(path);
                if (dir)
                {
                    struct dirent *ent;
                    while ((ent = readdir(dir)) != NULL)
                    {
                        // skip . and ..
                        if (!strcmp(ent->d_name, ".") || !strcmp(ent->d_name, ".."))
                        {
                            continue;
                        }
                        char subpath[4096];
                        snprintf(subpath, sizeof(subpath), "%s/%s", path, ent->d_name);
                        file_queue_push(me->queue, subpath);
                    }
                    closedir(dir);
                }
            }
        }
        else
        {
            perror(path);
        }

        free(path);

        // Mark this task done. This may trigger queue closure if empty & no active tasks
        file_queue_task_done(me->queue);
    }

    cprng_fini(&me->cprng);
    return NULL;
}

// ------------------- MAIN ----------------------------------------

int main(int argc, char *argv[])
{
    if (sodium_init() < 0)
    {
        fprintf(stderr, "libsodium init failed\n");
        return 1;
    }

    if (argc < 2)
    {
        fprintf(stderr, "Usage: %s <files/directories>\n", argv[0]);
        return 1;
    }

    // Initialize queue (big enough for a typical job)
    file_queue_t queue;
    file_queue_init(&queue, 1024);
    // Main thread is active worker while initializing queue,
    // there are no other threads, so no locks here.
    ++queue.active_count;

    // Create workers
    const int nworkers = 4;
    worker_t workers[nworkers];
    for (int i = 0; i < nworkers; i++)
    {
        worker_init(&workers[i], &queue);
    }

    // Push initial items
    for (int i = 1; i < argc; i++)
    {
        file_queue_push(&queue, argv[i]);
    }
    // Finish initializing
    file_queue_task_done(&queue);
    // DO NOT close queue here, because workers will discover subdirs & push new paths

    // Wait for workers to finish
    // They will close the queue themselves when no tasks remain
    for (int i = 0; i < nworkers; i++)
    {
        pthread_join(workers[i].thread, NULL);
    }

    // Cleanup queue
    file_queue_fini(&queue);
    return 0;
}