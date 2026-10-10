# Registro — 4.4 «Le pose di potere: cosa non regge»

**È una lezione di metodo travestita da lezione di contenuto.** Racconta per
intero la storia di un risultato famoso — lo studio del 2010 sulle pose di
potere, la replica del 2015 che non lo conferma, la dichiarazione del 2016 in
cui una delle autrici originali dice di non ritenerlo più reale — e poi
osserva la cosa che conta davvero: **che niente di tutto questo ha raggiunto
il mercato.** Dieci anni dopo la tecnica si insegna ancora.

Il registro è asciutto, come chiede lo script. Nessuna slide fa dell'ironia
su chi ci ha creduto, e il gesto della ricercatrice che si smentisce è
raccontato come un gesto raro, non come un'ammissione di colpa: è il sistema
che si corregge.

| campo | valore |
|---|---|
| video_id | `c1eb0c5772b1cbc752f319564403a18e` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,8 s (9:58) — misurata sul montato |
| parlato | 587,1 s (551,2 s di voce tagliata + 35,9 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `FNJkNF5x7A6tiXC8kHAq` |
| tracce | A `0u6alxcydyMhbFzGJWJR` · B `mttCCuz38sXObfpu23a3` · C `tPV53yYQ4VD1EanAZ3Qh` |
| batch HeyGen | `4e60b74d80c343fbbacedc87fd3c54a1`, 95 file |

## I nomi e gli anni si dicono a voce

La nota dello script lo chiede, e questa è l'unica lezione del modulo in cui
le fonti sono il contenuto invece che una cautela. Nel parlato si sentono:

- **Carney, Cuddy e Yap**, duemiladieci, quarantadue partecipanti;
- **Ranehill e colleghi**, duemilaquindici, intorno alle duecento persone;
- **Dana Carney**, duemilasedici, la dichiarazione.

La conferenza online **non si nomina per marca**, come nello script.

Nel parlato i nomi si scrivono nella forma che la voce legge — «Dana Carni,
Eimi Cadi e Endi Iap», «Eva Rànehill» — e sulle slide si scrive la grafia
vera. È la stessa regola di «Écman» nella 2.2. **L'accento di «Rànehill» è
l'unico carattere accentato di tutta la lezione**, e `blocchi.py` lo mette in
una lista di eccezioni esplicite invece di allentare il controllo.

## Il copione

Da **4.411** caratteri di parlato nello script a **10.167**, media 212 per
blocco. La prima stesura si era fermata a 9.014 — **è la prima volta che una
lezione esce corta invece che lunga** — e sono stati aggiunti 1.150 caratteri
in due giri, su blocchi scelti per quello che avevano da dire, non per
riempire.

Quello che è stato aggiunto, e perché:

- **il protocollo dello studio** (`s08`): due posizioni per un minuto
  ciascuna, metà dei partecipanti espansi e metà raccolti. Senza, «posa
  espansa» resta un'immagine;
- **che cosa distingue i tre risultati** (`s09`): il primo lo dichiarano i
  partecipanti, gli altri due si misurano. È la distinzione su cui regge
  tutta la seconda metà della lezione, e lo script la dà per scontata;
- **perché ventuno per gruppo è poco** (`s07`), detto subito e non alla fine:
  il numero è il punto attorno a cui gira la storia;
- **perché smentirsi è raro** (`s18`): non perché gli scienziati siano
  disonesti, ma perché il sistema premia chi pubblica cose nuove. Senza
  questo, il gesto del 2016 sembra solo una stranezza;
- **perché una replica non circola** (`s23`): niente di nuovo da raccontare,
  titolo noioso, e chi ci ha già costruito un corso ha pochi motivi per
  cercarla. Lo script dice che il mercato non legge le repliche; il copione
  dice perché;
- **la simmetria dei quattro errori** (`s41`): due per eccesso di fiducia e
  due per eccesso di sfiducia. Lo script li elenca, il copione li ordina;
- **la prova fatta su questo corso** (`s47`). Lo script dice «anche di questo
  corso»; il copione lo rende un invito esplicito, perché una lezione sul
  verificare che si esclude dalla verifica vale poco.

**La scena 13 è stata tenuta** come chiede la nota: occupa `s37`–`s40` e
chiude sul rimando al corso sulla comunicazione — respirare, e preparare le
prime due frasi.

## Le grafiche

Quarantasette slide, di cui **cinque con un disegno o un'infografica** e
**una ciclica**, `c21`:

| slide | tipo | cosa mostra |
|---|---|---|
| `c08` | barre | Il numero è il punto attorno a cui gira tutto. |
| `c13` | confronto | gli stessi tre risultati, 2010 contro 2015 |
| `c21` | linea (ciclica) | La smentita non ha raggiunto il mercato. |
| `c23` | flusso | E chi ci ha costruito un corso non la cerca. |
| `c33` | raggi | Nessuna richiede di capire uno studio. |

Due figure fanno il lavoro che il parlato non può fare da solo. **`c08`**
mette quarantadue accanto a duecento e la sproporzione si vede in un secondo.
**`c21`** è la cronologia in quattro date — 2010, 2015, 2016, oggi — ed è
ciclica perché il punto è che l'ultima tacca continua a scorrere: la smentita
è del 2016 e la tecnica si vende ancora.

## Diciassette correzioni sulle slide, in tre giri

Tutte e quarantasette renderizzate come fermi immagine e guardate su provini
a quattro. Due difetti di figura e quindici righe che andavano a capo tre
volte.

I due di figura sono della classe §7-bis:

- **`c21`**: le etichette del 2015 e del 2016 si accavallavano. I momenti di
  una `linea` vanno distanziati guardando il risultato, non contando le date:
  qui stavano a 38 e 55 su cento e si sovrapponevano, a 36 e 66 no;
- **`c23`**: la terza casella del `flusso` sbordava. «Nessuno la rilancia» è
  diventato «Nessuno rilancia», e il sub si è accorciato.

E **un difetto già visto nella 4.3**, che quindi è una regola e non un caso:
`c48` era un `memo` in corsivo con «Che non c'è nessuna risposta», e nel
corsivo la sequenza `'è` si accavalla. Riscritto «Che non esiste nessuna
risposta».

## I tagli

Quarantacinque confini, **tutti dentro un silenzio**, e **zero fuori banda**.
`banda.py` aveva segnalato un solo confine, `s48` a +1,61 s; `griglia.py` sulla
finestra `s47`–`s49` ha trovato la combinazione che porta il massimo scarto a
0,98 s, e sono bastati due spostamenti.

È il risultato più pulito del modulo insieme alla 4.2.

I cinque silenzi più stretti su cui cade un taglio: `s30` 0,39 s · `s31`
0,40 s · `s29` 0,41 s · `s32` 0,45 s · `s06` 0,45 s. **Nessun taglio cade in
un silenzio sotto i 0,39 s**: è la lezione con il margine più largo del corso.

## Le riprese

Tre, `s06`, `s20` e `s31`. **Tutte e tre viste.**

- **`s06`** — un auditorium vuoto con il palco illuminato, una sedia e un
  microfono. Evoca la conferenza senza nominarla, esattamente come fa lo
  script;
- **`s20`** — una sala conferenze aziendale, sedie allineate, proiettore
  acceso su uno schermo bianco, nessuno in campo;
- **`s31`** — una pila di riviste rilegate su uno scaffale. **Rigenerata una
  volta**: nella prima versione il dorso di una rivista reale era
  perfettamente leggibile, e lo script chiede dorsi non leggibili. In una
  lezione che racconta dove è stato pubblicato che cosa, un titolo leggibile
  che non c'entra con la storia è peggio di un dettaglio di stile.

## Il montato è stato verificato scena per scena

`get_video_scenes` sul video montato: cinquanta scene, le tre immagini
esattamente alle scene 5, 19 e 30 (cioè `s06`, `s20` e `s31`), la scena 20 in
`playback: loop` — è `c21`, la cronologia — e tutte le altre in `freeze` con
`volume: 0`. Copertina con la traccia muta da 3 s, chiusura con quella da
10 s.
