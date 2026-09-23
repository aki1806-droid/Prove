# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 2.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M2): titolo e struttura della legge; funzioni dell'art. 2;
# soggetto aggregatore; Area Sanita' e Sociale. Fonte: testo della L.R. Veneto
# 19/2016 (artt. 1-11), piu' l'art. 17 della L.R. 48/2018 (lettera f bis).
# «Soggetto aggregatore» non e' nel testo della 19: il copione lo presenta come
# nome che gli acquisti centralizzati prendono nel diritto degli appalti.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Se lavori nella sanita' veneta, Azienda Zero ti riguarda anche se non ci hai mai messo piede. Il concorso che ti ha assunto, probabilmente, l'ha gestito lei."),
 (1,"chiaro",0,"E' un'azienda senza ospedali, senza ambulatori, senza pazienti. Eppure governa i conti, gli acquisti e i sistemi informativi di tutta la sanita' regionale."),
 (1,"profondo",1.2,"Nelle dispense spesso manca, ma e' meta' del titolo della legge 19. Ed e' la domanda piu' probabile di tutto il modulo."),

 (2,"chiaro",0,"Quattro passaggi. La legge e il nome. Le funzioni, quelle proprie e quelle che la Giunta puo' aggiungere. Gli organi. E il sistema di governance regionale in cui Azienda Zero si muove."),

 (3,"chiaro",0,"La legge regionale 19 del 25 ottobre 2016 ha due parti. Il titolo primo, con la sua norma finale, istituisce e disciplina Azienda Zero: articoli da 1 a 13. Il titolo terzo riorganizza le ULSS."),
 (3,"chiaro",0,"Il nome per esteso, nel titolo della legge, e' Azienda per il governo della sanita' della Regione del Veneto. Azienda Zero e' il nome breve."),
 (3,"chiaro",0,"Ma l'articolo 1 la descrive con altre parole: azienda per la razionalizzazione, l'integrazione e l'efficientamento dei servizi sanitari, socio-sanitari e tecnico-amministrativi."),
 (3,"chiaro",0,"Razionalizzare, integrare, rendere efficiente. Sono le tre parole che spiegano perche' nasce: rispondere alla frammentazione di cui abbiamo parlato nella lezione due punto uno."),
 (3,"chiaro",0,"La natura giuridica e' quella di un ente del servizio sanitario regionale, con personalita' giuridica di diritto pubblico e autonomia amministrativa, patrimoniale, organizzativa, tecnica, gestionale e contabile."),
 (3,"tenue",0,"Attenzione a una trappola: Azienda Zero non e' un ufficio della Regione, e non e' una decima ULSS. E' un ente autonomo del servizio sanitario regionale, con un compito di governo e di servizio."),

 (4,"chiaro",0,"Che cosa fa? Le funzioni stanno tutte all'articolo 2. Il comma 1 elenca quelle proprie, che spettano ad Azienda Zero per legge. Si possono dividere in tre gruppi."),
 (4,"chiaro",0,"Il primo gruppo sono i conti. Azienda Zero gestisce la Gestione Sanitaria Accentrata, la GSA, prevista dal decreto legislativo 118 del 2011: la parte del fondo sanitario che la Regione gestisce direttamente."),
 (4,"chiaro",0,"Gestisce i flussi di cassa del finanziamento sanitario, tiene le scritture della GSA, redige il suo bilancio preventivo e consuntivo, e il bilancio consolidato di tutto il servizio sanitario regionale."),
 (4,"chiaro",0,"E da' gli indirizzi in materia contabile alle ULSS e agli altri enti: un solo modo di tenere i conti, per tutti."),
 (4,"chiaro",0,"Il secondo gruppo sono le attivita' tecnico-specialistiche per tutto il sistema. La legge ne elenca undici. Partiamo dalle piu' chieste."),
 (4,"chiaro",0,"Gli acquisti centralizzati, nel rispetto della qualita', dell'economicita' e della specificita' clinica, previa valutazione della commissione regionale per gli investimenti, la CRITE."),
 (4,"chiaro",0,"Nel diritto degli appalti una centrale di acquisto che compra per molte amministrazioni si chiama soggetto aggregatore. E' la stessa logica: una gara sola, al posto di nove."),
 (4,"chiaro",0,"Le procedure di selezione del personale del comparto sanita', secondo un regolamento della Giunta. Sono i concorsi unici regionali: una graduatoria che serve piu' aziende."),
 (4,"chiaro",0,"Poi il supporto alla formazione manageriale e al rischio clinico, l'accreditamento ECM, il supporto al modello assicurativo, con il contenzioso e le transazioni."),
 (4,"chiaro",0,"E ancora: le infrastrutture informatiche e i flussi di dati, l'autorizzazione all'esercizio delle strutture sanitarie e socio-sanitarie, la gestione del contenzioso del lavoro e sanitario."),
 (4,"chiaro",0,"Chiudono l'elenco la razionalizzazione della logistica, i servizi tecnici per la valutazione delle tecnologie, la HTA, e l'attivazione del fascicolo sanitario elettronico."),
 (4,"chiaro",0,"Il terzo gruppo e' una sola voce, alla lettera h: l'indirizzo e il coordinamento degli Uffici Relazioni con il Pubblico delle ULSS, in materia sanitaria e socio-sanitaria."),
 (4,"profondo",1.2,"Tre gruppi, allora: i conti del sistema, i servizi tecnici comuni, e il coordinamento del rapporto con i cittadini."),

 (5,"chiaro",0,"Il comma 2 dell'articolo 2 e' diverso. Elenca funzioni che la Giunta regionale puo' attribuire ad Azienda Zero con successivi provvedimenti, sentita la commissione consiliare."),
 (5,"chiaro",0,"Sono funzioni di supporto al governo: analisi e proposte per la programmazione, supporto alla Giunta sugli obiettivi, supporto alla definizione degli obiettivi dei direttori generali delle aziende."),
 (5,"chiaro",0,"E poi la proposta dei costi standard e il loro monitoraggio, i flussi informativi, l'auditing e il controllo interno, il Sistema Epidemiologico Regionale con i suoi registri."),
 (5,"chiaro",0,"Nel 2018 la legge del nuovo Piano socio-sanitario aggiunge una voce: il monitoraggio e la vigilanza sulle forme di sanita' integrativa."),
 (5,"tenue",0,"La distinzione e' da quiz. Le funzioni del comma 1 le da' la legge. Quelle del comma 2 sono solo possibili: servono i provvedimenti della Giunta regionale."),

 (6,"chiaro",0,"Gli organi di Azienda Zero, all'articolo 4, sono due soltanto: il direttore generale e il collegio sindacale."),
 (6,"chiaro",0,"Il direttore generale lo nomina il Presidente della Giunta regionale, con gli stessi requisiti richiesti per i direttori generali delle ULSS. Il contratto e' di diritto privato, per non piu' di cinque anni."),
 (6,"chiaro",0,"E' il legale rappresentante, ha i poteri di direzione e di gestione, ed e' anche il responsabile della GSA. Nomina il direttore sanitario e il direttore amministrativo, e adotta l'atto aziendale."),
 (6,"chiaro",0,"Il collegio sindacale ha tre membri, nominati dal direttore generale: uno designato dal Presidente della Giunta regionale, uno dal Ministro dell'economia e delle finanze, uno dal Ministro della salute."),
 (6,"chiaro",0,"Oltre ai controlli consueti, il collegio fa da terzo certificatore dei conti della GSA. E accerta ogni tre mesi la consistenza di cassa."),
 (6,"tenue",0,"Il confronto con le ULSS e' la trappola classica. Nelle ULSS gli organi sono tre: direttore generale, collegio di direzione, collegio sindacale. In Azienda Zero il collegio di direzione non c'e'."),
 (6,"chiaro",0,"Il personale viene soprattutto per mobilita' da Regione, ULSS e altri enti, con il contratto del servizio sanitario nazionale. E l'azienda e' tenuta all'equilibrio economico e finanziario."),

 (7,"chiaro",0,"Resta la domanda: chi governa Azienda Zero? La risposta e' l'Area Sanita' e Sociale della Regione, disciplinata all'articolo 11, con a capo un direttore generale."),
 (7,"chiaro",0,"Nell'esercizio delle sue funzioni Azienda Zero e' sottoposta al coordinamento del direttore generale dell'Area. E la Giunta esercita vigilanza e controllo su di lei per suo tramite."),
 (7,"chiaro",0,"All'Area spetta anche il visto di congruita' sui bilanci della GSA e sul consolidato del sistema, che Azienda Zero predispone. E il direttore dell'Area presiede la CRITE."),
 (7,"chiaro",0,"Il terzo attore e' il Comitato dei direttori generali, all'articolo 3: i direttori generali di ULSS, aziende ospedaliere, Istituto Oncologico Veneto e Azienda Zero, piu' il direttore dell'Area, che lo presiede."),
 (7,"chiaro",0,"Il Comitato determina indirizzi e fabbisogni per le attivita' tecnico-specialistiche di Azienda Zero, e da' un parere obbligatorio sugli atti che le riguardano. Chi usa i servizi decide cosa serve."),
 (7,"profondo",1.2,"Ecco la catena: la Giunta indirizza, l'Area Sanita' e Sociale coordina e vigila, Azienda Zero esegue per tutti, il Comitato dei direttori generali dice di che cosa le aziende hanno bisogno."),

 (8,"chiaro",0,"Le tre cose che ti chiederanno. La prima: Azienda Zero e' istituita dalla legge regionale 19 del 2016, ed e' un ente del servizio sanitario regionale con personalita' giuridica di diritto pubblico."),
 (8,"chiaro",0,"La seconda: le funzioni stanno all'articolo 2. Proprie al comma 1: GSA, bilancio consolidato, acquisti centralizzati, concorsi del comparto. Attribuibili dalla Giunta al comma 2."),
 (8,"chiaro",0,"La terza: gli organi sono due, direttore generale e collegio sindacale. Il direttore generale lo nomina il Presidente della Giunta regionale."),
 (8,"tenue",0,"L'ultimo distrattore: il Comitato dei direttori generali non lo presiede il direttore di Azienda Zero. Lo presiede il direttore generale dell'Area Sanita' e Sociale."),

 (9,"profondo",0,"[warm] In sintesi: un'azienda senza pazienti che lavora per tutte le altre, dentro una regia regionale. Nella prossima lezione, l'altra meta' della legge 19: la nuova geografia delle nove ULSS."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'La legge e il nome', 4: 'Che cosa fa: le funzioni proprie', 5: "Le funzioni che la Giunta puo' aggiungere", 6: 'Gli organi', 7: 'La governance regionale', 8: 'Le tre cose che ti chiederanno', 9: 'Chiusura'}
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
