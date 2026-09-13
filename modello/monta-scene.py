#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 9 del MASTER: una scena per blocco, clip finita + mp3 del blocco.

Qui non si allunga piu' niente: clip/lavora.py ha gia' portato ogni clip alla
durata esatta del suo blocco. Questo passo accoppia e basta, e serve soprattutto
a misurare: se una scena esce di durata diversa dal suo mp3, il montaggio lo
fara' notare molto piu' tardi e molto peggio.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent))
from aritmetica import CONTI, profilo

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
OUT = QUI/"scene"; OUT.mkdir(exist_ok=True)
TOLLERANZA = 0.08

def durata(f):
    o = subprocess.run([FF, "-i", str(f), "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

c = CONTI(profilo())
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
tot = 0.0; righe = []
for r in reg:
    idb, d = r["id"], r["durata"]
    clip = QUI/"clip"/"finite"/f"{idb}.mp4"
    mp3  = QUI/"audio"/"blocchi"/f"{idb}.mp3"
    out  = OUT/f"{idb}.mp4"
    if not clip.exists():
        print(f"  {idb}  MANCA la clip finita"); raise SystemExit(1)
    # -shortest non basta: se la clip e' lunga un fotogramma di piu', la scena
    # dura di piu' del suo audio e lo scarto si accumula sulle scene seguenti.
    p = subprocess.run([FF, "-y", "-v", "error", "-i", str(clip), "-i", str(mp3),
        "-map", "0:v", "-map", "1:a", "-t", f"{d:.3f}",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
        "-movflags", "+faststart", str(out)], capture_output=True, text=True)
    if p.returncode: print(idb, p.stderr[-400:]); raise SystemExit(1)
    dr = durata(out); tot += dr
    righe.append((idb, d, dr, abs(dr-d)))
    print(f"  {idb}  audio {d:6.2f}s  scena {dr:6.2f}s  scarto {abs(dr-d)*1000:4.0f} ms")

peggio = max(righe, key=lambda x: x[3])
m = tot + c["copertina"] + c["chiusura"]
print(f'\n{len(righe)} scene · parlato {tot:.1f} s · con copertina {c["copertina"]} s '
      f'e chiusura {c["chiusura"]} s → {int(m//60)}:{m%60:04.1f}')
print(f"scarto massimo audio/video: {peggio[3]*1000:.0f} ms su {peggio[0]}")
if peggio[3] > TOLLERANZA:
    print("Oltre tolleranza: rilanciare clip/lavora.py su quel blocco prima di caricare.")
