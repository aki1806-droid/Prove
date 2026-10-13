"""Montaggio locale di una lezione secondo CLAUDE.md.
uso: python3 monta.py <cartella corso> <lezione> <fase> [...]
fasi: segmenti   inquadrature in build/<lez>/seg/NNN.mp4 (browser per scene e SVG, ffmpeg per immagini e clip)
      audio      voce completa con pause e silenzi, normalizzata a -16 LUFS
      video      transizioni, concatenazione, file finale <lez>.mp4
      srt        sottotitoli dalle frasi dello script con i tempi reali dei blocchi
      provini    un fotogramma ogni 10 s in griglia
      tutto      tutte le fasi in ordine
Variabili: FFMPEG (eseguibile), NODE_PATH (moduli globali con playwright)."""
import json, os, sys, re, math, subprocess, wave, glob, shutil, urllib.parse
import numpy as np
from PIL import Image

corso, lez, fase = sys.argv[1:4]
corso = os.path.abspath(corso)
mod = "M" + lez.split("_M")[1][:2]
M = os.path.join(corso, mod); B = os.path.join(corso, "build", lez)
FF = os.environ.get("FFMPEG", "ffmpeg")
STR = os.path.dirname(os.path.abspath(__file__))
P = json.load(open(os.path.join(B, "piano.json")))
FPS = P["fps"]; pezzi = P["pezzi"]
SEG = os.path.join(B, "seg"); os.makedirs(SEG, exist_ok=True)
COLORE = "eq=contrast=1.04:saturation=0.92,colorbalance=rs=-0.03:gs=0.02:bs=-0.01:rh=0.04:gh=0.01:bh=-0.03,noise=alls=4:allf=t"
ENC = ["-c:v", "libx264", "-preset", "medium", "-crf", "12", "-pix_fmt", "yuv420p", "-r", str(FPS)]
LIVELLO = {1: "#00623A", 2: "#1F5C7A", 3: "#E8A33D", 4: "#1D2B53"}

def ff(*a):
    subprocess.run([FF, "-v", "error", "-y", *a], check=True)

def nfot(p): return p["a"] - p["da"]
def seg(p, suff=""): return os.path.join(SEG, f"{p['sid']}-{p['k']}-{nfot(p)}{suff}.mp4")

# ---------- immagini: dettaglio al 60% sul punto piu' interessante (massima energia dei bordi)
def finestre(img, k=2):
    g = np.asarray(img.convert("L").resize((192, 108)), dtype=float)
    e = np.abs(np.diff(g, axis=0))[:, :-1] + np.abs(np.diff(g, axis=1))[:-1, :]
    w, h = int(191 * .6), int(107 * .6)
    S = e.cumsum(0).cumsum(1); S = np.pad(S, ((1, 0), (1, 0)))
    best = []
    for y in range(0, 107 - h + 1, 2):
        for x in range(0, 191 - w + 1, 2):
            best.append((S[y + h, x + w] - S[y, x + w] - S[y + h, x] + S[y, x], x, y))
    best.sort(reverse=True); scelte = []
    for s, x, y in best:
        if all(abs(x - a) > w * .4 or abs(y - b) > h * .4 for a, b in scelte): scelte.append((x, y))
        if len(scelte) == k: break
    W, H = img.size
    return [(int(x / 191 * W), int(y / 107 * H), int(W * .6), int(H * .6)) for x, y in scelte]

