#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER.

E' l'unico file che si riscrive per ogni video. Ogni riga di BLOCCHI tiene
insieme le due cose che devono restare coerenti: quello che la voce dice e
quello che si vede mentre lo dice. Tenerle in due file separati vuol dire
scoprire a render fatto che l'inquadratura parla d'altro.

  (capitolo, inquadratura, posa in secondi, testo parlato)

L'inquadratura si scrive in inglese anche quando il video e' in italiano: i
modelli video sono addestrati su didascalie inglesi, e in inglese il vocabolario
di obiettivo, luce e movimento arriva preciso. Il parlato resta nella lingua del
video. Le due cose stanno sulla stessa riga proprio perche' si possano leggere
insieme: se l'inquadratura parla d'altro, si vede subito.
"""
import json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, CPS, TETTO_SCENE, profilo

# ---------------------------------------------------------------- il copione
CAPITOLI = {
 1: "Apertura",
 2: "Il gesto",
 3: "Chiusura",
}

BLOCCHI = [
 (1, "hands rolling up the shutter of a small workshop, morning light cutting "
     "sideways across a workbench covered in wood shavings, slow push in",
     0, "[warm] Ci sono mestieri che non si imparano guardando. Si imparano sbagliando, e poi rifacendo lo stesso gesto per anni."),
 (2, "close on a hand plane travelling along an oak board, the shaving curls up "
     "and falls out of focus, camera locked off",
     0, "La pialla toglie un decimo di millimetro alla volta. Non e' lentezza: e' l'unico modo per accorgersi dell'errore prima che diventi definitivo."),
 (3, "the empty workshop at the end of the day, light has moved onto the wall of "
     "hand tools hanging in order, very slow drift left",
     1.2, "[thoughtful] Alla fine della giornata il banco si pulisce. Domani si ricomincia dallo stesso gesto."),
]

# ------------------------------------------------------------------ controlli
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
# Segnali che un'inquadratura sta chiedendo due cose invece di una. Una clip
# generata con due azioni dentro le fa tutte e due male, e a meta' cambia
# stacco per conto suo: la coerenza col parlato si perde proprio li'.
DUE_COSE = (" then ", " after that", " cut to ", " next ", " followed by ",
            " poi ", " infine ", " si passa a ", " stacco ")
# Il testo a video lo mettiamo noi in fase di lavorazione. Chiesto al modello
# torna storpiato, in una lingua inventata, e non si puo' correggere.
VIETATI = ("text", "caption", "subtitle", "title card", "lettering", "writing",
           "logo", "watermark", "chart", "graph", "slide", "infographic",
           "scritta", "didascalia", "sottotitol", "cartello")

p = profilo()
c = CONTI(p)

blocchi = []
for i, (cap, inq, posa, txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id": f"s{i:02d}", "capitolo": cap, "inquadratura": inq.strip(),
                    "posa": posa, "text": txt})

errori, avvisi = [], list(c["avvisi"])
tot = sum(len(b["text"]) for b in blocchi)
nscene = len(blocchi) + 2
if nscene > TETTO_SCENE:
    errori.append(f"scene {nscene} > {TETTO_SCENE}")

for b in blocchi:
    acc = sorted({x for x in b["text"] if x in ACCENTATE})
    if acc:
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(acc))
    if len(b["text"]) > c["tetto_blocco"]:
        errori.append(f'{b["id"]}: {len(b["text"])} car, oltre il tetto di {c["tetto_blocco"]}')
    if len(b["text"]) < c["pavimento_blocco"]:
        avvisi.append(f'{b["id"]}: {len(b["text"])} car, sotto il pavimento di '
                      f'{c["pavimento_blocco"]} — l\'inquadratura non fa in tempo a leggersi')
    if not b["inquadratura"]:
        errori.append(f'{b["id"]}: inquadratura mancante')
    bassa = b["inquadratura"].lower()
    for s in DUE_COSE:
        if s in bassa:
            errori.append(f'{b["id"]}: l\'inquadratura chiede due cose ("{s.strip()}") — una per blocco')
    for v in VIETATI:
        if v in bassa:
            errori.append(f'{b["id"]}: l\'inquadratura chiede «{v}» — il testo a video lo mette clip/lavora.py')

tags = sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
tetto_tag = max(3, round(len(blocchi) / 8))
if tags > tetto_tag:
    errori.append(f"tag di intenzione: {tags} > {tetto_tag}")

scarto = len(blocchi) - c["blocchi"]
if abs(scarto) > 2:
    avvisi.append(f'{len(blocchi)} blocchi contro i {c["blocchi"]} dell\'aritmetica '
                  f'({scarto:+d}): le inquadrature escono '
                  f'{"corte" if scarto > 0 else "lunghe"}')

pose = sum(b["posa"] for b in blocchi)
parlato = tot/CPS + pose
durata = parlato + c["copertina"] + c["chiusura"]
atteso = c["durata"]

print(f'{p["titolo"]}   ·   {c["formato"]}   ·   {p["generatore"]["servizio"]}/'
      f'{p["generatore"]["modello"]}\n')
print(f'blocchi   {len(blocchi)}        scene {nscene}/{TETTO_SCENE}')
print(f'caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco  '
      f'(previsti {c["car_per_blocco"]})')
print(f'parlato   {parlato:.0f} s     montato {int(durata//60)}:{durata%60:04.1f}   '
      f'(chiesti {int(atteso//60)}:{atteso%60:04.1f}, stima a {CPS} car/s)')
print(f'tag       {tags}/{tetto_tag}      pose {sum(1 for b in blocchi if b["posa"])}')
print()
cur = None
for b in blocchi:
    if b["capitolo"] != cur:
        cur = b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    ps = f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car{ps}  {b["text"][:52]}...')
    print(f'          ↳ {b["inquadratura"][:86]}')

# Lo stacco fra le due tracce di voce cade su un cambio di capitolo, dove il
# cambio di tono e' voluto. Sotto i 5.000 caratteri la traccia e' una sola.
if tot < 4800:
    print(f'\ntraccia unica: {tot} car sotto il limite di 5.000 — '
          f'STACCO va sull\'ultimo blocco ({blocchi[-1]["id"]}), il gruppo B resta vuoto')
else:
    acc = 0; stacco = None; a = 0
    for i, b in enumerate(blocchi):
        acc += len(b["text"]) + 1
        if acc > tot/2 and stacco is None and i+1 < len(blocchi) \
           and b["capitolo"] != blocchi[i+1]["capitolo"]:
            stacco = b["id"]; a = acc
    print(f'\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)')

if avvisi:
    print("\nAVVISI:\n  " + "\n  ".join(avvisi))
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open(Path(__file__).resolve().parent/"blocchi.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
