# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 4.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M4): l'Azienda Ospedale-Universita' Padova e le tre missioni — assistenza,
# didattica, ricerca; il modello dell'azienda ospedaliero-universitaria (D.Lgs. 517/1999:
# organi, organo di indirizzo, dipartimenti ad attivita' integrata); il protocollo d'intesa
# Regione-Universita'; l'AOUPD dal 2019 (nuova denominazione, atto aziendale, hub di
# eccellenza nel PSSR 2019-2023, posti letto, dipartimenti). Fonti: dispensa CISL FP
# (Galiazzo), sintesi di ricerca su D.Lgs. 517/1999 e sul sito dell'Azienda. Da verificare i numeri.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Mattina, un reparto di Padova. L'infermiere fa il giro letti. Accanto a lui c'e' uno studente del corso di laurea. In fondo al corridoio un medico raccoglie i dati per uno studio clinico."),
 (1,"chiaro",0,"Tre persone, tre lavori diversi, nello stesso reparto e nello stesso momento. E' la normalita' di un'azienda ospedaliero-universitaria. E per chi lavora a Padova, e' la propria azienda."),
 (1,"profondo",1.2,"Curare, insegnare, scoprire: nello stesso luogo."),

 (2,"chiaro",0,"Quattro passaggi. Le tre missioni. Il modello dell'azienda ospedaliero-universitaria e i suoi organi. L'Azienda Ospedale Universita' di Padova. E che cosa cambia per chi ci lavora."),

 (3,"chiaro",0,"Un'azienda ospedaliera comune ha una missione: l'assistenza. Un'azienda ospedaliero-universitaria ne ha tre, legate fra loro: assistenza, didattica e ricerca."),
 (3,"chiaro",0,"L'assistenza e' la cura dei pazienti: ricoveri, interventi, ambulatori, emergenza. E' la missione che la unisce a tutto il servizio sanitario regionale."),
 (3,"chiaro",0,"La didattica e' la formazione: studenti di medicina, specializzandi, e i corsi di laurea delle professioni sanitarie, come infermieristica, fisioterapia, tecniche di laboratorio."),
 (3,"chiaro",0,"La ricerca e' la produzione di conoscenza: studi clinici, ricerca biomedica e traslazionale, cioe' il passaggio dalle scoperte di laboratorio al letto del paziente."),
 (3,"chiaro",0,"Un esempio: un nuovo protocollo per lo scompenso cardiaco nasce da uno studio, entra nella pratica del reparto e viene insegnato agli studenti. Lo stesso sapere attraversa tutte e tre le missioni."),
 (3,"chiaro",0,"Le tre missioni si alimentano a vicenda. La ricerca migliora le cure. Le cure sono il luogo dove si impara. E chi impara oggi, domani cura e fa ricerca."),
 (3,"chiaro",0,"Per questo l'integrazione non e' una formula. Senza assistenza la didattica sarebbe teoria; senza ricerca l'assistenza resterebbe ferma; senza didattica nessuno prenderebbe il testimone."),
 (3,"profondo",1.2,"Tre missioni, un solo ospedale: e' questo che rende Padova diversa."),

 (4,"chiaro",0,"Il modello nasce dal decreto legislativo 517 del 1999, che disciplina i rapporti fra il servizio sanitario nazionale e le universita'. Supera i modelli diversi che esistevano prima."),
 (4,"chiaro",0,"Le regole del rapporto sono fissate in un protocollo d'intesa fra la Regione e l'Universita'. Dice come la scuola di medicina contribuisce all'assistenza e come si organizza la collaborazione."),
 (4,"chiaro",0,"Il protocollo non e' un documento fatto una volta per sempre: si rinnova nel tempo, e da esso discendono gli atti attuativi che Regione e Universita' firmano insieme."),
 (4,"chiaro",0,"Gli organi dell'azienda ospedaliero-universitaria sono tre: il direttore generale, il collegio sindacale e l'organo di indirizzo."),
 (4,"chiaro",0,"Il direttore generale e' nominato dalla Regione d'intesa con il Rettore dell'Universita'. E' il segno piu' visibile del governo condiviso."),
 (4,"chiaro",0,"L'organo di indirizzo e' tipico di questo modello. Propone iniziative per tenere coerente la programmazione dell'assistenza con quella della didattica e della ricerca."),
 (4,"chiaro",0,"E ne verifica l'attuazione. Ha al massimo cinque componenti, e la sua composizione e' fissata dal protocollo d'intesa. Ne fa parte il vertice della scuola di medicina."),
 (4,"chiaro",0,"Il luogo dove l'integrazione si fa davvero sono i dipartimenti ad attivita' integrata, detti DAI. Li' assistenza, didattica e ricerca convivono nelle stesse unita' operative."),
 (4,"chiaro",0,"Nei DAI lavorano insieme professionisti del servizio sanitario e personale universitario che svolge anche attivita' assistenziale. Stesso reparto, rapporti di lavoro diversi."),
 (4,"tenue",0,"Attenzione a un distrattore: nell'azienda ospedaliero-universitaria il direttore generale non lo sceglie l'Universita' da sola, e nemmeno la Regione da sola. Serve l'intesa con il Rettore."),
 (4,"tenue",0,"E ancora: l'organo di indirizzo non gestisce l'azienda. Indirizza e verifica la coerenza fra le missioni. La gestione resta al direttore generale."),
 (4,"profondo",1.2,"Due istituzioni, un governo condiviso: Regione e Universita' insieme."),

 (5,"chiaro",0,"Veniamo a Padova. Fino al 2019 era l'Azienda Ospedaliera di Padova, gia' legata all'Universita'. Nel 2019 un nuovo accordo con l'Ateneo ne cambia e ne allarga la natura."),
 (5,"chiaro",0,"Nasce cosi' la denominazione Azienda Ospedale Universita' Padova. Il nome dice la sostanza: un'unica azienda dove l'ospedale e l'universita' lavorano insieme."),
 (5,"chiaro",0,"Nello stesso anno l'Azienda adotta in via definitiva il proprio atto aziendale, con la delibera 539 del 16 maggio 2019. E' il documento che ne fissa l'organizzazione."),
 (5,"chiaro",0,"Il piano socio-sanitario regionale 2019-2023 la individua come hub di eccellenza regionale. E' il vertice della rete ospedaliera veneta che abbiamo visto nel modulo due."),
 (5,"chiaro",0,"Qualche numero, dal sito dell'Azienda. I posti letto previsti dalla programmazione regionale sono millesettecentoquaranta: una delle strutture ospedaliere piu' grandi d'Italia."),
 (5,"chiaro",0,"L'area ospedaliera e' organizzata in dieci dipartimenti: nove strutturali e uno funzionale. A questi si aggiunge un dipartimento amministrativo."),
 (5,"chiaro",0,"La funzione di hub vuol dire casi complessi da tutto il Veneto e oltre: trapianti, alta specialita', emergenza di secondo livello. E, insieme, la formazione di migliaia di studenti."),
 (5,"chiaro",0,"Essere hub vuol dire anche responsabilita' verso gli altri ospedali: consulenze, trasferimenti, reti cliniche che collegano Padova agli ospedali spoke del territorio."),
 (5,"tenue",0,"Occhio: Padova e Verona sono le due aziende ospedaliere universitarie del Veneto. Non sono ULSS: non hanno distretti e non coprono la popolazione di un territorio."),
 (5,"profondo",1.2,"Un hub di eccellenza che cura, forma e fa ricerca."),

 (6,"chiaro",0,"Che cosa cambia per chi lavora nel comparto? Prima di tutto la didattica entra nel lavoro quotidiano: gli studenti delle professioni sanitarie fanno tirocinio nei reparti."),
 (6,"chiaro",0,"Chi li segue in reparto svolge una funzione di tutoraggio: insegna sul campo, valuta, accompagna. E' un pezzo di lavoro che in un ospedale non universitario pesa molto meno."),
 (6,"chiaro",0,"Secondo la dispensa, nelle aziende integrate la titolarita' dei corsi puo' essere affidata ai dirigenti delle strutture dove si svolge la formazione, cioe' in sede ospedaliera."),
 (6,"chiaro",0,"Poi la ricerca: studi clinici, protocolli sperimentali, raccolta dei dati. Anche l'infermiere, il tecnico, l'ostetrica ne fanno parte, con procedure precise."),
 (6,"chiaro",0,"E il lavoro in equipe con personale universitario. Nello stesso reparto possono esserci dipendenti dell'Azienda e docenti dell'Universita' che fanno assistenza. Regole diverse, obiettivi comuni."),
 (6,"chiaro",0,"Infine la complessita'. Un hub riceve i casi piu' difficili: tecnologie avanzate, percorsi di alta specialita', ritmi intensi. Servono competenze aggiornate e un'organizzazione solida."),
 (6,"chiaro",0,"C'e' poi la formazione continua: aggiornamento obbligatorio, corsi interni, crediti ECM. In un'azienda universitaria le occasioni sono molte, e contano anche per la crescita professionale."),
 (6,"chiaro",0,"E' per questo che, nel resto del modulo, guarderemo all'atto aziendale, ai dipartimenti e al governo clinico con gli occhi di chi lavora in un'azienda ospedaliero-universitaria."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: le tre missioni dell'azienda ospedaliero-universitaria sono assistenza, didattica e ricerca, integrate fra loro."),
 (7,"chiaro",0,"La seconda: gli organi, secondo il decreto 517 del 1999, sono il direttore generale, nominato d'intesa con il Rettore, il collegio sindacale e l'organo di indirizzo."),
 (7,"chiaro",0,"La terza: l'integrazione si realizza nei dipartimenti ad attivita' integrata. E le regole del rapporto fra Regione e Universita' stanno nel protocollo d'intesa."),
 (7,"tenue",0,"L'ultimo distrattore: l'organo di indirizzo non e' un organo di controllo contabile. Quello e' il collegio sindacale. L'organo di indirizzo tiene coerenti le missioni."),

 (8,"profondo",0,"[warm] In sintesi: un'azienda con tre missioni e due istituzioni che la governano insieme. Nella prossima lezione: l'atto aziendale e la direzione strategica."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Tre missioni', 4: 'Il modello ospedaliero-universitario', 5: "L'Azienda di Padova", 6: 'Che cosa cambia per chi ci lavora', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
