# Registro — Modulo 4 · micro-lezione 4.3 «Precauzioni aggiuntive e isolamento»

La lezione della tabella a tre colonne, e di due figure che lo script ha
chiesto per nome: «la tabella da fotografare» e «le frecce dell'aria che
entrano ed escono». Sono nati due corpi. Le **colonne**: da due a tre
colonne con l'intestazione e le voci che scendono una per volta, la colonna
in accento per la via aerea. La **pressione**: una o due stanze viste
dall'alto, con il muro, la porta, il letto, la bocchetta sul soffitto e le
frecce dell'aria che scorrono in continuo, dentro per la negativa e fuori
per la positiva. Sei illustrazioni nuove: la mascherina chirurgica, il
respiratore, il camice, il cartello sulla porta, il fiore sbarrato, il
fonendoscopio.

> **Stato: slide pronte, voce ferma.** Copione chiuso (48 blocchi, 8.670
> caratteri, stacco dopo s24), card renderizzate e riviste. Le due tracce
> aspettano il credito ElevenLabs.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti |
| durata ottenuta | vedi «La resa» |
| slide dello script | 18 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,45 (A $0,69 · B $0,75) |
| costo trascrizioni | $0,58 |
| costo voce | da generare |
| pause senza voce | nessuna; quattro pose brevi sulle slide sul verde (s09, s19, s30, s38) |

```
CARATTERI  8.670          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:47.8
```

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 23 | 25 |
| blocchi fuori fascia | 0 | 0 |
| tagli nel parlato | nessuno | nessuno |

### La verifica per trascrizione

Le trascrizioni partono dagli mp3 caricati come asset. La traccia A conferma
**624/627 parole**, la B **686/686**, nessun buco. Le rese diverse
(non buchi): s04 «alle» sentito «le»; s12 «pertosse» sentito «per tosse»; s23 «all» sentito «l».

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; la prossima (4.4) |
| s25–s26, s48 | **colonne** | la tabella delle malattie, a gruppi; il «come» in chiusura |
| s17, s27–s29 | **pressione** | la stanza negativa da sola; le due stanze, a gruppi |
| s07–s08, s14, s20 | gesti | il «come» del contatto; coorte e trasferimenti; operatore e paziente |
| s10, s13, s18, s23, s33, s39, s41, s47 | figura | rubinetto, mascherina, respiratore, scudo, fiore, cartello, persona, telefono |
| s37 | bivio | il sospetto clinico: contatto o via aerea, subito |
| s42 | raggiera | il costo umano dell'isolamento |
| il resto | griglia, confronto, catena, trappola, tre, sostituzione, frase, titolo, icone | — |

## Correzioni fatte guardando le card

- **La stanza singola sforava di 443 px**: con una stanza sola il `viewBox`
  era largo 900 e il rapporto lo faceva alto il doppio. Il `viewBox` resta
  1656 e la stanza si centra.
- **La tabella era piccola**: intestazioni a 42 px e voci a 35, con più
  aria nelle colonne.

---

## La resa

| | |
|---|---|
| resa pubblicata | `6e62854a021ec5bce27e4fbe2b664c16` — 527.977 s (8:48.0), 1080p 16:9, resa in 79 s, con SRT (`subtitle_url`) |
| lotto asset | `46c707e9c5c54dd48b9d4700e835c045` — 98 file, 19 MB, tutti completati |

---

## Da verificare

- Le frecce dell'aria scorrono in continuo (animazione infinita): nel PNG
  fermo si vedono a metà corsa, nel clip da 3,2 s scorrono tre volte. È
  l'unica animazione della libreria che non si ferma entro 2,8 s, ed è
  voluta: il flusso d'aria non ha una fine.
- Nella stanza a pressione positiva la bocchetta immette aria dal soffitto e
  la porta lascia uscire: è lo schema didattico, non un impianto reale.
