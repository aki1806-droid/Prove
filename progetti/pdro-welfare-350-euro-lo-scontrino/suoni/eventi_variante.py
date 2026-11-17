# eventi.json per una variante di voce: spunte S07 sulle 4 priorità, dal grezzo trascritto
import json,sys
D,V=sys.argv[1],sys.argv[2]
w=[x for x in json.load(open(f'{D}/audio/{V}/parole_grezzo.json'))['words'] if x.get('type','word')=='word' and not x['text'].startswith('[') and not x['text'].endswith(']')]
t=[x['text'] for x in w]
i=max(k for k in range(len(t)-2) if t[k]=='Come' and t[k+1]=='CISL')
s0=w[i]['start']-0.15
def dopo(a,b):
    return next(w[k]['start'] for k in range(i,len(t)-1) if t[k]==a and t[k+1].lower().startswith(b))
pri=[dopo('Una','piattaforma'),dopo('Una','rete'),dopo('La','possibilit'),dopo('nessun','ritardo')-0.1]
ev=[["cassa","S01",0.25,0.55],["stampante","S02",0.15,0.5],["contatore","S03",0.3,0.35],["tonfo","S05",0.6,0.7]]
ev+=[["spunta","S07",round((p-s0)/1.12,2),0.45] for p in pri]
json.dump(ev,open(f'{D}/suoni/eventi_{V}.json','w')); print(V,ev[4:])
