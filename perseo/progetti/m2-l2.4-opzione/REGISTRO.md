# REGISTRO — Perseo Sirio senza segreti · 2.4 Dal TFS al TFR: l'opzione

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 2 · La tua liquidazione: TFS e TFR. Copione allungato a 6 minuti dallo script
`PS_M2_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 42 blocchi · 5.875 caratteri · 44 scene (copertina 3 s + 42 + chiusura 10 s)
- tracce: A 171,5 s grezzi (s02–s18) · B 234,0 s grezzi (s19–s43); stacco su cambio di capitolo
- ritmo: atempo 1,035, `MIRA` 16,6 car/s · parlato 356,3 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia, nessun taglio nel parlato
- trascrizione dall'asset audio: A 98,7 %, B 100 %; in s04 e s06 la trascrizione legge «Perseus» per «Perseo»
- slide: 44 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (uguale nelle cinque lezioni): `linea2000` (la linea del 31 dicembre 2000, TFS ocra / TFR verde, fasi `linea`, `persone`, `termine`), `scalini` (carriera che sale alla fine contro carriera piatta, base del TFS e media), `strati` (dieci anni di TFR: accumulato, rivalutazione, nuova quota), `scambio` (lo scambio ferroviario dell'adesione, fase `vagone` con il TFS maturato), `tasche` (il cappotto con il conto reale e il conto figurativo: fasi `reale`, `due`, `manopola`, `unione`, `garantito`, `profili`; ricorrente nei moduli successivi). `montante` accetta ora `etichetta`, `rivtit` e `riv` per diventare il barattolo del TFR.
- Qui: `scambio` (s04, s06, s09, s12 con il vagone), le quote 28,94/71,06 come `impila` (anche in euro), i piatti della bilancia come `griglia` a stati, `tasche` con l'1,5 % in s25.

## Che cosa è andato storto e come si è deciso

- `tasche` nella prima prova aveva scritte troppo piccole: cappotto allargato, tasche 420 px, monete 34 px.
- Nel copione (dallo script) il caso completo è «nel modulo dieci»: il corso ha sette moduli. Nella slide ho scritto «più avanti nel corso».

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m2.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `bf3cd72f324748c0e7baeacbdcca693e` — **completato**, 6:08,5 (368,5 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/bf3cd72f324748c0e7baeacbdcca693e
- lotto asset `a5f9737145a04a0fac62a81cd597d1f1` (86 file)
- copia di controllo locale: `montato-2.4.mp4` 6:09,6 (non versionata) e `montato-2.4.srt`

## Da verificare — quello che non ho potuto giudicare io

- **Ascoltare s04 e s06**: la trascrizione legge «Perseus»; se la voce dice davvero così, rigenerare quei blocchi.
- **Irrevocabilità** dell'opzione e **termine del 31 dicembre 2030** (accordo ARAN 2026): da confermare sul sito del Fondo.
- **28,94 %** del TFR al Fondo (= 2 % della retribuzione) e **1,5 % sulla base TFS** (80 % della retribuzione); esempio 360 €/anno, 7.200 € su vent'anni (aggiunto, senza rendimenti).
- Il maturato TFS conserva il trattamento fiscale del TFS.
- **«Nel modulo dieci»** nel parlato di s37: lo script originale rimanda a un modulo che non esiste in questo corso (7 moduli). Da correggere nella voce o nello script.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
