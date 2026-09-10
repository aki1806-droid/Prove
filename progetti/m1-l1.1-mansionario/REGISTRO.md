# Registro — Modulo 1 · micro-lezione 1.1 «Dal mansionario alle competenze»

Corso di preparazione al concorso per Infermiere · Azienda Zero Veneto
CISL FP Padova Rovigo · slide + voce, nessun avatar

---

## Scheda parametri

```
TEMA      lezione normativa, seconda persona singolare
          testo di partenza: 18 slide con voce, 7.617 caratteri di parlato
COLORI    BG #FFFFFF · FG #1C1C1C · titoli #00532A · evidenze #00863E
          accento #F39200
          tenue #FDF4E6 (derivato dall'arancio) — slide degli errori
          profondo #00532A — memo, citazioni, "in Veneto"
          frasi Source Serif 4 · etichette, elenchi e numeri Inter
DURATA    obiettivo "8 minuti almeno" · copertina 3 s · chiusura 10 s · pausa 0
VOCE      GianP — News Info and Documentary, eleven_v3
GENERATORE slide/layout.mjs → cards.mjs (PNG) e clips.mjs (mp4)
```

## Valori derivati, previsti e reali

| | previsto (MASTER) | reale |
|---|---|---|
| velocità di lettura | 18 car/s | **17,0 car/s** |
| caratteri di copione | 8.406 per 8:00 | 8.803 |
| blocchi | 48 (il tetto) | 48 |
| scene | 50 (il tetto) | 50 |
| parlato | 467 s | 523,2 s |
| montato | 8:00 | **8:56** |
| pose | 3–9 | 0 |

**La costante da correggere nel MASTER, per questa voce: 17,0 caratteri al
secondo, non 18.** Su 8.800 caratteri fa 33 secondi di differenza. Con 18 il
copione sarebbe stato scritto corto di ~400 caratteri.

---

## Di quanto è stato riscritto il copione, e cosa ci si è aggiunto

Lo script di partenza dava 7.617 caratteri = 7:03 di voce, 7:16 di montato: la
sua stima di «9 minuti a 130 parole al minuto» non vale per una voce generata,
ripulita dai silenzi e accelerata a 1,12×. Riscritto a 8.803 caratteri.

Aggiunto **il come**, non riempitivo (MASTER §6):

| blocco | aggiunta | tipo |
|---|---|---|
| `s13` | il test: sostituisci *responsabile* con *collabora*; se la frase regge, non l'hai capita | il test |
| `s18` | perché *valuta* sta in coda al punto tre | perché funziona |
| `s20` | *avvalersi*: la responsabilità di ciò che attribuisci al personale di supporto resta tua | il meccanismo |
| `s23` | l'errore speculare: rifiutare di eseguire perché non si è d'accordo | il contrario |
| `s30` | perché tre fonti e non una: una sola tornerebbe a essere un elenco | perché funziona |
| `s34` | che cosa vuol dire davvero pianificare per obiettivi | il meccanismo |
| `s35` | autonomia non è indipendenza: un guadagno che arriva con un prezzo | quando non si applica |
| `s39` | i quattro livelli sono una sequenza ordinata, e i quiz la rimescolano | il criterio |
| `s45` | il criterio fra due opzioni plausibili: scegli quella che non toglie niente | il criterio di scelta |
| `s49` | il risultato vero: non sapere cosa puoi fare, saper dire da dove viene | il risultato |

Le 18 slide dello script sono diventate **18 capitoli**: dentro ciascuno, 2–4
inquadrature. I blocchi dello script duravano da 14 a 36 secondi l'uno — slide
ferme mezzo minuto, che il metodo non ammette.

---

## Voce

Due tracce continue, una per metà video, stacco dopo `s26` su un cambio di
capitolo (dalla legge 42 alle tre fonti).

**La traccia A è stata scartata e rifatta.** La trascrizione, confrontata parola
per parola col copione, dava 98,81% di somiglianza e quattro differenze: tre
erano modi di trascrivere («8» per «otto», «1.5» per «uno punto cinque»), la
quarta era un salto vero della voce in `s13` — sei parole perse, «l'hai capita:
se puoi sostituire» diventava «la tuire». Controprova su venti secondi isolati:
il salto era nell'audio, non nella trascrizione. Il testo di `s13` è stato
riscritto togliendo la ripetizione di «capita» che con ogni probabilità lo ha
causato, e la traccia rigenerata è pulita al confronto.

