#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

cleanup() {
    if [ "$REPO_HOME" != "" -a -d "$REPO_HOME" ]
    then
        ./shredder.sh "$REPO_HOME"
        /bin/rm -rf "$REPO_HOME"
    fi
}

# Trap signals and call cleanup on exit
trap cleanup EXIT
trap cleanup SIGHUP
trap cleanup SIGINT
trap cleanup SIGTERM


if [ -f docker.id ]
then
    echo "stopping dev docker (start it again after the deployment)"
    ./docker-stop.sh
fi

# work with repo in container
if ! git config --get-all safe.directory | grep -q "^/app$"
then
  git config --add safe.directory /app
fi

# get the repo base directory
REPO="$(cd "$(git rev-parse --show-toplevel)" && pwd)"

EMAIL="$(git config --global user.email)"

REPO_HOME="$REPO/private/home/$EMAIL"

/bin/rm -rf "$REPO_HOME"
mkdir -p "$REPO_HOME"

for cfg in .gnupg .ssh .config .gitconfig
do
    cp -r "$HOME/$cfg" "$REPO_HOME/$cfg"
done

docker run -v "$REPO_HOME:/root" -v "$(pwd)":/app --rm github-pages-nextjs-py3 npm run deploy
