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
