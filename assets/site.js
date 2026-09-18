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
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motion = document.querySelector('.motion-toggle');
  let paused = reduced.matches;
  const applyMotion = () => {
    document.documentElement.classList.toggle('motion-off', paused);
    if (motion) {
      motion.textContent = paused ? motion.dataset.resume : motion.dataset.pause;
      motion.setAttribute('aria-pressed', String(paused));
    }
  };
  motion?.addEventListener('click', () => { paused = !paused; applyMotion(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; applyMotion(); });
  applyMotion();
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-heading,.card,.principle-grid article,.company-section>div,.area-detail,.contact-band,.about-panel').forEach(el => {
      // Never conceal content already visible on initial load.
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-pending');
        observer.observe(el);
      }
    });
  }
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (paused) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      });
    });
  }
  const header = document.querySelector('.site-header');
  let scheduled = false;
  addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { header?.classList.toggle('scrolled', scrollY > 20); scheduled = false; });
  }, { passive: true });
})();
