# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Se c'e' una sola misura di prevenzione da ricordare di tutto il corso, e' questa: l'igiene delle mani. E' la misura singola piu' efficace contro le infezioni correlate all'assistenza."),
 (1,"chiaro",0,"Costa quasi nulla, e resta la piu' disattesa. Nei concorsi e' una certezza: i cinque momenti dell'OMS compaiono praticamente sempre, in una forma o nell'altra, e questa lezione li spiega uno per uno."),

 (2,"chiaro",0,"Perche' le mani. Le mani degli operatori sono il principale veicolo della trasmissione per contatto, la via piu' frequente in ospedale. Sulla cute esistono due flore, e la differenza fra le due spiega tutto."),
 (2,"chiaro",0,"La flora residente vive stabilmente negli strati profondi ed e' poco patogena. La flora transitoria si acquisisce toccando pazienti e superfici: e' quella che causa la maggior parte delle ICA."),
 (2,"chiaro",0,"Si trasmette facilmente, e si rimuove facilmente con l'igiene delle mani. E' la buona notizia: il germe che fa piu' danno e' anche quello che se ne va con venti secondi di gel."),

 (3,"chiaro",0,"I cinque momenti. Uno: prima del contatto con il paziente. Due: prima di una manovra pulita o asettica, un prelievo, una medicazione, la preparazione di un farmaco. Sono i due prima."),
 (3,"chiaro",0,"Tre: dopo il rischio di esposizione a un liquido biologico, anche se avevi i guanti. Quattro: dopo il contatto con il paziente, quando lasci il suo letto."),
 (3,"chiaro",0,"Cinque: dopo il contatto con cio' che circonda il paziente, letto, comodino, attrezzature, anche se il paziente non e' stato toccato. Sono i tre dopo."),
 (3,"profondo",1.2,"[serious] Memorizzali nell'ordine: due prima, tre dopo. Nei quiz compaiono spesso mescolati, e la trappola e' proprio l'ordine."),

 (4,"chiaro",0,"Capire la logica aiuta a non confonderli. I momenti uno e due, i prima, proteggono il paziente dai germi che porti sulle mani, raccolti dal paziente precedente o dall'ambiente."),
 (4,"chiaro",0,"I momenti tre, quattro e cinque, i dopo, proteggono te e l'ambiente dai germi del paziente, impedendo che tu li porti altrove: al collega, al paziente della stanza accanto, a casa."),
 (4,"chiaro",0,"E il quinto e' il piu' dimenticato: si toccano le sponde, la pompa, il campanello, e si esce senza igienizzare. Il paziente non l'hai toccato, la sua flora si'."),

 (5,"chiaro",0,"Il concetto che sta sotto e' quello di zona paziente: la persona e l'ambiente immediatamente circostante, colonizzato dalla sua flora. Tutto il resto e' area sanitaria."),
 (5,"chiaro",0,"L'igiene delle mani si fa ogni volta che si passa da una zona all'altra. Entrare nella zona paziente: momento uno. Uscirne: momento quattro o cinque."),

 (6,"chiaro",0,"Due metodi, e la domanda e' quale e quando. La frizione con soluzione alcolica e' il metodo di scelta nella maggior parte delle situazioni: e' la risposta giusta quando il quiz non specifica altro."),
 (6,"chiaro",0,"E' piu' rapida, piu' efficace sulla flora transitoria, meglio tollerata dalla cute e disponibile al punto di cura. Dura venti-trenta secondi."),
 (6,"chiaro",0,"Il lavaggio con acqua e sapone dura quaranta-sessanta secondi, il doppio, ed e' necessario quando le mani sono visibilmente sporche: il gel non toglie lo sporco, lo disinfetta."),
 (6,"chiaro",0,"E dopo il contatto con spore, il Clostridioides difficile della lezione tre punto sette, e dopo l'uso della toilette. Sporco visibile, spore, toilette: tre casi, e negli altri il gel."),

 (7,"chiaro",0,"La tecnica prevede una sequenza di movimenti che copre tutte le superfici: palmo contro palmo, dorso della mano con il palmo dell'altra, dita intrecciate, dorso delle dita."),
 (7,"chiaro",0,"Pollici con rotazione, polpastrelli sul palmo. Le zone piu' dimenticate sono pollici, polpastrelli e spazi interdigitali: e' li' che i controlli con la lampada trovano i residui."),
 (7,"chiaro",0,"E nella frizione si strofina fino ad asciugatura completa: l'alcol agisce mentre evapora, non va asciugato con la carta. Chi si asciuga le mani ha interrotto la disinfezione."),

 (8,"chiaro",0,"L'igiene funziona solo su mani in condizione. Unghie corte, niente unghie artificiali ne' smalto: sotto le unghie lunghe e artificiali i germi si annidano e l'igiene non li raggiunge."),
 (8,"chiaro",0,"Niente anelli, orologi, braccialetti. Avambracci scoperti. E cura della cute: le mani screpolate trattengono piu' germi, per questo si usano creme protettive fuori dall'attivita' assistenziale."),

 (9,"chiaro",0,"E il concetto su cui i quiz costruiscono il distrattore piu' frequente: i guanti non sostituiscono l'igiene delle mani. Mai, in nessuno dei cinque momenti."),
 (9,"chiaro",0,"Si fa l'igiene prima di indossarli e dopo averli tolti, perche' i guanti hanno micro-lesioni invisibili e le mani si contaminano nel momento in cui li si sfila."),
 (9,"profondo",1.2,"[serious] I guanti si cambiano fra un paziente e l'altro, e anche fra una sede sporca e una pulita dello stesso paziente. E non si lavano ne' si igienizzano i guanti indossati."),

 (10,"chiaro",0,"Esiste poi l'antisepsi chirurgica delle mani, prima degli interventi: con antisettico specifico o con frizione alcolica chirurgica, su mani e avambracci fino al gomito."),
 (10,"chiaro",0,"Si tengono le mani piu' in alto dei gomiti, perche' l'acqua scoli dalle zone piu' pulite verso quelle meno pulite, e non il contrario. La vedremo nel modulo nove, con la sala operatoria."),

 (11,"chiaro",0,"Passiamo alle precauzioni standard, e la loro definizione e' la domanda: si applicano a tutti i pazienti, indipendentemente dalla diagnosi e dallo stato infettivo presunto."),
 (11,"profondo",1.2,"[serious] Ogni sangue e ogni liquido biologico va considerato potenzialmente infetto. Non si decide chi e' a rischio guardandolo: si protegge sempre. A tutti i pazienti: tre parole che nei quiz valgono la risposta."),

 (12,"chiaro",0,"Il contenuto. Igiene delle mani. DPI scelti in base al rischio di esposizione, non alla diagnosi. Igiene respiratoria. Collocazione appropriata del paziente."),
 (12,"chiaro",0,"Gestione delle attrezzature: pulire e disinfettare fra un paziente e l'altro. Pulizia ambientale. Gestione della biancheria sporca, senza scuoterla."),
 (12,"chiaro",0,"Pratiche iniettive sicure. Prevenzione delle punture accidentali. Nove elementi: la lista completa vale una domanda aperta, e i primi due, mani e DPI, valgono i quiz."),

 (13,"chiaro",0,"Le pratiche iniettive sicure meritano un approfondimento, perche' gli errori qui hanno causato epidemie documentate di epatite. Un ago e una siringa per un solo paziente e un solo utilizzo."),
 (13,"chiaro",0,"Preferire i flaconi monodose. Se si usa un multidose: ago e siringa sterili a ogni prelievo, disinfezione del tappo, e mai rientrare in un flacone con una siringa gia' usata, nemmeno cambiando l'ago."),
 (13,"chiaro",0,"E le sacche di soluzione non sono una fonte comune di diluente per piu' pazienti: una sacca, un paziente. Regole semplici, che una sola eccezione trasforma in un'epidemia."),

 (14,"chiaro",0,"L'igiene respiratoria, o etichetta della tosse, entrata nelle precauzioni standard dopo le epidemie respiratorie. Coprire bocca e naso con un fazzoletto o con l'incavo del gomito, non con la mano."),
 (14,"chiaro",0,"Gettare subito il fazzoletto. Igiene delle mani. Mascherina chirurgica alla persona che tossisce, se tollerata. Distanza di almeno un metro nelle aree di attesa. Si insegna ai pazienti e ai visitatori, e si pratica per primi."),

 (15,"chiaro",0,"Un dato scomodo: l'adesione all'igiene delle mani, misurata con l'osservazione diretta, e' spesso ben sotto cio' che gli operatori pensano di fare. Chi si osserva da solo si sopravvaluta."),
 (15,"chiaro",0,"Le cause: carico di lavoro, dispenser lontani dal punto di cura, irritazione cutanea, la convinzione che i guanti bastino, semplice dimenticanza. Nessuna e' cattiva volonta': sono ostacoli, e si rimuovono."),
 (15,"chiaro",0,"E le leve che funzionano sono quelle dell'OMS: dispenser al letto, formazione, osservazione e feedback, promemoria, e l'esempio dei colleghi piu' esperti. Nessuna da sola: tutte insieme."),

 (16,"chiaro",0,"Un caso del tipo che si trova nelle prove. Misuri la pressione al paziente, sistemi il cuscino, poi prepari un'infusione endovenosa per lo stesso paziente. Quando fai l'igiene?"),
 (16,"chiaro",0,"Prima di toccarlo: momento uno. Prima della manovra asettica di preparazione e collegamento dell'infusione: momento due, anche se l'avevi appena fatta, perche' nel frattempo hai toccato il paziente e il letto."),
 (16,"chiaro",0,"E dopo, uscendo dalla zona paziente: momento quattro. La risposta una volta all'inizio e' sbagliata: tre igieni in una visita di cinque minuti, e ognuna ha un motivo diverso."),

 (17,"chiaro",0,"Nelle aziende del servizio sanitario veneto l'igiene delle mani e' oggetto di campagne aziendali periodiche, con osservazione dell'adesione da parte degli infermieri addetti al controllo delle infezioni."),
 (17,"chiaro",0,"Dispenser al punto di cura e restituzione dei risultati ai reparti; molte aziende aderiscono alla giornata mondiale dell'OMS del cinque maggio. All'orale, citare l'osservazione con feedback mostra che sai come si misura."),

 (18,"chiaro",0,"Ricapitoliamo. Cinque momenti: due prima, tre dopo. Frizione alcolica di scelta, venti-trenta secondi, fino ad asciugatura; lavaggio quaranta-sessanta secondi, quando le mani sono sporche o in presenza di spore."),
 (18,"chiaro",0,"[warm] I guanti non sostituiscono l'igiene. Unghie corte, niente gioielli. Le precauzioni standard valgono per tutti: ogni liquido biologico e' potenzialmente infetto. Prossima: quando le standard non bastano. A tra poco."),
]

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Le due flore",3:"I cinque momenti",4:"La logica dei momenti",5:"La zona paziente",
 6:"Frizione o lavaggio",7:"La tecnica",8:"Le mani in condizione",9:"I guanti",10:"L'antisepsi chirurgica",
 11:"Le precauzioni standard",12:"Il contenuto",13:"Le pratiche iniettive",14:"L'igiene respiratoria",
 15:"L'adesione",16:"Il caso d'esame",17:"In Veneto",18:"Chiusura"}
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
