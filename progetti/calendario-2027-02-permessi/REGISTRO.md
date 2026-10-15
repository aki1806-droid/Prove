# REGISTRO — Calendario dei diritti 2027 · Febbraio · Permessi e festività soppresse

Video del mese per il calendario CISL FP Padova Rovigo. Protagonista Marco,
impiegato comunale del Polesine, che per le visite mediche usa le ferie. 16:9,
1920×1080, 25 fps, senza avatar. Il pacchetto di partenza (`pacchetto/`) porta
le otto scene già fatte e mute, i testi della voce con le note di regia, i
prompt Higgsfield per le clip del protagonista e le istruzioni per HeyGen Studio.

## Che cosa si è fatto, rispetto al README del pacchetto

| README | qui |
|---|---|
| scene da S0 a S7, in ordine | ✓ le otto scene; **S0, S1, S5 rifatte** sulle clip di Marco (vedi sotto), S3 **rimessa a tempo** sulla voce |
| voce «Luca Ward (V4)» | ✓ la voce clonata che si chiama così (non è la voce di Luca Ward, ma una simile), eleven_v4, italiano, **via HeyGen come passante** |
| la scena segue la durata della voce | ✓ voce + 0,5 s prima (0,6-0,7 su S0-S1) e 0,9 s dopo (2,5 s sulla firma finale) |
| sottotitoli | ✓ **impressi nel video** e anche in `sottotitoli.srt` |
| musica leggera | ✓ la stessa di gennaio, sotto la voce |
| esporta 1080p | ✓ montato in HeyGen, 1080p |
| clip Higgsfield del protagonista | ✓ **fatte**: tre, per S0, S1 e S5 |
| QR del link a pagina 5 | **da fare**: serve il link pubblico |

## La voce — HeyGen come passante

Chiesto ad Achille prima di cominciare, come vuole `CLAUDE.md`: scelta **HeyGen
come passante** (`create_speech`, `engine: "elevenlabs"`, `eleven_v4`). Gennaio
era stato fatto con ElevenLabs diretto. Il calendario è un prodotto a sé, un
video al mese, non un corso: la regola di non mescolare le due sorgenti nello
stesso corso qui vale mese per mese.

- **Una traccia sola** (`voce-testo.txt`, 1.345 caratteri) con una pausa
  `<break time="2.0s"/>` fra le scene: il costo si arrotonda a ogni chiamata.
- **Costo: 5 crediti HeyGen** (saldo 6.124 → 6.119) per 89 s di grezzo.
- **Nessuna trascrizione**: HeyGen restituisce i tempi di ogni parola. `voce.py`
  taglia la traccia al centro dei silenzi veri vicini alle sette pause lunghe.
- **S3, «Vero o falso»**: la regia chiede mezzo secondo dopo ogni «Falso». La
  `<break 0.5s>` è uscita più corta (0,36 e 0,41 s misurati): portata a 0,6 s.
- **S7, firma finale lenta**: `atempo 0,94`. Il parametro `speed` di HeyGen
  viene ignorato, come già misurato sul corso LNV.

Durata della voce per scena: S0 2,20 · S1 6,86 · S2 7,40 · S3 20,65 ·
S4 13,78 · S5 8,73 · S6 9,95 · S7 7,87 s. Totale 77,44 s.

## Le clip di Marco — Higgsfield

Nel pacchetto S0, S1 e S5 mostravano la foto del calendario: una donna con un
bambino, non Marco. Su via di Achille («Genera le tre clip», qualità Pro):

- **tre fotogrammi** con `gpt_image_2_5`, 16:9; il primo fa da riferimento per
  il volto degli altri due (`marco/marco-S0.png`, `-S1`, `-S5`);
- **tre clip** con Kling 3.0 Pro, 8 s, senza audio, dal fotogramma iniziale;
- **costo: 36,75 crediti Higgsfield** (3 × 0,25 + 3 × 12). Il primo tentativo
  è stato rifiutato per il limite giornaliero del periodo di prova, senza
  addebito. Riprovato su via di Achille, è passato.

Le clip non sono nel repo (31 MB): restano nello storico di Higgsfield e nella
cartella locale `marco/`.

**I testi delle tre scene sono stati rifatti sopra le clip** (`monta.py`): le
scene del pacchetto avevano i testi impressi dentro, e sulla clip sarebbero
caduti sul volto di Marco. Si sono riscritti a sinistra, su un velo verde, con
i caratteri del pacchetto (Playfair Display e Montserrat, licenza OFL, in
`font/`). Il logo resta in alto a destra.

