"""Sottotitoli SRT della serie «Chi c'è domani», dai tempi delle parole (audio/parole.json).

Le parole sono quelle dei testi approvati (voce_testi/), con i tempi veri della voce dopo i tagli:
si va a capo alla punteggiatura forte o oltre MAX caratteri. Un file sottotitoli.srt per progetto.
"""
import json, os, re

QUI = os.path.dirname(os.path.abspath(__file__))
PR = os.path.dirname(os.path.dirname(QUI))
MAX = 42


def ts(t):
    ms = round(t * 1000); return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'


def blocchi(parole):
    out, cur = [], []
    for w in parole:
        if cur and len(' '.join(x['w'] for x in cur + [w])) > MAX:
            out.append(cur); cur = []
        cur.append(w)
        if re.search(r'[.?!:]$', w['w']) and len(' '.join(x['w'] for x in cur)) > 12:
            out.append(cur); cur = []
    if cur:
        if out and len(' '.join(x['w'] for x in out[-1] + cur)) <= MAX + 10:
            out[-1] += cur
        else:
            out.append(cur)
    return out


import sys
for ep in sys.argv[1:] or sorted(d for d in os.listdir(PR) if d.startswith('pdro-chicedomani-ep')):
    D = os.path.join(PR, ep)
    tempi = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    parole = json.load(open(f'{D}/audio/parole.json'))
    righe, n = [], 0
    for sid, ws in parole.items():
        t0 = tempi[sid]['inizio']; fine = t0 + tempi[sid]['durata']
        bl = blocchi(ws)
        for i, b in enumerate(bl):
            a = t0 + b[0]['a']; z = t0 + (bl[i + 1][0]['a'] - 0.05 if i + 1 < len(bl) else min(b[-1]['b'] + 0.4, tempi[sid]['durata']))
            n += 1; righe.append(f"{n}\n{ts(a)} --> {ts(min(z, fine))}\n{' '.join(x['w'] for x in b)}\n")
    open(f'{D}/sottotitoli.srt', 'w').write('\n'.join(righe))
    print(ep, n, 'blocchi')
