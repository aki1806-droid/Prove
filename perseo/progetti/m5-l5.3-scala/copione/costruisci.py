# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Terzo vantaggio fiscale, il piu' importante. Arriva alla fine, quando ricevi la pensione complementare o il capitale."),
 (1,"chiaro",0,"E premia chi e' rimasto a lungo. Funziona come una scala di pietra, che si scende un gradino all'anno."),
 (1,"chiaro",0,"Piu' anni passi nella previdenza complementare, piu' bassa e' l'imposta che pagherai quando arriva il momento di incassare."),
 (1,"chiaro",0,'In questa lezione vediamo quanto si scende, fino a dove, e su quali somme si paga davvero.'),
 (1,"chiaro",0,'Come sempre in questo modulo: informazioni generali, non consulenza fiscale, ed esempi semplificati.'),

 (2,"chiaro",0,"Ecco la scala del fisco. La troverai di nuovo piu' avanti nel corso, quindi vale la pena guardarla bene."),
 (2,"chiaro",0,"Le prestazioni del fondo pensione, sia la rendita sia il capitale, sono tassate con un'imposta del quindici per cento."),
 (2,"chiaro",0,"Per i primi quindici anni di partecipazione resti fermo sul primo gradino: quindici per cento. E' gia' meno del primo scaglione IRPEF."),
 (2,"chiaro",0,"Ma per ogni anno di partecipazione oltre il quindicesimo, l'aliquota scende di zero virgola trenta punti. Un gradino all'anno."),
 (2,"chiaro",0,"Con vent'anni di partecipazione si arriva al tredici e mezzo per cento: cinque gradini, un punto e mezzo in meno."),
 (2,"chiaro",0,'Con venticinque anni, al dodici per cento. Con trenta, al dieci e mezzo. Ogni cinque anni, un punto e mezzo in meno.'),
 (2,"chiaro",0,'E con trentacinque anni si tocca il fondo della scala: nove per cento. Venti gradini scesi, uno per ogni anno oltre il quindicesimo.'),
 (2,"chiaro",0,"Piu' in basso non si va: la riduzione massima e' di sei punti. Anche con quaranta anni di partecipazione, resti al nove."),
 (2,"chiaro",0,"Facciamo un esempio concreto. Chi aderisce a quarant'anni e va in pensione a sessantasette, matura ventisette anni di partecipazione."),
 (2,"chiaro",0,"Dodici anni oltre i quindici, per zero virgola trenta: tre virgola sei punti in meno. La sua aliquota e' l'undici virgola quattro per cento."),

 (3,"chiaro",0,'Per capire quanto vale questa scala, confrontiamola con le tasse che paghiamo di solito sullo stipendio e sulla pensione.'),
 (3,"chiaro",0,"Lo stipendio e la pensione pubblica pagano l'IRPEF: il ventitre' per cento sul primo scaglione, poi il trentatre', poi il quarantatre'."),
 (3,"chiaro",0,'E a queste aliquote si aggiungono le addizionali regionali e comunali, che variano da territorio a territorio.'),
 (3,"chiaro",0,"La pensione complementare, invece, paga un'imposta fissa, tra il quindici e il nove per cento, a seconda degli anni di partecipazione."),
 (3,"chiaro",0,"Un'imposta che non dipende dal tuo reddito, non si somma agli altri redditi, e non ha addizionali. Si chiama imposta sostitutiva, perche' sostituisce l'IRPEF."),
 (3,"chiaro",0,'Per molti lavoratori significa pagare sulla pensione complementare molto meno di quanto pagherebbero se la stessa somma arrivasse come reddito ordinario.'),
 (3,"chiaro",0,"Con trentacinque anni di partecipazione, il nove per cento e' meno della meta' del ventitre'. E molto meno del trentatre'."),
 (3,"chiaro",0,'Ricordi la lezione cinque punto uno? I contributi li hai dedotti al tuo scaglione IRPEF. E alla fine li ritrovi tassati tra il quindici e il nove.'),
 (3,"chiaro",0,"E' in questa differenza, tra quello che hai risparmiato entrando e quello che paghi uscendo, che si guadagna davvero."),

 (4,"chiaro",0,"Un dettaglio rende il vantaggio ancora piu' grande. L'imposta della scala si applica solo a una parte della prestazione."),
 (4,"chiaro",0,"Immagina la prestazione come una torta. Due spicchi si staccano subito e si posano di lato, perche' hanno gia' pagato le loro imposte."),
 (4,"chiaro",0,"Il primo spicchio sono i rendimenti: li hai gia' tassati anno per anno durante l'accumulo, al venti per cento, come abbiamo visto nella lezione precedente."),
 (4,"chiaro",0,'Il secondo sono gli eventuali contributi non dedotti, quelli oltre il limite. Li vediamo nella prossima lezione.'),
 (4,"chiaro",0,"Si tassa, quindi, solo il resto: i contributi dedotti, il TFR e l'accantonamento aggiuntivo. Cioe' le somme che non hanno ancora pagato imposte."),

 (5,"chiaro",0,"Attenzione, pero': non tutte le uscite dal Fondo sono uguali. La scala vale per le prestazioni previdenziali, e per alcune uscite legate a eventi importanti."),
 (5,"chiaro",0,"Vale per la pensione complementare, in rendita o in capitale. E vale per l'anticipazione per spese sanitarie straordinarie."),
 (5,"chiaro",0,"Vale anche per i riscatti dovuti a cause che non dipendono dalla tua volonta', come il decesso, l'invalidita' o la perdita del lavoro per lunghi periodi."),
 (5,"chiaro",0,"Invece l'anticipazione per la prima casa e quella per i congedi formativi pagano il ventitre' per cento, fisso."),
 (5,"chiaro",0,"E lo stesso ventitre' per cento vale per il riscatto per dimissioni, cioe' quando lasci il lavoro e chiedi indietro la posizione."),
 (5,"chiaro",0,"Il messaggio del legislatore e' chiaro: il trattamento migliore e' riservato a chi usa il fondo per la pensione, o per affrontare un momento davvero difficile."),

 (6,"profondo",1.2,"Ogni anno in piu' nel fondo e' un gradino in meno di tasse."),

 (7,"chiaro",0,'Le tre cose da ricordare. Uno: le prestazioni pensionistiche si tassano al quindici per cento, meno zero virgola trenta per ogni anno oltre il quindicesimo.'),
 (7,"chiaro",0,"Due: con trentacinque anni di partecipazione si arriva al nove per cento, il minimo. Piu' in basso la scala non scende."),
 (7,"chiaro",0,"Tre: si tassano solo le somme che non hanno gia' pagato imposte. I rendimenti, no: hanno gia' pagato durante l'accumulo."),
 (7,"chiaro",0,'La mossa di oggi: conta quanti anni di partecipazione avrai quando andrai in pensione. Ti bastano un foglio e una penna.'),
 (7,"chiaro",0,'Sottrai quindici. Moltiplica il risultato per zero virgola tre. E togli quello che ottieni da quindici.'),
 (7,"chiaro",0,"Se il risultato scende sotto il nove, fermati a nove: e' il fondo della scala, e nessuno scende piu' in basso."),
 (7,"chiaro",0,"Quella e' la tua aliquota futura, sulle somme maturate dal 2018. Scrivila da qualche parte: ti servira' nei prossimi moduli."),
 (7,"chiaro",0,"Perche' proprio dal 2018? Per i dipendenti pubblici c'e' una storia a strati, che vediamo nell'ultima lezione del modulo."),
 (7,"chiaro",0,'Nella prossima lezione, invece: i contributi non dedotti. Cosa succede a quelli che superano il limite, e come comunicarli al Fondo.'),
 (7,"chiaro",0,"E' un passaggio piccolo, ma che evita di pagare le tasse due volte sugli stessi soldi."),
 (7,"chiaro",0,'[warm] Ci vediamo nella lezione cinque punto quattro.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'La scala del fisco', 3: 'Il confronto', 4: 'Si tassa solo il resto', 5: 'Non tutte le uscite', 6: 'Memo', 7: 'Chiusura'}
CPS = 17.0   # GianP eleven_v3, misurata sul corso Infermiere: si rimisura sulla 1.1

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>50: errori.append(f"scene {nscene} > 50")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+3+10
print(f"blocchi   {len(blocchi)}        scene {nscene}/50")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])}")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:52]}...')

