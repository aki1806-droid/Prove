# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 2.6 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M2): il distretto come struttura di riferimento; servizi
# integrati; le Case della Salute. Fonti: L.R. Veneto 19/2016 art. 26; PSSR 2019-2023
# cap. 6 («Il nuovo ruolo del Distretto», pp. 92-96); dispensa CISL FP (Griggio).
# Le «Case della Salute» non sono nel PSSR 2019-2023: il copione le presenta come
# modello nazionale, oggi ripreso dalle Case della Comunita' del DM 77/2022 (PNRR).
# Gli standard del DM 77 sono da confermare sul testo.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Una figlia deve organizzare l'assistenza a casa per il padre, appena dimesso dall'ospedale. Infermiere a domicilio, ausili, un aiuto sociale. A chi si rivolge? Al distretto."),
 (1,"chiaro",0,"Il distretto e' la parte della ULSS che il cittadino incontra di piu', spesso senza saperne il nome. Ed e' la parte che la riforma veneta ha caricato di piu' compiti."),
 (1,"profondo",1.2,"Se l'ospedale e' il luogo della fase acuta, il distretto e' il luogo di tutto il resto. Per questo il Piano lo vuole potenziato."),

 (2,"chiaro",0,"Quattro passaggi. Che cos'e' il distretto. Come lo ridisegna la legge 19. Che cosa gli chiede il Piano socio-sanitario 2019-2023. E il modello delle Case della Salute, oggi Case della Comunita'."),

 (3,"chiaro",0,"Il distretto e' un'articolazione territoriale della ULSS. Coordina e gestisce i servizi sanitari e socio-sanitari per la popolazione di un territorio definito, di solito un insieme di Comuni."),
 (3,"chiaro",0,"Ha due funzioni di fondo. La prima: garantire l'integrazione tra assistenza sanitaria e servizi sociali. La seconda: pianificare, coordinare e valutare i servizi sul territorio."),
 (3,"chiaro",0,"Che cosa gestisce, in concreto? L'assistenza primaria, con medici di famiglia e pediatri. Le cure domiciliari e l'assistenza a lungo termine. I consultori, i servizi per anziani e disabili."),
 (3,"chiaro",0,"E poi la prevenzione e la promozione della salute, il coordinamento con gli ospedali e gli specialisti, e i servizi amministrativi per l'utenza."),
 (3,"chiaro",0,"Lo scopo, nelle parole della dispensa CISL: garantire continuita' tra ospedale, territorio e servizi sociali, e rispondere piu' vicino ai bisogni dei cittadini, evitando la frammentazione dei servizi."),
 (3,"tenue",0,"Attenzione: il distretto non e' un'azienda e non ha personalita' giuridica. E' un'articolazione della ULSS, come l'ospedale e il dipartimento di prevenzione."),

 (4,"chiaro",0,"Con la legge 19 del 2016 il distretto cambia nome e confini. Nome: il distretto socio-sanitario diventa semplicemente distretto, e conserva tutte le sue funzioni."),
 (4,"chiaro",0,"Confini: i bacini delle vecchie ULSS diventano i distretti delle nuove. Con funzioni di coordinamento tra l'ospedale e la rete territoriale di riferimento."),
 (4,"chiaro",0,"Cosi' le vecchie aziende non spariscono dal territorio: diventano il livello di prossimita' della nuova ULSS. Dove una vecchia ULSS aveva piu' distretti, questi restano, con un unico Comitato dei Sindaci."),
 (4,"chiaro",0,"Il Comitato dei Sindaci di distretto e' il cuore politico del distretto. Elabora e approva il Piano di Zona, il bilancio di parte sociale e il Piano locale per la non autosufficienza."),
 (4,"chiaro",0,"Esprime parere sulle schede di dotazione territoriale, sulla collocazione delle strutture intermedie e sull'attivazione delle medicine di gruppo integrate."),
 (4,"chiaro",0,"E la legge chiede, in ogni distretto, unita' operative dedicate: cure primarie, infanzia adolescenza famiglia e consultori, disabilita' e non autosufficienza, cure palliative, attivita' specialistica."),
 (4,"chiaro",0,"Sopra i distretti c'e' il direttore dei servizi socio-sanitari, con una unita' operativa per il sociale in staff, per coordinare i servizi sociali e il Piano di Zona."),
 (4,"profondo",1.2,"La legge 19, quindi, fa del distretto il punto in cui ULSS e Comuni si incontrano."),

 (5,"chiaro",0,"Il Piano socio-sanitario 2019-2023 va oltre. Il suo primo obiettivo sulla cronicita' e' potenziare il ruolo del distretto come gestore della cronicita'."),
 (5,"chiaro",0,"Il Piano lo definisce l'articolazione della ULSS deputata all'integrazione tra i servizi e le strutture sanitarie e socio-sanitarie del territorio, per una risposta coordinata e continua."),
 (5,"chiaro",0,"Al distretto affida tre obiettivi. Il primo: analizzare e misurare i bisogni, stratificando la popolazione in base alle malattie e al rischio, per scegliere i luoghi di cura piu' appropriati."),
 (5,"chiaro",0,"Il secondo: definire e attuare i percorsi per le principali patologie croniche e per le persone fragili. Il terzo: garantire l'assistenza ventiquattro ore su ventiquattro, sette giorni su sette."),
 (5,"chiaro",0,"E cambia il ruolo del direttore di distretto. Diventa responsabile dell'analisi dei bisogni e dei percorsi assistenziali integrati, gestore della cronicita' complessa, facilitatore dell'integrazione tra i nodi della rete."),
 (5,"chiaro",0,"E' il direttore di distretto a organizzare le risorse per attuare i percorsi diagnostico-terapeutici, i PDTA, e a definire il budget delle prestazioni specialistiche necessarie."),
 (5,"chiaro",0,"Per farlo puo' fare accordi con gli specialisti ambulatoriali interni del distretto e, se serve, con le strutture private accreditate del suo territorio."),
 (5,"chiaro",0,"Il Piano fissa anche scadenze: la stesura e l'attivazione del Piano della domiciliarita' distrettuale entro il 2019, e un programma formativo multidisciplinare."),
 (5,"tenue",0,"Un distrattore frequente: gestore della cronicita' non vuol dire che il distretto cura da solo. Vuol dire che coordina: medici di famiglia, specialisti, ospedale, servizi sociali."),
 (5,"profondo",1.2,"Da semplice erogatore di servizi a regista della presa in carico: e' questo il distretto potenziato."),

 (6,"chiaro",0,"Che cosa vuol dire servizi integrati, per il cittadino? Vuol dire un solo punto di accesso, e un solo percorso, anche quando servono piu' professionisti."),
 (6,"chiaro",0,"Lo strumento e' la valutazione multidimensionale. Una unita' valutativa guarda insieme i bisogni sanitari, sociali e funzionali della persona, e costruisce un progetto unico."),
 (6,"chiaro",0,"Le medicine di gruppo diventano il primo presidio: compiti aggiuntivi per l'accessibilita', la presa in carico dei cronici e l'assistenza domiciliare, con risorse dedicate e indicatori regionali."),
 (6,"chiaro",0,"Accanto lavorano gli infermieri, il cui ruolo nell'assistenza primaria il Piano chiede di far crescere, e gli specialisti ambulatoriali del distretto."),
 (6,"chiaro",0,"Anche la prevenzione entra nel percorso: il Dipartimento di Prevenzione puo' affiancare il medico di famiglia e il team per aiutare il paziente a cambiare gli stili di vita."),
 (6,"chiaro",0,"E ci sono le farmacie, presidi del servizio sanitario sul territorio: con la farmacia dei servizi possono fare prevenzione, screening e prenotazioni, in coordinamento con la ULSS."),
 (6,"profondo",1.2,"Tanti professionisti, un solo percorso: l'integrazione si misura dal numero di sportelli che il cittadino non deve piu' girare."),

 (7,"chiaro",0,"Resta il luogo fisico. Per anni il modello nazionale e' stato quello delle Case della Salute: una sede unica dove trovare medici di famiglia, infermieri, specialisti e sportelli sociali."),
 (7,"chiaro",0,"Nel Veneto la stessa idea ha preso soprattutto la forma delle medicine di gruppo integrate, con sedi uniche, spesso messe a disposizione dai Comuni."),
 (7,"chiaro",0,"Oggi, a livello nazionale, il modello si chiama Casa della Comunita'. La prevede il decreto ministeriale 77 del 2022, che ridisegna l'assistenza territoriale con i fondi del PNRR."),
 (7,"chiaro",0,"Nello stesso decreto tornano anche gli altri pezzi di questo modulo: gli ospedali di comunita' e le centrali operative territoriali, le COT. Li vedremo nella prossima lezione."),
 (7,"chiaro",0,"Occhio ai nomi nei quiz. Casa della Salute e' il nome storico, Casa della Comunita' quello del decreto 77. Medicina di gruppo integrata e' il modello veneto dei medici di famiglia."),

 (8,"chiaro",0,"Le tre cose che ti chiederanno. La prima: con la legge 19 i bacini delle vecchie ULSS diventano distretti, e il distretto socio-sanitario prende il nome di distretto."),
 (8,"chiaro",0,"La seconda: in ogni distretto c'e' il Comitato dei Sindaci, che approva il Piano di Zona, il bilancio di parte sociale e il Piano locale per la non autosufficienza."),
 (8,"chiaro",0,"La terza: per il Piano socio-sanitario 2019-2023 il distretto e' il gestore della cronicita', e deve garantire l'assistenza ventiquattro ore su ventiquattro, sette giorni su sette."),
 (8,"tenue",0,"L'ultimo distrattore: il distretto non ha organi propri come un'azienda. Ha un direttore di distretto, dentro l'organizzazione della ULSS."),

 (9,"profondo",0,"[warm] In sintesi: il distretto e' la ULSS vicino a casa, dove sanitario e sociale si incontrano. Nell'ultima lezione del modulo: ospedali di comunita', cronicita' e fragilita'."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Che cos'e' il distretto", 4: 'Il distretto dopo la legge 19', 5: 'Il distretto potenziato del Piano', 6: 'I servizi integrati', 7: "Dalle Case della Salute alle Case della Comunita'", 8: 'Le tre cose che ti chiederanno', 9: 'Chiusura'}
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
