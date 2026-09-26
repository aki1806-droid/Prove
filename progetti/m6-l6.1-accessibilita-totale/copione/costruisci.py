# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6): dall'accesso difensivo all'accessibilita' totale. L. 241/1990 art. 22 (interesse diretto,
# concreto e attuale) e art. 24 c. 3 (niente controllo generalizzato); L. 190/2012 art. 1 cc. 35-36 (delega);
# D.Lgs. 33/2013 art. 1 cc. 1-3 (accessibilita' totale, limiti, livello essenziale), art. 2 (accesso civico e
# pubblicazione, senza autenticazione), art. 2-bis (ambito: PA dell'art. 1 c. 2 D.Lgs. 165/2001), art. 3
# (conoscere, fruire, riutilizzare), art. 5 c. 11 (restano ferme le forme della 241), art. 41 c. 1 (SSN);
# D.Lgs. 97/2016 (accesso civico generalizzato). Fonti: testo del D.Lgs. 33/2013 agg. 13/3/2017; dispensa CISL.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Vuoi sapere quanto spende la tua azienda sanitaria per le consulenze, o come sono stati scelti i direttori. Non hai un interesse personale da difendere. Puoi saperlo lo stesso? Oggi si'."),
 (1,"chiaro",0,"Fino al 2013 la risposta era diversa. Per chiedere un documento serviva, di regola, un interesse diretto. Poi l'idea di fondo e' cambiata: l'amministrazione deve essere come una casa di vetro."),
 (1,"profondo",1.2,"Dalla carta che serve a me, alla carta che e' di tutti."),

 (2,"chiaro",0.6,"Quattro passaggi. Il limite dell'accesso della legge 241. L'idea di accessibilita' totale del decreto 33 del 2013. I due strumenti e chi deve rispettarli. E il legame tra trasparenza e lotta alla corruzione."),

 (3,"chiaro",0.5,"Nella lezione precedente abbiamo visto l'accesso documentale. Spetta solo a chi ha un interesse diretto, concreto e attuale, collegato a una situazione giuridicamente tutelata."),
 (3,"chiaro",0,"La legge 241 lo dice in modo esplicito: non sono ammissibili richieste di accesso preordinate a un controllo generalizzato dell'operato delle pubbliche amministrazioni."),
 (3,"chiaro",0,"E' un accesso difensivo: serve a chi deve tutelare una propria posizione. Protegge il singolo, ma non permette al cittadino di controllare come si usano le risorse pubbliche."),
 (3,"chiaro",0,"La 241 e' del 1990 e nasce per proteggere il cittadino dentro il procedimento. Non pensava ancora a internet, ne' a un controllo diffuso sui conti e sulle scelte pubbliche."),
 (3,"chiaro",0.6,"Un esempio: un'associazione di cittadini vuole capire quanto paga un'azienda sanitaria per un servizio. Con la sola 241, senza un interesse qualificato, la richiesta non sarebbe ammissibile."),
 (3,"chiaro",0,"E anche quando l'accesso e' ammesso, riguarda solo i documenti che servono a quella posizione. Chi guarda l'amministrazione da fuori, resta fuori."),
 (3,"tenue",0.8,"Occhio a un distrattore: la legge 241 non ha mai consentito un controllo diffuso sull'amministrazione. Lo esclude espressamente."),
 (3,"profondo",1.2,"Un accesso per difendersi, non per controllare."),

 (4,"chiaro",0.5,"La svolta arriva con la legge anticorruzione, la 190 del 2012. Delega il governo a riordinare gli obblighi di pubblicita' e trasparenza. Nasce cosi' il decreto legislativo 33 del 2013."),
 (4,"chiaro",0,"L'articolo 1 da' la definizione: la trasparenza e' accessibilita' totale dei dati e dei documenti detenuti dalle pubbliche amministrazioni."),
 (4,"chiaro",0,"Con tre scopi: tutelare i diritti dei cittadini, promuovere la loro partecipazione all'attivita' amministrativa e favorire forme diffuse di controllo sulle funzioni istituzionali e sull'uso delle risorse pubbliche."),
 (4,"chiaro",0,"La parola chiave e' chiunque. Non serve dimostrare un interesse: la trasparenza e' un diritto di tutti, non solo di chi e' coinvolto in un procedimento."),
 (4,"chiaro",0,"La trasparenza concorre ad attuare il principio democratico e i principi costituzionali di imparzialita' e buon andamento. Serve a un'amministrazione aperta, al servizio del cittadino."),
 (4,"chiaro",0,"E' lo spirito dell'amministrazione aperta: un'amministrazione che rende conto di cio' che fa, apre i propri dati e permette ai cittadini di partecipare e di controllare."),
 (4,"chiaro",0,"E ha un peso preciso: e' un livello essenziale delle prestazioni, ai sensi dell'articolo 117 della Costituzione. Vale quindi in modo uniforme in tutto il paese."),
 (4,"chiaro",0,"Non e' pero' assoluta. Restano fermi il segreto di Stato, il segreto d'ufficio, il segreto statistico e la protezione dei dati personali."),
 (4,"chiaro",0,"Nel 2016 il decreto legislativo 97 riscrive il testo e aggiunge l'accesso civico generalizzato, sul modello del Freedom of Information Act. Da allora si parla di FOIA anche in Italia."),
 (4,"tenue",0.8,"Attenzione: trasparenza non significa che tutto si pubblica. La legge stessa fissa dei limiti, a partire dalla protezione dei dati personali."),
 (4,"profondo",1.2,"Accessibilita' totale, dentro limiti precisi."),

 (5,"chiaro",0.5,"L'articolo 2 dice come si realizza questa liberta' di accesso di chiunque. Con due strumenti: la pubblicazione sui siti istituzionali e l'accesso civico."),
 (5,"chiaro",0,"Pubblicare significa mettere dati e documenti sul sito, in modo che chiunque possa consultarli direttamente, senza autenticazione e senza identificarsi."),
 (5,"chiaro",0,"I due strumenti si completano. Cio' che e' obbligatorio pubblicare deve stare sul sito; per tutto il resto si puo' presentare una richiesta di accesso civico."),
 (5,"chiaro",0,"Gli articoli 3 e 7 aggiungono: cio' che e' pubblico si puo' conoscere, usare gratuitamente e riutilizzare, citando la fonte e rispettandone l'integrita'."),
 (5,"chiaro",0,"Per questo i dati vanno pubblicati in formato aperto: leggibili e riutilizzabili anche dai programmi informatici, non solo da chi li guarda sullo schermo."),
 (5,"chiaro",0,"Chi deve rispettare il decreto? Tutte le pubbliche amministrazioni indicate dal testo unico sul pubblico impiego, il 165 del 2001. Tra queste ci sono le aziende e gli enti del servizio sanitario."),
 (5,"chiaro",0,"L'articolo 41 lo ribadisce: aziende sanitarie territoriali, aziende ospedaliere ed enti del servizio sanitario sono tenuti a tutti gli obblighi di pubblicazione."),
 (5,"chiaro",0,"Il decreto si applica, in quanto compatibile, anche a enti pubblici economici, ordini professionali, societa' in controllo pubblico e ad alcuni enti privati finanziati e controllati dalla pubblica amministrazione."),
 (5,"chiaro",0,"E l'accesso della legge 241 non sparisce. Il decreto dice che restano ferme le forme di accesso degli interessati previste dalla legge 241. I due sistemi convivono."),
 (5,"tenue",0.8,"Un distrattore frequente: l'accesso civico non ha sostituito l'accesso documentale. Sono strumenti diversi, con scopi diversi, e restano entrambi."),
 (5,"profondo",1.2,"Pubblicare e rispondere: due strade verso la stessa casa di vetro."),

 (6,"chiaro",0.5,"Perche' la trasparenza sta nella legge anticorruzione? Perche' cio' che e' visibile e' piu' difficile da piegare a interessi privati."),
 (6,"chiaro",0,"Se incarichi, compensi, contratti e pagamenti sono pubblici, chiunque puo' accorgersi di un'anomalia. La trasparenza diventa una misura di prevenzione, non solo un diritto."),
 (6,"chiaro",0,"Per questo, di regola, lo stesso dirigente e' responsabile della prevenzione della corruzione e della trasparenza. E la trasparenza entra nei piani anticorruzione dell'ente."),
 (6,"chiaro",0,"Per chi lavora in azienda sanitaria significa una cosa concreta: i dati che produci o gestisci possono finire in Amministrazione trasparente, e devono essere completi, corretti e aggiornati."),
 (6,"chiaro",0.6,"Un esempio in sanita': le aziende pubblicano le procedure per nominare direttore generale, sanitario e amministrativo, e per affidare gli incarichi di struttura. Chiunque puo' vedere come e' stata fatta la scelta."),
 (6,"chiaro",0,"Lo stesso vale per i pagamenti. Le aziende del servizio sanitario pubblicano i dati sulle spese e sui pagamenti effettuati, distinti per tipo di lavoro, bene o servizio."),
 (6,"tenue",0.8,"Attenzione: la trasparenza non e' solo un adempimento informatico. Il decreto la collega alla responsabilita' dei dirigenti e alla valutazione della performance."),
 (6,"profondo",1.2,"Cio' che si vede, chiunque lo puo' controllare."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: la legge 241 esclude il controllo generalizzato; il decreto 33 del 2013 definisce la trasparenza come accessibilita' totale dei dati e dei documenti."),
 (7,"chiaro",0.8,"La seconda: la trasparenza si realizza con la pubblicazione sui siti e con l'accesso civico, e vale per tutte le pubbliche amministrazioni, aziende sanitarie comprese."),
 (7,"chiaro",0.8,"La terza: il decreto nasce dalla legge anticorruzione 190 del 2012; nel 2016 il decreto 97 introduce l'accesso civico generalizzato, il FOIA italiano."),
 (7,"tenue",0.8,"L'ultimo distrattore: accessibilita' totale non vuol dire assenza di limiti. Restano segreti e protezione dei dati personali."),

 (8,"profondo",0,"[warm] In sintesi: da un accesso per difendersi a una casa di vetro aperta a tutti. Nella prossima lezione entriamo nella sezione Amministrazione trasparente del sito."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Il limite dell'accesso difensivo", 4: "L'accessibilita' totale", 5: 'Due strumenti, molte amministrazioni', 6: 'Trasparenza e anticorruzione', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
