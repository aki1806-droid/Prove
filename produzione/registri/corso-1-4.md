# Registro — 1.4 «Il paraverbale: tono, ritmo, pause»

**Rifatta col trattamento del modulo 2 e 3.** Senza avatar, voce Luca Ward,
slide animate, nove grafiche e tre riprese Higgsfield.

| campo | valore |
|---|---|
| video_id | `5e100fd011505e70f0eb3c4c093a2ec5` |
| scene | 50 — copertina, 48 blocchi, chiusura |
| formato | 16:9, 1080p, sottotitoli SRT |
| durata | 350,5 s (5:50) |
| parlato | 338,6 s |

## Il copione è stato riscritto

Da **2.660** caratteri a **5.670**. Lo script aveva le quattro leve e le tre
correzioni; mancava il motivo per cui funzionano, e mancava la pausa raccontata
come segnale invece che come consiglio.

- **perché il come vince sul cosa**: il tono è più difficile da controllare
  delle parole, e proprio per questo chi ascolta lo prende per più sincero.
  Non è un ragionamento, è un riflesso;
- **le quattro leve una alla volta** — volume, altezza, velocità, pause — con
  una slide accesa per ciascuna invece dell'elenco unico;
- **la velocità come spia**: in difficoltà si accelera per uscirne prima, e
  accelerando si comunica esattamente la difficoltà che si voleva nascondere.
  Chi ascolta non pensa «sta accelerando»: sente che qualcosa non va;
- **la pausa come segnale, non come vuoto**: prima di una frase, dopo una
  frase, e al posto di una risposta immediata — tre cose diverse, tre schede;
- **perché nessuno le usa**: si sentono lunghissime da dentro e brevissime da
  fuori. È l'unico punto della lezione che meritava un grafico;
- **le tre correzioni con il loro perché**: il volume non aggiunge
  informazione ma pressione, il silenzio dell'altro non è un problema da
  risolvere, e accelerare è il più difficile dei tre perché parte prima che
  te ne accorga.

## L'aneddoto

Inventato, in prima persona, come da metodo. Un'intervista radiofonica di
venti minuti su un libro, domande concordate in anticipo; il conduttore ne fa
una fuori lista — «e a lei, questa cosa, funziona sempre?» — e io resto zitto
quattro secondi, non per strategia ma perché stavo pensando. In cuffia sembra
un'eternità. A diretta finita il conduttore dice che il momento migliore è
stato quello: l'unico punto in cui si sentiva che stavo pensando davvero.

Serve la lezione perché è la sola prova possibile della tesi: la pausa non si
può spiegare, si può solo far sentire.

## Le grafiche

| slide | tipo | cosa mostra |
|---|---|---|
| c09 | elenco | le quattro leve |
| c10 c11 c12 c13 | elenco | le quattro leve, accese una alla volta |
| c26 | numero | i quattro secondi di silenzio in diretta |
| c29 | schede | cosa dice una pausa: prima, dopo, al posto di |
| c37 | grafico | quanto dura una pausa per te e per l'altro |
| c38 | schede | i tre istinti da correggere |

Cinque icone nuove: `pausaprima`, `pausadopo`, `pausainvece`, `riempire`,
`accelera`. Le prime tre sono state **ridisegnate dopo aver guardato il PNG**:
alla prima stesura erano tre linee con un buchino in mezzo e a 104 pixel si
somigliavano tutte. Adesso il segno d'oro è la pausa e il segno blu è il
parlato, in tre disposizioni diverse. Anche `riempire` è stata rifatta: la
prima versione sembrava una pagina di testo, adesso è un bicchiere che si
riempie.

## Le tre riprese

| blocco | tipo | cosa |
|---|---|---|
| s16 | foto | una sala riunioni vuota vista dalla porta, le sedie storte |
| s23 | foto | un microfono radiofonico, le cuffie sul tavolo, la spia rossa |
| s33 | foto | un orologio da parete su un muro spoglio, luce del mattino |

## I tagli — e un confine che la trascrizione non poteva vedere

Quarantasei confini: **due** fuori posto al primo giro (`s34` e `s45`, tutti e
due in ritardo di una frase corta), **zero** al secondo.

Poi le durate hanno mostrato un guasto che la trascrizione dichiarava a posto:
`s23` a 29 caratteri al secondo e `s24` a 32, con `s22` lungo il doppio del
dovuto. Il motivo è che lo scriba aveva prodotto **un pezzo in più**
(«funziona sempre?», che è una frase interna a `s24`) e **uno in meno** (la
coda di `s22`): i conti tornavano — 46 pezzi, 46 confini — ma tre finestre
erano sfalsate di uno. `verifica.py` riappaia per contenuto, e quindi non se ne
accorge.

