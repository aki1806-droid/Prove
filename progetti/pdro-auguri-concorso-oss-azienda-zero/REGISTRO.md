# REGISTRO — PDRO · «In bocca al lupo OSS Azienda Zero» (reel 9:16)

Data: 26 ottobre 2026 (vigilia della prova) · sessione Claude Code (repo Prove). Testi voce del pacchetto non modificati
(nessun numerale; a voce sempre «operatori socio sanitari», mai la sigla).
Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; video **provinciale** (CISL FP Padova
Rovigo, come il pacchetto); clip **generate da Claude**, **niente musica**.

## Voce
«Achille nuovo 1» (9b851842ce54449fb9ff501751ca0271), create_speech elevenlabs eleven_v4, una traccia con i sette blocchi
uniti da pause di 1,6 s: request fpiWGsbomwwMmRhLO8pM, grezzo 103,3 s. Tagli ../strumenti/auguri/voci.py (pause >0,45 → 0,35 s,
atempo 1,16): 7 blocchi su 7 giusti, parole uguali ai conteggi del pacchetto.
S01 12,3 · S02 12,9 · S03 13,2 · S04 11,9 · S05 10,7 · S06 10,6 · S07 11,3 s — totale 82,9 s (stima del pacchetto ~1'40").

## Avatar
«Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e), webm con alfa su tutta la voce (audio asset
fd80e7dd6f7e4e519a07bcdb50f99bcc): video 256b408ea628ac65383aaf60cc068126, 1280x714. Sempre in basso a destra, con l'alone chiaro
dei reel PDRO. Labiale verificato: 0 ms.

## Immagini e clip
Immagini Higgsfield gpt_image_2_5 9:16 2K (img/), tutte senza volti. Clip HeyGen image-to-video heygen-video-1 1080p:
- S02 cucina (asset 23446557664545b08b793149d2f10921): clip 5589c6268da340e08a69c36427679093 **scartata**, perché dal quinto
  secondo la ragazza si gira e il volto si vede di profilo in primo piano; i crediti HeyGen per le clip erano finiti, quindi la
  scena usa l'immagine ferma di spalle con uno zoom lento dell'8% (clip/S02_scartata_volto.mp4 resta fuori da git).
- S04 ingresso (asset 1895aa5a8ee24856a0b5267117d72321): 94286d3df1a8434b815e52eb98c17a98, 12 s.
- S06 corridoio (asset e79a08c5bfaa4914a72b2f00a7ff0a89): 94dae15604554478bb8a3bb99367de62, 11 s.
Dominante verde in post, bande del pacchetto sopra, nessun audio delle clip.

## Montaggio
../strumenti/auguri/monta.py: alternanza del pacchetto (slide/clip), tagli netti a fine blocco, slide del pacchetto con un
respiro di zoom del 3%, logo CISL FP Padova Rovigo in alto a sinistra, avatar in basso a destra. Nessuna musica, nessun
sottotitolo impresso (sottotitoli.srt a parte).

## Uscita
PDRO_In_bocca_al_lupo_OSS_Azienda_Zero_9x16.mp4: 1080x1920, 25 fps, 82,9 s, 92 MB (fuori da git); copia d'invio 28 MB mandata in
chat. Verificati: file integro, SAR 1:1, foglio di contatto, labiale. Originale su HeyGen: asset bf92910bbf844fa4949f212313b70841 —
https://resource2.heygen.ai/video/bf92910bbf844fa4949f212313b70841/original.mp4
Testo del post: TESTO_POST.md del pacchetto (invariato).

## Da fare (Achille)
- Musica leggera sotto la voce, se la vuoi: il pacchetto la chiede, non l'ho aggiunta.
- La scena 2 è un'immagine ferma con zoom (vedi sopra): con crediti HeyGen si può rifare la clip.
