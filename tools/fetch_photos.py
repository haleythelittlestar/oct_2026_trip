#!/usr/bin/env python3
"""Fetch freely-licensed photographs for each location from Wikimedia Commons.

  python tools/fetch_photos.py                 # all locations
  python tools/fetch_photos.py --only cat-ba   # one location
  python tools/fetch_photos.py --dry-run       # report candidates, download nothing
  python tools/fetch_photos.py --max 6         # cap per location (default 8)

Writes, per location:
  locations/<id>/photos/p-<hash>.jpg
  locations/<id>/photos.js          credits, consumed by the site

Why Commons and not Google Maps
-------------------------------
Google's Maps Platform policies require an API key, mandate specific
attribution, and prohibit persisting or caching content outside a user session.
Committing Maps photos into a public repo is exactly that. Scraping Maps is a
separate terms violation. Commons has a real API and licences that permit
redistribution with attribution, which is what a public static site needs.

Three things learned the hard way, all handled below
----------------------------------------------------
1. A generic User-Agent gets HTTP 429. Wikimedia wants a descriptive agent with
   a contact URL.
2. Keyword search alone is unusable: "Dong Do lake" returned photographs of the
   Chicago skyline. Geosearch has better recall but poor precision — it returned
   ISS photographs of Earth for Côn Sơn and aircraft landing at Nội Bài for
   hồ Đồng Đò. Hence the require-terms filter in places.py.
3. Guessing category titles mostly yields "MISSING". Search for the category
   instead, then read its members.
"""

import argparse
import hashlib
import io
import json
import os
import re
import sys
import time
import unicodedata

try:
    import requests
except ImportError:
    sys.exit("This tool needs 'requests'. Install it with:  pip install requests")

from places import GLOBAL_DENY, PLACES

# Windows consoles default to cp1252, which cannot encode "Cát Bà" or "Tràng An".
# Without this, printing a progress line raises UnicodeEncodeError and takes the
# whole location down with it. Line buffering also keeps redirected logs current.
for _stream in (sys.stdout, sys.stderr):
    if hasattr(_stream, "reconfigure"):
        try:
            _stream.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)
        except Exception:
            pass

# Also tee everything to a UTF-8 report file, so the run can be inspected
# afterwards without depending on how the shell handled redirection.
_REPORT = open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            "fetch_report.txt"), "w", encoding="utf-8")
_print = print


def print(*args, **kwargs):          # noqa: A001 - deliberate shadow
    _print(*args, **kwargs)
    try:
        _print(*args, file=_REPORT, **kwargs)
        _REPORT.flush()
    except Exception:
        pass

API = "https://commons.wikimedia.org/w/api.php"

# Wikimedia's User-Agent policy: identify the tool and give a contact point.
# A generic agent is rejected with HTTP 429.
HEADERS = {
    "User-Agent": "Oct2026TripPlanner/1.0 "
                  "(https://github.com/tuedsci; personal trip-planning project) "
                  "python-requests",
    "Accept": "application/json",
}

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCATIONS = os.path.join(ROOT, "locations")

MIN_W, MIN_H = 1200, 700      # minimum size of the *original*, not the download
THUMB_W = 1100                # width we ask Commons to render; see --width
PAUSE = 0.5                   # be polite to the API
DEFAULT_MAX = 8
FORCE = False

SESSION = requests.Session()
SESSION.headers.update(HEADERS)


# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

def norm(s):
    """Lowercase and strip diacritics, so 'Bình Liêu' matches 'binh lieu'."""
    if not s:
        return ""
    s = unicodedata.normalize("NFD", str(s))
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return s.lower().replace("_", " ")


def api(params, what=""):
    params = dict(params)
    params.setdefault("action", "query")
    params.setdefault("format", "json")
    params.setdefault("formatversion", "2")
    try:
        r = SESSION.get(API, params=params, timeout=45)
    except Exception as e:
        print("      ! request failed (%s): %s" % (what, e))
        return None
    if r.status_code != 200:
        print("      ! HTTP %s (%s)" % (r.status_code, what))
        if r.status_code == 429:
            print("        rate limited — check the User-Agent header")
        return None
    try:
        return r.json()
    except ValueError:
        print("      ! bad JSON (%s)" % what)
        return None


IMAGE_PROPS = {
    "prop": "imageinfo|categories",
    "iiprop": "url|size|extmetadata|mime",
    "iiurlwidth": str(THUMB_W),
    "cllimit": "max",
}


def pages_from(data):
    if not data:
        return []
    q = data.get("query")
    if not q:
        return []
    return q.get("pages", []) or []


