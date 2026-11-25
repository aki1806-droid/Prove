#!/usr/bin/env python3
"""
Monta un mini video dell'assemblea.

    python3 monta.py <NN-nome.json> <lavoro/NN>

In <lavoro/NN> servono:
  grezzo.mp3      la traccia unica di ElevenLabs: i blocchi uniti da <break time="1.5s"/>
  scene/<id>/     i fotogrammi dell'entrata scritti da scene.mjs
Scrive <lavoro/NN>/blocchi/*.wav, sottotitoli.ass e ../NN-nome.mp4 accanto al json.

I confini fra i blocchi si trovano come in confini_heygen.py: ogni silenzio oltre
1,1 s e' un confine, e devono essere esattamente len(blocchi)-1. Se il conto non
torna lo script si ferma e dice dove.
"""
import json, os, re, subprocess, sys

ATEMPO = os.environ.get("ATEMPO", "1.12")
FILTRO = ("silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:"
          "stop_periods=-1:stop_duration=0.30:stop_silence=0.22:stop_threshold=-45dB,"
          f"atempo={ATEMPO}")
SOGLIA = float(os.environ.get("SOGLIA", "1.1"))
CODA = 0.45          # silenzio dopo ogni blocco, mentre la scena resta ferma
FPS = 25


def sh(*a):
    return subprocess.run(a, check=True, capture_output=True, text=True)


def durata(p):
    r = sh("ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p)
    return float(r.stdout.strip())


def silenzi(p, soglia):
    r = subprocess.run(["ffmpeg", "-i", p, "-af", f"silencedetect=noise=-42dB:d={soglia}", "-f", "null", "-"],
                       capture_output=True, text=True)
    ini = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", r.stderr)]
    fin = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r.stderr)]
    return list(zip(ini, fin))


