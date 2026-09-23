# REGISTRO — Lezione 1.1 · Dalla 833 alla crisi: perché serviva la riforma

Corso **Progressione verticale · Comparto Sanità** — Modulo 1, Legislazione sanitaria nazionale.
Prima lezione del corso: è quella che fissa voce, marchio e palette, e fa da collaudo
(STRUTTURA §6, «il blocco 1 vale come collaudo»).

## Scheda

| | valore | da dove viene |
|---|---|---|
| durata chiesta | **≥ 7:00** (profilo: 421 s) | utente: «video da minimo 7 minuti» |
| pausa musicale | no | nessuna richiesta |
| copione | scritto qui, dal nucleo di STRUTTURA M1 | nessuno script di partenza |
| voce | **Luca Ward** `tVdVcJPudubxmTmAw4tE`, `eleven_v3` | utente: «voce luca ward versione v3» |
| stile | quello dei corsi CISL FP Padova Rovigo (MASTER §8) | utente |
| palette | `#00623A` / `#D70328` / `#004E2E` / `#FCF4F3` | MASTER §8, invariata |
| marchio | logo CISL FP da Drive (`LOGO CISL FP.docx`), rifilato, in alto a sinistra | vedi «Da verificare» |
| caratteri | Inter + Source Serif 4, latin/latin-ext, incorporati | MASTER §8 |
| formato | 1920×1080, 25 fps | MASTER §8 |
| tetti | 50 scene · 100 file per lotto · 225 car/blocco | MASTER §8 |

## Scelta sulla forma: MASTER, non avatar

Lo STANDARD-HEYGEN del corso descrive lezioni da 6 minuti con avatar sempre visibile.
La richiesta («slide, grafiche, tabelle, grafici, SVG, grafica animata come CISL FP») e la
durata (≥ 7 min) sono quelle del MASTER: **slide animate e voce, senza avatar**. Dello
STANDARD restano le regole di scrittura: aggancio, rotta, corpo, «le tre cose che ti
chiederanno», chiusura con ponte; seconda persona; sigle per esteso nel parlato; testo a
schermo che non ripete il parlato.

## Aritmetica

| | stimato | misurato |
|---|---|---|
| blocchi / scene | 47 / 49 | 47 / 49 |
| caratteri | 7.777 (A 3.835 · B 4.032 con i tag) | — |
| stacco | dopo **s24** (fine cap. 5 «La spesa») | — |
| grezzo | — | A 306,72 s · B 338,16 s = 644,9 s |
| parlato lavorato | 463 s a 17,0 car/s | **470,1 s** (464,1 netti + 6,0 di pose) |
| CPS della voce | 17,0 (era GianP) | **16,76** → `profilo.py` ora 16,8 |
| rapporto grezzo/lavorato | 1,30 | **1,39** (Luca Ward fa pause più lunghe) |
| montato locale | 7:56 | **8:03,44** |

Il copione è stato portato da 7.302 a 7.777 caratteri *prima* di generare la voce, con tre
blocchi di contenuto (spesa storica, l'analogia dell'assicurazione, il debito oltre il 100%):
il CPS di Luca Ward non era mai stato misurato, e a 19 car/s il video sarebbe uscito sotto i
7 minuti. Misurato dopo, il margine era più largo del necessario: meglio così che rigenerare.

## Verifiche

- **Trascrizione delle tracce intere** (da asset audio, non dal nodo che le ha generate —
  il testo torna con accentate vere e senza tag): A 606/611 parole, B 654/660,
  **nessun buco**. Unico scarto vero: s17 «più che la competenza» detto
  «piuttosto che la competenza» — stesso senso, lasciato.
- **Rese dichiarate** in `audio/verifica-testo.py`: «a piè di lista» → «a piedi lista».
- **Confini** (DTW sul grezzo): 0 blocchi fuori fascia su 47. `verifica-locale.py` ha
  segnalato **s06/s07** (−3,1 s / +2,0 s). Deciso col conto sul grezzo, non a occhio: il
  taglio era sulla pausa di virgola a 74,86 (0,45 s); con quel confine s07 sarebbe stato
  detto a 11 car/s grezzi, contro i 14-16 della voce. Spostato di una pausa (78,58→79,71,
  1,13 s): s07 a 14,7, s06 a 15,7 contando le cifre come si pronunciano.
  `correzioni.json` = `{"A": {"4": {"pause": 1}}}`. Dopo: nessuna coppia sospetta.
- `prova.mp3` (i 1,6 s prima di ogni taglio) **non è stato trascritto**: il servizio
  trascrive solo da URL https e la sessione non ha un posto pubblico dove metterlo.
