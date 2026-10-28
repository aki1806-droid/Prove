"""Montaggio di «Il filo che ci unisce» (AV1, 9:16 1080x1920, 25 fps, CISL FP Padova Rovigo, provinciale) e della versione
16:9 (il 9:16 al centro su una copia sfocata di sé).

    python3 strumenti/filo/monta.py

Scene del pacchetto (storyboard.json, NOTE_DI_REGIA.md) con le durate fatte sul parlato, come Achille ha chiesto per i
trailer «Brividi» (niente clip molto lente né pause lunghe): ogni scena dura quanto la sua voce più un respiro; clip
rallentate al massimo ×1,3, poi ferme sull'ultimo fotogramma; immagini con Ken Burns 100→108%.
Scene in camera (S02, S04, S08): Achille scontornato in basso a destra con l'alone, come nei reel PDRO (scelta di
Achille), sopra un fondo: S02 le mani al telaio, S04 la clip dell'ascolto, S08 il fondo prugna sfocato della regia, con
l'avatar che si avvicina piano (100→112%). Il sottopancia e il badge 1522 del pacchetto stavano dove sta l'avatar: alzati (sopra i sottotitoli).
Colore: S01-S03 freddo e desaturato, in S04 si scalda sulla parola «ascolto», poi caldo.
Grafiche del pacchetto (PNG a tutto schermo con trasparenza) in dissolvenza dal basso di 12 px in 0,6 s, uscita 0,4 s;
filo rosso animato (A01, webm con alfa) in S06 su «Insieme» e sul cartello del titolo. Sottotitoli sempre (regia):
piccoli, avorio su un riquadro scuro leggero, sopra la fascia bassa; non ripetono le frasi già a schermo.
Suono (suoni.py): battito in S01, piano intimo in S02-S03 che si ferma sulle notifiche, 1 s di silenzio totale all'inizio
di S04, poi il piano con il violoncello fino all'accordo finale; vibrazioni, fruscio del filo, fiammifero, pane, uccelli.
Musica −14 dB sotto la voce e quasi a zero sotto S08. Uscita −16 LUFS.
"""
import json, os, re, subprocess, sys
import numpy as np
from PIL import Image, ImageFilter

QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(QUI), 'brividi'))
from trailer import sopra, colore, frasi, righe2, tc, norm, durata, ff, font  # noqa: E402

D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-av1-il-filo-che-ci-unisce')
A, SFX, OV = f'{D}/audio', f'{D}/audio/sfx', f'{D}/grafiche/overlay_trasparenti'
W, H, FPS = 1080, 1920, 25
NOME = 'PDRO_Il_filo_che_ci_unisce'
MAX_LENTO, AV_H, PRUGNA, AVORIO = 1.3, 640, (38, 24, 42), (244, 237, 226)
Y_SUB = 1250                         # base dei sottotitoli: sopra l'avatar e sopra la fascia dei nomi delle relatrici
Y_SUB_CARTELLI = 1560                # sui cartelli finali sotto il testo del cartello

