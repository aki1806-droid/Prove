# Prompt per Claude Code (HeyGen)

Prima di tutto chiedimi su quale dei miei due account HeyGen lavorare.

Poi crea il video «Il filo che ci unisce» (90 s, verticale 1080×1920, 25 fps) seguendo `storyboard.json` e `NOTE_DI_REGIA.md`:

1. Genera con il mio avatar i segmenti in camera (scene 2, 4, 8) dal testo in `COPIONE_AVATAR.txt`, voce mia, ritmo lento, sfondo scuro prugna #26182A sfocato. Genera anche l’audio dei segmenti fuori campo (scene 3, 5, 6, 7, 9, 10) con la stessa voce.
2. Monta le clip di `clips/` e le immagini di `immagini/` nei tempi indicati; le clip orizzontali vanno ritagliate in verticale sul soggetto; le immagini fisse con Ken Burns lentissimo (100→108%). Rallenta le clip quando la scena è più lunga della clip (interpolazione fluida).
3. Sovrapponi le grafiche di `grafiche/overlay_trasparenti/` nei tempi indicati (PNG e WebM con trasparenza) e chiudi con i cartelli di `grafiche/cartelli/`.
4. Correzione colore: scene 1–3 fredde e desaturate, dalla scena 5 calde.
5. Musica ed effetti come in `audio_brief/MUSICA_E_SUONI.md` (solo musica con licenza).
6. Sottotitoli da `sottotitoli.srt`, sempre visibili.
7. Mostrami un’anteprima prima del render finale; poi esporta MP4 H.264 e una versione 16:9.
