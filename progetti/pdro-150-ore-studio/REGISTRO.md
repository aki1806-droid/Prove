# REGISTRO — PDRO 150 ore studio 2027 (Reel 9:16)

Data: 13 ottobre 2026 · sessione Claude Code (repo Prove)
Account HeyGen: quello del connettore (come per il PDRO Oncoematologia, scelto da Achille)
Metodo: identico al PDRO Oncoematologia (avatar webm trasparente + montaggio locale), perché
create_video_from_studio non sa mettere l'avatar in basso a destra.

## Voce
Achille nuovo 1 — KerPEYZvLEWNATg4AARX (ElevenLabs), modello eleven_v4 (come gli altri video; il pacchetto
indicava eleven_multilingual_v2), 1 generazione per blocco, testi di voce_testi/ invariati.
Flusso ElevenLabs: d8VRrZE9MaMf5enFlpZ0
Generazioni: S01 B5mDIxvCfipCyrVna9K8 · S02 DOIUqT8dEWWWCtjCANIZ · S03 Q6j3CaRHckUOE24zQrUN ·
S04 mQpH6lAJY1anrkuZqNKt · S05 ZCdMTFeznwlaXGXILOqU · S06 VY9QLib4dkxBPKUiNXxp · S07 5CANDx00v3Ri5wkVUBCp
Post (prepara_voce.py): silenceremove (pause > 0,45 s ridotte a 0,35 s) → atempo=1.12 → 0,3 s di coda.
Durate: S01 16,9 · S02 20,3 · S03 19,7 · S04 21,0 · S05 20,6 · S06 19,8 · S07 20,7 — totale 139,0 s.
Tempi delle scene: audio/tempi-scene.json

## Clip (scene 2, 4, 6)
Seedance 2.0 Mini (ElevenLabs) 720p 9:16, 15 s, senza audio, 13.744 crediti l'una:
S02 wQmNClxHiLThOc71jq2i (operatrice in divisa che studia a fine turno) ·
S04 1uw9JX1f9DEySpfvWsyG (mani che firmano il modulo e lo imbustano) ·
S06 cHlgveqdyFgQmoRRrdBf (infermiere e coordinatrice davanti al planning).
Controllate: nessun paziente, nessun logo o testo leggibile.
Nel montaggio: rallentate a durata di scena, virate al verde, banda overlay_clip/ sopra.

## Avatar
Look D «Aki with a lapel microphone» (polo verde) — e6d73d660d354b94b0a50c9692b7c34e.
Asset voce completa: 54f7166be71f4f25b6e8dd13f688658d · video avatar webm: 584a870b013c1f8e80d71bf00d852d0d
(VP9 con alfa, 139,05 s). controlla-avatar.py: 0 pixel coperti su sottotitoli, slide e bande.

## Grafica
Slide e bande del pacchetto + logo CISL FP Padova Rovigo su pastiglia bianca in alto a sinistra.
Sottotitoli: sottotitoli.py → sottotitoli.srt (52 blocchi); a schermo i numeri in cifre
(150, 2027, 11 novembre, 3%, 15 giorni, 20 del mese, 6 mesi), la voce li dice in lettere.
Il rosso #C8102E non compare: le slide del pacchetto hanno la scadenza in bianco.

## Montato
PDRO_150_ore_studio_2027_9x16.mp4: 1080x1920, 25 fps, 139,0 s, -20,3 LUFS, 96 MB (fuori da git).
Copia d'invio _invio.mp4 in due passate sotto i 30 MB. Controllo: fotogramma a metà di ogni scena.

## Da fare prima di pubblicare (entro l'11/11/2026)
- Inserire nel post il link a opuscolo e vademecum (TESTO_POST.md ha [LINK]).
- Musica eventuale: la aggiunge Achille.
