# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 8.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M8): dalla specialita' alla privatizzazione. Prima: rapporto di diritto pubblico, nomina con atto
# unilaterale, T.U. impiegati civili dello Stato (D.P.R. 3/1957), legge quadro 93/1983, giudice amministrativo.
# Prima privatizzazione: L. 421/1992, D.Lgs. 29/1993 (codice civile, contratti collettivi, ARAN). Seconda:
# L. 59/1997, D.Lgs. 80/1998 (dirigenza, giudice ordinario dal 1/7/1998). D.Lgs. 165/2001 (riordino).
# D.Lgs. 165 artt. 1 (c. 2: aziende ed enti del SSN), 2 (c. 1 atti organizzativi; c. 2-3 codice civile e
# contratti), 3 (personale in regime di diritto pubblico), 5 (c. 2 poteri del privato datore), 63 (giudice).
# Art. 97 Cost. (concorso). Fonti: testo del D.Lgs. 165 aggiornato al 24/1/2020; dispensa su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Due infermiere, stesso turno di notte. Una lavora in un ospedale pubblico, l'altra in una clinica privata. Il loro rapporto di lavoro, oggi, poggia sullo stesso codice civile."),
 (1,"chiaro",0,"Trent'anni fa non era cosi'. Il dipendente pubblico aveva uno statuto a parte, fatto di leggi e di atti dell'amministrazione. Poi e' arrivata la privatizzazione."),
 (1,"profondo",1.2,"Stesso lavoro, regole sempre piu' vicine a quelle di tutti."),

 (2,"chiaro",0.6,"Quattro passaggi. Com'era il pubblico impiego prima degli anni Novanta. Le tappe della riforma. Che cosa vuol dire privatizzazione. E che cosa, ancora oggi, resta pubblico."),

 (3,"chiaro",0.5,"Fino agli anni Novanta il rapporto di pubblico impiego era un rapporto di diritto pubblico. Non nasceva da un contratto, ma da un atto di nomina dell'amministrazione."),
 (3,"chiaro",0,"Per gli impiegati dello Stato valeva un testo unico del 1957. Diritti, doveri, carriera e stipendio erano fissati dalla legge e dai regolamenti, non da un accordo tra le parti."),
 (3,"chiaro",0,"La legge quadro del 1983 aveva aperto una strada: accordi sindacali per comparto. Ma quegli accordi valevano solo dopo essere stati recepiti in un decreto del Presidente della Repubblica."),
 (3,"chiaro",0,"E le liti? Per il dipendente pubblico il giudice era quello amministrativo, cioe' il TAR, come per qualunque atto della pubblica amministrazione."),
 (3,"chiaro",0.6,"Il risultato era un sistema rigido: regole diverse per ogni categoria, leggi che aggiungevano indennita' a singoli gruppi, costi difficili da controllare, poca attenzione ai risultati."),
 (3,"chiaro",0,"All'inizio degli anni Novanta, con la crisi dei conti pubblici, questa rigidita' non era piu' sostenibile. Serviva un lavoro pubblico piu' efficiente, con costi sotto controllo."),
 (3,"tenue",0.8,"Occhio a un distrattore: prima della riforma il dipendente pubblico non era senza tutele. Aveva uno statuto proprio, di diritto pubblico, diverso da quello del lavoratore privato."),
 (3,"profondo",1.2,"Un rapporto di diritto pubblico, nato da un atto di nomina."),

 (4,"chiaro",0.5,"La svolta arriva con la legge delega 421 del 1992 e il decreto legislativo 29 del 1993. E' la prima privatizzazione."),
 (4,"chiaro",0,"Il rapporto di lavoro passa sotto il codice civile e i contratti collettivi. Nasce l'ARAN, l'agenzia che rappresenta le amministrazioni al tavolo della contrattazione nazionale."),
 (4,"chiaro",0,"Da allora stipendi e gran parte delle regole del rapporto si decidono al tavolo tra ARAN e sindacati, nei contratti collettivi nazionali di comparto, come quello della sanita'."),
 (4,"chiaro",0,"La seconda privatizzazione arriva con le leggi Bassanini: la legge 59 del 1997 e il decreto legislativo 80 del 1998. La contrattualizzazione si estende anche alla dirigenza."),
 (4,"chiaro",0,"E dal primo luglio 1998 le controversie di lavoro dei dipendenti pubblici passano al giudice ordinario, il giudice del lavoro, come per i dipendenti privati."),
 (4,"chiaro",0,"Nel 2001 tutte queste norme vengono riordinate in un solo testo: il decreto legislativo 165 del 30 marzo 2001, le norme generali sul lavoro alle dipendenze delle amministrazioni pubbliche."),
 (4,"chiaro",0,"Poi le riforme successive. Nel 2009 la riforma Brunetta, con il decreto legislativo 150: performance, merito, disciplina. Nel 2015 e 2017 la riforma Madia, che riscrive parti del 165."),
 (4,"chiaro",0,"Infine, dal 2021, le misure per il reclutamento e il piano integrato di attivita' e organizzazione, il PIAO. Le vedremo nelle prossime lezioni."),
 (4,"tenue",0.8,"Attenzione: il 165 del 2001 non ha inventato la privatizzazione. L'ha raccolta e riordinata. La svolta vera e' del 1993."),
 (4,"profondo",0.8,"Dal 1993 al 2001: dalla legge al contratto."),

 (5,"chiaro",0.5,"Che cosa vuol dire, allora, privatizzazione? L'articolo 2 del 165 lo dice chiaramente: i rapporti di lavoro dei dipendenti pubblici sono regolati dal codice civile e dalle leggi sul lavoro nell'impresa."),
 (5,"chiaro",0,"Salvo le regole diverse del decreto stesso, che sono inderogabili. E i rapporti individuali sono regolati da contratti: il trattamento economico si stabilisce solo con i contratti collettivi."),
 (5,"chiaro",0,"L'articolo 1 elenca le amministrazioni a cui si applica: Stato, regioni, enti locali, scuole, universita', e anche le aziende e gli enti del Servizio sanitario nazionale."),
 (5,"chiaro",0,"Gli scopi sono scritti nello stesso articolo: accrescere l'efficienza delle amministrazioni, razionalizzare il costo del lavoro pubblico, valorizzare le persone con condizioni uniformi a quelle del lavoro privato."),
 (5,"chiaro",0,"L'articolo 5 aggiunge un punto decisivo: le misure di gestione del personale e l'organizzazione del lavoro negli uffici si adottano con la capacita' e i poteri del privato datore di lavoro."),
 (5,"chiaro",0.6,"Un esempio: il turno, le ferie, l'assegnazione a un reparto. Sono atti di gestione del rapporto di lavoro, adottati dal dirigente come farebbe un datore di lavoro privato."),
 (5,"chiaro",0,"E se nasce una lite, per esempio su un trasferimento o su una sanzione, si va davanti al giudice del lavoro. Lo stabilisce l'articolo 63."),
 (5,"chiaro",0,"Quel giudice puo' anche disapplicare un atto amministrativo illegittimo che sta a monte del rapporto. E se il licenziamento e' illegittimo, puo' ordinare di reintegrare il lavoratore."),
 (5,"chiaro",0,"Per questo molti preferiscono dire contrattualizzazione: l'ente resta pubblico, il datore di lavoro resta pubblico, ma il rapporto si regola con il contratto."),
 (5,"tenue",0.8,"Un distrattore frequente: privatizzare il pubblico impiego non significa trasformare l'ospedale in un'azienda privata, ne' vendere il servizio. Cambia la regola del rapporto, non la natura dell'ente."),
 (5,"profondo",1.2,"L'ente resta pubblico, il rapporto diventa contrattuale."),

 (6,"chiaro",0.5,"Ma non tutto e' diventato privato. L'articolo 3 elenca il personale che resta in regime di diritto pubblico."),
 (6,"chiaro",0,"Sono i magistrati, gli avvocati dello Stato, i militari e le forze di polizia, la carriera diplomatica e prefettizia, i vigili del fuoco, i professori e ricercatori universitari."),
 (6,"chiaro",0,"Resta pubblica anche la grande organizzazione. Le linee fondamentali degli uffici, gli uffici piu' importanti, le dotazioni si decidono con atti organizzativi, secondo l'articolo 2."),
 (6,"chiaro",0,"Resta pubblico l'accesso: l'articolo 97 della Costituzione vuole che agli impieghi pubblici si acceda per concorso, salvo i casi stabiliti dalla legge."),
 (6,"chiaro",0,"Per questo le liti sulle procedure di concorso per l'assunzione restano al giudice amministrativo. Una volta assunti, invece, il giudice e' quello del lavoro."),
 (6,"chiaro",0,"E restano regole di legge speciali per i dipendenti pubblici: le incompatibilita', il codice di comportamento, il procedimento disciplinare, le responsabilita'."),
 (6,"chiaro",0,"E restano i vincoli di spesa: quante persone assumere e quanto costa il personale dipende da limiti fissati dalla legge e dai bilanci pubblici, non solo dal contratto."),
 (6,"chiaro",0.6,"Pensiamo all'infermiera dell'inizio. Il turno lo decide il coordinatore con i poteri del datore di lavoro. Ma per entrare ha vinto un concorso, e non puo' fare un secondo lavoro senza autorizzazione."),
 (6,"tenue",0.8,"Attenzione: non tutti i dipendenti pubblici sono contrattualizzati. Magistrati, militari, forze di polizia e professori universitari hanno ancora un ordinamento di diritto pubblico."),
 (6,"profondo",1.2,"Contratto per il rapporto, legge per l'accesso e le garanzie."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: prima degli anni Novanta il rapporto era di diritto pubblico, nasceva da un atto di nomina e le liti andavano al giudice amministrativo."),
 (7,"chiaro",0.8,"La seconda: la privatizzazione parte con il decreto legislativo 29 del 1993, prosegue con le leggi Bassanini e il decreto 80 del 1998, e viene riordinata nel decreto legislativo 165 del 2001."),
 (7,"chiaro",0.8,"La terza: oggi il rapporto e' regolato dal codice civile e dai contratti; restano pubblici l'accesso per concorso, la macro organizzazione e il personale dell'articolo 3."),
 (7,"tenue",0.8,"L'ultimo distrattore: le liti sul rapporto di lavoro vanno al giudice ordinario, non al TAR. Al giudice amministrativo restano i concorsi per l'assunzione."),

 (8,"profondo",0,"[warm] In sintesi: dalla nomina al contratto, dal TAR al giudice del lavoro, con alcune garanzie che restano pubbliche. Nella prossima lezione: i cinque principi della riforma."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Prima degli anni Novanta', 4: 'Le tappe della riforma', 5: 'Che cosa vuol dire privatizzazione', 6: 'Che cosa resta pubblico', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
