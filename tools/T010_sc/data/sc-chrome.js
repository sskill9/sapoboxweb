// data/sc-chrome.js
// Google Chrome ショートカット定義（CORS回避のため JS で保持）
//
// 形式：window.SC_SHORTCUT_DATASETS.push({ appId, appLabel, shortcuts:[...] })
//
// ※ type は現状 "chord" のみで統一
// ※ keys は表示用（例：Ctrl+Shift+T）＆検索用

(function () {
  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "Chrome",
    appLabel: "Chrome",
    shortcuts: [
      // --- タブ / ウィンドウ操作 ---
      { type: "chord", keys: ["Ctrl", "N"], name: "新しいウィンドウ", desc: "新しいChromeウィンドウを開く" },
      { type: "chord", keys: ["Ctrl", "Shift", "N"], name: "シークレットウィンドウ", desc: "シークレットモードの新しいウィンドウを開く" },
      { type: "chord", keys: ["Ctrl", "T"], name: "新しいタブ", desc: "新しいタブを開いて切り替える" },
      { type: "chord", keys: ["Ctrl", "Shift", "T"], name: "閉じたタブを復元", desc: "閉じたタブを閉じた順に復元" },

      { type: "chord", keys: ["Ctrl", "Tab"], name: "次のタブ", desc: "右隣のタブへ切り替え" },
      { type: "chord", keys: ["Ctrl", "PgDn"], name: "次のタブ（PgDn）", desc: "右隣のタブへ切り替え" },

      { type: "chord", keys: ["Ctrl", "Shift", "Tab"], name: "前のタブ", desc: "左隣のタブへ切り替え" },
      { type: "chord", keys: ["Ctrl", "PgUp"], name: "前のタブ（PgUp）", desc: "左隣のタブへ切り替え" },

      { type: "chord", keys: ["Ctrl", "1"], name: "タブへ移動（1）", desc: "左から1番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "2"], name: "タブへ移動（2）", desc: "左から2番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "3"], name: "タブへ移動（3）", desc: "左から3番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "4"], name: "タブへ移動（4）", desc: "左から4番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "5"], name: "タブへ移動（5）", desc: "左から5番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "6"], name: "タブへ移動（6）", desc: "左から6番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "7"], name: "タブへ移動（7）", desc: "左から7番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "8"], name: "タブへ移動（8）", desc: "左から8番目のタブへ移動" },
      { type: "chord", keys: ["Ctrl", "9"], name: "最後のタブへ移動", desc: "右端（最後）のタブへ移動" },

      { type: "chord", keys: ["Ctrl", "W"], name: "タブを閉じる", desc: "現在のタブを閉じる" },
      { type: "chord", keys: ["Ctrl", "F4"], name: "タブを閉じる（F4）", desc: "現在のタブを閉じる" },

      { type: "chord", keys: ["Ctrl", "Shift", "W"], name: "ウィンドウを閉じる", desc: "現在のウィンドウを閉じる" },
      { type: "chord", keys: ["Alt", "F4"], name: "ウィンドウを閉じる（Alt+F4）", desc: "現在のウィンドウを閉じる" },

      { type: "chord", keys: ["Ctrl", "Shift", "PgUp"], name: "タブを左へ移動", desc: "タブの並びを左へ移動" },
      { type: "chord", keys: ["Ctrl", "Shift", "PgDn"], name: "タブを右へ移動", desc: "タブの並びを右へ移動" },

      { type: "chord", keys: ["F11"], name: "全画面表示", desc: "全画面表示のON/OFF" },

      // --- ナビゲーション ---
      { type: "chord", keys: ["Alt", "Home"], name: "ホームを開く", desc: "現在のタブでホームページを開く" },
      { type: "chord", keys: ["Alt", "Left"], name: "戻る", desc: "閲覧履歴の1つ前へ戻る" },
      { type: "chord", keys: ["Alt", "Right"], name: "進む", desc: "閲覧履歴の1つ後へ進む" },

      // --- Chrome機能 ---
      { type: "chord", keys: ["Alt", "F"], name: "Chromeメニューを開く", desc: "右上のメニュー（︙）を開く（環境によりAlt+Eも可）" },
      { type: "chord", keys: ["Alt", "E"], name: "Chromeメニューを開く（Alt+E）", desc: "メニューを開く（キーボード配列/環境により有効）" },

      { type: "chord", keys: ["Ctrl", "Shift", "B"], name: "ブックマークバー表示切替", desc: "ブックマークバーを表示/非表示" },
      { type: "chord", keys: ["Ctrl", "Shift", "O"], name: "ブックマークマネージャ", desc: "ブックマークマネージャを開く" },

      { type: "chord", keys: ["Ctrl", "H"], name: "履歴", desc: "履歴を新しいタブで開く" },
      { type: "chord", keys: ["Ctrl", "J"], name: "ダウンロード", desc: "ダウンロードを新しいタブで開く" },

      { type: "chord", keys: ["Shift", "Esc"], name: "Chromeタスクマネージャ", desc: "Chromeのタスクマネージャを開く" },

      { type: "chord", keys: ["Shift", "Alt", "T"], name: "ツールバーにフォーカス", desc: "ツールバーの最初の項目へフォーカス" },
      { type: "chord", keys: ["F10"], name: "ツールバー右端にフォーカス", desc: "ツールバーの右端の項目へフォーカス" },
      { type: "chord", keys: ["F6"], name: "フォーカス循環", desc: "ダイアログ/ツールバー等へフォーカスを切り替え" },

      { type: "chord", keys: ["Ctrl", "F6"], name: "Webコンテンツへ移動", desc: "ページ本文（Webコンテンツ）へフォーカス" },

      { type: "chord", keys: ["Ctrl", "Shift", "Delete"], name: "閲覧データを削除", desc: "閲覧データ削除（Delete Browsing Data）を開く" },

      { type: "chord", keys: ["Ctrl", "Shift", "M"], name: "ゲスト/ユーザー切替", desc: "別ユーザーでログイン、ゲストで閲覧など" },

      { type: "chord", keys: ["Alt", "Shift", "I"], name: "フィードバック送信", desc: "フィードバックフォームを開く" },

      { type: "chord", keys: ["F1"], name: "ヘルプ", desc: "Chromeヘルプセンターを新しいタブで開く" },

      { type: "chord", keys: ["F7"], name: "キャレットブラウズ", desc: "キャレットブラウズ（カーソルでの移動）をON/OFF" },

      { type: "chord", keys: ["Alt", "Shift", "A"], name: "非アクティブダイアログへ", desc: "非アクティブなダイアログへフォーカス（環境依存あり）" },

      { type: "chord", keys: ["Shift", "Alt", "N"], name: "分割表示（Split view）", desc: "アクティブタブの分割表示を開く（環境/機能により非対応の場合あり）" },

      // --- ページ内検索（Find Bar） ---
      { type: "chord", keys: ["Ctrl", "F"], name: "ページ内検索", desc: "ページ内検索バーを開く" },
      { type: "chord", keys: ["F3"], name: "ページ内検索（F3）", desc: "ページ内検索バーを開く（または検索へフォーカス）" },
      { type: "chord", keys: ["Ctrl", "G"], name: "次の一致へ", desc: "ページ内検索の次の一致へ移動" },
      { type: "chord", keys: ["Ctrl", "Shift", "G"], name: "前の一致へ", desc: "ページ内検索の前の一致へ移動" },

      // --- アドレスバー / 検索 ---
      { type: "chord", keys: ["Ctrl", "L"], name: "アドレスバーへ", desc: "アドレスバーへフォーカス（URL選択）" },
      { type: "chord", keys: ["Alt", "D"], name: "アドレスバーへ（Alt+D）", desc: "アドレスバーへフォーカス（URL選択）" },
      { type: "chord", keys: ["F6"], name: "アドレスバーへ（F6）", desc: "フォーカスをアドレスバーへ移す（環境により循環）" },

      { type: "chord", keys: ["Ctrl", "K"], name: "検索（アドレスバー）", desc: "ページのどこからでも検索入力へ（アドレスバー）" },
      { type: "chord", keys: ["Ctrl", "E"], name: "検索（アドレスバー）（Ctrl+E）", desc: "ページのどこからでも検索入力へ（アドレスバー）" },

      { type: "chord", keys: ["Ctrl", "Enter"], name: "www/.com補完", desc: "サイト名に www. と .com を付けて開く（例：google → www.google.com）" },
      { type: "chord", keys: ["Ctrl", "Shift", "Enter"], name: "www/.com補完（新規ウィンドウ）", desc: "サイト名に www. と .com を付けて新規ウィンドウで開く" },

      { type: "chord", keys: ["Shift", "Delete"], name: "候補の削除（予測削除）", desc: "アドレスバー候補を選択して削除（Downで候補選択後に実行）" },

      { type: "chord", keys: ["Ctrl", "F5"], name: "アドレスバーへ（Ctrl+F5）", desc: "カーソルをアドレスバーへ移動" },

      // --- Webページ操作 ---
      { type: "chord", keys: ["Ctrl", "P"], name: "印刷", desc: "現在ページの印刷オプションを開く" },
      { type: "chord", keys: ["Ctrl", "S"], name: "ページ保存", desc: "現在ページの保存オプションを開く" },

      { type: "chord", keys: ["F5"], name: "再読み込み", desc: "ページを再読み込み" },
      { type: "chord", keys: ["Ctrl", "R"], name: "再読み込み（Ctrl+R）", desc: "ページを再読み込み" },

      { type: "chord", keys: ["Shift", "F5"], name: "キャッシュ無視で再読み込み", desc: "キャッシュを無視して再読み込み" },
      { type: "chord", keys: ["Ctrl", "Shift", "R"], name: "キャッシュ無視で再読み込み（Ctrl+Shift+R）", desc: "キャッシュを無視して再読み込み" },

      { type: "chord", keys: ["Esc"], name: "読み込み停止", desc: "ページの読み込みを停止" },

      { type: "chord", keys: ["Ctrl", "O"], name: "ファイルを開く", desc: "PC上のファイルをChromeで開く（その後ファイルを選択）" },
      { type: "chord", keys: ["Ctrl", "U"], name: "ページのソース表示", desc: "現在ページのHTMLソースを表示" },

      { type: "chord", keys: ["Ctrl", "D"], name: "ブックマーク追加", desc: "現在ページをブックマークとして保存" },
      { type: "chord", keys: ["Ctrl", "Shift", "D"], name: "全タブをブックマーク", desc: "開いている全タブを新しいフォルダにブックマーク保存" },

      { type: "chord", keys: ["Ctrl", "+"], name: "ズームイン", desc: "ページ表示を拡大" },
      { type: "chord", keys: ["Ctrl", "-"], name: "ズームアウト", desc: "ページ表示を縮小" },
      { type: "chord", keys: ["Ctrl", "0"], name: "ズームリセット", desc: "ページ表示倍率を100%へ戻す" },

      { type: "chord", keys: ["Home"], name: "ページ先頭へ", desc: "ページの先頭へスクロール" },
      { type: "chord", keys: ["End"], name: "ページ末尾へ", desc: "ページの末尾へスクロール" },

      { type: "chord", keys: ["Tab"], name: "次のクリック要素へ", desc: "クリック可能な要素へ順方向に移動" },
      { type: "chord", keys: ["Shift", "Tab"], name: "前のクリック要素へ", desc: "クリック可能な要素へ逆方向に移動" },

      { type: "chord", keys: ["Space"], name: "1画面下へスクロール", desc: "スペースで1画面分下へ" },
      { type: "chord", keys: ["PgDn"], name: "1画面下へスクロール（PgDn）", desc: "PageDownで1画面分下へ" },

      { type: "chord", keys: ["Shift", "Space"], name: "1画面上へスクロール", desc: "Shift+Spaceで1画面分上へ" },
      { type: "chord", keys: ["PgUp"], name: "1画面上へスクロール（PgUp）", desc: "PageUpで1画面分上へ" },

      { type: "chord", keys: ["Ctrl", "Left"], name: "前の単語へ", desc: "テキスト入力中：カーソルを前の単語の先頭へ移動" },
      { type: "chord", keys: ["Ctrl", "Right"], name: "次の単語へ", desc: "テキスト入力中：カーソルを次の単語へ移動" },
      { type: "chord", keys: ["Ctrl", "Backspace"], name: "前の単語を削除", desc: "テキスト入力中：前の単語を削除" },

      // --- 開発者ツール（DevTools） ---
      { type: "chord", keys: ["F12"], name: "DevToolsを開く（F12）", desc: "開発者ツールを開く（最後に使用したパネル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "I"], name: "DevToolsを開く（Ctrl+Shift+I）", desc: "開発者ツールを開く（最後に使用したパネル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "J"], name: "Consoleを開く", desc: "DevToolsのConsoleパネルを開く" },
      { type: "chord", keys: ["Ctrl", "Shift", "C"], name: "要素を検証", desc: "DevToolsを開いて要素選択（インスペクタ）を開始" }
    ]
  });
})();
