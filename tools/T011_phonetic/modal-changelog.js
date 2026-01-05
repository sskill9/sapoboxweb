// modal-changelog.js — 更新履歴モーダル
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（必要に応じてツール名を付加）
//  2) 日付・バージョン・変更内容（各ツールごとに自由に編集）
//
//  ※ 初期状態では「テンプレート公開」の例と、「ここを書き換えてください」の例を入れています。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：必要に応じてツール名を含めてください -->
        <!-- 例）更新履歴：T001 和暦↔西暦チェッカー -->
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴：T011 フォネティックコード表示</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <li class="list-group-item">
            <span class="badge bg-primary me-2">2026/01/01</span>
            v1.0.0 初版公開
            <div class="text-muted small mt-2">
              <ul class="mb-0">
                <li>入力文字列を1文字ずつ分解して表示（空白/タブ/改行は記号で可視化）。</li>
                <li>各文字にツールチップでフォネティック候補（最大3）を表示、クリックで候補カード表示。</li>
                <li>クイック参照をJIS配列寄せ（5段構成・テンキー無し）で表示し、ホバーで候補Tips／クリックで候補表示。</li>
                <li>「一覧を表示」で全キーの最大3候補を一括表示、戻るでクイック参照に復帰。</li>
                <li>「1文字ずつ表示」の表示形状をキーに近い四角寄りへ調整。</li>
              </ul>
            </div>
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