def geosearch(lat, lon, radius, limit=40):
    return pages_from(api(dict(IMAGE_PROPS, **{
        "generator": "geosearch",
        "ggscoord": "%s|%s" % (lat, lon),
        "ggsradius": str(radius),
        "ggsnamespace": "6",
        "ggslimit": str(limit),
    }), "geosearch %s,%s" % (lat, lon)))


def find_categories(phrase, limit=5):
    """Discover real category titles instead of guessing them."""
    data = api({
        "list": "search",
        "srsearch": phrase,
        "srnamespace": "14",
        "srlimit": str(limit),
    }, "category search %r" % phrase)
    if not data:
        return []
    hits = data.get("query", {}).get("search", []) or []
    return [h["title"] for h in hits]


def category_members(cat_title, limit=50):
    return pages_from(api(dict(IMAGE_PROPS, **{
        "generator": "categorymembers",
        "gcmtitle": cat_title,
        "gcmtype": "file",
        "gcmlimit": str(limit),
    }), "members of %s" % cat_title))


def keyword_search(phrase, limit=25):
    return pages_from(api(dict(IMAGE_PROPS, **{
        "generator": "search",
        "gsrsearch": "filetype:bitmap %s" % phrase,
        "gsrnamespace": "6",
        "gsrlimit": str(limit),
    }), "keyword %r" % phrase))


def wiki_lead_file(lang, title):
    """The Commons file title of a Wikipedia article's lead image.

    An article's lead image is editorially chosen as the best single photograph
    of its subject, which is the precision geosearch and full-text search both
    lack. This returns the *file title* so the caller can fetch it through the
    normal Commons path and inherit the same licence and credit handling —
    rather than downloading a bare URL with no attribution attached.
    """
    url = "https://%s.wikipedia.org/w/api.php" % lang
    params = {
        "action": "query", "format": "json", "formatversion": "2",
        "titles": title, "prop": "pageimages", "piprop": "original",
    }
    try:
        r = SESSION.get(url, params=params, timeout=30)
        if r.status_code != 200:
            return None
        pages = r.json().get("query", {}).get("pages", []) or []
        if not pages or pages[0].get("missing"):
            return None
        orig = pages[0].get("original") or {}
        src = orig.get("source")
        if not src:
            return None
        # .../commons/a/ab/Some_File.jpg?utm_source=...  ->  File:Some_File.jpg
        # The API appends utm_* tracking parameters to this URL. Leaving them on
        # produces a file title like "File:Lan_Ha_Bay.JPG?utm_source=..." which
        # resolves to nothing, and the image is silently dropped as "no
        # imageinfo". Strip the query and any fragment first.
        src = src.split("?", 1)[0].split("#", 1)[0]
        name = src.rsplit("/", 1)[-1]
        if not name:
            return None
        try:
            from urllib.parse import unquote
        except ImportError:
            from urllib import unquote  # py2 safety, harmless
        return "File:" + unquote(name)
    except Exception:
        return None


def files_by_title(titles):
    """Full imageinfo for explicit Commons file titles."""
    if not titles:
        return []
    return pages_from(api(dict(IMAGE_PROPS, **{
        "titles": "|".join(titles[:40]),
    }), "files by title"))


# --------------------------------------------------------------------------- #
# filtering and scoring
# --------------------------------------------------------------------------- #

def meta_value(info, key):
    ex = info.get("extmetadata") or {}
    v = (ex.get(key) or {}).get("value")
    if not v:
        return ""
    # extmetadata values often carry HTML; strip tags crudely, it's only credits.
    out, depth = [], 0
    for ch in str(v):
        if ch == "<":
            depth += 1
        elif ch == ">":
            depth = max(0, depth - 1)
        elif depth == 0:
            out.append(ch)
    return " ".join("".join(out).split())


def candidate_text(page):
    """Title plus category names, normalised — the haystack for term matching."""
    bits = [page.get("title", "")]
    for c in page.get("categories") or []:
        bits.append(c.get("title", ""))
    return norm(" | ".join(bits))


