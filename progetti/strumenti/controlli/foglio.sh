#!/bin/bash
# Foglio di controllo di un video finito: provino di fotogrammi (uno ogni ~1,7 s, 12 per riga), integrità, loudness e labiale
# (durata della voce di chiusura contro durata dell'avatar).   bash strumenti/controlli/foglio.sh <cartella> <video.mp4> [uscita.jpg]
D=$1; V=$2; S=/tmp/claude-0/-home-user-Prove/88c49a3c-ab22-5204-be86-d15ded680d66/scratchpad; mkdir -p "$S"
OUT=${3:-$S/cs_$(basename "$D").jpg}
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
n=$(python3 -c "import math;print(max(12,math.ceil($dur/1.7/12)*12))")
ffmpeg -loglevel error -y -i "$V" -vf "fps=$n/$dur,scale=203:-1,tile=12x$((n/12))" -frames:v 1 -q:v 4 "$OUT"
err=$(ffmpeg -v error -i "$V" -f null - 2>&1 | head -3); [ -z "$err" ] && echo "integro" || echo "ERRORI: $err"
ffmpeg -hide_banner -nostats -i "$V" -af ebur128=peak=true -f null - 2>&1 | awk '/Integrated loudness/{f=1} f&&/I:/{i=$2} f&&/Peak:/{p=$2} END{printf " I: %s LUFS  Peak: %s dBFS", i, p}'
if [ -f "$D/avatar/avatar.webm" ]; then
  ult=$(ls "$D"/audio/finali/*.mp3 | sort | tail -1)
  va=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$ult"); aa=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$D/avatar/avatar.webm")
  python3 -c "print(' labiale %d ms (voce %.1f s, avatar %.1f s)' % (round(abs($va-$aa)*1000), $va, $aa))"
else echo; fi
echo "$OUT"
