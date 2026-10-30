"""Montaggio della serie «CCNL Funzioni Locali 2025-2027» con Andrea Ricci (CISL FP Padova Rovigo, provinciale), 9:16.

    python3 strumenti/ccnlfl/monta.py 01 [02 ...]

Tempi: la voce di avatar.py (audio/tempi-video.json); ogni scena comincia 0,15 s prima della sua frase e finisce dove
comincia la successiva. Ogni fotogramma si compone in PIL (grafica.py): le slide animate di ogni scena (una sola
animazione protagonista, il motivo ricorrente del video), le clip Higgsfield gradate in verde con grana e vignettatura e
sempre in movimento (rallentate al più ×MAX_LENTO, poi push-in lento), Andrea scontornato in basso a destra con ombra
verso sinistra (grande in apertura, posizione sindacale e chiusura, ridotto sui dati), logo in alto a sinistra nel suo
riquadro bianco, «Importi lordi» in sovrimpressione sulle scene con cifre, stacchi a wipe diagonale di 5°.
Scelte di Achille: nessun sottotitolo (resta sottotitoli.srt), musica bassa sotto la voce. Uscita −16 LUFS.
"""
import glob, json, math, os, re, subprocess, sys, unicodedata
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, QUI)
from grafica import *  # noqa: F401,F403,E402
import grafica as g  # noqa: E402

BASE = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-ccnl-fl-serie')
CLIP = f'{BASE}/clip'
LOGO = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-av1-il-filo-che-ci-unisce', 'brand',
                    'logo_CISL_FP_Padova_Rovigo.png')
MUSICA = f'{BASE}/audio/musica.wav'
AVATAR_H = {'grande': 0.45, 'normale': 0.40, 'piccolo': 0.30}
MAX_LENTO, WIPE, PRIMA = 2.0, 0.35, 0.15
GRADA = ("colorchannelmixer=.70:.18:.12:0:.04:.96:0:0:.05:.20:.75:0,eq=contrast=1.14:saturation=0.85:gamma=0.97,"
         "colorbalance=gs=.06:gm=.08:gh=.04:bs=-.04:bm=-.02,noise=alls=7:allf=t+u")


def cartella(n):
    return glob.glob(f'{BASE}/{n}_*')[0]


def norm(s):
    return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode())


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


# ---------- clip ----------

class Clip:
    """fotogrammi gradati di una clip (jpg in cache), rallentata con il flusso ottico quanto serve (al più ×MAX_LENTO).
    modo 'lento': poi tiene l'ultimo fotogramma; 'decelera': rallenta fino a fermarsi a t_stop (e desatura sul fermo)."""

    def __init__(self, nome, d, modo='lento', t_stop=None):
        src = f'{CLIP}/{nome}.mp4'; dc = durata(src); self.modo = modo
        f = min(d / dc, MAX_LENTO) if modo == 'lento' else MAX_LENTO
        self.dir = f'{BASE}/montaggio/cache/{nome}_{f:.3f}'
        if not os.path.exists(f'{self.dir}/ok'):
            os.makedirs(self.dir, exist_ok=True)
            vf = (f"setpts=PTS*24/25" if f <= 24 / 25 else
                  f"setpts={f:.4f}*PTS,minterpolate=fps=25:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1:scd=none")
            ff('-i', src, '-vf', f"{vf},fps=25,scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,"
               f"crop={W}:{H},{GRADA}", '-q:v', '4', f'{self.dir}/%05d.jpg')
            open(f'{self.dir}/ok', 'w').write('')
        self.n = len(glob.glob(f'{self.dir}/*.jpg')); self.d = d; self.t_stop = t_stop or d

    def __call__(self, t):
        if self.modo == 'decelera':
            u = cl(t / self.t_stop); i = int((self.n - 1) * fuori(u, 2.2))
        else:
            i = min(self.n - 1, int(t * FPS))
        im = Image.open(f'{self.dir}/{i + 1:05d}.jpg').convert('RGB')
        z = 1 + 0.07 * inout(t / max(self.d, 1))           # push-in lentissimo: nessuna clip ferma
        w, h = W / z, H / z
        im = im.resize((W, H), Image.BICUBIC, box=((W - w) / 2, (H - h) * 0.45, (W + w) / 2, (H - h) * 0.45 + h))
        if self.modo == 'decelera' and t > self.t_stop:
            s = 1 - 0.45 * prog(t, self.t_stop, 1.2)
            a = np.asarray(im, np.float32); gr = a.mean(2, keepdims=True); im = Image.fromarray((gr + (a - gr) * s).astype(np.uint8))
        im = im.convert('RGBA'); vignetta(im, 0.4)
        return im


# ---------- contesto della scena ----------

class Ctx:
    def __init__(self, sid, t0, voce0, parole):
        self.sid, self.t0, self.voce0, self.p = sid, t0, voce0, parole

    def quando(self, parola, dopo=0.0, fine=False):
        """tempo locale (nella scena) della prima parola che comincia per `parola` detta dopo `dopo` s."""
        for w in self.p:
            t = self.voce0 - self.t0 + (w['b'] if fine else w['a'])
            if t >= dopo and norm(w['w']).startswith(norm(parola)):
                return t
        return None

    def fine_voce(self):
        return self.voce0 - self.t0 + self.p[-1]['b']


def parole_in(ctx, frase):
    """tempi locali delle parole di `frase` dentro il parlato della scena (per farle comparire mentre Andrea le dice)."""
    pv = [norm(w['w']) for w in ctx.p]; pf = [norm(x) for x in frase.split()]
    for i in range(len(pv) - len(pf) + 1):
        if pv[i:i + len(pf)] == pf:
            return [ctx.voce0 - ctx.t0 + ctx.p[i + k]['a'] for k in range(len(pf))]
    return None


# ---------- scene comuni ----------

def titolo_banda(img, t, y, riga1, riga2, f1=None, f2=None, col1=BIANCO, col2=ARANCIO, ingresso='rimbalzo', t2=0.6):
    """banda verde scuro all'80% con titolo e specifica (apertura dei video)."""
    f1 = f1 or font(800, 76); f2 = f2 or font(700, 40, True)
    banda(img, y - 30, y + 230, 0.8)
    if ingresso == 'sinistra':
        p = fuori(prog(t, 0.2, 0.7), 3); testo(img, (M - 400 * (1 - p), y), riga1, f1, col1, alfa=p)
    else:
        blocco_testo(img, M, y, riga1, f1, col1)
    q = fuori(prog(t, t2, 0.6)); testo(img, (M, y + 140 + 30 * (1 - q)), riga2, f2, col2, alfa=q)


