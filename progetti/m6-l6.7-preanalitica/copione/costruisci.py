# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Un dato che sorprende molti: la maggior parte degli errori di laboratorio non nasce in laboratorio, ma prima, nella fase preanalitica."),
 (1,"chiaro",0,"Identificazione, prelievo, provette, conservazione, trasporto: e' la fase gestita dall'infermiere, e per questo e' la fase in cui l'infermiere puo' fare la differenza."),
 (1,"chiaro",0,"Un esame sbagliato non e' innocuo: porta a diagnosi sbagliate, terapie inutili o mancate, prelievi ripetuti."),

 (2,"chiaro",0,"Il primo passo e' sempre lo stesso: identificazione attiva. Poi l'etichettatura, che si fa al letto, davanti al paziente, subito dopo il prelievo."),
 (2,"chiaro",0,"Non si pre-etichettano provette per piu' pazienti da portare in giro sul carrello: e' la ricetta perfetta per uno scambio."),
 (2,"chiaro",0,"E la richiesta deve essere completa, con l'esame, la data, l'ora del prelievo e l'operatore: l'ora conta, perche' alcuni valori cambiano nella giornata."),

 (3,"chiaro",0,"Le condizioni del prelievo. Il laccio si tiene per meno di un minuto: oltre, si concentrano i componenti del sangue e i valori cambiano."),
 (3,"chiaro",0,"Niente pugno aperto e chiuso ripetutamente, che altera il potassio: ricordi la pseudo-iperkaliemia della lezione tre punto cinque."),
 (3,"chiaro",0,"Paziente a riposo, a digiuno quando l'esame lo richiede: la glicemia a digiuno della lezione cinque punto cinque, i trigliceridi."),
 (3,"chiaro",0,"E non si preleva dall'arto in cui scorre un'infusione, che diluisce o contamina il campione: se e' proprio inevitabile, si preleva a valle, a infusione sospesa, secondo procedura."),

 (4,"chiaro",0,"L'ordine di prelievo delle provette, che i quiz chiedono spesso. Uno: emocolture, per prime, per non contaminarle con gli additivi delle altre. Due: citrato, tappo azzurro, per la coagulazione."),
 (4,"chiaro",0,"Tre: siero, tappo rosso o giallo, con o senza gel. Quattro: eparina, tappo verde. Cinque: EDTA, tappo viola, per l'emocromo. Sei: fluoruro, tappo grigio, per la glicemia."),
 (4,"chiaro",0,"Il motivo dell'ordine e' evitare che l'additivo di una provetta contamini la successiva: per esempio l'EDTA, se passa nella provetta del siero, abbassa il calcio e alza il potassio."),
 (4,"chiaro",0,"E i colori possono variare fra produttori: conta l'additivo scritto in etichetta, non il tappo."),

 (5,"chiaro",0,"Due dettagli. La provetta del citrato va riempita esattamente fino alla tacca: il test della coagulazione richiede un rapporto preciso fra sangue e anticoagulante, nove a uno. Poco piena, da' risultati falsamente alterati."),
 (5,"chiaro",0,"E con il butterfly, se la prima provetta e' il citrato, si usa prima una provetta di scarto, per riempire d'aria il tubicino ed evitare che la provetta del citrato resti incompleta."),
 (5,"chiaro",0,"Tutte le provette con additivo si capovolgono delicatamente il numero di volte indicato: mai agitarle, perche' si provoca emolisi."),

 (6,"chiaro",0,"L'emolisi, la rottura dei globuli rossi nel campione. Le cause sono quasi tutte nostre: ago troppo sottile, aspirazione vigorosa con la siringa, laccio prolungato."),
 (6,"chiaro",0,"Provette agitate, sangue spinto con forza dalla siringa nella provetta, prelievo da una cannula appena posizionata: in tutti i casi i globuli rossi si rompono e versano il loro potassio nel siero."),
 (6,"chiaro",0,"L'effetto piu' importante: il potassio falsamente alto, insieme ad altri valori come LDH e transaminasi. Un campione emolizzato si ripete: non si interpreta."),

 (7,"chiaro",0,"Le emocolture, che riprendiamo dalle lezioni quattro punto sei e sei punto due. Si prelevano al rialzo febbrile o, meglio ancora, all'insorgenza del brivido, e prima dell'antibiotico, che altrimenti sterilizza il campione."),
 (7,"chiaro",0,"Almeno due set, ciascuno con un flacone aerobio e uno anaerobio, da due punzioni diverse. Volume: otto-dieci millilitri per flacone nell'adulto: il volume e' il principale determinante della sensibilita'."),
 (7,"chiaro",0,"Nel sospetto di infezione da catetere, set appaiati dal catetere e da vena periferica, nello stesso momento."),

 (8,"chiaro",0,"La tecnica, perche' un'emocoltura contaminata dalla flora cutanea porta a terapie inutili. Antisepsi della cute con clorexidina alcolica, lasciata asciugare; disinfezione dei tappi; non ripalpare dopo l'antisepsi."),
 (8,"chiaro",0,"L'ordine dei flaconi: con il butterfly si riempie prima l'aerobio, perche' la piccola quantita' d'aria del tubicino finisce li' e non nell'anaerobio; con la siringa si inocula prima l'anaerobio."),
 (8,"chiaro",0,"Poi si etichetta e si invia subito, o si conserva secondo procedura, non in frigorifero: i flaconi sono terreni di coltura, e il freddo ferma la crescita che invece si vuole vedere."),

 (9,"chiaro",0,"L'urinocoltura. Dopo l'igiene dei genitali, si raccoglie il mitto intermedio, scartando il primo getto, in un contenitore sterile. Nel cateterizzato, dal punto di prelievo dedicato, mai dalla sacca: lezione tre punto sei."),
 (9,"chiaro",0,"Il campione si invia entro due ore, o si refrigera secondo procedura, perche' a temperatura ambiente i batteri si moltiplicano e falsano la carica."),

 (10,"chiaro",0,"Gli altri campioni. Il tampone richiede la sede giusta, la tecnica giusta e il terreno di trasporto adeguato: un tampone secco e' un tampone morto."),
 (10,"chiaro",0,"Sulle lesioni si deterge prima e si campiona il tessuto vitale, non il pus superficiale o la necrosi: lo vedremo nel modulo sette."),
 (10,"chiaro",0,"Le feci per il Clostridium difficile solo se non formate. L'espettorato al mattino, dopo aver sciacquato la bocca con acqua, da una tosse profonda: la saliva non serve."),

 (11,"chiaro",0,"Alcuni valori di riferimento da conoscere, con un'avvertenza: i valori esatti dipendono dal laboratorio, e nella pratica si usano quelli scritti sul referto."),
 (11,"chiaro",0,"Emoglobina: nell'uomo circa tredici-diciassette, nella donna circa dodici-quindici grammi per decilitro. Globuli bianchi: circa quattromila-diecimila per millimetro cubo. Piastrine: circa centocinquantamila-quattrocentomila."),

 (12,"chiaro",0,"La chimica. Glicemia a digiuno: normale fra settanta e novantanove; fra cento e centoventicinque alterata; da centoventisei, se confermata, compatibile con il diabete."),
 (12,"chiaro",0,"Emoglobina glicata: da sei virgola cinque per cento compatibile con diabete. Creatinina: circa zero virgola sei-uno virgola due milligrammi per decilitro."),
 (12,"chiaro",0,"Sodio e potassio li conosci dalla lezione tre punto cinque. INR circa uno in chi non assume anticoagulanti. La PCR, indice di infiammazione, secondo il laboratorio."),

 (13,"chiaro",0,"Un concetto di sicurezza: il valore critico, un risultato che indica un pericolo immediato per il paziente: un potassio molto alto, una glicemia molto bassa, un'emoglobina crollata."),
 (13,"chiaro",0,"Il laboratorio lo comunica direttamente al reparto. Chi lo riceve applica il read-back della lezione due punto sette, avvisa subito il medico e documenta l'orario della comunicazione."),

 (14,"chiaro",0,"Il trasporto. Ogni esame ha tempi e temperature previsti: alcuni campioni vanno in ghiaccio, altri a temperatura ambiente, le emocolture mai in frigorifero."),
 (14,"chiaro",0,"I campioni viaggiano in contenitori chiusi, a prova di perdita, con il simbolo del rischio biologico, e le richieste vanno separate dai campioni."),

 (15,"chiaro",0,"Il caso. Il laboratorio comunica un potassio di sei virgola otto in un paziente asintomatico, con ECG in ordine. Il prelievo era stato difficoltoso, con ago sottile e laccio prolungato. Che cosa pensi?"),
 (15,"chiaro",0,"Possibile pseudo-iperkaliemia da emolisi. Che cosa fai? Read-back, avvisi comunque il medico, un potassio cosi' alto non si ignora, verifichi se il laboratorio segnala emolisi, e su indicazione ripeti il prelievo con tecnica corretta."),
 (15,"profondo",1.2,"[serious] Nel frattempo sorvegli il paziente, perche' potrebbe anche essere un'iperkaliemia vera."),

 (16,"chiaro",0,"In Veneto molte aziende usano sistemi informatici di richiesta con etichette stampate al letto a partire dal braccialetto del paziente, che riducono gli errori di identificazione."),
 (16,"chiaro",0,"Esistono procedure aziendali sulla fase preanalitica e sulla comunicazione dei valori critici. All'orale, collega sempre la preanalitica alla sicurezza del paziente."),

 (17,"chiaro",0,"Ricapitoliamo. Etichettare al letto. Laccio meno di un minuto. Mai dal braccio con infusione. Ordine: emocolture, citrato, siero, eparina, EDTA, fluoruro."),
 (17,"chiaro",0,"Citrato fino alla tacca, provette mai agitate. Emocolture: due set, otto-dieci millilitri, prima dell'antibiotico. Urinocoltura: mitto intermedio, mai dalla sacca."),
 (17,"chiaro",0,"[warm] Nella prossima lezione ricomponiamo il modulo sei, con l'autovalutazione: dalla cannula alla provetta, tutto cio' che passa per una vena. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Identificazione ed etichettatura",3:"Il laccio e il paziente",4:"L'ordine delle provette",5:"Due dettagli sulle provette",
 6:"L'emolisi",7:"Le emocolture: quando e quante",8:"Le emocolture: la tecnica",9:"L'urinocoltura",10:"Gli altri campioni",
 11:"L'emocromo",12:"La chimica",13:"Il valore critico",14:"Il trasporto",15:"Il caso",16:"In Veneto",17:"Chiusura"}

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
