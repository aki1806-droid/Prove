#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Passo 3 del MASTER: da blocchi.json ai prompt delle clip.

Un prompt e' fatto di tre pezzi, e due su tre sono identici per tutte le clip:

  carta visiva   il preambolo, uguale parola per parola in tutti i prompt.
                 E' l'unica cosa che tiene insieme quaranta clip generate una
                 per una: se cambia anche solo l'obiettivo, si vede allo stacco.
  inquadratura   l'unico pezzo che cambia, e viene dalla riga del blocco:
                 e' li' che si decide la coerenza col parlato.
  coda           i divieti. Servono tutti, e ognuno e' costato una clip buttata.

  python3 clip/prompt.py            scrive clip/prompts.json e li stampa
  python3 clip/prompt.py s07 s12    solo quei blocchi (per rigenerarne uno)
"""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from aritmetica import CONTI, profilo

QUI, RADICE = Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent

# Il modello non legge un esadecimale, ma legge un nome di colore. Si danno
# tutti e due: il nome perche' serva, la cifra perche' il registro dica
# esattamente quale palette era in uso.
NOMI = {
  (255,255,255):"white",(244,241,234):"warm off-white",(240,240,240):"light grey",
  (200,200,200):"grey",(128,128,128):"mid grey",(60,60,60):"charcoal",
  (0,0,0):"black",(120,72,40):"warm brown",(166,71,30):"burnt orange",
  (215,3,40):"deep red",(150,20,20):"dark red",(230,150,60):"amber",
  (215,190,110):"sand",(60,110,80):"forest green",(0,98,58):"deep green",
  (46,74,63):"dark teal green",(62,111,168):"steel blue",(20,40,90):"navy",
  (120,90,160):"muted violet",(200,200,160):"pale olive",
}

def nome(hexs):
    r, g, b = (int(hexs[i:i+2], 16) for i in (1, 3, 5))
    # distanza pesata sui coni: il verde pesa piu' del blu
    return min(NOMI.items(), key=lambda kv: 2*(kv[0][0]-r)**2 + 4*(kv[0][1]-g)**2
                                            + 3*(kv[0][2]-b)**2)[1]

# Ognuno di questi e' un errore gia' pagato, non una precauzione generica:
#  - il testo generato torna storpiato e sopra ci va comunque il nostro;
#  - i volti riconoscibili sono un problema di liberatoria, non di stile;
#  - l'audio della clip parlerebbe sopra la voce (e va tolto anche al montaggio);
#  - il taglio interno fa cambiare scena a meta' blocco, e il parlato non segue;
#  - i bordi neri arrivano quando il modello sceglie un aspetto suo.
CODA = ("no on-screen text, no captions, no subtitles, no lettering, no logos, "
        "no watermarks, no user interface. No recognisable faces looking at camera. "
        "No speech, no dialogue, no music. Single continuous shot, no cuts, no scene "
        "change. Full frame, no letterboxing, no black bars, no split screen.")

def prompts(soli=None):
    p = profilo(); c = CONTI(p)
    g = p["generatore"]
    bl = json.loads((RADICE/"copione"/"blocchi.json").read_text(encoding="utf-8"))
    pal = p["palette"]
    colori = ", ".join(f"{nome(v)} ({v})" for v in pal.values())
    testa = (f'{p["carta_visiva"]} Colour palette: {colori}. '
             f'Aspect ratio {p["formato"]}, cinematic, {g.get("durata_base_s", 8)} seconds.')
    fuori = []
    for b in bl:
        if soli and b["id"] not in soli:
            continue
        fuori.append({
            "id": b["id"],
            "modello": g["modello"],
            "aspetto": g.get("aspetto", p["formato"]),
            "durata": g.get("durata_base_s", 8),
            "prompt": f'{testa} {b["inquadratura"].rstrip(". ")}. {CODA}',
        })
    return p, c, fuori

if __name__ == "__main__":
    soli = set(sys.argv[1:]) or None
    p, c, fuori = prompts(soli)
    (QUI/"prompts.json").write_text(json.dumps(fuori, ensure_ascii=False, indent=1),
                                    encoding="utf-8")
    for f in fuori:
        print(f'\n── {f["id"]}  [{f["modello"]}  {f["aspetto"]}  {f["durata"]}s]\n{f["prompt"]}')
    # I lotti servono a non perdere il filo: dodici richieste per volta e' il
    # massimo che il generatore accetta in una chiamata sola.
    n = len(fuori)
    print(f'\n\n{n} prompt in clip/prompts.json  ·  '
          f'{-(-n//12)} lotti da 12  ·  base {p["generatore"]["durata_base_s"]}s '
          f'per inquadrature da {c["spalla"]}s')
    print("Prima del lotto: preventivo del costo (get_cost), sempre. "
          "Le clip costano piu' della voce.")
