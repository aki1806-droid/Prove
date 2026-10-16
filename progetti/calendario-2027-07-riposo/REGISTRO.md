# REGISTRO — Calendario dei diritti 2027 · Luglio 2027 · Diritto al riposo

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Francesca,
infermiera turnista · Medicina. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Francesca (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1309 caratteri), 86,10 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,36 → 0,60 s; pausa dopo «Falso» 0,35 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.

## Le clip di Francesca — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `07f755f8-2b41-4b3f-81ff-d1c158be0fc0` |
| immagine-S1 | `f7eb6c28-eee9-4f1b-8158-686a75fa987d` |
| immagine-S5 | `80400c79-9300-4163-a06c-56712bfbc423` |
| clip-S0 | `8db27e1a-17c8-4551-8691-64ff951aea94` |
| clip-S1 | `da757bd2-6340-4dc5-a23d-e749695f69d4` |
| clip-S5 | `c90001c3-79c8-4316-8336-4842f02d538b` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «LUGLIO · DIRITTO AL RIPOSO»; il titolo compare parola per parola sulla voce, «sette?» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia FRANCESCA · Infermiera turnista · Medicina e la nuvoletta «Nove ore tra un turno e l'altro. Di nuovo.»;
- **S5**: «COM'È ANDATA», «FRANCESCA», «La turnistica è stata corretta.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 4.55, 1.20-1.45, 1.45-6.55, 9.63-9.88, 9.88-11.07+fermo 2.65, 11.07-11.32, 11.32-17.80.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Riposare non è un lusso.»; «È sicurezza.»).

## La durata

```
S0  hook: la domanda     5,00 s
S1  la storia           11,60 s
S2  il numero            7,00 s
S3  vero o falso        21,92 s
S4  come funziona       15,60 s
S5  com'è andata         8,08 s
S6  cosa fare            9,80 s
S7  firma e contatti     9,92 s
                       -------
                       88,92 s   (il pacchetto stima 84 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 88,92 s |
| montato HeyGen | `f0f65e225cda17c3c76cc1bb3792b621` — **1:28.75** |
| link | https://app.heygen.com/videos/f0f65e225cda17c3c76cc1bb3792b621 |

Scaricato e controllato: 1:28.75 (0,17 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,5 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 2,02 su 255, il massimo 9,97 su S5 (una clip che si muove o un cambio di quadro: HeyGen è qualche fotogramma avanti, il contenuto è lo stesso).

## I costi

| | |
|---|---|
| voce, HeyGen come passante | circa 6 crediti HeyGen (un credito ogni 16,7 s di grezzo, 86 s: il saldo non si legge mese per mese, sullo stesso account lavorava un'altra sessione) |
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

Francesca è infermiera (CCNL Sanità). Per le Funzioni Locali le 11 ore di riposo ogni 24 sono confermate (art. 25, c. 3); il CCNL FL aggiunge un tetto di 10 turni notturni al mese (art. 25, c. 4). Il controllo completo, mese per mese, è in
`../calendario-2027-comune/VERIFICA-CCNL-FL.md`.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di Francesca vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
