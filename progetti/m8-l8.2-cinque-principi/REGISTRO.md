# REGISTRO — Lezione 8.2 · I cinque principi

Corso **Progressione verticale · Comparto Sanità**, Modulo 8, Normativa sul pubblico impiego.
Stesso metodo, voce, marchio e palette dei moduli 1-7: voce di Luca Ward (`tVdVcJPudubxmTmAw4tE`,
`eleven_v3`), senza avatar, ≥ 7:00. Le slide usano la libreria `slide/illustra.mjs`,
che nel modulo 8 passa da 36 a 41 illustrazioni SVG originali animate: si aggiungono timone
(la guida che oscilla), podio (tre gradini, la medaglia), firma (il contratto con due firme, penna e timbro),
cruscotto (il quadrante con la lancetta che si muove) e lavoroagile (portatile, orologio, finestra, wifi e pianta).
Ogni clip dura quanto il suo blocco audio (fino a 30 s), così l'animazione d'ambiente continua per tutta la scena.

**Fonti**: D.Lgs. 165/2001 artt. 2, 4, 7 c. 5-bis, 14, 35, 36, 40-47, 52 c. 1-bis; art. 97 Cost.; CCNQ 2016 sui comparti; D.Lgs. 150/2009 art. 3; dispensa su Drive (con correzioni).

## Aritmetica

| | valore |
|---|---|
| blocchi / scene | 48 / 50 |
| caratteri | 7.678 con i tag |
| stacco | dopo **s23** |
| grezzo | A 259,04 s · B 305,60 s = 564,6 s |
| parlato lavorato | **441,4 s** (22 pose) |
| CPS misurato | 17,4 car/s sul lavorato |
| montato locale | **7:34,80** |
| montato HeyGen | **7:33,39** |

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, `eleven_scribe_v1`):
  A: 535/535 parole, 0 buchi
  B: 634/634 parole, 0 buchi
- **Confini**: Nessuna coppia di segno opposto, nessun blocco fuori fascia.
  `audio/correzioni.json` = nessuna.
- **Temi cambiati rispetto al copione**: nessuno.
- **Slide**: PNG guardati in provini da nove, traboccamento verificato con i caratteri veri.
  - **s05**: `griglia` a 5 colonne (non restano celle vuote).
  - **s10**, **s19**, **s30**: i divieti passano da chip neutri a `icone` con il segno di divieto.
  - **s11**: un `tre` con un riquadro non narrato rifatto come `confronto`.
- `controlli.py`: 8/8.

## Montaggio

