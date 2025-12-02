// howto.html／changelog.html を同階層から読み込む
(function () {
  const modals = [
    document.getElementById('modalHowto'),
    document.getElementById('modalChangelog')
  ].filter(Boolean);

  const loadedMap = new WeakMap();

  modals.forEach((modalEl) => {
    modalEl.addEventListener('show.bs.modal', async () => {
      const body = modalEl.querySelector('.modal-body');
      if (!body) return;
      if (loadedMap.get(body)) return;

      const file = body.getAttribute('data-file');
      if (!file) return;

      try {
        const res = await fetch(file, { cache: 'no-cache' });
        if (!res.ok) throw new Error('モーダル内容の読み込みに失敗しました');
        const html = await res.text();
        body.innerHTML = html;
        loadedMap.set(body, true);
      } catch (err) {
        console.error(err);
        body.innerHTML = '<p class="text-danger small mb-0">読み込みエラーが発生しました。</p>';
      }
    });
  });
})();
