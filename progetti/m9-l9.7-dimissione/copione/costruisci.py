# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La dimissione non e' la fine del percorso chirurgico: e' il passaggio a una fase nuova. Da qui, la persona e i suoi familiari gestiscono da soli cio' che in ospedale gestivano i professionisti."),
 (1,"chiaro",0,"La ferita, i farmaci, il movimento, i segnali d'allarme: tutto quello che in reparto faceva l'infermiere, da domani lo fa la persona, o chi le sta accanto."),
 (1,"chiaro",0,"Molte riammissioni nascono da una dimissione affrettata o da un'educazione incompleta. Questa lezione risponde a una domanda che compare spesso all'orale: come si dimette bene un paziente?"),

 (2,"chiaro",0,"Il principio: la dimissione si pianifica dall'ingresso, anzi spesso dal prericovero, quando la persona e' ancora lucida e ha tempo per capire."),
 (2,"profondo",1.2,"[serious] La dimissione si pianifica dall'ingresso."),
 (2,"chiaro",0,"Si valutano precocemente i bisogni che la persona avra' a casa: autonomia, supporto familiare, abitazione, dispositivi, anche con strumenti di screening del rischio di dimissione difficile, come l'indice BRASS."),
 (2,"chiaro",0,"Se si scopre il giorno della dimissione che la persona vive sola al terzo piano senza ascensore, e' troppo tardi: i servizi hanno bisogno di giorni per attivarsi, non di ore."),

 (3,"chiaro",0,"Due tipi di dimissione. Ordinaria: la persona torna a casa autonoma, o con un supporto familiare sufficiente per i bisogni che restano: una medicazione, qualche iniezione, un controllo."),
 (3,"chiaro",0,"Protetta: la persona ha bisogni sanitari o socio-sanitari che richiedono la presa in carico dei servizi territoriali, perche' a casa, da sola o con la famiglia, non ce la farebbe."),
 (3,"chiaro",0,"La dimissione protetta si attiva in anticipo, oggi spesso attraverso la Centrale Operativa Territoriale, la COT, che fa da regia fra ospedale e territorio."),
 (3,"chiaro",0,"E puo' portare all'assistenza domiciliare integrata, a una struttura intermedia come l'Ospedale di Comunita', o alla residenzialita'. Lo vedremo nella lezione undici punto sette."),

 (4,"chiaro",0,"La lettera infermieristica di dimissione, che abbiamo visto nella lezione due punto sette e che nel paziente chirurgico ha contenuti specifici."),
 (4,"chiaro",0,"I bisogni assistenziali residui, l'autonomia e gli ausili, la ferita: aspetto, medicazione in uso, frequenza del cambio, data di rimozione dei punti. Tutto cio' che chi arriva dopo deve sapere senza chiedere."),
 (4,"chiaro",0,"I dispositivi presenti, l'educazione erogata e quella ancora da completare, il caregiver di riferimento, i contatti."),
 (4,"chiaro",0,"E' il documento con cui l'infermiere del territorio riprende il filo: senza, ricomincia da zero, e la persona racconta tutto per la terza volta."),

 (5,"chiaro",0,"I contenuti dell'educazione. La ferita: igiene delle mani prima di toccare la medicazione, quando si puo' fare la doccia, come e quando cambiare la medicazione, e che cosa e' normale vedere nei primi giorni."),
 (5,"chiaro",0,"E soprattutto i segni di infezione: rossore che si estende, calore, gonfiore, secrezione, dolore in aumento, febbre. E quelli di deiscenza: la ferita che si apre, il liquido abbondante."),
 (5,"chiaro",0,"Molte infezioni del sito chirurgico compaiono a casa, come abbiamo detto nella lezione sette punto quattro: riconoscerle presto dipende da questo momento."),

 (6,"chiaro",0,"I dispositivi. Se la persona torna a casa con un drenaggio, deve saperlo svuotare, misurare e annotare la quantita' e l'aspetto, mantenerlo fissato e riconoscere i segni d'allarme."),
 (6,"chiaro",0,"Lo stesso vale per catetere, stomia, PICC: ogni dispositivo ha i suoi gesti quotidiani e i suoi segnali da riconoscere, e ognuno va insegnato con il dispositivo in mano, non a parole."),
 (6,"chiaro",0,"E la verifica non si fa chiedendo «ha capito?», ma facendo eseguire la manovra: e' il teach-back della lezione due punto sette, nella sua forma pratica."),

 (7,"chiaro",0,"La terapia. Alla dimissione si esegue la riconciliazione della Raccomandazione diciassette: quali farmaci sono nuovi, quali sospesi, quali modificati rispetto a prima del ricovero."),
 (7,"chiaro",0,"E quando riprendere quelli sospesi per l'intervento, come anticoagulanti e antiaggreganti: una data precisa, scritta, non un «quando se la sente». Un anticoagulante dimenticato e' una trombosi a casa."),
 (7,"chiaro",0,"Se la persona deve fare l'eparina a casa, si insegna la tecnica di autosomministrazione, la durata della terapia e lo smaltimento degli aghi."),
 (7,"chiaro",0,"Per gli analgesici: orari, dose massima del paracetamolo, e prevenzione della stipsi se prende oppioidi. Il dolore a casa si tratta a orario, non quando diventa insopportabile."),

 (8,"chiaro",0,"La vita quotidiana. La mobilizzazione e l'attivita' fisica progressiva: che cosa si puo' fare oggi, e che cosa fra una settimana. Le precauzioni specifiche, come quelle della protesi d'anca. Alimentazione e idratazione."),
 (8,"chiaro",0,"Quando riprendere il lavoro, la guida, i rapporti sessuali: sono le domande che la persona spesso non fa, e che aspetta."),
 (8,"chiaro",0,"E la prevenzione della trombosi, che a casa dipende dalla persona: camminare, fare gli esercizi delle gambe, bere. E sapere che una gamba gonfia e dolente va fatta vedere, subito."),

 (9,"chiaro",0,"Il follow-up. Gli appuntamenti di controllo, con il chirurgo, per la rimozione dei punti, per le medicazioni. Gli esami da eseguire, con la data e il luogo, non «fra qualche settimana»."),
 (9,"chiaro",0,"I numeri di telefono per i problemi, scritti in modo chiaro: chi chiamare di giorno, chi di notte. Il ruolo del medico di medicina generale e dell'infermiere di famiglia e comunita'."),
 (9,"chiaro",0,"E in molte realta' un contatto telefonico infermieristico nei giorni successivi, che intercetta i problemi prima che diventino un ritorno in pronto soccorso: una telefonata costa meno di una riammissione."),

 (10,"chiaro",0,"E come si educa bene. Si comincia presto, non il giorno della dimissione, quando la persona e' stanca e pensa solo a tornare a casa."),
 (10,"chiaro",0,"Poche informazioni alla volta, linguaggio semplice, materiale scritto da portare a casa. Si coinvolge il caregiver, perche' spesso e' lui che fara' le cose."),
 (10,"chiaro",0,"Si verifica con il teach-back: la persona ripete con parole sue, o mostra con le mani. Se non ci riesce, non ha capito lei: abbiamo spiegato male noi, e si ricomincia."),
 (10,"chiaro",0,"E si tiene conto dell'alfabetizzazione sanitaria e della lingua, con il mediatore culturale quando serve: un foglio di istruzioni in italiano non serve a chi non lo legge."),

 (11,"chiaro",0,"Il caso. Anziana di ottantadue anni, vive sola, operata di protesi d'anca; dimissione prevista fra due giorni. Che cosa fai?"),
 (11,"chiaro",0,"Valuti l'autonomia e il contesto abitativo e familiare: riesce ad alzarsi, a vestirsi, a salire le scale? C'e' qualcuno che puo' stare con lei? Sa fare un'iniezione, o c'e' chi puo' impararla?"),
 (11,"chiaro",0,"Se i bisogni non possono essere soddisfatti a casa, segnali la necessita' di una dimissione protetta e attivi la COT secondo procedura: riabilitazione in struttura, Ospedale di Comunita' o ADI con fisioterapia e ausili."),
 (11,"chiaro",0,"Nel frattempo educhi alle precauzioni dell'anca, alla prevenzione delle cadute e all'eparina a domicilio, verificando con il teach-back. E compili la lettera infermieristica."),

 (12,"chiaro",0,"In Veneto le dimissioni protette passano oggi dalle Centrali Operative Territoriali, che coordinano il passaggio fra ospedale e territorio."),
 (12,"chiaro",0,"Verso l'ADI distrettuale, gli Ospedali di Comunita', le strutture residenziali, con l'infermiere di famiglia e comunita' come riferimento a domicilio, che conosce la persona prima che abbia un problema."),
 (12,"chiaro",0,"E' il modello del decreto ministeriale settantasette del duemilaventidue, che approfondiremo nella lezione undici punto sette: l'ospedale cura l'acuto, il territorio prende in carico il resto."),

 (13,"chiaro",0,"La tabella. Pianificare dall'ingresso, con lo screening della dimissione difficile. Dimissione ordinaria o protetta, tramite la COT. Lettera infermieristica con la ferita, i dispositivi, il caregiver."),
 (13,"chiaro",0,"Educare a ferita e segni di infezione, dispositivi, terapia con riconciliazione, vita quotidiana, prevenzione della trombosi. Follow-up e contatti. E teach-back."),

 (14,"chiaro",0,"La frase della lezione: la persona dimessa bene e' quella che sa che cosa fare, e chi chiamare quando qualcosa non va. Non quella che ha ricevuto piu' fogli."),
 (14,"profondo",1.2,"[warm] La persona dimessa bene sa che cosa fare, e chi chiamare."),

 (15,"chiaro",0,"Non e' una frase di circostanza: e' il criterio con cui, all'orale, si giudica una dimissione raccontata bene."),
 (15,"chiaro",0,"[warm] Nella prossima lezione ricomponiamo il modulo nove lungo una linea del tempo, dalla decisione chirurgica alla ripresa a casa. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Si pianifica dall'ingresso",3:"Ordinaria e protetta",4:"La lettera infermieristica",5:"Educazione: la ferita",6:"Educazione: i dispositivi",7:"Educazione: la terapia",
 8:"Educazione: la vita quotidiana",9:"Il follow-up",10:"Come si educa bene",11:"Il caso",12:"In Veneto",13:"La tabella",14:"La frase della lezione",15:"Chiusura"}

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
