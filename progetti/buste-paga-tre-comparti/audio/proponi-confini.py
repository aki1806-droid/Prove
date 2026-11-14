#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dalle diagnosi di verifica-confini.py alle correzioni da applicare.

Un taglio «in ritardo» e' un taglio che cade quando il blocco successivo ha
gia' cominciato a parlare: nello spezzone da 1,6 s prima del taglio si sentono
le prime parole del blocco che doveva COMINCIARE li'. Di quanto e' in ritardo
lo dice il testo stesso: se prima del taglio sono gia' stati pronunciati K
caratteri del blocco successivo, il taglio e' avanti di K/cps secondi.

Il cps e' quello GREZZO della sua traccia, letto da tracce-misurate.json, non
una media: e' sull'audio grezzo che si taglia, e le diciassette tracce vanno da
14,9 a 17,3 car/s. Con una media sbagliata la correzione sbaglia in proporzione.

Si propone SOLO dove lo spezzone sentito si ritrova per intero nel testo del
blocco successivo. Dove il trascrittore ha reso i numeri in cifre («22,99»
contro «ventidue euro e novantanove») o ha storpiato le parole, il punto non e'
misurabile da qui e resta dichiarato, non indovinato.
"""
import json, re, sys, unicodedata
from pathlib import Path

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent

def parole(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"\[[a-z]+\]", " ", s)
    return re.findall(r"[a-z0-9]+", s)
piatto = lambda s: " ".join(parole(s))

esiti   = json.loads((QUI/"esiti-confini.json").read_text(encoding="utf-8"))
stato   = json.loads((QUI/"confini.json").read_text(encoding="utf-8"))
mis     = {m["traccia"]: m for m in json.loads((QUI/"tracce-misurate.json").read_text(encoding="utf-8"))}
tracce  = json.loads((RADICE/"copione"/"tracce.json").read_text(encoding="utf-8"))
testo   = {b["id"]: b["text"] for b in
           json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8")) if b["text"]}
ordine  = {t["traccia"]: t["scene"] for t in tracce}
dopo = {}
for t in tracce:
    for a, b in zip(t["scene"], t["scene"][1:]): dopo[a] = (b, t["traccia"])

proposte, saltati = {}, []
for e in esiti:
    if e["esito"] != "NON TROVATA": continue
    b = e["blocco"]
    if b not in dopo: saltati.append((b, "ultimo della traccia")); continue
    succ, k = dopo[b]
    sent, testo_succ = piatto(e["sentito"]), piatto(testo[succ])
    if not sent or sent not in testo_succ:
        saltati.append((b, f"«{e['sentito']}» non si ritrova in {succ}")); continue
    K = testo_succ.index(sent) + len(sent)       # caratteri di succ gia' detti
    cps = mis[k]["caratteri"] / mis[k]["grezzo"]
    st = stato[str(k)]
    j = st["ids"].index(succ)                    # il confine che fa cominciare succ
    if j == 0: saltati.append((b, "confine iniziale")); continue
    vecchio = st["confini"][j-1]
    nuovo = round(vecchio - K/cps, 3)
    proposte.setdefault(str(k), {})[str(j)] = nuovo
    print(f"  {b} -> {succ}  traccia {k} confine {j}: {vecchio:.2f} -> {nuovo:.2f}s "
          f"({nuovo-vecchio:+.2f}s)   {K} car di {succ} gia' detti a {cps:.2f} car/s")

(QUI/"proposte-confini.json").write_text(json.dumps(proposte, indent=1), encoding="utf-8")
print(f"\ncorrezioni proposte: {sum(len(v) for v in proposte.values())} su {len(stato)} tracce")
if saltati:
    print(f"\nnon proposti, e perche' ({len(saltati)}):")
    for b, perche in saltati: print(f"   {b}: {perche}")
