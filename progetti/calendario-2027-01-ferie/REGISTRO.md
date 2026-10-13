# REGISTRO — Calendario dei diritti 2027 · Gennaio · Ferie

Video del mese per il calendario CISL FP Padova Rovigo, *«Il tempo per te non
è un regalo.»* 16:9, 1920×1080, 25 fps, senza avatar. Il pacchetto di
partenza (`pacchetto/`) porta le otto scene gia' fatte e mute, i sei testi
della voce e le istruzioni di montaggio per HeyGen Studio.

## Che cosa si e' fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene del pacchetto, **non toccate** se non nella durata |
| voce «Luca Ward (V4)» su S1-S6 | ✓ la voce clonata del workspace ElevenLabs che si chiama cosi' (non e' la voce di Luca Ward, ma una simile), eleven_v4, italiano: la stessa del corso OSS |
| la scena segue la durata della voce | ✓ voce + 0,5 s prima e 0,9 s dopo (1,3 s dopo l'invito finale); la clip si taglia, la grafica resta sull'ultimo fotogramma |
| sottotitoli | ✓ **impressi nel video** (Facebook parte muto) e anche in `sottotitoli.srt` |
| musica leggera, soprattutto su S0 e S7 | ✓ dalla libreria HeyGen, sotto la voce |
| esporta 1080p, copia il link | ✓ montato in HeyGen, 1080p |
| QR del link sul calendario | **da fare**: serve il link pubblico (vedi in fondo) |
| clip Higgsfield al posto dei segnaposto | **non fatte**: costano, vedi in fondo |

## La voce

Sei generazioni, una per scena, 52,2 s in tutto (S1 7,1 · S2 10,4 · S3 10,3 ·
S4 6,9 · S5 9,6 · S6 8,1). `[warm]` in apertura (S1) e sull'invito (S6).
Ricontrollata con una trascrizione: ogni parola c'e', compreso «CISL FP».
Costo: **786 crediti, $0,13**.

## La musica

«Astral Generated Music 271354a0», libreria HeyGen: piano ambient calmo, 70 s,
con una chiusura sua. Scelta fra due candidate misurando il volume ogni 5 s:
questa e' piatta (−16/−17 dB), l'altra cresceva di 10 dB a meta'.

- **Rallentata a 0,945×**, cosi' la sua chiusura cade sull'ultimo
  fotogramma del video: niente taglio, niente dissolvenza finta.
- **10 dB sotto la voce**: da sola (copertina, pause, chiusura) sta a circa
  −30 dB, la voce a −20. Sotto la voce si abbassa ancora (sidechain).
- Il mix e' a **−16 LUFS**, picco −1,5 dBFS, con **un guadagno solo**. Il
  primo tentativo col loudnorm in un passaggio alzava i tratti piano: la
  musica della copertina tornava forte quanto la voce.

## I sottotitoli

Il testo e' quello del copione (accenti e punteggiatura giusti); i tempi sono
quelli della voce, parola per parola. 25 battute, **una riga sola**: sotto il
contenuto delle grafiche restano 150 px (S4 arriva a y=915), e due righe lo
coprirebbero. Inter SemiBold bianco su fascia verde del marchio; sul verde
pieno delle grafiche la fascia si fonde col fondo e resta il testo.

## La durata

```
S0  copertina      3,00 s   musica
S1  clip ponte     8,48 s
S2  numero chiave 11,77 s
S3  clip b-roll   11,67 s
S4  regole        8,32 s
S5  da ricordare  10,96 s
S6  invito         9,85 s
S7  chiusura      10,00 s   musica
                  ------
                  74,05 s   (il README chiede 70-85 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 74,05 s |
| montato HeyGen | ID_HEYGEN — DURATA_HEYGEN |
| asset caricati | 16 (8 scene + 8 tracce) in un lotto |

CONFRONTO_HEYGEN

## Gli strumenti

```
python3 costruisci.py   la voce e la musica: mix, una traccia per scena, scene.json
(trascrizione)          audio/parole.json, i tempi di ogni parola della voce
python3 monta.py        scene alla durata, sottotitoli impressi, montato-locale.mp4, SRT
python3 heygen.py prepara | invia | scene
```

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: in particolare i numeri della grafica S4 (32/28 giorni, 30/26
  nei primi tre anni, 4 festivita' soppresse, due settimane d'estate) e il
  «32 giorni (orario su 6 giorni)» di S2, che dipendono dal CCNL applicato.
- **La musica va ascoltata**: e' scelta e dosata a misura, non a orecchio.
- **Le clip S1, S3, S6 sono ancora i segnaposto** del pacchetto (movimento di
  camera sull'immagine del calendario). Le tre clip Higgsfield del prompt
  costano crediti video: non le ho generate senza un via.
- **Il QR del video** per la pagina 3 del calendario: serve il link dove il
  video sara' pubblicato (Facebook, YouTube). Con quello lo genero.
