# Registro — 8.5 «La conversazione che ti aspetta domani»

Ultima lezione del corso. È l'unica con una scena senza voce dentro il corpo
della lezione e l'unica con la chiusura lunga, e per queste due cose il
montaggio non passa da `scene.py` ma da uno script suo.

| campo | valore |
|---|---|
| video_id | `c6e806151964867a1dce7ab09b1ccaef` |
| scene | 50 — copertina, 47 blocchi parlati, la scena muta, chiusura |
| formato | 16:9, 1080p |
| durata | 389,0 s (6:29) |
| parlato | 342,1 s |

## Il conto delle scene

HeyGen ne accetta **cinquanta**, non una di più, e qui ne servivano
cinquantuno con lo schema solito. Quindi i blocchi parlati sono quarantasette
invece di quarantotto, e il posto liberato è `s22`: venticinque secondi di due
sedie a un tavolo e musica sola, senza slide e senza voce. È il quarto e
ultimo silenzio lungo del corso, e chiude il cerchio con la 2.3.

Per la stessa ragione `s22` non sta in `chunks.json`: non viene tagliato dalla
voce, perché una voce non ce l'ha.

## Il copione è stato riscritto

Da **3.270** caratteri dichiarati dallo script a **3.287**. È l'unica lezione
del corso in cui il copione non si è allungato, ed è voluto: la nota di
montaggio dice «nessuna enfasi finale», e allungare qui avrebbe voluto dire
aggiungere retorica. Il lavoro è stato di distribuzione, non di scrittura.

- le **otto righe** dello script stavano su una slide sola, tenuta a schermo
  in silenzio. Qui sono otto blocchi, una citazione per modulo, ognuna con il
  suo respiro. È la spina dorsale visiva della lezione;
- la scena 9 dello script superava i seicento caratteri e la nota diceva di
  spezzarla: è diventata `s45`–`s48`;
- sono stati aggiunti solo due appoggi: «Mai, da sola» dopo la separazione fra
  capire e cambiare, e «Ne hai già pensata una mentre lo dicevo. È quella.»
  dopo l'elenco delle tre conversazioni.

## Nessun aneddoto

## Le grafiche

| slide | tipo | cosa mostra |
|---|---|---|
| c04 | citazione | Nulla. |
| c05 | bivio | Sono due cose separate, e la prima non produce la seconda. |
| c06 | memo | Mai, da sola. |
| c08 | anello | L'abitudine arriva prima della consapevolezza. |
| c10 | memo | Trasformare quaranta lezioni in una conversazione. |
| c12 | citazione | Se il come contraddice il cosa , vince il come . |
| c13 | citazione | Chi prepara la risposta non sta ascoltando. |
| c14 | citazione | Non «hai ragione»: «ha senso». |
| c15 | citazione | Una cosa sola — e una richiesta. |
| c16 | citazione | Chi persuade passa dal giudizio. Chi manipola lo aggira. |
| c17 | citazione | Fatto, effetto, richiesta. |
| c18 | citazione | Un sì scelto, non un sì scappato. |
| c19 | citazione | Il picco è prima, non durante. |
| c21 | memo | Se fra un anno te ne ricordi tre, il corso ha funzionato. |
| c24 | memo | Scegli una conversazione che ti aspetta. |
| c25 | sostituzioni | e non è la stessa cosa |
| c26 | elenco | cosa la rende precisa |
| c32 | citazione | «Cosa voglio che accada?» |
| c34 | citazione | «Cosa chiedo, esattamente?» |
| c36 | citazione | «Qual è il fatto da cui parto?» |
| c38 | flusso | tre domande, in quest'ordine |
| c41 | memo | Quaranta lezioni valgono zero finché non c'è una persona vera dall'altra parte. |
| c44 | memo | La prima volta serve a scoprire che si può fare. Non a farlo bene. |
| c47 | elenco | cinque cose che hanno una cosa sola in comune |
| c48 | memo | Tolgono te dal centro. È la condizione perché l'altro abbia spazio. |

## I diagrammi

