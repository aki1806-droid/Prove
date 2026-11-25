# Mini video dell'assemblea — schema dei copioni

Ogni video è un file `NN-nome.json`: un array di blocchi, uno per scena.

```json
[
 {"id":"s01","testo":"<parlato>","scena":{"tipo":"titolo","kicker":"PUNTO 4 · WELFARE","titolo":"350 euro a testa","sotto":"Da dove arrivano e come non perderli"}},
 ...
]
```

## Regole del parlato (`testo`)
- Voce narrante (Luca Ward), italiano parlato, frasi brevi, tono caldo e chiaro, da assemblea sindacale CISL FP. "Noi" = CISL FP. Mai nominare altri sindacati o persone.
- 9–12 blocchi per video, 140–230 caratteri ciascuno; **totale parlato 1.750–1.950 caratteri** (= circa 100 secondi).
- Numeri e sigle scritti come si leggono: "trecentocinquanta euro", "un milione e mezzo", "legge regionale ventisei del duemilaventiquattro", "contratto nazionale" invece di CCNL, "O-esse-esse" → scrivere "gli OSS" va bene; date "quattordici maggio duemilaventisei". Niente simboli (€, %, /, →): "per cento", "euro".
- Ogni numero detto deve essere vero e presente nelle fonti indicate. Se un dato è segnato ⚠ da verificare, non usarlo.
- Primo blocco: aggancio (domanda o fatto forte). Ultimo blocco: cosa fare / messaggio finale.

## Tipi di scena (`scena`) — testi sulle grafiche brevi (max ~60 caratteri per riga), grafia vera (€, %, sigle)
- `titolo`: kicker, titolo, sotto
- `numero`: kicker, numero (es. "350 €"), etichetta, nota (opz.)
- `frase`: frase (citazione o slogan, ≤110 car.), fonte (opz.)
- `elenco`: kicker, titolo, voci (2–4 stringhe brevi)
- `confronto`: kicker, titolo, sinistra {etichetta, valore, nota}, destra {etichetta, valore, nota} — sinistra = rosso (Azienda/oggi/problema), destra = verde (CISL/domani/soluzione)
- `barre`: kicker, titolo, barre [{etichetta, valore (numero), testo (es. "743 €")}] (2–5 barre)
- `documento`: kicker, titolo, immagine (percorso relativo alla cartella slide/, es. "schermate/lr26-welfare-350.png" o "schermate/tavolo-occupazione-grafico.jpg" — SOLO file che esistono), didascalia
- `chiusura`: frase, azione (es. "Inquadra il QR in sala")

Variare i tipi: almeno un `documento` per video dove esiste una schermata pertinente.
