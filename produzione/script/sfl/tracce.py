"""tracce.py <A-B,C-D,...>: chunks.json e testo_X.txt dai blocchi, con la pausa da 1,6 s fra un blocco e l'altro."""
import json, sys
C = {x['id']: x['text'] for x in json.load(open('blocchi.json'))}
R = [tuple(map(int, r.split('-'))) for r in sys.argv[1].split(',')]
ch = {chr(65 + i): [f's{n:02d}' for n in range(a, b + 1)] for i, (a, b) in enumerate(R)}
assert sum(len(v) for v in ch.values()) == len(C), 'i blocchi non sono tutti coperti'
json.dump(ch, open('chunks.json', 'w'))
for k, ids in ch.items():
    t = ' <break time="1.6s"/> '.join(C[i] for i in ids)
    open(f'testo_{k}.txt', 'w').write(t)
    print(k, len(ids), len(t), '' if len(t) <= 2900 else 'TROPPO LUNGA')
