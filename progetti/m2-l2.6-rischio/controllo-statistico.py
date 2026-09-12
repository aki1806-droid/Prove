#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Controllo dei confini SENZA rete, quando la trascrizione non e' disponibile.

Non sostituisce prova.mp3 + controllo-per-trascrizione.py: non sa cosa dice la voce. Sa pero'
riconoscere la firma di un confine spostato. Se un taglio scivola in avanti di
una frase, il blocco prima diventa piu' lungo di quanto il suo testo prometta e
quello dopo piu' corto: due scarti grandi, adiacenti e di segno opposto.
Quelli sono i confini da guardare per primi.
"""
import json, re, statistics
from pathlib import Path

QUI = Path(__file__).resolve().parent
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
testi = {x["id"]: x["text"] for x in
         json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))}

# Le cifre costano molte piu' sillabe dei caratteri, e vanno contate a parte.
# Il peso e' stato adattato sui 48 blocchi misurati di 1.3, dove il 5,0 stimato
# a occhio in 1.2 faceva uscire corti tutti i blocchi pieni di numeri: da solo
# non spiega tutto lo scarto, ma toglie un falso allarme sistematico.
def peso(t):
    t = re.sub(r"\[[a-z]+\]", "", t)
    cifre = len(re.findall(r"\d", t))
    return len(t) + cifre * 4.0        # una cifra vale ~5 caratteri di tempo

for L in ("A","B"):
    g = [r for r in reg if r["traccia"] == L]
    P = [peso(testi[r["id"]]) for r in g]
    D = [r["durata"] - r["posa"] for r in g]
    tasso = sum(P)/sum(D)
    res = [(d - p/tasso) for p,d in zip(P,D)]
    sd = statistics.pstdev(res)
    print(f"\ntraccia {L}   {tasso:.1f} peso/s   scarto tipico {sd:.2f} s")
    sosp = []
    for i,(r,e) in enumerate(zip(g,res)):
        seg = "  " if abs(e) < 1.5*sd else ("++" if e>0 else "--")
        if seg != "  ": sosp.append((i,r["id"],e))
        print(f"  {seg} {r['id']}  {r['durata']:5.2f}s   atteso {P[i]/tasso:5.2f}s   scarto {e:+5.2f}s")
    # la firma di un confine spostato: due scarti grandi, adiacenti, opposti
    print("  confini da guardare per primi:")
    trovati = False
    for a,b in zip(sosp, sosp[1:]):
        if b[0]-a[0] == 1 and a[2]*b[2] < 0:
            print(f"    fra {a[1]} e {b[1]}: {a[2]:+.2f}s / {b[2]:+.2f}s "
                  f"— il taglio sembra spostato di ~{abs(a[2]):.1f}s")
            trovati = True
    if not trovati: print("    nessuna coppia adiacente di segno opposto")
