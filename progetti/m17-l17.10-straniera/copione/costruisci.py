# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Una parte crescente delle persone assistite viene da altri paesi e da altre culture. Il caso tocca temi d'orale di deontologia e comunicazione: la mediazione linguistica e culturale, il consenso di chi parla poco l'italiano."),
 (1,"chiaro",0,"Il rispetto delle convinzioni religiose, e un'educazione terapeutica che funzioni davvero. Ci servono le lezioni uno punto sei, uno punto sette, due punto sette, otto punto tre e nove punto sette."),

 (2,"chiaro",0,"Lo scenario. La signora Nadia ha trentanove anni, e' in Italia da un anno, parla soprattutto arabo e capisce poche parole di italiano. Ha un diabete di tipo due, con antidiabetici orali e insulina basale."),
 (2,"chiaro",0,"E' ricoverata per una colecistectomia programmata. All'ingresso e' accompagnata dal marito e dal figlio di dodici anni, che traduce tutto. E il marito risponde alle domande al posto suo."),
 (2,"chiaro",0,"Il mese del digiuno religioso comincera' fra due settimane, e lei dice di volerlo osservare. Fermati un momento: quali problemi vedi, al di la' della colecistectomia?"),

 (3,"chiaro",0,"[thoughtful] Il ragionamento. C'e' una barriera linguistica, che mette a rischio l'accertamento, il consenso, la sicurezza e l'educazione."),
 (3,"chiaro",0,"Un minore come interprete non e' adeguato: per l'accuratezza, la riservatezza, il carico emotivo che gli si impone. E il marito risponde al posto di Nadia, ma la titolare dell'informazione e del consenso e' lei."),
 (3,"chiaro",0,"Il digiuno religioso, con un diabete in terapia ipoglicemizzante, espone al rischio di ipoglicemia dopo la dimissione. E la cultura puo' incidere sull'espressione del dolore, sul pudore, sull'alimentazione."),

 (4,"chiaro",0,"La mediazione. Si attiva il mediatore linguistico-culturale, in presenza, al telefono o in videochiamata, secondo le procedure aziendali: per l'anamnesi, il consenso, le informazioni importanti, l'educazione, la dimissione."),
 (4,"chiaro",0,"Non si usano minori come interpreti. E per i contenuti clinici si evitano anche familiari e conoscenti, che possono filtrare o modificare le informazioni."),
 (4,"chiaro",0,"Si parla alla paziente, guardandola, non al mediatore. Frasi brevi, verifica della comprensione, materiali tradotti e illustrati."),
 (4,"chiaro",0,"Per le comunicazioni quotidiane semplici si possono usare immagini o applicazioni di traduzione, ma con prudenza: mai per le informazioni cliniche importanti."),

 (5,"chiaro",0,"Il consenso. La titolare e' la paziente, maggiorenne e capace, come prevede la legge duecentodiciannove. L'informazione va data nella sua lingua, tramite il mediatore."),
 (5,"chiaro",0,"Nadia ha il diritto di scegliere se e quanto coinvolgere i familiari, e molte persone desiderano farlo: e' un loro diritto. Ma per saperlo bisogna chiederglielo, anche in un colloquio in privato."),
 (5,"chiaro",0,"Un colloquio che le permetta di esprimersi liberamente. Si rispetta la cultura senza rinunciare ai diritti individuali. E si documenta la presenza del mediatore."),

 (6,"chiaro",0,"Le attenzioni culturali e religiose. La regola e' chiedere, non presumere: c'e' qualcosa che per lei e' importante durante il ricovero?"),
 (6,"chiaro",0,"Spesso emerge il pudore, con la preferenza per un operatore dello stesso sesso nelle cure intime, che si rispetta quando e' possibile. E l'alimentazione, con prescrizioni religiose da conoscere e una dieta adeguata."),
 (6,"chiaro",0,"Poi la preghiera, gli oggetti religiosi, le visite. E il dolore, che si esprime in modi diversi nelle diverse culture: si valuta con scale adatte, come quella delle facce, senza interpretarlo con stereotipi."),
 (6,"chiaro",0,"Il rispetto delle convinzioni e' un dovere deontologico, come prevede il Codice della lezione uno punto quattro."),

 (7,"chiaro",0,"Il percorso chirurgico. La preparazione si spiega con il mediatore: gli orari del digiuno, l'igiene, la custodia di gioielli e oggetti religiosi, le protesi. E con il mediatore si raccoglie il consenso all'anestesia."),
 (7,"chiaro",0,"Il diabete nel perioperatorio richiede la gestione degli antidiabetici orali e dell'insulina basale secondo prescrizione, come nella lezione nove punto due, con il controllo delle glicemie."),
 (7,"chiaro",0,"Nel post-operatorio il dolore si valuta con una scala visiva. E per i bisogni quotidiani si usano cartelli illustrati, acqua, bagno, dolore, nausea, che permettono a Nadia di comunicare anche di notte."),

 (8,"chiaro",0,"[serious] Il digiuno religioso e il diabete. Secondo molte interpretazioni religiose le persone malate sono esentate dal digiuno. Ma la scelta resta personale, e molte persone con diabete desiderano comunque osservarlo."),
 (8,"chiaro",0,"L'infermiere non giudica e non impone. Informa sui rischi: ipoglicemia, disidratazione, iperglicemia nei pasti serali. E coinvolge il medico e il diabetologo, per adattare dosi e orari della terapia."),
 (8,"chiaro",0,"Raccomanda un automonitoraggio piu' frequente, ricordando che, secondo le interpretazioni prevalenti, misurare la glicemia non interrompe il digiuno. E insegna a interromperlo in caso di ipoglicemia o malessere."),
 (8,"chiaro",0,"Subito dopo un intervento, si valuta con il medico l'opportunita' di rinviarlo. E' il colloquio motivazionale della lezione undici punto sei, applicato a una scelta di fede."),

 (9,"chiaro",0,"Un approfondimento sul diritto alle cure. L'assistenza sanitaria e' garantita indipendentemente dalla nazionalita' e dalla condizione della persona."),
 (9,"chiaro",0,"I cittadini stranieri regolarmente presenti si iscrivono al Servizio Sanitario Nazionale. Per gli stranieri temporaneamente presenti non iscritti, la legge garantisce le cure urgenti ed essenziali, con il codice STP."),
 (9,"chiaro",0,"Il personale sanitario non ha compiti di controllo sulla condizione amministrativa della persona: il suo compito e' curare. E il Codice deontologico vieta ogni discriminazione."),

 (10,"chiaro",0,"La dimissione, costruita con il mediatore. L'educazione sulla ferita e sui segni di infezione, sull'alimentazione dopo la colecistectomia, sulla terapia per il diabete. Con materiale tradotto e illustrato."),
 (10,"chiaro",0,"Il teach back tramite il mediatore: e' l'unico modo per verificare che le informazioni siano arrivate. E l'ipoglicemia, con la regola del quindici della lezione otto punto tre."),
 (10,"chiaro",0,"Gli appuntamenti, con date chiare, il luogo e come arrivarci. Il riferimento al medico di medicina generale e ai servizi. E un numero da chiamare."),

 (11,"chiaro",0,"Le competenze interculturali. Cominciano dalla consapevolezza dei propri pregiudizi, perche' tutti ne abbiamo. Poi curiosita' rispettosa, ascolto, domande aperte, conoscenza dei servizi di mediazione."),
 (11,"chiaro",0,"Evitano gli stereotipi, del tipo tutti quelli di quel paese fanno cosi': ogni persona e' un individuo. E la competenza culturale non e' una gentilezza in piu': e' parte della qualita' e della sicurezza delle cure."),

 (12,"chiaro",0,"Gli errori. Usare il figlio di dodici anni come interprete. Rivolgersi al marito invece che alla paziente. Raccogliere il consenso senza mediatore. Presumere i bisogni culturali senza chiedere."),
 (12,"chiaro",0,"Interpretare il dolore con stereotipi. Giudicare la scelta del digiuno, o ignorarla. Dimettere con istruzioni solo in italiano."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: il consenso di una paziente che non parla italiano? Con il mediatore, parlando direttamente a lei, che ne e' titolare, verificando la comprensione, documentando la presenza del mediatore."),
 (13,"chiaro",0,"Seconda: perche' non familiari o minori come interpreti? Per l'accuratezza e la riservatezza, perche' possono filtrare o modificare i contenuti, e, per i minori, per un carico emotivo inappropriato."),
 (13,"chiaro",0,"Terza: il digiuno religioso? Si rispetta la scelta, si informa sui rischi, si coinvolgono medico e diabetologo per adattare la terapia. Automonitoraggio piu' frequente, e digiuno interrotto in caso di ipoglicemia."),

 (14,"chiaro",0,"La risposta modello. Paziente straniera con limitata conoscenza dell'italiano, diabetica, per colecistectomia; un figlio minore che traduce, un marito che risponde per lei, l'intenzione di un digiuno religioso."),
 (14,"chiaro",0,"Attivo il mediatore, non uso il minore come interprete, mi rivolgo alla paziente, titolare del consenso, e le offro un colloquio in privato. Con il mediatore raccolgo anamnesi, consenso, bisogni culturali e religiosi."),
 (14,"chiaro",0,"Valuto il dolore con scale visive e uso cartelli illustrati. Gestisco il diabete secondo prescrizione. Affronto senza giudizio il digiuno, informando sui rischi, con medico e diabetologo. Educo con il mediatore, con teach back, e documento."),

 (15,"chiaro",0,"I collegamenti. Consenso e legge duecentodiciannove con la uno punto sei. Riservatezza con la uno punto sette. Codice deontologico con la uno punto quattro. Comunicazione e teach back con la due punto sette."),
 (15,"chiaro",0,"Diabete e ipoglicemia con la otto punto tre. Preparazione all'intervento con la nove punto due. Dimissione con la nove punto sette. Colloquio motivazionale con la undici punto sei."),

 (16,"chiaro",0,"In Veneto le aziende sanitarie hanno servizi di mediazione linguistico-culturale, materiali informativi multilingue, ambulatori e percorsi per la popolazione straniera, compresi gli STP, e i consultori familiari."),
 (16,"chiaro",0,"All'orale, conoscere l'esistenza di questi servizi, e sapere come attivarli, dimostra una preparazione concreta."),

 (17,"profondo",1.2,"[serious] La frase del caso: un consenso che la paziente non ha capito non e' un consenso. La lingua e' la prima condizione della cura."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: una lesione da pressione che diventa una richiesta di risarcimento. La documentazione, il dialogo con la famiglia, la responsabilita' secondo la legge ventiquattro del duemiladiciassette. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"La mediazione linguistica e culturale",5:"Il consenso e l'autonomia della paziente",
 6:"Le attenzioni culturali e religiose",7:"Il percorso chirurgico",8:"Il digiuno religioso e il diabete",9:"Approfondimento: il diritto alle cure",
 10:"La dimissione",11:"Le competenze interculturali",12:"Gli errori da evitare",13:"Le domande d'orale",
 14:"La risposta modello",15:"I collegamenti",16:"In Veneto",17:"La frase del caso",18:"Chiusura"}

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CPS = 17.0   # misurata su 1.2, confermata da 1.3 a 1.8

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
    if len(b["text"])>225 and b["id"] not in DEROGHE: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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

# Lo stacco fra le due tracce: il confine di capitolo che divide i caratteri
# nel modo piu' pari, fra quelli che tengono ENTRAMBI i chunk sotto i 5.000.
# Prendere il primo confine dopo la meta' non basta: su 2.2 dava un chunk A da
# 5.072 caratteri, e la voce avrebbe rifiutato il testo.
LIMITE = 5000
cand = []
acc = 0
for i, b in enumerate(blocchi[:-1]):
    acc += len(b["text"]) + 1
    if b["capitolo"] != blocchi[i+1]["capitolo"]:
        cand.append((b["id"], acc, tot - acc))
buoni = [c for c in cand if c[1] <= LIMITE and c[2] <= LIMITE]
if buoni:
    stacco, a, bb = min(buoni, key=lambda c: abs(c[1] - c[2]))
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
else:
    stacco, a, bb = min(cand, key=lambda c: max(c[1], c[2]))
    errori.append(f"nessuno stacco tiene i due chunk sotto {LIMITE}: il migliore e' "
                  f"{stacco} con {max(a, bb)} car. Serve un capitolo in piu'.")
    print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {bb} car   (limite {LIMITE})")
# tagli.py deve tagliare dove la voce ha davvero staccato: se le due costanti
# divergono, i blocchi finiscono sulla traccia sbagliata e non se ne accorge
# nessuno finche' non si guarda il video.
import pathlib as _pl
_tagli = _pl.Path("audio/tagli.py")
if _tagli.exists():
    _m = re.search(r'STACCO\s*=\s*"(s\d+)"', _tagli.read_text(encoding="utf-8"))
    if _m and _m.group(1) != stacco:
        errori.append(f'audio/tagli.py ha STACCO = "{_m.group(1)}", qui lo stacco e\' {stacco}')

print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)

# I due chunk per la voce li scrive lo stesso file che ha scritto i blocchi:
# copiarli a mano significherebbe far divergere il copione dal testo letto,
# e la verifica della trascrizione confronterebbe due cose gia' diverse.
i = [b["id"] for b in blocchi].index(stacco)
for nome, gruppo in (("A", blocchi[:i+1]), ("B", blocchi[i+1:])):
    open(f"audio/chunk{nome}.txt","w",encoding="utf-8").write(
        "\n\n".join(b["text"] for b in gruppo) + "\n")
print(f"scritti audio/chunkA.txt e audio/chunkB.txt")
