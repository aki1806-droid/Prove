# L'IA per chi fa sindacato — istruzioni di produzione video per Claude Code

Questo repository contiene i pacchetti delle lezioni del corso (CISL FP Padova Rovigo, voce di Achille Pagliaro, nessun avatar). Il tuo compito: trasformare ogni pacchetto in un video finito da almeno 12 minuti, 1920×1080, senza monotonia visiva.

Leggi tutto questo file prima di produrre. Se qualcosa qui sotto contraddice METODO.md / STANDARD.md di Achille, segui questo file per questo corso e segnala la differenza.

## 1. Struttura

```
kit/
  scena.html            motore delle scene grafiche (copertina, testo, tabella, memo, errori, chiusura)
  logo/                 logo CISL FP Padova Rovigo: _colori, _fondo-scuro, _bianco (SVG)
M00/                    un modulo per cartella (M00 … M18)
  IAS_M00_L01_SCRIPT.md        testo parlato diviso in blocchi B01…Bnn
  IAS_M00_L01_SCALETTA.json    inquadrature per blocco (la fonte per il montaggio)
  IAS_M00_L01_SCALETTA.md      stessa scaletta, leggibile
  IAS_M00_L01_PROMPT-VISIVI.md prompt di immagini (I..), clip (C..) e copioni delle registrazioni (R..)
  IAS_M00_L01_DISPENSA.md      dispensa da impaginare in PDF
  svg/                         animazioni SVG della lezione (A..)
```

Output di ogni lezione in `build/IAS_Mxx_Lyy/`: audio, inquadrature renderizzate, `IAS_Mxx_Lyy.mp4`, `IAS_Mxx_Lyy.srt`, `IAS_Mxx_Lyy_DISPENSA.pdf`, `registro.json`, `provini.png`.

## 2. Voce

- ElevenLabs, voce **«Achille nuovo 1 v4»**: ricava il `voice_id` cercando la voce per nome nell'account; usa il modello configurato per quella voce e annotalo in `registro.json`.
- Una traccia per blocco dello script (`### Bnn`), testo esattamente come scritto, senza l'intestazione. Una sola generazione per blocco.
- Post-produzione di ogni traccia, in quest'ordine: `silenceremove` (taglia i silenzi iniziali e finali sopra 0,3 s), poi `atempo=1.12`.
- Tra un blocco e l'altro inserisci 0,35 s di silenzio.
- **Controllo durata:** la somma deve dare almeno 12:00 compresi copertina (3 s) e chiusura (10 s). Se resta sotto, porta la pausa tra blocchi a 0,6 s; se ancora non basta, fermati e segnalalo: va allungato lo script, non rallentata la voce.
- I blocchi marcati `[SEGNAPOSTO]` contengono episodi in prima persona da confermare; quelli marcati `[DA ADATTARE ALL'ESITO REALE]` descrivono una prova a schermo e vanno riscritti su ciò che si vede nella registrazione. In entrambi i casi genera l'audio ma scrivi in `registro.json` che il video **non è pubblicabile** finché Achille non conferma. Per i `[DA ADATTARE]`, se la registrazione è disponibile, proponi tu il testo corretto in `registro.json` e rigenera l'audio solo dopo la sua approvazione.

## 3. Le inquadrature

La durata di ogni blocco audio si divide tra le sue inquadrature secondo `peso`. Copertina e chiusura hanno `durata` fissa (chiusura muta: la musica la aggiunge Achille).

**Regola del ritmo:** nessuna inquadratura oltre 9 s. Se il peso produce più di 9 s:
- immagine → due inquadrature della stessa immagine: campo largo, poi dettaglio (crop al 60% sul punto più interessante);
- clip → la clip più una seconda variante dello stesso prompt (genera due varianti di ogni clip);
- animazione SVG → dopo la fine dell'animazione, zoom lento su un dettaglio (1,0 → 1,25);
- scena grafica → tabelle e griglie possono restare fino a 12 s; gli altri tipi passano a un'immagine o a una clip del blocco.

Minimo 2,5 s per inquadratura.

### 3.1 Scene grafiche (`tipo: scena`)
Renderizza `kit/scena.html#<JSON della scena, URL-encoded>` con Playwright/Chromium a 1920×1080, 30 fps, in modo **deterministico**: metti in pausa le animazioni e, per ogni fotogramma, imposta `document.getAnimations().forEach(a => a.currentTime = t_ms)` prima dello screenshot. Attendi il caricamento dei font (`document.fonts.ready`) prima del primo fotogramma. Carica ogni scena da una pagina nuova (o passa da `about:blank`): `scena.html` ridisegna anche al cambio di hash, ma una pagina nuova garantisce animazioni che partono da zero. Puoi riusare `render.js` della skill motion-broll se presente.

