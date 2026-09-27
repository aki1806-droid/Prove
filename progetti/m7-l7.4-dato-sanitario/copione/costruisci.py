# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 7.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M7): categorie particolari e dato sanitario. GDPR art. 4 n. 13-15 (dati genetici, biometrici, relativi
# alla salute), art. 9 par. 1 (divieto), par. 2 lett. a-j (eccezioni), par. 3 (segreto professionale), par. 4;
# art. 10 (dati giudiziari). Codice: artt. 2-sexies (interesse pubblico rilevante), 2-septies (misure di
# garanzia; divieto di diffusione dei dati sulla salute), 82 (emergenze). Garante: chiarimenti 7/3/2019 sul
# consenso in sanita'; linee guida dossier 2015; FSE: D.L. 179/2012 art. 12, D.L. 34/2020 (da verificare).
# Fonti: GDPR, testo del Garante (ed. 2017); dispense su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'operatrice apre la cartella di un vicino di casa, ricoverato in un altro reparto. Non lo segue, non lo cura: vuole solo sapere come sta. Nessuno la vede. O forse si'."),
 (1,"chiaro",0,"Ogni accesso ai sistemi clinici lascia una traccia. E quel gesto, fatto per curiosita', tocca la categoria di dati che il regolamento protegge di piu': i dati sulla salute."),
 (1,"profondo",1.2,"Alcuni dati raccontano la parte piu' fragile di una persona."),

 (2,"chiaro",0.6,"Quattro passaggi. Il divieto dell'articolo 9. Le eccezioni che lo rendono superabile. Il dato sanitario in azienda, tra cura e segreto. E poi dossier, fascicolo sanitario e accessi."),

 (3,"chiaro",0.5,"L'articolo 9 del regolamento parte da un divieto. E' vietato trattare le categorie particolari di dati personali, quelle che un tempo si chiamavano dati sensibili."),
 (3,"chiaro",0,"Sono i dati che rivelano l'origine razziale o etnica, le opinioni politiche, le convinzioni religiose o filosofiche, l'appartenenza sindacale."),
 (3,"chiaro",0,"E poi i dati genetici, i dati biometrici usati per identificare una persona in modo univoco, i dati relativi alla salute, alla vita sessuale o all'orientamento sessuale."),
 (3,"chiaro",0,"Perche' una tutela rafforzata? Perche' da questi dati possono nascere discriminazioni, esclusioni, danni difficili da riparare. Lavoro, relazioni, reputazione."),
 (3,"chiaro",0,"Il dato relativo alla salute e' definito in modo ampio: riguarda la salute fisica o mentale, compresa la prestazione di servizi sanitari. Anche sapere che una persona e' ricoverata in oncologia e' un dato sulla salute."),
 (3,"chiaro",0,"Attenzione ai dati del personale: un certificato di malattia, un giudizio di idoneita' con limitazioni, una richiesta di permessi per assistere un familiare disabile sono dati sulla salute."),
 (3,"chiaro",0,"I dati su condanne penali e reati non sono tra questi: hanno una disciplina propria, nell'articolo 10 del regolamento e nel Codice."),
 (3,"tenue",0.8,"Occhio a un distrattore: il dato sanitario non e' solo la diagnosi. Anche un appuntamento in un ambulatorio specialistico puo' rivelare lo stato di salute."),
 (3,"profondo",1.2,"Prima il divieto, poi le eccezioni, sempre precise."),

 (4,"chiaro",0.5,"Il divieto non vale in dieci casi, elencati nel paragrafo 2. Per chi lavora in sanita' alcuni sono decisivi."),
 (4,"chiaro",0,"Il primo e' il consenso esplicito dell'interessato, per finalita' specifiche. Esplicito, non solo inequivocabile: un gradino in piu' rispetto ai dati comuni."),
 (4,"chiaro",0,"Poi gli obblighi in materia di lavoro e sicurezza sociale; l'interesse vitale di una persona incapace di dare il consenso; l'accertamento o la difesa di un diritto in giudizio."),
 (4,"chiaro",0,"Poi l'interesse pubblico rilevante, sulla base del diritto dell'Unione o dello Stato, con misure appropriate e specifiche per le persone."),
 (4,"chiaro",0,"E la lettera h: medicina preventiva e del lavoro, diagnosi, assistenza o terapia sanitaria o sociale, gestione dei sistemi e servizi sanitari. E' la base della cura."),
 (4,"chiaro",0,"Seguono la sanita' pubblica, come la protezione da gravi minacce per la salute, e la ricerca scientifica, l'archiviazione e la statistica, con garanzie adeguate."),
 (4,"chiaro",0,"Per la lettera h il paragrafo 3 aggiunge una condizione: i dati devono essere trattati da un professionista soggetto al segreto professionale, o sotto la sua responsabilita', o da un'altra persona tenuta alla segretezza."),
 (4,"chiaro",0,"E il paragrafo 4 lascia agli Stati la possibilita' di prevedere ulteriori condizioni per i dati genetici, biometrici e sulla salute. L'Italia l'ha fatto nel Codice."),
 (4,"chiaro",0,"Anche l'appartenenza sindacale e' una categoria particolare. La trattenuta della quota in busta paga passa per l'ufficio del personale, che la tratta con la stessa riservatezza."),
 (4,"tenue",0.8,"Un distrattore frequente: per le categorie particolari il consenso non e' la sola via. E' una delle eccezioni, e in sanita' non e' quella principale."),
 (4,"profondo",1.2,"La cura e' un'eccezione prevista, non un favore concesso."),

 (5,"chiaro",0.5,"Ecco perche' in ospedale non si chiede il consenso privacy per curare. Diagnosi, assistenza e terapia poggiano sulla lettera h, con le garanzie del segreto. Lo ha chiarito il Garante nel 2019."),
 (5,"chiaro",0,"Il consenso resta necessario per attivita' non indispensabili alla cura: per esempio alcuni servizi facoltativi, come certe applicazioni o la consegna dei referti online, o iniziative promozionali."),
 (5,"chiaro",0,"Il Codice aggiunge le sue regole. L'articolo 2-sexies elenca i trattamenti di interesse pubblico rilevante, tra cui i compiti del servizio sanitario nazionale."),
 (5,"chiaro",0,"L'articolo 2-septies affida al Garante misure di garanzia per dati genetici, biometrici e sanitari. E fissa un divieto netto: i dati sulla salute non possono essere diffusi."),
 (5,"chiaro",0,"Il segreto non riguarda solo medici e infermieri. Chi lavora in amministrazione, all'accettazione o nei servizi tratta gli stessi dati, ed e' tenuto al segreto d'ufficio."),
 (5,"chiaro",0,"Nelle sale d'attesa si chiamano i pazienti senza rivelare la malattia, per esempio con un numero. E i referti si consegnano all'interessato o a una persona da lui delegata."),
 (5,"chiaro",0.6,"Un esempio: un familiare telefona in reparto per sapere come sta un paziente. Le informazioni si danno solo alle persone che il paziente ha indicato, non a chiunque chieda."),
 (5,"chiaro",0,"E nelle emergenze? La cura viene prima: l'informativa puo' essere data anche dopo la prestazione, quando la persona e' in grado di riceverla."),
 (5,"tenue",0.8,"Attenzione: il modulo firmato all'accettazione non e' cio' che rende lecita la cura. E' la legge, con il segreto professionale."),
 (5,"profondo",1.2,"Curare senza chiedere il consenso, proteggere senza eccezioni."),

 (6,"chiaro",0.5,"Due strumenti digitali rendono tutto piu' concreto. Il dossier sanitario raccoglie gli eventi clinici di un paziente all'interno della stessa azienda."),
 (6,"chiaro",0,"Secondo le linee guida del Garante, il dossier si costituisce con il consenso del paziente, specifico e facoltativo. Chi non lo da' viene curato lo stesso."),
 (6,"chiaro",0,"Il fascicolo sanitario elettronico, invece, raccoglie la storia clinica di una persona tra strutture diverse. Dal 2020 si alimenta senza consenso; il consenso serve per la consultazione da parte dei professionisti."),
 (6,"chiaro",0,"Il fascicolo e' gestito dalle regioni e collegato a livello nazionale. L'assistito puo' consultarlo online: referti, lettere di dimissione, vaccinazioni."),
 (6,"chiaro",0,"In entrambi il paziente puo' chiedere l'oscuramento di alcuni eventi: restano nella documentazione, ma non sono visibili a tutti."),
 (6,"chiaro",0,"E soprattutto: gli accessi sono tracciati. Il sistema registra chi ha aperto cosa e quando, e le registrazioni si possono controllare."),
 (6,"chiaro",0,"Torniamo all'operatrice curiosa. Il suo accesso non ha una finalita' di cura: e' un trattamento illecito, puo' essere un illecito disciplinare e, nei casi piu' gravi, un reato."),
 (6,"tenue",0.8,"Attenzione: avere le credenziali non significa avere il diritto di consultare. Si accede solo ai pazienti che si seguono, per il tempo necessario."),
 (6,"profondo",1.2,"Ogni accesso lascia una traccia, ogni traccia chiede una ragione."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: l'articolo 9 vieta di trattare le categorie particolari, tra cui i dati sulla salute, genetici e biometrici, salvo dieci eccezioni."),
 (7,"chiaro",0.8,"La seconda: la cura si fonda sulla lettera h, con il segreto professionale del paragrafo 3, non sul consenso. Il consenso esplicito serve per attivita' non necessarie alla cura."),
 (7,"chiaro",0.8,"La terza: i dati sulla salute non si diffondono; il dossier richiede il consenso, il fascicolo si alimenta senza; gli accessi sono tracciati e solo chi cura puo' consultare."),
 (7,"tenue",0.8,"L'ultimo distrattore: l'obbligo di riservatezza non e' solo del personale sanitario. Vale per chiunque, in azienda, tratti quei dati."),

 (8,"profondo",0,"[warm] In sintesi: un divieto forte, eccezioni precise, un segreto che vale per tutti. Nella prossima lezione: i diritti dell'interessato."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il divieto', 4: 'Le eccezioni', 5: 'Il dato sanitario in azienda', 6: 'Dossier, fascicolo, accessi', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
