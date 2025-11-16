/* =========================
   T001 生年月日 和暦↔西暦 ツールJS
   ========================= */

(() => {
  "use strict";

  const ERAS = [
    { key: "R", jp: "令和", start: new Date(2019, 4, 1) },
    { key: "H", jp: "平成", start: new Date(1989, 0, 8) },
    { key: "S", jp: "昭和", start: new Date(1926, 11, 25) },
    { key: "T", jp: "大正", start: new Date(1912, 6, 30) },
    { key: "M", jp: "明治", start: new Date(1868, 0, 25) },
  ];

  const $ = (sel) => document.querySelector(sel);
  const dirAuto = $("#dir-auto"), dirW2G = $("#dir-w2g"), dirG2W = $("#dir-g2w");
  const autoBox = $("#auto-inputs"), w2gBox = $("#w2g-inputs"), g2wBox = $("#g2w-inputs");
  const autoText = $("#auto-text");
  const era = $("#era"), wYear = $("#wareki-year"), wMonth = $("#wareki-month"), wDay = $("#wareki-day");
  const year = $("#year"), month = $("#month"), day = $("#day");

  /* ▼▼ ここを修正：重複IDでも全取得して全てにイベント付与 ▼▼ */
  const btnConvertList = document.querySelectorAll('[id="btn-convert"]');
  const btnClearList   = document.querySelectorAll('[id="btn-clear"]');
  /* ▲▲ 修正ここまで ▲▲ */

  const btnCopy = $("#btn-copy");
  const out = $("#result"), note = $("#result-note");

  document.addEventListener("DOMContentLoaded", () => {
    const yspan = $("#current-year");
    if (yspan) yspan.textContent = String(new Date().getFullYear());

    const topbar = $("#T001-topbar");
    const onScroll = () => {
      if (!topbar) return;
      if (window.scrollY > 2) topbar.classList.add("is-stuck");
      else topbar.classList.remove("is-stuck");
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    restoreState();

    [dirAuto, dirW2G, dirG2W].forEach(r => r?.addEventListener("change", handleDirectionChange));

    /* ▼▼ ここを修正：全ボタンにイベントを束ねて付与 ▼▼ */
    btnConvertList.forEach(btn => btn.addEventListener("click", handleConvert));
    btnClearList.forEach(btn => btn.addEventListener("click", clearInputs));
    /* ▲▲ 修正ここまで ▲▲ */

    btnCopy?.addEventListener("click", copyResult);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.isComposing) {
        if (document.querySelector(".modal.show")) return;
        handleConvert();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "k")) {
        e.preventDefault();
        focusFirstInput();
      }
    });
  });

  const LS_KEY = "T001:state";
  function saveState() {
    const state = {
      dir: currentDir(),
      auto: autoText?.value || "",
      w2g: { era: era?.value, y: wYear?.value, m: wMonth?.value, d: wDay?.value },
      g2w: { y: year?.value, m: month?.value, d: day?.value },
    };
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch {}
  }
  function restoreState() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(LS_KEY) || "null"); } catch {}
    if (s) {
      (s.dir === "w2g" ? dirW2G : s.dir === "g2w" ? dirG2W : dirAuto).checked = true;
      if (autoText) autoText.value = s.auto || "";
      if (era && s.w2g) era.value = s.w2g.era ?? "R";
      if (wYear && s.w2g) wYear.value = s.w2g.y ?? "";
      if (wMonth && s.w2g) wMonth.value = s.w2g.m ?? "";
      if (wDay && s.w2g) wDay.value = s.w2g.d ?? "";
      if (year && s.g2w) year.value = s.g2w.y ?? "";
      if (month && s.g2w) month.value = s.g2w.m ?? "";
      if (day && s.g2w) day.value = s.g2w.d ?? "";
    }
    handleDirectionChange();
  }

  function currentDir() {
    if (dirW2G?.checked) return "w2g";
    if (dirG2W?.checked) return "g2w";
    return "auto";
  }
  function handleDirectionChange() {
    const dir = currentDir();
    autoBox?.classList.toggle("d-none", dir !== "auto");
    w2gBox?.classList.toggle("d-none", dir !== "w2g");
    g2wBox?.classList.toggle("d-none", dir !== "g2w");
    autoBox?.setAttribute("aria-hidden", String(dir !== "auto"));
    w2gBox?.setAttribute("aria-hidden", String(dir !== "w2g"));
    g2wBox?.setAttribute("aria-hidden", String(dir !== "g2w"));
    focusFirstInput();
    saveState();
  }
  function focusFirstInput() {
    const dir = currentDir();
    if (dir === "auto") { autoText?.focus(); return; }
    if (dir === "w2g")  { wYear?.focus(); return; }
    year?.focus();
  }

  function handleConvert() {
    clearResult();
    const dir = currentDir();

    try {
      let res, meta, gDate, hasFullYMD = false;
      if (dir === "auto") {
        const src = (autoText?.value || "").trim();
        ({ res, meta, gDate, hasFullYMD } = convertAuto(src));
      } else if (dir === "w2g") {
        const e = era?.value;
        const y = parseIntOrNull(wYear?.value);
        const m = parseIntOrNull(wMonth?.value);
        const d = parseIntOrNull(wDay?.value);
        ({ res, meta, gDate, hasFullYMD } = warekiToSeireki(e, y, m, d));
      } else {
        const y = parseIntOrNull(year?.value);
        const m = parseIntOrNull(month?.value);
        const d = parseIntOrNull(day?.value);
        ({ res, meta, gDate, hasFullYMD } = seirekiToWareki(y, m, d));
      }

      const ageInfo = calcAgeInfo(gDate, hasFullYMD); // "満年齢：X歳" or ""
      const finalText = ageInfo ? `${res}（${ageInfo}）` : res;

      renderResult(finalText, meta);
      saveState();
    } catch (err) {
      renderError(err instanceof Error ? err.message : String(err));
    }
  }

  function clearInputs() {
    if (autoText) autoText.value = "";
    [wYear, wMonth, wDay, year, month, day].forEach(i => { if (i) i.value = ""; });
    clearResult();
    saveState();
    focusFirstInput();
  }
  function clearResult() {
    if (out) {
      out.textContent = "";
      out.classList.remove("text-danger");
    }
    if (note) note.textContent = "";
  }

  async function copyResult() {
    const text = out?.textContent?.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (note) {
        note.textContent = appendInfo(note.textContent, "コピーしました。");
        setTimeout(() => {
          if (!note) return;
          note.textContent = note.textContent.replace(/ ?\u3010?コピーしました。\u3011?/g, "").trim();
        }, 1500);
      }
    } catch {
      if (note) note.textContent = appendInfo(note.textContent, "コピーに失敗しました。選択して Ctrl/Cmd+C をお試しください。");
    }
  }

  function parseIntOrNull(v) {
    if (v == null || v === "") return null;
    const n = parseInt(String(v), 10);
    return Number.isFinite(n) ? n : null;
  }
  function toDateOrNull(y, m, d) {
    if (!y) return null;
    if (!m || !d) return new Date(y, (m ?? 1) - 1, (d ?? 1));
    const dt = new Date(y, m - 1, d);
    if (dt.getFullYear() !== y || (dt.getMonth() + 1) !== m || dt.getDate() !== d) return null;
    return dt;
  }

  function warekiToSeireki(eraKey, y, m, d) {
    if (!y || y < 1) throw new Error("和暦の年は1以上を指定してください。");
    const era = ERAS.find(e => e.key === eraKey);
    if (!era) throw new Error("未知の元号です。");

    const gYear = era.start.getFullYear() + (y - 1);
    const dt = toDateOrNull(gYear, m ?? 1, d ?? 1);
    if (!dt) throw new Error("存在しない日付です。");

    if (y === 1) {
      const md = m ?? (era.start.getMonth() + 1);
      const dd = d ?? era.start.getDate();
      const cand = new Date(gYear, md - 1, dd);
      if (cand < era.start) {
        throw new Error(`${era.jp}元年は ${fmtYMD(era.start)} 以降です。`);
      }
    }

    const hasFullYMD = !!(m && d);
    const text = m && d ? `${gYear}年${m}月${d}日` : m ? `${gYear}年${m}月` : `${gYear}年`;
    const meta = `${era.jp}${y} → 西暦`;
    const gDate = hasFullYMD ? new Date(gYear, m - 1, d) : null;
    return { res: text, meta, gDate, hasFullYMD };
  }

  function seirekiToWareki(y, m, d) {
    if (!y) throw new Error("西暦の年を入力してください（4桁推奨）。");
    const dt = toDateOrNull(y, m ?? 1, d ?? 1);
    if (!dt) throw new Error("存在しない日付です。");

    const era = ERAS.find(e => dt >= e.start);
    if (!era) throw new Error("明治以前は本ツールの対象外です。");

    const wy = dt.getFullYear() - era.start.getFullYear() + 1;
    const text = (m && d) ? `${era.jp}${wy}年${m}月${d}日`
               : (m)     ? `${era.jp}${wy}年${m}月`
                         : `${era.jp}${wy}年`;
    const meta = `西暦${y}${m?`/${m}`:""}${d?`/${d}`:""} → ${era.jp}`;
    const hasFullYMD = !!(m && d);
    const gDate = hasFullYMD ? new Date(y, m - 1, d) : null;
    return { res: text, meta, gDate, hasFullYMD };
  }

  function convertAuto(src) {
    if (!src) throw new Error("自動判定：入力が空です。");
    const s = src.replace(/\s+/g, "");

    const reWareki = /^(?:令和|平成|昭和|大正|明治|[RrHhSsTtMm])\s*([0-9０-９]+)(?:[年\.\/-]?([0-9０-９]{1,2}))?(?:[月\.\/-]?([0-9０-９]{1,2}))?日?$/u;
    const mW = s.match(reWareki);
    if (mW) {
      const c = s.charAt(0);
      const eraKeyMap = { "令": "R", "平": "H", "昭": "S", "大": "T", "明": "M", "R":"R","H":"H","S":"S","T":"T","M":"M","r":"R","h":"H","s":"S","t":"T","m":"M" };
      const ek = eraKeyMap[c];
      const yy = z2i(mW[1]), mm = mW[2] ? z2i(mW[2]) : null, dd = mW[3] ? z2i(mW[3]) : null;
      return warekiToSeireki(ek, yy, mm, dd);
    }

    const reSeireki = /^([12][0-9]{3})(?:[\.\/-]([0-9]{1,2}))?(?:[\.\/-]([0-9]{1,2}))?$/;
    const mG = s.match(reSeireki);
    if (mG) {
      const yy = parseInt(mG[1], 10);
      const mm = mG[2] ? parseInt(mG[2], 10) : null;
      const dd = mG[3] ? parseInt(mG[3], 10) : null;
      return seirekiToWareki(yy, mm, dd);
    }

    throw new Error("自動判定できませんでした。和暦（例：令和6.5.1 / H30）または西暦（2019/5/1 / 2018）で入力してください。");
  }

  function z2i(s) {
    return parseInt(String(s).replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xFF10 + 0x30)), 10);
  }

  function calcAgeInfo(gDate, hasFullYMD) {
    if (!hasFullYMD || !gDate) return "";
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const age = calcAge(gDate, today);
    if (age < 0) return `満年齢：—（未来日です）`;
    return `満年齢：${age}歳`;
  }
  function calcAge(birth, ref) {
    let age = ref.getFullYear() - birth.getFullYear();
    const refMd = (ref.getMonth() + 1) * 100 + ref.getDate();
    const bMd   = (birth.getMonth() + 1) * 100 + birth.getDate();
    if (refMd < bMd) age -= 1;
    return age;
  }

  function renderResult(text, meta) {
    if (out) out.textContent = text;
    if (note) note.textContent = meta || "";
  }
  function renderError(msg) {
    if (out) {
      out.textContent = `エラー：${msg}`;
      out.classList.add("text-danger");
    }
    if (note) note.textContent = "";
  }

  function fmtYMD(d) {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1);
    const dd = d.getDate();
    return `${y}/${m}/${dd}`;
  }
  function appendInfo(base, add) { return base ? `${base} 【${add}】` : add; }

})();