def tempo_ass(t):
    h, t = divmod(t, 3600); m, s = divmod(t, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


def sottotitolo(t):
    """Sullo schermo la grafia vera, non quella scritta per la voce."""
    for a, b in [("Cisl effe pi", "CISL FP"), ("o esse esse", "OSS"), ("erre esse u", "RSU"), ("pi ti a", "PTA"), ("qu erre", "QR")]:
        t = re.sub(r"\b" + a + r"\b", b, t)
    return t[0].upper() + t[1:] if t else t


def pezzi(testo, maxc=78):
    frasi = [f.strip() for f in re.split(r"(?<=[.!?;:])\s+", testo) if f.strip()]
    out = []
    for f in frasi:
        parole, cur = f.split(), ""
        for w in parole:
            if len(cur) + len(w) + 1 > maxc and cur:
                out.append(cur); cur = w
            else:
                cur = (cur + " " + w).strip()
        if cur:
            out.append(cur)
    return out


def norm(w):
    import unicodedata
    w = unicodedata.normalize("NFD", w.lower())
    return "".join(c for c in w if c.isalnum())


def allinea(blocchi, dati, tot):
    """Confini dai tempi parola per parola della trascrizione (Scribe).
    Ogni blocco comincia dalla sua prima parola: il taglio va a meta' della
    pausa fra l'ultima parola del blocco prima e la prima di questo."""
    import difflib
    if isinstance(dati, dict):
        dati = dati.get("words") or dati.get("transcripts", [{}])[0].get("words", [])
    tr = [(norm(w.get("text") or w.get("word") or ""), float(w["start"]), float(w["end"]))
          for w in dati if (w.get("type", "word") == "word")]
    tr = [t for t in tr if t[0]]
    sc, inizio = [], []
    for b in blocchi:
        inizio.append(len(sc))
        sc += [norm(x) for x in b["testo"].split() if norm(x)]
    sm = difflib.SequenceMatcher(None, sc, [t[0] for t in tr], autojunk=False)
    mappa = {}
    for a, b2, size in sm.get_matching_blocks():
        for k in range(size):
            mappa[a + k] = b2 + k
    tagli = [0.0]
    for i in range(1, len(blocchi)):
        j = inizio[i]
        while j not in mappa and j < inizio[i] + 6:
            j += 1
        if j not in mappa:
            print(f"ALLINEAMENTO: blocco {blocchi[i]['id']} non trovato nella trascrizione"); sys.exit(1)
        t = mappa[j] - (j - inizio[i])     # parole saltate in testa al blocco
        t = max(1, min(t, len(tr) - 1))
        a, b2 = tr[t - 1][2], tr[t][1]
        tagli.append((a + b2) / 2 if b2 > a else b2 - 0.05)
        print(f"  {blocchi[i]['id']}: taglio a {tagli[-1]:.2f} s (pausa {max(0, b2 - a):.2f} s, «{tr[t][0]}»)")
    tagli.append(tot)
    return tagli


def main(js, lav):
    blocchi = json.load(open(js))
    n = len(blocchi)
    grezzo = os.path.join(lav, "grezzo.mp3")
    tot = durata(grezzo)
    parole = os.path.join(lav, "parole.json")
    if os.path.exists(parole):
        orig = os.path.join(lav, "originale.json")   # il testo che la traccia dice davvero
        tagli = allinea(json.load(open(orig)) if os.path.exists(orig) else blocchi, json.load(open(parole)), tot)
        # i tempi della trascrizione sono stimati: ogni taglio va nel silenzio vero piu' vicino
        sil = silenzi(grezzo, 0.12)
        for i in range(1, len(tagli) - 1):
            vicini = [((a + b) / 2, b - a) for a, b in sil if abs((a + b) / 2 - tagli[i]) < 0.9]
            if vicini:
                m = max(vicini, key=lambda x: x[1] - abs(x[0] - tagli[i]) * 0.5)
                print(f"  taglio {i}: {tagli[i]:.2f} -> {m[0]:.2f} s (silenzio di {m[1]:.2f} s)")
                tagli[i] = m[0]
            else:
                print(f"  ATTENZIONE taglio {i} a {tagli[i]:.2f} s: nessun silenzio vicino")
    else:
        sil = [(a, b) for a, b in silenzi(grezzo, SOGLIA) if a > 0.3 and b < tot - 0.3]
        if len(sil) != n - 1:
            print(f"CONFINI: trovati {len(sil)} silenzi oltre {SOGLIA} s, attesi {n-1}: {[round(a,1) for a,_ in sil]}")
            sys.exit(1)
        tagli = [0.0] + [(a + b) / 2 for a, b in sil] + [tot]
    os.makedirs(os.path.join(lav, "blocchi"), exist_ok=True)
    dur = []
    for i, b in enumerate(blocchi):
        w = os.path.join(lav, "blocchi", b["id"] + ".wav")
        sost = os.path.join(lav, "sostituisci", b["id"] + ".mp3")   # blocco rigenerato a parte
        if os.path.exists(sost):
            sh("ffmpeg", "-y", "-i", sost, "-af", FILTRO + f",apad=pad_dur={CODA}", "-ar", "48000", "-ac", "2", w)
        else:
            sh("ffmpeg", "-y", "-ss", f"{tagli[i]:.3f}", "-to", f"{tagli[i+1]:.3f}", "-i", grezzo,
               "-af", FILTRO + f",apad=pad_dur={CODA}", "-ar", "48000", "-ac", "2", w)
        dur.append(durata(w))
    # video di ogni scena: entrata animata, poi l'ultimo fotogramma fermo
    seg = []
    for i, b in enumerate(blocchi):
        d = os.path.join(lav, "scene", b["id"])
        nfr = len([f for f in os.listdir(d) if f.endswith(".png")])
        out = os.path.join(lav, "scene", b["id"] + ".mp4")
        resto = max(0.0, dur[i] - nfr / FPS)
        sh("ffmpeg", "-y", "-framerate", str(FPS), "-i", os.path.join(d, "f%04d.png"),
           "-vf", f"tpad=stop_mode=clone:stop_duration={resto:.3f},format=yuv420p",
           "-t", f"{dur[i]:.3f}", "-r", str(FPS), "-c:v", "libx264", "-crf", "18", "-preset", "medium", out)
        seg.append(out)
    # sottotitoli: i pezzi di ogni blocco divisi in proporzione ai caratteri
    righe, t0 = [], 0.0
    for i, b in enumerate(blocchi):
        parl = dur[i] - CODA
        pz = pezzi(sottotitolo(b["testo"]))
        tc = sum(len(p) for p in pz) or 1
        t = t0
        for p in pz:
            dt = parl * len(p) / tc
            righe.append((t, t + dt, p)); t += dt
        t0 += dur[i]
    ass = os.path.join(lav, "sottotitoli.ass")
    with open(ass, "w") as f:
        f.write("[Script Info]\nScriptType: v4.00+\nPlayResX: 1920\nPlayResY: 1080\n\n[V4+ Styles]\n"
                "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n"
                "Style: S,Inter SemiBold,44,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,2,170,170,52,1\n\n"
                "[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n")
        for a, b2, p in righe:
            f.write(f"Dialogue: 0,{tempo_ass(a)},{tempo_ass(b2)},S,,0,0,0,,{p}\n")
    lista = os.path.join(lav, "lista.txt")
    open(lista, "w").write("".join(f"file '{os.path.abspath(s)}'\n" for s in seg))
    alist = os.path.join(lav, "alista.txt")
    open(alist, "w").write("".join(f"file '{os.path.abspath(os.path.join(lav, 'blocchi', b['id'] + '.wav'))}'\n" for b in blocchi))
    sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", alist, "-c:a", "pcm_s16le", os.path.join(lav, "voce.wav"))
    finale = os.path.splitext(js)[0] + ".mp4"
    sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lista, "-i", os.path.join(lav, "voce.wav"),
       "-vf", f"subtitles={ass}:fontsdir=/usr/share/fonts,fade=t=in:st=0:d=0.4",
       "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
       "-c:v", "libx264", "-crf", "23", "-tune", "stillimage", "-preset", "slow", "-pix_fmt", "yuv420p",
       "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", "-shortest", finale)
    print(f"{os.path.basename(finale)}: {sum(dur):.1f} s, {n} scene, grezzo {tot:.1f} s")
    json.dump({"durate": dur, "totale": sum(dur)}, open(os.path.join(lav, "durate.json"), "w"))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
