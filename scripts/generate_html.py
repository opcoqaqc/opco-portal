"""
OPCO Portal - HTML Generator (CI surumu)
=========================================
drive_links.csv'yi okur ve index.html'deki GEN-START/GEN-END marker'lari
arasindaki dept/proje panellerini yeniden uretir.

Farki (lokal surumle):
  - HTML_FILE ve CSV_FILE ortam degiskenleriyle override edilebilir
  - Hicbir zaman interactive input beklemez
  - Degisiklik yoksa bile exit 0

Ortam degiskenleri:
    HTML_FILE   Default: index.html  (mevcut calisma dizinine gore)
    CSV_FILE    Default: drive_links.csv

Kullanim:
    python generate_html.py
"""

import csv
import os
import re
import sys
import html as html_module
from collections import defaultdict

HTML_FILE = os.environ.get('HTML_FILE', 'index.html')
CSV_FILE = os.environ.get('CSV_FILE', 'drive_links.csv')


QMS_DEPTS = [
    ('qms-qcd',  'QCD',  'OPCO Portal Documents/QMS/1-QCD'),
    ('qms-hse',  'HSE',  'OPCO Portal Documents/QMS/2-HSE'),
    ('qms-adm',  'ADM',  'OPCO Portal Documents/QMS/3-ADM'),
    ('qms-hrd',  'HRD',  'OPCO Portal Documents/QMS/4-HRD'),
    ('qms-whs',  'WHS',  'OPCO Portal Documents/QMS/5-WHS'),
    ('qms-prd',  'PRD',  'OPCO Portal Documents/QMS/6-PRD'),
    ('qms-pcd',  'PCD',  'OPCO Portal Documents/QMS/7-PCD'),
    ('qms-fnd',  'FND',  'OPCO Portal Documents/QMS/8-FND'),
    ('qms-com',  'COM',  'OPCO Portal Documents/QMS/9-COM'),
]

PROJECTS = [
    ('project-htu',  'HTU',  'OPCO Portal Documents/PROJECTS/HTU'),
    ('project-hpu',  'HPU',  'OPCO Portal Documents/PROJECTS/HPU'),
    ('project-ppcl', 'PPCL', 'OPCO Portal Documents/PROJECTS/PPCL'),
]