- Lotto HeyGen `8ec87a7ace874dbc9ff2cbaebce6739f`: 98 file accoppiati per posizione, 0 discordi sul `content-type`.
- Payload: 50 scene; 48 scene video, tutte con `audio_asset_id` e `playback {freeze, mute}`.
- Video HeyGen: `6d37668477ca04549176135fc9e6f529` (https://app.heygen.com/videos/6d37668477ca04549176135fc9e6f529).
- Il file consegnato non si scarica da questa sessione (proxy: 403 su files2.heygen.ai).

## Costo

```
voce, due tracce, 7.678 caratteri, eleven_v3        ≈ $1,28  (misurato)
trascrizione delle due tracce intere               ≈ $0,51  (misurato)
                                                    -------
                                                    ≈ $1,79
```

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** La verifica è per trascrizione, durate e fotogrammi.
- Da confrontare con le fonti, in particolare:
  - **Art. 52 c. 1-bis**: il testo su Drive è del 2020; il corso usa quello del D.L. 80/2021 (procedura comparativa, almeno metà dei posti all'esterno). Da verificare.
  - La composizione dei quattro comparti (CCNQ 2016) va confermata sull'ultimo accordo quadro.
  - Gli esempi in azienda sanitaria sono inventati a scopo didattico.
- **La fonte prevista dal piano del corso per il modulo 8, `Pubblico-Impiego.pdf`, non è disponibile** (né nel repository né su Drive). I contenuti vengono dal **testo del D.Lgs. 165/2001 aggiornato al 24 gennaio 2020** su Drive (con il D.Lgs. 75/2017), dal **D.P.R. 62/2013** nel testo originario (senza il D.P.R. 81/2023), da estratti del **D.Lgs. 150/2009** (testo vigente dal 22/6/2017), da una dispensa del 2025 su Drive e dalla conoscenza generale della materia. Le modifiche successive al 2020 (D.L. 80/2021, D.L. 36/2022, D.P.R. 82/2023, D.P.R. 81/2023, L. 114/2024) non sono state lette sul testo vigente: il proxy blocca Gazzetta Ufficiale e normattiva. Sono **da verificare**.
- La **dispensa contiene errori** che il corso non riprende: contestazione disciplinare «entro 20 giorni» (sono 30; 20 è il preavviso per l'audizione); abuso d'ufficio ancora citato (abrogato dalla L. 114/2024); incarichi dirigenziali «da 2 a 7 anni» (oggi 3-5); esterni «5% + 5%» (10% e 8%); «concorsi interni» per la prima fascia; il «ruolo unico» della dirigenza presentato come attuato; la dirigenza del SSN (D.Lgs. 502/1992) assente; spoils system a 90 giorni esteso a tutti gli incarichi (solo quelli di vertice); contratti integrativi «alla Corte dei conti in 5 giorni» (vanno ad ARAN e CNEL; la Corte certifica il CCNL); OIV che «valida il piano» (valida la relazione); PIAO assente; fasce 25/50/25 presentate come vigenti; dotazioni organiche «ogni tre anni» (oggi piano dei fabbisogni); co.co.co. ammesse (vietate dall'art. 7 c. 5-bis); nulla osta alla mobilità (abolito, salvo SSN e piccoli enti); la regola dei 50 km messa fra le eccedenze (è l'art. 30 c. 2); aree di classificazione diverse dal CCNL Sanità 2019-2021; progressione verticale al 50% ambigua e presentata come «concorso per soli titoli»; deroga Madia al 20% indicata come 30%; riforma Bassanini ridotta alla semplificazione; L. 421/1992 omessa; «Testo Unico» usato come nome ufficiale (è solo d'uso); D.P.R. 62 senza l'aggiornamento 2023; «cinque responsabilità»; D.P.R. 487/1994 senza la riscrittura del D.P.R. 82/2023; onnicomprensività presentata in modo fuorviante; casi dell'art. 55-quater vaghi.
- **Da verificare in generale**: art. 52 c. 1-bis dopo il D.L. 80/2021 (procedura comparativa, almeno metà dei posti all'esterno) e la disciplina transitoria fino al 31/12/2025; PEO e differenziali economici nel CCNL Sanità; permanenza di cinque anni (art. 35 c. 5-bis); graduatorie a due anni; portale inPA (art. 35-ter); art. 35-quater sulle prove; albo dei commissari; D.P.R. 220/2001 per il comparto; D.P.R. 82/2023; tetto retributivo di 240.000 euro (D.L. 66/2014); regali fino a 150 euro (D.P.R. 62 art. 4 c. 5); regole su social e tecnologie (D.P.R. 81/2023); dirigenza SSN (D.Lgs. 502 art. 15 ss.); scala delle sanzioni nel CCNL Sanità (multa fino a 4 ore, sospensione fino a 10 giorni e fino a 6 mesi); art. 55-quater c. 3-quater dopo Corte cost. 61/2020; composizione dei comparti; mobilità 2024-2025; PIAO (D.L. 80/2021 art. 6); lavoro agile (L. 81/2017 artt. 18-23 e CCNL Sanità); direttiva 2023 sulla formazione (24 ore).
- Documenti personali presenti su Drive (informative con nomi, lettere d'incarico, procedimenti disciplinari, lettere di richiesta di accesso, DSU) e le **lettere CISL FP** non sono stati usati; nessuna persona è nominata, nemmeno l'autore della dispensa.
- Il marchio è il logo CISL FP (non «Padova Rovigo»): vale quanto detto nella 1.1.
