#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""L'aritmetica del MASTER §2, in un posto solo.

Tutto discende da due risposte dell'utente: la durata e il formato. Qui si
calcolano i numeri che ne derivano - quanti caratteri scrivere, quanti blocchi,
quanto dura la copertina, quanto e' alta la fascia dei sottotitoli - e li
leggono tutti gli altri strumenti. Tenerne una seconda copia altrove vuol dire
che prima o poi le due divergono in silenzio, ed e' il tipo di errore che si
scopre a montaggio fatto.

    python3 aritmetica.py      stampa la scheda dei conti
"""
import json
from pathlib import Path

QUI = Path(__file__).resolve().parent

# Misurata, non stimata: e' la velocita' della traccia DOPO il filtro di ritmo.
# Su otto lavorazioni il reale e' andato da 15,8 a 17,6 car/s, e lo scarto
# dipende dalla densita' di cifre, non dal caso.
CPS = 17.0

# Il tetto duro del servizio di montaggio: 50 scene per video, copertina e
# chiusura comprese.
TETTO_SCENE = 50

# La durata di una singola inquadratura. Sotto i 4 s la clip non fa in tempo a
# leggersi; sopra i 14 s una sola immagine in movimento stanca, qualunque cosa
# stia dicendo la voce. Nove secondi e' il passo che regge senza annoiare.
SPALLA_MIN, SPALLA_TIPO, SPALLA_MAX = 4.0, 9.0, 14.0

CANVAS = {"16:9": (1920, 1080), "9:16": (1080, 1920), "1:1": (1080, 1080),
          "4:5": (1080, 1350), "5:4": (1350, 1080)}

def profilo(dove=None):
    return json.loads((Path(dove) if dove else QUI/"profilo.json").read_text(encoding="utf-8"))

def cartelli(durata):
    """Copertina e chiusura in proporzione al video.

    Dieci secondi di chiusura su un video da nove minuti sono un titolo di coda;
    su una clip da quaranta secondi sono un quarto del video."""
    if durata <= 90:   return 1.5, 3.0
    if durata <= 300:  return 2.0, 6.0
    return 3.0, 10.0

def CONTI(p=None):
    p = p or profilo()
    durata = float(p["durata_richiesta_s"])
    cop, chi = cartelli(durata)
    parlato = durata - cop - chi
    if parlato <= 0:
        raise SystemExit(f"durata {durata} s: non ci sta nemmeno la copertina")

    caratteri = parlato * CPS
    # Il numero di blocchi e' il numero di inquadrature: si sceglie dal passo
    # tipico e si taglia sul tetto delle scene, non viceversa.
    n = max(1, min(TETTO_SCENE - 2, round(parlato / SPALLA_TIPO)))
    spalla = parlato / n

    avvisi = []
    if spalla > SPALLA_MAX:
        avvisi.append(
            f"{spalla:.1f} s per blocco: oltre i {SPALLA_MAX:.0f} s di tetto. "
            f"Un video cosi' non sta in un render solo — va diviso in parti da "
            f"{(TETTO_SCENE-2)*SPALLA_MAX/60:.0f} minuti di parlato al massimo "
            f"e concatenato in locale (§4, passo 8).")
    if spalla < SPALLA_MIN:
        avvisi.append(f"{spalla:.1f} s per blocco: sotto i {SPALLA_MIN:.0f} s. "
                      f"Meno blocchi e inquadrature piu' lunghe.")

    w, h = CANVAS[p["formato"]]
    # La fascia bassa dove vanno i sottotitoli. In verticale sta piu' in alto:
    # sotto ci passa l'interfaccia della piattaforma, che ne mangia un pezzo.
    margine = 0.18 if h > w else 0.09
    return {
        "durata": durata, "copertina": cop, "chiusura": chi, "parlato": parlato,
        "caratteri": round(caratteri), "blocchi": n, "scene": n + 2,
        "spalla": round(spalla, 2),
        "car_per_blocco": round(caratteri / n),
        "tetto_blocco": round(SPALLA_MAX * CPS),
        "pavimento_blocco": round(SPALLA_MIN * CPS),
        "larghezza": w, "altezza": h, "formato": p["formato"],
        "base_sottotitoli": round(h * margine),
        "avvisi": avvisi,
    }

if __name__ == "__main__":
    p = profilo(); c = CONTI(p)
    print(f'{p["titolo"]}\n')
    print(f'  formato          {c["formato"]}  ·  {c["larghezza"]}x{c["altezza"]}')
    print(f'  durata chiesta   {int(c["durata"]//60)}:{c["durata"]%60:04.1f}')
    print(f'  copertina        {c["copertina"]} s      chiusura {c["chiusura"]} s')
    print(f'  parlato          {c["parlato"]:.1f} s')
    print(f'  caratteri        {c["caratteri"]}  (a {CPS} car/s)')
    print(f'  blocchi          {c["blocchi"]}   scene {c["scene"]}/{TETTO_SCENE}')
    print(f'  passo            {c["spalla"]} s per inquadratura')
    print(f'  per blocco       {c["car_per_blocco"]} car  '
          f'(fra {c["pavimento_blocco"]} e {c["tetto_blocco"]})')
    print(f'  sottotitoli      base a {c["base_sottotitoli"]} px dal fondo')
    for a in c["avvisi"]: print(f'\n  ATTENZIONE: {a}')
