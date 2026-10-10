#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fase 0: misura un video di riferimento prima di provare a rifarlo.

uso: analizza-riferimento.py <video.mp4> [cartella-uscita]

Scrive nella cartella (default: riferimento/):
  misure.json      formato, durata, fps, tagli di scena con i tempi, audio sì/no
  provini/NN.png   un fotogramma a metà di ogni inquadratura (max 60)
  provino.png      tutti i provini in un foglio unico, da guardare per primi
  audio.mp3        la traccia audio, da trascrivere (ElevenLabs scribe)

Il resto - stile delle scritte, colori, ritmo del parlato - si giudica
GUARDANDO provino.png e i singoli provini: la misura dice dove sono i tagli,
non che cosa c'è dentro.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
SOGLIA_TAGLIO = 0.30      # sensibilità del rilevatore di scena (0-1, più basso = più tagli)

def sh(*a):
    return subprocess.run([str(x) for x in a], capture_output=True, text=True).stderr

src = Path(sys.argv[1]); out = Path(sys.argv[2] if len(sys.argv) > 2 else "riferimento")
(out/"provini").mkdir(parents=True, exist_ok=True)

info = sh(FF, "-i", src)
dur = re.search(r"Duration: (\d+):(\d+):([\d.]+)", info)
durata = int(dur[1])*3600 + int(dur[2])*60 + float(dur[3])
v = re.search(r"Video: .*?, (\d{2,5})x(\d{2,5})", info)
w, h = int(v[1]), int(v[2])
fps = re.search(r"([\d.]+) fps", info)
ha_audio = "Audio:" in info

# Tagli di scena: il filtro select con scene>soglia stampa i tempi in showinfo.
log = sh(FF, "-i", src, "-vf", f"select='gt(scene,{SOGLIA_TAGLIO})',showinfo", "-f", "null", "-")
tagli = [round(float(t), 2) for t in re.findall(r"pts_time:([\d.]+)", log)]
bordi = [0.0] + tagli + [durata]
inq = [(bordi[i], bordi[i+1]) for i in range(len(bordi)-1) if bordi[i+1]-bordi[i] > 0.15]

for k, (a, b) in enumerate(inq[:60]):
    sh(FF, "-y", "-v", "error", "-ss", f"{(a+b)/2:.2f}", "-i", src, "-frames:v", "1",
       "-vf", "scale=360:-2", out/"provini"/f"{k+1:02d}.png")
n = min(len(inq), 60)
col = 6 if h > w else 4
sh(FF, "-y", "-v", "error", "-i", out/"provini"/"%02d.png",
   "-vf", f"tile={col}x{(n+col-1)//col}:padding=6:color=white", "-frames:v", "1", out/"provino.png")
if ha_audio:
    sh(FF, "-y", "-v", "error", "-i", src, "-vn", "-c:a", "libmp3lame", "-b:a", "128k", out/"audio.mp3")

lung = [round(b-a, 2) for a, b in inq]
m = {"file": src.name, "larghezza": w, "altezza": h,
     "formato": "verticale 9:16" if h > w else ("quadrato" if h == w else "orizzontale"),
     "durata_s": round(durata, 2), "fps": float(fps[1]) if fps else None, "audio": ha_audio,
     "inquadrature": len(inq), "durata_media_inquadratura_s": round(sum(lung)/len(lung), 2),
     "inquadratura_piu_corta_s": min(lung), "inquadratura_piu_lunga_s": max(lung),
     "tagli_s": tagli, "durate_inquadrature_s": lung}
(out/"misure.json").write_text(json.dumps(m, indent=1, ensure_ascii=False), encoding="utf-8")
print(f"{m['formato']} {w}x{h} · {durata:.1f} s · {len(inq)} inquadrature "
      f"(media {m['durata_media_inquadratura_s']} s, da {min(lung)} a {max(lung)}) · audio: {ha_audio}")
print(f"-> {out}/provino.png da guardare, {out}/audio.mp3 da trascrivere")
