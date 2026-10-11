# REGISTRO — Perseo Sirio senza segreti · 2.2 Come si calcola il TFS

Data: 11 ottobre 2026 · sessione Claude Code (repo Prove, branch `claude/new-session-d7lx19`)
Metodo: `metodo/MASTER-PORTATILE.md` · parametri del corso: vedi `m1-l1.1-pensione/REGISTRO.md`

Modulo 2 · La tua liquidazione: TFS e TFR. Copione allungato a 6 minuti dallo script
`PS_M2_SCRIPT-VIDEO.md` e prodotto **senza approvazioni intermedie**, su indicazione dell'utente
(«Tutto, senza approvazioni»: moduli 2–7 di seguito, link alla fine di ogni modulo).

## Numeri della lezione

- 44 blocchi · 5.864 caratteri · 46 scene (copertina 3 s + 44 + chiusura 10 s)
- tracce: A 236,3 s grezzi (s02–s23) · B 184,1 s grezzi (s24–s45); stacco su cambio di capitolo
- ritmo: atempo 1,038, `MIRA` 16,6 car/s · parlato 355,4 s

## Verifiche

- allineamento DTW e controllo delle pause: 0 blocchi fuori fascia, nessun taglio nel parlato
- trascrizione dall'asset audio: A 97,9 %, B 99,4 %; le differenze sono rese della trascrizione («buonuscita» → «buona uscita», «vent’anni» → «20 anni»)
- slide: 46 PNG guardati nei provini; nessuna sfora la cornice
- `controlli.py`: 8/8

## Grafica

- Grafiche nuove del modulo in `previdenza.mjs` (uguale nelle cinque lezioni): `linea2000` (la linea del 31 dicembre 2000, TFS ocra / TFR verde, fasi `linea`, `persone`, `termine`), `scalini` (carriera che sale alla fine contro carriera piatta, base del TFS e media), `strati` (dieci anni di TFR: accumulato, rivalutazione, nuova quota), `scambio` (lo scambio ferroviario dell'adesione, fase `vagone` con il TFS maturato), `tasche` (il cappotto con il conto reale e il conto figurativo: fasi `reale`, `due`, `manopola`, `unione`, `garantito`, `profili`; ricorrente nei moduli successivi). `montante` accetta ora `etichetta`, `rivtit` e `riv` per diventare il barattolo del TFR.
- Qui: `scalini` in s02, s25, s29; la ricetta IPS come `catena` a stati (s13–s16); il conto in tre passi (s19–s21).

## Che cosa è andato storto e come si è deciso

- La `catena` con `attive` non spegneva i passi: un'animazione di `figure.mjs` (`scivola`) copriva quella delle parti spente. Aggiunta `scivolaOff` (opacità 0,26) in tutte le lezioni del modulo.
- `scalini` nella prima prova galleggiava sopra l'asse: ora i gradini partono dalla base, con l'area tenue sotto.

## Costi

- voce: due generazioni ElevenLabs (A e B), nessuna rigenerata (sessioni in `perseo/sessioni-voce-m2.json`)
- trascrizioni: due, dall'asset audio

## La resa

- video HeyGen: `63b722dcfc8eed6d0f66fd40b6104565` — **completato**, 6:07,5 (367,5 s), 1920×1080,
  sottotitoli SRT. Pagina: https://app.heygen.com/videos/63b722dcfc8eed6d0f66fd40b6104565
- lotto asset `f6044c5a6fcb4a679b6af6391cadd2c0` (90 file)
- copia di controllo locale: `montato-2.2.mp4` 6:08,7 (non versionata) e `montato-2.2.srt`

## Da verificare — quello che non ho potuto giudicare io

- **IPS**: 80 % dell'ultima retribuzione utile ÷ 15 × anni; buonuscita ÷ 12; anzianità retribuzione intera ÷ 12. Controllare i coefficienti (buonuscita: base 80 %? la norma usa l'80 % della retribuzione per 1/12).
- **I tempi di pagamento**: vecchiaia 12 mesi + 3 tecnici; **dal 2027 nove mesi** (legge di bilancio 2026) per chi matura i requisiti da quell'anno; dimissioni 24 mesi; rate sopra 50.000 €.
- La resa «buona uscita» nella voce: ascoltare s08 e s17.
- La voce non l'ho ascoltata: verifiche per trascrizione e per pause.
