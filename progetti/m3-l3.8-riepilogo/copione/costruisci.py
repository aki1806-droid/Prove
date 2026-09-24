# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo tre, quello che pesa di piu' nella prova pratica. Niente contenuti nuovi: sequenze procedurali, numeri, casi tipici e le confusioni che costano piu' punti."),
 (1,"chiaro",0,"Riguarda questo video dopo lo studio, e poi la settimana prima dell'esame. E' fatto per essere riascoltato: ogni frase e' una cosa da sapere, non una cosa da capire."),

 (2,"chiaro",0,"Sette lezioni, sette bisogni. Igiene e sicurezza dell'ambiente. Mobilita' e sindrome da immobilizzazione. Nutrizione e deglutizione. Nutrizione per sonda, con il sondino e la PEG."),
 (2,"chiaro",0,"Liquidi ed elettroliti, con il bilancio idrico. Eliminazione urinaria, con il catetere. Alvo, dolore e sonno. Sette lezioni che nella prova pratica valgono piu' di tutte le altre messe insieme."),
 (2,"chiaro",0,"Le prime due sono la prova pratica in senso stretto: quello che ti chiedono di fare o di descrivere. Le altre cinque sono quello che ti chiedono di riconoscere, e di non sbagliare quando lo riconosci."),

 (3,"chiaro",0,"Un solo filo. L'assistenza di base non e' base nel senso di semplice: ogni gesto e' anche un accertamento. L'igiene ispeziona la cute, il pasto valuta la deglutizione, lo svuotamento della sacca misura la diuresi."),
 (3,"chiaro",0,"E ogni bisogno trascurato diventa una complicanza: la lesione, la polmonite, la caduta, l'infezione urinaria, il delirium. Nessuna di queste arriva da sola: arriva da un bisogno lasciato indietro."),
 (3,"profondo",1.2,"[serious] Il modulo tre e' prevenzione travestita da routine. Chi lo tratta come routine perde la parte che vale, all'esame e in reparto."),

 (4,"chiaro",0,"Le sequenze, quelle che si recitano senza esitare. Igiene: dal pulito allo sporco, genitali per ultimi. Occhi dall'interno verso l'esterno, un lato del panno per occhio. Perineo femminile dal pube verso l'ano."),
 (4,"chiaro",0,"Prepuzio sempre riposizionato: vale per l'igiene e per il cateterismo. Paziente trovato a terra: non sollevare, valutare, avvisare, segnalare, documentare, rivalutare."),
 (4,"chiaro",0,"Screening della deglutizione: test dell'acqua a volumi crescenti, il cucchiaino prima del bicchiere. Positivo o dubbio: sospendere l'alimentazione orale, segnalare, attivare la logopedia."),

 (5,"chiaro",0,"Sondino naso-gastrico: misurazione NEX, naso, lobo dell'orecchio, xifoide; capo flesso al passaggio faringeo; verifica con pH pari o inferiore a cinque virgola cinque, mai con il solo whoosh test."),
 (5,"chiaro",0,"Alzata sempre in due tempi. Clistere: Sims o fianco sinistro, sonda a sette-dieci centimetri, contenitore a trenta-quarantacinque centimetri. Catetere: non gonfiare il palloncino prima di vedere urina."),
 (5,"chiaro",0,"Cateterismo: calibro minimo, tecnica sterile. Nella donna si deterge dall'alto verso il basso; nell'uomo lubrificante in uretra, pene a sessanta-novanta gradi, fino alla biforcazione. E il sistema chiuso si raccorda subito."),

 (6,"chiaro",0,"I numeri. Cambi posturali ogni due ore a letto, ogni ora in poltrona. Decubito laterale a trenta gradi. Testata a trenta-quarantacinque gradi nel paziente ventilato e durante la nutrizione enterale."),
 (6,"chiaro",0,"E per trenta-sessanta minuti dopo. Trenta minuti seduto dopo il pasto nel disfagico. Sondino fino a quattro-sei settimane, poi la PEG. Palloncino del catetere: si sgonfia con la siringa, mai tagliando la valvola."),
 (6,"chiaro",0,"Cavo orale: due volte al giorno nell'autonomo, ogni quattro-sei ore nel non collaborante, ogni due-quattro nell'intubato. Bristol tre e quattro normali. pH dell'aspirato pari o inferiore a cinque virgola cinque."),

 (7,"chiaro",0,"Fabbisogni: venticinque-trenta chilocalorie e trenta millilitri per chilo al giorno. BMI sotto diciotto e mezzo sottopeso. MUST da due in su rischio alto. Perdite insensibili ottocento-mille millilitri al giorno."),
 (7,"chiaro",0,"Elettroliti: sodio centotrentacinque-centoquarantacinque, potassio tre virgola cinque-cinque, calcio otto virgola cinque-dieci virgola cinque. Intervallo stretto, perche' il potassio governa il ritmo del cuore."),
 (7,"chiaro",0,"Diuresi mezzo millilitro per chilo per ora, oliguria sotto quattrocento-cinquecento, anuria sotto cento. Un chilo, un litro. Sono i numeri che i quiz chiedono secchi: si imparano a memoria, senza vergogna."),
 (7,"chiaro",0,"Catetere dodici-quattordici Charriere. Ripresa della minzione entro sei-otto ore dalla rimozione. Rivalutazione del dolore a quindici-trenta minuti per via endovenosa, trenta-sessanta per via orale."),

 (8,"chiaro",0,"Le confusioni, quelle su cui i distrattori sono costruiti. Uno: le sponde non sono sempre contenzione, dipende dalla finalita'. Due: Sims e' semiprona laterale sinistra, non litotomica."),
 (8,"chiaro",0,"Tre: nella disfagia i liquidi sono piu' pericolosi dei solidi. Quattro: il whoosh test non e' una verifica affidabile. Cinque: la PEG non protegge dall'inalazione."),
 (8,"chiaro",0,"E due trappole di laboratorio. L'albumina bassa in fase acuta e' infiammazione, non solo malnutrizione. Il potassio alto in un campione emolizzato e' un artefatto: si ricontrolla prima di trattare."),

 (9,"chiaro",0,"Sei: la glucosata al cinque per cento non espande il volume. Sette: il catetere non e' una gestione dell'incontinenza. Otto: la diarrea paradossa puo' essere un fecaloma."),
 (9,"chiaro",0,"Nove: il gel alcolico non uccide le spore del Clostridioides difficile. Dieci: il bastone si tiene dal lato sano. Dieci confusioni, dieci punti che si possono non perdere."),
 (9,"chiaro",0,"E la piu' insidiosa: nell'anziano la disidratazione si presenta come confusione, non come sete, e il turgore cutaneo inganna. Chi cerca la sete non la trova, e intanto il sodio sale."),

 (10,"chiaro",0,"Cinque regole di sicurezza che non ammettono eccezioni. Nulla per bocca prima di verificare la deglutizione. Potassio concentrato mai in bolo, sempre diluito, sempre in pompa."),
 (10,"chiaro",0,"Nel dubbio sulla posizione del sondino, non si somministra. Nel sospetto di trombosi, non si massaggia. Contenzione solo eccezionale, prescritta, motivata e documentata."),
 (10,"profondo",1.2,"[serious] Cinque regole, cinque risposte che in un quiz sono sempre giuste. Se un'opzione le contraddice, e' l'opzione sbagliata, per quanto ragionevole sembri."),

 (11,"chiaro",0,"I casi. Paziente trovato a terra: non sollevo, valuto, avviso, segnalo, documento, rivaluto. Chi dice lo rimetto a letto perde la parte che vale."),
 (11,"chiaro",0,"Anziano che non mangia: escludo bocca, farmaci, dolore, stipsi, depressione e delirium, disfagia, organizzazione del pasto, prima di proporre un integratore. La causa prima del rimedio."),
 (11,"chiaro",0,"Paziente con ictus che chiede acqua: prima lo screening della deglutizione. Anche se insiste, anche se ha sete, anche se sembra crudele: un sorso d'acqua in un disfagico e' una polmonite."),
 (11,"chiaro",0,"Persona con la PEG sfilata: la stomia si chiude in poche ore. Copro, non reinserisco dispositivi diversi, avviso subito il medico. Aspetto il turno successivo e' la risposta sbagliata."),

 (12,"chiaro",0,"Anziano confuso con sodio centocinquantadue: e' l'anziano disidratato. Bilancio, peso quotidiano, idratazione su prescrizione con correzione lenta, perche' il sodio corretto in fretta e' un danno neurologico."),
 (12,"chiaro",0,"Catetere da cinque giorni senza motivazione documentata: si rivaluta con il medico e si rimuove. Paziente in PCA sonnolento: la sedazione precede la depressione respiratoria."),
 (12,"chiaro",0,"Oppioide e sonnolenza: frequenza respiratoria, saturazione, avviso, naloxone disponibile. Polpaccio gonfio e dolente in un allettato: non si massaggia, si avvisa il medico: e' una trombosi fino a prova contraria."),

 (13,"chiaro",0,"Due bundle nati in questo modulo e che ritroverai nel prossimo. VAP: testata a trenta-quarantacinque gradi, igiene del cavo orale, aspirazione sub-glottica, controllo della cuffia, interruzione quotidiana della sedazione."),
 (13,"chiaro",0,"CAUTI: indicazione appropriata, inserimento asettico, circuito chiuso, sacca sotto la vescica, rimozione precoce, igiene delle mani. Due pacchetti: si applicano interi."),
 (13,"chiaro",0,"E il bundle della disfagia, che non ha un nome ma ha le stesse regole: seduto a novanta gradi, capo flesso, boccone piccolo, bocca vuota, trenta minuti seduto e igiene del cavo orale dopo il pasto."),

 (14,"chiaro",0,"Gli agganci veneti del modulo. Procedure aziendali su cadute, con segnalazione obbligatoria, e su contenzione, con modulistica dedicata. Screening nutrizionale in cartella con attivazione del Servizio di Dietetica."),
 (14,"chiaro",0,"Nutrizione artificiale domiciliare tramite distretto e assistenza domiciliare integrata, con addestramento del caregiver. Procedura sul potassio concentrato. Bundle CAUTI con motivazione e rivalutazione quotidiana registrate."),
 (14,"chiaro",0,"In cartella elettronica: bilancio idrico con saldo automatico, scale di rischio, motivazione del catetere. All'orale, citare la procedura aziendale vale piu' di citare la linea guida da cui deriva."),

 (15,"chiaro",0,"Come proseguire. Test del modulo, trenta domande, soglia ventuno. Riprendi solo le lezioni segnalate dagli errori. Trasferisci nel quaderno le sequenze e i numeri."),
 (15,"chiaro",0,"E prendi due dei casi che abbiamo visto oggi e scrivili per intero con lo schema in cinque passi della lezione due punto uno: dati, problema, obiettivo, interventi, valutazione."),
 (15,"chiaro",0,"Un consiglio sul metodo: le sequenze si ripassano dicendole ad alta voce, come le diresti all'esaminatore. I numeri si scrivono su un foglio solo, da rileggere il giorno prima."),

 (16,"chiaro",0,"Ci fermiamo qui. Porta via una frase: ogni gesto e' anche un accertamento. E' la frase con cui il modulo si e' aperto, ed e' quella da portare in aula d'esame."),
 (16,"chiaro",0,"[warm] Nel prossimo modulo, le infezioni correlate all'assistenza, ritroverai CAUTI e VAP accanto a CLABSI e infezioni del sito chirurgico, e vedrai che molta della prevenzione l'hai gia' imparata qui. Ci vediamo li'."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"La mappa",3:"Il filo del modulo",4:"Le sequenze, prima parte",5:"Le sequenze, seconda parte",
 6:"I numeri, prima parte",7:"I numeri, seconda parte",8:"Le confusioni, prima parte",9:"Le confusioni, seconda parte",
 10:"Le cinque regole",11:"I casi, prima parte",12:"I casi, seconda parte",13:"I bundle",14:"Dal Veneto",15:"Come proseguire",16:"Chiusura"}
# Deroghe al limite di 225 caratteri, dichiarate una per una con il motivo:
# la voce e' gia' generata e non ha fatto pausa dove il copione staccava, e il
# confine si mette dove la voce si ferma, non dove il copione vorrebbe.
DEROGHE = {}
ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Il principio guida",3:"Indicazioni e controindicazioni",4:"Le vie di accesso",
 5:"Stomaco si', digiuno no",6:"Quando non si procede",7:"Il metodo NEX",8:"Il passaggio faringeo",
 9:"Quando interrompere",10:"La verifica",11:"Verificare sempre",12:"Le modalita'",13:"Le regole di sicurezza",
 14:"I farmaci per sonda",15:"Se non si puo' frantumare",16:"Le complicanze",17:"La sindrome da rialimentazione",
 18:"PEG: la gestione",19:"Se la PEG si sfila",20:"La volonta' della persona"}
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
