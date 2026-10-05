"""Analizza un video "talking head": specifiche, contact sheet e zone vuote (es. layout picture-in-picture).
Funziona con video orizzontali (16:9), verticali (9:16 Reels/TikTok/Shorts), quadrati (1:1) e 4:5.
uso: python3 inspect_video.py video.mp4 outdir [--bg #RRGGBB]
--bg: colore dello sfondo vuoto (default nero), es. il canvas del brand su cui è composto un avatar HeyGen trasparente.
scrive: outdir/contact.png, outdir/video.json"""
import sys, json, subprocess, os
from math import gcd
import numpy as np

if len(sys.argv) < 3: sys.exit(__doc__)
BG = 0
if '--bg' in sys.argv:
    h = sys.argv[sys.argv.index('--bg') + 1].lstrip('#'); r, g_, b_ = (int(h[i:i+2], 16) for i in (0, 2, 4))
    BG = 0.299 * r + 0.587 * g_ + 0.114 * b_  # luma dello sfondo
    sys.argv[sys.argv.index('--bg'):sys.argv.index('--bg') + 2] = []
v, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
pr = subprocess.run(['ffprobe', '-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', v], capture_output=True, text=True)
if pr.returncode: sys.exit(f'ffprobe non riesce a leggere {v}: {pr.stderr.strip()}')
p = json.loads(pr.stdout)
vids = [s for s in p['streams'] if s['codec_type'] == 'video']
if not vids: sys.exit(f'{v} non contiene una traccia video')
vs = vids[0]
W, H = int(vs['width']), int(vs['height'])
rot = int((vs.get('tags') or {}).get('rotate', 0) or next((d.get('rotation', 0) for d in vs.get('side_data_list', []) if 'rotation' in d), 0) or 0)
if abs(rot) % 180 == 90: W, H = H, W  # video da smartphone salvati ruotati
fps = vs.get('r_frame_rate') or vs.get('avg_frame_rate'); fn, fd = map(int, fps.split('/')); fps_f = fn / fd if fd else 0
dur = float(p['format'].get('duration') or vs.get('duration') or 0)
has_audio = any(s['codec_type'] == 'audio' for s in p['streams'])

g = gcd(W, H); ratio = W / H
named = {16/9: '16:9', 9/16: '9:16', 1: '1:1', 4/5: '4:5', 4/3: '4:3', 21/9: '21:9'}
aspect = next((n for r, n in named.items() if abs(ratio - r) < 0.02), f'{W//g}:{H//g}')
orientation = 'orizzontale' if ratio > 1.05 else 'verticale' if ratio < 0.95 else 'quadrato'

subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', v, '-vf',
                f"fps=1/{max(1, dur/16):.2f},scale={'480:-2' if ratio >= 1 else '-2:480'},tile=4x4:padding=4", '-frames:v', '1', f'{out}/contact.png'])

# griglia di analisi a bassa risoluzione che rispetta le proporzioni (lato lungo = 96 px)
gw, gh = (96, max(2, round(96 / ratio / 2) * 2)) if ratio >= 1 else (max(2, round(96 * ratio / 2) * 2), 96)
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', v, '-vf', f'fps=4,scale={gw}:{gh},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8)[: (len(raw) // (gw * gh)) * gw * gh].reshape(-1, gh, gw)
diff = np.abs(fr.astype(np.int16) - int(round(BG))).astype(np.uint8)  # distanza dallo sfondo vuoto
BAND = 0.375  # una fascia del 37.5% quasi nera lungo un bordo = spazio libero per un pannello

def free_sides(f):
    if f.mean() < 4 and BG < 4: return None  # frame tutto nero (dissolvenza): non decide nulla
    bw, bh = int(gw * BAND), int(gh * BAND)
    sides = {'destra': f[:, gw - bw:], 'sinistra': f[:, :bw], 'basso': f[gh - bh:, :], 'alto': f[:bh, :]}
    return tuple(k for k, a in sides.items() if a.mean() < 8)

sections = []; prev = None; start = 0
for i, f in enumerate(diff):
    s = free_sides(f)
    if s is None: s = prev if prev is not None else ()
    if s != prev:
        if prev is not None: sections.append({'from': start / 4, 'to': i / 4, 'free': prev})
        start = i; prev = s
if prev is not None: sections.append({'from': start / 4, 'to': len(fr) / 4, 'free': prev})
# unisci i tratti più corti di 0.5s al precedente (sfarfallii dell'analisi)
merged = []
for s in sections:
    if merged and (s['to'] - s['from'] < 0.5 or s['free'] == merged[-1]['free']): merged[-1]['to'] = s['to']
    else: merged.append(s)
sections = [{'from': s['from'], 'to': s['to'], 'layout': 'pip' if s['free'] else 'full', **({'free_side': list(s['free'])} if s['free'] else {})} for s in merged]

# segui il box del soggetto in ogni tratto PiP; segnala ridimensionamenti (un pannello pensato per un box può collidere con un altro)
for s in sections:
    if s['layout'] != 'pip': continue
    boxes = []
    for i in range(int(s['from'] * 4), min(len(fr), int(s['to'] * 4))):
        f = diff[i]; cols = np.where(f.max(0) > 20)[0]; rows = np.where(f.max(1) > 20)[0]
        if len(cols) == 0: continue
        boxes.append((i / 4, [int(cols.min() * W / gw), int(rows.min() * H / gh), int((cols.max() + 1) * W / gw), int((rows.max() + 1) * H / gh)]))
    if not boxes: s['layout'] = 'vuoto'; continue
    s['subject_box'] = [min(b[1][0] for b in boxes), min(b[1][1] for b in boxes), max(b[1][2] for b in boxes), max(b[1][3] for b in boxes)]
    changes = []; ref = boxes[0][1]
    for t, b in boxes:
        if max(abs(b[k] - ref[k]) for k in range(4)) > 2 * max(W, H) / 96: changes.append({'at': t, 'box': b}); ref = b
    s['box_changes'] = changes
    if changes: print(f"ATTENZIONE: il box del soggetto cambia dimensione/posizione nel tratto PiP {s['from']}-{s['to']}s a {[c['at'] for c in changes]}. "
                      "Tieni i pannelli lontani dal box più grande, o chiedi all'utente se il cambio è voluto.", file=sys.stderr)

info = {'width': W, 'height': H, 'fps': fps, 'fps_float': round(fps_f, 3), 'duration': round(dur, 3), 'aspect': aspect,
        'orientation': orientation, 'has_audio': has_audio, 'sections': sections}
if orientation == 'verticale':
    # zone coperte dall'interfaccia di Reels/TikTok/Shorts (proporzionali a 1080x1920): tienici fuori testo e cursore
    k = W / 1080
    info['safe_area'] = {'note': 'area sicura per contenuti social verticali', 'x0': round(60 * k), 'y0': round(220 * k), 'x1': round(W - 160 * k), 'y1': round(H - 420 * k)}
if not has_audio: print('ATTENZIONE: il video non ha traccia audio.', file=sys.stderr)
json.dump(info, open(f'{out}/video.json', 'w'), indent=1); print(json.dumps(info, indent=1, ensure_ascii=False))
