# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Molti infermieri lavorano nei Centri di Servizi, le strutture residenziali venete per anziani non autosufficienti. Di notte, spesso, c'e' un solo infermiere per un intero nucleo, e il medico non e' in struttura."),
 (1,"chiaro",0,"In questo caso un ospite con demenza avanzata ha la febbre. L'infermiere deve valutare, attivare il medico e partecipare a una decisione difficile: curarlo in struttura, o mandarlo in pronto soccorso?"),
 (1,"chiaro",0,"Ci servono le lezioni due punto tre, tre punto tre, undici punto due, undici punto cinque e tredici punto cinque."),

 (2,"chiaro",0,"Lo scenario. Centro di Servizi, l'una di notte. Il signor Ernesto, ottantotto anni, ha una demenza di Alzheimer avanzata: non cammina, comunica poco, ha una disfagia nota."),
 (2,"chiaro",0,"Nella pianificazione condivisa con la figlia, che e' la sua amministratrice di sostegno, e con il medico, l'obiettivo prioritario e' il comfort, senza rianimazione cardiopolmonare."),
 (2,"chiaro",0,"Il ricovero e' previsto solo se utile per sintomi non gestibili in struttura. A cena ha tossito piu' volte. Ora ha la febbre a trentotto virgola otto, una frequenza respiratoria di ventisei, una saturazione di ottantanove."),
 (2,"chiaro",0,"Frequenza centododici, pressione centocinque su sessanta, rantoli a destra, ed e' piu' sonnolento. Fermati un momento: che cosa fai, e chi deve partecipare alla decisione?"),

 (3,"chiaro",0,"Il ragionamento. Disfagia, tosse durante il pasto, febbre, tachipnea, desaturazione e rantoli: una probabile polmonite da inalazione, come nel caso sedici punto nove. Il punteggio di allerta e' elevato: e' seria."),
 (3,"chiaro",0,"[thoughtful] Ma con una demenza avanzata e una pianificazione orientata al comfort, la scelta fra struttura e ospedale non e' automatica. E' una decisione medica, condivisa con l'amministratrice di sostegno."),
 (3,"chiaro",0,"E coerente con la volonta' espressa. L'infermiere ha un ruolo centrale: valuta, comunica, propone, e mette in pratica il piano."),

 (4,"chiaro",0,"Le prime azioni. Valutazione ABCDE e glicemia. Posizione semiseduta, con aspirazione del cavo orale se necessaria. Ossigeno, se in struttura c'e' un concentratore o una bombola, secondo protocollo."),
 (4,"chiaro",0,"Si sospende l'alimentazione per bocca. Si avvisa il medico secondo l'organizzazione della struttura, reperibile o continuita' assistenziale, con lo SBAR. Si consulta la documentazione: pianificazione, terapie, allergie."),
 (4,"chiaro",0,"E si attribuisce all'OSS la sorveglianza degli altri ospiti, perche' di notte l'infermiere non puo' lasciare scoperto il resto del nucleo."),

 (5,"chiaro",0,"La chiamata al medico, con lo SBAR. Situazione: Ernesto, ottantotto anni, febbre a trentotto virgola otto, saturazione ottantanove, frequenza respiratoria ventisei, piu' sonnolento."),
 (5,"chiaro",0,"Background: demenza avanzata, disfagia, tosse a cena; la pianificazione prevede il comfort, niente rianimazione, ricovero solo se utile per sintomi non gestibili. Accertamento: probabile polmonite da inalazione."),
 (5,"chiaro",0,"In struttura abbiamo l'ossigeno e possiamo usare la via sottocutanea. Raccomandazione: chiedo una valutazione e indicazioni per la terapia; la figlia e' reperibile. Citare la pianificazione orienta subito la decisione."),

 (6,"chiaro",0,"La decisione. Il medico valuta Ernesto e, sentita la figlia, decide di trattarlo in struttura, coerentemente con la pianificazione. Secondo prescrizione: un antibiotico, l'ossigeno con un target, l'antipiretico."),
 (6,"chiaro",0,"E l'idratazione per via sottocutanea, se non puo' bere. L'infermiere cura la posizione e il cavo orale, gestisce dispnea, secrezioni e agitazione, controlla parametri e comfort a intervalli concordati."),
 (6,"chiaro",0,"E conosce i criteri per rivalutare un trasferimento, per esempio sintomi che non si riescono a controllare. E documenta tutto."),

 (7,"chiaro",0,"[serious] Perche' non sempre il pronto soccorso? Per una persona con demenza avanzata il trasferimento puo' causare delirium, cadute, lesioni da pressione, contenzioni, lunghe attese, procedure invasive di scarso beneficio."),
 (7,"chiaro",0,"Per molti problemi, come una polmonite in chi ha scelto il comfort, le cure in struttura possono essere adeguate. Ma il trasferimento resta giusto se serve un trattamento non disponibile e coerente con gli obiettivi."),
 (7,"chiaro",0,"Una frattura da trattare, un'emorragia, sintomi non controllati. Si decide sulla volonta', sul beneficio atteso e sulle possibilita' della struttura. Non e' non fare niente: e' la cosa giusta nel posto giusto."),

 (8,"chiaro",0,"La figlia viene chiamata nella notte, e chiede spaventata: non lo portate in ospedale? Non volete curarlo? Si ascoltano la sua paura e il suo senso di colpa."),
 (8,"chiaro",0,"Si spiega che le cure continuano in struttura: antibiotico, ossigeno, idratazione, comfort. Si ricordano con calma le scelte condivise mesi prima. E il medico e' disponibile a parlarle."),
 (8,"chiaro",0,"Con onesta': la decisione si puo' rivedere se cambiano le condizioni o la sua valutazione, e lei puo' venire, se lo desidera. Molte famiglie hanno bisogno di sentire che il loro caro non e' abbandonato."),

 (9,"chiaro",0,"Un approfondimento tecnico, molto usato nelle strutture e a domicilio: l'ipodermoclisi, cioe' l'idratazione per via sottocutanea."),
 (9,"chiaro",0,"E' indicata nella disidratazione lieve-moderata, quando la via orale non e' possibile e quella venosa e' difficile o non proporzionata."),
 (9,"chiaro",0,"Le sedi: addome, cosce, regione sotto la clavicola, e il dorso nel paziente agitato, che cosi' non puo' strappare l'ago. Soluzioni isotoniche secondo prescrizione, a velocita' lenta."),
 (9,"chiaro",0,"Si sorvegliano edema locale, arrossamento, dolore e segni di infezione, e si cambia la sede secondo protocollo. Non e' adatta alle emergenze o allo shock, dove serve la via venosa."),

 (10,"chiaro",0,"E se il trasferimento fosse stato necessario? Si prepara una scheda di trasferimento completa: il motivo, i parametri, le terapie, le allergie, l'autonomia e lo stato cognitivo abituale."),
 (10,"chiaro",0,"Un'informazione preziosa per il pronto soccorso, che altrimenti non sa se la confusione e' nuova. Poi la pianificazione condivisa e le eventuali DAT, i contatti del familiare e del medico."),
 (10,"chiaro",0,"Con Ernesto viaggiano gli occhiali, le protesi, gli apparecchi acustici. Si comunica con il pronto soccorso con lo SBAR. E una persona di riferimento lo accompagna o lo raggiunge."),

 (11,"chiaro",0,"La prevenzione nel nucleo. Per la disfagia: consistenze adatte, posizione seduta durante e dopo il pasto, assistenza al pasto da parte di personale formato, igiene del cavo orale."),
 (11,"chiaro",0,"Piu' ospiti con febbre o sintomi respiratori: possibile focolaio, per esempio di influenza, con precauzioni e segnalazione. Vaccinazioni di ospiti e operatori, igiene delle mani, e la revisione periodica del PAI."),

 (12,"chiaro",0,"Gli errori. Inviare in pronto soccorso per abitudine, senza valutazione e senza considerare la volonta'. Al contrario, non attivare il medico per non disturbare di notte. Non consultare la pianificazione condivisa."),
 (12,"chiaro",0,"Continuare a far mangiare un ospite che tossisce. Lasciare il resto del nucleo senza sorveglianza. Una scheda di trasferimento senza lo stato cognitivo abituale. Non coinvolgere la famiglia."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: come si decide il trasferimento? E' una decisione medica, condivisa con la persona o con il suo rappresentante."),
 (13,"chiaro",0,"Si basa sulla gravita', sulla volonta' espressa e sulla pianificazione condivisa, sul beneficio atteso e sulle possibilita' della struttura. L'infermiere valuta, comunica con lo SBAR e partecipa."),
 (13,"chiaro",0,"Seconda: l'ipodermoclisi? L'idratazione per via sottocutanea con soluzioni isotoniche, nella disidratazione lieve-moderata quando la via orale non e' possibile. Non nelle emergenze."),
 (13,"chiaro",0,"Terza: la scheda di trasferimento? Motivo, parametri, terapie, allergie, autonomia e stato cognitivo abituale, pianificazione e DAT, contatti, ausili personali."),

 (14,"chiaro",0,"La risposta modello. Ospite di un Centro di Servizi con demenza avanzata e disfagia che, dopo tosse al pasto, ha febbre, tachipnea, desaturazione, rantoli e sonnolenza: probabile polmonite da inalazione."),
 (14,"chiaro",0,"Valuto con ABCDE e glicemia, posiziono semiseduto, aspiro, somministro ossigeno, sospendo l'alimentazione per bocca e attribuisco all'OSS la sorveglianza degli altri ospiti."),
 (14,"chiaro",0,"Consulto la pianificazione condivisa e avviso il medico con SBAR, citandola. Collaboro alla decisione, condivisa con l'amministratrice di sostegno, di trattarlo in struttura."),
 (14,"chiaro",0,"Antibiotico, ossigeno, antipiretico e idratazione sottocutanea secondo prescrizione, cura dei sintomi, criteri per un eventuale trasferimento. Sostengo la figlia. Documento, e rivedo con l'equipe la prevenzione."),

 (15,"chiaro",0,"I collegamenti: NEWS2, due punto tre. Disfagia, tre punto tre. Demenza, undici punto due. Cure palliative, undici punto cinque e diciassette punto sette. Centri di Servizi, tredici punto cinque. Inalazione, sedici punto nove."),

 (16,"chiaro",0,"L'infermiere nei Centri di Servizi: grande autonomia, soprattutto di notte. Coordinamento degli OSS, terapia di molti ospiti, prevenzione, famiglie, fine vita. Un ambito ricco, spesso sottovalutato, e molto richiesto."),

 (17,"profondo",1.2,"[thoughtful] La frase del caso: curare in struttura non e' curare di meno. E' curare secondo la volonta' della persona."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: una paziente straniera che parla poco l'italiano, un figlio che vorrebbe tradurre per lei, un consenso da raccogliere e una dimissione da costruire insieme. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le prime azioni",5:"La chiamata al medico",
 6:"La decisione: curare in struttura",7:"Perche' non sempre il pronto soccorso",8:"La figlia al telefono",
 9:"L'ipodermoclisi",10:"Se il trasferimento fosse stato necessario",11:"La prevenzione nel nucleo",
 12:"Gli errori da evitare",13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",
 16:"L'infermiere nei Centri di Servizi",17:"La frase del caso",18:"Chiusura"}

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
