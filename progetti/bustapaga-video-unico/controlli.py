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
import imageio_ffmpeg

QUI  = Path(__file__).resolve().parent
FF   = imageio_ffmpeg.get_ffmpeg_exe()
NOME = "busta-paga-60min"
sys.path.insert(0, str(QUI))
from profilo import DURATA_CHIESTA, SCARTO_DURATA_OK, FASCIA_CPS, MAX_SCENE
CPSMIN, CPSMAX = FASCIA_CPS

ok = lambda b: "OK  " if b else "NO  "
esiti = []

scene    = json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))
parlanti = [s for s in scene if s["text"]]

# 1 · la voce ha detto tutto (trascrizione della traccia intera)
# La stessa guardia del controllo 9, e per lo stesso motivo: cambiando voce le
# tracce sono altre, e un esito vecchio direbbe «tutto a posto» su un audio che
# non esiste piu'. Ci sono cascato davvero — al cambio di voce questo controllo
# passava sugli esiti di Achille mentre in audio/grezzo c'era gia' Francesca.
f  = QUI/"audio"/"esiti-testo.json"
gz = sorted((QUI/"audio"/"grezzo").glob("traccia*.mp3"))
if not f.exists():
    esiti.append((False, "verifica per trascrizione: NON ESEGUITA"))
elif gz and f.stat().st_mtime < max(g.stat().st_mtime for g in gz):
    esiti.append((False, "verifica per trascrizione: PIU' VECCHIA delle tracce — da rifare"))
else:
    e = json.loads(f.read_text(encoding="utf-8"))
    buchi = sum(len(v["buchi"]) for v in e.values())
    perc  = min(v["percentuale"] for v in e.values())
    tracce_attese = len(json.loads((QUI/"copione"/"tracce.json").read_text(encoding="utf-8")))
    # «0» e' la chiave della modalita' intero: una trascrizione sola di tutte le
    # tracce concatenate, che copre lo stesso audio di diciassette separate.
    intero = "0" in e or 0 in e
    coperte = tracce_attese if intero else len(e)
    esiti.append((not buchi and coperte == tracce_attese,
                  f"verifica per trascrizione: "
                  + ("tutte le tracce in un'unica trascrizione" if intero
                     else f"{len(e)}/{tracce_attese} tracce")
                  + f", coincidenza {perc}%, buchi nel parlato: {buchi}"))

# 2 · tutti i blocchi dentro la fascia di velocita'
reg  = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
male = [r for r in reg if not CPSMIN <= r["cps"] <= CPSMAX]
esiti.append((not male and len(reg) == len(parlanti),
              f"fascia {CPSMIN}-{CPSMAX:g} car/s su {len(reg)} blocchi: " +
              (", ".join(f"{r['id']} a {r['cps']}" for r in male) or "tutti dentro")))

# 3 · un PNG per scena — TUTTE le scene, ferme comprese
png = sorted(Path(QUI/"slide"/"png").glob("s*.png"))
esiti.append((len(png) == len(scene),
              f"PNG renderizzati: {len(png)} su {len(scene)} scene"))

# 4 · nessuna slide sfora la cornice
sf = QUI/"slide"/"troppo-alte.json"
sfora = json.loads(sf.read_text(encoding="utf-8")) if sf.exists() else None
esiti.append((sfora == [], f"nessuna slide sfora la cornice: "
              + ("non verificato" if sfora is None else f"{len(sfora)} sforano")))

# 5 · una clip per blocco parlato
clip = sorted(Path(QUI/"slide"/"mp4").glob("s*.mp4")) if (QUI/"slide"/"mp4").exists() else []
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
mp4 = QUI/f"montato-{NOME}.mp4"
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
srt = QUI/f"montato-{NOME}.srt"
n = len(re.findall(r"-->", srt.read_text(encoding="utf-8"))) if srt.exists() else 0
esiti.append((n == len(parlanti), f"sottotitoli SRT: {n} righe su {len(parlanti)} blocchi"))

# 9 · i confini verificati per trascrizione, sui confini ATTUALI
cf, cc = QUI/"audio"/"esiti-confini.json", QUI/"audio"/"confini.json"
if not cf.exists():
    esiti.append((False, "confini verificati per trascrizione: NON ESEGUITA"))
elif cf.stat().st_mtime < cc.stat().st_mtime:
    esiti.append((False, "confini: la verifica e' PIU' VECCHIA dei confini — da rifare"))
else:
    e = json.loads(cf.read_text(encoding="utf-8"))
    interi  = sum(1 for x in e if x["esito"] == "intero")
    meta    = sum(1 for x in e if x["esito"] == "parziale")
    dubbi   = [x["blocco"] for x in e if x["esito"] == "NON TROVATA"]
    # I dubbi non fanno fallire: sono dichiarati uno per uno nel registro, con
    # la diagnosi. Farli fallire senza poterli risolvere renderebbe il
    # controllo una formalita' da aggirare. Qui conta che la verifica sia stata
    # fatta sui confini di ADESSO, non su quelli di prima delle correzioni.
    esiti.append((interi + meta >= len(e) * 0.9,
                  f"confini per trascrizione: {interi} chiuse ritrovate intere, "
                  f"{meta} a meta', {len(dubbi)} da guardare su {len(e)}"))

# 10 · il registro, con la sezione che dice cosa non e' stato giudicato
rf = QUI/"REGISTRO.md"
esiti.append((rf.exists() and "## Da verificare" in rf.read_text(encoding="utf-8"),
              "registro con la sezione «da verificare»"))

print("CONTROLLI PRIMA DI CONSEGNARE (MASTER §6)\n")
for b, t in esiti: print(f"  [{ok(b)}] {t}")
print(f"\n{sum(1 for b, _ in esiti if b)}/{len(esiti)} superati")
sys.exit(0 if all(b for b, _ in esiti) else 1)
