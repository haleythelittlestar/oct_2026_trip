/* util.js — DOM building, formatting, storage.
   Classic script: attaches to the TRIP namespace created by locations/registry.js. */
(function (TRIP) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  /**
   * Build an element.
   *   el('p', 'hello')
   *   el('a', { href:'#', class:'btn' }, 'Go')
   *   el('ul', {}, [el('li','a'), el('li','b')])
   *
   * Text is always set via textContent, so escaping is the default rather than
   * something to remember.
   */
  function el(tag, props, children) {
    var node = document.createElement(tag);

    // el('p', 'text') and el('p', [nodes]) shorthands
    if (typeof props === 'string' || typeof props === 'number' ||
        Array.isArray(props) || props instanceof Node) {
      children = props;
      props = null;
    }

    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class' || k === 'className') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;            // only for trusted inline SVG
        else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
        else if (k === 'dataset') Object.keys(v).forEach(function (d) { node.dataset[d] = v[d]; });
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') {
          node.addEventListener(k.slice(2).toLowerCase(), v);
        } else node.setAttribute(k, v === true ? '' : v);
      });
    }

    append(node, children);
    return node;
  }

  function append(node, children) {
    if (children === null || children === undefined) return node;
    if (Array.isArray(children)) {
      children.forEach(function (c) { append(node, c); });
      return node;
    }
    if (children instanceof Node) node.appendChild(children);
    else node.appendChild(document.createTextNode(String(children)));
    return node;
  }

  function svgEl(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function clear(node) { while (node && node.firstChild) node.removeChild(node.firstChild); }

  /** Read a query-string parameter. Works from file:// too. */
  function qs(name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  /** 1800000 -> "1.8 tr"; 450000 -> "450k". Vietnamese shorthand, kept short for chips. */
  function vnd(n) {
    if (typeof n !== 'number' || !isFinite(n)) return '';
    if (n >= 1000000) {
      var tr = n / 1000000;
      return (tr >= 10 ? Math.round(tr) : Math.round(tr * 10) / 10) + ' tr';
    }
    if (n >= 1000) return Math.round(n / 1000) + 'k';
    return String(n);
  }

  /** { min, max } -> "1.8–3.0 tr". Ranges share the unit where they can. */
  function vndRange(cost) {
    if (!cost) return '';
    if (typeof cost.min !== 'number' || typeof cost.max !== 'number') return '';
    var bothMillions = cost.min >= 1000000 && cost.max >= 1000000;
    if (bothMillions) {
      var lo = Math.round(cost.min / 100000) / 10;
      var hi = Math.round(cost.max / 100000) / 10;
      return lo.toFixed(1) + '–' + hi.toFixed(1) + ' tr';
    }
    return vnd(cost.min) + '–' + vnd(cost.max);
  }

  function km(n) {
    return (typeof n === 'number' && isFinite(n)) ? '~' + n + ' km' : '';
  }

  /**
   * Round to one decimal, half away from zero, deterministically.
   *
   * Two of the seven scores land exactly on a rounding boundary (7.85 and
   * 7.35), and plain Math.round(n * 10) is then at the mercy of floating-point
   * representation: 7.85 * 10 comes out as 78.50000000000001 and rounds up,
   * while 7.35 * 10 comes out as 73.49999999999999 and rounds down. The epsilon
   * makes both behave as half-up, so the site always agrees with the published
   * score table instead of depending on binary luck.
   */
  function round1(n) {
    if (typeof n !== 'number' || !isFinite(n)) return 0;
    var scaled = n * 10;
    var nudged = scaled + (scaled >= 0 ? 1e-9 : -1e-9);
    return Math.round(nudged) / 10;
  }

  /** One decimal, always shown: 7.85 -> "7.9", 8 -> "8.0". */
  function one(n) {
    return round1(n).toFixed(1);
  }

  function isoToLong(iso) {
    if (!iso) return '';
    var parts = String(iso).split('-');
    if (parts.length !== 3) return String(iso);
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
    var mi = parseInt(parts[1], 10) - 1;
    return parseInt(parts[2], 10) + ' ' + (months[mi] || parts[1]) + ' ' + parts[0];
  }

  /* Storage that degrades quietly. Private-mode Safari throws on setItem. */
  var mem = {};
  var store = {
    get: function (key, fallback) {
      try {
        var raw = window.localStorage.getItem(key);
        if (raw === null) return (key in mem) ? mem[key] : fallback;
        return JSON.parse(raw);
      } catch (e) {
        return (key in mem) ? mem[key] : fallback;
      }
    },
    set: function (key, value) {
      mem[key] = value;
      try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* memory only */ }
    },
    raw: function (key) {
      try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    setRaw: function (key, value) {
      try { window.localStorage.setItem(key, value); } catch (e) { /* memory only */ }
    }
  };

  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms || 120);
    };
  }

  function warn() {
    var args = ['[trip]'].concat(Array.prototype.slice.call(arguments));
    if (window.console && console.warn) console.warn.apply(console, args);
  }

  TRIP.util = {
    el: el, svgEl: svgEl, append: append, clear: clear,
    $: $, $$: $$, qs: qs,
    vnd: vnd, vndRange: vndRange, km: km, one: one, round1: round1,
    isoToLong: isoToLong,
    store: store, debounce: debounce, warn: warn
  };
})(window.TRIP = window.TRIP || {});
