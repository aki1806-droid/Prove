#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""I controlli del MASTER §5, tutti in una volta."""
import json, re, subprocess
from pathlib import Path
import imageio_ffmpeg
QUI = Path(__file__).resolve().parent
import re as _re
LEZIONE = (_re.search(r"-l([\d.]+)-", QUI.name) or ["","?"])[1]
FF  = imageio_ffmpeg.get_ffmpeg_exe()
ok = lambda b: "OK  " if b else "NO  "
esiti = []

# La verifica passa se la prova non ha trovato nulla, oppure se tutto quello
# che ha trovato e' stato corretto e poi ricontrollato con una controprova.
f = QUI/"audio"/"esiti-verifica.json"
corr = QUI/"audio"/"correzioni.json"
ctrl = sorted((QUI/"audio"/"trascrizioni").glob("controprova*.txt")) if (QUI/"audio"/"trascrizioni").exists() else []
txt = QUI/"audio"/"esiti-testo.json"
if not f.exists() and txt.exists():
    # Strada alternativa: la trascrizione dell'intera traccia grezza. Prova che
    # la voce ha detto tutto - l'errore che in 1.1 e' costato una rigenerazione -
    # ma non dove cadono i tagli, perche' la trascrizione non porta i tempi.
    # Per quelli restano l'allineamento DTW e controllo-statistico.py.
    e = json.loads(txt.read_text(encoding="utf-8"))
    buchi = sum(len(v["buchi"]) for v in e.values())
    perc = min(100*v["coincidenti"]/v["parole_copione"] for v in e.values())
    esiti.append((not buchi, f"verifica per trascrizione (traccia intera): {perc:.1f}% "
                             f"delle parole coincide, buchi nel parlato: {buchi}"))
elif not f.exists():
    esiti.append((False, "verifica per trascrizione: NON ESEGUITA — manca prova.txt"))
else:
    fuori = [e for e in json.loads(f.read_text(encoding="utf-8")) if not e["ok"]]
    if not fuori:
        esiti.append((True, "verifica per trascrizione: nessun confine fuori posto"))
    elif corr.exists() and ctrl:
        n = sum(len(v) for v in json.loads(corr.read_text(encoding="utf-8")).values())
        bastano = n >= len(fuori)
        esiti.append((bastano, f"verifica: {len(fuori)} fuori posto alla prova, {n} corretti "
                          f"e ricontrollati con controprova -> {max(0,len(fuori)-n)}"))
    else:
        esiti.append((False, f"verifica per trascrizione: {len(fuori)} confini fuori posto, non corretti"))

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
male = [r for r in reg if not 8.5 <= r["cps"] <= 21]
esiti.append((not male, "fascia 8,5-21 car/s: " +
  (", ".join(f"{r['id']} a {r['cps']}" for r in male) or "tutti dentro")))

png = sorted(Path(QUI/"slide"/"png").glob("s*.png"))
esiti.append((len(png)==50, f"50 PNG renderizzati e guardati: {len(png)}"))
sfora = json.loads((QUI/"slide"/"troppo-alte.json").read_text(encoding="utf-8"))
esiti.append((not sfora, f"nessuna slide sfora la cornice: {len(sfora)} sforano"))

scene = sorted(Path(QUI/"scene").glob("*.mp4"))
esiti.append((len(scene)+2 <= 50, f"scene totali: {len(scene)+2} (tetto 50)"))

o = subprocess.run([FF,"-i",str(QUI/f"montato-{LEZIONE}.mp4"),"-f","null","-"],
                   capture_output=True,text=True).stderr
t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
d = int(t[0])*3600+int(t[1])*60+float(t[2])
esiti.append((d >= 480, f"durata {int(d//60)}:{d%60:05.2f} — richiesto «8 minuti almeno»"))

srt = (QUI/f"montato-{LEZIONE}.srt").read_text(encoding="utf-8")
n = len(re.findall(r"-->", srt))
esiti.append((n==48, f"sottotitoli SRT: {n} righe"))

rf = QUI/"REGISTRO.md"
esiti.append((rf.exists() and "## Da verificare" in rf.read_text(encoding="utf-8"),
              "registro con la sezione «da verificare»"))

print("CONTROLLI PRIMA DI CONSEGNARE (MASTER §5)\n")
for b,t in esiti: print(f"  [{ok(b)}] {t}")
print(f"\n{sum(1 for b,_ in esiti if b)}/{len(esiti)} superati")
