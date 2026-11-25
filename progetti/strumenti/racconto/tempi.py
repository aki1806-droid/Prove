"""«Sentirsi per sentire – il racconto»: tempi delle voci e dei sottotitoli.
Ogni frase parte nel suo spazio dello storyboard (anticipo fino a 0,5 s) e le righe dello srt che le appartengono si
ridistribuiscono in proporzione sulla durata vera della voce.   python3 tempi.py <cartella progetto>"""
import glob, json, re, subprocess, sys
D = sys.argv[1]; P = glob.glob(f'{D}/V9*')[0]
dur = lambda f: float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))
sl = [tuple(map(float, m)) for m in re.findall(r'\[\s*([\d.]+)–\s*([\d.]+) s\]', open(f'{P}/voce_fuori_campo.txt').read())]
vt = []
for i, (a, b) in enumerate(sl):
    f = f'voce_{i + 1:02d}.mp3'; d = round(dur(f'{D}/audio/{f}'), 2)
    vt.append([f, round(a + max(0.15, min(0.5, b - a - d - 0.35)), 2), d])
json.dump(vt, open(f'{D}/audio/tempi_voce.json', 'w'))
ts = lambda s: (lambda h, m, x: int(h) * 3600 + int(m) * 60 + float(x.replace(',', '.')))(*s.split(':'))
sub = []
for bl in open(f'{P}/sottotitoli.srt', encoding='utf-8').read().strip().split('\n\n'):
    r = bl.split('\n'); a, b = [ts(x.strip()) for x in r[1].split('-->')]; sub.append([a, b, ' '.join(r[2:])])
out = []
for i, (a, b) in enumerate(sl):
    rr = [s for s in sub if a <= s[0] < b]
    s0, s1 = rr[0][0], rr[-1][1]; _, st, d = vt[i]
    for x, y, t in rr:
        k = d / (s1 - s0)
        out.append([round(st + (x - s0) * k, 2), round(st + (y - s0) * k + (0.5 if (x, y, t) == tuple(rr[-1]) else 0), 2), t, i + 1])
json.dump(out, open(f'{D}/audio/tempi_sottotitoli.json', 'w'), ensure_ascii=False)
print(len(vt), 'voci', len(out), 'sottotitoli')
