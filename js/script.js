/* ============================================================
   PackNova Light Theme — script.js
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Loader ── */
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('out');
      setTimeout(() => loader.remove(), 600);
    }, 1700);
  }

  /* ── Navbar Scroll ── */
  const navbar = document.querySelector('.navbar');
  const isInnerPage = !!document.querySelector('.page-hero');
  function onScroll() {
    if (!navbar) return;
    if (isInnerPage) { navbar.classList.add('scrolled'); return; }
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile Menu ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const navOverlay= document.getElementById('nav-overlay');

  function openNav() {
    navLinks?.classList.add('open');
    hamburger?.classList.add('open');
    navOverlay?.classList.add('show');
    document.body.classList.add('menu-open');
  }
  function closeNav() {
    navLinks?.classList.remove('open');
    hamburger?.classList.remove('open');
    navOverlay?.classList.remove('show');
    document.body.classList.remove('menu-open');
  }
  hamburger?.addEventListener('click', () => navLinks?.classList.contains('open') ? closeNav() : openNav());
  navOverlay?.addEventListener('click', closeNav);
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeNav));

  /* ── Active nav ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('href') === page) l.classList.add('active');
  });

  /* ── Scroll Reveal ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Counter Animate ── */
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target, suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = target / (1800 / 16);
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.floor(cur).toLocaleString() + suffix;
        if (cur >= target) clearInterval(t);
      }, 16);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-target]').forEach(el => counterIO.observe(el));

  /* ── Progress bars ── */
  const progIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelector('.prog-fill')?.style.setProperty('width', e.target.querySelector('.prog-fill')?.dataset.width);
      progIO.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.prog-item').forEach(el => progIO.observe(el));

  /* ── FAQ ── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── Back to top ── */
  const btt = document.getElementById('btt');
  window.addEventListener('scroll', () => btt?.classList.toggle('show', window.scrollY > 400), { passive: true });
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Testimonials auto-rotate ── */
  let cur = 0;
  const slides = document.querySelectorAll('.testi-slide');
  const dots   = document.querySelectorAll('.testi-dot');
  function goSlide(n) {
    slides.forEach((s, i) => {
      s.style.display = i === n ? 'block' : 'none';
      dots[i]?.classList.toggle('active-dot', i === n);
    });
    cur = n;
  }
  if (slides.length) {
    goSlide(0);
    dots.forEach((d, i) => d.addEventListener('click', () => goSlide(i)));
    setInterval(() => goSlide((cur + 1) % slides.length), 5000);
  }

  /* ── Smooth hover tilt on cards ── */
  document.querySelectorAll('.prod-card, .ind-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-5px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    });
  });

  /* ── Typing effect ── */
  const typed = document.getElementById('typed');
  if (typed) {
    const words = ['Corrugated Boxes', 'Food Packaging', 'Pharma Packaging', 'Eco-Friendly Packs', 'E-Commerce Boxes'];
    let wi = 0, ci = 0, del = false;
    function type() {
      const w = words[wi];
      typed.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
      if (!del && ci > w.length)  { del = true;  setTimeout(type, 1400); return; }
      if (del  && ci < 0)         { del = false; wi = (wi + 1) % words.length; }
      setTimeout(type, del ? 55 : 85);
    }
    type();
  }

  /* ── Number ticker on hero stat ── */
  document.querySelectorAll('.hstat-num[data-target]').forEach(el => {
    counterIO.observe(el);
  });

  console.log('%cPackNova Industries — Light Theme', 'color:#1e4d3a;font-weight:900;font-size:1.2rem;');
});