def evaluate(page, require_terms):
    """@return (ok, score, reason)"""
    info = (page.get("imageinfo") or [{}])[0]
    if not info:
        return False, 0, "no imageinfo"

    mime = info.get("mime", "")
    if mime not in ("image/jpeg", "image/png", "image/webp"):
        return False, 0, "mime %s" % mime

    w, h = info.get("width", 0), info.get("height", 0)
    is_wiki = page.get("_source") == "wiki"

    # Wikipedia lead images are judged more leniently, and BEFORE the generic
    # gates. Two reasons:
    #   - Size: several Vietnamese articles use a 1024x768 lead, under the 1200
    #     floor meant to weed out thumbnails. Since everything is downscaled to
    #     ~900 for the site anyway, 1024 is plenty.
    #   - Terms: the file name frequently contains none of our search terms even
    #     when the photo is exactly right, because a human already chose it.
    # Landscape orientation is still enforced — a portrait hero breaks the 16:9
    # card — and so is the denylist.
    floor_w, floor_h = (1000, 640) if is_wiki else (MIN_W, MIN_H)
    if w < floor_w or h < floor_h:
        return False, 0, "too small %sx%s" % (w, h)
    if w <= h:
        return False, 0, "not landscape %sx%s" % (w, h)

    hay = candidate_text(page)

    for bad in GLOBAL_DENY:
        if bad in hay:
            return False, 0, "denylist:%s" % bad

    if is_wiki:
        return True, 100.0 + min(w * h / 1_000_000.0, 12.0), "wiki lead image"

    hits = [t for t in require_terms if norm(t) in hay]
    if not hits:
        return False, 0, "no required term"

    score = 0.0
    score += 3.0 * len(hits)                      # topical confidence
    score += min(w * h / 1_000_000.0, 12.0)       # prefer larger originals
    ratio = w / float(h)
    if 1.3 <= ratio <= 2.1:                       # sits nicely in a 16:9 card
        score += 2.0
    if "quality image" in hay or "featured picture" in hay:
        score += 4.0
    if "panoramio" in hay:                        # bulk import, often mediocre
        score -= 1.0

    return True, score, "ok(%s)" % ",".join(hits[:3])


def licence_url(info):
    ex = info.get("extmetadata") or {}
    for key in ("LicenseUrl", "UsageTerms"):
        v = (ex.get(key) or {}).get("value", "")
        if isinstance(v, str) and v.startswith("http"):
            return v
    short = meta_value(info, "LicenseShortName").lower()
    if "public domain" in short or short.startswith("cc0"):
        return "https://creativecommons.org/publicdomain/mark/1.0/"
    for code in ("by-sa", "by-nc-sa", "by-nd", "by"):
        if "cc " + code in short.replace("-", "-"):
            pass
    if short.startswith("cc by-sa"):
        ver = short.replace("cc by-sa", "").strip() or "4.0"
        return "https://creativecommons.org/licenses/by-sa/%s/" % ver
    if short.startswith("cc by"):
        ver = short.replace("cc by", "").strip() or "4.0"
        return "https://creativecommons.org/licenses/by/%s/" % ver
    return ""


def clean_title(page_title):
    t = page_title
    if t.startswith("File:"):
        t = t[5:]
    for ext in (".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG"):
        if t.endswith(ext):
            t = t[: -len(ext)]
            break
    return t.replace("_", " ").strip()


# --------------------------------------------------------------------------- #
# per-location run
# --------------------------------------------------------------------------- #

def collect(loc_id, cfg):
    """Gather and dedupe candidates from all three retrieval strategies."""
    seen, cands = {}, []

    def take(pages, source):
        for p in pages:
            title = p.get("title")
            if not title or title in seen:
                continue
            seen[title] = True
            p["_source"] = source
            cands.append(p)

    # Highest-precision source first, so its files win the hero slot.
    wiki = cfg.get("wiki") or []
    if wiki:
        print("    wikipedia lead images:")
        titles = []
        for lang, title in wiki:
            ft = wiki_lead_file(lang, title)
            print("      %s:%-32s %s" % (lang, title[:32], ft or "none"))
            if ft and ft not in titles:
                titles.append(ft)
            time.sleep(PAUSE)
        if titles:
            take(files_by_title(titles), "wiki")
            time.sleep(PAUSE)

    print("    geosearch:")
    for label, lat, lon, rad in cfg.get("spots", []):
        pages = geosearch(lat, lon, rad)
        print("      %-28s %3d files" % (label, len(pages)))
        take(pages, "geo")
        time.sleep(PAUSE)

    print("    categories:")
    for phrase in cfg.get("cats", []):
        titles = find_categories(phrase)
        time.sleep(PAUSE)
        if not titles:
            print("      %-28s no category found" % phrase)
            continue
        for ct in titles[:2]:
            pages = category_members(ct)
            print("      %-28s %3d files  <- %s" % (phrase, len(pages), ct))
            take(pages, "cat")
            time.sleep(PAUSE)

    print("    keywords:")
    for phrase in cfg.get("keywords", []):
        pages = keyword_search(phrase)
        print("      %-28s %3d files" % (phrase, len(pages)))
        take(pages, "kw")
        time.sleep(PAUSE)

    return cands


