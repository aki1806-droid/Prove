#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Il testo di un blocco spezzato in righe di sottotitolo, con i tempi.

Lo usano in due: clip/lavora.py per imprimerli nella clip e monta-locale.py per
scrivere l'SRT. Una funzione sola perche' le due cose devono dire esattamente la
stessa cosa negli stessi istanti - se divergono, il file SRT smentisce il video.

I tempi si dividono in proporzione ai caratteri, non alle parole: e' la stessa
regola con cui e' calcolata la durata del blocco, e sbaglia dello stesso poco.

  python3 clip/sottotitoli.py      mostra come si spezzano i blocchi
"""
import json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo

RADICE = Path(__file__).resolve().parent.parent

MIN_A_VIDEO = 1.0      # sotto, la riga lampeggia e non si legge

def larghezza(c):
    """Caratteri per riga. In verticale la riga e' meta', e non e' un dettaglio:
    una riga da 42 caratteri su un 9:16 esce a corpo otto o va fuori quadro."""
    return 24 if c["altezza"] > c["larghezza"] else 42

def pulito(t):
    return re.sub(r"\s+", " ", re.sub(r"\[[a-z]+\]", "", t)).strip()

def a_righe(testo, largo):
    """Spezza in blocchetti da due righe, rompendo prima alla punteggiatura."""
    parole = pulito(testo).split()
    fuori, riga, righe = [], [], []
    for w in parole:
        prova = " ".join(riga + [w])
        if riga and len(prova) > largo:
            righe.append(" ".join(riga)); riga = [w]
        else:
            riga.append(w)
        # una riga che finisce con punto forte e' un buon punto di rottura
        if riga and re.search(r"[.:;!?]$", riga[-1]) and len(righe) % 2 == 1:
            righe.append(" ".join(riga)); riga = []
        if len(righe) == 2:
            fuori.append("\n".join(righe)); righe = []
    if riga: righe.append(" ".join(riga))
    if righe: fuori.append("\n".join(righe))
    return fuori or [""]

def spezza(testo, durata, largo):
    """(inizio, fine, testo) dentro il blocco, relativi al suo inizio.

    Le durate si dividono in proporzione ai caratteri, poi le righe troppo
    brevi prendono tempo in prestito dalla vicina piu' lunga. Il tempo si
    sposta, il testo no: fondere due righe per farle durare di piu' vuol dire
    perderne un pezzo, ed e' successo."""
    parti = a_righe(testo, largo)
    pesi = [max(1, len(p.replace("\n", " "))) for p in parti]
    tot = sum(pesi)
    d = [durata * w / tot for w in pesi]
    if durata >= MIN_A_VIDEO * len(d):
        for _ in range(len(d) * 2):
            corte = [i for i, x in enumerate(d) if x < MIN_A_VIDEO]
            if not corte: break
            i = corte[0]
            vicini = [j for j in (i-1, i+1) if 0 <= j < len(d)]
            j = max(vicini, key=lambda k: d[k])
            presta = min(MIN_A_VIDEO - d[i], d[j] - MIN_A_VIDEO)
            if presta <= 0: break
            d[i] += presta; d[j] -= presta
    fuori, t = [], 0.0
    for p, x in zip(parti, d):
        fuori.append((t, t + x, p)); t += x
    return fuori

def tutte():
    """Tutte le righe di tutti i blocchi, con i tempi assoluti nel montato."""
    p = profilo(); c = CONTI(p); largo = larghezza(c)
    bl = {x["id"]: x["text"] for x in
          json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))}
    reg = json.loads((RADICE/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
    fuori, t = [], c["copertina"]
    for r in reg:
        for ini, fin, testo in spezza(bl[r["id"]], r["durata"], largo):
            fuori.append({"id": r["id"], "da": t + ini, "a": t + fin, "testo": testo})
        t += r["durata"]
    return fuori

if __name__ == "__main__":
    p = profilo(); c = CONTI(p); largo = larghezza(c)
    bl = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    print(f'{largo} caratteri per riga ({c["formato"]}), base a '
          f'{c["base_sottotitoli"]} px dal fondo\n')
    for b in bl:
        d = len(pulito(b["text"]))/17.0
        print(f'{b["id"]}  {d:.1f}s')
        for ini, fin, t in spezza(b["text"], d, largo):
            print(f'   {ini:5.1f} → {fin:5.1f}   ' + t.replace("\n", " / "))
