# REGISTRO — PDRO · «Decreto PA è legge – 3 cose che ti riguardano» (reel 9:16)

Data: 19 ottobre 2026 · sessione Claude Code (repo Prove). Fonte: nota CISL FP nazionale del 29/09/2026 (testi del pacchetto non modificati).
Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; grafiche **animate** come «Chi c'è domani».

## Voci (HeyGen create_speech, engine elevenlabs, eleven_v4)
- Luca Ward (e4bd8d8a357f41a99502309874733c16), scene 1-7 in una traccia: request M2kGgsB8V9JIcXgPGVF6, grezzo 99,9 s
  (../strumenti/decreto/ward-decreto-legge*). Tipo narratore: pause >0,6 s → 0,45 s.
- Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), chiusura S08: request gttAhomg7QLAgQnO3PZD, grezzo 17,6 s
  (../strumenti/decreto/achille-decreto-legge*). Pause >0,45 → 0,35, atempo **1,16** (non 1,12 come dice il pacchetto,
  che presuppone ElevenLabs diretto: regola CLAUDE.md per la strada HeyGen).
- Tagli: ../strumenti/decreto/voci.py, 8 blocchi su 8 giusti al primo colpo.

| Scena | Voce | Inizio | Durata |
|---|---|---|---|
| S01 | narratore | 0.0 s | 15.3 s |
| S02 | narratore | 15.3 s | 15.2 s |
| S03 | narratore | 30.5 s | 11.5 s |
| S04 | narratore | 42.1 s | 17.4 s |
| S05 | narratore | 59.5 s | 13.3 s |
| S06 | narratore | 72.8 s | 7.8 s |
| S07 | narratore | 80.6 s | 14.4 s |
| S08 | achille | 95.1 s | 15.1 s |

## Clip e avatar (HeyGen)
- Asset: dl_aula 3031922c2edd43ed850e0d62370f91be · dl_mensa be3538dbfa6d486388c3f30f1bdfdc22 · dl_contratto 170f70839b5c41ed8686b87845e85d03
  · voce S08 7f089b546ed84da99a83371aec1cae78
- image_to_video heygen-video-1 1080p: S01 aula 04a2f9fb129a40148325f2626f34386c (15 s) · S03 mensa 2ea23d7610704949a0eabd773bf760b7 (12 s)
  · S06 contratto 2af652ec6351468d87250aa5a0ea8946 (8 s)
- Avatar «Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e), webm con alfa, S08: 3c44ecd3cbb5d33d21a9f414c027bf40

## Grafiche animate
../strumenti/decreto/serie.py (pezzi e regia sulle parole) + ../strumenti/chicedomani/pezzi.py, motore.html, rendi.mjs, monta.py.
- S01/S03/S06 overlay sulle clip con bande nere; chip, «3 COSE» e righe entrano sulle parole.
- S02 lo scudo si forma, MENSA / BUONO PASTO / FERIE entrano sulle parole, RESPINTO cade su «Quelle proposte sono state respinte» con urto.
- S04 la fetta arancio si riempie fino al 20% (nuovo disegno «torta» del motore) mentre il numero conta da 0 a 20; base
  grafica/S04_base.png con fetta e «20» ridipinti; la scadenza entra per ultima.
- S05 cinque riquadri ANNO, tre si colorano di arancio; le quattro condizioni entrano e si spuntano una alla volta.
- S07 la card entra dal basso, urto su «respinta», «Lo riproporremo» deciso. S08 titolo, contatti, avatar in basso a destra.
Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nera nelle scene con clip).

## Uscita
PDRO_Decreto_PA_legge_3_cose_9x16.mp4: 1080x1920, 25 fps, 110,2 s (fuori da git), copia d'invio _invio.mp4 (27 MB).
Sottotitoli: sottotitoli.srt (dalla voce, non impressi). Post: post/POST_Decreto_PA_1080x1350.jpg + TESTO_POST.md (del pacchetto).
Originale su HeyGen: asset 85c04817a34a42dc99715256c7b5c554 — https://resource2.heygen.ai/video/85c04817a34a42dc99715256c7b5c554/original.mp4

## Da fare (Achille)
- Revisione prima della pubblicazione (checklist del pacchetto); verificare il testo definitivo in Gazzetta.
- Musica royalty-free (indicata dal pacchetto): non aggiunta.
- Il montaggio è locale (ffmpeg), non create_video_from_studio come proponeva il pacchetto: stesso metodo dei reel CISL precedenti.
