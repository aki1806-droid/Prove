#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""La verifica dei CONFINI per trascrizione — quella che mancava.

verifica-testo.py dimostra che la voce ha detto tutto, ma non DOVE cadono i
tagli: la trascrizione di una traccia intera non porta i tempi. Questa risponde
all'altra domanda.

prova.mp3 contiene 1,6 s presi PRIMA di ogni taglio, separati da silenzio: se
un taglio e' al posto giusto, quello spezzone sono le ultime parole del blocco
che finisce li'. Letti in fila devono dare la sequenza delle chiuse di tutti i
blocchi, nell'ordine.

DUE strade sbagliate, provate e buttate, che valgono piu' del risultato:

1. Dividere la trascrizione in 186 frasi e confrontarle una a una. Il
   trascrittore ne ha unite due: da quel punto in poi ogni confronto sarebbe
   stato sfasato di uno, e avrebbe dichiarato sbagliati 130 confini giusti.

2. Cercare in avanti la chiusa di ogni blocco, avanzando via via. Basta che una
   chiusa finisca su una parola comune e l'avanzamento salta a un'occorrenza
   piu' in la': da li' in poi non ritrova piu' niente. Dava 25 «mancanti» in
   sequenze di sette, e nella trascrizione quelle parole c'erano tutte, in
   ordine — il difetto era il mio metodo, non i tagli.

Si allinea invece per intero, con una programmazione dinamica fra le 186 chiuse
attese e i frammenti della trascrizione, ammettendo che un frammento ne copra
due (la fusione del trascrittore). E' lo stesso principio del DTW che sceglie i
confini in tagli.py: decidere sull'insieme, non sul singolo passo.

