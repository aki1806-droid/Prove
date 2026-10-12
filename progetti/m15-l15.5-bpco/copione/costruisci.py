# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo caso mette alla prova un'idea sbagliata e molto diffusa: che una saturazione alta sia sempre una buona notizia. Una paziente con BPCO riceve molto ossigeno, per stare tranquilli."),
 (1,"chiaro",0,"E diventa sempre piu' sonnolenta. Serviranno l'ossigenoterapia della lezione otto punto due, l'emogas della sei punto quattro, la ventilazione non invasiva e la fisiologia del respiro della quattordici punto tre."),

 (2,"chiaro",0,"Lo scenario. La signora Lucia, settantaquattro anni, ha una BPCO grave, e a casa usa l'ossigeno a un litro al minuto. Arriva in pneumologia alle quattordici dal pronto soccorso, per una riacutizzazione."),
 (2,"chiaro",0,"Ha una maschera con reservoir a quindici litri, perche' in pronto soccorso saturava ottantaquattro. Alle diciassette la saturazione e' novantanove, la frequenza respiratoria dodici."),
 (2,"chiaro",0,"[curious] E' molto sonnolenta, risponde solo se chiamata a voce alta. Cute calda e arrossata, un tremore delle mani. In mattinata riferiva cefalea. Perche' una saturazione di novantanove dovrebbe preoccuparti?"),

 (3,"chiaro",0,"Il ragionamento. La signora e' a rischio di ipercapnia: BPCO grave, ossigeno a domicilio. Da ore riceve ossigeno ad alta concentrazione, e satura novantanove, molto oltre il suo target, fra ottantotto e novantadue."),
 (3,"chiaro",0,"E presenta i segni dell'ipercapnia: sonnolenza, cefalea, vasodilatazione con la cute calda, tremore delle mani, e una frequenza respiratoria che si riduce, invece di aumentare."),
 (3,"chiaro",0,"[thoughtful] Il sospetto e' una narcosi da anidride carbonica iniziale. E il punto chiave: la saturazione non misura la CO2. Una saturazione perfetta puo' accompagnare un'acidosi grave."),

 (4,"chiaro",0,"Le prime azioni. Avvisi il medico con urgenza, con lo SBAR. Stimoli la paziente e valuti la GCS, per capire quanto e' compromessa la coscienza."),
 (4,"chiaro",0,"Non sospendi bruscamente l'ossigeno: toglierlo del tutto, in un paziente che ne ha accumulato molto, puo' provocare un'ipossiemia di rimbalzo pericolosa."),
 (4,"chiaro",0,"Lo titoli invece secondo prescrizione: per esempio con una maschera di Venturi al ventiquattro-ventotto per cento, con target fra ottantotto e novantadue."),
 (4,"chiaro",0,"Posizione semiseduta. Monitoraggio continuo di saturazione e frequenza respiratoria. E prepari l'emogas e la ventilazione non invasiva."),

 (5,"chiaro",0,"L'emogas. pH sette virgola ventiquattro, PaCO2 ottantadue, PaO2 centodiciotto, bicarbonato trentaquattro. Lo leggiamo con i quattro passi della lezione sei punto quattro."),
 (5,"chiaro",0,"Uno: pH sotto sette virgola trentacinque, acidemia. Due: CO2 alta, origine respiratoria. Tre: bicarbonato alto, un compenso renale, che richiede giorni, e quindi indica una condizione cronica."),
 (5,"chiaro",0,"Quattro: il pH e' ancora acido, il compenso e' parziale. Conclusione: un'acidosi respiratoria acuta su cronica, con un'iperossia: una PaO2 di centodiciotto, in una paziente che ne avrebbe bisogno molto meno."),

 (6,"chiaro",0,"Perche' l'ossigeno ha fatto salire la CO2? Per piu' meccanismi insieme, visti nella quattordici punto tre: peggiora il rapporto fra ventilazione e perfusione, c'e' l'effetto Haldane e, in parte, cala lo stimolo respiratorio."),
 (6,"chiaro",0,"La conclusione pratica e' quella della lezione otto punto due: nel paziente a rischio di ipercapnia l'ossigeno si somministra con una prescrizione, un target e una titolazione. Piu' non e' meglio."),

 (7,"chiaro",0,"La ventilazione non invasiva. L'indicazione e' proprio questa: riacutizzazione di BPCO con acidosi respiratoria, pH sotto sette virgola trentacinque e CO2 sopra quarantacinque."),
 (7,"chiaro",0,"Si avvia su prescrizione, con l'ossigeno titolato. L'assistenza e' quella della otto punto due: spiegare e rassicurare, anche se la paziente e' sonnolenta, e un'interfaccia della misura giusta."),
 (7,"chiaro",0,"Protezione del dorso del naso. Controllo delle perdite e della distensione gastrica. Monitoraggio di frequenza, saturazione e coscienza. Ed emogas di controllo dopo una-due ore."),

 (8,"chiaro",0,"La terapia associata, tutta su prescrizione. Broncodilatatori per aerosol, con un dettaglio che fa la differenza: nel paziente ipercapnico l'aerosol si nebulizza con aria compressa, non con ossigeno ad alto flusso."),
 (8,"chiaro",0,"L'ossigeno si mantiene con gli occhialini, secondo il target. Altrimenti, per i minuti della nebulizzazione, si torna all'eccesso. Poi corticosteroidi, e antibiotico se indicato, per esempio con espettorato purulento."),

 (9,"chiaro",0,"L'evoluzione. Dopo due ore di ventilazione: pH sette virgola trentuno, CO2 sessantotto, PaO2 sessantaquattro, saturazione novanta. La signora e' piu' sveglia, e risponde in modo appropriato."),
 (9,"chiaro",0,"E' un miglioramento, e si prosegue. I segni di fallimento, da segnalare subito, sarebbero stati: un pH che peggiora, una coscienza che cala, fatica respiratoria, intolleranza alla maschera."),
 (9,"chiaro",0,"In quel caso si valuta l'intubazione, nel rispetto delle volonta' della persona. In una BPCO grave, la pianificazione condivisa delle cure della legge duecentodiciannove va affrontata prima della crisi."),

 (10,"chiaro",0,"Prima della dimissione, gli inalatori. Molte riacutizzazioni nascono da una tecnica sbagliata: la si fa eseguire. Spray predosato: meglio con il distanziatore, espirare prima, inspirare lentamente, trattenere il respiro."),
 (10,"chiaro",0,"Con le polveri secche, un'inspirazione rapida e profonda. Risciacquare la bocca dopo i corticosteroidi. E distinguere i farmaci di mantenimento, da prendere ogni giorno, da quelli al bisogno."),

 (11,"chiaro",0,"L'ossigeno a domicilio. Flusso e ore sono prescritti, e la signora non deve aumentarlo da sola quando si sente peggio: e' proprio cio' che, in grande, e' successo in ospedale. Niente fumo, ne' fiamme."),
 (11,"chiaro",0,"Poi un piano d'azione: riconoscere i segni di riacutizzazione, cioe' piu' dispnea, piu' espettorato, un cambiamento del colore, e sapere chi chiamare. Smettere di fumare, e le vaccinazioni raccomandate."),
 (11,"chiaro",0,"La riabilitazione respiratoria. E la presa in carico sul territorio, con il PDTA, l'infermiere di famiglia e comunita' e, se disponibile, il telemonitoraggio."),

 (12,"tenue",0,"Gli errori. Dire: satura novantanove, sta bene. La maschera con reservoir per sicurezza, in un paziente ipercapnico. Sospendere di colpo l'ossigeno."),
 (12,"tenue",0,"L'aerosol con ossigeno ad alto flusso. Leggere la sonnolenza come se finalmente riposasse. E dimettere senza verificare la tecnica inalatoria."),

 (13,"chiaro",0,"E un tema organizzativo. La prescrizione di ossigeno, con il suo target, deve seguire la paziente dal pronto soccorso al reparto. E le consegne devono contenere target, dispositivo, flusso ed emogas."),
 (13,"chiaro",0,"Un paziente che arriva con quindici litri senza indicazioni e' un problema di comunicazione fra setting. Si segnala, in un'ottica no blame, per migliorare il percorso."),

 (14,"chiaro",0,"Che cosa significa vivere con la BPCO. La dispnea cronica e l'ansia si alimentano a vicenda: piu' manca il respiro, piu' cresce l'ansia, e l'ansia peggiora il respiro."),
 (14,"chiaro",0,"Alcune tecniche aiutano. La respirazione a labbra socchiuse, con un'espirazione lenta che tiene aperte le vie aeree. Le posizioni che facilitano il respiro: seduti, busto in avanti, braccia appoggiate."),
 (14,"chiaro",0,"La conservazione dell'energia nelle attivita' quotidiane. E la nutrizione: molte persone con BPCO grave sono malnutrite, e beneficiano di pasti piccoli e frequenti."),
 (14,"chiaro",0,"Poi l'isolamento sociale e il supporto psicologico. E, nelle fasi avanzate, le cure palliative, anche per controllare la dispnea."),

 (15,"chiaro",0,"Le domande d'orale. Prima: quando si usa la maschera di Venturi? Quando serve una concentrazione di ossigeno precisa e costante, tipicamente nel rischio di ipercapnia, con target fra ottantotto e novantadue."),
 (15,"chiaro",0,"Seconda: come si legge un emogas? In quattro passi. Il pH, per l'acidemia o l'alcalemia. CO2 e bicarbonato, per l'origine respiratoria o metabolica. Il valore opposto, per il compenso. E l'ossigenazione."),
 (15,"chiaro",0,"Terza: gli aspetti assistenziali della NIV? Spiegazione e rassicurazione, la scelta dell'interfaccia, la protezione della cute del naso, il controllo delle perdite e della distensione gastrica."),
 (15,"chiaro",0,"E il monitoraggio di frequenza respiratoria, saturazione, coscienza ed emogas, con il riconoscimento dei segni di fallimento."),

 (16,"chiaro",0,"La risposta modello. BPCO grave a rischio di ipercapnia, ossigeno ad alta concentrazione, saturazione novantanove, sonnolenza ingravescente, cefalea, cute calda, respiro che rallenta: ipercapnia da eccesso di ossigeno."),
 (16,"chiaro",0,"Priorita': ossigenazione al target ottantotto-novantadue e acidosi respiratoria. Avviso il medico con urgenza, stimolo la paziente, valuto la coscienza. Non sospendo l'ossigeno: lo titolo con la Venturi, secondo prescrizione."),
 (16,"chiaro",0,"Semiseduta, monitoraggio continuo. Collaboro a emogas e NIV, curando interfaccia, cute, perdite e distensione gastrica; aerosol con aria compressa. Rivaluto dopo una-due ore. Documento, ed educo prima della dimissione."),

 (17,"chiaro",0,"Collegamenti: emogas, sei punto quattro. Ossigeno, NIV e aerosol, otto punto due. Ventilazione, dieci punto cinque. Respiro, quattordici punto tre. Cronicita', undici punto sei. Legge duecentodiciannove, uno punto sei."),

 (18,"profondo",1.2,"[serious] La frase del caso: una saturazione perfetta non e' un paziente perfetto. Guarda la persona, conta la frequenza respiratoria, ascolta che cosa ti dice la sua coscienza."),

 (19,"chiaro",0,"[warm] Nella prossima lezione: un paziente con scompenso che, alle due di notte, va in edema polmonare acuto, e che poi dobbiamo riportare a casa in modo che non ritorni dopo un mese. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le prime azioni",5:"L'emogas",
 6:"Perche' l'ossigeno ha peggiorato la CO2",7:"La NIV",8:"La terapia associata",9:"L'evoluzione",
 10:"Prima della dimissione: gli inalatori",11:"L'ossigeno a domicilio e il piano d'azione",12:"Gli errori da evitare",
 13:"La comunicazione fra setting",14:"Vivere con la BPCO",15:"Le domande d'orale",16:"La risposta in 15 righe",
 17:"I collegamenti",18:"La frase del caso",19:"Chiusura"}

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
