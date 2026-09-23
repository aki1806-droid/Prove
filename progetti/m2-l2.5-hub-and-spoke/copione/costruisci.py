# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 2.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M2): ospedali hub e spoke; logiche del modello; il problema
# della distanza e le risposte. Fonte: PSSR 2019-2023 (allegato L.R. 48/2018),
# cap. 3.1 «L'organizzazione del sistema socio sanitario»: diritto di scelta,
# luoghi di cura, sistema a rete, Hub and Spoke, reti cliniche (pp. 46-53 del
# Piano). Il modello nasce col PSSR 2012-2016 (L.R. 23/2012) ed e' confermato.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Un uomo ha un infarto in un paese di montagna. L'ospedale piu' vicino e' a pochi chilometri. Ma l'ambulanza lo porta a un ospedale piu' lontano, dove c'e' l'emodinamica aperta giorno e notte. Perche'?"),
 (1,"chiaro",0,"Perche' nel Veneto gli ospedali non sono tutti uguali, e non devono esserlo. Sono organizzati in una rete, con ruoli diversi. Il nome del modello e' hub and spoke."),
 (1,"profondo",1.2,"Hub vuol dire mozzo, spoke vuol dire raggio: come nella ruota di una bicicletta. Al centro pochi ospedali ad alta specializzazione, intorno molti ospedali di prossimita'."),

 (2,"chiaro",0,"Quattro passaggi. L'idea che regge il modello. Chi e' hub e chi e' spoke nel Veneto. Le reti cliniche costruite sopra la rete ospedaliera. E il problema della distanza, con le sue risposte."),

 (3,"chiaro",0,"Il modello non nasce con la legge 19. Nasce con il Piano socio-sanitario 2012-2016, la legge regionale 23 del 2012, ed e' confermato dal Piano 2019-2023 come struttura portante dell'assistenza ospedaliera."),
 (3,"chiaro",0,"Il principio sta in una frase del Piano. Le cure a media e bassa complessita' si garantiscono secondo il criterio di prossimita'. Quelle ad alta complessita' secondo il criterio di centralizzazione."),
 (3,"chiaro",0,"Prossimita' vuol dire vicino a casa: un'appendicite, una frattura semplice, un ricovero per polmonite. Non serve un centro di eccellenza, serve un buon ospedale raggiungibile."),
 (3,"chiaro",0,"Centralizzazione vuol dire concentrare i casi complessi in pochi centri: la cardiochirurgia, la neurochirurgia, i grandi traumi. Perche' la qualita' dipende dai volumi."),
 (3,"chiaro",0,"Un'equipe che fa centinaia di interventi l'anno ha in genere esiti migliori di una che ne fa poche decine. Lo misura il Programma Nazionale Esiti, e il Piano veneto lo usa per decidere dove concentrare le specialita'."),
 (3,"chiaro",0,"Il Veneto ci arriva da lontano. Il Piano ricorda che negli anni l'ospedale e' diventato il luogo della sola fase acuta, e che il tasso di ospedalizzazione veneto e' tra i piu' bassi d'Italia."),
 (3,"chiaro",0,"La cornice nazionale e' il decreto ministeriale 70 del 2015, che fissa gli standard dell'assistenza ospedaliera: le specialita' si assegnano in base ai bacini di popolazione serviti."),
 (3,"chiaro",0,"E c'e' un tetto ai posti letto: fino a tre virgola sette per mille abitanti in tutto, di cui zero virgola sette per la riabilitazione. Letti pochi, quindi usati bene."),
 (3,"profondo",1.2,"Vicino a casa per quello che e' semplice, nel centro giusto per quello che e' complesso: e' tutta qui la logica hub and spoke."),

 (4,"chiaro",0,"Chi e' hub nel Veneto? Il Piano prevede cinque ospedali hub, ciascuno con un bacino di circa un milione di abitanti."),
 (4,"chiaro",0,"Tra questi, due sono hub di eccellenza di rilievo regionale: l'Azienda Ospedale-Universita' di Padova e l'Azienda Ospedaliera Universitaria Integrata di Verona."),
 (4,"chiaro",0,"L'Istituto Oncologico Veneto e' l'hub di riferimento regionale per la patologia oncologica. E per le specialita' assegnate ci sono anche due ospedali di rilievo provinciale riconosciuti come hub: Rovigo e Belluno."),
 (4,"chiaro",0,"Gli hub hanno le alte specializzazioni e le tecnologie piu' innovative. Gestiscono i casi complessi, anche solo per la fase acuta, e poi rimandano il paziente all'ospedale vicino a casa."),
 (4,"chiaro",0,"E sostengono gli altri ospedali con la consulenza, anche a distanza, con strumenti informatici. Il Piano li descrive come il vertice della piramide organizzativa del loro territorio."),
 (4,"chiaro",0,"Poi ci sono gli spoke, gli ospedali presidi di rete, con un bacino di circa duecentomila abitanti. Sono gli ospedali di riferimento territoriale per la media e bassa complessita'."),
 (4,"chiaro",0,"E infine gli ospedali nodi di rete e le strutture integrative della rete, che completano l'offerta sul territorio."),
 (4,"tenue",0,"Attenzione a un equivoco: spoke non vuol dire ospedale di serie B da chiudere. Il Piano conferma la loro funzione di ospedali per acuti, e ne prevede il potenziamento e l'ammodernamento."),
 (4,"chiaro",0,"Chi decide il ruolo di ogni ospedale? La Giunta regionale, con le schede di dotazione ospedaliera, previo parere della commissione consiliare. Le schede fissano specialita' e posti letto di ogni struttura."),
 (4,"chiaro",0,"Dentro la stessa ULSS piu' ospedali possono lavorare come ospedali riuniti, con un dipartimento ad attivita' integrata: risorse e personale gestiti in modo unitario tra piu' sedi."),
 (4,"profondo",1.2,"Cinque hub da un milione di abitanti, spoke da duecentomila, e nodi di rete: tre livelli, ruoli decisi prima, non caso per caso."),

 (5,"chiaro",0,"Sopra la rete degli ospedali il Piano costruisce le reti cliniche: percorsi per singola patologia che collegano tutti i livelli, dall'ospedale di prossimita' all'hub."),
 (5,"chiaro",0,"Le piu' importanti sono le reti tempo-dipendenti, quelle in cui ogni minuto conta: la rete emergenza-urgenza, le emergenze cardiologiche, il trauma e l'ictus."),
 (5,"chiaro",0,"Ecco perche' il paziente di montagna salta l'ospedale piu' vicino. Nella rete dell'infarto conta arrivare in fretta al centro che puo' riaprire la coronaria, non all'ospedale piu' vicino."),
 (5,"chiaro",0,"Ci sono poi molte altre reti: trapianti, malattie rare, oncologia, breast unit, punti nascita, cure palliative, diabetologia, demenze. Il Piano ne elenca oltre venti."),
 (5,"chiaro",0,"A ogni rete corrispondono centri di riferimento, individuati anche sulla base dei risultati del Programma Nazionale Esiti. E l'elenco dei centri va rivisto ogni tre anni."),
 (5,"chiaro",0,"La rete dell'emergenza-urgenza fa anche da sensore dell'intero sistema: i suoi dati mostrano dove la rete regge e dove no, e servono a correggere la programmazione regionale e aziendale."),
 (5,"tenue",0,"Un distrattore da quiz: le reti cliniche non sono un'alternativa al modello hub and spoke. Sono organizzate al suo interno, e ne usano i ruoli."),

 (6,"chiaro",0,"Resta il problema che ogni cittadino sente per primo: la distanza. Se il centro giusto e' lontano, come si fa?"),
 (6,"chiaro",0,"La prima risposta e' il sistema dell'emergenza-urgenza. Il Suem 118 conosce ruoli e disponibilita' della rete, e porta il paziente direttamente nel luogo giusto."),
 (6,"chiaro",0,"La regola e' la golden hour, l'ora d'oro: nelle reti tempo-dipendenti l'intervento deve arrivare nel minor tempo possibile, perche' e' li' che si decide l'esito."),
 (6,"chiaro",0,"La seconda risposta e' la tutela dei territori difficili. Montagna, laguna, Polesine, aree a bassa densita' abitativa: il Piano ne salvaguarda la specificita' per garantire un accesso equo."),
 (6,"chiaro",0,"Per questo possono restare spoke anche ospedali con un bacino piccolo, quando raggiungere l'hub e' difficile. Il Piano cita Chioggia, indispensabile anche per i flussi turistici estivi."),
 (6,"chiaro",0,"La terza risposta e' la rete che si muove al posto del paziente: la consulenza a distanza, la telerefertazione, gli specialisti dell'hub che supportano gli spoke."),
 (6,"chiaro",0,"E il pronto soccorso non ha solo due uscite, il ricovero o la dimissione. Il Piano prevede che possa attivare direttamente la presa in carico in una struttura intermedia, quando la situazione clinica lo richiede."),
 (6,"chiaro",0,"E la quarta e' il ritorno a casa. Dopo la fase acuta nell'hub, il paziente torna nell'ospedale vicino o nel territorio, per la parte di cura che non richiede il centro di eccellenza."),
 (6,"profondo",1.2,"Il paziente viaggia solo quando serve, e solo per la fase che serve. Il resto lo fa la rete."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: prossimita' per la media e bassa complessita', centralizzazione per l'alta complessita'. E' il criterio del modello hub and spoke."),
 (7,"chiaro",0,"La seconda: cinque hub con un bacino di circa un milione di abitanti, tra cui Padova e Verona come hub di eccellenza, e lo IOV per l'oncologia. Spoke con bacino di circa duecentomila."),
 (7,"chiaro",0,"La terza: le reti tempo-dipendenti sono quattro. Emergenza-urgenza, emergenze cardiologiche, trauma, ictus."),
 (7,"tenue",0,"L'ultimo distrattore: il modello hub and spoke non nasce con il Piano 2019-2023. Nasce con quello 2012-2016, e il Piano successivo lo conferma."),

 (8,"profondo",0,"[warm] In sintesi: pochi centri per i casi difficili, molti ospedali vicini per il resto, e una rete che li tiene insieme. Nella prossima lezione usciamo dall'ospedale: il distretto."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "L'idea: prossimita' e centralizzazione", 4: "Chi e' hub e chi e' spoke", 5: 'Le reti cliniche', 6: 'Il problema della distanza', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
