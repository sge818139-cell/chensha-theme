// CHENSHA theme — interactivity
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Clear any hash and scroll to top on load
    if (window.location.hash) {
      history.replaceState(null, document.title, window.location.pathname);
    }
    window.scrollTo(0, 0);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length > 1) {
          var target = document.querySelector(id);
          if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        }
      });
    });

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 40) { header.classList.add('is-scrolled'); }
        else { header.classList.remove('is-scrolled'); }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Mobile menu toggle
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('navLinks');
    if (toggle && nav) {
      var overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);

      var closeMenu = function () {
        nav.classList.remove('is-open');
        overlay.classList.remove('is-open');
      };
      toggle.addEventListener('click', function () {
        nav.classList.toggle('is-open');
        overlay.classList.toggle('is-open');
      });
      overlay.addEventListener('click', closeMenu);
      nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    }

    // Currency selector dropdown
    var currencyBtn = document.getElementById('currencyBtn');
    var currencyDropdown = document.getElementById('currencyDropdown');
    if (currencyBtn && currencyDropdown) {
      currencyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        currencyDropdown.classList.toggle('open');
      });
      document.addEventListener('click', function () {
        currencyDropdown.classList.remove('open');
      });
      currencyDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }
  });
})();
