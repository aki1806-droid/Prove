# REGISTRO — Perseo Sirio senza segreti · 7.1 Quanto costa davvero

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 7 · Costi e trasparenza. Copione allungato a 6 minuti dallo script
`PS_M7_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.760 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 184,5 s grezzi (s02–s22) · B 205,5 s grezzi (s23–s48); stacco su cambio di capitolo
- ritmo: atempo 1,018, `MIRA` 16,6 car/s · parlato 349,3 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera
- trascrizione dall'asset audio: A 99,4 %, B 99,0 % (solo «zero virgola zero tre» trascritto «0,03»)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `gratis` (sette cartellini delle operazioni con il bollino «0 €»), `imbuto` (l'aderente tipo COVIP con le tre ipotesi e i costi che entrano in un imbuto da cui esce l'ISC), `costi` (tre curve su 30 anni: 2.000 € l'anno al 4% lordo meno l'ISC medio COVIP, con l'area della differenza).
- Qui: `tre` con cifre della quota associativa (13/11/10 €) in s09–s10, `tabella` dei costi indiretti per comparto in s17–s19, s22 e s40, `gratis` in s24–s27, `tre` con cifre dei costi della rendita (1,10% · 5% · 0,90%) in s32–s34 e s36.

## Che cosa è andato storto e come si è deciso

- Nel `gratis` i cartellini spenti non si attenuavano (l'animazione d'ingresso riportava l'opacità a 1): l'attenuazione ora è su un gruppo esterno.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m7.json`)
- trascrizioni: due, dall'asset audio

## La resa

- in corso

## Da verificare — quello che non ho potuto giudicare io

- **Tutte le cifre** vengono dalla scheda «I costi» della Nota informativa in vigore dal 27/03/2026, riportate nello script: adesione gratuita; quota associativa 13 € (11 € contrattuali polizia locale, 10 € in RITA) prelevata dal primo versamento utile; esenti familiari a carico e anni senza versamenti o con soli volontari.
- Costi indiretti: Garantito 0,46%, Obbligazionario 0,14%, Azionario 0,19%, + commissione di incentivo 10% del rendimento oltre l'obiettivo (solo Obbl. e Az.), + 0,03% spese amministrative; prelievo trimestrale.
- Sette operazioni senza spese (anticipazione, riscatto, trasferimenti, switch posizione/flussi, RITA).
- Rendita: caricamento 1,10% (5% LTC), 0,90% trattenuto sulla rivalutazione annua.
- «In molte altre forme alcune operazioni hanno un costo fisso» è dallo script; «trasforma il capitale in un assegno per tutta la vita» è mia parafrasi.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
