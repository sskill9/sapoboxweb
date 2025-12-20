T008_kanjiyomi01 辞書生成手順（完全オフライン）

【目的】
KANJIDIC2(XML) から data/dict.js を自動生成して、T008 をオフライン辞書同梱で運用する。

【用意するもの】
1) KANJIDIC2 の XML ファイル（例: kanjidic2.xml）
   - build フォルダなどに配置する
   - ファイル名は任意（コマンドで指定）

2) Python 3（Windows の場合は python.exe で実行できる状態）

【手動追記（任意）】
data/dict_manual.csv に追記する。
再生成しても消えない（manual が自動生成結果を上書きする）。

【生成コマンド例】
(プロジェクトルート = T008_kanjiyomi01 とする)

1) dict.js を生成
python build/kanjidic2_to_dictjs.py --xml build/kanjidic2.xml --out data/dict.js

2) 手動追記CSVを使う（既定で data/dict_manual.csv を読む）
python build/kanjidic2_to_dictjs.py --xml build/kanjidic2.xml --out data/dict.js --manual data/dict_manual.csv

3) メモをヘッダに入れる（任意）
python build/kanjidic2_to_dictjs.py --xml build/kanjidic2.xml --note "KANJIDIC2から生成。T008用に音訓/画数/部首/Unicodeのみ抽出。"

【動作確認】
生成後、T008index.html を開いて:
- 例: 清 / 信 / 藤 などで結果が出ること
- dict_status が「収録」になっていること

【注意】
- dict.js は自動生成。直接編集しない。
- 追記や修正は dict_manual.csv に入れてから再生成する。
- 異体字（例: 﨑 など）は KANJIDIC2 に無い場合があるため、dict_manual.csv で補完する。
