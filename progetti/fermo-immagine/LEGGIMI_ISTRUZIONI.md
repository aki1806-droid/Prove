# FERMO IMMAGINE – pacchetto video HeyGen

Video di promozione del flash mob CISL FP Padova Rovigo.
**Lunedì 19 ottobre 2026, ore 11:30, davanti alle rampe del Pronto Soccorso – Azienda Ospedale-Università di Padova.**

Durata stimata: circa 2 minuti e 15 secondi (circa 2.000 caratteri di parlato, 21 scene).
Il pacchetto segue il metodo standard: voce su ElevenLabs, slide renderizzate in locale, HeyGen solo per avatar e montaggio finale in una chiamata.

## Contenuto

| Cartella | Cosa c'è |
|---|---|
| `SCRIPT.md` | Lo script completo, scena per scena, con il tipo di visual |
| `scene.json` | Il manifest delle 21 scene (id, tipo, asset, file audio atteso, testo) |
| `01_testi_elevenlabs/` | Un .txt per ogni blocco parlato (B01–B19), pronti per ElevenLabs |
| `02_slide/` | 9 slide 1920×1080: copertina 3 s, 7 slide di concetto, chiusura 10 s |
| `03_clip/` | Le clip di b-roll 16:9 1080p (vedi sotto) |
| `04_foto_sorgente/` | Le foto Higgsfield da cui sono nate clip e slide, logo, QR del sondaggio |
| `05_extra/` | Miniatura 1280×720 e i due volantini aggiornati con data e luogo |

## Le clip (più del solito: 8 invece di 1-2)

| File | Scena | Origine |
|---|---|---|
| C01_triage_notte.mp4 | B02 | Higgsfield Seedance 2.5 |
| C02_sala_attesa_vuota.mp4 | B04 | Higgsfield Seedance 2.5 |
| C03_mani_stop.mp4 | B08 | Higgsfield Seedance 2.5 (da foto) |
| C04_il_collega.mp4 | B09 | Higgsfield Seedance 2.5 (da foto) |
| C05_cartelli.mp4 | B11 | Higgsfield Seedance 2.5 (da foto) |
| C06_kenburns_rimesso_in_piedi.mp4 | B12 | Movimento di camera locale sulla foto |
| C07_kenburns_fermo_immagine_folla.mp4 | B16 | Movimento di camera locale sulla foto |
| C08_kenburns_mano_stop.mp4 | B18 | Movimento di camera locale sulla foto |

C06, C07 e C08 sono "Ken Burns" fatti in locale perché Higgsfield ha raggiunto il limite giornaliero. Se vuoi sostituirli con clip animate vere, i prompt sono qui sotto: stesso nome file, nessun'altra modifica.

- **C06** (start_image = foto_rimesso_in_piedi): *The three people slowly and carefully lift the nurse mannequin to a standing position; the woman finishes pinning the green badge on his chest; the crowd applauds warmly. The mannequin stays rigid like a real mannequin. Warm afternoon light, documentary realism.*
- **C07** (start_image = foto_flashmob_scena): *The crowd in white t-shirts stands perfectly still with raised STOP palms; only the wind moves the banner; slow crane shot rising backwards. Silent, dignified, realistic.*
- **C08** (testo, 16:9): *Sunrise over the entrance of an Italian hospital emergency department, nurses in scrubs walk in for the morning shift, hopeful warm light, slow dolly, no text.*

Seedance 2.5, 16:9, 1080p, 5–6 s, audio disattivato.

## Passaggi

1. **Account HeyGen:** decidere su quale dei due account montare. L'avatar "Aki in his studio" (gruppo Aki) sta sull'account collegato al connettore.
2. **Voce:** per ogni file in `01_testi_elevenlabs/` una traccia ElevenLabs, voce *Achille nuovo 1*, modello *eleven_multilingual_v2*, generations_count 1. Salvare come `audio/B01.mp3` … `audio/B19.mp3`.
3. **Post-produzione audio:** ffmpeg con `silenceremove` e poi `atempo=1.12`, in quest'ordine.
4. **Upload a batch su HeyGen:** audio, slide e clip.
5. **Montaggio:** `create_video_from_studio`, 16:9, 1080p, sottotitoli attivi, scene nell'ordine di `scene.json`. B00 dura 3 s e B20 10 s, entrambe mute. Nelle scene clip e slide la durata la decide l'audio del blocco; se una clip è più corta dell'audio va rallentata o messa in loop leggero.
6. **Musica:** sulla copertina e sulla chiusura la aggiungi tu, come sempre.
7. **Registro:** annotare id degli asset, id del video e account usato.

## Da verificare prima di pubblicare

- La frase in apertura ("Sono Achille Pagliaro, segretario della CISL FP di Padova e Rovigo") e il riferimento all'ultima aggressione: nessun dettaglio inventato, ma rileggili tu.
- Il QR della slide S07 porta al sondaggio GetFormly già in uso (form.getformly.com/f/5YNRS4).
- Le immagini sono esemplificative e generate con IA: il manichino vero sarà diverso.
