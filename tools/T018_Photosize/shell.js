// ===== [UI] 共通枠 - ヘッダーとフッター =====
(function () {
  'use strict';
  const config = window.SAPO_TOOL;
  if (!config) return;
  // Version, filename and tag derive from one release record.
  const release = config.release || {};
  const validVersion = /^\d+\.\d+\.\d+$/.test(release.version || '');
  const validID = /^T\d{3}$/.test(config.id || '');
  const validRepo = /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/.test(release.repository || '');
  const releaseTag = validVersion && validID ? `${config.id.toLowerCase()}-v${release.version}` : '';
  const archiveName = validVersion && validID ? `${config.id}-v${release.version}.zip` : '';
  const distributionReady = !!archiveName && validRepo && release.published === true && release.sameArchiveVerified === true;
  const localZIP = value => typeof value === 'string' && /^(?:\.\/)?[A-Za-z0-9_-][A-Za-z0-9_.-]*\.zip$/i.test(value) && !value.replace(/^\.\//,'').includes('..') ? value : '';
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const externalURL = value => {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; }
    catch (_) { return ''; }
  };
  const link = (value, label, className = '') => {
    const url = externalURL(value);
    return url ? `<a class="${className}" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>` : `<span>${escapeHTML(label)}（準備中）</span>`;
  };
  // 旧footer.jsの既存SVG図形を再利用。アイコン画像の通信は行わない。
  const socialIcons = {"x": "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.64l-5.205-6.807-5.953 6.807H1.72l7.73-8.835L1.254 2.25h6.808l4.706 6.231 5.47-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", "facebook": "M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5v1.8H17l-.4 2.9h-2.7v7A10 10 0 0 0 22 12z"};
  const socialLink = (value, label, icon) => {
    const url = externalURL(value);
    if (!url) return `<span>${escapeHTML(label)}（準備中）</span>`;
    return `<a class="social-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(label)}（別タブで開く）" title="${escapeHTML(label)}"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${socialIcons[icon]}"></path></svg></a>`;
  };
  const utilityIcon = (path) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${path}</svg>`;
  const utilityButtons = [
    ['modalCalculator','簡易電卓','<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 10h1m5 0h2M8 14h1m5 0h2M8 18h1m5 0h2"/>'],
    ['modalClock','時計','<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>'],
    ['modalMemo','メモ','<path d="M5 2h10l4 4v16H5zM14 2v5h5M8 11h8M8 15h8M8 19h5"/>']
  ].map(([id,label,path]) => `<button type="button" class="utility-icon" data-modal="${id}" aria-label="${label}を開く" title="${label}">${utilityIcon(path)}</button>`).join('');

  const configuredEntry = config.downloads?.entryFile;
  const homeFile = typeof configuredEntry==='string' && /^(?!\/)(?!.*\.\.)[^:\\?#]+\.html?$/i.test(configuredEntry)
    ? configuredEntry : (location.pathname.split('/').pop() || 'index.html');
  const webEdition = config.headerLinks?.mode === 'web' && ['http:','https:'].includes(location.protocol);
  const brandHref = webEdition ? 'https://sapobako.com/' : homeFile;
  const brandLabel = webEdition ? 'サポ箱サイトへ' : `${config.name}の先頭へ`;
  document.title = `Support Tool Box | ${config.name}`;
  document.querySelector('meta[name="description"]').content = config.description;
  document.getElementById('tool-description').textContent = config.description;
  document.getElementById('top-block').innerHTML = `
    <header class="site-header"><div class="page-width header-inner">
      <a class="brand" href="${escapeHTML(brandHref)}" aria-label="${escapeHTML(brandLabel)}">
        <svg class="brand-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><g fill="none" stroke="white" stroke-width="2.4" stroke-linejoin="round"><path d="M11 10V6h10v4"/><rect x="3" y="10" width="26" height="18" rx="3"/><path d="M3 17h10m6 0h10"/><rect x="13" y="15" width="6" height="6" rx="1"/></g></svg><span>サポ箱<small>Support Tool Box</small></span>
      </a>
      <div class="tool-identity"><h1><a class="tool-home" href="${escapeHTML(homeFile)}" aria-label="${escapeHTML(config.name)}の先頭へ">${escapeHTML(config.name)}</a></h1><small class="tool-version">${validVersion ? `v${escapeHTML(release.version)}` : '版番号不明'}</small></div>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="toolNavbar">メニュー</button>
      <nav id="toolNavbar" aria-label="サポ箱ツール共通ナビゲーション">
        <button type="button" data-modal="modalHowto">使い方</button>
        <!-- T018では関連リンクのメニュー入口を表示しません。 -->
        <button type="button" data-modal="modalChangelog">更新履歴</button>
        ${config.downloads?.enabled === false ? '' : '<button type="button" data-modal="modalDownload">ダウンロード</button>'}
      </nav>
      <button class="settings-toggle" type="button" data-modal="modalAppearance" aria-label="設定を開く" title="設定"><span aria-hidden="true" style="font-size:1.4em;line-height:1">⚙︎</span></button>
    </div></header>`;
  document.getElementById('footer-block').innerHTML = `
    <footer class="site-footer"><div class="page-width footer-inner">
      <div class="footer-left"><div class="utility-launchers" aria-label="便利ツール">${utilityButtons}</div><a class="footer-home" href="${escapeHTML(externalURL(config.siteUrl))}" target="_blank" rel="noopener noreferrer" aria-label="サポ箱サイトを別タブで開く（インターネット接続が必要）" title="サポ箱サイトへ（インターネット接続が必要）">© Support Tool Box（サポ箱）</a></div>
      <div class="footer-actions"><button type="button" data-modal="modalTerms">利用規約</button>
        <span class="social-links">${socialLink(config.social.x, 'X', 'x')}${socialLink(config.social.facebook, 'Facebook', 'facebook')}</span>
      </div>
    </div></footer>`;
  const nav = document.getElementById('toolNavbar');
  const toggle = document.querySelector('.menu-toggle');
  const setMenu = open => { toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('keydown', event => { if (event.key === 'Escape') { setMenu(false); toggle.focus(); } });
  const mobileQuery = matchMedia('(max-width:760px)');
  mobileQuery.addEventListener('change', () => setMenu(false));
// ===== [UI] 共通枠 - ヘッダーとフッター ここまで =====

// ===== [UI] 共通モーダル - 開閉とダウンロード =====
  const modals = {...config.modals};
  const releaseChanges = Array.isArray(release.changes) ? release.changes.filter(value => typeof value === 'string') : [];
  const releaseHeading = `${release.date || '日付不明'} / ${validVersion ? `v${release.version}` : '版番号不明'}`;
  modals.modalChangelog = {title: '更新履歴', html:
    `<section><p class="release-heading"><span class="badge release-date">${escapeHTML(release.date || '日付不明')}</span><span class="badge release-version">${validVersion ? `v${escapeHTML(release.version)}` : '版番号不明'}</span></p><ul>${releaseChanges.map(text => `<li>${escapeHTML(text)}</li>`).join('')}</ul></section>` +
    `<section><h3>過去の記録（記載例を含む）</h3>${modals.modalChangelog?.html || '<p>記録なし</p>'}</section>`};
  modals.modalAppearance = {title:'設定', html:`
    <h3>表示</h3>
    <label for="themeSelect">配色</label><select id="themeSelect">
      <option value="blue">ブルー</option>
      <option value="green">グリーン</option>
      <option value="dark">ダーク</option>
      <option value="teal">ティール</option>
      <option value="purple">パープル</option>
      <option value="indigo">インディゴ</option>
      <option value="rose">ローズ</option>
      <option value="amber">アンバー</option>
      <option value="brown">ブラウン</option>
      <option value="slate">スレート</option>
    </select>
    <label for="fontSelect">文字サイズ</label><select id="fontSelect">
      <option value="14">小さめ（14px）</option><option value="16">標準（16px）</option><option value="18">大きめ（18px）</option><option value="20">さらに大きく（20px）</option><option value="22">最大（22px）</option>
    </select><p id="settingsStatus" class="muted" role="status"></p>
    <hr><div class="utility-actions"><button type="button" id="resetDisplayOpen" aria-expanded="false" aria-controls="resetConfirmation">表示設定を初期値に戻す</button><button type="button" id="resetToolsOpen" aria-expanded="false" aria-controls="resetConfirmation">便利ツールの内容を消去</button></div>
    <section id="resetConfirmation" hidden aria-labelledby="resetHeading"><h3 id="resetHeading"></h3><p id="resetDescription"></p><p>ダウンロード済みファイルや他ツールのデータは消しません。</p><div class="utility-actions"><button type="button" id="resetCancel">キャンセル</button><button type="button" id="resetConfirm"></button></div></section><p id="resetStatus" role="status"></p>`};
  const downloads = {...config.downloads,
    site: distributionReady ? `./${archiveName}` : '',
    git: distributionReady ? `https://github.com/${release.repository}/releases/tag/${releaseTag}` : ''};
  const downloadCard = (kind, name) => {
    const direct = kind === 'site' ? localZIP(downloads[kind]) : '';
    const url = direct || externalURL(downloads[kind]);
    return `<section class="download-option"><h3>${name}</h3>${url
      ? direct ? `<a class="button" href="${escapeHTML(direct)}" download="${escapeHTML(archiveName)}">ZIPをダウンロード</a>` : `<a class="button" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">この版のGit配布ページを開く ↗</a>`
      : '<button type="button" disabled>配布準備中</button>'}</section>`;
  };
  modals.modalDownload = {title:'ダウンロード',html:`
    <p class="download-intro">${escapeHTML(config.name)} / ${escapeHTML(releaseHeading)}</p>
    <p class="download-notice">${distributionReady ? 'WEB・Gitのどちらからでもダウンロードできます。配布内容は同じです。' : 'この版は未公開候補、または配布確認前です。人力確認と公開先の同一ZIP確認が完了するまで、配布リンクは表示しません。'}</p>
    <div class="download-options">${downloadCard('site','WEB')}${downloadCard('git','Git')}</div>
    <p>Gitでは上記の版に対応するZIPを選んでください。自動生成のSource code ZIPではありません。</p>
    <h3>保存してから使うまで</h3><ol><li>ZIPを保存します。</li><li>中身をすべて同じフォルダへ展開します。</li><li><code>${escapeHTML(homeFile)}</code> をブラウザで開きます。</li></ol>
    <p class="muted">外部サイトやGitへの接続、WEBからの取得にはインターネット接続が必要です。展開後の通常処理は同梱ファイルを使用します。ローカルHTMLの起動・保存は端末やブラウザにより制限されます。ZIP内から直接HTMLを開かないでください。</p>`};
  modals.modalCalculator = {title:'簡易電卓',html:`
    <label for="calcExpression">計算式</label><input id="calcExpression" type="text" inputmode="text" maxlength="200" autocomplete="off" spellcheck="false" aria-describedby="calcHint">
    <div class="calc-result-panel"><p id="calcResult" class="utility-result" role="status">結果：—</p><button type="button" id="calcCopy" disabled>結果をコピー</button><p id="calcCopyStatus" class="muted" role="status"></p></div>
    <div class="calc-keys">${['7','8','9','÷','4','5','6','×','1','2','3','−','0','.','(',')','C','⌫','=','+'].map(k=>`<button type="button" data-calc="${k}" aria-label="${({'C':'計算式をクリア','⌫':'末尾を1文字削除','=':'計算する','÷':'割る','×':'掛ける','−':'引く','+':'足す'})[k]||k}">${k}</button>`).join('')}</div>
    <p id="calcHint" class="muted">四則演算・小数・括弧に対応。入力欄の Enter で計算します。表示は有効数字12桁まで。割り切れない小数や桁数を超える小数は四捨五入します。整数部が12桁を超える結果は表示できません。小さい数の先頭の0は有効数字に含めません。計算後に演算子を押すと表示結果から続けて計算し、数字を押すと新しい計算を始めます。式を直接編集した場合は、その式を計算します。コピーするのは表示結果の数値だけです。入力200文字、内部の分子・分母は各200桁までです。</p>`};
  modals.modalClock = {title:'時計',html:`
    <label for="clockMode">機能</label><select id="clockMode"><option value="stopwatch">ストップウォッチ</option><option value="timer">タイマー</option></select>
    <div id="stopwatchPanel"><p class="clock-display" id="stopwatchDisplay" role="timer" aria-label="経過時間">00:00:00.0</p><div class="utility-actions"><button type="button" id="stopwatchToggle">開始</button><button type="button" id="stopwatchReset">リセット</button></div></div>
    <div id="timerPanel" hidden><div class="timer-inputs"><div><label for="timerMinutes">分（0〜999）</label><input id="timerMinutes" type="number" min="0" max="999" step="1" value="5" inputmode="numeric"></div><div><label for="timerSeconds">秒（0〜59）</label><input id="timerSeconds" type="number" min="0" max="59" step="1" value="0" inputmode="numeric"></div></div><p class="clock-display" id="timerDisplay" role="timer" aria-label="残り時間">00:05:00</p><div class="utility-actions"><button type="button" id="timerToggle">開始</button><button type="button" id="timerReset">リセット</button></div><p id="timerStatus" role="status"></p></div>
    <p class="muted">閉じても計測は続きます。端末の時刻を基準に計算します。時計の変更は計測に影響します。ブラウザ終了・スリープ中の通知は保証されません。音は鳴りません。終了時は開いている画面にも文字で通知します。読み上げの有無はブラウザや支援技術に依存します。</p>`};
  modals.modalMemo = {title:'メモ',html:`
    <label for="memoText">メモ本文</label><textarea id="memoText" rows="9" spellcheck="false" aria-describedby="memoHelp"></textarea>
    <p id="memoHelp" class="muted">このメモ画面を閉じても、同じページ内では内容を保持します。同じタブで再読み込みしたときの復元は、ブラウザの一時保存が利用できる場合に限ります。ブラウザの設定によっては一時保存できません。タブやブラウザを閉じる前に、必要なメモをテキストファイルで保存してください。</p>
    <div class="utility-actions"><button type="button" id="memoSave" class="primary" disabled>テキストファイルを保存</button><button type="button" id="memoClear">クリア</button><button type="button" id="memoUndo" hidden>クリアを取り消す</button></div><p id="memoSaveStatus" role="status"></p>`};

  let activeDialog = null;
  let opener = null;
  Object.entries(modals).forEach(([id, data]) => {
    const dialog = document.createElement('dialog');
    dialog.id = id;
    dialog.setAttribute('aria-labelledby', `${id}Label`);
    dialog.innerHTML = `<div class="dialog-header"><h2 id="${id}Label" tabindex="-1">${escapeHTML(data.title)}</h2><button type="button" data-close aria-label="閉じる">×</button></div><div class="dialog-body">${data.html}</div><div class="dialog-footer"><button type="button" data-close>閉じる</button></div>`;
    dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
    let backdropStart = false;
    const outside = event => { const rect = dialog.getBoundingClientRect(); return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom; };
    dialog.addEventListener('pointerdown', event => { backdropStart = event.target === dialog && outside(event); });
    dialog.addEventListener('click', event => { if (backdropStart && event.target === dialog && outside(event)) dialog.close(); backdropStart = false; });
    dialog.addEventListener('close', () => {
      activeDialog = null;
      document.body.classList.remove('modal-open');
      if (opener?.isConnected) (opener.getClientRects().length ? opener : toggle).focus();
    });
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const items = [...dialog.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),summary,[tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = items[0], last = items.at(-1);
      if (!first) { event.preventDefault(); dialog.querySelector('h2').focus(); return; }
      if (event.shiftKey && (document.activeElement === first || !items.includes(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    document.body.append(dialog);
  });
  document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.modal);
    if (!dialog || activeDialog || document.querySelector('dialog[open]')) return;
    opener = button;
    activeDialog = dialog;
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.querySelector('.dialog-body').scrollTop = 0;
    dialog.querySelector('h2').focus();
  }));
// ===== [UI] 共通モーダル - 開閉とダウンロード ここまで =====

// ===== [設定] 表示設定 - 保存とページ先頭操作 =====
  const settingsKey = `sapobako:${config.id}:appearance:v1`;
  const appearanceTabKey = `${settingsKey}:tab`;
  const themeSelect = document.getElementById('themeSelect');
  const fontSelect = document.getElementById('fontSelect');
  const status = document.getElementById('settingsStatus');
  let settings = {theme:'blue',font:'16'};
  const settingsReadWarnings=[];
  try {
    const saved = JSON.parse(localStorage.getItem(settingsKey) || '{}');
    if (saved && ["blue", "green", "dark", "teal", "purple", "indigo", "rose", "amber", "brown", "slate"].includes(saved.theme)) settings.theme = saved.theme;
    if (saved && ['14','16','18','20','22'].includes(saved.font)) settings.font = saved.font;
  } catch (_) { settingsReadWarnings.push('ブラウザ共通の設定を読み込めません。'); }
  // 他タブの表示を保持するため、現在タブの値をブラウザ共通値より優先する。
  try {
    const tabSaved=JSON.parse(sessionStorage.getItem(appearanceTabKey)||'null');
    if(tabSaved && [...themeSelect.options].some(o=>o.value===tabSaved.theme))settings.theme=tabSaved.theme;
    if(tabSaved && [...fontSelect.options].some(o=>o.value===tabSaved.font))settings.font=tabSaved.font;
  } catch (_) { settingsReadWarnings.push('このタブの設定を読み込めません。読み込めたブラウザ共通設定または初期値を使います。'); }
  try { sessionStorage.setItem(appearanceTabKey,JSON.stringify(settings)); }
  catch (_) { settingsReadWarnings.push('このタブの表示設定を保存できません。再読み込みで表示が変わる場合があります。'); }
  status.textContent=settingsReadWarnings.join('');
  const applySettings = () => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.style.fontSize = `${settings.font}px`;
    themeSelect.value = settings.theme;
    fontSelect.value = settings.font;
  };
  applySettings();
  if (!status.textContent) status.textContent = '表示設定はこのブラウザに保存します。ファイルの移動やブラウザの設定により、引き継がれない場合があります。';
  [themeSelect,fontSelect].forEach(select => select.addEventListener('change', () => {
    settings = {theme:themeSelect.value,font:fontSelect.value};
    applySettings();
    let commonSaved=false,tabSaved=false;
    try { localStorage.setItem(settingsKey,JSON.stringify(settings)); commonSaved=true; } catch (_) {}
    try { sessionStorage.setItem(appearanceTabKey,JSON.stringify(settings)); tabSaved=true; } catch (_) {}
    status.textContent=commonSaved&&tabSaved?'表示設定をブラウザ共通とこのタブの両方に保存しました。'
      :tabSaved?'このタブには保存しましたが、ブラウザ共通には保存できません。新しいタブでは以前の設定になる場合があります。'
      :commonSaved?'ブラウザ共通には保存しましたが、このタブには保存できません。再読み込み時は古いタブ設定が優先される場合があります。'
      :'表示は変更しましたが、ブラウザ共通・このタブのどちらにも保存できません。再読み込みで以前の設定に戻る場合があります。';
  }));
  document.querySelector('.local-note').textContent='このテンプレートは自動で外部通信をしません。表示設定はこのブラウザに、便利ツールの内容はこのタブに一時保存します。';
  const back = document.getElementById('backToTopBtn');
  const updateBack = () => { back.hidden = scrollY <= 200; };
  addEventListener('scroll',updateBack,{passive:true});
  updateBack();
  back.addEventListener('click', () => {
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    document.querySelector('.brand').focus({preventScroll:true});
  });
// ===== [設定] 表示設定 - 保存とページ先頭操作 ここまで =====

// ===== [機能] 便利ツール - 入力と時間とメモの保持 =====
  const utilityKey = `sapobako:${config.id}:utilities:v1`;
  const byId = id => document.getElementById(id);
  const draftNotice = document.createElement('p');
  draftNotice.className = 'muted utility-draft-status'; draftNotice.setAttribute('role','status');
  const utilityDialogs = ['modalCalculator','modalClock','modalMemo'].map(byId);
  utilityDialogs.forEach(d => d.querySelector('.dialog-body').append(draftNotice.cloneNode()));
  const draftStatus = text => utilityDialogs.forEach(d => { const notice=d.querySelector('.utility-draft-status');if(notice.textContent!==text)notice.textContent=text; });
  const initialUtilities = () => ({expression:'',result:'結果：—',calculatedExpression:'',calculatedValue:'',memo:'',mode:'stopwatch',elapsed:0,started:0,remaining:0,deadline:0,timerState:'idle',minutes:'5',seconds:'0'});
  let state = initialUtilities();
  try {
    const saved = JSON.parse(sessionStorage.getItem(utilityKey) || 'null');
    if (saved && typeof saved === 'object') {
      for (const k of ['expression','result','calculatedExpression','calculatedValue','memo','minutes','seconds']) if (typeof saved[k] === 'string') state[k] = saved[k];
      for (const k of ['elapsed','started','remaining','deadline']) if (Number.isFinite(saved[k]) && saved[k]>=0) state[k] = saved[k];
      if (['idle','running','paused','done'].includes(saved.timerState)) state.timerState=saved.timerState;
      if (['timer','stopwatch'].includes(saved.mode)) state.mode=saved.mode;
    }
  } catch (_) { draftStatus('一時保存を読み込めません。この画面を開いている間は利用できます。'); }
  const saveDraft = () => {
    try { sessionStorage.setItem(utilityKey,JSON.stringify(state)); draftStatus('このタブに一時保存しています。重要なメモはファイルにも保存してください。'); }
    catch (_) { draftStatus('一時保存できません。再読み込み・タブを閉じる操作で内容が失われるため、メモはファイルに保存してください。'); }
  };
  // 旧候補の一時保存に付いていた表記を数値へ戻す。メモ等の保存内容は変更しない。
  if (/^結果：約 -?\d+(?:\.\d+)?$/.test(state.result)) state.result=state.result.replace('結果：約 ','結果：');
  byId('calcExpression').value=state.expression;
  byId('calcResult').textContent=state.result;
  byId('memoText').value=state.memo;
  // BigInt の有理数で四則演算する。表示のみ有効数字12桁に四捨五入する。表示とコピーは数値のみ。
  // 入力200文字、途中の分子・分母各200桁まで。内部上限・整数部の表示上限超過時はエラーにする。
  const calculate = source => {
    const text=source.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/\s/g,'');
    if (!text || text.length>200) throw Error('計算式を1〜200文字で入力してください。');
    if (typeof BigInt !== 'function') throw Error('このブラウザでは正確な計算を利用できません。新しいブラウザを使ってください。');
    const zero=BigInt(0),one=BigInt(1),ten=BigInt(10);
    const abs=n=>n<zero?-n:n;
    const fraction=(n,d)=>{
      if(d===zero)throw Error('0では割れません。');
      if(d<zero){n=-n;d=-d;}
      let a=abs(n),b=d;while(b){const r=a%b;a=b;b=r;}
      n/=a;d/=a;
      if(abs(n).toString().length>200||d.toString().length>200)throw Error('正確に計算できる上限（分子・分母各200桁）を超えています。丸めた結果は表示しません。');
      return {n,d};
    };
    let pos=0;
    const atom = () => {
      if(text[pos]==='+'){pos++;return atom();}
      if(text[pos]==='-'){pos++;const v=atom();return {n:-v.n,d:v.d};}
      if(text[pos]==='('){pos++;const n=sum();if(text[pos++]!==')')throw Error('括弧を確認してください。');return n;}
      const m=text.slice(pos).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
      if(!m)throw Error('数字と + − × ÷ ( ) を使ってください。');
      pos+=m[0].length;const parts=m[0].split('.'),decimals=parts[1]||'';
      return fraction(BigInt((parts[0]||'0')+decimals),ten**BigInt(decimals.length));
    };
    const product = () => {let a=atom();while(text[pos]==='*'||text[pos]==='/'){const op=text[pos++],b=atom();a=op==='*'?fraction(a.n*b.n,a.d*b.d):fraction(a.n*b.d,a.d*b.n);}return a;};
    const sum = () => {let a=product();while(text[pos]==='+'||text[pos]==='-'){const op=text[pos++],b=product();a=fraction(a.n*b.d+(op==='+'?b.n:-b.n)*a.d,a.d*b.d);}return a;};
    const value=sum();if(pos!==text.length)throw Error('計算式を確認してください。');
    const n=abs(value.n),sign=value.n<zero?'-':'';
    const limitError=()=>Error('整数部が表示上限の12桁を超えています。結果は表示できません。');
    const integer=(n/value.d).toString();
    if(integer.length>12)throw limitError();
    let significant=n>=value.d?integer.length:0,places=0,remainder=n%value.d;
    // 小さい非ゼロ値の先頭の0は有効数字に数えず、0へ丸め落とさない。
    while(remainder&&significant<12){
      remainder*=ten;const digit=remainder/value.d;remainder%=value.d;places++;
      if(digit!==zero||significant)significant++;
    }
    const approximate=remainder!==zero;
    let scaled=n*(ten**BigInt(places))/value.d;
    // 四捨五入。同じ距離の場合は絶対値を大きい側へ丸める。
    if(approximate&&remainder*BigInt(2)>=value.d)scaled+=one;
    let digits=scaled.toString().padStart(places+1,'0');
    const whole=places?digits.slice(0,-places):digits;
    if(whole.length>12)throw limitError();
    const decimals=places?digits.slice(-places).replace(/0+$/,''):'';
    return sign+whole+(decimals?'.'+decimals:'');
  };
  const readExpression = () => {state.expression=byId('calcExpression').value;saveDraft();};
  const copyValue = () => state.result.startsWith('結果：') && /^-?\d+(?:\.\d+)?$/.test(state.result.slice(3)) ? state.result.slice(3) : '';
  const updateCopy = () => {byId('calcCopy').disabled=!copyValue();byId('calcCopyStatus').textContent='';};
  updateCopy();
  byId('calcCopy').addEventListener('click',async()=>{
    const value=copyValue();if(!value)return;
    let copied=false;
    try {if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);copied=true;}}catch(_){}
    if(!copied){
      const input=document.createElement('textarea');input.value=value;input.className='clipboard-helper';input.setAttribute('aria-label','コピー用の計算結果');byId('modalCalculator').append(input);
      try{input.focus();input.select();copied=document.execCommand('copy');}catch(_){}finally{input.remove();byId('calcCopy').focus();}
    }
    byId('calcCopyStatus').textContent=copied?'結果をコピーしました。':'コピーできませんでした。表示されている結果を選択してコピーしてください。';
  });
  const clearCalculated = () => {state.calculatedExpression='';state.calculatedValue='';};
  const runCalculation = () => {
    clearCalculated();
    try{state.calculatedValue=calculate(byId('calcExpression').value);state.calculatedExpression=byId('calcExpression').value;state.result='結果：'+state.calculatedValue;}
    catch(error){state.result=error.message;}
    byId('calcResult').textContent=state.result;updateCopy();readExpression();
  };
  // 計算後の演算は表示結果を左辺にする。式を編集した後は通常の式入力へ戻る。
  const continueCalculation = key => {
    const input=byId('calcExpression');
    if(!state.calculatedValue||input.value!==state.calculatedExpression||copyValue()!==state.calculatedValue)return false;
    if(/^[+−×÷*/-]$/.test(key))input.value=state.calculatedValue+key;
    else if(/^[0-9.(]$/.test(key))input.value=key==='.'?'0.':key;
    else return false;
    clearCalculated();readExpression();return true;
  };
  byId('calcExpression').addEventListener('input',()=>{clearCalculated();readExpression();});
  byId('modalCalculator').addEventListener('keydown',e=>{
    if(e.isComposing||e.target!==byId('calcExpression'))return;
    if(e.key==='Enter'){e.preventDefault();if(!e.repeat)runCalculation();return;}
    const input=byId('calcExpression');
    // 選択・途中位置での編集やショートカットは通常どおりに扱う。
    if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&input.selectionStart===input.value.length&&input.selectionEnd===input.value.length&&continueCalculation(e.key))e.preventDefault();
  });
  document.querySelectorAll('[data-calc]').forEach(b=>b.addEventListener('click',()=>{
    const input=byId('calcExpression'),key=b.dataset.calc;
    if(key==='='){runCalculation();return;}
    if(key==='C'){clearCalculated();input.value='';state.result='結果：—';byId('calcResult').textContent=state.result;updateCopy();}
    else if(key==='⌫'){clearCalculated();input.value=input.value.slice(0,-1);}
    else if(continueCalculation(key))return;
    else if(input.value.length<200){clearCalculated();input.value+=key;}
    readExpression();
  }));
  const formatTime = (milliseconds,tenths=false) => {
    const t=Math.max(0,milliseconds),s=tenths?Math.floor(t/1000):Math.ceil(t/1000);
    return [Math.floor(s/3600),Math.floor(s/60)%60,s%60].map(n=>String(n).padStart(2,'0')).join(':')+(tenths?'.'+Math.floor(t%1000/100):'');
  };
  const clockButton=document.querySelector('[data-modal="modalClock"]');
  const announcement=document.createElement('span');announcement.className='sr-only';announcement.setAttribute('role','status');document.body.append(announcement);
  let timerValidation='';
  const renderClock = () => {
    const now=Date.now();
    byId('stopwatchDisplay').textContent=formatTime(state.elapsed+(state.started?Math.max(0,now-state.started):0),true);
    byId('stopwatchToggle').textContent=state.started?'一時停止':(state.elapsed?'再開':'開始');
    if(state.timerState==='running'&&state.deadline<=now){state.remaining=0;state.deadline=0;state.timerState='done';(activeDialog?.querySelector('.dialog-body')||document.body).append(announcement);announcement.className=activeDialog?'timer-notice':'sr-only';announcement.textContent='タイマーが終了しました。';saveDraft();}
    const preview=(Number(byId('timerMinutes').value)*60+Number(byId('timerSeconds').value))*1000;
    byId('timerDisplay').textContent=formatTime(state.timerState==='running'?state.deadline-now:state.timerState==='idle'?(Number.isFinite(preview)?preview:0):state.remaining);
    byId('timerToggle').textContent=state.timerState==='running'?'一時停止':state.timerState==='paused'?'再開':'開始';
    byId('timerMinutes').disabled=byId('timerSeconds').disabled=['running','paused'].includes(state.timerState);
    const timerMessage=timerValidation || (state.timerState==='done'?'タイマーが終了しました。':state.timerState==='running'?'計測中':state.timerState==='paused'?'一時停止中':'');
    if(byId('timerStatus').textContent!==timerMessage)byId('timerStatus').textContent=timerMessage;
    clockButton.classList.toggle('timer-done',state.timerState==='done');
    clockButton.title=state.timerState==='done'?'時計：タイマー終了':'時計';
    clockButton.setAttribute('aria-label',state.timerState==='done'?'時計を開く：タイマーが終了しました':'時計を開く');
  };
  const setMode=()=>{state.mode=byId('clockMode').value;byId('stopwatchPanel').hidden=state.mode!=='stopwatch';byId('timerPanel').hidden=state.mode!=='timer';};
  byId('clockMode').value=state.mode;setMode();
  byId('clockMode').addEventListener('change',()=>{setMode();saveDraft();});
  byId('timerMinutes').value=state.minutes;byId('timerSeconds').value=state.seconds;
  ['timerMinutes','timerSeconds'].forEach(id=>byId(id).addEventListener('input',()=>{timerValidation='';state.minutes=byId('timerMinutes').value;state.seconds=byId('timerSeconds').value;if(state.timerState==='done')state.timerState='idle';saveDraft();renderClock();}));
  byId('stopwatchToggle').addEventListener('click',()=>{if(state.started){state.elapsed+=Math.max(0,Date.now()-state.started);state.started=0;}else state.started=Date.now();saveDraft();renderClock();});
  byId('stopwatchReset').addEventListener('click',()=>{state.elapsed=0;state.started=0;saveDraft();renderClock();});
  byId('timerToggle').addEventListener('click',()=>{
    if(state.timerState==='running'){state.remaining=Math.max(0,state.deadline-Date.now());state.deadline=0;state.timerState=state.remaining?'paused':'done';}
    else {
      if(state.timerState!=='paused'){
        const m=byId('timerMinutes'),s=byId('timerSeconds');
        if(!m.value||!s.value||!m.checkValidity()||!s.checkValidity()||Number(m.value)*60+Number(s.value)<=0){timerValidation=byId('timerStatus').textContent='分は0〜999、秒は0〜59の整数で、合計1秒以上を入力してください。';return;}
        state.remaining=(Number(m.value)*60+Number(s.value))*1000;
      }
      state.deadline=Date.now()+state.remaining;state.timerState='running';announcement.textContent='';
    }
    timerValidation='';saveDraft();renderClock();
  });
  byId('timerReset').addEventListener('click',()=>{timerValidation='';state.remaining=0;state.deadline=0;state.timerState='idle';announcement.textContent='';saveDraft();renderClock();});
  renderClock();setInterval(renderClock,250);document.addEventListener('visibilitychange',renderClock);
  const hasMemoContent = () => byId('memoText').value.trim().length > 0;
  const updateMemoSave = () => { byId('memoSave').disabled = !hasMemoContent(); };
  updateMemoSave();
  let clearedMemo=null;
  byId('memoClear').addEventListener('click',()=>{
    if(!byId('memoText').value)return;
    clearedMemo=byId('memoText').value;state.memo='';byId('memoText').value='';byId('memoUndo').hidden=false;updateMemoSave();
    byId('memoSaveStatus').textContent='メモをクリアしました。入力を始める前なら取り消せます。';saveDraft();byId('memoText').focus();
  });
  byId('memoUndo').addEventListener('click',()=>{
    if(clearedMemo===null)return;
    state.memo=clearedMemo;byId('memoText').value=state.memo;clearedMemo=null;byId('memoUndo').hidden=true;updateMemoSave();
    byId('memoSaveStatus').textContent='クリア前のメモを戻しました。';saveDraft();byId('memoText').focus();
  });
  byId('memoText').addEventListener('input',()=>{clearedMemo=null;byId('memoUndo').hidden=true;state.memo=byId('memoText').value;updateMemoSave();byId('memoSaveStatus').textContent='';saveDraft();});
  byId('memoSave').addEventListener('click',()=>{
    if (!hasMemoContent()) { updateMemoSave(); byId('memoSaveStatus').textContent='保存するメモを入力してください。'; return; }
    let url,anchor;
    try {
      const date=new Date(),pad=n=>String(n).padStart(2,'0');
      const name=String(date.getFullYear()).padStart(4,'0')+pad(date.getMonth()+1)+pad(date.getDate())+'_'+pad(date.getHours())+pad(date.getMinutes())+pad(date.getSeconds())+'memo.txt';
      url=URL.createObjectURL(new Blob([byId('memoText').value],{type:'text/plain;charset=utf-8'}));
      anchor=document.createElement('a');anchor.href=url;anchor.download=name;document.body.append(anchor);anchor.click();
      byId('memoSaveStatus').textContent=name+' のダウンロードを開始しました。保存完了はブラウザのダウンロード一覧で確認してください。';
    } catch (_) { byId('memoSaveStatus').textContent='ファイル保存を開始できませんでした。メモは残っています。再試行するか本文をコピーしてください。'; }
    finally {anchor?.remove();if(url)setTimeout(()=>URL.revokeObjectURL(url),60000);}
  });
  const resetPanel=byId('resetConfirmation');
  const resetButtons=[byId('resetDisplayOpen'),byId('resetToolsOpen')];
  let resetMode=null,resetOpener=null;
  const hideReset = () => {resetPanel.hidden=true;resetButtons.forEach(b=>b.setAttribute('aria-expanded','false'));resetMode=null;};
  const showReset = (mode,button) => {
    resetMode=mode;resetOpener=button;resetPanel.hidden=false;resetButtons.forEach(b=>b.setAttribute('aria-expanded',String(b===button)));
    byId('resetHeading').textContent=mode==='display'?'表示設定を初期値に戻しますか？':'便利ツールの内容を消去しますか？';
    byId('resetDescription').textContent=mode==='display'
      ?'配色をブルー、文字サイズを標準（16px）に戻します。メモ・簡易電卓・時計の内容や計測はそのままです。今後新しく開くタブの標準も初期値になります。すでに開いている改修版の別タブは自身の表示設定を保持します。'
      :'このタブのメモ本文・クリア取消用の内容、簡易電卓の式・結果、時計の計測・終了表示と関連する一時保存を消去します。ストップウォッチは0、タイマーは5分の停止状態に戻ります。配色・文字サイズは変えません。取り消せないため、必要なメモは先に保存してください。';
    byId('resetConfirm').textContent=mode==='display'?'表示設定を戻す':'便利ツールを消去する';
    byId('resetStatus').textContent='';byId('resetCancel').focus();
  };
  resetButtons[0].addEventListener('click',()=>showReset('display',resetButtons[0]));
  resetButtons[1].addEventListener('click',()=>showReset('tools',resetButtons[1]));
  byId('resetCancel').addEventListener('click',()=>{hideReset();resetOpener.focus();});
  byId('modalAppearance').addEventListener('close',hideReset);
  byId('resetConfirm').addEventListener('click',()=>{
    if(!resetMode)return;
    let message;
    if(resetMode==='display'){
      const failed=[];
      try{localStorage.removeItem(settingsKey);}catch(_){failed.push('ブラウザ共通の表示設定');}
      settings={theme:'blue',font:'16'};applySettings();
      try{sessionStorage.setItem(appearanceTabKey,JSON.stringify(settings));}catch(_){failed.push('このタブの表示設定');}
      status.textContent='表示設定を初期値に戻しました。';
      message=failed.length?'画面の表示設定は戻しましたが、'+failed.join('・')+'の保存処理に失敗しました。再読み込みで古い値が戻る場合があります。':'表示設定だけを初期値に戻しました。便利ツールの内容と計測は維持しています。';
    }else{
      let failed=false;try{sessionStorage.removeItem(utilityKey);}catch(_){failed=true;}
      state=initialUtilities();clearedMemo=null;timerValidation='';announcement.textContent='';
      byId('calcExpression').value='';byId('calcResult').textContent=state.result;updateCopy();
      byId('memoText').value='';updateMemoSave();byId('memoUndo').hidden=true;byId('memoSaveStatus').textContent='';
      byId('clockMode').value=state.mode;setMode();byId('timerMinutes').value='5';byId('timerSeconds').value='0';renderClock();draftStatus('');
      message=failed?'画面の便利ツールは消去しましたが、一時保存を削除できませんでした。再読み込みで古い内容が戻る場合があります。':'このタブの便利ツールを消去しました。表示設定は維持しています。';
    }
    hideReset();byId('resetStatus').textContent=message;resetOpener.focus();
  });
})();
// ===== [機能] 便利ツール - 入力と時間とメモの保持 ここまで =====
