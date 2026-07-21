document.addEventListener('DOMContentLoaded', () => {

  // Every project image, excluding thumbnails that are themselves navigation links
  const targets = Array.from(document.querySelectorAll('.page img')).filter(img => !img.closest('a'));
  if (!targets.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Fermer">✕</button>
    <img class="lightbox-img" src="" alt="">
  `;
  document.body.appendChild(overlay);
  const overlayImg = overlay.querySelector('.lightbox-img');

  let lastFocused = null;

  function openLightbox(img) {
    lastFocused = document.activeElement;
    overlayImg.src = img.currentSrc || img.src;
    overlayImg.alt = img.alt || '';
    overlay.classList.add('active');
    document.body.classList.add('lightbox-open');
    overlay.querySelector('.lightbox-close').focus();
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  targets.forEach(img => {
    img.classList.add('lightbox-trigger');
    img.addEventListener('click', () => openLightbox(img));
  });

  // Clicking anywhere in the overlay closes it — the close button, the dark
  // backdrop, and the enlarged image itself (hence its zoom-out cursor).
  overlay.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeLightbox();
  });

});
