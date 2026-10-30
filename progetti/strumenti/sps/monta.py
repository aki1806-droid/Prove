"""Video della colonna sonora di «Sentirsi per sentire» (24 novembre 2026, CISL FP Padova Rovigo, provinciale): la canzone
di Achille (audio/Sentirsi_per_sentire_colonna_sonora.mp3, Suno, 250,8 s) per intero, immagini e clip tutte nuove
(Higgsfield: immagini GPT Image 2.5, animate con Kling 3.0), e in chiusura Luca Ward (voce_ward.py) con i cartelli
dell'evento (gli stessi della campagna) che entrano sulle sue parole.

    python3 strumenti/sps/monta.py lungo      -> 16:9, canzone intera, ~4:27   (proiezione all'evento, YouTube)
    python3 strumenti/sps/monta.py reel       -> 9:16, ~80 s sul terzo ritornello e sul finale (social)
    python3 strumenti/sps/monta.py audio lungo reel   -> rifà solo il missaggio sui video già montati

Regia: le inquadrature seguono la canzone (intro → strofe della solitudine → ritornello dell'ascolto di sé → le altre
donne → la liberazione → la luce che passa di mano → la comunità → l'abbraccio → Padova all'alba e Ward); dissolvenze
incrociate di 0,8 s; le clip (5 s) rallentate con il flusso ottico fino alla durata della loro inquadratura; colore dal
freddo e desaturato al caldo lungo il racconto. Musica abbassata sotto Ward e, dopo l'ultima nota, ripresa del finale
di pianoforte per chiudere sui cartelli. Uscita −16 LUFS.
"""
import json, os, re, subprocess, sys

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
D = f'{PR}/pdro-sps-colonna-sonora'
CARTELLI = f'{PR}/pdro-brividi-24-novembre/cards'
FONT = f'{PR}/strumenti/brividi/font/InstrumentSerif-Regular.ttf'
CANZONE = f'{D}/audio/Sentirsi_per_sentire_colonna_sonora.mp3'
X = 0.8                                     # dissolvenza incrociata

# Inquadrature: (tempo di taglio, immagine, calore -1 freddo .. +1 caldo, tipo); l'ultima voce chiude il video.
# Tipo (richiesta di Achille, 30/10: «alterna immagini e clip e usa anche HeyGen per animare delle immagini»):
# K = clip Kling (clip/), H = la stessa immagine animata con HeyGen (clip_heygen/, anima_heygen.py), S = immagine ferma
# con un lento movimento di macchina; clip e immagini ferme si alternano sempre.
LUNGO = {'fmt': (1920, 1080), 'suff': '16x9', 'ward': 230.5, 'scene': [
    (0, 1, -0.8, 'K'), (8, 2, -0.6, 'S'),
    (16, 3, -0.8, 'H'), (22, 4, -1, 'S'), (28, 8, -0.9, 'K'), (34, 5, -0.9, 'S'), (40, 6, -1, 'K'), (46, 7, -0.8, 'S'),
    (52, 12, 0, 'K'), (58, 11, -0.3, 'S'), (64, 13, 0.1, 'H'), (70, 14, 0, 'S'), (76, 36, 0.2, 'K'),
    (82, 9, -0.5, 'S'), (87.7, 16, 0.6, 'K'), (93.3, 10, -0.2, 'S'), (99, 15, 0.3, 'H'), (104.7, 19, 0.2, 'S'),
    (110.3, 17, 0.3, 'K'),
    (116, 18, 0.4, 'S'), (122, 20, 0.4, 'K'), (128, 21, 0.5, 'S'), (134, 22, 0.6, 'K'), (140, 38, 0.6, 'S'),
    (146, 23, 0.8, 'H'), (152, 24, 0.7, 'S'),
    (158, 26, 0.5, 'K'), (165, 27, 0.6, 'S'),
    (172, 28, 0.6, 'K'), (178.4, 29, 0.5, 'S'), (184.8, 25, 0.7, 'K'), (191.2, 37, 0.7, 'S'), (197.6, 39, 0.8, 'K'),
    (204, 30, 0.6, 'S'), (210, 31, 0.8, 'K'),
    (216, 32, 0.9, 'H'), (223.2, 33, 1, 'S'),
    (230.5, 34, 0.9, 'K'), (236.2, 35, 0.6, 'S'), (241.6, 40, 1, 'H'),
    ('ventiquattro', 'info'), ('sentirci', 'titolo'), ('Il tuo', 'prenota'), (5.0, 'firma_1522'), (5.5, None)],
    'titolo_apertura': (9.0, 15.0)}