---

## Tagli: due tornate di correzione

Il primo tentativo sbagliava **17 blocchi su 48**, con confini accavallati
(`s26` durava 0,07 s). Due cause, entrambe corrette:

1. **Le pause venivano cercate sulla traccia già lavorata.** Ma `silenceremove`
   con `stop_silence=0.14` le aveva pareggiate *tutte* a 0,14 s: la lunghezza
   della pausa — il segnale su cui il MASTER dice di basare la scelta — era
   stata cancellata dal filtro stesso. Ora i confini si scelgono sul grezzo e
   il ritmo si applica dopo, blocco per blocco.
2. **L'assegnamento pausa→confine era greedy, non monotono**: due confini
   potevano appoggiarsi alla stessa pausa.

Sostituito da un allineamento DTW fra la **punteggiatura del copione** e gli
**spezzoni di parlato** dell'audio: è alla punteggiatura che la voce mette le
pause. Un solo spezzone può contenere più pezzi di testo, perché non si fa
pausa a ogni virgola (113 pezzi di testo per 96 spezzoni, nella traccia A).

Restavano 2 confini fuori posto su 46, entrambi in ritardo di una frase
(`s46` e `s47`), spostati indietro di una pausa: −3,39 s e −5,08 s.
Controprova sui due corretti e sui due vicini: **fuori posto 0**.

Verifiche pagate: 2 trascrizioni di traccia intera, 2 prove dei tagli,
2 controprove mirate.

---

## Le grafiche

| tipo | quante | dove |
|---|---|---|
| frase | 9 | i passaggi di ragionamento |
| elenco a rivelazione progressiva | 11 | tre difetti, cinque attività, tre cose della 42 |
| sostituzione con freccia | 5 | garantire≠eseguire, autonomia≠indipendenza, IPASVI→OPI |
| trappola (barrato + correzione) | 4 | i distrattori |
| norma (sigla grande + una riga) | 4 | DPR 225/1974, DM 739/1994, L. 251/2000, L. 43/2006 |
| memo | 3 | i cinque punti finali |
| timeline | 2 | 1974 → 2018, con 1994 e 1999 in accento |
| fonti (tre riquadri + barra del limite) | 2 | la slide chiave |
| copertina | 2 | apertura e rimando alla 1.2 |
| tre riquadri, confronto, citazione, numero, perimetro, titolo | 8 | |

**Tre difetti corretti dopo aver guardato i PNG, non leggendo il codice:**

- `s31`: le barre grigie del «elenco di atti consentiti» sembravano un
  caricamento in corso, non un elenco. Sostituite con atti veri («praticare
  iniezioni», «eseguire medicazioni», …), e il confronto con il perimetro si
  legge a colpo d'occhio;
- `s41`/`s42`: gli anni erano a 42px, troppo piccoli per il formato, e
  l'etichetta del 1999 andava a tre righe rendendo la fila irregolare;
- `s13`/`s20`/`s21`/`s35`: il testo barrato era verde slavato, che si legge
  male. Portato a grigio neutro.

I fotogrammi delle clip sono resi spostando a mano l'orologio delle
animazioni, così PNG fermi e mp4 vengono dallo stesso file di layout e non
divergono. Movimento: entra in 1,3 s e finisce; in montaggio `playback.mode`
è `freeze`.

---

## Riprese e immagini generate

**Nessuna.** La lezione è a sole slide e non ha pause senza voce: non c'è punto
in cui una ripresa porterebbe significato invece di decorare.

---

## Montaggio

Cinquanta scene in una sola chiamata (`create_video_from_studio`), il tetto
esatto di HeyGen.

```
scena  1     copertina    immagine ferma, 3 s
scene  2-49  blocchi      clip con l'audio dentro, durata = durata del parlato
scena  50    chiusura     immagine ferma, 10 s
```

**Uno scarto dal MASTER che funziona, e uno che non funziona.**

Funziona: il MASTER dice di agganciare le scene senza parlato a una traccia di
silenzio, «altrimenti collassano». Non serve. La scena da immagine ferma prende
una `duration` esplicita: copertina e chiusura sono `image` con 3 e 10 secondi.

