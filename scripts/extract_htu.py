"""
Extract PROJECT_HTU JSON from the HTU Joint History Excel report.

Rules (verified against the rendering code in index_source.html):
- 'tested' = ACC + REJ (final result, after any RS reshoot has been resolved).
- RS = re-shoot requested (NDT crew issue). It only counts toward tested once
  the after-repair RT result (column AH) is filled with ACC or REJ.
- 'repair' = rej count = joints whose final RT/UT result is REJ.
- PT (penetrant) results are NOT counted toward RT/UT tested totals.
- Welder identity stamps are normalized in the renderer (W-01 ↔ W-001), so
  emit whatever stamp the Excel uses; the renderer maps it to PIPING_WELDERS.

Run:  python scripts/extract_htu.py > /path/to/htu.json
"""
import json
import sys
from collections import defaultdict, OrderedDict
from datetime import datetime, timedelta

import openpyxl


def sat_week_start(d):
    """Return the Saturday on-or-before `d`. OPCO work week is Sat..Thu with
    Fri usually off — so the week 'anchor' is Saturday.

    Python weekday(): Mon=0, Sat=5, Sun=6.
    For a given date d, distance back to its Saturday = (d.weekday() - 5) % 7.
    """
    if isinstance(d, datetime):
        d = d.date()
    return d - timedelta(days=(d.weekday() - 5) % 7)

XLSX = r"C:\Users\Msi\Desktop\HTU- Joint History 15.07.2026.xlsx"

# 0-indexed columns in 'joint History':
COL_LINE       = 1   # B  Line Number
COL_DIA        = 7   # H  Dia-Inch
COL_ROOT       = 17  # R  Welder ROOT (primary welder for stat purposes)
COL_WELD_DATE  = 20  # U  Weld Date
COL_RT_REPORT  = 27  # AB RT/UT Report No
COL_RT_DATE    = 28  # AC RT/UT Date (when the joint was actually shot)
COL_RT_RESULT  = 29  # AD RT/UT Result (ACC/REJ/RS/RT)
COL_RS_RESULT  = 33  # AH After-repair RT/RS Result (ACC/REJ)


def to_iso(dt):
    if isinstance(dt, datetime):
        return dt.strftime("%Y-%m-%d")
    return None


def final_rt_verdict(rt, rs):
    """Return 'ACC', 'REJ', or None (pending) for a single joint's RT/UT result."""
    if rt == "ACC":
        return "ACC"
    if rt == "REJ":
        return "REJ"
    if rt in ("RS", "RT"):
        # Reshoot or RT-pending: verdict depends on the after-repair result.
        if rs == "ACC":
            return "ACC"
        if rs == "REJ":
            return "REJ"
        return None  # not yet reshot / not yet final
    return None


