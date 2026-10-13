# REGISTRO — Perseo Sirio senza segreti · 10.2 Simulatore e proiezione

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 10 · Decidere con i tuoi numeri. Copione allungato a 6 minuti dallo script
`PS_M10_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.559 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 163,2 s grezzi (s02–s20) · B 205,9 s grezzi (s21–s48); stacco su cambio di capitolo
- ritmo: atempo 0,960, `MIRA` 16,6 car/s · parlato 348,8 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera; MIRA 16,0 car/s
- trascrizione dall'asset audio: A 100 %, B 99,6 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `cassettiera` (l'area riservata come otto cassetti etichettati; `at`, `spunte`, `tutti`), `ventaglio` (tre linee che si aprono nel tempo, con la retta facoltativa del versato e la «zona realistica»; `linee`, `base`, `da`/`a`, `zona`, `solo`).
- Qui: `ventaglio` in s15, s18 e s19 (zona realistica solo in s19); `memo` delle tre leve in s23–s27 e s40; `tabella` dei due strumenti in s07–s11.

## Che cosa è andato storto e come si è deciso

- Tolto «in euro di oggi» (non verificato).
- Il tracciato della zona del ventaglio era contorto: semplificato; l'etichetta «zona realistica» copriva una linea: spostata.
- Le leve avevano `attive` vuoto e risultavano spente: ora tutte accese dove serve.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m10.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `5c09fc89808fbc29405c4ceadcf337e9` — **completato**, 6:00,8 (360,8 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/5c09fc89808fbc29405c4ceadcf337e9
- lotto asset `98df96a666fb4376a93ba97be905b5a9` (96 file)
- copia di controllo locale: `montato-10.2.mp4` 6:02,2 (non versionata) e `montato-10.2.srt`

## Da verificare — quello che non ho potuto giudicare io

- **La mia pensione complementare**: documento consegnato con l'adesione, ipotesi standard COVIP uguali per tutti i fondi (dallo script).
- **Simulatore** sul sito, pagina della rendita: età, contributi, posizione, profilo; metodologia e ipotesi pubblicate sul sito.
- Stima della pensione pubblica nel servizio online INPS; tre pilastri (modulo 1).
- Mie formulazioni: l'immagine del navigatore, «a cinque anni quasi una linea sola», «spesso più di quanto ci si aspetti».
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
