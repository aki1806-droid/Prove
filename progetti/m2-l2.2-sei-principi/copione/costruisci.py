# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 2.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M2): ambiti ottimali; territorio; integrazione; medicina
# generale; innovazione; partecipazione. I sei nomi sono del corso (STRUTTURA): il
# copione aggancia ognuno ai criteri e alle finalita' scritte nella L.R. 19/2016
# (art. 14 c.1, art. 14 c.5, art. 15, art. 16, art. 26, art. 28).
BLOCCHI = [
 (1,"chiaro",0,"[serious] Nella lezione precedente abbiamo visto i quattro nodi. Oggi vediamo con quali idee la legge 19 del 2016 li scioglie. Sono sei, e le chiameremo i sei principi ispiratori."),
 (1,"chiaro",0,"Non cercarli in un elenco numerato della legge: non c'e'. Sono sparsi nei criteri dell'articolo 14 e nelle finalita' dell'articolo 15. Il nostro lavoro e' metterli in fila."),
 (1,"profondo",1.2,"Sopra tutti e sei c'e' una cornice, scritta per prima all'articolo 14: garantire l'equita' e l'universalita' del sistema sanitario, con prestazioni appropriate e uniformi."),

 (2,"chiaro",0,"I sei principi, in ordine. Ambiti ottimali. Territorio. Integrazione. Medicina generale. Innovazione. Partecipazione. Per ognuno vedremo cosa dice e dove sta scritto."),

 (3,"chiaro",0,"Primo principio: gli ambiti ottimali. L'articolo 14 chiede di individuare le dimensioni ottimali delle aziende ULSS, per migliorare qualita' ed efficienza e ridurre i costi."),
 (3,"chiaro",0,"Ottimale non vuol dire il piu' grande possibile. Vuol dire abbastanza grande da avere volumi, competenze e forza negli acquisti, e abbastanza vicino da conoscere il suo territorio."),
 (3,"chiaro",0,"La scelta del Veneto e' in gran parte provinciale. Belluno, Treviso, Padova, Rovigo e Verona hanno ciascuna una sola ULSS, estesa a tutta la provincia."),
 (3,"chiaro",0,"Fanno eccezione due province. Venezia ne ha due, la Serenissima e il Veneto Orientale. Vicenza ne ha due, la Pedemontana e la Berica. In tutto, nove aziende."),
 (3,"chiaro",0,"Ogni azienda ha un nome oltre al numero: Dolomiti, Marca trevigiana, Serenissima, Veneto Orientale, Polesana, Euganea, Pedemontana, Berica, Scaligera. Li vedremo uno per uno nella lezione due punto quattro."),
 (3,"chiaro",0,"Il risultato: una ULSS veneta serve in media circa cinquecentoquarantacinquemila abitanti, contro una media italiana di circa cinquecentoduemila."),
 (3,"tenue",0,"Attenzione: ambiti piu' grandi non vuol dire servizi piu' lontani. La stessa legge chiede alle nuove aziende una rete capillare di sportelli e servizi, per facilitare l'accesso."),

 (4,"chiaro",0,"Secondo principio: il territorio. L'articolo 15 chiede di sviluppare la rete dell'assistenza territoriale, con un approccio multidisciplinare, per garantire la continuita' delle cure."),
 (4,"chiaro",0,"Continuita' delle cure vuol dire che il paziente non ricomincia da capo a ogni passaggio: dall'ospedale a casa, dal medico di famiglia allo specialista, dalla fase acuta alla riabilitazione."),
 (4,"chiaro",0,"Lo strumento chiave sono le strutture intermedie, a meta' strada tra casa e ospedale. La prima e' l'ospedale di comunita': un ricovero breve, a bassa intensita', gestito soprattutto dagli infermieri."),
 (4,"chiaro",0,"E la legge fissa un obiettivo preciso: entro il 31 dicembre 2017, piu' quindici per cento di posti letto negli ospedali di comunita', rispetto alla programmazione di allora."),
 (4,"chiaro",0,"Nello stesso tempo l'ospedale cambia ruolo: l'articolo 15 chiede di rideterminare l'offerta ospedaliera secondo una logica di rete coordinata. La vedremo nella lezione sulla rete hub and spoke."),
 (4,"profondo",1.2,"Il principio del territorio: curare vicino a casa tutto quello che non ha bisogno dell'ospedale."),

 (5,"chiaro",0,"Terzo principio: l'integrazione. L'articolo 15 parla di sostenere il modello socio-sanitario veneto di servizi integrati alla persona."),
 (5,"chiaro",0,"Integrazione ha due significati. Il primo: tra ospedale e territorio, perche' il paziente passi dall'uno all'altro senza buchi. Il secondo: tra sanitario e sociale."),
 (5,"chiaro",0,"La legge elenca le aree dove l'integrazione conta di piu': famiglia, infanzia, adolescenza, giovani, anziani, disabili, dipendenze, salute mentale, sanita' penitenziaria."),
 (5,"chiaro",0,"E la traduce in organizzazione. Il direttore dei servizi sociali e della funzione territoriale cambia nome: diventa direttore dei servizi socio-sanitari. Il nome dice la funzione."),
 (5,"chiaro",0,"In ogni distretto la legge prevede unita' operative dedicate: cure primarie, infanzia adolescenza famiglia e consultori, disabilita' e non autosufficienza, cure palliative, attivita' specialistica."),
 (5,"profondo",1.2,"Il principio dell'integrazione: la persona al centro, e i servizi che si organizzano intorno a lei."),

 (6,"chiaro",0,"Quarto principio: la medicina generale. Il medico di famiglia e' la porta d'ingresso del sistema. Se lavora da solo, il territorio resta debole."),
 (6,"chiaro",0,"La risposta del Veneto e' la medicina di gruppo integrata: piu' medici di famiglia nella stessa sede, con infermieri e personale di segreteria, aperti per gran parte della giornata."),
 (6,"chiaro",0,"La legge 19 fissa le soglie: almeno il sessanta per cento dei medici di famiglia in medicina di gruppo integrata entro il 2017, e almeno l'ottanta per cento entro il 2018."),
 (6,"chiaro",0,"E coinvolge i Comuni: il Comitato dei Sindaci di distretto esprime parere sull'attivazione delle medicine di gruppo integrate, e collabora anche mettendo a disposizione le sedi."),
 (6,"chiaro",0,"La medicina generale entra anche nella prevenzione: l'articolo 15 chiede di integrare i Dipartimenti di Prevenzione, i distretti, i medici di famiglia e i pediatri di libera scelta."),
 (6,"profondo",1.2,"Il principio della medicina generale: il medico di famiglia non da solo, ma dentro una squadra."),

 (7,"chiaro",0,"Quinto principio: l'innovazione. La legge la declina in strumenti concreti, e quasi tutti passano per Azienda Zero."),
 (7,"chiaro",0,"Il primo e' il fascicolo sanitario elettronico: la storia clinica digitale del cittadino. La legge chiede ad Azienda Zero di attivarlo entro un anno, con una tessera sanitaria elettronica per tutti i veneti."),
 (7,"chiaro",0,"E il fascicolo vale anche per il privato: gli enti privati convenzionati hanno l'obbligo di partecipare, anche ai fini dell'accreditamento. Una sola rete regionale collega tutte le aziende."),
 (7,"chiaro",0,"Il secondo e' la valutazione delle tecnologie, la HTA. Nuove apparecchiature e nuovi investimenti passano dal parere di una commissione regionale, la CRITE."),
 (7,"chiaro",0,"Il terzo e' l'innovazione verso il cittadino: il CUP on line, il promemoria automatico delle visite, la disdetta a qualunque ora, il ticket pagato con lo smartphone."),
 (7,"chiaro",0,"E c'e' l'innovazione organizzativa: sistemi informativi unici, flussi di dati omogenei, reti cliniche, e il raccordo tra ricerca, sperimentazione e servizi."),
 (7,"profondo",1.2,"Il principio dell'innovazione: dati e tecnologie comuni, governati una volta sola per tutto il sistema."),

 (8,"chiaro",0,"Sesto principio: la partecipazione. L'articolo 14 chiede un sistema che garantisca la trasparenza organizzativa e la partecipazione dei cittadini."),
 (8,"chiaro",0,"E chiede di riconoscere le prerogative degli enti locali nella programmazione sanitaria e socio-sanitaria. I Comuni non sono spettatori della sanita'."),
 (8,"chiaro",0,"Gli strumenti sono due. In ogni ULSS la Conferenza dei Sindaci. In ogni distretto il Comitato dei Sindaci, che approva il Piano di Zona e il bilancio della parte sociale."),
 (8,"chiaro",0,"C'e' poi un canale di controllo: l'Osservatorio regionale raccoglie le richieste dei Comitati dei Sindaci che rappresentano almeno due terzi della popolazione interessata, nella stessa provincia."),
 (8,"tenue",0,"Un distrattore frequente: il Piano di Zona non lo approva la Regione, e nemmeno il direttore generale. Lo elabora e lo approva il Comitato dei Sindaci del distretto."),
 (8,"profondo",1.2,"Il principio della partecipazione: le scelte sulla salute di un territorio si fanno con chi quel territorio lo amministra."),

 (9,"chiaro",0,"Le tre cose che ti chiederanno. La prima: la cornice dei principi e' l'equita' e l'universalita' del sistema, con prestazioni appropriate e uniformi su tutto il territorio regionale."),
 (9,"chiaro",0,"La seconda: i criteri della riorganizzazione stanno all'articolo 14, le finalita' della riorganizzazione dei servizi all'articolo 15."),
 (9,"chiaro",0,"La terza: le soglie della legge. Ospedali di comunita' piu' quindici per cento entro il 2017. Medicine di gruppo integrate: sessanta per cento entro il 2017, ottanta entro il 2018."),
 (9,"tenue",0,"L'ultimo distrattore: gli ambiti ottimali non coincidono sempre con la provincia. Venezia e Vicenza hanno due ULSS ciascuna."),

 (10,"chiaro",0,"[warm] In sintesi: aziende della giusta misura, territorio forte, servizi integrati, medici in squadra, tecnologie comuni, Comuni coinvolti. Nella prossima lezione, il pezzo piu' nuovo della riforma: Azienda Zero."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Ambiti ottimali', 4: 'Territorio', 5: 'Integrazione', 6: 'Medicina generale', 7: 'Innovazione', 8: 'Partecipazione', 9: 'Le tre cose che ti chiederanno', 10: 'Chiusura'}
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
