# REGISTRO — «La sedia vuota» (RSU AOUP, reel 9:16)

Data: 4 novembre 2026 · sessione Claude Code (repo Prove). Reel firmato **Componenti RSU – Azienda Ospedale Università di
Padova** (non CISL FP). Testi del pacchetto non modificati. Scelte di Achille: voce **HeyGen come passante** (eleven_v4),
**solo AOUP**, account HeyGen **via chiave API**, **solo logo RSU** (niente logo CISL FP), **nessun avatar**; la voce non è
la sua: fra cinque campioni di voci mai usate ha scelto la n. 4, «DONNA VOCE CALDA PER VIDEO».
Pipeline: ../strumenti/rsu/voci.py, ../strumenti/favole/ (clip, grafiche, chiave SV), ../strumenti/halloween/suoni.py
(chiave «sedia»), ../strumenti/chicedomani/monta.py (ora accetta un logo.png del progetto e il montaggio senza avatar).

## Voce
«DONNA VOCE CALDA PER VIDEO» 87fd26ac5b68410d93b36b2d44a19f8d in due tracce: request Y3ANyw6EaeML0ptLPsA2 (S01-S05,
89,9 s) e 85BNQxDfbTvxW3K5KATq (S06-S09, 69,3 s); tagli profilo narratore. 9 blocchi su 9.
S01 11,1 · S02 19,0 · S03 21,1 · S04 19,4 · S05 16,4 · S06 12,1 · S07 29,5 · S08 10,8 · S09 14,6 s = 153,9 s
(il pacchetto stimava ~138 s con la voce di Achille accelerata).
Campioni scartati (scratchpad): Carmelo La Rosa, Francesco, Sindacalista italiano, Voce femminile per video.

## Logo e clip
logo.png del progetto: il logo «Componenti RSU» ritagliato dal volantino (img/logo_RSU_componenti.png) in un riquadro
arrotondato con ombra, al posto del logo CISL FP. Clip con il modello video di HeyGen (image_to_video, 10 s):
S01 sala vuota 86590919e22e46c1af027681a7c3c0c9 · S08 il gruppo che avanza 6263b7ac1b444241bba9a217a796c38c.

## Grafiche animate (../strumenti/favole/serie.py, chiave SV)
I quattro passaggi della RSU; le 54 sedie grigie (grafiche/S03A_grigio.png, ricavata dalla S03A) con le prime 28 che si
accendono di verde una alla volta fra «componenti» e «presenti», contatore 28/28 e badge verde, poi su «ventisette» la
schermata B con la sedia rossa vuota che pulsa, 27/28 e badge rosso; i sei mesi barrati con una X rossa e il badge
NUMERO LEGALE: MANCANTE che pulsa; le sette schede degli accordi con l'ovale della firma RSU vuoto che pulsa su «manca»;
BASTA con un colpo e il foglietto giallo; le foto del volantino e poi i 18 nomi, uno alla volta sulla voce; le tre righe
SERVE sulla chiusura con la firma Componenti RSU.

## Suoni
Musica 950ccb16 «tense minimal piano reflective», da S06 ab125509 «determined rising inspiring cinematic»; ticchettio
sulla sala vuota, colpo sulla 28ª sedia, timbri sulle X, buzzer sul numero legale, clic sulle schede, impatto su BASTA,
colpi sulle righe SERVE, campanella finale. −16,5 LUFS, picco −0,5 dBFS.

