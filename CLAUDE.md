# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal/faculty homepage (Warren MacEvoy, Colorado Mesa University) built with Next.js (pages router) and statically exported to GitHub Pages. There is no backend, database, or API — every page is prerendered HTML/React served from `out/`.

A separate, unrelated C utility (`shredder.c` / `shredder.sh`) for securely deleting files also lives in this repo (used by the deploy scripts to scrub SSH/GPG credentials that get temporarily copied into the repo for a Dockerized deploy — see below).

## Commands

All commands run via npm from the repo root (Node >= 18):

- `npm run dev` — rebuild then start the Next.js dev server (`next dev`)
- `npm run build` — install deps, update browserslist, `next build` (static export to `out/` per `output: 'export'` in `next.config.js`)
- `npm run start` — rebuild then `next start`
- `npm run clean` — remove `node_modules/.cache` and `out/`
- `npm run deploy` — clean, build, then publish `out/` to the `gh-pages` branch via `gh-pages -d out -t true`

There is no lint or test suite configured in this repo — don't invent `npm run lint`/`npm test` commands.

### Docker-based build/dev/deploy

The Docker scripts exist so builds/deploys don't require Python/Node/gcc installed on the host (the container also compiles the `shredder` C binary via gcc/libsodium):

- `./docker-build.sh` — builds the `github-pages-nextjs-py3` image and runs `npm run build` inside it
- `./docker-start.sh` — runs `npm run dev` in a detached container on port 3000, tracks the container id in `docker.id`, tails logs
- `./docker-stop.sh` — stops the container recorded in `docker.id`
- `./docker-deploy.sh` — copies the host's `~/.gnupg`, `~/.ssh`, `~/.gitconfig` into `private/home/$EMAIL` (git-ignored), bind-mounts that as `/root` in the container, and runs `npm run deploy` inside it so `gh-pages` can push with the user's real git identity/credentials. On exit it always shreds (`shredder.sh`) and removes that temporary credentials copy — do not disable or skip this cleanup when touching this script.

### shredder.c / shredder.sh

`shredder.sh` (bash, single-pass overwrite+rename) and `shredder.c` (multi-threaded, libsodium CSPRNG-based, overwrite+rename+unlink) are two independent implementations of the same secure-delete tool, used to scrub the temporary credential copy created by `docker-deploy.sh`. They are not part of the website build. When editing one, check whether the other needs the equivalent change — they're meant to have matching semantics (recursively shred file contents, then rename to a random name before removal).

Files ending in `-` (e.g. `shredder.c-`, `pages/components/schedule.js-`) are backup/scratch copies left in-place, not build artifacts — treat them as the user's own leftovers, not something to silently delete.

## Architecture

**Routing**: `next.config.js` sets `output: 'export'` and a custom `exportPathMap` that hardcodes the exported routes: `/`, `/home`, `/teaching`, `/research`, `/resources`, `/contact` (all mapping to their same-named page component). When adding a new top-level page, it must be added to `exportPathMap` or it won't be exported/included in the static site.

**Page/Layout pattern**: Every page (`pages/home.jsx`, `teaching.jsx`, `research.jsx`, `resources.jsx`, `contact.jsx`) is a class component that wraps its content in the shared `pages/layout.jsx`, passing `currentPage="..."` so `Navigation` can highlight the active nav link. `Layout` renders `Head` (title/favicon/meta), `Banner`, `Navigation`, the page's `children`, then `Footer`. All components in this codebase are written as ES class components (not hooks/functional), including ones with no real internal state — follow that convention for consistency rather than introducing hooks.

**Styling**: Bootstrap 4 (loaded via CDN `<link>`/`<script>` tags in `pages/_document.js`, alongside jQuery/Popper) plus a static `public/assets/style.css` and Next's own `styles/globals.css`/`Home.module.css`. Bootstrap utility classes (`col-sm-*`, `row`, `jumbotron`, etc.) are used directly in JSX rather than CSS modules for page layout.

**Content-as-data**: Several pages pull their list content from JSON files under `pages/components/data/` (`courses.json`, `publications.json`, `cybergames.json`, `background.json`) rather than hardcoding it in JSX — update the JSON to change course lists/publications/etc., not the component markup.

**Schedule rendering pipeline** (`pages/teaching.jsx` → `pages/components/schedule.js`): The weekly class schedule is *not* an HTML `<table>` written by hand. `schedule.js` holds the semester's schedule as data (`time`/`day` range + `items: [{name, loc, days, time}]`) and hands it to `ScheduleBuilder` (`lib/schedulebuilder.js`), which:
1. Converts times/days to row/column indices at 5-minute row granularity via `lib/daytime.js` (`parseTime`/`formatTime`/`parseDay`/`formatDay` — handles 12h/24h/noon/midnight strings).
2. Places each item and header/rule into a `TableBuilder` (`lib/tablebuilder.js`), a generic rowspan/colspan grid builder that detects cell overlaps (throws `Cell overlap at row=…, col=…`) and renders the final `<table>`.

To update the schedule each semester, edit the `state` object in `pages/components/schedule.js` (semester label, time/day range, `items` array) — the row/column layout, spanning, and print-specific CSS (`print-hide`/`print-full`/`print-reset` classes, `@media print` rules in `styles/globals.css`) are handled automatically by this pipeline. There is also `pages/components/spring_schedule.js`, an alternate/prior semester's schedule component using the same builder — check which one `teaching.jsx` actually imports before assuming it's live.

**Deploy credentials**: The Docker deploy flow assumes the host already has working `git`/`ssh`/`gpg` config for pushing to `gh-pages`; it copies those into the container rather than baking any credentials into the image or repo.
