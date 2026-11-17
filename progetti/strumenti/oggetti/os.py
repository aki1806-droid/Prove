"""Serie «Oggetti smarriti» (PDRO Storie 01-10, CISL FP Padova Rovigo, solo AOUP): voce, montaggio, suoni.
Scelte di Achille (15/11/2026): voce ElevenLabs diretto (narratore «Luca Ward» tVdVcJPudubxmTmAw4tE e chiusura «Achille nuovo 1»
KerPEYZvLEWNATg4AARX, eleven_v4, flow N0YZ2MwkWYIrxhvx87ih), solo AOUP, clip e avatar dal connettore HeyGen, prima l'ep. 1.
Il narratore è una passata sola (scene 1-7), tagliata a metà delle pause vere fra i paragrafi con 0,35 s in più (0,8 prima
della svolta), atempo 1,12; la chiusura di Achille ha la sua passata. Grafiche del pacchetto: le scene GRAFICA alternano i
frame A/B/C con dissolvenza e zoom lento; le scene CLIP mettono gli overlay del pacchetto sulla clip animata (scena 1: la
clip hook del pacchetto). Logo ufficiale sopra il marchio di riserva dei frame. Nessun sottotitolo impresso.
    python3 strumenti/oggetti/os.py <cartella> voce    -> audio/voce.wav, audio/tempi.json
    python3 strumenti/oggetti/os.py <cartella> monta   -> <NOME>.mp4
"""
import glob, json, os, re, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
AT, PAUSA, FPS, XF = 1.12, 0.35, 30, 0.35
D = os.path.abspath(sys.argv[1])


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def dur(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout)


B = json.load(open(f'{D}/blocchi.json'))
HA_AVATAR = os.path.exists(f'{D}/avatar/avatar.webm')
SC = B['scene']



def silenzi_rms(f):
    """energia della voce in finestre di 10 ms (dB)"""
    import numpy as np
    a = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(a, np.int16).astype(float) / 32768
    n = len(x) // 160
    return 20 * np.log10(np.sqrt((x[:n * 160].reshape(n, 160) ** 2).mean(1)) + 1e-9)


def pausa_vera(db, fine, inizio):
    """Il punto di taglio fra due paragrafi: i tempi della trascrizione sbagliano di qualche decimo proprio dove le pause
    sono brevi, e il taglio a metà finiva dentro una parola. Cerca, fra 0,6 s prima della fine dell'ultima parola e 0,6 s
    dopo l'inizio della successiva, il tratto di silenzio (sotto −45 dB) più lungo e taglia al suo centro."""
    import numpy as np
    a, b = max(0, int((fine - 0.6) * 100)), min(len(db), int((inizio + 0.6) * 100))
    zitto = db[a:b] < -45
    best, cur, st = (0, None), 0, 0
    for k, z in enumerate(zitto):
        if z:
            if cur == 0: st = k
            cur += 1
            if cur > best[0]: best = (cur, st)
        else:
            cur = 0
    if best[0] >= 3:
        return (a + best[1] + best[0] / 2) / 100
    return (a + int(np.argmin(db[a:b]))) / 100