# Lo stacco fra le due tracce: il confine di capitolo che divide i caratteri
# nel modo piu' pari, fra quelli che tengono ENTRAMBI i chunk sotto i 5.000.
# Prendere il primo confine dopo la meta' non basta: su 2.2 dava un chunk A da
# 5.072 caratteri, e la voce avrebbe rifiutato il testo.
LIMITE = 5000
cand = []
acc = 0
for i, b in enumerate(blocchi[:-1]):
    acc += len(b["text"]) + 1
    if b["capitolo"] != blocchi[i+1]["capitolo"]:
        cand.append((b["id"], acc, tot - acc))
buoni = [c for c in cand if c[1] <= LIMITE and c[2] <= LIMITE]
if buoni:
    stacco, a, bb = min(buoni, key=lambda c: abs(c[1] - c[2]))
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
else:
    stacco, a, bb = min(cand, key=lambda c: max(c[1], c[2]))
    errori.append(f"nessuno stacco tiene i due chunk sotto {LIMITE}: il migliore e' "
                  f"{stacco} con {max(a, bb)} car. Serve un capitolo in piu'.")
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
# tagli.py deve tagliare dove la voce ha davvero staccato: se le due costanti
# divergono, i blocchi finiscono sulla traccia sbagliata e non se ne accorge
# nessuno finche' non si guarda il video.
import pathlib as _pl
_tagli = _pl.Path("audio/tagli.py")
if _tagli.exists():
    _m = re.search(r'STACCO\s*=\s*"(s\d+)"', _tagli.read_text(encoding="utf-8"))
    if _m and _m.group(1) != stacco:
        errori.append(f'audio/tagli.py ha STACCO = "{_m.group(1)}", qui lo stacco e\' {stacco}')

print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)

# I due chunk per la voce li scrive lo stesso file che ha scritto i blocchi:
# copiarli a mano significherebbe far divergere il copione dal testo letto,
# e la verifica della trascrizione confronterebbe due cose gia' diverse.
i = [b["id"] for b in blocchi].index(stacco)
for nome, gruppo in (("A", blocchi[:i+1]), ("B", blocchi[i+1:])):
    open(f"audio/chunk{nome}.txt","w",encoding="utf-8").write(
        "\n\n".join(b["text"] for b in gruppo) + "\n")
print(f"scritti audio/chunkA.txt e audio/chunkB.txt")
