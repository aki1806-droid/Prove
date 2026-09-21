#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Confronta la trascrizione di ogni traccia col copione, parola per parola.

Serve a trovare i buchi della voce. Non verifica dove cadono i tagli - quello lo
fanno l'allineamento DTW e verifica-locale.py - ma verifica che nel grezzo ci
sia tutto quello che c'era nel copione.

E' il controllo che il conteggio dei caratteri NON puo' fare: un blocco che
perde sei parole resta dentro la fascia di velocita' (280 caratteri in 17,5 s
fanno 16 car/s; togline 40 e sono 18,7, ancora in fascia). La fascia dice come
va il ritmo, non che cosa e' stato detto.

Le differenze di sola resa non sono errori, ma NON si trattano con una
tolleranza generica: ogni resa e' una riga dichiarata qui sotto. Quella che
ricorre di piu' e' il numero pronunciato per esteso - il copione, per sua
regola, non ha una cifra, e il trascrittore le riscrive tutte in cifre - e si
tratta con un convertitore dei cardinali italiani applicato ai DUE testi.
"""
import json, re, sys, unicodedata, difflib
from pathlib import Path

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent
BUCO = 3   # da quante parole di fila in poi il salto e' sospetto

UNI   = {"uno":1,"un":1,"zero":0,"due":2,"tre":3,"quattro":4,"cinque":5,
         "sei":6,"sette":7,"otto":8,"nove":9}
DIECI = {"dieci":10,"undici":11,"dodici":12,"tredici":13,"quattordici":14,
         "quindici":15,"sedici":16,"diciassette":17,"diciotto":18,"diciannove":19}
DEC   = {"venti":20,"trenta":30,"quaranta":40,"cinquanta":50,
         "sessanta":60,"settanta":70,"ottanta":80,"novanta":90}

def _sotto100(s):
    if s == "": return 0
    # le forme tronche davanti a un sostantivo: «ventun anni», «trent anni»
    if s == "ventun": return 21
    if s == "trent":  return 30
    if s in DIECI: return DIECI[s]
    if s in DEC:   return DEC[s]
    if s in UNI:   return UNI[s]
    for d, v in DEC.items():
        for u in ("uno","otto"):                    # ventuno, quarantotto
            if s == d[:-1]+u: return v+UNI[u]
        if s.startswith(d):
            r = s[len(d):]
            if r in UNI: return v+UNI[r]
            if r == "tre": return v+3
    return None

def _sotto1000(s):
    if s == "": return 0
    i = s.find("cento")
    if i >= 0:
        pre, post = s[:i], s[i+5:]
        c = 1 if pre == "" else UNI.get(pre)
        if c is not None:
            p = _sotto1000(post) if post else 0
            if p is not None: return c*100+p
    return _sotto100(s)

def cifra(s):
    """La parola-numero come cifra, oppure la parola stessa se non lo e'."""
    if s.startswith("mille"):
        p = _sotto1000(s[5:])
        if p is not None: return str(1000+p)
    i = s.find("mila")
    if i > 0:
        m, p = _sotto1000(s[:i]), _sotto1000(s[i+4:])
        if m is not None and p is not None: return str(m*1000+p)
    n = _sotto1000(s)
    return s if n is None else str(n)

# Rese dichiarate una per una, viste sulle trascrizioni vere di questa voce.
RESE = [
 # Il separatore delle migliaia. Il trascrittore scrive «28.000» e «6.440»; il
 # copione dice «ventottomila», che il convertitore rende «28000». Tolta la
 # punteggiatura resterebbero «28 000» contro «28000», cioe' due parole contro
 # una. Si uniscono PRIMA di togliere la punteggiatura.
 # Solo il PUNTO e lo spazio unificatore, MAI lo spazio normale: con lo spazio
 # la regola univa anche «dal 2027. 130,20 euro» in un unico numero «2027130» e
 # inventava un buco che non c'era. Una tolleranza troppo larga non e' piu' una
 # resa dichiarata: e' esattamente cio' che il MASTER dice di non fare.
 (r"(\d)[.\u00a0](\d{3})\b",             r"\1\2"),
 (r"(\d)[.\u00a0](\d{3})\b",             r"\1\2"),   # due volte: 1.234.567
 # Il simbolo dell'euro si mangia la parola: «€181» contro «centottantuno euro».
 # Si espande a parola, e la riga degli importi con i centesimi viene dopo.
 # gli importi: il copione dice «due euro e sette centesimi», la trascrizione
 # scrive «€2,07». Si riducono entrambi alla stessa forma: euro N centesimi M.
 (r"€\s*(\d+),(\d+)",                      r" \1 euro \2 centesimi "),
 (r"(\d+)\s*euro\s+e\s+(\d+)\s*centesimi", r" \1 euro \2 centesimi "),
 (r"(\d+)\s*euro\s+e\s+(\d+)\b",           r" \1 euro \2 centesimi "),
 # le percentuali
 (r"(\d+)\s*%",                            r" \1 per cento "),
 (r"€\s*(\d+)(?![,\d])",                   r" \1 euro "),
 (r"\bvirgola\b",                          " , "),
 # le sigle: il copione le punta, il trascrittore a volte no
 (r"\bi\.?\s*v\.?\s*c\.?\b",               " ivc "),
 (r"\bd\.?\s*e\.?\s*p\.?\b",               " dep "),
 (r"\bi\.?\s*q\.?\s*p\.?\b",               " iqp "),
 (r"\bc\.?\s*p\.?\s*d\.?\s*e\.?\s*l\.?\b", " cpdel "),
 (r"\bf\.?\s*credito\b",                   " fcredito "),
 (r"\badd\.?\b",                           " add "),
 (r"\barr\.?\b",                           " arr "),
 (r"\bcong\.?\b",                          " cong "),
 (r"\brimb\.?\b",                          " rimb "),
 # composti scritti in due modi
 (r"\bpart[\s-]*time\b",                   " parttime "),
 (r"\bfac[\s-]*simile\b",                  " facsimile "),
 (r"\bday[\s-]*hospital\b",                " dayhospital "),
 (r"\bsonno[\s-]*veglia\b",                " sonnoveglia "),
 (r"\bsocio[\s-]*sanitari\b",              " sociosanitari "),
 # il numero di lezione e il 730
 (r"\bsettecentotrenta\b",                 " 730 "),
 (r"\bcentocinquanta\s+ore\b",             " 150 ore "),
 (r"\bcentodiciotto\b",                    " 118 "),
 (r"\bcentoquattro\b",                     " 104 "),
]