def download(url, dest):
    try:
        r = SESSION.get(url, timeout=90)
        if r.status_code != 200:
            print("      ! download HTTP %s" % r.status_code)
            return False
        with open(dest, "wb") as f:
            f.write(r.content)
        return True
    except Exception as e:
        print("      ! download failed: %s" % e)
        return False


def write_photos_js(loc_id, records):
    path = os.path.join(LOCATIONS, loc_id, "photos.js")
    body = json.dumps(records, indent=2, ensure_ascii=False)
    text = (
        "/* Generated by tools/fetch_photos.py — do not edit by hand.\n"
        " * To drop a photo, add its filename to excludePhotos in data.js;\n"
        " * that survives a re-run of the tool.\n"
        " */\n"
        "TRIP.registerPhotos(%s, %s);\n" % (json.dumps(loc_id), body)
    )
    with io.open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return path


def run_location(loc_id, cfg, cap, dry):
    print("\n" + "=" * 68)
    print("  %s" % loc_id)
    print("=" * 68)

    photo_dir = os.path.join(LOCATIONS, loc_id, "photos")
    if not os.path.isdir(photo_dir):
        os.makedirs(photo_dir)

    cands = collect(loc_id, cfg)
    require = cfg.get("require", [])

    kept, rejected = [], {}
    for p in cands:
        ok, score, reason = evaluate(p, require)
        if ok:
            p["_score"] = score
            kept.append(p)
        else:
            key = reason.split(":")[0].split("(")[0]
            rejected[key] = rejected.get(key, 0) + 1

    kept.sort(key=lambda p: -p["_score"])
    print("\n    %d candidates -> %d relevant" % (len(cands), len(kept)))
    if rejected:
        print("    rejected: " + ", ".join(
            "%s=%d" % (k, v) for k, v in sorted(rejected.items(), key=lambda kv: -kv[1])))

    chosen = kept[:cap]
    records, downloaded, reused = [], 0, 0

    for p in chosen:
        info = (p.get("imageinfo") or [{}])[0]
        src_page = info.get("descriptionurl") or ""
        # Stable filename from the source page, so re-runs are idempotent.
        h = hashlib.sha1((src_page or p["title"]).encode("utf-8")).hexdigest()[:10]
        fname = "p-%s.jpg" % h
        dest = os.path.join(photo_dir, fname)

        if not dry:
            if not FORCE and os.path.exists(dest) and os.path.getsize(dest) > 2048:
                reused += 1
            else:
                url = info.get("thumburl") or info.get("url")
                if not url or not download(url, dest):
                    continue
                downloaded += 1
                time.sleep(0.25)

        records.append({
            "file": fname,
            "title": clean_title(p["title"]),
            "author": meta_value(info, "Artist") or "Unknown",
            "license": meta_value(info, "LicenseShortName") or "see source",
            "licenseUrl": licence_url(info),
            "sourceUrl": src_page,
            "width": info.get("thumbwidth") or info.get("width"),
            "height": info.get("thumbheight") or info.get("height"),
        })
        print("      + %-14s %s" % (fname, records[-1]["title"][:52]))

    if dry:
        print("    (dry run — nothing written)")
        return len(records)

    write_photos_js(loc_id, records)
    print("    wrote photos.js with %d entries (%d new, %d reused)"
          % (len(records), downloaded, reused))
    return len(records)


