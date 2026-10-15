#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Il testo della voce di un mese, per create_speech di HeyGen, in UNA traccia.

  python3 testo_voce.py <cartella del mese>   ->  voce-testo.txt

Le regole sono quelle di febbraio e della regia dei pacchetti:
  - fra una scena e l'altra una pausa <break 2.0s>, che voce.py usa per tagliare;
  - in S3 una pausa di mezzo secondo dopo ogni «Falso.» (voce.py la porta a 0,6 s);
  - in S7, la firma, mezzo secondo fra una frase e l'altra.

Prima si applicano le correzioni di mese.json (le stesse che monta.py applica ai
sottotitoli): sigle scritte minuscole nel pacchetto, che la voce leggerebbe come
parole, e simili.
"""
import json, re, sys
from pathlib import Path

mese = Path(sys.argv[1]).resolve()
tl = json.loads((mese/"pacchetto"/"timeline.json").read_text(encoding="utf-8"))
corr = json.loads((mese/"mese.json").read_text(encoding="utf-8")).get("correzioni", {}) \
    if (mese/"mese.json").exists() else {}

def corretto(s):
    t = s["voce"].strip()
    for a, b in corr.get(s["id"], []):
        if a not in t: raise SystemExit(f"{s['id']}: non trovo «{a}»")
        t = t.replace(a, b)
    return t

MEZZO = ' <break time="0.5s"/>'
pezzi = []
for s in tl["scene"]:
    t = corretto(s)
    if s["id"] == "S3":
        n = t.count("Falso.")
        if n != 2: raise SystemExit(f"S3: {n} «Falso.» invece di 2")
        t = t.replace("Falso.", "Falso." + MEZZO)
    if s["id"] == "S7":
        t = (MEZZO + " ").join(re.split(r"(?<=[.?!])\s+", t))
    pezzi.append(t)
testo = ' <break time="2.0s"/> '.join(pezzi)
(mese/"voce-testo.txt").write_text(testo, encoding="utf-8")
print(f"{mese.name}: {len(testo)} caratteri")
