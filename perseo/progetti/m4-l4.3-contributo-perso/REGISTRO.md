# REGISTRO — Perseo Sirio senza segreti · 4.3 Il contributo che perdi

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 4 · Quanto si versa. Copione allungato a 6 minuti dallo script
`PS_M4_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.807 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 182,2 s grezzi (s02–s21) · B 212,0 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 1,000, `MIRA` 16,6 car/s · parlato 351,9 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia al primo colpo
- trascrizione dall'asset audio: A 98,2 % (solo cifre trascritte come numeri), B 100 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `ingressi` (il salvadanaio a tre ingressi, ricorrente nel modulo: tuo 1%, ente 1%, TFR e la quarta fessura rossa +1,5%; `n`, `at`, `base`), `bilancia` (la moneta dalla busta paga contro ente e TFR; fasi `una`, `tutte`, `nota`), `divisione` (lo stesso TFR diviso tra pensione e liquidazione; fasi `vuote`, `piene`, `premio`). Riprese: `tasche`, `linea2000`, `conto`, `tabella`.
- Nuova qui: `buste` (le dodici buste dell'anno con l'1% dell'ente; stati `una`, `tutte`, `perse`, `da`). Poi `tre` (i tre modi per perderlo), `ingressi` in s10–s11, `composto` (l'effetto del tempo, ripreso dal modulo 1), `tasche`.

## Che cosa è andato storto e come si è deciso

- Le buste erano piccole e la scritta del mese si perdeva: ingrandite (228 × 156) e distanziate.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m4.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `2831571194726002a187640583a725ef` — **completato**, 6:03,8 (363,8 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/2831571194726002a187640583a725ef
- lotto asset `89db9d6259bd4690a126f17556787ab9` (96 file)
- copia di controllo locale: `montato-4.3.mp4` 6:05,2 (non versionata) e `montato-4.3.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Due regole** dalla Nota informativa: l'1% dell'ente spetta solo agli iscritti al fondo negoziale, e solo se versi almeno l'1% a tuo carico; se versi di più l'ente resta all'1%.
- **Esempio**: 30.000 € → 300 € l'anno; 25.000 → 250; 40.000 → 400; × 30 anni = 9.000 € «stima prudente»: cifre mie.
- **Sospensione**: «lo Statuto permette di farlo con un apposito modulo» e si ferma anche l'ente — da verificare sullo Statuto.
- **Trasferimento** dopo tre anni di iscrizione, anche in servizio: verificare che il nuovo fondo non riceva il contributo dell'ente (dipende dal contratto).
- Nel caso delle assenze non retribuite si sospendono tutte le contribuzioni, compreso l'accantonamento figurativo del TFR (Statuto): verificare la formulazione.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
