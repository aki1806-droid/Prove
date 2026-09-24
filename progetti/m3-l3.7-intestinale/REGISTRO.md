# Registro — Modulo 3 · micro-lezione 3.7 «Eliminazione intestinale, dolore e sonno»

Tre bisogni in una lezione, e tre modi diversi di mostrarli. La **fascia**
diventa la scala di Bristol a segmenti uguali; la **scala** dell'OMS sale in
tre gradini; la **mappa** del colon porta i tre richiami del fecaloma. Due
illustrazioni nuove: la **pompa PCA** con il pulsante nella mano del
paziente, e la **luna** sopra il letto per il sonno.

Le due tracce sono state generate un'ora dopo il blocco della quota
ElevenLabs, nello stesso giro di 3.6 e 3.8.

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
| costo voce | $1,51 (A $0,77 · B $0,74) |
| costo trascrizioni | $0,63 |
| pause senza voce | nessuna; tre pose brevi sulle slide sul verde (s10, s23, s37) |

```
CARATTERI  9.041          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:08.4
tracce grezze             A 333,8 s  ·  B 358,9 s   (stacco dopo s26)
silenzi                   fattore 1,162   ->   atempo 1,121
```

La voce ha lasciato pause lunghe (fattore 1,16, il più alto del modulo): il
taglio delle pause le riporta a un ritmo di 17,0 car/s senza toccare il
parlato.

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 25 | 23 |
| blocchi fuori fascia | 0 | 0 |
| tagli nel parlato | nessuno | nessuno |

La trascrizione conferma: **711/714 e 675/679 parole**, nessun buco; le rese
diverse sono «colorettale» / «colo rettale» e «trafittivo» / «tra fittivo».

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; la prossima (3.8) |
| s02 | icone | colon, mani, luna: i tre bisogni |
| s05 | **fascia a segmenti uguali** | Bristol: stipsi 1–2, normale 3–4, diarrea 5–7 |
| s14 | mappa | il colon: massa nel retto, diarrea paradossa, l'errore |
| s31–s32 | **scala** | i tre gradini dell'OMS |
| s33–s34 | griglia a tre colonne | la prescrizione al bisogno, sei elementi |
| s36, s46 | figura | la PCA; la luna sul letto |
| s07–s08, s21, s39, s41 | raggiera | stipsi, diarrea, senza farmaci, la notte |
| s42 | catena | poco sonno → delirium → guarigione lenta |
| s25 | norma | legge 38/2010 |
| il resto | griglia, trappola, confronto, cifre, titolo, frase, sostituzione, elenco, tre | — |

## Correzioni fatte guardando le card

- **La griglia a tre colonne sforava di 3 px** con «Intervallo minimo fra le
  dosi»: le celle hanno ora `min-width:0` e `overflow-wrap:anywhere`.

---

## La resa

| | |
|---|---|
| resa pubblicata | `d09962bf851b8ea74931786cba69b23b` — 548,607 s (9:08.6), 1080p 16:9, resa in 120 s |
| lotto asset | `ee16627c43c849eca6d6e8ec16bc2b8c` — 98 file, 19 MB, tutti completati |

---

## Da verificare

- La scala di Bristol è disegnata come fascia continua da 1 a 7: i tipi sono
  discreti, i confini fra le tre classi cadono fra 2 e 3 e fra 4 e 5. È una
  semplificazione visiva, le classi scritte sono quelle giuste.
