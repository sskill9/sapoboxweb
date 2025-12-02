/*
  File: tool.js
  Template: Support Tool Box / T000
  Author: {TOOL_AUTHOR}
  Version: {TOOL_VERSION}
  Date: {TOOL_DATE} (JST)
  Notes:
    - 同階層完結の初期化。
    - footer.html を fetch で注入します（オフライン可。同ディレクトリ相対パス）。
    - 必要に応じて HOWTO / HISTORY の本文は別JSから読み込み可能です。
*/

(() => {
  "use strict";

  // ===== Template Metadata (表示用) =====
  const META = {
    toolId: "{TOOL_ID}",
    toolName: "{TOOL_NAME_JA}",
    version: "{TOOL_VERSION}",
    updated: "{TOOL_DATE}"
  };

  // ===== DOM Ready =====
  document.addEventListener("DOMContentLoaded", () => {
    // Version / Date 表示（保険）
    const verText = document.getElementById("verText");
    const dateText = document.getElementById("dateText");
    if (verText) verText.textContent = META.version;
    if (dateText) dateText.textContent = META.updated;

    // Footer Inject
    injectFooter();

    // Buttons (HowTo / History)
    wireModals();

    // Demo actions
    wireDemo();
  });

  // ===== Footer Injection =====
  function injectFooter() {
    const holder = document.getElementById("footer-placeholder");
    if (!holder) return;
    fetch("./footer.html")
      .then(resp => resp.text())
      .then(html => { holder.innerHTML = html; })
      .catch(() => {
        holder.innerHTML = `
          <footer class="stb-footer py-4">
            <div class="container">
              <p class="mb-1">フッターの読み込みに失敗しました。<span class="small">（footer.html を同階層に配置してください）</span></p>
              <p class="mb-0 small">© ${new Date().getFullYear()} Support Tool Box</p>
            </div>
          </footer>`;
      });
  }

  // ===== Modal Wiring =====
  function wireModals() {
    const howtoBtn = document.getElementById("btnHowto");
    const histBtn  = document.getElementById("btnHistory");

    const howtoModalEl = document.getElementById("modalHowto");
    const histModalEl  = document.getElementById("modalHistory");

    if (howtoBtn && howtoModalEl) {
      const modal = new bootstrap.Modal(howtoModalEl);
      howtoBtn.addEventListener("click", () => modal.show());
    }
    if (histBtn && histModalEl) {
      const modal = new bootstrap.Modal(histModalEl);
      histBtn.addEventListener("click", () => modal.show());
    }
  }

  // ===== Demo Logic (置き換え可) =====
  function wireDemo() {
    const input = document.getElementById("inputPrimary");
    const output = document.getElementById("outputPrimary");
    const btnExec = document.getElementById("btnExecute");
    const btnClear = document.getElementById("btnClear");

    if (btnExec && input && output) {
      btnExec.addEventListener("click", () => {
        // ここに各ツール固有処理を実装（テンプレでは反転文字列を出力するデモ）
        const val = String(input.value || "");
        output.value = val.split("").reverse().join("");
      });
    }
    if (btnClear && input && output) {
      btnClear.addEventListener("click", () => {
        input.value = "";
        output.value = "";
        input.focus();
      });
    }
  }
})();
