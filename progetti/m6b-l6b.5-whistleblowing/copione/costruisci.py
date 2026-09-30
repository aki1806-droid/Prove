# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 6b.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M6-bis, Anticorruzione): la tutela di chi segnala (whistleblowing, D.Lgs. 24/2023 che attua
# la direttiva UE 2019/1937 e sostituisce l'art. 54-bis del D.Lgs. 165/2001) e le altre misure:
# rotazione, formazione, patti di integrita'. Fonti: L. 190/2012 art. 1 cc. 5, 10, 17, 51; D.Lgs. 24/2023
# (da verificare sul testo vigente: il testo non e' su Drive); PNA 2019; dispense su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'infermiera si accorge che le ore di un servizio in appalto vengono pagate anche quando il personale non c'e'. Se lo dice, rischia il posto? E a chi deve dirlo?"),
 (1,"chiaro",0,"Senza tutele, molti tacerebbero. Per questo la legge protegge chi segnala un illecito scoperto nel lavoro. E' il whistleblowing, dall'inglese: chi soffia nel fischietto."),
 (1,"profondo",1.2,"Chi segnala un illecito va protetto, non punito."),

 (2,"chiaro",0.6,"Quattro passaggi. Chi puo' segnalare, e che cosa. I canali di segnalazione. Riservatezza e divieto di ritorsioni. E le altre misure: rotazione, formazione, patti di integrita'."),

 (3,"chiaro",0.5,"La prima tutela arriva con la legge 190, che nel 2012 introduce l'articolo 54-bis nel decreto 165. La legge 179 del 2017 la rafforza."),
 (3,"chiaro",0,"Oggi la disciplina e' il decreto legislativo 24 del 2023, che attua la direttiva europea 1937 del 2019. Sostituisce l'articolo 54-bis e vale sia per il settore pubblico sia per quello privato."),
 (3,"chiaro",0,"Chi e' protetto? Non solo i dipendenti. Anche collaboratori, consulenti, liberi professionisti, volontari e tirocinanti, e persino chi e' ancora in selezione o ha gia' lasciato il lavoro."),
 (3,"chiaro",0,"La protezione si estende a chi aiuta il segnalante, il facilitatore, ai colleghi con un rapporto abituale e ai parenti fino al quarto grado che lavorano nello stesso contesto."),
 (3,"chiaro",0,"Che cosa si segnala? Violazioni del diritto nazionale o europeo che ledono l'interesse pubblico o l'integrita' dell'amministrazione: illeciti penali, civili, amministrativi e contabili."),
 (3,"chiaro",0,"Non rientrano le rivendicazioni personali sul proprio rapporto di lavoro. Un conflitto con il capo reparto sui turni non e' whistleblowing: si affronta con gli strumenti ordinari."),
 (3,"chiaro",0,"La segnalazione deve basarsi su fondati motivi. Non servono prove certe, ma nemmeno semplici voci: servono elementi concreti, conosciuti nel contesto di lavoro."),
 (3,"chiaro",0,"E le segnalazioni anonime? L'ANAC le tratta come segnalazioni ordinarie. Se poi il segnalante viene identificato e subisce ritorsioni, le tutele valgono anche per lui."),
 (3,"tenue",0.8,"Attenzione: la tutela non riguarda solo i dipendenti di ruolo. Copre anche collaboratori, consulenti, tirocinanti e volontari."),
 (3,"profondo",1.2,"Un illecito che tocca l'interesse pubblico, non una lite personale."),

 (4,"chiaro",0.5,"I canali sono quattro. Il primo e' il canale interno. Nelle amministrazioni pubbliche e' affidato al responsabile della prevenzione della corruzione, l'RPCT."),
 (4,"chiaro",0,"La segnalazione interna puo' essere scritta, anche con piattaforma informatica, oppure orale. Entro sette giorni il segnalante riceve un avviso di ricevimento, entro tre mesi un riscontro."),
 (4,"chiaro",0,"Chi gestisce il canale deve dare seguito alla segnalazione: verificarne la fondatezza, chiedere integrazioni e, se serve, trasmetterla agli organi competenti."),
 (4,"chiaro",0,"Il secondo e' il canale esterno, gestito dall'ANAC. Si usa a certe condizioni: se il canale interno manca o non funziona, se la segnalazione interna e' rimasta senza seguito, o se si temono ritorsioni."),
 (4,"chiaro",0,"Il terzo e' la divulgazione pubblica, per esempio attraverso la stampa. E' ammessa solo in casi precisi, come un pericolo imminente per l'interesse pubblico o una segnalazione rimasta senza risposta."),
 (4,"chiaro",0,"Il quarto e' la denuncia all'autorita' giudiziaria o alla Corte dei conti. Resta sempre possibile, e per chi ha la qualifica di pubblico ufficiale puo' essere un obbligo."),
 (4,"chiaro",0.6,"Torniamo all'infermiera. Puo' segnalare all'RPCT con la piattaforma dell'azienda. Se entro tre mesi non riceve riscontro, puo' rivolgersi all'ANAC."),
 (4,"tenue",0.8,"Occhio al distrattore: il canale esterno dell'ANAC non e' libero in ogni caso. Si usa alle condizioni del decreto, di regola dopo il canale interno."),
 (4,"profondo",1.2,"Interno, esterno, pubblico, giudiziario."),

 (5,"chiaro",0.5,"La prima tutela e' la riservatezza. L'identita' del segnalante non puo' essere rivelata, senza il suo consenso espresso, a persone diverse da quelle competenti a gestire la segnalazione."),
 (5,"chiaro",0,"La segnalazione e' sottratta all'accesso documentale e all'accesso civico. Nel procedimento disciplinare, l'identita' puo' emergere solo con il consenso del segnalante."),
 (5,"chiaro",0,"La seconda tutela e' il divieto di ritorsioni: licenziamento, demansionamento, trasferimento, note negative, mancata promozione. Gli atti ritorsivi sono nulli."),
 (5,"chiaro",0,"E l'onere della prova e' invertito. Si presume che la misura sfavorevole sia una ritorsione; tocca all'amministrazione dimostrare che dipende da ragioni estranee alla segnalazione."),
 (5,"chiaro",0,"Le ritorsioni si comunicano all'ANAC, che puo' applicare sanzioni da diecimila a cinquantamila euro. Le stesse sanzioni valgono per chi viola la riservatezza o non attiva i canali."),
 (5,"chiaro",0,"Le tutele hanno un limite: cadono se viene accertata la responsabilita' del segnalante per calunnia o diffamazione, o una sua responsabilita' civile per dolo o colpa grave."),
 (5,"chiaro",0.6,"Torniamo all'infermiera: dopo la segnalazione viene spostata in un reparto lontano, senza ragioni organizzative. Si presume una ritorsione, e l'azienda deve provare il contrario."),
 (5,"tenue",0.8,"Attenzione: non e' il segnalante a dover provare la ritorsione. E' l'amministrazione a dover dimostrare che la misura non dipende dalla segnalazione."),
 (5,"profondo",1.2,"Identita' protetta, ritorsioni nulle, prova a carico dell'ente."),

 (6,"chiaro",0.5,"Le altre misure. La prima e' la rotazione ordinaria del personale nelle aree piu' esposte: evita che la permanenza a lungo nello stesso ruolo crei relazioni opache con fornitori e utenti."),
 (6,"chiaro",0,"La legge non fissa una durata. I criteri li stabilisce ogni amministrazione nel proprio piano. Dove la rotazione non e' possibile, per competenze infungibili, si usano misure alternative."),
 (6,"chiaro",0,"La principale e' la segregazione delle funzioni: chi istruisce una pratica, chi la decide e chi la controlla sono persone diverse. Si aggiungono la doppia firma e i controlli a campione."),
 (6,"chiaro",0,"La seconda misura e' la formazione, generale per tutti e specifica per chi lavora nelle aree a rischio. Dal 2023 il codice di comportamento prevede anche una formazione obbligatoria su etica e comportamento."),
 (6,"chiaro",0,"La terza sono i patti di integrita'. Le stazioni appaltanti possono prevedere nei bandi che il mancato rispetto dei protocolli di legalita' o dei patti di integrita' sia causa di esclusione dalla gara."),
 (6,"chiaro",0,"Anche l'informatizzazione e' una misura: gare telematiche, agende di prenotazione informatizzate, atti tracciati. Ogni passaggio lascia un segno che si puo' controllare."),
 (6,"chiaro",0.6,"Un esempio: un'azienda ospedaliera fa firmare a ogni concorrente un patto in cui si impegna a non offrire utilita' e a segnalare ogni tentativo di turbativa. Chi lo viola e' escluso."),
 (6,"tenue",0.8,"Occhio a un errore delle dispense: nessuna legge impone di ruotare i dirigenti ogni cinque anni. La durata la fissa il piano di ogni amministrazione."),
 (6,"profondo",1.2,"Ruotare, separare le funzioni, formare, far firmare patti."),

 (7,"chiaro",0.8,"Le tre cose da portare alla prova. La prima: il whistleblowing oggi e' regolato dal decreto 24 del 2023; protegge dipendenti, collaboratori, consulenti, tirocinanti, facilitatori e colleghi."),
 (7,"chiaro",0.8,"La seconda: il canale interno e' affidato all'RPCT, con avviso entro sette giorni e riscontro entro tre mesi; poi, a certe condizioni, canale esterno dell'ANAC e divulgazione pubblica."),
 (7,"chiaro",0.8,"La terza: identita' riservata, ritorsioni nulle, onere della prova a carico dell'ente; tra le misure, rotazione con criteri fissati dal piano, formazione e patti di integrita'."),
 (7,"tenue",0.8,"L'ultimo distrattore: l'articolo 54-bis del decreto 165 non e' piu' la norma di riferimento. Dal 2023 la tutela e' nel decreto legislativo 24."),

 (8,"profondo",0,"[warm] In sintesi: proteggere chi parla, e organizzarsi perche' la corruzione trovi meno spazio. Si chiude il modulo sull'anticorruzione. Nel prossimo: il trattamento dei dati personali."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Chi puo' segnalare, e che cosa", 4: 'I canali', 5: 'Riservatezza e ritorsioni', 6: "Rotazione, formazione, patti di integrita'", 7: 'Le tre cose da portare alla prova', 8: 'Chiusura'}
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
