#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dice quali confini cadono fuori posto, e di quanto.

prova.mp3 sono 1,6 s presi prima di ogni taglio, separati da 2,5 s di silenzio:
la trascrizione li rende come frasi separate, una per confine. Per ogni frase
si cerca, fra TUTTI i fini-frase del blocco che precede e di quello che segue,
quello la cui coda le somiglia di piu'. Se il vincitore non e' il confine
voluto, il taglio e' fuori posto e si sa esattamente dove e' finito.
"""
import json, re, sys, difflib, unicodedata
from pathlib import Path

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent

NUMERI = {"uno":"1","due":"2","tre":"3","quattro":"4","cinque":"5","sei":"6",
          "sette":"7","otto":"8","nove":"9","dieci":"10","punto":""}

def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.replace("'"," ").replace("’"," ")
    p = re.sub(r"[^a-z0-9 ]", " ", s).split()
    return [NUMERI.get(w, w) for w in p if NUMERI.get(w, w)]

def somiglia(a, b):   # sui caratteri: regge i frammenti corti e i numeri
    return difflib.SequenceMatcher(None, " ".join(a), " ".join(b)).ratio()

def fini_frase(testo):
    """Posizioni (in parole) dove finisce una frase, dentro un blocco."""
    t = re.sub(r"\[[a-z]+\]", "", testo)
    fin, n = [], 0
    for pezzo in re.split(r"(?<=[.!?])\s+", t):
        if not norm(pezzo): continue
        n += len(norm(pezzo)); fin.append(n)
    return norm(t), fin

def main():
    bl = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    testi  = {x["id"]: x["text"] for x in bl}
    ordine = [x["id"] for x in bl]
    fr = json.loads((QUI/"prova.json").read_text(encoding="utf-8"))
    grezza = (QUI/"trascrizioni"/"prova.txt").read_text(encoding="utf-8").strip()
    frasi = [f for f in re.split(r"(?<=[.!?])\s+", grezza) if norm(f)]
    if len(frasi) != len(fr):
        print(f"ATTENZIONE: {len(frasi)} frasi per {len(fr)} confini — il raffronto puo' slittare.\n")

    esiti, fuori = [], []
    for f, frase in zip(fr, frasi):
        i = ordine.index(f["id"])
        prec, segu = ordine[i-1], f["id"]
        sentito = norm(frase)
        L = max(2, len(sentito))

        # candidati: ogni fine-frase del blocco precedente e di quello seguente
        wp, fp = fini_frase(testi[prec])
        ws, fs = fini_frase(testi[segu])
        cand = []
        for k,pos in enumerate(fp):
            cand.append((f"{prec}.{k+1}", pos == fp[-1], somiglia(wp[max(0,pos-L):pos], sentito)))
        for k,pos in enumerate(fs):
            cand.append((f"{segu}.{k+1}", False, somiglia(ws[max(0,pos-L):pos], sentito)))
        cand.sort(key=lambda c: -c[2])
        dove, giusto, punteggio = cand[0]
        ok = giusto
        e = {"id":segu,"traccia":f["traccia"],"taglio":f["taglio"],"sentito":" ".join(sentito),
             "cade_a":dove,"somiglianza":round(punteggio,2),"ok":ok,
             "frasi_di_troppo": int(dove.split(".")[1]) if not ok and dove.startswith(segu) else 0}
        esiti.append(e)
        if not ok: fuori.append(e)
        print(f"{'  ok  ' if ok else 'FUORI '} {segu}  {punteggio:.2f}  cade a {dove:9s}"
              f"  «{e['sentito']}»")
    print(f"\nfuori posto: {len(fuori)}")
    for e in fuori:
        print(f"   {e['id']}: il taglio e' in ritardo di {e['frasi_di_troppo']} frase/i "
              f"(sta dentro {e['cade_a']})")
    (QUI/"esiti-verifica.json").write_text(json.dumps(esiti,indent=1,ensure_ascii=False),encoding="utf-8")
    return len(fuori)

if __name__ == "__main__":
    sys.exit(0 if main()==0 else 1)
