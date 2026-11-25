"""«Un nodo al dito» (25 novembre 2026): montaggio 16:9 e 9:16 dallo storyboard del pacchetto, a 25 fps.
    python3 monta.py <cartella progetto> 16x9|9x16
Richiede: audio/voce_01..10.mp3 (Luca Ward), audio/musica.mp3, testi/<formato>/*.png (render_testi.js)."""
import json, os, subprocess, sys
from PIL import Image, ImageFilter, ImageEnhance

D, F = os.path.abspath(sys.argv[1]), sys.argv[2]
W, H = (1920, 1080) if F == '16x9' else (1080, 1920)
FPS, XF, T = 25, 0.7, 76.0
PRUGNA = (38, 24, 42)
OUT = f'{D}/montaggio_{F}'; os.makedirs(OUT, exist_ok=True)


def ff(*a):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-2500:]); sys.exit(1)


def dur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))


def still(img):
    """immagine fissa adattata al formato: in 9:16 riempie (taglio al centro); in 16:9 l'opera intera su un fondo
    sfocato e scurito della stessa immagine, così non si taglia nulla"""
    im = Image.open(f'{D}/images/{img}').convert('RGB')
    if img == 'foto_nodo_al_dito.jpg':   # foto chiara: scurita perché il cartello avorio e i sottotitoli si leggano
        im = ImageEnhance.Brightness(im).enhance(0.55)
    o = f'{OUT}/{img[:-4]}.png'
    def cover(i, w, h):
        k = max(w / i.width, h / i.height); i = i.resize((round(i.width * k), round(i.height * k)), Image.LANCZOS)
        x, y = (i.width - w) // 2, (i.height - h) // 2; return i.crop((x, y, x + w, y + h))
    if F == '9x16':
        cover(im, W * 2, H * 2).save(o)
    else:
        bg = cover(im, W * 2, H * 2).filter(ImageFilter.GaussianBlur(60)); bg = ImageEnhance.Brightness(bg).enhance(0.45)
        k = (H * 2) / im.height; fg = im.resize((round(im.width * k), H * 2), Image.LANCZOS)
        bg.paste(fg, ((W * 2 - fg.width) // 2, 0)); bg.save(o)
    return o


def kb(src, d, z0=1.0, z1=1.08, dx=0.0):
    """Ken Burns lentissimo su un'immagine 2x: zoom da z0 a z1 in d secondi, deriva laterale dx (frazione della larghezza)"""
    n = int(round(d * FPS))
    z = f"{z0}+({z1}-{z0})*on/{n}"
    x = f"(iw-iw/zoom)/2+{dx}*iw*on/{n}"
    return ['-loop', '1', '-i', src], f"zoompan=z='{z}':x='{x}':y='(ih-ih/zoom)/2':d={n}:s={W}x{H}:fps={FPS},setsar=1"


def seg(name, d, inputs, chain):
    o = f'{OUT}/{name}.mp4'
    ff(*inputs, '-filter_complex', chain + ',format=yuv420p[v]', '-map', '[v]', '-t', f'{d:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', o)
    return o


def clip(name, f, d):
    c = f'{D}/clips/{f}'; k = max(1.0, d / (dur(c) - 0.05))
    vert = '9x16' in f
    if F == '16x9' and vert:
        # clip verticale al centro su prugna, bordi sfumati
        h = H; w = round(720 * H / 1280 / 2) * 2
        mask = f'{OUT}/maschera.png'
        m = Image.new('L', (w, h), 0); px = m.load(); fe = 90
        for x in range(w):
            a = min(1, x / fe, (w - 1 - x) / fe)
            for y in range(h):
                px[x, y] = int(255 * a * min(1, y / 40 + 0.2, (h - 1 - y) / 40 + 0.2))
        m.save(mask)
        return seg(name, d, ['-f', 'lavfi', '-i', f'color=c=0x26182A:s={W}x{H}:r={FPS}:d={d}', '-i', c, '-loop', '1', '-i', mask],
                   f"[1:v]setpts={k:.4f}*PTS,fps={FPS},scale={w}:{h},format=rgba[c];[2:v]format=gray,scale={w}:{h}[m];"
                   f"[c][m]alphamerge[cm];[0:v][cm]overlay=(W-w)/2:0:shortest=0")
    return seg(name, d, ['-i', c], f"[0:v]setpts={k:.4f}*PTS,fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,"
                                   f"crop={W}:{H},zoompan=z='1+0.0006*on':d=1:s={W}x{H}:fps={FPS}")


def card(name, f, d):
    return seg(name, d, ['-loop', '1', '-i', f'{D}/cards/{f}_{F}.png'],
               f"[0:v]scale={W * 2}:{H * 2},zoompan=z='1+0.02*on/{int(d * FPS)}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d={int(d * FPS)}:s={W}x{H}:fps={FPS}")


def img(name, f, d, **k):
    i, ch = kb(still(f), d, **k)
    return seg(name, d, i, '[0:v]' + ch)


def due(name, a, b, d, t):
    """due momenti nella stessa scena, dissolvenza al secondo t"""
    pa = a(f'{name}a', t + XF); pb = b(f'{name}b', d - t)
    return seg(name, d, ['-i', pa, '-i', pb], f'[0:v][1:v]xfade=transition=fade:duration={XF}:offset={t:.3f}')


SC = [  # (inizio, fine, costruttore)
    (0, 7, lambda n, d: clip(n, 'c03_filo_dito_9x16.mp4', d)),
    (7, 12, lambda n, d: card(n, '01_titolo', d)),
    (12, 19, lambda n, d: img(n, 'g07_il_silenzio.jpg', d, z1=1.08)),
    (19, 26, lambda n, d: img(n, 'foto_nodo_al_dito.jpg', d, z1=1.10)),
    (26, 33, lambda n, d: img(n, 'g02_l_isolamento.jpg', d, dx=0.03)),
    (33, 39, lambda n, d: img(n, 'g08_la_paura.jpg', d)),
    (39, 47, lambda n, d: due(n, lambda m, e: img(m, 'g01_il_controllo.jpg', e), lambda m, e: img(m, 'g03_le_parole_che_feriscono.jpg', e), d, 4.0)),
    (47, 52, lambda n, d: card(n, '03_non_finisce_stasera', d)),
    (52, 59, lambda n, d: clip(n, 'c04_donne_filo_16x9.mp4', d)),
    (59, 66, lambda n, d: due(n, lambda m, e: img(m, 'foto_donna_cuore_hd.jpg', e), lambda m, e: card(m, '05_non_sei_sola_1522', e), d, 4.0)),
    (66, 72, lambda n, d: img(n, 'g11_le_altre.jpg', d, z0=1.08, z1=1.0)),
    (72, 76, lambda n, d: card(n, '06_chiusura', d)),
]
parts = []
for i, (a, b, fn) in enumerate(SC):
    d = b - a + (XF if i + 1 < len(SC) else 0)
    parts.append(fn(f's{i + 1:02d}', d))
ins = sum([['-i', p] for p in parts], []); fc, acc = [], '0:v'
for i in range(1, len(parts)):
    fc.append(f'[{acc}][{i}:v]xfade=transition=fade:duration={XF}:offset={SC[i][0]:.3f}[x{i}]'); acc = f'x{i}'
# sovrapposizioni: cartelli trasparenti, etichetta, sottotitoli (PNG già pronti in testi/<F>/), entrata dal basso 12 px
ov = json.load(open(f'{D}/testi/{F}/elenco.json'))   # [[file, inizio, fine], ...]
n = len(parts)
for j, (f, a, b) in enumerate(ov):
    ins += ['-loop', '1', '-t', str(T), '-i', f'{D}/testi/{F}/{f}' if not f.startswith('cards/') else f'{D}/{f}']
    q = n + j
    fc.append(f'[{q}:v]format=rgba,fade=in:st={a}:d=0.6:alpha=1,fade=out:st={b - 0.4}:d=0.4:alpha=1[o{j}]')
    fc.append(f"[{acc}][o{j}]overlay=0:'12*max(0\\,1-(t-{a})/0.6)':enable='between(t,{a},{b})'[y{j}]"); acc = f'y{j}'
fc.append(f'[{acc}]fade=in:st=0:d=0.8,fade=out:st={T - 1.2}:d=1.2,format=yuv420p[v]')
# audio: voci ai loro tempi, musica −10 dB senza voce e −20 dB sotto la voce, mezzo secondo di silenzio prima delle 47 s
vt = json.load(open(f'{D}/audio/tempi_voce.json'))   # [[file, inizio, durata], ...]
na = n + len(ov)
ins += ['-i', f'{D}/audio/musica.mp3']
voc = '+'.join(f'between(t,{a - 0.25:.2f},{a + du + 0.25:.2f})' for _, a, du in vt)
fc.append(f"[{na}:a]aresample=48000,atrim=0:{T},volume='if(between(t,46.45,46.95),0.02,if({voc},0.10,0.32))':eval=frame,"
          f"afade=t=out:st={T - 3}:d=3[mu]")
mix = ['[mu]']
for k, (f, a, du) in enumerate(vt):
    ins += ['-i', f'{D}/audio/{f}']
    fc.append(f'[{na + 1 + k}:a]aresample=48000,adelay={int(a * 1000)}|{int(a * 1000)}[v{k}]'); mix.append(f'[v{k}]')
fc.append(''.join(mix) + f'amix=inputs={len(mix)}:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11[a]')
nome = f'{D}/PDRO_Un_nodo_al_dito_{F}.mp4'
ff(*ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[a]', '-t', str(T), '-r', str(FPS),
   '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k',
   '-movflags', '+faststart', nome)
print('montato', nome, dur(nome))