- **S0**: «FEBBRAIO · PERMESSI E FESTIVITÀ SOPPRESSE»; il titolo compare
  parola per parola insieme alla voce, «permesso» in menta con la sottolineatura
  rossa animata.
- **S1**: «LA STORIA», la didascalia MARCO · Impiegato comunale · Polesine e la
  nuvoletta «Per le visite uso le ferie. Come tutti, no?».
- **S5**: «COM'È ANDATA», «MARCO», «Le sue ferie tornano a essere vacanza.»

## S3 rimessa a tempo

Le grafiche di S3 erano montate sulla durata stimata del pacchetto: i timbri
«FALSO» arrivavano prima della parola. Si è rimontata la scena a pezzi,
fermando o tagliando 0,25 s prima di ogni evento, così che **ogni timbro cade
sul «Falso» detto**: il primo, «Secondo» e il secondo «Falso».

## Musica, mix, sottotitoli

- **Musica**: «Astral Generated Music 271354a0», libreria HeyGen, la stessa di
  gennaio. Il video è più lungo del brano (70 s): un secondo passaggio entra in
  dissolvenza a 50 s, così la chiusura del brano cade sull'ultimo fotogramma.
- **Mix**: musica 10 dB sotto la voce, con sidechain. **−16 LUFS** con un
  guadagno solo e un limitatore, picco −1,5 dBFS.
- **Sottotitoli**: testo del copione, tempi della voce, una riga, Inter
  SemiBold su fascia verde. **31 su 34 impressi**: si saltano S0 e le prime due
  frasi della firma, che sono già scritte nella grafica.

## La durata

```
S0  hook            5,00 s
S1  la storia       8,88 s
S2  il numero       8,80 s
S3  vero o falso   22,04 s
S4  come funziona  15,20 s
S5  com'è andata   10,28 s
S6  cosa fare      11,36 s
S7  firma          10,88 s
                   -------
                   92,44 s   (il README stima 86 s)
```

S3 e S4 sono più lunghe della stima perché la voce vera è più lenta di quella
stimata, e S3 ha le pause dopo i «Falso».

## Il montato

| | |
|---|---|
| montato di prova | `montato-locale.mp4` — 92,44 s |
| montato HeyGen | `090b76809648a8dc9863313ecf6bd8e7` — **1:32.26** |
| asset caricati | 16 (8 scene + 8 tracce) in un lotto |

Render in 26 s. Scaricato e controllato: 1920×1080, audio stereo a −16,5 LUFS.
A metà e alla fine di ogni scena i fotogrammi coincidono col montato di prova.
Lo scarto medio è sotto 2,3 su 255. Su S5 è 8,5, perché la clip si muove e il
render è qualche fotogramma avanti.

HeyGen accorcia ogni stacco di circa 23 ms. In tutto fanno 0,17 s, gli stessi
di gennaio. Video e audio si accorciano insieme: sottotitoli e voce restano
allineati.

**Costo del render**: non isolabile. Fra la voce e la fine il saldo è sceso da
6.119 a 6.028, ma nella stessa ora un'altra sessione ha montato tre lezioni da
10 minuti del corso SFL sullo stesso account. Sul corso il render è costato 1
credito.

## Gli strumenti

```
python3 voce.py         la voce HeyGen tagliata scena per scena, audio/voce/voce.json
python3 monta.py        scene (S0, S1, S5 sulle clip; S3 a tempo), mix, sottotitoli,
                        montato-locale.mp4, SRT, scene.json
python3 heygen.py prepara | invia | scene
```

## I costi

| | |
|---|---|
| voce, HeyGen come passante | 5 crediti HeyGen |
| clip di Marco, Higgsfield | 36,75 crediti Higgsfield |
| render HeyGen | non isolabile (sul corso: 1 credito) |

## Da verificare — quello che non ho potuto giudicare io

- **I contenuti vanno fatti verificare all'ufficio vertenze**, come dice il
  pacchetto: ore di permesso, festività soppresse e regole di S2-S4 dipendono
  dal CCNL applicato.
- **Le clip di Marco vanno guardate**: il volto è coerente fra le tre, ma è
  generato, e va giudicato da un occhio umano prima di pubblicare.
- **La musica va ascoltata**: è dosata a misura, non a orecchio.
- **Il QR del video** per la pagina 5 del calendario: serve il link dove il
  video sarà pubblicato (Facebook, YouTube). Con quello lo genero.
