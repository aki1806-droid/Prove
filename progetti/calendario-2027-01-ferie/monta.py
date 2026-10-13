#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Calendario dei diritti 2027 · Gennaio · Ferie — scene, sottotitoli, montato di prova.

Dopo costruisci.py (le durate e l'audio, in scene.json) e la trascrizione della
voce (audio/parole.json, tempi di ogni parola):

  - ogni scena del pacchetto si porta alla sua durata: la clip si taglia, la
    grafica resta sul fotogramma finale;
  - i sottotitoli si scrivono col TESTO DEL COPIONE (accenti e punteggiatura
    giusti) e i TEMPI DELLA VOCE: le lettere del copione e quelle della
    trascrizione sono la stessa sequenza, quindi ogni battuta prende l'inizio
    della sua prima parola e la fine dell'ultima;
  - una riga sola per battuta: sotto le grafiche (S4 arriva a y=915) restano
    150 px, e due righe coprirebbero il contenuto;
  - i sottotitoli si imprimono nelle scene (Facebook parte muto), e si scrive
    anche sottotitoli.srt per le piattaforme che li vogliono a parte;
  - montato-locale.mp4 e' il montato di prova, da guardare prima di caricare.
"""
import json, re, subprocess, unicodedata
from pathlib import Path
import imageio_ffmpeg

QUI = Path(__file__).resolve().parent
FF = imageio_ffmpeg.get_ffmpeg_exe()
PAC = QUI/"pacchetto"
SC = QUI/"scene"; SC.mkdir(exist_ok=True)
LAV = QUI/"audio"/"scene"
MAX_RIGA = 50                     # caratteri per battuta, una riga
FONTS = "/usr/share/fonts/opentype/inter"

def sh(*a):
    r = subprocess.run([str(x) for x in a], capture_output=True, text=True)
    if r.returncode: raise SystemExit(r.stderr[-2000:])
    return r.stderr

def durata(f):
    h, m, s = re.findall(r"Duration: (\d+):(\d+):([\d.]+)", sh(FF, "-i", f, "-f", "null", "-"))[0]
    return int(h)*3600 + int(m)*60 + float(s)

def lettere(s):
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(c for c in s if c.isalnum() and not unicodedata.combining(c))

def battute(testo):
    """Frasi, poi spezzate a una virgola (o a uno spazio) vicina al mezzo se
    superano una riga; le battute cortissime si uniscono alla seguente."""
    frasi = [f for f in re.split(r"(?<=[.?!:])\s+", testo.strip()) if f]
    out = []
    for f in frasi:
        coda = [f]
        while coda:
            x = coda.pop(0)
            if len(x) <= MAX_RIGA: out.append(x); continue
            tagli = [m.end() for m in re.finditer(r",\s", x)] or [m.end() for m in re.finditer(r"\s", x)]
            k = min(tagli, key=lambda t: abs(t - len(x)/2))
            coda[:0] = [x[:k].strip(), x[k:].strip()]
    unite = []
    for b in out:
        if unite and len(unite[-1]) < 15 and len(unite[-1]) + 1 + len(b) <= MAX_RIGA + 6:
            unite[-1] += " " + b
        else:
            unite.append(b)
    return unite

scene = json.loads((QUI/"scene.json").read_text(encoding="utf-8"))
parole = json.loads((QUI/"audio"/"parole.json").read_text(encoding="utf-8"))

# a quale parola della trascrizione appartiene ogni lettera
proprietario = []
for i, w in enumerate(parole):
    proprietario += [i] * len(lettere(w["text"]))

cue, pos = [], 0
for s in scene:
    if not s["voce"]: continue
    for b in battute(s["voce"]):
        n = len(lettere(b))
        a, z = proprietario[pos], proprietario[pos + n - 1]
        cue.append({"scena": s["id"], "testo": b,
                    "da": parole[a]["start"], "a": parole[z]["end"]})
        pos += n
assert pos == len(proprietario), f"copione {pos} lettere, trascrizione {len(proprietario)}"

# tempi: un attimo prima della prima parola, fino alla battuta dopo o poco oltre la fine
per_scena = {s["id"]: s for s in scene}
for c in cue:                     # prima tutti gli inizi, poi le fini: una fine guarda l'inizio dopo
    c["da"] = max(per_scena[c["scena"]]["inizio"], c["da"] - 0.12)
for i, c in enumerate(cue):
    s = per_scena[c["scena"]]
    fine_scena = s["inizio"] + s["durata"]
    dopo = cue[i+1]["da"] if i + 1 < len(cue) and cue[i+1]["scena"] == c["scena"] else fine_scena
    c["a"] = min(dopo - 0.04, c["a"] + 0.5, fine_scena - 0.05)

def ts(t, sep=","):
    h, r = divmod(t, 3600); m, s = divmod(r, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}".replace(".", sep)

(QUI/"sottotitoli.srt").write_text("".join(
    f"{i}\n{ts(c['da'])} --> {ts(c['a'])}\n{c['testo']}\n\n" for i, c in enumerate(cue, 1)),
    encoding="utf-8")

TESTA = """[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sotto,Inter SemiBold,42,&H00FFFFFF,&H00FFFFFF,&H262B4800,&H262B4800,0,0,0,0,100,100,0,0,3,14,0,2,120,120,52,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
def ass_t(t):
    h, r = divmod(max(t, 0), 3600); m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"

pv = []
for s in scene:
    clip = PAC/s["file"]
    grezza = LAV/f"{s['id']}-v.mp4"
    sh(FF, "-y", "-v", "error", "-i", clip, "-vf",
       f"tpad=stop_mode=clone:stop_duration={max(0, s['durata']-durata(clip))+1},"
       f"trim=duration={s['durata']},setpts=PTS-STARTPTS,fps=25",
       "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", grezza)
    mie = [c for c in cue if c["scena"] == s["id"]]
    fine = SC/f"{s['id']}.mp4"
    if mie:
        ass = LAV/f"{s['id']}.ass"
        ass.write_text(TESTA + "".join(
            f"Dialogue: 0,{ass_t(c['da']-s['inizio'])},{ass_t(c['a']-s['inizio'])},Sotto,,0,0,0,,{c['testo']}\n"
            for c in mie), encoding="utf-8")
        sh(FF, "-y", "-v", "error", "-i", grezza, "-vf", f"ass={ass}:fontsdir={FONTS}",
           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", fine)
    else:
        fine.write_bytes(grezza.read_bytes())
    pv.append(fine)

lista = LAV/"lista.txt"
lista.write_text("".join(f"file '{p}'\n" for p in pv))
sh(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lista, "-i", QUI/"audio"/"mix.wav",
   "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest",
   QUI/"montato-locale.mp4")

for c in cue:
    print(f"  {c['scena']}  {c['da']:6.2f} -> {c['a']:6.2f}  {c['testo']}")
print(f"{len(cue)} battute · montato-locale.mp4 {durata(QUI/'montato-locale.mp4'):.2f} s")
