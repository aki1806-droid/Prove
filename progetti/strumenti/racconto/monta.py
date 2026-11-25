"""«Sentirsi per sentire – il racconto» (convegno del 24/11/2026): montaggio 16:9 e 9:16 dallo storyboard, 25 fps.
    python3 monta.py <cartella progetto> 16x9|9x16
Richiede audio/voce_01..31.mp3, audio/tempi_voce.json, audio/musica.mp3, testi/<formato>/ (testi.js)."""
import glob, json, os, subprocess, sys
from PIL import Image, ImageFilter, ImageEnhance

D, F = os.path.abspath(sys.argv[1]), sys.argv[2]
P = glob.glob(f'{D}/V9*')[0]
W, H = (1920, 1080) if F == '16x9' else (1080, 1920)
FPS, XF = 25, 0.7
SB = json.load(open(f'{P}/storyboard.json')); T = SB['durata_s']
OUT = f'{D}/montaggio_{F}'; os.makedirs(OUT, exist_ok=True)


def ff(*a):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-2500:]); sys.exit(1)


def dur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))


def cover(i, w, h):
    k = max(w / i.width, h / i.height); i = i.resize((round(i.width * k), round(i.height * k)), Image.LANCZOS)
    x, y = (i.width - w) // 2, (i.height - h) // 2; return i.crop((x, y, x + w, y + h))


def still(src, velo=0.0):
    """foto adattata al formato, al doppio della risoluzione: le verticali in 16:9 intere su un fondo sfocato e scurito
    della stessa foto; tutto il resto riempie con un taglio al centro. velo = quota di scuro sopra (scena 23)"""
    im = Image.open(src).convert('RGB')
    if F == '16x9' and im.height > im.width:
        bg = cover(im, W * 2, H * 2).filter(ImageFilter.GaussianBlur(60)); bg = ImageEnhance.Brightness(bg).enhance(0.45)
        k = (H * 2) / im.height; fg = im.resize((round(im.width * k), H * 2), Image.LANCZOS)
        bg.paste(fg, ((W * 2 - fg.width) // 2, 0)); im = bg
    else:
        im = cover(im, W * 2, H * 2)
    if velo:
        im = ImageEnhance.Brightness(im).enhance(1 - velo)
    o = f'{OUT}/{os.path.basename(src)[:-4]}{"_velo" if velo else ""}.png'; im.save(o); return o


def seg(name, d, src, z0=1.0, z1=1.08, dx=0.0, sopra=None):
    """Ken Burns lentissimo (zoom z0→z1, deriva laterale dx) su un'immagine 2x, con un'eventuale PNG trasparente sopra"""
    n = int(round(d * FPS)); o = f'{OUT}/{name}.mp4'
    ch = (f"[0:v]zoompan=z='{z0}+({z1}-{z0})*on/{n}':x='(iw-iw/zoom)/2+{dx}*iw*on/{n}':y='(ih-ih/zoom)/2':d={n}:s={W}x{H}:fps={FPS},setsar=1")
    ins = ['-loop', '1', '-i', src]
    if sopra:
        ins += ['-loop', '1', '-i', sopra]; ch += f"[b];[1:v]format=rgba,fade=in:st=0.3:d=0.8:alpha=1[s];[b][s]overlay=0:0"
    ff(*ins, '-filter_complex', ch + ',format=yuv420p[v]', '-map', '[v]', '-t', f'{d:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', o)
    return o


DX = {8: 0.04, 11: 0.04, 17: -0.03}
sc = SB['scene']; parts = []
for i, s in enumerate(sc):
    d = s['fine_s'] - s['inizio_s'] + (XF if i + 1 < len(sc) else 0)
    a = s['asset'].replace('[formato]', F); nm = f"s{s['n']:02d}"
    if s['tipo'] == 'card':
        parts.append(seg(nm, d, f'{P}/{a}', 1.0, 1.02))   # cartelli: respiro appena percettibile
    elif s['tipo'] == 'overlay':
        parts.append(seg(nm, d, still(f'{P}/foto/18_sedia_testo.jpg', 0.55), 1.08, 1.12, sopra=f'{P}/cards/q_posto_vuoto_{F}.png'))
    elif s['tipo'] == 'foto_out':
        parts.append(seg(nm, d, still(f'{P}/{a}'), 1.08, 1.0))
    else:
        z = (1.0, 1.08) if s['n'] != 22 else (1.0, 1.08)
        parts.append(seg(nm, d, still(f'{P}/{a}'), *z, dx=DX.get(s['n'], 0.0)))
    print(nm, end=' ', flush=True)
print()
ins = sum([['-i', p] for p in parts], []); fc, acc = [], '0:v'
for i in range(1, len(parts)):
    fc.append(f'[{acc}][{i}:v]xfade=transition=fade:duration={XF}:offset={sc[i]["inizio_s"]:.3f}[x{i}]'); acc = f'x{i}'
ov = json.load(open(f'{D}/testi/{F}/elenco.json'))   # [[file, inizio, fine], ...]
n = len(parts)
for j, (f, a, b) in enumerate(ov):
    du = b - a
    ins += ['-loop', '1', '-framerate', str(FPS), '-t', f'{du:.2f}', '-i', f'{D}/testi/{F}/{f}']
    fc.append(f'[{n + j}:v]format=rgba,fade=in:st=0:d=0.6:alpha=1,fade=out:st={du - 0.4:.2f}:d=0.4:alpha=1,setpts=PTS+{a}/TB[o{j}]')
    fc.append(f"[{acc}][o{j}]overlay=0:'12*max(0\\,1-(t-{a})/0.6)':eof_action=pass[y{j}]"); acc = f'y{j}'
fc.append(f'[{acc}]fade=in:st=0:d=1.2,fade=out:st={T - 2}:d=2,format=yuv420p[v]')
# audio: musica −10 dB senza voce, −20 dB sotto la voce, quasi a zero sul cartello «Capitolo terzo»
vt = json.load(open(f'{D}/audio/tempi_voce.json'))
na = n + len(ov)
ins += ['-i', f'{D}/audio/musica.mp3']
voc = '+'.join(f'between(t,{a - 0.3:.2f},{a + du + 0.3:.2f})' for _, a, du in vt)
fc.append(f"[{na}:a]aresample=48000,atrim=0:{T},volume='if(between(t,118.4,122.8),0.03,if({voc},0.10,0.32))':eval=frame,"
          f"afade=t=out:st={T - 4}:d=4[mu]")
mix = ['[mu]']
for k, (f, a, du) in enumerate(vt):
    ins += ['-i', f'{D}/audio/{f}']
    fc.append(f'[{na + 1 + k}:a]aresample=48000,adelay={int(a * 1000)}|{int(a * 1000)}[v{k}]'); mix.append(f'[v{k}]')
fc.append(''.join(mix) + f'amix=inputs={len(mix)}:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11[a]')
nome = f'{D}/PDRO_Sentirsi_per_sentire_il_racconto_{F}.mp4'
ff(*ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[a]', '-t', str(T), '-r', str(FPS),
   '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k',
   '-movflags', '+faststart', nome)
print('montato', nome, dur(nome))
