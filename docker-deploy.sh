#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

docker run -v "$(pwd)":/app -p 3000:3000 --rm github-pages-nextjs-py3 npm run deploy
