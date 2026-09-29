# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 10.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M10): aggiudicazione e anomalia. D.Lgs. 36/2023 art. 108 (offerta economicamente piu' vantaggiosa:
# miglior rapporto qualita'/prezzo o costo/efficacia, costo del ciclo di vita; OEPV obbligatoria per servizi
# sociali e di ristorazione ospedaliera, assistenziale e scolastica, servizi ad alta intensita' di manodopera,
# servizi di ingegneria e architettura >= 140.000, servizi e forniture innovativi >= 140.000, dialogo competitivo,
# appalto integrato; minor prezzo per prestazioni standardizzate; tetto al punteggio economico 30%); art. 93
# (commissione giudicatrice: dispari, massimo cinque, esperti, nominata dopo la scadenza); art. 110 (offerte
# anormalmente basse: spiegazioni, contraddittorio; non giustificabili trattamenti salariali minimi e oneri di
# sicurezza); art. 54 (esclusione automatica sotto soglia con minor prezzo, almeno 5 offerte, senza interesse
# transfrontaliero; metodi nell'allegato II.2); art. 41 c. 14 e 108 c. 9 (costi della manodopera indicati a parte).
# Fonti: dispense su Drive (con correzioni); testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Gara per la mensa dei pazienti di un ospedale. Un'impresa offre un pasto a un prezzo molto piu' basso di tutte le altre. Vince automaticamente?"),
 (1,"chiaro",0,"No, per due ragioni. Nella ristorazione ospedaliera non basta il prezzo: conta la qualita'. E un prezzo troppo basso fa nascere un dubbio: come si fa a garantire il servizio a quel costo?"),
 (1,"profondo",1.2,"Il prezzo piu' basso non e' sempre l'offerta migliore."),

 (2,"chiaro",0.6,"Quattro passaggi. I due criteri di aggiudicazione. Quando la qualita' e' obbligatoria. La commissione giudicatrice e i punteggi. E le offerte anormalmente basse."),

 (3,"chiaro",0.5,"Il codice prevede due criteri per scegliere l'offerta vincente. Il primo, quello di regola, e' l'offerta economicamente piu' vantaggiosa."),
 (3,"chiaro",0,"Si individua sulla base del miglior rapporto tra qualita' e prezzo: si valutano elementi tecnici, come organizzazione, materiali, assistenza, e poi il prezzo. Vince chi ottiene il punteggio totale piu' alto."),
 (3,"chiaro",0,"Si puo' anche ragionare sul costo complessivo, compreso il costo del ciclo di vita: acquisto, consumi, manutenzione e smaltimento, non solo il prezzo iniziale."),
 (3,"chiaro",0,"Il secondo criterio e' il minor prezzo: vince chi offre di meno. E' ammesso per servizi e forniture standardizzati, o le cui condizioni sono gia' definite dal mercato."),
 (3,"chiaro",0,"Il minor prezzo non e' mai ammesso per i servizi ad alta intensita' di manodopera, dove il costo del lavoro pesa di piu': li' un ribasso eccessivo finisce quasi sempre sulle spalle dei lavoratori."),
 (3,"chiaro",0.6,"Un esempio: le siringhe monouso standard possono essere aggiudicate al minor prezzo. Un'apparecchiatura per la radioterapia no: servono qualita', assistenza e costo del ciclo di vita."),
 (3,"chiaro",0,"Il criterio scelto va indicato nel bando e non si cambia durante la gara. Le imprese devono sapere prima su che cosa verranno valutate."),
 (3,"chiaro",0,"Anche con il minor prezzo i requisiti minimi di qualita' restano: sono fissati nel capitolato tecnico, e un prodotto che non li rispetta non e' ammesso, qualunque sia il suo prezzo."),
 (3,"tenue",0.8,"Occhio a un distrattore: il criterio ordinario non e' il minor prezzo. Di regola si usa l'offerta economicamente piu' vantaggiosa."),
 (3,"profondo",1.2,"Qualita' e prezzo si valutano insieme, di regola."),

 (4,"chiaro",0.5,"Per alcuni contratti il codice impone l'offerta economicamente piu' vantaggiosa. Il primo gruppo sono i servizi sociali e la ristorazione ospedaliera, assistenziale e scolastica."),
 (4,"chiaro",0,"Poi i servizi ad alta intensita' di manodopera: quelli in cui il costo del personale e' almeno la meta' del valore del contratto, come pulizie, assistenza, vigilanza."),
 (4,"chiaro",0,"Ancora: i servizi di ingegneria e architettura e gli altri servizi tecnici e intellettuali dai centoquarantamila euro in su, e le forniture e i servizi ad alto contenuto tecnologico o innovativi."),
 (4,"chiaro",0,"E infine le gare con dialogo competitivo o partenariato per l'innovazione, e l'appalto integrato, dove la stessa impresa progetta ed esegue i lavori."),
 (4,"chiaro",0,"E' il divieto del massimo ribasso negli ambiti piu' delicati: quando dietro un servizio ci sono persone da assistere o lavoratori da tutelare, il solo prezzo non puo' decidere."),
 (4,"chiaro",0,"Nei contratti di servizi la stazione appaltante indica anche il contratto collettivo da applicare al personale, per evitare che la concorrenza si faccia sui salari."),
 (4,"chiaro",0.6,"Torniamo alla mensa. La ristorazione ospedaliera va aggiudicata con l'offerta economicamente piu' vantaggiosa: menu', qualita' delle materie prime, diete speciali, tempi di consegna."),
 (4,"tenue",0.8,"Attenzione: per il servizio di pulizie di un ospedale il minor prezzo non si puo' usare. E' un servizio ad alta intensita' di manodopera."),
 (4,"profondo",1.2,"Dove ci sono persone, decide anche la qualita'."),

 (5,"chiaro",0.5,"Con l'offerta economicamente piu' vantaggiosa le offerte tecniche vengono valutate da una commissione giudicatrice, nominata dopo la scadenza del termine per presentare le offerte."),
 (5,"chiaro",0,"La commissione e' composta da un numero dispari di componenti, al massimo cinque, esperti nel settore dell'appalto. I componenti non devono essere in conflitto di interessi."),
 (5,"chiaro",0,"Il bando indica i criteri di valutazione e i punteggi, di solito su cento punti. Il codice fissa un tetto: al prezzo non si possono attribuire piu' di trenta punti su cento."),
 (5,"chiaro",0,"Cosi' la qualita' pesa almeno per settanta punti. Per ogni criterio il bando puo' prevedere sottocriteri, pesi e il modo di calcolare i punteggi."),
 (5,"chiaro",0,"Le offerte sono in buste separate, oggi digitali: prima si apre la documentazione amministrativa, poi l'offerta tecnica, e solo dopo la valutazione tecnica l'offerta economica."),
 (5,"chiaro",0,"Alla fine si forma la graduatoria e la proposta di aggiudicazione. La stazione appaltante verifica i requisiti del primo classificato e aggiudica con un proprio provvedimento."),
 (5,"chiaro",0.6,"Un esempio: in una gara per dispositivi medici la commissione e' formata da un farmacista, un ingegnere clinico e un medico del reparto utilizzatore, esperti dell'oggetto della gara."),
 (5,"tenue",0.8,"Un distrattore frequente: la commissione non si nomina prima della scadenza delle offerte. Si nomina dopo, per evitare pressioni sui suoi componenti."),
 (5,"profondo",1.2,"Prima si guarda la qualita', poi si apre il prezzo."),

 (6,"chiaro",0.5,"Resta il caso del prezzo troppo basso. Il codice parla di offerta anormalmente bassa: un'offerta che, per il prezzo o per altri elementi, non sembra sostenibile."),
 (6,"chiaro",0,"In questi casi la stazione appaltante chiede all'impresa spiegazioni scritte, assegnando un termine. E' un contraddittorio: l'impresa puo' dimostrare come riesce a stare nei costi."),
 (6,"chiaro",0,"Le spiegazioni possono riguardare l'economia del processo produttivo, le soluzioni tecniche, condizioni favorevoli di cui l'impresa gode, l'originalita' del progetto."),
 (6,"chiaro",0,"Ci sono pero' cose che non si possono giustificare: trattamenti salariali inferiori ai minimi inderogabili, e oneri per la sicurezza sotto quanto previsto. Su questi non si risparmia."),
 (6,"chiaro",0,"Per questo le imprese indicano a parte, nell'offerta, i costi della manodopera e gli oneri della sicurezza aziendali, che la stazione appaltante verifica prima di aggiudicare."),
 (6,"chiaro",0,"Se la stazione appaltante esclude un'offerta perche' anomala, deve motivare la decisione. E se accetta le spiegazioni, deve comunque poter dimostrare di averle valutate con attenzione."),
 (6,"chiaro",0,"Sotto soglia, quando si usa il minor prezzo e arrivano almeno cinque offerte, la stazione appaltante puo' escludere automaticamente le offerte anomale, con un metodo di calcolo fissato negli allegati."),
 (6,"chiaro",0.6,"Torniamo alla mensa. L'impresa con il prezzo bassissimo deve spiegare come paga il personale e le materie prime. Se le spiegazioni non reggono, l'offerta viene esclusa."),
 (6,"tenue",0.8,"Attenzione: l'offerta anomala non si esclude subito, sopra soglia. Prima si chiedono le spiegazioni e si valuta in contraddittorio; si esclude solo se non convincono."),
 (6,"profondo",1.2,"Un ribasso si spiega, oppure si esclude."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: i criteri sono l'offerta economicamente piu' vantaggiosa, che e' la regola, e il minor prezzo, solo per prestazioni standardizzate."),
 (7,"chiaro",0.8,"La seconda: l'offerta economicamente piu' vantaggiosa e' obbligatoria per servizi sociali, ristorazione ospedaliera e servizi ad alta intensita' di manodopera; al prezzo al massimo trenta punti."),
 (7,"chiaro",0.8,"La terza: l'offerta anormalmente bassa si verifica in contraddittorio; non si giustificano salari sotto i minimi ne' oneri di sicurezza ridotti."),
 (7,"tenue",0.8,"L'ultimo distrattore: la commissione giudicatrice non ha un numero pari di componenti. E' dispari, al massimo cinque."),

 (8,"profondo",0,"[warm] In sintesi: qualita' e prezzo insieme, e i ribassi sotto controllo. Nella prossima lezione: chi puo' partecipare alle gare, e come si partecipa insieme ad altri."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'I due criteri', 4: "Quando serve la qualita'", 5: 'La commissione e il punteggio', 6: 'Le offerte anomale', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
