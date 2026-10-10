#!/usr/bin/env python3
"""Sostituisce una resa pubblicata con una nuova (stessa lezione, rimontata).

uso: aggiorna-resa.py <cartella-lezione> <id-nuovo> <durata-s> <motivo>

Aggiorna la riga «resa pubblicata» del REGISTRO (la vecchia resta, barrata,
in «Rese precedenti»), la tabella di progetti/MODULO-N.md e quella del README.
"""
import re, sys
from pathlib import Path

D = Path(sys.argv[1]).resolve(); nuovo, sec, motivo = sys.argv[2], float(sys.argv[3]), sys.argv[4]
dur = f"{int(sec//60)}:{sec%60:04.1f}"
reg = D/"REGISTRO.md"; t = reg.read_text(encoding="utf-8")
m = re.search(r"\| resa pubblicata \| `([0-9a-f]{32})` — ([\d.]+) s \(([\d:.]+)\)", t)
vecchio, vdur = m[1], m[3]
t = t.replace(m[0], f"| resa pubblicata | `{nuovo}` — {sec} s ({dur})", 1)
nota = f"- `{vecchio}` ({vdur}): sostituita il {__import__('datetime').date.today():%d/%m/%Y}. {motivo}\n"
if "### Rese precedenti" in t:
    t = t.replace("### Rese precedenti\n\n", "### Rese precedenti\n\n" + nota, 1)
else:
    t = t.replace("\n---\n\n## Da verificare", f"\n### Rese precedenti\n\n{nota}\n---\n\n## Da verificare", 1)
reg.write_text(t, encoding="utf-8")
for f in [D.parent/f"MODULO-{D.name.split('-')[0][1:]}.md", D.parent.parent/"README.md"]:
    s = f.read_text(encoding="utf-8")
    righe = [r for r in s.split("\n") if vecchio in r]
    assert len(righe) == 1, (f, len(righe))
    s = s.replace(righe[0], righe[0].replace(vecchio, nuovo).replace(f"| {vdur} |", f"| {dur} |"))
    f.write_text(s, encoding="utf-8")
print(f"{D.name}: {vecchio} ({vdur}) -> {nuovo} ({dur})")
