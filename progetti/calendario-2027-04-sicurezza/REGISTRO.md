# REGISTRO — Calendario dei diritti 2027 · Aprile 2027 · Sicurezza sul lavoro

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Davide,
tecnico della manutenzione · Ospedale. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Davide (vedi sotto), S3 **rimessa a tempo** sulla voce |
| voce «Luca Ward (V4)» | ✓ la voce clonata che si chiama così (non è la voce di Luca Ward, ma una simile), eleven_v4, italiano, **via HeyGen come passante** |
| la scena segue la durata della voce | ✓ voce + 0,5 s prima (0,6-0,7 su S0-S1) e 0,9 s dopo (2,5 s sulla firma finale) |
| sottotitoli | ✓ **impressi nel video** e anche in `sottotitoli.srt` |
| musica leggera | ✓ la stessa di gennaio e febbraio, sotto la voce |
| esporta 1080p | ✓ montato in HeyGen, 1080p |
| clip Higgsfield del protagonista | ✓ **fatte**: tre, per S0, S1 e S5 |
| QR del link nel calendario | **da fare**: serve il link pubblico |

## La voce — HeyGen come passante

Scelta di Achille per i dieci mesi da marzo a dicembre, chiesta prima di
cominciare come vuole `CLAUDE.md`. Una traccia sola (`voce-testo.txt`,
1372 caratteri), 91,92 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,44 → 0,60 s; pausa dopo «Falso» 0,36 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.
- **Testo corretto** rispetto al pacchetto, per la voce e per i sottotitoli: «usa sempre i dpi» → «usa sempre i DPI», «conosci il tuo rls» → «conosci il tuo RLS».

## Le clip di Davide — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `f56f4ec7-0cb9-490c-b610-33e8662e6963` |
| immagine-S1 | `9f939351-a71b-43fb-9864-03a17adec0ef` |
| immagine-S5 | `cfbee7c1-8f1d-4317-8f5e-f1fde6f9b3e9` |
| clip-S0 | `7bc0640e-7e02-4893-b9ac-2f201ec16055` |
| clip-S1 | `ef03a56a-10d3-4428-80b6-3777ec5cdb7b` |
| clip-S5 | `b7f1a186-6d68-4b1d-97d1-1e716a5fbf86` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «APRILE · SICUREZZA SUL LAVORO»; il titolo compare parola per parola sulla voce, «fermarti?» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia DAVIDE · Tecnico della manutenzione · Ospedale e la nuvoletta «Dai, facciamo in fretta. Tanto non succede niente.»;
- **S5**: «COM'È ANDATA», «DAVIDE», «Messo in sicurezza il giorno stesso.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 5.24, 1.20-1.45, 1.45-7.23, 10.55-10.80, 10.80-12.03+fermo 2.37, 12.03-12.28, 12.28-18.47.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («L'obiettivo è uno solo: tornare a casa, ogni sera.»).

## La durata

```
S0  hook: la domanda     5,00 s
S1  la storia           10,00 s
S2  il numero           10,68 s
S3  vero o falso        22,76 s
S4  come funziona       16,08 s
S5  com'è andata         9,56 s
S6  cosa fare            9,92 s
S7  firma e contatti    11,28 s
                       -------
                       95,28 s   (il pacchetto stima 88 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 95,28 s |
| montato HeyGen | `11a03bbf5dcd43e78c8da86bc85430e3` — **1:35.11** |
| link | https://app.heygen.com/videos/11a03bbf5dcd43e78c8da86bc85430e3 |

Scaricato e controllato: 1:35.11 (0,17 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,6 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 1,61 su 255, il massimo 5,04 su S5 (una clip che si muove o un cambio di quadro: HeyGen è qualche fotogramma avanti, il contenuto è lo stesso).

## I costi

| | |
|---|---|
| voce, HeyGen come passante | circa 6 crediti HeyGen (un credito ogni 16,7 s di grezzo, 92 s: il saldo non si legge mese per mese, sullo stesso account lavorava un'altra sessione) |
| immagini e clip, Higgsfield | 36,75 crediti Higgsfield |
| render HeyGen | non isolabile, per la stessa ragione (sul corso: 1 credito a render) |

## Gli strumenti

```
python3 ../calendario-2027-comune/testo_voce.py .   voce-testo.txt (poi create_speech)
python3 ../calendario-2027-comune/voce.py .         la voce tagliata scena per scena
python3 ../calendario-2027-comune/monta.py .        scene, mix, sottotitoli, montato-locale.mp4
python3 ../calendario-2027-comune/heygen.py . prepara | invia | scene
python3 ../calendario-2027-comune/registro.py .     questo registro
```

## Note del mese

Il titolo di S0 va a capo in «Se vedi / un pericolo, hai il / diritto di fermarti?»: le righe sono pari di larghezza, ma la prima è corta. Se dà fastidio, si rifà la scena senza costi.

## Verifica sul CCNL Funzioni Locali 2022-2024

Davide lavora in ospedale (CCNL Sanità). Le regole del video vengono dal D.Lgs. 81/2008, che il CCNL Funzioni Locali non cambia. Il controllo completo, mese per mese, è in
`../calendario-2027-comune/VERIFICA-CCNL-FL.md`.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di Davide vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
