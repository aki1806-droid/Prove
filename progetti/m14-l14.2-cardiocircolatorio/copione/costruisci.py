# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il cuore e' una pompa, i vasi sono tubi, il sangue e' il mezzo di trasporto. Detta cosi' sembra semplice. Ripercorriamo insieme l'apparato cardiocircolatorio."),
 (1,"chiaro",0,"Da questo sistema dipendono la pressione, la perfusione degli organi, la risposta allo shock e l'azione di molti farmaci. Lo rivediamo con un occhio ai collegamenti con i moduli otto e dieci."),

 (2,"chiaro",0,"Il cuore ha quattro cavita': atrio e ventricolo destro, atrio e ventricolo sinistro. Le valvole atrioventricolari separano atri e ventricoli: la tricuspide a destra, la mitrale, o bicuspide, a sinistra."),
 (2,"chiaro",0,"Le valvole semilunari, invece, separano i ventricoli dalle grandi arterie. Sono due: la valvola polmonare, all'uscita del ventricolo destro, e la valvola aortica, all'uscita del sinistro."),
 (2,"chiaro",0,"La parete del cuore e' fatta di endocardio, miocardio ed epicardio, ed e' avvolta dal pericardio. Il ventricolo sinistro ha la parete piu' spessa: pompa il sangue in tutto il corpo, contro una pressione piu' alta."),

 (3,"chiaro",0,"Il percorso del sangue. Il sangue povero di ossigeno arriva dalle vene cave all'atrio destro, passa la tricuspide ed entra nel ventricolo destro."),
 (3,"chiaro",0,"Il ventricolo destro lo spinge, attraverso la valvola polmonare, nell'arteria polmonare e da li' verso i polmoni. Dal cuore destro ai polmoni: e' il piccolo circolo."),
 (3,"chiaro",0,"Ossigenato, il sangue torna con le vene polmonari all'atrio sinistro, passa la mitrale ed entra nel ventricolo sinistro, che lo spinge attraverso la valvola aortica nell'aorta e in tutti gli organi: e' il grande circolo."),
 (3,"chiaro",0,"[curious] Una domanda trabocchetto frequente: l'arteria polmonare porta sangue povero di ossigeno, le vene polmonari sangue ricco. Le arterie si definiscono perche' escono dal cuore, non per il tipo di sangue."),

 (4,"chiaro",0,"Le coronarie sono le arterie che nutrono il cuore, e nascono dall'aorta subito sopra la valvola aortica. Sono due: la coronaria destra e la coronaria sinistra."),
 (4,"chiaro",0,"La coronaria sinistra si divide a sua volta in due rami: la discendente anteriore e la circonflessa. Tre nomi da ricordare, quindi: coronaria destra, discendente anteriore, circonflessa."),
 (4,"chiaro",0,"Il miocardio si perfonde soprattutto in diastole, quando il muscolo e' rilassato. Percio' una tachicardia, che accorcia la diastole, riduce la perfusione coronarica: con coronarie malate, puo' scatenare un'ischemia."),

 (5,"chiaro",0,"Il sistema di conduzione. L'impulso nasce nel nodo senoatriale, il pacemaker naturale del cuore, con una frequenza da sessanta a cento battiti al minuto, e da li' si diffonde negli atri."),
 (5,"chiaro",0,"Poi arriva al nodo atrioventricolare, che rallenta l'impulso. Questo rallentamento ha uno scopo preciso: permette ai ventricoli di riempirsi."),
 (5,"chiaro",0,"Dal nodo atrioventricolare l'impulso percorre il fascio di His, le branche destra e sinistra e le fibre di Purkinje, che attivano i ventricoli. I blocchi della lezione otto punto uno sono interruzioni di questa via."),
 (5,"chiaro",0,"All'ECG questa sequenza si legge cosi': l'onda P e' la depolarizzazione degli atri, il QRS la depolarizzazione dei ventricoli, l'onda T la ripolarizzazione dei ventricoli."),

 (6,"chiaro",0,"Il ciclo cardiaco alterna due fasi. La sistole, cioe' la contrazione e l'eiezione del sangue. E la diastole, cioe' il rilasciamento e il riempimento."),
 (6,"chiaro",0,"I toni cardiaci sono i rumori della chiusura delle valvole. Il primo tono corrisponde alla chiusura delle valvole atrioventricolari, all'inizio della sistole."),
 (6,"chiaro",0,"Il secondo tono corrisponde alla chiusura delle valvole semilunari, all'inizio della diastole. I soffi, invece, sono rumori di flusso turbolento, per esempio nelle malattie delle valvole."),

 (7,"chiaro",0,"La gittata cardiaca e' la quantita' di sangue pompata in un minuto. E' uguale alla gittata sistolica, cioe' il sangue espulso a ogni battito, moltiplicata per la frequenza cardiaca."),
 (7,"chiaro",0,"A riposo, la gittata cardiaca e' di circa cinque litri al minuto. La gittata sistolica dipende da tre fattori: il precarico, il postcarico e la contrattilita'."),
 (7,"chiaro",0,"Il precarico e' il riempimento del ventricolo. Secondo la legge di Frank-Starling, entro certi limiti, piu' il cuore si riempie, piu' forte si contrae."),
 (7,"chiaro",0,"Il postcarico e' la resistenza che il ventricolo deve vincere. La contrattilita' e' la forza intrinseca del muscolo cardiaco."),
 (7,"chiaro",0,"I farmaci della lezione cinque punto cinque agiscono proprio su questi tre fattori: i diuretici sul precarico, i vasodilatatori sul postcarico, gli inotropi sulla contrattilita'."),

 (8,"chiaro",0,"La pressione arteriosa dipende da due fattori: la gittata cardiaca e le resistenze periferiche. Le resistenze sono determinate soprattutto dalle arteriole, i vasi di resistenza."),
 (8,"chiaro",0,"Si misurano la sistolica e la diastolica, e se ne ricava la pressione arteriosa media: circa la diastolica, piu' un terzo della differenza fra sistolica e diastolica."),
 (8,"chiaro",0,"Un esempio: con centoventi su sessanta, la differenza e' sessanta, un terzo e' venti, e la media e' circa ottanta. E ricordi l'obiettivo nello shock e nella sepsi: una pressione media di almeno sessantacinque."),

 (9,"chiaro",0,"La regolazione della pressione. A breve termine agiscono i barocettori, nel seno carotideo e nell'arco aortico, che percepiscono i cambiamenti di pressione."),
 (9,"chiaro",0,"I barocettori attivano il sistema nervoso autonomo. Il simpatico aumenta la frequenza e la contrattilita' e restringe i vasi. Il parasimpatico rallenta il cuore."),
 (9,"chiaro",0,"E' cio' che succede quando ti alzi in piedi: senza questa risposta sveniresti. Lo ritroviamo fra poco nell'anziano, con l'ipotensione ortostatica."),
 (9,"chiaro",0,"A medio-lungo termine agisce il sistema renina-angiotensina-aldosterone, che restringe i vasi e fa trattenere sodio e acqua, insieme all'ADH e al rene. Gli ACE-inibitori e i sartani bloccano proprio questo sistema."),

 (10,"chiaro",0,"I vasi. Le arterie hanno una parete elastica e muscolare, e lavorano ad alta pressione. Le arteriole sono i vasi di resistenza. Nei capillari avvengono gli scambi."),
 (10,"chiaro",0,"Le vene lavorano a bassa pressione e contengono la maggior parte del sangue: per questo si chiamano vasi di capacitanza. E hanno valvole che impediscono il reflusso."),
 (10,"chiaro",0,"Il ritorno venoso dagli arti inferiori dipende dalla pompa muscolare del polpaccio, e anche dalla respirazione. Ecco perche' la mobilizzazione previene la trombosi."),
 (10,"chiaro",0,"Ed ecco perche', nell'insufficienza venosa della lezione sette punto tre, si cammina con la compressione. Fra le alterazioni dei vasi, ricorda anche l'aterosclerosi."),

 (11,"chiaro",0,"[thoughtful] La fisiopatologia essenziale. L'ischemia e' uno squilibrio fra domanda e offerta di ossigeno al miocardio. Nell'angina e' transitorio e reversibile, nell'infarto porta alla necrosi."),
 (11,"chiaro",0,"Nello scompenso la gittata non soddisfa i bisogni dell'organismo, che reagisce attivando il simpatico e il sistema renina-angiotensina. Sono compensi utili all'inizio."),
 (11,"chiaro",0,"Ma a lungo andare quei compensi sovraccaricano il cuore e peggiorano il quadro. E' per questo che i farmaci dello scompenso li bloccano."),
 (11,"chiaro",0,"Le aritmie sono disturbi della formazione o della conduzione dell'impulso. E lo shock e' una perfusione inadeguata dei tessuti, come hai visto nella lezione dieci punto sei."),

 (12,"chiaro",0,"Il caso d'esame. Un paziente in fibrillazione atriale rapida, con una frequenza cardiaca di centocinquanta, riferisce dolore toracico. Perche'?"),
 (12,"chiaro",0,"La tachicardia accorcia la diastole, cioe' il tempo in cui le coronarie perfondono il miocardio. E allo stesso tempo aumenta il consumo di ossigeno del cuore. Domanda alta, offerta bassa: ischemia."),
 (12,"chiaro",0,"In piu', una frequenza cosi' alta riduce il riempimento dei ventricoli, e quindi la gittata. Ecco perche' il controllo della frequenza e' una priorita', e il dolore toracico va segnalato subito."),

 (13,"chiaro",0,"Il collegamento con l'assistenza. La misurazione di pressione e frequenza, della lezione due punto tre. E l'ipotensione ortostatica nell'anziano, in cui il baroriflesso e' piu' lento: da qui l'alzata in due tempi."),
 (13,"chiaro",0,"E poi i polsi periferici e il riempimento capillare. L'azione dei farmaci cardiovascolari. E la prevenzione della trombosi venosa profonda."),

 (14,"chiaro",0,"La tabella. Tricuspide a destra, mitrale a sinistra. L'arteria polmonare porta sangue povero di ossigeno. Le coronarie, perfuse in diastole. La conduzione, dal nodo senoatriale alle fibre di Purkinje."),
 (14,"chiaro",0,"P, QRS, T. Primo e secondo tono. Gittata uguale gittata sistolica per frequenza. Precarico, postcarico, contrattilita'. Pressione uguale gittata per resistenze, e la media. Barocettori e renina-angiotensina."),

 (15,"profondo",1.2,"[serious] La frase della lezione: la pressione e' il risultato di una pompa e di un tubo. Quando cade, chiediti se ha ceduto la pompa, se manca il volume, o se il tubo si e' dilatato."),

 (16,"chiaro",0,"[warm] Nella prossima lezione: l'apparato respiratorio, gli scambi gassosi e la curva di dissociazione dell'emoglobina, che spiega molte cose sull'ossigenoterapia. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Il cuore: cavita' e valvole",3:"Il percorso del sangue",4:"Le coronarie",5:"Il sistema di conduzione",
 6:"Il ciclo cardiaco e i toni",7:"La gittata cardiaca",8:"La pressione arteriosa",9:"La regolazione della pressione",10:"I vasi",
 11:"La fisiopatologia essenziale",12:"Il caso d'esame",13:"Il collegamento con l'assistenza",14:"La tabella",15:"La frase della lezione",16:"Chiusura"}

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
