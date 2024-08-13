#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

TAG=github-pages-nextjs-py3

if [ -f docker.id ]
then
    ID=$(cat docker.id)
    echo "$TAG is already running as $ID - use docker-stop.sh to stop it"
    exit 1
fi

ID=$(docker run -d -v "$(pwd)":/app -p 3000:3000 --name "$NAME" --rm "$TAG" npm run dev)

function cleanup {
    echo "Stopping the container..."
    ./docker-stop.sh
    exit
}

if [ $? -eq 0 ]; then
    echo "$ID" > docker.id
    trap cleanup SIGINT
    docker logs -f $ID
else
  echo "Failed to start the container."
  exit 1
fi
