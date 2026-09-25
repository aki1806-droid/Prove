# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 5.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M5): il responsabile del procedimento. Art. 4 (unita' organizzativa responsabile per ogni tipo
# di procedimento, resa pubblica); art. 5 (assegnazione da parte del dirigente, default = funzionario
# preposto all'unita', comunicazione del nominativo); art. 6 (compiti a-e, provvedimento finale, organo
# competente che non si discosta senza motivare); art. 6-bis (conflitto di interessi, L. 190/2012);
# art. 2 c. 9 (ritardo e responsabilita'). Nota: nella 241 non si parla di «RUP» (codice dei contratti).
# Fonti: L. 241/1990 artt. 2, 4, 5, 6, 6-bis; dispensa CISL FP.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Una domanda depositata in un ufficio puo' passare per molte scrivanie. Ma la legge vuole che, fra tutte, ce ne sia una a cui il cittadino possa sempre rivolgersi: quella del responsabile del procedimento."),
 (1,"chiaro",0,"E' una figura che molti di voi incontrano ogni giorno, o che potreste diventare. Conoscere bene le sue regole e' utile per la prova, e per il lavoro."),
 (1,"profondo",1.2,"Un nome e un cognome dietro ogni pratica."),

 (2,"chiaro",0,"Quattro passaggi. Chi e' e come viene individuato il responsabile. Che cosa fa. Chi adotta il provvedimento finale. E le regole su conflitto di interessi e responsabilita'."),

 (3,"chiaro",0,"Si parte dall'articolo 4. Ogni amministrazione, per ciascun tipo di procedimento, stabilisce qual e' l'unita' organizzativa responsabile dell'istruttoria, degli adempimenti e del provvedimento finale."),
 (3,"chiaro",0,"Queste scelte non restano chiuse negli uffici: la legge chiede che siano rese pubbliche, cosi' chiunque puo' sapere quale ufficio si occupa di che cosa."),
 (3,"chiaro",0,"In un'azienda sanitaria, per esempio, l'elenco dei procedimenti indica che le pratiche dei dipendenti spettano alla gestione del personale e le richieste di accesso agli atti all'ufficio che detiene i documenti."),
 (3,"chiaro",0,"Poi l'articolo 5. Il dirigente di ciascuna unita' assegna a se' o a un altro dipendente dell'unita' la responsabilita' dell'istruttoria e di ogni altro adempimento del singolo procedimento."),
 (3,"chiaro",0,"Il dirigente sceglie in base all'organizzazione del lavoro e alle competenze: puo' distribuire i procedimenti tra piu' collaboratori, ciascuno responsabile dei propri."),
 (3,"chiaro",0,"Puo' assegnargli anche, eventualmente, l'adozione del provvedimento finale. Eventualmente: non e' automatico. L'istruttoria e la decisione possono restare in mani diverse."),
 (3,"chiaro",0,"E se il dirigente non assegna nessuno? La legge ha una regola di riserva: finche' non c'e' l'assegnazione, e' responsabile il funzionario preposto all'unita' organizzativa."),
 (3,"chiaro",0,"Cosi' un responsabile c'e' sempre. Non puo' succedere che una pratica resti senza nessuno che ne risponda."),
 (3,"chiaro",0,"L'unita' competente e il nome del responsabile vanno comunicati a chi riceve la comunicazione di avvio e, su richiesta, a chiunque vi abbia interesse."),
 (3,"tenue",0.6,"Occhio a un errore diffuso, anche in molte dispense: nella 241 non si parla di RUP. Il responsabile unico del progetto e' una figura del codice dei contratti pubblici. Qui si dice responsabile del procedimento."),
 (3,"profondo",1.2,"L'ufficio lo fissa l'amministrazione, la persona la assegna il dirigente."),

 (4,"chiaro",0,"I compiti sono all'articolo 6, in un elenco da conoscere. Primo: valuta le condizioni di ammissibilita', i requisiti di legittimazione e i presupposti rilevanti per il provvedimento."),
 (4,"chiaro",0,"Secondo: accerta d'ufficio i fatti. Per farlo puo' chiedere dichiarazioni e la rettifica di istanze sbagliate o incomplete, disporre accertamenti tecnici e ispezioni, ordinare l'esibizione di documenti."),
 (4,"chiaro",0,"Terzo: propone di indire la conferenza di servizi o, se ne ha la competenza, la indice lui stesso."),
 (4,"chiaro",0,"Quarto: cura le comunicazioni, le pubblicazioni e le notificazioni previste dalla legge e dai regolamenti."),
 (4,"chiaro",0,"Quinto: adotta il provvedimento finale, se ne ha la competenza. Altrimenti trasmette gli atti all'organo competente per l'adozione."),
 (4,"chiaro",0,"Un esempio in azienda: un dipendente chiede il riconoscimento di un periodo di servizio. Il responsabile verifica la domanda, chiede un documento mancante, controlla i dati e prepara l'atto."),
 (4,"chiaro",0,"Nella stessa logica, e' il responsabile del procedimento che accerta d'ufficio fatti, stati e qualita' che l'amministrazione deve certificare, senza chiederli al cittadino."),
 (4,"chiaro",0,"Il responsabile e' anche il punto di contatto: e' a lui che si chiede a che punto e' la pratica, ed e' lui che riceve le memorie e i documenti di chi partecipa."),
 (4,"tenue",0.6,"Un distrattore: il responsabile non e' un semplice passacarte. Ha poteri istruttori veri: chiede documenti, dispone accertamenti, puo' indire la conferenza di servizi."),
 (4,"profondo",1.2,"Valutare, accertare, comunicare, proporre o decidere."),

 (5,"chiaro",0,"Chi adotta il provvedimento finale? Se il responsabile ha la competenza, lo adotta lui. Se no, lo adotta l'organo competente, sulla base dell'istruttoria che il responsabile gli trasmette."),
 (5,"chiaro",0,"E qui c'e' una regola importante: l'organo competente, se e' diverso dal responsabile, non puo' discostarsi dalle risultanze dell'istruttoria se non indicandone la motivazione nel provvedimento finale."),
 (5,"chiaro",0,"Vuol dire che l'istruttoria conta davvero. Chi decide puo' non essere d'accordo, ma deve dire perche', per iscritto, nell'atto."),
 (5,"chiaro",0,"Un esempio: l'istruttoria conclude che un'istanza va accolta, ma il dirigente la respinge. Deve spiegare nel provvedimento quali elementi lo portano a una conclusione diversa."),
 (5,"chiaro",0,"Questa regola protegge il cittadino da decisioni arbitrarie, e protegge anche il lavoro del responsabile, che non puo' essere ignorato senza una ragione."),
 (5,"chiaro",0,"E se un altro ufficio non rende in tempo un parere? Il responsabile non risponde dei danni causati da quel ritardo, salvo il caso in cui non abbia chiesto il parere."),
 (5,"tenue",0.6,"Attenzione: non e' vero che il responsabile del procedimento adotta sempre il provvedimento finale. Lo adotta solo se ne ha la competenza."),
 (5,"profondo",1.2,"Chi decide puo' dissentire dall'istruttoria, ma deve motivare."),

 (6,"chiaro",0,"L'articolo 6-bis e' arrivato nel 2012 con la legge anticorruzione. Il responsabile del procedimento deve astenersi in caso di conflitto di interessi."),
 (6,"chiaro",0,"L'obbligo vale anche per i titolari degli uffici competenti ad adottare pareri, valutazioni tecniche, atti intermedi e il provvedimento finale. E va segnalata ogni situazione di conflitto, anche solo potenziale."),
 (6,"chiaro",0,"Un esempio: il responsabile scopre che l'istanza e' presentata da un suo parente stretto. Deve segnalarlo e astenersi, e la pratica passa a un altro collega."),
 (6,"chiaro",0,"Poi la responsabilita' per i tempi. La mancata o tardiva conclusione del procedimento e' un elemento di valutazione della performance individuale."),
 (6,"chiaro",0,"E puo' comportare responsabilita' disciplinare e amministrativo contabile del dirigente e del funzionario inadempiente. Il ritardo, insomma, ha sempre un nome."),
 (6,"chiaro",0,"Entro il 30 gennaio di ogni anno, poi, il titolare del potere sostitutivo comunica all'organo di governo i procedimenti conclusi in ritardo: si vede dove l'organizzazione si inceppa."),
 (6,"chiaro",0,"Per chi lavora nel comparto, essere responsabili di procedimento e' spesso legato a incarichi di funzione: e' una responsabilita' che si costruisce con competenza e con ordine nel lavoro."),
 (6,"tenue",0.6,"Occhio: il conflitto va segnalato anche quando e' solo potenziale. Non serve aspettare che l'interesse personale abbia gia' influito sulla decisione."),
 (6,"profondo",1.2,"Imparziale nel merito, puntuale nei tempi, trasparente nei conflitti."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: il dirigente dell'unita' assegna la responsabilita' a se' o a un dipendente; in mancanza, e' responsabile il funzionario preposto all'unita'."),
 (7,"chiaro",0,"La seconda: i compiti dell'articolo 6. Valuta i presupposti, accerta i fatti, cura la conferenza di servizi e le comunicazioni, adotta il provvedimento se competente o trasmette gli atti."),
 (7,"chiaro",0,"La terza: l'organo competente non puo' discostarsi dall'istruttoria senza motivare. E in caso di conflitto di interessi, anche potenziale, il responsabile si astiene."),
 (7,"tenue",0.6,"L'ultimo distrattore: il nome del responsabile non e' riservato. Va comunicato ai destinatari della comunicazione di avvio e, a richiesta, a chiunque vi abbia interesse."),

 (8,"profondo",0,"[warm] In sintesi: un responsabile sempre individuato, compiti precisi, decisioni motivate. Nella prossima lezione: avvio del procedimento, partecipazione e motivazione."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Chi e' il responsabile", 4: 'Che cosa fa', 5: 'Chi decide alla fine', 6: "Imparzialita' e responsabilita'", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
