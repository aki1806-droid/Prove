# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La nutrizione enterale sembra un'attivita' di routine: un sondino, una pompa, una sacca. In realta' nasconde due complicanze gravi: la polmonite da inalazione e la sindrome da rialimentazione."),
 (1,"chiaro",0,"La seconda la conoscono in pochi, ma i concorsi la chiedono sempre piu' spesso. E il caso pone una domanda etica, quando il paziente ha una demenza avanzata."),
 (1,"chiaro",0,"Ci servono le lezioni tre punto tre, tre punto quattro, tre punto cinque, undici punto due e uno punto sei."),

 (2,"chiaro",0,"Lo scenario. Il signor Ottavio, settantanove anni, demenza moderata, e' ricoverato per una disfagia grave e un calo di peso: indice di massa corporea sedici, e da piu' di due settimane mangia pochissimo."),
 (2,"chiaro",0,"Ieri gli e' stato posizionato un sondino naso-gastrico, e la nutrizione enterale e' stata avviata in serata direttamente alla velocita' piena. Di notte, agitato, e' rimasto a lungo quasi sdraiato."),
 (2,"chiaro",0,"Alle sei: tosse insistente, saturazione ottantanove, febbre a trentotto virgola quattro, frequenza respiratoria ventotto, rantoli alla base destra, e residui di nutrizione nel cavo orale."),
 (2,"chiaro",0,"Fermati un momento: che cosa e' successo? E quale secondo rischio ti preoccupa nei prossimi giorni?"),

 (3,"chiaro",0,"Il ragionamento. Disfagia e demenza, nutrizione enterale, posizione supina, agitazione, con il rischio che il sondino si sia spostato. Residui in bocca, tosse, febbre, desaturazione, rantoli: e' una polmonite da inalazione."),
 (3,"chiaro",0,"Il secondo rischio, meno evidente ma altrettanto grave: un paziente gravemente malnutrito a cui la nutrizione e' stata avviata a pieno regime. E' il terreno della sindrome da rialimentazione."),

 (4,"chiaro",0,"Le prime azioni. Sospendi la nutrizione. Posizione semiseduta, o laterale se vomita. Aspiri il cavo orale e la faringe. Ossigeno secondo protocollo, e avviso al medico con lo SBAR. Parametri e monitoraggio."),
 (4,"chiaro",0,"Poi verifichi la posizione del sondino, con le regole della lezione tre punto quattro: i centimetri segnati alla narice, e il pH dell'aspirato, che deve essere pari o inferiore a cinque virgola cinque."),
 (4,"chiaro",0,"In caso di dubbio, la conferma radiologica. Mai il whoosh, cioe' l'auscultazione dell'aria insufflata. Poi prelievi, eventuale radiografia del torace e antibiotico secondo prescrizione."),

 (5,"chiaro",0,"[serious] La prevenzione, che in gran parte e' infermieristica. La testata a trenta-quarantacinque gradi durante l'infusione e per trenta-sessanta minuti dopo, anche di notte: e' proprio cio' che e' mancato."),
 (5,"chiaro",0,"La verifica del sondino prima di ogni avvio, dopo tosse, vomito o agitazione, e a ogni turno. L'infusione con pompa alla velocita' prescritta. Il controllo del ristagno gastrico secondo protocollo."),
 (5,"chiaro",0,"L'igiene del cavo orale, perche' la bocca colonizzata e' la fonte dei batteri inalati. Distensione e vomito sorvegliati. Niente sedazione eccessiva. E nell'agitato, sorveglianza e fissaggio sicuro, non contenzione."),

 (6,"chiaro",0,"[thoughtful] La sindrome da rialimentazione: che cos'e'? In un paziente gravemente malnutrito, la ripresa improvvisa dell'apporto di carboidrati stimola l'insulina."),
 (6,"chiaro",0,"L'insulina fa entrare rapidamente nelle cellule fosfato, potassio e magnesio, e i loro livelli nel sangue crollano, tipicamente nei primi giorni."),
 (6,"chiaro",0,"Le conseguenze sono serie: aritmie, insufficienza cardiaca, edemi, debolezza dei muscoli respiratori, confusione, convulsioni, fino alla morte. E' una complicanza della nutrizione, non della malattia: e' prevenibile."),

 (7,"chiaro",0,"Chi e' a rischio? Chi ha un indice di massa corporea sotto sedici, un calo di peso involontario oltre il quindici per cento in tre-sei mesi, un apporto minimo o nullo da piu' di dieci giorni, o elettroliti gia' bassi."),
 (7,"chiaro",0,"Il signor Ottavio era a rischio elevato. La prevenzione, secondo prescrizione e protocollo: un avvio lento e progressivo dell'apporto calorico, e la tiamina prima e durante."),
 (7,"chiaro",0,"Fosfato, potassio e magnesio dosati e corretti, con controlli giornalieri nei primi giorni, bilancio e peso, monitoraggio cardiaco nei casi gravi. Avviarla a pieno regime, come e' stato fatto, era un errore."),

 (8,"chiaro",0,"Il terzo giorno. La nutrizione e' stata ripresa piu' lentamente dopo la polmonite, ma gli esami mostrano un fosfato molto basso, un potassio di due virgola nove e un magnesio basso."),
 (8,"chiaro",0,"Il paziente e' tachicardico, edematoso, piu' debole e confuso. E' una sindrome da rialimentazione. Si segnala subito, e si riduce l'apporto secondo prescrizione."),
 (8,"chiaro",0,"Si correggono gli elettroliti per via endovenosa, con la pompa, e il potassio mai in bolo. Si avvia il monitoraggio ECG, e si coinvolge il servizio di nutrizione clinica."),

 (9,"chiaro",0,"Un approfondimento etico che questo caso impone: la decisione sulla nutrizione artificiale. Per la legge duecentodiciannove e' un trattamento sanitario: richiede il consenso, e puo' essere rifiutata."),
 (9,"chiaro",0,"Nella persona con demenza si considerano le disposizioni anticipate, la pianificazione condivisa, il fiduciario o l'amministratore di sostegno, i familiari."),
 (9,"chiaro",0,"Le evidenze disponibili non mostrano benefici chiari della nutrizione per sonda nella demenza avanzata, ne' sulla sopravvivenza ne' sulla prevenzione dell'inalazione."),
 (9,"chiaro",0,"L'alternativa: alimentazione di confort, piccole quantita' di cibi graditi, consistenze adatte, aiuto al pasto. La decisione si condivide, si documenta, si rivaluta; l'infermiere porta la conoscenza quotidiana della persona."),

 (10,"chiaro",0,"E se la nutrizione proseguira' a lungo? Il sondino naso-gastrico e' per periodi brevi; oltre alcune settimane si valuta una gastrostomia, la PEG, con la cura della stomia, la mobilizzazione del dispositivo, i lavaggi."),
 (10,"chiaro",0,"Per entrambi i dispositivi valgono le regole sui farmaci: forme adatte, non frantumare le forme a rilascio modificato, lavaggio prima e dopo ogni farmaco. E se torna a casa, si educa il caregiver."),

 (11,"chiaro",0,"Un passo indietro: la valutazione nutrizionale. Lo screening del rischio si fa all'ingresso, con il MUST o gli strumenti in uso in azienda, insieme a peso, altezza, indice di massa corporea, calo di peso e apporto."),
 (11,"chiaro",0,"Si valuta la deglutizione. Si attivano il dietista e la nutrizione clinica, si registrano gli apporti. Il signor Ottavio era malnutrito da settimane: la malnutrizione si cerca, non si aspetta che si manifesti."),

 (12,"chiaro",0,"Gli errori. La nutrizione in posizione supina. Non verificare il sondino dopo agitazione o tosse. Verificarlo con il whoosh. Avviare a pieno regime un paziente gravemente malnutrito."),
 (12,"chiaro",0,"Dimenticare la tiamina e gli elettroliti. Correggere il potassio senza pompa. Considerare la nutrizione artificiale un atto dovuto, senza una decisione condivisa."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: come si verifica il sondino? Con la conferma radiologica dopo il posizionamento, quando prevista; poi con i centimetri alla narice e il pH dell'aspirato, fino a cinque virgola cinque."),
 (13,"chiaro",0,"L'auscultazione dell'aria non e' affidabile. Seconda: come si previene l'inalazione? Testata a trenta-quarantacinque gradi durante e dopo l'infusione, verifica del sondino, infusione con pompa."),
 (13,"chiaro",0,"Controllo del ristagno, igiene orale, sorveglianza di distensione e vomito. Terza: la sindrome da rialimentazione? Un crollo di fosfato, potassio e magnesio quando si rialimenta un paziente malnutrito."),
 (13,"chiaro",0,"A rischio chi ha un indice di massa corporea sotto sedici, un forte calo di peso, o un apporto minimo da oltre dieci giorni."),

 (14,"chiaro",0,"La risposta modello. Paziente con demenza, disfagia e grave malnutrizione, in nutrizione enterale avviata a pieno regime e mantenuto supino, con tosse, febbre, desaturazione, rantoli e residui in bocca."),
 (14,"chiaro",0,"Sospetta polmonite da inalazione. Sospendo la nutrizione, lo posiziono semiseduto, aspiro, somministro ossigeno e avviso il medico; verifico la posizione del sondino, e collaboro alla terapia prescritta."),
 (14,"chiaro",0,"Per la prevenzione: testata a trenta-quarantacinque gradi, sondino verificato a ogni avvio e dopo agitazione, pompa, igiene orale. E riconosco l'alto rischio di sindrome da rialimentazione."),
 (14,"chiaro",0,"Segnalo la necessita' di un avvio lento, della tiamina e del controllo di fosfato, potassio e magnesio. E partecipo alla decisione condivisa sulla nutrizione artificiale, documentando."),

 (15,"chiaro",0,"I collegamenti. Nutrizione e disfagia con la tre punto tre. Sondino e nutrizione enterale con la tre punto quattro. Elettroliti con la tre punto cinque."),
 (15,"chiaro",0,"Demenza con la undici punto due. Legge duecentodiciannove e consenso con la uno punto sei. E la prevenzione della polmonite con la tre punto uno."),

 (16,"chiaro",0,"Un dettaglio organizzativo: la notte e' il punto critico. Il personale e' ridotto, i pazienti scivolano nel letto, l'agitazione aumenta. E la nutrizione notturna richiede le stesse regole del giorno."),
 (16,"chiaro",0,"Le consegne contengono velocita', verifica del sondino, posizione e ristagno. Il riposizionamento si puo' attribuire all'OSS, con istruzioni chiare: testata sollevata, e segnalare subito tosse o vomito."),

 (17,"profondo",1.2,"[serious] La frase del caso: nutrire bene significa anche nutrire piano, e nella posizione giusta."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: un'intera famiglia arriva in pronto soccorso una mattina d'inverno, con mal di testa e nausea. Saturazioni perfette, e un nemico invisibile. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le prime azioni",5:"La prevenzione dell'inalazione",
 6:"La sindrome da rialimentazione",7:"Chi e' a rischio e come si previene",8:"Il terzo giorno",
 9:"La decisione sulla nutrizione artificiale",10:"Se la nutrizione proseguira' a lungo",11:"La valutazione nutrizionale",
 12:"Gli errori da evitare",13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",16:"La notte: il punto critico",
 17:"La frase del caso",18:"Chiusura"}

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
