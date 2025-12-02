// modal-howto.js — 使い方モーダル（T005 CSV 文字コード判定＆変換ツール）
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（例：使い方：T001 和暦↔西暦チェッカー）
//  2) 手順リストの本文（各ツールの実際の操作手順）
//
//  ※ 基本構造（モーダルサイズ／閉じるボタン等）は共通テンプレとしてこのまま利用してください。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：各ツール名を含めた形に書き換えてください -->
        <!-- 例）使い方：T001 和暦↔西暦チェッカー -->
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：T005 CSV 文字コード判定＆変換ツール</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <!-- ★操作手順：各ツール固有の手順に書き換えてください -->
        <ol class="list-group list-group-numbered">
          <li class="list-group-item">
            <span class="fw-bold d-block mb-1">ツールの目的</span>
            <span class="small text-muted">
              Salesforce / ServiceNow / Amazon Connect などから出力された CSV ファイルの
              <strong>文字コード（UTF-8 / UTF-8(BOM) / Shift_JIS）を判定</strong>し、
              必要に応じて <strong>UTF-8（BOMあり/なし）や Shift_JIS へ変換</strong>するためのツールです。
              すべての処理はブラウザ内で完結し、ファイルは外部サーバーへ送信されません。
            </span>
          </li>

          <li class="list-group-item">
            <span class="fw-bold d-block mb-1">Step 1：CSV ファイルを読み込む</span>
            <ul class="small mb-0 ps-3">
              <li>画面左側の「Step 1 ファイルを読み込む」カードの中にある、枠線付きのエリアが D&amp;D 用のドロップゾーンです。</li>
              <li>PC の場合：判定したい CSV ファイルを <strong>ドラッグ＆ドロップ</strong>するか、下の「ファイル選択」から複数ファイルをまとめて選択できます。</li>
              <li>スマホやタブレットの場合：D&amp;D が使えないことがあるため、<strong>ファイル選択ボタン</strong>の利用を推奨します。</li>
              <li>CSV 以外のファイル（Excelブックや画像など）を読み込んだ場合は、「テキストとして読み取れませんでした」と表示されます。</li>
            </ul>
          </li>

          <li class="list-group-item">
            <span class="fw-bold d-block mb-1">Step 2：判定結果を確認する</span>
            <ul class="small mb-0 ps-3">
              <li>読み込んだファイルは右側の「判定結果と変換ダウンロード」テーブルに 1 行ずつ追加されます。</li>
              <li><strong>判定結果</strong> には「UTF-8（BOMなし）」「UTF-8（BOMあり）」「Shift_JIS（推定）」「判定不能（テキスト）」「非テキスト」などが表示されます。</li>
              <li><strong>行数 / 列数</strong> には、CSV として読み取れた場合の概算の行数・列数が表示されます（簡易判定のため、厳密値とは異なる場合があります）。</li>
              <li>非テキストと判定されたファイルは変換対象外となり、「変換対象外」と表示されます。</li>
            </ul>
          </li>

          <li class="list-group-item">
            <span class="fw-bold d-block mb-1">Step 3：目的の文字コードに変換してダウンロード</span>
            <ul class="small mb-0 ps-3">
              <li>テキストとして読み取れたファイルには、行末に <strong>変換ボタン</strong> が表示されます。</li>
              <li>文字コードが特定できた場合（Aパターン）は、
                <strong>「UTF-8（BOMなし）」</strong> / <strong>「UTF-8（BOMあり）」</strong> / <strong>「Shift_JIS」</strong>
                の 3 種類のボタンが表示されます。
              </li>
              <li>文字コードを 1 つに絞れなかった場合（Cパターン）は、
                <strong>「UTF-8として試す」</strong> / <strong>「Shift_JISとして試す」</strong>
                のボタンが表示されます。
              </li>
              <li>ボタンを押すと、元ファイル名の先頭に <code>UTF8_</code> / <code>UTF8BOM_</code> / <code>SJIS_</code> などのプレフィックスを付けた CSV ファイルがダウンロードされます。</li>
            </ul>
          </li>

          <li class="list-group-item">
            <span class="fw-bold d-block mb-1">ご利用上の注意</span>
            <ul class="small mb-0 ps-3">
              <li>判定ロジックは簡易的なものであり、すべてのファイルに対して 100％ 正確な判定・変換を保証するものではありません。</li>
              <li>特に Shift_JIS 変換については、ブラウザ標準機能のみでは対応できないため、必要に応じて外部ライブラリ（encoding-japanese 等）を併用してください。</li>
              <li>重要なファイルで利用する際は、必ず元データのバックアップを取得し、変換後の内容を目視で確認してください。</li>
            </ul>
          </li>
        </ol>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">閉じる</button>
      </div>
    </div>
  </div>
</div>
`;
  document.body.appendChild(wrapper.firstElementChild);
})();
