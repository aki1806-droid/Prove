# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Benvenuta e benvenuto nel modulo che mette insieme tutto il corso. Fin qui abbiamo studiato per argomenti: la terapia, le infezioni, le ferite, l'emergenza."),
 (1,"chiaro",0,"Ma all'esame, e soprattutto in reparto, i problemi non arrivano divisi per capitoli: arrivano in un paziente solo. Risolveremo dodici casi, dal piu' semplice al piu' complesso, con un metodo che costruiamo oggi."),

 (2,"chiaro",0,"Perche' i casi contano tanto? La prova pratica, spesso scritta, vale fino a venti punti, con una soglia di quattordici. Lo scritto puo' chiedere risposte sintetiche. E all'orale si chiede: che cosa fa se...?"),
 (2,"chiaro",0,"In tutti e tre i casi si misura il ragionamento, non la memoria. Ho visto candidati che sapevano tutto perdere punti, perche' elencavano nozioni senza un ordine. Il metodo serve a dare quell'ordine."),

 (3,"chiaro",0,"La prima regola: leggere la traccia come un accertamento. Chi e' il paziente: eta', patologie, terapie. Dove siamo: reparto, pronto soccorso, domicilio, struttura residenziale."),
 (3,"chiaro",0,"Quando: la giornata post-operatoria, l'ora del turno, i giorni dalla chemioterapia. Che cosa e' cambiato. E soprattutto che cosa chiede la traccia: descrivere, pianificare, indicare le priorita', motivare."),
 (3,"chiaro",0,"Un consiglio pratico: sottolinea i dati anomali. Ogni dato anomalo e' un indizio che il commissario ha messo li' per farti ragionare."),

 (4,"chiaro",0,"Lo schema in cinque passi e' il processo di assistenza della lezione due punto uno, applicato al tempo reale. Uno: accertamento mirato. Due: problemi e priorita'. Tre: obiettivi."),
 (4,"chiaro",0,"Quattro: interventi motivati. Cinque: valutazione, comunicazione e documentazione. Lo useremo in tutti i dodici casi, finche' non diventera' automatico."),

 (5,"chiaro",0,"Passo uno: l'accertamento mirato. Dati soggettivi, cio' che la persona riferisce, e oggettivi, cio' che rilevi. Se il paziente e' instabile, l'accertamento e' l'ABCDE della lezione dieci punto due."),
 (5,"chiaro",0,"Poi i parametri completi, con un punteggio di allerta come la NEWS2. E le scale pertinenti: dolore, Braden, Conley, CAM, GCS, scegliendo quelle che servono, non tutte."),
 (5,"chiaro",0,"E i dati della documentazione: terapie in corso, esami, allergie. La parola chiave e' mirato: si accerta cio' che serve per decidere."),

 (6,"chiaro",0,"Passo due: problemi e priorita'. L'ordine e' sempre lo stesso. Prima il pericolo di vita immediato: vie aeree, respiro, circolo. Poi le alterazioni acute che possono evolvere: dolore acuto, coscienza, glicemia, sanguinamento."),
 (6,"chiaro",0,"Poi i rischi da prevenire: cadute, lesioni da pressione, infezioni, inalazione. Infine i bisogni di base, l'educazione, la dimissione."),
 (6,"chiaro",0,"[thoughtful] Una distinzione che da' punti: i problemi infermieristici, cioe' le diagnosi infermieristiche, e i problemi collaborativi, complicanze che sorvegli e gestisci con il medico. Il modello bifocale del modulo due."),

 (7,"chiaro",0,"Passo tre: gli obiettivi. Centrati sul paziente, non su cio' che fa l'infermiere. Misurabili, e con un tempo: un obiettivo misurabile rende possibile la valutazione del passo cinque."),
 (7,"chiaro",0,"Non migliorare il respiro, ma saturazione fra novantaquattro e novantotto e frequenza respiratoria sotto venti entro due ore. Non controllare il dolore, ma dolore fino a tre a riposo e a quattro in movimento entro un'ora."),

 (8,"chiaro",0,"Passo quattro: gli interventi, in tre gruppi. Gli autonomi: posizionamento, monitoraggio, prevenzione, educazione. I collaborativi, sempre secondo prescrizione: farmaci, ossigeno con il suo target, esami."),
 (8,"chiaro",0,"Scrivere somministro l'antibiotico, senza prescrizione, e' un errore che il commissario nota subito. E poi gli interventi attribuiti all'OSS o all'assistente infermiere, con supervisione."),
 (8,"chiaro",0,"Ogni intervento va motivato, e scritto in modo specifico: non monitoro il paziente, ma rilevo i parametri ogni quindici minuti per un'ora, poi ogni ora."),

 (9,"chiaro",0,"Passo cinque: valutazione, comunicazione, documentazione. Si valuta se l'obiettivo e' raggiunto, e se no si rivede il piano. Si comunica: SBAR al medico, consegne, paziente e familiari."),
 (9,"chiaro",0,"Si documenta che cosa e' stato fatto, quando, da chi, e come ha risposto il paziente. Si segnalano eventi avversi e quasi eventi. E la continuita': dimissione, territorio. Chi dimentica questo passo perde punti."),

 (10,"chiaro",0,"Se l'ansia dell'esame ti fa dimenticare lo schema, ricordati almeno sei domande. Il paziente e' stabile? Che cosa puo' peggiorare nelle prossime ore? Che cosa faccio subito?"),
 (10,"chiaro",0,"Chi devo avvisare, e come? Che cosa preparo e che cosa insegno? Come documento, e chi riceve le consegne? Rispondere a queste sei domande, in quest'ordine, produce gia' una risposta solida."),

 (11,"chiaro",0,"[curious] Proviamo subito. Signora di ottantadue anni, frattura del femore destro, in attesa di intervento domani. Alle ventitre: dolore otto su dieci, agitata e confusa, mentre prima era orientata."),
 (11,"chiaro",0,"Non urina da sette ore. In terapia ha solo il paracetamolo al bisogno, e l'anticoagulante orale e' sospeso da ieri. Quali dati sono anomali? La confusione nuova, il dolore alto, la mancata minzione."),

 (12,"chiaro",0,"Il ragionamento. E' stabile? Rilevo parametri, saturazione e glicemia, per escludere ipossia, ipoglicemia e un'infezione. Il problema principale e' un delirium, che confermo con la CAM."),
 (12,"chiaro",0,"Con due fattori scatenanti probabili: il dolore non controllato e una possibile ritenzione urinaria, che verifico con il bladder scanner."),
 (12,"chiaro",0,"Poi i rischi: caduta, rimozione dei dispositivi, trombosi, perche' e' immobile e senza anticoagulante, lesioni ai talloni e al sacro. Avviso il medico con SBAR: analgesia e, se c'e' il globo, cateterismo."),

 (13,"chiaro",0,"Gli interventi. Analgesia secondo prescrizione, con rivalutazione dopo trenta-sessanta minuti. Bladder scanner, e cateterismo se indicato. Orientamento, occhiali e apparecchi acustici, luce soffusa, un familiare."),
 (13,"chiaro",0,"Nessuna contenzione: letto basso, campanello, sorveglianza ravvicinata. Scarico dei talloni e riposizionamento. Profilassi antitrombotica secondo prescrizione."),
 (13,"chiaro",0,"Il digiuno, secondo le indicazioni dell'anestesista per l'intervento di domani. E documentazione e consegne alla collega del mattino."),

 (14,"chiaro",0,"Una traccia semplice: dolore postoperatorio otto su dieci, descriva l'assistenza. Scritta male: l'infermiere valuta il dolore, somministra la terapia e monitora il paziente, che e' al centro dell'assistenza."),
 (14,"chiaro",0,"E' tutto vero, ma non dice nulla: nessuno strumento, nessun obiettivo, nessun tempo. Scritta bene: valuto il dolore con la scala numerica, a riposo e in movimento, e ne indago sede e caratteristiche."),
 (14,"chiaro",0,"Cerco segni di complicanza: sanguinamento, distensione, globo vescicale. Somministro l'analgesia prescritta e rivaluto dopo trenta-sessanta minuti, con l'obiettivo di un dolore fino a tre a riposo."),
 (14,"chiaro",0,"Segnalo al medico un dolore non controllato. Posiziono il paziente e gli insegno a sostenere la ferita quando tossisce. Documento valori e risposta. Stesso argomento, punteggio molto diverso."),

 (15,"chiaro",0,"Tre domande d'orale sul metodo. Prima: diagnosi infermieristica e problema collaborativo. La diagnosi descrive una risposta della persona che l'infermiere tratta in autonomia, come il rischio di caduta."),
 (15,"chiaro",0,"Il problema collaborativo e' una complicanza fisiopatologica che l'infermiere sorveglia e gestisce insieme al medico, come l'emorragia postoperatoria."),
 (15,"chiaro",0,"Seconda: come stabilisce le priorita'? Prima cio' che minaccia la vita, vie aeree, respiro, circolo. Poi le alterazioni acute che possono evolvere, poi i rischi da prevenire, infine educazione e dimissione."),
 (15,"chiaro",0,"Terza: che cos'e' un obiettivo misurabile? Un risultato centrato sul paziente, osservabile, con un valore e un tempo, che permette di valutare se l'intervento ha funzionato."),

 (16,"chiaro",0,"La risposta in quindici righe. Una o due di inquadramento: che cosa sta succedendo. Due o tre di priorita'. Sei-otto di interventi motivati, distinguendo autonomi, collaborativi e attribuiti."),
 (16,"chiaro",0,"Due o tre di valutazione, comunicazione, documentazione, continuita'. Lessico tecnico, frasi brevi. Niente premesse del tipo: l'infermiere e' responsabile dell'assistenza generale. Occupano righe, non danno punti."),

 (17,"chiaro",0,"[serious] Gli errori che costano punti. Elencare tutto senza un ordine. Scrivere diagnosi mediche come problemi infermieristici. Interventi senza secondo prescrizione."),
 (17,"chiaro",0,"Interventi generici, monitoro o sorveglio, senza dire che cosa e ogni quanto. Dimenticare sicurezza, comunicazione, documentazione. Citare norme solo per riempire. E ignorare il dato anomalo: li' c'era la domanda vera."),

 (18,"chiaro",0,"Come useremo i prossimi undici casi. Ognuno avra' uno scenario, un'evoluzione nel tempo, le decisioni da prendere, gli errori da evitare, i collegamenti ai moduli e una risposta modello in quindici righe."),
 (18,"chiaro",0,"Un consiglio che vale doppio: metti in pausa il video dopo lo scenario, e prova a rispondere da sola o da solo, per iscritto. Poi confronta. E' l'allenamento piu' vicino alla prova vera."),

 (19,"profondo",1.2,"[serious] In quattro parole: leggi il dato anomalo, metti in ordine, motiva, documenta."),
 (19,"chiaro",0,"[warm] Nella prossima lezione, il primo caso completo: un paziente ricoverato in medicina che, nel cuore della notte, comincia a peggiorare. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Perche' i casi contano",3:"Prima regola: leggere la traccia",4:"Lo schema in cinque passi",
 5:"Passo 1: l'accertamento mirato",6:"Passo 2: problemi e priorita'",7:"Passo 3: gli obiettivi",8:"Passo 4: gli interventi",
 9:"Passo 5: valutazione, comunicazione, documentazione",10:"Le sei domande da farsi",11:"Il mini-caso dimostrativo",
 12:"Il mini-caso: ragionamento",13:"Il mini-caso: interventi",14:"La stessa traccia, scritta male e scritta bene",
 15:"Le domande d'orale sul metodo",16:"La risposta in 15 righe",17:"Gli errori che costano punti",
 18:"Come useremo i prossimi undici casi",19:"Chiusura"}

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
