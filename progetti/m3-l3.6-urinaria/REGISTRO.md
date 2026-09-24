# Registro — Modulo 3 · micro-lezione 3.6 «Eliminazione urinaria e cateterismo vescicale»

La lezione del catetere: quando sì, quando no, e come si gestisce il circuito.
Tre illustrazioni nuove: la **vescica con il catetere e il palloncino**, il
**circuito chiuso** (letto, tubo, sacca sotto la vescica), il **globo
vescicale** palpabile sopra il pube. E la **curva** impara a salire soltanto
(`sale:true`): il rischio di CAUTI cresce con ogni giorno di permanenza, e
la figura lo mostra così.

La traccia A è stata rifiutata una prima volta da ElevenLabs per quota
esaurita; al secondo tentativo, un'ora dopo, è passata (4.553 crediti). La
lezione è stata chiusa in un giro solo insieme a 3.7 e 3.8.

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
| costo voce | $1,52 (A $0,75 · B $0,77) |
| costo trascrizioni | $0,55 |
| pause senza voce | nessuna; una posa breve sulla slide sul verde (s15) |

```
CARATTERI  9.110          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        9:11.3
tracce grezze             A 280,6 s  ·  B 329,2 s   (stacco dopo s25)
silenzi                   fattore 1,076   ->   atempo 1,058
```

## I confini

| | traccia A | traccia B |
|---|---|---|
| blocchi | 24 | 24 |
| blocchi fuori fascia | 0 | 0 |
| tagli nel parlato | nessuno | nessuno |

La trascrizione conferma: **672/672 e 720/724 parole**, nessun buco; le tre
rese diverse sono grafie («retrae» / «ritrae», «routinario» / «rutinario»)
e un «mai» sentito «ma».

### Una trascrizione che non trascrive

Il primo giro di trascrizioni è partito collegando lo speech-to-text
direttamente al nodo della voce, invece che a un asset audio: il risultato
era il testo del copione, tag «[warm]» compresi, non l'ascolto della
traccia. Le sei trascrizioni buone sono state rifatte dagli mp3 caricati come
asset (`creative_attach_reference_file`), che è il modo delle lezioni
precedenti. Il metodo lo registra.

Diciotto slide in quarantasette blocchi al primo giro, quarantotto dopo aver
diviso il capitolo sulla rimozione. Nessuna deroga. Il numero singolo di s10
(«150–200 ml, il residuo significativo») sforava il tipo `numero`: è passato a
`cifre`, che tiene il suffisso in corpo minore.

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la lezione; la prossima (3.7) |
| s02, s08, s19, s23, s45 | figura | globo, catetere, orologio, circuito, cartella |
| s09, s14, s37–s38 | raggiera | le cause della ritenzione; i fattori dell'incontinenza; le indicazioni e le non-indicazioni |
| s18 | **curva che sale** | il rischio di CAUTI per giorno di catetere |
| s26, s28–s30, s41–s42 | percorso | l'inserimento nella donna e nell'uomo; la rimozione |
| s31–s33 | mappa | il circuito chiuso, con i richiami numerati |
| s43–s44 | icone | il bundle CAUTI |
| s03, s34, s39 | sostituzione | «incontinenza» → «ritenzione con rigurgito»; le frasi da correggere |
| s13, s27, s35–s36, s40 | trappola | tagliare la valvola; gonfiare prima dell'urina; la sacca sopra la vescica |
| il resto | griglia, tre, cifre, titolo, frase | — |

## Correzioni fatte guardando le card

- **s10 sforava di 6 px**: il tipo `numero` con «150–200 ml» non ci sta in
  una riga; il dato è passato a `cifre` con `{n:150, suf:"–200 ml"}`.

---

## La resa

| | |
|---|---|
| resa pubblicata | `8b180936da81cf50525bf356ea0df4cb` — 550,059 s (9:10.1), 1080p 16:9, resa in 315 s |
| lotto asset | `b792e215d99f49bea6adabca39704477` — 98 file, 20 MB, tutti completati |

---

## Da verificare

- La curva del rischio sale «soltanto»: è la forma didattica del dato (3–7 %
  al giorno, cumulativo). Non ha una scala verticale: mostra la direzione,
  non il valore, e la didascalia lo dice.
