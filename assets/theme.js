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

      // Currency conversion
      var currencyFlag = document.getElementById('currencyFlag');
      var currencyCode = document.getElementById('currencyCode');
      var currencyOptions = currencyDropdown.querySelectorAll('.currency-option');

      currencyOptions.forEach(function (option) {
        option.addEventListener('click', function (e) {
          e.preventDefault();
          var currency = this.dataset.currency;
          var rate = parseFloat(this.dataset.rate);
          var symbol = this.dataset.symbol;

          // Update active state
          currencyOptions.forEach(function (o) { o.classList.remove('active'); });
          this.classList.add('active');

          // Update button display
          var flagText = this.querySelector('.currency-flag').textContent;
          currencyFlag.textContent = flagText;
          currencyCode.textContent = currency;

          // Convert all prices on the page
          var allPriceElements = document.querySelectorAll('.price, .pdp-price, .cart-price, .product-price, .pcard-price, .feat-price, .old, .pcard-pay');
          allPriceElements.forEach(function (el) {
            // Skip elements that have child elements (like .pcard-price which contains .old)
            if (el.children.length > 0) return;

            var originalText = el.getAttribute('data-original-text');
            if (!originalText) {
              originalText = el.textContent;
              el.setAttribute('data-original-text', originalText);
            }

            // Extract price number from text (only match prices with decimal point)
            var match = originalText.match(/[\d,.]+\.\d{2}/);
            if (match) {
              var originalPrice = parseFloat(match[0].replace(/,/g, ''));
              var convertedPrice = originalPrice * rate;

              // Replace price in original text, preserving surrounding text
              var newText = originalText.replace(/[\d,.]+\.\d{2}/, convertedPrice.toFixed(2));
              el.textContent = newText;
            }
          });

          // Close dropdown
          currencyDropdown.classList.remove('open');
        });
      });
    }
  });
})();
