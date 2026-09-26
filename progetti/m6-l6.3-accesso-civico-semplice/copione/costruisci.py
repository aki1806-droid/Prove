# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6): l'accesso civico semplice. D.Lgs. 33/2013 art. 5 c. 1 (diritto di chiunque di richiedere cio'
# che doveva essere pubblicato), c. 3 (nessun limite di legittimazione, niente motivazione, via telematica; a chi:
# ufficio che detiene, URP, altro ufficio indicato, RPCT per i dati a pubblicazione obbligatoria), c. 4 (gratuito,
# salvo rimborso del costo di riproduzione), c. 6 (30 giorni, provvedimento espresso e motivato; pubblicazione e
# collegamento), c. 7 (riesame del RPCT, 20 giorni), c. 10 (segnalazione art. 43 c. 5), c. 11; art. 43 c. 4;
# art. 116 c.p.a. (ricorso). Confronto con L. 241/1990 artt. 22, 25. Fonti: D.Lgs. 33/2013 agg. 13/3/2017.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Cerchi in Amministrazione trasparente i tassi di assenza del personale della tua azienda. La pagina e' vuota, oppure ferma a due anni fa. Eppure quel dato andava pubblicato. Che cosa puoi fare?"),
 (1,"chiaro",0,"Puoi chiederlo. Non devi spiegare perche', non devi pagare e non devi dimostrare di essere coinvolto. E' l'accesso civico semplice."),
 (1,"chiaro",0,"E l'amministrazione non potra' limitarsi a rispondere a te: dovra' mettere il dato sul sito, a disposizione di tutti. Vediamo come funziona, passo per passo."),
 (1,"profondo",1.2,"Se doveva essere pubblicato, chiunque puo' pretenderlo."),

 (2,"chiaro",0.6,"Quattro passaggi. Che cosa si puo' chiedere. Chi puo' chiedere, come e a quale ufficio. I tempi e la risposta, con i rimedi. E il confronto con l'accesso documentale della legge 241."),

 (3,"chiaro",0.5,"L'articolo 5, comma 1, del decreto 33: l'obbligo di pubblicare dati, documenti e informazioni comporta il diritto di chiunque di richiederli, se la pubblicazione e' stata omessa."),
 (3,"chiaro",0,"L'oggetto e' quindi preciso: solo cio' che la legge obbliga a pubblicare. L'accesso civico semplice e' la risposta a un inadempimento dell'amministrazione."),
 (3,"chiaro",0,"Il principio e' semplice: se la legge dice che un dato deve stare sul sito e li' non c'e', il cittadino non deve aspettare che l'amministrazione se ne accorga. Puo' chiederlo subito."),
 (3,"chiaro",0,"Vale anche quando la pubblicazione e' incompleta, o non aggiornata. Se l'obbligo c'e' e il dato manca, anche solo in parte, si puo' chiedere."),
 (3,"chiaro",0.6,"Qualche esempio in sanita': i tempi medi di attesa per una prestazione, l'elenco delle strutture accreditate, i compensi di un consulente, i criteri di valutazione di un concorso, i premi distribuiti al personale."),
 (3,"chiaro",0,"Per ottenere dati che non rientrano negli obblighi di pubblicazione serve invece un altro strumento, l'accesso civico generalizzato. Lo vedremo nella prossima lezione."),
 (3,"tenue",0.8,"Occhio a un distrattore: l'accesso civico semplice non riguarda qualsiasi documento. Riguarda solo dati e documenti a pubblicazione obbligatoria non pubblicati."),
 (3,"profondo",1.2,"Un obbligo mancato fa scattare un diritto di tutti."),

 (4,"chiaro",0.5,"Chi puo' chiedere? Chiunque. L'esercizio del diritto non e' sottoposto ad alcuna limitazione quanto alla legittimazione del richiedente: cittadini, associazioni, giornalisti, anche i dipendenti."),
 (4,"chiaro",0,"Non serve un interesse diretto, concreto e attuale. Non serve essere dipendente, paziente o residente. Basta la richiesta."),
 (4,"chiaro",0,"E la richiesta non deve essere motivata. L'amministrazione non puo' chiedere perche' vuoi quel dato, ne' valutare se il motivo e' buono."),
 (4,"chiaro",0,"Si puo' presentare anche per via telematica, secondo il codice dell'amministrazione digitale. Una posta elettronica certificata o un modulo online sono sufficienti."),
 (4,"chiaro",0,"Non serve un modulo obbligatorio: basta che la richiesta indichi con chiarezza il dato o il documento che manca. Molte aziende, comunque, mettono a disposizione un modello nella sezione del sito."),
 (4,"chiaro",0,"A chi? La legge offre piu' strade: l'ufficio che detiene i dati, l'ufficio relazioni con il pubblico, oppure un altro ufficio indicato nella sezione Amministrazione trasparente."),
 (4,"chiaro",0,"E, proprio per i dati a pubblicazione obbligatoria, anche il responsabile della prevenzione della corruzione e della trasparenza, l'RPCT."),
 (4,"chiaro",0,"Il rilascio e' gratuito. Si paga soltanto il rimborso del costo effettivo sostenuto per riprodurre i documenti su supporti materiali."),
 (4,"tenue",0.8,"Attenzione: nell'accesso civico non si chiede il motivo. Una richiesta respinta perche' non motivata sarebbe illegittima."),
 (4,"profondo",1.2,"Chiunque puo' chiedere: senza motivare, senza pagare."),

 (5,"chiaro",0.5,"Il procedimento si conclude entro trenta giorni dalla presentazione della domanda, con un provvedimento espresso e motivato, comunicato al richiedente."),
 (5,"chiaro",0,"Se la richiesta riguarda dati a pubblicazione obbligatoria, l'amministrazione non si limita a inviarli: li pubblica sul sito e comunica al richiedente il collegamento."),
 (5,"chiaro",0,"Cosi' il dato torna disponibile per tutti, non solo per chi l'ha chiesto. La richiesta di uno ripara l'inadempimento verso l'intera collettivita'."),
 (5,"chiaro",0,"E c'e' una conseguenza interna. Quando l'accesso riguarda dati che andavano pubblicati, l'RPCT deve segnalare l'inadempimento."),
 (5,"chiaro",0,"La segnalazione va, secondo la gravita', all'ufficio per i procedimenti disciplinari, al vertice dell'amministrazione e all'organismo indipendente di valutazione."),
 (5,"chiaro",0,"Il decreto e' chiaro anche sulle responsabilita': i dirigenti degli uffici, insieme all'RPCT, assicurano la regolare attuazione dell'accesso civico. E' un dovere, non un favore al cittadino."),
 (5,"chiaro",0,"Se l'amministrazione non risponde nei trenta giorni, o risponde di no, il richiedente puo' chiedere un riesame all'RPCT, che decide entro venti giorni."),
 (5,"chiaro",0,"Attenzione al silenzio: qui non vale come accoglimento. Chi non riceve risposta non ottiene il dato per il solo passare del tempo, e deve attivare i rimedi."),
 (5,"chiaro",0,"Contro la decisione, o contro il silenzio, resta il ricorso al tribunale amministrativo regionale, secondo il codice del processo amministrativo."),
 (5,"chiaro",0.6,"Un esempio: chiedi all'ufficio relazioni con il pubblico i tempi medi di attesa non pubblicati. Entro trenta giorni li trovi sul sito, e ricevi il collegamento."),
 (5,"tenue",0.8,"Un distrattore frequente: la risposta all'accesso civico semplice non e' una copia riservata al richiedente. Il dato viene pubblicato per tutti."),
 (5,"profondo",1.2,"Trenta giorni, un dato pubblicato per tutti, un collegamento per te."),

 (6,"chiaro",0.5,"Mettiamo a confronto i due accessi. Il documentale della legge 241 spetta a chi ha un interesse diretto, concreto e attuale; il civico semplice spetta a chiunque."),
 (6,"chiaro",0,"La richiesta documentale va motivata; quella civica no. Il documentale serve a tutelare una posizione personale; il civico serve a far rispettare un obbligo di trasparenza."),
 (6,"chiaro",0,"Nel documentale l'oggetto e' qualsiasi documento collegato al suo interesse, salvo le esclusioni. Nel civico semplice l'oggetto e' solo cio' che doveva essere pubblicato."),
 (6,"chiaro",0,"In comune hanno il termine di trenta giorni per rispondere e la possibilita' di ricorrere al giudice amministrativo. E i due strumenti possono convivere."),
 (6,"chiaro",0,"C'e' poi il terzo strumento, l'accesso civico generalizzato. Spetta anche lui a chiunque, senza motivare, ma riguarda dati non soggetti a pubblicazione e incontra limiti piu' ampi."),
 (6,"chiaro",0,"Un criterio pratico: prima di scrivere, controlla in Amministrazione trasparente se il dato dovrebbe esserci. Se la legge lo impone, usa l'accesso civico semplice."),
 (6,"tenue",0.8,"Attenzione a non confonderli: chi chiede i propri verbali di valutazione per difendersi usa l'accesso documentale; chi chiede i criteri non pubblicati di un concorso puo' usare l'accesso civico."),
 (6,"profondo",1.2,"Uno difende una posizione, l'altro difende la trasparenza."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: l'accesso civico semplice riguarda solo dati, informazioni e documenti a pubblicazione obbligatoria che non sono stati pubblicati."),
 (7,"chiaro",0.8,"La seconda: lo puo' presentare chiunque, senza motivazione e gratuitamente, all'ufficio che detiene i dati, all'URP, a un altro ufficio indicato o all'RPCT."),
 (7,"chiaro",0.8,"La terza: si conclude in trenta giorni; il dato viene pubblicato e si comunica il collegamento; contro il diniego o il silenzio c'e' il riesame dell'RPCT e poi il giudice."),
 (7,"tenue",0.8,"L'ultimo distrattore: l'accesso civico semplice non richiede un interesse personale. Quello e' il requisito dell'accesso documentale."),

 (8,"profondo",0,"[warm] In sintesi: un dato che manca, una richiesta semplice, una pubblicazione per tutti. Nella prossima lezione: l'accesso civico generalizzato, il FOIA, e i suoi limiti."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Che cosa si puo' chiedere", 4: 'Chi, come e a chi', 5: 'Tempi e risposta', 6: 'Due accessi a confronto', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
