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
| voce | **via HeyGen**: Giovanni Rossi `7b6722df52c44a79b6adb6c3074588d8`, motore `eleven_v3`, sintetizzata dallo studio scena per scena (`monta-scene-heygen.py`) |
| costo voce | 0 $ — crediti HeyGen del piano (vedi «La resa») |
| costo trascrizioni | nessuna: una scena, un blocco, i confini li fa lo studio |
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

Non ci sono confini da scegliere: ogni scena porta il testo del suo blocco e lo
studio sintetizza la voce dentro la scena. Niente tracce, niente `tagli.py`,
niente trascrizione. Il copione letto e' esattamente `copione/blocchi.json`
senza i tag di stile (`[warm]`, `[serious]`), tolti perche' finirebbero nei
sottotitoli.

### La verifica per trascrizione

Non serve: il testo di ogni scena e' il blocco stesso. L'SRT lo produce lo
studio (`subtitle_url`).

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

| | |
|---|---|
| resa pubblicata | `f48270aa38d8bc5e0fa135ee4e15ed51` — 665.225 s (11:05.2), 1080p 16:9, resa in 365 s, con SRT (`subtitle_url`) |
| lotto asset | `431accd4116c49ecbb901fdde1cfd13b` — 50 file (48 clip + 2 copertine), 6 MB, tutti completati in ~3 minuti |
| crediti HeyGen | 4.234 prima del render, 4.233 dopo: **1 credito** per l'intero montaggio con 48 blocchi di voce, non 48 come stimato dai sondaggi a chiamata singola |
| durata | 665,2 s contro una stima di 9:34 a 15,5 car/s: lo studio legge a ~13,3 car/s effettivi, con una coda di silenzio a ogni scena. Per riportarla verso i 9:30 basta `voice_settings.speed` 1,15 e un nuovo render |

---

## Da verificare

- **La voce e' quella della via HeyGen**, non GianP: e' il pilota del doppio
  metodo. Da ascoltare per intero: pronuncia dei termini (amfotericina,
  luer-lock, UFA, SSSR), le pause fra le scene, il ritmo. Per tornare a GianP
  i chunk sono in `audio/`, pronti per `creative_generate_speech` al rinnovo
  ElevenLabs; poi tagli, trascrizione, verifica e `monta-scene.py` sulle
  stesse clip (gli id sono in `asset-id.json`).
- **La durata e' 11:05**, un minuto e mezzo oltre lo script (9:30). Se
  stona con le altre lezioni del corso si rifa' il render con `speed` 1,15
  (stima 9:40): costa un credito HeyGen e quattro minuti.
- Il render di 50 scene con la voce dentro ha preso 6 minuti (365 s), non i
  3-4 soliti: la sintesi avviene durante il render.
