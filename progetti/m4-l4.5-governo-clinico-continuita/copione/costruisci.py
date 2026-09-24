# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 4.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M4): il governo clinico (miglioramento continuo di qualita' e sicurezza); i PDTA
# (definizione, contenuti, stesura: gruppo multidisciplinare, CRITE, Azienda Zero, decreto
# dell'Area Sanita' e Sociale); il rischio clinico (due categorie, L. 24/2017, DGRV 1831/2008,
# risk manager, incident reporting, near miss, audit, cultura non colpevolizzante); la
# continuita' assistenziale (COT, transizioni protette, UVMD, dimissione protetta, case manager).
# Fonti: PSSR Veneto 2019-2023 (par. 3.5 e gestione delle transizioni); atto aziendale ULSS 5.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Un paziente con uno scompenso cardiaco entra dal pronto soccorso, passa in reparto, torna a casa, rivede il medico di famiglia. Quattro luoghi, decine di professionisti, un'unica storia di cura."),
 (1,"chiaro",0,"Perche' quella storia vada bene servono tre cose: qualcuno che governi la qualita', un percorso scritto che tutti seguono, e un passaggio sicuro da un luogo all'altro."),
 (1,"profondo",1.2,"Curare bene non basta: bisogna curare bene insieme, e in sicurezza."),

 (2,"chiaro",0,"Quattro passaggi. Il governo clinico. I percorsi diagnostico terapeutici assistenziali, i PDTA. La gestione del rischio clinico. E la continuita' tra ospedale e territorio."),

 (3,"chiaro",0,"Il governo clinico e' un metodo per migliorare in modo continuo la qualita' e la sicurezza dei servizi, e per mantenere standard assistenziali elevati e appropriati."),
 (3,"chiaro",0,"Guarda a due cose insieme: l'efficacia e l'efficienza del percorso assistenziale, e la centralita' del paziente, anche attraverso una buona comunicazione."),
 (3,"chiaro",0,"Il piano socio sanitario del Veneto gli affida alcuni obiettivi: un'assistenza integrata e multidisciplinare, centrata sul paziente, fondata su linee guida e buone pratiche basate sulle prove."),
 (3,"chiaro",0,"E ancora: strumenti organizzativi come il PDTA, politiche di gestione del rischio, e l'audit clinico come ciclo di miglioramento che responsabilizza gli operatori."),
 (3,"chiaro",0,"Chi lo promuove in azienda? Il collegio di direzione, che abbiamo visto nella lezione quattro punto tre: sostiene la direzione nel governo clinico e cura un sistema di audit clinico."),
 (3,"tenue",0,"Occhio a un distrattore: il governo clinico non e' un ufficio e non riguarda solo i medici. E' un metodo che coinvolge tutte le professioni, infermieri e tecnici compresi."),
 (3,"profondo",1.2,"Il governo clinico: migliorare ogni giorno, tutti insieme, misurando i risultati."),

 (4,"chiaro",0,"Il PDTA e' il percorso diagnostico terapeutico assistenziale: il cammino piu' razionale del paziente dentro le reti cliniche, pensato per il miglior esito delle cure."),
 (4,"chiaro",0,"E' uno strumento trasversale: collega ruoli e funzioni della rete e garantisce continuita' nell'assistenza. Rende le azioni riproducibili e le prestazioni uniformi."),
 (4,"chiaro",0,"Per questo e' anche uno strumento di controllo dell'appropriatezza, e di tutela del professionista: chi segue un percorso condiviso lavora su basi solide."),
 (4,"chiaro",0,"Per una specifica patologia, il PDTA definisce gli interventi piu' appropriati per diagnosi, terapia e assistenza, e in quali nodi della rete possono essere erogati."),
 (4,"chiaro",0,"Definisce anche i tempi entro cui erogarli, il coinvolgimento dei professionisti in ogni fase, e i risultati e gli esiti da verificare."),
 (4,"chiaro",0,"Come si scrive un PDTA regionale? Lo stende un gruppo multidisciplinare, di solito coordinato dal responsabile della rete clinica, partendo da buone pratiche, linee guida e letteratura."),
 (4,"chiaro",0,"E' accompagnato da una relazione sulla sostenibilita' economica, valutata dalla commissione regionale CRITE. Il supporto tecnico ai gruppi di lavoro lo fornisce Azienda Zero."),
 (4,"chiaro",0,"Alla fine il PDTA e' adottato con decreto del direttore dell'Area Sanita' e Sociale della Regione. Le aziende poi lo declinano nei propri percorsi interni."),
 (4,"chiaro",0,"Un esempio: nel percorso dello scompenso cardiaco e' scritto quando il paziente passa dallo specialista al medico di famiglia, e quali controlli si fanno a domicilio e con quale frequenza."),
 (4,"tenue",0,"Attenzione a non confondere: il PDTA non e' una linea guida. La linea guida dice che cosa e' efficace; il PDTA dice chi fa che cosa, dove e quando, in quella rete."),
 (4,"profondo",1.2,"Un percorso scritto insieme: chi fa che cosa, dove, entro quando."),

 (5,"chiaro",0,"Ogni attivita' sanitaria comporta dei rischi. Un evento avverso puo' nascere da una condotta professionale, ma anche dall'organizzazione, dalla gestione, dalle risorse."),
 (5,"chiaro",0,"Il piano regionale distingue due gruppi di rischio: quelli clinico professionali, legati alle attivita' dei singoli professionisti, e quelli legati alla gestione aziendale."),
 (5,"chiaro",0,"La legge 24 del 2017, sulla sicurezza delle cure, ha rafforzato questo impianto. Nel Veneto opera un centro regionale per la gestione del rischio sanitario e la sicurezza del paziente."),
 (5,"chiaro",0,"In azienda il modello e' quello della delibera regionale 1831 del 2008. Il perno e' il responsabile aziendale della gestione del rischio clinico, il risk manager."),
 (5,"chiaro",0,"Lo nomina il direttore generale, su proposta del direttore sanitario, a cui risponde. Coordina i referenti dipartimentali per la sicurezza del paziente e presiede un comitato esecutivo."),
 (5,"chiaro",0,"Lo strumento di base e' la segnalazione: la scheda di incident reporting, che puo' essere anche anonima, e che raccoglie gli eventi avversi e i quasi eventi, i near miss."),
 (5,"chiaro",0,"Da una segnalazione puo' partire un audit: il gruppo ricostruisce che cosa e' successo, cerca le cause nel processo e decide che cosa cambiare. Poi verifica che il cambiamento funzioni."),
 (5,"chiaro",0,"Tutto questo regge solo con una cultura della non colpevolizzazione: si impara dagli errori, invece di nasconderli. Il piano chiede di formare tutto il personale su questo."),
 (5,"chiaro",0,"Le segnalazioni arrivano anche dai cittadini, con reclami e osservazioni all'ufficio relazioni con il pubblico: il piano chiede di formare anche quegli operatori sulla sicurezza del paziente."),
 (5,"tenue",0,"Un distrattore frequente: segnalare un evento non significa accusare un collega o autodenunciarsi. La segnalazione serve a correggere il processo, non a cercare un colpevole."),
 (5,"profondo",1.2,"Segnalare, analizzare, correggere: l'errore diventa un'occasione per imparare."),

 (6,"chiaro",0,"Il punto piu' fragile del percorso e' il passaggio: dall'ospedale a casa, da un reparto a una struttura intermedia, dal territorio all'ospedale. Qui entra la continuita' assistenziale."),
 (6,"chiaro",0,"Il piano veneto affida questo compito alla centrale operativa territoriale, la COT, che svolge la funzione di centrale della continuita' e coordina in modo unitario il percorso di cura."),
 (6,"chiaro",0,"La COT mappa le risorse della rete, coordina le transizioni protette dentro e fuori l'azienda, raccoglie i bisogni sociali e sanitari e ne garantisce la tracciabilita'."),
 (6,"chiaro",0,"Per i pazienti piu' complessi il percorso si definisce con la valutazione multidimensionale: l'unita' valutativa multidimensionale, la UVMD, pianifica l'assistenza."),
 (6,"chiaro",0,"La Regione prevede anche un piano di cura condiviso con il paziente, parte del fascicolo sanitario elettronico, consultabile da tutti i professionisti della filiera."),
 (6,"chiaro",0,"In ospedale questo prende la forma della dimissione protetta: il paziente non esce da solo, ma con un percorso gia' organizzato e una figura di riferimento, il case manager."),
 (6,"chiaro",0,"Qui il comparto e' protagonista: infermieri, assistenti sociali, fisioterapisti costruiscono ogni giorno le transizioni, spesso proprio con incarichi di funzione dedicati."),
 (6,"chiaro",0,"E il cerchio si chiude: le criticita' che la COT osserva servono a rivedere PDTA e procedure aziendali. Governo clinico, percorsi, rischio e continuita' lavorano insieme."),
 (6,"profondo",1.2,"Nessun paziente deve cadere nel vuoto tra un luogo di cura e l'altro."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: il governo clinico e' un metodo di miglioramento continuo di qualita' e sicurezza, con strumenti come PDTA e audit clinico."),
 (7,"chiaro",0,"La seconda: il PDTA definisce interventi, luoghi, tempi, professionisti ed esiti per una patologia; e' scritto da un gruppo multidisciplinare e adottato con decreto regionale."),
 (7,"chiaro",0,"La terza: il risk manager, nominato dal direttore generale su proposta del direttore sanitario, governa segnalazioni e audit. La COT e' la centrale della continuita'."),
 (7,"tenue",0,"L'ultimo distrattore: la COT non e' la centrale del 118. Non gestisce le emergenze, ma coordina i passaggi protetti del paziente tra i diversi luoghi di cura."),

 (8,"profondo",0,"[warm] In sintesi: governare la qualita', scrivere i percorsi, imparare dagli errori, accompagnare i passaggi. Con questa lezione si chiude il modulo sull'organizzazione aziendale."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il governo clinico', 4: 'I percorsi: i PDTA', 5: 'Il rischio clinico', 6: "La continuita' assistenziale", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
