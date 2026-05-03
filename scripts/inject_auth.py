#!/usr/bin/env python3
"""
inject_auth.py
--------------
Drive'tan generate_html.py ile uretilen index.html'i alir,
- Auth guard <script>'i javascript-obfuscator ile obfuscate eder
- Body'nin basina injecte eder
- Favicon'u kirmizi O harfi yapar
- documents.html olarak kaydeder

Idempotent: Daha once injecte edilmis bir HTML'i tekrar islerse onceki guard'i
silip yenisini koyar (cift injection olmaz).

Inputs (env):
  INPUT_HTML        default: index.html
  OUTPUT_HTML       default: documents.html
  AUTH_GUARD_FILE   default: scripts/auth_guard.html
  FAVICON_FILE      default: scripts/favicon.txt

Required tools on PATH:
  node, npx
"""
import os
import re
import sys
import subprocess
import tempfile

INPUT_HTML  = os.environ.get("INPUT_HTML",  "index.html")
OUTPUT_HTML = os.environ.get("OUTPUT_HTML", "documents.html")
AUTH_GUARD_FILE = os.environ.get("AUTH_GUARD_FILE", "scripts/auth_guard.html")
FAVICON_FILE    = os.environ.get("FAVICON_FILE",    "scripts/favicon.txt")


OBFUSCATOR_OPTS = {
    "compact": True,
    "controlFlowFlattening": True,
    "controlFlowFlatteningThreshold": 0.75,
    "deadCodeInjection": True,
    "deadCodeInjectionThreshold": 0.4,
    "identifierNamesGenerator": "hexadecimal",
    "numbersToExpressions": True,
    "selfDefending": True,
    "simplify": True,
    "splitStrings": True,
    "splitStringsChunkLength": 6,
    "stringArray": True,
    "stringArrayCallsTransform": True,
    "stringArrayCallsTransformThreshold": 0.75,
    "stringArrayEncoding": ["base64"],
    "stringArrayIndexShift": True,
    "stringArrayRotate": True,
    "stringArrayShuffle": True,
    "stringArrayWrappersCount": 2,
    "stringArrayWrappersChainedCalls": True,
    "stringArrayWrappersParametersMaxCount": 4,
    "stringArrayWrappersType": "function",
    "stringArrayThreshold": 0.85,
    "transformObjectKeys": True,
}


def obfuscate_js(js_code: str) -> str:
    """Run javascript-obfuscator on the given JS via Node subprocess."""
    import json as _json
    with tempfile.TemporaryDirectory() as tmp:
        in_path  = os.path.join(tmp, "in.js")
        out_path = os.path.join(tmp, "out.js")
        opts_path = os.path.join(tmp, "opts.json")
        with open(in_path, "w", encoding="utf-8") as f:
            f.write(js_code)
        with open(opts_path, "w", encoding="utf-8") as f:
            _json.dump(OBFUSCATOR_OPTS, f)

        # Use a tiny Node runner script so we can pass options as a JSON file
        runner_path = os.path.join(tmp, "runner.js")
        with open(runner_path, "w", encoding="utf-8") as f:
            f.write("""
const JO = require('javascript-obfuscator');
const fs = require('fs');
const code = fs.readFileSync(process.argv[2], 'utf8');
const opts = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
const result = JO.obfuscate(code, opts);
fs.writeFileSync(process.argv[4], result.getObfuscatedCode());
""")

        # Locate javascript-obfuscator: prefer global install, fall back to npx
        env = os.environ.copy()
        try:
            subprocess.run(
                ["node", runner_path, in_path, opts_path, out_path],
                check=True,
                capture_output=True,
                text=True,
                env=env,
            )
        except subprocess.CalledProcessError as e:
            print("Node runner stderr:", e.stderr, file=sys.stderr)
            raise

        with open(out_path, encoding="utf-8") as f:
            return f.read()


