# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo quattro, uno dei piu' redditizi per i quiz: le infezioni correlate all'assistenza tornano in ogni concorso, e le domande sono quasi sempre le stesse."),
 (1,"chiaro",0,"Oggi mettiamo a confronto i quattro bundle di prevenzione, ricapitoliamo le tabelle, precauzioni, Spaulding, esposizione, e rivediamo le confusioni che costano piu' punti. Un ripasso, con il ritmo di un ripasso."),

 (2,"chiaro",0,"Sette lezioni, ripercorse in un minuto. Che cosa sono le ICA e come nascono, con la catena delle infezioni e le quattro sedi principali. Le mani e le precauzioni standard, con i cinque momenti."),
 (2,"chiaro",0,"Le precauzioni aggiuntive, contatto, droplet e via aerea, con le tre stanze. I DPI, con le due sequenze e il principio di che cosa si puo' toccare. La riprocessazione degli strumenti, con Spaulding e il ciclo a otto passi."),
 (2,"chiaro",0,"La resistenza agli antibiotici e la stewardship. E il rischio per l'operatore, con i primi minuti dopo una puntura e i rifiuti. Sette lezioni, un solo filo."),

 (3,"chiaro",0,"Il filo: la catena delle infezioni ha sei anelli, agente, serbatoio, porta di uscita, via di trasmissione, porta di ingresso, ospite suscettibile. L'infezione si realizza solo se ci sono tutti, e basta spezzarne uno."),
 (3,"chiaro",0,"Ogni lezione di questo modulo e' un modo di spezzare un anello: le mani spezzano la via di trasmissione, la sterilizzazione elimina l'agente, i vaccini proteggono l'ospite."),
 (3,"profondo",1.2,"[serious] E nota il parallelo con il modulo due: e' la logica delle barriere multiple di Reason. Nessuna misura da sola e' sufficiente; tutte insieme lo sono."),

 (4,"chiaro",0,"I bundle, i pacchetti di misure che funzionano insieme. VAP, la polmonite da ventilatore: testata a trenta-quarantacinque gradi, igiene del cavo orale, aspirazione sub-glottica."),
 (4,"chiaro",0,"Poi controllo della pressione della cuffia, perche' le secrezioni sopra la cuffia scendono nei polmoni, e interruzione quotidiana della sedazione, per arrivare prima all'estubazione: meno giorni di tubo, meno polmoniti."),
 (4,"chiaro",0,"CAUTI, l'infezione urinaria da catetere: indicazione appropriata, inserimento asettico, circuito chiuso, sacca sotto la vescica e mai a terra, rimozione precoce. Il catetere piu' sicuro e' quello che non si mette."),

 (5,"chiaro",0,"CLABSI, l'infezione del sangue da catetere venoso centrale, all'inserimento: igiene delle mani, massime barriere sterili, antisepsi con clorexidina al due per cento in alcol."),
 (5,"chiaro",0,"Scelta del sito, e rivalutazione quotidiana con rimozione appena possibile. Il catetere che non serve piu' e' un catetere da togliere oggi."),
 (5,"chiaro",0,"SSI, il sito chirurgico: niente tricotomia con rasoio, se serve con clipper e subito prima dell'intervento, profilassi antibiotica entro sessanta minuti dall'incisione."),
 (5,"chiaro",0,"Antisepsi cutanea, normotermia, controllo della glicemia. CLABSI e SSI li approfondiremo nei moduli sei e nove."),

 (6,"chiaro",0,"Che cosa hanno in comune i quattro bundle? L'igiene delle mani, sempre, prima e dopo. L'asepsi, nelle manovre invasive: chi entra in un tessuto sterile entra sterile."),
 (6,"chiaro",0,"La rivalutazione quotidiana della necessita' del dispositivo e la rimozione precoce: ogni giorno in piu' di catetere o di tubo e' un giorno in piu' di rischio."),
 (6,"chiaro",0,"E il principio del bundle stesso: le misure funzionano insieme, applicate tutte. Un bundle applicato a meta' non e' un bundle."),

 (7,"chiaro",0,"I numeri, quelli che i quiz chiedono con la cifra secca. ICA dopo quarantotto ore dal ricovero. Sito chirurgico entro trenta giorni, novanta con impianto. Cinque momenti dell'igiene delle mani."),
 (7,"chiaro",0,"Frizione con il gel venti-trenta secondi, lavaggio con acqua e sapone quaranta-sessanta. Droplet entro uno-due metri: le goccioline grandi cadono, e la mascherina chirurgica basta a fermarle."),
 (7,"chiaro",0,"FFP2 circa novantaquattro, FFP3 circa novantanove per cento di efficienza filtrante. Profilassi per l'HIV entro una-due ore, massimo quarantotto-settantadue, per ventotto giorni."),
 (7,"chiaro",0,"Anti-HBs protettivi da dieci milliunita' per millilitro. Emocolture: due set, otto-dieci millilitri per flacone. Numeri che nei quiz valgono un punto ciascuno."),

 (8,"chiaro",0,"Le due tabelle. Precauzioni: contatto per MDRO, Clostridioides difficile, scabbia, norovirus. Droplet per influenza, pertosse, meningococco, parotite, rosolia."),
 (8,"chiaro",0,"Via aerea per tubercolosi, morbillo, varicella: stanza a pressione negativa con la porta chiusa, respiratore FFP2 per chi entra, che si toglie fuori dalla stanza. Alcune malattie ne richiedono due insieme."),
 (8,"chiaro",0,"Spaulding: critico, sterilizzazione; semicritico, disinfezione di alto livello; non critico, basso livello. La domanda e' sempre: dove arriva il dispositivo?"),

 (9,"chiaro",0,"Le confusioni che costano piu' punti, nove, in due giri. Uno: i guanti non sostituiscono l'igiene delle mani, che si fa prima di metterli e dopo averli tolti, perche' le mani sotto il guanto non sono pulite."),
 (9,"chiaro",0,"Due: il gel alcolico non uccide le spore, e con il difficile servono acqua e sapone. Tre: la mascherina chirurgica protegge gli altri, il respiratore protegge te."),
 (9,"chiaro",0,"Quattro: pressione negativa per il paziente contagioso, che non deve mandare fuori l'aria; positiva per l'immunodepresso, che non deve riceverla."),

 (10,"chiaro",0,"Cinque: la disinfezione non elimina necessariamente le spore, la sterilizzazione si'. Sei: la decontaminazione protegge soprattutto l'operatore, non il paziente."),
 (10,"chiaro",0,"Sette: il nastro indicatore non garantisce la sterilita' del contenuto, dice solo che la confezione e' passata in autoclave. Per il contenuto servono gli indicatori interni e i parametri del ciclo."),
 (10,"chiaro",0,"Otto: colonizzazione non e' infezione, ma il colonizzato e' un serbatoio, e le precauzioni valgono lo stesso. Nove: per l'epatite C non esiste profilassi post-esposizione, solo il follow-up."),

 (11,"chiaro",0,"Le sequenze. Vestizione: igiene delle mani, camice, mascherina, occhiali, guanti per ultimi. Svestizione: guanti per primi, occhiali, camice, mascherina, igiene delle mani."),
 (11,"chiaro",0,"E nella via aerea il respiratore si toglie fuori dalla stanza, dopo aver chiuso la porta. Si toccano solo lacci ed elastici, mai la parte davanti: la parte davanti e' contaminata per definizione."),
 (11,"chiaro",0,"Esposizione: lavare, far sanguinare senza spremere, segnalare subito, identificare la fonte, valutare la profilassi, denunciare l'infortunio. Sei passi, in quest'ordine."),

 (12,"chiaro",0,"I casi, cinque, quelli che tornano. Diarrea dopo antibiotico: sospetto Clostridioides difficile, precauzioni da contatto subito, acqua e sapone perche' il gel non uccide le spore, disinfezione sporicida della stanza."),
 (12,"chiaro",0,"Tosse, febbre e infiltrato apicale: via aerea subito, senza aspettare il referto. Paziente da RSA febbrile con catetere: contatto e screening, colture prima dell'antibiotico, e il catetere si rivaluta."),
 (12,"chiaro",0,"Puntura accidentale: la sequenza dei sei passi, con la profilassi per l'HIV entro poche ore. Confezione sterile bagnata, o caduta a terra: non e' piu' sterile, non si usa, torna in centrale."),
 (12,"chiaro",0,"Cinque casi, e in tutti la risposta giusta e' quella che agisce subito: si isola prima e si conferma dopo, si preleva prima e si somministra dopo."),

 (13,"chiaro",0,"Se all'orale ti chiedono qual e' il ruolo dell'infermiere nella prevenzione delle ICA, una risposta forte parte da qui: l'infermiere e' il professionista con piu' contatti con la persona assistita, a ogni turno, a ogni gesto."),
 (13,"profondo",1.2,"[serious] Gestisce la maggior parte dei dispositivi, esegue i prelievi colturali e somministra gli antibiotici. La prevenzione passa, letteralmente, dalle sue mani."),

 (14,"chiaro",0,"Gli agganci veneti, quelli che all'orale fanno la differenza. Comitati aziendali per il controllo delle infezioni, con infermieri addetti al controllo. Campagne sull'igiene delle mani con osservazione e feedback."),
 (14,"chiaro",0,"Programmi di stewardship multidisciplinari, di cui l'infermiere fa parte. Procedura per l'esposizione a rischio biologico, con percorso rapido attivo tutto il giorno."),
 (14,"chiaro",0,"E la notifica delle malattie infettive al Dipartimento di Prevenzione. Cinque agganci, cinque modi di dire: conosco il sistema in cui andro' a lavorare."),

 (15,"chiaro",0,"Come proseguire. Test del modulo, trenta domande, soglia ventuno: sette errori si possono fare, l'ottavo dice che c'e' una lezione da rivedere. Riprendi solo le lezioni sbagliate, non tutto il modulo."),
 (15,"chiaro",0,"Trasferisci nel quaderno le tabelle e le sequenze: le precauzioni per malattia, Spaulding, la vestizione e la svestizione, i sei passi dopo una puntura."),
 (15,"chiaro",0,"E un esercizio pratico: simula ad alta voce la vestizione e la svestizione, come se dovessi spiegarle a un collega. E' esattamente cio' che puo' chiederti la prova pratica."),

 (16,"chiaro",0,"Ci fermiamo qui, con la frase che tiene insieme il modulo: ogni infezione prevenuta e' un antibiotico non usato. E ogni antibiotico non usato e' una resistenza in meno, per il paziente di oggi e per quello di domani."),
 (16,"chiaro",0,"[warm] Nel prossimo modulo entriamo nell'area che nei concorsi infermieristici pesa piu' di ogni altra: la farmacologia e la gestione sicura della terapia. Ci vediamo li'."),
]

CAPITOLI = {1:"Apertura",2:"La mappa",3:"Il filo del modulo",4:"I bundle: VAP e CAUTI",5:"I bundle: CLABSI e SSI",
 6:"Che cosa hanno in comune",7:"I numeri",8:"Le tabelle",9:"Le confusioni, prima parte",
 10:"Le confusioni, seconda parte",11:"Le sequenze",12:"I casi",13:"Il ruolo dell'infermiere",14:"Gli agganci veneti",
 15:"Come proseguire",16:"Chiusura"}

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
