/* motif.js — the designed fallback visual.

   This is not decoration-of-last-resort. Wikimedia Commons has no usable
   free-licence photographs of Bình Liêu, and close to none of Quan Lạn,
   Côn Sơn or hồ Đồng Đò, so for several locations this *is* the finished
   artwork. It has to look deliberate.

   Each motif is layered silhouettes over the location's own gradient, drawn
   as inline SVG so there is no asset to load and no aspect-ratio problem. */
(function (TRIP) {
  'use strict';

  var DEFAULT_GRADIENT = ['#0e7490', '#155e75', '#0b2836'];

  /* Silhouette layers per motif, back to front.
     Paths are drawn in a 0 0 800 450 viewBox. */
  var SHAPES = {
    /* Limestone karst towers rising from water — Cát Bà, Ninh Bình, Quan Lạn */
    karst: [
      'M0 300 L60 250 Q78 214 96 250 L150 300 Z',
      'M120 310 L190 232 Q212 190 236 232 L300 310 Z',
      'M260 318 L318 262 Q334 232 350 262 L404 318 Z',
      'M370 312 L452 220 Q476 176 502 220 L580 312 Z',
      'M540 318 L604 254 Q622 220 642 254 L710 318 Z',
      'M672 320 L730 268 Q746 240 762 268 L800 312 L800 320 Z'
    ],
    /* Long ridgelines — Bình Liêu, Tam Đảo */
    mountain: [
      'M0 330 L120 220 L210 286 L320 180 L430 288 L540 200 L660 300 L800 214 L800 450 L0 450 Z',
      'M0 372 L140 288 L250 340 L380 262 L500 342 L620 280 L740 350 L800 320 L800 450 L0 450 Z'
    ],
    /* Still water with a far shore and a pine edge — hồ Đồng Đò */
    lake: [
      'M0 286 L110 262 L230 278 L360 256 L500 276 L640 254 L800 272 L800 300 L0 300 Z',
      'M0 300 L800 300 L800 450 L0 450 Z'
    ],
    /* Tiered roofs among trees — Côn Sơn, Kiếp Bạc */
    temple: [
      'M0 350 L800 350 L800 450 L0 450 Z',
      'M250 300 L400 236 L550 300 L520 300 L520 350 L280 350 L280 300 Z',
      'M290 236 L400 188 L510 236 Z'
    ],
    /* Island horizon with a headland — Cát Bà alternative, Quan Lạn */
    island: [
      'M0 306 L800 306 L800 450 L0 450 Z',
      'M80 306 Q170 232 262 306 Z',
      'M430 306 Q560 216 690 306 Z'
    ],
    /* Stepped terraced fields — Bình Liêu */
    terrace: [
      'M0 268 L800 246 L800 288 L0 310 Z',
      'M0 310 L800 288 L800 330 L0 352 Z',
      'M0 352 L800 330 L800 372 L0 394 Z',
      'M0 394 L800 372 L800 450 L0 450 Z'
    ]
  };

  var OPACITY = [0.30, 0.24, 0.20, 0.17, 0.14, 0.12];

  function uid(prefix) {
    return prefix + '-' + Math.random().toString(36).slice(2, 9);
  }

  /**
   * Build the fallback visual.
   * @param {string} kind   one of the SHAPES keys
   * @param {string[]} gradient  two or three colours, dark-to-light agnostic
   * @returns {SVGElement}
   */
  function svg(kind, gradient) {
    var S = TRIP.util.svgEl;
    var stops = (Array.isArray(gradient) && gradient.length >= 2) ? gradient : DEFAULT_GRADIENT;
    var shapes = SHAPES[kind] || SHAPES.karst;
    var gid = uid('g');
    var sid = uid('s');

    var root = S('svg', {
      viewBox: '0 0 800 450',
      preserveAspectRatio: 'xMidYMid slice',
      role: 'presentation',
      'aria-hidden': 'true',
      focusable: 'false'
    });

    var defs = S('defs');

    /* Background wash, top-left to bottom-right */
    var lg = S('linearGradient', { id: gid, x1: '0', y1: '0', x2: '0.55', y2: '1' });
    stops.forEach(function (c, i) {
      lg.appendChild(S('stop', {
        offset: (i / (stops.length - 1) * 100) + '%',
        'stop-color': c
      }));
    });
    defs.appendChild(lg);

    /* A soft light source so the flat fill doesn't read as a solid block */
    var rg = S('radialGradient', { id: sid, cx: '0.72', cy: '0.18', r: '0.85' });
    rg.appendChild(S('stop', { offset: '0%', 'stop-color': '#ffffff', 'stop-opacity': '0.26' }));
    rg.appendChild(S('stop', { offset: '60%', 'stop-color': '#ffffff', 'stop-opacity': '0.04' }));
    rg.appendChild(S('stop', { offset: '100%', 'stop-color': '#ffffff', 'stop-opacity': '0' }));
    defs.appendChild(rg);

    root.appendChild(defs);
    root.appendChild(S('rect', { x: '0', y: '0', width: '800', height: '450', fill: 'url(#' + gid + ')' }));
    root.appendChild(S('rect', { x: '0', y: '0', width: '800', height: '450', fill: 'url(#' + sid + ')' }));

    /* Sun / moon disc, placed to sit above the silhouettes */
    root.appendChild(S('circle', {
      cx: '596', cy: '112', r: '34',
      fill: '#ffffff', 'fill-opacity': '0.14'
    }));

    shapes.forEach(function (d, i) {
      root.appendChild(S('path', {
        d: d,
        fill: '#04161d',
        'fill-opacity': String(OPACITY[i] !== undefined ? OPACITY[i] : 0.12)
      }));
    });

    return root;
  }

  /** Convenience: the motif for a location, honouring its theme. */
  function forLocation(loc) {
    var theme = (loc && loc.theme) || {};
    return svg(theme.motif || 'karst', theme.gradient);
  }

  TRIP.motif = { svg: svg, forLocation: forLocation, kinds: Object.keys(SHAPES) };
})(window.TRIP = window.TRIP || {});
