/* render.js — every component builder.

   Returns DOM elements, never HTML strings. All text lands via textContent, so
   escaping is the default rather than something to remember. Every optional
   field is guarded: a location with no photos, no badges and no facts must
   still render cleanly.

   Every user-facing string from the data files passes through T(), and every
   string the site itself owns comes from S(). See assets/js/i18n.js. */
(function (TRIP) {
  'use strict';

  var U = TRIP.util;
  var el = U.el, one = U.one;
  var T = TRIP.i18n.T, S = TRIP.i18n.S, E = TRIP.i18n.E;

  var RISK_ICON = { Low: '●', Medium: '◐', High: '▲' };
  var TONE_ICON = { good: '✓', warn: '⚠', danger: '✕', info: 'ℹ' };
  var RANK_MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };

  /* ---------- small pieces ------------------------------------------------ */

  function chip(label, value) {
    return el('span', { class: 'chip' }, value === undefined
      ? label
      : [label + ' ', el('strong', String(value))]);
  }

  function badge(b) {
    var tone = b.tone || 'info';
    return el('span', { class: 'badge badge--' + tone }, [
      el('span', { class: 'badge__icon', 'aria-hidden': 'true' }, TONE_ICON[tone] || 'ℹ'),
      el('span', T(b.text))
    ]);
  }

  /** Photo, or the designed motif if there is no photo or it fails to load. */
  function media(loc, photo, altText) {
    if (!photo) return TRIP.motif.forLocation(loc);

    var img = el('img', {
      src: 'locations/' + loc.id + '/photos/' + photo.file,
      alt: altText || photo.title || T(loc.name),
      loading: 'lazy',
      decoding: 'async'
    });

    // A missing or corrupt file must not leave a broken-image icon behind.
    img.addEventListener('error', function () {
      var fallback = TRIP.motif.forLocation(loc);
      if (img.parentNode) img.parentNode.replaceChild(fallback, img);
    });

    return img;
  }

  /* ---------- score bars -------------------------------------------------- */

  /**
   * @param parts from score.compute().parts
   * @param opts  { mini:boolean, top:number, showWeight:boolean }
   */
  function bars(parts, opts) {
    opts = opts || {};
    var list = parts.slice();

    if (opts.top) {
      // Show the most informative rows: the strongest few and the weakest one,
      // so a card never hides its own worst number.
      var sorted = list.slice().sort(function (a, b) { return b.value - a.value; });
      var picked = sorted.slice(0, Math.max(1, opts.top - 1));
      var worst = sorted[sorted.length - 1];
      if (picked.indexOf(worst) === -1) picked.push(worst);
      list = picked;
    }

    var wrap = el('div', { class: 'bars' + (opts.mini ? ' bars--mini' : '') });

    list.forEach(function (p) {
      var pct = Math.max(0, Math.min(10, p.value)) / 10;
      var label = T(opts.mini ? (p.short || p.label) : p.label);

      /* Render at the true proportion straight away. motion.js animates by
         dropping it to 0 and releasing it, so if the animation never runs —
         reduced motion, no IntersectionObserver, an error earlier in the
         frame — the bar still shows the right number instead of an empty
         track. Correct-by-default beats animated-by-default. */
      var fill = el('span', { class: 'bar__fill' });
      fill.dataset.v = String(pct);
      fill.style.setProperty('--v', String(pct));

      var aria = label + ': ' + p.value + ' ' + S('outOf10');
      if (opts.showWeight) {
        aria += ', ' + S('weightWord') + ' ' + Math.round(p.weight * 100) + '%';
      }

      wrap.appendChild(el('div', {
        class: 'bar' + (p.value <= 5 ? ' bar--low' : ''),
        role: 'img',
        'aria-label': aria
      }, [
        el('span', { class: 'bar__label' }, label),
        el('span', { class: 'bar__track', 'aria-hidden': 'true' }, fill),
        el('span', { class: 'bar__val', 'aria-hidden': 'true' }, String(p.value))
      ]));
    });

    return wrap;
  }

  /* ---------- home card --------------------------------------------------- */

  function card(row) {
    var loc = row.loc, score = row.score, rank = row.rank;
    var photos = TRIP.photosFor(loc);
    var heroIdx = typeof loc.heroPhoto === 'number' ? loc.heroPhoto : 0;
    var hero = photos[heroIdx] || photos[0] || null;
    var name = T(loc.name);

    var facts = loc.facts || {};
    var chips = [];
    if (facts.distanceKm) chips.push(chip(U.km(facts.distanceKm)));
    if (facts.driveTime) chips.push(chip(T(facts.driveTime) + ' ' + S('driveShort')));
    if (facts.cost) {
      var range = U.vndRange(facts.cost);
      if (range) chips.push(chip(range + S('perPersonShort')));
    }
    if (facts.bestLength) chips.push(chip(T(facts.bestLength)));

    var medal = RANK_MEDAL[rank] || '#';
    var rankClass = 'card__rank' + (rank <= 3 ? ' card__rank--' + rank : '');
    var href = 'option.html?id=' + encodeURIComponent(loc.id);

    var mediaBox = el('div', { class: 'card__media' }, [
      media(loc, hero, hero ? (hero.title || name) : null),
      el('span', { class: rankClass }, [
        el('span', { 'aria-hidden': 'true' }, medal),
        el('span', S('rank') + ' ' + rank)
      ]),
      el('span', { class: 'card__score' }, [
        el('span', one(score.total)),
        el('small', '/10')
      ]),
      el('div', { class: 'card__heading' }, [
        el('h3', { class: 'card__name' }, name),
        loc.region ? el('div', { class: 'card__region' }, T(loc.region)) : null
      ])
    ]);

    var body = el('div', { class: 'card__body' }, [
      loc.tagline ? el('p', { class: 'card__tagline' }, T(loc.tagline)) : null,
      chips.length ? el('div', { class: 'chips' }, chips) : null,
      (loc.badges && loc.badges.length)
        ? el('div', { class: 'badges' }, loc.badges.map(badge)) : null,
      bars(score.parts, { mini: true, top: 3 }),
      el('div', { class: 'card__foot' },
        el('a', { class: 'btn btn--block', href: href }, [
          S('seeDetail'), el('span', { 'aria-hidden': 'true' }, '→')
        ]))
    ]);

    return el('article', { class: 'card rv' }, [
      el('a', {
        href: href,
        'aria-label': S('scoreAria', name, rank, one(score.total)),
        style: { textDecoration: 'none', color: 'inherit', display: 'block' }
      }, mediaBox),
      body
    ]);
  }

  /* ---------- quick facts grid -------------------------------------------- */

  function factsGrid(facts) {
    if (!facts) return null;
    var rows = [];

    function add(k, v, cls) {
      if (v === undefined || v === null || v === '') return;
      rows.push(el('div', { class: 'fact' }, [
        el('div', { class: 'fact__k' }, k),
        el('div', { class: 'fact__v' + (cls ? ' ' + cls : '') }, v)
      ]));
    }

    add(S('factFrom'), facts.distanceKm ? U.km(facts.distanceKm) : null);
    add(S('factDrive'), T(facts.driveTime));
    if (facts.cost) {
      var range = U.vndRange(facts.cost);
      if (range) {
        add(S('factPerPerson'), el('span', {}, [
          range,
          facts.cost.nights
            ? el('small', ' · ' + facts.cost.nights + ' ' + S('nights'))
            : null
        ]));
      }
    }
    add(S('factEffort'), E(facts.activityLevel));
    if (facts.weatherRisk) {
      add(S('factWeather'), el('span', { class: 'risk--' + facts.weatherRisk }, [
        el('span', { 'aria-hidden': 'true' }, (RISK_ICON[facts.weatherRisk] || '●') + ' '),
        E(facts.weatherRisk)
      ]));
    }
    add(S('factBestAs'), T(facts.bestLength));

    if (!rows.length) return null;
    return el('div', { class: 'facts' }, rows);
  }

  /* ---------- score breakdown --------------------------------------------- */

  function breakdown(score) {
    return el('div', { class: 'panel rv' }, [
      el('h2', S('whyScore', one(score.total))),
      bars(score.parts, { showWeight: true }),
      el('p', { class: 'bars-note' }, S('scoreNote')),
      el('details', {}, [
        el('summary', S('howWeights')),
        el('ul', {}, score.parts.map(function (p) {
          return el('li', T(p.label) + ' — ' + Math.round(p.weight * 100) + '%');
        }))
      ])
    ]);
  }

  /* ---------- reviews ----------------------------------------------------- */

  /**
   * "What people say" — a synthesis of published commentary, with sources.
   *
   * Deliberately carries no star rating. Google Places reviews cannot be cached
   * outside a user session under their terms and TripAdvisor's content is
   * partner-gated, so any number here would have been invented. Showing the
   * reasoning and the sources is more useful than a fake 4.3.
   */
  function reviews(loc) {
    var r = loc.reviews;
    if (!r) return null;

    function column(titleKey, items, tone) {
      if (!items || !items.length) return null;
      return el('div', { class: 'revcol revcol--' + tone }, [
        el('h3', { class: 'revcol__h' }, [
          el('span', { 'aria-hidden': 'true' }, TONE_ICON[tone] || '•'),
          el('span', S(titleKey))
        ]),
        el('ul', { class: 'revcol__list' }, T(items).map(function (t) {
          return el('li', t);
        }))
      ]);
    }

    var srcs = r.sources || [];

    return el('div', { class: 'panel rv' }, [
      el('h2', S('reviewsTitle')),
      r.verdict ? el('p', { class: 'rev__verdict' }, T(r.verdict)) : null,
      el('div', { class: 'revcols' }, [
        column('reviewsPraise', r.praise, 'good'),
        column('reviewsGripes', r.gripes, 'warn')
      ]),
      el('p', { class: 'bars-note' }, S('reviewsNote')),
      srcs.length
        ? el('details', { class: 'rev__sources' }, [
            el('summary', S('reviewsSources', srcs.length)),
            el('ul', {}, srcs.map(function (s) {
              return el('li', el('a', {
                href: s.url, rel: 'noopener nofollow', target: '_blank'
              }, s.label));
            }))
          ])
        : null
    ]);
  }

  /* ---------- content sections -------------------------------------------- */

  function paras(body) {
    if (!body) return [];
    var resolved = T(body);
    var list = Array.isArray(resolved) ? resolved : [resolved];
    return list.map(function (p) { return el('p', p); });
  }

  function sectionBody(s) {
    switch (s.type) {
      case 'prose':
        return paras(s.body);

      case 'list':
        var out = [];
        if (s.intro) out.push(el('p', T(s.intro)));
        var items = s.items || [];
        var isDef = items.length && items[0] && typeof items[0] === 'object' &&
                    !Array.isArray(items[0]) && items[0].term !== undefined;
        if (isDef) {
          out.push(el('dl', { class: 'dlist' }, items.map(function (it) {
            return el('div', { class: 'dlist__row' }, [
              el('dt', T(it.term)),
              el('dd', T(it.text))
            ]);
          })));
        } else {
          out.push(el('ul', {}, items.map(function (it) { return el('li', T(it)); })));
        }
        if (s.note) out.push(el('p', { class: 'kv-note' }, T(s.note)));
        return out;

      case 'itinerary':
        return [el('div', { class: 'itin' }, (s.days || []).map(function (d) {
          return el('div', { class: 'itin__day' }, [
            d.label ? el('div', { class: 'itin__label' }, T(d.label)) : null,
            d.title ? el('div', { class: 'itin__title' }, T(d.title)) : null,
            el('div', {}, (d.blocks || []).map(function (b) {
              return el('div', { class: 'itin__block' }, [
                el('div', { class: 'itin__when' }, T(b.when) || ''),
                el('div', { class: 'itin__what' }, T(b.what) || '')
              ]);
            }))
          ]);
        }))];

      case 'table':
        var kv = el('div', { class: 'kv' }, (s.rows || []).map(function (r) {
          return el('div', { class: 'kv__row' }, [
            el('div', { class: 'kv__k' }, T(r.label)),
            el('div', { class: 'kv__v' }, T(r.value))
          ]);
        }));
        return s.note ? [kv, el('p', { class: 'kv-note' }, T(s.note))] : [kv];

      case 'callout':
        return [el('div', { class: 'callout callout--' + (s.tone || 'info') }, paras(s.body))];

      default:
        U.warn('unknown section type "' + s.type + '", skipped');
        return null;
    }
  }

  /** One collapsible section. */
  function section(s, index) {
    var body = sectionBody(s);
    if (!body) return null;

    var panelId = 'sec-' + index;
    var open = index === 0;
    var tone = s.type === 'callout' ? (s.tone || 'info') : null;
    var accClass = 'acc rv' +
      (tone === 'warn' ? ' acc--warn' : tone === 'danger' ? ' acc--danger' : '');

    var panel = el('div', { class: 'acc__panel', id: panelId },
      el('div', { class: 'acc__inner' }, el('div', { class: 'acc__pad' }, body)));
    panel.dataset.open = open ? 'true' : 'false';

    var btn = el('button', {
      class: 'acc__btn',
      type: 'button',
      'aria-expanded': open ? 'true' : 'false',
      'aria-controls': panelId
    }, [
      tone ? el('span', { 'aria-hidden': 'true' }, TONE_ICON[tone] || 'ℹ') : null,
      el('span', T(s.title) || S('more')),
      el('span', { class: 'acc__caret', 'aria-hidden': 'true' }, '›')
    ]);

    btn.addEventListener('click', function () {
      var nowOpen = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      panel.dataset.open = nowOpen ? 'true' : 'false';
    });

    return el('div', { class: accClass }, [btn, panel]);
  }

  /* ---------- gallery ----------------------------------------------------- */

  /* Photo credits stay in their original language: an author's name and a
     licence label like "CC BY-SA 4.0" are not translatable, and altering them
     would weaken the attribution. */
  function creditLine(p, short) {
    var bits = [];
    if (p.author) bits.push(p.author);
    if (p.license) bits.push(p.license);

    // A hand-added photo with no credit fields is assumed to be the group's own,
    // so it gets a plain label rather than being mislabelled "Wikimedia Commons".
    var fallback = p._local ? S('ownPhoto') : 'Wikimedia Commons';
    var frag = el('span', {}, bits.join(' · ') || fallback);
    if (short) return frag;

    var out = [frag];
    if (p.sourceUrl) {
      out.push(' · ');
      out.push(el('a', {
        href: p.sourceUrl, rel: 'noopener nofollow', target: '_blank'
      }, S('source')));
    }
    return out;
  }

  function gallery(loc) {
    var photos = TRIP.photosFor(loc);
    if (!photos.length) {
      return el('div', { class: 'nophoto' }, S('noPhoto', loc.id));
    }

    /* No caption under each tile — it made the grid noisy. Attribution moves to
       one consolidated block below, which CC's "reasonable manner" allows, and
       it also still appears in the lightbox when a photo is opened. It cannot be
       dropped altogether: naming the author and the licence is the condition
       that makes using a CC BY / CC BY-SA photo lawful. */
    var grid = el('div', { class: 'gallery' }, photos.map(function (p, i) {
      var label = p.title || S('photoOf', i + 1);

      var btn = el('button', {
        class: 'shot__btn', type: 'button', 'aria-label': S('enlarge', label)
      }, el('img', {
        src: 'locations/' + loc.id + '/photos/' + p.file,
        alt: label,
        loading: 'lazy',
        decoding: 'async'
      }));

      btn.addEventListener('click', function () { TRIP.motion.lightbox(loc, p); });

      return el('figure', { class: 'shot' }, btn);
    }));

    // The group's own photos need no attribution, so they stay out of the list.
    var needCredit = photos.filter(function (p) { return p.author || p.license; });

    var credits = needCredit.length
      ? el('details', { class: 'credits' }, [
          el('summary', S('photoCredits', needCredit.length)),
          el('ul', { class: 'credits__list' }, needCredit.map(function (p) {
            return el('li', [
              p.title ? el('span', { class: 'credits__t' }, p.title + ' — ') : null,
              creditLine(p)
            ]);
          })),
          el('p', { class: 'kv-note' }, S('galleryNote'))
        ])
      : null;

    return el('div', {}, [grid, credits]);
  }

  /* ---------- not found --------------------------------------------------- */

  function notFound(id) {
    return el('div', { class: 'wrap nf' }, [
      el('div', { class: 'nf__mark', 'aria-hidden': 'true' }, '🧭'),
      el('h1', S('notFoundTitle')),
      el('p', id ? S('notFoundWithId', id) : S('notFoundNoId')),
      el('p', el('a', { class: 'btn', href: 'index.html' }, S('seeAllOptions')))
    ]);
  }

  /* ---------- compare panel ---------------------------------------------- */

  function compare(config, locations) {
    var criteria = config.criteria;
    var published = {};
    var live = {};
    criteria.forEach(function (c) {
      published[c.key] = c.weight;
      live[c.key] = c.weight;
    });

    var matrixSlot = el('div', { class: 'matrix-scroll' });
    var sumOut = el('span', { class: 'slider__sum' });

    function drawMatrix() {
      var rows = TRIP.score.rank(locations, criteria, live);

      var head = el('tr', {}, [
        el('th', { scope: 'col', class: 'm-rank' }, '#'),
        el('th', { scope: 'col', style: { textAlign: 'left' } }, S('destination'))
      ].concat(criteria.map(function (c) {
        return el('th', { scope: 'col' }, T(c.short || c.label));
      })).concat([el('th', { scope: 'col' }, S('scoreCol'))]));

      var body = el('tbody', {}, rows.map(function (r) {
        var cells = [
          el('td', { class: 'm-rank' }, String(r.rank)),
          el('th', { scope: 'row' }, el('a', {
            href: 'option.html?id=' + encodeURIComponent(r.loc.id)
          }, T(r.loc.name)))
        ];
        r.score.parts.forEach(function (p) {
          var cls = p.value >= 9 ? 'm-hi' : (p.value <= 4 ? 'm-lo' : '');
          cells.push(el('td', {}, el('span', { class: 'cellv ' + cls }, String(p.value))));
        });
        cells.push(el('td', { class: 'm-total' }, one(r.score.total)));
        return el('tr', {}, cells);
      }));

      U.clear(matrixSlot);
      matrixSlot.appendChild(el('table', { class: 'matrix' }, [
        el('caption', { class: 'sr-only' }, S('matrixCaption')),
        el('thead', {}, head),
        body
      ]));

      var sum = criteria.reduce(function (a, c) { return a + live[c.key]; }, 0);
      sumOut.textContent = S('weightsTotal', Math.round(sum * 100)) +
        (Math.abs(sum - 1) > 0.005 ? S('weightsOff') : '');
    }

    var sliders = el('div', { class: 'sliders' }, criteria.map(function (c) {
      var out = el('span', { class: 'slider__out' }, Math.round(c.weight * 100) + '%');
      var input = el('input', {
        type: 'range', min: '0', max: '50', step: '1',
        value: String(Math.round(c.weight * 100)),
        id: 'w-' + c.key
      });
      input.addEventListener('input', function () {
        live[c.key] = Number(input.value) / 100;
        out.textContent = input.value + '%';
        drawMatrix();
      });
      return el('div', { class: 'slider' }, [
        el('label', { for: 'w-' + c.key }, T(c.label)),
        input,
        out
      ]);
    }));

    var reset = el('button', { class: 'btn btn--ghost', type: 'button' }, S('resetWeights'));
    reset.addEventListener('click', function () {
      criteria.forEach(function (c) { live[c.key] = published[c.key]; });
      U.$$('input[type=range]', sliders).forEach(function (input, i) {
        input.value = String(Math.round(criteria[i].weight * 100));
        var out = input.nextElementSibling;
        if (out) out.textContent = input.value + '%';
      });
      drawMatrix();
    });

    drawMatrix();

    return el('div', { class: 'panel rv' }, [
      el('div', { class: 'compare__head' }, [
        el('h2', S('compareTitle')),
        el('p', { class: 'compare__hint' }, S('compareHint'))
      ]),
      sliders,
      el('p', {}, [sumOut]),
      matrixSlot,
      el('p', { style: { marginTop: '1rem' } }, reset)
    ]);
  }

  TRIP.render = {
    chip: chip, badge: badge, media: media, bars: bars,
    card: card, factsGrid: factsGrid, breakdown: breakdown, reviews: reviews,
    section: section, gallery: gallery, creditLine: creditLine,
    notFound: notFound, compare: compare
  };
})(window.TRIP = window.TRIP || {});