def chiusura_base(img, t, cta, claim=None, col_cta=ARANCIO, y_claim=1020):
    """claim e call to action sotto il logo centrale (la CTA per ultima, con un piccolo scatto); tutto sopra la testa di
    Andrea, che in chiusura è grande."""
    if claim:
        q = fuori(prog(t, 1.4, 0.7)); testo(img, (W / 2, y_claim + 30 * (1 - q)), claim, font(700, 42, True), BIANCO, 'ma', q)
    q = rimbalzo(prog(t, 2.2, 0.5)); a = cl(prog(t, 2.2, 0.25))
    y = y_claim + 80 if claim else 1040
    for i, r in enumerate(righe(cta, font(800, 40), W - 2 * M)):
        testo(img, (W / 2, y + i * 54 - 14 * (1 - q)), r, font(800, 40), col_cta, 'ma', a)


@__import__('functools').lru_cache(maxsize=None)
def logo_misura(larg):
    lg = Image.open(LOGO).convert('RGBA'); return lg.resize((larg, int(lg.height * larg / lg.width)), Image.LANCZOS)


def logo_centrale(img, cx, cy, alfa, larg=420):
    lg = logo_misura(larg); h = lg.height
    st = strato(); d = ImageDraw.Draw(st)
    d.rounded_rectangle((cx - larg / 2 - 34, cy - h / 2 - 26, cx + larg / 2 + 34, cy + h / 2 + 26), 26, fill=(255, 255, 255, 255))
    st.alpha_composite(lg, (int(cx - larg / 2), int(cy - h / 2)))
    st.putalpha(st.split()[3].point(lambda v: int(v * alfa)))
    img.alpha_composite(ombra(st, 0, 10, 18, 0.35 * alfa)); img.alpha_composite(st)


# ======================================================================================================================
# VIDEO 01 — IL CALENDARIO CHE NON SI STRAPPA: il filo arancio a quota FILO_Y attraversa tutte le scene
# ======================================================================================================================

def filo(img, p=1.0, x0=0, x1=W):
    linea(img, x0, FILO_Y, x0 + (x1 - x0), FILO_Y, p, ARANCIO, 5)


def v01_s1(img, t, d, c):
    filo(img, inout(prog(t, 0.3, 1.0)))
    banda(img, 780, 1050, 0.8)
    q = rimbalzo(prog(t, 0.2, 0.7)); r = inout(prog(t, 2.4, 0.8))      # entra grande, poi si riduce e sale sopra il filo
    px = int(96 - 34 * r); f = font(800, max(10, int(px * (0.6 + 0.4 * q))))   # 96 px: «28 OTTOBRE 2026» sta nei margini
    testo(img, (M, 830 - 20 * r), '28 OTTOBRE 2026', f, ARANCIO, alfa=cl(q * 1.5))
    a = fuori(prog(t, 2.9, 0.7))
    blocco_testo(img, M, 930 + 40 * (1 - a), 'contratto firmato mentre il triennio è ancora in corso', font(700, 40, True),
                 BIANCO, alfa=a)


def v01_s2(img, t, d, c):
    griglia(img)
    # sagoma di calendario fuori fuoco sullo sfondo
    s = strato(); dr = ImageDraw.Draw(s)
    dr.rounded_rectangle((300, 260, 860, 820), 30, outline=(255, 255, 255, 40), width=10)
    for i in range(5):
        for j in range(4):
            dr.rectangle((340 + i * 102, 400 + j * 100, 410 + i * 102, 460 + j * 100), fill=(255, 255, 255, 22))
    img.alpha_composite(s.filter(ImageFilter.GaussianBlur(9)))
    testo(img, (M, 420), 'VIGENZA', font(800, 96), BIANCO)
    x0, x1 = M + 20, W - M - 20; p = inout(prog(t, 0.4, 1.0))
    linea(img, x0, FILO_Y, x1, FILO_Y, p, BIANCO, 6)
    xs = [x0 + 40, (x0 + x1) / 2, x1 - 40]
    for i, (x, a) in enumerate(zip(xs, ('2025', '2026', '2027'))):
        if t > 1.2 + 0.25 * i:
            linea(img, x, FILO_Y - 34, x, FILO_Y + 34, 1, BIANCO, 6)
            testo(img, (x, FILO_Y + 56), a, font(800, 44), BIANCO, 'ma')
    # segnalino a goccia: scende con una molla e pulsa due volte
    m = molla(prog(t, 2.2, 1.1)); xg = (xs[1] + xs[2]) / 2; yg = -100 + (FILO_Y - 70 + 100) * m
    if t > 2.2:
        pul = 1 + 0.12 * math.sin(max(0, t - 3.4) * 8) * (t - 3.4 < 0.8 and t > 3.4)
        st = strato(); dr = ImageDraw.Draw(st); r = 26 * pul
        dr.ellipse((xg - r, yg - r, xg + r, yg + r), fill=ARANCIO + (255,))
        dr.polygon([(xg - r * 0.8, yg + r * 0.55), (xg + r * 0.8, yg + r * 0.55), (xg, yg + r * 2.1)], fill=ARANCIO + (255,))
        img.alpha_composite(ombra(st, 0, 8, 8, 0.4)); img.alpha_composite(st)
    q = fuori(prog(t, 3.0, 0.6)); f = font(700, 44); a = '1 gennaio 2025'; x = M + f.getlength(a) + 22
    testo(img, (M, 600), a, f, BIANCO, alfa=q)
    if q > 0:
        freccia(img, x, x + 70, 627, 1, BIANCO, 5, 18)
    testo(img, (x + 92, 600), '31 dicembre 2027', f, BIANCO, alfa=q)


def v01_s3(img, t, d, c):
    filo(img, 1.0, 0, 160); filo(img, 1.0, W - 160, W)            # frammenti del filo ai bordi
    banda(img, 740, 1000, 0.8)
    a, b = 230, W - 250; y = 820
    q1 = rimbalzo(prog(t, 0.3, 0.5)); pastiglia(img, a, y, '23 FEBBRAIO', font(800, 40), 0.9 + 0.1 * q1, alfa=cl(q1))
    t_arr = 2.2 + 1.2                                        # la freccia parte con un piccolo accumulo
    acc = 0.06 * math.sin(prog(t, 1.6, 0.6) * math.pi)
    p = inout(prog(t, 2.2, 1.2)); freccia(img, a + 160, b - 150, y, max(acc, p) if t > 1.6 else 0)
    if t > 1.0:
        sc = 1 + 0.05 * math.sin(prog(t, t_arr, 0.3) * math.pi)
        q2 = fuori(prog(t, 1.0, 0.4)); pastiglia(img, b + 5 * math.sin(prog(t, t_arr, 0.3) * math.pi), y, '28 OTTOBRE',
                                                 font(800, 40), sc * (0.9 + 0.1 * q2), alfa=q2)
    q = fuori(prog(t, t_arr + 0.3, 0.6)); testo(img, (W / 2, 920), 'due rinnovi in otto mesi', font(700, 42, True), BIANCO, 'ma', q)


