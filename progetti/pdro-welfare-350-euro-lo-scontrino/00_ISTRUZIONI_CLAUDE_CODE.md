# ISTRUZIONI PER CLAUDE CODE – WELFARE 2026 · 350 euro in buoni acquisto – "Lo scontrino"

**PRIMA DI TUTTO:** chiedi ad Achille su quale dei suoi due account HeyGen lavorare. Non generare nulla prima della risposta.

## Video SENZA AVATAR
Tutte le 8 scene sono solo voce fuori campo + grafiche/clip. Nessun avatar in nessuna scena.

## Voce
- ElevenLabs · "CISL FP – Voce calda 40 v4" (voice ID JKBPFityf4CgC86y2ep8: uomo sui 40 anni, calda, carismatica, avvolgente) – fuori campo, nessun avatar.
- La voce è già salvata nella libreria ElevenLabs con il nome **"CISL FP – Voce calda 40 v4"** (voice ID `JKBPFityf4CgC86y2ep8`). Usa quella per generare gli 8 file audio da `voce_testi/` (un file per scena), poi caricali in HeyGen come audio.
- **Modello: `eleven_v4`** (obbligatorio: è quello che interpreta i tag). I testi in `voce_testi/` contengono già i tag di interpretazione tra parentesi quadre ([warmly], [excited], [dramatically], [curious], [short pause]…) e alcune parole in MAIUSCOLO per l'enfasi: vanno incollati così come sono. I tag non vengono letti ad alta voce.
- Per i sottotitoli usa i testi puliti in `sottotitoli_senza_tag/`.
- Genera 2 versioni per scena e scegli la più espressiva.
- Ritmo: caldo e sicuro, senza fretta; una piccola pausa prima di "E cosa, ancora, no" (scena 1) e prima di "Tre cose" (scena 6).

## Materiali
- `SCRIPT.md`, `blocchi.json` – copione e struttura
- `voce_testi/` – 8 testi con tag di interpretazione (nessun numero in cifre, max 90 parole per scena)
- `sottotitoli_senza_tag/` – gli stessi testi senza tag, per i sottotitoli
- `grafiche/` – frame 1080×1920 (JPG) di ogni scena: alterna A→B sulla durata della voce
- `img/` – foto da animare; `overlay_clip/` – PNG trasparenti da sovrapporre alle clip
- `clip/hook.mp4` (scena 1) e `clip/calendario.mp4` (scena 5) – già pronte
- `TESTO_POST.md` – testo per i social

## Montaggio
1. Progetto 9:16, 30 fps. Logo ufficiale CISL FP Padova Rovigo in alto a sinistra (sostituisce il marchio di testo nei frame).
2. Scene CLIP (1, 3, 5): clip a tutto schermo + overlay A→B. Scena 3: anima `img/w_2.png` (image-to-video, 5 s, audio off).
3. Scena 5: clip di sfondo `clip/calendario.mp4` + riquadro "15 DICEMBRE 2026" al centro.
4. Scene GRAFICA: alterna i frame; scontrini che "escono" dall'alto (slide verso il basso + suono di stampante di cassa).
5. Effetti sonori: "ka-ching" di cassa (S1), stampante scontrino (S2), contatore (S3), tonfo + timbro (S5), spunte (S7).
6. Musica: pop strumentale positivo, 105–115 BPM, a −22 dB; cresce in S7.
7. Sottotitoli automatici attivi, nella fascia bassa.

## Checklist
- [ ] Account HeyGen confermato
- [ ] Voce "CISL FP – Voce calda 40 v4" usata per tutte le scene
- [ ] Nessun avatar
- [ ] Dati a schermo: delibera n. 713 dell'11/11/2026 · DoubleYou S.r.l. · 350 € · 15 dicembre 2026
- [ ] Dicitura "schermata illustrativa" leggibile in S4
- [ ] Prima di pubblicare: verificare se nel frattempo sono uscite le modalità operative (accesso, negozi)