Sono **tre**, contro i quattordici della 8.1, e la differenza è voluta. Questa
lezione non spiega un meccanismo: lo richiama. Le dodici **citazioni** — otto
righe, una per modulo, più le tre domande e il «nulla» — sono il trattamento,
e mettere un diagramma accanto a ciascuna le avrebbe spente.

`c08` è l'**anello** con `ciclo: 6`, ed è l'unica clip ciclica: conosci la
riga, arriva il momento, fai come prima, conosci la riga. Il giro non si
chiude mai, ed è esattamente quello che dice la voce sopra — l'abitudine
arriva prima della consapevolezza.

`c05` è il **bivio** fra capire e cambiare, con acceso il ramo di cambiare:
uno succede leggendo, l'altro succede solo facendo. `c38` è il **flusso**
delle tre domande, in quest'ordine.

La chiusura, `c99`, non è quella delle altre lezioni: porta il logo esteso più
grande, il titolo del corso, «8 moduli · 40 lezioni» e il sito.

## Le due riprese, più quella muta

| blocco | tipo | cosa |
|---|---|---|
| s22 | video | due sedie a un tavolo, una di fronte all'altra, luce di mattina |
| s30 | foto | un taccuino aperto quasi bianco su un tavolo di legno chiaro |
| s39 | foto | un foglio avorio con poche righe a mano e l'ultima cerchiata |

Le due sedie sono la scena muta. La prima versione tornata dal generatore era
fredda e istituzionale — più una stanza per interrogatori che due persone che
stanno per parlarsi — e per venticinque secondi di chiusura del corso era la
nota sbagliata. È stata rigenerata più calda; la versione fredda resta in
`riprese.json` come `due-sedie-tavolo-v1-fredda`.

Il taccuino bianco sta su «ne hai già pensata una». Il foglio con la data
cerchiata sta su «e poi la fai, con una data», che è la frase su cui il corso
finisce.

## La musica

Due tracce, generate con `eleven_music_v2` come per la 2.3 — Artlist ha un
minimo di sessanta secondi e qui ne servivano venticinque e venti.

| traccia | durata | dove |
|---|---|---|
| `muto25` | 25,0 s | la scena muta `s22` |
| `chiusura20` | 20,0 s | la chiusura del corso |

Sono una nota di piano in feltro che decade su un pad di archi, senza
percussioni e senza basso; la seconda risolve su due note e sfuma lungo.
Entrambe **verificate strumentali**: la trascrizione torna vuota.

HeyGen le ha respinte al primo giro — «stored file type not supported:
application/octet-stream» — perché uscivano da ElevenLabs a 192 kbps, 48 kHz,
stereo, mentre tutto il resto dell'audio del corso è 128 kbps, 44,1 kHz, mono.
Riportate a quel profilo sono passate. **Vale per qualunque audio che non
venga da `tagli.py`**: va riallineato al profilo dei blocchi prima di
caricarlo.

## I tagli

Quarantacinque confini (i blocchi parlati sono quarantasette, e `s22` non ne
ha). La trascrizione della prova ne segnala **uno** non appaiato, e due
confini — `s24` e `s27` — sono rimasti senza coda, cioè `scribe` non ha
restituito niente per loro: `correggi` in quel caso li lascia dove sono, che è
la cosa giusta.

**Cinque blocchi fuori banda** sul grezzo, e sono tutti voluti:

| blocco | durata | car./s | cos'è |
|---|---|---|---|
| s04 | 2,00 s | 6,0 | «E poi nulla.» |
| s14 | 3,53 s | 7,4 | «Non "hai ragione": "ha senso".» |
| s17 | 3,96 s | 6,6 | «Fatto, effetto, richiesta.» |
| s24 | 1,80 s | 22,3 | «Scegli una conversazione che ti aspetta.» |
| s27 | 5,47 s | 5,9 | «Quella che rimandi da settimane.» |

Quattro sono lenti perché sono le righe che devono restare: tre delle otto
righe una per modulo, e il «nulla» su cui si apre la lezione. È la lezione più
lenta del corso e la nota di montaggio lo chiede.

