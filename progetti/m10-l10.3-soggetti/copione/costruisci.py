# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 10.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M10): i soggetti. D.Lgs. 36/2023 allegato I.1 (stazione appaltante, ente concedente, centrale di
# committenza, operatore economico); art. 15 e allegato I.2 (RUP, responsabile unico del progetto; responsabili
# di fase; struttura di supporto fino all'1%); art. 16 (conflitto di interesse); artt. 62-63 e allegato II.4
# (qualificazione delle stazioni appaltanti; elenco ANAC; soglie per procedere da sole); art. 65 (operatori
# economici); D.L. 66/2014 art. 9 (soggetti aggregatori, Consip, DPCM categorie merceologiche); ANAC
# (vigilanza, BDNCP, fascicolo virtuale dell'operatore economico); art. 215 (collegio consultivo tecnico);
# giudice amministrativo sulla procedura. Azienda Zero soggetto aggregatore per la sanita' veneta: da verificare.
# Fonti: dispense su Drive (con correzioni); testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'azienda sanitaria ha bisogno di guanti monouso per tutti i reparti. Deve fare una gara da sola, o puo' comprarli attraverso qualcun altro che ha gia' fatto la gara per molte aziende?"),
 (1,"chiaro",0,"Nella maggior parte dei casi la risposta e': attraverso qualcun altro. Per capirlo bisogna conoscere i soggetti del sistema degli appalti, e quello che ciascuno puo' fare."),
 (1,"profondo",1.2,"Ogni gara ha i suoi protagonisti, con ruoli precisi."),

 (2,"chiaro",0.6,"Quattro passaggi. Le stazioni appaltanti e il responsabile unico del progetto. Gli operatori economici. Le centrali di committenza e i soggetti aggregatori. E chi controlla e sostiene il sistema."),

 (3,"chiaro",0.5,"La stazione appaltante e' il soggetto che affida il contratto: amministrazioni dello Stato, regioni, enti locali, aziende sanitarie, organismi di diritto pubblico e altri enti obbligati."),
 (3,"chiaro",0,"Per le concessioni si parla di ente concedente. In entrambi i casi e' il committente pubblico, che decide che cosa acquistare, come farlo e a quali condizioni."),
 (3,"chiaro",0,"Con il codice del 2023 le stazioni appaltanti devono essere qualificate per gestire le procedure piu' complesse. La qualificazione dipende da personale, esperienza e strumenti digitali."),
 (3,"chiaro",0,"Senza qualificazione un'amministrazione puo' procedere da sola solo per gli affidamenti diretti e per i lavori di importo piu' basso. Oltre, deve rivolgersi a una stazione qualificata."),
 (3,"chiaro",0,"Per ogni procedura la stazione appaltante nomina un responsabile unico del progetto, il RUP. Segue il contratto in tutte le fasi: programmazione, progettazione, affidamento ed esecuzione."),
 (3,"chiaro",0,"Il RUP e' un dipendente della stazione appaltante, con competenze adeguate. Si possono nominare responsabili di singole fasi, ma il RUP resta unico e coordina."),
 (3,"chiaro",0,"Il RUP puo' avere una struttura di supporto e, per incarichi di assistenza, il codice consente di destinare fino all'uno per cento dell'importo posto a base di gara."),
 (3,"chiaro",0,"Chiunque partecipi alla procedura deve evitare i conflitti di interesse. Se ha un interesse personale che puo' minacciare la sua imparzialita', lo dichiara e si astiene."),
 (3,"tenue",0.8,"Occhio a un distrattore: RUP oggi significa responsabile unico del progetto, non del procedimento. Il codice del 2023 ha cambiato il nome per sottolineare il risultato."),
 (3,"profondo",1.2,"Un solo responsabile, dall'idea al collaudo."),

 (4,"chiaro",0.5,"Dall'altra parte ci sono gli operatori economici: chiunque offra sul mercato lavori, forniture o servizi. Imprese individuali, societa', cooperative, consorzi, professionisti."),
 (4,"chiaro",0,"Possono partecipare anche insieme, riunendosi in raggruppamenti temporanei o in consorzi. Vedremo in una lezione dedicata come funzionano e chi risponde di che cosa."),
 (4,"chiaro",0,"Per partecipare, l'operatore deve avere requisiti di ordine generale, cioe' di affidabilita' morale, e requisiti speciali di capacita', legati all'oggetto del contratto."),
 (4,"chiaro",0,"I dati dell'impresa, come certificati, regolarita' contributiva e fiscale, stanno in un fascicolo digitale gestito dall'Autorita' anticorruzione, consultato dalle stazioni appaltanti."),
 (4,"chiaro",0,"Il codice vuole favorire anche le piccole e medie imprese: per esempio dividendo gli appalti in lotti, quando e' possibile, e motivando la scelta quando non lo si fa."),
 (4,"chiaro",0,"Gli operatori stranieri dell'Unione europea partecipano alle stesse condizioni delle imprese italiane: la parita' di trattamento e' uno dei cardini delle direttive."),
 (4,"chiaro",0.6,"Un esempio: un'azienda sanitaria divide la gara per la manutenzione in lotti per territorio. Cosi' possono partecipare anche imprese locali piu' piccole, non solo i grandi gruppi."),
 (4,"tenue",0.8,"Attenzione: operatore economico non vuol dire solo grande impresa. Anche un professionista o una piccola cooperativa sono operatori economici."),
 (4,"profondo",1.2,"Un mercato aperto e' la prima garanzia di prezzi giusti."),

 (5,"chiaro",0.5,"Per comprare meglio e spendere meno, gli acquisti vengono aggregati. La centrale di committenza fa le gare per conto di altre amministrazioni, o mette a disposizione contratti gia' pronti."),
 (5,"chiaro",0,"La centrale nazionale e' Consip, che gestisce convenzioni, accordi quadro e il mercato elettronico della pubblica amministrazione, dove si fanno ordini e richieste di offerta."),
 (5,"chiaro",0,"Accanto a Consip operano le centrali regionali. Insieme formano l'elenco dei soggetti aggregatori, previsto da una legge del 2014 per ridurre e razionalizzare la spesa."),
 (5,"chiaro",0,"Per alcune categorie di beni e servizi, fissate con decreto, le amministrazioni devono passare dai soggetti aggregatori. In sanita' ci sono farmaci, vaccini, dispositivi, pulizie, ristorazione."),
 (5,"chiaro",0,"Gli strumenti sono diversi. La convenzione e' un contratto quadro gia' aggiudicato, a cui si aderisce con un ordine. L'accordo quadro fissa le regole per i contratti successivi."),
 (5,"chiaro",0,"Nel Veneto, per la sanita', il ruolo di centrale di committenza regionale e' svolto da Azienda Zero, che fa le gare per le aziende sanitarie della regione."),
 (5,"chiaro",0,"Anche quando compra tramite una centrale, l'azienda nomina un RUP per il singolo acquisto. La centrale, a sua volta, ha un proprio RUP per le attivita' che gestisce."),
 (5,"chiaro",0.6,"Torniamo ai guanti. L'azienda aderisce alla convenzione della centrale regionale, gia' aggiudicata, e fa il suo ordine. Nessuna gara in proprio, prezzi gia' negoziati per volumi grandi."),
 (5,"tenue",0.8,"Un distrattore frequente: Consip non e' l'unica centrale. Esistono le centrali regionali, e per la sanita' sono spesso quelle a cui le aziende devono rivolgersi."),
 (5,"profondo",1.2,"Comprare insieme per comprare meglio e spendere meno."),

 (6,"chiaro",0.5,"Il sistema ha un'autorita' di vigilanza: l'ANAC, l'Autorita' nazionale anticorruzione. Vigila sui contratti pubblici, gestisce la banca dati nazionale e l'elenco delle stazioni qualificate."),
 (6,"chiaro",0,"L'ANAC puo' anche dare pareri per risolvere una controversia prima che arrivi davanti a un giudice, ed emana bandi tipo e atti di indirizzo per le stazioni appaltanti."),
 (6,"chiaro",0,"Il supporto tecnico viene anche dal Ministero delle infrastrutture e, per le opere, dal Consiglio superiore dei lavori pubblici. Per i lavori piu' grandi c'e' il collegio consultivo tecnico."),
 (6,"chiaro",0,"Il collegio consultivo tecnico aiuta a risolvere rapidamente le controversie durante l'esecuzione dei lavori, per evitare che il cantiere si fermi."),
 (6,"chiaro",0,"C'e' poi la Corte dei conti, che puo' chiamare a rispondere del danno erariale chi ha causato uno spreco di denaro pubblico con dolo o colpa grave."),
 (6,"chiaro",0,"Le controversie sulla procedura di gara vanno davanti al giudice amministrativo, con termini brevi. Quelle sull'esecuzione del contratto, di regola, davanti al giudice ordinario."),
 (6,"chiaro",0.6,"Un esempio: un'impresa esclusa da una gara ritiene l'esclusione illegittima. Puo' chiedere un parere all'ANAC, oppure ricorrere al tribunale amministrativo regionale."),
 (6,"tenue",0.8,"Attenzione: l'ANAC non e' un giudice. Vigila, regola e da' pareri; le controversie si decidono davanti al giudice amministrativo o ordinario."),
 (6,"profondo",1.2,"Chi vigila, chi aiuta, chi decide le liti."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: le stazioni appaltanti devono essere qualificate per le procedure piu' complesse, e per ogni procedura nominano un responsabile unico del progetto."),
 (7,"chiaro",0.8,"La seconda: centrali di committenza e soggetti aggregatori, con Consip e le centrali regionali, aggregano gli acquisti; per alcune categorie passare da loro e' obbligatorio."),
 (7,"chiaro",0.8,"La terza: l'ANAC vigila, gestisce la banca dati e l'elenco delle stazioni qualificate; le liti sulla gara vanno al giudice amministrativo."),
 (7,"tenue",0.8,"L'ultimo distrattore: anche comprando tramite una centrale di committenza, l'azienda sanitaria nomina comunque un RUP per il proprio acquisto."),

 (8,"profondo",0,"[warm] In sintesi: chi compra, chi vende, chi aggrega, chi vigila. Nella prossima lezione: le soglie europee e le procedure per scegliere il contraente."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Stazioni appaltanti e RUP', 4: 'Operatori economici', 5: 'Centrali di committenza e soggetti aggregatori', 6: 'Controllo e supporto', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