# SKG-261 has its own multi-tier panel structure.
# Top-level Drive folders under PROJECTS/SKG/ are recognised by the token
# remaining after stripping a numeric prefix like "1-", "2-", etc.
SKG_BASE = 'OPCO Portal Documents/PROJECTS/SKG'
# Token (uppercase, prefix stripped) -> SKG group key
SKG_GROUP_TOKENS = {
    'PROCEDURES':    'procedures',
    'ITP':           'itp',
    'REGISTERS':     'registers',
    'PLANS':         'plans',
    'SPECIFICATION': 'specifications',
    'SPECIFICATIONS':'specifications',
}
# Discipline letter in the document code (OPCO-SKG-261-QCD-XX-PRO-...)
# -> discipline panel suffix. Used only as a last-resort fallback for files
# stored directly under PROCEDURES/ (i.e. not in any discipline subfolder).
SKG_DISCIPLINE_LETTERS = {
    'GN': 'general',
    'PL': 'pipeline',
    'PI': 'piping',
    'CS': 'civil',
    'CP': 'civil',
    'EQ': 'civil',
    'EL': 'electrical',
    'IN': 'instrument',
}
# Drive subfolder name (numeric prefix stripped, uppercased) under
# PROCEDURES/ -> discipline panel suffix. Drives the General/Pipeline/...
# bucketing so files are placed by *folder*, not by parsing the filename.
SKG_PROCEDURE_FOLDER_SLUGS = {
    'GENERAL':                                    'general',
    'PIPELINE':                                   'pipeline',
    'PIPING':                                     'piping',
    'CIVIL':                                      'civil',
    'CIVIL EQUIPMENT':                            'civil',
    'CIVIL & EQUIPMENT':                          'civil',
    'CIVIL/EQUIPMENT':                            'civil',
    'EQUIPMENT':                                  'civil',
    'EQUIPMENT INSTALLATION':                     'civil',
    'STRUCTURAL':                                 'civil',
    'CIVIL-STRUCTURAL-EQUIPMENT INSTALLATION':    'civil',
    'CIVIL STRUCTURAL EQUIPMENT INSTALLATION':    'civil',
    'CIVIL/STRUCTURAL/EQUIPMENT INSTALLATION':    'civil',
    'CIVIL & STRUCTURAL & EQUIPMENT INSTALLATION':'civil',
    'ELECTRICAL':                                 'electrical',
    'INSTRUMENT':                                 'instrument',
    'INSTRUMENTATION':                            'instrument',
    'INSTRUMENT TELECOM':                         'instrument',
    'INSTRUMENT & TELECOM':                       'instrument',
    'INSTRUMENTATION TELECOM':                    'instrument',
    'INSTRUMENTATION & TELECOM':                  'instrument',
    'TELECOM':                                    'instrument',
}
# Header copy for each SKG panel.
SKG_PANEL_INFO = {
    'skg-general':        ('SKG-261 — General Procedures',
                           'General field procedures applicable to all disciplines.'),
    'skg-pipeline':       ('SKG-261 — Pipeline Procedures',
                           'Procedures specific to pipeline construction and welding.'),
    'skg-piping':         ('SKG-261 — Piping Procedures',
                           'Procedures specific to piping construction and welding.'),
    'skg-civil':          ('SKG-261 — Civil, Structural & Equipment Installation',
                           'Civil, structural, and equipment installation procedures.'),
    'skg-electrical':     ('SKG-261 — Electrical Procedures',
                           'Electrical works procedures.'),
    'skg-instrument':     ('SKG-261 — Instrumentation & Telecom Procedures',
                           'Instrumentation & telecom procedures.'),
    'skg-itp':            ('SKG-261 — Inspection & Test Plans',
                           'Inspection and test plans for the SKG-261 project.'),
    'skg-registers':      ('SKG-261 — Registers',
                           'Registers and trackers for the SKG-261 project.'),
    'skg-others':         ('SKG-261 — Plans',
                           'Construction Quality Plan for the SKG-261 project.'),
    'skg-specifications': ('SKG-261 — Specifications',
                           'Technical and project specifications.'),
}
SKG_DISCIPLINE_PANELS = [
    'skg-general', 'skg-pipeline', 'skg-piping',
    'skg-civil', 'skg-electrical', 'skg-instrument',
]
SKG_OTHER_PANELS = [
    ('itp',            'skg-itp'),
    ('registers',      'skg-registers'),
    ('plans',          'skg-others'),
    ('specifications', 'skg-specifications'),
]

# LIBRARY: her kategori (PQR/WPS/WQT) altinda 3 alt-klasor var (Pipeline/Piping/In-Service).
# Bir GEN-START blok 3 panel uretir.
LIBRARY_SECTIONS = [
    ('library-pqr', 'PQR', 'OPCO Portal Documents/LIBRARY/PQR'),
    ('library-wps', 'WPS', 'OPCO Portal Documents/LIBRARY/WPS'),
    ('library-wqt', 'WQT', 'OPCO Portal Documents/LIBRARY/WQT'),
]

# Drive klasor adi -> panel suffix
LIBRARY_SUB_SLUG = {
    'PIPELINE':   'pipeline',
    'PIPING':     'piping',
    'IN-SERVICE': 'inservice',
}

LIBRARY_SUB_LABEL = {
    'pipeline':  'Pipeline',
    'piping':    'Piping',
    'inservice': 'In-Service',
}


def load_csv():
    if not os.path.exists(CSV_FILE):
        print(f"HATA: {CSV_FILE} bulunamadi.", file=sys.stderr)
        sys.exit(1)
    with open(CSV_FILE, encoding='utf-8-sig') as f:
        return list(csv.DictReader(f))


def mime_to_icon(mime, name):
    name_lower = name.lower()
    if name_lower.endswith('.pdf') or 'pdf' in mime:
        return 'pdf', 'PDF'
    if name_lower.endswith(('.xlsx', '.xls')) or 'spreadsheet' in mime or 'excel' in mime:
        return 'xlsx', 'XLSX'
    if name_lower.endswith(('.docx', '.doc')) or 'wordprocessing' in mime or 'document' in mime:
        return 'docx', 'DOCX'
    return 'docx', 'FILE'


