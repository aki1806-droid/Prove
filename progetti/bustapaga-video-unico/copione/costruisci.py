#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Legge lo script del video unico e ne ricava blocchi.json e i chunk per la voce.

Questo copione NON e' stato scritto qui: arriva gia' fatto dall'utente, in
origine/SCRIPT_VIDEO_UNICO.md, e si da' uno standard suo (60 minuti, 218 scene,
voce «Achille nuovo 1» su eleven_multilingual_v2). Il MASTER §1 dice che in quel
caso la durata dichiarata dal copione vince: qui non si riscrive niente, si
estrae. Ogni carattere del parlato e' quello che l'utente ha scritto.

Una scena = un blocco = un mp3 = una clip, come nel resto del metodo.

I chunk per la voce si tagliano a <= MAX_CAR_CHUNK e, dove si puo', su un cambio
di capitolo: lo stacco fra due tracce si sente, e messo su un cambio di capitolo
il cambio di tono e' voluto. Tre capitoli sforano da soli il limite e vanno
spezzati dentro: il taglio cade fra due scene, mai dentro una.
"""
import json, re, sys, pathlib

QUI    = pathlib.Path(__file__).resolve().parent
RADICE = QUI.parent
sys.path.insert(0, str(RADICE))
from profilo import CPS, MAX_CAR_CHUNK, MAX_SCENE, COPERTINA, CHIUSURA, CARD_CAPITOLO

SCRIPT = RADICE/"origine"/"SCRIPT_VIDEO_UNICO.md"

def leggi():
    righe = SCRIPT.read_text(encoding="utf-8").splitlines()
    scene, cap, i = [], 0, 0
    while i < len(righe):
        mc = re.match(r"^## Capitolo (\d+)", righe[i])
        if mc: cap = int(mc.group(1))
        m = re.match(r"^### Scena (\d+) · ([^·]+?)(?: · segmento (\d+))?\s*$", righe[i])
        if m:
            testo, asset, j = "", None, i+1
            while j < len(righe) and not righe[j].startswith(("### ", "## ")):
                if righe[j].startswith("**Asset:**"):
                    a = re.search(r"`([^`]+)`", righe[j]); asset = a.group(1) if a else None
                if righe[j].startswith("> "):
                    testo += (" " if testo else "") + righe[j][2:].strip()
                j += 1
            scene.append({"id": f"s{int(m.group(1)):03d}", "n": int(m.group(1)),
                          "tipo": m.group(2).strip(),
                          "segmento": int(m.group(3)) if m.group(3) else None,
                          "capitolo": cap, "asset": asset, "text": testo})
            i = j; continue
        i += 1
    return scene

def chunk(parlanti):
    """Tracce da <= MAX_CAR_CHUNK caratteri, tagliate su un cambio di capitolo.

    Prima si raggruppa per capitolo, poi i capitoli interi si impacchettano in
    tracce finche' ci stanno: cosi' lo stacco cade sempre su un cambio di
    capitolo, dove il cambio di tono e' voluto. Solo il capitolo che da solo
    sfora il limite si spezza dentro, e il taglio cade fra due scene.
    """
    peso = lambda ss: sum(len(x["text"]) + 2 for x in ss)

    capitoli = []
    for s in parlanti:
        if not capitoli or capitoli[-1][0] != s["capitolo"]:
            capitoli.append((s["capitolo"], []))
        capitoli[-1][1].append(s)

    pezzi = []                       # capitoli, gia' spezzati se troppo lunghi
    for cap, ss in capitoli:
        if peso(ss) <= MAX_CAR_CHUNK:
            pezzi.append(ss); continue
        # quante parti servono, e le si fa il piu' pari possibile
        n = -(-peso(ss) // MAX_CAR_CHUNK)
        mira, cur = peso(ss) / n, []
        for s in ss:
            if cur and peso(cur) + len(s["text"]) + 2 > mira and len(pezzi) + 1 < len(ss):
                if peso(cur) + len(s["text"]) + 2 > MAX_CAR_CHUNK or peso(cur) >= mira:
                    pezzi.append(cur); cur = []
            cur.append(s)
        if cur: pezzi.append(cur)

    tracce = []                      # i pezzi che ci stanno insieme si uniscono
    for pz in pezzi:
        if tracce and peso(tracce[-1]) + peso(pz) <= MAX_CAR_CHUNK:
            tracce[-1].extend(pz)
        else:
            tracce.append(list(pz))
    return tracce

scene = leggi()
parlanti = [s for s in scene if s["text"]]
mute     = [s for s in scene if not s["text"]]
tot = sum(len(s["text"]) for s in parlanti)

errori = []
for g in sorted({s["segmento"] for s in scene if s["segmento"]}):
    n = sum(1 for s in scene if s["segmento"] == g)
    if n > MAX_SCENE: errori.append(f"segmento {g}: {n} scene > {MAX_SCENE}")
for s in parlanti:
    if re.search(r"\d", s["text"]): errori.append(f'{s["id"]}: cifra nel parlato')

tracce = chunk(parlanti)
for k, t in enumerate(tracce, 1):
    c = sum(len(x["text"])+1 for x in t)
    if c > MAX_CAR_CHUNK: errori.append(f"traccia {k}: {c} car > {MAX_CAR_CHUNK}")

parlato = tot/CPS
fermo   = COPERTINA + CHIUSURA + len([s for s in mute if "Card" in s["tipo"]])*CARD_CAPITOLO
durata  = parlato + fermo
print(f"scene      {len(scene)}   parlanti {len(parlanti)}  mute {len(mute)}")
print(f"caratteri  {tot}   media {tot/len(parlanti):.0f} car/scena")
print(f"parlato    {parlato/60:.1f} min   montato {durata/60:.1f} min  (stima a {CPS} car/s)")
print(f"tracce     {len(tracce)}  (limite {MAX_CAR_CHUNK} car per richiesta)\n")

reg = []
for k, t in enumerate(tracce, 1):
    c = sum(len(x["text"])+1 for x in t)
    caps = sorted({x["capitolo"] for x in t})
    intero = all(all(y["capitolo"] != cc or y in t for y in parlanti) for cc in caps)
    print(f"  traccia {k:2d}  {t[0]['id']}-{t[-1]['id']}  {len(t):3d} scene  {c:5d} car  cap {caps}")
    reg.append({"traccia": k, "da": t[0]["id"], "a": t[-1]["id"], "capitoli": caps,
                "scene": [x["id"] for x in t], "caratteri": c})

json.dump(scene, open(QUI/"blocchi.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(reg,   open(QUI/"tracce.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
out = RADICE/"audio"/"chunk"; out.mkdir(parents=True, exist_ok=True)
for k, t in enumerate(tracce, 1):
    (out/f"chunk{k:02d}.txt").write_text("\n\n".join(x["text"] for x in t), encoding="utf-8")

print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
