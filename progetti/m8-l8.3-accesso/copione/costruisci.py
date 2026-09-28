# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 8.3 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M8): l'accesso. Art. 97 c. 4 Cost.; D.Lgs. 165 art. 35 (c. 1 lett. a-b: procedure selettive e
# avviamento dalle liste; c. 2 categorie protette, L. 68/1999; c. 3 principi e commissioni; c. 4 piano dei
# fabbisogni; c. 5-bis permanenza cinque anni; c. 5-ter graduatorie due anni), art. 35-ter (portale inPA,
# D.L. 80/2021, da verificare), art. 36, art. 37 (inglese e informatica), art. 38 (cittadini UE), art. 52
# c. 1-bis (progressioni fra aree, testo D.L. 80/2021 da verificare). Regolamenti: D.P.R. 487/1994 (riscritto
# dal D.P.R. 82/2023), D.P.R. 220/2001 per il comparto SSN (da verificare). Fonti: D.Lgs. 165 al 24/1/2020;
# dispensa su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un giovane operatore legge un bando della sua azienda sanitaria: posti da assistente amministrativo. Requisiti, prove, scadenze. Da dove viene tutta questa procedura?"),
 (1,"chiaro",0,"Viene da un principio della Costituzione e da poche regole del 165. Conoscerle serve due volte: per partecipare a un concorso, e per capire la selezione interna che stai preparando."),
 (1,"profondo",1.2,"Ogni posto pubblico si conquista con una prova aperta."),

 (2,"chiaro",0.6,"Quattro passaggi. Le vie d'ingresso nella pubblica amministrazione. I principi del concorso. Il bando, i requisiti e le prove. E infine la graduatoria, con quello che viene dopo."),

 (3,"chiaro",0.5,"L'articolo 35 del 165 dice che l'assunzione avviene con un contratto individuale di lavoro. Ma a quel contratto si arriva per strade precise, fissate dalla legge."),
 (3,"chiaro",0,"La strada principale sono le procedure selettive, cioe' i concorsi, che devono accertare la professionalita' richiesta e garantire in misura adeguata l'accesso dall'esterno."),
 (3,"chiaro",0,"La seconda strada e' l'avviamento dalle liste dei centri per l'impiego. Vale per i profili per cui basta la scuola dell'obbligo, con eventuali requisiti professionali in piu'."),
 (3,"chiaro",0,"La terza riguarda le categorie protette: le persone con disabilita' e le altre categorie previste dalla legge 68 del 1999 hanno assunzioni obbligatorie, anche per chiamata numerica."),
 (3,"chiaro",0,"E ogni assunzione parte dalla programmazione: l'amministrazione avvia le procedure sulla base del proprio piano triennale dei fabbisogni di personale, oggi parte del PIAO."),
 (3,"chiaro",0,"E prima di bandire un concorso l'ente deve verificare se puo' coprire il posto con personale gia' pubblico, attraverso la mobilita'. La vedremo nell'ultima lezione del modulo."),
 (3,"chiaro",0.6,"Un esempio: un'azienda sanitaria che deve coprire posti di operatore tecnico con la sola scuola dell'obbligo puo' chiedere l'avviamento al centro per l'impiego, con una prova di idoneita'."),
 (3,"tenue",0.8,"Occhio a un distrattore: l'avviamento dalle liste non e' una scorciatoia libera. Vale solo per i profili previsti dalla legge, e anche li' serve una prova di idoneita'."),
 (3,"profondo",1.2,"Tre strade, nessuna scelta a discrezione."),

 (4,"chiaro",0.5,"Il comma 3 dell'articolo 35 fissa i principi di ogni procedura. Il primo e' la pubblicita': il bando deve essere conosciuto da tutti quelli che possono partecipare."),
 (4,"chiaro",0,"Poi l'imparzialita', l'economicita' e la rapidita' delle procedure, anche con sistemi automatizzati e con prove preselettive quando i candidati sono molti."),
 (4,"chiaro",0,"Servono meccanismi oggettivi e trasparenti, capaci di verificare le attitudini e la professionalita' richieste per quel posto. E il rispetto delle pari opportunita' tra donne e uomini."),
 (4,"chiaro",0,"E le procedure sono decentrate: di regola ogni amministrazione organizza le proprie selezioni, secondo il proprio piano dei fabbisogni."),
 (4,"chiaro",0,"La commissione e' composta solo da esperti di provata competenza: funzionari, docenti, esperti esterni. Mai politici dell'amministrazione, ne' rappresentanti sindacali."),
 (4,"chiaro",0.6,"Un esempio: in un concorso con migliaia di domande l'azienda puo' fare una preselezione con quiz al computer, e ammettere alle prove solo chi la supera."),
 (4,"chiaro",0,"I dettagli stanno nei regolamenti. Quello generale sui concorsi e' del 1994, riscritto nel 2023. Per il comparto sanita' c'e' un regolamento specifico, del 2001."),
 (4,"tenue",0.8,"Attenzione: nella commissione possono stare anche esperti esterni all'amministrazione. Quello che la legge esclude sono i politici e i sindacalisti."),
 (4,"profondo",1.2,"Pubblicita', imparzialita', trasparenza, esperti veri."),

 (5,"chiaro",0.5,"Il bando e' la legge del concorso. Indica i posti, i requisiti, le prove, i titoli valutabili, le scadenze. E vincola sia i candidati sia l'amministrazione."),
 (5,"chiaro",0,"I requisiti generali sono l'eta' minima, l'idoneita' fisica, il godimento dei diritti politici, il titolo di studio richiesto per il profilo. E la cittadinanza."),
 (5,"chiaro",0,"Per alcuni profili sanitari servono anche requisiti professionali specifici, come il titolo abilitante e l'iscrizione all'albo della professione."),
 (5,"chiaro",0,"Sulla cittadinanza: l'articolo 38 apre ai cittadini dell'Unione europea tutti i posti che non comportano l'esercizio di pubblici poteri o la tutela dell'interesse nazionale."),
 (5,"chiaro",0,"Le prove possono essere scritte, pratiche e orali, secondo il profilo. E nei concorsi si accertano anche la conoscenza della lingua inglese e delle tecnologie informatiche."),
 (5,"chiaro",0,"Negli ultimi anni le procedure sono diventate piu' digitali: prove al computer, bandi pubblicati anche sul portale unico del reclutamento, inPA, e domande presentate online."),
 (5,"chiaro",0,"Il bando indica anche le riserve di posti e i titoli di preferenza previsti dalla legge, per esempio per i militari congedati o per chi ha gia' lavorato con contratto a termine nell'ente."),
 (5,"chiaro",0.6,"Torniamo al bando da assistente amministrativo. Il diploma e' il requisito d'accesso; poi prova scritta, prova orale con inglese e informatica, e una valutazione dei titoli."),
 (5,"tenue",0.8,"Un distrattore frequente: il bando non si puo' cambiare a piacere durante la procedura. Fissa le regole prima, perche' tutti conoscano in anticipo come saranno valutati."),
 (5,"profondo",1.2,"Il bando e' la regola uguale per tutti, scritta prima."),

 (6,"chiaro",0.5,"Alla fine delle prove la commissione forma la graduatoria di merito. Chi e' nei primi posti utili vince il concorso; gli altri che hanno superato le prove sono idonei."),
 (6,"chiaro",0,"Le graduatorie restano valide per un periodo fissato dalla legge, di norma due anni dall'approvazione. In quel tempo l'amministrazione puo' scorrerle per coprire altri posti."),
 (6,"chiaro",0.6,"Un esempio: su dieci posti a bando, chi e' arrivato quindicesimo puo' essere assunto l'anno dopo, se l'azienda decide di coprire altri cinque posti con la stessa graduatoria."),
 (6,"chiaro",0,"Chi vince firma il contratto individuale e comincia con un periodo di prova, fissato dal contratto collettivo. Superata la prova, l'assunzione diventa definitiva."),
 (6,"chiaro",0,"E c'e' un vincolo: i vincitori devono restare nella sede di prima destinazione per almeno cinque anni. Serve a evitare che i posti si svuotino subito dopo il concorso."),
 (6,"chiaro",0,"Chi e' gia' dentro l'amministrazione, invece, puo' crescere con le progressioni tra le aree: una procedura comparativa, con almeno la meta' dei posti riservata all'accesso dall'esterno."),
 (6,"chiaro",0,"Nella procedura contano la valutazione positiva degli ultimi tre anni, l'assenza di sanzioni disciplinari, i titoli e le competenze ulteriori, il numero e il tipo di incarichi svolti."),
 (6,"chiaro",0,"E se qualcosa va storto nel concorso? Le liti sulle procedure di assunzione vanno al giudice amministrativo. Dopo l'assunzione, come abbiamo visto, al giudice del lavoro."),
 (6,"tenue",0.8,"Attenzione: l'idoneo non ha diritto all'assunzione. Puo' essere chiamato se la graduatoria viene scorsa mentre e' valida, ma non puo' pretendere il posto."),
 (6,"profondo",1.2,"Vincere apre la porta, l'idoneita' la tiene socchiusa."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: si entra con procedure selettive, con l'avviamento dalle liste per i profili della scuola dell'obbligo, o con le assunzioni obbligatorie delle categorie protette."),
 (7,"chiaro",0.8,"La seconda: il concorso segue i principi dell'articolo 35, cioe' pubblicita', imparzialita', trasparenza, pari opportunita', e una commissione di soli esperti, senza politici ne' sindacalisti."),
 (7,"chiaro",0.8,"La terza: la graduatoria resta valida per un periodo fissato dalla legge, i vincitori restano cinque anni nella prima sede, e gli interni crescono con la procedura comparativa."),
 (7,"tenue",0.8,"L'ultimo distrattore: i cittadini dell'Unione europea possono accedere ai posti pubblici, salvo quelli che comportano pubblici poteri o la tutela dell'interesse nazionale."),

 (8,"profondo",0,"[warm] In sintesi: strade fissate dalla legge, un bando uguale per tutti, una graduatoria di merito. Nella prossima lezione: la dirigenza e le sue responsabilita'."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Le vie d'ingresso", 4: 'I principi del concorso', 5: 'Bando, requisiti, prove', 6: 'Graduatoria e dopo', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