def drive_download_url(file_id):
    return f"https://drive.google.com/uc?export=download&id={file_id}"


def esc(s):
    return html_module.escape(s, quote=True)


def pretty_filename(name):
    base = re.sub(r'\.[A-Za-z0-9]+$', '', name)
    base = base.replace('_', ' ').strip()
    return base


def extract_doc_code(name):
    m = re.search(r'(OPCO-[A-Z0-9]+(?:-[A-Z0-9]+)+)', name)
    return m.group(1) if m else ''


def render_file_item(row):
    icon_class, icon_label = mime_to_icon(row.get('mime', ''), row['name'])
    title = pretty_filename(row['name'])
    code = extract_doc_code(row['name'])
    meta = code if code else row['name']
    url = drive_download_url(row['id'])
    return f'''      <div class="doc-item">
        <div class="doc-icon {icon_class}">{icon_label}</div>
        <div class="doc-info">
          <div class="doc-title">{esc(title)}</div>
          <div class="doc-meta">{esc(meta)}</div>
        </div>
        <div class="doc-action">
          <a class="btn btn-primary" href="{url}" target="_blank" rel="noopener">Download</a>
        </div>
      </div>'''


def build_group(group_title, files, data_qms_group=None):
    if not files:
        return ''
    files = sorted(files, key=lambda r: r['name'])
    items_html = '\n'.join(render_file_item(r) for r in files)
    data_attr = f' data-qms-group="{esc(data_qms_group)}"' if data_qms_group else ''
    return f'''  <div class="subsection"{data_attr}>
    <div class="subsection-title">{esc(group_title)} <span style="opacity:0.6; font-weight:500; font-size:13px;">({len(files)})</span></div>
    <div class="doc-list">
{items_html}
    </div>
  </div>'''


PREFIX_NAMES = {
    'MAN': 'Manuals', 'PLN': 'Plans', 'PRO': 'Procedures', 'FRM': 'Forms',
    'REG': 'Registers', 'LGS': 'Log Sheets', 'LTR': 'Letters', 'CHR': 'Charts',
    'AGR': 'Agreements', 'CER': 'Certificates', 'CON': 'Contracts', 'CONT': 'Contracts',
    'PLY': 'Policies', 'SCH': 'Schedules', 'ITP': 'Inspection & Test Plans',
    'BGT': 'Budgets', 'BSC': 'Business Cases', 'DNT': 'Delivery Notes',
    'RNT': 'Receipt Notes', 'RPT': 'Reports', 'POR': 'Purchase Orders',
    'LST': 'Lists', 'VOU': 'Vouchers', 'DPR': 'Daily Progress Reports',
    'MPR': 'Monthly Progress Reports', 'WPR': 'Weekly Progress Reports',
    'PUN': 'Punch Lists', 'GN': 'General', 'OTHER': 'Other Documents',
    'MDR': 'MDR', 'RFP': 'RFP', 'RFQ': 'RFQ', 'PCP': 'Project Control',
    'TSC': 'Technical Spec', 'WBS': 'WBS', 'SPC': 'Specifications',
    'IRR': 'IRR', 'BOQ': 'BOQ', 'SD': 'SD', 'RSPL': 'RSPL',
}

PREFIX_ORDER = ['MAN', 'PLN', 'PRO', 'PLY', 'FRM', 'CHR', 'REG',
                'SCH', 'ITP', 'LGS', 'LST', 'LTR', 'AGR', 'CER',
                'CON', 'CONT', 'BGT', 'BSC', 'POR', 'DNT', 'RNT', 'RPT',
                'VOU', 'PUN', 'MDR', 'DPR', 'MPR', 'WPR',
                'PCP', 'TSC', 'WBS', 'SPC', 'IRR', 'BOQ', 'SD', 'RSPL',
                'RFP', 'RFQ', 'GN', 'OTHER']


def _get_doc_type_prefix(name):
    matches = re.findall(r'-([A-Z]{2,4})-\d', name)
    if not matches:
        return 'OTHER'
    return matches[-1]


