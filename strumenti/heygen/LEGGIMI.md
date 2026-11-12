# HeyGen con la chiave API

Fa con la chiave API le stesse operazioni del connettore HeyGen (endpoint v3): voce ElevenLabs `eleven_v4`, caricamento di file, avatar sull'audio caricato, clip HeyGen Video 1, stato, download e link di consegna.

**La chiave non sta in questo repository (che è pubblico).** Si legge dalla variabile d'ambiente `HEYGEN_API_KEY`:
- nelle sessioni cloud di Claude Code: impostarla nelle variabili dell'ambiente su claude.ai/code;
- sul PC di Achille è già impostata, e lo stesso script è installato come comando `heygen`.

Richiede Node 18 o più recente, nessuna dipendenza.

| Comando (`node strumenti/heygen/heygen_api.mjs …`) | Cosa fa |
| --- | --- |
| `utente` | saldo del portafoglio in dollari e quote |
| `voce testo.txt voce.wav` | voce «Achille nuovo 1», eleven_v4 (`--voce ID`, `--json risposta.json`) |
| `carica file…` | carica file e restituisce `asset_id` e `url` |
| `avatar LOOK AUDIO_ASSET 16:9 avatar.mp4` | video avatar 1080p sull'audio caricato (`--webm` sfondo trasparente) |
| `clip "prompt" 9:16 clip.mp4 --durata 5` | clip HeyGen Video 1 (`--immagine ASSET`, `--riferimento ASSET`) |
| `clip-lotto lotto.json` | più clip in parallelo: `[{ "out", "prompt", "formato", "durata" }]` |
| `stato ID` · `stato-clip ID` · `scarica ID out.mp4 [--clip]` | stato e download |
| `consegna video.mp4` | carica l'originale e dà il link `resource2.heygen.ai/video/<id>/original.mp4` (controllato) |

Regole: prima di ogni lavoro chiedere ad Achille se usare il **connettore** o la **chiave API**; con la chiave si paga dal portafoglio in dollari (dire saldo e spesa stimata). Voce sempre `eleven_v4`, mai il TTS proprio di HeyGen.
