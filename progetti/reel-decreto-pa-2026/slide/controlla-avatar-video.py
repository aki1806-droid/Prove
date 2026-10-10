"""Sovrapposizione fra l'avatar vero (avatar/avatar.webm, in movimento) e le
scritte di ogni scena: unione delle sagome dell'avatar campionate a 2 fps
dentro la scena, contro il contenuto dell'ultimo fotogramma della scena."""
import os, sys, json, subprocess, importlib.util
from PIL import Image, ImageChops as C
QUI = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(QUI, '..')
spec = importlib.util.spec_from_file_location('monta', os.path.join(R, 'monta.py'))
m = importlib.util.module_from_spec(spec); sys.argv = ['x']; spec.loader.exec_module(m)
TEMPI = json.load(open(os.path.join(R, 'audio/tempi-scene.json')))
sc_w = round(1080 * m.SC_H / (1920 - m.TAGLIO_ALTO))
for t in TEMPI:
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-ss', str(t['inizio']), '-t', str(t['durata']),
        '-i', os.path.join(R, 'avatar/avatar.webm'), '-vf',
        f'fps=2,format=rgba,crop=1080:{1920 - m.TAGLIO_ALTO}:0:{m.TAGLIO_ALTO},scale={sc_w}:{m.SC_H},format=rgba,alphaextract,format=gray',
        '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], capture_output=True, check=True).stdout
    n = len(raw) // (sc_w * m.SC_H)
    unione = Image.new('L', (sc_w, m.SC_H), 0)
    for i in range(n):
        fr = Image.frombytes('L', (sc_w, m.SC_H), raw[i * sc_w * m.SC_H:(i + 1) * sc_w * m.SC_H])
        unione = C.lighter(unione, fr)
    mask = Image.new('L', (1080, 1920), 0); mask.paste(unione, (m.SC_X, 1920 - m.SC_H))
    d = os.path.join(QUI, 'out', t['id']); fs = sorted(x for x in os.listdir(d) if x.endswith('.png'))
    diff = C.difference(Image.open(os.path.join(d, fs[-1])).convert('RGBA'), Image.open(os.path.join(d, fs[0])).convert('RGBA')).convert('L').point(lambda v: 255 if v > 12 else 0)
    cop = C.multiply(diff, mask.point(lambda v: 255 if v > 40 else 0)).histogram()[255]
    print(t['id'], f'{n} campioni', 'pixel di scritta coperti:', cop)