# reel: la musica è il terzo ritornello (172-204), il finale (216-250,8) e la ripresa del pianoforte
REEL = {'fmt': (1080, 1920), 'suff': '9x16', 'ward': 44.5, 'pezzi': [(172, 204), (216, 250.8)], 'scene': [
    (0, 104, -1, 'S'), (4.4, 103, -0.8, 'H'), (8.8, 111, -0.2, 'S'), (13.2, 113, 0.1, 'K'), (17.6, 120, 0.4, 'S'),
    (22, 121, 0.5, 'K'), (26.4, 127, 0.6, 'S'), (30.8, 129, 0.5, 'K'), (35.2, 133, 1, 'S'), (39.6, 132, 0.9, 'H'),
    (44.5, 135, 0.6, 'S'), (52.5, 140, 1, 'H'),
    ('ventiquattro', 'info'), ('sentirci', 'titolo'), ('Il tuo', 'prenota'), (5.0, 'firma_1522'), (5.5, None)],
    'titolo_apertura': None}


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def grado(g):
    """colore: g < 0 freddo e desaturato, g > 0 caldo; sempre la vignettatura (la grana gonfiava ogni inquadratura a 50 MB)."""
    s = 1 - 0.28 * max(0, -g) + 0.06 * max(0, g)
    return (f"eq=saturation={s:.2f}:contrast=1.04,colorbalance=rs={0.05 * g:.3f}:gs={0.01 * g:.3f}:bs={-0.06 * g:.3f}:"
            f"rh={0.03 * g:.3f}:bh={-0.04 * g:.3f},vignette=angle=PI/5")


def tempi(cfg):
    """[(inizio, fine, cosa, calore)] con i cartelli agganciati alle parole di Ward."""
    ward = json.load(open(f'{D}/audio/ward-parole.json')); w0 = cfg['ward']
    def parola(s):
        p = s.split()
        for i in range(len(ward) - len(p) + 1):
            if all(re.sub(r'\W', '', ward[i + k]['w']).lower().startswith(re.sub(r'\W', '', x).lower()) for k, x in enumerate(p)):
                return w0 + ward[i]['a'] - 0.15
        sys.exit(f'parola non trovata: {s}')
    out, cartelli = [], False
    for v in cfg['scene']:
        a = v[0]
        if isinstance(a, str):                              # cartello: entra quando Ward dice quella parola
            a = parola(a); cartelli = True
        elif cartelli:                                      # dopo i cartelli i numeri sono durate dal precedente
            a = out[-1][0] + a
        if out:
            out[-1][1] = a
        if v[1] is None:
            break
        out.append([a, None, v[1], v[2] if len(v) > 2 else 0.0, v[3] if len(v) > 3 else 'C'])
    return out


def ferma(src, W, H, lung, k, out, g):
    """immagine ferma con un lento movimento di macchina (avvicinamento o allontanamento, una leggera deriva laterale),
    calcolato in PIL al sottopixel (zoompan di ffmpeg scatta)."""
    from PIL import Image
    im = Image.open(src).convert('RGB'); s = max(W / im.width, H / im.height) * 1.12
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS); n = round(lung * 25)
    dentro = k % 2 == 0; dx = (1 if k % 4 < 2 else -1) * 0.03 * im.width
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', '25',
                            '-i', '-', '-vf', f'{grado(g)},format=yuv420p', '-c:v', 'libx264', '-crf', '18', '-preset', 'fast',
                            out], stdin=subprocess.PIPE)
    for i in range(n):
        u = i / max(1, n - 1); u = u * u * (3 - 2 * u) * 0.6 + u * 0.4
        z = 1 + 0.10 * (u if dentro else 1 - u)
        bw, bh = W / z, H / z                               # l'immagine è già scalata a coprire W×H con il 12% di margine
        cx = im.width / 2 + dx * (u - 0.5); cy = im.height / 2
        box = (cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2)
        enc.stdin.write(im.resize((W, H), Image.BICUBIC, box=box).tobytes())
    enc.stdin.close(); enc.wait()


