# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6b.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6-bis, Anticorruzione): il piano triennale di prevenzione della corruzione e della
# trasparenza, oggi sezione del PIAO; le fasi della gestione del rischio; le aree a rischio generali
# e quelle della sanita'. Fonti: L. 190/2012 art. 1 cc. 5, 8, 8-bis, 9, 16; D.L. 80/2021 art. 6
# (PIAO, da verificare sul testo vigente); PNA 2013, aggiornamento 2015, PNA 2019 e 2022; dispense su Drive.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'azienda sanitaria ha un piano anticorruzione di centoventi pagine, copiato quasi tutto da quello di un'altra azienda. E' in regola?"),
 (1,"chiaro",0,"Sulla carta forse si'. Ma un piano che non parte dai processi dell'azienda non previene niente. La legge chiede un'analisi dei rischi propri, non un documento di forma."),
 (1,"profondo",1.2,"Un piano vale quanto l'analisi che c'e' dietro."),

 (2,"chiaro",0.6,"Quattro passaggi. Il piano: chi lo scrive e chi lo adotta. Il PIAO, dove oggi il piano confluisce. Le fasi della gestione del rischio. E le aree a rischio, in particolare in sanita'."),

 (3,"chiaro",0.5,"Ogni amministrazione adotta un piano triennale di prevenzione della corruzione e della trasparenza, il PTPCT. Individua le attivita' piu' esposte e le misure per ridurre il rischio."),
 (3,"chiaro",0,"Lo propone il responsabile della prevenzione della corruzione e della trasparenza. Lo adotta l'organo di indirizzo, entro il 31 gennaio di ogni anno. In azienda sanitaria, il direttore generale."),
 (3,"chiaro",0,"L'elaborazione del piano non puo' essere affidata a soggetti estranei all'amministrazione. Consulenti esterni possono aiutare, ma il piano deve nascere dentro l'ente."),
 (3,"chiaro",0,"L'organo di indirizzo fissa anche gli obiettivi strategici in materia di anticorruzione e trasparenza. Sono contenuto necessario della programmazione dell'ente e del piano stesso."),
 (3,"chiaro",0,"Il piano si aggiorna ogni anno, scorrendo sul triennio, e va pubblicato sul sito dell'amministrazione, nella sezione Amministrazione trasparente."),
 (3,"chiaro",0,"Il piano deve individuare le attivita' a rischio, prevedere meccanismi di controllo delle decisioni, obblighi di informazione verso il responsabile e il monitoraggio dei tempi dei procedimenti."),
 (3,"chiaro",0,"Deve anche monitorare i rapporti tra l'amministrazione e chi riceve contratti, autorizzazioni o vantaggi economici, verificando eventuali legami di parentela con dirigenti e dipendenti."),
 (3,"chiaro",0,"L'organismo indipendente di valutazione verifica che il piano sia coerente con gli obiettivi della programmazione, e che la valutazione della performance tenga conto dell'anticorruzione."),
 (3,"tenue",0.8,"Attenzione: il piano non lo adotta il responsabile anticorruzione. Lui lo propone; lo adotta l'organo di indirizzo, entro il 31 gennaio."),
 (3,"profondo",1.2,"Il responsabile propone, la direzione adotta, entro il 31 gennaio."),

 (4,"chiaro",0.5,"Con l'articolo 6 del decreto legge 80 del 2021, le amministrazioni con piu' di cinquanta dipendenti adottano il PIAO, il piano integrato di attivita' e organizzazione."),
 (4,"chiaro",0,"Il PIAO riunisce in un solo documento piani che prima erano separati: performance, fabbisogni di personale, lavoro agile, formazione e, appunto, anticorruzione e trasparenza."),
 (4,"chiaro",0,"Il piano anticorruzione diventa la sottosezione rischi corruttivi e trasparenza del PIAO. Il contenuto resta quello della legge 190: cambia il contenitore, non le regole."),
 (4,"chiaro",0,"Anche il PIAO ha durata triennale, si aggiorna ogni anno e va adottato entro il 31 gennaio. Le aziende sanitarie, che superano di molto i cinquanta dipendenti, lo adottano per intero."),
 (4,"chiaro",0,"Le amministrazioni con non piu' di cinquanta dipendenti adottano invece un PIAO semplificato, con contenuti ridotti anche nella parte sui rischi corruttivi."),
 (4,"chiaro",0.6,"Un esempio: cercando il piano anticorruzione di un'azienda ospedaliera, oggi lo trovi di solito dentro il PIAO, nella sezione rischi corruttivi e trasparenza, pubblicato in Amministrazione trasparente."),
 (4,"tenue",0.8,"Occhio al distrattore: il PIAO non ha abolito la prevenzione della corruzione. L'ha assorbita, e la sezione anticorruzione resta obbligatoria."),
 (4,"profondo",1.2,"Cambia il contenitore, restano le regole."),

 (5,"chiaro",0.5,"Il cuore del piano e' la gestione del rischio. Il metodo, indicato dal Piano nazionale del 2019, procede per fasi, come un ciclo che si ripete ogni anno."),
 (5,"chiaro",0,"Prima fase: l'analisi del contesto. Quello esterno, cioe' il territorio, i fornitori, gli interessi in gioco. E quello interno, cioe' l'organizzazione e soprattutto la mappatura dei processi."),
 (5,"chiaro",0,"Mappare i processi vuol dire descrivere come si svolge davvero un'attivita': chi fa che cosa, in quali passaggi, con quali margini di scelta. E' la base di tutto il resto."),
 (5,"chiaro",0,"Seconda fase: la valutazione del rischio. Si identificano gli eventi rischiosi, si analizzano i fattori che li favoriscono, come la discrezionalita' o la mancanza di controlli, e si stima il livello di esposizione."),
 (5,"chiaro",0,"Il livello di rischio non si misura solo con i numeri. Il Piano nazionale del 2019 chiede un giudizio motivato, basato su indicatori come l'interesse economico in gioco e gli eventi passati."),
 (5,"chiaro",0,"Terza fase: il trattamento del rischio. Si scelgono le misure. Quelle generali valgono per tutta l'amministrazione; quelle specifiche rispondono a un rischio preciso di un processo."),
 (5,"chiaro",0,"Ultima fase: monitoraggio e riesame. Si verifica se le misure sono state attuate e se funzionano, e il piano dell'anno dopo riparte da questi risultati."),
 (5,"chiaro",0.6,"Un esempio: nella gestione delle sale operatorie emerge il rischio di favorire alcuni pazienti. Una misura specifica e' la registrazione tracciata dei criteri con cui si programma ogni intervento."),
 (5,"tenue",0.8,"Attenzione: misure generali e specifiche non sono alternative. Le generali, come trasparenza, formazione e codice, valgono ovunque; le specifiche si aggiungono dove serve."),
 (5,"profondo",1.2,"Contesto, valutazione, trattamento, monitoraggio."),

 (6,"chiaro",0.5,"La legge 190 indica quattro aree a rischio per tutte le amministrazioni: autorizzazioni e concessioni, scelta del contraente negli appalti, sovvenzioni e vantaggi economici, concorsi e progressioni di carriera."),
 (6,"chiaro",0,"Il Piano nazionale le ha poi ampliate: gestione delle entrate e delle spese, controlli e ispezioni, incarichi e nomine, affari legali e contenzioso."),
 (6,"chiaro",0,"Il Piano nazionale 2022 dedica ampio spazio ai contratti pubblici, anche per l'uso dei fondi del PNRR: resta l'area in cui il rischio e' piu' alto."),
 (6,"chiaro",0,"Per la sanita', l'aggiornamento del 2015 individua aree specifiche. Tra le principali: i contratti pubblici, anche per farmaci e dispositivi medici, e le nomine, compresi i direttori di struttura complessa."),
 (6,"chiaro",0,"E ancora: l'attivita' libero professionale intramuraria e le liste d'attesa, i rapporti contrattuali con i privati accreditati, la farmaceutica e le sperimentazioni cliniche."),
 (6,"chiaro",0,"Tra le aree sanitarie c'e' anche una voce che sorprende molti candidati: le attivita' conseguenti al decesso in ospedale, come i rapporti con le imprese di onoranze funebri."),
 (6,"chiaro",0.6,"Un esempio: lo stesso medico gestisce l'agenda pubblica e quella in libera professione. Il rischio e' dirottare i pazienti verso le visite a pagamento, allungando la lista d'attesa pubblica."),
 (6,"tenue",0.8,"Occhio: anche le progressioni di carriera sono un'area a rischio indicata dalla legge. La procedura che state preparando rientra tra i processi da mappare e presidiare."),
 (6,"profondo",1.2,"Appalti, nomine, liste d'attesa: dove si decide, li' c'e' rischio."),

 (7,"chiaro",0.8,"Le tre cose da portare alla prova. La prima: il piano triennale lo propone il responsabile anticorruzione e lo adotta l'organo di indirizzo, entro il 31 gennaio; non si affida all'esterno."),
 (7,"chiaro",0.8,"La seconda: con il decreto 80 del 2021 il piano confluisce nel PIAO, come sezione rischi corruttivi e trasparenza, per le amministrazioni con piu' di cinquanta dipendenti."),
 (7,"chiaro",0.8,"La terza: la gestione del rischio passa per contesto e mappatura dei processi, valutazione, trattamento con misure generali e specifiche, e monitoraggio."),
 (7,"tenue",0.8,"L'ultimo distrattore: un piano copiato da un'altra azienda non e' un piano. La mappatura deve essere quella dei propri processi."),

 (8,"profondo",0,"[warm] In sintesi: un piano scritto dentro l'ente, sui propri processi. Nella prossima lezione: chi lo scrive e ne risponde, il responsabile della prevenzione."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il piano: chi lo scrive, chi lo adotta', 4: 'Il PIAO', 5: 'La gestione del rischio', 6: "Le aree a rischio in sanita'", 7: 'Le tre cose da portare alla prova', 8: 'Chiusura'}
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
