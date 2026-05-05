#!/usr/bin/env python3
"""
build_subpages.py
-----------------
Generate static/welders.html and static/projects.html from static/toolkit.html.

The subpages have the same DOM and JS bundle as toolkit.html (so the minified
JS doesn't crash on missing elements), but:
- The tab navigation is hidden via injected CSS
- The target tab + panel get the `active` class instead of `consumable`
- The <title> is overridden

Run after editing static/toolkit.html. Idempotent: re-running just rewrites the
two subpage files.
"""
import os
import re
import sys

SRC = os.environ.get("SRC", "static/toolkit.html")
SUBPAGES = [
    # (data-tab slug, browser <title>, mini-tile data-key for the active tab,
    #  output path)
    ("projects", "Project Dashboard",     "dashboard", "static/projects.html"),
    ("welders",  "Welder Qualification",  "welders",   "static/welders.html"),
]


def make_subpage(src: str, target_tab: str, page_title: str,
                 active_mini_key: str) -> str:
    out = src

    # 1) <title>
    out = re.sub(r"<title>[^<]*</title>", f"<title>{page_title}</title>", out, count=1)

    # 2) Move the .active class on the mini-tile row from "toolkit" (the
    #    source default in toolkit.html) to this subpage's tile.
    out, n1 = re.subn(
        r'<a (href="[^"]+") class="opco-mini-tile active" data-key="toolkit"',
        r'<a \1 class="opco-mini-tile" data-key="toolkit"',
        out, count=1,
    )
    if n1 != 1:
        raise SystemExit(f"ERR: toolkit mini-tile active not found in {SRC}")
    out, n2 = re.subn(
        rf'<a (href="[^"]+") class="opco-mini-tile" data-key="{active_mini_key}"',
        rf'<a \1 class="opco-mini-tile active" data-key="{active_mini_key}"',
        out, count=1,
    )
    if n2 != 1:
        raise SystemExit(f"ERR: target mini-tile '{active_mini_key}' not found in {SRC}")

    # 2a) Swap body's data-ctx attribute so the sidebar shows the right
    #     section (Projects / Welders / Toolkit). Mapping mirrors
    #     active_mini_key for the two subpage tabs.
    side_ctx = "projects" if target_tab == "projects" else "welders"
    out, n_ctx = re.subn(
        r'<body([^>]*)\sdata-ctx="toolkit"',
        rf'<body\1 data-ctx="{side_ctx}"',
        out, count=1,
    )
    if n_ctx != 1:
        raise SystemExit(f"ERR: body data-ctx attribute not found in {SRC}")

    # 3) Hide tab nav (subpage shows only one tool)
    inject = '<style id="__opco_subpage">.tabs{display:none !important}</style>'
    out = out.replace("</head>", inject + "\n</head>", 1)

    # 3) Move `active` from the default (consumable) tab button to the target
    out = re.sub(
        r'<button class="tab active" data-tab="consumable">',
        '<button class="tab" data-tab="consumable">',
        out, count=1,
    )
    pat = rf'<button class="tab" data-tab="{target_tab}" hidden>'
    repl = f'<button class="tab active" data-tab="{target_tab}">'
    out, n = re.subn(pat, repl, out, count=1)
    if n != 1:
        raise SystemExit(f"ERR: tab button for '{target_tab}' not found in {SRC}")

    # 4) Same swap on the panel
    out = re.sub(
        r'<div class="tab-panel active" id="tab-consumable">',
        '<div class="tab-panel" id="tab-consumable">',
        out, count=1,
    )
    pat = rf'<div class="tab-panel" id="tab-{target_tab}">'
    repl = f'<div class="tab-panel active" id="tab-{target_tab}">'
    out, n = re.subn(pat, repl, out, count=1)
    if n != 1:
        raise SystemExit(f"ERR: tab panel for '{target_tab}' not found in {SRC}")

    return out


def main() -> int:
    if not os.path.exists(SRC):
        print(f"ERR: source not found: {SRC}", file=sys.stderr)
        return 1
    with open(SRC, encoding="utf-8") as f:
        src = f.read()

    for slug, title, active_key, dest in SUBPAGES:
        html = make_subpage(src, slug, title, active_key)
        with open(dest, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"wrote {dest} ({len(html)} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
