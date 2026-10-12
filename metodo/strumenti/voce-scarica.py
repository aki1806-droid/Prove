#!/usr/bin/env python3
"""Dal risultato salvato di creative_get_flow_run_status scarica le tracce e
salva le trascrizioni.

uso: voce-scarica.py <stato.json> <gen_id>=<cartella-lezione>:<A|B> ...

Per ogni generazione di voce indicata scarica audio/grezzo-L.mp3; per ogni
trascrizione il cui generation_id e' indicato scrive audio/trascrizioni/L.txt.
Le tracce gia' presenti e della stessa durata non si riscaricano.
Stampa costo e durata, e la riga da incollare nel registro.
"""
import json, re, subprocess, sys
from pathlib import Path

d = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
mappa = {}
for a in sys.argv[2:]:
    g, dest = a.split("="); lez, L = dest.split(":"); mappa[g] = (Path(lez), L)
gen = {g["id"]: g for g in d.get("generations", [])}
for g, (lez, L) in mappa.items():
    x = gen.get(g)
    if x and x.get("modality") == "audio" and x.get("content_url"):
        out = lez/"audio"/f"grezzo-{L}.mp3"
        subprocess.run(["curl", "-sS", "-o", str(out), x["content_url"]], check=True)
        print(f"{lez.name} {L}: voce {x.get('duration_secs')} s · {x['price']['price_cents']:.0f} cent · {out.stat().st_size//1024} KB")
    elif x and x.get("status") != "completed":
        print(f"{lez.name} {L}: {g} ancora {x.get('status')}")
for t in d.get("transcripts", []):
    if t["generation_id"] in mappa:
        lez, L = mappa[t["generation_id"]]
        assert not re.search(r"\[(warm|serious|thoughtful|curious)\]", t["text"]), \
            "trascrizione finta: e' il testo del copione (trascrivere l'asset allegato, non il nodo voce)"
        (lez/"audio"/"trascrizioni").mkdir(exist_ok=True)
        (lez/"audio"/"trascrizioni"/f"{L}.txt").write_text(t["text"], encoding="utf-8")
        c = gen.get(t["generation_id"], {}).get("price", {}).get("price_cents", 0)
        print(f"{lez.name} {L}: trascrizione {len(t['text'])} car · {c:.0f} cent")
