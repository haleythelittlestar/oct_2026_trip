"""Render the backdrop to a standalone SVG so it can be reviewed without a browser.

This is a deliberate port of the shape maths in assets/js/backdrop.js — same
ridge function, same tower coordinates, same waterline. The point is that the
preview IS the backdrop, not an artist's impression of it.

  python tools\\preview_backdrop.py            -> tools/backdrop_preview.svg
  python tools\\preview_backdrop.py --dark
"""
import argparse
import io
import os

W, H = 1440, 900
WATERLINE = 636

LIGHT = {
    "bg": "#eef4f6", "sky_top": "#e7f1f4", "sky_bottom": "#f6fafb",
    "sun": "rgb(255 246 230 / .85)",
    "far": "rgb(86 122 134 / .16)", "mid": "rgb(64 100 113 / .20)",
    "near": "rgb(45 78 90 / .24)", "water": "rgb(120 158 170 / .16)",
    "mist": "rgb(255 255 255 / .55)", "opacity": ".62",
    "surface": "#ffffff", "ink": "#1b3a44", "ink2": "#4d6f79",
    "line": "#d2e1e5", "brand": "#336e7a",
}
DARK = {
    "bg": "#0b1a22", "sky_top": "#0a1a24", "sky_bottom": "#10262f",
    "sun": "rgb(226 238 240 / .34)",
    "far": "rgb(150 196 208 / .10)", "mid": "rgb(120 168 182 / .13)",
    "near": "rgb(8 22 29 / .55)", "water": "rgb(126 200 207 / .09)",
    "mist": "rgb(170 205 214 / .16)", "opacity": ".7",
    "surface": "#13272f", "ink": "#e6eff1", "ink2": "#a2bcc4",
    "line": "#26454f", "brand": "#7ec8cf",
}

FAR = [(110, 132, 96), (330, 184, 122), (560, 108, 84), (790, 200, 140),
       (1010, 126, 96), (1240, 168, 116), (1410, 110, 90)]
MID = [(60, 118, 86), (270, 176, 124), (470, 96, 74), (700, 152, 112),
       (930, 208, 146), (1160, 120, 92), (1370, 164, 118)]
NEAR = [(150, 152, 116), (420, 96, 82), (640, 188, 136), (900, 112, 92),
        (1150, 168, 124), (1380, 132, 104)]


def ridge(y, towers):
    """Identical to ridge() in backdrop.js, including the monotonic cursor."""
    d = "M0 %d L0 %d" % (H, y)
    cursor = 0
    for x, h, w in towers:
        left = max(cursor, x - w)
        right = min(W, x + w)
        if right <= left:
            continue
        if left > cursor:
            d += " L%g %g" % (left, y)
        d += (" Q%g %g %g %g Q%g %g %g %g"
              % (x - w * 0.42, y - h, x, y - h * 0.92,
                 x + w * 0.5, y - h * 0.72, right, y))
        cursor = right
    if cursor < W:
        d += " L%d %d" % (W, y)
    d += " L%d %d Z" % (W, H)
    return d


def floating_isle(cx, cy, w, h):
    return ("M%g %g Q%g %g %g %g Q%g %g %g %g Z"
            % (cx - w * 0.72, cy,
               cx - w * 0.3, cy - h, cx, cy - h * 0.86,
               cx + w * 0.45, cy - h * 0.62, cx + w * 0.72, cy))


