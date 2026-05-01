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
    bindToggle(document.getElementById('themeToggle'));
    bindToggle(document.getElementById('themeToggleMobile'));
  });
})();
