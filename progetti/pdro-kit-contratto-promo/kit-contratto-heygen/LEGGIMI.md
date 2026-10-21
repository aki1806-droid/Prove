# Video "Kit Contratto" – pacchetto per HeyGen

Video promozionale di circa 80 secondi, 16:9, 1080p, con sottotitoli. Palette e grafica sono le stesse di mail e post del Kit Contratto (verde CISL, giallo, logo CISL FP Padova Rovigo).

## Cosa c'è dentro

- `script/copione.md`: il copione completo, scena per scena, con le durate stimate.
- `script/scene.csv`: la stessa scaletta in tabella (tipo di scena, file da usare, testo della voce).
- `script/blocchi/`: un file di testo per ogni blocco di voce, pronto per ElevenLabs.
- `slide/`: 5 slide PNG 1920×1080 (copertina, documenti, come richiederlo, chiusura con QR).
- `clip/`: 2 clip animate MP4 1920×1080 (il kit che si apre, i tre canali WhatsApp).
- `logo/`: logo CISL FP Padova Rovigo.

## Scaletta

| Scena | Visivo | Voce |
|---|---|---|
| 01 | Copertina (3 s) | muta |
| 02 | Avatar | presentazione e Kit Contratto |
| 03 | Clip del kit | quattro guide gratuite |
| 04 | Slide documenti 1-2 | CCNL vigente e nuovo CCNL |
| 05 | Slide documenti 3-4 | genitori e notte di 12 ore |
| 06 | Avatar | i diritti che non conosci |
| 07 | Slide "Richiederlo è semplice" | i tre passaggi |
| 08 | Clip dei tre canali | AOUP Padova, ULSS 6, ULSS 5 |
| 09 | Avatar | invito finale |
| 10 | Chiusura con QR (10 s) | muta, musica tua |

## Come montarlo (metodo solito)

1. Voce: un audio ElevenLabs per ogni file in `script/blocchi/`, voce "Achille nuovo 1", poi ffmpeg `silenceremove` e `atempo=1.12` in quest'ordine.
2. Carica slide, clip e audio su HeyGen come asset.
3. Monta con il montaggio da studio, 16:9 1080p, sottotitoli attivi: avatar per le scene 02, 06 e 09, slide e clip per le altre, ognuna con il suo audio.
4. Le clip durano 8 e 9 secondi: se l'audio della scena è più lungo, l'ultima immagine resta ferma; se è più corto, la clip si accorcia.
5. Copertina 3 s e chiusura 10 s senza voce: la musica la aggiungi tu.

## Da controllare prima di pubblicare

- Il QR della chiusura porta al modulo Formly: https://form.getformly.com/f/x8sbZp
- Nel modulo lo IOV va tolto dal menu delle aziende.
