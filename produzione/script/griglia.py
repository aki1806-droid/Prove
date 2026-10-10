#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Rimette a posto una catena di confini sbagliati, provando tutte le pause.

    python3 griglia.py <dir> <chunk> <primo_blocco> <ultimo_blocco>

`banda.py sposta` guarda una coppia di blocchi alla volta, e su una catena di
confini sbagliati non trova la soluzione: ogni singola mossa aggiusta una
coppia e ne rompe un'altra. Qui si tengono fissi i due estremi della finestra
e si provano TUTTE le combinazioni di pause per i confini interni, tenendo
quella che minimizza lo scarto peggiore.

Si usa appena i confini sospetti sono piu' di due e consecutivi. La finestra
costa: il numero di combinazioni cresce in fretta, quindi si tiene a cinque o
sei blocchi. Se serve piu' larga, si applica prima lo spostamento gia' sicuro
con `muovi.py` e poi si rilancia la griglia sulla parte che resta.

Non scrive niente: stampa le sei combinazioni migliori, e gli spostamenti si
applicano con `muovi.py`.
"""
import itertools
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tagli as T


def netto(s):
    return len(re.sub(r'\[[a-z]+\]\s*', '', s))


def griglia(d, k, b1, b2):
    B = {x['id']: x['text'] for x in json.load(open(f'{d}/blocchi.json'))}
    ch = json.load(open(f'{d}/chunks.json'))
    tg = json.load(open(f'{d}/tagli.json'))
    ids = ch[k]
    sil = sorted(T.silenzi(f'{d}/unico_{k}_raw.mp3'))

    def muto(a, b):
        return sum(max(0.0, min(z, b) - max(x, a)) for x, z in sil)

    voce_tot = sum((tg[k][j + 1] - tg[k][j]) - muto(tg[k][j], tg[k][j + 1])
                   for j in range(len(ids)))
    cps = sum(netto(B[x]) for x in ids) / voce_tot

    i1, i2 = ids.index(b1), ids.index(b2)
    a0, zz = tg[k][i1], tg[k][i2 + 1]
    pause = [(x + z) / 2 for x, z in sil if a0 < (x + z) / 2 < zz]
    n = i2 - i1
    best = []
    for combo in itertools.combinations(pause, n):
        t = [a0] + list(combo) + [zz]
        sc = [((t[j + 1] - t[j]) - muto(t[j], t[j + 1]))
              - netto(B[ids[i1 + j]]) / cps for j in range(n + 1)]
        best.append((max(abs(x) for x in sc), combo, sc))
    best.sort()
    for m, combo, sc in best[:6]:
        print(f'max {m:5.2f}  ' + '  '.join(f'{p:.2f}' for p in combo))
        print('          ' + '  '.join(f'{ids[i1 + j]} {sc[j]:+.2f}'
                                       for j in range(n + 1)))
    return best


if __name__ == '__main__':
    if len(sys.argv) != 5:
        sys.exit(__doc__)
    griglia(*sys.argv[1:5])