def main():
    global THUMB_W, FORCE

    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", action="append", help="location id; repeatable")
    ap.add_argument("--max", type=int, default=DEFAULT_MAX, help="photos per location")
    ap.add_argument("--width", type=int, default=THUMB_W,
                    help="requested image width in px (default %d). Commons "
                         "renders the thumbnail server-side, so a smaller value "
                         "means a genuinely smaller download." % THUMB_W)
    ap.add_argument("--force", action="store_true",
                    help="re-download even if the file already exists; needed "
                         "when changing --width, since filenames are stable")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--resize-only", action="store_true",
                    help="downscale the jpgs already on disk to --width, in "
                         "place, with no API calls. Seconds instead of the ~25 "
                         "minutes a full --force re-fetch takes. Needs Pillow.")
    ap.add_argument("--prune-only", action="store_true",
                    help="delete jpgs in photos/ that photos.js no longer "
                         "references, and do nothing else. No API calls. Re-runs "
                         "can pick different photos, which leaves orphans behind. "
                         "Do NOT use if you have added your own photos by hand — "
                         "they are not in photos.js, so they would be deleted.")
    args = ap.parse_args()

    if args.resize_only:
        # Downscale in place, no network. A re-fetch at a smaller --width takes
        # about 25 minutes of API calls and downloads; this does the same job in
        # seconds. Re-encoding a JPEG loses a little quality, which is invisible
        # at these sizes and worth the trade.
        try:
            from PIL import Image
        except ImportError:
            sys.exit("--resize-only needs Pillow:  pip install Pillow")

        target = args.width
        ids = args.only or list(PLACES.keys())
        before = after = 0
        touched = skipped = 0
        for loc_id in ids:
            pdir = os.path.join(LOCATIONS, loc_id, "photos")
            if not os.path.isdir(pdir):
                continue
            for fn in sorted(os.listdir(pdir)):
                if not fn.lower().endswith(".jpg"):
                    continue
                path = os.path.join(pdir, fn)
                size_before = os.path.getsize(path)
                before += size_before
                try:
                    with Image.open(path) as im:
                        if im.width <= target:
                            after += size_before
                            skipped += 1
                            continue
                        h = max(1, int(round(im.height * target / float(im.width))))
                        im = im.convert("RGB").resize((target, h), Image.LANCZOS)
                        im.save(path, "JPEG", quality=82, optimize=True,
                                progressive=True)
                except Exception as e:
                    print("  ! %s/%s: %s" % (loc_id, fn, e))
                    after += size_before
                    continue
                size_after = os.path.getsize(path)
                after += size_after
                touched += 1
                print("  %-18s %-16s %6.0f KB -> %5.0f KB"
                      % (loc_id, fn, size_before / 1024.0, size_after / 1024.0))
        print("\nresized %d file(s) to %d px wide, skipped %d already smaller"
              % (touched, target, skipped))
        print("total %.1f KB -> %.1f KB" % (before / 1024.0, after / 1024.0))
        return

    if args.prune_only:
        ids = args.only or list(PLACES.keys())
        removed = kept_local = 0
        for loc_id in ids:
            pj = os.path.join(LOCATIONS, loc_id, "photos.js")
            dj = os.path.join(LOCATIONS, loc_id, "data.js")
            pdir = os.path.join(LOCATIONS, loc_id, "photos")
            if not os.path.isdir(pdir):
                continue

            keep = set()
            if os.path.exists(pj):
                with io.open(pj, encoding="utf-8") as f:
                    keep |= set(re.findall(r'"file":\s*"([^"]+)"', f.read()))

            # Hand-added photos are listed in data.js, not photos.js. Without
            # this, prune would cheerfully delete the group's own pictures — the
            # one thing in that folder that cannot be re-downloaded.
            if os.path.exists(dj):
                with io.open(dj, encoding="utf-8") as f:
                    d = f.read()
                block = re.search(r"localPhotos:\s*\[(.*?)\n  \]", d, re.S)
                if block:
                    local = set(re.findall(r"file:\s*'([^']+)'", block.group(1)))
                    keep |= local
                    kept_local += len(local)

            for fn in sorted(os.listdir(pdir)):
                if fn.lower().endswith(".jpg") and fn not in keep:
                    os.remove(os.path.join(pdir, fn))
                    print("  removed %s/%s" % (loc_id, fn))
                    removed += 1

        print("\npruned %d orphan file(s); protected %d hand-added photo(s)"
              % (removed, kept_local))
        return

    THUMB_W = args.width
    FORCE = args.force
    IMAGE_PROPS["iiurlwidth"] = str(THUMB_W)

    ids = args.only or list(PLACES.keys())
    unknown = [i for i in ids if i not in PLACES]
    if unknown:
        sys.exit("Unknown location id(s): %s\nKnown: %s"
                 % (", ".join(unknown), ", ".join(PLACES)))

    summary = {}
    for loc_id in ids:
        try:
            summary[loc_id] = run_location(loc_id, PLACES[loc_id], args.max, args.dry_run)
        except KeyboardInterrupt:
            sys.exit("\ninterrupted")
        except Exception as e:
            print("    ! %s failed: %s: %s" % (loc_id, type(e).__name__, e))
            summary[loc_id] = 0
            # Still emit an empty photos.js so the site never 404s on it.
            if not args.dry_run:
                try:
                    write_photos_js(loc_id, [])
                except Exception:
                    pass

    print("\n" + "=" * 68)
    print("  SUMMARY")
    print("=" * 68)
    for k in ids:
        n = summary.get(k, 0)
        note = "" if n else "   <- motif fallback will be used"
        print("  %-20s %2d photo(s)%s" % (k, n, note))
    print("\nNext: check the images, then set heroPhoto / excludePhotos in each data.js.")


if __name__ == "__main__":
    main()
