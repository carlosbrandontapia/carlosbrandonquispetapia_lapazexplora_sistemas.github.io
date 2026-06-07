// ── TABS DE PANTALLAS ──────────────────────────────────────────────────────
 
(function initTabs() {
  var buttons = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');
 
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-tab');
 
      buttons.forEach(function(b) { b.classList.remove('active'); });
      panels.forEach(function(p) { p.classList.remove('active'); });
 
      btn.classList.add('active');
      var panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });
})();
 
// ── CONTADOR ANIMADO PARA ESTADÍSTICAS ────────────────────────────────────
 
(function initCounters() {
  var counters = document.querySelectorAll('.stat-num');
  var started = false;
 
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1200;
    var start = null;
 
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(step);
    }
 
    requestAnimationFrame(step);
  }
 
  function checkVisibility() {
    if (started) return;
    var hero = document.querySelector('.hero-stats');
    if (!hero) return;
    var rect = hero.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      started = true;
      counters.forEach(function(el) { animateCounter(el); });
    }
  }
 
  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
})();
 
// ── MENÚ HAMBURGUESA (MÓVIL) ──────────────────────────────────────────────
 
(function initNavToggle() {
  var toggle = document.getElementById('navToggle');
  var links = document.querySelector('.nav-links');
 
  if (!toggle || !links) return;
 
  toggle.addEventListener('click', function() {
    links.classList.toggle('open');
  });
 
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.addEventListener('click', function() {
      links.classList.remove('open');
    });
  });
})();
 
// ── ANIMACIÓN DE APARICIÓN AL HACER SCROLL ────────────────────────────────
 
(function initScrollFade() {
  var targets = document.querySelectorAll('.feature-card, .tech-card, .screen-preview');
 
  targets.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });
 
  function reveal() {
    targets.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }
 
  window.addEventListener('scroll', reveal);
  reveal();
})();
 
// ── NAVBAR: SOMBRA AL HACER SCROLL ────────────────────────────────────────
 
(function initNavbarShadow() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
 
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.09)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
})();
 
// ── SMOOTH SCROLL PARA LINKS DE ANCLA ─────────────────────────────────────
 
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        var offset = 70;
        var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();