Ricostruito così: il confine a 50,6 s è la fine di `s23`, quello a 56,0 non è
una fine di blocco, e la fine di `s22` andava cercata prima. Stimata a 42,90 s
sui caratteri, trovata una pausa di 0,49 s a **42,87** e confermata con una
**controprova** di 3,1 s (18 crediti): «in anticipo, tutte facili, tutte
preparate», cioè esattamente la coda di `s22`.

La regola che ne esce, e che completa quella della 1.3: **contare i pezzi non
basta se lo scriba ne salta uno e ne aggiunge un altro**. L'unico controllo
che li vede è il rapporto caratteri/secondo blocco per blocco.

## Undici pose

`s02` (l'esperimento «sto benissimo», 6,5 s), `s13` (le pause fra le quattro
leve, 6 s), `s20` («rallenta», 6 s), `s25` e `s26` (il silenzio in diretta e i
quattro secondi, 8 s ciascuna — sono la lezione stessa), `s29` (le tre pause,
7 s), `s32` («dice quello che nessuna parola dice», 7 s), `s35` (il memo «ho
fretta di finire», 6,5 s), `s37` (il grafico, 7 s), `s45` (il memo «la pausa
non è un vuoto», 8 s) e `s49` (la chiusura, 4,5 s).

Le pose qui sono più lunghe che altrove, ed è voluto: è la lezione sulla pausa,
e un montaggio senza pause contraddirebbe il contenuto. La nota dello script
vecchio chiedeva di rallentare la voce a 0,92×; quella strada resta chiusa — la
velocità è fissa a **1,12×** per tutto il corso, come da `STANDARD.md` — e lo
stesso effetto si ottiene con le pose, che allungano i silenzi senza toccare il
parlato.

## Blocchi

`·` slide grafica · `▪` ripresa Higgsfield

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | citazione (posa) | 6.70 |
| s03 | c03 | frase | 6.40 |
| s04 | c04 | frase | 7.58 |
| s05 | c05 | frase | 5.57 |
| s06 | c06 | frase | 6.38 |
| s07 | c07 | frase | 7.12 |
| s08 | c08 | frase | 11.20 |
| s09 | c09 | elenco **·** | 6.88 |
| s10 | c10 | elenco **·** | 7.12 |
| s11 | c11 | elenco **·** | 6.39 |
| s12 | c12 | elenco **·** | 6.01 |
| s13 | c13 | elenco **·** (posa) | 8.88 |
| s14 | c14 | frase | 4.69 |
| s15 | c15 | frase | 7.10 |
| s16 | — | foto — una sala riunioni vuota vista dalla porta, le sedie storte, un bicchiere a meta' **▪** | 8.52 |
| s17 | c17 | frase | 6.08 |
| s18 | c18 | frase | 5.80 |
| s19 | c19 | frase | 6.16 |
| s20 | c20 | frase (posa) | 9.06 |
| s21 | c21 | frase | 4.96 |
| s22 | c22 | frase | 6.69 |
| s23 | — | foto — un microfono radiofonico su braccio snodato, le cuffie sul tavolo, la spia rossa accesa **▪** | 5.69 |
| s24 | c24 | citazione | 7.11 |
| s25 | c25 | frase (posa) | 8.00 |
| s26 | c26 | numero **·** (posa) | 8.00 |
| s27 | c27 | frase | 6.26 |
| s28 | c28 | frase | 9.05 |
| s29 | c29 | schede **·** (posa) | 7.00 |
| s30 | c30 | frase | 8.31 |
| s31 | c31 | frase | 6.72 |
| s32 | c32 | frase (posa) | 7.00 |
| s33 | — | foto — un orologio da parete su un muro spoglio, la luce del mattino di taglio **▪** | 6.15 |
| s34 | c34 | frase | 7.55 |
| s35 | c35 | memo (posa) | 6.50 |
| s36 | c36 | frase | 8.11 |
| s37 | c37 | grafico **·** (posa) | 7.50 |
| s38 | c38 | schede **·** | 6.38 |
| s39 | c39 | frase | 9.37 |
| s40 | c40 | frase | 6.60 |
| s41 | c41 | frase | 5.85 |
| s42 | c42 | frase | 7.10 |
| s43 | c43 | frase | 6.46 |
| s44 | c44 | frase | 5.30 |
| s45 | c45 | memo (posa) | 8.00 |
| s46 | c46 | frase | 8.99 |
| s47 | c47 | frase | 5.39 |
| s48 | c48 | frase | 8.48 |
| s49 | c49 | frase (posa) | 6.44 |

## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e i
46 tagli con la trascrizione più la controprova su `s22`. Restano da giudicare
le **tre riprese Higgsfield**, che non posso aprire da qui.

---

## Versione precedente (avatar)

- `942bf8bc098f9d91f7ad18bb5af499b4` — 40 blocchi, 6:10, look
  `89cf01e0c22547169c460186be0c67a8`, voce «Achille nuovo 1».

Sostituita da questa: il trattamento senza avatar è quello approvato dal
modulo 2 in poi.
