# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 3.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M3): la L.R. 56/1994 — finalita' e ruolo della Regione; ULSS e aziende
# ospedaliere; delega dei servizi sociali; Conferenza dei sindaci (art. 5);
# programmazione regionale (PSSR, relazione annuale entro il 30/09, azioni
# strumentali); protocolli con l'Universita'. Fonti: dispensa CISL FP (Galiazzo),
# schede CISL FP, sintesi della Regione (via ricerca) su finalita' e delega,
# L.R. 19/2016 (artt. 17-26: rinvii all'art. 5 della 56). Testo della 56 non raggiungibile.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Un Comune di tremila abitanti, in collina. Il sindaco non gestisce l'ospedale e non nomina i primari. Eppure ha voce sulla sanita' del suo territorio. Da dove viene quella voce?"),
 (1,"chiaro",0,"Viene dalla legge regionale 56 del 1994: la legge che disegna l'architettura del sistema veneto. Chi programma, chi gestisce, chi partecipa, chi controlla."),
 (1,"profondo",1.2,"Una legge di riordino fa una cosa sola, ma la fa fino in fondo: dice chi fa che cosa."),

 (2,"chiaro",0,"Quattro passaggi. Le finalita' e il ruolo della Regione. Le aziende, ULSS e ospedaliere. I Comuni e la Conferenza dei sindaci. La programmazione regionale e i rapporti con l'Universita'."),

 (3,"chiaro",0,"Il titolo completo: norme e principi per il riordino del servizio sanitario regionale, in attuazione del decreto 502 del 1992, come modificato dal decreto 517 del 1993."),
 (3,"chiaro",0,"Il punto di partenza: la Regione assicura ai cittadini i migliori livelli uniformi di assistenza, sul territorio regionale, in relazione alle risorse disponibili."),
 (3,"chiaro",0,"Uniformi vuol dire uguali per tutti, da Belluno a Rovigo. In relazione alle risorse vuol dire dentro i conti: un diritto che deve restare sostenibile."),
 (3,"chiaro",0,"Per garantirlo, la Regione esercita funzioni di programmazione, di indirizzo, di controllo e di vigilanza sulle ULSS e sulle aziende ospedaliere."),
 (3,"chiaro",0,"Programmare vuol dire fissare obiettivi e priorita'. Indirizzare, dare regole comuni. Controllare e vigilare, verificare che le aziende le rispettino. E poi si riparte."),
 (3,"chiaro",0,"E' lo spazio che il decreto 502 lascia alle Regioni: definire il quadro istituzionale, individuare le unita' locali e i loro ambiti, scegliere gli ospedali da costituire in aziende."),
 (3,"chiaro",0,"Oltre a disciplinare l'organizzazione e il funzionamento delle unita' locali. La legge 56 fa esattamente questo, per il Veneto."),
 (3,"chiaro",0,"E c'e' un obiettivo scritto nella legge: la Regione persegue l'integrazione tra le politiche sanitarie e quelle sociali. Non e' un'abitudine: e' un principio."),
 (3,"tenue",0,"Attenzione: la Regione non gestisce direttamente gli ospedali. Programma, indirizza e controlla. La gestione dei servizi spetta alle aziende."),
 (3,"profondo",1.2,"La Regione governa. Le aziende gestiscono. E il cittadino sa a chi chiedere conto."),

 (4,"chiaro",0,"Le aziende sono di due tipi: l'azienda ULSS, unita' locale socio-sanitaria, e l'azienda ospedaliera. Diverse per missione, dentro lo stesso sistema."),
 (4,"chiaro",0,"La ULSS copre un territorio e fa quasi tutto: prevenzione, assistenza distrettuale, ospedali, farmaceutica, specialistica. E le attivita' socio-assistenziali che le vengono delegate."),
 (4,"chiaro",0,"L'azienda ospedaliera si concentra su uno o piu' ospedali: ricovero e cura ad alta specializzazione, con un contributo alla ricerca e alla formazione del personale sanitario."),
 (4,"chiaro",0,"Oggi, dopo la legge 19, il Veneto conta nove aziende ULSS, due aziende ospedaliere universitarie, Padova e Verona, e l'Istituto Oncologico Veneto."),
 (4,"chiaro",0,"Entrambi i tipi di azienda assicurano le prestazioni dei livelli uniformi di assistenza, fissati dal piano socio-sanitario regionale nel rispetto del piano sanitario nazionale."),
 (4,"chiaro",0,"E ciascuna adotta un piano generale triennale: il documento con cui traduce in azioni la programmazione regionale. Lo vedremo da vicino nella lezione sulla legge 55."),
 (4,"chiaro",0,"Poi c'e' la delega sociale. La Regione promuove la delega della gestione dei servizi sociali dai Comuni alle ULSS, con finanziamenti specifici e nei modi fissati dal piano socio-sanitario."),
 (4,"chiaro",0,"Per il cittadino vuol dire una sola azienda per bisogni diversi: l'assistenza a domicilio, i servizi per le persone con disabilita', l'ospedale."),
 (4,"tenue",0,"Un distrattore frequente: la delega non toglie ai Comuni la titolarita' dei servizi sociali. Ne affida la gestione alla ULSS, che la esercita per loro."),
 (4,"profondo",1.2,"Due aziende, un solo sistema. E la ULSS che tiene insieme sanita' e sociale."),

 (5,"chiaro",0,"Il territorio di una ULSS comprende molti Comuni. Per questo la legge 56, all'articolo cinque, istituisce la Conferenza dei sindaci."),
 (5,"chiaro",0,"E' l'organismo con cui i Comuni esercitano funzioni di indirizzo e di valutazione sull'azienda. Non gestisce: orienta e giudica. La gestione resta al direttore generale."),
 (5,"chiaro",0,"I compiti da ricordare sono quattro. Il primo: formula osservazioni sulla proposta di piano socio-sanitario regionale."),
 (5,"chiaro",0,"Il secondo: elabora i piani di zona, i programmi dei servizi sociali a integrazione socio-sanitaria. Il terzo: esamina il bilancio di previsione e il bilancio consuntivo."),
 (5,"chiaro",0,"Il quarto: esprime il parere sul piano attuativo locale, cioe' il piano generale dell'azienda. Il direttore generale lo chiede prima di approvarlo."),
 (5,"chiaro",0,"La Conferenza lavora con un esecutivo e un presidente. La legge 19 del 2016 la conferma in ogni azienda ULSS, rinviando proprio all'articolo cinque della legge 56."),
 (5,"chiaro",0,"Con la legge 19 arrivano anche i Comitati dei sindaci di distretto, uno per distretto. Non sostituiscono la Conferenza: lavorano accanto, piu' vicino al territorio."),
 (5,"chiaro",0,"Perche' conta? Il direttore generale e' nominato dalla Regione, ma deve rendere conto anche a chi rappresenta i cittadini del territorio: i loro sindaci."),
 (5,"chiaro",0,"Torna al sindaco del Comune in collina: attraverso la Conferenza dice la sua sul piano dell'azienda, sui bilanci, sui servizi sociali del suo territorio. Ecco da dove viene la sua voce."),
 (5,"tenue",0,"Occhio ai nomi: Conferenza dei sindaci e Comitato dei sindaci non sono la stessa cosa. La Conferenza lavora sull'intera ULSS, il Comitato sul singolo distretto."),
 (5,"profondo",1.2,"I Comuni non gestiscono l'azienda. Ma la orientano, e la giudicano."),

 (6,"chiaro",0,"Resta la programmazione regionale. Si realizza con il piano socio-sanitario regionale, che definisce obiettivi e standard dei servizi e si articola in programmi di intervento."),
 (6,"chiaro",0,"Ogni anno, entro il 30 settembre, la Giunta riferisce al Consiglio regionale sull'andamento del servizio sanitario regionale. E' il momento in cui la politica rende conto."),
 (6,"chiaro",0,"La legge indica anche le azioni strumentali: lo sviluppo del sistema informativo, l'osservazione epidemiologica e le sperimentazioni gestionali."),
 (6,"chiaro",0,"Senza dati non si programma. Il sistema informativo e l'epidemiologia sono gli occhi della Regione sul territorio. Le sperimentazioni gestionali, invece, servono a provare modelli nuovi prima di estenderli."),
 (6,"chiaro",0,"Un esempio: se in una zona crescono gli anziani soli, i dati lo mostrano prima che le liste d'attesa esplodano. La programmazione parte da li'."),
 (6,"chiaro",0,"Poi l'Universita'. La sanita' veneta forma i suoi medici e fa ricerca: per questo Regione e Universita' stipulano protocolli d'intesa, con tre scopi precisi."),
 (6,"chiaro",0,"Regolare l'apporto delle facolta' di medicina all'assistenza. Organizzare la reciproca collaborazione. E disciplinare i corsi di formazione."),
 (6,"chiaro",0,"E' la base su cui lavorano le aziende ospedaliere universitarie di Padova e di Verona. Le vedremo da vicino nel modulo quattro."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: con la legge 56 la Regione esercita programmazione, indirizzo, controllo e vigilanza. La gestione spetta alle aziende."),
 (7,"chiaro",0,"La seconda: la Conferenza dei sindaci, articolo cinque, ha funzioni di indirizzo e di valutazione. Osservazioni sul piano regionale, piani di zona, esame dei bilanci, parere sul piano attuativo."),
 (7,"chiaro",0,"La terza: ogni anno, entro il 30 settembre, la Giunta riferisce al Consiglio regionale sull'andamento del servizio sanitario regionale. E' la relazione annuale."),
 (7,"tenue",0,"L'ultimo distrattore: il piano di zona non e' il piano generale. Il piano di zona riguarda i servizi sociali e passa dalla Conferenza dei sindaci. Il piano generale e' dell'azienda."),

 (8,"profondo",0,"[warm] In sintesi: la Regione governa, le aziende gestiscono, i Comuni orientano e valutano. Nella prossima lezione entriamo nell'azienda: gli organi, i distretti, i dipartimenti."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Le finalita' e la Regione", 4: 'Le aziende', 5: 'I Comuni e la Conferenza dei sindaci', 6: "Programmazione regionale e Universita'", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
