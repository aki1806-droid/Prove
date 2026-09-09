# Registro — 2.2 «I quattro modi di ascoltare male»

Senza avatar, voce Luca Ward, slide animate. Stesso trattamento della 2.1
nella sua versione buona.

| campo | valore |
|---|---|
| video_id | `00e07a615c8bf3df1d1da220044c680c` |
| scene | 40 — copertina, 38 blocchi, chiusura |
| formato | 16:9, 1080p, sottotitoli SRT |
| parlato | 366,6 s |

## Il copione è stato riscritto

Lo script di partenza contava **2.100 caratteri** di parlato: circa 2:15 di
video finito, contro i sei minuti dichiarati. Portato a **6.211**, cioè 6:06
di parlato. Non allungando le frasi, ma aggiungendo cose che mancavano:

- come si riconosce ciascuno dei quattro modi **da fuori**, non da dentro;
- perché il valutativo non sente gli ultimi venti secondi (sta scrivendo la
  sentenza);
- la regola delle «due volte» che chiude l'aneddoto: i fatti prima, come sta
  dopo — e quasi nessuno arriva alla seconda perché quasi nessuno lo lascia
  arrivare.

**L'aneddoto è inventato**, in prima persona, come da `METODO.md`: l'amico che
telefona di sera per il progetto da cui l'hanno tagliato fuori, il piano in
tre punti dato dopo due minuti, il «va bene» seguito dal cambio di argomento.
La battuta che lo script già chiedeva — «Avevo risolto il problema. E avevo
perso la persona.» — adesso ha davanti i due giorni che ci sono voluti per
capirlo.

## Le cinque grafiche

| slide | cosa mostra |
|---|---|
| c07 | il selettivo: 20%, una frase su cinque, con la barra |
| c10 | i quattro modi come schede — nuvola, imbuto, bilancia, cerotto |
| c15 | tabella: ogni modo → il segno che lascia addosso all'altro |
| c20 | i due passaggi, con l'arco d'oro del riparatore che salta il primo |
| s16 | b-roll: sala d'attesa, uno parla con le mani, l'altro guarda l'ora |

Il b-roll è generato con Artlist: 5 secondi, muto, in loop sotto la battuta
sul peggiore dei quattro. **400 crediti** — non le «qualche decina» che avevo
stimato a occhio. La versione da 10 secondi con audio ne costava 1.500: cinque
secondi muti bastano, visto che la clip va comunque mutata e messa in loop.

Difetti trovati guardando le slide rese, non leggendo il codice: l'arco d'oro
attraversava la sua etichetta, «Quello che manca» non si capiva, la prima
nuvola sembrava un palloncino e il primo cerotto una pillola.

## I tagli

Verificati tutti e 36, in due tornate: **13 sbagliati alla prima, zero alla
seconda**. Sulla 2.1 erano 9 su 36, perché lì il riferimento erano le durate
misurate dei blocchi; qui ci sono solo i caratteri, che predicono peggio.

Il giro è ora in `produzione/script/tagli.py`, che vale per tutte le lezioni.
Usandolo sono venuti fuori due difetti, corretti:

- se le ultime parole della coda compaiono due volte vicino al confine, la
  ricerca agganciava la prima occorrenza. È successo con «mentre», che in s37
  compare due volte, e spostava di cinque secondi un taglio già giusto. Ora si
  prende l'occorrenza più vicina alla fine del blocco, e si gestiscono anche
  le code di una parola sola.
- il contatore del ciclo si chiamava `k` e oscurava la variabile del chunk.

## Blocchi

Il punto `·` segna le slide grafiche.

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase | 9.80 |
| s03 | c03 | frase | 9.02 |
| s04 | c04 | frase | 14.00 |
| s05 | c05 | elenco | 10.08 |
| s06 | c06 | frase | 12.72 |
| s07 | c07 | numero **·** | 9.17 |
| s08 | c08 | frase | 15.20 |
| s09 | c09 | frase | 14.55 |
| s10 | c10 | schede **·** | 7.33 |
| s11 | c11 | frase | 13.36 |
| s12 | c12 | frase | 7.22 |
| s13 | c13 | memo | 11.35 |
| s14 | c14 | frase | 7.83 |
| s15 | c15 | tabella **·** | 19.57 |
| s16 | — | b-roll sala d'attesa | 7.00 |
| s17 | c17 | frase | 4.95 |
| s18 | c18 | frase | 12.82 |
| s19 | c19 | frase | 7.99 |
| s20 | c20 | disegno **·** | 9.71 |
| s21 | c21 | citazione | 8.01 |
| s22 | c22 | frase | 12.99 |
| s23 | c23 | frase | 3.66 |
| s24 | c24 | frase | 12.95 |
| s25 | c25 | citazione | 8.72 |
| s26 | c26 | frase | 11.86 |
| s27 | c27 | frase | 12.12 |
| s28 | c28 | memo | 3.14 |
| s29 | c29 | frase | 6.98 |
| s30 | c30 | elenco | 13.31 |
| s31 | c31 | frase | 6.47 |
| s32 | c32 | frase | 12.75 |
| s33 | c33 | frase | 12.43 |
| s34 | c34 | frase | 6.22 |
| s35 | c35 | memo | 3.86 |
| s36 | c36 | frase | 5.55 |
| s37 | c37 | frase | 10.31 |
| s38 | c38 | elenco | 8.14 |
| s39 | c39 | frase | 3.42 |
## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e i
36 tagli con la trascrizione. Restano da giudicare il ritmo del movimento
sulla durata reale dei blocchi, e la giunzione fra s15 e s16, dove si saldano
le due generazioni della voce.
