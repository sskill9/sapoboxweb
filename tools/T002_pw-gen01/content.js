// content.js — CONTENTブロック（T002 パスワードジェネレーター本体＋TOPへ戻るボタン）
//
// このファイルは Support Tool Box（サポ箱）テンプレート準拠版。
// 1個ごとのパスワード表示に「mb-3」を追加して視認性を改善済み。

(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（左：タグ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：タグ類 -->
    <div class="mb-2 mb-md-0">
      <span class="stb-tag stb-tag-category">パスワード生成</span>
      <span class="stb-tag stb-tag-usage">コンタクトセンター向け</span>
    </div>

    <!-- 右側：概要説明 -->
    <div class="text-muted small">
      コールセンターなどで共有するパスワードを、読み間違いを減らしながら安全に生成するためのツールです。
      1文字ごとの読み方（カナ）も同時に表示・CSV出力できます。
    </div>

  </div>

  <!-- 入力／結果エリア -->
  <section class="mb-5">
    <div class="row gy-4">

      <!-- 入力エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary-subtle fw-bold">
            パスワード生成条件
          </div>

          <div class="card-body">
            <div class="mb-3">
              <label for="pwLength" class="form-label">パスワードの長さ</label>
              <select id="pwLength" class="form-select"></select>
              <div class="form-text">4〜20文字の範囲で選択できます（初期値：8文字）。</div>
            </div>

            <div class="mb-3">
              <label for="pwCount" class="form-label">生成個数</label>
              <select id="pwCount" class="form-select"></select>
              <div class="form-text">一度に最大50個まで生成できます。</div>
            </div>

            <div class="mb-3">
              <span class="form-label d-block mb-1">使用する文字種類</span>

              <div class="form-check form-check-inline mb-1">
                <input type="checkbox" id="pwUseUppercase" class="form-check-input" checked>
                <label for="pwUseUppercase" class="form-check-label">大文字（A〜Z）</label>
              </div>

              <div class="form-check form-check-inline mb-1">
                <input type="checkbox" id="pwUseLowercase" class="form-check-input" checked>
                <label for="pwUseLowercase" class="form-check-label">小文字（a〜z）</label>
              </div>

              <div class="form-check form-check-inline mb-1">
                <input type="checkbox" id="pwUseNumbers" class="form-check-input" checked>
                <label for="pwUseNumbers" class="form-check-label">数字（0〜9）</label>
              </div>

              <div class="form-check form-check-inline mb-1">
                <input type="checkbox" id="pwUseSymbols" class="form-check-input" checked>
                <label for="pwUseSymbols" class="form-check-label">記号（!@#$%^&*()_+）</label>
              </div>

              <div class="form-text">
                セキュリティポリシーに合わせて、使用する文字種を選択してください。
              </div>
            </div>

            <div class="d-grid gap-2">
              <button type="button" class="btn btn-primary" id="pwGenerateBtn">
                生成
              </button>
              <button type="button" class="btn btn-secondary" id="pwDownloadCsvBtn">
                CSVでエクスポート
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- 結果エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary-subtle fw-bold">
            生成結果
          </div>
          <div class="card-body">
            <p class="text-muted small">
              「生成」ボタンを押すと、条件に沿ったパスワードが一覧表示されます。<br>
              各パスワードの後ろに、1文字ずつの読み方（例：大文字のエー、小文字のビー、数字のサン…）も併記されます。
            </p>
            <hr>
            <div id="pwResult" class="small"></div>
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

  // ===== TOPへ戻るボタンの制御 =====
  var backBtn = document.getElementById("backToTopBtn");
  if (!backBtn) return;

  window.addEventListener("scroll", function () {
    backBtn.style.display = (window.pageYOffset > 200) ? "inline-flex" : "none";
  });

  backBtn.addEventListener("click", function () {
    var topEl = document.getElementById("page-top");
    if (topEl && topEl.scrollIntoView) {
      topEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // ===== パスワードジェネレーター ロジック =====

  var lengthSelect = document.getElementById("pwLength");
  var countSelect = document.getElementById("pwCount");
  var btnGenerate = document.getElementById("pwGenerateBtn");
  var btnDownloadCsv = document.getElementById("pwDownloadCsvBtn");
  var resultEl = document.getElementById("pwResult");

  var useUppercaseEl = document.getElementById("pwUseUppercase");
  var useLowercaseEl = document.getElementById("pwUseLowercase");
  var useNumbersEl = document.getElementById("pwUseNumbers");
  var useSymbolsEl = document.getElementById("pwUseSymbols");

  // 長さセレクト：4〜20（初期値8）
  for (var i = 4; i <= 20; i++) {
    var optLen = document.createElement("option");
    optLen.value = String(i);
    optLen.textContent = String(i);
    if (i === 8) optLen.selected = true;
    lengthSelect.appendChild(optLen);
  }

  // 個数セレクト：1〜50（初期値1）
  for (var j = 1; j <= 50; j++) {
    var optCount = document.createElement("option");
    optCount.value = String(j);
    optCount.textContent = String(j);
    if (j === 1) optCount.selected = true;
    countSelect.appendChild(optCount);
  }

  var passwordData = [];

  // 1文字ずつの読み方
  function describeChar(char) {
    var kanaMap = {
      'A': 'エー', 'B': 'ビー', 'C': 'シー', 'D': 'ディー', 'E': 'イー',
      'F': 'エフ', 'G': 'ジー', 'H': 'エイチ', 'I': 'アイ', 'J': 'ジェー',
      'K': 'ケー', 'L': 'エル', 'M': 'エム', 'N': 'エヌ', 'O': 'オー',
      'P': 'ピー', 'Q': 'キュー', 'R': 'アール', 'S': 'エス', 'T': 'ティー',
      'U': 'ユー', 'V': 'ブイ', 'W': 'ダブリュー', 'X': 'エックス', 'Y': 'ワイ', 'Z': 'ゼット',
      'a': 'エー', 'b': 'ビー', 'c': 'シー', 'd': 'ディー', 'e': 'イー',
      'f': 'エフ', 'g': 'ジー', 'h': 'エイチ', 'i': 'アイ', 'j': 'ジェー',
      'k': 'ケー', 'l': 'エル', 'm': 'エム', 'n': 'エヌ', 'o': 'オー',
      'p': 'ピー', 'q': 'キュー', 'r': 'アール', 's': 'エス', 't': 'ティー',
      'u': 'ユー', 'v': 'ブイ', 'w': 'ダブリュー', 'x': 'エックス', 'y': 'ワイ', 'z': 'ゼット',
      '0': 'ゼロ', '1': 'イチ', '2': 'ニー', '3': 'サン', '4': 'ヨン',
      '5': 'ゴー', '6': 'ロク', '7': 'ナナ', '8': 'ハチ', '9': 'キュー',
      '!': 'ビックリマーク', '@': 'アットマーク', '#': 'シャープ', '$': 'ドルマーク',
      '%': 'パーセント', '^': 'ハット', '&': 'アンパサンド', '*': 'アスタリスク',
      '(': 'カッコ開き', ')': 'カッコ閉じ', '_': 'アンダースコア', '+': 'プラス'
    };

    var prefixMap = {
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ': '大文字の',
      'abcdefghijklmnopqrstuvwxyz': '小文字の',
      '0123456789': '数字の',
      '!@#$%^&*()_+': '記号の'
    };

    var prefix = '';
    for (var key in prefixMap) {
      if (key.indexOf(char) !== -1) {
        prefix = prefixMap[key];
        break;
      }
    }
    return prefix + (kanaMap[char] || char);
  }

  // パスワード生成
  function generatePasswords() {
    passwordData.length = 0;

    var length = parseInt(lengthSelect.value, 10);
    var count = parseInt(countSelect.value, 10);
    var useUppercase = useUppercaseEl.checked;
    var useLowercase = useLowercaseEl.checked;
    var useNumbers = useNumbersEl.checked;
    var useSymbols = useSymbolsEl.checked;

    var chars = "";
    if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers)   chars += "0123456789";
    if (useSymbols)   chars += "!@#$%^&*()_+";

    var resultHtml = "";

    for (var k = 0; k < count; k++) {
      var pw = "";
      var desc = [];

      for (var m = 0; m < length; m++) {
        var c = chars[Math.floor(Math.random() * chars.length)];
        pw += c;
        desc.push(describeChar(c));
      }

      passwordData.push({ password: pw, description: desc });

      // ★1個ごとに余白を確保
      resultHtml += `
        <div class="mb-3">
          ${k + 1}個目: <code>${pw}</code>（${desc.join('、')}）
        </div>
      `;
    }

    resultEl.innerHTML = resultHtml;
  }

  // CSVダウンロード
  function downloadCSV() {
    if (!passwordData.length) {
      alert("まず「生成」ボタンでパスワードを作成してください。");
      return;
    }

    var csvHeader = "NO,パスワード,";
    var length = parseInt(lengthSelect.value, 10);
    for (var i = 1; i <= length; i++) {
      csvHeader += i + "文字目,";
    }
    csvHeader = csvHeader.slice(0, -1) + "\n";

    var csvBody = passwordData
      .map(function (e, i) {
        return (i + 1) + "," + e.password + "," + e.description.join(",");
      })
      .join("\n");

    var blob = new Blob(["\uFEFF" + csvHeader + csvBody], {
      type: "text/csv;charset=utf-8;"
    });

    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "passwords.csv";

    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  // イベント紐付け
  btnGenerate.addEventListener("click", generatePasswords);
  btnDownloadCsv.addEventListener("click", downloadCSV);

})();
