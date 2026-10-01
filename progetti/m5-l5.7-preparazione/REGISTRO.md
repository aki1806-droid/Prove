# Registro — Modulo 5 · micro-lezione 5.7 «Preparazione, stabilità e gestione dei farmaci in reparto»

La lezione delle regole di reparto, senza corpi nuovi: le regole stanno nei
corpi delle regole. Lo stravaso in sette tappe è un percorso a due righe
che si accende in due tempi; il caso del frigorifero è un percorso a
quattro; ricostituzione e diluizione, i solventi, monodose e multidose, le
incompatibilità fisiche e chimiche sono confronti; le vie di esposizione
dell'operatore e i DPI sono icone; «le incompatibilità chimiche non si
vedono», «il reparto non prepara», «un carrello incompleto si scopre
durante un arresto» sono le tre slide sul verde.

Illustrazioni riusate: frigorifero, armadio, lampada, libro, orologio,
guanto, camice, occhiali, siringa, aerosol, mani, bocca, puntura, cuore.

---

## Scheda parametri

| | |
|---|---|
| durata chiesta dallo script | 9 minuti e 30 |
| durata ottenuta | vedi «La resa» |
| slide dello script | 19 |
| scene | 50 (il tetto) |
| blocchi di parlato | 48 |
| voce | GianP — News Info and Documentary, `eleven_v3` (la prova con la via HeyGen, sotto, è stata scartata) |
| costo voce | *in attesa dei crediti* |
| costo trascrizioni | *in attesa dei crediti* |
| pause senza voce | nessuna; tre pose brevi sulle slide sul verde (s17, s29, s40) |

```
CARATTERI  8.742          BLOCCHI  48         SCENE  50/50
stima a 17,0 car/s        8:50.8
stacco tracce             dopo s26   (chunk A 4.428 car · chunk B 4.224 car)
```

Lo script è di 19 slide: i blocchi lo seguono, con qualche riga della
lezione 5.3 e 5.4 dove un blocco restava corto (il principio FIFO, la
Raccomandazione 1 per il potassio, la classificazione dei rifiuti della
4.7). Lo script chiede che lo stravaso sia scandito passo per passo: il
percorso a sette tappe si accende in due scene.

## I confini

*in attesa della voce*

### La verifica per trascrizione

*in attesa della voce*

## Le scene

| scene | corpo | contenuto |
|---|---|---|
| s01, s50 | copertina | la preparazione; la 5.8 |
| s02, s21, s32–s33, s44 | percorso | il tratto di strada; l'escursione termica; lo stravaso in sette tappe; il caso |
| s04, s06, s11, s16 | confronto | ricostituzione e diluizione; amfotericina e fenitoina; monodose e multidose; fisiche e chimiche |
| s25, s30, s41 | icone | l'esposizione; i DPI; i farmaci del carrello |
| s24 | tre | mutageni, cancerogeni, teratogeni |
| s35 | cifre | 48 ore, guanti |
| s17, s29, s40 | titolo sul verde | «non si vedono»; «non prepara»; «durante un arresto» |
| il resto | figura, frase, griglia | — |

## Correzioni fatte guardando le card

- **`tre` vuole `box`, non `voci`**, e `cifre` vuole `voci`, non `cifre`:
  due nomi di campo sbagliati, due giri di render.

---

## La resa

*in attesa della voce*

### La prova scartata: la via HeyGen (1° ottobre 2026)

| | |
|---|---|
| resa di prova | `f48270aa38d8bc5e0fa135ee4e15ed51` — 665,2 s (11:05), 1080p 16:9, render di 365 s, con SRT |
| voce | Giovanni Rossi `7b6722df52c44a79b6adb6c3074588d8`, motore `eleven_v3` sintetizzato dallo studio scena per scena (`monta-scene-heygen.py`) |
| lotto asset | `431accd4116c49ecbb901fdde1cfd13b` — 50 file (48 clip + 2 copertine), 6 MB; **gli id delle clip restano validi** per il montaggio con GianP (`asset-id.json`) |
| crediti HeyGen | 4.234 → 4.233: 1 credito per l'intero montaggio |
| durata | 11:05 contro i 9:34 stimati: lo studio legge a ~13,3 car/s con una coda di silenzio a ogni scena |
| esito | scartata dal committente per la voce; si torna a GianP al rinnovo ElevenLabs |

---

## Da verificare

- La voce: le due tracce aspettano il rinnovo dei crediti ElevenLabs. I chunk
  sono in `audio/`, pronti per `creative_generate_speech`; poi tagli,
  trascrizione, verifica, e `monta-scene.py` sulle clip gia' caricate: al
  Passo 6 si caricano solo i 48 mp3.
