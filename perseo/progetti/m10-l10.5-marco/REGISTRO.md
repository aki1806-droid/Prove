# REGISTRO — Perseo Sirio senza segreti · 10.5 Marco, a tempo determinato

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 10 · Decidere con i tuoi numeri. Copione allungato a 6 minuti dallo script
`PS_M10_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.585 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 182,7 s grezzi (s02–s21) · B 189,0 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 0,979, `MIRA` 16,6 car/s · parlato 350,1 s

## Verifiche

- allineamento DTW e controllo delle pause: un blocco fuori fascia al primo giro (s09): il confine s08/s09 era caduto 2,4 s troppo tardi perché la voce ha legato «tra un anno, il suo contratto»; spostato con `tagli.py correggi` sui tempi parola per parola della trascrizione, dentro la pausa vera (67,07–67,16 s). Poi 0 fuori fascia e nessun taglio nel parlato; MIRA 16,0 car/s
- trascrizione dall'asset audio: A 98,1 %, B 99,8 % («Perseo Sirio» trascritto «per se ossirio», cifre in numeri; nessun buco)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `cassettiera` (l'area riservata come otto cassetti etichettati; `at`, `spunte`, `tutti`), `ventaglio` (tre linee che si aprono nel tempo, con la retta facoltativa del versato e la «zona realistica»; `linee`, `base`, `da`/`a`, `zona`, `solo`).
- Avviso «Caso illustrativo · Esempio semplificato · Non è una previsione» su ogni slide del caso.
- Figura nuova `strade`: il bivio alla fine del contratto con tre destinazioni (riassunto, nel privato, senza lavoro); `at` accende una strada. Qui in s24, s25, s27, s29.
- `memo` delle tre spunte in s09–s10; `tabella` di un anno in s17–s19; `tasche` in s26.

## Che cosa è andato storto e come si è deciso

- La prima versione della figura `strade` era troppo piccola: riquadri, testi e persona ingranditi.
- Riquadri vuoti in s05: riempiti («Di colleghi», «In attesa»).
- Il confine s08/s09 (vedi sopra).

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m10.json`)
- trascrizioni: due, dall'asset audio

## La resa

- in corso

## Da verificare — quello che non ho potuto giudicare io

- **Destinatari**: contratto di almeno 3 mesi; tempo determinato in TFR, al Fondo il 100% (dallo script).
- Il Fondo consiglia di firmare almeno 3 mesi prima della scadenza; niente silenzio-assenso per i tempi determinati.
- **Conti**: 28.000 € → 280 + 280 + TFR 6,91% ≈ 1.935 € (lo script a voce diceva «millenovecentotrenta», la tabella 1.935: ho usato 1.935); in tutto ≈ 2.495 €.
- Riassunto in un ente aderente: TFR resta all'INPS; nel privato trasferimento al fondo negoziale; senza lavoro la posizione resta investita.
- **Riscatto**: 23% per dimissioni, meno per cause non volontarie; si perdono gli anni.
- Mie formulazioni: «per esempio una clinica, o un centro di diagnostica», «se un giorno aderirà di nuovo, ripartirà da capo», «gli uffici hanno i loro tempi».
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
