"""Report the ink bands of the rendered poster's editorial column."""
from PIL import Image
import numpy as np, sys

im = Image.open(sys.argv[1]); s = im.size[0] / 1170
a = np.array(im.convert('RGB')).astype(int)
mx, mn = a.max(axis=2), a.min(axis=2)
ink = (mx - mn > 45) | (a.mean(axis=2) < 140)

def bands(x0, x1, y0, y1, gap=6):
    sub = ink[int(y0*s):int(y1*s), int(x0*s):int(x1*s)]
    rows = sub.any(axis=1)
    out, run = [], None
    for i, v in enumerate(rows):
        if v and run is None: run = i
        elif not v and run is not None:
            if i - run > gap*s: out.append((run, i))
            run = None
    if run is not None: out.append((run, len(rows)))
    for r0, r1 in out:
        seg = sub[r0:r1]
        xs = np.where(seg.any(axis=0))[0]
        print(f"   y {r0/s+y0:7.1f} -> {r1/s+y0:7.1f}  (h {(r1-r0)/s:5.1f})"
              f"   x {xs.min()/s+x0:7.1f} -> {xs.max()/s+x0:7.1f}")

print("editorial column  x 100..760")
bands(100, 760, 770, 1200)
print("headline full width  x 100..1170, y 830..1050")
bands(100, 1170, 830, 1050)
print("masthead  x 300..900, y 90..270")
bands(300, 900, 90, 270)
