"""Extract PROJECT_OSBL JSON from the OSBL Weekly Progress Report Excel.

Sheet 'General' layout (1-indexed columns):
  B (1): zone name (or section header)
  D (3): UOM ('Dia-inch')
  E (4): Total QTY    -> total_wdi
  F (5): Cumulative   -> completed_wdi
  G (6): Activity %   (fraction 0..1, sometimes blank/0 if formula stripped)

Zones live on rows 10-19 (10 zones).
Row 9 is the welding total ('1.OSBL-Welding') with the project totals.
Report metadata lives on row 3-4 (col M=12 for report no + date).

Run:  py scripts/extract_osbl.py > /tmp/osbl.json
"""
import json
import sys
from datetime import datetime
from pathlib import Path

import openpyxl

XLSX = r"C:\Users\Msi\Desktop\UR-OSBL-WPR-19.xlsx"

ZONE_ROWS = range(10, 20)  # rows 10..19 inclusive
COL_NAME      = 1   # B
COL_TOTAL     = 4   # E
COL_COMPLETED = 5   # F


def round1(x):
    return round(x, 1) if x is not None else None


def main():
    wb = openpyxl.load_workbook(XLSX, data_only=True, read_only=True)
    sh = wb["General"]
    rows = list(sh.iter_rows(min_row=1, max_row=25, values_only=True))

    # Header row 3: report no in col M (12), R4 col M = date
    report_no = rows[2][12] if len(rows[2]) > 12 else None
    report_date = rows[3][12] if len(rows[3]) > 12 else None
    if isinstance(report_date, datetime):
        report_date_iso = report_date.strftime("%Y-%m-%d")
    else:
        report_date_iso = None

    # Row 9 (0-indexed: 8) is the OSBL-Welding total
    total_row = rows[8]
    total_total = float(total_row[COL_TOTAL] or 0)
    total_done  = float(total_row[COL_COMPLETED] or 0)
    total_pct   = round1(total_done / total_total * 100) if total_total else 0.0

    zones = []
    for r_idx in ZONE_ROWS:
        row = rows[r_idx - 1]   # 0-indexed
        name = row[COL_NAME]
        tot  = row[COL_TOTAL]
        done = row[COL_COMPLETED]
        if not name or tot is None:
            continue
        name = str(name).strip()
        tot = float(tot)
        done = float(done or 0)
        # Compute pct ourselves — some rows in the sheet have the formula
        # blanked (Main Rack-03 shows 0 even with done > 0).
        pct = round1(done / tot * 100) if tot else 0.0
        balance = round(tot - done, 2)
        zones.append({
            "name": name,
            "total_wdi": round(tot, 2),
            "completed_wdi": round(done, 2),
            "completion_pct": pct,
            "balance_wdi": balance,
        })

    # Sort zones by completion_pct DESC (matches existing JSON ordering — high to low)
    zones.sort(key=lambda z: z["completion_pct"], reverse=True)

    project_osbl = {
        "project": "OSBL",
        "project_name": "OSBL — United Refinery",
        "report_no": str(report_no) if report_no else "",
        "report_date": report_date_iso or "",
        "total": {
            "total_wdi": round(total_total, 2),
            "completed_wdi": round(total_done, 2),
            "completion_pct": total_pct,
        },
        "zones": zones,
    }

    sys.stdout.reconfigure(encoding="utf-8")
    print(json.dumps(project_osbl, ensure_ascii=False))


if __name__ == "__main__":
    main()
