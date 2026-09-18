# Mình đi đâu đây? — October 2026 trip site

A small static site that presents the candidate destinations for a 2–3 day group trip from
Hải Phòng in the first week of October 2026, ranked by a transparent recommendation score.

**Vietnamese is always the default.** English sits behind the **EN** button in the header so the
content can be proof-read; the choice persists. The browser's own language is deliberately
*not* consulted — several of the group have phones set to English, and sniffing
`navigator.language` would have served them the wrong version.

**The voice is deliberately playful**, because the readers are friends in their twenties, not
a procurement committee. Two things stay completely straight: anything inside a warning callout,
and `aria-label` text. A joke inside a drowning warning is a bad joke, and a screen-reader label
is not a stage.

All content lives in the site itself — one folder per destination under `locations/`. There is no
separate source document; the data files *are* the source.

No build step. No dependencies. No backend.

---

## Run it locally

### The quick way — just open the file

```
Double-click index.html
```

That's it. The site is deliberately built so it works straight off the filesystem: all data
loads through classic `<script>` tags, and nothing uses `fetch()` or ES modules (both are
blocked by CORS under `file://`). So you can edit a file, hit refresh, and see the change.

### The accurate way — a local server

`file://` differs slightly from a real web server: relative paths resolve a bit differently
and `loading="lazy"` behaves inconsistently. To test what GitHub Pages will actually serve:

```bat
cd "haleythelittlestar\oct_2026_trip"
python -m http.server 8000
```

Then open **http://localhost:8000**.

To check it on your phone on the same Wi-Fi, find your machine's IP (`ipconfig`) and visit
`http://<your-ip>:8000`. This is the single most useful test, since almost everyone will
open the real link on a phone.

### What to click through

- The site should open **in Vietnamese**, listing **8 destinations** ranked Cát Bà (7.9) first,
  hồ Đồng Đò (5.7) last. Ranks 2 and 3 both show 7.7 — that is a real near-tie, not a bug.
- The **EN** button switches language in place, without losing your scroll position. Everything
  should change: headings, buttons, fact labels, the risk words, the compare table. Photo
  credits and place names should not.
- Each card links to `option.html?id=<location>`.
- The **Không đồng ý với xếp hạng?** panel at the bottom: move a weight slider, the table
  re-orders live.
- On a detail page: the accordions, a photo tap to open the lightbox (`Esc` closes it), and the
  prev/next links.
- The **☾ / ☀** button toggles light and dark; both choices persist across reloads.
- Open the browser console (F12). It should be clean. A missing translation or data problem is
  reported there by name.

---

## Editing content

Everything about one destination lives in one folder:

```
locations/cat-ba/
├── data.js        facts, scores, prose        <- hand-written, edit this
├── photos.js      credits                    <- generated, don't edit
└── photos/        the images                 <- generated
```

To change wording, numbers or scores for a place, edit its `data.js`. Nothing else is affected.

### Adding a destination

1. Copy `locations/_template/` to `locations/<your-id>/`
2. Fill in `data.js` (the template documents every field)
3. Add `'<your-id>'` to `LOCATION_IDS` in [`locations/registry.js`](locations/registry.js)

That single line is the only edit needed outside the new folder. Set `status: 'draft'` to keep
it hidden while you work on it.

### Editing the Vietnamese and English text

Every reader-facing string in a `data.js` is either a **plain string**, when both languages use
it unchanged (place names, `65 km`, `1,8–3,0 tr`), or a **pair**:

```js
tagline: {
  vi: 'Hòn đảo ngay cạnh nhà, và một ngày trên vịnh đẹp nhất trong tầm với.',
  en: 'The island next door, and the best day on the water you can get from home.'
}
```

Both languages live in the *same* file, side by side. That is deliberate: a separate
`data.vi.js` would let the two drift apart, and nothing would stop the Vietnamese version
carrying a different score or a missing section. This way the structure is shared by
construction, and only the words differ.

Keep the two sides the same length element-for-element — same number of paragraphs, same number
of bullets. A missing `vi` falls back to English and logs a console warning rather than
rendering `undefined`, and `verify_site.py` counts the pairs per file so a gap shows up as a
mismatch.

Strings the **site itself** owns — button labels, table headers, `aria-label` text, the words
"Thấp / Trung bình / Cao" — are not in the data files. They live in the `STRINGS` table in
[`assets/js/i18n.js`](assets/js/i18n.js).

Two things stay untranslated on purpose: **place names**, and **photo credits**. An author's
name and a licence label like `CC BY-SA 4.0` are not translatable, and rewording them would
weaken the attribution.

