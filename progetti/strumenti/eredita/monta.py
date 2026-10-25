"""Montaggio dei video «Eredità Invisibili» (reel e short 9:16, video 16:9), dal PIANO_MONTAGGIO.json del pacchetto.

    python3 strumenti/eredita/monta.py ei-r01-credevo-di-crescerli [16x9|9x16] [prova]

Senza formato monta tutti i formati del piano (V02 e V03: 16:9 e 9:16). Il teaser T01 esce anche nelle cinque versioni
del conto alla rovescia (grafiche/9x16/countdown/*.jpg al posto della tavola finale).
Ogni scena dura quanto la sua voce (audio/tempi-scene.json, voci.py); le slide parlate almeno l'85% della stima del piano,
quelle mute (tavola capitolo, chiusura) quanto la stima (nel verticale la chiusura da 10 s dura 4 s, come dice il piano).
Tra le scene solo dissolvenze incrociate (XF), come chiede il pacchetto: ogni scena si allunga di XF in coda e la
successiva le parte sopra, così la voce resta al suo posto.
  avatar  pezzo di avatar/avatar[_16x9].mp4 (un video per formato con le scene parlate in fila, audio/tempi-avatar.json),
          a piena inquadratura e mai scontornato
  img     immagini/<nome>[_9x16].png con Ken Burns lento (zoom massimo 8%), verso dal campo «movimento» del piano
  clip    clip/<nome>[_9x16].mp4 adattata al formato, rallentata se è più corta della scena
  slide   la tavola del pacchetto con un respiro di zoom del 3% (la tavola timer di S06 è la sequenza di grafiche/9x16/timer)
Sovrimpressioni del pacchetto (PNG trasparenti) con dissolvenza di 0,3 s. Sottotitoli impressi in Jost avorio con ombra,
spenti sulle slide, con il fondo a sub_y (nel verticale dentro la zona libera 250-1500 px). Niente musica: la aggiunge Achille.
Con «prova» monta anche senza immagini e clip (al loro posto un fondo notte con il nome del file mancante).
"""
import json, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
FPS, XF = 25, 0.5
NOTTE = '0x0B1A2E'
# per formato: lato, fondo dei sottotitoli, caratteri per riga, corpo dei sottotitoli
FORMATI = {'9x16': dict(W=1080, H=1920, SUB_Y=1480, MAXR=28, CORPO=64),
           '16x9': dict(W=1920, H=1080, SUB_Y=1010, MAXR=44, CORPO=50)}
GIU = 110            # nel verticale l'avatar scende di tanto nel quadro
VOLTO = (330 + GIU, 1000)     # fascia del volto nel look verticale «Aki in his studio»: le scritte lì sopra salgono a SOPRA
SOPRA = 255
Z16, Y16 = 1.3, 40         # 16:9: ingrandimento e taglio in alto dell'avatar (il volto finisce intorno a x 1050-1520)
SX16 = 500                 # 16:9: centro orizzontale delle scritte spostate dal volto alla parete di sinistra
# sovrimpressioni dei primi cinque video, fissate a mano: scena -> [(file, da, a)] (a=None: fino alla fine). Per gli altri
# vengono dal piano (campo «overlay», per tutta la scena) più il nome dell'autore nei primi 3 s di una scena in camera.
OVL = {
    'ei-r01-credevo-di-crescerli': {'S01': [('S01_OVL_testo.png', 0, 2.0)], 'S06': [('OVL_nome_autore.png', 0, 3.0)]},
    'ei-r02-un-sasso-in-tasca': {'S01': [('S01_OVL_testo.png', 0, None)], 'S06': [('OVL_nome_autore.png', 0, 3.0)],
                                 'S07': [('OVL_hashtag.png', 0, None)]},
    'ei-s01-quand-e-l-ultima-volta': {'S01': [('S01_OVL_testo.png', 0, None)], 'S03': [('S03_OVL_testo.png', 0, None)],
                                      'S05': [('OVL_nome_autore.png', 0, 3.0)]},
    'ei-s02-venti-minuti-per-le-scarpe': {'S01': [('S01_OVL_testo.png', 0, None)], 'S02': [('S02_OVL_testo.png', 0, None)],
                                          'S05': [('OVL_nome_autore.png', 0, 3.0)]},
    'ei-s03-perche-quel-signore': {'S01': [('S01_OVL_testo.png', 0, None)], 'S03': [('S03_OVL_testo.png', 0, None)],
                                   'S05': [('OVL_nome_autore.png', 0, 3.0)]},
}
# silenzio prima della voce di una scena (note del piano)
PRIMA = {('ei-r02-un-sasso-in-tasca', 'S04'): 1.0, ('ei-r08-ti-voglio-bene-papa', 'S04'): 1.0,
         ('ei-v03-lettera-di-un-padre', 'S07'): 2.0}