def prepara_uno(cfg, L, k, n, a, b, cosa, g, tipo='K'):
    W, H = cfg['fmt']
    lung = b - a + (X if k < n - 1 else X / 2)
    out = f'{L}/s{k:02d}_{cosa}{tipo}_{lung:.2f}.mp4'
    if os.path.exists(out):                                 # già preparato con la stessa durata
        return a, out
    if isinstance(cosa, str):                               # cartello dell'evento, con uno zoom lentissimo
        src = f"{CARTELLI}/S3_0{['titolo', 'info', 'prenota', 'firma_1522'].index(cosa) + 1}_{cosa}_{cfg['suff']}.png"
        vf = (f"scale={W * 2}:{H * 2},zoompan=z='1+0.025*on/({lung:.3f}*25)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':"
              f"d=1:s={W}x{H}:fps=25,format=yuv420p")
        ins = ['-loop', '1', '-i', src]
    elif tipo == 'S':
        ferma(f'{D}/immagini/{cosa:03d}.png', W, H, lung, k, out + '.tmp.mp4', g); os.replace(out + '.tmp.mp4', out)
        print(f'{k:02d} {a:6.1f} {cosa} S {lung:.1f} s', flush=True)
        return a, out
    else:
        src = f"{D}/{'clip_heygen' if tipo == 'H' else 'clip'}/{cosa:03d}.mp4"; f = lung / durata(src)
        vf = (f"setpts={f:.4f}*PTS,minterpolate=fps=25:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1:scd=none"
              if f > 24 / 25 else "setpts=PTS*24/25")
        vf += (f",fps=25,scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{H},{grado(g)},"
               f"tpad=stop_mode=clone:stop_duration=2,format=yuv420p")
        ins = ['-i', src]
    ff(*ins, '-vf', vf, '-t', f'{lung:.3f}', '-an', '-c:v', 'libx264', '-crf', '18', '-preset', 'fast', out + '.tmp.mp4')
    os.replace(out + '.tmp.mp4', out)
    print(f'{k:02d} {a:6.1f} {cosa} {lung:.1f} s', flush=True)
    return a, out


def prepara(cfg, L):
    """ogni inquadratura alla sua durata (+ la dissolvenza), quattro alla volta: il flusso ottico è lento."""
    from concurrent.futures import ThreadPoolExecutor
    T = tempi(cfg)
    with ThreadPoolExecutor(4) as ex:
        seg = list(ex.map(lambda x: prepara_uno(cfg, L, x[0], len(T), *x[1]), enumerate(T)))
    return seg, T[-1][1]


