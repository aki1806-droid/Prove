"""Montaggio dei reel e short «Eredità Invisibili» (9:16, 1080x1920, 25 fps), dal PIANO_MONTAGGIO.json del pacchetto.

    python3 strumenti/eredita/monta.py ei-r01-credevo-di-crescerli [prova]

Ogni scena dura quanto la sua voce (audio/tempi-scene.json, voci.py); le slide parlate almeno l'85% della stima del piano,
quelle mute (tavola capitolo, chiusura) quanto la stima. Tra le scene solo dissolvenze incrociate (XF), come chiede il
pacchetto: ogni scena si allunga di XF in coda e la successiva le parte sopra, così la voce resta al suo posto.
  avatar  pezzo di avatar/avatar.mp4 (un video per progetto con le scene parlate in fila, audio/tempi-avatar.json),
          a piena inquadratura e mai scontornato
  img     immagini/<nome>.png con Ken Burns lento (zoom massimo 8%), verso dal campo «movimento» del piano
  clip    clip/<nome>.mp4 adattata a 9:16, rallentata se è più corta della scena
  slide   la tavola del pacchetto con un respiro di zoom del 3%
Sovrimpressioni del pacchetto (PNG trasparenti) con dissolvenza di 0,3 s. Sottotitoli impressi in Jost avorio con ombra,
spenti sulle slide, con il fondo a SUB_Y (dentro la zona libera 250-1500 px). Niente musica: la aggiunge Achille.
Con «prova» monta anche senza immagini e clip (al loro posto un fondo notte con il nome del file mancante).
"""
import json, os, re, subprocess, sys
from PIL import Image

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
FPS, W, H, XF = 25, 1080, 1920, 0.5
NOTTE = '0x0B1A2E'
SUB_Y = 1480
GIU = 110            # l'avatar scende di tanto nel quadro
VOLTO = (330 + GIU, 1000)     # fascia del volto nel look verticale «Aki in his studio»: le scritte lì sopra salgono a SOPRA
SOPRA = 255
SFUMA = os.path.join(QUI, 'sfuma_alto.png')
BASSO = os.path.join(QUI, 'sfuma_basso.png')
MAXR = 28
# sovrimpressioni: scena -> [(file, da, a)] in secondi dall'inizio della scena (a=None: fino alla fine)
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
# silenzio prima della voce di una scena (R02 S04: «pausa di 1 s prima della frase»)
PRIMA = {('ei-r02-un-sasso-in-tasca', 'S04'): 1.0}


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


def righe(testo):
    if len(testo) <= MAXR:
        return testo
    p = testo.split(); k = min(range(1, len(p)), key=lambda k: abs(len(' '.join(p[:k])) - len(testo) / 2))
    return ' '.join(p[:k]) + r'\N' + ' '.join(p[k:])


def frasi(parole):
    out, cur = [], []
    for w in parole:
        cur.append(w)
        if re.search(r'[.?!…:]$', w['w']) or (len(' '.join(x['w'] for x in cur)) > 2 * MAXR - 8 and w['w'].endswith(',')):
            out.append(cur); cur = []
    if cur:
        out.append(cur)
    return out


def tc(t):
    return f'{int(t // 3600)}:{int(t // 60 % 60):02d}:{t % 60:05.2f}'


