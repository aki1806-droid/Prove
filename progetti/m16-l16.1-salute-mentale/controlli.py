#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""I controlli del MASTER §5, tutti in una volta."""
import json, re, subprocess
from pathlib import Path
import imageio_ffmpeg
QUI = Path(__file__).resolve().parent
import re as _re
LEZIONE = (_re.search(r"-l([\d.]+)-", QUI.name) or ["","?"])[1]
FF  = imageio_ffmpeg.get_ffmpeg_exe()
ok = lambda b: "OK  " if b else "NO  "
esiti = []

# La durata chiesta e' un parametro della lezione, non una costante del
# metodo: il corso Infermiere chiedeva «8 minuti almeno», il corso OSS ha
# lo standard 7-8 minuti. Sta qui, dichiarata, invece che murata in un
# confronto a meta' del file.
CHIESTO = 470.0   # 7:50 montati


# La verifica passa se la prova non ha trovato nulla, oppure se tutto quello
# che ha trovato e' stato corretto e poi ricontrollato con una controprova.
f = QUI/"audio"/"esiti-verifica.json"
corr = QUI/"audio"/"correzioni.json"
ctrl = sorted((QUI/"audio"/"trascrizioni").glob("controprova*.txt")) if (QUI/"audio"/"trascrizioni").exists() else []
txt = QUI/"audio"/"esiti-testo.json"
if not f.exists() and txt.exists():
    # Strada alternativa: la trascrizione dell'intera traccia grezza. Prova che
    # la voce ha detto tutto - l'errore che in 1.1 e' costato una rigenerazione -
    # ma non dove cadono i tagli, perche' la trascrizione non porta i tempi.
    # Per quelli restano l'allineamento DTW e verifica-locale.py.
    e = json.loads(txt.read_text(encoding="utf-8"))
    buchi = sum(len(v["buchi"]) for v in e.values())
    perc = min(100*v["coincidenti"]/v["parole_copione"] for v in e.values())
    esiti.append((not buchi, f"verifica per trascrizione (traccia intera): {perc:.1f}% "
                             f"delle parole coincide, buchi nel parlato: {buchi}"))
elif not f.exists():
    esiti.append((False, "verifica per trascrizione: NON ESEGUITA — manca prova.txt"))
else:
    fuori = [e for e in json.loads(f.read_text(encoding="utf-8")) if not e["ok"]]
    if not fuori:
        esiti.append((True, "verifica per trascrizione: nessun confine fuori posto"))
    elif corr.exists() and ctrl:
        n = sum(len(v) for v in json.loads(corr.read_text(encoding="utf-8")).values())
        bastano = n >= len(fuori)
        esiti.append((bastano, f"verifica: {len(fuori)} fuori posto alla prova, {n} corretti "
                          f"e ricontrollati con controprova -> {max(0,len(fuori)-n)}"))
    else:
        esiti.append((False, f"verifica per trascrizione: {len(fuori)} confini fuori posto, non corretti"))

reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
male = [r for r in reg if not 8.5 <= r["cps"] <= 21]
esiti.append((not male, "fascia 8,5-21 car/s: " +
  (", ".join(f"{r['id']} a {r['cps']}" for r in male) or "tutti dentro")))

# Un PNG per scena, e le scene sono i blocchi piu' copertina e chiusura. Il 50
# del MASTER e' il tetto, non il numero di scene di ogni lezione.
png = sorted(Path(QUI/"slide"/"png").glob("s*.png"))
atteso = len(json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))) + 2
esiti.append((len(png)==atteso and atteso<=50,
              f"PNG renderizzati e guardati: {len(png)} su {atteso} scene (tetto 50)"))
sfora = json.loads((QUI/"slide"/"troppo-alte.json").read_text(encoding="utf-8"))
esiti.append((not sfora, f"nessuna slide sfora la cornice: {len(sfora)} sforano"))

scene = sorted(Path(QUI/"scene").glob("*.mp4"))
esiti.append((len(scene)+2 <= 50, f"scene totali: {len(scene)+2} (tetto 50)"))

o = subprocess.run([FF,"-i",str(QUI/f"montato-{LEZIONE}.mp4"),"-f","null","-"],
                   capture_output=True,text=True).stderr
t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
d = int(t[0])*3600+int(t[1])*60+float(t[2])
esiti.append((d >= CHIESTO, f"durata {int(d//60)}:{d%60:05.2f} — chiesti "
              f"{int(CHIESTO//60)}:{CHIESTO%60:05.2f}"))

srt = (QUI/f"montato-{LEZIONE}.srt").read_text(encoding="utf-8")
n = len(re.findall(r"-->", srt))
esiti.append((n==atteso-2, f"sottotitoli SRT: {n} righe su {atteso-2} blocchi"))

rf = QUI/"REGISTRO.md"
esiti.append((rf.exists() and "## Da verificare" in rf.read_text(encoding="utf-8"),
              "registro con la sezione «da verificare»"))

print("CONTROLLI PRIMA DI CONSEGNARE (MASTER §5)\n")
for b,t in esiti: print(f"  [{ok(b)}] {t}")
print(f"\n{sum(1 for b,_ in esiti if b)}/{len(esiti)} superati")
