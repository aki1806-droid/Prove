"""Video di lancio di «Eredità Invisibili» (pacchetto Eredita_Invisibili_VIDEO_LANCIO, 14/11/2026): voce, tempi, montaggio.
Voce ElevenLabs diretto (scelta di Achille), «Achille nuovo 1» KerPEYZvLEWNATg4AARX, eleven_v4 (regola del canale, non
eleven_multilingual_v2 del brief), una passata sola (flow N0YZ2MwkWYIrxhvx87ih); tempi delle parole dalla trascrizione
Scribe (audio/parole_grezzo.json). Le undici scene si tagliano sui confini dei paragrafi, si accelerano con atempo 1,12
(ElevenLabs diretto) e si rimettono in fila con pause fisse; la scena 4 tiene due secondi di silenzio, la 11 altri due
per il cartello finale.
    python3 strumenti/eredita/lancio.py voce      -> audio/voce.wav, audio/tempi.json, audio/parole.json
    node strumenti/eredita/lancio.mjs            -> testi/*.png
    python3 strumenti/eredita/lancio.py monta     -> Eredita_Invisibili_lancio.mp4, copertina_reel.jpg
"""
import json, os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'ei-v01-lancio')
AT = 1.12
# prima e ultima parola di ogni scena (indici nella trascrizione) e pausa dopo la scena
PRIME = ['Un', 'Aveva', 'Per', 'Mentre', 'I', 'Un', 'Un', 'Non', 'Questo', 'Si', 'Quelle']
PAUSE = [0.7, 0.6, 0.7, 2.0, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 2.2]


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def scene_grezze():
    w = json.load(open(f'{D}/audio/parole_grezzo.json'))['words']
    w = [x for x in w if x.get('type', 'word') == 'word']
    # i confini sono le parole che aprono i paragrafi, cercate in ordine
    inizi, k = [], 0
    for p in PRIME:
        while w[k]['text'].strip('.,:') != p:
            k += 1
        inizi.append(k); k += 1
    out = []
    for i, a in enumerate(inizi):
        b = (inizi[i + 1] if i + 1 < len(inizi) else len(w)) - 1
        out.append((w[a:b + 1], w[a]['start'], w[b]['end']))
    return out


def voce():
    sc = scene_grezze(); t0 = 0.0; tempi, parole, pezzi = [], {}, []
    for i, (ww, a, b) in enumerate(sc):
        a0, b0 = max(0, a - 0.06), b + 0.12
        f = f'{D}/audio/_s{i + 1:02d}.wav'
        ff('-ss', f'{a0:.3f}', '-to', f'{b0:.3f}', '-i', f'{D}/audio/grezzo.mp3', '-af', f'atempo={AT},apad=pad_dur={PAUSE[i]}',
           '-ar', '44100', '-ac', '1', f)
        d = (b0 - a0) / AT + PAUSE[i]
        sid = f'S{i + 1:02d}'
        tempi.append({'id': sid, 'inizio': round(t0, 3), 'durata': round(d, 3)})
        parole[sid] = [{'w': x['text'], 'a': round((x['start'] - a0) / AT, 3), 'b': round((x['end'] - a0) / AT, 3)} for x in ww]
        pezzi.append(f); t0 += d
    open(f'{D}/audio/lista.txt', 'w').write(''.join(f"file '{p}'\n" for p in pezzi))
    ff('-f', 'concat', '-safe', '0', '-i', f'{D}/audio/lista.txt', '-c:a', 'pcm_s16le', f'{D}/audio/voce.wav')
    for p in pezzi:
        os.remove(p)
    json.dump(tempi, open(f'{D}/audio/tempi.json', 'w'), indent=1)
    json.dump(parole, open(f'{D}/audio/parole.json', 'w'), ensure_ascii=False, indent=0)
    print(' '.join(f"{t['id']}:{t['durata']:.1f}" for t in tempi), f'totale {t0:.1f}')


XF = 0.4      # dissolvenza fra le scene
FPS = 30
GRADO = 'eq=contrast=1.03:saturation=0.92:brightness=-0.02'   # la grana è già nelle clip: quella aggiunta pesava 400 MB


def t_parola(par, sid, w, n=1):
    k = 0
    for x in par[sid]:
        if x['w'].strip('.,:;?!').lower() == w.lower():
            k += 1
            if k == n:
                return x['a']
    raise KeyError(f'{sid} {w}#{n}')


