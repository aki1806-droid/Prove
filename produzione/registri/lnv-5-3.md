# Registro — 5.3 «L'autocontatto»

**È il mito più usato di tutto il linguaggio del corpo, ed è il più facile da
smontare.** Si tocca il naso, quindi mente; si tocca il collo, quindi
nasconde qualcosa. Due movimenti, due verdetti, e nessuno dei due ha
supporto.

La lezione lo smonta con tre ragioni indipendenti, e le dice in quest'ordine:
la ricerca non lo sostiene (la rassegna di DePaulo e colleghi, del 2003, che
non ha trovato nessun indicatore non verbale affidabile), le cause banali
sono moltissime (dieci, messe in fila una per una), e la linea di base qui è
di un ordine di grandezza più grave che altrove — perché per molte persone
toccarsi il viso è il rumore di fondo, non il segnale.

Quello che resta è la stessa cosa che resta in tutto il modulo: **l'aumento
improvviso**, letto nel modo largo che è l'unico onesto — qualcosa è cambiato
nel livello di attivazione, non si sa cosa e non si sa perché. E un uso che
non riguarda gli altri: **il tuo** autocontatto è un segnale per te, perché
su di te la causa la conosci.

| campo | valore |
|---|---|
| video_id | `3dfb22213b650cfaff07db0c1dac93c4` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,6 s (9:59) — misurata sul montato |
| parlato | 586,9 s (546,2 s di voce tagliata + 40,7 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `vapCZcmhwuMpIit8I6On` |
| tracce | A `zMEtO0U8DTv1N7bnITJA` · B `LO7trIlCe7yX09l41JCM` · C `ARqZMahT6RqKO8RyzXPb` |
| batch HeyGen | `1b96628bf0894a0f9d943a0fa8b594cf`, 95 file |

## Le due note dello script, tutte e due vincolanti

**La fonte della scena 3 si dice a voce, con l'anno.** Il copione la dice per
intero e spiega anche perché: «si dice con nome e anno perché chiunque la può
andare a cercare». Nel parlato è scritta nella forma che la voce legge — *De
Pàulo* — e sulle slide nella grafia vera, *DePaulo*. È la stessa regola di
Ecman nella 2.2 e di Ranehill nella 4.4, e l'accento è una delle due sole
eccezioni della lezione alla regola «niente caratteri accentati nel parlato»;
l'altra è *adattatóri*. `blocchi.py` le dichiara in una lista esplicita e
fallisce su qualunque altra.

**La scena 13 chiude sul danno e non va alleggerita.** Il copione non ci mette
sopra nessuna formula consolatoria: `s41` dice che un segnale senza supporto
non colpisce a caso, e `s42` dice chi colpisce — chi è teso, chi ha
un'allergia, chi ha l'abitudine, chi porta gli occhiali. **Non chi mente.**
La slide `c42` porta le quattro voci e la nota sotto è quella riga lì.

Vale anche il vincolo di modulo: **nessuna formulazione che suggerisca di
rilevare la menzogna**, nemmeno per negazione retorica. Il mito compare una
volta sola, fra virgolette, su `c38`, e le due slide che seguono lo smontano.

## Il copione

Da **3.822** caratteri di parlato nello script a **10.175**, media 212 per
blocco. Quarantotto blocchi, tre riprese a `s10`, `s26` e `s37`. **Nessun
aneddoto**, come chiede la nota di modulo.

Quello che il copione aggiunge:

- **che cos'è una rassegna** (`s07`): non un esperimento nuovo, ma una
  raccolta sistematica di studi già fatti. Lo script dà per scontato che si
  sappia; il copione lo spiega in un blocco, perché è la ragione per cui quel
  risultato pesa;
- **che cosa vuol dire "non ha trovato nessun indicatore"** (`s08`): non un
  indizio, non una tendenza — un indicatore su cui si possa contare;
- **le dieci cause, una per una** (`s12`–`s15`): lo script le elenca in una
  riga, il copione le dice tutte e dichiara perché lo fa: «il punto non è che
  esistano, il punto è quante sono». E chiude mettendo l'attivazione in fondo
  all'elenco, dove sta, con la ragione: quando nove cause su dieci sono
  fisiche, la decima non si può dare per scontata;
- **perché la lettura larga basta** (`s25`): ti dice *dove* fare la prossima
  domanda. Non quale, non come andrà a finire;
- **perché i gesti sugli oggetti sono un po' più utili** (`s28`–`s30`): una
  differenza di grado e non di natura, e la lista delle cause che si accorcia
  da dieci a tre;
- **perché l'autocontatto funziona su di te e non sugli altri** (`s33`): la
  causa, su di te, la conosci. È l'unica informazione che in tutto il corso
  manca sempre, e qui c'è;
- **l'ordine in cui arrivano** (`s35`): il corpo per primo, la parte che pensa
  dopo — qualche secondo, o qualche minuto, o alla fine della conversazione
  quando ormai è tardi.

## Le grafiche

Quarantasette slide, di cui **sei con un disegno o un'infografica** e
**nessuna ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c05` | pila | le tre ragioni, con la prima accesa in cima |
| `c15` | pila | L'attivazione è l'ultima voce di un elenco lungo. |
| `c19` | confronto | chi lo fa sempre e chi non lo fa mai |
| `c22` | flusso | Senza il momento non hai niente. |
| `c30` | imbuto | Tre invece di dieci |
| `c35` | flusso | Qualche secondo dopo, o qualche minuto. |

**`c15`** è la figura che porta il peso della prima metà: quattro gruppi di
cause impilati, e in fondo — acceso — quello dell'attivazione. La pila si
legge dall'alto in basso come l'elenco si dice, e l'ultima voce sta
visibilmente in ultima posizione. **`c19`** mette i due estremi della linea di
base uno accanto all'altro: in ogni minuto contro due volte in un'ora, rumore
di fondo contro evento.

### Tre correzioni, tutte e tre sull'ordine di lettura

Le quarantasette slide sono state renderizzate come fermi immagine e guardate
su provini a dodici. Tre sono tornate indietro:

- **`c05`** e **`c15`**, le due `pila`: la figura impila dal basso, quindi
  l'elemento con indice zero finisce in fondo e l'elenco si legge al
  contrario di come si dice. Le due liste sono state **invertite**, in modo
  che la lettura dall'alto segua il parlato;
- **`c49`**: «Un segnale non verbale a tutti gli effetti» andava a capo su
  «gli / effetti». Accorciato a «Non verbale a tutti gli effetti».

> **Regola nuova, per lo standard.** `pila` impila dal basso: `blocchi[0]` è
> il blocco più basso. Un elenco ordinato va scritto **al contrario** di come
> si dice, se si vuole che si legga nell'ordine giusto dall'alto.

## I tagli: otto sbagliati su quarantacinque, e la banda ne vedeva quattro

**Quarantacinque confini, tutti dentro un silenzio, e tutti e quarantacinque
riletti sulla trascrizione.** Otto erano sbagliati.

| | segnalati da `banda.py` | sbagliati davvero |
|---|---|---|
| 5.1 | 1 | 1 |
| 5.2 | 3 | 7 |
| 5.3 | 4 | **8** |

E il conto dei quattro segnalati è peggiore di come sembra: **due erano
vittime e non colpevoli**. `s12` risultava lungo perché era `s11` a essere
tagliato corto, e `s30` risultava corto perché era `s29` a essersi preso la
sua prima frase. La banda ha indicato il blocco sbagliato in metà dei casi in
cui ha indicato qualcosa.

Le due catene che la banda non poteva vedere sono quelle di §10-bis: `s08` e
`s09` spostati tutti e due all'indietro, `s20` e `s21` tutti e due
all'indietro. Nel mezzo di una catena ogni blocco perde all'inizio quello che
guadagna alla fine, e lo scarto di durata resta a posto.

Il caso più chiaro è `s20`, il memo «Per alcuni è il segnale. Per altri è il
rumore di fondo.»: il taglio cadeva **in mezzo al memo**, dopo la prima frase.
La banda lo vedeva (1,44 s per 58 caratteri, cioè 40 caratteri al secondo:
impossibile), ma non vedeva che anche il confine successivo era spostato.

Gli otto spostamenti, con la coda letta prima e dopo:

| blocco | prima | dopo |
|---|---|---|
| `s08` | «su cui si possa contare» | «Non ne ha trovato nessuno» |
| `s09` | «o che servano altri studi» | «Non reggono» |
| `s11` | «esistano, lo sanno tutti» | «è quante sono» |
| `s20` | «Per alcuni è il segnale» | «è il rumore di fondo» |
| `s21` | «e non è una coincidenza» | «funziona tutto il corso» |
| `s29` | «la lista delle cause si accorcia» | «perché gli prude la penna» |
| `s39` | «completamente infondato» | «perché sta in una frase» |
| `s45` | «Disponibili. Il quarto» | «fra tutte quelle disponibili» |

Dopo gli spostamenti: **zero confini fuori banda**, e tutti e otto i nuovi
tagli riletti su un secondo file di controllo, che li conferma uno per uno.

Costo della verifica: **1.001 crediti** per `prova.mp3` (182 s) e **167** per
gli otto ritagli di controllo in un file solo. Circa venti centesimi, e ha
trovato sei errori che la banda non avrebbe mai segnalato.

## Le riprese, e un cambio di fornitore non voluto

Tre, `s10`, `s26` e `s37`, **tutte e tre viste**.

**Higgsfield, che era la scelta della 5.2, oggi ha rifiutato tutte e tre le
richieste**: «daily generation limit for your grace period». Non è una
questione di crediti — ce ne sono 571 sul conto — ma un tetto giornaliero del
piano. I crediti Artlist restano esauriti fino al 18 ottobre. Le tre immagini
sono quindi state generate sul nodo ElevenLabs con **Nano Banana 2**, come la
`s27` della 5.1, a **406 crediti per immagine** — meno dei 612 registrati
nello standard, che va aggiornato.

- **`s10`** — una mano che sposta un paio di occhiali su un tavolo di legno,
  luce di finestra. Nessun volto in campo;
- **`s26`** — una penna girata fra le dita su un tavolo da riunione. Le
  persone sul fondo sono sfocate e non riconoscibili, come la piazza della
  5.2; gli appunti sul foglio non sono leggibili;
- **`s37`** — un colletto con la cravatta allentata, inquadratura a petto e
  collo. Il volto è tagliato sopra la bocca, come chiede lo script.

Le tre immagini sono state caricate su HeyGen e usate dal suo URL stabile: i
link firmati di ElevenLabs scadono in due ore.

## Il montato è stato verificato scena per scena

`get_video_scenes` sul video montato: **cinquanta scene**, le tre immagini
esattamente alle scene 10, 26 e 37 (cioè `s10`, `s26` e `s37`), **nessuna
scena in `playback: loop`** e tutte le altre in `freeze` con `volume: 0`.
Copertina con la traccia muta da 3 s, chiusura con quella da 10 s. 16:9,
1080p.

Durata finale **598,6 s**: un secondo e mezzo sotto i 600 teorici, come
tutte le altre ventidue.
