// modal-changelog.js — サポ箱TOP 更新履歴モーダル
(function () {
  var existing = document.getElementById("modalChangelog");
  if (existing) return;

  var modal = document.createElement("div");
  modal.id = "modalChangelog";
  modal.className = "modal fade";
  modal.tabIndex = -1;
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-labelledby", "modalChangelogLabel");

  modal.innerHTML = `
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">

      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="modalChangelogLabel">更新履歴（サポ箱TOP）</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>

      <div class="modal-body">
        <p class="small">
          サポ箱TOPページに関する更新履歴です。
        </p>
        <hr>

        <dl class="small mb-0">

          <dt class="fw-bold">2026-01-01</dt>
          <dd>
            ツール一覧カードに「ダウンロード」ボタンを追加。<br>
            各ツールを ZIP 形式で取得し、ローカル環境でも利用できるように対応。
          </dd>

          <dt class="fw-bold mt-3">2025-12-14</dt>
          <dd>
            T007 2次元QRコード生成ツールを追加。
          </dd>

          <dt class="fw-bold mt-3">2025-12-上旬</dt>
          <dd>
            T006 ファイル暗号化／復号化ツールを追加。
          </dd>

          <dt class="fw-bold mt-3">2025-11-30</dt>
          <dd>
            T000 テンプレートを基準としてサポ箱TOPページを全面リニューアル。<br>
            ・TOPバー／コンテンツ／フッターを分離構成に統一<br>
            ・ツール一覧をカードスタイルに再整理<br>
            ・モーダルUIを統一
          </dd>

          <dt class="fw-bold mt-3">2025-11-24</dt>
          <dd>
            Excel / CSV ビューアツール（T005）を一覧に追加。
          </dd>

          <dt class="fw-bold mt-3">2025-11-20</dt>
          <dd>
            仮デザイン構築、基本ナビ／構造の整理。
          </dd>

          <dt class="fw-bold mt-3">2025-11-01</dt>
          <dd>
            サポ箱プロジェクト構造整理、青系テーマ確立。
          </dd>

          <dt class="fw-bold mt-3">その他</dt>
          <dd class="text-muted">
            微調整・内部改善など多数（記載省略）。
          </dd>

        </dl>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">
          閉じる
        </button>
      </div>

    </div>
  </div>
  `;

  document.body.appendChild(modal);
})();
