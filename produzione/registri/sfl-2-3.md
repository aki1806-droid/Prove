# Registro — SFL 2.3 «Il concreto batte l'astratto»

Una frase che non produce un'immagine viene letta e sparisce. Le parole
astratte — efficienza, criticità, problematiche — sembrano professionali e
non descrivono niente. **La scala**: astratto, categoria, esempio, scena;
ogni gradino verso il basso rende la frase più difficile da ignorare, e
**la scena non si discute**. Scendere la scala accorcia il testo. Tre
dettagli fanno quasi tutto il lavoro: **numeri, date, nomi**. Poi il
rovescio: il concreto convince anche quando non è rappresentativo — la scena
per far capire, il dato per dimostrare. E il perché pratico: **una richiesta
astratta non viene rifiutata, viene rinviata**.

| campo | valore |
|---|---|
| video_id | `1950a61b20ebcb367d5a4b07af2079bf` |
| scene | 50 — copertina, 47 slide, 1 ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | 598,5 s (9:58) — misurata sul montato |
| parlato | 586,8 s (564,0 s di voce tagliata + 22,8 s di pose) |
| copione | 9.955 caratteri in 48 blocchi, media 207 |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | A `s02`–`s10` · B `s11`–`s20` · C `s21`–`s30` · D `s31`–`s40` · E `s41`–`s49` |
| ripresa | `s31` orologio |
| costo | ~31 crediti HeyGen di voce (92 per la 2.2, la 2.3 e la 2.4 insieme: 6.616 → 6.522, compresi i render della 2.1 e della 2.2) + 1 di render |

**Confini: 43 su 43** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **1,38 s**, taglio a metà della pausa.

## Le scelte

**Due schermate F**, layout `pd`:

- il centralino scoperto (`c18`–`c21`): sottolineata «criticità» nella
  versione da evitare e l'orario («dalle 13 alle 14») nella riscrittura;
- lo spostamento di turno (`c37`–`c40`): sottolineato «attuale assetto
  organizzativo» e il numero sul tavolo («due persone per 40 accessi»).

**La scala** è la slide C dello script, a elenco con un gradino acceso per
volta (`c10`–`c14`). La riga della categoria è accorciata sulla slide
(«tempo perso nelle consegne») perché andava a capo; la voce dice la frase
intera.

**Il ponte con l'altro corso**, chiesto dalla nota dello script: `s36`
rimanda al modulo 5 di **«Dire, ascoltare, convincere»** (*Convincere senza
manipolare*), e la slide `c36` lo scrive nell'occhiello.

## La ripresa

**`s31`**, un orologio da parete sopra una porta, in un corridoio vuoto.
Niente testo: caricata così com'era.

## Verifica

Scaricato e guardato: dodici fotogrammi più la ripresa, tutti al loro posto.
Silenzi oltre 2,5 s: solo la copertina e la chiusura.
