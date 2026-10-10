# REGISTRO — PDRO Oncoematologia Pediatrica (Reel 9:16)

Data: 10 ottobre 2026 · sessione Claude Code (repo Prove)
Account HeyGen: quello del connettore (scelto da Achille)
Titolo HeyGen: PDRO – Oncoematologia Pediatrica – Tutela del personale

## Voce
Achille nuovo 1 — KerPEYZvLEWNATg4AARX (ElevenLabs), modello eleven_v4 (scelto da Achille al posto
di eleven_multilingual_v2), 1 generazione per blocco, testi di voce_testi/ invariati.
Flusso ElevenLabs: 0p4MMzxBWP3u0FVXLhG5
Generazioni: S01 eiNY7RH5fZEUonrqHPQq · S02 o10ZO0XfvuOClc2gX76t · S03 ogybMvtOQcTBLhNLEudE ·
S04 xLLOni5HywYMO7lwlSjm · S05 OyA1CybVH7dkibOg6QMi · S06 hScoSwT7RqvquBuV98n8 · S07 7kPmxRwcUSM09YKJGUdB
Post: silenceremove (pause > 0,45 s ridotte a 0,35 s) → atempo=1.12 → 0,3 s di coda.
Unione in WAV (al campione): 140,445 s. Tempi delle scene: audio/tempi-scene.json

## Clip (scene 2, 4, 6)
Seedance 2.0 Mini (ElevenLabs) 720p 9:16, 15 s, senza audio, 13.744 crediti l'una:
S02 CrMNfcbVKFkKF8BF27Gf (corridoio vuoto) · S04 kzbFohWCwl6IovdaCAzf (mani che firmano) ·
S06 BOo9wVvqUjwxH5EcECYF (infermiera e OSS di spalle col carrello).
Controllate: nessun bambino, nessun paziente, nessun logo o testo leggibile.
Nel montaggio: rallentate a durata di scena, virate al verde, banda overlay_clip/ sopra.

## Avatar
Look D «Aki with a lapel microphone» (polo verde) — e6d73d660d354b94b0a50c9692b7c34e.
Il pacchetto chiede create_video_from_studio, che non sa mettere l'avatar in basso a destra:
d'accordo con Achille si fa come il Reel Decreto PA — avatar HeyGen webm trasparente + montaggio locale.
Asset voce completa: 286d86b21f9845f68d79afca41820657 · video avatar: e3434e78f0de3801a06abb14ab5d06d3

## Grafica
Slide del pacchetto + logo CISL FP Padova Rovigo su pastiglia bianca in alto a sinistra.
Sottotitoli: sottotitoli.py (blocchi ≤ ~60 caratteri, tempi sul parlato reale) → sottotitoli.srt;
impressi nel riquadro verde scuro in basso a sinistra, accanto all'avatar (grafica/strati.mjs).

## Montato
Avatar webm scaricato (VP9 con alfa, 1920x1080, 140,49 s); audio allineato a voce-completa.wav
(pause entro 20 ms). Ritaglio mezzo busto (520,0,1100,1080) → altezza 640, x 508, in basso a destra;
alone chiaro sfumato dietro la figura (polo verde su fondo verde). controlla-avatar.py: sagoma in
movimento (140 campioni) contro sottotitoli, slide e bande — 0 pixel coperti.
PDRO_Oncoematologia_Pediatrica_9x16.mp4: 1080x1920, 25 fps, 140,48 s, -21,2 LUFS, 100 MB (fuori da git).
Copia d'invio _invio.mp4: 1500 kb/s in due passate, 28,8 MB. SRT: sottotitoli.srt (52 blocchi).
Controllo: fotogramma a metà di ognuna delle 7 scene.
Da fare prima di pubblicare: verificare aggiornamenti dell'Azienda (esiti verifiche, date di rientro).
