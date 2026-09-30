# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 11.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M11): il Titolo II, le aziende sanitarie. D.Lgs. 118/2011 art. 19 (ambito: regioni per il SSR,
# GSA, aziende sanitarie locali, AO, AOU integrate, IRCCS pubblici anche in fondazione, istituti
# zooprofilattici); art. 20 (perimetrazione delle entrate e delle spese sanitarie nel bilancio regionale);
# art. 21 (conti di tesoreria intestati alla sanita'); art. 25 (bilancio preventivo economico annuale:
# CE preventivo, piano dei flussi di cassa prospettici, nota illustrativa, piano degli investimenti triennale,
# relazione del DG, relazione del collegio sindacale); art. 26 (bilancio d'esercizio: SP, CE, rendiconto
# finanziario, nota integrativa, relazione sulla gestione con modello LA; schemi ministeriali); art. 27 (piano
# dei conti riconducibile ai modelli SP e CE); art. 28 (codice civile artt. 2423 ss.); art. 29 (criteri di
# valutazione); art. 30 (risultato d'esercizio); art. 31 (adozione entro 30 aprile); DM 17/9/2012 e PAC.
# Fonti: dispensa su Drive (con correzioni); testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'azienda sanitaria compra una TAC da un milione di euro. Il bilancio di quell'anno chiude con una perdita di un milione? E chi controlla che i numeri siano giusti?"),
 (1,"chiaro",0,"No: la TAC si ammortizza negli anni in cui si usa, e se e' pagata con contributi della regione il suo costo viene neutralizzato. Sono le regole del Titolo secondo del decreto 118."),
 (1,"profondo",1.2,"In sanita' si contano i costi, non solo i pagamenti."),

 (2,"chiaro",0.6,"Quattro passaggi. A chi si applica il Titolo secondo. La contabilita' economico patrimoniale. I documenti contabili obbligatori. E i criteri di valutazione specifici per la sanita'."),

 (3,"chiaro",0.5,"Il Titolo secondo del decreto, dall'articolo 19, detta i principi contabili del servizio sanitario. Ha un obiettivo preciso: bilanci sanitari omogenei, confrontabili e aggregabili."),
 (3,"chiaro",0,"Si applica alle regioni, per la parte del bilancio che riguarda il finanziamento del servizio sanitario, e alla gestione sanitaria accentrata, che vedremo nella prossima lezione."),
 (3,"chiaro",0,"Si applica poi agli enti del servizio sanitario: aziende sanitarie locali, aziende ospedaliere, aziende ospedaliero universitarie, istituti di ricovero e cura a carattere scientifico pubblici."),
 (3,"chiaro",0,"Rientrano anche gli istituti zooprofilattici sperimentali. Nel Veneto, quindi, le aziende ULSS, le aziende ospedaliere universitarie di Padova e Verona, l'istituto oncologico veneto e lo zooprofilattico delle Venezie."),
 (3,"chiaro",0,"Nel bilancio regionale le entrate e le spese per la sanita' devono stare in un perimetro separato e riconoscibile. Il decreto la chiama perimetrazione: la sanita' non si confonde col resto."),
 (3,"chiaro",0,"Anche la cassa e' separata: le risorse del servizio sanitario passano su conti di tesoreria intestati alla sanita', cosi' non possono essere usate per altre spese della regione."),
 (3,"chiaro",0.6,"Un esempio: la regione riceve le risorse del fondo sanitario. Le iscrive nel perimetro sanitario del proprio bilancio e le trasferisce alle aziende attraverso i conti della sanita'."),
 (3,"tenue",0.8,"Occhio a un distrattore: il Titolo secondo non riguarda solo le aziende ULSS. Vale anche per aziende ospedaliere e universitarie, istituti di ricovero pubblici e zooprofilattici."),
 (3,"profondo",1.2,"Un perimetro chiaro per il denaro della salute."),

 (4,"chiaro",0.5,"Gli enti del servizio sanitario tengono la contabilita' economico patrimoniale, in partita doppia. Ogni fatto di gestione produce effetti su costi e ricavi, e su attivita' e passivita'."),
 (4,"chiaro",0,"Per il bilancio d'esercizio si applicano le regole del codice civile sul bilancio delle societa', dagli articoli 2423 in poi, salvo quanto il decreto dispone in modo diverso."),
 (4,"chiaro",0,"Il piano dei conti di ogni azienda deve essere riconducibile, voce per voce, ai modelli ministeriali di stato patrimoniale e conto economico. L'azienda puo' aggiungere sottovoci, non cambiarle."),
 (4,"chiaro",0,"Una casistica applicativa, approvata con decreto ministeriale, spiega come trattare le operazioni piu' frequenti, cosi' che tutte le aziende le registrino allo stesso modo."),
 (4,"chiaro",0,"Il decreto chiede anche che i bilanci siano certificabili: le regioni hanno adottato percorsi attuativi di certificabilita', per arrivare a conti verificabili da un revisore esterno."),
 (4,"chiaro",0,"Dentro l'azienda il controllo contabile spetta al collegio sindacale, che verifica la regolarita' delle scritture e redige una relazione sui bilanci preventivo e d'esercizio."),
 (4,"chiaro",0.6,"Un esempio: un'azienda riceve una fattura di dicembre per servizi di pulizia. Il costo va nel conto economico di quell'anno, anche se il pagamento arriva a febbraio."),
 (4,"tenue",0.8,"Attenzione: le aziende sanitarie non tengono la contabilita' finanziaria degli enti locali, con impegni e accertamenti. Tengono la contabilita' economico patrimoniale."),
 (4,"profondo",1.2,"Partita doppia e codice civile, dentro regole comuni."),

 (5,"chiaro",0.5,"Il primo documento e' il bilancio preventivo economico annuale. E' coerente con la programmazione sanitaria ed economico finanziaria della regione."),
 (5,"chiaro",0,"Comprende il conto economico preventivo e il piano dei flussi di cassa prospettici. E' corredato da una nota illustrativa, dal piano degli investimenti e dalla relazione del direttore generale."),
 (5,"chiaro",0,"Il piano degli investimenti e' triennale, a scorrimento: indica gli investimenti da fare, il fabbisogno e le fonti di finanziamento. Al preventivo si allega anche la relazione del collegio sindacale."),
 (5,"chiaro",0,"A consuntivo c'e' il bilancio d'esercizio, riferito all'anno solare. Si compone di stato patrimoniale, conto economico, rendiconto finanziario e nota integrativa."),
 (5,"chiaro",0,"E' accompagnato dalla relazione sulla gestione del direttore generale, che contiene anche il modello LA: i costi sostenuti per ciascun livello essenziale di assistenza."),
 (5,"chiaro",0,"Il direttore generale adotta il bilancio d'esercizio entro il trenta aprile dell'anno successivo. Gli schemi sono quelli ministeriali, uguali in tutta Italia."),
 (5,"chiaro",0.6,"Un esempio: nel modello LA un'azienda indica quanto ha speso per la prevenzione collettiva, per l'assistenza distrettuale e per quella ospedaliera, secondo le stesse regole di ogni regione."),
 (5,"tenue",0.8,"Un distrattore frequente: il bilancio d'esercizio dell'azienda non si ferma a stato patrimoniale e conto economico. Ci sono anche rendiconto finanziario e nota integrativa."),
 (5,"profondo",1.2,"Prevedere a dicembre, rendere conto ad aprile."),

 (6,"chiaro",0.5,"Il decreto fissa criteri di valutazione specifici per la sanita'. Le rimanenze di beni fungibili, come farmaci e dispositivi, si valutano al costo medio ponderato."),
 (6,"chiaro",0,"I beni durevoli si ammortizzano con le aliquote fissate dal decreto. I terreni non si ammortizzano, e i beni di valore molto modesto si spesano interamente nell'anno."),
 (6,"chiaro",0,"I contributi in conto capitale per gli investimenti si iscrivono nel patrimonio netto. Man mano che il bene si ammortizza, una quota del contributo va a ricavo e ne neutralizza il costo."),
 (6,"chiaro",0,"E' la sterilizzazione degli ammortamenti: il bene finanziato dalla regione non genera una perdita, perche' il suo ammortamento e' coperto dal contributo ricevuto."),
 (6,"chiaro",0,"I contributi vincolati a uno scopo e non ancora usati si accantonano per gli esercizi successivi. I contributi per il ripiano delle perdite si iscrivono sulla base dell'atto di assegnazione."),
 (6,"chiaro",0,"La regione verifica che gli accantonamenti ai fondi rischi siano adeguati. Non si possono iscrivere fondi generici: il rischio deve essere determinato e almeno probabile."),
 (6,"chiaro",0.6,"Torniamo alla TAC. Se dura otto anni, ogni anno si ammortizza un ottavo del costo. E se e' finanziata dalla regione, lo stesso ottavo del contributo va a ricavo: effetto nullo sul risultato."),
 (6,"tenue",0.8,"Attenzione: le rimanenze di beni fungibili non si valutano al prezzo dell'ultimo acquisto. Il decreto prevede il costo medio ponderato."),
 (6,"profondo",1.2,"Il bene si ammortizza, il contributo lo neutralizza."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il Titolo secondo, dall'articolo 19, si applica alla sanita' regionale, alla GSA, alle aziende sanitarie e ospedaliere, agli istituti di ricovero pubblici e agli zooprofilattici."),
 (7,"chiaro",0.8,"La seconda: le aziende tengono la contabilita' economico patrimoniale e applicano il codice civile; preventivo economico annuale e bilancio d'esercizio, adottato entro il trenta aprile."),
 (7,"chiaro",0.8,"La terza: rimanenze al costo medio ponderato, ammortamenti con aliquote fissate, contributi in conto capitale che sterilizzano gli ammortamenti."),
 (7,"tenue",0.8,"L'ultimo distrattore: il modello LA non e' un documento di cassa. Rileva i costi dell'azienda per ciascun livello essenziale di assistenza."),

 (8,"profondo",0,"[warm] In sintesi: conti economici, uguali per tutte le aziende. Nell'ultima lezione del modulo: la gestione sanitaria accentrata, il consolidato regionale e le aziende ospedaliero universitarie."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'A chi si applica', 4: "La contabilita' economico patrimoniale", 5: 'I documenti obbligatori', 6: 'I criteri di valutazione', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
