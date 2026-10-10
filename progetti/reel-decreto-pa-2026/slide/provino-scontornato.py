"""Provino con l'avatar senza sfondo, nella posizione di monta.py, e conteggio
dei pixel in cui l'avatar copre una scritta (deve essere zero)."""
import os, sys, importlib.util
from PIL import Image
QUI = os.path.dirname(os.path.abspath(__file__))
DEST = sys.argv[1] if len(sys.argv) > 1 else 'provino-scontornato.png'
spec = importlib.util.spec_from_file_location('monta', os.path.join(QUI, '..', 'monta.py'))
m = importlib.util.module_from_spec(spec); sys.argv = ['x']; spec.loader.exec_module(m)
OUT = os.path.join(QUI, 'out')
av = Image.open(os.path.join(QUI, '..', 'avatar/aki-scontornato.png')).convert('RGBA').resize((1080, 1935)).crop((0, 0, 1080, 1920))
av = av.crop((0, m.TAGLIO_ALTO, 1080, 1920))
av = av.resize((round(av.width * m.SC_H / av.height), m.SC_H), Image.LANCZOS)
pos = (m.SC_X, 1920 - m.SC_H)
mask = Image.new('L', (1080, 1920), 0); mask.paste(av.getchannel('A'), pos)
tav = Image.new('RGB', (8 * 270 + 70, 480), 'white')
for k in range(8):
    sid = f's{k + 1}'
    fs = sorted(x for x in os.listdir(os.path.join(OUT, sid)) if x.endswith('.png'))
    ultimo = Image.open(os.path.join(OUT, sid, fs[-1])).convert('RGBA')
    primo = Image.open(os.path.join(OUT, sid, fs[0])).convert('RGBA')
    # contenuto = dove l'ultimo fotogramma differisce dal primo (fondo + logo)
    import PIL.ImageChops as C
    diff = C.difference(ultimo, primo).convert('L').point(lambda v: 255 if v > 12 else 0)
    coperti = C.multiply(diff, mask.point(lambda v: 255 if v > 40 else 0)).histogram()[255]
    print(sid, 'pixel di scritta coperti dall\'avatar:', coperti)
    bg = Image.new('RGBA', (1080, 1920), (90, 110, 120, 255)); bg.alpha_composite(ultimo)
    bg.alpha_composite(av, pos)
    tav.paste(bg.convert('RGB').resize((270, 480)), (k * 280, 0))
tav.save(DEST)
