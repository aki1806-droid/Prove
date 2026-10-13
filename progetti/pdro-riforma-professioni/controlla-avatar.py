"""Sovrapposizioni dell'avatar: unione della sagoma (campionata a 1 fps su tutto
il video, nella posizione di monta.py) contro i riquadri dei sottotitoli e
contro il contenuto di slide e bande (ciò che non è fondo piatto)."""
import os, sys, subprocess, importlib.util
from PIL import Image, ImageChops as C
QUI = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('m', os.path.join(QUI, 'monta.py'))
m = importlib.util.module_from_spec(spec); sys.argv = ['x']; spec.loader.exec_module(m)
cx, cy, cw, ch = m.AV_CROP
w = round(cw * m.AV_H / ch)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-i', os.path.join(QUI, 'avatar/avatar.webm'),
    '-vf', f'fps=1,format=rgba,crop={cw}:{ch}:{cx}:{cy},scale={w}:{m.AV_H},format=rgba,alphaextract,format=gray',
    '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], capture_output=True, check=True).stdout
n = len(raw) // (w * m.AV_H)
u = Image.new('L', (w, m.AV_H), 0)
for i in range(n):
    u = C.lighter(u, Image.frombytes('L', (w, m.AV_H), raw[i * w * m.AV_H:(i + 1) * w * m.AV_H]))
mask = Image.new('L', (1080, 1920), 0); mask.paste(u, (m.AV_X, 1920 - m.AV_H))
mask = mask.point(lambda v: 255 if v > 40 else 0)
print('campioni', n, '· sagoma da x', mask.getbbox())
g = os.path.join(QUI, 'grafica/out')
peggio = max(C.multiply(Image.open(os.path.join(g, f)).getchannel('A').point(lambda v: 255 if v > 20 else 0), mask).histogram()[255]
             for f in os.listdir(g) if f.startswith('sub-'))
print('sottotitoli: pixel coperti (caso peggiore)', peggio)
for f in sorted(os.listdir(os.path.join(QUI, 'slide'))) + sorted(os.listdir(os.path.join(QUI, 'overlay_clip'))):
    p = os.path.join(QUI, 'slide' if 'slide' in f else 'overlay_clip', f)
    im = Image.open(p).convert('RGBA')
    if 'overlay' in f:
        cont = im.getchannel('A').point(lambda v: 255 if v > 20 else 0)
    else:   # testo chiaro o arancio sul fondo verde: luminosità alta o rosso alto
        r, gg, b, _ = im.split()
        cont = C.lighter(r.point(lambda v: 255 if v > 150 else 0), b.point(lambda v: 255 if v > 150 else 0))
    print(f, 'pixel coperti', C.multiply(cont, mask).histogram()[255])
