"""Montaggio dei cinque trailer «Brividi» (serie 2 di «Sentirsi per sentire», 24 novembre 2026, CISL FP Padova Rovigo).

    python3 strumenti/brividi/trailer.py T1 [9x16]      (T1..T5; senza formato, tutti quelli dello storyboard)

Scene nell'ordine di storyboard.json, con le durate della v2 (ritmo(): parlato + un respiro, clip quasi a velocità
naturale, silenzi di 1 s; la v1 seguiva i tempi dello storyboard ed era troppo lenta per Achille); quello che la regia dice e lo storyboard no sta in
REGIA qui sotto. Ogni fotogramma si compone in Python (numpy + PIL) sopra la base fatta da ffmpeg:
  - clip «rallentate al 50%»: minterpolate (flusso ottico) a velocità durata_scena/durata_clip, in cache;
    «reverse», «fermo» (ultimo fotogramma con zoom lento), «normale» (allungata appena se serve);
  - colore: la prima metà fredda e desaturata (-30% e verso il blu), la seconda calda; il passaggio è graduale nella scena
    in cui entra la musica (REGIA[...]['colore'] = valore a inizio e a fine scena, -1 freddo, +1 caldo);
  - testo Instrument Serif centrato: le frasi che fanno male a macchina da scrivere (con la voce, parola per parola, se la
    voce le dice; se no 18 caratteri al secondo), le altre in corsivo in dissolvenza dal basso;
  - bolle di chat di «Dove sei» (bianche, raggio 28, ombra morbida, dall'alto con un piccolo rimbalzo e una vibrazione);
  - il filo rosso del cartello titolo che si disegna da sinistra a destra;
  - sottotitoli piccoli e discreti in basso (Work Sans), dai tempi veri delle parole; non ripetono il testo già a schermo.
Audio: voce (voci.py), effetti e pianoforte del catalogo HeyGen (suoni.py), con la musica che si abbassa sotto la voce
(-13 dB sotto ogni frase, gli effetti -5) e i silenzi totali della regia forzati a zero. Uscita a -16 LUFS integrati, picco -1 dB.
"""
import json, os, re, subprocess, sys, unicodedata
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

QUI = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-brividi-24-novembre')
SFX = f'{D}/audio/sfx'
FONT = f'{QUI}/font'
FPS = 25
FMT = {'9x16': (1080, 1920), '16x9': (1920, 1080), '1x1': (1080, 1080)}
TR = {'T1': 'T1_LA_PORTA_20s', 'T2': 'T2_DOVE_SEI_30s', 'T3': 'T3_IL_NODO_45s', 'T4': 'T4_CHI_CURA_60s',
      'T5': 'T5_ACCENDIAMO_UNA_LUCE_75s'}
NOMI = {'T1': 'La_porta', 'T2': 'Dove_sei', 'T3': 'Il_nodo', 'T4': 'Chi_cura', 'T5': 'Accendiamo_una_luce'}
NERO, AVORIO, INCHIOSTRO, ROSSO = (10, 8, 12), (244, 237, 226), (46, 30, 50), (178, 30, 44)
# k07 del pacchetto mostrava un occhio livido («niente volti feriti»): rifatta con Higgsfield, stesso corridoio
SOSTITUTI = {'clips/k07_infermiera_notte_16x9.mp4': 'clips/k07b_infermiera_notte_16x9.mp4'}
# centro orizzontale del soggetto nelle clip 16:9, per i ritagli 9:16 e 1:1
# (una coppia = dal primo all'ultimo fotogramma della clip: k09 passa da un volto all'altro, da sinistra a destra)
CENTRO = {'k05': 0.55, 'k06': 0.45, 'k07b': 0.68, 'k08': 0.45, 'k09': (0.30, 0.66), 'k10': 0.5}

