# clip.sh <cartella-lezione>: divide slides.json in tre e rende le clip animate (mp4)
export PATH=/root/bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
export CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
cd "$1" || exit 1
python3 -c "
import json;C=json.load(open('slides.json'));k=(len(C)+2)//3
for i in range(3): json.dump(C[i*k:(i+1)*k],open(f'slides_{i}.json','w'),ensure_ascii=False)"
mkdir -p clip
for i in 0 1 2; do node /home/user/Prove/produzione/script/clips_corso.mjs slides_$i.json ./clip > clip_$i.log 2>&1 & done
wait
cd clip
for d in c*/; do n=${d%/}; ffmpeg -v error -y -framerate 25 -i $n/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 19 $n.mp4; done
ls *.mp4 | wc -l
