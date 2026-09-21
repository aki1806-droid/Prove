#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 3 del MASTER: ritaglia i 203 blocchi dalle 17 tracce continue.

Stesso metodo della lezione seme, adattato a N tracce invece di due: qui non
c'e' uno STACCO solo, c'e' un tracce.json che dice quali scene stanno su quale
traccia. Tutto il resto e' identico, e per gli stessi motivi.

I confini si scelgono sul GREZZO, dove le pause hanno ancora lunghezze diverse:
sulla traccia gia' lavorata silenceremove le ha pareggiate tutte a 0,14 s e la
lunghezza della pausa - il segnale su cui si basa la scelta - sparisce. Il
ritmo si applica dopo, blocco per blocco.

L'allineamento e' DTW fra punteggiatura e spezzoni di parlato: la voce mette le
pause dove il testo ha la punteggiatura. Sulla lavorazione misurata nel MASTER
la strada ingenua (ogni confine alla pausa piu' lunga li' intorno) sbagliava 17
blocchi su 48, il DTW 2.

  tagli.py allinea   sceglie i confini e prepara prova.mp3
  tagli.py applica   scrive i 203 mp3 di blocco

Una differenza di misura rispetto al seme: li' il rapporto grezzo/lavorato era
1,30 e si poteva usare come costante. Qui e' 1,05 in media ma varia da traccia a
traccia (1,009-1,098), quindi la stima della velocita' di un blocco usa il
rapporto REALE della sua traccia, letto da tracce-misurate.json. Con una
costante sbagliata il voto fra le soglie sceglierebbe male.
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg

QUI    = Path(__file__).resolve().parent
RADICE = QUI.parent
FF     = imageio_ffmpeg.get_ffmpeg_exe()
sys.path.insert(0, str(RADICE))
from profilo import FASCIA_CPS, RITMO

CPSMIN, CPSMAX = FASCIA_CPS
SOGLIA = "-45dB"
PROVA_PRIMA, PROVA_GAP = 1.6, 2.5
SOGLIE = (0.18, 0.15, 0.12, 0.22, 0.10)

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    return r.stdout + r.stderr

def durata(f):
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", sh(FF, "-i", str(f), "-f", "null", "-"))[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

def pause_tutte(f):
    """Tutte le pause da 0,10 s in su, in una passata sola.

    silencedetect con d=0.10 le restituisce tutte: quelle da 0,18 sono un
    sottoinsieme di queste, e si ottengono filtrando. Diciassette passate di
    ffmpeg invece di ottantacinque, e gli stessi identici confini.
    """
    o = sh(FF, "-i", str(f), "-af", f"silencedetect=noise={SOGLIA}:d={min(SOGLIE)}", "-f", "null", "-")
    ini = [float(x) for x in re.findall(r"silence_start:\s*(-?[\d.]+)", o)]
    fin = [float(x) for x in re.findall(r"silence_end:\s*([\d.]+)", o)]
    return [(a, b) for a, b in zip(ini, fin) if b > a]

def segmenti(D, P, dmin):
    """Gli spezzoni di parlato fra una pausa e l'altra, alla soglia dmin."""
    segs, t = [], 0.0
    for a, b in [(a, b) for a, b in P if b - a >= dmin]:
        if a > t + 0.05: segs.append((t, a))
        t = b
    if D > t + 0.05: segs.append((t, D))
    return segs

def pezzi_testo(gruppo):
    """Il copione spezzato alla punteggiatura: e' li' che la voce mette le pause."""
    out = []
    for x in gruppo:
        t = re.sub(r"\[[a-z]+\]", "", x["text"]).strip()
        parti = [q for q in re.split(r"(?<=[.:;,])\s+", t) if q.strip()]
        for i, q in enumerate(parti):
            out.append((len(q), x["id"], i == len(parti)-1))
    return out

