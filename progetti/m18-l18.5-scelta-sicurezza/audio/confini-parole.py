#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dice se ogni taglio cade nel silenzio giusto, con i tempi della trascrizione.

Scribe restituisce, oltre al testo, l'inizio e la fine di ogni parola
(trascrizioni/A-parole.json, B-parole.json). Allineato il copione sulla
trascrizione, ogni confine fra due blocchi ha un'ultima parola detta e una
prima parola detta: il taglio scelto da `tagli.py allinea` deve stare in mezzo.
Se sta prima, l'ultima parola del blocco finisce nella scena dopo; se sta
dopo, la prima del blocco seguente resta in quella prima.

E' piu' forte di prova.mp3 (che indovina il confine dalla somiglianza di un
frammento) e del controllo statistico di verifica-locale.py (che vede solo la
firma di un confine spostato): qui si misura direttamente, in secondi, su
tutti i confini, senza riascoltare.

La normalizzazione e' quella di verifica-testo.py, presa dal suo sorgente: una
sola copia delle rese dichiarate.
"""
import json, sys, difflib
from pathlib import Path

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent

# Le funzioni di verifica-testo.py, senza eseguirne il confronto.
src = (QUI/"verifica-testo.py").read_text(encoding="utf-8")
ns = {"__file__": str(QUI/"verifica-testo.py")}
exec(src.split("\nesiti, guai")[0], ns)
parole, gruppi = ns["parole"], ns["gruppi"]

MARGINE = 0.03   # secondi: sotto questo, il taglio sfiora la parola

guai = 0
for nome, gruppo in gruppi().items():
    tagli = json.loads((QUI/f"confini-{nome}.json").read_text(encoding="utf-8"))["confini"]
    atteso = [(p, k) for k, x in enumerate(gruppo) for p in parole(x["text"])]
    detto = []   # (parola normalizzata, inizio, fine)
    for w in json.loads((QUI/"trascrizioni"/f"{nome}-parole.json").read_text(encoding="utf-8"))["words"]:
        if w.get("type") != "word": continue
        for p in parole(w["text"]): detto.append((p, w["start"], w["end"]))
    sm = difflib.SequenceMatcher(None, [p for p, _ in atteso], [p for p, _, _ in detto], autojunk=False)
    tempo = {}   # indice nel copione -> (inizio, fine) della parola detta
    for a, b, n in sm.get_matching_blocks():
        for i in range(n): tempo[a+i] = detto[b+i][1:]
    print(f"traccia {nome}  {len(gruppo)} blocchi · {len(tagli)} tagli · "
          f"{len(tempo)}/{len(atteso)} parole del copione con un tempo")
    for k, t in enumerate(tagli):
        ult = max((i for i, (_, b) in enumerate(atteso) if b == k and i in tempo), default=None)
        pri = min((i for i, (_, b) in enumerate(atteso) if b == k+1 and i in tempo), default=None)
        if ult is None or pri is None:
            print(f"   ?    {gruppo[k+1]['id']}  confine senza parole riconosciute"); guai += 1; continue
        fine, inizio = tempo[ult][1], tempo[pri][0]
        ok = fine + MARGINE <= t <= inizio - MARGINE
        guai += not ok
        print(f"  {' ok ' if ok else 'FUORI'}  {gruppo[k+1]['id']}  "
              f"fine {fine:7.2f} | taglio {t:7.2f} | inizio {inizio:7.2f}   "
              f"silenzio {inizio-fine:4.2f}s")
print("\n" + ("tutti i tagli cadono fra due parole" if not guai
              else f"ATTENZIONE: {guai} tagli da guardare"))
sys.exit(1 if guai else 0)
