# Registro — 5.4 «Le leve legittime»

Trattamento standard: senza avatar, voce Luca Ward, slide animate, tredici
grafiche e tre riprese Higgsfield.

| campo | valore |
|---|---|
| video_id | `9662ad79bab64721c49e4b6484f5f3ad` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p, sottotitoli SRT |
| durata | 348,7 s (5:49) |
| parlato | 336,7 s |

È la lezione più densa del modulo: cinque leve, e per ognuna la versione che
la imita. Lo script avvisa che le scene 3, 4, 5, 7 e 8 hanno tutte la stessa
struttura, e chiede di variare il ritmo per non renderle monotone.

## Come ho variato il ritmo senza avatar

Il testo non lo può fare da solo: cinque coppie leva-abuso hanno per forza la
stessa forma. Quindi la variazione sta in tre cose di montaggio.

- **Un'unica slide-elenco che si accende cinque volte** (`c05`, `c06`, `c12`,
  `c19`, `c27`, `c33`): la leva corrente in navy, le altre quattro spente. È
  la spina dorsale visiva della lezione, e dice sempre dove siamo fra le
  cinque;
- **la grafica dell'abuso cambia tipo ogni volta**: sostituzioni per la
  reciprocità e per la coerenza, citazione per il favore nominato, tabella
  per la testimonianza, tabella di nuovo ma con colonne diverse per la
  quinta. Nessuna coppia usa lo stesso layout della precedente;
- **le pose non sono uniformi**: 8,0 / 8,5 / 9,0 secondi a rotazione, con i
  nove secondi riservati ai quattro memo. Il passo cambia di mezzo secondo
  ogni due o tre blocchi, che a orecchio si sente come cambio di ritmo e non
  come pausa generica.

## Il copione è stato riscritto

Da **3.571** caratteri a **4.865**. È la riscrittura più contenuta del modulo,
perché lo script era già il più pieno dei cinque. Le aggiunte:

- **perché la prova è sottoutilizzata**: richiede lavoro prima della
  conversazione, e il lavoro fatto prima non si vede. Si vede solo quello
  dopo;
- **perché nominare il favore cancella il dono**: non lo indebolisce. Lo
  cancella all'indietro, retroattivamente;
- **la coerenza legittima detta per bene**: non è un rimprovero, è un fatto
  che ha dichiarato lui e che adesso è sul tavolo;
- **perché la testimonianza va dichiarata**: la sua forza non dipende da
  quanto sia vera. Fa capire, non dimostra — sono due lavori diversi, e lei
  sa farne uno soltanto;
- **i tre passaggi dell'attrito, nominati**: una ricerca, una decisione su un
  dettaglio che non sa risolvere, e un momento che non trova mai;
- **la domanda di controllo della quinta**, che nello script non c'era: sto
  rendendo facile il fare, oppure il non pensarci? È la riga che rende
  applicabile il confine invece che solo comprensibile.

## Nessun aneddoto

Cinque leve in sei minuti non lasciano spazio, e la nota di montaggio avvisa
che la lezione rischia già di sforare.

## Le grafiche

| slide | tipo | cosa mostra |
|---|---|---|
| c05 | elenco | le cinque leve |
| c06 | elenco | la prova accesa |
| c10 | sostituzioni | cosa ottieni portando il dato che ti indebolisce |
| c12 | elenco | la reciprocità accesa |
| c14 | sostituzioni | gennaio-giugno è un rapporto, martedì-mercoledì un acquisto |
| c19 | elenco | la coerenza accesa |
| c23 | sostituzioni | le stesse parole dette come accuse |
| c27 | elenco | la testimonianza accesa |
| c29 | tabella | la testimonianza fa capire, il dato dimostra |
| c33 | elenco | rendere facile accesa |
| c37 | elenco | i tre passaggi dell'attrito |
| c39 | sostituzioni | tre attriti e i tre gesti che li togliono |
| c42 | tabella | il gesto e che cos'è: servizio o zona grigia |

La slide `c39` è quella che porta più valore pratico: tre righe con la freccia
in mezzo — «quando ti va bene?» → proponi già la data, «lo trovi in cartella»
→ allega il documento, «fammi sapere» → riduci a due opzioni.

Nessuna icona nuova. Due grafiche sono state rifatte dopo aver guardato il
PNG, e per lo stesso motivo: il layout `table` mette in evidenza la **seconda**
colonna, e su `c14` e `c42` la seconda colonna era la versione abusiva —
quindi l'enfasi diceva «questa è la risposta giusta». `c14` è diventata
sostituzioni (la freccia dice «è», non «meglio»), e `c42` è stata
ristrutturata con le colonne «il gesto» e «che cos'è», così l'enfasi cade sul
verdetto e non sul gesto.

## Le tre riprese

| blocco | tipo | cosa |
|---|---|---|
| s26 | foto | una porta con la maniglia abbassata, socchiusa, luce dalla fessura |
| s32 | foto | un biglietto scritto a mano sullo zerbino, un mazzo di chiavi accanto |
| s38 | foto | un calendario aperto con una data già cerchiata a matita |

La prima è il b-roll che lo script chiedeva alla scena 6. La terza è
letteralmente «proponi già la data».

## I tagli

