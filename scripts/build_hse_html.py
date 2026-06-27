"""Build static/hse.html by reusing the qaqc.html shell (CSS + band)
and swapping in HSE data + renderers.
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

qaqc = (ROOT / 'static' / 'qaqc.html').read_text(encoding='utf-8')

# Grab the favicon link
fav_match = re.search(r'(<link rel="icon"[^>]+>)', qaqc)
favicon = fav_match.group(1) if fav_match else ''

# Grab the CSS block
css_match = re.search(r'<style>(.*?)</style>', qaqc, re.DOTALL)
css_block = css_match.group(1) if css_match else ''

# Load the 3 HSE JSONs
cor = json.loads((ROOT / '.hse_corporate.json').read_text(encoding='utf-8'))
prj = json.loads((ROOT / '.hse_project.json').read_text(encoding='utf-8'))
sup = json.loads((ROOT / '.hse_supervisor.json').read_text(encoding='utf-8'))

cor_json = json.dumps(cor, ensure_ascii=False)
prj_json = json.dumps(prj, ensure_ascii=False)
sup_json = json.dumps(sup, ensure_ascii=False)


HEAD = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OPCO Portal — HSE KPIs</title>
{favicon}
<style>{css_block}</style>
<script src="_tracking.js"></script>
</head>
<body class="__gated">

<div id="gate">
  <h1>OPCO Portal — HSE Key Performance Indicators</h1>
  <p>This page is for the HSE team. Sign in to the portal with an authorized account, then come back here.</p>
  <a href="./">← Portal</a>
</div>

<!-- Top band -->
<div class="opco-band" id="opco-page-band" style="--page-accent: #16A34A;">
  <a href="./" class="opco-band-back" title="Back to portal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Portal</a>
  <div class="opco-band-divider"></div>
  <div class="opco-mini-tiles">
    <a href="documents.html#view=qms" class="opco-mini-tile" data-key="qms" style="--accent:#C49A55; view-transition-name: card-qms;"><span class="opco-mini-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></span><span class="opco-mini-tile-text">QMS</span></a>
    <a href="documents.html#view=projects" class="opco-mini-tile" data-key="projects" style="--accent:#5DA3E0; view-transition-name: card-projects;"><span class="opco-mini-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="8" y1="9" x2="11" y2="9"/></svg></span><span class="opco-mini-tile-text">Project QC</span></a>
    <a href="projects.html" class="opco-mini-tile" data-key="dashboard" style="--accent:#5DCAA5; view-transition-name: card-dashboard;"><span class="opco-mini-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span><span class="opco-mini-tile-text">Dashboard</span></a>
    <a href="toolkit.html" class="opco-mini-tile" data-key="toolkit" style="--accent:#EF9F27; view-transition-name: card-toolkit;"><span class="opco-mini-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span><span class="opco-mini-tile-text">Toolkit</span></a>
    <a href="welders.html" class="opco-mini-tile" data-key="welders" style="--accent:#E47480; view-transition-name: card-welders;"><span class="opco-mini-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span><span class="opco-mini-tile-text">Welders</span></a>
    <a href="documents.html#view=library" class="opco-mini-tile" data-key="library" style="--accent:#A77CCB; view-transition-name: card-library;"><span class="opco-mini-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></span><span class="opco-mini-tile-text">Library</span></a>
    <a href="qaqc.html" class="opco-mini-tile" data-key="qaqc" style="--accent:#2DD4BF; view-transition-name: card-qaqc;"><span class="opco-mini-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span><span class="opco-mini-tile-text">QA/QC KPI</span></a>
    <a href="hse.html" class="opco-mini-tile active" data-key="hse" style="--accent:#16A34A; view-transition-name: card-hse;"><span class="opco-mini-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span><span class="opco-mini-tile-text">HSE KPI</span></a>
    <a href="pm.html" class="opco-mini-tile" data-key="pm" style="--accent:#6366F1; view-transition-name: card-pm;"><span class="opco-mini-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span><span class="opco-mini-tile-text">PM KPI</span></a>
  </div>
  <div class="opco-band-spacer"></div>
  <span class="opco-band-user" id="__opco_auth_user"></span>
  <div class="opco-band-actions">
    <button id="__opco_auth_logout" class="opco-band-iconbtn" type="button" title="Sign out" aria-label="Sign out"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></button>
  </div>
</div>
'''

# Sidebar: 3 collapsible groups × 4 sub-items each
SIDEBAR = '''
<div class="shell">
  <aside class="sidebar">
    <div class="side-group expanded" data-group="corporate">
      <div class="side-group-header">
        <span class="side-group-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        <span class="side-group-name" style="text-transform:none;">CORPORATE HSE MANAGER</span>
        <span class="side-group-count">4</span>
      </div>
      <div class="side-group-items">
        <a class="side-item active" data-tab="cor-defs">
          <span class="side-icon" style="background:linear-gradient(135deg,#B22234,#d94a5b);"><svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
          <span>KPI Definitions</span>
        </a>
        <a class="side-item" data-tab="cor-scoring">
          <span class="side-icon" style="background:linear-gradient(135deg,#C2410C,#ea580c);"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
          <span>Scoring Matrix</span>
        </a>
        <a class="side-item" data-tab="cor-tracker">
          <span class="side-icon" style="background:linear-gradient(135deg,#1D7044,#2da66d);"><svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
          <span>Monthly Tracker</span>
        </a>
        <a class="side-item" data-tab="cor-sources">
          <span class="side-icon" style="background:linear-gradient(135deg,#6B4FA8,#8a6dc8);"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/></svg></span>
          <span>Data Sources</span>
        </a>
      </div>
    </div>

    <div class="side-group" data-group="project">
      <div class="side-group-header">
        <span class="side-group-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        <span class="side-group-name" style="text-transform:none;">PROJECT HSE MANAGER</span>
        <span class="side-group-count">4</span>
      </div>
      <div class="side-group-items">
        <a class="side-item" data-tab="prj-defs">
          <span class="side-icon" style="background:linear-gradient(135deg,#2B5797,#4a7ec1);"><svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
          <span>KPI Definitions</span>
        </a>
        <a class="side-item" data-tab="prj-scoring">
          <span class="side-icon" style="background:linear-gradient(135deg,#C2410C,#ea580c);"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
          <span>Scoring Matrix</span>
        </a>
        <a class="side-item" data-tab="prj-tracker">
          <span class="side-icon" style="background:linear-gradient(135deg,#1D7044,#2da66d);"><svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
          <span>Monthly Tracker</span>
        </a>
        <a class="side-item" data-tab="prj-sources">
          <span class="side-icon" style="background:linear-gradient(135deg,#6B4FA8,#8a6dc8);"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/></svg></span>
          <span>Data Sources</span>
        </a>
      </div>
    </div>

    <div class="side-group" data-group="supervisor">
      <div class="side-group-header">
        <span class="side-group-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        <span class="side-group-name" style="text-transform:none;">HSE SUPERVISOR (SITE)</span>
        <span class="side-group-count">4</span>
      </div>
      <div class="side-group-items">
        <a class="side-item" data-tab="sup-defs">
          <span class="side-icon" style="background:linear-gradient(135deg,#0A6E78,#14a3b3);"><svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
          <span>KPI Definitions</span>
        </a>
        <a class="side-item" data-tab="sup-scoring">
          <span class="side-icon" style="background:linear-gradient(135deg,#C2410C,#ea580c);"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
          <span>Scoring Matrix</span>
        </a>
        <a class="side-item" data-tab="sup-tracker">
          <span class="side-icon" style="background:linear-gradient(135deg,#1D7044,#2da66d);"><svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
          <span>Monthly Tracker</span>
        </a>
        <a class="side-item" data-tab="sup-sources">
          <span class="side-icon" style="background:linear-gradient(135deg,#6B4FA8,#8a6dc8);"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/></svg></span>
          <span>Data Sources</span>
        </a>
      </div>
    </div>

    <div class="side-footer" id="side-footer"></div>
  </aside>

  <main class="content">
    <div class="view active" id="view-cor-defs"></div>
    <div class="view" id="view-cor-scoring"></div>
    <div class="view" id="view-cor-tracker"></div>
    <div class="view" id="view-cor-sources"></div>
    <div class="view" id="view-prj-defs"></div>
    <div class="view" id="view-prj-scoring"></div>
    <div class="view" id="view-prj-tracker"></div>
    <div class="view" id="view-prj-sources"></div>
    <div class="view" id="view-sup-defs"></div>
    <div class="view" id="view-sup-scoring"></div>
    <div class="view" id="view-sup-tracker"></div>
    <div class="view" id="view-sup-sources"></div>
  </main>
</div>
'''

DATA_TAGS = f'''
<!-- Data + renderer -->
<script id="hse-corporate-data" type="application/json">{cor_json}</script>
<script id="hse-project-data" type="application/json">{prj_json}</script>
<script id="hse-supervisor-data" type="application/json">{sup_json}</script>
'''

SCRIPT_BODY = r"""
<script>
(function () {
  // === Auth gate ===
  var ALLOWED = ['o.cavdar', 'a.barazi', 'o.barazi', 'm.barazi'];
  function readSession() {
    try { var raw = localStorage.getItem('__opco_session_v1');
          return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  var sess = readSession();
  if (!sess || ALLOWED.indexOf(sess.u) === -1) return;
  document.body.classList.remove('__gated');
  var userEl = document.getElementById('__opco_auth_user');
  if (userEl) userEl.textContent = sess.u;
  var logoutBtn = document.getElementById('__opco_auth_logout');
  if (logoutBtn) logoutBtn.addEventListener('click', function(){
    try { localStorage.removeItem('__opco_session_v1'); } catch(e){}
    window.location.href = './';
  });

  // === Load data ===
  function loadJson(id) {
    try { var n = document.getElementById(id); return n ? JSON.parse(n.textContent) : null; }
    catch (e) { return null; }
  }
  var GROUPS = {
    cor: { data: loadJson('hse-corporate-data'),  label: 'Corporate HSE Manager' },
    prj: { data: loadJson('hse-project-data'),    label: 'Project HSE Manager'   },
    sup: { data: loadJson('hse-supervisor-data'), label: 'HSE Supervisor (Site)' },
  };
  if (!GROUPS.cor.data) {
    document.getElementById('view-cor-defs').innerHTML = '<p class="lead">HSE data missing — run extract_hse.py and rebuild.</p>';
    return;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }
  function fmtVal(v, unit) {
    if (v == null) return '—';
    if (unit === '%')     return (v * 100).toFixed(1) + '%';
    if (unit === 'days')  return Math.round(v) + ' d';
    if (unit === '1-5')   return Number(v).toFixed(1);
    if (unit === 'score') return Number(v).toFixed(2);
    if (unit === 'count') return Math.round(v).toString();
    if (unit === 'rate')  return Number(v).toFixed(2);
    return String(v);
  }
  function lastNonNullIdx(arr) {
    for (var i = arr.length - 1; i >= 0; i--) if (arr[i] != null) return i;
    return -1;
  }
  function sparkSvg(series, color, monthLabels, unit) {
    var nonNull = series.filter(function (v) { return v != null; });
    if (!nonNull.length) return '';
    var maxv = Math.max.apply(null, nonNull);
    var minv = Math.min.apply(null, nonNull);
    if (maxv === minv) { maxv = maxv + 1; minv = minv - 1; }
    var W = 200, H = 38, P = 4;
    var pts = [], coords = [];
    series.forEach(function (v, i) {
      if (v == null) return;
      var x = P + (W - 2*P) * i / Math.max(series.length - 1, 1);
      var y = H - P - (H - 2*P) * (v - minv) / (maxv - minv);
      pts.push(x.toFixed(1) + ',' + y.toFixed(1));
      coords.push({ i: i, x: x, y: y, v: v });
    });
    var poly = pts.join(' ');
    var dots = '', hits = '';
    var slotW = (W - 2*P) / Math.max(series.length - 1, 1);
    coords.forEach(function (c, k) {
      dots += '<circle class="spark-pt" data-idx="' + c.i + '"' +
              ' cx="' + c.x.toFixed(1) + '" cy="' + c.y.toFixed(1) + '"' +
              ' r="' + (k === coords.length - 1 ? 2.8 : 1.8) + '"' +
              ' fill="' + color + '" stroke="#161b22" stroke-width="1.2"/>';
      var tipText = (monthLabels && monthLabels[c.i] ? monthLabels[c.i] : '') +
                    ': ' + fmtVal(c.v, unit);
      var rx = c.x - slotW/2;
      if (rx < 0) rx = 0;
      var rw = slotW;
      if (rx + rw > W) rw = W - rx;
      hits += '<rect class="spark-hit" data-idx="' + c.i + '"' +
              ' data-tip="' + esc(tipText) + '"' +
              ' x="' + rx.toFixed(1) + '" y="0"' +
              ' width="' + rw.toFixed(1) + '" height="' + H + '" fill="transparent"/>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" style="width:100%; height:38px;">' +
      '<polyline points="' + poly + ' ' + (W-P) + ',' + (H-P) + ' ' + P + ',' + (H-P) + '" fill="' + color + '22"/>' +
      '<polyline points="' + poly + '" fill="none" stroke="' + color + '" stroke-width="1.8"/>' +
      dots + hits +
      '</svg>';
  }

  // ============================================================
  // === Generic renderers (shared across all 3 HSE roles) ======
  // ============================================================

  function renderDefs(data, label, viewId) {
    var html = '<div class="eyebrow">' + esc(label) + '</div>';
    html += '<h1 class="page-h">Key Performance Indicator (KPI) Definitions</h1>';
    html += '<p class="lead">Strategic purpose, calculation methodology, target, and data source for each KPI.</p>';
    data.kpi_definitions.forEach(function (d) {
      html += '<div class="kpi-def">';
      html += '<div class="kpi-def-h">';
      html += '<span class="kpi-def-id">' + esc(d.id) + '</span>';
      html += '<span class="kpi-def-name">' + esc(d.name) + '</span>';
      html += '</div>';
      html += '<div class="kpi-def-body">';
      html += '<div class="kpi-def-block full"><div class="lbl">Description / Strategic Purpose</div><div>' + esc(d.description) + '</div></div>';
      html += '<div class="kpi-def-block full"><div class="lbl">Calculation Methodology</div><pre>' + esc(d.methodology) + '</pre></div>';
      html += '<div class="kpi-def-block"><div class="lbl">Unit</div><div>' + esc(d.unit) + '</div></div>';
      html += '<div class="kpi-def-block"><div class="lbl">Target</div><div><span class="target-pill">' + esc(d.target) + '</span></div></div>';
      html += '<div class="kpi-def-block full"><div class="lbl">Data Source</div><div>' + esc(d.data_source) + '</div></div>';
      html += '</div></div>';
    });
    document.getElementById(viewId).innerHTML = html;
  }

  function renderScoring(data, label, viewId) {
    var s = data.scoring_matrix;
    var html = '<div class="eyebrow">' + esc(label) + '</div>';
    html += '<h1 class="page-h">Scoring Matrix</h1>';
    html += '<p class="lead">Each KPI scored 1 (Unsatisfactory) to 5 (Outstanding). Weighted composite drives the overall performance rating.</p>';

    html += '<div class="card" style="padding:0; overflow:hidden;">';
    html += '<div style="padding:14px 20px; background:rgba(255,255,255,0.02); border-bottom:1px solid #30363d;"><div class="card-h">Score bands &amp; weights</div></div>';
    html += '<table class="scoring-table" style="border:0; border-radius:0;">';
    html += '<colgroup>' +
              '<col style="width:7%"><col style="width:22%"><col style="width:7%">' +
              '<col class="band-col"><col class="band-col"><col class="band-col"><col class="band-col"><col class="band-col">' +
              '<col style="width:8%">' +
            '</colgroup>';
    html += '<thead><tr><th>KPI</th><th>KPI Name</th><th>Weight</th>';
    html += '<th class="band-cell"><span class="band-num">1</span><span class="band-label">Unsatisfactory</span></th>';
    html += '<th class="band-cell"><span class="band-num">2</span><span class="band-label">Below</span></th>';
    html += '<th class="band-cell"><span class="band-num">3</span><span class="band-label">Meets</span></th>';
    html += '<th class="band-cell"><span class="band-num">4</span><span class="band-label">Exceeds</span></th>';
    html += '<th class="band-cell"><span class="band-num">5</span><span class="band-label">Outstanding</span></th>';
    html += '<th>Direction</th></tr></thead><tbody>';
    s.kpis.forEach(function (k) {
      html += '<tr>';
      html += '<td class="kpi-cell">' + esc(k.id) + '</td>';
      html += '<td>' + esc(k.name) + '</td>';
      html += '<td class="weight-cell">' + (k.weight == null ? '—' : k.weight) + '</td>';
      for (var i = 0; i < 5; i++) {
        html += '<td class="band-cell band-' + (i+1) + '">' + esc(k.bands[i] || '') + '</td>';
      }
      html += '<td style="font-size:10.5px; color:#8b949e;">' + esc(k.direction || '') + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    html += '<div class="card">';
    html += '<div class="card-h">Composite Performance Rating</div>';
    html += '<div class="card-sub">Σ (weight × score) — final rating drives management review actions.</div>';
    s.composite.forEach(function (c) {
      var rating = (c.rating || '').split(' ')[0];
      html += '<div class="composite-rating">';
      html += '<div class="r">' + esc(c.range) + '</div>';
      html += '<div><span class="rating-pill rating-' + esc(rating) + '">' + esc(c.rating) + '</span></div>';
      html += '<div class="interp">' + esc(c.interpretation) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    document.getElementById(viewId).innerHTML = html;
  }

  function renderTracker(data, label, viewId) {
    var t = data.monthly_tracker;
    var html = '<div class="eyebrow">' + esc(label) + ' · ' + (t.year || 2026) + '</div>';
    html += '<h1 class="page-h">Monthly Tracker</h1>';
    html += '<p class="lead">Weighted composite score across the KPIs. Per-month entries with YTD rollup.</p>';

    // Composite hero
    var rating = (t.rating || '').split(' ')[0];
    var monthsScored = 0;
    t.metrics.forEach(function (m) {
      if (m.role === 'metric' && m.months) {
        m.months.forEach(function (v, i) { if (v != null) monthsScored = Math.max(monthsScored, i+1); });
      }
    });
    var scored = t.composite_rows.filter(function (r) { return r.score != null; }).length;

    if (t.composite_score != null) {
      html += '<div class="composite-hero">';
      html += '<div>';
      html += '<div class="composite-hero-h">Composite YTD</div>';
      html += '<div class="composite-hero-val">' + Number(t.composite_score).toFixed(2) + '</div>';
      html += '<div><span class="composite-hero-rating rating-' + esc(rating) + '">' + esc(t.rating) + '</span></div>';
      html += '</div>';
      html += '<div class="composite-hero-breakdown">';
      html += '<div>YTD MONTHS<b>' + monthsScored + '</b></div>';
      html += '</div>';
      html += '</div>';
    }

    // Per-KPI cards built from "→" result rows
    var KPI_COLORS = ['#5DA3E0','#5DCAA5','#C9A961','#A77CCB','#EF9F27','#E47480','#2DD4BF','#16A34A'];

    // Walk metrics — for each section header (KPI-N · ...), find the LAST
    // "→" result row that has a score, and build a card from it.
    var cards = [];
    var curKpi = null;
    var curName = '';
    var pending = null;  // last seen "→" row in this section
    t.metrics.forEach(function (m) {
      if (m.role === 'section') {
        var match = (m.label || '').match(/^(KPI-[\dA-Z]+)\s*[·•-]\s*(.*)$/);
        if (match) {
          // Only flush + reset on a NEW main KPI section header. Sub-section
          // headers (INCIDENTS, STATISTICS, EXPOSURE HOURS, etc.) stay inside
          // the current KPI so they don't cause duplicate cards.
          if (curKpi && pending) cards.push({ kpi: curKpi, name: curName, row: pending });
          curKpi = match[1]; curName = match[2]; pending = null;
        }
      } else if (m.role === 'metric' && curKpi) {
        // Result row = any metric with a score in this KPI's section.
        // QA/QC marks them with "→" prefix; HSE workbooks use ":" suffix or no
        // marker at all. The score field is the universal signal.
        if (m.score != null) pending = m;
      }
    });
    if (curKpi && pending) cards.push({ kpi: curKpi, name: curName, row: pending });

    if (cards.length) {
      html += '<div class="kpi-grid">';
      cards.forEach(function (c, idx) {
        var color = KPI_COLORS[idx % KPI_COLORS.length];
        var row = c.row;
        var lastIdx = lastNonNullIdx(row.months || []);
        var lastVal = lastIdx >= 0 ? row.months[lastIdx] : null;
        var lastMon = lastIdx >= 0 ? t.months[lastIdx] : '';
        var scoreClass = row.score == null ? 'score-na' : 'score-' + Math.round(row.score);
        var scoreText  = row.score == null ? '—' : 'score ' + Number(row.score).toFixed(2) + ' / 5';
        var nameClean = (row.label || '').replace(/^→\s*/, '');
        html += '<div class="kpi-card">';
        html += '<div class="id" style="color:' + color + ';">' + esc(c.kpi) + '</div>';
        html += '<h3>' + esc(c.name || nameClean) + '</h3>';
        html += '<div class="vals">';
        html += '<div><div class="curr-lbl">' + esc(lastMon || '') + '</div><div class="curr">' + fmtVal(lastVal, row.unit) + '</div></div>';
        html += '<div><div class="ytd-lbl">YTD</div><div class="ytd">' + fmtVal(row.ytd, row.unit) + '</div></div>';
        html += '</div>';
        html += '<div class="spark">' + sparkSvg(row.months || [], color, t.months, row.unit) + '</div>';
        html += '<div class="foot">';
        html += '<div class="target">Target: ' + esc(row.target || '—') + '</div>';
        html += '<span class="score-badge ' + scoreClass + '">' + scoreText + '</span>';
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';
    }

    // Contribution table
    if (t.composite_rows && t.composite_rows.length) {
      html += '<div class="card">';
      html += '<div class="card-h">Composite score &middot; weighted contribution (YTD)</div>';
      html += '<table class="contrib-table"><thead><tr>';
      html += '<th>KPI</th><th class="num">Weight</th><th class="num">YTD Score (1-5)</th><th class="num">Weighted contribution</th>';
      html += '</tr></thead><tbody>';
      var totalWeight = 0, totalWeighted = 0;
      t.composite_rows.forEach(function (r) {
        totalWeight += (r.weight != null ? r.weight : 0);
        totalWeighted += (r.weighted != null ? r.weighted : 0);
        html += '<tr><td>' + esc(r.kpi) + '</td>';
        html += '<td class="num">' + (r.weight != null ? Number(r.weight).toFixed(3) : '—') + '</td>';
        html += '<td class="num">' + (r.score != null ? Number(r.score).toFixed(2) : 'N/A') + '</td>';
        html += '<td class="num">' + (r.weighted != null ? Number(r.weighted).toFixed(3) : '0.000') + '</td></tr>';
      });
      html += '<tr class="total"><td>COMPOSITE SCORE</td>';
      html += '<td class="num">' + (totalWeight ? totalWeight.toFixed(3) : '—') + '</td>';
      html += '<td class="num">—</td>';
      html += '<td class="num">' + totalWeighted.toFixed(3) + '</td></tr>';
      html += '</tbody></table></div>';
    }

    document.getElementById(viewId).innerHTML = html;
  }

  function renderSources(data, label, viewId) {
    var d = data.data_sources;
    var html = '<div class="eyebrow">' + esc(label) + '</div>';
    html += '<h1 class="page-h">Data Sources &amp; Governance</h1>';
    html += '<p class="lead">Where each KPI&apos;s numbers come from, who owns the data, and how long evidence is retained.</p>';

    html += '<div class="card" style="padding:0; overflow:hidden;">';
    html += '<div style="padding:14px 20px; background:rgba(255,255,255,0.02); border-bottom:1px solid #30363d;"><div class="card-h">Source mapping</div></div>';
    html += '<table class="ds-table" style="border:0; border-radius:0;">';
    html += '<thead><tr><th>KPI</th><th>KPI Name</th><th>Primary source</th><th>System / Document</th><th>Owner</th><th>Frequency</th><th>Retention</th></tr></thead><tbody>';
    d.rows.forEach(function (r) {
      html += '<tr>';
      html += '<td class="id-cell">' + esc(r.id) + '</td>';
      html += '<td class="kpi-cell">' + esc(r.kpi) + '</td>';
      html += '<td>' + esc(r.source) + '</td>';
      html += '<td>' + esc(r.system) + '</td>';
      html += '<td>' + esc(r.owner) + '</td>';
      html += '<td>' + esc(r.frequency) + '</td>';
      html += '<td>' + esc(r.retention) + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    html += '<div class="card">';
    html += '<div class="card-h">Governance &amp; Control Principles</div>';
    html += '<div class="gov-grid">';
    d.governance.forEach(function (g) {
      html += '<div class="lbl">' + esc(g.label) + '</div><div class="txt">' + esc(g.text) + '</div>';
    });
    html += '</div></div>';
    document.getElementById(viewId).innerHTML = html;
  }

  // Render all 12 views (3 groups × 4 sub-tabs)
  Object.keys(GROUPS).forEach(function (key) {
    var g = GROUPS[key];
    if (!g.data) return;
    renderDefs(g.data,    g.label, 'view-' + key + '-defs');
    renderScoring(g.data, g.label, 'view-' + key + '-scoring');
    renderTracker(g.data, g.label, 'view-' + key + '-tracker');
    renderSources(g.data, g.label, 'view-' + key + '-sources');
  });

  // Sidebar footer — use Corporate standards line (representative)
  (function () {
    var footEl = document.getElementById('side-footer');
    var std = GROUPS.cor.data && GROUPS.cor.data.cover && GROUPS.cor.data.cover.standards;
    if (footEl && std) {
      footEl.innerHTML = '<span class="lbl">Aligned with</span>' +
                         '<span class="txt">' + esc(std) + '</span>';
    }
  })();

  // Collapsible sidebar groups
  document.querySelectorAll('.side-group-header').forEach(function (h) {
    h.addEventListener('click', function () {
      h.parentElement.classList.toggle('expanded');
    });
  });

  // === Tab switching ===
  function activate(tab) {
    document.querySelectorAll('.side-item').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-tab') === tab);
    });
    document.querySelectorAll('.view').forEach(function (el) {
      el.classList.toggle('active', el.id === 'view-' + tab);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try { history.replaceState(null, '', '#' + tab); } catch (e) {}
    if (window.opcoTrack) try { window.opcoTrack('tab', 'hse:' + tab); } catch(e) {}
    // Auto-expand the matching group when activating a tab inside it
    var groupKey = tab.split('-')[0];
    var grpEl = document.querySelector('.side-group[data-group]');
    document.querySelectorAll('.side-group').forEach(function (g) {
      var dg = g.getAttribute('data-group') || '';
      if ((groupKey === 'cor' && dg === 'corporate') ||
          (groupKey === 'prj' && dg === 'project') ||
          (groupKey === 'sup' && dg === 'supervisor')) {
        g.classList.add('expanded');
      }
    });
  }
  document.querySelectorAll('.side-item').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      activate(el.getAttribute('data-tab'));
    });
  });
  var initial = (location.hash || '').replace('#', '');
  if (initial && document.getElementById('view-' + initial)) activate(initial);

  // === Sparkline hover tooltip ===
  (function () {
    var tip = document.createElement('div');
    tip.className = 'spark-tip';
    document.body.appendChild(tip);
    var lastSpark = null;
    function clearActive() {
      if (lastSpark) {
        lastSpark.classList.remove('is-hover');
        lastSpark.querySelectorAll('.spark-pt[data-active="1"]').forEach(function (p) {
          p.removeAttribute('data-active');
        });
        lastSpark = null;
      }
    }
    function hide() { tip.style.display = 'none'; clearActive(); }
    document.addEventListener('mousemove', function (e) {
      var hit = e.target;
      if (!hit || hit.tagName !== 'rect' || !hit.classList.contains('spark-hit')) {
        hide(); return;
      }
      var txt = hit.getAttribute('data-tip') || '';
      var parts = txt.split(': ');
      var month = parts[0] || '';
      var val   = parts.slice(1).join(': ');
      tip.innerHTML = '<span class="tip-month">' + esc(month) + '</span>' +
                      '<span class="tip-val">' + esc(val) + '</span>';
      tip.style.display = 'block';
      var tipRect = tip.getBoundingClientRect();
      var x = e.clientX + 12, y = e.clientY - tipRect.height - 8;
      if (x + tipRect.width > window.innerWidth - 8) x = e.clientX - tipRect.width - 12;
      if (y < 8) y = e.clientY + 14;
      tip.style.left = x + 'px';
      tip.style.top  = y + 'px';
      var spark = hit.closest('.spark');
      if (spark !== lastSpark) clearActive();
      lastSpark = spark;
      spark.classList.add('is-hover');
      var idx = hit.getAttribute('data-idx');
      spark.querySelectorAll('.spark-pt').forEach(function (p) { p.removeAttribute('data-active'); });
      var dot = spark.querySelector('.spark-pt[data-idx="' + idx + '"]');
      if (dot) dot.setAttribute('data-active', '1');
    }, true);
    document.addEventListener('mouseleave', hide, true);
    window.addEventListener('scroll', hide, true);
  })();
})();
</script>
</body>
</html>
"""

out = HEAD + SIDEBAR + DATA_TAGS + SCRIPT_BODY
(ROOT / 'static' / 'hse.html').write_text(out, encoding='utf-8')
print('wrote static/hse.html, size:', len(out))
