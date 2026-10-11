"""Preparazione locale di un video La Parola Giusta (stesso metodo del Video 02).
  1. voci: silenceremove (pause > 0,45 s → 0,35 s) + atempo 1.12 + 0,25 s di coda, mp3 id3v2.3
     → audio/finali/, durate in audio/durate.txt
  2. b-roll: clip rallentate (minterpolate) o immagini con zoom lento 8 %, lunghe quanto la voce
     → broll/Sxx_broll.mp4 (da broll/Sxx_broll_sorgente.{mp4,png})
  3. avatar: le tracce *_avatar in fila con 0,6 s di pausa → audio/avatar-unico.mp3 + avatar-tempi.json
Uso: prepara.py CARTELLA_PROGETTO"""
import json, os, subprocess, sys, wave
P = os.path.abspath(sys.argv[1])
A = lambda *x: os.path.join(P, *x)
def ff(*a): subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *a], check=True)
def dur(f): return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)

ids = sorted(json.load(open(A('testi.json'))))
os.makedirs(A('audio/finali'), exist_ok=True)
D = {}
for i in ids:
    ff('-i', A('audio', f'grezzo-{i}.mp3'), '-af', 'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1:'
       'stop_periods=-1:stop_duration=0.45:stop_threshold=-50dB:stop_silence=0.35,atempo=1.12,apad=pad_dur=0.25',
       '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', A('audio/finali', f'{i}.mp3'))
    D[i] = dur(A('audio/finali', f'{i}.mp3'))
open(A('audio/durate.txt'), 'w').write(''.join(f'{i} {D[i]:.6f}\n' for i in ids))
print('parlato', round(sum(D.values()), 1), 's')

for i in [i for i in ids if i.endswith('_broll')]:
    d = D[i] + 0.2
    src = [f for f in os.listdir(A('broll')) if f.startswith(i + '_sorgente')][0]
    if src.endswith('.mp4'):
        k = max(1.0, d / dur(A('broll', src)))
        ff('-i', A('broll', src), '-vf', f'setpts=PTS*{k:.4f},minterpolate=fps=25:mi_mode=blend,scale=1920:1080:flags=lanczos,format=yuv420p',
           '-an', '-t', f'{d:.3f}', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', A('broll', f'{i}.mp4'))
        print(i, f'clip ×{k:.2f}')
    else:
        n = round(d * 25)
        ff('-loop', '1', '-framerate', '25', '-i', A('broll', src), '-vf',
           f"scale=3840:2160:flags=lanczos,zoompan=z='1+0.08*on/{n}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=25,format=yuv420p",
           '-frames:v', str(n), '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', A('broll', f'{i}.mp4'))
        print(i, 'immagine con zoom')

G = 0.6
out = wave.open(A('audio/avatar-unico.wav'), 'wb'); out.setnchannels(1); out.setsampwidth(2); out.setframerate(44100)
tempi, t = [], 0.0
for i in [i for i in ids if i.endswith('_avatar')]:
    tmp = A('audio', f'_{i}.wav')
    ff('-i', A('audio/finali', f'{i}.mp3'), '-ar', '44100', '-ac', '1', tmp)
    w = wave.open(tmp); n = w.getnframes(); out.writeframes(w.readframes(n)); w.close(); os.remove(tmp)
    tempi.append({'id': i, 'inizio': round(t, 4), 'durata': round(n / 44100, 4)}); t += n / 44100
    out.writeframes(b'\0\0' * int(G * 44100)); t += int(G * 44100) / 44100
out.close()
json.dump(tempi, open(A('audio/avatar-tempi.json'), 'w'), indent=1)
ff('-i', A('audio/avatar-unico.wav'), '-c:a', 'libmp3lame', '-b:a', '192k', '-id3v2_version', '3', A('audio/avatar-unico.mp3'))
print('avatar:', len(tempi), 'scene,', round(t, 1), 's; mp3', os.path.getsize(A('audio/avatar-unico.mp3')), 'byte')
