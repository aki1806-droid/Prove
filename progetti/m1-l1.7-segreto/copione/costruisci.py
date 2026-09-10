# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Ultima lezione di contenuto del modulo. Tiene insieme due famiglie di temi che nei bandi compaiono accostate: la riservatezza, cioe' il dovere di tacere, e la tutela della persona assistita."),
 (1,"tenue",0,"Sono materia da quiz secchi e, insieme, da casi pratici: la contenzione e la fotografia inviata in chat sono ormai due classici delle prove piu' recenti, e li affrontiamo tutti e due."),

 (2,"chiaro",0,"Quattro blocchi. I due segreti, professionale e d'ufficio. Il GDPR applicato ai dati sulla salute. L'accesso alla documentazione: chi puo' e chi non puo'. E la tutela della persona."),

 (3,"chiaro",0,"Due articoli, e la differenza piu' chiesta e' nella procedibilita'. L'articolo 622 punisce la rivelazione senza giusta causa di un segreto appreso in ragione dello stato, ufficio, professione o arte."),
 (3,"chiaro",0,"E' il segreto professionale, procedibile a querela della persona offesa. L'articolo 326 punisce il pubblico ufficiale o l'incaricato di pubblico servizio che rivela notizie d'ufficio che devono restare segrete."),
 (3,"profondo",1.2,"E' il segreto d'ufficio, e questo e' procedibile d'ufficio: non serve che nessuno sporga querela perche' il procedimento parta."),

 (4,"chiaro",0,"E qui il punto che sorprende molti. L'infermiere dipendente pubblico puo' rispondere di entrambi: e' un professionista, quindi 622, ed e' incaricato di pubblico servizio o pubblico ufficiale, quindi 326."),
 (4,"chiaro",0,"E il 326 e' procedibile d'ufficio: non serve la querela. A questi si aggiungono la responsabilita' disciplinare verso l'azienda e quella deontologica davanti all'Ordine: quattro fronti per un solo fatto."),

 (5,"chiaro",0,"Che cosa significa «senza giusta causa»? Che esistono ipotesi in cui l'ordinamento impone o consente la comunicazione: referto e denuncia, le comunicazioni obbligatorie per malattie infettive o infortuni."),
 (5,"tenue",0,"La testimonianza nei casi previsti, la tutela di un interesse prevalente. Fuori da queste ipotesi il silenzio e' la regola, anche verso i familiari, che non hanno un diritto automatico a essere informati."),

 (6,"chiaro",0,"Passiamo alla protezione dei dati. La disciplina e' data dal GDPR, direttamente applicabile in tutta l'Unione, e dal Codice privacy del 2003 come modificato dal decreto 101 del 2018."),
 (6,"chiaro",0,"I dati relativi alla salute rientrano nelle categorie particolari di dati dell'articolo 9, quelle per cui vige un divieto generale di trattamento, con eccezioni tassative ed elencate."),

 (7,"chiaro",0,"Domanda ricorrente: serve il consenso privacy per curare? No. Per le finalita' di cura la base giuridica e' l'articolo 9, paragrafo 2, lettera acca del GDPR, e non il consenso."),
 (7,"profondo",0,"Il trattamento e' consentito quando e' effettuato da o sotto la responsabilita' di un professionista soggetto al segreto professionale. Non serve il consenso dell'interessato."),
 (7,"profondo",0,"Attenzione a non confondere: il consenso al trattamento sanitario, quello della lezione precedente, e il consenso privacy sono due cose diverse. Per la cura la base e' la lettera acca."),

 (8,"chiaro",0,"Sette principi. Liceita', correttezza, trasparenza. Limitazione della finalita': il dato raccolto per la cura non si usa per altro. Minimizzazione: si trattano solo i dati necessari."),
 (8,"chiaro",0,"Esattezza. Limitazione della conservazione. Integrita' e riservatezza. E responsabilizzazione, l'accountability: il titolare non deve solo essere conforme, deve poterlo dimostrare."),

 (9,"chiaro",0,"Questo e' il caso d'esame piu' frequente degli ultimi anni. Consultare la cartella o il fascicolo di un paziente non in cura presso di se': un familiare, un conoscente, un collega, un personaggio noto."),
 (9,"profondo",1.4,"[serious] E' un trattamento illecito. Anche se non si divulga nulla, e anche se si guarda una riga sola."),
 (9,"tenue",0,"Viola la minimizzazione e le istruzioni ricevute, ed e' tracciato dai log di accesso. Comporta responsabilita' disciplinare, deontologica e, secondo i casi, penale. La curiosita', in sanita' digitale, lascia impronte."),

 (10,"chiaro",0,"Chi e' chi. Il titolare e' l'azienda sanitaria, che determina finalita' e mezzi del trattamento. Il responsabile tratta per conto del titolare: per esempio un fornitore informatico."),
 (10,"chiaro",0,"Il DPO e' obbligatorio negli enti pubblici. Gli operatori, fra cui l'infermiere, sono soggetti autorizzati che trattano sotto l'autorita' del titolare, secondo istruzioni."),

 (11,"chiaro",0,"Chi puo' avere la documentazione. L'interessato, che ha diritto di accedere ai propri dati e ottenerne copia: la legge 24 del 2017 impone alle strutture di fornirla entro termini definiti."),
 (11,"chiaro",0,"I familiari solo se delegati, o se esercitano responsabilita' genitoriale o tutela. Dopo il decesso, chi ha un interesse proprio o ragioni familiari meritevoli di protezione."),

 (12,"chiaro",0,"Poi c'e' la riservatezza quotidiana, quella che nei casi d'esame distingue la risposta corretta. Non si commentano casi in ascensore, corridoio, mensa. Non si affiggono elenchi con nomi e diagnosi."),
 (12,"tenue",0,"La consegna si fa in luogo riservato. Non si conferma per telefono la presenza di un ricoverato, e la persona puo' opporsi alla comunicazione della propria presenza in reparto."),

 (13,"chiaro",0,"Torniamo sulla contenzione, che nella uno punto quattro abbiamo visto dal lato deontologico. Dal lato del diritto la questione e' seria, e conviene sapere quali reati puo' toccare."),
 (13,"chiaro",0,"Violenza privata, articolo 610. Sequestro di persona, articolo 605, se la privazione della liberta' si prolunga senza giustificazione. Maltrattamenti, articolo 572, per condotte abituali."),
 (13,"chiaro",0,"Abbandono di persone incapaci, articolo 591, se la persona contenuta resta senza sorveglianza. E lesioni o omicidio colposi per i danni provocati da una contenzione mal eseguita."),

 (14,"chiaro",0,"Non esiste una legge che disciplini in via generale la contenzione: la liceita' si valuta caso per caso. Ecco gli otto elementi che la commissione si aspetta di sentire elencare."),
 (14,"chiaro",0,"Presupposto clinico documentato, oppure stato di necessita'. Prescrizione o motivata valutazione assistenziale. Proporzionalita' del mezzo. Durata limitata, con rivalutazione periodica."),
 (14,"chiaro",0,"Sorveglianza della persona contenuta. Registrazione in cartella. Informazione alla persona e ai familiari. E ricerca di alternative meno restrittive, prima e durante."),
 (14,"profondo",1.2,"Otto elementi: contali sulle dita. E poi la frase che chiude il ragionamento. La carenza di personale non e' mai un presupposto di liceita'."),

 (15,"chiaro",0,"Una rassegna rapida dei reati a tutela della persona. 593, omissione di soccorso: riguarda chiunque, anche fuori servizio. 591, abbandono di incapaci: riguarda chi ha custodia o cura."),
 (15,"chiaro",0,"572, maltrattamenti: condotte abituali, applicabile anche alle strutture di cura. 328, rifiuto di atti d'ufficio. 609 bis, violenza sessuale, aggravata dall'abuso della qualita' e della relazione di cura."),

 (16,"chiaro",0,"E 476 e 479, falsita' in atto pubblico, per le annotazioni alterate. Passiamo ai due obblighi da non confondere. Il referto, articolo 365 del codice penale, riguarda l'esercente una professione sanitaria."),
 (16,"profondo",0,"Che presta assistenza in casi che possono presentare i caratteri di un delitto perseguibile d'ufficio. Va presentato entro 48 ore, o immediatamente se c'e' pericolo nel ritardo. [serious] E ha un'eccezione."),
 (16,"profondo",1.2,"Non e' dovuto quando esporrebbe l'assistito a procedimento penale. E' il limite che distingue il referto da qualunque altro obbligo di comunicazione."),
 (16,"chiaro",0,"La denuncia, articolo 331 del codice di procedura penale, riguarda il pubblico ufficiale e l'incaricato di pubblico servizio, per i reati perseguibili d'ufficio, e va fatta senza ritardo."),

 (17,"chiaro",0,"Il caso della violenza sospetta. Davanti a lesioni compatibili con maltrattamento, l'infermiere del servizio pubblico si muove su tre binari. Il primo e' l'assistenza alla persona."),
 (17,"tenue",0,"Il secondo: documentazione accurata e oggettiva di quanto si rileva, cioe' descrivere, non giudicare e non interpretare. Il terzo: attivazione dei percorsi previsti."),
 (17,"chiaro",0,"Referto o denuncia a cura di chi ne ha l'obbligo, allerta dei servizi sociali per i minori. E ricorda: qui il segreto professionale non e' un ostacolo, perche' la comunicazione e' dovuta."),

 (18,"chiaro",0,"Nel sistema veneto i dati confluiscono nel fascicolo sanitario elettronico regionale, il cui accesso e' governato da consensi e deleghe e tracciato dai log: l'accesso non giustificato e' rilevato."),
 (18,"chiaro",0,"Ogni azienda ha un DPO e un regolamento sull'uso dei dispositivi personali. E gli ospedali applicano percorsi dedicati per le vittime di violenza in pronto soccorso."),

 (19,"profondo",0,"[warm] I sette punti. 622 segreto professionale, a querela; 326 segreto d'ufficio, procedibile d'ufficio; il dipendente pubblico puo' rispondere di entrambi. I dati sulla salute sono dati particolari."),
 (19,"profondo",0,"Per la cura la base giuridica e' l'articolo 9.2 lettera acca, non il consenso. Minimizzazione: l'accesso non giustificato e' illecito anche senza divulgazione, ed e' tracciato."),
 (19,"profondo",0,"I familiari non hanno diritto automatico. Contenzione: presupposto documentato, proporzionalita', durata limitata, sorveglianza, registrazione. Mai per carenza di personale."),
 (19,"chiaro",0,"Referto entro 48 ore, ma non dovuto se esporrebbe l'assistito a procedimento penale. Nella prossima lezione ricomponiamo tutto il modulo, con la mappa di sintesi e dodici domande commentate. A tra poco."),
]

ACCENTATE = "àèéìíòóùúÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"I due segreti",4:"Il cumulo che sorprende",
 5:"La giusta causa",6:"I dati sulla salute",7:"La base giuridica per la cura",
 8:"I principi dell'art. 5",9:"L'accesso non giustificato",10:"I soggetti del trattamento",
 11:"L'accesso alla documentazione",12:"La riservatezza in reparto",
 13:"La contenzione sul piano penale",14:"Che cosa rende lecita una contenzione",
 15:"I reati a tutela della persona",16:"Referto e denuncia",17:"La violenza sospetta",
 18:"In Veneto",19:"Chiusura"}
CPS = 17.0   # misurata su 1.2, confermata su 1.3 e 1.4

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
