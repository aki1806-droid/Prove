# REGISTRO — Video d'apertura e di chiusura per il direttivo AOUP (trattativa del 18/11/2026)

Richiesta di Achille (24/11/2026): colonna sonora nuova da scaricare e due video «belli intensi», uno introduttivo e uno
finale, da proiettare durante l'evento. Scelte: voce narrante Luca Ward con ElevenLabs diretto (eleven_v4), niente avatar,
nessun indirizzo né contatto; logo CISL FP sull'ultima schermata del finale. Testi approvati da Achille il 24/11.

- Musica (ElevenLabs, flow N0YZ2MwkWYIrxhvx87ih, eleven_music_v2, strumentale): intro nodo hWrFRzNx1Cmp9duV4pVr, scelta la
  generazione zqwrPGMlswdBdNBQudfe (75 s); finale nodo Nz9V6BZj2ucO2J1GJfvp, scelta dY2lRIOLxr1KdbwbAepO (80 s).
  Uscite in colonna_sonora/ (MP3 320k a −14 LUFS e MP4 con titolo e onda sonora), fuori da git.
- Voce: intro 7IKvGDkPccHNxfjNbHj1 (42,4 s), finale Vh2H6RLp5278uN4wX0hm (40,8 s), Luca Ward tVdVcJPudubxmTmAw4tE.
- Clip: 9 animazioni Kling 3.0 std (Higgsfield) dalle foto della presentazione, 5 s, senza audio.
- Montaggio: scratchpad video/build.py + spec.py + cards.js (scritte Montserrat su PNG trasparenti, fondo con clip
  oscurate e vignettatura, musica abbassata sotto la voce, −16 LUFS). Intro 54 s, finale 55 s, 1920x1080.

## Uscite (24/11/2026, fuori da git)
| Video | Durata | Master (crf 21) | Asset HeyGen (account 1) |
|---|---|---|---|
| Direttivo_AOUP_INTRO_Dati_alla_mano | 54 s | 167 MB | 580a91e6cee94e7da67523b661aa2483 |
| Direttivo_AOUP_FINALE_Sempre | 55 s | 169 MB | 9cf64c4494cf43179eee8f117e371b95 |
Link: https://resource2.heygen.ai/video/<asset>/original.mp4 · copie d'invio da 28 MB mandate in chat.
Prima uscita scartata: le scritte erano in un carattere di riserva (i font file:// non si caricano in setContent):
ora cards.js incorpora il Montserrat in base64.
Su richiesta di Achille mandato anche «Sentirsi per sentire» v3 (pdro-sps-colonna-sonora, uscite/).