# scena: (id, durata fissa o None = voce + respiro, ritardo della voce, [pezzi di immagine], [grafiche], colore (inizio, fine))
# pezzo: (sorgente, dalla parola | secondi); grafica: (file, da, a, spostamento y); da/a: secondi o «parola» o «parola+0.3»
SCENE = [
    ('S01', 4.0, 0, [('clips/q01_sedia_vuota_9x16.mp4', 0)], [('K01_frase.png', 1.5, None, 0)], (-1, -1)),
    ('S02', None, 0.3, [('avatar', 0, 'immagini/n_telaio_mani.jpg')], [('L01_sottopancia_Achille.png', 1.0, 6.0, -560)], (-1, -1)),
    ('S03', None, 0.2, [('clips/k07b_infermiera_notte_16x9.mp4', 0), ('clips/k03_notifiche_9x16.mp4', 'A')],
     [('K02_frase.png', 'dove', None, 0)], (-1, -1)),
    ('S04', None, 1.0, [('avatar', 0, 'clips/c02_ascolto_orecchio_9x16.mp4')], [], (-0.8, 0.8)),
    ('S05', None, 0.2, [('immagini/g09_lo_specchio.jpg', 0), ('immagini/g12_la_voce.jpg', 'Daniela'),
                        ('immagini/g03_le_parole_che_feriscono.jpg', 'Sara'), ('immagini/g11_le_altre.jpg', 'Luisa')],
     [('R01_Paccagnella.png', 'Elena', 'Daniela-0.1', 0), ('R02_Lucangeli.png', 'Daniela', 'Sara-0.1', 0),
      ('R03_Cordella.png', 'Sara', 'Luisa-0.1', 0), ('R04_Morbiato.png', 'Luisa', None, 0)], (1, 1)),
    ('S06', None, 0.2, [('clips/v03_telaio_mani_9x16.mp4', 0), ('clips/k10_candele_16x9.mp4', 'Perché')],
     [('K04_frase.png', 'ogni', 'Insieme-0.15', 0), ('K05_frase.png', 'Insieme', None, 0), ('A01', 'Insieme', None, 0)], (1, 1)),
    ('S07', None, 0.2, [('clips/v01_nonna_filo_9x16.mp4', 0), ('clips/c05_tavola_condivisa_16x9.mp4', 'tavola-0.3')], [], (1, 1)),
    ('S08', None, 0.3, [('avatar', 0, 'prugna')], [('K03_frase.png', 'Non', 'Lun-0.2', 0), ('B01_1522.png', "Lun", None, -480)], (1, 1)),
    ('S09', None, 0.2, [('clips/v02_alba_finestra_9x16.mp4', 0)], [], (1, 1)),
    ('S10', 3.4, 0.3, [('grafiche/cartelli/C01_titolo.png', 0)], [('A01', 0.3, None, 0)], (0, 0)),
    ('S11a', 2.6, 0, [('grafiche/cartelli/C02_data_luogo.png', 0)], [], (0, 0)),
    ('S11b', 3.6, 0, [('grafiche/cartelli/C03_prenota_QR.png', 0)], [], (0, 0)),
    ('S12', 3.2, 0, [('grafiche/cartelli/C04_firma_1522.png', 0)], [], (0, 0)),
]
CENTRO = {'k07b': 0.68, 'k10': 0.55, 'c05': 0.45}
# suono: (scena, da, effetto, volume, durata o None, offset, dissolvenza in, out); musica con il nome p_*
SUONI = [('S01', 0.0, 'battito', 0.7, 4.0, 0, 0.3, 0.6),
         ('S03', 'A', 'vibrazione', 0.5, None, 0, 0, 0), ('S03', 'dove', 'vibrazione', 0.5, None, 0, 0, 0),
         ('S03', 'chi', 'vibrazione', 0.55, None, 0, 0, 0), ('S03', 'sei.…+0.25', 'vibrazione', 0.6, None, 0, 0, 0),
         ('S03', 'piano', 'vibrazione', 0.6, None, 0, 0, 0), ('S03', 'piano#2', 'vibrazione', 0.6, None, 0, 0, 0),
         ('S06', 0.3, 'fruscio', 0.2, 3.6, 0, 0.6, 0.6), ('S06', 'Perché-0.1', 'fiammifero', 0.75, None, 0, 0, 0.2),
         ('S07', 'spezzare+0.2', 'pane', 0.55, None, 0, 0, 0.1),
         ('S09', 0.0, 'uccelli', 0.14, 6.0, 0, 1.0, 1.0)]
