# Registro — Modulo 2 · micro-lezione 2.2 «Modelli teorici e tassonomie infermieristiche»

Seconda lezione del modulo. Il difetto della lavorazione non era nei confini
ma nel **ritmo**: la stessa voce, con lo stesso modello e le stesse
impostazioni, ha letto questa lezione il 7% piu' veloce della 2.1.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 8 minuti e 30 |
| durata ottenuta | **8:58.2** |
| slide dello script | 17 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,47 |
| costo trascrizioni | $0,54 |
| pause senza voce | nessuna; cinque pose brevi dentro il parlato |

```
CARATTERI  8.796          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:56.4
reale                     8:58.2      (parlato 524,8 s, 16,8 car/s)
```

Due secondi di scarto sulla stima: e' il risultato del ritmo calcolato invece
che assunto, ed e' il piu' preciso delle dieci lezioni fatte.

---

## Il ritmo non e' una costante

`tagli.py` applicava a ogni lezione lo stesso filtro: togli i silenzi, poi
`atempo=1.12`. Quel numero non e' un parametro di qualita': e' la correzione
che serviva alla voce del modulo 1, che leggeva a un ritmo suo.

Su questa lezione, con 1,12, l'allineamento riportava **11 blocchi fuori
fascia** su 48 — tutti sul lato veloce, fino a 23,4 car/s. La prima lettura
era che i confini fossero sbagliati. Non lo erano: la traccia grezza durava
600 s per 8.796 caratteri, contro i 666 s per 9.127 della 2.1. Stessa voce,
il 7% piu' veloce.

Con 1,12 il montato sarebbe finito a **7:57**, sotto gli otto minuti chiesti,
e con sei blocchi troppo rapidi per essere seguiti.

Ora l'atempo si calcola:

1. si misura quanto tolgono **davvero** i silenzi su questa traccia —
   una passata di ffmpeg, e il fattore e' passato da **1,152** (2.1) a
   **1,090** (2.2): stimarlo sbagliava di mezzo minuto sul montato;
2. si sceglie l'atempo che porta il parlato finito a **17,0 car/s**,
   limitato fra 1,00 e 1,25.

Qui e' uscito **1,050**, e il parlato e' finito a 16,8 car/s: 0 blocchi fuori
fascia, nessuna coppia di confini sospetta.

---

## Lo stacco fra le tracce

La vecchia regola — il primo confine di capitolo dopo la meta' — qui dava un
chunk A da **5.072 caratteri**, oltre il limite di 5.000 del servizio voce.
Ora si sceglie, fra i confini che tengono **entrambi** i chunk sotto il
limite, quello che divide piu' equamente: s24, 4.363 e 4.433.

E `costruisci.py` controlla che `tagli.py` abbia lo stesso `STACCO`. Se
divergono i blocchi finiscono sulla traccia sbagliata, e non se ne accorge
nessuno finche' non si guarda il video.

---

## Tre slide rifatte dopo aver guardato i provini

Nessuna sforava la cornice: tutte e tre dicevano una cosa falsa.

- **s31** era un grafico a barre con «richieste 100, capacita' 62». Numeri
  inventati: il deficit di autocura di Orem non e' una quantita'. Diventato
  tre riquadri — richieste, capacita', scarto — senza cifre finte.
- **s41** era una matrice 2x2 con dentro un elenco di **tre** sigle, e la
  terza (NIC) non ci stava: mancava dalla slide. Diventata tre icone, una per
  sigla, con la domanda a cui ciascuna risponde.
- **s45** era un albero con «classi», «diagnosi» e «collegamento NNN» come
  tre rami paralleli. Ma domini, classi e diagnosi sono **annidati**, non
  alternativi: l'albero diceva il contrario di quello che sono. Diventata una
  piramide a tre strati.

Tutte e tre sono errori che nessun controllo automatico poteva trovare: la
geometria era a posto, il senso no. Si vedono solo guardando le slide.

---

## La resa

| | |
|---|---|
| resa pubblicata | `ca2a4b51cdbfdae24d8dc9a5323f9f25` — **8:56.8** |
| lotto asset | `bc20c7210b644c118f5fa3b4b820ffb0` (98 file) |

---

## Da verificare

- Il fattore dei silenzi varia fra le lezioni (1,152 e 1,090 finora): con
  qualche misura in piu' si potra' dire se dipende dalla densita' di
  punteggiatura del copione o dalla variabilita' della voce.
- La `griglia` con `attive` parziale si accende per colonne (1,3,5 a
  sinistra e 2,4 a destra): la rivelazione progressiva sembra sparsa invece
  che sequenziale. Sulle undici aree di Gordon si nota.
- Il tipo `icone` con una voce sola (s16, Nightingale) diventa un riquadro
  largo quanto la slide: funziona, ma e' sbilanciato.
