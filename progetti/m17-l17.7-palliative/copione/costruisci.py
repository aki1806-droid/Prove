# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Lasciamo l'ospedale ed entriamo in una casa. Un uomo con una malattia avanzata ha scelto di essere curato fino alla fine a casa sua, e un'equipe di cure palliative domiciliari lo accompagna con la moglie."),
 (1,"chiaro",0,"Qui la tecnica, dolore, sintomi, vie di somministrazione, si intreccia piu' che mai con la relazione e la famiglia. Le lezioni: uno punto sei, tre punto sette, cinque punto sei, undici punto cinque, tredici punto quattro."),

 (2,"chiaro",0,"Lo scenario. Il signor Giovanni, settantadue anni: tumore del polmone con metastasi ossee, nessuna ulteriore terapia oncologica indicata. Ha espresso chiaramente il desiderio di restare a casa."),
 (2,"chiaro",0,"Vive con la moglie Anna, settant'anni; la figlia abita in un'altra regione. Alla prima visita delle cure palliative: dolore a sette, nonostante un oppioide a lento rilascio, con picchi improvvisi quando si alza."),
 (2,"chiaro",0,"L'alvo e' chiuso da quattro giorni, e dorme poco. Anna e' stanca, e ha paura di sbagliare le medicine. Fermati un momento: quali sono i problemi, e da quale cominci?"),

 (3,"chiaro",0,"Il ragionamento. Un dolore di fondo non controllato. E un dolore episodico intenso: i picchi legati al movimento, tipici delle metastasi ossee. Due dolori diversi, da trattare in due modi diversi."),
 (3,"chiaro",0,"C'e' una stipsi da oppioidi, che si poteva prevenire. C'e' l'insonnia. E una caregiver anziana, stanca e insicura, da cui pero' passa tutta l'assistenza di ogni giorno."),
 (3,"chiaro",0,"[thoughtful] L'obiettivo non e' guarire, ma la qualita' della vita e il rispetto della volonta' di Giovanni di restare a casa. Con l'approccio globale delle cure palliative: fisico, psicologico, sociale e spirituale."),

 (4,"chiaro",0,"Il dolore, con i principi della lezione tre punto sette. Il dolore di fondo si tratta con una terapia a orario fisso, come l'oppioide a lento rilascio, che il medico adegua in base alla valutazione."),
 (4,"chiaro",0,"Il dolore episodico intenso, con una dose di soccorso prescritta, di un oppioide a rapida insorgenza. Se il dolore e' prevedibile, alzarsi, l'igiene, le medicazioni, la dose di soccorso si da' prima dell'attivita'."),
 (4,"chiaro",0,"Si valuta regolarmente con la scala, e si tiene un diario del dolore e delle dosi di soccorso. Se servono spesso, il medico deve rivedere la terapia di fondo."),

 (5,"chiaro",0,"Gli effetti degli oppioidi. La stipsi e' costante e non si attenua con il tempo: il lassativo si prescrive a orario fin dall'inizio. Giovanni, con l'alvo chiuso da quattro giorni, ne ha bisogno subito."),
 (5,"chiaro",0,"La nausea e' spesso transitoria, e la sonnolenza iniziale si riduce. Confusione e mioclonie, cioe' piccole scosse muscolari, invece vanno segnalate al medico."),
 (5,"chiaro",0,"Alla famiglia si insegnano i segni di sovradosaggio: una sonnolenza profonda, un respiro molto lento, le pupille puntiformi."),
 (5,"chiaro",0,"E si affrontano i timori piu' comuni, la dipendenza e la paura di accelerare la fine, con un'informazione corretta: un oppioide usato bene, nel controllo del dolore, non accorcia la vita."),

 (6,"chiaro",0,"Educare la moglie, la vera protagonista dell'assistenza quotidiana. Uno schema scritto e semplice: quali farmaci, a che ora, a che cosa servono. Come e quando usare la dose di soccorso. Il diario."),
 (6,"chiaro",0,"La conservazione sicura degli oppioidi, lontano dai bambini, e lo smaltimento dei residui secondo le indicazioni. E soprattutto chi chiamare: la reperibilita' delle cure palliative, attiva giorno e notte."),
 (6,"chiaro",0,"Si verifica con il teach-back, facendo ripetere ad Anna con parole sue. E si coinvolge la figlia anche a distanza, per esempio con le videochiamate."),

 (7,"chiaro",0,"Terza settimana. Giovanni ha una dispnea anche a riposo, con molta ansia. Gli strumenti della lezione undici punto cinque: seduto, aria fresca sul volto con un piccolo ventilatore, un ambiente tranquillo."),
 (7,"chiaro",0,"Oppioidi a basse dosi, secondo prescrizione, per ridurre la fame d'aria. Ossigeno solo se utile e prescritto. Ansiolitici, respirazione, presenza. E alla moglie si insegna che cosa fare in una crisi, per evitare il panico."),

 (8,"chiaro",0,"Quando non puo' piu' deglutire. La via orale non e' piu' possibile: si passa ad altre vie, le meno dolorose. E si semplifica la terapia, sospendendo i farmaci che non servono piu'."),
 (8,"chiaro",0,"La via sottocutanea, con un ago o una piccola cannula: boli, o un'infusione continua con una pompa elastomerica o elettronica, secondo prescrizione. E' la via piu' usata nelle cure palliative a domicilio."),
 (8,"chiaro",0,"La via transdermica, con i cerotti di oppioide. Non si tagliano, non si espongono al calore, che aumenta l'assorbimento. Si ruotano le sedi, si rimuove il precedente e lo si smaltisce piegato."),

 (9,"chiaro",0,"[serious] Le ultime ore. Compaiono i segni di morte imminente: coscienza ridotta, respiro irregolare con pause, il rantolo, estremita' fredde, marezzatura, urine scarse."),
 (9,"chiaro",0,"Posizione laterale, igiene del cavo orale, antisecretivi secondo prescrizione, senza aspirazioni profonde. Poi, di notte, Anna ti chiama spaventata: chiamiamo il centodiciotto?"),
 (9,"chiaro",0,"Qui si vede il valore di un piano concordato prima. Le si ricorda di chiamare la reperibilita' delle cure palliative, che conosce Giovanni e la sua volonta'."),
 (9,"chiaro",0,"Il centodiciotto resta disponibile, ma potrebbe portarlo in ospedale contro il suo desiderio. E se un sintomo diventa refrattario, la sedazione palliativa e' possibile anche a casa, con il consenso, secondo prescrizione."),

 (10,"chiaro",0,"Un approfondimento: la pianificazione condivisa delle cure, articolo cinque della legge duecentodiciannove. Un percorso fra paziente e medico, con l'equipe, per l'evoluzione prevedibile di una malattia cronica e invalidante."),
 (10,"chiaro",0,"Comprende il luogo di cura preferito, i trattamenti accettati o rifiutati, per esempio la rianimazione o il ricovero, ed eventualmente un fiduciario. E si puo' aggiornare."),
 (10,"chiaro",0,"Permette a familiari e professionisti di rispettare la volonta' della persona nei momenti di crisi, come quella notte. L'infermiere vi partecipa, e la rende conoscibile nella documentazione a domicilio."),

 (11,"chiaro",0,"Dopo la morte. Il medico constata il decesso. L'equipe garantisce presenza e tempo per il saluto, nel rispetto dei riti e delle volonta' della famiglia, e le informazioni pratiche."),
 (11,"chiaro",0,"Si ritirano o si smaltiscono in sicurezza i farmaci, in particolare gli oppioidi. E poi il supporto al lutto: molte reti di cure palliative prevedono una telefonata o una visita di cordoglio."),
 (11,"chiaro",0,"Con attenzione ai segni di un lutto complicato, e all'attivazione di una rete di sostegno. Anna, da questo momento, e' una persona sola da accompagnare."),

 (12,"chiaro",0,"Gli errori. Trattare solo il dolore di fondo, e non quello episodico. Non prevenire la stipsi. Lasciare la famiglia senza un numero da chiamare. Non concordare un piano per le crisi."),
 (12,"chiaro",0,"Tagliare i cerotti, o esporli al calore. Aspirare in profondita' il rantolo. Ricoverare per abitudine, contro la volonta' espressa. Dimenticare il caregiver, e il lutto."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: il dolore episodico intenso? Una dose di soccorso prescritta, di un oppioide a rapida insorgenza, anche prima delle attivita' che lo scatenano, e un diario."),
 (13,"chiaro",0,"Se le dosi di soccorso sono frequenti, si rivede la terapia di fondo. Seconda: le vie alternative alla via orale? Soprattutto la sottocutanea, con boli o infusione continua, e la transdermica, con i cerotti."),
 (13,"chiaro",0,"Terza: la pianificazione condivisa? Un percorso dell'articolo cinque della legge duecentodiciannove: paziente ed equipe decidono in anticipo le scelte di cura, compresi il luogo di cura e un eventuale fiduciario."),

 (14,"chiaro",0,"La risposta modello. Paziente con neoplasia polmonare avanzata in cure palliative domiciliari: dolore di fondo non controllato, dolore episodico intenso, stipsi da oppioidi, caregiver anziana e insicura."),
 (14,"chiaro",0,"Valuto il dolore con scala e diario, e segnalo al medico per adeguare terapia di fondo e dose di soccorso, da usare anche prima delle attivita' dolorose. Avvio il lassativo prescritto."),
 (14,"chiaro",0,"Educo la moglie con uno schema scritto: dose di soccorso, conservazione sicura, numero della reperibilita', con teach-back. Gestisco la dispnea con posizione, aria fresca e farmaci prescritti."),
 (14,"chiaro",0,"Senza la via orale, uso la sottocutanea o la transdermica. Rispetto la volonta' di restare a casa. Nelle ultime ore curo comfort e rantolo, collaboro all'eventuale sedazione palliativa, sostengo la moglie e il lutto."),

 (15,"chiaro",0,"I collegamenti. Consenso e legge duecentodiciannove con la uno punto sei. Il dolore con la tre punto sette. Gli oppioidi con la cinque punto sei. Le cure palliative con la undici punto cinque."),
 (15,"chiaro",0,"Il territorio e la rete veneta con la tredici punto quattro. E il caregiver con la undici punto due, e con il prossimo caso."),

 (16,"chiaro",0,"In Veneto, la rete delle cure palliative della legge trentotto comprende i Nuclei di Cure Palliative domiciliari nelle ULSS, gli hospice, e una reperibilita' per la continuita' di notte e nei festivi."),
 (16,"chiaro",0,"E l'integrazione con il medico di medicina generale e con l'ADI. Per i bambini esiste una rete di cure palliative pediatriche, con un centro regionale di riferimento."),

 (17,"profondo",1.2,"[thoughtful] La frase del caso: a casa, la cura passa attraverso le mani di chi resta. Educare il caregiver e' curare il paziente."),

 (18,"chiaro",0,"[warm] Nella prossima lezione restiamo a domicilio, con l'infermiere di famiglia e comunita': un'anziana allettata con una lesione da pressione, e un figlio che non ce la fa piu'. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Il dolore: di fondo ed episodico",5:"Gli effetti degli oppioidi",
 6:"Educare la moglie",7:"Terza settimana: la dispnea",8:"Quando non puo' piu' deglutire",9:"Le ultime ore",
 10:"La pianificazione condivisa delle cure",11:"Dopo la morte",12:"Gli errori da evitare",13:"Le domande d'orale",
 14:"La risposta modello",15:"I collegamenti",16:"In Veneto",17:"La frase del caso",18:"Chiusura"}

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