def voce():
    narr = sorted(glob.glob(f'{D}/voce_testi/*_narratore.txt'))
    solo = not narr   # video senza avatar: una sola voce su tutte le scene, testi puliti (senza tag) per contare le parole
    if solo:
        narr = sorted(glob.glob(f'{D}/sottotitoli_senza_tag/*.txt'))
    par = [[t for t in open(f).read().split() if any(c.isalnum() for c in t)] for f in narr]
    w = [x for x in json.load(open(f'{D}/audio/parole_grezzo.json'))['words'] if x.get('type', 'word') == 'word']
    if solo:   # via i tag ([warmly], [short pause]…) e i segni senza lettere (—)
        w = [x for x in w if not x['text'].startswith('[') and not x['text'].endswith(']') and any(c.isalnum() for c in x['text'])]
    assert sum(map(len, par)) == len(w), (sum(map(len, par)), len(w))
    inizi, k = [], 0
    for p in par:
        inizi.append(k); k += len(p)
    tot = dur(f'{D}/audio/narratore_grezzo.mp3')
    svolta = next((i for i, s in enumerate(SC) if any(k in s['titolo'].upper() for k in ('SVOLTA', 'BIVIO'))), None)
    x = silenzi_rms(f'{D}/audio/narratore_grezzo.mp3')
    tagli = [(pausa_vera(x, w[i - 1]['end'], w[i]['start']), PAUSA + (0.45 if j == svolta else 0)) for j, i in enumerate(inizi) if j > 0]
    pezzi, a = [], 0.0
    for t, p in tagli:
        pezzi.append((a, t, p)); a = t
    pezzi.append((a, tot, 1.5 if solo else 0.5))
    if solo:
        fil = ''.join(f'[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.01,areverse,afade=t=in:d=0.015,areverse,atempo={AT},apad=pad_dur={p}[p{k}];' for k, (a, b, p) in enumerate(pezzi))
        fil += ''.join(f'[p{k}]' for k in range(len(pezzi))) + f'concat=n={len(pezzi)}:v=0:a=1[o]'
        ff('-i', f'{D}/audio/narratore_grezzo.mp3', '-filter_complex', fil, '-map', '[o]', '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', f'{D}/audio/voce.wav')
        tempi, t = [], 0.0
        for k, (a, b, p) in enumerate(pezzi):
            d = (b - a) / AT + p; tempi.append({'id': f'S{k + 1:02d}', 'inizio': round(t, 3), 'durata': round(d, 3)}); t += d
        json.dump(tempi, open(f'{D}/audio/tempi.json', 'w'), indent=1)
        print(os.path.basename(D), ' '.join(f"{x['id']}:{x['durata']:.1f}" for x in tempi), f'totale {t:.1f}')
        return
    fil = ''.join(f'[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.01,areverse,afade=t=in:d=0.015,areverse,atempo={AT},apad=pad_dur={p}[p{k}];' for k, (a, b, p) in enumerate(pezzi))
    fil += f'[1:a]aresample=44100,aformat=channel_layouts=mono,apad=pad_dur=1.0[p{len(pezzi)}];'
    fil += ''.join(f'[p{k}]' for k in range(len(pezzi) + 1)) + f'concat=n={len(pezzi) + 1}:v=0:a=1[o]'
    ff('-i', f'{D}/audio/narratore_grezzo.mp3', '-i', f'{D}/audio/S08.wav', '-filter_complex', fil, '-map', '[o]', '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', f'{D}/audio/voce.wav')
    tempi, t = [], 0.0
    for k, (a, b, p) in enumerate(pezzi):
        d = (b - a) / AT + p; tempi.append({'id': f'S{k + 1:02d}', 'inizio': round(t, 3), 'durata': round(d, 3)}); t += d
    da = dur(f'{D}/audio/S08.wav') + 1.0
    tempi.append({'id': f'S{len(pezzi) + 1:02d}', 'inizio': round(t, 3), 'durata': round(da, 3), 'voce': round(dur(f'{D}/audio/S08.wav'), 3)})
    json.dump(tempi, open(f'{D}/audio/tempi.json', 'w'), indent=1)
    print(os.path.basename(D), ' '.join(f"{x['id']}:{x['durata']:.1f}" for x in tempi), f'totale {t + da:.1f}')



