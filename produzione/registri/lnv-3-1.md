# Registro — 3.1 «La durata del contatto»

Apre il modulo 3. La distorsione centrale è la 1.4 applicata allo sguardo, ma
qui è più forte che altrove: **chi giudica lo sguardo di un altro sta
misurando la distanza dalla propria abitudine**, non una proprietà dell'altro.

| campo | valore |
|---|---|
| video_id | `d2e4788a89a7475e2c6a665695da1038` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p |
| durata | 598,6 s (9:59) — misurata sul montato |
| parlato | 586,9 s (553,8 s di voce tagliata + 33,1 s di pose) |
| voce | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v4`, 1,12× in post |
| flow ElevenLabs | `PGJgFU85oARGKcrL4r2r` |
| tracce | A `giNVGybkVa7VmGgr7Zhh` · B `uZI5V6NzUQuwF7W5lJyD` · C `uEKYUHpAGwjl2lthJMBS` |

## Il copione è stato riscritto

Da **4.191** caratteri di parlato nello script a **10.336**, media 215 per
blocco. (Il conto dello script prende le righe citate che finiscono con un
punto e lascia fuori i testi di slide, che non ne hanno.)

Lo script dava la struttura e la tesi. Quello che mancava è il materiale che
rende la tesi verificabile da chi ascolta invece che soltanto affermata:

- **i numeri che si trovano in rete, detti per quello che sono**: tre secondi,
  sette secondi, il sessanta per cento del tempo. Il copione li elenca
  all'inizio proprio perché sembrano misurati, e poi mostra che nessuno dice
  misurati *su chi*;
- **le sei variabili che spostano la durata normale**, una per slide
  (`c15`–`c20`), accese una alla volta. Era l'unico modo per far vedere che
  non sono sei dettagli ma sei cose attive insieme: con un elenco unico
  sarebbero sembrate alternative;
- **i due giudizi opposti sullo stesso sguardo** (`c12`), che è il punto in
  cui la lezione smette di parlare dell'altro e comincia a parlare di chi
  guarda. È il quadrante più importante del modulo;
- **perché distogliere lo sguardo è un atto funzionale e non un indizio**, con
  il costo cognitivo detto esplicitamente: parlare richiede risorse, e lo
  sguardo si stacca per liberarle. Serve qui perché prepara la 3.2, che su
  questo punto ci costruisce sopra tutta la lezione;
- **la bilancia** (`c42`): chi pretende contatto visivo costante non sta
  chiedendo attenzione, sta aggiungendo carico. Il piatto che scende è il
  carico, e la didascalia dice «pesa», non «sale».

## Note di contenuto

**Nessun segnale è nominato senza la sua condizione**, come chiede il modulo.
Ogni volta che il copione dice una durata, dice anche rispetto a chi.

Tre aneddoti in prima persona, inventati come prevede `MASTER.md` §0.2 e senza
dettagli verificabili: la persona che in riunione guardava sempre altrove e
che si è scoperto ascoltasse meglio di tutti, la conversazione in auto, e il
collega che sosteneva di avere davanti «uno che non lo guardava in faccia».

## Le grafiche

Quarantasette slide, di cui **sei con un disegno o un'infografica** e **una
ciclica**: `c34`.

| slide | tipo | cosa mostra |
|---|---|---|
| `c12` | quadranti | Due persone, la stessa conversazione, due giudizi opposti. |
| `c14` | finestra | Si sposta con sei cose, tutte attive insieme. |
| `c23` | barre | Parlare richiede risorse, e lo sguardo si stacca per liberarle. |
| `c34` | linea (ciclica) | Non sai quale cambiamento. Sai quando, quindi sai su cosa. |
| `c35` | bivio | Valgono esattamente uguale. Chi ne guarda una sola ne perde metà. |
| `c42` | bilancia | Il piatto che scende è il carico che gli stai mettendo addosso. |

**Le ho guardate tutte e sei da ferme prima di animarle**, e una aveva un
difetto che solo l'occhio trova:

- `c14` — la `finestra` ancora la banda d'oro al **bordo sinistro**, quindi
  non c'è nulla alla sua sinistra da chiamare «troppo poco». La didascalia
  prometteva mezza figura che non esiste. Riscritta in «tutto quello che sta
  oltre ti sembra troppo», che è quello che il disegno mostra davvero.

Le sei slide `c15`–`c20` usano lo stesso layout `list` con `active` che
scorre: la variabile accesa cambia, le altre cinque restano visibili spente.
È la prima volta che il corso enumera così, e funziona meglio di sei slide
diverse perché l'elenco non si ricompone ogni volta.

## Rimontata una volta

Il primo montaggio (`97eb37c1fbaca1b4546cc1ff7321b283`, cancellato) aveva la
slide ciclica `c34` in `freeze` invece che in `loop`: l'animazione partiva,
finiva dopo sette secondi e restava ferma per i sei successivi. `scene.py`
scrive il `loop` giusto in `scene.json`; l'errore è stato trascriverlo a mano
sbagliando di una posizione. **Da qui in avanti le scene si passano come le
scrive `scene.json`, senza ricopiarle.**

## Le tre riprese

Stesso mondo visivo del modulo 2 — stanza spoglia, luce naturale da una
finestra fuori campo, 50 mm, poca profondità di campo, camera ferma, legno
chiaro, avorio e un blu spento, nessun volto riconoscibile — con la luce di
pomeriggio dove lo script la chiede.

| blocco | cosa | perché lì |
|---|---|---|
| `s07` | due sedie accostate in una sala d'attesa, luce da una finestra alta, nessuno | sta sul passaggio in cui la durata «giusta» smette di essere una proprietà dello sguardo e diventa una proprietà di una stanza |
| `s27` | una finestra d'ufficio con le tapparelle a metà, luce di pomeriggio | apre il tratto sul costo cognitivo: una luce regolata a metà, come l'attenzione |
| `s37` | un parabrezza visto dal sedile posteriore, due sagome di spalle | sta sulla conversazione in auto, dove il contatto visivo è quasi zero e la conversazione va meglio |

Le ho **viste tutte e tre** prima di montarle. Nessun volto riconoscibile,
nessun contatto fisico, come vuole il corso.

## I tagli

**Prima lezione del corso con la banda completamente pulita.** `banda.py banda`
su parlato netto: **zero confini sospetti** su quarantacinque. È la prima
volta che succede in undici lezioni, e vale la pena dire perché: il copione di
questa lezione ha blocchi di lunghezza molto regolare (media 215, nessuno
fuori dai 150–300 caratteri tranne i tre di ripresa e i due memo), e
l'allineatore su un testo regolare sbaglia meno.

**Nessuna correzione a mano.** `tagli.json` è quello prodotto da `allinea`.

**La garanzia che si può dare**: tutti e quarantacinque i tagli cadono dentro
un silenzio. Il più stretto è a 157,17 s nella traccia C, un silenzio di
**0,38 s** con 0,19 s di margine per lato — il margine più largo di tutte le
lezioni prodotte finora (la 2.5 era scesa a 0,21 s).

**Resta il limite di tutto il corso**: i quarantacinque confini **non sono
verificati parola per parola**, perché i crediti ElevenLabs sono esauriti e la
trascrizione di controllo non si può fare. Nessun riconoscitore locale è
installabile: la policy di rete chiude `huggingface.co` e
`openaipublic.azureedge.net`.

## Le pose

33,1 secondi in tutto su quarantacinque slide, dai +0,15 s delle frasi ai
+1,45 s dei disegni. Il risolutore ha centrato il bersaglio: 586,9 s di
parlato contro i 587 richiesti, e il montato misura 598,6 s.

## Da verificare

Non sento l'audio e non vedo il montato. Ho guardato tutte e sei le slide con
un disegno e tutte e tre le riprese. **I quarantacinque tagli non sono
verificati con la trascrizione**, per i crediti esauriti.

## Blocchi


`·` disegno o infografica · `▪` ripresa

| blocco | slide | tipo | durata (s) | posa (s) |
|---|---|---|---|---|
| s02 | `c02` | elenco | 16.76 | +1.05 |
| s03 | `c03` | frase | 14.02 | +0.15 |
| s04 | `c04` | memo | 14.41 | +0.75 |
| s05 | `c05` | frase | 13.62 | +0.15 |
| s06 | `c06` | frase | 8.23 | +0.15 |
| s07 | ▪ due-sedie-in-sala-d-attesa | ripresa | 7.75 | — |
| s08 | `c08` | frase | 9.69 | +0.15 |
| s09 | `c09` | memo | 15.90 | +0.75 |
| s10 | `c10` | frase | 11.14 | +0.15 |
| s11 | `c11` | frase | 13.09 | +0.15 |
| s12 | · `c12` | quadranti | 13.24 | +1.45 |
| s13 | `c13` | memo | 17.34 | +0.75 |
| s14 | · `c14` | finestra | 11.96 | +1.45 |
| s15 | `c15` | elenco | 12.23 | +1.05 |
| s16 | `c16` | elenco | 14.72 | +1.05 |
| s17 | `c17` | elenco | 12.85 | +1.05 |
| s18 | `c18` | elenco | 16.29 | +1.05 |
| s19 | `c19` | elenco | 13.67 | +1.05 |
| s20 | `c20` | elenco | 11.49 | +1.05 |
| s21 | `c21` | frase | 13.52 | +0.15 |
| s22 | `c22` | frase | 10.22 | +0.15 |
| s23 | · `c23` | barre | 13.95 | +1.45 |
| s24 | `c24` | sostituzione | 12.86 | +1.05 |
| s25 | `c25` | frase | 11.08 | +0.15 |
| s26 | `c26` | memo | 4.75 | +1.48 |
| s27 | ▪ tapparelle-a-meta | ripresa | 6.52 | — |
| s28 | `c28` | frase | 9.69 | +0.15 |
| s29 | `c29` | frase | 10.93 | +0.15 |
| s30 | `c30` | sostituzione | 16.05 | +1.05 |
| s31 | `c31` | memo | 11.96 | +0.75 |
| s32 | `c32` | elenco | 12.81 | +1.05 |
| s33 | `c33` | frase | 12.30 | +0.15 |
| s34 | · `c34` | linea | 13.06 | +1.45 |
| s35 | · `c35` | bivio | 14.21 | +1.45 |
| s36 | `c36` | frase | 10.76 | +0.15 |
| s37 | ▪ parabrezza-dal-sedile-posteriore | ripresa | 4.34 | — |
| s38 | `c38` | frase | 15.88 | +0.15 |
| s39 | `c39` | memo | 11.43 | +0.75 |
| s40 | `c40` | frase | 9.27 | +0.15 |
| s41 | `c41` | frase | 11.49 | +0.15 |
| s42 | · `c42` | bilancia | 13.00 | +1.45 |
| s43 | `c43` | frase | 10.77 | +0.15 |
| s44 | `c44` | elenco | 12.27 | +1.05 |
| s45 | `c45` | elenco | 16.46 | +1.05 |
| s46 | `c46` | elenco | 11.09 | +1.05 |
| s47 | `c47` | elenco | 12.45 | +1.05 |
| s48 | `c48` | memo | 4.75 | +0.87 |
| s49 | `c49` | elenco | 20.61 | +1.05 |
