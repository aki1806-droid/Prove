# REGISTRO — Calendario dei diritti 2027 · Marzo 2027 · Congedi parentali

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Luca,
infermiere di Chirurgia · futuro papà. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Luca (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1281 caratteri), 82,44 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,44 → 0,60 s; pausa dopo «Falso» 0,38 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.

## Le clip di Luca — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `69aabaa7-7241-45ec-b6c8-649b87550252` |
| immagine-S1 | `126e5c6a-4614-473b-a112-0ac0bbfc81ef` |
| immagine-S5 | `1c4a374d-3663-4bad-8886-5e8d76ba2ad9` |
| clip-S0 | `841ff67e-2a03-47d6-98c4-40ab6e719f08` |
| clip-S1 | `2210558a-5589-4aa9-a363-3b991cf1040b` |
| clip-S5 | `9fa34e84-d5ad-4db5-afe0-a1cc887f592e` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «MARZO · CONGEDI PARENTALI»; il titolo compare parola per parola sulla voce, «dieci» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia LUCA · Infermiere di Chirurgia · futuro papà e la nuvoletta «Il congedo? È roba per mia moglie.»;
- **S5**: «COM'È ANDATA», «LUCA», «Il primo bagnetto l'ha fatto lui.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 4.00, 1.20-1.45, 1.45-5.83, 9.15-9.40, 9.40-10.63+fermo 2.45, 10.63-10.88, 10.88-16.31.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Crescere insieme si può.»).

## La durata

```
S0  hook: la domanda     5,00 s
S1  la storia            9,40 s
S2  il numero            9,80 s
S3  vero o falso        19,44 s
S4  come funziona       15,08 s
S5  com'è andata         8,80 s
S6  cosa fare            9,88 s
S7  firma e contatti     9,00 s
                       -------
                       86,40 s   (il pacchetto stima 84 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 86,40 s |
| montato HeyGen | `46a04ce0732ff5459f4bf09474616404` — **1:26.23** |
| link | https://app.heygen.com/videos/46a04ce0732ff5459f4bf09474616404 |

Scaricato e controllato: 1:26.23 (0,17 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,6 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 1,00 su 255, il massimo 2,00 su S5.

## I costi

| | |
|---|---|
| voce, HeyGen come passante | circa 5 crediti HeyGen (un credito ogni 16,7 s di grezzo, 82 s: il saldo non si legge mese per mese, sullo stesso account lavorava un'altra sessione) |
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

## Verifica sul CCNL Funzioni Locali 2022-2024

Luca lavora in sanità: vale il CCNL Sanità, qui non controllato. Per chi lavora nelle Funzioni Locali, i trenta giorni di congedo parentale pagati per intero sono confermati (art. 35, c. 3). Invece il congedo a ore «fino a metà dell'orario giornaliero» è il limite della legge: il CCNL FL lo regola diversamente (sei ore valgono un giorno, minimo un'ora, art. 35, c. 8). Il controllo completo, mese per mese, è in
`../calendario-2027-comune/VERIFICA-CCNL-FL.md`.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di Luca vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
