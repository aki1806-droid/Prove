# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6b.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6-bis, Anticorruzione): perche' la L. 190/2012, che cosa intende per corruzione, chi
# sono gli attori nazionali (ANAC, Dipartimento della funzione pubblica, PNA) e quali decreti
# completano il sistema. Fonti: L. 190/2012 art. 1 cc. 1-4, 2-bis, 7-8, 35, 49-50 (testo su Drive,
# versione 2016); dispense su Drive sull'anticorruzione in sanita' (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Una gara per le protesi viene scritta su misura per un solo fornitore. Nessuno ha ancora preso soldi, nessun reato e' stato scoperto. Eppure qualcosa si e' gia' rotto."),
 (1,"chiaro",0,"Per decenni la corruzione si e' combattuta solo dopo, con il processo penale. La legge 190 del 2012 cambia prospettiva: la corruzione si previene, prima che diventi reato, dentro l'organizzazione."),
 (1,"profondo",1.2,"La corruzione non si punisce soltanto: si previene."),

 (2,"chiaro",0.6,"Quattro passaggi. Perche' serviva una legge sulla prevenzione. Che cosa intende per corruzione. Chi sono gli attori nazionali. E quali decreti completano il sistema."),

 (3,"chiaro",0.5,"La legge 6 novembre 2012, numero 190, porta il titolo: disposizioni per la prevenzione e la repressione della corruzione e dell'illegalita' nella pubblica amministrazione."),
 (3,"chiaro",0,"Nasce anche da obblighi internazionali. Il primo comma richiama la Convenzione delle Nazioni Unite contro la corruzione del 2003 e la Convenzione penale del Consiglio d'Europa, firmata a Strasburgo nel 1999."),
 (3,"chiaro",0,"La novita' e' il doppio binario. Accanto alla repressione penale, che interviene dopo il fatto, la legge costruisce un sistema amministrativo di prevenzione, che lavora prima."),
 (3,"chiaro",0,"La prevenzione ha quattro strumenti principali: un piano nazionale, un piano in ogni amministrazione, un responsabile interno e la trasparenza. Li vedremo uno per lezione."),
 (3,"chiaro",0,"Il modello e' decentrato. Regole e indirizzi sono nazionali, ma ogni amministrazione analizza i propri rischi e sceglie le proprie misure: non esiste un piano valido per tutti."),
 (3,"chiaro",0,"La legge riguarda tutte le pubbliche amministrazioni dell'articolo 1, comma 2, del decreto 165. Ci sono quindi dentro le aziende sanitarie, le aziende ospedaliere e le aziende ospedaliero universitarie."),
 (3,"chiaro",0.6,"Un esempio: il capitolato scritto su misura non e' ancora corruzione in senso penale. Ma e' proprio il tipo di rischio che il piano dell'azienda deve individuare e prevenire."),
 (3,"tenue",0.8,"Attenzione: la legge 190 non e' solo una legge penale. La sua parte piu' ampia riguarda l'organizzazione delle amministrazioni, cioe' la prevenzione."),
 (3,"profondo",1.2,"Due binari: reprimere dopo, prevenire prima."),

 (4,"chiaro",0.5,"Che cosa intende la prevenzione per corruzione? Non solo i reati del codice penale, come la corruzione per un atto contrario ai doveri d'ufficio o la concussione."),
 (4,"chiaro",0,"Il Piano nazionale adotta una nozione piu' ampia: ogni situazione in cui un potere pubblico viene usato per un interesse privato. La chiama anche cattiva amministrazione."),
 (4,"chiaro",0,"Rientrano quindi anche comportamenti che non sono reato: una pratica che si ferma senza motivo, un'assunzione pilotata, un conflitto di interessi taciuto, un favore fatto a un conoscente."),
 (4,"chiaro",0,"E' il motivo per cui la prevenzione guarda ai processi, non alle persone. Si chiede dove un potere discrezionale potrebbe essere piegato, e con quali controlli lo si impedisce."),
 (4,"chiaro",0,"Pensa agli appalti: un requisito tecnico troppo stretto, una proroga ripetuta senza gara, un collaudo firmato senza verifiche. Sono eventi rischiosi anche prima di qualsiasi tangente."),
 (4,"chiaro",0.6,"Un esempio in ospedale: un paziente viene spostato avanti nella lista d'attesa per amicizia, senza denaro. Non c'e' reato di corruzione, ma c'e' uso privato di un potere pubblico."),
 (4,"tenue",0.8,"Occhio al distrattore: la prevenzione non riguarda solo i reati accertati da un giudice. Riguarda anche la cattiva amministrazione, che nel codice penale non c'e'."),
 (4,"profondo",1.2,"Corruzione, per la prevenzione: un potere pubblico piegato a un interesse privato."),

 (5,"chiaro",0.5,"Il primo attore e' l'Autorita' nazionale anticorruzione, l'ANAC. La legge 190 affida inizialmente questo ruolo alla CIVIT, la commissione per la valutazione e la trasparenza."),
 (5,"chiaro",0,"Nel 2013 la commissione prende il nome di ANAC. Nel 2014 riceve anche le funzioni dell'Autorita' per la vigilanza sui contratti pubblici, che viene soppressa. Da allora vigila anche sugli appalti."),
 (5,"chiaro",0,"L'ANAC adotta il Piano nazionale anticorruzione, vigila sull'applicazione delle misure e sulla trasparenza, ha poteri ispettivi e puo' ordinare di adottare atti o di rimuovere comportamenti contrari ai piani."),
 (5,"chiaro",0,"Ogni anno, entro il 31 dicembre, riferisce al Parlamento sull'attivita' di contrasto della corruzione e sull'efficacia delle norme."),
 (5,"chiaro",0,"Il Piano nazionale anticorruzione, il PNA, ha durata triennale ed e' aggiornato. E' un atto di indirizzo: ogni amministrazione lo usa per costruire il proprio piano, adattandolo alla propria realta'."),
 (5,"chiaro",0,"Il PNA e' adottato sentiti il Comitato interministeriale e la Conferenza unificata. Individua i principali rischi e i relativi rimedi, con obiettivi e tempi per le misure."),
 (5,"chiaro",0,"Per la sanita' il PNA ha avuto un approfondimento specifico nell'aggiornamento del 2015. Il PNA 2022, approvato dall'ANAC all'inizio del 2023, rafforza il legame tra anticorruzione e programmazione."),
 (5,"chiaro",0,"Il secondo attore nazionale e' il Dipartimento della funzione pubblica. Coordina le strategie di prevenzione, definisce metodologie comuni e criteri per la rotazione dei dirigenti."),
 (5,"chiaro",0,"Accanto a loro restano gli altri presidi: la magistratura per i reati, la Corte dei conti per il danno erariale e, dentro ogni ente, l'organismo indipendente di valutazione."),
 (5,"tenue",0.8,"Attenzione: l'ANAC non nasce nel 2014. La legge 190 del 2012 la prevede gia', affidandone il ruolo alla CIVIT; nel 2014 le vengono aggiunte le funzioni sugli appalti."),
 (5,"profondo",1.2,"L'ANAC indirizza e vigila, ogni amministrazione si organizza."),

 (6,"chiaro",0.5,"La legge 190 contiene anche le deleghe per altri provvedimenti. Da li' nascono, nel 2013, tre testi che ogni candidato deve conoscere."),
 (6,"chiaro",0,"Il primo e' il decreto legislativo 33 del 2013 sulla trasparenza, che hai studiato nel modulo precedente. La trasparenza e' considerata essa stessa una misura di prevenzione della corruzione."),
 (6,"chiaro",0,"Il secondo e' il decreto legislativo 39 del 2013, su inconferibilita' e incompatibilita' degli incarichi. Stabilisce chi non puo' ricevere, o mantenere, un incarico dirigenziale."),
 (6,"chiaro",0,"Il terzo e' il codice di comportamento dei dipendenti pubblici, approvato con il decreto del Presidente della Repubblica 62 del 2013 e aggiornato nel 2023."),
 (6,"chiaro",0,"La legge modifica anche il decreto 165: introduce il divieto di far parte di commissioni per chi e' condannato per reati contro la pubblica amministrazione, e la tutela di chi segnala illeciti."),
 (6,"chiaro",0,"Sul versante penale, invece, la legge 3 del 2019, detta spazzacorrotti, inasprisce le pene per i reati contro la pubblica amministrazione. E' repressione, non prevenzione."),
 (6,"chiaro",0.6,"Un esempio: un'azienda sanitaria vuole nominare direttore amministrativo una persona condannata in primo grado per peculato. Quale decreto lo vieta? Il 39 del 2013, sugli incarichi."),
 (6,"tenue",0.8,"Occhio: il decreto 39 non parla di trasparenza e il decreto 33 non parla di incarichi. Scambiare i due numeri e' uno degli errori piu' frequenti nei quiz."),
 (6,"profondo",1.2,"Trentatre' trasparenza, trentanove incarichi, sessantadue comportamento."),

 (7,"chiaro",0.8,"Le tre cose da portare alla prova. La prima: la legge 190 del 2012 affianca alla repressione penale un sistema di prevenzione, per tutte le amministrazioni, aziende sanitarie comprese."),
 (7,"chiaro",0.8,"La seconda: per la prevenzione la corruzione e' ogni uso di un potere pubblico per un interesse privato, anche quando non e' reato."),
 (7,"chiaro",0.8,"La terza: l'ANAC adotta il Piano nazionale e vigila; i decreti del 2013 sono il 33 sulla trasparenza, il 39 sugli incarichi e il DPR 62 sul codice di comportamento."),
 (7,"tenue",0.8,"L'ultimo distrattore: il Piano nazionale non sostituisce i piani delle amministrazioni. Li orienta, e ognuna deve scrivere il proprio."),

 (8,"profondo",0,"[warm] In sintesi: prevenire prima, con un'autorita' nazionale e regole comuni. Nella prossima lezione: il piano di ogni amministrazione e la gestione del rischio."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Perche' una legge sulla prevenzione", 4: 'Che cosa si intende per corruzione', 5: 'Gli attori nazionali', 6: 'I decreti che completano il sistema', 7: 'Le tre cose da portare alla prova', 8: 'Chiusura'}
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
