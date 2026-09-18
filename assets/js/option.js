/* option.js — the detail page. One template, selected by ?id=<location>.

   render() rebuilds from data, so the language toggle just calls it again. */
(function (TRIP) {
  'use strict';

  var U = TRIP.util, R = TRIP.render, el = U.el;
  var S = TRIP.i18n.S, T = TRIP.i18n.T;

  var RANK_MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };

  function heroFor(loc, row, total) {
    var photos = TRIP.photosFor(loc);
    var idx = typeof loc.heroPhoto === 'number' ? loc.heroPhoto : 0;
    var hero = photos[idx] || photos[0] || null;
    var medal = RANK_MEDAL[row.rank] || '#';

    return el('section', { class: 'dhero' }, [
      el('div', { class: 'dhero__media' }, R.media(loc, hero, hero ? hero.title : null)),
      el('div', { class: 'wrap dhero__inner' }, [
        el('span', { class: 'dhero__rank' }, [
          el('span', { 'aria-hidden': 'true' }, medal),
          el('span', S('rankOf', row.rank, total) + ' · ' + U.one(row.score.total) + '/10')
        ]),
        el('h1', T(loc.name)),
        el('p', { class: 'dhero__sub' },
          [T(loc.region), loc.facts && T(loc.facts.vibe)].filter(Boolean).join(' · '))
      ])
    ]);
  }

  function pager(rows, index) {
    var prev = rows[index - 1];
    var next = rows[index + 1];
    if (!prev && !next) return null;

    function link(row, dir) {
      if (!row) return el('div', { class: 'pager__slot' });
      var name = T(row.loc.name);
      return el('a', {
        class: 'pager__link' + (dir === 'next' ? ' pager__link--next' : ''),
        href: 'option.html?id=' + encodeURIComponent(row.loc.id)
      }, [
        el('span', { class: 'pager__dir' },
          S(dir === 'next' ? 'nextRank' : 'prevRank', row.rank)),
        el('span', { class: 'pager__name' },
          dir === 'next' ? name + ' →' : '← ' + name)
      ]);
    }

    return el('nav', { class: 'pager rv', 'aria-label': S('otherDestinations') }, [
      link(prev, 'prev'), link(next, 'next')
    ]);
  }

  function render() {
    var config = window.TRIP_CONFIG;
    var main = U.$('[data-detail]');
    if (!main) return;

    U.$$('[data-i18n]').forEach(function (n) { n.textContent = S(n.dataset.i18n); });
    U.$$('[data-footer-asof]').forEach(function (p) {
      var warn = T(config.infoWarning);
      p.textContent = S('footerAsOf', U.isoToLong(config.infoAsOf)) +
                      (warn ? ' ' + warn : '');
    });
    U.$$('[data-footer-estimates]').forEach(function (p) {
      U.clear(p);
      p.appendChild(el('strong', S('estimatesShort')));
      p.appendChild(document.createTextNode(S('estimatesBody')));
    });

    var id = U.qs('id');
    var rows = TRIP.score.rank(TRIP.locations, config.criteria);
    var index = -1;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].loc.id === id) { index = i; break; }
    }

    U.clear(main);

    if (index === -1) {
      // Missing, unknown, or a draft location: friendly, never a thrown error.
      main.appendChild(R.notFound(id));
      document.title = S('notFoundTitle');
      var crumb0 = U.$('[data-detail-crumb]');
      if (crumb0) crumb0.textContent = '';
      return;
    }

    var row = rows[index];
    var loc = row.loc;

    document.title = T(loc.name) + ' · ' + T(config.title);
    var crumb = U.$('[data-detail-crumb]');
    if (crumb) crumb.textContent = U.one(row.score.total) + '/10';

    main.appendChild(heroFor(loc, row, rows.length));

    /* Summary + facts */
    main.appendChild(el('section', { class: 'section wrap' }, [
      loc.summary ? el('p', { class: 'hero__sub rv' }, T(loc.summary)) : null,
      (loc.badges && loc.badges.length)
        ? el('div', { class: 'badges rv', style: { marginBottom: '1rem' } },
            loc.badges.map(R.badge))
        : null,
      R.factsGrid(loc.facts)
    ]));

    /* Score breakdown */
    main.appendChild(el('section', { class: 'section wrap' }, R.breakdown(row.score)));

    /* What published reviews say — sits right after our own score, so the
       group can weigh our opinion against other people's. */
    var rev = R.reviews(loc);
    if (rev) main.appendChild(el('section', { class: 'section wrap' }, rev));

    /* Content sections */
    var sections = (loc.sections || []).map(R.section).filter(Boolean);
    if (sections.length) {
      main.appendChild(el('section', { class: 'section wrap' }, [
        el('h2', { class: 'sr-only' }, S('detailHeading')),
        el('div', {}, sections)
      ]));
    }

    /* Photos */
    main.appendChild(el('section', { class: 'section wrap' }, [
      el('h2', { class: 'rv' }, S('photos')),
      el('div', { class: 'rv' }, R.gallery(loc))
    ]));

    /* Links, if the location supplies any */
    if (loc.links && loc.links.length) {
      main.appendChild(el('section', { class: 'section wrap' }, [
        el('h2', { class: 'rv' }, S('usefulLinks')),
        el('ul', { class: 'rv' }, loc.links.map(function (l) {
          return el('li', el('a', { href: l.url, rel: 'noopener' }, T(l.label)));
        }))
      ]));
    }

    var nav = pager(rows, index);
    if (nav) main.appendChild(el('section', { class: 'section wrap' }, nav));

    TRIP.motion.reveal();
    TRIP.motion.bars();
  }

  function init() {
    var main = U.$('[data-detail]');
    if (!main) return;

    if (!window.TRIP_CONFIG || !TRIP.locations) {
      U.clear(main);
      main.appendChild(R.notFound(null));
      return;
    }

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
