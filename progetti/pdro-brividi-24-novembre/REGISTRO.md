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

## Serie T e P, parte 1 — 30/10/2026 (pacchetto SERIE_parte1_per_Claude_Code.zip: T1, T3, P2, P3)
Istruzioni del pacchetto in serie_istruzioni/ (ISTRUZIONI_SERIE_T_P.md, calendario_pubblicazione.json, render_bozza.py).
Scelte di Achille: voce **DONNA VOCE CALDA** (ElevenLabs eleven_v4 via HeyGen passante) e non «Lea inside sitting» del
pacchetto, che è il TTS proprio di HeyGen (escluso dalle regole); **T1 e T3 restano i trailer Brividi** già fatti;
**programmazione su Robin solo dopo il suo OK** sui video; pubblico **provinciale**. Formato unico 9:16 (pacchetto).
- P2 «Scarpe rosse» e P3 «Prendere parola»: stesse regole dei Brividi v2 (scene sul parlato, clip quasi a velocità
  naturale, silenzi brevi, sottotitoli piccoli impressi). Voce (voci.py `P`): request vjTjmvt1BF2zAEe5b0jZ, 32,4 s,
  «ventiquattro» e «chiama l'uno cinque due due» a voce, in cifre a schermo. Cartello «Prenota» 9:16 ricomposto dal 16:9
  (P2 aveva solo i 16:9; gli altri cartelli 9:16 sono uguali a quelli di P3). Suoni dal catalogo HeyGen: vento, uccelli,
  click dello spot, pianoforti b5d94404 (P2, cresce sui passi) e 54017c6e (P3, poche note sul titolo); passi sintetizzati
  (il catalogo non li ha), respiro e ronzio di sala già scaricati. Silenzi: P2 1 s prima di «Quest'anno contiamo i passi»,
  P3 1,5 s prima della prima parola. P2 24,4 s, P3 25,8 s.
- Fluidità (trailer.py prepara): ora 25 fps veri anche qui (prima fps=25 su clip a 24 ripeteva un fotogramma al secondo).
  T1 e T3 9:16 rimontati con questa correzione, contenuto uguale. Doppioni isolati misurati: P2 0, P3 0, T3 0, T1 1.
- Uscite (9:16, integre, SAR 1:1): HeyGen T1 26e92010fd1540d297badbeb54a0f299 · T3 892e2c11601c4f24b6fb521b089a77dd ·
  P2 4a231b876cbf4b55913472f0167ca729 · P3 b5d4f672a2ca4f01ab85e5ed5f6f5560 (https://resource2.heygen.ai/video/<asset>/original.mp4).
  Portafoglio API: 43,80 $ (ricaricato).
- Robin (30/10, dopo l'OK di Achille): programmati sui 12 canali (TikTok ×2, YouTube ×2, Instagram ×4, Facebook ×4),
  testi e opzioni dal calendario, etichette «Sentirsi per sentire» + «Video Tx/Px»: T1 post 1126844 sab 31/10 21:00 ·
  T3 1126847 mer 4/11 21:00 · P2 1126848 dom 8/11 21:00 · P3 1126853 mar 10/11 21:00. Aggiunti al calendario condiviso
  (raccolta `extra`, NEW-T1/T3/P2/P3, stato «programmato» e numero Robin).
- Da fare: liberatoria dei genitori di Louis Huang (minorenne, il nome è nei cartelli info).

## Serie parti 2 e 3 (30/10): T2, T4, T5 in 9:16 e i nuovi P1, P4, P5

Pacchetti «SERIE parte 2» e «SERIE parte 3» (identici nelle istruzioni e nel calendario). Scelte di Achille: voce tramite
HeyGen passante (eleven_v4; non «Lea inside sitting» del pacchetto, che è il TTS di HeyGen), pubblico **provinciale**,
T2/T4/T5 riusati dai Brividi v2 (stessi testi e cartelli; cambiano solo i titoli degli interventi nello storyboard, che nei
video non compaiono) e ricavati in 9:16, clip facoltative generate con Higgsfield.
- Clip Higgsfield (seedance_2_5, 9:16, 5 s, 720×1280): q06_citta_si_accende (P5 S08), q07_uomo_in_auto (P4 S03, P5 S05:
  il volto è coperto dalle mani), q08_padre_figlia (P4 S06, P5 S10: la bambina solo di spalle, senza volto).
  Usate al posto del testo su nero (trailer.py ASSET).
- Voci (voci.py `Q`): P4 tutta con la voce di Achille (9b851842…, profilo achille), scelta sua perché la regia chiede un
  uomo, «meglio un padre o un delegato vero»; P5 a coro, frasi alternate donna (DONNA VOCE CALDA) / Achille, l'ultima
  («Perché nessuno dovrebbe perdersi per amore») dette tutte e due insieme, la voce più corta allungata per finire insieme.
  Request: donna NAL2e603pvTS0WgJjU2Q (29,0 s), Achille w8uZLjJEANeMsL4ToRgG (54,8 s). «il ventiquattro novembre» a voce.
  P1 senza voce (regia: «solo testo»).
- Suoni nuovi (suoni.py): timpano 050666a0c9345558 (P1, sulla scritta), violoncello 36aff990 (P1), pianoforte 7adaae3e (P4),
  pianoforte con coro senza parole 0da15432 (P5); pioggia sul parabrezza sintetizzata (il catalogo non ha pioggia né voci
  di bambini, quelle di P4 non ci sono). P5: i suoni dei frammenti crescono insieme fino allo STOP.
- Silenzi totali: P1 tra la sedia e la donna; P4 1,3 s dopo «… sentire sé stesso,»; P5 1,5 s allo STOP.
- Cartello «Prenota» 9:16 di P1: tenuto il nostro (più grande e leggibile di quello del pacchetto).
- T2 9:16 rimontato con la correzione dei 25 fps veri (come T1 e T3), contenuto uguale.
- Uscite (9:16, integre, SAR 1:1, −16 LUFS): T2 24,4 s f497b5af50994634a99d8fab71780469 · T4 36,3 s
  ad93d9b7b5484a8390a45b580ccf53ec · T5 42,7 s 099336b0d90e43d6b84f5846b5cf1e06 · P1 13,7 s b330765e4b374820b8d52e778d6ff6c9 ·
  P4 38,9 s 3a79b0d43a954256a09abf9f39e2a12d · P5 57,6 s ebc5a7fd9df4489da4db6bdd9854a2c6
  (https://resource2.heygen.ai/video/<asset>/original.mp4).
- Robin (30/10, dopo l'OK di Achille): programmati sui 12 canali con testi e opzioni del calendario, etichette
  «Sentirsi per sentire» + «Video Tx/Px»: T2 post 1126932 ven 13/11 19:30 · T4 1126934 sab 14/11 21:00 ·
  P5 1126936 lun 16/11 21:00 · P4 1126938 mer 18/11 19:30 · T5 1126941 gio 19/11 21:00 · P1 1126942 dom 22/11 19:30.
  Calendario condiviso: aggiornate le voci che c'erano già (SPS-09 T2, SPS-12 P4, SPS-16 P1, prima «da montare») e
  aggiunte NEW-T4, NEW-P5, NEW-T5, tutte «programmato» con il numero Robin.
- Da fare: liberatoria dei genitori di Louis Huang (minorenne, il nome è nei cartelli info).
