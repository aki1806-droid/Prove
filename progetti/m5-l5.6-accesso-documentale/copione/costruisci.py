# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 5.6 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M5): il diritto di accesso documentale. L. 241/1990 art. 22 (definizioni: accesso,
# interessati con interesse diretto, concreto e attuale, controinteressati, documento amministrativo;
# c. 3 tutti accessibili salvo art. 24; c. 4 informazioni senza forma di documento; c. 6 finche' la PA
# deve detenerli); art. 23 (soggetti tenuti); art. 24 (esclusioni c. 1, c. 3 no controllo generalizzato,
# c. 4 differimento, c. 6 lett. d riservatezza, c. 7 accesso difensivo, dati sanitari: art. 60 D.Lgs.
# 196/2003); art. 25 (esame gratuito, copia al costo, richiesta motivata, 30 giorni silenzio rigetto,
# difensore civico / Commissione per l'accesso 30 giorni, ricorso al TAR); D.P.R. 184/2006 artt. 2, 3,
# 5, 6, 7, 9; confronto con l'accesso civico (D.Lgs. 33/2013 art. 5).
# Fonti: L. 241/1990 (testo 2019); dispensa CISL FP. Da verificare: termine di 30 giorni per il ricorso
# al TAR (art. 116 c.p.a.).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Una graduatoria interna ti vede qualche posizione sotto un collega. Vuoi capire come sono stati attribuiti i punteggi. Puoi vedere le carte? La legge 241 dice di si', con regole precise."),
 (1,"chiaro",0,"E' il diritto di accesso ai documenti amministrativi. Serve a difendere i propri interessi, ma anche a rendere l'amministrazione piu' imparziale e trasparente."),
 (1,"profondo",1.2,"Le carte dell'amministrazione non sono segrete per chi ha un interesse."),

 (2,"chiaro",0.6,"Quattro passaggi. Chi puo' accedere, e a quali documenti. I limiti all'accesso. Come si presenta la richiesta. E che cosa fare se l'accesso viene negato."),

 (3,"chiaro",0.5,"L'articolo 22 definisce il diritto di accesso: il diritto degli interessati di prendere visione dei documenti amministrativi e di estrarne copia."),
 (3,"chiaro",0,"Chi sono gli interessati? Tutti i soggetti privati, compresi i portatori di interessi pubblici o diffusi, che hanno un interesse diretto, concreto e attuale, collegato al documento richiesto."),
 (3,"chiaro",0,"Diretto, cioe' personale. Concreto, cioe' legato a una situazione reale e non ipotetica. Attuale, cioe' presente al momento della richiesta. E deve corrispondere a una situazione giuridicamente tutelata."),
 (3,"chiaro",0,"Poi ci sono i controinteressati: le persone, individuate o facilmente individuabili, che dall'accesso vedrebbero compromessa la propria riservatezza. Per esempio, il collega di cui chiedi i titoli."),
 (3,"chiaro",0,"Il documento amministrativo e' ogni rappresentazione, grafica, elettronica o di altro tipo, del contenuto di atti detenuti da una pubblica amministrazione, anche interni o non legati a un procedimento."),
 (3,"chiaro",0,"Si accede ai documenti, non alle semplici informazioni. L'amministrazione non e' tenuta a elaborare dati per rispondere a una richiesta: si chiedono documenti che esistono gia'."),
 (3,"chiaro",0,"L'accesso si esercita verso le pubbliche amministrazioni, gli enti pubblici e i gestori di pubblici servizi. Quindi anche verso l'azienda sanitaria in cui lavori, finche' deve conservare quei documenti."),
 (3,"tenue",0.8,"Occhio a un distrattore: l'accesso documentale non spetta a chiunque. Serve un interesse diretto, concreto e attuale, collegato al documento."),
 (3,"profondo",1.2,"Un interesse vero, un documento che esiste."),

 (4,"chiaro",0.5,"La regola e' che tutti i documenti amministrativi sono accessibili. Le eccezioni sono quelle dell'articolo 24."),
 (4,"chiaro",0,"L'accesso e' escluso per il segreto di Stato e gli altri segreti previsti dalla legge, nei procedimenti tributari e per gli atti normativi, amministrativi generali, di pianificazione e di programmazione."),
 (4,"chiaro",0,"E nei procedimenti selettivi e' escluso per i documenti con informazioni di carattere psicoattitudinale relative a terzi. Un esempio vicino a noi: le valutazioni psicoattitudinali di altri candidati."),
 (4,"chiaro",0,"Ogni amministrazione individua le categorie di documenti sottratti all'accesso e, per ciascuna, anche il periodo di tempo per cui restano riservati. Sono segreti solo nei limiti di quella esigenza."),
 (4,"chiaro",0,"Un regolamento puo' sottrarre all'accesso anche documenti sulla vita privata e la riservatezza delle persone, compresi gli interessi sanitari, professionali ed economici."),
 (4,"chiaro",0,"Ma c'e' un contrappeso decisivo: va comunque garantito l'accesso ai documenti la cui conoscenza e' necessaria per curare o difendere i propri interessi giuridici. E' l'accesso difensivo."),
 (4,"chiaro",0,"Per i dati sulla salute il limite e' piu' stretto: l'accesso e' consentito solo se l'interesse del richiedente e' di rango almeno pari a quello della persona a cui i dati si riferiscono."),
 (4,"chiaro",0,"Non sono ammesse richieste finalizzate a un controllo generalizzato sull'operato dell'amministrazione. E l'accesso non si puo' negare quando basta differirlo, cioe' rinviarlo nel tempo."),
 (4,"tenue",0.8,"Attenzione: la presenza di controinteressati non blocca automaticamente l'accesso. L'amministrazione bilancia i diritti, e l'accesso difensivo ha un peso particolare."),
 (4,"profondo",1.2,"La regola e' l'accesso: le esclusioni sono eccezioni."),

 (5,"chiaro",0.5,"La richiesta va motivata e rivolta all'amministrazione che ha formato il documento o che lo detiene stabilmente. Il regolamento sull'accesso e' il decreto del Presidente della Repubblica 184 del 2006."),
 (5,"chiaro",0,"Se non ci sono controinteressati, l'accesso puo' essere informale: anche a voce, all'ufficio competente, indicando il documento e l'interesse. La richiesta si accoglie subito, senza formalita'."),
 (5,"chiaro",0.6,"Un esempio: chiedi di vedere i verbali e le schede di valutazione della tua selezione interna. Ci sono altri candidati coinvolti, e i loro titoli li riguardano: si segue la procedura formale."),
 (5,"chiaro",0,"Se invece ci sono controinteressati, o dubbi sull'interesse o sull'identita' del richiedente, si segue la procedura formale, con una richiesta scritta di cui l'ufficio rilascia ricevuta."),
 (5,"chiaro",0,"I controinteressati ricevono copia della richiesta e hanno dieci giorni per presentare una motivata opposizione. Poi l'amministrazione decide."),
 (5,"chiaro",0,"Il procedimento si conclude in trenta giorni. Se la richiesta e' irregolare o incompleta, l'amministrazione lo comunica entro dieci giorni, e il termine riparte dalla richiesta corretta."),
 (5,"chiaro",0,"Se l'accesso e' accolto, l'atto indica l'ufficio e un periodo di almeno quindici giorni per vedere i documenti. L'esame e' gratuito; la copia costa solo il rimborso della riproduzione, salvo il bollo."),
 (5,"chiaro",0,"Il rifiuto, la limitazione e il differimento devono essere motivati. Il differimento, in particolare, deve indicare quanto dura."),
 (5,"tenue",0.8,"Un distrattore frequente: la richiesta di accesso documentale non e' libera da motivazione. Va motivata, spiegando l'interesse collegato al documento."),
 (5,"profondo",1.2,"Chiedere per iscritto, spiegare il perche', conservare la ricevuta."),

 (6,"chiaro",0.5,"Se passano trenta giorni senza risposta, la richiesta si intende respinta. E' un caso in cui la legge da' al silenzio il valore di un rigetto."),
 (6,"chiaro",0,"Contro il diniego, espresso o tacito, o contro il differimento si puo' ricorrere al tribunale amministrativo regionale, secondo il codice del processo amministrativo."),
 (6,"chiaro",0,"In alternativa si puo' chiedere un riesame: al difensore civico per gli atti di comuni, province e regioni; alla Commissione per l'accesso per gli atti delle amministrazioni dello Stato."),
 (6,"chiaro",0,"Il difensore civico o la Commissione si pronunciano entro trenta giorni. Se ritengono illegittimo il diniego, lo comunicano all'amministrazione, che ha trenta giorni per confermarlo con motivazione."),
 (6,"chiaro",0,"Se l'amministrazione non conferma entro quel termine, l'accesso e' consentito. E il termine per ricorrere al giudice decorre dal momento in cui ricevi l'esito del riesame."),
 (6,"chiaro",0.6,"Un ultimo confronto. Accanto all'accesso documentale c'e' l'accesso civico, previsto dal decreto trasparenza, il 33 del 2013: lo puo' chiedere chiunque, senza motivare, ma incontra altri limiti."),
 (6,"tenue",0.8,"Attenzione a non confonderli: l'accesso documentale serve a tutelare un interesse personale e va motivato. L'accesso civico serve al controllo diffuso e non richiede motivazione."),
 (6,"profondo",1.2,"Il silenzio vale no, ma la porta resta aperta."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: l'accesso spetta agli interessati, con un interesse diretto, concreto e attuale; i controinteressati sono chi vedrebbe compromessa la propria riservatezza."),
 (7,"chiaro",0.8,"La seconda: esclusioni dell'articolo 24, niente controllo generalizzato, differimento invece del diniego quando basta; l'accesso difensivo va comunque garantito."),
 (7,"chiaro",0.8,"La terza: richiesta motivata, informale se non ci sono controinteressati; dieci giorni per l'opposizione, trenta per concludere, silenzio che vale rigetto; ricorso al giudice o riesame."),
 (7,"tenue",0.8,"L'ultimo distrattore: con l'accesso documentale l'amministrazione non deve creare documenti nuovi. Si accede a quelli che esistono e che deve ancora conservare."),

 (8,"profondo",0,"[warm] In sintesi: un interesse vero, un documento esistente, una richiesta motivata, rimedi rapidi. Nel prossimo modulo: la trasparenza nella pubblica amministrazione."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Chi puo' accedere, e a che cosa", 4: 'I limiti', 5: 'Come si chiede', 6: "Se l'accesso e' negato", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
