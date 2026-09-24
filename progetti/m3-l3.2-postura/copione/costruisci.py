# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'immobilita' e' una delle poche condizioni che danneggiano tutti gli apparati contemporaneamente. Per l'esame questa lezione vale doppio, e per due ragioni diverse."),
 (1,"chiaro",0,"Le posizioni producono domande secche a risposta immediata. La sindrome da immobilizzazione e' una traccia classica della prova scritta, perche' mostra se il candidato sa ragionare per sistemi."),

 (2,"chiaro",0,"Le posizioni. Supina: riposo ed esami, ma attenzione al sacro e ai talloni, i due punti che pagano il peso. Prona: la pronazione nell'insufficienza respiratoria grave, come nell'ARDS."),
 (2,"chiaro",0,"Laterale di sicurezza: il paziente incosciente che respira spontaneamente, per prevenire l'inalazione. Sims, semiprona laterale: clistere ed esplorazione rettale."),
 (2,"chiaro",0,"Quattro posizioni, quattro motivi: il peso sul sacro, il polmone che si apre, la via aerea che resta libera, il retto che si raggiunge. Ricordare il motivo tiene insieme il nome."),

 (3,"chiaro",0,"Fowler, seduta a quarantacinque-sessanta gradi: dispnea, alimentazione, prevenzione dell'aspirazione, scompenso. Semi-Fowler, trenta-quarantacinque gradi: lo standard nel paziente ventilato e nel post-operatorio."),
 (3,"chiaro",0,"Ortopnoica, seduta con il tronco proteso in avanti su un tavolino: dispnea grave, edema polmonare, crisi asmatica. Trendelenburg: testa piu' in basso dei piedi. Anti-Trendelenburg: il contrario."),

 (4,"chiaro",0,"Se ricordi solo quattro cose di questa lezione, copri la maggior parte delle domande sulle posizioni. Dispnea: Fowler o ortopnoica. Clistere: Sims o fianco sinistro."),
 (4,"chiaro",0,"Incosciente che respira: laterale di sicurezza. Ventilato: semi-Fowler a trenta-quarantacinque gradi. Quattro coppie, quattro risposte gia' pronte, e nessuna richiede di ragionare durante il quiz."),

 (5,"chiaro",0,"E il perche' del clistere, che all'orale vale piu' della risposta secca. Si usa Sims o il fianco sinistro perche' segue l'anatomia del colon: il discendente e il sigma stanno a sinistra."),
 (5,"chiaro",0,"La posizione favorisce la progressione del liquido per gravita' e riduce i crampi. Quando puoi dare la ragione anatomica, dalla: distingue chi ha capito da chi ha memorizzato."),

 (6,"chiaro",0,"Passiamo al cuore della lezione. La sindrome da immobilizzazione e' l'insieme dei danni prodotti dall'immobilita' prolungata. Studiala per apparati: cosi' la risposta scritta esce ordinata e completa."),
 (6,"chiaro",0,"Otto sistemi, e li vediamo uno per uno. Cute, muscolo-scheletrico, cardiovascolare, respiratorio, gastrointestinale, urinario, metabolico, neuropsichico. Nessuno resta fuori, e ciascuno ha il suo posto nella traccia."),

 (7,"chiaro",0,"Cute: lesioni da pressione, macerazione, lesioni da frizione e scivolamento. Muscolo-scheletrico: ipotrofia e perdita di forza, rapidissima, gia' nella prima settimana."),
 (7,"chiaro",0,"Poi retrazioni tendinee, anchilosi articolare e osteoporosi da disuso, con possibile ipercalcemia da riassorbimento osseo. Il muscolo che non lavora si consuma, l'articolazione che non si muove si blocca."),

 (8,"chiaro",0,"E qui il dato che giustifica tutto il resto della lezione. La perdita di forza in un adulto allettato e' dell'ordine di alcuni punti percentuali al giorno, e nell'anziano il recupero e' molto piu' lento della perdita."),
 (8,"profondo",1.2,"[serious] La forza si perde in giorni e si recupera in settimane. Ecco perche' lo lascio a letto che e' piu' sicuro non e' una scelta prudente: e' una scelta che produce danno."),

 (9,"chiaro",0,"Cardiovascolare: ipotensione ortostatica, ridotta tolleranza allo sforzo, aumento del lavoro cardiaco, trombosi venosa profonda ed embolia polmonare. Il sangue che ristagna nelle gambe e' il primo problema."),
 (9,"chiaro",0,"Respiratorio: riduzione dell'espansione toracica, ristagno di secrezioni, atelettasia e polmonite ipostatica. Il polmone sdraiato ventila meno, si pulisce meno e si infetta piu' facilmente."),

 (10,"chiaro",0,"Gastrointestinale: riduzione della peristalsi, stipsi, fecaloma, calo dell'appetito. Urinario: ristagno vescicale, calcolosi, infezioni delle vie urinarie. L'intestino e la vescica fermi come il resto del corpo."),
 (10,"chiaro",0,"Metabolico: bilancio azotato negativo, sarcopenia, insulino-resistenza. Neuropsichico: delirium, disorientamento, depressione, alterazione del ritmo sonno-veglia, deprivazione sensoriale."),
 (10,"tenue",0,"Otto apparati, nessuno risparmiato. Se nella prova scritta li elenchi in quest'ordine, con due o tre effetti ciascuno, la risposta e' gia' completa prima ancora di parlare di interventi."),

 (11,"chiaro",0,"L'intervento con il miglior rapporto tra sforzo e beneficio di tutta l'assistenza di base: la mobilizzazione precoce. Si inizia appena le condizioni cliniche lo consentono, anche in terapia intensiva."),
 (11,"chiaro",0,"La progressione: seduto a letto, bordo letto, poltrona, stazione eretta, cammino assistito. E si valuta prima: parametri, dolore, vertigini, forza, dispositivi, ultima somministrazione di sedativi o antipertensivi."),
 (11,"chiaro",0,"Precoce non vuol dire imprudente. Prima di ogni passo si controlla che il precedente sia stato tollerato: chi sta bene seduto al bordo e' pronto per la poltrona, non ancora per il corridoio."),

 (12,"chiaro",0,"La regola dell'alzata: due tempi. Prima seduto al bordo del letto con i piedi a terra per qualche minuto, poi in piedi. Serve a prevenire l'ipotensione ortostatica, fra le prime cause di caduta alla prima alzata."),
 (12,"chiaro",0,"E si sospende e si rivaluta se compaiono vertigini, pallore, sudorazione, dispnea, dolore toracico, caduta pressoria o desaturazione. Fermarsi non e' un fallimento: e' parte della procedura."),

 (13,"chiaro",0,"I cambi posturali. Ogni due ore a letto e ogni ora in poltrona, adattando al rischio, alla superficie e alla tolleranza. Laterale a trenta gradi, non a novanta, per ridurre la pressione sul trocantere."),
 (13,"chiaro",0,"Talloni scaricati del tutto, sollevati dal piano con un cuscino sotto i polpacci: il materasso antidecubito non basta. E mai massaggiare le prominenze ossee arrossate: la frizione su cute sofferente aumenta il danno."),

 (14,"chiaro",0,"Tre forze diverse, da distinguere. La pressione schiaccia i tessuti contro il piano osseo. La frizione e' lo sfregamento della cute contro il lenzuolo quando trascini la persona."),
 (14,"chiaro",0,"Le forze di taglio nascono quando la cute resta ferma e i piani profondi scivolano: tipicamente nel paziente che scivola verso il fondo del letto in posizione semiseduta."),
 (14,"tenue",0,"[thoughtful] Conseguenza pratica, una sola: la persona si solleva, non si trascina. Ogni volta che senti il lenzuolo strusciare sotto la schiena, una delle tre forze sta lavorando contro la cute."),

 (15,"chiaro",0,"La trombosi venosa profonda nasce dalla triade di Virchow: stasi venosa, danno endoteliale, ipercoagulabilita'. Tre elementi, e ne basta uno per far partire il trombo; l'immobilita' ne porta con se' almeno due."),
 (15,"chiaro",0,"L'immobilita' agisce sul primo elemento, la stasi: ed e' per questo che il paziente allettato e' per definizione a rischio, anche senza altre malattie: basta il letto."),

 (16,"chiaro",0,"Le misure. Mobilizzazione precoce, il primo e piu' efficace intervento. Esercizi attivi: flesso-estensione delle caviglie, contrazioni del polpaccio, insegnabili anche a chi e' allettato."),
 (16,"chiaro",0,"Calze a compressione graduata, misurate e controllate per pieghe e arrotolamenti: una calza arrotolata diventa un laccio. Compressione pneumatica intermittente quando la profilassi farmacologica e' controindicata."),
 (16,"chiaro",0,"Profilassi farmacologica su prescrizione. E idratazione, perche' il sangue denso scorre peggio. Sei misure, e la prima resta sempre la stessa: far muovere la persona."),

 (17,"chiaro",0,"I segni: dolore, tensione, edema monolaterale del polpaccio, aumento della temperatura locale, arrossamento. Monolaterale e' la parola chiave: una gamba sola, diversa dall'altra."),
 (17,"profondo",1.2,"[serious] E la regola d'oro, che compare nei casi clinici: davanti al sospetto non si massaggia e non si mobilizza vigorosamente l'arto. Si avvisa il medico. La manovra puo' favorire l'embolizzazione."),
 (17,"chiaro",0,"Il segnale d'allarme dell'embolia polmonare e' la comparsa improvvisa di dispnea, dolore toracico, tachicardia e desaturazione. Improvvisa: un minuto prima stava bene."),

 (18,"chiaro",0,"Gli ausili. Telo ad alto scorrimento: sposta senza trascinare, e protegge la tua schiena. Sollevatore: due operatori e imbragatura della misura corretta. Disco girevole per i trasferimenti con collaborazione parziale."),
 (18,"chiaro",0,"Deambulatore, regolato all'altezza dei polsi a braccia distese. Archetto alzacoperte, che solleva le coperte dai piedi e previene l'equinismo e la pressione sulle dita."),
 (18,"chiaro",0,"E il bastone: si impugna dal lato opposto all'arto compromesso e avanza insieme all'arto malato. Molti sbagliano per istinto, perche' verrebbe da metterlo dal lato dolente."),

 (19,"chiaro",0,"Chiudiamo con l'ergonomia. La movimentazione manuale dei pazienti e' un rischio professionale disciplinato dal Titolo sesto del decreto legislativo ottantuno del duemilaotto."),
 (19,"chiaro",0,"Il datore di lavoro valuta il rischio, fornisce ausili, forma e addestra, garantisce la sorveglianza sanitaria. I principi: valutare prima, cioe' peso, collaborazione, dispositivi, spazio, numero di operatori."),
 (19,"chiaro",0,"Pianificare e comunicare, con un solo operatore che guida e da' il tempo. Avvicinare il carico. Base d'appoggio ampia. Flettere le ginocchia, non la schiena: la forza viene dalle gambe."),
 (19,"chiaro",0,"Non ruotare il tronco sotto carico: si spostano i piedi. Usare il peso del corpo, non la forza delle braccia. E usare gli ausili, che non sono un ripiego ma lo standard di lavoro atteso."),
 (19,"chiaro",0,"[warm] La schiena dell'operatore e' uno strumento di lavoro, e si protegge con il metodo, non con la forza. Nella prossima lezione: nutrizione, malnutrizione e disfagia. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Le posizioni, prima parte",3:"Le posizioni, seconda parte",
 4:"Le quattro associazioni",5:"Il clistere a sinistra",6:"La sindrome da immobilizzazione",
 7:"Cute e muscolo-scheletrico",8:"Il dato che colpisce",9:"Cardiovascolare e respiratorio",
 10:"Gli altri quattro apparati",11:"La mobilizzazione precoce",12:"L'alzata in due tempi",
 13:"I cambi posturali",14:"Pressione, frizione, taglio",15:"La triade di Virchow",
 16:"La prevenzione della TVP",17:"Sospetto di TVP",18:"Gli ausili",19:"Ergonomia e chiusura"}
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
