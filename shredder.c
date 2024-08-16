#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <dirent.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <libgen.h>

// Function to get the size of the file in kilobytes
long get_file_size_kb(const char *file) {
    struct stat st;
    if (stat(file, &st) != 0) {
        perror("stat");
        return -1;
    }
    long kb = (st.st_size+1023)/1024;
    return kb < 1 ? 1 : kb;
}

// Function to overwrite a file with random data
void overwrite_file(const char *file, long size_kb) {
    int fd = open(file, O_WRONLY);
    if (fd < 0) {
        perror("open");
        return;
    }

    int urandom_fd = open("/dev/urandom", O_RDONLY);
    if (urandom_fd < 0) {
        perror("open /dev/urandom");
        close(fd);
        return;
    }

    char buffer[1024];
    for (long i = 0; i < size_kb; i++) {
        if (read(urandom_fd, buffer, sizeof(buffer)) < 0) {
            perror("read /dev/urandom");
            close(fd);
            close(urandom_fd);
            return;
        }

        if (write(fd, buffer, sizeof(buffer)) < 0) {
            perror("write");
            close(fd);
            close(urandom_fd);
            return;
        }
    }

    close(fd);
    close(urandom_fd);
}

// Function to generate a random string for renaming
void generate_random_string(char *str, size_t size) {
    int urandom_fd = open("/dev/urandom", O_RDONLY);
    if (urandom_fd < 0) {
        perror("open /dev/urandom");
        exit(1);
    }

    const char charset[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    unsigned char random_byte;
    for (size_t i = 0; i < size - 1; i++) {
        if (read(urandom_fd, &random_byte, 1) < 0) {
            perror("read /dev/urandom");
            close(urandom_fd);
            exit(1);
        }
        str[i] = charset[random_byte % (sizeof(charset) - 1)];
    }
    str[size - 1] = '\0';

    close(urandom_fd);
}

// Function to shred files and directories recursively
void shredder(const char *path) {
    struct stat path_stat;
    if (stat(path, &path_stat) != 0) {
        perror("stat");
        return;
    }

    if (S_ISREG(path_stat.st_mode)) {
        // It's a file, get its size and overwrite it
        long size_kb = get_file_size_kb(path);
        if (size_kb > 0) {
            overwrite_file(path, size_kb);
        }
    } else if (S_ISDIR(path_stat.st_mode)) {
        // It's a directory, open it and process its contents
        DIR *dir = opendir(path);
        if (!dir) {
            perror("opendir");
            return;
        }

        struct dirent *entry;
        char subpath[4096];
        while ((entry = readdir(dir)) != NULL) {
            if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
                continue;
            }
            snprintf(subpath, sizeof(subpath), "%s/%s", path, entry->d_name);
            shredder(subpath);
        }
        closedir(dir);
    }

    // Generate a random name and rename the file or directory
    char new_name[9];
    generate_random_string(new_name, sizeof(new_name));
    char new_path[4096];
    snprintf(new_path, sizeof(new_path), "%s/%s", dirname(strdup(path)), new_name);

    if (rename(path, new_path) != 0) {
        perror("rename");
    }
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <files/directories>\n", argv[0]);
        return 1;
    }

    for (int i = 1; i < argc; i++) {
        shredder(argv[i]);
    }

    return 0;
}
