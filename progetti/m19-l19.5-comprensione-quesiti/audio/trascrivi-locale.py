#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Trascrive le due tracce in locale, quando Scribe non c'e'.

  python3 audio/trascrivi-locale.py          (tutte e due le tracce)
  python3 audio/trascrivi-locale.py B        (una sola)

faster-whisper, modello small, su CPU. Scrive trascrizioni/{A,B}.txt e
trascrizioni/{A,B}-parole.json nello stesso formato di Scribe, cosi'
verifica-testo.py e confini-parole.py girano senza cambiare niente.

E' nato quando i crediti ElevenLabs sono finiti a meta' modulo (19.3): la
voce si generava ancora, la trascrizione no. Costa zero e circa un minuto e
mezzo per traccia.

E' meno fine di Scribe, in modi che vanno saputi prima di leggere l'esito:
  - con la lingua forzata all'italiano, le frasi TUTTE inglesi le salta o le
    traduce: «Good morning, my name is Anna» torna vuoto. Un «buco» su una
    frase inglese si controlla ritrascrivendo quel blocco in inglese, e con
    la velocita' del blocco (se fosse saltato, sarebbe veloce);
  - attacca la fine di una parola all'inizio della successiva: confini-parole
    segnala FUORI tagli che stanno in un silenzio vero. Li separa aggancia.py;
  - storpia le parole lunghe e le sigle («la postro fosse» per «l'apostrofo
    S»): sono scarti di grafia, non buchi.
Il modello si scarica alla prima chiamata nella cartella WHISPER_DIR
(predefinita ~/.cache/whisper).
"""
import json, os, sys, time
from pathlib import Path
from faster_whisper import WhisperModel

QUI = Path(__file__).resolve().parent
tracce = sys.argv[1:] or ["A", "B"]
m = WhisperModel("small", device="cpu", compute_type="int8",
                 download_root=os.environ.get("WHISPER_DIR",
                                              os.path.expanduser("~/.cache/whisper")))
(QUI/"trascrizioni").mkdir(exist_ok=True)
for L in tracce:
    t = time.time()
    segs, _ = m.transcribe(str(QUI/f"grezzo-{L}.mp3"), language="it",
                           word_timestamps=True, vad_filter=False, beam_size=5)
    parole = [{"text": w.word.strip(), "type": "word",
               "start": round(w.start, 3), "end": round(w.end, 3)}
              for s in segs for w in s.words]
    (QUI/"trascrizioni"/f"{L}.txt").write_text(
        " ".join(p["text"] for p in parole) + "\n", encoding="utf-8")
    (QUI/"trascrizioni"/f"{L}-parole.json").write_text(json.dumps(
        {"words": parole, "motore": "faster-whisper small (locale)"},
        ensure_ascii=False), encoding="utf-8")
    print(f"{L}: {len(parole)} parole in {time.time()-t:.0f} s")
