// data/sc-windows11.js
// Windows 11 ショートカット定義（CORS回避のため JS で保持）

(function () {
  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "Windows11",
    appLabel: "Windows11",
    shortcuts: [
      { type: "chord", keys: ["Win", "D"], name: "デスクトップ表示/復元", desc: "すべてのウィンドウを最小化してデスクトップ表示、もう一度で元に戻す" },
      { type: "chord", keys: ["Win", "E"], name: "エクスプローラー起動", desc: "ファイルエクスプローラーを開く" },
      { type: "chord", keys: ["Win", "I"], name: "設定を開く", desc: "Windowsの設定を開く" },
      { type: "chord", keys: ["Win", "A"], name: "クイック設定", desc: "クイック設定（Wi-Fi/音量など）を開く" },
      { type: "chord", keys: ["Win", "N"], name: "通知センター", desc: "通知センターとカレンダーを開く" },
      { type: "chord", keys: ["Win", "S"], name: "検索", desc: "検索を開く" },
      { type: "chord", keys: ["Win", "R"], name: "ファイル名を指定して実行", desc: "Runダイアログを開く" },
      { type: "chord", keys: ["Win", "L"], name: "ロック", desc: "PCをロックしてサインイン画面へ" },
      { type: "chord", keys: ["Win", "Tab"], name: "タスクビュー", desc: "タスクビュー（仮想デスクトップ/ウィンドウ一覧）を開く" },

      { type: "chord", keys: ["Win", "Ctrl", "D"], name: "仮想デスクトップ新規作成", desc: "新しい仮想デスクトップを作成" },
      { type: "chord", keys: ["Win", "Ctrl", "Left"], name: "仮想デスクトップ切替（左）", desc: "左の仮想デスクトップへ切り替え" },
      { type: "chord", keys: ["Win", "Ctrl", "Right"], name: "仮想デスクトップ切替（右）", desc: "右の仮想デスクトップへ切り替え" },
      { type: "chord", keys: ["Win", "Ctrl", "F4"], name: "仮想デスクトップを閉じる", desc: "現在の仮想デスクトップを閉じる" },

      { type: "chord", keys: ["Alt", "Tab"], name: "ウィンドウ切替", desc: "開いているウィンドウを切り替え" },
      { type: "chord", keys: ["Alt", "F4"], name: "ウィンドウを閉じる", desc: "アクティブウィンドウを閉じる（デスクトップのみならシャットダウン確認）" },
      { type: "chord", keys: ["Ctrl", "Shift", "Esc"], name: "タスクマネージャー", desc: "タスクマネージャーを直接開く" },

      { type: "chord", keys: ["Win", "Shift", "S"], name: "切り取り＆スケッチ", desc: "画面の範囲を選択してスクリーンショット（クリップボードにコピー）" },
      { type: "chord", keys: ["PrtScn"], name: "スクリーンショット（全画面）", desc: "全画面をキャプチャ（設定によりSnipping Tool起動の場合あり）" },
      { type: "chord", keys: ["Win", "PrtScn"], name: "スクショ保存（全画面）", desc: "全画面をキャプチャしてファイル保存" },
      { type: "chord", keys: ["Alt", "PrtScn"], name: "スクショ（アクティブウィンドウ）", desc: "アクティブウィンドウをキャプチャしてクリップボードへ" },

      { type: "chord", keys: ["Win", "V"], name: "クリップボード履歴", desc: "クリップボード履歴を開く（初回は有効化が必要）" },
      { type: "chord", keys: ["Win", "."], name: "絵文字パネル", desc: "絵文字/記号/顔文字パネルを開く" },

      { type: "chord", keys: ["Win", "Left"], name: "左にスナップ", desc: "ウィンドウを左にスナップ" },
      { type: "chord", keys: ["Win", "Right"], name: "右にスナップ", desc: "ウィンドウを右にスナップ" },
      { type: "chord", keys: ["Win", "Up"], name: "最大化", desc: "ウィンドウを最大化" },
      { type: "chord", keys: ["Win", "Down"], name: "最小化/元に戻す", desc: "ウィンドウを最小化、またはスナップ状態から元に戻す" },

      { type: "chord", keys: ["Ctrl", "C"], name: "コピー", desc: "選択した内容をコピー" },
      { type: "chord", keys: ["Ctrl", "V"], name: "貼り付け", desc: "コピーした内容を貼り付け" },
      { type: "chord", keys: ["Ctrl", "X"], name: "切り取り", desc: "選択した内容を切り取り" },
      { type: "chord", keys: ["Ctrl", "Z"], name: "元に戻す", desc: "直前の操作を元に戻す" },
      { type: "chord", keys: ["Ctrl", "Y"], name: "やり直し", desc: "元に戻した操作をやり直す" },

      { type: "chord", keys: ["Win", "M"], name: "すべて最小化", desc: "すべてのウィンドウを最小化" },
      { type: "chord", keys: ["Win", "Shift", "M"], name: "最小化を元に戻す", desc: "最小化したウィンドウを元に戻す" },

      // ===== 追加：公式ショートカットから拡充（Windows 11） =====
      { type: "chord", keys: ["Win", "Z"], name: "スナップ レイアウト", desc: "スナップ レイアウトを開く（分割配置の候補を表示）" },
      { type: "chord", keys: ["Win", "Home"], name: "他のウィンドウを最小化/復元", desc: "アクティブ以外のウィンドウを最小化/復元（トグル）" },
      { type: "chord", keys: ["Win", ","], name: "デスクトップを一時表示", desc: "押している間だけデスクトップを表示（離すと元に戻る）" },
      { type: "chord", keys: ["Win", "Shift", "Left"], name: "左モニターへ移動", desc: "アクティブウィンドウを左のモニターへ移動" },
      { type: "chord", keys: ["Win", "Shift", "Right"], name: "右モニターへ移動", desc: "アクティブウィンドウを右のモニターへ移動" },
      { type: "chord", keys: ["Win", "Shift", "Up"], name: "縦方向に最大化", desc: "ウィンドウを画面の上端/下端まで伸ばす（縦方向最大化）" },
      { type: "chord", keys: ["Win", "Shift", "Down"], name: "最大化/スナップ解除", desc: "最大化/スナップ状態のウィンドウを元に戻す" },
      { type: "chord", keys: ["Win", "Alt", "Down"], name: "下半分にスナップ", desc: "アクティブウィンドウを画面下半分へスナップ" },
      { type: "chord", keys: ["Alt", "Space"], name: "ウィンドウメニュー", desc: "アクティブウィンドウのショートカットメニューを開く" },

      { type: "chord", keys: ["Win", "B"], name: "通知領域へフォーカス", desc: "タスクバー通知領域（トレイ）の最初のアイコンへフォーカス" },
      { type: "chord", keys: ["Win", "T"], name: "タスクバーを巡回", desc: "タスクバー上のアプリを順に選択" },
      { type: "chord", keys: ["Win", "1"], name: "タスクバー：1番目を起動/切替", desc: "タスクバーにピン留めした1番目のアプリを起動（起動済みなら切替）" },
      { type: "chord", keys: ["Win", "2"], name: "タスクバー：2番目を起動/切替", desc: "タスクバーにピン留めした2番目のアプリを起動（起動済みなら切替）" },
      { type: "chord", keys: ["Win", "3"], name: "タスクバー：3番目を起動/切替", desc: "タスクバーにピン留めした3番目のアプリを起動（起動済みなら切替）" },
      { type: "chord", keys: ["Win", "4"], name: "タスクバー：4番目を起動/切替", desc: "タスクバーにピン留めした4番目のアプリを起動（起動済みなら切替）" },
      { type: "chord", keys: ["Win", "5"], name: "タスクバー：5番目を起動/切替", desc: "タスクバーにピン留めした5番目のアプリを起動（起動済みなら切替）" },
      { type: "chord", keys: ["Win", "6"], name: "タスクバー：6番目を起動/切替", desc: "タスクバーにピン留めした6番目のアプリを起動（起動済みなら切替）" },
      { type: "chord", keys: ["Win", "7"], name: "タスクバー：7番目を起動/切替", desc: "タスクバーにピン留めした7番目のアプリを起動（起動済みなら切替）" },
      { type: "chord", keys: ["Win", "8"], name: "タスクバー：8番目を起動/切替", desc: "タスクバーにピン留めした8番目のアプリを起動（起動済みなら切替）" },
      { type: "chord", keys: ["Win", "9"], name: "タスクバー：9番目を起動/切替", desc: "タスクバーにピン留めした9番目のアプリを起動（起動済みなら切替）" },
      { type: "chord", keys: ["Win", "Shift", "1"], name: "タスクバー：新しいインスタンス（1）", desc: "1番目のアプリの新しいインスタンスを起動" },
      { type: "chord", keys: ["Win", "Shift", "2"], name: "タスクバー：新しいインスタンス（2）", desc: "2番目のアプリの新しいインスタンスを起動" },
      { type: "chord", keys: ["Win", "Shift", "3"], name: "タスクバー：新しいインスタンス（3）", desc: "3番目のアプリの新しいインスタンスを起動" },
      { type: "chord", keys: ["Win", "Shift", "4"], name: "タスクバー：新しいインスタンス（4）", desc: "4番目のアプリの新しいインスタンスを起動" },
      { type: "chord", keys: ["Win", "Shift", "5"], name: "タスクバー：新しいインスタンス（5）", desc: "5番目のアプリの新しいインスタンスを起動" },
      { type: "chord", keys: ["Win", "Shift", "6"], name: "タスクバー：新しいインスタンス（6）", desc: "6番目のアプリの新しいインスタンスを起動" },
      { type: "chord", keys: ["Win", "Shift", "7"], name: "タスクバー：新しいインスタンス（7）", desc: "7番目のアプリの新しいインスタンスを起動" },
      { type: "chord", keys: ["Win", "Shift", "8"], name: "タスクバー：新しいインスタンス（8）", desc: "8番目のアプリの新しいインスタンスを起動" },
      { type: "chord", keys: ["Win", "Shift", "9"], name: "タスクバー：新しいインスタンス（9）", desc: "9番目のアプリの新しいインスタンスを起動" },

      { type: "chord", keys: ["Win", "Alt", "D"], name: "日付/時刻の表示切替", desc: "デスクトップの日付と時刻の表示/非表示を切り替え" },
      { type: "chord", keys: ["Win", "Ctrl", "Q"], name: "クイック アシスト", desc: "Quick Assist を開く（画面共有サポート）" },
      { type: "chord", keys: ["Win", "Ctrl", "V"], name: "サウンド出力/音量ミキサー", desc: "クイック設定のサウンド出力ページ（出力デバイス/空間サウンド/音量ミキサー等）を開く" },
      { type: "chord", keys: ["Win", "Ctrl", "Shift", "B"], name: "黒画面から復帰", desc: "画面が真っ黒/表示が出ないときに復帰を試す（デバイスを起こす）" },

      { type: "chord", keys: ["Win", "Shift", "R"], name: "画面録画（領域）", desc: "録画する領域を選択して画面録画（Snipping Tool）" },
      { type: "chord", keys: ["Win", "Shift", "V"], name: "通知を巡回", desc: "通知を順に切り替え" },

      { type: "chord", keys: ["Win", "H"], name: "音声入力", desc: "音声入力（音声ディクテーション）を開く" },
      { type: "chord", keys: ["Win", "O"], name: "画面の回転ロック", desc: "デバイスの向きをロック（タブレット等）" },
      { type: "chord", keys: ["Win", "Pause"], name: "PC情報（About）", desc: "設定 > システム > バージョン情報（About）を開く" },
      { type: "chord", keys: ["Win", "F"], name: "フィードバック ハブ", desc: "Feedback Hub を開く" },
      { type: "chord", keys: ["Win", "G"], name: "ゲームバー", desc: "Game Bar を開く（画面録画など）" },

      { type: "chord", keys: ["Win", "Space"], name: "入力言語/キーボード切替", desc: "入力言語とキーボード レイアウトを順に切り替え" },
      { type: "chord", keys: ["Win", "Shift", "Space"], name: "入力言語/キーボード切替（逆順）", desc: "入力言語とキーボード レイアウトを逆順に切り替え" },
      { type: "chord", keys: ["Win", "Ctrl", "Space"], name: "以前の入力へ戻す", desc: "以前に選択した入力オプションへ戻す" },
      { type: "chord", keys: ["Win", "/"], name: "IME 再変換", desc: "IMEの再変換を開始（環境により動作が変わる場合あり）" },

      { type: "chord", keys: ["Win", "U"], name: "アクセシビリティ設定", desc: "設定 > アクセシビリティ を開く" },
      { type: "chord", keys: ["Win", "Ctrl", "Enter"], name: "ナレーターのオン/オフ", desc: "ナレーターを起動/終了" },
      { type: "chord", keys: ["Win", "Ctrl", "O"], name: "スクリーン キーボード", desc: "オンスクリーン キーボードを開く/閉じる" },
      { type: "chord", keys: ["Win", "Ctrl", "C"], name: "カラーフィルター切替", desc: "カラーフィルターをオン/オフ（有効化している場合）" },
      { type: "chord", keys: ["Win", "Ctrl", "N"], name: "ナレーター設定", desc: "ナレーター設定を開く" },
      { type: "chord", keys: ["Win", "Ctrl", "S"], name: "音声認識", desc: "Windows 音声認識を開く" },

      { type: "chord", keys: ["Win", "+"], name: "拡大鏡（拡大）", desc: "拡大鏡を開いて拡大" },
      { type: "chord", keys: ["Win", "-"], name: "拡大鏡（縮小）", desc: "拡大鏡を縮小" },
      { type: "chord", keys: ["Win", "Esc"], name: "拡大鏡を閉じる", desc: "拡大鏡を終了" },

      { type: "chord", keys: ["Ctrl", "Esc"], name: "スタートを開く", desc: "スタートメニューを開く（Winキー相当）" },

      { type: "chord", keys: ["F2"], name: "名前の変更", desc: "選択した項目の名前を変更" },
      { type: "chord", keys: ["F5"], name: "更新", desc: "アクティブウィンドウを更新" },
      { type: "chord", keys: ["Ctrl", "Shift", "N"], name: "新しいフォルダー", desc: "新しいフォルダーを作成" },
      { type: "chord", keys: ["Alt", "Left"], name: "戻る", desc: "前の場所へ戻る" },
      { type: "chord", keys: ["Alt", "Right"], name: "進む", desc: "次の場所へ進む" },
      { type: "chord", keys: ["Alt", "D"], name: "アドレスバー", desc: "アドレスバーを選択" },

      { type: "chord", keys: ["Ctrl", "Shift", "V"], name: "プレーンテキストで貼り付け", desc: "書式なし（プレーンテキスト）で貼り付け（対応アプリのみ）" }
    ]
  });
})();
