# REGISTRO — «Sentirsi per sentire», video della colonna sonora (24 novembre 2026)

Data: 30 ottobre 2026 · sessione Claude Code (repo Prove). Richiesta di Achille: la canzone «Sentirsi per sentire»
(Suno, 250,8 s, audio/Sentirsi_per_sentire_colonna_sonora.mp3, fuori da git) come colonna sonora dell'evento, un video
commovente con immagini e clip significative, in chiusura Luca Ward con parole da brividi e l'invito all'evento; poi
«le immagini e le clip creale da capo con Higgsfield, tutto estremamente emozionante e originale».
Scelte di Achille: voce di Ward **via HeyGen come passante**, pubblico **provinciale**, **due versioni** (lunga 16:9 sulla
canzone intera per la proiezione all'evento e YouTube, reel 9:16 per i social), testo di Ward approvato parola per parola.

## Testo di Luca Ward (approvato il 30/10/2026)
«C'è un silenzio che fa più rumore di un grido. È il silenzio di chi ha smesso di ascoltarsi. Di chi ripete "va tutto
bene", anche quando niente va bene. Ma nessuna voce si spegne per sempre, se qualcuno resta ad ascoltarla. Il ventiquattro
novembre, al Patronato dell'Arcella, a Padova, ci ritroviamo per questo: per sentirci, e per sentire. Vieni. Il tuo posto
ti aspetta.»
Voce e4bd8d8a357f41a99502309874733c16, eleven_v4 via API HeyGen (../strumenti/sps/voce_ward.py), request
u7rsy8KjqIcOVAtvMB90, 27,3 s, 65 parole su 65; pause di regia fra le frasi (<break>), solo le pause oltre 1,2 s → 0,9 s.

## Immagini e clip (tutte nuove, Higgsfield)
40 immagini 16:9 + 12 verticali (GPT Image 2.5, 0,25 crediti l'una), poi animate con Kling 3.0 std senza audio (5 s,
6,25 crediti l'una): 52 clip, 1280x716 e 716x1280. Registro con gli id: immagini.json, clip.json (strumenti/sps/registra.py).
Il racconto segue la canzone: la solitudine (finestra con la pioggia, lacrima, cucina di notte, anello, telefono,
specchio appannato, infermiera nel corridoio) → l'ascolto di sé (mano sul petto, tende nel sole, mare all'alba, orecchio,
sorriso allo specchio) → le altre donne (portici sotto la pioggia, sedia vuota, nonna che lavora a maglia la lana rossa,
lettera, madre e figlia di spalle nel grano, mani al caffè, tè passato di mano) → la liberazione (nodo rosso che si scioglie,
porta che si apre sulla luce, strada all'alba, corsa sulla spiaggia, colombi in volo, giardino) → la luce che passa (fiammifero,
candela che accende candela) → la comunità (piazza di candele, donne a braccetto sotto i portici, mani in cerchio, filo
rosso fra le mani, mani di nonna e nipote, sedie in cerchio con lo scialle rosso, la donna che si siede) → l'abbraccio e il
sorriso fra le lacrime → con Ward: Padova all'alba (Basilica del Santo), la mano sulla spalla, le donne sulla collina.
Nessun volto di bambini (la bambina nel grano solo di spalle), nessun volto ferito. Una clip (21, la porta) fallita una
volta su Higgsfield e rifatta. Crediti Higgsfield: 590 → 252.

## Montaggio (../strumenti/sps/monta.py)
- Lunga 16:9: canzone intera; 40 inquadrature tagliate sulle sezioni della canzone (intro 0-16, strofe 16-52, ritornello
  52-82, strofa 82-116, ritornello 116-158, ponte 158-172, ritornello 172-204, pausa 204-216, finale 216-230, coda di
  pianoforte da 230 con Ward). Dissolvenze di 0,8 s, clip rallentate con il flusso ottico fino alla loro durata, colore dal
  freddo e desaturato al caldo. Titolo «Sentirsi per sentire» in dissolvenza sul filo rosso (9-15 s).
- Cartelli della campagna (pdro-brividi-24-novembre/cards S3) agganciati alle parole di Ward: info su «Il ventiquattro
  novembre», titolo su «per sentirci, e per sentire», prenotazione con QR su «Il tuo posto ti aspetta» (5 s), poi la firma
  con il 1522.
- Reel 9:16: terzo ritornello (172-204) e finale (216-250,8) uniti con dissolvenza, 12 inquadrature verticali, poi Ward e
  i cartelli 9:16.
- Musica: sotto Ward scende di ~5 dB (prima prova a −9 dB: il pianoforte spariva, 18 dB sotto la voce; ora Ward resta
  ~14 dB sopra); dopo l'ultima nota la ripresa del finale di pianoforte (232-250,8) accompagna i cartelli. Uscite −16 LUFS.

## Uscite (integre, SAR 1:1, −16 LUFS; fuori da git; copie d'invio 28 MB mandate in chat)
| Video | Formato | Durata | Asset HeyGen |
|---|---|---|---|
| PDRO_Sentirsi_per_sentire_colonna_sonora_16x9 | 1920x1080 | 4:26 | 50c51104419d46788b9db1d57303c718 |
| PDRO_Sentirsi_per_sentire_colonna_sonora_9x16 | 1080x1920 | 1:20 | 41dfea6ecb6e4a03b1cffca7c2c0eaa6 |
(https://resource2.heygen.ai/video/<asset>/original.mp4)

## Da fare (Achille)
- Liberatoria dei genitori di Louis Huang (il suo nome è nel cartello info).
- Se va pubblicato su Robin: dimmi data e ora (il calendario della campagna è pieno fino al 25/11).

## Versione 2 — 31/10/2026, richieste di Achille
«Alterna immagini e clip e usa anche HeyGen per animare delle immagini» e «la voce alla fine è tagliata e non si sente».
- **Voce tagliata (difetto della v1, solo nella versione lunga):** il missaggio finiva con la canzone (250,8 s) mentre il video
  durava 266,4 s, e Ward si interrompeva a «per sentirci»; ripresa del pianoforte persa. Corretto in monta.py (ogni ramo
  audio allungato fino alla fine del video): ora l'audio dura quanto il video e Ward arriva fino a «Il tuo posto ti
  aspetta» (256-258 s), poi il pianoforte sui cartelli. Il reel non aveva il difetto.
- **Alternanza:** in entrambe le versioni clip e immagini ferme si alternano sempre. Lunga: 15 clip Kling, 6 clip HeyGen,
  19 immagini ferme con un lento movimento di macchina (in PIL, al sottopixel; avvicinamento o allontanamento e una leggera
  deriva laterale); reel: 3 Kling, 3 HeyGen, 6 ferme.
- **HeyGen:** 9 immagini animate con heygen-video-1 via API (`POST /v3/models/videos`, mode image_to_video, 1080p, 5 s; il
  connettore era senza crediti): lacrima, mare all'alba, nonna che lavora a maglia, corsa sulla spiaggia, abbraccio, donne
  sulla collina (16:9) e lacrima, abbraccio, collina (9:16). 0,20 $ l'una (1,80 $), id in clip_heygen/id.json;
  ../strumenti/sps/anima_heygen.py e la nuova funzione `anima` di ../strumenti/heygen_api.py.
- Uscite v2 (integre, −16 LUFS, audio = video): 16:9 4:26 asset 30243e09b4744a91b9fa3dbff6fec55e · 9:16 1:20 asset
  202189b31dd544019c3dba86e6b42117 (sostituiscono 50c51104… e 41dfea6e…). Portafoglio API: 17,12 $.
