#!/usr/bin/env python3
"""
Monta la seconda versione del promo (copione2.json) nelle quattro versioni.

    python3 promo2.py 60 h      # 60 s, 16:9
    python3 promo2.py 90 v      # 90 s, 9:16

Ingredienti in lavoro2/: blocchi/*.wav e durate.json (taglia2.py),
parole-blocchi.json (tempi di ogni parola), avatar-h|v.mp4 (HeyGen sull'audio
di b01+b04+b10 in fila); in motion/out/ le grafiche animate; in clip/ le clip
Higgsfield; la musica è lavoro/musica.mp3 (la stessa della prima versione).
L'avatar resta a piena inquadratura: sopra c'è solo il sottotitolo.
Alla fine tutto il montato viene accelerato di poco (VELOCE) per stare nella durata.
"""
import json, os, re, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(QUI, "..", "mini"))
from monta import tempo_ass, norm  # noqa: E402

L = int(sys.argv[1]); O = sys.argv[2]
W, H = (1920, 1080) if O == "h" else (1080, 1920)
FPS = 25
LAV = os.path.join(QUI, "lavoro2")
tutti = json.load(open(os.path.join(QUI, "copione2.json")))
bl = [b for b in tutti if L in b["versioni"]]
dur = json.load(open(os.path.join(LAV, "durate.json")))
parole = json.load(open(os.path.join(LAV, "parole-blocchi.json")))
MOTION = {"b02": "01-retribuita", "b03": "02-ruoli", "b05": "03-soldi", "b06": "04-accordi",
          "b07": "05-ferie", "b09": "06-orari", "b11": "07-chat"}
av_start, t = {}, 0.0
for b in tutti:
    if b["tipo"] == "avatar":
        av_start[b["id"]] = t; t += dur[b["id"]]
totale = sum(dur[b["id"]] for b in bl)
VELOCE = max(1.0, totale / (L + 0.4))   # 60: ~1,09; 90: ~1,05


def sh(*a):
    subprocess.run(a, check=True, capture_output=True)


riempi = f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1,fps={FPS},format=yuv420p"
SFX = json.load(open(os.path.join(QUI, "motion", "sfx.json")))
APERTURA = 1.45          # «Lunedì 7 dicembre» a tutto schermo, poi l'avatar da «ti pagano»
# zoom sull'avatar (tempo locale del blocco): scatti secchi e una spinta lenta sul sussurro
ZOOM = {"b01": ("scatto", 4.96, 1.3), "b04": ("spinta", 0, 1.18), "b10": ("scatto", 4.06, 1.28)}


def zoomato(z):
    """scala con fattore z(t) e ritaglia W×H, un po' sopra il centro (dov'è il viso)"""
    return (f"scale={W}:{H}:force_original_aspect_ratio=increase,setsar=1,"
            f"scale=w='trunc(iw*({z})/2)*2':h='trunc(ih*({z})/2)*2':eval=frame,"
            f"crop={W}:{H}:(iw-{W})/2:(ih-{H})*0.3,fps={FPS},format=yuv420p")


def colpi(hits):
    """piccolo scatto in avanti dell'inquadratura su ogni colpo"""
    return "1" + "".join(f"+0.06*gte(t,{h:.3f})*exp(-(t-{h:.3f})*9)" for h in hits)


