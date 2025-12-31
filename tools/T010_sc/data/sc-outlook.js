// data/sc-outlook.js
// Outlook（クラシック）ショートカット定義
// 形式は既存 sc-*.js と同じ（window.SC_SHORTCUT_DATASETS に push）

(function () {
  "use strict";

  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "outlook-classic",
    appLabel: "Outlook（クラシック）",
    shortcuts: [
      // =========================
      // 基本ナビゲーション（主要モジュール）
      // =========================
      { type: "chord", keys: ["Ctrl", "1"], name: "メールへ切替", desc: "メール（Mail）に切り替えます。" },
      { type: "chord", keys: ["Ctrl", "2"], name: "カレンダーへ切替", desc: "カレンダー（Calendar）に切り替えます。" },
      { type: "chord", keys: ["Ctrl", "3"], name: "連絡先へ切替", desc: "連絡先（People/Contacts）に切り替えます。" },
      { type: "chord", keys: ["Ctrl", "4"], name: "タスクへ切替", desc: "タスク（Tasks）に切り替えます。" },

      // =========================
      // メール作成・操作（クラシック）
      // =========================
      { type: "chord", keys: ["Ctrl", "Shift", "M"], name: "新規メール作成", desc: "新しいメールメッセージを作成します。" },
      { type: "chord", keys: ["Ctrl", "N"], name: "新規アイテム作成", desc: "現在のビューに応じた新規アイテムを作成します（例：メール/予定/タスク等）。" },
      { type: "chord", keys: ["Ctrl", "O"], name: "開く", desc: "選択中のアイテムを開きます。" },
      { type: "chord", keys: ["Ctrl", "W"], name: "閉じる", desc: "開いているアイテムを閉じます。" },
      { type: "chord", keys: ["Esc"], name: "閉じる/キャンセル", desc: "操作をキャンセル、またはダイアログ/メニューを閉じます。" },
      { type: "chord", keys: ["Ctrl", "S"], name: "保存", desc: "作成中のアイテムを保存します。" },
      { type: "chord", keys: ["Ctrl", "P"], name: "印刷", desc: "選択中（または開いている）アイテムを印刷します。" },

      { type: "chord", keys: ["Ctrl", "R"], name: "返信", desc: "選択中のメッセージに返信します。" },
      { type: "chord", keys: ["Ctrl", "Shift", "R"], name: "全員に返信", desc: "選択中のメッセージに全員返信します。" },
      { type: "chord", keys: ["Ctrl", "F"], name: "転送", desc: "選択中のメッセージを転送します。" },

      { type: "chord", keys: ["Ctrl", "Enter"], name: "送信", desc: "作成中のメッセージを送信します。" },

      { type: "chord", keys: ["Ctrl", "E"], name: "検索へ移動", desc: "検索ボックスへ移動します。" },
      { type: "chord", keys: ["Ctrl", "Y"], name: "フォルダーへ移動", desc: "［フォルダーへ移動］ダイアログを開きます。" },

      { type: "chord", keys: ["Ctrl", "Q"], name: "既読にする", desc: "選択中のメッセージを既読にします。" },
      { type: "chord", keys: ["Ctrl", "U"], name: "未読にする", desc: "選択中のメッセージを未読にします。" },
      { type: "chord", keys: ["Delete"], name: "削除", desc: "選択中のアイテムを削除します。" },
      { type: "chord", keys: ["Shift", "Delete"], name: "完全削除", desc: "選択中のアイテムを（確認後）完全削除します。" },
      { type: "chord", keys: ["Insert"], name: "フラグ/完了", desc: "アイテムにフラグを付ける、または完了扱いにします。" },

      // =========================
      // 受信/送信（Send/Receive）
      // =========================
      { type: "chord", keys: ["Ctrl", "Alt", "S"], name: "送受信グループ定義", desc: "Send/Receive グループを定義します。" },
      { type: "chord", keys: ["Shift", "F9"], name: "現在フォルダー送受信", desc: "現在のフォルダーの送受信（完全アイテム取得）を開始します。" },
      { type: "chord", keys: ["Alt", "J", "S", "S"], name: "送受信開始（KeyTips）", desc: "送受信を開始します（KeyTips: Alt → J → S → S）。" },
      { type: "chord", keys: ["Alt", "J", "S", "G"], name: "全グループ送受信（KeyTips）", desc: "定義済みグループの送受信を開始します（KeyTips: Alt → J → S → G）。" },

      // =========================
      // 読み取りウィンドウ / InfoBar（クラシック）
      // =========================
      { type: "chord", keys: ["Ctrl", "Shift", "W"], name: "InfoBarメニュー", desc: "InfoBar（競合などの通知）がある場合にメニューを開きます。" },
      { type: "chord", keys: ["Esc"], name: "InfoBarメニューを閉じる", desc: "InfoBarメニューを閉じます。" },

      // =========================
      // カレンダー（クラシック）
      // =========================
      { type: "chord", keys: ["Ctrl", "N"], name: "予定作成（カレンダービュー）", desc: "カレンダービューで予定（Appointment）を作成します。" },
      { type: "chord", keys: ["Ctrl", "Shift", "A"], name: "予定作成（どのビューでも）", desc: "どの Outlook ビューからでも予定（Appointment）を作成します。" },
      { type: "chord", keys: ["Ctrl", "Shift", "Q"], name: "会議出席依頼作成", desc: "会議出席依頼（Meeting request）を作成します。" },
      { type: "chord", keys: ["Alt", "H", "M", "R"], name: "会議出席依頼作成（KeyTips）", desc: "会議出席依頼を作成します（KeyTips: Alt → H → M → R）。" },
      { type: "chord", keys: ["Alt", "H", "I"], name: "新規アイテムメニュー（KeyTips）", desc: "新規アイテム（New Items）メニューを開きます（KeyTips: Alt → H → I）。" },

      { type: "chord", keys: ["Ctrl", "F"], name: "予定/会議を転送", desc: "予定または会議を転送します。" },
      { type: "chord", keys: ["Alt", "H", "F", "W"], name: "予定/会議を転送（KeyTips）", desc: "予定または会議を転送します（KeyTips: Alt → H → F → W）。" },

      { type: "chord", keys: ["Ctrl", "R"], name: "会議出席依頼に返信", desc: "会議出席依頼に返信（メッセージ付き）します。" },
      { type: "chord", keys: ["Ctrl", "Shift", "R"], name: "会議出席依頼に全員返信", desc: "会議出席依頼に全員返信します。" },

      { type: "chord", keys: ["Alt", "1"], name: "1日表示", desc: "カレンダーを1日表示にします。" },
      { type: "chord", keys: ["Alt", "2"], name: "2日表示", desc: "カレンダーを2日表示にします。" },
      { type: "chord", keys: ["Alt", "3"], name: "3日表示", desc: "カレンダーを3日表示にします。" },
      { type: "chord", keys: ["Alt", "4"], name: "4日表示", desc: "カレンダーを4日表示にします。" },
      { type: "chord", keys: ["Alt", "5"], name: "5日表示", desc: "カレンダーを5日表示にします。" },
      { type: "chord", keys: ["Alt", "6"], name: "6日表示", desc: "カレンダーを6日表示にします。" },
      { type: "chord", keys: ["Alt", "7"], name: "7日表示", desc: "カレンダーを7日表示にします。" },
      { type: "chord", keys: ["Alt", "8"], name: "8日表示", desc: "カレンダーを8日表示にします。" },
      { type: "chord", keys: ["Alt", "9"], name: "9日表示", desc: "カレンダーを9日表示にします。" },
      { type: "chord", keys: ["Alt", "0"], name: "10日表示", desc: "カレンダーを10日表示にします。" },

      { type: "chord", keys: ["Alt", "H", "O", "D"], name: "今日へ移動（KeyTips）", desc: "カレンダーで今日を表示します（KeyTips: Alt → H → O → D）。" },
      { type: "chord", keys: ["Ctrl", "Alt", "1"], name: "日表示", desc: "日（Daily）ビューを表示します。" },
      { type: "chord", keys: ["Alt", "H", "R"], name: "日表示（KeyTips）", desc: "日（Daily）ビューを表示します（KeyTips: Alt → H → R）。" },

      { type: "chord", keys: ["Alt", "H", "X"], name: "次の7日間", desc: "次の7日間を表示します（KeyTips: Alt → H → X）。" },

      { type: "chord", keys: ["Ctrl", "G"], name: "日付へ移動", desc: "指定した日付へ移動します。" },
      { type: "chord", keys: ["Alt", "H", "L"], name: "日付へ移動（KeyTips）", desc: "指定した日付へ移動します（KeyTips: Alt → H → L）。" },

      { type: "chord", keys: ["Ctrl", "Alt", "4"], name: "月表示", desc: "月（Month）ビューに切り替えます。" },
      { type: "chord", keys: ["Alt", "="], name: "月表示（Alt+=）", desc: "月（Month）ビューに切り替えます（Alt+=）。" },

      { type: "chord", keys: ["Ctrl", "Right"], name: "次の日へ", desc: "次の日へ移動します。" },
      { type: "chord", keys: ["Ctrl", "Left"], name: "前の日へ", desc: "前の日へ移動します。" },

      { type: "chord", keys: ["Alt", "Down"], name: "次の週へ", desc: "次の週へ移動します。" },
      { type: "chord", keys: ["Alt", "Up"], name: "前の週へ", desc: "前の週へ移動します。" },

      { type: "chord", keys: ["Alt", "PageDown"], name: "次の月へ", desc: "次の月へ移動します。" },
      { type: "chord", keys: ["Alt", "PageUp"], name: "前の月へ", desc: "前の月へ移動します。" },

      { type: "chord", keys: ["Alt", "Home"], name: "週の先頭へ", desc: "週の先頭へ移動します。" },
      { type: "chord", keys: ["Alt", "End"], name: "週の末尾へ", desc: "週の末尾へ移動します。" },

      { type: "chord", keys: ["Ctrl", "Alt", "3"], name: "週表示（フル）", desc: "フル週（Full Week）ビューに切り替えます。" },
      { type: "chord", keys: ["Alt", "-"], name: "週表示（Alt+-）", desc: "フル週（Full Week）ビューに切り替えます（Alt+-）。" },
      { type: "chord", keys: ["Ctrl", "Alt", "2"], name: "稼働週表示（Work Week）", desc: "稼働週（Work Week）ビューに切り替えます。" },

      { type: "chord", keys: ["Ctrl", ","], name: "前の予定へ", desc: "前の予定へ移動します。" },
      { type: "chord", keys: ["Ctrl", "."], name: "次の予定へ", desc: "次の予定へ移動します。" },
      { type: "chord", keys: ["Ctrl", "Shift", ","], name: "前の予定へ（代替）", desc: "前の予定へ移動します（代替キー）。" },
      { type: "chord", keys: ["Ctrl", "Shift", "."], name: "次の予定へ（代替）", desc: "次の予定へ移動します（代替キー）。" },

      { type: "chord", keys: ["Alt", "O"], name: "リマインダーから予定を開く", desc: "リマインダーが出たときに予定を開きます。" },
      { type: "chord", keys: ["Alt", "V", "M"], name: "リマインダー一覧", desc: "リマインダーウィンドウを開きます（KeyTips: Alt → V → M）。" },
      { type: "chord", keys: ["Alt", "S"], name: "リマインダーをスヌーズ", desc: "リマインダーをスヌーズします。" },
      { type: "chord", keys: ["Alt", "D"], name: "リマインダーを却下", desc: "リマインダーを却下（Dismiss）します。" },

      { type: "chord", keys: ["Ctrl", "E"], name: "検索へ移動（カレンダー）", desc: "検索ボックスへ移動します。" },

      { type: "chord", keys: ["Ctrl", "Alt", "5"], name: "スケジュールを横表示", desc: "スケジュールを横表示（比較しやすいレイアウト）にします。" },
      { type: "chord", keys: ["Alt", "H", "S", "V"], name: "スケジュール横表示（KeyTips）", desc: "スケジュールを横表示にします（KeyTips: Alt → H → S → V）。" },

      { type: "chord", keys: ["Alt", "H", "O", "C"], name: "共有カレンダー追加（KeyTips）", desc: "共有カレンダーを追加、または新規カレンダーを作成します（KeyTips: Alt → H → O → C）。" },
      { type: "chord", keys: ["Alt", "H", "C", "G"], name: "カレンダーグループ作成（KeyTips）", desc: "新しいカレンダーグループを作成（または部門カレンダー追加）します（KeyTips: Alt → H → C → G）。" },

      // =========================
      // 連絡先（クラシック）抜粋：カード/アドレス表示の移動と選択
      // =========================
      { type: "chord", keys: ["Up"], name: "前の連絡先カード", desc: "前のカードを選択します。" },
      { type: "chord", keys: ["Down"], name: "次の連絡先カード", desc: "次のカードを選択します。" },
      { type: "chord", keys: ["Home"], name: "先頭の連絡先カード", desc: "リストの先頭カードを選択します。" },
      { type: "chord", keys: ["End"], name: "末尾の連絡先カード", desc: "リストの末尾カードを選択します。" },
      { type: "chord", keys: ["PageUp"], name: "前ページ先頭カード", desc: "現在ページの先頭カードを選択します。" },
      { type: "chord", keys: ["PageDown"], name: "次ページ先頭カード", desc: "次ページの先頭カードを選択します。" },
      { type: "chord", keys: ["Right"], name: "次列の近いカード", desc: "次の列で最も近いカードを選択します。" },
      { type: "chord", keys: ["Left"], name: "前列の近いカード", desc: "前の列で最も近いカードを選択します。" },

      { type: "chord", keys: ["Ctrl", "Space"], name: "カード選択切替", desc: "アクティブなカードの選択/解除を切り替えます。" },
      { type: "chord", keys: ["Shift", "Up"], name: "上へ範囲選択", desc: "範囲選択を上へ拡張します（開始点以降を解除）。" },
      { type: "chord", keys: ["Shift", "Down"], name: "下へ範囲選択", desc: "範囲選択を下へ拡張します（開始点以前を解除）。" },
      { type: "chord", keys: ["Ctrl", "Shift", "Up"], name: "上へ拡張（開始点無視）", desc: "開始点に関係なく上へ選択範囲を拡張します。" },
      { type: "chord", keys: ["Ctrl", "Shift", "Down"], name: "下へ拡張（開始点無視）", desc: "開始点に関係なく下へ選択範囲を拡張します。" },

      { type: "chord", keys: ["Shift", "Home"], name: "先頭まで範囲選択", desc: "先頭カードまで選択範囲を拡張します。" },
      { type: "chord", keys: ["Shift", "End"], name: "末尾まで範囲選択", desc: "末尾カードまで選択範囲を拡張します。" },
      { type: "chord", keys: ["Shift", "PageUp"], name: "前ページ末尾まで範囲選択", desc: "前ページ側へ選択範囲を拡張します。" },
      { type: "chord", keys: ["Shift", "PageDown"], name: "次ページ末尾まで範囲選択", desc: "次ページ側へ選択範囲を拡張します。" },

      { type: "chord", keys: ["Ctrl", "Shift", "X"], name: "FAX送信", desc: "選択した連絡先へFAXを送信します。" },
      { type: "chord", keys: ["Alt", "D"], name: "住所確認ダイアログ", desc: "［住所の確認］ダイアログを開きます。" },

      { type: "chord", keys: ["Alt", "Shift", "1"], name: "Email 1 を表示", desc: "連絡先フォームで Email 1 情報を表示します。" },
      { type: "chord", keys: ["Alt", "Shift", "2"], name: "Email 2 を表示", desc: "連絡先フォームで Email 2 情報を表示します。" },
      { type: "chord", keys: ["Alt", "Shift", "3"], name: "Email 3 を表示", desc: "連絡先フォームで Email 3 情報を表示します。" },

      // =========================
      // タスク（クラシック）
      // =========================
      { type: "chord", keys: ["Ctrl", "Shift", "K"], name: "タスク作成（どのビューでも）", desc: "どのビューからでもタスクを作成します。" },
      { type: "chord", keys: ["Ctrl", "N"], name: "タスク作成（タスクビュー）", desc: "タスクビューでタスクを作成します。" },

      { type: "chord", keys: ["Ctrl", "O"], name: "タスクを開く", desc: "選択したタスクを開きます。" },
      { type: "chord", keys: ["Ctrl", "P"], name: "タスクを印刷", desc: "選択したタスクを印刷します。" },
      { type: "chord", keys: ["Ctrl", "A"], name: "全選択（タスク）", desc: "タスク一覧を全選択します。" },

      { type: "chord", keys: ["Ctrl", "E"], name: "検索（タスク）", desc: "タスクまたは他のアイテムを検索します。" },
      { type: "chord", keys: ["Ctrl", "Y"], name: "フォルダーへ移動（タスク）", desc: "［フォルダーへ移動］ダイアログを開きます。" },

      { type: "chord", keys: ["Ctrl", "F"], name: "タスクを転送（添付）", desc: "タスクを添付として転送します。" },
      { type: "chord", keys: ["Ctrl", "Shift", "Alt", "U"], name: "タスク依頼作成", desc: "タスク依頼（Task request）を作成します。" },

      { type: "chord", keys: ["F6"], name: "領域移動（タスク）", desc: "フォルダーペイン/タスクリスト/To-Doバー間を移動します。" },
      { type: "chord", keys: ["Ctrl", "Z"], name: "元に戻す", desc: "直前の操作を元に戻します。" },

      { type: "chord", keys: ["Ctrl", "C"], name: "タスク依頼を承諾", desc: "タスク依頼を承諾します。" },
      { type: "chord", keys: ["Ctrl", "D"], name: "タスク依頼を辞退", desc: "タスク依頼を辞退します。" },
      { type: "chord", keys: ["Ctrl", "D"], name: "タスク削除", desc: "選択したタスクを削除します（タスク一覧での操作）。" },

      { type: "chord", keys: ["Insert"], name: "タスクにフラグ/完了", desc: "フラグを付ける、または完了扱いにします。" }
    ]
  });
})();