# musica: intima fino a «A volte» di S03 (poi il piano si ferma); dopo il secondo di silenzio di S04, da 10 s della traccia
MUSICA = [('S02', 0.0, 'S03', 'A', 1.5, 0.8, 2.5), ('S04', 1.0, None, None, 10.0, 0.6, 3.5)]
SILENZI = [('S04', 0.0, 1.0)]
SOTTO_S08 = 0.06                     # la musica sotto «non sei sola» (regia: quasi a zero)


def strato_sub(x, y_base):
    """Sottotitolo piccolo avorio (Work Sans 40) su un riquadro scuro semitrasparente: si legge anche sulle tele chiare."""
    from PIL import ImageDraw
    f = font('WorkSans[wght].ttf', 40, 500); rr = righe2(x, 30); asc, disc = f.getmetrics(); lh = int((asc + disc) * 1.12)
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dr = ImageDraw.Draw(im); y0 = y_base - lh * len(rr)
    larg = max(f.getlength(r) for r in rr)
    dr.rounded_rectangle(((W - larg) / 2 - 22, y0 - 12, (W + larg) / 2 + 22, y_base + 8), 18, fill=(12, 8, 14, 150))
    for i, r in enumerate(rr):
        dr.text(((W - f.getlength(r)) / 2, y0 + i * lh), r, font=f, fill=AVORIO + (255,))
    return np.array(im)


def ancora(v, parole, t0):
    """Secondi dall'inizio della scena: numero, «parola», «parola#2», «parola+0.3», «parola-0.1» (prefisso della parola)."""
    if isinstance(v, (int, float)):
        return float(v)
    m = re.match(r"(.+?)(?:#(\d+))?([+-][\d.]+)?$", v); w, k, dt = m.group(1), int(m.group(2) or 1), float(m.group(3) or 0)
    trovate = [x for x in parole if x['w'].startswith(w) or norm(x['w']).startswith(norm(w))]
    return t0 + trovate[k - 1]['a'] + dt


def lenta(src, d, cache):
    """Clip alla durata d: tagliata se più lunga, rallentata (flusso ottico) al massimo ×1,3, poi ferma."""
    f = d / durata(src)
    if f < 1.06:
        return src
    f = min(f, MAX_LENTO); out = f'{cache}/{os.path.basename(src)[:-4]}_{f:.3f}.mp4'
    if not os.path.exists(out):
        ff('-i', src, '-vf', f"minterpolate=fps={24 * f:.4f}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,setpts={f:.4f}*PTS,"
           f"fps={FPS}", '-an', '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', out)
    return out


def leggi(cmd, w, h, n, ch=3):
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE); ultimo = None
    for _ in range(n):
        b = p.stdout.read(w * h * ch)
        if len(b) == w * h * ch:
            ultimo = np.frombuffer(b, np.uint8).reshape(h, w, ch)
        yield ultimo
    p.stdout.close(); p.wait()


def fondo(src, n, cache, cx=0.5, kb=True):
    """n fotogrammi RGB 1080x1920 da clip o immagine (Ken Burns 100→108%)."""
    if src == 'prugna':
        f = np.zeros((H, W, 3), np.float32); yy, xx = np.mgrid[0:H, 0:W]
        luce = np.exp(-(((xx - W * 0.25) / (W * 0.7)) ** 2 + ((yy - H * 0.35) / (H * 0.5)) ** 2))
        f[:] = PRUGNA; f += luce[..., None] * np.array([46, 28, 22]); f = np.clip(f, 0, 255).astype(np.uint8)
        for _ in range(n):
            yield f
        return
    if src.endswith(('.jpg', '.png')):
        vf = (f"scale={W * 2}:{H * 2}:force_original_aspect_ratio=increase,crop={W * 2}:{H * 2},"
              f"zoompan=z='1+{0.08 if kb else 0}*on/{n}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s={W}x{H}:fps={FPS}")
        cmd = ['ffmpeg', '-v', 'error', '-loop', '1', '-i', src]
    else:
        vf = (f"scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{H}:(iw-{W})*{cx}:(ih-{H})/2,fps={FPS},"
              f"tpad=stop_mode=clone:stop=-1")
        cmd = ['ffmpeg', '-v', 'error', '-i', src]
    yield from leggi(cmd + ['-vf', vf + ',format=rgb24', '-frames:v', str(n), '-f', 'rawvideo', '-'], W, H, n)