def motto_a_capo(src):
    """Il motto «al tuo fianco, una persona alla volta» del frame finale corre sotto l'avatar:
    porta «una persona alla volta» a capo, a sinistra, coprendo la riga originale col sughero (o lo sfondo) di sotto.
    La riga del motto si trova da sola (testo chiaro fra y 1650 e 1850): le serie la mettono a altezze diverse."""
    from PIL import Image, ImageFilter
    import numpy as np
    dst = src.replace('.jpg', '_av.jpg')
    if os.path.exists(dst):
        return dst
    im = Image.open(src).convert('RGB')
    chiaro = np.asarray(im.convert('L'))[1650:1850, :760] > 215
    righe = np.where(chiaro.sum(1) > 3)[0]
    if not len(righe):
        return src
    y0 = 1650 + int(righe.min())
    def piuma(w, h, f=10):
        m = Image.new('L', (w, h), 0)
        m.paste(255, (f, f, w - f, h - f))
        return m.filter(ImageFilter.GaussianBlur(f / 2))
    riga2 = im.crop((300, y0 - 20, 740, y0 + 65))
    im.paste(im.crop((300, y0 + 85, 740, min(1920, y0 + 170))).resize((440, 85)), (300, y0 - 20), piuma(440, 85))
    im.paste(riga2, (45, y0 + 37), piuma(440, 85))
    im.save(dst, quality=95)
    return dst




def taglio_avatar(webm, x0, x1):
    """inquadratura di un avatar-foto: (riga di inizio, riga di taglio, x sullo schermo, scala)"""
    from PIL import Image
    import numpy as np
    maschere, colori = [], []
    d = dur(webm)
    for k in range(6):
        f = f'{webm}_{k}.png'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-c:v', 'libvpx-vp9', '-ss', f'{0.5 + k * (d - 1) / 5:.2f}', '-i', webm,
                        '-frames:v', '1', f], check=True)
        im = Image.open(f)
        maschere.append(np.array(im.getchannel('A')) > 128)
        colori.append(np.array(im.convert('RGB')).astype(float))
        os.remove(f)
    tutto = np.any(maschere, axis=0)
    righe = np.where(tutto.any(1))[0]
    cy0 = max(0, int(righe.min()) - 40)
    tocca = [y for y in range(1080) if tutto[y].any() and (np.where(tutto[y])[0].min() <= x0 + 4 or np.where(tutto[y])[0].max() >= x1 - 5)]
    cy1 = (min(tocca) - 15) if tocca else 1080
    testa = tutto[righe.min():righe.min() + 120]
    cx = int(np.where(testa.any(0))[0].mean()) - x0
    # vestiti scuri? luminosità media del busto (dalla riga 260 sotto l'inizio della testa fino al taglio)
    r0 = int(righe.min()) + 260
    busto = np.concatenate([c[r0:cy1][m[r0:cy1]] for c, m in zip(colori, maschere)])
    scuro = bool(len(busto) and busto.mean() < 70)
    for sc in (1.3, 1.25, 1.2, 1.15, 1.1, 1.05, 1.0, 0.9, 0.8):
        w, h = round((x1 - x0) * sc), round((cy1 - cy0) * sc)
        X = int(870 - cx * sc); Y = 1920 - h
        ok = True
        for m in maschere:
            a = np.array(Image.fromarray(m[cy0:cy1, x0:x1].astype(np.uint8) * 255).resize((w, h))) > 60
            ys, xs = np.where(a); sx = xs + X; sy = ys + Y
            if ((sx <= 659) & (sy <= 1637)).any() or ((sx <= 480) & (sy >= 1700)).any():
                ok = False; break
        if ok:
            return cy0, cy1, X, sc, scuro
    return cy0, cy1, 665, 0.8, scuro