def render(t, with_card=True):
    o = []
    a = o.append
    a('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" '
      'width="%d" height="%d">' % (W, H, W, H))
    a('<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
      '<stop offset="0%%" stop-color="%s"/>'
      '<stop offset="62%%" stop-color="%s"/></linearGradient>' % (t["sky_top"], t["sky_bottom"]))
    # The downward fade that keeps the top of the page clear.
    a('<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">'
      '<stop offset="0%" stop-color="#fff" stop-opacity="0"/>'
      '<stop offset="26%" stop-color="#fff" stop-opacity=".35"/>'
      '<stop offset="58%" stop-color="#fff" stop-opacity="1"/>'
      '<stop offset="100%" stop-color="#fff" stop-opacity="1"/></linearGradient>')
    a('<mask id="m"><rect width="%d" height="%d" fill="url(#fade)"/></mask>'
      '</defs>' % (W, H))

    a('<rect width="%d" height="%d" fill="%s"/>' % (W, H, t["bg"]))
    a('<rect width="%d" height="%d" fill="url(#sky)"/>' % (W, H))

    a('<g mask="url(#m)" opacity="%s">' % t["opacity"])
    a('<circle cx="1058" cy="236" r="96" fill="%s"/>' % t["sun"])
    a('<circle cx="1058" cy="236" r="152" fill="%s" opacity=".35"/>' % t["sun"])

    a('<g fill="%s"><ellipse cx="520" cy="470" rx="760" ry="34"/>'
      '<ellipse cx="1180" cy="500" rx="520" ry="26"/></g>' % t["mist"])

    a('<path d="%s" fill="%s"/>' % (ridge(504, FAR), t["far"]))
    a('<path d="%s" fill="%s"/>' % (ridge(560, MID), t["mid"]))

    a('<g fill="%s"><ellipse cx="700" cy="566" rx="900" ry="24"/>'
      '<ellipse cx="180" cy="590" rx="460" ry="18"/></g>' % t["mist"])

    a('<path d="%s" fill="%s"/>' % (ridge(WATERLINE, NEAR), t["near"]))
    a('<rect x="0" y="%d" width="%d" height="%d" fill="%s"/>'
      % (WATERLINE, W, H - WATERLINE, t["water"]))

    for i, off in enumerate([16, 40, 74, 120, 180, 254]):
        a('<rect x="%d" y="%d" width="%d" height="1.5" rx="1" fill="%s" opacity="%.2f"/>'
          % (120 if i % 2 else 0, WATERLINE + off,
             W - (180 if i % 2 else 60), t["mist"], 0.5 - i * 0.06))

    a('<g fill="%s"><ellipse cx="268" cy="300" rx="74" ry="17.3"/>'
      '<path d="%s"/></g>' % (t["mid"], floating_isle(268, 300, 74, 108)))
    a('<g fill="%s"><ellipse cx="1246" cy="396" rx="54" ry="12.5"/>'
      '<path d="%s"/></g>' % (t["far"], floating_isle(1246, 396, 54, 78)))

    a('<g fill="%s" opacity=".28">'
      '<ellipse cx="268" cy="%d" rx="62" ry="7"/>'
      '<ellipse cx="1246" cy="%d" rx="46" ry="6"/></g>'
      % (t["mist"], WATERLINE + 54, WATERLINE + 92))
    a('</g>')

    if with_card:
        # A mock card, to show whether content still wins against the backdrop.
        a('<g font-family="Segoe UI, Arial, sans-serif">')
        a('<rect x="90" y="96" width="560" height="84" rx="10" fill="none"/>')
        a('<text x="90" y="150" font-size="52" font-weight="700" fill="%s">'
          'Mình đi đâu đây?</text>' % t["ink"])
        a('<text x="90" y="192" font-size="22" fill="%s">'
          'Hải Phòng · tuần đầu tháng 10 năm 2026</text>' % t["ink2"])
        a('<rect x="90" y="250" width="600" height="330" rx="22" fill="%s" '
          'fill-opacity=".92" stroke="%s"/>' % (t["surface"], t["line"]))
        a('<rect x="115" y="275" width="550" height="180" rx="14" fill="%s" '
          'fill-opacity=".5"/>' % t["mid"])
        a('<text x="140" y="500" font-size="26" font-weight="700" fill="%s">'
          'Cát Bà + Vịnh Lan Hạ</text>' % t["ink"])
        a('<text x="140" y="534" font-size="18" fill="%s">'
          'Người ta bay nửa vòng trái đất để tới đây.</text>' % t["ink2"])
        a('<rect x="140" y="552" width="360" height="9" rx="5" fill="%s" '
          'fill-opacity=".35"/>' % t["ink2"])
        a('<rect x="140" y="552" width="324" height="9" rx="5" fill="%s"/>' % t["brand"])
        a('</g>')

    a('</svg>')
    return "\n".join(o)


ap = argparse.ArgumentParser()
ap.add_argument("--dark", action="store_true")
ap.add_argument("--no-card", action="store_true")
args = ap.parse_args()

theme = DARK if args.dark else LIGHT
out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "backdrop_preview%s.svg" % ("_dark" if args.dark else ""))
with io.open(out, "w", encoding="utf-8", newline="\n") as f:
    f.write(render(theme, not args.no_card))
print("wrote", out)