# Per scena: clip (modo), colore (inizio, fine), testo ('macchina' | 'dissolvenza'), ingresso (s di dissolvenza)
# Audio: eventi (t, effetto, volume, durata o None, offset nel file, dissolvenza in, dissolvenza out), musica come evento
# con 'rampa' (t0, t1, v0, v1) facoltativa, silenzi totali [(a, b)].
REGIA = {
    'T1': {'scene': {2: {'clip': 'normale', 'colore': (-1, -1), 'testo': 'macchina'},
                     3: {'testo': 'macchina'},
                     4: {'clip': 'normale', 'colore': (-0.6, 1), 'testo': 'dissolvenza'},
                     5: {'filo': True}},
           'audio': [(0.0, 'orologio', 0.30, 7.0, 0, 0.8, 0.03),
                     (9.0, 'p_porta', 0.85, 11.0, 0, 0.05, 1.8)],
           'silenzi': [(7.0, 9.0)]},
    'T2': {'scene': {1: {'clip': 'lento', 'colore': (-1, -1), 'bolle': True},
                     2: {'clip': 'normale', 'colore': (-1, -0.5)},
                     3: {'testo': 'macchina', 'ingresso': 0},
                     4: {'filo': True}},
           'audio': [(t, 'vibrazione', 0.55, None, 0, 0, 0) for t in (0.0, 2.0, 3.6, 5.0, 6.2, 7.2, 8.0)] +
                    [(14.5, 'p_dovesei', 0.8, 15.5, 13.0, 1.0, 2.0)],
           'silenzi': [(13.0, 14.5)]},
    'T3': {'scene': {2: {'clip': 'lento', 'colore': (-1, -0.6)},
                     4: {'clip': 'lento', 'colore': (-0.3, 1), 'testo': 'dissolvenza'},
                     5: {'filo': True}},
           'audio': [(0.0, 'uccelli', 0.10, 14.0, 0, 1.5, 0.03), (4.0, 'fruscio', 0.22, 10.0, 0, 1.0, 0.03),
                     (4.0, 'p_nodo', 0.75, 10.0, 0, 1.5, 0.03), (15.0, 'p_nodo', 0.75, 30.0, 10.0, 0.4, 3.0),
                     (15.0, 'uccelli', 0.08, 10.0, 2.0, 0.5, 2.0)],
           'silenzi': [(14.0, 15.0)], 'silenzio_prima': ('S04', 'Basta')},
    'T4': {'scene': {2: {'clip': 'lento', 'colore': (-1, -1)},
                     3: {'clip': 'reverse', 'colore': (-1.6, -1.6), 'testo': 'macchina'},
                     5: {'clip': 'lento', 'colore': (-0.4, 1), 'testo': 'dissolvenza'},
                     6: {'filo': True}},
           'audio': [(0.0, 'ronzio', 0.45, 22.0, 0, 1.0, 0.03)] +
                    [(0.6 + 1.25 * k, 'monitor', 0.07, None, 0, 0, 0) for k in range(17)] +
                    [(24.0, 'p_cura', 0.8, 30.0, 0, 1.5, 2.5)],
           'silenzi': [(22.0, 24.0)]},
    'T5': {'scene': {2: {'testo': 'macchina', 'ingresso': 0}, 3: {'testo': 'macchina', 'ingresso': 0},
                     4: {'testo': 'macchina', 'ingresso': 0},
                     5: {'clip': 'lento', 'colore': (-1, -1)},
                     6: {'clip': 'fermo', 'colore': (-1, -0.6), 'testo': 'dissolvenza', 'ingresso': 0},
                     8: {'clip': 'lento', 'colore': (-0.6, 0.8)},
                     9: {'clip': 'lento', 'colore': (1, 1), 'testo': 'dissolvenza'},
                     10: {'filo': True}},
           'audio': [(0.0, 'battito', 0.75, 6.0, 0, 0.5, 0.4), (6.1, 'respiro', 0.9, None, 0, 0.05, 0.1),
                     (18.0, 'battito', 0.18, 18.0, 0, 1.5, 1.5),
                     (38.15, 'fiammifero', 0.9, None, 0, 0, 0.2),
                     (38.4, 'p_luce', 0.9, 36.6, 10.0, 2.0, 9.0, (38.4, 54.0, 0.2, 1.0))],
           'silenzi': [(36.0, 38.0)]},
}
BOLLE_T = [0.0, 2.0, 3.6, 5.0, 6.2, 7.2, 8.0]