def monta():
    tempi = json.load(open(f'{D}/audio/tempi.json')); L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
    nome = re.sub(r'[^\w]+', '_', B['titolo']).strip('_')
    nome = os.path.basename(D).replace('pdro-os-', 'PDRO_Oggetti_smarriti_').replace('-', '_')
    pezzi = []
    for i, (s, t) in enumerate(zip(SC, tempi)):
        sid = f'S{i + 1:02d}'; d = t['durata'] + (XF if i + 1 < len(SC) else 0)
        fr = s['frame']; out = f'{L}/{sid}.mp4'; n = len(fr); sd = d / n
        ins, fil = [], []
        if s['tipo'].startswith('CLIP'):
            hk = sorted(glob.glob(f'{D}/clip/hook_*.mp4'))
            c = hk[0] if i == 0 and hk else f'{D}/clip2/{sid}.mp4'
            k = max(1.0, d / (dur(c) - 0.05))
            ins += ['-i', c]
            fil.append(f'[0:v]setpts=PTS*{k:.4f},fps={FPS},scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,'
                       f"zoompan=z='min(1.0+0.0004*on,1.08)':d=1:s=1080x1920:fps={FPS},trim=0:{d:.3f},setpts=PTS-STARTPTS,format=yuv420p[b]")
            acc = 'b'
            for j, f in enumerate(fr):
                ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', f'{D}/overlay_clip/{f}.png']
                a0, a1 = j * sd, (j + 1) * sd if j + 1 < n else d
                fil.append(f"[{j + 1}:v]format=rgba,fade=in:st={max(0, a0 - 0.05):.3f}:d=0.3:alpha=1[o{j}];[{acc}][o{j}]overlay=0:0:shortest=1:enable='between(t,{a0:.3f},{a1:.3f})'[a{j}]")
                acc = f'a{j}'
        else:
            for j, f in enumerate(fr):
                ln = sd + (XF if j + 1 < n else 0)
                img = f'{D}/grafiche/{f}.jpg'
                if HA_AVATAR and f in SC[-1]['frame']:
                    img = motto_a_capo(img)
                ins += ['-framerate', str(FPS), '-loop', '1', '-t', f'{ln:.3f}', '-i', img]
                zz = "1" if s is SC[-1] else "min(1.05\\,1.0+0.00025*on)"  # la scena finale resta ferma: il motto in basso non deve uscire dal quadro
                fil.append(f"[{j}:v]scale=1080:1920,setsar=1,zoompan=z='{zz}':x='225*(1-1/zoom)':y='130*(1-1/zoom)':d=1:s=1080x1920:fps={FPS},"
                           f'trim=0:{ln:.3f},setpts=PTS-STARTPTS,format=yuv420p[f{j}]')
            if n == 1:
                fil.append('[f0]null[a]')
            else:
                acc, off = 'f0', sd
                for j in range(1, n):
                    fil.append(f'[{acc}][f{j}]xfade=transition=fade:duration={XF}:offset={off:.3f}[x{j}]'); acc = f'x{j}'; off += sd
                fil.append(f'[{acc}]null[a]')
            acc = 'a'
        fil.append(f'[{acc}]format=yuv420p[v]')
        ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-t', f'{d:.3f}', '-r', str(FPS), '-c:v', 'libx264', '-crf', '17', '-pix_fmt', 'yuv420p', out)
        pezzi.append((out, t['durata']))
    # catena con dissolvenze
    ins = sum([['-i', p] for p, _ in pezzi], []); fil, acc, off = [], '0:v', 0.0
    for i in range(1, len(pezzi)):
        off += pezzi[i - 1][1]; fil.append(f'[{acc}][{i}:v]xfade=transition=fade:duration={XF}:offset={off:.3f}[x{i}]'); acc = f'x{i}'
    tot = sum(x for _, x in pezzi); ult = tempi[-1]
    n = len(pezzi)
    if HA_AVATAR:
        ins += ['-loop', '1', '-i', f'{QUI}/logo_card.png', '-itsoffset', f"{ult['inizio']:.3f}", '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar.webm', '-i', f'{D}/audio/voce.wav']
    else:   # video senza avatar: segnaposto trasparente al posto del webm, così gli indici degli ingressi restano gli stessi
        ins += ['-loop', '1', '-i', f'{QUI}/logo_card.png', '-f', 'lavfi', '-i', 'color=black@0:s=16x16:d=1', '-i', f'{D}/audio/voce.wav']
    fil.append(f'[{acc}][{n}:v]overlay=0:0:shortest=1[l1]')
    cornice_in = None
    if not HA_AVATAR:
        fil.append('[l1]format=yuv420p[v]')
    else:
        t0 = ult['inizio']
        # mezzo busto intero, spalle fuori dal bordo destro. Per integrarlo nella bacheca: tono scaldato verso il sughero,
        # ombra scura e morbida proiettata in basso a sinistra (come le foto e i fogli appuntati) e un ingresso che sale dal fondo.
        # dove sta l'avatar nel webm: il gemello digitale riempie il quadro (busto x 440-1530), un avatar-foto è un ritratto
        # stretto con le maniche tagliate dritte ai bordi della foto
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-c:v', 'libvpx-vp9', '-ss', '3', '-i', f'{D}/avatar/avatar.webm',
                        '-frames:v', '1', f'{D}/avatar/_fotogramma.png'], check=True)
        from PIL import Image
        import numpy as np
        alfa = np.array(Image.open(f'{D}/avatar/_fotogramma.png').getchannel('A'))
        os.remove(f'{D}/avatar/_fotogramma.png')
        col = np.where((alfa > 128).sum(0) > 20)[0]
        x0, x1 = int(col.min()), int(col.max()) + 1
        cornice_in = None
        sale0 = f"max(0\\,60*(1-(t-{t0:.3f})/0.5))"
        if x1 - x0 > 900:
            # gemello digitale: mezzo busto intero, spalle fuori dal bordo destro, ombra sul fondo
            fil.append(f'[{n + 1}:v]fps={FPS},format=rgba,crop=1090:min(1080\\,ih):440:0,scale=-2:700:flags=lanczos,'
                       f'colorchannelmixer=rr=1.03:gg=1.0:bb=0.94,fade=in:st={t0:.3f}:d=0.45:alpha=1,split[av][om]')
            fil.append('[om]lutrgb=r=20:g=12:b=6,boxblur=luma_radius=22:alpha_radius=22,colorchannelmixer=aa=0.55[al]')
            fil.append(f"[l1][al]overlay=x=536:y='1234+{sale0}':eval=frame:eof_action=pass[l2];"
                       f"[l2][av]overlay=x=560:y='1220+{sale0}':eval=frame:eof_action=pass,format=yuv420p[v]")
        else:
            # avatar-foto (15/11, Achille: niente cornice, avatar integrato). Il ritratto è stretto e il corpo tocca i bordi
            # della foto da una certa altezza in giù (le spalle): si misura su più fotogrammi, si taglia 15 px sopra e si
            # mostra testa e spalle scontornate, col taglio sul bordo basso dello schermo. Scala: la più grande (fino a 1,3)
            # che non tocca la card dei contatti (x <= 659, y <= 1637) né il motto (x <= 480, y >= 1700); testa a x ≈ 870.
            cy0, cy1, X, k, scuro = taglio_avatar(f'{D}/avatar/avatar.webm', x0, x1)
            w, h = round((x1 - x0) * k / 2) * 2, round((cy1 - cy0) * k / 2) * 2
            Y = 1920 - h
            fil.append(f'[{n + 1}:v]fps={FPS},format=rgba,crop={x1 - x0}:{cy1 - cy0}:{x0}:{cy0},scale={w}:{h}:flags=lanczos,'
                       f'colorchannelmixer=rr=1.03:gg=1.0:bb=0.94,fade=in:st={t0:.3f}:d=0.45:alpha=1,split[av][om]')
            # vestiti scuri su fondo scuro: alone chiaro e tenue dietro la figura invece dell'ombra
            alone = 'lutrgb=r=235:g=228:b=215,boxblur=luma_radius=26:alpha_radius=26,colorchannelmixer=aa=0.35' if scuro else \
                    'lutrgb=r=20:g=12:b=6,boxblur=luma_radius=22:alpha_radius=22,colorchannelmixer=aa=0.55'
            dx, dy = (0, 0) if scuro else (-24, 14)
            fil.append(f'[om]{alone}[al]')
            fil.append(f"[l1][al]overlay=x={X + dx}:y='{Y + dy}+{sale0}':eval=frame:eof_action=pass[l2];"
                       f"[l2][av]overlay=x={X}:y='{Y}+{sale0}':eval=frame:eof_action=pass,format=yuv420p[v]")
    # audio: voce, musica (−22 dB, più aperta dalla svolta), effetti del pacchetto
    T = {x['id']: x for x in tempi}
    ev = []
    sv = next((f'S{i + 1:02d}' for i, s in enumerate(SC) if any(k in s['titolo'].upper() for k in ('SVOLTA', 'BIVIO'))), None)
    def scena(i):
        return f'S{i:02d}'
    for i, s in enumerate(SC):
        sid = scena(i + 1); r = s.get('regia', '').lower(); t0 = T[sid]['inizio']; dd = T[sid]['durata']; nf = len(s['frame'])
        if 'timbro' in r:
            ev.append(('timbro', t0 + dd * (nf - 1) / nf + 0.4, 0.6))
        if 'macchina da scrivere' in r:
            ev.append(('macchina', t0 + 0.3, 0.35))
        if 'notifica' in r:
            for j in range(nf):
                ev.append(('notifica', t0 + dd * j / nf + 0.3, 0.45))
    if sv:
        ev.append(('riser', T[sv]['inizio'] - 1.2, 0.35))
    # effetti propri del progetto: suoni/eventi.json = [[nome, scena, secondi dall'inizio della scena, volume], ...]
    if os.path.exists(f'{D}/suoni/eventi.json'):
        for k, sc_, dt, v in json.load(open(f'{D}/suoni/eventi.json')):
            ev.append((k, T[sc_]['inizio'] + dt, v))
    m0 = T[sv]['inizio'] if sv else tot
    vol = f"'0.09+0.05*gte(t,{m0:.2f})'"
    au = [f'[{n + 2}:a]aformat=channel_layouts=stereo[vo]', f'[{n + 3}:a]aloop=loop=-1:size=2e9,atrim=0:{tot:.3f},volume={vol}:eval=frame,afade=t=out:st={tot - 2.5:.3f}:d=2.5[mu]']
    ins += ['-i', f'{D}/suoni/musica.mp3' if os.path.exists(f'{D}/suoni/musica.mp3') else f'{QUI}/suoni/musica.mp3']
    mix = ['[vo]', '[mu]']
    for j, (k, t, v) in enumerate(ev):
        ins += ['-i', f'{D}/suoni/{k}.mp3' if os.path.exists(f'{D}/suoni/{k}.mp3') else f'{QUI}/suoni/{k}.mp3']; q = n + 4 + j
        au.append(f'[{q}:a]aformat=channel_layouts=stereo,volume={v},adelay={int(t * 1000)}|{int(t * 1000)}[e{j}]'); mix.append(f'[e{j}]')
    au.append(''.join(mix) + f'amix=inputs={len(mix)}:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11[au]')
    if cornice_in:
        nin = ins.count('-i'); ins += ['-loop', '1', '-i', cornice_in]
        fil = [x.replace('QCORNICE', str(nin)) for x in fil]
    ff(*ins, '-filter_complex', ';'.join(fil + au), '-map', '[v]', '-map', '[au]', '-t', f'{tot:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'{D}/{nome}.mp4')
    for p, _ in pezzi:
        os.remove(p)
    os.rmdir(L)
    print('montato', nome, f'{tot:.2f} s', len(ev), 'effetti')


if __name__ == '__main__':
    {'voce': voce, 'monta': monta}[sys.argv[2]]()
