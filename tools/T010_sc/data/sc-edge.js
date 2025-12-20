// data/sc-edge.js
// Microsoft Edge ショートカット定義（CORS回避のため JS で保持）
//
// 形式：window.SC_SHORTCUT_DATASETS.push({ appId, appLabel, shortcuts:[...] })
//
// ※ type は現状 "chord" のみで統一
// ※ keys は表示用（例：Ctrl+Shift+T）＆検索用

(function () {
  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "Edge",
    appLabel: "Edge",
    shortcuts: [
      // --- タブ操作 ---
      { type: "chord", keys: ["Ctrl", "T"], name: "新しいタブ", desc: "新しいタブを開いて切り替える" },
      { type: "chord", keys: ["Ctrl", "W"], name: "タブを閉じる", desc: "現在のタブを閉じる" },
      { type: "chord", keys: ["Ctrl", "Shift", "T"], name: "閉じたタブを復元", desc: "直前に閉じたタブを復元して切り替える" },
      { type: "chord", keys: ["Ctrl", "Tab"], name: "次のタブ", desc: "右隣のタブへ切り替え" },
      { type: "chord", keys: ["Ctrl", "Shift", "Tab"], name: "前のタブ", desc: "左隣のタブへ切り替え" },
      { type: "chord", keys: ["Ctrl", "1"], name: "タブへ移動（1）", desc: "左から1番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "2"], name: "タブへ移動（2）", desc: "左から2番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "3"], name: "タブへ移動（3）", desc: "左から3番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "4"], name: "タブへ移動（4）", desc: "左から4番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "5"], name: "タブへ移動（5）", desc: "左から5番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "6"], name: "タブへ移動（6）", desc: "左から6番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "7"], name: "タブへ移動（7）", desc: "左から7番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "8"], name: "タブへ移動（8）", desc: "左から8番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "9"], name: "最後のタブへ移動", desc: "一番右のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "Shift", "A"], name: "タブ操作メニュー（タブ検索）", desc: "タブの検索/操作（環境により挙動が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "PageDown"], name: "次のタブ（PageDown）", desc: "右隣のタブへ切り替え（環境により挙動が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "PageUp"], name: "前のタブ（PageUp）", desc: "左隣のタブへ切り替え（環境により挙動が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "Shift", "W"], name: "ウィンドウを閉じる", desc: "現在のウィンドウを閉じる" },
      { type: "chord", keys: ["Ctrl", "Shift", "K"], name: "タブを複製", desc: "現在のタブを複製して新しいタブとして開く（環境により未対応の場合あり）" },
      { type: "chord", keys: ["Ctrl", "Shift", "D"], name: "すべてのタブをお気に入りに保存", desc: "開いているすべてのタブを新しいフォルダーとしてお気に入りに保存" },

      // --- ウィンドウ操作 ---
      { type: "chord", keys: ["Ctrl", "N"], name: "新しいウィンドウ", desc: "新しい Edge ウィンドウを開く" },
      { type: "chord", keys: ["Ctrl", "Shift", "N"], name: "InPrivate ウィンドウ", desc: "新しい InPrivate ウィンドウを開く" },

      // --- ナビゲーション ---
      { type: "chord", keys: ["Alt", "Left"], name: "戻る", desc: "前のページへ戻る" },
      { type: "chord", keys: ["Alt", "Right"], name: "進む", desc: "次のページへ進む" },
      { type: "chord", keys: ["Alt", "Home"], name: "ホーム", desc: "ホームページへ移動（設定による）" },
      { type: "chord", keys: ["Ctrl", "R"], name: "再読み込み", desc: "現在のページを再読み込み" },
      { type: "chord", keys: ["Ctrl", "Shift", "R"], name: "強制再読み込み", desc: "キャッシュを無視して再読み込み" },
      { type: "chord", keys: ["F5"], name: "再読み込み（F5）", desc: "現在のページを再読み込み" },
      { type: "chord", keys: ["Esc"], name: "読み込み停止", desc: "ページの読み込みを停止する（通信中のときに有効）" },
      { type: "chord", keys: ["Ctrl", "L"], name: "アドレスバーにフォーカス", desc: "URL欄を選択（入力できる状態に）" },
      { type: "chord", keys: ["Alt", "D"], name: "アドレスバーにフォーカス（Alt+D）", desc: "URL欄を選択" },
      { type: "chord", keys: ["F6"], name: "アドレスバー/ページのフォーカス切替", desc: "アドレスバーとコンテンツのフォーカスを切替" },
      { type: "chord", keys: ["Ctrl", "Enter"], name: "www + .com で補完して移動", desc: "アドレスバーの入力に www. と .com を付けて移動（環境により挙動が異なる場合あり）" },
      { type: "chord", keys: ["Alt", "E"], name: "設定など（…）メニュー", desc: "「設定など（…）」メニューを開く" },
      { type: "chord", keys: ["Alt", "F"], name: "設定など（…）メニュー（Alt+F）", desc: "「設定など（…）」メニューを開く" },

      // --- 検索／ページ内検索 ---
      { type: "chord", keys: ["Ctrl", "F"], name: "ページ内検索", desc: "ページ内の文字を検索" },
      { type: "chord", keys: ["Ctrl", "E"], name: "検索（アドレスバー）", desc: "検索語を入力できる状態に（環境により挙動が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "K"], name: "検索（アドレスバー）", desc: "検索語を入力できる状態に（環境により挙動が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "Shift", "L"], name: "貼り付けて検索/移動", desc: "クリップボードを貼り付け、URLなら移動・文字なら検索" },
      { type: "chord", keys: ["Ctrl", "G"], name: "検索結果へ（次）", desc: "ページ内検索の次の一致へ移動" },
      { type: "chord", keys: ["Ctrl", "Shift", "G"], name: "検索結果へ（前）", desc: "ページ内検索の前の一致へ移動" },

      // --- 履歴／ダウンロード／お気に入り ---
      { type: "chord", keys: ["Ctrl", "H"], name: "履歴", desc: "履歴を開く" },
      { type: "chord", keys: ["Ctrl", "J"], name: "ダウンロード", desc: "ダウンロードを開く" },
      { type: "chord", keys: ["Ctrl", "D"], name: "お気に入りに追加", desc: "現在のページをお気に入りに追加" },
      { type: "chord", keys: ["Ctrl", "Shift", "O"], name: "お気に入りを開く", desc: "お気に入り（Favorites）を開く" },
      { type: "chord", keys: ["Ctrl", "Shift", "B"], name: "お気に入りバー表示切替", desc: "お気に入りバーを表示/非表示（トグル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "Y"], name: "コレクション", desc: "コレクション（Collections）を開く" },

      // --- 表示 ---
      { type: "chord", keys: ["Ctrl", "+"], name: "ズームイン", desc: "表示を拡大" },
      { type: "chord", keys: ["Ctrl", "-"], name: "ズームアウト", desc: "表示を縮小" },
      { type: "chord", keys: ["Ctrl", "0"], name: "ズームリセット", desc: "表示倍率を100%に戻す" },
      { type: "chord", keys: ["F11"], name: "全画面表示", desc: "全画面表示の切替（トグル）" },

      // --- 印刷／保存／ソース ---
      { type: "chord", keys: ["Ctrl", "P"], name: "印刷", desc: "現在のページを印刷" },
      { type: "chord", keys: ["Ctrl", "Shift", "P"], name: "システムダイアログで印刷", desc: "OSの印刷ダイアログを使用して印刷" },
      { type: "chord", keys: ["Ctrl", "S"], name: "ページを保存", desc: "現在のページを保存" },
      { type: "chord", keys: ["Ctrl", "U"], name: "ソースを表示", desc: "ページのソースを表示" },
      { type: "chord", keys: ["Ctrl", "O"], name: "ファイルを開く", desc: "PC上のファイルを Edge で開く" },

      // --- クリップボード／入力 ---
      { type: "chord", keys: ["Ctrl", "Shift", "V"], name: "書式なしで貼り付け", desc: "書式を除去してテキストを貼り付ける（対応アプリ/入力欄により挙動が異なる場合あり）" },

      // --- セキュリティ／プライバシー ---
      { type: "chord", keys: ["Ctrl", "Shift", "Delete"], name: "閲覧データのクリア", desc: "キャッシュ/履歴などの「閲覧データのクリア」を開く" },

      // --- 開発者ツール（DevTools） ---
      { type: "chord", keys: ["F12"], name: "DevTools を開く/閉じる（F12）", desc: "開発者ツールを開く/閉じる（トグル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "I"], name: "DevTools を開く", desc: "開発者ツールを開く（最後に使用したパネル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "J"], name: "DevTools（Console）", desc: "開発者ツールをコンソール表示で開く" },
      { type: "chord", keys: ["Ctrl", "Shift", "C"], name: "DevTools（要素を検査）", desc: "要素の検査（Inspect）を開く/切替" },
      { type: "chord", keys: ["Alt", "Shift", "I"], name: "DevTools を開く（Alt+Shift+I）", desc: "開発者ツールを開く（環境により挙動が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "Shift", "M"], name: "DevTools（デバイスエミュレーション）", desc: "デバイスエミュレーション（レスポンシブ）を切り替え（DevToolsにフォーカス時）" },
      { type: "chord", keys: ["Ctrl", "Shift", "P"], name: "DevTools（コマンドメニュー）", desc: "コマンドメニューを開く（DevToolsにフォーカス時）" },
      { type: "chord", keys: ["Ctrl", "Shift", "F"], name: "DevTools（全体検索）", desc: "読み込まれたリソース全体の検索を開く（DevToolsにフォーカス時）" },
      { type: "chord", keys: ["Ctrl", "]"], name: "DevTools（次のパネルへ）", desc: "次のパネルにフォーカス（DevToolsにフォーカス時）" },
      { type: "chord", keys: ["Ctrl", "["], name: "DevTools（前のパネルへ）", desc: "前のパネルにフォーカス（DevToolsにフォーカス時）" },
      { type: "chord", keys: ["F1"], name: "DevTools（設定）", desc: "DevTools の設定を表示（DevToolsにフォーカス時）" },
      { type: "chord", keys: ["Esc"], name: "DevTools（Quick View）", desc: "Quick View パネルを切り替え（DevToolsにフォーカス時）" },

      // --- サイドバー ---
      { type: "chord", keys: ["Ctrl", "Shift", "E"], name: "サイドバー検索", desc: "サイドバーを開く（検索/ Bing サイドバー等。環境により挙動が異なる場合あり）" }
    ]
  });
})();
