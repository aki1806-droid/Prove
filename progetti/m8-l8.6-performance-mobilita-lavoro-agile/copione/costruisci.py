# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 8.6 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M8): performance, mobilita', lavoro agile. D.Lgs. 150/2009 artt. 4 (ciclo), 7 (sistema, parere
# vincolante OIV), 8-9 (performance organizzativa e individuale), 10 (Piano entro 31/1, Relazione entro 30/6),
# 14 (OIV valida la Relazione); PIAO: art. 6 D.L. 80/2021 (da verificare: soglia 50 dipendenti, sezioni).
# D.Lgs. 165 art. 30 (c. 1 passaggio diretto, assenso non necessario salvo eccezioni, non per il SSN;
# c. 2 stesso comune o 50 km), 33-34 (eccedenze, disponibilita' 24 mesi all'80%), 34-bis; comando e distacco.
# Vincoli: art. 6 e piano dei fabbisogni; art. 23 c. 2 D.Lgs. 75/2017 (accessorio entro il 2016, da verificare).
# Digitale: D.Lgs. 82/2005; direttiva 2023 sulla formazione (24 ore, da verificare). Lavoro agile: L. 81/2017
# artt. 18-23; art. 14 L. 124/2015; CCNL Sanita' 2019-21 (lavoro agile e da remoto, da verificare). Fonti:
# D.Lgs. 165 al 24/1/2020; D.Lgs. 150/2009 vigente dal 22/6/2017; dispensa su Drive (con correzioni).
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un'impiegata dell'ufficio acquisti chiede tre cose nello stesso mese: sapere come e' stata valutata, trasferirsi nell'azienda sanitaria vicino a casa, lavorare da casa due giorni a settimana."),
 (1,"chiaro",0,"Tre richieste, tre capitoli del pubblico impiego di oggi. E tutte e tre passano da regole precise, che l'azienda deve rispettare e che conviene conoscere."),
 (1,"profondo",1.2,"Misurare il lavoro, muovere le persone, cambiare il modo di lavorare."),

 (2,"chiaro",0.6,"Quattro passaggi. Il ciclo della performance. La mobilita' tra amministrazioni. I vincoli di spesa e la digitalizzazione. E infine il lavoro agile."),

 (3,"chiaro",0.5,"Il decreto legislativo 150 del 2009 organizza la performance come un ciclo. Si parte dagli obiettivi, collegati alle risorse disponibili."),
 (3,"chiaro",0,"Poi si monitora durante l'anno, si misura e si valuta, si usano i sistemi premianti e infine si rendiconta, ai cittadini e agli organi di controllo."),
 (3,"chiaro",0,"Gli obiettivi stanno nel piano della performance, da adottare entro il trentuno gennaio. Oggi, per la maggior parte delle amministrazioni, e' una sezione del PIAO."),
 (3,"chiaro",0,"Il PIAO, il piano integrato di attivita' e organizzazione, riunisce in un solo documento performance, fabbisogni di personale, lavoro agile, formazione e prevenzione della corruzione."),
 (3,"chiaro",0,"Alla fine dell'anno arriva la relazione sulla performance, entro il trenta giugno. La valida l'organismo indipendente di valutazione, l'OIV."),
 (3,"chiaro",0,"L'OIV da' anche un parere vincolante sul sistema di misurazione e valutazione, e verifica che il ciclo funzioni. E' un organismo esterno, di esperti."),
 (3,"chiaro",0,"La valutazione riguarda la performance organizzativa, cioe' dell'ente e delle strutture, e quella individuale, di dirigenti e dipendenti: risultati, competenze, comportamenti."),
 (3,"chiaro",0,"Un tempo la legge fissava fasce rigide di merito, con un quarto dei dipendenti senza premio. Dal 2017 i criteri di differenziazione li stabiliscono i contratti collettivi."),
 (3,"tenue",0.8,"Occhio a un distrattore: l'OIV non valida il piano della performance. Valida la relazione, cioe' i risultati. Il piano lo adotta l'organo di indirizzo."),
 (3,"profondo",1.2,"Obiettivi a gennaio, risultati a giugno, un giudice esterno."),

 (4,"chiaro",0.5,"La mobilita' volontaria e' nell'articolo 30 del 165: il passaggio diretto di un dipendente da un'amministrazione a un'altra, con la cessione del contratto."),
 (4,"chiaro",0,"L'amministrazione che vuole coprire un posto per mobilita' pubblica un avviso, con i requisiti e le competenze richieste, e seleziona tra le domande."),
 (4,"chiaro",0,"Dal 2021 per la maggior parte degli enti non serve piu' il via libera dell'amministrazione di partenza, salvo casi particolari. Ma per il Servizio sanitario nazionale l'assenso serve ancora."),
 (4,"chiaro",0.6,"Torniamo all'impiegata. Per passare a un'altra azienda sanitaria deve rispondere a un avviso di mobilita', e l'azienda di provenienza deve dare il suo assenso."),
 (4,"chiaro",0,"Poi ci sono i trasferimenti decisi dall'amministrazione: nello stesso comune o in sedi entro cinquanta chilometri, anche senza il consenso del dipendente."),
 (4,"chiaro",0,"E ci sono le assegnazioni temporanee, come il comando e il distacco: il dipendente lavora per un periodo presso un altro ente, senza cambiare amministrazione di appartenenza."),
 (4,"chiaro",0,"Infine le eccedenze: se un ente ha personale in esubero, prova a ricollocarlo. Chi resta senza posto va in disponibilita', per un massimo di ventiquattro mesi, con l'ottanta per cento dello stipendio."),
 (4,"chiaro",0,"E prima di assumere dall'esterno, l'ente deve comunicare i posti che vuole coprire, per verificare se c'e' personale in disponibilita' da ricollocare."),
 (4,"tenue",0.8,"Attenzione: in sanita' la mobilita' volontaria richiede ancora il nulla osta dell'azienda di appartenenza. La liberalizzazione del 2021 non vale per il Servizio sanitario."),
 (4,"profondo",1.2,"Ci si muove per avviso, con regole diverse per la sanita'."),

 (5,"chiaro",0.5,"Ogni scelta sul personale deve stare dentro i vincoli di spesa. Il piano dei fabbisogni si costruisce entro le risorse disponibili e le capacita' assunzionali fissate dalla legge."),
 (5,"chiaro",0,"Il piano dei fabbisogni e' triennale e si aggiorna ogni anno. Ha preso il posto della vecchia dotazione organica: non conta piu' un elenco fisso di posti, ma la spesa sostenibile."),
 (5,"chiaro",0,"Nel Servizio sanitario anche la spesa complessiva per il personale ha un limite fissato dalla legge, che le regioni devono rispettare."),
 (5,"chiaro",0,"E il fondo per il salario accessorio, di regola, non puo' superare quello del 2016, salvo le deroghe previste dalla legge e dai contratti."),
 (5,"chiaro",0,"Poi la digitalizzazione. Il codice dell'amministrazione digitale chiede documenti informatici, identita' digitale, servizi online. E chiede dipendenti capaci di usarli."),
 (5,"chiaro",0,"Per questo la formazione e' diventata un dovere e un diritto: una direttiva del 2023 chiede almeno ventiquattro ore di formazione l'anno per ogni dipendente."),
 (5,"chiaro",0.6,"Un esempio: il fascicolo del personale diventa digitale, le richieste di ferie passano da un portale, la firma e' elettronica. Chi non si forma, resta indietro."),
 (5,"tenue",0.8,"Un distrattore frequente: il piano dei fabbisogni non e' una lista dei desideri. Si costruisce dentro i vincoli di spesa e le capacita' assunzionali."),
 (5,"profondo",1.2,"Risorse contate, competenze digitali, formazione continua."),

 (6,"chiaro",0.5,"Il lavoro agile e' regolato dalla legge 81 del 2017. E' un modo di svolgere il lavoro subordinato, deciso con un accordo tra il dipendente e l'amministrazione."),
 (6,"chiaro",0,"Si lavora per fasi, cicli e obiettivi, senza precisi vincoli di orario o di luogo, con strumenti tecnologici, in parte in sede e in parte fuori, entro i limiti dell'orario massimo."),
 (6,"chiaro",0,"L'accordo e' scritto e individuale. Stabilisce i giorni fuori sede, gli strumenti, i tempi di riposo e le fasce in cui il dipendente puo' essere contattato."),
 (6,"chiaro",0,"Il dipendente ha diritto alla disconnessione: fuori dalle fasce concordate non deve rispondere. E ha lo stesso trattamento economico di chi lavora in sede."),
 (6,"chiaro",0,"Il datore di lavoro resta responsabile della sicurezza: consegna un'informativa scritta sui rischi. E la legge da' priorita' ad alcune situazioni, come i genitori di figli piccoli o i lavoratori fragili."),
 (6,"chiaro",0,"Nel pubblico impiego il lavoro agile e' disciplinato anche dai contratti collettivi. Il contratto della sanita' distingue il lavoro agile dal lavoro da remoto, che ha orario e luogo definiti."),
 (6,"chiaro",0.6,"Torniamo all'impiegata. Il suo lavoro di ufficio si puo' svolgere per obiettivi: con un accordo individuale puo' lavorare da casa due giorni, con fasce di contattabilita'."),
 (6,"chiaro",0,"Non tutte le attivita' pero' si prestano. Chi assiste i pazienti in reparto svolge un lavoro che non si puo' fare a distanza. L'amministrazione individua le attivita' compatibili."),
 (6,"tenue",0.8,"Attenzione: il lavoro agile non e' un diritto automatico di tutti. Nasce da un accordo individuale, per attivita' compatibili, secondo le regole del contratto."),
 (6,"profondo",1.2,"Lavorare per obiettivi, con il diritto di staccare."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: il ciclo della performance va dagli obiettivi alla rendicontazione; il piano entro il trentuno gennaio, oggi nel PIAO; la relazione entro il trenta giugno, validata dall'OIV."),
 (7,"chiaro",0.8,"La seconda: la mobilita' volontaria e' il passaggio diretto dell'articolo 30; nel Servizio sanitario serve ancora l'assenso; i trasferimenti d'ufficio restano entro cinquanta chilometri."),
 (7,"chiaro",0.8,"La terza: il lavoro agile nasce da un accordo individuale, lavora per obiettivi, garantisce la disconnessione e lo stesso trattamento economico."),
 (7,"tenue",0.8,"L'ultimo distrattore: il lavoro agile non e' lo stesso del lavoro da remoto. Nel lavoro agile non ci sono precisi vincoli di orario e di luogo."),

 (8,"profondo",0,"[warm] In sintesi: si misura il lavoro, ci si muove con regole, si lavora anche in modo agile. Si chiude il modulo sul pubblico impiego. Nel prossimo: salute e sicurezza sul lavoro."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'Il ciclo della performance', 4: "La mobilita'", 5: 'Vincoli di spesa e digitale', 6: 'Il lavoro agile', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
