"""archivia.py <dir> <lezione> <video_id> <durata_s> <crediti_voce> <note.md>

Copia i copioni della lezione in produzione/copioni/sfl-N-M-*.json e scrive
produzione/registri/sfl-N-M.md: le note scritte a mano (prima e dopo la
tabella, divise da una riga '---tabella---') piu' i numeri misurati.
"""
import json, shutil, sys, os
os.environ['PATH'] = '/root/bin:' + os.environ['PATH']
d, lez, vid, durata, cred, note = sys.argv[1:7]
R = '/home/user/Prove/produzione'
k = 'sfl-' + lez.replace('.', '-')
import os
sys.path.insert(0, f'{R}/script')
from tagli import silenzi
for n in ('blocchi', 'chunks', 'confini', 'tagli', 'media', 'pose', 'slides'):
    if os.path.exists(f'{d}/{n}.json'):
        shutil.copy(f'{d}/{n}.json', f'{R}/copioni/{k}-{n}.json')
B = json.load(open(f'{d}/blocchi.json'))
nat = json.load(open(f'{d}/durate_nat.json'))
dur = json.load(open(f'{d}/durate.json'))
ch = json.load(open(f'{d}/chunks.json'))
rip = list(json.load(open(f'{d}/media.json')).items())
slides = json.load(open(f'{d}/slides.json'))
voce, tot = sum(nat.values()), sum(dur.values())
car = sum(len(x['text']) for x in B)
pause = [b - a for K in ch for a, b in silenzi(f'{d}/unico_{K}_raw.wav', 1.1)]
attesi = sum(len(v) - 1 for v in ch.values())
it = lambda x, n=1: f'{x:,.{n}f}'.replace(',', ' ').replace('.', ',').replace(' ', '.')
if isinstance(ch, dict):
    tracce = ' · '.join(f"{a} `{v[0]}`–`{v[-1]}`" for a, v in ch.items())
else:
    tracce = ' · '.join(f"{x['id'] if 'id' in x else chr(65+i)} `{x['blocchi'][0]}`–`{x['blocchi'][-1]}`"
                        for i, x in enumerate(ch))
testo = open(note).read()
prima, dopo = testo.split('---tabella---') if '---tabella---' in testo else (testo, '')
durata = float(durata)
tab = f"""| campo | valore |
|---|---|
| video_id | `{vid}` |
| scene | 50 — copertina, {len(slides) - 2} slide, {len(rip)} ripresa, chiusura |
| formato | 16:9, 1080p |
| durata | {it(durata)} s ({int(durata // 60)}:{int(round(durata % 60)):02d}) — misurata sul montato |
| parlato | {it(tot)} s ({it(voce)} s di voce tagliata + {it(tot - voce)} s di pose) |
| copione | {car:,} caratteri in {len(B)} blocchi, media {round(car / len(B))} |
| voce | «Achille nuovo 1» `9b851842ce54449fb9ff501751ca0271` su HeyGen, `create_speech` con `engine: "elevenlabs"` e `eleven_v4`, **1,12×** in post |
| tracce | {tracce} |
| ripresa | {', '.join(f"`{s}` {m['nome']}" for s, m in rip)} |
| costo | {cred} |

**Confini: {len(pause)} su {attesi}** trovati al primo colpo da `confini_heygen.py`, senza trascrizione; pausa di confine più corta **{it(min(pause), 2)} s**, taglio a metà della pausa.
""".replace(f'{car:,}', it(car, 0))
open(f'{R}/registri/{k}.md', 'w').write(prima.rstrip() + '\n\n' + tab + '\n' + dopo.strip() + '\n')
print(k, len(pause), attesi, round(voce, 1), round(tot, 1))
