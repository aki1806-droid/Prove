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
SC = B['scene']


def voce():
    narr = sorted(glob.glob(f'{D}/voce_testi/*_narratore.txt'))
    par = [open(f).read().split() for f in narr]
    w = [x for x in json.load(open(f'{D}/audio/parole_grezzo.json'))['words'] if x.get('type', 'word') == 'word']
    assert sum(map(len, par)) == len(w), (sum(map(len, par)), len(w))
    inizi, k = [], 0
    for p in par:
        inizi.append(k); k += len(p)
    tot = dur(f'{D}/audio/narratore_grezzo.mp3')
    svolta = next((i for i, s in enumerate(SC) if 'SVOLTA' in s['titolo'].upper()), None)
    tagli = [((w[i - 1]['end'] + w[i]['start']) / 2, PAUSA + (0.45 if j == svolta else 0)) for j, i in enumerate(inizi) if j > 0]
    pezzi, a = [], 0.0
    for t, p in tagli:
        pezzi.append((a, t, p)); a = t
    pezzi.append((a, tot, 0.5))
    fil = ''.join(f'[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,atempo={AT},apad=pad_dur={p}[p{k}];' for k, (a, b, p) in enumerate(pezzi))
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
    porta «una persona alla volta» a capo, a sinistra, coprendo la riga originale col sughero di sotto."""
    from PIL import Image, ImageFilter
    dst = src.replace('.jpg', '_av.jpg')
    if os.path.exists(dst):
        return dst
    im = Image.open(src).convert('RGB')
    def piuma(w, h, f=10):
        m = Image.new('L', (w, h), 0)
        m.paste(255, (f, f, w - f, h - f))
        return m.filter(ImageFilter.GaussianBlur(f / 2))
    riga2 = im.crop((300, 1695, 740, 1780))
    im.paste(im.crop((300, 1800, 740, 1885)), (300, 1695), piuma(440, 85))
    im.paste(riga2, (45, 1752), piuma(440, 85))
    im.save(dst, quality=95)
    return dst


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
            c = f'{D}/clip/hook_01.mp4' if i == 0 and os.path.exists(f'{D}/clip/hook_01.mp4') else f'{D}/clip2/{sid}.mp4'
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
                if f.startswith('S08'):
                    img = motto_a_capo(img)
                ins += ['-framerate', str(FPS), '-loop', '1', '-t', f'{ln:.3f}', '-i', img]
                fil.append(f"[{j}:v]scale=1080:1920,setsar=1,zoompan=z='1.0+0.00025*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps={FPS},"
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
    ins += ['-loop', '1', '-i', f'{QUI}/logo_card.png', '-itsoffset', f"{ult['inizio']:.3f}", '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar.webm', '-i', f'{D}/audio/voce.wav']
    fil.append(f'[{acc}][{n}:v]overlay=0:0:shortest=1[l1]')
    fil.append(f'[{n + 1}:v]fps={FPS},format=rgba,crop=1090:min(1080\\,ih):440:0,scale=-2:700:flags=lanczos,split[av][om]')
    # mezzo busto intero (le spalle escono dal bordo destro, non da un taglio interno) con un alone chiaro che lo stacca dal sughero
    fil.append('[om]lutrgb=r=255:g=255:b=255,boxblur=luma_radius=16:alpha_radius=16,colorchannelmixer=aa=0.6[al]')
    fil.append(f'[l1][al]overlay=560:1220:eof_action=pass[l2];[l2][av]overlay=560:1220:eof_action=pass,format=yuv420p[v]')
    # audio: voce, musica (−22 dB, più aperta dalla svolta), effetti del pacchetto
    T = {x['id']: x for x in tempi}
    ev = []
    sv = next((f'S{i + 1:02d}' for i, s in enumerate(SC) if 'SVOLTA' in s['titolo'].upper()), None)
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
    m0 = T[sv]['inizio'] if sv else tot
    vol = f"'0.09+0.05*gte(t,{m0:.2f})'"
    au = [f'[{n + 2}:a]aformat=channel_layouts=stereo[vo]', f'[{n + 3}:a]aloop=loop=-1:size=2e9,atrim=0:{tot:.3f},volume={vol}:eval=frame,afade=t=out:st={tot - 2.5:.3f}:d=2.5[mu]']
    ins += ['-i', f'{QUI}/suoni/musica.mp3']
    mix = ['[vo]', '[mu]']
    for j, (k, t, v) in enumerate(ev):
        ins += ['-i', f'{QUI}/suoni/{k}.mp3']; q = n + 4 + j
        au.append(f'[{q}:a]aformat=channel_layouts=stereo,volume={v},adelay={int(t * 1000)}|{int(t * 1000)}[e{j}]'); mix.append(f'[e{j}]')
    au.append(''.join(mix) + f'amix=inputs={len(mix)}:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11[au]')
    ff(*ins, '-filter_complex', ';'.join(fil + au), '-map', '[v]', '-map', '[au]', '-t', f'{tot:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'{D}/{nome}.mp4')
    for p, _ in pezzi:
        os.remove(p)
    os.rmdir(L)
    print('montato', nome, f'{tot:.2f} s', len(ev), 'effetti')


if __name__ == '__main__':
    {'voce': voce, 'monta': monta}[sys.argv[2]]()
