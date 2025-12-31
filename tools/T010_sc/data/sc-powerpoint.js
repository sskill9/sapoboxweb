// data/sc-powerpoint.js
// Microsoft PowerPoint ショートカット定義（CORS回避のため JS で保持）
//
// 形式：window.SC_SHORTCUT_DATASETS.push({ appId, appLabel, shortcuts:[...] })
// ※ type は現状 "chord" のみで統一
// ※ keys は表示用（例：Ctrl+Shift+T）＆検索用

(function () {
  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "PowerPoint",
    appLabel: "PowerPoint",
    shortcuts: [
      // ===== 基本操作 =====
      { type: "chord", keys: ["Ctrl", "N"], name: "新しいプレゼンテーション", desc: "新しいプレゼンテーションを作成" },
      { type: "chord", keys: ["Ctrl", "O"], name: "開く", desc: "既存のプレゼンテーションを開く" },
      { type: "chord", keys: ["Ctrl", "S"], name: "上書き保存", desc: "現在のプレゼンテーションを保存" },
      { type: "chord", keys: ["F12"], name: "名前を付けて保存", desc: "名前を付けて保存ダイアログを開く" },
      { type: "chord", keys: ["Ctrl", "P"], name: "印刷", desc: "印刷画面を開く" },
      { type: "chord", keys: ["Ctrl", "F"], name: "検索", desc: "検索ダイアログを開く" },
      { type: "chord", keys: ["Ctrl", "H"], name: "置換", desc: "検索と置換ダイアログを開く" },
      { type: "chord", keys: ["Ctrl", "Q"], name: "書式のみ保存して終了", desc: "内容を保存せず書式だけを維持して終了（適用中のテーマなど）" },
      { type: "chord", keys: ["Ctrl", "W"], name: "プレゼンテーションを閉じる", desc: "現在のプレゼンテーションを閉じる" },
      { type: "chord", keys: ["Ctrl", "Z"], name: "元に戻す", desc: "直前の操作を元に戻す" },
      { type: "chord", keys: ["Ctrl", "Y"], name: "やり直し", desc: "元に戻した操作をやり直す" },
      { type: "chord", keys: ["Ctrl", "C"], name: "コピー", desc: "選択したオブジェクトまたはテキストをコピー" },
      { type: "chord", keys: ["Ctrl", "X"], name: "切り取り", desc: "選択したオブジェクトまたはテキストを切り取り" },
      { type: "chord", keys: ["Ctrl", "V"], name: "貼り付け", desc: "コピー/切り取りした内容を貼り付け" },
      { type: "chord", keys: ["Ctrl", "A"], name: "すべて選択", desc: "現在のペイン内のすべてを選択（スライド/テキストなど）" },
      { type: "chord", keys: ["Delete"], name: "削除", desc: "選択したオブジェクトまたはテキストを削除" },
      { type: "chord", keys: ["Ctrl", "K"], name: "ハイパーリンクの挿入", desc: "ハイパーリンクの挿入ダイアログを開く" },

      // ===== スライド操作 =====
      { type: "chord", keys: ["Ctrl", "M"], name: "新しいスライド", desc: "新しいスライドを挿入" },
      { type: "chord", keys: ["Ctrl", "Shift", "M"], name: "段落レベルの上げ下げ（ぶら下げ解除）", desc: "箇条書きレベルを1つ上げる/戻す（環境により動作が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "D"], name: "スライド/オブジェクトの複製", desc: "選択中のスライドまたはオブジェクトを複製" },
      { type: "chord", keys: ["Ctrl", "Shift", "D"], name: "スライドの複製", desc: "現在のスライドを複製" },
      { type: "chord", keys: ["Ctrl", "Shift", "C"], name: "書式のコピー", desc: "書式のみコピー（書式のコピー/貼り付けのコピー側）" },
      { type: "chord", keys: ["Ctrl", "Shift", "V"], name: "書式の貼り付け", desc: "書式のみ貼り付け（書式のコピー/貼り付けの貼り付け側）" },
      { type: "chord", keys: ["Ctrl", "Shift", "N"], name: "標準レイアウトへ", desc: "スライドレイアウトを標準に戻す" },
      { type: "chord", keys: ["Ctrl", "Shift", "S"], name: "スライドを別名保存", desc: "現在のスライドのみを別ファイルとして保存（バージョンにより動作が異なる場合あり）" },

      // ===== スライドナビゲーション =====
      { type: "chord", keys: ["PageUp"], name: "前のスライドへ移動", desc: "1つ前のスライドを選択" },
      { type: "chord", keys: ["PageDown"], name: "次のスライドへ移動", desc: "1つ後ろのスライドを選択" },
      { type: "chord", keys: ["Ctrl", "PageUp"], name: "前のセクションの最初へ", desc: "前のセクションの先頭スライドへ移動（セクション使用時）" },
      { type: "chord", keys: ["Ctrl", "PageDown"], name: "次のセクションの最初へ", desc: "次のセクションの先頭スライドへ移動（セクション使用時）" },
      { type: "chord", keys: ["Home"], name: "先頭スライドへ", desc: "最初のスライドへ移動" },
      { type: "chord", keys: ["End"], name: "最後のスライドへ", desc: "最後のスライドへ移動" },

      // ===== テキスト編集 =====
      { type: "chord", keys: ["F2"], name: "テキスト ボックス編集", desc: "選択中のオブジェクト/プレースホルダーを編集" },
      { type: "chord", keys: ["Ctrl", "B"], name: "太字", desc: "選択したテキストを太字にする/解除" },
      { type: "chord", keys: ["Ctrl", "I"], name: "斜体", desc: "選択したテキストを斜体にする/解除" },
      { type: "chord", keys: ["Ctrl", "U"], name: "下線", desc: "選択したテキストに下線を付ける/解除" },
      { type: "chord", keys: ["Ctrl", "5"], name: "取り消し線", desc: "取り消し線の設定/解除" },
      { type: "chord", keys: ["Ctrl", "Shift", ">"], name: "フォントサイズ拡大", desc: "フォントサイズを大きくする" },
      { type: "chord", keys: ["Ctrl", "Shift", "<"], name: "フォントサイズ縮小", desc: "フォントサイズを小さくする" },
      { type: "chord", keys: ["Ctrl", "Shift", "L"], name: "箇条書きの設定", desc: "箇条書きをオン/オフ" },
      { type: "chord", keys: ["Ctrl", "T"], name: "フォントダイアログ", desc: "フォントの詳細設定ダイアログを開く" },
      { type: "chord", keys: ["Ctrl", "E"], name: "中央揃え", desc: "段落を中央揃えにする" },
      { type: "chord", keys: ["Ctrl", "L"], name: "左揃え", desc: "段落を左揃えにする" },
      { type: "chord", keys: ["Ctrl", "R"], name: "右揃え", desc: "段落を右揃えにする" },
      { type: "chord", keys: ["Ctrl", "J"], name: "両端揃え", desc: "段落を両端揃えにする" },
      { type: "chord", keys: ["Alt", "Shift", "Right"], name: "インデントを増やす", desc: "箇条書きレベルを1つ下げる（右へ）" },
      { type: "chord", keys: ["Alt", "Shift", "Left"], name: "インデントを減らす", desc: "箇条書きレベルを1つ上げる（左へ）" },
      { type: "chord", keys: ["Alt", "Shift", "Up"], name: "段落の並べ替え（上へ）", desc: "段落を上に移動" },
      { type: "chord", keys: ["Alt", "Shift", "Down"], name: "段落の並べ替え（下へ）", desc: "段落を下に移動" },

      // ===== オブジェクト操作 =====
      { type: "chord", keys: ["Ctrl", "G"], name: "グループ化", desc: "選択したオブジェクトをグループ化" },
      { type: "chord", keys: ["Ctrl", "Shift", "G"], name: "グループ解除", desc: "グループ化されたオブジェクトを解除" },
      { type: "chord", keys: ["Ctrl", "Shift", "H"], name: "選択オブジェクトを表示/非表示", desc: "選択オブジェクトの表示/非表示（バージョンによって異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "Shift", "J"], name: "上下中央揃え", desc: "選択した複数オブジェクトを上下方向中央揃え" },
      { type: "chord", keys: ["Ctrl", "Shift", "K"], name: "左右中央揃え", desc: "選択した複数オブジェクトを左右方向中央揃え" },
      { type: "chord", keys: ["Shift"], name: "比率を保って拡大/縮小", desc: "オブジェクトの拡大/縮小時に縦横比を維持（ドラッグ操作と併用）" },
      { type: "chord", keys: ["Ctrl"], name: "コピーしながらドラッグ", desc: "ドラッグしながら複製を作成（ドラッグ操作と併用）" },

      // ===== スライドショー開始・終了 =====
      { type: "chord", keys: ["F5"], name: "スライドショー（最初から）", desc: "先頭スライドからスライドショーを開始" },
      { type: "chord", keys: ["Shift", "F5"], name: "スライドショー（現在のスライドから）", desc: "現在のスライドからスライドショーを開始" },
      { type: "chord", keys: ["Ctrl", "F5"], name: "発表者ビューモード調整", desc: "スライドショーウィンドウの位置/サイズをリセット（バージョンにより動作が異なる場合あり）" },
      { type: "chord", keys: ["Esc"], name: "スライドショー終了", desc: "スライドショーを終了して編集画面に戻る" },

      // ===== スライドショー中：基本移動 =====
      { type: "chord", keys: ["N"], name: "次のスライド/アニメーション", desc: "次のスライド、または次のアニメーションへ進む" },
      { type: "chord", keys: ["PageDown"], name: "次のスライド", desc: "次のスライドへ進む" },
      { type: "chord", keys: ["Right"], name: "次のスライド/アニメーション（→）", desc: "次のスライド・アニメーションへ進む" },
      { type: "chord", keys: ["Down"], name: "次のスライド/アニメーション（↓）", desc: "次のスライド・アニメーションへ進む" },
      { type: "chord", keys: ["Space"], name: "次のスライド/アニメーション（Space）", desc: "次のスライド・アニメーションへ進む" },
      { type: "chord", keys: ["P"], name: "前のスライド", desc: "前のスライドへ戻る" },
      { type: "chord", keys: ["PageUp"], name: "前のスライド（PageUp）", desc: "前のスライドへ戻る" },
      { type: "chord", keys: ["Left"], name: "前のスライド/アニメーション（←）", desc: "前のスライド・アニメーションへ戻る" },
      { type: "chord", keys: ["Up"], name: "前のスライド/アニメーション（↑）", desc: "前のスライド・アニメーションへ戻る" },
      { type: "chord", keys: ["Backspace"], name: "前のスライド（Backspace）", desc: "前のスライドへ戻る" },
      { type: "chord", keys: ["Number"], name: "指定スライドへジャンプ", desc: "スライド番号を入力して Enter で指定スライドへ移動（例：5 Enter）" },

      // ===== スライドショー中：表示切替 =====
      { type: "chord", keys: ["B"], name: "黒画面の表示/解除", desc: "画面を黒くして注目を切り替え（もう一度で元に戻る）" },
      { type: "chord", keys: ["W"], name: "白画面の表示/解除", desc: "画面を白くして注目を切り替え（もう一度で元に戻る）" },
      { type: "chord", keys: ["Ctrl", "L"], name: "レーザーポインター/ペン切替", desc: "マウスポインタをレーザーポインターに切り替え（環境により動作が異なる場合あり）" },
      { type: "chord", keys: ["Ctrl", "P"], name: "ペン", desc: "ペンツールに切り替え" },
      { type: "chord", keys: ["Ctrl", "A"], name: "矢印ポインタに戻す", desc: "矢印ポインタに戻す" },
      { type: "chord", keys: ["E"], name: "書き込みの消去", desc: "スライド上の手書き内容を消去" },
      { type: "chord", keys: ["Ctrl", "H"], name: "ポインタを非表示", desc: "ポインタとナビゲーションボタンを非表示" },
      { type: "chord", keys: ["Ctrl", "U"], name: "ポインタを表示", desc: "ポインタとナビゲーションボタンを再表示" },

      // ===== スライドショー中：その他 =====
      { type: "chord", keys: ["Ctrl", "S"], name: "スライドショー中のスライド選択", desc: "スライドショー中にスライド一覧ダイアログを開く" },
      { type: "chord", keys: ["Ctrl", "T"], name: "タスクバー表示", desc: "スライドショー中にタスクバーを表示" },
      { type: "chord", keys: ["Ctrl", "Tab"], name: "スライドショーと他ウィンドウの切替", desc: "表示中のプレゼンと他ウィンドウを切り替え" },

      // ===== 表示モード・ウィンドウ =====
      { type: "chord", keys: ["Alt", "F5"], name: "発表者ツールのプレビュー", desc: "発表者ツールをプレビュー表示" },
      { type: "chord", keys: ["Alt", "Shift", "N"], name: "ノート ペイン表示/非表示", desc: "ノート ペインの表示/非表示を切り替え" },
      { type: "chord", keys: ["Ctrl", "Shift", "Tab"], name: "ウィンドウ切替（逆方向）", desc: "開いている PowerPoint ウィンドウ間を逆順に切り替え" },
      { type: "chord", keys: ["Ctrl", "Tab"], name: "ウィンドウ切替", desc: "開いている PowerPoint ウィンドウ間を切り替え" },
      { type: "chord", keys: ["Alt", "W"], name: "表示タブを開く", desc: "表示タブ/ビュー関連コマンドへアクセス" },

      // ===== ズーム・表示 =====
      { type: "chord", keys: ["Ctrl", "MouseWheelUp"], name: "ズームイン", desc: "Ctrl キーを押しながらホイール上回転でズームイン" },
      { type: "chord", keys: ["Ctrl", "MouseWheelDown"], name: "ズームアウト", desc: "Ctrl キーを押しながらホイール下回転でズームアウト" },
      { type: "chord", keys: ["Alt", "V"], name: "表示切替メニュー", desc: "ノーマル/スライド一覧/スライドショーなど表示メニューへアクセス" },

      // ===== 図形・描画 =====
      { type: "chord", keys: ["Ctrl", "Shift", "C"], name: "描式のコピー", desc: "図形/テキストの書式をコピー" },
      { type: "chord", keys: ["Ctrl", "Shift", "V"], name: "描式の貼り付け", desc: "コピーした書式を貼り付け" },
      { type: "chord", keys: ["Ctrl", "Shift", "+"], name: "上付き", desc: "選択したテキストを上付きにする/解除" },
      { type: "chord", keys: ["Ctrl", "="], name: "下付き", desc: "選択したテキストを下付きにする/解除" },
      { type: "chord", keys: ["Shift", "ArrowKeys"], name: "ピクセル単位で移動", desc: "矢印キー＋Shift でオブジェクトを微調整移動" },

      // ===== リボン操作 =====
      { type: "chord", keys: ["Alt"], name: "キー ヒントの表示", desc: "リボンのキー ヒントを表示してキーボード操作を開始" },
      { type: "chord", keys: ["Ctrl", "F1"], name: "リボンの表示/非表示", desc: "リボンを折りたたみ/展開" },

      // ===== コメント／共同作業 =====
      { type: "chord", keys: ["Ctrl", "Alt", "M"], name: "コメントの挿入", desc: "コメントを挿入する（バージョンによりメモ/コメントなど名称が違う場合あり）" },
      { type: "chord", keys: ["Ctrl", "Shift", "K"], name: "コメントの前/次へ移動", desc: "コメント間を移動（環境によりショートカットが異なる場合あり）" }
    ]
  });
})();