def seg_immagine(p):
    src = os.path.join(B, "media", p["file"]); img = Image.open(src)
    W, H = img.size
    if p["inquadratura"] == "largo": box = (0, 0, W, H)
    else:
        x, y, w, h = finestre(img)[0 if p["inquadratura"] == "dettaglio" else 1]; box = (x, y, w, h)
    n = nfot(p); z = "1+0.08*on/%d" % max(1, n - 1)
    pos = {"destra": ("iw-iw/zoom", "(ih-ih/zoom)/2"), "sinistra": ("0", "(ih-ih/zoom)/2"),
           "alto": ("(iw-iw/zoom)/2", "0"), "centro": ("(iw-iw/zoom)/2", "(ih-ih/zoom)/2")}[p["direzione"]]
    x, y, w, h = box
    vf = (f"crop={w}:{h}:{x}:{y},scale=3840:2160:flags=lanczos,"
          f"zoompan=z='{z}':x='{pos[0]}':y='{pos[1]}':d={n}:s=1920x1080:fps={FPS},{COLORE}")
    ff("-loop", "1", "-i", src, "-vf", vf, "-frames:v", str(n), *ENC, seg(p))

def seg_clip(p):
    src = os.path.join(B, "media", p["file"]); n = nfot(p); v = p.get("velocita", 1.0)
    r = p.get("ritaglio")   # [x, y, larghezza] in frazioni del fotogramma, stesso rapporto 16:9
    crop = f"crop=iw*{r[2]}:ih*{r[2]}:iw*{r[0]}:ih*{r[1]}," if r else ""
    vf = f"setpts=PTS/{v},fps={FPS},{crop}scale=1920:1080:flags=lanczos,{COLORE},tpad=stop_mode=clone:stop=-1"
    ff("-i", src, "-an", "-vf", vf, "-frames:v", str(n), *ENC, seg(p))

def seg_registrazione(p):
    """registrazione vera: per ora solo adattata a 1920x1080 e alla durata dell'inquadratura (tagli, zoom e accelerazioni a mano)"""
    vf = f"fps={FPS},scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#FAF8F4,tpad=stop_mode=clone:stop=-1"
    ff("-i", p["registrazione"], "-an", "-vf", vf, "-frames:v", str(nfot(p)), *ENC, seg(p))

# ---------- scene e SVG: lavori per il browser
def camera(p, dur):
    """fotogramma -> (scala, tx, ty) per #cam"""
    piano = p.get("camera"); fine = p.get("fine_anim", 0) / 1000
    if piano == "statica": piano = {"da_fine": True, "chiavi": [[0, 1, 960, 540], [99, 1.08, 960, 540]]}
    if not piano and p.get("inquadratura"):
        q = p["inquadratura"]; cx, cy = q["centro"]
        piano = {"da_fine": q.get("parti_da") == "fine", "chiavi": [[0, 1, 960, 540], [2, q["zoom"], cx, cy], [99, q["zoom"] + .08, cx, cy]]}
    if not piano:
        dx, dy = p.get("dettaglio", [960, 540])
        piano = {"chiavi": [[0, 1, 960, 540], [fine, 1, 960, 540], [99, 1.25, dx, dy]]}
    K = [[min(c[0], dur)] + list(c[1:]) for c in piano["chiavi"]]
    out = []
    for f in range(round(dur * FPS)):
        t = f / FPS
        for i in range(len(K) - 1):
            if K[i][0] <= t <= K[i + 1][0] or i == len(K) - 2: break
        a, b = K[i], K[i + 1]; u = 0 if b[0] == a[0] else min(1, max(0, (t - a[0]) / (b[0] - a[0])))
        u = u * u * (3 - 2 * u)
        z, cx, cy = (a[j] + (b[j] - a[j]) * u for j in (1, 2, 3))
        cx = min(max(cx, 960 / z), 1920 - 960 / z); cy = min(max(cy, 540 / z), 1080 - 540 / z)
        out.append([round(z, 5), round(960 - z * cx, 2), round(540 - z * cy, 2)])
    return out, (p.get("fine_anim", 0) if piano.get("da_fine") else 0)

