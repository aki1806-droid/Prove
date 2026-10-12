# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il secondo blocco di casi clinici con l'ictus, seguito per intero: dal primo segno in reparto alla trombolisi, fino alla disfagia, alla comunicazione con una persona afasica e alla riabilitazione."),
 (1,"chiaro",0,"Lo schema resta quello del modulo quindici: accertamento, priorita', obiettivi, interventi, valutazione. Ci servono le lezioni tre punto tre, otto punto sei, dieci punto due, tredici punto tre e quattordici punto cinque."),

 (2,"chiaro",0,"Lo scenario. La signora Teresa, settantaquattro anni, e' in cardiologia per una fibrillazione atriale di nuova insorgenza. L'anticoagulante non e' ancora stato iniziato."),
 (2,"chiaro",0,"Alle quattordici e trenta, al giro della terapia, era vigile e conversava. Alle quindici e venti l'OSS ti chiama: la signora non mi risponde bene."),
 (2,"chiaro",0,"La trovi con la bocca deviata, il braccio destro che cade, e parla in modo confuso. Fermati un momento: che cosa fai, e qual e' il dato piu' prezioso che devi annotare?"),

 (3,"chiaro",0,"Il riconoscimento. La FAST e' positiva su tutti e tre i segni: sospetto ictus. E il contesto lo rende probabile: una fibrillazione atriale non anticoagulata e' una fonte di emboli, come nella lezione otto punto uno."),
 (3,"chiaro",0,"La fisiologia della lezione quattordici punto cinque ti dice anche dove: un deficit a destra, con il linguaggio alterato, indica l'emisfero sinistro."),
 (3,"chiaro",0,"Il dato piu' prezioso e' l'ultima volta in cui la signora e' stata vista in benessere: le quattordici e trenta. Sono passati cinquanta minuti: siamo ampiamente nella finestra dei trattamenti."),

 (4,"chiaro",0,"Le prime azioni. Attivi subito il medico e il percorso stroke intraospedaliero, comunicando l'orario delle quattordici e trenta. Poi l'ABCDE, e la glicemia capillare: centododici. Non e' un'ipoglicemia che simula un ictus."),
 (4,"chiaro",0,"I parametri: pressione centosettantotto su novantasei, frequenza centoquattro irregolare, saturazione novantacinque. Poi GCS e pupille. E nulla per bocca."),
 (4,"chiaro",0,"Due accessi venosi e i prelievi: emocromo, coagulazione, glicemia, creatinina. ECG e peso, per la dose del trombolitico. E niente procedure invasive non indispensabili, come il catetere: dopo la trombolisi sanguinerebbero."),

 (5,"chiaro",0,"Un errore frequente: vedere centosettantotto e cercare subito di abbassarla. Nell'ictus ischemico acuto la pressione alta e' spesso un compenso, che mantiene il flusso nelle zone del cervello in sofferenza."),
 (5,"chiaro",0,"Niente antipertensivi senza prescrizione. Per la trombolisi serve una pressione sotto centottantacinque su centodieci prima, e sotto centottanta su centocinque nelle ventiquattro ore dopo. Quella della signora e' compatibile."),

 (6,"chiaro",0,"Alle quindici e quarantacinque la TC dell'encefalo senza contrasto esclude un'emorragia. Il medico valuta il deficit con la scala NIHSS."),
 (6,"chiaro",0,"Alle sedici e cinque si avvia la trombolisi endovena, ben entro le quattro ore e mezza dalle quattordici e trenta. E se l'angio-TC mostra l'occlusione di un grosso vaso, si valuta anche la trombectomia."),
 (6,"chiaro",0,"Si fa nel centro hub della rete ictus, lezione tredici punto tre. E nota quanto pesa l'orario: senza, nessuna di queste decisioni sarebbe possibile."),

 (7,"chiaro",0,"Dopo la trombolisi, stato neurologico e pressione ravvicinati secondo protocollo: per esempio ogni quindici minuti per due ore, ogni trenta per le sei ore successive, poi ogni ora fino alle ventiquattro."),
 (7,"chiaro",0,"[serious] I segni di emorragia cerebrale: cefalea improvvisa, vomito, peggioramento neurologico, pressione che sale. Si sospende l'infusione, se e' ancora in corso, e si avvisa subito."),
 (7,"chiaro",0,"Si sorvegliano i sanguinamenti da altre sedi e l'angioedema di labbra e lingua, piu' frequente con gli ACE-inibitori. E di norma niente anticoagulanti ne' antiaggreganti nelle prime ventiquattro ore."),

 (8,"chiaro",0,"Il giorno dopo la signora e' piu' vigile e chiede da bere. Qui si gioca un'altra partita: prima di qualsiasi cosa per bocca, acqua e farmaci compresi, lo screening della deglutizione, lezione tre punto tre."),
 (8,"chiaro",0,"Se compaiono tosse o voce gorgogliante dopo il sorso, scolo dalla bocca, ritardo dell'atto deglutitorio, si sospende l'alimentazione per bocca e si richiede la valutazione logopedica."),
 (8,"chiaro",0,"Si garantiscono idratazione e nutrizione per altra via, e i farmaci in una forma adatta. E l'igiene del cavo orale, che riduce la polmonite da inalazione."),

 (9,"chiaro",0,"Nei giorni successivi, il posizionamento dell'arto plegico, sostenendo la spalla. Non si tira mai la persona dal braccio plegico, per non causare una sublussazione."),
 (9,"chiaro",0,"Si prevengono polmonite, trombosi, con la compressione pneumatica secondo prescrizione, lesioni da pressione e cadute. E la mobilizzazione e' progressiva, con la fisioterapia."),
 (9,"chiaro",0,"La continenza, evitando il catetere quando e' possibile. L'umore, perche' la depressione dopo l'ictus e' frequente. E la prevenzione secondaria: l'anticoagulazione per la fibrillazione atriale, nei tempi del medico."),

 (10,"chiaro",0,"Un approfondimento: comunicare con una persona afasica. L'afasia e' un disturbo del linguaggio, non dell'intelligenza: la signora capisce piu' di quanto riesca a dire, e soffre se e' trattata come una bambina."),
 (10,"chiaro",0,"Si parla lentamente, a frasi brevi, una domanda alla volta, meglio se chiusa, a cui si risponde si' o no. Si da' tempo per rispondere, senza completare le frasi al posto suo."),
 (10,"chiaro",0,"Si usano gesti, immagini, tabelle di comunicazione. Si verifica la comprensione, si riducono i rumori, si coinvolgono i familiari. Ed e' il presupposto per un consenso informato rispettoso."),

 (11,"chiaro",0,"La dimissione e la continuita'. Si valutano bisogni e disabilita' residua, e si sceglie il percorso riabilitativo: riabilitazione intensiva, Unita' Riabilitativa Territoriale, o casa con la fisioterapia."),
 (11,"chiaro",0,"L'educazione: riconoscere un nuovo ictus con la FAST e chiamare subito il centododici o il centodiciotto. Poi la terapia anticoagulante, la pressione, il fumo, l'alimentazione."),
 (11,"chiaro",0,"Il caregiver va formato sulla mobilizzazione sicura, sulla disfagia e sulla comunicazione. E poi la lettera infermieristica, e se necessario la valutazione dell'UVMD."),

 (12,"chiaro",0,"Gli errori. Attribuire la confusione alla stanchezza, e rivalutare dopo. Non annotare l'ultima volta in benessere. Dimenticare la glicemia. Dare acqua o la terapia orale prima dello screening della deglutizione."),
 (12,"chiaro",0,"Abbassare la pressione senza prescrizione. Posizionare un catetere non indispensabile prima della trombolisi. Tirare il paziente dal braccio plegico."),

 (13,"chiaro",0,"[thoughtful] Il caso mette in luce chi ha visto per primo. E' stata l'OSS a notare il cambiamento e a chiamare subito: un'osservazione preziosa, che ha permesso di arrivare in tempo."),
 (13,"chiaro",0,"Il personale di supporto va formato a riconoscere e riferire i segni d'allarme: la FAST, una confusione nuova, una caduta, un cambiamento del respiro. Senza il timore di disturbare."),
 (13,"chiaro",0,"Nell'ictus una segnalazione tempestiva vale minuti di cervello, e ringraziare chi segnala rafforza la cultura della sicurezza. Lo stesso per i familiari: vanno ascoltati sempre, mai liquidati con un e' solo stanco."),

 (14,"chiaro",0,"[curious] Le domande d'orale. Prima: che cos'e' la FAST, e quale dato temporale e' decisivo? E' una scala di riconoscimento rapido: volto, braccia, linguaggio, tempo."),
 (14,"chiaro",0,"Il dato decisivo e' l'ultima volta in cui la persona e' stata vista in benessere: da quell'orario dipendono la trombolisi e la trombectomia."),
 (14,"chiaro",0,"Seconda: che cosa sorveglia dopo una trombolisi? Stato neurologico e pressione a intervalli ravvicinati, segni di emorragia cerebrale, sanguinamenti da altre sedi e angioedema."),
 (14,"chiaro",0,"Terza: perche' lo screening della deglutizione? Perche' dopo un ictus la disfagia e' frequente e spesso silente, e l'inalazione di acqua, cibo o compresse provoca polmoniti che peggiorano la prognosi."),

 (15,"chiaro",0,"La risposta modello. Paziente con fibrillazione atriale non anticoagulata, con improvvisa asimmetria del volto, deficit del braccio destro e linguaggio alterato: sospetto ictus, emergenza tempo-dipendente."),
 (15,"chiaro",0,"Annoto l'ultima volta in benessere e attivo subito medico e percorso stroke. Valuto ABCDE, glicemia, parametri, GCS e pupille. Digiuno, due accessi, prelievi, ECG e peso. Non tratto la pressione senza prescrizione."),
 (15,"chiaro",0,"Evito le procedure invasive non indispensabili. Collaboro alla TC e alla trombolisi, con sorveglianza neurologica e pressoria ravvicinata. Prima di qualsiasi cosa per bocca, lo screening della deglutizione."),
 (15,"chiaro",0,"Posiziono l'arto plegico, prevengo le complicanze dell'immobilita', uso strategie di comunicazione per l'afasia. Documento gli orari, informo i familiari e avvio il percorso riabilitativo."),

 (16,"chiaro",0,"I collegamenti. La disfagia con la tre punto tre. L'ictus e la trombolisi con la otto punto sei. L'ABCDE con la dieci punto due. La rete ictus con la tredici punto tre."),
 (16,"chiaro",0,"Vie motorie e linguaggio con la quattordici punto cinque. La fibrillazione atriale e gli anticoagulanti con la otto punto uno e la cinque punto cinque. L'URT e l'UVMD con la tredici punto quattro e la tredici punto cinque."),

 (17,"profondo",1.2,"[serious] La frase del caso: l'orologio dell'ictus parte dall'ultima volta in cui la persona stava bene. Il primo dovere dell'infermiere e' conoscere quell'orario."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: un paziente cirrotico che all'alba vomita sangue. Shock, trasfusione, vie aeree, encefalopatia e astinenza alcolica, tutto nello stesso letto. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il riconoscimento",4:"Le prime azioni",5:"La pressione: non abbassarla per riflesso",
 6:"La TC e la decisione",7:"La sorveglianza dopo la trombolisi",8:"Il giorno dopo: la deglutizione",9:"L'assistenza nei giorni successivi",
 10:"Comunicare con una persona afasica",11:"La dimissione e la continuita'",12:"Gli errori da evitare",13:"Il ruolo di chi ha visto per primo",
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
