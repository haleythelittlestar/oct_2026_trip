"""Static checks on the site, since there is no browser or node here.

  python tools\\verify_site.py

Checks
  1  every <script src> / <link href> in the HTML exists on disk
  2  every id in LOCATION_IDS has data.js + photos.js, and vice versa
  3  every photo named in a photos.js exists in that location's photos/
  4  brackets balance in each JS file (catches truncated writes)
  5  the recommendation scores and ranking match the spec table
  6  page weight of the home page's hero images
  7  translation gaps: every { vi: } has an { en: } and vice versa
"""
import io
import os
import re
import sys

for _s in (sys.stdout, sys.stderr):
    if hasattr(_s, "reconfigure"):
        try:
            _s.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)
        except Exception:
            pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOC = os.path.join(ROOT, "locations")

# Expected ranking, in order, from .kiro/specs/trip-vote-site/design.md §4.
# An ordered LIST rather than a dict keyed by score, because con-son-chi-linh
# (7.70) and dong-lam (7.65) both display as 7.7 while ranking differently.
# Deriving the order by sorting displayed scores would make that pair
# indistinguishable and the check meaningless.
EXPECTED_ORDER = [
    ("cat-ba",           7.9),
    ("con-son-chi-linh", 7.7),
    ("dong-lam",         7.7),
    ("binh-lieu",        7.5),
    ("ninh-binh",        7.4),
    ("quan-lan",         6.3),
    ("tam-dao",          5.8),
    ("ho-dong-do",       5.7),
]
EXPECTED = dict(EXPECTED_ORDER)

problems, notes = [], []


def read(path):
    with io.open(path, encoding="utf-8", errors="replace") as f:
        return f.read()


def fail(msg):
    problems.append(msg)


def note(msg):
    notes.append(msg)


def round1(n):
    """Mirror util.js round1(): half away from zero, epsilon-guarded.

    Python's round() is banker's rounding, so round(7.85, 1) gives 7.8 while the
    browser shows 7.9. This check has to use the same rule as the site or it
    reports mismatches that don't exist.
    """
    import math
    scaled = n * 10
    nudged = scaled + (1e-9 if scaled >= 0 else -1e-9)
    return math.floor(nudged + 0.5) / 10 if nudged >= 0 else math.ceil(nudged - 0.5) / 10


# ---- 1. HTML asset references ------------------------------------------- #
print("\n[1] HTML asset references")
for page in ("index.html", "option.html"):
    src = read(os.path.join(ROOT, page))
    refs = re.findall(r'<script[^>]+src="([^"]+)"', src)
    refs += re.findall(r'<link[^>]+href="([^"]+)"', src)
    for ref in refs:
        if ref.startswith(("http:", "https:", "//")):
            continue
        p = os.path.join(ROOT, ref.replace("/", os.sep))
        if os.path.exists(p):
            print("    ok   %-34s %s" % (ref, page))
        else:
            fail("%s references missing file: %s" % (page, ref))
            print("    MISS %-34s %s" % (ref, page))

# ---- 2. registry vs folders -------------------------------------------- #
print("\n[2] registry vs location folders")
reg = read(os.path.join(LOC, "registry.js"))
block = re.search(r"LOCATION_IDS\s*=\s*\[(.*?)\]", reg, re.S)
ids = re.findall(r"'([^']+)'", block.group(1)) if block else []
print("    LOCATION_IDS: %s" % ", ".join(ids))

for lid in ids:
    for fn in ("data.js", "photos.js"):
        p = os.path.join(LOC, lid, fn)
        if not os.path.exists(p):
            fail("registered id '%s' has no %s" % (lid, fn))
            print("    MISS %s/%s" % (lid, fn))
    d = os.path.join(LOC, lid, "data.js")
    if os.path.exists(d):
        m = re.search(r"id:\s*'([^']+)'", read(d))
        if m and m.group(1) != lid:
            fail("locations/%s/data.js declares id '%s'" % (lid, m.group(1)))

for entry in sorted(os.listdir(LOC)):
    p = os.path.join(LOC, entry)
    if not os.path.isdir(p) or entry.startswith("_"):
        continue
    if entry not in ids:
        note("folder locations/%s exists but is not in LOCATION_IDS" % entry)
if not problems:
    print("    all registered ids resolve")

