/* score.js — the recommendation model. Pure functions, no DOM.

   score = sum over criteria of ( clamp(value, 0, 10) * weight )

   Nothing here ever throws on bad data: a malformed location is reported and
   skipped, a missing score counts as 0, an out-of-range score is clamped. The
   site must still render when the data is wrong. */
(function (TRIP) {
  'use strict';

  function warn() {
    var args = ['[trip/score]'].concat(Array.prototype.slice.call(arguments));
    if (window.console && console.warn) console.warn.apply(console, args);
  }

  function clamp(n, lo, hi) { return n < lo ? lo : (n > hi ? hi : n); }

  /** Check the published weights add up. Console-only; never blocks rendering. */
  function validateConfig(config) {
    var criteria = (config && config.criteria) || [];
    if (!criteria.length) {
      warn('no criteria defined in config.js');
      return false;
    }
    var sum = criteria.reduce(function (a, c) { return a + (Number(c.weight) || 0); }, 0);
    if (Math.abs(sum - 1) > 0.001) {
      warn('criterion weights sum to ' + sum.toFixed(4) + ', expected 1.0. ' +
           'Scores will still compute, but they are no longer on a 0–10 scale.');
      return false;
    }
    return true;
  }

  /** @returns {{ok:boolean, problems:string[]}} */
  function validateLocation(loc, criteria) {
    var problems = [];
    if (!loc || typeof loc !== 'object') return { ok: false, problems: ['not an object'] };
    if (!loc.id) problems.push('missing id');
    if (!loc.name) problems.push('missing name');
    if (!loc.scores || typeof loc.scores !== 'object') problems.push('missing scores');
    else {
      criteria.forEach(function (c) {
        var v = loc.scores[c.key];
        if (v === undefined || v === null) problems.push('no score for "' + c.key + '"');
        else if (typeof v !== 'number' || !isFinite(v)) problems.push('score for "' + c.key + '" is not a number');
      });
    }
    // Missing scores are recoverable (treated as 0); only structural faults are fatal.
    var fatal = !loc || !loc.id || !loc.name || !loc.scores;
    return { ok: !fatal, problems: problems };
  }

  /**
   * @returns {{ total:number, parts:Array<{key,label,short,weight,value,contribution}> }}
   */
  function compute(loc, criteria) {
    var total = 0;
    var parts = criteria.map(function (c) {
      var raw = loc && loc.scores ? loc.scores[c.key] : undefined;
      var value;

      if (typeof raw !== 'number' || !isFinite(raw)) {
        if (raw !== undefined && raw !== null) {
          warn('"' + (loc && loc.id) + '": score for "' + c.key + '" is not a number, using 0');
        }
        value = 0;
      } else if (raw < 0 || raw > 10) {
        warn('"' + (loc && loc.id) + '": score for "' + c.key + '" is ' + raw +
             ', clamped to 0–10');
        value = clamp(raw, 0, 10);
      } else {
        value = raw;
      }

      var weight = Number(c.weight) || 0;
      var contribution = value * weight;
      total += contribution;

      return {
        key: c.key, label: c.label, short: c.short || c.label,
        weight: weight, value: value, contribution: contribution
      };
    });

    return { total: total, parts: parts };
  }

  /**
   * Live locations only, sorted by score descending then tieBreak ascending so
   * the order is deterministic and never reshuffles between loads.
   *
   * @param weightsOverride optional {key: weight} — used by the compare sliders
   * @returns Array<{loc, score, rank}>
   */
  function rank(locations, criteria, weightsOverride) {
    var crit = criteria;
    if (weightsOverride) {
      crit = criteria.map(function (c) {
        var w = weightsOverride[c.key];
        return {
          key: c.key, label: c.label, short: c.short,
          weight: (typeof w === 'number' && isFinite(w)) ? w : c.weight
        };
      });
    }

    var rows = [];
    (locations || []).forEach(function (loc) {
      var check = validateLocation(loc, criteria);
      if (!check.ok) {
        warn('skipping location "' + ((loc && loc.id) || '?') + '": ' + check.problems.join('; '));
        return;
      }
      if (loc.status === 'draft') return;           // registered but not published
      if (loc.status && loc.status !== 'live') {
        warn('"' + loc.id + '": unknown status "' + loc.status + '", treating as draft');
        return;
      }
      rows.push({ loc: loc, score: compute(loc, crit) });
    });

    rows.sort(function (a, b) {
      var d = b.score.total - a.score.total;
      if (Math.abs(d) > 1e-9) return d;
      var at = typeof a.loc.tieBreak === 'number' ? a.loc.tieBreak : 999;
      var bt = typeof b.loc.tieBreak === 'number' ? b.loc.tieBreak : 999;
      if (at !== bt) return at - bt;
      return String(a.loc.name).localeCompare(String(b.loc.name));
    });

    rows.forEach(function (r, i) { r.rank = i + 1; });
    return rows;
  }

  TRIP.score = {
    compute: compute,
    rank: rank,
    validateConfig: validateConfig,
    validateLocation: validateLocation
  };
})(window.TRIP = window.TRIP || {});
