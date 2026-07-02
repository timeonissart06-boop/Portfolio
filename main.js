document.addEventListener('DOMContentLoaded', () => {

  // ─── SCROLL PROGRESS ─────────────────────────────────────────────
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    const updateProgress = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      progress.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ─── NAV SCROLL ──────────────────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ─── FADE-IN ON SCROLL ───────────────────────────────────────────
  const fadeObs = new IntersectionObserver((entries) => {
    // Stagger elements entering in the same batch
    const intersecting = entries.filter(e => e.isIntersecting);
    intersecting.forEach((e, i) => {
      setTimeout(() => {
        e.target.classList.add('visible');
      }, i * 90);
      fadeObs.unobserve(e.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

  // ─── HERO PARALLAX ───────────────────────────────────────────────
  const heroImg = document.querySelector('.hero-img img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      heroImg.style.transform = `translateY(${window.scrollY * 0.11}px)`;
    }, { passive: true });
  }

  // ─── CAROUSEL ────────────────────────────────────────────────────
  document.querySelectorAll('.carousel').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const slides = track.querySelectorAll('img, .carousel-slide');
    const dots = wrapper.querySelectorAll('.carousel-dot');
    let current = 0;

    function goTo(n) {
      current = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    wrapper.querySelector('.carousel-btn.prev')?.addEventListener('click', () => goTo(current - 1));
    wrapper.querySelector('.carousel-btn.next')?.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    setInterval(() => goTo(current + 1), 4500);
  });

});
