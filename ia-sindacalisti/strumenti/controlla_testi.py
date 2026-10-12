"""Controlla i testi a schermo della scaletta: massimo 6 parole, mai identici al parlato.
uso: python3 controlla_testi.py <cartella corso> <lezione>  -> stampa JSON con gli avvisi"""
import json, re, sys, os, unicodedata
corso, lez = sys.argv[1:3]; mod = "M" + lez.split("_M")[1][:2]
sc = json.load(open(os.path.join(corso, mod, f"{lez}_SCALETTA.json")))
script = open(os.path.join(corso, mod, f"{lez}_SCRIPT.md")).read()
parlato = "\n".join(p.split("\n---")[0] for p in re.split(r"^### B\d+[^\n]*\n", script, flags=re.M)[1:])
def norm(s): return re.sub(r"[^\w ]", "", unicodedata.normalize("NFKC", s).lower().replace("’", "'")).strip()
frasi = {norm(f) for f in re.split(r"[.?!:;]\s*|\n", parlato) if norm(f)}
def testi(sc_):
    for k in ("etichetta", "testo", "sotto", "grande", "numero"):
        if sc_.get(k): yield k, sc_[k]
    for c in sc_.get("celle", []):
        for k in ("n", "t"):
            if c.get(k): yield "cella", c[k]
    for r in (sc_.get("tabella") or {}).get("righe", []):
        for c in r: yield "tabella", c
    for v in sc_.get("voci", []): yield "voce", v
avvisi = []
for s in sc["scene"]:
    if s["tipo"] != "scena": continue
    for k, t in testi(s["scena"]):
        n = len(t.split())
        if n > 6: avvisi.append({"scena": s["id"], "campo": k, "testo": t, "problema": f"{n} parole (massimo 6)"})
        if norm(t) in frasi: avvisi.append({"scena": s["id"], "campo": k, "testo": t, "problema": "identico a una frase del parlato"})
print(json.dumps(avvisi, ensure_ascii=False, indent=1))
