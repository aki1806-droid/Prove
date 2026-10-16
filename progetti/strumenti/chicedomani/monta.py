"""Montaggio di un episodio di «Chi c'è domani» (reel 9:16, 1080x1920, 25 fps).

    python3 monta.py <cartella progetto> <NOME_USCITA>

Per ogni scena il livello grafico viene dal motore (rendi.mjs -> montaggio/G_Sxx.mp4 o .mov):
  overlay  (scene con clip)  clip image-to-video HeyGen adattata a 1080x1920 + livello con alfa sopra
  pieno    (scene grafiche)  il livello è già la scena
Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nera nelle scene con letterbox),
avatar trasparente di Achille in basso a destra nella scena S05. Se c'è una S06 (cartello finale
dell'ep. 5) l'audio si allunga con silenzio. Nessun sottotitolo impresso: l'SRT va a parte.
"""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

QUI = os.path.dirname(os.path.abspath(__file__))
D = os.path.abspath(sys.argv[1]); NOME = sys.argv[2]
FPS = 25
TEMPI = json.load(open(f'{D}/audio/tempi-scene.json'))
ANIM = json.load(open(f'{D}/grafica/anim.json'))
LAV = f'{D}/montaggio'; os.makedirs(LAV, exist_ok=True)
AV_CROP, AV_H, AV_X = (520, 0, 1100, 1080), 640, 508
LOGO_Y = {'pieno': 52, 'overlay': 132}
CODA_FINALE = 2.2          # durata del cartello finale S06, se c'è
GRADO = 'eq=contrast=1.05:saturation=1.06'


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


scene = [dict(t) for t in TEMPI]
if 'S06' in ANIM:
    scene.append({'id': 'S06', 'durata': CODA_FINALE, 'inizio': sum(t['durata'] for t in TEMPI)})


def livello(t):
    sid = t['id']; ext = '.mov' if ANIM[sid]['tipo'] == 'overlay' else '.mp4'
    out = f'{LAV}/G_{sid}{ext}'
    if not os.path.exists(out) or os.environ.get('RIFAI'):
        subprocess.run(['node', f'{QUI}/rendi.mjs', D, sid, f"{t['durata']:.4f}", out], check=True)
    return out


def scena(t, g):
    sid, d = t['id'], t['durata']; n = round(d * FPS); out = f'{LAV}/{sid}.mp4'
    if ANIM[sid]['tipo'] == 'overlay':
        c = f'{D}/clip/{sid}.mp4'; lento = d / durata(c)
        ff('-i', c, '-i', g, '-filter_complex',
           f"[0:v]setpts=PTS*{max(1.0, lento):.4f},fps={FPS},"
           f"scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,{GRADO}[c];"
           f"[c][1:v]overlay=0:0:format=auto,format=yuv420p[v]",
           '-map', '[v]', '-frames:v', str(n), '-r', str(FPS), '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', out)
    else:
        ff('-i', g, '-frames:v', str(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', out)


def monta():
    with ThreadPoolExecutor(3) as ex:
        gl = list(ex.map(livello, scene))
    for t, g in zip(scene, gl):
        scena(t, g)
    open(f'{LAV}/lista.txt', 'w').write(''.join(f"file '{LAV}/{t['id']}.mp4'\n" for t in scene))
    ff('-f', 'concat', '-safe', '0', '-i', f'{LAV}/lista.txt', '-c', 'copy', f'{LAV}/fondo.mp4')
    dur = sum(t['durata'] for t in scene)
    av = next(t for t in scene if t['id'] == 'S05')
    en = {k: '+'.join(f"between(t,{t['inizio']:.3f},{t['inizio'] + t['durata'] - 0.001:.3f})"
                      for t in scene if ANIM[t['id']]['tipo'] == k) or '0' for k in LOGO_Y}
    cx, cy, cw, ch = AV_CROP
    ff('-i', f'{LAV}/fondo.mp4', '-loop', '1', '-i', f'{QUI}/logo.png',
       '-itsoffset', f"{av['inizio']:.3f}", '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar.webm',
       '-i', f'{D}/audio/voce-completa.wav', '-filter_complex',
       f"[1:v]split[l1][l2];"
       f"[0:v][l1]overlay=0:{LOGO_Y['pieno']}:shortest=1:enable='{en['pieno']}'[a];"
       f"[a][l2]overlay=0:{LOGO_Y['overlay']}:enable='{en['overlay']}'[a1];"
       f"[2:v]fps={FPS},format=rgba,crop={cw}:{ch}:{cx}:{cy},scale=-2:{AV_H}:flags=lanczos,split[av][om];"
       f"[om]lutrgb=r=255:g=255:b=255,boxblur=luma_radius=14:alpha_radius=14,colorchannelmixer=aa=0.55[al];"
       f"[a1][al]overlay={AV_X}:{1920 - AV_H}:eof_action=pass[a2];"
       f"[a2][av]overlay={AV_X}:{1920 - AV_H}:eof_action=pass,format=yuv420p[v];"
       f"[3:a]apad=whole_dur={dur:.3f}[au]",
       '-map', '[v]', '-map', '[au]', '-t', f'{dur:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', f'{D}/{NOME}.mp4')
    print('montato', NOME, f'{dur:.2f} s')


if __name__ == '__main__':
    monta()