- **Slide**: 49 PNG guardati in provini da nove. Traboccamento verificato dopo i caratteri
  veri, con un'esca (+1.357 px, presa).

### Trovato solo guardando i provini

1. **s13 piramide rotta**: il tipo `piramide` di `grafica.mjs` usava `acc()` dentro i
   `<text>` SVG — la trappola 1 del MASTER §5, dentro la libreria. Corretto in `piano()`.
2. **s24**: la nota della barra usciva a destra e veniva tagliata dal `viewBox`.
   Il controllo di traboccamento **non la vede** (è un clip interno all'SVG). Corretto
   allargando la scala (`max:10`) e accorciando la nota.
3. **Marchio piccolo**: il logo CISL FP è quasi quadrato; a 70 px di altezza spariva.
   Portato a 92 px in `layout.mjs`.

## Modifiche agli strumenti condivisi (da portare nelle lezioni successive)

- `copione/costruisci.py`: lo stacco è il cambio di capitolo **più vicino** alla metà, non
  il primo dopo; e se una traccia supera 5.000 caratteri è un errore. Con la regola vecchia
  la traccia A usciva a 4.968.
- `slide/grafica.mjs`: `piramide` usa `piano()`; `barre` scrive la virgola decimale e
  accetta `lab` per le soglie («oltre 100%»).
- `slide/layout.mjs`: logo a 92 px.
- `audio/verifica-testo.py`: resa «piedi lista».
- `profilo.py`: `DURATA_CHIESTA` 421, `CPS` 16,8 misurato su Luca Ward, `STACCO` s24.

## Montaggio

- Lotto HeyGen `856dad4c0234433bb8a480bf9407a6ff`: 96 file, accoppiati per posizione e
  verificati sul `content-type` (0 discordi). Lo stato ha detto «completed» con 68 item
  ancora in lavorazione, come previsto.
- **s03.mp3 è rimasto in `processing` per oltre sei minuti**: ricaricato da solo nel lotto
  `c4b178164fd34ee8adba1f5f89d4c23f` (asset `b766597ae4ed4dbab4b28f2652d826d9`).
- Payload: 49 scene; 47 scene video tutte con `audio_asset_id` e `playback {freeze, mute}`;
  96 asset distinti. Video HeyGen: `b7de5c63bbe1c5bbbe2577622e199473`
  (https://app.heygen.com/videos/b7de5c63bbe1c5bbbe2577622e199473).
- Render in 69 s. **Durata consegnata 8:02,16** (482,16 s) contro 8:03,44 in locale:
  1,28 s su 49 scene, i ~25 ms per scena del MASTER.
- Il file consegnato **non si scarica** da questa sessione (proxy: 403 su files2.heygen.ai):
  il controllo di durata sopra è sul montato locale e sul dato del servizio.

## Costo misurato

```
voce, due tracce, 7.867 caratteri con i tag, eleven_v3    $1,30
trascrizione delle due tracce intere                        $0,59
                                                            -----
                                                            $1,89
```
Il preventivo ElevenLabs di questa sessione coincideva con l'addebito (un credito per
carattere), non era pessimistico di 2,2× come nel MASTER.

## Da verificare — quello che non ho potuto giudicare io

- **Nessuno ha ancora ascoltato il video.** Né il montato locale né quello HeyGen: la
  verifica è per trascrizione, durate e fotogrammi campione.
- **La dispensa sorgente non c'era.** Il copione è scritto sul nucleo di STRUTTURA e su
  norme note (L. 833/1978, L. 421/1992, D.Lgs. 502/1992, 517/1993, 229/1999, Maastricht
  7/2/1992). Da confrontare con `Legislazione-Sanitaria-Nazionale.pdf`, in particolare:
  le cifre di spesa 5,8% → oltre 7% del PIL (dal nucleo di STRUTTURA, senza anni);
  «oltre 10.000 miliardi di lire» per punto di PIL (stima mia sul PIL dei primi anni '90);
  il debito 1992 «oltre il 100%»; la ripartizione del fondo «di fatto sulla spesa storica».
- **Il marchio**: in Drive c'è solo il logo **CISL FP** (JPEG su bianco, 336×226, reso
  trasparente e rifilato). Il MASTER parla del logo «CISL FP Padova Rovigo»: se esiste in
  PNG, va messo in `slide/marchio/logo-rifilato.png`. A bassa risoluzione, a 92 px regge.
- **La 1.1 dice «lo troverai nelle dispense: lottizzazione»**: vero solo se la dispensa
  del corso usa quel termine.
- Il montato HeyGen dura circa 25 ms per scena meno di quello locale: su 8:03 non è un
  rischio per i 7 minuti.
