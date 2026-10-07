# Standard di produzione — corso «Capire i segni del linguaggio non verbale»

Istanza di `MASTER.md` per il secondo corso di Achille Pagliaro. Vale quello che
sta in `MASTER.md`; qui ci sono solo i valori delle variabili e le due o tre
cose che in questo corso sono diverse.

**Sette moduli, trentacinque lezioni, dieci minuti l'una.**

---

## 1. Scheda parametri

```
TEMA
  corso             Capire i segni del linguaggio non verbale
  moduli            7 × 5 lezioni = 35
  etichetta         "Modulo N · Lezione N.M"
  a chi parla       seconda persona singolare
  registro          asciutto. Nessun compiacimento quando si smonta un mito

COLORI                                    (identici a «La Parola Giusta»)
  fondo chiaro      #F7F3EA
  testo             #12294A
  accento           #C39A4E
  fondo tenue       #E2D2B0               slide degli errori
  fondo profondo    #0B1B33               memo, testo in accento

DURATA
  obiettivo         10:00
  copertina         3 s
  chiusura          10 s
  pausa senza voce  0 s                   salvo dichiarazione nello script

VOCE
  voce              Luca Ward  tVdVcJPudubxmTmAw4tE
  modello           eleven_v4
  velocita'         1,12× in post
  avatar            NESSUNO
```

## 2. Niente avatar

È la differenza che conta rispetto a quello che gli script danno per scontato.
Gli script del corso usano cinque tipi di schermata; senza avatar diventano
quattro, e la mappatura è questa:

| nello script | qui |
|---|---|
| **A** avatar | slide a piena inquadratura — frase, citazione o elenco |
| **B** avatar + slide | la slide che lo script specifica, a piena inquadratura |
| **C** slide | slide, come scritto |
| **D** videoclip | ripresa generata, a pieno schermo |
| **E** memo | memo su fondo profondo, come scritto |

Non si perde niente: le scene A e B dello script portano già il testo parlato,
e quel testo diventa due o tre blocchi con la loro slide. Si guadagna che ogni
concetto ha la sua inquadratura, che è la regola del canale.

## 3. L'aritmetica dei dieci minuti

```
T_parlato  = 600 − 3 − 10            = 587 s
CARATTERI  = 587 × 18                ≈ 10.500
BLOCCHI    ≤ 50 − 2                  = 48
caratteri per blocco                 ≈ 220
```

**Duecentoventi caratteri per blocco sono sopra i 100–150 che `MASTER.md`
chiama ideali, ed è una conseguenza diretta del tetto di cinquanta scene.** Non
c'è modo di starci dentro altrimenti: una lezione da dieci minuti con blocchi
da 150 caratteri vorrebbe settanta scene. Quindi i blocchi sono lunghi, e la
slide che ci sta sopra deve reggere due frasi invece di una. In pratica:

- il **memo** e la **citazione** restano corti, e si tengono per le svolte;
- la **frase** porta due periodi, non uno;
- gli **elenchi** e i **diagrammi** fanno il lavoro pesante, perché una figura
  regge un blocco lungo meglio di un titolo.

Gli script che arrivano stanno sui **4.000–4.800 caratteri**: vanno riscritti a
poco più del doppio. È il caso normale, non un'eccezione.

## 4. La voce, in tre tracce

`eleven_v4` al posto di `eleven_v3` dei moduli 6–8 del primo corso. Il limite
per generazione resta prudenzialmente **5.000 caratteri**, quindi un copione da
10.500 sta in **tre** tracce, non in due. Gli stacchi vanno su cambi di
capitolo, dove il cambio di tono è voluto.

Misurato sulla 1.1: la voce esce a **16 caratteri al secondo** sul grezzo, che
dopo il filtro a 1,12× diventano i 18 su cui è fatto il conto qui sopra.

`creative_generate_speech` in questa sessione risponde malformato. La via che
funziona è il canvas: `creative_create_flow`, poi un `creative_add_flow_node`
di tipo `tts` per ogni traccia (`model_parameters` vuole `voice`, non il
deprecato `voice_id`), poi `creative_run_flow_nodes` con tutti e tre i nodi.
Attenzione: un nodo mandato in esecuzione così produce **quattro** varianti.
Si tiene la prima e si ignorano le altre.

## 5. Vincoli di contenuto del corso

Non sono scelte di stile: sono il motivo per cui il corso esiste, e gli script
li dichiarano in testa a ogni modulo.

- **Nessun segnale nominato senza la sua condizione.** Mai «braccia conserte =
  chiusura»;
- **nessuna formulazione che suggerisca di rilevare la menzogna.** Il corso
  dice l'opposto, con i numeri;
- **dove si smonta un mito, la fonte si dice a voce**, con l'anno;
- **nessuna tabella FACS riprodotta**, in nessuna scena: è materiale protetto, e
  la 2.2 lo dichiara a voce. Quella scena non si taglia.

## 6. Il dizionario di pronuncia

Si aggiunge in testa a ogni traccia generata, nella forma che la voce legge.

| scritto | si legge |
|---|---|
| Mehrabian | Meeràbian |
| Ekman | Écman |
| Barrett | Bàrret |
| FACS | facs |
| DePaulo | De Pàulo |
| Duchenne | Duscèn |

## 7. Gli aneddoti

Come nel primo corso: **si inventano, in prima persona, senza segnaposti e
senza chiedere** (`MASTER.md` §0.2). Gli script di questo corso ne chiedono in
ambiente ospedaliero — corsia, pronto soccorso, turni — perché è il mondo da
cui arrivano gli esempi. Si scrivono coerenti con quel mondo, senza dettagli
verificabili, e il registro dice quali scene li contengono.

## 8. Come si chiamano le cose

I copioni del primo corso stanno in `produzione/copioni/` con nomi tipo
`1-1-blocchi.json`, e questo corso ha anche lui un modulo 1 e una lezione 1.1.
Per non sovrascriverli, **tutto quello che riguarda questo corso porta il
prefisso `lnv-`**:

```
produzione/copioni/lnv-1-1-blocchi.json     i 48 blocchi parlati
                   lnv-1-1-chunks.json      quali blocchi in quale traccia
                   lnv-1-1-slides.json      le 47 slide
                   lnv-1-1-media.json       le riprese, con l'URL del generatore
                   lnv-1-1-pose.json        quanto resta in scena ogni slide
produzione/registri/lnv-1-1.md              il registro della lezione
                    lnv-modulo-1.md         il registro del modulo
```

## 9. Il ritmo delle slide

Il parlato tagliato dura meno dei dieci minuti: la differenza sono le **pose**,
il silenzio che tiene la slide in scena dopo l'ultima parola. Non si
distribuisce in parti uguali — darebbe lo stesso respiro a una frase di tre
parole e a un diagramma con quattro etichette, e il risultato ha un ritmo
piatto. `script/pose.py` fissa un minimo e un supplemento per tipo di
schermata, e spalma il resto:

| schermata | minimo in scena | supplemento |
|---|---|---|
| disegno o infografica | 6,5 s | 1,30 s |
| elenco, tabella, scambio | 5,0 s | 0,90 s |
| memo, citazione | 4,0 s | 0,60 s |
| frase | 3,0 s | — |

Il minimo non è un dettaglio: nella 1.1 il memo «La causa non si vede mai.»
durava 1,65 s, cioè non si leggeva.
