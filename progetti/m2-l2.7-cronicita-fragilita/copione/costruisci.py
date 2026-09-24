# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 2.7 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M2): il ponte ospedale-territorio; presa in carico proattiva;
# le sfide aperte. Fonti: PSSR 2019-2023 cap. 6 (cronicita' e multimorbidita' per
# intensita' di cura, pp. 91-99: stratificazione, cronicita' semplice e complessa,
# strutture intermedie, piano integrato di cura, COT, farmacie), cap. 5 (percorso
# in ospedale, p. 88); L.R. 19/2016 art. 14 c.5 (+15% ospedali di comunita').
BLOCCHI = [
 (1,"chiaro",0,"[serious] Una signora di ottantacinque anni esce dall'ospedale dopo una polmonite. Non ha piu' bisogno dell'ospedale. Ma a casa, sola, non ce la fa ancora. Dove va?"),
 (1,"chiaro",0,"Fino a qualche anno fa la risposta era spesso: resta in ospedale, occupando un letto per acuti. Oppure: torna a casa, e dopo una settimana e' di nuovo in pronto soccorso."),
 (1,"profondo",1.2,"La risposta del Veneto sta nel mezzo, letteralmente: le strutture intermedie. E dentro un modello che prende in carico la cronicita' prima che diventi urgenza."),

 (2,"chiaro",0,"Quattro passaggi. Le strutture intermedie, con l'ospedale di comunita'. La presa in carico della cronicita' per intensita' di cura. Il piano integrato di cura e la gestione delle transizioni. E le sfide ancora aperte."),

 (3,"chiaro",0,"Il Piano socio-sanitario 2019-2023 organizza l'offerta per intensita' di cura. In mezzo tra l'ospedale e la casa ci sono le strutture sanitarie di cure intermedie."),
 (3,"chiaro",0,"Sono tre: l'ospedale di comunita', l'unita' riabilitativa territoriale e l'hospice. A queste si aggiungono altre strutture temporanee, come le strutture riabilitative extraospedaliere."),
 (3,"chiaro",0,"A chi servono? A pazienti stabilizzati dal punto di vista medico, che non hanno piu' bisogno dell'ospedale, ma sono ancora troppo instabili per tornare a casa o in una residenza."),
 (3,"chiaro",0,"Sono soprattutto adulti e anziani con piu' malattie insieme, a rischio di un ricovero troppo lungo, di un ricovero inappropriato o di un ingresso in struttura che si poteva evitare."),
 (3,"chiaro",0,"La degenza e' breve: di norma non oltre le quattro, sei settimane. L'obiettivo non e' la diagnosi ma il recupero: la funzione, l'autonomia, la qualita' della vita."),
 (3,"chiaro",0,"Per questo il Piano dice che qui conta la dimensione prognostica, non quella diagnostica e terapeutica tipica dell'ospedale. Si cura la persona che torna a casa, non solo la malattia."),
 (3,"chiaro",0,"Quanti posti letto? Il Piano fissa un minimo: zero virgola sei posti ogni mille abitanti sopra i quarantacinque anni. Bellunese, Polesine, montagna e laguna possono averne zero virgola due in piu'."),
 (3,"chiaro",0,"E ricordi l'obiettivo della legge 19? Piu' quindici per cento di posti letto negli ospedali di comunita' entro il 2017. Le strutture intermedie sono il cuore del potenziamento del territorio."),
 (3,"chiaro",0,"Il Piano prevede anche letti di ospedale di comunita' dentro gli ospedali, per i cronici con piu' malattie: con protocolli precisi, perche' l'ospedale resti il luogo della fase acuta."),
 (3,"tenue",0,"Attenzione: l'ospedale di comunita' non e' un reparto per lungodegenti e non e' una casa di riposo. E' un ricovero breve, sanitario, con un obiettivo di recupero e di ritorno a casa."),

 (4,"chiaro",0,"Il secondo passaggio e' il modello di presa in carico. Il Piano lo chiama presa in carico della cronicita' e della multimorbidita' per intensita' di cura e di assistenza."),
 (4,"chiaro",0,"Si parte dalla stratificazione della popolazione. Con strumenti di classificazione del case mix, come gli ACG, si divide la popolazione per malattie e rischio. Il medico di famiglia conferma il profilo."),
 (4,"chiaro",0,"Poi si distinguono due livelli. La cronicita' semplice e la cronicita' complessa e avanzata. A ogni livello corrisponde un modello diverso di presa in carico."),
 (4,"chiaro",0,"La cronicita' semplice la prende in carico l'assistenza primaria: medicine di gruppo e team multiprofessionali, che riconoscono i malati cronici e li inseriscono nei percorsi, i PDTA."),
 (4,"chiaro",0,"I team di assistenza primaria possono essere di tre tipi: medici convenzionati aggregati, medici dipendenti del servizio sanitario, o un soggetto privato accreditato. Il cittadino sceglie a quale rivolgersi."),
 (4,"chiaro",0,"La cronicita' complessa e avanzata richiede team dedicati del distretto: specialisti di area geriatrica, internistica e di cure palliative, infermieri e assistenti sociali, collegati con l'ospedale."),
 (4,"chiaro",0,"E all'apice della piramide c'e' la cronicita' avanzata, circa l'uno per cento della popolazione. La gestisce preferibilmente l'unita' di cure palliative, privilegiando le cure a domicilio."),
 (4,"chiaro",0,"La parola chiave e' presa in carico proattiva, o medicina di iniziativa. Non si aspetta che il paziente arrivi in pronto soccorso: lo si segue prima che la malattia si riacutizzi."),
 (4,"chiaro",0,"Ogni team deve garantire anche l'assistenza a domicilio, programmata e non, coprendo sette giorni su sette. E va rafforzata la rete delle cure palliative, a casa e in hospice."),
 (4,"profondo",1.2,"Intensita' di cura vuol dire risposta proporzionata al bisogno: poco a chi serve poco, molto a chi serve molto, e sempre prima che arrivi l'urgenza."),

 (5,"chiaro",0,"Il terzo passaggio: il piano integrato di cura. E' il progetto sulla persona, condiviso dal team e dal paziente o dalla sua famiglia."),
 (5,"chiaro",0,"Deve contenere le preferenze del paziente e le sue direttive anticipate, perche' il paziente e' attore del suo percorso. E fa parte del fascicolo sanitario elettronico, consultabile da tutta la filiera."),
 (5,"chiaro",0,"Il medico di famiglia non esce dal percorso: viene informato attraverso il fascicolo elettronico, e puo' far parte del team che scrive e realizza il piano di assistenza."),
 (5,"chiaro",0,"Per questi pazienti e le loro famiglie il Piano prevede anche un numero unico, attivo ventiquattro ore su ventiquattro."),
 (5,"chiaro",0,"Poi ci sono le transizioni: dall'ospedale alla struttura intermedia, dalla struttura a casa. Sono i momenti in cui un paziente fragile rischia di piu'."),
 (5,"chiaro",0,"Chi le governa? La centrale operativa territoriale, la COT. Il Piano la chiama la centrale della continuita': coordina il percorso, e ogni passaggio avviene in modo protetto."),
 (5,"chiaro",0,"La COT mappa le risorse della rete, coordina le dimissioni e le ammissioni protette, raccoglie i bisogni sanitari e sociali e rende tracciabile ogni percorso."),
 (5,"chiaro",0,"Il percorso si decide con la valutazione multidimensionale, fatta dall'unita' valutativa multidimensionale, l'UVMD: lo strumento per pianificare l'assistenza dei malati piu' complessi."),
 (5,"tenue",0,"Un distrattore frequente: la COT non e' la centrale del 118. Il 118 gestisce l'emergenza. La COT gestisce la continuita' delle cure tra i luoghi di assistenza."),
 (5,"profondo",1.2,"Un solo progetto sulla persona, e una centrale che non la perde di vista quando passa da un luogo all'altro."),

 (6,"chiaro",0,"Restano le sfide aperte, e il Piano non le nasconde. La prima e' la popolazione che invecchia: piu' anziani, piu' persone sole, piu' malattie croniche insieme."),
 (6,"chiaro",0,"La seconda e' il personale: il modello regge solo con medici di famiglia organizzati, infermieri in crescita nel territorio e team davvero multiprofessionali."),
 (6,"chiaro",0,"La terza e' l'integrazione dei dati: il piano di cura nel fascicolo elettronico, le informazioni che viaggiano con il paziente tra ospedale, distretto e casa."),
 (6,"chiaro",0,"La quarta e' l'uniformita': le transizioni vanno gestite in modo omogeneo su tutto il territorio regionale, con procedure formalizzate uguali per tutti."),
 (6,"chiaro",0,"La quinta sono le dimissioni difficili: pazienti pronti a uscire ma bloccati da problemi familiari o sociali. Il Piano prevede posti letto tecnici, per non piu' di ventiquattro ore, per non occupare letti per acuti."),
 (6,"chiaro",0,"E c'e' un alleato da non dimenticare: la farmacia. Per il Piano e' il punto di accesso piu' agevole e frequente per il cronico: aderenza alle terapie, screening, prenotazioni."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: le strutture di cure intermedie sono ospedale di comunita', unita' riabilitativa territoriale e hospice. Degenza di norma entro quattro, sei settimane."),
 (7,"chiaro",0,"La seconda: la cronicita' si prende in carico per intensita' di cura. Semplice all'assistenza primaria, complessa e avanzata ai team del distretto, avanzata alle cure palliative."),
 (7,"chiaro",0,"La terza: la centrale operativa territoriale, la COT, e' la centrale della continuita' e governa le transizioni protette."),
 (7,"tenue",0,"L'ultimo distrattore: l'indice minimo dei posti letto intermedi non si calcola su tutta la popolazione. Si calcola sugli abitanti sopra i quarantacinque anni: zero virgola sei per mille."),

 (8,"profondo",0,"[warm] Si chiude cosi' il modulo due. Dai quattro nodi alla presa in carico: un sistema che prova a curare prima, vicino, e insieme. Nel modulo tre, la legislazione socio-sanitaria del Veneto."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Le strutture intermedie', 4: "La presa in carico per intensita' di cura", 5: 'Il piano integrato di cura e le transizioni', 6: 'Le sfide aperte', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
