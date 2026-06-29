"""One-shot refactor of static/qaqc.html: replace the single team
group (with dashboard + 4 members) with 3 per-member groups, each
shaped exactly like the manager group (Defs / Scoring / Tracker /
Sources). Reuses the manager render functions for every group.

Run once:  py scripts/refactor_qaqc_html.py
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / 'static' / 'qaqc.html'

src = HTML.read_text(encoding='utf-8')

# Load fresh JSONs to embed
mgr = json.dumps(json.load((ROOT / '.qaqc_mgr.json').open(encoding='utf-8')), ensure_ascii=False)
ahm = json.dumps(json.load((ROOT / '.qaqc_ahm.json').open(encoding='utf-8')), ensure_ascii=False)
ers = json.dumps(json.load((ROOT / '.qaqc_ers.json').open(encoding='utf-8')), ensure_ascii=False)
yas = json.dumps(json.load((ROOT / '.qaqc_yas.json').open(encoding='utf-8')), ensure_ascii=False)


def must_replace(pattern, repl, *, flags=0, count=1):
    global src
    new, n = re.subn(pattern, repl, src, count=count, flags=flags)
    if n != count:
        raise SystemExit(f'pattern not matched as expected (got {n}, expected {count}): {pattern[:80]}...')
    src = new


def must_replace_str(old, new, *, count=1):
    global src
    n = src.count(old)
    if n != count:
        raise SystemExit(f'literal not matched as expected (got {n}, expected {count}): {old[:80]}...')
    src = src.replace(old, new, count)


# ============================================================
# 1. Sidebar — replace BOTH groups with 4 groups
# ============================================================
old_sidebar = '''    <div class="side-group expanded" data-group="manager">
      <div class="side-group-header">
        <span class="side-group-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        <span class="side-group-name" style="text-transform:none;">QA/QC MANAGER KPIs</span>
        <span class="side-group-count">4</span>
      </div>
      <div class="side-group-items">
        <a class="side-item active" data-tab="defs">
          <span class="side-icon" style="background:linear-gradient(135deg,#2B5797,#4a7ec1);"><svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
          <span>KPI Definitions</span>
        </a>
        <a class="side-item" data-tab="scoring">
          <span class="side-icon" style="background:linear-gradient(135deg,#C2410C,#ea580c);"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
          <span>Scoring Matrix</span>
        </a>
        <a class="side-item" data-tab="tracker">
          <span class="side-icon" style="background:linear-gradient(135deg,#1D7044,#2da66d);"><svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
          <span>Monthly Tracker</span>
        </a>
        <a class="side-item" data-tab="sources">
          <span class="side-icon" style="background:linear-gradient(135deg,#6B4FA8,#8a6dc8);"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/></svg></span>
          <span>Data Sources</span>
        </a>
      </div>
    </div>

    <div class="side-group" data-group="team">
      <div class="side-group-header">
        <span class="side-group-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        <span class="side-group-name" style="text-transform:none;">QA/QC TEAM KPIs</span>
        <span class="side-group-count">7</span>
      </div>
      <div class="side-group-items">
        <a class="side-item" data-tab="team-defs">
          <span class="side-icon" style="background:linear-gradient(135deg,#2B5797,#4a7ec1);"><svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
          <span>KPI Definitions</span>
        </a>
        <a class="side-item" data-tab="team-scoring">
          <span class="side-icon" style="background:linear-gradient(135deg,#C2410C,#ea580c);"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
          <span>Scoring Matrix</span>
        </a>
        <a class="side-item" data-tab="team-dashboard">
          <span class="side-icon" style="background:linear-gradient(135deg,#0A6E78,#14a3b3);"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
          <span>Team Dashboard</span>
        </a>
        <a class="side-item" data-tab="team-m1">
          <span class="side-icon" style="background:linear-gradient(135deg,#2B5797,#4a7ec1);"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
          <span>Ahmed Dlshad</span>
        </a>
        <a class="side-item" data-tab="team-m2">
          <span class="side-icon" style="background:linear-gradient(135deg,#1D7044,#2da66d);"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
          <span>Ersel Saday</span>
        </a>
        <a class="side-item" data-tab="team-m3">
          <span class="side-icon" style="background:linear-gradient(135deg,#6B4FA8,#8a6dc8);"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
          <span>Yasin Ramadhan</span>
        </a>
        <a class="side-item" data-tab="team-m4">
          <span class="side-icon" style="background:linear-gradient(135deg,#C9A961,#b89750);"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
          <span>Ahmed Taha</span>
        </a>
      </div>
    </div>'''


def make_group(group_key, label, default_active=False):
    active = ' active' if default_active else ''
    expanded = ' expanded' if default_active else ''
    return f'''    <div class="side-group{expanded}" data-group="{group_key}">
      <div class="side-group-header">
        <span class="side-group-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        <span class="side-group-name" style="text-transform:none;">{label}</span>
        <span class="side-group-count">4</span>
      </div>
      <div class="side-group-items">
        <a class="side-item{active}" data-tab="{group_key}-defs">
          <span class="side-icon" style="background:linear-gradient(135deg,#2B5797,#4a7ec1);"><svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
          <span>KPI Definitions</span>
        </a>
        <a class="side-item" data-tab="{group_key}-scoring">
          <span class="side-icon" style="background:linear-gradient(135deg,#C2410C,#ea580c);"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
          <span>Scoring Matrix</span>
        </a>
        <a class="side-item" data-tab="{group_key}-tracker">
          <span class="side-icon" style="background:linear-gradient(135deg,#1D7044,#2da66d);"><svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
          <span>Monthly Tracker</span>
        </a>
        <a class="side-item" data-tab="{group_key}-sources">
          <span class="side-icon" style="background:linear-gradient(135deg,#6B4FA8,#8a6dc8);"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/></svg></span>
          <span>Data Sources</span>
        </a>
      </div>
    </div>'''


new_sidebar = '\n\n'.join([
    make_group('mgr', 'QA/QC MANAGER KPIs', default_active=True),
    make_group('ahm', 'QA/QC TEAM (Ahmed) KPIs'),
    make_group('ers', 'QA/QC TEAM (Ersel) KPIs'),
    make_group('yas', 'QA/QC TEAM (Yasin) KPIs'),
])
must_replace_str(old_sidebar, new_sidebar)


# ============================================================
# 2. View divs — replace 11 old divs with 16 new ones
# ============================================================
old_views = '''    <div class="view active" id="view-defs"></div>
    <div class="view" id="view-scoring"></div>
    <div class="view" id="view-tracker"></div>
    <div class="view" id="view-sources"></div>
    <div class="view" id="view-team-defs"></div>
    <div class="view" id="view-team-scoring"></div>
    <div class="view" id="view-team-dashboard"></div>
    <div class="view" id="view-team-m1"></div>
    <div class="view" id="view-team-m2"></div>
    <div class="view" id="view-team-m3"></div>
    <div class="view" id="view-team-m4"></div>'''

new_views_lines = []
for i, key in enumerate(['mgr', 'ahm', 'ers', 'yas']):
    for sub in ['defs', 'scoring', 'tracker', 'sources']:
        active = ' active' if (key == 'mgr' and sub == 'defs') else ''
        new_views_lines.append(f'    <div class="view{active}" id="view-{key}-{sub}"></div>')
must_replace_str(old_views, '\n'.join(new_views_lines))


# ============================================================
# 3. Data tag — replace qaqc-data + qaqc-team-data with 4 tags
# ============================================================
# Match the existing qaqc-data tag and surrounding qaqc-team-data tag together.
pattern_tags = re.compile(
    r'<script id="qaqc-data" type="application/json">\{.*?\}</script>\s*\n\s*<script id="qaqc-team-data" type="application/json">\{.*?\}</script>',
    re.DOTALL
)
new_tags = '\n'.join([
    f'<script id="qaqc-mgr-data" type="application/json">{mgr}</script>',
    f'<script id="qaqc-ahm-data" type="application/json">{ahm}</script>',
    f'<script id="qaqc-ers-data" type="application/json">{ers}</script>',
    f'<script id="qaqc-yas-data" type="application/json">{yas}</script>',
])
# Use a lambda to avoid re.sub's special handling of \1, \n etc. in the
# replacement string — the JSON we're inserting contains \n escapes that
# would otherwise be interpreted as newline characters.
src2, n = pattern_tags.subn(lambda m: new_tags, src, count=1)
if n != 1:
    raise SystemExit('data tags pattern not matched exactly once')
src = src2


# ============================================================
# 4. Data loading — replace DATA/TEAM with GROUPS dict
# ============================================================
old_data_load = '''  // === Load data ===
  var DATA;
  try { DATA = JSON.parse(document.getElementById('qaqc-data').textContent); }
  catch (e) { DATA = null; }
  if (!DATA) {
    document.getElementById('view-tracker').innerHTML = '<p class="lead">Data file missing — refresh extract_qaqc.py and rebuild qaqc.html.</p>';
    return;
  }
  // Team KPI data (optional — manager views still render if team data is absent)
  var TEAM = null;
  try {
    var tNode = document.getElementById('qaqc-team-data');
    if (tNode) TEAM = JSON.parse(tNode.textContent);
  } catch (e) { TEAM = null; }'''

new_data_load = '''  // === Load data ===
  function loadJson(id) {
    try { var n = document.getElementById(id); return n ? JSON.parse(n.textContent) : null; }
    catch (e) { return null; }
  }
  var GROUPS = {
    mgr: { data: loadJson('qaqc-mgr-data'), label: 'QA/QC Manager' },
    ahm: { data: loadJson('qaqc-ahm-data'), label: 'QA/QC Team — Ahmed Dlshad' },
    ers: { data: loadJson('qaqc-ers-data'), label: 'QA/QC Team — Ersel Saday' },
    yas: { data: loadJson('qaqc-yas-data'), label: 'QA/QC Team — Yasin Ramadhan' },
  };
  // Back-compat — some helpers still reference DATA for the sidebar footer
  // and the eyebrow defaults.
  var DATA = GROUPS.mgr.data;
  if (!DATA) {
    document.getElementById('view-mgr-tracker').innerHTML = '<p class="lead">Data file missing — refresh extract_qaqc.py and rebuild qaqc.html.</p>';
    return;
  }'''

must_replace_str(old_data_load, new_data_load)


# ============================================================
# 5. Refactor each manager renderer signature to take (data, label, viewId)
#    Inside, replace DATA.* with data.*, and the eyebrow hardcoded string.
# ============================================================
RENDERER_TO_VIEW = {
    'renderDefinitions': 'view-defs',
    'renderScoring':     'view-scoring',
    'renderTracker':     'view-tracker',
    'renderSources':     'view-sources',
}

for fname, view_id in RENDERER_TO_VIEW.items():
    # signature
    src = src.replace(f'function {fname}() {{', f'function {fname}(data, label, viewId) {{', 1)
    # render target — only inside this function, so we can be loose since each
    # view-* id is unique to its renderer
    src = src.replace(f"document.getElementById('{view_id}')", "document.getElementById(viewId)", 1)


# Now sed-replace global DATA references in renderer bodies to use `data` —
# but only inside renderer functions, not in places like the sidebar footer
# block that runs later. The simplest scope: limit to text between
# "function renderDefinitions(" and "function renderTeamDefs(".
def replace_in_range(start_marker, end_marker, replacements):
    global src
    i = src.index(start_marker)
    j = src.index(end_marker, i)
    body = src[i:j]
    for old, new in replacements:
        body = body.replace(old, new)
    src = src[:i] + body + src[j:]


replace_in_range(
    'function renderDefinitions(',
    'function renderTeamDefs(',
    [
        ('DATA.kpi_definitions', 'data.kpi_definitions'),
        ('DATA.scoring_matrix',  'data.scoring_matrix'),
        ('DATA.monthly_tracker', 'data.monthly_tracker'),
        ('DATA.data_sources',    'data.data_sources'),
        ("'<div class=\"eyebrow\">QA/QC department</div>'", "'<div class=\"eyebrow\">' + esc(label) + '</div>'"),
        ("'<div class=\"eyebrow\">QA/QC department &middot; ' + t.year + '</div>'",
         "'<div class=\"eyebrow\">' + esc(label) + ' &middot; ' + t.year + '</div>'"),
    ],
)


# ============================================================
# 6. Remove the team renderers entirely + replace the renderer chain
# ============================================================
# The chain currently looks like:
#   renderDefinitions(); renderScoring(); renderTracker(); renderSources();
#   if (TEAM) {
#     renderTeamDefs(); renderTeamScoring(); renderTeamDashboard();
#     renderMember(0, 'view-team-m1');  ...
#   }
# Find the start of `renderTeamDefs` declaration and the renderer chain,
# replace the whole region.

# Find the start of the team renderers block:
team_block_start_marker = '  // ============================================================\n  // === Team KPI views =========================================\n  // ============================================================'
team_block_idx = src.index(team_block_start_marker)

# Find the call chain end — look for the sidebar footer comment that follows
chain_end_marker = '  // Sidebar footer — standards alignment line from cover data'
chain_end_idx = src.index(chain_end_marker, team_block_idx)

new_chain = (
    '  // ============================================================\n'
    '  // === Render every group (manager + 3 team members) ===========\n'
    '  // ============================================================\n'
    '  Object.keys(GROUPS).forEach(function (key) {\n'
    '    var g = GROUPS[key];\n'
    '    if (!g.data) return;\n'
    '    renderDefinitions(g.data, g.label, "view-" + key + "-defs");\n'
    '    renderScoring(   g.data, g.label, "view-" + key + "-scoring");\n'
    '    renderTracker(   g.data, g.label, "view-" + key + "-tracker");\n'
    '    renderSources(   g.data, g.label, "view-" + key + "-sources");\n'
    '  });\n\n'
)

src = src[:team_block_idx] + new_chain + src[chain_end_idx:]


# ============================================================
# 7. Tab switching — update default + auto-expand mapping
# ============================================================
# The existing tab switcher already toggles .side-item.active and .view.active
# based on data-tab / view-<tab>. Our new IDs all follow that convention.
# The auto-expand-group helper hardcodes 'team-' prefix — replace it with the
# generic 3-char-prefix logic.
old_expand = '''    // Auto-expand the matching group when activating a tab inside it
    var groupKey = tab.split('-')[0];
    var grpEl = document.querySelector('.side-group[data-group]');
    document.querySelectorAll('.side-group').forEach(function (g) {
      var dg = g.getAttribute('data-group') || '';
      if ((groupKey === 'cor' && dg === 'corporate') ||
          (groupKey === 'prj' && dg === 'project') ||
          (groupKey === 'sup' && dg === 'supervisor')) {
        g.classList.add('expanded');
      }
    });'''

new_expand = '''    // Auto-expand the matching group when activating a tab inside it.
    // Tab IDs are <group-key>-<sub>; data-group on the sidebar matches.
    var groupKey = tab.split('-')[0];
    document.querySelectorAll('.side-group').forEach(function (g) {
      if (g.getAttribute('data-group') === groupKey) g.classList.add('expanded');
    });'''

if old_expand in src:
    src = src.replace(old_expand, new_expand, 1)

# Some pages may not have the old hardcoded helper at all — silently skip


# Update sidebar group data-group keys (manager group was data-group="manager",
# but we now use "mgr"). Done inside make_group already — sidebar uses mgr/ahm/ers/yas.


# ============================================================
# 8. Hash deep-link bootstrap — old default was 'defs', new is 'mgr-defs'
# ============================================================
# qaqc.html doesn't bootstrap a hash by default (it relies on the active class
# already set in the HTML), so the default sub-tab is just whichever has the
# active class. We already give "mgr-defs" the active class in make_group, so
# nothing to change here.


# Write out
HTML.write_text(src, encoding='utf-8')
print('rewrote', HTML, '— size now', len(src), 'bytes')
