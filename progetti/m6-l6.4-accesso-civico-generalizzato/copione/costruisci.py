# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6): l'accesso civico generalizzato (FOIA). D.Lgs. 33/2013 art. 5 c. 2 (chiunque, dati ulteriori
# rispetto a quelli da pubblicare; controllo diffuso e partecipazione), c. 3-4 (niente motivazione, gratuito),
# c. 5 (controinteressati: 10 giorni, termine sospeso), c. 6 (30 giorni, motivazione con riferimento al 5-bis,
# trasmissione non prima di 15 giorni dopo l'opposizione), c. 7 (riesame RPCT 20 giorni; Garante privacy 10 giorni),
# c. 8 (difensore civico per regioni ed enti locali), c. 9; art. 5-bis c. 1 (interessi pubblici), c. 2 (dati
# personali, corrispondenza, interessi economici e commerciali), c. 3 (eccezioni assolute), c. 4 (accesso parziale),
# c. 5 (differimento), c. 6 (linee guida ANAC d'intesa con il Garante, delibera 1309/2016); art. 46 c. 1.
# Fonti: D.Lgs. 33/2013 agg. 13/3/2017.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un giornalista chiede alla tua azienda sanitaria quante prestazioni sono state rinviate in un anno. Il dato non e' tra quelli da pubblicare, e lui non ha un interesse personale. Deve comunque ricevere una risposta?"),
 (1,"chiaro",0,"Si'. Dal 2016 esiste un diritto di accesso a tutti i dati e i documenti detenuti dall'amministrazione, anche oltre gli obblighi di pubblicazione. E' l'accesso civico generalizzato, il FOIA italiano."),
 (1,"profondo",1.2,"La regola e' la conoscibilita', il rifiuto e' l'eccezione."),

 (2,"chiaro",0.6,"Quattro passaggi. La portata del diritto. La procedura, con i controinteressati e i tempi. I limiti, relativi e assoluti. E il bilanciamento con la protezione dei dati personali."),

 (3,"chiaro",0.5,"L'articolo 5, comma 2, del decreto 33: chiunque ha diritto di accedere ai dati e ai documenti detenuti dalle pubbliche amministrazioni, ulteriori rispetto a quelli oggetto di pubblicazione."),
 (3,"chiaro",0,"Lo scopo e' dichiarato: favorire forme diffuse di controllo sulle funzioni istituzionali e sull'uso delle risorse pubbliche, e promuovere la partecipazione al dibattito pubblico."),
 (3,"chiaro",0,"Come per l'accesso civico semplice, non ci sono limiti di legittimazione: chiunque puo' chiedere. E la richiesta non deve essere motivata."),
 (3,"chiaro",0,"E' una svolta culturale: l'amministrazione non chiede piu' perche' vuoi sapere. Deve spiegare lei perche', eventualmente, non puo' darti quel dato."),
 (3,"chiaro",0,"Il rilascio e' gratuito, salvo il rimborso del costo effettivamente sostenuto per riprodurre i documenti su supporti materiali."),
 (3,"chiaro",0,"L'oggetto sono dati e documenti che l'amministrazione detiene gia'. Non si puo' pretendere che l'amministrazione crei documenti nuovi o faccia elaborazioni apposta per rispondere."),
 (3,"chiaro",0.6,"Un esempio: una associazione di pazienti chiede il numero di interventi eseguiti da un reparto in un anno, se il dato esiste gia' nei sistemi aziendali. E' una richiesta tipica di accesso generalizzato."),
 (3,"tenue",0.8,"Occhio a un distrattore: il FOIA non e' limitato ai dati a pubblicazione obbligatoria. Quello e' l'accesso civico semplice; il generalizzato va oltre."),
 (3,"profondo",1.2,"Tutto cio' che l'amministrazione detiene, salvo limiti precisi."),

 (4,"chiaro",0.5,"La richiesta si presenta, anche per via telematica, all'ufficio che detiene i dati, all'ufficio relazioni con il pubblico o a un altro ufficio indicato nella sezione Amministrazione trasparente."),
 (4,"chiaro",0,"Non serve un modulo obbligatorio: basta indicare con chiarezza i dati o i documenti richiesti. Una richiesta troppo generica puo' essere precisata insieme al richiedente."),
 (4,"chiaro",0,"Se ci sono controinteressati, cioe' persone i cui interessi privati potrebbero essere lesi, l'amministrazione li informa con raccomandata o per via telematica."),
 (4,"chiaro",0,"I controinteressati hanno dieci giorni per presentare una motivata opposizione. Nel frattempo il termine per rispondere resta sospeso."),
 (4,"chiaro",0,"Il procedimento si conclude in trenta giorni con un provvedimento espresso e motivato. Rifiuto, differimento e limitazione devono indicare quale limite della legge si applica."),
 (4,"chiaro",0,"Se l'accesso e' accolto nonostante l'opposizione, i dati non si trasmettono subito: devono passare almeno quindici giorni dalla comunicazione al controinteressato, per permettergli di reagire."),
 (4,"chiaro",0,"Contro il diniego, anche parziale, o contro il silenzio, il richiedente puo' chiedere il riesame all'RPCT, che decide entro venti giorni. Poi c'e' il ricorso al giudice amministrativo."),
 (4,"chiaro",0,"Per gli atti di regioni ed enti locali ci si puo' rivolgere anche al difensore civico. E il controinteressato, a sua volta, puo' chiedere il riesame se l'accesso viene concesso."),
 (4,"tenue",0.8,"Attenzione: nel FOIA il silenzio non vale come accoglimento e non chiude la partita. Si attiva il riesame dell'RPCT, e poi il giudice."),
 (4,"profondo",1.2,"Dieci giorni per opporsi, trenta per decidere, venti per il riesame."),

 (5,"chiaro",0.5,"I limiti sono nell'articolo 5-bis. Il primo gruppo protegge interessi pubblici: l'accesso si rifiuta se serve a evitare un pregiudizio concreto a uno di questi interessi."),
 (5,"chiaro",0,"Sono la sicurezza e l'ordine pubblico, la sicurezza nazionale, la difesa, le relazioni internazionali, la stabilita' finanziaria ed economica dello Stato, le indagini sui reati, le attivita' ispettive."),
 (5,"chiaro",0,"Il secondo gruppo protegge interessi privati: la protezione dei dati personali, la liberta' e la segretezza della corrispondenza, gli interessi economici e commerciali, compresi proprieta' intellettuale e segreti commerciali."),
 (5,"chiaro",0,"In un'azienda sanitaria, per esempio, possono entrare in gioco gli interessi commerciali dei fornitori, come i segreti industriali contenuti in un'offerta di gara."),
 (5,"chiaro",0,"Questi sono limiti relativi: non basta che l'interesse sia coinvolto, serve un pregiudizio concreto. L'amministrazione deve valutare caso per caso."),
 (5,"chiaro",0,"Poi ci sono le eccezioni assolute: il segreto di Stato, gli altri divieti di divulgazione previsti dalla legge e i casi di esclusione della legge 241. Qui non c'e' bilanciamento: l'accesso e' escluso."),
 (5,"chiaro",0,"E due regole di proporzione. Se il limite riguarda solo una parte del documento, si concede l'accesso al resto. E se basta rinviare nel tempo, l'accesso non si nega: si differisce."),
 (5,"tenue",0.8,"Un distrattore frequente: la presenza di un limite non comporta automaticamente il rifiuto. Prima vanno valutati l'accesso parziale e il differimento."),
 (5,"profondo",1.2,"Limiti relativi da pesare, eccezioni assolute da rispettare."),

 (6,"chiaro",0.5,"In sanita' il limite piu' frequente e' la protezione dei dati personali. Molti documenti contengono nomi, condizioni di salute, dati di dipendenti e pazienti."),
 (6,"chiaro",0,"Quando l'amministrazione nega l'accesso per tutelare i dati personali e il richiedente chiede il riesame, l'RPCT deve sentire il Garante per la protezione dei dati personali."),
 (6,"chiaro",0,"Il Garante si pronuncia entro dieci giorni, e per quel periodo il termine per decidere il riesame resta sospeso."),
 (6,"chiaro",0.6,"Un esempio: il dato aggregato sul numero di interventi di un reparto si puo' dare. L'elenco dei pazienti operati, con i loro nomi, no: prevale la tutela dei dati sanitari."),
 (6,"chiaro",0,"Spesso la soluzione sta nel mezzo: si oscurano i dati personali e si concede il resto del documento. E' l'accesso parziale, che la legge impone di considerare."),
 (6,"chiaro",0,"Chi lavora in un ufficio che riceve una richiesta deve quindi chiedersi due cose: il dato esiste gia'? E ci sono persone da tutelare, da informare come controinteressati?"),
 (6,"chiaro",0,"Le indicazioni operative sono nelle linee guida dell'ANAC, adottate d'intesa con il Garante per la protezione dei dati personali, con la delibera 1309 del 2016."),
 (6,"chiaro",0,"E attenzione alle responsabilita': negare o limitare l'accesso fuori dai casi previsti dall'articolo 5-bis e' elemento di valutazione della responsabilita' dirigenziale."),
 (6,"tenue",0.8,"Attenzione: il FOIA non e' uno strumento per ottenere dati sanitari di altre persone. La privacy resta un limite forte, soprattutto in sanita'."),
 (6,"profondo",1.2,"Aprire i dati dell'amministrazione, proteggere le persone."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: l'accesso civico generalizzato spetta a chiunque, senza motivazione, su dati e documenti detenuti dall'amministrazione, ulteriori rispetto a quelli da pubblicare."),
 (7,"chiaro",0.8,"La seconda: i controinteressati hanno dieci giorni per opporsi; la risposta arriva in trenta giorni; contro il diniego o il silenzio c'e' il riesame dell'RPCT in venti giorni, poi il giudice."),
 (7,"chiaro",0.8,"La terza: i limiti relativi dell'articolo 5-bis, pubblici e privati, richiedono un pregiudizio concreto; le eccezioni assolute escludono l'accesso; prima del rifiuto si valutano accesso parziale e differimento."),
 (7,"tenue",0.8,"L'ultimo distrattore: nel FOIA non si deve spiegare perche' si chiede un dato. La motivazione e' richiesta solo nell'accesso documentale."),

 (8,"profondo",0,"[warm] In sintesi: conoscere e' la regola, i limiti sono precisi, la privacy si protegge. Nell'ultima lezione del modulo: chi vigila sulla trasparenza e che cosa si rischia."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'La portata', 4: 'La procedura', 5: 'I limiti', 6: 'Il bilanciamento con la privacy', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
