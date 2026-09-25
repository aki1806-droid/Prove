# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 5.4 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M5): avvio, partecipazione, motivazione. Art. 7 (a chi si comunica l'avvio; esigenze di
# celerita'; provvedimenti cautelari); art. 8 (contenuto: amministrazione, oggetto, ufficio e persona
# responsabile, data di conclusione e rimedi, data dell'istanza, ufficio per vedere gli atti; forme di
# pubblicita'; omissione fatta valere solo dall'interessato); art. 18-bis (ricevuta); art. 9, 10; art. 13
# (esclusioni); art. 10-bis (preavviso di rigetto, 10 giorni, sospende i termini dal D.L. 76/2020);
# art. 3 (motivazione). Fonti: L. 241/1990 (testo 2019 e modifiche D.L. 76/2020); dispensa CISL FP.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Una mattina arriva una lettera dall'azienda: si e' aperto un procedimento che ti riguarda. C'e' scritto chi lo segue, entro quando finira', dove puoi vedere le carte. Non e' una cortesia: e' un obbligo di legge."),
 (1,"chiaro",0,"Da quella lettera parte la partecipazione: puoi dire la tua, portare documenti, e alla fine ricevere una decisione che spiega le sue ragioni."),
 (1,"profondo",1.2,"Sapere, partecipare, capire: tre diritti in fila."),

 (2,"chiaro",0.6,"Quattro passaggi. La comunicazione di avvio del procedimento. I diritti di chi partecipa. Il preavviso di rigetto. E l'obbligo di motivare il provvedimento. Con qualche esempio preso dalla vita di un'azienda sanitaria."),

 (3,"chiaro",0.5,"L'articolo 7 dice che l'avvio del procedimento va comunicato. Salvo particolari esigenze di celerita', la comunicazione va a tre categorie di soggetti."),
 (3,"chiaro",0,"Primo: i destinatari degli effetti diretti del provvedimento. Secondo: chi per legge deve intervenire nel procedimento."),
 (3,"chiaro",0,"Terzo: i soggetti individuati o facilmente individuabili, diversi dai destinatari, a cui il provvedimento puo' recare pregiudizio."),
 (3,"chiaro",0,"Resta ferma la possibilita' di adottare provvedimenti cautelari anche prima della comunicazione, quando la situazione lo richiede."),
 (3,"chiaro",0.6,"In pratica, se un ufficio avvia d'ufficio un procedimento che riguarda un dipendente, deve informarlo subito, e non a cose fatte."),
 (3,"chiaro",0.5,"L'articolo 8 dice come. La comunicazione e' personale, e deve indicare l'amministrazione competente, l'oggetto del procedimento, l'ufficio e la persona responsabile."),
 (3,"chiaro",0,"Deve indicare anche la data entro cui il procedimento deve concludersi e i rimedi in caso di inerzia, e l'ufficio dove si possono vedere gli atti."),
 (3,"chiaro",0,"Nei procedimenti a istanza di parte va indicata anche la data di presentazione dell'istanza. E se i destinatari sono troppi, l'amministrazione usa forme di pubblicita' adatte."),
 (3,"chiaro",0,"Nei procedimenti a istanza di parte, la ricevuta della domanda che contiene questi elementi vale gia' come comunicazione di avvio."),
 (3,"tenue",0.8,"Occhio a un distrattore: l'omissione della comunicazione non la puo' far valere chiunque. Puo' farla valere solo il soggetto nel cui interesse la comunicazione e' prevista."),
 (3,"profondo",1.2,"Chi, che cosa, entro quando, dove vedere le carte."),

 (4,"chiaro",0.5,"L'articolo 9 allarga la partecipazione. Puo' intervenire qualunque soggetto portatore di interessi pubblici o privati, e i portatori di interessi diffusi costituiti in associazioni o comitati."),
 (4,"chiaro",0,"La condizione e' che dal provvedimento possa derivare loro un pregiudizio. Non serve essere il destinatario diretto. Un'associazione di pazienti, per esempio, puo' intervenire in un procedimento che tocca i loro interessi."),
 (4,"chiaro",0.5,"L'articolo 10 dice che cosa possono fare. Prima di tutto, prendere visione degli atti del procedimento, salvo i limiti previsti per l'accesso."),
 (4,"chiaro",0,"Poi, presentare memorie scritte e documenti. E l'amministrazione ha l'obbligo di valutarli, ove siano pertinenti all'oggetto del procedimento."),
 (4,"chiaro",0.6,"Un esempio: un dipendente riceve la comunicazione di avvio di un procedimento sul riconoscimento di un periodo di servizio, e deposita una memoria con i documenti che lo provano."),
 (4,"chiaro",0,"La partecipazione non vale per tutti gli atti. L'articolo 13 esclude gli atti normativi, gli atti amministrativi generali, di pianificazione e di programmazione."),
 (4,"chiaro",0,"Sono esclusi anche i procedimenti tributari e alcuni procedimenti speciali previsti da leggi di settore. Qui la tutela passa per le regole proprie di quelle materie."),
 (4,"tenue",0.8,"Attenzione: le norme sulla partecipazione non si applicano a un atto di programmazione. Per quegli atti valgono le regole specifiche che li disciplinano."),
 (4,"profondo",1.2,"Vedere gli atti, portare memorie, essere ascoltati."),

 (5,"chiaro",0.5,"L'articolo 10-bis riguarda i procedimenti a istanza di parte. Prima di un provvedimento negativo, l'ufficio comunica all'istante i motivi che ostano all'accoglimento della domanda."),
 (5,"chiaro",0,"E' il preavviso di rigetto. Entro dieci giorni dal ricevimento, l'istante puo' presentare per iscritto le sue osservazioni, eventualmente con documenti."),
 (5,"chiaro",0,"Dopo le modifiche del 2020 la comunicazione sospende i termini del procedimento, che ricominciano a decorrere dieci giorni dopo le osservazioni o, se mancano, dalla scadenza del termine."),
 (5,"chiaro",0,"Se poi decide comunque di respingere, l'amministrazione deve spiegare perche' non accoglie le osservazioni, e puo' aggiungere solo i motivi ostativi che nascono da quelle osservazioni."),
 (5,"chiaro",0,"Non si possono addurre tra i motivi ostativi inadempienze o ritardi attribuibili all'amministrazione. Il cittadino non paga le lentezze dell'ufficio."),
 (5,"chiaro",0,"Il preavviso non si applica alle procedure concorsuali e ai procedimenti previdenziali e assistenziali a istanza di parte gestiti dagli enti previdenziali."),
 (5,"chiaro",0,"E un provvedimento negativo adottato senza preavviso di rigetto e' annullabile: dopo il 2020 non puo' essere salvato come vizio solo formale."),
 (5,"tenue",0.8,"Un distrattore frequente: nel testo di oggi il preavviso non interrompe i termini, che poi ripartirebbero da zero. Li sospende. Molti quiz usano ancora la formula vecchia."),
 (5,"profondo",1.2,"Prima del no, il diritto di rispondere entro dieci giorni."),

 (6,"chiaro",0.5,"L'articolo 3 fissa l'obbligo di motivazione. Ogni provvedimento amministrativo deve essere motivato, compresi quelli sull'organizzazione, sui pubblici concorsi e sul personale."),
 (6,"chiaro",0,"La motivazione indica i presupposti di fatto e le ragioni giuridiche che hanno determinato la decisione, in relazione alle risultanze dell'istruttoria."),
 (6,"chiaro",0,"Non e' richiesta per gli atti normativi e per quelli a contenuto generale, che si rivolgono a una generalita' di destinatari e non a una persona precisa."),
 (6,"chiaro",0,"La motivazione serve a due cose: permette all'interessato di capire e di difendersi, e permette al giudice di controllare se la decisione e' logica e legittima."),
 (6,"chiaro",0,"Si puo' motivare anche rinviando a un altro atto, per esempio un parere: e' la motivazione per relazione. Ma quell'atto va indicato e reso disponibile insieme alla decisione."),
 (6,"chiaro",0,"In ogni atto notificato al destinatario vanno indicati il termine e l'autorita' a cui e' possibile ricorrere."),
 (6,"chiaro",0.6,"Un esempio in azienda: un diniego di un'aspettativa deve dire quali fatti sono stati accertati, quale norma si applica, perche' la richiesta non si puo' accogliere e a chi ricorrere."),
 (6,"chiaro",0,"Quando una domanda e' manifestamente irricevibile, inammissibile, improcedibile o infondata, si puo' concludere in forma semplificata, con una motivazione sintetica sul punto risolutivo."),
 (6,"tenue",0.8,"Attenzione: i provvedimenti sul personale non sono esclusi dall'obbligo di motivazione. La legge li nomina espressamente tra quelli da motivare."),
 (6,"profondo",1.2,"Fatti, norme e il filo logico che li lega."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: l'avvio si comunica ai destinatari, a chi deve intervenire per legge e ai terzi individuabili che possono subire pregiudizio."),
 (7,"chiaro",0.8,"La seconda: i partecipanti possono vedere gli atti e presentare memorie e documenti, che l'amministrazione deve valutare se pertinenti. Prima di un no c'e' il preavviso, con dieci giorni per le osservazioni."),
 (7,"chiaro",0.8,"La terza: la motivazione indica presupposti di fatto e ragioni giuridiche; non e' richiesta per atti normativi e generali; va indicato a chi e entro quando ricorrere."),
 (7,"tenue",0.8,"L'ultimo distrattore: la partecipazione non si applica agli atti normativi, amministrativi generali, di pianificazione e di programmazione. La motivazione non serve per quelli normativi e generali."),

 (8,"profondo",0,"[warm] In sintesi: si comunica, si ascolta, si spiega. Nella prossima lezione: termini, silenzio e strumenti di semplificazione."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'La comunicazione di avvio', 4: 'Partecipare al procedimento', 5: 'Il preavviso di rigetto', 6: 'La motivazione', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
