# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, testo parlato)
BLOCCHI = [
 (1,"chiaro","[warm] Benvenuta e benvenuto alla prima micro-lezione del corso di preparazione al concorso per infermiere di Azienda Zero. Partiamo dal punto da cui discende tutto il resto."),
 (1,"chiaro","Che cosa puo' fare un infermiere, e soprattutto chi lo stabilisce. Sembra una domanda teorica: e' la piu' concreta di tutte, perche' da li' discende la responsabilita' di ogni gesto che farai in reparto."),
 (2,"chiaro","In otto minuti facciamo quattro cose. Capiamo cos'era il mansionario e perche' e' caduto. Impariamo le tre fonti del campo di attivita'. Fissiamo la linea del tempo dal 1974 al 2018. E smontiamo i distrattori dei quiz."),
 (3,"chiaro","[serious] Fino al 1999 quello che l'infermiere poteva fare era scritto in un elenco: il mansionario, contenuto nel decreto del Presidente della Repubblica 225 del 1974."),
 (3,"chiaro","Un elenco tassativo di mansioni. La logica era semplice e rigidissima: era consentito cio' che l'elenco prevedeva, era vietato tutto il resto. Nessuna zona grigia, e nessuna valutazione da fare."),
 (3,"chiaro","E l'infermiere apparteneva alle professioni sanitarie ausiliarie. Ausiliarie rispetto alla professione medica: non era un dettaglio lessicale, era la posizione della professione dentro il sistema."),
 (4,"tenue","Quel modello aveva tre difetti che lo hanno condannato. Il primo: era rigido. Ogni innovazione clinica rendeva l'elenco vecchio, perche' l'atto nuovo semplicemente non c'era scritto."),
 (4,"tenue","Il secondo: era deresponsabilizzante. Si rispondeva dell'esecuzione dell'atto, non della qualita' dell'assistenza alla persona. Eseguito l'atto come da elenco, il dovere era esaurito li'."),
 (4,"tenue","Il terzo: era incoerente con la formazione, che nel frattempo era diventata universitaria e formava un professionista capace di valutare e decidere. Un laureato con in mano un elenco di mansioni."),
 (5,"chiaro","Il primo colpo al vecchio sistema arriva prima dell'abrogazione. Nel 1994 il decreto ministeriale 739 individua la figura e il profilo professionale dell'infermiere."),
 (5,"profondo","E lo fa con una formula che devi sapere alla lettera, perche' i quiz la smontano e la rimontano: l'infermiere e' l'operatore sanitario responsabile dell'assistenza generale infermieristica."),
 (5,"chiaro","Fermati sulla parola responsabile. Non collabora. Non esegue. Risponde in proprio. Il test per sapere se l'hai capita: se puoi sostituire responsabile con collabora e la frase regge lo stesso, non l'hai capita."),
 (6,"chiaro","Il profilo aggiunge che l'assistenza infermieristica, preventiva, curativa, palliativa e riabilitativa, e' di natura tecnica, relazionale ed educativa. Tre aggettivi, non due."),
 (6,"tenue","Segnalo con un'evidenziazione mentale: il distrattore piu' diffuso ne cita solo due, e quello che sparisce e' quasi sempre l'educativa. Educare la persona a gestirsi e' assistenza, non un extra."),
 (7,"chiaro","Il decreto elenca poi le attivita' dell'infermiere in relazione al processo assistenziale. Sono cinque, ed e' il primo dei due passaggi da mandare a memoria."),
 (7,"chiaro","Uno: partecipa all'identificazione dei bisogni di salute della persona e della collettivita'. Due: identifica i bisogni di assistenza infermieristica e ne formula gli obiettivi."),
 (7,"chiaro","Tre: pianifica, gestisce e valuta l'intervento assistenziale infermieristico. Nota il verbo valuta in coda: il processo si chiude tornando a guardare se ha funzionato davvero."),
 (8,"chiaro","Quattro: garantisce la corretta applicazione delle prescrizioni diagnostico-terapeutiche. Cinque: agisce sia individualmente sia in collaborazione con gli altri operatori sanitari e sociali."),
 (8,"chiaro","E, ove necessario, avvalendosi dell'opera del personale di supporto. Avvalersi: l'operatore di supporto lavora con te, e la responsabilita' di cio' che gli attribuisci resta tua."),
 (9,"tenue","[serious] Il punto quattro e' quello che si sbaglia di piu'. Garantire la corretta applicazione non vuol dire eseguire automaticamente: vuol dire rispondere del fatto che sia applicata correttamente."),
 (9,"chiaro","E comporta il dovere di verificare, di rilevare le incongruenze, e di non dare corso a una prescrizione palesemente errata senza prima averla chiarita con chi l'ha scritta."),
 (9,"tenue","L'errore speculare esiste ed e' altrettanto grave: rifiutare di eseguire perche' non si e' d'accordo. Il dovere e' chiarire, non decidere al posto del medico. Ne riparliamo nella lezione uno punto cinque."),
 (10,"chiaro","E arriviamo allo spartiacque: la legge 42 del 1999. Fa tre cose, e conviene contarle sulle dita, perche' i quiz ne citano una sola e ti chiedono se e' tutto."),
 (10,"chiaro","Prima: abroga il mansionario, e con esso la logica dell'elenco chiuso. Seconda: sostituisce la denominazione professione sanitaria ausiliaria con professione sanitaria."),
 (10,"chiaro","Cade l'aggettivo che definiva l'infermiere per relazione a un altro. Terza: individua i criteri che delimitano il campo proprio di attivita' e responsabilita'. Ed e' il passaggio che conta di piu'."),
 (11,"profondo","[thoughtful] Questo e' il secondo passaggio da mandare a memoria, ed e' il cuore della lezione. Il campo proprio di attivita' e responsabilita' dell'infermiere e' determinato da tre fonti."),
 (11,"profondo","Uno: il profilo professionale. Due: gli ordinamenti didattici del corso di laurea e della formazione post-base. Tre: il codice deontologico."),
 (11,"profondo","Con un limite: le competenze previste per le professioni mediche e per le altre professioni del ruolo sanitario con formazione universitaria. Tre fonti, piu' il limite."),
 (11,"chiaro","Perche' tre e non una? Perche' una fonte sola tornerebbe a essere un elenco. Tre fonti che si aggiornano per conto loro tengono il perimetro vivo. Se all'orale citi solo il profilo, hai risposto a un terzo."),
 (12,"chiaro","Il cambio di paradigma e' tutto qui: si passa da un elenco di atti consentiti a un perimetro definito da fonti che si muovono nel tempo."),
 (12,"chiaro","Cio' che rientra nel profilo, in cio' che ti e' stato insegnato e in cio' che la deontologia consente, e' tua competenza. Il perimetro si sposta quando si spostano formazione e profilo: e' l'elasticita' che mancava."),
 (13,"chiaro","Un anno dopo, la legge 251 del 2000 completa il quadro: gli operatori delle professioni infermieristiche svolgono con autonomia professionale attivita' dirette alla prevenzione, alla cura e alla salvaguardia della salute."),
 (13,"chiaro","Individuale e collettiva, utilizzando metodologie di pianificazione per obiettivi dell'assistenza. Pianificare per obiettivi vuol dire scrivere il risultato atteso prima dell'intervento, e poi misurarlo."),
 (13,"tenue","Attenzione a una sfumatura che vale punti: autonomia non significa indipendenza dall'equipe. Significa che nel tuo campo decidi tu, e quindi ne rispondi tu. E' un guadagno che arriva con un prezzo."),
 (14,"profondo","Apriamo il primo dei riquadri in Veneto che troverai in tutto il corso. Dalla legge 251 discende anche la possibilita' di istituire la dirigenza infermieristica."),
 (14,"profondo","Nelle aziende del Servizio Socio Sanitario veneto la funzione infermieristica e' collocata, negli atti aziendali, in una struttura dedicata alle professioni sanitarie. Saperlo, all'orale, ti distingue."),
 (15,"chiaro","Due sviluppi da tenere. La legge 43 del 2006 rende obbligatoria l'iscrizione all'albo per l'esercizio della professione, anche per il dipendente pubblico. Ed e' infatti un requisito del bando."),
 (15,"chiaro","La stessa legge individua quattro livelli: professionista, coordinatore, specialista, dirigente. Quattro livelli, in quest'ordine: e' una sequenza che i quiz amano rimescolare."),
 (15,"chiaro","La legge 3 del 2018, la legge Lorenzin, trasforma i Collegi IPASVI in Ordini delle professioni infermieristiche, gli OPI, con la federazione nazionale FNOPI."),
 (16,"chiaro","Ricomponiamo. 1974: mansionario. 1992: la formazione entra all'universita'. 1994: profilo professionale. 1999: cade il mansionario e nascono le tre fonti."),
 (16,"chiaro","2000: autonomia professionale. 2006: albo obbligatorio e quattro livelli. 2018: gli Ordini. Se ricordi solo due date, ricorda 1994 profilo e 1999 abrogazione: sono quelle che i quiz invertono."),
 (17,"tenue","[curious] Tre trappole ricorrenti. La prima: il mansionario e' stato abrogato dal decreto del 1994. Falso: il 1994 istituisce il profilo, l'abrogazione e' del 1999."),
 (17,"tenue","La seconda: l'assistenza e' di natura tecnica e relazionale. Incompleta: manca educativa. La terza: l'infermiere e' una professione sanitaria ausiliaria. Superata dalla legge 42."),
 (17,"chiaro","Il criterio che ti salva quando due opzioni sembrano entrambe giuste: scegli quella che non toglie niente. Se vedi ausiliaria al presente, o due nature su tre, l'opzione e' sbagliata."),
 (18,"profondo","[warm] Chiudiamo con i cinque punti che non si sbagliano. Mansionario: decreto 225 del 1974, abrogato dalla legge 42 del 1999. Profilo: decreto 739 del 1994."),
 (18,"profondo","L'infermiere e' responsabile dell'assistenza generale infermieristica. Natura dell'assistenza: tecnica, relazionale ed educativa. Le fonti del campo di attivita' sono tre, piu' il limite delle altre professioni laureate."),
 (18,"profondo","Autonomia professionale: legge 251 del 2000. Obbligo di albo: legge 43 del 2006. Trovi tutto nella dispensa, con quindici quiz e la traccia di risposta sintetica gia' svolta."),
 (18,"chiaro","Se oggi porti a casa una cosa sola, che sia questa: non ti si chiede piu' di sapere che cosa puoi fare, ti si chiede di saper dire da dove viene. Nella prossima lezione entriamo dentro il profilo, attivita' per attivita'."),
]

