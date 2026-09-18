/* motion.js — reveal on scroll, bar fills, lightbox, theme toggle.

   Every effect checks reducedMotion() first, and nothing is ever left hidden
   by a disabled animation: the CSS baseline for .rv is overridden to visible
   under prefers-reduced-motion. */
(function (TRIP) {
  'use strict';

  var U = TRIP.util;
  var el = U.el;

  function reducedMotion() {
    return window.matchMedia &&
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- reveal ------------------------------------------------------ */

  /** Animate elements in once, then stop observing them so they never replay. */
  function reveal(root) {
    var nodes = U.$$('.rv', root || document);
    if (!nodes.length) return;

    if (reducedMotion() || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);            // once only
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------- score bars -------------------------------------------------- */

  /**
   * Animate bars up from zero as their group scrolls into view.
   *
   * render.js already set --v to the true proportion, so this only borrows it:
   * collapse to 0, then release. Anything that stops this running leaves the
   * bars correct rather than empty.
   */
  function bars(root) {
    var groups = U.$$('.bars', root || document);
    if (!groups.length) return;

    // Reduced motion, or no observer: leave them exactly as rendered.
    if (reducedMotion() || !('IntersectionObserver' in window)) return;

    function fill(group) {
      U.$$('.bar__fill', group).forEach(function (f, i) {
        var target = f.dataset.v || '0';
        setTimeout(function () { f.style.setProperty('--v', target); }, 40 * i);
      });
    }

    // Collapse first, in the same frame, so there is no visible jump.
    groups.forEach(function (g) {
      U.$$('.bar__fill', g).forEach(function (f) { f.style.setProperty('--v', '0'); });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        fill(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.25 });

    groups.forEach(function (g) { io.observe(g); });
  }

  /* ---------- count up ---------------------------------------------------- */

  function countUp(node, to, ms) {
    if (!node) return;
    if (reducedMotion()) { node.textContent = U.one(to); return; }
    var start = null, dur = ms || 650;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      node.textContent = U.one(to * eased);
      if (t < 1) requestAnimationFrame(step);
      else node.textContent = U.one(to);
    }
    requestAnimationFrame(step);
  }

  /* ---------- lightbox ---------------------------------------------------- */

  var lbOpen = null;

  function lightbox(loc, photo) {
    closeLightbox();

    var img = el('img', {
      src: 'locations/' + loc.id + '/photos/' + photo.file,
      alt: photo.title || (loc.name + ' photograph')
    });

    var close = el('button', {
      class: 'lb__close', type: 'button', 'aria-label': 'Close photo'
    }, '✕');

    var overlay = el('div', {
      class: 'lb', role: 'dialog', 'aria-modal': 'true',
      'aria-label': photo.title || 'Photograph'
    }, [
      close,
      el('figure', { class: 'lb__fig' }, [
        img,
        el('figcaption', { class: 'lb__cap' }, [
          photo.title ? el('div', photo.title) : null,
          el('div', TRIP.render.creditLine(photo))
        ])
      ])
    ]);

    var previouslyFocused = document.activeElement;

    function onKey(e) {
      if (e.key === 'Escape') { closeLightbox(); return; }
      if (e.key !== 'Tab') return;
      // Only two focusables; keep the ring inside the dialog.
      var focusables = U.$$('button, a[href]', overlay);
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
    close.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', onKey);

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    // Next frame so the opacity transition actually runs.
    requestAnimationFrame(function () { overlay.dataset.open = 'true'; });
    close.focus();

    lbOpen = { overlay: overlay, onKey: onKey, restore: previouslyFocused };
  }

  function closeLightbox() {
    if (!lbOpen) return;
    var o = lbOpen;
    lbOpen = null;
    document.removeEventListener('keydown', o.onKey);
    document.body.style.overflow = '';
    o.overlay.dataset.open = 'false';

    function remove() { if (o.overlay.parentNode) o.overlay.parentNode.removeChild(o.overlay); }
    if (reducedMotion()) remove(); else setTimeout(remove, 200);

    if (o.restore && typeof o.restore.focus === 'function') o.restore.focus();
  }

  /* ---------- theme ------------------------------------------------------- */

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    U.store.setRaw('trip.theme', theme);
    U.$$('[data-theme-icon]').forEach(function (n) {
      n.textContent = theme === 'dark' ? '☀' : '☾';
    });
    U.$$('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', TRIP.i18n.S(theme === 'dark' ? 'toLight' : 'toDark'));
    });
  }

  function initTheme() {
    applyTheme(currentTheme());
    U.$$('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      });
    });
  }

  /* ---------- language ---------------------------------------------------- */

  /**
   * Wire the VI / EN toggle.
   *
   * @param rerender called after the language changes, to rebuild the page from
   *        data. Re-rendering in place rather than reloading keeps the user's
   *        scroll position, which matters on a long detail page.
   */
  function initLang(rerender) {
    function paint() {
      var label = TRIP.i18n.S('langLabel');
      U.$$('[data-lang-label]').forEach(function (n) { n.textContent = label; });
      U.$$('[data-lang-toggle]').forEach(function (b) {
        b.setAttribute('aria-label', TRIP.i18n.S('switchLang'));
      });
    }

    paint();

    U.$$('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        TRIP.i18n.set(TRIP.i18n.lang() === 'vi' ? 'en' : 'vi');
        paint();
        applyTheme(currentTheme());    // refresh the theme button's aria-label
        if (typeof rerender === 'function') rerender();
      });
    });
  }

  TRIP.motion = {
    reducedMotion: reducedMotion,
    reveal: reveal,
    bars: bars,
    countUp: countUp,
    lightbox: lightbox,
    closeLightbox: closeLightbox,
    initTheme: initTheme,
    initLang: initLang
  };
})(window.TRIP = window.TRIP || {});
