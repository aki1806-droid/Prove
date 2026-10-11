# REGISTRO — Perseo Sirio senza segreti · 3.4 La polizia locale: dalla multa alla pensione

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 3 · Chi può aderire e come. Copione allungato a 6 minuti dallo script
`PS_M3_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 45 blocchi · 5.887 caratteri · 47 scene (copertina 3 s + 45 + chiusura 10 s)
- tracce: A 218,7 s grezzi (s02–s25) · B 179,7 s grezzi (s26–s46); stacco su cambio di capitolo
- ritmo: atempo 1,005, `MIRA` 16,6 car/s · parlato 357,0 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia, nessun taglio nel parlato
- trascrizione dall'asset audio: A 100 %, B 100 %
- slide: 47 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `cancello` (i comparti che passano il cancello di Perseo Sirio, `n` e `scuola`), `barra` (il contratto a termine: versamenti subito / ultimi tre mesi, la penna, il contratto successivo), `percorso` (il sentiero a cinque tappe, ricorrente: torna in 9.5), `termostato` (le manopole dell'iscritto), `modulo` (il modulo di adesione con i quattro riquadri), `timbro` (firma dell'ente, PEC, mese dopo).
- Nuova qui: `salvadanai` (due salvadanai affiancati: solo art. 208 a scatti annuali, contro art. 208 + contribuzione ordinaria; fasi `primo`, `secondo`, `tempo` con la distanza) in s15 e s28–s30. Riusate: `percorso` con tappe proprie (sanzione → posizione) in s12, `tasche` fase `due` in s21.

## Che cosa è andato storto e come si è deciso

- Nel `salvadanai` fase `tempo` la scritta «la distanza» finiva sopra la legenda e la linea tratteggiata attraversava il secondo salvadanaio: la misura ora sta tra i due salvadanai.
- Le due liste «Non c'è» e «Due cose da controllare» erano griglie con l'etichetta grande e il testo minuscolo: passate a riquadri (`tre`) e a lista (`memo`).

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m3.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `8ab70090153311c831e21c6a61748b32` — **completato**, 6:09,1 (369,1 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/8ab70090153311c831e21c6a61748b32
- lotto asset `89a4124fb577405c82bd4c5dcd3534a2` (92 file)
- copia di controllo locale: `montato-3.4.mp4` 6:10,4 (non versionata) e `montato-3.4.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Art. 208 Codice della Strada**: una quota dei proventi delle sanzioni può andare a previdenza complementare della polizia locale (comma 4 lett. c e comma 5-bis): verificare la formulazione.
- **CCNL Funzioni locali 16.11.2022, art. 98**: Perseo Sirio unico fondo destinatario; verificare numero d'articolo e data di firma.
- **Adesione contrattuale**: iscrizione senza modulo; chi è in TFS resta in TFS; **quota associativa 11 euro l'anno** per i soli aderenti contrattuali — da confermare l'importo.
- **Integrazione**: modulo dedicato sul sito, sezione polizia locale; con l'integrazione scatta il passaggio TFS→TFR per chi era in servizio prima del 2001.
- «Consulenza telefonica dedicata»: verificare che il servizio esista con questo nome.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
