// data/sc-excel.js
// Excel ショートカット定義（実利用に耐えられる充実版）
(() => {
  const appId = "excel";
  const appLabel = "Excel";

  const shortcuts = [
    // --- ファイル / ブック ---
    { type: "chord", keys: ["Ctrl", "N"], name: "新しいブック", desc: "新しいブックを作成する" },
    { type: "chord", keys: ["Ctrl", "O"], name: "開く", desc: "ブックを開く" },
    { type: "chord", keys: ["Ctrl", "S"], name: "保存", desc: "ブックを保存する" },
    { type: "chord", keys: ["F12"], name: "名前を付けて保存", desc: "「名前を付けて保存」ダイアログを開く" },
    { type: "chord", keys: ["Ctrl", "P"], name: "印刷", desc: "印刷画面を開く" },
    { type: "chord", keys: ["Ctrl", "W"], name: "ブックを閉じる", desc: "現在のブックを閉じる" },
    { type: "chord", keys: ["Ctrl", "F4"], name: "ブックを閉じる", desc: "現在のブックを閉じる（別キー）" },
    { type: "chord", keys: ["Alt", "F4"], name: "Excelを終了", desc: "Excelを終了する" },
    { type: "chord", keys: ["Ctrl", "F6"], name: "リボン/ブック間の移動", desc: "リボンとブック内容の間を移動する" },

    // --- 基本編集 ---
    { type: "chord", keys: ["Ctrl", "Z"], name: "元に戻す", desc: "直前の操作を取り消す" },
    { type: "chord", keys: ["Ctrl", "Y"], name: "やり直し", desc: "取り消した操作をやり直す" },
    { type: "chord", keys: ["Ctrl", "C"], name: "コピー", desc: "選択範囲をコピーする" },
    { type: "chord", keys: ["Ctrl", "X"], name: "切り取り", desc: "選択範囲を切り取る" },
    { type: "chord", keys: ["Ctrl", "V"], name: "貼り付け", desc: "クリップボードの内容を貼り付ける" },
    { type: "chord", keys: ["Ctrl", "Alt", "V"], name: "形式を選択して貼り付け", desc: "「形式を選択して貼り付け」ダイアログを開く" },
    { type: "chord", keys: ["Shift", "Ctrl", "V"], name: "書式を貼り付け", desc: "書式のみ貼り付け（貼り付けオプションに従う）" },
    { type: "chord", keys: ["Ctrl", "D"], name: "下方向へコピー（フィル）", desc: "上のセルの内容を下へコピーする" },
    { type: "chord", keys: ["Ctrl", "R"], name: "右方向へコピー（フィル）", desc: "左のセルの内容を右へコピーする" },
    { type: "chord", keys: ["Ctrl", "E"], name: "フラッシュ フィル", desc: "パターンに従って入力内容を自動補完する" },
    { type: "chord", keys: ["F2"], name: "セル編集", desc: "アクティブセルを編集する（カーソルを末尾へ）" },
    { type: "chord", keys: ["Alt", "Enter"], name: "セル内改行", desc: "同じセル内で改行する" },

    // --- 日付/時刻/表示 ---
    { type: "chord", keys: ["Ctrl", ";"], name: "今日の日付を入力", desc: "現在の日付を入力する" },
    { type: "chord", keys: ["Ctrl", "Shift", ":"], name: "現在時刻を入力", desc: "現在の時刻を入力する" },
    { type: "chord", keys: ["Ctrl", "`"], name: "数式表示の切替", desc: "セルの値と数式の表示を切り替える" },

    // --- 検索/移動 ---
    { type: "chord", keys: ["Ctrl", "F"], name: "検索", desc: "検索ダイアログを開く" },
    { type: "chord", keys: ["Ctrl", "H"], name: "置換", desc: "置換ダイアログを開く" },
    { type: "chord", keys: ["F5"], name: "ジャンプ（移動）", desc: "「ジャンプ」ダイアログを開く" },
    { type: "chord", keys: ["Ctrl", "G"], name: "ジャンプ（移動）", desc: "「ジャンプ」ダイアログを開く（別キー）" },

    // --- 選択 ---
    { type: "chord", keys: ["Ctrl", "A"], name: "すべて選択", desc: "ワークシート全体（または現在領域）を選択する" },
    { type: "chord", keys: ["Ctrl", "Shift", "Space"], name: "すべて選択", desc: "ワークシート全体を選択する（別キー）" },
    { type: "chord", keys: ["Ctrl", "Space"], name: "列全体を選択", desc: "列全体を選択する" },
    { type: "chord", keys: ["Shift", "Space"], name: "行全体を選択", desc: "行全体を選択する" },
    { type: "chord", keys: ["Ctrl", "Shift", "*"], name: "現在領域を選択", desc: "アクティブセル周辺の現在領域を選択する" },
    { type: "chord", keys: ["Shift", "↑"], name: "選択範囲を上へ拡張", desc: "選択範囲を1セルずつ上に拡張する" },
    { type: "chord", keys: ["Shift", "↓"], name: "選択範囲を下へ拡張", desc: "選択範囲を1セルずつ下に拡張する" },
    { type: "chord", keys: ["Shift", "←"], name: "選択範囲を左へ拡張", desc: "選択範囲を1セルずつ左に拡張する" },
    { type: "chord", keys: ["Shift", "→"], name: "選択範囲を右へ拡張", desc: "選択範囲を1セルずつ右に拡張する" },
    { type: "chord", keys: ["Ctrl", "Shift", "↑"], name: "上端まで選択拡張", desc: "同じ列の空白以外の最後のセルまで選択を拡張する" },
    { type: "chord", keys: ["Ctrl", "Shift", "↓"], name: "下端まで選択拡張", desc: "同じ列の空白以外の最後のセルまで選択を拡張する" },
    { type: "chord", keys: ["Ctrl", "Shift", "←"], name: "左端まで選択拡張", desc: "同じ行の空白以外の最後のセルまで選択を拡張する" },
    { type: "chord", keys: ["Ctrl", "Shift", "→"], name: "右端まで選択拡張", desc: "同じ行の空白以外の最後のセルまで選択を拡張する" },
    { type: "chord", keys: ["Ctrl", "Shift", "End"], name: "最後の使用セルまで選択拡張", desc: "選択範囲をシート内で使用されている最後のセルまで広げる" },
    { type: "chord", keys: ["Ctrl", "Shift", "Home"], name: "先頭セルまで選択拡張", desc: "選択範囲をシート内の最初のセルまで広げる" },
    { type: "chord", keys: ["F8"], name: "拡張選択モード", desc: "拡張選択モードをオン/オフする" },
    { type: "chord", keys: ["Shift", "F8"], name: "追加選択モード", desc: "隣接しないセル/範囲を追加選択する" },
    { type: "chord", keys: ["Ctrl", "."], name: "選択範囲の四隅へ移動", desc: "選択範囲内でアクティブセルの四隅を回転させる" },
    { type: "chord", keys: ["Ctrl", "Alt", "→"], name: "次の選択範囲へ", desc: "次の選択範囲に移動する" },
    { type: "chord", keys: ["Ctrl", "Alt", "←"], name: "前の選択範囲へ", desc: "前の選択範囲に移動する" },

    // --- 移動/スクロール ---
    { type: "chord", keys: ["Ctrl", "Home"], name: "A1へ移動", desc: "セル A1 に移動する" },
    { type: "chord", keys: ["Ctrl", "End"], name: "最終セルへ移動", desc: "使用中の範囲の最後のセルへ移動する" },
    { type: "chord", keys: ["PageUp"], name: "上へスクロール", desc: "1画面分上へ移動する" },
    { type: "chord", keys: ["PageDown"], name: "下へスクロール", desc: "1画面分下へ移動する" },
    { type: "chord", keys: ["Ctrl", "←"], name: "左端へ移動", desc: "現在のデータ範囲の端へ移動する（左）" },
    { type: "chord", keys: ["Ctrl", "→"], name: "右端へ移動", desc: "現在のデータ範囲の端へ移動する（右）" },
    { type: "chord", keys: ["Ctrl", "↑"], name: "上端へ移動", desc: "現在のデータ範囲の端へ移動する（上）" },
    { type: "chord", keys: ["Ctrl", "↓"], name: "下端へ移動", desc: "現在のデータ範囲の端へ移動する（下）" },

    // --- シート操作 ---
    { type: "chord", keys: ["Ctrl", "PageDown"], name: "次のシート", desc: "次のワークシートに切り替える" },
    { type: "chord", keys: ["Ctrl", "PageUp"], name: "前のシート", desc: "前のワークシートに切り替える" },
    { type: "chord", keys: ["Ctrl", "Shift", "PageDown"], name: "シートを複数選択（次）", desc: "現在のシートと次のシートを選択する" },
    { type: "chord", keys: ["Ctrl", "Shift", "PageUp"], name: "シートを複数選択（前）", desc: "現在のシートと前のシートを選択する" },
    { type: "chord", keys: ["Shift", "F11"], name: "新しいシート", desc: "新しいワークシートを挿入する" },

    // --- 行/列/セル操作 ---
    { type: "chord", keys: ["Ctrl", "+"], name: "挿入", desc: "セル/行/列を挿入する" },
    { type: "chord", keys: ["Ctrl", "-"], name: "削除", desc: "セル/行/列を削除する" },
    { type: "chord", keys: ["Ctrl", "9"], name: "行を非表示", desc: "選択行を非表示にする" },
    { type: "chord", keys: ["Ctrl", "Shift", "9"], name: "行を再表示", desc: "非表示の行を再表示する" },
    { type: "chord", keys: ["Ctrl", "0"], name: "列を非表示", desc: "選択列を非表示にする" },
    { type: "chord", keys: ["Ctrl", "Shift", "0"], name: "列を再表示", desc: "非表示の列を再表示する" },

    // --- 罫線/書式 ---
    { type: "chord", keys: ["Ctrl", "1"], name: "セルの書式設定", desc: "「セルの書式設定」ダイアログを開く" },
    { type: "chord", keys: ["Ctrl", "B"], name: "太字", desc: "太字の設定を適用/解除する" },
    { type: "chord", keys: ["Ctrl", "I"], name: "斜体", desc: "斜体の設定を適用/解除する" },
    { type: "chord", keys: ["Ctrl", "U"], name: "下線", desc: "下線の設定を適用/解除する" },
    { type: "chord", keys: ["Ctrl", "5"], name: "取り消し線", desc: "取り消し線の設定を適用/解除する" },
    { type: "chord", keys: ["Ctrl", "Shift", "F"], name: "フォント書式（セルの書式設定）", desc: "「セルの書式設定」でフォントの書式を設定する" },
    { type: "chord", keys: ["Ctrl", "Shift", "P"], name: "フォント書式（セルの書式設定）", desc: "「セルの書式設定」でフォントの書式を設定する（別キー）" },
    { type: "chord", keys: ["Ctrl", "Shift", "U"], name: "数式バーの展開/折りたたみ", desc: "数式バーを展開/折りたたみする" },

    // --- 数値書式（日本語Microsoftサポート準拠の表記） ---
    { type: "chord", keys: ["Ctrl", "Shift", "1"], name: "標準書式", desc: "標準の表示形式を適用する" },
    { type: "chord", keys: ["Ctrl", "Shift", "2"], name: "時刻書式", desc: "時刻の表示形式を適用する" },
    { type: "chord", keys: ["Ctrl", "Shift", "3"], name: "日付書式", desc: "日付の表示形式を適用する" },
    { type: "chord", keys: ["Ctrl", "Shift", "4"], name: "通貨書式", desc: "通貨の表示形式を適用する" },
    { type: "chord", keys: ["Ctrl", "Shift", "5"], name: "パーセンテージ書式", desc: "パーセンテージの表示形式を適用する" },
    { type: "chord", keys: ["Ctrl", "Shift", "6"], name: "科学書式", desc: "科学（指数）の表示形式を適用する" },
    { type: "chord", keys: ["Ctrl", "Shift", "7"], name: "外枠", desc: "外枠を適用する" },
    { type: "chord", keys: ["Ctrl", "Shift", "&"], name: "外枠罫線", desc: "選択範囲に外枠罫線を適用する" },

    // --- テーブル / 分析 ---
    { type: "chord", keys: ["Ctrl", "T"], name: "テーブルを作成", desc: "「テーブルの作成」ダイアログを表示する" },
    { type: "chord", keys: ["Ctrl", "L"], name: "テーブルを作成", desc: "「テーブルの作成」ダイアログを表示する（別キー）" },
    { type: "chord", keys: ["Ctrl", "Q"], name: "クイック分析", desc: "クイック分析オプションを表示する" },

    // --- データ / フィルタ ---
    { type: "chord", keys: ["Ctrl", "Shift", "L"], name: "フィルターの切替", desc: "フィルターのオン/オフを切り替える（よく使う）" },
    { type: "chord", keys: ["Alt", "↓"], name: "メニューを開く/ドリルダウン", desc: "メニューを開く、またはドリルダウンする（フィルタのドロップダウン等）" },
    { type: "chord", keys: ["Alt", "↑"], name: "メニューを閉じる/ドリルアップ", desc: "メニューを閉じる、またはドリルアップする" },

    // --- 便利操作 ---
    { type: "chord", keys: ["Ctrl", "K"], name: "ハイパーリンク", desc: "ハイパーリンクの挿入/編集ダイアログを開く" },
    { type: "chord", keys: ["Ctrl", "Enter"], name: "ハイパーリンクを開く/一括入力", desc: "セルがハイパーリンクの場合は開く。通常は選択範囲へ同じ値を入力する" },
    { type: "chord", keys: ["Ctrl", "'"], name: "上のセルの数式をコピー", desc: "上のセルの数式をコピーして入力する" },
    { type: "chord", keys: ["Ctrl", "\""], name: "上のセルの値をコピー", desc: "上のセルの値をコピーして入力する" },

    // --- グラフ ---
    { type: "chord", keys: ["F11"], name: "グラフシート作成", desc: "選択範囲からグラフシートを作成する" },
    { type: "chord", keys: ["Alt", "F1"], name: "グラフ作成（同一シート）", desc: "選択範囲から同じシートにグラフを作成する" },

    // --- 数式 ---
    { type: "chord", keys: ["Alt", "="], name: "オートSUM", desc: "合計（SUM）を自動挿入する" },
    { type: "chord", keys: ["Shift", "F3"], name: "関数の挿入", desc: "「関数の挿入」ダイアログを開く" },
    { type: "chord", keys: ["F4"], name: "参照の切替 / 最後の操作を繰り返し", desc: "数式編集中は参照の $ を切替。通常は最後の操作を繰り返す" },
    { type: "chord", keys: ["F9"], name: "再計算", desc: "再計算を実行する" },
    { type: "chord", keys: ["Shift", "F9"], name: "シート再計算", desc: "アクティブシートのみ再計算する" },
    { type: "chord", keys: ["Ctrl", "Alt", "F9"], name: "全ブック強制再計算", desc: "すべての開いているブックを強制再計算する" },
    { type: "chord", keys: ["Ctrl", "Alt", "Shift", "F9"], name: "依存関係の再構築→再計算", desc: "依存関係を再確認してから全再計算する" },

    // --- 表示 / アウトライン ---
    { type: "chord", keys: ["Ctrl", "6"], name: "オブジェクト表示の切替", desc: "オブジェクトの表示/非表示を切り替える" },
    { type: "chord", keys: ["Ctrl", "8"], name: "アウトライン記号の表示切替", desc: "アウトライン記号の表示/非表示を切り替える" },

    // --- 名前定義 / マクロ ---
    { type: "chord", keys: ["F3"], name: "名前の貼り付け", desc: "定義済みの名前を貼り付ける" },
    { type: "chord", keys: ["Ctrl", "F3"], name: "名前の管理", desc: "名前の管理を開く" },
    { type: "chord", keys: ["Alt", "F8"], name: "マクロ", desc: "マクロダイアログを開く" },
    { type: "chord", keys: ["Alt", "F11"], name: "VBAエディター", desc: "Visual Basic Editor を開く" },

    // --- コメント / メモ ---
    { type: "chord", keys: ["Shift", "F2"], name: "メモを挿入/編集", desc: "セルのメモを挿入、または開いて編集する" },
    { type: "chord", keys: ["Ctrl", "Shift", "F2"], name: "スレッドコメント", desc: "スレッド形式のコメントを挿入/開いて返信する" },

    // --- 校閲 ---
    { type: "chord", keys: ["F7"], name: "スペルチェック", desc: "作業中シートまたは選択範囲のスペルをチェックする" }
  ];

  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];
  window.SC_SHORTCUT_DATASETS.push({ appId, appLabel, shortcuts });
})();
