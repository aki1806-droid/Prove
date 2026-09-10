#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Confronta la trascrizione di ogni traccia col copione, parola per parola.

Serve a trovare i buchi della voce: in 1.1 la sintesi aveva mangiato sei parole
di fila e il salto si vedeva solo cosi'. Non verifica dove cadono i tagli -
quello lo fanno l'allineamento DTW e verifica-locale.py - ma verifica che nel
grezzo ci sia tutto quello che c'era nel copione.

Le differenze di sola resa (accenti sciolti, acronimi, cifre scritte in lettere)
non sono errori: si normalizza prima di confrontare, e si segnalano solo le
sequenze di parole del copione che nella trascrizione mancano del tutto.
"""
import json, re, sys, unicodedata, difflib
from pathlib import Path

QUI    = Path(__file__).resolve().parent
RADICE = QUI.parent
STACCO = "s26"
BUCO   = 3   # da quante parole di fila in poi il salto e' sospetto

NUMERI = {"centottanta":"180","centoventi":"120","centocinquanta":"150",
          "sessanta":"60","cinquanta":"50","trenta":"30","sette":"7",
          "quattro":"4","cinque":"5","tre":"3","due":"2","uno":"1"}

# Termini che copione e trascrizione scrivono in modo diverso pur dicendo la
# stessa cosa: la sigla sillabata torna incollata, il numero di lezione torna
# in cifre. Si uniformano sul testo grezzo, prima di spezzarlo in parole.
RESE = [
 (r"\bl\s*m\s*/?\s*s\s*n\s*t\s*-?\s*1\b", " siglamagistrale "),
 (r"\b(elle\s+)?emme\s+esse\s+enne\s+ti\s+uno\b", " siglamagistrale "),
 (r"\blms\s*nt\s*1\b",                              " siglamagistrale "),
 (r"\bl\s*/?\s*s\s*n\s*t\s*-?\s*1\b",            " siglatriennale "),
 (r"\belle\s+esse\s+enne\s+ti\s+uno\b",            " siglatriennale "),
 (r"\bls\s*nt\s*1\b",                                " siglatriennale "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?(cinque|5)\b",      " lezioneunocinque "),
]

def parole(s):
    s = re.sub(r"\[[a-z]+\]", " ", s.lower())
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.replace("'", " ").replace("\u2019", " ")
    for pat, con in RESE: s = re.sub(pat, con, s)
    return [NUMERI.get(p, p) for p in re.findall(r"[a-z0-9]+", s)]

def gruppi():
    b = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    i = [x["id"] for x in b].index(STACCO)
    return {"A": b[:i+1], "B": b[i+1:]}

esiti, guai = {}, 0
for nome, gruppo in gruppi().items():
    atteso = []
    for x in gruppo:
        for p in parole(x["text"]): atteso.append((p, x["id"]))
    detto = parole((QUI/"trascrizioni"/f"{nome}.txt").read_text(encoding="utf-8"))
    sm = difflib.SequenceMatcher(None, [p for p,_ in atteso], detto, autojunk=False)
    mancanti, sostituzioni = [], []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "replace" and (i2-i1) < BUCO:
            sostituzioni.append({
                "blocco": atteso[i1][1],
                "copione": " ".join(p for p,_ in atteso[i1:i2]),
                "detto": " ".join(detto[j1:j2]) or "(nulla)"})
        if tag in ("delete","replace") and (i2-i1) >= BUCO:
            mancanti.append({
                "blocco": atteso[i1][1],
                "parole_copione": " ".join(p for p,_ in atteso[i1:i2]),
                "al_loro_posto": " ".join(detto[j1:j2]) or "(nulla)",
            })
    uguali = sum(k for _,_,k in sm.get_matching_blocks())
    esiti[nome] = {"parole_copione": len(atteso), "parole_dette": len(detto),
                   "coincidenti": uguali, "buchi": mancanti,
                   "sostituzioni_brevi": sostituzioni}
    guai += len(mancanti)
    print(f"traccia {nome}  {uguali}/{len(atteso)} parole coincidenti "
          f"({100*uguali/len(atteso):.1f}%)   buchi da {BUCO}+ parole: {len(mancanti)}")
    for m in mancanti:
        print(f"    {m['blocco']}  copione: «{m['parole_copione']}»")
        print(f"          detto: «{m['al_loro_posto']}»")
    if sostituzioni:
        print(f"    scarti brevi (rese diverse, non buchi): {len(sostituzioni)}")
        for s2 in sostituzioni:
            print(f"      {s2['blocco']}  «{s2['copione']}» -> «{s2['detto']}»")

(QUI/"esiti-testo.json").write_text(json.dumps(esiti, ensure_ascii=False, indent=1), encoding="utf-8")
print("\n" + ("nessun buco: la voce ha detto tutto" if not guai
              else f"ATTENZIONE: {guai} buchi da controllare a orecchio"))
sys.exit(1 if guai else 0)
