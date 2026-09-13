#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Le due immagini ferme: copertina e chiusura.

Sono le uniche due cose disegnate di tutto il video, e per due immagini non vale
la pena di tenere in piedi un browser: fondo pieno, testo con ass, marchio in
sovrimpressione. Niente node, niente Chromium, niente caratteri incorporati in
base64 - tutta roba che serviva alle slide e con le clip non serve piu'.

  python3 clip/cartelli.py       scrive clip/copertina.png e clip/chiusura.png
"""
import subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent
FF = imageio_ffmpeg.get_ffmpeg_exe()

def ass_colore(hexs, alpha=0):
    r, g, b = hexs[1:3], hexs[3:5], hexs[5:7]
    return f"&H{alpha:02X}{b}{g}{r}".upper()

def cartello(nome, testi, p, c):
    """testi: [(riga, peso, colore, y in frazione d'altezza), ...]"""
    pal = p["palette"]
    car = p.get("carattere", {}).get("nome", "DejaVu Sans")
    stili, righe = [], []
    for i, (t, corpo, colore, y) in enumerate(testi):
        stili.append(
            f"Style: S{i},{car},{round(min(c['larghezza'], c['altezza'])*corpo)},"
            f"{ass_colore(pal[colore])},{ass_colore(pal[colore])},"
            f"{ass_colore(pal['fondo'])},{ass_colore(pal['fondo'])},"
            f"{-1 if corpo > 0.05 else 0},0,0,0,100,100,{round(corpo*40)},0,1,0,0,5,"
            f"{round(c['larghezza']*0.1)},{round(c['larghezza']*0.1)},0,1")
        righe.append(f"Dialogue: 0,0:00:00.00,0:00:10.00,S{i},,0,0,0,,"
                     f"{{\\pos({c['larghezza']//2},{round(c['altezza']*y)})}}"
                     + t.replace("\n", r"\N"))
    ass = QUI/f"_{nome}.ass"
    ass.write_text(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {c['larghezza']}
PlayResY: {c['altezza']}
WrapStyle: 0

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
{chr(10).join(stili)}

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
{chr(10).join(righe)}
""", encoding="utf-8")

    m = p.get("marchio") or {}
    logo = RADICE/m.get("file", "")
    via = str(ass).replace("\\", "/").replace(":", r"\:").replace("'", r"\'")
    grafo = f"[0:v]ass='{via}'[v]"
    tappo = "[v]"
    if m.get("file") and logo.exists():
        alt = m.get("altezza_px", round(c["altezza"]*0.065))
        mar = round(min(c["larghezza"], c["altezza"]) * 0.04)
        dove = {"alto-sinistra":  f"{mar}:{mar}",
                "alto-destra":    f"W-w-{mar}:{mar}",
                "basso-sinistra": f"{mar}:H-h-{mar}",
                "basso-destra":   f"W-w-{mar}:H-h-{mar}"}[m.get("posizione", "alto-sinistra")]
        grafo += f";movie={logo},scale=-1:{alt}[mk];[v][mk]overlay={dove}[vm]"
        tappo = "[vm]"
    fuori = QUI/f"{nome}.png"
    r = subprocess.run([FF, "-y", "-v", "error", "-f", "lavfi", "-i",
        f"color=c={p['palette']['fondo']}:s={c['larghezza']}x{c['altezza']}",
        "-filter_complex", grafo, "-map", tappo, "-frames:v", "1", str(fuori)],
        capture_output=True, text=True)
    if r.returncode: raise SystemExit(r.stderr[-500:])
    ass.unlink()
    print(f"  {fuori.name}  {c['larghezza']}x{c['altezza']}")

if __name__ == "__main__":
    p = profilo(); c = CONTI(p)
    t = p.get("cartelli", {})
    cop, chi = t.get("copertina", {}), t.get("chiusura", {})
    cartello("copertina", [
        (cop.get("sopra", ""),  0.022, "accento",    0.40),
        (cop.get("titolo", p["titolo"]), 0.070, "testo", 0.50),
        (cop.get("sotto", ""),  0.026, "secondario", 0.61),
    ], p, c)
    cartello("chiusura", [
        (chi.get("titolo", ""), 0.048, "testo",      0.46),
        (chi.get("sotto", ""),  0.024, "secondario", 0.57),
    ], p, c)