# v2 (28/10, Achille: «clip molto lente e troppe pause lunghe»): le scene non durano più quanto nello storyboard ma quanto
# serve: parlato + un respiro; le clip girano a velocità naturale (al massimo rallentate quanto basta per coprire la voce);
# i neri di silenzio totale scendono a SILENZIO s. Gli eventi audio e i silenzi della REGIA restano scritti sui tempi dello
# storyboard e si spostano in proporzione dentro la loro scena (ritmo()).
SILENZIO = 1.0
MAX_LENTO = 1.3
CARTELLI = {'titolo': 2.8, 'info': 4.0, 'prenota': 3.5, 'firma': 3.0}
DURATE = {('T1', 3): 2.4, ('T2', 1): 7.0, ('T2', 2): 3.5, ('T5', 1): 3.0, ('T1', 1): 1.5, ('T4', 1): 1.5}


def ritmo(T, scene, parole, R):
    """Durate nuove delle scene (riscrive inizio_s e fine_s) e la funzione che porta un tempo vecchio in quello nuovo."""
    vecchie, t = [], 0.0
    for s in scene:
        sid = f"S{s['n']:02d}"; a = s['asset'][0]; cfg = R['scene'].get(s['n'], {})
        voce = parole[sid][-1]['b'] + 0.25 if sid in parole else 0
        testo = len(s['testo_a_schermo']) / 18 + 0.35 if s['testo_a_schermo'] and cfg.get('testo') == 'macchina' else 0
        if (T, s['n']) in DURATE:
            d = DURATE[(T, s['n'])]
        elif 'clips/' in a:
            d = max(voce + 0.5, testo + 1.0, 4.0 if cfg.get('clip') != 'fermo' else 3.0)
        elif 'nero' in a:
            d = max(voce + 0.45, testo + 0.7) if (voce or testo) else SILENZIO
        else:
            d = max(next(v for k, v in CARTELLI.items() if k in a), voce + 0.5)
        vecchie.append((s['inizio_s'], s['fine_s'])); s['inizio_s'] = round(t, 2); t += d; s['fine_s'] = round(t, 2)

    def rim(x):
        for (a, b), s in zip(vecchie, scene):
            if x <= b + 1e-6:
                return s['inizio_s'] + (min(max(x, a), b) - a) * (s['fine_s'] - s['inizio_s']) / (b - a)
        return scene[-1]['fine_s']
    return round(t, 2), rim


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def norm(s):
    return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode())


def font(nome, px, peso=None):
    f = ImageFont.truetype(f'{FONT}/{nome}', px)
    if peso:
        f.set_variation_by_axes([peso])
    return f


# ---------- clip ----------

def prepara(clip, modo, d, cache):
    """Clip alla velocità della scena, in cache (alla risoluzione d'origine)."""
    clip = SOSTITUTI.get(clip, clip)
    src = f'{D}/{clip}'; base = os.path.splitext(os.path.basename(clip))[0]
    if modo == 'fermo':
        out = f'{cache}/{base}_ultimo.png'
        if not os.path.exists(out):
            ff('-sseof', '-0.1', '-i', src, '-frames:v', '1', '-update', '1', out)
        return out
    f = min(d / durata(src), MAX_LENTO)       # oltre, la clip si ferma sull'ultimo fotogramma (fotogrammi(): tpad)
    if modo in ('normale', 'lento') and f < 1.06:     # più corta della clip: si taglia, non si accelera
        return src
    out = f'{cache}/{base}_{modo}_{f:.3f}.mp4'
    if not os.path.exists(out):
        pre = 'reverse,' if modo == 'reverse' else ''
        ff('-i', src, '-vf', f"{pre}minterpolate=fps={24 * f:.4f}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,"
           f"setpts={f:.4f}*PTS,fps={FPS}", '-an', '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', out)
    return out


