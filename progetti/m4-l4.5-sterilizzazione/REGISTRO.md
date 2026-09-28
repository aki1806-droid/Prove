# Registro — Modulo 4 · micro-lezione 4.5 «Decontaminazione, disinfezione e sterilizzazione»

La lezione della tabella chiave. Lo script chiede che Spaulding «vada tenuta a
schermo più a lungo»: sono tre **colonne** che si accendono una per volta
(s11–s13), quattro blocchi di voce sulla stessa tabella. I livelli di
disinfezione salgono una **scala** a tre gradini (s16–s18), il ciclo di
riprocessazione è un **ciclo** a otto passi che si riempie in tre scene
(s22–s24). Illustrazioni nuove: la vasca di decontaminazione con le forbici
immerse (`vasca`), l'autoclave con lo sportello tondo e il vapore
(`autoclave`), il pacco sterile con il nastro a strisce (`pacco`), la
provetta dell'indicatore biologico (`provetta`, disegnata e non usata: il
posto era della fila dei tre indicatori).

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti |
| durata ottenuta | voce non ancora generata (quota ElevenLabs esaurita il 28-09) |
| slide dello script | 18 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde (s09, s35) |

```
CARATTERI  8.857          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:56.4
stacco tracce             dopo s26   (chunk A 4.461 car · chunk B 4.396 car)
```

Lo script è il più denso del modulo (1.560 parole): il primo giro dava
cinquantuno blocchi. Tre sono stati assorbiti nei vicini («chi fa che cosa»
è passato nella chiusura, la norma sul rischio biologico nel blocco della
decontaminazione, il parametro dei livelli in quello del basso livello).

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; la prossima (4.6) |
| s11–s13 | **colonne** | Spaulding: critici, semicritici, non critici, una colonna per volta |
| s16–s18 | **scala** | basso, intermedio, alto livello, dall'alto in giù come la voce |
| s22–s24 | **ciclo** | gli otto passi della riprocessazione, a 1, 5 e 8 accesi |
| s30–s31, s33 | tre (cifre) | fisici, chimici, biologici |
| s25, s27, s34 | figura | vasca, autoclave, pacco |
| s19, s28 | cifre | 2 % e 70 %; 121 e 134 °C |
| s15 | raggiera | «dove arriva?»: sterile, mucosa, cute |
| s40 | catena | lotto, ciclo, autoclave, operatore, paziente |
| s09, s35 | titolo sul verde | «prima si pulisce»; «il nastro non dice: sterile» |
| il resto | griglia, confronto, trappola, sostituzione, icone, frase, tre | — |

## Correzioni fatte guardando le card

- **Il ciclo a otto passi metteva le etichette laterali sopra i nodi**: il
  foglio di stile forzava `text-anchor:middle` sulle etichette, e l'ancora
  calcolata (inizio a destra, fine a sinistra) veniva ignorata. Con cinque
  passi e nomi corti non si vedeva. Ora l'ancora è in linea; e sopra i sei
  passi il cerchio si stringe (raggio 196, riquadro 680) così l'etichetta in
  alto non sale sul sopratitolo.
- **La raggiera «dove arriva?» non teneva «Tessuto sterile» nel cerchio**:
  etichette di una parola, la spiegazione fuori.
- **La copertina sforava di 15 px**: il titolo va su tre righe, e la riga del
  modulo è passata a «Prevenzione e controllo delle ICA».

---

## La resa

Da fare quando il credito ElevenLabs torna: voce A/B, allineamento, verifica
per trascrizione, montaggio, caricamento e resa HeyGen.

## Da verificare

- La scala dei livelli si accende dall'alto (s16 solo il gradino alto, s17
  alto e intermedio, s18 tutti) perché la voce parte dall'alto livello.
