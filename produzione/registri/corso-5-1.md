# Registro — 5.1 «Dove finisce l'influenza, dove comincia l'abuso»

Apertura del modulo 5. Trattamento standard: senza avatar, voce Luca Ward,
slide animate, quattordici grafiche e tre riprese Higgsfield.

| campo | valore |
|---|---|
| video_id | `36a1bf43d45a07e291437e2223108503` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p, sottotitoli SRT |
| durata | 344,0 s (5:44) |
| parlato | 332,1 s |

La nota di montaggio chiede «il registro più asciutto del corso» e nessun
sorriso nelle scene della definizione, della zona grigia e del perno. Senza
avatar la cosa si traduce in due scelte: niente slide ammorbidite dal colore
(tutte su fondo avorio, nessuna delle tonalità calde usate altrove) e la posa
più lunga della lezione sulla frase che la nota indica come perno.

## Il copione è stato riscritto

Da **3.060** caratteri a **5.146**. Lo script aveva la definizione, i tre
test, la zona grigia e il segnale. Mancava il ponte fra una cosa e l'altra.

- **perché quasi nessuno dice dove fermarsi**: non è malafede. È che dirlo è
  più difficile che insegnare una tecnica, e il pubblico non lo chiede;
- **perché gli strumenti del corso sono neutri, detto per nome**: la
  riformulazione, le domande che aprono, il silenzio dopo una richiesta — e
  cosa diventa ognuno se lo si gira al contrario;
- **il prezzo della differenza**: chi passa attraverso il giudizio accetta di
  poter perdere; chi lo aggira quel rischio non lo corre. È la riga che
  trasforma la definizione in una cosa verificabile invece che morale;
- **il test di trasparenza in due forme**: «glielo direi in faccia?», e la
  versione più stretta — «se lo dichiarassi a voce alta mentre lo faccio,
  funzionerebbe ancora?»;
- **perché si può manipolare senza dire una bugia**: basta scegliere con cura
  cosa non dire. È il test dell'informazione visto dall'altra parte;
- **la reversibilità con una scadenza**: può dirmi di no senza pagarla? Adesso
  — e anche fra tre settimane;
- **come si riconosce la scarsità falsa**: l'ultima occasione si ripresenta il
  mese dopo, identica;
- **perché il segnale serve soprattutto nell'altra direzione**: da dentro non
  si vede quasi mai. Da dentro sembra soltanto che ci sia poco tempo.

## Nessun aneddoto

Lo script lo dice esplicitamente, e in questa lezione ha ragione: è la lezione
di posizionamento del corso, e un aneddoto in prima persona la
ammorbidirebbe.

## Le grafiche

| slide | tipo | cosa mostra |
|---|---|---|
| c05 | elenco | gli strumenti neutri del corso |
| c10 | tabella | persuadere e manipolare, tre righe |
| c14 | sostituzioni | chi persuade ci passa dentro, chi manipola lo evita |
| c17 | elenco | i tre test |
| c18 | elenco | trasparenza acceso |
| c21 | elenco | informazione acceso |
| c23 | elenco | reversibilità acceso |
| c27 | elenco | le tre situazioni della zona grigia |
| c28 | elenco | l'urgenza artificiale acceso |
| c30 | elenco | il senso di colpa acceso |
| c34 | sostituzioni | «è l'ultima occasione» → si ripresenta il mese dopo |
| c36 | tabella | su cosa agisce ognuna delle tre |
| c41 | sostituzioni | te ne accorgi dopo / te ne accorgi mentre |
| c43 | schede | i tre errori |

La tabella `c36` è quella che porta il perno: tre righe, e nella colonna «su
cosa agisce» ci sono soltanto «il tempo», «l'emozione», «il tempo». Il merito
non compare mai. La slide successiva, `c37`, è un memo di tre parole —
**«Nessuna sul merito.»** — e tiene dieci secondi. È la posa più lunga della
lezione, ed è la richiesta della nota di montaggio («isolata da due pause
piene») tradotta in montaggio.

Un'icona nuova: `conto`, uno scontrino con il totale a doppia riga oro, per
«il debito come argomento» nelle schede degli errori. Alla prima versione era
un rettangolo con due righe e leggeva come un documento generico; guardando il
PNG a 104 px l'ho ridisegnato più largo e con il bordo inferiore strappato —
adesso si legge come un conto presentato, che è il punto.

## Le tre riprese

| blocco | tipo | cosa |
|---|---|---|
| s26 | foto | una mano che appoggia un documento, l'altra persona ferma, volti non visibili |
| s33 | foto | un cartello di ultimi giorni in una vetrina, sbiadito dal sole |
| s42 | foto | un labirinto di siepi visto da dentro: due muri verdi e il cielo |

La prima è il b-roll che lo script chiedeva alla scena 6. La terza è la
risposta visiva a «da dentro non si vede quasi mai».

## I tagli

La lezione peggiore del corso finora: **tre giri di `correggi` più una
controprova più una ricostruzione della catena**.

- **primo giro**: sette confini fuori posto, tre in ritardo e quattro in
  anticipo;
- **secondo giro**: tre, tutti ancora a pochi decimi dal punto giusto;
- **terzo giro**: zero fuori posto. Ma `s18` era senza coda dal primo giro, e
  i caratteri al secondo dicevano che qualcosa non tornava: `s18` a 9,1 e poi
  `s20` a 48,6 e `s21` a 26,5.
