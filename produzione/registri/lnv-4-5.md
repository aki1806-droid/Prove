# Registro — 4.5 «Il contatto fisico e i suoi limiti»

**È l'unica lezione del corso scritta per dire cosa non fare**, e la nota
dello script è esplicita: non va alleggerita e non va girata con tono
leggero. Chiude il Modulo 4 ribaltando la struttura di tutte le lezioni
precedenti — invece di spiegare come si legge un segnale, stabilisce quando
non si tocca.

Il cuore non è l'elenco dei divieti, è una distinzione: **un effetto
misurabile non è un'autorizzazione.** Che il tocco sull'avambraccio aumenti
la probabilità di un sì non dice niente su se sia lecito farlo. Da lì esce
tutto il resto: le tre condizioni, la simmetria come domanda che smaschera,
il valore predefinito a zero, e la ragione per cui qui il riscontro non
arriva mai.

| campo | valore |
|---|---|
| video_id | `7a974e069bc0f469505dad7f456dd5f2` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,6 s (9:58) — misurata sul montato |
| parlato | 586,8 s (549,8 s di voce tagliata + 37,0 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `5bgubjIYVBuPn3FAUfbK` |
| tracce | A `ox4ZQJk27fK5M7PQYRi2` · B `TdYSOi0rv9WURVpY8Uc3` · C `cxmXCjyvAqOYyPYAFk8D` |
| batch HeyGen | `e2881bc2356846e5ae690030c93b773c`, 96 file |

## Le quattro scene che non si tagliano

La nota dello script ne nomina quattro, e sono le quattro che portano il
peso della lezione. Nel copione occupano blocchi contigui, scritti lunghi di
proposito:

| scena | blocchi | che cosa tiene |
|---|---|---|
| 5 | `s11`–`s14` | un effetto misurabile non è un'autorizzazione |
| 9 | `s25`–`s29` | perché chi riceve un contatto non gradito tace |
| 10 | `s30`–`s33` | l'assenza di reazione non è consenso |
| 12 | `s35`–`s39` | il contatto sanitario, e da dove vengono le sue regole |

La scena 12 è quella che si sarebbe accorciata più facilmente, ed è quella
che andava tenuta per intera: dice che **le regole del contatto sanitario non
vengono da questo corso e non sono sostituite da questo corso.** Una lezione
di linguaggio non verbale che si mettesse al posto della formazione
professionale farebbe un danno, e il copione lo dice con le parole dello
script invece di parafrasarle.

## Il copione

Da **4.150** caratteri di parlato nello script a **10.269**, media 214 per
blocco. Quarantotto blocchi, due riprese a `s10` e `s34`.

Quello che il copione aggiunge allo script, e perché:

- **perché la letteratura sul tocco è quella che è** (`s06`–`s09`): effetti
  piccoli, dipendenti dal contesto, misurati quasi sempre in situazioni
  commerciali brevi fra sconosciuti dove il rapporto non prosegue. Lo script
  lo dice in una riga; senza il dettaglio, «effetti piccoli» suona come una
  cautela di stile invece che come il limite di validità di quegli studi;
- **perché la simmetria è la condizione che nessuno considera** (`s19`–`s23`):
  il consenso e il ruolo si valutano guardando sé stessi, la simmetria
  obbliga a guardare l'altro. È la sola delle tre che non si può verificare
  dall'interno del proprio punto di vista;
- **che cosa costa segnalare** (`s26`–`s29`): può sembrare esagerato, può
  creare imbarazzo, può avere conseguenze sul lavoro. Lo script dice che
  «segnalarlo costa»; il copione elenca i costi, perché è l'unico modo per
  cui «l'assenza di reazione non è consenso» diventa una conseguenza invece
  che una massima;
- **perché la stretta di mano è l'eccezione** (`s32`–`s33`): simmetrica,
  dichiarata, e rifiutabile senza costo. Tre proprietà, non un'abitudine;
- **che anche il contatto tecnico comunica** (`s40`–`s41`): annunciare cosa
  si sta per fare prima di farlo cambia come viene vissuto. È l'unica cosa
  che la lezione si permette di aggiungere alla formazione sanitaria, e si
  permette di aggiungerla perché è comunicazione e non tecnica.

**La prova di oggi** (`s49`) resta quella dello script — notare chi tocca
chi, senza giudicare, e accorgersi che la direzione coincide con il potere —
e `c99` chiude il modulo rimandando al Modulo 5, gesti e voce.

## Le grafiche

Quarantotto slide, di cui **cinque con un disegno o un'infografica** e
**nessuna ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c13` | confronto | «Funziona?» contro «È accettabile?», riga per riga |
| `c15` | bivio | Non è una lista da cui scegliere. |
| `c22` | sostituzione | la domanda che si fa al posto di quella che si farebbe |
| `c28` | flusso | Quasi tutti scelgono il silenzio. |
| `c31` | strati | Il riscontro, qui, non arriva. |

Le due che fanno lavoro che il parlato non può fare da solo sono `c13` e
`c15`. **`c13`** mette le due domande in colonna e mostra che non sono la
stessa: una si misura, l'altra si decide; se salti la prima non te ne
accorgi, se salti la seconda se ne accorge l'altro. **`c15`** è un `bivio`
perché le tre condizioni non sono tre opzioni: la didascalia dice
esplicitamente che non è una lista da cui scegliere, e la figura lo rende
visibile prima che la voce lo dica.

**`c31`** è l'unica figura del corso che illustra un'assenza. Mostra il
riscontro che negli altri segnali torna e qui non torna — ed è la ragione
tecnica per cui il valore predefinito deve essere il più conservativo.

## Otto correzioni sulle slide, in tre giri

Tutte e quarantotto renderizzate come fermi immagine e guardate su provini a
quattro. **Nessun difetto di contenuto**: sette righe che andavano a capo tre
volte e un `sub` del `flusso` che sbordava.

È il giro di correzioni più leggero del modulo, e la ragione è che le regole
§7-bis e §7-quater erano già tutte in piedi quando questa lezione è stata
scritta. In particolare `slides.py` ora contiene un controllo automatico per
l'ultima arrivata:

```python
assert not any("'è" in v for c in C if c['layout'] in ('memo', 'quote')
               for v in c.values() if isinstance(v, str)), "nel corsivo niente 'è"
```

La sequenza `'è` nel corsivo di `memo` e `quote` si accavalla — scoperta
sulla 4.3 e ritrovata sulla 4.4 — e da qui in avanti non passa più per una
rilettura: non compila.

## I tagli

Quarantacinque confini, **tutti dentro un silenzio**, e **zero fuori banda**.
`banda.py` non ha segnalato nessun confine sospetto; un solo spostamento a
mano, `muovi.py . C s48 196.26`.

Insieme alla 4.2 e alla 4.4 è uno dei tre risultati puliti del modulo.

I cinque silenzi più stretti su cui cade un taglio: `s29` 0,29 s · `s48`
0,43 s · `s47` 0,45 s · `s44` 0,47 s · `s12` 0,47 s. Il margine di `s29` —
0,15 s dal bordo — è il più stretto di tutto il modulo, e cade nel mezzo
della scena 9, la più lunga della lezione.

## Le riprese

Due, `s10` e `s34`. **Entrambe viste.**

La nota dello script pone un vincolo che nessun'altra lezione del corso ha:
**nessuna immagine deve mostrare un contatto fisico fra persone**, a
eccezione della stretta di mano della scena 4.

- **`s10`** — una stretta di mano formale, inquadratura stretta sulle sole
  mani e sui polsi, volti fuori campo. **È l'unico contatto fisico fra
  persone di tutta la lezione**, e lo script lo autorizza esplicitamente per
  questa scena. L'inquadratura stretta non è una scelta di stile: tiene
  l'immagine su un gesto simmetrico e dichiarato, che è esattamente ciò di
  cui parla il blocco;
- **`s34`** — un corridoio di ospedale con un carrello di medicazione fermo,
  luce bassa, nessuno in campo. **Rigenerata una volta**: la prima versione
  aveva sulla parete un cartello con una scritta senza senso. In una lezione
  che rimanda alla formazione professionale, un cartello illeggibile in un
  corridoio di ospedale è un dettaglio che toglie serietà a un passaggio che
  non ne può perdere.

Nessuna persona in campo nella seconda, e nessun volto nella prima: la
lezione parla di confini, e le immagini non ne attraversano nessuno.

## Il montato è stato verificato scena per scena

`get_video_scenes` sul video montato: cinquanta scene, le due immagini
esattamente alle scene 9 e 33 (cioè `s10` e `s34`), **nessuna scena in
`playback: loop`** — in questa lezione non c'è niente di ciclico — e tutte le
altre in `freeze` con `volume: 0`. Copertina con la traccia muta da 3 s,
chiusura con quella da 10 s.
