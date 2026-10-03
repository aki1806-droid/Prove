# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La preparazione all'intervento e' fatta di passaggi che sembrano di routine, e che invece determinano la sicurezza della persona in sala e l'andamento del post-operatorio."),
 (1,"chiaro",0,"E' una delle aree in cui i concorsi chiedono numeri precisi, le ore di digiuno, i tempi della profilassi, e in cui alcune vecchie abitudini sono state rovesciate dalle evidenze."),

 (2,"chiaro",0,"L'accertamento. Anamnesi, allergie a farmaci, lattice, cerotti, disinfettanti, terapia domiciliare con la ricognizione della lezione cinque punto quattro. Parametri, peso e altezza, che servono a calcolare farmaci e liquidi."),
 (2,"chiaro",0,"Esami secondo indicazione: emocromo, coagulazione, ECG, gruppo sanguigno. Rischio di caduta, di lesioni da pressione, stato nutrizionale: un paziente malnutrito ha piu' complicanze e guarisce peggio."),
 (2,"chiaro",0,"E la valutazione dell'anestesista, che classifica il rischio con la scala ASA: dalla classe uno, persona sana, alle classi piu' alte per malattie sistemiche via via piu' gravi."),

 (3,"chiaro",0,"Il digiuno, con i numeri da sapere. Solidi: sei ore, di piu' dopo un pasto grasso. Liquidi chiari, acqua, te', camomilla, bevande con carboidrati, senza latte ne' polpa: fino a due ore prima."),
 (3,"chiaro",0,"I liquidi chiari sono quelli attraverso cui si legge: il latte no, perche' nello stomaco si comporta come un solido. Nel lattante, latte materno quattro ore, latte artificiale sei."),
 (3,"chiaro",0,"Il vecchio digiuno dalla mezzanotte per tutti non e' raccomandato: aumenta sete, ansia, disidratazione e insulino-resistenza, senza ridurre il rischio di inalazione. Si segue la prescrizione dell'anestesista e il protocollo."),

 (4,"chiaro",0,"La tricotomia. Si esegue solo se necessaria, cioe' se i peli interferiscono con l'intervento. Si usa il clipper elettrico, mai il rasoio, che provoca microlesioni invisibili, subito colonizzate dai batteri."),
 (4,"chiaro",0,"Si esegue il piu' vicino possibile all'intervento, il giorno stesso, e fuori dalla sala operatoria."),
 (4,"chiaro",0,"E' uno degli esempi piu' chiari di pratica tradizionale smentita dalle evidenze: lo abbiamo visto nel bundle della lezione sette punto quattro."),

 (5,"chiaro",0,"L'igiene preoperatoria. Doccia con sapone o con antisettico, secondo il protocollo aziendale, la sera prima o la mattina dell'intervento, con attenzione all'ombelico, alle pieghe cutanee e alla sede dell'intervento."),
 (5,"chiaro",0,"Biancheria pulita. Igiene del cavo orale. E rimozione di smalto, gioielli, piercing, per il rischio di ustioni con l'elettrobisturi, e trucco."),
 (5,"chiaro",0,"Lo smalto e le unghie finte si tolgono almeno da un dito: il saturimetro legge attraverso l'unghia, e nella lezione otto punto due abbiamo visto quanto e' facile ingannarlo."),

 (6,"chiaro",0,"La profilassi antibiotica. Si somministra entro sessanta minuti prima dell'incisione, perche' il farmaco deve essere nei tessuti nel momento in cui si apre la cute."),
 (6,"chiaro",0,"Per alcuni antibiotici, come la vancomicina, che si infonde lentamente, la finestra si allarga a centoventi minuti."),
 (6,"chiaro",0,"Di solito basta una dose singola, da ripetere se l'intervento si prolunga o se la perdita di sangue e' importante. Non si prolunga oltre le ventiquattro ore senza indicazione: la stewardship della lezione quattro punto sei."),

 (7,"chiaro",0,"La profilassi antitrombotica. Si valuta il rischio trombotico, insieme a quello emorragico. La profilassi meccanica: calze a compressione graduata, compressione pneumatica intermittente e soprattutto mobilizzazione precoce."),
 (7,"chiaro",0,"Le calze si misurano e si indossano bene: una calza arrotolata sotto il ginocchio stringe come un laccio, e fa il contrario di quello che dovrebbe. Quella farmacologica: eparina a basso peso molecolare secondo prescrizione."),
 (7,"chiaro",0,"Un dettaglio di sicurezza: se e' prevista un'anestesia spinale o peridurale, i tempi dell'eparina rispetto alla puntura e alla rimozione del catetere sono definiti dal protocollo, per il rischio di ematoma spinale."),

 (8,"chiaro",0,"La terapia domiciliare, che l'infermiere verifica con la lista dell'anestesista. Gli anticoagulanti, warfarin e DOAC, si sospendono con tempi definiti, a volte con una terapia ponte."),
 (8,"chiaro",0,"Gli antiaggreganti richiedono una decisione specialistica, soprattutto nei portatori di stent, come abbiamo visto nella lezione cinque punto cinque."),
 (8,"chiaro",0,"Metformina e inibitori SGLT2 si sospendono secondo protocollo. L'insulina si adatta, ma la basale nel diabetico di tipo uno non si sospende mai del tutto. ACE-inibitori e sartani sono spesso omessi il giorno dell'intervento."),
 (8,"chiaro",0,"La ricognizione e' il momento in cui emergono i farmaci che il paziente non considera tali: integratori, erbe, antinfiammatori da banco che aumentano il sanguinamento. Si chiede, non si aspetta che lo dica."),

 (9,"chiaro",0,"E che cosa si continua. I beta-bloccanti, di norma, per il rischio di rimbalzo con tachicardia e ischemia. Farmaci per la tiroide, antiepilettici, levodopa si assumono con un sorso d'acqua anche il giorno dell'intervento."),
 (9,"chiaro",0,"I corticosteroidi cronici si continuano, a volte con una dose aggiuntiva, per il rischio di crisi surrenalica della lezione otto punto tre."),
 (9,"chiaro",0,"Sempre secondo la prescrizione dell'anestesista: l'infermiere non decide, ma verifica che ci sia un'indicazione per ogni farmaco."),

 (10,"chiaro",0,"Il consenso informato, che abbiamo visto nella lezione uno punto sei. E' acquisito dal medico: il chirurgo per l'intervento, l'anestesista per l'anestesia. L'infermiere verifica che sia presente, completo e firmato."),
 (10,"chiaro",0,"E se la persona esprime dubbi, o dice di non aver capito, l'infermiere non risponde al posto del medico: lo informa, prima dell'intervento. Il consenso e' revocabile fino all'ultimo momento."),

 (11,"chiaro",0,"Il giorno dell'intervento. Identificazione e braccialetto. Verifica del digiuno. Rimozione di protesi dentarie mobili, lenti a contatto, gioielli."),
 (11,"chiaro",0,"Il braccialetto si controlla con la domanda aperta, come si chiama, quando e' nato, non con «lei e' il signor Rossi?»: e' la Raccomandazione tre della lezione precedente."),
 (11,"chiaro",0,"Gli apparecchi acustici e gli occhiali spesso si tengono fino in sala, per permettere alla persona di comunicare, secondo indicazione. Minzione prima del trasferimento. Parametri. Marcatura del sito presente."),
 (11,"chiaro",0,"Premedicazione secondo prescrizione, e dopo una premedicazione sedativa la persona non si alza da sola. Check-list di reparto compilata e documentazione completa: consenso, esami, immagini."),

 (12,"chiaro",0,"L'ansia. Non e' solo un disagio: un'ansia preoperatoria elevata aumenta il dolore postoperatorio, il consumo di analgesici e la nausea."),
 (12,"chiaro",0,"Lo strumento piu' efficace per ridurla e' l'informazione strutturata: che cosa succedera', come si sentira' al risveglio, come sara' gestito il dolore, quando potra' mangiare e alzarsi."),
 (12,"chiaro",0,"Poi accoglienza, ascolto, presenza dei familiari secondo possibilita'. Una persona informata collabora meglio, anche nella mobilizzazione precoce dell'ERAS."),

 (13,"chiaro",0,"L'educazione preoperatoria prepara il post-operatorio. Si insegnano gli esercizi di respirazione profonda e l'uso dello spirometro incentivante, la tosse efficace sostenendo la ferita con un cuscino."),
 (13,"chiaro",0,"Lo spirometro si prova prima: dieci respiri profondi ogni ora da svegli, tenendo l'indicatore sollevato qualche secondo. Si impara quando non fa male, e dopo si fa anche se fa male."),
 (13,"chiaro",0,"Gli esercizi delle gambe, come alzarsi dal letto girandosi sul fianco, l'uso della scala del dolore e, se prevista, della PCA. E si incoraggia l'abbandono del fumo."),
 (13,"profondo",1.2,"[thoughtful] Imparare prima e' molto piu' facile che imparare con il dolore."),

 (14,"chiaro",0,"Il caso. Paziente in lista per un intervento alle quattordici; alle sette chiede un caffe', e nessuno gli ha detto nulla del digiuno. Che cosa fai?"),
 (14,"chiaro",0,"Verifichi la prescrizione dell'anestesista e il protocollo: se e' consentito, la persona puo' bere liquidi chiari fino a due ore prima. Un caffe' senza latte rientra spesso fra i liquidi chiari; un cappuccino no."),
 (14,"chiaro",0,"Se non e' consentito, spieghi il motivo. In ogni caso documenti l'orario dell'ultima assunzione, che e' un dato fondamentale per l'anestesista."),

 (15,"chiaro",0,"In Veneto molti interventi programmati passano da un prericovero, in cui si eseguono esami, valutazione anestesiologica ed educazione prima dell'ingresso, riducendo la degenza."),
 (15,"chiaro",0,"I protocolli aziendali definiscono digiuno, tricotomia, profilassi e gestione della terapia, e la check-list preoperatoria di reparto accompagna il paziente fino al blocco operatorio."),

 (16,"chiaro",0,"La tabella. Solidi sei ore, liquidi chiari due, latte materno quattro, artificiale sei. Tricotomia solo se necessaria, con clipper, il giorno stesso. Profilassi antibiotica entro sessanta minuti."),
 (16,"chiaro",0,"Beta-bloccanti continuati, antiaggreganti con decisione specialistica. Consenso: lo acquisisce il medico, l'infermiere lo verifica."),

 (17,"chiaro",0,"[warm] Nella prossima lezione entriamo in sala operatoria: i tipi di anestesia, il posizionamento sul letto operatorio, la normotermia e la conta di garze e strumenti. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"L'accertamento",3:"Il digiuno",4:"La tricotomia",5:"L'igiene",6:"La profilassi antibiotica",7:"La profilassi antitrombotica",
 8:"Che cosa si sospende",9:"Che cosa si continua",10:"Il consenso",11:"Il giorno dell'intervento",12:"L'ansia",13:"L'educazione",14:"Il caso",15:"In Veneto",16:"La tabella",17:"Chiusura"}

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
