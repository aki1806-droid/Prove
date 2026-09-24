# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Tre bisogni in una lezione, e non e' un caso: alvo, dolore e sonno sono i tre ambiti in cui il ricovero peggiora piu' spesso le cose, e in cui l'infermiere ha piu' margine d'azione autonoma."),
 (1,"chiaro",0,"Hanno anche un filo comune: sono tutti e tre fattori scatenanti del delirium nell'anziano. Curarli bene significa prevenire molto altro, e spesso con gesti che non costano nulla."),

 (2,"chiaro",0,"Primo: che cosa e' normale. La frequenza dell'alvo va da tre volte al giorno a tre volte a settimana: un intervallo ampio, che dipende dalla persona."),
 (2,"chiaro",0,"Per descrivere le feci in modo oggettivo si usa la scala di Bristol, con sette tipi: uno e due indicano stipsi, tre e quattro sono normali, da cinque a sette indicano diarrea."),
 (2,"chiaro",0,"Registrare alvo presente non basta: registrare Bristol sei, tre scariche, e' un dato. La differenza fra le due frasi e' la differenza fra un'impressione e un'osservazione."),

 (3,"chiaro",0,"La stipsi e' frequentissima nel ricoverato. Le cause: immobilita', pochi liquidi e fibre, farmaci, soprattutto oppioidi, anticolinergici, ferro, calcio-antagonisti."),
 (3,"chiaro",0,"E un fattore che si dimentica: la mancanza di privacy. Usare la padella in una camera a quattro letti con la tenda tirata e', per molte persone, semplicemente impossibile."),

 (4,"chiaro",0,"Un punto preciso che i quiz chiedono. Agli effetti degli oppioidi si sviluppa tolleranza, alla nausea, alla sedazione, ma non alla stipsi, che dura per tutta la terapia."),
 (4,"profondo",1.2,"[serious] Per questo quando si inizia un oppioide la stipsi si previene fin dal primo giorno con un lassativo su prescrizione. Non si aspetta che compaia."),

 (5,"chiaro",0,"Gli interventi. Liquidi. Fibre, ma solo se l'idratazione e' adeguata, altrimenti peggiorano. Mobilizzazione. Orario regolare, preferibilmente dopo colazione, sfruttando il riflesso gastrocolico."),
 (5,"chiaro",0,"Posizione seduta sul water o sulla comoda, con i piedi rialzati su uno sgabello, che raddrizza l'angolo ano-rettale. Privacy. E i lassativi su prescrizione: osmotici, stimolanti, emollienti."),
 (5,"chiaro",0,"Con un'avvertenza: i lassativi formanti massa sono controindicati nel paziente immobile e poco idratato. Senza acqua, la massa che dovrebbe aiutare diventa un tappo."),

 (6,"chiaro",0,"Il fecaloma, una massa di feci indurite nel retto. Il segno che inganna e' la diarrea paradossa: feci liquide che filtrano intorno alla massa e sembrano diarrea. Trattarla con un antidiarroico sarebbe un errore grave."),
 (6,"chiaro",0,"Nell'anziano il fecaloma puo' presentarsi con confusione e con ritenzione urinaria: due quadri che sembrano altro. Si conferma con l'esplorazione rettale."),
 (6,"chiaro",0,"E la rimozione manuale va eseguita secondo indicazione e con cautela, perche' la stimolazione vagale puo' provocare bradicardia. Si controlla il polso, e ci si ferma se cala."),

 (7,"chiaro",0,"Il clistere evacuativo. Posizione di Sims o laterale sinistra, come nella lezione tre punto due. Liquido a temperatura corporea. Sonda lubrificata, introdotta per sette-dieci centimetri nell'adulto, verso l'ombelico."),
 (7,"chiaro",0,"Contenitore a trenta-quarantacinque centimetri sopra l'ano: piu' in alto, il flusso e' troppo rapido. Infusione lenta; se compaiono crampi, ci si ferma e si abbassa il contenitore. Trattenere per cinque-quindici minuti."),
 (7,"chiaro",0,"Controindicazioni: addome acuto, chirurgia colorettale recente, grave neutropenia o piastrinopenia. Un clistere non e' mai un gesto innocuo: e' una procedura, con le sue esclusioni."),

 (8,"chiaro",0,"La diarrea: tre o piu' scariche non formate nelle ventiquattro ore. I rischi assistenziali sono tre: disidratazione, perdita di potassio, e la dermatite associata a incontinenza."),
 (8,"chiaro",0,"La dermatite va distinta dalla lesione da pressione e si previene con detergenti delicati e prodotti barriera. Le cause, oltre alle infezioni: antibiotici, nutrizione enterale, farmaci, e il fecaloma che abbiamo appena visto."),

 (9,"chiaro",0,"E la diarrea da Clostridioides difficile, che va sospettata in ogni diarrea insorta durante o dopo una terapia antibiotica. Il punto che vale una domanda sicura: il gel alcolico non uccide le spore."),
 (9,"profondo",1.2,"[serious] Per il Clostridioides difficile le mani si lavano con acqua e sapone, che rimuovono meccanicamente le spore. Il gel, qui, non basta."),
 (9,"chiaro",0,"Poi: precauzioni da contatto, stanza singola, disinfezione con prodotti a base di cloro, attrezzature dedicate, e niente antiperistaltici. Il campione si invia solo se le feci sono non formate. Torna nel modulo quattro."),

 (10,"chiaro",0,"Passiamo al dolore. La legge trentotto del duemiladieci, sull'accesso alle cure palliative e alla terapia del dolore, prevede che la rilevazione del dolore sia riportata in cartella clinica."),
 (10,"chiaro",0,"Caratteristiche, evoluzione, tecnica antalgica, risultato. Il dolore non e' un'opinione dell'operatore. E il principio lo conosci dalla lezione due punto tre: il dolore e' cio' che la persona dice che e'."),

 (11,"chiaro",0,"Oltre all'intensita', il dolore si descrive. Lo schema piu' semplice e' PQRST. P: che cosa lo provoca e che cosa lo allevia. Q: la qualita', trafittivo, urente, sordo, crampiforme."),
 (11,"chiaro",0,"R: dove si irradia. S: la severita', con la scala adatta alla persona. T: il tempo, quando e' iniziato, se e' continuo o intermittente. Una descrizione cosi' orienta diagnosi e terapia molto piu' di un numero da solo."),

 (12,"chiaro",0,"I tipi. Nocicettivo, da stimolo su tessuti integri: somatico, ben localizzato, e viscerale, sordo e mal localizzato. Neuropatico, da lesione del sistema nervoso: bruciore, scossa, formicolio; risponde poco agli analgesici."),
 (12,"chiaro",0,"Acuto e cronico. E il dolore episodico intenso, il breakthrough pain: picchi che emergono nonostante una terapia di base efficace, tipici del paziente oncologico, e che vanno previsti con una dose al bisogno."),

 (13,"chiaro",0,"La scala analgesica dell'OMS, nata per il dolore oncologico e ancora molto chiesta. Primo gradino: farmaci non oppioidi, paracetamolo, antinfiammatori, con eventuali adiuvanti."),
 (13,"chiaro",0,"Secondo gradino: oppioidi deboli. Terzo gradino: oppioidi forti, come la morfina. Gli adiuvanti, antidepressivi, anticonvulsivanti, corticosteroidi, si aggiungono a ogni gradino, soprattutto nel dolore neuropatico."),

 (14,"chiaro",0,"La terapia al bisogno e' il punto in cui l'infermiere decide quando somministrare, e per questo la prescrizione deve essere completa: farmaco, dose, via, la condizione, per esempio se NRS superiore a quattro."),
 (14,"chiaro",0,"E poi l'intervallo minimo fra le dosi e la dose massima nelle ventiquattro ore. Una prescrizione al bisogno e basta non e' eseguibile in sicurezza."),
 (14,"chiaro",0,"Dopo la somministrazione si rivaluta il dolore al momento dell'effetto atteso: indicativamente quindici-trenta minuti per la via endovenosa, trenta-sessanta per quella orale. Senza rivalutazione, il processo non e' chiuso."),

 (15,"chiaro",0,"La PCA, analgesia controllata dal paziente: una pompa che eroga un bolo quando la persona preme un pulsante, con un intervallo di blocco, il lockout, in cui nuove pressioni non hanno effetto, e una dose massima oraria."),
 (15,"profondo",1.2,"[serious] La sicurezza si basa su un principio: solo il paziente preme il pulsante. Se e' sedato, non preme, e il sistema si protegge da solo. Se lo preme un familiare per aiutarlo, la protezione salta."),
 (15,"chiaro",0,"La sorveglianza riguarda sedazione e frequenza respiratoria: la sedazione compare prima della depressione respiratoria, ed e' il segnale da cogliere, con il naloxone disponibile."),

 (16,"chiaro",0,"E accanto ai farmaci, gli interventi non farmacologici, che sono di competenza infermieristica autonoma. Il posizionamento corretto. Caldo o freddo, su indicazione. La distrazione, le tecniche di rilassamento e respirazione."),
 (16,"chiaro",0,"E l'informazione: un dolore che si capisce fa meno paura, e la paura amplifica il dolore. Spiegare che cosa sta succedendo e' gia' un analgesico."),

 (17,"chiaro",0,"Il sonno. L'ospedale e' uno dei posti peggiori in cui dormire: rumore, luce, allarmi, attivita' notturne, parametri, terapie, prelievi, dolore, nicturia, ansia, un letto e una stanza sconosciuti."),
 (17,"chiaro",0,"E la privazione di sonno non e' un disagio: e' un fattore che contribuisce al delirium, alle cadute e al rallentamento della guarigione. Chi non dorme guarisce piu' piano."),

 (18,"chiaro",0,"Gli interventi, quasi tutti organizzativi. Raggruppare le attivita' notturne: e' davvero necessario rilevare la pressione alle tre? Ridurre rumore e luce: voci basse, allarmi gestiti, luci soffuse."),
 (18,"chiaro",0,"Luce naturale di giorno, per sincronizzare il ritmo. Limitare i pisolini diurni lunghi. Niente caffeina serale. Controllare dolore e nicturia, magari anticipando il diuretico al mattino. Rispettare i rituali della persona."),

 (19,"chiaro",0,"E una cautela importante. Nell'anziano gli ipnotici, benzodiazepine in testa, aumentano cadute, delirium e sedazione diurna. Non sono vietati, ma vengono dopo gli interventi non farmacologici, non prima."),
 (19,"tenue",0,"E l'infermiere che somministra un ipnotico al bisogno a un anziano sa di dover alzare il livello di sorveglianza sul rischio di caduta: ricordi la lezione tre punto uno."),

 (20,"chiaro",0,"Ricapitoliamo. Bristol tre e quattro sono normali. Con gli oppioidi, lassativo dal primo giorno. La diarrea paradossa puo' essere un fecaloma. Contro il Clostridioides difficile, acqua e sapone, non gel."),
 (20,"chiaro",0,"Il dolore si rileva e si registra, per legge. La terapia al bisogno richiede una prescrizione completa e una rivalutazione. Nella PCA preme solo il paziente, e si sorveglia la sedazione."),
 (20,"chiaro",0,"[warm] E il sonno si protegge soprattutto organizzando meglio la notte. Nella prossima lezione ricomponiamo tutto il modulo tre. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"L'alvo normale e Bristol",3:"La stipsi",4:"Oppioidi e stipsi",5:"Gli interventi sulla stipsi",
 6:"Il fecaloma",7:"Il clistere",8:"La diarrea",9:"Clostridioides difficile",10:"Il dolore: obbligo e principio",
 11:"PQRST",12:"I tipi di dolore",13:"La scala OMS",14:"La terapia al bisogno",15:"La PCA",
 16:"Gli interventi non farmacologici",17:"Il sonno in ospedale",18:"L'igiene del sonno",19:"Gli ipnotici nell'anziano",20:"Chiusura"}
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
