#!/bin/bash

shopt -s nullglob dotglob

shredder() {
    local file

    for file in "$@"; do
        if [ -f "$file" ]; then
            # Get file size in KB, ensuring at least 1KB
            kb=$(du -k "$file" | cut -f1)
            kb=$((kb < 1 ? 1 : kb))

            # Overwrite the file with random data and then with zeros
            dd if=/dev/urandom of="$file" bs=1K count="$kb" conv=notrunc > /dev/null 2>&1
            dd if=/dev/zero of="$file" bs=1K count="$kb" conv=notrunc > /dev/null 2>&1

        elif [ -d "$file" ]; then
            # Recursively shred and rename contents of the directory first
            shredder "$file"/*
        fi

        # Rename the file or directory after processing
        if [ "$file" != "." -a "$file" != ".." ]; then
            to="$(dirname "$file")/$(head -c 8 /dev/urandom | xxd -p)"
            mv -- "$file" "$to" > /dev/null 2>&1
        fi
    done
}

shredder "$@"
