# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 1.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M1): Regioni - programmazione, indirizzo, controllo;
# Aziende - gestione ed erogazione; separazione acquisto/erogazione; i DRG.
# Sigla DRG nel parlato: «di erre gi» (STANDARD §4), mai la sigla.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Chi decide quanti posti letto servono in una provincia? E chi decide quale infermiere mettere di turno stanotte in un reparto? Prima del 1992 la risposta, spesso, era la stessa: la politica."),
 (1,"chiaro",0,"Il decreto 502 separa queste due domande. La prima spetta alla Regione. La seconda all'azienda. E' il secondo principio della riforma: la distinzione tra indirizzo e gestione."),
 (1,"profondo",1.2,"E su questa distinzione il decreto costruisce qualcosa di nuovo per la sanita' italiana: un mercato, ma non un mercato vero. Si chiama quasi-mercato."),

 (2,"chiaro",0,"Tre passaggi. Che cosa fa la Regione e che cosa fa l'azienda. Come funziona la separazione tra chi acquista e chi eroga. E come si paga un ricovero: i di erre gi."),

 (3,"chiaro",0,"Con il decreto 502 la Regione diventa il vero centro del sistema sanitario. Le spettano tre funzioni: la programmazione, l'indirizzo e il controllo."),
 (3,"chiaro",0,"Programmare vuol dire decidere di che cosa ha bisogno la popolazione e come organizzare la rete dei servizi. Lo strumento e' il piano sanitario regionale."),
 (3,"chiaro",0,"Pensa al piano come a una mappa: dice dove servono gli ospedali, quanti posti letto, quali servizi sul territorio. Le aziende si muovono dentro quella mappa."),
 (3,"chiaro",0,"Indirizzare vuol dire fissare gli obiettivi delle aziende e le regole con cui vengono finanziate. Controllare vuol dire verificare i risultati, compresi quelli del direttore generale nominato dalla Regione."),
 (3,"chiaro",0,"E la Regione diventa responsabile dei conti. Se le aziende chiudono in disavanzo, la Regione deve coprirlo con risorse proprie: lo prevede l'articolo 13 del decreto 502."),
 (3,"profondo",1.2,"E' la conseguenza diretta della riforma: chi programma la spesa ne risponde. Il ripiano a pie' di lista da parte dello Stato non e' piu' la regola."),

 (4,"chiaro",0,"All'azienda spetta tutto il resto: la gestione e l'erogazione. Organizzare i servizi, assumere e gestire il personale, acquistare beni, produrre prestazioni."),
 (4,"chiaro",0,"Il direttore generale, con l'atto aziendale, organizza l'azienda in dipartimenti, distretti e presidi. E' la traduzione operativa degli obiettivi fissati dalla Regione."),
 (4,"chiaro",0,"In questa gestione la politica non entra. Il direttore generale risponde degli obiettivi, ma su come raggiungerli decide lui, con gli strumenti di un'impresa."),
 (4,"chiaro",0,"E' lo stesso principio che, negli stessi mesi, arriva in tutte le amministrazioni con il decreto legislativo 29 del 1993, figlio della stessa legge delega 421. Lo ritroverai nel modulo otto."),
 (4,"chiaro",1.2,"In una frase: la Regione decide che cosa fare e con quali risorse. L'azienda decide come farlo. E ne risponde."),
 (4,"tenue",0,"Attenzione al distrattore: nei quiz la gestione del personale o degli acquisti viene attribuita alla Regione. E' sbagliato. La gestione e' dell'azienda; alla Regione restano programmazione, indirizzo e controllo."),

 (5,"chiaro",0,"Ora il passo piu' innovativo. Nel vecchio sistema la stessa unita' sanitaria locale decideva i servizi, li produceva e li pagava con la spesa storica. Nessuno confrontava costi e risultati."),
 (5,"chiaro",0,"Il decreto separa due ruoli. Da una parte chi acquista le prestazioni per conto dei cittadini. Dall'altra chi le produce, cioe' chi le eroga."),
 (5,"chiaro",0,"L'acquirente e' l'azienda sanitaria locale: tutela la salute dei residenti e compra per loro le prestazioni di cui hanno bisogno."),
 (5,"chiaro",0,"Gli erogatori sono le aziende ospedaliere, gli ospedali della stessa azienda sanitaria locale e le strutture private accreditate. Ricevono un pagamento per ogni prestazione erogata."),
 (5,"chiaro",0,"Un esempio. Un cittadino si fa operare all'anca nell'azienda ospedaliera del capoluogo. L'azienda sanitaria locale in cui risiede paga quell'intervento all'azienda ospedaliera."),
 (5,"chiaro",0,"E se va a operarsi in un'altra Regione? Paga comunque la sua Regione di residenza. E' la mobilita' sanitaria, che le Regioni compensano tra loro."),
 (5,"chiaro",0,"E' il modello che gli studiosi chiamano quasi-mercato, o competizione amministrata. L'idea arriva dal Regno Unito, dove all'inizio degli anni Novanta il servizio sanitario separa acquirenti e fornitori."),
 (5,"chiaro",0,"Perche' quasi? Perche' manca il prezzo libero e manca il consumatore che paga. Le tariffe le fissa il sistema pubblico, e le prestazioni le paga il servizio sanitario, non il paziente."),
 (5,"chiaro",0,"Il vantaggio atteso e' la concorrenza: se i soldi seguono il paziente, gli erogatori sono spinti a migliorare qualita' ed efficienza per attirarlo."),
 (5,"chiaro",0,"Ma nella pratica italiana il quasi-mercato resta incompleto. Molte aziende sanitarie locali mantengono i propri ospedali, e acquirente e produttore finiscono spesso per coincidere."),

 (6,"chiaro",0,"Resta la domanda: come si paga un ricovero? Pagare i giorni di degenza premia chi tiene i pazienti a letto piu' a lungo. Pagare a pie' di lista non premia nessuno."),
 (6,"chiaro",0,"La risposta sono i di erre gi: Diagnosis Related Groups, raggruppamenti omogenei di diagnosi. Nascono negli Stati Uniti, all'universita' di Yale, e il programma Medicare li adotta nel 1983."),
 (6,"chiaro",0,"In Italia arrivano a meta' degli anni Novanta: le tariffe nazionali per i ricoveri sono fissate nel 1994, e dal 1995 i di erre gi diventano il modo di pagare gli ospedali."),
 (6,"chiaro",0,"Come funzionano. Ogni ricovero viene classificato in un gruppo in base alla diagnosi principale, agli interventi eseguiti, all'eta' e alle complicanze. I dati vengono dalla scheda di dimissione ospedaliera."),
 (6,"chiaro",0,"Ogni gruppo ha una tariffa fissa, onnicomprensiva. L'ospedale riceve quella cifra per quel ricovero, che il paziente resti tre giorni o sette."),
 (6,"chiaro",0,"Due ospedali ricoverano due pazienti con la stessa diagnosi e lo stesso intervento. Il primo li dimette in quattro giorni, il secondo in otto. Ricevono la stessa tariffa."),
 (6,"chiaro",0,"Ecco l'incentivo: chi cura bene e in meno tempo guadagna margine, chi spreca giornate di degenza lo perde. Il pagamento smette di premiare la durata e comincia a premiare l'efficienza."),
 (6,"tenue",0,"Ma ogni incentivo ha i suoi rischi. Dimissioni troppo precoci. Selezione dei pazienti meno costosi. E codifiche gonfiate, per spostare un ricovero in un gruppo che rende di piu'."),
 (6,"chiaro",0,"Per questo al pagamento si affiancano i controlli: sulla qualita' delle cartelle cliniche, sull'appropriatezza dei ricoveri, sulla corrispondenza tra codifica e diagnosi."),
 (6,"chiaro",0,"Anche le prestazioni ambulatoriali hanno la loro tariffa, fissata in un nomenclatore. La logica e' la stessa: si paga la prestazione, non il costo sostenuto per produrla."),
 (6,"profondo",1.2,"Il principio da tenere e' questo: con i di erre gi si paga il prodotto, non la spesa. Ed e' esattamente il contrario del ripiano a pie' di lista."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: alla Regione spettano programmazione, indirizzo e controllo. All'azienda spettano la gestione e l'erogazione dei servizi."),
 (7,"chiaro",0,"La seconda: il quasi-mercato si fonda sulla separazione tra acquirente ed erogatore. L'azienda sanitaria locale acquista per i residenti; aziende ospedaliere e privati accreditati erogano, pagati a prestazione."),
 (7,"tenue",0,"E qui il distrattore: quasi-mercato non vuol dire privatizzazione. Per il cittadino le prestazioni restano gratuite o soggette al ticket, e la programmazione resta pubblica."),
 (7,"chiaro",0,"La terza: i di erre gi classificano i ricoveri in gruppi omogenei per diagnosi e interventi. A ogni gruppo corrisponde una tariffa fissa, indipendente dai giorni di degenza."),
 (7,"tenue",0,"L'ultimo distrattore: la tariffa non rimborsa il costo effettivo del singolo ricovero. E' una cifra prefissata per gruppo, ed e' proprio questo che crea l'incentivo all'efficienza."),

 (8,"profondo",0,"[warm] In sintesi: la Regione governa, l'azienda gestisce, e i soldi seguono le prestazioni. Nella prossima lezione vediamo chi puo' erogarle: autorizzazione, accreditamento e libera scelta."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'La Regione', 4: "L'azienda", 5: 'Il quasi-mercato', 6: 'I DRG', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
