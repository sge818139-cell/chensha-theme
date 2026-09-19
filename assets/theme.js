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
            '.price--last, .price--unit, .pcard-pay, .price__compare, ' +
            '.cart-item__price, .order-summary__price, .product-form__price, .price__current, ' +
            '.product-single__price, .product-single__sale-price'
          );
          allPriceElements.forEach(function (el) {
            // For elements with child elements, only convert direct text nodes
            if (el.children.length > 0) {
              // Get direct text content (not from child elements)
              var directText = '';
              el.childNodes.forEach(function (node) {
                if (node.nodeType === Node.TEXT_NODE) {
                  directText += node.textContent;
                }
              });

              if (directText.trim()) {
                var originalDirectText = el.getAttribute('data-original-direct-text');
                if (!originalDirectText) {
                  originalDirectText = directText;
                  el.setAttribute('data-original-direct-text', originalDirectText);
                }

                // Match ONLY prices that have a $ symbol AND decimal point (e.g. $128.00)
                // This prevents matching plain integers like "4 payments"
                var match = originalDirectText.match(/\$[\d,.]+\.\d{2}/);
                if (match) {
                  var originalPrice = parseFloat(match[0].replace(/[$,]/g, ''));
                  var convertedPrice = originalPrice * rate;

                  // Replace price in direct text
                  var newDirectText = originalDirectText
                    .replace(/\$[\d,.]+\.\d{2}/, symbol + convertedPrice.toFixed(2))
                    .replace(/€[\d,.]+\.\d{2}/, symbol + convertedPrice.toFixed(2));

                  // Update only the direct text nodes
                  var textIndex = 0;
                  el.childNodes.forEach(function (node) {
                    if (node.nodeType === Node.TEXT_NODE) {
                      node.textContent = newDirectText;
                    }
                  });
                }
              }
              return;
            }

            // Leaf elements - convert entire text
            var originalText = el.getAttribute('data-original-text');
            if (!originalText) {
              originalText = el.textContent;
              el.setAttribute('data-original-text', originalText);
            }

            // Match ONLY prices that have a $ symbol AND decimal point (e.g. $128.00)
            // This prevents matching plain integers like "4 payments"
            var match = originalText.match(/\$[\d,.]+\.\d{2}/);
            if (match) {
              var originalPrice = parseFloat(match[0].replace(/[$,]/g, ''));
              var convertedPrice = originalPrice * rate;

              var newText = originalText
                .replace(/\$[\d,.]+\.\d{2}/, symbol + convertedPrice.toFixed(2))
                .replace(/€[\d,.]+\.\d{2}/, symbol + convertedPrice.toFixed(2))
                .replace(/S\$[\d,.]+\.\d{2}/, symbol + convertedPrice.toFixed(2))
                .replace(/NT\$[\d,.]+\.\d{2}/, symbol + convertedPrice.toFixed(2))
                .replace(/HK\$[\d,.]+\.\d{2}/, symbol + convertedPrice.toFixed(2))
                .replace(/RM[\d,.]+\.\d{2}/, symbol + convertedPrice.toFixed(2));
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
