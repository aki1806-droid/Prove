"""Allunga una scena già tagliata aggiungendo silenzio in coda (voce-completa.wav, .mp3 e tempi-scene.json).
Serve al n. 08 «Microfono in corsia»: dopo «Domanda numero uno/due» restano 6,6 s per le risposte (di fantasia) a schermo.
    python3 strumenti/venti/allunga.py <cartella> S02=6.6 S03=6.6
"""
import json, subprocess, sys
D = sys.argv[1]; extra = {k: float(v) for k, v in (a.split('=') for a in sys.argv[2:])}
T = json.load(open(f'{D}/audio/tempi-scene.json'))
pezzi, t0, nuovo, spost = [], 0.0, [], 0.0
for t in T:
    fine = t['inizio'] + t['durata']
    pezzi.append(f"[0:a]atrim={t['inizio']:.4f}:{fine:.4f},asetpts=PTS-STARTPTS" + (f",apad=pad_dur={extra[t['id']]}" if t['id'] in extra else '') + f"[a{len(pezzi)}]")
    d = t['durata'] + extra.get(t['id'], 0.0); nuovo.append({**t, 'inizio': round(t0, 4), 'durata': round(d, 4)}); t0 += d
f = ';'.join(pezzi) + ';' + ''.join(f'[a{k}]' for k in range(len(pezzi))) + f'concat=n={len(pezzi)}:v=0:a=1[o]'
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{D}/audio/voce-completa.wav', '-filter_complex', f, '-map', '[o]', f'{D}/audio/_v.wav'], check=True)
subprocess.run(['mv', f'{D}/audio/_v.wav', f'{D}/audio/voce-completa.wav'], check=True)
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{D}/audio/voce-completa.wav', '-b:a', '192k', f'{D}/audio/voce-completa.mp3'], check=True)
json.dump(nuovo, open(f'{D}/audio/tempi-scene.json', 'w'), indent=1)
print(' '.join(f"{t['id']}:{t['durata']:.1f}" for t in nuovo))
