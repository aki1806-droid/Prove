source /home/user/Prove/produzione/assemblea-2026-12-07/video/promo/motion/env.sh
cd /home/user/Prove/produzione/assemblea-2026-12-07/video/promo/motion
for f in dist/*.html; do n=$(basename $f .html); node /root/.claude/skills/synced/f48cbcf9-743a-4b94-b1d7-e06d84cf3ed6_b9e9bec8-3516-4780-a4dc-8567464f828c/motion-broll/engine/render.js $f out/$n.mp4 25 --workers 4 > work/render-$n.log 2>&1 && echo "fatto $n"; done
