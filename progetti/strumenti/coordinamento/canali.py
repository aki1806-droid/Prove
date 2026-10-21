"""Scena S08 della versione 2 di «Verso il coordinamento» (21/10/2026): i tre canali WhatsApp CISL FP.
Fondo come la S07 (grafiche_v2.mjs), clip dei tre telefoni del pacchetto Kit Contratto 16:9
(pdro-kit-contratto-promo/kit-contratto-heygen/clip/v08-clip-canali.mp4, ritagliato senza il suo logo) nel riquadro menta,
e una card per azienda che entra quando la voce la nomina. Esce clip/S08.mp4 (1080x1920, muto), che monta.py tratta
come le clip delle scene overlay.
    python3 strumenti/coordinamento/canali.py
"""
import json, os, re, subprocess
QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI)); D = f'{PR}/pdro-verso-il-coordinamento'; G = f'{D}/grafica_v2'
CLIP = f'{PR}/pdro-kit-contratto-promo/kit-contratto-heygen/clip/v08-clip-canali.mp4'


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


parole = json.load(open(f'{D}/audio/parole.json'))['S08']
d = next(t['durata'] for t in json.load(open(f'{D}/audio/tempi-scene.json')) if t['id'] == 'S08')
quando = lambda w, n=1: [p['a'] for p in parole if re.sub(r'\W', '', p['w'].lower()) == w][n - 1]
ins = ['-loop', '1', '-t', f'{d:.3f}', '-i', f'{G}/canali_fondo.png', '-i', CLIP]
fil = ['[1:v]crop=1470:780:230:165,scale=1000:-2:flags=lanczos,fps=25,tpad=stop_mode=clone:stop_duration=10[c];'
       '[0:v]format=rgba,fps=25[f];[f][c]overlay=40:568[b0]']
for i, t in enumerate([quando('azienda', 2), quando('ulss'), quando('ulss', 2)], 1):
    ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', f'{G}/canali_n{i}.png']
    fil.append(f'[{i + 1}:v]format=rgba,fade=in:st={t - 0.1:.2f}:d=0.35:alpha=1[n{i}];[b{i - 1}][n{i}]overlay=0:0[b{i}]')
fil.append('[b3]format=yuv420p[v]')
os.makedirs(f'{D}/clip', exist_ok=True)
ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '16', f'{D}/clip/S08.mp4')
print('clip/S08.mp4', f'{d:.1f} s')
