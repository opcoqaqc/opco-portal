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


def update_tab_counts(html, all_rows):
    """Ana tab butonlarindaki <span class="count" data-count="X">N</span>
    icindeki sayiyi Drive'daki gercek dosya toplamiyla degistirir.
    """
    COUNT_PREFIXES = {
        'qms':      'OPCO Portal Documents/QMS/',
        'projects': 'OPCO Portal Documents/PROJECTS/',
        'library':  'OPCO Portal Documents/LIBRARY/',
    }

    def count_files(prefix):
        return len([r for r in all_rows
                    if r['type'] == 'file' and r['path'].startswith(prefix)])

    def repl(match):
        key = match.group(1)
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
    print("Tab count'lari guncelleniyor...")
    html = update_tab_counts(html, rows)

    if html == original:
        print("\nDegisiklik yok.")
        return

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"\nGuncellendi: {HTML_FILE}  ({len(html) - len(original):+d} char)")


if __name__ == '__main__':
    main()
