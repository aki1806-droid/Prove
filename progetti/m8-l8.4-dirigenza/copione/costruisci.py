# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 8.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M8): la dirigenza. D.Lgs. 165 art. 15 (due fasce), 16-17 (funzioni), 19 (c. 1 criteri, 1-bis avviso,
# 1-ter revoca solo ex art. 21, c. 2 durata 3-5 anni, c. 6 esterni 10% e 8%, c. 8 cessazione incarichi di
# vertice), 21 (responsabilita' dirigenziale; c. 1-bis vigilanza), 22 (Comitato dei garanti), 23 (ruoli),
# 24 (c. 1 accessorio, c. 1-bis 30% non per il SSN, c. 3 onnicomprensivita'), 28 e 28-bis (accesso). Dirigenza
# SSN: D.Lgs. 502/1992 art. 15 ss. (da verificare). Art. 28 Cost.; responsabilita' penale (abuso d'ufficio
# abrogato dalla L. 114/2024), amministrativo-contabile (dolo o colpa grave), disciplinare. Tetto retributivo
# D.L. 66/2014 (da verificare). Fonti: D.Lgs. 165 al 24/1/2020; dispensa su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un funzionario vince il concorso da dirigente. Firma il contratto, ma il suo ufficio lo sapra' solo con l'incarico. E dal giorno dopo risponde di obiettivi, spesa e personale. Di che cosa, esattamente?"),
 (1,"chiaro",0,"Il dirigente pubblico e' la figura su cui la riforma ha scommesso di piu': gestisce con i poteri del datore di lavoro, ed e' chiamato a rendere conto dei risultati."),
 (1,"profondo",1.2,"Piu' autonomia nella gestione, piu' responsabilita' nei risultati."),

 (2,"chiaro",0.6,"Quattro passaggi. Le fasce e l'accesso alla dirigenza. Gli incarichi. Il trattamento economico. E infine le responsabilita' del dirigente, e di ogni dipendente pubblico."),

 (3,"chiaro",0.5,"L'articolo 15 del 165 dice che la dirigenza dello Stato e' articolata in due fasce: la prima, per gli incarichi piu' alti, e la seconda. I dirigenti sono iscritti nei ruoli dell'amministrazione."),
 (3,"chiaro",0,"Alla seconda fascia si accede per concorso per esami, oppure con il corso concorso della Scuola nazionale dell'amministrazione. Servono la laurea e requisiti di esperienza fissati dalla legge."),
 (3,"chiaro",0,"Per esempio, per i dipendenti di ruolo con laurea servono cinque anni di servizio in posizioni per cui e' richiesta la laurea. Bastano tre anni con un dottorato di ricerca o un diploma di specializzazione."),
 (3,"chiaro",0,"Alla prima fascia si arriva per meta' dei posti con un concorso pubblico per titoli ed esami. Per il resto passano i dirigenti di seconda fascia con almeno cinque anni di incarichi di livello generale."),
 (3,"chiaro",0,"E nella sanita'? La dirigenza del Servizio sanitario nazionale ha regole proprie, nel decreto legislativo 502 del 1992: un ruolo unico, accesso per concorso, incarichi di struttura e incarichi professionali."),
 (3,"chiaro",0.6,"Un esempio: un dirigente amministrativo di un'azienda sanitaria entra per concorso e poi riceve un incarico, per esempio la direzione dell'ufficio del personale, per un tempo determinato."),
 (3,"tenue",0.8,"Occhio a un distrattore: per diventare dirigente non esiste un concorso interno riservato. L'accesso e' per concorso pubblico, anche quando parte dei posti e' coperta dai dirigenti gia' in servizio."),
 (3,"profondo",1.2,"Si diventa dirigenti per concorso, non per anzianita'."),

 (4,"chiaro",0.5,"Qui c'e' una distinzione decisiva. La qualifica di dirigente si ottiene una volta, con il concorso, e il rapporto e' a tempo indeterminato. L'incarico, invece, e' sempre a tempo."),
 (4,"chiaro",0,"Per conferire un incarico, l'articolo 19 guarda agli obiettivi e alla complessita' della struttura, alle attitudini e capacita' del dirigente, ai risultati ottenuti prima e alla loro valutazione."),
 (4,"chiaro",0,"L'amministrazione deve rendere noti i posti disponibili e i criteri di scelta, anche con un avviso sul sito, e valutare le candidature dei dirigenti interessati."),
 (4,"chiaro",0,"L'incarico dura da tre a cinque anni, e il provvedimento indica l'oggetto e gli obiettivi da raggiungere. Puo' essere rinnovato, ma non e' automatico."),
 (4,"chiaro",0,"Gli incarichi possono essere dati anche a persone esterne, con qualita' professionali particolari, ma entro limiti precisi: per lo Stato, il dieci per cento dei posti di prima fascia e l'otto per cento di seconda."),
 (4,"chiaro",0,"Nella scelta contano anche le pari opportunita': per gli incarichi di livello generale i criteri di conferimento devono tenerne conto."),
 (4,"chiaro",0,"E la revoca? L'incarico si puo' revocare solo nei casi previsti dall'articolo 21, cioe' per responsabilita' dirigenziale, e dopo una contestazione. Non per semplice cambio di vertice."),
 (4,"chiaro",0,"C'e' un'eccezione: gli incarichi di vertice, come i segretari generali dei ministeri, cessano novanta giorni dopo la fiducia a un nuovo governo, se non vengono confermati."),
 (4,"tenue",0.8,"Attenzione: non e' vero che l'incarico dirigenziale dura da due a sette anni. Era la regola di fine anni Novanta. Oggi la forbice e' da tre a cinque anni."),
 (4,"profondo",1.2,"La qualifica resta, l'incarico si guadagna ogni volta."),

 (5,"chiaro",0.5,"La retribuzione del dirigente e' fissata dai contratti collettivi delle aree dirigenziali. C'e' una parte fondamentale, uguale per tutti, e una parte accessoria."),
 (5,"chiaro",0,"L'accessoria ha due componenti: la retribuzione di posizione, legata al peso dell'incarico e alle responsabilita', e la retribuzione di risultato, legata agli obiettivi raggiunti."),
 (5,"chiaro",0,"Per i dirigenti dello Stato la parte di risultato deve arrivare almeno al trenta per cento della retribuzione complessiva. La regola, pero', non si applica alla dirigenza del Servizio sanitario nazionale."),
 (5,"chiaro",0,"E se l'amministrazione non ha un sistema di valutazione, la retribuzione di risultato non si puo' pagare. Senza misurare, non si premia."),
 (5,"chiaro",0,"Poi c'e' il principio di onnicomprensivita': lo stipendio remunera tutte le funzioni del dirigente. I compensi per incarichi aggiuntivi vanno all'amministrazione, non in tasca a lui."),
 (5,"chiaro",0,"E c'e' un tetto massimo per le retribuzioni di tutti i dipendenti pubblici, fissato dalla legge, che oggi e' di duecentoquaranta mila euro l'anno."),
 (5,"tenue",0.8,"Un distrattore frequente: la retribuzione di risultato non e' uno stipendio fisso. Dipende dagli obiettivi raggiunti e dalla valutazione, e puo' essere ridotta o non pagata."),
 (5,"profondo",1.2,"Posizione per il peso dell'incarico, risultato per quello che si ottiene."),

 (6,"chiaro",0.5,"Ogni dipendente pubblico risponde in quattro modi diversi. La prima e' la responsabilita' civile: l'articolo 28 della Costituzione dice che funzionari e dipendenti rispondono direttamente degli atti compiuti."),
 (6,"chiaro",0,"E l'amministrazione ne risponde con loro, in solido. Se l'ente risarcisce un danno causato a un terzo, puo' poi rivalersi sul dipendente responsabile."),
 (6,"chiaro",0,"La seconda e' la responsabilita' penale, per i reati contro la pubblica amministrazione: il peculato, la concussione, la corruzione, il falso in atto pubblico."),
 (6,"chiaro",0,"La terza e' la responsabilita' amministrativo contabile: chi causa un danno all'erario, con dolo o colpa grave, ne risponde davanti alla Corte dei conti."),
 (6,"chiaro",0,"Il danno puo' essere diretto, come una spesa inutile, o indiretto, quando l'ente deve risarcire un terzo per colpa del dipendente e poi chiede a lui di restituire."),
 (6,"chiaro",0,"La quarta e' la responsabilita' disciplinare, per chi viola i doveri del contratto e del codice di comportamento. La vedremo nella prossima lezione."),
 (6,"chiaro",0,"Per i dirigenti se ne aggiunge una quinta, la responsabilita' dirigenziale dell'articolo 21: obiettivi non raggiunti o direttive non rispettate impediscono il rinnovo dell'incarico."),
 (6,"chiaro",0,"Nei casi piu' gravi, dopo una contestazione, l'amministrazione puo' revocare l'incarico o arrivare al recesso dal rapporto, sentito il comitato dei garanti."),
 (6,"chiaro",0,"E il dirigente che non vigila sul rispetto degli standard da parte del suo personale puo' vedersi ridurre la retribuzione di risultato, fino all'ottanta per cento."),
 (6,"tenue",0.8,"Attenzione: l'abuso d'ufficio non e' piu' un reato. E' stato abrogato nel 2024. Restano gli altri reati contro la pubblica amministrazione."),
 (6,"profondo",1.2,"Quattro responsabilita' per tutti, una in piu' per chi dirige."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: la dirigenza dello Stato ha due fasce; si accede per concorso o corso concorso; la dirigenza sanitaria ha regole proprie, nel decreto 502."),
 (7,"chiaro",0.8,"La seconda: la qualifica e' a tempo indeterminato, l'incarico dura da tre a cinque anni e si revoca solo per responsabilita' dirigenziale; la retribuzione ha posizione e risultato."),
 (7,"chiaro",0.8,"La terza: le responsabilita' sono civile, penale, amministrativo contabile e disciplinare; per i dirigenti si aggiunge quella dirigenziale, legata ai risultati."),
 (7,"tenue",0.8,"L'ultimo distrattore: la responsabilita' dirigenziale non e' una sanzione disciplinare. Riguarda i risultati e le direttive, e si somma all'eventuale responsabilita' disciplinare."),

 (8,"profondo",0,"[warm] In sintesi: si entra per concorso, si guida per incarichi a tempo, si risponde dei risultati. Nella prossima lezione: i doveri del dipendente e la responsabilita' disciplinare."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Le fasce e l'accesso", 4: 'Gli incarichi', 5: 'Il trattamento economico', 6: "Le responsabilita'", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
