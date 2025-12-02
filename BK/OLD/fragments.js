// nav-tools.html を同階層から読み込む
(function () {
  const menu = document.getElementById('navToolsMenu');
  if (!menu) return;

  let cached = null;

  async function loadMenu() {
    if (cached) {
      menu.innerHTML = cached;
      return;
    }
    try {
      const res = await fetch('./nav-tools.html', { cache: 'no-cache' });
      if (!res.ok) throw new Error('メニューの読み込みに失敗しました');
      const html = await res.text();
      cached = html;
      menu.innerHTML = html;
    } catch (err) {
      console.error(err);
      menu.innerHTML = '<li><span class="dropdown-item text-danger">読み込みエラー</span></li>';
    }
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadMenu, { timeout: 1500 });
  } else {
    setTimeout(loadMenu, 300);
  }
})();
