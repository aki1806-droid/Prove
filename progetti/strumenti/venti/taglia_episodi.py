"""Taglia un video a episodi in reel separati: ogni episodio è la sua scena più la chiusura (ultima scena), con dissolvenze
brevi e −16 LUFS. Serve al 13 «Dizionario della corsia» (A, B, C da pubblicare separatamente).
    python3 strumenti/venti/taglia_episodi.py <cartella> <video.mp4> S01:A S02:B S03:C
"""
import json, os, re, subprocess, sys
D, V = sys.argv[1], sys.argv[2]; coppie = [a.split(':') for a in sys.argv[3:]]
T = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
fine = sorted(T.values(), key=lambda t: t['inizio'])[-1]
os.makedirs(f'{D}/reel', exist_ok=True)
base = os.path.basename(V).replace('_9x16.mp4', '')
for sid, nome in coppie:
    a, b = T[sid]['inizio'], T[sid]['inizio'] + T[sid]['durata']; c, d = fine['inizio'], fine['inizio'] + fine['durata']
    out = f'{D}/reel/{base}_{nome}_9x16.mp4'
    f = (f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS[v1];[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.3[a1];"
         f"[0:v]trim={c}:{d},setpts=PTS-STARTPTS[v2];[0:a]atrim={c}:{d},asetpts=PTS-STARTPTS,afade=t=out:st={d - c - 1.2}:d=1.2[a2];"
         f"[v1][a1][v2][a2]concat=n=2:v=1:a=1[v][au];[au]loudnorm=I=-16:TP=-1:LRA=11[ao]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', V, '-filter_complex', f, '-map', '[v]', '-map', '[ao]', '-c:v', 'libx264', '-crf', '18',
                    '-preset', 'medium', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', out], check=True)
    du = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout)
    print(out, f'{du:.1f} s')
