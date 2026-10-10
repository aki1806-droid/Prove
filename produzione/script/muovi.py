#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sposta un confine di taglio, nominando il blocco invece dell'indice.

    python3 muovi.py <dir> <chunk> <blocco> <nuovo_tempo>

`<chunk>` e' la LETTERA della traccia (A, B o C), non un numero. `<blocco>` e'
l'id del blocco che FINISCE su quel confine: `muovi.py . A s08 109.99` sposta
il confine fra `s08` e `s09`.

Serve perche' gli spostamenti a mano vanno rifatti da capo ogni volta che una
traccia viene rigenerata — `tagli.py allinea` azzera `tagli.json` — e rifarne
cinque contando gli indici a memoria e' il modo piu' veloce per sbagliarne uno.
"""
import json
import sys

if len(sys.argv) != 5:
    sys.exit(__doc__)
d, k, blk, t = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4])
ch = json.load(open(f'{d}/chunks.json'))
tg = json.load(open(f'{d}/tagli.json'))
i = ch[k].index(blk)
vecchio = tg[k][i + 1]
tg[k][i + 1] = t
json.dump(tg, open(f'{d}/tagli.json', 'w'), indent=1)
print(f'{k} {blk} -> {ch[k][i + 1]}: {vecchio:.2f} -> {t:.2f}')
