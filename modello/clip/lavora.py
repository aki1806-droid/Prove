#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 8 del MASTER: dalla clip grezza alla clip finita.

La clip che torna dal generatore dura quello che vuole il modello - otto secondi,
di solito - mentre il blocco dura quanto la voce. Qui si fanno combaciare, e si
mette sopra quello che deve vedersi: marchio e sottotitoli.

Quattro cose, in quest'ordine:

  1. inquadratura   si porta al canvas del formato, 25 fps, senza audio.
     L'audio va tolto qui e non solo al montaggio: molti modelli generano una
     traccia sonora per conto loro, e due voci sovrapposte sono un render buttato.
  2. durata         si porta ESATTAMENTE a quella del blocco. Tre strade, scelte
     dal rapporto fra le due durate, e la scelta finisce nel registro.
  3. marchio        in sovrimpressione, dove dice il profilo.
  4. sottotitoli    impressi con il filtro ass. NON con drawtext: nel build di
     imageio_ffmpeg drawtext non c'e' (manca libfreetype), e il giro fallisce
     con «Unknown filter». Con ass si ha anche una tipografia vera.

  python3 clip/lavora.py          tutte le clip
  python3 clip/lavora.py s07 s12  solo quelle (dopo aver rigenerato una grezza)
"""
import json, re, subprocess, sys
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo
from sottotitoli import spezza, larghezza

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent
FF = imageio_ffmpeg.get_ffmpeg_exe()
GREZZE, FINITE, TMP = QUI/"grezze", QUI/"finite", QUI/"_lavoro"

# Oltre questo rallentamento il movimento si vede a scatti: si passa al
# palindromo. Sotto, rallentare e' invisibile e non ha giunte.
RALLENTA_MAX = 1.25
SCARTO_TOLLERATO = 0.04   # 40 ms: sotto questo, audio e video restano a posto

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    return r.returncode, r.stdout + r.stderr

def durata(f):
    _, o = sh(FF, "-i", f, "-f", "null", "-")
    t = re.findall(r"time=(\d+):(\d+):([\d.]+)", o)
    if not t: raise SystemExit(f"{f}: non e' un video leggibile\n{o[-400:]}")
    t = t[-1]
    return int(t[0])*3600 + int(t[1])*60 + float(t[2])

def ass_colore(hexs, alpha=0):
    """#RRGGBB -> &HAABBGGRR. In ASS l'alfa e' la trasparenza: 00 e' pieno."""
    r, g, b = hexs[1:3], hexs[3:5], hexs[5:7]
    return f"&H{alpha:02X}{b}{g}{r}".upper()

def scrivi_ass(dove, righe, c, p):
    car = p.get("carattere", {})
    corpo = round(min(c["larghezza"], c["altezza"]) / 22)
    testa = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {c["larghezza"]}
