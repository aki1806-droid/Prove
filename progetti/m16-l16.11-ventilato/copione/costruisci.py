# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Entriamo in terapia intensiva, dove l'infermiere gestisce insieme tecnologie complesse e una persona che non puo' parlare. Non un'unica emergenza, ma una giornata intera, e un allarme improvviso."),
 (1,"chiaro",0,"Poi la prevenzione della polmonite associata alla ventilazione, la sedazione, il dolore, il delirium, una famiglia in attesa. Lezioni tre punto uno, sei punto due, sette punto due, dieci punto cinque e undici punto uno."),

 (2,"chiaro",0,"Lo scenario. Il signor Renato, sessantasei anni, e' in terapia intensiva da quattro giorni per un'insufficienza respiratoria grave da polmonite."),
 (2,"chiaro",0,"E' intubato e ventilato in modalita' controllata, con sedazione e analgesia in infusione continua. Ha un catetere venoso centrale, un catetere arterioso, un sondino con nutrizione enterale e un catetere vescicale."),
 (2,"chiaro",0,"Alle dieci suona l'allarme di alta pressione: la saturazione scende da novantacinque a ottantacinque, il paziente si agita e morde il tubo. Fermati: con quale acronimo affronti la situazione?"),

 (3,"chiaro",0,"L'acronimo e' DOPE, della lezione dieci punto cinque. D, dislocazione: i centimetri del tubo all'arcata dentaria sono quelli annotati? O, ostruzione: il tubo e' morso, ci sono secrezioni, e' piegato?"),
 (3,"chiaro",0,"P, pneumotorace: il torace si espande in modo asimmetrico, il murmure manca da un lato? E, equipaggiamento: ventilatore, circuito, ossigeno. Nel dubbio si stacca il paziente e lo si ventila con il pallone."),
 (3,"chiaro",0,"Qui il tubo e' morso e ci sono secrezioni: si inserisce un blocco-morso, si aspira, si valuta con il medico la sedazione. La saturazione risale a novantacinque. In meno di due minuti, con un metodo."),

 (4,"chiaro",0,"La prevenzione della polmonite associata alla ventilazione, con il bundle della lezione tre punto uno, secondo protocollo. La testata a trenta-quarantacinque gradi, sempre. L'igiene del cavo orale regolare."),
 (4,"chiaro",0,"La pressione della cuffia fra venti e trenta centimetri d'acqua, controllata con il manometro. L'aspirazione sottoglottica, se il tubo ha il canale dedicato. L'igiene delle mani, e l'aspirazione asettica."),
 (4,"chiaro",0,"La riduzione quotidiana della sedazione, con la valutazione dello svezzamento: ogni giorno di ventilazione in meno e' un rischio in meno. Il circuito non si cambia di routine, solo se sporco o danneggiato."),

 (5,"chiaro",0,"Il dolore in chi non puo' parlare. Il paziente intubato non puo' usare la scala numerica: si usano scale comportamentali validate, come la BPS, la Behavioral Pain Scale, o la CPOT."),
 (5,"chiaro",0,"Osservano l'espressione del volto, i movimenti delle braccia, la tensione muscolare e l'adattamento al ventilatore. Il principio: prima l'analgesia, poi la sedazione, perche' un paziente agitato spesso ha dolore."),
 (5,"chiaro",0,"E il dolore si valuta e si previene prima delle procedure dolorose: aspirazione, mobilizzazione, medicazioni."),

 (6,"chiaro",0,"La sedazione si valuta con la scala RASS: da piu' quattro, il paziente combattivo, a meno cinque, il paziente non risvegliabile. Lo zero e' una persona sveglia e calma."),
 (6,"chiaro",0,"L'obiettivo e' prescritto, e oggi, quando possibile, si punta a una sedazione leggera: un paziente calmo e risvegliabile."),
 (6,"chiaro",0,"Una sedazione eccessiva prolunga la ventilazione e favorisce delirium e debolezza; una insufficiente porta agitazione e rischio di estubazione accidentale. Si rivaluta spesso, e si documenta."),

 (7,"chiaro",0,"[thoughtful] Quinta giornata. Con una sedazione piu' leggera, il signor Renato e' agitato, tira i dispositivi e non segue le richieste in modo coerente. Si valuta con la CAM-ICU, la CAM adattata all'intubato."),
 (7,"chiaro",0,"E' positiva: e' un delirium. Si cercano le cause: dolore, ipossia, infezione, farmaci come le benzodiazepine, astinenza, ritenzione urinaria, privazione di sonno."),
 (7,"chiaro",0,"Gli interventi della undici punto uno, adattati: orientamento, occhiali e apparecchi acustici, ciclo giorno-notte con luci e rumori ridotti di notte, familiari, mobilizzazione. E la protezione dei dispositivi."),

 (8,"chiaro",0,"Un approfondimento: il bundle ABCDEF, una strategia diffusa nelle terapie intensive per ridurre i giorni di ventilazione e le conseguenze a lungo termine. Molti dei suoi elementi sono infermieristici."),
 (8,"chiaro",0,"A: valutare, prevenire e trattare il dolore. B: prove quotidiane di risveglio e di respiro spontaneo. C: la scelta ragionata di analgesia e sedazione."),
 (8,"chiaro",0,"D: valutazione, prevenzione e gestione del delirium. E: mobilizzazione precoce, anche nel ventilato, quando e' sicura. F: il coinvolgimento della famiglia. E' il bundle che lega insieme tutto il caso."),

 (9,"chiaro",0,"Cute, occhi e dispositivi. Le lesioni da dispositivo, frequentissime in terapia intensiva: labbra e angoli della bocca per il tubo e il fissaggio, narici per il sondino, orecchie, la cute sotto i sensori."),
 (9,"chiaro",0,"Le lesioni da pressione a sacro, talloni e occipite; e se il paziente viene messo prono, al volto, al torace e alle ginocchia. Gli occhi, che nel paziente sedato non si chiudono bene: si protegge la cornea."),
 (9,"chiaro",0,"Il bundle per il catetere venoso centrale, della lezione sei punto due. E il catetere vescicale, di cui si rivaluta la necessita' ogni giorno."),

 (10,"chiaro",0,"[serious] E se il tubo esce, per un'estubazione accidentale o perche' il paziente se lo toglie? Si chiama subito aiuto, e si valuta il respiro."),
 (10,"chiaro",0,"Se e' efficace, ossigeno con maschera e monitoraggio. Se e' inefficace, si ventila con pallone e maschera, come nella lezione dieci punto cinque. E si prepara la reintubazione, con l'aspiratore pronto."),
 (10,"chiaro",0,"Poi si documenta e si segnala. La prevenzione: un fissaggio sicuro, sedazione e analgesia adeguate, sorveglianza, e attenzione nei movimenti e nelle mobilizzazioni."),

 (11,"chiaro",0,"La famiglia. La moglie del signor Renato attende fuori dalla porta. Ha bisogno di accoglienza e di informazioni chiare: quelle cliniche dal medico, quelle assistenziali dall'infermiere."),
 (11,"chiaro",0,"Molte terapie intensive hanno orari di visita il piu' possibile aperti. Prima del primo ingresso si spiegano i dispositivi e gli allarmi, che spaventano."),
 (11,"chiaro",0,"Si coinvolge la moglie nella cura: parlare al marito, toccarlo, portare oggetti personali; la sua voce aiuta anche nel delirium. E in alcune realta' c'e' un diario di terapia intensiva."),
 (11,"chiaro",0,"Lo scrivono operatori e familiari, e aiuta il paziente a ricostruire, dopo, i giorni che non ricorda."),

 (12,"chiaro",0,"Dopo la terapia intensiva, molti pazienti sviluppano una sindrome post-terapia intensiva: debolezza muscolare, deficit cognitivi, ansia, depressione, a volte un disturbo post-traumatico. Anche nei familiari."),
 (12,"chiaro",0,"La prevenzione comincia in terapia intensiva, con il bundle ABCDEF, la mobilizzazione, il sonno e la famiglia. E prosegue con follow-up e riabilitazione, in continuita' con il reparto di destinazione."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: allarme di alta pressione con desaturazione? Chiamo aiuto e applico DOPE: dislocazione, ostruzione, pneumotorace, equipaggiamento."),
 (13,"chiaro",0,"Nel dubbio stacco il paziente e lo ventilo con il pallone e ossigeno; poi tratto la causa, per esempio aspirando o inserendo un blocco-morso. Seconda: come previene la VAP?"),
 (13,"chiaro",0,"Testata a trenta-quarantacinque gradi, igiene orale, cuffia a venti-trenta, aspirazione sottoglottica, riduzione quotidiana della sedazione e valutazione dello svezzamento, igiene delle mani, aspirazione asettica."),
 (13,"chiaro",0,"Terza: come valuta il dolore nell'intubato? Con scale comportamentali, come la BPS o la CPOT, prima e durante le procedure."),

 (14,"chiaro",0,"La risposta modello. Paziente ventilato con allarme di alta pressione, desaturazione e agitazione: applico DOPE, rilevo il tubo morso e ostruito, inserisco un blocco-morso, aspiro con tecnica asettica."),
 (14,"chiaro",0,"Verifico i centimetri del tubo; nel dubbio ventilerei con il pallone. Valuto il dolore con una scala comportamentale e la sedazione con la RASS, rispetto all'obiettivo, segnalando al medico: prima l'analgesia."),
 (14,"chiaro",0,"Applico il bundle VAP: testata, igiene orale, cuffia, aspirazione sottoglottica, riduzione della sedazione, svezzamento. Valuto il delirium con la CAM-ICU, ne cerco le cause, applico misure non farmacologiche."),
 (14,"chiaro",0,"Prevengo lesioni da dispositivo e da pressione, proteggo gli occhi, applico il bundle per il catetere centrale. Coinvolgo la famiglia, e documento."),

 (15,"chiaro",0,"I collegamenti. La VAP con la tre punto uno; il catetere centrale, sei punto due; le lesioni, sette punto due; l'aspirazione, otto punto due; DOPE, RASS e CAM-ICU, dieci punto cinque; il delirium, undici punto uno."),

 (16,"chiaro",0,"Un pensiero sull'infermiere di area critica. Ha un rapporto infermiere-paziente piu' basso, e competenze avanzate: ventilazione, farmaci vasoattivi, monitoraggio invasivo, tecniche dialitiche continue."),
 (16,"chiaro",0,"Ma il suo valore aggiunto resta la sorveglianza continua: cogliere i cambiamenti nella persona prima che li segnalino le macchine. Molti neoassunti vengono inseriti qui, con una formazione specifica."),

 (17,"profondo",1.2,"[serious] La frase del caso: dietro le macchine c'e' una persona che sente dolore, ha paura, e ha una famiglia."),

 (18,"chiaro",0,"[warm] Nella prossima lezione chiudiamo il modulo sedici, con il riepilogo e sei nuovi casi lampo, su situazioni che possono capitarti in qualsiasi turno. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"L'allarme: DOPE",4:"La prevenzione della VAP",
 5:"Il dolore in chi non puo' parlare",6:"La sedazione",7:"Quinta giornata: il delirium",
 8:"Il bundle ABCDEF",9:"La cute, gli occhi, i dispositivi",10:"Se il tubo esce",11:"La famiglia",
 12:"Dopo la terapia intensiva",13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",
 16:"L'infermiere di area critica",17:"La frase del caso",18:"Chiusura"}

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
