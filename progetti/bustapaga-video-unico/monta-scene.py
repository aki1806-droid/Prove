#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Per ogni blocco: la clip dell'ingresso (1,8 s) + l'ultimo fotogramma tenuto
fino alla durata del parlato, con l'mp3 del blocco dentro. Una scena, un file."""
import json, subprocess, re
from pathlib import Path
import imageio_ffmpeg

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
import sys as _sys; _sys.path.insert(0, str(QUI))
from profilo import COPERTINA, CHIUSURA, CARD_CAPITOLO
OUT = QUI/"scene"; OUT.mkdir(exist_ok=True)

def durata(f):
    o = subprocess.run([FF,"-i",str(f),"-f","null","-"],capture_output=True,text=True).stderr
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
    return int(t[0])*3600+int(t[1])*60+float(t[2])

# Opzionale: SOLO=s160 ricostruisce soltanto quelle scene, quando si e'
# corretta una slide su duecento. Le altre restano quelle di prima, e il
# riepilogo finale continua a misurarle tutte sui FILE, non su cio' che e'
# stato appena rifatto: cosi' una scena vecchia rimasta indietro si vede.
import os
SOLO = set(filter(None, os.environ.get("SOLO", "").split(","))) or None

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
tot = 0.0; righe = []
for r in reg:
    idb, d = r["id"], r["durata"]
    if SOLO and idb not in SOLO:
        dr = durata(OUT/f"{idb}.mp4"); tot += dr
        righe.append((idb, d, dr, abs(dr-d)))
        continue
    clip, mp3, out = QUI/"slide"/"mp4"/f"{idb}.mp4", QUI/"audio"/"blocchi"/f"{idb}.mp3", OUT/f"{idb}.mp4"
    p = subprocess.run([FF,"-y","-v","error","-i",str(clip),"-i",str(mp3),
        "-filter_complex", f"[0:v]tpad=stop_mode=clone:stop_duration={d+1:.3f},fps=25[v]",
        "-map","[v]","-map","1:a","-t",f"{d:.3f}",
        "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",
        "-c:a","aac","-b:a","160k","-movflags","+faststart",str(out)],
        capture_output=True,text=True)
    if p.returncode: print(idb, p.stderr[-400:]); raise SystemExit(1)
    dr = durata(out); tot += dr
    righe.append((idb, d, dr, abs(dr-d)))
    print(f"  {idb}  audio {d:6.2f}s  scena {dr:6.2f}s  scarto {abs(dr-d)*1000:4.0f} ms")

peggio = max(righe, key=lambda x: x[3])
# Le scene ferme qui non sono due: sono la copertina, la chiusura e TREDICI card
# di capitolo. Si contano dal dato - sono le scene senza parlato - invece di
# sommare a mano due costanti, che era giusto quando erano due.
scene = json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))
ferme = [s for s in scene if not s["text"]]
sec = lambda tipo: (COPERTINA if "Copertina" in tipo else
                    CARD_CAPITOLO if "Card di capitolo" in tipo else CHIUSURA)
fermo = sum(sec(s["tipo"]) for s in ferme)
m = tot + fermo
print(f"\n{len(reg)+len(ferme)} scene · parlato {tot:.1f} s · "
      f"{len(ferme)} scene ferme per {fermo:g} s → {int(m//60)}:{m%60:04.1f}")
print(f"scarto massimo audio/video: {peggio[3]*1000:.0f} ms su {peggio[0]}")
