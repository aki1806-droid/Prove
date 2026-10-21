# REGISTRO — PDRO · «Verso il coordinamento – pacchetto master per gli iscritti» (reel 9:16)

Data: 20 ottobre 2026 · sessione Claude Code (repo Prove). Fonte: Guida Master Coordinamento CISL FP Padova Rovigo, ottobre 2026
(testi del pacchetto non modificati; nessun numerale nei testi voce).
Scelte di Achille: account HeyGen **del connettore**; voce **HeyGen come passante**; grafiche **animate come il Decreto PA**.

## Versione 2 (21/10/2026): generica per tutti i territori, canali WhatsApp e delegati
Richiesta di Achille: «le stesse modifiche del Kit Contratto, rendendolo più generico». Testi nuovi approvati da Achille:
- **S08 nuova (narratore)**: «E per restare aggiornato, entra nel canale WhatsApp CISL FP della tua azienda: Azienda
  Ospedale-Università di Padova, ULSS sei Euganea o ULSS cinque Polesana. Il link è nel primo commento.» — request
  ZNU76w1gc2iWD3n0TpbJ (../strumenti/coordinamento/ward-coordinamento-canali*). Scena: ../strumenti/coordinamento/canali.py
  (fondo come la S07, clip dei tre telefoni del pacchetto Kit Contratto 16:9, card AOUP / ULSS 6 / ULSS 5 sulle parole).
- **S09 chiusura (Achille)**, senza il bando AOUP dell'11/11: «Il master non ti dà l'incarico in automatico: è la chiave per
  candidarti. Noi vogliamo che tu arrivi a quella porta pronto. Attenzione alle scadenze del bando per le centocinquanta ore
  nella tua azienda. Chiedi la guida e il pacchetto al tuo delegato di riferimento. CISL FP Padova Rovigo.» — request
  PZY5oEpdlThzYqaXyLc9 (achille-coordinamento-v2); voce asset 618efcf1c69a4d4086c1f18c44f738f5, avatar webm
  e9a24317a8a27985e139f801922d386d (labiale 0 ms). Grafica: badge «Bando 150 ore: occhio alle scadenze» e riquadro dei
  delegati per azienda al posto di telefono e mail della sede (../strumenti/coordinamento/grafiche_v2.mjs, serie.py ritocca).
- Nessun sottotitolo impresso. Testo per i social: TESTO_POST.md.
Durata: 127,6 s. Originale: asset cac51319ec9d43f6a89f97400baac705 —
https://resource2.heygen.ai/video/cac51319ec9d43f6a89f97400baac705/original.mp4 (la versione 1, AOUP, era 9ec983f39cbe40e7a027256c71a4b803).

## Voci (HeyGen create_speech, engine elevenlabs, eleven_v4)
- Luca Ward (e4bd8d8a357f41a99502309874733c16), scene 1-7 in una traccia: request 6mhIlqNeL72aSCr08KUY, grezzo 103,0 s
  (../strumenti/coordinamento/ward-coordinamento*). Tipo narratore: pause >0,6 s → 0,45 s.
- Achille nuovo 1 (9b851842ce54449fb9ff501751ca0271), chiusura S08: request VvmEORxTxHkCecoc2HD1, grezzo 20,0 s. Pause
  >0,45 → 0,35, atempo **1,16** (non 1,12 né eleven_multilingual_v2 come dice il pacchetto, che presuppone ElevenLabs diretto).
- Tagli: ../strumenti/coordinamento/voci.py, 8 blocchi su 8 giusti al primo colpo.

| Scena | Voce | Inizio | Durata |
|---|---|---|---|
| S01 | narratore | 0.0 s | 11.7 s |
| S02 | narratore | 11.7 s | 13.8 s |
| S03 | narratore | 25.5 s | 15.2 s |
| S04 | narratore | 40.7 s | 12.4 s |
| S05 | narratore | 53.2 s | 14.5 s |
| S06 | narratore | 67.6 s | 15.1 s |
| S07 | narratore | 82.7 s | 15.8 s |
| S08 | achille | 98.5 s | 17.2 s |

## Clip e avatar (HeyGen)
- Asset: mc_coord 1969c583865344a38ff5e69719b31f61 · mc_studio 9f371932effe46e59b172311656b5deb · voce S08 cf2d535659e649c4aea6b35cb4ce7127
- image_to_video heygen-video-1 1080p 12 s: S01 mc_coord 3fed7dc930754e53b7b15724073faa5a · S04 mc_studio 2e7b9f85657042dcbeb2ff17c21b5c3a
  (mc_colloquio e mc_diploma non usate: S08 ha già la sua foto nella grafica)
- Avatar «Aki with a lapel microphone» (e6d73d660d354b94b0a50c9692b7c34e), webm con alfa, S08: ea508d58291529415c15abc399589363;
  labiale verificato per correlazione audio (scarto 0 ms). In basso a destra, come nel Decreto PA, senza coprire il riquadro contatti.

## Grafiche animate
../strumenti/coordinamento/serie.py (pezzi e regia sulle parole) + ../strumenti/chicedomani/pezzi.py, motore.html, rendi.mjs, monta.py.
- S01/S04 overlay sulle clip con bande nere: chip, titolo VERSO IL COORDINAMENTO in dissolvenza; i tre chip (12 mesi, 60 CFU,
  500 ore) compaiono sui numeri pronunciati.
- S02 la chiave si disegna (anello, poi l'asta), i due denti si accendono con le due card dei requisiti.
- S03 card dell'indennità, la cifra entra su «novemila» con bagliore (non un contatore: il motore non scrive i separatori delle
  migliaia nel carattere della grafica); le tre spunte in sequenza.
- S05 la scatola regalo con il pop del coperchio, il nome del pacchetto si scrive, le cinque voci entrano in sequenza.
- S06 le barrature rosse tolte dai prezzi pieni e ridisegnate sulla voce, poi i prezzi per gli iscritti con bagliore.
- S07 la linea si disegna dall'alto, ogni fase si accende quando viene nominata.
- S08 titolo, badge rosso della scadenza che pulsa, riquadro arancio con i contatti, avatar in basso a destra.
Logo CISL FP Padova Rovigo in alto a sinistra (sotto la banda nera nelle scene con clip).

## Uscita
PDRO_Verso_il_coordinamento_9x16.mp4: 1080x1920, 25 fps, 115,7 s (fuori da git), copia d'invio _invio.mp4 (28 MB).
Sottotitoli: sottotitoli.srt (dalla voce, non impressi).
Originale su HeyGen: asset 9ec983f39cbe40e7a027256c71a4b803 — https://resource2.heygen.ai/video/9ec983f39cbe40e7a027256c71a4b803/original.mp4

## Da fare (Achille)
- Verificare quote e rate delle convenzioni e che la scadenza dell'11/11 (bando 150 ore AOUP) valga ancora alla pubblicazione;
  se il video circola fuori dall'AOUP o dopo quella data, la scena 8 va rifatta senza quel riferimento.
- Musica royalty-free (indicata dal pacchetto): non aggiunta.
- Il montaggio è locale (ffmpeg), non create_video_from_studio come proponeva il pacchetto: stesso metodo dei reel CISL precedenti.
