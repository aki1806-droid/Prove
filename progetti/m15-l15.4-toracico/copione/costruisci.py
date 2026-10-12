# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Un uomo entra in pronto soccorso con un dolore al petto. In meno di mezz'ora attraversera' il triage, la diagnosi di infarto, un arresto cardiaco e la rianimazione, fino all'emodinamica."),
 (1,"chiaro",0,"E' il caso piu' tempo-dipendente del modulo. Mette alla prova il triage della lezione dieci punto uno, l'infarto della otto punto uno, la rianimazione della dieci punto tre e la rete veneta della tredici punto tre."),

 (2,"chiaro",0,"Ore nove e quaranta. Il signor Ferri, sessantuno anni, fumatore e iperteso, arriva accompagnato dalla moglie. Ha un dolore retrosternale oppressivo da cinquanta minuti, irradiato alla mandibola. E' sudato e ha nausea."),
 (2,"chiaro",0,"[curious] Pressione centootto su settanta, frequenza cinquantotto, respiratoria venti, saturazione novantasei in aria, e' vigile. Sei l'infermiere di triage: quale codice, e che cosa fai?"),

 (3,"chiaro",0,"Il triage. Le funzioni vitali sono conservate, quindi non e' un codice uno. Ma c'e' un rischio concreto di compromissione: un dolore toracico tipico, con sudorazione."),
 (3,"chiaro",0,"E' un codice due, arancione, o il codice che il protocollo locale prevede per il dolore toracico, con l'attivazione del percorso dedicato."),
 (3,"chiaro",0,"L'azione piu' importante: l'ECG a dodici derivazioni entro dieci minuti dal primo contatto. E il paziente non resta in sala d'attesa: va in un'area monitorata."),

 (4,"chiaro",0,"Alle nove e quarantasette l'ECG mostra un sopraslivellamento del tratto ST nelle derivazioni due, tre e a vu effe. E' uno STEMI inferiore."),
 (4,"chiaro",0,"Ora la frequenza di cinquantotto ha un senso. Nell'infarto inferiore una bradicardia e' frequente, perche' la coronaria destra irrora spesso il nodo senoatriale."),
 (4,"chiaro",0,"L'ECG va mostrato subito al medico, che attiva la rete STEMI e l'emodinamica. Ricordi la lezione tredici punto tre: il paziente va portato il prima possibile nel centro con l'emodinamica."),

 (5,"chiaro",0,"Le azioni, mentre si attiva l'emodinamica. Monitor e defibrillatore pronti, con le placche gia' applicate se previsto. Riposo e rassicurazione. L'ossigeno non e' indicato, con una saturazione di novantasei."),
 (5,"chiaro",0,"Due accessi venosi secondo protocollo, lasciando libero l'arto previsto per l'accesso arterioso della coronarografia, se indicato. I prelievi: troponina, emocromo, coagulazione, elettroliti, funzione renale."),
 (5,"chiaro",0,"I farmaci, secondo prescrizione o protocollo: antiaggreganti, anticoagulante, analgesia. E la preparazione all'emodinamica: consenso, allergie, soprattutto al contrasto, funzione renale, rimozione di protesi e monili."),

 (6,"chiaro",0,"[thoughtful] E ora una trappola, tipica dei quiz. Viene chiesto di preparare un nitrato sublinguale per il dolore. Ma e' un infarto inferiore, che puo' coinvolgere il ventricolo destro."),
 (6,"chiaro",0,"Lo si verifica con le derivazioni destre dell'ECG. E la pressione e' gia' centootto. Nell'infarto del ventricolo destro i nitrati possono causare un'ipotensione grave."),
 (6,"chiaro",0,"L'infermiere segnala il dubbio e chiede conferma prima di somministrare. E chiede se ha preso farmaci per la disfunzione erettile nelle ultime ore, l'altra controindicazione. E' il suo ruolo di barriera."),

 (7,"chiaro",0,"[serious] Ore dieci e cinque. Il signor Ferri porta la mano al petto e perde coscienza. Sul monitor compare una fibrillazione ventricolare. E' un arresto testimoniato e monitorato. Che cosa fai, e in che ordine?"),

 (8,"chiaro",0,"Chiami aiuto e il team. Confermi in pochi secondi che non risponde e non respira normalmente. Il ritmo e' defibrillabile e il defibrillatore e' gia' collegato: la priorita' e' la defibrillazione immediata."),
 (8,"chiaro",0,"Le linee guida europee prevedono che, in un arresto testimoniato e monitorato in fibrillazione ventricolare, con il defibrillatore subito disponibile, si possano erogare fino a tre shock in rapida successione."),
 (8,"chiaro",0,"Si verifica il ritmo dopo ciascuno. Poi si riprende la rianimazione, trenta a due, per due minuti. E durante ogni shock nessuno tocca il paziente."),

 (9,"chiaro",0,"Il team, con ruoli chiari. Il leader, che dirige e decide. Chi fa le compressioni, con il cambio ogni due minuti. Chi gestisce defibrillatore e monitor. Chi le vie aeree, con pallone e ossigeno."),
 (9,"chiaro",0,"Chi gestisce l'accesso e i farmaci, secondo l'algoritmo: adrenalina e amiodarone dopo il terzo shock, se la fibrillazione persiste. E il timekeeper, che registra l'ora dell'arresto, i ritmi, gli shock e i farmaci."),
 (9,"chiaro",0,"Tutto con una comunicazione a ciclo chiuso: carico un milligrammo di adrenalina; adrenalina somministrata alle dieci e nove."),

 (10,"chiaro",0,"Alle dieci e sette, dopo il secondo shock, compare un ritmo organizzato. C'e' il polso e il paziente respira: e' il ritorno della circolazione spontanea. Iniziano le cure post-arresto della dieci punto tre."),
 (10,"chiaro",0,"ABCDE, saturazione fra novantaquattro e novantotto, evitare l'ipotensione. ECG a dodici derivazioni e glicemia. Controllo della temperatura, per evitare la febbre. Monitoraggio continuo, e tutti gli orari registrati."),

 (11,"chiaro",0,"Il trasferimento in emodinamica avviene con monitor e defibrillatore, ossigeno, farmaci d'emergenza e personale adeguato."),
 (11,"chiaro",0,"Nelle consegne SBAR: l'ora d'inizio del dolore, l'ECG, la terapia, l'arresto, con ritmo, numero di shock e tempo al ritorno del circolo, e lo stato attuale. L'ora del dolore conta quanto quella dell'arresto."),

 (12,"chiaro",0,"La moglie era presente all'arrivo e durante l'arresto. Se possibile, un operatore si dedica a lei. Le informazioni cliniche le da' il medico, in un luogo riservato. E la si informa del trasferimento."),
 (12,"chiaro",0,"Le linee guida considerano che la presenza dei familiari durante la rianimazione possa essere offerta, con un operatore che li supporti e spieghi cio' che accade."),

 (13,"chiaro",0,"Dopo l'angioplastica, in unita' coronarica, si sorveglia la sede di accesso arterioso, radiale o femorale: sanguinamento, ematoma, polso e perfusione a valle, con i dispositivi di compressione secondo protocollo."),
 (13,"chiaro",0,"Poi il ritmo, e un'eventuale recidiva del dolore. La funzione renale dopo il mezzo di contrasto, con l'idratazione. E una mobilizzazione graduale."),

 (14,"chiaro",0,"L'educazione alla dimissione. La doppia antiaggregazione non va mai sospesa di propria iniziativa, perche' lo stent potrebbe trombizzarsi. E va segnalata a ogni medico e al dentista, prima di qualsiasi procedura."),
 (14,"chiaro",0,"Smettere di fumare. Controllare pressione, colesterolo, glicemia e peso. Attivita' fisica e riabilitazione cardiologica. Riconoscere i sintomi, e chiamare subito il centododici o il centodiciotto, senza mettersi alla guida."),

 (15,"chiaro",0,"Gli errori. Lasciare il paziente in sala d'attesa perche' i parametri sono buoni. Fare l'ECG oltre i dieci minuti. Dare l'ossigeno di routine."),
 (15,"chiaro",0,"Somministrare nitrati senza valutare pressione, ventricolo destro e farmaci assunti. Nell'arresto monitorato, ritardare la defibrillazione. E non registrare gli orari."),

 (16,"chiaro",0,"Un tema che il caso porta con se': il consenso in urgenza. All'arrivo il signor Ferri e' cosciente e capace: anche in urgenza lo si informa, con parole essenziali e comprensibili, e si raccoglie il consenso."),
 (16,"chiaro",0,"Senza rinunciarvi per fretta. Se invece la persona e' incosciente e in pericolo di vita, come durante l'arresto, la legge duecentodiciannove, all'articolo uno, prevede che si assicurino le cure necessarie."),
 (16,"chiaro",0,"Nel rispetto della volonta' del paziente, ove le condizioni cliniche lo consentano. Le disposizioni anticipate o le volonta' espresse vanno considerate. E l'infermiere informa per quanto di sua competenza, e documenta."),

 (17,"chiaro",0,"Le domande d'orale. Prima: quali ritmi sono defibrillabili, e quali no? Defibrillabili sono la fibrillazione ventricolare e la tachicardia ventricolare senza polso."),
 (17,"chiaro",0,"Non defibrillabili sono l'asistolia e l'attivita' elettrica senza polso: li' contano la rianimazione di qualita', l'adrenalina e la ricerca delle cause reversibili."),
 (17,"chiaro",0,"Seconda: perche' niente ossigeno di routine? Con una saturazione normale non porta benefici, e l'eccesso di ossigeno puo' essere dannoso. Si somministra quando la saturazione e' bassa."),
 (17,"chiaro",0,"Terza: il ruolo dell'infermiere nel team? Compressioni e cambi, defibrillazione, accesso venoso e farmaci, supporto alle vie aeree, tempi e registrazione. Con la comunicazione a ciclo chiuso e un leader chiaro."),

 (18,"chiaro",0,"La risposta modello. Paziente di sessantuno anni con dolore toracico tipico da cinquanta minuti, sudorazione e parametri conservati: al triage assegno un codice di elevata priorita' e attivo il percorso dolore toracico."),
 (18,"chiaro",0,"Eseguo l'ECG entro dieci minuti e lo mostro subito al medico: e' uno STEMI inferiore, e si attiva la rete. Area monitorata, defibrillatore pronto, riposo; niente ossigeno con saturazione novantasei."),
 (18,"chiaro",0,"Accessi, prelievi e terapia prescritta; segnalo la cautela sui nitrati; preparo alla procedura. In fibrillazione ventricolare defibrillo subito e registro gli orari. Trasferimento monitorato, SBAR, supporto alla moglie."),

 (19,"chiaro",0,"I collegamenti. Il triage con la dieci punto uno. STEMI, nitrati ed ECG con la otto punto uno. La rianimazione con la dieci punto tre. Il contrasto con la quattordici punto sette."),
 (19,"chiaro",0,"Gli antiaggreganti con la cinque punto cinque. La rete veneta con la tredici punto tre. E il sistema di conduzione con la quattordici punto due."),

 (20,"profondo",1.2,"La frase del caso: dieci minuti per l'ECG, pochi secondi per lo shock. [warm] Nella prossima lezione, una paziente con BPCO che, messa tranquilla con molto ossigeno, diventa sempre piu' sonnolenta. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il triage",4:"L'ECG",5:"Le azioni mentre si attiva l'emodinamica",
 6:"La trappola dei nitrati",7:"Ore 10:05: l'arresto",8:"Le azioni nell'arresto monitorato",9:"Il team",
 10:"Ore 10:07: il ritorno della circolazione",11:"Il trasferimento in emodinamica",12:"La moglie",13:"Dopo l'angioplastica",
 14:"L'educazione alla dimissione",15:"Gli errori da evitare",16:"Il consenso in urgenza",17:"Le domande d'orale",
 18:"La risposta in 15 righe",19:"I collegamenti",20:"Chiusura"}

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
