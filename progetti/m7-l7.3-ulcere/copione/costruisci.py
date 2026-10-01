# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le ulcere degli arti inferiori sono un problema enorme, soprattutto a domicilio, e il loro trattamento parte da una domanda sola: qual e' la causa?"),
 (1,"chiaro",0,"Un'ulcera venosa e un'ulcera arteriosa si curano in modo opposto: la compressione che guarisce la prima puo' far perdere l'arto nella seconda."),
 (1,"chiaro",0,"Per questo la diagnosi differenziale e' il cuore della lezione. Prima si capisce quale gamba si ha davanti, poi si apre la medicazione."),

 (2,"chiaro",0,"L'ulcera venosa, la piu' frequente. La causa e' l'insufficienza venosa: il sangue ristagna nelle vene della gamba e la pressione danneggia i tessuti."),
 (2,"chiaro",0,"Sede tipica: il malleolo mediale, il terzo inferiore della gamba, la cosiddetta zona della ghetta. E' superficiale, con margini irregolari ed essudato abbondante."),
 (2,"chiaro",0,"Intorno: edema, cute iperpigmentata brunastra, eczema, indurimento. Il dolore e' moderato e migliora sollevando la gamba. I polsi periferici sono presenti."),
 (2,"chiaro",0,"Edema, iperpigmentazione, eczema, lipodermatosclerosi: la gamba racconta anni di ristagno prima dell'ulcera. Chi guarda solo l'ulcera non vede la causa."),

 (3,"chiaro",0,"L'ulcera arteriosa. La causa e' l'ischemia: il sangue arterioso non arriva. Sede: dita, tallone, dorso del piede, zona pretibiale: le zone piu' distali, dove il sangue arriva per ultimo."),
 (3,"chiaro",0,"Margini netti, come fatti con uno stampo, fondo pallido o necrotico, essudato scarso. La cute e' pallida, fredda, lucida, senza peli."),
 (3,"chiaro",0,"Il dolore e' intenso, peggiora sollevando la gamba e di notte, e la persona trova sollievo tenendo la gamba penzoloni fuori dal letto. I polsi sono assenti o ridotti."),

 (4,"chiaro",0,"Il confronto in una tabella. Sede: malleolo mediale contro dita e piede. Essudato: abbondante contro scarso. Cute: edematosa e pigmentata contro pallida, fredda e glabra."),
 (4,"chiaro",0,"Dolore: migliora sollevando contro peggiora sollevando. Polsi: presenti contro assenti. Se ricordi solo una riga, ricorda quella del dolore e della posizione: e' la piu' chiesta."),

 (5,"chiaro",0,"Lo strumento che decide: l'indice caviglia-braccio, o ABI. E' il rapporto fra la pressione sistolica alla caviglia e quella al braccio, prendendo la piu' alta fra le due braccia, misurate con un Doppler."),
 (5,"chiaro",0,"Normale fra circa zero virgola nove e uno virgola tre: alla caviglia la pressione e' circa quella del braccio, o un po' piu' alta. Sotto zero virgola nove indica arteriopatia. Sotto zero virgola cinque un'ischemia grave."),
 (5,"chiaro",0,"E sopra uno virgola tre indica arterie incomprimibili perche' calcificate, tipiche del diabetico: il valore non e' affidabile e servono altri esami."),

 (6,"chiaro",0,"La compressione e' il trattamento dell'ulcera venosa: senza compressione, un'ulcera venosa difficilmente guarisce, perche' la causa, il ristagno, resta. Ma prima si misura l'ABI."),
 (6,"chiaro",0,"Da zero virgola otto in su: compressione indicata. Fra zero virgola cinque e zero virgola otto: compressione ridotta, solo su indicazione specialistica. Sotto zero virgola cinque: compressione controindicata."),
 (6,"chiaro",0,"E la regola di sicurezza: senza ABI non si comprime. Un bendaggio su un arto ischemico puo' provocare necrosi. E' la regola che il caso di oggi mettera' alla prova."),

 (7,"chiaro",0,"Il bendaggio. Piede a novanta gradi. Dalla base delle dita fino sotto il ginocchio, includendo il tallone. Pressione graduata: maggiore alla caviglia e decrescente verso l'alto, per favorire il ritorno venoso."),
 (7,"chiaro",0,"Spire sovrapposte in modo regolare, perche' la pressione deve essere uniforme. Oggi si usano spesso sistemi multicomponente."),
 (7,"chiaro",0,"E si sorvegliano dolore, intorpidimento, colorito e temperatura delle dita: se compaiono, il bendaggio si allenta e si avvisa. Le dita restano fuori proprio per questo: per guardarle."),

 (8,"chiaro",0,"Le altre misure. Sollevare le gambe a riposo. Camminare, perche' la contrazione del polpaccio pompa il sangue verso l'alto: e' la pompa muscolare del polpaccio. Evitare di stare a lungo in piedi."),
 (8,"chiaro",0,"E dopo la guarigione, le calze elastiche terapeutiche, spesso per tutta la vita: le ulcere venose recidivano molto se si sospende la compressione."),

 (9,"chiaro",0,"Nell'ulcera arteriosa, la priorita' e' la valutazione vascolare specialistica, perche' senza rivascolarizzazione spesso non guarisce. Niente compressione. Non sollevare l'arto."),
 (9,"chiaro",0,"Proteggere dal freddo, ma niente fonti di calore dirette, come borse dell'acqua calda: su un arto ischemico e spesso poco sensibile provocano ustioni."),
 (9,"chiaro",0,"Le escare secche stabili non si rimuovono. Controllo del dolore. E l'abbandono del fumo. Tutto quello che nella venosa aiuta, qui e' al contrario."),

 (10,"chiaro",0,"Il piede diabetico. Tre meccanismi, spesso insieme. La neuropatia: la persona non sente piu' il dolore, quindi non si accorge di una scarpa che stringe, di un sassolino, di una bruciatura."),
 (10,"chiaro",0,"L'arteriopatia: la perfusione e' ridotta. L'infezione, che nel diabetico progredisce rapidamente. Il risultato puo' essere un'ulcera che nessuno ha notato finche' non e' grave."),
 (10,"chiaro",0,"Spesso coesistono: una scarpa che stringe su un piede che non sente, con poco sangue, e un'infezione che corre. Il piede diabetico e' tre problemi in uno."),

 (11,"chiaro",0,"Due classificazioni. Quella di Wagner, dal grado zero, piede a rischio senza lesioni, al grado cinque, gangrena estesa. Sei gradi, e il grado zero e' gia' un piede da sorvegliare."),
 (11,"chiaro",0,"E quella dell'Universita' del Texas, che combina la profondita' della lesione con la presenza di infezione e ischemia."),
 (11,"chiaro",0,"La valutazione della neuropatia si fa con il monofilamento da dieci grammi: se la persona non lo percepisce in alcuni punti del piede, ha perso la sensibilita' protettiva. Poi la palpazione dei polsi e l'ispezione."),

 (12,"chiaro",0,"Il trattamento dell'ulcera plantare diabetica si regge su un principio: lo scarico. Se la persona continua a camminare sulla lesione, l'ulcera non guarisce, qualunque medicazione si usi."),
 (12,"chiaro",0,"Si usano gessi a contatto totale, tutori, calzature e plantari specifici. E' l'equivalente, per il piede, del riposizionamento nelle lesioni da pressione."),

 (13,"chiaro",0,"E la prevenzione, che e' soprattutto educazione. Ispezionare i piedi ogni giorno, anche con uno specchio. Lavarli con acqua tiepida, verificandone la temperatura con il gomito o un termometro, non con il piede che non sente."),
 (13,"chiaro",0,"Asciugare bene fra le dita. Unghie tagliate dritte. Mai camminare scalzi. Calzature comode, controllate all'interno prima di indossarle: un sassolino non si sente, si trova."),
 (13,"chiaro",0,"Niente fonti di calore, niente callifughi. E rivolgersi subito per qualunque lesione, anche piccola: nel piede che non sente, piccola non vuol dire innocua."),

 (14,"chiaro",0,"Il caso. Anziana con ulcera al malleolo mediale, edema, essudato abbondante: il quadro e' venoso. Viene chiesto un bendaggio compressivo, ma l'ABI non e' stato misurato. Che cosa fai?"),
 (14,"chiaro",0,"Non applichi la compressione finche' l'ABI non e' stato valutato, perche' un'arteriopatia associata e' frequente nell'anziano e la compressione potrebbe essere dannosa. Lo segnali e ne chiedi la misurazione."),
 (14,"chiaro",0,"Nel frattempo detergi, gestisci l'essudato, proteggi la cute perilesionale e consigli di sollevare la gamba a riposo: tutto cio' che aiuta la venosa senza rischiare l'arteriosa."),
 (14,"profondo",1.2,"[serious] Un quadro venoso evidente non esclude un'arteriopatia nascosta: e' l'ABI che lo esclude, non l'occhio."),

 (15,"chiaro",0,"In Veneto esistono percorsi e centri di riferimento per il piede diabetico, con equipe multidisciplinari, e ambulatori vulnologici aziendali e territoriali."),
 (15,"chiaro",0,"La maggior parte delle ulcere degli arti inferiori si cura a domicilio, con l'ADI: e' li' che l'infermiere decide, spesso da solo, se quella gamba si puo' comprimere."),
 (15,"chiaro",0,"All'orale, la parola chiave per il piede diabetico e' multidisciplinarieta', e per l'ulcera venosa ABI prima della compressione."),

 (16,"chiaro",0,"Ricapitoliamo. Venosa: malleolo mediale, essudato abbondante, migliora sollevando, polsi presenti. Arteriosa: dita, cute pallida, peggiora sollevando, polsi assenti."),
 (16,"chiaro",0,"ABI normale zero virgola nove-uno virgola tre; sotto zero virgola cinque niente compressione; e senza ABI, nessuna compressione."),
 (16,"chiaro",0,"Piede diabetico: neuropatia, arteriopatia, infezione; scarico; educazione. E il monofilamento da dieci grammi per la sensibilita'."),
 (16,"chiaro",0,"[warm] Nella prossima lezione: le ferite chirurgiche. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"L'ulcera venosa",3:"L'ulcera arteriosa",4:"Il confronto",5:"L'indice caviglia-braccio",
 6:"La compressione",7:"Il bendaggio",8:"Le altre misure",9:"L'ulcera arteriosa: che cosa fare",10:"Il piede diabetico",
 11:"Classificazioni e monofilamento",12:"Lo scarico",13:"L'educazione",14:"Il caso",15:"In Veneto",16:"Chiusura"}

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
