# Registro — SFL 3.2 «Titoli che dicono qualcosa»

Premessa, contesto, considerazioni, conclusioni: **etichette di contenitori**,
dicono che tipo di cosa c'è dentro e non che cosa c'è dentro. E sprecano
l'unico vantaggio che i titoli hanno: chi scansiona li legge prima del resto.
Se i titoli dicono qualcosa, il documento diventa **leggibile a due
velocità**. La regola è una sola: **un titolo è una frase, non
un'etichetta**. Scriverli così costringe anche chi scrive a sapere che cosa
c'è in ogni sezione. Tre formati — il fatto, la decisione, la domanda del
lettore — e una forma: una riga, niente maiuscolo, coerenti fra loro. Un
titolo che dice la cosa spiacevole non è più brutale: è più onesto.

| campo | valore |
|---|---|
| video_id | `29bc2fd622e576b8ed5480462f88cdb3` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,6 s (9:59) — misurata sul montato |
| parlato | 586,8 s (550,8 s di voce tagliata + 36,1 s di pose) |
| copione | 9.859 caratteri in 48 blocchi, media 205 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s27` indice |
| costo | 29 crediti HeyGen di voce (6.427 → 6.398) + 1 di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,31 s**, taglio a metà della pausa.

## Le scelte

**Due schermate F**, layout `pd`:

- l'indice a etichette contro l'indice a frasi (`c09`–`c13`), forma
  `colonne`, ferma per tutta la scena come chiede la nota dello script. Le
  frasi della colonna di destra vanno su due righe: è la larghezza della
  colonna, non la lunghezza dei titoli;
- il titolo da atto ufficiale contro quello che dice la cosa (`c32`–`c35`),
  con «Considerazioni in merito» sottolineato.

**Il conteggio detto dalla voce è stato corretto.** Lo script diceva
«ventitré parole contro otto»; contate sulla schermata sono **diciannove
contro otto**, e la voce dice così.

**I tre titoli che funzionano** (`c22`–`c25`) e **la forma dei titoli**
(`c28`–`c30`) sono slide C a elenco con una riga accesa per volta. Il
rimando al modulo 6 per le cattive notizie è in `s38` e nell'occhiello di
`c38`.

## La ripresa

**`s27`**, la pagina dell'indice di un libro su un tavolo. La scritta
«table of contents» e le voci erano quasi leggibili: sfocate in post.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa, tutti al loro posto.
Silenzi oltre 2,5 s: solo la copertina e la chiusura.
