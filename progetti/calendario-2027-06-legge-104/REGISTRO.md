# REGISTRO — Calendario dei diritti 2027 · Giugno 2027 · Legge 104

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Paola,
impiegata amministrativa · Azienda sanitaria. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Paola (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1282 caratteri), 83,36 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,43 → 0,60 s; pausa dopo «Falso» 0,39 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.

## Le clip di Paola — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `001b4de2-8e26-4e7b-9039-5570babd3b0c` |
| immagine-S1 | `5df9a244-39d3-4668-8cfa-158a2ef716cf` |
| immagine-S5 | `e2bb7463-9373-421b-8ccd-c5162ab9d4fc` |
| clip-S0 | `e7daf5d6-6aeb-4687-989f-46e9a6fda36e` |
| clip-S1 | `e385489b-8837-4c0b-9db1-8603f4964ebe` |
| clip-S5 | `03dd08b3-eb8c-4078-9bef-1539532c92b8` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «GIUGNO · LEGGE 104»; il titolo compare parola per parola sulla voce, «ami» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia PAOLA · Impiegata amministrativa · Azienda sanitaria e la nuvoletta «A maggio avevo già finito le ferie.»;
- **S5**: «COM'È ANDATA», «PAOLA», «Le sue ferie tornano a essere riposo.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 4.40, 1.20-1.45, 1.45-7.16, 9.27-9.52, 9.52-10.75+fermo 2.33, 10.75-11.00, 11.00-15.98.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Il tempo per chi ami è un diritto.»).

## La durata

```
S0  hook: la domanda     5,00 s
S1  la storia           10,08 s
S2  il numero            8,68 s
S3  vero o falso        20,60 s
S4  come funziona       15,00 s
S5  com'è andata         9,20 s
S6  cosa fare            8,88 s
S7  firma e contatti     9,36 s
                       -------
                       86,80 s   (il pacchetto stima 84 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 86,80 s |
| montato HeyGen | `c154fdb9dc041fe9c6aad95e2fc6cfe0` — **1:26.64** |
| link | https://app.heygen.com/videos/c154fdb9dc041fe9c6aad95e2fc6cfe0 |

Scaricato e controllato: 1:26.64 (0,16 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,6 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 1,62 su 255, il massimo 7,06 su S5 (una clip che si muove o un cambio di quadro: HeyGen è qualche fotogramma avanti, il contenuto è lo stesso).

## I costi

| | |
|---|---|
| voce, HeyGen come passante | circa 5 crediti HeyGen (un credito ogni 16,7 s di grezzo, 83 s: il saldo non si legge mese per mese, sullo stesso account lavorava un'altra sessione) |
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

Paola lavora in azienda sanitaria (CCNL Sanità). I permessi vengono dalla legge 104/1992, valida in tutti i comparti; il CCNL FL la richiama senza cambiarla. Il controllo completo, mese per mese, è in
`../calendario-2027-comune/VERIFICA-CCNL-FL.md`.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di Paola vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