def v01_s4(img, t, d, c):
    filo(img, 1.0, 0, 120); filo(img, 1.0, W - 120, W)
    # sinistra: desaturata, sfocata, inclinata, «calendario strappato»
    p = fuori(prog(t, 0.2, 0.7)); fl = 2 * inout(prog(t, 0.9, 0.8))
    s = strato(); dr = ImageDraw.Draw(s); x0, y0, w, h = M, 330, 440, 620
    dr.rounded_rectangle((x0, y0, x0 + w, y0 + h), 24, fill=(70, 96, 82, 255))
    for k in range(9):
        dr.line((x0 + 30 + k * 46, y0 + 30, x0 + 20 + k * 46, y0 + 70), fill=(150, 160, 150, 255), width=5)
    dr.polygon([(x0, y0 + h - 140), (x0 + w, y0 + h - 200), (x0 + w, y0 + h), (x0, y0 + h)], fill=(58, 80, 68, 255))
    for i, r in enumerate(('ANNI', 'DI ATTESA')):
        dr.text((x0 + w / 2, y0 + 220 + i * 78), r, font=font(800, 64), fill=(200, 205, 200, 255), anchor='mm')
    s = ruota(s, 3 + fl, (x0 + w / 2, y0 + h / 2)).filter(ImageFilter.GaussianBlur(1.6))
    off = strato(); off.alpha_composite(s, (int(-500 * (1 - p)), 0)); img.alpha_composite(off)
    # destra: nitida, dritta, si solleva di 8 px, bordo arancio che si traccia in senso orario
    q = fuori(prog(t, 0.7, 0.6)); su = 8 * inout(prog(t, 1.2, 0.6))
    x0 = W - M - 440; y0 = 330 - su
    s = strato(); dr = ImageDraw.Draw(s)
    dr.rounded_rectangle((x0, y0, x0 + 440, y0 + 620), 24, fill=BIANCO + (255,))
    for i, r in enumerate(('AUMENTI', 'SUBITO')):
        dr.text((x0 + 220, y0 + 250 + i * 80), r, font=font(800, 64), fill=SCURO + (255,), anchor='mm')
    sh = ombra(s, 0, int(14 + su * 2), 22, 0.45)
    lay = strato(); lay.alpha_composite(sh); lay.alpha_composite(s)
    pb = inout(prog(t, 1.3, 1.4))
    if pb > 0:
        per = [(x0, y0), (x0 + 440, y0), (x0 + 440, y0 + 620), (x0, y0 + 620), (x0, y0)]
        pts = []
        for (ax, ay), (bx, by) in zip(per, per[1:]):
            pts += [(ax + (bx - ax) * u, ay + (by - ay) * u) for u in np.linspace(0, 1, 30)]
        n = max(2, int(len(pts) * pb)); ImageDraw.Draw(lay).line(pts[:n], fill=ARANCIO + (255,), width=12)
    sl = strato(); sl.alpha_composite(lay, (int(500 * (1 - q)), 0)); img.alpha_composite(sl)


def v01_s5(img, t, d, c):
    filo(img, 1.0, 0, 140)
    p = fuori(prog(t, 0.1, 0.8)); y0 = int(H - (H - 600) * p); banda(img, y0, H, 0.8)
    frase = 'la continuità contrattuale non si proclama si costruisce'
    tw = parole_in(c, frase) or [0.8 + 0.35 * i for i in range(len(frase.split()))]
    vis = ['«La', 'continuità', 'contrattuale', 'non', 'si', 'proclama:', 'si', 'costruisce.»']
    f = font(700, 60, True); x, y, lh = M, 700, 82
    for i, (w, tt) in enumerate(zip(vis, tw)):
        wl = f.getlength(w + ' ')
        if x + wl > W - M:
            x, y = M, y + lh
        a = prog(t, tt - 0.05, 0.35)
        if a > 0:
            s = strato(); ImageDraw.Draw(s).text((x, y), w, font=f, fill=(ARANCIO if i == len(vis) - 1 else BIANCO) + (255,))
            bl = 6 * (1 - a)
            if bl > 0.3:
                s = s.filter(ImageFilter.GaussianBlur(bl))
            s.putalpha(s.split()[3].point(lambda v: int(v * a))); img.alpha_composite(s)
        x += wl
    te = tw[-1] + 0.4; q = inout(prog(t, te, 0.9))
    linea(img, M, 660, W - M, 660, 1, BIANCO, 3); linea(img, M, y + lh + 20, W - M, y + lh + 20, 1, BIANCO, 3)
    if q > 0:
        linea(img, M - M * q, 660, W - M + M * q, 660, 1, BIANCO, 3)


def v01_s6(img, t, d, c):
    img.alpha_composite(tex('carta'))
    testo(img, (M, 340), 'LA POSIZIONE DI', font(800, 46), BIANCO)
    testo(img, (M, 400), 'CISL FP PADOVA ROVIGO', font(800, 58), BIANCO)
    rr = ['Un contratto firmato in vigenza', 'non serve a niente', 'se negli enti resta fermo.',
          'Il nostro lavoro comincia adesso:', 'ente per ente.']
    f = font(600, 44); y0 = 540; lh = 72
    pb = inout(prog(t, 0.5, 0.15 * len(rr) + 0.8))
    linea(img, M + 4, y0 - 6, M + 4, y0 - 6 + (len(rr) * lh) * pb, 1, ARANCIO, 10)
    for i, r in enumerate(rr):
        q = fuori(prog(t, 0.5 + 0.15 * i, 0.6))
        testo(img, (M + 40, y0 + i * lh + 40 * (1 - q)), r, font(800, 44) if i == len(rr) - 1 else f, BIANCO, alfa=q)
    te = c.quando('ente', 3.0) or d - 2.0
    x1 = M + 40 + font(800, 44).getlength('ente per ente.')
    sottolinea(img, M + 40, x1, y0 + 4 * lh + 64, inout(prog(t, te, 0.8)), BIANCO)


