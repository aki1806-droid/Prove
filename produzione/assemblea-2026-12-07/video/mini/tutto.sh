#!/bin/bash
# aspetta il giro di scene in corso, ridisegna 01 e 02, poi monta tutti i video
cd "$(dirname "$0")"
while pgrep -f "node scene.mjs" >/dev/null; do sleep 10; done
for n in 01 02; do f=$(ls $n-*.json); rm -rf lavoro/$n/scene; node scene.mjs $f lavoro/$n/scene 25 1.4 > lavoro/$n.log 2>&1; done
for f in [0-9][0-9]-*.json; do n=${f%%-*}; echo "== $f"; python3 monta.py $f lavoro/$n 2>&1 | grep -E -e "ATTENZ|ALLINEAMENTO|CONFINI|\.mp4:|Error|rror"; done
ls -la [0-9][0-9]-*.mp4
