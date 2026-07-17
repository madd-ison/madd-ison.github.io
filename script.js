// Check for WebP support
var webp = new Image();
webp.onload = webp.onerror = function() {
  var supported = webp.height === 2;
  document.documentElement.classList.add(supported ? 'webp' : 'no-webp');
};
webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

// Enable passive event listeners
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() { supportsPassive = true; }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

// Add passive flag to scroll events
window.addEventListener('scroll', function() {}, supportsPassive ? { passive: true } : false);

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}
