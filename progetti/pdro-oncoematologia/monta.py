"""Montaggio del Reel PDRO, 1080x1920, 25 fps.

Passo 1 — fondo: per ogni scena la slide del pacchetto (con una lenta spinta
in avanti) oppure la clip rallentata a durata di scena, virata al verde, con
sopra la banda overlay_clip/. Le sette scene in fila: montaggio/fondo.mp4.

Passo 2 — strati, sull'intera durata: logo in alto a sinistra, sottotitoli in
basso a sinistra, avatar HeyGen senza sfondo in basso a destra (un solo video
allineato alla voce completa), e la voce in WAV.

    python3 monta.py            # entrambi i passi
    python3 monta.py --strati   # solo il passo 2, se il fondo c'è già
"""
import json, os, subprocess, sys

QUI = os.path.dirname(os.path.abspath(__file__))
FPS = 25
TEMPI = json.load(open(os.path.join(QUI, 'audio/tempi-scene.json')))
CLIP = {'S02', 'S04', 'S06'}
LAV = os.path.join(QUI, 'montaggio')
os.makedirs(LAV, exist_ok=True)

# Avatar: dal fotogramma 1920x1080 dell'avatar si ritaglia il mezzo busto
# (AV_CROP: x, y, w, h), lo si porta ad altezza AV_H e lo si appoggia al bordo
# inferiore con il bordo sinistro a AV_X.
AV_CROP = (560, 60, 800, 1020)
AV_H, AV_X = 760, 520


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def scena(t):
    sid, d = t['id'], t['durata']
    out = os.path.join(LAV, f'{sid}.mp4')
    n = round(d * FPS)
    if sid in CLIP:
        lento = d / 15.0417
        ff('-i', os.path.join(QUI, 'clip', f'{sid}.mp4'),
           '-loop', '1', '-i', os.path.join(QUI, 'overlay_clip', f'{sid}_overlay.png'),
           '-filter_complex',
           # rallentata solo se la voce è più lunga della clip; virata al verde
           f"[0:v]setpts=PTS*{max(1.0, lento):.4f},"
           f"{'minterpolate=fps=25:mi_mode=blend,' if lento > 1 else 'fps=25,'}"
           f"scale=1080:1920:flags=lanczos,eq=saturation=0.8:brightness=-0.04,"
           f"colorchannelmixer=rr=0.82:rg=0.08:gg=1.0:gb=0.04:bb=0.80[c];"
           f"[c][1:v]overlay=0:0,format=yuv420p[v]",
           '-map', '[v]', '-frames:v', str(n), '-r', str(FPS),
           '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', out)
    else:
        # slide ferma con una spinta lentissima (3% in tutta la scena)
        ff('-loop', '1', '-framerate', str(FPS), '-i', os.path.join(QUI, 'slide', f'{sid}_slide.png'),
           '-vf', f"scale=2160:3840,zoompan=z='1+0.03*on/{n}':x='iw/2-(iw/zoom/2)':y='0':d=1:s=1080x1920:fps={FPS},format=yuv420p",
           '-frames:v', str(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', out)
    return out


def fondo():
    parti = [scena(t) for t in TEMPI]
    lista = os.path.join(LAV, 'lista.txt')
    open(lista, 'w').write(''.join(f"file '{p}'\n" for p in parti))
    ff('-f', 'concat', '-safe', '0', '-i', lista, '-c', 'copy', os.path.join(LAV, 'fondo.mp4'))


def strati():
    g = os.path.join(QUI, 'grafica/out')
    cx, cy, cw, ch = AV_CROP
    dur = sum(t['durata'] for t in TEMPI)
    ff('-i', os.path.join(LAV, 'fondo.mp4'),
       '-loop', '1', '-i', os.path.join(g, 'logo.png'),
       '-f', 'concat', '-safe', '0', '-i', os.path.join(g, 'sottotitoli.txt'),
       '-c:v', 'libvpx-vp9', '-i', os.path.join(QUI, 'avatar/avatar.webm'),
       '-i', os.path.join(QUI, 'audio/voce-completa.wav'),
       '-filter_complex',
       f"[3:v]fps={FPS},format=rgba,crop={cw}:{ch}:{cx}:{cy},scale=-2:{AV_H}:flags=lanczos,"
       f"tpad=stop_mode=clone:stop_duration=1[av];"
       f"[2:v]fps={FPS},format=rgba[sub];"
       f"[0:v][1:v]overlay=0:0:shortest=1[a];"
       f"[a][av]overlay={AV_X}:{1920 - AV_H}:eof_action=repeat[b];"
       f"[b][sub]overlay=0:0:eof_action=repeat,format=yuv420p[v]",
       '-map', '[v]', '-map', '4:a', '-t', f'{dur:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', os.path.join(QUI, 'PDRO_Oncoematologia_Pediatrica_9x16.mp4'))


if __name__ == '__main__':
    if '--strati' not in sys.argv:
        fondo(); print('fondo fatto')
    if os.path.exists(os.path.join(QUI, 'avatar/avatar.webm')):
        strati(); print('montato fatto')
    else:
        print('manca avatar/avatar.webm: solo il fondo')
