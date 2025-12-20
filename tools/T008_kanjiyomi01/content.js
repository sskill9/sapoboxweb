// content.js — CONTENTブロック（T008：漢字口頭伝達補助＋TOPへ戻るボタン）
(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（左：バッジ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：バッジ類（丸ピル統一版） -->
    <div class="mb-2 mb-md-0">
      <span class="badge rounded-pill fw-semibold me-2"
            style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
        漢字
      </span>
      <span class="badge rounded-pill fw-semibold"
            style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
        汎用ツール
      </span>
    </div>

    <!-- 右側：概要説明 -->
    <div class="text-muted small">
      漢字1文字を貼り付けるだけで、代表的な読み・画数・部首・Unicodeを即時表示し、
      口頭伝達用の定型文をワンクリックでコピーできます（完全オフライン）。
    </div>

  </div>

  <!-- 入力／結果エリア -->
  <section class="mb-5">
    <div class="row gy-4">

      <!-- 入力エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold">
            入力（漢字1文字）
          </div>

          <div class="card-body">
            <div class="mb-3">
              <label for="kanjiInput" class="form-label">漢字を貼り付け（入力即時反映）</label>
              <input
                type="text"
                id="kanjiInput"
                class="form-control"
                inputmode="text"
                autocomplete="off"
                placeholder="例：清 / 崎 / 﨑 など（1文字）">
              <div class="form-text">
                文字列を貼り付けた場合は、先頭の「空白でない1文字」を対象にします。
              </div>
            </div>

            <div class="d-flex flex-wrap gap-2">
              <button type="button" class="btn btn-outline-secondary btn-sm" id="btnClear">
                クリア
              </button>
              <button type="button" class="btn btn-outline-primary btn-sm" id="btnSample1">
                サンプル：清
              </button>
              <button type="button" class="btn btn-outline-primary btn-sm" id="btnSample2">
                サンプル：﨑
              </button>
            </div>

            <hr class="my-3">

            <div id="copyToastArea" class="small"></div>
          </div>
        </div>
      </div>

      <!-- 結果エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold">
            結果（読み・画数・部首・Unicode）
          </div>

          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <div class="text-muted small">対象漢字</div>
                <div id="kanjiBig"
                     class="fw-bold"
                     style="font-size:3rem;line-height:1.1;">
                  -
                </div>
              </div>
              <div class="text-end">
                <div class="text-muted small">Unicode</div>
                <div class="fw-semibold" id="unicodeText">-</div>
                <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="btnCopyUnicode" disabled>
                  Unicodeをコピー
                </button>
              </div>
            </div>

            <hr class="my-3">

            <dl class="row mb-0">
              <dt class="col-4">音読み</dt>
              <dd class="col-8" id="onYomi">-</dd>

              <dt class="col-4">訓読み</dt>
              <dd class="col-8" id="kunYomi">-</dd>

              <dt class="col-4">画数</dt>
              <dd class="col-8" id="strokeCount">-</dd>

              <dt class="col-4">部首</dt>
              <dd class="col-8" id="radicalInfo">-</dd>

              <dt class="col-4">辞書</dt>
              <dd class="col-8" id="dictStatus">-</dd>
            </dl>

            <hr class="my-3">

            <div class="fw-bold mb-2">口頭伝達テンプレ（コピー）</div>

            <div class="mb-2">
              <div class="text-muted small mb-1">短い版</div>
              <div class="input-group">
                <input type="text" class="form-control form-control-sm" id="tplShort" readonly value="">
                <button class="btn btn-outline-primary btn-sm" type="button" id="btnCopyShort" disabled>コピー</button>
              </div>
            </div>

            <div class="mb-2">
              <div class="text-muted small mb-1">確実版（Unicode必須）</div>
              <div class="input-group">
                <input type="text" class="form-control form-control-sm" id="tplFull" readonly value="">
                <button class="btn btn-outline-primary btn-sm" type="button" id="btnCopyFull" disabled>コピー</button>
              </div>
            </div>

            <div class="mb-0">
              <div class="text-muted small mb-1">読み入り版</div>
              <div class="input-group">
                <input type="text" class="form-control form-control-sm" id="tplWithRead" readonly value="">
                <button class="btn btn-outline-primary btn-sm" type="button" id="btnCopyWithRead" disabled>コピー</button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>

</div>

<!-- 右下：TOPへ戻るボタン -->
<button id="backToTopBtn"
        type="button"
        class="btn btn-primary btn-sm rounded-circle shadow"
        aria-label="ページの先頭へ戻る">
  ↑
</button>
`;

  // ===== 共通：TOPへ戻るボタン =====
  var backBtn = document.getElementById("backToTopBtn");
  if (backBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 200) {
        backBtn.style.display = "inline-flex";
      } else {
        backBtn.style.display = "none";
      }
    });

    backBtn.addEventListener("click", function () {
      var topEl = document.getElementById("page-top");
      if (topEl && topEl.scrollIntoView) {
        topEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  // ===== T008：漢字口頭伝達補助 本体 =====
  var inputEl = document.getElementById("kanjiInput");
  var btnClear = document.getElementById("btnClear");
  var btnSample1 = document.getElementById("btnSample1");
  var btnSample2 = document.getElementById("btnSample2");

  var kanjiBig = document.getElementById("kanjiBig");
  var unicodeText = document.getElementById("unicodeText");
  var btnCopyUnicode = document.getElementById("btnCopyUnicode");

  var onYomi = document.getElementById("onYomi");
  var kunYomi = document.getElementById("kunYomi");
  var strokeCount = document.getElementById("strokeCount");
  var radicalInfo = document.getElementById("radicalInfo");
  var dictStatus = document.getElementById("dictStatus");

  var tplShort = document.getElementById("tplShort");
  var tplFull = document.getElementById("tplFull");
  var tplWithRead = document.getElementById("tplWithRead");

  var btnCopyShort = document.getElementById("btnCopyShort");
  var btnCopyFull = document.getElementById("btnCopyFull");
  var btnCopyWithRead = document.getElementById("btnCopyWithRead");

  var toastArea = document.getElementById("copyToastArea");

  function safeStr(v) {
    if (v === null || v === undefined) return "";
    return String(v);
  }

  function firstNonSpaceChar(s) {
    var str = safeStr(s);
    if (!str) return "";
    // 先頭から「空白でない1文字」を拾う（改行やスペース対策）
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch && !/\s/.test(ch)) return ch;
    }
    return "";
  }

  function toUnicodeHex(ch) {
    if (!ch) return "";
    var cp = ch.codePointAt(0);
    if (cp === undefined || cp === null) return "";
    var hex = cp.toString(16).toUpperCase();
    if (hex.length < 4) hex = hex.padStart(4, "0");
    return hex;
  }

  function getRadicalName(radKey) {
    var k = safeStr(radKey);
    if (!k) return "";
    var map = window.RADICALS_MAP || {};
    return map[k] || "";
  }

  function normalizeReadings(raw) {
    var s = safeStr(raw).trim();
    if (!s) return "-";
    return s.split("|").filter(Boolean).join("、");
  }

  function showToast(msg, ok) {
    if (!toastArea) return;
    var cls = ok ? "alert-success" : "alert-danger";
    toastArea.innerHTML = `
<div class="alert ${cls} py-2 px-3 mb-0" role="alert" style="font-size:0.9rem;">
  ${msg}
</div>
`;
    window.setTimeout(function () {
      if (toastArea) toastArea.innerHTML = "";
    }, 1600);
  }

  function copyText(text) {
    var t = safeStr(text);
    if (!t) {
      showToast("コピーする内容がありません。", false);
      return;
    }

    // Clipboard API（HTTPS/localhost で有効になりやすい）
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(function () {
        showToast("コピーしました。", true);
      }).catch(function () {
        fallbackCopy(t);
      });
      return;
    }

    fallbackCopy(t);
  }

  function fallbackCopy(text) {
    // file:// 直開きで Clipboard API が使えない場合に備えたフォールバック
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      var ok = document.execCommand("copy");
      showToast(ok ? "コピーしました。" : "コピーに失敗しました。", ok);
    } catch (e) {
      showToast("コピーに失敗しました。", false);
    }
    document.body.removeChild(ta);
  }

  function setButtonsEnabled(enabled) {
    btnCopyUnicode.disabled = !enabled;
    btnCopyShort.disabled = !enabled;
    btnCopyFull.disabled = !enabled;
    btnCopyWithRead.disabled = !enabled;
  }

  function clearView() {
    kanjiBig.textContent = "-";
    unicodeText.textContent = "-";

    onYomi.textContent = "-";
    kunYomi.textContent = "-";
    strokeCount.textContent = "-";
    radicalInfo.textContent = "-";
    dictStatus.textContent = "-";

    tplShort.value = "";
    tplFull.value = "";
    tplWithRead.value = "";

    setButtonsEnabled(false);
  }

  function renderForKanji(ch) {
    if (!ch) {
      clearView();
      return;
    }

    var hex = toUnicodeHex(ch);
    var unicodeLabel = hex ? ("U+" + hex) : "-";

// dict 参照（未収録でも Unicode は出す）
var dict = window.KANJI_DICT || {};
var rec = dict[ch];

// 互換：旧（配列）と新（オブジェクト）どちらでも読めるようにする
var hasDict = false;
var onRaw = "";
var kunRaw = "";
var strokes = "";
var radKey = "";
var hexFromDict = "";

if (Array.isArray(rec)) {
  // 旧形式： [onRaw, kunRaw, strokes, radKey, hex]
  hasDict = true;
  onRaw = rec[0] || "";
  kunRaw = rec[1] || "";
  strokes = rec[2] || "";
  radKey = rec[3] || "";
  hexFromDict = rec[4] || "";
} else if (rec && typeof rec === "object") {
  // 新形式： { on:[...], kun:[...], strokes:11, radical:"氵", hex:"6E05"(任意) }
  hasDict = true;
  onRaw = Array.isArray(rec.on) ? rec.on.join("|") : "";
  kunRaw = Array.isArray(rec.kun) ? rec.kun.join("|") : "";
  strokes = (rec.strokes !== undefined && rec.strokes !== null) ? rec.strokes : "";
  radKey = rec.radical || "";
  hexFromDict = rec.hex || "";
}


    // dict 側 hex を優先（差異が出るケースにも備える）
    if (hexFromDict) {
      hex = safeStr(hexFromDict).toUpperCase();
      unicodeLabel = "U+" + hex;
    }

    var radName = getRadicalName(radKey);
    var radDisp = "-";
    if (radKey) {
      radDisp = radName ? (radName + "（" + radKey + "）") : radKey;
    }

    kanjiBig.textContent = ch;
    unicodeText.textContent = unicodeLabel;

    onYomi.textContent = normalizeReadings(onRaw);
    kunYomi.textContent = normalizeReadings(kunRaw);
    strokeCount.textContent = strokes ? String(strokes) : "-";
    radicalInfo.textContent = radDisp;

    dictStatus.innerHTML = hasDict
      ? `<span class="badge bg-success">収録</span> <span class="text-muted small">（dict.js）</span>`
      : `<span class="badge bg-warning text-dark">未収録</span> <span class="text-muted small">（Unicodeのみ表示）</span>`;

    // テンプレ生成（Unicode必須）
    var shortTpl = "";
    var fullTpl = "";
    var readTpl = "";

    var basePart = ch + "です。";
    var radPart = radName ? ("部首は" + radName + "。") : (radKey ? ("部首は" + radKey + "。") : "");
    var strokePart = strokes ? ("総画数" + strokes + "。") : "";
    var uniPart = unicodeLabel !== "-" ? ("Unicodeは" + unicodeLabel + "です。") : "";

    // 短い版：部首優先（無ければ Unicode）
    if (radName) {
      shortTpl = ch + "です。" + "部首は" + radName + "。";
    } else if (radKey) {
      shortTpl = ch + "です。" + "部首は" + radKey + "。";
    } else if (unicodeLabel !== "-") {
      shortTpl = ch + "です。" + "Unicodeは" + unicodeLabel + "です。";
    } else {
      shortTpl = ch + "です。";
    }

    // 確実版：Unicode必須
    fullTpl = basePart + radPart + strokePart + uniPart;

    // 読み入り版
    var onDisp = normalizeReadings(onRaw);
    var kunDisp = normalizeReadings(kunRaw);

    var readPart = "";
    if (onDisp !== "-" || kunDisp !== "-") {
      var pieces = [];
      if (onDisp !== "-") pieces.push("音読み：" + onDisp);
      if (kunDisp !== "-") pieces.push("訓読み：" + kunDisp);
      readPart = pieces.length ? ("読みは" + pieces.join("、") + "。") : "";
    }

    readTpl = basePart + readPart + radPart + strokePart + uniPart;

    tplShort.value = shortTpl;
    tplFull.value = fullTpl;
    tplWithRead.value = readTpl;

    setButtonsEnabled(true);

    // コピー対象を仕込む（ボタンに event を張る前提なのでここで保持）
    btnCopyUnicode.dataset.copy = unicodeLabel;
    btnCopyShort.dataset.copy = shortTpl;
    btnCopyFull.dataset.copy = fullTpl;
    btnCopyWithRead.dataset.copy = readTpl;
  }

  function onInputChanged() {
    var ch = firstNonSpaceChar(inputEl ? inputEl.value : "");
    if (!inputEl) return;

    // 入力欄は「対象1文字」だけ残す（誤貼り付け対策）
    if (ch) {
      inputEl.value = ch;
      renderForKanji(ch);
    } else {
      inputEl.value = "";
      clearView();
    }
  }

  function bindCopyButton(btn) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      var t = btn.dataset.copy || "";
      copyText(t);
    });
  }

  // イベント設定
  if (inputEl) {
    inputEl.addEventListener("input", onInputChanged);
    inputEl.addEventListener("paste", function () {
      // paste直後に反映されるように少し遅延
      window.setTimeout(onInputChanged, 0);
    });
  }

  if (btnClear && inputEl) {
    btnClear.addEventListener("click", function () {
      inputEl.value = "";
      clearView();
      inputEl.focus();
    });
  }

  if (btnSample1 && inputEl) {
    btnSample1.addEventListener("click", function () {
      inputEl.value = "清";
      onInputChanged();
      inputEl.focus();
    });
  }

  if (btnSample2 && inputEl) {
    btnSample2.addEventListener("click", function () {
      inputEl.value = "﨑";
      onInputChanged();
      inputEl.focus();
    });
  }

  bindCopyButton(btnCopyUnicode);
  bindCopyButton(btnCopyShort);
  bindCopyButton(btnCopyFull);
  bindCopyButton(btnCopyWithRead);

  // 初期化
  clearView();
})();
