# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 5.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M5): termini, silenzio, semplificazione. Art. 2 (dovere di concludere con provvedimento
# espresso; 30 giorni; fino a 90 e, in casi particolari, fino a 180; decorrenza; sospensione una sola
# volta fino a 30 giorni; c. 8-bis atti tardivi inefficaci, D.L. 76/2020; poteri sostitutivi c. 9-bis
# e 9-ter, meta' del termine); art. 2-bis (danno da ritardo, indennizzo); silenzio inadempimento e
# ricorso (art. 31 c.p.a.); art. 20 (silenzio assenso ed esclusioni, tra cui la salute); art. 17-bis;
# art. 18 (acquisizione d'ufficio, autocertificazione); art. 19 (SCIA); art. 14 (conferenza di servizi).
# Fonti: L. 241/1990 (testo 2019 e modifiche 2020-2021); dispensa CISL FP.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Hai presentato una domanda. Passano i giorni, poi le settimane, e nessuno risponde. Che cosa succede? La risposta della legge e' precisa, e cambia a seconda del tipo di procedimento."),
 (1,"chiaro",0,"A volte il silenzio e' un inadempimento, contro cui puoi reagire. A volte vale come un si'. E a volte la legge ti permette di partire senza aspettare nessuna risposta."),
 (1,"profondo",1.2,"Il tempo della pubblica amministrazione ha delle regole precise."),

 (2,"chiaro",0.6,"Quattro passaggi. I termini del procedimento. Che cosa si puo' fare quando l'amministrazione tace. Il silenzio assenso. E gli strumenti di semplificazione: autocertificazione, SCIA e conferenza di servizi."),

 (3,"chiaro",0,"L'articolo 2 fissa il dovere di concludere. Se il procedimento nasce da un'istanza, o deve essere avviato d'ufficio, l'amministrazione lo conclude con un provvedimento espresso."),
 (3,"chiaro",0.6,"Il termine generale e' di trenta giorni. Vale ogni volta che una legge o un atto dell'amministrazione non ne prevede uno diverso."),
 (3,"chiaro",0,"Le amministrazioni statali e gli enti pubblici nazionali possono fissare termini diversi, ma non oltre novanta giorni. Regioni ed enti del servizio sanitario regolano i propri termini nel rispetto delle garanzie della legge."),
 (3,"chiaro",0,"Termini oltre i novanta giorni sono ammessi solo per ragioni particolari, come la complessita' del procedimento, e comunque non possono superare i centottanta giorni. Fanno eccezione cittadinanza e immigrazione."),
 (3,"chiaro",0,"Il termine decorre dall'inizio del procedimento d'ufficio o dal ricevimento della domanda, se il procedimento e' a iniziativa di parte."),
 (3,"chiaro",0,"Si puo' sospendere una sola volta, e per non piu' di trenta giorni, per acquisire informazioni o certificazioni che l'amministrazione non ha e non puo' ottenere da un'altra amministrazione."),
 (3,"chiaro",0.6,"Un esempio: un'azienda sanitaria stabilisce che una certa domanda del personale si chiude in sessanta giorni. Se manca un documento di un altro ente, puo' sospendere il termine una volta sola."),
 (3,"tenue",0.8,"Occhio a un distrattore: il termine di trenta giorni non si puo' sospendere piu' volte. La sospensione e' una sola, e per non piu' di trenta giorni."),
 (3,"profondo",1.2,"Trenta giorni come regola, una sola sospensione."),

 (4,"chiaro",0,"Se il termine scade senza provvedimento, si parla di silenzio inadempimento. L'amministrazione e' in ritardo, e il privato ha piu' strade."),
 (4,"chiaro",0,"La prima e' il potere sostitutivo. Ogni amministrazione individua una figura apicale, o un'unita' organizzativa, che interviene quando il responsabile non conclude in tempo."),
 (4,"chiaro",0,"Il nome del titolare del potere sostitutivo va pubblicato sul sito istituzionale, in modo ben visibile. Il privato puo' rivolgersi a lui, che conclude entro la meta' del termine originario."),
 (4,"chiaro",0.6,"Per esempio: se il termine era di sessanta giorni ed e' scaduto, il titolare del potere sostitutivo ha trenta giorni per concludere, direttamente o con un commissario."),
 (4,"chiaro",0,"La seconda strada e' il giudice amministrativo. Contro il silenzio si puo' ricorrere al tribunale amministrativo finche' dura l'inadempimento, e comunque non oltre un anno dalla scadenza del termine."),
 (4,"chiaro",0,"E c'e' il danno. Se il ritardo, doloso o colposo, causa un danno ingiusto, l'amministrazione lo risarcisce. In alcuni procedimenti a istanza di parte e' previsto anche un indennizzo per il solo ritardo."),
 (4,"chiaro",0,"Dal 2020, poi, alcuni atti di assenso adottati dopo la scadenza dei termini sono inefficaci. Il ritardo non resta senza conseguenze nemmeno per l'amministrazione."),
 (4,"tenue",0.8,"Attenzione: il silenzio inadempimento non e' un rifiuto. E' un'omissione. Il procedimento resta aperto e l'amministrazione ha ancora l'obbligo di decidere."),
 (4,"profondo",1.2,"Un sostituto, un giudice, un risarcimento: il ritardo ha un prezzo."),

 (5,"chiaro",0,"In certi casi, invece, il silenzio vale come accoglimento. E' il silenzio assenso, all'articolo 20. Riguarda i procedimenti a istanza di parte."),
 (5,"chiaro",0,"Se entro il termine l'amministrazione non comunica un diniego, e non indice una conferenza di servizi, il silenzio equivale all'accoglimento della domanda, senza bisogno di altre istanze o diffide."),
 (5,"chiaro",0,"Resta pero' il potere di intervenire in autotutela, cioe' di revocare o annullare l'atto formato con il silenzio, alle condizioni previste dalla legge."),
 (5,"chiaro",0,"Il silenzio assenso non vale in materie delicate: patrimonio culturale e paesaggistico, ambiente, difesa nazionale, pubblica sicurezza, immigrazione, asilo e cittadinanza."),
 (5,"chiaro",0.6,"E non vale, soprattutto per noi, per la salute e la pubblica incolumita'. Nelle materie sanitarie, di regola, serve un provvedimento espresso."),
 (5,"chiaro",0,"Non vale nemmeno quando il diritto europeo impone un provvedimento formale, o quando la legge qualifica il silenzio come rigetto. E dal 2021 il privato puo' chiedere un'attestazione che l'assenso si e' formato."),
 (5,"chiaro",0,"Esiste anche un silenzio assenso tra amministrazioni. Quando una deve ricevere l'assenso di un'altra, questo va dato entro trenta giorni, altrimenti si intende acquisito."),
 (5,"chiaro",0,"Ma per le amministrazioni che tutelano l'ambiente, il paesaggio, i beni culturali e la salute, il termine e' di novanta giorni."),
 (5,"tenue",0.8,"Un distrattore frequente: il silenzio assenso non e' la regola generale. Vale solo nei procedimenti a istanza di parte e non nelle materie escluse, tra cui la salute."),
 (5,"profondo",1.2,"Il silenzio vale si' solo dove la legge lo consente."),

 (6,"chiaro",0,"Primo strumento: l'acquisizione d'ufficio e l'autocertificazione. I documenti che un'amministrazione ha gia', o che un'altra detiene per legge, si acquisiscono d'ufficio."),
 (6,"chiaro",0,"Al cittadino si chiedono solo gli elementi per trovarli. E fatti, stati e qualita' si possono dichiarare con autocertificazione, secondo il testo unico sulla documentazione amministrativa, il 445 del 2000."),
 (6,"chiaro",0,"Secondo strumento: la segnalazione certificata di inizio attivita', la SCIA. Sostituisce autorizzazioni e licenze che dipendono solo dal possesso di requisiti fissati dalla legge."),
 (6,"chiaro",0.6,"L'attivita' puo' iniziare dalla data di presentazione. L'amministrazione ha sessanta giorni per controllare, trenta in edilizia, e se mancano i requisiti vieta la prosecuzione o chiede di mettersi in regola."),
 (6,"chiaro",0,"Chi dichiara il falso in una SCIA commette un reato. La semplificazione si regge sulla responsabilita' di chi dichiara."),
 (6,"chiaro",0,"Terzo strumento: la conferenza di servizi. Serve quando per decidere occorrono piu' pareri o assensi di amministrazioni diverse: invece di chiederli uno per uno, si esaminano insieme."),
 (6,"chiaro",0,"Puo' essere istruttoria, per esaminare insieme gli interessi coinvolti, o decisoria, quando servono piu' assensi. Si svolge di regola in forma semplificata, per via telematica, oppure in riunione."),
 (6,"tenue",0.8,"Attenzione: la SCIA non e' un provvedimento dell'amministrazione e non e' un silenzio assenso. E' il privato che parte, e l'amministrazione controlla dopo."),
 (6,"profondo",1.2,"Meno attese: chi ha i requisiti parte, i controlli arrivano dopo."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il termine generale e' di trenta giorni, fino a novanta e in casi particolari fino a centottanta; si sospende una sola volta, per non piu' di trenta giorni."),
 (7,"chiaro",0.8,"La seconda: in caso di silenzio inadempimento c'e' il titolare del potere sostitutivo, che conclude nella meta' del termine, e il ricorso al giudice entro un anno dalla scadenza."),
 (7,"chiaro",0.8,"La terza: il silenzio assenso vale nei procedimenti a istanza di parte, ma non per la salute, l'ambiente e le altre materie escluse. Con la SCIA si parte subito e i controlli arrivano dopo."),
 (7,"tenue",0.8,"L'ultimo distrattore: il silenzio assenso e il silenzio inadempimento sono opposti. Nel primo la domanda e' accolta, nel secondo l'amministrazione e' semplicemente in ritardo."),

 (8,"profondo",0,"[warm] In sintesi: tempi certi, rimedi contro l'inerzia, silenzi con un significato preciso, strumenti per fare prima. Nell'ultima lezione del modulo: il diritto di accesso ai documenti."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'I termini', 4: "Quando l'amministrazione tace", 5: "Il silenzio che vale si'", 6: 'Gli strumenti di semplificazione', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
