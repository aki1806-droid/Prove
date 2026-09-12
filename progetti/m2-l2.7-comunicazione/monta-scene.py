#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Per ogni blocco: la clip dell'ingresso (1,8 s) + l'ultimo fotogramma tenuto
fino alla durata del parlato, con l'mp3 del blocco dentro. Una scena, un file."""
import json, subprocess, re
from pathlib import Path
import imageio_ffmpeg

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
OUT = QUI/"scene"; OUT.mkdir(exist_ok=True)

def durata(f):
    o = subprocess.run([FF,"-i",str(f),"-f","null","-"],capture_output=True,text=True).stderr
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
    return int(t[0])*3600+int(t[1])*60+float(t[2])

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
tot = 0.0; righe = []
for r in reg:
    idb, d = r["id"], r["durata"]
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
m = tot + 3 + 10
print(f"\n48 scene · parlato {tot:.1f} s · con copertina 3 s e chiusura 10 s → {int(m//60)}:{m%60:04.1f}")
print(f"scarto massimo audio/video: {peggio[3]*1000:.0f} ms su {peggio[0]}")
