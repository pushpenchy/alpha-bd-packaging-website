(function(){
  'use strict';

  /* ---------- THEME TOGGLE ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  var STORAGE_KEY = 'alpha-bd-theme';

  function getPreferredTheme(){
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch(e){}
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme){
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e){}
  }

  applyTheme(getPreferredTheme());

  if (themeBtn){
    themeBtn.addEventListener('click', function(){
      var current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(current);
    });
  }

  /* ---------- MOBILE NAV ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      mainNav.classList.toggle('is-open');
    });
    mainNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mainNav.classList.remove('is-open'); });
    });
  }

  /* ---------- PRODUCT TABS ---------- */
  var tabBtns = document.querySelectorAll('.cat-btn');
  var panels = document.querySelectorAll('.product-panel');
  tabBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var cat = btn.getAttribute('data-cat');
      tabBtns.forEach(function(b){ b.classList.remove('is-active'); });
      panels.forEach(function(p){ p.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var target = document.querySelector('.product-panel[data-panel="' + cat + '"]');
      if (target) target.classList.add('is-active');
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  var revealTargets = document.querySelectorAll(
    '.section-head, .about-grid, .vm-grid, .why-card, .process-line li, ' +
    '.industry-card, .group-card, .team-card, .contact-wrap, .founder-card'
  );
  revealTargets.forEach(function(el){ el.classList.add('reveal'); });

  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function(el){ io.observe(el); });
  } else {
    revealTargets.forEach(function(el){ el.classList.add('is-in'); });
  }

  /* ---------- SCROLL TOP BUTTON ---------- */
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn){
    window.addEventListener('scroll', function(){
      if (window.scrollY > 600) scrollTopBtn.classList.add('is-visible');
      else scrollTopBtn.classList.remove('is-visible');
    }, { passive:true });
    scrollTopBtn.addEventListener('click', function(){
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }

  /* ---------- HEADER SHADOW ON SCROLL ---------- */
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function(){
    if (!header) return;
    header.style.boxShadow = window.scrollY > 10 ? '0 1px 0 rgba(0,0,0,.04)' : 'none';
  }, { passive:true });

  /* ---------- CONTACT FORM (client-side only demo) ---------- */
  var form = document.getElementById('quoteForm');
  var formNote = document.getElementById('formNote');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var product = form.querySelector('[name="product"]').value;
      if (!name || !email){
        formNote.textContent = 'Please fill in your name and email.';
        formNote.classList.remove('success');
        return;
      }
      var subject = encodeURIComponent('Quote request: ' + product);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Company: ' + form.querySelector('[name="company"]').value + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + form.querySelector('[name="phone"]').value + '\n' +
        'Product interest: ' + product + '\n\n' +
        form.querySelector('[name="message"]').value
      );
      window.location.href = 'mailto:alphabdpack.yasin@gmail.com?subject=' + subject + '&body=' + body;
      formNote.textContent = 'Opening your email client to send the request…';
      formNote.classList.add('success');
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- ADDRESS LINK -> GOOGLE MAPS ---------- */
  var addrLink = document.getElementById('addrLink');
  if (addrLink){
    addrLink.href = 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('G.A. Bhaban Unit-6, Rajapur by Lane, Anderkilla, Chattogram, Bangladesh');
    addrLink.target = '_blank';
    addrLink.rel = 'noopener';
  }

})();
