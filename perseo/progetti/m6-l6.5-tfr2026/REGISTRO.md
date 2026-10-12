# REGISTRO — Perseo Sirio senza segreti · 6.5 La novità 2026: il TFR segue la tua scelta

Data: 12 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 6 · Dove vanno i tuoi soldi. Copione allungato a 6 minuti dallo script
`PS_M6_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 47 blocchi · 5.730 caratteri · 49 scene (copertina 3 s + 47 + chiusura 10 s)
- tracce: A 200,7 s grezzi (s02–s21) · B 205,0 s grezzi (s22–s48); stacco su cambio di capitolo
- ritmo: atempo 1,068, `MIRA` 16,6 car/s · parlato 349,6 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia dopo la correzione: sulla traccia B l'allineamento automatico aveva spostato sei confini (s28–s33, fino a 5,7 s); li ho rimessi a mano sui tempi delle parole della trascrizione, dentro le pause vere (`audio/correzioni.json`)
- trascrizione dall'asset audio: A 98,9 % («multicomparto» trascritto «multi comparto»; in s13 la voce dice «collegarla» invece di «collegarlo», il senso resta chiaro), B 99,4 %
- slide: 49 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (copiato di lezione in lezione): `equazione` (versamenti + rendimenti − costi = pensione complementare, con «importo promesso in partenza» barrato), `partenze` (tre curve dell'interesse composto che partono a 25, 35 e 45 anni, 100 € al mese al 4%), `barre` (TFR contro linee più azionarie, dati COVIP), `linee` (due andamenti illustrativi su vent'anni, con la lente su un anno negativo), `pac` (40 € al mese su un prezzo che scende e risale: le quote comprate nei mesi bassi), `profili` (i sei profili come barre obbligazioni/azioni, Life Cycle a gradini), `lifecycle` (il percorso per età del Life Cycle, con i gradini a 45, 50, 55, 60 e 61 anni), `switch` (due barattoli, profilo di oggi e nuovo profilo, con il rubinetto dei versamenti: si sposta tutta la posizione, o solo il rubinetto).
- Qui: `tasche` fase `due` in s03 e s07, fase `manopola` in s08 e s12, fase `profili` in s13, s24–s27 e s42, fase `unione` in s29; `cifre` dell'esempio in s16 e s19; `tabella` 600 € contro ≈ 2.070 € l'anno.

## Che cosa è andato storto e come si è deciso

- Nessuna correzione grafica dopo i provini; la correzione è stata sui confini audio della traccia B (vedi allineamento).

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m6.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `0a954a3085bb0c7b0f8bb4b1ac6e72f8` — **completato**, 6:01,6 (361,6 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/0a954a3085bb0c7b0f8bb4b1ac6e72f8
- lotto asset `d0cab65ef75e49d4bb999545847fe737` (96 file)
- copia di controllo locale: `montato-6.5.mp4` 6:02,9 (non versionata) e `montato-6.5.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Criterio multicomparto dal 1° gennaio 2026**: il TFR figurativo si rivaluta con il rendimento netto del profilo scelto — dallo script, da confrontare con la comunicazione del Fondo.
- **INPS operativo da luglio 2026** (messaggio e notizia sul sito INPS): dallo script, da ricontrollare il numero del messaggio.
- **Esempio** con 30.000 € di retribuzione utile: 1% + 1% = 600 € l'anno nella tasca reale; TFR ≈ 2.070 € (6,91%) nella figurativa. Calcolo mio.
- «Molte decine di migliaia di euro» in trent'anni: formulazione mia.
- I profili dei tre esempi (Bilanciato Crescita / Garantito / Bilanciato Dinamico) vengono dallo script: sono esempi, non consigli.
- La comunicazione all'INPS del profilo avviene tramite l'amministrazione nei flussi mensili: dallo script.
- Ho tolto dal copione un'affermazione non verificata (che di default il TFR segua il profilo dei contributi).
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
