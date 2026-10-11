# REGISTRO — Perseo Sirio senza segreti · 1.3 Negoziale, aperto, PIP

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Copione allungato a 6 minuti dallo script `PS_M1_SCRIPT-VIDEO.md` e prodotto **senza approvazione
intermedia**, su indicazione dell'utente («vai avanti per tutto il modulo senza chiedere approvazione»).

## Numeri della lezione

- 40 blocchi · 5.871 caratteri · 42 scene (copertina 3 s + 40 + chiusura 10 s)
- tracce: A 189,8 s grezzi (s02–s20) · B 199,4 s grezzi (s21–s41); stacco su cambio di capitolo
- ritmo: x1,088 di silenzi tolti, `atempo` 1,011, `MIRA` 16,6 car/s
- parlato 355,6 s → montato locale **6:08,9**

## Verifiche

- allineamento DTW: 0 blocchi fuori fascia 8,5–21 car/s
- controllo delle pause: nessun taglio nel parlato
- trascrizione dall'asset audio: A 100 % (465/465), B 99,0 % (507/512), **nessun buco**
- slide: 42 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica nuova (in `previdenza.mjs`)

- `porte`: tre porte (negoziale, aperto, PIP); `aperta` ne apre una, `attive` attenua le altre.
- `bivio`: il bivio tra fondo del contratto (contributo dell'ente, TFR) e fondi aperti/PIP.
- illustrazione `stelle` (la costellazione di Perseo Sirio), usata anche nella 1.4.

## Che cosa è andato storto e come si è deciso

- `.off` (attenuazione) perso sotto l'animazione d'ingresso `forwards`: la classe ora sta su un
  `<g>` esterno. Stessa famiglia di errori delle colonne nere (1.1) e delle persone invisibili (1.2).
- `monta-scene.py` stampava sempre «48 scene»: ora conta le scene vere.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: in corso (vedi sotto, aggiornato a render chiuso)
- copia di controllo locale: `montato-1.3.mp4` 6:08,9 (non versionata) e `montato-1.3.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Rese della voce da sentire a orecchio** (la trascrizione dà parole diverse dal copione):
  - s20 «ecco il» → «e quel»;
  - s25 «mettiamole» → «mettiamoli»;
  - s30 «dei» → «di»;
  - s31 «PIP» → «pp»: può essere il trascrittore sulla sigla o la voce che la legge male.
- **I contenuti aggiunti**: costi «in genere i più bassi / medi / i più alti» nella tabella (s25–s26),
  l'esempio dei costi su trent'anni (s27–s28), il rinvio al comparatore COVIP nel modulo 7.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
