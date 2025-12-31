// data/sc-outlook-new.js
// Outlook（新しいOutlook）ショートカット定義
// 形式は既存 sc-*.js と同じ（window.SC_SHORTCUT_DATASETS に push）

(function () {
  "use strict";

  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "outlook-new",
    appLabel: "Outlook（new）",
    shortcuts: [
      // =========================
      // フォルダーペイン（new Outlook）
      // =========================
      { type: "chord", keys: ["Ctrl", "Y"], name: "フォルダーへ移動", desc: "［フォルダーへ移動］ダイアログを開きます。" },
      { type: "chord", keys: ["A"], name: "フォルダーへジャンプ", desc: "フォルダー一覧で、入力した文字でフォルダーへ移動します（例：A）。" },
      { type: "chord", keys: ["Left"], name: "折りたたむ", desc: "フォルダーグループを折りたたみます。" },
      { type: "chord", keys: ["Right"], name: "展開する", desc: "フォルダーグループを展開します。" },

      // =========================
      // メッセージ / 読み取り（new Outlook）
      // =========================
      { type: "chord", keys: ["Delete"], name: "削除", desc: "選択中のメッセージを削除します。" },
      { type: "chord", keys: ["Shift", "Delete"], name: "完全削除", desc: "メッセージを完全削除します（確認あり）。" },
      { type: "chord", keys: ["Ctrl", "Q"], name: "既読", desc: "メッセージを既読にします。" },
      { type: "chord", keys: ["Ctrl", "U"], name: "未読", desc: "メッセージを未読にします。" },
      { type: "chord", keys: ["Insert"], name: "フラグ/完了", desc: "フラグを付ける、または完了扱いにします。" },
      { type: "chord", keys: ["Esc"], name: "閉じる/キャンセル", desc: "現在の操作をキャンセル、またはウィンドウ/メニューを閉じます。" },
      { type: "chord", keys: ["Ctrl", ">"], name: "フォント拡大", desc: "読み取り（または作成）中のフォントサイズを大きくします。" },
      { type: "chord", keys: ["Ctrl", "<"], name: "フォント縮小", desc: "読み取り（または作成）中のフォントサイズを小さくします。" },

      // =========================
      // メッセージ一覧（new Outlook）
      // =========================
      { type: "chord", keys: ["Shift", "Down"], name: "下へ範囲選択", desc: "メッセージ一覧で、選択範囲を下へ拡張します。" },
      { type: "chord", keys: ["Shift", "Up"], name: "上へ範囲選択", desc: "メッセージ一覧で、選択範囲を上へ拡張します。" },
      { type: "chord", keys: ["Home"], name: "一覧の先頭へ", desc: "メッセージ一覧の先頭へ移動します。" },
      { type: "chord", keys: ["Ctrl", "Home"], name: "一覧の先頭へ（代替）", desc: "メッセージ一覧の先頭へ移動します（代替）。" },

      // =========================
      // 読み取りウィンドウ（new Outlook）
      // =========================
      { type: "chord", keys: ["Ctrl", "N"], name: "新規メール作成", desc: "新しいメールを作成します。" },
      { type: "chord", keys: ["Ctrl", "R"], name: "返信", desc: "返信します。" },
      { type: "chord", keys: ["Ctrl", "Shift", "R"], name: "全員に返信", desc: "全員に返信します。" },
      { type: "chord", keys: ["Ctrl", "F"], name: "転送", desc: "転送します。" },
      { type: "chord", keys: ["Ctrl", "Enter"], name: "送信", desc: "作成中のメールを送信します。" },

      { type: "chord", keys: ["Home"], name: "メール先頭へ", desc: "メッセージ本文の先頭へ移動します。" },
      { type: "chord", keys: ["End"], name: "メール末尾へ", desc: "メッセージ本文の末尾へ移動します。" },
      { type: "chord", keys: ["PageDown"], name: "次ページへ", desc: "次ページへスクロールします。" },
      { type: "chord", keys: ["PageUp"], name: "前ページへ", desc: "前ページへスクロールします。" },

      // =========================
      // カレンダー（new Outlook）
      // =========================
      { type: "chord", keys: ["Ctrl", "2"], name: "カレンダーへ切替", desc: "カレンダーに移動します。" },
      { type: "chord", keys: ["Ctrl", "N"], name: "新規カレンダーアイテム", desc: "新しいカレンダーアイテムを作成します。" },
      { type: "chord", keys: ["Delete"], name: "予定削除", desc: "選択中の予定を削除します。" },
      { type: "chord", keys: ["F6"], name: "領域移動（カレンダー）", desc: "領域（ペイン）間を移動します。" },
      { type: "chord", keys: ["Tab"], name: "次の領域/要素へ", desc: "次の領域または要素へ移動します。" },
      { type: "chord", keys: ["Shift", "Tab"], name: "前の領域/要素へ", desc: "前の領域または要素へ移動します。" },
      { type: "chord", keys: ["Enter"], name: "開く", desc: "選択中のアイテムを開きます。" },

      // =========================
      // People（new Outlook）
      // =========================
      { type: "chord", keys: ["Ctrl", "1"], name: "メールへ切替", desc: "メール（Mail）に切り替えます。" },
      { type: "chord", keys: ["Ctrl", "2"], name: "カレンダーへ切替", desc: "カレンダー（Calendar）に切り替えます。" },
      { type: "chord", keys: ["Ctrl", "3"], name: "Copilotへ切替", desc: "Copilot に切り替えます。" },
      { type: "chord", keys: ["Ctrl", "4"], name: "Peopleへ切替", desc: "People（連絡先）に切り替えます。" },

      { type: "chord", keys: ["Ctrl", "N"], name: "新規連絡先作成", desc: "新しい連絡先を作成します。" },
      { type: "chord", keys: ["Ctrl", "L"], name: "連絡先リスト作成", desc: "新しい連絡先リストを作成します。" },
      { type: "chord", keys: ["Shift", "E"], name: "連絡先の編集", desc: "選択中の連絡先を編集します。" },

      { type: "chord", keys: ["Ctrl", "S"], name: "保存（連絡先）", desc: "変更を保存します。" },
      { type: "chord", keys: ["Ctrl", "E"], name: "検索（People）", desc: "People 内で検索します。" },
      { type: "chord", keys: ["Ctrl", "A"], name: "全選択（People）", desc: "全項目を選択します。" },

      { type: "chord", keys: ["Delete"], name: "連絡先削除", desc: "選択中の連絡先を削除します。" },
      { type: "chord", keys: ["Ctrl", "D"], name: "連絡先削除（代替）", desc: "選択中の連絡先を削除します（代替）。" },

      { type: "chord", keys: ["Down"], name: "次の連絡先へ", desc: "次の連絡先へ移動します。" },
      { type: "chord", keys: ["Up"], name: "前の連絡先へ", desc: "前の連絡先へ移動します。" },

      { type: "chord", keys: ["Esc"], name: "破棄/選択解除", desc: "変更を破棄、または選択を解除します。" },
      { type: "chord", keys: ["Shift", "/"], name: "ショートカット一覧", desc: "キーボードショートカット一覧を表示します。" },

      { type: "chord", keys: ["Alt", "H"], name: "ホームタブ（KeyTips）", desc: "ホームタブを開きます（KeyTips: Alt → H）。" },
      { type: "chord", keys: ["Alt", "V"], name: "表示タブ（KeyTips）", desc: "表示タブを開きます（KeyTips: Alt → V）。" }
    ]
  });
})();
