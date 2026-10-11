# REGISTRO — Perseo Sirio senza segreti · 2.1 TFS o TFR: quale hai tu

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 2 · La tua liquidazione: TFS e TFR. Copione allungato a 6 minuti dallo script
`PS_M2_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 40 blocchi · 5.854 caratteri · 42 scene (copertina 3 s + 40 + chiusura 10 s)
- tracce: A 173,6 s grezzi (s02–s16) · B 234,3 s grezzi (s17–s41); stacco su cambio di capitolo
- ritmo: atempo 1,039, `MIRA` 16,6 car/s · parlato 354,5 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia, nessun taglio nel parlato
- trascrizione dall'asset audio: A 100 %, B 100 %, nessun buco
- slide: 42 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (uguale nelle cinque lezioni): `linea2000` (la linea del 31 dicembre 2000, TFS ocra / TFR verde, fasi `linea`, `persone`, `termine`), `scalini` (carriera che sale alla fine contro carriera piatta, base del TFS e media), `strati` (dieci anni di TFR: accumulato, rivalutazione, nuova quota), `scambio` (lo scambio ferroviario dell'adesione, fase `vagone` con il TFS maturato), `tasche` (il cappotto con il conto reale e il conto figurativo: fasi `reale`, `due`, `manopola`, `unione`, `garantito`, `profili`; ricorrente nei moduli successivi). `montante` accetta ora `etichetta`, `rivtit` e `riv` per diventare il barattolo del TFR.
- Qui: `linea2000` in s12–s17 e s31 (con i salvadanai: «una quota» / «tutto»), `scambio` in s30.

## Che cosa è andato storto e come si è deciso

- `linea2000` nella prima prova era troppo piccola: icone e scritte ingrandite (persona ×7, sigle 76 px).
- Lo `scambio` di s30 è stato rigenerato dopo l'ingrandimento del cartello e del vagone.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m2.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `15a003c2e4ad612958622e0c7949f084` — **completato**, 6:06,7 (366,7 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/15a003c2e4ad612958622e0c7949f084
- lotto asset `9ce6bfca35454ff48f41fb965bdcc317` (82 file)
- copia di controllo locale: `montato-2.1.mp4` 6:07,8 (non versionata) e `montato-2.1.srt`

## Da verificare — quello che non ho potuto giudicare io

- **La regola della data**: indeterminato entro il 31/12/2000 → TFS; dal 2001 o a tempo determinato → TFR; stabilizzati dopo il 2000 → TFR.
- **Decorrenza giuridica, non economica**, nei casi a cavallo («come chiarisce anche il Fondo»): controllare la FAQ del Fondo.
- I tre nomi del TFS (premio di servizio, buonuscita, anzianità).
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
