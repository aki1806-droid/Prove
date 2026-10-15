# REGISTRO — Calendario dei diritti 2027 · Dicembre 2027 · Pensione e TFS

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Mirella,
ostetrica · 58 anni. 16:9, 1920×1080, 25 fps, senza avatar. Fatto
come febbraio, con gli script comuni di `../calendario-2027-comune/`: qui ci
sono solo i dati del mese.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Mirella (vedi sotto), S3 **rimessa a tempo** sulla voce |
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
1247 caratteri), 80,93 s di grezzo, con i tempi di ogni
parola: nessuna trascrizione.

- **S3**: pausa dopo «Falso» 0,36 → 0,60 s; pausa dopo «Falso» 0,35 → 0,60 s (la regia chiede mezzo secondo dopo ogni «Falso»).
- **S7**: firma rallentata a 0,94×.
- **Testo corretto** rispetto al pacchetto, per la voce e per i sottotitoli: «valuta perseo sirio» → «valuta Perseo Sirio», «prenota l'inas cisl» → «prenota l'INAS CISL».

## Le clip di Mirella — Higgsfield

Tre fotogrammi `gpt_image_2_5` 16:9 (il primo fa da riferimento per il volto
degli altri due) e tre clip Kling 3.0 Pro da 8 s, senza audio, dal fotogramma.
Costo del mese: **36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12).

| | lavoro Higgsfield |
|---|---|
| immagine-S0 | `02ba1649-3884-4b57-be0c-a12c74064727` |
| immagine-S1 | `caea2382-081a-4cf9-84ce-120f404f7592` |
| immagine-S5 | `55109db6-6949-4cc8-afc6-9a801e159b9c` |
| clip-S0 | `9a75d6b0-860d-40c9-91c9-b27f5421a7e1` |
| clip-S1 | `d042e97a-4002-4570-bcda-356bb1d5ebda` |
| clip-S5 | `e8dd72d4-7713-4021-8055-1205214e6343` |

Le clip e le immagini non sono nel repo (le clip pesano): restano nello storico
di Higgsfield e nella cartella locale `protagonista/`.

**I testi di S0, S1, S5 sono rifatti sopra le clip** con i caratteri del
pacchetto (Playfair Display, Montserrat), a sinistra, dove non coprono il volto:

- **S0**: «DICEMBRE · PENSIONE E TFS»; il titolo compare parola per parola sulla voce, «pensione?» in menta con la sottolineatura rossa;
- **S1**: «LA STORIA», la didascalia MIRELLA · Ostetrica · 58 anni e la nuvoletta «Mancano dei periodi di contributi? Non è possibile.»;
- **S5**: «COM'È ANDATA», «MIRELLA», «Ora sa quando potrà andare in pensione.».

## S3 rimessa a tempo

Gli istanti dell'animazione (i due timbri «FALSO» e il cambio di affermazione)
si misurano sul video del pacchetto; la scena si rimonta a pezzi perché ogni
timbro cada sul «Falso» detto. Pezzi del sorgente, in secondi:
0.00-1.20+fermo 4.43, 1.20-1.45, 1.45-7.07, 9.43-9.68, 9.68-10.87+fermo 2.21, 10.87-11.12, 11.12-16.68.

## Musica, mix, sottotitoli

Come febbraio: «Astral Generated Music 271354a0» (libreria HeyGen), 10 dB
sotto la voce con sidechain, la chiusura del brano sull'ultimo fotogramma; mix
a −16 LUFS con un guadagno solo. Sottotitoli col testo del copione e i tempi
della voce, una riga, Inter SemiBold su fascia verde; niente sottotitoli su S0
e sulle frasi della firma già scritte a schermo («Il futuro si costruisce oggi.»).

## La durata

```
S0  hook: la domanda     5,00 s
S1  la storia           10,48 s
S2  il numero            9,60 s
S3  vero o falso        20,96 s
S4  come funziona       12,52 s
S5  com'è andata         9,20 s
S6  cosa fare            9,32 s
S7  firma e contatti     9,00 s
                       -------
                       86,08 s   (il pacchetto stima 82 s)
```

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 86,08 s |
| montato HeyGen | `98da035edb64267ad44945ee763dae7e` — **1:25.91** |
| link | https://app.heygen.com/videos/98da035edb64267ad44945ee763dae7e |

Scaricato e controllato: 1:25.91 (0,17 s meno del montato di prova: HeyGen accorcia di qualche centesimo ogni stacco, video e audio insieme), 1920x1080, audio a −16,6 LUFS. Al centro di ogni scena i fotogrammi coincidono col montato di prova: scarto medio 1,21 su 255, il massimo 2,98 su S1.

## I costi

| | |
|---|---|
| voce, HeyGen come passante | circa 5 crediti HeyGen (un credito ogni 16,7 s di grezzo, 81 s: il saldo non si legge mese per mese, sullo stesso account lavorava un'altra sessione) |
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

Nel pacchetto la battuta di S1 finiva con un carattere che il font non ha (un quadratino al posto della «»» di chiusura). Rifatta sopra la clip, la battuta ora chiude giusta.

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: numeri, norme e date dipendono dal CCNL e dalle leggi in vigore.
- **Le clip di Mirella vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per il calendario: serve il link dove il video sarà
  pubblicato (Facebook, YouTube).
