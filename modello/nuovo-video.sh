#!/usr/bin/env bash
# Prepara la cartella di un video nuovo copiando dall'ultimo fatto tutto quello
# che non cambia: gli strumenti e il marchio. Restano da fare due cose sole, che
# il messaggio finale elenca: rispondere alle cinque domande nel profilo, e
# scrivere il copione.
set -euo pipefail

[ $# -eq 1 ] || { echo "uso: ./nuovo-video.sh nome-del-video"; exit 1; }
NUOVO="progetti/$1"
# Si copia dall'ultimo fatto, non sempre dal primo: gli strumenti migliorano
# video dopo video, e il primo resterebbe indietro.
DA=$(ls -dt progetti/*/ 2>/dev/null | head -1 || true); DA=${DA%/}
[ -n "$DA" ] || DA="modello"
[ -e "$NUOVO" ] && { echo "$NUOVO esiste gia'"; exit 1; }

mkdir -p "$NUOVO"/{origine,copione,audio/trascrizioni,clip/{marchio,grezze},scene}
cp "$DA"/aritmetica.py "$DA"/verifica-locale.py "$DA"/controlli.py "$NUOVO"/
cp "$DA"/monta-scene.py "$DA"/monta-heygen.py "$DA"/monta-locale.py "$NUOVO"/
cp "$DA"/audio/tagli.py "$DA"/audio/verifica.py "$DA"/audio/verifica-testo.py "$NUOVO"/audio/
cp "$DA"/clip/{prompt.py,sottotitoli.py,lavora.py,provino.py,cartelli.py} "$NUOVO"/clip/
cp "$DA"/profilo.json "$NUOVO"/profilo.json
cp -r "$DA"/clip/marchio/. "$NUOVO"/clip/marchio/ 2>/dev/null || true

cat <<TESTO

$NUOVO pronta (copiata da $DA). Da fare, due cose:

  profilo.json             le cinque risposte: tema, palette, voce, durata, formato
  copione/costruisci.py    i blocchi: parlato e inquadratura sulla stessa riga

Poi, nell'ordine:

  python3 aritmetica.py                  la scheda dei conti: quanti caratteri, quanti blocchi
  python3 copione/costruisci.py          scrive blocchi.json e verifica i vincoli
  python3 clip/prompt.py                 scrive i prompt delle clip
  → generare le clip (preventivo del costo PRIMA), scaricarle in clip/grezze/
  python3 clip/provino.py                i fogli a contatto — GUARDARLI
  → generare le due tracce di voce, salvarle in audio/grezzo-A.mp3 e -B.mp3
  python3 audio/tagli.py allinea         sceglie i confini, prepara prova.mp3
  → trascrivere da ASSET AUDIO, non dal nodo che ha generato la voce;
    salvare i testi in audio/trascrizioni/A.txt e B.txt
  python3 audio/verifica-testo.py        deve dire "la voce ha detto tutto"
  python3 verifica-locale.py             nessuna coppia adiacente di segno opposto
  python3 audio/tagli.py applica         scrive gli mp3 dei blocchi
  python3 clip/lavora.py                 clip alla durata esatta, marchio, sottotitoli
  python3 clip/provino.py finite         riguardare: i sottotitoli coprono qualcosa?
  python3 clip/cartelli.py               copertina e chiusura
  python3 monta-scene.py                 clip + audio, una scena per blocco
  python3 monta-locale.py                la copia di controllo e l'SRT
  → caricare gli asset, compilare clip/asset-id.json
  python3 monta-heygen.py                il payload delle scene
  python3 controlli.py                   i controlli del MASTER §6

Lo stacco fra le due tracce di voce sta in audio/tagli.py, costante STACCO.

TESTO
