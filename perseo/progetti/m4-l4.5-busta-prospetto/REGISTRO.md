# REGISTRO — Perseo Sirio senza segreti · 4.5 Trovarlo in busta paga e nel prospetto

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 4 · Quanto si versa. Copione allungato a 6 minuti dallo script
`PS_M4_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.776 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 200,6 s grezzi (s02–s23) · B 191,2 s grezzi (s24–s48); stacco su cambio di capitolo
- ritmo: atempo 1,000, `MIRA` 16,6 car/s · parlato 350,0 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia. Il controllo segnalava una pausa di 0,14 s prima di s29: verificato sulle pause, il taglio cade nell'unico respiro fra «…TFR virtuale.» e «E, per chi ha optato…», la voce ha solo legato le due frasi
- trascrizione dall'asset audio: A 99,2 %, B 99,6 % (s35: «mettile» letto «mettili»)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `ingressi` (il salvadanaio a tre ingressi, ricorrente nel modulo: tuo 1%, ente 1%, TFR e la quarta fessura rossa +1,5%; `n`, `at`, `base`), `bilancia` (la moneta dalla busta paga contro ente e TFR; fasi `una`, `tutte`, `nota`), `divisione` (lo stesso TFR diviso tra pensione e liquidazione; fasi `vuote`, `piene`, `premio`). Riprese: `tasche`, `linea2000`, `conto`, `tabella`.
- Nuova qui: `foglio` (un documento stilizzato e neutro, senza cedolini reali: righe finte, sezioni, righe `accese` in verde, una riga tratteggiata che `manca`, e la `lente` che scende fino all'ultima riga accesa). Usata per il cedolino (s07–s13) e la Certificazione Unica (s21). Riprese: `tasche` con le monete del prospetto (TFR virtuale, TFS virtuale), `tre` per i tre documenti e per «a chi chiedere».

## Che cosa è andato storto e come si è deciso

- Il cedolino con tutte le righe sforava in alto di 170 px: righe finte ridotte a una per sezione.
- La somma «tasche + gestione = posizione» sforava di 15 px: «gestione» diventato «resa».

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m4.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `95637d031345487545df6837ae25617c` — **completato**, 6:02,1 (362,1 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/95637d031345487545df6837ae25617c
- lotto asset `179b1ed335cd4e32bbba8d131bb1ee98` (96 file)
- copia di controllo locale: `montato-4.5.mp4` 6:03,4 (non versionata) e `montato-4.5.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Quota associativa** 13 € l'anno (11 € per gli aderenti contrattuali della polizia locale), trattenuta dal primo versamento utile dell'anno; non la paga chi in un anno non versa o fa solo versamenti volontari — dalla scheda costi, da ricontrollare la seconda parte.
- **Certificazione Unica**: contributi dedotti dall'ente, riportati nella precompilata; «di solito in primavera» è mio.
- **Prospetto delle prestazioni pensionistiche – fase di accumulo** nell'area riservata, sezione documentazione; «TFR virtuale» e «TFS virtuale» come nomi usati dal Fondo: da verificare sul prospetto reale.
- «Sfasamenti di un mese perché l'ente versa entro il mese successivo»: coerente con la 4.1 (entro il 15 del mese dopo), formulazione mia.
- Rimando al corso CISL FP sulla busta paga suggerito dalla nota di produzione: non inserito.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
