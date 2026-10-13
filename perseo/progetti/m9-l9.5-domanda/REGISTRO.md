# REGISTRO — Perseo Sirio senza segreti · 9.5 Fare la domanda

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 9 · Al pensionamento. Copione allungato a 6 minuti dallo script
`PS_M9_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–10 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.651 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 192,3 s grezzi (s02–s22) · B 198,5 s grezzi (s23–s48); stacco su cambio di capitolo
- ritmo: atempo 0,985, `MIRA` 16,6 car/s · parlato 351,4 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera; MIRA abbassata a 16,2 car/s (vedi sotto)
- trascrizione dall'asset audio: A 100 %, B 99,6 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `varco` (la porta dell'anzianità, larga fino al 2026 e stretta dal 2027, con gli omini da 8 anni di iscrizione; fasi `porte`/`larga`/`stretta`), `secchio` (la posizione come barra fra capitale e rendita, con il cursore che si ferma a metà; fasi `meta`/`blocco`/`destra`/`rendita`/`tutto`).
- `percorso` con tappe proprie (Cessazione · Il modulo · Area riservata · La pratica · Le somme) in s07–s15; in s02 il percorso standard dell'adesione.
- `memo` come lista di controllo dei documenti in s17–s21.

## Che cosa è andato storto e come si è deciso

- Nella prima registrazione della traccia B «patronato INAS» è stato trascritto «INAIL»: riformulato in «per noi quello della CISL» e traccia B rifatta.
- Con MIRA 16,4 il montaggio era 6:00,0: MIRA abbassata a 16,2 car/s, montaggio 6:04,3.
- «Un documento scaduto blocca la pratica» ammorbidito in «puo' fermare la pratica».

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m9.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `6e32ed4f4ed437fd8849df0848652314` — **completato**, 6:03,5 (363,5 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/6e32ed4f4ed437fd8849df0848652314
- lotto asset `78354b521b4d4331921476e65a17d826` (96 file)
- copia di controllo locale: `montato-9.5.mp4` 6:04,7 (non versionata) e `montato-9.5.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Cinque tappe** della domanda; moduli nella sezione *Modulistica* · *Dipendenti pubblici*; caricamento in area riservata (dallo script).
- **Lista di controllo**: documento d'identità valido, IBAN, data di cessazione, scelta capitale/rendita, contributi non dedotti.
- Numero verde del Fondo; patronato INAS CISL; delegato CISL FP; capitale «fino alla metà».
- Mie formulazioni: «niente buste, niente code», «va indicata con precisione».
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
