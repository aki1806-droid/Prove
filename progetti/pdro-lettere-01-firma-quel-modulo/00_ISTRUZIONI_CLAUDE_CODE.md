# ISTRUZIONI PER CLAUDE CODE – LETTERE DAL FUTURO · Ep.1 – Firma quel modulo

**PRIMA DI TUTTO:** chiedi ad Achille su quale dei suoi due account HeyGen lavorare. Non generare né modificare nulla prima della risposta.

## Materiali
- `SCRIPT.md` – copione scena per scena con regia
- `blocchi.json` – stessa struttura in formato macchina (scene, voce, frame, foto, overlay)
- `voce_testi/` – un file per scena: `*_narratore.txt` → voce HeyGen "Luca Ward"; `*_achille.txt` → voce ElevenLabs "Achille nuovo 1 v4" con atempo 1.12
- `grafiche/` – frame 1080×1920 di ogni scena (SxxA, SxxB…): sono anche la versione statica di riserva delle scene CLIP
- `img/` – foto da animare (image-to-video 5 s, 9:16, audio off)
- `overlay_clip/` – PNG trasparenti da sovrapporre alle foto animate
- `TESTO_POST.md` – testo per Facebook/Instagram

## Montaggio in HeyGen
1. Crea un progetto 9:16. Tutte le scene tranne l'ultima: **solo voce narrante Luca Ward**, nessun avatar. Ultima scena: avatar **"Aki with a lapel microphone"** in basso a destra con audio ElevenLabs.
2. Logo ufficiale CISL FP Padova Rovigo in alto a sinistra (sostituisce il marchio testuale di riserva nei frame).
3. Per ogni scena CLIP: genera la clip dalla foto in `img/`, mettila a tutto schermo e sovrapponi gli overlay nell'ordine A→B→C, distribuiti sulla durata della voce.
4. Per ogni scena GRAFICA: alterna i frame A→B→C sulla durata della voce.
5. Nessun numero nella narrazione (già verificato); i numeri compaiono solo a schermo.
6. Esporta 1080×1920, 30 fps. Controlla che sottotitoli e avatar non si sovrappongano ai contatti.

## Ritmo e montaggio
- HOOK nei primi 2 secondi: busta che pulsa di luce + parole che si accendono.
- Cambio visivo ogni 2–3 s alternando i frame A/B/C.
- Scritte a mano con effetto "write-on"; timbri con tonfo; fruscio di carta.
- Foto in `img/`: animale con image-to-video (kling3_0, 5 s, 9:16, audio off), poi sovrapponi gli overlay di `overlay_clip/`.
- Musica: pianoforte sospeso + pad, 70–80 BPM, a −22 dB; riser sul bivio (S4), apertura calda da S5.
- Sottotitoli HeyGen nella fascia bassa, mai sopra l'avatar.

## Voci
- Narratore: HeyGen · voce "Luca Ward" (narratore fuori campo, nessun avatar)
- Chiusura: ElevenLabs · "Achille nuovo 1 v4" (atempo 1.12) + avatar HeyGen "Aki with a lapel microphone" in basso a destra

## Checklist
- [ ] Account HeyGen confermato da Achille
- [ ] Nessun segmento oltre 90 parole (max 44)
- [ ] Avatar solo nella scena finale, basso a destra; logo alto a sinistra
- [ ] Contatti leggibili: Achille 391 127 1018 · Giovanna Vullo 389 928 5301 · fp.padova.rovigo@cisl.it
- [ ] Dicitura "storia di fantasia ispirata a situazioni reali" nella descrizione
- [ ] Clip hook già pronta in `clip/hook.mp4`: usala per la scena 1
