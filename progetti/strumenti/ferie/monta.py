"""Video «Ferie»: fotogrammi (render.js) + voci Luca Ward ai tempi di audio/scene.json + musica + effetti.
    python3 monta.py <cartella progetto>"""
import json, os, subprocess, sys
D = os.path.abspath(sys.argv[1]); FPS = 30
S = json.load(open(f'{D}/audio/scene.json')); T = S[-1]['inizio'] + S[-1]['durata']
ins = ['-framerate', str(FPS), '-i', f'{D}/fotogrammi/f%05d.jpg', '-i', f'{D}/suoni/musica.mp3']
voc = '+'.join(f"between(t,{s['voce'] - 0.3:.2f},{s['voce'] + s['dv'] + 0.3:.2f})" for s in S)
fc = [f"[1:a]aresample=48000,atrim=0:{T:.2f},volume='if({voc},0.10,0.32)':eval=frame,afade=t=out:st={T - 2.5:.2f}:d=2.5[mu]"]
mix = ['[mu]']; k = 2
for i, s in enumerate(S):
    ins += ['-i', f'{D}/audio/voce_{i + 1:02d}.mp3']; ms = int(s['voce'] * 1000)
    fc.append(f'[{k}:a]aresample=48000,adelay={ms}|{ms}[v{i}]'); mix.append(f'[v{i}]'); k += 1
v = lambda n: S[n - 1]['voce'] - S[n - 1]['inizio']
ev = [('whoosh', s['inizio'], 0.45) for s in S[1:]] + [('timbro', S[1]['inizio'] + v(2) + 6.6, 0.6),
      ('timbro', S[2]['inizio'] + v(3) + 3.6, 0.6), ('timbro', S[4]['inizio'] + v(5) + 2.3, 0.6)]
for j, (f, t, vol) in enumerate(ev):
    ins += ['-i', f'{D}/suoni/{f}.mp3']; ms = int(t * 1000)
    fc.append(f'[{k}:a]aresample=48000,volume={vol},adelay={ms}|{ms}[e{j}]'); mix.append(f'[e{j}]'); k += 1
fc.append(''.join(mix) + f'amix=inputs={len(mix)}:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11[a]')
out = f'{D}/PDRO_Ferie_DL144_2026.mp4'
subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '0:v', '-map', '[a]',
                '-t', f'{T:.2f}', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k',
                '-movflags', '+faststart', out], check=True)
print('montato', out)
