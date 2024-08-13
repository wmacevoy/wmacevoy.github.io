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

if [ $? -eq 0 ]; then
  echo "$TAG started successfully with ID: $ID"
  echo "$ID" > docker.id
  echo "Stop with docker-stop.sh"
else
  echo "Failed to start the container."
  exit 1
fi
