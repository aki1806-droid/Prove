"""Calendario dell'avvento dei diritti: dal montaggio unico (25 scene) ritaglia 25 reel separati, uno per casella (1-24
dicembre) più il finale del 24/12 con Achille. Ogni reel: fermo immagine di 0,8 s in coda, audio con dissolvenza in
entrata e in uscita, −16 LUFS.
    python3 strumenti/venti/taglia_calendario.py   -> pdro-20f-04-calendario-avvento/reel/PDRO_20F_04_Casella_XX_9x16.mp4
"""
import json, os, re, subprocess
PR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
D = f'{PR}/pdro-20f-04-calendario-avvento'; SRC = f'{D}/PDRO_20F_04_Calendario_avvento_diritti_9x16.mp4'
os.makedirs(f'{D}/reel', exist_ok=True)
for t in json.load(open(f'{D}/audio/tempi-scene.json')):
    n = int(t['id'][1:]); nome = f'PDRO_20F_04_Casella_{n:02d}_9x16' if n <= 24 else 'PDRO_20F_04_Finale_buone_feste_9x16'
    a, d = t['inizio'], t['durata']; out = f'{D}/reel/{nome}.mp4'; tmp = out + '.tmp.mp4'
    fil_a = f'afade=t=in:d=0.08,apad=pad_dur=0.8,afade=t=out:st={d + 0.3:.3f}:d=0.5'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.3f}', '-t', f'{d:.3f}', '-i', SRC, '-vf', 'tpad=stop_mode=clone:stop_duration=0.8',
                    '-af', fil_a, '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', tmp], check=True)
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', tmp, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    g = -16 - float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1])
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-af', f'volume={g:.2f}dB,alimiter=limit=0.89:level=false', '-c:v', 'copy',
                    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
    os.remove(tmp); print(nome, f'{d + 0.8:.1f} s', f'{g:+.1f} dB')