def riquadro_avatar():
    """Rettangolo che contiene Achille in tutto il webm (alfa), per ritagliarlo prima di scalarlo."""
    w, h = map(int, subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=width,height',
                                    '-of', 'csv=p=0', f'{D}/avatar/avatar.webm'], capture_output=True, text=True).stdout.split(',')[:2])
    x0, x1, y0 = w, 0, h
    for fr in leggi(['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar.webm', '-vf', 'fps=1,format=rgba',
                     '-f', 'rawvideo', '-'], w, h, 40, 4):
        if fr is None:
            break
        ys, xs = np.where(fr[..., 3] > 40)
        if len(xs):
            x0, x1, y0 = min(x0, xs.min()), max(x1, xs.max()), min(y0, ys.min())
    x0, x1, y0 = max(0, x0 - 20), min(w, x1 + 20), max(0, y0 - 20)
    return w, h, int(x0), int(x1), int(y0)


def avatar(sid, n, lead, rq):
    """Fotogrammi RGBA di Achille per la scena (dal webm, ritagliato, alto AV_H), fermi sul primo per il ritardo della voce."""
    w, h, x0, x1, y0 = rq; tav = {t['id']: t for t in json.load(open(f'{A}/tempi-avatar.json'))}[sid]
    cw, chh = x1 - x0, h - y0; ah = AV_H; aw = round(cw * ah / chh / 2) * 2
    vf = (f"trim=start={tav['inizio']:.3f}:duration={tav['durata']:.3f},setpts=PTS-STARTPTS,fps={FPS},"
          f"tpad=start_duration={lead}:start_mode=clone:stop_mode=clone:stop=-1,crop={cw}:{chh}:{x0}:{y0},"
          f"scale={aw}:{ah}:flags=lanczos,format=rgba")
    yield from leggi(['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar.webm', '-vf', vf,
                      '-frames:v', str(n), '-f', 'rawvideo', '-'], aw, ah, n, 4)


def metti_avatar(f, av, scala=1.0):
    im = Image.fromarray(av)
    if scala != 1.0:
        im = im.resize((round(im.size[0] * scala), round(im.size[1] * scala)), Image.LANCZOS)
    a = im.split()[3]; alone = Image.new('RGBA', im.size, (255, 255, 255, 0))
    alone.putalpha(a.filter(ImageFilter.GaussianBlur(14)).point(lambda v: int(v * 0.55)))
    base = Image.fromarray(f).convert('RGBA'); x, y = W - im.size[0], H - im.size[1]
    base.alpha_composite(alone, (x, y)); base.alpha_composite(im, (x, y))
    return np.array(base.convert('RGB'))


def filo_animato():
    fr = list(leggi(['ffmpeg', '-v', 'error', '-c:v', 'libvpx-vp9', '-i', f'{OV}/A01_filo_rosso_animato_alpha.webm', '-vf',
                     f'fps={FPS},format=rgba', '-f', 'rawvideo', '-'], W, H, 200, 4))
    return [x for x in fr if x is not None]