def monta(nome, prova=False):
    D = f'{PR}/{nome}'; L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
    piano = json.load(open(f'{D}/PIANO_MONTAGGIO.json'))
    voce = {t['id']: t['durata'] for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    parole = json.load(open(f'{D}/audio/parole.json'))
    tav = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-avatar.json'))} if os.path.exists(f'{D}/audio/tempi-avatar.json') else {}
    scene, t0 = [], 0.0
    for s in piano['scene']:
        sid, tipo = s['scena'], s['tipo']; pre = PRIMA.get((nome, sid), 0.0)
        if sid in voce:
            d = pre + voce[sid]
            if tipo == 'slide':
                d = max(d + 0.4, 0.85 * s['durata_stimata_s'])
        else:
            d = s['durata_stimata_s']
        scene.append({**s, 'd': d, 't0': t0, 'pre': pre}); t0 += d
    tot = t0
    pezzi = []
    for k, s in enumerate(scene):
        sid, tipo, d = s['scena'], s['tipo'], s['d'] + (XF if k + 1 < len(scene) else 0)
        n = round(d * FPS); out = f'{L}/{sid}.mp4'
        src = s.get('clip') if tipo == 'clip' else s.get('immagine') if tipo == 'img' else None
        if src and not os.path.exists(f'{D}/{src}'):
            if not prova:
                sys.exit(f'manca {src}')
            ff('-f', 'lavfi', '-i', f'color=c={NOTTE}:s={W}x{H}:r={FPS}:d={d:.3f}', '-vf',
               f"drawtext=text='{os.path.basename(src)}':fontcolor=0xDCE4EC:fontsize=34:x=(w-tw)/2:y=h/2",
               '-frames:v', str(n), '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', out)
        elif tipo == 'avatar':
            a = tav[sid]
            ff('-ss', f"{max(0.0, a['inizio'] - s['pre']):.3f}", '-i', f'{D}/avatar/avatar.mp4', '-filter_complex',
               f'fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{H},split[a][b];'
               # inquadratura abbassata di GIU px (la scritta del gancio sta sopra la testa): in alto la parete allungata e sfocata
               f'[b]crop={W}:60:0:0,scale={W}:{GIU + 20},boxblur=20:2[t];[a]crop={W}:{H - GIU}:0:0[c];'
               f'[t][c]vstack,crop={W}:{H}:0:20,format=yuv420p',
               '-frames:v', str(n), '-an', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        elif tipo == 'clip':
            c = f'{D}/{src}'; lento = max(1.0, d / durata(c))
            ff('-i', c, '-vf', f'setpts={lento:.4f}*PTS,fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase:'
               f'flags=lanczos,crop={W}:{H},format=yuv420p', '-frames:v', str(n), '-an', '-c:v', 'libx264', '-crf', '16', out)
        else:
            img = f'{D}/{src}' if tipo == 'img' else f"{D}/{s['grafica']['9x16']}"
            z0, z1, y0, y1 = kenburns(s.get('movimento')) if tipo == 'img' else (1.0, 1.03, 0.5, 0.5)
            # zoompan su un'immagine grande il doppio, così il movimento non trema
            z = f"({z0}+({z1}-{z0})*on/{n})"; yy = f"({y0}+({y1}-{y0})*on/{n})"
            ff('-loop', '1', '-i', img, '-vf',
               f'scale={2 * W}:{2 * H}:force_original_aspect_ratio=increase:flags=lanczos,crop={2 * W}:{2 * H},'
               f"zoompan=z='{z}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)*{yy}':d={n}:s={W}x{H}:fps={FPS},format=yuv420p",
               '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out)
        # sovrimpressioni della scena
        ov = OVL.get(nome, {}).get(sid, [])
        s['sub_y'] = SUB_Y
        foto = tipo in ('img', 'clip')
        if ov or foto:
            ins, fil, cur = [], [], '[0:v]'
            if foto:
                # sulle immagini una sfumatura notte leggera dietro ai sottotitoli, perché si leggano anche sul chiaro
                ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', BASSO]
                fil.append(f"[1:v]format=rgba[b0];{cur}[b0]overlay=0:0:shortest=1[vb]"); cur = '[vb]'
            for j, (f, a, b) in enumerate(ov):
                b = s['d'] if b is None else b
                x0, y0, x1, y1 = Image.open(f'{D}/grafiche/9x16/{f}').getbbox()
                dy, alto = 0, False
                if tipo == 'avatar' and VOLTO[0] < y1 and y0 < VOLTO[1]:
                    # scritta sul volto: sale sopra la testa, con una sfumatura notte per leggerla sul muro chiaro
                    dy, alto = SOPRA - y0, True
                elif foto and y1 < 1000:
                    alto = True                           # scritta in alto su un'immagine: stessa sfumatura
                if alto:
                    ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', SFUMA]
                if y1 + dy > s['sub_y'] - 150 and y0 + dy < s['sub_y'] + 10:
                    s['sub_y'] = y0 + dy - 25            # sottotitoli sopra le scritte in basso
                ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', f'{D}/grafiche/9x16/{f}']
                k = len(ins) // 6
                fad = f"fade=t=in:st={a:.2f}:d=0.3:alpha=1,fade=t=out:st={b - 0.3:.2f}:d=0.3:alpha=1"
                if alto:
                    fil.append(f"[{k - 1}:v]format=rgba,{fad}[g{j}];{cur}[g{j}]overlay=0:0:shortest=1[w{j}]"); cur = f'[w{j}]'
                fil.append(f"[{k}:v]format=rgba,{fad}[o{j}];{cur}[o{j}]overlay=0:{dy}:shortest=1[v{j}]")
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
        cc = frasi(parole[s['scena']]); base = s['t0'] + s['pre']
        for j, c in enumerate(cc):
            a, b = base + c[0]['a'] - 0.05, base + c[-1]['b'] + 0.3
            if j + 1 < len(cc):
                b = min(b, base + cc[j + 1][0]['a'] - 0.07)
            ev.append(f"Dialogue: 0,{tc(a)},{tc(b)},S,,0,0,0,,{{\\an2\\pos(540,{s['sub_y']})}}{righe(' '.join(w['w'] for w in c))}")
    open(f'{L}/sub.ass', 'w').write(
        '[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\nWrapStyle: 2\n\n[V4+ Styles]\n'
        'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, '
        'Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, '
        'MarginR, MarginV, Encoding\n'
        # avorio #F4EFE6 (BGR E6EFF4), ombra morbida notte
        'Style: S,Jost,64,&H00E6EFF4,&H00E6EFF4,&H602E1A0B,&H802E1A0B,0,0,0,0,100,100,0,0,1,1.6,3,2,60,60,0,1\n'
        '\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n' + '\n'.join(ev) + '\n')
    fil.append(f"{cur}subtitles={L}/sub.ass:fontsdir={D}/font,format=yuv420p[v]")
    uscita = f"{D}/{os.path.basename(D).upper().replace('-', '_')}_9x16.mp4"
    ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-map', '[au]', '-t', f'{tot:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', uscita)
    print('montato', uscita, f'{tot:.1f} s')


if __name__ == '__main__':
    monta(sys.argv[1], 'prova' in sys.argv[2:])
