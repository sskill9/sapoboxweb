// modal-howto.js — 使い方モーダル（T004 簡易OCR）
//
// このファイルでは、T004 簡易OCR の操作手順をモーダルで表示します。
// <ol class="list-group-numbered"> が自動で番号を振るため、
// 各ステップ見出しのテキスト内には「1.」「2.」などの番号は書きません。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：T004 簡易OCR</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">
        <p class="small text-muted">
          このモーダルでは、「T004 簡易OCR」の基本的な使い方をステップ形式で説明します。
          画面キャプチャやスキャン画像から、日本語テキストを簡単に取り出すことを想定しています。
        </p>

        <hr>

        <h3 class="h6">基本的な流れ</h3>
        <ol class="list-group list-group-numbered mb-4">
          <li class="list-group-item">
            <span class="fw-bold">T004 簡易OCR のページを開きます</span><br>
            ブラウザで「T004 簡易OCR」ページを開きます。ナビバーに「使い方」「リンク」「更新履歴」ボタンが表示されていれば準備完了です。
          </li>

          <li class="list-group-item">
            <span class="fw-bold">画像を用意します</span><br>
            OCRしたいテキストが含まれる画像を用意します。<br>
            ・画面キャプチャ（スクリーンショット）<br>
            ・スキャン画像（PNG／JPG など）<br>
            いずれも利用できますが、文字が小さすぎたりボケていると認識精度が低下します。
          </li>

          <li class="list-group-item">
            <span class="fw-bold">画像ファイルを読み込むか、クリップボードから貼り付けます</span><br>
            画面左側の「STEP1」ブロックで、次のどちらかを実行します。<br>
            ・「① 画像ファイルを選択」ボタンから、ファイル選択ダイアログで画像を選択<br>
            ・「② クリップボードから貼り付け」ボタンで、クリップボードの画像を読み込み<br>
            読み込みに成功すると、下部のプレビュー領域に画像が表示され、「OCR解析を実行できます」と表示されます。
          </li>

          <li class="list-group-item">
            <span class="fw-bold">OCR解析を実行します</span><br>
            「STEP2」ブロックの <span class="badge bg-success">OCR解析を実行</span> ボタンをクリックします。<br>
            進行中はステータス欄に「OCR解析中… 〇〇％」という表示が出ます。<br>
            画像サイズやPC性能によっては数秒〜十数秒程度かかる場合があります。
          </li>

          <li class="list-group-item">
            <span class="fw-bold">結果を確認し、必要に応じて手動修正します</span><br>
            OCRが完了すると、「STEP3」ブロックのテキストエリアに結果が表示されます。<br>
            このツールでは、自動的に次の加工を行います。<br>
            ・一文字ごとに入る半角スペースの削除<br>
            ・①〜㊿ などの丸数字を通常の数字（1〜50）に変換<br>
            誤認識や不要な改行がある場合は、テキストエリア上で直接修正してください。
          </li>

          <li class="list-group-item">
            <span class="fw-bold">テキストをコピーして他ツールに貼り付けます</span><br>
            「全選択」ボタンを押すと、テキストエリア内の文字列がすべて選択されます。<br>
            「コピー」ボタンを押すと、クリップボードへのコピーを試みます。<br>
            コピーに失敗した場合は、選択状態のまま Ctrl + C などで手動コピーしてください。<br>
            コピーしたテキストは、チャットツールやメール、ナレッジ登録フォームなど、お好きな場所へ貼り付けて利用できます。
          </li>
        </ol>

        <h3 class="h6">運用上のヒント</h3>
        <ul class="small mb-0">
          <li>読み取りたい部分だけをトリミングしてからOCRすると、余計な文字が減り精度が上がります。</li>
          <li>背景が白〜薄色で、文字がはっきりしている画像ほど認識しやすくなります。</li>
          <li>個人情報や機密情報を含む画像を扱う場合は、社内ルールに従って取り扱いに注意してください。</li>
        </ul>
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
