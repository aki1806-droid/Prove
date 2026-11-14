#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""I confini fra blocchi dai TEMPI DELLE PAROLE, invece che dai silenzi.

Il metodo vecchio (tagli.py allinea) cerca i silenzi nella traccia e assegna i
blocchi ai silenzi con un allineamento DTW; poi monta una prova.mp3 di
spezzoni da 1,6 s, la fa trascrivere e verifica un confine alla volta. Funziona
— sul video da un'ora ha retto su 203 blocchi — ma e' una ricostruzione: i
silenzi sono un indizio di dove finisce una frase, non la sua fine.

Qui l'indizio non serve, perche' c'e' il dato. La trascrizione di una traccia
generata torna con l'istante di INIZIO E FINE di ogni parola, e le parole sono
esattamente quelle del copione, nello stesso ordine. Allora il confine fra due
blocchi e' noto: sta fra l'ultima parola di uno e la prima del successivo. Non
si indovina, non si verifica a orecchio, non costa una seconda trascrizione.

Si taglia a META' della pausa fra le due parole, non sull'inizio della seconda:
l'attacco di una parola comincia prima di quanto l'orecchio dica (la consonante
iniziale parte piano) e tagliare esattamente li' la decapita. Meta' pausa
lascia respiro da tutte e due le parti.

Il controllo che conta e' che le parole trascritte siano le parole del copione:
se divergono, l'allineamento non e' di questo testo e non si usa. Si confronta
normalizzando (minuscole, senza accenti, senza punteggiatura), perche' la
trascrizione puo' rendere diversamente le virgolette e i trattini.
"""
import json, re, subprocess, sys, unicodedata
from pathlib import Path

QUI    = Path(__file__).resolve().parent
RADICE = QUI.parent
sys.path.insert(0, str(RADICE))
from strumenti import FFMPEG, parlato
from profilo import (P_BLOCCHI_JSON, P_TRACCE, P_GREZZO, P_TRASCRIZIONI,
                     P_CONFINI, P_MISURATE, RITMO, COMPARTO)

MARGINE_MINIMO = 0.04   # s: sotto questo la pausa e' da guardare, non da correggere
e_un_tag = lambda w: w.startswith("[") and w.endswith("]")

def pulisci(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", s)

def durata(f):
    e = subprocess.run([FFMPEG, "-i", str(f)], capture_output=True, text=True).stderr
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", e)
    if not m: raise SystemExit(f"nessuna Duration in {f}")
    return int(m[1])*3600 + int(m[2])*60 + float(m[3])

def lavorata(f):
    """Quanto dura la traccia DOPO il filtro di ritmo: serve a tagli.py."""
    o = subprocess.run([FFMPEG, "-i", str(f), "-af", RITMO, "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)
    if not t: raise SystemExit(f"nessun time= misurando il lavorato di {f}")
    h, m, s = t[-1]
    return int(h)*3600 + int(m)*60 + float(s)

scene  = {s["id"]: s for s in json.loads(P_BLOCCHI_JSON.read_text(encoding="utf-8"))}
tracce = json.loads(P_TRACCE.read_text(encoding="utf-8"))

stato, misure, errori, pause_strette = {}, [], [], []
for t in tracce:
    k, ids = t["traccia"], t["scene"]
    af = P_TRASCRIZIONI/f"traccia{k:02d}.json"
    if not af.exists():
        errori.append(f"traccia {k}: manca {af.name}"); continue
    parole = json.loads(af.read_text(encoding="utf-8"))["parole"]
    parole = [p for p in parole if p.get("type", "word") == "word" and pulisci(p["text"])]

    # le parole attese, blocco per blocco: e' da qui che si sa DOVE comincia ognuno
    attese, confine_a = [], []
    for idb in ids:
        confine_a.append(len(attese))
        attese += [w for w in scene[idb]["text"].split() if pulisci(w)]

    if len(attese) != len(parole):
        errori.append(f"traccia {k}: {len(parole)} parole trascritte contro {len(attese)} del copione")
        continue
    diverse = [i for i, (a, b) in enumerate(zip(attese, parole)) if pulisci(a) != pulisci(b["text"])]
    if diverse:
        i = diverse[0]
        errori.append(f"traccia {k}: {len(diverse)} parole diverse, la prima alla {i}: "
                      f"copione «{attese[i]}» trascritto «{parole[i]['text']}»")
        continue

    D = durata(P_GREZZO/f"traccia{k:02d}.mp3")
    conf = []
    for n in confine_a[1:]:                      # il primo blocco comincia a 0
        # Il blocco che comincia spesso ha un TAG come prima parola, e il tag
        # non si pronuncia: la trascrizione gli da' un istante largo pochi
        # millesimi, incollato alla fine della frase precedente. Prendendo
        # quello come inizio, la pausa misurava 11 ms e il taglio cadeva prima
        # della pausa vera, lasciandola tutta al blocco dopo. Si guarda la
        # prima parola DETTA.
        m = n
        while m < len(parole) and e_un_tag(attese[m]): m += 1
        fine_prima, inizio_dopo = parole[n-1]["end"], parole[m]["start"]
        pausa = inizio_dopo - fine_prima
        taglio = (fine_prima + inizio_dopo) / 2
        conf.append(round(taglio, 3))
        if pausa < MARGINE_MINIMO:
            pause_strette.append((k, ids[confine_a.index(n)], round(pausa, 3)))
    stato[str(k)] = {"durata": D, "confini": conf, "ids": ids}
    lav = lavorata(P_GREZZO/f"traccia{k:02d}.mp3")
    misure.append({"traccia": k, "grezzo": round(D, 3), "lavorata": round(lav, 3),
                   "caratteri": sum(len(parlato(scene[i]["text"])) for i in ids)})
    print(f"  traccia {k:2d}  {len(ids):3d} blocchi · {len(parole):4d} parole · "
          f"{len(conf):3d} confini · grezzo {D:6.2f}s · lavorata {lav:6.2f}s "
          f"(rapporto {D/lav:.3f})")

if errori:
    print("\nERRORI:\n  " + "\n  ".join(errori))
    raise SystemExit(1)

P_CONFINI.write_text(json.dumps(stato, indent=1), encoding="utf-8")
P_MISURATE.write_text(json.dumps(misure, indent=1), encoding="utf-8")
tot_conf = sum(len(s["confini"]) for s in stato.values())
rap = sum(m["grezzo"] for m in misure) / sum(m["lavorata"] for m in misure)
print(f"\n{tot_conf} confini da {len(misure)} tracce, senza nessun ascolto e senza prova.mp3")
print(f"rapporto grezzo/lavorato dell'intero: {rap:.4f}   "
      f"CPS lavorato: {sum(m['caratteri'] for m in misure)/sum(m['lavorata'] for m in misure):.2f} car/s")
if pause_strette:
    print(f"\nPAUSE STRETTE (< {MARGINE_MINIMO}s) in {len(pause_strette)} confini — "
          "il taglio ci sta, ma e' il punto dove guardare se qualcosa stona:")
    for k, idb, p in pause_strette[:20]: print(f"  traccia {k}  prima di {idb}: {p}s")
