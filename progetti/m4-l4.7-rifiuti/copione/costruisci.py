# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Fin qui abbiamo protetto il paziente. In questa lezione proteggiamo te. Il rischio biologico e' il principale rischio professionale dell'infermiere: sangue, liquidi biologici, aghi."),
 (1,"chiaro",0,"E la puntura accidentale con ago contaminato e' l'infortunio piu' tipico: un gesto di un secondo, e poi settimane di esami e di attesa."),
 (1,"chiaro",0,"La lezione ha un momento centrale: che cosa fare nei primi minuti dopo un'esposizione. E' una domanda che compare nei concorsi, ed e' una sequenza che potresti dover applicare davvero."),

 (2,"chiaro",0,"Il quadro. Il decreto legislativo ottantuno del duemilaotto, al Titolo decimo, disciplina l'esposizione ad agenti biologici e li classifica in quattro gruppi di pericolosita' crescente."),
 (2,"chiaro",0,"Il decreto legislativo diciannove del duemilaquattordici, che recepisce una direttiva europea, riguarda la prevenzione delle ferite da taglio e da punta in sanita': dispositivi di sicurezza, formazione, divieti, segnalazione."),

 (3,"chiaro",0,"Quanto e' alto il rischio dopo una puntura con ago contaminato da un paziente fonte positivo? Per l'epatite B, fino al trenta per cento, se il paziente ha un'elevata replicazione virale."),
 (3,"chiaro",0,"Per l'epatite C, intorno all'uno-due per cento. Per l'HIV, circa lo zero virgola tre per cento. Nei manuali trovi la regola del trenta, del tre, dello zero virgola tre: tre numeri, tre virus, un ordine."),
 (3,"chiaro",0,"Il valore per l'epatite C e' stato ridimensionato dagli studi piu' recenti, ma l'ordine resta quello: l'epatite B molto piu' trasmissibile della C, e la C piu' dell'HIV."),

 (4,"chiaro",0,"La prevenzione. Dispositivi con meccanismo di protezione: aghi retrattili, cappucci di sicurezza, sistemi senza ago per le linee infusionali."),
 (4,"chiaro",0,"Divieto di reincappucciare gli aghi: e' il gesto che causa una quota rilevante delle punture. Smaltimento immediato nel contenitore per taglienti posizionato al punto d'uso, non dall'altra parte della stanza, non dopo."),
 (4,"chiaro",0,"E non passare mai un tagliente da una mano all'altra: si appoggia in una zona neutra, un vassoio, un piano, e l'altro lo prende da li'. Tre regole, e tutte e tre nascono da infortuni veri."),

 (5,"chiaro",0,"Il contenitore per taglienti: rigido, resistente alla perforazione, a chiusura definitiva. Si riempie solo fino alla linea indicata, indicativamente tre quarti del volume, e non un ago di piu'."),
 (5,"chiaro",0,"Mai spingere dentro il materiale per farcelo stare: e' cosi' che l'ago sporgente punge la mano che spinge. E si chiude definitivamente prima dello smaltimento, senza riaprirlo."),

 (6,"chiaro",0,"Ed ecco la sequenza dei primi minuti, quella da sapere a memoria. Per una puntura o un taglio: lavare subito con acqua e sapone, lasciando sanguinare liberamente."),
 (6,"profondo",1.2,"[serious] Ma senza spremere, perche' la compressione traumatizza i tessuti. E niente sostanze caustiche, come la candeggina: non servono e fanno danno."),
 (6,"chiaro",0,"Per le mucose e gli occhi: irrigare abbondantemente con acqua o soluzione fisiologica, togliendo le lenti a contatto. Per la cute lesa esposta a sangue: lavare e disinfettare."),

 (7,"chiaro",0,"Subito dopo: segnalare immediatamente, al coordinatore e al servizio individuato dalla procedura aziendale, il pronto soccorso, il medico competente, il servizio di medicina del lavoro."),
 (7,"chiaro",0,"Si identifica il paziente fonte, si compila la denuncia di infortunio. Il motivo dell'urgenza e' uno solo: la profilassi per l'HIV funziona meglio quanto prima viene iniziata, e le ore contano."),

 (8,"chiaro",0,"Gli esami. Sull'operatore, esami basali per epatite B, epatite C e HIV, che servono a documentare lo stato al momento dell'esposizione: se poi qualcosa cambia, si sa da quando."),
 (8,"chiaro",0,"Sul paziente fonte, i test previo consenso: e' un suo diritto, e la procedura dice come chiederlo. E poi un follow-up sierologico dell'operatore nei mesi successivi, secondo protocollo."),

 (9,"chiaro",0,"La profilassi post-esposizione, virus per virus. Per l'HIV: si inizia il prima possibile, idealmente entro una-due ore, e comunque non oltre le quarantotto-settantadue ore, dopo le quali l'efficacia si considera trascurabile."),
 (9,"chiaro",0,"Dura ventotto giorni. La decisione spetta al medico, sulla base del tipo di esposizione e dello stato del paziente fonte: non tutte le esposizioni la richiedono, ma tutte vanno valutate in fretta."),

 (10,"chiaro",0,"Per l'epatite B: se l'operatore e' vaccinato con risposta documentata, anticorpi anti-HBs pari o superiori a dieci milliunita' per millilitro, non serve nulla."),
 (10,"chiaro",0,"Se non e' vaccinato, o non ha risposto al vaccino, si somministrano immunoglobuline specifiche e vaccino, preferibilmente entro ventiquattro ore: le immunoglobuline coprono subito, il vaccino copre dopo."),
 (10,"chiaro",0,"Per l'epatite C: non esiste una profilassi. Si fa un follow-up per diagnosticare precocemente un'eventuale infezione e trattarla, perche' oggi l'epatite C e' curabile."),

 (11,"chiaro",0,"La prevenzione piu' efficace e' a monte: le vaccinazioni degli operatori, raccomandate dal Piano nazionale. Epatite B, con verifica della risposta anticorpale."),
 (11,"chiaro",0,"Influenza stagionale, che protegge l'operatore e soprattutto i pazienti fragili, che dall'operatore la prendono. Morbillo, parotite, rosolia. Varicella, per chi non l'ha avuta."),
 (11,"chiaro",0,"Difterite, tetano e pertosse, fondamentale in area pediatrica e ostetrica. E COVID-19 secondo le indicazioni vigenti. Vaccinarsi e' anche una responsabilita' deontologica verso chi assisti."),

 (12,"chiaro",0,"Passiamo ai rifiuti, l'altra meta' della lezione. Il riferimento e' il DPR duecentocinquantaquattro del duemilatre, che classifica i rifiuti sanitari in categorie con destini diversi."),
 (12,"chiaro",0,"I rifiuti pericolosi a rischio infettivo: tutto cio' che e' venuto a contatto con sangue e liquidi biologici, i taglienti, i materiali dei pazienti in isolamento. Gli assimilati agli urbani: carta, imballaggi, residui puliti."),
 (12,"chiaro",0,"I rifiuti pericolosi non a rischio infettivo: sostanze chimiche, farmaci citotossici. E categorie che richiedono particolari sistemi di gestione, come i farmaci scaduti."),

 (13,"chiaro",0,"La gestione dei rifiuti a rischio infettivo. Contenitori dedicati, rigidi, con sacco interno e chiusura definitiva, riconoscibili dal simbolo del rischio biologico."),
 (13,"chiaro",0,"Si riempiono fino al limite indicato e si chiudono dove sono stati prodotti, nel punto di produzione. Il deposito temporaneo in reparto ha limiti di tempo stabiliti dalla norma."),
 (13,"chiaro",0,"E mai comprimere i sacchi con le mani per farci stare altro materiale: e' un altro modo classico di pungersi, con un ago che qualcuno ha buttato nel sacco sbagliato."),

 (14,"chiaro",0,"E un aspetto spesso trascurato: cio' che non e' contaminato non va nei rifiuti infettivi. Gli imballaggi, la carta, le confezioni integre vanno nella raccolta ordinaria."),
 (14,"chiaro",0,"I rifiuti infettivi hanno costi di smaltimento molto piu' alti e un maggiore impatto ambientale. Separare correttamente al punto di produzione e' parte della professionalita'."),

 (15,"chiaro",0,"Una situazione pratica: uno spandimento di sangue o di liquidi biologici su una superficie, un pavimento, un piano di lavoro. Si indossano i DPI, si assorbe con materiale monouso."),
 (15,"chiaro",0,"Si disinfetta con un prodotto adeguato, tipicamente a base di cloro, secondo la procedura, e si smaltisce tutto come rifiuto a rischio infettivo. Esistono kit dedicati in molti reparti."),

 (16,"chiaro",0,"Il caso, e la risposta in ordine. Durante un prelievo ti pungi con l'ago usato. Uno: metti in sicurezza il paziente e smaltisci l'ago. Due: lavi con acqua e sapone, lasciando sanguinare senza spremere."),
 (16,"chiaro",0,"Tre: segnali immediatamente al coordinatore e al servizio previsto dalla procedura. Quattro: si identifica il paziente fonte e si richiedono i test con il suo consenso."),
 (16,"chiaro",0,"Cinque: esami basali tuoi e valutazione della profilassi, che per l'HIV va iniziata entro poche ore. Sei: denuncia di infortunio e follow-up."),
 (16,"profondo",1.2,"[serious] Chi risponde «disinfetto con alcol e finisco il turno» sbaglia la domanda e rischia la salute."),

 (17,"chiaro",0,"Nelle aziende del servizio sanitario veneto esiste una procedura per l'esposizione accidentale a materiale biologico, con un percorso rapido attivo ventiquattro ore su ventiquattro, spesso tramite il pronto soccorso."),
 (17,"chiaro",0,"E presa in carico successiva del medico competente. I dispositivi di sicurezza sono adottati ai sensi del decreto diciannove, e la gestione dei rifiuti segue procedure aziendali con formazione del personale."),

 (18,"chiaro",0,"Ricapitoliamo. Rischio di trasmissione: epatite B maggiore di epatite C, maggiore di HIV. Mai reincappucciare; contenitore al punto d'uso, riempito fino alla linea."),
 (18,"chiaro",0,"Dopo una puntura: lavare con acqua e sapone, lasciar sanguinare senza spremere, niente caustici, segnalare subito al coordinatore e al servizio previsto."),
 (18,"chiaro",0,"Profilassi per l'HIV entro una-due ore, al massimo quarantotto-settantadue, per ventotto giorni. Epatite B: nessun intervento se vaccinato con risposta. Epatite C: nessuna profilassi, solo follow-up."),
 (18,"chiaro",0,"[warm] E la parola chiave e' tempestivita': ogni passo di questa lezione vale di piu' quanto prima lo fai. Nella prossima lezione ricomponiamo il modulo quattro. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Il quadro normativo",3:"Il rischio di trasmissione",4:"La prevenzione",5:"Il contenitore per taglienti",
 6:"I primi minuti",7:"Segnalare subito",8:"Gli esami",9:"La profilassi: HIV",
 10:"La profilassi: HBV e HCV",11:"Le vaccinazioni",12:"I rifiuti: il riferimento",13:"I rifiuti infettivi",14:"La raccolta differenziata",
 15:"Gli spandimenti",16:"Il caso d'esame",17:"In Veneto",18:"Chiusura"}

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
