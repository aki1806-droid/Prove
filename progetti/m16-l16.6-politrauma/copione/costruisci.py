# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il politrauma e' il caso in cui l'approccio XABCDE della lezione dieci punto sette mostra tutta la sua forza: un paziente con piu' lesioni, ognuna potenzialmente mortale."),
 (1,"chiaro",0,"E un'equipe che deve affrontarle nell'ordine giusto. Seguiamo un giovane motociclista dall'arrivo in pronto soccorso alla sala operatoria, con alcuni dettagli tecnici che i concorsi chiedono spesso."),

 (2,"chiaro",0,"Lo scenario. Ore ventitre e dieci. Un uomo di trentadue anni, incidente in moto ad alta velocita', centralizzato dal centodiciotto al centro traumi."),
 (2,"chiaro",0,"Sul posto sono stati applicati un tourniquet alla coscia destra, alle ventidue e trentacinque, il collare cervicale e la tavola spinale. All'arrivo e' agitato."),
 (2,"chiaro",0,"Frequenza respiratoria trentaquattro, saturazione ottantasei con l'ossigeno, murmure assente a sinistra, trachea deviata a destra, giugulari turgide. Pressione settantotto su cinquanta, frequenza centoquarantadue."),
 (2,"chiaro",0,"Il bacino e' doloroso. C'e' sangue al meato uretrale. Temperatura trentacinque virgola due. Fermati un momento: con quale ordine affronti questi problemi?"),

 (3,"chiaro",0,"X, l'emorragia esterna massiva. Si verifica che il tourniquet sia efficace: nessun sanguinamento dalla ferita, e polso distale assente. E non si allenta."),
 (3,"chiaro",0,"L'ora di applicazione, le ventidue e trentacinque, si annota e si comunica a tutta l'equipe: dice da quanto tempo l'arto e' senza circolazione. Altre emorragie esterne: compressione diretta e medicazioni emostatiche."),

 (4,"chiaro",0,"A: le vie aeree sono pervie, perche' il paziente parla. E si protegge il rachide cervicale, mantenendo il collare e muovendo il paziente in asse."),
 (4,"chiaro",0,"B: dispnea, desaturazione, murmure assente a sinistra, trachea deviata, giugulari turgide e ipotensione. E' uno pneumotorace iperteso, una delle quattro T della lezione dieci punto tre."),
 (4,"chiaro",0,"L'aria accumulata nel torace comprime il polmone e il cuore. Il medico esegue una decompressione immediata, poi si posiziona un drenaggio toracico, con le regole della lezione sette punto sette."),
 (4,"chiaro",0,"L'infermiere prepara il materiale e sorveglia la risposta: saturazione e pressione devono migliorare rapidamente."),

 (5,"chiaro",0,"C. Dopo il drenaggio la saturazione sale a novantacinque, ma la pressione resta ottantaquattro su cinquantadue, e la frequenza centotrentasei: lo shock emorragico persiste."),
 (5,"chiaro",0,"Dove sanguina? Le sedi tipiche sono il torace, l'addome, il bacino e le ossa lunghe. In sala emergenza si esegue un'ecografia FAST, alla ricerca di sangue libero."),
 (5,"chiaro",0,"Il bacino doloroso e instabile richiede una fascia pelvica, all'altezza dei grandi trocanteri: chiude l'anello pelvico e riduce il sanguinamento. Due accessi di grosso calibro, o un intraosseo, e prelievi con il gruppo."),

 (6,"chiaro",0,"La terapia dello shock emorragico, secondo prescrizione. Si attiva il protocollo di trasfusione massiva: emazie, plasma e piastrine in rapporto bilanciato, perche' si perde sangue intero, non solo globuli rossi."),
 (6,"chiaro",0,"Emocomponenti e liquidi riscaldati. L'acido tranexamico, un farmaco che riduce la dissoluzione del coagulo, il prima possibile ed entro tre ore dal trauma."),
 (6,"chiaro",0,"I cristalloidi si usano con cautela, perche' diluiscono i fattori della coagulazione. E l'obiettivo e' uno solo: portare rapidamente il paziente al controllo dell'emorragia, in sala operatoria o in angiografia."),

 (7,"chiaro",0,"D: GCS tredici, pupille, segni di lato, glicemia, e una sorveglianza neurologica ravvicinata per un possibile trauma cranico. E: esposizione completa per cercare lesioni nascoste, con il log roll e il controllo del rachide."),
 (7,"chiaro",0,"E poi l'ipotermia: trentacinque virgola due gradi, in un traumatizzato, non sono un dettaglio. Via gli indumenti bagnati; coperte termiche e riscaldamento attivo, liquidi caldi, un ambiente caldo."),

 (8,"chiaro",0,"[thoughtful] Un approfondimento: la triade letale del trauma. L'ipotermia altera la coagulazione. L'acidosi, dovuta all'ipoperfusione, peggiora la coagulazione e la funzione del cuore."),
 (8,"chiaro",0,"La coagulopatia aumenta il sanguinamento, che aggrava lo shock, che aumenta acidosi e ipotermia. E' un circolo vizioso, che uccide anche quando le singole lesioni sarebbero trattabili."),
 (8,"chiaro",0,"Si interrompe con il controllo rapido dell'emorragia, gli emocomponenti bilanciati, il riscaldamento, e il damage control: in sala si fa solo cio' che serve a fermare il sanguinamento e la contaminazione."),
 (8,"chiaro",0,"Il paziente si corregge in terapia intensiva, e l'intervento definitivo si esegue dopo. Ecco perche' un grado di temperatura, in questo paziente, e' un intervento salvavita."),

 (9,"chiaro",0,"[serious] E ora due dettagli tecnici che i concorsi amano: due dispositivi da non posizionare. Il primo e' il catetere vescicale."),
 (9,"chiaro",0,"Con sangue al meato uretrale, un ematoma perineale o una frattura del bacino, si sospetta una lesione dell'uretra. E il catetere non si posiziona senza una valutazione specialistica."),
 (9,"chiaro",0,"Perche' potrebbe trasformare una lesione parziale in completa. Il secondo e' il sondino naso-gastrico, se si sospetta una frattura della base cranica."),
 (9,"chiaro",0,"Cioe' perdita di liquido da naso o orecchie, ecchimosi intorno agli occhi o dietro le orecchie. Non si usa la via nasale, ma eventualmente quella oro-gastrica, come nella lezione tre punto quattro."),

 (10,"chiaro",0,"Il trasferimento in sala operatoria o in angiografia: con il monitor, il defibrillatore, l'ossigeno, gli emocomponenti in corso, e il drenaggio toracico, che nel trasporto non si clampa, come nella lezione sette punto sette."),
 (10,"chiaro",0,"Le consegne SBAR: la dinamica, l'ora del tourniquet, gli interventi eseguiti, emocomponenti e farmaci con i loro orari, parametri e temperatura. Nel trauma, la documentazione dei tempi e' parte della cura."),

 (11,"chiaro",0,"La famiglia e l'equipe. I familiari in pronto soccorso hanno bisogno di un operatore dedicato, di un luogo riservato e di informazioni dal medico. La cosa piu' difficile, per loro, e' restare senza notizie."),
 (11,"chiaro",0,"Gli effetti personali si inventariano e si custodiscono. E dopo un evento cosi' intenso, un breve debriefing dell'equipe aiuta a migliorare e a gestire lo stress, che fa parte del lavoro in emergenza."),

 (12,"chiaro",0,"Gli errori. Allentare il tourniquet per controllare, o non annotarne l'ora. Aspettare la radiografia per trattare uno pneumotorace iperteso, che e' una diagnosi clinica. Dimenticare il bacino."),
 (12,"chiaro",0,"Infondere grandi quantita' di cristalloidi freddi. Trascurare l'ipotermia. Posizionare il catetere con sangue al meato. Il sondino nasale con una sospetta frattura della base cranica."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: che cosa significa XABCDE? E' l'ABCDE del trauma, preceduto dalla X: il controllo dell'emorragia esterna massiva."),
 (13,"chiaro",0,"Perche' un'emorragia di questo tipo uccide in pochi minuti, prima ancora di un problema delle vie aeree. Seconda: quali sono i segni dello pneumotorace iperteso?"),
 (13,"chiaro",0,"Dispnea, desaturazione, murmure assente da un lato, trachea deviata dalla parte opposta, giugulari turgide, ipotensione. Si tratta con la decompressione immediata."),
 (13,"chiaro",0,"Terza: quando non si posizionano catetere o sondino? Il catetere con sangue al meato uretrale o sospetta lesione dell'uretra; il sondino nasale con sospetta frattura della base cranica."),

 (14,"chiaro",0,"La risposta modello. Politraumatizzato con emorragia di un arto controllata da tourniquet, pneumotorace iperteso, shock emorragico, bacino instabile e ipotermia. Applico l'approccio XABCDE in equipe."),
 (14,"chiaro",0,"Verifico il tourniquet senza allentarlo, e ne comunico l'ora. Mantengo la protezione del rachide. Collaboro alla decompressione e al drenaggio toracico."),
 (14,"chiaro",0,"Posiziono due accessi di grosso calibro, eseguo prelievi con gruppo, collaboro all'eco-FAST e alla fascia pelvica. Somministro emocomponenti in rapporto bilanciato e acido tranexamico entro tre ore, con liquidi riscaldati."),
 (14,"chiaro",0,"Valuto GCS, pupille e glicemia; prevengo l'ipotermia. Non posiziono il catetere, per il sangue al meato. Preparo il trasferimento monitorato, trasmetto consegne SBAR con tutti gli orari, assisto i familiari e documento."),

 (15,"chiaro",0,"I collegamenti. Il sondino con la tre punto quattro. Il catetere con la tre punto sei. La trasfusione con la sei punto sei. Il drenaggio toracico con la sette punto sette."),
 (15,"chiaro",0,"Le cause reversibili con la dieci punto tre. Il trauma con la dieci punto sette. E la rete trauma veneta con la tredici punto tre."),

 (16,"chiaro",0,"Il lavoro in equipe. Il trauma team si organizza prima dell'arrivo, grazie alla pre-allerta del centodiciotto: un leader, e ruoli assegnati. Si comunica a ciclo chiuso. Un infermiere registra tempi e interventi."),
 (16,"chiaro",0,"E il materiale e' gia' pronto: emocomponenti, riscaldatori, fascia pelvica, set per il drenaggio, dispositivo intraosseo. Nel trauma, la preparazione vale quanto l'esecuzione."),

 (17,"profondo",1.2,"[serious] La frase del caso: nel trauma, l'ordine delle priorita' salva la vita piu' della velocita'."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: un grande ustionato, con il calcolo dei liquidi con la formula di Parkland, una trappola sugli orari, e le vie aeree che si chiudono. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"X: l'emorragia esterna massiva",4:"A e B: lo pneumotorace iperteso",
 5:"C: lo shock emorragico",6:"C: la trasfusione e l'acido tranexamico",7:"D ed E",8:"La triade letale",
 9:"Due dispositivi da non posizionare",10:"Il trasferimento in sala",11:"La famiglia e l'equipe",
 12:"Gli errori da evitare",13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",
 16:"Il lavoro in equipe",17:"La frase del caso",18:"Chiusura"}

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
