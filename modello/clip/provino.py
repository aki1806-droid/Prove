#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 5 del MASTER: i provini a contatto delle clip grezze.

Tre fotogrammi per clip - inizio, meta', fine - sei clip per foglio. Serve a
guardarle davvero, ed e' un passo obbligatorio: i difetti che contano non li
prende nessun controllo automatico. Sui provini si vedono in un colpo d'occhio
il testo inventato dentro l'immagine, il volto che guarda in camera, la clip che
a meta' cambia scena da sola, e soprattutto quella che stona con le vicine.

Tre fotogrammi e non uno perche' una clip si giudica sul movimento: il primo
fotogramma di una clip sbagliata e' quasi sempre bello.

  python3 clip/provino.py          fogli da clip/grezze
  python3 clip/provino.py finite   fogli da clip/finite (marchio e sottotitoli)
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent
FF = imageio_ffmpeg.get_ffmpeg_exe()
PER_FOGLIO, COLONNE = 6, 3
LARGO = 480

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    return r.returncode, r.stdout + r.stderr

def durata(f):
    _, o = sh(FF, "-i", f, "-f", "null", "-")
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)
    if not t: return 0.0
    t = t[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

def etichette(dove, nomi, lw, lh, c):
    """I nomi delle clip sul foglio. Senza, un difetto visto non si sa dov'e'."""
    righe = "".join(
        f"Dialogue: 0,0:00:00.00,0:00:10.00,S,,0,0,0,,"
        f"{{\\pos({8},{i*lh + 8})}}{n}\n" for i, n in enumerate(nomi))
    Path(dove).write_text(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {lw*COLONNE}
PlayResY: {lh*len(nomi)}

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,OutlineColour,BackColour,Bold,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: S,DejaVu Sans,{round(lh*0.12)},&H00FFFFFF,&H00000000,&HA0000000,-1,3,3,0,7,0,0,0,1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
{righe}""", encoding="utf-8")

def provini(cartella="grezze"):
    p = profilo(); c = CONTI(p)
    dentro = QUI/cartella
    alto = round(LARGO * c["altezza"] / c["larghezza"] / 2) * 2
    clip = sorted(dentro.glob("s*.mp4"))
    if not clip: raise SystemExit(f"nessuna clip in {dentro}")
    tmp = QUI/"_provini"; tmp.mkdir(exist_ok=True)
    for f in tmp.glob("*"): f.unlink()
    fuori = QUI/"provini"; fuori.mkdir(exist_ok=True)
    for f in fuori.glob(f"{cartella}-*.png"): f.unlink()

    fogli = 0
    for k in range(0, len(clip), PER_FOGLIO):
        lotto = clip[k:k+PER_FOGLIO]
        n = 0
        for f in lotto:
            d = durata(f)
            for q in (0.1, 0.5, 0.9):
                rc, o = sh(FF, "-y", "-v", "error", "-ss", f"{d*q:.2f}", "-i", f,
                           "-frames:v", "1", "-vf", f"scale={LARGO}:{alto}",
                           tmp/f"t{n:03d}.png")
                if rc: raise SystemExit(f"{f.name}: {o[-300:]}")
                n += 1
        # la griglia vuole il conto pieno: le caselle che avanzano restano nere
        while n < len(lotto) * COLONNE:
            sh(FF, "-y", "-v", "error", "-f", "lavfi", "-i",
               f"color=c=black:s={LARGO}x{alto}", "-frames:v", "1", tmp/f"t{n:03d}.png")
            n += 1
        ass = tmp/"etichette.ass"
        etichette(ass, [f.stem for f in lotto], LARGO, alto, c)
        via = str(ass).replace("\\", "/").replace(":", r"\:").replace("'", r"\'")
        foglio = fuori/f"{cartella}-{k//PER_FOGLIO + 1:02d}.png"
        rc, o = sh(FF, "-y", "-v", "error", "-framerate", "1", "-i", tmp/"t%03d.png",
                   "-vf", f"tile={COLONNE}x{len(lotto)},ass='{via}'",
                   "-frames:v", "1", foglio)
        if rc: raise SystemExit(o[-400:])
        for f in tmp.glob("t*.png"): f.unlink()
        fogli += 1
        print(f"  {foglio.name}  {', '.join(f.stem for f in lotto)}")
    print(f"\n{len(clip)} clip in {fogli} fogli — da GUARDARE, uno per uno.")
    print("Si cerca: testo inventato dentro l'immagine, volti in camera, "
          "stacchi interni, clip che stona con le vicine.")

if __name__ == "__main__":
    provini(sys.argv[1] if len(sys.argv) > 1 else "grezze")
