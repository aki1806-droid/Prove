# Registro — 7.5 «La mappa dei segnali che mandi tu»

L'ultima lezione delle trentacinque, e la chiusura del corso. Comincia dalla
promessa con cui il corso era cominciato — **non ti insegnerò a leggere le
persone** — e la scioglie: ogni volta che il corso ha tolto qualcosa, una
tabella, una regola, una promessa, è rimasto qualcosa di più piccolo e che
funziona. Quello che resta sta in **sette righe, una per modulo**, e la
lezione le dice una alla volta.

Poi la parte che resta davvero, la sola su cui si può fare qualcosa domani:
**i segnali che mandi tu**, l'unico ambito del corso in cui conosci la causa e
puoi verificare. Cinque voci — lo sguardo, le mani, la distanza, la voce, le
incongruenze. L'avvertenza che vale la pena dire solo adesso: per un periodo
guarderai tutti, e chi si sente osservato si controlla, quindi proprio quando
guardi di più vedi meno. La cosa da fare: **una persona, una situazione, una
settimana**, e alla fine verificare. E la differenza che il corso chiede di
tenere se si tiene una cosa sola: **più sicuri, o più accurati. Non è la
stessa cosa.**

| campo | valore |
|---|---|
| video_id | `VIDEO_ID` |
| scene | 50 — copertina, 47 blocchi, la scena muta con la musica, la chiusura del corso |
| formato | 16:9, 1080p |
| durata | DURATA — misurata sul montato |
| parlato | 622,2 s (557,8 s di voce tagliata + 64,4 s di pose) |
| voce | Luca Ward `e4bd8d8a357f41a99502309874733c16` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | cinque: A `s02`–`s08` · B `s09`–`s16` · C `s17`–`s26` · D `s27`–`s36` · E `s37`–`s48` |
| musica | `eleven_music_v2`, 50 s, 900 crediti ElevenLabs; due tagli: 25 s per la scena muta, 20 s per la chiusura |
| batch HeyGen | `BATCH` |
| costo | **30 crediti HeyGen** di voce + RENDER di render |

## Le note dello script

**«Velocità 0,92×. È la lezione più lenta delle trentacinque.»** Con la voce
da HeyGen la velocità si fa in post: le altre lezioni del modulo usano
`atempo` 1,16, che sta alla velocità di riferimento 0,95× dello standard;
0,92× vuol dire `1,16 × 0,92 / 0,95` = **1,12**. Sul montato la voce tagliata
va a 17,8 caratteri al secondo, contro i 18,6 della 7.4. Le pose sono le più
lunghe del modulo, **64,4 s**, perché il bersaglio è quello dello script:
11:10 con la chiusura.

**«Scena 4: 25 secondi senza voce. Unico silenzio lungo del corso, ed è
qui.»** È una scena a sé, dopo `s13` («Se fra un anno te ne restano tre, il
corso ha funzionato»): la ripresa della finestra al mattino, **25 s di musica
sola**, nessuna slide, nessuna voce. Per farla stare nel tetto di cinquanta
scene di `create_video_from_studio` il copione ha **47 blocchi** invece di 48.

**«Nessuna enfasi finale.»** Non c'è un «adesso sai leggere le persone», né
una promessa, né un augurio. L'ultimo blocco è una frase sola, «Quella
verifica è tutto il mestiere.», e l'ultima slide la ripete.

**«La scena 15 rimanda alla pagina Metodo e fonti e invita a segnalare
errori.»** Tenuta (`s44`–`s45`), con la ragione detta a voce: un corso così si
corregge non con la sicurezza di chi l'ha scritto, ma con le verifiche di chi
lo usa.

**Nessun aneddoto.** Rispettato in tutto il modulo. «Il partner a cena, il
collega in riunione, il figlio che risponde a monosillabi» è l'elenco dello
script, detto come elenco e non come storia.

**«Va girata in una sessione a sé e riascoltata il giorno dopo prima di
esportare.»** La prima metà è fatta: la voce è stata generata da sola, in
cinque tracce di fila. **La seconda tocca ad Achille**: questa lezione va
riascoltata a mente fresca prima di pubblicarla.

## Il copione

Da **4.192** caratteri di parlato nello script a **9.956**, media 212 per
blocco. Le parti, misurate con le pose:

| parte | blocchi | durata |
|---|---|---|
| trentacinque lezioni fa | `s02`–`s04` | 45,3 s |
| le sette righe | `s05`–`s13` | 132,5 s |
| la parte che resta e le cinque voci | `s14`–`s23` | 142,2 s |
| l'effetto collaterale | `s24`–`s30` | 81,6 s |
| la cosa da fare e che cosa aspettarsi | `s31`–`s38` | 109,4 s |
| più sicuri o più accurati | `s39`–`s43` | 55,6 s |
| fonti, prova di oggi, chiusura | `s44`–`s48` | 55,6 s |

