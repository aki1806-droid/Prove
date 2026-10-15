"""Piano delle inquadrature (pezzi da renderizzare) secondo CLAUDE.md.
uso: python3 piano.py <cartella corso> <lezione, es. IAS_M00_L01>
Legge SCALETTA.json, AGGIUNTE.json (se c'e'), CAMERA.json (se c'e'), le durate in build/<lez>/audio/lavorato
e i file in build/<lez>/media; scrive build/<lez>/piano.json e stampa il riepilogo e gli avvisi."""
import json, os, sys, wave, glob, math
corso, lez = sys.argv[1:3]
mod = "M" + lez.split("_M")[1][:2]
M = os.path.join(corso, mod); B = os.path.join(corso, "build", lez)
def leggi(nome, vuoto):
    f = os.path.join(M, f"{lez}_{nome}.json")
    return json.load(open(f)) if os.path.exists(f) else vuoto
sc = leggi("SCALETTA", None); aggiunte = leggi("AGGIUNTE", {}); camera = leggi("CAMERA", {})
# pausa tra i blocchi: 0,35 s, oppure 0,6 s se la lezione non arriva a 12:00 (CLAUDE.md, §2); la decide LAVORAZIONE.json
PAUSA = leggi("LAVORAZIONE", {}).get("voce", {}).get("pausa_tra_blocchi_s", 0.35)
FPS, CLIP, LENTO = 30, 5.04, 0.8
dur = {os.path.basename(f)[:3]: wave.open(f).getnframes() / wave.open(f).getframerate()
       for f in glob.glob(os.path.join(B, "audio", "lavorato", "B*.wav"))}
media = sorted(f for f in os.listdir(os.path.join(B, "media")) if not f.endswith(".json"))
nome = {os.path.splitext(f)[0]: f for f in media}
fine_anim = json.load(open(os.path.join(B, "fine_animazioni.json"))) if os.path.exists(os.path.join(B, "fine_animazioni.json")) else {}
avvisi = []
# --- inquadrature della scaletta + aggiunte, per blocco
scene = [dict(s) for s in sc["scene"]]
for b, el in aggiunte.items():
    if b.startswith("_"): continue
    el = sorted(el, key=lambda e: 0)
    for e in el:
        e = dict(e, blocco=b, aggiunta=True)
        rif = e.get("dopo") or e.get("prima")
        i = next(i for i, x in enumerate(scene) if x["id"] == rif)
        scene.insert(i + 1 if "dopo" in e else i, e)
for b, ordine in aggiunte.get("_ordine", {}).items():   # riordino dentro il blocco
    pos = [i for i, x in enumerate(scene) if x.get("blocco") == b]
    per_id = {x["id"]: x for x in scene if x.get("blocco") == b}
    for i, sid in zip(pos, ordine): scene[i] = per_id[sid]
for sid, vv in aggiunte.get("_varianti", {}).items():
    next(x for x in scene if x["id"] == sid)["varianti"] = vv
# --- varianti delle clip: quelle riservate dalle aggiunte, le altre divise in ordine tra le inquadrature
riservate = {v for b, el in aggiunte.items() if not b.startswith("_") for e in el for v in e.get("varianti", [])}
riservate |= {v for vv in aggiunte.get("_varianti", {}).values() for v in vv}
uso = {}
for s in scene:
    if s["tipo"] == "clip" and not s.get("varianti"): uso.setdefault(s["asset"], []).append(s["id"])
