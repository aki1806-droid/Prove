#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dice quali confini cadono fuori posto, confrontando la trascrizione di
prova.mp3 con la coda attesa di ogni blocco. Scrive correzioni.json."""
import json, re, sys, difflib, unicodedata
from pathlib import Path

QUI = Path(__file__).resolve().parent
RADICE = QUI.parent
CODA = 7          # quante parole della coda attesa confrontare
FINESTRA = 26     # quante parole della trascrizione guardare avanti
SOGLIA = 0.55

def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.replace("'", " ").replace("’", " ")
    return re.sub(r"[^a-z0-9 ]", " ", s).split()

def carica():
    bl = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    fr = json.loads((QUI/"prova.json").read_text(encoding="utf-8"))
    tr = norm((QUI/"trascrizioni"/"prova.txt").read_text(encoding="utf-8"))
    return {x["id"]: re.sub(r"\[[a-z]+\]","",x["text"]) for x in bl}, [x["id"] for x in bl], fr, tr

def main():
    testi, ordine, frammenti, obs = carica()
    # parole di ogni traccia, con la posizione in caratteri
    parole = {"A": [], "B": []}
    stacco = ordine.index("s26")
    for k,idb in enumerate(ordine):
        L = "A" if k <= stacco else "B"
        for w in norm(testi[idb]): parole[L].append((w, idb))

    ptr, esiti = 0, []
    for f in frammenti:
        i = ordine.index(f["id"])
        atteso = norm(testi[ordine[i-1]])[-CODA:]
        fin = min(len(obs), ptr+FINESTRA)
        best, bpos, blen = 0.0, ptr, len(atteso)
        for a in range(ptr, max(ptr+1, fin-2)):
            for L in range(max(2,len(atteso)-3), len(atteso)+3):
                if a+L > fin: break
                r = difflib.SequenceMatcher(None, atteso, obs[a:a+L]).ratio()
                if r > best: best, bpos, blen = r, a, L
        ok = best >= SOGLIA
        e = {"id": f["id"], "traccia": f["traccia"], "taglio": f["taglio"],
             "atteso": " ".join(atteso), "somiglianza": round(best,2), "ok": ok}
        if ok:
            ptr = bpos + blen
        else:
            # che cosa si sente davvero, e dove sta nel copione
            sentito = obs[ptr:ptr+CODA]
            e["sentito"] = " ".join(sentito)
            P = parole[f["traccia"]]
            mig, mj = 0.0, None
            for j in range(len(P)-len(sentito)+1):
                r = difflib.SequenceMatcher(None, sentito,
                        [w for w,_ in P[j:j+len(sentito)]]).ratio()
                if r > mig: mig, mj = r, j
            if mj is not None and mig > 0.5:
                e["cade_in"] = P[mj+len(sentito)-1][1]
                e["scarto_blocchi"] = ordine.index(e["cade_in"]) - (i-1)
            ptr += CODA
        esiti.append(e)

    fuori = [e for e in esiti if not e["ok"]]
    for e in esiti:
        segno = "  ok  " if e["ok"] else "FUORI "
        print(f"{segno} {e['id']}  {e['somiglianza']:.2f}  atteso «{e['atteso']}»")
        if not e["ok"]:
            print(f"          sentito «{e.get('sentito','?')}»  "
                  f"cade in {e.get('cade_in','?')} ({e.get('scarto_blocchi','?'):+} blocchi)"
                  if 'scarto_blocchi' in e else f"          sentito «{e.get('sentito','?')}»")
    print(f"\nfuori posto: {len(fuori)}")
    (QUI/"esiti-verifica.json").write_text(json.dumps(esiti,indent=1,ensure_ascii=False),encoding="utf-8")
    return len(fuori)

if __name__ == "__main__":
    sys.exit(0 if main()==0 else 1)
