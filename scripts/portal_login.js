// Portal landing login overlay + topbar.
// Source for static/index.html's auth script. After editing, run
//   npx javascript-obfuscator scripts/portal_login.js \
//     --output static/portal_login.obf.js
// and paste its content into the inline <script> in static/index.html
// (the one immediately after <button id="__opco_auth_btn">). The user
// table is the same as scripts/auth_guard.html.

(function () {
  var SESSION_KEY = '__opco_session_v1';
  var SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
  var USERS = {
    "o.cavdar":   "226dc1a59abcf03ccfd2e6f2dc9086a3624688fbfd0d58c39ebf74a6f5badc91",
    "r.khald":    "7c4f696944d01f7f6839eca560bd876f3435421467a472597fb3ab8de201a345",
    "a.hajhasan": "e04134d993b97a42ac81edea13bcb15a853fa47b2e65dfe8a9023db5b2b232b4",
    "m.alahmad":  "bb4e07925355fd6caf4a91d5f56c7af5945cf5fbca2ead1d381393483acdba19",
    "a.mando":    "b80548f27d60e6e063f8201926f12ab540629cef6afce15ffbf79026923bd1be",
    "m.barazi":   "6649ac9e79d60a7ad45c9af10b53d5968de7f38f93babf094863ea21a71dce4c",
    "o.barazi":   "31edda98835bbe3d2a53f200d517e63247db351f7e304821bd83e7cba1dcbffc",
    "a.barazi":   "00d39103f4e93d48c1169b3511de26ef90e36a4851ccf0585b44f19de9611154",
    "a.dlshad":   "1c363f2ab4fe5c0085664935e41f35a0a6a2ea9a331f1a04f68c25081ff313c7",
    "y.ramadhan": "bd3aa6a3173af4947c930e6c67ba86c930d1365c558ec6a1d7c13f679e24a9d9",
    "a.taha":     "5a92bcaf6ae071cdc3a9c2ae85556c8b9edac8ec0e54a039becdc9d43ee95a13",
    "e.saday":    "ccd0daefff5d3d3c61a8698a2a7985f7cbcd1c5ba18187a09b3020f753ec897c"
  };

  function $(id) { return document.getElementById(id); }

  async function sha256Hex(s) {
    var enc = new TextEncoder();
    var buf = await crypto.subtle.digest('SHA-256', enc.encode(s));
    var bytes = new Uint8Array(buf);
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, '0');
    }
    return hex;
  }

  function readSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !s.u || !s.exp) return null;
      if (Date.now() > s.exp) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      if (!USERS[s.u]) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return s;
    } catch (e) {
      return null;
    }
  }

  function writeSession(username) {
    var s = { u: username, exp: Date.now() + SESSION_TTL_MS };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    } catch (e) {}
    return s;
  }

  function applyDarkTheme() {
    // Dark mode is the default for the portal landing.
    if (document.body) document.body.classList.add('dark');
    var ov = $('__opco_auth_overlay');
    if (ov) ov.classList.add('dark');
  }

  function showOverlay() {
    applyDarkTheme();
    var ov = $('__opco_auth_overlay');
    if (ov) ov.style.display = 'flex';
    var screen = $('portal_screen');
    if (screen) screen.classList.remove('shown');
    var logout = $('__opco_auth_logout');
    if (logout) logout.style.display = 'none';
    document.body && document.body.classList.add('__opco_no_scroll');
    setTimeout(function () {
      var u = $('__opco_auth_username');
      if (u) try { u.focus(); } catch (e) {}
    }, 50);
  }

  function hideOverlay(username) {
    applyDarkTheme();
    var ov = $('__opco_auth_overlay');
    if (ov) ov.style.display = 'none';
    document.body && document.body.classList.remove('__opco_no_scroll');
    var label = $('__opco_auth_user_label') || $('__opco_auth_user');
    if (label) label.textContent = username;
    var portalName = $('portal_user_name');
    if (portalName) portalName.textContent = username;
    var logout = $('__opco_auth_logout');
    if (logout) logout.style.display = 'inline-flex';
    var screen = $('portal_screen');
    if (screen) screen.classList.add('shown');
  }

  function showError(msg) {
    var e = $('__opco_auth_error');
    if (!e) return;
    e.textContent = msg;
    e.style.display = 'block';
  }
  function clearError() {
    var e = $('__opco_auth_error');
    if (!e) return;
    e.textContent = '';
    e.style.display = 'none';
  }

  async function trySignIn() {
    clearError();
    var u = ($('__opco_auth_username') || {}).value || '';
    var p = ($('__opco_auth_password') || {}).value || '';
    u = u.trim().toLowerCase();
    if (!u || !p) {
      showError('Please enter username and password.');
      return;
    }
    var expected = USERS[u];
    if (!expected) {
      showError('Invalid username or password.');
      return;
    }
    var got;
    try {
      got = await sha256Hex(p);
    } catch (e) {
      showError('Browser does not support required crypto API.');
      return;
    }
    if (got !== expected) {
      showError('Invalid username or password.');
      return;
    }
    writeSession(u);
    try { if (window.opcoTrack) window.opcoTrack('login', u); } catch (e) {}
    hideOverlay(u);
  }

  function bindEvents() {
    var btn = $('__opco_auth_btn');
    if (btn) {
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        trySignIn();
      });
    }
    var pwd = $('__opco_auth_password');
    if (pwd) {
      pwd.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') {
          ev.preventDefault();
          trySignIn();
        }
      });
    }
    var user = $('__opco_auth_username');
    if (user) {
      user.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') {
          ev.preventDefault();
          var p = $('__opco_auth_password');
          if (p) try { p.focus(); } catch (e) {}
        }
      });
    }
    var logout = $('__opco_auth_logout');
    if (logout) {
      logout.addEventListener('click', function () {
        try { if (window.opcoTrack) window.opcoTrack('logout', ''); } catch (e) {}
        try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
        location.reload();
      });
    }
  }

  function init() {
    bindEvents();
    var s = readSession();
    if (s) {
      hideOverlay(s.u);
    } else {
      showOverlay();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
