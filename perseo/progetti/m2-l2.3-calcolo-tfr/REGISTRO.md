# REGISTRO — Perseo Sirio senza segreti · 2.3 Come si calcola il TFR

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 2 · La tua liquidazione: TFS e TFR. Copione allungato a 6 minuti dallo script
`PS_M2_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 43 blocchi · 5.894 caratteri · 45 scene (copertina 3 s + 43 + chiusura 10 s)
- tracce: A 184,0 s grezzi (s02–s18) · B 232,2 s grezzi (s19–s44); stacco su cambio di capitolo
- ritmo: atempo 1,065, `MIRA` 16,6 car/s · parlato 357,2 s

## Verifiche

- allineamento DTW e controllo delle pause: 3 confini di B corretti a mano sui silenzi (`audio/correzioni.json`: blocchi 5, 6, 7 → s25–s27); poi 0 fuori fascia
- trascrizione dall'asset audio: A 99,3 %, B 99,6 %, nessun buco
- slide: 45 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (uguale nelle cinque lezioni): `linea2000` (la linea del 31 dicembre 2000, TFS ocra / TFR verde, fasi `linea`, `persone`, `termine`), `scalini` (carriera che sale alla fine contro carriera piatta, base del TFS e media), `strati` (dieci anni di TFR: accumulato, rivalutazione, nuova quota), `scambio` (lo scambio ferroviario dell'adesione, fase `vagone` con il TFS maturato), `tasche` (il cappotto con il conto reale e il conto figurativo: fasi `reale`, `due`, `manopola`, `unione`, `garantito`, `profili`; ricorrente nei moduli successivi). `montante` accetta ora `etichetta`, `rivtit` e `riv` per diventare il barattolo del TFR.
- Qui: il barattolo (`montante` con etichetta TFR e la regola 1,5 % + 75 % dell'inflazione), `strati` in s20–s22, la tabella TFS/TFR a righe progressive (s26–s30).

## Che cosa è andato storto e come si è deciso

- L'allineamento automatico aveva spostato tre confini nella traccia B: corretti con i secondi letti dai silenzi.
- Nella legenda di `strati` «gia'» con l'apostrofo: corretto in «già».

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m2.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `4e4cfbb8c0f8845e7fe3ac31f75d38c9` — **completato**, 6:09,3 (369,3 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/4e4cfbb8c0f8845e7fe3ac31f75d38c9
- lotto asset `0e42f1733882459bbc98c51f5832aa97` (88 file)
- copia di controllo locale: `montato-2.3.mp4` 6:10,5 (non versionata) e `montato-2.3.srt`

## Da verificare — quello che non ho potuto giudicare io

- **6,91 %** della retribuzione utile come quota annua di TFR; rivalutazione **1,5 % + 75 % dell'inflazione ISTAT**.
- Esempi aggiunti nel copione: inflazione 8 % → 7,5 %; 30.000 € → circa 2.070 € l'anno; i dieci anni di `strati` sono un esempio semplificato (quota costante 2.073 €, 3 %).
- Quota al Fondo: assunti dal 2001 tutto il TFR; optanti una parte (modulo 4).
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
