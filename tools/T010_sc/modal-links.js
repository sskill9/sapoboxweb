// modal-links.js — リンクモーダル
//
// 【このファイルで主に書き換えるポイント】
//  1) モーダルタイトル（必要ならツール名を付加）
//  2) 各リンク項目のタイトルとURL
//
//  ※ サポ箱TOPへのリンクは共通として残しておくことを推奨します。

(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <!-- ★タイトル：必要に応じてツール名を含めてください -->
        <!-- 例）リンク：T001 和暦↔西暦チェッカー -->
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク：ショートカット検索ツール（T010）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- サポ箱TOPページ（共通リンク） -->
          <li class="list-group-item">
            <span class="fw-bold">サポ箱TOPページ</span><br>
            <a href="../../index.html" target="_blank" rel="noopener">Support Tool Box（サポ箱）</a>
          </li>

          <!-- ★アプリ別：公式ショートカットページへのリンク -->
          <li class="list-group-item">
            <span class="fw-bold">Win11（Windows 11）</span><br>
            <a href="https://support.microsoft.com/ja-jp/windows/windows-%E3%81%AE%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89-%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88-dcc61a57-8ff0-cffe-9796-cb9706c75eec"
               target="_blank" rel="noopener">
              Windows のキーボード ショートカット – Microsoft サポート
            </a>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">Chrome</span><br>
            <a href="https://support.google.com/chrome/answer/157179?hl=ja"
               target="_blank" rel="noopener">
              Chrome のキーボード ショートカット – Google サポート
            </a>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">Edge</span><br>
            <a href="https://support.microsoft.com/ja-jp/microsoft-edge/microsoft-edge-%E3%81%AE%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89-%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88-50d3edab-30d9-c7e4-21ce-37fe2713cfad"
               target="_blank" rel="noopener">
              Microsoft Edge のキーボード ショートカット – Microsoft サポート
            </a>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">Excel</span><br>
            <a href="https://support.microsoft.com/ja-jp/office/excel-%E3%81%AE%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89-%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88-1798d9d5-842a-42b8-9c99-9b7213f0040f"
               target="_blank" rel="noopener">
              Excel のキーボード ショートカット – Microsoft サポート
            </a>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">Outlook（new）</span><br>
            <a href="https://support.microsoft.com/ja-jp/office/outlook-%E3%81%AE%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89-%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88-3cdeb221-7ae5-4c1d-8c1d-9e63216c1efd"
               target="_blank" rel="noopener">
              Outlook のキーボード ショートカット（新しい Outlook を含む） – Microsoft サポート
            </a>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">Outlook（クラシック）</span><br>
            <a href="https://support.microsoft.com/ja-jp/office/outlook-%E3%81%AE%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89-%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88-3cdeb221-7ae5-4c1d-8c1d-9e63216c1efd"
               target="_blank" rel="noopener">
              Outlook のキーボード ショートカット（デスクトップ版） – Microsoft サポート
            </a>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">PowerPoint</span><br>
            <a href="https://support.microsoft.com/ja-jp/office/%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89-%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6-powerpoint-%E3%83%97%E3%83%AC%E3%82%BC%E3%83%B3%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B-ebb3d20e-dcd4-444f-a38e-bb5c5ed180f4"
               target="_blank" rel="noopener">
              キーボード ショートカットを使用して PowerPoint プレゼンテーションを作成する – Microsoft サポート
            </a>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">Teams</span><br>
            <a href="https://support.microsoft.com/ja-jp/office/microsoft-teams-%E3%81%A7%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88-%E3%82%AD%E3%83%BC-2e8e2a70-e8d8-4a19-949b-4c36dd5292d2"
               target="_blank" rel="noopener">
              Microsoft Teams で使用するショートカット キー – Microsoft サポート
            </a>
          </li>

          <li class="list-group-item">
            <span class="fw-bold">Word</span><br>
            <a href="https://support.microsoft.com/ja-jp/office/word-%E3%81%AE%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89-%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88-95ef89dd-7142-4b50-afb2-f762f663ceb2"
               target="_blank" rel="noopener">
              Word のキーボード ショートカット – Microsoft サポート
            </a>
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