- **la controprova** (33 crediti) ha risolto il primo pezzo: dei due silenzi
  candidati per la fine di `s18`, quello a **8,86 s** legge esattamente «in
  questo momento?», l'altro legge dentro `s19`.
- **la ricostruzione**: sistemato `s18`, restava il fatto che le finestre da
  `s19` in poi erano scalate di uno — lo scriba non aveva mai prodotto la coda
  di `s18`, quindi quello che `verifica.py` leggeva come fine di `s18` era in
  realtà la fine di `s19`, e così via. Ricostruita la catena sul **tempo di
  parlato netto** (silenzi esclusi) invece che sui caratteri grezzi: fine di
  `s19` a 14,46 s, fine di `s20` a 21,92 s. Con quei due valori i cinque
  blocchi intorno tornano tutti fra 15 e 20 caratteri al secondo, e il
  confine spurio che stava a 25,43 — dentro `s21`, non alla fine di nessun
  blocco — è sparito.

Un solo blocco resta fuori banda: `s19` a 22,4 caratteri al secondo, contro
un limite di 21. È un'eccedenza del 7% con entrambi i confini verificati — 8,86
dalla controprova e 14,46 dalla trascrizione — quindi il blocco è semplicemente
letto veloce, e ha comunque la sua posa. Muovere un confine verificato per far
tornare un numero sarebbe il contrario del metodo.

## Diciotto pose

`s02` (l'apertura, 7,5 s), `s05` (gli strumenti neutri, 8 s), `s10` (la
tabella, 8,5 s), `s14` (le sostituzioni, 8 s), `s17` e `s18` (i tre test e il
primo, 8 s), `s21` e `s23` (il secondo e il terzo, 8 s), `s24` (il memo sulla
richiesta, 8,5 s), `s27` (la zona grigia, 8 s), `s32` (il memo sul debito,
8,5 s), `s34` (l'ultima occasione, 8 s), `s36` (la tabella del perno, 8,5 s),
**`s37` («Nessuna sul merito», 10 s)**, `s41` (le due direzioni, 8 s), `s43`
(i tre errori, 8 s), `s48` (il memo finale, 9 s), `s49` (la prova, 7 s).

## Blocchi

`·` slide grafica · `▪` ripresa Higgsfield

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase (posa) | 7.50 |
| s03 | c03 | frase | 6.64 |
| s04 | c04 | frase | 6.68 |
| s05 | c05 | elenco **·** (posa) | 8.00 |
| s06 | c06 | frase | 5.77 |
| s07 | c07 | frase | 5.71 |
| s08 | c08 | frase | 6.14 |
| s09 | c09 | frase | 5.17 |
| s10 | c10 | tabella **·** (posa) | 8.50 |
| s11 | c11 | frase | 6.44 |
| s12 | c12 | frase | 6.54 |
| s13 | c13 | frase | 6.13 |
| s14 | c14 | sostituzioni **·** (posa) | 8.00 |
| s15 | c15 | frase | 6.31 |
| s16 | c16 | frase | 5.20 |
| s17 | c17 | elenco **·** (posa) | 8.00 |
| s18 | c18 | elenco **·** (posa) | 8.00 |
| s19 | c19 | citazione | 4.38 |
| s20 | c20 | frase | 5.46 |
| s21 | c21 | elenco **·** (posa) | 8.00 |
| s22 | c22 | frase | 5.15 |
| s23 | c23 | elenco **·** (posa) | 8.00 |
| s24 | c24 | memo (posa) | 8.50 |
| s25 | c25 | frase | 6.35 |
| s26 | — | foto — una mano che appoggia un documento su un tavolo, l'altra persona ferma di fronte, luce laterale, volti non visibili **▪** | 5.18 |
| s27 | c27 | elenco **·** (posa) | 8.00 |
| s28 | c28 | elenco **·** | 6.68 |
| s29 | c29 | frase | 6.71 |
| s30 | c30 | elenco **·** | 7.14 |
| s31 | c31 | frase | 6.04 |
| s32 | c32 | memo (posa) | 8.50 |
| s33 | — | foto — un cartello di ultimi giorni in una vetrina, sbiadito dal sole **▪** | 6.48 |
| s34 | c34 | sostituzioni **·** (posa) | 8.00 |
| s35 | c35 | frase | 4.74 |
| s36 | c36 | tabella **·** (posa) | 8.50 |
| s37 | c37 | memo (posa) | 10.00 |
| s38 | c38 | frase | 5.54 |
| s39 | c39 | frase | 5.06 |
| s40 | c40 | frase | 5.29 |
| s41 | c41 | sostituzioni **·** (posa) | 8.00 |
| s42 | — | foto — un labirinto di siepi visto da dentro: solo due muri verdi e il cielo **▪** | 4.74 |
| s43 | c43 | schede **·** (posa) | 8.00 |
| s44 | c44 | frase | 5.64 |
| s45 | c45 | frase | 5.29 |
| s46 | c46 | frase | 6.55 |
| s47 | c47 | citazione | 6.69 |
| s48 | c48 | memo (posa) | 9.00 |
| s49 | c49 | frase (posa) | 15.75 |

## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e
tutti i 46 tagli con la trascrizione più una controprova. Restano da giudicare
le **tre riprese Higgsfield**, che non posso aprire da qui.
