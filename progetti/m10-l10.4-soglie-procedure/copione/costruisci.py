# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 10.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M10): soglie e procedure. D.Lgs. 36/2023 art. 14 (soglie europee, rideterminate ogni due anni dalla
# Commissione; valore stimato); art. 48-55 (sotto soglia); art. 49 (rotazione); art. 50 (affidamento diretto:
# servizi e forniture sotto 140.000 euro, lavori sotto 150.000; procedura negoziata senza bando: almeno 5
# operatori per servizi e forniture da 140.000 alla soglia e per lavori da 150.000 a 1 milione; almeno 10 per
# lavori da 1 milione alla soglia); artt. 70-76 (aperta, ristretta, competitiva con negoziazione, dialogo
# competitivo, partenariato per l'innovazione, negoziata senza bando); art. 71 (termine minimo 30 giorni).
# Cifre delle soglie arrotondate: 2024-2025 5.538.000 / 221.000 / 143.000 / 750.000; 2026-2027 da verificare.
# Fonti: dispense su Drive (con correzioni); testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Tre acquisti nella stessa azienda sanitaria: una stampante da duemila euro, un servizio di manutenzione da centottantamila, un nuovo padiglione da dieci milioni. Si comprano allo stesso modo?"),
 (1,"chiaro",0,"No. Il valore del contratto decide la procedura: quanto piu' il valore sale, tanto piu' la gara deve essere aperta, pubblicizzata e rigorosa. Il confine principale sono le soglie europee."),
 (1,"profondo",1.2,"Il valore del contratto decide la strada da seguire."),

 (2,"chiaro",0.6,"Quattro passaggi. Le soglie europee. Gli affidamenti sotto soglia. Le procedure ordinarie sopra soglia: aperta e ristretta. E le procedure speciali, da usare solo in certi casi."),

 (3,"chiaro",0.5,"Le soglie di rilevanza europea sono importi fissati dalle direttive. Sopra soglia valgono per intero le regole europee di pubblicita' e concorrenza; sotto soglia il codice consente procedure piu' snelle."),
 (3,"chiaro",0,"Le soglie vengono aggiornate ogni due anni dalla Commissione europea. Per questo conviene ricordarne l'ordine di grandezza, piu' che la cifra esatta di un singolo biennio."),
 (3,"chiaro",0,"Per i lavori e le concessioni la soglia e' di poco superiore ai cinque milioni di euro. Per gli appalti di servizi e forniture delle amministrazioni come le aziende sanitarie, poco oltre i duecentomila euro."),
 (3,"chiaro",0,"Per le forniture delle autorita' governative centrali, come i ministeri, la soglia e' un po' piu' bassa. Per i servizi sociali e altri servizi specifici e' di settecentocinquantamila euro."),
 (3,"chiaro",0,"Il confronto si fa con il valore stimato: al netto dell'IVA, comprese le opzioni e i rinnovi. E vale il divieto di frazionare l'appalto per farlo scendere sotto la soglia."),
 (3,"chiaro",0.6,"Un esempio: un servizio di lavanderia da ottantamila euro l'anno, per tre anni rinnovabili per altri due. Il valore stimato e' di quattrocentomila euro: e' sopra la soglia europea."),
 (3,"tenue",0.8,"Occhio a un distrattore: le soglie europee non sono fisse per sempre. Cambiano ogni due anni, e vanno controllate sul provvedimento del biennio in corso."),
 (3,"profondo",1.2,"Sopra la soglia, l'Europa; sotto, regole piu' snelle."),

 (4,"chiaro",0.5,"Sotto soglia il codice prevede due strade. La prima e' l'affidamento diretto: la stazione appaltante sceglie l'operatore, anche senza consultarne altri, motivando la scelta."),
 (4,"chiaro",0,"E' ammesso per servizi e forniture sotto i centoquarantamila euro, e per i lavori sotto i centocinquantamila. L'affidatario deve comunque avere i requisiti e l'esperienza adeguati."),
 (4,"chiaro",0,"La seconda strada e' la procedura negoziata senza bando: si invitano piu' operatori, scelti con un'indagine di mercato o da un elenco, e si mettono a confronto le offerte."),
 (4,"chiaro",0,"Per servizi e forniture dai centoquarantamila euro fino alla soglia europea si invitano almeno cinque operatori. Per i lavori, almeno cinque fino a un milione, almeno dieci oltre il milione."),
 (4,"chiaro",0,"Anche sotto soglia si puo' sempre scegliere una procedura ordinaria, piu' aperta. Le procedure semplificate sono una facolta', non un obbligo."),
 (4,"chiaro",0,"E vale il principio di rotazione: di regola non si affida al contraente uscente una commessa consecutiva dello stesso settore. Solo in casi motivati lo si puo' reinvitare."),
 (4,"chiaro",0,"Per gli affidamenti diretti di valore molto basso, sotto i cinquemila euro, il codice consente di derogare alla rotazione. Sopra quella cifra, la deroga va motivata caso per caso."),
 (4,"chiaro",0.6,"Un esempio: la stampante da duemila euro si compra con affidamento diretto, anche sul mercato elettronico. Il servizio di manutenzione da centottantamila euro richiede almeno cinque inviti."),
 (4,"tenue",0.8,"Attenzione: affidamento diretto non vuol dire senza regole. Servono la determina, la verifica dei requisiti, la rotazione e la pubblicazione dei dati."),
 (4,"profondo",1.2,"Semplice non vuol dire libero da regole e controlli."),

 (5,"chiaro",0.5,"Sopra soglia le procedure ordinarie sono due. La procedura aperta: qualsiasi operatore interessato puo' presentare un'offerta, in risposta al bando pubblicato."),
 (5,"chiaro",0,"Il termine minimo per ricevere le offerte e' di trenta giorni dalla trasmissione del bando, riducibile in caso di urgenza motivata. E' la procedura piu' usata e piu' aperta alla concorrenza."),
 (5,"chiaro",0,"La procedura ristretta ha due tempi. Prima chiunque puo' chiedere di partecipare; poi la stazione appaltante seleziona i candidati con i requisiti e invita solo loro a presentare l'offerta."),
 (5,"chiaro",0,"La ristretta e' utile quando si vuole selezionare prima le imprese piu' qualificate, per esempio in appalti tecnicamente complessi, e confrontare poi un numero gestibile di offerte."),
 (5,"chiaro",0,"Nella procedura ristretta i candidati invitati devono essere almeno cinque, se ce ne sono abbastanza con i requisiti. La stazione appaltante puo' fissare prima anche un numero massimo."),
 (5,"chiaro",0,"In entrambe le procedure tutto si svolge su piattaforme telematiche: bando, documenti, offerte e comunicazioni viaggiano in forma digitale."),
 (5,"chiaro",0,"Le fasi sono sempre le stesse: decisione di contrarre, pubblicazione, offerte, valutazione, proposta di aggiudicazione, verifica dei requisiti, aggiudicazione e stipula del contratto."),
 (5,"chiaro",0.6,"Un esempio: il servizio di ristorazione per i pazienti di un ospedale, per cinque anni. Si pubblica il bando con procedura aperta e tutte le imprese interessate possono presentare offerta."),
 (5,"tenue",0.8,"Un distrattore frequente: nella procedura ristretta non tutti possono presentare un'offerta. Tutti possono chiedere di partecipare, ma offrono solo gli invitati."),
 (5,"profondo",1.2,"Aperta a tutti, oppure ristretta ai selezionati."),

 (6,"chiaro",0.5,"Ci sono poi procedure da usare solo in presenza di condizioni precise. La competitiva con negoziazione: la stazione appaltante negozia con gli operatori le offerte iniziali per migliorarle."),
 (6,"chiaro",0,"Il dialogo competitivo serve per appalti particolarmente complessi, quando l'amministrazione non sa ancora definire la soluzione tecnica: la costruisce dialogando con i candidati."),
 (6,"chiaro",0,"Il partenariato per l'innovazione serve quando si cerca un prodotto o un servizio che sul mercato non esiste ancora: si finanzia la ricerca e poi si acquista cio' che ne risulta."),
 (6,"chiaro",0,"La procedura negoziata senza bando, sopra soglia, e' un'eccezione: gara andata deserta, un solo operatore in grado di fornire la prestazione, oppure estrema urgenza non imputabile all'amministrazione."),
 (6,"chiaro",0,"In questi casi si consultano, se esistono, almeno tre operatori, e la scelta va motivata con cura. L'urgenza deve derivare da eventi imprevedibili, non da ritardi dell'amministrazione."),
 (6,"chiaro",0.6,"Un esempio: un ospedale deve acquistare i ricambi originali di un'apparecchiatura, che solo il produttore puo' fornire per ragioni tecniche. La negoziata senza bando e' giustificata."),
 (6,"tenue",0.8,"Attenzione: il ritardo dell'amministrazione nel programmare la gara non giustifica la procedura negoziata senza bando per urgenza. L'urgenza non deve esserle imputabile."),
 (6,"profondo",1.2,"Le eccezioni si motivano, non si presumono."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: le soglie europee cambiano ogni due anni; per servizi e forniture delle aziende sanitarie sono poco oltre i duecentomila euro."),
 (7,"chiaro",0.8,"La seconda: sotto soglia, affidamento diretto sotto i centoquarantamila euro per servizi e forniture e i centocinquantamila per i lavori; oltre, procedura negoziata con almeno cinque inviti."),
 (7,"chiaro",0.8,"La terza: sopra soglia le procedure ordinarie sono l'aperta e la ristretta; le altre, e soprattutto la negoziata senza bando, richiedono presupposti precisi."),
 (7,"tenue",0.8,"L'ultimo distrattore: nella procedura aperta il termine minimo per le offerte non e' di dieci giorni. E' di trenta giorni dalla trasmissione del bando, salvo urgenza."),

 (8,"profondo",0,"[warm] In sintesi: il valore sceglie la strada, i principi la guidano. Nella prossima lezione: come si aggiudica una gara, e come si riconosce un'offerta anormalmente bassa."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Le soglie europee', 4: 'Sotto soglia', 5: 'Le procedure ordinarie', 6: 'Le procedure speciali', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
