"""SindaMatch: nella card dei profili (S02-S06) il timbro NOPE/LIKE è tolto per diffusione e sulla foto ne resta l'ombra.
Si rimette la foto pulita del pacchetto (img/sm_*.png, larga 760 a 160,430 come nella grafica), sfumata come la finestra
della clip (piena fino a y 960, zero a 1080), così sotto il nome e la bio resta la grafica originale.
    python3 strumenti/halloween/foto_card.py        (dopo pezzi.py)
"""
import json, os
import numpy as np
from PIL import Image
PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
D = f'{PR}/pdro-halloween-sindamatch'; FOTO = {'S02': 'jack', 'S03': 'ghost', 'S04': 'vamp', 'S05': 'mummy', 'S06': 'cisl'}
pz = json.load(open(f'{D}/grafica/pezzi.json'))
for sid, n in FOTO.items():
    x, y, w, h = pz[sid]['card']; f = f'{D}/grafica/pezzi/{sid}/card.png'
    card = np.asarray(Image.open(f).convert('RGBA')).astype(float)
    foto = np.zeros_like(card); im = Image.open(f'{D}/img/sm_{n}.png').convert('RGB').resize((760, 1009), Image.LANCZOS)
    tela = Image.new('RGB', (w, h)); tela.paste(im, (160 - x, 430 - y)); foto[..., :3] = np.asarray(tela)
    yy = np.arange(h)[:, None] + y; k = np.clip((1080 - yy) / 120, 0, 1)
    xx = np.arange(w)[None, :] + x; k = k * ((xx >= 160) & (xx < 920) & (yy >= 430))
    card[..., :3] = card[..., :3] * (1 - k[..., None]) + foto[..., :3] * k[..., None]
    Image.fromarray(card.clip(0, 255).astype(np.uint8), 'RGBA').save(f)
    print(sid, 'foto pulita nella card', n)
