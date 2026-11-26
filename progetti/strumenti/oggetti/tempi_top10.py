"""«Top 10 – Assemblea 7 dicembre»: cambi di frame sulle parole, effetti e pausa della musica prima del #1.
    python3 tempi_top10.py <cartella progetto>"""
import glob, json, sys
D = sys.argv[1]; AT = 1.12
w = json.load(open(f'{D}/audio/parole_grezzo.json'))['words']
par = [[t for t in open(f).read().split() if any(c.isalnum() for c in t)] for f in sorted(glob.glob(f'{D}/voce_testi/*_narratore.txt'))]
inizi, k = [], 0
for p in par:
    inizi.append(k); k += len(p)


def at(scena, parola, n=1):
    a = inizi[scena - 1]; b = inizi[scena] if scena < len(inizi) else len(w)
    hit = [x for x in w[a:b] if x['text'].strip('.,:;?!…').lower().startswith(parola.lower())][n - 1]
    return round((hit['start'] - w[a]['start']) / AT + 0.2, 2)


B = json.load(open(f'{D}/blocchi.json'))
cut = {1: [0, at(1, 'Dati') - 0.1], 3: [0, at(3, 'nono') - 0.35, at(3, "All'ottavo") - 0.1], 4: [0, at(4, 'sesto') - 0.35, at(4, 'quinto') - 0.35],
       5: [0, at(5, 'terzo') - 0.35, at(5, 'secondo') - 0.45], 6: [0, at(6, 'TU') - 0.1], 7: [0, at(7, 'Organizzati') - 0.1], 8: [0, at(8, 'porta') - 0.2]}
for s in B['scene']:
    if s['scena'] in cut:
        s['tagli'] = cut[s['scena']]
json.dump(B, open(f'{D}/blocchi.json', 'w'), ensure_ascii=False, indent=1)
tu = at(6, 'TU')
ev = [['neon', 'S01', 0.05, 0.7], ['whoosh', 'S02', 0.0, 0.6], ['whoosh', 'S03', 0.0, 0.6]]
for sc, c in ((3, cut[3]), (4, cut[4]), (5, cut[5])):
    ev += [['whoosh', f'S0{sc}', t, 0.6] for t in c if t > 0 or sc != 3]
ev += [['rullo', 'S06', max(0, tu - 1.1), 0.8], ['applauso', 'S06', tu + 0.3, 0.45], ['timbro', 'S07', 1.0, 0.6]]
json.dump(ev, open(f'{D}/suoni/eventi.json', 'w'))
tm = {x['id']: x for x in json.load(open(f'{D}/audio/tempi.json'))}
# musica: stop secco dalla fine della scena 5 al «TU», poi riparte
json.dump([['S06', -0.4, tu + 0.4]], open(f'{D}/suoni/silenzio.json', 'w'))
print('tagli', cut); print('eventi', ev); print('TU a', tu)