out = os.path.join(LAV, f"seg-{L}{O}"); os.makedirs(out, exist_ok=True)
seg, eventi, t_blocco = [], [], 0.0
for n, b in enumerate(bl):
    d = dur[b["id"]]; o = os.path.join(out, b["id"] + ".mp4")
    flash = "" if n == 0 else ",fade=t=in:st=0:d=0.12:color=white"
    enc = ["-an", "-r", str(FPS), "-c:v", "libx264", "-crf", "17", "-preset", "medium"]
    if n > 0:
        eventi.append((t_blocco - 0.18, "whoosh"))
    if b["tipo"] == "avatar":
        src = os.path.join(LAV, f"avatar-{O}.mp4"); a0 = av_start[b["id"]]
        tipo, tz, zf = ZOOM[b["id"]]
        parti = []
        if b["id"] == "b01":
            ap = os.path.join(QUI, "motion", "out", f"00-apertura-{O}.mp4")
            p = os.path.join(out, "b01a.mp4")
            sh("ffmpeg", "-y", "-i", ap, "-t", f"{APERTURA:.3f}", "-vf", zoomato(colpi([0.0, 0.5])), *enc, p)
            parti.append(p); a0 += APERTURA; tz -= APERTURA; d_av = d - APERTURA
            for k, v in SFX["00-apertura"].items():
                eventi += [(t_blocco + x, k) for x in v]
            eventi.append((t_blocco + 0.5, "hit"))
        else:
            d_av = d
        z = f"if(gte(t,{tz:.3f}),{zf},1)" if tipo == "scatto" else f"1+{zf - 1:.3f}*t/{d_av:.3f}"
        if tipo == "scatto":
            eventi.append((t_blocco + (d - d_av) + tz, "hit"))
        p = os.path.join(out, b["id"] + "b.mp4")
        sh("ffmpeg", "-y", "-ss", f"{a0:.3f}", "-i", src, "-t", f"{d_av:.3f}", "-vf", zoomato(z) + flash, *enc, p)
        parti.append(p)
        if len(parti) == 1:
            os.replace(p, o)
        else:
            lt = os.path.join(out, "b01.txt"); open(lt, "w").write("".join(f"file '{x}'\n" for x in parti))
            sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lt, "-c", "copy", o)
    elif b["tipo"] == "motion":
        nome = MOTION[b["id"]]; ev = SFX[nome]
        for k, v in ev.items():
            eventi += [(t_blocco + x, k) for x in v if x < d]
        src = os.path.join(QUI, "motion", "out", f"{nome}-{O}.mp4")
        sh("ffmpeg", "-y", "-i", src, "-t", f"{d:.3f}",
           "-vf", f"tpad=stop_mode=clone:stop_duration=3,{zoomato(colpi([h for h in ev.get('hit', []) if h < d]))}{flash}", *enc, o)
    elif b["tipo"] == "clip":
        src = os.path.join(QUI, "clip", f"{b['scena']['clip']}-{O}.mp4")
        lento = max(1.0, d / 6.0)
        sh("ffmpeg", "-y", "-i", src, "-t", f"{d:.3f}",
           "-vf", f"setpts={lento:.4f}*PTS,tpad=stop_mode=clone:stop_duration=2,{zoomato(f'1.0+0.08*t/{d:.3f}')}{flash}", *enc, o)
    seg.append(o); t_blocco += d

# --- sottotitoli parola per parola: pezzi brevi, grafia vera sullo schermo
UNISCI = [(["o", "esse", "esse"], "OSS"), (["trecentocinquanta", "euro"], "350 €"),
          (["sette", "dicembre"], "7 dicembre"), (["sette", "e", "mezza"], "7:30"),
          (["dodici", "ore"], "12 ore")]
MAXC = 20 if O == "v" else 32
righe, t0 = [], 0.0
for b in bl:
    ws = [w for w in parole[b["id"]] if not (b["id"] == "b01" and w["t"] < APERTURA)]; i = 0; tok = []
    while i < len(ws):
        for seq, rep in UNISCI:
            if [norm(w["p"]) for w in ws[i:i + len(seq)]] == seq:
                fine = ws[i + len(seq) - 1]
                punt = fine["p"][-1] if not fine["p"][-1].isalnum() else ""
                tok.append({"p": rep + punt, "t": ws[i]["t"], "f": fine["f"]}); i += len(seq); break
        else:
            tok.append(ws[i]); i += 1
    cur = []
    for k, w in enumerate(tok):
        cur.append(w)
        testo = " ".join(x["p"] for x in cur)
        nxt = tok[k + 1]["p"] if k + 1 < len(tok) else ""
        if k + 1 == len(tok) or w["p"][-1] in ".?!:" or len(testo) + 1 + len(nxt) > MAXC:
            a = t0 + cur[0]["t"]; z = t0 + (tok[k + 1]["t"] if k + 1 < len(tok) else dur[b["id"]] - 0.1)
            righe.append([a, z, testo]); cur = []
    t0 += dur[b["id"]]
for k in range(len(righe) - 1):
    righe[k][1] = min(righe[k][1], righe[k + 1][0])
