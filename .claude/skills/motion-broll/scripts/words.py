"""SRT o VTT -> timestamp stimati per parola (ogni cue è distribuito sui suoi caratteri; precisione ~0.2s).
Se hai i timestamp reali per parola (transcribe.py / faster-whisper), usa quelli: sono più precisi.
uso: python3 words.py trascrizione.srt|.vtt > words.txt          (una riga per cue: "12.34:parola 12.61:parola …")
     python3 words.py trascrizione.srt --json > words.json        ([{"t":12.34,"w":"parola","cue":3}, …])
Gestisce: BOM, fine riga Windows (CRLF), cue senza numero, timestamp VTT mm:ss.mmm, impostazioni del cue VTT,
tag <i>/<b>/<c.colore>/{\\an8}, righe NOTE/STYLE del VTT."""
import sys, re, json

def ts(x):
    x = x.strip().split()[0].replace(',', '.')
    p = x.split(':')
    if len(p) == 2: p = ['0'] + p
    h, m, s = p
    return int(h) * 3600 + int(m) * 60 + float(s)

TAG = re.compile(r'<[^>]+>|\{\\[^}]*\}')

def cues(text):
    text = text.lstrip('﻿').replace('\r\n', '\n').replace('\r', '\n')
    for blk in re.split(r'\n\s*\n', text.strip()):
        L = [l for l in blk.strip().split('\n')]
        i = next((k for k, l in enumerate(L) if '-->' in l), None)
        if i is None: continue  # intestazione WEBVTT, NOTE, STYLE, …
        a, b = L[i].split('-->')
        body = TAG.sub('', ' '.join(L[i + 1:])).replace('&amp;', '&').replace('&nbsp;', ' ')
        words = body.split()
        if words: yield ts(a), ts(b), words

def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    as_json = '--json' in sys.argv
    out = []
    for n, (a, b, words) in enumerate(cues(open(sys.argv[1], encoding='utf-8-sig').read()), 1):
        tot = sum(len(w) + 1 for w in words); c = 0; row = []
        for w in words:
            row.append((round(a + (b - a) * c / tot, 2), w)); c += len(w) + 1
        out.append((n, row))
    if as_json:
        print(json.dumps([{'t': t, 'w': w, 'cue': n} for n, row in out for t, w in row], ensure_ascii=False, indent=0))
    else:
        for _, row in out: print(' '.join(f'{t:.2f}:{w}' for t, w in row))

if __name__ == '__main__': main()
