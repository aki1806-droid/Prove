# REGISTRO — Lezione 7.3 · Le basi giuridiche

Corso **Progressione verticale · Comparto Sanità**, Modulo 7, Trattamento dei dati personali.
Stesso metodo, voce, marchio e palette dei moduli 1-6: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 7 passa da 31 a 36 illustrazioni SVG originali animate: si aggiungono globo
(la Terra con i meridiani e l'anello di stelle europeo), imbuto (i dati che si riducono al minimo), cartellaclinica,
impronta (l'identità, con la linea di scansione) e bilancia (il bilanciamento, con il giogo che oscilla).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: Regolamento (UE) 2016/679 artt. 6, 7, 8, 88, considerando 43 e 47; Codice artt. 2-ter, 2-quinquies; dispense su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.315 con i tag |
| stacco | dopo **s25** |
| grezzo | A 284,16 s · B 291,20 s = 575,4 s |
| parlato lavorato | **436,8 s** (24 pose) |
| CPS misurato | 16,7 car/s sul lavorato |
| montato locale | **7:30,19** |
| montato HeyGen | **{HG}** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 598/598 parole, 0 buchi
  B: 590/590 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s09**, **s20**, **s39**: `bilancio` sostituito dalla nuova `bilancia`.
  - **s40**: la `porta` (che si apre) usata per una «porta chiusa»: rifatta come `confronto`.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `{LOTTO}`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.{EXTRA}
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `{VID}` (https://app.heygen.com/videos/{VID}).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.315 caratteri, eleven_v3        ≈ $1,22  (misurato)
trascrizione delle due tracce intere               ≈ $0,52  (misurato)
                                                    -------
                                                    ≈ $1,74
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - Art. 2-ter del Codice dopo il D.L. 139/2021 (base anche in atti amministrativi generali): da verificare.
  - Il consenso del dipendente «di regola non libero» nel rapporto di lavoro è indicazione dei considerando e del Garante, non una norma letterale.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 7, `Privacy-e-Protezione-dei-Dati-Personali.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal testo del **Regolamento (UE) 2016/679** su Drive (edizione tascabile del Garante, 2017: artt. 1-39, 77, 79, 82-84, 99), da quattro dispense su Drive e dalla conoscenza generale della materia. Il **Codice (D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018)** non è stato letto sul testo vigente: il proxy blocca Garante, EUR-Lex, Gazzetta Ufficiale e normattiva. Gli articoli del Codice citati sono **da verificare**.
- Le **dispense contengono errori** che il corso non riprende: «incaricati» e «responsabili interni» al posto delle persone autorizzate e dei soggetti designati (art. 2-quaterdecies); «30 giorni» per rispondere (è un mese, prorogabile di due); cartella clinica conservata «10 anni» (va conservata senza limite); consenso per alimentare il FSE (abolito dal D.L. 34/2020); art. 2-octies riferito al lavoro (riguarda i dati giudiziari); reati inesistenti o abrogati (162-ter, 169); il provv. 5/6/2019 n. 146 presentato come misure dell'art. 2-septies; la portabilità come diritto generale; il DPO che notifica le violazioni o coordina la DPIA; solo la soglia 20 milioni/4%; una descrizione imprecisa dell'art. 167; l'oscuramento presentato come limitazione; il «consenso informato privacy» confuso con il consenso sanitario; le autorizzazioni generali presentate come vigenti; il D.Lgs. 196 che avrebbe recepito la direttiva 95/46 (fu la L. 675/1996); «Consiglio europeo» al posto del Consiglio dell'UE.
- **Da verificare in generale**: D.L. 139/2021 sugli artt. 2-ter e 2-sexies; FSE 2.0 (D.M. 7/9/2023); Spazio europeo dei dati sanitari (Reg. UE 2025/327); adozione delle misure di garanzia dell'art. 2-septies; provv. Garante 7/3/2019 n. 55 (consenso in sanità); linee guida sul dossier sanitario (2015); art. 110 del Codice dopo il D.L. 19/2024; pene dell'art. 167; circolare del 1986 sulla conservazione illimitata della cartella; L. 24/2017 art. 4 c. 2 (7 giorni); art. 2-decies (inutilizzabilità dei dati, non sanzioni). Il testo del regolamento usato è l'edizione 2017, probabilmente senza la rettifica del 2018.
- Documenti personali presenti su Drive (informative con nomi, lettere d'incarico, procedimenti disciplinari, lettere di richiesta di accesso, DSU) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