def main():
    wb = openpyxl.load_workbook(XLSX, data_only=True)
    jh = wb["joint History"]

    per_welder_joints = defaultdict(int)
    per_welder_dia    = defaultdict(float)
    per_welder_acc    = defaultdict(int)
    per_welder_rej    = defaultdict(int)
    per_welder_pending = defaultdict(int)
    per_welder_last   = defaultdict(lambda: None)
    per_welder_last_rt = defaultdict(lambda: None)

    daily_joints = defaultdict(int)
    daily_wdi    = defaultdict(float)

    # Weekly RT aggregate. Keys: Saturday ISO date (start of OPCO work week).
    # Value: {"rt": int, "rej": int, "per_welder": {stamp: [rt, rej]}}
    weekly_rt = {}

    total_joints = 0
    completed_joints = 0
    total_wdi = 0.0
    completed_wdi = 0.0
    total_tested = 0
    total_repair = 0
    line_set = set()

    for row in jh.iter_rows(min_row=7, values_only=True):
        if not row or row[0] is None:
            continue
        total_joints += 1

        line = row[COL_LINE]
        if line is not None:
            line_set.add(line)

        dia = row[COL_DIA]
        try:
            dia = float(dia) if dia is not None else 0.0
        except (TypeError, ValueError):
            dia = 0.0
        total_wdi += dia

        welder    = row[COL_ROOT]    if len(row) > COL_ROOT      else None
        weld_date = row[COL_WELD_DATE] if len(row) > COL_WELD_DATE else None
        rt        = row[COL_RT_RESULT] if len(row) > COL_RT_RESULT else None
        rs        = row[COL_RS_RESULT] if len(row) > COL_RS_RESULT else None
        rt_date   = row[COL_RT_DATE]   if len(row) > COL_RT_DATE   else None

        is_completed = isinstance(weld_date, datetime)
        if is_completed:
            completed_joints += 1
            completed_wdi += dia

        verdict = final_rt_verdict(rt, rs)
        if verdict == "ACC":
            total_tested += 1
        elif verdict == "REJ":
            total_tested += 1
            total_repair += 1

        # Weekly RT aggregate — joint counted in the week of its ORIGINAL RT
        # shot (col AC). Only joints that have reached a FINAL verdict
        # (ACC or REJ) are included, so the weekly chart's totals match the
        # 'Tested' KPI in the summary panel (RS-pending joints are excluded
        # in both places).
        if isinstance(rt_date, datetime) and welder is not None and verdict in ("ACC", "REJ"):
            wk_key = sat_week_start(rt_date).strftime("%Y-%m-%d")
            wk = weekly_rt.setdefault(wk_key, {"rt": 0, "rej": 0, "per_welder": {}})
            wk["rt"] += 1
            pw = wk["per_welder"].setdefault(welder, [0, 0])
            pw[0] += 1
            if verdict == "REJ":
                wk["rej"] += 1
                pw[1] += 1

        if welder is None:
            continue

        per_welder_joints[welder] += 1
        per_welder_dia[welder]    += dia
        if is_completed:
            if per_welder_last[welder] is None or weld_date > per_welder_last[welder]:
                per_welder_last[welder] = weld_date
        # last RT date for this welder — only count cells where the joint was
        # actually shot (rt_date is a real datetime, not None / empty / text).
        if isinstance(rt_date, datetime):
            if per_welder_last_rt[welder] is None or rt_date > per_welder_last_rt[welder]:
                per_welder_last_rt[welder] = rt_date

        if verdict == "ACC":
            per_welder_acc[welder] += 1
        elif verdict == "REJ":
            per_welder_rej[welder] += 1
        else:
            # Joint sent for RT but no final verdict yet, or never sent:
            # only count as pending if RT/UT was at least requested (rt non-null).
            if rt is not None:
                per_welder_pending[welder] += 1

        if is_completed:
            d = weld_date.strftime("%Y-%m-%d")
            daily_joints[d] += 1
            daily_wdi[d]    += dia

    project_repair_rate = round(total_repair / total_tested * 100, 1) if total_tested else 0.0

    welders_out = []
    for stamp in sorted(per_welder_joints.keys(), key=lambda s: (len(s), s)):
        acc    = per_welder_acc[stamp]
        rej    = per_welder_rej.get(stamp, 0)
        tested = acc + rej
        rate   = round(rej / tested * 100, 1) if tested else None
        welders_out.append({
            "stamp": stamp,
            "joints": per_welder_joints[stamp],
            "dia_inch": round(per_welder_dia[stamp], 2),
            "tested": tested,
            "acc": acc,
            "rej": rej,
            "pending": per_welder_pending[stamp],
            "repair_rate": rate,
            "last_weld": to_iso(per_welder_last[stamp]),
            "last_rt":   to_iso(per_welder_last_rt[stamp]),
        })

    daily_out = []
    for d in sorted(daily_joints.keys()):
        daily_out.append({
            "date": d,
            "joints": daily_joints[d],
            "wdi": round(daily_wdi[d], 2),
        })

    # Weekly RT aggregate: sort by week_start ASC, sort per_welder by RT count DESC
    weekly_rt_out = []
    for wk_key in sorted(weekly_rt.keys()):
        wk = weekly_rt[wk_key]
        per_welder_sorted = sorted(
            wk["per_welder"].items(),
            key=lambda kv: (-kv[1][0], kv[0]),
        )
        weekly_rt_out.append({
            "week_start": wk_key,
            "rt_total": wk["rt"],
            "rej_total": wk["rej"],
            "per_welder": [
                {"stamp": s, "rt": v[0], "rej": v[1]}
                for s, v in per_welder_sorted
            ],
        })

    data_date = daily_out[-1]["date"] if daily_out else "2026-05-03"

    project_htu = {
        "project": "HTU",
        "project_name": "HTU — piping works",
        "data_date": data_date,
        "totals": {
            "total_joints": total_joints,
            "completed_joints": completed_joints,
            "total_wdi": round(total_wdi, 2),
            "completed_wdi": round(completed_wdi, 2),
            "total_tested": total_tested,
            "total_repair": total_repair,
            "total_lines": len(line_set),
            "project_repair_rate": project_repair_rate,
        },
        "welders": welders_out,
        "daily_throughput": daily_out,
        "weekly_rt": weekly_rt_out,
    }

    sys.stdout.reconfigure(encoding="utf-8")
    print(json.dumps(project_htu, ensure_ascii=False))


if __name__ == "__main__":
    main()
