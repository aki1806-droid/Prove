# foglio.sh <cartella-lezione> <etichetta>: fogli di contatto 4x3 delle slide in <cartella>/foglio_<etichetta>
export PATH=/root/bin:$PATH
cd "$1" || exit 1
O="foglio_$2"; mkdir -p "$O"
ls slide/*.png | sort > "$O/lista.txt"
split -l 12 -d "$O/lista.txt" "$O/parte_"
for p in "$O"/parte_??; do
  n=$(wc -l < "$p"); args=""
  if [ "$n" = 1 ]; then ffmpeg -hide_banner -loglevel error -y -i $(cat "$p") -vf scale=640:360 "$p.png"; continue; fi
  for f in $(cat "$p"); do args="$args -i $f"; done
  L=$(echo "0_0|w0_0|w0+w1_0|0_h0|w0_h0|w0+w1_h0|0_h0+h3|w0_h0+h3|w0+w1_h0+h3|0_h0+h3+h6|w0_h0+h3+h6|w0+w1_h0+h3+h6" | cut -d'|' -f1-$n)
  ffmpeg -hide_banner -loglevel error -y $args -filter_complex "$(for i in $(seq 0 $((n-1))); do echo -n "[$i]scale=640:360[s$i];"; done)$(for i in $(seq 0 $((n-1))); do echo -n "[s$i]"; done)xstack=inputs=$n:layout=$L:fill=white" "$p.png"
done
ls "$O"/*.png
