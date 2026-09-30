# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 11.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M11): il sistema di bilancio degli enti territoriali (Titolo I). D.Lgs. 118/2011 artt. 4 (piano dei
# conti integrato, allegato 6), 11 (schemi: bilancio di previsione almeno triennale, rendiconto con conto del
# bilancio, conto economico, stato patrimoniale), 12-14 (spese per missioni e programmi, titoli e
# macroaggregati), 15 (entrate per titoli, tipologie, categorie); allegato 4/1 (programmazione: DUP per gli enti
# locali, DEFR per le regioni; PEG). TUEL artt. 151, 169, 170, 227 (termini: previsione 31/12, DUP al consiglio
# 31/7, rendiconto 30/4, consolidato 30/9). Missione 13 tutela della salute. Fonti: dispensa e test su Drive
# (con correzioni: le entrate non sono solo 6 titoli, le spese non solo 4); testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Una regione vuole sapere quanto ha speso nell'anno per la tutela della salute, e quanto di quella spesa e' andato in investimenti. Dove lo trova, nel bilancio?"),
 (1,"chiaro",0,"Lo trova perche' ogni spesa ha un indirizzo preciso: una missione, un programma, un titolo. Il sistema di bilancio armonizzato e' costruito come una mappa, uguale per tutti."),
 (1,"profondo",1.2,"Ogni euro ha un indirizzo, scritto nello stesso modo per tutti."),

 (2,"chiaro",0.6,"Quattro passaggi. I documenti del sistema di bilancio. Come si classificano le entrate. Come si classificano le spese. E il piano dei conti integrato, con il documento unico di programmazione."),

 (3,"chiaro",0.5,"Il sistema di bilancio degli enti territoriali parte dalla programmazione. Per gli enti locali il documento guida e' il DUP, il documento unico di programmazione; per le regioni, il documento di economia e finanza regionale."),
 (3,"chiaro",0,"Poi viene il bilancio di previsione finanziario. Copre almeno tre anni: per ciascuno indica le previsioni di competenza, e per il primo anno anche le previsioni di cassa."),
 (3,"chiaro",0,"Il bilancio di previsione degli enti locali si approva entro il trentuno dicembre dell'anno precedente. E' il documento che autorizza la spesa."),
 (3,"chiaro",0,"Negli enti locali la giunta traduce il bilancio nel piano esecutivo di gestione, il PEG: assegna ai dirigenti obiettivi e risorse, capitolo per capitolo."),
 (3,"chiaro",0,"A fine anno c'e' il rendiconto, che dimostra i risultati. Comprende il conto del bilancio, il conto economico e lo stato patrimoniale. Negli enti locali si approva entro il trenta aprile."),
 (3,"chiaro",0,"Nel rendiconto il risultato di amministrazione dice se l'ente ha chiuso in avanzo o in disavanzo, e quali quote sono gia' vincolate, accantonate o destinate agli investimenti."),
 (3,"chiaro",0,"Infine il bilancio consolidato, che somma i conti dell'ente con quelli degli enti e delle societa' che controlla. Negli enti locali si approva entro il trenta settembre."),
 (3,"chiaro",0.6,"Un esempio: un comune approva a dicembre il bilancio dei tre anni successivi, a gennaio il PEG; il rendiconto del primo anno arriva entro aprile dell'anno dopo, il consolidato entro settembre."),
 (3,"tenue",0.8,"Occhio a un distrattore: il bilancio di previsione degli enti territoriali non e' solo annuale. E' almeno triennale, con la cassa per il primo anno."),
 (3,"profondo",1.2,"Programmare, prevedere, gestire, rendicontare, consolidare."),

 (4,"chiaro",0.5,"Le entrate si classificano in titoli, secondo la fonte di provenienza; poi in tipologie, secondo la natura; e in categorie, secondo l'oggetto. Tre livelli, dal generale al particolare."),
 (4,"chiaro",0,"Il primo titolo raccoglie le entrate correnti di natura tributaria, contributiva e perequativa: tributi propri, compartecipazioni, fondi perequativi."),
 (4,"chiaro",0,"Il secondo sono i trasferimenti correnti, da altre amministrazioni. Il terzo, le entrate extratributarie: vendita di beni e servizi, proventi, interessi, rimborsi."),
 (4,"chiaro",0,"Il quarto titolo sono le entrate in conto capitale, per esempio contributi agli investimenti e alienazioni. Il quinto, le entrate da riduzione di attivita' finanziarie."),
 (4,"chiaro",0,"Il sesto e' l'accensione di prestiti, il settimo le anticipazioni dal tesoriere. Poi le entrate per conto terzi e le partite di giro, che l'ente incassa e poi riversa."),
 (4,"chiaro",0,"Distinguere i titoli serve a verificare gli equilibri: le entrate correnti, cioe' i primi tre titoli, devono coprire le spese correnti e le quote di rimborso dei prestiti."),
 (4,"chiaro",0.6,"Un esempio: un contributo della regione per rifare un ponte e' un'entrata in conto capitale, titolo quarto. Il fondo per le spese di gestione e' un trasferimento corrente."),
 (4,"tenue",0.8,"Attenzione: le entrate non si fermano a sei titoli, come in alcuni quiz. Ci sono anche le anticipazioni dal tesoriere e le entrate per conto terzi e partite di giro."),
 (4,"profondo",1.2,"Da dove arriva il denaro dice che cosa puo' finanziare."),

 (5,"chiaro",0.5,"Le spese si classificano prima per missioni, che rappresentano le funzioni principali e gli obiettivi strategici dell'ente. Per le regioni, la missione tredici e' la tutela della salute."),
 (5,"chiaro",0,"Le missioni si articolano in programmi, cioe' aggregati omogenei di attivita' per realizzare gli obiettivi. E' la classificazione che permette di sapere a che cosa servono le spese."),
 (5,"chiaro",0,"Poi ci sono i titoli, che dicono la natura economica della spesa. Il primo sono le spese correnti, il secondo le spese in conto capitale, cioe' gli investimenti."),
 (5,"chiaro",0,"Seguono le spese per incremento di attivita' finanziarie, il rimborso dei prestiti, la chiusura delle anticipazioni dal tesoriere e le uscite per conto terzi e partite di giro."),
 (5,"chiaro",0,"I titoli si dividono in macroaggregati: per le spese correnti, per esempio, redditi da lavoro dipendente, acquisto di beni e servizi, trasferimenti, interessi."),
 (5,"chiaro",0,"Missioni e programmi sono raccordati alla classificazione europea delle funzioni di governo. Cosi' la spesa per la salute di una regione italiana si confronta con quella di altri paesi."),
 (5,"chiaro",0,"Il consiglio vota il bilancio per tipologie di entrata e per programmi di spesa; il dettaglio in capitoli lo gestisce poi la giunta, con il piano esecutivo di gestione."),
 (5,"chiaro",0.6,"Torniamo alla regione. Nella missione tredici trova tutta la spesa per la salute; guardando il titolo secondo vede quanto e' andato in investimenti, come nuovi ospedali."),
 (5,"tenue",0.8,"Un distrattore frequente: le missioni non indicano la natura della spesa. Indicano la finalita'; la natura economica la dicono i titoli e i macroaggregati."),
 (5,"profondo",1.2,"La missione dice perche' si spende, il titolo dice come."),

 (6,"chiaro",0.5,"Tutte queste classificazioni si agganciano al piano dei conti integrato, previsto dall'articolo 4 e riportato in un allegato. E' unico per tutti gli enti che adottano la contabilita' finanziaria."),
 (6,"chiaro",0,"Si chiama integrato perche' collega tre contabilita': finanziaria, economica e patrimoniale. Da una stessa registrazione si ricavano gli effetti su tutti e tre i conti."),
 (6,"chiaro",0,"E' organizzato per livelli, dal titolo fino alla voce piu' di dettaglio. I codici del piano dei conti viaggiano anche sui pagamenti e sugli incassi registrati dal sistema dei tesorieri."),
 (6,"chiaro",0,"Il DUP e' il presupposto di tutti gli altri documenti. Ha una sezione strategica, che copre il mandato dell'amministrazione, e una sezione operativa, che copre il triennio."),
 (6,"chiaro",0,"Negli enti locali la giunta presenta il DUP al consiglio entro il trentuno luglio, per il triennio successivo. Poi lo aggiorna insieme al bilancio di previsione."),
 (6,"chiaro",0,"Nel DUP si fissano gli indirizzi: programma dei lavori pubblici, fabbisogno di personale, piano delle alienazioni. Il bilancio traduce quegli indirizzi in numeri."),
 (6,"chiaro",0.6,"Un esempio: un comune decide nel DUP di ristrutturare una casa di riposo. L'opera entra nel programma dei lavori, poi nel bilancio al titolo secondo della missione giusta."),
 (6,"tenue",0.8,"Attenzione: il DUP non e' un documento facoltativo, ne' riguarda le aziende sanitarie. E' lo strumento di programmazione degli enti locali."),
 (6,"profondo",1.2,"Un solo piano dei conti, tre contabilita' collegate."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il sistema di bilancio comprende programmazione, bilancio di previsione almeno triennale, PEG, rendiconto e bilancio consolidato."),
 (7,"chiaro",0.8,"La seconda: le entrate si classificano in titoli, tipologie e categorie; le spese in missioni, programmi, titoli e macroaggregati."),
 (7,"chiaro",0.8,"La terza: il piano dei conti integrato collega contabilita' finanziaria, economica e patrimoniale; il DUP e' il documento unico di programmazione degli enti locali."),
 (7,"tenue",0.8,"L'ultimo distrattore: il rendiconto degli enti locali non si approva entro il trentuno dicembre. Si approva entro il trenta aprile dell'anno successivo."),

 (8,"profondo",0,"[warm] In sintesi: una mappa comune per ogni euro pubblico. Nella prossima lezione: il Titolo secondo del decreto, dedicato alle aziende sanitarie."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'I documenti', 4: 'Le entrate', 5: 'Le spese', 6: 'Piano dei conti e DUP', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
