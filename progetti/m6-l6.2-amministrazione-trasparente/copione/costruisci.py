# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6): la sezione «Amministrazione trasparente». D.Lgs. 33/2013 art. 9 (sezione nella home page,
# niente filtri ai motori di ricerca), art. 6 (qualita'), art. 7 (formato aperto), art. 8 c. 3 (5 anni dal
# 1 gennaio successivo, poi accesso civico), allegato A (sotto-sezioni); obblighi: artt. 13, 14, 15 (efficacia
# degli incarichi di consulenza), 16, 19 (bandi di concorso, criteri e tracce), 20 (premi), 23, 26 (sopra
# 1.000 euro, efficacia), 29, 33, 35 c. 1 lett. m (potere sostitutivo); art. 41 (SSN: spese e pagamenti,
# incarichi di DG, DS, DA e di struttura, strutture accreditate, liste d'attesa); art. 7-bis (privacy, salute).
# Fonti: testo del D.Lgs. 33/2013 agg. 13/3/2017; dispensa CISL. Allegato A: versione originale, poi schemi ANAC.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Apri il sito della tua azienda sanitaria e scorri fino in fondo alla pagina. C'e' una voce che si chiama Amministrazione trasparente. Dietro quel collegamento c'e' quasi tutta la vita dell'azienda."),
 (1,"chiaro",0,"Organizzazione, personale, concorsi, incarichi, contratti, bilanci, pagamenti, tempi di attesa. Tutto con la stessa struttura, uguale per ogni amministrazione."),
 (1,"profondo",1.2,"Una sola porta d'ingresso per tutte le informazioni pubbliche."),

 (2,"chiaro",0.6,"Quattro passaggi. Le regole della sezione. La mappa delle sotto-sezioni. Gli obblighi specifici della sanita'. E il confine tra trasparenza e riservatezza dei dati personali."),

 (3,"chiaro",0.5,"L'articolo 9 del decreto 33 lo stabilisce: nella home page del sito istituzionale c'e' un'apposita sezione chiamata Amministrazione trasparente."),
 (3,"chiaro",0,"Li' si pubblicano dati, informazioni e documenti obbligatori. Si puo' anche mettere un collegamento a un'altra pagina del sito, per non duplicare le informazioni."),
 (3,"chiaro",0,"Le amministrazioni non possono mettere filtri o soluzioni tecniche che impediscano ai motori di ricerca di trovare i contenuti della sezione."),
 (3,"chiaro",0,"La struttura e' la stessa in ogni amministrazione. Chi ha imparato a cercare nel sito di un'azienda sanitaria sa cercare anche in quello di un comune o di un ministero."),
 (3,"chiaro",0,"I dati devono avere qualita': integri, aggiornati, completi, tempestivi, semplici da consultare e comprensibili. E la cura della qualita' non puo' giustificare un ritardo nella pubblicazione."),
 (3,"chiaro",0,"Vanno pubblicati in formato aperto, cosi' che chiunque possa riutilizzarli, con il solo obbligo di citare la fonte e di rispettarne l'integrita'."),
 (3,"chiaro",0,"Quanto restano online? Di regola cinque anni, a partire dal primo gennaio dell'anno successivo a quello in cui scatta l'obbligo, e comunque finche' gli atti producono effetti."),
 (3,"chiaro",0,"Dopo la scadenza i dati non spariscono dal diritto del cittadino: si possono ancora ottenere con una richiesta di accesso civico."),
 (3,"tenue",0.8,"Occhio a un distrattore: la durata ordinaria della pubblicazione non e' di un anno. E' di cinque anni, dal primo gennaio successivo."),
 (3,"profondo",1.2,"Una sezione in home page, dati aperti, cinque anni online."),

 (4,"chiaro",0.5,"La sezione ha una struttura fissa, fatta di sotto-sezioni. Il decreto la disegna in un allegato, poi aggiornato dagli schemi dell'autorita' anticorruzione, l'ANAC."),
 (4,"chiaro",0,"Organizzazione: gli organi di indirizzo e amministrazione, l'articolazione degli uffici con i dirigenti responsabili, l'organigramma, i telefoni, le caselle di posta elettronica e di posta certificata."),
 (4,"chiaro",0,"Consulenti e collaboratori: per ogni incarico, gli estremi dell'atto, il curriculum e il compenso. Senza pubblicazione l'incarico non diventa efficace e il compenso non si puo' pagare."),
 (4,"chiaro",0,"Personale: dotazione organica, costo del personale, tassi di assenza, incarichi autorizzati ai dipendenti, contratti collettivi e integrativi."),
 (4,"chiaro",0.6,"Un esempio che ti riguarda da vicino: la sotto-sezione Bandi di concorso. Qui si pubblicano i bandi, i criteri di valutazione della commissione e le tracce delle prove scritte."),
 (4,"chiaro",0,"Per chi prepara una selezione e' una risorsa preziosa: bandi precedenti, criteri e tracce aiutano a capire che cosa viene chiesto e come viene valutato."),
 (4,"chiaro",0,"Performance: i piani e le relazioni, l'ammontare dei premi stanziati e distribuiti e il grado di differenziazione nell'attribuzione, in forma aggregata."),
 (4,"chiaro",0,"Enti controllati: l'elenco degli enti vigilati, delle societa' partecipate e degli enti di diritto privato controllati, con i dati principali di ciascuno."),
 (4,"chiaro",0,"Poi i provvedimenti, i contratti e le gare, le sovvenzioni e i contributi, i bilanci preventivi e consuntivi, i beni immobili, i controlli e i rilievi della Corte dei conti."),
 (4,"chiaro",0,"Per le sovvenzioni sopra i mille euro la pubblicazione e' condizione di efficacia dell'atto. Anche qui, senza pubblicazione, il vantaggio economico non produce effetti."),
 (4,"chiaro",0,"E ancora: i tempi di pagamento dei fornitori, con l'indicatore annuale di tempestivita', e per ogni procedimento il nome del titolare del potere sostitutivo in caso di inerzia."),
 (4,"profondo",1.2,"Ogni voce del menu e' un obbligo di legge."),

 (5,"chiaro",0.5,"Per il servizio sanitario c'e' una norma dedicata, l'articolo 41. Aziende sanitarie territoriali, aziende ospedaliere ed enti del servizio sanitario rispettano tutti gli obblighi, piu' alcuni in aggiunta."),
 (5,"chiaro",0,"Primo: i dati su tutte le spese e tutti i pagamenti, distinti per tipo di lavoro, bene o servizio, consultabili in forma sintetica e aggregata anche per periodo e per beneficiario."),
 (5,"chiaro",0,"Secondo: le procedure di conferimento degli incarichi di direttore generale, sanitario e amministrativo, e di responsabile di dipartimento e di struttura semplice e complessa."),
 (5,"chiaro",0,"Si pubblicano i bandi e gli avvisi di selezione, lo svolgimento delle procedure e gli atti di conferimento. Chiunque puo' ricostruire come e' stato scelto un direttore."),
 (5,"chiaro",0,"Terzo: l'elenco delle strutture sanitarie private accreditate, aggiornato ogni anno, con gli accordi stipulati con loro."),
 (5,"chiaro",0,"Le Regioni, poi, inseriscono il rispetto degli obblighi di pubblicita' tra i requisiti per l'accreditamento delle strutture sanitarie."),
 (5,"chiaro",0.6,"Quarto, il piu' vicino ai cittadini: la sezione Liste di attesa. Criteri di formazione delle liste, tempi previsti e tempi medi effettivi per ogni tipo di prestazione."),
 (5,"chiaro",0,"E un dettaglio da ricordare: per la dirigenza sanitaria tra le attivita' professionali da pubblicare rientra anche la libera professione svolta in regime intramurario."),
 (5,"tenue",0.8,"Un distrattore frequente: le liste di attesa non sono un'informazione facoltativa. Tempi previsti e tempi medi effettivi sono un obbligo di legge."),
 (5,"profondo",1.2,"Spese, nomine, accreditati, liste d'attesa: la sanita' in vetrina."),

 (6,"chiaro",0.5,"Trasparenza non vuol dire esporre le persone. L'articolo 7-bis fissa i limiti che derivano dalla protezione dei dati personali."),
 (6,"chiaro",0,"I dati personali pubblicati per obbligo, esclusi quelli sensibili e giudiziari, si possono indicizzare e riutilizzare. Quelli pubblicati senza un obbligo vanno resi anonimi."),
 (6,"chiaro",0,"Nei documenti pubblicati vanno resi non intelligibili i dati personali non pertinenti, e i dati sensibili o giudiziari non indispensabili allo scopo."),
 (6,"chiaro",0,"Non si possono diffondere le notizie sulla natura delle malattie che causano le assenze. E restano fermi i limiti alla diffusione dei dati sulla salute."),
 (6,"chiaro",0,"Lo stesso per i contributi: non si pubblicano i dati che permettono di identificare chi li riceve, se da quei dati si ricavano lo stato di salute o una situazione di disagio economico o sociale."),
 (6,"tenue",0.8,"Attenzione: pubblicare il tasso di assenza di un ufficio e' un obbligo. Pubblicare la malattia di un collega e' vietato."),
 (6,"profondo",1.2,"Trasparenza sull'amministrazione, rispetto per le persone."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: la sezione Amministrazione trasparente sta nella home page; i dati sono aperti e restano online di regola cinque anni, dal primo gennaio successivo."),
 (7,"chiaro",0.8,"La seconda: le sotto-sezioni coprono organizzazione, personale, bandi di concorso, performance, contratti, bilanci e pagamenti; per consulenze e sovvenzioni la pubblicazione e' condizione di efficacia."),
 (7,"chiaro",0.8,"La terza: l'articolo 41 impone alle aziende sanitarie di pubblicare spese e pagamenti, le nomine dei direttori, le strutture accreditate e le liste di attesa."),
 (7,"tenue",0.8,"L'ultimo distrattore: la trasparenza non autorizza a pubblicare i dati sanitari delle persone. Il limite della riservatezza resta sempre."),

 (8,"profondo",0,"[warm] In sintesi: una sezione, una mappa, obblighi precisi, e un confine chiaro con la privacy. Nella prossima lezione: come si chiede un dato che non e' stato pubblicato."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'La sezione e le sue regole', 4: 'La mappa delle sotto-sezioni', 5: "Gli obblighi della sanita'", 6: 'Trasparenza e riservatezza', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
