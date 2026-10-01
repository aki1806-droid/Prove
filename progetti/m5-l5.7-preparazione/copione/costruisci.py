# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Fra la farmacia e il paziente c'e' un tratto di strada che attraversa il reparto: l'armadio, il frigorifero, il piano di preparazione, la linea infusionale."),
 (1,"chiaro",0,"In ciascuno di questi punti un farmaco corretto puo' diventare inefficace o pericoloso. La lezione riguarda la qualita' del farmaco, e si chiude con due temi ad alto rischio: gli antiblastici e il carrello delle emergenze."),

 (2,"chiaro",0,"Due operazioni diverse. La ricostituzione scioglie una polvere; la diluizione porta una soluzione a una concentrazione minore. In entrambi i casi il solvente e il volume sono quelli indicati nella scheda tecnica del farmaco."),
 (2,"chiaro",0,"Cioe' il riassunto delle caratteristiche del prodotto, la fonte da consultare. E non e' indifferente quale solvente si usa: alcuni farmaci precipitano in fisiologica, altri in glucosata."),

 (3,"chiaro",0,"Tre esempi che ricorrono. L'amfotericina B si diluisce solo in glucosata al cinque per cento: in fisiologica precipita. La fenitoina, al contrario, solo in fisiologica: in glucosata precipita."),
 (3,"chiaro",0,"Il ceftriaxone non va mai miscelato con soluzioni contenenti calcio, come il Ringer lattato, per il rischio di precipitati, gravissimo nei neonati."),
 (3,"chiaro",0,"Non si imparano tutti a memoria: si impara a consultare la scheda tecnica o la farmacia, prima di diluire."),

 (4,"chiaro",0,"Le regole della preparazione. Tecnica asettica, con igiene delle mani e disinfezione dei tappi dei flaconi. Preparare immediatamente prima dell'uso, non all'inizio del turno per tutto il giro."),
 (4,"chiaro",0,"Etichettare ogni preparazione: paziente, farmaco, dose, concentrazione, data e ora, operatore. I flaconi monodose si usano una sola volta, anche se avanza farmaco."),
 (4,"chiaro",0,"I multidose si datano all'apertura, con data e ora, e si conservano e si eliminano secondo la scheda tecnica e la procedura aziendale, non oltre il termine indicato."),

 (5,"chiaro",0,"La stabilita'. Un farmaco ricostituito o diluito resta efficace e sicuro per un tempo limitato, indicato nella scheda tecnica, che dipende da temperatura, luce e contenitore."),
 (5,"chiaro",0,"Un'infusione preparata e lasciata per ore su un carrello puo' non essere piu' cio' che era stato prescritto. E' un'altra ragione per preparare subito prima."),

 (6,"chiaro",0,"Alcuni farmaci sono fotosensibili: la luce li degrada. Vanno protetti con sacche coprenti e deflussori oscurati, dalla preparazione alla fine dell'infusione."),
 (6,"chiaro",0,"Esempi: il nitroprussiato, l'amfotericina B, alcuni chemioterapici, le vitamine nelle nutrizioni parenterali. Se il farmaco arriva in un contenitore scuro, non va travasato in uno trasparente."),

 (7,"chiaro",0,"La compatibilita' in linea, quando piu' farmaci passano nella stessa via. Le incompatibilita' possono essere fisiche, precipitati, torbidita', cambi di colore, o chimiche."),
 (7,"profondo",1.2,"[serious] E queste non si vedono: il farmaco viene inattivato senza segni. Le regole: nel dubbio si usa un lume dedicato o si lava la linea fra un farmaco e l'altro; si consultano tabelle di compatibilita' e la farmacia."),
 (7,"chiaro",0,"Mai aggiungere farmaci a sangue ed emocomponenti. E un esempio classico da quiz: il bicarbonato precipita con il calcio e inattiva le catecolamine, come l'adrenalina."),

 (8,"chiaro",0,"La catena del freddo. Insuline non aperte, vaccini, molti farmaci biologici si conservano fra due e otto gradi. Il frigorifero dev'essere dedicato ai farmaci, niente alimenti."),
 (8,"chiaro",0,"Con un termometro di minima e massima e una registrazione periodica della temperatura, secondo la procedura. E mai congelare: i farmaci stanno lontano dalla parete fredda del frigorifero."),
 (8,"chiaro",0,"Se si scopre un'escursione fuori range, i farmaci si isolano, non si usano e non si buttano, e si contatta la farmacia, che valuta se sono ancora utilizzabili."),

 (9,"chiaro",0,"L'armadio farmaceutico di reparto. Ordine e separazione: i farmaci ad alto rischio e i LASA in posizioni distinte e segnalate, il potassio concentrato dove previsto dalla procedura della Raccomandazione uno."),
 (9,"chiaro",0,"Controllo periodico delle scadenze, con il principio FIFO: prima si usa cio' che scade prima. I farmaci portati da casa dal paziente si gestiscono secondo la procedura: identificati, custoditi, mai usati senza prescrizione."),

 (10,"chiaro",0,"Gli antiblastici, o chemioterapici antineoplastici. Sono farmaci citotossici: agiscono sulle cellule in divisione, e per questo sono potenzialmente mutageni, cancerogeni e teratogeni anche per chi li manipola."),
 (10,"chiaro",0,"L'esposizione dell'operatore avviene per inalazione di aerosol, contatto cutaneo, ingestione accidentale e puntura accidentale con un ago contaminato."),
 (10,"chiaro",0,"Il quadro e' quello del decreto ottantuno del duemilaotto e delle linee guida nazionali sulla sicurezza degli operatori esposti a chemioterapici antiblastici, che il concorso puo' citare."),

 (11,"chiaro",0,"La regola fondamentale: gli antiblastici si preparano in modo centralizzato, in un'unita' dedicata, l'UFA, Unita' Farmaci Antiblastici, sotto la responsabilita' del farmacista ospedaliero."),
 (11,"chiaro",0,"Sotto cappa di sicurezza biologica a flusso laminare verticale, possibilmente con sistemi chiusi di trasferimento, da personale formato. Le operatrici in gravidanza e in allattamento sono escluse dall'esposizione."),
 (11,"profondo",1.2,"[serious] Il reparto non prepara: riceve e somministra."),

 (12,"chiaro",0,"La somministrazione. DPI: guanti adatti, spesso doppi, camice monouso a maniche lunghe chiuso davanti, protezione oculare se c'e' rischio di schizzi. Raccordi luer-lock, che non si staccano."),
 (12,"chiaro",0,"Il deflussore si riempie con soluzione priva di farmaco, cosi' che l'aria espulsa non contenga chemioterapico. Si verifica la pervieta' dell'accesso prima di iniziare. Il kit per gli spandimenti sta a portata di mano."),

 (13,"chiaro",0,"Lo stravaso di un antiblastico vescicante puo' causare necrosi dei tessuti. La sequenza: fermare subito l'infusione; lasciare in sede l'ago-cannula e aspirare quanto possibile del farmaco; poi rimuovere; avvisare il medico."),
 (13,"chiaro",0,"Applicare le misure specifiche per quel farmaco: per molti il freddo, per alcuni, come gli alcaloidi della vinca, il caldo, dove previsto un antidoto. Sollevare l'arto; delimitare, documentare, sorvegliare nei giorni dopo."),
 (13,"chiaro",0,"Ogni reparto oncologico ha la sua procedura: all'esame si cita la sequenza, dal fermare l'infusione al documentare, e si rinvia alla procedura per il dettaglio."),

 (14,"chiaro",0,"Tre ultime regole. Gli escreti del paziente, urine, feci, vomito, contengono farmaco per almeno quarantotto ore, per alcuni farmaci di piu': si maneggiano con guanti e camice, come il farmaco stesso."),
 (14,"chiaro",0,"Uno spandimento si gestisce con il kit dedicato, i DPI e un contenimento dall'esterno verso il centro. I rifiuti vanno nei contenitori specifici per citotossici, ricordi la classificazione della lezione quattro punto sette."),
 (14,"chiaro",0,"E la Raccomandazione quattordici del Ministero riguarda proprio la prevenzione degli errori con questi farmaci, gli antineoplastici."),

 (15,"chiaro",0,"Il carrello delle emergenze. Il contenuto e' standardizzato, uguale in tutti i reparti dell'azienda, e noto a tutto il personale; la posizione e' nota e il carrello accessibile, mai ingombrato da altro materiale."),
 (15,"chiaro",0,"Si controlla con cadenza programmata dalla procedura e dopo ogni utilizzo, con una check-list firmata e un sigillo che attesta l'integrita'. Si verificano scadenze, defibrillatore, aspiratore, bombola di ossigeno."),
 (15,"profondo",1.2,"[serious] Un carrello incompleto si scopre nel momento peggiore: durante un arresto cardiaco."),

 (16,"chiaro",0,"I farmaci che trovi in ogni carrello: adrenalina, amiodarone, atropina, naloxone, glucosio, e gli altri previsti dalla procedura, in formulazioni e concentrazioni standardizzate, uguali in tutta l'azienda."),
 (16,"chiaro",0,"Cosi' che in emergenza nessuno debba calcolare con una concentrazione diversa dal solito. Li useremo nel modulo dieci, quello delle emergenze."),

 (17,"chiaro",0,"Un caso breve. Al mattino il termometro del frigorifero dei farmaci segna una massima di quattordici gradi nella notte. Che cosa fai? Non usi i farmaci e non li butti: li isoli, in attesa di valutazione."),
 (17,"chiaro",0,"Contatti la farmacia, che valuta per ciascun farmaco se e' ancora utilizzabile. Verifichi il funzionamento del frigorifero e segnali il guasto. Documenti. E se nel frattempo serve un farmaco, lo chiedi alla farmacia."),

 (18,"chiaro",0,"Nelle aziende del SSSR veneto gli antiblastici sono allestiti nelle UFA aziendali, con tracciabilita' della preparazione, e il personale esposto e' sottoposto a sorveglianza sanitaria dal medico competente."),
 (18,"chiaro",0,"Esistono procedure aziendali su conservazione, catena del freddo e carrello delle emergenze, con controlli verificabili e firmati. All'orale, per gli antiblastici, la parola chiave e' centralizzazione."),

 (19,"chiaro",0,"Ricapitoliamo. Solvente e volume dalla scheda tecnica. Preparare subito prima ed etichettare. Monodose una volta sola. Fotosensibili al buio. Nel dubbio sulla compatibilita', lume dedicato."),
 (19,"chiaro",0,"Catena del freddo: fra due e otto gradi, frigorifero dedicato, mai congelare. Antiblastici: centralizzati, DPI, sequenza dello stravaso. Carrello delle emergenze: controllato, sigillato, ricontrollato dopo ogni uso."),
 (19,"chiaro",0,"[warm] Nella prossima lezione ricomponiamo il modulo, con il riepilogo del modulo cinque e i venti calcoli cronometrati. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Ricostituzione e diluizione",3:"Gli esempi dei quiz",4:"Le regole della preparazione",5:"La stabilita'",
 6:"I farmaci fotosensibili",7:"La compatibilita' in linea",8:"La catena del freddo",9:"L'armadio farmaceutico",10:"Gli antiblastici",
 11:"La preparazione centralizzata",12:"La somministrazione",13:"Lo stravaso",14:"Escreti, spandimenti, rifiuti",15:"Il carrello delle emergenze",
 16:"I farmaci del carrello",17:"Il caso",18:"In Veneto",19:"Chiusura"}

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
