# dl.sh <cartella> <traccia> <audio_url>: scarica la traccia restituita da create_speech come unico_<traccia>_raw.wav
cd "$1" && curl -sS -o "unico_$2_raw.wav" "$3" && ls -la "unico_$2_raw.wav" | awk '{print $5, $9}'
