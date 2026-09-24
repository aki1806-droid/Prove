#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Controllo dei confini SENZA rete, quando la trascrizione non e' disponibile.

Due controlli, e il secondo vale piu' del primo.

1. La firma statistica. Se un taglio scivola in avanti di una frase, il blocco
   prima diventa piu' lungo di quanto il suo testo prometta e quello dopo piu'
   corto: due scarti grandi, adiacenti e di segno opposto. E' un indizio, non
   una prova: su 2.6 ha segnalato s33/s34, e il taglio era giusto — il blocco
   e' un elenco di numeri, e la voce ci mette le pause che il peso non sa
   prevedere.

2. Dove cade il taglio. Un taglio giusto sta DENTRO una pausa vera della voce.
   Un taglio spostato sta in mezzo a una frase, e si vede senza sapere che cosa
   la voce dice. Questo non e' un indizio: un taglio nel parlato e' un errore,
   punto. E' il controllo da guardare per primo, ed e' quello che ha assolto
   s33/s34 in dieci secondi.

Non sostituisce prova.mp3 + controllo-per-trascrizione.py, che sa anche QUALE
frase e' finita dove; ma per «il taglio e' nel posto giusto?» basta.
"""
import json, re, statistics, importlib.util, subprocess
from pathlib import Path
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()

QUI = Path(__file__).resolve().parent
reg = json.loads((QUI/"audio"/"blocchi-audio.json").read_text(encoding="utf-8"))
testi = {x["id"]: x["text"] for x in
         json.loads((QUI/"copione"/"blocchi.json").read_text(encoding="utf-8"))}

# Il peso NON si riscrive qui. Su 2.4 la DTW e questo controllo pesavano i
# pezzi in due modi diversi, e per una lezione intera nessuno se n'e' accorto:
# il peso e' uno solo, sta in tagli.py, e qui si importa.
_spec = importlib.util.spec_from_file_location("_tagli", QUI/"audio"/"tagli.py")
_tagli = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(_tagli)

def peso(t):
    return _tagli.peso(re.sub(r"\[[a-z]+\]", "", t))

for L in ("A","B"):
    g = [r for r in reg if r["traccia"] == L]
    P = [peso(testi[r["id"]]) for r in g]
    D = [r["durata"] - r["posa"] for r in g]
    tasso = sum(P)/sum(D)
    res = [(d - p/tasso) for p,d in zip(P,D)]
    sd = statistics.pstdev(res)
    print(f"\ntraccia {L}   {tasso:.1f} peso/s   scarto tipico {sd:.2f} s")
    sosp = []
    for i,(r,e) in enumerate(zip(g,res)):
        seg = "  " if abs(e) < 1.5*sd else ("++" if e>0 else "--")
        if seg != "  ": sosp.append((i,r["id"],e))
        print(f"  {seg} {r['id']}  {r['durata']:5.2f}s   atteso {P[i]/tasso:5.2f}s   scarto {e:+5.2f}s")
    # la firma di un confine spostato: due scarti grandi, adiacenti, opposti
    print("  confini da guardare per primi:")
    trovati = False
    for a,b in zip(sosp, sosp[1:]):
        if b[0]-a[0] == 1 and a[2]*b[2] < 0:
            print(f"    fra {a[1]} e {b[1]}: {a[2]:+.2f}s / {b[2]:+.2f}s "
                  f"— il taglio sembra spostato di ~{abs(a[2]):.1f}s")
            trovati = True
    if not trovati: print("    nessuna coppia adiacente di segno opposto")


# La soglia va tenuta SOTTO la pausa minima che tagli.py accetta, che non e'
# una costante: la calcola per lezione. Con 0,15 s fissi questo controllo ha
# accusato il taglio s45 di 2.5, che cadeva nel centro esatto di una pausa di
# 0,143 s — un falso allarme prodotto dal controllo, non dal taglio. A 0,05 s
# nessuna pausa vera sfugge, e la durata stampata accanto a ogni taglio lascia
# comunque vedere quelle sospettosamente corte.
MINPAUSA = 0.05

def pause(mp3):
    """Le pause vere della voce, dal file grezzo."""
    err = subprocess.run([FF,"-v","info","-i",str(mp3),"-af",
          f"silencedetect=n=-45dB:d={MINPAUSA}","-f","null","-"],
          capture_output=True, text=True).stderr
    fuori, ini = [], None
    for m in re.finditer(r"silence_(start|end): ([\d.]+)", err):
        if m.group(1) == "start": ini = float(m.group(2))
        elif ini is not None: fuori.append((ini, float(m.group(2)))); ini = None
    return fuori

print("\n\nOGNI TAGLIO CADE DENTRO UNA PAUSA?")
guai = 0
for L in ("A","B"):
    d = json.loads((QUI/"audio"/f"confini-{L}.json").read_text(encoding="utf-8"))
    ps = pause(QUI/"audio"/f"grezzo-{L}.mp3")
    for bid, t in zip(d["ids"], d["confini"]):      # l'ultimo id finisce col file
        dentro = [q for q in ps if q[0] - 0.02 <= t <= q[1] + 0.02]
        if dentro:
            a, b = dentro[0]
            print(f"  {bid} -> pausa di {b-a:.2f}s")
        else:
            vic = min(ps, key=lambda q: min(abs(q[0]-t), abs(q[1]-t)))
            print(f"  {bid} -> NEL PARLATO: taglio a {t:.2f}s, "
                  f"la pausa piu' vicina e' {vic[0]:.2f}-{vic[1]:.2f}s")
            guai += 1
print(f"\n{guai} tagli nel parlato" if guai else "\nnessun taglio nel parlato: i confini sono dove la voce si ferma")
