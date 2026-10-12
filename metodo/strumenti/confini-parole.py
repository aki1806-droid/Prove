#!/usr/bin/env python3
"""Confronta i confini scelti da `tagli.py allinea` con quelli che si ricavano
dai tempi delle parole della trascrizione, e prepara correzioni.json.

uso: confini-parole.py <lezione> <stato.json> A=<gen_id trascrizione A> B=<gen_id B> [--scrivi]

Per ogni blocco cerca nella trascrizione le prime tre parole del suo testo,
dopo il blocco precedente; il confine giusto e' a meta' fra la fine della parola
prima e l'inizio della prima parola del blocco. Stampa i confini che si
spostano di piu' di SOGLIA secondi; con --scrivi li mette in
audio/correzioni.json (formato di `tagli.py correggi`, in secondi).

Ordine: tagli.py allinea  ->  questo  ->  tagli.py correggi  ->  tagli.py applica
(allinea ricalcola tutto: va rilanciato questo dopo ogni allinea).
"""
import json, re, subprocess, sys, unicodedata
from pathlib import Path

SOGLIA = 0.6
FINESTRA = 15.0  # secondi attorno al confine attuale in cui cercare l inizio del blocco

NUMERI = ("zero uno due tre quattro cinque sei sette otto nove dieci undici dodici tredici "
          "quattordici quindici sedici diciassette diciotto diciannove venti").split()

def norma(s):
    s = re.sub(r"\[[a-z ]+\]", " ", s.lower())
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    # il copione scrive i numeri in lettere, il trascrittore spesso in cifre
    return [NUMERI[int(t)] if t.isdigit() and int(t) < len(NUMERI) else t
            for t in re.split(r"[^a-z0-9]+", s) if t]

D = Path(sys.argv[1]).resolve()
stato = json.loads(Path(sys.argv[2]).read_text(encoding="utf-8"))
gen = dict(a.split("=") for a in sys.argv[3:] if "=" in a)
scrivi = "--scrivi" in sys.argv
testi = {b["id"]: b["text"] for b in json.loads((D/"copione"/"blocchi.json").read_text(encoding="utf-8"))}

def parole(gid):
    t = next(x for x in stato["transcripts"] if x["generation_id"] == gid)
    w = t.get("words") or []
    if t.get("words_truncated") or not w:
        j = json.loads(subprocess.run(["curl", "-sS", t["words_download_url"]], capture_output=True, text=True).stdout)
        w = j.get("words", j) if isinstance(j, dict) else j
    out = []
    for x in w:
        if x.get("type", "word") != "word": continue
        for tok in norma(x["text"]): out.append((tok, x["start"], x["end"]))
    return out

corr = {}
for L, gid in sorted(gen.items()):
    st = json.loads((D/"audio"/f"confini-{L}.json").read_text(encoding="utf-8"))
    ids, conf = st["ids"], st["confini"]
    w = parole(gid); toks = [t for t, _, _ in w]
    for k in range(1, len(ids)):
        # chiave lunga prima (cinque parole), poi piu' corta; solo vicino al
        # confine attuale e l'occorrenza piu' vicina: tre parole possono
        # ripetersi poco prima («due o tre di priorita'» / «... di valutazione»)
        tutte = norma(testi[ids[k]]); cand = []
        for n in (5, 4, 3):
            chiave = tutte[:n]
            cand = [i for i in range(1, len(toks) - n + 1)
                    if toks[i:i+n] == chiave and abs(w[i][1] - conf[k-1]) <= FINESTRA]
            if cand: break
        if not cand:
            print(f"  {L} {ids[k]}: inizio «{' '.join(chiave)}» non trovato, confine lasciato a {conf[k-1]:.2f}")
            continue
        trovato = min(cand, key=lambda i: abs(w[i][1] - conf[k-1]))
        nuovo = round((w[trovato-1][2] + w[trovato][1]) / 2, 2)
        delta = nuovo - conf[k-1]
        if abs(delta) > SOGLIA:
            print(f"  {L}[{k-1}] {ids[k-1]}|{ids[k]}  {conf[k-1]:.2f} -> {nuovo:.2f}  ({delta:+.2f} s)")
            corr.setdefault(L, {})[str(k-1)] = {"secondi": round(delta, 2)}
print(f"{sum(len(v) for v in corr.values())} confini da spostare")
if scrivi and corr:
    (D/"audio"/"correzioni.json").write_text(json.dumps(corr, indent=1), encoding="utf-8")
    print("scritto audio/correzioni.json: ora  python3 audio/tagli.py correggi  e  applica")
