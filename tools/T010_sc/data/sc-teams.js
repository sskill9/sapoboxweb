// data/sc-teams.js
// Microsoft Teams ショートカット定義（CORS回避のため JS で保持）

(function () {
  window.SC_SHORTCUT_DATASETS = window.SC_SHORTCUT_DATASETS || [];

  window.SC_SHORTCUT_DATASETS.push({
    appId: "Teams",
    appLabel: "Teams",
    shortcuts: [
      // ===== 全般 =====
      { type: "chord", keys: ["Ctrl", "E"], name: "検索へ移動", desc: "検索ボックスへフォーカスして検索/コマンド入力を開始" },
      { type: "chord", keys: ["Ctrl", "G"], name: "指定場所へ移動", desc: "特定のチーム/チャネル/会話などへ移動（Go to）" },
      { type: "chord", keys: ["Ctrl", "N"], name: "新しいチャットを開始", desc: "新しいチャット（New chat）を開始" },
      { type: "chord", keys: ["Ctrl", "Shift", "N"], name: "新しいウィンドウ", desc: "新しい Teams ウィンドウを開く" },
      { type: "chord", keys: ["Ctrl", "O"], name: "既存のチャット/チャネルをポップアウト", desc: "既存のチャット/チャネルを別ウィンドウ（ポップアウト）で開く" },
      { type: "chord", keys: ["Ctrl", "."], name: "ショートカット一覧を開く", desc: "キーボード ショートカットの一覧（カスタマイズ画面）を開く" },
      { type: "chord", keys: ["Ctrl", ","], name: "設定を開く", desc: "設定を開く" },
      { type: "chord", keys: ["Ctrl", "Shift", "F"], name: "フィルターを開く", desc: "フィルタ ビューを開く（表示中の場所により動作が変わる場合あり）" },
      { type: "chord", keys: ["Ctrl", "="], name: "ズームイン", desc: "Teams 画面を拡大（ブラウザ/アプリのズーム）" },
      { type: "chord", keys: ["Ctrl", "-"], name: "ズームアウト", desc: "Teams 画面を縮小（ブラウザ/アプリのズーム）" },
      { type: "chord", keys: ["Ctrl", "0"], name: "ズームをリセット", desc: "ズーム倍率を既定に戻す" },
      { type: "chord", keys: ["F1"], name: "ヘルプを開く", desc: "ヘルプを開く" },
      { type: "chord", keys: ["Esc"], name: "閉じる/戻る", desc: "ダイアログやメニューを閉じる、操作をキャンセルする" },
      { type: "chord", keys: ["Ctrl", "Alt", "Shift", "R"], name: "問題を報告", desc: "問題を報告（Report a problem）" },
      { type: "chord", keys: ["Ctrl", "Alt", "Enter"], name: "境界（ディバイダー）へフォーカス", desc: "左右ペインの境界（リサイズ用）へフォーカス" },
      { type: "chord", keys: ["Ctrl", "Shift", "Enter"], name: "ウィンドウ幅をリセット", desc: "ウィンドウの幅をリセット" },

      // ===== ナビゲーション =====
      { type: "chord", keys: ["Ctrl", "1"], name: "アプリバー：1番目", desc: "アプリバー左側の1番目に移動（環境により割り当てが異なる）" },
      { type: "chord", keys: ["Ctrl", "2"], name: "アプリバー：2番目", desc: "アプリバー左側の2番目に移動（環境により割り当てが異なる）" },
      { type: "chord", keys: ["Ctrl", "3"], name: "アプリバー：3番目（予定表など）", desc: "アプリバー左側の3番目に移動（環境により割り当てが異なる）" },
      { type: "chord", keys: ["Ctrl", "4"], name: "アプリバー：4番目", desc: "アプリバー左側の4番目に移動（環境により割り当てが異なる）" },
      { type: "chord", keys: ["Ctrl", "5"], name: "アプリバー：5番目", desc: "アプリバー左側の5番目に移動（環境により割り当てが異なる）" },
      { type: "chord", keys: ["Ctrl", "6"], name: "アプリバー：6番目", desc: "アプリバー左側の6番目に移動（環境により割り当てが異なる）" },
      { type: "chord", keys: ["Ctrl", "L"], name: "チャット/チャネル一覧へフォーカス", desc: "左側のリスト（チャット/チャネル/チームなど）へフォーカス" },
      { type: "chord", keys: ["Ctrl", "M"], name: "メイン ウィンドウへフォーカス", desc: "メインの表示領域へフォーカス" },
      { type: "chord", keys: ["Ctrl", "Alt", "T"], name: "最上部トースト通知へ移動", desc: "画面上部のトースト通知に移動" },
      { type: "chord", keys: ["Ctrl", "H"], name: "履歴メニューを開く", desc: "履歴メニューを開く" },

      // ===== メッセージング =====
      { type: "chord", keys: ["Alt", "Q"], name: "会話フォルダーをすべて折りたたむ", desc: "すべての会話フォルダーを折りたたむ" },
      { type: "chord", keys: ["Ctrl", "R"], name: "作成ボックスに移動", desc: "作成ボックス（返信/投稿欄）へフォーカス（デスクトップ）" },
      { type: "chord", keys: ["Ctrl", "Shift", "X"], name: "作成ボックスを展開", desc: "作成ボックスを展開（書式設定など）" },
      { type: "chord", keys: ["Ctrl", "Enter"], name: "メッセージ送信", desc: "メッセージを送信" },
      { type: "chord", keys: ["Shift", "Enter"], name: "改行", desc: "メッセージ内で改行（送信しない）" },
      { type: "chord", keys: ["Alt", "Shift", "O"], name: "ファイルを添付", desc: "ファイルを添付（デスクトップ）" },
      { type: "chord", keys: ["Ctrl", "Alt", "P"], name: "段落スタイル", desc: "段落スタイル（Paragraph style）" },
      { type: "chord", keys: ["Ctrl", "Shift", "Alt", "B"], name: "コード ブロックを挿入", desc: "コード ブロックを挿入" },
      { type: "chord", keys: ["Ctrl", "Shift", "Alt", "C"], name: "インライン コードを挿入", desc: "インライン コードを挿入" },
      { type: "chord", keys: ["Ctrl", "Alt", "5"], name: "コードを挿入", desc: "コード（Code）を挿入" },
      { type: "chord", keys: ["Ctrl", "Shift", "I"], name: "重要メッセージ切替", desc: "メッセージを重要として指定（トグル）" },
      { type: "chord", keys: ["Ctrl", "J"], name: "最後の読み取り/最新のメッセージへ", desc: "最後に読んだメッセージ/最新のメッセージへ移動" },
      { type: "chord", keys: ["Ctrl", "F"], name: "現在のチャット/チャネルを検索", desc: "現在のチャットまたはチャネル メッセージを検索" },
      { type: "chord", keys: ["Ctrl", "K"], name: "リンクを挿入", desc: "リンク（ハイパーリンク）を挿入" },
      { type: "chord", keys: ["Ctrl", "Alt", "4"], name: "ブロック引用符を挿入", desc: "ブロック引用符（Quote）を挿入" },
      { type: "chord", keys: ["Ctrl", "Alt", "1"], name: "見出し1スタイル", desc: "見出し 1 スタイルを適用" },
      { type: "chord", keys: ["Ctrl", "Alt", "2"], name: "見出し2スタイル", desc: "見出し 2 スタイルを適用" },
      { type: "chord", keys: ["Ctrl", "Alt", "3"], name: "見出し 3 スタイル", desc: "見出し 3 スタイルを適用" },
      { type: "chord", keys: ["Alt", "P"], name: "チャット/チャネルの詳細", desc: "[チャット/チャネルの詳細] ウィンドウを開く" },
      { type: "chord", keys: ["Alt", "Shift", "R"], name: "最新/選択メッセージに返信", desc: "最新または選択したメッセージに返信（デスクトップ）" },
      { type: "chord", keys: ["Ctrl", "Alt", "R"], name: "最新/選択メッセージにリアクション", desc: "最新または選択したメッセージをリアクション（React）" },
      { type: "chord", keys: ["Ctrl", "Alt", "U"], name: "未読チャットを表示", desc: "すべての未読チャットを表示（フィルター）" },
      { type: "chord", keys: ["Ctrl", "Alt", "C"], name: "チャット会話を表示", desc: "すべてのチャット会話を表示（フィルター）" },
      { type: "chord", keys: ["Ctrl", "Alt", "A"], name: "チャネル会話を表示", desc: "すべてのチャネル会話を表示（フィルター）" },
      { type: "chord", keys: ["Ctrl", "Alt", "B"], name: "会議チャットを表示", desc: "すべての会議チャットを表示（フィルター）" },
      { type: "chord", keys: ["Ctrl", "Alt", "Z"], name: "フィルターをすべてクリア", desc: "すべてのフィルターをクリア" },
      { type: "chord", keys: ["Alt", "Shift", "E"], name: "ビデオ クリップを記録", desc: "ビデオ クリップを記録" },

      // ===== 会議・通話 =====
      { type: "chord", keys: ["Ctrl", "Shift", "M"], name: "ミュート切替", desc: "ミュートを切り替える" },
      { type: "chord", keys: ["Win", "Alt", "K"], name: "ミュート切替（Win+Alt+K）", desc: "ミュートを切り替える（Windows の Teams グローバル ショートカット）" },
      { type: "chord", keys: ["Ctrl", "Space"], name: "一時的にミュート解除", desc: "Ctrl を押したままスペースで一時的にミュート解除（Push to talk 的な動作）" },
      { type: "chord", keys: ["Ctrl", "Shift", "O"], name: "ビデオ切替", desc: "カメラ（ビデオ）を切り替える" },
      { type: "chord", keys: ["Ctrl", "Shift", "K"], name: "手を挙げる/下げる", desc: "手を挙げたり下げたりする" },
      { type: "chord", keys: ["Ctrl", "Shift", "L"], name: "手を挙げているユーザーを読み上げ", desc: "手を挙げているユーザーを読み上げ（スクリーン リーダー）" },
      { type: "chord", keys: ["Ctrl", "Shift", "E"], name: "画面共有を開始/停止", desc: "画面共有を開始/停止（共有）" },
      { type: "chord", keys: ["Ctrl", "Shift", "D"], name: "画面共有を拒否", desc: "画面共有を拒否（共有の受信を拒否）" },
      { type: "chord", keys: ["Ctrl", "Shift", "A"], name: "画面共有を承諾", desc: "画面共有を承諾（共有の受信を承諾）" },
      { type: "chord", keys: ["Ctrl", "Shift", "Y"], name: "ロビー通知のユーザーを許可", desc: "ロビー通知のユーザーを許可" },
      { type: "chord", keys: ["Alt", "N"], name: "会議をスケジュール", desc: "会議のスケジュールを設定" },
      { type: "chord", keys: ["Ctrl", "S"], name: "会議出席依頼を保存/送信", desc: "会議出席依頼を保存または送信" },
      { type: "chord", keys: ["Alt", "Shift", "J"], name: "会議の詳細から参加", desc: "会議の詳細から参加" },
      { type: "chord", keys: ["Ctrl", "Shift", "J"], name: "会議トーストから参加", desc: "会議から参加してトーストを開始" },
      { type: "chord", keys: ["Ctrl", "Shift", "R"], name: "会議通知から会議チャットを開く", desc: "会議の通知から会議チャットを開く" },
      { type: "chord", keys: ["Alt", "Shift", "S"], name: "時間の候補に移動", desc: "時間の候補に移動（スケジュール調整時）" },
      { type: "chord", keys: ["Alt", "Shift", "="], name: "共有コンテンツを拡大", desc: "共有コンテンツを拡大（ズームイン）" },
      { type: "chord", keys: ["Alt", "Shift", "-"], name: "共有コンテンツを縮小", desc: "共有コンテンツを縮小（ズームアウト）" },
      { type: "chord", keys: ["Alt", "Shift", "0"], name: "共有コンテンツのズームをリセット", desc: "共有コンテンツのズームをリセット" },
      { type: "chord", keys: ["Alt", "Shift", "Up"], name: "共有コンテンツをパン（上）", desc: "共有コンテンツをパン（上へ移動）" },
      { type: "chord", keys: ["Alt", "Shift", "Down"], name: "共有コンテンツをパン（下）", desc: "共有コンテンツをパン（下へ移動）" },
      { type: "chord", keys: ["Alt", "Shift", "Left"], name: "共有コンテンツをパン（左）", desc: "共有コンテンツをパン（左へ移動）" },
      { type: "chord", keys: ["Alt", "Shift", "Right"], name: "共有コンテンツをパン（右）", desc: "共有コンテンツをパン（右へ移動）" },
      { type: "chord", keys: ["Alt", "Shift", "A"], name: "音声通話を開始", desc: "音声通話を開始" },
      { type: "chord", keys: ["Alt", "Shift", "V"], name: "ビデオ通話を開始", desc: "ビデオ通話を開始" },
      { type: "chord", keys: ["Ctrl", "Shift", "A"], name: "着信（ビデオ）を承諾", desc: "着信したビデオ通話を承諾" },
      { type: "chord", keys: ["Ctrl", "Shift", "S"], name: "着信（音声）を承諾", desc: "着信した音声通話を承諾" },
      { type: "chord", keys: ["Ctrl", "Shift", "D"], name: "着信を拒否", desc: "着信した通話を拒否" },
      { type: "chord", keys: ["Ctrl", "Shift", "H"], name: "通話を終了", desc: "通話（会議）を終了" },

      // ===== 予定表 =====
      { type: "chord", keys: ["Alt", "Shift", "Y"], name: "予定表：今日へ移動", desc: "予定表で今日へ移動" },
      { type: "chord", keys: ["Ctrl", "Alt", "Right"], name: "予定表：次の期間へ", desc: "予定表で次の期間へ移動" },
      { type: "chord", keys: ["Ctrl", "Alt", "Left"], name: "予定表：前の期間へ", desc: "予定表で前の期間へ移動" },
      { type: "chord", keys: ["Ctrl", "Alt", "1"], name: "予定表：日ビュー", desc: "日ビューに切り替え" },
      { type: "chord", keys: ["Ctrl", "Alt", "2"], name: "予定表：稼働日ビュー", desc: "稼働日ビューに切り替え" },
      { type: "chord", keys: ["Ctrl", "Alt", "4"], name: "予定表：月ビュー", desc: "月ビューに切り替え" },
      { type: "chord", keys: ["Alt", "1"], name: "予定表：ビュー切替", desc: "当日/週/月ビュー切替（表示中のビューにより動作）" },
      { type: "chord", keys: ["Ctrl", "N"], name: "予定表：新しいイベント作成", desc: "予定表で新しいイベントを作成（新規作成）" },
      { type: "chord", keys: ["Enter"], name: "予定表：選択項目を開く", desc: "予定表で選択項目を開く" },
      { type: "chord", keys: ["Delete"], name: "予定表：選択項目を削除", desc: "予定表で選択項目を削除" },

      // ===== アクティビティ フィード =====
      { type: "chord", keys: ["Ctrl", "Alt", "K"], name: "アクティビティ：すべて既読", desc: "アクティビティ フィードをすべて読み取りとしてマーク" },
      { type: "chord", keys: ["Ctrl", "Alt", "U"], name: "アクティビティ：未読のみ表示", desc: "すべての未読アクティビティを表示" },
      { type: "chord", keys: ["Ctrl", "Alt", "C"], name: "アクティビティ：見逃した呼び出し", desc: "アクティビティを見逃した呼び出しにフィルター" },
      { type: "chord", keys: ["Ctrl", "Alt", "M"], name: "アクティビティ：@メンション", desc: "アクティビティを @ メンションにフィルター" },
      { type: "chord", keys: ["Ctrl", "Shift", "F"], name: "アクティビティ：フィルターを開く", desc: "アクティビティのフィルター ビューを開く（現在の仕様では Ctrl+Shift+F が動作）" },

      // ===== デバッグ =====
      { type: "chord", keys: ["Ctrl", "Alt", "Shift", "1"], name: "診断ログをダウンロード", desc: "診断ログをダウンロード（Debug）" }

    ]
  });
})();
