# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Nella lezione precedente abbiamo visto che il campo di attivita' dell'infermiere e' delimitato da tre fonti. Adesso apriamo la prima, e la piu' importante: il profilo professionale."),
 (1,"chiaro",0,"E' un testo brevissimo, poco piu' di una pagina, ed e' la norma piu' citata nelle prove scritte. Oggi la leggiamo comma per comma, perche' a fine lezione tu la sappia raccontare in ordine."),
 (2,"chiaro",0,"Quattro traguardi: che tipo di atto e' il decreto; i tre elenchi del comma due, che i quiz mescolano; le cinque attivita' del comma tre coi verbi esatti; e cosa vuol dire avvalersi del personale di supporto."),

 (3,"chiaro",0,"Il decreto ministeriale 739 del 1994 e' un regolamento, emanato in attuazione dell'articolo 6 comma 3 del decreto legislativo 502 del 1992."),
 (3,"chiaro",0,"Quel decreto aveva affidato al Ministro il compito di individuare le figure professionali e i relativi profili. Il 739 e' l'esecuzione di quel compito per l'infermiere."),
 (3,"chiaro",0,"Si compone di due soli articoli: il primo descrive il profilo, il secondo stabilisce che il titolo abilita all'esercizio. Essere un regolamento e non una legge conta: si cambia con un altro decreto."),

 (4,"tenue",0,"[serious] Una precisazione che vale punti. Il 1994 individua figura e profilo. Non abroga il mansionario, non istituisce l'Ordine, non disciplina l'autonomia professionale."),
 (4,"tenue",0,"E' la fonte del contenuto della professione, non del suo status giuridico. Quando in un quiz vedi il 1994 accostato a un'abrogazione, hai gia' trovato l'opzione sbagliata."),

 (5,"profondo",0,"Comma uno. L'infermiere e' l'operatore sanitario che, in possesso del diploma abilitante e dell'iscrizione all'albo professionale, e' responsabile dell'assistenza generale infermieristica."),
 (5,"chiaro",0,"Tre elementi, tutti operativi. Operatore sanitario, non ausiliario. Diploma e albo sono due requisiti, non uno: il titolo da solo non abilita, ed e' la coppia esatta che i bandi chiedono."),
 (5,"chiaro",0,"E responsabile dell'assistenza generale. Generale vuol dire non limitata a un elenco di atti, e nemmeno a una specialita': la specialita' si aggiunge dopo, non restringe il profilo."),

 (6,"chiaro",0,"Comma due. Tre elenchi diversi in due righe di testo, e i quiz vivono di questa confusione. Si mescolano perche' stanno nello stesso comma e due su tre hanno tre voci. Teniamoli separati coi numeri: quattro, tre, tre."),

 (7,"chiaro",0,"Il primo elenco sono i tipi di assistenza, e sono quattro: preventiva, curativa, palliativa e riabilitativa. Nota dove sta la palliativa: e' scritta li' dal 1994."),
 (7,"chiaro",0,"Sedici anni prima della legge 38 del 2010. All'orale e' un dettaglio che fa impressione, perche' dimostra che le cure palliative sono da sempre nel mandato professionale, non un'aggiunta recente."),

 (8,"chiaro",0,"Il secondo elenco sono le nature, e sono tre: tecnica, relazionale ed educativa. Quella che sparisce nei distrattori e' quasi sempre l'educativa. Educare la persona a gestirsi non e' un di piu': e' assistenza."),
 (8,"chiaro",0,"Il terzo elenco sono le funzioni principali, e sono anche queste tre: la prevenzione delle malattie, l'assistenza dei malati e dei disabili di tutte le eta', e l'educazione sanitaria."),
 (8,"tenue",0,"Attenzione a di tutte le eta'. E' una clausola, non un riempitivo: esclude qualunque opzione che limiti l'assistenza infermieristica a una fascia d'eta'. Se in un quiz leggi solo adulti, e' sbagliata."),

 (9,"chiaro",0,"E arriviamo al cuore del decreto, il comma tre. In relazione al processo assistenziale, l'infermiere. Lettera a: partecipa all'identificazione dei bisogni di salute della persona e della collettivita'."),
 (9,"chiaro",0,"Lettera b: identifica i bisogni di assistenza infermieristica della persona e della collettivita', e ne formula i relativi obiettivi. «Della persona e della collettivita'» torna in tutte e due le lettere."),

 (10,"profondo",0,"[thoughtful] Non si guarda solo il letto che si ha davanti. E fermiamoci qui, perche' e' la distinzione piu' chiesta del modulo: sui bisogni di salute si partecipa, su quelli di assistenza si identifica."),
 (10,"chiaro",0,"Il perche' vale piu' dei verbi: il bisogno di salute non e' di nessuna professione in particolare, si legge insieme agli altri. Il bisogno di assistenza infermieristica, invece, e' tuo."),
 (10,"chiaro",0,"E' l'oggetto su cui tu fai diagnosi. Chi inverte i due verbi sbaglia la domanda. Se all'orale ti si annebbia, non cercare il verbo: chiediti di chi e' il bisogno, e il verbo viene da se'."),
 (10,"profondo",1.4,"Ripetilo ad alta voce, una volta sola. Bisogni di salute, partecipo. Bisogni di assistenza infermieristica, identifico."),

 (11,"chiaro",0,"Lettera c: pianifica, gestisce e valuta l'intervento assistenziale infermieristico. Lettera d: garantisce la corretta applicazione delle prescrizioni diagnostico-terapeutiche."),
 (11,"chiaro",0,"Lettera e: agisce individualmente o in collaborazione con gli altri operatori sanitari e sociali, avvalendosi, ove necessario, dell'opera del personale di supporto. Cinque lettere: contale sulle dita."),

 (12,"chiaro",0,"Nota la simmetria rovesciata fra la lettera c e la lettera d. Sull'intervento assistenziale infermieristico l'infermiere pianifica, perche' e' suo. Suo vuol dire che ne risponde dall'inizio alla fine."),
 (12,"chiaro",0,"Sulle prescrizioni diagnostico-terapeutiche garantisce la corretta applicazione, perche' sono di un altro professionista: non le prescrive e non le pianifica. Il verbo cambia perche' cambia il padrone dell'atto."),
 (12,"tenue",0,"Ma garantire, l'abbiamo visto nella lezione scorsa, non vuol dire eseguire a occhi chiusi. Comporta verificare, e chiarire prima di dare corso a una prescrizione palesemente errata."),

 (13,"chiaro",0,"La lettera e regge il rapporto quotidiano con l'OSS, e due parole vanno pesate. Si avvale: e' un rapporto funzionale, non gerarchico. Non e' galateo: da come lo qualifichi discende chi risponde di che cosa."),
 (13,"chiaro",0,"L'infermiere non e' il capo dell'OSS, e' il responsabile del processo assistenziale. E ove necessario: e' una valutazione che fai tu, non un automatismo dell'organizzazione."),

 (14,"chiaro",0,"Da qui nasce l'attribuzione. Quali attivita' affidare al personale di supporto lo valuta l'infermiere, guardando tre cose. E attribuire non e' delegare: la delega trasferisce, l'attribuzione distribuisce."),
 (14,"chiaro",0,"La competenza dell'operatore. La complessita' e la stabilita' delle condizioni della persona assistita. E il contesto organizzativo: protocolli, e possibilita' di supervisione."),
 (14,"tenue",0,"Tre criteri che nei casi clinici vanno citati per nome. E se uno dei tre non regge, l'attivita' non si attribuisce: davanti a una persona instabile, la risposta giusta e' no."),

 (15,"profondo",0,"[serious] E questa e' la regola d'oro. Chi attribuisce risponde della scelta di attribuire. Era corretto affidare quell'attivita', a quell'operatore, per quella persona?"),
 (15,"profondo",0,"Chi esegue risponde della corretta esecuzione, nei limiti della propria competenza. La responsabilita' non si trasferisce per intero: si distribuisce."),
 (15,"chiaro",0,"Il criterio che ti salva nei casi clinici: la domanda non e' se e' andata male, e' se la scelta era giusta quando l'hai fatta. Si giudica la decisione, non l'esito."),

 (16,"tenue",0,"Restano non attribuibili gli atti che il profilo assegna a te come professionista: l'accertamento e la diagnosi infermieristica, la pianificazione, la valutazione degli esiti."),
 (16,"tenue",0,"La gestione e la somministrazione della terapia, le valutazioni cliniche. Il filo comune e' che sono giudizi, non compiti. L'OSS collabora, osserva e riferisce, ma non pianifica e non decide."),

 (17,"chiaro",0,"Il decreto aggiunge due frasi brevi ma pesanti. L'infermiere contribuisce alla formazione del personale di supporto, e concorre all'aggiornamento e alla ricerca. Due frasi che in un quiz valgono quanto un comma intero."),
 (17,"chiaro",0,"L'aggiornamento non e' una facolta', e' un dovere professionale. E diventera' fondamento di responsabilita' per imperizia, come vedremo nella lezione uno punto cinque."),
 (17,"chiaro",0,"Il campo di intervento, infine, non e' l'ospedale. Sono le strutture pubbliche e private, il territorio, il domicilio, in regime di dipendenza o di libera professione."),

 (18,"chiaro",0,"L'ultimo comma prevede la formazione post-base in cinque aree: sanita' pubblica, pediatria, salute mentale e psichiatria, geriatria, area critica. Cinque, come le attivita' del comma tre: la coincidenza aiuta a ricordarle."),
 (18,"chiaro",0,"Oggi sono i master di primo livello. Attenzione a non confonderle con i quattro livelli della legge 43 del 2006: professionista, coordinatore, specialista, dirigente."),
 (18,"chiaro",0,"[curious] Il test per non sbagliare: le aree rispondono alla domanda dove lavori, i livelli alla domanda fin dove sei arrivato. Ambiti clinici da una parte, sviluppo di carriera dall'altra."),

 (19,"profondo",0,"[warm] Chiudiamo con i numeri, che sono il modo piu' rapido per controllare se il profilo lo ricordi davvero. Due articoli. Quattro tipi di assistenza, con la palliativa dentro dal 1994."),
 (19,"profondo",0,"Tre nature: tecnica, relazionale, educativa. Tre funzioni: prevenzione, assistenza a tutte le eta', educazione sanitaria. Cinque attivita' nel comma tre. Cinque aree post-base."),
 (19,"profondo",0,"E la regola d'oro: chi attribuisce risponde della scelta, chi esegue della corretta esecuzione. Nella dispensa trovi il testo commentato, quindici quiz e la traccia di risposta gia' svolta."),
 (19,"chiaro",0,"Un'ultima cosa onesta: nessuno ricorda un decreto a memoria. Quello che si ricorda sono i numeri, e da quelli si ricostruisce il testo. Nella prossima lezione: formazione, Ordine, ECM e carriera."),
]

ACCENTATE = "àèéìíòóùúÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"Che atto e'",4:"Che cosa NON fa",
 5:"Comma 1: la definizione",6:"Comma 2: i tre elenchi",7:"I quattro tipi",
 8:"Le tre nature e le tre funzioni",9:"Comma 3: lettere a e b",10:"Il gioco dei verbi",
 11:"Comma 3: lettere c, d, e",12:"L'asimmetria",13:"Il personale di supporto",
 14:"L'attribuzione",15:"Chi risponde di che cosa",16:"Che cosa non e' attribuibile",
 17:"Formazione, ricerca, campo",18:"Le cinque aree post-base",19:"Chiusura"}
CPS = 16.3   # misurata su 1.1, corretta al ribasso: questa lezione ha piu' numeri

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>50: errori.append(f"scene {nscene} > 50")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+3+10
print(f"blocchi   {len(blocchi)}        scene {nscene}/50")
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

acc=0; stacco=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if acc>tot/2 and stacco is None and i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        stacco=b["id"]; a=acc
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
