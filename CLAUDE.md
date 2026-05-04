# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A static-site **document portal** for OPCO's Quality Management System. The deployed site has these pages:

- `index.html` — the **portal landing / login** page (manually maintained in `static/index.html`)
- `toolkit.html` — calculators page (manually maintained in `static/toolkit.html`). Loads `toolkit.bundle.js` (the giant minified JS, extracted out of the HTML so subpages can share it).
- `welders.html` — Welder Qualification, derived from `toolkit.html` by `scripts/build_subpages.py` (or by the inline regen logic): same DOM but tab nav hidden, `welders` tab pre-activated.
- `projects.html` — Ongoing Projects dashboard, derived the same way (`projects` tab pre-activated). Source of truth for both subpages is `static/toolkit.html`; if you change toolkit, regenerate the subpages.
- `documents.html` — **auto-generated** every 15 min from Google Drive contents

There is no backend. Auth is fully client-side: a password-hash table lives in `scripts/auth_guard.html` and is checked in the user's browser. Sessions are stored in `localStorage` under `__opco_session_v1`.

## The regeneration pipeline

This is the architecture you must understand to be productive. It is orchestrated by `.github/workflows/regenerate.yml` on a `*/15 * * * *` cron (and on push to `static/**` or `scripts/**`):

1. **`scripts/collect_drive_links.py`** — walks the Google Drive folder named `OPCO Portal Documents` (or `DRIVE_ROOT_FOLDER_ID`) using a service-account JSON in `GOOGLE_SERVICE_ACCOUNT_JSON`, and writes every file/folder it finds to `drive_links.csv` (columns: `path,name,type,id,link,mime`).
2. **`scripts/generate_html.py`** — reads `drive_links.csv` and rewrites the `<!-- GEN-START: <panel-id> -->` / `<!-- GEN-END: <panel-id> -->` blocks inside the **root `index.html`** (the auto-generated documents page, *not* `static/index.html`). It also updates tab counters via `<span class="count" data-count="...">`.
3. **`scripts/inject_auth.py`** — takes the generator's output, strips the legacy login overlay baked into the original document portal HTML, obfuscates the auth guard JS with `javascript-obfuscator`, injects it right after `<body>`, swaps the favicon, and writes `documents.html`. **Idempotent**: it removes any prior `<!-- ===== OPCO PORTAL AUTH GUARD ===== -->` block before re-injecting.
4. The workflow assembles `deploy_pkg/` = `static/index.html` + `static/toolkit.html` + `documents.html` and `netlify deploy --prod`s it. It then commits the regenerated root `index.html` back to `main` (GitHub Pages backup).

The root `index.html` is therefore a **build artifact** that gets committed — do not hand-edit it for content changes; edit the generator instead. Hand-editing chrome (CSS, layout outside the GEN-START blocks) is fine, since the generator only rewrites between markers.

## Local commands

```bash
pip install -r scripts/requirements.txt
npm install -g javascript-obfuscator    # required by inject_auth.py

# Reproduce the CI pipeline locally:
GOOGLE_SERVICE_ACCOUNT_JSON="$(cat service_account.json)" \
DRIVE_ROOT_FOLDER_NAME='OPCO Portal Documents' \
  python scripts/collect_drive_links.py        # -> drive_links.csv

HTML_FILE=index.html CSV_FILE=drive_links.csv \
  python scripts/generate_html.py              # rewrites GEN-START/END blocks in index.html

INPUT_HTML=index.html OUTPUT_HTML=documents.html \
AUTH_GUARD_FILE=scripts/auth_guard.html FAVICON_FILE=scripts/favicon.txt \
  python scripts/inject_auth.py                # -> documents.html
```

There is no test suite, linter, or build system beyond the above. `inject_auth.py` ends with sanity asserts (auth-guard marker present, no plaintext usernames leaked).

## Document classification (generate_html.py)

The HTML structure is driven by hardcoded tables at the top of `generate_html.py`. Knowing these saves you from re-deriving them:

- **`QMS_DEPTS`** — 9 panels keyed `qms-{qcd,hse,adm,hrd,whs,prd,pcd,fnd,com}`, each mapped to `OPCO Portal Documents/QMS/{1-9}-{DEPT}` in Drive.
- **`PROJECTS`** — 3 panels `project-{htu,hpu,ppcl}`.
- **`LIBRARY_SECTIONS`** — `library-{pqr,wps,wqt}`. Each emits **3 panels** in one GEN-block (one per Drive subfolder: `PIPELINE`, `PIPING`, `IN-SERVICE` → slugs `pipeline`, `piping`, `inservice`).
- Most panels group files by **doc-type prefix** extracted from the filename via the regex `-([A-Z]{2,4})-\d` (last match wins). Prefixes are mapped through `PREFIX_NAMES`, ordered by `PREFIX_ORDER`, and tagged with `data-qms-group="…"` from `PREFIX_TO_GROUP` (the front-end uses these for filter pills).
- Two panels group **by Drive subfolder** instead of by prefix: `qms-hse` (uses `_build_hse_by_folder` with a fixed slug map) and `project-hpu` (auto-slugged folder names).
- Document codes matching `OPCO-[A-Z0-9]+(-[A-Z0-9]+)+` are surfaced as the meta line; the filename minus extension is the title. Files link to `https://drive.google.com/uc?export=download&id={id}`.

When the Drive folder structure changes, **the source of truth is these tables** — not the HTML.

## Auth guard notes

- `scripts/auth_guard.html` is the **plaintext** source. Usernames + SHA-256 password hashes are listed there. The injection step obfuscates the `<script>` body before it ships, so don't rely on any specific minified form when reading deployed HTML.
- Adding/removing a user = edit the `__OPCO_USERS` map in `auth_guard.html`. Do not edit `documents.html` directly.
- The guard runs *only* on `documents.html`. The portal landing (`static/index.html`) implements its own login overlay (`#__opco_auth_overlay`) which writes the same `__opco_session_v1` localStorage key that the guard reads — keep these two in sync if you change the session schema.
- Session expiry is enforced client-side via `s.exp` (epoch ms). Expired or unknown-user sessions bounce to `./` (the portal landing).

## Conventions worth knowing

- Source files mix English and Turkish comments; both are fine.
- All scripts read config via env vars and exit non-zero on missing inputs — match this pattern when adding new pipeline steps so the workflow surfaces failures.
- The workflow commits regenerated `index.html` as `opco-portal-bot`. Do not block on that commit when iterating locally; the CI run is authoritative.
