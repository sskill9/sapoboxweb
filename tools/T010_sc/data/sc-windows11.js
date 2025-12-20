// data/sc-windows11.js
// Windows11 ショートカット定義（CORS回避のため JS で保持）

(function () {
  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "Windows11",
    appLabel: "Windows11",
    shortcuts: [
      { type: "chord", keys: ["Win", "D"], name: "デスクトップを表示/非表示", desc: "開いているウィンドウを最小化してデスクトップを表示（トグル）" },
      { type: "chord", keys: ["Win", "L"], name: "PCをロック", desc: "画面をロックしてサインイン画面へ" },
      { type: "chord", keys: ["Win", "E"], name: "エクスプローラーを開く", desc: "ファイルエクスプローラーを起動" },
      { type: "chord", keys: ["Win", "I"], name: "設定を開く", desc: "Windowsの設定を起動" },
      { type: "chord", keys: ["Win", "S"], name: "検索を開く", desc: "検索（Search）を開く" },
      { type: "chord", keys: ["Win", "R"], name: "ファイル名を指定して実行", desc: "Runダイアログを開く" },
      { type: "chord", keys: ["Win", "X"], name: "クイックリンクメニュー", desc: "システム/管理系のメニューを表示" },
      { type: "chord", keys: ["Win", "Tab"], name: "タスクビュー", desc: "タスクビュー（仮想デスクトップ含む）を表示" },
      { type: "chord", keys: ["Alt", "Tab"], name: "アプリ切り替え", desc: "起動中アプリを切り替え" },
      { type: "chord", keys: ["Ctrl", "Shift", "Esc"], name: "タスクマネージャー", desc: "タスクマネージャーを起動" },

      { type: "chord", keys: ["Win", "Shift", "S"], name: "画面の切り取り", desc: "画面切り取り（Snipping Tool）を起動して領域選択" },
      { type: "chord", keys: ["PrtScn"], name: "スクリーンショット（コピー）", desc: "画面全体をクリップボードにコピー（設定により動作が変わる場合あり）" },
      { type: "chord", keys: ["Win", "PrtScn"], name: "スクリーンショット保存", desc: "画像として保存（ピクチャ>スクリーンショット等）" },
      { type: "chord", keys: ["Alt", "PrtScn"], name: "アクティブウィンドウ撮影", desc: "アクティブウィンドウをクリップボードにコピー" },

      { type: "chord", keys: ["Win", "V"], name: "クリップボード履歴", desc: "クリップボード履歴を表示（初回は有効化が必要な場合あり）" },
      { type: "chord", keys: ["Win", "."], name: "絵文字/記号パネル", desc: "絵文字・顔文字・記号入力パネル" },

      { type: "chord", keys: ["Win", "A"], name: "クイック設定", desc: "Wi-Fi/音量/明るさなどのクイック設定" },
      { type: "chord", keys: ["Win", "N"], name: "通知センター/カレンダー", desc: "通知センター（環境により表示が変わる場合あり）" },
      { type: "chord", keys: ["Win", "W"], name: "ウィジェット", desc: "ウィジェットを表示" },

      { type: "chord", keys: ["Win", "K"], name: "接続（キャスト）", desc: "ワイヤレスディスプレイ/オーディオ接続" },
      { type: "chord", keys: ["Win", "P"], name: "投影", desc: "表示モード（複製/拡張など）を切り替え" },

      { type: "chord", keys: ["Win", "Ctrl", "D"], name: "仮想デスクトップ新規作成", desc: "新しい仮想デスクトップを作成" },
      { type: "chord", keys: ["Win", "Ctrl", "Left"], name: "仮想デスクトップ切替（左）", desc: "左の仮想デスクトップへ" },
      { type: "chord", keys: ["Win", "Ctrl", "Right"], name: "仮想デスクトップ切替（右）", desc: "右の仮想デスクトップへ" },
      { type: "chord", keys: ["Win", "Ctrl", "F4"], name: "仮想デスクトップを閉じる", desc: "現在の仮想デスクトップを閉じる" },

      { type: "chord", keys: ["Win", "Left"], name: "ウィンドウを左にスナップ", desc: "ウィンドウを左半分へ整列" },
      { type: "chord", keys: ["Win", "Right"], name: "ウィンドウを右にスナップ", desc: "ウィンドウを右半分へ整列" },
      { type: "chord", keys: ["Win", "Up"], name: "最大化/上へスナップ", desc: "最大化（または上方向の配置）" },
      { type: "chord", keys: ["Win", "Down"], name: "最小化/元に戻す", desc: "元に戻す→最小化（環境により挙動が異なる場合あり）" },

      { type: "chord", keys: ["Ctrl", "C"], name: "コピー", desc: "選択中の内容をコピー" },
      { type: "chord", keys: ["Ctrl", "X"], name: "切り取り", desc: "選択中の内容を切り取り" },
      { type: "chord", keys: ["Ctrl", "V"], name: "貼り付け", desc: "コピー/切り取りした内容を貼り付け" },
      { type: "chord", keys: ["Ctrl", "Z"], name: "元に戻す", desc: "直前の操作を元に戻す" },
      { type: "chord", keys: ["Ctrl", "Y"], name: "やり直し", desc: "元に戻した操作をやり直す" },
      { type: "chord", keys: ["Ctrl", "A"], name: "すべて選択", desc: "全選択" },
      { type: "chord", keys: ["Ctrl", "F"], name: "検索", desc: "検索（アプリ内検索）" },

      { type: "chord", keys: ["Alt", "F4"], name: "ウィンドウを閉じる", desc: "現在のアプリ/ウィンドウを閉じる" },
      { type: "chord", keys: ["Win", "M"], name: "すべて最小化", desc: "すべてのウィンドウを最小化" },
      { type: "chord", keys: ["Win", "Shift", "M"], name: "最小化を元に戻す", desc: "最小化したウィンドウを元に戻す" }
    ]
  });
})();
