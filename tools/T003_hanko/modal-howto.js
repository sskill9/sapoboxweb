// modal-howto.js — 使い方モーダル（T003 ハンコジェネレータ用）
/*
  【このファイルで主に書き換えるポイント】
    1) モーダルタイトル（ツール名を含める）
    2) 手順リストの本文（実際の操作手順）

  ※ 基本構造（モーダルサイズ／閉じるボタン等）は共通テンプレとしてこのまま利用してください。
*/

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalHowto" tabindex="-1" aria-labelledby="modalHowtoLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：ツール名を含めた形 -->
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：T003 ハンコジェネレータ</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">
        <p class="small text-muted mb-3">
          「T003 ハンコジェネレータ」は、入力した苗字から電子印鑑（ハンコ）画像を作成し、
          PNG 形式でダウンロードできるツールです。名札・資料・簡易なスタンプ代わりなど、
          コールセンター内のちょっとした印付けにご利用いただけます。
        </p>

        <h3 class="h6 fw-bold mt-3 mb-2">基本的な使い方</h3>
        <ol class="list-group list-group-numbered mb-4">
          <li class="list-group-item">
            <strong>ツール画面を開く</strong><br>
            Support Tool Box（サポ箱）の TOP から「T003 ハンコジェネレータ」を開きます。
          </li>

          <li class="list-group-item">
            <strong>苗字を 1〜4 文字で入力する</strong><br>
            画面左側の「苗字（1〜4文字）」入力欄に、ハンコにしたい苗字を入力します。<br>
            全角・半角どちらでも利用できますが、4文字までの想定です。
          </li>

          <li class="list-group-item">
            <strong>「ハンコ生成」ボタンをクリックする</strong><br>
            入力欄の下にある <span class="badge bg-primary">ハンコ生成</span> ボタンを押します。<br>
            画面右側のキャンバス内に、赤い丸枠と縦書きの苗字が描かれた電子印鑑が生成されます。<br>
            ※ 5文字以上入力された場合は先頭 4 文字のみを使用します。
          </li>

          <li class="list-group-item">
            <strong>生成されたハンコ画像を確認する</strong><br>
            画面右側のプレビュー（赤い丸の中）で、苗字・文字の位置・バランスなどを確認します。<br>
            問題があれば苗字を修正し、再度「ハンコ生成」ボタンを押すことで上書きできます。
          </li>

          <li class="list-group-item">
            <strong>PNG 画像としてダウンロードする</strong><br>
            プレビューの下にある <span class="badge bg-outline-primary text-primary">PNGとしてダウンロード</span>
            ボタンを押すと、<code>stamp.png</code> というファイル名で画像が保存されます。<br>
            保存先はご利用のブラウザ／OS のダウンロード設定に依存します。
          </li>
        </ol>

        <h3 class="h6 fw-bold mt-3 mb-2">活用例</h3>
        <ul class="small mb-4">
          <li>新人向けマニュアルの「担当者コメント欄」に、担当者ごとのハンコ画像を配置する。</li>
          <li>チーム内共有のチェックシートで、「確認済み」の印として利用する。</li>
          <li>ナレッジや手順書の PDF に、作成者・更新者のハンコを載せて視覚的に分かりやすくする。</li>
        </ul>

        <h3 class="h6 fw-bold mt-3 mb-2">注意事項・制限</h3>
        <ul class="small mb-0">
          <li>本ツールで作成されるハンコ画像は、あくまで <strong>業務内での目印・装飾用途</strong> を想定しています。</li>
          <li>実印・銀行印・公的な書類等の正式な印鑑としての利用はしないでください。</li>
          <li>表示されるフォントは、ご利用端末にインストールされている日本語フォントに依存します。</li>
          <li>4文字を超える苗字は、先頭 4 文字のみ利用されます（例：<code>〇〇〇〇〇</code> → <code>〇〇〇〇</code>）。</li>
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
