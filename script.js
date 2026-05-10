// ========================================================
// SENGER ENGINEERING — Shared Interactions
// ========================================================

(function () {
  // nav scroll state
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 12) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }, { passive: true });
  }

  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

  // animated counters
  const cIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const start = performance.now();
      const dur = 1600;
      const ease = t => 1 - Math.pow(1 - t, 3);
      function step(now) {
        const t = Math.min(1, (now - start) / dur);
        el.textContent = Math.floor(ease(t) * target);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      cIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.count').forEach(el => cIO.observe(el));

  // smooth anchors with offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // contact form (if present)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"] span');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = 'Sent ✓';
      setTimeout(() => { btn.textContent = original; form.reset(); }, 2400);
    });
  }
})();
