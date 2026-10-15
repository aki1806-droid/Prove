# verifica.sh <etichetta> <url>: scarica il render in video_<etichetta>/, silenzi lunghi, 12 fotogrammi
export PATH=/root/bin:$PATH
SP="${SFL_DIR:-.}"  # la cartella di lavoro del corso, quella che contiene le lezioni
D="$SP/video_$1"; mkdir -p "$D"
curl -sS -o "$D/v.mp4" "$2" || exit 1
ls -l "$D/v.mp4" | awk '{print $5, "byte"}'
ffmpeg -hide_banner -i "$D/v.mp4" 2>&1 | grep -E "Duration|Stream" | head -3
echo "silenzi oltre 2.5 s:"; ffmpeg -hide_banner -i "$D/v.mp4" -af silencedetect=n=-45dB:d=2.5 -f null - 2>&1 | grep silence_end
T=$(ffmpeg -hide_banner -i "$D/v.mp4" 2>&1 | sed -n 's/.*Duration: \([0-9:.]*\).*/\1/p' | awk -F: '{print $1*3600+$2*60+$3}')
args=""; i=0
for f in 0.01 0.06 0.12 0.2 0.28 0.36 0.44 0.52 0.62 0.72 0.84 0.995; do
  t=$(awk "BEGIN{print $T*$f}"); ffmpeg -hide_banner -loglevel error -y -ss $t -i "$D/v.mp4" -frames:v 1 -vf scale=640:360 "$D/f$i.png"; args="$args -i $D/f$i.png"; i=$((i+1))
done
ffmpeg -hide_banner -loglevel error -y $args -filter_complex "xstack=inputs=12:layout=0_0|w0_0|w0+w1_0|0_h0|w0_h0|w0+w1_h0|0_h0+h3|w0_h0+h3|w0+w1_h0+h3|0_h0+h3+h6|w0_h0+h3+h6|w0+w1_h0+h3+h6" "$D/fotogrammi.png"
echo "$D/fotogrammi.png"
