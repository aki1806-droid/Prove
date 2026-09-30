# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 11.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M11): perche' l'armonizzazione. L. 42/2009 artt. 1-2 (delega, federalismo fiscale); L. 196/2009
# (contabilita' dello Stato); D.Lgs. 23 giugno 2011, n. 118; sperimentazione dal 2012; D.Lgs. 126/2014
# (correttivo; Titolo III ordinamento contabile delle regioni; TUEL parte II aggiornata); a regime dal 2015;
# Titolo II sanita' (art. 19 ss.) dal 2012; commissione Arconet (art. 3-bis); allegati: principi generali
# (all. 1), principi applicati (programmazione, contabilita' finanziaria, economico-patrimoniale,
# consolidato), piano dei conti integrato, schemi. D.Lgs. 502/1992 e L.R. Veneto 55/1994 per le aziende
# sanitarie prima del 2011. Fonti: dispensa su Drive (con correzioni); L.R. 19/2016; testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'azienda sanitaria del Veneto e una della Lombardia spendono per i farmaci. Fino a pochi anni fa confrontare i loro bilanci era quasi impossibile. Perche'?"),
 (1,"chiaro",0,"Perche' ogni ente contava a modo suo: regole, schemi e voci diverse. Il decreto legislativo 118 del 2011 nasce per far parlare a tutti i bilanci pubblici la stessa lingua."),
 (1,"profondo",1.2,"Stessi conti, stessa lingua, bilanci confrontabili."),

 (2,"chiaro",0.6,"Quattro passaggi. Com'erano i conti prima del 2011. La legge delega e il decreto. Gli obiettivi dell'armonizzazione. E l'architettura del decreto, con i suoi allegati."),

 (3,"chiaro",0.5,"Prima dell'armonizzazione convivevano sistemi diversi. Regioni ed enti locali usavano la contabilita' finanziaria, basata sulle entrate e sulle spese autorizzate dal bilancio di previsione."),
 (3,"chiaro",0,"La contabilita' finanziaria dice quanto si puo' spendere e quanto si e' speso. Ma da sola non dice quanto costa davvero un servizio, ne' quanto vale il patrimonio dell'ente."),
 (3,"chiaro",0,"Le aziende sanitarie avevano gia' cambiato strada: con il decreto 502 del 1992 erano passate alla contabilita' economico patrimoniale, in partita doppia, come le imprese."),
 (3,"chiaro",0,"Ma ogni regione aveva scritto le sue regole. Nel Veneto, per esempio, una legge regionale del 1994 disciplinava l'assetto contabile delle aziende sanitarie."),
 (3,"chiaro",0,"Il risultato era una babele: piani dei conti diversi, schemi di bilancio diversi, criteri di valutazione diversi. Sommare o confrontare i conti pubblici diventava un lavoro di traduzione."),
 (3,"chiaro",0,"E lo Stato faticava a costruire in modo affidabile il conto consolidato delle pubbliche amministrazioni, che l'Unione europea chiede per verificare deficit e debito."),
 (3,"chiaro",0.6,"Un esempio: due aziende sanitarie registrano lo stesso acquisto di un'apparecchiatura in voci diverse. Nei due bilanci il costo compare in modo diverso, e il confronto salta."),
 (3,"tenue",0.8,"Occhio a un distrattore: le aziende sanitarie non sono passate alla contabilita' economica con il decreto del 2011. Ci erano arrivate con il decreto 502 del 1992."),
 (3,"profondo",1.2,"Senza regole comuni, i numeri non si possono confrontare."),

 (4,"chiaro",0.5,"L'armonizzazione e' uno dei pilastri del federalismo fiscale. La legge delega e' la numero 42 del 2009, che agli articoli 1 e 2 chiede sistemi contabili e schemi di bilancio omogenei."),
 (4,"chiaro",0,"Nello stesso anno la legge 196 del 2009 riordina la contabilita' e la finanza pubblica. Il decreto 118 fa lo stesso lavoro per regioni, enti locali e loro organismi."),
 (4,"chiaro",0,"Il decreto legislativo e' del 23 giugno 2011, numero 118. Il titolo dice gia' tutto: disposizioni in materia di armonizzazione dei sistemi contabili e degli schemi di bilancio."),
 (4,"chiaro",0,"Per gli enti territoriali si parte con una sperimentazione, dal 2012. Il decreto correttivo 126 del 2014 lo modifica in profondita', e le nuove regole vanno a regime dal 2015."),
 (4,"chiaro",0,"La parte sanitaria, il Titolo secondo, si applica invece gia' dal 2012: le aziende sanitarie avevano la contabilita' economica, e bisognava soprattutto uniformarla."),
 (4,"chiaro",0,"Il decreto viene aggiornato nel tempo con decreti ministeriali, anche su proposta di una commissione tecnica, la commissione Arconet, che segue l'applicazione dei principi contabili."),
 (4,"chiaro",0.6,"Un esempio: nel 2015 un comune adotta per la prima volta i nuovi schemi di bilancio e il nuovo piano dei conti, gli stessi di ogni altro comune e di ogni regione."),
 (4,"tenue",0.8,"Attenzione: la legge 42 del 2009 non e' il decreto sull'armonizzazione. E' la legge delega sul federalismo fiscale, da cui il decreto 118 discende."),
 (4,"profondo",1.2,"Una delega nel 2009, un decreto nel 2011, un correttivo nel 2014."),

 (5,"chiaro",0.5,"Gli obiettivi si riassumono in tre parole. La prima e' omogeneita': tutti gli enti usano le stesse regole, gli stessi schemi e lo stesso piano dei conti."),
 (5,"chiaro",0,"La seconda e' confrontabilita': i bilanci di enti diversi, e dello stesso ente in anni diversi, si possono mettere a confronto. E' la base per misurare costi e risultati."),
 (5,"chiaro",0,"La terza e' trasparenza: i conti devono essere leggibili anche da chi non li ha scritti, dai cittadini agli organi di controllo, e vanno pubblicati."),
 (5,"chiaro",0,"Per arrivarci, il decreto introduce regole contabili uniformi, un piano dei conti integrato comune, il bilancio consolidato con gli enti controllati e un sistema di indicatori di risultato."),
 (5,"chiaro",0,"C'e' poi il raccordo con le regole europee: i conti degli enti devono poter confluire nel conto delle pubbliche amministrazioni che l'Italia trasmette all'Unione."),
 (5,"chiaro",0,"Armonizzare serve anche al coordinamento della finanza pubblica: se tutti contano allo stesso modo, lo Stato puo' verificare equilibri e vincoli di ogni livello di governo."),
 (5,"chiaro",0,"Gli indicatori accompagnano il bilancio di previsione e il rendiconto: misurano in modo uniforme i risultati e l'andamento dei conti, cosi' gli enti si possono confrontare tra loro."),
 (5,"chiaro",0.6,"Un esempio: con conti armonizzati si puo' confrontare il costo per abitante dell'assistenza farmaceutica di due regioni, voce per voce, senza riclassificare i bilanci."),
 (5,"tenue",0.8,"Un distrattore frequente: armonizzare non vuol dire accentrare. Ogni ente resta autonomo nelle sue scelte; sono comuni le regole con cui le rappresenta nei conti."),
 (5,"profondo",1.2,"Omogeneita', confrontabilita', trasparenza: tre parole per un obiettivo."),

 (6,"chiaro",0.5,"Il decreto e' diviso in titoli. Il Titolo primo detta i principi contabili generali e applicati per regioni, enti locali e loro enti strumentali."),
 (6,"chiaro",0,"Il Titolo secondo, dall'articolo 19, riguarda il settore sanitario: la parte sanitaria del bilancio regionale, la gestione sanitaria accentrata, le aziende sanitarie e ospedaliere."),
 (6,"chiaro",0,"Il Titolo terzo, aggiunto dal correttivo del 2014, disciplina l'ordinamento finanziario e contabile delle regioni. Seguono le disposizioni finali e transitorie."),
 (6,"chiaro",0,"Per gli enti locali, le regole del decreto si leggono insieme al testo unico degli enti locali, che il correttivo del 2014 ha aggiornato nella parte sulla contabilita'."),
 (6,"chiaro",0,"Gran parte delle regole operative sta negli allegati. Il primo contiene i principi contabili generali; altri contengono i principi contabili applicati."),
 (6,"chiaro",0,"I principi applicati riguardano la programmazione, la contabilita' finanziaria, la contabilita' economico patrimoniale e il bilancio consolidato. Poi ci sono il piano dei conti e gli schemi."),
 (6,"chiaro",0,"Per le aziende sanitarie contano soprattutto il Titolo secondo e il codice civile, a cui il decreto rinvia per il bilancio d'esercizio, salvo quanto diversamente previsto."),
 (6,"chiaro",0.6,"Un esempio: per capire come si registra un credito di dubbia esigibilita', il ragioniere di un comune consulta il principio applicato della contabilita' finanziaria, tra gli allegati."),
 (6,"tenue",0.8,"Attenzione: le aziende sanitarie non seguono il Titolo primo come i comuni. Il loro riferimento e' il Titolo secondo, dall'articolo 19."),
 (6,"profondo",1.2,"I titoli dicono a chi, gli allegati dicono come."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il decreto legislativo 118 del 2011 armonizza sistemi contabili e schemi di bilancio di regioni, enti locali e loro organismi."),
 (7,"chiaro",0.8,"La seconda: discende dalla legge delega 42 del 2009 sul federalismo fiscale, ed e' stato corretto dal decreto 126 del 2014; per gli enti territoriali e' a regime dal 2015."),
 (7,"chiaro",0.8,"La terza: gli obiettivi sono omogeneita', confrontabilita' e trasparenza; il Titolo secondo, dall'articolo 19, riguarda la sanita'."),
 (7,"tenue",0.8,"L'ultimo distrattore: il decreto 118 non riguarda solo gli enti locali. Si applica anche alle regioni e, con il Titolo secondo, al servizio sanitario."),

 (8,"profondo",0,"[warm] In sintesi: una lingua comune per i conti pubblici. Nella prossima lezione: i principi contabili, a partire dalla competenza finanziaria potenziata."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'I conti prima del 2011', 4: 'La delega e il decreto', 5: 'Gli obiettivi', 6: "L'architettura del decreto", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