## Uscita (1080x1920, 25 fps, integra; fuori da git; copia d'invio 27 MB in chat)
RSU_AOUP_La_sedia_vuota_9x16 · 2:34 · asset HeyGen 7f7d225e28dc4439892a584a02c46290
(https://resource2.heygen.ai/video/7f7d225e28dc4439892a584a02c46290/original.mp4). Portafoglio API dopo il lavoro: 67,28 $.

## Versione 2 (4/11): voce maschile e inno solenne
Richiesta di Achille: «una voce maschile più calda e carismatica e una musica di fondo più solenne». Fra cinque campioni
maschili ha scelto la n. 1, «Uomo anziano caldo» 403b2f166bdd4b4c976e2d7b370d26d6 (scartati Voce da discorso,
Sindacalista 2, Luca Brasi gentile, Il lettore); fra tre musiche la B, inno lento e solenne 40d447a922bc43f1a95a303a9d2ded15,
su tutto il video. Voce in due tracce: request iPejFbbZxs0HZZb5rAHa (S01-S05, 96,7 s) e NM06L4ungm1p1LdbBrOi (S06-S09,
74,6 s). S01 11,5 · S02 20,2 · S03 22,5 · S04 20,2 · S05 18,1 · S06 13,3 · S07 31,4 · S08 11,8 · S09 15,4 s = 164,3 s.
Stesse grafiche e clip (le sedie si riaccendono sui nuovi tempi). −16,2 LUFS, integro. 2:44.
Asset HeyGen dcd765c456d84d138b02f03a995aa65d (https://resource2.heygen.ai/video/dcd765c456d84d138b02f03a995aa65d/original.mp4); la versione 1 (voce femminile,
7f7d225e28dc4439892a584a02c46290) è superata. Portafoglio API: 66.77 $.

## Versione 3 (5/11): testi dalla lettera della RSU
Achille ha mandato la lettera «Ai lavoratori dell'Azienda Ospedaliera Universitaria di Padova» come base delle modifiche;
copione riscritto e approvato da lui («Si, singolare e tieni i 18 nomi»). Testi vecchi in voce_testi_v2/, post vecchio in
TESTO_POST_v1.md.
- Tolta l'accusa «seguendo logiche dettate dalle proprie sigle» e la scena degli accordi senza firma RSU.
- S01 apre con «Care colleghe e cari colleghi»; S04 «non siamo mai riusciti a raggiungere il numero legale… un'occasione
  persa per tutti i lavoratori»; S05 nuova «Cosa vorremmo portare al tavolo» (condizioni di lavoro e organizzazione dei
  servizi, nuovo polo della Pediatria, banca ore, congedi parentali a ore e settimana corta, welfare aziendale); S06 la
  domanda sulla fiducia e la responsabilità; S07 «Chi vi scrive ha scelto di esserci» e i 18 nomi; S08 «continueremo a
  presentarci»; S09 il rispetto del mandato e «Con affetto, i vostri RSU: quelli che ci sono, e che ci saranno sempre».
- Grafiche (../strumenti/rsu/grafiche_v3.mjs, Montserrat e Caveat): S04 «Un'occasione persa per tutti.» e «Ci presentiamo
  a ogni convocazione. Senza numero legale, nessuna riunione è valida.»; S05 nuova con quattro schede; S09 con «Quelli che
  ci sono e che ci saranno sempre.» Versioni precedenti: grafiche/S0xA_v1.png.
- Voce «Uomo anziano caldo» in tre tracce (la prima da S01-S05 tornava HTTP 502): request 87EIApmvNXKggDtWQ8ag (S01-S03),
  aj9K0u9H9turnZKhqTnk (S04-S06), suVBAY8iJk9cNJvw6fUu (S07-S09). S01 13,6 · S02 20,4 · S03 22,5 · S04 21,2 · S05 25,6 ·
  S06 17,6 · S07 30,0 · S08 14,0 · S09 16,5 s = 181,5 s. Inno solenne su tutto. −16,2 LUFS, integro. 3:01.
- Asset HeyGen 0146bb92a66c4181b98ae29336483c4c (https://resource2.heygen.ai/video/0146bb92a66c4181b98ae29336483c4c/original.mp4); la versione 2 (dcd765c456d84d138b02f03a995aa65d) è superata.
- Portafoglio API da 66,77 a 49,35 $: calo da verificare (le tre voci valgono pochi crediti).

## Pubblicazione
- Da fare: OK di Achille → Robin (dura 3:01: su Facebook va come video normale). Checklist del pacchetto: nomi verificati
  con l'elenco dei componenti e consenso alla pubblicazione dei volti e dei nomi.