`s24` è l'unico veloce, ed è uno dei due senza coda, quindi l'ho guardato a
mano sulla mappa dei silenzi: il confine cade dentro una pausa vera di 0,84 s
(da 6,00 a 6,84), quindi il taglio è pulito; il silenzio successivo, a 8,54 s,
entrerebbe dentro la frase dopo. Il blocco è semplicemente detto in fretta, e
va bene così: è l'imperativo che apre la parte operativa.
## Quarantadue pose

Base **6,77 s** per le frasi, **7,37 s** per citazioni e memo, **7,67 s** per
gli elenchi, **8,07 s** per i tre diagrammi. Le citazioni sono dodici e
pesano: è la lezione con più blocchi al secondo scaglione di tutto il modulo.

## Da verificare

Non sento l'audio e non vedo il montato: ho controllato le slide da ferme e i
quarantacinque tagli con la trascrizione. Le **tre riprese** le ho viste. Le
due tracce di musica le ho misurate e verificate strumentali, ma non le ho
sentite: restano da giudicare il volume e il punto in cui la chiusura sfuma.

## Blocchi

`·` slide grafica · `▪` ripresa Artlist

| blocco | slide | tipo | durata (s) |
|---|---|---|---|
| s02 | c02 | frase (posa) | 6.77 |
| s03 | c03 | frase (posa) | 6.77 |
| s04 | c04 | citazione (posa) | 7.37 |
| s05 | c05 | bivio **·** (posa) | 8.07 |
| s06 | c06 | memo (posa) | 7.37 |
| s07 | c07 | frase (posa) | 6.77 |
| s08 | c08 | anello **·** (posa) | 8.07 |
| s09 | c09 | frase (posa) | 6.77 |
| s10 | c10 | memo (posa) | 7.37 |
| s11 | c11 | frase (posa) | 6.77 |
| s12 | c12 | citazione (posa) | 7.37 |
| s13 | c13 | citazione (posa) | 7.37 |
| s14 | c14 | citazione (posa) | 7.37 |
| s15 | c15 | citazione (posa) | 7.37 |
| s16 | c16 | citazione (posa) | 7.37 |
| s17 | c17 | citazione (posa) | 7.37 |
| s18 | c18 | citazione (posa) | 7.37 |
| s19 | c19 | citazione (posa) | 7.37 |
| s20 | c20 | frase (posa) | 6.77 |
| s21 | c21 | memo (posa) | 7.37 |
| s22 | — | video — due sedie a un tavolo **▪** — musica sola, senza voce | 25.00 |
| s23 | c23 | frase (posa) | 6.77 |
| s24 | c24 | memo (posa) | 7.37 |
| s25 | c25 | sostituzioni **·** (posa) | 7.67 |
| s26 | c26 | elenco **·** (posa) | 7.67 |
| s27 | c27 | frase (posa) | 6.77 |
| s28 | c28 | frase (posa) | 6.77 |
| s29 | c29 | frase (posa) | 6.77 |
| s30 | — | foto — taccuino aperto **▪** | 2.79 |
| s31 | c31 | frase (posa) | 6.77 |
| s32 | c32 | citazione (posa) | 7.37 |
| s33 | c33 | frase (posa) | 6.77 |
| s34 | c34 | citazione (posa) | 7.37 |
| s35 | c35 | frase (posa) | 6.77 |
| s36 | c36 | citazione (posa) | 7.37 |
| s37 | c37 | frase (posa) | 6.77 |
| s38 | c38 | flusso **·** (posa) | 8.07 |
| s39 | — | foto — foglio con data **▪** | 2.02 |
| s40 | c40 | frase (posa) | 6.77 |
| s41 | c41 | memo (posa) | 7.37 |
| s42 | c42 | frase (posa) | 6.77 |
| s43 | c43 | frase (posa) | 6.77 |
| s44 | c44 | memo (posa) | 7.37 |
| s45 | c45 | frase (posa) | 6.77 |
| s46 | c46 | frase (posa) | 6.77 |
| s47 | c47 | elenco **·** | 8.79 |
| s48 | c48 | memo | 14.57 |
| s49 | c49 | frase | 13.12 |