def parole(s):
    s = re.sub(r"\[[a-z]+\]", " ", s.lower())
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.replace("'", " ").replace("’", " ")
    for pat, con in RESE: s = re.sub(pat, con, s)
    s = re.sub(r"[^a-z0-9]+", " ", s)
    for pat, con in RESE: s = re.sub(pat, con, s)
    w = [cifra(p) for p in re.findall(r"[a-z0-9]+", s)]
    return centesimi(w)

def centesimi(w):
    """«due euro e sette centesimi» e «€2,07» devono diventare la stessa cosa.

    Dopo la conversione dei cardinali il copione da' «2 euro e 7 centesimi» e la
    trascrizione «2 euro 07 centesimi»: restano diversi per la «e» di mezzo e
    per lo zero davanti. Si uniformano qui, e sono gli unici sei scarti che la
    traccia 3 segnalava.
    """
    out, i = [], 0
    while i < len(w):
        if (w[i].isdigit() and i+1 < len(w) and w[i+1] == "euro"):
            j = i+2
            if j < len(w) and w[j] == "e": j += 1
            if j < len(w) and w[j].isdigit():
                cent = w[j].zfill(2)
                seg = [w[i], "euro", cent]
                if j+1 < len(w) and w[j+1] == "centesimi": j += 1
                seg.append("centesimi")
                out += seg; i = j+1; continue
        out.append(w[i]); i += 1
    return out

scene  = {x["id"]: x for x in json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))}
tracce = json.loads((RADICE/"copione"/"tracce.json").read_text(encoding="utf-8"))

esiti, guai, fatte = {}, 0, 0
for t in tracce:
    f = QUI/"trascrizioni"/f"traccia{t['traccia']:02d}.txt"
    if not f.exists(): continue
    fatte += 1
    atteso = [(p, i) for i in t["scene"] for p in parole(scene[i]["text"])]
    detto  = parole(f.read_text(encoding="utf-8"))
    sm = difflib.SequenceMatcher(None, [p for p, _ in atteso], detto, autojunk=False)
    buchi, brevi = [], []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal": continue
        blocco = atteso[i1][1] if i1 < len(atteso) else atteso[-1][1]
        voce = {"blocco": blocco,
                "copione": " ".join(p for p, _ in atteso[i1:i2]) or "(nulla)",
                "detto": " ".join(detto[j1:j2]) or "(nulla)"}
        (buchi if (i2-i1) >= BUCO else brevi).append(voce)
    uguali = sum(k for _, _, k in sm.get_matching_blocks())
    pc = 100*uguali/len(atteso)
    esiti[t["traccia"]] = {"parole_copione": len(atteso), "parole_dette": len(detto),
                           "coincidenti": uguali, "percentuale": round(pc, 1),
                           "buchi": buchi, "scarti_brevi": brevi}
    guai += len(buchi)
    print(f"traccia {t['traccia']:2d}  {uguali:5d}/{len(atteso):5d} parole ({pc:5.1f}%)  "
          f"buchi da {BUCO}+ parole: {len(buchi):2d}   scarti brevi: {len(brevi)}")
    for b in buchi:
        print(f"      {b['blocco']}  copione: «{b['copione'][:90]}»")
        print(f"            detto: «{b['detto'][:90]}»")

(QUI/"esiti-testo.json").write_text(json.dumps(esiti, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"\ntracce verificate: {fatte} su {len(tracce)}")
print("nessun buco: la voce ha detto tutto" if not guai
      else f"ATTENZIONE: {guai} buchi da controllare a orecchio")
sys.exit(1 if guai else 0)
