"""Montaggio del reel «In bocca al lupo OSS Azienda Zero» (9:16, 1080x1920, 25 fps), il più semplice possibile perché
esce in giornata: alternanza del pacchetto GRAFICA/CLIP, tagli netti a fine blocco di voce.
  slide: slide/scena_XX.png a tutto schermo con un respiro di zoom del 3%
  clip:  clip HeyGen image-to-video in cover, dominante verde, banda overlay_clip/scena_XX_banda.png sopra
Logo CISL FP Padova Rovigo sempre in alto a sinistra, avatar trasparente «Aki with a lapel microphone» sempre in basso a
destra (con lo stesso alone chiaro dei reel PDRO), nessuna musica, nessun sottotitolo impresso (SRT a parte).
"""
import json, os, subprocess

QUI = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-auguri-concorso-oss-azienda-zero')
NOME = 'PDRO_In_bocca_al_lupo_OSS_Azienda_Zero_9x16'
FPS = 25
LAV = f'{D}/montaggio'; os.makedirs(LAV, exist_ok=True)
LOGO = os.path.join(os.path.dirname(QUI), 'chicedomani', 'logo.png')
AV_CROP, AV_H, AV_X = (520, 0, 1100, 1080), 640, 508
FERMA = {'S02': 'S02_cucina.png'}
VERDE = 'colorbalance=rs=-0.06:gs=0.05:bs=-0.03:rm=-0.05:gm=0.06:bm=-0.02,eq=contrast=1.04:saturation=0.95'


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def durata(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def scena(t, tipo):
    sid, d = t['id'], t['durata']; n = round(d * FPS); k = int(sid[1:]); out = f'{LAV}/{sid}.mp4'
    if tipo == 'slide':
        ff('-loop', '1', '-i', f'{D}/slide/scena_{k:02d}.png', '-filter_complex',
           f"[0:v]scale=2160:3840,zoompan=z='1+0.03*on/{n}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1080x1920:fps={FPS},"
           f"setsar=1,format=yuv420p[v]", '-map', '[v]', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', out)
    elif not os.path.exists(f'{D}/clip/{sid}.mp4'):
        # clip scartata (volto visibile) e niente crediti per rifarla: l'immagine di partenza con uno zoom lento dell'8%
        ff('-loop', '1', '-i', f'{D}/img/{FERMA[sid]}', '-i', f'{D}/overlay_clip/scena_{k:02d}_banda.png', '-filter_complex',
           f"[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840,"
           f"zoompan=z='1+0.08*on/{n}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1080x1920:fps={FPS},{VERDE}[c];"
           f"[c][1:v]overlay=0:0,setsar=1,format=yuv420p[v]",
           '-map', '[v]', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', out)
    else:
        c = f'{D}/clip/{sid}.mp4'; lento = max(1.0, d / durata(c))
        ff('-i', c, '-i', f'{D}/overlay_clip/scena_{k:02d}_banda.png', '-filter_complex',
           f"[0:v]setpts=PTS*{lento:.4f},fps={FPS},scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,"
           f"crop=1080:1920,{VERDE}[c];[c][1:v]overlay=0:0,setsar=1,format=yuv420p[v]",
           '-map', '[v]', '-an', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '16', out)
    return out


def monta():
    tempi = json.load(open(f'{D}/audio/tempi-scene.json'))
    tipi = {f"S{s['n']:02d}": s['tipo'] for s in json.load(open(f'{D}/blocchi.json'))['scene']}
    pezzi = [scena(t, tipi[t['id']]) for t in tempi]
    open(f'{LAV}/lista.txt', 'w').write(''.join(f"file '{p}'\n" for p in pezzi))
    ff('-f', 'concat', '-safe', '0', '-i', f'{LAV}/lista.txt', '-c', 'copy', f'{LAV}/fondo.mp4')
    tot = sum(t['durata'] for t in tempi)
    # il ritaglio è pensato su 1920x1080: si riporta alla larghezza vera del webm (questo è 1280x714)
    w = int(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=width', '-of', 'csv=p=0',
                            f'{D}/avatar/avatar.webm'], capture_output=True, text=True).stdout)
    cx, cy, cw, ch = (round(v * w / 1920) for v in AV_CROP)
    ff('-i', f'{LAV}/fondo.mp4', '-loop', '1', '-i', LOGO, '-c:v', 'libvpx-vp9', '-i', f'{D}/avatar/avatar.webm',
       '-i', f'{D}/audio/voce-completa.wav', '-filter_complex',
       f"[0:v][1:v]overlay=0:52:shortest=1[a];"
       f"[2:v]fps={FPS},format=rgba,crop={cw}:min({ch}\\,ih):{cx}:{cy},scale=-2:{AV_H}:flags=lanczos,split[av][om];"
       f"[om]lutrgb=r=255:g=255:b=255,boxblur=luma_radius=14:alpha_radius=14,colorchannelmixer=aa=0.55[al];"
       f"[a][al]overlay={AV_X}:{1920 - AV_H}:eof_action=pass[a2];"
       f"[a2][av]overlay={AV_X}:{1920 - AV_H}:eof_action=pass,setsar=1,format=yuv420p[v]",
       '-map', '[v]', '-map', '3:a', '-t', f'{tot:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', f'{D}/{NOME}.mp4')
    print('montato', NOME, f'{tot:.2f} s')


if __name__ == '__main__':
    monta()
