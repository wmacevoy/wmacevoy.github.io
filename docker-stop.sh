#!/bin/bash

# Check if the docker.run file exists
if [ ! -f docker.id ]; then
  echo "No running container found (docker.id file is missing)."
  exit 1
fi

# Read the container ID from the file
ID=$(cat docker.id)

# Stop the Docker container
docker stop "$ID"

# Check if the container stopped successfully
if [ $? -eq 0 ]; then
  echo "Container stopped successfully."
  rm -f docker.id
else
  echo "Failed to stop the container."
  exit 1
fi
