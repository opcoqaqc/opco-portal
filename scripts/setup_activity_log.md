# Activity log setup (Google Apps Script + Sheet)

The site posts every login / logout / tab change / document open / download
to a Google Sheet via a Google Apps Script web app. The admin panel reads
back from the same script.

## One-time setup (you do this in your Google account)

1. **Create the sheet**
   - Open Google Drive → New → Google Sheets
   - Rename it: **OPCO Portal Activity Log**
   - Leave it empty — the first POST will add headers automatically.

2. **Open the bound script editor**
   - In the sheet: **Extensions → Apps Script**

3. **Paste the code**
   - Delete everything in `Code.gs`.
   - Open `scripts/apps_script_log.gs` from this repo and paste the entire
     content into `Code.gs`.
   - At the top, **change** `SHARED_SECRET = 'CHANGE_ME_TO_RANDOM_STRING'` to
     any random string you choose (e.g. `'opco-2026-x4r7w9'`). Remember it —
     the site needs the same value.
   - Save (Ctrl+S). When prompted, name the project (e.g. `OPCO Log`).

4. **Deploy as a web app**
   - **Deploy** → **New deployment**
   - Click the gear icon ⚙️ → **Web app**
   - Description: `OPCO Portal Log v1`
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**.
   - Authorize the script the first time (Google will warn it's
     "unverified" — that's normal for a personal script; click Advanced →
     "Go to OPCO Log (unsafe)" → Allow).
   - Copy the **Web app URL** (ends with `/exec`).

5. **Send the URL + secret to me**
   - You'll get two things from the deployment dialog:
     - **Web app URL** — something like `https://script.google.com/macros/s/AKfy.../exec`
     - The **SHARED_SECRET** you chose in step 3.
   - I'll paste both into `static/_tracking.js` and the admin page.

## What gets logged

| event          | when                                  | detail field                  |
|----------------|---------------------------------------|-------------------------------|
| `login`        | password verified                     | username                      |
| `logout`       | signout button clicked                | (empty)                       |
| `page_load`    | every page navigation                 | (empty)                       |
| `tab`          | band-tile / portal-tile click         | tab key (qms/projects/...)    |
| `doc_view`     | click on a non-download doc link      | doc title + file id           |
| `doc_download` | click on a `?export=download` link    | doc title + file id           |

Each row also captures: timestamp, user (from session), page URL,
browser user-agent, referrer.

## Re-deploying (after I edit `apps_script_log.gs`)

- Apps Script editor → **Deploy → Manage deployments**
- Click the pencil on the existing deployment
- **Version:** New version (don't pick `Head`)
- Deploy. The URL stays the same; the code updates.

## Bumping the secret

If the secret leaks or you just want to rotate it:
1. Edit `SHARED_SECRET` in Apps Script + redeploy
2. Tell me the new value — I'll update the site

## Quotas (free tier)

- Apps Script execution: 6 hours/day, ~20K invocations/day. We're nowhere
  near this — 12 users × 50 events/day ≈ 600 invocations.
- Sheet size: 10M cells. With 7 cols × 600 events/day, that's ~14 years
  of headroom.
