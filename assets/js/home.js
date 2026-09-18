/* home.js — the ranked list page.

   render() rebuilds everything from data, so switching language just calls it
   again rather than reloading the page. */
(function (TRIP) {
  'use strict';

  var U = TRIP.util, R = TRIP.render, el = U.el;
  var S = TRIP.i18n.S, T = TRIP.i18n.T;

  function fatal(message, detail) {
    U.warn(message, detail || '');
    var slot = U.$('[data-cards]');
    if (!slot) return;
    U.clear(slot);
    slot.appendChild(el('div', { class: 'nophoto' }, [
      el('strong', S('loadFailed')),
      message + ' ' + S('loadFailedTail')
    ]));
  }

  function render() {
    var config = window.TRIP_CONFIG;

    /* Header, hero and footer text all come from config + the string table,
       so there is one source of truth per language. */
    U.$$('[data-site-title]').forEach(function (n) { n.textContent = T(config.title); });
    U.$$('[data-i18n]').forEach(function (n) { n.textContent = S(n.dataset.i18n); });

    /* Header byline — the nickname this whole thing is for. */
    var owner = config.owner || {};
    U.$$('[data-brand-byline]').forEach(function (n) {
      n.textContent = [owner.name, T(owner.tagline)].filter(Boolean).join(' · ');
    });

    var eyebrow = U.$('[data-hero-eyebrow]');
    var title = U.$('[data-hero-title]');
    var sub = U.$('[data-hero-sub]');
    if (eyebrow) eyebrow.textContent = T(config.eyebrow) || '';
    if (title) title.textContent = T(config.title) || '';
    if (sub) sub.textContent = T(config.subtitle) || '';
    document.title = T(config.title) + ' · ' + (config.tripWindow || '');

    U.$$('[data-footer-asof]').forEach(function (p) {
      var warn = T(config.infoWarning);
      p.textContent = S('footerAsOf', U.isoToLong(config.infoAsOf)) +
                      (warn ? ' ' + warn : '');
    });
    U.$$('[data-footer-estimates]').forEach(function (p) {
      U.clear(p);
      p.appendChild(el('strong', S('footerEstimates')));
      p.appendChild(document.createTextNode(S('footerBody')));
    });
    U.$$('[data-footer-source]').forEach(function (p) {
      U.clear(p);
      p.appendChild(document.createTextNode(S('footerWeather')));
      p.appendChild(el('a', { href: 'https://nchmf.gov.vn', rel: 'noopener' }, 'nchmf.gov.vn'));
      p.appendChild(document.createTextNode(S('footerWeather2')));
    });

    /* Cards */
    var rows = TRIP.score.rank(TRIP.locations, config.criteria);
    var cardsSlot = U.$('[data-cards]');
    U.clear(cardsSlot);

    if (!rows.length) {
      cardsSlot.appendChild(el('div', { class: 'nophoto' }, S('noneYet')));
    } else {
      rows.forEach(function (row) { cardsSlot.appendChild(R.card(row)); });
    }

    var count = U.$('[data-hero-count]');
    if (count) {
      count.textContent = rows.length ? rows.length + ' ' + S('optionsCount') : '';
    }

    /* Compare panel — only worth showing with something to compare. */
    var compareSlot = U.$('[data-compare]');
    if (compareSlot) {
      U.clear(compareSlot);
      if (rows.length >= 2) {
        compareSlot.appendChild(R.compare(config, TRIP.locations));
      } else {
        var link = U.$('a[href="#compare"]');
        if (link) link.remove();
      }
    }

    TRIP.motion.reveal();
    TRIP.motion.bars();
  }

  function init() {
    if (!window.TRIP_CONFIG) return fatal('config.js did not load.');
    if (!TRIP.locations) return fatal('locations/registry.js did not load.');

    TRIP.i18n.init();
    TRIP.motion.initTheme();
    TRIP.motion.initLang(render);
    TRIP.score.validateConfig(window.TRIP_CONFIG);

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window.TRIP = window.TRIP || {});
