#!/bin/bash

# Check if the docker.run file exists
if [ ! -f docker.id ]; then
  echo "No running container found (docker.id file is missing)."
  exit 0
fi

# Read the container ID from the file
ID=$(cat docker.id)

# If the container is not running, just remove the id file to avoid fragility
if ! docker ps -q --no-trunc | grep -q "^$ID$"; then
  echo "Container $ID not running; removing docker.id."
  rm -f docker.id
  exit 0
fi

# Stop the Docker container
if docker stop "$ID"; then
  echo "Container stopped successfully."
  rm -f docker.id
else
  echo "Failed to stop the container."
  exit 1
fi
