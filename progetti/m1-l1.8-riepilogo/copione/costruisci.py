# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Siamo alla lezione di chiusura del primo modulo. Qui non aggiungiamo niente di nuovo: ricomponiamo. Ti do una mappa unica delle sette lezioni e una linea del tempo."),
 (1,"tenue",0,"Poi i dieci numeri da ricordare, le sette confusioni che costano piu' punti e i cinque casi tipici. Guarda questo video due volte: adesso, e di nuovo nei giorni prima della prova."),

 (2,"chiaro",0,"La mappa. Uno punto uno: le fonti del campo di attivita'. Uno punto due: il profilo, DM 739 del 1994. Uno punto tre: formazione, Ordine, ECM e carriera."),
 (2,"chiaro",0,"Uno punto quattro: il Codice deontologico del 2019. Uno punto cinque: la responsabilita' professionale. Uno punto sei: consenso e autodeterminazione. Uno punto sette: segreto, privacy e tutela della persona."),
 (2,"profondo",1.2,"Sette lezioni, un filo solo: all'autonomia corrisponde la responsabilita'."),

 (3,"chiaro",0,"Se dovessi ricordare una sola cosa del modulo, ricorda questa catena. La competenza, data da profilo, formazione e deontologia, fonda l'autonomia. L'autonomia genera responsabilita'."),
 (3,"chiaro",0,"E la responsabilita' si dimostra attraverso la documentazione. E' lo schema con cui rispondere a quasi ogni domanda aperta del modulo, anche a quelle che non hai preparato."),

 (4,"chiaro",0,"La linea del tempo. 1974: il mansionario, DPR 225. 1992: il decreto legislativo 502, e la formazione entra all'universita'. 1994: il DM 739, il profilo professionale."),
 (4,"chiaro",0,"1999: due fonti nello stesso anno. La legge 42, che abroga il mansionario e crea le tre fonti del campo di attivita'. E il decreto 229, che struttura l'ECM."),
 (4,"tenue",0,"2000: la legge 251, autonomia professionale e dirigenza. Sono i sei passaggi con cui si racconta il primo quarto di secolo della professione. Se te ne chiedono uno solo, e' il 1999: e' l'anno in cui il mansionario sparisce."),

 (5,"chiaro",0,"Si prosegue. 2006: la legge 43, obbligo di albo e quattro livelli professionali. 2010: la legge 38, cure palliative e terapia del dolore. 2016: il GDPR."),
 (5,"chiaro",0,"2017: due leggi, e le vediamo fra un attimo. 2018: la legge 3, e i Collegi IPASVI diventano Ordini, con la FNOPI al vertice. 2019: il Codice deontologico."),
 (5,"tenue",0,"2021: la legge 163, e la laurea diventa abilitante. Dal mansionario alla laurea abilitante corrono quarantasette anni, e il senso del percorso sta tutto in questa distanza."),

 (6,"chiaro",0,"E qui il trucco che evita due errori sicuri. Il 2017 ha due leggi che i quiz scambiano volentieri: la 24 e' responsabilita' e sicurezza delle cure, la 219 e' consenso e DAT."),
 (6,"profondo",0,"Associale a due parole: ventiquattro responsabilita', duecentodiciannove consenso. Stessa cosa per il 1999: legge 42 il mansionario, decreto 229 l'ECM."),

 (7,"chiaro",1.2,"I dieci numeri del modulo. 3: le fonti del campo di attivita'. 3, 4 e 3: nature, tipi e funzioni dell'assistenza. 5: le attivita' del comma 3 e le aree post base."),
 (7,"chiaro",1.2,"4: i livelli professionali, e anche le sanzioni dell'Ordine. 150: i crediti ECM nel triennio. 53 e 8: gli articoli e i capi del Codice deontologico."),
 (7,"chiaro",0,"5: i piani della responsabilita'. 10 e 5: gli anni di prescrizione, struttura ed esercente. 1: l'anno per la rivalsa dal pagamento. 48: le ore per il referto. Dieci numeri, e hai lo scheletro del modulo."),

 (8,"chiaro",0,"Le sette confusioni che costano piu' punti. Prima: partecipa o identifica? Bisogni di salute: partecipa. Bisogni di assistenza infermieristica: identifica e formula."),
 (8,"profondo",0,"E' la distinzione del DM 739 e vale una domanda in ogni prova. Il verbo cambia con il tipo di bisogno, non con il tipo di paziente: dove il bisogno e' infermieristico, la regia e' tua."),
 (8,"chiaro",0,"Seconda: aree post base o livelli? Le cinque aree sono ambiti clinici del profilo. I quattro livelli sono carriera, e vengono dalla legge 43 del 2006."),

 (9,"chiaro",0,"Terza: esonero o esenzione? Esonero perche' studi: laurea, master, dottorato, specializzazione. Esente perche' assente: maternita', malattia, aspettativa."),
 (9,"tenue",0,"Il modo per non sbagliarle sotto esame e' legarle al motivo: esonero quando studi, esenzione quando sei assente. In tutti e due i casi i crediti si riducono in proporzione ai mesi."),
 (9,"chiaro",0,"Quarta: livello o incarico? Il titolo abilita, l'azienda attribuisce. Si puo' avere il master di coordinamento senza avere l'incarico di coordinatore: il livello e' una qualifica, l'incarico e' un atto dell'azienda."),

 (10,"chiaro",0,"Quinta: la struttura risponde a titolo contrattuale, prescrizione dieci anni. L'esercente risponde di regola a titolo extracontrattuale, prescrizione cinque anni."),
 (10,"chiaro",0,"Sesta: le DAT guardano a un'incapacita' futura ed eventuale, e le fa una persona da sola. La pianificazione condivisa nasce da una patologia gia' in atto e si costruisce con il medico."),
 (10,"chiaro",0,"Settima: 622, segreto professionale, procedibile a querela. 326, segreto d'ufficio, procedibile d'ufficio. Sette confusioni: sono queste a decidere i punti nei quiz a risposta chiusa."),

 (11,"chiaro",0,"I cinque casi che tornano sempre. Primo: prescrizione poco chiara o palesemente errata. Chiedi chiarimento al prescrittore; se il dubbio permane, non dai corso e documenti."),
 (11,"tenue",0,"Non ti nascondi dietro la prescrizione quando l'errore e' riconoscibile: il principio di affidamento cade davanti all'errore palese. Vale per ogni ruolo dell'equipe, non solo per il tuo."),
 (11,"chiaro",0,"Secondo: attribuzione di un'attivita' all'OSS. Valuti competenza dell'operatore, condizioni della persona, contesto organizzativo. E restano tue la culpa in eligendo e la culpa in vigilando."),

 (12,"chiaro",0,"Terzo: il paziente ha firmato senza capire. Sospendi il percorso, informi il medico, documenti. Senza informazione non c'e' consenso valido, e un consenso non valido non copre nulla."),
 (12,"chiaro",0,"Quarto: contenzione richiesta per carenza di personale. Rifiuti, cerchi alternative, segnali la carenza, documenti. La carenza di personale non e' mai un presupposto di liceita'."),
 (12,"chiaro",0,"Quinto: foto di una lesione inviata in chat fra colleghi. Non si fa: si documenta con gli strumenti aziendali e con il consenso. Cinque casi, e in tutti e cinque la risposta finisce con documentare."),

 (13,"profondo",1.2,"[serious] Quattro formule che all'orale vanno dette con le parole giuste. L'infermiere e' l'operatore sanitario responsabile dell'assistenza generale infermieristica."),
 (13,"profondo",1.2,"L'assistenza infermieristica e' di natura tecnica, relazionale ed educativa. La sicurezza delle cure e' parte costitutiva del diritto alla salute. Sono le parole del DM 739 e dell'articolo 1 della legge 24."),
 (13,"profondo",0,"Nessun trattamento sanitario puo' essere iniziato o proseguito senza il consenso libero e informato della persona interessata. Quattro frasi, e valgono piu' di quattro pagine di riassunto."),

 (14,"chiaro",0,"Il modulo e' nazionale, ma la commissione e' veneta. Quattro agganci rendono concreta qualunque risposta. Uno: la funzione infermieristica sta negli atti aziendali, in una struttura delle professioni sanitarie."),
 (14,"chiaro",0,"Due: il Centro regionale per la gestione del rischio sanitario, e il Difensore civico regionale come Garante per il diritto alla salute."),
 (14,"chiaro",0,"Tre: le procedure aziendali sulla contenzione, con prescrizione, rivalutazione e registrazione. Quattro: il fascicolo sanitario elettronico e i log di accesso. Il sistema veneto si approfondisce nel modulo 13."),

 (15,"chiaro",0,"Nella dispensa trovi dodici domande di autovalutazione, e ogni soluzione ti dice a quale lezione tornare se hai sbagliato. La regola: se sbagli piu' di tre su dodici, non passare al modulo 2."),
 (15,"tenue",0,"Rivedi le lezioni segnalate. Non e' pignoleria: il modulo 1 e' la grammatica di tutto il resto del corso, e i moduli successivi lo danno per acquisito. Meglio due giorni in piu' adesso che un modulo intero da rifare."),

 (16,"chiaro",0,"Come proseguire. Uno: affronta il test finale del modulo, quaranta domande. E' il primo controllo serio. Due: riprendi solo le lezioni segnalate dagli errori, non tutto il modulo."),
 (16,"chiaro",0,"Tre: trasferisci nel quaderno di ripasso le formule e i dieci numeri, che sono la parte che si dimentica per prima. Quattro: passa al modulo 2, che riprende molti fili di questo e li traduce in metodo."),

 (17,"chiaro",0,"[warm] Chiudo con la catena da cui siamo partiti. Il mansionario e' il decreto del 1974, abrogato dalla legge 42 del 1999. Le fonti del campo di attivita' sono tre."),
 (17,"chiaro",0,"L'infermiere e' responsabile dell'assistenza generale infermieristica, di natura tecnica, relazionale ed educativa. Chi attribuisce risponde della scelta, chi esegue della corretta esecuzione."),
 (17,"chiaro",0,"La laurea abilita, ma per esercitare serve l'albo. Centocinquanta crediti nel triennio. La contenzione e' eccezionale e mai organizzativa. I piani della responsabilita' sono cinque, autonomi e cumulabili."),
 (17,"chiaro",0,"Dieci anni la struttura, cinque l'esercente, rivalsa solo per dolo o colpa grave. Nessun trattamento senza consenso libero e informato: si puo' rifiutare tutto, non pretendere tutto."),
 (17,"profondo",0,"E infine la frase che tiene insieme tutto il modulo: cio' che non e' documentato si presume non fatto. E' la frase con cui conviene chiudere qualunque risposta all'orale. Ci vediamo nel modulo 2."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"La mappa del modulo",3:"Il filo",4:"Linea del tempo I",
 5:"Linea del tempo II",6:"Le date gemelle",7:"I dieci numeri",8:"Confusioni 1-2",
 9:"Confusioni 3-4",10:"Confusioni 5-7",11:"Casi 1-2",12:"Casi 3-5",
 13:"Le formule",14:"In Veneto",15:"Autovalutazione",16:"Come proseguire",17:"Chiusura"}
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.7

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

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

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+3+10
print(f"blocchi   {len(blocchi)}        scene {nscene}/50")
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

acc=0; stacco=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if acc>tot/2 and stacco is None and i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        stacco=b["id"]; a=acc
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
