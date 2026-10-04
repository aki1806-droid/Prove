# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo dell'emergenza con il suo contenuto piu' prezioso: gli algoritmi. In emergenza non c'e' tempo per ragionare da zero, e l'ansia toglie lucidita' proprio quando serve."),
 (1,"chiaro",0,"Chi conosce la sequenza a memoria agisce mentre gli altri pensano. Rivediamoli uno dopo l'altro, in forma compatta, con i numeri che i concorsi chiedono. E' la lezione da riascoltare la sera prima dell'esame."),

 (2,"chiaro",0,"Il triage a cinque codici, delle linee di indirizzo nazionali del duemiladiciannove. Uno, rosso: accesso immediato. Due, arancione: entro quindici minuti. Tre, azzurro: entro sessanta."),
 (2,"chiaro",0,"Quattro, verde: entro centoventi. Cinque, bianco: entro duecentoquaranta. Sono tempi massimi di attesa, non tempi di visita. E il codice si assegna su gravita' e rischio, non sull'ordine di arrivo."),
 (2,"chiaro",0,"E le cinque fasi: valutazione immediata, soggettiva, oggettiva, decisione, e rivalutazione. Perche' il codice non e' definitivo, e la quinta fase e' quella che si dimentica piu' spesso."),

 (3,"chiaro",0,"L'ABCDE. Vie aeree: il paziente parla? Respiro: la frequenza respiratoria, contata per un minuto. Circolo: il riempimento capillare, sotto i due secondi."),
 (3,"chiaro",0,"Stato neurologico: AVPU o GCS, pupille, e la glicemia, sempre. Esposizione: e poi si ricopre. E la regola: tratta cio' che trovi, prima di passare oltre."),
 (3,"chiaro",0,"La NEWS2. Un tre in un singolo parametro, o un punteggio di cinque o sei, richiedono una risposta urgente. Da sette in su, l'emergenza. Con il team di risposta rapida, dove c'e'."),
 (3,"chiaro",0,"E la catena da citare all'orale: parametri, punteggio, risposta graduata. E una confusione nuova nell'anziano non e' normale per l'eta': e' un allarme, e si riparte dalla A."),

 (4,"chiaro",0,"Il BLSD. Sicurezza, coscienza, aiuto, vie aeree, e il respiro valutato per non piu' di dieci secondi. Poi chiamata, DAE, trenta a due. La catena della sopravvivenza ha cinque anelli, e i primi tre sono nelle mani di chi c'e'."),
 (4,"profondo",1.2,"[serious] Il gasping e' arresto."),
 (4,"chiaro",0,"Le compressioni: mani al centro del torace, su un piano rigido; cinque, sei centimetri, cento, centoventi al minuto, rilascio completo, cambio ogni due minuti, interruzioni minime."),
 (4,"chiaro",0,"Il DAE: piastre, analisi senza toccare il paziente, shock, e subito le compressioni, per due minuti, senza cercare il polso: anche dopo uno shock efficace, il cuore impiega tempo a pompare."),

 (5,"chiaro",0,"L'ALS. Analisi del ritmo ogni due minuti. Fibrillazione ventricolare e tachicardia ventricolare senza polso: defibrillabili. Asistolia e PEA: no, e li' conta la causa."),
 (5,"chiaro",0,"Adrenalina, un milligrammo: subito nei non defibrillabili, dopo il terzo shock nei defibrillabili, poi ogni tre, cinque minuti, circa ogni due cicli. Il timekeeper tiene i tempi."),
 (5,"chiaro",0,"Amiodarone: trecento milligrammi dopo il terzo shock, centocinquanta dopo il quinto. Dopo ogni farmaco, un lavaggio con fisiologica, per via venosa o intraossea."),
 (5,"chiaro",0,"Le quattro I: ipossia, ipovolemia, ipo o iperkaliemia, ipotermia. Le quattro T: trombosi, tamponamento, tossici, pneumotorace iperteso. Da cercare durante ogni arresto, non solo alla fine."),

 (6,"chiaro",0,"Il PBLS. Lattante sotto un anno. Cinque ventilazioni iniziali, poi quindici a due. Profondita' a un terzo del torace. Nel lattante, capo neutro."),
 (6,"chiaro",0,"L'ostruzione: tosse efficace, si incoraggia. Inefficace: cinque colpi e cinque compressioni, addominali nell'adulto e nel bambino, toraciche nel lattante."),
 (6,"chiaro",0,"Se perde coscienza: rianimazione, perche' le compressioni possono espellere il corpo estraneo. Negli obesi e in gravidanza avanzata, compressioni toraciche al posto delle addominali."),

 (7,"chiaro",0,"Le vie aeree. Guedel solo senza riflesso faringeo; nasofaringea, no nella frattura della base cranica. Pallone a due mani. Il sopraglottico entra senza laringoscopio, ma non protegge del tutto dall'inalazione."),
 (7,"chiaro",0,"Il tubo si verifica con la capnografia, la cuffia a venti, trenta centimetri d'acqua, e si annotano i centimetri all'arcata dentaria: il riferimento per accorgersi di uno spostamento."),
 (7,"chiaro",0,"Alta pressione: un ostacolo. Bassa pressione: una perdita. Il ventilato che peggiora: DOPE. E nel dubbio, si stacca e si ventila con il pallone."),

 (8,"chiaro",0,"Lo shock: ipovolemico, cardiogeno, distributivo, ostruttivo. Tachicardia precoce, ipotensione tardiva, lattati sopra due, indice di shock sopra uno."),
 (8,"chiaro",0,"La sepsi, nella prima ora: lattati, emocolture prima dell'antibiotico, antibiotico, liquidi, e vasopressori per una pressione media di almeno sessantacinque."),
 (8,"chiaro",0,"Sepsis Six: tre da dare, ossigeno, liquidi, antibiotici; tre da prelevare o misurare, emocolture, lattati, diuresi. E la prima dose di antibiotico non aspetta."),
 (8,"chiaro",0,"E l'anafilassi: adrenalina intramuscolo, zero virgola cinque milligrammi nell'adulto, nella coscia, ripetibile dopo cinque minuti. Poi ossigeno, liquidi, e stop all'agente scatenante."),

 (9,"chiaro",0,"Il trauma: XABCDE, prima l'emorragia massiva. Tourniquet con l'orario annotato, senza allentarlo. Rachide in asse, collare, movimento in blocco."),
 (9,"chiaro",0,"Le ustioni: regola del nove, palmo uguale uno per cento. Acqua tiepida per venti minuti, niente ghiaccio. E il terzo grado e' indolore. Fuliggine, voce rauca, stridore: vie aeree a rischio."),
 (9,"chiaro",0,"Parkland: quattro millilitri, per il peso, per la percentuale. Meta' nelle prime otto ore, contate dal momento dell'ustione. Obiettivo: una diuresi di circa mezzo millilitro per chilo all'ora."),
 (9,"chiaro",0,"Lo START: cammina, verde. Non respira, nero. Frequenza oltre trenta, refill oltre due secondi, non esegue ordini: rosso. Altrimenti, giallo. E il triage si ripete."),

 (10,"chiaro",0,"Gli antidoti. Oppioidi: naloxone. Benzodiazepine: flumazenil. Paracetamolo: N-acetilcisteina. Monossido: ossigeno al cento per cento."),
 (10,"chiaro",0,"Dicumarolici: vitamina K. Organofosfati: atropina. E dalla lezione cinque punto cinque: eparina, protamina; ipoglicemia, glucagone o glucosio."),

 (11,"chiaro",0,"Le confusioni che costano piu' punti. Il gasping non e' un respiro. L'ipotensione e' un segno tardivo, non un segno d'esordio: chi aspetta la pressione bassa arriva tardi."),
 (11,"chiaro",0,"Il codice di triage non e' una diagnosi: dice quanto si puo' aspettare, non che cosa si ha. E niente Heimlich nel lattante: colpi dorsali e compressioni toraciche, mai addominali."),
 (11,"chiaro",0,"Un'ustione indolore e' profonda, non lieve. Parkland si conta dal momento dell'ustione, non dall'arrivo. E niente ghiaccio sulle ustioni: aggrava il danno e raffredda il paziente."),
 (11,"chiaro",0,"E l'ipotermia, nella sepsi, e' un segno di gravita', non una buona notizia. Chi si tranquillizza per una temperatura bassa sta guardando il numero sbagliato."),

 (12,"chiaro",0,"Gli agganci veneti per l'orale. Il SUEM centodiciotto e le centrali operative. Il triage a cinque codici. Le reti tempo-dipendenti: infarto, ictus, trauma, con centri hub e spoke."),
 (12,"chiaro",0,"I team di risposta rapida e la NEWS2. I percorsi per la sepsi. Il PEIMAF. E la formazione BLSD e ALS secondo IRC. Per tutte, la parola chiave e' la stessa: rete."),

 (13,"chiaro",0,"Come proseguire. Il test del modulo: trenta domande, soglia ventuno. E ripeti ad alta voce ogni algoritmo, finche' non lo reciti senza esitazioni."),
 (13,"chiaro",0,"Nel quaderno: codici, tempi, dosi, antidoti, START. Le cose che non si ragionano, si sanno: una pagina sola, da rileggere la sera prima dell'esame."),
 (13,"chiaro",0,"E scrivi due casi: il paziente che si deteriora in reparto, con ABCDE e NEWS2; e la sepsi, dal sospetto alla prima ora. Scriverli a parole tue e' il modo migliore per prepararti all'orale."),

 (14,"chiaro",0,"La frase del modulo viene dal mondo dell'emergenza, e vale per chi studia come per chi soccorre. E spiega perche' questo modulo si studia diversamente dagli altri."),
 (14,"profondo",1.2,"[serious] Non si sale al livello delle aspettative. Si scende al livello dell'addestramento."),
 (14,"chiaro",0,"Per questo gli algoritmi si imparano a memoria, e si ripetono: perche' nel momento vero non c'e' tempo per ricordarli. Le mani fanno quello che hanno ripetuto."),

 (15,"chiaro",0,"[warm] Nel prossimo modulo cambiamo ritmo: l'anziano fragile e la demenza, la salute mentale, l'area materno-infantile. Si passa dall'urgenza dei minuti alla cura che dura anni."),
 (15,"chiaro",0,"Le cure palliative e il fine vita, la cronicita' con l'educazione terapeutica, e il territorio con le cure primarie, le case e gli ospedali di comunita'."),
 (15,"chiaro",0,"E' il modulo in cui si vede quanto l'assistenza infermieristica vada oltre l'ospedale. Ci vediamo li'."),
]
CAPITOLI = {1:"Apertura",2:"Il triage",3:"ABCDE e NEWS2",4:"Il BLSD",5:"L'ALS",6:"PBLS e ostruzione",7:"Vie aeree e ventilazione",8:"Shock e sepsi",
 9:"Trauma, ustioni, START",10:"Gli antidoti",11:"Le confusioni",12:"Gli agganci veneti",13:"Come proseguire",14:"La frase del modulo",15:"Chiusura"}

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
