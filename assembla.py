#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Assembla MASTER-VIDEOCLIP.md dalla prosa e dai file veri.

Il master e' un documento portatile: dentro c'e' anche il codice. Tenerne una
copia a mano dentro il markdown vuol dire che prima o poi diverge da quella che
gira davvero - e chi riparte dal master riparte da una versione che non e' mai
stata provata. Qui la prosa tiene i segnaposto e il codice viene letto dai file.

  python3 assembla.py          riscrive MASTER-VIDEOCLIP.md
  python3 assembla.py --check  verifica che sia aggiornato (esce 1 se no)
"""
import re, sys
from pathlib import Path

QUI = Path(__file__).resolve().parent
LINGUA = {".py": "python", ".sh": "bash", ".json": "json", ".md": "markdown",
          ".mjs": "javascript"}

def assembla():
    prosa = (QUI/"master"/"prosa.md").read_text(encoding="utf-8")
    def dentro(m):
        via = Path(m.group(1))
        f = QUI/via
        if not f.exists(): raise SystemExit(f"manca {via}")
        nome = str(via.relative_to("modello"))
        testo = f.read_text(encoding="utf-8").rstrip("\n")
        # un file markdown dentro un recinto markdown vuole un recinto piu' lungo
        recinto = "````" if via.suffix == ".md" else "```"
        return (f"## `{nome}`\n\n{recinto}{LINGUA.get(via.suffix, '')}\n"
                f"{testo}\n{recinto}\n")
    return re.sub(r"@@FILE ([^@]+)@@", dentro, prosa)

if __name__ == "__main__":
    fuori = QUI/"MASTER-VIDEOCLIP.md"
    nuovo = assembla()
    if "--check" in sys.argv:
        vecchio = fuori.read_text(encoding="utf-8") if fuori.exists() else ""
        if vecchio != nuovo:
            raise SystemExit("MASTER-VIDEOCLIP.md non e' aggiornato: python3 assembla.py")
        print("MASTER-VIDEOCLIP.md aggiornato")
    else:
        fuori.write_text(nuovo, encoding="utf-8")
        print(f"MASTER-VIDEOCLIP.md  {len(nuovo.splitlines())} righe  "
              f"{len(nuovo)//1024} KB")
