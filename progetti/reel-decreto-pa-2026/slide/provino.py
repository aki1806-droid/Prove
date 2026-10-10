"""Provino: l'ultimo fotogramma di ogni scena, con la zona dell'avatar segnata.
Controlla anche che nessun pixel di contenuto cada nella zona dell'avatar."""
import os, sys
from PIL import Image, ImageDraw
OUT = os.path.join(os.path.dirname(__file__), 'out')
AV = (600, 1240, 1040, 1856)   # x0, y0, x1, y1 del riquadro avatar
ids = [f's{i}' for i in range(1, 9)]
tav = Image.new('RGB', (4 * 540 + 30, 2 * 960 + 10), 'white')
for k, i in enumerate(ids):
    f = sorted(x for x in os.listdir(os.path.join(OUT, i)) if x.endswith('.png'))[-1]
    im = Image.open(os.path.join(OUT, i, f)).convert('RGBA')
    bg = Image.new('RGBA', im.size, (90, 110, 120, 255)); bg.alpha_composite(im)
    # contenuto nella zona avatar? confronta con il fondo pulito della scena
    vuoto = Image.open(os.path.join(OUT, i, sorted(os.listdir(os.path.join(OUT, i)))[0])).convert('RGBA')
    a = im.crop(AV); b = vuoto.crop(AV)
    diff = sum(1 for p, q in zip(a.getdata(), b.getdata()) if abs(p[3] - q[3]) > 10 or sum(abs(p[c] - q[c]) for c in range(3)) > 30)
    print(i, 'pixel di contenuto nella zona avatar:', diff)
    d = ImageDraw.Draw(bg); d.rectangle(AV, outline=(255, 0, 255), width=6)
    tav.paste(bg.convert('RGB').resize((540, 960)), ((k % 4) * 550, (k // 4) * 970))
tav.save(sys.argv[1] if len(sys.argv) > 1 else 'provino.png')
