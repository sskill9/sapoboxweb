// data/sc-word.js
// Word ショートカット定義（充実版・Windows向け）
//
// CORS回避のため JS で保持します。
// 形式：window.SC_SHORTCUT_DATASETS.push({ appId, appLabel, shortcuts:[...] })
//
// ※ type は現状 "chord" のみで統一
// ※ keys は表示用（例：Ctrl+Shift+V）＆検索用（キーワード検索・キー選択フィルタ）
// ※ 一部のキー（[ ] / . / / / + / - など）は環境や配列によって表記が異なる場合があります。

(function () {
  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "Word",
    appLabel: "Word",
    shortcuts: [
      { type: "chord", keys: ["Ctrl", "N"], name: "新規文書", desc: "新しい文書を作成する" },
      { type: "chord", keys: ["Ctrl", "O"], name: "開く", desc: "既存の文書を開く" },
      { type: "chord", keys: ["Ctrl", "S"], name: "保存", desc: "現在の文書を保存する" },
      { type: "chord", keys: ["F12"], name: "名前を付けて保存", desc: "「名前を付けて保存」を開く" },
      { type: "chord", keys: ["Ctrl", "P"], name: "印刷", desc: "印刷画面を開く" },
      { type: "chord", keys: ["Ctrl", "W"], name: "文書を閉じる", desc: "現在の文書を閉じる" },
      { type: "chord", keys: ["Alt", "F4"], name: "Wordを終了", desc: "アプリケーションを終了する" },

      { type: "chord", keys: ["Ctrl", "Z"], name: "元に戻す", desc: "直前の操作を元に戻す" },
      { type: "chord", keys: ["Ctrl", "Y"], name: "やり直し", desc: "元に戻した操作をやり直す" },
      { type: "chord", keys: ["Ctrl", "X"], name: "切り取り", desc: "選択した内容を切り取る" },
      { type: "chord", keys: ["Ctrl", "C"], name: "コピー", desc: "選択した内容をコピーする" },
      { type: "chord", keys: ["Ctrl", "V"], name: "貼り付け", desc: "クリップボードの内容を貼り付ける" },
      { type: "chord", keys: ["Ctrl", "Shift", "V"], name: "テキストのみ貼り付け", desc: "書式を除去して貼り付ける（環境により挙動が異なる場合あり）" },

      { type: "chord", keys: ["Ctrl", "A"], name: "すべて選択", desc: "文書内のすべての内容を選択する" },
      { type: "chord", keys: ["Ctrl", "F"], name: "検索", desc: "検索（ナビゲーション）を開く" },
      { type: "chord", keys: ["Ctrl", "H"], name: "置換", desc: "検索と置換を開く" },
      { type: "chord", keys: ["Ctrl", "G"], name: "ジャンプ（移動）", desc: "指定位置へ移動（ジャンプ）" },
      { type: "chord", keys: ["Ctrl", "K"], name: "ハイパーリンク挿入", desc: "リンクを挿入する" },

      { type: "chord", keys: ["Ctrl", "B"], name: "太字", desc: "選択テキストを太字にする（トグル）" },
      { type: "chord", keys: ["Ctrl", "I"], name: "斜体", desc: "選択テキストを斜体にする（トグル）" },
      { type: "chord", keys: ["Ctrl", "U"], name: "下線", desc: "選択テキストに下線を付ける（トグル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "W"], name: "単語のみ下線", desc: "スペースを除き単語に下線を付ける（トグル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "D"], name: "二重下線", desc: "二重下線を付ける（トグル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "K"], name: "スモールキャップ", desc: "小型英大文字（Small Caps）を適用（トグル）" },

      { type: "chord", keys: ["Ctrl", "D"], name: "フォント", desc: "フォント（文字書式）ダイアログを開く" },
      { type: "chord", keys: ["Ctrl", "Shift", ">"], name: "フォント拡大", desc: "フォントサイズを大きくする" },
      { type: "chord", keys: ["Ctrl", "Shift", "<"], name: "フォント縮小", desc: "フォントサイズを小さくする" },
      { type: "chord", keys: ["Ctrl", "["], name: "フォントサイズ-1", desc: "フォントサイズを 1pt 小さくする" },
      { type: "chord", keys: ["Ctrl", "]"], name: "フォントサイズ+1", desc: "フォントサイズを 1pt 大きくする" },

      { type: "chord", keys: ["Ctrl", "L"], name: "左揃え", desc: "段落を左揃えにする" },
      { type: "chord", keys: ["Ctrl", "E"], name: "中央揃え", desc: "段落を中央揃えにする" },
      { type: "chord", keys: ["Ctrl", "R"], name: "右揃え", desc: "段落を右揃えにする" },
      { type: "chord", keys: ["Ctrl", "J"], name: "両端揃え", desc: "段落を両端揃えにする" },

      { type: "chord", keys: ["Ctrl", "M"], name: "インデント増", desc: "段落の左インデントを増やす" },
      { type: "chord", keys: ["Ctrl", "Shift", "M"], name: "インデント減", desc: "段落の左インデントを減らす" },
      { type: "chord", keys: ["Ctrl", "T"], name: "ぶら下げインデント増", desc: "ぶら下げインデントを増やす" },
      { type: "chord", keys: ["Ctrl", "Shift", "T"], name: "ぶら下げインデント減", desc: "ぶら下げインデントを減らす" },

      { type: "chord", keys: ["Ctrl", "Q"], name: "段落書式の解除", desc: "段落の直接書式を解除する" },
      { type: "chord", keys: ["Ctrl", "Space"], name: "文字書式の解除", desc: "文字の直接書式を解除する" },

      { type: "chord", keys: ["Ctrl", "Shift", "C"], name: "書式のコピー", desc: "文字/段落の書式をコピーする" },
      { type: "chord", keys: ["Ctrl", "Shift", "V"], name: "書式の貼り付け", desc: "コピーした書式を貼り付ける" },

      { type: "chord", keys: ["Ctrl", "Shift", "8"], name: "編集記号の表示切替", desc: "改行記号などの非表示文字を表示/非表示（トグル）" },

      { type: "chord", keys: ["Ctrl", "Shift", "L"], name: "箇条書き（簡易）", desc: "箇条書き（バレット）を適用（環境により挙動が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "."], name: "箇条書き", desc: "箇条書きを作成する（環境により挙動が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "/"], name: "段落番号（番号付きリスト）", desc: "番号付きリストを作成する（環境により挙動が異なる場合あり）" },

      { type: "chord", keys: ["Ctrl", "Enter"], name: "改ページ", desc: "ページ区切りを挿入する" },
      { type: "chord", keys: ["Shift", "Enter"], name: "改行（行区切り）", desc: "行区切りを挿入する" },
      { type: "chord", keys: ["Ctrl", "Shift", "Space"], name: "改行しないスペース", desc: "改行しないスペース（ノーブレークスペース）を挿入する" },

      { type: "chord", keys: ["Shift", "F3"], name: "大/小文字切替", desc: "英字の大文字/小文字/先頭大文字を切り替える" },
      { type: "chord", keys: ["Ctrl", "Shift", "A"], name: "すべて大文字", desc: "英字をすべて大文字にする（トグル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "Q"], name: "Symbolフォント", desc: "選択テキストを Symbol フォントに切り替える" },

      { type: "chord", keys: ["Ctrl", "Shift", "+"], name: "上付き", desc: "上付き文字を適用（トグル）" },
      { type: "chord", keys: ["Ctrl", "Shift", "-"], name: "下付き", desc: "下付き文字を適用（トグル）" },

      { type: "chord", keys: ["Ctrl", "+"], name: "ズームイン", desc: "表示を拡大する" },
      { type: "chord", keys: ["Ctrl", "-"], name: "ズームアウト", desc: "表示を縮小する" },

      { type: "chord", keys: ["F7"], name: "スペルチェック", desc: "スペル/文章校正を開始する" },
      { type: "chord", keys: ["Shift", "F7"], name: "類義語（シソーラス）", desc: "類義語辞典（シソーラス）を表示する" },
      { type: "chord", keys: ["Alt", "F7"], name: "次のミスへ移動", desc: "次のスペル/文法エラーへ移動する" },

      { type: "chord", keys: ["Ctrl", "Shift", "E"], name: "変更履歴の記録", desc: "変更履歴（Track Changes）をオン/オフ（トグル）" },
      { type: "chord", keys: ["Ctrl", "Alt", "M"], name: "コメントを挿入", desc: "コメントを挿入する" },

      { type: "chord", keys: ["Ctrl", "F2"], name: "印刷プレビュー", desc: "印刷プレビューを表示する" },

      { type: "chord", keys: ["F1"], name: "ヘルプ", desc: "ヘルプを開く" },
      { type: "chord", keys: ["Shift", "F1"], name: "書式の表示", desc: "「書式の表示」タスクウィンドウを開く" },

      { type: "chord", keys: ["Alt", "F9"], name: "フィールドコード表示切替", desc: "フィールドコードの表示/非表示（トグル）" },
      { type: "chord", keys: ["Shift", "F9"], name: "選択フィールドの切替", desc: "選択範囲のフィールドコードを切り替える（トグル）" },
      { type: "chord", keys: ["F9"], name: "フィールド更新", desc: "選択したフィールドを更新する" },

      { type: "chord", keys: ["Ctrl", "Home"], name: "文書の先頭へ", desc: "カーソルを文書の先頭へ移動する" },
      { type: "chord", keys: ["Ctrl", "End"], name: "文書の末尾へ", desc: "カーソルを文書の末尾へ移動する" },
      { type: "chord", keys: ["Home"], name: "行頭へ", desc: "カーソルを行頭へ移動する" },
      { type: "chord", keys: ["End"], name: "行末へ", desc: "カーソルを行末へ移動する" },
      { type: "chord", keys: ["Ctrl", "←"], name: "1語左へ", desc: "カーソルを1語左へ移動する" },
      { type: "chord", keys: ["Ctrl", "→"], name: "1語右へ", desc: "カーソルを1語右へ移動する" },
      { type: "chord", keys: ["Ctrl", "↑"], name: "前の段落へ", desc: "カーソルを前の段落へ移動する" },
      { type: "chord", keys: ["Ctrl", "↓"], name: "次の段落へ", desc: "カーソルを次の段落へ移動する" },

      { type: "chord", keys: ["Shift", "←"], name: "左へ選択拡張", desc: "選択範囲を左へ拡張する" },
      { type: "chord", keys: ["Shift", "→"], name: "右へ選択拡張", desc: "選択範囲を右へ拡張する" },
      { type: "chord", keys: ["Shift", "↑"], name: "上へ選択拡張", desc: "選択範囲を上へ拡張する" },
      { type: "chord", keys: ["Shift", "↓"], name: "下へ選択拡張", desc: "選択範囲を下へ拡張する" },
      { type: "chord", keys: ["Ctrl", "Shift", "←"], name: "1語左まで選択", desc: "選択範囲を1語左まで拡張する" },
      { type: "chord", keys: ["Ctrl", "Shift", "→"], name: "1語右まで選択", desc: "選択範囲を1語右まで拡張する" },
      { type: "chord", keys: ["Shift", "Home"], name: "行頭まで選択", desc: "行頭まで選択範囲を拡張する" },
      { type: "chord", keys: ["Shift", "End"], name: "行末まで選択", desc: "行末まで選択範囲を拡張する" },
      { type: "chord", keys: ["Ctrl", "Shift", "Home"], name: "文書先頭まで選択", desc: "文書の先頭まで選択範囲を拡張する" },
      { type: "chord", keys: ["Ctrl", "Shift", "End"], name: "文書末尾まで選択", desc: "文書の末尾まで選択範囲を拡張する" },

      { type: "chord", keys: ["Ctrl", "Alt", "1"], name: "見出し1", desc: "見出し1スタイルを適用する" },
      { type: "chord", keys: ["Ctrl", "Alt", "2"], name: "見出し2", desc: "見出し2スタイルを適用する" },
      { type: "chord", keys: ["Ctrl", "Alt", "3"], name: "見出し3", desc: "見出し3スタイルを適用する" },

      { type: "chord", keys: ["Ctrl", "Shift", "S"], name: "スタイルの適用", desc: "スタイルの適用ボックスを開く" },
      { type: "chord", keys: ["Ctrl", "Alt", "Shift", "S"], name: "スタイルウィンドウ", desc: "スタイルの作業ウィンドウを表示する" },

      { type: "chord", keys: ["Alt", "Shift", "D"], name: "日付を挿入", desc: "日付を挿入する" },
      { type: "chord", keys: ["Alt", "Shift", "T"], name: "時刻を挿入", desc: "時刻を挿入する" },

      { type: "chord", keys: ["Ctrl", "Alt", "F"], name: "脚注を挿入", desc: "脚注を挿入する" },
      { type: "chord", keys: ["Ctrl", "Alt", "D"], name: "文末脚注を挿入", desc: "文末脚注（エンドノート）を挿入する" },

      { type: "chord", keys: ["Tab"], name: "次のセル/インデント", desc: "（表内）次のセルへ移動 / （段落）インデントや次のタブ位置へ" },
      { type: "chord", keys: ["Shift", "Tab"], name: "前のセル", desc: "（表内）前のセルへ移動" },

      { type: "chord", keys: ["Alt", "Home"], name: "（表）行の先頭セルへ", desc: "表内で行の先頭セルへ移動する" },
      { type: "chord", keys: ["Alt", "End"], name: "（表）行の末尾セルへ", desc: "表内で行の末尾セルへ移動する" },
      { type: "chord", keys: ["Alt", "PageUp"], name: "（表）列の先頭セルへ", desc: "表内で列の先頭セルへ移動する" },
      { type: "chord", keys: ["Alt", "PageDown"], name: "（表）列の末尾セルへ", desc: "表内で列の末尾セルへ移動する" }
    ]
  });
})();
