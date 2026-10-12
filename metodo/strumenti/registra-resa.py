#!/usr/bin/env python3
"""Registra la PRIMA resa di una lezione nuova (per sostituire una resa gia'
pubblicata si usa aggiorna-resa.py).

uso: registra-resa.py <lezione> <id-video> <durata-s> <titolo breve>
     (da progetti/; il titolo e' quello delle tabelle, es. «L'anziana fragile»)

- REGISTRO.md: la sezione «## La resa» (*in corso*) diventa la tabella con
  resa e lotto (il lotto si legge da asset-id.json);
- MODULO-N.md: aggiunge o aggiorna la riga della lezione (crea il file se manca);
- README.md: aggiunge o aggiorna la riga nella tabella delle lezioni.
"""
import json, re, sys
from pathlib import Path

D = Path(sys.argv[1]).resolve()
vid, dur, titolo = sys.argv[2], float(sys.argv[3]), sys.argv[4]
N = re.search(r"-l([\d.]+)-", D.name)[1]
M = N.split(".")[0]
mmss = f"{int(dur // 60)}:{dur % 60:04.1f}"
lotto = json.loads((D/"asset-id.json").read_text(encoding="utf-8"))["batch"]

reg = D/"REGISTRO.md"; t = reg.read_text(encoding="utf-8")
tab = (f"## La resa\n\n| | |\n|---|---|\n"
       f"| resa pubblicata | `{vid}` — {dur:.3f} s ({mmss}), 1080p 16:9, con SRT (`subtitle_url`) |\n"
       f"| lotto asset | `{lotto}` — 98 file, tutti completati |\n")
t2 = re.sub(r"## La resa\n+(\*in corso\*|.*?)(?=\n---|\n## )", lambda m: tab, t, count=1, flags=re.S)
assert t2 != t or vid in t, "sezione «## La resa» non trovata"
reg.write_text(t2, encoding="utf-8")

riga = f"| {N} | {titolo} | {mmss} | `{vid}` |"
mod = D.parent/f"MODULO-{M}.md"
if mod.exists():
    m = mod.read_text(encoding="utf-8")
else:
    m = f"# Modulo {M}\n\n| | lezione | durata | resa |\n|---|---|---|---|\n"
if re.search(rf"^\| {re.escape(N)} \|", m, flags=re.M):
    m = re.sub(rf"^\| {re.escape(N)} \|.*$", riga, m, flags=re.M)
else:   # dopo l'ultima riga di tabella del modulo
    righe = m.split("\n"); ult = max(i for i, r in enumerate(righe) if re.match(r"\| \d|\|---", r))
    righe.insert(ult + 1, riga); m = "\n".join(righe)
mod.write_text(m, encoding="utf-8")

readme = D.parent.parent/"README.md"; r = readme.read_text(encoding="utf-8")
rr = f"| `{D.name}` | Modulo {M} · {N} {titolo} | {mmss} | `{vid}` |"
if f"`{D.name}`" in r:
    r = re.sub(rf"^\| `{re.escape(D.name)}` \|.*$", rr, r, flags=re.M)
else:
    righe = r.split("\n"); ult = max(i for i, x in enumerate(righe) if x.startswith("| `m"))
    righe.insert(ult + 1, rr); r = "\n".join(righe)
readme.write_text(r, encoding="utf-8")
print(f"{D.name}: {vid} ({mmss}) registrata in REGISTRO, {mod.name}, README")
