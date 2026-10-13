#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Calendario dei diritti 2027 · Gennaio · Ferie — l'audio: voce, musica, una traccia per scena.

Il pacchetto (pacchetto/) porta le otto scene gia' fatte, mute, e i sei testi
della voce. Qui si fa quello che il README chiede a HeyGen Studio, ma in modo
misurabile:

  - ogni scena parlata dura quanto la sua voce, piu' un attacco e una coda di
    silenzio: la grafica finisce su un fotogramma fermo, la clip si taglia;
  - la musica (libreria HeyGen, «Astral Generated Music 271354a0», piano
    ambient calmo, 70 s con chiusura propria) copre tutto il video, rallentata
    quanto basta perche' la sua chiusura cada sull'ultimo fotogramma, e si
    abbassa sotto la voce (sidechain);
  - il mix si porta a -16 LUFS con un guadagno solo (pubblicazione social) e si taglia in una
    traccia per scena, che HeyGen monta come `audio_asset_id`;
  - le scene, i sottotitoli e il montato di prova li fa monta.py.

  python3 costruisci.py        poi la trascrizione (audio/parole.json), poi monta.py
"""
import json, re, subprocess
from pathlib import Path
import imageio_ffmpeg

QUI = Path(__file__).resolve().parent
FF = imageio_ffmpeg.get_ffmpeg_exe()
PAC = QUI/"pacchetto"
OUT = QUI/"audio"/"scene"; OUT.mkdir(parents=True, exist_ok=True)
SR = 48000

ATTACCO, CODA = 0.5, 0.9          # silenzio prima e dopo la voce, in secondi
CODA_ULTIMA = 1.3                 # l'invito finale respira di piu' prima della chiusura
MUSICA = QUI/"audio"/"musica-271354a0.wav"
MUSICA_DURATA = 70.0
MUSICA_BASE = 0.11                # la musica da sola (S0, S7, le pause): ~10 dB sotto la voce

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    if r.returncode: raise SystemExit(r.stderr[-2000:])
    return r.stderr

def durata(f):
    h, m, s = re.findall(r"Duration: (\d+):(\d+):([\d.]+)", sh(FF, "-i", f, "-f", "null", "-"))[0]
    return int(h)*3600 + int(m)*60 + float(s)

tl = json.loads((PAC/"timeline.json").read_text(encoding="utf-8"))
scene = []
for k, s in enumerate(tl["scene"]):
    if s["voce"]:
        n = int(s["id"][1:])
        v = QUI/"audio"/f"voce-S{n}.mp3"
        coda = CODA_ULTIMA if n == 6 else CODA
        scene.append({**s, "voce_file": v, "voce_s": durata(v),
                      "durata": round(ATTACCO + durata(v) + coda, 3)})
    else:
        scene.append({**s, "voce_file": None, "durata": float(s["durata_s"])})
T = sum(s["durata"] for s in scene)
t = 0.0
for s in scene: s["inizio"] = round(t, 3); t += s["durata"]

# 1. la voce su tutta la durata
# un input per scena, nell'ordine: la voce, o un silenzio lungo quanto la scena
parti, filtri = [], []
for s in scene:
    parti += (["-i", s["voce_file"]] if s["voce_file"] else
              ["-f", "lavfi", "-t", str(s["durata"]), "-i", f"anullsrc=r={SR}:cl=mono"])
for i, s in enumerate(scene):
    if s["voce_file"]:
        filtri.append(f"[{i}:a]aresample={SR},aformat=channel_layouts=mono,"
                      f"adelay={int(ATTACCO*1000)},apad=whole_dur={s['durata']},"
                      f"atrim=0:{s['durata']}[v{i}]")
    else:
        filtri.append(f"[{i}:a]atrim=0:{s['durata']}[v{i}]")
filtri.append("".join(f"[v{i}]" for i in range(len(scene))) + f"concat=n={len(scene)}:v=0:a=1[voce]")
voce = QUI/"audio"/"voce-intera.wav"
sh(FF, "-y", "-v", "error", *parti, "-filter_complex", ";".join(filtri), "-map", "[voce]",
   "-ar", SR, voce)

# 2. la musica: rallentata perche' la sua chiusura cada sulla fine, abbassata sotto la voce
tempo = MUSICA_DURATA / T
mix = QUI/"audio"/"mix.wav"
sh(FF, "-y", "-v", "error", "-i", MUSICA, "-i", voce, "-filter_complex",
   f"[0:a]aresample={SR},aformat=channel_layouts=stereo,atempo={tempo:.5f},"
   f"volume={MUSICA_BASE},afade=t=in:d=1.5,apad=whole_dur={T},atrim=0:{T}[m];"
   f"[1:a]aformat=channel_layouts=stereo,asplit=2[vc][vs];"
   f"[m][vs]sidechaincompress=threshold=0.02:ratio=8:attack=60:release=600[md];"
   f"[vc][md]amix=inputs=2:normalize=0[out]",
   "-map", "[out]", "-ar", SR, QUI/"audio"/"mix-grezzo.wav")
# normalizzazione LINEARE: un guadagno solo per tutto il video. Il loudnorm in un
# passaggio e' dinamico e alza i passaggi piano: la musica da sola in apertura
# tornava forte quanto la voce.
I = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", sh(FF, "-i", QUI/"audio"/"mix-grezzo.wav",
          "-af", "ebur128", "-f", "null", "-"))[-1])
sh(FF, "-y", "-v", "error", "-i", QUI/"audio"/"mix-grezzo.wav", "-af",
   f"volume={-16 - I:.2f}dB,alimiter=limit=0.84:level=disabled", "-ar", SR, mix)

# 3. una traccia per scena
for s in scene:
    sh(FF, "-y", "-v", "error", "-ss", f"{s['inizio']:.3f}", "-t", f"{s['durata']:.3f}", "-i", mix,
       "-c:a", "libmp3lame", "-b:a", "192k", "-ar", SR, OUT/f"{s['id']}.mp3")
    s["audio"] = str((OUT/f"{s['id']}.mp3").relative_to(QUI))

(QUI/"scene.json").write_text(json.dumps(
    [{k: (str(v) if isinstance(v, Path) else v) for k, v in s.items()} for s in scene],
    indent=1, ensure_ascii=False), encoding="utf-8")
for s in scene:
    print(f"{s['id']}  {s['inizio']:6.2f} -> {s['inizio']+s['durata']:6.2f}  {s['durata']:5.2f} s  "
          + (f"voce {s['voce_s']:.2f}" if s['voce_file'] else "muta"))
print(f"totale {T:.2f} s · musica a {tempo:.3f}x")
