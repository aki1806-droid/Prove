#!/usr/bin/env bash
# Prepara la cartella di una nuova lezione copiando dall'ultima fatta tutto
# quello che non cambia: il tema, il marchio, i caratteri e gli strumenti.
# Restano da scrivere due soli file, che il messaggio finale elenca.
set -euo pipefail

[ $# -eq 1 ] || { echo "uso: ./nuova-lezione.sh m2-l2.1-processo"; exit 1; }
NUOVA="progetti/$1"
# Si copia dalla lezione piu' recente, non sempre dalla prima: gli strumenti
# migliorano lezione dopo lezione e la 1.1 resterebbe indietro.
DA=$(ls -d progetti/m*-l*/ | sort | tail -1); DA=${DA%/}
[ -e "$NUOVA" ] && { echo "$NUOVA esiste gia'"; exit 1; }

mkdir -p "$NUOVA"/{origine,copione,audio/trascrizioni,slide,scene}
# il tema e gli strumenti: identici per tutte le lezioni del corso
cp -r "$DA/slide/font" "$DA/slide/marchio" "$NUOVA/slide/"
cp "$DA/slide/layout.mjs" "$DA/slide/grafica.mjs" "$DA/slide/cards.mjs" "$DA/slide/clips.mjs" "$NUOVA/slide/"
cp "$DA/audio/tagli.py" "$DA/audio/verifica.py" "$DA/audio/verifica-testo.py" "$NUOVA/audio/"
cp "$DA/monta-scene.py" "$DA/monta-locale.py" "$DA/controlli.py" "$DA/verifica-locale.py" "$NUOVA/"
# costruisci.py si riscrive, ma solo nelle due liste in testa: il resto
# (vincoli, stacco, chunk) e' identico e va copiato, non ribattuto.
cp "$DA/copione/costruisci.py" "$NUOVA/copione/"
ln -sfn /opt/node22/lib/node_modules "$NUOVA/node_modules"

cat <<TESTO

$NUOVA pronta (copiata da $DA). Da scrivere, due file:

  copione/costruisci.py    i blocchi del parlato (parte da quello di $DA)
  slide/contenuti.mjs      il contenuto delle scene

Poi, nell'ordine:

  python3 copione/costruisci.py          scrive blocchi.json e verifica i vincoli
  → generare le due tracce di voce, salvarle in audio/grezzo-A.mp3 e -B.mp3
  python3 audio/tagli.py allinea         sceglie i confini, prepara prova.mp3
  → trascrivere: attaccare l'URL firmato di ciascuna traccia con
    creative_attach_reference_file, poi creative_transcribe_audio;
    salvare i testi in audio/trascrizioni/A.txt e B.txt
  python3 audio/verifica-testo.py        deve dire "la voce ha detto tutto"
  python3 verifica-locale.py             nessuna coppia adiacente di segno opposto
  python3 audio/tagli.py applica         scrive i 48 mp3
  node slide/cards.mjs                   i PNG — GUARDARLI
  node slide/clips.mjs                   le clip animate
  python3 monta-scene.py                 clip + audio, una per blocco
  python3 monta-locale.py                la copia di controllo e l'SRT
  python3 controlli.py                   i controlli del MASTER §5

Lo stacco fra le due tracce sta in audio/tagli.py, costante STACCO.

TESTO
