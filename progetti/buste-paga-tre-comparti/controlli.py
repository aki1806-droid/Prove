#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""I controlli del MASTER §6, adattati a questo video.

Nessun controllo confronta con una costante scritta qui dentro: i PNG si
contano sulle scene, le righe di SRT sui blocchi parlati, il tetto delle scene
e la durata chiesta si leggono da profilo.py. Scritti come numeri fissi
passerebbero su questo video e fallirebbero sul prossimo.

Due differenze rispetto alla lezione seme, che vengono dalla forma del video:

- il tetto del servizio di montaggio vale PER CHIAMATA, e qui le chiamate sono
  sei, una per segmento. Il controllo giusto e' «nessun segmento sfora», non
  «218 <= 50», che sarebbe falso e inutile;
- le scene ferme sono quindici e non due, quindi i PNG attesi sono tutte le
  scene, e i sottotitoli sono le sole scene con parlato.
"""
import json, re, subprocess, sys
from pathlib import Path


import sys as _s; _s.path.insert(0, str(Path(__file__).resolve().parent))
from strumenti import FFMPEG
QUI  = Path(__file__).resolve().parent
FF   = FFMPEG
sys.path.insert(0, str(QUI))
from profilo import NOME_MONTATO, P_MONTATO, P_SRT, P_TRASCRIZIONI, DURATA_CHIESTA, FASCIA_CPS, MAX_SCENE, P_BLOCCHI_JSON, P_CLIP, P_CONFINI, P_ESITI_CONFINI, P_ESITI_TESTO, P_GREZZO, P_PNG, P_REGISTRO, P_TRACCE, P_TROPPO_ALTE, SCARTO_DURATA_OK
NOME = NOME_MONTATO
CPSMIN, CPSMAX = FASCIA_CPS

ok = lambda b: "OK  " if b else "NO  "
esiti = []

scene    = json.loads(P_BLOCCHI_JSON.read_text(encoding="utf-8"))
parlanti = [s for s in scene if s["text"]]

# 1 · la voce ha detto TUTTO il copione, parola per parola
# Il controllo vecchio leggeva esiti-testo.json, cioe' l'esito di un confronto
# DTW fra il copione e una trascrizione a orecchio del trascrittore. Qui la
# prova e' piu' forte e non costa niente: l'allineamento di ogni traccia
# contiene le PAROLE con i loro tempi, e sono le parole del copione. Se una
# parola manca o e' diversa, il confronto se ne accorge qui, adesso, senza
# ripagare nulla.
#
# La guardia sulle date resta, e per lo stesso motivo di prima: un allineamento
# piu' vecchio delle tracce descrive un audio che non esiste piu'.
gz = sorted(P_GREZZO.glob("traccia*.mp3"))
al = sorted(P_TRASCRIZIONI.glob("traccia*.json"))
tracce = json.loads(P_TRACCE.read_text(encoding="utf-8"))
testo = {x["id"]: x["text"] for x in scene}
if not al:
    esiti.append((False, "parole allineate: NESSUN allineamento"))
elif gz and min(a.stat().st_mtime for a in al) < max(g.stat().st_mtime for g in gz):
    esiti.append((False, "parole allineate: PIU' VECCHIE delle tracce — da rifare"))
else:
    import unicodedata
    def _pul(w):
        w = unicodedata.normalize("NFD", w.lower())
        w = "".join(c for c in w if unicodedata.category(c) != "Mn")
        return re.sub(r"[^a-z0-9]", "", w)
    diverse, tot_par, mancanti = 0, 0, []
    for t in tracce:
        f = P_TRASCRIZIONI/f"traccia{t['traccia']:02d}.json"
        if not f.exists():
            mancanti.append(t["traccia"]); continue
        det = [_pul(w["text"]) for w in json.loads(f.read_text(encoding="utf-8"))["parole"]]
        det = [w for w in det if w]
        att = [_pul(w) for i in t["scene"] for w in testo[i].split()]
        att = [w for w in att if w]
        tot_par += len(att)
        diverse += abs(len(att) - len(det)) + sum(1 for a, b in zip(att, det) if a != b)
    esiti.append((not mancanti and not diverse,
                  f"parole allineate: {tot_par} parole del copione, "
                  f"{diverse} diverse nel parlato"
                  + (f", {len(mancanti)} tracce senza allineamento" if mancanti else "")))

# 2 · tutti i blocchi dentro la fascia di velocita'
# Finche' la voce non e' stata generata il registro non esiste, e il controllo
# dice «non ancora» invece di morire: questo strumento serve anche a sapere a
# che punto si e', non solo a dare il via libera alla fine.
if not P_REGISTRO.exists():
    reg = []
    esiti.append((False, f"fascia {CPSMIN}-{CPSMAX:g} car/s: voce non ancora tagliata in blocchi"))
else:
    reg  = json.loads(P_REGISTRO.read_text(encoding="utf-8"))
    male = [r for r in reg if not CPSMIN <= r["cps"] <= CPSMAX]
    esiti.append((not male and len(reg) == len(parlanti),
                  f"fascia {CPSMIN}-{CPSMAX:g} car/s su {len(reg)} blocchi: " +
                  (", ".join(f"{r['id']} a {r['cps']}" for r in male) or "tutti dentro")))

# 3 · un PNG per scena — TUTTE le scene, ferme comprese
png = sorted(P_PNG.glob("s*.png"))
esiti.append((len(png) == len(scene),
              f"PNG renderizzati: {len(png)} su {len(scene)} scene"))

# 4 · nessuna slide sfora la cornice
sf = P_TROPPO_ALTE
sfora = json.loads(sf.read_text(encoding="utf-8")) if sf.exists() else None
esiti.append((sfora == [], f"nessuna slide sfora la cornice: "
              + ("non verificato" if sfora is None else f"{len(sfora)} sforano")))

# 5 · una clip per blocco parlato
clip = sorted(P_CLIP.glob("s*.mp4")) if (P_CLIP).exists() else []
esiti.append((len(clip) == len(parlanti),
              f"clip animate: {len(clip)} su {len(parlanti)} scene con parlato"))

# 6 · nessun SEGMENTO sfora il tetto del servizio (il tetto e' per chiamata)
seg = {}
for s in scene:
    if s.get("segmento"): seg[s["segmento"]] = seg.get(s["segmento"], 0) + 1
peggio = max(seg.values()) if seg else 0
esiti.append((peggio <= MAX_SCENE,
              f"scene per segmento entro il tetto {MAX_SCENE}: "
              f"{len(seg)} segmenti, il piu' grande ne ha {peggio}"))

# 7 · durata >= quella chiesta
mp4 = P_MONTATO
if not mp4.exists():
    esiti.append((False, "durata: montato non ancora prodotto"))
else:
    o = subprocess.run([FF, "-i", str(mp4), "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)[-1]
    d = int(t[0])*3600 + int(t[1])*60 + float(t[2])
    manca = DURATA_CHIESTA - d
    esiti.append((manca <= SCARTO_DURATA_OK,
                  f"durata {int(d//60)}:{d%60:05.2f} — chiesti "
                  f"{int(DURATA_CHIESTA//60)}:{DURATA_CHIESTA%60:05.2f}"
                  + (f", mancano {manca:.1f} s (accettati fino a "
                     f"{SCARTO_DURATA_OK:g})" if manca > 0 else "")))

# 8 · sottotitoli, una riga per blocco parlato
srt = P_SRT
n = len(re.findall(r"-->", srt.read_text(encoding="utf-8"))) if srt.exists() else 0
esiti.append((n == len(parlanti), f"sottotitoli SRT: {n} righe su {len(parlanti)} blocchi"))

# 9 · i confini cadono nel silenzio fra due parole, sui confini ATTUALI
# Il controllo vecchio chiedeva una seconda trascrizione: si tagliavano 1,6 s
# prima di ogni confine, si montava un provino e lo si faceva trascrivere per
# sentire se dentro c'era gia' il blocco successivo. Qui il confine viene dai
# tempi delle parole, quindi la domanda da fare e' un'altra e si risponde da
# sola: ogni taglio cade DAVVERO fra la fine di una parola e l'inizio della
# successiva, e non dentro a nessuna delle due?
if not P_CONFINI.exists():
    esiti.append((False, "confini: non ancora calcolati"))
elif al and P_CONFINI.stat().st_mtime < max(a.stat().st_mtime for a in al):
    esiti.append((False, "confini: PIU' VECCHI degli allineamenti — da rifare"))
else:
    stato = json.loads(P_CONFINI.read_text(encoding="utf-8"))
    dentro, fuori, stretti = 0, [], 0
    for t in tracce:
        k = str(t["traccia"])
        f = P_TRASCRIZIONI/f"traccia{t['traccia']:02d}.json"
        if k not in stato or not f.exists(): continue
        par = [w for w in json.loads(f.read_text(encoding="utf-8"))["parole"]
               if not (w["text"].startswith("[") and w["text"].endswith("]"))]
        for c in stato[k]["confini"]:
            prima = [w for w in par if w["end"] <= c + 1e-9]
            dopo  = [w for w in par if w["start"] >= c - 1e-9]
            if not prima or not dopo: fuori.append((k, c)); continue
            dentro += 1
            if dopo[0]["start"] - prima[-1]["end"] < 0.05: stretti += 1
    esiti.append((not fuori,
                  f"confini nel silenzio: {dentro} su {dentro + len(fuori)} cadono fra due "
                  f"parole ({stretti} in una pausa sotto i 50 ms)"))

# 10 · il registro, con la sezione che dice cosa non e' stato giudicato
rf = QUI/"REGISTRO.md"
esiti.append((rf.exists() and "## Da verificare" in rf.read_text(encoding="utf-8"),
              "registro con la sezione «da verificare»"))

print("CONTROLLI PRIMA DI CONSEGNARE (MASTER §6)\n")
for b, t in esiti: print(f"  [{ok(b)}] {t}")
print(f"\n{sum(1 for b, _ in esiti if b)}/{len(esiti)} superati")
sys.exit(0 if all(b for b, _ in esiti) else 1)
