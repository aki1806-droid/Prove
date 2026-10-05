#!/usr/bin/env bash
# Setup una tantum nel progetto. Crea motion/ e verifica Node, Python 3 (numpy), ffmpeg (ProRes) e Playwright + Chromium.
# Se Playwright/Chromium sono già installati (es. sessioni cloud di Claude Code) li riusa, senza scaricare nulla.
# Alla fine scrive motion/env.sh: esegui `source motion/env.sh` prima degli script dell'engine (imposta NODE_PATH).
set -euo pipefail
MOTION_DIR="$(mkdir -p "${1:-./motion}" && cd "${1:-./motion}" && pwd)"
mkdir -p "$MOTION_DIR"/{clips,dist,out,work,inputs,brands}
missing=()
command -v node >/dev/null || missing+=("node 18+ (https://nodejs.org)")
command -v ffmpeg >/dev/null || missing+=("ffmpeg (macOS: brew install ffmpeg · Linux: apt install ffmpeg)")
command -v ffprobe >/dev/null || missing+=("ffprobe (incluso in ffmpeg)")
command -v python3 >/dev/null || missing+=("python3")
if [ ${#missing[@]} -gt 0 ]; then echo "Mancano: ${missing[*]}"; exit 1; fi
python3 -c "import numpy" 2>/dev/null || python3 -m pip install --quiet --user numpy 2>/dev/null || python3 -m pip install --quiet --break-system-packages numpy || python3 -m pip install --quiet numpy
# Playwright: locale in motion/node_modules, altrimenti quello globale, altrimenti installa
NODE_PATH_FOUND=""
if [ -d "$MOTION_DIR/node_modules/playwright" ]; then NODE_PATH_FOUND="$MOTION_DIR/node_modules"
elif GLOBAL="$(npm root -g 2>/dev/null)" && [ -d "$GLOBAL/playwright" ]; then NODE_PATH_FOUND="$GLOBAL"
else
  [ -f "$MOTION_DIR/package.json" ] || echo '{"private":true}' > "$MOTION_DIR/package.json"
  (cd "$MOTION_DIR" && npm install --silent playwright)
  NODE_PATH_FOUND="$MOTION_DIR/node_modules"
fi
# Chromium: prova ad avviarlo; scarica solo se manca davvero
if ! NODE_PATH="$NODE_PATH_FOUND" node -e "require('playwright').chromium.launch().then(b=>b.close()).catch(()=>process.exit(1))" 2>/dev/null; then
  echo "Chromium per Playwright non trovato: lo installo…"
  (cd "$MOTION_DIR" && NODE_PATH="$NODE_PATH_FOUND" npx --yes playwright install chromium)
fi
printf 'export NODE_PATH="%s"\n' "$NODE_PATH_FOUND" > "$MOTION_DIR/env.sh"
mkdir -p "$MOTION_DIR/brands"
ENCODERS="$(ffmpeg -hide_banner -encoders 2>/dev/null || true)"
case "$ENCODERS" in *prores_ks*) ;; *) echo "Nota: il tuo ffmpeg non ha l'encoder prores_ks: i pannelli trasparenti (.mov) non funzioneranno." ;; esac
echo "Pronto. NODE_PATH=$NODE_PATH_FOUND (salvato in $MOTION_DIR/env.sh). Clip in $MOTION_DIR/clips, render in $MOTION_DIR/out, brand in $MOTION_DIR/brands (python3 scripts/brand.py lista)."
