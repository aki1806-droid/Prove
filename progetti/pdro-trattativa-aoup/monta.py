"""Montaggio del Reel PDRO «Trattativa AOUP – Il punto», 1080x1920, 25 fps.

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
CLIP = {'S02', 'S04', 'S06', 'S08'}
LAV = os.path.join(QUI, 'montaggio')
os.makedirs(LAV, exist_ok=True)

# Avatar: dal fotogramma 1920x1080 dell'avatar si ritaglia il mezzo busto
# (AV_CROP: x, y, w, h), lo si porta ad altezza AV_H e lo si appoggia al bordo
# inferiore con il bordo sinistro a AV_X.
AV_CROP = (520, 0, 1100, 1080)
AV_H, AV_X = 640, 508


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


CAMBI = json.load(open(os.path.join(QUI, 'audio/cambi-B.json')))
DISS = 0.35   # dissolvenza tra grafica A e grafica B


def scena(t):
    """Una scena: grafica A dall'inizio, grafica B in dissolvenza dalla frase indicata
    (audio/cambi-B.json). Slide con una lenta spinta in avanti; clip rallentata a durata
    di scena e virata al verde, con sopra la banda A e poi la banda B."""
    sid, d = t['id'], t['durata']
    out = os.path.join(LAV, f'{sid}.mp4')
    n = round(d * FPS)
    tb = CAMBI[sid]
    if sid in CLIP:
        lento = d / 15.0417
        ff('-i', os.path.join(QUI, 'clip', f'{sid}.mp4'),
           '-loop', '1', '-i', os.path.join(QUI, 'overlay_clip', f'{sid}A_overlay.png'),
           '-loop', '1', '-i', os.path.join(QUI, 'overlay_clip', f'{sid}B_overlay.png'),
           '-filter_complex',
           f"[0:v]setpts=PTS*{max(1.0, lento):.4f},"
           f"{'minterpolate=fps=25:mi_mode=blend,' if lento > 1 else 'fps=25,'}"
           f"scale=1080:1920:flags=lanczos,eq=saturation=0.8:brightness=-0.04,"
           f"colorchannelmixer=rr=0.82:rg=0.08:gg=1.0:gb=0.04:bb=0.80[c];"
           f"[1:v]fps={FPS},format=rgba,fade=out:st={tb:.3f}:d={DISS}:alpha=1[oa];"
           f"[2:v]fps={FPS},format=rgba,fade=in:st={tb:.3f}:d={DISS}:alpha=1[ob];"
           f"[c][oa]overlay=0:0[c2];[c2][ob]overlay=0:0,format=yuv420p[v]",
           '-map', '[v]', '-frames:v', str(n), '-r', str(FPS),
           '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', out)
    else:
        # due slide ferme con una spinta lentissima (3% in tutta la scena); B entra in dissolvenza
        zp = f"scale=2160:3840,zoompan=z='1+0.03*on/{n}':x='iw/2-(iw/zoom/2)':y='0':d=1:s=1080x1920:fps={FPS}"
        ff('-loop', '1', '-framerate', str(FPS), '-i', os.path.join(QUI, 'slide', f'{sid}A_slide.png'),
           '-loop', '1', '-framerate', str(FPS), '-i', os.path.join(QUI, 'slide', f'{sid}B_slide.png'),
           '-filter_complex',
           f"[0:v]{zp}[a];[1:v]{zp},format=rgba,fade=in:st={tb:.3f}:d={DISS}:alpha=1[b];"
           f"[a][b]overlay=0:0,format=yuv420p[v]",
           '-map', '[v]', '-frames:v', str(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', out)
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
       f"tpad=stop_mode=clone:stop_duration=1,split[av][ombra];"
       # alone chiaro dietro la figura: la polo verde sul fondo verde altrimenti sparisce
       f"[ombra]lutrgb=r=255:g=255:b=255,boxblur=luma_radius=14:alpha_radius=14,"
       f"colorchannelmixer=aa=0.55[alone];"
       f"[2:v]fps={FPS},format=rgba[sub];"
       f"[0:v][1:v]overlay=0:0:shortest=1[a];"
       f"[a][alone]overlay={AV_X}:{1920 - AV_H}:eof_action=repeat[a2];"
       f"[a2][av]overlay={AV_X}:{1920 - AV_H}:eof_action=repeat[b];"
       f"[b][sub]overlay=0:0:eof_action=repeat,format=yuv420p[v]",
       '-map', '[v]', '-map', '4:a', '-t', f'{dur:.3f}', '-r', str(FPS),
       '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', os.path.join(QUI, 'PDRO_Trattativa_AOUP_9x16.mp4'))


if __name__ == '__main__':
    if '--strati' not in sys.argv:
        fondo(); print('fondo fatto')
    if os.path.exists(os.path.join(QUI, 'avatar/avatar.webm')):
        strati(); print('montato fatto')
    else:
        print('manca avatar/avatar.webm: solo il fondo')
