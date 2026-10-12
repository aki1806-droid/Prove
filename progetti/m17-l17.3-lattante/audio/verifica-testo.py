#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Confronta la trascrizione di ogni traccia col copione, parola per parola.

Serve a trovare i buchi della voce: in 1.1 la sintesi aveva mangiato sei parole
di fila e il salto si vedeva solo cosi'. Non verifica dove cadono i tagli -
quello lo fanno l'allineamento DTW e verifica-locale.py - ma verifica che nel
grezzo ci sia tutto quello che c'era nel copione.

Le differenze di sola resa (accenti sciolti, acronimi, cifre scritte in lettere)
non sono errori: si normalizza prima di confrontare, e si segnalano solo le
sequenze di parole del copione che nella trascrizione mancano del tutto.
"""
import json, re, sys, unicodedata, difflib
from pathlib import Path

QUI    = Path(__file__).resolve().parent
RADICE = QUI.parent
# Lo stacco fra le due tracce e' dichiarato una volta sola, in tagli.py:
# tenerne una seconda copia qui vuol dire che prima o poi le due divergono
# in silenzio, e il confronto si fa sui blocchi sbagliati.
STACCO = re.search(r'^STACCO\s*=\s*"([^"]+)"',
                   (QUI/"tagli.py").read_text(encoding="utf-8"),
                   re.M).group(1)
BUCO   = 3   # da quante parole di fila in poi il salto e' sospetto

# I numeri di legge, di articolo e di anno sono la resa che ricorre di piu':
# il copione li scrive in cifre e il trascrittore, quando la voce li pronuncia
# per esteso, li riscrive a parole - e non in modo costante: sulla stessa
# lezione 1.8 la traccia A ha reso «739» come «settecentotrentanove» e la B
# come «739». Non e' una tolleranza generica: e' una regola dichiarata, che
# converte il numero cardinale italiano nella sua cifra, sui due testi.
UNI   = {"zero":0,"uno":1,"un":1,"due":2,"tre":3,"quattro":4,"cinque":5,
         "sei":6,"sette":7,"otto":8,"nove":9}
DIECI = {"dieci":10,"undici":11,"dodici":12,"tredici":13,"quattordici":14,
         "quindici":15,"sedici":16,"diciassette":17,"diciotto":18,"diciannove":19}
DEC   = {"venti":20,"trenta":30,"quaranta":40,"cinquanta":50,
         "sessanta":60,"settanta":70,"ottanta":80,"novanta":90}

def _sotto100(s):
    if s == "": return 0
    if s in DIECI: return DIECI[s]
    if s in DEC:   return DEC[s]
    if s in UNI:   return UNI[s]
    for d,v in DEC.items():
        # le forme elise: venti+uno = ventuno, quaranta+otto = quarantotto
        for u in ("uno","otto"):
            if s == d[:-1]+u: return v+UNI[u]
        if s.startswith(d):
            r = s[len(d):]
            if r in UNI: return v+UNI[r]
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
    # «zero» da solo: «cinque virgola zero» contro «5,0» (visto su 5.4).
    if s == "zero": return "0"
    if s.startswith("mille"):
        p = _sotto1000(s[5:])
        if p is not None: return str(1000+p)
    i = s.find("mila")
    if i > 0:
        m, p = _sotto1000(s[:i]), _sotto1000(s[i+4:])
        if m is not None and p is not None: return str(m*1000+p)
    n = _sotto1000(s)
    return s if n is None else str(n)

# Termini che copione e trascrizione scrivono in modo diverso pur dicendo la
# stessa cosa: la sigla sillabata torna incollata, il numero di lezione torna
# in cifre. Si uniformano sul testo grezzo, prima di spezzarlo in parole.
RESE = [
 (r"\bdi elle gi esse\b", " dlgs "),   # 12.1 s40-s41: le sigle dette lettera per lettera, trascritte compatte
 (r"\bdi pi ci emme\b", " dpcm "),
 (r"\bdi pi erre\b", " dpr "),
 (r"\bdi gi erre\b", " dgr "),
 (r"\bdi elle\b", " dl "),
 (r"\bdi emme\b", " dm "),
 (r"\belle erre\b", " lr "),
 (r"\belle\b", " l "),
 (r"\besse\b", " s "),
 (r"\b(\d+)\s+000\b", r"\g<1>000"),   # 11.8 s25-s26: il trascrittore scrive «100 000» per centomila
 (r"\bluca\b", " l uca "),               # 11.8 s26: «l'UCA» trascritto «luca»
 (r"\bl\s*m\s*/?\s*s\s*n\s*t\s*-?\s*1\b", " siglamagistrale "),
 (r"\b(elle\s+)?emme\s+esse\s+enne\s+ti\s+uno\b", " siglamagistrale "),
 (r"\blms\s*nt\s*1\b",                              " siglamagistrale "),
 (r"\bl\s*/?\s*s\s*n\s*t\s*-?\s*1\b",            " siglatriennale "),
 (r"\belle\s+esse\s+enne\s+ti\s+uno\b",            " siglatriennale "),
 (r"\bls\s*nt\s*1\b",                                " siglatriennale "),
 # I rimandi alle altre lezioni: il copione li scrive a parole, il
 # trascrittore in cifre.
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?uno\b",   " lezione11 "),
 (r"\b1[\s.]+1\b",                        " lezione11 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?due\b",   " lezione12 "),
 (r"\b1[\s.]+2\b",                        " lezione12 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?tre\b",   " lezione13 "),
 (r"\b1[\s.]+3\b",                        " lezione13 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?cinque\b"," lezione15 "),
 (r"\b1[\s.]+5\b",                        " lezione15 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?sei\b",   " lezione16 "),
 (r"\b1[\s.]+6\b",                        " lezione16 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?quattro\b"," lezione14 "),
 (r"\b1[\s.]+4\b",                        " lezione14 "),
 (r"\b(uno|1)[\s.]+(punto[\s.]+)?sette\b", " lezione17 "),
 (r"\b1[\s.]+7\b",                        " lezione17 "),
 # Fonetica: «illecito» e «il lecito» suonano identici in italiano.
 (r"\bil\s+leciti?o\b", " illecito "),
 # Le sigle: il trascrittore a volte le compita lettera per lettera.
 (r"\bf\s+n\s+o\s+p\s+i\b",             " fnopi "),
 (r"\bo\s+p\s+i\b",                       " opi "),
 (r"\bd\s+a\s+t\b",                       " dat "),
 (r"\be\s+c\s+m\b",                       " ecm "),
 # La lettera dell'articolo 9.2 GDPR: il copione la scrive come si pronuncia
 # («lettera acca»), il trascrittore la riporta come si scrive («lettera h»).
 (r"\blettera\s+(acca|h)\b",          " lettera acca "),
 # Il prefisso «post»: il copione lo stacca per farlo leggere bene, il
 # trascrittore lo riattacca. Sono la stessa parola, non una resa diversa.
 (r"\bpost\s+(operatori[ao]|operatorie|operatori)\b", r" post\1 "),
 # Parole che il trascrittore rende in modo suo, senza che la voce abbia
 # sbagliato: le spezza, le anglicizza, o le riscrive con la grafia piu'
 # comune di un cognome straniero.
 (r"\bmeta\s+paradigma\b",               " metaparadigma "),
 (r"\bnewman\b",                          " neuman "),
 (r"\bdiagnosis\b",                       " diagnosi "),
 (r"\banti\s+decubito\b",                 " antidecubito "),
 # Le unita' di misura: il copione le scrive per esteso perche' la voce le
 # legga bene, il trascrittore le abbrevia.
 (r"\bcentimetri\b",                       " cm "),
 # Le sigle lette come parola: il trascrittore le scrive come le sente, e
 # sente una vocale in meno.
 (r"\bsopie\b|\bsopi\b",                    " soapie "),
 (r"\bsop\b",                               " soap "),
 # Sigla piu' numero: il copione li stacca, il trascrittore li unisce.
 (r"\bnrs\s*(\d)\b",                      r" nrs \1 "),
 # Parole composte che il trascrittore stacca o attacca a suo gusto: sono la
 # stessa parola detta nello stesso modo, e la differenza e' solo ortografica.
 (r"\bmeta\s+analisi\b",                  " metanalisi "),
 (r"\bchecklist\b",                        " check list "),
 # Due grafie entrambe corrette: il copione scrive «etiologia», il
 # trascrittore sente «eziologia». La voce dice la stessa cosa.
 (r"\beziologia\b",                        " etiologia "),
 # Il cognome di una scala non e' una parola italiana, e il trascrittore lo
 # scrive come gli suona: su 2.8 tre volte in tre modi diversi.
 (r"\bconleys\b|\bconleigh\b",            " conley "),
]

def parole(s):
    s = re.sub(r"\[[a-z]+\]", " ", s.lower())
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    # La punteggiatura va tolta PRIMA delle sostituzioni: il trascrittore
    # scrive «F, N, O, P, I.» e con le virgole in mezzo nessuna regola
    # riconoscerebbe la sigla.
    # I decimali: il copione dice «uno virgola due» e «diciotto e mezzo», il
    # trascrittore scrive «1,2» e «18,5». La virgola decimale va salvata
    # PRIMA di togliere la punteggiatura, e le tre forme convergono su una
    # sola parola («1virgola2»), altrimenti «1 2» diventa un rimando alla
    # lezione 1.2 e il confronto segnala un buco che non c'e' (visto su 3.3).
    # Una frase che finisce con un numero e la successiva che comincia con
    # «E» («Raccomandazione 19. E un dettaglio») non e' un decimale: la
    # regola «numero e cifra» leggeva «19 e un» come 19,1 (visto su 5.2). La
    # «E» dopo il punto diventa «ee» su tutti e due i testi, prima di togliere
    # la punteggiatura.
    s = re.sub(r"\.\s+e\s+", ". ee ", s)
    s = re.sub(r"(\d),(\d)", r"\1virgola\2", s)
    # I segni: il trascrittore scrive «-2 e +2», il copione «meno due e piu' due»
    # (6.4): senza questa riga «2 e 2» diventava il decimale «2virgola2».
    s = re.sub(r"(?<![\w,.])-(\d)", r"meno \1", s)
    s = re.sub(r"\+(\d)", r"piu \1", s)
    # Le coppie di cifre legate da punto o trattino («4.6», «1-2») e le coppie
    # di numeri a parole con il trattino («uno-due») convergono qui, con la
    # punteggiatura ancora presente: una regola a coppie di parole qualunque
    # dipenderebbe dalla parita' delle parole che precedono, e su 4.2 dava
    # «lezione34» da una parte e «3 4virgola5» dall'altra.
    s = re.sub(r"\b(\d)[./\-](\d)\b", r" lezione\1\2 ", s)
    # ...ma non dentro un decimale: «zero virgola sei-uno virgola due» (6.7)
    # e' 0,6-1,2, non un rimando alla lezione 6.1.
    s = re.sub(r"(?<!virgola )\b(uno|due|tre|quattro|cinque|sei|sette|otto|nove)-(uno|due|tre|quattro|cinque|sei|sette|otto|nove)\b(?! virgola)",
               lambda m: f" lezione{cifra(m.group(1))}{cifra(m.group(2))} ", s)
    s = re.sub(r"[^a-z0-9]+", " ", s)
    # I rimandi alle lezioni di qualunque modulo: il copione dice «quattro
    # punto sei», il trascrittore scrive «4.6», che senza punteggiatura e'
    # «4 6». Le due forme convergono su «lezione46» PRIMA della regola
    # «numero e cifra», che altrimenti legge «6. E un» come 6,1 (visto su 4.1).
    # Vale anche per due cifre singole in fila («uno-due metri», «1-2»).
    def _lez(m):
        a, b = cifra(m.group(1)), cifra(m.group(2))
        return f" lezione{a}{b} " if a.isdigit() and b.isdigit() and len(a) == 1 and len(b) == 1 else m.group(0)
    s = re.sub(r"\b([a-z0-9]+)\s+punto\s+([a-z0-9]+)\b", _lez, s)
    s = re.sub(r"\b([a-z0-9]+)\s+litro\s+e\s+mezzo\b", lambda m: f" {cifra(m.group(1))}virgola5 ", s)
    s = re.sub(r"\b([a-z0-9]+)\s+e\s+mezzo\b",          lambda m: f" {cifra(m.group(1))}virgola5 ", s)
    # ...ma solo fra due numeri: «di unita' o di virgola. Per i farmaci» (5.3)
    # a fine blocco fondeva «di virgola per» su un lato solo. E a parole, non
    # con un'espressione regolare: «la virgola cinque virgola zero» (5.4) la
    # faceva fallire su «la virgola cinque» consumando il «cinque» che serviva
    # alla coppia vera.
    # «ventiquattro e nove» per 24,9: numero, «e», una cifra sola. Vale solo
    # se le due parti sono davvero numeri, altrimenti «e nove» resta com'e'.
    def _fondi(s):
        t, out, i = s.split(), [], 0
        while i < len(t):
            if i + 2 < len(t) and t[i + 1] in ("virgola", "e"):
                a, b = cifra(t[i]), cifra(t[i + 2])
                if a.isdigit() and b.isdigit() and (t[i + 1] == "virgola" or len(b) == 1):
                    out.append(f"{a}virgola{b}"); i += 3; continue
            out.append(t[i]); i += 1
        return " ".join(out)
    s = _fondi(s)
    for pat, con in RESE: s = re.sub(pat, con, s)
    return [cifra(p) for p in re.findall(r"[a-z0-9]+", s)]

def gruppi():
    b = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    i = [x["id"] for x in b].index(STACCO)
    return {"A": b[:i+1], "B": b[i+1:]}

esiti, guai = {}, 0
for nome, gruppo in gruppi().items():
    atteso = []
    for x in gruppo:
        for p in parole(x["text"]): atteso.append((p, x["id"]))
    detto = parole((QUI/"trascrizioni"/f"{nome}.txt").read_text(encoding="utf-8"))
    sm = difflib.SequenceMatcher(None, [p for p,_ in atteso], detto, autojunk=False)
    mancanti, sostituzioni = [], []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "replace" and (i2-i1) < BUCO:
            sostituzioni.append({
                "blocco": atteso[i1][1],
                "copione": " ".join(p for p,_ in atteso[i1:i2]),
                "detto": " ".join(detto[j1:j2]) or "(nulla)"})
        if tag in ("delete","replace") and (i2-i1) >= BUCO:
            mancanti.append({
                "blocco": atteso[i1][1],
                "parole_copione": " ".join(p for p,_ in atteso[i1:i2]),
                "al_loro_posto": " ".join(detto[j1:j2]) or "(nulla)",
            })
    uguali = sum(k for _,_,k in sm.get_matching_blocks())
    esiti[nome] = {"parole_copione": len(atteso), "parole_dette": len(detto),
                   "coincidenti": uguali, "buchi": mancanti,
                   "sostituzioni_brevi": sostituzioni}
    guai += len(mancanti)
    print(f"traccia {nome}  {uguali}/{len(atteso)} parole coincidenti "
          f"({100*uguali/len(atteso):.1f}%)   buchi da {BUCO}+ parole: {len(mancanti)}")
    for m in mancanti:
        print(f"    {m['blocco']}  copione: «{m['parole_copione']}»")
        print(f"          detto: «{m['al_loro_posto']}»")
    if sostituzioni:
        print(f"    scarti brevi (rese diverse, non buchi): {len(sostituzioni)}")
        for s2 in sostituzioni:
            print(f"      {s2['blocco']}  «{s2['copione']}» -> «{s2['detto']}»")

(QUI/"esiti-testo.json").write_text(json.dumps(esiti, ensure_ascii=False, indent=1), encoding="utf-8")
print("\n" + ("nessun buco: la voce ha detto tutto" if not guai
              else f"ATTENZIONE: {guai} buchi da controllare a orecchio"))
sys.exit(1 if guai else 0)
