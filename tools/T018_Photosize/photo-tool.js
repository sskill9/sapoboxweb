// ===== [写真変換] ファイル検証・容量調整・保存 =====
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const filesInput = $('photoFiles'), list = $('photoList'), status = $('photoStatus');
  const records = new Set();
  let sequence = 0, busy = false, loading = false, sampleLoading = false;
  let previewQueue = Promise.resolve();
  const choose = $('photoChoose'), selected = $('photoSelected');
  choose.addEventListener('click', () => filesInput.click());
  const sampleButton = $('photoSample'), sampleConfirm = $('sampleConfirm');
  let sampleAssetPromise = null;
  function hideSampleConfirm() { sampleConfirm.hidden = true; sampleButton.setAttribute('aria-expanded', 'false'); }
  function sampleAsset() {
    if (!sampleAssetPromise) sampleAssetPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script'); script.src = './sample-photo.js';
      script.onload = () => window.SAPO_PHOTO_SAMPLE ? resolve(window.SAPO_PHOTO_SAMPLE) : reject(new Error('サンプル写真のデータが見つかりません。'));
      script.onerror = () => reject(new Error('同梱のsample-photo.jsを読み込めません。フォルダ内のファイルをご確認ください。'));
      document.head.append(script);
    }).catch(error => { sampleAssetPromise = null; throw error; });
    return sampleAssetPromise;
  }
  async function useSample() {
    if (busy || loading || sampleLoading) return;
    hideSampleConfirm(); sampleLoading = true; refreshDisabled(); status.textContent = '同梱のサンプル写真を読み込み中…';
    try {
      const data = await sampleAsset(), binary = atob(data.base64), bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
      if (bytes.length !== data.bytes || data.type !== 'image/jpeg') throw new Error('サンプル写真のデータが不正です。元の同梱ファイルを戻してください。');
      const file = new File([bytes], data.fileName, { type: data.type });
      sampleLoading = false; await load([file], true);
    } catch (error) { status.textContent = `サンプルを読み込めませんでした。${error.message} 現在の画像はそのままです。`; }
    finally { sampleLoading = false; refreshDisabled(); }
  }
  sampleButton.addEventListener('click', () => {
    if (busy || loading || sampleLoading) return;
    if (!activeRecords().length) { useSample(); return; }
    $('sampleConfirmText').textContent = `選択中の「${activeRecords()[0].file.name}」と変換結果をサンプルに置き換えますか？`;
    sampleConfirm.hidden = false; sampleButton.setAttribute('aria-expanded', 'true'); $('sampleCancel').focus();
  });
  $('sampleCancel').addEventListener('click', () => { hideSampleConfirm(); sampleButton.focus(); });
  $('sampleReplace').addEventListener('click', useSample);
  const supported = new Set();
  const fmt = bytes => `${(bytes / (bytes >= 1000000 ? 1000000 : 1000)).toLocaleString('ja-JP', { maximumFractionDigits: 2 })} ${bytes >= 1000000 ? 'MB' : 'KB'}（${bytes.toLocaleString('ja-JP')} バイト）`;
  // ===== [複数画像] タブ保持・全件検証・UTF-8 ZIP =====
  let mode = 'single', batchWarning = '', zipURL = null;
  const activeRecords = () => [...records].filter(r => r.mode === mode);
  const multiRecords = () => [...records].filter(r => r.mode === 'multi');
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  // ===== [複数画像] 上下の出力カードを同じ状態に同期 =====
  const batchTop = $('batchTop'), batchBottom = batchTop.cloneNode(true);
  batchBottom.id = 'batchBottom'; batchBottom.setAttribute('aria-label', '複数画像の出力（一覧の下）');
  const batchPairs = [...batchTop.querySelectorAll('[id]')].map(source => {
    const target = batchBottom.querySelector(`#${source.id}`); target.id = `${source.id}Bottom`; return { source, target };
  });
  for (const el of batchBottom.querySelectorAll('[aria-describedby],[aria-controls],[aria-labelledby]')) {
    for (const attr of ['aria-describedby','aria-controls','aria-labelledby']) if(el.hasAttribute(attr)) el.setAttribute(attr,el.getAttribute(attr).split(' ').map(id=>`${id}Bottom`).join(' '));
  }
  // 状態の自動読み上げは上側だけ。下側も通常の読み上げ・操作で内容を確認できる。
  for (const el of batchBottom.querySelectorAll('[aria-live],[role="status"],[role="alert"]')) { el.removeAttribute('role'); el.setAttribute('aria-live','off'); }
  $('multiPanel').append(batchBottom);
  let batchOrigin = 'top';
  function syncBatchCopies() {
    for (const { source, target } of batchPairs) {
      target.hidden = source.hidden;
      if('disabled' in source) target.disabled = source.disabled;
      if(source.tagName === 'P' && target.textContent !== source.textContent) target.textContent = source.textContent;
    }
  }
  function focusBatchControl(id) { syncBatchCopies(); $(id + (batchOrigin === 'bottom' ? 'Bottom' : '')).focus(); }
  for (const { source, target } of batchPairs) if(source.tagName === 'BUTTON') target.addEventListener('click', () => {
    batchOrigin = 'bottom'; try { source.click(); syncBatchCopies(); } finally { batchOrigin = 'top'; }
  });
  new MutationObserver(syncBatchCopies).observe(batchTop,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['disabled','hidden']});
  syncBatchCopies();
  // ===== [複数画像] 上下の出力カードを同じ状態に同期 ここまで =====
  function updateSelection() {
    const rows = activeRecords();
    selected.textContent = mode === 'multi' ? `${rows.length} / 10枚を選択中（各画像で容量・形式を設定）` : rows.length ? `${rows[0].isSample ? 'サンプル選択中' : '選択中'}：${rows[0].file.name} ／ ${fmt(rows[0].file.size)}` : '写真はまだ選択されていません。';
  }
  function setMode(next) {
    if (busy || loading || sampleLoading) return;
    closeZoom(); hideSampleConfirm(); mode = next;
    tabs.forEach(t => { const on = t.dataset.mode === mode; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    $('singlePanel').hidden = mode !== 'single'; $('multiPanel').hidden = mode !== 'multi';
    filesInput.multiple = mode === 'multi'; choose.textContent = mode === 'multi' ? '写真を選択（最大10枚）' : '写真を選択（1枚ずつ）';
    for (const el of [sampleButton, $('sampleInfo'), document.querySelector('.sample-credit')]) el.hidden = mode === 'multi';
    $('multiHint').hidden = mode !== 'multi';
    updateSelection(); status.textContent = mode === 'multi' ? '最大10枚まで追加できます。単一画像タブの内容は保持しています。' : '単一画像モードです。複数画像タブの内容は保持しています。'; refreshDisabled();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => setMode(t.dataset.mode));
    t.addEventListener('keydown', e => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key) || busy || loading || sampleLoading) return;
      e.preventDefault(); const j = e.key === 'Home' ? 0 : e.key === 'End' ? 1 : 1-i;
      setMode(tabs[j].dataset.mode); tabs[j].focus();
    });
  });
  function updateBatch() {
    const rows = multiRecords(), ready = rows.filter(r => r.result).length;
    $('batchExport').disabled = busy || loading || sampleLoading || !rows.length || ready !== rows.length || !!batchWarning;
    $('batchReset').disabled = busy || loading || sampleLoading || (!rows.length && !batchWarning);
    $('batchWarning').hidden = !batchWarning; $('batchWarningText').textContent = batchWarning;
    $('batchSummary').textContent = `${rows.length}枚中 ${ready}枚の変換が完了${ready === rows.length && rows.length ? ` ／ 画像合計 ${fmt(rows.reduce((n,r)=>n+r.result.blob.size,0))}（ZIPの管理情報が別途加わります）` : '。全件の変換完了後にZIP保存できます。'}`;
    for (const t of tabs) t.disabled = busy || loading || sampleLoading;
    for(const id of ['batchAcknowledge','batchResetApply','batchResetCancel']) $(id).disabled = busy || loading || sampleLoading;
    syncBatchCopies();
  }
  $('batchAcknowledge').addEventListener('click', () => { batchWarning = ''; refreshDisabled(); if(!$('batchExport').disabled) focusBatchControl('batchExport'); else if(!$('batchReset').disabled) focusBatchControl('batchReset'); else choose.focus(); });
  $('batchReset').addEventListener('click', () => { $('batchResetConfirm').hidden = false; focusBatchControl('batchResetCancel'); });
  $('batchResetCancel').addEventListener('click', () => { $('batchResetConfirm').hidden = true; focusBatchControl('batchReset'); });
  $('batchResetApply').addEventListener('click', () => {
    if (busy || loading || sampleLoading) return;
    multiRecords().forEach(dispose); batchWarning = ''; $('batchResetConfirm').hidden = true;
    if (zipURL) URL.revokeObjectURL(zipURL); zipURL = null;
    updateSelection(); refreshDisabled(); $('batchMessage').textContent = '複数画像をリセットしました。単一画像と保存済みファイルは保持しています。'; choose.focus();
  });
  const crcTable = Uint32Array.from({length:256}, (_,n) => { for(let i=0;i<8;i++) n = n&1 ? 0xedb88320^(n>>>1) : n>>>1; return n>>>0; });
  async function crc32(bytes) {
    let crc = 0xffffffff;
    for(let start=0;start<bytes.length;start+=1048576) {
      const end=Math.min(start+1048576,bytes.length);
      for(let i=start;i<end;i++) crc=crcTable[(crc^bytes[i])&255]^(crc>>>8);
      await new Promise(resolve=>setTimeout(resolve,0));
    }
    return (crc^0xffffffff)>>>0;
  }
  function header(length) { const a=new Uint8Array(length); return {a,d:new DataView(a.buffer)}; }
  async function makeZip(rows) {
    const parts=[],central=[],encoder=new TextEncoder(), now=new Date(); let offset=0,centralSize=0;
    const year=Math.max(1980,Math.min(2107,now.getFullYear()));
    const time=(now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1), date=((year-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate();
    for(let i=0;i<rows.length;i++) {
      const r=rows[i],name=encoder.encode(r.plannedName),data=new Uint8Array(await r.result.blob.arrayBuffer()),crc=await crc32(data);
      const h=header(30); h.d.setUint32(0,0x04034b50,true);h.d.setUint16(4,20,true);h.d.setUint16(6,0x800,true);h.d.setUint16(10,time,true);h.d.setUint16(12,date,true);h.d.setUint32(14,crc,true);h.d.setUint32(18,data.length,true);h.d.setUint32(22,data.length,true);h.d.setUint16(26,name.length,true);
      parts.push(h.a,name,r.result.blob);
      const c=header(46);c.d.setUint32(0,0x02014b50,true);c.d.setUint16(4,20,true);c.d.setUint16(6,20,true);c.d.setUint16(8,0x800,true);c.d.setUint16(12,time,true);c.d.setUint16(14,date,true);c.d.setUint32(16,crc,true);c.d.setUint32(20,data.length,true);c.d.setUint32(24,data.length,true);c.d.setUint16(28,name.length,true);c.d.setUint32(42,offset,true);
      central.push(c.a,name);centralSize+=46+name.length;offset+=30+name.length+data.length;
      $('batchMessage').textContent=`ZIPを作成中：${i+1} / ${rows.length}枚`;
    }
    const end=header(22);end.d.setUint32(0,0x06054b50,true);end.d.setUint16(8,rows.length,true);end.d.setUint16(10,rows.length,true);end.d.setUint32(12,centralSize,true);end.d.setUint32(16,offset,true);
    return new Blob([...parts,...central,end.a],{type:'application/zip'});
  }
  $('batchExport').addEventListener('click', async () => {
    const rows=multiRecords();
    if (busy || loading || sampleLoading || batchWarning || !rows.length || rows.some(r=>!r.result)) return;
    if(rows.some(r=>r.result.target!==Number(r.card.querySelector('input').value)*1000 || r.result.type!==r.card.querySelector('select').value || r.result.blob.size>r.result.target)) {
      rows.forEach(schedulePreview); $('batchMessage').textContent='設定が変更されたため再計算しています。'; return;
    }
    busy=true;refreshDisabled();$('batchResetConfirm').hidden=true;
    try {
      const zip=await makeZip(rows),name=nameFor({name:'photos'},'image/jpeg').replace(/\.jpg$/,'.zip');
      if(zipURL)URL.revokeObjectURL(zipURL);zipURL=URL.createObjectURL(zip);
      const a=document.createElement('a');a.href=zipURL;a.download=name;document.body.append(a);a.click();a.remove();
      for(const r of rows){r.card.querySelector('.output-info').textContent=resultText(r,'ZIP出力確定');r.card.dataset.previewState='exported';}
      $('batchMessage').textContent=`${rows.length}枚を含むZIPの保存を開始しました：${name} ／ ${fmt(zip.size)}。完了はブラウザのダウンロード一覧で確認してください。`;
    } catch(error) { $('batchMessage').textContent=`ZIPを保存できませんでした：${error.message || 'メモリ不足またはブラウザの制限'}。画像は保持しています。`; }
    finally {busy=false;refreshDisabled();}
  });
  // ===== [複数画像] タブ保持・全件検証・UTF-8 ZIP ここまで =====

  const canvasBlob = (canvas, type, quality) => new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob && blob.type === type ? resolve(blob) : reject(new Error('このブラウザでは選択形式で書き出せません。')), type, quality);
  });
  // ===== [写真拡大] 単一モーダル・フォーカス復帰 =====
  const zoomDialog = document.createElement('dialog');
  zoomDialog.id = 'photoZoom'; zoomDialog.setAttribute('aria-labelledby', 'photoZoomTitle');
  zoomDialog.innerHTML = `<div class="dialog-header"><h2 id="photoZoomTitle" tabindex="-1">画像を拡大</h2><button type="button" class="zoom-close" aria-label="閉じる">×</button></div><div class="dialog-body"><img class="zoom-image" alt=""><p class="zoom-caption muted"></p></div><div class="dialog-footer"><button type="button" class="zoom-close">閉じる</button></div>`;
  document.body.append(zoomDialog);
  let zoomState = null, zoomClosing = false;
  const zoomImage = zoomDialog.querySelector('img');
  function closeZoom() { if (zoomDialog.open) { zoomClosing = true; zoomDialog.close(); zoomImage.removeAttribute('src'); } }
  zoomDialog.querySelectorAll('.zoom-close').forEach(button => button.addEventListener('click', closeZoom));
  zoomDialog.addEventListener('cancel', event => { event.preventDefault(); closeZoom(); });
  zoomDialog.addEventListener('close', () => {
    const previous = zoomState; zoomState = null; zoomClosing = false;
    zoomImage.removeAttribute('src'); zoomImage.alt = ''; zoomDialog.querySelector('.zoom-caption').textContent = '';
    if (!document.querySelector('dialog[open]')) {
      document.body.classList.remove('modal-open');
      const opener = previous?.opener;
      if (opener?.isConnected && !opener.disabled && opener.getClientRects().length) opener.focus(); else choose.focus();
    }
  });
  zoomDialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const buttons = [...zoomDialog.querySelectorAll('button')], first = buttons[0], last = buttons.at(-1);
    if (event.shiftKey && (document.activeElement === first || !buttons.includes(document.activeElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  let zoomBackdrop = false;
  const zoomOutside = e => { const r = zoomDialog.getBoundingClientRect(); return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom; };
  zoomDialog.addEventListener('pointerdown', e => { zoomBackdrop = e.target === zoomDialog && zoomOutside(e); });
  zoomDialog.addEventListener('click', e => { if (zoomBackdrop && e.target === zoomDialog && zoomOutside(e)) closeZoom(); zoomBackdrop = false; });
  function openZoom(r, which, opener) {
    if (!r.active || zoomClosing || document.querySelector('dialog[open]') || (which === 'converted' && !r.result)) return;
    if (which === 'original' && !r.originalURL) r.originalURL = URL.createObjectURL(r.blob);
    const src = which === 'original' ? r.originalURL : r.outputURL;
    if (!src) return;
    zoomState = { r, opener };
    zoomDialog.querySelector('h2').textContent = which === 'original' ? '変換前の画像' : '変換後の画像';
    zoomImage.alt = `${which === 'original' ? '変換前' : '変換後'}：${r.file.name}`; zoomImage.src = src;
    zoomDialog.querySelector('.zoom-caption').textContent = r.card.querySelector(which === 'original' ? '.original-info' : '.output-info').textContent;
    zoomDialog.showModal(); document.body.classList.add('modal-open'); zoomDialog.querySelector('h2').focus();
  }
  // ===== [写真拡大] 単一モーダル・フォーカス復帰 ここまで =====
  function limits(width, height) {
    if (!width || !height || width * height > 64000000 || width > 65535 || height > 65535) throw new Error('画像の寸法が不正、または6,400万画素を超えています。');
  }
  async function inspect(file) {
    if (file.size > 50000000) throw new Error('1枚50 MBまでです。');
    const a = new Uint8Array(await file.arrayBuffer()), d = new DataView(a.buffer);
    const str = (i, n) => String.fromCharCode(...a.subarray(i, i + n));
    let w = 0, h = 0, type = '';
    if (a.length >= 24 && a[0] === 137 && str(1, 7) === 'PNG\r\n\x1a\n') {
      type = 'image/png'; w = d.getUint32(16); h = d.getUint32(20);
      for (let i = 8; i + 12 <= a.length;) {
        const length = d.getUint32(i), name = str(i + 4, 4);
        if (name === 'acTL') throw new Error('アニメーションPNGは未対応です。');
        if (length > a.length - i - 12) throw new Error('PNGが破損しています。');
        i += 12 + length;
      }
    } else if (a.length > 4 && a[0] === 255 && a[1] === 216) {
      type = 'image/jpeg';
      for (let i = 2; i + 4 < a.length;) {
        if (a[i++] !== 255) throw new Error('JPEGが破損しています。');
        while (a[i] === 255) i++;
        const marker = a[i++];
        if (marker === 218 || marker === 217) break;
        if (marker === 1 || (marker >= 208 && marker <= 215)) continue;
        if (i + 2 > a.length) break;
        const length = d.getUint16(i);
        if (length < 2 || i + length > a.length) throw new Error('JPEGが破損しています。');
        if ([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(marker) && length >= 8) {
          h = d.getUint16(i + 3); w = d.getUint16(i + 5);
        }
        i += length;
      }
    } else if (a.length >= 30 && str(0, 4) === 'RIFF' && str(8, 4) === 'WEBP') {
      type = 'image/webp';
      for (let i = 12; i + 8 <= a.length;) {
        const name = str(i, 4), length = d.getUint32(i + 4, true), p = i + 8;
        if (length > a.length - p) throw new Error('WebPが破損しています。');
        if (name === 'ANIM' || name === 'ANMF' || (name === 'VP8X' && (a[p] & 2))) throw new Error('アニメーションWebPは未対応です。');
        if (name === 'VP8X' && length >= 10) { w = 1 + a[p+4] + (a[p+5]<<8) + (a[p+6]<<16); h = 1 + a[p+7] + (a[p+8]<<8) + (a[p+9]<<16); }
        if (!w && name === 'VP8 ' && length >= 10) { w = d.getUint16(p+6,true)&16383; h = d.getUint16(p+8,true)&16383; }
        if (!w && name === 'VP8L' && length >= 5) { const bits = d.getUint32(p+1,true); w = (bits&16383)+1; h = ((bits>>>14)&16383)+1; }
        i = p + length + (length % 2);
      }
    } else throw new Error('JPEG・PNG・静止WebPを選択してください（HEICなどは未対応）。');
    limits(w, h);
    return new Blob([a], { type });
  }
  async function decode(blob) {
    if (!window.createImageBitmap) throw new Error('このブラウザでは処理できません。新しいChrome・Edgeなどをご利用ください。');
    let bitmap;
    try { bitmap = await createImageBitmap(blob, { imageOrientation: 'from-image' }); }
    catch { throw new Error('画像を読み込めませんでした。破損しているか、このブラウザが対応していない画像です。別の写真を選んでください。'); }
    try { limits(bitmap.width, bitmap.height); } catch (e) { bitmap.close(); throw e; }
    return bitmap;
  }
  function draw(bitmap, w, h, type) {
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('画像処理用のメモリを確保できません。');
    if (type === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); }
    ctx.imageSmoothingQuality = 'high'; ctx.drawImage(bitmap, 0, 0, w, h);
    return canvas;
  }
  async function convert(blob, target, type, guard = () => {}) {
    const bitmap = await decode(blob);
    let canvas;
    try {
      guard();
      let scale = Math.min(1, 4096 / Math.max(bitmap.width, bitmap.height));
      for (let round = 0; round < 32; round++) {
        guard();
        const w = Math.max(1, Math.floor(bitmap.width * scale)), h = Math.max(1, Math.floor(bitmap.height * scale));
        canvas = draw(bitmap, w, h, type);
        let output = await canvasBlob(canvas, type, .94), best = null;
        guard();
        if (output.size <= target) best = output;
        else if (type === 'image/jpeg') {
          const lowBlob = await canvasBlob(canvas, type, .35); guard();
          if (lowBlob.size <= target) {
            best = lowBlob; let lo = .35, hi = .94;
            for (let i = 0; i < 8; i++) {
              const q = (lo + hi) / 2, trial = await canvasBlob(canvas, type, q);
              guard();
              if (trial.size <= target) { best = trial; lo = q; } else hi = q;
            }
          } else output = lowBlob;
        }
        if (best) {
          const verified = await decode(best);
          try { if (verified.width !== w || verified.height !== h || best.size > target) throw new Error('出力画像の検証に失敗しました。'); }
          finally { verified.close(); }
          guard();
          return { blob: best, width: w, height: h };
        }
        if (w === 1 && h === 1) break;
        scale *= Math.min(.85, Math.max(.2, Math.sqrt(target / output.size) * .9));
        canvas.width = canvas.height = 1;
      }
      throw new Error('指定容量以下にできませんでした。上限を大きくして再実行してください。保存はしていません。');
    } finally { bitmap.close(); if (canvas) canvas.width = canvas.height = 1; }
  }
  function refreshDisabled() {
    updateBatch();
    filesInput.disabled = choose.disabled = sampleButton.disabled = busy || loading || sampleLoading;
    for (const r of records) {
      for (const el of r.card.querySelectorAll('button,input,select')) el.disabled = busy || loading || sampleLoading;
      r.card.querySelector('.export').disabled = busy || loading || sampleLoading || !r.result;
      r.card.querySelector('.zoom-converted').disabled = busy || loading || sampleLoading || !r.result;
    }
  }
  function dispose(r) {
    if (zoomState?.r === r) closeZoom();
    if (r.originalURL) URL.revokeObjectURL(r.originalURL);
    r.active = false; r.revision++; clearTimeout(r.timer);
    URL.revokeObjectURL(r.thumbURL); if (r.outputURL) URL.revokeObjectURL(r.outputURL);
    r.result = null; records.delete(r); r.card.remove(); refreshDisabled();
  }
  // 300msの入力待ちと直列キュー。実行中のtoBlobは中断できないため、各待機後に世代を確認する。
  function schedulePreview(r) {
    if(r.mode === 'multi') $('batchMessage').textContent = '';
    if (zoomState?.r === r) closeZoom();
    const q = s => r.card.querySelector(s), revision = ++r.revision;
    clearTimeout(r.timer); r.result = null;
    if (r.outputURL) URL.revokeObjectURL(r.outputURL); r.outputURL = null;
    q('.converted').hidden = true; q('.converted').removeAttribute('src');
    q('.photo-placeholder').hidden = false; q('.photo-placeholder').textContent = '見込みを計算中…';
    q('.save-again').hidden = true; q('.output-info').textContent = '見込みを計算中…';
    q('.photo-result').textContent = '見込みを計算しています。設定変更やリセットは操作できます。保存はまだ行いません。';
    r.card.dataset.previewState = 'pending'; refreshDisabled();
    const current = () => r.active && records.has(r) && revision === r.revision;
    const guard = () => { if (!current()) throw new DOMException('新しい設定に切り替えました。', 'AbortError'); };
    r.timer = setTimeout(() => {
      previewQueue = previewQueue.catch(() => {}).then(async () => {
        if (!current()) return;
        const target = Number(q('input').value) * 1000, type = q('select').value;
        try {
          if (!Number.isFinite(target) || target < 1 || !supported.has(type)) throw new Error('上限または出力形式を選択し直してください。');
          const result = await convert(r.blob, target, type, guard); guard();
          r.result = { ...result, target, type };
          r.outputURL = URL.createObjectURL(result.blob);
          q('.converted').src = r.outputURL; q('.converted').hidden = false; q('.photo-placeholder').hidden = true;
          q('.output-info').textContent = resultText(r, '見込み（試算）');
          q('.photo-result').textContent = '上限以内の見込みです。エクスポートで、このプレビューと同じ画像データを保存します。';
          r.card.dataset.previewState = 'ready';
        } catch (error) {
          if (!current()) return;
          q('.photo-placeholder').textContent = '見込みを表示できません';
          q('.output-info').textContent = '試算に失敗しました';
          q('.photo-result').textContent = error.message || '画像を処理できませんでした。';
          r.card.dataset.previewState = 'error';
        } finally { if (current()) refreshDisabled(); }
      });
    }, 300);
  }
  function resultText(r, label) {
    const v = r.result;
    return `${label}：${fmt(v.blob.size)} ／ ${v.width} × ${v.height}px ／ 上限 ${v.target / 1000000} MB（${v.target.toLocaleString('ja-JP')} バイト）以内`;
  }
  function nameFor(file, type) {
    const date = new Date(), p = n => String(n).padStart(2, '0');
    const stamp = `${date.getFullYear()}${p(date.getMonth()+1)}${p(date.getDate())}_${p(date.getHours())}${p(date.getMinutes())}${p(date.getSeconds())}`;
    const stem = file.name.replace(/\.[^.]*$/, '').replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').replace(/[. ]+$/, '').slice(0, 70) || 'photo';
    return `${stem}_mail_${stamp}_${++sequence}.${type === 'image/jpeg' ? 'jpg' : 'png'}`;
  }
  function download(r) {
    const a = document.createElement('a'); a.href = r.outputURL; a.download = r.outputName; document.body.append(a); a.click(); a.remove();
  }
  async function add(file, isSample = false) {
    const blob = await inspect(file), bitmap = await decode(blob);
    let thumb;
    const width = bitmap.width, height = bitmap.height;
    try {
      const scale = Math.min(1, 512 / Math.max(width, height)), c = draw(bitmap, Math.max(1, Math.round(width*scale)), Math.max(1, Math.round(height*scale)), 'image/png');
      thumb = await canvasBlob(c, 'image/png'); c.width = c.height = 1;
    } finally { bitmap.close(); }
    const id = `photo-${++sequence}`, card = document.createElement('article'); card.className = 'photo-card';
    card.innerHTML = `<h2></h2><div class="photo-compare"><figure><button type="button" class="photo-zoom zoom-original" aria-label="変換前の画像を拡大"><img class="photo-preview original" alt="元画像のプレビュー"></button><figcaption class="original-info"></figcaption></figure><figure><div class="photo-placeholder">変換後の画像</div><button type="button" class="photo-zoom zoom-converted" aria-label="変換後の画像を拡大" disabled><img class="photo-preview converted" alt="変換後のプレビュー" hidden></button><figcaption class="output-info">未変換</figcaption></figure></div><p class="muted photo-zoom-hint">画像をクリック／タップして拡大</p><div class="photo-controls"><div><label for="${id}-limit">目標ファイルサイズの上限：<output class="photo-limit" for="${id}-limit">0.5 MB</output></label><input id="${id}-limit" type="range" min="100" max="10000" step="100" value="500"><small>0.1〜10 MB・0.1 MB刻み（最小100 KB）<br>1 MB = 1,000 KB = 1,000,000バイト</small></div><div><label for="${id}-type">出力形式</label><select id="${id}-type"><option value="image/jpeg">JPEG（透明部分は白）</option><option value="image/png">PNG（透明を維持）</option></select></div></div><p class="photo-filename">次のエクスポートの保存予定名：<strong class="planned-name"></strong></p><div class="photo-actions"><button type="button" class="primary export">エクスポート</button><button type="button" class="save-again" hidden>もう一度保存</button><button type="button" class="remove" aria-describedby="${id}-reset-help">リセット</button></div><p id="${id}-reset-help" class="muted">リセットすると選択画像・変換結果・変換設定をクリアします。元ファイルや保存済みファイルは消しません。</p><p class="photo-result" role="status" aria-live="polite">サイズと形式を選択してください。</p>`;
    const q = s => card.querySelector(s), thumbURL = URL.createObjectURL(thumb);
    const r = { file, blob, isSample, mode, card, thumbURL, outputURL: null, active: true, revision: 0, timer: null, result: null }; records.add(r);
    q('.zoom-original').addEventListener('click', e => openZoom(r, 'original', e.currentTarget));
    q('.zoom-converted').addEventListener('click', e => openZoom(r, 'converted', e.currentTarget));
    q('h2').textContent = `${isSample ? 'サンプル：' : ''}${file.name}`; q('.original').src = thumbURL;
    q('.original-info').textContent = `元：${fmt(file.size)} ／ ${width} × ${height}px`;
    for (const option of q('select').options) if (!supported.has(option.value)) { option.disabled = true; option.textContent += '（このブラウザは未対応）'; }
    q('select').value = [...supported][0] || '';
    const planName = () => { r.plannedName = nameFor(file, q('select').value); q('.planned-name').textContent = r.plannedName; };
    planName();
    q('select').addEventListener('change', () => { planName(); schedulePreview(r); });
    q('input').addEventListener('input', () => { const kb = Number(q('input').value); q('output').textContent = `${kb / 1000} MB${kb === 100 ? '（100 KB）' : ''}`; schedulePreview(r); });
    q('.remove').addEventListener('click', () => { if(busy || loading || sampleLoading)return; hideSampleConfirm(); dispose(r); updateSelection(); status.textContent = 'この画像をリセットしました。他の画像・元ファイル・保存済みファイルは保持しています。'; choose.focus(); });
    if(mode === 'multi') { q('.export').hidden = true; q('.save-again').hidden = true; q('.photo-filename').firstChild.textContent = 'ZIP内の保存予定名：'; }
    q('.save-again').addEventListener('click', () => { try { download(r); q('.photo-result').textContent = '保存を開始しました。完了はブラウザのダウンロード一覧で確認してください。'; } catch { q('.photo-result').textContent = '保存を開始できませんでした。ブラウザの設定をご確認ください。'; } });
    q('.export').addEventListener('click', () => {
      if (busy || loading || sampleLoading || !r.result) return;
      const target = Number(q('input').value) * 1000, type = q('select').value;
      if (r.result.target !== target || r.result.type !== type || r.result.blob.size > target) { schedulePreview(r); return; }
      r.outputName = r.plannedName;
      try {
        download(r); planName(); q('.save-again').hidden = false;
        q('.output-info').textContent = resultText(r, '出力確定');
        q('.photo-result').textContent = `上限達成・保存を開始しました：${r.outputName}。完了はブラウザのダウンロード一覧で確認してください。`;
        r.card.dataset.previewState = 'exported';
      } catch { q('.photo-result').textContent = '保存を開始できませんでした。エクスポートをもう一度お試しください。'; }
    });
    (mode === 'multi' ? $('multiList') : list).append(card); selected.textContent = `${isSample ? 'サンプル選択中' : '選択中'}：${file.name} ／ ${fmt(file.size)}`; schedulePreview(r);
  }
  async function load(files, isSample = false) {
    if (busy || loading || sampleLoading) { status.textContent = '処理が終わってから写真を追加してください。'; return; }
    if (!files.length) return;
    if (mode === 'single' && files.length !== 1) { status.textContent = '現在は1枚ずつ処理します。写真を1枚だけ選び直してください。現在の画像はそのままです。'; return; }
    if(mode === 'multi' && multiRecords().length + files.length > 10) {
      batchWarning = `追加すると10枚を超えます（選択済み${multiRecords().length}枚＋追加${files.length}枚）。今回は追加していません。10枚以内になるよう選び直してください。`;
      status.textContent = batchWarning; refreshDisabled(); filesInput.value=''; return;
    }
    const retained = [...records].filter(r => mode === 'multi' || r.mode !== 'single').reduce((n,r)=>n+r.file.size,0);
    if(retained + files.reduce((n,f)=>n+f.size,0) > 100000000) {
      const message='入力は両タブ合計100 MBまでです。今回は追加していません。不要な画像をリセットしてから選び直してください。';
      if(mode === 'multi')batchWarning=message;status.textContent=message;refreshDisabled();filesInput.value='';return;
    }
    hideSampleConfirm(); loading = true; refreshDisabled();
    const errors = [];
    try {
      for (const file of files) {
        status.textContent = `${file.name} を読み込み中…`;
        try {
          const previous = mode === 'single' ? activeRecords() : [];
          await add(file, isSample);
          for (const old of previous) dispose(old);
        } catch (error) { errors.push(`${file.name}：${error.message || '読み込めませんでした。'}`); }
      }
      if(mode === 'multi' && errors.length) batchWarning = [batchWarning, ...errors].filter(Boolean).join(' ／ ');
      updateSelection(); status.textContent = `${activeRecords().length}枚を選択中。${errors.join(' ／ ')}`;
    } finally { loading = false; filesInput.value = ''; refreshDisabled(); }
  }
  filesInput.addEventListener('change', () => load([...filesInput.files]));
  const drop = $('photoDrop');
  for (const name of ['dragenter','dragover']) drop.addEventListener(name, e => { e.preventDefault(); drop.parentElement.classList.add('dragging'); });
  drop.addEventListener('dragleave', () => drop.parentElement.classList.remove('dragging'));
  drop.addEventListener('drop', e => { e.preventDefault(); drop.parentElement.classList.remove('dragging'); load([...e.dataTransfer.files]); });
  window.addEventListener('dragover', e => e.preventDefault());
  window.addEventListener('drop', e => e.preventDefault());
  async function init() {
    filesInput.disabled = choose.disabled = sampleButton.disabled = true;
    const c = document.createElement('canvas'); c.width = c.height = 1;
    for (const type of ['image/jpeg','image/png']) { try { await canvasBlob(c,type,.8); supported.add(type); } catch {} }
    filesInput.disabled = choose.disabled = sampleButton.disabled = false;
    if (!supported.size || !window.createImageBitmap) { filesInput.disabled = choose.disabled = sampleButton.disabled = true; status.textContent = 'このブラウザは画像変換に対応していません。新しいChrome・Edgeなどでお試しください。'; }
  }
  init();
})();
// ===== [写真変換] ファイル検証・容量調整・保存 ここまで =====
