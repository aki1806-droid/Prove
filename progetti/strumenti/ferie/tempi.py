"""Tempi delle scene del video «Ferie» dalle voci audio/voce_01..NN.mp3 -> audio/scene.json.   python3 tempi.py <cartella>"""
import glob, json, subprocess, sys
D = sys.argv[1]
d = lambda f: round(float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f])), 2)
V = sorted(glob.glob(f'{D}/audio/voce_*.mp3'))
TAIL = {'1': 0.9, '2': 0.9, '3': 1.4, '3b': 1.6, '4': 1.0, '5': 1.0, '6': 1.0, '7': 3.8, '8': 6.5}   # 7: contatti; 8: QR del sondaggio
idf = lambda f: f.split('voce_')[1][:-4].lstrip('0')
t, sc = 0, []
for i, f in enumerate(V):
    k = idf(f); ld = 0.7 if i == 0 else 0.5
    v = d(f); du = ld + v + TAIL[k]
    sc.append({'n': i + 1, 'id': k, 'file': f.split('/')[-1], 'inizio': round(t, 2), 'durata': round(du, 2), 'voce': round(t + ld, 2), 'dv': v}); t += du
json.dump(sc, open(f'{D}/audio/scene.json', 'w'), indent=1); print(D, len(sc), 'scene', round(t, 2), 's')