# ---- 3. photo references ----------------------------------------------- #
print("\n[3] photo files referenced vs on disk")
total_bytes, hero_bytes = 0, 0
hero_sizes = []
for lid in ids:
    pj = os.path.join(LOC, lid, "photos.js")
    if not os.path.exists(pj):
        continue
    txt = read(pj)
    all_files = re.findall(r'"file":\s*"([^"]+)"', txt)

    # Honour excludePhotos, so this reports what the site actually shows rather
    # than what the tool happened to download.
    d = read(os.path.join(LOC, lid, "data.js"))
    exc_block = re.search(r"excludePhotos:\s*\[(.*?)\]", d, re.S)
    excluded = re.findall(r"'([^']+)'", exc_block.group(1)) if exc_block else []

    # Hand-added photos come first and are not in photos.js.
    local_files = []
    lp = re.search(r"localPhotos:\s*\[(.*?)\n  \]", d, re.S)
    if lp:
        body = re.sub(r"(?m)^\s*//.*$", "", lp.group(1))   # drop commented examples
        local_files = re.findall(r"file:\s*'([^']+)'", body)

    all_files = local_files + all_files
    files = [f for f in all_files if f not in excluded]

    pdir = os.path.join(LOC, lid, "photos")
    missing = [f for f in files if not os.path.exists(os.path.join(pdir, f))]
    sizes = [os.path.getsize(os.path.join(pdir, f)) for f in files
             if os.path.exists(os.path.join(pdir, f))]
    total_bytes += sum(sizes)
    if sizes:
        hero_bytes += sizes[0]
        hero_sizes.append(sizes[0])
    orphans = []
    if os.path.isdir(pdir):
        orphans = [f for f in os.listdir(pdir)
                   if f.lower().endswith(".jpg") and f not in all_files]
    # credits must be complete for every kept photo
    missing_credit = txt.count('"author": ""') + txt.count('"license": ""')
    detail = ("motif fallback (SVG illustration)" if not files
              else "%.0f KB" % (sum(sizes) / 1024.0))
    if local_files:
        detail += ", %d hand-added" % len(local_files)
    if excluded:
        detail += ", %d excluded by hand" % len(excluded)
    print("    %-20s %d shown, %d missing, %d orphan, %s"
          % (lid, len(files), len(missing), len(orphans), detail))
    if missing:
        fail("%s: photos.js references missing files: %s" % (lid, ", ".join(missing)))
    if orphans:
        note("%s: %d jpg on disk not in photos.js (harmless)" % (lid, len(orphans)))
    if missing_credit:
        fail("%s: %d photo(s) with an empty author or licence" % (lid, missing_credit))

# ---- 4. bracket balance ------------------------------------------------ #
print("\n[4] bracket balance in JS")
js = []
for base, _dirs, fs in os.walk(ROOT):
    if ".git" in base:
        continue
    for f in fs:
        if f.endswith(".js"):
            js.append(os.path.join(base, f))
for p in sorted(js):
    s = read(p)
    # Strip block comments, then STRINGS, then line comments. Order matters:
    # stripping line comments first eats the "//" inside 'http://www.w3.org/...'
    # and leaves an unterminated quote, which corrupts everything after it and
    # reports a phantom imbalance.
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    s = re.sub(r"'(?:\\.|[^'\\\n])*'", "''", s)
    s = re.sub(r'"(?:\\.|[^"\\\n])*"', '""', s)
    s = re.sub(r"(?m)//.*$", "", s)
    bad = []
    for o, c in (("{", "}"), ("(", ")"), ("[", "]")):
        if s.count(o) != s.count(c):
            bad.append("%s%s %d/%d" % (o, c, s.count(o), s.count(c)))
    rel = os.path.relpath(p, ROOT)
    if bad:
        fail("%s: unbalanced %s" % (rel, "; ".join(bad)))
        print("    BAD  %-44s %s" % (rel, "; ".join(bad)))
    else:
        print("    ok   %s" % rel)

# ---- 5. scores and ranking --------------------------------------------- #
print("\n[5] recommendation scores")
cfg = read(os.path.join(ROOT, "config.js"))
weights = {}
for key, w in re.findall(r"key:\s*'(\w+)'.*?weight:\s*([0-9.]+)", cfg):
    weights[key] = float(w)
wsum = sum(weights.values())
print("    weights: %s" % ", ".join("%s=%.2f" % kv for kv in weights.items()))
if abs(wsum - 1.0) > 0.001:
    fail("weights sum to %.4f, expected 1.0" % wsum)
else:
    print("    weights sum to 1.00  ok")

