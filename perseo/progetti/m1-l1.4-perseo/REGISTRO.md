# REGISTRO — Perseo Sirio senza segreti · 1.4 Chi è Perseo Sirio

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Copione allungato a 6 minuti dallo script `PS_M1_SCRIPT-VIDEO.md` e prodotto **senza approvazione
intermedia**, su indicazione dell'utente («vai avanti per tutto il modulo senza chiedere approvazione»).

## Numeri della lezione

- 41 blocchi · 5.896 caratteri · 43 scene (copertina 3 s + 41 + chiusura 10 s)
- tracce: A 233,0 s grezzi (s02–s22) · B 188,2 s grezzi (s23–s42); stacco su cambio di capitolo
- ritmo: x1,163 di silenzi tolti, `atempo` 1,020, `MIRA` 16,6 car/s
- parlato 357,2 s → montato locale **6:10,6**

## Verifiche

- allineamento DTW: 0 blocchi fuori fascia 8,5–21 car/s
- controllo delle pause: nessun taglio nel parlato
- trascrizione dall'asset audio: A 100 % (556/556), B 99,3 % (424/427), **nessun buco**.
  Unica resa: s41 «800 994» trascritto «800994» (lo spazio delle cifre, non un errore di voce).
- slide: 43 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica nuova (in `previdenza.mjs`)

- `nascita`: la storia del Fondo in tre tempi (`perseo` 1999, `sirio` 2007, `fusione` 2014).
- `carta`: la carta d'identità del Fondo, righe che si accendono con `attive`.

## Che cosa è andato storto e come si è deciso

- Le cifre di s24–s25 erano scritte per intero: ora numero più suffisso
  (`300` + `mila`, `1` + `mld €`).
- In `carta` l'attenuazione `.off` si perdeva sotto l'animazione: spostata su un `<g>` esterno.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: in corso (aggiornato a render chiuso)
- copia di controllo locale: `montato-1.4.mp4` 6:10,6 (non versionata) e `montato-1.4.srt`

## Da verificare — quello che non ho potuto giudicare io

- **I fatti e i numeri del Fondo**, da confrontare con il sito e l'ultima relazione COVIP:
  - date: Perseo 1999, Sirio 2007, fusione in Perseo Sirio 2014;
  - iscrizione all'albo COVIP n. 164, sede a Roma, contribuzione definita;
  - «oltre 300.000» aderenti, circa 50.000 prestazioni nel 2024, patrimonio intorno a 1 miliardo nel 2025;
  - comparti di adesione (sanità, funzioni locali e centrali, università, ENAC e CNEL, dirigenza)
    e l'adesione da enti privati con appositi accordi;
  - la scuola su Fondo Espero, non su Perseo Sirio;
  - numero verde **800 994 545**, lunedì–venerdì 9–16: è il numero che la lezione fa salvare in rubrica.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
