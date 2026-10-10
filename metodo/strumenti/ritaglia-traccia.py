#!/usr/bin/env python3
"""Rifà i tagli di UNA traccia rigenerata, lasciando l'altra com'è.

uso: ritaglia-traccia.py <cartella-lezione> <A|B> <atempo> [correggi]

Quando si corregge una frase si rigenera solo la traccia che la contiene.
`tagli.py allinea/applica` lavorano sempre su tutte e due e ricalcolano
l'atempo dai due grezzi: con un grezzo solo non partono, e anche potendo
cambierebbero il ritmo dei blocchi che non si toccano. Qui l'atempo è
quello della lezione pubblicata (riga «silenzi ... atempo» del REGISTRO),
così i blocchi nuovi hanno lo stesso passo dei vecchi.

Senza «correggi»: sceglie i confini (stessa DTW di tagli.py), li scrive
in confini-L.json e mostra la tabella. Con «correggi»: applica prima
correzioni.json (solo la traccia L). Poi scrive i blocchi della sola
traccia L in audio/blocchi/ e aggiorna blocchi-audio.json.
"""
import json, sys
from pathlib import Path

D = Path(sys.argv[1]).resolve(); L = sys.argv[2]; A = float(sys.argv[3])
correggi = len(sys.argv) > 4 and sys.argv[4] == "correggi"
sys.path.insert(0, str(D/"audio")); import tagli
QUI = tagli.QUI
tr = QUI/f"grezzo-{L}.mp3"
netto = QUI/"_trim-uno.mp3"
tagli.sh(tagli.FF, "-y", "-v", "error", "-i", tr, "-af", tagli.SILENZI, "-c:a", "libmp3lame", "-b:a", "192k", netto)
tagli._trim = tagli.durata(tr)/tagli.durata(netto); netto.unlink()
tagli._ritmo = (A, tagli.SILENZI + f",atempo={A:.3f}")
print(f"traccia {L}: silenzi x{tagli._trim:.3f}, atempo {A:.3f} (quello della resa pubblicata)")

gA, gB = tagli.blocchi(); gruppo = gA if L == "A" else gB
if correggi:
    corr = json.loads((QUI/"correzioni.json").read_text(encoding="utf-8")).get(L, {})
    st = json.loads(tagli.stato(L).read_text(encoding="utf-8"))
    for k, come in corr.items():
        j = int(k); v = st["confini"][j]; st["confini"][j] = v + float(come["secondi"])
        print(f"  {L}[{j}] {v:.2f} -> {st['confini'][j]:.2f}")
    st["confini"].sort(); tagli.stato(L).write_text(json.dumps(st, indent=1), encoding="utf-8")
    Dg, conf = st["durata"], st["confini"]
else:
    Dg, conf = tagli.scegli(tr, gruppo)
    tagli.stato(L).write_text(json.dumps({"durata": Dg, "confini": conf,
        "ids": [x["id"] for x in gruppo]}, indent=1), encoding="utf-8")
print(f"fuori fascia (stima): {tagli.mostra(L, gruppo, Dg, conf)}")

# applica, solo per questa traccia: stessa logica di tagli.cmd_applica
reg = {r["id"]: r for r in json.loads((QUI/"blocchi-audio.json").read_text(encoding="utf-8"))}
out = QUI/"blocchi"; bordi = [0.0]+conf+[Dg]
for i, x in enumerate(gruppo):
    ini, fin = bordi[i], bordi[i+1]; f = out/f"{x['id']}.mp3"
    tagli.sh(tagli.FF, "-y", "-v", "error", "-ss", f"{ini:.3f}", "-to", f"{fin:.3f}", "-i", tr,
             "-af", tagli._ritmo[1], "-c:a", "libmp3lame", "-b:a", "192k", f)
    d = tagli.durata(f)
    posa = round(max(0.0, 4.6-d), 2) if d < 3.5 else 0.0
    posa = max(posa, float(x.get("posa", 0)))
    if posa:
        tmp = out/f"_{x['id']}.mp3"
        tagli.sh(tagli.FF, "-y", "-v", "error", "-i", f, "-af", f"apad=pad_dur={posa}", "-c:a", "libmp3lame", "-b:a", "192k", tmp)
        tmp.replace(f); d = tagli.durata(f)
    reg[x["id"]] = {"id": x["id"], "traccia": L, "da": round(ini, 3), "a": round(fin, 3), "durata": round(d, 3),
                    "posa": posa, "car": len(x["text"]), "cps": round(len(x["text"])/d, 1)}
ordine = [x["id"] for x in gA+gB]
regl = [reg[i] for i in ordine]
(QUI/"blocchi-audio.json").write_text(json.dumps(regl, indent=1, ensure_ascii=False), encoding="utf-8")
tot = sum(r["durata"] for r in regl); m = tot+13
fuori = [r for r in regl if not 8.5 <= r["cps"] <= 21]
print(f"{len(regl)} blocchi · parlato {tot:.1f} s · montato {int(m//60)}:{m%60:04.1f} · fuori fascia: {[ (r['id'],r['cps']) for r in fuori]}")
