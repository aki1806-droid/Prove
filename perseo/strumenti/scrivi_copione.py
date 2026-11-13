# Sostituisce BLOCCHI e CAPITOLI in copione/costruisci.py di una lezione.
# uso: python3 strumenti/scrivi_copione.py <cartella lezione> <file .py con BLOCCHI e CAPITOLI>
import sys, re, pathlib
lez, dati = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
ns = {}; exec(dati.read_text(encoding="utf-8"), ns)
righe = []; cap_prec = None
for cap, tema, posa, txt in ns["BLOCCHI"]:
    if cap_prec is not None and cap != cap_prec: righe.append("")
    righe.append(f" ({cap},\"{tema}\",{posa},{txt!r}),")
    cap_prec = cap
p = lez/"copione"/"costruisci.py"; s = p.read_text(encoding="utf-8")
a = s.index("BLOCCHI = ["); b = s.index("ACCENTATE =")
s = s[:a] + "BLOCCHI = [\n" + "\n".join(righe) + "\n]\n\n" + s[b:]
s = re.sub(r"CAPITOLI = \{.*?\}\n", "CAPITOLI = " + repr(ns["CAPITOLI"]) + "\n", s, flags=re.S)
p.write_text(s, encoding="utf-8")