PlayResY: {c["altezza"]}
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: S,{car.get("nome","DejaVu Sans")},{corpo},{ass_colore(p["palette"]["fondo"])},{ass_colore(p["palette"]["fondo"])},{ass_colore(p["palette"]["testo"])},{ass_colore(p["palette"]["testo"], 0x59)},-1,0,0,0,100,100,0,0,3,{round(corpo*0.34)},0,2,{round(c["larghezza"]*0.08)},{round(c["larghezza"]*0.08)},{c["base_sottotitoli"]},1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
"""
    def hms(t):
        h = int(t//3600); m = int(t % 3600//60); s = t % 60
        return f"{h:d}:{m:02d}:{s:05.2f}"
    def riga(a, b, t):
        # in ASS l'a-capo e' \N, non il ritorno a capo vero: quello chiude l'evento
        return f'Dialogue: 0,{hms(a)},{hms(b)},S,,0,0,0,,' + t.replace("\n", r"\N") + "\n"
    corpi = "".join(riga(a, b, t) for a, b, t in righe)
    Path(dove).write_text(testa + corpi, encoding="utf-8")

def catena_marchio(p, c):
    m = p.get("marchio") or {}
    f = RADICE/m.get("file", "")
    if not m.get("file") or not f.exists():
        return "", "[v]"      # niente marchio: la catena finisce sui sottotitoli
    alt = m.get("altezza_px", round(c["altezza"]*0.065))
    mar = round(min(c["larghezza"], c["altezza"]) * 0.04)
    dove = {"alto-sinistra":  f"{mar}:{mar}",
            "alto-destra":    f"W-w-{mar}:{mar}",
            "basso-sinistra": f"{mar}:H-h-{mar}",
            "basso-destra":   f"W-w-{mar}:H-h-{mar}"}[m.get("posizione", "alto-sinistra")]
    # Il marchio e' UN fotogramma, e resta uno: `movie=...:loop=0` lo farebbe
    # ciclare all'infinito e l'overlay non finirebbe mai - il giro resta appeso
    # a macinare fotogrammi dopo la fine della clip, senza errori e senza fine
    # (misurato: 90 s e ancora in corso su una clip da 6 s, contro 3,5 s).
    # Un fotogramma solo piu' eof_action=repeat: e' quello che tiene il marchio
    # per tutta la scena, e finisce quando finisce la clip.
    return (f"movie={f},scale=-1:{alt}[mk];"
            f"[v][mk]overlay={dove}:eof_action=repeat[vm]"), "[vm]"

def adatta(idb, base, obiettivo, c):
    """Porta la clip grezza al canvas e ad ALMENO la durata del blocco.

    Almeno, non esatta: il taglio al millesimo si fa nel passo dopo, che
    ricodifica comunque. Qui tagliare con -c copy sposterebbe la fine sul
    pacchetto piu' vicino - misurato: 120 ms di troppo, che al montaggio
    diventano video piu' lungo dell'audio su ogni scena."""
    TMP.mkdir(exist_ok=True)
    d = durata(base)
    quadro = (f"scale={c['larghezza']}:{c['altezza']}:force_original_aspect_ratio=increase,"
              f"crop={c['larghezza']}:{c['altezza']},fps=25,setsar=1")
    fuori = TMP/f"{idb}-adattata.mp4"
    enc = ["-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
           "-pix_fmt", "yuv420p", "-an"]

    if obiettivo <= d + 0.04:
        modo = "taglio"
        rc, o = sh(FF, "-y", "-v", "error", "-i", base, "-vf", quadro, *enc, fuori)
    elif obiettivo <= d * RALLENTA_MAX:
        modo = f"rallenta {obiettivo/d:.2f}x"
        # setpts prima, fps dopo: rallentare a 25 fps gia' fissi lascia i
        # fotogrammi alle vecchie distanze e la durata cade fra due di essi.
        rc, o = sh(FF, "-y", "-v", "error", "-i", base,
                   "-vf", f"{quadro},setpts={obiettivo/d:.5f}*PTS,fps=25", *enc, fuori)
    else:
        # Palindromo: avanti e indietro. La giunta e' invisibile perche' il
        # fotogramma di svolta e' lo stesso; un semplice loop invece stacca,
        # e lo stacco cade a meta' di una frase.
        modo = f"palindromo x{obiettivo/(2*d):.2f}"
        pp = TMP/f"{idb}-pp.mp4"
        rc, o = sh(FF, "-y", "-v", "error", "-i", base, "-filter_complex",
                   f"[0:v]{quadro},split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]",
                   "-map", "[v]", *enc, pp)
        if rc == 0:
            rc, o = sh(FF, "-y", "-v", "error", "-stream_loop", "-1", "-i", pp,
                       "-t", f"{obiettivo + 1:.3f}", "-c", "copy", fuori)
    if rc: raise SystemExit(f"{idb}: {o[-500:]}")
    return fuori, modo, d

def lavora(soli=None):
    p = profilo(); c = CONTI(p); largo = larghezza(c)
    FINITE.mkdir(exist_ok=True); TMP.mkdir(exist_ok=True)
    testi = {x["id"]: x["text"] for x in
             json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))}
    reg = json.loads((RADICE/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
    fatte, peggio = [], (0.0, "")
    for r in reg:
        idb, obiettivo = r["id"], r["durata"]
        if soli and idb not in soli: continue
        base = GREZZE/f"{idb}.mp4"
        if not base.exists():
            print(f"  {idb}  MANCA la clip grezza"); continue

        adattata, modo, d0 = adatta(idb, base, obiettivo, c)
        ass = TMP/f"{idb}.ass"
        scrivi_ass(ass, spezza(testi[idb], obiettivo, largo), c, p)
        pre, tappo = catena_marchio(p, c)
        fuori = FINITE/f"{idb}.mp4"
        # il percorso dell'ass va protetto: due punti e virgole sono separatori
        via = str(ass).replace("\\", "/").replace(":", r"\:").replace("'", r"\'")
        # tpad prima dei sottotitoli: tiene l'ultimo fotogramma per un secondo,
        # cosi' -t trova sempre materiale fino al millesimo chiesto anche quando
        # la clip adattata finisce un fotogramma prima.
        grafo = (f"[0:v]tpad=stop_mode=clone:stop_duration=1,ass='{via}'[v]"
                 + (";" + pre if pre else ""))
        rc, o = sh(FF, "-y", "-v", "error", "-i", adattata, "-filter_complex", grafo,
                   "-map", tappo, "-t", f"{obiettivo:.3f}",
                   "-c:v", "libx264", "-preset", "medium", "-crf", "20",
                   "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", fuori)
        if rc: raise SystemExit(f"{idb}: {o[-500:]}")
        df = durata(fuori); scarto = abs(df - obiettivo)
        if scarto > peggio[0]: peggio = (scarto, idb)
        fatte.append({"id": idb, "base": round(d0, 2), "obiettivo": round(obiettivo, 2),
                      "modo": modo, "finita": round(df, 2), "scarto": round(scarto, 3)})
        print(f'  {idb}  base {d0:5.2f}s → {obiettivo:5.2f}s  [{modo:16s}]  '
              f'uscita {df:5.2f}s  scarto {scarto*1000:4.0f} ms'
              f'{"   <-- FUORI TOLLERANZA" if scarto > SCARTO_TOLLERATO else ""}')

    vecchie = {x["id"]: x for x in json.loads((QUI/"lavorate.json").read_text(encoding="utf-8"))} \
        if (QUI/"lavorate.json").exists() else {}
    vecchie.update({x["id"]: x for x in fatte})
    ordinate = sorted(vecchie.values(), key=lambda x: x["id"])
    (QUI/"lavorate.json").write_text(json.dumps(ordinate, ensure_ascii=False, indent=1),
                                     encoding="utf-8")
    fuori_t = [x for x in ordinate if x["scarto"] > SCARTO_TOLLERATO]
    print(f'\n{len(fatte)} clip lavorate  ·  scarto peggiore {peggio[0]*1000:.0f} ms su {peggio[1]}')
    if fuori_t:
        print("FUORI TOLLERANZA: " + ", ".join(x["id"] for x in fuori_t))

if __name__ == "__main__":
    lavora(set(sys.argv[1:]) or None)
