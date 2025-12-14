// content.js — CONTENTブロック（ツール本体＋TOPへ戻るボタン）
(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（左：バッジ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：バッジ類（丸ピル統一版） -->
    <!-- ★重要：バッジ色はT000の正本と完全一致（1つ目:#0d6efd / 2つ目:#20c997） -->
    <div class="mb-2 mb-md-0">
      <span class="badge rounded-pill fw-semibold me-2"
            style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
        QRコード
      </span>
      <span class="badge rounded-pill fw-semibold"
            style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
        汎用ツール
      </span>
    </div>

    <!-- 右側：概要説明 -->
    <div class="text-muted small">
      URL などの文字列から QRコード（PNG）を生成します。誤り訂正レベルとサイズを指定して、生成ボタンで出力します。
    </div>

  </div>

  <!-- 入力／結果エリア -->
  <section class="mb-5">
    <div class="row gy-4">

      <!-- 入力エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold">
            入力エリア
          </div>

          <div class="card-body">

            <div class="mb-3">
              <label for="qrText" class="form-label fw-semibold">URL（または任意テキスト）</label>
              <input
                type="text"
                id="qrText"
                class="form-control"
                value="https://www.google.com/">
              <div class="form-text">
                ※ URL以外の文字列もQRにできます（日本語も可。ただし長文は読み取りにくくなる場合があります）。
              </div>
            </div>

            <div class="mb-3">
              <label for="qrEcc" class="form-label fw-semibold">誤り訂正レベル</label>
              <select id="qrEcc" class="form-select">
                <option value="L">L（約7%復元）</option>
                <option value="M" selected>M（約15%復元）</option>
                <option value="Q">Q（約25%復元）</option>
                <option value="H">H（約30%復元）</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="qrSize" class="form-label fw-semibold">サイズ（px）</label>
              <select id="qrSize" class="form-select">
                <option value="128">128</option>
                <option value="256" selected>256</option>
                <option value="512">512</option>
              </select>
            </div>

            <div class="d-flex flex-wrap gap-2">
              <button type="button" id="btnGenerateQr" class="btn btn-primary">
                生成（PNG）
              </button>
              <button type="button" id="btnDownloadPng" class="btn btn-outline-primary" disabled>
                PNGをダウンロード
              </button>
            </div>

            <div id="qrInputMsg" class="mt-3 small" aria-live="polite"></div>

          </div>
        </div>
      </div>

      <!-- 結果エリア -->
      <div class="col-md-6">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold">
            結果エリア
          </div>

          <div class="card-body text-center">

            <!-- canvas は内部処理用：非表示 -->
            <canvas id="qrCanvas"
                    width="256"
                    height="256"
                    style="display:none;"></canvas>

            <!-- 初期は非表示（srcが空だと壊れ画像扱いになるため） -->
            <img id="qrPreviewImg"
                 alt="QRコードプレビュー"
                 class="d-none border rounded bg-white"
                 style="max-width:100%;height:auto;">

            <div class="text-muted small mt-3">
              生成後、右側にQRコードが表示されます。必要に応じて「PNGをダウンロード」を押してください。
            </div>

            <div id="qrResultMsg" class="mt-2 small" aria-live="polite"></div>

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

  // ===== QR生成ロジックブロック =====
  var qrTextEl = document.getElementById("qrText");
  var qrEccEl = document.getElementById("qrEcc");
  var qrSizeEl = document.getElementById("qrSize");
  var btnGenerateEl = document.getElementById("btnGenerateQr");
  var btnDownloadEl = document.getElementById("btnDownloadPng");
  var inputMsgEl = document.getElementById("qrInputMsg");
  var canvasEl = document.getElementById("qrCanvas");
  var previewImgEl = document.getElementById("qrPreviewImg");
  var resultMsgEl = document.getElementById("qrResultMsg");

  var lastPngDataUrl = "";

  function setMsg(el, type, text) {
    if (!el) return;
    if (!text) {
      el.innerHTML = "";
      return;
    }
    var cls = "text-muted";
    if (type === "ok") cls = "text-success";
    if (type === "warn") cls = "text-warning";
    if (type === "err") cls = "text-danger";
    el.innerHTML = `<span class="${cls}">${escapeHtml(text)}</span>`;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function enableDownload(enable) {
    if (!btnDownloadEl) return;
    btnDownloadEl.disabled = !enable;
  }

  function hidePreview() {
    if (!previewImgEl) return;
    previewImgEl.classList.add("d-none");
    previewImgEl.removeAttribute("src");
  }

  function showPreview(src) {
    if (!previewImgEl) return;
    previewImgEl.src = src;
    previewImgEl.classList.remove("d-none");
  }

  // 初期状態
  hidePreview();
  enableDownload(false);

  async function generateQr() {
    setMsg(inputMsgEl, "", "");
    setMsg(resultMsgEl, "", "");

    if (!window.QRCode) {
      setMsg(resultMsgEl, "err", "QRライブラリが読み込まれていません（qrcode.min.js を確認してください）。");
      hidePreview();
      enableDownload(false);
      return;
    }

    var text = (qrTextEl && qrTextEl.value) ? qrTextEl.value.trim() : "";
    if (!text) {
      setMsg(inputMsgEl, "err", "URL（または任意テキスト）を入力してください。");
      hidePreview();
      enableDownload(false);
      return;
    }

    var ecc = (qrEccEl && qrEccEl.value) ? qrEccEl.value : "M";
    var size = 256;
    if (qrSizeEl && qrSizeEl.value) {
      size = parseInt(qrSizeEl.value, 10);
      if (Number.isNaN(size) || size <= 0) size = 256;
    }

    canvasEl.width = size;
    canvasEl.height = size;

    try {
      await window.QRCode.toCanvas(canvasEl, text, {
        errorCorrectionLevel: ecc,
        width: size,
        margin: 2
      });

      lastPngDataUrl = canvasEl.toDataURL("image/png");

      // 表示はimgのみ（QRが2個にならない）
      showPreview(lastPngDataUrl);

      enableDownload(true);
      setMsg(resultMsgEl, "ok", "生成しました。必要に応じて「PNGをダウンロード」を押してください。");
    } catch (err) {
      lastPngDataUrl = "";
      hidePreview();
      enableDownload(false);

      var msg = "生成に失敗しました。入力内容やサイズ、誤り訂正レベルを見直してください。";
      if (err && err.message) {
        msg += "（" + err.message + "）";
      }
      setMsg(resultMsgEl, "err", msg);
    }
  }

  function downloadPng() {
    if (!lastPngDataUrl) {
      setMsg(resultMsgEl, "warn", "先に「生成（PNG）」を押してください。");
      return;
    }
    var a = document.createElement("a");
    a.href = lastPngDataUrl;
    a.download = "qr.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setMsg(resultMsgEl, "ok", "PNGをダウンロードしました。");
  }

  if (btnGenerateEl) {
    btnGenerateEl.addEventListener("click", function () {
      generateQr();
    });
  }

  if (btnDownloadEl) {
    btnDownloadEl.addEventListener("click", function () {
      downloadPng();
    });
  }

  if (qrTextEl) {
    qrTextEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        generateQr();
      }
    });
  }
  // ===== QR生成ロジックブロックここまで =====

  // TOPへ戻るボタンの制御
  var backBtn = document.getElementById("backToTopBtn");
  if (!backBtn) return;

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
})();
