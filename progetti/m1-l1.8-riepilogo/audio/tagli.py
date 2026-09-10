#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 3 del MASTER: ritaglia i blocchi dalle due tracce continue.

I confini si scelgono sul GREZZO, dove le pause hanno ancora lunghezze diverse:
sulla traccia gia' lavorata silenceremove le ha pareggiate tutte a 0,14 s e
la lunghezza della pausa - il segnale su cui si basa la scelta - sparisce.
Il ritmo (silenzi + 1,12x) si applica dopo, blocco per blocco.

  tagli.py allinea   sceglie i confini e prepara prova.mp3
  tagli.py correggi  sposta i confini indicati in correzioni.json
  tagli.py applica   scrive i blocchi + le pose
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg

QUI    = Path(__file__).resolve().parent
RADICE = QUI.parent
FF     = imageio_ffmpeg.get_ffmpeg_exe()
STACCO = "s28"
SOGLIA = "-45dB"
RITMO = ("silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:"
         "stop_periods=-1:stop_silence=0.14:stop_threshold=-45dB:detection=peak,"
         "aresample=44100,atempo=1.12")
PROVA_PRIMA, PROVA_GAP = 1.6, 2.5

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    return r.stdout + r.stderr

def durata(f):
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", sh(FF,"-i",f,"-f","null","-"))[-1]
    return int(t[0])*3600+int(t[1])*60+float(t[2])

def pause(f, dmin):
    o = sh(FF,"-i",f,"-af",f"silencedetect=noise={SOGLIA}:d={dmin}","-f","null","-")
    ini = [float(x) for x in re.findall(r"silence_start:\s*(-?[\d.]+)", o)]
    fin = [float(x) for x in re.findall(r"silence_end:\s*([\d.]+)", o)]
    return [(a,b) for a,b in zip(ini,fin) if b>a]

def blocchi():
    b = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    i = [x["id"] for x in b].index(STACCO)
    return b[:i+1], b[i+1:]

# ------------------------------------------------------------------ allineamento
def segmenti(traccia, dmin):
    """Gli spezzoni di parlato fra una pausa e l'altra."""
    D = durata(traccia); P = pause(traccia, dmin)
    segs, t = [], 0.0
    for a,b in P:
        if a > t + 0.05: segs.append((t, a))
        t = b
    if D > t + 0.05: segs.append((t, D))
    return D, segs, P

def pezzi_testo(gruppo):
    """Il copione spezzato alla punteggiatura: e' li' che la voce mette le pause.
    Restituisce (caratteri, id del blocco, e' l'ultimo pezzo del blocco)."""
    out = []
    for x in gruppo:
        t = re.sub(r"\[[a-z]+\]", "", x["text"]).strip()
        parti = [q for q in re.split(r"(?<=[.:;,])\s+", t) if q.strip()]
        for i,q in enumerate(parti):
            out.append((len(q), x["id"], i == len(parti)-1))
    return out

def allinea_dtw(pezzi, segs, MAXT=5, MAXA=2):
    """Allineamento monotono fra pezzi di testo e spezzoni di audio.
    Un solo spezzone puo' contenere fino a MAXT pezzi (la voce non fa pausa a
    ogni virgola); un pezzo puo' stendersi su MAXA spezzoni."""
    n, m = len(pezzi), len(segs)
    car = [p[0] for p in pezzi]
    dur = [b-a for a,b in segs]
    rate = sum(car)/sum(dur)
    INF = float("inf")
    costo = lambda c,d: ((d - c/rate)**2)/(0.35 + d)
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
                    if c < D[i+kt][j+ka]: D[i+kt][j+ka], da[i+kt][j+ka] = c, (i,j)
    fine = [None]*n
    i, j = n, m
    while (i,j) != (0,0):
        pi, pj = da[i][j]
        for k in range(pi, i): fine[k] = j-1
        i, j = pi, pj
    return fine, rate

def confini_con(traccia, gruppo, dmin):
    """Prova una soglia di pausa e restituisce i confini che ne escono."""
    D, segs, P = segmenti(traccia, dmin)
    pezzi = pezzi_testo(gruppo)
    if len(segs) < len(pezzi)*0.35: return None
    fine, rate = allinea_dtw(pezzi, segs)
    inizi = [a for a,_ in segs] + [D]
    conf = []
    for k,(_,idb,ultimo) in enumerate(pezzi):
        if not ultimo or k == len(pezzi)-1: continue
        j = fine[k]
        conf.append((segs[j][1] + inizi[j+1]) / 2)      # a meta' della pausa
    return D, sorted(conf), len(pezzi), len(segs), rate

