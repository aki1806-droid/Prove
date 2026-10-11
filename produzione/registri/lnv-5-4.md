# Registro — 5.4 «La voce come segnale non verbale»

**È il canale che quasi tutti i corsi sul linguaggio del corpo dimenticano,
e la ragione è banale: un corso sul corpo cerca cose da guardare, e la voce
non si guarda.** Eppure è non verbale a tutti gli effetti ed è probabilmente
il più informativo dopo il volto.

Ha anche una proprietà che nessun altro canale del corso ha nella stessa
misura: **è più difficile da controllare della faccia**. La bocca la
governiamo bene — il sorriso si fa a comando, l'espressione neutra si tiene —
mentre la voce dipende dal respiro, dalla tensione della gola e da quanta
aria passa. Chi vuole nascondere uno stato emotivo cura l'espressione, perché
sa che si vede, e quasi sempre si dimentica della voce.

E poi c'è il telefono, dove sparisce tutto il resto e **si sente di più**,
non di meno.

| campo | valore |
|---|---|
| video_id | `d6a44d680232ca9abedf21dbee8a05ca` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,9 s (9:59) — misurata sul montato |
| parlato | 587,0 s (552,8 s di voce tagliata + 34,2 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `ASHnkv7K5HPDVJGlYFwT` |
| tracce | A `CqdV5BeCJv5ffQWCOkWS` · B `md1JXt9ccyMd8b0Oqq2W` · C `YIdjALB6qhq9vCUtAATf` |
| batch HeyGen | `a2384924ed4d4f629c17dc35d9e0b0e0`, 96 file |

## Le due note dello script

**La scena 9 è l'esempio più vicino al pubblico del corso, e va tenuta.** È
quella dei turni: la voce delle sei del mattino e quella delle sette di sera
non sono la stessa voce, e non lo sono per nessun motivo psicologico. Il
copione la porta per intero su quattro blocchi (`s28`–`s31`) e dice anche
perché la racconta: si misura su se stessi in una giornata, senza bisogno di
nessun corso.

**Nessun aneddoto**, come in tutto il modulo 5.

E vale il vincolo di corso: **nessuna formulazione che suggerisca di rilevare
la menzogna.** Qui lo dice la scena 8, in chiaro, su `c22`: *non esiste la
voce della menzogna*. Le tre slide che seguono riportano il segnale dove sta
— attivazione, con le sue cause di sempre — e `c26` chiude con «una delle
tante, e quella rara».

## Il copione

Da **4.089** caratteri di parlato nello script a **10.200**, media 212 per
blocco. Quarantotto blocchi, due riprese a `s15` e `s32` — due invece di tre,
perché lo script di questa lezione prevede due soli videoclip.

Quello che il copione aggiunge:

- **perché il canale viene dimenticato** (`s05`): un corso sul corpo cerca
  cose da guardare. Lo script non lo dice, e senza quella riga la lezione
  comincia con un'accusa invece che con una spiegazione;
- **la fisica dell'altezza** (`s11`): le corde vocali si tendono e una corda
  più tesa suona più acuta. Non c'è niente di psicologico, e dirlo toglie di
  mezzo metà delle letture sbagliate;
- **perché al telefono i malintesi sono più violenti** (`s18`): dal vivo una
  frase secca arriva insieme a una faccia che non è secca, e la faccia vince.
  Al telefono quella faccia non c'è;
- **perché al telefono si sente di più** (`s20`): l'attenzione che di solito
  si divide fra volto, mani e postura finisce tutta su un canale solo;
- **perché il cambiamento di voce è più affidabile di quasi tutto il resto**
  (`s36`): è difficile da produrre apposta ed è difficile da sopprimere —
  due cose che di un sorriso non si possono dire;
- **perché riascoltarsi il giorno dopo e non subito** (`s41`): subito ti
  ascolti ancora da dentro e senti quello che volevi dire;
- **il rimando all'altro corso in forma condizionale** (`s40`): lo script
  manda alla lezione sul paraverbale di «Dire, ascoltare, convincere». Il
  copione la nomina, ma con un «se hai seguito», perché chi non l'ha seguito
  non deve sentirsi tagliato fuori.

## Le grafiche

Quarantotto slide, di cui **cinque con un disegno o un'infografica** e
**nessuna ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c08` | raggi | Tre cose che non si gestiscono a comando. |
| `c18` | confronto | la stessa frase secca, dal vivo e al telefono |
| `c25` | imbuto | che cosa accende la voce |
| `c35` | flusso | Qui il momento si colloca da solo. |
| `c40` | flusso | Sentirai cose che non sapevi di comunicare. |

I quattro parametri — altezza, volume, velocità, qualità — stanno su un
elenco solo che si accende una riga alla volta (`c11`–`c14`), con la nota che
cambia sotto: è il modo più economico di dare quattro spiegazioni senza
quattro slide diverse.

### Una correzione, e una regola nuova per lo standard

`c08` è tornata indietro con **tutte le etichette ammucchiate nell'angolo in
alto a sinistra**, sopra l'occhiello. La causa non è il testo: è che nei
satelliti di `raggi` il campo `d` è un **numero da 0 a 100** — la distanza
del satellite dal centro — e io ci avevo messo una descrizione. La stringa
diventa `NaN` nel calcolo del raggio e tutti i satelliti finiscono nello
stesso punto, in silenzio.

> **Regola nuova.** In `raggi`, `attorno[].d` è numerico (0–100, la distanza
> dal centro). Una stringa non dà nessun errore e ammucchia tutte le
> etichette in un angolo.

Con `d` numerico la figura si dispone bene anche con **tre** satelliti, non
solo con quattro.

## I tagli: quarantacinque su quarantacinque, al primo giro

**È la prima lezione del corso con zero confini sbagliati.**

Quarantacinque confini, tutti dentro un silenzio, **zero segnalati da
`banda.py` e zero sbagliati alla trascrizione**: le code lette corrispondono
una per una alla fine del blocco.

| | segnalati da `banda.py` | sbagliati davvero |
|---|---|---|
| 5.1 | 1 | 1 |
| 5.2 | 3 | 7 |
| 5.3 | 4 | 8 |
| 5.4 | 0 | **0** |

Questo non rende la banda più affidabile di quanto la 5.3 abbia dimostrato:
la banda pulita era pulita anche nella 5.2, dove sette confini erano
sbagliati. **La differenza la fa la trascrizione, e qui dice che è andata
bene davvero.** Costo: 1.001 crediti, circa diciassette centesimi, e nessun
file di controllo perché non c'era niente da correggere.

## Le riprese

Due, `s15` e `s32`, **tutte e due viste**.

**Higgsfield ha rifiutato di nuovo**, con lo stesso messaggio della 5.3:
tetto giornaliero di generazioni del piano, con 571 crediti sul conto. Le due
immagini sono quindi state generate anche qui sul nodo ElevenLabs con **Nano
Banana 2**, a 406 crediti l'una.

- **`s15`** — un telefono fisso con la cornetta appoggiata, su una scrivania,
  luce bassa. Nessuna persona in campo, nessuna scritta leggibile;
- **`s32`** — un bicchiere d'acqua accanto a un microfono su un tavolo di
  legno, luce calda. Nessun marchio sul microfono.

## Il montato è stato verificato scena per scena

`get_video_scenes` sul video montato: **cinquanta scene**, le due immagini
esattamente alle scene 15 e 32 (cioè `s15` e `s32`), **nessuna scena in
`playback: loop`** e tutte le altre in `freeze` con `volume: 0`. Copertina
con la traccia muta da 3 s, chiusura con quella da 10 s. 16:9, 1080p.

Durata finale **598,9 s**: un secondo sotto i 600 teorici, come le altre
ventitré.
