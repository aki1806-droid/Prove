# REGISTRO — Perseo Sirio senza segreti · 3.2 Aderire passo per passo

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 3 · Chi può aderire e come. Copione allungato a 6 minuti dallo script
`PS_M3_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 46 blocchi · 5.910 caratteri · 48 scene (copertina 3 s + 46 + chiusura 10 s)
- tracce: A 218,3 s grezzi (s02–s23) · B 191,6 s grezzi (s24–s47); stacco su cambio di capitolo
- ritmo: atempo 1,000, `MIRA` 16,6 car/s · parlato 351,3 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia, nessun taglio nel parlato
- trascrizione dall'asset audio: A 99,6 %, B 100 %; solo «pre-adesione» scritto attaccato
- slide: 48 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `cancello` (i comparti che passano il cancello di Perseo Sirio, `n` e `scuola`), `barra` (il contratto a termine: versamenti subito / ultimi tre mesi, la penna, il contratto successivo), `percorso` (il sentiero a cinque tappe, ricorrente: torna in 9.5), `termostato` (le manopole dell'iscritto), `modulo` (il modulo di adesione con i quattro riquadri), `timbro` (firma dell'ente, PEC, mese dopo).
- Qui: `percorso` con la tappa accesa (s02–s32), `modulo` con i quattro campi e il cursore della percentuale (s18–s24), `timbro` (s26, s28, s29).

## Che cosa è andato storto e come si è deciso

- Il cartello «Compilare non basta» copriva a metà un campo del modulo: ora il modulo si attenua sotto il cartello.
- Il timbro «AMMINISTRAZIONE» usciva dal riquadro: riquadro più largo e testo più piccolo.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m3.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `d763a5dd5e2b64e101b3596888d2f09a` — **completato**, 6:03,4 (363,4 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/d763a5dd5e2b64e101b3596888d2f09a
- lotto asset `abf9881782c041728c43980bc7d76913` (94 file)
- copia di controllo locale: `montato-3.2.mp4` 6:04,6 (non versionata) e `montato-3.2.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Procedura**: modulo solo digitale (sito o pre-adesione online), firmato dal lavoratore e dall'ente, inviato dall'ente via PEC; iscrizione dalla firma del datore, versamenti dal mese successivo.
- Esempio aggiunto: firma il 20 marzo → versamenti da aprile.
- **NoiPA**: solo online (servizi self-service → previdenza complementare), PIN dispositivo di 5 cifre dall'ufficio del personale, 30 giorni di ripensamento. Frase aggiunta da verificare: «le stesse credenziali con cui consulti il cedolino».
- Controllo locale suggerito dallo script: se in AOUP o nelle ULSS l'ufficio del personale usa una procedura interna diversa.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
