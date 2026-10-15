#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Febbraio · Permessi e festivita' soppresse — scene, sottotitoli, audio, montato.

Dopo voce.py (audio/voce/*.wav e voce.json):

  1. le durate: ogni scena dura quanto la sua voce piu' attacco e coda, e mai
     meno dell'animazione del pacchetto;
  2. le scene del pacchetto si allungano sul fotogramma finale. S3 («Vero o
     falso») si RIMETTE A TEMPO: i due timbri FALSO e il cambio di
     affermazione cadono sulle parole della voce, con un fermo immagine o un
     taglio su un fotogramma fermo subito prima di ogni evento;
  3. S0, S1, S5 si rifanno sulle clip di Marco (Higgsfield): la clip sotto, i
     testi del pacchetto sopra, ridisegnati con gli stessi caratteri
     (Playfair Display, Montserrat) e gli stessi colori, spostati dove non
     coprono il volto. In S0 il titolo compare parola per parola sulla voce;
  4. i sottotitoli, impressi: testo del copione, tempi delle parole di HeyGen.
     Niente sottotitoli dove lo schermo scrive gia' le stesse parole (S0, le
     prime due frasi di S7);
  5. l'audio: voce, musica (la stessa del mese di gennaio, allungata con un
     secondo passaggio in dissolvenza perche' finisca con la sua chiusura
     sull'ultimo fotogramma), sidechain, -16 LUFS con un guadagno solo;
  6. le scene finali (scene/*.mp4), una traccia per scena, il montato di prova.
"""
import json, re, subprocess
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

QUI = Path(__file__).resolve().parent
FF = imageio_ffmpeg.get_ffmpeg_exe()
PAC = QUI/"pacchetto"
LAV = QUI/"audio"/"lavoro"; LAV.mkdir(parents=True, exist_ok=True)
SC = QUI/"scene"; SC.mkdir(exist_ok=True)
W, H, FPS, SR = 1920, 1080, 25, 48000

# --- colori campionati dal pacchetto
ROSSO, VERDE_SCURO, VERDE, MENTA, BIANCO_CALDO, GRIGIO_SCURO = \
    (210, 10, 46), (14, 72, 48), (9, 100, 62), (161, 214, 182), (245, 243, 244), (38, 40, 37)

ATTACCO = {"S0": 0.7, "S1": 0.6}           # quanto dopo l'inizio della scena parte la voce
CODA = {"S7": 2.5}                          # la chiusura resta sul logo e sulla musica
MINIMO = {"S0": 5.0, "S1": 8.9, "S2": 8.6, "S4": 14.28, "S5": 10.28, "S6": 9.6, "S7": 9.0}

def sh(*a, entrata=None):
    r = subprocess.run([str(x) for x in a], capture_output=True, input=entrata)
    if r.returncode: raise SystemExit(r.stderr.decode()[-2500:])
    return r.stderr.decode()

def durata(f):
    h, m, s = re.findall(r"Duration: (\d+):(\d+):([\d.]+)", sh(FF, "-i", f, "-f", "null", "-"))[0]
    return int(h)*3600 + int(m)*60 + float(s)

tl = {s["id"]: s for s in json.loads((PAC/"timeline.json").read_text(encoding="utf-8"))["scene"]}
voce = {v["id"]: v for v in json.loads((QUI/"audio"/"voce"/"voce.json").read_text(encoding="utf-8"))}
IDS = list(tl)

# ------------------------------------------------------------------ 1. durate
scene = []
t = 0.0
for i in IDS:
    att = ATTACCO.get(i, 0.5)
    d = max(MINIMO.get(i, 0), att + voce[i]["durata"] + CODA.get(i, 0.9))
    d = round(d * FPS) / FPS                 # fotogrammi interi: video e audio non scivolano
    scene.append({"id": i, "inizio": round(t, 3), "durata": d, "attacco": att})
    t += d
T = round(t, 2)
per = {s["id"]: s for s in scene}

def parola(i, inizio_con):
    """Il tempo nella scena della prima parola che comincia con inizio_con."""
    p = next(p for p in voce[i]["parole"] if p["w"].startswith(inizio_con))
    return per[i]["attacco"] + p["da"]

def tutte(i, inizio_con):
    return [per[i]["attacco"] + p["da"] for p in voce[i]["parole"] if p["w"].startswith(inizio_con)]

# --------------------------------------------------------- 2. rimessa a tempo
def rimetti_a_tempo(src, ancore, dur, uscita):
    """ancore: [(secondo nel sorgente, secondo nella scena)], in ordine.
    Fra due ancore, se il tempo della scena e' piu' lungo si ferma l'immagine
    0,25 s prima dell'evento; se e' piu' corto si taglia li'. Dopo l'ultima
    ancora: si ferma l'ultimo fotogramma o si taglia la coda."""
    fine_src = durata(src)
    ancore = [(0.0, 0.0)] + ancore + [(fine_src, dur)]
    pezzi = []                                    # (da, a, fermo dopo)
    for (sa, ta), (sb, tb) in zip(ancore, ancore[1:]):
        delta = (tb - ta) - (sb - sa)
        perno = sb if sb == fine_src else sb - 0.25
        if delta >= 0:
            pezzi.append((sa, perno, delta))
            if perno < sb: pezzi.append((perno, sb, 0))
        else:
            if perno + delta > sa: pezzi.append((sa, perno + delta, 0))
            if perno < sb: pezzi.append((perno, sb, 0))
    # Ogni pezzo e' un input a se' (-ss/-t): il fermo (tpad) dopo un trim
    # dentro lo stesso grafo non funziona, perche' il trim non chiude il flusso.
    ingressi, filtri = [], []
    for k, (a, b, f) in enumerate(pezzi):
        ingressi += ["-ss", f"{a:.3f}", "-t", f"{b - a:.3f}", "-i", src]
        filtri.append(f"[{k}:v]setpts=PTS-STARTPTS,fps={FPS}"
                      + (f",tpad=stop_mode=clone:stop_duration={f:.3f}" if f > 0.001 else "") + f"[p{k}]")
    filtri.append("".join(f"[p{k}]" for k in range(len(pezzi))) + f"concat=n={len(pezzi)}:v=1:a=0,"
                  f"tpad=stop_mode=clone:stop_duration=1,trim=duration={dur},setpts=PTS-STARTPTS[v]")
    sh(FF, "-y", "-v", "error", *ingressi, "-filter_complex", ";".join(filtri), "-map", "[v]",
       "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", uscita)
    return pezzi

# -------------------------------------------------------- 3. le scene di Marco
def font(nome, peso, px):
    f = ImageFont.truetype(str(QUI/"font"/nome), px)
    f.set_variation_by_name(peso)
    return f

PLAY = lambda px, peso="Bold": font("PlayfairDisplay[wght].ttf", peso, px)
PLAY_I = lambda px: font("PlayfairDisplay-Italic[wght].ttf", "Italic", px)
MONT = lambda px, peso="Bold": font("Montserrat[wght].ttf", peso, px)

def sprite_testo(testo, f, colore):
    l, t_, r, b = f.getbbox(testo)
    im = Image.new("RGBA", (r - l + 8, b - t_ + 8), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((4 - l, 4 - t_), testo, font=f, fill=colore)
    return im, (l, t_)

def pillola(testo, fondo, px=24):
    f = MONT(px, "Bold")
    l, t_, r, b = f.getbbox(testo)
    w, h = r - l + 2*28, int(px * 2.15)
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, w-1, h-1), radius=h//2, fill=fondo + (255,))
    d.text((28 - l, (h - (b - t_)) / 2 - t_), testo, font=f, fill=(255, 255, 255))
    return im

def logo():
    box = Image.new("RGBA", (217, 128), (0, 0, 0, 0))
    ImageDraw.Draw(box).rounded_rectangle((0, 0, 216, 127), radius=16, fill=(255, 255, 255, 255))
    lg = Image.open(PAC/"immagini"/"logo_cisl_fp_padova_rovigo.png").convert("RGBA")
    lg.thumbnail((185, 100), Image.LANCZOS)
    box.alpha_composite(lg, ((217 - lg.width)//2, (128 - lg.height)//2))
    return box

def velo(sinistra, generale, fino_a=1300, colore=(6, 20, 14)):
    """Un velo scuro su tutto il quadro, piu' fitto a sinistra dove stanno i testi."""
    a = np.zeros((H, W), np.float32) + generale
    rampa = np.clip(1 - np.arange(W) / fino_a, 0, 1) ** 1.3 * sinistra
    a += rampa[None, :]
    a = np.clip(a, 0, 1)
    im = np.zeros((H, W, 4), np.uint8)
    im[..., :3] = colore
    im[..., 3] = (a * 255).astype(np.uint8)
    return Image.fromarray(im, "RGBA")

def con_alpha(im, k):
    if k >= 0.999: return im
    if k <= 0.001: return None
    a = im.getchannel("A").point(lambda v: int(v * k))
    out = im.copy(); out.putalpha(a); return out

def morbido(t, t0, dur=0.35):
    x = np.clip((t - t0) / dur, 0, 1)
    return float(x * x * (3 - 2 * x))

def scena_marco(i, clip, elementi, uscita):
    """clip sotto, elementi sopra. Ogni elemento: funzione t -> lista di (sprite, (x, y))."""
    s = per[i]; dur = s["durata"]
    lento = max(1.0, dur / (durata(clip) - 0.05))
    fondo = LAV/f"{i}-fondo.mp4"
    sh(FF, "-y", "-v", "error", "-i", clip, "-vf",
       f"setpts={lento:.4f}*PTS,scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},"
       f"fps={FPS},tpad=stop_mode=clone:stop_duration=2,trim=duration={dur},setpts=PTS-STARTPTS",
       "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", fondo)
    n = int(round(dur * FPS))
    p = subprocess.Popen([FF, "-y", "-v", "error", "-i", fondo, "-f", "rawvideo", "-pix_fmt", "rgba",
                          "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-filter_complex",
                          "[0:v][1:v]overlay=0:0:format=auto,format=yuv420p[v]", "-map", "[v]",
                          "-c:v", "libx264", "-crf", "18", "-t", f"{dur}", str(uscita)],
                         stdin=subprocess.PIPE, stderr=subprocess.PIPE)
    for k in range(n):
        tt = k / FPS
        fr = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        for el in elementi:
            for sp, pos in el(tt):
                if sp is not None: fr.alpha_composite(sp, (int(pos[0]), int(pos[1])))
        p.stdin.write(fr.tobytes())
    p.stdin.close()
    err = p.stderr.read(); p.wait()
    if p.returncode: raise SystemExit(err.decode()[-2000:])
    return lento

LOGO = logo()
fisso = lambda sp, pos, t0=-1.0: (lambda t: [(con_alpha(sp, morbido(t, t0)), pos)])

def entra(sp, pos, t0, dy=18, dx=0, dur=0.4):
    def f(t):
        k = morbido(t, t0, dur)
        return [(con_alpha(sp, k), (pos[0] - dx * (1 - k), pos[1] + dy * (1 - k)))]
    return f

def costruisci_S0():
    i = "S0"
    el = [fisso(velo(0.32, 0.42), (0, 0)), fisso(LOGO, (1643, 50))]
    pill = pillola("FEBBRAIO · PERMESSI E FESTIVITÀ SOPPRESSE", VERDE_SCURO, 21)
    el.append(entra(pill, (120, 262), 0.15, dy=10))
    f = PLAY(104)
    righe = [["Hai", "ore", "di", "permesso"], ["che", "non", "sai", "di", "avere?"]]
    parole = voce[i]["parole"]; k = 0; spazio = f.getlength(" ")
    y0 = [360, 500]
    for r, riga in enumerate(righe):
        x = 120
        for w_ in riga:
            col = MENTA if w_ == "permesso" else BIANCO_CALDO
            sp, (l, t_) = sprite_testo(w_, f, col)
            t0 = per[i]["attacco"] + parole[k]["da"] - 0.05
            el.append(entra(sp, (x + l - 4, y0[r] + t_ - 4), t0, dy=22, dur=0.3))
            if w_ == "permesso":
                lw = int(f.getlength(w_)); basso = f.getbbox(w_)[3]
                sotto = Image.new("RGBA", (lw, 7), ROSSO + (255,))
                def sottolinea(t, sotto=sotto, x=x, t0=t0):
                    k2 = morbido(t, t0 + 0.35, 0.5)
                    if k2 <= 0: return [(None, (0, 0))]
                    return [(sotto.crop((0, 0, max(1, int(sotto.width * k2)), 7)), (x, y0[0] + basso + 8))]
                el.append(sottolinea)
            x += f.getlength(w_) + spazio; k += 1
    return scena_marco(i, QUI/"marco"/"clip-S0.mp4", el, SC/"S0.mp4")

def costruisci_S1():
    i = "S1"
    fascia = Image.new("RGBA", (W, H - 660), (0, 0, 0, 72))
    el = [fisso(velo(0.18, 0.10, 1100), (0, 0)), fisso(fascia, (0, 660)), fisso(LOGO, (1643, 50))]
    el.append(entra(pillola("LA STORIA", ROSSO, 24), (100, 100), 0.15, dy=10))
    # la didascalia del protagonista, in basso a sinistra, entra da sinistra
    cap = Image.new("RGBA", (562, 150), (0, 0, 0, 0))
    d = ImageDraw.Draw(cap)
    d.rectangle((0, 0, 9, 149), fill=ROSSO + (255,))
    d.rectangle((10, 0, 561, 81), fill=VERDE_SCURO + (255,))
    d.rectangle((10, 82, 561, 149), fill=(228, 228, 225, 255))
    fm = MONT(44, "Bold"); l, t_, r, b = fm.getbbox("MARCO")
    d.text((42 - l, (82 - (b - t_)) / 2 - t_), "MARCO", font=fm, fill=(255, 255, 255))
    fs = MONT(30, "Medium"); l, t_, r, b = fs.getbbox("Impiegato comunale · Polesine")
    d.text((42 - l, 82 + (68 - (b - t_)) / 2 - t_), "Impiegato comunale · Polesine", font=fs, fill=GRIGIO_SCURO)
    el.append(entra(cap, (100, 820), 0.4, dy=0, dx=40, dur=0.5))
    # il fumetto, a sinistra in alto: il volto di Marco sta a destra
    testo = "«Per le visite uso le ferie. Come tutti, no?»"
    fq = PLAY_I(50)
    tw = int(fq.getlength(testo))
    bol = Image.new("RGBA", (tw + 80, 140), (0, 0, 0, 0))
    ImageDraw.Draw(bol).rounded_rectangle((0, 0, tw + 79, 139), radius=26, fill=(236, 236, 236, 238))
    sp, (l, t_) = sprite_testo(testo, fq, GRIGIO_SCURO)
    alto = sp.height - 8
    t_bol = 1.4
    def fumetto(t):
        out = [(con_alpha(bol, morbido(t, t_bol, 0.3)), (100, 190))]
        k = morbido(t, t_bol + 0.3, 1.6)
        if k > 0:
            out.append((sp.crop((0, 0, max(1, int(sp.width * k)), sp.height)), (136, 190 + (140 - alto) / 2 - 4)))
        return out
    el.append(fumetto)
    return scena_marco(i, QUI/"marco"/"clip-S1.mp4", el, SC/"S1.mp4")

def costruisci_S5():
    i = "S5"
    el = [fisso(velo(0.62, 0.12, 1250), (0, 0)), fisso(LOGO, (1643, 50))]
    el.append(entra(pillola("COM'È ANDATA", VERDE, 24), (150, 150), 0.15, dy=10))
    sp, (l, t_) = sprite_testo("MARCO", MONT(32, "Bold"), MENTA)
    el.append(entra(sp, (152 + l - 4, 555 + t_ - 4), 0.6, dy=12))
    f = PLAY(84)
    for r, riga in enumerate(["Le sue ferie tornano", "a essere vacanza."]):
        sp, (l, t_) = sprite_testo(riga, f, BIANCO_CALDO)
        el.append(entra(sp, (150 + l - 4, 620 + r * 104 + t_ - 4), 1.0 + r * 0.25, dy=24, dur=0.5))
    return scena_marco(i, QUI/"marco"/"clip-S5.mp4", el, SC/"S5.mp4")

# -------------------------------------------------------------- 4. sottotitoli
MAX_RIGA = 50
NIENTE = {"S0": "tutto", "S7": ["Ogni giorno conta.", "Non lasciarne nessuno nel cassetto."]}

def battute(testo):
    frasi = [f for f in re.split(r"(?<=[.?!:])\s+", testo.strip()) if f]
    out = []
    for f in frasi:
        coda = [f]
        while coda:
            x = coda.pop(0)
            if len(x) <= MAX_RIGA: out.append(x); continue
            tagli = [m.end() for m in re.finditer(r",\s", x)] or [m.end() for m in re.finditer(r"\s", x)]
            k = min(tagli, key=lambda q: abs(q - len(x)/2))
            coda[:0] = [x[:k].strip(), x[k:].strip()]
    unite = []
    for b in out:
        if unite and len(unite[-1]) < 15 and len(unite[-1]) + 1 + len(b) <= MAX_RIGA + 6:
            unite[-1] += " " + b
        else: unite.append(b)
    return unite

cue = []
for i in IDS:
    parole = voce[i]["parole"]
    testo = tl[i]["voce"]
    assert len(testo.split()) == len(parole), (i, len(testo.split()), len(parole))
    k = 0
    for b in battute(testo):
        n = len(b.split())
        da = per[i]["inizio"] + per[i]["attacco"] + parole[k]["da"]
        a = per[i]["inizio"] + per[i]["attacco"] + parole[k + n - 1]["a"]
        salta = NIENTE.get(i) == "tutto" or b in NIENTE.get(i, [])
        cue.append({"scena": i, "testo": b, "da": da, "a": a, "salta": salta})
        k += n
for c in cue: c["da"] = max(per[c["scena"]]["inizio"], c["da"] - 0.12)
for j, c in enumerate(cue):
    s = per[c["scena"]]; fine = s["inizio"] + s["durata"]
    dopo = cue[j+1]["da"] if j + 1 < len(cue) and cue[j+1]["scena"] == c["scena"] else fine
    c["a"] = min(dopo - 0.04, c["a"] + 0.5, fine - 0.05)
mostrate = [c for c in cue if not c["salta"]]

def ts(t):
    h, r = divmod(t, 3600); m, s = divmod(r, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}".replace(".", ",")
(QUI/"sottotitoli.srt").write_text("".join(
    f"{n}\n{ts(c['da'])} --> {ts(c['a'])}\n{c['testo']}\n\n" for n, c in enumerate(cue, 1)), encoding="utf-8")

TESTA = """[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sotto,Inter SemiBold,42,&H00FFFFFF,&H00FFFFFF,&H26304800,&H26304800,0,0,0,0,100,100,0,0,3,14,0,2,120,120,52,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
def ass_t(t):
    h, r = divmod(max(t, 0), 3600); m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"

# ------------------------------------------------------------------ esecuzione
note = {}
for s in scene:
    i = s["id"]; grezza = LAV/f"{i}-v.mp4"
    if i == "S0": note[i] = f"clip rallentata {costruisci_S0():.2f}x"; (SC/"S0.mp4").replace(grezza)
    elif i == "S1": note[i] = f"clip rallentata {costruisci_S1():.2f}x"; (SC/"S1.mp4").replace(grezza)
    elif i == "S5": note[i] = f"clip rallentata {costruisci_S5():.2f}x"; (SC/"S5.mp4").replace(grezza)
    elif i == "S3":
        f1, f2 = tutte(i, "Falso")
        anc = [(1.45, f1), (9.92, parola(i, "Secondo") - 0.25), (11.40, f2)]
        pz = rimetti_a_tempo(PAC/tl[i]["file"], anc, s["durata"], grezza)
        note[i] = "rimessa a tempo: " + ", ".join(f"{a:.2f}-{b:.2f}" + (f"+fermo {f:.2f}" if f > 0.001 else "") for a, b, f in pz)
    else:
        rimetti_a_tempo(PAC/tl[i]["file"], [], s["durata"], grezza)
    mie = [c for c in mostrate if c["scena"] == i]
    fine = SC/f"{i}.mp4"
    if mie:
        ass = LAV/f"{i}.ass"
        ass.write_text(TESTA + "".join(
            f"Dialogue: 0,{ass_t(c['da']-s['inizio'])},{ass_t(c['a']-s['inizio'])},Sotto,,0,0,0,,{c['testo']}\n"
            for c in mie), encoding="utf-8")
        sh(FF, "-y", "-v", "error", "-i", grezza, "-vf", f"ass={ass}:fontsdir=/usr/share/fonts/opentype/inter",
           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", fine)
    else:
        fine.write_bytes(grezza.read_bytes())

# ------------------------------------------------------------------- 5. audio
pv = []
for s in scene:
    i = s["id"]
    f = LAV/f"{i}-voce.wav"
    sh(FF, "-y", "-v", "error", "-i", QUI/"audio"/"voce"/f"{i}.wav", "-af",
       f"aresample={SR},adelay={int(s['attacco']*1000)},apad=whole_dur={s['durata']},atrim=0:{s['durata']}",
       "-ac", "1", f)
    pv.append(f)
voce_intera = LAV/"voce-intera.wav"
(LAV/"voci.txt").write_text("".join(f"file '{p}'\n" for p in pv))
sh(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", LAV/"voci.txt", "-ar", SR, voce_intera)

MUSICA = QUI.parent/"calendario-2027-01-ferie"/"audio"/"musica-271354a0.wav"
LM, X, XF = 70.0, 50.0, 4.0           # durata del brano, dove si incrociano i due passaggi, dissolvenza
o2 = LM - (T - X)                     # il secondo passaggio parte da qui, e finisce con la chiusura del brano
musica = LAV/"musica.wav"
sh(FF, "-y", "-v", "error", "-i", MUSICA, "-filter_complex",
   f"[0:a]aresample={SR},asplit=2[a][b];"
   f"[a]atrim=0:{X+XF},afade=t=in:d=1.5,afade=t=out:st={X}:d={XF}:curve=qsin[m1];"
   f"[b]atrim={o2:.3f}:{LM},asetpts=PTS-STARTPTS,afade=t=in:d={XF}:curve=qsin,adelay={int(X*1000)}|{int(X*1000)}[m2];"
   f"[m1][m2]amix=inputs=2:normalize=0,apad=whole_dur={T},atrim=0:{T}[m]", "-map", "[m]", musica)
grezzo = LAV/"mix-grezzo.wav"
sh(FF, "-y", "-v", "error", "-i", musica, "-i", voce_intera, "-filter_complex",
   "[0:a]aformat=channel_layouts=stereo,volume=0.11[m];"
   "[1:a]aformat=channel_layouts=stereo,asplit=2[vc][vs];"
   "[m][vs]sidechaincompress=threshold=0.02:ratio=8:attack=60:release=600[md];"
   "[vc][md]amix=inputs=2:normalize=0[o]", "-map", "[o]", grezzo)
I = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", sh(FF, "-i", grezzo, "-af", "ebur128", "-f", "null", "-"))[-1])
mix = QUI/"audio"/"mix.wav"
sh(FF, "-y", "-v", "error", "-i", grezzo, "-af", f"volume={-16 - I:.2f}dB,alimiter=limit=0.84:level=disabled", mix)
(QUI/"audio"/"scene").mkdir(exist_ok=True)
for s in scene:
    sh(FF, "-y", "-v", "error", "-ss", f"{s['inizio']:.3f}", "-t", f"{s['durata']:.3f}", "-i", mix,
       "-c:a", "libmp3lame", "-b:a", "192k", "-ar", SR, QUI/"audio"/"scene"/f"{s['id']}.mp3")

# --------------------------------------------------------- 6. montato di prova
(LAV/"lista.txt").write_text("".join(f"file '{SC/(s['id'] + '.mp4')}'\n" for s in scene))
sh(FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", LAV/"lista.txt", "-i", mix,
   "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest",
   QUI/"montato-locale.mp4")

(QUI/"scene.json").write_text(json.dumps(
    [{**s, "file": f"scene/{s['id']}.mp4", "audio": f"audio/scene/{s['id']}.mp3", "nota": note.get(s["id"], "")}
     for s in scene], indent=1, ensure_ascii=False), encoding="utf-8")
for s in scene:
    print(f"{s['id']}  {s['inizio']:6.2f} -> {s['inizio']+s['durata']:6.2f}  {s['durata']:5.2f} s  {note.get(s['id'], '')}")
print(f"{len(mostrate)} sottotitoli impressi su {len(cue)} battute · musica: secondo passaggio da {o2:.1f} s"
      f" · mix {I:.1f} -> -16 LUFS · montato-locale.mp4 {durata(QUI/'montato-locale.mp4'):.2f} s")