def fotogrammi(src, W, H, n, cx=0.5, zoom=None):
    """n fotogrammi RGB W×H (copertura, ritaglio centrato su cx); da immagine con zoom lento facoltativo."""
    img = src.endswith('.png')
    if img and zoom:
        cx = cx[1] if isinstance(cx, tuple) else cx
        vf = (f"scale={W * 2}:{H * 2}:force_original_aspect_ratio=increase,crop={W * 2}:{H * 2}:(iw-{W * 2})*{cx}:(ih-{H * 2})/2,"
              f"zoompan=z='1+{zoom}*on/{n}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s={W}x{H}:fps={FPS}")
    else:
        x = f"(iw-{W})*({cx[0]}+({cx[1] - cx[0]})*min(1,n/{max(1, n - 1)}))" if isinstance(cx, tuple) else f"(iw-{W})*{cx}"
        vf = f"scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,fps={FPS},crop={W}:{H}:'{x}':(ih-{H})/2"
    ins = ['-loop', '1', '-i', src] if img else ['-i', src]
    p = subprocess.Popen(['ffmpeg', '-v', 'error', *ins, '-vf', vf + ',tpad=stop_mode=clone:stop=-1,format=rgb24',
                          '-frames:v', str(n), '-f', 'rawvideo', '-'], stdout=subprocess.PIPE)
    ultimo = None
    for _ in range(n):
        b = p.stdout.read(W * H * 3)
        if len(b) < W * H * 3:
            yield ultimo; continue
        ultimo = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        yield ultimo
    p.stdout.close(); p.wait()


def colore(f, g):
    """g < 0 freddo e desaturato (g=-1: -30% saturazione, verso il blu), g > 0 caldo e un po' più luminoso."""
    x = f.astype(np.float32)
    grigio = x.mean(2, keepdims=True)
    if g < 0:
        s = 1 - 0.3 * min(-g, 1) - (0.35 if g < -1 else 0)
        x = grigio + (x - grigio) * s
        x += np.array([-10, -2, 12], np.float32) * min(-g, 1)
    else:
        x = grigio + (x - grigio) * (1 + 0.06 * g)
        x = x * (1 + 0.04 * g) + np.array([10, 4, -8], np.float32) * g
    return np.clip(x, 0, 255).astype(np.uint8)


# ---------- testo ----------

class Testo:
    """Blocco di testo centrato, con le posizioni dei caratteri fisse: si può mostrare fino al carattere k."""

    def __init__(self, testo, W, H, px, cy, colore_t, nome='InstrumentSerif-Regular.ttf', larg=0.82, ombra=True, peso=None):
        self.f = font(nome, px, peso); self.W, self.H = W, H; self.col = colore_t; self.ombra = ombra
        righe, cur = [], ''
        for p in testo.split():
            prova = (cur + ' ' + p).strip()
            if cur and self.f.getlength(prova) > W * larg:
                righe.append(cur); cur = p
            else:
                cur = prova
        righe.append(cur)
        self.righe = righe; asc, disc = self.f.getmetrics(); self.lh = int((asc + disc) * 1.08)
        self.y0 = int(cy - self.lh * len(righe) / 2); self.n = sum(len(r) for r in righe) + len(righe) - 1
        self.cache = {}

    def strato(self, k=None):
        k = self.n if k is None else max(0, min(k, self.n))
        if k in self.cache:
            return self.cache[k]
        im = Image.new('RGBA', (self.W, self.H), (0, 0, 0, 0)); dr = ImageDraw.Draw(im)
        resto = k
        for i, r in enumerate(self.righe):
            x = (self.W - self.f.getlength(r)) / 2; y = self.y0 + i * self.lh
            vis = r[:max(0, resto)]; resto -= len(r) + 1
            if vis:
                dr.text((x, y), vis, font=self.f, fill=self.col + (255,))
        if self.ombra:
            a = im.split()[3].filter(ImageFilter.GaussianBlur(self.f.size * 0.12))
            om = Image.new('RGBA', im.size, (0, 0, 0, 0)); om.putalpha(a.point(lambda v: int(v * 0.75)))
            om.alpha_composite(im); im = om
        arr = np.array(im)
        self.cache[k] = arr
        return arr


def sopra(f, strato, alfa=1.0, dy=0):
    if dy:
        strato = np.roll(strato, int(dy), axis=0)
    a = strato[..., 3:4].astype(np.float32) / 255 * alfa
    return (f.astype(np.float32) * (1 - a) + strato[..., :3].astype(np.float32) * a).astype(np.uint8)


