# T012_MCQs01 – Multiple Choice Questions Tool 仕様書（最新版）

## 0. 本書の位置づけ
本書は「T012_MCQs01（選択式テストツール）」の
- ここまでの【確定進捗】
- 今後【完成までに必要な実装項目】
を整理した、引き継ぎ・再開用の正式仕様書である。

---

## 1. ツール概要

- ツール名：Multiple Choice Questions（MCQ）ツール
- 配布形態：ローカル実行（file:// 前提）
- サーバー通信：不要
- 配布方法：ZIP 配布
- 主用途：
  - 社内研修
  - セキュリティ教育
  - 知識確認テスト

---

## 2. フォルダ構成（確定）

T012_MCQs01/
├─ T012index.html
├─ app.js
├─ content.js
├─ top.js
├─ footer.js
├─ modal-howto.js
├─ modal-links.js
├─ modal-changelog.js
├─ modal-terms.js
├─ testpacks/
│  ├─ testpack_sample_01.js
│  ├─ testpack_pc_basic_01.js
│  └─ testpack_security_basic_01.js
└─ libs/
   └─ bootstrap-5.3.x/

---

## 3. ここまでの進捗（確定）

### 3.1 testpack 読み込み
- HTML の script src に記載された testpack を正として読み込む
- window.TESTPACKS に push された件数で管理
- 複数 testpack 読み込みに成功（3件確認済）

### 3.2 実行環境の整理
- 実行中 HTML が唯一の真実
- 編集対象と実行対象のフォルダ差異による誤認を確認・解消

### 3.3 問題仕様
- 各 testpack は 10 問
- 単一選択 / 複数選択を混在
- 合格ライン：80%

---

## 4. testpack.js 仕様（確定）

### 4.1 必須構造

- meta
  - testName
  - testId
  - passLine
  - shuffleQ
  - shuffleC
- questions[]
  - qid
  - type (single / multi)
  - text
  - choices[]
  - answerPlainForDevOnly

---

## 5. 未実装・今後のTODO

### フェーズ1：受験UI
- プルダウン選択で testpack 切替
- 問題を1問ずつ表示
- 前へ / 次へ 制御

### フェーズ2：回答管理
- 単一選択：radio
- 複数選択：checkbox
- 回答状態の保持

### フェーズ3：採点
- 正誤判定ロジック
- 得点率算出
- 合否判定（80%）

### フェーズ4：結果出力
- TXT ファイル生成
- attemptId / 日時 / 得点 / 合否
- 各問題の正誤一覧（合格時）

---

## 6. 再発防止ルール（運用）

- script 構成は削除禁止ブロックとして扱う
- デバッグコードは本体と明確に分離
- 実行URLを常に確認

---

## 7. 次スレッド引き継ぎ文（そのまま使用可）

T012_MCQs01 は testpack 複数読込まで完了。
仕様書（md）に進捗と残TODOを整理済み。
次は受験UI または 採点ロジックから着手可能。
