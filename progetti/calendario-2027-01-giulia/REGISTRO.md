# REGISTRO — Calendario dei diritti 2027 · Gennaio 2027 · Ferie

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Giulia,
infermiera di Pronto soccorso · Rovigo. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Giulia (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1397 caratteri), 90,20 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,34 → 0,60 s; pausa dopo «Falso» 0,36 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.

## Le clip di Giulia — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `084f9a2e-6545-4e78-a59d-1c3f9ec36b6a` |
| immagine-S1 | `fddeeaf6-993d-4949-bc62-40b99d8d7f9f` |
| immagine-S5 | `6a398685-6add-4772-8130-934725a2d0f9` |
| clip-S0 | `f073f661-eae6-4d7d-aee2-3d1a1afe8a9b` |
| clip-S1 | `1b6aa466-b669-4ce7-974e-0d82ed0c4cae` |
| clip-S5 | `691cf9e2-1fa6-4ba9-bc2d-02712ad15c52` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «GENNAIO · FERIE»; il titolo compare parola per parola sulla voce, «ferie» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia GIULIA · Infermiera di Pronto soccorso · Rovigo e la nuvoletta «Le ferie dell'anno scorso? Ormai sono perse.»;
- **S5**: «COM'È ANDATA», «GIULIA», «Le ferie rinviate per servizio non si cancellano.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 3.36, 1.20-1.45, 1.45-7.37, 9.95-10.20, 10.20-11.43+fermo 2.25, 11.43-11.68, 11.68-18.85.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Il tempo per te non è un regalo.»; «È un diritto.»).

## La durata

```
S0  hook: la domanda     5,00 s
S1  la storia           10,64 s
S2  il numero            8,88 s
S3  vero o falso        21,88 s
S4  come funziona       14,68 s
S5  com'è andata        11,16 s
S6  cosa fare           10,72 s
S7  firma e contatti    10,24 s
                       -------
                       93,20 s   (il pacchetto stima 89 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 93,20 s |
| montato HeyGen | `d38db5b84a9b771bcec4c42ada156d03` — **1:33.02** |
| link | https://app.heygen.com/videos/d38db5b84a9b771bcec4c42ada156d03 |

Scaricato e controllato: 1:33.02 (0,18 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,5 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 1,75 su 255, il massimo 5,40 su S3 (una clip che si muove o un cambio di quadro: HeyGen è qualche fotogramma avanti, il contenuto è lo stesso).

## I costi

| | |
|---|---|
| voce, HeyGen come passante | circa 6 crediti HeyGen (un credito ogni 16,7 s di grezzo, 90 s: il saldo non si legge mese per mese, sullo stesso account lavorava un'altra sessione) |
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

Rifà il gennaio consegnato il 15 ottobre (`../calendario-2027-01-ferie/`, voce ElevenLabs diretto, senza protagonista) con il nuovo pacchetto nel formato «Diritti in scena», come gli altri mesi. Quello vecchio resta su HeyGen (`2d67c66ba5dc7c9f1b2ce7316a87ea0f`) ma non va più pubblicato.

## Verifica sul CCNL Funzioni Locali 2022-2024

Giulia lavora in Pronto soccorso (CCNL Sanità, qui non controllato). Sul CCNL Funzioni Locali tutto il video è confermato: 32 giorni su sei giorni, 28 su cinque, 4 festività soppresse (art. 28, c. 2-6); ferie non monetizzabili (c. 9 e 11); sospese da ricovero o da malattia documentata di oltre tre giorni (c. 16); rinviate per servizio, si recuperano entro il primo semestre dell'anno dopo (c. 14-15), e il diniego va scritto (c. 9). Il controllo completo, mese per mese, è in
`../calendario-2027-comune/VERIFICA-CCNL-FL.md`.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di Giulia vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