**Non funziona**, ed è la trappola nuova da mettere nel MASTER: avevo montato
l'audio *dentro* la clip e passato scene video senza `audio_asset_id`, per
dimezzare gli asset da caricare (50 invece di 98). La documentazione dice che
una clip senza voce dichiarata «plays full-length». Non è vero: il primo
render è uscito di **109 secondi invece di 536**, cioè circa **2,0 secondi
esatti per scena**, con le clip troncate. Le clip caricate erano giuste
(controllate: 220 fotogrammi, 8,80 s, 25 fps, audio dentro): a tagliare è
HeyGen.

> **Una scena video prende la durata della voce, non quella della clip.** Se
> non le dichiari un `audio_asset_id`, la tronca a due secondi. È il motivo
> per cui il MASTER prescrive mp3 separato e `playback: freeze`, e ha ragione:
> l'ottimizzazione costa un giro di caricamenti e un render buttato.

Rifatto secondo il metodo: 48 mp3 caricati a parte, ogni scena video con il
suo `audio_asset_id` e `playback = {mode: freeze, mute: true}` — muta perché
la clip ha già l'audio dentro e non deve raddoppiarsi.

```
video HeyGen   5e202675fa81a29132d7903a779f8769 · 535,27 s = 8:55
               app.heygen.com/videos/5e202675fa81a29132d7903a779f8769
copia locale   montato-1.1.mp4 · 8:56.44 · 1920x1080 · 25 fps · 18 MB
sottotitoli    montato-1.1.srt · 48 righe, dal copione e dalle durate reali
               (HeyGen ne produce una sua, da confrontare)
```

## Controlli prima di consegnare (MASTER §5)

`controlli.py` li esegue tutti. 7 su 8 superati:

| | esito |
|---|---|
| `verifica.py` fuori posto | 2 alla prova, corretti e riverificati → **0** |
| fascia 8,5–21 car/s | **`s27` a 21,7** — unico fuori, di 0,7 |
| 50 PNG guardati da fermi | sì, e 3 difetti corretti dopo averli visti |
| nessuna slide sfora la cornice | 0 su 50 |
| numero di scene | 50, esattamente il tetto |
| durata | 8:56.44, richiesto «8 minuti almeno» |
| sottotitoli SRT | 48 righe |
| registro con «da verificare» | sì |

Musica delle pause: non applicabile, il video non ha pause senza voce.

## Costi

| voce | quanto |
|---|---|
| voce, traccia A (scartata) | $0,77 |
| voce, traccia B | $0,70 |
| voce, traccia A rifatta | $0,76 |
| trascrizioni di verifica (6) | $0,98 |
| **totale ElevenLabs** | **$3,21** |

Il preventivo iniziale dava $3,25 per la sola prima traccia: la stima di
ElevenLabs è circa il doppio del costo reale.

---

## Da verificare — quello che non ho potuto giudicare io

1. **Come suona la voce.** Non l'ho ascoltata: l'ho verificata per trascrizione,
   che coglie i salti di parole ma non il timbro, l'enfasi, né se le pause
   cadono dove servono. In particolare: i sei tag di intenzione (`[warm]`,
   `[serious]`, `[thoughtful]`, `[curious]`) fanno quello che promettono?
2. **La lettura dei numeri di legge.** «DPR duecentoventicinque del
   millenovecentosettantaquattro» è la resa giusta, o va scritta diversamente
   nel copione? La trascrizione non lo dice.
3. **Se i tagli respirano.** «Fuori posto 0» vuol dire che nessun taglio cade
   dentro una parola. Non vuol dire che il ritmo, blocco per blocco, sia giusto.
4. **`s27` a 21,7 caratteri al secondo**, appena sopra la fascia. Da riascoltare:
   se corre, il blocco va allungato di mezzo secondo.
5. **Il logo CISL FP.** Nelle slide c'è un segnaposto testuale, «CISL FP ·
   Padova Rovigo», in alto a sinistra. Serve il file del logo: si sostituisce
   cambiando una riga in `slide/layout.mjs`.
6. **I caratteri.** Ho scelto Source Serif 4 e Inter, che stanno bene insieme e
   sono liberi. Se CISL FP ha caratteri istituzionali, vanno messi quelli.
7. **Il fondo tenue `#FDF4E6`** e il **fondo profondo `#00532A`** li ho ricavati
   io dalla palette che mi hai dato: non erano nello script.
8. **Il contenuto normativo** viene dal tuo script e non l'ho riscritto nel
   merito: date, numeri di legge e formule sono i tuoi.