def lavori_browser(solo=None):
    L = []; pag = os.path.join(B, "pagine")
    for p in pezzi:
        if solo and p["n"] not in solo: continue
        n = nfot(p)
        if p["tipo"] == "scena" or p.get("tipo_render") == "scena":
            url = "file://" + os.path.join(pag, "scena.html") + "#" + urllib.parse.quote(json.dumps(p["scena"], ensure_ascii=False))
            L.append(dict(url=url, out=seg(p, "_br"), frames=min(n, 4 * FPS), tieni=n, n=p["n"]))
        elif p.get("tipo_render") == "pagina":   # ricostruzione animata di una registrazione
            L.append(dict(url="file://" + os.path.join(corso, p["pagina"]), out=seg(p, "_br"), frames=n, tieni=n, n=p["n"]))
        elif p["tipo"] == "animazione_svg":
            cam, t0 = camera(p, n / FPS)
            L.append(dict(url="file://" + os.path.join(pag, p["pagina"]), out=seg(p, "_br"), frames=n, cam=cam, t0=t0, tieni=n, n=p["n"]))
    return L

def segmenti(solo=None):
    L = lavori_browser(solo)
    jf = os.path.join(B, "lavori_browser.json"); json.dump(L, open(jf, "w"))
    for p in pezzi:
        if solo and p["n"] not in solo: continue
        if os.path.exists(seg(p)): continue
        if p["tipo"] == "immagine": seg_immagine(p); print("immagine", p["n"], p["file"])
        elif p["tipo"] == "clip": seg_clip(p); print("clip", p["n"], p["file"])
        elif p.get("registrazione"): seg_registrazione(p); print("registrazione", p["n"], p["registrazione"])
    env = dict(os.environ, FFMPEG=FF)
    subprocess.run(["node", os.path.join(STR, "render.js"), jf], check=True, env=env)
    for l in L:
        p = pezzi[l["n"]]
        if os.path.exists(seg(p)): continue
        ff("-i", l["out"], "-vf", f"tpad=stop_mode=clone:stop=-1", "-frames:v", str(l["tieni"]), *ENC, seg(p))

# ---------- transizioni: dissolvenza (8 fotogrammi) e tendina (12) sull'inizio del pezzo B
def ultimo_fotogramma(p):
    f = seg(p, "_ultimo").replace(".mp4", ".png")
    ff("-sseof", "-0.2", "-i", seg(p), "-update", "1", "-frames:v", "1", f) if not os.path.exists(f) else None
    return f

def transizioni():
    for i, p in enumerate(pezzi):
        out = seg(p, "_t")   # sempre rifatto: dipende anche dal pezzo precedente
        tipo = p.get("ingresso", "taglio")
        if i == 0 or tipo == "taglio": shutil.copy(seg(p), out); continue
        A = ultimo_fotogramma(pezzi[i - 1]); n = nfot(p)
        if tipo == "dissolvenza":
            d = 8 / FPS
            fc = f"[1:v]format=yuva420p,fade=t=out:st=0:d={d}:alpha=1[a];[0:v][a]overlay=eof_action=pass:format=auto[v]"
        else:  # tendina del colore del livello, da sinistra, 12 fotogrammi
            d = 12 / FPS; col = LIVELLO.get(p.get("livello", 1), "#00623A")
            fc = (f"color=c={col}:s=1920x1080:r={FPS}:d={d}[c];[0:v][1:v]overlay=enable='lt(t,{d/2})'[b];"
                  f"[b][c]overlay=x='-1920+3840*t/{d}':y=0:eof_action=pass[v]")
        ff("-i", seg(p), "-loop", "1", "-t", str(n / FPS), "-i", A, "-filter_complex", fc, "-map", "[v]", "-frames:v", str(n), *ENC, out)

