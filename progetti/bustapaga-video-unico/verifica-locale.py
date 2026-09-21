#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Controllo dei confini SENZA rete, sulle durate dei blocchi ritagliati.

Non sostituisce la verifica per trascrizione: non sa cosa dice la voce. Sa pero'
riconoscere la firma di un confine spostato. Se un taglio scivola in avanti di
una frase, il blocco prima diventa piu' lungo di quanto il suo testo prometta e
quello dopo piu' corto: due scarti grandi, ADIACENTI e DI SEGNO OPPOSTO. Quelli
sono i confini da guardare per primi.

Uno scarto grande e isolato non e' quella firma, e quasi sempre non e' un
errore: e' un blocco con parole che costano piu' sillabe dei caratteri che
occupano. Qui gli importi sono scritti a parole - «duemilacinquecentosettanta»
- e quelle parole sono lunghe in caratteri quanto in sillabe, quindi il modello
regge meglio che sul corso OSS, dove le cifre lo facevano sbandare.

Legge blocchi-audio.json, quindi va lanciato DOPO applica.
"""
import json, re, statistics
from pathlib import Path

QUI = Path(__file__).resolve().parent
reg   = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
testi = {x["id"]: x["text"] for x in
         json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))}

def peso(t):
    t = re.sub(r"\[[a-z]+\]", "", t)
    return len(t) + len(re.findall(r"\d", t)) * 4.0   # nessuna cifra qui, ma la regola resta

sospetti, coppie = [], []
for k in sorted({r["traccia"] for r in reg}):
    g = [r for r in reg if r["traccia"] == k]
    if len(g) < 3: continue
    P = [peso(testi[r["id"]]) for r in g]
    D = [r["durata"] - r["posa"] for r in g]
    tasso = sum(P)/sum(D)
    res = [(d - p/tasso) for p, d in zip(P, D)]
    sd = statistics.pstdev(res)
    sosp = []
    for i, (r, e) in enumerate(zip(g, res)):
        if abs(e) >= 1.5*sd:
            sosp.append((i, r["id"], e)); sospetti.append((k, r["id"], round(e, 2), round(sd, 2)))
    for a, b in zip(sosp, sosp[1:]):
        if b[0]-a[0] == 1 and a[2]*b[2] < 0:
            coppie.append((k, a[1], b[1], round(a[2], 2), round(b[2], 2)))
    print(f"traccia {k:2d}  {tasso:5.1f} peso/s  scarto tipico {sd:4.2f}s  segnalati {len(sosp):2d}/{len(g)}")

print(f"\nscarti isolati oltre 1,5 volte la dispersione: {len(sospetti)} su {len(reg)} blocchi")
for k, i, e, sd in sospetti:
    print(f"   traccia {k:2d}  {i}  scarto {e:+.2f}s  (dispersione {sd:.2f}s)")

print(f"\nLA FIRMA CHE CONTA - coppie adiacenti di segno opposto: {len(coppie)}")
if not coppie:
    print("   nessuna: nessun confine ha l'aspetto di essere scivolato di una frase")
for k, a, b, ea, eb in coppie:
    print(f"   traccia {k}: fra {a} e {b}  {ea:+.2f}s / {eb:+.2f}s"
          f"  — il taglio sembra spostato di ~{abs(ea):.1f}s")
