#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 9 del MASTER: la copia di controllo, in locale.

Copertina + le scene + chiusura, concatenate con ffmpeg, piu' l'SRT. Serve a
guardare il video intero e a misurarne la durata senza aspettare il render del
servizio - e a scoprire li' quello che altrimenti si scopre dopo tre minuti di
attesa e un render buttato.

Per un video che non sta in 50 scene, si montano le parti una per una sul
servizio e si concatenano qui: la lista si fa a mano in _montaggio/parti.txt.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent))
from aritmetica import CONTI, profilo
sys.path.insert(0, str(Path(__file__).resolve().parent/"clip"))
from sottotitoli import tutte

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
TMP = QUI/"_montaggio"; TMP.mkdir(exist_ok=True)
sh  = lambda *a: subprocess.run([str(x) for x in a], capture_output=True, text=True)

def durata(f):
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", sh(FF, "-i", f, "-f", "null", "-").stderr)[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

p = profilo(); c = CONTI(p)
NOME = re.sub(r"[^a-z0-9]+", "-", p["titolo"].lower()).strip("-")[:40] or "montato"

# copertina e chiusura: immagine ferma + silenzio, cosi' hanno una traccia audio
# e la concatenazione non trova un pezzo senza audio a meta' strada
for nome, sec in (("copertina", c["copertina"]), ("chiusura", c["chiusura"])):
    r = sh(FF, "-y", "-v", "error", "-loop", "1", "-t", str(sec), "-i", QUI/"clip"/f"{nome}.png",
           "-f", "lavfi", "-t", str(sec), "-i", "anullsrc=r=44100:cl=stereo",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
           "-r", "25", "-c:a", "aac", "-b:a", "160k", "-shortest", TMP/f"{nome}.mp4")
    if r.returncode: raise SystemExit(r.stderr[-400:])

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
ordine = ([TMP/"copertina.mp4"] + [QUI/"scene"/f'{r["id"]}.mp4' for r in reg]
          + [TMP/"chiusura.mp4"])
mancano = [f.name for f in ordine if not f.exists()]
if mancano: raise SystemExit("mancano: " + ", ".join(mancano))
(TMP/"lista.txt").write_text("".join(f"file '{f.resolve()}'\n" for f in ordine), encoding="utf-8")
sh(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", TMP/"lista.txt",
   "-c", "copy", "-movflags", "+faststart", QUI/f"{NOME}.mp4")

# sottotitoli: dalla stessa funzione che li imprime nelle clip, cosi' l'SRT
# dice esattamente quello che si vede, negli stessi istanti
def hms(t):
    h = int(t//3600); m = int(t % 3600//60); s = t % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".", ",")
righe = [f'{n}\n{hms(r["da"])} --> {hms(r["a"])}\n{r["testo"]}\n'
         for n, r in enumerate(tutte(), start=1)]
(QUI/f"{NOME}.srt").write_text("\n".join(righe), encoding="utf-8")

d = durata(QUI/f"{NOME}.mp4")
print(f'{NOME}.mp4  {int(d//60)}:{d%60:05.2f}  '
      f'{(QUI/f"{NOME}.mp4").stat().st_size//1024//1024} MB  ·  {len(ordine)} scene')
print(f'{NOME}.srt  {len(righe)} sottotitoli')
print(f'chiesti   {int(c["durata"]//60)}:{c["durata"]%60:05.2f}   '
      f'scarto {d-c["durata"]:+.1f} s')
