"""Composito di anteprima: sovrappone le clip renderizzate al video sorgente (tagli netti, audio originale).
uso: python3 composite.py motion/plan.json motion/out/preview.mp4
Le clip più corte del loro slot tengono l'ultimo frame. Le .mov trasparenti vengono composte con l'alpha."""
import json, sys, subprocess, pathlib
if len(sys.argv) < 3: sys.exit(__doc__)
P = json.load(open(sys.argv[1], encoding='utf-8')); base = pathlib.Path(sys.argv[1]).resolve().parent; out = sys.argv[2]
rel = lambda f: str(f if pathlib.Path(f).is_absolute() else (base / f).resolve())
probe = lambda f: subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip()
src = rel(P['video'])
if not pathlib.Path(src).exists(): sys.exit(f'video sorgente mancante: {src}')
size = probe(src); missing = [c['file'] for c in P['clips'] if not pathlib.Path(rel(c['file'])).exists()]
if missing: sys.exit('clip mancanti (renderizzale prima): ' + ', '.join(missing))
for c in P['clips']:
    if probe(rel(c['file'])) != size: print(f"ATTENZIONE: {c['file']} è {probe(rel(c['file']))}, il video è {size}: verrà sovrapposta senza scalare.", file=sys.stderr)
pathlib.Path(out).parent.mkdir(parents=True, exist_ok=True)
cmd = ['ffmpeg', '-loglevel', 'error', '-y', '-i', src]; fc = []; last = '0:v'
for i, c in enumerate(P['clips'], 1):
    cmd += ['-i', rel(c['file'])]
    fc.append(f"[{i}:v]format=yuva444p,tpad=stop_mode=clone:stop_duration={max(2, c['out'] - c['in']):.2f},setpts=PTS-STARTPTS+{c['in']}/TB[c{i}]")
    fc.append(f"[{last}][c{i}]overlay=enable='between(t,{c['in']},{c['out']})':eof_action=pass[v{i}]"); last = f'v{i}'
fc.append(f'[{last}]format=yuv420p[v]')
cmd += ['-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '0:a?', '-c:v', 'libx264', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out]
subprocess.run(cmd, check=True); print('scritto', out)
