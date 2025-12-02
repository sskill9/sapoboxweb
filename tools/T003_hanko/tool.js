// tool.js — T003 ハンコジェネレータ用ロジック
(function () {
  "use strict";

  function initHankoTool() {
    // --- ナビバーのツール名を書き換え ---
    var toolNameSpan = document.querySelector(
      '#top-block .navbar-brand span.fw-normal'
    );
    if (toolNameSpan) {
      toolNameSpan.textContent = " - T003 ハンコジェネレータ";
    }

    // --- ダウンロードボタンのZIPファイルを T003（フルパス）に変更 ---
    var downloadLink = document.querySelector(
      '#top-block a[aria-label="このツール一式をZIPでダウンロード"]'
    );
    if (downloadLink) {
      downloadLink.setAttribute(
        "href",
        "https://ss1.xrea.com/sskill9.s323.xrea.com/tools/T003_hanko/T003.zip"
      );
    }

    // --- コンテンツ本体をハンコツール用に差し替え ---
    var contentEl = document.getElementById("content-block");
    if (!contentEl) return;

    contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（左：バッジ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：バッジ類 -->
    <div class="mb-2 mb-md-0">
      <span class="stb-tag stb-tag-category">ハンコ生成</span>
      <span class="stb-tag stb-tag-usage">コンタクトセンター向け</span>
    </div>

    <!-- 右側：概要説明 -->
    <div class="text-muted small">
      入力した苗字から電子印鑑（ハンコ）画像を生成し、透過PNGでダウンロードできるツールです。<br>
      名札やマニュアル、チーム内資料などでの簡易な目印づくりに活用できます。
    </div>

  </div>

  <!-- 入力／結果エリア -->
  <section class="mb-5">
    <div class="row gy-4">

      <!-- 左：入力エリア（STEP1） -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary-subtle fw-bold">
            STEP1：苗字を入力してハンコを生成
          </div>
          <div class="card-body">
            <p class="small text-muted">
              苗字を1〜4文字で入力し、「ハンコ生成」をクリックしてください。<br>
              入力した文字が赤い丸枠の中に縦書きで配置された電子印鑑を作成します。
            </p>

            <div class="mb-3">
              <label for="nameInput" class="form-label">
                苗字（1〜4文字）<span class="text-danger ms-1">*</span>
              </label>
              <input
                type="text"
                id="nameInput"
                class="form-control"
                maxlength="4"
                placeholder="例：山田"
                autocomplete="off">
              <div class="form-text">
                全角・半角どちらでも利用できますが、4文字までの想定です。
              </div>
            </div>

            <button
              type="button"
              id="btnGenerate"
              class="btn btn-primary">
              ハンコ生成
            </button>
          </div>
        </div>
      </div>

      <!-- 右：結果エリア（STEP2 / STEP3） -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary-subtle fw-bold">
            STEP2：ハンコ画像の確認 → STEP3：ダウンロード
          </div>
          <div class="card-body text-center">
            <p class="small text-muted">
              生成されたハンコ画像を確認し、問題なければ「PNGとしてダウンロード」ボタンをクリックしてください。
            </p>

            <div class="d-flex justify-content-center mb-3">
              <canvas
                id="stampCanvas"
                width="300"
                height="300"
                class="border border-secondary rounded bg-white"
                aria-label="生成されたハンコ画像表示用キャンバス">
              </canvas>
            </div>

            <button
              type="button"
              id="btnDownload"
              class="btn btn-outline-primary">
              PNGとしてダウンロード
            </button>
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

    // --- 要素取得 ---
    var nameInput = document.getElementById("nameInput");
    var btnGenerate = document.getElementById("btnGenerate");
    var btnDownload = document.getElementById("btnDownload");
    var canvas = document.getElementById("stampCanvas");
    var backBtn = document.getElementById("backToTopBtn");

    if (!nameInput || !btnGenerate || !btnDownload || !canvas) {
      return;
    }

    var ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    // --- ハンコ生成ロジック ---
    function generateStamp() {
      var textRaw = nameInput.value || "";
      var text = textRaw.trim();

      if (!text) {
        alert("苗字を1〜4文字で入力してください。");
        return;
      }

      if (text.length > 4) {
        alert("4文字まで対応です。先頭4文字のみを使用します。");
        text = text.slice(0, 4);
      }

      // キャンバスクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 文字数に応じたフォントサイズ・開始位置の調整
      var charCount = text.length;
      var fontSize;
      var yOffsetStart;

      switch (charCount) {
        case 1:
          fontSize = 97;
          yOffsetStart = canvas.height / 2;
          break;
        case 2:
          fontSize = 97;
          yOffsetStart = canvas.height / 2 - fontSize / 2;
          break;
        case 3:
          fontSize = 65; // 3文字用に少し小さめ
          yOffsetStart = canvas.height / 2 - fontSize;
          break;
        case 4:
          fontSize = 48; // 4文字用にさらに小さく
          yOffsetStart = canvas.height / 2 - 1.5 * fontSize;
          break;
        default:
          fontSize = 97;
          yOffsetStart = canvas.height / 2;
      }

      ctx.font = fontSize + "px Noto Sans JP";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 赤い丸枠を描画
      var circleRadius = 100;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, circleRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 文字を縦に描画
      var chars = text.split("");
      var yOffset = yOffsetStart;

      chars.forEach(function (ch) {
        ctx.fillText(ch, canvas.width / 2, yOffset);
        yOffset += fontSize;
      });
    }

    // --- PNG ダウンロード ---
    function downloadCanvas() {
      var link = document.createElement("a");
      link.download = "stamp.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }

    // --- イベントハンドラ設定 ---
    btnGenerate.addEventListener("click", generateStamp);

    nameInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        generateStamp();
      }
    });

    btnDownload.addEventListener("click", downloadCanvas);

    // --- TOPへ戻るボタンの制御 ---
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
        if (topEl && typeof topEl.scrollIntoView === "function") {
          topEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }
  }

  // DOM 準備完了後に初期化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHankoTool);
  } else {
    initHankoTool();
  }
})();
