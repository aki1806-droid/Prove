# REGISTRO — PDRO · serie «CCNL Funzioni Locali 2025-2027» con Andrea Ricci (reel 9:16), video 01-04

Data: 30 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetti 01-04 dei 19 della serie (00_INDICE_PACCHETTI.md);
in ogni cartella: script completo, testo avatar, testi a schermo, lista clip, storyboard, checklist.
Scelte di Achille: voce **HeyGen come passante** (clone ElevenLabs di Andrea, eleven_v4), pubblico **provinciale**
(CISL FP Padova Rovigo: comuni, unioni, consorzi, case di riposo), clip **Higgsfield**, **nessun sottotitolo impresso**
(il pacchetto li chiedeva karaoke: si è seguita la scelta del Kit; sottotitoli.srt a parte in ogni cartella).
Testi del pacchetto usati così come sono (i numeri detti sono già in lettere nel testo avatar).

## Voce (../strumenti/ccnlfl/voci.py)
«ANDREA RICCI» 8c0895c218bf43a69dcaa14e0f78bc96, POST /v3/voices/speech engine elevenlabs eleven_v4. La traccia intera di
un video (2.100 caratteri) tornava HTTP 502 per due volte: ogni video in due tracce (scene 1-4 e 5-7), blocchi uniti da
pause di 1,6 s. Request: 01 Dt5eSFVLwqFQ7fkOPT5d + IRTAj3jZX2xQx9VCLCM1 · 02 sNzBdpNjIr2yxQJqWbKi + E7JSamcKkDX5ktIooVNF ·
03 pfeE0bi0ZrD8dUAX380u + sHdvHe856rDHhfHgb4Kp · 04 411TAP0lUYwIhlPX2MH7 + y5SGq6hMOVt5jESMvfyi. Tagli profilo
«narratore» (pause > 0,6 s → 0,45 s, niente atempo, come nel Kit). 28 blocchi su 28, parole uguali ai testi.

## Avatar (../strumenti/ccnlfl/avatar.py)
Photo avatar ANDREA RICCI 20b42026236c4145a4c3cdb6a7cdb9ae (stesso look del Kit, uguale in tutta la serie), un render per
video in webm con alfa sulla voce intera in fila (0,3 s in testa, 0,3 s fra le scene, 2,5 s di silenzio in coda perché
non si fermi sulla chiusura): 01 dfe01f30147f035f2ac0e457a4d19242 · 02 b962a68c02aa801de88b3fba14b1eabf ·
03 580dc69183f99a1afcab416117d5f274 · 04 b5d00c80ce784f9bb8599578c1c4f677. Bandiera dietro la testa tolta con
../strumenti/kitlocali/pulisci_avatar.py, ora con uscita VP9 con alfa (`webm`): il ProRes di due minuti superava i 2 GB.
Labiale 0 ms su tutti e quattro (voce contro il render HeyGen).

## Clip (Higgsfield seedance_2_5, 9:16, 5 s; clip/, fuori da git)
01: c101 municipio dal basso con le bandiere · c103 mani che sfogliano un fascicolo · c105 sportello in controluce (di
spalle). 02: c201 cedolino controluce · c204 ufficio tecnico sulla planimetria (solo mani e busti) · c206 tavolo dall'alto
(mani, documenti, bicchieri). 03: c301 busta paga che si apre · c304 mano che posa la penna · c307 sportello, due persone di
spalle (rifatta: nella prima, c306, si vedeva il volto dell'impiegato). 04: c401 operaio di spalle che scarica il furgone ·
c403 magazzino con attrezzi · c406 squadra che carica il furgone, in controluce. Nessun volto riconoscibile, nessuna targa,
nessun minore.

## Montaggio (../strumenti/ccnlfl/monta.py e grafica.py)
Ogni fotogramma composto in PIL a 1080x1920, 25 fps. Scene sulla voce (ognuna comincia 0,15 s prima della sua frase).
- Concept per video: 01 il filo arancio a quota fissa che diventa linea del tempo, pastiglie e cerchio della chiusura;
  02 blocchi tridimensionali con ombra a 45° (+150 € che cade, contatori 988 milioni e +5,78 %, la scala 45/91/150 €,
  i due contratti che si fondono in «circa 300 €»); 03 il foglio grigio, le spunte a mano, la lente arancio che scorre
  sulle quattro righe degli arretrati sincronizzata con il parlato, il tratteggio che esce dal quadro; 04 stencil per
  strati, gradini di metallo e di legno, freccia a scatti, cassette degli attrezzi con contatore meccanico, cornice
  verniciata in quattro tratti.
- Clip gradate in verde (colorchannelmixer + colorbalance), grana, vignettatura, sempre in movimento (rallentate al più ×2
  con il flusso ottico, poi push-in lento); nelle scene della posizione sindacale di 02, 03, 04 la clip rallenta fino a
  fermarsi sull'ultima frase (e desatura sul fermo).
- Andrea scontornato in basso a destra con ombra verso sinistra: grande (45 %) in apertura, posizione sindacale e chiusura,
  40 % sulle clip, 30 % sulle slide con i dati; cambi di misura in 0,5 s. Logo in alto a sinistra nel riquadro bianco.
  «Importi lordi» in sovrimpressione su tutte le scene con cifre. Stacchi a wipe diagonale di 5°.
- I simboli → e ≈ non ci sono nel Montserrat: frecce disegnate, «circa» al posto di ≈.
- Musica: catalogo HeyGen bd1338ccee9945db87623cc9a9c24611 «calm light piano ambient, professional corporate» (186 s,
  nessun loop), volume 0,32 e −11 dB sotto la voce. Uscite a −16 LUFS, picco ≤ −1 dBFS.
- 01 rimontato una volta: la data d'apertura a 110 px usciva dal margine destro (ora 96 px) e la seconda riga della CTA
  finiva dietro Andrea (chiusura alzata).

## Uscite (1080x1920, 25 fps, integre, SAR 1:1, −16 LUFS; fuori da git; copie d'invio 28 MB mandate in chat)
| Video | Durata | Asset HeyGen |
|---|---|---|
| PDRO_CCNL_FL_01_Firmato_in_vigenza_9x16 | 124,1 s | 6c9705f0ffdd454c9f2500293fde7757 |
| PDRO_CCNL_FL_02_Quanto_aumenta_9x16 | 111,8 s | 7fb5deaa7c4b4932a4cddfecc9e91333 |
| PDRO_CCNL_FL_03_Arretrati_9x16 | 114,2 s | 9c0a3c4f36e74aca911740700e1378f4 |
| PDRO_CCNL_FL_04_Operatori_9x16 | 123,6 s | e18eae7595984116baff8f892600c6c5 |
(https://resource2.heygen.ai/video/<asset>/original.mp4). Portafoglio API: 42,07 → 23,85 $ (voci ~1 $, i quattro avatar
il resto).

## Note per Achille
- Le durate (1:52-2:04) superano di poco quelle indicate nei pacchetti (1:45-1:55): i testi sono 230-320 parole e non si
  sono toccati.
- Il copione è in prima persona a nome di Andrea: farlo rileggere a lui.
- Pubblicazione: c'è una versione parallela CISL FP Veneto; non pubblicarle sugli stessi canali né a distanza ravvicinata.
- Pacchetti 05-19 da ricevere.
