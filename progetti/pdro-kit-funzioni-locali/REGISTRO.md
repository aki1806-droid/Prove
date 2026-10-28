# REGISTRO — PDRO · «Kit Contratto Funzioni Locali» con Andrea Ricci (reel 9:16)

Data: 28 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetto kit-funzioni-locali-heygen.zip.
Scelte di Achille: voce **HeyGen come passante via API** (clone ElevenLabs di Andrea, eleven_v4); video **provinciale**
(Padova e Rovigo, come il pacchetto); **numeri in lettere nella voce** (a schermo e nei sottotitoli restano in cifre);
montaggio **locale con sottotitoli impressi**. Chiave API come segreto di rete Bearer dell'ambiente (verificato: HeyGen
risponde senza chiave locale).

## Modifica ai testi (autorizzata da Achille il 28/10/2026)
Solo i numeri detti, in lettere (01_testi_voce/; originali in 01_testi_voce/originali/): «ventotto ottobre», «Funzioni
Locali duemilaventicinque duemilaventisette», «dal duemilaventisette», «centocinquantadue», «centoquarantuno»,
«centoventotto», «dal luglio duemilaventisette», «ventiquattro mesi».

## Voce
«ANDREA RICCI» 8c0895c218bf43a69dcaa14e0f78bc96 (clone ElevenLabs, non il TTS di HeyGen), POST /v3/voices/speech engine
elevenlabs eleven_v4, una traccia con i nove blocchi uniti da pause di 1,6 s: request 6sEsyB1oXuINpRbBHluX, grezzo 98,2 s.
Tagli ../strumenti/kitlocali/voci.py: Andrea parla già svelto (18 caratteri al secondo contro 15,7 di Achille), quindi
niente atempo, solo pause >0,6 → 0,45 s. 9 blocchi su 9, parole uguali ai testi.
S02 17,3 · S03 10,9 · S04 9,9 · S05 10,4 · S06 11,4 · S07 7,5 · S08 9,8 · S09 7,5 · S10 7,1 s.

## Avatar
ANDREA RICCI, photo avatar 20b42026236c4145a4c3cdb6a7cdb9ae, via API: le tre scene in camera (S02, S08, S10) in fila con 0,6 s
di pausa (audio/voce-avatar.mp3, asset 9272f3d33d1f463b9628b835c2c87ae6), 9:16 1080p cover: video
886c293beac90c9c278b80924f8d04d5. Labiale 20 ms. A schermo pieno, nessuna grafica sopra. La foto è un selfie ravvicinato: il
cartello CGIL che c'è dietro nella foto resta fuori dall'inquadratura verticale (controllato su tutto il video).

## Montaggio (../strumenti/kitlocali/monta.py)
Scene e file del pacchetto, tagli netti: copertina 3 s e chiusura con il QR 10 s mute; slide con un respiro di zoom del 3%;
le due clip (6 e 7 s, si animano e poi stanno ferme) allungate tenendo l'ultimo fotogramma. Sottotitoli impressi nella
fascia bassa (Inter SemiBold bianco su riquadro nero, due righe al massimo), tempi delle parole vere, numeri in cifre;
anche sottotitoli.srt. Nessuna musica.

## Uscita
PDRO_Kit_Contratto_Funzioni_Locali_9x16.mp4: 1080x1920, 25 fps, 104,7 s, 53 MB (fuori da git); copia d'invio 28 MB mandata in
chat. Verificati: file integro, SAR 1:1, foglio di contatto, labiale, −18,8 LUFS. Originale su HeyGen (API): asset
8094015fdc7c424a8690f98ba3e52be3 — https://resource2.heygen.ai/video/8094015fdc7c424a8690f98ba3e52be3/original.mp4
Portafoglio API: 37,23 → 35,68 $ (voce 0,20, avatar e caricamenti il resto).

## Da fare (Achille)
- Il copione è in prima persona a nome di Andrea: farlo rileggere a lui (lo chiede il pacchetto).
- Il QR della chiusura porta a https://form.getformly.com/f/hwY169: controllarlo.
- La clip dei diritti (S06, del pacchetto) mostra il volto di una bambina: lasciata com'è.
- Musica: copertina e chiusura sono mute apposta, la aggiungi tu.

## Versione 2 — 28/10/2026, richiesta di Achille: «l'avatar lo voglio scontornato in basso a destra come sempre» e «non mi piace la punta della bandiera»
- Avatar rifatto via API in webm con alfa (stesso audio, asset 9272f3d33d1f463b9628b835c2c87ae6): video
  f8f21310c2ac28faa6b54596ccff9252, 1920x1080 (il primo, a schermo pieno, è in avatar/v1/ con il montato v1, fuori da git).
