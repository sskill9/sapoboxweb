(function(){
  // 共通(/assets)があればそれを使い、なければツール内(./assets)を使う
  var v='20251021';
  function css(p,f){var l=document.createElement('link');l.rel='stylesheet';l.href=p+'?v='+v;l.onerror=function(){var x=document.createElement('link');x.rel='stylesheet';x.href=f+'?v='+v;document.head.appendChild(x);};document.head.appendChild(l);}
  function js(p,f,cb){var s=document.createElement('script');s.defer=true;s.src=p+'?v='+v;s.onload=function(){cb&&cb();};s.onerror=function(){var x=document.createElement('script');x.defer=true;x.src=f+'?v='+v;x.onload=function(){cb&&cb();};document.head.appendChild(x);};document.head.appendChild(s);}

  css('/assets/css/bootstrap.min.css','./assets/css/bootstrap.min.css');
  css('/assets/css/base.css','./assets/css/base.css');
  css('/assets/css/tools.css','./assets/css/tools.css');
  js('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js','./assets/js/bootstrap.bundle.min.js');
})();