PREFIX_TO_GROUP = {
    'MAN': 'manuals', 'PLN': 'plans', 'PRO': 'procedures', 'FRM': 'forms',
    'REG': 'registers', 'SCH': 'schedules', 'ITP': 'itps', 'RPT': 'reports',
    'PUN': 'punch-lists', 'LGS': 'log-sheets', 'LTR': 'letters', 'CHR': 'charts',
    'LST': 'lists', 'PLY': 'policies', 'AGR': 'agreements', 'CER': 'certificates',
    'CON': 'contracts', 'CONT': 'contracts', 'BGT': 'budgets', 'BSC': 'business-cases',
    'POR': 'purchase-orders', 'DNT': 'delivery-notes', 'RNT': 'receipt-notes',
    'VOU': 'vouchers', 'DPR': 'daily-progress', 'MPR': 'monthly-progress',
    'WPR': 'weekly-progress', 'GN': 'general', 'MDR': 'mdr',
    'RFP': 'rfp', 'RFQ': 'rfq', 'PCP': 'project-control',
    'TSC': 'technical-spec', 'WBS': 'wbs', 'SPC': 'spec',
    'IRR': 'irr', 'BOQ': 'boq', 'SD': 'sd', 'RSPL': 'rspl', 'OTHER': 'other',
}


def _build_flat_by_prefix(label, files, use_qms_groups=False):
    by_prefix = defaultdict(list)
    for f in files:
        by_prefix[_get_doc_type_prefix(f['name'])].append(f)

    def qms_group_for(pfx):
        return PREFIX_TO_GROUP.get(pfx, 'other-' + pfx.lower())

    groups = []
    seen = set()
    for pfx in PREFIX_ORDER:
        if pfx in by_prefix and pfx not in seen:
            name = PREFIX_NAMES.get(pfx, pfx)
            qms_grp = qms_group_for(pfx) if use_qms_groups else None
            groups.append(build_group(name, by_prefix[pfx], data_qms_group=qms_grp))
            seen.add(pfx)
    for pfx in sorted(by_prefix.keys()):
        if pfx not in seen:
            name = PREFIX_NAMES.get(pfx, pfx)
            qms_grp = qms_group_for(pfx) if use_qms_groups else None
            groups.append(build_group(name, by_prefix[pfx], data_qms_group=qms_grp))

    if not groups:
        groups.append('''  <div class="section-header" style="text-align:center; padding: 60px 20px;">
    <div style="font-size: 48px; line-height: 1; margin-bottom: 12px; opacity: 0.55;">&#128230;</div>
    <p>No documents yet.</p>
  </div>''')

    return '\n\n'.join(groups)


def _build_by_folder(label, all_rows, prefix, folder_slug_map=None, use_qms_groups=False):
    prefix_slash = prefix + '/'
    folder_slug_map = folder_slug_map or {}
    direct_subfolders = [r for r in all_rows
                         if r['type'] == 'folder'
                         and r['path'].startswith(prefix_slash)
                         and r['path'].count('/') == prefix.count('/') + 1]

    groups_html = []
    for folder in sorted(direct_subfolders, key=lambda x: x['name']):
        folder_prefix = folder['path'] + '/'
        folder_files = [r for r in all_rows
                        if r['type'] == 'file' and r['path'].startswith(folder_prefix)]
        folder_title = re.sub(r'^\d+[-.\s]*', '', folder['name']).strip()
        slug = folder_slug_map.get(folder_title.upper())
        if not slug:
            slug = re.sub(r'[^a-z0-9]+', '-', folder_title.lower()).strip('-')
        qms_grp = slug if use_qms_groups else None
        groups_html.append(build_group(folder_title, folder_files, data_qms_group=qms_grp))

    if not groups_html:
        groups_html.append('''  <div class="section-header" style="text-align:center; padding: 60px 20px;">
    <div style="font-size: 48px; line-height: 1; margin-bottom: 12px; opacity: 0.55;">&#128230;</div>
    <p>No documents yet.</p>
  </div>''')
    return '\n\n'.join(groups_html)