ACCENTATE = "àèéìíòóùúÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"Il mansionario",4:"Perche' non poteva reggere",
 5:"DM 739/1994: il profilo",6:"Le tre nature",7:"Le cinque attivita' (1-3)",
 8:"Le cinque attivita' (4-5)",9:"Garantire non e' eseguire",10:"L. 42/1999: lo spartiacque",
 11:"Le tre fonti",12:"Da elenco a perimetro",13:"L. 251/2000: l'autonomia",14:"In Veneto",
 15:"L. 43/2006 e L. 3/2018",16:"La linea del tempo",17:"I distrattori tipici",18:"Chiusura"}

blocchi=[]
for i,(cap,tema,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"text":txt})

# --- verifiche ---
errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>50: errori.append(f"scene {nscene} > 50")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

parlato=tot/18
durata=parlato+3+10
print(f"blocchi   {len(blocchi)}        scene {nscene}/50")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}")
print(f"tag       {tags}")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    print(f'    {b["id"]}  {len(b["text"]):3d} car  {len(b["text"])/18:4.1f}s  [{b["tema"]:8s}] {b["text"][:58]}...')

# --- stacco per le due tracce ElevenLabs (max 5000 car) ---
acc=0; stacco=None
for b in blocchi:
    acc+=len(b["text"])+1
    if acc>tot/2 and stacco is None and b["capitolo"]!=blocchi[blocchi.index(b)+1]["capitolo"]:
        stacco=b["id"]; a=acc
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")

print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
