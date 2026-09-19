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
          // Include all common price classes across homepage, PDP, cart, collections
          var allPriceElements = document.querySelectorAll(
            '.price, .pdp-price, .cart-price, .product-price, .pcard-price, .feat-price, ' +
            '.price__regular, .price__sale, .price-item, .product__price, .price-price, ' +
            '.price--last, .price--unit, .price__compare, .pdp-compare, ' +
            '.cart-item__price, .order-summary__price, .product-form__price, .price__current, ' +
            '.product-single__price, .product-single__sale-price'
          );
          
          allPriceElements.forEach(function (el) {
            // Skip elements that contain payment text (like "4 payments of ...")
            // We only want pure price elements
            var elementText = el.textContent || '';
            if (elementText.indexOf('payment') !== -1 || elementText.indexOf('Pay') !== -1) {
              return;
            }
            
            // Get original text
            var originalText = el.getAttribute('data-original-text');
            if (!originalText) {
              originalText = el.textContent.trim();
              el.setAttribute('data-original-text', originalText);
            }
            
            // Extract the price number from any format: $128.00, 128.00 USD, US$128, 1,280.00
            var priceMatch = originalText.match(/[\d,]+\.?\d*/);
            if (priceMatch) {
              var originalPrice = parseFloat(priceMatch[0].replace(/,/g, ''));
              if (isNaN(originalPrice) || originalPrice < 0.01) return;
              
              var convertedPrice = originalPrice * rate;
              // Replace entire element content with new price
              el.textContent = symbol + convertedPrice.toFixed(2);
            }
          });

          // Close dropdown
          currencyDropdown.classList.remove('open');
        });
      });
    }
  });
})();
