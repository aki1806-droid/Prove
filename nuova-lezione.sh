#!/usr/bin/env bash
# Prepara la cartella di una nuova lezione copiando da 1.1 tutto quello che
# non cambia: il tema, il marchio, i caratteri e gli strumenti.
# Restano da scrivere due soli file, che il messaggio finale elenca.
set -euo pipefail

[ $# -eq 1 ] || { echo "uso: ./nuova-lezione.sh m1-l1.2-profilo"; exit 1; }
NUOVA="progetti/$1"; DA="progetti/m1-l1.1-mansionario"
[ -e "$NUOVA" ] && { echo "$NUOVA esiste gia'"; exit 1; }

mkdir -p "$NUOVA"/{origine,copione,audio/trascrizioni,slide,scene}
# il tema e gli strumenti: identici per tutte le lezioni del corso
cp -r "$DA/slide/font" "$DA/slide/marchio" "$NUOVA/slide/"
cp "$DA/slide/layout.mjs" "$DA/slide/cards.mjs" "$DA/slide/clips.mjs" "$NUOVA/slide/"
cp "$DA/audio/tagli.py" "$DA/audio/verifica.py" "$NUOVA/audio/"
cp "$DA/monta-scene.py" "$DA/monta-locale.py" "$DA/controlli.py" "$NUOVA/"
ln -sfn /opt/node22/lib/node_modules "$NUOVA/node_modules"

cat <<TESTO

$NUOVA pronta. Da scrivere, due file:

  copione/costruisci.py    i blocchi del parlato (parte da quello di 1.1)
  slide/contenuti.mjs      il contenuto delle scene

Poi, nell'ordine:

  python3 copione/costruisci.py          scrive blocchi.json e verifica i vincoli
  → generare le due tracce di voce, salvarle in audio/grezzo-A.mp3 e -B.mp3
  python3 audio/tagli.py allinea         sceglie i confini, prepara prova.mp3
  → trascrivere prova.mp3 in audio/trascrizioni/prova.txt
  python3 audio/verifica.py              deve dire "fuori posto: 0"
  python3 audio/tagli.py correggi        se non lo dice (vedi correzioni.json)
  python3 audio/tagli.py applica         scrive i 48 mp3
  node slide/cards.mjs                   i PNG — GUARDARLI
  node slide/clips.mjs                   le clip animate
  python3 monta-scene.py                 clip + audio, una per blocco
  python3 monta-locale.py                la copia di controllo e l'SRT
  python3 controlli.py                   i controlli del MASTER §5

Lo stacco fra le due tracce sta in audio/tagli.py, costante STACCO.

TESTO
