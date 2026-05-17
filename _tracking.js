/**
 * OPCO portal activity tracker — fire-and-forget POST to the Apps Script
 * web app. Configure the endpoint URL + shared secret below after
 * deploying scripts/apps_script_log.gs.
 *
 * Events fired by the rest of the site (via window.opcoTrack):
 *   'login'         on successful auth
 *   'logout'        on signout
 *   'tab'           on band tile click (detail = tab key)
 *   'doc_view'      on Drive file open (detail = file id or name)
 *   'doc_download'  on direct-download click (detail = file id or name)
 *   'page_load'     on every page load (the bootstrap call below)
 *
 * If LOG_ENDPOINT is empty (default) every call is a no-op — the site
 * still works, nothing is sent. Set the URL + secret to switch it on.
 */
(function () {
  var LOG_ENDPOINT = ''; // <-- paste Apps Script /exec URL here once deployed
  var LOG_SECRET   = ''; // <-- paste the SHARED_SECRET from apps_script_log.gs here

  function readSessionUser() {
    try {
      var raw = localStorage.getItem('__opco_session_v1');
      if (!raw) return '';
      var s = JSON.parse(raw);
      return (s && s.u) || '';
    } catch (e) { return ''; }
  }

  function send(payload) {
    if (!LOG_ENDPOINT) return;
    try {
      var body = JSON.stringify(payload);
      // sendBeacon survives page unloads (so logout/page-leave is logged
      // even if the next nav cancels in-flight requests).
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });
        if (navigator.sendBeacon(LOG_ENDPOINT, blob)) return;
      }
      // Fallback. no-cors keeps the request fire-and-forget.
      fetch(LOG_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: body,
      }).catch(function(){});
    } catch (e) { /* swallow */ }
  }

  window.opcoTrack = function (type, detail) {
    send({
      secret:     LOG_SECRET,
      ts:         new Date().toISOString(),
      user:       readSessionUser(),
      type:       String(type || ''),
      detail:     detail == null ? '' : String(detail),
      page:       location.pathname + location.hash,
      user_agent: navigator.userAgent,
      referrer:   document.referrer || '',
    });
  };

  // One page_load event per navigation. Fires on every page so we capture
  // tab swaps between toolkit/projects/welders/documents.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      // Small delay so the auth guard has populated localStorage if applicable
      setTimeout(function () { window.opcoTrack('page_load', ''); }, 150);
    });
  } else {
    setTimeout(function () { window.opcoTrack('page_load', ''); }, 150);
  }

  // Global click delegate — handles every cross-page click we want to log:
  //   - Band/portal tiles (tab nav)
  //   - Document items (Drive file open / download)
  document.addEventListener('click', function (e) {
    // 1) Band tile in toolkit/projects/welders/documents
    var tile = e.target.closest && e.target.closest('.opco-mini-tile');
    if (tile) {
      window.opcoTrack('tab', tile.getAttribute('data-key') || tile.textContent.trim());
      return;
    }
    // 2) Big tile on the post-login portal landing
    var ptile = e.target.closest && e.target.closest('.portal-tile');
    if (ptile) {
      var name = ptile.querySelector('.portal-tile-name');
      window.opcoTrack('tab', (name ? name.textContent.trim().toLowerCase() : 'portal-tile'));
      return;
    }
    // 3) Doc item (documents.html). The whole .doc-item card is clickable
    //    but also has inner <a> links — match either, then walk up.
    var doc = e.target.closest && e.target.closest('.doc-item');
    if (doc) {
      var title = (doc.querySelector('.doc-title') || {}).textContent || '';
      var link  = e.target.closest('a[href]');
      var href  = link ? link.getAttribute('href') : '';
      var isDownload = href.indexOf('export=download') !== -1;
      var detail = title.trim();
      var m = href && href.match(/[?&]id=([^&]+)/);
      if (m) detail += ' [' + m[1] + ']';
      window.opcoTrack(isDownload ? 'doc_download' : 'doc_view', detail);
    }
  }, true);
})();
