# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La trasfusione e' una delle terapie piu' sicure, quando la procedura e' rispettata, e una delle piu' pericolose, quando non lo e'."),
 (1,"chiaro",0,"La reazione da incompatibilita' AB zero e' un evento sentinella, oggetto della Raccomandazione ministeriale numero cinque, e nasce quasi sempre da un errore di identificazione: del paziente, del campione, della sacca."),
 (1,"chiaro",0,"Questa lezione e' costruita intorno a una regola: ogni passaggio di identificazione si fa al letto del paziente."),

 (2,"chiaro",0,"Le basi. Il sistema AB zero distingue i gruppi A, B, AB e zero; il fattore Rh distingue positivo e negativo."),
 (2,"chiaro",0,"Per le emazie, il donatore universale e' zero Rh negativo, perche' i suoi globuli rossi non hanno antigeni A, B ne' D; il ricevente universale e' AB Rh positivo."),
 (2,"chiaro",0,"Per il plasma vale il contrario: il donatore universale e' AB, perche' il suo plasma non contiene anticorpi anti-A ne' anti-B. Questa inversione e' una domanda classica."),

 (3,"chiaro",0,"Gli emocomponenti. Emazie concentrate, per l'anemia: nell'adulto un'unita' aumenta l'emoglobina di circa un grammo per decilitro. Piastrine, per la piastrinopenia con sanguinamento o rischio."),
 (3,"chiaro",0,"Plasma fresco congelato, per i deficit dei fattori della coagulazione. Crioprecipitato, ricco di fibrinogeno."),
 (3,"chiaro",0,"E una distinzione: i plasmaderivati, albumina, immunoglobuline, concentrati di fattori, sono prodotti industriali e si gestiscono come farmaci."),

 (4,"chiaro",0,"La conservazione, dove nascono errori silenziosi. Le emazie stanno in frigoemoteca, fra due e sei gradi. Le piastrine a temperatura ambiente, venti-ventiquattro gradi, in agitazione continua: mai in frigorifero, che le danneggia."),
 (4,"chiaro",0,"Il plasma e' congelato e si scongela subito prima dell'uso. In reparto non si conservano emocomponenti: non nel frigorifero dei farmaci, non vicino a fonti di calore."),

 (5,"chiaro",0,"Il quadro normativo: la legge duecentodiciannove del duemilacinque sulle attivita' trasfusionali, e il decreto legislativo duecentosessantuno del duemilasette."),
 (5,"chiaro",0,"Il decreto ministeriale del due novembre duemilaquindici sui requisiti di qualita' e sicurezza, e la Raccomandazione numero cinque. La trasfusione richiede un consenso informato specifico."),
 (5,"chiaro",0,"E il rifiuto della persona capace, pensiamo ai Testimoni di Geova, va rispettato, come stabilisce la legge duecentodiciannove del duemiladiciassette: si documenta, si informa il medico, e si valutano le alternative."),

 (6,"chiaro",0,"La richiesta e' compilata e firmata dal medico. Il prelievo per i test pre-trasfusionali e' il primo punto critico. Identificazione attiva del paziente al letto: nome, cognome, data di nascita detti da lui."),
 (6,"chiaro",0,"Etichettatura della provetta al letto, davanti al paziente, mai prima, mai dopo in infermeria; firma di chi ha prelevato."),
 (6,"chiaro",0,"E per la determinazione del gruppo la normativa richiede due campioni prelevati in momenti diversi, cosi' che un errore su uno dei due venga intercettato dal confronto."),

 (7,"chiaro",0,"Al ritiro della sacca si verificano: integrita', aspetto del contenuto, niente coaguli, niente colore anomalo, scadenza, etichetta di compatibilita' e corrispondenza con il paziente."),
 (7,"chiaro",0,"E la trasfusione va iniziata entro i tempi previsti dalla procedura dopo l'uscita della sacca dal servizio trasfusionale, perche' un'unita' di emazie fuori dal frigorifero non puo' restarci a lungo."),

 (8,"chiaro",0,"Il momento cruciale: il doppio controllo al letto del paziente, eseguito da due operatori secondo la procedura aziendale. Non in infermeria, non al bancone: al letto."),
 (8,"chiaro",0,"Si esegue l'identificazione attiva, si controlla il braccialetto, e si confrontano i dati del paziente con la richiesta, con l'etichetta di assegnazione e con l'etichetta della sacca: gruppo, Rh, numero dell'unita', scadenza."),
 (8,"profondo",1.2,"[serious] Entrambi gli operatori firmano. Le reazioni AB zero nascono quasi tutte da un controllo fatto lontano dal paziente."),

 (9,"chiaro",0,"Il materiale. Un deflussore specifico con filtro, da centosettanta-duecento micron, che trattiene microaggregati e coaguli. Un accesso venoso adeguato."),
 (9,"chiaro",0,"E la regola della compatibilita': con il sangue va solo la fisiologica allo zero virgola nove per cento. Mai la glucosata, che provoca emolisi; mai il Ringer, il cui calcio fa coagulare la linea; mai farmaci in linea."),

 (10,"chiaro",0,"L'avvio. Si rilevano i parametri vitali prima di iniziare. I primi quindici minuti si infonde lentamente, con l'infermiere presente o nelle immediate vicinanze."),
 (10,"chiaro",0,"Perche' le reazioni piu' gravi compaiono proprio nei primi minuti e con piccoli volumi. Dopo quindici minuti si rilevano di nuovo i parametri, poi secondo procedura e alla fine."),
 (10,"chiaro",0,"Un'unita' di emazie si completa entro quattro ore dall'uscita dalla conservazione; piastrine e plasma si infondono subito e piu' rapidamente."),

 (11,"chiaro",0,"Le reazioni acute. La piu' grave e' la emolitica acuta da incompatibilita' AB zero: febbre, brividi, dolore lombare o toracico, ipotensione, urine scure, e spesso un senso di morte imminente riferito dalla persona."),
 (11,"chiaro",0,"Poi la febbrile non emolitica, la piu' frequente e benigna. L'allergica, dall'orticaria fino all'anafilassi. Il TACO, sovraccarico circolatorio, nell'anziano e nel cardiopatico."),
 (11,"chiaro",0,"Il TRALI, danno polmonare acuto con insufficienza respiratoria entro sei ore. E la contaminazione batterica, con quadro settico."),

 (12,"chiaro",0,"Davanti a una sospetta reazione, la sequenza. Uno: fermare subito la trasfusione. Due: mantenere l'accesso venoso con fisiologica, collegata con un deflussore nuovo, per non infondere altro sangue rimasto nella linea."),
 (12,"chiaro",0,"Tre: parametri vitali. Quattro: avvisare il medico. Cinque: ricontrollare l'identita' del paziente e i dati della sacca, per scoprire subito un eventuale errore."),
 (12,"chiaro",0,"E verificare che lo stesso errore non abbia coinvolto un altro paziente. Sei: inviare sacca, deflussore e campioni al trasfusionale, senza buttare nulla. Sette: le urine. Otto: documentare e segnalare all'emovigilanza."),

 (13,"chiaro",0,"Le reazioni tardive, che compaiono giorni o mesi dopo: emolisi ritardata, infezioni trasmesse, oggi molto rare grazie ai test, alloimmunizzazione."),
 (13,"chiaro",0,"Sovraccarico di ferro nei pazienti politrasfusi, e la rara malattia del trapianto contro l'ospite, prevenuta con l'irradiazione degli emocomponenti nei pazienti a rischio."),

 (14,"chiaro",0,"La tracciabilita'. In cartella si registrano il numero dell'unita', gli orari di inizio e fine, i parametri, eventuali reazioni e gli operatori."),
 (14,"chiaro",0,"Al trasfusionale si restituisce l'attestazione di avvenuta trasfusione, che chiude il circuito: ogni unita' di sangue e' tracciata dal donatore al ricevente. Le reazioni confluiscono nel sistema nazionale di emovigilanza."),

 (15,"chiaro",0,"Una regola organizzativa nata dagli errori reali: non si ritirano ne' si preparano contemporaneamente sacche destinate a pazienti diversi."),
 (15,"chiaro",0,"Un paziente, una sacca, un doppio controllo alla volta. Gli scambi di sacca avvengono quasi sempre quando due trasfusioni sono state gestite insieme."),

 (16,"chiaro",0,"Il caso. Dopo dieci minuti dall'inizio della trasfusione il paziente riferisce dolore lombare, e' agitato, ha brividi, pressione ottantacinque su cinquanta. Che cosa pensi? Reazione emolitica acuta, probabile AB zero."),
 (16,"chiaro",0,"Che cosa fai? La sequenza: fermi subito, mantieni l'accesso con fisiologica e deflussore nuovo, parametri, chiami il medico, ricontrolli identita' e sacca, invii tutto al trasfusionale, raccogli le urine, documenti e segnali."),
 (16,"chiaro",0,"E verifichi che non ci sia un altro paziente che sta ricevendo la sacca destinata a questo: e' un'emergenza, e puo' essere doppia."),

 (17,"chiaro",0,"In Veneto i servizi trasfusionali aziendali operano in un coordinamento regionale delle attivita' trasfusionali. Ogni azienda ha una procedura sulla sicurezza trasfusionale che definisce chi esegue il doppio controllo e come."),
 (17,"chiaro",0,"In alcune realta' si usano sistemi elettronici di identificazione al letto, con braccialetto e lettura ottica. All'orale, la frase chiave e': doppio controllo al letto del paziente."),

 (18,"chiaro",0,"La tabella da fotografare. Emazie a due-sei gradi, completate entro quattro ore. Piastrine a venti-ventiquattro gradi in agitazione, mai in frigo. Plasma scongelato al momento."),
 (18,"chiaro",0,"Solo fisiologica, filtro, primi quindici minuti lenti e sorvegliati. Donatore universale di emazie zero negativo; di plasma AB."),

 (19,"chiaro",0,"Ricapitoliamo con la regola che tiene insieme tutta la lezione: ogni identificazione si fa al letto del paziente. Provetta etichettata davanti al paziente. Due campioni per il gruppo. Doppio controllo al letto."),
 (19,"chiaro",0,"[warm] E davanti a una reazione: fermare, mantenere l'accesso, ricontrollare, inviare tutto al trasfusionale. Nella prossima lezione: i prelievi e la fase preanalitica. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"I gruppi sanguigni",3:"Gli emocomponenti",4:"La conservazione",5:"La normativa e il consenso",
 6:"La richiesta e il prelievo",7:"Il ritiro della sacca",8:"Il doppio controllo al letto",9:"Il materiale",10:"L'avvio e la sorveglianza",
 11:"Le reazioni acute",12:"Che cosa fare",13:"Le reazioni tardive",14:"La tracciabilita'",15:"Due sacche, due pazienti",16:"Il caso",17:"In Veneto",18:"La tabella",19:"Chiusura"}

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