def bolle(W, H):
    """Le sette bolle di chat (bianche, raggio 28, ombra morbida; l'ultima rossa), ognuna con il suo strato e la sua y."""
    msg = json.load(open(f'{D}/{TR["T2"]}/storyboard.json'))['bolle_messaggio']
    f = font('WorkSans[wght].ttf', 44, 500); pad_x, pad_y, gap = 36, 24, 22
    y = int(H * 0.50); out = []
    for i, m in enumerate(msg):
        ultimo = i == len(msg) - 1
        w = int(f.getlength(m)) + 2 * pad_x; h = 44 + 2 * pad_y + 8
        im = Image.new('RGBA', (w + 80, h + 80), (0, 0, 0, 0)); dr = ImageDraw.Draw(im)
        dr.rounded_rectangle((40, 48, 40 + w, 48 + h), 28, fill=(0, 0, 0, 120))
        im = im.filter(ImageFilter.GaussianBlur(12)); dr = ImageDraw.Draw(im)
        dr.rounded_rectangle((40, 40, 40 + w, 40 + h), 28, fill=ROSSO + (255,) if ultimo else (255, 255, 255, 240))
        dr.text((40 + pad_x, 40 + pad_y - 4), m, font=f, fill=(255, 255, 255, 255) if ultimo else INCHIOSTRO + (255,))
        out.append((np.array(im), 70 - 40, y - 40)); y += h + gap
    return out


def filo(card):
    """Maschera del filo rosso del cartello: pixel vicini alla sua linea centrale (stimata colonna per colonna)."""
    a = card.astype(int); H, W, _ = a.shape
    rosso = (abs(a[..., 0] - 178) < 50) & (a[..., 1] < 90) & (a[..., 2] < 100)
    lontano = np.abs(a - np.array(AVORIO)).sum(2) > 30
    cand = [y for y in range(H) if rosso[y].sum() > W * 0.08]
    # banda del filo: la riga con più rosso «sottile», ±40 px
    y_mid = max(cand, key=lambda y: rosso[y].sum()) if cand else H // 2
    yc = np.full(W, np.nan)
    for x in range(W):
        ys = np.where(rosso[max(0, y_mid - 40):y_mid + 40, x])[0]
        if 0 < len(ys) <= 7:
            yc[x] = ys.mean() + max(0, y_mid - 40)
    ok = ~np.isnan(yc); yc = np.interp(np.arange(W), np.where(ok)[0], yc[ok])
    yy = np.arange(H)[:, None]
    return lontano & (np.abs(yy - yc[None, :]) <= 4.5)


# ---------- montaggio ----------

def frasi(parole, maxc):
    out, cur = [], []
    for w in parole:
        cur.append(w); t = ' '.join(x['w'] for x in cur)
        if re.search(r'[.?!]$', w['w']) or (w['w'].endswith(',') and len(t) > maxc) or len(t) > 2 * maxc - 4:
            out.append(cur); cur = []
    if cur:
        out.append(cur)
    return out


def righe2(t, maxc):
    if len(t) <= maxc:
        return [t]
    p = t.split(); k = min(range(1, len(p)), key=lambda k: abs(len(' '.join(p[:k])) - len(t) / 2))
    return [' '.join(p[:k]), ' '.join(p[k:])]


def tc(t):
    return f'{int(t // 3600):02d}:{int(t // 60 % 60):02d}:{int(t % 60):02d},{round(t % 1 * 1000) % 1000:03d}'


