"""
OPCO Portal - Drive Link Toplayici (CI / Service Account surumu)
================================================================
Bu script Google Drive'daki "OPCO Portal Documents" klasorunu gezer
ve tum dosya/klasor linklerini drive_links.csv'ye yazar.

Farki: OAuth interactive login yerine Service Account kullanir.
Boylece GitHub Actions / cron ortaminda insan muhalakasi olmadan calisir.

Ortam degiskenleri:
    GOOGLE_SERVICE_ACCOUNT_JSON   Service account'un JSON key icerigi (string).
                                   Yoksa SERVICE_ACCOUNT_FILE yolundan okur.
    SERVICE_ACCOUNT_FILE           Alternatif: JSON key dosya yolu.
                                   Default: service_account.json
    DRIVE_ROOT_FOLDER_ID           Drive'daki kok klasorun ID'si.
                                   Yoksa DRIVE_ROOT_FOLDER_NAME ile aranir.
    DRIVE_ROOT_FOLDER_NAME         Default: "OPCO Portal Documents"
    OUTPUT_CSV                     Default: drive_links.csv

Cikis kodu:
    0 = basarili
    1 = hata (credentials yok / root klasor bulunamadi / API hatasi)
"""

import os
import sys
import csv
import json

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

ROOT_FOLDER_NAME = os.environ.get('DRIVE_ROOT_FOLDER_NAME', 'OPCO Portal Documents')
ROOT_FOLDER_ID = os.environ.get('DRIVE_ROOT_FOLDER_ID', '').strip()
OUTPUT_CSV = os.environ.get('OUTPUT_CSV', 'drive_links.csv')
SERVICE_ACCOUNT_FILE = os.environ.get('SERVICE_ACCOUNT_FILE', 'service_account.json')


def load_credentials():
    """Service account credentials'i env var'dan ya da dosyadan yukle."""
    raw_json = os.environ.get('GOOGLE_SERVICE_ACCOUNT_JSON', '').strip()
    if raw_json:
        try:
            info = json.loads(raw_json)
        except json.JSONDecodeError as e:
            print(f"HATA: GOOGLE_SERVICE_ACCOUNT_JSON gecersiz JSON: {e}", file=sys.stderr)
            sys.exit(1)
        return service_account.Credentials.from_service_account_info(info, scopes=SCOPES)

    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(
            "HATA: Service account credentials bulunamadi.\n"
            "  - GOOGLE_SERVICE_ACCOUNT_JSON env var'i set et, ya da\n"
            f"  - {SERVICE_ACCOUNT_FILE} dosyasini olustur.",
            file=sys.stderr,
        )
        sys.exit(1)

    return service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )


def find_folder_by_name(service, name):
    """Drive'daki (sirkete ait tum gorulebilir klasorlerde) isimle ara."""
    query = (
        f"name = '{name}' and "
        "mimeType = 'application/vnd.google-apps.folder' and "
        "trashed = false"
    )
    results = service.files().list(
        q=query,
        fields="files(id, name)",
        pageSize=10,
        supportsAllDrives=True,
        includeItemsFromAllDrives=True,
    ).execute()
    files = results.get('files', [])
    return files[0] if files else None


def list_children(service, parent_id):
    """Bir klasorun icerigini sayfalama ile listele."""
    items = []
    page_token = None
    while True:
        response = service.files().list(
            q=f"'{parent_id}' in parents and trashed = false",
            fields="nextPageToken, files(id, name, mimeType, webViewLink)",
            pageSize=1000,
            pageToken=page_token,
            supportsAllDrives=True,
            includeItemsFromAllDrives=True,
        ).execute()
        items.extend(response.get('files', []))
        page_token = response.get('nextPageToken')
        if not page_token:
            break
    return items


def walk_tree(service, root_id, root_name, depth=0, parent_path=""):
    """Klasor agacini rekursif gez, satir listesi dondur."""
    current_path = f"{parent_path}/{root_name}" if parent_path else root_name
    rows = []
    items = list_children(service, root_id)

    folders = [i for i in items if i['mimeType'] == 'application/vnd.google-apps.folder']
    files = [i for i in items if i['mimeType'] != 'application/vnd.google-apps.folder']

    for folder in sorted(folders, key=lambda x: x['name']):
        print(f"{'  ' * depth}[FOLDER] {folder['name']}")
        rows.append({
            'path': f"{current_path}/{folder['name']}",
            'name': folder['name'],
            'type': 'folder',
            'id': folder['id'],
            'link': folder.get('webViewLink', ''),
            'mime': folder['mimeType'],
        })
        rows.extend(walk_tree(service, folder['id'], folder['name'], depth + 1, current_path))

    for f in sorted(files, key=lambda x: x['name']):
        print(f"{'  ' * depth}  - {f['name']}")
        rows.append({
            'path': f"{current_path}/{f['name']}",
            'name': f['name'],
            'type': 'file',
            'id': f['id'],
            'link': f.get('webViewLink', ''),
            'mime': f['mimeType'],
        })

    return rows


def main():
    print("=" * 60)
    print("OPCO Portal - Drive Link Toplayici (Service Account)")
    print("=" * 60)
    print(f"Root folder name: {ROOT_FOLDER_NAME}")
    print(f"Root folder ID:   {ROOT_FOLDER_ID or '(aranacak)'}")
    print(f"Output:           {OUTPUT_CSV}")
    print()

    creds = load_credentials()
    service = build('drive', 'v3', credentials=creds, cache_discovery=False)

    # Root klasor ID'yi bul
    if ROOT_FOLDER_ID:
        try:
            root_meta = service.files().get(
                fileId=ROOT_FOLDER_ID,
                fields="id, name, mimeType",
                supportsAllDrives=True,
            ).execute()
        except HttpError as e:
            print(f"HATA: Root folder ID erisilemiyor: {e}", file=sys.stderr)
            print("Drive klasoru service account email'i ile paylasildi mi?", file=sys.stderr)
            sys.exit(1)
        root_id = root_meta['id']
        root_name = root_meta['name']
    else:
        print(f"Klasor isimle araniyor: '{ROOT_FOLDER_NAME}'")
        root = find_folder_by_name(service, ROOT_FOLDER_NAME)
        if not root:
            print(
                f"HATA: '{ROOT_FOLDER_NAME}' klasoru bulunamadi.\n"
                "  - Drive klasoru service account email'i ile paylasildi mi?\n"
                "  - Ya da DRIVE_ROOT_FOLDER_ID env var'i ile direkt ID ver.",
                file=sys.stderr,
            )
            sys.exit(1)
        root_id = root['id']
        root_name = root['name']

    print(f"Root bulundu: {root_name} ({root_id})")
    print()
    print("Klasor agaci geziliyor...")
    print("-" * 60)
    rows = walk_tree(service, root_id, root_name)
    print("-" * 60)
    print(f"Toplam {len(rows)} oge bulundu.")

    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=['path', 'name', 'type', 'id', 'link', 'mime'])
        writer.writeheader()
        writer.writerows(rows)

    print(f"CSV kaydedildi: {OUTPUT_CSV}")
    print("Bitti.")


if __name__ == '__main__':
    main()
