#!/usr/bin/env python3
"""
Monta il video promo dell'assemblea nelle quattro versioni.

    python3 promo.py 60 h     # 60 secondi, orizzontale 16:9
    python3 promo.py 90 v     # 90 secondi, verticale 9:16

Ingredienti in lavoro/: blocchi/*.wav (voce tagliata), durate.json,
scene-h|v/<id>/ (grafiche animate), avatar-h|v.mp4 (HeyGen, sull'audio di
b02+b07+b11 in fila), musica.mp3; in clip/: le clip Higgsfield.
L'avatar resta a piena inquadratura: sopra c'è solo il sottotitolo.
"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "mini"))
from monta import sottotitolo, pezzi, tempo_ass  # noqa: E402

QUI = os.path.dirname(os.path.abspath(__file__))
L = int(sys.argv[1]); O = sys.argv[2]
W, H = (1920, 1080) if O == "h" else (1080, 1920)
FPS = 25
LAV = os.path.join(QUI, "lavoro")
IMM = os.path.join(QUI, "..", "..", "slide", "immagini")
bl = [b for b in json.load(open(os.path.join(QUI, "copione.json"))) if L in b["versioni"]]
dur = json.load(open(os.path.join(LAV, "durate.json")))
tutti = json.load(open(os.path.join(QUI, "copione.json")))
av_ids = [b["id"] for b in tutti if b["tipo"] == "avatar"]
av_start = {}
t = 0.0
for i in av_ids:
    av_start[i] = t; t += dur[i]


def sh(*a):
    subprocess.run(a, check=True, capture_output=True)


riempi = f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1,fps={FPS},format=yuv420p"
out_dir = os.path.join(LAV, f"seg-{L}{O}"); os.makedirs(out_dir, exist_ok=True)
seg = []
for b in bl:
    d = dur[b["id"]]; o = os.path.join(out_dir, b["id"] + ".mp4")
    enc = ["-t", f"{d:.3f}", "-an", "-c:v", "libx264", "-crf", "18", "-preset", "medium", o]
    if b["tipo"] == "grafica":
        fr = os.path.join(LAV, f"scene-{O}", b["id"])
        n = len([f for f in os.listdir(fr) if f.endswith(".png")])
        sh("ffmpeg", "-y", "-framerate", str(FPS), "-i", os.path.join(fr, "f%04d.png"),
           "-vf", f"tpad=stop_mode=clone:stop_duration={max(0, d - n / FPS):.3f},{riempi}", *enc)
    elif b["tipo"] == "avatar":
        sh("ffmpeg", "-y", "-ss", f"{av_start[b['id']]:.3f}", "-i", os.path.join(LAV, f"avatar-{O}.mp4"),
           "-vf", riempi, *enc)
    elif b["tipo"] == "clip":
        src = os.path.join(QUI, "clip", f"{b['scena']['clip']}-{O}.mp4")
        lento = max(1.0, d / 6.0)   # la clip dura 6 s: se la voce è più lunga, rallenta appena
        sh("ffmpeg", "-y", "-i", src, "-vf", f"setpts={lento:.4f}*PTS,{riempi},tpad=stop_mode=clone:stop_duration=2", *enc)
    elif b["tipo"] == "immagine":
        img = os.path.join(IMM, b["scena"]["immagine"] + ".jpg")
        nfr = int(d * FPS) + 1
        # lento avvicinamento (Ken Burns) e la frase in basso, sopra la foto
        sh("ffmpeg", "-y", "-loop", "1", "-i", img, "-vf",
           f"scale={W * 2}:{H * 2}:force_original_aspect_ratio=increase,crop={W * 2}:{H * 2},"
           f"zoompan=z='1+0.0009*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={nfr}:s={W}x{H}:fps={FPS},"
           f"drawbox=x=0:y={int(H*0.12)}:w=iw:h={int(H*0.13) if O=='h' else int(H*0.1)}:color=0x06381F@0.88:t=fill,"
           f"drawtext=fontfile=/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf:text='{b['scena']['testo'].upper()}':fontcolor=0xFFD60A:fontsize={44 if O=='h' else 40}:"
           f"x=(w-text_w)/2:y={int(H*0.12)}+({int(H*0.13) if O=='h' else int(H*0.1)}-text_h)/2,format=yuv420p",
           *enc)
    seg.append(o)

lista = os.path.join(out_dir, "lista.txt")
open(lista, "w").write("".join(f"file '{s}'\n" for s in seg))
alista = os.path.join(out_dir, "alista.txt")
open(alista, "w").write("".join(f"file '{os.path.join(LAV, 'blocchi', b['id'] + '.wav')}'\n" for b in bl))
voce = os.path.join(out_dir, "voce.wav")
sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", alista, "-c:a", "pcm_s16le", voce)
totale = sum(dur[b["id"]] for b in bl)

# sottotitoli grandi, in basso; in verticale più su, fuori dai pulsanti dei social
fs, mv = (54, 60) if O == "h" else (64, 330)
righe, t0 = [], 0.0
for b in bl:
    parl = dur[b["id"]] - 0.3
    pz = pezzi(sottotitolo(b["testo"]), 42 if O == "v" else 60)
    tc = sum(len(p) for p in pz) or 1; t = t0
    for p in pz:
        dt = parl * len(p) / tc; righe.append((t, t + dt, p)); t += dt
    t0 += dur[b["id"]]
ass = os.path.join(out_dir, "sub.ass")
with open(ass, "w") as f:
    f.write(f"[Script Info]\nScriptType: v4.00+\nPlayResX: {W}\nPlayResY: {H}\n\n[V4+ Styles]\n"
            "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n"
            f"Style: S,Inter ExtraBold,{fs},&H00FFFFFF,&H00FFFFFF,&H00163806,&H96000000,1,0,0,0,100,100,0,0,3,10,0,2,70,70,{mv},1\n\n"
            "[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n")
    for a, z, p in righe:
        f.write(f"Dialogue: 0,{tempo_ass(a)},{tempo_ass(z)},S,,0,0,0,,{p}\n")

musica = os.path.join(LAV, "musica.mp3")
fin = os.path.join(QUI, f"promo-assemblea-{L}s-{'16x9' if O == 'h' else '9x16'}.mp4")
filtro_a = (f"[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=1.0,asplit=2[v1][v2];"
            f"[2:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:{totale + 1:.2f},"
            f"afade=t=in:d=1.5,afade=t=out:st={totale - 2.5:.2f}:d=2.5,volume=0.16[m];"
            f"[m][v1]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=300[md];"
            f"[v2][md]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]")
sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lista, "-i", voce, "-i", musica,
   "-filter_complex", f"[0:v]subtitles={ass}:fontsdir=/usr/share/fonts,fade=t=in:st=0:d=0.3[vv];" + filtro_a,
   "-map", "[vv]", "-map", "[a]", "-c:v", "libx264", "-crf", "21", "-preset", "medium", "-pix_fmt", "yuv420p",
   "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", "-shortest", fin)
print(os.path.basename(fin), f"{totale:.1f} s")
