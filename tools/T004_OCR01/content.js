// content.js — CONTENTブロック（T004 簡易OCR ＋ TOPへ戻るボタン）
//
// 画像ファイル／クリップボード画像から文字を抽出する簡易OCRツール。
// Tesseract.js（ローカル設置版）を利用して日本語OCRを行い、
// 半角スペース削除や①〜㊿の丸数字を通常の数字へ変換します。

(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  // メインコンテンツの描画
  contentEl.innerHTML = `
    <div class="container my-4">

      <!-- ツール情報バー（T002 と同じ位置：TOPバー直下） -->
      <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">
        <div class="mb-2 mb-md-0">
          <span class="stb-tag stb-tag-category">OCR</span>
          <span class="stb-tag stb-tag-usage">コンタクトセンター向け</span>
        </div>
        <div class="text-muted small">
          画像から日本語テキストを抽出します。
        </div>
      </div>

      <div class="row g-4">
        <!-- 左カラム：ツール本体 -->
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-header bg-primary bg-opacity-10">
              <span class="fw-bold text-primary">簡易OCRツール</span>
            </div>
            <div class="card-body">

              <!-- STEP1: 画像読み込み -->
              <section class="mb-4">
                <h2 class="h5 text-primary border-bottom pb-1 mb-3">
                  STEP1：画像ファイルを選択するか、クリップボードから貼り付けてください
                </h2>

                <p class="small text-muted mb-2">
                  ① PNG / JPG などの画像ファイルを選択するか、② クリップボードにコピー済みの画像を貼り付けて読み込みます。
                </p>

                <input type="file"
                       id="ocrFileInput"
                       accept="image/*"
                       class="d-none">

                <div class="d-flex flex-wrap gap-2 mb-3">
                  <button type="button"
                          id="btnOcrSelectFile"
                          class="btn btn-primary">
                    ① 画像ファイルを選択
                  </button>
                  <button type="button"
                          id="btnOcrPasteClipboard"
                          class="btn btn-primary">
                    ② クリップボードから貼り付け
                  </button>
                </div>

                <div class="border bg-white rounded p-2 text-center">
                  <div class="mb-2 small text-muted">
                    読み込んだ画像がここに表示されます（大きい画像は縮小表示されます）。
                  </div>
                  <img id="ocrImagePreview"
                       src=""
                       alt="OCR対象画像プレビュー"
                       class="img-fluid"
                       style="max-height: 400px; object-fit: contain; display:none;">
                </div>
              </section>

              <!-- STEP2: OCR解析 -->
              <section class="mb-4">
                <h2 class="h5 text-primary border-bottom pb-1 mb-3">
                  STEP2：取り込んだ画像を OCR 解析してください
                </h2>

                <p class="small text-muted mb-2">
                  「OCR解析を実行」ボタンを押すと、画像内の文字を解析します。マシン性能や画像サイズによっては数秒～十数秒程度かかる場合があります。
                </p>

                <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                  <button type="button"
                          id="btnOcrStart"
                          class="btn btn-success">
                    OCR解析を実行
                  </button>
                  <span id="ocrStatus"
                        class="small text-muted">
                    準備完了（画像を読み込んでから実行してください）
                  </span>
                </div>
              </section>

              <!-- STEP3: 結果確認・コピー -->
              <section>
                <h2 class="h5 text-primary border-bottom pb-1 mb-3">
                  STEP3：必要に応じて文字列を修正し、コピーしてください
                </h2>

                <p class="small text-muted mb-2">
                  OCR結果は以下のテキストエリアに表示されます。不要な改行や誤認識の修正を行った後、「コピー」ボタンでクリップボードへコピーできます。
                </p>

                <div class="mb-2 d-flex flex-wrap gap-2">
                  <button type="button"
                          id="btnOcrSelectAll"
                          class="btn btn-primary btn-sm">
                    全選択
                  </button>
                  <button type="button"
                          id="btnOcrCopy"
                          class="btn btn-primary btn-sm">
                    コピー
                  </button>
                </div>

                <textarea id="ocrOutput"
                          class="form-control"
                          rows="14"
                          placeholder="OCRの結果がここに表示されます。"></textarea>
              </section>

            </div>
          </div>
        </div>

        <!-- 右カラム：このツールについて・注意事項 -->
        <div class="col-lg-4">
          <!-- このツールについて -->
          <div class="card shadow-sm mb-3">
            <div class="card-header bg-primary bg-opacity-10">
              <h2 class="h6 mb-0 text-primary">このツールについて</h2>
            </div>
            <div class="card-body small">
              <p class="mb-2">
                「T004 簡易OCR」は、コールセンター業務や事務作業で利用する画面キャプチャ・スキャン画像などから、
                日本語テキストを手軽に抽出するためのツールです。
              </p>
              <ul class="mb-0 ps-3">
                <li>画像ファイル（PNG / JPG など）からの文字起こし</li>
                <li>クリップボードにコピー済みの画像からの文字起こし</li>
                <li>①〜㊿ などの環境依存の丸数字を通常の数字に変換</li>
                <li>一文字ごとに入る半角スペースを自動削除</li>
              </ul>
            </div>
          </div>

          <!-- ご利用上の注意 -->
          <div class="card shadow-sm">
            <div class="card-header bg-primary bg-opacity-10">
              <h2 class="h6 mb-0 text-primary">ご利用上の注意</h2>
            </div>
            <div class="card-body small">
              <ul class="mb-2 ps-3">
                <li>
                  クリップボードからの画像読み込みは、ブラウザの仕様上
                  <span class="fw-bold">HTTPS または localhost</span> でのみ動作します。
                  <span class="text-muted">file:// で開いた場合はエラーになることがあります。</span>
                </li>
                <li>手書き文字や低解像度の画像は認識精度が低くなることがあります。</li>
                <li>個人情報を含む画像を扱う際は、社内ルールに従って慎重に取り扱ってください。</li>
              </ul>
              <p class="mb-0 text-muted">
                Tesseract.js（Apache License 2.0）を利用しており、ツール自体はローカル環境で完結して動作します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TOPへ戻るボタン -->
    <button type="button"
            id="backToTopBtn"
            class="btn btn-primary rounded-circle shadow"
            style="display:none; position:fixed; right:1.5rem; bottom:1.5rem; width:3rem; height:3rem; justify-content:center; align-items:center;">
      ↑
    </button>
  `;

  // ==========
  // 要素参照
  // ==========
  var fileInput = document.getElementById("ocrFileInput");
  var btnSelectFile = document.getElementById("btnOcrSelectFile");
  var btnPasteClipboard = document.getElementById("btnOcrPasteClipboard");
  var btnOcrStart = document.getElementById("btnOcrStart");
  var btnSelectAll = document.getElementById("btnOcrSelectAll");
  var btnCopy = document.getElementById("btnOcrCopy");
  var imgPreview = document.getElementById("ocrImagePreview");
  var outputArea = document.getElementById("ocrOutput");
  var statusEl = document.getElementById("ocrStatus");
  var backBtn = document.getElementById("backToTopBtn");

  // ==========
  // 画像読み込み処理
  // ==========

  // ファイル選択ボタン → input[type=file] をクリック
  if (btnSelectFile && fileInput) {
    btnSelectFile.addEventListener("click", function () {
      fileInput.click();
    });
  }

  // ファイルが選択されたときの処理
  if (fileInput && imgPreview && statusEl) {
    fileInput.addEventListener("change", function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;

      var reader = new FileReader();
      reader.onload = function (e) {
        imgPreview.src = e.target && e.target.result ? e.target.result : "";
        imgPreview.style.display = "block";
        statusEl.textContent = "画像を読み込みました。OCR解析を実行できます。";
      };
      reader.onerror = function () {
        statusEl.textContent = "画像の読み込みに失敗しました。";
        alert("画像の読み込みに失敗しました。");
      };
      reader.readAsDataURL(file);
    });
  }

  // クリップボードから画像を読み込む
  if (btnPasteClipboard && imgPreview && statusEl) {
    btnPasteClipboard.addEventListener("click", async function () {
      if (!navigator.clipboard || !navigator.clipboard.read) {
        alert("このブラウザ／環境ではクリップボードからの画像取得に対応していません。");
        return;
      }

      try {
        statusEl.textContent = "クリップボードから画像を取得しています…";
        var items = await navigator.clipboard.read();
        if (!items || items.length === 0) {
          statusEl.textContent = "クリップボードから画像を取得できませんでした。";
          alert("クリップボードに画像が見つかりませんでした。");
          return;
        }

        var blobType = items[0].types.find(function (type) {
          return type === "image/png" || type === "image/jpeg";
        });

        if (!blobType) {
          statusEl.textContent = "クリップボードから画像を取得できませんでした。";
          alert("クリップボードから画像を取得できませんでした。");
          return;
        }

        var blob = await items[0].getType(blobType);
        var reader = new FileReader();
        reader.onload = function (e) {
          imgPreview.src = e.target && e.target.result ? e.target.result : "";
          imgPreview.style.display = "block";
          statusEl.textContent = "クリップボードから画像を読み込みました。OCR解析を実行できます。";
        };
        reader.onerror = function () {
          statusEl.textContent = "クリップボード画像の読み込みに失敗しました。";
          alert("クリップボード画像の読み込みに失敗しました。");
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error("Clipboard read failed", e);
        statusEl.textContent = "クリップボードから画像を取得できませんでした。";
        alert("クリップボードから画像を取得できませんでした。");
      }
    });
  }

  // ==========
  // OCR処理本体
  // ==========

  function applyReplacementMap(text) {
    // ①〜㊿ などの環境依存文字を通常の数字に変換するマップ
    var replacementMap = {
      "①": "1",
      "②": "2",
      "③": "3",
      "④": "4",
      "⑤": "5",
      "⑥": "6",
      "⑦": "7",
      "⑧": "8",
      "⑨": "9",
      "⑩": "10",
      "⑪": "11",
      "⑫": "12",
      "⑬": "13",
      "⑭": "14",
      "⑮": "15",
      "⑯": "16",
      "⑰": "17",
      "⑱": "18",
      "⑲": "19",
      "⑳": "20",
      "㉑": "21",
      "㉒": "22",
      "㉓": "23",
      "㉔": "24",
      "㉕": "25",
      "㉖": "26",
      "㉗": "27",
      "㉘": "28",
      "㉙": "29",
      "㉚": "30",
      "㉛": "31",
      "㉜": "32",
      "㉝": "33",
      "㉞": "34",
      "㉟": "35",
      "㊱": "36",
      "㊲": "37",
      "㊳": "38",
      "㊴": "39",
      "㊵": "40",
      "㊶": "41",
      "㊷": "42",
      "㊸": "43",
      "㊹": "44",
      "㊺": "45",
      "㊻": "46",
      "㊼": "47",
      "㊽": "48",
      "㊾": "49",
      "㊿": "50"
    };

    var replacedText = text;
    for (var key in replacementMap) {
      if (!Object.prototype.hasOwnProperty.call(replacementMap, key)) continue;
      var value = replacementMap[key];
      var regex = new RegExp(key, "g");
      replacedText = replacedText.replace(regex, value);
    }
    return replacedText;
  }

  async function runOcr() {
    if (!imgPreview || !statusEl || !outputArea) return;

    if (!imgPreview.src) {
      alert("先に画像を読み込んでください。");
      return;
    }

    statusEl.textContent = "OCR解析を開始しました…";
    if (btnOcrStart) btnOcrStart.disabled = true;

    try {
      var img = new Image();
      img.src = imgPreview.src;
      await img.decode();

      var canvas = document.createElement("canvas");
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      var src = canvas.toDataURL();

      if (typeof Tesseract === "undefined" || !Tesseract.recognize) {
        statusEl.textContent = "Tesseract.js が読み込まれていません。";
        alert("Tesseract.js が読み込まれていません。index.html のスクリプトパスを確認してください。");
        if (btnOcrStart) btnOcrStart.disabled = false;
        return;
      }

      var result = await Tesseract.recognize(
        src,
        "jpn",
        {
          logger: function (m) {
            if (m && m.status) {
              if (typeof m.progress === "number") {
                var pct = Math.round(m.progress * 100);
                statusEl.textContent = "OCR解析中… " + pct + "% (" + m.status + ")";
              } else {
                statusEl.textContent = "OCR解析中… (" + m.status + ")";
              }
            }
          }
        }
      );

      var text = (result && result.data && result.data.text) ? result.data.text : "";
      var cleanedText = text.replace(/ /g, "");
      var finalText = applyReplacementMap(cleanedText);

      outputArea.value = finalText;
      statusEl.textContent = "OCR解析が完了しました。必要に応じて修正し、コピーしてください。";
    } catch (e) {
      console.error("OCR解析中にエラーが発生しました", e);
      statusEl.textContent = "OCR解析中にエラーが発生しました。";
      alert("OCR解析中にエラーが発生しました。コンソールログも併せて確認してください。");
    } finally {
      if (btnOcrStart) btnOcrStart.disabled = false;
    }
  }

  if (btnOcrStart) {
    btnOcrStart.addEventListener("click", function () {
      runOcr();
    });
  }

  // ==========
  // テキストエリア操作（全選択・コピー）
  // ==========

  if (btnSelectAll && outputArea) {
    btnSelectAll.addEventListener("click", function () {
      outputArea.focus();
      outputArea.select();
    });
  }

  if (btnCopy && outputArea) {
    btnCopy.addEventListener("click", function () {
      var text = outputArea.value || "";
      if (!text) {
        alert("コピーするテキストがありません。");
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          alert("テキストをクリップボードにコピーしました。");
        }).catch(function (err) {
          console.error("navigator.clipboard.writeText に失敗しました", err);
          outputArea.focus();
          outputArea.select();
          var ok = document.execCommand("copy");
          if (ok) {
            alert("テキストをクリップボードにコピーしました。");
          } else {
            alert("コピーに失敗しました。お手数ですが手動でコピーしてください。");
          }
        });
      } else {
        outputArea.focus();
        outputArea.select();
        var ok2 = document.execCommand("copy");
        if (ok2) {
          alert("テキストをクリップボードにコピーしました。");
        } else {
          alert("コピーに失敗しました。お手数ですが手動でコピーしてください。");
        }
      }
    });
  }

  // ==========
  // TOPへ戻るボタン
  // ==========

  if (backBtn) {
    window.addEventListener("scroll", function () {
      var threshold = 300;
      if (window.pageYOffset > threshold) {
        backBtn.style.display = "inline-flex";
      } else {
        backBtn.style.display = "none";
      }
    });

    backBtn.addEventListener("click", function () {
      var topEl2 = document.getElementById("page-top");
      if (topEl2 && topEl2.scrollIntoView) {
        topEl2.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
})();
