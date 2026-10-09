#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Controlla i confini dei blocchi quando la trascrizione non si puo' fare.

    python3 banda.py banda    <dir>              # gli scarti di durata
    python3 banda.py silenzi  <dir>              # ogni taglio e' in un silenzio?
    python3 banda.py sposta   <dir> <K> <blocco> # prova le pause vicine

Il metodo prevede di risentire ogni confine parola per parola con
`tagli.py correggi`. Senza crediti ElevenLabs non si puo', e questo e' il
sostituto: se un confine cade dentro una frase invece che fra due blocchi,
il blocco prima risulta troppo corto per il suo testo e quello dopo troppo
lungo, in misura uguale e opposta.

Il conto si fa sul PARLATO NETTO, cioe' sulla durata del blocco meno i
silenzi che contiene. Sulla durata lorda un blocco di frasi brevissime
respira di piu' e sembra letto piano, un periodo lungo sembra corso: sulla
2.4 la banda lorda segnalava tredici confini, quella netta otto.

`silenzi` da' la garanzia che conta davvero e che si puo' dare sempre: che
nessun taglio spezzi una parola. Uno scarto fuori banda non dice che una
parola sia stata tagliata, dice solo che il blocco non dura quanto il suo
testo prevede.
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tagli as T

SOGLIA = 1.5


def netto(s):
    return len(re.sub(r'\[[a-z]+\]\s*', '', s))


def carica(d):
    B = {x['id']: x['text'] for x in json.load(open(f'{d}/blocchi.json'))}
    return B, json.load(open(f'{d}/chunks.json')), json.load(open(f'{d}/tagli.json'))


def muto_di(sil):
    def muto(a, b):
        return sum(max(0.0, min(z, b) - max(x, a)) for x, z in sil)
    return muto


def banda(d):
    B, ch, t = carica(d)
    sospetti = []
    for k in ch:
        ids = ch[k]
        muto = muto_di(sorted(T.silenzi(f'{d}/unico_{k}_raw.mp3')))
        voce = [(t[k][i + 1] - t[k][i]) - muto(t[k][i], t[k][i + 1])
                for i in range(len(ids))]
        car = [netto(B[i]) for i in ids]
        cps = sum(car) / sum(voce)
        print(f'--- traccia {k}: {sum(car)} caratteri in {sum(voce):.1f} s di voce '
              f'= {cps:.2f} car/s')
        for i, b in enumerate(ids):
            atteso = car[i] / cps
            scarto = voce[i] - atteso
            flag = '  <<<' if abs(scarto) > SOGLIA else ''
            if flag:
                sospetti.append((b, round(voce[i], 2), round(atteso, 2), round(scarto, 2)))
            print(f'  {b}  voce {voce[i]:6.2f}s  attesa {atteso:6.2f}s  '
                  f'scarto {scarto:+6.2f}s  {car[i] / voce[i]:5.1f} car/s{flag}')
    print()
    print(len(sospetti), 'confini da guardare' if sospetti else 'nessun confine sospetto')
    for s in sospetti:
        print('  ', s)
    return sospetti


def silenzi(d):
    _, ch, t = carica(d)
    righe = []
    for k in ch:
        sil = sorted(T.silenzi(f'{d}/unico_{k}_raw.mp3'))
        for i, x in enumerate(t[k][1:-1]):
            dentro = [(a, b) for a, b in sil if a <= x <= b]
            if not dentro:
                print(f'  !! {k} {ch[k][i]}->{ch[k][i + 1]} a {x:.2f} NON e in un silenzio')
                righe.append((k, ch[k][i], x, 0.0, 0.0))
                continue
            a, b = dentro[0]
            righe.append((k, ch[k][i], x, b - a, min(x - a, b - x)))
    righe.sort(key=lambda r: r[3])
    if all(r[3] > 0 for r in righe):
        print(f'{len(righe)} confini, tutti dentro un silenzio')
    else:
        print('ci sono confini fuori da ogni silenzio')
    print('i cinque silenzi piu corti su cui cade un taglio:')
    for k, b, x, L, bordo in righe[:5]:
        print(f'   {k} {b}  a {x:7.2f}  silenzio {L:.2f}s  margine dal bordo {bordo:.2f}s')
    return righe


def sposta(d, k, blocco):
    """Prova ogni pausa vicina a un confine e mostra come cambia la banda."""
    B, ch, t = carica(d)
    ids = ch[k]
    i = ids.index(blocco)
    sil = sorted(T.silenzi(f'{d}/unico_{k}_raw.mp3'))
    muto = muto_di(sil)
    voce_tot = sum((t[k][j + 1] - t[k][j]) - muto(t[k][j], t[k][j + 1])
                   for j in range(len(ids)))
    cps = sum(netto(B[x]) for x in ids) / voce_tot
    a0, b0, c0 = t[k][i], t[k][i + 1], t[k][i + 2]
    print(f'{blocco} -> {ids[i + 1]}, confine ora a {b0:.2f}  (cps traccia {cps:.2f})')
    for x, z in sil:
        c = (x + z) / 2
        if not (abs(c - b0) < 8 and a0 < c < c0):
            continue
        s1 = ((c - a0) - muto(a0, c)) - netto(B[blocco]) / cps
        s2 = ((c0 - c) - muto(c, c0)) - netto(B[ids[i + 1]]) / cps
        ora = ' <-- ora' if abs(c - b0) < 0.01 else ''
        ok = '   OK' if max(abs(s1), abs(s2)) < SOGLIA else ''
        print(f'   {c:8.2f} (pausa {z - x:.2f}s)  {blocco} {s1:+6.2f}  '
              f'{ids[i + 1]} {s2:+6.2f}{ok}{ora}')


if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'banda':
        banda(sys.argv[2])
    elif cmd == 'silenzi':
        silenzi(sys.argv[2])
    elif cmd == 'sposta':
        sposta(sys.argv[2], sys.argv[3], sys.argv[4])
    else:
        sys.exit(__doc__)
