"""Le due scene nuove del promo «Kit Contratto» (21/10/2026), 1080x1920 30 fps, mute, lunghe quanto la loro voce:
  scene/s5_modulo.mp4  card «Come averlo» (grafiche.mjs): i tre passi entrano su «compili», «scegli», «kit»;
  scene/s6_canali.mp4  titolo e clip dei tre canali del pacchetto 16:9 (kit-contratto-heygen/clip/v08-clip-canali.mp4),
                       ritagliato senza il suo logo e portato a tutta larghezza;
                       sotto, le card AOUP Padova / ULSS 6 / ULSS 5 sulle parole;
  scene/s7_chiusura.mp4 la chiusura del pacchetto (scene/s6.mp4) con i delegati di riferimento per azienda.
    python3 strumenti/kit/scene_nuove.py
"""
import json, os, re, subprocess
QUI = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(os.path.dirname(os.path.dirname(QUI)), 'pdro-kit-contratto-promo')
G = f'{D}/grafiche_nuove'; FPS = 30


def ff(*a):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)


def quando(parole, w, n=1):
    return [p['a'] for p in parole if re.sub(r'\W', '', p['w'].lower()) == w][n - 1]


tempi = {t['id']: t['durata'] for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
parole = json.load(open(f'{D}/audio/parole.json'))
# S05: base, poi i tre passi in dissolvenza con una salita di 30 px
d = tempi['S05']; ins = ['-loop', '1', '-t', f'{d:.3f}', '-i', f'{G}/s5_base.png']; fil = ['[0:v]format=rgba[b0]']
for i, w in enumerate(['compili', 'scegli', 'kit'], 1):
    t = max(0.15, quando(parole['S05'], w) - 0.1)
    ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', f'{G}/s5_p{i}.png']
    fil.append(f"[{i}:v]format=rgba,fade=in:st={t:.2f}:d=0.35:alpha=1[p{i}];"
               f"[b{i - 1}][p{i}]overlay=0:'30*max(0,1-(t-{t:.2f})/0.35)*gte(t,{t:.2f})+30*lt(t,{t:.2f})'[b{i}]")
fil.append('[b3]fps=30,format=yuv420p[v]')
ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '16', f'{D}/scene/s5_modulo.mp4')
# S06: fondo menta col titolo, clip dei canali sotto
# le card delle aziende entrano quando la voce le nomina
d = tempi['S06']; clip = f'{D}/kit-contratto-heygen/clip/v08-clip-canali.mp4'
ins = ['-loop', '1', '-t', f'{d:.3f}', '-i', f'{G}/s6_fondo.png', '-i', clip]
fil = [f'[1:v]crop=1470:780:230:165,scale=1080:-2:flags=lanczos,fps={FPS},tpad=stop_mode=clone:stop_duration=5[c];'
       f'[0:v]format=rgba,fps={FPS}[f];[f][c]overlay=0:540[b0]']
for i, t in enumerate([quando(parole['S06'], 'azienda', 2), quando(parole['S06'], 'ulss'), quando(parole['S06'], 'ulss', 2)], 1):
    ins += ['-loop', '1', '-t', f'{d:.3f}', '-i', f'{G}/s6_n{i}.png']
    fil.append(f"[{i + 1}:v]format=rgba,fade=in:st={t - 0.1:.2f}:d=0.35:alpha=1[n{i}];[b{i - 1}][n{i}]overlay=0:0[b{i}]")
fil.append('[b3]format=yuv420p[v]')
ff(*ins, '-filter_complex', ';'.join(fil), '-map', '[v]', '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '16', f'{D}/scene/s6_canali.mp4')
# S07: la chiusura del pacchetto (s6) col riquadro dei delegati per azienda, che entra quando la card è ferma
ff('-i', f'{D}/scene/s6.mp4', '-loop', '1', '-i', f'{G}/s7_referenti.png', '-filter_complex',
   '[1:v]format=rgba,fade=in:st=1.9:d=0.4:alpha=1[r];[0:v][r]overlay=0:0:shortest=1,format=yuv420p[v]',
   '-map', '[v]', '-c:v', 'libx264', '-crf', '16', f'{D}/scene/s7_chiusura.mp4')
print('scene nuove fatte')
