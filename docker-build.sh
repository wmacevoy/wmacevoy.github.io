#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "building docker container..."
if ! docker build -t github-pages-nextjs-py3 .
then
    echo "docker build failed"
    exit 1
fi

echo "using docker container to build site..."
docker run -v "$(pwd)":/app --rm github-pages-nextjs-py3 npm run build
