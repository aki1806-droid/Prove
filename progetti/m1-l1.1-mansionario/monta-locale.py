#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Copia locale del montato: copertina 3 s + le 48 scene + chiusura 10 s.
Serve a verificare la durata e a guardare il risultato senza aspettare HeyGen."""
import json, subprocess, re
from pathlib import Path
import imageio_ffmpeg
QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
TMP = QUI/"_montaggio"; TMP.mkdir(exist_ok=True)
sh  = lambda *a: subprocess.run([str(x) for x in a], capture_output=True, text=True)

def durata(f):
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", sh(FF,"-i",f,"-f","null","-").stderr)[-1]
    return int(t[0])*3600+int(t[1])*60+float(t[2])

# copertina e chiusura: immagine ferma + silenzio, cosi' hanno una traccia audio
for idb, sec in (("s01", 3), ("s50", 10)):
    sh(FF,"-y","-v","error","-loop","1","-t",str(sec),"-i",QUI/"slide"/"png"/f"{idb}.png",
       "-f","lavfi","-t",str(sec),"-i","anullsrc=r=44100:cl=stereo",
       "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p","-r","25",
       "-c:a","aac","-b:a","160k","-shortest",TMP/f"{idb}.mp4")

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
ordine = [TMP/"s01.mp4"] + [QUI/"scene"/f"{r['id']}.mp4" for r in reg] + [TMP/"s50.mp4"]
(TMP/"lista.txt").write_text("".join(f"file '{p.resolve()}'\n" for p in ordine), encoding="utf-8")
sh(FF,"-y","-v","error","-f","concat","-safe","0","-i",TMP/"lista.txt",
   "-c","copy","-movflags","+faststart",QUI/"montato-1.1.mp4")

# sottotitoli: dal copione e dalle durate reali dei blocchi
def hms(t):
    h=int(t//3600); m=int(t%3600//60); s=t%60
    return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".",",")
bl = {x["id"]: re.sub(r"\[[a-z]+\]","",x["text"]).strip()
      for x in json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))}
righe, t, n = [], 3.0, 0
for r in reg:
    n += 1
    righe.append(f"{n}\n{hms(t)} --> {hms(t+r['durata'])}\n{bl[r['id']]}\n")
    t += r["durata"]
(QUI/"montato-1.1.srt").write_text("\n".join(righe), encoding="utf-8")

d = durata(QUI/"montato-1.1.mp4")
print(f"montato-1.1.mp4  {int(d//60)}:{d%60:05.2f}  "
      f"{(QUI/'montato-1.1.mp4').stat().st_size//1024//1024} MB")
print(f"montato-1.1.srt  {n} sottotitoli")
print(sh(FF,"-i",QUI/"montato-1.1.mp4","-f","null","-").stderr.split("Stream #0")[1][:150])
