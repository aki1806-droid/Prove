# Montaggio — Video 02
### Seguendo il tuo metodo: voce su ElevenLabs, grafiche in locale, HeyGen solo per avatar e montaggio finale

---

## Contenuto del pacchetto

| Cartella | Cosa c'è |
|---|---|
| `SCENEGGIATURA.md` | Le 32 scene in ordine, con tempo, tipo, file e testo |
| `voce/` | 32 file .txt, uno per scena, da dare a ElevenLabs |
| `grafiche/` | 20 PNG 1920×1080: copertina, 18 slide e grafiche, chiusura |
| `b-roll-prompt.md` | I 5 b-roll: 2 clip video, 3 immagini da fare con ChatGPT |
| `miniature/` | Due miniature 1280×720 con il tuo avatar |
| `YOUTUBE.md` | Titoli, descrizione con capitoli, tag, commento fissato, schermata finale, Short |

**Composizione:** 9 scene di avatar, 18 grafiche, 5 b-roll. Le grafiche sono di dieci tipi diversi — elenchi, citazioni, tabella, grafico, schema a pila, contatore, schede numerate — così l'occhio non si abitua mai alla stessa forma.

---

## Passo 1 — La voce

- Voce **«Achille nuovo 1»**, modello **v4**, una traccia per ciascun file di `voce/`, `generations_count` 1
- Nomina le tracce come i file: `S01_broll.mp3`, `S02_avatar.mp3`, …

**Un controllo prima di generare tutto:** il tuo metodo calcola 14,5 caratteri al secondo con il modello multilingual v2. Il v4 può avere un ritmo diverso. Genera prima le scene S01 e S02, misura la durata, e se il totale stimato scende sotto gli 8 minuti dimmelo: allungo il testo.

## Passo 2 — Pulizia audio

Per ogni traccia, in quest'ordine:

```
ffmpeg -i S01_broll.mp3 -af "silenceremove=start_periods=1:start_threshold=-45dB:stop_periods=-1:stop_threshold=-45dB:stop_duration=0.35,atempo=1.12" -ar 44100 S01_broll_ok.mp3
```

Serve anche perché HeyGen rifiuta gli mp3 grezzi di ElevenLabs.

## Passo 3 — B-roll

Dal file `b-roll-prompt.md`: B1 e B4 come clip vere (Artlist o Higgsfield, 5 secondi), B2, B3 e B5 come immagini con ChatGPT. Se il parlato di una scena dura più della clip, rallentala a 0,8× oppure tienila ferma sull'ultimo fotogramma.

## Passo 4 — HeyGen

1. Carica a blocchi grafiche, tracce audio e b-roll (gli asset non scadono)
2. `create_video_from_studio`, 16:9, 1080p, **sottotitoli attivi**
3. Ordine: copertina 3 s muta → S01…S32 → chiusura 10 s muta (34 scene, sotto il limite di 50)
4. Scene AVATAR: look **«Aki in his studio»**, a piena inquadratura, mai scontornato né coperto da grafiche
5. Scene di grafica e b-roll: immagine a schermo intero con la traccia della scena
6. Marchio LPG in alto a sinistra: è già dentro le grafiche; sulle scene avatar aggiungilo come sovrimpressione piccola, lontano dal volto

## Passo 5 — Musica e uscita

La musica la aggiungi tu, bassa sotto la voce. Poi il registro del video con tutti gli identificativi, come da metodo.

---

## Perché dovrebbe tenere

- **Apertura senza saluti:** b-roll e una frase netta nei primi 9 secondi, l'avatar entra al decimo
- **Promessa esplicita entro i primi 40 secondi:** le tre cose che vedrai
- **Un cambio visivo ogni 15 secondi circa**, che è il ritmo che impedisce di scorrere via
- **Un anello aperto a metà video:** «la terza mossa è quella che risolve davvero», che tiene fino al capitolo successivo
- **Le frasi da ricordare dette dal tuo volto**, non da una slide: «nessuno alza la voce mentre sta vincendo», «ho alzato la voce, non era quello che volevo»
- **Un esercizio concreto alla fine**, che è ciò che fa tornare la gente al video successivo
