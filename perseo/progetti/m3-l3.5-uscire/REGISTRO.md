# REGISTRO — Perseo Sirio senza segreti · 3.5 Si può uscire? E chi altro può entrare

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 3 · Chi può aderire e come. Copione allungato a 6 minuti dallo script
`PS_M3_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.828 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 199,9 s grezzi (s02–s21) · B 187,4 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 1,018, `MIRA` 16,6 car/s · parlato 352,5 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia, nessun taglio nel parlato; il controllo statistico segnalava s20|s21 e s32|s33 (~0,6 s): verificati sulle pause, i tagli cadono a fine frase, giusti
- trascrizione dall'asset audio: A 100 %, B 99,8 %; in s23 la voce dice «E se cambi il lavoro?» invece di «cambia»: il senso non cambia
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `cancello` (i comparti che passano il cancello di Perseo Sirio, `n` e `scuola`), `barra` (il contratto a termine: versamenti subito / ultimi tre mesi, la penna, il contratto successivo), `percorso` (il sentiero a cinque tappe, ricorrente: torna in 9.5), `termostato` (le manopole dell'iscritto), `modulo` (il modulo di adesione con i quattro riquadri), `timbro` (firma dell'ente, PEC, mese dopo).
- Qui: `termostato` con le quattro manopole (s14, s16–s18), `tasche` con la tasca reale vuota per la sospensione (s20). Le tre situazioni di cambio lavoro e le tre strade come riquadri `tre` con quello di cui si parla in rosso (s23–s30).

## Che cosa è andato storto e come si è deciso

- Le tre situazioni e le tre strade erano griglie con l'etichetta grande e la descrizione minuscola: passate a riquadri `tre`.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m3.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `42f34162393af902262738861e8f1e97` — **completato**, 6:04,6 (364,6 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/42f34162393af902262738861e8f1e97
- lotto asset `7a0a418919514a67bdc27b4024470d98` (96 file)
- copia di controllo locale: `montato-3.5.mp4` 6:05,9 (non versionata) e `montato-3.5.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Niente recesso** finché si lavora in un ente aderente (FAQ «Posso recedere»); eccezioni: 30 giorni NoiPA, 30 giorni dall'avviso per il silenzio-assenso.
- **Contributo** modificabile una volta l'anno, decorrenza dal mese successivo; versamenti extra con bonifico; **sospensione** con modulo: si perde l'1% dell'ente, l'accantonamento figurativo del TFR continua (Statuto art. 8 c. 9).
- **Cambio lavoro**: stesso comparto → resti; lasci la PA → riscatto, trasferimento o mantenimento; trasferimento volontario dopo **3 anni**, perdendo il contributo dell'ente.
- **Familiari fiscalmente a carico**: regolamento del CdA, nessuna quota associativa; deduzione in capo a chi li ha a carico entro il tetto annuo complessivo (5.300 €, da confermare nel modulo 5). D.Lgs. 252/2005 art. 8; Statuto art. 8 c. 10.
- Il «modulo dedicato ai familiari» sul sito: verificare che esista con questo nome.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
