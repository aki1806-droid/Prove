# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Fino a qui, un paziente alla volta. Ma in reparto la realta' e' un'altra: piu' pazienti insieme, un'equipe da coordinare, gli imprevisti, e a volte un familiare che perde il controllo."),
 (1,"chiaro",0,"Questo caso allena tre competenze che l'orale verifica spesso: stabilire le priorita', attribuire e supervisionare le attivita', e gestire un'aggressione."),

 (2,"chiaro",0,"Turno pomeridiano in medicina. Hai sei pazienti, con un OSS e un assistente infermiere, dove e' presente in organico. Sono le quattordici, e le consegne sono appena finite."),
 (2,"chiaro",0,"Letto uno: Paolo, sessantaquattro anni, anemia: da dieci minuti ha un peso al petto, ed e' sudato. Letto due: Ida, settantasette anni, BPCO, satura ottantanove con gli occhialini; il suo target e' ottantotto-novantadue."),
 (2,"chiaro",0,"Letto tre: Luca, diabetico, glicemia duecentottanta, senza sintomi. Letto quattro: Rosa, ottantacinque anni, allettata, Braden dodici, con igiene e riposizionamento previsti alle quattordici."),
 (2,"chiaro",0,"Letto cinque: Franco, dimissione domani, educazione all'eparina da completare, il figlio arriva alle diciassette. Letto sei: Anna, antibiotico endovena alle quattordici. Pausa: in che ordine?"),

 (3,"chiaro",0,"[serious] Le priorita'. Primo, Paolo: dolore toracico e sudorazione, in un anemico, possono essere una sindrome coronarica o un'ischemia da anemia. Valutazione immediata, ECG entro dieci minuti, parametri, medico."),
 (3,"chiaro",0,"Seconda, Anna: l'antibiotico ha un orario, e un breve ritardo e' accettabile, se documentato. Terzo, Luca: iperglicemia senza sintomi. Si valuta, si applica lo schema prescritto, si informa il medico."),
 (3,"chiaro",0,"Quarta, Ida: stabile, e dentro il suo target. Il trabocchetto e' considerare urgente una saturazione di ottantanove, che per lei e' corretta."),
 (3,"chiaro",0,"Quinta, Rosa: un'attivita' di prevenzione che si puo' attribuire. Sesto, Franco: l'educazione si programma alle diciassette, con il figlio presente."),

 (4,"chiaro",0,"Il ragionamento dietro l'ordine. Prima l'instabilita' e il rischio di peggioramento rapido. Poi la tempo-dipendenza. Poi la competenza: infermieristica e non delegabile, oppure attribuibile ad altri."),
 (4,"chiaro",0,"Un'attivita' puo' essere importante ma attribuibile, come l'igiene di Rosa; un'altra meno urgente ma non attribuibile, come l'educazione di Franco. E' la distinzione che il commissario vuole sentire."),

 (5,"chiaro",0,"L'attribuzione. Attribuire significa affidare un'attivita', non la responsabilita' dell'assistenza: quella resta all'infermiere."),
 (5,"chiaro",0,"I criteri: la stabilita' clinica del paziente, la prevedibilita' dell'esito, la complessita' dell'attivita', il profilo e le competenze dell'operatore, la possibilita' di supervisione."),
 (5,"chiaro",0,"Non si attribuiscono la valutazione, la pianificazione, il giudizio clinico, l'educazione terapeutica, e le attivita' riservate alla competenza infermieristica."),

 (6,"chiaro",0,"Le due figure di supporto. L'OSS svolge l'assistenza diretta di base: igiene, mobilizzazione, alimentazione e comfort, e le attivita' alberghiere, secondo il profilo e le procedure aziendali."),
 (6,"chiaro",0,"L'assistente infermiere e' il profilo istituito con un accordo Stato-Regioni e recepito nel contratto duemilaventidue-duemilaventiquattro. Svolge le attivita' del suo profilo, attribuite e supervisionate dall'infermiere."),
 (6,"chiaro",0,"Una raccomandazione di metodo: le attivita' consentite si verificano sempre nei documenti di riferimento e nelle procedure dell'azienda, perche' e' un ambito in evoluzione."),

 (7,"chiaro",0,"Come si attribuisce bene. Un'istruzione chiara: che cosa, a chi, come, entro quando, e soprattutto che cosa riferire. Un pensaci tu alla quattro non e' un'attribuzione: e' un rischio."),
 (7,"chiaro",0,"Per Rosa: alle quattordici e quindici, igiene e riposizionamento sul fianco sinistro, con lo scarico dei talloni con il cuscino."),
 (7,"chiaro",0,"Guarda la cute di sacro e talloni, e chiamami se vedi arrossamenti che non scompaiono alla pressione, o se riferisce dolore. Poi la verifica al termine, e la documentazione."),

 (8,"chiaro",0,"La responsabilita'. L'infermiere risponde della scelta dell'attivita', dell'operatore e della supervisione; l'operatore, dell'esecuzione. Attribuire a chi non e' competente, o non supervisionare, espone a responsabilita'."),
 (8,"chiaro",0,"Il fondamento e' il profilo, il DM settecentotrentanove del millenovecentonovantaquattro: l'infermiere e' responsabile dell'assistenza generale infermieristica e, dove necessario, si avvale del personale di supporto."),

 (9,"chiaro",0,"[curious] Ore sedici e trenta. Il figlio di Rosa arriva al bancone e alza la voce: mia madre e' sporca, la lasciate cosi', vi denuncio tutti! Si avvicina, gesticola, altri visitatori osservano. Che cosa fai?"),

 (10,"chiaro",0,"La de-escalation della lezione due punto sette. Prima la sicurezza: la distanza, una via d'uscita libera, non restare soli, i colleghi avvisati. Un tono calmo e basso, una postura aperta."),
 (10,"chiaro",0,"L'ascolto, senza interrompere. Riconoscere l'emozione: vedo che e' molto preoccupato per sua madre. E spostarsi in un luogo riservato, lontano dagli altri visitatori."),
 (10,"chiaro",0,"Verificare insieme la situazione, senza promesse e senza accuse: magari Rosa si e' sporcata dopo l'igiene delle quattordici. Offrire una soluzione concreta. E se l'escalation continua, la vigilanza o le forze dell'ordine."),

 (11,"chiaro",0,"Dopo l'episodio. Si segnala secondo la procedura aziendale, come prevede la Raccomandazione otto. In caso di lesioni si fa refertare: sono procedibili d'ufficio, con la legge centotredici del duemilaventi."),
 (11,"chiaro",0,"Il contratto duemilaventidue-duemilaventiquattro prevede il patrocinio legale e il supporto psicologico. E con l'equipe si fa un debriefing."),
 (11,"chiaro",0,"E una cosa che spesso si dimentica: si verifica comunque l'assistenza, perche' una protesta, anche espressa male, puo' segnalare un bisogno reale. Il dialogo con il figlio si riprende a mente fredda."),

 (12,"chiaro",0,"Il resto del turno. Paolo: l'ECG non mostra alterazioni acute, la troponina e' in corso, e il medico prescrive una trasfusione per l'anemia, da sorvegliare. Anna: antibiotico alle quattordici e venticinque, documentato."),
 (12,"chiaro",0,"Luca: correzione secondo schema, e rivalutazione. Ida: stabile. Rosa: cute integra, documentata. Franco: l'educazione con il figlio alle diciassette, con il teach-back sull'autosomministrazione dell'eparina."),

 (13,"chiaro",0,"Le consegne delle ventuno, con lo SBAR, cominciando dai pazienti instabili. Per Paolo. Situazione: letto uno, alle quattordici dolore toracico durato quindici minuti, ora asintomatico."),
 (13,"chiaro",0,"Background: anemia, emoglobina sette virgola due, in trasfusione della seconda unita'. Accertamento: ECG senza alterazioni acute, prima troponina negativa, parametri stabili."),
 (13,"chiaro",0,"Raccomandazione: seconda troponina alle ventidue, sorveglianza della trasfusione, chiamare se il dolore si ripresenta. Chi riceve sa esattamente che cosa fare."),

 (14,"chiaro",0,"Il tempo e le interruzioni. Il turno si pianifica subito dopo le consegne: le attivita' a orario, quelle programmabili, lo spazio per gli imprevisti. E le interruzioni nella preparazione della terapia causano errori."),
 (14,"chiaro",0,"Per questo un'area dedicata, i segnali di non disturbare, un paziente alla volta. Le priorita' si rivalutano a ogni cambiamento. E se il carico e' eccessivo si chiede aiuto e si segnala: e' responsabilita', non debolezza."),

 (15,"chiaro",0,"Le domande d'orale. Prima: con quali criteri attribuisce un'attivita' all'OSS? Stabilita', prevedibilita', complessita', profilo dell'operatore, supervisione. Con istruzioni chiare e la verifica finale."),
 (15,"chiaro",0,"E tenendo per se' valutazione, pianificazione ed educazione. Seconda: come gestisce un familiare aggressivo? Prima la sicurezza, poi la de-escalation: ascolto, riconoscimento dell'emozione, tono calmo, luogo riservato."),
 (15,"chiaro",0,"La vigilanza se serve, e la segnalazione. Terza: che cos'e' lo SBAR? Comunicazione strutturata, situazione, background, accertamento, raccomandazione: nelle consegne, nelle chiamate al medico, nei trasferimenti."),

 (16,"chiaro",0,"La risposta modello. All'inizio del turno stabilisco le priorita' in base a instabilita', tempo-dipendenza e competenza richiesta. Valuto per primo il paziente con dolore toracico: parametri, ECG entro dieci minuti, medico."),
 (16,"chiaro",0,"Poi l'antibiotico a orario. Valuto il paziente con iperglicemia, e riconosco come stabile la paziente con BPCO in target."),
 (16,"chiaro",0,"Attribuisco all'OSS igiene e riposizionamento della paziente allettata, con istruzioni chiare su che cosa fare, entro quando e che cosa riferire, e verifico. Tengo per me valutazione, terapia endovena ed educazione."),
 (16,"chiaro",0,"Con il familiare aggressivo garantisco la sicurezza, applico la de-escalation in un luogo riservato, chiamo la vigilanza se serve, e segnalo. Documento, e trasmetto le consegne SBAR dai pazienti instabili."),

 (17,"chiaro",0,"I collegamenti: profilo e responsabilita' con la uno punto uno e la uno punto due; de-escalation e SBAR con la due punto sette; la Raccomandazione otto con la due punto sei."),
 (17,"chiaro",0,"Il contratto e l'assistente infermiere con la dodici punto cinque; la sicurezza sul lavoro con la dodici punto sei; le lesioni da pressione con la tre punto due."),

 (18,"profondo",1.2,"[serious] La frase del caso: si attribuisce un'attivita', non si delega la responsabilita'. E la priorita' non e' chi chiama piu' forte, ma chi rischia di piu'."),

 (19,"chiaro",0,"[warm] Nella prossima lezione chiudiamo il modulo: il riepilogo dello schema, sei casi lampo su temi che non abbiamo sviluppato per esteso, e le tracce piu' probabili. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario: le consegne delle 14",3:"Le priorita'",4:"Il ragionamento dietro l'ordine",
 5:"L'attribuzione: i criteri",6:"OSS e assistente infermiere",7:"Come si attribuisce bene",8:"La responsabilita'",
 9:"Ore 16:30: il familiare",10:"La de-escalation",11:"Dopo l'episodio",12:"Il resto del turno",13:"Le consegne delle 21",
 14:"Il tempo e le interruzioni",15:"Le domande d'orale",16:"La risposta in 15 righe",17:"I collegamenti",
 18:"La frase del caso",19:"Chiusura"}

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
