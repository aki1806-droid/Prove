# REGISTRO — PDRO · «Il filo che ci unisce» (AV1, video di presentazione di «Sentirsi per sentire», 9:16 e 16:9)

Data: 28 ottobre 2026 · sessione Claude Code (repo Prove). Pacchetto AV1_IL_FILO_CHE_CI_UNISCE_90s.zip (da pubblicare il 29/10).
Scelte di Achille: voce **HeyGen come passante** (Achille nuovo 1, eleven_v4, via API); **provinciale**; avatar
**scontornato in basso a destra** come nei reel PDRO (non il primo piano a tutto schermo della regia); numeri **in lettere**
a voce, 1522 cifra per cifra («L'uno cinque due due risponde, sempre»); a schermo e nei sottotitoli in cifre.
Account HeyGen: lo stesso di sempre (aki.pagliaro), portafoglio API.

## Voce (../strumenti/filo/voci.py)
9b851842ce54449fb9ff501751ca0271, una traccia con le 9 scene parlate (COPIONE_AVATAR.txt; il segmento 8 diviso fra S09 e
S10), request iQXWQfyiH3z5FCBFlI69, grezzo 85,0 s. Tagli profilo «achille» (pause >0,45 → 0,35 s, atempo 1,16); 0,7 s di
pausa prima di «ascolto» in S04. Parole uguali al copione in tutte le scene.

## Avatar (../strumenti/filo/avatar.py)
«Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, S02+S04+S08 in fila (0,6 s), webm con alfa via API:
video 0c0e2cc66d59715a9411a290a6ed9a93 (audio asset 31ad9d29fb6149228d0b4841c794742b), 1920x1072, 29,7 s. Labiale 0 ms.

## Montaggio (../strumenti/filo/monta.py)
Durate sul parlato (come chiesto da Achille per i trailer Brividi), 85,0 s invece di 90: S01 4,0 · S02 13,4 · S03 8,7 ·
S04 7,1 · S05 7,2 · S06 9,2 · S07 6,6 · S08 10,1 · S09 5,9 · S10 3,4 · C02 2,6 · C03 (QR) 3,6 · C04 3,2.
Clip del pacchetto rallentate al massimo ×1,3; **k07 è la versione senza volto ferito** rifatta per Brividi
(clips/k07b_infermiera_notte_16x9.mp4: nel pacchetto c'è di nuovo quella con l'occhio livido). Tele con Ken Burns 100→108%
e i nomi delle relatrici sulle parole; fondi delle scene in camera: S02 le mani al telaio, S04 la clip dell'ascolto, S08
il prugna sfocato della regia con Achille che si avvicina (100→112%). Sottopancia e badge 1522 alzati sopra i sottotitoli
perché non coprano l'avatar. Freddo e desaturato S01-S03, si scalda su «ascolto». Frasi K01-K05 in dissolvenza dal basso;
filo rosso animato in S06 e sul titolo. Sottotitoli sempre (regia), avorio su riquadro scuro leggero; sottotitoli_montato.srt.
Suono (../strumenti/filo/suoni.py, catalogo HeyGen): battito, vibrazioni sempre più fitte, fruscio, fiammifero, pane,
uccelli; piano e archi «emotional building piano and strings, from intimate to hopeful» (1f7c477f…, royalty-free) che si
ferma sulle notifiche, 1 s di silenzio totale all'inizio di S04 (verificato a zero), quasi a zero sotto S08. −16 LUFS.
16:9: il verticale al centro su una copia sfocata e scurita.

## Uscite (fuori da git)
- PDRO_Il_filo_che_ci_unisce_9x16.mp4: 1080x1920, 85,0 s, 55 MB, integro, SAR 1:1 — copia d'invio 28 MB in chat.
  Asset 945d63ec22a440658f832b32f76e2899 — https://resource2.heygen.ai/video/945d63ec22a440658f832b32f76e2899/original.mp4
- PDRO_Il_filo_che_ci_unisce_16x9.mp4: 1920x1080, 29 MB, integro, mandato in chat.
  Asset 27bf50bff5a54c54bc645413d3e68743 — https://resource2.heygen.ai/video/27bf50bff5a54c54bc645413d3e68743/original.mp4
Portafoglio API: 30,78 → 27,22 $.

## Da fare (Achille)
- Nel post: «Immagini e video generati con IA; avatar digitale di Achille Pagliaro».
- Musica di Louis Huang: se arriva con la liberatoria, la metti al posto del pianoforte del catalogo.
- Commento in evidenza con il link di prenotazione (https://form.getformly.com/f/02eeRh).

## Versione 2 — 28/10/2026, richiesta di Achille: «ci sono dei difetti con l'avatar, è poco fluido e a volte si blocca»
Causa (il webm di HeyGen non aveva fotogrammi doppi): il montaggio teneva fermo Achille sul primo fotogramma finché partiva
la voce (0,3 s in S02 e S08, 1 s in S04) e sull'ultimo in coda alle scene; in S08 lo zoom 100→112% lo spostava a scatti di
un pixel. Rimedi:
- avatar rifatto (../strumenti/filo/avatar.py v2): la traccia ha già il ritardo e la coda di ogni scena in silenzio, così
  Achille si muove per tutta la scena: video 5129709cbcaef2f9aec05a64f104cedf (audio asset f6ad57c4a78d40e9bd6b3b543d5f12a3),
  32,4 s, labiale 0 ms, 0 fotogrammi fermi nelle tre scene (misurato); il primo è in avatar/v1/;
- tolto lo zoom sull'avatar in S08;
- le clip appena più corte della scena ora si rallentano un poco invece di fermarsi in coda (c05 prima di S08).
Montato v2: 85,0 s, 56 MB, integro, SAR 1:1, −16,1 LUFS; copia d'invio 28 MB e 16:9 (29 MB) mandate in chat.
Originali su HeyGen (sostituiscono quelli della v1): 9:16 asset 9165e670c94747f9963522698ba1c076 —
https://resource2.heygen.ai/video/9165e670c94747f9963522698ba1c076/original.mp4 · 16:9 asset 68b9e45fa2c145bd91a1dd2bdf482917 —
https://resource2.heygen.ai/video/68b9e45fa2c145bd91a1dd2bdf482917/original.mp4. Portafoglio API: 27,22 → 25,98 $.

## Versione 3 — 29/10/2026, richiesta di Achille: «la musica è troppo alta e vorrei il video più fluido»
- Musica: sui cartelli finali (solo musica) era −11,2 LUFS contro −17 della voce, cioè più forte della voce. Volume della
  traccia 0,8 → 0,22 e sotto la voce −9 dB in più (monta.py MUSICA_VOL, MUSICA_SOTTO): ora cartelli −19,4 LUFS, parti
  parlate −14,7/−15,2, il video intero −16,1.
- Fluidità: le clip del pacchetto sono a 24 fps e fps=25 ripeteva un fotogramma ogni secondo (lo scatto). Ora ogni clip
  esce a 25 fps veri: se basta, ogni fotogramma suonato a 25 (4% più svelta), se no flusso ottico direttamente a 25 fps.
  Il Ken Burns delle immagini si calcola in Python con il riquadro in frazioni di pixel e partenza morbida (zoompan
  arrotondava ai pixel e tremava). Doppioni isolati misurati nel montato: 1 (al cambio fra S05 e S06), prima uno al secondo
  in tutte le clip.
- Cache delle clip scritta in modo sicuro (file temporaneo poi rinominato): una prova interrotta ne aveva lasciata una rotta.
Montato v3: 85,0 s, 57 MB, integro, picco −0,7 dBFS; copia d'invio 28 MB e 16:9 (29 MB) mandate in chat. Originali su HeyGen
(sostituiscono la v2): 9:16 asset e597d78e34204836958f9e3baaa8f30d —
https://resource2.heygen.ai/video/e597d78e34204836958f9e3baaa8f30d/original.mp4 · 16:9 asset 618c44e98cfc4194aeab21dd220404b5 —
https://resource2.heygen.ai/video/618c44e98cfc4194aeab21dd220404b5/original.mp4