def monta():
    tempi = {t['id']: t for t in json.load(open(f'{D}/audio/tempi.json'))}; par = json.load(open(f'{D}/audio/parole.json'))
    T = lambda s, w, n=1: t_parola(par, s, w, n)
    C, Q = f'{D}/clip', f'{D}/testi'
    # segmenti: (durata, [(clip, da, a)], [(png, inizio)])  — scene 1 e 2 sulla stessa inquadratura, 10 e 11 la copertina
    d = lambda *ss: sum(tempi[s]['durata'] for s in ss)
    p3 = T('S03', 'Poi'); p5 = T('S05', 'Ciò', 1)
    SEG = [
        (d('S01', 'S02'), [('c1', None)], [('q1a', T('S01', 'Papà')), ('q1b', T('S01', 'Devi', 2))]),
        (d('S03'), [('c3a', p3 - 0.2), ('c3b', None)], []),
        (d('S04'), [('nero', None)], [('q4', 0.15)]),
        (d('S05'), [('c5a', p5 - 0.3), ('c5b', None)], [('q5a', T('S05', 'ciò')), ('q5b', p5), ('q5c', T('S05', 'Ciò', 2))]),
        (d('S06'), [('c6', None)], [('q6', T('S06', 'Domani'))]),
        (d('S07'), [('c7', None)], [('q7', T('S07', 'Ti'))]),
        (d('S08'), [('c8', None)], [('q8', T('S08', 'Dobbiamo'))]),
        (d('S09'), [('c9', None)], []),
        (d('S10', 'S11'), [('copertina', None)], []),
    ]
    os.makedirs(f'{D}/montaggio', exist_ok=True); pezzi = []
    for i, (dur, clips, testi) in enumerate(SEG):
        L = dur + (XF if i + 1 < len(SEG) else 0)          # la dissolvenza si mangia XF secondi del segmento dopo
        out = f'{D}/montaggio/seg{i:02d}.mp4'
        if clips[0][0] == 'copertina':
            ff('-i', f'{Q}/copertina.mp4', '-vf', f'fps={FPS},tpad=stop_mode=clone:stop_duration=1', '-t', f'{L:.3f}', '-c:v', 'libx264',
               '-crf', '16', '-pix_fmt', 'yuv420p', out); pezzi.append(out); continue
        # sottoscene: la prima clip fino al taglio, l'ultima fino alla fine, ognuna rallentata quanto serve
        sub, t0 = [], 0.0
        for k, (c, fine) in enumerate(clips):
            sd = (fine if fine is not None else L) - t0; t0 += sd
            sub.append((c, sd + (XF if k + 1 < len(clips) else 0)))   # la dissolvenza interna si mangia XF secondi
        ins, fil = [], []
        for k, (c, sd) in enumerate(sub):
            if c == 'nero':
                ins += ['-f', 'lavfi', '-i', f'color=c=0x05101a:s=1080x1920:r={FPS}:d={sd:.3f}']
                fil.append(f'[{k}:v]format=yuv420p,setsar=1[v{k}]')
            else:
                dc = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{C}/{c}.mp4'],
                                          capture_output=True, text=True).stdout)
                ins += ['-i', f'{C}/{c}.mp4']
                fil.append(f'[{k}:v]setpts=PTS*{max(1.0, sd / (dc - 0.05)):.4f},fps={FPS},scale=1080:1920:force_original_aspect_ratio=increase,'
                           f'crop=1080:1920,{GRADO},trim=0:{sd:.3f},setpts=PTS-STARTPTS,format=yuv420p,setsar=1[v{k}]')
        n = len(sub)
        if n == 1:
            fil.append('[v0]null[b]')
        else:   # tagli morbidi anche dentro la scena
            acc, off = 'v0', sub[0][1] - XF
            for k in range(1, n):
                fil.append(f'[{acc}][v{k}]xfade=transition=fade:duration={XF}:offset={off:.3f}[x{k}]'); acc = f'x{k}'; off += sub[k][1] - XF
            fil.append(f'[{acc}]null[b]')
        acc = 'b'
        for j, (png, t) in enumerate(testi):
            ins += ['-loop', '1', '-t', f'{L:.3f}', '-i', f'{Q}/{png}.png']
            fil.append(f'[{n + j}:v]format=rgba,fade=in:st={max(0, t - 0.1):.3f}:d=0.6:alpha=1[t{j}];[{acc}][t{j}]overlay=0:0:shortest=1[o{j}]')
            acc = f'o{j}'
        fil.append(f'[{acc}]format=yuv420p[v]')
        ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-t', f'{L:.3f}', '-r', str(FPS), '-c:v', 'libx264', '-crf', '16', out)
        pezzi.append(out)
    # catena di dissolvenze fra i segmenti
    ins = sum([['-i', p] for p in pezzi], []); fil, acc, off = [], '0:v', 0.0
    for i in range(1, len(pezzi)):
        off += SEG[i - 1][0]
        fil.append(f'[{acc}][{i}:v]xfade=transition=fade:duration={XF}:offset={off:.3f}[x{i}]'); acc = f'x{i}'
    tot = sum(s[0] for s in SEG)
    # musica: pianoforte (mus_cv2) 18 dB sotto la voce, più presente su S04 e sulla copertina, dissolvenza finale di 2 s
    mus = f'{QUI}/../halloween/sfx_cache/mus_cv2.mp3'
    a4, b4 = tempi['S04']['inizio'], tempi['S04']['inizio'] + tempi['S04']['durata']; c0 = tempi['S10']['inizio']
    vol = f"'0.10+0.10*between(t,{a4:.2f},{b4:.2f})+0.08*gte(t,{c0:.2f})'"
    fil.append(f'[{acc}]format=yuv420p[v];[{len(pezzi)}:a]aformat=channel_layouts=stereo[vo];'
               f'[{len(pezzi) + 1}:a]aloop=loop=-1:size=2e9,atrim=0:{tot:.3f},volume={vol}:eval=frame,afade=t=out:st={tot - 2:.3f}:d=2[mu];'
               f'[vo][mu]amix=inputs=2:duration=longest:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]')
    ff(*ins, '-i', f'{D}/audio/voce.wav', '-i', mus, '-filter_complex', ';'.join(fil), '-map', '[v]', '-map', '[a]', '-t', f'{tot:.3f}',
       '-r', str(FPS), '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
       '-map_metadata', '-1', '-metadata', 'title=Eredità Invisibili', '-metadata', 'artist=Achille Pagliaro',
       '-movflags', '+faststart', f'{D}/Eredita_Invisibili_lancio.mp4')
    # copertina del reel: la scena 4 (la frase) a metà
    ff('-ss', f'{a4 + 2:.2f}', '-i', f'{D}/Eredita_Invisibili_lancio.mp4', '-frames:v', '1', '-q:v', '2', f'{D}/copertina_reel.jpg')
    print('montato', f'{tot:.2f} s')


if __name__ == '__main__':
    {'voce': voce, 'monta': monta}[sys.argv[1]]()
