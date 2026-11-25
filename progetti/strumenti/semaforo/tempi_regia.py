"""Ricalcola i tempi di regia del «Semaforo» (cambi di frame, clic, bip, pausa della musica) dalla trascrizione della voce.
Lo scarto di una parola nella scena = (inizio parola - inizio prima parola della scena) / atempo + metà della pausa d'attacco.
    python3 tempi_regia.py <cartella progetto>"""
import glob, json, sys
D = sys.argv[1]; AT = 1.12
w = json.load(open(f'{D}/audio/parole_grezzo.json'))['words']
par = [[t for t in open(f).read().split() if any(c.isalnum() for c in t)] for f in sorted(glob.glob(f'{D}/voce_testi/*_narratore.txt'))]
inizi, k = [], 0
for p in par:
    inizi.append(k); k += len(p)


def at(scena, parola, n=1):
    """secondi dall'inizio della scena (1-based) all'n-esima parola che comincia con `parola`"""
    a = inizi[scena - 1]; b = inizi[scena] if scena < len(inizi) else len(w)
    hit = [x for x in w[a:b] if x['text'].strip('.,:;?!…').lower().startswith(parola.lower())][n - 1]
    return round((hit['start'] - w[a]['start']) / AT + 0.2, 2)


B = json.load(open(f'{D}/blocchi.json'))
cut = {3: [0, at(3, 'Attenzione') - 0.1], 5: [0, at(5, 'Ma') - 0.1], 6: [0, at(6, 'Verde') - 0.1, at(6, 'Giallo') - 0.1],
       7: [0, at(7, 'definitiva') - 0.3]}
for s in B['scene']:
    if s['scena'] in cut:
        s['tagli'] = cut[s['scena']]
json.dump(B, open(f'{D}/blocchi.json', 'w'), ensure_ascii=False, indent=1)
ev = [["clic", "S01", 0.15, 0.6], ["clic", "S01", 0.5, 0.6], ["clic", "S01", 0.85, 0.6],
      ["bip", "S03", at(3, 'Attenzione'), 0.5],
      ["clic", "S06", 0.1, 0.55], ["clic", "S06", at(6, 'Rosso'), 0.6], ["clic", "S06", at(6, 'Verde') - 0.1, 0.6],
      ["clic", "S06", at(6, 'Giallo') - 0.1, 0.6]]
json.dump(ev, open(f'{D}/suoni/eventi.json', 'w'))
tm = json.load(open(f'{D}/audio/tempi.json'))
d5 = next(x['durata'] for x in tm if x['id'] == 'S05')
ma = at(5, 'Ma') - 0.1
json.dump([["S05", ma, round(d5 - ma + 0.3, 2)]], open(f'{D}/suoni/silenzio.json', 'w'))
print('tagli', cut); print('eventi', ev); print('silenzio S05', ma, round(d5 - ma + 0.3, 2))
