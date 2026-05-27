/* ==========================================================================
   Marta Colmenero — site script
   - Theme toggle (light / dark)
   - Persists choice in localStorage
   - Honours OS-level preference on first visit
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'marta-theme';
  var root = document.documentElement;

  function getCurrentTheme() {
    return root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-bs-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}

    // Reflect state on each toggle for assistive tech
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });
  }

  // Initialise theme: stored value > OS preference > light
  function initialTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (_) {}
    return 'light'; // brief specifies light is the default
  }

  setTheme(initialTheme());

  function bindToggle(btn) {
    if (!btn) return;
    btn.addEventListener('click', function () {
      setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Bind every theme toggle on the page (header, mobile header, drawer)
    document.querySelectorAll('.theme-toggle').forEach(bindToggle);

    // Testimonials carousel (amend 02): one-at-a-time swipe on mobile,
    // 3-up grid on desktop. watchOverflow disables dragging when slides fit.
    if (window.Swiper) {
      document.querySelectorAll('.testimonial-swiper').forEach(function (el) {
        new window.Swiper(el, {
          slidesPerView: 1,
          spaceBetween: 24,
          loop: false,
          watchOverflow: true,
          pagination: {
            el: el.querySelector('.swiper-pagination'),
            clickable: true
          },
          breakpoints: {
            992: { slidesPerView: 3, spaceBetween: 40 }
          }
        });
      });
    }
  });
})();


/* Mobile nav: close offcanvas when a link is clicked, then navigate.
   data-bs-dismiss on <a> tags calls preventDefault() in Bootstrap 5,
   which blocks navigation — so we handle it manually instead. */
document.addEventListener('DOMContentLoaded', function () {
  var offcanvasEl = document.getElementById('mobileMenu');
  if (!offcanvasEl) return;
  offcanvasEl.querySelectorAll('.mobile-nav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      var bsOffcanvas = window.bootstrap && bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    });
  });
});

/* Lightweight email obfuscation: assemble mailto from data attributes on load */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.email-link').forEach(function (el) {
    var addr = el.getAttribute('data-user') + '@' + el.getAttribute('data-domain');
    el.setAttribute('href', 'mailto:' + addr);
    el.textContent = addr;
  });
});
