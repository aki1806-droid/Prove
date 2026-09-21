#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Copia locale del montato, e i sottotitoli.

Differenza dalla lezione seme: li' le scene ferme erano due, la copertina e la
chiusura, e si potevano prendere come il primo e l'ultimo PNG. Qui sono QUINDICI
- copertina, tredici card di capitolo, chiusura - e stanno sparse in mezzo al
video. Prenderle per posizione non funziona piu'.

Si derivano dal dato, come dice il MASTER: le scene ferme sono quelle che in
blocchi.json NON hanno parlato, e il loro `tipo` dice quanto durano. Niente
numeri murati qui dentro: le tre durate stanno in profilo.py.

Lo stesso vale per i sottotitoli: i tempi si accumulano camminando la sequenza
VERA, ferme comprese, altrimenti ogni card di capitolo sfasa di due secondi
tutto quello che viene dopo - e a meta' video il sottotitolo sarebbe indietro
di mezzo minuto.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
sys.path.insert(0, str(QUI))
from profilo import COPERTINA, CHIUSURA, CARD_CAPITOLO

NOME = "busta-paga-60min"
TMP  = QUI/"_montaggio"; TMP.mkdir(exist_ok=True)
sh   = lambda *a: subprocess.run([str(x) for x in a], capture_output=True, text=True)

def durata(f):
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", sh(FF, "-i", f, "-f", "null", "-").stderr)[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

def secondi_fermi(tipo):
    """Quanto dura una scena muta, dal suo tipo nello script dell'utente."""
    if "Copertina" in tipo:        return COPERTINA
    if "Card di capitolo" in tipo: return CARD_CAPITOLO
    if "Chiusura" in tipo:         return CHIUSURA
    raise SystemExit(f"scena muta di tipo sconosciuto: {tipo!r}")

scene = json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))
reg   = {r["id"]: r for r in
         json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))}

# --- le scene ferme: immagine + silenzio, cosi' hanno una traccia audio e la
#     concatenazione non salta (senza audio, concat -c copy lascia un buco)
ferme = [s for s in scene if not s["text"]]
print(f"scene ferme da costruire: {len(ferme)}")
for s in ferme:
    sec = secondi_fermi(s["tipo"])
    sh(FF, "-y", "-v", "error", "-loop", "1", "-t", str(sec),
       "-i", QUI/"slide"/"png"/f"{s['id']}.png",
       "-f", "lavfi", "-t", str(sec), "-i", "anullsrc=r=44100:cl=stereo",
       "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
       "-pix_fmt", "yuv420p", "-r", "25",
       "-c:a", "aac", "-b:a", "160k", "-shortest", TMP/f"{s['id']}.mp4")

# --- la sequenza vera, nell'ordine dello script
ordine, mancanti = [], []
for s in scene:
    f = (QUI/"scene"/f"{s['id']}.mp4") if s["text"] else (TMP/f"{s['id']}.mp4")
    (ordine if f.exists() else mancanti).append(f if f.exists() else s["id"])
if mancanti:
    raise SystemExit(f"mancano {len(mancanti)} scene: {mancanti[:8]}...")

(TMP/"lista.txt").write_text("".join(f"file '{p.resolve()}'\n" for p in ordine), encoding="utf-8")
sh(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", TMP/"lista.txt",
   "-c", "copy", "-movflags", "+faststart", QUI/f"montato-{NOME}.mp4")

# --- i sottotitoli: i tempi camminano la sequenza intera, ferme comprese
def hms(t):
    h = int(t//3600); m = int(t % 3600 // 60); s = t % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".", ",")

righe, t, n = [], 0.0, 0
for s in scene:
    if not s["text"]:
        t += secondi_fermi(s["tipo"]); continue
    d = reg[s["id"]]["durata"]
    n += 1
    testo = re.sub(r"\[[a-z]+\]", "", s["text"]).strip()
    righe.append(f"{n}\n{hms(t)} --> {hms(t+d)}\n{testo}\n")
    t += d
(QUI/f"montato-{NOME}.srt").write_text("\n".join(righe), encoding="utf-8")

d = durata(QUI/f"montato-{NOME}.mp4")
mb = (QUI/f"montato-{NOME}.mp4").stat().st_size // 1024 // 1024
print(f"\nmontato-{NOME}.mp4  {int(d//60)}:{d%60:05.2f}  {mb} MB")
print(f"montato-{NOME}.srt  {n} sottotitoli")
print(f"somma camminata dalla sequenza: {int(t//60)}:{t%60:05.2f}  "
      f"(scarto col montato: {abs(t-d)*1000:.0f} ms)")
