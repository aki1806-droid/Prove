#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""I controlli del MASTER §6, tutti in una volta.

Un 8/9 si consegna solo dicendo quale controllo non e' passato e perche'.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent))
from aritmetica import CONTI, profilo

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
p = profilo(); c = CONTI(p)
NOME = re.sub(r"[^a-z0-9]+", "-", p["titolo"].lower()).strip("-")[:40] or "montato"
ok = lambda b: "OK  " if b else "NO  "
esiti = []

# 1. la voce ha detto tutto
f    = QUI/"audio"/"esiti-verifica.json"
corr = QUI/"audio"/"correzioni.json"
ctrl = sorted((QUI/"audio"/"trascrizioni").glob("controprova*.txt")) \
       if (QUI/"audio"/"trascrizioni").exists() else []
txt  = QUI/"audio"/"esiti-testo.json"
if not f.exists() and txt.exists():
    # Strada alternativa: la trascrizione dell'intera traccia grezza. Prova che
    # la voce ha detto tutto, ma non dove cadono i tagli, perche' la
    # trascrizione non porta i tempi: per quelli restano l'allineamento DTW e
    # verifica-locale.py.
    e = json.loads(txt.read_text(encoding="utf-8"))
    buchi = sum(len(v["buchi"]) for v in e.values())
    perc = min(100*v["coincidenti"]/v["parole_copione"] for v in e.values())
    esiti.append((not buchi, f"verifica per trascrizione (traccia intera): {perc:.1f}% "
                             f"delle parole coincide, buchi nel parlato: {buchi}"))
elif not f.exists():
    esiti.append((False, "verifica per trascrizione: NON ESEGUITA"))
else:
    fuori = [e for e in json.loads(f.read_text(encoding="utf-8")) if not e["ok"]]
    if not fuori:
        esiti.append((True, "verifica per trascrizione: nessun confine fuori posto"))
    elif corr.exists() and ctrl:
        n = sum(len(v) for v in json.loads(corr.read_text(encoding="utf-8")).values())
        esiti.append((n >= len(fuori), f"verifica: {len(fuori)} fuori posto alla prova, "
                      f"{n} corretti e ricontrollati -> {max(0, len(fuori)-n)}"))
    else:
        esiti.append((False, f"verifica: {len(fuori)} confini fuori posto, non corretti"))

# 2. la voce sta nella fascia di velocita'
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
male = [r for r in reg if not 8.5 <= r["cps"] <= 21]
esiti.append((not male, "fascia 8,5-21 car/s: " +
              (", ".join(f'{r["id"]} a {r["cps"]}' for r in male) or "tutti dentro")))

# 3. tutte le clip ci sono e sono state guardate nei provini
grezze = sorted((QUI/"clip"/"grezze").glob("s*.mp4"))
finite = sorted((QUI/"clip"/"finite").glob("s*.mp4"))
prov   = sorted((QUI/"clip"/"provini").glob("*.png"))
esiti.append((len(finite) == len(reg), f"clip lavorate: {len(finite)}/{len(reg)} "
                                       f"(grezze {len(grezze)})"))
esiti.append((len(prov) >= -(-len(reg)//6), f"provini a contatto guardati: {len(prov)} fogli"))

# 4. ogni clip dura quanto il suo blocco
lav = QUI/"clip"/"lavorate.json"
if lav.exists():
    L = json.loads(lav.read_text(encoding="utf-8"))
    fuori_t = [x for x in L if x["scarto"] > 0.04]
    esiti.append((not fuori_t, "clip alla durata del blocco (±40 ms): " +
                  (", ".join(f'{x["id"]} {x["scarto"]*1000:.0f} ms' for x in fuori_t)
                   or "tutte")))
else:
    esiti.append((False, "clip alla durata del blocco: clip/lavorate.json manca"))

# 5. scene entro il tetto
scene = sorted((QUI/"scene").glob("s*.mp4"))
esiti.append((len(scene)+2 <= 50, f"scene totali: {len(scene)+2} (tetto 50)"))

# 6. la durata chiesta
o = subprocess.run([FF, "-i", str(QUI/f"{NOME}.mp4"), "-f", "null", "-"],
                   capture_output=True, text=True).stderr
t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
d = int(t[0])*3600 + int(t[1])*60 + float(t[2])
esiti.append((d >= c["durata"] * 0.95,
              f'durata {int(d//60)}:{d%60:05.2f} — chiesti '
              f'{int(c["durata"]//60)}:{c["durata"]%60:05.2f}'))

# 7. formato e fotogrammi
# La riga dello Stream si cerca riga per riga: su tutto il testo in una volta
# il punto-qualsiasi scavalca le righe e torna un 0x4217 a 1063 fps.
riga = next((l for l in o.splitlines() if "Stream" in l and "Video" in l), "")
v = re.search(r"(\d{2,5})x(\d{2,5})", riga)
fps = re.search(r"([\d.]+) fps", riga)
if v:
    giusto = (int(v.group(1)), int(v.group(2))) == (c["larghezza"], c["altezza"])
    esiti.append((giusto, f'formato {v.group(1)}x{v.group(2)} a '
                          f'{fps.group(1) if fps else "?"} fps — chiesto '
                          f'{c["larghezza"]}x{c["altezza"]}'))
else:
    esiti.append((False, "formato: riga dello stream non leggibile"))

# 8. i sottotitoli
srt = (QUI/f"{NOME}.srt").read_text(encoding="utf-8")
n = len(re.findall(r"-->", srt))
lunghe = [r for r in srt.split("\n\n") if any(len(x) > 48 for x in r.split("\n")[2:])]
esiti.append((n > 0 and not lunghe,
              f"sottotitoli SRT: {n} righe, {len(lunghe)} troppo lunghe"))

# 9. il registro
rf = QUI/"REGISTRO.md"
esiti.append((rf.exists() and "## Da verificare" in rf.read_text(encoding="utf-8"),
              "registro con la sezione «da verificare»"))

print(f'CONTROLLI PRIMA DI CONSEGNARE (MASTER §6)\n\n{p["titolo"]}\n')
for b, t in esiti: print(f"  [{ok(b)}] {t}")
print(f"\n{sum(1 for b, _ in esiti if b)}/{len(esiti)} superati")
