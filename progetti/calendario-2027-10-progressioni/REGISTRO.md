# REGISTRO — Calendario dei diritti 2027 · Ottobre 2027 · Progressioni economiche

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Giorgio,
assistente amministrativo · da dodici anni. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Giorgio (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1266 caratteri), 83,96 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,39 → 0,60 s; pausa dopo «Falso» 0,39 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.

## Le clip di Giorgio — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `00ba15f7-4d3a-4610-a1a6-583b05504583` |
| immagine-S1 | `58d8ac39-a6fb-4fe7-91bf-3e00ed10f7ad` |
| immagine-S5 | `2ea7fd2a-0925-4c5e-a293-b1e8f80d94e2` |
| clip-S0 | `be4fd0a7-89fe-4414-899d-d5c206228166` |
| clip-S1 | `a7d40271-6fc3-470d-a67a-c01a95826eaf` |
| clip-S5 | `13394f94-4c66-4106-b1d8-dcd2985bf06f` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «OTTOBRE · PROGRESSIONI ECONOMICHE»; il titolo compare parola per parola sulla voce, «stipendio,» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia GIORGIO · Assistente amministrativo · da dodici anni e la nuvoletta «Non sapevo nemmeno che si potesse.»;
- **S5**: «COM'È ANDATA», «GIORGIO», «È entrato in graduatoria.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 4.12, 1.20-1.45, 1.45-6.76, 9.95-10.20, 10.20-11.43+fermo 2.37, 11.43-11.68, 11.68-18.86.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Un passo alla volta, verso l'alto.»).

## La durata

```
S0  hook: la domanda     5,04 s
S1  la storia           10,20 s
S2  il numero            9,40 s
S3  vero o falso        22,16 s
S4  come funziona       12,48 s
S5  com'è andata         8,00 s
S6  cosa fare            9,80 s
S7  firma e contatti     9,68 s
                       -------
                       86,76 s   (il pacchetto stima 83 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 86,76 s |
| montato HeyGen | `cfd8a7589568c9831b8dc8693144dc44` — **1:26.59** |
| link | https://app.heygen.com/videos/cfd8a7589568c9831b8dc8693144dc44 |

Scaricato e controllato: 1:26.59 (0,17 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,6 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 3,14 su 255, il massimo 13,85 su S5 (una clip che si muove o un cambio di quadro: HeyGen è qualche fotogramma avanti, il contenuto è lo stesso).

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

## Verifica sul CCNL Funzioni Locali 2022-2024

Il video usa «differenziale economico», la parola della Sanità; nelle Funzioni Locali si chiama «differenziale stipendiale» (art. 14). Criteri e graduatorie in contrattazione sono confermati; la fase transitoria in cui l'esperienza compensa il titolo è prorogata al 31 dicembre 2026 (art. 12). Il controllo completo, mese per mese, è in
`../calendario-2027-comune/VERIFICA-CCNL-FL.md`.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di Giorgio vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
