# PDRO · «Un nodo al dito» (25 novembre 2026, provinciale)

Pacchetto V7_UN_NODO_AL_DITO (parte 1 testi e cartelli, parte 2 immagini e clip) mandato da Achille il 25/11/2026.
76 s, 16:9 e 9:16, 25 fps, nessun avatar.

## Scelte di Achille (25/11)
- Voce: **Luca Ward** (tVdVcJPudubxmTmAw4tE), **ElevenLabs diretto**, eleven_v4 con [softly] e [short pause]; una presa per
  frase (10 nodi nel flow N0YZ2MwkWYIrxhvx87ih), «1522» letto «millecinquecentoventidue», «25» «venticinque».
  Frasi 6 e 9 accelerate (atempo 1,10 e 1,12) per stare nei loro spazi. Tempi in audio/tempi_voce.json.
- Destinatari: **provinciale** (il cartello finale è già «Coordinamento donne AOUP e provinciale», senza contatti).
- Robin: pubblicare oggi, appena pronto, dopo l'OK di Achille.

## Montaggio (strumenti/nodo/monta.py, testi.js)
- HyperFrames non è disponibile da Claude Code (compose disabilitato): montaggio locale con ffmpeg sullo storyboard, tempi
  al decimo, dissolvenze di 0,7 s (17-18 fotogrammi), Ken Burns 100→108% (scena 11 108→100%).
- 16:9: le opere verticali intere su un fondo sfocato e scurito della stessa immagine; la clip verticale c03 al centro su
  prugna con i bordi sfumati. 9:16: immagini e clip orizzontali tagliate al centro.
- Cartelli 02 e 04 sovrapposti a 21 s e 54 s, entrata dal basso di 12 px in 0,6 s; etichetta «25 NOVEMBRE» (Work Sans Bold)
  nella scena 1; sottotitoli dallo srt (Lora, avorio su fascia prugna semitrasparente) sui tempi veri della voce.
  Foto del nodo scurita al 55% perché il cartello avorio si legga.
- Musica ElevenLabs eleven_music_v2 edV30E4AdJuPc8OHjGVh (pianoforte, violoncello da 47 s): −10 dB senza voce, −20 dB sotto
  la voce, mezzo secondo di silenzio a 46,45 s; uscita a −16 LUFS.
- TESTO_POST.md scritto da Claude con le frasi della voce, il 1522 e i delegati dei tre territori: da far rivedere ad Achille.

## Uscite (25/11/2026)
- 16:9 1920x1080 e 9:16 1080x1920, 76,0 s, 25 fps, −15,4 LUFS. Copie d'invio da 28 MB mandate in chat.
- Asset HeyGen (account 1): 16:9 https://resource2.heygen.ai/video/260033e933124ac9b175ccb99e271239/original.mp4 ·
  9:16 https://resource2.heygen.ai/video/2d52e922f1814c32b898b8166ee4d225/original.mp4
- Correzioni dopo la prima prova: foto del nodo scurita, fascia prugna dietro sottotitoli ed etichetta (9:16), etichetta a
  sinistra sul prugna nel 16:9.
- Robin: OK di Achille il 25/11; programmati alle 14:34 il post 1216964 (9:16 su TikTok 18053, Instagram 18045 reel, Facebook 18051 reel, YouTube 18260 Shorts) e il post 1216965 (16:9 su YouTube 18260).

## Versione 2 (25/11/2026, richiesta di Achille)
- «Sottofondo con piano e arpa, il 1522 pronunciato "quindici, ventidue", tono della voce meno ansiogeno».
- Voce: le 10 frasi rigenerate (Luca Ward, eleven_v4, una presa) con il tag **[warmly]** al posto di [softly] e senza le
  [short pause] forzate; frase 9: «Il quindici, ventidue risponde, gratis, giorno e notte». Atempo solo sulle frasi 6
  (1,12) e 9 (1,05). La versione precedente (voci, tempi, musica) resta nella storia git.
- Musica: eleven_music_v2 YgMD9vSlt7Os5ai4ssJ7, pianoforte e arpa, sereno, l'arpa si apre da 47 s, chiusura con glissando.
- Sottotitoli rigenerati sui nuovi tempi (il testo a schermo resta «Il 1522»).
- Uscite v2: 76,0 s, −15,6 LUFS. Asset HeyGen (account 1): 16:9
  https://resource2.heygen.ai/video/350a8832af0d4e1f8b58f95dd9354d7c/original.mp4 · 9:16
  https://resource2.heygen.ai/video/a11b4de4e9c7472787962da00f008444/original.mp4 . Copie d'invio mandate in chat.
