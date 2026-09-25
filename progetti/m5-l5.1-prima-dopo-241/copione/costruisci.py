# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 5.1 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M5): prima e dopo la L. 241/1990. L'amministrazione autoreferenziale e il segreto
# d'ufficio come regola; la svolta del 7 agosto 1990 (titolo, obiettivi: provvedimento espresso,
# responsabile, partecipazione, accesso); art. 28 (segreto d'ufficio riscritto); art. 22 c. 2;
# art. 29 (ambito, livelli essenziali, garanzie non inferiori per regioni ed enti); le riforme
# (L. 15/2005, L. 69/2009, L. 190/2012). Fonti: testo della L. 241/1990 (agg. 2019); dispensa CISL FP.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Immagina di presentare una domanda a un ufficio pubblico, prima del 1990. Non sai chi la segue, non sai quanto ci vorra', non puoi vedere le carte. E se arriva un no, spesso non sai nemmeno perche'."),
 (1,"chiaro",0,"Oggi quella stessa domanda ha un responsabile con nome e cognome, un termine per la risposta, un diritto di partecipare e di vedere i documenti. In mezzo c'e' una legge: la 241 del 1990."),
 (1,"profondo",1.2,"Da suddito che aspetta, a cittadino che ha dei diritti."),

 (2,"chiaro",0,"Quattro passaggi. Com'era l'amministrazione prima. Che cosa ha cambiato la legge del 1990. Dove si applica, anche nelle aziende sanitarie. E come e' cambiata negli anni."),

 (3,"chiaro",0,"Prima della 241 non esisteva una legge generale sul modo di procedere della pubblica amministrazione. Ogni ufficio seguiva le sue regole, spesso non scritte e poco conoscibili."),
 (3,"chiaro",0,"Si parla di amministrazione autoreferenziale: un apparato che guardava soprattutto a se stesso, alle proprie procedure e ai propri tempi, piu' che al cittadino che aveva davanti."),
 (3,"chiaro",0,"La regola era il segreto d'ufficio. I documenti restavano chiusi negli archivi e l'impiegato non poteva rivelarli: la conoscenza delle carte era l'eccezione, non il principio."),
 (3,"chiaro",0,"Il cittadino, in questo schema, era piu' un destinatario che un interlocutore. Riceveva le decisioni, ma non partecipava alla loro formazione e spesso non ne conosceva le ragioni."),
 (3,"chiaro",0,"Non c'era nemmeno un obbligo generale di rispondere entro un tempo certo. Una domanda poteva restare ferma a lungo, senza una data di scadenza a cui appellarsi."),
 (3,"chiaro",0,"E anche chi lavorava negli uffici non aveva strumenti per rendere conto del proprio lavoro: senza tempi e senza responsabili, anche l'impiegato piu' scrupoloso restava invisibile."),
 (3,"tenue",0,"Attenzione a non esagerare: anche prima del 1990 la Costituzione, all'articolo 97, chiedeva buon andamento e imparzialita'. Mancava pero' una legge che dicesse come realizzarli, passo dopo passo."),
 (3,"profondo",1.2,"Un'amministrazione chiusa, che parlava a se stessa."),

 (4,"chiaro",0,"Il 7 agosto 1990 arriva la legge numero 241: nuove norme in materia di procedimento amministrativo e di diritto di accesso ai documenti amministrativi. Due parti, un solo obiettivo."),
 (4,"chiaro",0,"Il primo cambio: il procedimento deve concludersi con un provvedimento espresso, entro un termine. Il silenzio non e' piu' una risposta neutra: e' un ritardo di cui qualcuno risponde."),
 (4,"chiaro",0,"Il secondo: per ogni procedimento c'e' un responsabile. Il cittadino sa a chi rivolgersi, e l'amministrazione sa chi deve portare avanti la pratica."),
 (4,"chiaro",0,"Il terzo: la partecipazione. Chi e' coinvolto riceve la comunicazione di avvio, puo' presentare memorie e documenti, e l'amministrazione ha l'obbligo di valutarli."),
 (4,"chiaro",0,"Un esempio: chi chiede un'autorizzazione e rischia un no puo' ora dire la sua prima della decisione, portando documenti e argomenti che l'ufficio deve considerare."),
 (4,"chiaro",0,"Il quarto: l'obbligo di motivare. Ogni provvedimento deve spiegare i fatti e le ragioni giuridiche della decisione. Una decisione senza ragioni non e' piu' accettabile."),
 (4,"chiaro",0,"Il quinto: il diritto di accesso. La legge lo definisce principio generale dell'attivita' amministrativa, per favorire la partecipazione e assicurarne imparzialita' e trasparenza."),
 (4,"chiaro",0,"E il segreto d'ufficio viene riscritto. Resta vietato dare informazioni a chi non ne ha diritto, ma fuori dai casi previsti dalle norme sull'accesso. Il segreto diventa un limite, non la regola."),
 (4,"tenue",0,"Occhio a un distrattore: la 241 non ha abolito il segreto d'ufficio. Lo ha ridimensionato. Resta il dovere di riservatezza, dentro i confini fissati dalle norme sull'accesso."),
 (4,"profondo",1.2,"Tempi certi, un responsabile, il diritto di partecipare e di sapere."),

 (5,"chiaro",0,"Dove si applica la 241? Direttamente alle amministrazioni statali e agli enti pubblici nazionali, e alle societa' a capitale pubblico per le loro funzioni amministrative."),
 (5,"chiaro",0,"Le regioni e gli enti locali regolano la materia con proprie norme, ma nel rispetto delle garanzie della legge. Alcune regole, come il risarcimento del danno da ritardo, valgono per tutte le amministrazioni."),
 (5,"chiaro",0,"Il punto chiave e' l'articolo 29. Alcuni obblighi sono livelli essenziali delle prestazioni, validi in tutta Italia: garantire la partecipazione, individuare un responsabile, concludere entro il termine, assicurare l'accesso."),
 (5,"chiaro",0,"E ancora: la durata massima dei procedimenti, la segnalazione certificata di inizio attivita', il silenzio assenso e la conferenza di servizi. Anche questi sono livelli essenziali."),
 (5,"chiaro",0,"Regioni ed enti locali non possono scendere sotto queste garanzie. Possono pero' prevedere livelli ulteriori di tutela per i cittadini."),
 (5,"chiaro",0,"Le aziende sanitarie sono enti del servizio sanitario regionale, e sono pienamente dentro questo sistema. Ogni pratica che le riguarda, dall'istanza di un utente a un procedimento sul personale, segue queste regole."),
 (5,"chiaro",0,"Un esempio concreto: un dipendente chiede un trasferimento o una aspettativa. C'e' un ufficio responsabile, un termine per rispondere e, se la risposta e' negativa, una motivazione."),
 (5,"chiaro",0,"In pratica, ogni azienda sanitaria elenca i propri tipi di procedimento, con l'ufficio responsabile e il termine di conclusione, e rende pubbliche queste informazioni."),
 (5,"tenue",0,"Attenzione: la 241 non riguarda solo i cittadini esterni. Anche il dipendente pubblico, quando presenta un'istanza alla propria azienda, e' titolare delle stesse garanzie."),
 (5,"profondo",1.2,"Garanzie minime uguali in tutta Italia, anche nelle aziende sanitarie."),

 (6,"chiaro",0,"La 241 non e' rimasta ferma al 1990. E' stata modificata molte volte, e chi studia per una prova deve conoscere le tappe principali."),
 (6,"chiaro",0,"Nel 2005 la legge 15 ha rafforzato i principi, aggiungendo tra l'altro la trasparenza nell'articolo 1 e il preavviso di rigetto, e ha disciplinato l'efficacia e l'invalidita' del provvedimento."),
 (6,"chiaro",0,"Nel 2009 la legge 69 ha riscritto i termini del procedimento e ha introdotto il risarcimento del danno da ritardo."),
 (6,"chiaro",0,"Nel 2012 la legge anticorruzione, la 190, ha aggiunto l'obbligo di astensione in caso di conflitto di interessi. Nello stesso anno sono arrivati i poteri sostitutivi contro l'inerzia."),
 (6,"chiaro",0,"La riforma Madia del 2015 e i suoi decreti attuativi hanno riscritto la conferenza di servizi e rivisto la segnalazione certificata di inizio attivita'."),
 (6,"chiaro",0,"Nel 2020 il decreto semplificazioni ha scritto che i rapporti tra cittadino e amministrazione sono improntati ai principi della collaborazione e della buona fede."),
 (6,"chiaro",0,"Per questo, quando studi, controlla sempre di avere il testo aggiornato. Molte dispense e molti quiz girano ancora con versioni vecchie della legge."),
 (6,"tenue",0,"Un errore diffuso: pensare che la trasparenza sia scritta nell'articolo 97 della Costituzione. L'articolo 97 parla di buon andamento e imparzialita'. La trasparenza e' nell'articolo 1 della 241."),
 (6,"profondo",1.2,"Una legge che cresce con l'amministrazione, riforma dopo riforma."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: la legge 241 e' del 7 agosto 1990 e regola il procedimento amministrativo e il diritto di accesso ai documenti amministrativi."),
 (7,"chiaro",0,"La seconda: le sue novita'. Provvedimento espresso entro un termine, un responsabile del procedimento, la partecipazione, la motivazione e l'accesso come principio generale."),
 (7,"chiaro",0,"La terza: per l'articolo 29 partecipazione, responsabile, termine e accesso sono livelli essenziali. Regioni ed enti possono dare piu' garanzie, non meno."),
 (7,"tenue",0,"L'ultimo distrattore: la 241 non ha eliminato il segreto d'ufficio. L'ha trasformato da regola generale a limite, dentro le norme sull'accesso."),

 (8,"profondo",0,"[warm] In sintesi: dall'ufficio chiuso all'amministrazione che risponde, spiega e si lascia vedere. Nella prossima lezione: i principi cardine della legge."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "L'amministrazione di prima", 4: 'La svolta del 1990', 5: 'Dove si applica', 6: 'Una legge viva', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
