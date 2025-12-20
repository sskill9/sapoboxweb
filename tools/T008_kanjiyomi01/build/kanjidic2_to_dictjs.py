#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KANJIDIC2(XML) から T008 用 data/dict.js を生成します（完全オフライン前提）。
- 入力: KANJIDIC2 XML
- 出力: data/dict.js
- 任意: data/dict_manual.csv をマージ（手動追記が再生成で消えない）

出力形式:
window.KANJI_DICT = {
  "清": ["セイ|ショウ", "きよ.い|きよ.まる|きよ.める", 11, "氵", "6E05"],
  ...
};

値配列:
[0] 音読み（|区切り）
[1] 訓読み（|区切り）
[2] 総画数（int）
[3] 部首キー（classical 部首。可能なら部首文字、無理なら空）
[4] Unicode 16進（U+なし、例: "6E05"）
"""

import argparse
import csv
import os
import re
import sys
import xml.etree.ElementTree as ET
from typing import Dict, List, Tuple, Optional


# Kangxi radical chars (1..214) 参考: Unicode Kangxi Radicals block
# ここは「classical radical番号 → 部首文字」変換のための最小表です。
# 必要十分：classical番号が取れれば部首文字にできます。
KANGXI_RADICALS: List[str] = [
    "一","丨","丶","丿","乙","亅","二","亠","人","儿","入","八","冂","冖","冫","几","凵","刀","力","勹",
    "匕","匚","匸","十","卜","卩","厂","厶","又","口","囗","土","士","夂","夊","夕","大","女","子","宀",
    "寸","小","尢","尸","屮","山","巛","工","己","巾","干","幺","广","廴","廾","弋","弓","彐","彡","彳",
    "心","戈","戸","手","支","攴","文","斗","斤","方","无","日","曰","月","木","欠","止","歹","殳","毋",
    "比","毛","氏","气","水","火","爪","父","爻","爿","片","牙","牛","犬","玄","玉","瓜","瓦","甘","生",
    "用","田","疋","疒","癶","白","皮","皿","目","矛","矢","石","示","禸","禾","穴","立","竹","米","糸",
    "缶","网","羊","羽","老","而","耒","耳","聿","肉","臣","自","至","臼","舌","舛","舟","艮","色","艸",
    "虍","虫","血","行","衣","襾","見","角","言","谷","豆","豕","豸","貝","赤","走","足","身","車","辛",
    "辰","辵","邑","酉","釆","里","金","長","門","阜","隶","隹","雨","青","非","面","革","韋","韭","音",
    "頁","風","飛","食","首","香","馬","骨","高","髟","鬥","鬯","鬲","鬼","魚","鳥","鹵","鹿","麥","麻",
    "黃","黍","黑","黹","黽","鼎","鼓","鼠","鼻","齊","齒","龍","龜","龠"
]


def to_hex_uplus(ch: str) -> str:
    cp = ord(ch)
    hx = format(cp, "X").upper()
    if len(hx) < 4:
        hx = hx.zfill(4)
    return hx


def uniq_preserve(seq: List[str]) -> List[str]:
    seen = set()
    out: List[str] = []
    for x in seq:
        if x not in seen:
            out.append(x)
            seen.add(x)
    return out


def split_reading_text(s: str) -> List[str]:
    # KANJIDIC2 の読みは基本1要素ずつだが、念のため空白等を掃除
    s = (s or "").strip()
    if not s:
        return []
    # 空白や全角空白を区切りとして扱う
    parts = re.split(r"[\s\u3000]+", s)
    parts = [p for p in parts if p]
    return parts


def read_manual_csv(path: str) -> Dict[str, List]:
    """
    data/dict_manual.csv を読み込む
    CSV形式（ヘッダ必須）:
    kanji,on,kun,strokes,rad,hex

    - on/kun は "|" 区切りでも可、"," で区切っても可（どちらも受ける）
    - strokes は数値
    - rad は部首キー（例: 氵, 山, 亻, ...）
    - hex は "6E05" のような16進（"U+6E05"でも可）
    """
    if not os.path.exists(path):
        return {}

    manual: Dict[str, List] = {}
    with open(path, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        required = ["kanji", "on", "kun", "strokes", "rad", "hex"]
        for r in required:
            if r not in reader.fieldnames:
                raise ValueError(f"dict_manual.csv のヘッダに '{r}' が必要です。現在: {reader.fieldnames}")

        for row in reader:
            k = (row.get("kanji") or "").strip()
            if not k:
                continue
            # 1文字前提
            k = k[0]

            on = (row.get("on") or "").strip()
            kun = (row.get("kun") or "").strip()
            strokes_s = (row.get("strokes") or "").strip()
            rad = (row.get("rad") or "").strip()
            hx = (row.get("hex") or "").strip().upper().replace("U+", "")

            strokes = 0
            if strokes_s:
                try:
                    strokes = int(strokes_s)
                except Exception:
                    strokes = 0

            # on/kun は "," 区切りも許容して "|" に統一
            on = on.replace(",", "|")
            kun = kun.replace(",", "|")

            manual[k] = [on, kun, strokes if strokes else "", rad, hx if hx else to_hex_uplus(k)]
    return manual


def parse_kanjidic2(xml_path: str) -> Dict[str, List]:
    """
    KANJIDIC2 XML をパースして dict を作る
    返す形式: { kanji: [on, kun, strokes, radKey, hex] }
    """
    if not os.path.exists(xml_path):
        raise FileNotFoundError(f"KANJIDIC2 XML が見つかりません: {xml_path}")

    tree = ET.parse(xml_path)
    root = tree.getroot()

    out: Dict[str, List] = {}

    # KANJIDIC2: <character> の集合
    for ch_el in root.findall("character"):
        literal_el = ch_el.find("literal")
        if literal_el is None or not literal_el.text:
            continue
        kanji = literal_el.text.strip()
        if not kanji:
            continue

        # strokes
        strokes = ""
        misc = ch_el.find("misc")
        if misc is not None:
            sc = misc.find("stroke_count")
            if sc is not None and sc.text and sc.text.strip().isdigit():
                strokes = int(sc.text.strip())

        # readings
        on_list: List[str] = []
        kun_list: List[str] = []

        rm = ch_el.find("reading_meaning")
        if rm is not None:
            rmgroup = rm.find("rmgroup")
            if rmgroup is not None:
                for r in rmgroup.findall("reading"):
                    r_type = r.attrib.get("r_type", "")
                    txt = r.text.strip() if (r.text and r.text.strip()) else ""
                    if not txt:
                        continue
                    parts = split_reading_text(txt)
                    if r_type == "ja_on":
                        on_list.extend(parts)
                    elif r_type == "ja_kun":
                        kun_list.extend(parts)

        on_list = uniq_preserve(on_list)
        kun_list = uniq_preserve(kun_list)

        on = "|".join(on_list)
        kun = "|".join(kun_list)

        # radical (classical)
        rad_key = ""
        rad_el = ch_el.find("radical")
        if rad_el is not None:
            # <rad_value rad_type="classical">85</rad_value> など
            for rv in rad_el.findall("rad_value"):
                rt = rv.attrib.get("rad_type", "")
                val = (rv.text or "").strip()
                if rt == "classical" and val.isdigit():
                    num = int(val)
                    if 1 <= num <= len(KANGXI_RADICALS):
                        rad_key = KANGXI_RADICALS[num - 1]
                    else:
                        rad_key = ""
                    break

        hx = to_hex_uplus(kanji)

        out[kanji] = [on, kun, strokes, rad_key, hx]

    return out


def write_dict_js(out_path: str, data: Dict[str, List], header_comment: str) -> None:
    # 安定した出力のため、キーをソート（Unicode順）
    keys = sorted(data.keys(), key=lambda x: ord(x))

    lines: List[str] = []
    lines.append("// data/dict.js — オフライン漢字辞書（自動生成）")
    lines.append("// 生成スクリプト: build/kanjidic2_to_dictjs.py")
    lines.append("// 値配列: [0]音読み(|区切り) [1]訓読み(|区切り) [2]画数 [3]部首キー [4]Unicode16進(U+なし)")
    lines.append("//")
    lines.append("// 注意:")
    lines.append("// - このファイルは自動生成されます。手動追記は data/dict_manual.csv に記入してください。")
    lines.append("// - manual は自動生成結果を上書きします（同じ漢字キーがある場合）。")
    lines.append("//")
    if header_comment:
        for ln in header_comment.splitlines():
            lines.append(f"// {ln}")
        lines.append("//")

    lines.append("(function () {")
    lines.append("  window.KANJI_DICT = {")
    for k in keys:
        v = data[k]
        on = v[0] if len(v) > 0 else ""
        kun = v[1] if len(v) > 1 else ""
        strokes = v[2] if len(v) > 2 else ""
        rad = v[3] if len(v) > 3 else ""
        hx = v[4] if len(v) > 4 else to_hex_uplus(k)

        # strokes は int か "" のどちらかに
        if strokes == "" or strokes is None:
            strokes_js = '""'
        else:
            try:
                strokes_js = str(int(strokes))
            except Exception:
                strokes_js = '""'

        # JS 文字列エスケープ（最低限）
        def esc(s: str) -> str:
            s = s.replace("\\", "\\\\")
            s = s.replace('"', '\\"')
            return s

        lines.append(f'    "{esc(k)}": ["{esc(str(on))}", "{esc(str(kun))}", {strokes_js}, "{esc(str(rad))}", "{esc(str(hx))}"],')
    lines.append("  };")
    lines.append("})();")
    lines.append("")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines))


def main() -> int:
    ap = argparse.ArgumentParser(description="KANJIDIC2(XML) → data/dict.js 生成 (T008 用)")
    ap.add_argument("--xml", required=True, help="KANJIDIC2 XML のパス（例: build/kanjidic2.xml）")
    ap.add_argument("--out", default=os.path.join("data", "dict.js"), help="出力 dict.js パス（既定: data/dict.js）")
    ap.add_argument("--manual", default=os.path.join("data", "dict_manual.csv"), help="手動追記CSV（既定: data/dict_manual.csv）")
    ap.add_argument("--note", default="", help="dict.js のヘッダコメントに追記するメモ（任意）")
    args = ap.parse_args()

    base = parse_kanjidic2(args.xml)
    manual = read_manual_csv(args.manual)

    # manual を上書きマージ
    merged = dict(base)
    for k, v in manual.items():
        merged[k] = v

    write_dict_js(args.out, merged, args.note)

    # 軽い統計
    print(f"[OK] Generated: {args.out}")
    print(f"  Base entries (KANJIDIC2): {len(base)}")
    print(f"  Manual entries (CSV):     {len(manual)}")
    print(f"  Total entries:            {len(merged)}")

    # 部首キーが空の件数
    empty_rad = sum(1 for k, v in merged.items() if len(v) > 3 and (v[3] == "" or v[3] is None))
    print(f"  Empty radical key:        {empty_rad}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
