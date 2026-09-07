"""Final deliverables from the 2x render."""
from PIL import Image
import os

os.makedirs('../out', exist_ok=True)
hi = Image.open('build/poster@2x.png').convert('RGB')
hi.save('../out/avanza-7setembro-2340x2902.png')

hi.resize((1170, 1451), Image.LANCZOS).save('../out/avanza-7setembro-1170x1451.png')

# true 4:5 for Instagram: scale to width, then extend the footer band's last row
w, h = 1080, 1350
s = hi.resize((w, round(hi.height * w / hi.width)), Image.LANCZOS)
ig = Image.new('RGB', (w, h), 'white')
ig.paste(s, (0, 0))
if s.height < h:
    ig.paste(s.crop((0, s.height - 1, w, s.height)).resize((w, h - s.height)), (0, s.height))
ig.save('../out/avanza-7setembro-1080x1350.png')

for f in sorted(f for f in os.listdir('../out') if f.endswith('.png')):
    im = Image.open(f'../out/{f}')
    print(f"{f:38s} {im.size[0]}x{im.size[1]}  {os.path.getsize('../out/'+f)//1024} KB")