def v01_s7(img, t, d, c):
    # il filo converge e si chiude in un cerchio attorno al logo
    p = inout(prog(t, 0.0, 0.9)); cx, cy, r = W / 2, 580, 250
    linea(img, 0, FILO_Y, W / 2 * (1 - p) + 0, FILO_Y, 1 - p, ARANCIO, 5)
    q = inout(prog(t, 0.5, 1.3))
    if q > 0:
        s = strato(); ImageDraw.Draw(s).arc((cx - r, cy - r, cx + r, cy + r), -90, -90 + 360 * q, fill=ARANCIO + (255,), width=8)
        img.alpha_composite(s)
    logo_centrale(img, cx, cy, fuori(prog(t, 1.3, 0.8)), 330)
    chiusura_base(img, t, 'Passa in sede o scrivici: lo guardiamo insieme.', 'contrattiamo, non proclamiamo', y_claim=890)


# ======================================================================================================================
# VIDEO 02 — LA SCALA CHE CRESCE: ogni cifra dentro un blocco tridimensionale con ombra a 45°
# ======================================================================================================================

def v02_s1(img, t, d, c):
    banda(img, 760, 1040, 0.8)
    m = molla(prog(t, 0.3, 0.9), 8, 0.6); y = -300 + (800 + 300) * m
    blocco3d(img, M, y, 420, 180, 34, ARANCIO)
    testo(img, (M + 210, y + 90), '+150 €', font(900, 100), BIANCO, 'mm')
    if 0.3 < prog(t, 0.3, 0.9) < 1 and m > 0.97:                       # onda di polvere all'impatto
        pass
    q = fuori(prog(t, 1.4, 0.7))
    testo(img, (M + 500 + 60 * (1 - q), 850), 'al mese', font(700, 40, True), BIANCO, alfa=q)
    testo(img, (M + 500 + 60 * (1 - q), 900), 'a regime', font(700, 40, True), BIANCO, alfa=q)
    testo(img, (M + 500 + 60 * (1 - q), 950), 'dal 2027', font(700, 40, True), BIANCO, alfa=q)


def contatore(v, p, dec=0, sep='.'):
    x = v * fuori(p, 3)
    s = f'{x:,.{dec}f}'.replace(',', 'X').replace('.', ',').replace('X', sep)
    return s


def v02_s2(img, t, d, c):
    griglia(img)
    p1 = prog(t, 0.5, 1.8); p2 = prog(t, c.quando('cinque', 1.0) or 4.0, 1.6)
    vib1 = 3 * math.sin(prog(t, 2.3, 0.25) * math.pi * 3) * (2.3 < t < 2.55)
    vib2 = 3 * math.sin(prog(t, (c.quando('cinque', 1.0) or 4.0) + 1.6, 0.25) * math.pi * 3)
    blocco3d(img, M + vib1, 360, 720, 230, 40, VERDE)
    testo(img, (M + 40, 400), contatore(988, p1) + ' MILIONI', font(900, 84), BIANCO)
    testo(img, (M + 40, 510), 'annui a regime', font(700, 38, True), BIANCO)
    if t > (c.quando('cinque', 1.0) or 4.0) - 0.3:
        blocco3d(img, M + vib2, 700, 720, 230, 40, VERDE)
        testo(img, (M + 40, 740), '+' + contatore(5.78, p2, 2) + '%', font(900, 84), ARANCIO)
        testo(img, (M + 40, 850), 'del monte salari 2023', font(700, 38, True), BIANCO)


def v02_s3(img, t, d, c):
    griglia(img)
    base = 1150; xs = [M, M + 320, M + 640]; hs = [150, 305, 500]; vals = ['45', '91', '150']
    t_i = [c.quando('quarantacinque') or 1.0, c.quando('novantuno') or 4.0, c.quando('centocinquanta') or 7.0]
    zoom = 1 - 0.04 * inout(prog(t, t_i[2], 1.0))           # la camera arretra un poco al terzo blocco
    lay = strato()
    linea(lay, M - 20, base, W - M + 20, base, 1, BIANCO, 4)
    for i in range(3):
        p = fuori(prog(t, t_i[i] - 0.2, 0.7), 3)
        if p <= 0:
            continue
        h = hs[i] * p
        blocco3d(lay, xs[i], base - h, 240, h, 30, ARANCIO if i == 2 else VERDE)
        testo(lay, (xs[i] + 120, base + 24), str(2025 + i), font(800, 44), BIANCO, 'ma')
        if p > 0.95:
            testo(lay, (xs[i] + 135, base - h - 128), 'circa', font(600, 30), BIANCO, 'ma')
            testo(lay, (xs[i] + 135, base - h - 94), vals[i] + ' €', font(900, 58), ARANCIO if i == 2 else BIANCO, 'ma')
    if zoom < 1:
        lay = lay.resize((int(W * zoom), int(H * zoom)), Image.BICUBIC)
        tmp = strato(); tmp.alpha_composite(lay, (int(W * (1 - zoom) / 2), int(H * (1 - zoom) * 0.6))); lay = tmp
    img.alpha_composite(lay)
    testo(img, (M, 330), 'AUMENTO MEDIO MENSILE', font(800, 46), BIANCO)


def v02_s4(img, t, d, c):
    banda(img, 780, 1010, 0.8)
    blocco_testo(img, M, 820, 'LE MEDIE NON SONO IL TUO STIPENDIO', font(800, 64), BIANCO)   # compare in un fotogramma


