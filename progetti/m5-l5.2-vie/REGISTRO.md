# Registro — Modulo 5 · micro-lezione 5.2 «Vie di somministrazione e tecniche»

La lezione tecnica del modulo, e tre corpi nati per lei. L'**iniezione** è
la sezione della cute a tre strati (epidermide e derma, sottocute, muscolo)
con l'ago che si disegna all'angolo giusto: 10–15° nel derma, 45° e 90° nel
sottocute, 90° nel muscolo; ogni ago porta la sua etichetta con la lunghezza.
La **zeta** è la tecnica a Z in tre quadri: la cute spostata di lato con la
mano non dominante, il deposito nel muscolo, il tramite che si spezza quando
la cute torna al suo posto. Le **sedi** sono la sagoma di fronte e di spalle
con le zone che si accendono nell'ordine della voce: deltoide, ventrogluteo,
vasto laterale, dorsogluteo con il nervo sciatico segnato, e sul davanti le
zone del sottocute.

Cinque illustrazioni nuove: il cerotto transdermico, lo spray, il collirio,
la supposta, l'osso per la via intraossea.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 10 minuti |
| durata ottenuta | vedi «La resa» |
| slide dello script | 20 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` |
| costo voce | $1,50 (A $0,72 · B $0,77) |
| costo trascrizioni | $0,57 |
| pause senza voce | nessuna; due pose brevi sulle slide sul verde (s04, s34) |

```
CARATTERI  8.972          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:03.2
stacco tracce             dopo s25   (chunk A 4.365 car · chunk B 4.607 car)
tracce grezze             A 287,7 s  ·  B 341,8 s
silenzi                   fattore 1,097   ->   atempo 1,087
```

Lo script ha 20 slide e un ritmo da elenco (le vie una dopo l'altra): i
blocchi seguono lo script senza aggiunte, e le scene di corpo (gli aghi, la
Z, le sedi) prendono i blocchi dove la voce descrive la tecnica.

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 24 | 24 |
| blocchi fuori fascia | 0 | 0 |
| tagli nel parlato | nessuno | nessuno |

Una correzione a mano sulla traccia A: l'allineamento aveva saltato una
pausa di 0,18 s fra s05 e s06 e il confine era caduto 5,16 s dopo (s06 a
31 car/s). `correzioni.json` `{"A": {"3": {"secondi": -5.16}}}`, poi
`tagli.py correggi` e `applica`: zero fuori fascia.

### La verifica per trascrizione

La traccia A conferma **705/714 parole**, la B **696/710**, nessun buco.
Le rese diverse (non buchi) sono sigle e numeri scritti in modo diverso
dal trascrittore.

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | le vie; la 5.3 |
| s10, s12, s19, s21 | **iniezione** | intradermica; sottocute 45° e 90°; intramuscolare; gli aghi a confronto |
| s26–s27 | **zeta** | la cute spostata e il deposito; il tramite spezzato |
| s13, s23, s25 | **sedi** | sottocute; intramuscolo; il dorsogluteo e lo sciatico |
| s11, s22, s33 | cifre | volumi e lunghezze degli aghi |
| s02, s20 | tre | le tre vie enterali; le tre parenterali |
| s29, s35 | confronto | eparina e insulina; prima e dopo |
| s04, s34 | titolo sul verde | «mai massaggiare»; la Z per i farmaci irritanti |
| s38 | trappola | l'errore da quiz sulla sede |
| il resto | figura, frase, griglia, elenco, icone, sostituzione | — |

## Correzioni fatte guardando le card

- **s33 con tre `cifre` sforava** di qualche pixel in basso: il blocco è
  passato al tipo `cifre` con il corpo ridotto.
- **s22 con quattro cifre andava a capo**: tre cifre con la didascalia.
- **Il confine s05/s06** (sopra): l'unico intervento sulla voce.

---

## La resa

| | |
|---|---|
| resa pubblicata | `d13d3dbee433d679793e5750a63ccddf` — 543.081 s (9:03.1), 1080p 16:9, resa in 83 s, con SRT (`subtitle_url`) |
| lotto asset | `c56d741c88ed473688a69c0b1abfd314` — 98 file, 20 MB, tutti completati |

---

## Da verificare

- Nulla di aperto: la verifica per trascrizione non segnala buchi.
