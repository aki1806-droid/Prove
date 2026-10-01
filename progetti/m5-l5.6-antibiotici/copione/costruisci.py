# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Tre famiglie di farmaci, e la terza porta con se' una normativa specifica che i concorsi chiedono con precisione: la gestione degli stupefacenti in reparto."),
 (1,"chiaro",0,"Partiamo dagli antibiotici, ripresi dal punto di vista della somministrazione: l'antibiotico-resistenza l'abbiamo vista nella lezione quattro punto sei."),

 (2,"chiaro",0,"Un concetto che spiega perche' l'orario conta. Gli antibiotici tempo-dipendenti, i beta-lattamici: penicilline, cefalosporine, carbapenemi, funzionano in base al tempo in cui la concentrazione resta sopra la soglia efficace."),
 (2,"chiaro",0,"Per questi rispettare gli intervalli e' essenziale, e talvolta si prescrive l'infusione prolungata. I concentrazione-dipendenti, come gli aminoglicosidi, funzionano in base al picco: spesso in dose unica giornaliera."),

 (3,"chiaro",0,"Le classi da conoscere per cio' che l'infermiere sorveglia. Aminoglicosidi, gentamicina e amikacina: nefrotossicita' e ototossicita', con monitoraggio dei livelli."),
 (3,"chiaro",0,"Vancomicina: nefrotossicita', monitoraggio dei livelli, e la sindrome dell'uomo rosso: arrossamento di viso e tronco, prurito, ipotensione, se l'infusione e' troppo rapida."),
 (3,"chiaro",0,"Non e' un'allergia: si previene rallentando l'infusione, in genere almeno un'ora. Fluorochinoloni: tendinopatie e allungamento del QT. Macrolidi: QT e interazioni. Metronidazolo: effetto antabuse con l'alcol."),

 (4,"chiaro",0,"L'allergia. Prima della prima dose di qualunque antibiotico si chiede sempre delle allergie, e la risposta si registra in modo evidente. Dopo la prima dose la persona si osserva."),
 (4,"chiaro",0,"I segni dell'anafilassi: orticaria, angioedema, broncospasmo, ipotensione. Il farmaco di primo intervento e' l'adrenalina per via intramuscolare: non endovena, non sottocute."),
 (4,"chiaro",0,"Nell'adulto zero virgola cinque milligrammi, cioe' mezzo millilitro della fiala da un milligrammo per millilitro, nella faccia anterolaterale della coscia, ripetibile dopo cinque minuti. Lo riprenderemo nel modulo dieci."),

 (5,"chiaro",0,"Gli analgesici, partendo dal piu' usato: il paracetamolo. Nell'adulto la dose massima indicativa e' di quattro grammi al giorno, da ridurre nell'epatopatia, nell'alcolismo e nel basso peso, sotto i cinquanta chili."),
 (5,"chiaro",0,"Dove per via endovenosa la dose si calcola sul peso. La sua tossicita' e' epatica. E una trappola frequente: molti farmaci da banco e molte associazioni contengono paracetamolo."),
 (5,"chiaro",0,"Quindi la dose giornaliera si somma senza che nessuno se ne accorga. Nella ricognizione della terapia, va chiesto."),

 (6,"chiaro",0,"I FANS, antinfiammatori non steroidei. Efficaci, ma con molti effetti avversi: gastrolesivita', che richiede gastroprotezione nei soggetti a rischio; nefrotossicita', soprattutto nel disidratato."),
 (6,"chiaro",0,"Ritenzione idrica, che peggiora lo scompenso; aumento del rischio di sanguinamento, pericoloso nell'anticoagulato; rischio cardiovascolare. Nell'anziano vanno usati con molta cautela."),

 (7,"chiaro",0,"Gli oppioidi. Deboli, come codeina e tramadolo; il tramadolo ha anche un'azione serotoninergica e abbassa la soglia convulsiva. Forti, come morfina, ossicodone, fentanil, idromorfone, metadone."),
 (7,"chiaro",0,"Gli effetti avversi da conoscere: sedazione, depressione respiratoria, stipsi, a cui, ricordi, non si sviluppa tolleranza, nausea, prurito, ritenzione urinaria, miosi, cioe' pupille puntiformi."),

 (8,"chiaro",0,"La depressione respiratoria e' l'effetto piu' temuto, e il principio di sorveglianza e' quello gia' visto con la PCA nella lezione tre punto sette: la sedazione compare prima."),
 (8,"profondo",1.2,"[serious] Una persona sempre piu' sonnolenta e' una persona che, se non intercettata, rallentera' il respiro. Si sorvegliano livello di sedazione, frequenza respiratoria e saturazione."),
 (8,"chiaro",0,"Con attenzione a chi e' piu' a rischio: anziano, prima dose, insufficienza renale, e soprattutto l'associazione con benzodiazepine o altri sedativi."),

 (9,"chiaro",0,"L'antidoto e' il naloxone, antagonista dei recettori degli oppioidi. Una caratteristica da sapere: ha un'emivita breve, spesso piu' breve dell'oppioide che deve contrastare."),
 (9,"chiaro",0,"Quindi dopo il risveglio la persona puo' tornare a sedarsi: la sorveglianza deve proseguire, e possono servire dosi ripetute."),
 (9,"chiaro",0,"Nel paziente con dolore si titola, cioe' si somministra a piccole dosi, per ripristinare il respiro senza annullare del tutto l'analgesia e scatenare un dolore violento."),

 (10,"chiaro",0,"Tre concetti clinici. La titolazione: la dose si aumenta progressivamente fino al controllo del dolore. La dose di soccorso, per il dolore episodico intenso, prescritta accanto alla terapia di base."),
 (10,"chiaro",0,"E le conversioni: la morfina orale e' meno biodisponibile di quella endovenosa, il primo passaggio della lezione cinque punto uno: circa due-tre a uno. Cambiare via o oppioide richiede tabelle di conversione e prescrizione."),

 (11,"chiaro",0,"Passiamo alla normativa. Il riferimento e' il DPR trecentonove del millenovecentonovanta, il Testo unico sugli stupefacenti, che classifica le sostanze in tabelle e disciplina prescrizione, detenzione e registrazione."),
 (11,"chiaro",0,"La legge trentotto del duemiladieci, sulla terapia del dolore, ha introdotto semplificazioni per i farmaci oppioidi usati nel dolore, per favorirne l'accesso."),

 (12,"chiaro",0,"In reparto gli stupefacenti si gestiscono con il registro di carico e scarico. E' un registro a pagine numerate, vidimato dal Direttore Sanitario, con una sezione per ciascun farmaco."),
 (12,"chiaro",0,"Ogni carico, cioe' ogni fornitura dalla farmacia, e ogni scarico, cioe' ogni somministrazione, si registra con data, paziente, quantita' e firma."),
 (12,"chiaro",0,"Il registro e' tenuto dal responsabile dell'assistenza infermieristica; il direttore dell'unita' operativa risponde della corrispondenza fra giacenza contabile e reale. Si conserva due anni dall'ultima registrazione."),

 (13,"chiaro",0,"Le regole di compilazione riprendono la lezione due punto quattro, con ancora piu' rigore. La registrazione e' contestuale alla somministrazione. Niente correttore ne' cancellature: si corregge con una riga e una firma."),
 (13,"chiaro",0,"La giacenza deve essere verificabile in ogni momento, e ogni discrepanza va spiegata."),
 (13,"chiaro",0,"Se si usa solo una parte di una fiala, il residuo si smaltisce e si documenta secondo la procedura aziendale, spesso alla presenza di un testimone. Rotture e smarrimenti si annotano e si segnalano."),

 (14,"chiaro",0,"La custodia. Gli stupefacenti si conservano in un armadio o in una cassaforte dedicata, chiusa a chiave, e le chiavi sono custodite dall'infermiere responsabile del turno."),
 (14,"chiaro",0,"Con un passaggio esplicito alla consegna, in molti reparti con verifica della giacenza al cambio turno. I farmaci scaduti si tengono separati e identificati, e tornano alla farmacia secondo la procedura: non si buttano."),

 (15,"chiaro",0,"Un richiamo alla responsabilita', perche' in questo ambito un errore di registrazione non e' un errore formale. Una discrepanza fra giacenza contabile e reale ha rilevanza disciplinare e puo' averne una penale."),
 (15,"profondo",1.2,"[serious] Chi firma lo scarico attesta di aver somministrato quella quantita' a quel paziente. Per questo, come in tutta la documentazione, mai firmare per un collega."),

 (16,"chiaro",0,"Un aspetto etico che all'orale distingue. Una persona con una storia di dipendenza ha diritto a un trattamento efficace del dolore come chiunque altro. Puo' avere una tolleranza e richiedere dosi piu' alte."),
 (16,"chiaro",0,"E richieste frequenti di analgesico possono essere il segno di un dolore non controllato, la pseudodipendenza, piu' che di una ricerca della sostanza. Il pregiudizio porta al sottotrattamento, anch'esso un errore."),

 (17,"chiaro",0,"Il caso. Paziente anziano in terapia con morfina, da un'ora sempre piu' sonnolento, frequenza respiratoria nove, saturazione novanta. Che cosa fai? E' una depressione respiratoria da oppioide in evoluzione."),
 (17,"chiaro",0,"Stimoli la persona e valuti la risposta, sospendi l'infusione o la PCA se presente, ossigeno secondo protocollo, avvisi subito il medico con SBAR, prepari il naloxone."),
 (17,"chiaro",0,"E sorvegli a lungo anche dopo la risposta, perche' il naloxone dura meno della morfina. Poi documenti e ti chiedi se c'erano fattori predisponenti: funzione renale, benzodiazepine associate."),

 (18,"chiaro",0,"Nelle aziende del SSSR veneto la gestione degli stupefacenti e' regolata da procedure aziendali che recepiscono il DPR trecentonove, e in alcune realta' si usano armadi informatizzati che tracciano ogni prelievo."),
 (18,"chiaro",0,"La rete regionale di terapia del dolore e cure palliative attua la legge trentotto, con la rilevazione del dolore in cartella. All'orale: normativa, registro, custodia, responsabilita', in quest'ordine."),

 (19,"chiaro",0,"La sintesi in una slide. Beta-lattamici: intervalli rispettati. Aminoglicosidi e vancomicina: livelli e reni. Vancomicina lenta. Anafilassi: adrenalina intramuscolo, mezzo milligrammo."),
 (19,"chiaro",0,"Paracetamolo al massimo quattro grammi, meno se il fegato e' fragile. FANS: stomaco, reni, sanguinamento. Oppioidi: la sedazione precede la depressione respiratoria, e il naloxone dura meno."),

 (20,"chiaro",0,"E per gli stupefacenti: DPR trecentonove del novanta; registro vidimato a pagine numerate; registrazione contestuale; armadio chiuso a chiave; corrispondenza fra giacenza contabile e reale; registro conservato per due anni."),
 (20,"chiaro",0,"[warm] Nella prossima lezione: preparazione, stabilita' e conservazione dei farmaci, fino agli antiblastici e al carrello delle emergenze. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Tempo e concentrazione",3:"Le classi da sorvegliare",4:"L'allergia",5:"Il paracetamolo",
 6:"I FANS",7:"Gli oppioidi",8:"La depressione respiratoria",9:"Il naloxone",10:"Titolazione e conversioni",
 11:"La normativa",12:"Il registro",13:"Le regole di compilazione",14:"La custodia",15:"La responsabilita'",
 16:"Il dolore nella dipendenza",17:"Il caso",18:"In Veneto",19:"La tabella",20:"Chiusura"}

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