# ---------- audio
def audio():
    sr = 48000; tot = int(round(P["durata"] * sr)); buf = np.zeros(tot, dtype=np.float32)
    for b, t in P["inizio"].items():
        w = wave.open(os.path.join(B, "audio", "lavorato", f"{b}.wav")); assert w.getframerate() == sr and w.getnchannels() == 1
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
        i = int(round(t * sr)); buf[i:i + len(x)] += x[:tot - i]
    grezzo = os.path.join(B, "audio", "voce-completa.wav")
    w = wave.open(grezzo, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((np.clip(buf, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
    ff("-i", grezzo, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "48000", os.path.join(B, "audio", "voce-16lufs.wav"))
    print("audio", round(tot / sr, 2), "s")

def video():
    transizioni()
    lista = os.path.join(B, "concat.txt")
    open(lista, "w").write("".join(f"file '{seg(p, '_t')}'\n" for p in pezzi))
    muto = os.path.join(B, "video-muto.mp4")
    ff("-f", "concat", "-safe", "0", "-i", lista, "-c", "copy", muto)
    ff("-i", muto, "-i", os.path.join(B, "audio", "voce-16lufs.wav"), "-map", "0:v", "-map", "1:a",
       "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-pix_fmt", "yuv420p", "-r", str(FPS),
       "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-shortest", os.path.join(B, f"{lez}.mp4"))

# ---------- sottotitoli
def srt():
    testo = open(os.path.join(M, f"{lez}_SCRIPT.md")).read()
    parti = re.split(r"^### (B\d+)[^\n]*\n", testo, flags=re.M)
    blocchi = {parti[i]: parti[i + 1].split("\n---")[0].strip() for i in range(1, len(parti), 2)}
    def righe(fr):
        parole = fr.split(); out = [[]]
        for w in parole:
            if len(" ".join(out[-1] + [w])) > 42 and out[-1]: out.append([])
            out[-1].append(w)
        return [" ".join(r) for r in out]
    def pezzi_frase(fr):  # massimo due righe da 42
        r = righe(fr)
        if len(r) <= 2: return [fr]
        # spezza alle virgole o a meta'
        m = [i for i, c in enumerate(fr) if c in ",;:" and 20 < i < len(fr) - 15]
        k = min(m, key=lambda i: abs(i - len(fr) / 2)) + 1 if m else fr.rfind(" ", 0, len(fr) // 2)
        return pezzi_frase(fr[:k].strip()) + pezzi_frase(fr[k:].strip())
    def ts(s):
        ms = int(round(s * 1000)); return f"{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d},{ms%1000:03d}"
    out = []; k = 1
    for b, t0 in P["inizio"].items():
        d = wave.open(os.path.join(B, "audio", "lavorato", f"{b}.wav")); d = d.getnframes() / d.getframerate()
        frasi = [f for f in re.split(r"(?<=[.?!])\s+", blocchi[b]) if f]
        seq = [x for f in frasi for x in pezzi_frase(f)]
        tot = sum(len(x) for x in seq); t = t0
        for x in seq:
            dt = d * len(x) / tot
            out.append(f"{k}\n{ts(t)} --> {ts(t + dt - 0.04)}\n" + "\n".join(righe(x)) + "\n"); k += 1; t += dt
    open(os.path.join(B, f"{lez}.srt"), "w").write("\n".join(out))
    print("srt", k - 1, "sottotitoli")

def provini():
    v = os.path.join(B, f"{lez}.mp4"); d = os.path.join(B, "provini"); os.makedirs(d, exist_ok=True)
    ff("-i", v, "-vf", "fps=1/10,scale=384:216", os.path.join(d, "p%03d.png"))
    fs = sorted(glob.glob(os.path.join(d, "p*.png"))); col = 8; rig = math.ceil(len(fs) / col)
    G = Image.new("RGB", (col * 384, rig * 216), "white")
    for i, f in enumerate(fs): G.paste(Image.open(f), (i % col * 384, i // col * 216))
    G.save(os.path.join(B, "provini.png")); print("provini", len(fs))

if fase in ("segmenti", "tutto"): segmenti([int(x) for x in sys.argv[4:]] or None)
if fase in ("audio", "tutto"): audio()
if fase in ("video", "tutto"): video()
if fase in ("srt", "tutto"): srt()
if fase in ("provini", "tutto"): provini()
