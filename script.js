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

  // NOTE: the proposal/contact form's submit handler lives inline on
  // contact.html (fetch + FormSubmit AJAX + mailto fallback). Do NOT
  // add a generic submit interceptor here — a previous version bound
  // to #contactForm and silently preventDefault'd, which would break
  // the live form (#proposalForm) the moment someone "fixed" the id.

  // ========================================================
  // Floating WhatsApp / quick-contact button — every page
  // ========================================================
  if (!document.getElementById('floatContact')) {
    const waNumber = '61413886800';
    const waText = encodeURIComponent("Hi Senger Engineering — I'd like to discuss a project.");
    const wrap = document.createElement('div');
    wrap.id = 'floatContact';
    wrap.className = 'float-contact';
    wrap.innerHTML = ''
      + '<a href="https://wa.me/' + waNumber + '?text=' + waText + '" '
      + '   target="_blank" rel="noopener" class="fc-btn fc-wa" aria-label="Chat on WhatsApp">'
      + '  <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">'
      + '    <path d="M16 3C9 3 3.4 8.6 3.4 15.6c0 2.5.7 4.9 2 7L3 29l6.6-2.3c2 1.1 4.2 1.7 6.5 1.7 7 0 12.6-5.6 12.6-12.6S23 3 16 3zm0 23.1c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1.4 1.4-3.8-.2-.4c-1.1-1.7-1.7-3.7-1.7-5.8 0-6 4.8-10.8 10.8-10.8 2.9 0 5.5 1.1 7.5 3.2 2 2 3.2 4.7 3.2 7.6-.1 5.9-4.9 10.7-11 10.7zm5.9-8.1c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1s-1.4-.5-2.6-1.6c-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.7.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1.1 1-1.1 2.5 1.1 2.9 1.3 3.1c.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.8.7.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.5-.4z"/>'
      + '  </svg>'
      + '  <span class="fc-label">Chat on WhatsApp</span>'
      + '</a>'
      + '<a href="tel:+61413886800" class="fc-btn fc-call" aria-label="Call the studio">'
      + '  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
      + '  </svg>'
      + '  <span class="fc-label">Call</span>'
      + '</a>';
    document.body.appendChild(wrap);
  }
})();