def v02_s5(img, t, d, c):
    griglia(img)
    p = inout(prog(t, 0.8, 1.2)); base = 1120
    ta = 2.0
    if t < ta:
        xa = M + 40 * p; xb = W - M - 380 - 40 * p - (W - 2 * M - 760) * p * 0.0
        sep = (1 - p) * 120
        blocco3d(img, M + 0, base - 260, 360 + 0, 260, 30, VERDE)
        blocco3d(img, M + 400 - sep * 0 - 40 * p, base - 260, 360, 260, 30, VERDE)
        testo(img, (M + 180, base - 160), 'CCNL', font(800, 40), BIANCO, 'ma')
        testo(img, (M + 180, base - 110), '2022-2024', font(800, 40), BIANCO, 'ma')
        testo(img, (M + 580 - 40 * p, base - 160), 'CCNL', font(800, 40), BIANCO, 'ma')
        testo(img, (M + 580 - 40 * p, base - 110), '2025-2027', font(800, 40), BIANCO, 'ma')
    else:
        g2 = fuori(prog(t, ta, 0.6)); hh = 260 + 160 * g2 + 14 * math.sin(prog(t, ta + 0.6, 0.4) * math.pi)
        blocco3d(img, M, base - hh, 720, hh, 36, ARANCIO, 1.3)
        if t < ta + 0.08:                                    # la giunzione lampeggia di bianco per due fotogrammi
            banda(img, base - hh, base, 0.0)
            s = strato(); ImageDraw.Draw(s).rectangle((W / 2 - 30, base - hh, W / 2 + 10, base), fill=(255, 255, 255, 230)); img.alpha_composite(s)
        q = fuori(prog(t, ta + 0.4, 0.6))
        testo(img, (M + 360, base - hh / 2 - 60), 'circa 300 €', font(900, 92), BIANCO, 'mm', q)
        testo(img, (M + 360, base - hh / 2 + 30), 'lordi mensili a regime', font(700, 38, True), BIANCO, 'mm', q)
    testo(img, (M, 330), 'CCNL 2022-2024', font(800, 46), BIANCO)
    testo(img, (M, 390), '+ CCNL 2025-2027', font(800, 46), BIANCO)


def v02_s6(img, t, d, c):
    banda(img, 350, 510, 0.8)                                 # in alto, non in basso: inversione voluta
    testo(img, (M, 400), 'CISL FP PADOVA ROVIGO', font(800, 60), BIANCO)


def v02_s7(img, t, d, c):
    q = 1 - inout(prog(t, 0.2, 1.0))                          # i tre blocchi si ritirano verso il basso, piccoli
    for i, h in enumerate((40, 80, 130)):
        blocco3d(img, M + i * 80, 1180 - h + 200 * (1 - q), 60, h, 10, ARANCIO if i == 2 else VERDE, 0.6, alfa=max(0.35, q))
    logo_centrale(img, W / 2, 640, fuori(prog(t, 0.6, 0.8)))
    chiusura_base(img, t, 'Porta il cedolino, facciamo il conto insieme.')


# ======================================================================================================================
# VIDEO 03 — IL CEDOLINO COME SCENA: la lente rettangolare arancio che scorre da sinistra a destra e accende le righe
# ======================================================================================================================

def foglio(img, box, ang=0.0):
    s = strato(); ImageDraw.Draw(s).rounded_rectangle(box, 18, fill=GRIGIO + (255,))
    for y in range(int(box[1]) + 40, int(box[3]) - 20, 46):
        ImageDraw.Draw(s).line((box[0] + 30, y, box[2] - 30, y), fill=(220, 224, 226, 255), width=2)
    if ang:
        s = ruota(s, ang, ((box[0] + box[2]) / 2, box[1]))
    img.alpha_composite(ombra(s, 0, 14, 20, 0.4)); img.alpha_composite(s)


def v03_s1(img, t, d, c):
    titolo_banda(img, t, 790, 'ARRETRATI 2025-2026', 'quanto, davvero', ingresso='sinistra', t2=1.0)
    pk = math.sin(prog(t, 1.8, 1.2) * math.pi)                # la lente fa capolino dal bordo e si ritira
    lente(img, (W - 10 * pk - 4, 760, W + 400, 1020))


def v03_s2(img, t, d, c):
    ond = math.sin(prog(t, 0.2, 1.4) * math.pi * 3) * 2.5 * (1 - prog(t, 0.2, 1.4))
    p = fuori(prog(t, 0.2, 0.7)); dy = 300 * (1 - p)
    foglio(img, (M, 340 + dy, W - M, 1080 + dy), ond)
    r1 = ['CALCOLATI FINO AL', '31 OTTOBRE 2026']; r2 = ['AL NETTO DELL’IVC', 'GIÀ PERCEPITA']
    t1 = c.quando('calcolati') or 1.0; t2 = (c.quando('netto') or 4.0)
    for k, (rr, tt) in enumerate(((r1, t1), (r2, t2 + 0.25))):
        y = 470 + k * 300 + dy
        spunta(img, M + 50, y, 80, inout(prog(t, tt, 0.6)))
        for i, r in enumerate(rr):
            testo(img, (M + 170, y + i * 58), r, font(800, 46), ANTRACITE, alfa=p)


def v03_s3(img, t, d, c):
    rr = [('OPERATORI', '973,93 €'), ('OPERATORI ESPERTI', '1.013,74 €'), ('ISTRUTTORI', '1.139,13 €'),
          ('FUNZIONARI ED E.Q.', '1.235,83 €')]
    chiavi = [c.quando('operatori'), c.quando('esperti'), c.quando('istruttori'), c.quando('funzionari')]
    chiavi = [x if x is not None else 1.0 + 3 * i for i, x in enumerate(chiavi)]
    foglio(img, (M, 330, W - M, 1110))
    y0, lh = 400, 170
    # la lente scorre a scatti controllati, una riga alla volta, sincronizzata con il parlato
    pos = 0.0
    for i, tc in enumerate(chiavi):
        pos = i if t >= tc else pos
        if i > 0 and chiavi[i - 1] <= t < tc:
            pos = i - 1 + inout(prog(t, tc - 0.35, 0.35))
    att = int(round(pos)) if t >= chiavi[0] - 0.4 else -1
    for i, (a, v) in enumerate(rr):
        on = i == att; al = 1.0 if on else 0.5; s = 1.05 if on else 1.0
        y = y0 + i * lh
        testo(img, (M + 40, y + 30), a, font(800, int(40 * s)), ANTRACITE, alfa=al)
        testo(img, (W - M - 40, y + 90), v, font(900, int(58 * s)), ARANCIO if on else ANTRACITE, 'ra', alfa=al)
    if att >= 0:
        y = y0 + pos * lh
        lente(img, (M + 14, y + 6, W - M - 14, y + lh - 6))


def v03_s4(img, t, d, c):
    banda(img, 780, 1010, 0.8)
    blocco_testo(img, M, 820, 'QUELLO CHE ARRIVA IN BUSTA PUÒ ESSERE DIVERSO', font(800, 58), BIANCO)


