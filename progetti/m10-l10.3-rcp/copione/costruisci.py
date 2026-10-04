# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questa e' la lezione che piu' di ogni altra puo' servirti fuori dall'esame. Nell'arresto cardiaco ogni minuto senza rianimazione riduce la sopravvivenza in modo drastico."),
 (1,"chiaro",0,"Ed e' l'emergenza in cui un infermiere preparato fa la differenza. Seguiamo le linee guida europee ERC, recepite in Italia da IRC: prima il supporto di base con defibrillatore, il BLSD, poi quello avanzato, l'ALS."),

 (2,"chiaro",0,"La catena della sopravvivenza ha cinque anelli. Uno: riconoscimento precoce dell'arresto e chiamata di aiuto. Due: rianimazione cardiopolmonare precoce. Tre: defibrillazione precoce."),
 (2,"chiaro",0,"Quattro: supporto avanzato precoce, con monitor, farmaci e vie aeree. Cinque: cure post-arresto, perche' il ritorno del polso non e' la fine del lavoro, ma l'inizio di un'altra fase."),
 (2,"chiaro",0,"La catena e' forte quanto il suo anello piu' debole. E i primi tre anelli dipendono da chi e' presente nei primi minuti, cioe', in reparto, quasi sempre da un infermiere."),

 (3,"chiaro",0,"La sequenza iniziale del BLSD. Uno: sicurezza della scena, per te, per gli altri, per la vittima. Due: valutare la coscienza, scuotendo le spalle e chiamando ad alta voce."),
 (3,"chiaro",0,"Tre: se non risponde, chiamare aiuto. Quattro: aprire le vie aeree, con iperestensione del capo e sollevamento del mento."),
 (3,"chiaro",0,"Cinque: valutare il respiro guardando, ascoltando e sentendo, per non piu' di dieci secondi. Se il respiro e' assente o anormale, la persona e' in arresto cardiaco."),
 (3,"profondo",1.2,"[serious] Il gasping non e' un respiro normale."),
 (3,"chiaro",0,"E' il punto piu' importante: il gasping, il respiro agonico, lento e rumoroso, e' un segno di arresto. Scambiarlo per respiro fa perdere minuti preziosi."),

 (4,"chiaro",0,"Poi si chiama il centododici o il centodiciotto, in ospedale il numero interno dell'emergenza, e si chiede che venga portato il defibrillatore, il DAE."),
 (4,"chiaro",0,"Se si e' soli con il telefono, si mette in vivavoce e si inizia subito mentre si parla con la centrale. In ospedale si chiama il team e il carrello delle emergenze della lezione cinque punto sette."),

 (5,"chiaro",0,"Le compressioni toraciche, il cuore della rianimazione. Mani al centro del torace, sulla meta' inferiore dello sterno, su una superficie rigida."),
 (5,"chiaro",0,"Profondita' di cinque, sei centimetri. Frequenza di cento, centoventi al minuto. Rilascio completo dopo ogni compressione, perche' il cuore si riempie proprio durante il rilascio."),
 (5,"chiaro",0,"Minime interruzioni: ogni pausa fa crollare la pressione di perfusione, che poi impiega diverse compressioni a risalire."),
 (5,"chiaro",0,"E cambio dell'operatore ogni due minuti: la qualita' cala con la stanchezza molto prima che chi comprime se ne accorga."),

 (6,"chiaro",0,"Il rapporto e' trenta compressioni e due ventilazioni. Ogni ventilazione dura circa un secondo e deve far sollevare il torace in modo visibile: insufflare troppo forte porta aria nello stomaco."),
 (6,"chiaro",0,"In ospedale si ventila con il pallone-maschera collegato all'ossigeno. Se non si e' in grado di ventilare, le compressioni continue sono comunque molto meglio di niente."),

 (7,"chiaro",0,"Il DAE. Appena arriva si accende e si seguono le istruzioni vocali. Le piastre sul torace asciutto: una sotto la clavicola destra, l'altra sul lato sinistro, sotto l'ascella."),
 (7,"chiaro",0,"Mentre un soccorritore le applica, l'altro continua a comprimere. Durante l'analisi nessuno tocca il paziente. Se lo shock e' indicato, si verifica ancora che nessuno sia a contatto, e si eroga."),
 (7,"chiaro",0,"Poi si riprendono subito le compressioni per due minuti, senza fermarsi a cercare il polso: anche dopo uno shock efficace il cuore impiega tempo a pompare in modo valido."),

 (8,"chiaro",0,"I ritmi dell'arresto, che abbiamo visto nella lezione otto punto uno, si dividono in due gruppi. Defibrillabili: la fibrillazione ventricolare e la tachicardia ventricolare senza polso."),
 (8,"chiaro",0,"Non defibrillabili: l'asistolia e l'attivita' elettrica senza polso, la PEA. Qui lo shock non serve: serve una rianimazione di qualita' e la ricerca della causa."),

 (9,"chiaro",0,"L'ALS, il supporto avanzato, aggiunge alla rianimazione di base il monitor, i farmaci e la gestione avanzata delle vie aeree."),
 (9,"chiaro",0,"L'algoritmo e' un ciclo: rianimazione e analisi del ritmo ogni due minuti. Se il ritmo e' defibrillabile, shock e due minuti di rianimazione; se non lo e', due minuti di rianimazione."),
 (9,"chiaro",0,"E durante la rianimazione: accesso venoso o intraosseo, come nella lezione cinque punto due, farmaci, vie aeree avanzate, capnografia, e la ricerca delle cause reversibili."),

 (10,"chiaro",0,"I farmaci, con i numeri da sapere. Adrenalina, un milligrammo, endovena o intraossea: nei ritmi non defibrillabili, il prima possibile."),
 (10,"chiaro",0,"Nei ritmi defibrillabili, dopo il terzo shock. Poi ogni tre, cinque minuti, cioe' circa ogni due cicli."),
 (10,"chiaro",0,"Amiodarone: trecento milligrammi dopo il terzo shock, e una seconda dose di centocinquanta dopo il quinto. E dopo ogni farmaco si lava la via con soluzione fisiologica."),

 (11,"chiaro",0,"Le cause reversibili, da cercare durante ogni arresto e non solo alla fine, con la regola delle quattro I e delle quattro T."),
 (11,"chiaro",0,"Le quattro I: ipossia, ipovolemia, ipo o iperkaliemia e altre alterazioni metaboliche, ipotermia. Le quattro T: trombosi, coronarica o polmonare; tamponamento cardiaco; tossici; pneumotorace iperteso."),
 (11,"chiaro",0,"Riconoscere e trattare la causa e' spesso l'unico modo per far ripartire un cuore in asistolia o in PEA: li' lo shock non serve, e le compressioni da sole guadagnano soltanto tempo."),

 (12,"chiaro",0,"La capnografia misura l'anidride carbonica a fine espirazione, e durante l'arresto ha tre usi. Conferma il corretto posizionamento del tubo."),
 (12,"chiaro",0,"Misura la qualita' delle compressioni: valori bassi indicano compressioni poco efficaci. E un aumento brusco puo' essere il primo segno del ritorno della circolazione spontanea, il ROSC."),

 (13,"chiaro",0,"Il ruolo dell'infermiere nel team: compressioni e cambi, defibrillazione, che in molti contesti l'infermiere formato esegue in autonomia, accesso venoso e farmaci, supporto alle vie aeree."),
 (13,"chiaro",0,"E due ruoli spesso sottovalutati: il timekeeper, che scandisce i due minuti dei cicli e i tempi dell'adrenalina, e chi documenta orari, ritmi, shock e farmaci."),
 (13,"chiaro",0,"Il team funziona con un leader chiaro e una comunicazione a ciclo chiuso: chi riceve un ordine lo ripete, e conferma quando l'ha eseguito."),

 (14,"chiaro",0,"Le cure post-arresto, l'ultimo anello. Dopo il ritorno della circolazione si riparte dall'ABCDE. Saturazione fra novantaquattro e novantotto: ne' ipossia ne' eccesso di ossigeno."),
 (14,"chiaro",0,"Anidride carbonica normale. Pressione adeguata, evitando l'ipotensione. ECG a dodici derivazioni, e coronarografia se indicata, perche' molti arresti sono causati da un infarto."),
 (14,"chiaro",0,"Glicemia. Controllo della temperatura, evitando la febbre. E la ricerca e il trattamento della causa, con le stesse quattro I e quattro T che si cercavano durante l'arresto."),

 (15,"chiaro",0,"Il caso. Entri in stanza e trovi un paziente che non risponde, con un respiro lento e rumoroso a intervalli irregolari. Che cosa fai?"),
 (15,"chiaro",0,"E' gasping: respiro anormale, quindi arresto cardiaco. Chiami aiuto e il team, chiedi il defibrillatore, superficie rigida o tavola sul letto, e inizi le compressioni, trenta a due."),
 (15,"chiaro",0,"Appena arriva il defibrillatore, piastre e analisi. Chi aspetta di essere sicuro, perche' respira ancora, perde i minuti che decidono l'esito."),

 (16,"chiaro",0,"In Veneto la formazione segue le linee guida IRC ed ERC, con corsi BLSD e ALS certificati, carrelli e defibrillatori standardizzati, team per l'emergenza in ospedale e DAE diffusi nei luoghi pubblici."),

 (17,"chiaro",0,"La tabella. Respiro valutato al massimo dieci secondi; il gasping e' arresto. Compressioni cinque, sei centimetri, cento, centoventi al minuto, rilascio completo; trenta a due; cambio ogni due minuti."),
 (17,"chiaro",0,"Dopo lo shock, subito compressioni. Adrenalina un milligrammo, subito nei non defibrillabili e dopo il terzo shock, poi ogni tre, cinque minuti. Amiodarone trecento, poi centocinquanta. Quattro I e quattro T."),

 (18,"profondo",1.2,"[serious] Nel dubbio, comprimi."),
 (18,"chiaro",0,"[warm] Le compressioni su chi non e' in arresto raramente fanno danni gravi; il ritardo su chi e' in arresto e' quasi sempre fatale. Nella prossima lezione: il bambino, il lattante, il parto imminente. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"La catena della sopravvivenza",3:"La sequenza iniziale",4:"Chiamare e chiedere il DAE",5:"Le compressioni",6:"Il rapporto 30:2",
 7:"Il DAE",8:"I ritmi",9:"L'ALS",10:"I farmaci",11:"Le cause reversibili",12:"La capnografia",13:"Il team",14:"Le cure post-arresto",15:"Il caso",16:"In Veneto",17:"La tabella",18:"Chiusura"}

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
