// modal-howto.js — 使い方モーダル
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
        <!-- ★タイトル -->
        <h2 class="modal-title h5 mb-0" id="modalHowtoLabel">使い方：T010 ショートカット検索ツール（コンタクトセンター向け）</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <!-- ★操作手順 -->
        <ol class="list-group list-group-numbered">
          <li class="list-group-item">
            本ツールは、Windows 11／Edge／Chrome／Outlook／Office などの
            キーボードショートカットを横断検索し、
            コンパネ操作・FAQ作成・ナレッジ整備など
            コンタクトセンター業務の効率化を支援することを目的としています。
          </li>

          <li class="list-group-item">
            本ツールはローカル実行に対応しています。  
            「Download」から ZIP を取得し、任意の場所に解凍するだけで
            オフライン環境でもそのまま利用できます。
            特別な設定やインストールは不要です。
          </li>

          <li class="list-group-item">
            画面左側の「キーワード検索」に操作内容を入力します。  
            例：<code>コピー</code>、<code>スクリーンショット</code>、<code>フィルター</code>、<code>ウィンドウを閉じる</code> など。  
            ショートカット名・説明文・キー表記（例：Win+Shift+S）が検索対象になります。
          </li>

          <li class="list-group-item">
            「アプリフィルタ」を使用すると、対象アプリを絞り込めます。  
            何も選択していない場合は全アプリが対象になり、Win11／edge／chrome／Excel／Outlook(new) など、
            すべてのショートカットが検索対象になります。
          </li>

          <li class="list-group-item">
            「ソフトウェアキーボード」上のキー（Win／Ctrl／Alt／Shift／Fキー／矢印キーなど）をクリックすると、
            選択したキーを含むショートカットに限定できます。  
            「キー完全一致」を ON にすると、完全一致するキー構成のみが表示されます。
          </li>

          <li class="list-group-item">
            画面右側にはショートカットキー（例：<code>Win+Shift+S</code>）と
            アプリ名、名称、説明が一覧表示されます。  
            「コピー」を押すとショートカットがクリップボードにコピーされ、
            トースト通知で結果が表示されます。
          </li>

          <li class="list-group-item">
            入力内容をリセットしたい場合は、
            「キー選択をクリア」「アプリ選択をクリア」「すべてクリア」が利用できます。  
            また、画面右下の「↑」ボタンでページ先頭に戻れます。
          </li>

          <li class="list-group-item">
            本ツールのショートカットは、基本的にデスクトップ版（Win11／Officeアプリ等）の動作を元にしています。  
            Web版アプリでは一部挙動が異なる場合がありますのでご注意ください。
          </li>

          <li class="list-group-item">
            最新のショートカット仕様は、必要に応じて「リンク」から公式サイトをご確認ください。  
            Microsoft 側の更新によってキー動作や仕様が変更される場合があります。
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
