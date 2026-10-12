# Pubblicare una lezione pronta (caricamento, resa, registro)

Per chi riceve il compito di pubblicare una lezione già montata in locale.
Repository `/home/user/Prove`, si lavora da `progetti/`. La lezione è pronta
quando `python3 controlli.py` (dalla sua cartella) dice **8/8 superati**: se non
è così, fermati e riportalo.

## 1. Lista dei file

```
python3 ../metodo/strumenti/carica-lotto.py prepara <lezione> AB s01 s02 ... s50
```

(le 50 scene: `$(for i in $(seq -w 1 50); do echo s$i; done)`). Stampa il JSON
dei 98 file (48 audio, 48 clip, 2 PNG).

## 2. Lotto HeyGen

`mcp__HEYGEN__create_asset_upload_batch` con `title` «CISL N.M <titolo breve>»
e `files` = quel JSON, identico. Il risultato è troppo grande e viene salvato
in un file `tool-results/...txt`: usa quel percorso.

```
python3 ../metodo/strumenti/carica-lotto.py carica <lezione> <file-del-risultato>
```

Deve dire «caricati 98 su 98» (ritenta da solo i 503). Per una lezione nuova
scrive anche `asset-id.json` e `asset-id-audio.json`. Poi
`mcp__HEYGEN__complete_asset_batch` con il `batch_id` stampato, e
`mcp__HEYGEN__get_asset_batch` (limit 1) ogni minuto circa finché
`counts_by_status` è tutto `completed` (98). Non usare `sleep` in primo piano:
usa `sleep 60` con `run_in_background`.

## 3. Scene e resa

```
python3 ../metodo/strumenti/scene-da-asset.py <lezione>
python3 -c "import json;print(json.dumps(json.load(open('<lezione>/scene.json')),separators=(',',':')))"
```

`mcp__HEYGEN__create_video_from_studio` con:
- `title`: «CISL FP – N.M <titolo completo della lezione>» (dalla prima riga del REGISTRO);
- `aspectRatio` "16:9", `resolution` "1080p", `caption` {"file_format":"srt"};
- `scenes`: le 50 scene di `scene.json`, identiche.

Poi `mcp__HEYGEN__get_video` ogni 30-60 s finché `status` è `completed`
(di solito 1-3 minuti). Se `failed`, fermati e riporta `failure_message`.

## 4. Registro

```
python3 ../metodo/strumenti/registra-resa.py <lezione> <video_id> <duration> "<titolo>"
```

(`duration` in secondi, dal risultato di get_video; il titolo come nelle tabelle
del modulo). Aggiorna REGISTRO, `MODULO-N.md` e README.

## Regole

- Una sola chiamata di creazione per lotto e per resa: per controllare lo stato
  si interroga, non si ricrea.
- Non toccare copioni, slide, audio. Non fare commit.
- Riporta: batch_id, video_id, durata, e ogni anomalia.
