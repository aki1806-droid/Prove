# REGISTRO — Perseo Sirio senza segreti · 1.2 I tre pilastri

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Parametri del corso: come nella 1.1 (`../m1-l1.1-pensione/REGISTRO.md`, scheda parametri).

## Numeri della lezione

- 39 blocchi · 5.909 caratteri · 41 scene (copertina 3 s + 39 + chiusura 10 s)
- copione allungato a 6 minuti e **approvato dall'utente** prima della voce
- tracce: A 219,60 s grezzi (s02–s21) · B 186,00 s grezzi (s22–s40); stacco su cambio di capitolo
- ritmo: x1,148 di silenzi tolti, `atempo` 1,000, `MIRA` 16,6 car/s
- parlato 355,2 s → montato stimato 6:08,2

## Verifiche

- allineamento DTW: 0 blocchi fuori fascia
- controllo delle pause: tutti i tagli dentro una pausa vera della voce
- trascrizione dall'asset audio: A 100 %, B 99,3 %, **nessun buco**
- slide: 41 PNG guardati nei provini; nessuna sfora la cornice

## Grafica nuova (in `previdenza.mjs`, ricorrente nel corso)

- `pilastri`: l'architrave «la tua vita da pensionato» su tre colonne (pubblica, complementare,
  personale); `uno` per la casa su un pilastro che oscilla, `targa` per «Perseo Sirio», `chiave`.
- `ripartizione`: chi lavora oggi paga chi è in pensione oggi; patto tra generazioni; meno spalle.
- `fonti`: 50 € tuoi contro tu + ente + TFR; `cresce` con i rendimenti.
- `composto` con `fase:'costi'`: la stessa curva con costi più alti, l'area persa.

## Che cosa è andato storto e come si è deciso

- **Persone invisibili** in `ripartizione`: un'animazione CSS con `transform` sul path cancella
  l'attributo `transform` SVG, e la figura finisce nell'angolo. La posizione ora sta su un `<g>`
  esterno e l'animazione sul path interno. Lezione per il MASTER, gemella delle colonne nere della 1.1.
- Etichette sovrapposte in s24; bordo «key» acceso in anticipo su s14–s16: corretti sui provini.

## Costi

- voce: 3.281 + 2.702 crediti ElevenLabs (~$0,99)
- trascrizioni: ~1.208 + ~1.023 crediti

## La resa

- video HeyGen: *in corso*

## Da verificare — quello che non ho potuto giudicare io

- **s37**: la trascrizione dà «costruisci» dove il copione dice «costruisce» («il secondo pilastro
  è volontario e costruisce una posizione intestata a te»). Una lettera: può essere il trascrittore
  o la voce. Da sentire a orecchio.
- **I contenuti aggiunti**: «circa un terzo» della retribuzione come contributo (s10); il PIP come
  terzo pilastro previdenziale con agevolazioni fiscali e senza contributo del datore (s25).
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
