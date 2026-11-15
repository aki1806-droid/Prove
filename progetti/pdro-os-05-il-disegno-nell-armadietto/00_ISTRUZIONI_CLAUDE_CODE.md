# ISTRUZIONI PER CLAUDE CODE – OGGETTI SMARRITI · Ep.5 – Il disegno nell'armadietto

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
1. Crea un progetto 9:16. Scene 1–7: **solo voce narrante Luca Ward**, nessun avatar. Scena 8: avatar **"Aki with a lapel microphone"** in basso a destra con audio ElevenLabs.
2. Logo ufficiale CISL FP Padova Rovigo in alto a sinistra (sostituisce il marchio testuale di riserva nei frame).
3. Per ogni scena CLIP: genera la clip dalla foto in `img/`, mettila a tutto schermo e sovrapponi gli overlay nell'ordine A→B→C, distribuiti sulla durata della voce.
4. Per ogni scena GRAFICA: alterna i frame A→B→C sulla durata della voce.
5. Nessun numero nella narrazione (già verificato); i numeri compaiono solo a schermo.
6. Esporta 1080×1920, 30 fps. Controlla che sottotitoli e avatar non si sovrappongano ai contatti.

## Ritmo e montaggio (stile v2)
- HOOK nei primi 1,5–2 secondi: parte subito l'immagine dell'oggetto animata + parole giganti. Nessun logo animato iniziale.
- Cambio visivo ogni 1,5–2,5 s: alterna i frame A/B/C indicati per ogni scena (cut secco o slide 6 frame).
- Testo cinetico: le parole giganti entrano con scale 110%→100% + leggero shake; gli sticker con pop (overshoot).
- Foto in `img/`: animale con image-to-video (Higgsfield kling3_0, 5 s, 9:16, audio off) con lento push-in e luce viva; poi sovrapponi l'overlay trasparente di `overlay_clip/`.
- Musica: piano + archi cinematici, 70–85 BPM, volume −22 dB sotto la voce; piccolo "riser" sulla scena della svolta (S5).
- Sottotitoli automatici HeyGen attivi, carattere bianco con bordo, nella fascia bassa (y 1500–1750), mai sopra l'avatar.

## Voci
- Narratore: HeyGen · voce "Luca Ward" (narratore fuori campo, nessun avatar)
- Chiusura: ElevenLabs · "Achille nuovo 1 v4" (atempo 1.12) + avatar HeyGen "Aki with a lapel microphone" in basso a destra

## Checklist
- [ ] Account HeyGen confermato da Achille
- [ ] Nessun segmento oltre 90 parole (max 44)
- [ ] Avatar solo nella scena finale, basso a destra; logo alto a sinistra
- [ ] Contatti leggibili: Achille 391 127 1018 · Giovanna Vullo 389 928 5301 · fp.padova.rovigo@cisl.it
- [ ] Dicitura "storia di fantasia ispirata a situazioni reali" nella descrizione
- [ ] Clip hook già pronta in `clip/`: usala per la scena 1
- [ ] Stile grafico "bacheca degli oggetti smarriti": sughero, puntine, filo rosso, etichette da bagaglio, scotch. Effetti sonori leggeri: macchina da scrivere (S3), notifica (S5), timbro (S1, S6, S7)
