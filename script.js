(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    burger.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      burger.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---------- FAQ accordion ---------- */
  var accordionItems = document.querySelectorAll('.accordion__item');
  accordionItems.forEach(function (item) {
    var trigger = item.querySelector('.accordion__trigger');
    trigger.addEventListener('click', function () {
      var wasOpen = item.classList.contains('is-open');
      accordionItems.forEach(function (i) { i.classList.remove('is-open'); });
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1200;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    '.pain__card, .benefit, .program-card, .review-card, .process__step, .float-card'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Cursor glow (desktop only) ---------- */
  var glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      glow.style.setProperty('--x', e.clientX + 'px');
      glow.style.setProperty('--y', e.clientY + 'px');
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 10px 30px -20px rgba(0,0,0,.6)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  /* ---------- Phone mask ---------- */
  var phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      var digits = e.target.value.replace(/\D/g, '').replace(/^7|^8/, '');
      digits = digits.substring(0, 10);
      var formatted = '+7';
      if (digits.length > 0) formatted += ' (' + digits.substring(0, 3);
      if (digits.length >= 3) formatted += ') ' + digits.substring(3, 6);
      if (digits.length >= 6) formatted += '-' + digits.substring(6, 8);
      if (digits.length >= 8) formatted += '-' + digits.substring(8, 10);
      e.target.value = formatted;
    });
  }

  /* ---------- Lead form submit (no backend) ---------- */
  var leadForm = document.getElementById('leadForm');
  var formSuccess = document.getElementById('formSuccess');

  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!leadForm.checkValidity()) {
        leadForm.reportValidity();
        return;
      }
      leadForm.classList.add('is-sent');
      formSuccess.classList.add('is-visible');
    });
  }
})();
