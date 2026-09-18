/* backdrop.js — the page's landscape backdrop.

   A still bay: four receding karst ridges, a water plane, a couple of towers
   floating free of the waterline for a touch of the surreal, and two bands of
   drifting mist.

   WHY IT IS BUILT HERE RATHER THAN IN CSS
   A data-URI SVG in a background-image would work, but it has to be
   URL-encoded, which makes it unreadable and effectively un-editable. Building
   real SVG nodes keeps the shapes legible, and — more usefully — lets every
   layer take its colour from a CSS class. So the whole backdrop re-themes on
   the light/dark toggle with no JavaScript involved at all.

   It is decorative: aria-hidden, pointer-events off, and masked in CSS to fade
   in downward so it stays out of the way of the hero text. */
(function (TRIP) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var W = 1440, H = 900;

  function n(tag, attrs) {
    var node = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    }
    return node;
  }

  /* A karst ridge: a baseline with rounded towers rising from it. Quadratic
     curves give the soft, weathered profile limestone actually has, rather than
     the triangular peaks a mountain motif would use.
  
     The path is forced strictly left-to-right. Neighbouring towers are close
     enough that a naive version doubles back on itself — tower N ending at
     x=1356 followed by tower N+1 starting at x=1320 — which self-intersects and
     renders as a notch in the silhouette. Clamping to a cursor also keeps the
     on-path points inside the viewBox at both edges. */
  function ridge(y, towers, cls) {
    var d = 'M0 ' + H + ' L0 ' + y;
    var cursor = 0;

    towers.forEach(function (t) {
      var x = t[0], h = t[1], w = t[2];
      var left = Math.max(cursor, x - w);
      var right = Math.min(W, x + w);
      if (right <= left) return;                 // fully swallowed by its neighbour

      if (left > cursor) d += ' L' + left + ' ' + y;
      d += ' Q' + (x - w * 0.42) + ' ' + (y - h) + ' ' + x + ' ' + (y - h * 0.92);
      d += ' Q' + (x + w * 0.5) + ' ' + (y - h * 0.72) + ' ' + right + ' ' + y;
      cursor = right;
    });

    if (cursor < W) d += ' L' + W + ' ' + y;
    d += ' L' + W + ' ' + H + ' Z';
    return n('path', { d: d, class: cls });
  }

  /* An island detached from the ground plane — the surreal note. Deliberately
     only two of these, small and low-contrast. */
  function floatingIsle(cx, cy, w, h, cls) {
    var g = n('g', { class: cls });
    g.appendChild(n('ellipse', { cx: cx, cy: cy, rx: w, ry: h * 0.16 }));
    g.appendChild(n('path', {
      d: 'M' + (cx - w * 0.72) + ' ' + cy +
         ' Q' + (cx - w * 0.3) + ' ' + (cy - h) + ' ' + cx + ' ' + (cy - h * 0.86) +
         ' Q' + (cx + w * 0.45) + ' ' + (cy - h * 0.62) + ' ' + (cx + w * 0.72) +
         ' ' + cy + ' Z'
    }));
    return g;
  }

  function build() {
    var svg = n('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      preserveAspectRatio: 'xMidYMid slice',
      role: 'presentation',
      'aria-hidden': 'true',
      focusable: 'false'
    });

    var waterline = 636;

    /* Sun or moon, low and hazy. Sits behind every ridge. */
    svg.appendChild(n('circle', { cx: 1058, cy: 236, r: 96, class: 'bd-sun' }));
    svg.appendChild(n('circle', { cx: 1058, cy: 236, r: 152, class: 'bd-sun',
                                  opacity: '.35' }));

    /* Far haze band, sitting on the horizon. */
    var mistA = n('g', { class: 'bd-mist bd-mist--a' });
    mistA.appendChild(n('ellipse', { cx: 520, cy: 470, rx: 760, ry: 34 }));
    mistA.appendChild(n('ellipse', { cx: 1180, cy: 500, rx: 520, ry: 26 }));
    svg.appendChild(mistA);

    /* Three receding ridges. Paler and higher the further back they sit, which
       is how atmospheric perspective actually reads. */
    svg.appendChild(ridge(504, [
      [110, 132, 96], [330, 184, 122], [560, 108, 84],
      [790, 200, 140], [1010, 126, 96], [1240, 168, 116], [1410, 110, 90]
    ], 'bd-far'));

    svg.appendChild(ridge(560, [
      [60, 118, 86], [270, 176, 124], [470, 96, 74],
      [700, 152, 112], [930, 208, 146], [1160, 120, 92], [1370, 164, 118]
    ], 'bd-mid'));

    /* Mid mist, tucked between the ridges to separate the planes. */
    var mistB = n('g', { class: 'bd-mist bd-mist--b' });
    mistB.appendChild(n('ellipse', { cx: 700, cy: 566, rx: 900, ry: 24 }));
    mistB.appendChild(n('ellipse', { cx: 180, cy: 590, rx: 460, ry: 18 }));
    svg.appendChild(mistB);

    /* Nearest ridge, darkest, meeting the water. */
    svg.appendChild(ridge(waterline, [
      [150, 152, 116], [420, 96, 82], [640, 188, 136],
      [900, 112, 92], [1150, 168, 124], [1380, 132, 104]
    ], 'bd-near'));

    /* The water itself. */
    svg.appendChild(n('rect', {
      x: 0, y: waterline, width: W, height: H - waterline, class: 'bd-water'
    }));

    /* A few horizontal ripples — spacing widens toward the viewer. */
    [16, 40, 74, 120, 180, 254].forEach(function (offset, i) {
      svg.appendChild(n('rect', {
        x: (i % 2 ? 120 : 0), y: waterline + offset,
        width: W - (i % 2 ? 180 : 60), height: 1.5,
        class: 'bd-mist', opacity: String(0.5 - i * 0.06), rx: 1
      }));
    });

    /* Two floating towers, reflected faintly below. The only thing on the page
       that is not literal. */
    svg.appendChild(floatingIsle(268, 300, 74, 108, 'bd-mid'));
    svg.appendChild(floatingIsle(1246, 396, 54, 78, 'bd-far'));

    var reflection = n('g', { class: 'bd-mist', opacity: '.28' });
    reflection.appendChild(n('ellipse', { cx: 268, cy: waterline + 54, rx: 62, ry: 7 }));
    reflection.appendChild(n('ellipse', { cx: 1246, cy: waterline + 92, rx: 46, ry: 6 }));
    svg.appendChild(reflection);

    return svg;
  }

  function mount() {
    if (document.querySelector('.backdrop')) return;
    var host = document.createElement('div');
    host.className = 'backdrop';
    host.setAttribute('aria-hidden', 'true');
    host.appendChild(build());
    // First child of body, so it sits behind content in paint order as well as
    // z-index — belt and braces.
    document.body.insertBefore(host, document.body.firstChild);
  }

  TRIP.backdrop = { mount: mount, build: build };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})(window.TRIP = window.TRIP || {});