def monta(T, fmt):
    cart = TR[T]; sb = json.load(open(f'{D}/{cart}/storyboard.json')); R = REGIA[T]
    W, H = FMT[fmt]; L = f'{D}/montaggio/{T}_{fmt}'; cache = f'{D}/montaggio/cache'
    os.makedirs(L, exist_ok=True); os.makedirs(cache, exist_ok=True)
    A = f'{D}/{cart}/audio'
    parole = json.load(open(f'{A}/parole.json')); vdur = {x['id']: x['durata'] for x in json.load(open(f'{A}/tempi-scene.json'))}
    tot, rim = ritmo(T, sb['scene'], parole, R)
    silenzi = [(rim(a), rim(b)) for a, b in R['silenzi']]
    bolle_t = [rim(x) for x in BOLLE_T]
    scala = W / 1920 if fmt == '16x9' else W / 1080
    ver = fmt == '9x16'
    px_testo = int(96 * scala) if fmt == '16x9' else (80 if ver else 74)
    px_sub = 40 if fmt == '16x9' else (46 if ver else 38)
    y_testo_clip = H * (0.64 if ver else 0.70); y_sub = H * (0.80 if ver else 0.915)
    maxc = 44 if fmt == '16x9' else (30 if ver else 34)

    # voce: dove parte ogni blocco (un soffio dopo l'inizio della scena, prima se non ci sta)
    voci, sub, scene = [], [], sb['scene']
    for s in scene:
        sid = f"S{s['n']:02d}"
        if sid not in parole:
            continue
        d = s['fine_s'] - s['inizio_s']; fine_parlato = parole[sid][-1]['b']
        lead = min(0.3, max(0.05, d - fine_parlato - 0.15))
        t0 = s['inizio_s'] + lead; voci.append((sid, t0)); s['_t0'] = t0
        a_schermo = norm(s['testo_a_schermo'])
        for c in frasi(parole[sid], maxc):
            testo = ' '.join(w['w'] for w in c).replace('ventiquattro', '24')
            if a_schermo and norm(testo) and (norm(testo) in a_schermo or a_schermo in norm(testo)):
                continue
            sub.append((t0 + c[0]['a'] - 0.05, min(t0 + c[-1]['b'] + 0.35, s['fine_s']), testo, s))
    if 'silenzio_prima' in R:                     # silenzio totale nella pausa della voce prima di quella parola
        sid, w = R['silenzio_prima']; t0 = dict(voci)[sid]; pw = parole[sid]
        i = next(i for i, x in enumerate(pw) if x['w'].startswith(w))
        silenzi.append((t0 + pw[i - 1]['b'] + 0.12, t0 + pw[i]['a'] - 0.06))
    for i in range(len(sub) - 1):
        if sub[i][1] > sub[i + 1][0] - 0.05:
            sub[i] = (sub[i][0], sub[i + 1][0] - 0.05) + sub[i][2:]
    open(f'{D}/{cart}/sottotitoli_{fmt}.srt', 'w').write(
        ''.join(f"{k}\n{tc(a)} --> {tc(b)}\n{chr(10).join(righe2(x, maxc))}\n\n" for k, (a, b, x, _) in enumerate(sub, 1)))
    strati_sub = []
    for a, b, x, s in sub:
        su_avorio = 'S2_0' in s['asset'][0] and 'nero' not in s['asset'][0]
        col = INCHIOSTRO if su_avorio else (255, 255, 255)
        t = Testo('\n'.join(righe2(x, maxc)), W, H, px_sub, 0, col, 'WorkSans[wght].ttf', 0.98, not su_avorio, 450)
        t.righe = righe2(x, maxc); t.y0 = int(y_sub - t.lh * len(t.righe)); t.n = sum(len(r) for r in t.righe) + 1
        strati_sub.append((a, b, t.strato()))

    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS),
                            '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p',
                            f'{L}/video.mp4'], stdin=subprocess.PIPE)
    sfuma = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
    sfuma = np.clip((sfuma - 0.55) / 0.45, 0, 1) ** 1.5 * 0.55
    prec = np.zeros((H, W, 3), np.uint8); prec[:] = NERO; fr = 0; bb = bolle(W, H) if T == 'T2' else None
    for s in scene:
        cfg = R['scene'].get(s['n'], {})
        a0, a1 = s['inizio_s'], s['fine_s']; n = round(a1 * FPS) - round(a0 * FPS); d = a1 - a0
        asset = s['asset'][0]; mask = None
        if 'clips/' in asset:
            modo = cfg.get('clip', 'normale'); src = prepara(asset, modo, d, cache)
            k = os.path.basename(SOSTITUTI.get(asset, asset)).split('_')[0]
            gen = fotogrammi(src, W, H, n, CENTRO.get(k, 0.5) if not asset.endswith('9x16.mp4') else 0.5,
                             zoom=0.08 if modo == 'fermo' else None)
            tipo = 'clip'
        else:
            card = asset.replace('16x9', fmt).replace('9x16', fmt)
            img = np.array(Image.open(f'{D}/{card}').convert('RGB').resize((W, H), Image.LANCZOS))
            tipo = 'nero' if 'nero' in card else 'card'
            mask = filo(img) if cfg.get('filo') else None
            gen = (img for _ in range(n))
        # testo a schermo
        txt = None
        if s['testo_a_schermo']:
            corsivo = cfg.get('testo') == 'dissolvenza'
            txt = Testo(s['testo_a_schermo'], W, H, int(px_testo * (1.05 if corsivo else 1)),
                        H / 2 if tipo == 'nero' else y_testo_clip, (255, 255, 255) if tipo != 'card' else INCHIOSTRO,
                        'InstrumentSerif-Italic.ttf' if corsivo else 'InstrumentSerif-Regular.ttf')
            # tempi dei caratteri: dalla voce, se la voce dice queste parole; se no 18 al secondo
            pt = norm(s['testo_a_schermo']); sid = f"S{s['n']:02d}"; tempi_car = None
            if sid in parole:
                pw = parole[sid]; tw = s['testo_a_schermo'].split()
                for i in range(len(pw) - len(tw) + 1):
                    if [norm(x['w']) for x in pw[i:i + len(tw)]] == [norm(x) for x in tw]:
                        tempi_car = []
                        for w, v in zip(tw, pw[i:i + len(tw)]):
                            for c in range(len(w)):
                                tempi_car.append(s['_t0'] + v['a'] + (v['b'] - v['a']) * 0.7 * c / max(1, len(w)) - a0)
                            tempi_car.append(s['_t0'] + v['b'] - a0)
                        break
            if tempi_car is None:
                t_in = 0.5 if tipo != 'nero' else 0.35
                tempi_car = [t_in + c / 18 for c in range(len(s['testo_a_schermo']) + 1)]
            del pt
        ingresso = cfg.get('ingresso', 0 if tipo == 'nero' else 0.5)
        g0, g1 = cfg.get('colore', (0, 0))
        for j, f in enumerate(gen):
            t = j / FPS; ta = a0 + t; u = j / max(1, n - 1)
            if tipo == 'clip':
                f = colore(f, g0 + (g1 - g0) * u)
                f = (f.astype(np.float32) * (1 - sfuma)).astype(np.uint8)
            if mask is not None and tipo == 'card':
                p = min(1, max(0, (t - 0.25) / 1.4)); p = p * p * (3 - 2 * p); xs = int(W * p)
                f = f.copy(); m = mask.copy(); m[:, :xs] = False; f[m] = AVORIO
            if bb is not None and s['n'] == 1:
                for i, (st, bx, by) in enumerate(bb):
                    tb = t - bolle_t[i]
                    if tb < 0:
                        continue
                    e = min(1, tb / 0.28); salto = (1 - e) * -90 + (np.sin(min(1, tb / 0.45) * np.pi) * 10 if tb < 0.45 else 0)
                    vib = np.sin(tb * 90) * 5 * max(0, 1 - tb / 0.35)
                    h, w = st.shape[:2]; y = int(by + salto); x = int(bx + vib)
                    if 0 <= y and y + h <= H:
                        reg = f[y:y + h, x:x + w]
                        f = f.copy(); f[y:y + h, x:x + w] = sopra(reg, st, min(1, tb / 0.2))
            if txt is not None:
                if cfg.get('testo') == 'dissolvenza':
                    t_in = tempi_car[0] - 0.25
                    al = min(1, max(0, (t - t_in) / 0.9)); al = al * al * (3 - 2 * al)
                    if al > 0:
                        f = sopra(f, txt.strato(), al, (1 - al) * 26)
                else:
                    k = sum(1 for x in tempi_car if x <= t)
                    if k:
                        f = sopra(f, txt.strato(k))
            for sa, sb_, st in strati_sub:
                if sa <= ta < sb_:
                    al = min(1, (ta - sa) / 0.15, (sb_ - ta) / 0.15)
                    f = sopra(f, st, al)
            if t < ingresso:
                al = t / ingresso
                f = (prec.astype(np.float32) * (1 - al) + f.astype(np.float32) * al).astype(np.uint8)
            enc.stdin.write(np.ascontiguousarray(f).tobytes()); fr += 1
            ultimo = f
        prec = ultimo
    enc.stdin.close(); enc.wait()

    # ---------- audio ----------
    ins, fil, k = [], [], 0
    for sid, t0 in voci:
        ins += ['-i', f'{A}/wav/{sid}.wav']
        fil.append(f"[{k}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={round(t0 * 1000)}:all=1[v{k}]"); k += 1
    nv = k
    fil.append(''.join(f'[v{i}]' for i in range(nv)) + f"amix=inputs={nv}:normalize=0,apad=whole_dur={tot},asplit=2[voce][chiave]")
    eff, mus = [], []
    for ev in R['audio']:
        t, nome, vol, dmax, off, fin, fout = ev[:7]
        if dmax is not None:
            dmax = rim(t + dmax) - rim(t)
        t = rim(t)
        src = f'{SFX}/{nome}.wav'; ds = durata(src)
        loop = dmax is not None and dmax > ds - off
        ins += (['-stream_loop', '-1'] if loop else []) + ['-i', src]
        dd = dmax if dmax is not None else ds - off
        ch = f"[{k}:a]atrim={off}:{off + dd},asetpts=PTS-STARTPTS,volume={vol}"
        if fin:
            ch += f",afade=t=in:d={fin}"
        if fout:
            ch += f",afade=t=out:st={max(0, dd - fout):.3f}:d={fout}"
        ch += f",adelay={round(t * 1000)}:all=1"
        if len(ev) > 7:
            r0, r1, v0, v1 = ev[7]; r0, r1 = rim(r0), rim(r1)
            ch += f",volume='{v0}+({v1}-{v0})*min(1,max(0,(t-{r0})/({r1}-{r0})))':eval=frame"
        lab = f'e{k}'; fil.append(ch + f'[{lab}]')
        (mus if nome.startswith('p_') else eff).append(lab); k += 1
    # sotto la voce la musica scende di 13 dB e gli effetti di 5 (rampe di 0,3 s prima e 0,4 s dopo ogni frase)
    fin = [(t0 + c[0]['a'], t0 + c[-1]['b']) for sid, t0 in voci for c in frasi(parole[sid], 999)]
    attiva = '+'.join(f"min(1,max(0,(t-{a - 0.3:.2f})/0.3))*min(1,max(0,({b + 0.4:.2f}-t)/0.4))" for a, b in fin) or '0'
    fil.append('[chiave]anullsink')
    if mus:
        fil.append(''.join(f'[{x}]' for x in mus) + f"amix=inputs={len(mus)}:normalize=0,apad=whole_dur={tot},"
                   f"volume='1-0.78*min(1,{attiva})':eval=frame[mus]")
    if eff:
        fil.append(''.join(f'[{x}]' for x in eff) + f"amix=inputs={len(eff)}:normalize=0,apad=whole_dur={tot},"
                   f"volume='1-0.45*min(1,{attiva})':eval=frame[eff]")
    fondo = (['[eff]'] if eff else []) + (['[mus]'] if mus else [])
    zero = '*'.join(f"(min(1,max(0,({a}-t)/0.03))+min(1,max(0,(t-{b})/0.03)))" for a, b in silenzi) or '1'
    fil.append('[voce]' + ''.join(fondo) + f"amix=inputs={1 + len(fondo)}:normalize=0,atrim=0:{tot},"
               f"volume='{zero}':eval=frame[au]")
    ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[au]', '-ar', '48000', '-ac', '2', f'{L}/mix.wav')
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', f'{L}/mix.wav', '-af', 'ebur128', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    li = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1]); gain = -16 - li
    nome = f"PDRO_Brividi_{T}_{NOMI[T]}_{fmt}"
    ff('-i', f'{L}/video.mp4', '-i', f'{L}/mix.wav', '-filter_complex',
       f"[1:a]volume={gain:.2f}dB,alimiter=limit=0.89:level=false,volume='{zero}':eval=frame[a]",
       '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', str(tot),
       '-movflags', '+faststart', f'{D}/{cart}/{nome}.mp4')
    print('montato', nome, f'{tot} s', fr, 'fotogrammi', len(sub), 'sottotitoli', f'guadagno {gain:+.1f} dB')


if __name__ == '__main__':
    T = sys.argv[1]
    fmts = sys.argv[2:] or [x.replace(':', 'x') for x in json.load(open(f'{D}/{TR[T]}/storyboard.json'))['formati']]
    for fm in fmts:
        monta(T, fm)
