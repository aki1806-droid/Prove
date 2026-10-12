# REGISTRO — Perseo Sirio senza segreti · 4.1 La ricetta del conto

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 4 · Quanto si versa. Copione allungato a 6 minuti dallo script
`PS_M4_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.811 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 169,8 s grezzi (s02–s18) · B 263,5 s grezzi (s19–s48); stacco su cambio di capitolo
- ritmo: atempo 1,064, `MIRA` 16,6 car/s · parlato 352,5 s

## Verifiche

- allineamento DTW e controllo delle pause: 1 blocco fuori fascia in A: il taglio s04|s05 cadeva una pausa prima («E su quale base si calcola?» finiva in s05), corretto di una pausa con `correzioni.json`; poi il controllo segnalava s17|s18, verificato sulle pause: giusto
- trascrizione dall'asset audio: A 100 %, B 98,1 % (solo cifre trascritte come numeri: «30.000 €», «6,91%»)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `ingressi` (il salvadanaio a tre ingressi, ricorrente nel modulo: tuo 1%, ente 1%, TFR e la quarta fessura rossa +1,5%; `n`, `at`, `base`), `bilancia` (la moneta dalla busta paga contro ente e TFR; fasi `una`, `tutte`, `nota`), `divisione` (lo stesso TFR diviso tra pensione e liquidazione; fasi `vuote`, `piene`, `premio`). Riprese: `tasche`, `linea2000`, `conto`, `tabella`.
- Qui: `ingressi` in s06–s12 e s42, `tasche` (fasi due, reale, unione, con optanti) in s14–s18, `conto` 300 ÷ 12 = 25 in s21, `tabella` dell'esempio in s22–s24, `bilancia` in s28–s30.

## Che cosa è andato storto e come si è deciso

- Il primo salvadanaio era piccolo e con le etichette accavallate: ingrandito, fessure distanziate, orecchio spostato dietro la quarta fessura.
- Nella `bilancia` le scritte stavano dentro i fili dei piatti: spostate sotto i piatti, monete con il testo dentro.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m4.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `f43c05db642faaf53b2b12ec27041164` — **completato**, 6:04,5 (364,5 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/f43c05db642faaf53b2b12ec27041164
- lotto asset `0698f52112db40ff830afd3edfb94c68` (96 file)
- copia di controllo locale: `montato-4.1.mp4` 6:05,8 (non versionata) e `montato-4.1.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Ingredienti**: tuo 1% minimo, ente 1%, TFR; +1,5% per gli optanti in servizio al 31.12.2000 (Nota informativa, «I destinatari e i contributi»).
- **Base**: retribuzione lorda utile ai fini del TFR; la frase «straordinari e premi occasionali di solito restano fuori» è una semplificazione aggiunta, da verificare con il contratto.
- **Versamento** dell'ente entro il 15 del mese successivo.
- **Esempio**: 30.000 € → 300 + 300 + 2.073 (6,91%) = 2.673 € l'anno; «su dieci anni oltre 26.000 €» è un'aggiunta mia.
- Nella mossa: «dividi per 12, o per 13 se vuoi tenere conto della tredicesima» — aggiunta mia, da valutare.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
