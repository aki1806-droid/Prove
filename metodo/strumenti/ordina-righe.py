#!/usr/bin/env python3
"""Riordina per numero di lezione le righe dei moduli indicati nelle tabelle
di README.md e di progetti/MODULO-N.md (registra-resa le aggiunge in fondo,
nell'ordine di pubblicazione).

uso: ordina-righe.py 16 17     (dalla radice della repository)
Le righe degli altri moduli restano dove sono; quelle dei moduli indicati
riprendono gli stessi posti, in ordine 16.1, 16.2, ... 16.12.
"""
import re, sys
from pathlib import Path

moduli = sys.argv[1:]
def ordina(p, chiave):
    righe = p.read_text(encoding="utf-8").split("\n")
    pos = [i for i, r in enumerate(righe) if chiave(r)]
    for i, r in zip(pos, sorted((righe[i] for i in pos), key=chiave)):
        righe[i] = r
    p.write_text("\n".join(righe), encoding="utf-8")
    print(f"{p}: {len(pos)} righe in ordine")

def nel_readme(r):
    m = re.match(r"\| `m(\d+)-l\d+\.(\d+)-", r)
    return m and m.group(1) in moduli and (int(m.group(1)), int(m.group(2)))
ordina(Path("README.md"), nel_readme)
for n in moduli:
    p = Path(f"progetti/MODULO-{n}.md")
    if p.exists():
        ordina(p, lambda r: (m := re.match(rf"\| {n}\.(\d+) \|", r)) and int(m.group(1)))
