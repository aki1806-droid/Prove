# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 10.6 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M10): requisiti e forme di partecipazione. D.Lgs. 36/2023 art. 94 (cause di esclusione automatica:
# condanne definitive per reati gravi, antimafia, procedure concorsuali, false dichiarazioni iscritte nel
# casellario ANAC, gravi violazioni fiscali e contributive definitivamente accertate); art. 95 (esclusione non
# automatica: gravi infrazioni in materia di salute e sicurezza, grave illecito professionale (art. 98), conflitto
# di interesse); art. 96 (misure di ravvedimento, self cleaning); art. 100 (requisiti speciali: idoneita'
# professionale, capacita' economica e finanziaria, capacita' tecniche e professionali); art. 101 (soccorso
# istruttorio, 5-10 giorni); art. 104 (avvalimento: contratto, responsabilita' solidale; non per i requisiti
# generali); artt. 65, 67, 68 (consorzi, raggruppamenti temporanei, orizzontali e verticali; mandataria;
# responsabilita' solidale); art. 119 (subappalto: autorizzazione, prestazioni da eseguire direttamente,
# responsabilita' solidale, stesso trattamento economico e normativo). Fonti: dispense su Drive (con
# correzioni: "art. 80" e' del vecchio codice); testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Una piccola impresa di pulizie vuole partecipare alla gara di un grande ospedale, ma non ha il fatturato richiesto. Deve rinunciare?"),
 (1,"chiaro",0,"Non necessariamente. Puo' unirsi ad altre imprese, oppure prendere in prestito i requisiti di un'altra impresa. Ma alcuni requisiti non si possono prestare: quelli di affidabilita' morale."),
 (1,"profondo",1.2,"Le capacita' si possono sommare, l'onesta' no."),

 (2,"chiaro",0.6,"Quattro passaggi. I requisiti di ordine generale e le cause di esclusione. I requisiti speciali e l'avvalimento. I raggruppamenti temporanei di imprese. E il subappalto."),

 (3,"chiaro",0.5,"Per partecipare a una gara servono anzitutto i requisiti di ordine generale: l'impresa deve essere affidabile. Il codice elenca le cause che la escludono."),
 (3,"chiaro",0,"Alcune cause di esclusione sono automatiche: condanne definitive per reati gravi come corruzione, turbativa d'asta, terrorismo, riciclaggio, e le situazioni previste dalla legislazione antimafia."),
 (3,"chiaro",0,"Sono automatiche anche le gravi violazioni definitivamente accertate nel pagamento di imposte e contributi, lo stato di liquidazione o di fallimento, e le false dichiarazioni iscritte nel casellario."),
 (3,"chiaro",0,"Altre cause sono non automatiche: la stazione appaltante deve valutarle. Per esempio gravi infrazioni in materia di salute e sicurezza sul lavoro, o un grave illecito professionale."),
 (3,"chiaro",0,"Il codice prevede anche il ravvedimento: un'impresa che ha commesso un illecito puo' dimostrare di aver risarcito il danno e adottato misure per non ripeterlo, ed evitare l'esclusione."),
 (3,"chiaro",0,"I requisiti si dichiarano con il documento di gara unico europeo e si verificano sul fascicolo digitale dell'impresa. Mancanze formali si possono sanare con il soccorso istruttorio."),
 (3,"chiaro",0,"Con il soccorso istruttorio la stazione appaltante assegna da cinque a dieci giorni per integrare i documenti. Non si puo' pero' usare per modificare l'offerta tecnica o economica."),
 (3,"chiaro",0.6,"Un esempio: un'impresa dimentica di allegare una dichiarazione amministrativa. Riceve la richiesta di integrazione, la presenta nei termini e resta in gara."),
 (3,"tenue",0.8,"Occhio a un distrattore: le cause di esclusione non sono piu' all'articolo 80, che era del vecchio codice. Oggi sono agli articoli 94 e seguenti."),
 (3,"profondo",1.2,"Prima l'affidabilita', poi tutto il resto."),

 (4,"chiaro",0.5,"Poi ci sono i requisiti speciali, legati all'oggetto del contratto. Sono di tre tipi: idoneita' professionale, capacita' economica e finanziaria, capacita' tecniche e professionali."),
 (4,"chiaro",0,"L'idoneita' professionale e' di solito l'iscrizione alla camera di commercio per l'attivita' oggetto dell'appalto. La capacita' economica si misura spesso con il fatturato."),
 (4,"chiaro",0,"Le capacita' tecniche si dimostrano con servizi analoghi gia' svolti, personale, attrezzature, certificazioni di qualita'. Per i lavori c'e' un sistema di qualificazione per categorie."),
 (4,"chiaro",0,"I requisiti devono essere proporzionati all'oggetto del contratto. Chiedere un fatturato troppo alto, per esempio, esclude inutilmente le piccole imprese e viola l'accesso al mercato."),
 (4,"chiaro",0,"Nei documenti di gara vanno indicati in modo chiaro e fin dall'inizio: un'impresa deve poter capire, leggendo il bando, se ha le carte in regola per partecipare."),
 (4,"chiaro",0,"Se un'impresa non ha tutti i requisiti speciali, puo' usare l'avvalimento: si appoggia alle capacita' di un'altra impresa, detta ausiliaria, che le mette a disposizione risorse e mezzi."),
 (4,"chiaro",0,"Serve un contratto di avvalimento, e l'ausiliaria risponde in solido con il concorrente verso la stazione appaltante. L'avvalimento non vale per i requisiti di ordine generale."),
 (4,"chiaro",0.6,"Torniamo alla piccola impresa di pulizie. Con un contratto di avvalimento puo' appoggiarsi al fatturato e all'esperienza di un'impresa piu' grande, che risponde insieme a lei."),
 (4,"tenue",0.8,"Attenzione: con l'avvalimento non si prestano i requisiti morali. L'onorabilita' e l'assenza di condanne deve averle ciascuna impresa per conto proprio."),
 (4,"profondo",1.2,"Si possono prestare i mezzi, non la reputazione."),

 (5,"chiaro",0.5,"Un altro modo di partecipare insieme e' il raggruppamento temporaneo di imprese. Piu' operatori conferiscono un mandato collettivo a uno di loro, la mandataria, che presenta l'offerta."),
 (5,"chiaro",0,"Nell'offerta si indica quali parti del contratto eseguira' ciascuna impresa. Il raggruppamento nasce per quella gara, e non crea una nuova societa'."),
 (5,"chiaro",0,"Il raggruppamento e' orizzontale quando le imprese fanno lo stesso tipo di prestazione, dividendosela. E' verticale quando una fa la prestazione principale e le altre quelle secondarie."),
 (5,"chiaro",0,"Nel raggruppamento orizzontale tutte le imprese rispondono in solido verso la stazione appaltante. Nel verticale le mandanti rispondono per la propria parte, e la mandataria in solido per tutto."),
 (5,"chiaro",0,"Esistono anche i consorzi, stabili o di cooperative, che partecipano come un unico soggetto e indicano le imprese consorziate che eseguiranno il servizio."),
 (5,"chiaro",0,"Una stessa impresa non puo' partecipare alla gara sia da sola sia dentro un raggruppamento: si alterebbe la concorrenza, perche' presenterebbe di fatto due offerte."),
 (5,"chiaro",0.6,"Un esempio: tre imprese si uniscono per la gara di manutenzione degli impianti di un ospedale. Una fa gli impianti elettrici, principali, le altre quelli idraulici e antincendio: e' un verticale."),
 (5,"tenue",0.8,"Un distrattore frequente: nel raggruppamento orizzontale non risponde solo la mandataria. Tutte le imprese rispondono in solido verso la stazione appaltante."),
 (5,"profondo",1.2,"Insieme per vincere, insieme per rispondere."),

 (6,"chiaro",0.5,"Il subappalto e' il contratto con cui l'appaltatore affida a un'altra impresa l'esecuzione di una parte delle prestazioni. Il contratto d'appalto, invece, non si puo' cedere."),
 (6,"chiaro",0,"Il codice non fissa piu' un limite percentuale generale. E' la stazione appaltante che indica nei documenti di gara le prestazioni che l'appaltatore deve eseguire direttamente."),
 (6,"chiaro",0,"Il subappalto deve essere autorizzato dalla stazione appaltante, che verifica i requisiti del subappaltatore. E l'impresa deve averlo dichiarato gia' in sede di offerta."),
 (6,"chiaro",0,"L'appaltatore resta responsabile verso la stazione appaltante di tutto il contratto, e risponde in solido con il subappaltatore degli obblighi retributivi e contributivi verso i lavoratori."),
 (6,"chiaro",0,"Ai lavoratori del subappaltatore spetta lo stesso trattamento economico e normativo che avrebbero avuto dall'appaltatore, compreso il contratto collettivo applicato."),
 (6,"chiaro",0.6,"Un esempio: l'impresa che ha vinto le pulizie subappalta la sanificazione delle sale operatorie. Serve l'autorizzazione, e i lavoratori del subappaltatore hanno le stesse tutele."),
 (6,"tenue",0.8,"Attenzione: il subappalto non libera l'appaltatore dalle sue responsabilita'. Resta responsabile verso la stazione appaltante, e in solido per i lavoratori."),
 (6,"profondo",1.2,"Chi subappalta, resta comunque responsabile."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: i requisiti generali di affidabilita' sono agli articoli 94 e seguenti, con cause di esclusione automatiche e non automatiche."),
 (7,"chiaro",0.8,"La seconda: con l'avvalimento si prestano i requisiti speciali, non quelli generali, e l'ausiliaria risponde in solido; nei raggruppamenti orizzontali rispondono in solido tutte le imprese."),
 (7,"chiaro",0.8,"La terza: il subappalto va autorizzato, l'appaltatore resta responsabile e risponde in solido per i lavoratori, che hanno lo stesso trattamento."),
 (7,"tenue",0.8,"L'ultimo distrattore: il soccorso istruttorio non serve a correggere l'offerta economica. Serve a integrare documenti e dichiarazioni mancanti."),

 (8,"profondo",0,"[warm] In sintesi: affidabilita' per tutti, capacita' anche insieme, responsabilita' sempre. Nell'ultima lezione del modulo: l'esecuzione del contratto, dalla firma al collaudo."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'I requisiti di ordine generale', 4: "I requisiti speciali e l'avvalimento", 5: 'I raggruppamenti temporanei', 6: 'Il subappalto', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