computed = []
for lid in ids:
    d = read(os.path.join(LOC, lid, "data.js"))
    status = (re.search(r"status:\s*'(\w+)'", d) or [None, "?"])[1]
    sblock = re.search(r"scores:\s*\{(.*?)\}", d, re.S)
    scores = {}
    if sblock:
        for k, v in re.findall(r"(\w+)\s*:\s*(\d+)", sblock.group(1)):
            scores[k] = int(v)
    missing = [k for k in weights if k not in scores]
    if missing:
        fail("%s: no score for %s" % (lid, ", ".join(missing)))
    total = sum(scores.get(k, 0) * w for k, w in weights.items())
    tb = (re.search(r"tieBreak:\s*(\d+)", d) or [None, "99"])[1]
    if status == "live":
        computed.append((lid, total, int(tb)))
    print("    %-20s %-5s %5.2f -> %.1f" % (lid, status, total, round1(total)))

computed.sort(key=lambda r: (-r[1], r[2]))
print("\n    ranking:")
for i, (lid, total, _tb) in enumerate(computed, 1):
    exp = EXPECTED.get(lid)
    got = round1(total)
    flag = "ok" if exp is not None and abs(got - exp) < 0.05 else "MISMATCH exp %s" % exp
    if flag != "ok":
        fail("%s: score %.1f but spec says %s" % (lid, got, exp))
    print("      %d. %-20s %.1f  %s" % (i, lid, got, flag))

expected_order = [k for k, _ in EXPECTED_ORDER]
actual_order = [lid for lid, _, _ in computed]
if actual_order != expected_order:
    fail("ranking order differs from spec\n      expected %s\n      actual   %s"
         % (expected_order, actual_order))
else:
    print("    order matches the spec table  ok")

# Two adjacent locations displaying the same rounded score is fine and honest —
# they really are near-tied — but flag it so it is a known fact, not a surprise.
for i in range(len(computed) - 1):
    a, b = computed[i], computed[i + 1]
    if abs(round1(a[1]) - round1(b[1])) < 0.001:
        note("%s and %s both display %.1f (raw %.3f vs %.3f) — near-tie, "
             "ordered by tieBreak" % (a[0], b[0], round1(a[1]), a[1], b[1]))

# ---- 6. weight ---------------------------------------------------------- #
print("\n[6] page weight")

# Card images carry loading="lazy", so the initial view fetches only what is
# actually on screen — roughly the first two cards on a phone. Judging the
# budget on all seven heroes would measure something the browser never does in
# one go, so report both and only flag the part that loads up front.
above_fold = sum(hero_sizes[:2])
code_bytes = 0
for rel in ("index.html", "config.js", "locations/registry.js",
            "assets/css/styles.css", "assets/js/i18n.js", "assets/js/util.js",
            "assets/js/score.js", "assets/js/motif.js", "assets/js/render.js",
            "assets/js/motion.js", "assets/js/home.js"):
    p = os.path.join(ROOT, rel.replace("/", os.sep))
    if os.path.exists(p):
        code_bytes += os.path.getsize(p)
for lid in ids:
    for fn in ("data.js", "photos.js"):
        p = os.path.join(LOC, lid, fn)
        if os.path.exists(p):
            code_bytes += os.path.getsize(p)

print("    all photos on disk       %8.1f KB" % (total_bytes / 1024.0))
print("    all %d heroes             %8.1f KB  (lazy — not one request)"
      % (len(hero_sizes), hero_bytes / 1024.0))
print("    html + css + js + data   %8.1f KB" % (code_bytes / 1024.0))
print("    initial view (code + 2)  %8.1f KB" % ((code_bytes + above_fold) / 1024.0))

initial = code_bytes + above_fold
if initial > 900 * 1024:
    note("initial view is %.1f KB, heavier than a phone on mobile data wants. "
         "Re-fetch smaller: python tools\\fetch_photos.py --width 800 --force"
         % (initial / 1024.0))
if hero_bytes / max(1, len(hero_sizes)) > 450 * 1024:
    note("heroes average %.0f KB each; consider --width 800."
         % (hero_bytes / max(1, len(hero_sizes)) / 1024.0))

# ---- 7. translation gaps ------------------------------------------------ #
print("\n[7] translation coverage")

