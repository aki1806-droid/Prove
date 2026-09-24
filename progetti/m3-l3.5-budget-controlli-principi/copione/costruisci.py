# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 3.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M3): metodica di budget (L.R. 55/1994 artt. 13-19: direttive, budget
# generale economico/finanziario/patrimoniale, budget delle strutture, budget di centro
# di responsabilita'); contabilita' analitica (art. 25) e centri di responsabilita';
# controllo di gestione (L.R. 56 art. 20), scostamenti e reporting, revisione del budget;
# controllo regionale (visto di congruita', ispezione e vigilanza, commissario);
# i tre principi guida: integrazione, sussidiarieta', prossimita' (PSSR 2019-2023).
# Fonti: dispensa CISL FP (Galiazzo), schede CISL FP, PSSR 2019-2023. Testo della 55 non raggiungibile.
BLOCCHI = [
 (1,"chiaro",0,"[serious] Gennaio, un reparto di medicina. Il primario riceve un documento: quanti ricoveri, quanto personale, quanti farmaci, quanta spesa per l'anno. Non e' una circolare qualunque: e' il budget del suo reparto."),
 (1,"chiaro",0,"Da dove arriva quel documento? E chi controlla, a fine anno, se il reparto ha fatto quello che doveva? Lo dice la legge 55, con la metodica di budget e il controllo di gestione."),
 (1,"profondo",1.2,"Il budget non e' un taglio. E' un patto: obiettivi e risorse, scritti prima."),

 (2,"chiaro",0,"Quattro passaggi. La metodica di budget. La contabilita' analitica e il controllo di gestione. Il controllo della Regione. E i tre principi guida del modello veneto, per chiudere il modulo."),

 (3,"chiaro",0,"La metodica di budget e' disciplinata dagli articoli dal tredici al diciannove della legge 55. E' uno strumento di pianificazione e di controllo economico-finanziario."),
 (3,"chiaro",0,"Serve a programmare gli obiettivi, a determinare le attivita' da realizzare, i fattori produttivi da usare, le risorse finanziarie necessarie e gli investimenti."),
 (3,"chiaro",0,"E serve a verificare i risultati ottenuti rispetto agli obiettivi fissati. Prima si programma, poi si misura. E' lo stesso strumento con cui si costruisce il bilancio economico preventivo."),
 (3,"chiaro",0,"Si sviluppa su quattro livelli. Si parte dal documento di direttive: indica obiettivi, criteri, vincoli e parametri per formulare il budget."),
 (3,"chiaro",0,"La dispensa lo definisce lo strumento di raccordo fra la programmazione strategica, quella della direzione, e la programmazione operativa, quella dei reparti."),
 (3,"chiaro",0,"Poi il budget generale, che riguarda l'intera azienda. Si articola in tre: budget economico, budget finanziario e budget patrimoniale."),
 (3,"chiaro",0,"Poi i budget delle strutture, formulati per le strutture fondamentali dell'azienda. E infine i budget di centro di responsabilita', che riguardano le unita' operative."),
 (3,"chiaro",0,"Dall'alto verso il basso: direttive, budget generale, budget delle strutture, budget di centro di responsabilita'. Ogni livello scende di un gradino, fino al singolo reparto."),
 (3,"chiaro",0,"Torna al primario di medicina. Il suo budget e' l'ultimo gradino: obiettivi di attivita' e risorse assegnate, concordati con la direzione. Li' la programmazione diventa lavoro quotidiano."),
 (3,"tenue",0,"Attenzione a un errore comune: il budget generale non e' solo economico. Ha tre facce: economica, finanziaria e patrimoniale."),
 (3,"profondo",1.2,"Dalle direttive al reparto: quattro gradini, un solo filo."),

 (4,"chiaro",0,"Per sapere se il budget e' rispettato servono i numeri giusti. La contabilita' generale da' il quadro dell'azienda intera. Ma non dice quanto costa un singolo reparto."),
 (4,"chiaro",0,"Per questo c'e' la contabilita' analitica, all'articolo venticinque. Classifica, localizza e imputa i costi, secondo le caratteristiche dei processi produttivi."),
 (4,"chiaro",0,"Detto semplice: dice dove si spende e per che cosa. Rileva tre oggetti: i centri di responsabilita', le aree produttive, semplici o complesse, e i beni, servizi e prestazioni per gli utenti."),
 (4,"chiaro",0,"Il centro di responsabilita' e' un'unita' operativa a cui si assegnano risorse, per svolgere determinate attivita' e ottenere determinati risultati."),
 (4,"chiaro",0,"Per essere un centro di responsabilita' servono tre caratteristiche: attivita' omogenee, risorse impiegate significative, e un responsabile. Senza un responsabile, non c'e' centro."),
 (4,"chiaro",0,"Poi il controllo di gestione. Lo abbiamo incontrato nella lezione sugli organi: l'articolo venti della legge 56 lo mette alle dirette dipendenze del direttore generale."),
 (4,"chiaro",0,"Il suo scopo: assicurare efficacia ed efficienza ai processi di acquisizione e di impiego delle risorse. Usa la contabilita' generale e quella analitica."),
 (4,"chiaro",0,"E analizza gli scostamenti fra il budget e i dati a consuntivo. Quanto si era previsto, quanto si e' davvero speso, e perche' c'e' una differenza."),
 (4,"chiaro",0,"I risultati viaggiano con il reporting, il rapporto di gestione. E' lo strumento di comunicazione della programmazione e del controllo."),
 (4,"chiaro",0,"I report si preparano in base a chi li legge: il direttore generale, i responsabili che usano le risorse, gli altri dirigenti. Servono a confrontare obiettivi e risultati reali."),
 (4,"chiaro",0,"E se i conti vanno fuori strada? In caso di squilibrio economico e finanziario, il direttore generale puo' rivedere il budget durante l'anno."),
 (4,"chiaro",0,"Un esempio: a giugno il report mostra che la spesa per i farmaci di un reparto corre molto sopra il previsto. Si cerca il perche'. E se serve, si corregge il budget."),
 (4,"profondo",1.2,"Misurare, confrontare, correggere. Il budget vive tutto l'anno."),

 (5,"chiaro",0,"Resta un livello di controllo, sopra le aziende: quello della Regione. La legge 55 le affida tre strumenti."),
 (5,"chiaro",0,"Il primo e' il visto di congruita'. La Regione lo appone al piano generale, al bilancio pluriennale di previsione, al bilancio economico preventivo e alla proposta di copertura della perdita."),
 (5,"chiaro",0,"Il secondo e' l'attivita' ispettiva e di vigilanza: la Regione puo' verificare direttamente come lavorano le aziende."),
 (5,"chiaro",0,"Il terzo e' il piu' forte. Se il direttore generale non adotta gli atti dovuti, come il piano generale o i bilanci, la Regione nomina un commissario che li adotta al suo posto."),
 (5,"tenue",0,"Occhio all'elenco del visto di congruita': piano generale, bilancio pluriennale, bilancio economico preventivo e proposta di copertura della perdita. Quattro atti, da ricordare insieme."),
 (5,"profondo",1.2,"L'azienda gestisce. La Regione vigila, e se serve interviene."),

 (6,"chiaro",0,"Chiudiamo il modulo con i tre principi guida del modello veneto. Li abbiamo annunciati nella prima lezione: integrazione, sussidiarieta', prossimita'."),
 (6,"chiaro",0,"Il primo e' l'integrazione socio-sanitaria. Sanita' e sociale nello stesso sistema, perche' i bisogni delle persone non si dividono per competenze."),
 (6,"chiaro",0,"L'integrazione lavora su tre piani. Istituzionale, con la delega dei Comuni alle ULSS. Gestionale, nel distretto. Professionale, con sanitario e sociale nello stesso percorso."),
 (6,"chiaro",0,"Il secondo e' la sussidiarieta'. In verticale: le decisioni stanno al livello piu' vicino ai cittadini, e salgono solo quando serve. Per questo i Comuni siedono nella Conferenza dei sindaci."),
 (6,"chiaro",0,"In orizzontale: il pubblico valorizza le famiglie, il volontariato, la cooperazione, il terzo settore. Il piano socio-sanitario li indica come una forza che ha fatto tenere il modello veneto."),
 (6,"chiaro",0,"Il terzo e' la prossimita'. Il piano socio-sanitario lo dice cosi': cure di media e bassa complessita' vicino al cittadino, alta complessita' centralizzata negli hub."),
 (6,"chiaro",0,"La prossimita' e' il distretto, l'assistenza domiciliare, la casa come primo luogo di cura. L'ospedale resta il luogo della fase acuta."),
 (6,"chiaro",0,"I tre principi si tengono insieme. L'integrazione dice che cosa unire, la sussidiarieta' chi decide, la prossimita' dove portare i servizi."),
 (6,"profondo",1.2,"Integrare, decidere vicino, curare vicino."),

 (7,"chiaro",0,"Le tre cose che ti chiederanno. La prima: la metodica di budget ha quattro livelli. Documento di direttive, budget generale, budget delle strutture e budget di centro di responsabilita'."),
 (7,"chiaro",0,"La seconda: un centro di responsabilita' richiede attivita' omogenee, risorse significative e un responsabile. Il controllo di gestione analizza gli scostamenti fra budget e consuntivo."),
 (7,"chiaro",0,"La terza: la Regione controlla con il visto di congruita', con l'ispezione e la vigilanza, e con il commissario se il direttore generale non adotta gli atti."),
 (7,"tenue",0,"L'ultimo distrattore: il budget non lo rivede la Regione. In caso di squilibrio economico e finanziario, lo rivede il direttore generale."),

 (8,"profondo",0,"[warm] In sintesi: si programma, si misura, si corregge, dentro un sistema che integra e sta vicino alle persone. Nel prossimo modulo: l'organizzazione aziendale, e l'Azienda Ospedale Universita' di Padova."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'La metodica di budget', 4: "Contabilita' analitica e controllo di gestione", 5: 'Il controllo della Regione', 6: 'I tre principi guida', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
