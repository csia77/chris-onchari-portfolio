/* ==========================================================================
   Portfolio — Script
   Smooth scroll, mobile nav, scroll animations, active link highlighting
   ========================================================================== */

(function () {
  'use strict';

  // ---------- Mobile Nav Toggle ----------
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Scroll-triggered Fade-in ----------
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-stagger');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---------- Active Nav Link Highlighting ----------
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function highlightActiveNav() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav();

  // ---------- Close mobile nav on Escape ----------
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
})();
