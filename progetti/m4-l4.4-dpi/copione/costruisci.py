# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] I dispositivi di protezione individuale, i DPI, proteggono solo se si scelgono bene, si indossano bene e, soprattutto, si tolgono bene. Tre verbi, e il terzo e' quello che conta di piu'."),
 (1,"chiaro",0,"E' nella svestizione che avviene la maggior parte delle autocontaminazioni, ed e' per questo che le sequenze vengono chieste nei concorsi e verificate nelle prove pratiche."),
 (1,"chiaro",0,"Questa lezione e' costruita intorno a due sequenze e a un principio: la sequenza della vestizione, la sequenza della svestizione, e la regola su che cosa si puo' toccare e che cosa no."),

 (2,"chiaro",0,"I DPI sono disciplinati dal decreto legislativo ottantuno del duemilaotto, il testo unico sulla sicurezza nei luoghi di lavoro: sono attrezzature destinate a proteggere il lavoratore da uno o piu' rischi."),
 (2,"chiaro",0,"Il datore di lavoro li fornisce, li mantiene efficienti, forma e addestra all'uso. Il lavoratore li utilizza correttamente, ne ha cura e segnala difetti e mancanze."),
 (2,"chiaro",0,"E' un obbligo reciproco: il datore fornisce, forma e addestra; il lavoratore utilizza e segnala. E per l'infermiere e' anche una responsabilita' verso i pazienti: il DPI che protegge te protegge anche chi assisti dopo."),

 (3,"chiaro",0,"La distinzione fondamentale. La mascherina chirurgica e' un dispositivo medico: protegge l'ambiente e il paziente dalle emissioni di chi la indossa."),
 (3,"chiaro",0,"Protegge anche l'operatore, ma solo da schizzi e goccioline grandi: non sigilla sul volto, e quindi non protegge dall'inalazione di particelle fini. E' una barriera, non un filtro."),
 (3,"chiaro",0,"Il respiratore, o facciale filtrante FFP, e' un DPI: protegge chi lo indossa dall'inalazione, perche' filtra e aderisce al viso. Dispositivo medico da una parte, DPI dall'altra."),

 (4,"chiaro",0,"I facciali filtranti si classificano per efficienza filtrante: FFP1 circa ottanta per cento, FFP2 circa novantaquattro, FFP3 circa novantanove. In sanita' si usano FFP2 e FFP3."),
 (4,"chiaro",0,"L'FFP3 e' indicato nelle procedure che generano aerosol, intubazione, broncoscopia, aspirazione a circuito aperto, ventilazione non invasiva, su pazienti con infezioni trasmissibili per via aerea."),

 (5,"chiaro",0,"Un respiratore protegge solo se aderisce al viso. Si distinguono due cose: il fit test, la prova di tenuta, qualitativa o quantitativa, eseguita una volta per scegliere il modello adatto al proprio viso, e il fit check."),
 (5,"chiaro",0,"Il fit check e' il controllo di tenuta che si fa a ogni vestizione: si inspira ed espira coprendo il filtro, verificando che non ci siano perdite ai bordi. Barba e basette compromettono la tenuta."),
 (5,"chiaro",0,"E un dettaglio: il respiratore con valvola protegge chi lo indossa, ma lascia uscire l'aria espirata non filtrata. Non va usato dove serve proteggere il campo sterile o gli altri."),

 (6,"chiaro",0,"Gli altri DPI. I guanti: sterili per le manovre asettiche, non sterili per il contatto con liquidi biologici; in nitrile o lattice, con attenzione alle allergie."),
 (6,"chiaro",0,"Il camice, impermeabile se c'e' rischio di schizzi abbondanti, altrimenti in tessuto non tessuto. Occhiali protettivi o visiera, quando c'e' rischio di schizzi su occhi e mucose: gli occhi sono una porta d'ingresso."),
 (6,"chiaro",0,"E gli occhiali da vista non sono un DPI: non chiudono ai lati, e uno schizzo li aggira. Vale una domanda al concorso, e vale un errore in reparto: sopra gli occhiali da vista ci va la visiera."),

 (7,"chiaro",0,"Il principio della scelta, che deriva dalle precauzioni standard della lezione quattro punto due: i DPI si scelgono in base a che cosa sto per fare, non a chi e' il paziente."),
 (7,"chiaro",0,"Un prelievo richiede i guanti. Un'aspirazione tracheale richiede guanti, camice e protezione di occhi e bocca, perche' genera schizzi. L'igiene di un paziente incontinente richiede guanti e camice."),
 (7,"chiaro",0,"La domanda da farsi, prima di ogni manovra, e': che cosa potrebbe raggiungermi, e dove? Le mani, gli occhi, la bocca, la divisa. La risposta dice quali DPI. Il nome sulla cartella non dice niente."),

 (8,"chiaro",0,"La vestizione, che si fa prima di entrare. Uno: igiene delle mani. Due: camice, allacciato dietro al collo e alla vita. Tre: mascherina o respiratore, con il fit check se e' un FFP."),
 (8,"chiaro",0,"Quattro: occhiali o visiera. Cinque: guanti, per ultimi, sopra i polsini del camice, cosi' che non resti pelle scoperta fra il guanto e la manica. Cinque passi, sempre nello stesso ordine."),
 (8,"chiaro",0,"La logica: i guanti vanno per ultimi perche' devono essere puliti quando si inizia a lavorare. Tutto quello che si tocca dopo averli messi e' il paziente, non il proprio camice."),

 (9,"chiaro",0,"Ora la svestizione, che e' il momento critico, quello in cui si sbaglia. Il principio che governa tutto: la parte anteriore e la superficie esterna dei DPI sono contaminate, per definizione."),
 (9,"profondo",1.2,"[serious] Si toccano solo le parti pulite: i lacci, gli elastici, l'interno del camice e dei guanti. E le mani non toccano mai il proprio viso, in nessun momento della sequenza."),

 (10,"chiaro",0,"La sequenza della svestizione. Uno: guanti, che sono la parte piu' contaminata, e vanno via per primi. Due: occhiali o visiera, afferrandoli dall'elastico o dalle stanghette posteriori, mai dalla parte davanti."),
 (10,"chiaro",0,"Tre: camice, slacciato dai lacci e arrotolato verso l'interno, cosi' che la parte contaminata resti chiusa dentro e l'interno pulito resti fuori."),
 (10,"chiaro",0,"Quattro: mascherina o respiratore, sfilandoli dagli elastici senza toccare la parte frontale. E nelle precauzioni per via aerea il respiratore si toglie fuori dalla stanza, dopo aver chiuso la porta."),
 (10,"chiaro",0,"Cinque: igiene delle mani, che chiude la sequenza. E se in un qualunque passaggio le mani si contaminano, si fa l'igiene subito, anche a meta' sequenza, e poi si riprende da dove si era."),

 (11,"chiaro",0,"Esiste una variante accettata, in cui camice e guanti si tolgono insieme: si afferra il camice sul davanti con le mani guantate, lo si stacca dai lacci, lo si arrotola verso l'interno."),
 (11,"chiaro",0,"Arrivati ai polsi, si sfilano i guanti all'interno del camice stesso. L'importante non e' quale sequenza, ma che quella adottata dall'azienda sia sempre la stessa e addestrata."),

 (12,"chiaro",0,"La rimozione dei guanti, che e' una piccola tecnica a se'. Con la mano guantata si afferra il primo guanto all'esterno del polso e lo si sfila rovesciandolo. Lo si tiene nella mano ancora guantata."),
 (12,"chiaro",0,"Poi si infilano due dita nude sotto il secondo guanto, dall'interno del polso, che e' la parte pulita, e lo si sfila rovesciandolo sopra il primo, che resta chiuso dentro."),
 (12,"profondo",1.2,"[serious] Si ottiene un pacchetto chiuso, con l'esterno contaminato tutto dentro. Pelle con pelle, guanto con guanto: e' la frase da ricordare."),

 (13,"chiaro",0,"I punti in cui gli operatori si contaminano davvero, osservati negli studi di simulazione. Toccarsi il viso durante l'assistenza, o sistemarsi la mascherina con i guanti."),
 (13,"chiaro",0,"Toccare la parte anteriore della mascherina nel toglierla, invece degli elastici. Sfilare il camice dalla testa, invece di arrotolarlo. Scuotere i DPI, disperdendo quello che c'e' sopra."),
 (13,"chiaro",0,"Riutilizzare dispositivi monouso. Uscire dalla stanza con i guanti addosso, contaminando maniglie e corridoio. Sapere dove si sbaglia e' meta' della prevenzione."),

 (14,"chiaro",0,"Nelle situazioni ad alto rischio, epidemie, patogeni altamente trasmissibili, si usa la tecnica del buddy, o osservatore: un collega osserva la vestizione e la svestizione."),
 (14,"chiaro",0,"Legge la sequenza passo per passo, ad alta voce, e segnala gli errori prima che diventino contaminazioni. E' la logica del doppio controllo della lezione due punto sei: l'occhio esterno vede cio' che chi agisce non vede."),

 (15,"chiaro",0,"Lo smaltimento, che e' l'ultimo passo della svestizione. I DPI monouso contaminati sono rifiuti sanitari pericolosi a rischio infettivo, e vanno nel contenitore dedicato, non in un cestino qualunque."),
 (15,"chiaro",0,"Posizionato all'interno della stanza o immediatamente all'uscita, cosi' da non attraversare il reparto con materiale contaminato in mano. La classificazione dei rifiuti la vedremo nella lezione quattro punto sette."),

 (16,"chiaro",0,"Un caso tipico. Paziente con tubercolosi polmonare bacillifera: quali DPI, in che ordine, e dove togli il respiratore? Risposta: precauzioni per via aerea, stanza a pressione negativa con porta chiusa."),
 (16,"chiaro",0,"Vestizione: igiene delle mani, camice se previsto, respiratore FFP2, FFP3 per le procedure che generano aerosol, con fit check, guanti."),
 (16,"chiaro",0,"Svestizione: guanti, camice, igiene delle mani, uscita dalla stanza, chiusura della porta, e solo allora rimozione del respiratore dagli elastici, seguita da nuova igiene delle mani."),

 (17,"chiaro",0,"Nelle aziende del servizio sanitario veneto l'uso dei DPI e' regolato da procedure aziendali e rientra nella valutazione dei rischi del Servizio di Prevenzione e Protezione."),
 (17,"chiaro",0,"Che organizza la formazione e l'addestramento obbligatori e, per i respiratori, il fit test. All'orale collega sempre i DPI a due piani: la tutela del lavoratore, decreto ottantuno, e la prevenzione delle ICA."),

 (18,"chiaro",0,"Ricapitoliamo. Vestizione: igiene, camice, mascherina, occhiali, guanti per ultimi. Svestizione: guanti per primi, occhiali, camice arrotolato verso l'interno, mascherina, igiene delle mani. Si toccano solo lacci ed elastici."),
 (18,"chiaro",0,"[warm] Nella via aerea il respiratore si toglie fuori dalla stanza. La chirurgica protegge gli altri, il respiratore protegge te. Il fit check si fa a ogni vestizione. Prossima lezione: come si rendono sicuri gli strumenti."),
]

# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Che cosa sono i DPI",3:"Chirurgica e respiratore",4:"Le classi FFP",5:"La tenuta",
 6:"Guanti, camici, occhiali",7:"La scelta sul rischio",8:"La vestizione",9:"Il principio della svestizione",
 10:"La svestizione",11:"La variante",12:"I guanti",13:"I punti critici",14:"Il buddy",15:"Lo smaltimento",
 16:"Il caso d'esame",17:"In Veneto",18:"Chiusura"}
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