### Changing the ranking

Scores live per location in `data.js`. The weights live in [`config.js`](config.js) and must
sum to `1.0` — if they don't, the console says so and the score is no longer on a 0–10 scale.

Current weights: scenery 25%, distance 15%, access 15%, safety 15%, things to do 15%,
local feel 10%, value 5%.

---

## Photos

```bat
python tools\fetch_photos.py                       rem all locations
python tools\fetch_photos.py --only cat-ba         rem just one
python tools\fetch_photos.py --dry-run             rem report only, download nothing
python tools\fetch_photos.py --max 6               rem cap per location
python tools\fetch_photos.py --width 800 --force      rem re-download smaller (slow)
python tools\fetch_photos.py --resize-only --width 800  rem downscale in place (seconds)
python tools\fetch_photos.py --prune-only            rem delete unreferenced jpgs
```

**If the photos are too heavy, use `--resize-only`.** A `--force` re-fetch at a smaller
`--width` takes about 25 minutes of API calls and downloads; `--resize-only` does the same job
locally in seconds using Pillow. It shrank this repo's photos from 13.4 MB to 4.1 MB. The only
cost is one JPEG re-encode, which is invisible at these sizes.

`--force` is needed whenever you change `--width` on a real fetch, because filenames are derived
from the source page and existing files are otherwise reused. `--prune-only` deletes any photo
not listed in `photos.js`, so don't use it if you've added your own images by hand.

Needs `requests` (`pip install requests`). Re-running is safe: filenames are derived from the
source page, so existing files are reused rather than re-downloaded. A full report lands in
`tools/fetch_report.txt`.

To drop a bad photo, add its filename to `excludePhotos` in that location's `data.js` — that
survives a re-run. To pick a different hero, set `heroPhoto` to another index (or `null` to
force the illustration).

### Adding your own photos — the best option available

The fetch tool can only find what happens to be online under a free licence, and for several of
these places that is nothing at all. A photo you took yourself beats every one of them.

1. Drop the image into `locations/<id>/photos/`
2. List it in `localPhotos` in that location's `data.js`:

```js
localPhotos: [
  { file: 'my-sunset.jpg', title: 'Chiều trên hồ' }
]
```

Hand-added photos are shown **before** anything the tool found, so the first one becomes the hero.
They are never touched by `--force` or `--prune-only` — `--prune-only` reads `localPhotos` precisely
so it cannot delete the one kind of file in that folder that can't be re-downloaded.

Leave `author` / `license` / `sourceUrl` off for your own pictures and the caption reads
"Ảnh của nhóm". Fill them in if the image came from someone else and you are entitled to publish
it. Don't invent a licence.

### Where attribution appears

Not under each thumbnail — that made the gallery read like a bibliography. Instead:

- one collapsed **Nguồn ảnh / Photo credits** block below the grid, listing every photo with its
  author, licence and a link to the original
- and again inside the lightbox, when a photo is opened

It cannot be removed altogether. Naming the author and the licence is the *condition* under which
a CC BY or CC BY-SA photo may be used; strip it and the site is infringing rather than reusing.
Consolidating it is fine — the licences ask for attribution "in a reasonable manner", and a credits
list on the same page is standard practice.

Photos you add yourself with no `author` or `license` fields are treated as the group's own and are
left out of the credits list entirely, since they need no attribution.

### Sources that were ruled out, and why

Worth recording so nobody re-litigates it:

