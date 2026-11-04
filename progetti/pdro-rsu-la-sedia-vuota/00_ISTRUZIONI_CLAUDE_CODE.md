# ISTRUZIONI PER CLAUDE CODE — La sedia vuota (RSU AOUP)

Reel 9:16 firmato **Componenti RSU – Azienda Ospedale Università di Padova** (non CISL FP), coerente con i 4 volantini in `img/vol_*.jpg`. Racconta come dovrebbe funzionare la RSU, il meccanismo del numero legale (RSU di 54 componenti, maggioranza assoluta = 28 presenti), cosa succede davvero (sei mesi senza numero legale, firme RSU assenti sugli accordi) e chi sceglie di metterci la faccia. Non modificare i testi.

## 0. Prima di tutto
- **Chiedi ad Achille su quale dei due account HeyGen lavorare.**

## 1. Voce — SOLO VOCE, NESSUN AVATAR
- Tutte le scene: ElevenLabs "Achille nuovo 1 v4", `eleven_multilingual_v2`, poi `silenceremove` + `atempo=1.12`.
- **Nessun avatar in nessuna scena**: il video è interamente voce fuori campo su immagini e grafiche.
- Scena 6: i 18 nomi vanno letti con ritmo regolare e chiaro (eventuale `<break time="0.3s"/>` tra i nomi).

## 2. Logo
- In alto a sinistra: `img/logo_RSU_componenti.png` (ritaglio dal volantino). Niente logo CISL salvo diversa indicazione di Achille.

## 3. Visivi
- `img/rsu_sala.png`, `img/rsu_gruppo.png` — foto Higgsfield da animare (image-to-video) con overlay da `overlay_clip/`.
- `grafiche/` — schermate finite; la scena 6A usa le foto originali dal volantino «Ci mettiamo la faccia».
- Palette ripresa dai volantini: blu navy, rosso, giallo, crema.

## 4. Montaggio
- `create_video_from_studio` senza avatar, durata ~138 s, titolo `RSU AOUP – La sedia vuota`. Registro con tutti gli ID.
