"""Montaggio del promo «Kit Contratto» 9:16 con l'avatar (1080x1920, 30 fps come le scene del pacchetto).

    python3 strumenti/kit/monta.py

Le sei scene del pacchetto (scene/sN.mp4, mute, già con clip, titoli, grafiche animate e logo) restano quelle; ognuna
dura quanto la sua scena o, se la voce nuova è più lunga, quanto la voce (la scena si rallenta di poco). La voce
(audio/wav/SNN.wav, voci.py) parte all'inizio di ogni scena. Avatar di Achille scontornato in basso a destra nelle scene
1 e 6 (avatar/avatar.webm, fatto sulle due voci in fila, tempi-avatar.json), come chiede il LEGGIMI del pacchetto.
Sottotitoli impressi come nel promo del pacchetto (bianco su riquadro nero), alzati nelle scene con l'avatar perché
non ci finisca sopra; anche sottotitoli.srt a parte.
"""
import json, os, re, subprocess

QUI = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-kit-contratto-promo')
L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
FPS = 30
NOME = 'KitContratto_promo_avatar_9x16'
AV_CROP, AV_H, AV_X = (520, 0, 1100, 1080), 560, 754
CON_AVATAR = {'S01', 'S06'}
SUB_Y = {False: 1700, True: 1335}          # fondo del riquadro dei sottotitoli
MAXR = 30                                   # caratteri per riga


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def righe(testo):
    """Al massimo due righe di MAXR caratteri, spezzate alla parola più vicina a metà."""
    if len(testo) <= MAXR:
        return testo
    p = testo.split(); best = min(range(1, len(p)), key=lambda k: abs(len(' '.join(p[:k])) - len(testo) / 2))
    return ' '.join(p[:best]) + r'\N' + ' '.join(p[best:])


def pezzi(parole):
    """Frasi della scena: si chiude a . ? … : e oltre 2·MAXR caratteri alla virgola più vicina a metà."""
    out, cur = [], []
    for w in parole:
        cur.append(w)
        if re.search(r'[.?!…:]$', w['w']):
            out.append(cur); cur = []
    if cur:
        out.append(cur)
    fin = []
    for c in out:
        t = ' '.join(w['w'] for w in c)
        if len(t) > 2 * MAXR:
            virg = [i for i, w in enumerate(c[:-1]) if w['w'].endswith(',')]
            if virg:
                k = min(virg, key=lambda i: abs(len(' '.join(w['w'] for w in c[:i + 1])) - len(t) / 2)) + 1
                fin += [c[:k], c[k:]]; continue
        fin.append(c)
    return fin


def tc(t, ass=True):
    if ass:
        return f'{int(t // 3600)}:{int(t // 60 % 60):02d}:{t % 60:05.2f}'
    ms = int(round(t * 1000)); return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'


def monta():
    tempi = json.load(open(f'{D}/audio/tempi-scene.json'))
    parole = json.load(open(f'{D}/audio/parole.json'))
    tav = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-avatar.json'))}
    lista, t0, ev, srt, inizio = [], 0.0, [], [], {}
    for i, t in enumerate(tempi, 1):
        sid, v = t['id'], t['durata']; src = f'{D}/scene/s{i}.mp4'; d0 = durata(src); d = max(d0, v)
        f = d / d0; out = f'{L}/{sid}.mp4'; inizio[sid] = t0
        ff('-i', src, '-i', f'{D}/audio/wav/{sid}.wav', '-filter_complex',
           f'[0:v]setpts={f:.5f}*PTS,fps={FPS},format=yuv420p[v];[1:a]aresample=48000,apad[a]',
           '-map', '[v]', '-map', '[a]', '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium',
           '-c:a', 'pcm_s16le', '-ar', '48000', '-ac', '1', out)
        lista.append(out)
        y = SUB_Y[sid in CON_AVATAR]
        for c in pezzi(parole[sid]):
            a, b = t0 + c[0]['a'] - 0.05, t0 + c[-1]['b'] + 0.25
            testo = ' '.join(w['w'] for w in c)
            ev.append(f'Dialogue: 0,{tc(a)},{tc(b)},S,,0,0,0,,{{\\an2\\pos(540,{y})}}{righe(testo)}')
            srt.append((a, b, righe(testo).replace(r'\N', '\n')))
        t0 += d
    open(f'{L}/lista.txt', 'w').write(''.join(f"file '{p}'\n" for p in lista))
    ff('-f', 'concat', '-safe', '0', '-i', f'{L}/lista.txt', '-c:v', 'copy', '-c:a', 'pcm_s16le', f'{L}/fondo.mov')
    # sottotitoli: ASS impresso + SRT a parte
    open(f'{L}/sub.ass', 'w').write(
        '[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\nWrapStyle: 2\n\n[V4+ Styles]\n'
        'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, '
        'Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, '
        'MarginR, MarginV, Encoding\n'
        'Style: S,Inter SemiBold,50,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,3,14,0,2,60,60,0,1\n'
        '\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n' + '\n'.join(ev) + '\n')
    open(f'{D}/sottotitoli.srt', 'w').write(''.join(f'{k}\n{tc(a, False)} --> {tc(b, False)}\n{x}\n\n'
                                                  for k, (a, b, x) in enumerate(srt, 1)))
    # avatar: un pezzo per scena, ognuno all'inizio della sua scena
    cx, cy, cw, ch = AV_CROP; fil, ins = [], []
    for k, sid in enumerate(sorted(CON_AVATAR)):
        a = tav[sid]
        ins += ['-ss', f"{a['inizio']:.3f}", '-t', f"{a['durata']:.3f}", '-itsoffset', f'{inizio[sid]:.3f}',
                '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar.webm']
        fil.append(f"[{k + 1}:v]fps={FPS},format=rgba,crop={cw}:{ch}:{cx}:{cy},scale=-2:{AV_H}:flags=lanczos,split[av{k}][om{k}];"
                   f"[om{k}]lutrgb=r=255:g=255:b=255,boxblur=luma_radius=14:alpha_radius=14,colorchannelmixer=aa=0.55[al{k}]")
    cat = '[0:v]'
    for k in range(len(CON_AVATAR)):
        cat_new = f'[x{k}]'
        fil.append(f'{cat}[al{k}]overlay={AV_X}:{1920 - AV_H}:eof_action=pass[g{k}];'
                   f'[g{k}][av{k}]overlay={AV_X}:{1920 - AV_H}:eof_action=pass{cat_new}')
        cat = cat_new
    fil.append(f"{cat}subtitles={L}/sub.ass,format=yuv420p[v]")
    ff('-i', f'{L}/fondo.mov', *ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-map', '0:a',
       '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart',
       f'{D}/{NOME}.mp4')
    print('montato', NOME, f'{t0:.1f} s')


if __name__ == '__main__':
    monta()
