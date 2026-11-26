# Video promo dell'assemblea del 7 dicembre — registro

Quattro montaggi dallo stesso copione (`copione.json`): 90 s e 60 s (sottoinsieme
dei blocchi), orizzontale 16:9 e verticale 9:16.

| File | Durata |
|---|---|
| promo-assemblea-90s-16x9.mp4 | 88,9 s |
| promo-assemblea-90s-9x16.mp4 | 88,9 s |
| promo-assemblea-60s-16x9.mp4 | 61,4 s |
| promo-assemblea-60s-9x16.mp4 | 61,4 s |

## Ingredienti
- **Voce:** ElevenLabs diretto, «Achille nuovo 1» (KerPEYZvLEWNATg4AARX), eleven_multilingual_v2,
  una traccia (flow Tcdts50nQTvgykvVduiU, nodo 3bYN529MeHRkKEETADIi, 1.557 crediti), atempo 1,16,
  tagli dalla trascrizione Scribe (gratuita).
- **Avatar:** HeyGen, secondo account (aki1806). Il primo account aveva 3 crediti fino al 5/12.
  16:9 look «Achille Pagliaro at studio desk» (60936f2d407947b08a9751f224ec110c), video f601576e74acc97bb4691314de4064e2;
  9:16 look «Achille Pagliaro in blue suit» (fbb1094d4b6d46de902290f229a6507d), video 45c03b6ed0131daaad30f62d283a8636.
  Audio: b02+b07+b11 in fila (asset 293070144a0647f0b1f9c26fdc7cd4fd).
- **Clip:** Higgsfield seedance_2_5, 6 s, 720p, 4 × 42 crediti: corridoio all'alba e sala che si riempie, in 16:9 e 9:16.
- **Foto:** 06-tribunale (Higgsfield, già nella presentazione).
- **Grafiche:** scene.mjs (anche verticale con ORIENT=v).
- **Musica:** ElevenLabs eleven_music_v2, strumentale, 95 s, 900 crediti, abbassata sotto la voce (sidechain).

## Leve persuasive usate
Aggancio emotivo (fine turno), simpatia (avatar in prima persona, la battuta sul collega),
reciprocità (12 accordi), autorità (documenti, sentenza), paura di perdere (crediti e ferie),
prova sociale (più di mille lettori, sala piena), facilità (anche solo un'ora),
impegno (scrivi «ci sono»).

## Da confermare
- «Più di mille colleghi leggono le nostre mail»: dalle statistiche SendFox (1.378 iscritti, 900-1.100 aperture).
- Il numero WhatsApp mostrato è quello di Achille: 391 127 1018.

---

# Seconda versione (26/11/2026), dopo il «non mi piacciono»

Cosa ha chiesto Achille: seguire le istruzioni dei video creativi (skill motion-broll),
voce «Achille nuovo 1» con eleven_v4 e i tag, dire chiaro che l'assemblea è **retribuita per
tutto il personale del comparto, di ogni reparto e servizio, senza perdere un minuto**, e
l'avatar **non sempre**: c'è solo in tre momenti (aggancio, sussurro, battuta), circa 18 s su 90.

- **Copione:** `copione2.json` (60 s: 921 caratteri; 90 s: 1.350). Il campo `voce` ha i tag
  ([pause], [whispering], [laughs softly]); `testo` è quello dei sottotitoli.
- **Voce:** ElevenLabs diretto, «Achille nuovo 1» (KerPEYZvLEWNATg4AARX), eleven_v4, una sola
  traccia da 91,6 s, 1.425 crediti (flow Tcdts50nQTvgykvVduiU, nodo rys1PSeEXP4nTUErcVLJ).
  Trascrizione Scribe gratuita per i tempi parola per parola.
- **Tagli:** `taglia2.py`, senza atempo; il taglio prima della risata di b10 è messo a mano a 81,82 s.
  Il montato finale è accelerato in blocco: ×1,088 la versione da 60 (65,7 → 60,4 s),
  ×1,046 quella da 90 (94,5 → 90,4 s).
- **Avatar:** HeyGen secondo account, audio b01+b04+b10 in fila (asset af6dd1ddebf7403ab2b0611c66f9132d).
  16:9 look 60936f2d…, video 82bf482638cbd758696ccdea287b414f; 9:16 look fbb1094d…, video 8e743fa55f41b1d43bb5e3d2157ea83f.
- **Grafiche:** 7 clip motion-broll, brand `cisl-fp` (verde, accento giallo), in `motion/src/`;
  `motion/genera.py` scrive le varianti 16:9 e 9:16, poi build.py e render.js a 25 fps.
  1 retribuita (interruttore, «0 giorni di ferie, 0 € di tasca tua») · 2 ruoli spuntati ·
  3 quanto ti spetta (arretrati, 350 €, festivo vinto) · 4 cartella, firma, 12 accordi, aopd.veneto.it ·
  5 calendario delle ferie perse, «Chi non sa, perde.» · 6 biglietto 7:30 → 13:00, Aula Magna,
  i 10 punti · 7 chat «ci sono», WhatsApp.
- **Clip e musica:** le stesse della prima versione (corridoio, sala piena; eleven_music_v2).
- **Sottotitoli:** dai tempi veri delle parole, pezzi brevi, parole chiave in giallo.
- **Montaggio:** `promo2.py <60|90> <h|v>`.

Niente numeri nuovi: 350 €, 12 accordi, orari, piano e telefono sono quelli già verificati nella presentazione.
Le 12 caselle e i 10 segmenti delle grafiche corrispondono ai 12 accordi e ai 10 punti
dell'ordine del giorno; il calendario delle ferie è illustrativo.
