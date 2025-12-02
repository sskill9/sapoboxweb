// modal-changelog.js — 更新履歴モーダル（T003 ハンコジェネレータ用）

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalChangelog" tabindex="-1" aria-labelledby="modalChangelogLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalChangelogLabel">更新履歴：T003 ハンコジェネレータ</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">
        <p class="small text-muted mb-3">
          T003 ハンコジェネレータの主な更新履歴です。仕様変更や不具合修正の概要を記録しています。
        </p>

        <ul class="list-group mb-3">

          <!-- 旧スタンドアロン版のメモ（必要なければ削除可） -->
          <li class="list-group-item">
            <div class="d-flex justify-content-between">
              <span class="fw-bold">2025-xx-xx v0.9.0</span>
              <span class="badge bg-secondary-subtle text-muted">スタンドアロン版</span>
            </div>
            <div class="small text-muted mt-1">
              単一 HTML ファイル（hanko08.html）としてハンコ生成機能を実装。<br>
              苗字を 1〜4 文字で入力し、電子印鑑 PNG をダウンロードできる基本機能を公開。
            </div>
          </li>

          <!-- サポ箱テンプレへの正式移行 -->
          <li class="list-group-item">
            <div class="d-flex justify-content-between">
              <span class="fw-bold">2025-11-30 v1.0.0</span>
              <span class="badge bg-primary-subtle text-primary">Support Tool Box 対応</span>
            </div>
            <div class="small text-muted mt-1">
              Support Tool Box（サポ箱）の T003 として正式公開。<br>
              ・サポ箱共通の TOP バー／フッター／モーダル構成に対応。<br>
              ・ツール本体を <code>tool.js</code> に分離し、ローカル配布しやすい構成に整理。<br>
              ・苗字入力を 1〜4 文字にガードし、5文字以上入力された場合は先頭 4 文字のみを利用する仕様に変更。<br>
              ・「使い方」「リンク」「更新履歴」モーダルを T003 向け文面に更新。
            </div>
          </li>

          <!-- 今後のアップデート記載欄（ユーザー向け文言のみ） -->
          <li class="list-group-item">
            <div class="d-flex justify-content-between">
              <span class="fw-bold">今後のアップデート</span>
              <span class="badge bg-warning text-dark">予定</span>
            </div>
            <div class="small text-muted mt-1">
              機能追加やレイアウトの調整など、今後のアップデート内容は決まり次第ここに追記します。
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
