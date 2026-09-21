#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""L'indice dei capitoli, sui tempi VERI del montato.

La tabella dello script (da 01:53 a 56:23) e' calcolata su un video di 60
minuti ipotetici, prima che la voce esistesse. Il montato vero dura 59:46,79 e
i capitoli non cadono dove diceva quella tabella: fino a 29 secondi di scarto.
Usarla come segnacapitoli manderebbe lo spettatore mezzo minuto fuori posto.

I tempi si camminano sulla sequenza reale, con la Duration dell'intestazione di
ogni file - la stessa misura che usa monta-locale.py, per le stesse ragioni.
L'inizio di un capitolo e' la sua CARD muta, non la prima scena parlata.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg

QUI = Path(__file__).resolve().parent
FF  = imageio_ffmpeg.get_ffmpeg_exe()
NOME = "busta-paga-60min"

def durata(f):
    e = subprocess.run([FF, "-i", str(f)], capture_output=True, text=True).stderr
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", e)
    if not m: raise SystemExit(f"nessuna Duration in {f}")
    return int(m[1])*3600 + int(m[2])*60 + float(m[3])

mmss = lambda t: f"{int(t//60):02d}:{int(t%60):02d}"

scene = json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))

# Il nome del capitolo e' quello scritto sulla SUA CARD, non quello della
# tabella dello script: e' la parola che lo spettatore vede quando il capitolo
# comincia, ed e' l'unica che non puo' smentire il video.
dump = subprocess.run(["node", "-e", """
import('./slide/contenuti.mjs').then(m=>{
  const a = m.default || Object.values(m)[0];
  const o = {};
  for (const s of a) if (s.tipo === 'copertina' && s.titolo) o[s.id] = s.titolo;
  console.log(JSON.stringify(o));
});"""], cwd=QUI, capture_output=True, text=True)
if dump.returncode:
    raise SystemExit(f"non riesco a leggere i titoli dalle slide:\n{dump.stderr[-400:]}")
per_id = json.loads(dump.stdout)
pulisci = lambda s: re.sub(r"<br\s*/?>", " ", s).strip()
titoli = {}
for s in scene:
    if not s["text"] and s.get("capitolo") and s["id"] in per_id:
        titoli.setdefault(s["capitolo"], pulisci(per_id[s["id"]]))

t, inizi = 0.0, {}
for s in scene:
    f = (QUI/"scene"/f"{s['id']}.mp4") if s["text"] else (QUI/"_montaggio"/f"{s['id']}.mp4")
    c = s.get("capitolo")
    if c and not s["text"] and c not in inizi:
        inizi[c] = t
    t += durata(f)

righe = ["00:00 Copertina"] + [f"{mmss(inizi[c])} {c}. {titoli.get(c, '')}".rstrip()
                               for c in sorted(inizi)]
(QUI/"indice-capitoli.txt").write_text("\n".join(righe) + "\n", encoding="utf-8")
print("\n".join(righe))
print(f"\ntotale {mmss(t)} — scritto in indice-capitoli.txt")
