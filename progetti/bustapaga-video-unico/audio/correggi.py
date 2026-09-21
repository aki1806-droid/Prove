#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sposta i confini indicati in proposte-confini.json e riscrive i blocchi tocchi.

Nel MASTER c'e' una trappola dichiarata: `correzioni.json` non e' un registro,
perche' li' le correzioni erano RELATIVE («sposta di una pausa indietro») e
rilanciare lo strumento le applicava una seconda volta. Qui le correzioni sono
tempi ASSOLUTI in secondi: rilanciare questo strumento due volte lascia i
confini esattamente dove sono. E' lo stesso lavoro, scritto in modo che non si
possa sbagliare due volte.
"""
import json, subprocess, re, sys
from pathlib import Path
import imageio_ffmpeg

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent
FF = imageio_ffmpeg.get_ffmpeg_exe()
sys.path.insert(0, str(RADICE))
from profilo import RITMO, FASCIA_CPS
CPSMIN, CPSMAX = FASCIA_CPS

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True); return r.stdout+r.stderr
def durata(f):
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", sh(FF,"-i",str(f),"-f","null","-"))[-1]
    return int(t[0])*3600+int(t[1])*60+float(t[2])

stato    = json.loads((QUI/"confini.json").read_text(encoding="utf-8"))
proposte = json.loads((QUI/"proposte-confini.json").read_text(encoding="utf-8"))
scene    = {s["id"]: s for s in json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))}
reg      = {r["id"]: r for r in json.loads((QUI/"blocchi-audio.json").read_text(encoding="utf-8"))}

da_rifare = []
for k, mappa in proposte.items():
    st = stato[k]
    for idx, nuovo in mappa.items():
        j = int(idx) - 1
        vecchio = st["confini"][j]
        st["confini"][j] = float(nuovo)
        print(f"  traccia {k}: confine {j+1}  {vecchio:.2f} -> {float(nuovo):.2f}s  ({float(nuovo)-vecchio:+.2f})")
        da_rifare += [st["ids"][j], st["ids"][j+1]]
    st["confini"].sort()
(QUI/"confini.json").write_text(json.dumps(stato, indent=1), encoding="utf-8")

print(f"\nblocchi da riscrivere: {len(set(da_rifare))}")
for k, st in stato.items():
    bordi = [0.0] + st["confini"] + [st["durata"]]
    for i, idb in enumerate(st["ids"]):
        if idb not in da_rifare: continue
        ini, fin = bordi[i], bordi[i+1]
        f = QUI/"blocchi"/f"{idb}.mp3"
        sh(FF,"-y","-v","error","-ss",f"{ini:.3f}","-to",f"{fin:.3f}",
           "-i",QUI/"grezzo"/f"traccia{int(k):02d}.mp3","-af",RITMO,
           "-c:a","libmp3lame","-b:a","192k",f)
        d = durata(f); car = len(scene[idb]["text"]); cps = round(car/d,1)
        bad = "" if CPSMIN <= cps <= CPSMAX else "   <-- ancora fuori fascia"
        print(f"   {idb}  {reg[idb]['durata']:5.2f}s -> {d:5.2f}s   {reg[idb]['cps']:5.1f} -> {cps:5.1f} car/s{bad}")
        reg[idb].update({"da":round(ini,3),"a":round(fin,3),"durata":round(d,3),"cps":cps})

ordinati = sorted(reg.values(), key=lambda r: r["id"])
(QUI/"blocchi-audio.json").write_text(json.dumps(ordinati, indent=1, ensure_ascii=False), encoding="utf-8")
tot = sum(r["durata"] for r in ordinati)
fuori = [r for r in ordinati if not CPSMIN <= r["cps"] <= CPSMAX]
print(f"\n{len(ordinati)} blocchi · parlato {tot/60:.2f} min · fuori fascia: {len(fuori)}")
for r in fuori: print(f"   {r['id']}  {r['cps']} car/s")