- La foto di Andrea ha una bandiera CISL dietro la testa e lo scontorno se la portava via: ../strumenti/kitlocali/pulisci_avatar.py
  la toglie fotogramma per fotogramma (sopra la cima della testa tutto trasparente; sotto, i pixel bianchi, azzurrini e
  verdi della base della bandiera; l'asta e i pezzi staccati dalla sagoma), bordo dei capelli ammorbidito →
  avatar/avatar_pulito.mov (ProRes 4444, 920x1080).
- Scene di Andrea (S02, S08, S10): Andrea in basso a destra (640 px, alone chiaro come nei reel PDRO); dietro una foto del
  pacchetto con zoom lento, sfumatura verde in basso e logo (S02 e S10 la piazza della copertina, S08 la scrivania della
  busta paga); sottotitoli di queste scene alzati sopra l'avatar (y 1250).
- Montato v2: 104,7 s, 29 MB, file integro, SAR 1:1; copia d'invio 27 MB mandata in chat. Originale su HeyGen (API): asset
  7540192f15464e6295690ad8e9ab5fde — https://resource2.heygen.ai/video/7540192f15464e6295690ad8e9ab5fde/original.mp4
  (sostituisce 8094015fdc7c424a8690f98ba3e52be3). Portafoglio API dopo la v2: 34,33 $.

## Versione 3 — 28/10/2026, richiesta di Achille: «aggiungi la musica sulla copertina e sulla chiusura e elimina i sottotitoli»
- Sottotitoli non più impressi (monta.py IMPRESSI = False); resta sottotitoli.srt a parte, non inviato.
- Musica (../strumenti/kitlocali/musica.py) solo sulle due scene mute: traccia del catalogo HeyGen «corporate inspirational,
  modern, optimistic» (e21d6bf3f9a6438a9192be6fab09941a, royalty-free): l'inizio sulla copertina (0-3 s, dissolvenza in
  uscita), dal dodicesimo secondo della traccia sulla chiusura con il QR (ultimi 10 s, dissolvenze). Volume 0,42: copertina
  −24,6 LUFS, chiusura −22 (voce −18,8).
- Montato v3: 104,7 s, 29 MB, file integro; copia d'invio mandata in chat. Originale su HeyGen (API): asset 128067d561254cf1847b2e9dcb56dbbd —
  https://resource2.heygen.ai/video/128067d561254cf1847b2e9dcb56dbbd/original.mp4 (sostituisce 7540192f15464e6295690ad8e9ab5fde).

## Versione 4 — 28/10/2026, richieste di Achille
«In apertura bisogna dire che oggi 28 ottobre si è firmato il contratto», «in un passaggio dico 128 anziché 138», «al termine
concluderei con un augurio di buon lavoro e un caro saluto». Testi cambiati (autorizzati; scelte confermate da Achille):
- S02: «… Oggi, ventotto ottobre, all'ARAN si è firmato in via definitiva il nuovo contratto delle Funzioni Locali …»
- S04: la slide dà +127,63 € agli istruttori e +138,52 € ai funzionari: scelto l'esempio sul funzionario, «Un funzionario,
  per esempio, avrà quasi centotrentanove euro lordi in più al mese.»; tolta la frase dei 141 € (era dell'istruttore).
- S10: «… Richiedi il kit e giralo ai colleghi. Buon lavoro a tutti, e un caro saluto.»
Voce solo di S02, S04, S10 (../strumenti/kitlocali/v4.py, stessa voce di Andrea, eleven_v4 via API, request
zEJgNqLidDj4Cs4MjKEW, 34,4 s; parole uguali ai testi): S02 18,3 s · S04 5,3 · S10 9,5. Avatar rifatto via API in webm
(S02+S08+S10, 38,8 s): video b76072b179af3cfe8fa0f9b05e069b31; stavolta HeyGen lo ha restituito già stretto su Andrea
(1080x1286 invece di 1920x1080): pulisci_avatar.py legge la misura e toglie anche l'asta della bandiera attaccata alla
spalla. Labiale 0 ms. File della v3 in avatar/v3/.
Montato v4: 103,5 s, 29 MB, integro, SAR 1:1, −18,4 LUFS, mandato in chat. Originale su HeyGen (API): asset
f8c7e156965f4169a92cc82e52bae5e0 — https://resource2.heygen.ai/video/f8c7e156965f4169a92cc82e52bae5e0/original.mp4
(sostituisce 128067d561254cf1847b2e9dcb56dbbd). Portafoglio API: 32,33 → 30,78 $.

## Versione 4b — 28/10/2026, richiesta di Achille: «vorrei inserissi anche queste» (due slide: «Quanto aumenta davvero il mio stipendio?» e «I tuoi arretrati»)
- Messe in S03, dove la voce ne parla (../strumenti/kitlocali/v4.py inserti): S03a clip dei numeri del pacchetto («Gli
  aumenti arrivano a regime dal duemilaventisette:», 2,65 s); S03b l'infografica («in media centocinquantadue … negli altri
  enti.», voce 5,1 s + 3 s ferma); S03c gli arretrati («E gli arretrati medi superano i mille euro.», 3,2 s + 2 s).
  Portate a 9:16 senza tagliarle (infografica larga 1080 su fondo verde, arretrati su avorio): 02_slide/video-s03b-*,
  video-s03c-*; originali in 05_extra/originali_achille/. Nessuna voce nuova.
- Montato v4b: 108,5 s, 34 MB, integro, −18,4 LUFS; copia d'invio 28 MB mandata in chat. Originale su HeyGen (API): asset
  4c9d295f53304b08bc7cd38b88f4f89f — https://resource2.heygen.ai/video/4c9d295f53304b08bc7cd38b88f4f89f/original.mp4
  (sostituisce f8c7e156965f4169a92cc82e52bae5e0).
- Da guardare: la clip dei numeri del pacchetto (c03, ora solo 2,65 s) mostra «102 €» in media negli altri enti e
  «1.136 €» di arretrati, mentre la voce e l'infografica dicono 141 €.
