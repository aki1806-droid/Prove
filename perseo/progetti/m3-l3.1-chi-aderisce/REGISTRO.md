# REGISTRO — Perseo Sirio senza segreti · 3.1 Chi può aderire

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 3 · Chi può aderire e come. Copione allungato a 6 minuti dallo script
`PS_M3_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 43 blocchi · 5.870 caratteri · 45 scene (copertina 3 s + 43 + chiusura 10 s)
- tracce: A 155,3 s grezzi (s02–s17) · B 235,2 s grezzi (s18–s44); stacco su cambio di capitolo
- ritmo: atempo 1,000, `MIRA` 16,6 car/s · parlato 350,0 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia, nessun taglio nel parlato
- trascrizione dall'asset audio: A 100 %, B 99,7 %; in s28 la trascrizione legge «Per Osirio» per «Perseo Sirio»
- slide: 45 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `cancello` (i comparti che passano il cancello di Perseo Sirio, `n` e `scuola`), `barra` (il contratto a termine: versamenti subito / ultimi tre mesi, la penna, il contratto successivo), `percorso` (il sentiero a cinque tappe, ricorrente: torna in 9.5), `termostato` (le manopole dell'iscritto), `modulo` (il modulo di adesione con i quattro riquadri), `timbro` (firma dell'ente, PEC, mese dopo).
- Qui: `cancello` in s06–s12, `barra` in s19–s24, `percorso` come anteprima in s44.

## Che cosa è andato storto e come si è deciso

- Nel `cancello` le etichette uscivano dalle caselle: caselle allargate a 460 px, testo a 30 px.
- Nei titoli avevo usato `<b>` invece di `**`: corretto (l'accento rosso viene da `**`).

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m3.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `bd93d7ec3e8e369e9d3c94debb255ac7` — **completato**, 6:02,2 (362,2 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/bd93d7ec3e8e369e9d3c94debb255ac7
- lotto asset `5c92ad42a6744a879f07284a08aa1f55` (88 file)
- copia di controllo locale: `montato-3.1.mp4` 6:03,3 (non versionata) e `montato-3.1.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Comparti e destinatari**: sanità, funzioni locali, funzioni centrali, università e ricerca, ENAC, CNEL, dirigenza anche medica e veterinaria, segretari comunali e provinciali (con accordo); scuola esclusa (Espero).
- **Tempo determinato**: almeno 3 mesi continuativi; si può aderire fino alla scadenza, ma i versamenti partono dal contratto successivo se mancano i tempi tecnici; consiglio di firmare 3 mesi prima.
- Settori affini (case di cura, enti religiosi, servizi esternalizzati) solo con accordo del datore, con regole in parte dei privati.
- **Ascoltare s28**: la trascrizione legge «Per Osirio».
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
