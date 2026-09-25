# REGISTRO — Lezione 5.4 · Avvio, partecipazione e motivazione

Corso **Progressione verticale · Comparto Sanità**, Modulo 5, Procedimento amministrativo e accesso.
Stesso metodo, voce, marchio e palette dei moduli 1-4: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 5 passa da 22 a 27 illustrazioni SVG originali animate: si aggiungono clessidra
(sabbia che scende e si gira), sportello, archivio (cassetto che si apre), cassaforte e busta.
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 241/1990 artt. 7, 8, 9, 10, 10-bis (testo dopo il D.L. 76/2020), 13, 18-bis, 3; art. 21-octies c. 2; dispensa CISL FP.

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.250 con i tag |
| stacco | dopo **s25** |
| grezzo | A 250,48 s · B 271,68 s = 522,2 s |
| parlato lavorato | **413,2 s** (24 pose) |
| CPS misurato | 17,5 car/s sul lavorato |
| montato locale | **7:06,60** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 548/548 parole, 0 buchi
  B: 573/573 parole, 0 buchi
- **Confini**: Prima stesura a 6:53,6 con **s02** a 21,6 car/s: aggiunte pose nel copione (0,8 s su serious, tenue e «le tre cose»; 0,6 s su esempi; 0,5 s su «l'articolo»), 7:06,2 e nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - nessuna correzione dopo i provini.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.250 caratteri, eleven_v3        ≈ $1,19  (stimato sui caratteri)
trascrizione delle due tracce intere               ≈ $0,47  (stimato sui secondi)
                                                    -------
                                                    ≈ $1,67
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - **Art. 10-bis dopo il 2020**: sospende i termini (non li interrompe), ripartono 10 giorni dopo le osservazioni; divieto di motivi nuovi dopo l'annullamento; esclusione di concorsi e procedimenti previdenziali. Verificato solo con estratti di ricerca.
  - **Art. 21-octies c. 2** e il diniego senza preavviso: modifica del 2020, da confermare sul testo vigente.
  - Gli esempi (riconoscimento di un periodo di servizio, diniego di un'aspettativa) sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 5, `Procedimento-Amministrativo.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo della L. 241/1990 aggiornato al 20/9/2019 (edizione Città di Torino, su Drive) e dalla dispensa CISL FP di legislazione e diritto amministrativo. Le modifiche successive al 2019 (D.L. 76/2020, L. 108/2021) sono state verificate **solo attraverso estratti di ricerca**: il proxy blocca normattiva. Va fatto un confronto con il testo vigente e con quel PDF appena c'è.
- La **dispensa CISL contiene errori** che il corso non riprende: chiama «RUP» il responsabile del procedimento, indica 18 mesi per l'annullamento d'ufficio, attribuisce all'art. 21-septies cause di nullità che non contiene, mette i vizi di merito tra quelli di legittimità e fa discendere la trasparenza dall'art. 97 Cost.
- I **termini dell'autotutela** (art. 21-nonies) sono stati omessi di proposito: il termine è cambiato più volte e le notizie più recenti non si sono potute verificare.
- Documenti personali presenti su Drive (procedimenti disciplinari, lettere di richiesta di accesso) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