def quanto_male(gruppo, D, conf):
    """Quanti blocchi cadono fuori fascia, e quanto e' sparpagliata la velocita'.
    E' il metro con cui si sceglie fra le soglie: un solo confine sbagliato fa
    uscire un blocco lunghissimo accanto a uno cortissimo, e si vede da qui."""
    bordi = [0.0]+list(conf)+[D]
    durate = [bordi[i+1]-bordi[i] for i in range(len(gruppo))]
    # Una soglia sbagliata puo' mettere due confini sulla stessa pausa e lasciare
    # un blocco di durata zero. Non e' un caso da far esplodere: e' il caso
    # peggiore possibile, e come tale va pesato.
    if min(durate) < 0.30: return (10**6, 10**6)
    cps = [len(x["text"])/(d/1.30) for x,d in zip(gruppo, durate)]
    fuori = sum(not (8.5 <= c <= 21) for c in cps)
    medio = sum(cps)/len(cps)
    sparso = (sum((c-medio)**2 for c in cps)/len(cps))**0.5
    return fuori, sparso

def scegli(traccia, gruppo):
    """Confini = fine dello spezzone su cui cade l'ultimo pezzo di ogni blocco.

    La soglia di pausa non si sceglie al primo tentativo che «ha abbastanza
    spezzoni»: quel criterio guarda la quantita' e non l'esito. Su 1.5 la
    soglia di 0,18 s ha mancato per un centesimo una pausa vera, e i due
    blocchi attorno sono usciti uno di 19 secondi e uno di 8. Si provano
    tutte le soglie e si tiene quella che lascia meno blocchi fuori fascia."""
    migliore = None
    for dmin in (0.18, 0.15, 0.12, 0.22, 0.10):
        r = confini_con(traccia, gruppo, dmin)
        if r is None: continue
        D, conf, npezzi, nsegs, rate = r
        voto = quanto_male(gruppo, D, conf)
        if migliore is None or voto < migliore[0]:
            migliore = (voto, dmin, D, conf, npezzi, nsegs, rate)
    voto, dmin, D, conf, npezzi, nsegs, rate = migliore
    print(f"  [{npezzi} pezzi di testo · {nsegs} spezzoni di audio · "
          f"{rate:.1f} car/s grezzi · pausa minima {dmin} s · "
          f"{voto[0]} fuori fascia]")
    return D, conf

def stato(L): return QUI/f"confini-{L}.json"

def mostra(L, gruppo, D, conf):
    bordi = [0.0]+conf+[D]
    print(f"\ntraccia {L}  {D:.2f} s grezzi  ·  {len(gruppo)} blocchi")
    fuori = 0
    for i,x in enumerate(gruppo):
        d = bordi[i+1]-bordi[i]
        cps = len(x["text"])/(d/1.30)          # stima: il ritmo accorcia di ~30%
        bad = not (8.5 <= cps <= 21); fuori += bad
        print(f"  {x['id']}  {bordi[i]:7.2f} -> {bordi[i+1]:7.2f}  {d:5.2f}s grezzi  "
              f"~{cps:5.1f} car/s{'   <-- FUORI FASCIA' if bad else ''}")
    return fuori

def cmd_allinea():
    A,B = blocchi(); tutti = []; fuori = 0
    for L,gruppo in (("A",A),("B",B)):
        tr = QUI/f"grezzo-{L}.mp3"
        D, conf = scegli(tr, gruppo)
        stato(L).write_text(json.dumps({"durata":D,"confini":conf,
            "ids":[x["id"] for x in gruppo]}, indent=1), encoding="utf-8")
        fuori += mostra(L, gruppo, D, conf)
        bordi=[0.0]+conf+[D]
        tutti += [(L,x["id"],bordi[i]) for i,x in enumerate(gruppo)]
    print(f"\nfuori fascia: {fuori}")
    fai_prova(tutti)

def fai_prova(tutti):
    tmp = QUI/"_prova"; tmp.mkdir(exist_ok=True)
    for p in tmp.glob("*.wav"): p.unlink()
    pezzi, elenco = [], []
    for k,(L,idb,ini) in enumerate(tutti):
        if ini <= 0.01: continue                  # inizio traccia: non e' un confine
        p = tmp/f"p{k:03d}.wav"
        sh(FF,"-y","-v","error","-ss",f"{max(0,ini-PROVA_PRIMA):.3f}","-t",f"{PROVA_PRIMA:.3f}",
           "-i",QUI/f"grezzo-{L}.mp3","-ar","44100","-ac","1",p)
        pezzi.append(p); elenco.append({"n":len(pezzi),"traccia":L,"id":idb,"taglio":round(ini,3)})
    sil = tmp/"sil.wav"
    sh(FF,"-y","-v","error","-f","lavfi","-i","anullsrc=r=44100:cl=mono","-t",PROVA_GAP,sil)
    lst = tmp/"lista.txt"
    lst.write_text("".join(f"file '{p}'\nfile '{sil}'\n" for p in pezzi), encoding="utf-8")
    sh(FF,"-y","-v","error","-f","concat","-safe","0","-i",lst,
       "-c:a","libmp3lame","-b:a","128k",QUI/"prova.mp3")
    (QUI/"prova.json").write_text(json.dumps(elenco,indent=1,ensure_ascii=False),encoding="utf-8")
    print(f"prova.mp3: {len(pezzi)} spezzoni, {durata(QUI/'prova.mp3'):.1f} s "
          f"— 1,6 s prima di ogni taglio, separati da {PROVA_GAP} s di silenzio")

