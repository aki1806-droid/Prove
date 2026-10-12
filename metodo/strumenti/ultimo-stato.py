#!/usr/bin/env python3
"""Salva in un file l'ultimo risultato di creative_get_flow_run_status preso
dalla trascrizione della sessione, senza ricopiare a mano gli URL firmati.

uso: ultimo-stato.py <trascrizione.jsonl> <uscita.json>

La trascrizione e' ~/.claude/projects/<progetto>/<sessione>.jsonl: contiene
anche i risultati restituiti in linea, che altrimenti restano solo nella chat.
"""
import json, sys
from pathlib import Path

ultimo = None
ids = set()
for riga in open(sys.argv[1], encoding="utf-8"):
    if "creative_get_flow_run_status" not in riga and "tool_result" not in riga:
        continue
    try: d = json.loads(riga)
    except ValueError: continue
    for c in (d.get("message", {}).get("content") or []):
        if not isinstance(c, dict): continue
        if c.get("type") == "tool_use" and c.get("name", "").endswith("creative_get_flow_run_status"):
            ids.add(c["id"])
        if c.get("type") == "tool_result" and c.get("tool_use_id") in ids:
            cont = c.get("content")
            testo = cont if isinstance(cont, str) else "".join(x.get("text", "") for x in cont or [])
            try: ultimo = json.loads(testo)
            except ValueError: pass
assert ultimo, "nessun risultato di creative_get_flow_run_status nella trascrizione"
Path(sys.argv[2]).write_text(json.dumps(ultimo), encoding="utf-8")
print(f"{len(ultimo.get('generations', []))} generazioni, {len(ultimo.get('transcripts', []))} trascrizioni -> {sys.argv[2]}")