def allinea_dtw(pezzi, segs, MAXT=5, MAXA=2):
    """Allineamento monotono fra pezzi di testo e spezzoni di audio."""
    n, m = len(pezzi), len(segs)
    car = [p[0] for p in pezzi]
    dur = [b - a for a, b in segs]
    rate = sum(car) / sum(dur)
    INF = float("inf")
    costo = lambda c, d: ((d - c/rate)**2) / (0.35 + d)
    D  = [[INF]*(m+1) for _ in range(n+1)]
    da = [[None]*(m+1) for _ in range(n+1)]
    D[0][0] = 0.0
    for i in range(n+1):
        for j in range(m+1):
            base = D[i][j]
            if base == INF: continue
            for kt in range(1, MAXT+1):
                if i+kt > n: break
                c_t = sum(car[i:i+kt])
                for ka in range(1, MAXA+1):
                    if j+ka > m: break
                    d_a = sum(dur[j:j+ka])
                    c = base + costo(c_t, d_a) + 0.25*(kt-1) + 0.45*(ka-1)
                    if c < D[i+kt][j+ka]: D[i+kt][j+ka], da[i+kt][j+ka] = c, (i, j)
    fine = [None]*n
    i, j = n, m
    while (i, j) != (0, 0):
        pi, pj = da[i][j]
        for k in range(pi, i): fine[k] = j-1
        i, j = pi, pj
    return fine, rate

def confini_con(D, P, gruppo, dmin):
    segs = segmenti(D, P, dmin)
    pezzi = pezzi_testo(gruppo)
    if len(segs) < len(pezzi)*0.35: return None
    if len(segs) < len(gruppo):     return None   # meno spezzoni che blocchi: impossibile
    fine, rate = allinea_dtw(pezzi, segs)
    inizi = [a for a, _ in segs] + [D]
    conf = []
    for k, (_, idb, ultimo) in enumerate(pezzi):
        if not ultimo or k == len(pezzi)-1: continue
        j = fine[k]
        conf.append((segs[j][1] + inizi[j+1]) / 2)      # a meta' della pausa
    return D, sorted(conf), len(pezzi), len(segs), rate

def quanto_male(gruppo, D, conf, rapporto):
    """Quanti blocchi cadono fuori fascia, e quanto e' sparpagliata la velocita'."""
    bordi = [0.0] + list(conf) + [D]
    if len(bordi) != len(gruppo) + 1: return (10**6, 10**6)
    durate = [bordi[i+1] - bordi[i] for i in range(len(gruppo))]
    # Due confini sulla stessa pausa lasciano un blocco di durata zero: e' il
    # caso peggiore possibile, e come tale va pesato.
    if min(durate) < 0.30: return (10**6, 10**6)
    cps = [len(x["text"]) / (d/rapporto) for x, d in zip(gruppo, durate)]
    fuori = sum(not (CPSMIN <= c <= CPSMAX) for c in cps)
    medio = sum(cps) / len(cps)
    sparso = (sum((c-medio)**2 for c in cps) / len(cps))**0.5
    return fuori, sparso

def scegli(traccia, gruppo, rapporto):
    """Si provano TUTTE le soglie e si tiene quella che lascia meno blocchi
    fuori fascia. Fermarsi alla prima che «ha abbastanza spezzoni» guarda la
    quantita' e non l'esito: nel MASTER una soglia cosi' ha mancato per un
    centesimo una pausa vera, e i due blocchi attorno sono usciti uno di 19
    secondi e uno di 8."""
    D = durata(traccia); P = pause_tutte(traccia)
    migliore = None
    for dmin in SOGLIE:
        r = confini_con(D, P, gruppo, dmin)
        if r is None: continue
        _, conf, npezzi, nsegs, rate = r
        voto = quanto_male(gruppo, D, conf, rapporto)
        if migliore is None or voto < migliore[0]:
            migliore = (voto, dmin, D, conf, npezzi, nsegs, rate)
    if migliore is None:
        raise SystemExit(f"{traccia}: nessuna soglia utilizzabile")
    voto, dmin, D, conf, npezzi, nsegs, rate = migliore
    return D, conf, dict(pezzi=npezzi, segs=nsegs, rate=rate, dmin=dmin, fuori=voto[0])

def carica():
    scene  = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    tracce = json.loads((RADICE/"copione"/"tracce.json").read_text(encoding="utf-8"))
    mis    = {m["traccia"]: m for m in json.loads((QUI/"tracce-misurate.json").read_text(encoding="utf-8"))}
    per_id = {s["id"]: s for s in scene}
    return [(t["traccia"], [per_id[i] for i in t["scene"]],
             mis[t["traccia"]]["grezzo"] / mis[t["traccia"]]["lavorata"]) for t in tracce]

