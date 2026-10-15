# REGISTRO — Calendario dei diritti 2027 · Maggio 2027 · Valorizzazione professionale

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Elena,
infermiera esperta in wound care. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Elena (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1307 caratteri), 86,05 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,45 → 0,60 s; pausa dopo «Falso» 0,45 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.
- **Testo corretto** rispetto al pacchetto, per la voce e per i sottotitoli: «E Elena?» → «Ed Elena?».

## Le clip di Elena — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `c9b84a7d-4842-4d0d-ae3e-3e36ca4a8270` |
| immagine-S1 | `54a4dda4-b1ee-4fec-a7e3-b324a5f2bf4d` |
| immagine-S5 | `0ed8a273-a9d5-40f1-bca7-fbd37d9e674c` |
| clip-S0 | `5299e73d-1642-44f5-b644-2469a845369f` |
| clip-S1 | `8c507c3b-9362-4656-962e-7fe34a695631` |
| clip-S5 | `5f70baa7-3c2b-4265-8a1b-ec6aef1b8a98` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «MAGGIO · VALORIZZAZIONE PROFESSIONALE»; il titolo compare parola per parola sulla voce, «busta» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia ELENA · Infermiera esperta in wound care e la nuvoletta «Tutti mi chiamano. Ma sulla carta non conto.»;
- **S5**: «COM'È ANDATA», «ELENA», «La sua competenza ha un nome. E un valore.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 4.00, 1.20-1.45, 1.45-5.94, 9.31-9.56, 9.56-10.79+fermo 2.37, 10.79-11.04, 11.04-16.76.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Chi cura, conta.»).

## La durata

```
S0  hook: la domanda     5,40 s
S1  la storia           12,32 s
S2  il numero            9,16 s
S3  vero o falso        19,76 s
S4  come funziona       14,28 s
S5  com'è andata         9,36 s
S6  cosa fare            9,68 s
S7  firma e contatti     9,00 s
                       -------
                       88,96 s   (il pacchetto stima 86 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 88,96 s |
| montato HeyGen | `6123c4798075d88ef0f495b5a1a9f396` — **1:28.79** |
| link | https://app.heygen.com/videos/6123c4798075d88ef0f495b5a1a9f396 |

Scaricato e controllato: 1:28.79 (0,17 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,5 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 3,12 su 255, il massimo 16,96 su S5 (una clip che si muove o un cambio di quadro: HeyGen è qualche fotogramma avanti, il contenuto è lo stesso).

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

## Note del mese

Nella clip di S1, a metà, a Elena compare in testa una cuffietta da infermiera che nel fotogramma di partenza non c'è: un'invenzione di Kling. Il volto resta lo stesso; va giudicato se lasciarla o rifare la clip (12 crediti).

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di Elena vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
