"""Scrive accanto ai render: viewer.html (scorri le clip), compare.html (originale vs anteprima, sincronizzati),
TIMING.md (tabella per il montaggio) e markers.csv (in/out con timecode, da importare o copiare nel montaggio).
uso: python3 make_pages.py motion/plan.json motion/out/preview.mp4"""
import json, sys, pathlib, os, subprocess, csv
from fractions import Fraction
if len(sys.argv) < 3: sys.exit(__doc__)
S = pathlib.Path(__file__).resolve().parent.parent / 'templates'
plan_p = pathlib.Path(sys.argv[1]).resolve(); P = json.load(open(plan_p, encoding='utf-8')); base = plan_p.parent
preview = pathlib.Path(sys.argv[2]).resolve(); out = preview.parent
rel = lambda f: os.path.relpath((base / f).resolve(), out)
fmt = lambda t: f"{int(t//60)}:{t%60:05.2f}"
title = P.get('title', 'Video')
def probe(f, entries):
    return subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', entries, '-of', 'csv=p=0', str(f)], capture_output=True, text=True).stdout.strip()
W, H = (int(x) for x in (probe(preview, 'stream=width,height') or '1920,1080').split(',')[:2])
fps = Fraction(P.get('fps') or probe(preview, 'stream=r_frame_rate') or '30')
def tc(t):  # timecode HH:MM:SS:FF (non drop-frame) al frame rate del video
    nom = round(float(fps)); f = round(t * float(fps)); s, ff = divmod(f, nom); m, s = divmod(s, 60); h, m = divmod(m, 60)
    return f'{h:02}:{m:02}:{s:02}:{ff:02}'
def web_src(c):
    f = (base / c['file']).resolve()
    if f.suffix.lower() == '.mov':  # i browser non leggono ProRes: crea un'anteprima su nero per la pagina
        pv = out / (f.stem + '_preview.mp4')
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', f'color=black:s={W}x{H}', '-i', str(f), '-filter_complex', '[0][1]overlay=shortest=1',
                        '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', str(pv)], check=True)
        return pv.name
    return os.path.relpath(f, out)
kind_it = lambda c: 'pannello trasparente' if c.get('kind') == 'panel' else 'cutaway a tutto schermo'
clips = [{'n': c['id'], 't': c['title'], 'tc': f"{fmt(c['in'])} – {fmt(c['out'])}", 'q': c.get('line', ''), 'f': pathlib.Path(c['file']).name,
          'src': web_src(c), **({'alpha': True} if c.get('kind') == 'panel' else {})} for c in P['clips']]
clips.insert(0, {'n': '▶', 'full': True, 't': 'Anteprima completa · il tuo video con tutte le clip', 'tc': 'video intero',
                 'q': 'Composito per la revisione. Per il montaggio finale, posiziona le clip nel tuo editor.', 'f': preview.name, 'src': preview.name})
aspect = f'{W}/{H}'
v = (open(S / 'viewer.html', encoding='utf-8').read().replace('/*CLIPS*/[]', json.dumps(clips, ensure_ascii=False)).replace('/*TITLE*/', title)
     .replace('/*SUB*/', f"{len(P['clips'])} clip + anteprima completa").replace('/*ASPECT*/', aspect))
open(out / 'viewer.html', 'w', encoding='utf-8').write(v)
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(preview)], capture_output=True, text=True).stdout.strip() or 0)
marks = [[c['in'], c['out'], c['id'], c['title']] for c in P['clips']]
c = (open(S / 'compare.html', encoding='utf-8').read().replace('/*DUR*/0', f'{dur:.2f}').replace('/*MARKS*/[]', json.dumps(marks, ensure_ascii=False))
     .replace('/*ORIG*/', rel(P['video'])).replace('/*BROLL*/', preview.name).replace('/*TITLE*/', title).replace('/*ASPECT*/', aspect)
     .replace('/*SUB*/', 'A sinistra o in alto l’originale. A destra o in basso con le motion graphics inserite.'))
open(out / 'compare.html', 'w', encoding='utf-8').write(c); print('scritti', out / 'viewer.html', 'e', out / 'compare.html')
# TIMING.md per il montaggio
rows = ['| File | In | Out | Timecode in | Trattamento | Copre la frase |', '|---|---|---|---|---|---|']
for c in P['clips']:
    rows.append(f"| {pathlib.Path(c['file']).name} | {fmt(c['in'])} | {fmt(c['out'])} | {tc(c['in'])} | {kind_it(c)} | {c.get('line', '')} |")
notes = P.get('notes', [])
open(out / 'TIMING.md', 'w', encoding='utf-8').write(
    f"# Motion graphics per {title}\n\nOgni nome file finisce con il suo punto di ingresso sulla timeline (`0m32s40` = 0:32.40). "
    f"Frame rate: {P.get('fps', fps)}. Brand: {P.get('brand', 'default')}. I pannelli trasparenti sono file ProRes 4444 .mov: mettili su una traccia sopra il video.\n\n"
    + '\n'.join(rows) + ('\n\n## Note (cosa è illustrativo)\n' + '\n'.join('- ' + n for n in notes) if notes else '') + '\n')
with open(out / 'markers.csv', 'w', newline='', encoding='utf-8') as fh:
    w = csv.writer(fh); w.writerow(['id', 'titolo', 'file', 'in_s', 'out_s', 'durata_s', 'tc_in', 'tc_out', 'trattamento'])
    for c in P['clips']:
        w.writerow([c['id'], c['title'], pathlib.Path(c['file']).name, c['in'], c['out'], round(c['out'] - c['in'], 2), tc(c['in']), tc(c['out']), kind_it(c)])
print('scritti', out / 'TIMING.md', 'e', out / 'markers.csv')
