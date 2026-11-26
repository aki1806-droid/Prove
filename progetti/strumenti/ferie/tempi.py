"""Tempi delle scene del video «Ferie» dalle voci audio/voce_01..NN.mp3 -> audio/scene.json.   python3 tempi.py <cartella>"""
import glob, json, subprocess, sys
D = sys.argv[1]
d = lambda f: round(float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f])), 2)
V = sorted(glob.glob(f'{D}/audio/voce_*.mp3'))
lead = [0.7] + [0.5] * (len(V) - 1)
tail = [0.9, 0.9, 1.4, 1.0, 1.0, 1.0, 3.8, 6.5][:len(V)]   # scena 7: la scheda dei contatti; scena 8: il QR del sondaggio
t, sc = 0, []
for i, f in enumerate(V):
    v = d(f); du = lead[i] + v + tail[i]
    sc.append({'n': i + 1, 'inizio': round(t, 2), 'durata': round(du, 2), 'voce': round(t + lead[i], 2), 'dv': v}); t += du
json.dump(sc, open(f'{D}/audio/scene.json', 'w'), indent=1); print(D, len(sc), 'scene', round(t, 2), 's')
