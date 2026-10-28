# REGISTRO — PDRO · «Brividi», cinque trailer per «Sentirsi per sentire» (24 novembre 2026)

Data: 27–28 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetti T1_LA_PORTA_20s, T2_DOVE_SEI_30s, T3_IL_NODO_45s,
T4_CHI_CURA_60s, T5_ACCENDIAMO_UNA_LUCE_75s (in ogni cartella: storyboard, note di regia, testo della voce, anteprima).
Scelte di Achille: voce **«DONNA VOCE CALDA PER VIDEO»** via API HeyGen come passante (ElevenLabs eleven_v4, non il TTS di
HeyGen); video **provinciale**; **«ventiquattro novembre» in lettere** solo nella voce (a schermo e nei sottotitoli «24»);
suono: **effetti e pianoforte dal catalogo HeyGen** (royalty-free), con i silenzi totali chiesti dalla regia.

## Voce (../strumenti/brividi/voci.py)
87fd26ac5b68410d93b36b2d44a19f8d, POST /v3/voices/speech eleven_v4: le 25 frasi dei cinque trailer in una traccia sola,
unite da pause di 1,6 s (1.806 caratteri, request y9H7bihAuBKXpGH4ODkl, grezzo 119,4 s). Tagli profilo «pensiero» (pause
oltre 0,9 s → 0,7 s, niente atempo); in T3 S04 1 s di pausa dopo «rabbia.» («silenzio di 1 s prima di "Basta
ascoltarsi"»). 25 blocchi su 25, parole uguali ai testi del pacchetto. Durate in <Tn>/audio/tempi-scene.json.

## Clip
Tutte del pacchetto tranne una: **k07 (infermiera nel corridoio) mostrava un occhio livido**, contro la regola del pacchetto
«niente volti feriti». Rifatta con Higgsfield (gpt_image_2_5 → kling3_0 std, 5 s, senza audio, stesso corridoio verde di
notte, infermiera stanca con la mano sulla fronte, viso senza segni): clips/k07b_infermiera_notte_16x9.mp4, usata in T4 S2 e
S3. L'originale resta in clips/.

## Montaggio (../strumenti/brividi/trailer.py)
Tempi delle scene dallo storyboard. Clip «rallentate al 50%» con flusso ottico (minterpolate); T4 S3 la stessa clip al
contrario e desaturata; T5 S6 fermo immagine sull'ultimo sguardo con zoom lento. Colore freddo e desaturato nella prima metà,
caldo nella seconda, con il passaggio nella scena in cui entra il pianoforte. Testi in Instrument Serif: a macchina da
scrivere le frasi che fanno male (con la voce parola per parola quando la voce le dice, se no 18 caratteri al secondo), in
corsivo e in dissolvenza dal basso quelle che consolano. T2: le sette bolle di chat dello storyboard, bianche (l'ultima
rossa), che scendono dall'alto con un rimbalzo e una vibrazione ai secondi 0 – 2 – 3,6 – 5 – 6,2 – 7,2 – 8 e spariscono
quando il telefono si gira. Filo rosso del cartello titolo che si disegna da sinistra a destra. Cartelli avorio del
pacchetto (titolo → info → prenotazione con QR → firma con 1522). Sottotitoli piccoli in Work Sans impressi in basso (non
ripetono il testo già a schermo); anche <Tn>/sottotitoli_<formato>.srt. Nessun flash, nessun glitch.
Formati in più ritagliati dalle clip 16:9: T3 9:16 e T5 1:1 (in T5 il ritaglio segue gli sguardi da sinistra a destra).

## Suono (../strumenti/brividi/suoni.py, file in audio/sfx/ fuori da git)
Catalogo HeyGen: orologio, battito, «Rapid crackle» per il fiammifero, drone di reparto, bip del monitor, uccelli del
mattino; pianoforti Astral: 2bfa472e (T1, nota che si apre in accordo), ca12c766 (T2, minore che si risolve), 19df3cfe (T3,
piano solo), d80ba448 (T4, piano e poi violoncelli), aa842465 (T5, cresce con le candele, si spegne sulla firma).
Sintetizzati con ffmpeg perché il catalogo non li ha: vibrazione del telefono, fruscio del filo, respiro (T5 a 6 s).
Musica −13 dB sotto ogni frase, effetti −5. Silenzi totali (verificati a zero): T1 7–9 s, T2 13–14,5, T3 14–15 e la pausa
prima di «Basta ascoltarsi», T4 22–24, T5 36–38. Uscite a −16 LUFS integrati, picco ≤ −0,6 dBFS.
Passi di T4 non messi (il catalogo ha solo passi su detriti).

## Uscite (fuori da git), tutte integre, SAR 1:1, 25 fps; mandate in chat (tutte sotto i 30 MB, senza copia d'invio)
| file | formato | durata | MB | asset HeyGen |
|---|---|---|---|---|
| PDRO_Brividi_T1_La_porta_9x16 | 1080x1920 | 20 s | 9 | 16c15ef9f6dd4e3abb3e385217943e90 |
| PDRO_Brividi_T2_Dove_sei_9x16 | 1080x1920 | 30 s | 11 | 058e3fd7ecbe4859a54f92601c9e6a4c |
| PDRO_Brividi_T3_Il_nodo_16x9 | 1920x1080 | 45 s | 16 | a51f765326e849a1b5f0d83dd251b241 |
| PDRO_Brividi_T3_Il_nodo_9x16 | 1080x1920 | 45 s | 16 | 5504c309a0164003b9bdd593b9e90140 |
| PDRO_Brividi_T4_Chi_cura_16x9 | 1920x1080 | 60 s | 20 | 4c38492efff54063afb174d6a2d91630 |
| PDRO_Brividi_T5_Accendiamo_una_luce_16x9 | 1920x1080 | 75 s | 21 | 93281da04d174b059148dff046b688e1 |
| PDRO_Brividi_T5_Accendiamo_una_luce_1x1 | 1080x1080 | 75 s | 14 | 4e0e76abecf3409db39463bd1fb4c93d |

Link: https://resource2.heygen.ai/video/<asset>/original.mp4. Portafoglio API: 32,33 $ (34,33 dopo il Kit v2).

## Da fare (Achille)
- Musica di Louis Huang: se hai la liberatoria la metti tu al posto dei pianoforti del catalogo.
- Nei post scrivere «immagini generate con IA».
- Il QR porta a https://form.getformly.com/f/02eeRh: controllarlo.
- k07 sostituita (vedi Clip): se preferisci l'originale, dimmelo.

## Versione 2 — 28/10/2026, richiesta di Achille: «trovo le clip molto lente e ci sono troppe pause lunghe»
- Scene non più ai tempi dello storyboard: ogni scena dura il suo parlato + un respiro (trailer.py, ritmo()); cartelli
  titolo 2,8 s, info 4, prenotazione 3,5 (QR sempre ≥ 3 s), firma 3; i neri di silenzio totale 1 s (T1, con la macchina da
  scrivere, 2,4 s). Effetti, musica e silenzi della regia spostati in proporzione dentro la loro scena.
- Clip a velocità naturale; rallentate al massimo ×1,3 solo se la voce è più lunga, poi ferme sull'ultimo fotogramma
  (prima erano al 50%).
- Voce: pause interne oltre 0,6 s → 0,4 s (prima 0,9 → 0,7); in T3 la pausa prima di «Basta ascoltarsi» 0,7 s.
- Durate: T1 19,5 s · T2 24,4 · T3 32,9 · T4 36,4 · T5 42,7 (i nomi delle cartelle del pacchetto restano 20/30/45/60/75).
  Tutti integri, −16 LUFS, silenzi a zero. Mandati in chat. Originali su HeyGen (sostituiscono quelli della v1):
  T1 fcfcea1f6c05481f8f8ecb4088b9d190 · T2 a04170e3179f4bacba8eff86dac27d12 · T3 16:9 968bfc42cfb440659cfa5fa24c917a75 ·
  T3 9:16 66027c94972e46b1aa162cf9ee4eec5b · T4 70b9d4d10af74ca59d6ec9a633e14eba · T5 16:9 434d38210f294e4cad00620b5a897b99 ·
  T5 1:1 7043d7593822477893198556593584f0 (https://resource2.heygen.ai/video/<asset>/original.mp4).
