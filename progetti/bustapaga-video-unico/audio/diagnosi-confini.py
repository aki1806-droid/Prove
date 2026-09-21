#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Decide un confine sospetto SENZA riascoltare, facendo il conto sul grezzo.

Il MASTER lo dice esplicitamente: davanti a un confine sospetto non si ragiona
sul modello statistico, si guarda l'audio. Si prendono le pause vere intorno al
confine, si misura lo spezzone di parlato fra due pause candidate e lo si divide
per i caratteri della frase che dovrebbe contenerlo. Se quella frase sarebbe
detta a 20,5 car/s grezzi da una voce che ne fa 15-16, il confine e' sbagliato,
senza ambiguita' e senza aprire il file audio.

Per ogni coppia sospetta prova tutte le pause vicine e dice quale rimette
entrambi i blocchi dentro il passo della traccia.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg

QUI    = Path(__file__).resolve().parent
RADICE = QUI.parent
FF     = imageio_ffmpeg.get_ffmpeg_exe()

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    return r.stdout + r.stderr

def pause(f):
    o = sh(FF, "-i", str(f), "-af", "silencedetect=noise=-45dB:d=0.10", "-f", "null", "-")
    ini = [float(x) for x in re.findall(r"silence_start:\s*(-?[\d.]+)", o)]
    fin = [float(x) for x in re.findall(r"silence_end:\s*([\d.]+)", o)]
    return [(a, b) for a, b in zip(ini, fin) if b > a]

SOSPETTI = [(6,"s064","s065"), (7,"s075","s076"), (13,"s164","s165"),
            (14,"s176","s177"), (16,"s194","s195")]

stato = json.loads((QUI/"confini.json").read_text(encoding="utf-8"))
scene = {s["id"]: s for s in json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))}
mis   = {m["traccia"]: m for m in json.loads((QUI/"tracce-misurate.json").read_text(encoding="utf-8"))}

proposte = {}
for k, ida, idb in SOSPETTI:
    st = stato[str(k)]
    ids = st["ids"]; i = ids.index(ida)
    bordi = [0.0] + st["confini"] + [st["durata"]]
    ini, conf, fin = bordi[i], bordi[i+1], bordi[i+2]
    cara, carb = len(scene[ida]["text"]), len(scene[idb]["text"])
    # passo grezzo tipico della traccia: caratteri della traccia / durata grezza
    tot_car = sum(len(scene[x]["text"]) for x in ids)
    passo = tot_car / mis[k]["grezzo"]
    P = pause(QUI/"grezzo"/f"traccia{k:02d}.mp3")
    vicine = [(a, b) for a, b in P if ini + 1.0 < (a+b)/2 < fin - 1.0]
    print(f"\n=== traccia {k}: confine fra {ida} e {idb} ===")
    print(f"    la traccia va a {passo:.1f} car/s grezzi; {ida} ha {cara} car, {idb} ne ha {carb}")
    print(f"    confine attuale {conf:.2f}s  ->  {ida} {cara/(conf-ini):5.1f} car/s · {idb} {carb/(fin-conf):5.1f} car/s")
    cand = []
    for a, b in vicine:
        m = (a+b)/2
        ca, cb = cara/(m-ini), carb/(fin-m)
        # quanto si discostano entrambi dal passo della traccia
        errore = abs(ca-passo)/passo + abs(cb-passo)/passo
        cand.append((errore, m, ca, cb, b-a))
    cand.sort()
    for errore, m, ca, cb, lung in cand[:4]:
        segno = "  <-- ATTUALE" if abs(m-conf) < 0.02 else ""
        print(f"      pausa a {m:7.2f}s (lunga {lung:.2f}s)  {ida} {ca:5.1f} · {idb} {cb:5.1f} car/s"
              f"   scostamento {errore:5.2f}{segno}")
    if cand and abs(cand[0][1] - conf) > 0.02:
        proposte[f"{k}"] = proposte.get(f"{k}", {})
        proposte[f"{k}"][str(i+1)] = round(cand[0][1], 3)
        print(f"    => il confine migliore NON e' quello attuale: {conf:.2f} -> {cand[0][1]:.2f}s")
    else:
        print(f"    => il confine attuale e' gia' il migliore fra le pause vere")

(QUI/"proposte-confini.json").write_text(json.dumps(proposte, indent=1), encoding="utf-8")
print(f"\nconfini da spostare: {sum(len(v) for v in proposte.values())}")
