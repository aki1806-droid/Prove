# REGISTRO — Perseo Sirio senza segreti · 4.2 Prima e dopo il 2001

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 4 · Quanto si versa. Copione allungato a 6 minuti dallo script
`PS_M4_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.802 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 200,8 s grezzi (s02–s22) · B 204,7 s grezzi (s23–s48); stacco su cambio di capitolo
- ritmo: atempo 1,046, `MIRA` 16,6 car/s · parlato 351,5 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia al primo colpo
- trascrizione dall'asset audio: A una sola differenza (s04: la voce dice «al» invece di «in»), B 99,8 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `ingressi` (il salvadanaio a tre ingressi, ricorrente nel modulo: tuo 1%, ente 1%, TFR e la quarta fessura rossa +1,5%; `n`, `at`, `base`), `bilancia` (la moneta dalla busta paga contro ente e TFR; fasi `una`, `tutte`, `nota`), `divisione` (lo stesso TFR diviso tra pensione e liquidazione; fasi `vuote`, `piene`, `premio`). Riprese: `tasche`, `linea2000`, `conto`, `tabella`.
- Qui: `linea2000` (la linea del 2000 con le due colleghe sopra, fasi linea e persone) in s05–s09, `conto` 6,91% − 1,5% in s11, `tabella` dell'esempio a 6 righe in s16–s23, `divisione` (lo stesso TFR tagliato in due modi) in s24–s27, `ingressi` in s38.

## Che cosa è andato storto e come si è deciso

- Nessuna correzione di impaginazione dopo i provini.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m4.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `64d73d89040010e1add5816bdf177a39` — **completato**, 6:03,6 (363,6 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/64d73d89040010e1add5816bdf177a39
- lotto asset `a7271386e06b42acafb8a0d5e9b89fc1` (96 file)
- copia di controllo locale: `montato-4.2.mp4` 6:04,9 (non versionata) e `montato-4.2.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Assunti dal 2001** (e a tempo determinato): tutto il TFR maturando al Fondo; **optanti dal TFS**: 28,94% del TFR, pari al 2% della retribuzione utile, + 1,5% aggiuntivo calcolato sull'80% della retribuzione; il resto del TFR resta liquidazione (Nota informativa e accordi di settore).
- **Esempio** 30.000 €: dal 2001 circa 2.673 € l'anno al Fondo; optante circa 1.560 € al Fondo + circa 1.470 € l'anno di TFR che restano liquidazione: cifre mie, da ricontrollare.
- «L'1,5% compensa in parte chi rinuncia al TFS, che per molti aveva regole di calcolo più favorevoli»: formulazione mia.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
