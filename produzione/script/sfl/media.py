"""media.py <lezione> <blocco>: media.json della lezione dalla ripresa registrata per il modulo."""
import json, sys, glob
les, blk = sys.argv[1], sys.argv[2]
R = {}
for f in glob.glob('../riprese_m*.json'):
    R.update(json.load(open(f)))
r = R[les]
json.dump({blk: {"tipo": "immagine", "nome": r['nome'], "url": r['url'],
                 "nota": r['nota'] + ". Nessuna persona riconoscibile, nessuna scritta leggibile, nessun marchio. Generata su ElevenLabs con Nano Banana 2"}},
          open('media.json', 'w'), ensure_ascii=False, indent=1)
print(les, blk, r['nome'])
