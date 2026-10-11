# Registro — 5.2 «I gesti che la sostituiscono»

**È l'unica lezione del corso in cui un dizionario esiste davvero.** Gli
emblemi — il pollice alzato, il cenno per il sì, la mano aperta per fermare,
il dito sulle labbra — hanno un significato convenzionale preciso, si
traducono in parole e funzionano da soli. Sono parole a tutti gli effetti.

E proprio per questo la lezione passa il tempo a dire che cosa quel
dizionario **non** è: è un dizionario di lingua, non di psicologia. Dice che
cosa una persona ha voluto dire, esattamente come una parola, e niente su
cosa prova mentre lo dice. Da lì esce la regola unica della lezione: dove non
conosci il riferimento culturale di chi hai davanti, **riduci gli emblemi e
usa le parole** — perché le parole si possono chiedere e i gesti no.

| campo | valore |
|---|---|
| video_id | `38db61ca01bfd8ef074914672defec16` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,8 s (9:59) — misurata sul montato |
| parlato | 587,1 s (551,5 s di voce tagliata + 35,6 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `yMTz68D0KbvSjp0drXnW` |
| tracce | A `yEZg5PfBQtxrqsXfTUjo` · B `qrvuZuI65EMS00SNvh7A` · C `5nBa9kWVBLXjiBzxIuiy` |
| batch HeyGen | `8ceb805e4dcc425f9540e6486827fa21`, 95 file |

## Nessun gesto offensivo, e la regola che ne esce

La nota dello script è la più stretta di tutto il corso: **nessun gesto
offensivo va nominato, descritto o mostrato, in nessuna cultura**, e
l'avvertenza della scena 6 resta generica di proposito.

Il copione la rispetta con una mossa che è anche contenuto: **dice perché non
fa esempi**, invece di evitarli e basta. Il blocco `s18` lo mette in chiaro —
«un elenco di gesti da evitare è esattamente il tipo di cosa che poi viene
ripetuta male» — e `s19` spiega che la conseguenza pratica non cambia a
seconda di quale gesto sia: non puoi dare per scontato il significato, punto.

I quattro emblemi di esempio della scena 3 compaiono **solo come esempi di
emblema** e non vengono mai accostati a un significato offensivo, né nel
parlato né su una slide. `blocchi.py` e `slides.py` lo dichiarano in testa,
perché è il genere di vincolo che si perde in una riscrittura.

## Il copione

Da **3.941** caratteri di parlato nello script a **10.170**, media 212 per
blocco. *(Correzione: qui stava scritto 4.046, che è il conteggio della 5.1 ricopiato per sbaglio. Rifatto con lo stesso filtro di tutte le altre lezioni.)* Quarantotto blocchi, tre riprese a `s16`, `s27` e `s37`. **Nessun
aneddoto**, come chiede la nota di modulo.

Quello che il copione aggiunge:

- **perché sono parole, e non “come” parole** (`s04`–`s05`): le tre proprietà
  di un emblema sono le tre proprietà di una parola, e il copione lo dice
  invece di lasciarlo capire;
- **che cosa comporta** (`s09`): si possono usare male, fraintendere,
  imparare — tre cose che del resto di questo corso non si possono dire;
- **perché il dizionario degli emblemi interessa meno di tutto il resto**
  (`s15`): dice solo cosa l'altro ha voluto dire, e non promette nessun
  vantaggio su di lui. È la frase più tagliente della lezione e sta nello
  script in una riga;
- **perché una tabella per nazionalità sbaglia** (`s23`): tratta una
  nazionalità come se fosse una persona, e dentro un paese le differenze sono
  enormi;
- **perché la regola funziona** (`s25`): le parole si possono chiedere, i
  gesti no — il gesto arriva, e quello che arriva resta;
- **la direzione opposta** (`s35`): chi gesticola meno di te non è freddo. Lo
  script dice che vale in entrambe le direzioni; il copione dice la seconda;
- **quali emblemi scegliere quando la lingua manca** (`s40`): i meno
  specifici, perché più un emblema è preciso più è locale.

## Le grafiche

Quarantasette slide, di cui **cinque con un disegno o un'infografica** e
**nessuna ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c05` | pila | Sono le tre proprietà di una parola. |
| `c12` | confronto | quello che un emblema dice e quello che no |
| `c25` | bivio | Quello che arriva resta. |
| `c30` | imbuto | Da una lingua non si deduce un carattere. |
| `c42` | flusso | Garantisce che aspettavi una risposta. |

**`c30`** è la figura che porta il peso della seconda metà: tre deduzioni
sullo stereotipo entrano nell'imbuto — più emotivi, meno controllati, meno
affidabili — e quello che esce è «Nessuna segue». **`c42`** mostra in tre
passi perché un cenno di assenso non è una verifica: fai il gesto, arriva un
cenno, e il cenno garantisce solo che aspettavi una risposta.

## Nessuna correzione sulle slide

Tutte e quarantasette renderizzate come fermi immagine e guardate su provini
a quattro. **Zero correzioni, al primo giro**: è la prima volta nel corso.

Non è fortuna: le sette regole di §7-bis, §7-quater e la nuova sul centro del
`raggi` coprono ormai tutti i difetti che si erano visti, e scrivere le slide
rispettandole in partenza costa meno che correggerle dopo.

## I tagli, e quello che la banda non vede

**Quarantacinque confini, tutti dentro un silenzio, e tutti e quarantacinque
riletti sulla trascrizione.** Sette erano sbagliati.

Questo è il dato che conta, ed è il contrario di quello della 5.1:

| | segnalati da `banda.py` | sbagliati davvero |
|---|---|---|
| 5.1 | 1 | 1 |
| 5.2 | 3 | **7** |

**La banda ha mancato cinque confini su sette.** La ragione è precisa e va
scritta: in fondo alla traccia C i confini di `s41`, `s42`, `s43` e `s44`
erano **tutti e quattro spostati in avanti di circa una frase**. Ogni blocco
perdeva all'inizio quello che guadagnava alla fine, quindi la sua durata
restava giusta e lo scarto restava dentro banda. Solo `s41`, che apriva la
catena, sporgeva abbastanza da essere segnalato.

**Una catena di confini spostati tutti nello stesso verso è invisibile a un
controllo di durata.** Solo la trascrizione la vede.

Gli altri due: `s12` era spostato indietro di una frase — mancava «E si ferma
lì» — e la banda aveva segnalato il blocco *successivo*, `s13`, perché era
quello che risultava lungo. E `s46` aveva inghiottito tutto il memo `s47`,
che risultava letto a 46 caratteri al secondo: impossibile, e infatti era
l'unico dei sette che la banda mostrava in modo inequivocabile.

I sette spostamenti, con la coda letta prima e dopo:

| blocco | prima | dopo |
|---|---|---|
| `s12` | «se te l'avesse detto a voce» | «E si ferma lì» |
| `s41` | «vanno verificati» | «comunicare e trasmettere» |
| `s42` | «quattro errori da evitare» | «su un canale diverso» |
| `s43` | «frase. Il secondo» | «la risposta non sta nella frase» |
| `s44` | «arriva. Il terzo» | «non essere quella che arriva» |
| `s46` | «I gesti no» | «riaprirla per controllare» |
| `s47` | «La prova di oggi» | «I gesti no» |

Dopo gli spostamenti: **zero confini fuori banda** tranne `s48`, che risulta
lungo di 1,62 s ed è **confermato giusto da tutte e due le parti** — la coda
di `s47` legge «I gesti no» e quella di `s48` legge «falsa il conto». È un
blocco letto piano, non un confine sbagliato.

Costo della verifica: 1.001 crediti per `prova.mp3`, 144 per i sette ritagli
di controllo in un file solo, 9 per l'ultimo. Meno di venti centesimi in
tutto, e ha trovato cinque errori che sarebbero finiti nel montato.

## Le riprese

Tre, `s16`, `s27` e `s37`. **Tutte e tre viste**, e tutte e tre generate su
un servizio nuovo.

I crediti Artlist si sono esauriti durante la 5.1. La scelta è caduta su
**Higgsfield con GPT Image 2.5**, dopo una prova a tre — lo stesso soggetto
generato con due modelli diversi e messo accanto a una ripresa del corso. GPT
Image 2.5 tiene il registro documentario, la luce naturale e la palette
smorzata delle altre cinquantatré; `soul_location`, l'altro candidato, rende
in modo molto più stilizzato ed è stato scartato. Costa **0,25 crediti per
immagine** contro i 130 di Artlist e i 612 del nodo ElevenLabs.

- **`s16`** — un cartello stradale con un simbolo, luce diurna, nessuna
  persona. Introduce la frase sul fatto che gli emblemi cambiano da un posto
  all'altro, e lo fa con l'oggetto più convenzionale che esista;
- **`s27`** — una piazza italiana con poche persone sedute a distanza,
  ripresa larga, volti non riconoscibili;
- **`s37`** — un corridoio di ospedale con segnaletica multilingue, nessuno
  in campo. **È l'unica ripresa del corso in cui il testo nell'immagine è
  voluto**: lo script lo chiede ed è il contenuto della scena. Le quattro
  righe si leggono in quattro lingue e nessuna porta un marchio.

## Il montato è stato verificato scena per scena

`get_video_scenes` sul video montato: cinquanta scene, le tre immagini
esattamente alle scene 15, 26 e 36 (cioè `s16`, `s27` e `s37`), **nessuna
scena in `playback: loop`** e tutte le altre in `freeze` con `volume: 0`.
Copertina con la traccia muta da 3 s, chiusura con quella da 10 s.
