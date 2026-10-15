# REGISTRO — Calendario dei diritti 2027 · Settembre 2027 · Diritto allo studio

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Rosa,
operatrice socio-sanitaria · da dieci anni. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Rosa (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1188 caratteri), 79,46 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,45 → 0,60 s; pausa dopo «Falso» 0,48 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.

## Le clip di Rosa — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `0b55dd6b-5e06-4b75-a0fc-3124571dd34c` |
| immagine-S1 | `69660083-be43-4f1d-8bcf-8fc7986a003a` |
| immagine-S5 | `148276f5-a1da-4c33-a7ab-63024066c0df` |
| clip-S0 | `8f177632-688e-4e21-870f-401b53a89c4c` |
| clip-S1 | `8c8943c3-2220-4f53-b067-724973f6edeb` |
| clip-S5 | `b414c733-4f9c-4322-8838-c7de24a8dcb5` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «SETTEMBRE · DIRITTO ALLO STUDIO»; il titolo compare parola per parola sulla voce, «studiare,» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia ROSA · Operatrice socio-sanitaria · da dieci anni e la nuvoletta «Studiare? Con i turni non ce la farò mai.»;
- **S5**: «COM'È ANDATA», «ROSA», «Oggi è al secondo anno di università.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 4.64, 1.20-1.45, 1.45-6.18, 9.15-9.40, 9.40-10.63+fermo 1.93, 10.63-10.88, 10.88-17.36.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Non si smette mai di crescere.»).

## La durata

```
S0  hook: la domanda     5,00 s
S1  la storia            9,20 s
S2  il numero            7,88 s
S3  vero o falso        20,96 s
S4  come funziona       15,00 s
S5  com'è andata         6,68 s
S6  cosa fare            8,92 s
S7  firma e contatti     9,00 s
                       -------
                       82,64 s   (il pacchetto stima 78 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 82,64 s |
| montato HeyGen | `e84ddb2e6c595b41926a281aac243203` — **1:22.48** |
| link | https://app.heygen.com/videos/e84ddb2e6c595b41926a281aac243203 |

Scaricato e controllato: 1:22.48 (0,16 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,5 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 1,27 su 255, il massimo 3,81 su S5 (una clip che si muove o un cambio di quadro: HeyGen è qualche fotogramma avanti, il contenuto è lo stesso).

## I costi

| | |
|---|---|
| voce, HeyGen come passante | circa 5 crediti HeyGen (un credito ogni 16,7 s di grezzo, 79 s: il saldo non si legge mese per mese, sullo stesso account lavorava un'altra sessione) |
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
- **Le clip di Rosa vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
