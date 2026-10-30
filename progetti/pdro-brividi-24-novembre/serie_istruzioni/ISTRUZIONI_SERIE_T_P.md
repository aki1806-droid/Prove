# Serie T e P · «Sentirsi per sentire» — istruzioni per Claude Code

Convegno CISL FP Padova Rovigo · martedì 24 novembre 2026, ore 14:00 · Patronato dell’Arcella, Padova.
In questa cartella ci sono 10 video promozionali da produrre, montare e programmare sui social.

## Prima di iniziare
- Usa l’account HeyGen collegato al connettore (scelto da Achille).
- Ogni pacchetto contiene: `storyboard.json` (tempi al decimo di secondo), `NOTE_DI_REGIA.md`, `voce_fuori_campo.txt`, `sottotitoli.srt`, `PROMPT_CLAUDE_CODE_HEYGEN.md`, `TESTI_POST.md`, `clips/`, `cards/`, `brand/` e una bozza muta `ANTEPRIMA_bozza_montaggio_*.mp4`.
- I titoli corretti degli interventi sono: Paccagnella «L’ascolto di sé come antidoto alla violenza», Lucangeli «Ascolto di sé tra scienza e coscienza», Cordella «Donne che hanno scritto no», Morbiato «Ascoltare le storie».
- NON scrivere frasi tipo «immagini generate con IA» nei testi dei post (scelta di Achille). Attiva invece l’etichetta IA nativa delle piattaforme se richiesta.

## Flusso per ogni video (in ordine di uscita)
1. **Video muto**: `python3 strumenti/render_bozza.py <PACCHETTO> --hd` crea `VIDEO_muto_9x16.mp4` a 1080×1920 con clip, cartelli, testi e (in T2) le bolle dei messaggi. Formato unico verticale per tutti i canali.
2. **Voce fuori campo**: per ogni riga di `voce_fuori_campo.txt` genera l’audio con HeyGen `create_speech_without_player`, voce **Lea inside sitting** (`voiceId 7885c6f49ee94be1b642002f6f383543`), `language: it`, `speed: 0.9`. Ogni sintesi richiede l’approvazione di Achille: falle in un unico blocco per video. Posiziona ogni riga all’inizio della sua scena (`inizio_s` in `storyboard.json`).
3. **Musica ed effetti**: cerca con HeyGen `search_audio_sounds` (type `music`) un pianoforte lento ed emotivo come descritto in `NOTE_DI_REGIA.md` → «Il suono»; per gli effetti (battito, porta, vibrazioni del telefono, fiammifero, pioggia, passi) usa type `sound_effects`. Solo materiale della libreria con licenza.
4. **Missaggio** con ffmpeg: voce −6 dB, musica −20 dB sotto la voce e −12 dB senza voce (sidechain o volume per scena), effetti −18 dB, silenzi ESATTI dove la regia dice «nero e silenzio». Normalizza a −14 LUFS.
5. **Sottotitoli**: brucia `sottotitoli.srt` in basso (Instrument Serif, avorio con ombra) — molti guardano senza audio.
6. **Colore**: prima metà fredda e desaturata, seconda metà calda (vedi regole di stile nel pacchetto).
7. **Controllo**: estrai un fotogramma ogni 2 s e verifica testi, titoli, QR leggibile ≥ 3 s nel finale. Mostra il video ad Achille prima di pubblicare.
8. **Pubblicazione**: carica il file su Robin (`media_direct_upload_create` → PUT → `media_direct_upload_finalize`) e crea il post programmato con i dati di `calendario_pubblicazione.json` (data, ora, profili, testi e opzioni per piattaforma). Se il video non è 9:16, su Facebook usa `post_type: post` invece di `reels`.

## Calendario delle uscite (già libere da altri video)
| Pacchetto | Data e ora |
|---|---|
| T1_LA_PORTA_20s | sab 31/10 · 21:00 |
| T3_IL_NODO_45s | mer 4/11 · 21:00 |
| P2_SCARPE_ROSSE_30s | dom 8/11 · 21:00 |
| P3_PRENDERE_PAROLA_40s | mar 10/11 · 21:00 |
| T2_DOVE_SEI_30s | ven 13/11 · 19:30 |
| T4_CHI_CURA_60s | sab 14/11 · 21:00 |
| P5_PADOVA_SI_ACCENDE_90s | lun 16/11 · 21:00 |
| P4_ANCHE_GLI_UOMINI_60s | mer 18/11 · 19:30 |
| T5_ACCENDIAMO_UNA_LUCE_75s | gio 19/11 · 21:00 |
| P1_IL_POSTO_VUOTO_15s | dom 22/11 · 19:30 |

Profili Robin (escluso La Parola Giusta): TikTok 24681, 18053 · YouTube 18260, 18261 · Instagram 18047, 18046, 18045, 18048 · Facebook 12322, 12323, 18051, 18052.

## Clip mancanti (facoltative, Higgsfield, seedance_2_5, 5 s, 9:16)
- **P4 / P5 – uomo in auto**: «A man sitting alone in a parked car at night, rain on the windshield, head bowed, hands on his face, emotional and vulnerable, cinematic, no text.» (la prima formulazione era stata bloccata dal filtro: usa questa).
- **P4 / P5 – padre e figlia**: «Warm home interior at evening: a father kneels down to the eye level of his little daughter, puts his phone away, and listens to her with full attention; tender, soft warm light, cinematic, no text.»
- **P5 – la città si accende**: «Wide establishing shot of a historic Italian city at blue hour, old rooftops, bell towers and domes: the city is dark, then windows light up one after another with warm golden light, spreading across the skyline like a wave. Slow aerial drift, majestic, hopeful, cinematic, no text.»
Senza queste clip i pacchetti funzionano lo stesso: quei momenti sono testo su nero con solo suono, come scritto nella regia.

## Attenzione
- Louis Huang è minorenne: il suo nome compare in alcuni cartelli; serve la liberatoria dei genitori prima della pubblicazione.
- Il calendario editoriale condiviso è https://claude.ai/artifact/PXDFthjDFY4ZxWM85ergyz — dopo ogni pubblicazione aggiungi lì il post (stato «programmato» e numero Robin).
