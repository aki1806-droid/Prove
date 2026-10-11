# REGISTRO — Perseo Sirio senza segreti · 3.3 Neoassunti: il silenzio che vale un sì

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 3 · Chi può aderire e come. Copione allungato a 6 minuti dallo script
`PS_M3_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.857 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 176,5 s grezzi (s02–s20) · B 231,6 s grezzi (s21–s48); stacco su cambio di capitolo
- ritmo: atempo 1,042, `MIRA` 16,6 car/s · parlato 355,0 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia, nessun taglio nel parlato; il controllo statistico segnalava s12|s13 (−0,86/+0,75 s): verificato sulle pause, il taglio cade tra «lezione precedente» e «Il principio», giusto (s13 è solo letto più lento)
- trascrizione dall'asset audio: A 100 %, B 99,8 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `cancello` (i comparti che passano il cancello di Perseo Sirio, `n` e `scuola`), `barra` (il contratto a termine: versamenti subito / ultimi tre mesi, la penna, il contratto successivo), `percorso` (il sentiero a cinque tappe, ricorrente: torna in 9.5), `termostato` (le manopole dell'iscritto), `modulo` (il modulo di adesione con i quattro riquadri), `timbro` (firma dell'ente, PEC, mese dopo).
- Nuova qui: `orologio` (6 mesi dall'informativa, poi 30 giorni dall'avviso del Fondo, `at` 0–3) in s16–s20. Riprese da M2: `tasche` (fasi `due` e `garantito`, con lo scudo del profilo Garantito) in s23 e s25. Le tre strade come `griglia` a una colonna (s29–s33).

## Che cosa è andato storto e come si è deciso

- In `tasche` fase `garantito` l'etichetta «profilo Garantito» usciva sotto la cornice: figura alzata a 735 px.
- Nell'`orologio` l'etichetta «6 mesi» toccava l'arco: spostata in alto.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m3.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `120949154f90119e20c984c3cfd3400d` — **completato**, 6:07,0 (367,0 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/120949154f90119e20c984c3cfd3400d
- lotto asset `08a378fd56bb466498a1cf684ef932e9` (96 file)
- copia di controllo locale: `montato-3.3.mp4` 6:08,4 (non versionata) e `montato-3.3.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Silenzio-assenso**: assunti a tempo indeterminato dal 1° gennaio 2019 in sanità, funzioni locali e funzioni centrali (accordo ARAN–sindacati del settembre 2021, poi nei contratti). Da confermare date e comparti esatti.
- **Termini**: 6 mesi dall'informativa; poi avviso del Fondo e 30 giorni per ripensarci (recesso). Da confermare.
- **Contribuzione**: 1% lavoratore + 1% ente + TFR (figurativo) — nel privato il silenzio-assenso porta solo il TFR.
- **Profilo**: Garantito come comparto di default.
- Le consulenze gratuite del Fondo «al telefono o su appuntamento»: verificare la formula sul sito.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