def monta():
    parole = json.load(open(f'{A}/parole.json')); vdur = {t['id']: t['durata'] for t in json.load(open(f'{A}/tempi-scene.json'))}
    L = f'{D}/montaggio'; cache = f'{L}/cache'; os.makedirs(cache, exist_ok=True)
    for f in os.listdir(f'{D}/immagini'):                     # le jpg in png per il Ken Burns
        if not os.path.exists(f'{cache}/{f[:-4]}.png'):
            Image.open(f'{D}/immagini/{f}').convert('RGB').save(f'{cache}/{f[:-4]}.png')
    # tempi
    t, tempi = 0.0, {}
    for sid, fissa, lead, *_ in SCENE:
        d = fissa or round(lead + vdur[sid] + 0.15, 2)
        tempi[sid] = (t, d); t += d
    tot = round(t, 2)
    pw = lambda sid: parole.get(sid, [])                       # noqa: E731
    anc = lambda sid, v: ancora(v, pw(sid), [s for s in SCENE if s[0] == sid][0][2])   # noqa: E731
    # sottotitoli
    sub = []
    for sid, fissa, lead, pezzi, graf, _ in SCENE:
        if sid not in parole:
            continue
        a0 = tempi[sid][0] + lead
        testi_schermo = {'K02_frase.png': 'dove sei con chi sei', 'K03_frase.png': 'non sei sola',
                         'K04_frase.png': 'ogni filo da solo si spezza', 'K05_frase.png': 'insieme diventa una trama'}
        sch = [norm(testi_schermo[g[0]]) for g in graf if g[0] in testi_schermo]
        pulite = [dict(w, w=re.sub(r'(\w)…', r'\1,', w['w']).replace('…', '')) for w in parole[sid]]
        for c in frasi(pulite, 30):
            x = ' '.join(w['w'] for w in c).replace('…', '').replace('ventiquattro', '24').replace("L'uno cinque due due", 'Il 1522')
            x = re.sub(r'\s+', ' ', x).strip()
            if any(s and (s in norm(x) or norm(x) in s) for s in sch) and len(norm(x)) < 30:
                continue
            sub.append((a0 + c[0]['a'] - 0.05, min(a0 + c[-1]['b'] + 0.35, sum(tempi[sid])), x))
    for i in range(len(sub) - 1):
        if sub[i][1] > sub[i + 1][0] - 0.05:
            sub[i] = (sub[i][0], sub[i + 1][0] - 0.05, sub[i][2])
    open(f'{D}/sottotitoli_montato.srt', 'w').write(''.join(f"{k}\n{tc(a)} --> {tc(b)}\n{chr(10).join(righe2(x, 30))}\n\n"
                                                         for k, (a, b, x) in enumerate(sub, 1)))
    strati_sub = []
    inizio_cartelli = tempi['S10'][0]
    for a, b, x in sub:
        strati_sub.append((a, b, strato_sub(x, Y_SUB_CARTELLI if a >= inizio_cartelli - 0.05 else Y_SUB)))
    # video
    rq = riquadro_avatar(); filo = filo_animato()
    ov = {}
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS),
                            '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p',
                            f'{L}/video.mp4'], stdin=subprocess.PIPE)
    prec = np.zeros((H, W, 3), np.uint8)
    for sid, fissa, lead, pezzi, graf, (g0, g1) in SCENE:
        t0, d = tempi[sid]; n = round((t0 + d) * FPS) - round(t0 * FPS)
        cambio = anc(sid, 'ascolto') if sid == 'S04' else None
        # pezzi di immagine, uno dopo l'altro
        inizi = [anc(sid, p[1]) for p in pezzi] + [d]
        gens = []
        for (src, _, *resto), a, b in zip(pezzi, inizi, inizi[1:]):
            m = round(b * FPS) - round(a * FPS); m = m if b < d else n - round(a * FPS)
            if src == 'avatar':
                bg = resto[0]
                bgs = bg if bg == 'prugna' else (f'{cache}/{os.path.basename(bg)[:-4]}.png' if bg.endswith('.jpg') else lenta(f'{D}/{bg}', b - a, cache))
                gens.append(('avatar', m, fondo(bgs, m, cache), avatar(sid, m, lead, rq)))
            else:
                s = f'{cache}/{os.path.basename(src)[:-4]}.png' if src.endswith('.jpg') else (f'{D}/{src}' if src.endswith('.png') else lenta(f'{D}/{src}', b - a, cache))
                k = os.path.basename(src).split('_')[0]
                gens.append(('carta' if 'cartelli' in src else 'img', m, fondo(s, m, cache, CENTRO.get(k, 0.5), kb='cartelli' not in src), None))
        j = 0
        for tipo, m, gb, ga in gens:
            for q in range(m):
                tt = j / FPS; f = next(gb)
                if tipo != 'carta':
                    if cambio is not None:
                        u = min(1, max(0, (tt - cambio + 0.4) / 1.2)); g = g0 + (g1 - g0) * u
                    else:
                        g = g0 + (g1 - g0) * j / max(1, n - 1)
                    f = colore(f, g)
                if tipo == 'avatar':
                    if sid == 'S08':
                        f = (f.astype(np.float32) * 0.92).astype(np.uint8)
                    f = metti_avatar(f, next(ga), 1 + 0.12 * j / max(1, n - 1) if sid == 'S08' else 1.0)
                # grafiche
                for nome, da, a_, dy in graf:
                    ta, tb = anc(sid, da), (anc(sid, a_) if a_ is not None else d)
                    if not (ta <= tt < tb):
                        continue
                    if nome == 'A01':
                        f = sopra(f, filo[min(len(filo) - 1, int((tt - ta) * FPS))])
                        continue
                    if nome not in ov:
                        ov[nome] = np.array(Image.open(f'{OV}/{nome}').convert('RGBA'))
                        if dy:
                            ov[nome] = np.roll(ov[nome], dy, axis=0)
                    al = min(1, (tt - ta) / 0.6, (tb - tt) / 0.4 if a_ is not None else 1); al = al * al * (3 - 2 * al)
                    f = sopra(f, ov[nome], al, (1 - al) * 12)
                ta_ = t0 + tt
                for sa, sb_, st in strati_sub:
                    if sa <= ta_ < sb_:
                        f = sopra(f, st, min(1, (ta_ - sa) / 0.15, (sb_ - ta_) / 0.15))
                if sid == 'S01' and tt < 1.0:                        # nero in dissolvenza d'apertura
                    f = (f.astype(np.float32) * tt).astype(np.uint8)
                elif j < 10 and sid not in ('S01',):                  # dissolvenza fra le scene (0,4 s)
                    al = j / 10; f = (prec.astype(np.float32) * (1 - al) + f.astype(np.float32) * al).astype(np.uint8)
                enc.stdin.write(np.ascontiguousarray(f).tobytes()); ultimo = f; j += 1
        prec = ultimo
    enc.stdin.close(); enc.wait()

    # audio
    ins, fil, k, voce_fin = [], [], 0, []
    for sid, fissa, lead, *_ in SCENE:
        if sid in parole:
            t = tempi[sid][0] + lead; ins += ['-i', f'{A}/wav/{sid}.wav']
            fil.append(f"[{k}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={round(t * 1000)}:all=1[v{k}]"); k += 1
            voce_fin += [(t + c[0]['a'], t + c[-1]['b']) for c in frasi(parole[sid], 999)]
    nv = k
    fil.append(''.join(f'[v{i}]' for i in range(nv)) + f"amix=inputs={nv}:normalize=0,apad=whole_dur={tot}[voce]")
    attiva = '+'.join(f"min(1,max(0,(t-{a - 0.3:.2f})/0.3))*min(1,max(0,({b + 0.4:.2f}-t)/0.4))" for a, b in voce_fin)
    s8a, s8d = tempi['S08']
    eff, mus = [], []
    for sid, da, nome, vol, dmax, off, fin, fout in SUONI:
        t = tempi[sid][0] + anc(sid, da); src = f'{SFX}/{nome}.wav'; ds = durata(src)
        loop = dmax is not None and dmax > ds - off; dd = dmax if dmax is not None else ds - off
        ins += (['-stream_loop', '-1'] if loop else []) + ['-i', src]
        ch = f"[{k}:a]atrim={off}:{off + dd},asetpts=PTS-STARTPTS,volume={vol}"
        ch += (f",afade=t=in:d={fin}" if fin else '') + (f",afade=t=out:st={max(0, dd - fout):.3f}:d={fout}" if fout else '')
        fil.append(ch + f",adelay={round(t * 1000)}:all=1[e{k}]"); eff.append(f'e{k}'); k += 1
    for sa, da, sb_, a_, off, fin, fout in MUSICA:
        t = tempi[sa][0] + anc(sa, da); fine = (tempi[sb_][0] + anc(sb_, a_)) if sb_ else tot; dd = fine - t
        ins += ['-i', f'{SFX}/p_filo.wav']
        fil.append(f"[{k}:a]atrim={off}:{off + dd:.3f},asetpts=PTS-STARTPTS,volume=0.8,afade=t=in:d={fin},"
                   f"afade=t=out:st={max(0, dd - fout):.3f}:d={fout},adelay={round(t * 1000)}:all=1[m{k}]"); mus.append(f'm{k}'); k += 1
    fil.append(''.join(f'[{x}]' for x in mus) + f"amix=inputs={len(mus)}:normalize=0,apad=whole_dur={tot},"
               f"volume='(1-0.8*min(1,{attiva}))*(1-{1 - SOTTO_S08}*min(1,max(0,(t-{s8a - 0.5:.2f})/1.0))*min(1,max(0,({s8a + s8d + 0.3:.2f}-t)/1.2)))'"
               f":eval=frame[mus]")
    fil.append(''.join(f'[{x}]' for x in eff) + f"amix=inputs={len(eff)}:normalize=0,apad=whole_dur={tot},"
               f"volume='1-0.45*min(1,{attiva})':eval=frame[eff]")
    zero = '*'.join(f"(min(1,max(0,({tempi[s][0] + a:.3f}-t)/0.03))+min(1,max(0,(t-{tempi[s][0] + b:.3f})/0.03)))" for s, a, b in SILENZI)
    fil.append(f"[voce][eff][mus]amix=inputs=3:normalize=0,atrim=0:{tot},volume='{zero}':eval=frame[au]")
    ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[au]', '-ar', '48000', '-ac', '2', f'{L}/mix.wav')
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', f'{L}/mix.wav', '-af', 'ebur128', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    gain = -16 - float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1])
    ff('-i', f'{L}/video.mp4', '-i', f'{L}/mix.wav', '-filter_complex',
       f"[1:a]volume={gain:.2f}dB,alimiter=limit=0.89:level=false,volume='{zero}':eval=frame[a]", '-map', '0:v', '-map', '[a]',
       '-c:v', 'copy', '-aspect', '1080:1920', '-c:a', 'aac', '-b:a', '192k', '-t', str(tot), '-movflags', '+faststart',
       f'{D}/{NOME}_9x16.mp4')
    # 16:9: il verticale al centro su una copia di sé ingrandita, sfocata e scurita
    ff('-i', f'{D}/{NOME}_9x16.mp4', '-filter_complex',
       "[0:v]split[a][b];[a]scale=1920:-2,crop=1920:1080,boxblur=30:3,eq=brightness=-0.18:saturation=0.8[s];"
       "[b]scale=-2:1080:flags=lanczos[v];[s][v]overlay=(W-w)/2:0,setsar=1,format=yuv420p[o]",
       '-map', '[o]', '-map', '0:a', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-c:a', 'copy',
       '-movflags', '+faststart', f'{D}/{NOME}_16x9.mp4')
    print('montato', NOME, f'{tot} s', len(sub), 'sottotitoli', f'guadagno {gain:+.1f} dB',
          ' '.join(f'{s}:{tempi[s][1]:.1f}' for s in tempi))


if __name__ == '__main__':
    monta()
