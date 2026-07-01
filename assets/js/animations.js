/* ==========================================================================
   Marta Colmenero — Scroll animations
   Requires: GSAP 3.15+, ScrollTrigger, SplitText (all local)
   ========================================================================== */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Disable all animations on screens narrower than 1024px
  if (window.innerWidth < 1024) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* -------------------------------------------------------------------------
     Helper: split element into lines + animate them
     opts.hero    = true  → plays immediately on load (no scroll trigger)
     opts.delay   = seconds (default 0)
     opts.stagger = seconds (default 0.09)
  -------------------------------------------------------------------------- */
  function revealLines(el, opts) {
    opts = opts || {};

    // Parent was hidden by CSS — make it visible now; children handle their own animation
    gsap.set(el, { opacity: 1 });

    var split = new SplitText(el, {
      type: 'lines',
      linesClass: 'anim-line'
    });

    // Wrap each line in an overflow:hidden mask so text rises from below
    split.lines.forEach(function (line) {
      var mask = document.createElement('div');
      mask.style.cssText = 'overflow:hidden;display:block';
      line.parentNode.insertBefore(mask, line);
      mask.appendChild(line);
    });

    var toVars = {
      yPercent:  0,
      opacity:   1,
      duration:  0.72,
      ease:      'power3.out',
      stagger:   opts.stagger !== undefined ? opts.stagger : 0.09,
      delay:     opts.delay || 0
    };

    if (!opts.hero) {
      toVars.scrollTrigger = {
        trigger:       el,
        start:         'top 88%',
        toggleActions: 'play none none none'
      };
    }

    gsap.fromTo(split.lines,
      { yPercent: 110, opacity: 0 },
      toVars
    );
  }

  /* =========================================================================
     DOM READY
  ========================================================================= */
  window.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------------------------------------
       1. HERO — plays on page load (no scroll trigger)
    ----------------------------------------------------------------------- */
    document.fonts.ready.then(function () {

      var avatar = document.querySelector('.hero-avatar');
      if (avatar) {
        gsap.fromTo(avatar,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 }
        );
      }

      var eyebrow = document.querySelector('.hero-eyebrow');
      if (eyebrow) revealLines(eyebrow, { hero: true, delay: 0.3 });

      var heroTitle = document.querySelector('.hero-title');
      if (heroTitle) revealLines(heroTitle, { hero: true, delay: 0.44, stagger: 0.11 });

      var heroActions = document.querySelector('.hero-actions');
      if (heroActions) {
        gsap.fromTo(heroActions,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.8 }
        );
      }

    });

    /* -----------------------------------------------------------------------
       2. WORK CARD IMAGES — fade-up on scroll
    ----------------------------------------------------------------------- */
    document.querySelectorAll('.work-card__media').forEach(function (el) {
      gsap.fromTo(el,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger:       el,
            start:         'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    /* -----------------------------------------------------------------------
       3. WORK CARD COPY — splitText on scroll
    ----------------------------------------------------------------------- */
    document.querySelectorAll('.work-card__title').forEach(function (el) {
      revealLines(el, { stagger: 0.08 });
    });
    document.querySelectorAll('.work-card__meta').forEach(function (el) {
      revealLines(el, { stagger: 0.06 });
    });

    /* -----------------------------------------------------------------------
       4. SECTION TITLES — splitText on scroll
    ----------------------------------------------------------------------- */
    document.querySelectorAll('.section-title').forEach(function (el) {
      revealLines(el, { stagger: 0.1 });
    });

    /* -----------------------------------------------------------------------
       5. ABOUT SECTION — portrait fade-up + copy splitText
    ----------------------------------------------------------------------- */
    var portrait = document.querySelector('.human-portrait-wrap');
    if (portrait) {
      gsap.fromTo(portrait,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger:       portrait,
            start:         'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    document.querySelectorAll('.lead-para').forEach(function (el) {
      revealLines(el, { stagger: 0.06 });
    });

    document.querySelectorAll('.section-human .col-12.col-lg-7 p:not(.lead-para)').forEach(function (el) {
      revealLines(el, { stagger: 0.05 });
    });

    /* -----------------------------------------------------------------------
       6. TESTIMONIALS + CONTACT — simple fade-up
    ----------------------------------------------------------------------- */
    document.querySelectorAll('.section-testimonials, .section-contact').forEach(function (el) {
      gsap.fromTo(el,
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger:       el,
            start:         'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

  });

})();