Quante parole cercare: il ritaglio e' preso dall'audio GREZZO, 15,16 car/s, e
in 1,6 s comprende anche la pausa prima del taglio — restano una ventina di
caratteri, cioe' DUE parole. Chiederne quattro significa pretendere parole che
nello spezzone non sono mai entrate.
"""
import json, re, sys, unicodedata
from pathlib import Path

QUI  = Path(__file__).resolve().parent
CODA = 2

def parole(s):
    """L'apostrofo SPEZZA la parola: «all'altra» diventa «all» + «altra».

    Il trascrittore rende l'elisione staccata o la mangia, e tenendo la parola
    intera il confronto fallisce su una differenza di sola resa — lo stesso
    errore che la prima regola sul separatore delle migliaia aveva gia' fatto,
    inventando un buco che non c'era.
    """
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"\[[a-z]+\]", " ", s)
    return re.findall(r"[a-z0-9]+", s)

blocchi = json.loads((QUI.parent/"copione"/"blocchi.json").read_text(encoding="utf-8"))
tracce  = json.loads((QUI.parent/"copione"/"tracce.json").read_text(encoding="utf-8"))
elenco  = json.loads((QUI/"prova.json").read_text(encoding="utf-8"))
testo   = {b["id"]: b["text"] for b in blocchi if b["text"]}
grezzo  = (QUI/"trascrizioni"/"prova-confini.txt").read_text(encoding="utf-8")
frammenti = [parole(x) for x in re.split(r"(?<=[.!?])\s+", grezzo) if parole(x)]

# per ogni spezzone: il blocco che FINISCE li' e' quello PRIMA di `id` nella
# sua traccia — il ritaglio e' preso prima del taglio, non dopo.
ordine = {t["traccia"]: t["scene"] for t in tracce}
attesi = []
for e in elenco:
    sc = ordine[e["traccia"]]
    i = sc.index(e["id"])
    if i:
        attesi.append((e["n"], sc[i-1]))
code = [parole(testo[b])[-CODA:] for _, b in attesi]

def punteggio(coda, fr):
    """Quante parole della chiusa attesa stanno nella CODA del frammento."""
    if not coda: return 0
    finale = fr[-(len(coda)+2):]
    return sum(1 for p in coda if p in finale)

N, M = len(code), len(frammenti)
NEG = -10**6
A = [[NEG]*(M+1) for _ in range(N+1)]
scelta = [[None]*(M+1) for _ in range(N+1)]
A[0][0] = 0
for i in range(N+1):
    for j in range(M+1):
        if A[i][j] == NEG: continue
        base = A[i][j]
        if i < N and j < M:                                   # una chiusa, un frammento
            v = base + punteggio(code[i], frammenti[j])
            if v > A[i+1][j+1]: A[i+1][j+1], scelta[i+1][j+1] = v, ("1", i, j)
        if i+1 < N and j < M:                                 # due chiuse nello stesso frammento
            v = base + punteggio(code[i], frammenti[j]) + punteggio(code[i+1], frammenti[j])
            if v > A[i+2][j+1]: A[i+2][j+1], scelta[i+2][j+1] = v, ("2", i, j)
        if i < N and base - 1 > A[i+1][j]:                    # chiusa senza frammento
            A[i+1][j], scelta[i+1][j] = base - 1, ("s", i, j)
        if j < M and base - 1 > A[i][j+1]:                    # frammento di troppo
            A[i][j+1], scelta[i][j+1] = base - 1, ("f", i, j)

coppie = {}
i, j = N, M
while (i, j) != (0, 0):
    k, pi, pj = scelta[i][j]
    if   k == "1": coppie[pi] = pj; i, j = pi, pj
    elif k == "2": coppie[pi] = pj; coppie[pi+1] = pj; i, j = pi, pj
    elif k == "s": i = pi
    else:          j = pj

esiti, pieni, mezzi, persi = [], 0, 0, []
for i, (n, b) in enumerate(attesi):
    fr = frammenti[coppie[i]] if i in coppie else []
    p  = punteggio(code[i], fr)
    stato = "intero" if p == len(code[i]) else ("parziale" if p else "NON TROVATA")
    if   stato == "intero":   pieni += 1
    elif stato == "parziale": mezzi += 1
    else: persi.append((b, " ".join(code[i]), " ".join(fr)))
    esiti.append({"n": n, "blocco": b, "attesa": " ".join(code[i]),
                  "sentito": " ".join(fr), "esito": stato})

print(f"confini verificati per trascrizione: {len(attesi)}")
print(f"  chiusa attesa ritrovata per intero: {pieni}")
print(f"  ritrovata a meta':                  {mezzi}")
print(f"  NON ritrovata:                      {len(persi)}")
# Un confine non ritrovato non e' ancora una diagnosi. Si cerca DOVE si trovi
# davvero quello che si e' sentito: se sono le prime parole del blocco che
# doveva COMINCIARE li', il taglio e' in ritardo e il blocco precedente si e'
# mangiato l'attacco del successivo. E' l'unico modo per distinguere un taglio
# spostato da una resa storpiata del trascrittore.
def dove(frase, sospetti):
    n = " ".join(parole(frase))
    if not n: return None
    for idb in sospetti:
        m = " ".join(parole(testo[idb]))
        if n and n in m:
            return idb, 100 * m.index(n) // max(1, len(m))
    return None

dopo = {}
for e in elenco:
    sc = ordine[e["traccia"]]; i = sc.index(e["id"])
    if i: dopo[sc[i-1]] = e["id"]

if persi:
    print("\n  non ritrovati — dove sta davvero quello che si sente:")
    for b, att, sent in persi:
        seg = dopo.get(b)
        d = dove(sent, [x for x in (seg, b) if x])
        if d and d[0] == seg:
            print(f"    {b}  TAGLIO IN RITARDO: si sente «{sent}», che e' al "
                  f"{d[1]}% di {seg} — il blocco successivo e' gia' cominciato")
        elif d and d[0] == b:
            print(f"    {b}  taglio in anticipo: si sente «{sent}», che e' al "
                  f"{d[1]}% di {b} stesso")
        else:
            print(f"    {b}  attesa «{att}»  sentito «{sent}»  (non collocata)")
(QUI/"esiti-confini.json").write_text(json.dumps(esiti, indent=1, ensure_ascii=False),
                                      encoding="utf-8")
sys.exit(0 if not persi else 1)
