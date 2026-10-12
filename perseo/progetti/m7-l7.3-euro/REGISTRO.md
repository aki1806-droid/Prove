# REGISTRO — Perseo Sirio senza segreti · 7.3 Lo 0,5% che vale migliaia di euro

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 7 · Costi e trasparenza. Copione allungato a 6 minuti dallo script
`PS_M7_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.745 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 203,7 s grezzi (s02–s23) · B 204,5 s grezzi (s24–s48); stacco su cambio di capitolo
- ritmo: atempo 1,038, `MIRA` 16,6 car/s · parlato 349,9 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 97,8 % (in s05 e s08 «l'ISC» trascritto «gli SC»: da riascoltare), B 100 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `gratis` (sette cartellini delle operazioni con il bollino «0 €»), `imbuto` (l'aderente tipo COVIP con le tre ipotesi e i costi che entrano in un imbuto da cui esce l'ISC), `costi` (tre curve su 30 anni: 2.000 € l'anno al 4% lordo meno l'ISC medio COVIP, con l'area della differenza).
- Qui: `tre` con cifre delle medie COVIP in s08–s11, s17, s29 e s39; `costi` fase `curve` in s18–s19, `esiti` in s20–s22, `area` in s23.

## Che cosa è andato storto e come si è deciso

- Nella fase `area` l'etichetta «≈ 27.000 €» copriva le curve: spostata in alto a sinistra con una linea di richiamo; le tre cifre finali distanziate.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m7.json`)
- trascrizioni: due, dall'asset audio

## La resa

- in corso

## Da verificare — quello che non ho potuto giudicare io

- **Simulazione**: 2.000 € l'anno per 30 anni, 4% lordo meno l'ISC medio (0,47 / 1,36 / 2,17%), versamento a inizio anno → circa 107.400 / 92.200 / 80.500 € (ricalcolate da me: coincidono con lo script, 107 / 92 / 80 mila; differenza circa 27.000 €).
- Medie COVIP ISC 10 anni: dallo script (Relazione annuale 2025, giugno 2026).
- «Nei PIP pesa il compenso delle reti di vendita» e «a parità di quota azionaria i negoziali rendono in media di più»: osservazioni COVIP riportate nello script.
- «Fondi aperti offerti da banche e assicurazioni», «PIP polizze assicurative», «venditori a provvigione»: mie semplificazioni.
- «Perseo Sirio molto sotto le medie dei fondi aperti e dei PIP» è mia sintesi (ISC 10 anni 0,27–0,60% contro 1,36% e 2,17%).
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
