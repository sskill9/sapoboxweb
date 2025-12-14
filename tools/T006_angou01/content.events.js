// ==================================================
// content.events.js — UIイベント・操作制御
// ==================================================
(function () {
  "use strict";

  // ==================================================
  // ===== 二重バインド防止フラグ =====
  // ==================================================
  if (window.__T006_ANGOU_UI_BOUND__) return;
  window.__T006_ANGOU_UI_BOUND__ = true;
  // ==================================================
  // ===== 二重バインド防止フラグここまで =====
  // ==================================================


  // ==================================================
  // ===== DOM取得ブロック =====
  // ==================================================
  window.encryptFileInput = document.getElementById("encryptFileInput");
  window.decryptFileInput = document.getElementById("decryptFileInput");

  window.encryptPasswordInput = document.getElementById("encryptPasswordInput");
  window.decryptPasswordInput = document.getElementById("decryptPasswordInput");

  var encryptPasswordToggle = document.getElementById("encryptPasswordToggle");
  var decryptPasswordToggle = document.getElementById("decryptPasswordToggle");

  window.encryptButton = document.getElementById("encryptButton");
  window.decryptButton = document.getElementById("decryptButton");

  window.encryptStatus = document.getElementById("encryptStatus");
  window.decryptStatus = document.getElementById("decryptStatus");

  window.encryptDropZone = document.getElementById("encryptDropZone");
  window.decryptDropZone = document.getElementById("decryptDropZone");

  window.encryptDropFileName = document.getElementById("encryptDropFileName");
  window.decryptDropFileName = document.getElementById("decryptDropFileName");

  window.backBtn = document.getElementById("backToTopBtn");

  window.selectedEncryptFile = null;
  window.selectedDecryptFile = null;
  // ==================================================
  // ===== DOM取得ブロックここまで =====
  // ==================================================


  // ==================================================
  // ===== パスワード表示切替ブロック =====
  // ==================================================
  function setupPasswordToggle(inputEl, toggleBtn) {
    if (!inputEl || !toggleBtn) return;

    toggleBtn.addEventListener("click", function () {
      var type = inputEl.getAttribute("type");
      if (type === "password") {
        inputEl.setAttribute("type", "text");
        toggleBtn.textContent = "🙈";
        toggleBtn.setAttribute("aria-label", "パスワードを非表示");
      } else {
        inputEl.setAttribute("type", "password");
        toggleBtn.textContent = "👁‍🗨";
        toggleBtn.setAttribute("aria-label", "パスワードを表示");
      }
    });
  }

  setupPasswordToggle(window.encryptPasswordInput, encryptPasswordToggle);
  setupPasswordToggle(window.decryptPasswordInput, decryptPasswordToggle);
  // ==================================================
  // ===== パスワード表示切替ブロックここまで =====
  // ==================================================


  // ==================================================
  // ===== ドラッグ＆ドロップ設定ブロック =====
  // ==================================================
  function applyHighlight(dropZone, on, kind) {
    if (!dropZone) return;

    if (on) {
      dropZone.style.background =
        kind === "encrypt"
          ? "rgba(13,110,253,.08)"
          : "rgba(25,135,84,.08)";
      dropZone.style.borderColor =
        kind === "encrypt"
          ? "rgba(13,110,253,.85)"
          : "rgba(25,135,84,.85)";
    } else {
      dropZone.style.background =
        kind === "encrypt"
          ? "rgba(13,110,253,.03)"
          : "rgba(25,135,84,.03)";
      dropZone.style.borderColor =
        kind === "encrypt"
          ? "rgba(13,110,253,.45)"
          : "rgba(25,135,84,.45)";
    }
  }

  function setInputFile(fileInput, file) {
    if (!fileInput || !file) return;
    try {
      var dt = new DataTransfer();
      dt.items.add(file);
      fileInput.files = dt.files;
    } catch (e) {
      // DataTransfer 非対応環境向けフォールバック
    }
  }

  function setupDropZone(dropZone, fileInput, fileNameEl, kind) {
    if (!dropZone) return;

    function setSelectedFile(file) {
      if (kind === "encrypt") {
        window.selectedEncryptFile = file;
        window.setDropFileName(fileNameEl, file);
        window.setStatus(window.encryptStatus, "");
      } else {
        window.selectedDecryptFile = file;
        window.setDropFileName(fileNameEl, file);
        window.setStatus(window.decryptStatus, "");
      }
    }

    dropZone.addEventListener("click", function () {
      if (fileInput) fileInput.click();
    });

    ["dragenter", "dragover"].forEach(function (name) {
      dropZone.addEventListener(name, function (e) {
        e.preventDefault();
        e.stopPropagation();
        applyHighlight(dropZone, true, kind);
      });
    });

    ["dragleave", "drop"].forEach(function (name) {
      dropZone.addEventListener(name, function (e) {
        e.preventDefault();
        e.stopPropagation();
        applyHighlight(dropZone, false, kind);
      });
    });

    dropZone.addEventListener("drop", function (e) {
      var files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files.length) return;

      var file = files[0];
      setInputFile(fileInput, file);
      setSelectedFile(file);
    });

    if (fileInput) {
      fileInput.addEventListener("change", function () {
        var files = fileInput.files;
        if (files && files.length) {
          setSelectedFile(files[0]);
        }
      });
    }
  }

  setupDropZone(
    window.encryptDropZone,
    window.encryptFileInput,
    window.encryptDropFileName,
    "encrypt"
  );

  setupDropZone(
    window.decryptDropZone,
    window.decryptFileInput,
    window.decryptDropFileName,
    "decrypt"
  );
  // ==================================================
  // ===== ドラッグ＆ドロップ設定ブロックここまで =====
  // ==================================================


  // ==================================================
  // ===== ボタンイベント紐付けブロック =====
  // ==================================================
  if (window.encryptButton) {
    window.encryptButton.addEventListener("click", function () {
      if (typeof window.handleEncrypt === "function") {
        window.handleEncrypt();
      }
    });
  }

  if (window.decryptButton) {
    window.decryptButton.addEventListener("click", function () {
      if (typeof window.handleDecrypt === "function") {
        window.handleDecrypt();
      }
    });
  }
  // ==================================================
  // ===== ボタンイベント紐付けブロックここまで =====
  // ==================================================


  // ==================================================
  // ===== TOPへ戻るボタン制御ブロック =====
  // ==================================================
  if (window.backBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 200) {
        window.backBtn.style.display = "inline-flex";
      } else {
        window.backBtn.style.display = "none";
      }
    });

    window.backBtn.addEventListener("click", function () {
      var topEl = document.getElementById("page-top");
      if (topEl && topEl.scrollIntoView) {
        topEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
  // ==================================================
  // ===== TOPへ戻るボタン制御ブロックここまで =====
  // ==================================================

})();
