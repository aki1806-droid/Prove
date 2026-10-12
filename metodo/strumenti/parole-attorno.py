#!/usr/bin/env python3
"""Stampa le parole di una trascrizione, con l'istante d'inizio, fra due tempi:
serve per capire se un confine fra blocchi cade nel punto giusto.

uso: parole-attorno.py <stato.json> <generation_id della trascrizione> <da-s> <a-s>

Il risultato in linea tronca le parole a 600: qui si scarica l'elenco completo
da words_download_url.
"""
import json, subprocess, sys
from pathlib import Path

d = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
t = next(x for x in d["transcripts"] if x["generation_id"] == sys.argv[2])
da, a = float(sys.argv[3]), float(sys.argv[4])
w = t.get("words") or []
if t.get("words_truncated") or not w:
    out = subprocess.run(["curl", "-sS", t["words_download_url"]], capture_output=True, text=True).stdout
    j = json.loads(out); w = j.get("words", j) if isinstance(j, dict) else j
print(" ".join(f"{x['start']:.1f}:{x['text']}" for x in w
               if x.get("type", "word") == "word" and da <= x["start"] <= a))
