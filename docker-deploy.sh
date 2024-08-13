#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# work with repo in container
if ! git config --get-all safe.directory | grep -q "^/app$"
then
  git config --add safe.directory /app
fi

# get the repo base directory
REPO="$(cd "$(git rev-parse --show-toplevel)" && pwd)"

EMAIL="$(git config --global user.email)"

REPO_HOME="$REPO/private/home/$EMAIL"

mkdir -p "$REPO_HOME"

for cfg in .gnupg .ssh .config .gitconfig
do
    if [ ! -r "$REPO_HOME/$cfg" -a -r "$HOME/$cfg" ] ; then
	cp -r "$HOME/$cfg" "$REPO_HOME/$cfg"
    fi
done

docker run -v "$REPO_HOME:/root" -v "$(pwd)":/app --rm github-pages-nextjs-py3 npm run deploy
