# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La ferita chirurgica guarisce per prima intenzione, e nella maggior parte dei casi guarisce senza problemi."),
 (1,"chiaro",0,"Il compito dell'infermiere e' proteggerla nei primi giorni, riconoscere presto un'infezione o una deiscenza, e sapere che cosa fare nell'unica vera emergenza di questa lezione: l'eviscerazione."),
 (1,"chiaro",0,"Tre cose, quindi: proteggere, riconoscere, agire. La lezione le segue in quest'ordine, e il caso finale le mette insieme."),

 (2,"chiaro",0,"La medicazione applicata in sala operatoria, sterile, non si rimuove nelle prime quarantotto ore, se non per necessita': sanguinamento, essudato abbondante, distacco, segni di infezione."),
 (2,"chiaro",0,"In quei primi due giorni la ferita si sta sigillando, e ogni apertura e' un rischio. Quando la si rinnova, si usa una tecnica asettica."),
 (2,"chiaro",0,"Dopo quarantotto ore, di norma, la persona puo' fare la doccia, secondo l'indicazione del chirurgo: la ferita sigillata non teme l'acqua, teme le mani."),

 (3,"chiaro",0,"Che cosa osservare. Margini accostati. Un lieve arrossamento dei margini nei primi giorni e' normale: e' la fase infiammatoria della guarigione, che abbiamo visto nella lezione sette punto uno."),
 (3,"chiaro",0,"L'essudato: quantita' e tipo. Il dolore, e soprattutto il suo andamento: un dolore che aumenta dopo i primi giorni invece di diminuire e' un segnale."),
 (3,"chiaro",0,"E i segni sistemici: i parametri, con la temperatura. Una ferita si guarda ogni giorno con gli stessi occhi, e si scrive cio' che si vede: il confronto con ieri e' la valutazione."),

 (4,"chiaro",0,"L'infezione del sito chirurgico, che abbiamo gia' definito nella lezione quattro punto uno: entro trenta giorni, novanta con impianto."),
 (4,"chiaro",0,"Si classifica in superficiale, che interessa cute e sottocute; profonda, che interessa fasce e muscoli; di organo o spazio, come un ascesso addominale. Tre profondita', e la terza non si vede dalla ferita."),
 (4,"chiaro",0,"I segni: rossore che si estende, calore, edema, dolore in aumento, essudato purulento, apertura della ferita, febbre, in genere dal terzo-quinto giorno."),
 (4,"chiaro",0,"Una febbre nelle prime ventiquattro-quarantotto ore, invece, raramente dipende dalla ferita: ha quasi sempre un'altra causa, e la ferita non si apre per cercarla."),

 (5,"chiaro",0,"Il bundle di prevenzione delle infezioni del sito chirurgico, in tre tempi. Prima dell'intervento: doccia preoperatoria; niente tricotomia con il rasoio, che provoca microlesioni colonizzate."),
 (5,"chiaro",0,"Se serve, si usa il clipper, subito prima dell'intervento. Controllo della glicemia; abbandono del fumo; nutrizione: le stesse cose che ostacolano la guarigione nella lezione sette punto uno."),
 (5,"chiaro",0,"Durante: profilassi antibiotica entro sessanta minuti prima dell'incisione; antisepsi con clorexidina alcolica; mantenimento della normotermia, perche' l'ipotermia aumenta le infezioni."),
 (5,"chiaro",0,"Dopo: medicazione sterile per quarantotto ore e igiene delle mani. Lo riprenderemo nel modulo nove. Prima, durante, dopo: la ferita si protegge in tre tempi."),

 (6,"chiaro",0,"La rimozione dei punti e delle agrafes avviene su indicazione del chirurgo, con tempi che dipendono dalla sede. Indicativamente: volto tre-cinque giorni, perche' la vascolarizzazione e' ottima e si vuole una cicatrice minima."),
 (6,"chiaro",0,"Cuoio capelluto, tronco e addome sette-dieci; arti dieci-quattordici; zone articolari e sotto tensione quattordici o piu'."),
 (6,"chiaro",0,"Nei quiz conta l'ordine: il volto per primo, le articolazioni per ultime. Dove la cute e' ben irrorata si toglie presto, dove e' in tensione si aspetta."),

 (7,"chiaro",0,"La tecnica. Asepsi. Per il punto, si solleva il nodo con la pinza, si taglia il filo vicino alla cute, dal lato opposto al nodo."),
 (7,"chiaro",0,"E si sfila in modo che la parte esterna, contaminata, non attraversi il tessuto. E' il dettaglio che il quiz chiede: il filo che era fuori non deve passare dentro."),
 (7,"chiaro",0,"Spesso si rimuovono a punti alterni, verificando che la ferita tenga, prima di rimuovere gli altri. Al termine si possono applicare strisce adesive di rinforzo."),

 (8,"chiaro",0,"La deiscenza: i margini della ferita si separano, in genere fra il quinto e il decimo giorno."),
 (8,"chiaro",0,"I fattori di rischio: obesita', diabete, malnutrizione, corticosteroidi, infezione, e tutto cio' che aumenta la pressione addominale: tosse, vomito, distensione."),
 (8,"chiaro",0,"Un segno premonitore da conoscere: un'improvvisa fuoriuscita di liquido siero-ematico abbondante dalla ferita, a volte con la sensazione riferita di qualcosa che si e' rotto."),

 (9,"chiaro",0,"L'eviscerazione: i visceri fuoriescono attraverso la ferita. E' un'emergenza chirurgica, e la sequenza va saputa. Uno: si resta con il paziente e si chiama aiuto."),
 (9,"chiaro",0,"Due: posizione supina con le ginocchia flesse e la testata lievemente sollevata, per ridurre la tensione sulla parete addominale."),
 (9,"chiaro",0,"Tre: si coprono i visceri con garze sterili imbevute di fisiologica tiepida, perche' non si secchino. Quattro: non si tenta di riposizionarli."),
 (9,"chiaro",0,"Cinque: digiuno, perche' tornera' in sala. Sei: parametri e segni di shock. Sette: rassicurare, perche' e' un'esperienza terrificante. Otto: avvisare subito il chirurgo."),

 (10,"chiaro",0,"La prevenzione della deiscenza. Insegnare alla persona a sostenere la ferita con un cuscino o con le mani quando tossisce, starnutisce o si muove."),
 (10,"chiaro",0,"Insegnare ad alzarsi girandosi prima sul fianco, invece di sollevarsi di colpo usando gli addominali. Nutrizione, controllo glicemico, e fasce addominali su indicazione. La deiscenza si previene con le stesse cose che la causano, al contrario."),

 (11,"chiaro",0,"Quando la ferita e' infetta o si e' aperta senza eviscerazione: si avvisa il chirurgo, si raccolgono i campioni su indicazione, con la tecnica della lezione sette punto uno: tessuto vitale, non pus."),
 (11,"chiaro",0,"E spesso la ferita viene aperta del tutto e lasciata guarire per seconda intenzione, con medicazioni avanzate o con la terapia a pressione negativa, che vediamo nella prossima lezione."),

 (12,"chiaro",0,"Un collegamento importante: il dolore della ferita. Una persona con dolore non controllato non si mobilizza, respira superficialmente e non tossisce, con il rischio di complicanze polmonari e trombotiche."),
 (12,"chiaro",0,"Un'analgesia adeguata e rivalutata, come nella lezione tre punto sette, e' anche prevenzione delle complicanze. Chi non ha dolore respira, tossisce, cammina."),

 (13,"chiaro",0,"Il caso. Sesto giorno dopo una laparotomia, paziente obeso e diabetico; dopo un colpo di tosse la medicazione si bagna di abbondante liquido rosato. Che cosa pensi?"),
 (13,"chiaro",0,"Segno premonitore di deiscenza: il giorno giusto, i fattori di rischio giusti, il liquido giusto. Che cosa fai? Non lasci il paziente, lo metti supino con le ginocchia flesse, ispezioni la ferita."),
 (13,"chiaro",0,"Se ci sono visceri esposti applichi la sequenza dell'eviscerazione. Copri con garze sterili, digiuno, parametri."),
 (13,"profondo",1.2,"[serious] E avvisi subito il chirurgo. Una ferita che cede non aspetta il giro del mattino."),

 (14,"chiaro",0,"Nelle aziende venete le infezioni del sito chirurgico sono oggetto di sorveglianza, il bundle di prevenzione e' integrato nelle procedure e nella check-list di sala operatoria."),
 (14,"chiaro",0,"E la medicazione delle ferite segue procedure aziendali. Molte infezioni compaiono dopo la dimissione: per questo l'educazione del paziente sui segni da riconoscere e' parte della prevenzione."),

 (15,"chiaro",0,"L'educazione alla dimissione: insegnare a riconoscere rossore che si estende, secrezione purulenta, dolore in aumento, febbre e apertura della ferita."),
 (15,"chiaro",0,"Spiegare igiene e doccia; dire chiaramente a chi rivolgersi. Con il teach-back della lezione due punto sette: la persona ripete, con parole sue, che cosa deve guardare e chi deve chiamare."),

 (16,"chiaro",0,"Ricapitoliamo. Medicazione sterile per quarantotto ore. Infezione del sito entro trenta o novanta giorni. Bundle: niente rasoio, profilassi entro sessanta minuti, normotermia."),
 (16,"chiaro",0,"Punti: volto tre-cinque giorni, articolazioni quattordici. Deiscenza fra il quinto e il decimo giorno, annunciata dal liquido siero-ematico abbondante."),
 (16,"chiaro",0,"Eviscerazione: ginocchia flesse, garze con fisiologica tiepida, non riposizionare, digiuno, chirurgo subito."),
 (16,"chiaro",0,"[warm] Nella prossima lezione: le medicazioni avanzate. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Le prime 48 ore",3:"Che cosa osservare",4:"L'infezione del sito chirurgico",5:"Il bundle",
 6:"La rimozione dei punti: i tempi",7:"La rimozione dei punti: la tecnica",8:"La deiscenza",9:"L'eviscerazione",10:"Prevenire la deiscenza",
 11:"La ferita infetta o aperta",12:"Il dolore",13:"Il caso",14:"In Veneto",15:"L'educazione alla dimissione",16:"Chiusura"}

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.8

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
    if len(b["text"])>225 and b["id"] not in DEROGHE: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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
