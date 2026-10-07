#!/usr/bin/env python3
"""Le due tabelle che chiudono ogni registro di lezione.

    python3 tabelle_registro.py <dir>        > tabelle.md

Va eseguito sulla cartella della lezione, quando `durate.json`, `slides.json`
e `media.json` sono definitivi. Stampa prima la tabella delle grafiche (solo i
disegni e le infografiche), poi quella dei blocchi.

Si scrivono a macchina perche' a scriverle a mano si sbaglia: nei registri del
modulo 8 erano finiti dei conteggi inventati, e ricontrollarli e' costato piu'
che generarli.
"""
import json
import sys

DISEGNI = {'curva', 'finestra', 'quadranti', 'flusso', 'strati', 'pila',
           'termometro', 'bivio', 'anello', 'bilancia', 'imbuto', 'ponte',
           'linea', 'barre', 'raggi'}
INFO = {'anatomia', 'cruscotto', 'cartellino', 'confronto'}

NOME = {'statement': 'frase', 'memo': 'memo', 'quote': 'citazione',
        'list': 'elenco', 'swap': 'sostituzione', 'table': 'tabella',
        'chart': 'grafico', 'cards': 'schede', 'number': 'numero',
        'cover': 'copertina', 'closing': 'chiusura'}

d = sys.argv[1]
dur = json.load(open(f'{d}/durate.json'))
nat = json.load(open(f'{d}/durate_nat.json'))
slide = {c['file']: c for c in json.load(open(f'{d}/slides.json'))}
media = json.load(open(f'{d}/media.json'))

print('| slide | tipo | cosa mostra |')
print('|---|---|---|')
for f, c in sorted(slide.items()):
    lay = c['layout']
    if lay not in DISEGNI and lay not in INFO:
        continue
    ciclo = ' (ciclica)' if c.get('ciclo') else ''
    testo = c.get('title') or c.get('kicker') or ''
    print(f'| `{f}` | {lay}{ciclo} | {testo} |')

print()
print('<!-- grafiche -->')
print()
print('`·` disegno o infografica · `▪` ripresa')
print()
print('| blocco | slide | tipo | durata (s) | posa (s) |')
print('|---|---|---|---|---|')
for b in sorted(dur):
    f = 'c' + b[1:]
    posa = dur[b] - nat[b]
    if b in media:
        print(f'| {b} | ▪ {media[b]["nome"]} | ripresa | {dur[b]:.2f} | — |')
        continue
    c = slide[f]
    lay = c['layout']
    segno = '· ' if lay in DISEGNI or lay in INFO else ''
    nome = NOME.get(lay, lay)
    print(f'| {b} | {segno}`{f}` | {nome} | {dur[b]:.2f} | {posa:+.2f} |')
