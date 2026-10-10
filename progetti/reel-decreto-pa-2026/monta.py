"""Montaggio locale del Reel 1080x1920, 25 fps.

Per ogni scena: fondo (grafica renderizzata, oppure clip rallentata e virata
al verde) + strato delle scritte + avatar a mezzo busto in basso a destra.
Poi le otto scene in fila e la voce grezzo-1 sotto.

    python3 monta.py                    # avatar da avatar/avatar.mp4
    python3 monta.py --segnaposto       # avatar = foto ferma (prova di catena)
"""
import json, os, subprocess, sys
from PIL import Image, ImageDraw

QUI = os.path.dirname(os.path.abspath(__file__))
FPS = 25
TEMPI = json.load(open(os.path.join(QUI, 'audio/tempi-scene.json')))
TIPO = {'s1': 'GRAFICA', 's2': 'CLIP', 's3': 'GRAFICA', 's4': 'CLIP',
        's5': 'GRAFICA', 's6': 'CLIP', 's7': 'GRAFICA', 's8': 'CLIP'}
SEGNAPOSTO = '--segnaposto' in sys.argv

# Riquadro dell'avatar sul quadro finale e ritaglio a mezzo busto sul video
# dell'avatar (1080x1920): il volto sta in alto nel riquadro, la mano col
# microfono in basso.
AV_X, AV_Y, AV_W, AV_H, RAGGIO, BORDO = 600, 1240, 440, 616, 36, 6
CROP = (130, 230, 820, 1148)   # x, y, w, h  (stesso rapporto 440:616)

LAV = os.path.join(QUI, 'montaggio')
os.makedirs(LAV, exist_ok=True)


def ff(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)


def maschere():
    m = Image.new('L', (AV_W, AV_H), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, AV_W - 1, AV_H - 1), RAGGIO, fill=255)
    m.save(os.path.join(LAV, 'maschera.png'))
    W, H = AV_W + 2 * BORDO, AV_H + 2 * BORDO
    c = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle((0, 0, W - 1, H - 1), RAGGIO + BORDO, fill=(255, 255, 255, 255))
    c.save(os.path.join(LAV, 'cornice.png'))


def sorgente_avatar():
    if not SEGNAPOSTO:
        return ['-i', os.path.join(QUI, 'avatar/avatar.mp4')]
    foto = os.path.join(LAV, 'segnaposto.png')
    Image.open(os.path.join(QUI, 'avatar/aki.jpg')).resize((1080, 1935)).crop((0, 0, 1080, 1920)).save(foto)
    return ['-loop', '1', '-framerate', str(FPS), '-i', foto]


def scena(t):
    sid, a, d = t['id'], t['inizio'], t['durata']
    out = os.path.join(LAV, f'{sid}.mp4')
    strato = ['-f', 'concat', '-safe', '0', '-i', os.path.join(QUI, 'slide/out', sid, 'concat.txt')]
    av = sorgente_avatar()
    if SEGNAPOSTO:
        av_in = av
    else:
        av_in = ['-ss', f'{a:.3f}', '-t', f'{d + 0.2:.3f}'] + av
    if TIPO[sid] == 'GRAFICA':
        ingressi = strato + av_in
        fondo = f'[0:v]fps={FPS},format=rgba,trim=duration={d:.3f},setpts=PTS-STARTPTS[base];'
        i_av = 1
    else:
        # clip da 10 s rallentata a durata di scena, virata al verde (copione:
        # audio rimosso, dominante verde in post-produzione)
        clip = os.path.join(QUI, 'clip', f'{sid}.mp4')
        lento = d / 10.0417
        ingressi = ['-i', clip] + strato + av_in
        fondo = (f'[0:v]setpts=PTS*{lento:.4f},minterpolate=fps={FPS}:mi_mode=blend,'
                 f'scale=1080:1920:flags=lanczos,'
                 f'eq=saturation=0.8:brightness=-0.04,'
                 f'colorchannelmixer=rr=0.82:rg=0.08:gg=1.0:gb=0.04:bb=0.80,'
                 f'trim=duration={d:.3f},setpts=PTS-STARTPTS,format=rgba[clip];'
                 f'[1:v]fps={FPS},format=rgba,trim=duration={d:.3f},setpts=PTS-STARTPTS[testo];'
                 f'[clip][testo]overlay=0:0[base];')
        i_av = 2
    cx, cy, cw, ch = CROP
    filtro = (fondo +
              f'[{i_av}:v]fps={FPS},trim=duration={d:.3f},setpts=PTS-STARTPTS,'
              f'crop={cw}:{ch}:{cx}:{cy},scale={AV_W}:{AV_H}:flags=lanczos,format=rgba[avv];'
              f'[avv][m]alphamerge[avr];'
              f'[base][c]overlay={AV_X - BORDO}:{AV_Y - BORDO}[b2];'
              f'[b2][avr]overlay={AV_X}:{AV_Y},format=yuv420p[v]')
    k = sum(1 for x in ingressi if x == '-i')
    filtro = filtro.replace('[m]', f'[{k}:v]').replace('[c]', f'[{k + 1}:v]')
    ff(*ingressi, '-i', os.path.join(LAV, 'maschera.png'), '-i', os.path.join(LAV, 'cornice.png'),
       '-filter_complex', filtro, '-map', '[v]', '-r', str(FPS),
       '-frames:v', str(round(d * FPS)), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', out)
    return out


if __name__ == '__main__':
    maschere()
    parti = []
    for t in TEMPI:
        parti.append(scena(t))
        print('scena', t['id'], 'fatta')
    lista = os.path.join(LAV, 'lista.txt')
    open(lista, 'w').write(''.join(f"file '{p}'\n" for p in parti))
    nome = 'montato-segnaposto.mp4' if SEGNAPOSTO else 'Reel_Decreto_PA_2026_Sanita_9x16.mp4'
    ff('-f', 'concat', '-safe', '0', '-i', lista, '-i', os.path.join(QUI, 'audio/grezzo-1.mp3'),
       '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
       '-movflags', '+faststart', '-shortest', os.path.join(QUI, nome))
    print('montato:', nome)
