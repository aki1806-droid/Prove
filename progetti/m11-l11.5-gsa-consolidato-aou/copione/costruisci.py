# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 11.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M11): GSA, consolidato e AOU. D.Lgs. 118/2011 art. 22 (gestione sanitaria accentrata: responsabile
# della GSA, responsabile della certificazione/terzo certificatore, contabilita' economico patrimoniale, libri);
# art. 32 (bilancio consolidato del SSR, preventivo e d'esercizio; termini: aziende e GSA 30/4, Giunta 31/5,
# consolidato 30/6, preventivo consolidato 31/12; pubblicazione entro 60 giorni). L.R. Veneto 19/2016 art. 2
# (Azienda Zero: funzioni e responsabilita' della GSA, flussi di cassa art. 20, scritture art. 22, bilancio GSA
# e consolidato con visto di congruita' dell'Area Sanita' e Sociale; approvazione della Giunta sentita la
# commissione consiliare; DG = responsabile GSA; collegio sindacale = terzo certificatore). D.Lgs. 517/1999
# (AOU: integrazione assistenza, didattica e ricerca; protocolli d'intesa; DG nominato d'intesa con il rettore;
# organo di indirizzo). Fonti: dispensa e L.R. 19/2016 su Drive; testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Nel Veneto ci sono nove aziende ULSS, due aziende ospedaliero universitarie, un istituto oncologico e Azienda Zero. Ognuna ha il suo bilancio. Ma quanto spende, in tutto, la sanita' veneta?"),
 (1,"chiaro",0,"Per saperlo non basta sommare i bilanci: bisogna aggiungere le spese che la regione gestisce direttamente, e togliere gli scambi tra un'azienda e l'altra. E' il lavoro del consolidato."),
 (1,"profondo",1.2,"Tanti bilanci, un solo conto della sanita' regionale."),

 (2,"chiaro",0.6,"Quattro passaggi. La gestione sanitaria accentrata. Il caso del Veneto, con Azienda Zero. Il bilancio consolidato e il ciclo di bilancio. E le aziende ospedaliero universitarie."),

 (3,"chiaro",0.5,"Non tutto il fondo sanitario va subito alle aziende. Una parte la regione la gestisce direttamente: fondi da ripartire, progetti regionali, rapporti con altre regioni per la mobilita' dei pazienti."),
 (3,"chiaro",0,"Per queste operazioni il decreto 118 chiede alla regione di individuare uno specifico centro di responsabilita': la gestione sanitaria accentrata, indicata con la sigla GSA."),
 (3,"chiaro",0,"La GSA tiene una contabilita' economico patrimoniale, come le aziende, per le operazioni sanitarie gestite dalla regione. Cosi' anche quelle risorse finiscono in un bilancio confrontabile."),
 (3,"chiaro",0,"Ha un responsabile della gestione sanitaria accentrata, che tiene le scritture e redige i bilanci, e un responsabile della certificazione, detto anche terzo certificatore, che le verifica."),
 (3,"chiaro",0,"Come ogni contabilita' in partita doppia, la GSA ha i suoi libri obbligatori: il libro giornale e il libro degli inventari. Redige un bilancio preventivo e un bilancio d'esercizio."),
 (3,"chiaro",0,"La GSA e' anche il punto in cui si raccolgono i conti dell'intero servizio sanitario regionale: e' il suo responsabile a predisporre il bilancio consolidato."),
 (3,"chiaro",0.6,"Un esempio: la regione trattiene una quota del fondo per un progetto di screening in tutte le aziende. La registra la GSA, e la trasferisce alle aziende man mano che il progetto avanza."),
 (3,"tenue",0.8,"Occhio a un distrattore: la gestione sanitaria accentrata non e' un'azienda sanitaria in piu'. E' un centro di responsabilita' per le operazioni che la regione gestisce direttamente."),
 (3,"profondo",1.2,"Cio' che la regione gestisce, la GSA lo registra."),

 (4,"chiaro",0.5,"Nel Veneto la legge regionale 19 del 2016 ha istituito Azienda Zero. Tra le sue funzioni ci sono le funzioni e le responsabilita' della gestione sanitaria accentrata previste dal decreto 118."),
 (4,"chiaro",0,"Azienda Zero gestisce i flussi di cassa del finanziamento sanitario regionale, sui conti di tesoreria intestati alla sanita', e tiene le scritture contabili della GSA."),
 (4,"chiaro",0,"Redige il bilancio preventivo e consuntivo della GSA e il bilancio consolidato, preventivo e consuntivo, del servizio sanitario regionale, con i relativi allegati."),
 (4,"chiaro",0,"Su questi bilanci l'Area Sanita' e Sociale della regione appone il visto di congruita'. Il bilancio della GSA e' poi approvato dalla Giunta regionale, sentita la commissione consiliare."),
 (4,"chiaro",0,"Il direttore generale di Azienda Zero svolge le funzioni di responsabile della GSA. Il collegio sindacale di Azienda Zero svolge l'attivita' di terzo certificatore."),
 (4,"chiaro",0,"Azienda Zero puo' anche affidare la certificazione contabile a una societa' di revisione iscritta nel registro dei revisori, come prevede il decreto ministeriale sulla certificabilita'."),
 (4,"chiaro",0.6,"Un esempio: a fine anno Azienda Zero raccoglie i bilanci delle aziende venete, li consolida con la GSA e trasmette il consolidato alla regione per il visto e per l'approvazione."),
 (4,"tenue",0.8,"Attenzione: nel Veneto il responsabile della GSA non e' il direttore di un'azienda ULSS. E' il direttore generale di Azienda Zero, secondo la legge regionale."),
 (4,"profondo",1.2,"Nel Veneto la GSA ha un indirizzo: Azienda Zero."),

 (5,"chiaro",0.5,"Il bilancio consolidato del servizio sanitario regionale mette insieme i bilanci della GSA e degli enti sanitari. E' redatto sia a preventivo sia a consuntivo, con gli stessi schemi."),
 (5,"chiaro",0,"Consolidare non vuol dire solo sommare: si eliminano i rapporti interni, come i servizi che un'azienda vende a un'altra, per non contare due volte la stessa spesa."),
 (5,"chiaro",0,"Il ciclo comincia prima dell'anno: il bilancio preventivo, delle aziende e consolidato, si approva entro il trentuno dicembre dell'anno precedente, in coerenza con la programmazione regionale."),
 (5,"chiaro",0,"Durante l'anno la regione monitora i conti delle aziende, con rilevazioni periodiche dei costi. Se l'equilibrio e' a rischio, chiede misure correttive prima della chiusura."),
 (5,"chiaro",0,"A consuntivo, aziende e GSA adottano il bilancio d'esercizio entro il trenta aprile. La Giunta approva i bilanci delle aziende entro il trentuno maggio, e il consolidato entro il trenta giugno."),
 (5,"chiaro",0,"I bilanci approvati si pubblicano entro sessanta giorni. Il consolidato serve anche alle verifiche nazionali sull'equilibrio del servizio sanitario di ogni regione."),
 (5,"chiaro",0.6,"Un esempio: un'azienda ULSS paga a un'azienda ospedaliera le prestazioni per i propri residenti. Nel consolidato quel costo e quel ricavo si elidono: per la regione e' la stessa spesa."),
 (5,"tenue",0.8,"Un distrattore frequente: il consolidato non si approva entro il trenta aprile. Entro il trenta aprile le aziende adottano i propri bilanci; il consolidato arriva entro il trenta giugno."),
 (5,"profondo",1.2,"Aprile le aziende, maggio la Giunta, giugno il consolidato."),

 (6,"chiaro",0.5,"Le aziende ospedaliero universitarie nascono dall'incontro tra servizio sanitario e universita'. La loro disciplina e' nel decreto legislativo 517 del 1999."),
 (6,"chiaro",0,"Integrano tre funzioni: assistenza, didattica e ricerca. Nello stesso ospedale lavorano personale del servizio sanitario e personale universitario, e si formano medici e professionisti."),
 (6,"chiaro",0,"I rapporti tra regione e universita' sono regolati da protocolli d'intesa, che definiscono l'apporto di ciascuna e le strutture necessarie alla didattica e alla ricerca."),
 (6,"chiaro",0,"Il direttore generale e' nominato dalla regione d'intesa con il rettore. Accanto a lui c'e' un organo di indirizzo, che assicura la coerenza tra programmazione sanitaria e attivita' universitarie."),
 (6,"chiaro",0,"Ci sono poi il collegio sindacale, con compiti di controllo contabile, e il collegio di direzione. Sul piano contabile l'azienda ospedaliero universitaria segue il Titolo secondo del decreto 118."),
 (6,"chiaro",0,"Il suo bilancio d'esercizio ha gli stessi schemi e gli stessi criteri di valutazione delle altre aziende, e rientra nel consolidato regionale."),
 (6,"chiaro",0.6,"Un esempio: nell'azienda di Padova un reparto e' diretto da un professore universitario. La sua attivita' assistenziale e i suoi costi entrano nel bilancio dell'azienda come quelli di ogni altro reparto."),
 (6,"tenue",0.8,"Attenzione: il direttore generale di un'azienda ospedaliero universitaria non e' nominato dal rettore. E' nominato dalla regione, d'intesa con il rettore."),
 (6,"profondo",1.2,"Curare, insegnare, ricercare, con un solo bilancio."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: la GSA e' il centro di responsabilita' regionale per le risorse sanitarie gestite direttamente, con contabilita' economico patrimoniale e un terzo certificatore."),
 (7,"chiaro",0.8,"La seconda: nel Veneto le funzioni della GSA sono di Azienda Zero, il cui direttore generale ne e' responsabile; il consolidato regionale si approva entro il trenta giugno."),
 (7,"chiaro",0.8,"La terza: le aziende ospedaliero universitarie integrano assistenza, didattica e ricerca; il direttore generale e' nominato dalla regione d'intesa con il rettore."),
 (7,"tenue",0.8,"L'ultimo distrattore: il consolidato non e' la semplice somma dei bilanci. Si eliminano gli scambi interni tra le aziende."),

 (8,"profondo",0,"[warm] In sintesi: dai conti delle aziende al conto della sanita' regionale. Si chiude il modulo sulla contabilita'. Nel prossimo: la prova, e le trappole ricorrenti dei quiz."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'La gestione sanitaria accentrata', 4: 'Nel Veneto: Azienda Zero', 5: 'Il consolidato e il ciclo di bilancio', 6: 'Le aziende ospedaliero universitarie', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
