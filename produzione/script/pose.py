#!/usr/bin/env python3
"""Decide quanto resta in scena ogni slide.

    python3 pose.py <dir> <secondi di parlato voluti>

Il parlato tagliato e filtrato dura quello che dura: le pose sono il silenzio
che si aggiunge in coda a ogni blocco perche' la slide stia in scena il tempo
di essere letta. Non e' una ripartizione uniforme — darebbero tutte lo stesso
respiro a una frase di tre parole e a un diagramma con quattro etichette, e
il risultato ha un ritmo piatto. Due regole:

  - un minimo per tipo di schermata, perche' un memo che sta in scena 1,6 s
    non si legge (succedeva a `s18` della 1.1: «La causa non si vede mai.»
    durava 1,65 s);
  - un supplemento per tipo, perche' un disegno si guarda piu' a lungo di
    una frase.

Il resto del margine disponibile si distribuisce in parti uguali, cercando
`x` perche' il totale cada sul bersaglio.

Legge `durate_nat.json` (le durate naturali, cioe' quelle del primo
`tagli.py applica`, fatto senza pose) e `slides.json`; scrive `pose.json`,
che e' il `tieni` da passare a `tagli.py applica`.
"""
import json
import sys

DISEGNI = {'curva', 'finestra', 'quadranti', 'flusso', 'strati', 'pila',
           'termometro', 'bivio', 'anello', 'bilancia', 'imbuto', 'ponte',
           'linea', 'barre', 'raggi'}
INFO = {'anatomia', 'cruscotto', 'cartellino', 'confronto'}
ELENCHI = {'list', 'cards', 'table', 'swap', 'chart', 'number'}
BREVI = {'memo', 'quote'}

#            minimo in scena, supplemento
REGOLA = [(lambda l: l in DISEGNI or l in INFO, 6.5, 1.30),
          (lambda l: l in ELENCHI,              5.0, 0.90),
          (lambda l: l in BREVI,                4.0, 0.60),
          (lambda l: True,                      3.0, 0.00)]


def regola(layout):
    for prova, minimo, supp in REGOLA:
        if prova(layout):
            return minimo, supp
    raise AssertionError


def risolvi(d, bersaglio):
    nat = json.load(open(f'{d}/durate_nat.json'))
    slide = {c['file']: c['layout'] for c in json.load(open(f'{d}/slides.json'))}

    # i blocchi su ripresa non hanno slide: il videoclip non si legge, quindi
    # non prende posa e non entra nel conto del margine
    voci = []
    for b, dur in sorted(nat.items()):
        lay = slide.get('c' + b[1:])
        voci.append((b, dur, lay))

    def totale(x):
        t = 0.0
        for b, dur, lay in voci:
            if lay is None:
                t += dur
                continue
            minimo, supp = regola(lay)
            t += max(dur, minimo) + supp + x
        return t

    if totale(0.0) >= bersaglio:
        x = 0.0
    else:
        lo, hi = 0.0, 1.0
        while totale(hi) < bersaglio:
            hi *= 2
            assert hi < 60
        for _ in range(60):
            mid = (lo + hi) / 2
            lo, hi = (lo, mid) if totale(mid) >= bersaglio else (mid, hi)
        x = (lo + hi) / 2

    pose = {}
    for b, dur, lay in voci:
        if lay is None:
            continue
        minimo, supp = regola(lay)
        fine = max(dur, minimo) + supp + x
        if fine - dur > 0.05:
            pose[b] = round(fine, 2)
    return pose, x, totale(x), voci


if __name__ == '__main__':
    d, bersaglio = sys.argv[1], float(sys.argv[2])
    pose, x, tot, voci = risolvi(d, bersaglio)
    json.dump(pose, open(f'{d}/pose.json', 'w'), indent=0, sort_keys=True)
    print(f'base {x:.2f}s su {len(pose)} slide | parlato {tot:.1f}s '
          f'= {int(tot)//60}:{int(tot)%60:02d} (bersaglio {bersaglio:.0f}s)')
    gruppi = {}
    for b, dur, lay in voci:
        if lay is None:
            continue
        gruppi.setdefault(regola(lay)[1], []).append(pose.get(b, dur) - dur)
    for supp in sorted(gruppi, reverse=True):
        g = gruppi[supp]
        print(f'  supplemento {supp:.2f}  {len(g):2d} slide  '
              f'posa media {sum(g)/len(g):.2f}s')
