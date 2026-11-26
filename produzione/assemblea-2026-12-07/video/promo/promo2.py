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
out = os.path.join(LAV, f"seg-{L}{O}"); os.makedirs(out, exist_ok=True)
seg = []
for b in bl:
    d = dur[b["id"]]; o = os.path.join(out, b["id"] + ".mp4")
    enc = ["-t", f"{d:.3f}", "-an", "-r", str(FPS), "-c:v", "libx264", "-crf", "17", "-preset", "medium", o]
    if b["tipo"] == "avatar":
        sh("ffmpeg", "-y", "-ss", f"{av_start[b['id']]:.3f}", "-i", os.path.join(LAV, f"avatar-{O}.mp4"), "-vf", riempi, *enc)
    elif b["tipo"] == "motion":
        src = os.path.join(QUI, "motion", "out", f"{MOTION[b['id']]}-{O}.mp4")
        sh("ffmpeg", "-y", "-i", src, "-vf", f"{riempi},tpad=stop_mode=clone:stop_duration=3", *enc)
    elif b["tipo"] == "clip":
        src = os.path.join(QUI, "clip", f"{b['scena']['clip']}-{O}.mp4")
        lento = max(1.0, d / 6.0)
        sh("ffmpeg", "-y", "-i", src, "-vf", f"setpts={lento:.4f}*PTS,{riempi},tpad=stop_mode=clone:stop_duration=2", *enc)
    seg.append(o)

# --- sottotitoli parola per parola: pezzi brevi, grafia vera sullo schermo
UNISCI = [(["o", "esse", "esse"], "OSS"), (["trecentocinquanta", "euro"], "350 €"),
          (["sette", "dicembre"], "7 dicembre"), (["sette", "e", "mezza"], "7:30"),
          (["dodici", "ore"], "12 ore")]
MAXC = 26 if O == "v" else 38
righe, t0 = [], 0.0
for b in bl:
    ws = parole[b["id"]]; i = 0; tok = []
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
fs, mv = (64, 70) if O == "h" else (72, 360)
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
        f.write(f"Dialogue: 0,{tempo_ass(a)},{tempo_ass(z)},S,,0,0,0,,{{\\fad(60,0)}}{p}\n")

lista = os.path.join(out, "lista.txt"); open(lista, "w").write("".join(f"file '{s}'\n" for s in seg))
alista = os.path.join(out, "alista.txt")
open(alista, "w").write("".join(f"file '{os.path.join(LAV, 'blocchi', b['id'] + '.wav')}'\n" for b in bl))
voce = os.path.join(out, "voce.wav")
sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", alista, "-c:a", "pcm_s16le", voce)
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
      f"afade=t=in:d=1.0,afade=t=out:st={fin_t - 2.0:.2f}:d=2.0,volume=0.18[m];"
      f"[m][v1]sidechaincompress=threshold=0.05:ratio=5:attack=20:release=300[md];"
      f"[v2][md]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]")
sh("ffmpeg", "-y", "-i", os.path.join(out, "montato.mov"), "-i", musica,
   "-filter_complex", f"[0:v]setpts=PTS/{VELOCE:.4f},fps={FPS},fade=t=in:st=0:d=0.25[vv];" + fa,
   "-map", "[vv]", "-map", "[a]", "-c:v", "libx264", "-crf", "21", "-preset", "medium", "-pix_fmt", "yuv420p",
   "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", fin)
print(os.path.basename(fin), f"{fin_t:.1f} s (velocità ×{VELOCE:.3f}), {len(righe)} sottotitoli")
