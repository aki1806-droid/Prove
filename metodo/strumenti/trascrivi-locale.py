#!/usr/bin/env python3
"""Trascrive in locale (faster-whisper, CPU) le tracce grezze di una lezione,
quando i crediti ElevenLabs non bastano per la trascrizione.

uso: trascrivi-locale.py <lezione> [A|B ...]     (da progetti/)

Scrive audio/trascrizioni/L.txt (come voce-scarica.py) e audio/parole-L.json,
e un file di stato compatibile con confini-parole.py:
audio/stato-locale.json  con  transcripts[].generation_id = "locale-L".
Quindi:  confini-parole.py <lezione> <lezione>/audio/stato-locale.json A=locale-A B=locale-B

Il modello «small» sbaglia piu' parole del trascrittore ElevenLabs: i «buchi»
di verifica-testo vanno controllati a orecchio o con i tempi delle parole.
Richiede: python3 -m pip install faster-whisper (il modello si scarica da Hugging Face).
"""
import json, sys
from pathlib import Path
from faster_whisper import WhisperModel

D = Path(sys.argv[1]).resolve()
tracce = sys.argv[2:] or ["A", "B"]
m = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=4)
stato_p = D/"audio"/"stato-locale.json"
stato = json.loads(stato_p.read_text(encoding="utf-8")) if stato_p.exists() else {"transcripts": []}
for L in tracce:
    segs, _ = m.transcribe(str(D/"audio"/f"grezzo-{L}.mp3"), language="it",
                           word_timestamps=True, beam_size=1)
    testo, parole = [], []
    for s in segs:
        testo.append(s.text.strip())
        parole += [{"text": w.word.strip(), "start": round(w.start, 2), "end": round(w.end, 2), "type": "word"}
                   for w in s.words]
    (D/"audio"/"trascrizioni").mkdir(exist_ok=True)
    (D/"audio"/"trascrizioni"/f"{L}.txt").write_text(" ".join(testo), encoding="utf-8")
    (D/"audio"/f"parole-{L}.json").write_text(json.dumps(parole), encoding="utf-8")
    stato["transcripts"] = [t for t in stato["transcripts"] if t["generation_id"] != f"locale-{L}"]
    stato["transcripts"].append({"generation_id": f"locale-{L}", "text": " ".join(testo), "words": parole})
    stato_p.write_text(json.dumps(stato), encoding="utf-8")
    print(f"{D.name} {L}: {len(parole)} parole")