fs, mv = (74, 70) if O == "h" else (86, 360)
ass = os.path.join(out, "sub.ass")
with open(ass, "w") as f:
    f.write(f"[Script Info]\nScriptType: v4.00+\nPlayResX: {W}\nPlayResY: {H}\n\n[V4+ Styles]\n"
            "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n"
            f"Style: S,Inter ExtraBold,{fs},&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,1,0,0,0,100,100,0,0,1,5,3,2,60,60,{mv},1\n\n"
            "[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n")
    for a, z, p in righe:
        p = p[0].upper() + p[1:]
        # le parole che contano in giallo
        p = re.sub(r"\b(retribuita|0|zero|350 €|12|Aula Magna|lunedì|perde|minuto)\b", r"{\\c&H0AD6FF&}\1{\\c&HFFFFFF&}", p, flags=re.I)
        f.write(f"Dialogue: 0,{tempo_ass(a)},{tempo_ass(z)},S,,0,0,0,,{{\\fad(40,0)\\fscx72\\fscy72\\t(0,110,\\fscx100\\fscy100)}}{p}\n")

lista = os.path.join(out, "lista.txt"); open(lista, "w").write("".join(f"file '{s}'\n" for s in seg))
alista = os.path.join(out, "alista.txt")
open(alista, "w").write("".join(f"file '{os.path.join(LAV, 'blocchi', b['id'] + '.wav')}'\n" for b in bl))
voce = os.path.join(out, "voce.wav")
sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", alista, "-c:a", "pcm_s16le", voce)
# effetti sonori: una traccia sola, sommata con numpy
import numpy as np


def leggi(p):
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "f32le", "-ac", "2", "-ar", "48000", "-"], capture_output=True, check=True)
    return np.frombuffer(r.stdout, dtype=np.float32).reshape(-1, 2)


GUADAGNO = {"click": 0.30, "pop": 0.26, "tick": 0.14, "whoosh": 0.20, "hit": 0.42}
suoni = {k: leggi(os.path.join(QUI, "sfx", k + ".wav")) for k in GUADAGNO}
traccia = np.zeros((int((totale + 1) * 48000), 2), dtype=np.float32)
for t_ev, k in eventi:
    i = int(max(0, t_ev) * 48000); x = suoni[k] * GUADAGNO[k]
    traccia[i:i + len(x)] += x[:len(traccia) - i]
v = leggi(voce); traccia[:len(v)] += v[:len(traccia)]
mix = os.path.join(out, "voce-sfx.wav")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ac", "2", "-ar", "48000", "-i", "-", "-c:a", "pcm_s16le", mix],
               input=np.clip(traccia, -1, 1).tobytes(), check=True)
voce = mix
# 1) immagine + voce + sottotitoli, a velocità naturale
grezzo = os.path.join(out, "montato.mp4")
sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lista, "-i", voce,
   "-vf", f"subtitles={ass}:fontsdir=/usr/share/fonts", "-c:v", "libx264", "-crf", "17", "-preset", "medium",
   "-c:a", "pcm_s16le", "-shortest", os.path.join(out, "montato.mov"))
# 2) accelerato di VELOCE, con la musica sotto (che non accelera)
fin_t = totale / VELOCE
musica = os.path.join(QUI, "lavoro", "musica.mp3")
fin = os.path.join(QUI, f"promo-assemblea-{L}s-{'16x9' if O == 'h' else '9x16'}.mp4")
fa = (f"[0:a]atempo={VELOCE:.4f},aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[v1][v2];"
      f"[1:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:{fin_t + 1:.2f},"
      f"afade=t=in:d=1.0,afade=t=out:st={fin_t - 2.0:.2f}:d=2.0,volume=0.24[m];"
      f"[m][v1]sidechaincompress=threshold=0.05:ratio=5:attack=20:release=300[md];"
      f"[v2][md]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]")
sh("ffmpeg", "-y", "-i", os.path.join(out, "montato.mov"), "-i", musica,
   "-filter_complex", f"[0:v]setpts=PTS/{VELOCE:.4f},fps={FPS}[vv];" + fa,
   "-map", "[vv]", "-map", "[a]", "-c:v", "libx264", "-crf", "21", "-preset", "medium", "-pix_fmt", "yuv420p",
   "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", fin)
print(os.path.basename(fin), f"{fin_t:.1f} s (velocità ×{VELOCE:.3f}), {len(righe)} sottotitoli")
