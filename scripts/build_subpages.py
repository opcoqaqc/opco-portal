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
    # (data-tab slug, browser <title>, on-page <h1>, output path)
    ("projects", "Ongoing Projects",   "ONGOING PROJECTS",   "static/projects.html"),
    ("welders",  "Welder Qualification", "WELDER QUALIFICATION", "static/welders.html"),
]


def make_subpage(src: str, target_tab: str, page_title: str, page_heading: str) -> str:
    out = src

    # 1) <title>
    out = re.sub(r"<title>[^<]*</title>", f"<title>{page_title}</title>", out, count=1)

    # 2) On-page <h1> in the brand bar (source has <h1>CALCULATORS</h1>)
    out, n = re.subn(
        r"<h1>CALCULATORS</h1>",
        f"<h1>{page_heading}</h1>",
        out, count=1,
    )
    if n != 1:
        raise SystemExit(f"ERR: '<h1>CALCULATORS</h1>' not found in {SRC}")

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

    for slug, title, heading, dest in SUBPAGES:
        html = make_subpage(src, slug, title, heading)
        with open(dest, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"wrote {dest} ({len(html)} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