def musica(cfg, tot, L):
    """canzone (o i suoi pezzi, nel reel) + ripresa del finale di pianoforte sotto i cartelli; sotto Ward scende di circa 5 dB (il finale di pianoforte è già piano: Ward resta 14 dB sopra)."""
    w0 = cfg['ward']; ward = json.load(open(f'{D}/audio/ward-parole.json')); fw = w0 + ward[-1]['b']
    pezzi = cfg.get('pezzi') or [(0, 250.8)]
    fil, t, labs = [], 0.0, []
    for i, (a, b) in enumerate(pezzi):                     # pezzi uniti con dissolvenza di 2 s
        st = max(0.0, t - 2 if i else 0.0)
        fil.append(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d={2 if i else 0.01},"
                   f"afade=t=out:st={b - a - 2.5:.2f}:d=2.5,adelay={round(st * 1000)}:all=1,apad=whole_dur={tot}[m{i}]")
        labs.append(f'[m{i}]'); t = st + (b - a)
    rip = t - 3.0                                           # ripresa del finale (232-250,8) che entra mentre la canzone finisce
    fil.append(f"[0:a]atrim=232:250.8,asetpts=PTS-STARTPTS,afade=t=in:d=3,afade=t=out:st={max(0, tot - rip - 3.5):.2f}:d=3.5,"
               f"adelay={round(rip * 1000)}:all=1,apad=whole_dur={tot}[rip]")
    labs.append('[rip]')
    sotto = f"min(1,max(0,(t-{w0 - 0.8:.2f})/0.8))*min(1,max(0,({fw + 1.0:.2f}-t)/1.2))"
    fil.append(''.join(labs) + f"amix=inputs={len(labs)}:duration=longest:normalize=0,volume='1-0.42*{sotto}':eval=frame,atrim=0:{tot}[mus]")
    fil.append(f"[1:a]aresample=48000,aformat=channel_layouts=stereo,volume=1.6,adelay={round(w0 * 1000)}:all=1,apad=whole_dur={tot}[wd]")
    # 31/10: ogni ramo allungato fino alla fine del video (apad): senza, il missaggio della versione lunga finiva con
    # la canzone (250,8 s) e Ward veniva tagliato a «per sentirci»
    fil.append(f"[mus][wd]amix=inputs=2:duration=longest:normalize=0,atrim=0:{tot},afade=t=out:st={tot - 2.5:.2f}:d=2.5[a]")
    ff('-i', CANZONE, '-i', f'{D}/audio/ward.wav', '-filter_complex', ';'.join(fil), '-map', '[a]', '-ar', '48000', '-ac', '2',
       f'{L}/mix.wav')
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', f'{L}/mix.wav', '-af', 'ebur128', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    return -16 - float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1])


def monta(nome, cfg, solo_audio=False):
    L = f'{D}/montaggio/{nome}'; os.makedirs(L, exist_ok=True)
    if solo_audio:                                          # rifà solo missaggio e uscita sul video già montato
        tot = tempi(cfg)[-1][1]; W, H = cfg['fmt']
        return finisci(cfg, tot, L, W, H)
    seg, tot = prepara(cfg, L)
    ins, fil, prev = [], [], '0:v'
    for i, (a, p) in enumerate(seg):
        ins += ['-i', p]
    for i in range(1, len(seg)):
        o = f'v{i}'; fil.append(f"[{prev}][{i}:v]xfade=transition=fade:duration={X}:offset={seg[i][0] - X / 2:.3f}[{o}]"); prev = o
    W, H = cfg['fmt']
    if cfg['titolo_apertura']:                              # il titolo sulla seconda inquadratura, in dissolvenza
        a, b = cfg['titolo_apertura']
        al = f"if(lt(t,{a}),0,if(lt(t,{a + 1.5}),(t-{a})/1.5,if(lt(t,{b - 1.5}),1,if(lt(t,{b}),({b}-t)/1.5,0))))"
        fil.append(f"[{prev}]drawtext=fontfile='{FONT}':text='Sentirsi per sentire':fontsize={int(W * 0.055)}:"
                   f"fontcolor=0xF4EDE2:alpha='{al}':x=(w-text_w)/2:y=h*0.62:shadowcolor=black@0.6:shadowx=0:shadowy=3[vt]")
        prev = 'vt'
    ff(*ins, '-filter_complex', ';'.join(fil), '-map', f'[{prev}]', '-t', f'{tot:.3f}', '-c:v', 'libx264', '-crf', '17',
       '-preset', 'medium', '-pix_fmt', 'yuv420p', f'{L}/video.mp4')
    finisci(cfg, tot, L, W, H)


def finisci(cfg, tot, L, W, H):
    gain = musica(cfg, tot, L)
    out = f"{D}/PDRO_Sentirsi_per_sentire_colonna_sonora_{cfg['suff']}.mp4"
    ff('-i', f'{L}/video.mp4', '-i', f'{L}/mix.wav', '-filter_complex', f'[1:a]volume={gain:.2f}dB,alimiter=limit=0.89:level=false[a]',
       '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-aspect', f'{W}:{H}', '-t', f'{tot:.3f}',
       '-movflags', '+faststart', out)
    print('montato', os.path.basename(out), f'{tot:.1f} s', f'guadagno {gain:+.1f} dB')


if __name__ == '__main__':
    solo = 'audio' in sys.argv[1:]
    for n in [x for x in sys.argv[1:] if x != 'audio']:
        monta(n, {'lungo': LUNGO, 'reel': REEL}[n], solo)
