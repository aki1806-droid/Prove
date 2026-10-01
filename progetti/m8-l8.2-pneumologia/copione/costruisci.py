# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Lezione ad altissima resa d'esame. Contiene una regola che vale da sola molte domande: l'ossigeno e' un farmaco, con una prescrizione, una dose e un obiettivo."),
 (1,"chiaro",0,"E contiene i dispositivi, occhialini, maschere, Venturi, alti flussi, ventilazione non invasiva, che i quiz chiedono con numeri precisi. Chiudiamo con la tracheostomia e la broncoaspirazione."),

 (2,"chiaro",0,"Due malattie ostruttive. La BPCO: ostruzione cronica, poco reversibile, causata soprattutto dal fumo; si aggrava nelle riacutizzazioni, spesso infettive."),
 (2,"chiaro",0,"E molti pazienti hanno un rischio di ipercapnia, cioe' di accumulo di anidride carbonica. L'asma: ostruzione reversibile, legata a un'infiammazione delle vie aeree."),
 (2,"chiaro",0,"I segni di un attacco grave: non riesce a parlare in frasi complete, torace silenzioso perche' passa pochissima aria, cianosi, sonnolenza, esaurimento. Un asmatico che smette di sibilare puo' stare peggiorando."),

 (3,"chiaro",0,"Tre quadri acuti. La polmonite: febbre, tosse, espettorato, dolore pleurico, dispnea. Ma nell'anziano spesso si presenta solo con confusione."),
 (3,"chiaro",0,"L'embolia polmonare: dispnea improvvisa, dolore toracico, tachicardia, desaturazione, spesso conseguenza di una trombosi venosa profonda: il legame con la lezione tre punto due."),
 (3,"chiaro",0,"Il versamento pleurico: liquido fra i foglietti pleurici, con dispnea e murmure ridotto, che si drena con la toracentesi."),

 (4,"chiaro",0,"La toracentesi, eseguita dal medico con l'assistenza infermieristica. La persona sta seduta, protesa in avanti con le braccia appoggiate su un tavolino, per allargare gli spazi intercostali."),
 (4,"chiaro",0,"Si sorvegliano parametri, saturazione, tosse e dolore. La quantita' rimossa in una volta e' limitata: un drenaggio troppo rapido puo' causare un edema polmonare da riespansione. Dopo, radiografia di controllo."),

 (5,"chiaro",0,"Il principio fondamentale: l'ossigeno e' un farmaco. Si somministra su prescrizione, e la prescrizione indica un obiettivo di saturazione. Per la maggior parte delle persone il target e' novantaquattro-novantotto per cento."),
 (5,"chiaro",0,"Nei pazienti a rischio di ipercapnia, BPCO, obesita' grave, malattie neuromuscolari, il target e' ottantotto-novantadue per cento."),
 (5,"chiaro",0,"Ricordi il caso della lezione sei punto quattro: troppo ossigeno in un paziente ipercapnico puo' peggiorare l'acidosi respiratoria, fino al coma. Piu' ossigeno non e' sempre meglio."),

 (6,"chiaro",0,"I dispositivi. Gli occhialini nasali: flussi da uno a sei litri al minuto, con una FiO2 indicativa fra circa ventiquattro e quarantaquattro per cento. Una regola pratica e' circa quattro punti in piu' per ogni litro."),
 (6,"chiaro",0,"Sono comodi e permettono di parlare e mangiare, ma la FiO2 reale varia con il modo di respirare. Ai flussi piu' alti si usa l'umidificazione secondo procedura."),

 (7,"chiaro",0,"La maschera semplice: cinque-dieci litri al minuto, con una FiO2 circa del trentacinque-cinquantacinque per cento."),
 (7,"chiaro",0,"E la regola: mai sotto cinque litri, perche' con un flusso basso la persona rirespira la propria anidride carbonica rimasta nella maschera."),
 (7,"chiaro",0,"La maschera con reservoir, con un pallone di riserva: dieci-quindici litri al minuto, FiO2 fino a sessanta-novanta per cento, per la grave ipossiemia. Il pallone resta gonfio: se si affloscia, il flusso e' insufficiente."),

 (8,"chiaro",0,"La maschera di Venturi: garantisce una FiO2 precisa e costante, indicativamente dal ventiquattro al sessanta per cento, indipendentemente da come respira la persona."),
 (8,"chiaro",0,"Funziona con valvole colorate intercambiabili: ogni valvola corrisponde a una FiO2, e su ogni valvola e' scritto il flusso da impostare sul flussimetro."),
 (8,"chiaro",0,"E' il dispositivo di scelta quando serve precisione, come nel paziente con BPCO a rischio di ipercapnia."),

 (9,"chiaro",0,"Gli alti flussi nasali: flussi fino a sessanta litri al minuto di gas riscaldato e umidificato, con una FiO2 regolabile dal ventuno al cento per cento."),
 (9,"chiaro",0,"Generano una lieve pressione positiva e lavano lo spazio morto delle vie aeree. Sono ben tollerati e si usano sempre piu' nell'insufficienza respiratoria acuta."),

 (10,"chiaro",0,"La sicurezza. L'ossigeno alimenta la combustione: niente fiamme, niente fumo, niente grassi o creme oleose sui raccordi."),
 (10,"chiaro",0,"Bombole fissate e verificate prima dei trasporti: un trasporto con una bombola vuota e' un evento avverso evitabile. E sorveglianza della cute sotto occhialini e maschere: sono sedi di lesioni da dispositivo."),

 (11,"chiaro",0,"I limiti del saturimetro, domanda frequente. Lettura inaffidabile con perfusione ridotta, estremita' fredde, movimento, smalto."),
 (11,"chiaro",0,"Nell'intossicazione da monossido di carbonio la saturazione risulta falsamente normale, perche' lo strumento non distingue l'emoglobina legata al monossido."),
 (11,"chiaro",0,"Nell'anemia grave la saturazione puo' essere normale anche se il sangue trasporta poco ossigeno. E la saturazione non misura l'anidride carbonica: un paziente ipercapnico puo' saturare bene."),

 (12,"chiaro",0,"La ventilazione non invasiva. La CPAP applica una pressione positiva continua: si usa nell'edema polmonare acuto e nelle apnee ostruttive del sonno."),
 (12,"chiaro",0,"La NIV a due livelli applica una pressione piu' alta in inspirazione e una piu' bassa in espirazione: e' il trattamento della riacutizzazione di BPCO con acidosi ipercapnica. Interfacce: maschera oronasale, facciale, casco."),

 (13,"chiaro",0,"L'assistenza in NIV e' molto infermieristica. Spiegare e rassicurare: la maschera stretta sul volto da' senso di soffocamento, e una persona agitata non si adatta. Interfaccia della misura giusta, perdite contenute."),
 (13,"chiaro",0,"Protezione della cute, soprattutto sul dorso del naso, dove le lesioni da dispositivo sono frequentissime. Monitoraggio di frequenza respiratoria, saturazione, emogas e coscienza. Distensione gastrica e secchezza."),
 (13,"chiaro",0,"E i segni di fallimento, peggioramento della coscienza, dell'emogas, della fatica, vanno segnalati subito, perche' puo' servire l'intubazione."),

 (14,"chiaro",0,"L'aerosolterapia. Persona seduta, boccaglio preferibile alla maschera, che deposita farmaco su volto e occhi. Respirazione lenta e profonda."),
 (14,"chiaro",0,"Dopo i corticosteroidi, risciacquare la bocca: ricordi la candidosi della lezione cinque punto due. E pulizia e asciugatura dell'apparecchio, per non nebulizzare batteri."),

 (15,"chiaro",0,"La tracheostomia. La cannula puo' essere cuffiata o no, fenestrata o no; molte hanno una controcannula interna, che si pulisce o si sostituisce secondo procedura per evitare l'occlusione da secrezioni."),
 (15,"chiaro",0,"La cuffia si mantiene a una pressione di venti-trenta centimetri d'acqua, controllata con il manometro: troppo poco favorisce l'inalazione, troppo lede la trachea."),
 (15,"chiaro",0,"L'aria non passa piu' dal naso: serve umidificazione, con un naso artificiale. Al letto sempre una cannula di riserva, anche piu' piccola, un dilatatore e un aspiratore funzionante: se la cannula esce, non c'e' tempo."),

 (16,"chiaro",0,"La broncoaspirazione. Si esegue quando serve, secrezioni udibili o visibili, desaturazione, non a orario, perche' ogni aspirazione irrita la mucosa e puo' causare ipossia. Preossigenazione."),
 (16,"chiaro",0,"Tecnica sterile, o sistema chiuso. Catetere non piu' grande della meta' del diametro interno della cannula: la persona deve respirare intorno al catetere. Pressione indicativa ottanta-centocinquanta millimetri di mercurio."),
 (16,"chiaro",0,"Si aspira solo in risalita, ruotando il catetere, mai in discesa. Ogni passaggio non oltre dieci-quindici secondi. Niente fisiologica di routine. Si sorvegliano saturazione e frequenza: rischio di bradicardia vagale."),

 (17,"chiaro",0,"Il caso. Paziente con BPCO, saturazione ottantasei in aria, prescrizione di ossigeno con target ottantotto-novantadue. Quale dispositivo?"),
 (17,"chiaro",0,"La maschera di Venturi a bassa FiO2, per esempio ventiquattro o ventotto per cento, che garantisce una concentrazione precisa; in alternativa gli occhialini a basso flusso, con stretto controllo."),
 (17,"profondo",1.2,"[serious] Poi rivaluti la saturazione, la coscienza e l'emogas. La risposta sbagliata e' la maschera con reservoir, per stare tranquilli."),

 (18,"chiaro",0,"In Veneto esistono unita' di terapia semi-intensiva respiratoria in cui la NIV e' gestita con un ruolo infermieristico centrale."),
 (18,"chiaro",0,"L'ossigenoterapia domiciliare a lungo termine e' prescritta e fornita tramite il distretto, e i pazienti tracheostomizzati a domicilio sono seguiti con percorsi dedicati e addestramento del caregiver."),

 (19,"chiaro",0,"Ricapitoliamo. L'ossigeno e' un farmaco. Target novantaquattro-novantotto, ipercapnici ottantotto-novantadue. Occhialini uno-sei litri; maschera semplice mai sotto cinque; reservoir dieci-quindici; Venturi: FiO2 precisa."),
 (19,"chiaro",0,"Con il monossido di carbonio la saturazione e' falsamente normale. Cuffia a venti-trenta. Aspirare solo in risalita, al massimo dieci-quindici secondi. [warm] Nella prossima lezione: diabete e malattie endocrine. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"BPCO e asma",3:"Tre quadri acuti",4:"La toracentesi",5:"L'ossigeno e' un farmaco",6:"Gli occhialini",
 7:"Le maschere",8:"La Venturi",9:"Gli alti flussi",10:"La sicurezza",11:"I limiti del saturimetro",12:"CPAP e NIV",
 13:"L'assistenza in NIV",14:"L'aerosol",15:"La tracheostomia",16:"La broncoaspirazione",17:"Il caso",18:"In Veneto",19:"Chiusura"}

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
