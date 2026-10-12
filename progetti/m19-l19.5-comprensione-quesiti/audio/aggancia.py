#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Porta i tagli FUORI di confini-parole.py nel silenzio vero della traccia.

  python3 audio/aggancia.py            dice che cosa farebbe
  python3 audio/aggancia.py --scrivi   lo scrive in correzioni.json

Per ogni taglio segnalato cerca i silenzi della traccia grezza (silencedetect,
la stessa soglia di tagli.py) nella finestra fra la fine dell'ultima parola
del blocco e l'inizio della prima del successivo, allargata di 0,25 s:
  - se il taglio sta gia' dentro uno di quei silenzi, resta dov'e'. Succede
    quando la trascrizione attacca le parole l'una all'altra (whisper lo fa
    spesso): il conteggio lo segnala, ma il taglio e' giusto;
  - altrimenti va al centro del silenzio piu' lungo della finestra;
  - senza silenzio nella finestra va al punto medio fra le parole, e lo dice.

Si lancia UNA volta, sullo stato di `tagli.py allinea`: scrive correzioni.json
da zero, perche' gli spostamenti sono misurati sui confini di allinea. Poi
`tagli.py correggi` e `tagli.py applica`.

Prende tre specie di errore, viste tutte: il taglio saltato alla pausa dopo
(la prima parola del blocco resta sotto la slide di prima), il taglio caduto
su una pausa dentro la frase o dentro l'ultima parola (la fine del blocco
passa nella scena dopo), e il taglio sulla virgola.
"""
import json, re, subprocess, sys
from pathlib import Path

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent
sys.path.insert(0, str(QUI)); sys.path.insert(0, str(RADICE))
import tagli
from profilo import STACCO

scrivi = "--scrivi" in sys.argv
out = subprocess.run([sys.executable, str(QUI/"confini-parole.py")],
                     capture_output=True, text=True).stdout
ids = [b["id"] for b in json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))]
k = ids.index(STACCO) + 1
traccia = {i: ("A", n) for n, i in enumerate(ids[:k])}
traccia.update({i: ("B", n) for n, i in enumerate(ids[k:])})
pause = {L: tagli.pause(QUI/f"grezzo-{L}.mp3", 0.12) for L in "AB"}

corr = {}
for m in re.finditer(r"FUORI\s+(s\d+)\s+fine\s+([\d.]+)\s*\|\s*taglio\s+([\d.]+)\s*\|\s*inizio\s+([\d.]+)", out):
    sid, F, T, I = m.group(1), *map(float, m.groups()[1:])
    L, n = traccia[sid]; j = n - 1          # confini[j] e' l'inizio del blocco j+1 della traccia
    lo, hi = min(F, I) - 0.25, max(F, I) + 0.25
    cand = [(a, b) for a, b in pause[L] if b > lo and a < hi]
    if any(a <= T <= b for a, b in cand):
        print(f"  {sid}  {L}[{j}]  resta   {T:7.2f}  (dentro un silenzio vero)")
        continue
    if cand:
        a, b = max(cand, key=lambda p: p[1] - p[0])
        nuovo, nota = (a + b) / 2, f"silenzio {b-a:.2f} s"
    else:
        nuovo, nota = (F + I) / 2, "NESSUN silenzio: punto medio, da ascoltare"
    corr.setdefault(L, {})[str(j)] = {"secondi": round(nuovo - T, 2)}
    print(f"  {sid}  {L}[{j}]  sposta  {T:7.2f} -> {nuovo:7.2f}  ({nuovo-T:+.2f} s, {nota})")

print(f"{sum(len(v) for v in corr.values())} spostamenti")
if scrivi:
    (QUI/"correzioni.json").write_text(json.dumps(corr, indent=1), encoding="utf-8")
    print("scritti in audio/correzioni.json")
