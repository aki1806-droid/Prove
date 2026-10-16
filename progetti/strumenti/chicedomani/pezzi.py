"""Ritaglia le grafiche del pacchetto «Chi c'è domani» in pezzi da animare.

Le grafiche arrivano come PNG già composti. Per animarle si ritaglia ogni elemento (cartello,
riga di testo, timbro, pagina…) in un PNG a parte con il suo canale alfa, e lo si toglie dalla
grafica riempiendo il buco con lo sfondo intorno (riempimento per diffusione: sugli sfondi sfocati
o a tinta unita non si vede). Quello che resta è il «fondo» su cui il motore rimette i pezzi a tempo.

    python3 pezzi.py            -> per ogni episodio grafica/pezzi/<scena>/*.png e grafica/pezzi.json

Le coordinate sono in pixel della grafica 1080x1920. Le maschere:
  rect  [x0,y0,x1,y1]                  rettangolo
  poly  [[x,y],...]                    poligono (cartelli e pagine ruotati)
  chiaro [x0,y0,x1,y1, soglia]         solo i pixel chiari nel rettangolo (scritte su foto), allargati
  rosso / verde / giallo [x0,y0,x1,y1] solo i pixel di quel colore (timbri, freccia, testimone)
  alfa [x0,y0,x1,y1]                   alfa della grafica nel rettangolo (overlay trasparenti)
  cerchio [cx,cy,r]
Un pezzo può venire da un'altra grafica (src) e può non bucare il fondo (buca: False).
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as nd

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
sys.path.insert(0, QUI)
from serie import EPISODI  # noqa: E402


def carica(p):
    return np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)


def maschera(img, m):
    tipo, a = m[0], m[1:]
    H, W = img.shape[:2]
    M = np.zeros((H, W), bool)
    if tipo == 'rect':
        x0, y0, x1, y1 = a; M[y0:y1, x0:x1] = True
    elif tipo == 'poly':
        im = Image.new('L', (W, H), 0); ImageDraw.Draw(im).polygon([tuple(p) for p in a[0]], fill=255)
        M = np.asarray(im) > 127
    elif tipo == 'cerchio':
        cx, cy, r = a; yy, xx = np.mgrid[0:H, 0:W]; M = (xx - cx) ** 2 + (yy - cy) ** 2 <= r * r
    else:
        x0, y0, x1, y1 = a[:4]; R = np.zeros((H, W), bool); R[y0:y1, x0:x1] = True
        r, g, b, al = img[..., 0], img[..., 1], img[..., 2], img[..., 3]
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        if tipo == 'chiaro':
            soglia = a[4] if len(a) > 4 else 140
            M = R & (lum > soglia) & (al > 150)
            M = nd.binary_dilation(M, iterations=a[5] if len(a) > 5 else 6)
        elif tipo == 'rosso':
            M = R & (r > 140) & (g < 110) & (b < 120) & (r - g > 70)
            M = nd.binary_closing(M, iterations=3); M = nd.binary_dilation(M, iterations=3)
        elif tipo == 'verde':
            M = R & (g > 110) & (g - r > 50) & (g - b > 20)
            M = nd.binary_closing(M, iterations=3); M = nd.binary_dilation(M, iterations=3)
        elif tipo == 'giallo':
            M = R & (((r > 190) & (g > 140) & (b < 150)) | (lum > 200))
            M = nd.binary_closing(M, iterations=2); M = nd.binary_dilation(M, iterations=4)
        elif tipo == 'alfa':
            M = R & (al > (a[4] if len(a) > 4 else 8))
        M &= R
    return M


def riempi(img, buco):
    """Riempie i pixel del buco per diffusione dai pixel noti intorno (RGBA)."""
    out = img.copy(); noto = (~buco).astype(np.float32)
    if not buco.any():
        return out
    ys, xs = np.where(buco)
    y0, y1, x0, x1 = max(0, ys.min() - 200), ys.max() + 200, max(0, xs.min() - 200), xs.max() + 200
    sub, k = out[y0:y1, x0:x1], noto[y0:y1, x0:x1]
    acc = np.zeros_like(sub); pes = np.zeros(k.shape, np.float32); fatto = k > 0.5
    for s in (2, 4, 8, 16, 32, 64, 128):
        num = np.stack([nd.gaussian_filter(sub[..., c] * k, s) for c in range(4)], -1)
        den = nd.gaussian_filter(k, s)
        ok = (den > 1e-3) & ~fatto
        acc[ok] = num[ok] / den[ok, None]; fatto |= ok
    sub[~(k > 0.5)] = acc[~(k > 0.5)]
    # un passaggio di ammorbidimento solo dentro il buco
    liscio = np.stack([nd.gaussian_filter(sub[..., c], 3) for c in range(4)], -1)
    b = ~(k > 0.5); sub[b] = liscio[b]
    out[y0:y1, x0:x1] = sub
    return out


def togli_rosso(img, M):
    """Cancella la riga rossa di barratura dentro il pezzo (la ridisegna il motore)."""
    r, g, b = img[..., 0], img[..., 1], img[..., 2]
    rosso = M & (r > 120) & (r - g > 60) & (r - b > 40)
    rosso = nd.binary_dilation(rosso, iterations=2) & M
    return riempi(img, rosso)


def tinta(img, M):
    """Riempie con il colore mediano della cornice intorno al buco (fondi a tinta unita)."""
    anello = nd.binary_dilation(M, iterations=8) & ~M
    out = img.copy(); out[M] = np.median(img[anello], axis=0)
    return out


def verticale(img, M):
    """Riempie colonna per colonna interpolando tra il pixel noto sopra e quello sotto (sfumature)."""
    out = img.copy()
    for x in np.where(M.any(0))[0]:
        col = M[:, x]; ys = np.where(col)[0]
        # tratti contigui
        tagli = np.split(ys, np.where(np.diff(ys) > 1)[0] + 1)
        for t in tagli:
            a, b = max(t[0] - 1, 0), min(t[-1] + 1, M.shape[0] - 1)
            w = np.linspace(0, 1, len(t) + 2)[1:-1, None]
            out[t, x] = img[a, x] * (1 - w) + img[b, x] * w
    return out


def riga(img, M):
    """Sfumature verticali (overlay): ogni riga del buco prende il colore mediano della stessa riga
    fuori dal buco allargato, così spariscono anche le ombre morbide delle scritte."""
    out = img.copy(); largo = nd.binary_dilation(M, iterations=40)
    for y in np.where(M.any(1))[0]:
        fuori = ~largo[y]
        if fuori.any():
            out[y, M[y]] = np.median(img[y, fuori], axis=0)
    return out


def scena(ep, sid, sp):
    D = os.path.join(PR, ep)
    out = os.path.join(D, 'grafica', 'pezzi', sid); os.makedirs(out, exist_ok=True)
    cur, orig = {}, {}

    def img(p):
        if p not in cur:
            cur[p] = carica(os.path.join(D, p)); orig[p] = cur[p].copy()
        return cur[p]
    base = sp.get('base')
    lista = sp.get('pezzi', [])
    # tutte le maschere sull'originale, per sapere quali pezzi verranno tolti dopo
    for pz in lista:
        pz['_src'] = pz.get('src', base); pz['_M'] = maschera(img(pz['_src']), pz['m'])
    info = {}
    for i, pz in enumerate(lista):
        src = pz['_src']; I = img(src); M = pz['_M']
        P = I.copy()
        if pz.get('togli_rosso'):
            P = togli_rosso(P, M)
        ys, xs = np.where(M)
        if not len(xs):
            print('  pezzo vuoto, saltato:', sid, pz['id']); continue
        x0, y0, x1, y1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
        al = nd.gaussian_filter(M.astype(np.float32), 0.8)[y0:y1, x0:x1]
        crop = P[y0:y1, x0:x1].copy(); crop[..., 3] = crop[..., 3] * np.clip(al * 1.2, 0, 1)
        Image.fromarray(crop.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{out}/{pz["id"]}.png', optimize=False)
        info[pz['id']] = [int(x0), int(y0), int(x1 - x0), int(y1 - y0)]
        if not pz.get('buca', True):
            continue
        H = nd.binary_dilation(M, iterations=2)
        modo = pz.get('riempi') or ('tinta' if pz['m'][0] == 'rect' else
                                    'riga' if pz['m'][0] == 'chiaro' and orig[src][..., 3].min() < 250 else 'diffusione')
        if modo == 'riga':
            # ombre comprese: la maschera si allarga nel rettangolo del pezzo
            x0r, y0r, x1r, y1r = pz['m'][1:5]
            H = nd.binary_dilation(M, iterations=26); R = np.zeros_like(H); R[y0r:y1r, x0r:x1r] = True; H &= R
            cur[src] = riga(I, H); continue
        if modo == 'tinta':
            cur[src] = tinta(I, H)
        elif modo == 'verticale':
            cur[src] = verticale(I, H)
        else:
            # i pezzi ancora da togliere che non contengono questo buco non fanno da sfondo
            ignoto = H.copy()
            for q in lista[i + 1:]:
                if q['_src'] == src and q.get('buca', True) and (q['_M'] & H).sum() < 0.9 * H.sum():
                    ignoto |= nd.binary_dilation(q['_M'], iterations=2)
            fill = riempi(I, ignoto)
            nuovo = I.copy(); nuovo[H] = fill[H]; cur[src] = nuovo
    fondi = sp.get('fondi') or ({'fondo': base} if base else {})
    for nome, p in fondi.items():
        Image.fromarray(img(p).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{out}/{nome}.png')
        info[nome] = [0, 0, 1080, 1920]
    return info


if __name__ == '__main__':
    # argomenti facoltativi: «ep1» (un episodio) o «ep1:S01,S03» (solo quelle scene)
    filtro = {}
    for x in sys.argv[1:]:
        e, _, sc = x.partition(':'); filtro[e] = sc.split(',') if sc else None
    for ep, scene in EPISODI.items():
        chiave = next((k for k in filtro if k in ep), None)
        if filtro and not chiave:
            continue
        p = os.path.join(PR, ep, 'grafica', 'pezzi.json')
        tutto = json.load(open(p)) if os.path.exists(p) else {}
        for sid, sp in scene.items():
            if chiave and filtro[chiave] and sid not in filtro[chiave]:
                continue
            tutto[sid] = scena(ep, sid, sp)
            print(ep, sid, len(tutto[sid]), 'pezzi', flush=True)
            json.dump(tutto, open(p, 'w'), indent=0)
