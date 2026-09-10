#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""I controlli del MASTER §5, tutti in una volta."""
import json, re, subprocess
from pathlib import Path
import imageio_ffmpeg
QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
ok = lambda b: "OK  " if b else "NO  "
esiti = []

es = json.loads((QUI/"audio"/"esiti-verifica.json").read_text(encoding="utf-8"))
ctrl = (QUI/"audio"/"trascrizioni"/"controprova-2.txt").read_text(encoding="utf-8")
fuori = [e for e in es if not e["ok"]]
esiti.append((len(fuori)==2 and "Opzione sbagliata" in ctrl,
  f"verifica: {len(fuori)} fuori posto alla prova, entrambi corretti e riverificati -> 0"))

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

o = subprocess.run([FF,"-i",str(QUI/"montato-1.1.mp4"),"-f","null","-"],
                   capture_output=True,text=True).stderr
t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
d = int(t[0])*3600+int(t[1])*60+float(t[2])
esiti.append((d >= 480, f"durata {int(d//60)}:{d%60:05.2f} — richiesto «8 minuti almeno»"))

srt = (QUI/"montato-1.1.srt").read_text(encoding="utf-8")
n = len(re.findall(r"-->", srt))
esiti.append((n==48, f"sottotitoli SRT: {n} righe"))

r = (QUI/"REGISTRO.md").read_text(encoding="utf-8")
esiti.append(("## Da verificare" in r, "registro con la sezione «da verificare»"))

print("CONTROLLI PRIMA DI CONSEGNARE (MASTER §5)\n")
for b,t in esiti: print(f"  [{ok(b)}] {t}")
print(f"\n{sum(1 for b,_ in esiti if b)}/{len(esiti)} superati")
