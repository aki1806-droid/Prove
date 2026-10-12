# REGISTRO — Perseo Sirio senza segreti · 7.2 L'ISC, il numero da guardare

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 7 · Costi e trasparenza. Copione allungato a 6 minuti dallo script
`PS_M7_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.737 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 179,1 s grezzi (s02–s21) · B 222,4 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 1,050, `MIRA` 16,6 car/s · parlato 347,7 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; il controllo segnalava un possibile taglio spostato fra s03 e s04, ma i tempi delle parole della trascrizione confermano che il confine cade nella pausa giusta
- trascrizione dall'asset audio: A 99,3 %, B 99,8 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `gratis` (sette cartellini delle operazioni con il bollino «0 €»), `imbuto` (l'aderente tipo COVIP con le tre ipotesi e i costi che entrano in un imbuto da cui esce l'ISC), `costi` (tre curve su 30 anni: 2.000 € l'anno al 4% lordo meno l'ISC medio COVIP, con l'area della differenza).
- Qui: `imbuto` fase `ipotesi` in s08–s09 e fase `imbuto` in s10–s11, `tabella` ISC 2/5/10/35 anni in s14–s18 e s43, `tre` con cifre delle medie COVIP in s33 e s42.

## Che cosa è andato storto e come si è deciso

- In s28 avevo messo la curva dell'interesse composto, ma le sue etichette («versamenti + rendimenti») non c'entravano con i costi: sostituita con un confronto.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m7.json`)
- trascrizioni: due, dall'asset audio

## La resa

- in corso

## Da verificare — quello che non ho potuto giudicare io

- **ISC di Perseo Sirio** (2/5/10/35 anni): Garantito 0,87/0,68/0,60/0,53%; Obbligazionario 0,53/0,35/0,27/0,20%; Azionario 0,58/0,39/0,31/0,24% — dallo script (Nota informativa dal 27/03/2026).
- Aderente tipo COVIP: 2.500 € l'anno, 4% ipotetico; durate 2, 5, 10, 35 anni.
- Avvertenza COVIP: ISC 2% invece di 1% per 35 anni → capitale ridotto di circa il 18% (100.000 → 82.000 €).
- **Medie COVIP** ISC a 10 anni: negoziali 0,47%, aperti 1,36%, PIP 2,17% (Relazione annuale COVIP 2025, giugno 2026).
- «Scegli la forma, il comparto, e leggi l'ISC» descrive il comparatore COVIP in modo semplificato: da controllare sul sito.
- La frase sulla «risposta vaga» è mia.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
