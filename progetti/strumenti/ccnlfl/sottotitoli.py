"""sottotitoli.srt di ogni video della serie «CCNL Funzioni Locali» (non impressi: scelta di Achille), dai tempi veri delle
parole della voce (audio/parole.json e audio/tempi-video.json). Righe di al più MAXC caratteri, due per blocco; i numeri
restano come li dice Andrea, in lettere.

    python3 strumenti/ccnlfl/sottotitoli.py 01 [02 ...]
"""
import json, re, sys
from voci import cartella

MAXC = 38


def tc(t):
    return f'{int(t // 3600):02d}:{int(t // 60 % 60):02d}:{int(t % 60):02d},{round(t % 1 * 1000) % 1000:03d}'


if __name__ == '__main__':
    for n in sys.argv[1:]:
        C = cartella(n); tv = json.load(open(f'{C}/audio/tempi-video.json')); par = json.load(open(f'{C}/audio/parole.json'))
        blocchi = []
        for sid in sorted(tv['scene']):
            v0, cur = tv['scene'][sid][0], []
            for w in par[sid]:
                cur.append(w); testo = ' '.join(x['w'] for x in cur)
                if re.search(r'[.?!:]$', w['w']) or len(testo) > 2 * MAXC - 8:
                    blocchi.append((v0 + cur[0]['a'], v0 + cur[-1]['b'] + 0.3, testo)); cur = []
            if cur:
                blocchi.append((v0 + cur[0]['a'], v0 + cur[-1]['b'] + 0.3, ' '.join(x['w'] for x in cur)))
        out = []
        for k, (a, b, s) in enumerate(blocchi):
            if k + 1 < len(blocchi):
                b = min(b, blocchi[k + 1][0] - 0.05)
            p = s.split(); i = min(range(1, len(p)), key=lambda i: abs(len(' '.join(p[:i])) - len(s) / 2)) if len(s) > MAXC and len(p) > 1 else len(p)
            out.append(f"{k + 1}\n{tc(a)} --> {tc(b)}\n{' '.join(p[:i])}" + (f"\n{' '.join(p[i:])}" if i < len(p) else '') + '\n')
        open(f'{C}/sottotitoli.srt', 'w').write('\n'.join(out)); print(n, len(out), 'blocchi')
