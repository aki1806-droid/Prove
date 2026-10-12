#!/bin/bash
# Monta in sequenza le lezioni indicate: card, clip, scene, montato locale, controlli.
# uso: coda-montaggio.sh m15-l15.1-metodo m15-l15.4-toracico ...   (da progetti/)
# Una lezione alla volta: le clip in parallelo saturano la CPU e rallentano tutto.
cd "$(dirname "$0")/../../progetti"
for L in "$@"; do
  echo "== $L"
  (cd "$L" && node slide/cards.mjs 2>&1 | tail -1 \
    && node slide/clips.mjs 2>&1 | tail -1 \
    && python3 monta-scene.py 2>&1 | tail -1 \
    && python3 monta-locale.py 2>&1 | tail -1 \
    && python3 controlli.py 2>&1 | grep -E "FALL|superati")
done
