# REGISTRO — Lezione 7.1 · Dalla 675/1996 al GDPR

Corso **Progressione verticale · Comparto Sanità**, Modulo 7, Trattamento dei dati personali.
Stesso metodo, voce, marchio e palette dei moduli 1-6: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 7 passa da 31 a 36 illustrazioni SVG originali animate: si aggiungono globo
(la Terra con i meridiani e l'anello di stelle europeo), imbuto (i dati che si riducono al minimo), cartellaclinica,
impronta (l'identità, con la linea di scansione) e bilancia (il bilanciamento, con il giogo che oscilla).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: L. 675/1996; direttiva 95/46/CE; D.Lgs. 196/2003; Regolamento (UE) 2016/679 artt. 1-4, 51, 77, 99; D.Lgs. 101/2018; Carta dei diritti fondamentali UE art. 8; dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 47 / 49 |
| caratteri | 7.451 con i tag |
| stacco | dopo **s20** |
| grezzo | A 211,20 s · B 360,08 s = 571,3 s |
| parlato lavorato | **458,9 s** (22 pose) |
| CPS misurato | 16,2 car/s sul lavorato |
| montato locale | **7:52,31** |
| montato HeyGen | **7:50,97** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 466/466 parole, 0 buchi
  B: 738/738 parole, 0 buchi
- **Confini**: **s10** a 21,2 car/s (oltre 21): le correzioni `pause ±1` davano 25 car/s in entrambi i versi; risolto spostando il confine di −0,8 s, clip s09/s10 rifatte, poi verifica al 100%.
  `audio/correzioni.json` = {"A": {"7": {"secondi": -0.8}}}.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s05**: etichetta accorciata (traboccava).
  - **s33**, **s48**: a capo del titolo rifatti.
  - **s36**: l'illustrazione `bilancio` (libro dei conti) sostituita dalla nuova `bilancia` per il bilanciamento.
  - Illustrazione `globo`: l'anello di stelle era fuori centro (transform-origin in linea); corretto, raggio 234.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `ef66bbbad62b48479b55d3c2ef479e03`: 96 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 49 scene; 47 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `800cdc0e5eeb5b2cb32ad6b6ecbea66e` (https://app.heygen.com/videos/800cdc0e5eeb5b2cb32ad6b6ecbea66e).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.451 caratteri, eleven_v3        ≈ $1,24  (misurato)
trascrizione delle due tracce intere               ≈ $0,52  (misurato)
                                                    -------
                                                    ≈ $1,76
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Nuove illustrazioni SVG del modulo: **globo, imbuto, cartellaclinica, impronta, bilancia** (libreria a 36 figure).
  - Le date (675 del 31/12/1996, regolamento applicabile dal 25/5/2018, D.Lgs. 101/2018 in vigore dal 19/9/2018) vanno confermate sulle fonti ufficiali.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 7, `Privacy-e-Protezione-dei-Dati-Personali.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo del **Regolamento (UE) 2016/679** su Drive (edizione tascabile del Garante, 2017: artt. 1-39, 77, 79, 82-84, 99), da quattro dispense su Drive e dalla conoscenza generale della materia. Il **Codice (D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018)** non è stato letto sul testo vigente: il proxy blocca Garante, EUR-Lex, Gazzetta Ufficiale e normattiva. Gli articoli del Codice citati sono **da verificare**.
- Le **dispense contengono errori** che il corso non riprende: «incaricati» e «responsabili interni» al posto delle persone autorizzate e dei soggetti designati (art. 2-quaterdecies); «30 giorni» per rispondere (è un mese, prorogabile di due); cartella clinica conservata «10 anni» (va conservata senza limite); consenso per alimentare il FSE (abolito dal D.L. 34/2020); art. 2-octies riferito al lavoro (riguarda i dati giudiziari); reati inesistenti o abrogati (162-ter, 169); il provv. 5/6/2019 n. 146 presentato come misure dell'art. 2-septies; la portabilità come diritto generale; il DPO che notifica le violazioni o coordina la DPIA; solo la soglia 20 milioni/4%; una descrizione imprecisa dell'art. 167; l'oscuramento presentato come limitazione; il «consenso informato privacy» confuso con il consenso sanitario; le autorizzazioni generali presentate come vigenti; il D.Lgs. 196 che avrebbe recepito la direttiva 95/46 (fu la L. 675/1996); «Consiglio europeo» al posto del Consiglio dell'UE.
- **Da verificare in generale**: D.L. 139/2021 sugli artt. 2-ter e 2-sexies; FSE 2.0 (D.M. 7/9/2023); Spazio europeo dei dati sanitari (Reg. UE 2025/327); adozione delle misure di garanzia dell'art. 2-septies; provv. Garante 7/3/2019 n. 55 (consenso in sanità); linee guida sul dossier sanitario (2015); art. 110 del Codice dopo il D.L. 19/2024; pene dell'art. 167; circolare del 1986 sulla conservazione illimitata della cartella; L. 24/2017 art. 4 c. 2 (7 giorni); art. 2-decies (inutilizzabilità dei dati, non sanzioni). Il testo del regolamento usato è l'edizione 2017, probabilmente senza la rettifica del 2018.
- Documenti personali presenti su Drive (informative con nomi, lettere d'incarico, procedimenti disciplinari, lettere di richiesta di accesso, DSU) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
