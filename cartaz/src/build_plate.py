"""Clean photographic base plate from the reference poster:
   - erases the previous brand mark from the sky
   - erases the old headline block by continuing the photo's fade to white
"""
from PIL import Image, ImageFilter
import numpy as np

src = np.array(Image.open('assets/referencia-cartaz-original.jpg').convert('RGB')).astype(np.float32)
H, W, _ = src.shape

# --- 1. the source has a dark scan line on the very first rows ------------
src[0:5, :, :] = src[6, :, :]

# --- 2. erase the previous logo lockup from the flat sky ------------------
x0, x1, y0, y1 = 425, 745, 78, 254
ring = np.concatenate([
    src[y0 - 14:y0 - 2, x0:x1].reshape(-1, 3),
    src[y1 + 2:y1 + 14, x0:x1].reshape(-1, 3),
    src[y0:y1, x0 - 14:x0 - 2].reshape(-1, 3),
    src[y0:y1, x1 + 2:x1 + 14].reshape(-1, 3),
])
src[y0:y1, x0:x1] = np.median(ring, axis=0)
band = Image.fromarray(src[y0 - 20:y1 + 20, x0 - 20:x1 + 20].clip(0, 255).astype(np.uint8))
src[y0 - 20:y1 + 20, x0 - 20:x1 + 20] = np.asarray(
    band.filter(ImageFilter.GaussianBlur(4)), dtype=np.float32)

# --- 3. erase the old text block: continue the fade down to pure white ----
FADE_TOP, FADE_END = 790, 950
seed = src[FADE_TOP - 12:FADE_TOP].mean(axis=0)                 # clean row profile
# pre-blurred variants of that profile; deeper rows use a softer one so the
# vertical continuation dissolves instead of streaking
levels = [0, 6, 18, 44, 90]
prof = []
for s in levels:
    row = Image.fromarray(seed.clip(0, 255).astype(np.uint8)[None, :, :])
    prof.append(np.asarray(row.filter(ImageFilter.GaussianBlur(s)) if s else row,
                           dtype=np.float32)[0])

t = np.linspace(0, 1, FADE_END - FADE_TOP, dtype=np.float32)
t = t * t * (3 - 2 * t)                                          # smoothstep
k = t * (len(levels) - 1)
lo = np.clip(np.floor(k).astype(int), 0, len(levels) - 1)
hi = np.clip(lo + 1, 0, len(levels) - 1)
f = (k - lo)[:, None, None]
stack = np.stack(prof)
soft = stack[lo] * (1 - f) + stack[hi] * f                       # (n, W, 3)
src[FADE_TOP:FADE_END] = soft * (1 - t[:, None, None]) + 255.0 * t[:, None, None]
src[FADE_END:] = 255.0

patch = Image.fromarray(src[FADE_TOP - 30:FADE_END + 8].clip(0, 255).astype(np.uint8))
src[FADE_TOP - 30:FADE_END + 8] = np.asarray(
    patch.filter(ImageFilter.GaussianBlur(2.0)), dtype=np.float32)

Image.fromarray(src.clip(0, 255).astype(np.uint8)).save('assets/plate.png')
print('plate written', W, H)