| Source | Verdict |
|---|---|
| **TripAdvisor** | **No.** Their [Caching Policy](https://tripadvisor-content.readme.io/docs/caching-policy) states that caching, copying, downloading, storing or indexing content is not permitted for any content, with only the Location ID exempt. Committing photos to a repo is exactly that. The Content API doesn't rescue it either: credentials must be kept secure, which a public static repo cannot do, and there are logo-attribution display requirements. Scraping the site is a separate violation. |
| **Google Maps / Places** | No. Same shape of problem — persisting content outside a user session is prohibited. |
| **Travel blogs, tour operators** | No. Rights-reserved by default. |
| **Unsplash / Pexels** | Licences *do* permit download and redistribution, so these are the one realistic stock option. Both return HTTP 403 to scripted requests, so it needs their official API and a key. **Viable if you want it:** the key lives in an environment variable and is only used at fetch time on your machine, so it never enters the repo. Coverage for specific rural places is the open question — stock search tends to return generic Vietnam imagery, which is worse than an honest illustration. |
| **Openverse / Flickr CC** | Partly. Real coverage, but its full-text search is as noisy as Commons (a search for Đền Sóc returned a Norwegian government conference), and much of the pool is `by-nc-nd` — NoDerivatives, awkward for a pipeline that resizes every file. Exclude `nd` if you add it. |

### Sources, in order of precision

1. **Wikipedia lead images** (`wiki` in `places.py`). An article's lead image is editorially
   chosen as the best single photograph of its subject, which is exactly the precision geosearch
   and full-text search both lack. These are exempt from the require-terms filter and get a large
   scoring bonus so they land first and become the hero. The tool resolves the Commons file title
   and fetches it through the normal path, so licence and credit handling is inherited rather than
   reimplemented.
2. **Commons category members**, with the category *discovered* by search rather than guessed.
3. **Commons geosearch** — good recall, poor precision.
4. **Commons full-text search** — worst precision, used last.

Two traps in the lead-image path, both now handled:

- The API appends `?utm_source=…` tracking parameters to the image URL. Leaving them on produces a
  file title like `File:Lan_Ha_Bay.JPG?utm_source=…`, which resolves to nothing and gets silently
  dropped as "no imageinfo".
- Several Vietnamese articles use a 1024×768 lead, under the 1200 px floor meant to weed out
  thumbnails. Lead images therefore get a lower floor (1000×640), since everything is downscaled
  to ~900 anyway.
- Infobox maps leak in as lead images — Thác Khe Vằn's article returns
  `Vietnam_relief_location_map.jpg`. Map patterns are on the denylist.

### Why Wikimedia Commons

Because it is the only source with a real API *and* licences that permit redistributing the file
with attribution. See the ruled-out table above for what was considered and rejected. Every photo
on the site carries its author and licence and links back to the original.

### Three things the tool has to handle

Learned by getting them wrong first:

1. **A descriptive User-Agent is mandatory.** A generic one gets HTTP 429.
2. **Keyword search alone is useless.** Searching `"Dong Do lake"` returned photographs of the
   **Chicago skyline**. Geographic search has better recall but poor precision — it returned
   **ISS photographs of Earth** for Côn Sơn and **aircraft landing at Nội Bài** for Đồng Đò
   (the airport is 8 km away). So every candidate must match a location-specific term, and a
   denylist rejects aircraft, satellite imagery, logos, maps and stamps. Search terms live in
   [`tools/places.py`](tools/places.py).
3. **Category titles can't be guessed.** Search for the category, then read its members.

### What the last run produced

| Location | Candidates | Relevant | Shown |
|---|---|---|---|
| Ninh Bình | 372 | 173 | 8 |
| Cát Bà | 297 | 225 | 8 |
| hồ Đồng Đò | 155 | 42 | 8 |
| Tam Đảo | 145 | 37 | 8 |
| Quan Lạn | 106 | 14 | 8 |
| Côn Sơn – Chí Linh | 166 | 2 | 2 |
| Bình Liêu | 18 | 2 | 2 |
| Đồng Lâm – Hữu Liên | 113 | 2 | **0** |

Commons coverage thins out fast once a place is not famous. Đồng Lâm is the extreme case: the two
files that survived filtering were a **frog from a species description** (the paper mentions Hữu
Liên Nature Reserve) and a **colonial-era railway photograph**. Both are listed in that location's
`excludePhotos`, so the site shows the illustration instead — which is the right answer, and the
reason `motif.js` exists.

Where a location has no usable photo, the site renders a layered SVG built from its own colour
theme ([`assets/js/motif.js`](assets/js/motif.js)) rather than a broken image. Drop your own
photographs into `locations/<id>/photos/` and list them in `photos.js` to replace it.

---

## Deploying to GitHub Pages

1. Push this folder — either as its own repo, or as a subfolder of an existing one.
2. **Settings → Pages →** deploy from branch, and pick the folder containing `index.html`.
3. `.nojekyll` is already here so Jekyll leaves the files alone.
4. All asset paths are relative, so the site works at a domain root or in a repo subpath.

### What ships, and what doesn't

This repo *is* the deployed site: Pages serves whatever is committed, so anything committed is
public and anything ignored simply won't exist live. Currently **84 files, about 7.1 MB**, of which
the photos are 7 MB.

`.gitignore` keeps out `ideas.md` (the original research notes — superseded, and no longer linked
from the site), the photo tool's run log, backdrop previews, Python bytecode, OneDrive and editor
cruft, and anything matching `tools/_*` (the convention for scratch files).

Deliberately **kept**:

- `locations/*/photos/*.jpg` — these are the site's images, not build output. Ignoring them would
  leave every card showing the SVG illustration.
- `tools/*.py` — how you regenerate photos and re-verify. No secrets in them, so public is fine.
- `locations/_template/` — needed to add a destination. Never loaded at runtime, since it isn't in
  `LOCATION_IDS`.
- `README.md` — this file. Tiny, and it's the only maintenance documentation.

To confirm nothing important is being excluded before you push:

```bat
git add -A --dry-run
git status --ignored
```

If you ever add photo originals, park them in `_originals/` — already ignored, so the full-res
files stay off GitHub while the resized copies ship.

---

## Structure

```
oct_2026_trip/
├── index.html              home: ranked destinations + compare panel
├── option.html             detail template, ?id=<location>
├── config.js               criteria, weights, trip metadata
├── assets/
│   ├── css/styles.css      one stylesheet, custom properties, light + dark
│   └── js/
│       ├── i18n.js         VI/EN resolution + the UI string table
│       ├── backdrop.js     the page's landscape backdrop (inline SVG)
│       ├── util.js         DOM builder, formatters, storage
│       ├── score.js        compute / rank / validate — pure, no DOM
│       ├── motif.js        SVG fallback illustrations
│       ├── render.js       every component builder
│       ├── motion.js       reveal, bar fills, lightbox, theme
│       ├── home.js         home controller
│       └── option.js       detail controller
├── locations/
│   ├── registry.js         the one place to register a location
│   ├── _template/          copy this to start a new one
│   └── <id>/               data.js + photos.js + photos/
└── tools/
    ├── fetch_photos.py     photo pipeline
    └── places.py           per-location search config
```

---

## Verifying

There is no browser or Node here, so `tools/verify_site.py` does what it can statically:

```bat
python tools\verify_site.py
```

It checks that every `<script>` and `<link>` in the HTML resolves, that every registered
location has `data.js` + `photos.js`, that every photo named in a `photos.js` exists on disk
with a complete credit, that brackets balance in each JS file, that the computed scores and
ranking match the table in the spec, that every `vi:` has a matching `en:`, and what the
initial page view weighs. Exit code is non-zero if anything fails.

It is not a substitute for opening the site — it cannot catch a runtime error, a layout
problem, or a broken interaction. Do both.

---

## Known issues

- **Browser testing outstanding.** This is the real gap. The site has not been opened in a
  browser at all — there was none available where it was built. Static checks cannot catch a
  runtime error, a layout problem, or a broken interaction. The rendering, language-switch,
  keyboard, contrast and reduced-motion checks in
  [`.kiro/specs/trip-vote-site/design.md`](../../.kiro/specs/trip-vote-site/design.md) §12 all
  still need doing by hand.

- **Bình Liêu is down to one photograph.** Adding map patterns to the denylist correctly removed
  `Vietnam_relief_location_map.jpg`, which Wikipedia was serving as the lead image for Thác Khe Vằn
  — but it also cost a second borderline file. One real photo plus the illustration is acceptable;
  your own photos would be better.

- **Two hero images are judgement calls.** Đền Kiếp Bạc's Wikipedia lead image is a **1904
  photograph** — precise, properly licensed, and possibly not the hero you want. Cát Bà's hero is
  now the Cát Bà National Park article image. If either is wrong, set `heroPhoto` to a different
  index in that location's `data.js`.

- **Two locations are photo-poor.** Côn Sơn – Chí Linh and Bình Liêu have 2 photographs each,
  because Commons genuinely has almost nothing for them. They fall back to the generated SVG
  illustration, which is deliberate and looks fine — but your own photos would be better.

- **Photo re-runs are not perfectly reproducible.** Candidate ordering from the Commons API
  varies slightly between calls, so a `--force` re-run can select a different eight photos and
  change a hero image. Files left unreferenced are cleaned with
  `python tools\fetch_photos.py --prune-only`. To pin a hero, set `heroPhoto` to that index and
  add the others to `excludePhotos`.

### Page weight, for reference

Measured by `verify_site.py`:

| | |
|---|---|
| All photos on disk | 5.1 MB |
| All 7 hero images | 948 KB — lazy-loaded, never one request |
| HTML + CSS + JS + data | 250 KB |
| **Initial view** (code plus the two cards above the fold) | **514 KB** |

It started at 28 MB of photos with a 4.5 MB hero payload. `--width 1100` brought that to 13.4 MB,
then `--resize-only --width 800` took it under 5 MB in a few seconds. The budget is judged on the
initial view rather than all the heroes, because `loading="lazy"` means the browser never fetches
them together.

---

## Reviews and sentiment

Each location carries a `reviews` block rendering as a **"Người ta nói gì" / "What people say"**
panel on its detail page, directly under our own score — so the group can weigh our opinion
against other people's.

Each one has a one-line verdict, a *Được khen* column, a *Bị phàn nàn* column, and a collapsible
list of sources.

### Why there are no star ratings

Because the honest options were limited:

- **Google Places reviews** require an API key and their terms prohibit persisting content outside
  a user session — which is exactly what committing them to a repo does.
- **TripAdvisor** content is partner-gated; scraping it is a terms violation.
- **Inventing a 4.3** would have been worse than showing nothing.

So the panels are a **synthesis of published travel journalism and traveller write-ups**,
paraphrased rather than quoted, with every source linked. The site says this in as many words,
in both languages.

### What that turned up

The value is in the complaints, which promotional guides omit. A few examples:

- **Ninh Bình** — "not the empty paradise the photographs suggest"; the pier gets busy, boat
  operators expect a tip, attractions are further apart than they look so people rush, and some
  find Hang Múa's built structures tacky.
- **Tam Đảo** — Vietnamese press states plainly that the higher you climb the more disappointing
  it gets, because of dozens of abandoned houses and empty plots.
- **Bình Liêu** — until very recently *foreign* travellers needed a permit to stay overnight, and
  some border areas may still be off-limits to them. Vietnamese citizens are unaffected, but it
  matters if anyone in the group holds a foreign passport. Source: Vietnam Coracle, updated
  March 2026.
- **Cát Bà** — near-unanimously recommended, and almost every complaint is about the town rather
  than the bay.
- **Côn Sơn – Chí Linh** — there is almost no independent English-language traveller commentary.
  That absence is recorded as a finding rather than papered over.

`verify_site.py` section `[8]` enforces the shape: every location needs a verdict, at least two
praise points, at least two gripes, and **at least one cited source** — a synthesis without a
citation is just an assertion. It also flags a location whose praise outnumbers its gripes by more
than 3:1, since that reads promotional rather than balanced.

---

## The backdrop

[`assets/js/backdrop.js`](assets/js/backdrop.js) draws a still bay behind the whole page: four
receding karst ridges, a water plane with ripples, two towers floating free of the waterline, and
two bands of slowly drifting mist.

It is built as real inline SVG rather than a `data:` URI in CSS. A data URI would work, but it has
to be URL-encoded, which makes the shapes unreadable and effectively un-editable. Building nodes
also lets every layer take its colour from a CSS class — so the backdrop re-themes on the
light/dark toggle with **no JavaScript involved at all**.

Two rules keep it from competing with the content, because a backdrop that steals attention is
worse than none:

- It is **masked to fade in downward**, so the top of the viewport — hero heading, first card —
  stays almost clean. The landscape only fully arrives below the fold.
- Every layer is **low-opacity silhouette only**. No detail, no hard edges, nothing the eye wants
  to resolve. Cards sit at 92% opacity with a 14 px backdrop blur on top of that.

To review it without a browser: `python tools\preview_backdrop.py` (add `--dark`) writes a
standalone SVG using the same ridge maths, with a mock hero and card composited over it so you can
judge legibility rather than guess.

One thing that needed fixing after rendering it: the ridge generator originally drew each tower
from `x-w` to `x+w` independently, and adjacent towers are close enough that the path doubled back
on itself — one ended at x=1356 and the next began at x=1320. That self-intersects and renders as
a notch in the silhouette. The generator now advances a monotonic cursor and clamps to the
viewBox, in both the JS and the preview script.

---

## A note on score rounding

Two of the seven totals land exactly on a rounding boundary: Cát Bà computes to 7.85 and
Ninh Bình to 7.35. Plain `Math.round(n * 10)` is unreliable there, because `7.85 * 10`
evaluates to `78.50000000000001` (rounds up) while `7.35 * 10` evaluates to
`73.49999999999999` (rounds down) — so Ninh Bình would have shown 7.3 while every document
said 7.4.

`util.js` therefore uses an epsilon-guarded half-up `round1()`, and `verify_site.py` mirrors
the same rule rather than using Python's default banker's rounding. If you change a score and
the verifier disagrees with what the browser shows, this is the first place to look.

---

## Honesty notes

Costs, distances and travel times are rough 2026 estimates and need re-confirming before
anyone books. The recommendation scores are editorial judgments, not measurements — which is why
the site shows the full breakdown and lets you change the weights.

Weather and safety notes reflect **18 September 2026**, when northern Vietnam was in a
flood episode and Ninh Bình had tourist sites suspended. October is still typhoon season in
the Gulf of Tonkin. Check [nchmf.gov.vn](https://nchmf.gov.vn) before travelling.