def _build_hse_by_folder(label, all_rows, prefix, use_qms_groups=False):
    FOLDER_SLUG = {
        'HSE POLICIES':             'hse-policies',
        'HSE PROCEDURES':           'hse-procedures',
        'HSE PLANS':                'hse-plans',
        'HSE FORMS':                'hse-forms',
        'HSE INSPECTION CHECKLIST': 'hse-inspection',
        'HSE REGISTERS':            'hse-registers',
    }
    return _build_by_folder(label, all_rows, prefix, FOLDER_SLUG, use_qms_groups=use_qms_groups)


def build_panel_content(panel_id, label, prefix, all_rows):
    prefix_slash = prefix + '/'
    all_files = [r for r in all_rows if r['type'] == 'file' and r['path'].startswith(prefix_slash)]

    if panel_id == 'qms-hse':
        return _build_hse_by_folder(label, all_rows, prefix, use_qms_groups=True)
    if panel_id == 'project-hpu':
        return _build_by_folder(label, all_rows, prefix, folder_slug_map=None, use_qms_groups=True)
    return _build_flat_by_prefix(label, all_files, use_qms_groups=True)


def build_panel(panel_id, label, prefix, all_rows):
    content = build_panel_content(panel_id, label, prefix, all_rows)
    return f'''<!-- GEN-START: {panel_id} -->
<section class="panel" id="{panel_id}">
{content}
</section>
<!-- GEN-END: {panel_id} -->'''


def _library_empty_panel(panel_id, header_label):
    """LIBRARY alt klasoru bos ise gosterilecek panel."""
    return f'''<section class="panel" id="{panel_id}">
  <div class="section-header" style="text-align:center; padding: 80px 20px;">
    <div style="font-size: 56px; line-height: 1; margin-bottom: 14px; opacity: 0.55;">&#128230;</div>
    <h2 style="font-size: 22px; margin: 0;">{esc(header_label)} &middot; No documents yet</h2>
    <p style="max-width: 560px; margin: 12px auto 0;">Documents will appear here once they are added to the library.</p>
  </div>
</section>'''


def _library_filled_panel(panel_id, files):
    """Dosyalari olan LIBRARY alt klasoru icin panel uret.
    Dosyalar tek bir doc-list icinde ada gore listelenir (alt-grup yok).
    """
    files = sorted(files, key=lambda r: r['name'])
    items_html = '\n'.join(render_file_item(r) for r in files)
    return f'''<section class="panel" id="{panel_id}">
  <div class="subsection">
    <div class="doc-list">
{items_html}
    </div>
  </div>
</section>'''


def build_library_block(category_id, label, prefix, all_rows):
    """Bir LIBRARY kategorisi icin tam blok uret.
    Bir GEN-START/END blok icinde 3 panel (pipeline/piping/inservice) doner.
    """
    prefix_slash = prefix + '/'

    direct_subfolders = [r for r in all_rows
                         if r['type'] == 'folder'
                         and r['path'].startswith(prefix_slash)
                         and r['path'].count('/') == prefix.count('/') + 1]

    folder_by_slug = {}
    for folder in direct_subfolders:
        slug = LIBRARY_SUB_SLUG.get(folder['name'].upper())
        if slug:
            folder_by_slug[slug] = folder

    panels = []
    for slug in ('pipeline', 'piping', 'inservice'):
        panel_id = f'{category_id}-{slug}'
        sub_label = LIBRARY_SUB_LABEL[slug]
        header_label = f'{label} &middot; {sub_label}'

        folder = folder_by_slug.get(slug)
        if folder is None:
            panels.append(_library_empty_panel(panel_id, header_label))
            continue

        folder_prefix = folder['path'] + '/'
        folder_files = [r for r in all_rows
                        if r['type'] == 'file' and r['path'].startswith(folder_prefix)]

        if not folder_files:
            panels.append(_library_empty_panel(panel_id, header_label))
        else:
            panels.append(_library_filled_panel(panel_id, folder_files))

    panels_html = '\n'.join(panels)
    return f'''<!-- GEN-START: {category_id} -->
{panels_html}
<!-- GEN-END: {category_id} -->'''


def _skg_discipline_for(filename):
    """Return SKG discipline panel suffix (e.g. 'general') for a doc filename
    by parsing the discipline letter group in the OPCO doc code, or None."""
    m = re.search(r'-(GN|PL|PI|CS|CP|EQ|EL|IN)-(?:PRO|ITP|REG|PLN|SPC|TSC)-',
                  filename, re.IGNORECASE)
    if not m:
        return None
    return SKG_DISCIPLINE_LETTERS.get(m.group(1).upper())


