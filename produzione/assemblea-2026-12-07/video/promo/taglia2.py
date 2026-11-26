#!/usr/bin/env python3
"""Taglia la traccia unica (lavoro2/grezzo.mp3) nei blocchi di copione2.json.
Nessun atempo: la voce v4 resta al suo passo, così i tempi delle parole
servono pari pari alle grafiche. Scrive lavoro2/blocchi/*.wav, durate.json
e parole-blocchi.json (tempi locali di ogni parola, per sincronizzare le clip)."""
import json, os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(QUI, "..", "mini"))
from monta import allinea, silenzi, durata, norm  # noqa: E402

LAV = os.path.join(QUI, sys.argv[1] if len(sys.argv) > 1 else "lavoro2")
bl = json.load(open(os.path.join(QUI, sys.argv[2] if len(sys.argv) > 2 else "copione2.json")))
g = os.path.join(LAV, "grezzo.mp3"); tot = durata(g)
dati = json.load(open(os.path.join(LAV, "parole.json")))
tagli = allinea(bl, dati, tot)
sil = silenzi(g, 0.12)
for i in range(1, len(tagli) - 1):
    vic = [((a + b) / 2, b - a) for a, b in sil if abs((a + b) / 2 - tagli[i]) < 0.6]
    if vic:
        tagli[i] = max(vic, key=lambda x: x[1] - abs(x[0] - tagli[i]) * 0.5)[0]
# a mano, dopo aver ascoltato: la risata di b10 comincia a 82,04 s, il taglio va nel silenzio prima
FORZA = {"b10": 81.82} if LAV.endswith("lavoro2") else {}
for i, b in enumerate(bl):
    if b["id"] in FORZA: tagli[i] = FORZA[b["id"]]
parole = [w for w in dati["words"] if w["type"] == "word" and not w["text"].startswith("[") and not w["text"].endswith("]")]
os.makedirs(os.path.join(LAV, "blocchi"), exist_ok=True)
dur, pb = {}, {}
for i, b in enumerate(bl):
    a, z = tagli[i], tagli[i + 1]
    w = os.path.join(LAV, "blocchi", b["id"] + ".wav")
    subprocess.run(["ffmpeg", "-y", "-ss", f"{a:.3f}", "-to", f"{z:.3f}", "-i", g,
                    "-af", "afade=t=in:d=0.02,apad=pad_dur=0.25", "-ar", "48000", "-ac", "2", w],
                   check=True, capture_output=True)
    dur[b["id"]] = durata(w)
    pb[b["id"]] = [{"p": x["text"], "t": round(x["start"] - a, 2), "f": round(x["end"] - a, 2)}
                   for x in parole if a <= x["start"] < z]
    print(f"{b['id']:5} {a:6.2f}-{z:6.2f}  {dur[b['id']]:5.2f} s  «{pb[b['id']][0]['p']} … {pb[b['id']][-1]['p']}»")
json.dump(dur, open(os.path.join(LAV, "durate.json"), "w"), indent=1)
json.dump(pb, open(os.path.join(LAV, "parole-blocchi.json"), "w"), ensure_ascii=False, indent=1)
for L in (60, 90):
    print(L, round(sum(dur[b["id"]] for b in bl if L in b["versioni"]), 1), "s")
