#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
elif [ -f package-lock.json ]; then npm ci; \
elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
else echo "Lockfile not found." && exit 1; \
fi

