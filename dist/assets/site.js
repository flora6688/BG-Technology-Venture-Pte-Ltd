(() => {
  if (document.body.dataset.entry) {
    let language = 'en';
    try { if (localStorage.getItem('bg-language') === 'zh') language = 'zh'; } catch {}
    location.replace(new URL(language + '/', location.href));
    return;
  }
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.firstChild.textContent = toggle.dataset.open;
    nav.classList.remove('open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.firstChild.textContent = open ? toggle.dataset.close : toggle.dataset.open;
    nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { close(); toggle.focus(); }
  });
  document.addEventListener('click', event => { if (toggle && !event.target.closest('.nav-wrap')) close(); });
  document.querySelector('.language')?.addEventListener('click', event => {
    try { localStorage.setItem('bg-language', event.currentTarget.dataset.language); } catch {}
    if (location.hash) event.currentTarget.hash = location.hash;
  });
  document.documentElement.classList.add('js');
})();
