#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Calendario dei diritti 2027 — la voce di un mese, scena per scena.

La voce viene da HeyGen come passante (ElevenLabs eleven_v4, voce clonata
«Luca Ward» del workspace HeyGen), in UNA traccia sola: il costo si arrotonda a
ogni chiamata. Fra una scena e l'altra il testo ha una pausa <break 2.0s>, e
HeyGen restituisce i tempi di ogni parola (audio/voce-heygen.json).

Qui:
  - si taglia la traccia al centro dei silenzi veri delle sette pause;
  - ogni scena si ripulisce del silenzio in testa e in coda;
  - S3: la regia chiede mezzo secondo dopo ogni «Falso». La pausa <break 0.5s>
    esce piu' corta (0,38-0,44 s misurati): si allunga a 0,6 s;
  - S7: «firma finale lenta», atempo 0,94 (il parametro speed di HeyGen viene
    ignorato);
  - i tempi delle parole seguono ogni ritocco, e servono ai sottotitoli e al
    titolo di S0, che compare parola per parola.

  python3 voce.py <cartella del mese>  ->  audio/voce/S0.wav ... S7.wav, audio/voce/voce.json

Nata per febbraio, uguale per tutti i mesi.
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np
import imageio_ffmpeg

QUI = Path(sys.argv[1]).resolve()
FF = imageio_ffmpeg.get_ffmpeg_exe()
OUT = QUI/"audio"/"voce"; OUT.mkdir(parents=True, exist_ok=True)
SR = 48000
PAUSA_FALSO = 0.6
TEMPO_FIRMA = 0.94

def leggi(f):
    raw = subprocess.run([FF, "-v", "error", "-i", f, "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
                         capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

def scrivi(f, x):
    subprocess.run([FF, "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", f],
                   input=x.astype(np.float32).tobytes(), check=True)

def silenzi(x, soglia_db=-45, minimo=0.1):
    """Intervalli (inizio, fine) in secondi dove l'inviluppo sta sotto soglia."""
    w = int(SR * 0.01)
    n = len(x) // w
    env = np.sqrt((x[:n*w].reshape(n, w) ** 2).mean(axis=1) + 1e-12)
    zitto = 20 * np.log10(env) < soglia_db
    out, i = [], 0
    while i < n:
        if zitto[i]:
            j = i
            while j < n and zitto[j]: j += 1
            if (j - i) * 0.01 >= minimo: out.append((i * 0.01, j * 0.01))
            i = j
        else: i += 1
    return out

x = leggi(QUI/"audio"/"voce-heygen.wav")
ts = json.loads((QUI/"audio"/"voce-heygen.json").read_text(encoding="utf-8"))["word_timestamps"]
tl = json.loads((QUI/"pacchetto"/"timeline.json").read_text(encoding="utf-8"))

# le parole di ogni scena, separate dalle pause lunghe
scene_parole, cur = [], []
for w in ts:
    if w["word"] in ("<start>", "<end>"): continue
    if w["word"].startswith('<break time="2.0s"'):
        scene_parole.append(cur); cur = []
    elif not w["word"].startswith("<break"):
        cur.append(w)
scene_parole.append(cur)
assert len(scene_parole) == len(tl["scene"]), (len(scene_parole), len(tl["scene"]))

# i tagli: centro del silenzio vero piu' vicino a ogni pausa lunga
lunghi = silenzi(x, minimo=1.2)
pause = [(w["start"], w["end"]) for w in ts if w["word"].startswith('<break time="2.0s"')]
tagli = []
for a, b in pause:
    s = min(lunghi, key=lambda p: abs((p[0]+p[1])/2 - (a+b)/2))
    tagli.append((s[0] + s[1]) / 2)
bordi = [0.0] + tagli + [len(x) / SR]

risultato = []
for k, (sc, parole) in enumerate(zip(tl["scene"], scene_parole)):
    a, b = bordi[k], bordi[k+1]
    seg = x[int(a*SR):int(b*SR)]
    sil = silenzi(seg, minimo=0.05)
    inizio = sil[0][1] if sil and sil[0][0] <= 0.01 else 0.0
    fine = sil[-1][0] if sil and sil[-1][1] >= len(seg)/SR - 0.02 else len(seg)/SR
    inizio = max(0.0, inizio - 0.03); fine = min(len(seg)/SR, fine + 0.08)
    seg = seg[int(inizio*SR):int(fine*SR)]
    # i tempi delle parole, nel tempo locale della scena; lo scarto fra i
    # tempi di HeyGen e l'audio vero si misura sulla prima parola
    sposta = (a + inizio + 0.03) - parole[0]["start"]
    loc = [{"w": p["word"], "da": p["start"] + sposta - (a + inizio),
            "a": p["end"] + sposta - (a + inizio)} for p in parole]

    note = []
    if sc["id"] == "S3":
        sil = silenzi(seg, minimo=0.08)
        aggiunte = []
        for i, p in enumerate(loc):
            if p["w"].startswith("Falso"):
                # il silenzio che segue la parola, misurato sull'audio
                cand = [s for s in sil if p["a"] - 0.25 <= s[0] <= p["a"] + 0.35]
                if not cand: raise SystemExit("nessuna pausa dopo «Falso»")
                s0, s1 = cand[0]
                manca = PAUSA_FALSO - (s1 - s0)
                if manca > 0:
                    aggiunte.append(((s0 + s1) / 2, manca))
                    note.append(f"pausa dopo «Falso» {s1-s0:.2f} -> {PAUSA_FALSO:.2f} s")
        for t, d in sorted(aggiunte, reverse=True):
            i = int(t * SR)
            seg = np.concatenate([seg[:i], np.zeros(int(d * SR), np.float32), seg[i:]])
            for p in loc:
                if p["da"] >= t: p["da"] += d; p["a"] += d
    if sc["id"] == "S7":
        f = OUT/"_s7.wav"; scrivi(f, seg)
        raw = subprocess.run([FF, "-v", "error", "-i", f, "-af", f"atempo={TEMPO_FIRMA}",
                              "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
        seg = np.frombuffer(raw, np.float32).copy(); f.unlink()
        for p in loc: p["da"] /= TEMPO_FIRMA; p["a"] /= TEMPO_FIRMA
        note.append(f"firma rallentata a {TEMPO_FIRMA}x")

    scrivi(OUT/f"{sc['id']}.wav", seg)
    risultato.append({"id": sc["id"], "durata": round(len(seg)/SR, 3), "parole": loc, "note": note})
    print(f"{sc['id']}  {len(seg)/SR:6.2f} s  {len(loc):3d} parole  " + "; ".join(note))

(OUT/"voce.json").write_text(json.dumps(risultato, indent=1, ensure_ascii=False), encoding="utf-8")
print(f"voce totale {sum(r['durata'] for r in risultato):.2f} s")
