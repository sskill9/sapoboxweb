// modal-links.js — リンク集モーダル（T005 CSV 文字コード判定＆変換ツール）
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（例：関連リンク：T001 和暦↔西暦チェッカー）
//  2) リンク一覧（公式ドキュメントや関連ナレッジなど）
//
//  ※ 外部サイトへのリンクには target="_blank" と rel="noopener noreferrer" を付与してください。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル -->
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">関連リンク：T005 CSV 文字コード判定＆変換ツール</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <!-- ★リンク一覧 -->
        <ul class="list-group small">
          <li class="list-group-item">
            <span class="fw-bold d-block mb-1">Support Tool Box（サポ箱）TOP</span>
            <a href="../../index.html" target="_blank" rel="noopener noreferrer">
              サポ箱のトップページを開く
            </a>
          </li>
          <li class="list-group-item">
            <span class="fw-bold d-block mb-1">このツールの仕様書（ローカルファイル）</span>
            <span class="text-muted d-block">
              開発メモとして、同一フォルダ内に <code>csv_tool_spec.md</code> を配置している場合は、
              エディタ等で直接開いて参照してください。
            </span>
          </li>
          <li class="list-group-item">
            <span class="fw-bold d-block mb-1">文字コードと CSV 取り扱いの注意点</span>
            <span class="text-muted d-block">
              Excel での文字化け防止や、UTF-8 / Shift_JIS の違いなど、
              社内ナレッジやマニュアルがある場合はここにリンクを追加してください。
            </span>
          </li>
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