Quello che il copione aggiunge:

- **perché non era una rinuncia** (`s02`): era l'unica cosa onesta che si
  potesse promettere;
- **che cosa è rimasto al posto di quello che il corso ha tolto** (`s03`):
  una frase al posto di una tabella, una domanda al posto di una conclusione;
- **una frase di spiegazione per ciascuna delle sette righe** (`s06`–`s12`),
  una per blocco, con la settima indicata come quella da tenere se se ne
  tiene una sola;
- **che non serve ricordarle tutte** (`s13`): serve che una torni in mente
  nel momento in cui stai per concludere qualcosa su qualcuno;
- **perché la parte su di te è la più facile da verificare** (`s14`–`s16`):
  puoi provare, guardare che cosa succede, e correggere;
- **una frase di ragione per ciascuna delle cinque voci** (`s18`–`s22`);
- **perché chi si sente osservato ti fa vedere meno** (`s27`–`s28`): mostra
  solo il controllo, e tu ne ricavi l'impressione sbagliata;
- **perché una settimana su una persona sola** (`s32`–`s34`): le stesse
  condizioni più volte di seguito, così le differenze sono differenze e non
  giorni diversi;
- **che cosa fare delle impressioni che non cambieranno** (`s38`): tenerle
  per quello che sono, una prima ipotesi fatta con il tuo metro;
- **il dato dietro «più sicuri o più accurati»** (`s40`), detto con il
  rimando al modulo due: l'addestramento aumenta la sicurezza, non
  l'accuratezza;
- **che cosa succede comunque vada la verifica** (`s47`): se avevi visto
  bene, bene; se no, hai imparato qualcosa sul tuo metro.

Il filtro del modulo 6 ha preso una frase dello script: «perché è quello che
fa la mente umana» (scena 12), dove *mente* è il sostantivo. È diventata
«perché è quello che fa chiunque, e nessun corso lo cambia».

## La voce: quinta lezione con HeyGen

**42 confini su 42 al primo colpo**, scarto massimo **0,091 s** dal centro
della pausa di HeyGen, tutti dentro la pausa. Pausa di confine più corta:
1,36 s.

**30 crediti** (7.240 → 7.210) per 695,2 s di grezzo in cinque chiamate.
Con 30, 31, 31 e 30 sulle lezioni dalla 7.2 alla 7.5, il costo della voce è
stabile: **30–31 crediti a lezione**.

## Le grafiche

Quarantotto slide, di cui **quattro con un'infografica** e **nessuna
ciclica**:

| slide | tipo | cosa mostra |
|---|---|---|
| `c28` | flusso | il paradosso: guardi di più → si controllano → vedi meno |
| `c29` | swap | l'antidoto: non serve a sapere chi hai davanti, serve a stare più attento a chi ti parla |
| `c40` | swap | l'addestramento: la sicurezza aumenta, l'accuratezza resta com'era |
| `c47` | bivio | la verifica: avevi visto bene / non avevi visto bene, accesi tutti e due |

Le liste ripetute sono tre: **le sette righe**, a schermo per nove blocchi
(`c05`–`c12`, poi la frase di `c13`), le cinque voci (`c17`–`c22`) e che cosa
aspettarsi (`c35`–`c37`). Due memo, gli stessi dello script.

**La chiusura è quella del corso**, non della lezione: titolo «Capire i segni
del linguaggio non verbale», «Sette moduli · trentacinque lezioni», il sito,
e il logo esteso **grande**, come chiede lo script («più grande del solito»).
Per farlo il layout `closing` di `slide_corso.mjs` ha un campo nuovo,
`grande`.

**Tre correzioni dal foglio di contatto:**

- il memo `c23` andava a capo lasciando «causa» da sola: ora sta su tre
  righe;
- `c31` cominciava la seconda riga con un punto mediano («· una
  settimana»): è diventata «Una persona, una situazione, / una settimana.»;
- il bivio `c47` spezzava «Alla fine, verifica» nel riquadro di partenza: è
  diventato «Verifichi», con «Non avevi visto bene» al posto di un «No» secco.

## La musica

Generata con **`eleven_music_v2`**, 50 s, 900 crediti ElevenLabs: pianoforte
morbido su un tappeto d'archi, niente percussioni, niente crescendo, chiusa
su due note. Le impostazioni del generatore dicevano «Instrumental: False»,
quindi **è stata trascritta** per controllo (275 crediti, Scribe): trascrizione
vuota, nessuna voce.

Due tagli, mono, 44,1 kHz, 128 kbps, a circa −25 LUFS, appena sotto la voce
(−23):

- **letto della scena muta**, 0–25 s, entrata di 2 s e uscita di 4 s;
- **chiusura del corso**, 26,5–46,5 s, entrata di 1,5 s e **dissolvenza
  lunga di 10 s**, come chiede lo script.

## Le riprese

RIPRESE

## Il montato

VERIFICA
