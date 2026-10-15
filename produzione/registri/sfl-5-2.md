# Registro — SFL 5.2 «La brevità che sembra freddezza»

Dopo quattro moduli passati a tagliare, la lezione dice dove il taglio smette
di funzionare: nel messaggio breve. In un testo lungo la brevità è un
servizio; in un messaggio di quattro parole invece di sei non si risparmia
niente, e le due parole in meno vengono lette come disinteresse. **Sotto una
certa soglia — intorno alle cinque o sei parole — la brevità non è
efficienza: è distanza.** Poi l'asimmetria di ruolo: lo stesso «ok», da chi
comanda, pesa il doppio, e il budget di brevità di chi coordina è più basso.
Infine la sproporzione: dieci righe e, in risposta, «ok, ne parliamo». Chiude
la regola rapida: se scriverlo è costato fatica, la risposta non può essere a
costo zero.

| campo | valore |
|---|---|
| video_id | `136750fb54147016f5f4cc8208c9f5c7` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,7 s (9:59) — misurata sul montato |
| parlato | 586,9 s (546,9 s di voce tagliata + 40,1 s di pose) |
| copione | 9.818 caratteri in 48 blocchi, media 205 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s25` sala-pausa |
| costo | 34 crediti HeyGen di voce (6.124 → 6.090, compresi il render della 4.5 e forse quello della 5.1) + 1 di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,40 s**, taglio a metà della pausa.

## Le scelte

**Due schermate F in forma `chat`**, affiancate: il «No» secco contro «No,
oggi serve copertura fino alle 20. Mi dispiace.» (`c12`–`c15`), e l'«Ok, ne
parliamo» a un messaggio lungo contro le tre righe che dicono di averlo letto
(`c30`–`c33`). Il messaggio lungo non si riporta: è indicato tra parentesi, in
corsivo, come fa lo script.

**La soglia** (`c08`–`c11`), «Sotto una certa soglia / la brevità non è
efficienza. / È distanza.», resta ferma per tutta la scena: nello script è
una scena AVATAR + SLIDE.

**La scena sul budget di brevità** (`c21`–`c24`) è quella che la nota dello
script segnala come la più vicina al pubblico con responsabilità di
coordinamento: è detta come conseguenza del ruolo, non come rimprovero.

**Il copione era corto alla prima stesura** (8.763 caratteri) ed è stato
allungato a 9.818 prima di generare la voce.

## La ripresa

**`s25`**, due sedie in una sala pausa, una tazza appoggiata sul tavolo,
nessuno in campo. La bacheca sullo sfondo è illeggibile alla generazione.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa, tutti al loro posto,
con entrambe le schermate chat nella griglia. Silenzi oltre 2,5 s: la
copertina e la chiusura.
