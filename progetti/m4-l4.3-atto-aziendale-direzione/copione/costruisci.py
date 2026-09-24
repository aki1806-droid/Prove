# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 4.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M4): l'atto aziendale come «costituzione» dell'azienda (atto di diritto privato,
# delibera del DG, approvazione regionale, DGR Veneto 1306/2017); la direzione strategica:
# direttore generale (D.Lgs. 171/2016: elenco nazionale, requisiti, nomina, durata,
# verifica a 24 mesi, incompatibilita'), direttore sanitario, amministrativo, dei servizi
# sociali; collegio di direzione; collegio sindacale (composizione, funzioni, riunioni).
# Fonti: dispensa CISL FP «Diritto sanitario parte prima» (Galiazzo); atto aziendale ULSS 5.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Uno Stato ha una costituzione: dice chi decide, come e con quali limiti. Un'azienda sanitaria ha qualcosa di simile. Si chiama atto aziendale, ed e' il primo documento da conoscere."),
 (1,"chiaro",0,"Accanto all'atto aziendale c'e' chi lo scrive e lo applica: la direzione strategica. E ci sono i collegi che la affiancano e la controllano."),
 (1,"profondo",1.2,"Prima le regole del gioco. Poi chi le fa rispettare."),

 (2,"chiaro",0,"Quattro passaggi. L'atto aziendale. Il direttore generale, come si sceglie e come si valuta. I direttori che lo affiancano. E i due collegi: di direzione e sindacale."),

 (3,"chiaro",0,"L'atto aziendale e' il documento con cui l'azienda definisce la propria organizzazione e il proprio funzionamento. E' lo strumento dell'autonomia organizzativa che abbiamo visto nella lezione quattro punto uno."),
 (3,"chiaro",0,"Ha una natura particolare: e' un atto di diritto privato. Lo adotta il direttore generale con una propria delibera, seguendo i criteri fissati dalla Regione."),
 (3,"chiaro",0,"Poi la Regione lo deve approvare. Senza l'approvazione regionale l'atto aziendale non diventa efficace. E' il punto di equilibrio fra autonomia dell'azienda e governo regionale."),
 (3,"chiaro",0,"Nel Veneto i criteri stanno nella delibera della Giunta 1306 del 2017: le linee guida per il nuovo atto aziendale, dopo la riforma della legge 19 del 2016."),
 (3,"chiaro",0,"Le stesse linee guida regolano anche l'organizzazione del distretto, del dipartimento di prevenzione e del dipartimento di salute mentale, e le strutture dell'area non ospedaliera."),
 (3,"chiaro",0,"Che cosa dice un atto aziendale? Disciplina l'attribuzione di compiti, obiettivi e decisioni ai direttori, ai dipartimenti, ai distretti e ai dirigenti responsabili di struttura."),
 (3,"chiaro",0,"In particolare, dice chi puo' prendere le decisioni che impegnano l'azienda verso l'esterno. E' la mappa delle responsabilita': chi firma, chi risponde, di che cosa."),
 (3,"chiaro",0,"Dentro ci sono l'organigramma, i dipartimenti, le unita' operative complesse e semplici, gli staff della direzione. Tutta l'architettura che vedremo nella prossima lezione."),
 (3,"chiaro",0,"Per l'Azienda Ospedale Universita' di Padova, l'atto aziendale e' stato adottato in via definitiva con la delibera 539 del 16 maggio 2019."),
 (3,"tenue",0,"Occhio a un distrattore: l'atto aziendale non e' una legge e non lo scrive la Regione. Lo adotta il direttore generale; la Regione fissa i criteri e lo approva."),
 (3,"profondo",1.2,"La costituzione dell'azienda: scritta dal direttore generale, approvata dalla Regione."),

 (4,"chiaro",0,"Al vertice c'e' il direttore generale. Le regole per sceglierlo le ha riscritte il decreto legislativo 171 del 2016, sulla dirigenza sanitaria."),
 (4,"chiaro",0,"Presso il ministero della Salute c'e' un elenco nazionale dei soggetti idonei alla nomina, aggiornato ogni due anni. Una commissione di cinque membri ne valuta i requisiti."),
 (4,"chiaro",0,"I requisiti sono tre: la laurea, un'esperienza dirigenziale di almeno cinque anni in sanita' o sette in altri settori, e l'attestato di un corso di formazione in gestione sanitaria."),
 (4,"chiaro",0.3,"La nomina spetta alla Regione, con decreto del suo Presidente, che sceglie fra gli iscritti all'elenco nazionale. Non puo' essere scelto chi ha gia' avuto due mandati consecutivi."),
 (4,"chiaro",0,"Il direttore generale resta in carica da tre a cinque anni. Il suo contratto e' di diritto privato, e all'atto della nomina la Regione gli assegna obiettivi e risorse."),
 (4,"chiaro",0,"Entro ventiquattro mesi dalla nomina c'e' la verifica. La Regione sente la Conferenza dei sindaci, o il consiglio dei sanitari per le aziende ospedaliere. Se la valutazione e' negativa, il direttore decade."),
 (4,"chiaro",0,"Ci sono poi le incompatibilita': per esempio condanne per reati contro la pubblica amministrazione, o una candidatura alle elezioni nei cinque anni precedenti."),
 (4,"chiaro",0,"Nelle aziende ospedaliero-universitarie, come abbiamo visto, la nomina richiede anche l'intesa con il Rettore dell'Universita'."),
 (4,"profondo",1.2,"Scelto da un elenco nazionale, nominato dalla Regione, valutato sui risultati."),

 (5,"chiaro",0,"Il direttore generale non governa da solo. Nomina i suoi piu' stretti collaboratori, scegliendoli da elenchi regionali formati con avviso pubblico. Durano in carica da tre a cinque anni."),
 (5,"chiaro",0,"Il direttore sanitario e' un medico, con meno di sessantacinque anni e almeno cinque anni di direzione di strutture sanitarie. Dirige i servizi sanitari e da' pareri al direttore generale."),
 (5,"chiaro",0,"Il direttore amministrativo ha una laurea in discipline economiche o giuridiche, meno di sessantacinque anni, e almeno cinque anni di direzione in strutture di media o grande dimensione."),
 (5,"chiaro",0,"Nelle ULSS c'e' anche il direttore dei servizi sociali, nominato sentita la Conferenza dei sindaci, con esperienza di direzione in enti o strutture sociali."),
 (5,"chiaro",0,"Tutti hanno un contratto di diritto privato. E i loro pareri sulle materie di competenza sono obbligatori: il direttore generale deve chiederli prima di decidere."),
 (5,"tenue",0,"Un distrattore frequente: il direttore sanitario e quello amministrativo non sono organi dell'azienda. Sono figure che coadiuvano il direttore generale, che resta l'organo di vertice."),

 (6,"chiaro",0,"Veniamo ai due collegi. Il collegio di direzione e' nominato dal direttore generale e dura in carica da tre a cinque anni."),
 (6,"chiaro",0,"Ne fanno parte la direzione strategica, i direttori di dipartimento, delle funzioni ospedaliera e territoriale, delle professioni sanitarie e della farmacia, e i rappresentanti di medici di famiglia e pediatri."),
 (6,"chiaro",0,"Concorre al governo delle attivita' cliniche e partecipa alla pianificazione, compresa la ricerca e la formazione. Propone anche soluzioni organizzative per la libera professione. Si riunisce almeno ogni due mesi."),
 (6,"chiaro",0,"Il collegio sindacale e' invece l'organo di controllo interno. Ha tre componenti: uno designato dal Presidente della Regione, uno dal ministero dell'Economia e uno dal ministero della Salute."),
 (6,"chiaro",0,"Devono essere iscritti nel registro dei revisori o essere funzionari del ministero dell'Economia. Il direttore generale li nomina e convoca la prima seduta, dove il collegio elegge il proprio presidente."),
 (6,"chiaro",0,"Dura in carica tre anni e si riunisce ogni mese. Deve essere indipendente, e un componente decade se manca a due riunioni senza un giustificato motivo."),
 (6,"chiaro",0,"Che cosa fa? Verifica l'amministrazione sotto il profilo economico e l'osservanza della legge, accerta la regolare tenuta della contabilita', fa verifiche periodiche di cassa e di magazzino."),
 (6,"chiaro",0,"E riferisce alla Regione ogni tre mesi, o subito se sospetta gravi irregolarita'. Ogni seduta ha un verbale, raccolto nel libro delle adunanze."),
 (6,"chiaro",0,"Nei controlli usa il campionamento: non guarda tutto, ma sceglie in modo motivato gli atti che rappresentano i fenomeni piu' rilevanti della gestione."),
 (6,"profondo",1.2,"Un collegio che aiuta a governare, un collegio che controlla i conti."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: l'atto aziendale e' un atto di diritto privato, adottato dal direttore generale sui criteri regionali e approvato dalla Regione. Nel Veneto, la delibera 1306 del 2017."),
 (7,"chiaro",0,"La seconda: il direttore generale e' scelto dall'elenco nazionale del decreto 171 del 2016, nominato dalla Regione, dura da tre a cinque anni ed e' verificato entro ventiquattro mesi."),
 (7,"chiaro",0,"La terza: il collegio di direzione si riunisce almeno ogni due mesi e concorre al governo clinico. Il collegio sindacale ha tre componenti, si riunisce ogni mese e riferisce alla Regione ogni tre mesi."),
 (7,"tenue",0,"L'ultimo distrattore: il collegio sindacale non lo nomina il ministero. I componenti sono designati da Regione e ministeri, ma il provvedimento di nomina e' del direttore generale."),

 (8,"profondo",0,"[warm] In sintesi: un atto che organizza, un direttore che risponde dei risultati, due collegi che affiancano e controllano. Nella prossima lezione: dipartimenti e unita' operative."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "L'atto aziendale", 4: 'Il direttore generale', 5: 'I direttori che lo affiancano', 6: 'I due collegi', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
