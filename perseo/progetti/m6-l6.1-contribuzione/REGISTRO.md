# REGISTRO — Perseo Sirio senza segreti · 6.1 Contribuzione definita

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 6 · Dove vanno i tuoi soldi. Copione allungato a 6 minuti dallo script
`PS_M6_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.779 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 191,6 s grezzi (s02–s22) · B 208,8 s grezzi (s23–s48); stacco su cambio di capitolo
- ritmo: atempo 1,046, `MIRA` 16,6 car/s · parlato 351,2 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia; ogni confine cade in una pausa vera. Da questa lezione la mira torna a 16,6 car/s (sulla 5.5 era 16,3)
- trascrizione dall'asset audio: A 99,3 % (solo cifre: «quarantadue mila» staccato), B 99,8 % («78000» e «130000» letti come «78 mila» e «130 mila»)
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `equazione` (versamenti + rendimenti − costi = pensione complementare, con «importo promesso in partenza» barrato), `partenze` (tre curve dell'interesse composto che partono a 25, 35 e 45 anni, 100 € al mese al 4%), `barre` (TFR contro linee più azionarie, dati COVIP), `linee` (due andamenti illustrativi su vent'anni, con la lente su un anno negativo), `pac` (40 € al mese su un prezzo che scende e risale: le quote comprate nei mesi bassi).
- Qui: `equazione` in s10–s13, `partenze` in s17–s20, `composto` fase `area` in s22, `barre` in s32–s33, `conto` 67 − 45 = 22 in s43.

## Che cosa è andato storto e come si è deciso

- Nell'`equazione` «la tua pensione» usciva dal riquadro: l'ultimo riquadro è più largo (380).
- Nelle `partenze` le etichette «inizia a…» si sovrapponevano alle curve: spostate sotto l'asse.
- «≈ 53.000 €» andava a capo nelle `cifre`: diventato «53.000 €» con «circa» nella didascalia.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m6.json`)
- trascrizioni: due, dall'asset audio

## La resa

- in corso

## Da verificare — quello che non ho potuto giudicare io

- **Esempio dell'interesse composto**: 100 € al mese al 4% annuo fino a 67 anni → circa 42.000 € (da 45), 78.000 € (da 35), 131.000 € (da 25); dieci anni in più = 12.000 € versati e circa 53.000 € alla fine — calcolo mio, esempio illustrativo (lo script non ha cifre).
- **COVIP 2015–2025**: TFR circa 2,5% medio annuo, linee più azionarie circa 5% — dallo script (Relazione annuale COVIP 2025), da confrontare con la fonte.
- «Regole d'investimento fissate da un decreto del Ministero dell'Economia», «gestori scelti con gara», «depositario»: dallo script; «se un gestore avesse problemi, i tuoi soldi resterebbero tuoi» è una mia semplificazione.
- «Toglila da sessantasette, l'età della pensione di vecchiaia»: aggiunta mia (67 anni è il requisito attuale, può cambiare).
- La proiezione annuale «nel modulo dieci»: dallo script.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