def _skg_panel_block(panel_id, files):
    header_label, description = SKG_PANEL_INFO[panel_id]
    if not files:
        body = '''  <div class="section-header" style="text-align:center; padding: 60px 20px;">
    <div style="font-size: 48px; line-height: 1; margin-bottom: 12px; opacity: 0.55;">&#128230;</div>
    <p>No documents yet.</p>
  </div>'''
    else:
        files = sorted(files, key=lambda r: r['name'])
        items = '\n'.join(render_file_item(r) for r in files)
        body = f'''  <div class="doc-list">
{items}
  </div>'''
    desc_html = f'    <p>{esc(description)}</p>\n' if description else ''
    return f'''<!-- GEN-START: {panel_id} -->
<section class="panel" id="{panel_id}">
  <div class="section-header">
    <h2>{esc(header_label)}</h2>
{desc_html}  </div>
{body}
</section>
<!-- GEN-END: {panel_id} -->'''


def build_skg_blocks(all_rows):
    """Build all SKG panel blocks. Returns dict: panel_id -> rendered block, plus
    per-group file counts under key '__counts__'."""
    blocks = {}

    skg_root_slash = SKG_BASE + '/'
    direct_subfolders = [r for r in all_rows
                         if r['type'] == 'folder'
                         and r['path'].startswith(skg_root_slash)
                         and r['path'].count('/') == SKG_BASE.count('/') + 1]

    folder_by_token = {}
    for f in direct_subfolders:
        token = re.sub(r'^\d+[-.\s]+', '', f['name']).strip().upper()
        group_key = SKG_GROUP_TOKENS.get(token)
        if group_key:
            folder_by_token[group_key] = f

    def files_under(folder_row):
        if folder_row is None:
            return []
        prefix = folder_row['path'] + '/'
        return [r for r in all_rows
                if r['type'] == 'file' and r['path'].startswith(prefix)]

    counts = {}

    procedures_folder = folder_by_token.get('procedures')
    procedures_files = files_under(procedures_folder)
    counts['procedures'] = len(procedures_files)

    # Map each immediate subfolder of PROCEDURES/ to a discipline panel slug
    # (path -> slug). Anything outside these subfolders is bucketed by the
    # filename regex, falling back to 'general' for unrecognised codes.
    discipline_subfolder_paths = {}
    if procedures_folder is not None:
        proc_prefix = procedures_folder['path'] + '/'
        proc_depth = procedures_folder['path'].count('/') + 1
        for r in all_rows:
            if (r['type'] == 'folder'
                    and r['path'].startswith(proc_prefix)
                    and r['path'].count('/') == proc_depth):
                token = re.sub(r'^\d+[-.\s]+', '', r['name']).strip().upper()
                # Drive folders are named like "0-GENERAL PROCEDURES",
                # "1-PIPELINE PROCEDURES" — strip the trailing word so the
                # slug map can key on the discipline alone.
                token = re.sub(r'\s+PROCEDURES?\s*$', '', token).strip()
                slug = SKG_PROCEDURE_FOLDER_SLUGS.get(token)
                if slug:
                    discipline_subfolder_paths[r['path'] + '/'] = slug

    by_discipline = defaultdict(list)
    for f in procedures_files:
        slug = None
        for sub_prefix, sub_slug in discipline_subfolder_paths.items():
            if f['path'].startswith(sub_prefix):
                slug = sub_slug
                break
        if slug is None:
            slug = _skg_discipline_for(f['name']) or 'general'
        by_discipline[slug].append(f)
    for panel_id in SKG_DISCIPLINE_PANELS:
        slug = panel_id.replace('skg-', '')
        blocks[panel_id] = _skg_panel_block(panel_id, by_discipline.get(slug, []))

    for group_key, panel_id in SKG_OTHER_PANELS:
        files = files_under(folder_by_token.get(group_key))
        counts[group_key] = len(files)
        blocks[panel_id] = _skg_panel_block(panel_id, files)

    blocks['__counts__'] = counts
    return blocks