# Y01 S09: i sei nomi delle parti del libro, uno alla volta sulla parola che li dice (OVL_parti, disegnati qui)
PARTI = {('ei-y01-perche-ho-scritto-eredita-invisibili', 'S09'):
         ['Il tempo', 'La verità', 'La meraviglia', 'La resilienza', 'Le relazioni', 'La libertà']}


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def kenburns(mov):
    """(zoom iniziale, zoom finale, y iniziale, y finale) in frazione dello spazio libero, dal testo del piano."""
    m = (mov or '').lower()
    if 'alto verso il basso' in m:
        return 1.08, 1.08, 0.0, 1.0
    if 'lentissimo' in m:
        return 1.0, 1.04, 0.5, 0.5
    return 1.0, 1.08, 0.5, 0.5          # push-in / zoom lento / Ken Burns lento


def sfuma(L, W, H, yc, sig, alfa, nome):
    """Sfumatura notte orizzontale centrata in yc, per leggere scritte e sottotitoli anche su un fondo chiaro."""
    import numpy as np
    a = np.zeros((H, W, 4), np.uint8); a[..., 0], a[..., 1], a[..., 2] = 11, 26, 46
    y = np.arange(H, dtype=float); a[..., 3] = (np.exp(-((y - yc) / sig) ** 2) * alfa)[:, None].astype(np.uint8)
    f = f'{L}/{nome}.png'; Image.fromarray(a, 'RGBA').save(f); return f


def ellisse(L, W, H, cx, cy, rx, ry, nome):
    """Macchia notte morbida dietro a una scritta spostata sulla parete chiara (16:9)."""
    import numpy as np
    yy, xx = np.mgrid[0:H, 0:W].astype(float)
    a = np.zeros((H, W, 4), np.uint8); a[..., 0], a[..., 1], a[..., 2] = 11, 26, 46
    a[..., 3] = (np.exp(-(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2)) * 185).astype(np.uint8)
    f = f'{L}/{nome}.png'; Image.fromarray(a, 'RGBA').save(f); return f


def parte(L, W, H, testo, k):
    """Un nome di parte del libro (Y01 S09): Cinzel avorio con ombra, nel terzo sinistro del quadro accanto all'avatar."""
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    f = ImageFont.truetype(f'{QUI}/../../ei-y01-perche-ho-scritto-eredita-invisibili/font/Cinzel[wght].ttf', 66)
    x0, y0, x1, y1 = d.textbbox((0, 0), testo.upper(), font=f); x, y = SX16 - (x1 - x0) // 2, 470
    om = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(om).text((x, y + 4), testo.upper(), font=f, fill=(11, 26, 46, 230))
    im = Image.alpha_composite(om.filter(ImageFilter.GaussianBlur(8)), im); d = ImageDraw.Draw(im)
    d.text((x, y), testo.upper(), font=f, fill=(244, 239, 230, 255))
    d.line([(SX16 - 60, y + 110), (SX16 + 60, y + 110)], fill=(220, 228, 236, 200), width=2)
    p = f'{L}/parte_{k}.png'; im.save(p); return p


