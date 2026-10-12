# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 17.3). Le
# 13 scene di partenza stanno a ~503 caratteri l'una, contro un tetto di 225
# per blocco: ogni scena diventa tre o quattro blocchi, nello stesso ordine.
#
# Il parlato di partenza misura 6.543 caratteri. Le aggiunte (AGG) vengono
# quasi tutte dallo schermo dello stesso documento, che nel parlato non c'era.
# NESSUN fatto nuovo, ne' clinico ne' normativo.
#
# Misura del copione: la voce del modulo 17 ha letto a 16,86 car/s sulla 17.1
# e a 16,12 sulla prima presa della 17.2. Un copione fra 7.050 e 7.150
# caratteri sta nei 7:50 a tutte e due le velocita'.
#
# Registro del modulo: sobrio, concreto, mai pietistico. Tag: [warm] in
# apertura e in chiusura, [thoughtful] sul riepilogo.
#
# Una correzione al copione di partenza: «la frase della legge
# duecentodiciannove: il tempo dato all'ascolto e' tempo di cura». La legge
# 219/2017 (art. 1, comma 8) dice «il tempo della comunicazione tra medico e
# paziente costituisce tempo di cura». Il parlato riporta la formula della
# legge, non la parafrasi.
#
# Le frasi citate (vedra' che si riprende, chiedo all'infermiere...) restano
# senza virgolette: la voce le legge comunque, e le virgolette non si dicono.
#
# Il velo rosa sta su che cosa NON si fa e NON si dice: e' il contenuto
# correttivo.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. Questa lezione affronta la domanda che chi lavora in quest'area teme di piu': sto morendo?"),
 # AGG: dallo schermo della scena 1.
 (1,"chiaro",0,"E piu' in generale la relazione con la persona nella fase avanzata, e con la sua famiglia: che cosa dire, che cosa non dire, che cosa fare quando le parole non ci sono."),
 (1,"profondo",1.2,"Non ti daro' formule, perche' non esistono. Ti daro' criteri, e il primo e' questo: non si tratta di trovare le parole giuste. Si tratta di non scappare."),

 (2,"chiaro",0,"Partiamo dal quadro. La persona ha diritto di conoscere la propria condizione, come stabilisce la legge duecentodiciannove del duemiladiciassette. E ha anche il diritto di non sapere, se lo sceglie."),
 (2,"profondo",0,"L'informazione clinica compete al medico. L'OSS non comunica diagnosi e prognosi, ma non mente. Sono due cose diverse, e la differenza e' tutto."),
 (2,"tenue",0,"E un'avvertenza: il patto del silenzio che i familiari chiedono spesso, cioe' non dire nulla alla persona, non e' nell'interesse della persona."),
 # AGG: «non gestito da soli», e perche' il silenzio non protegge (lo stesso
 # «si sente sola» della scena 3).
 (2,"chiaro",1.2,"Va riportato all'equipe, non gestito da soli. E quasi sempre la persona sa gia': il silenzio intorno a lei non la protegge, la lascia sola con quello che sa."),

 (3,"tenue",0,"Sto morendo? Che cosa non fare. Non rispondere con una bugia, come ma no, vedra' che si riprende: la persona la riconosce, e si sente sola."),
  # AGG: «la via d'uscita piu' facile».
 (3,"tenue",0,"Non rispondere con una diagnosi, perche' non compete all'OSS. E non sfuggire, dicendo chiedo all'infermiere, e andandosene: e' la via d'uscita piu' facile."),
 (3,"chiaro",0,"Che cosa fare: restare, e restituire, con una domanda aperta. Che cosa la fa pensare questo? Che cosa teme di piu'?"),
 (3,"profondo",1.2,"Spesso la persona non vuole un'informazione: vuole poterne parlare. E subito dopo si riferisce all'equipe che la domanda e' stata posta."),

 # AGG: il nome intero di Elisabeth Kübler-Ross.
 (4,"chiaro",0,"Un modello che i quiz chiedono: le fasi dell'elaborazione descritte da Elisabeth Kübler-Ross. Negazione, rabbia, patteggiamento, depressione, accettazione."),
 (4,"chiaro",0,"Il punto da capire e' che non sono tappe obbligate, ne' lineari: si alternano, si saltano, si ripetono. Servono a riconoscere cio' che si vede, non a classificare la persona."),
 (4,"profondo",1.2,"Due indicazioni pratiche. La rabbia verso gli operatori e' spesso rabbia verso la malattia: va accolta, senza prenderla sul personale. E l'accettazione non e' un obiettivo da imporre."),

 (5,"chiaro",0,"L'ascolto. Il silenzio non e' un vuoto da riempire: e' lo spazio in cui la persona trova le parole. Domande aperte, poche, senza fretta. E restituire: sento che questo le pesa molto."),
 (5,"tenue",0,"Non consolare subito: vedra' che andra' bene chiude il discorso proprio quando si stava aprendo. Non confrontare: conosco uno che sposta l'attenzione dalla persona a qualcun altro."),
 (5,"profondo",1.2,"E ricordare la formula della legge duecentodiciannove: il tempo della comunicazione e' tempo di cura. Non e' tempo sottratto all'assistenza."),

 (6,"chiaro",0,"Nella fase avanzata il non verbale pesa piu' delle parole. Sedersi alla stessa altezza, invece di stare in piedi accanto al letto. Il contatto visivo. Il tocco, se gradito: una mano sulla spalla, o sulla mano."),
 (6,"chiaro",0,"Un tono di voce basso e lento, nessuna fretta nei gesti, anche quando il turno ne ha. E si parla alla persona anche quando non risponde, perche' l'udito resta a lungo, spesso fino alla fine."),
 (6,"tenue",1.2,"E mai parlare della persona in sua presenza come se non ci fosse. E' una delle violazioni della dignita' piu' frequenti, e delle piu' evitabili."),

 (7,"chiaro",0,"La famiglia. Nelle cure palliative i familiari sono destinatari delle cure, non solo accompagnatori. Vivono paura, senso di colpa, impotenza, stanchezza, rabbia, spesso tutte insieme."),
 (7,"chiaro",0,"Hanno bisogno di informazioni, di sentirsi utili, e di permessi: il permesso di riposare, di piangere, di andare a casa, senza sentirsi in colpa."),
 (7,"profondo",0,"Puo' andare a riposare, resto io. E' una frase che cambia la giornata di un familiare, e l'OSS puo' dirla."),
 (7,"chiaro",1.2,"L'OSS e' spesso l'operatore con cui i familiari parlano di piu', perche' e' presente, e perche' non fa paura. Per questo quello che dice conta."),

 (8,"chiaro",0,"Il caregiver, cioe' chi assiste a casa, porta un carico fisico ed emotivo che tende a non riconoscere. I segni di esaurimento: non dorme, non mangia, si isola, si arrabbia, si colpevolizza."),
 (8,"chiaro",0,"L'OSS, soprattutto al domicilio, insegna gesti semplici che lo rendono capace: il posizionamento, l'igiene della bocca, i piccoli comfort."),
 (8,"chiaro",0,"E riferisce all'equipe i segni di esaurimento, perche' esistono servizi di sostegno, dal supporto psicologico ai ricoveri di sollievo."),
 (8,"profondo",1.2,"Un caregiver esausto non puo' assistere. Proteggerlo e' proteggere la persona, ed e' parte del lavoro dell'equipe."),

 (9,"chiaro",0,"I conflitti familiari. Il fine vita riattiva conflitti antichi, e ne crea di nuovi: sulle scelte di cura, sulle informazioni da dare, su chi decide, su chi puo' essere presente."),
 (9,"tenue",0,"L'OSS non prende posizione, e non fa da messaggero tra le parti. Lo sai gia' dal Modulo due, ma qui la tentazione e' piu' forte."),
 (9,"chiaro",0,"Riferisce all'equipe, dove l'assistente sociale e lo psicologo hanno gli strumenti per intervenire. Il compito dell'OSS e' segnalare, non risolvere."),
 (9,"profondo",1.2,"E un'attenzione: nei conflitti qualcuno viene escluso, e a volte e' la persona stessa. La sua voce va sempre cercata."),

 (10,"chiaro",0,"Un caso specifico: la persona con demenza avanzata. E' una condizione da cure palliative, anche se spesso non viene riconosciuta. I segni: rifiuto del cibo, infezioni ricorrenti, immobilita'."),
 (10,"chiaro",0,"Il dolore non viene detto a parole: si usano le scale osservazionali. E la relazione passa dal non verbale: la voce, il tocco, i volti noti, la routine."),
 (10,"profondo",1.2,"I familiari vivono un lutto che inizia prima della morte, perche' la persona che conoscevano non c'e' piu' da tempo. Va riconosciuto."),

 (11,"chiaro",0,"Le differenze culturali e religiose. Ogni cultura e ogni religione ha un modo proprio di vivere la malattia, la morte e il corpo."),
 (11,"chiaro",0,"Chi deve essere informato, chi decide, chi puo' toccare il corpo e come, quali riti, quali alimenti. Le risposte cambiano da una famiglia all'altra, anche nella stessa religione."),
 (11,"chiaro",0,"Non si presume: si chiede alla persona e alla famiglia, con rispetto e senza imbarazzo. E si riferisce all'equipe, perche' la mediazione culturale esiste e va attivata."),
 (11,"profondo",1.2,"Il rispetto non richiede di condividere le convinzioni dell'altro. Richiede di conoscerle, e di fare loro spazio."),

 (12,"tenue",0,"Le frasi da evitare, perche' sono quelle che vengono in mente per prime. Vedra' che andra' tutto bene. Bisogna essere forti. Conosco uno che. Non ci pensi."),
 (12,"tenue",0,"E' la volonta' di Dio, se non e' la persona a dirlo per prima. Non c'e' piu' niente da fare. Ormai. E al familiare: almeno ha smesso di soffrire, prima che lo dica lui."),
 (12,"profondo",1.2,"Sono frasi che chiudono, giudicano o spostano. Meglio un silenzio onesto che una frase vuota. E se non si sa che cosa dire, si puo' dirlo."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. La persona ha diritto di sapere e di non sapere, e l'OSS non comunica diagnosi, ma non mente. Davanti a sto morendo: non si mente, non si diagnostica, non si sfugge."),
 (13,"chiaro",0,"Si resta, si restituisce, si riferisce. Le fasi di Kübler-Ross non sono lineari, servono a riconoscere, non a classificare, e la rabbia non e' personale."),
 (13,"chiaro",0,"Il silenzio non e' un vuoto, il non verbale pesa piu' delle parole, si parla anche a chi non risponde. La famiglia e' destinataria delle cure, il caregiver va protetto, e non si fa da messaggero."),
 (13,"chiaro",0,"[warm] Nella prossima lezione: le ultime ore, il momento della morte, e che cosa fa l'OSS."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Non scappare",2:"Il diritto di sapere",3:"Sto morendo?",
 4:"Le fasi dell'elaborazione",5:"L'ascolto",6:"Il non verbale",7:"La famiglia",
 8:"Il caregiver",9:"I conflitti familiari",10:"La demenza avanzata",
 11:"Culture e religioni",12:"Che cosa non dire",13:"Riepilogo"}

blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>MAX_SCENE: errori.append(f"scene {nscene} > {MAX_SCENE}")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>MAX_CAR_BLOCCO: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")
for a,b in zip(blocchi, blocchi[1:]):
    if a["capitolo"]!=b["capitolo"] and not a["posa"]:
        errori.append(f'{a["id"]}: chiude il capitolo {a["capitolo"]} senza posa')

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])} per {pose:.1f} s")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:50]}...')

