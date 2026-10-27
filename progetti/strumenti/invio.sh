#!/bin/bash
# Copia d'invio sotto i 30 MB (limite dell'invio in chat): se l'originale sta già sotto i 29 MB lo copia, altrimenti
# lo ricomprime in due passate con il bitrate che ci sta: 27,8 MB * 8 * 1024 / durata - 96 kbit/s di audio.
#   bash invio.sh <video.mp4> [cartella di uscita]      -> <cartella>/<nome>_invio.mp4
f=$(realpath "$1"); out=${2:-$(dirname "$f")}; mkdir -p "$out"; o="$out/$(basename "$f" .mp4)_invio.mp4"
s=$(stat -c %s "$f"); if [ "$s" -lt 29000000 ]; then cp "$f" "$o"; echo "$o $(du -m "$o" | cut -f1)MB copia"; exit; fi
d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f"); b=$(python3 -c "print(int(27.8*8*1024/$d-96))")
cd "$out" && ffmpeg -v error -y -i "$f" -c:v libx264 -preset slow -b:v ${b}k -pass 1 -an -f null /dev/null && \
  ffmpeg -v error -y -i "$f" -c:v libx264 -preset slow -b:v ${b}k -pass 2 -c:a aac -b:a 96k -movflags +faststart "$o"
rm -f ffmpeg2pass*; echo "$o $(du -m "$o" | cut -f1)MB ${b}k"
