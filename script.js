(() => {
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('navMenu');

  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav__links a, .nav__cta').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Service cards: clicking anywhere on the card jumps to booking
  document.querySelectorAll('.service').forEach(card => {
    card.addEventListener('click', (e) => {
      // Let the inner anchor handle its own click
      if (e.target.closest('a, button')) return;
      const link = card.querySelector('.service__link');
      if (link) link.click();
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.querySelector('.service__link')?.click();
      }
    });
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
})();