def righe(testo, maxr):
    if len(testo) <= maxr:
        return testo
    p = testo.split(); k = min(range(1, len(p)), key=lambda k: abs(len(' '.join(p[:k])) - len(testo) / 2))
    return ' '.join(p[:k]) + r'\N' + ' '.join(p[k:])


def frasi(parole, maxr):
    out, cur = [], []
    for w in parole:
        cur.append(w)
        if re.search(r'[.?!…:]$', w['w']) or (len(' '.join(x['w'] for x in cur)) > 2 * maxr - 8 and w['w'].endswith(',')):
            out.append(cur); cur = []
    if cur:
        out.append(cur)
    return out


def tc(t):
    return f'{int(t // 3600)}:{int(t // 60 % 60):02d}:{t % 60:05.2f}'


def norm(w):
    import unicodedata
    return re.sub(r'[^a-z]', '', unicodedata.normalize('NFD', w.lower()))


def sovrimpressioni(nome, piano, fmt):
    if nome in OVL:
        return OVL[nome]
    ov = {}
    for s in piano['scene']:
        f = (s.get('overlay') or {}).get(fmt)
        if f:
            ov.setdefault(s['scena'], []).append((os.path.basename(f), 0, None))
    cam = [s['scena'] for s in piano['scene'] if s['tipo'] == 'avatar']
    esplicito = [s['scena'] for s in piano['scene'] if 'OVL_nome' in (s.get('note') or '')]
    libere = [c for c in cam if c not in ov]
    dove = (esplicito or libere or cam[:1])[:1]
    for c in dove:
        ov.setdefault(c, []).append(('OVL_nome_autore.png', 0, 3.0))
    return ov