def strip_legacy_doc_portal_login(html: str) -> str:
    """
    Document Portal'in kendi gomuluk login overlay'ini kaldir.
    Bizim auth guard zaten opcoportal.com kapisinda devrede, ikinci login gereksiz.

    - <div id="login-overlay">...</div> blogunu siler
    - body class="locked ..." -> "locked" kismini cikartir (icerik kilidi acilir)
    - checkPassword / unlock JS bloklarini bozmamak adina dokunmuyoruz; cunku
      onlar artik DOM'da olmayan elementlere bakacak ve sessizce no-op olacaklar.
    """
    # 1) Remove the login overlay div (multi-line, contains form, button, etc.)
    new_html = re.sub(
        r'<div id="login-overlay">.*?</div>\s*</div>',
        '',
        html,
        count=1,
        flags=re.DOTALL,
    )

    # 2) Strip "locked" class from body
    def _body_repl(m):
        body_open = m.group(0)
        # Replace class attribute: remove "locked" token, keep others
        def _class_repl(cm):
            classes = cm.group(1).split()
            classes = [c for c in classes if c != "locked"]
            if classes:
                return 'class="' + ' '.join(classes) + '"'
            return ''
        return re.sub(r'class="([^"]*)"', _class_repl, body_open)

    new_html = re.sub(r'<body[^>]*>', _body_repl, new_html, count=1)

    # 3) Disable the early "auto-unlock if session exists" check that checks for
    # opco_portal_user (legacy session). Without our edit, it would call
    # unlock() which references the now-removed login-overlay element. To be
    # safe, we replace any "document.body.classList.add('locked')" calls with
    # no-ops by simply leaving the JS — body has no 'locked' class so .remove
    # is harmless and .add wont matter (we already stripped overlay HTML).
    return new_html


def obfuscate_guard_block(guard_html: str) -> str:
    """Obfuscate every <script>...</script> body inside the guard block."""
    def _sub(m):
        open_tag, body, close_tag = m.group(1), m.group(2), m.group(3)
        if not body.strip():
            return m.group(0)
        obf = obfuscate_js(body)
        return open_tag + obf + close_tag
    pattern = re.compile(r"(<script[^>]*>)(.*?)(</script>)", re.DOTALL)
    return pattern.sub(_sub, guard_html)


def main():
    if not os.path.exists(INPUT_HTML):
        print(f"ERROR: {INPUT_HTML} not found", file=sys.stderr)
        sys.exit(1)
    with open(INPUT_HTML, encoding="utf-8") as f:
        html = f.read()

    if not os.path.exists(AUTH_GUARD_FILE):
        print(f"ERROR: {AUTH_GUARD_FILE} not found", file=sys.stderr)
        sys.exit(1)
    with open(AUTH_GUARD_FILE, encoding="utf-8") as f:
        guard = f.read()

    # Strip Document Portal's built-in login (we use our own at the portal level)
    pre = len(html)
    html = strip_legacy_doc_portal_login(html)
    post = len(html)
    print(f"Stripped legacy login overlay: {pre - post} bytes removed")
    print(f"Input HTML:  {len(html)} bytes (after legacy strip)")
    print(f"Auth guard:  {len(guard)} bytes (pre-obfuscation)")

    # Obfuscate the guard's <script>
    guard_obf = obfuscate_guard_block(guard)
    print(f"Auth guard:  {len(guard_obf)} bytes (post-obfuscation)")

    # Strip any prior-injected guard (idempotency)
    html = re.sub(
        r"<!-- ===== OPCO PORTAL AUTH GUARD ===== -->.*?<!-- ===== END AUTH GUARD ===== -->",
        "",
        html,
        flags=re.DOTALL,
    )

    # Inject right after <body>
    body_match = re.search(r"<body[^>]*>", html)
    if not body_match:
        print("ERROR: <body> not found", file=sys.stderr)
        sys.exit(1)
    pos = body_match.end()
    html = html[:pos] + "\n" + guard_obf + "\n" + html[pos:]

    # Replace favicon
    if os.path.exists(FAVICON_FILE):
        with open(FAVICON_FILE, encoding="utf-8") as f:
            favicon_uri = f.read().strip()
        new_link = f'<link rel="icon" type="image/png" href="{favicon_uri}">'
        icon_pattern = r'<link\s+[^>]*rel\s*=\s*["\'](?:shortcut\s+)?icon["\'][^>]*>'
        html = re.sub(icon_pattern, "", html, flags=re.IGNORECASE)
        head_close = re.search(r"</head>", html, re.IGNORECASE)
        if head_close:
            html = html[:head_close.start()] + new_link + "\n" + html[head_close.start():]
            print("Favicon: replaced")
    else:
        print(f"WARN: {FAVICON_FILE} not found, favicon not changed")

    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Output: {OUTPUT_HTML} ({len(html)} bytes)")

    # Sanity checks
    assert "OPCO PORTAL AUTH GUARD" in html, "auth guard marker missing"
    # Plaintext usernames should NOT appear (obfuscated)
    leaks = [u for u in ['"o.cavdar"', '"m.alahmad"', '"a.barazi"'] if u in html]
    if leaks:
        print(f"WARN: plaintext leak suspected: {leaks}", file=sys.stderr)
    else:
        print("Plaintext check: OK (usernames obfuscated)")
    print("Sanity checks: done")


if __name__ == "__main__":
    main()
