# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 1.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (STRUTTURA, M1): autorizzazione, accreditamento istituzionale, accordi
# contrattuali; il privato accreditato; la scelta del cittadino.
# Riferimento normativo: artt. 8-bis/8-quinquies del D.Lgs. 502/1992, inseriti
# dal D.Lgs. 229/1999; requisiti minimi dal DPR 14 gennaio 1997.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Un cittadino ha bisogno di una risonanza magnetica. Puo' farla in un ospedale pubblico o in una clinica privata, e in entrambi i casi paga solo il ticket. Come e' possibile?"),
 (1,"chiaro",0,"La risposta sta in tre parole che iniziano con la stessa lettera: autorizzazione, accreditamento, accordi contrattuali. Il sistema delle tre A e' la porta d'ingresso del privato nel Servizio Sanitario Nazionale."),
 (1,"profondo",1.2,"Ed e' un sistema a filtri successivi: ogni A e' un gradino piu' stretto del precedente. Chi confonde i gradini, nei quiz, sbaglia."),

 (2,"chiaro",0,"Tre passaggi. La storia, dal 1992 al 1999. Le tre A, una per una. E la liberta' di scelta del cittadino, con i suoi confini."),

 (3,"chiaro",0,"Il decreto 502 del 1992 introduce l'accreditamento e la liberta' di scelta. L'idea e' coerente con il quasi-mercato: strutture pubbliche e private accreditate sullo stesso piano."),
 (3,"chiaro",0,"Nei primi anni pero' l'accreditamento resta largo, e le strutture gia' convenzionate entrano nel sistema in via provvisoria. La spesa per il privato cresce senza una vera programmazione."),
 (3,"chiaro",0,"Il motivo e' semplice: in un sistema pagato a prestazione, un'offerta senza limiti genera domanda. Piu' strutture accreditate vuol dire piu' prestazioni da pagare."),
 (3,"chiaro",0,"La svolta arriva con il decreto 229 del 1999, la riforma Bindi, che riscrive la materia negli articoli da 8 bis a 8 quinquies del decreto 502. Nasce il sistema delle tre A come lo conosciamo."),
 (3,"profondo",1.2,"Il principio del 229 e' chiaro: il privato entra nel servizio pubblico, ma dentro la programmazione regionale. Non basta essere bravi: bisogna servire."),

 (4,"chiaro",0,"Primo gradino: l'autorizzazione. Serve a chiunque voglia realizzare o far funzionare una struttura sanitaria, pubblica o privata, anche se non lavorera' mai per il Servizio Sanitario Nazionale."),
 (4,"chiaro",0,"Le autorizzazioni sono due. Quella alla realizzazione, per costruire, ampliare o trasformare la struttura. E quella all'esercizio, per svolgere l'attivita'."),
 (4,"chiaro",0,"Per la realizzazione decide il Comune, dopo una verifica di compatibilita' con la programmazione regionale. Per l'esercizio decide la Regione."),
 (4,"chiaro",0,"Per ottenerla servono i requisiti minimi: strutturali, tecnologici e organizzativi. Sono le condizioni di sicurezza sotto le quali nessuno puo' curare nessuno."),
 (4,"chiaro",0,"I requisiti minimi nazionali sono fissati da un decreto del Presidente della Repubblica del 14 gennaio 1997, e ogni Regione li integra con i propri."),
 (4,"chiaro",0,"L'autorizzazione pero' non crea nessun rapporto con il servizio pubblico. Una clinica solo autorizzata lavora in regime privato: il paziente paga di tasca propria, o con la sua assicurazione."),

 (5,"chiaro",0,"Secondo gradino: l'accreditamento istituzionale. Lo rilascia la Regione alle strutture autorizzate che vogliono erogare prestazioni per conto del Servizio Sanitario Nazionale."),
 (5,"chiaro",0,"Servono due condizioni. La prima: i requisiti ulteriori di qualita', piu' alti di quelli minimi. La seconda: la funzionalita' rispetto alla programmazione regionale."),
 (5,"chiaro",0,"La seconda condizione e' decisiva. Se in una provincia i posti letto di ortopedia sono gia' sufficienti, una nuova clinica ortopedica puo' essere eccellente e non essere accreditata lo stesso."),
 (5,"chiaro",0,"Conta anche l'attivita' svolta e i risultati raggiunti. E l'accreditamento non e' per sempre: la Regione lo verifica periodicamente, e puo' sospenderlo o revocarlo."),
 (5,"chiaro",0,"Spesso la verifica la fa un organismo tecnico regionale, che visita la struttura e controlla i requisiti sul posto, non solo sulla carta."),
 (5,"chiaro",0,"Pensa all'accreditamento come a una patente: dice che sei abilitato a guidare per il servizio pubblico. Ma avere la patente non vuol dire avere un'auto e un lavoro da autista."),
 (5,"tenue",0,"E qui sta la trappola piu' frequente: essere accreditati non da' diritto a essere pagati. Il decreto lo dice espressamente: l'accreditamento non obbliga a remunerare le prestazioni fuori dagli accordi."),

 (6,"chiaro",0,"Terzo gradino: gli accordi contrattuali. Solo con l'accordo la struttura accreditata diventa, in concreto, un erogatore del servizio pubblico, e le sue prestazioni vengono pagate."),
 (6,"chiaro",0,"Il decreto usa due parole diverse. Con le strutture pubbliche e quelle equiparate si parla di accordi. Con i privati si parla di contratti. La sostanza e' la stessa: un impegno reciproco."),
 (6,"chiaro",0,"L'accordo lo definisce la Regione, o l'azienda sanitaria locale, sulla base del fabbisogno del territorio. E' uno strumento per governare la spesa, non solo per comprare."),
 (6,"chiaro",0,"L'accordo fissa che cosa si compra: quali prestazioni, in quale volume, con quali tariffe e con quali requisiti di qualita'. E fissa un tetto di spesa."),
 (6,"chiaro",0,"Il tetto e' il cuore del sistema. Se la struttura eroga piu' del volume concordato, le prestazioni in eccesso non vengono pagate, o vengono pagate con tariffe ridotte."),
 (6,"chiaro",0,"Le tariffe sono quelle regionali, le stesse per pubblico e privato. Cambia chi eroga la prestazione, non quanto costa al servizio sanitario."),
 (6,"chiaro",1.2,"Ecco le tre A in fila. L'autorizzazione dice che puoi curare. L'accreditamento dice che potresti curare per il servizio pubblico. L'accordo dice che lo fai davvero, e quanto."),

 (7,"chiaro",0,"Che ruolo ha allora il privato accreditato? E' parte del sistema: eroga prestazioni per conto del Servizio Sanitario Nazionale, alle stesse condizioni per il cittadino."),
 (7,"chiaro",0,"Il principio e' l'equiparazione: nell'erogare per il servizio pubblico, strutture pubbliche e private accreditate stanno sullo stesso piano e rispettano le stesse regole."),
 (7,"chiaro",0,"Il paziente non vede differenza: prenota, paga l'eventuale ticket e riceve la prestazione. La differenza la vede la Regione, che deve governare un sistema misto."),
 (7,"chiaro",0,"E le strutture con accordo hanno obblighi precisi: rispettare le modalita' di accesso fissate dalla Regione, trasmettere i dati sulle prestazioni erogate, accettare i controlli."),
 (7,"chiaro",0,"Nel Veneto il rapporto con il privato ha una storia propria, fissata dalla legge regionale 56 del 1994. La vedremo nel modulo tre."),

 (8,"chiaro",0,"Ultimo passaggio: la liberta' di scelta. Il cittadino puo' scegliere dove curarsi tra le strutture pubbliche e quelle private accreditate con cui sono stati definiti accordi contrattuali."),
 (8,"chiaro",0,"La scelta e' reale, ma dentro un perimetro. Vale solo per le strutture con accordo, e per molte prestazioni passa dalla prescrizione del medico e dal sistema di prenotazione."),
 (8,"chiaro",0,"E' il meccanismo che rende concreto il quasi-mercato: se il cittadino sceglie, i soldi seguono il cittadino, e le strutture sono spinte a competere sulla qualita'."),
 (8,"chiaro",0,"E la scelta vale anche fuori Regione: ci si puo' curare in una struttura accreditata di un'altra Regione, compensata poi dalla Regione di residenza. E' la mobilita' sanitaria della lezione tre."),
 (8,"tenue",0,"Distrattore: la liberta' di scelta non vale verso qualunque struttura privata. Una clinica solo autorizzata, o accreditata ma senza accordo, resta fuori dal perimetro del servizio pubblico."),

 (9,"chiaro",0,"Le tre cose che ti chiederanno. La prima: le tre A, nell'ordine. Autorizzazione, accreditamento istituzionale, accordi contrattuali. Negli articoli da 8 bis a 8 quinquies, introdotti dal decreto 229 del 1999."),
 (9,"chiaro",0,"La seconda: l'autorizzazione richiede i requisiti minimi. L'accreditamento richiede i requisiti ulteriori e la coerenza con la programmazione regionale."),
 (9,"chiaro",0,"La terza: solo l'accordo contrattuale da' diritto alla remunerazione, entro volumi e tetti di spesa. L'accreditamento, da solo, non basta."),
 (9,"tenue",0,"E un'ultima trappola, sulle parole: accordi con le strutture pubbliche, contratti con i privati. Se il quesito le scambia, e' sbagliato."),

 (10,"profondo",0,"[warm] In sintesi: tre filtri, dal piu' largo al piu' stretto, e un cittadino che sceglie dentro il perimetro. Nella prossima lezione: che cosa il servizio pubblico deve garantire a tutti. I livelli essenziali di assistenza."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Dal 1992 al 1999', 4: "L'autorizzazione", 5: "L'accreditamento", 6: 'Gli accordi contrattuali', 7: 'Il privato accreditato', 8: "La liberta' di scelta", 9: 'Le tre cose che ti chiederanno', 10: 'Chiusura'}
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
