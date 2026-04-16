document.addEventListener('DOMContentLoaded', () => {
  // Simple fade in on scroll
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

  // Carousel
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