acc=0; stacco=None
for b in blocchi:
    acc+=len(b["text"])
    if stacco is None and acc>tot/2: stacco=b["id"]
A=sum(len(b["text"]) for b in blocchi[:[x["id"] for x in blocchi].index(stacco)+1])
print(f"\nstacco tracce dopo {stacco}:  chunkA {A} car  ·  chunkB {tot-A} car   (limite 5000)")

# Lo stacco che conta e' quello dichiarato in profilo.py, non quello suggerito
# qui: il suggerimento divide a meta' i caratteri, la scelta la fa chi scrive e
# va su un cambio di capitolo. I due file di testo finora si scrivevano a mano,
# ed e' il passaggio in cui lo stacco della lezione precedente sopravvive senza
# che nessun controllo se ne accorga — i conti tornano tutti, sui blocchi
# sbagliati. Quindi li scrive questo script, dallo STACCO dichiarato.
ids = [b["id"] for b in blocchi]
if STACCO not in ids:
    errori.append(f"STACCO «{STACCO}» non e\' un blocco di questa lezione")
else:
    k = ids.index(STACCO) + 1
    if blocchi[k-1]["capitolo"] == blocchi[k]["capitolo"]:
        errori.append(f"STACCO «{STACCO}» cade dentro il capitolo "
                      f"{blocchi[k]['capitolo']}, non a un cambio")
    if STACCO != stacco:
        print(f"  (STACCO dichiarato {STACCO}, il mezzo dei caratteri cade a {stacco})")

if errori:
    print("\nERRORI:"); [print("  -",e) for e in errori]; sys.exit(1)
qui = _pl.Path(__file__).parent
json.dump(blocchi, open(qui/"blocchi.json","w",encoding="utf-8"),
          indent=1, ensure_ascii=False)

k = ids.index(STACCO) + 1
for nome, parte in (("chunkA", blocchi[:k]), ("chunkB", blocchi[k:])):
    testo = " ".join(b["text"] for b in parte)
    (qui/f"{nome}.txt").write_text(testo + "\n", encoding="utf-8")
    print(f"{nome}.txt  {len(testo)} car  ({parte[0]['id']}-{parte[-1]['id']})")

print("\nOK, nessun errore")
