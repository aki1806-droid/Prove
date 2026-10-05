"""Trascrizione locale con timestamp reali per parola (faster-whisper). Da usare quando non c'è un SRT/VTT,
o quando servono tempi precisi (l'SRT dà solo stime ±0.2s).
uso: python3 transcribe.py video.mp4 motion/work [--lang it] [--model small]
scrive: <outdir>/transcript.srt, <outdir>/words.txt (stesso formato di words.py), <outdir>/words.json
Primo uso: pip install faster-whisper (scarica anche il modello, ~250 MB per 'small')."""
import sys, os, json

def arg(name, default):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default

def srt_ts(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'

def main():
    if len(sys.argv) < 3: sys.exit(__doc__)
    src, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
    lang = arg('--lang', 'it'); model = arg('--model', 'small')
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        sys.exit('faster-whisper non è installato: python3 -m pip install faster-whisper')
    try:
        m = WhisperModel(model, device='cpu', compute_type='int8')
    except Exception as e:
        sys.exit(f"Impossibile scaricare/caricare il modello Whisper '{model}' ({type(e).__name__}: {str(e)[:120]}).\n"
                 "Probabilmente la rete blocca huggingface.co: chiedi all'utente un SRT/VTT esportato dal suo editor, "
                 "oppure abilita huggingface.co nella policy di rete dell'ambiente.")
    segs, info = m.transcribe(src, language=None if lang == 'auto' else lang, word_timestamps=True, vad_filter=True)
    srt, lines, words = [], [], []
    for i, s in enumerate(segs, 1):
        srt += [str(i), f'{srt_ts(s.start)} --> {srt_ts(s.end)}', s.text.strip(), '']
        row = [(round(w.start, 2), w.word.strip()) for w in (s.words or []) if w.word.strip()]
        lines.append(' '.join(f'{t:.2f}:{w}' for t, w in row))
        words += [{'t': t, 'w': w, 'cue': i} for t, w in row]
        print(f'{srt_ts(s.start)}  {s.text.strip()}', file=sys.stderr)
    open(f'{out}/transcript.srt', 'w', encoding='utf-8').write('\n'.join(srt))
    open(f'{out}/words.txt', 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
    json.dump(words, open(f'{out}/words.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print(f'lingua: {info.language} · {len(words)} parole · scritti transcript.srt, words.txt, words.json in {out}')

if __name__ == '__main__': main()
