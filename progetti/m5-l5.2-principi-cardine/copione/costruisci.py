# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 5.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M5): i principi cardine della L. 241/1990. Art. 1 c. 1 (fini di legge; economicita',
# efficacia, imparzialita', pubblicita', trasparenza; principi UE); c. 1-bis (diritto privato per
# atti non autoritativi); c. 1-ter (privati); c. 2 (divieto di aggravamento); c. 2-bis (collaborazione
# e buona fede, D.L. 76/2020); proporzionalita' e ragionevolezza (principi UE e giurisprudenza);
# partecipazione, tempi certi, responsabilizzazione, semplificazione. Fonti: L. 241/1990; dispensa CISL FP.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Una legge si capisce dalle prime righe. L'articolo 1 della 241 e' breve, ma dentro c'e' tutto: come deve comportarsi un'amministrazione, qualunque cosa stia decidendo."),
 (1,"chiaro",0,"Sono i principi cardine. Ai quiz compaiono spesso come elenco da ricordare, ma servono soprattutto a leggere ogni altra regola della legge. Vediamoli uno per uno."),
 (1,"profondo",1.2,"Prima dei singoli articoli, il modo di stare davanti al cittadino."),

 (2,"chiaro",0,"Quattro passaggi. L'articolo 1 e i suoi criteri. Trasparenza e partecipazione. Tempi certi e responsabilita'. Semplificazione, collaborazione e buona fede."),

 (3,"chiaro",0,"Il punto di partenza e' la legalita': l'attivita' amministrativa persegue i fini determinati dalla legge. L'amministrazione non sceglie da sola i propri scopi, li riceve dalla legge."),
 (3,"chiaro",0,"Poi i criteri. L'attivita' e' retta da criteri di economicita', di efficacia, di imparzialita', di pubblicita' e di trasparenza. Cinque parole da sapere a memoria, nell'ordine della legge."),
 (3,"chiaro",0,"Economicita' vuol dire usare le risorse senza sprechi. Efficacia vuol dire raggiungere davvero il risultato. Non basta spendere poco: bisogna anche arrivare all'obiettivo."),
 (3,"chiaro",0,"Imparzialita' vuol dire trattare tutti allo stesso modo, senza favoritismi. Pubblicita' e trasparenza vogliono dire che l'azione dell'amministrazione deve essere conoscibile e comprensibile."),
 (3,"chiaro",0,"Un esempio di imparzialita' in azienda: una graduatoria per un incarico segue criteri fissati prima, uguali per tutti, e non il nome di chi presenta la domanda."),
 (3,"chiaro",0,"A questi si aggiungono i principi dell'ordinamento europeo. Da li' vengono, tra gli altri, la proporzionalita' e il legittimo affidamento."),
 (3,"chiaro",0,"Proporzionalita' e ragionevolezza non sono scritte come parole nell'articolo 1, ma sono applicate da tempo dai giudici: la misura scelta deve essere adeguata e non piu' pesante del necessario."),
 (3,"chiaro",0,"Il comma 1-bis aggiunge una regola importante: quando adotta atti non autoritativi, l'amministrazione agisce secondo il diritto privato, salvo che la legge disponga diversamente."),
 (3,"chiaro",0,"E il comma 1-ter estende gli stessi criteri ai soggetti privati che svolgono attivita' amministrative, con un livello di garanzia non inferiore a quello pubblico."),
 (3,"tenue",0,"Occhio a un distrattore: tra i criteri dell'articolo 1 non c'e' la produttivita' e non c'e' il profitto. Ci sono economicita', efficacia, imparzialita', pubblicita' e trasparenza."),
 (3,"profondo",1.2,"Fini fissati dalla legge, cinque criteri per raggiungerli."),

 (4,"chiaro",0,"La trasparenza e' il principio che ha cambiato di piu' il rapporto con il cittadino. Vuol dire che le decisioni devono essere comprensibili e conoscibili, per consentire un controllo."),
 (4,"chiaro",0,"Nella 241 la trasparenza prende corpo soprattutto nel diritto di accesso ai documenti e nell'obbligo di motivare. Piu' avanti, il decreto 33 del 2013 la estendera' con la pubblicazione e l'accesso civico."),
 (4,"chiaro",0,"La trasparenza protegge anche chi lavora nell'amministrazione: un procedimento chiaro e documentato mette al riparo da sospetti e da pressioni."),
 (4,"chiaro",0,"La partecipazione e' il secondo pilastro. Chi e' toccato da una decisione deve poter intervenire mentre si forma, non soltanto subirla alla fine."),
 (4,"chiaro",0,"Per questo la legge prevede la comunicazione di avvio del procedimento, il diritto di vedere gli atti e di presentare memorie scritte e documenti, che l'amministrazione deve valutare."),
 (4,"chiaro",0,"Partecipare conviene a tutti. Il cittadino difende le sue ragioni, e l'amministrazione decide con informazioni migliori, riducendo errori e contenziosi."),
 (4,"chiaro",0,"Un esempio in sanita': prima di decidere su una richiesta di un utente o di un dipendente, l'azienda ascolta le sue ragioni e le pesa nella decisione finale."),
 (4,"tenue",0,"Attenzione: partecipare non vuol dire decidere insieme. La decisione resta all'amministrazione, che pero' deve tenere conto delle memorie pertinenti e spiegare perche' non le accoglie."),
 (4,"profondo",1.2,"Vedere come si decide, e poter dire la propria prima della decisione."),

 (5,"chiaro",0,"Il terzo principio e' la certezza dei tempi. Ogni procedimento deve concludersi con un provvedimento espresso entro un termine stabilito. Lo vedremo nel dettaglio nella lezione cinque punto cinque."),
 (5,"chiaro",0,"Tempi certi vogliono dire poter programmare: un'impresa sa quando potra' partire, un cittadino sa quando avra' una risposta, un dipendente sa quando sara' deciso il suo caso."),
 (5,"chiaro",0,"Il quarto principio e' la responsabilizzazione. Per ogni procedimento c'e' un responsabile, e il ritardo non e' piu' di nessuno: pesa sulla valutazione della performance del dirigente e del funzionario."),
 (5,"chiaro",0,"Il ritardo puo' portare anche a responsabilita' disciplinare e amministrativo contabile. E se causa un danno ingiusto al cittadino, l'amministrazione deve risarcirlo."),
 (5,"chiaro",0,"La responsabilita' ha anche un rovescio: chi guida un procedimento deve poter lavorare, con compiti chiari e termini fissati in anticipo per ogni tipo di pratica."),
 (5,"chiaro",0,"Responsabilizzare non vuol dire colpevolizzare. Vuol dire rendere visibile chi fa che cosa, cosi' che il lavoro fatto bene si veda e i ritardi abbiano un nome."),
 (5,"tenue",0,"Un distrattore frequente: il silenzio dell'amministrazione non e' mai una scelta libera e senza conseguenze. Anche quando la legge gli da' un valore, e' un'eccezione precisa, non la regola."),
 (5,"profondo",1.2,"Una data di scadenza e un nome: la fine dell'attesa senza risposta."),

 (6,"chiaro",0,"Il quinto principio e' la semplificazione. La regola base e' il divieto di aggravamento: l'amministrazione non puo' aggravare il procedimento, se non per straordinarie e motivate esigenze dell'istruttoria."),
 (6,"chiaro",0,"In pratica: niente passaggi inutili, niente documenti chiesti due volte. Se un dato e' gia' in possesso di un'amministrazione, lo si acquisisce d'ufficio invece di chiederlo al cittadino."),
 (6,"chiaro",0,"Un esempio: per una domanda di mobilita' interna non si chiede al dipendente di allegare certificati che l'azienda conserva gia' nel suo fascicolo personale."),
 (6,"chiaro",0,"Da qui nascono gli strumenti che vedremo: l'autocertificazione, la segnalazione certificata di inizio attivita', il silenzio assenso, la conferenza di servizi."),
 (6,"chiaro",0,"Nel 2020 arriva un principio nuovo, il comma 2-bis: i rapporti tra il cittadino e la pubblica amministrazione sono improntati ai principi della collaborazione e della buona fede."),
 (6,"chiaro",0,"Vale in due direzioni. L'amministrazione non tende tranelli e non cambia le carte in tavola. E il cittadino dichiara il vero e collabora, senza usare le regole per ostacolare."),
 (6,"chiaro",0,"Collegato c'e' l'uso della telematica: le amministrazioni sono chiamate a usare strumenti informatici e telematici, nei rapporti interni, con le altre amministrazioni e con i privati."),
 (6,"tenue",0,"Attenzione: semplificare non vuol dire rinunciare ai controlli. Autocertificazioni e segnalazioni si possono verificare, e chi dichiara il falso risponde anche penalmente."),
 (6,"profondo",1.2,"Meno carte inutili, piu' fiducia reciproca, controlli dove servono."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: l'attivita' amministrativa persegue i fini della legge ed e' retta da economicita', efficacia, imparzialita', pubblicita' e trasparenza, oltre ai principi europei."),
 (7,"chiaro",0,"La seconda: il divieto di aggravamento. Il procedimento non si appesantisce se non per straordinarie e motivate esigenze dell'istruttoria."),
 (7,"chiaro",0,"La terza: per gli atti non autoritativi si applica il diritto privato, e dal 2020 i rapporti con il cittadino sono improntati a collaborazione e buona fede."),
 (7,"tenue",0,"L'ultimo distrattore: la trasparenza non e' nell'articolo 97 della Costituzione e non e' nata con il decreto 33. E' nell'articolo 1 della 241 dal 2005."),

 (8,"profondo",0,"[warm] In sintesi: legalita', criteri chiari, porte aperte, tempi certi, meno burocrazia. Nella prossima lezione: il responsabile del procedimento."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "L'articolo 1", 4: 'Trasparenza e partecipazione', 5: "Tempi certi e responsabilita'", 6: 'Semplificazione e buona fede', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
