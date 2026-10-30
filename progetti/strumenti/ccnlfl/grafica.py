"""Primitive grafiche della serie «CCNL Funzioni Locali 2025-2027» (CISL FP Padova Rovigo): palette, font, easing, bande,
pastiglie, blocchi tridimensionali, stencil, lente, spunte e sottolineature a mano, texture. Tutto in PIL su RGBA 1080x1920.
"""
import functools, math, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

QUI = os.path.dirname(os.path.abspath(__file__))
W, H, FPS = 1080, 1920, 25
VERDE, SCURO, ARANCIO = (0, 134, 62), (0, 83, 42), (243, 146, 0)
BIANCO, ANTRACITE, GRIGIO, ROSSO = (255, 255, 255), (34, 34, 34), (242, 243, 244), (200, 16, 46)
M = 72                         # margine laterale della griglia
FILO_Y = 1060                  # quota del filo arancio (video 01) e delle linee di base


@functools.lru_cache(maxsize=None)
def font(peso=800, px=60, corsivo=False):
    if not corsivo and peso == 700:
        peso = 800
    nome = f"montserrat-latin-{peso}-{'italic' if corsivo else 'normal'}.woff"
    return ImageFont.truetype(f'{QUI}/font/{nome}', px)


# ---------- easing ----------

