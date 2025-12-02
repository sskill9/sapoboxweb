// content.js — CONTENTブロック（CSV 文字コード判定＆変換ツール本体＋TOPへ戻るボタン）
//
// 【このファイルで主に書き換えているポイント】
//  1) バッジ部分の文言（CSVツール／汎用ツール）
//  2) 右側の概要説明テキスト
//  3) 入力エリア（D&D／ファイル選択）と結果エリア（判定テーブル）
//  4) 文字コード判定ロジックと変換ダウンロード処理
//
//  ※ ツール名は TOP バー（top.js）側に一本化済み。
//  ※ TOPへ戻るボタン（#backToTopBtn）の挙動は共通機能なので、基本そのまま使用。
//  ※ Shift_JIS への変換はブラウザ標準 API ではサポートされていないため、
//     本ファイルでは UTF-8 系変換のみをネイティブ実装し、
//     SJIS 変換は外部ライブラリまたはカスタム関数に委譲します。
//     （詳細は convertToShiftJISBytes() のコメントを参照してください）

(function () {
  var contentEl = document.getElementById("content-block");
  if (!contentEl) return;

  contentEl.innerHTML = `
<div class="container py-4">

  <!-- ツール情報バー（左：バッジ／右：説明文） -->
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">

    <!-- 左側：バッジ類（CSVツール／汎用ツール） -->
    <div class="mb-2 mb-md-0">
      <span class="badge rounded-pill fw-semibold me-2"
            style="background-color:#0d6efd;color:#ffffff;font-size:0.78rem;">
        CSVツール
      </span>
      <span class="badge rounded-pill fw-semibold"
            style="background-color:#20c997;color:#ffffff;font-size:0.78rem;">
        汎用ツール
      </span>
    </div>

    <!-- 右側：概要説明 -->
    <div class="text-muted small">
      CSV ファイルの文字コードを判定し、 UTF-8（BOMあり/なし）や Shift_JIS への変換を支援するローカル専用ツールです。
      ファイルはブラウザ内でのみ処理され、外部サーバーには送信されません。
    </div>

  </div>

  <!-- 入力／結果エリア -->
  <section class="mb-4">
    <div class="row gy-4">

      <!-- Step1：ファイル投入エリア -->
      <div class="col-lg-5">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold d-flex justify-content-between align-items-center">
            <span>Step 1</span>
            <span>ファイルを読み込む</span>
          </div>

          <div class="card-body">

            <!-- D&D エリア -->
            <div id="dropZone"
                 class="border border-2 border-secondary border-opacity-50 rounded-3 p-4 mb-3 text-center bg-white"
                 style="border-style: dashed; cursor: pointer;">
              <div class="mb-2 fs-3">📂</div>
              <p class="mb-1 fw-semibold small">
                ここに CSV ファイルをドラッグ＆ドロップ
              </p>
              <p class="mb-0 text-muted small">
                複数ファイル OK ／ 拡張子は問いません（中身がテキストなら判定可能）
              </p>
            </div>

            <!-- ファイル選択ボタン -->
            <div class="mb-2">
              <label for="fileInput" class="form-label small mb-1">
                または、こちらのボタンからファイルを選択
              </label>
              <input
                type="file"
                id="fileInput"
                class="form-control form-control-sm"
                multiple>
            </div>

            <!-- ステータスメッセージ -->
            <div id="statusMessage" class="form-text text-muted small">
              ファイルをまだ読み込んでいません。
            </div>

            <!-- スマホ向け補足 -->
            <div id="touchHint" class="text-muted small mt-2 d-none">
              ※ スマホやタブレットでは、ドラッグ＆ドロップが使えない場合があります。
              その場合はファイル選択ボタンをご利用ください。
            </div>

          </div>
        </div>
      </div>

      <!-- Step2：判定結果テーブル -->
      <div class="col-lg-7">
        <div class="card shadow-sm h-100">

          <div class="card-header bg-primary-subtle fw-bold d-flex justify-content-between align-items-center">
            <span>Step 2</span>
            <span>判定結果と変換ダウンロード</span>
          </div>

          <div class="card-body">

            <div class="table-responsive">
              <table id="resultTable" class="table table-sm align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th scope="col" style="width:3rem;">#</th>
                    <th scope="col">ファイル名</th>
                    <th scope="col" style="width:11rem;">判定結果</th>
                    <th scope="col" style="width:9rem;">行数 / 列数</th>
                    <th scope="col" style="width:13rem;">変換</th>
                  </tr>
                </thead>
                <tbody>
                  <tr data-placeholder="true">
                    <td colspan="5" class="text-muted text-center small">
                      ここにファイルごとの判定結果が表示されます。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- このツールについて（注意事項） -->
  <section class="mb-5">
    <div class="card shadow-sm">
      <div class="card-header bg-primary-subtle fw-bold">
        このツールについて
      </div>
      <div class="card-body small text-muted">
        <p class="mb-1">
          ※ 本ツールはブラウザ内で完結するローカル処理です。ファイル内容が外部サーバーへ送信されることはありません。
        </p>
        <p class="mb-1">
          ※ 判定ロジックは簡易的なものです。100％正確な判定・変換を保証するものではありません。
        </p>
        <p class="mb-0">
          ※ 重要なデータで利用する際は、必ず元ファイルのバックアップを取得した上でご利用ください。
        </p>
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

  // ========== ここから JavaScript ロジック部分 ==========

  // 要素参照
  var dropZone = document.getElementById("dropZone");
  var fileInput = document.getElementById("fileInput");
  var statusMessage = document.getElementById("statusMessage");
  var touchHint = document.getElementById("touchHint");
  var resultTableBody = document.querySelector("#resultTable tbody");

  // 連番用カウンタ
  var fileIndex = 0;

  // タッチデバイス判定（D&D が使えない可能性の案内用）
  var isTouchDevice = false;
  try {
    isTouchDevice =
      ("ontouchstart" in window) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  } catch (e) {
    isTouchDevice = false;
  }

  if (isTouchDevice && touchHint) {
    touchHint.classList.remove("d-none");
  }

  // プレースホルダ行を削除
  function removePlaceholderRow() {
    if (!resultTableBody) return;
    var placeholder = resultTableBody.querySelector("tr[data-placeholder='true']");
    if (placeholder) {
      placeholder.parentNode.removeChild(placeholder);
    }
  }

  // ステータスメッセージ更新
  function updateStatus(message) {
    if (statusMessage) {
      statusMessage.textContent = message;
    }
  }

  // ArrayBuffer 取得（File.arrayBuffer がない環境向けフォールバック付き）
  function readFileAsArrayBuffer(file) {
    if (file && typeof file.arrayBuffer === "function") {
      return file.arrayBuffer();
    }
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target.result);
      };
      reader.onerror = function (e) {
        reject(e);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // バイナリっぽいかどうかの判定（制御文字や NUL が多い場合は非テキストとみなす）
  function isProbablyBinary(bytes) {
    if (!bytes || !bytes.length) return false;

    var len = Math.min(bytes.length, 4096); // 先頭 4KB だけチェック
    var suspicious = 0;

    for (var i = 0; i < len; i++) {
      var b = bytes[i];

      // NUL バイトがあればほぼバイナリ
      if (b === 0x00) {
        return true;
      }

      // タブ・改行・復帰は許容
      if (b === 0x09 || b === 0x0a || b === 0x0d) continue;

      // 0x20 未満の制御文字が多い場合はバイナリの可能性
      if (b < 0x20) {
        suspicious++;
      }
    }

    // 制御文字率が 2% を超える場合はバイナリとみなす
    return suspicious / len > 0.02;
  }

  // UTF-8 の妥当性チェック（簡易版だが実用レベル）
  function isValidUTF8(bytes) {
    var i = 0;
    var len = bytes.length;

    while (i < len) {
      var b1 = bytes[i];

      // ASCII
      if (b1 <= 0x7f) {
        i++;
        continue;
      }

      // 2 バイトシーケンス
      if (b1 >= 0xc2 && b1 <= 0xdf) {
        if (i + 1 >= len) return false;
        var b2 = bytes[i + 1];
        if ((b2 & 0xc0) !== 0x80) return false;
        i += 2;
        continue;
      }

      // 3 バイトシーケンス
      if (b1 >= 0xe0 && b1 <= 0xef) {
        if (i + 2 >= len) return false;
        var b2_3 = bytes[i + 1];
        var b3_3 = bytes[i + 2];
        if ((b2_3 & 0xc0) !== 0x80 || (b3_3 & 0xc0) !== 0x80) return false;
        // オーバーロング・サロゲート範囲チェック
        if (b1 === 0xe0 && b2_3 < 0xa0) return false;
        if (b1 === 0xed && b2_3 >= 0xa0) return false;
        i += 3;
        continue;
      }

      // 4 バイトシーケンス
      if (b1 >= 0xf0 && b1 <= 0xf4) {
        if (i + 3 >= len) return false;
        var b2_4 = bytes[i + 1];
        var b3_4 = bytes[i + 2];
        var b4_4 = bytes[i + 3];
        if ((b2_4 & 0xc0) !== 0x80 || (b3_4 & 0xc0) !== 0xc0 || (b4_4 & 0xc0) !== 0x80) {
          return false;
        }
        if (b1 === 0xf0 && b2_4 < 0x90) return false;
        if (b1 === 0xf4 && b2_4 >= 0x90) return false;
        i += 4;
        continue;
      }

      // それ以外は不正
      return false;
    }

    return true;
  }

  // Shift_JIS ぽさのスコア（単純に 2 バイトコードの数を見る）
  function countShiftJisPairs(bytes) {
    var len = bytes.length;
    var count = 0;

    for (var i = 0; i < len - 1; i++) {
      var b1 = bytes[i];
      var b2 = bytes[i + 1];

      var isLead =
        (b1 >= 0x81 && b1 <= 0x9f) ||
        (b1 >= 0xe0 && b1 <= 0xfc);
      var isTrail =
        (b2 >= 0x40 && b2 <= 0x7e) ||
        (b2 >= 0x80 && b2 <= 0xfc);

      if (isLead && isTrail) {
        count++;
        i++; // 2 バイト目をスキップ
      }
    }

    return count;
  }

  // 行数・列数の概算取得
  function estimateCsvShape(bytes) {
    if (!bytes || !bytes.length) {
      return { rows: 0, cols: 0 };
    }

    var lines = [];
    var currentLine = "";

    for (var i = 0; i < bytes.length; i++) {
      var b = bytes[i];

      // CR は無視し、LF で区切る（CRLF / LF どちらにも対応）
      if (b === 0x0d) {
        continue;
      } else if (b === 0x0a) {
        lines.push(currentLine);
        currentLine = "";
      } else {
        currentLine += String.fromCharCode(b);
      }
    }
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    if (!lines.length) {
      return { rows: 0, cols: 0 };
    }

    var nonEmptyLines = lines.filter(function (line) {
      return line.trim().length > 0;
    });
    if (!nonEmptyLines.length) {
      return { rows: 0, cols: 0 };
    }

    // CSV の 1 行を簡易パーサで分割（"..." 内のカンマは無視）
    function splitCsvLine(line) {
      var fields = [];
      var current = "";
      var inQuotes = false;

      for (var i = 0; i < line.length; i++) {
        var ch = line[i];

        if (ch === '"') {
          if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
            // エスケープされた二重引用符
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === "," && !inQuotes) {
          fields.push(current);
          current = "";
        } else {
          current += ch;
        }
      }
      fields.push(current);

      return fields;
    }

    var maxCols = 0;
    for (var j = 0; j < nonEmptyLines.length; j++) {
      var cols = splitCsvLine(nonEmptyLines[j]).length;
      if (cols > maxCols) {
        maxCols = cols;
      }
    }

    return {
      rows: nonEmptyLines.length,
      cols: maxCols
    };
  }

  // 文字コードの判定
  function detectEncoding(bytes) {
    if (!bytes || !bytes.length) {
      return {
        type: "unknown",
        label: "判定できませんでした",
        isText: false
      };
    }

    // まず非テキストかどうか
    if (isProbablyBinary(bytes)) {
      return {
        type: "binary",
        label: "テキストとして読み取れませんでした",
        isText: false
      };
    }

    var len = bytes.length;

    // UTF-8 BOM チェック
    var hasBom =
      len >= 3 &&
      bytes[0] === 0xef &&
      bytes[1] === 0xbb &&
      bytes[2] === 0xbf;

    var utf8Bytes = hasBom ? bytes.subarray(3) : bytes;

    if (isValidUTF8(utf8Bytes)) {
      if (hasBom) {
        return {
          type: "utf8-bom",
          label: "UTF-8（BOMあり）として読み取れました",
          isText: true,
          bom: true
        };
      } else {
        return {
          type: "utf8",
          label: "UTF-8（BOMなし）として読み取れました",
          isText: true,
          bom: false
        };
      }
    }

    // UTF-8 ではない → Shift_JIS ぽさを確認
    var sjisPairs = countShiftJisPairs(bytes);

    if (sjisPairs > 0) {
      return {
        type: "sjis",
        label: "Shift_JIS として読み取れました（推定）",
        isText: true,
        bom: false
      };
    }

    // テキストではあるが、文字コードを 1 つに絞れない場合
    return {
      type: "unknown-text",
      label: "文字コードを特定できませんでした（テキスト）",
      isText: true,
      bom: false
    };
  }

  // SJIS 変換のための拡張ポイント
  //
  //  - ブラウザの標準 TextEncoder/TextDecoder は UTF-8 のみを対象とする実装が多いため、
  //    ここでは SJIS 変換を外部ライブラリまたはカスタム関数に委譲します。
  //  - 具体的には、グローバル関数
  //      window.csvEncodingToolConvertToSJIS(text: string): Uint8Array
  //    が定義されている場合、その戻り値を SJIS バイト列として使用します。
  //  - 上記関数が未定義の場合、このツールでは SJIS 変換ボタン押下時に
  //    アラートを表示し処理を中断します。
  function convertToShiftJISBytes(text) {
    if (window && typeof window.csvEncodingToolConvertToSJIS === "function") {
      try {
        var result = window.csvEncodingToolConvertToSJIS(text);
        if (result && result.buffer && typeof result.length === "number") {
          return new Uint8Array(result);
        }
      } catch (e) {
        console.error("SJIS 変換中にエラーが発生しました:", e);
        alert("Shift_JIS への変換中にエラーが発生しました。コンソールログを確認してください。");
        return null;
      }
    }

    alert(
      "Shift_JIS への変換はブラウザ標準機能のみではサポートされません。\n" +
      "encoding-japanese 等のライブラリを読み込み、\n" +
      "window.csvEncodingToolConvertToSJIS(text) を実装してください。"
    );
    return null;
  }

  // 変換ボタン押下時の処理
  function handleConvertClick(bytes, originalName, target) {
    if (!bytes || !bytes.length) {
      alert("変換対象のデータがありません。");
      return;
    }

    // テキストにデコード（UTF-8 前提の簡易実装）
    // ※ UTF-8 / UTF-8(BOM) の場合は正しく変換されます。
    //    SJIS 元データの場合は、適切なライブラリを用いた変換実装に差し替えてください。
    var decoder;
    try {
      decoder = new TextDecoder("utf-8");
    } catch (e) {
      alert("TextDecoder がサポートされていないブラウザです。");
      return;
    }

    var text = decoder.decode(bytes);

    var outBytes;
    var prefix;
    var mimeType = "text/csv";

    if (target === "UTF8") {
      // UTF-8（BOMなし）
      var encoder = new TextEncoder();
      outBytes = encoder.encode(text);
      prefix = "UTF8_";
    } else if (target === "UTF8_BOM") {
      var encoderBom = new TextEncoder();
      var utf8WithoutBom = encoderBom.encode(text);
      outBytes = new Uint8Array(utf8WithoutBom.length + 3);
      outBytes[0] = 0xef;
      outBytes[1] = 0xbb;
      outBytes[2] = 0xbf;
      outBytes.set(utf8WithoutBom, 3);
      prefix = "UTF8BOM_";
    } else if (target === "SJIS") {
      var sjisBytes = convertToShiftJISBytes(text);
      if (!sjisBytes) {
        return; // 変換失敗（アラート済み）
      }
      outBytes = sjisBytes;
      prefix = "SJIS_";
      mimeType = "text/csv";
    } else {
      alert("未対応の変換種別です。");
      return;
    }

    var outName = prefix + originalName;

    var blob = new Blob([outBytes], { type: mimeType });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = outName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  // 結果テーブルに 1 行追加
  function appendResultRow(fileNo, file, bytes, detectInfo, shape) {
    removePlaceholderRow();

    var tr = document.createElement("tr");

    // #（連番）
    var tdIndex = document.createElement("td");
    tdIndex.textContent = String(fileNo);
    tdIndex.className = "text-muted small";
    tr.appendChild(tdIndex);

    // ファイル名
    var tdName = document.createElement("td");
    tdName.textContent = file.name;
    tdName.className = "small";
    tr.appendChild(tdName);

    // 判定結果
    var tdEncoding = document.createElement("td");
    tdEncoding.className = "small";

    if (detectInfo.type === "binary") {
      tdEncoding.textContent = "非テキスト（" + detectInfo.label + "）";
    } else if (detectInfo.type === "utf8") {
      tdEncoding.textContent = "UTF-8（BOMなし）";
    } else if (detectInfo.type === "utf8-bom") {
      tdEncoding.textContent = "UTF-8（BOMあり）";
    } else if (detectInfo.type === "sjis") {
      tdEncoding.textContent = "Shift_JIS（推定）";
    } else if (detectInfo.type === "unknown-text") {
      tdEncoding.textContent = "判定不能（テキスト）";
    } else {
      tdEncoding.textContent = "判定不能";
    }

    tr.appendChild(tdEncoding);

    // 行数 / 列数
    var tdShape = document.createElement("td");
    tdShape.className = "small text-muted";
    if (detectInfo.isText && shape && shape.rows && shape.cols) {
      tdShape.textContent = shape.rows + " 行 / " + shape.cols + " 列（概算）";
    } else if (detectInfo.isText) {
      tdShape.textContent = "テキスト（行・列判定不可）";
    } else {
      tdShape.textContent = "―";
    }
    tr.appendChild(tdShape);

    // 変換ボタン群
    var tdActions = document.createElement("td");
    tdActions.className = "small";

    if (!detectInfo.isText) {
      var span = document.createElement("span");
      span.className = "text-muted";
      span.textContent = "変換対象外";
      tdActions.appendChild(span);
    } else {
      var btnGroup = document.createElement("div");
      btnGroup.className = "d-flex flex-wrap gap-1";

      function createButton(label, target, variant) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-sm " + (variant || "btn-primary");
        btn.textContent = label;
        btn.addEventListener("click", function () {
          handleConvertClick(bytes, file.name, target);
        });
        return btn;
      }

      if (detectInfo.type === "unknown-text") {
        // Cパターン：文字コード特定不能（テキスト）
        btnGroup.appendChild(createButton("UTF-8として試す", "UTF8", "btn-primary"));
        btnGroup.appendChild(createButton("Shift_JISとして試す", "SJIS", "btn-primary"));
      } else {
        // Aパターン：UTF-8 / SJIS 等に特定できた場合
        btnGroup.appendChild(createButton("UTF-8（BOMなし）", "UTF8", "btn-primary"));
        btnGroup.appendChild(createButton("UTF-8（BOMあり）", "UTF8_BOM", "btn-primary"));
        btnGroup.appendChild(createButton("Shift_JIS", "SJIS", "btn-primary"));
      }

      tdActions.appendChild(btnGroup);
    }

    tr.appendChild(tdActions);

    resultTableBody.appendChild(tr);
  }

  // ファイルごとの処理
  function processFile(file) {
    if (!file) return;

    var currentIndex = ++fileIndex;
    updateStatus("「" + file.name + "」を判定中…");

    readFileAsArrayBuffer(file)
      .then(function (buffer) {
        var bytes = new Uint8Array(buffer);

        var detectInfo = detectEncoding(bytes);
        var shape = detectInfo.isText ? estimateCsvShape(bytes) : { rows: 0, cols: 0 };

        appendResultRow(currentIndex, file, bytes, detectInfo, shape);
        updateStatus(fileIndex + " 件のファイルを判定しました。");
      })
      .catch(function (error) {
        console.error("ファイル読み込み中にエラーが発生しました:", error);
        updateStatus("ファイル読み込み中にエラーが発生しました。コンソールログを確認してください。");
      });
  }

  // ファイルリストをまとめて処理
  function handleFiles(fileList) {
    if (!fileList || !fileList.length) {
      return;
    }

    var count = fileList.length;
    updateStatus(count + " 件のファイルを判定中…");

    for (var i = 0; i < count; i++) {
      processFile(fileList[i]);
    }
  }

  // D&D イベントの設定（タッチデバイスでは視覚的な案内のみ）
  if (dropZone) {
    if (!isTouchDevice) {
      ["dragenter", "dragover"].forEach(function (evtName) {
        dropZone.addEventListener(evtName, function (event) {
          event.preventDefault();
          event.stopPropagation();
          dropZone.classList.add("border-primary");
          dropZone.classList.remove("border-secondary");
          dropZone.classList.add("bg-light");
        });
      });

      ["dragleave", "drop"].forEach(function (evtName) {
        dropZone.addEventListener(evtName, function (event) {
          event.preventDefault();
          event.stopPropagation();
          dropZone.classList.remove("border-primary");
          dropZone.classList.add("border-secondary");
          dropZone.classList.remove("bg-light");
        });
      });

      dropZone.addEventListener("drop", function (event) {
        var dt = event.dataTransfer;
        if (dt && dt.files && dt.files.length) {
          handleFiles(dt.files);
        }
      });

      // クリックでファイル選択
      dropZone.addEventListener("click", function () {
        if (fileInput) {
          fileInput.click();
        }
      });
    } else {
      // タッチデバイスではクリックのみ有効にする
      dropZone.addEventListener("click", function () {
        if (fileInput) {
          fileInput.click();
        }
      });
    }
  }

  // ファイル選択（input[type="file"]）
  if (fileInput) {
    fileInput.addEventListener("change", function (event) {
      var files = event.target.files;
      handleFiles(files);
      // 同じファイルを再度選択できるようにするため値をクリア
      fileInput.value = "";
    });
  }

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