def v03_s5(img, t, d, c):
    griglia(img)
    xt = 520; y = 860
    p = inout(prog(t, 0.3, 1.0)); linea(img, M, y, M + (xt - M) * p, y, 1, BIANCO, 7)
    if t > 1.2:
        linea(img, xt, y - 40, xt, y + 40, 1, BIANCO, 7)
        testo(img, (xt, y + 64), '31.10.2026', font(900, 60), BIANCO, 'ma')
    # il tratteggio continua a scorrere oltre il bordo destro, anche quando il parlato è finito
    if t > 1.6:
        st = strato(); dr = ImageDraw.Draw(st); off = ((t - 1.6) * 90) % 60
        x = xt + 20 - 60 + off; fine = xt + 20 + (t - 1.6) * 260
        while x < min(W + 60, fine):
            if x + 34 > xt + 14:
                dr.line((max(x, xt + 14), y, x + 34, y), fill=ARANCIO + (255,), width=8)
            x += 60
        img.alpha_composite(st)
    q = fuori(prog(t, 2.2, 0.7)); testo(img, (M, 1000), 'il conteggio continua', font(700, 48, True), BIANCO, alfa=q)
    testo(img, (M, 400), 'E POI', font(800, 56), BIANCO); testo(img, (M, 470), 'CONTINUA', font(800, 56), BIANCO)


def v03_s6(img, t, d, c):
    banda(img, 780, 960, 0.8)
    testo(img, (M, 836), 'CISL FP PADOVA ROVIGO', font(800, 60), BIANCO)


def v03_s7(img, t, d, c):
    cx, cy = W / 2, 640
    p = fuori(prog(t, 0.0, 0.9), 3); x = -600 + (cx + 300 + 600 - 0) * p - 300
    bl = 0 < t - 0.9 < 0.25
    a = 1 - prog(t, 1.4, 0.5)
    if a > 0 and not bl:
        lente(img, (x - 300 + 0, cy - 170, x + 300, cy + 170), alfa=a)
    logo_centrale(img, cx, cy, fuori(prog(t, 1.0, 0.7)))
    chiusura_base(img, t, 'Porta il cedolino, lo verifichiamo insieme.')


# ======================================================================================================================
# VIDEO 04 — IL CANTIERE: ogni numero importante stencilato, piastre di metallo e legno
# ======================================================================================================================

def gradini(img, t, d, c, titolo, vals, materiale, chiavi):
    img.alpha_composite(tex(materiale))
    stencil(img, (M, 330), titolo, font(900, 64), BIANCO, prog(t, 0.2, 0.8), 13)
    base = 1150; xs = [M, M + 320, M + 640]; hs = [170, 300, 440]
    scossa = 0
    for i in range(3):
        tc = chiavi[i] - 0.25
        if t < tc:
            continue
        p = fuori(prog(t, tc, 0.35), 2)
        if 0 < t - tc - 0.35 < 0.12:
            scossa = 2 * math.sin((t - tc) * 80)
        y = base - hs[i] - 260 * (1 - p)
        col = ARANCIO if i == 2 else ((120, 140, 128) if materiale == 'metallo' else (150, 118, 80))
        blocco3d(img, xs[i], y + scossa, 240, hs[i], 26, col, alfa=cl(p * 2))
        testo(img, (xs[i] + 120, base + 22), str(2025 + i), font(800, 42), BIANCO, 'ma')
        stencil(img, (xs[i] + 133, y - 30 + scossa), vals[i], font(900, 54), ARANCIO if i == 2 else BIANCO,
                prog(t, tc + 0.5, 0.6), 17 + i, 'ms')


def v04_s1(img, t, d, c):
    banda(img, 760, 1040, 0.8)
    stencil(img, (M, 790), 'OPERATORI E', font(900, 70), BIANCO, prog(t, 0.3, 0.9), 5)
    stencil(img, (M, 870), 'OPERATORI ESPERTI', font(900, 70), BIANCO, prog(t, 0.6, 0.9), 6)
    q = fuori(prog(t, 1.6, 0.6)); testo(img, (M, 975 + 20 * (1 - q)), 'le tue cifre, non le medie', font(700, 40, True), ARANCIO, alfa=q)


def v04_s2(img, t, d, c):
    k = [c.quando('trentotto'), c.quando('settantotto'), c.quando('centootto')]
    gradini(img, t, d, c, 'OPERATORI', ['+38,63 €', '+78,12 €', '+108,95 €'], 'metallo',
            [x if x is not None else 1.5 + 2.5 * i for i, x in enumerate(k)])


def v04_s3(img, t, d, c):
    banda(img, 720, 1040, 0.8)
    a, b, y = 270, W - 280, 830
    pastiglia(img, a, y, '21.399,16 €', font(800, 40), alfa=fuori(prog(t, 0.3, 0.4)))
    tt = c.quando('ventiduemila') or 4.0
    p = prog(t, tt - 1.2, 1.2); p = math.floor(p * 5) / 5 if p < 1 else 1.0   # a scatti, come un braccio che si estende
    freccia(img, a + 170, b - 165, y, p, ARANCIO, 14, 34)
    if t > tt - 0.2:
        sc = 1 + 0.05 * inout(prog(t, tt, 0.3)); pastiglia(img, b, y, '22.815,51 €', font(800, 40), sc)
    q = fuori(prog(t, tt + 0.4, 0.6)); testo(img, (W / 2, 950), 'annui su 13 mensilità', font(700, 40, True), BIANCO, 'ma', q)


def v04_s4(img, t, d, c):
    k = [c.quando('quaranta'), c.quando('ottantuno'), c.quando('centotredici')]
    gradini(img, t, d, c, 'OPERATORI ESPERTI', ['+40,22 €', '+81,33 €', '+113,53 €'], 'legno',
            [x if x is not None else 1.5 + 2.5 * i for i, x in enumerate(k)])


def v04_s5(img, t, d, c):
    img.alpha_composite(tex('metallo'))
    stencil(img, (M, 330), 'ARRETRATI', font(900, 70), BIANCO, prog(t, 0.2, 0.8), 23)
    nomi = [('OPERATORI', 973.93, c.quando('novecentosettantatre') or 3.0),
            ('OPERATORI ESPERTI', 1013.74, c.quando('milletredici') or 6.0)]
    for i, (nm, v, tv) in enumerate(nomi):
        x0, y0 = M + i * 470, 560; w, h = 430, 320
        ap = inout(prog(t, tv - 1.0, 0.6))                    # il coperchio si apre
        s = strato(); dr = ImageDraw.Draw(s)
        dr.rounded_rectangle((x0, y0 + 90, x0 + w, y0 + h + 90), 18, fill=(120, 140, 128, 255))
        dr.rectangle((x0 + 150, y0 + 60, x0 + w - 150, y0 + 90), fill=(90, 105, 96, 255))
        lid_y = y0 + 20 - 120 * ap
        dr.rounded_rectangle((x0 - 10, lid_y, x0 + w + 10, lid_y + 80), 16, fill=(100, 118, 108, 255))
        img.alpha_composite(ombra(s, 0, 16, 18, 0.45)); img.alpha_composite(s)
        stencil(img, (x0 + w / 2, lid_y + 40), nm, font(900, 30 if i else 36), BIANCO, prog(t, 0.6 + 0.3 * i, 0.6), 30 + i, 'mm')
        p = prog(t, tv, 1.4); p = math.floor(p * 12) / 12 if p < 1 else 1.0   # contatore meccanico, a scatti
        if t > tv - 0.1:
            testo(img, (x0 + w / 2, y0 + 250), contatore(v, p, 2) + ' €', font(900, 54), ARANCIO if i == 1 else BIANCO, 'mm')


