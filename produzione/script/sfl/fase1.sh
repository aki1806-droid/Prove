# fase1.sh <cartella-lezione> <bersaglio>: slide, pose, tagli con pose, card
export PATH=/root/bin:$PATH
D="$1"; cd "$D" || exit 1
python3 slides.py || exit 1
python3 /home/user/Prove/produzione/script/pose.py . "$2" 2>&1 | tail -6
ATEMPO=1.12 python3 /home/user/Prove/produzione/script/tagli.py applica . "$(cat pose.json)" 2>&1 | tail -1
cd /home/user/Prove/produzione/script && CHROME=/opt/pw-browsers/chromium node cards_corso.mjs "$D/slides.json" "$D/slide" > /dev/null 2>&1
ls "$D"/slide/*.png | wc -l
