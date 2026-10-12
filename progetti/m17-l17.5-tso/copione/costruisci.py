# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Un giovane uomo molto agitato arriva in pronto soccorso con i genitori. Un caso che mette insieme la sicurezza degli operatori, la de-escalation, la ricerca delle cause organiche."),
 (1,"chiaro",0,"Poi i farmaci e la loro sorveglianza, e le regole del trattamento sanitario obbligatorio, chieste dai concorsi con precisione. Lezioni uno punto sei, due punto sette, tre punto uno, undici punto tre, dodici punto sei."),

 (2,"chiaro",0,"Lo scenario. Davide, ventisei anni, accompagnato in pronto soccorso dai genitori alle ventuno. Da cinque giorni non dorme, ed e' convinto di essere spiato attraverso il telefono."),
 (2,"chiaro",0,"Ha distrutto alcuni oggetti in casa. Ora cammina avanti e indietro, alza la voce, e rifiuta di farsi visitare: voi siete d'accordo con loro."),
 (2,"chiaro",0,"I genitori riferiscono un uso di cannabis. Nessun precedente psichiatrico noto. Fermati un momento: qual e' la prima cosa a cui pensi, prima ancora del paziente?"),

 (3,"chiaro",0,"[serious] La prima cosa e' la sicurezza di tutti: del paziente, degli operatori, degli altri pazienti. Si accompagna Davide in un ambiente tranquillo, lontano dalla sala d'attesa affollata."),
 (3,"chiaro",0,"Si rimuovono gli oggetti potenzialmente pericolosi. Si mantiene una via d'uscita libera per l'operatore, senza mettersi fra il paziente e la porta, e una distanza adeguata."),
 (3,"chiaro",0,"Non si resta soli: colleghi avvisati, e vigilanza disponibile secondo procedura. E' la Raccomandazione otto, sulla prevenzione degli atti di violenza contro gli operatori."),

 (4,"chiaro",0,"La de-escalation, della lezione due punto sette. Un solo interlocutore, perche' piu' voci aumentano la confusione. Tono calmo e basso, frasi brevi, postura aperta, mani visibili."),
 (4,"chiaro",0,"Ci si presenta, e lo si chiama per nome. Si ascolta, e si riconosce l'emozione: vedo che e' molto spaventato. I deliri non si contraddicono e non si assecondano: si risponde al bisogno. Qui e' al sicuro."),
 (4,"chiaro",0,"Si offrono scelte semplici: dove sedersi, un bicchiere d'acqua. Niente promesse impossibili, rispetto dello spazio personale. Dopo una decina di minuti Davide accetta di sedersi e di farsi misurare la pressione."),

 (5,"chiaro",0,"Poi un passaggio che i concorsi vogliono vedere: escludere le cause organiche. Un'agitazione con sintomi psicotici non e' automaticamente un disturbo psichiatrico."),
 (5,"chiaro",0,"Possono causarla ipoglicemia, ipossia, febbre e infezioni come un'encefalite, un trauma cranico, le intossicazioni da cocaina, amfetamine o cannabinoidi sintetici, le astinenze da alcol o benzodiazepine."),
 (5,"chiaro",0,"E ancora la tiroide, l'epilessia. Si rilevano parametri, glicemia, temperatura e saturazione; il medico valuta gli esami. Davide: parametri nella norma, glicemia novantotto, tossicologico secondo indicazione."),

 (6,"chiaro",0,"I farmaci, sempre secondo prescrizione. Si offre prima la terapia per bocca: accettarla e' una scelta del paziente, e rafforza l'alleanza. Se necessario, la somministrazione intramuscolare."),
 (6,"chiaro",0,"Dopo, la sorveglianza: sedazione, frequenza respiratoria, saturazione, pressione, ECG secondo indicazione, perche' alcuni antipsicotici allungano il QT, e idratazione."),
 (6,"chiaro",0,"E un effetto collaterale da riconoscere: la distonia acuta, con torcicollo, occhi rivolti verso l'alto, contrazioni della lingua. Spaventa molto, va segnalata subito, si tratta con anticolinergici secondo prescrizione."),

 (7,"chiaro",0,"La contenzione, con i principi della lezione tre punto uno. Una misura estrema ed eccezionale, per il tempo strettamente necessario, quando ogni alternativa e' fallita e c'e' un pericolo grave e attuale."),
 (7,"chiaro",0,"Richiede una prescrizione medica, una tecnica sicura con personale formato e sufficiente, e un monitoraggio ravvicinato: parametri, respiro, circolazione degli arti, cute, idratazione, bisogni fisiologici, dignita'."),
 (7,"chiaro",0,"Si rivaluta di continuo, si rimuove appena possibile, si documenta tutto. Molti servizi lavorano per non usarla mai. E per Davide la de-escalation ha funzionato: la contenzione non e' servita."),

 (8,"chiaro",0,"Lo psichiatra valuta Davide: un quadro psicotico acuto, con necessita' di cure urgenti. Ma Davide rifiuta il ricovero. Si cerca ancora il consenso: spiegazioni, tempo, coinvolgimento dei genitori."),
 (8,"chiaro",0,"Il ricovero volontario resta sempre la prima scelta. Se il rifiuto persiste, e ricorrono i requisiti previsti dalla legge, si procede con un trattamento sanitario obbligatorio."),

 (9,"chiaro",0,"Il TSO e' regolato dalla legge ottocentotrentatre' del millenovecentosettantotto, agli articoli trentatre', trentaquattro e trentacinque, come nella lezione undici punto tre."),
 (9,"chiaro",0,"Servono tre requisiti insieme: alterazioni psichiche tali da richiedere urgenti interventi terapeutici, il rifiuto degli interventi, e l'impossibilita' di adottare tempestive e idonee misure extraospedaliere."),
 (9,"chiaro",0,"La procedura: proposta motivata di un medico, convalida di un medico della struttura pubblica, ordinanza del sindaco, notifica entro quarantotto ore al giudice tutelare, che convalida entro le quarantotto successive."),
 (9,"chiaro",0,"Dura sette giorni, prorogabili, e si esegue nell'SPDC. E ricorda: la pericolosita' non e' fra i requisiti. Il TSO e' un atto di cura, non di ordine pubblico."),

 (10,"chiaro",0,"Il ruolo dell'infermiere nel TSO. Non lo decide: collabora nella gestione clinica e nella sicurezza. Informa il paziente, in modo chiaro e rispettoso, di cio' che accade, anche se sembra non ascoltare."),
 (10,"chiaro",0,"Tutela la dignita' e la riservatezza, evitando esposizioni davanti ad altri. Garantisce i diritti: comunicare con chi ritiene opportuno, presentare ricorso, ricevere informazioni."),
 (10,"chiaro",0,"Documenta comportamenti, interventi e terapia. Continua a cercare la partecipazione del paziente, anche durante il trattamento obbligatorio. E infine, consegne complete all'SPDC."),

 (11,"chiaro",0,"Un approfondimento su situazioni che i candidati confondono. L'ASO, l'accertamento sanitario obbligatorio, serve a valutare una persona che rifiuta la visita: procedura analoga, senza ricovero."),
 (11,"chiaro",0,"Esiste anche un TSO extraospedaliero, quando non serve la degenza. E il paziente non psichiatrico che rifiuta le cure, per un'appendicite? Il TSO non si applica: si valuta la sua capacita' di decidere."),
 (11,"chiaro",0,"Se e' capace, il rifiuto va rispettato, dopo un'informazione completa, come prevede la legge duecentodiciannove. Se non e' capace e c'e' un'emergenza, si garantiscono le cure indispensabili."),
 (11,"chiaro",0,"E se la persona ha un amministratore di sostegno, lo si coinvolge secondo i poteri che gli sono attribuiti."),

 (12,"chiaro",0,"[thoughtful] I genitori vivono spavento, colpa, sollievo e rabbia insieme. Hanno bisogno di informazioni chiare sul percorso, nei limiti della riservatezza e del consenso del figlio, maggiorenne."),
 (12,"chiaro",0,"Si spiega che il TSO e' un atto di cura. Si indicano il Centro di Salute Mentale e le associazioni dei familiari. Cannabis e psicosi: si informa senza colpevolizzare, e se indicato si coinvolge il SerD."),

 (13,"chiaro",0,"Gli errori. Affrontare il paziente da soli, o in tanti che parlano insieme. Contraddire i deliri, o discutere. Dare per scontato che sia psichiatrico, senza escludere le cause organiche."),
 (13,"chiaro",0,"Dare farmaci senza poi sorvegliare respiro e pressione. Non riconoscere una distonia acuta. La contenzione come prima risposta. Il TSO preso per un provvedimento di sicurezza, la pericolosita' per un requisito."),

 (14,"chiaro",0,"[curious] Le domande d'orale. Prima: requisiti e procedura del TSO? Tre requisiti insieme: alterazioni psichiche che richiedono urgenti interventi, rifiuto, impossibilita' di misure extraospedaliere."),
 (14,"chiaro",0,"Poi la proposta di un medico, la convalida di un medico pubblico, l'ordinanza del sindaco, il giudice tutelare con le due finestre di quarantotto ore. Sette giorni, in SPDC."),
 (14,"chiaro",0,"Seconda: come gestisce l'agitazione psicomotoria? Sicurezza, de-escalation, esclusione delle cause organiche, terapia offerta prima per bocca, e la contenzione solo come misura estrema."),
 (14,"chiaro",0,"Terza: che cosa sorveglia dopo un antipsicotico intramuscolare? Sedazione, frequenza respiratoria, saturazione, pressione, ECG se indicato, e i segni di distonia acuta."),

 (15,"chiaro",0,"La risposta modello. Giovane con agitazione psicomotoria, insonnia, idee di persecuzione e rifiuto delle cure: priorita' alla sicurezza di tutti. Ambiente tranquillo, via d'uscita libera."),
 (15,"chiaro",0,"Colleghi avvisati e vigilanza disponibile. De-escalation con un solo interlocutore, tono calmo, ascolto e offerta di scelte, senza contraddire i deliri. Collaboro all'esclusione delle cause organiche."),
 (15,"chiaro",0,"Offro la terapia prescritta per bocca e, se somministrata per via intramuscolare, sorveglio sedazione, respiro, pressione ed eventuali distonie. Considero la contenzione solo come misura estrema."),
 (15,"chiaro",0,"Se il medico propone un TSO, collaboro nel rispetto di requisiti e procedura. Informo il paziente, ne tutelo dignita' e diritti, sostengo i genitori, documento e trasmetto le consegne all'SPDC."),

 (16,"chiaro",0,"Collegamenti. Consenso e legge duecentodiciannove, uno punto sei. De-escalation, due punto sette. Contenzione, tre punto uno. Salute mentale, TSO e ASO, undici punto tre. Sicurezza degli operatori, dodici punto sei."),

 (17,"profondo",1.2,"[serious] La frase del caso: la de-escalation e' una tecnica, il TSO e' una procedura, il rispetto e' la condizione di entrambi."),

 (18,"chiaro",0,"[warm] Nella prossima lezione, le dipendenze: un paziente in terapia con metadone, ricoverato in chirurgia, che di notte va in astinenza. Pregiudizi, continuita' della terapia, dolore e sicurezza. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"La sicurezza prima di tutto",4:"La de-escalation",5:"Escludere le cause organiche",
 6:"I farmaci e la loro sorveglianza",7:"La contenzione",8:"Il rifiuto delle cure",9:"Il TSO: requisiti e procedura",
 10:"Il ruolo dell'infermiere nel TSO",11:"TSO, ASO e altre situazioni",12:"I genitori",13:"Gli errori da evitare",
 14:"Le domande d'orale",15:"La risposta modello",16:"I collegamenti",17:"La frase del caso",18:"Chiusura"}

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