Quarantasei confini: **due** fuori posto al primo giro (`s30` in ritardo di
quasi tre secondi, `s32` in anticipo di due), **zero** al secondo. Nessun
blocco fuori dalla banda caratteri/secondo.

Un dettaglio che vale la pena registrare: lo scriba ha prodotto **43 pezzi**
invece di 46, perché ha unito in una sola frase tre code consecutive
(«si aggira il giudizio fra le due versioni e di tutta la lezione») e altre
due («andare a controllare se c'è un motivo preciso») — cioè ha smesso di
mettere i punti. `verifica.py` ha segnato `s02`, `s03` e `s05` come senza
coda, ma non era un confine sbagliato: era punteggiatura mancante. L'ho
verificato con i caratteri al secondo — quei cinque blocchi stanno tutti fra
16 e 20 — e li ho lasciati dov'erano. **Tre code mancanti non sono tre
confini sbagliati**: prima di muovere qualcosa va guardata la banda.

## Ventitré pose

`s05` (le cinque leve, 8,5 s), `s06` (la prova, 8 s), `s09` (il memo sul dato
che indebolisce, 9 s), `s10` (le sostituzioni, 8 s), `s12` (la reciprocità,
8,5 s), `s14` (gennaio-giugno, 8 s), `s17` (il favore nominato, 8 s), `s18`
(il memo della fattura, 9 s), `s19` (la coerenza, 8,5 s), `s20` (la citazione
legittima, 8,5 s), `s23` (le accuse, 8 s), `s25` (il memo dell'autogol, 9 s),
`s27` (la testimonianza, 8,5 s), `s29` (la tabella, 8 s), `s30` (lo statuto,
8 s), `s33` (rendere facile, 9 s), `s35` (il memo sugli attriti, 9 s), `s37`
(i tre passaggi, 8 s), `s39` (i tre gesti, 8,5 s), `s42` (il confine, 8 s),
`s45` (il memo servizio/zona grigia, 9 s), `s46` (la domanda di controllo,
8,5 s), `s49` (la prova, 7 s).

La scena 9 dello script — il confine della quinta leva — non è stata tagliata:
occupa `s41`–`s46`, sei blocchi, ed è la sezione con più pose per minuto di
tutta la lezione.

## Blocchi

`·` slide grafica · `▪` ripresa Higgsfield

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase | 6.08 |
| s03 | c03 | frase | 5.53 |
| s04 | c04 | frase | 4.82 |
| s05 | c05 | elenco **·** (posa) | 8.50 |
| s06 | c06 | elenco **·** (posa) | 8.00 |
| s07 | c07 | frase | 5.74 |
| s08 | c08 | frase | 4.88 |
| s09 | c09 | memo (posa) | 9.00 |
| s10 | c10 | sostituzioni **·** (posa) | 8.00 |
| s11 | c11 | frase | 5.52 |
| s12 | c12 | elenco **·** (posa) | 8.50 |
| s13 | c13 | frase | 4.93 |
| s14 | c14 | sostituzioni **·** (posa) | 8.00 |
| s15 | c15 | frase | 5.84 |
| s16 | c16 | frase | 4.74 |
| s17 | c17 | citazione (posa) | 8.00 |
| s18 | c18 | memo (posa) | 9.00 |
| s19 | c19 | elenco **·** (posa) | 8.50 |
| s20 | c20 | citazione (posa) | 8.50 |
| s21 | c21 | frase | 5.48 |
| s22 | c22 | frase | 5.42 |
| s23 | c23 | sostituzioni **·** (posa) | 8.00 |
| s24 | c24 | frase | 5.78 |
| s25 | c25 | memo (posa) | 9.00 |
| s26 | — | foto — una porta con la maniglia abbassata, socchiusa, la luce che passa dalla fessura **▪** | 4.57 |
| s27 | c27 | elenco **·** (posa) | 8.50 |
| s28 | c28 | frase | 5.69 |
| s29 | c29 | tabella **·** (posa) | 8.00 |
| s30 | c30 | citazione (posa) | 8.00 |
| s31 | c31 | frase | 4.88 |
| s32 | — | foto — un biglietto scritto a mano lasciato sullo zerbino con un mazzo di chiavi accanto **▪** | 5.11 |
| s33 | c33 | elenco **·** (posa) | 9.00 |
| s34 | c34 | frase | 5.43 |
| s35 | c35 | memo (posa) | 9.00 |
| s36 | c36 | frase | 5.97 |
| s37 | c37 | elenco **·** (posa) | 8.00 |
| s38 | — | foto — un calendario aperto con una data gia' cerchiata a matita, la penna appoggiata sopra **▪** | 5.79 |
| s39 | c39 | sostituzioni **·** (posa) | 8.50 |
| s40 | c40 | frase | 5.18 |
| s41 | c41 | frase | 4.70 |
| s42 | c42 | tabella **·** (posa) | 8.00 |
| s43 | c43 | frase | 5.90 |
| s44 | c44 | frase | 5.36 |
| s45 | c45 | memo (posa) | 9.00 |
| s46 | c46 | citazione (posa) | 8.50 |
| s47 | c47 | frase | 6.18 |
| s48 | c48 | frase | 5.01 |
| s49 | c49 | frase (posa) | 16.72 |

## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e
tutti i 46 tagli con la trascrizione. Restano da giudicare le **tre riprese
Higgsfield**, che non posso aprire da qui.
