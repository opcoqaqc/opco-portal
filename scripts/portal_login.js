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
    "r.khald":    "9ee4cf6d646918849f195b51c5a515cee6b0cb336d9564261ff403b575f3f3f7",
    "a.hajhasan": "d18217901818217a5cdeabe0bdadb7cbd2d3b2541bd8aa2f79c1841283763d2f",
    "m.alahmad":  "3f3242a14999ec7d15a2f5fe1426b26103d1a2d8fbe6feb8e83b3c8077518adf",
    "a.mando":    "7296967f2469f120d0679b3e77b66d2db6d15ca77a8636ed2dcd4f9318afcb06",
    "m.barazi":   "bb0ebe6a1e0898e317a0c1efe99883109d889f4d8e1d0a73abcb7aa10a0eaf81",
    "o.barazi":   "f665e31c54aa2b161a3254d6021c2faeba9ad7323beea39c352c1d288fb4626c",
    "a.barazi":   "a6e770fe55f59dbb6a88506ad0fb517e38c5d95ffff56045ea951cf833e42f56",
    "a.dlshad":   "b255f24bd8c2aafc6d589f0bc687a3e1346c95d5dd1063b1421d28f3d34ad7ff",
    "y.ramadhan": "9b3e57232dbb921c0f86a064027fee1728a11e72abe5413a4b922ad3706a5a14",
    "a.taha":     "b574e3dffeebecafb7466903221bb29bdb54378787491ee4f3d9730cd90b1af4",
    "e.saday":    "178d7dfa70f54b8dff4ccd8df194843e46ade2189768d523cfdf4d8c7e59b5f2"
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
