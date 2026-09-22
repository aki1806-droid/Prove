#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Prepara logo-rifilato.png dal file del marchio che arriva dal committente.

    python3 slide/marchio/rifila.py <sorgente.png>

Tre cose, e nessuna e' un vezzo:

1. RIFILA. layout.mjs scala il logo a un'altezza fissa di 70px. Un margine
   dentro il file ruba quell'altezza al marchio, che esce piu' piccolo del
   dovuto su OGNI slide. Il file arrivato e' 225x109 con margine bianco.

2. RENDE TRASPARENTE SOLO IL FONDO. Il file arriva su bianco pieno, senza
   canale alfa. Sul tema `chiaro` (bianco) non si vedrebbe, e sul tema
   `profondo` il marchio sta gia' su piastra bianca — ma sulle QUATTORDICI
   slide `tenue` il fondo e' #FCF4F3, e un rettangolo bianco si vedrebbe.
   La trasparenza si propaga DAI BORDI verso l'interno: il bianco dentro il
   fumetto — le lettere CISL — e' bianco del marchio e resta.
   Cancellare «tutto il bianco» bucherebbe le lettere.

3. CONTROLLA LA PALETTE. I due colori di layout.mjs sono campionati da questo
   file. Se un file nuovo portasse colori diversi, il metodo lo deve dire
   invece di lasciarli divergere in silenzio.
"""
import sys
from collections import deque
from pathlib import Path
from PIL import Image

QUI = Path(__file__).resolve().parent
VERDE, ROSSO = (0, 98, 58), (215, 3, 40)      # quelli dichiarati in layout.mjs
CHIARO = 238                                   # sopra questo e' «fondo», non marchio

def quasi_bianco(p):
    return p[0] >= CHIARO and p[1] >= CHIARO and p[2] >= CHIARO

sorgente = Path(sys.argv[1]) if len(sys.argv) > 1 else None
if not sorgente or not sorgente.exists():
    raise SystemExit(f"uso: {sys.argv[0]} <sorgente.png>")

im = Image.open(sorgente).convert("RGBA")
w, h = im.size
px = im.load()

# --- 1 · rifila sul contenuto che NON e' fondo
xs = [x for x in range(w) for y in range(h) if not quasi_bianco(px[x, y])]
ys = [y for y in range(h) for x in range(w) if not quasi_bianco(px[x, y])]
box = (min(xs), min(ys), max(xs) + 1, max(ys) + 1)
print(f"arrivato {w}x{h} -> rifilato {box[2]-box[0]}x{box[3]-box[1]}  "
      f"(margine: sx {box[0]}, alto {box[1]}, dx {w-box[2]}, basso {h-box[3]})")
im = im.crop(box)
w, h = im.size
px = im.load()

# --- 2 · trasparenza propagata dai bordi: il bianco interno resta
coda = deque()
visti = [[False]*h for _ in range(w)]
for x in range(w):
    for y in (0, h-1):
        if quasi_bianco(px[x, y]) and not visti[x][y]:
            visti[x][y] = True; coda.append((x, y))
for y in range(h):
    for x in (0, w-1):
        if quasi_bianco(px[x, y]) and not visti[x][y]:
            visti[x][y] = True; coda.append((x, y))
fuori = 0
while coda:
    x, y = coda.popleft()
    px[x, y] = (255, 255, 255, 0); fuori += 1
    for dx, dy in ((1,0), (-1,0), (0,1), (0,-1)):
        a, b = x+dx, y+dy
        if 0 <= a < w and 0 <= b < h and not visti[a][b] and quasi_bianco(px[a, b]):
            visti[a][b] = True; coda.append((a, b))
dentro = sum(1 for x in range(w) for y in range(h)
             if px[x, y][3] == 255 and quasi_bianco(px[x, y]))
print(f"fondo reso trasparente: {fuori} px · bianco del marchio conservato: {dentro} px")

fuori_file = QUI/"logo-rifilato.png"
im.save(fuori_file, optimize=True)
print(f"scritto {fuori_file.name}  {w}x{h}  {fuori_file.stat().st_size} byte")

# --- 3 · la palette dichiarata deve ritrovarsi nel file
opachi = [px[x, y][:3] for x in range(w) for y in range(h) if px[x, y][3] == 255]
for nome, atteso in (("verde", VERDE), ("rosso", ROSSO)):
    n = sum(1 for p in opachi if p == atteso)
    print(f"{nome} {'#%02X%02X%02X' % atteso} dichiarato in layout.mjs: "
          + (f"{n} px nel file ✓" if n else "NON TROVATO — la palette va ricampionata"))
