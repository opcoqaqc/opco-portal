/**
 * OPCO Portal Activity Log — Google Apps Script (bound to a spreadsheet).
 * Deploys as a Web App. The portal posts events here; the admin panel
 * pulls them back via doGet().
 *
 * Setup:
 *  1. In Google Drive, create a new Sheet named "OPCO Portal Activity Log".
 *  2. First row headers (will be auto-filled on first POST if missing):
 *       timestamp | user | type | detail | page | user_agent | referrer
 *  3. Extensions -> Apps Script. Replace Code.gs with this file.
 *  4. Edit the SHARED_SECRET below (any random string is fine).
 *  5. Save (Ctrl+S). Then Deploy -> New deployment.
 *       Type: Web app
 *       Description: OPCO Portal Log v1
 *       Execute as: Me
 *       Who has access: Anyone
 *     Click Deploy. Authorize. Copy the Web App URL.
 *  6. Send the URL + secret to admin to wire up the site.
 */

const SHARED_SECRET = 'CHANGE_ME_TO_RANDOM_STRING';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    // Light spam guard: incoming events must carry the secret.
    if (String(data.secret || '') !== SHARED_SECRET) {
      return jsonReply({ ok: false, error: 'auth' });
    }
    ensureHeaders_();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.ts          || new Date().toISOString(),
      String(data.user        || ''),
      String(data.type        || ''),
      String(data.detail      || ''),
      String(data.page        || ''),
      String(data.user_agent  || ''),
      String(data.referrer    || ''),
    ]);
    return jsonReply({ ok: true });
  } catch (err) {
    return jsonReply({ ok: false, error: String(err && err.message || err) });
  }
}

function doGet(e) {
  // Admin read endpoint. Same shared secret as POST.
  if (String((e.parameter || {}).secret || '') !== SHARED_SECRET) {
    return jsonReply({ ok: false, error: 'auth' });
  }
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const last = sheet.getLastRow();
  if (last < 2) return jsonReply({ ok: true, events: [] });

  const limit = Math.min(parseInt(e.parameter.limit || '1000', 10) || 1000, 5000);
  const startRow = Math.max(2, last - limit + 1);
  const numRows = last - startRow + 1;
  const rows = sheet.getRange(startRow, 1, numRows, 7).getValues();

  const events = rows.map(function (r) {
    return {
      ts:         r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
      user:       String(r[1]),
      type:       String(r[2]),
      detail:     String(r[3]),
      page:       String(r[4]),
      user_agent: String(r[5]),
      referrer:   String(r[6]),
    };
  });
  // Newest first
  events.reverse();
  return jsonReply({ ok: true, count: events.length, events: events });
}

function ensureHeaders_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['timestamp', 'user', 'type', 'detail', 'page', 'user_agent', 'referrer']);
    sheet.getRange('A1:G1').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function jsonReply(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
