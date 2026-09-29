# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 10.7 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M10): esecuzione del contratto. D.Lgs. 36/2023 art. 17 (aggiudicazione, efficacia dopo la verifica dei
# requisiti); art. 18 (stipula in forma scritta elettronica a pena di nullita'; stand still di 35 giorni, non per
# sotto soglia, unica offerta, accordi quadro: da verificare; la dispensa riporta 32 giorni del vecchio codice);
# art. 114 (RUP, direttore dell'esecuzione del contratto, direttore dei lavori); art. 120 (modifiche: clausole
# chiare, circostanze imprevedibili, prestazioni supplementari, modifiche non sostanziali; quinto d'obbligo);
# art. 60 (revisione prezzi obbligatoria); art. 125 (anticipazione del prezzo; pagamenti; stati di avanzamento);
# D.Lgs. 231/2002 (pagamenti: 30 giorni, 60 per gli enti del SSN); L. 136/2010 (tracciabilita', CIG); art. 126
# (penali: da 0,5 a 1 per mille al giorno, massimo 10%); art. 106 (garanzia provvisoria, 2%); art. 117
# (garanzia definitiva, 10%); art. 116 (collaudo per i lavori, verifica di conformita' per servizi e forniture;
# certificato di regolare esecuzione); artt. 122-123 (risoluzione e recesso). Fonti: dispense su Drive (con
# correzioni); testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] La gara per il nuovo servizio di lavanderia e' finita, l'impresa ha vinto. Il lavoro dell'ufficio acquisti e' concluso?"),
 (1,"chiaro",0,"No: comincia la parte piu' lunga. Il contratto va firmato, eseguito, controllato, pagato e verificato alla fine. Un'ottima gara seguita da un'esecuzione trascurata non produce il risultato."),
 (1,"profondo",1.2,"La gara si vince in un giorno, il contratto si esegue per anni."),

 (2,"chiaro",0.6,"Quattro passaggi. Dall'aggiudicazione alla firma del contratto. Chi dirige l'esecuzione. Le modifiche e le varianti. Pagamenti, garanzie, penali e collaudo."),

 (3,"chiaro",0.5,"Dopo la proposta di aggiudicazione, la stazione appaltante verifica i requisiti dichiarati dall'impresa. Solo allora l'aggiudicazione diventa efficace."),
 (3,"chiaro",0,"L'aggiudicazione va comunicata a tutti i concorrenti. Da quel momento decorre un termine di attesa, detto stand still, prima del quale il contratto non si puo' firmare."),
 (3,"chiaro",0,"Serve a permettere a chi ha perso di fare ricorso prima che il contratto sia firmato. Non si applica, per esempio, sotto soglia o quando c'era una sola offerta."),
 (3,"chiaro",0,"Il contratto si stipula per iscritto, in forma elettronica, a pena di nullita'. Per gli affidamenti diretti e le procedure negoziate basta uno scambio di lettere, anche via posta certificata."),
 (3,"chiaro",0,"Prima della firma l'impresa presta la garanzia definitiva, di solito pari al dieci per cento dell'importo del contratto. Tutela l'amministrazione se l'impresa non adempie."),
 (3,"chiaro",0,"In caso di urgenza l'esecuzione puo' iniziare prima della stipula, con un provvedimento motivato. E' un'eccezione, non la regola."),
 (3,"chiaro",0,"L'esito della gara si pubblica, e i dati del contratto confluiscono nella banca dati nazionale, dove restano consultabili per tutta la sua durata, fino al collaudo."),
 (3,"chiaro",0.6,"Un esempio: aggiudicata la lavanderia, l'azienda verifica il certificato antimafia e la regolarita' contributiva dell'impresa, attende il termine di legge e firma il contratto."),
 (3,"tenue",0.8,"Occhio a un distrattore: l'aggiudicazione non e' efficace prima della verifica dei requisiti. E non e' ancora il contratto: la firma arriva dopo."),
 (3,"profondo",1.2,"Aggiudicare, verificare, attendere, firmare."),

 (4,"chiaro",0.5,"L'esecuzione del contratto e' diretta dal responsabile unico del progetto, che controlla la qualita' delle prestazioni. Per farlo si avvale di figure specifiche."),
 (4,"chiaro",0,"Per i servizi e le forniture c'e' il direttore dell'esecuzione del contratto: verifica che il servizio sia svolto come previsto, segnala i problemi e propone le penali."),
 (4,"chiaro",0,"Per i lavori c'e' il direttore dei lavori, che coordina e controlla il cantiere sul piano tecnico e contabile, aiutato se serve da direttori operativi e ispettori."),
 (4,"chiaro",0,"In sanita' il direttore dell'esecuzione e' spesso chi usa il servizio ogni giorno: un coordinatore infermieristico, un ingegnere clinico, un responsabile della logistica."),
 (4,"chiaro",0,"Il controllo si basa su documenti: verbali di avvio, controlli a campione, segnalazioni dei reparti, relazioni periodiche. Sono la prova se nasce una contestazione."),
 (4,"chiaro",0,"Anche dopo la gara chi controlla deve restare imparziale: il RUP e il direttore dell'esecuzione non possono avere interessi personali legati all'impresa che controllano."),
 (4,"chiaro",0.6,"Un esempio: il direttore dell'esecuzione della lavanderia riceve dai reparti le segnalazioni di biancheria consegnata in ritardo, le verbalizza e le trasmette al RUP."),
 (4,"tenue",0.8,"Attenzione: il direttore dell'esecuzione non sostituisce il RUP. Il RUP dirige l'esecuzione; il direttore dell'esecuzione lo supporta nei controlli."),
 (4,"profondo",1.2,"Senza controlli, il contratto resta sulla carta."),

 (5,"chiaro",0.5,"Durante l'esecuzione il contratto puo' cambiare, ma solo nei casi ammessi dal codice. Altrimenti si aggirerebbe la gara, dando all'impresa un contratto diverso da quello messo in concorrenza."),
 (5,"chiaro",0,"Sono ammesse le modifiche previste gia' nei documenti di gara con clausole chiare e precise, come le opzioni. E le varianti dovute a circostanze imprevedibili, entro limiti di valore."),
 (5,"chiaro",0,"Sono ammesse anche prestazioni supplementari che non si possono affidare ad altri senza gravi inconvenienti, e le modifiche non sostanziali, che non alterano la natura del contratto."),
 (5,"chiaro",0,"C'e' poi il quinto d'obbligo: se serve un aumento o una diminuzione della prestazione fino a un quinto dell'importo, l'impresa deve eseguirla alle stesse condizioni del contratto."),
 (5,"chiaro",0,"Il codice prevede anche la revisione dei prezzi: i contratti devono contenere clausole che adeguano i prezzi quando i costi cambiano oltre una certa soglia, per variazioni non prevedibili."),
 (5,"chiaro",0,"Ogni modifica va motivata e documentata, e le piu' rilevanti vanno comunicate all'Autorita' anticorruzione. La trasparenza accompagna il contratto fino all'ultimo giorno."),
 (5,"chiaro",0.6,"Un esempio: apre un nuovo reparto e serve piu' biancheria. Se l'aumento sta entro un quinto dell'importo, l'impresa della lavanderia deve fornirla alle stesse condizioni."),
 (5,"tenue",0.8,"Un distrattore frequente: il quinto d'obbligo non e' una scelta dell'impresa. Entro quel limite l'impresa e' tenuta a eseguire, senza poter chiedere la risoluzione."),
 (5,"profondo",1.2,"Il contratto puo' cambiare, ma dentro regole precise."),

 (6,"chiaro",0.5,"Il pagamento avviene dopo la verifica delle prestazioni, spesso per stati di avanzamento. Si puo' prevedere un'anticipazione del prezzo all'inizio, garantita dall'impresa."),
 (6,"chiaro",0,"Le pubbliche amministrazioni devono pagare entro trenta giorni. Per gli enti del servizio sanitario nazionale il termine e' di sessanta giorni. I ritardi producono interessi."),
 (6,"chiaro",0,"I pagamenti sono tracciabili: avvengono su conti correnti dedicati e riportano il codice identificativo della gara. Prima di pagare si verifica la regolarita' contributiva dell'impresa."),
 (6,"chiaro",0,"Se l'impresa ritarda o non rispetta gli standard si applicano le penali previste dal contratto, calcolate per ogni giorno di ritardo, fino a un massimo del dieci per cento dell'importo."),
 (6,"chiaro",0,"Alla fine si verifica il risultato: per i lavori con il collaudo, per servizi e forniture con la verifica di conformita'. Nei casi piu' semplici basta un certificato di regolare esecuzione."),
 (6,"chiaro",0,"Anche la garanzia definitiva segue il contratto: viene svincolata progressivamente, man mano che le prestazioni sono eseguite, e del tutto dopo il collaudo o la verifica finale."),
 (6,"chiaro",0,"Nei casi gravi l'amministrazione puo' risolvere il contratto per grave inadempimento, e puo' anche recedere, pagando le prestazioni eseguite e una parte di quelle non eseguite."),
 (6,"chiaro",0.6,"Un esempio: la lavanderia consegna ripetutamente in ritardo. Il direttore dell'esecuzione documenta, il RUP contesta e applica le penali; se l'inadempimento e' grave, si arriva alla risoluzione."),
 (6,"tenue",0.8,"Attenzione: le penali non si applicano senza contestazione. L'impresa deve poter presentare le sue controdeduzioni prima che la penale sia applicata."),
 (6,"profondo",1.2,"Pagare bene, controllare sempre, collaudare alla fine."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: l'aggiudicazione e' efficace dopo la verifica dei requisiti; il contratto si firma dopo il termine di stand still, in forma scritta elettronica."),
 (7,"chiaro",0.8,"La seconda: l'esecuzione la dirige il RUP, con il direttore dell'esecuzione per servizi e forniture e il direttore dei lavori per i lavori."),
 (7,"chiaro",0.8,"La terza: le modifiche sono ammesse solo nei casi previsti, con il quinto d'obbligo; si paga dopo le verifiche, e alla fine c'e' il collaudo o la verifica di conformita'."),
 (7,"tenue",0.8,"L'ultimo distrattore: per le aziende sanitarie il termine di pagamento non e' di trenta giorni. E' di sessanta giorni."),

 (8,"profondo",0,"[warm] In sintesi: una buona gara e un'esecuzione seguita da vicino. Si chiude il modulo sugli appalti. Nel prossimo: gli elementi di contabilita' delle pubbliche amministrazioni."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Dall'aggiudicazione alla firma", 4: "Chi dirige l'esecuzione", 5: 'Modifiche e varianti', 6: 'Pagamenti, garanzie, collaudo', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
