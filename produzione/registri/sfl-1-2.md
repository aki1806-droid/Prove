# Registro — SFL 1.2 «La prima riga decide»

Quasi tutte le decisioni di abbandonare un testo si prendono entro le prime
due righe, e la prima riga dei testi di lavoro è quasi sempre occupata da
qualcosa che rimanda il contenuto: il saluto, la premessa, la scusa,
l'annuncio. La lezione mostra l'anteprima del telefono, dove la prima riga è
spesso tutto quello che si vede; tre aperture che funzionano (**il fatto, la
richiesta, la risposta**); perché le brutte notizie non vanno preparate per
iscritto; e tre aperture da togliere. La frase da tenere: **arrivare al punto
è una forma di cortesia**.

| campo | valore |
|---|---|
| video_id | `b6670059ac1cb312aa87ced2ecca7ffc` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) — misurata sul montato |
| parlato | 587,2 s (555,2 s di voce tagliata + 32,0 s di pose) |
| copione | 10.008 caratteri in 48 blocchi, media 208 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s13` telefono |
| costo | **~33 crediti HeyGen** di voce (66 per la 1.2 e la 1.3 insieme, letti sul saldo: 6.775 → 6.707 compresi due render) + **1** di render; una chiamata andata in timeout non è stata addebitata |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,41 s**, taglio a metà della pausa.

## Le scelte

**Due schermate F**, layout `pd`:

- la pratica approvata, «Gentile dottoressa, spero che tutto proceda bene…»
  contro «la pratica è stata approvata. Le scrivo cosa serve adesso.»
  (`c09`–`c12`);
- il permesso sospeso, la versione che prepara contro quella che dice subito
  e offre la soluzione (`c27`–`c30`).

Lo script parla di «tre schermate F»: la terza è la slide C delle **tre
aperture che bruciano la riga** (`c36`–`c39`), fatta come elenco con una voce
accesa alla volta, perché sono tre formule da togliere e non un prima/dopo.

Le parti dello script che la voce leggeva come formule («Spero che tu stia
bene», «Scusa il disturbo», «Volevo solo dirti che») restano dette: sono
**citazioni** delle aperture, non il testo a schermo letto ad alta voce.

## La ripresa

**`s13`**, un dito che scorre l'elenco dei messaggi su un telefono, con lo
schermo illeggibile. Arriva su «E c'è una ragione in più, che riguarda come i
testi vengono ricevuti oggi».

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa, tutti al loro posto.
Silenzi oltre 2,5 s: la copertina, la chiusura e **2,6 s dopo il memo
`s42`**, voluti — il memo ha la posa lunga.
