# REGISTRO — Calendario dei diritti 2027 · Novembre 2027 · Tutela contro violenza e molestie

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Chiara,
infermiera di triage · Pronto soccorso. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Chiara (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1251 caratteri), 85,13 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,36 → 0,60 s; pausa dopo «Falso» 0,36 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.
- **Testo corretto** rispetto al pacchetto, per la voce e per i sottotitoli: «chiama la cisl fp» → «chiama la CISL FP».

## Le clip di Chiara — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `3f4769b1-055a-476a-b46d-9fba27cd5d43` |
| immagine-S1 | `1bd297c7-fb80-46e7-aeac-5c3cf21d5b31` |
| immagine-S5 | `d6069997-8542-424a-803c-5f32ad4e4501` |
| immagine-S5-scartata | `08dd11a2-dea0-493c-a69c-ff7e41ac5dd4` |
| clip-S0 | `f111a44c-a79e-45d5-9b93-5c732d0412e8` |
| clip-S1 | `5cac63f8-9a60-4a03-ad5f-dafc86f5be69` |
| clip-S5 | `49aaa1f5-75b5-4bc5-abfe-48b180c82638` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «NOVEMBRE · TUTELA CONTRO VIOLENZA E MOLESTIE»; il titolo compare parola per parola sulla voce, «poi?» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia CHIARA · Infermiera di triage · Pronto soccorso e la nuvoletta «Fa parte del lavoro. No?»;
- **S5**: «COM'È ANDATA», «CHIARA», «Non era sola.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 4.12, 1.20-1.45, 1.45-6.95, 9.95-10.20, 10.20-11.43+fermo 1.89, 11.43-11.68, 11.68-19.43.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Rispetto per chi ti cura.»; «Non sei solo.»).

## La durata

```
S0  hook: la domanda     5,36 s
S1  la storia           10,32 s
S2  il numero           10,00 s
S3  vero o falso        22,44 s
S4  come funziona       12,56 s
S5  com'è andata         8,52 s
S6  cosa fare            8,48 s
S7  firma e contatti     9,72 s
                       -------
                       87,40 s   (il pacchetto stima 81 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 87,40 s |
| montato HeyGen | `ba8375fcdb489b5f80081f59355bc038` — **1:27.23** |
| link | https://app.heygen.com/videos/ba8375fcdb489b5f80081f59355bc038 |

Scaricato e controllato: 1:27.23 (0,17 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,5 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 0,97 su 255, il massimo 2,05 su S5.

## I costi

| | |
|---|---|
| voce, HeyGen come passante | circa 6 crediti HeyGen (un credito ogni 16,7 s di grezzo, 85 s: il saldo non si legge mese per mese, sullo stesso account lavorava un'altra sessione) |
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
- **Le clip di Chiara vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
