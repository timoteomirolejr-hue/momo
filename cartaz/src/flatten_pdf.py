"""Flatten the poster to an image-only PDF.

Canva substitutes fonts on imported PDFs that carry live text, which
re-flows the layout; a flattened page imports pixel-exact instead.
"""
from PIL import Image

im = Image.open('../out/avanza-7setembro-2340x2902.png').convert('RGB')
im.save('../out/avanza-7setembro-flat.pdf', 'PDF', resolution=192.0)  # 2340px @192dpi = 877.5pt
print('written ../out/avanza-7setembro-flat.pdf')