### 3.2 Animazioni SVG (`tipo: animazione_svg`)
Stesso metodo deterministico, caricando l'SVG nel browser. Alcuni SVG usano anche animazioni SMIL (`<animate>`), che `getAnimations()` non vede: per ogni fotogramma chiama anche `document.documentElement.pauseAnimations()` e `document.documentElement.setCurrentTime(t_secondi)`. Le animazioni finiscono entro 10 s; poi tieni l'ultimo fotogramma (con lo zoom della regola del ritmo). Se c'è `inquadratura` (`zoom`, `centro`, `parti_da: "fine"`): parti dall'ultimo fotogramma e fai un movimento di camera morbido verso `centro` fino a `zoom` in 2 s, poi tieni. Sovrapponi il logo piccolo in alto a sinistra (versione `_colori` su fondo chiaro, `_fondo-scuro` su fondo scuro).

### 3.3 Immagini (`I..`)
Generale dai prompt di `PROMPT-VISIVI.md` (Higgsfield o lo strumento che Achille indica), 1920×1080 o superiore. Scarta e rigenera se compaiono volti riconoscibili, testi leggibili, loghi o mani deformate. Movimento: Ken Burns lento (scala 1,00 → 1,08 in tutta l'inquadratura) con direzione **diversa dall'immagine precedente** (alterna destra, sinistra, alto, centro). Niente testo e niente logo sopra.

### 3.4 Clip (`C..`)
Dai prompt di `PROMPT-VISIVI.md` (Higgsfield, oppure repertorio HeyGen o Artlist). Due varianti per prompt. Niente testo e niente logo sopra. Se una clip è più corta dell'inquadratura, usa la seconda variante; mai rallentare sotto 0,8×.

### 3.5 Registrazioni schermo (`R..`)
Le registra Achille seguendo i copioni in `PROMPT-VISIVI.md` e le mette in `registrazioni/IAS_Mxx_Lyy_Rnn.mp4`. In montaggio: taglia i tempi morti, accelera le attese di risposta fino a 4×, zoom morbido (1,0 → 1,6) sulla zona del prompt e poi della risposta, cursore evidenziato. Per R02 dividi lo schermo in tre colonne. Logo piccolo in alto a sinistra. Se la registrazione manca, usa un segnaposto grafico con scritto «Registrazione Rnn» e segnalalo nel registro.

## 4. Coerenza visiva e varietà

- **Trattamento colore** uguale per tutte le immagini e le clip: `eq=contrast=1.04:saturation=0.92,colorbalance=rs=-0.03:gs=0.02:bs=-0.01:rh=0.04:gh=0.01:bh=-0.03`, più grana leggera `noise=alls=4:allf=t`.
- **Transizioni:** taglio netto di base. Dissolvenza di 8 fotogrammi solo quando cambia il tipo di fondo (chiaro ↔ scuro ↔ immagine). Al passaggio tra gruppi di blocchi segnati in scaletta con `"transizione": "tendina"` (al massimo 3 per lezione), una tendina del colore del livello che scorre da sinistra in 12 fotogrammi.
- Mai più di tre inquadrature di fila con lo stesso fondo: se la scaletta lo produce dopo le suddivisioni, inserisci un'immagine o una clip del blocco.
- Testo a schermo: mai sopra immagini o clip, massimo 6 parole, mai identico al parlato. Se trovi un testo identico al parlato in scaletta, segnalalo.

## 5. Audio, sottotitoli, file finale

- Voce normalizzata a −16 LUFS (`loudnorm=I=-16:TP=-1.5:LRA=11`). Nessuna musica: la aggiunge Achille.
- Sottotitoli SRT in italiano dalle frasi dello script, con i tempi reali di ogni blocco (una riga ≤ 42 caratteri, massimo due righe). File separato, non impresso.
- Video H.264 `-crf 18 -preset slow -pix_fmt yuv420p`, 30 fps, audio AAC 192 kbps, `+faststart`.
- Dispensa: impagina `DISPENSA.md` in PDF A4 con la palette e il logo `_colori` (Montserrat per i titoli, Inter per il testo).

## 6. Controlli prima di consegnare

1. Durata ≥ 12:00.
2. `provini.png`: un fotogramma ogni 10 s in griglia; guardalo e correggi testi tagliati, contrasti scarsi, immagini difettose.
3. Nessuna inquadratura oltre 9 s (salvo tabelle e griglie fino a 12 s).
4. `registro.json`: voce e modello, durate dei blocchi, elenco inquadrature con file sorgente, prompt usati, segnaposto ancora aperti, eventuali problemi.

## 7. Identità visiva (riferimento)

| Ruolo | Codice |
| --- | --- |
| Verde CISL | #00623A |
| Rosso CISL (solo accenti forti, mai testo rosso su verde) | #D70328 |
| Verde notte (fondo scuro) | #0B3D2A |
| Verde nebbia (fondo chiaro) | #E6F2EC |
| Bianco caldo (fondo neutro) | #FAF8F4 |
| Grafite (testo) | #2B2F2E |
| Accento livello 1 / 2 / 3 / 4 | #00623A / #1F5C7A / #E8A33D / #1D2B53 |

Caratteri: Montserrat 800 (titoli), Inter 400/600 (testo), Barlow Condensed 700 (numeri).

## 8. HeyGen

Non serve: il montaggio è tutto locale perché non c'è avatar (e lo Studio HeyGen accetta al massimo 50 scene, mentre una lezione ne ha 60–90). Se Achille chiede comunque di usare HeyGen, chiedigli prima su quale dei suoi due account lavorare.