def monta(nome, fmt, prova=False, finale=None, suff=''):
    D = f'{PR}/{nome}'; L = f'{D}/montaggio_{fmt}'; os.makedirs(L, exist_ok=True)
    W, H, SUB_Y, MAXR, CORPO = (FORMATI[fmt][k] for k in ('W', 'H', 'SUB_Y', 'MAXR', 'CORPO'))
    piano = json.load(open(f'{D}/PIANO_MONTAGGIO.json'))
    sec = '' if fmt == piano['formati'][0] else f'_{fmt}'        # immagini e clip del formato secondario
    voce = {t['id']: t['durata'] for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    parole = json.load(open(f'{D}/audio/parole.json'))
    tav = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-avatar.json'))} if os.path.exists(f'{D}/audio/tempi-avatar.json') else {}
    avatar = f'{D}/avatar/avatar_{fmt}.mp4' if os.path.exists(f'{D}/avatar/avatar_{fmt}.mp4') else f'{D}/avatar/avatar.mp4'
    OV = sovrimpressioni(nome, piano, fmt)
    basso = sfuma(L, W, H, 0.708 * H, 0.12 * H, 150, 'sfuma_basso')
    scene, t0 = [], 0.0
    for s in piano['scene']:
        sid, tipo = s['scena'], s['tipo']; pre = PRIMA.get((nome, sid), 0.0)
        if sid in voce:
            d = pre + voce[sid]
            if tipo == 'slide':
                d = max(d + 0.4, 0.85 * s['durata_stimata_s'])
        else:
            d = s['durata_stimata_s']
            m = re.search(r'(\d+) s nella versione verticale', s.get('note') or '')
            if m and fmt == '9x16':
                d = float(m.group(1))
        scene.append({**s, 'd': d, 't0': t0, 'pre': pre}); t0 += d
    tot = t0
    pezzi = []
    for k, s in enumerate(scene):
        sid, tipo, d = s['scena'], s['tipo'], s['d'] + (XF if k + 1 < len(scene) else 0)
        n = round(d * FPS); out = f'{L}/{sid}.mp4'
        src = s.get('clip') if tipo == 'clip' else s.get('immagine') if tipo == 'img' else None
        if src:
            b, e = os.path.splitext(src); src = f'{b}{sec}{e}'
        if src and not os.path.exists(f'{D}/{src}'):
            if not prova:
                sys.exit(f'manca {src}')
            ff('-f', 'lavfi', '-i', f'color=c={NOTTE}:s={W}x{H}:r={FPS}:d={d:.3f}', '-vf',
               f"drawtext=text='{os.path.basename(src)}':fontcolor=0xDCE4EC:fontsize=34:x=(w-tw)/2:y=h/2",
               '-frames:v', str(n), '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', out)
        elif tipo == 'avatar':
            a = tav[sid]
            if fmt == '9x16':
                vf = (f'fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{H},split[a][b];'
                      # setsar=1: lo scale della striscia in alto cambiava il rapporto dei pixel (13:6) e il video usciva stirato
                      # inquadratura abbassata di GIU px (la scritta del gancio sta sopra la testa): in alto la parete allungata e sfocata
                      f'[b]crop={W}:60:0:0,scale={W}:{GIU + 20},boxblur=20:2[t];[a]crop={W}:{H - GIU}:0:0[c];'
                      f'[t][c]vstack,crop={W}:{H}:0:20,setsar=1')
            else:
                # nel 16:9 l'avatar è al centro: ingrandito di Z16 e spostato nel terzo destro, così le scritte stanno a sinistra
                vf = f'fps={FPS},scale={round(W * Z16)}:{round(H * Z16)}:flags=lanczos,crop={W}:{H}:0:{Y16},setsar=1'
            # silenzio prima della voce: l'avatar resta fermo sul primo fotogramma (non mostra la coda della scena prima)
            vf += (f',tpad=start_duration={s["pre"]:.3f}:start_mode=clone' if s['pre'] else '') + ',format=yuv420p'
            ff('-ss', f"{a['inizio']:.3f}", '-i', avatar, '-filter_complex', vf,
               '-frames:v', str(n), '-an', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        elif tipo == 'clip':
            c = f'{D}/{src}'; lento = max(1.0, d / durata(c))
            ff('-i', c, '-vf', f'setpts={lento:.4f}*PTS,fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase:'
               f'flags=lanczos,crop={W}:{H},setsar=1,format=yuv420p', '-frames:v', str(n), '-an', '-c:v', 'libx264', '-crf', '16', out)
        elif tipo == 'slide' and os.path.isdir(f'{D}/grafiche/{fmt}/timer') and 'timer' in s['grafica'][fmt]:
            # S06 S03: contatore 10→0, una tavola ogni 0,4 s, poi l'ultima ferma
            tv = sorted(os.listdir(f'{D}/grafiche/{fmt}/timer'), reverse=True)
            open(f'{L}/timer.txt', 'w').write(''.join(f"file '{D}/grafiche/{fmt}/timer/{t}'\nduration 0.4\n" for t in tv) +
                                              f"file '{D}/grafiche/{fmt}/timer/{tv[-1]}'\n")
            ff('-f', 'concat', '-safe', '0', '-i', f'{L}/timer.txt', '-vf',
               f'fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},tpad=stop_mode=clone:stop_duration=10,'
               f'setsar=1,format=yuv420p', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', out)
        else:
            img = f'{D}/{src}' if tipo == 'img' else (finale if finale and k == len(scene) - 1 else f"{D}/{s['grafica'][fmt]}")
            z0, z1, y0, y1 = kenburns(s.get('movimento')) if tipo == 'img' else (1.0, 1.03, 0.5, 0.5)
            # zoompan su un'immagine grande il doppio, così il movimento non trema
            z = f"({z0}+({z1}-{z0})*on/{n})"; yy = f"({y0}+({y1}-{y0})*on/{n})"
            ff('-loop', '1', '-i', img, '-vf',
               f'scale={2 * W}:{2 * H}:force_original_aspect_ratio=increase:flags=lanczos,crop={2 * W}:{2 * H},'
               f"zoompan=z='{z}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)*{yy}':d={n}:s={W}x{H}:fps={FPS},setsar=1,format=yuv420p",
               '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        # sovrimpressioni della scena
        ov = list(OV.get(sid, []))
        if (nome, sid) in PARTI:
            # i nomi delle parti: ognuno dalla parola che lo dice alla successiva, l'ultimo fino a fine scena
            pw = parole[sid]; nomi = PARTI[(nome, sid)]; tt = []
            for nm in nomi:
                ch = norm(nm.split()[-1])
                tt.append(next(w['a'] for w in pw if norm(w['w']) == ch) + s['pre'])
            for j, nm in enumerate(nomi):
                ov.append((parte(L, W, H, nm, j), tt[j], tt[j + 1] if j + 1 < len(nomi) else None))
        s['sub_y'] = SUB_Y
        foto = tipo in ('img', 'clip') or (fmt == '16x9' and tipo == 'avatar')   # nel 16:9 la camicia è bianca
        if ov or foto:
            ins, fil, cur = [], [], '[0:v]'
            if foto:
                # sulle immagini una sfumatura notte leggera dietro ai sottotitoli, perché si leggano anche sul chiaro
                ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', basso]
                fil.append(f"[1:v]format=rgba[b0];{cur}[b0]overlay=0:0:shortest=1[vb]"); cur = '[vb]'
            for j, (f, a, b) in enumerate(ov):
                b = s['d'] if b is None else b
                path = f if os.path.isabs(f) else f'{D}/grafiche/{fmt}/{f}'
                x0, y0, x1, y1 = Image.open(path).getbbox()
                dy, alto = 0, False
                dx, macchia = 0, False
                if fmt == '9x16' and tipo == 'avatar' and VOLTO[0] < y1 and y0 < VOLTO[1]:
                    # scritta sul volto: sale sopra la testa, con una sfumatura notte per leggerla sul muro chiaro
                    dy, alto = SOPRA - y0, True
                elif fmt == '16x9' and tipo == 'avatar' and y0 < 760 and x1 > 900:
                    # 16:9: la scritta va sulla parete di sinistra, con una macchia notte dietro
                    dx, macchia = SX16 - (x0 + x1) // 2, True
                elif fmt == '16x9' and 'parte_' in path:
                    macchia = True                        # i nomi delle parti (Y01) stanno già a sinistra
                elif foto and y1 < 0.52 * H:
                    alto = True                           # scritta in alto su un'immagine: stessa sfumatura
                if alto:
                    ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', sfuma(L, W, H, (y0 + y1) / 2 + dy, 170 * H / 1920 * 1.6 if fmt == '16x9' else 170, 175, f'banda_{sid}_{j}')]
                elif macchia:
                    ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', ellisse(L, W, H, (x0 + x1) / 2 + dx, (y0 + y1) / 2, (x1 - x0) * 0.62, (y1 - y0) * 1.1 + 60, f'macchia_{sid}_{j}')]
                    alto = True
                if y1 + dy > s['sub_y'] - 150 * H / 1920 and y0 + dy < s['sub_y'] + 10:
                    s['sub_y'] = y0 + dy - 25            # sottotitoli sopra le scritte in basso
                ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', path]
                kk = len(ins) // 6
                fad = f"fade=t=in:st={a:.2f}:d=0.3:alpha=1,fade=t=out:st={max(a + 0.3, b - 0.3):.2f}:d=0.3:alpha=1"
                if alto:
                    fil.append(f"[{kk - 1}:v]format=rgba,{fad}[g{j}];{cur}[g{j}]overlay=0:0:shortest=1[w{j}]"); cur = f'[w{j}]'
                fil.append(f"[{kk}:v]format=rgba,{fad}[o{j}];{cur}[o{j}]overlay={dx}:{dy}:shortest=1[v{j}]")
                cur = f'[v{j}]'
            ff('-i', out, *ins, '-filter_complex', ';'.join(fil), '-map', cur, '-frames:v', str(n),
               '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', f'{L}/{sid}_ov.mp4')
            os.replace(f'{L}/{sid}_ov.mp4', out)
        pezzi.append(out)
    # dissolvenze incrociate: la scena k+1 parte al suo t0, sopra la coda di XF della scena k
    ins = sum([['-i', p] for p in pezzi], []); fil, cur = [], '[0:v]'
    for k in range(1, len(pezzi)):
        fil.append(f"{cur}[{k}:v]xfade=transition=fade:duration={XF}:offset={scene[k]['t0']:.3f}[x{k}]"); cur = f'[x{k}]'
    # voce: ogni scena parlata al suo t0 (+ eventuale silenzio prima)
    ai = len(pezzi); va = []
    for s in scene:
        if s['scena'] in voce:
            ins += ['-i', f"{D}/audio/wav/{s['scena']}.wav"]
            ms = round((s['t0'] + s['pre']) * 1000)
            fil.append(f"[{ai}:a]aresample=48000,adelay={ms}|{ms}[a{ai}]"); va.append(f'[a{ai}]'); ai += 1
    fil.append(''.join(va) + f"amix=inputs={len(va)}:normalize=0,apad=whole_dur={tot:.3f}[au]")
    # sottotitoli: spenti sulle slide
    ev = []
    for s in scene:
        if s['tipo'] == 'slide' or s['scena'] not in parole:
            continue
        cc = frasi(parole[s['scena']], MAXR); base = s['t0'] + s['pre']
        for j, c in enumerate(cc):
            a, b = base + c[0]['a'] - 0.05, base + c[-1]['b'] + 0.3
            if j + 1 < len(cc):
                b = min(b, base + cc[j + 1][0]['a'] - 0.07)
            ev.append(f"Dialogue: 0,{tc(a)},{tc(b)},S,,0,0,0,,{{\\an2\\pos({W // 2},{s['sub_y']:.0f})}}{righe(' '.join(w['w'] for w in c), MAXR)}")
    open(f'{L}/sub.ass', 'w').write(
        f'[Script Info]\nScriptType: v4.00+\nPlayResX: {W}\nPlayResY: {H}\nWrapStyle: 2\n\n[V4+ Styles]\n'
        'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, '
        'Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, '
        'MarginR, MarginV, Encoding\n'
        # avorio #F4EFE6 (BGR E6EFF4), ombra morbida notte
        f'Style: S,Jost,{CORPO},&H00E6EFF4,&H00E6EFF4,&H602E1A0B,&H802E1A0B,0,0,0,0,100,100,0,0,1,1.6,3,2,60,60,0,1\n'
        '\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n' + '\n'.join(ev) + '\n')
    fil.append(f"{cur}subtitles={L}/sub.ass:fontsdir={D}/font,setsar=1,format=yuv420p[v]")
    uscita = f"{D}/{os.path.basename(D).upper().replace('-', '_')}_{fmt}{suff}.mp4"
    ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-map', '[au]', '-t', f'{tot:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', uscita)
    print('montato', uscita, f'{tot:.1f} s')


if __name__ == '__main__':
    nome = sys.argv[1]; prova = 'prova' in sys.argv[2:]
    piano = json.load(open(f'{PR}/{nome}/PIANO_MONTAGGIO.json'))
    formati = [f for f in sys.argv[2:] if f in FORMATI] or piano['formati']
    for fmt in formati:
        monta(nome, fmt, prova)
        cd = f'{PR}/{nome}/grafiche/{fmt}/countdown'
        if os.path.isdir(cd):                    # T01: le cinque versioni del conto alla rovescia
            for f in sorted(os.listdir(cd)):
                monta(nome, fmt, prova, finale=f'{cd}/{f}', suff='_' + os.path.splitext(f)[0])
