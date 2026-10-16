"""Variante creativa di «Io, io, io» (reel 9:16, 1080x1920, 25 fps).

Stesse voci della versione 1 (audio/ copiato da ../pdro-storia3-io-io-io), visivo rifatto:
  S01  clip HeyGen «studio da televendita»   + livello grafico animato (VHS, adesivi, confezione IO™)
  S02  clip HeyGen «uomo solo sul palco»       + livello grafico (IO-METRO, adesivi, IO! finale)
  S03  solo grafica animata (bugiardino)
  S04  solo grafica animata (IO → NOI)
  S05  clip HeyGen «la squadra avanza»          + livello grafico (NOI ascoltiamo…)
  S06  solo grafica animata (risultato finale)  + avatar di Achille in basso a destra
Livelli grafici: grafica/motore.html renderizzato da grafica/rendi.mjs in montaggio/G_Sxx.mov (con alfa).
Logo CISL FP Padova Rovigo in alto a sinistra per tutto il video.
"""
import json, os, subprocess

QUI = os.path.dirname(os.path.abspath(__file__))
FPS = 25
TEMPI = json.load(open(f'{QUI}/audio/tempi-scene.json'))
LAV = f'{QUI}/montaggio'
CLIP = {'S01': 'tv', 'S02': 'tv', 'S05': 'caldo'}
GRADO = {'tv': 'eq=saturation=1.3:contrast=1.08,rgbashift=rh=3:bh=-3,noise=alls=10:allf=t',
         'caldo': 'eq=saturation=1.08:contrast=1.04:gamma_r=1.04:gamma_b=0.96'}
AV_CROP, AV_H, AV_X = (520, 0, 1100, 1080), 640, 508


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def scena(t):
    sid, d = t['id'], t['durata']; n = round(d * FPS); out = f'{LAV}/{sid}.mp4'; g = f'{LAV}/G_{sid}.mov'
    if sid in CLIP:
        c = f'{QUI}/clip/{sid}.mp4'; lento = d / durata(c)
        ff('-i', c, '-i', g, '-filter_complex',
           f"[0:v]setpts=PTS*{max(1.0, lento):.4f},{'minterpolate=fps=25:mi_mode=blend,' if lento > 1 else 'fps=25,'}"
           f"scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,{GRADO[CLIP[sid]]}[c];"
           f"[c][1:v]overlay=0:0:format=auto,format=yuv420p[v]",
           '-map', '[v]', '-frames:v', str(n), '-r', str(FPS), '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', out)
    else:
        ff('-f', 'lavfi', '-i', f'color=black:s=1080x1920:r={FPS}', '-i', g, '-filter_complex',
           '[0:v][1:v]overlay=0:0:shortest=1,format=yuv420p[v]', '-map', '[v]', '-frames:v', str(n),
           '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', out)


def monta():
    for t in TEMPI:
        scena(t)
    open(f'{LAV}/lista.txt', 'w').write(''.join(f"file '{LAV}/{t['id']}.mp4'\n" for t in TEMPI))
    ff('-f', 'concat', '-safe', '0', '-i', f'{LAV}/lista.txt', '-c', 'copy', f'{LAV}/fondo.mp4')
    dur = sum(t['durata'] for t in TEMPI); fin = TEMPI[-1]
    logo = f'{QUI}/../pdro-storia3-io-io-io/montaggio/logo.png'
    cx, cy, cw, ch = AV_CROP
    ff('-i', f'{LAV}/fondo.mp4', '-loop', '1', '-i', logo,
       '-itsoffset', f"{fin['inizio']:.3f}", '-c:v', 'libvpx-vp9', '-i', f'{QUI}/avatar/avatar.webm',
       '-i', f'{QUI}/audio/voce-completa.wav', '-filter_complex',
       f"[0:v][1:v]overlay=0:52:shortest=1[a];"
       f"[2:v]fps={FPS},format=rgba,crop={cw}:{ch}:{cx}:{cy},scale=-2:{AV_H}:flags=lanczos,split[av][om];"
       f"[om]lutrgb=r=255:g=255:b=255,boxblur=luma_radius=14:alpha_radius=14,colorchannelmixer=aa=0.55[al];"
       f"[a][al]overlay={AV_X}:{1920 - AV_H}:eof_action=pass[a2];"
       f"[a2][av]overlay={AV_X}:{1920 - AV_H}:eof_action=pass,format=yuv420p[v]",
       '-map', '[v]', '-map', '3:a', '-t', f'{dur:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', f'{QUI}/PDRO_Io_io_io_v2_9x16.mp4')
    print('montato', f'{dur:.2f} s')


if __name__ == '__main__':
    monta()