def cmd_correggi():
    """correzioni.json: {"B": {"18": {"pause": -1}, "19": {"secondi": -0.4}}}
    "pause" sposta il confine di N pause (indietro se negativo); "secondi" a mano."""
    corr = json.loads((QUI/"correzioni.json").read_text(encoding="utf-8"))
    A,B = blocchi(); gruppi = {"A":A,"B":B}
    for L, mappa in corr.items():
        st = json.loads(stato(L).read_text(encoding="utf-8"))
        _, segs, _ = segmenti(QUI/f"grezzo-{L}.mp3", 0.18)
        varchi = [(segs[k][1]+segs[k+1][0])/2 for k in range(len(segs)-1)]   # meta' di ogni pausa
        for k, come in mappa.items():
            j = int(k); vecchio = st["confini"][j]
            if "pause" in come:
                n = come["pause"]
                vicino = min(range(len(varchi)), key=lambda i: abs(varchi[i]-vecchio))
                nuovo = varchi[max(0, min(len(varchi)-1, vicino+n))]
            else:
                nuovo = vecchio + float(come["secondi"])
            st["confini"][j] = nuovo
            print(f"  {L}[{j}]  {vecchio:.2f} -> {nuovo:.2f}  ({nuovo-vecchio:+.2f} s)")
        st["confini"].sort()
        stato(L).write_text(json.dumps(st,indent=1),encoding="utf-8")
    tutti = []
    for L,gruppo in (("A",A),("B",B)):
        st = json.loads(stato(L).read_text(encoding="utf-8"))
        bordi = [0.0]+st["confini"]+[st["durata"]]
        mostra(L, gruppo, st["durata"], st["confini"])
        tutti += [(L,x["id"],bordi[i]) for i,x in enumerate(gruppo)]
    fai_prova(tutti)

def cmd_applica():
    A,B = blocchi()
    out = QUI/"blocchi"; out.mkdir(exist_ok=True)
    reg = []
    for L,gruppo in (("A",A),("B",B)):
        st = json.loads(stato(L).read_text(encoding="utf-8"))
        bordi = [0.0]+st["confini"]+[st["durata"]]
        for i,x in enumerate(gruppo):
            ini,fin = bordi[i],bordi[i+1]
            f = out/f"{x['id']}.mp3"
            sh(FF,"-y","-v","error","-ss",f"{ini:.3f}","-to",f"{fin:.3f}",
               "-i",QUI/f"grezzo-{L}.mp3","-af",RITMO,"-c:a","libmp3lame","-b:a","192k",f)
            d = durata(f)
            # §1.4: i blocchi corti si allungano perche' respirino. In piu', il
            # copione puo' chiedere una posa esplicita dove il discorso la vuole.
            posa = round(max(0.0, 4.6-d),2) if d < 3.5 else 0.0
            posa = max(posa, float(x.get("posa", 0)))
            if posa:
                sh(FF,"-y","-v","error","-i",f,"-af",f"apad=pad_dur={posa}",
                   "-c:a","libmp3lame","-b:a","192k",out/f"_{x['id']}.mp3")
                (out/f"_{x['id']}.mp3").replace(f); d = durata(f)
            reg.append({"id":x["id"],"traccia":L,"da":round(ini,3),"a":round(fin,3),
                        "durata":round(d,3),"posa":posa,"car":len(x["text"]),
                        "cps":round(len(x["text"])/d,1)})
    (QUI/"blocchi-audio.json").write_text(json.dumps(reg,indent=1,ensure_ascii=False),encoding="utf-8")
    tot = sum(r["durata"] for r in reg); m = tot+13
    fuori = [r for r in reg if not 8.5<=r["cps"]<=21]
    print(f"{len(reg)} blocchi  ·  parlato {tot:.1f} s  ·  montato {int(m//60)}:{m%60:04.1f}")
    print(f"pose: {sum(1 for r in reg if r['posa'])}   fuori fascia: {len(fuori)}")
    for r in fuori: print(f"   {r['id']}  {r['cps']} car/s  {r['durata']} s")

if __name__ == "__main__":
    {"allinea":cmd_allinea,"correggi":cmd_correggi,"applica":cmd_applica}[sys.argv[1]]()
