# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 7.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M7): i principi del trattamento. GDPR art. 5 par. 1 lett. a-f (liceita', correttezza e trasparenza;
# limitazione della finalita', con l'eccezione dell'art. 89; minimizzazione; esattezza; limitazione della
# conservazione; integrita' e riservatezza) e par. 2 (responsabilizzazione); artt. 12-13 (informazioni
# all'interessato), 25, 32 (sicurezza). Fonti: GDPR, testo del Garante (ed. 2017); dispense su Drive.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] In un ambulatorio c'e' un quaderno. Dentro, da quindici anni, i nomi e i numeri di telefono dei pazienti dimessi, tenuti per ogni evenienza. Sta sullo scaffale, alla portata di chiunque passi."),
 (1,"chiaro",0,"Nessuno lo ha mai usato male. Eppure quel quaderno viola almeno tre principi del regolamento europeo. Oggi vediamo quali, e perche'."),
 (1,"profondo",1.2,"Sei principi, e un titolare che deve saperli dimostrare."),

 (2,"chiaro",0.6,"Quattro passaggi, tutti nell'articolo 5 del regolamento. Liceita', correttezza e trasparenza. Finalita' e minimizzazione. Esattezza e conservazione. Integrita' e riservatezza."),

 (3,"chiaro",0.5,"Il primo principio ha tre parole. I dati devono essere trattati in modo lecito, corretto e trasparente nei confronti dell'interessato."),
 (3,"chiaro",0,"Lecito significa che il trattamento deve poggiare su una base giuridica prevista dal regolamento: un obbligo di legge, un compito di interesse pubblico, la cura, il consenso. Le vedremo nella prossima lezione."),
 (3,"chiaro",0,"Corretto significa leale: niente raccolte nascoste, niente usi che la persona non potrebbe ragionevolmente aspettarsi, niente pressioni per ottenere piu' dati del dovuto."),
 (3,"chiaro",0,"Trasparente significa che la persona deve sapere chi tratta i suoi dati, per quali finalita', per quanto tempo, e quali diritti ha. E' il compito dell'informativa."),
 (3,"chiaro",0,"Il regolamento chiede che queste informazioni siano concise, facilmente accessibili e scritte con un linguaggio semplice e chiaro. Un modulo incomprensibile non basta."),
 (3,"chiaro",0.6,"Un esempio: all'accettazione il paziente riceve un'informativa che spiega a chi andranno i suoi dati, per esempio al medico di famiglia o al fascicolo sanitario, e come esercitare i propri diritti."),
 (3,"chiaro",0,"La trasparenza vale anche verso i dipendenti. L'azienda informa il proprio personale su come tratta i suoi dati: presenze, retribuzione, sorveglianza sanitaria, valutazioni."),
 (3,"tenue",0.8,"Occhio a un distrattore: trasparenza non significa pubblicare i dati. Significa informare la persona su come vengono trattati i suoi."),
 (3,"profondo",1.2,"Lecito, leale, chiaro per chi e' coinvolto."),

 (4,"chiaro",0.5,"Il secondo principio e' la limitazione della finalita'. I dati sono raccolti per finalita' determinate, esplicite e legittime. Una finalita' vaga, come per ogni evenienza, non basta."),
 (4,"chiaro",0,"La finalita' va decisa prima di raccogliere i dati, non dopo. E deve essere esplicita: dichiarata, comunicata, riconoscibile da chi fornisce le proprie informazioni."),
 (4,"chiaro",0,"E poi non possono essere trattati in modo incompatibile con quelle finalita'. I dati raccolti per curare una persona non diventano, per questo, dati da usare per qualsiasi altro scopo."),
 (4,"chiaro",0,"Il regolamento prevede un'eccezione: archiviazione nel pubblico interesse, ricerca scientifica o storica e statistica non sono considerate incompatibili, con garanzie adeguate."),
 (4,"chiaro",0.6,"Un esempio: i numeri di telefono raccolti per avvisare dell'esito di un esame non possono essere usati per inviare pubblicita' di un evento, o passati a un'associazione."),
 (4,"chiaro",0,"Il terzo principio e' la minimizzazione. I dati devono essere adeguati, pertinenti e limitati a quanto necessario rispetto alle finalita'."),
 (4,"chiaro",0,"Non si raccoglie tutto cio' che potrebbe servire un giorno. Si raccoglie cio' che serve adesso, per quello scopo preciso."),
 (4,"chiaro",0.6,"Un esempio: per prenotare una visita non serve chiedere la professione o lo stato civile. Per una richiesta di ferie non serve allegare la diagnosi: basta il dato necessario."),
 (4,"chiaro",0,"La minimizzazione vale anche per l'accesso. Chi lavora in un reparto consulta i dati dei pazienti che segue, non quelli di tutto l'ospedale."),
 (4,"tenue",0.8,"Un distrattore frequente: avere un dato non autorizza a usarlo per qualunque scopo. Conta la finalita' per cui e' stato raccolto."),
 (4,"profondo",1.2,"Uno scopo preciso, solo i dati che servono."),

 (5,"chiaro",0.5,"Il quarto principio e' l'esattezza. I dati devono essere esatti e, se necessario, aggiornati. Vale per l'anagrafe dei pazienti come per quella del personale."),
 (5,"chiaro",0,"Il titolare deve adottare tutte le misure ragionevoli per cancellare o rettificare tempestivamente i dati inesatti. In sanita' un dato sbagliato non e' solo un problema di privacy: e' un rischio clinico."),
 (5,"chiaro",0.6,"Un esempio: un'allergia registrata sul paziente sbagliato, o un indirizzo non aggiornato a cui arriva un referto. Correggere in fretta protegge la persona due volte."),
 (5,"chiaro",0,"Il quinto principio e' la limitazione della conservazione. I dati si conservano in una forma che consente di identificare la persona per il tempo necessario alle finalita', non oltre."),
 (5,"chiaro",0,"Anche qui il regolamento ammette periodi piu' lunghi per archiviazione nel pubblico interesse, ricerca o statistica, con misure adeguate."),
 (5,"chiaro",0,"In sanita' molti tempi di conservazione sono fissati da norme specifiche: per alcuni documenti, come la cartella clinica, sono molto lunghi. Il principio chiede che ogni tempo sia definito, non lasciato al caso."),
 (5,"chiaro",0,"Per questo l'amministrazione fissa, per ogni tipo di documento, un tempo di conservazione. Scaduto il termine, i dati si cancellano o si rendono anonimi, secondo le regole sugli archivi pubblici."),
 (5,"chiaro",0,"Torniamo al quaderno dell'ambulatorio. Quindici anni di numeri tenuti per ogni evenienza: nessuna finalita' precisa, dati in eccesso, nessun termine. Ecco tre principi violati."),
 (5,"tenue",0.8,"Attenzione: conservare piu' a lungo non e' prudenza. Senza una ragione e un termine, e' una violazione del principio."),
 (5,"profondo",1.2,"Dati corretti, e solo per il tempo che serve."),

 (6,"chiaro",0.5,"Il sesto principio e' integrita' e riservatezza. I dati devono essere trattati con un'adeguata sicurezza, mediante misure tecniche e organizzative."),
 (6,"chiaro",0,"La protezione riguarda tre rischi: i trattamenti non autorizzati o illeciti, la perdita e la distruzione, il danno accidentale. L'articolo 32 del regolamento ne fa un obbligo preciso."),
 (6,"chiaro",0,"Il quaderno sullo scaffale, alla portata di chiunque, e' la terza violazione: nessuna protezione dagli accessi non autorizzati."),
 (6,"chiaro",0,"Integrita' significa anche che i dati non vengano alterati. Un valore di laboratorio modificato per errore, o da chi non ne ha titolo, e' una violazione quanto una fuga di notizie."),
 (6,"chiaro",0.6,"Esempi di ogni giorno: un computer lasciato aperto in corridoio, una password condivisa tra colleghi, cartelle su un carrello incustodito, un referto inviato all'indirizzo sbagliato."),
 (6,"chiaro",0,"Le misure sono tecniche, come credenziali personali, cifratura e copie di sicurezza, e organizzative, come istruzioni, formazione e regole su chi puo' accedere a cosa."),
 (6,"chiaro",0,"E sopra i sei principi c'e' la regola della lezione precedente: il titolare e' competente per il loro rispetto, ed e' in grado di dimostrarlo."),
 (6,"tenue",0.8,"Attenzione: la sicurezza non e' solo un problema dell'informatica. Un fascicolo lasciato in vista e' una violazione come un server non protetto."),
 (6,"profondo",1.2,"Proteggere dagli accessi, dalle perdite, dagli errori."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: sei principi nell'articolo 5. Liceita', correttezza e trasparenza; limitazione della finalita'; minimizzazione; esattezza; limitazione della conservazione; integrita' e riservatezza."),
 (7,"chiaro",0.8,"La seconda: i dati si raccolgono per finalita' determinate, esplicite e legittime, e solo quelli necessari; l'ulteriore uso deve essere compatibile, con eccezioni per archivio, ricerca e statistica."),
 (7,"chiaro",0.8,"La terza: i dati vanno tenuti esatti, conservati solo per il tempo necessario e protetti con misure tecniche e organizzative. E il titolare deve saperlo dimostrare."),
 (7,"tenue",0.8,"L'ultimo distrattore: i principi non valgono solo per i dati digitali. Valgono anche per la carta, dal quaderno alla cartella clinica."),

 (8,"profondo",0,"[warm] In sintesi: sei principi che valgono per ogni dato, dalla cartella al quaderno. Nella prossima lezione: le basi giuridiche, cioe' quando un trattamento e' lecito."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: "Liceita', correttezza, trasparenza", 4: "Finalita' e minimizzazione", 5: 'Esattezza e conservazione', 6: "Integrita' e riservatezza", 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
