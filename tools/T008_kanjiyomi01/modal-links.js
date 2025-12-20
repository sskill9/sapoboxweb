// modal-links.js — リンクモーダル（T008）
(function () {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `
<div class="modal fade" id="modalLinks" tabindex="-1" aria-labelledby="modalLinksLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h2 class="modal-title h5 mb-0" id="modalLinksLabel">リンク：T008 漢字口頭伝達補助</h2>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="閉じる"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">

          <!-- サポ箱TOPページ（共通リンク） -->
          <li class="list-group-item">
            <span class="fw-bold">サポ箱TOPページ</span><br>
            <a href="../../index.html">Support Tool Box（サポ箱）</a>
          </li>

          <!-- 外部：漢字情報（読み・画数・部首） -->
          <li class="list-group-item">
            <span class="fw-bold">漢字辞典オンライン（読み・画数・部首など）</span><br>
            <span class="text-muted small">
              辞書未収録の漢字や、熟語・意味などの補足確認に便利。
            </span><br>
            <a href="https://kanji.jitenon.jp/" target="_blank" rel="noopener">https://kanji.jitenon.jp/</a>
          </li>

          <!-- 外部：Unicode/Unihan -->
          <li class="list-group-item">
            <span class="fw-bold">Unicode Unihan Database Lookup（Unicodeプロパティ確認）</span><br>
            <span class="text-muted small">
              漢字またはコードポイント（16進）で検索して、Unicode側の情報を確認。
            </span><br>
            <a href="https://www.unicode.org/charts/unihan.html" target="_blank" rel="noopener">https://www.unicode.org/charts/unihan.html</a>
          </li>

          <!-- 外部：異体字セレクタ -->
          <li class="list-group-item">
            <span class="fw-bold">異体字セレクタセレクタ（VS付き文字の確認・入力）</span><br>
            <span class="text-muted small">
              同じ字でも字形差が登録されているケースの確認に。
            </span><br>
            <a href="https://747.github.io/vsselector/" target="_blank" rel="noopener">https://747.github.io/vsselector/</a>
          </li>

          <!-- 外部：GlyphWiki（異体字系の補助） -->
          <li class="list-group-item">
            <span class="fw-bold">GlyphWiki（異体字・字体の確認）</span><br>
            <span class="text-muted small">
              異体字・字体の確認に強い（運用・UIは変わることがあります）。
            </span><br>
            <a href="https://glyphwiki.org/wiki/GlyphWiki:%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8" target="_blank" rel="noopener">https://glyphwiki.org/</a>
          </li>

          <!-- 辞書データの出典・ライセンス -->
          <li class="list-group-item">
            <span class="fw-bold">漢字辞書データの出典・ライセンス</span><br>
            <span class="text-muted small">
              本ツールで使用している漢字辞書データは、Electronic Dictionary Research and Development Group (EDRDG)
              が提供する <strong>KANJIDIC2</strong> を元に、口頭伝達補助用途向けに加工して利用しています。
            </span><br>
            <span class="text-muted small">
              KANJIDIC2 is licensed under
              <strong>Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)</strong>.
            </span><br>
            <a href="https://www.edrdg.org/" target="_blank" rel="noopener">https://www.edrdg.org/</a>
          </li>

        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">閉じる</button>
      </div>
    </div>
  </div>
</div>
`;
  document.body.appendChild(wrapper.firstElementChild);
})();