# A bundle is { vi: '…', en: '…' }. Count the keys per file: they should match,
# and every bundle should carry both. This is a lexical check, not a parse, but
# a mismatch is a reliable signal that a translation was missed.
i18n_targets = [os.path.join(ROOT, "config.js")]
for lid in ids:
    i18n_targets.append(os.path.join(LOC, lid, "data.js"))
i18n_targets.append(os.path.join(LOC, "_template", "data.js"))

for p in i18n_targets:
    if not os.path.exists(p):
        continue
    s = read(p)
    s_nc = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    s_nc = re.sub(r"(?m)^\s*//.*$", "", s_nc)
    n_vi = len(re.findall(r"(?<![\w$])vi\s*:", s_nc))
    n_en = len(re.findall(r"(?<![\w$])en\s*:", s_nc))
    rel = os.path.relpath(p, ROOT)
    if n_vi == n_en:
        print("    ok   %-34s %3d bilingual strings" % (rel, n_vi))
    else:
        fail("%s: %d 'vi:' vs %d 'en:' — a translation is missing" % (rel, n_vi, n_en))
        print("    BAD  %-34s vi=%d en=%d" % (rel, n_vi, n_en))

# The UI string table must cover both languages for every key.
p = os.path.join(ROOT, "assets", "js", "i18n.js")
if os.path.exists(p):
    s = re.sub(r"/\*.*?\*/", "", read(p), flags=re.S)
    n_vi = len(re.findall(r"(?<![\w$])vi\s*:", s))
    n_en = len(re.findall(r"(?<![\w$])en\s*:", s))
    if n_vi == n_en:
        print("    ok   %-34s %3d UI strings" % ("assets/js/i18n.js", n_vi))
    else:
        fail("i18n.js: %d 'vi:' vs %d 'en:' in the UI string table" % (n_vi, n_en))
        print("    BAD  %-34s vi=%d en=%d" % ("assets/js/i18n.js", n_vi, n_en))

# Untranslated leftovers: a section title still given as a bare string is
# usually an oversight rather than a deliberate choice.
for lid in ids:
    d = read(os.path.join(LOC, lid, "data.js"))
    bare = re.findall(r"title:\s*'([^']{3,})'", d)
    if bare:
        note("%s: %d section title(s) still a plain string: %s"
             % (lid, len(bare), "; ".join(bare[:3])))

# ---- 8. reviews ---------------------------------------------------------- #
print("\n[8] published-review synthesis")
for lid in ids:
    d = read(os.path.join(LOC, lid, "data.js"))
    block = re.search(r"reviews:\s*\{(.*?)\n  \},", d, re.S)
    if not block:
        fail("%s: no reviews block" % lid)
        print("    MISS %s" % lid)
        continue
    b = block.group(1)
    n_praise = len(re.findall(r"\{\s*vi:", b.split("praise:")[1].split("gripes:")[0])) \
        if "praise:" in b and "gripes:" in b else 0
    n_gripes = len(re.findall(r"\{\s*vi:", b.split("gripes:")[1].split("sources:")[0])) \
        if "gripes:" in b and "sources:" in b else 0
    n_src = len(re.findall(r"url:\s*'https?://", b))
    has_verdict = "verdict:" in b

    problems_here = []
    if not has_verdict:
        problems_here.append("no verdict")
    if n_praise < 2:
        problems_here.append("only %d praise point(s)" % n_praise)
    if n_gripes < 2:
        problems_here.append("only %d gripe(s)" % n_gripes)
    # A synthesis with no citation is just an assertion.
    if n_src < 1:
        problems_here.append("no sources cited")

    if problems_here:
        fail("%s reviews: %s" % (lid, "; ".join(problems_here)))
        print("    BAD  %-20s %s" % (lid, "; ".join(problems_here)))
    else:
        print("    ok   %-20s %d praise, %d gripes, %d source(s)"
              % (lid, n_praise, n_gripes, n_src))
    # Balance check: all-positive reads like marketing, not a review summary.
    if n_gripes and n_praise and n_gripes * 3 < n_praise:
        note("%s: %d praise vs %d gripes — lopsided, reads promotional"
             % (lid, n_praise, n_gripes))

# ---- report ------------------------------------------------------------- #
print("\n" + "=" * 62)
if problems:
    print("  %d PROBLEM(S)" % len(problems))
    for p in problems:
        print("   x " + p)
else:
    print("  no problems found")
if notes:
    print("\n  %d note(s)" % len(notes))
    for n in notes:
        print("   - " + n)
print("=" * 62)
sys.exit(1 if problems else 0)