def update_tab_counts(html, all_rows, skg_counts=None):
    """Ana tab butonlarindaki <span class="count" data-count="X">N</span>
    icindeki sayiyi Drive'daki gercek dosya toplamiyla degistirir.
    SKG group bar count'lari icin skg_counts dict (group_key -> int) verilir.
    """
    COUNT_PREFIXES = {
        'qms':      'OPCO Portal Documents/QMS/',
        'projects': 'OPCO Portal Documents/PROJECTS/',
        'library':  'OPCO Portal Documents/LIBRARY/',
    }
    skg_counts = skg_counts or {}

    def count_files(prefix):
        return len([r for r in all_rows
                    if r['type'] == 'file' and r['path'].startswith(prefix)])

    def repl(match):
        key = match.group(1)
        if key.startswith('skg-'):
            group_key = key[len('skg-'):]
            n = skg_counts.get(group_key)
            if n is None:
                return match.group(0)
            return f'<span class="count" data-count="{key}">{n}</span>'
        prefix = COUNT_PREFIXES.get(key)
        if prefix is None:
            return match.group(0)
        n = count_files(prefix)
        return f'<span class="count" data-count="{key}">{n}</span>'

    return re.sub(
        r'<span class="count" data-count="([a-z0-9_-]+)">[^<]*</span>',
        repl,
        html,
    )


def update_html(html, panel_id, new_block):
    start = f'<!-- GEN-START: {panel_id} -->'
    end = f'<!-- GEN-END: {panel_id} -->'
    pattern = re.compile(re.escape(start) + '.*?' + re.escape(end), re.DOTALL)
    if pattern.search(html):
        return pattern.sub(new_block, html)
    anchor = '<section class="panel" id="qms-dept-empty">'
    if anchor in html:
        return html.replace(anchor, new_block + '\n\n' + anchor, 1)
    if '</body>' in html:
        return html.replace('</body>', new_block + '\n</body>', 1)
    return html + '\n' + new_block


def main():
    print("=" * 70)
    print("OPCO Portal - HTML Generator (CI)")
    print("=" * 70)
    print(f"HTML:  {HTML_FILE}")
    print(f"CSV:   {CSV_FILE}")
    print()

    if not os.path.exists(HTML_FILE):
        print(f"HATA: {HTML_FILE} bulunamadi.", file=sys.stderr)
        sys.exit(1)

    rows = load_csv()
    print(f"CSV rows: {len(rows)}")

    with open(HTML_FILE, encoding='utf-8') as f:
        html = f.read()
    original = html

    print()
    print("QMS departmanlari:")
    for panel_id, label, prefix in QMS_DEPTS:
        count = len([r for r in rows if r['type'] == 'file' and r['path'].startswith(prefix + '/')])
        print(f"  {panel_id} ({label}) - {count} file")
        html = update_html(html, panel_id, build_panel(panel_id, label, prefix, rows))

    print()
    print("Projeler:")
    for panel_id, label, prefix in PROJECTS:
        count = len([r for r in rows if r['type'] == 'file' and r['path'].startswith(prefix + '/')])
        print(f"  {panel_id} ({label}) - {count} file")
        html = update_html(html, panel_id, build_panel(panel_id, label, prefix, rows))

    print()
    print("LIBRARY:")
    for category_id, label, prefix in LIBRARY_SECTIONS:
        count = len([r for r in rows if r['type'] == 'file' and r['path'].startswith(prefix + '/')])
        print(f"  {category_id} ({label}) - {count} file")
        html = update_html(html, category_id, build_library_block(category_id, label, prefix, rows))

    print()
    print("SKG-261:")
    skg_blocks = build_skg_blocks(rows)
    skg_counts = skg_blocks.pop('__counts__', {})
    for panel_id, block in skg_blocks.items():
        print(f"  {panel_id}")
        html = update_html(html, panel_id, block)
    for group_key, n in skg_counts.items():
        print(f"  group {group_key}: {n} file")

    print()
    print("Tab count'lari guncelleniyor...")
    html = update_tab_counts(html, rows, skg_counts=skg_counts)

    if html == original:
        print("\nDegisiklik yok.")
        return

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"\nGuncellendi: {HTML_FILE}  ({len(html) - len(original):+d} char)")


if __name__ == '__main__':
    main()