def v04_s6(img, t, d, c):
    banda(img, 780, 960, 0.8)
    testo(img, (M, 836), 'CISL FP PADOVA ROVIGO', font(800, 60), BIANCO)


def v04_s7(img, t, d, c):
    img.alpha_composite(tex('metallo'))
    cx, cy = W / 2, 640; w, h = 560, 380
    lati = [((cx - w / 2, cy - h / 2), (cx + w / 2, cy - h / 2)), ((cx + w / 2, cy - h / 2), (cx + w / 2, cy + h / 2)),
            ((cx + w / 2, cy + h / 2), (cx - w / 2, cy + h / 2)), ((cx - w / 2, cy + h / 2), (cx - w / 2, cy - h / 2))]
    for i, ((x0, y0), (x1, y1)) in enumerate(lati):           # la cornice si vernicia in quattro tratti
        p = inout(prog(t, 0.2 + 0.35 * i, 0.35))
        tratto(img, a_mano([(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u) for u in np.linspace(0, 1, 30)], 40 + i, 2.5), p, ARANCIO, 14)
    logo_centrale(img, cx, cy, fuori(prog(t, 1.2, 0.7)), 380)
    chiusura_base(img, t, 'Portaci il cedolino in sede: la verifichiamo in due minuti.', col_cta=ARANCIO)


# ======================================================================================================================
# scene dei quattro video: (funzione, clip o None, modo della clip, avatar, importi lordi)
# ======================================================================================================================

SCENE = {
    '01': [(v01_s1, 'c101', 'lento', 'grande', False), (v01_s2, None, None, 'piccolo', False),
           (v01_s3, 'c103', 'lento', 'normale', False), (v01_s4, None, None, 'piccolo', False),
           (v01_s5, 'c105', 'lento', 'normale', False), (v01_s6, None, None, 'grande', False),
           (v01_s7, None, None, 'grande', False)],
    '02': [(v02_s1, 'c201', 'lento', 'grande', True), (v02_s2, None, None, 'piccolo', False),
           (v02_s3, None, None, 'piccolo', True), (v02_s4, 'c204', 'lento', 'normale', False),
           (v02_s5, None, None, 'piccolo', True), (v02_s6, 'c206', 'decelera', 'grande', False),
           (v02_s7, None, None, 'grande', True)],
    '03': [(v03_s1, 'c301', 'lento', 'grande', False), (v03_s2, None, None, 'piccolo', False),
           (v03_s3, None, None, 'piccolo', True), (v03_s4, 'c304', 'lento', 'normale', False),
           (v03_s5, None, None, 'piccolo', False), (v03_s6, 'c307', 'decelera', 'grande', False),
           (v03_s7, None, None, 'grande', True)],
    '04': [(v04_s1, 'c401', 'lento', 'grande', False), (v04_s2, None, None, 'piccolo', True),
           (v04_s3, 'c403', 'lento', 'normale', True), (v04_s4, None, None, 'piccolo', True),
           (v04_s5, None, None, 'piccolo', True), (v04_s6, 'c406', 'decelera', 'grande', False),
           (v04_s7, None, None, 'grande', True)],
}
NOMI = {'01': 'Firmato_in_vigenza', '02': 'Quanto_aumenta', '03': 'Arretrati', '04': 'Operatori'}


# ---------- avatar, logo, sovrimpressioni ----------

class Avatar:
    def __init__(self, mov):
        self.w, self.h = map(int, subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries',
                                                  'stream=width,height', '-of', 'csv=p=0', mov],
                                                 capture_output=True, text=True).stdout.split(',')[:2])
        self.p = subprocess.Popen(['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-i', mov, '-f', 'rawvideo', '-pix_fmt', 'rgba', '-'],
                                  stdout=subprocess.PIPE)
        self.ult = None

    def prossimo(self):
        b = self.p.stdout.read(self.w * self.h * 4)
        if len(b) == self.w * self.h * 4:
            self.ult = Image.frombytes('RGBA', (self.w, self.h), b)
        return self.ult


def metti_avatar(img, av, hfrac):
    if av is None:
        return
    h = int(H * hfrac); w = int(av.width * h / av.height)
    a = av.resize((w, h), Image.BICUBIC); x = W - w + int(w * 0.06)
    a = a.crop((0, 0, W - x, h))                               # il margine destro del ritaglio esce dal quadro
    st = strato(); st.alpha_composite(a, (x, H - h))
    img.alpha_composite(ombra(st, -26, 10, 22, 0.5)); img.alpha_composite(st)


_LOGO = None


def metti_logo(img):
    global _LOGO
    if _LOGO is None:
        lg = Image.open(LOGO).convert('RGBA'); w = 250; h = int(lg.height * w / lg.width); lg = lg.resize((w, h), Image.LANCZOS)
        s = strato(); ImageDraw.Draw(s).rounded_rectangle((M, 170, M + w + 36, 170 + h + 28), 16, fill=(255, 255, 255, 255))
        s.alpha_composite(lg, (M + 18, 184)); _LOGO = strato(); _LOGO.alpha_composite(ombra(s, 0, 6, 10, 0.3)); _LOGO.alpha_composite(s)
    img.alpha_composite(_LOGO)


def wipe(nuovo, vecchio, p):
    """stacco a wipe diagonale inclinato di 5°: il nuovo entra da sinistra."""
    if p >= 1:
        return nuovo
    tg = math.tan(math.radians(5)); fronte = p * (W + H * tg)
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).polygon([(0, 0), (fronte, 0), (fronte - H * tg, H), (0, H)], fill=255)
    out = vecchio.copy(); out.paste(nuovo, (0, 0), m); return out


# ---------- montaggio ----------

