#!/usr/bin/env python3
"""Appaia le code trascritte ai confini dei blocchi, per contenuto.

    python3 verifica.py <dir> <file-trascrizione>

Tagliare la trascrizione in frasi e appaiarla ai confini in ordine non
funziona: `scribe` ogni tanto salta una coda, ne unisce due, oppure ne spezza
una in due perche' il blocco finiva con due frasi. In tutti e tre i casi da li'
in poi tutto scivola, e sembra sbagliato mezzo montaggio.

Qui ogni pezzo va al confine la cui fine di blocco lo contiene, cercando dal
confine corrente in avanti — e potendo restare su quello di prima, cosi' due
pezzi dello stesso blocco non fanno scivolare niente: vince l'ultimo, che e'
quello attaccato al taglio. I confini rimasti senza pezzo restano vuoti in
code.json, e `correggi` li lascia dove sono.
"""
import json, re, sys, unicodedata

d, ftrans = sys.argv[1], sys.argv[2]
B = {x['id']: x['text'] for x in json.load(open(f'{d}/blocchi.json'))}
meta = json.load(open(f'{d}/prova_meta.json'))

pezzi = [p.strip().strip('"').strip().rstrip('.?!"»”').strip()
         for p in re.split(r'(?<=[.?!])["»”]?\s+', open(ftrans).read().strip()) if p.strip()]

def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.replace("'", ' ').replace('’', ' ')
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()

fini = [norm(B[m['fine_di']]) for m in meta]

def coda_di(pezzo, i):
    """La coda cade proprio in fondo al blocco: il taglio li' e' giusto."""
    p = norm(pezzo).split()
    # Almeno due parole: con una sola, «arrabbiato» aggancia qualunque blocco
    # che finisca per «arrabbiato», e un confine sbagliato passa per giusto.
    minimo = 1 if len(p) == 1 else 2
    for quante in range(min(4, len(p)), minimo - 1, -1):
        if fini[i].endswith(' '.join(p[-quante:])):
            return True
    return False

code = [''] * len(meta)
j = 0
for pezzo in pezzi:
    # Prima si cerca un confine dove la coda cade in fondo: quello e' un
    # aggancio sicuro, e ancora il resto dell'appaiamento. Solo se non c'e'
    # il pezzo va al confine corrente, che e' allora un taglio fuori posto.
    for i in range(max(0, j - 1), min(j + 4, len(meta))):
        if coda_di(pezzo, i):
            code[i] = pezzo
            j = i + 1
            break
    else:
        if j < len(meta):
            code[j] = pezzo; j += 1

json.dump(code, open(f'{d}/code.json', 'w'), ensure_ascii=False, indent=0)
vuoti = [m['fine_di'] for m, c in zip(meta, code) if not c]
bad = 0
for m, c in zip(meta, code):
    if not c: continue
    coda = norm(c); fine = norm(B[m['fine_di']])
    if not (fine.endswith(' '.join(coda.split()[-2:])) or fine.endswith(coda.split()[-1])):
        bad += 1
        print(f"  ! {m['fine_di']} «{c}»  <<< ...{B[m['fine_di']][-52:]}")
print(f'{len(pezzi)} pezzi, {len(meta)} confini | senza coda: {vuoti or "nessuno"} | fuori posto: {bad}')