def cl(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def prog(t, t0, dur):
    return cl((t - t0) / dur) if dur > 0 else float(t >= t0)


def inout(x):
    x = cl(x); return x * x * (3 - 2 * x)


def fuori(x, p=3):
    x = cl(x); return 1 - (1 - x) ** p


def rimbalzo(x, s=1.9):
    """ease-out-back: overshoot e un rimbalzo corto."""
    x = cl(x); c = s + 1
    return 1 + c * (x - 1) ** 3 + s * (x - 1) ** 2


def molla(x, k=7.0, z=0.45):
    """molla smorzata: arriva, supera di poco e si assesta (caduta dei segnalini, blocchi pesanti)."""
    x = cl(x)
    return 1 - math.exp(-z * k * x) * math.cos(k * x * 1.4) if x < 1 else 1.0


# ---------- strati ----------

def strato():
    return Image.new('RGBA', (W, H), (0, 0, 0, 0))


def fondo(col=SCURO):
    return Image.new('RGBA', (W, H), col + (255,))


def griglia(img, passo=36, alfa=0.08):
    s = strato(); d = ImageDraw.Draw(s); a = int(255 * alfa)
    for x in range(0, W, passo):
        d.line((x, 0, x, H), fill=(255, 255, 255, a if x % (passo * 5) == 0 else a // 2), width=1)
    for y in range(0, H, passo):
        d.line((0, y, W, y), fill=(255, 255, 255, a if y % (passo * 5) == 0 else a // 2), width=1)
    img.alpha_composite(s)


def banda(img, y0, y1, alfa=0.8, col=SCURO):
    s = strato(); ImageDraw.Draw(s).rectangle((0, y0, W, y1), fill=col + (int(255 * alfa),)); img.alpha_composite(s)


def ombra(s, dx=-18, dy=14, r=18, a=0.45):
    """ombra morbida di uno strato, proiettata di (dx, dy): sfoca solo il riquadro dell'elemento."""
    out = Image.new('RGBA', s.size, (0, 0, 0, 0)); bb = s.getbbox()
    if not bb:
        return out
    m = int(r * 3); x0, y0 = max(0, bb[0] - m), max(0, bb[1] - m); x1, y1 = min(s.width, bb[2] + m), min(s.height, bb[3] + m)
    al = s.crop((x0, y0, x1, y1)).split()[3].filter(ImageFilter.GaussianBlur(r)).point(lambda v: int(v * a))
    o = Image.new('RGBA', al.size, (0, 0, 0, 0)); o.putalpha(al)
    out.paste(o, (x0 + dx, y0 + dy))
    return out


def testo(img, xy, s, f, col=BIANCO, ancora='la', alfa=1.0, ombra_t=False):
    st = strato(); d = ImageDraw.Draw(st)
    d.text(xy, s, font=f, fill=col + (int(255 * alfa),), anchor=ancora)
    if ombra_t:
        img.alpha_composite(ombra(st, 0, 4, 8, 0.5 * alfa))
    img.alpha_composite(st)


def righe(s, f, larg):
    out, cur = [], ''
    for p in s.split():
        prova = (cur + ' ' + p).strip()
        if cur and f.getlength(prova) > larg:
            out.append(cur); cur = p
        else:
            cur = prova
    return out + [cur]


def blocco_testo(img, x, y, s, f, col=BIANCO, larg=W - 2 * M, interl=1.15, ancora='la', alfa=1.0):
    """testo a capo automatico; restituisce la y sotto l'ultima riga."""
    asc, disc = f.getmetrics(); lh = int((asc + disc) * interl)
    for i, r in enumerate(righe(s, f, larg)):
        testo(img, (x, y + i * lh), r, f, col, ancora, alfa)
    return y + len(righe(s, f, larg)) * lh


def ruota(s, gradi, centro):
    return s.rotate(gradi, resample=Image.BICUBIC, center=centro)


# ---------- elementi ----------

def pastiglia(img, cx, cy, s, f, scala=1.0, bordo=ARANCIO, fondo_col=BIANCO, col=ANTRACITE, alfa=1.0, pad=(34, 20)):
    tw = f.getlength(s); asc, disc = f.getmetrics(); th = asc + disc
    w, h = (tw + 2 * pad[0]) * scala, (th + 2 * pad[1]) * scala
    st = strato(); d = ImageDraw.Draw(st)
    box = (cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2)
    d.rounded_rectangle(box, radius=h * 0.32, fill=fondo_col + (int(255 * alfa),),
                        outline=(bordo + (int(255 * alfa),)) if bordo else None, width=max(1, int(5 * scala)) if bordo else 0)
    fs = f.font_variant(size=max(8, int(f.size * scala)))
    d.text((cx, cy), s, font=fs, fill=col + (int(255 * alfa),), anchor='mm')
    img.alpha_composite(ombra(st, 0, 8, 14, 0.35 * alfa)); img.alpha_composite(st)
    return box


def freccia(img, x0, x1, y, p, col=ARANCIO, spessore=8, punta=26):
    """freccia orizzontale disegnata fino alla frazione p."""
    if p <= 0:
        return
    xe = x0 + (x1 - x0) * p
    st = strato(); d = ImageDraw.Draw(st)
    d.line((x0, y, xe - punta * 0.6, y), fill=col + (255,), width=spessore)
    d.polygon([(xe, y), (xe - punta, y - punta * 0.62), (xe - punta, y + punta * 0.62)], fill=col + (255,))
    img.alpha_composite(st)


def linea(img, x0, y0, x1, y1, p=1.0, col=ARANCIO, spessore=4, alfa=1.0):
    if p <= 0:
        return
    st = strato(); ImageDraw.Draw(st).line((x0, y0, x0 + (x1 - x0) * p, y0 + (y1 - y0) * p),
                                           fill=col + (int(255 * alfa),), width=spessore)
    img.alpha_composite(st)


def a_mano(punti, seme=3, ampiezza=3.0):
    """punti di una linea «a mano libera»: leggermente irregolare, mai perfetta."""
    rng = np.random.default_rng(seme); out = []
    for i, (x, y) in enumerate(punti):
        out.append((x + rng.normal(0, ampiezza * 0.4), y + math.sin(i * 0.7 + seme) * ampiezza + rng.normal(0, ampiezza * 0.3)))
    return out


def tratto(img, punti, p, col=ARANCIO, spessore=7):
    """polilinea disegnata fino alla frazione p della sua lunghezza."""
    if p <= 0 or len(punti) < 2:
        return
    n = max(2, int(len(punti) * p))
    st = strato(); ImageDraw.Draw(st).line(punti[:n], fill=col + (255,), width=spessore, joint='curve')
    img.alpha_composite(st)


def spunta(img, x, y, s, p, col=ARANCIO):
    pts = a_mano([(x + s * u, y + s * (0.55 + 0.45 * u / 0.38)) if u < 0.38 else
                  (x + s * u, y + s * (1.0 - 1.15 * (u - 0.38))) for u in np.linspace(0, 1, 24)], 5, 1.2)
    tratto(img, pts, p, col, max(6, int(s * 0.12)))


def sottolinea(img, x0, x1, y, p, col=BIANCO, seme=7):
    pts = a_mano([(x, y) for x in np.linspace(x0, x1, 40)], seme, 3.5)
    tratto(img, pts, p, col, 7)


def blocco3d(img, x, y, w, h, prof, col, ombra_l=1.0, alfa=1.0):
    """blocco solido in assonometria leggera: faccia frontale (x, y, w, h), sopra e fianco destro più chiari/scuri,
    ombra proiettata a 45° sul piano. y è il lato alto della faccia frontale."""
    st = strato(); d = ImageDraw.Draw(st); a = int(255 * alfa)
    chiaro = tuple(min(255, int(c * 1.25 + 18)) for c in col); scuro = tuple(int(c * 0.62) for c in col)
    if ombra_l > 0:
        so = strato(); ImageDraw.Draw(so).polygon(
            [(x, y + h), (x + w, y + h), (x + w + prof * 2.2 * ombra_l, y + h + prof * 1.1 * ombra_l),
             (x + prof * 2.2 * ombra_l, y + h + prof * 1.1 * ombra_l)], fill=(0, 0, 0, int(110 * alfa)))
        img.alpha_composite(so.filter(ImageFilter.GaussianBlur(10)))
    d.polygon([(x, y), (x + prof, y - prof * 0.6), (x + w + prof, y - prof * 0.6), (x + w, y)], fill=chiaro + (a,))
    d.polygon([(x + w, y), (x + w + prof, y - prof * 0.6), (x + w + prof, y + h - prof * 0.6), (x + w, y + h)], fill=scuro + (a,))
    d.rectangle((x, y, x + w, y + h), fill=col + (a,))
    img.alpha_composite(st)


def lente(img, box, alfa=1.0, spessore=8):
    st = strato(); d = ImageDraw.Draw(st)
    d.rounded_rectangle(box, radius=14, outline=ARANCIO + (int(255 * alfa),), width=spessore)
    img.alpha_composite(ombra(st, 0, 6, 10, 0.3 * alfa)); img.alpha_composite(st)


_RUMORE = {}


def rumore(seme, scala=1.0):
    k = (seme, scala)
    if k not in _RUMORE:
        rng = np.random.default_rng(seme)
        r = rng.random((H // 8 + 2, W // 8 + 2)).astype(np.float32)
        r = np.array(Image.fromarray((r * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC), np.float32) / 255
        _RUMORE[k] = r
    return _RUMORE[k]


def stencil(img, xy, s, f, col, p, seme=11, ancora='la', alfa=1.0):
    """testo «verniciato a maschera»: compare per strati irregolari da sinistra, bordi appena sporchi."""
    if p <= 0:
        return
    st = strato(); ImageDraw.Draw(st).text(xy, s, font=f, fill=col + (255,), anchor=ancora)
    a = np.array(st.split()[3], np.float32) / 255
    bb = st.getbbox()
    if not bb:
        return
    x0, x1 = bb[0], bb[2]
    xs = (np.arange(W, dtype=np.float32)[None, :] - x0) / max(1, x1 - x0)
    n = rumore(seme)
    fronte = p * 1.25 - 0.12 + (n - 0.5) * 0.25            # bordo del fronte irregolare, a strati
    vis = np.clip((fronte - xs) * 12, 0, 1)
    sporco = np.clip((rumore(seme + 1) - 0.08) * 6, 0, 1)    # qualche lacuna nella vernice
    a = a * vis * (0.82 + 0.18 * sporco) * alfa
    st.putalpha(Image.fromarray((a * 255).astype(np.uint8)))
    img.alpha_composite(st)


# ---------- texture (una volta sola) ----------

_TEX = {}


def tex(nome):
    if nome in _TEX:
        return _TEX[nome]
    rng = np.random.default_rng(len(nome))
    base = np.array(SCURO, np.float32)[None, None, :] * np.ones((H, W, 1), np.float32)
    if nome == 'metallo':                  # metallo spazzolato: rumore stirato in orizzontale
        n = rng.normal(0, 1, (H, W // 24)).astype(np.float32)
        n = np.array(Image.fromarray((n * 30 + 128).clip(0, 255).astype(np.uint8)).resize((W, H), Image.BILINEAR), np.float32) - 128
        x = base + n[..., None] * 0.22 + (rng.normal(0, 3, (H, W, 1))).astype(np.float32) + np.linspace(-8, 8, W)[None, :, None]
    elif nome == 'legno':
        yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
        venature = np.sin(xx / 9.0 + np.sin(yy / 140.0) * 3.0 + rumore(21) * 6.0)
        x = base * (0.92 + 0.10 * venature[..., None]) + np.array([6, 4, -2], np.float32)
    elif nome == 'carta':
        n = rumore(31) - 0.5
        x = np.array(VERDE, np.float32)[None, None, :] * (1 + n[..., None] * 0.06)
    else:
        x = base
    _TEX[nome] = Image.fromarray(x.clip(0, 255).astype(np.uint8)).convert('RGBA')
    return _TEX[nome]


def vignetta(img, forza=0.35):
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    r = np.sqrt(((xx - W / 2) / (W * 0.75)) ** 2 + ((yy - H / 2) / (H * 0.75)) ** 2)
    a = np.clip((r - 0.45) / 0.6, 0, 1) ** 1.6 * forza
    st = Image.new('RGBA', (W, H), (0, 20, 10, 0)); st.putalpha(Image.fromarray((a * 255).astype(np.uint8)))
    img.alpha_composite(st)