def cmd_allinea():
    stato, tutti, fuori_tot = {}, [], 0
    for k, gruppo, rapporto in carica():
        tr = QUI/"grezzo"/f"traccia{k:02d}.mp3"
        D, conf, info = scegli(tr, gruppo, rapporto)
        stato[str(k)] = {"durata": D, "confini": conf, "ids": [x["id"] for x in gruppo]}
        fuori_tot += info["fuori"]
        print(f"  traccia {k:2d}  {len(gruppo):3d} blocchi  {info['pezzi']:3d} pezzi · "
              f"{info['segs']:3d} spezzoni · pausa {info['dmin']} s · "
              f"{info['rate']:5.1f} car/s grezzi · {info['fuori']} fuori fascia")
        bordi = [0.0] + conf + [D]
        tutti += [(k, x["id"], bordi[i]) for i, x in enumerate(gruppo)]
    (QUI/"confini.json").write_text(json.dumps(stato, indent=1), encoding="utf-8")
    print(f"\nblocchi fuori fascia in tutto: {fuori_tot} su 203")
    fai_prova(tutti)

def fai_prova(tutti):
    """1,6 s presi prima di ogni taglio, separati da silenzio: la trascrizione
    li rende come frasi separate, una per confine, e dice se il taglio e' dove
    doveva essere."""
    tmp = QUI/"_prova"; tmp.mkdir(exist_ok=True)
    for p in tmp.glob("*.wav"): p.unlink()
    pezzi, elenco = [], []
    for n, (k, idb, ini) in enumerate(tutti):
        if ini <= 0.01: continue                  # inizio traccia: non e' un confine
        p = tmp/f"p{n:04d}.wav"
        sh(FF, "-y", "-v", "error", "-ss", f"{max(0, ini-PROVA_PRIMA):.3f}",
           "-t", f"{PROVA_PRIMA:.3f}", "-i", QUI/"grezzo"/f"traccia{k:02d}.mp3",
           "-ar", "44100", "-ac", "1", p)
        pezzi.append(p); elenco.append({"n": len(pezzi), "traccia": k, "id": idb, "taglio": round(ini, 3)})
    sil = tmp/"sil.wav"
    sh(FF, "-y", "-v", "error", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", PROVA_GAP, sil)
    lst = tmp/"lista.txt"
    lst.write_text("".join(f"file '{p}'\nfile '{sil}'\n" for p in pezzi), encoding="utf-8")
    sh(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst,
       "-c:a", "libmp3lame", "-b:a", "128k", QUI/"prova.mp3")
    (QUI/"prova.json").write_text(json.dumps(elenco, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"prova.mp3: {len(pezzi)} spezzoni, {durata(QUI/'prova.mp3')/60:.1f} min")

def cmd_applica():
    stato = json.loads((QUI/"confini.json").read_text(encoding="utf-8"))
    out = QUI/"blocchi"; out.mkdir(exist_ok=True)
    reg = []
    for k, gruppo, _ in carica():
        st = stato[str(k)]
        bordi = [0.0] + st["confini"] + [st["durata"]]
        for i, x in enumerate(gruppo):
            ini, fin = bordi[i], bordi[i+1]
            f = out/f"{x['id']}.mp3"
            sh(FF, "-y", "-v", "error", "-ss", f"{ini:.3f}", "-to", f"{fin:.3f}",
               "-i", QUI/"grezzo"/f"traccia{k:02d}.mp3", "-af", RITMO,
               "-c:a", "libmp3lame", "-b:a", "192k", f)
            d = durata(f)
            reg.append({"id": x["id"], "traccia": k, "da": round(ini, 3), "a": round(fin, 3),
                        "durata": round(d, 3), "posa": 0.0, "car": len(x["text"]),
                        "cps": round(len(x["text"])/d, 1)})
        print(f"  traccia {k:2d}  {len(gruppo):3d} blocchi scritti")
    (QUI/"blocchi-audio.json").write_text(json.dumps(reg, indent=1, ensure_ascii=False), encoding="utf-8")
    tot = sum(r["durata"] for r in reg)
    fuori = [r for r in reg if not CPSMIN <= r["cps"] <= CPSMAX]
    corti = [r for r in reg if r["durata"] < 3.5]
    print(f"\n{len(reg)} blocchi · parlato {tot/60:.2f} min · piu' corto {min(r['durata'] for r in reg):.2f}s")
    print(f"fuori fascia: {len(fuori)}   sotto i 3,5 s: {len(corti)}")
    for r in fuori: print(f"   {r['id']}  {r['cps']} car/s  {r['durata']} s")

if __name__ == "__main__":
    {"allinea": cmd_allinea, "applica": cmd_applica}[sys.argv[1]]()
