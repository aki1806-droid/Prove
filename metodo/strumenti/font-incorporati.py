#!/usr/bin/env python3
"""Ricrea slide/font/font-incorporati.css (Inter + Source Serif 4 in base64).

Il CSS non sta in git (pesa e si rigenera); su una macchina nuova manca e
le slide escono con il carattere di ripiego. Si scaricano i pacchetti
variabili da npm (registry.npmjs.org passa dal proxy) e si incorporano.

uso: font-incorporati.py <cartella-lezione> [<cartella-lezione> ...]
"""
import base64, subprocess, sys, tarfile, tempfile
from pathlib import Path

PACCHETTI = {"@fontsource-variable/inter": "Inter",
             "@fontsource-variable/source-serif-4": "Source Serif 4"}
# latin + latin-ext: l'italiano usa solo latin, ma «ç», «ñ» e le citazioni no
SOTTOINSIEMI = ("latin", "latin-ext")

def css():
    tmp = Path(tempfile.mkdtemp())
    regole = []
    for pkg, famiglia in PACCHETTI.items():
        tgz = subprocess.run(["npm", "pack", "-q", pkg], cwd=tmp, capture_output=True,
                             text=True, check=True).stdout.strip().splitlines()[-1]
        with tarfile.open(tmp/tgz) as t: t.extractall(tmp/pkg.split("/")[1])
        files = tmp/pkg.split("/")[1]/"package"/"files"
        nome = pkg.split("/")[1]
        for stile in ("normal", "italic"):
            for sub in SOTTOINSIEMI:
                f = files/f"{nome}-{sub}-wght-{stile}.woff2"
                if not f.exists(): continue
                b64 = base64.b64encode(f.read_bytes()).decode()
                regole.append(f"@font-face{{font-family:'{famiglia}';font-style:{stile};"
                              f"font-weight:100 900;font-display:block;"
                              f"src:url(data:font/woff2;base64,{b64}) format('woff2')}}")
    return "\n".join(regole)

testo = css()
for d in sys.argv[1:]:
    out = Path(d)/"slide"/"font"; out.mkdir(parents=True, exist_ok=True)
    (out/"font-incorporati.css").write_text(testo, encoding="utf-8")
    print(f"{d}: {len(testo)//1024} KB")
