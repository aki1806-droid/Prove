# Registro — 6.2 «I tre tipi»

**Distingue le incongruenze fra loro, e lo fa in ordine crescente di
affidabilità.** Primo tipo: parole e corpo. Secondo: corpo e corpo. Terzo:
adesso e prima. Il primo è quello che tutti citano ed è il più debole,
perché poggia interamente su una lettura del canale non verbale che
potrebbe essere sbagliata. Il secondo è più solido per una ragione
aritmetica: **una causa banale di solito tocca un canale solo**, e per
spiegarne due ne servono due.

**Il terzo è quello che si usa davvero**, e la ragione è la frase da cui
dipende tutto il metodo: *una costante non spiega un cambiamento*. La sedia,
il freddo, l'abitudine, il carattere, il mal di schiena erano già lì dieci
minuti fa. Non sono state escluse da un ragionamento: semplicemente non sono
cambiate. Da qui la conseguenza che chiude la lezione — **senza linea di base
il terzo tipo non esiste**, e un corso che comincia dalle emozioni invece che
dal metodo consegna uno strumento che funziona male non per cattiva volontà,
ma per ordine sbagliato.

| campo | valore |
|---|---|
| video_id | `84c55de233d7efc5a750cf3a856b9962` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,8 s (9:59) — misurata sul montato |
| parlato | 587,1 s (545,1 s di voce tagliata + 42,0 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `7RJpINYlO2gr98OKSPWu` |
| tracce | A `oJqkwza415MoV4ESrjtb` · B `lk5tEW3CeO2bQB88vXtG` · C `8iXmECzjXVGD3uDmN6ze` |
| batch HeyGen | `3ec53e2e522146b4886227df07585d28`, 96 file |

## Il vincolo del modulo 6

Nessuna formulazione che suggerisca di rilevare la menzogna, nemmeno
attenuata o per negazione retorica. Qui il vincolo **regge da solo**: la
lezione parla di quanto ci si possa fidare di una lettura, non di che cosa
una lettura riveli. I controlli automatici in `blocchi.py` e `slides.py`
verificano che la radice `menzogn` non compaia da nessuna parte e che la
parola «bugia» compaia **solo** in `s49` e in `c49`, cioè nell'annuncio del
titolo della 6.3.

Una frase è stata riscritta prima di generare la voce: `s06` diceva che il
primo tipo «è quello che si vede nei film quando qualcuno mente». Accostare
il primo tipo alla menzogna, anche per via di un esempio cinematografico, è
esattamente la cosa che il modulo vieta. Adesso dice che è quello che
«qualunque articolo divulgativo riassume in tre righe».

## La nota dello script

**La scena 9 è il perno teorico del corso** — ritmo lento, pause piene — e
occupa cinque blocchi, `s26`–`s30`. Il copione la prepara (`s22`–`s24`, dove
la frase arriva dentro il ragionamento di chi fa misure: se il risultato si
sposta e lo strumento è rimasto fermo, la causa non sta nello strumento) e
poi la spiega senza fretta, fino a `s30`: il terzo tipo non chiede di
interpretare niente, e accorgersi di un cambiamento è alla portata di
chiunque stia prestando attenzione.

**Nessun aneddoto.**

## Il copione

Da **3.756** caratteri di parlato nello script a **10.203**, media 212 per
blocco. Quarantotto blocchi, due riprese a `s19` e `s31`.

Quello che il copione aggiunge:

- **perché il più citato è il più debole** (`s04`): non debole nel senso che
  non esiste, debole nel senso che dipende da te e da fuori non è
  controllabile;
- **che il primo tipo si sente anche al telefono** (`s11`): è il più
  intuitivo proprio perché non ha bisogno di vedere niente — e questo è
  anche il suo limite;
- **l'aritmetica del secondo tipo** (`s16`–`s17`): la sedia spiega la
  postura ma non anche la voce; per due canali servono due cause, e due
  cause insieme sono meno probabili di una. **Meno probabili, non
  impossibili** (`s18`): il conto è cambiato, non chiuso;
- **il ragionamento di chi fa misure** (`s24`): se lo strumento è rimasto
  fermo e il risultato si è spostato, la causa non sta nello strumento. Qui
  lo strumento è tutto quello che era già lì;
- **che il terzo tipo non chiede di interpretare** (`s29`): non devi sapere
  che cosa significhi una postura chiusa, ti basta sapere che dieci minuti fa
  non c'era;
- **perché i corsi sbagliano l'ordine** (`s35`): le emozioni sono la parte
  che si racconta meglio, e nessuno vende un corso partendo da cinque lezioni
  su quello che non si può concludere;
- **la terza condizione, quella che si dimentica** (`s39`): saper nominare
  l'argomento di cui si stava parlando. Senza, il punto resta un punto e non
  ci potrai tornare;
- **che il vero discrimine è se la relazione prosegue** (`s40`–`s42`): con
  chi vedi una volta sola un'incongruenza resta un'ipotesi per sempre; con
  chi vedi ogni giorno è un appunto. Non è bravura, è un'altra occasione.

## Le grafiche

Quarantotto slide, di cui **quattro con un disegno o un'infografica** e
**nessuna ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c09` | pila | i tre tipi in ordine di affidabilità, il più debole in basso |
| `c17` | confronto | una causa banale davanti a un canale e a due |
| `c24` | flusso | strumento fermo → risultato spostato |
| `c40` | confronto | la stessa incongruenza in un incontro unico e in una relazione |

**`c09` è la prima `pila` scritta sfruttando la regola al contrario**: la
regola della 5.4 dice che `pila` impila dal basso, e qui serviva proprio
così — l'elenco va dal primo tipo al terzo e si legge **salendo**, con la
didascalia che lo dice («Si sale: il più debole sta sotto»).

Una sola correzione, di senso e non di impaginazione: `c26` era una slide con
la sola parola «Questa.», che funzionava solo con la voce sotto. Riletta
muta non diceva niente, e adesso porta la frase per intero.

## I tagli: otto sbagliati, e la banda ne ha visti quattro — tutti vicini

Quarantacinque confini, tutti dentro un silenzio, tutti riletti sulla
trascrizione. **Otto erano sbagliati**, sette in avanti e uno indietro.
`banda.py` ne segnalava quattro, e **nessuno dei quattro era il colpevole**:
erano `s13`, `s14`, `s16` e `s23`, cioè i blocchi accanto a `s12`, `s14`,
`s16` e `s22`.

| | segnalati da `banda.py` | sbagliati davvero |
|---|---|---|
| 5.1 | 1 | 1 |
| 5.2 | 3 | 7 |
| 5.3 | 4 | 8 |
| 5.4 | 0 | **0** |
| 5.5 | 2 | 3 |
| 6.1 | 1 | 1 |
| 6.2 | 4 | 8 |

| blocco | prima | dopo |
|---|---|---|
| `s05` | «parole e corpo» | «capita uno davanti» |
| `s06` | «corpo e corpo» | «riassume in tre righe» |
| `s11` | «un difetto, ed è grosso» | «non ne vedi neanche un pezzo» |
| `s12` | «sai quanto è difficile» | «non resta proprio niente» |
| `s14` | «corpo e corpo» | «confermato da qualcos'altro» |
| `s16` | «la sedia spiega la postura» | «di solito ne tocca uno» |
| `s22` | «il mal di schiena» | «e tutte invariate» |
| `s44` | «Il terzo.» | «per il suo punto di partenza» |

## La cosa nuova: `tagli.py correggi` non basta, e la clip di controllo lo dimostra

`correggi` stima lo spostamento **contando i caratteri** fra la coda letta e
la fine del blocco, e li converte in secondi con una velocità di lettura
fissa. Su otto confini **ne ha sistemati quattro al primo colpo e quattro
no**: su `s05`, `s06` e `s14` ha spostato troppo poco e il taglio continuava
a prendersi l'attacco del blocco dopo; su `s22` ha spostato nella direzione
giusta ma si è fermato prima della fine della frase.

La clip di controllo li ha ripresi tutti e quattro. E il modo di correggerli
non è rilanciare `correggi`, che rifarebbe la stessa stima: **la clip di
controllo porta i propri tempi per parola**, e da quelli il confine giusto si
calcola esattamente. La finestra è `[taglio − 2,2 s, taglio]`, quindi il
tempo locale `t` di una parola vale `taglio − 2,2 + t`: basta prendere il
silenzio fra l'ultima parola del blocco e la prima del blocco dopo e cercarne
il centro fra i candidati di `silenzi()`. Fatto così, la seconda clip di
controllo ha confermato tutti e quattro al primo colpo.

Costo: 1.001 crediti per `prova.mp3`, 193 per la prima clip di controllo a
otto finestre, 90 per la seconda a quattro.

## Le riprese

Due, `s19` e `s31`, **tutte e due viste**. Higgsfield ha rifiutato per la
quinta lezione di fila (tetto giornaliero del piano, non crediti), quindi
anche queste sono state generate sul nodo ElevenLabs con **Nano Banana 2**,
406 crediti l'una.

- **`s19`** — una bilancia a due piatti, vuoti, chiaramente sbilanciata,
  luce laterale. Introduce il terzo tipo, e la bilancia dice la stessa cosa
  della lezione: non conta che cosa c'è sopra, conta che i due piatti non
  stiano allo stesso livello;
- **`s31`** — un muro intonacato con una linea di livello dell'acqua netta,
  l'intonaco sotto macchiato e quello sopra pulito. È la linea di base resa
  visibile: un segno che dice dov'era prima.

## Il montato è stato verificato scena per scena

`get_video_scenes`: **cinquanta scene**, le due immagini esattamente alle
scene 19 e 31 (cioè `s19` e `s31`), **nessuna scena in `playback: loop`** e
tutte le altre in `freeze` con `volume: 0`. Copertina con la traccia muta da
3 s, chiusura con quella da 10 s. 16:9, 1080p.

Durata finale **598,8 s**, come le ventisei che la precedono.
