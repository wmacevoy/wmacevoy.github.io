#!/bin/bash
docker run -v "$(pwd)":/app -p 3000:3000 --rm github-pages-nextjs-py3 npm run dev