for a, ids in uso.items():
    pool = [v for v in (a + c for c in "abcdefgh") if v in nome and v not in riservate]
    k = len(ids)
    for j, sid in enumerate(ids):
        s = next(x for x in scene if x["id"] == sid)
        s["varianti"] = pool[j * len(pool) // k:(j + 1) * len(pool) // k] or pool[:1]
def parti_ric(a):   # ricostruzione di una registrazione, eventualmente in piu' parti (Rnn.html, Rnn_2.html...)
    d = os.path.join(M, "ricostruzioni")
    return sorted(glob.glob(os.path.join(d, f"{lez}_{a}.html")) + glob.glob(os.path.join(d, f"{lez}_{a}_*.html")))
def cap(s):
    t = s["tipo"]
    if t == "scena":
        k = s["scena"]["tipo"]
        return 12 if k == "tabella" or s["scena"].get("layout") == "griglia" else 9
    if t == "slide": return 12 if s.get("tabella") else 9   # slide pronte di un pacchetto
    if t == "video": return s.get("durata_video", 19)        # animazione pronta di un pacchetto: scorre una volta
    if t == "immagine": return 18
    if t == "clip": return len(s["varianti"]) * CLIP / LENTO
    if t == "registrazione":
        vera = os.path.exists(os.path.join(corso, "registrazioni", f"{lez}_{s['asset']}.mp4"))
        return 9 if vera else 9 * max(1, len(parti_ric(s["asset"])))
    return 1e9
# --- durate
blocchi = [b for b in dict.fromkeys(s["blocco"] for s in scene) if b.startswith("B")]
t = 3.0; inizio = {}
for b in blocchi: inizio[b] = round(t, 3); t += dur[b] + PAUSA
durata = {}
for b in blocchi:
    ss = [s for s in scene if s.get("blocco") == b]
    base = [s for s in ss if not s.get("aggiunta")]; agg = [s for s in ss if s.get("aggiunta")]
    D = dur[b] + PAUSA; P = sum(s["peso"] for s in base)
    d = {s["id"]: D * s["peso"] / P for s in base}
    for _ in range(10):
        ecc = sum(max(0, d[s["id"]] - cap(s)) for s in base)
        if ecc < 1e-6: break
        for s in base: d[s["id"]] = min(d[s["id"]], cap(s))
        liberi = [s for s in base if d[s["id"]] < cap(s) - 1e-6]
        if not liberi: break
        tot = sum(s["peso"] for s in liberi)
        for s in liberi: d[s["id"]] += ecc * s["peso"] / tot
    resto = D - sum(d.values())
    if agg:
        q = max(resto / len(agg), 2.5)
        for s in agg: d[s["id"]] = q
        manca = q * len(agg) - resto
        if manca > 1e-6:   # le aggiunte hanno il minimo di 2,5 s: lo tolgo all'inquadratura piu' lunga
            big = max(base, key=lambda s: d[s["id"]]); d[big["id"]] -= manca
    elif resto > 0.05:
        avvisi.append(f"{b}: {resto:.1f} s non assorbiti (servono inquadrature aggiunte)")
        big = max(base, key=lambda s: cap(s) - d[s["id"]]); d[big["id"]] += resto
    durata.update(d)
# --- pezzi
def fondo_di(s):
    if s["tipo"] in ("immagine", "clip"): return "immagine"
    if s["tipo"] in ("slide", "video"): return s.get("fondo", "chiaro")
    if s["tipo"] == "registrazione": return "neutro"
    if s["tipo"] == "scena":
        k = s["scena"]["tipo"]
        return {"copertina": "scuro", "memo": "scuro", "errori": "rosso", "chiusura": "scuro"}.get(k) or s["scena"].get("fondo", "chiaro")
    return "svg-" + camera.get(os.path.basename(s["file"]), {}).get("fondo", "chiaro")
GRUPPO = {"chiaro": "chiaro", "neutro": "chiaro", "svg-chiaro": "chiaro", "scuro": "scuro", "rosso": "scuro",
          "svg-scuro": "scuro", "accento": "scuro", "immagine": "immagine"}
pezzi = []; dirs = ["destra", "sinistra", "alto", "centro"]; kb = 0
def pezzo(s, d, **kw):
    pezzi.append(dict(sid=s["id"], blocco=s["blocco"], tipo=s["tipo"], durata=d, fondo=fondo_di(s), **kw))
for s in scene:
    if s["blocco"] == "APERTURA": d = 3.0
    elif s["blocco"] == "CHIUSURA": d = 10.0
    else: d = durata[s["id"]]
    t_ = s["tipo"]
    if t_ == "scena":
        sc_ = dict(s["scena"])
        pezzo(s, d, scena=sc_)
    elif t_ == "registrazione":
        f = os.path.join(corso, "registrazioni", f"{lez}_{s['asset']}.mp4")
        R = parti_ric(s["asset"])
        if os.path.exists(f): pezzo(s, d, registrazione=f)
        elif R:   # ricostruzione animata, finche' manca la registrazione vera
            avvisi.append(f"{s['id']}: registrazione {s['asset']} sostituita dalla ricostruzione")
            n = min(len(R), max(1, math.ceil(d / 9 - 1e-9)))
            for j in range(n): pezzo(s, d / n, tipo_render="pagina", pagina=os.path.relpath(R[j], corso), ricostruzione=True)
        else:
            avvisi.append(f"{s['id']}: manca la registrazione {s['asset']}, uso un segnaposto")
            pezzo(s, d, tipo_render="scena", scena={"tipo": "testo", "layout": "centrata", "fondo": "neutro", "livello": 1,
                  "etichetta": "Segnaposto", "testo": f"Registrazione {s['asset']}", "sotto": "da registrare: vedi PROMPT-VISIVI"})
    elif t_ in ("slide", "video"):
        pezzo(s, d, file=nome[s["asset"]], tabella=bool(s.get("tabella")))
    elif t_ == "immagine":
        n = max(1, math.ceil(d / 9 - 1e-9))
        for j in range(n):
            pezzo(s, d / n, file=nome[s["asset"]], inquadratura=["largo", "dettaglio", "dettaglio2"][j], direzione=dirs[kb % 4]); kb += 1
    elif t_ == "clip":
        V = [v for v in s["varianti"] if v in nome]
        if not V: avvisi.append(f"{s['id']}: nessuna variante scaricata di {s['asset']}"); continue
        n = min(len(V), max(1, math.ceil(d / CLIP - 1e-9)))
        for j in range(n):
            q = d / n; v = min(1.0, CLIP / q)
            if v < LENTO - 1e-6: avvisi.append(f"{s['id']}: clip rallentata a {v:.2f}")
            pezzo(s, q, file=nome[V[j]], velocita=round(v, 4), ritaglio=aggiunte.get("_ritaglio", {}).get(V[j]))
    elif t_ == "animazione_svg":
        f = os.path.basename(s["file"]); cam = camera.get(f, {})
        piano = cam.get(s["id"]) or ("statica" if s.get("statica") else None)
        pezzo(s, d, pagina=f.replace(".svg", ".html"), camera=piano, inquadratura=s.get("inquadratura"),
              dettaglio=cam.get("dettaglio", [960, 540]), fine_anim=fine_anim.get(f.replace(".svg", ".html"), 10000))
# tendina sul primo pezzo dell'inquadratura marcata
for s in scene:
    if s.get("transizione") == "tendina":
        p = next(p for p in pezzi if p["sid"] == s["id"]); p["ingresso"] = "tendina"; p["livello"] = (s.get("scena") or {}).get("livello", sc.get("livello", 1))
# fotogrammi senza deriva; k = numero del pezzo dentro la sua inquadratura
cont = {}
for p in pezzi: p["k"] = cont.get(p["sid"], 0); cont[p["sid"]] = p["k"] + 1
t = 0.0
for i, p in enumerate(pezzi):
    p["n"] = i; p["da"] = round(t * FPS); t += p["durata"]; p["a"] = round(t * FPS)
    if i and "ingresso" not in p:
        p["ingresso"] = "dissolvenza" if GRUPPO[p["fondo"]] != GRUPPO[pezzi[i - 1]["fondo"]] else "taglio"
pezzi[0].setdefault("ingresso", "taglio")
# controlli del ritmo
for p in pezzi:
    sec = (p["a"] - p["da"]) / FPS
    lim = 12 if p.get("scena", {}).get("tipo") == "tabella" or p.get("scena", {}).get("layout") == "griglia" or p.get("tabella") else 9
    if p["tipo"] in ("animazione_svg", "video"): lim = 1e9
    if p["blocco"] in ("APERTURA", "CHIUSURA"): lim = 10
    if sec > lim + 0.02: avvisi.append(f"{p['sid']}: {sec:.1f} s oltre il limite di {lim} s")
    if sec < 2.5 - 0.02: avvisi.append(f"{p['sid']}: {sec:.1f} s sotto il minimo di 2,5 s")
fila = 1
for i in range(1, len(pezzi)):
    # la regola riguarda i fondi grafici: la correzione prevista (inserire un'immagine o una clip) non si applica alle immagini
    # ne' alle registrazioni (o alle loro ricostruzioni), che sono riprese dello schermo e non scene grafiche
    grafico = lambda p: p["fondo"] != "immagine" and p["tipo"] != "registrazione"
    fila = fila + 1 if pezzi[i]["fondo"] == pezzi[i - 1]["fondo"] and grafico(pezzi[i]) and grafico(pezzi[i - 1]) else 1
    if fila > 3: avvisi.append(f"{pezzi[i]['sid']}: piu' di tre inquadrature di fila con fondo {pezzi[i]['fondo']}")
tendine = sum(p.get("ingresso") == "tendina" for p in pezzi)
if tendine > 3: avvisi.append(f"{tendine} tendine (massimo 3)")
json.dump(dict(fps=FPS, durata=t, inizio=inizio, pausa=PAUSA, pezzi=pezzi, avvisi=avvisi),
          open(os.path.join(B, "piano.json"), "w"), ensure_ascii=False, indent=1)
for p in pezzi:
    c = p.get("file") or p.get("pagina") or (p.get("scena") or {}).get("tipo", "")
    print(f'{p["n"]:3} {p["sid"]:6} {p["blocco"]:9} {p["tipo"][:5]:5} {(p["a"]-p["da"])/FPS:5.1f}s {p["fondo"]:10} {p["ingresso"][:5]:5} {c} {p.get("inquadratura") or ""} {p.get("velocita","")}')
print("totale", round(t, 2), "pezzi", len(pezzi))
for a in avvisi: print("AVVISO", a)
