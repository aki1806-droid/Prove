"""Montaggio del video «Convenzione XTE Salute» (16:9, 1920x1080, 25 fps).

    python3 monta.py

Copertina del pacchetto 3 s muta (02_slide/S00_copertina.png) → le 10 scene della voce → chiusura 10 s muta
(grafica/S11_chiusura.png, la slide del pacchetto con gli accenti corretti da chiusura.mjs). Copertina e chiusura con
una lenta spinta in avanti.
Scene avatar (S01, S04, S08, S10): Aki a inquadratura piena, tagliato dal video avatar fatto su audio/voce-avatar.mp3
(tempi-avatar.json), mai coperto da grafiche. Scene slide: il motore (../chicedomani/rendi.mjs, formato 1920x1080)
rimette i pezzi della slide a tempo sulle parole (serie.py). Audio: audio/wav/Sxx.wav (voci.py).
Sottotitoli a parte (sottotitoli.srt dalla voce, spostati di 3 s per la copertina).
"""
import json, os, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
D = f'{PR}/pdro-xte-salute'; L = f'{D}/montaggio'; os.makedirs(L, exist_ok=True)
FPS, COP, FINE = 25, 3.0, 10.0
NOME = 'PDRO_Convenzione_XTE_Salute_16x9'


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def ferma(img, d, out):
    n = round(d * FPS)
    ff('-loop', '1', '-framerate', str(FPS), '-i', img, '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-filter_complex',
       f"[0:v]scale=3840:2160:flags=lanczos,zoompan=z='1+0.03*on/{n}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps={FPS},format=yuv420p[v]",
       '-map', '[v]', '-map', '1:a', '-frames:v', str(n), '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium',
       '-c:a', 'pcm_s16le', out)


def monta():
    tempi = json.load(open(f'{D}/audio/tempi-scene.json'))
    tav = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-avatar.json'))}
    anim = json.load(open(f'{D}/grafica/anim.json'))

    def livello(t):
        g = f"{L}/G_{t['id']}.mp4"
        if not os.path.exists(g) or os.environ.get('RIFAI'):
            subprocess.run(['node', f'{PR}/strumenti/chicedomani/rendi.mjs', D, t['id'], f"{t['durata']:.4f}", g], check=True)
        return g
    with ThreadPoolExecutor(3) as ex:
        G = dict(zip([t['id'] for t in tempi if t['id'] in anim], ex.map(livello, [t for t in tempi if t['id'] in anim])))
    pezzi = [f'{L}/00_copertina.mov']; ferma(f'{D}/02_slide/S00_copertina.png', COP, pezzi[0])
    for t in tempi:
        sid, d = t['id'], t['durata']; out = f'{L}/{sid}.mov'; wav = f'{D}/audio/wav/{sid}.wav'
        if sid in tav:
            ff('-ss', f"{tav[sid]['inizio']:.3f}", '-i', f'{D}/avatar/avatar.mp4', '-i', wav, '-map', '0:v', '-map', '1:a',
               '-t', f'{d:.3f}', '-vf', f'fps={FPS},scale=1920:1080:flags=lanczos,format=yuv420p',
               '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-c:a', 'pcm_s16le', out)
        else:
            ff('-i', G[sid], '-i', wav, '-map', '0:v', '-map', '1:a', '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '16',
               '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'pcm_s16le', out)
        pezzi.append(out)
    pezzi.append(f'{L}/99_chiusura.mov'); ferma(f'{D}/grafica/S11_chiusura.png', FINE, pezzi[-1])
    open(f'{L}/lista.txt', 'w').write(''.join(f"file '{p}'\n" for p in pezzi))
    ff('-f', 'concat', '-safe', '0', '-i', f'{L}/lista.txt', '-c:v', 'libx264', '-preset', 'slow', '-crf', '19',
       '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'{D}/{NOME}.mp4')
    # sottotitoli dalla voce, spostati della copertina
    subprocess.run([sys.executable, f'{PR}/strumenti/chicedomani/sottotitoli.py', 'pdro-xte-salute'], check=True, capture_output=True)

    def sposta(m):
        h, mi, s, ms = map(int, m.groups()); t = h * 3600000 + mi * 60000 + s * 1000 + ms + int(COP * 1000)
        return f'{t // 3600000:02d}:{t // 60000 % 60:02d}:{t // 1000 % 60:02d},{t % 1000:03d}'
    srt = open(f'{D}/sottotitoli.srt').read()
    open(f'{D}/sottotitoli.srt', 'w').write(re.sub(r'(\d\d):(\d\d):(\d\d),(\d\d\d)', sposta, srt))
    print('montato', NOME, f"{COP + sum(t['durata'] for t in tempi) + FINE:.1f} s")


if __name__ == '__main__':
    monta()
