# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md. Le 13 scene di
# partenza stanno a ~505 caratteri l'una, contro un tetto di 225 per blocco.
# I 13 argomenti restano nell'ordine in cui stanno; cambia il taglio.
#
# Il parlato di partenza misurava 6.556 caratteri. Le aggiunte sono segnate
# AGG e sono il "come": una conseguenza, un osservabile, un rimando interno al
# modulo. NESSUN fatto nuovo — ne' clinico, ne' normativo, ne' sui servizi.
# Questa lezione nomina leggi, livelli di assistenza e competenze: inventarci
# sopra sarebbe il modo peggiore di sbagliare.
#
# Le pose: 1,2 s a ogni cambio di capitolo (vincolo controllato in fondo).
# La durata non si predice, si vincola: il copione e' scritto un po' corto e
# `tagli.py applica` distribuisce la differenza come respiro. Vedi profilo.py.
#
# Registro del modulo: sobrio e descrittivo. La regola di lingua qui e' piu'
# stretta del solito e la lezione stessa la enuncia: "persona con dipendenza",
# mai "drogato" ne' "alcolizzato". Non c'e' una slide che la violi.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. In questa lezione affrontiamo le dipendenze patologiche, un'area in cui lo stigma e' ancora piu' forte che nel resto della salute mentale."),
 (1,"profondo",0,"E parto dal principio che orienta tutto: la dipendenza e' una condizione di salute, non un vizio morale ne' una debolezza di carattere."),
 (1,"chiaro",1.2,"Non e' un giudizio di valore: e' il presupposto su cui sono costruiti i servizi, le leggi e il lavoro di chi assiste."),

 (2,"chiaro",0,"Che cos'e' la dipendenza. E' un uso, o un comportamento, compulsivo, con perdita di controllo e prosecuzione nonostante le conseguenze negative sulla salute, sul lavoro, sulle relazioni."),
 (2,"chiaro",0,"Due termini che i quiz chiedono. La tolleranza: la necessita' di una quantita' sempre maggiore per ottenere lo stesso effetto."),
 (2,"chiaro",0,"E l'astinenza: la comparsa di sintomi fisici e psichici quando la sostanza viene sospesa. La presenza di tolleranza e astinenza indica una dipendenza fisica."),
 # AGG: perche' quei due termini contano, non solo che cosa sono.
 (2,"profondo",1.2,"Sono due termini da sapere distinti, perche' sono la parte della dipendenza che si vede dal di fuori: la tolleranza si deduce dalle quantita', l'astinenza si osserva addosso alla persona."),

 (3,"chiaro",0,"Le dipendenze si distinguono in due famiglie. Le dipendenze da sostanze: alcol, tabacco, farmaci, sostanze illegali."),
 (3,"chiaro",0,"E le dipendenze comportamentali, senza sostanza. La piu' rilevante e' il gioco d'azzardo patologico, inserito nei Livelli Essenziali di Assistenza e quindi preso in carico dal servizio sanitario. Poi internet e videogiochi."),
 (3,"profondo",1.2,"Il meccanismo e' lo stesso in entrambe le famiglie: compulsione, perdita di controllo, prosecuzione nonostante le conseguenze."),

 (4,"chiaro",0,"L'alcol e' la sostanza piu' diffusa e la piu' sottovalutata, e lo e' per una ragione precisa: e' legale e socialmente accettata, quindi non viene contata fra le sostanze."),
 (4,"chiaro",0,"L'astinenza da alcol ha segni che l'OSS puo' osservare, e sono segni di tutti i giorni: tremore, sudorazione, agitazione, insonnia, nausea."),
 (4,"tenue",0,"Nei casi gravi puo' evolvere nel delirium tremens, con confusione, allucinazioni e agitazione intensa: e' un'emergenza."),
 (4,"profondo",1.2,"L'astinenza da alcol puo' essere pericolosa per la vita, a differenza di quanto molti credono. Per questo una persona che beve abitualmente e viene ricoverata va osservata con attenzione nei primi giorni."),

 (5,"chiaro",0,"Il tabacco e' la dipendenza piu' diffusa in assoluto, ed e' la prima causa di morte evitabile. E' anche quella che si fatica di piu' a chiamare dipendenza, perche' la si vede tutti i giorni."),
 (5,"chiaro",0,"I farmaci sono l'area meno riconosciuta: le benzodiazepine, cioe' ansiolitici e sonniferi, e gli oppioidi, cioe' alcuni antidolorifici, possono dare dipendenza."),
 (5,"tenue",0,"Spesso non viene riconosciuta come tale perche' la sostanza e' prescritta da un medico. E' particolarmente frequente nell'anziano, che assume sonniferi per anni, e la sospensione brusca puo' dare astinenza."),
 (5,"profondo",1.2,"Questo non significa che l'OSS debba intervenire sulla terapia: significa che deve osservare e riferire. La dipendenza da farmaci prescritti resta una dipendenza."),

 (6,"chiaro",0,"Il gioco d'azzardo patologico e' la dipendenza senza sostanza piu' rilevante. I segni sono l'incapacita' di smettere, la rincorsa delle perdite, cioe' giocare ancora per recuperare, le menzogne ai familiari e i debiti."),
 (6,"chiaro",0,"Un dato meno noto: colpisce anche gli anziani, spesso in condizioni di solitudine, attraverso slot machine e lotterie."),
 (6,"chiaro",1.2,"La presa in carico e' dei servizi per le dipendenze, perche' e' inserito nei Livelli Essenziali di Assistenza. Non e' un problema privato di chi gioca: e' una prestazione dovuta."),

 (7,"chiaro",0,"I servizi, perche' la domanda in sede d'esame e' «a chi ci si rivolge». Il SerD, Servizio per le Dipendenze, e' il servizio territoriale di riferimento, dentro l'azienda ULSS."),
 (7,"chiaro",0,"Ha equipe multiprofessionali, e offre valutazione, trattamento farmacologico, sostegno psicologico e sociale: quattro cose insieme."),
 (7,"chiaro",0,"Le comunita' terapeutiche, residenziali o semiresidenziali, accolgono per percorsi piu' intensivi. E i gruppi di auto aiuto, come Alcolisti Anonimi, i Club alcologici e Giocatori Anonimi, sono una risorsa riconosciuta."),
 (7,"profondo",1.2,"Un punto che i quiz chiedono: l'accesso al SerD e' diretto, gratuito e con tutela della riservatezza. Diretto vuol dire senza passare da nessuno: ci si presenta."),

 (8,"chiaro",0,"Un concetto che vale la pena conoscere: la riduzione del danno. Sono interventi che riducono i rischi per la salute anche in chi non interrompe l'uso della sostanza."),
 (8,"chiaro",0,"Gli esempi: scambio di siringhe, unita' di strada, informazione sui rischi, somministrazione controllata. E' lo stesso principio della recovery: si parte da dove la persona e', non da dove dovrebbe essere."),
 (8,"profondo",1.2,"Non e' una rinuncia alla cura: e' un livello della cura, che tiene la persona in contatto con i servizi finche' non e' pronta per un percorso diverso."),

 (9,"chiaro",0,"Lo stigma nelle dipendenze e' ancora piu' forte che nel resto della salute mentale. Il pregiudizio piu' diffuso e': se volesse, smetterebbe."),
 (9,"tenue",0,"Ma la dipendenza altera proprio i circuiti cerebrali del controllo, e la volonta' da sola non basta. E' il motivo per cui esistono i servizi."),
 (9,"tenue",0,"Lo stigma produce vergogna, ritardo nella richiesta di aiuto e abbandono delle cure. Sono tre effetti che allontanano dai servizi proprio chi ne ha piu' bisogno."),
 (9,"profondo",1.2,"E anche qui il linguaggio conta: persona con dipendenza, non «drogato», non «alcolizzato». Non e' politicamente corretto: e' il modo di non chiudere la porta."),

 (10,"chiaro",0,"Il ruolo dell'OSS. Osservare i segni di intossicazione o di astinenza e riferirli: tremore, sudorazione, agitazione, confusione, sonnolenza eccessiva."),
 (10,"tenue",0,"Non giudicare, non moralizzare, non indagare: non spetta all'OSS chiedere quanto, da quanto tempo, perche'. Quelle domande le fa chi valuta, e farle prima chiude la porta a chi le fara' dopo."),
 (10,"chiaro",0,"Garantire la sicurezza, perche' l'intossicazione e l'astinenza aumentano il rischio di cadute e di confusione, e perche' alcol e farmaci interagiscono."),
 (10,"chiaro",1.2,"E sostenere la quotidianita': pasti, sonno, igiene, routine, che nella dipendenza sono spesso le prime cose a saltare."),

 (11,"tenue",0,"Che cosa non fa l'OSS. Non confisca sostanze o oggetti personali: non ha titolo per farlo. Non decide misure restrittive."),
 (11,"tenue",0,"Non sospende ne' modifica terapie, nemmeno quelle che ritiene causa del problema. Il sospetto che un farmaco stia facendo danno si riferisce, non si agisce."),
 (11,"tenue",0,"Non promette una riservatezza che non puo' garantire: quanto osserva va riferito all'equipe, con le modalita' viste nel modulo quattordici sul segreto."),
 (11,"profondo",1.2,"E se trova una sostanza in reparto, non la tocca e non la nasconde: segnala secondo la procedura aziendale. Il rischio biologico e il rischio di accusa sono entrambi reali."),

 (12,"chiaro",0,"Un'attenzione particolare va all'anziano, perche' la sua dipendenza e' spesso invisibile."),
 (12,"tenue",0,"L'alcol unito ai farmaci produce cadute, confusione e interazioni pericolose, e questi sintomi vengono scambiati per eta' o per demenza. Cosi' la dipendenza resta fuori dal quadro, e con lei la causa."),
 (12,"chiaro",0,"Anche qui vale la regola del modulo: il segnale e' il cambiamento. Da quando vive solo beve di piu'. Da quando e' andata in pensione gioca tutti i pomeriggi."),
 (12,"profondo",1.2,"Sono informazioni che spesso solo i familiari e l'OSS a domicilio possiedono. E che vanno riferite."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. La dipendenza e' una condizione di salute, non un vizio: se volesse smetterebbe e' il pregiudizio da abbandonare."),
 (13,"chiaro",0,"Tolleranza e astinenza indicano la dipendenza fisica. L'astinenza da alcol puo' essere pericolosa per la vita. Il gioco d'azzardo e' una dipendenza senza sostanza, inserita nei Livelli Essenziali di Assistenza."),
 (13,"chiaro",0,"Il SerD e' il servizio territoriale, con accesso diretto, gratuito e riservato. E la riduzione del danno e' un livello della cura, non una rinuncia."),
 (13,"profondo",0,"E l'OSS osserva, non giudica, non indaga, garantisce la sicurezza e riferisce. Cinque verbi, e nessuno dei cinque e' «convincere». [warm] Nella prossima lezione affrontiamo la crisi e l'aggressivita', e chiudiamo il modulo."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Non un vizio, una condizione di salute",2:"Che cos'e' la dipendenza",
 3:"Sostanze e comportamenti",4:"L'alcol",5:"Tabacco e farmaci",
 6:"Il gioco d'azzardo patologico",7:"I servizi",8:"La riduzione del danno",
 9:"Lo stigma",10:"Il ruolo dell'OSS",11:"Che cosa non fa l'OSS",
 12:"L'anziano",13:"La sintesi"}

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
for a,b in zip(blocchi, blocchi[1:]):
    if a["capitolo"]!=b["capitolo"] and not a["posa"]:
        errori.append(f'{a["id"]}: chiude il capitolo {a["capitolo"]} senza posa')

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])} per {pose:.1f} s")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:50]}...')

acc=0; stacco=None
for b in blocchi:
    acc+=len(b["text"])
    if stacco is None and acc>tot/2: stacco=b["id"]
A=sum(len(b["text"]) for b in blocchi[:[x["id"] for x in blocchi].index(stacco)+1])
print(f"\nstacco tracce dopo {stacco}:  chunkA {A} car  ·  chunkB {tot-A} car   (limite 5000)")

if errori:
    print("\nERRORI:"); [print("  -",e) for e in errori]; sys.exit(1)
json.dump(blocchi, open(_pl.Path(__file__).parent/"blocchi.json","w",encoding="utf-8"),
          indent=1, ensure_ascii=False)
print("\nOK, nessun errore")
