# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Lo shock e' uno stato in cui i tessuti non ricevono abbastanza ossigeno. Ha cause diverse, ma una conseguenza comune: se non viene corretto, gli organi cedono uno dopo l'altro."),
 (1,"chiaro",0,"La sepsi e' la causa piu' frequente di shock in ospedale, e ha una caratteristica che la rende insidiosa: all'inizio puo' sembrare poca cosa."),
 (1,"chiaro",0,"Ed e' una corsa contro il tempo: ogni ora di ritardo nel trattamento aumenta la mortalita'. In questa lezione: i quattro tipi di shock, i segni, e la sepsi, dal riconoscimento alla prima ora."),

 (2,"chiaro",0,"Quattro tipi di shock. Ipovolemico: manca il volume. Emorragia, disidratazione grave, ustioni estese: il contenitore e' integro, ma il contenuto non basta."),
 (2,"chiaro",0,"Cardiogeno: il cuore non pompa. Un infarto esteso, le aritmie: il volume c'e', ma la pompa non lo spinge."),
 (2,"chiaro",0,"Distributivo: i vasi si dilatano, e il sangue non basta piu' a riempirli. Lo shock settico, quello anafilattico, quello neurogeno da lesione del midollo."),
 (2,"chiaro",0,"Ostruttivo: qualcosa ostacola il flusso. Embolia polmonare, tamponamento cardiaco, pneumotorace iperteso: le quattro T della lezione dieci punto tre, in gran parte."),

 (3,"chiaro",0,"I segni. La tachicardia, che e' precoce. La tachipnea. Il riempimento capillare lento. La cute fredda, pallida e sudata."),
 (3,"chiaro",0,"Con un'eccezione: nella fase iniziale dello shock distributivo la cute puo' essere calda e arrossata, perche' i vasi sono dilatati. Poi l'oliguria, e la coscienza alterata, dall'agitazione alla confusione."),
 (3,"chiaro",0,"L'ipotensione, sistolica sotto novanta o media sotto sessantacinque, e' tardiva. I lattati sopra due indicano sofferenza dei tessuti."),
 (3,"chiaro",0,"E un indice semplice: l'indice di shock, la frequenza cardiaca divisa per la sistolica. Sopra uno, e' un campanello d'allarme, anche quando la pressione sembra ancora normale."),

 (4,"chiaro",0,"Il trattamento dipende dal tipo, ed e' per questo che distinguerli conta. Ipovolemico: fermare la perdita, e ripristinare il volume con liquidi ed emocomponenti."),
 (4,"chiaro",0,"Cardiogeno: liquidi con cautela, perche' un cuore che non pompa va in edema polmonare, e farmaci inotropi. Distributivo: liquidi e vasopressori, come la noradrenalina."),
 (4,"chiaro",0,"Nell'anafilassi, l'adrenalina intramuscolo della lezione cinque punto sei. Ostruttivo: rimuovere l'ostacolo. Decompressione del pneumotorace, drenaggio del pericardio, trombolisi nell'embolia."),

 (5,"chiaro",0,"L'assistenza comune a tutti gli shock. ABCDE, ossigeno, due accessi venosi di grosso calibro. Prelievi: emocromo, gruppo, coagulazione, lattati, emocolture se si sospetta un'infezione."),
 (5,"chiaro",0,"Monitoraggio continuo: parametri, ECG, saturazione. E la diuresi oraria, con il catetere: e' un indicatore diretto della perfusione degli organi."),
 (5,"chiaro",0,"Posizione supina, con sollevamento passivo delle gambe se indicato: il Trendelenburg non e' piu' raccomandato di routine. Prevenire l'ipotermia. E documentare i tempi."),

 (6,"chiaro",0,"La sepsi, secondo la definizione internazionale attuale: una disfunzione d'organo potenzialmente letale, causata da una risposta disregolata dell'organismo a un'infezione."),
 (6,"chiaro",0,"Il punto e' in quella parola, disregolata: non e' l'infezione in se' a uccidere, ma la reazione eccessiva del corpo, che danneggia i propri organi: i reni, i polmoni, il cervello."),
 (6,"chiaro",0,"Lo shock settico e' la sepsi in cui servono vasopressori per tenere la pressione media almeno a sessantacinque, con lattati sopra due nonostante i liquidi."),

 (7,"chiaro",0,"Il riconoscimento, dove l'infermiere conta di piu'. Si sospetta la sepsi quando a un'infezione, nota o sospetta, si associano segni di disfunzione d'organo."),
 (7,"chiaro",0,"Un vecchio strumento, il qSOFA, ha tre criteri: frequenza respiratoria da ventidue in su, stato mentale alterato, sistolica pari o sotto cento. Oggi lo si affianca a strumenti piu' sensibili, come la NEWS2."),
 (7,"chiaro",0,"I segni da cercare: confusione nuova, oliguria, desaturazione, tachicardia, febbre. Oppure ipotermia, che nella sepsi e' un segno di gravita'. E la cute marezzata."),

 (8,"chiaro",0,"Il bundle della prima ora: cio' che va avviato entro un'ora dal riconoscimento. Uno: i lattati, ripetuti se elevati. Due: le emocolture prima dell'antibiotico, con le regole della lezione sei punto sette, ma senza ritardarlo."),
 (8,"chiaro",0,"Tre: l'antibiotico ad ampio spettro. Quattro: i liquidi cristalloidi, indicativamente trenta millilitri per chilo se c'e' ipotensione, o lattati da quattro in su."),
 (8,"chiaro",0,"Cinque: i vasopressori, se l'ipotensione persiste nonostante i liquidi, per una pressione media di almeno sessantacinque. Entro un'ora si avvia: non si deve aver finito."),

 (9,"chiaro",0,"Un promemoria molto usato e' il modello britannico Sepsis Six, che divide le azioni in due gruppi. Tre da dare: ossigeno, liquidi, antibiotici."),
 (9,"chiaro",0,"Tre da prelevare o misurare: emocolture, lattati, diuresi. Sei azioni, entro un'ora, e molte sono di competenza infermieristica."),

 (10,"chiaro",0,"Il ruolo dell'infermiere. Riconoscere, con la NEWS2 e l'attenzione alla confusione e all'oliguria. Attivare, con SBAR e il team. Preparare ed eseguire accessi, emocolture, lattati."),
 (10,"chiaro",0,"E la prima dose di antibiotico, senza ritardi: un antibiotico prescritto alle tre e somministrato alle sei sono tre ore perse, e nella sepsi ogni ora pesa."),
 (10,"chiaro",0,"Monitorare parametri, diuresi oraria, coscienza, risposta ai liquidi. Segnalare il peggioramento. E documentare gli orari, perche' il tempo e' l'indicatore di qualita'."),

 (11,"chiaro",0,"La noradrenalina, il vasopressore di prima scelta nello shock settico. Infusione continua con pompa, in una via dedicata, preferibilmente centrale: uno stravaso puo' dare necrosi dei tessuti."),
 (11,"chiaro",0,"In periferica, solo per breve tempo secondo protocollo, sorvegliando la sede. Non si interrompe: il cambio siringa organizzato della lezione sei punto tre. E la pressione si segue da vicino, spesso con una linea arteriosa."),

 (12,"chiaro",0,"Il caso. Un'anziana cateterizzata da quattro giorni, confusa da stamattina. Frequenza respiratoria ventiquattro, cardiaca centododici, pressione novantadue su cinquantacinque."),
 (12,"chiaro",0,"Temperatura trentacinque e otto, diuresi quindici millilitri all'ora. Che cosa pensi? Sepsi, probabilmente di origine urinaria. E nota la temperatura bassa."),
 (12,"profondo",1.2,"[serious] L'ipotermia non deve rassicurare."),
 (12,"chiaro",0,"Che cosa fai? ABCDE, ossigeno, attivi il medico o il team con SBAR. Due accessi, lattati, emocolture, urinocoltura dal punto di prelievo. Antibiotico appena prescritto, liquidi, diuresi oraria."),
 (12,"chiaro",0,"E la domanda del modulo tre, che va fatta sempre: quel catetere serviva ancora? Ogni giorno di catetere in piu' e' un rischio di infezione in piu'."),

 (13,"chiaro",0,"Un richiamo allo shock anafilattico, il piu' rapido. Un allergene, farmaci, alimenti, punture di imenotteri, lattice; poi orticaria, angioedema, broncospasmo, ipotensione."),
 (13,"chiaro",0,"Il salvavita: adrenalina intramuscolo, zero virgola cinque milligrammi nell'adulto, nella coscia, ripetibile dopo cinque minuti. Poi ossigeno, liquidi, e stop subito all'agente scatenante, come un antibiotico in infusione."),

 (14,"chiaro",0,"In Veneto molte aziende hanno percorsi per la sepsi: strumenti di riconoscimento come la NEWS2, team di risposta rapida, e indicatori sui tempi dell'antibiotico, legati alla stewardship della lezione quattro punto sei."),
 (14,"chiaro",0,"E all'orale, la frase chiave e' questa: la sepsi e' una patologia tempo-dipendente. E chi la dice deve saper spiegare che cosa si fa nella prima ora."),

 (15,"chiaro",0,"La tabella. Shock ipovolemico, cardiogeno, distributivo, ostruttivo. Tachicardia precoce, ipotensione tardiva, lattati sopra due, indice di shock sopra uno."),
 (15,"chiaro",0,"Sepsi: disfunzione d'organo da risposta disregolata a un'infezione. Prima ora: lattati, emocolture, antibiotico, liquidi, vasopressori. Sepsis Six: tre da dare, tre da prelevare o misurare."),

 (16,"profondo",1.2,"[serious] La sepsi e' un'emergenza tempo-dipendente."),
 (16,"chiaro",0,"Esattamente come l'infarto e l'ictus. Solo che si presenta meno chiaramente: non ha il dolore al petto, ne' la paralisi. E per questo va cercata."),

 (17,"chiaro",0,"[warm] Nella prossima lezione: il paziente traumatizzato, le ustioni con la regola del nove e la formula di Parkland, che calcola i liquidi."),
 (17,"chiaro",0,"Le intossicazioni con i loro antidoti, e il triage nelle maxi-emergenze. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"I quattro tipi di shock",3:"I segni",4:"Il trattamento secondo il tipo",5:"L'assistenza",6:"La sepsi: la definizione",7:"Il riconoscimento",
 8:"Il bundle della prima ora",9:"Sepsis Six",10:"Il ruolo dell'infermiere",11:"La noradrenalina",12:"Il caso",13:"L'anafilassi",14:"In Veneto",15:"La tabella",16:"La frase della lezione",17:"Chiusura"}

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
