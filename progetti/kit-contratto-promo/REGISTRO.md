# REGISTRO — Kit Contratto CISL FP · Video 1 · Promo «Il tuo Kit Contratto» (Reel 9:16)

Data: 18 ottobre 2026 · sessione Claude Code (repo Prove). Account HeyGen: quello del connettore.
Pacchetto ricevuto già montato (KitContratto_promo_9x16.mp4, 32,6 s, voce ElevenLabs eleven_multilingual_v2 a 1,12x,
sottotitoli impressi). Richiesta: rimontarlo con l'avatar, come indica il LEGGIMI.

## Scelte di Achille
- Rimontaggio con l'avatar nelle scene 1 e 6 (apertura e chiusura); scene 3, 4, 5 a tutto schermo.
- Voce rifatta con **HeyGen come passante** (la voce del pacchetto resta in voce/ come riferimento).
- La freccia del mouse visibile nelle grafiche animate delle scene 3-6 (residuo di registrazione) **resta**.

## Voce
Achille nuovo 1 (HeyGen 9b851842ce54449fb9ff501751ca0271, elevenlabs, eleven_v4), una traccia con i 6 blocchi
(request Hg7Ogkv7zNDLe6x7nE4H), testi di scene_heygen.json invariati (voce_testi/, verificati parola per parola).
Tagli: ../strumenti/kit/voci.py (pause >0,45 s → 0,35 s, atempo 1,16).

## Avatar
Look «Aki with a lapel microphone» e6d73d660d354b94b0a50c9692b7c34e, webm trasparenti:
apertura d8f53c2d4669b252ce78999d6401b0a8 (audio asset 6a0d27f5919345e89a5b7d5758f7f919),
chiusura 3fb9902a87f0edf0bd153415788d530b (audio asset aac7da5724a44c50a3d1231a532e65ba).
In basso a destra con alone chiaro; in chiusura resta sull'ultimo fotogramma fino alla fine della grafica.

## Montaggio
../strumenti/kit/monta.py: le scene mute del pacchetto (scene/sN.mp4) riadattate alla nuova voce (scarti di pochi
decimi), chiusura tenuta a 6,5 s. Nessun logo aggiunto (è già nelle scene). Durate: S01 2.9 · S02 5.3 · S03 2.9 · S04 9.1 · S05 6.0 · S06 6.5 s.
KitContratto_promo_avatar_9x16.mp4: 1080x1920, 30 fps, 32,8 s, -20,5 LUFS, 8,7 MB (fuori da git).
Sottotitoli: sottotitoli.srt nuovi sui tempi della nuova voce, non impressi (quelli del pacchetto in sottotitoli_pacchetto.srt).

## Originale su HeyGen
Caricato il 18/10/2026 come asset df095acab953473c85696b132de01e53: https://resource2.heygen.ai/video/df095acab953473c85696b132de01e53/original.mp4

## Da fare (Achille)
- Musica di sottofondo a volume basso (il pacchetto non la include).
- Didascalie e primo commento: testi/didascalie.txt del pacchetto.
