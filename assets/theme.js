// CHENSHA theme — minimal interactivity
(function () {
  'use strict';
  // Mobile menu toggle placeholder (extend with a real drawer if needed)
  // Cart count auto-updates via Shopify's AJAX API if you want live counts.
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length > 1) {
          var target = document.querySelector(id);
          if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        }
      });
    });
  });
})();