def monta(n):
    C = cartella(n); tv = json.load(open(f'{C}/audio/tempi-video.json')); parole = json.load(open(f'{C}/audio/parole.json'))
    sids = sorted(tv['scene']); tot = tv['durata']
    inizi = [0.0] + [tv['scene'][s][0] - PRIMA for s in sids[1:]]; fini = inizi[1:] + [tot]
    L = f'{BASE}/montaggio/{n}'; os.makedirs(L, exist_ok=True)
    av = Avatar(f'{C}/avatar/avatar_pulito.webm')
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS),
                            '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p',
                            f'{L}/video.mp4'], stdin=subprocess.PIPE)
    nf = round(tot * FPS); k = -1; vecchio = None; hprec = AVATAR_H[SCENE[n][0][3]]
    for fr in range(nf):
        tg = fr / FPS
        while k + 1 < len(sids) and tg >= inizi[k + 1] - 1e-6:
            k += 1; fn, clip, modo, dim, lordi = SCENE[n][k]; t0, d = inizi[k], fini[k] - inizi[k]
            ctx = Ctx(sids[k], t0, tv['scene'][sids[k]][0], parole[sids[k]])
            sorg = Clip(clip, d, modo, ctx.fine_voce() - 0.2) if clip else None
            hprec = AVATAR_H[SCENE[n][k - 1][3]] if k else AVATAR_H[dim]
        t = tg - t0
        img = sorg(t) if sorg else fondo()
        fn(img, t, d, ctx)
        if lordi:
            testo(img, (M, 1770), 'Importi lordi', font(600, 28), BIANCO, alfa=0.85)
        if k and t < WIPE and vecchio is not None:
            img = wipe(img, vecchio, inout(t / WIPE))
        if fr + 1 < nf and (fr + 1) / FPS >= (inizi[k + 1] if k + 1 < len(sids) else 1e9) - 1e-6:
            vecchio = img.copy()                               # ultimo fotogramma della scena (senza avatar), per il wipe
        metti_logo(img)
        hf = hprec + (AVATAR_H[SCENE[n][k][3]] - hprec) * inout(prog(t, 0, 0.5))
        metti_avatar(img, av.prossimo(), hf)
        enc.stdin.write(img.convert('RGB').tobytes())
    enc.stdin.close(); enc.wait()
    # audio: voce + musica bassa (più su dove la voce tace), poi −16 LUFS
    A = f'{C}/audio'; fin = []
    for s in sids:
        v0 = tv['scene'][s][0]; fin += [(v0 + w['a'], v0 + w['b']) for w in parole[s]]
    gruppi = []
    for a, b in fin:
        if gruppi and a - gruppi[-1][1] < 0.6:
            gruppi[-1][1] = b
        else:
            gruppi.append([a, b])
    attiva = '+'.join(f"min(1,max(0,(t-{a - 0.3:.2f})/0.3))*min(1,max(0,({b + 0.5:.2f}-t)/0.5))" for a, b in gruppi)
    ff('-i', f'{A}/voce-video.wav', '-stream_loop', '-1', '-i', MUSICA, '-filter_complex',
       f"[1:a]atrim=0:{tot},asetpts=PTS-STARTPTS,volume=0.32,volume='1-0.72*min(1,{attiva})':eval=frame,"
       f"afade=t=in:d=0.8,afade=t=out:st={tot - 2.2:.2f}:d=2.2[m];[0:a]aresample=48000,aformat=channel_layouts=stereo[v];"
       f"[v][m]amix=inputs=2:normalize=0,atrim=0:{tot}[a]", '-map', '[a]', '-ar', '48000', '-ac', '2', f'{L}/mix.wav')
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', f'{L}/mix.wav', '-af', 'ebur128', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    gain = -16 - float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1])
    nome = f'PDRO_CCNL_FL_{n}_{NOMI[n]}_9x16'
    ff('-i', f'{L}/video.mp4', '-i', f'{L}/mix.wav', '-filter_complex', f'[1:a]volume={gain:.2f}dB,alimiter=limit=0.89:level=false[a]',
       '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-aspect', '9:16', '-movflags', '+faststart',
       f'{C}/{nome}.mp4')
    print('montato', nome, f'{tot:.1f} s', nf, 'fotogrammi', f'guadagno {gain:+.1f} dB')


def anteprima(n, quando=(0.6, 0.5, -0.4)):
    """tre fotogrammi per scena (inizio, metà, fine) in un foglio di contatto, per controllare la grafica senza montare."""
    C = cartella(n); tv = json.load(open(f'{C}/audio/tempi-video.json')); parole = json.load(open(f'{C}/audio/parole.json'))
    sids = sorted(tv['scene']); inizi = [0.0] + [tv['scene'][s][0] - PRIMA for s in sids[1:]]; fini = inizi[1:] + [tv['durata']]
    mov = f'{C}/avatar/avatar_pulito.webm'
    av = Image.frombytes('RGBA', (1, 1), b'\0' * 4) if not os.path.exists(mov) else None
    if av is None:
        a = Avatar(mov); av = a.prossimo(); a.p.kill()
    fot = []
    for k, (fn, clip, modo, dim, lordi) in enumerate(SCENE[n]):
        d = fini[k] - inizi[k]; ctx = Ctx(sids[k], inizi[k], tv['scene'][sids[k]][0], parole[sids[k]])
        sorg = Clip(clip, d, modo, ctx.fine_voce() - 0.2) if clip and os.path.exists(f'{CLIP}/{clip}.mp4') else None
        for q in quando:
            t = q * d if 0 < q < 1 else (q if q > 0 else d + q)
            img = sorg(t) if sorg else fondo(); fn(img, t, d, ctx)
            if lordi:
                testo(img, (M, 1770), 'Importi lordi', font(600, 28), BIANCO, alfa=0.85)
            metti_logo(img); metti_avatar(img, av, AVATAR_H[dim]); fot.append(img.convert('RGB').resize((270, 480)))
    o = Image.new('RGB', (270 * 6, 480 * ((len(fot) + 5) // 6)))
    for i, f in enumerate(fot):
        o.paste(f, ((i % 6) * 270, (i // 6) * 480))
    out = f'{BASE}/montaggio/anteprima_{n}.jpg'; os.makedirs(os.path.dirname(out), exist_ok=True); o.save(out, quality=88); print(out)


if __name__ == '__main__':
    if sys.argv[1] == 'anteprima':
        for n in sys.argv[2:]:
            anteprima(n)
    else:
        for n in sys.argv[1:]:
            monta(n)
