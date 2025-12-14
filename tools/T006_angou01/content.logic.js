// ==================================================
// content.logic.js — 共通処理・暗号化／復号化ロジック
// ==================================================
(function () {
  "use strict";

  // ==================================================
  // ===== 共通ユーティリティブロック =====
  // ==================================================

  /**
   * ステータス表示
   * @param {HTMLElement} el
   * @param {string} msg
   */
  function setStatus(el, msg) {
    if (!el) return;
    el.textContent = msg || "";
  }

  /**
   * ドロップゾーン下のファイル名表示
   * @param {HTMLElement} el
   * @param {File|null} file
   */
  function setDropFileName(el, file) {
    if (!el) return;
    if (!file) {
      el.textContent = "";
      return;
    }
    el.textContent = "選択中： " + file.name;
  }

  /**
   * File → ArrayBuffer
   * @param {File} file
   * @returns {Promise<ArrayBuffer>}
   */
  function readFileAsArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      if (!file) {
        reject(new Error("ファイルが選択されていません。"));
        return;
      }

      if (file.arrayBuffer) {
        file.arrayBuffer().then(resolve).catch(reject);
        return;
      }

      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error || new Error("ファイル読み込みに失敗しました。"));
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // window へ公開（最小限）
  window.setStatus = setStatus;
  window.setDropFileName = setDropFileName;
  window.readFileAsArrayBuffer = readFileAsArrayBuffer;

  // ==================================================
  // ===== 共通ユーティリティブロックここまで =====
  // ==================================================


  // ==================================================
  // ===== 暗号化処理ブロック =====
  // ==================================================
  async function handleEncrypt() {
    try {
      setStatus(window.encryptStatus, "");

      var file =
        window.selectedEncryptFile ||
        (window.encryptFileInput &&
         window.encryptFileInput.files &&
         window.encryptFileInput.files[0]);

      var password = window.encryptPasswordInput
        ? String(window.encryptPasswordInput.value || "")
        : "";

      if (!file) {
        setStatus(window.encryptStatus, "暗号化するファイルを選択してください。");
        return;
      }

      if (!password) {
        setStatus(window.encryptStatus, "パスワードを入力してください。");
        return;
      }

      if (typeof window.angouEncryptArrayBuffer !== "function") {
        setStatus(
          window.encryptStatus,
          "暗号化関数が見つかりません。tool.js の読み込み順を確認してください。"
        );
        return;
      }

      setStatus(
        window.encryptStatus,
        "暗号化中…（ファイルサイズにより時間がかかる場合があります）"
      );

      var buffer = await readFileAsArrayBuffer(file);
      var encryptedBuffer = await window.angouEncryptArrayBuffer(buffer, password);

      var blob = new Blob([encryptedBuffer], {
        type: "application/octet-stream"
      });

      var outName =
        typeof window.angouMakeEncryptedFilename === "function"
          ? window.angouMakeEncryptedFilename(file.name)
          : String(file.name || "file") + ".angou";

      if (typeof window.angouDownloadBlob === "function") {
        window.angouDownloadBlob(blob, outName);
      } else {
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = outName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setStatus(
        window.encryptStatus,
        "完了： " + outName + " をダウンロードしました。"
      );

    } catch (e) {
      console.error(e);
      var msg = e && e.message ? String(e.message) : String(e);
      setStatus(window.encryptStatus, "エラー： " + msg);
    }
  }

  window.handleEncrypt = handleEncrypt;
  // ==================================================
  // ===== 暗号化処理ブロックここまで =====
  // ==================================================


  // ==================================================
  // ===== 復号化処理ブロック =====
  // ==================================================
  async function handleDecrypt() {
    try {
      setStatus(window.decryptStatus, "");

      var file =
        window.selectedDecryptFile ||
        (window.decryptFileInput &&
         window.decryptFileInput.files &&
         window.decryptFileInput.files[0]);

      var password = window.decryptPasswordInput
        ? String(window.decryptPasswordInput.value || "")
        : "";

      if (!file) {
        setStatus(
          window.decryptStatus,
          "復号化する .angou ファイルを選択してください。"
        );
        return;
      }

      if (!password) {
        setStatus(window.decryptStatus, "パスワードを入力してください。");
        return;
      }

      if (typeof window.angouDecryptArrayBuffer !== "function") {
        setStatus(
          window.decryptStatus,
          "復号化関数が見つかりません。tool.js の読み込み順を確認してください。"
        );
        return;
      }

      setStatus(
        window.decryptStatus,
        "復号化中…（ファイルサイズにより時間がかかる場合があります）"
      );

      var buffer = await readFileAsArrayBuffer(file);
      var decryptedBuffer = await window.angouDecryptArrayBuffer(buffer, password);

      var blob = new Blob([decryptedBuffer], {
        type: "application/octet-stream"
      });

      var outName =
        typeof window.angouMakeDecryptedFilename === "function"
          ? window.angouMakeDecryptedFilename(file.name)
          : String(file.name || "file.angou").replace(/\.angou$/i, "");

      if (typeof window.angouDownloadBlob === "function") {
        window.angouDownloadBlob(blob, outName);
      } else {
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = outName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setStatus(
        window.decryptStatus,
        "完了： " + outName + " をダウンロードしました。"
      );

// ===== 復号化エラーメッセージ整形ブロック =====
    } catch (e) {
      console.error(e);
      var msg = e && e.message ? String(e.message) : String(e);

      if (
        msg === "OperationError" ||
        msg.indexOf("OperationError") !== -1 ||
        msg.indexOf("The operation failed") !== -1 ||
        msg.indexOf("tag") !== -1 ||
        msg.indexOf("authenticate") !== -1 ||
        msg.indexOf("integrity") !== -1
      ) {
        if (window.decryptStatus) {
          window.decryptStatus.innerHTML =
            '<span class="fw-bold text-danger">⚠ パスワードが違います（暗号化時と同じパスワードを入力してください）</span>';
        } else {
          setStatus(window.decryptStatus, "暗号化時のパスワードと異なります");
        }
        return;
      }

      setStatus(window.decryptStatus, "エラー： " + msg);
    }
    // ===== 復号化エラーメッセージ整形ブロックここまで =====
  }

  window.handleDecrypt = handleDecrypt;
  // ==================================================
  // ===== 復号化処理ブロックここまで =====
  // ==================================================

})();

