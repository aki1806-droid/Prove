# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 2.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M2): frammentazione organizzativa; modello ospedale-centrico;
# integrazione socio-sanitaria incompiuta; sostenibilita' economica.
# Fonti: testo della L.R. Veneto 19/2016 (artt. 14, 15, 26), PSSR 2019-2023
# (L.R. 48/2018) pp. 15-17 e 46-50, dispensa CISL FP (Galiazzo). I «quattro nodi»
# sono la lettura del corso (STRUTTURA), non una formula della legge: il copione
# li aggancia ai criteri scritti negli articoli 14 e 15.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Fino al 31 dicembre 2016 il Veneto aveva ventuno aziende ULSS. Il giorno dopo ne aveva nove. Una sola legge regionale ha cancellato dodici aziende in una notte."),
 (1,"chiaro",0,"Quella legge e' la 19 del 2016. Istituisce Azienda Zero e ridisegna le ULSS. E nei concorsi del Veneto e' la domanda che torna piu' spesso."),
 (1,"profondo",1.2,"Ma una riforma cosi' non nasce dal nulla. Nasce da quattro problemi, che in questo corso chiameremo i quattro nodi. Se capisci i nodi, capisci ogni articolo della legge."),

 (2,"chiaro",0,"Il percorso. Prima una fotografia del Veneto prima del 2016. Poi i quattro nodi, uno alla volta: frammentazione, ospedale al centro, integrazione incompiuta, sostenibilita'. Infine la risposta della legge."),

 (3,"chiaro",0,"Il punto di partenza e' la legge regionale 56 del 1994. E' la legge con cui il Veneto recepisce il decreto 502: crea le aziende ULSS e le due aziende ospedaliere, Padova e Verona."),
 (3,"chiaro",0,"Accanto c'e' la sua gemella, la legge regionale 55 dello stesso anno, su programmazione, bilancio e contabilita' delle aziende. Le due leggi del 1994 sono ancora oggi la base del sistema veneto."),
 (3,"chiaro",0,"Nota la sigla. Nel Veneto non si dice ASL ma ULSS, unita' locale socio-sanitaria. La esse in piu' non e' un dettaglio: dice che l'azienda gestisce anche il sociale delegato dai Comuni."),
 (3,"chiaro",0,"Per oltre vent'anni la mappa resta quella: ventuno ULSS, spesso modellate sui confini di pochi Comuni. Accanto, le due aziende ospedaliere e l'Istituto Oncologico Veneto."),
 (3,"chiaro",0,"Il sistema funziona, e bene: il Piano socio-sanitario ricorda che il Veneto ha un tasso di ospedalizzazione tra i piu' bassi d'Italia. Ma dentro quella mappa si accumulano quattro problemi."),

 (4,"chiaro",0,"Primo nodo: la frammentazione. Ventuno aziende per circa cinque milioni di abitanti vuol dire, in media, meno di duecentocinquantamila persone per azienda."),
 (4,"chiaro",0,"Ogni azienda ha la sua direzione, i suoi uffici acquisti, il suo personale amministrativo, i suoi regolamenti. Ventuno volte la stessa struttura, ventuno modi diversi di fare la stessa cosa."),
 (4,"chiaro",0,"Un esempio concreto. Lo stesso farmaco, lo stesso guanto, la stessa siringa: ventuno gare d'appalto diverse, a prezzi diversi. E ventuno concorsi separati per assumere gli stessi infermieri."),
 (4,"chiaro",0,"Il risultato e' doppio. Costi amministrativi moltiplicati, e servizi diversi da una ULSS all'altra: stesso bisogno, risposte diverse a seconda di dove abiti."),
 (4,"chiaro",0,"La legge lo scrive tra i suoi criteri, all'articolo 14: individuare le dimensioni ottimali delle aziende, per migliorare qualita' ed efficienza, in un'ottica di razionalizzazione e riduzione dei costi."),
 (4,"profondo",1.2,"Il primo nodo, in una riga: troppe aziende piccole, che fanno ognuna da se' le stesse cose."),

 (5,"chiaro",0,"Secondo nodo: il modello ospedale-centrico. Per decenni l'ospedale e' stato il punto di riferimento per tutto, anche per bisogni che non richiedono un ricovero."),
 (5,"chiaro",0,"Pensa a un anziano con scompenso cardiaco. Se fuori dall'ospedale non c'e' nessuno che lo segue, torna in pronto soccorso a ogni peggioramento. Ogni volta un ricovero, ogni volta piu' fragile."),
 (5,"chiaro",0,"Il Veneto aveva gia' ridotto i posti letto: con la legge regionale 23 del 2012, tre e mezzo per mille abitanti, di cui tre per acuti e mezzo per la riabilitazione."),
 (5,"chiaro",0,"Ma meno letti in ospedale funzionano solo se cresce il territorio: medici di famiglia organizzati, cure a domicilio, strutture intermedie tra casa e ospedale."),
 (5,"tenue",0,"Attenzione a non leggerlo al contrario: superare il modello ospedale-centrico non vuol dire chiudere gli ospedali. Vuol dire usarli per la fase acuta, e curare il resto piu' vicino a casa."),
 (5,"profondo",1.2,"Il secondo nodo: l'ospedale fa da risposta a tutto, perche' fuori dall'ospedale la risposta non c'e'."),

 (6,"chiaro",0,"Terzo nodo: l'integrazione socio-sanitaria incompiuta. Il Veneto ne ha fatto un modello, con le ULSS che gestiscono anche i servizi sociali delegati dai Comuni."),
 (6,"chiaro",0,"Sulla carta e' integrazione. In pratica, sanitario e sociale restano spesso due mondi: bilanci separati, operatori diversi, percorsi che non si parlano."),
 (6,"chiaro",0,"E' proprio la persona fragile a pagare: l'anziano non autosufficiente, il disabile, il malato cronico. Hanno bisogno insieme dell'infermiere e dell'assistente sociale, non di due sportelli."),
 (6,"chiaro",0,"Gli strumenti c'erano: la Conferenza dei Sindaci e il Piano di Zona, che programma i servizi sociali a integrazione socio-sanitaria. Ma con ventuno aziende e confini diversi, la regia comune restava debole."),
 (6,"chiaro",0,"Anche i medici di famiglia lavorano spesso da soli, fuori da una rete. Il Piano socio-sanitario ricorda che la cronicita' pesa sempre di piu': secondo l'OMS, il settantacinque per cento della spesa sanitaria."),
 (6,"profondo",1.2,"Il terzo nodo: il modello integrato c'e', ma non arriva fino alla persona."),

 (7,"chiaro",0,"Quarto nodo: la sostenibilita' economica. La popolazione invecchia: nel Veneto chi ha piu' di sessantaquattro anni e' gia' il ventidue per cento dei residenti."),
 (7,"chiaro",0,"E il rapporto con i giovani si rovescia: per ogni ragazzo sotto i quindici anni ci sono uno virgola sei anziani. Meno persone in eta' da lavoro sostengono un bisogno di cura che aumenta."),
 (7,"chiaro",0,"Piu' anziani vuol dire piu' malattie croniche, piu' farmaci, piu' assistenza a lungo termine. La domanda cresce ogni anno."),
 (7,"chiaro",0,"Le risorse, invece, no. Il fondo sanitario si ripartisce con i costi standard della lezione uno punto sei, e chi spende oltre copre con risorse proprie."),
 (7,"chiaro",0,"La legge 19 lo mette tra i criteri dell'articolo 14: garantire la sostenibilita' economica del sistema sanitario regionale. E impone una verifica: quantificare i risparmi del primo anno."),
 (7,"profondo",1.2,"Il quarto nodo: una domanda che cresce, dentro risorse che non crescono."),

 (8,"chiaro",0,"Ecco i quattro nodi in fila. Frammentazione, ospedale al centro, integrazione incompiuta, sostenibilita'. E ogni nodo ha la sua risposta dentro la legge 19 del 2016."),
 (8,"chiaro",0,"Alla frammentazione risponde con due mosse: le ULSS da ventuno a nove, e un'azienda nuova, Azienda Zero, che fa una volta sola per tutti acquisti, concorsi, contabilita' accentrata."),
 (8,"chiaro",0,"All'ospedale al centro risponde con il territorio: piu' quindici per cento di posti letto negli ospedali di comunita', e i medici di famiglia nelle medicine di gruppo integrate."),
 (8,"chiaro",0,"Le soglie sono scritte nella legge: almeno il sessanta per cento dei medici di famiglia in medicina di gruppo integrata entro il 2017, almeno l'ottanta per cento entro il 2018."),
 (8,"chiaro",0,"All'integrazione incompiuta risponde con il distretto: le vecchie ULSS diventano distretti, ognuno con il suo Comitato dei Sindaci, che approva il Piano di Zona."),
 (8,"chiaro",0,"Alla sostenibilita' risponde con la regia unica e con i controlli: un Osservatorio regionale che monitora il nuovo assetto, e una prima verifica dopo tre anni."),
 (8,"chiaro",0,"E c'e' una risposta che il cittadino vede subito: un programma straordinario contro le liste d'attesa, all'articolo 28. CUP on line, promemoria via SMS, disdetta automatica, ticket pagato con lo smartphone."),
 (8,"tenue",0,"Un errore frequente: la legge 19 non crea le ULSS e non abolisce la legge 56 del 1994. La modifica in piu' punti, e le ULSS esistono dal 1994."),
 (8,"chiaro",1.2,"Quattro nodi, quattro risposte. Il resto del modulo le apre una per una."),

 (9,"chiaro",0,"Le tre cose che ti chiederanno. La prima: la legge regionale 19 del 25 ottobre 2016 istituisce Azienda Zero e ridefinisce gli ambiti delle ULSS, da ventuno a nove."),
 (9,"chiaro",0,"La seconda: il nuovo assetto delle ULSS decorre dal primo gennaio 2017."),
 (9,"chiaro",0,"La terza: i criteri della riorganizzazione stanno all'articolo 14. Equita' e universalita', dimensioni ottimali delle aziende, trasparenza e partecipazione, sostenibilita' economica."),
 (9,"tenue",0,"Il distrattore: la riforma non e' nata per tagliare i servizi. Tra i suoi obiettivi scritti c'e' garantire i LEA in modo uniforme, salvaguardando montagna, Polesine e laguna."),

 (10,"profondo",0,"[warm] In sintesi: troppe aziende, troppo ospedale, troppa distanza tra sanitario e sociale, troppo poche risorse. Nella prossima lezione, i sei principi con cui la riforma scioglie questi nodi."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il Veneto prima del 2016', 4: 'Primo nodo: la frammentazione', 5: "Secondo nodo: l'ospedale al centro", 6: "Terzo nodo: l'integrazione incompiuta", 7: "Quarto nodo: la sostenibilita'", 8: 'La risposta', 9: 'Le tre cose che ti chiederanno', 10: 'Chiusura'}
blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>MAX_SCENE: errori.append(f"scene {nscene} > {MAX_SCENE}")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>MAX_CAR_BLOCCO: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
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

# Lo stacco va su un cambio di capitolo. Non il primo DOPO la meta': quello
# vicino alla meta', da una parte o dall'altra. Nella 1.1 del corso PV il
# primo dopo la meta' lasciava la traccia A a 4968 caratteri, a un soffio dal
# tetto di 5000 del servizio di sintesi, e la B a 2809.
acc=0; stacco=None; a=0; migliore=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        if migliore is None or abs(acc-tot/2) < abs(migliore[1]-tot/2):
            migliore=(b["id"],acc)
stacco,a=migliore
if a>=5000 or tot-a>=5000: errori.append(f"stacco dopo {stacco}: una traccia supera i 5000 caratteri")
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
