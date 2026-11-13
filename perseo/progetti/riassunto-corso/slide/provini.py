# Provini da nove: tre per tre, per guardare le slide (MASTER, Passo 4).
import sys, glob
from PIL import Image
from pathlib import Path
QUI = Path(__file__).resolve().parent
png = sorted(glob.glob(str(QUI/'png'/'s*.png')))
for k in range(0, len(png), 9):
    foglio = Image.new('RGB', (3*640, 3*360), 'white')
    for j, f in enumerate(png[k:k+9]):
        foglio.paste(Image.open(f).convert('RGB').resize((640, 360)), ((j%3)*640, (j//3)*360))
    foglio.save(QUI/f'provino-{k//9+1}.png')
    print(QUI/f'provino-{k//9+1}.png')
