# REGISTRO — Calendario dei diritti 2027 · Agosto 2027 · Straordinario e pronta disponibilità

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Andrea,
tecnico di radiologia · Pronta disponibilità. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Andrea (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1258 caratteri), 83,83 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,39 → 0,60 s; pausa dopo «Falso» 0,35 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.

## Le clip di Andrea — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `aff5691b-44e5-4b13-9d04-67e239ab41a0` |
| immagine-S1 | `df4c4425-e250-465f-a892-b3b4189d563b` |
| immagine-S5 | `4da836cd-d2d5-41a9-8cad-49beddb2ac3d` |
| clip-S0 | `8a097899-8b2c-4d41-8ce1-4c20d0619335` |
| clip-S1 | `5a9c5587-baca-4f7a-b825-90d846c497bb` |
| clip-S5 | `8d62b2f1-ff9a-4f9e-8543-48a2cab4ebdc` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «AGOSTO · STRAORDINARIO E PRONTA DISPONIBILITÀ»; il titolo compare parola per parola sulla voce, «notte» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia ANDREA · Tecnico di radiologia · Pronta disponibilità e la nuvoletta «Tre chiamate di notte. E in busta paga?»;
- **S5**: «COM'È ANDATA», «ANDREA», «Le ore mancanti sono state pagate.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 4.84, 1.20-1.45, 1.45-7.00, 10.15-10.40, 10.40-11.63+fermo 2.53, 11.63-11.88, 11.88-17.54.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Ogni ora ha un valore.»).

## La durata

```
S0  hook: la domanda     5,00 s
S1  la storia           11,44 s
S2  il numero            8,60 s
S3  vero o falso        21,76 s
S4  come funziona       12,56 s
S5  com'è andata         7,92 s
S6  cosa fare           10,08 s
S7  firma e contatti     9,00 s
                       -------
                       86,36 s   (il pacchetto stima 83 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 86,36 s |
| montato HeyGen | `0d657ed8a4615b9f4ebf519435a479b6` — **1:26.19** |
| link | https://app.heygen.com/videos/0d657ed8a4615b9f4ebf519435a479b6 |

Scaricato e controllato: 1:26.19 (0,17 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,6 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 1,08 su 255, il massimo 2,42 su S5.

## I costi

| | |
|---|---|
| voce, HeyGen come passante | circa 6 crediti HeyGen (un credito ogni 16,7 s di grezzo, 84 s: il saldo non si legge mese per mese, sullo stesso account lavorava un'altra sessione) |
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

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di Andrea vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
