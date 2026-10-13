#!/usr/bin/env python3
"""
Confini dei blocchi per le tracce generate con HeyGen `create_speech`.

    python3 confini_heygen.py <dir>          -> tagli.json

Al posto di `tagli.py allinea` + trascrizione di verifica (§10-bis): con
HeyGen i blocchi di una traccia si uniscono con una pausa esplicita,

    <break time="1.6s"/>

che HeyGen rispetta alla lettera (la restituisce come token a se', non la
pronuncia). Sulla 7.1 le pause naturali dentro un blocco sono arrivate al
massimo a 0,89 s e quelle di confine non sono mai scese sotto 1,29 s: la
soglia sta a meta', 1,1 s. Ogni silenzio oltre la soglia e' un confine, e ce
ne devono essere esattamente len(blocchi) - 1 per traccia. Il taglio va a
meta' del silenzio.

Se il conto non torna, lo script si ferma e dice dove: non indovina.

`dir` deve contenere chunks.json e una traccia `unico_<K>_raw.wav` per ogni
chiave. Poi si prosegue con `ATEMPO=1.16 tagli.py applica`.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tagli import durata, silenzi  # noqa: E402

SOGLIA = 1.1      # secondi: sotto e' una pausa di frase, sopra e' un confine


def confini(d):
    ch = json.load(open(f'{d}/chunks.json'))
    t, err = {}, []
    for k, bl in ch.items():
        p = f'{d}/unico_{k}_raw.wav'
        tot = durata(p)
        lunghi = [(a, b) for a, b in silenzi(p, SOGLIA)]
        attesi = len(bl) - 1
        if len(lunghi) != attesi:
            err.append(f'{k}: {len(lunghi)} pause oltre {SOGLIA} s, attese {attesi} '
                       f'({[round(a, 1) for a, _ in lunghi]})')
            continue
        t[k] = [0.0] + [round((a + b) / 2, 3) for a, b in lunghi] + [round(tot, 3)]
        corte = min(b - a for a, b in lunghi)
        print(f'{k}: {len(bl)} blocchi, {attesi} confini, {tot:.1f} s, '
              f'pausa di confine piu\' corta {corte:.2f} s')
    if err:
        print('CONFINI NON RICONOSCIUTI — tagli.json non scritto:')
        for e in err:
            print('  ', e)
        sys.exit(1)
    json.dump(t, open(f'{d}/tagli.json', 'w'), indent=0)
    print('tagli.json scritto')


if __name__ == '__main__':
    confini(sys.argv[1])
