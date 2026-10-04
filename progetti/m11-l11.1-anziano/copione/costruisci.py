# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il modulo dedicato ai diversi momenti della vita e ai diversi luoghi di cura. Si comincia dall'anziano fragile."),
 (1,"chiaro",0,"E' la persona assistita piu' frequente, in ospedale e sul territorio. E in Veneto, una delle regioni piu' longeve d'Italia, lo e' ancora di piu'."),
 (1,"chiaro",0,"Molto di cio' che abbiamo studiato trova qui il suo punto d'incontro: cadute, delirium, malnutrizione, politerapia. Qui li rimettiamo insieme, intorno alla stessa persona."),

 (2,"chiaro",0,"Due concetti da distinguere. L'invecchiamento riduce progressivamente la riserva funzionale degli organi: a riposo tutto funziona, ma sotto stress il margine e' minore."),
 (2,"chiaro",0,"La fragilita' e' qualcosa di piu': uno stato di aumentata vulnerabilita', in cui un evento minore, un'infezione urinaria, un farmaco nuovo, un ricovero, provoca un peggioramento sproporzionato."),
 (2,"profondo",1.2,"[serious] Eta' non significa fragilita'."),
 (2,"chiaro",0,"Ci sono novantenni robusti e settantenni fragili. Quello che conta e' come la persona risponde a uno stress, non la data di nascita."),

 (3,"chiaro",0,"Uno strumento molto usato per riconoscerla sono i criteri di Fried: calo di peso involontario, astenia, ridotta forza di presa, ridotta velocita' del cammino, ridotta attivita' fisica."),
 (3,"chiaro",0,"Con tre o piu' criteri la persona e' fragile; con uno o due, pre-fragile. Forza e velocita' sono gli stessi indicatori della sarcopenia, nella lezione tre punto tre."),
 (3,"chiaro",0,"E la notizia buona: la fragilita' e' in parte reversibile, con attivita' fisica, nutrizione, e revisione dei farmaci. Per questo riconoscerla presto conta: e' una condizione su cui si puo' ancora agire."),

 (4,"chiaro",0,"Lo strumento principale della geriatria e' la valutazione multidimensionale, la VMD: si valuta la persona in tutte le sue dimensioni, non solo nella malattia."),
 (4,"chiaro",0,"Clinica: patologie e farmaci. Funzionale: le attivita' di base e quelle strumentali, ADL e IADL, e la Barthel, della lezione due punto tre. Cognitiva: per esempio il Mini Mental State."),
 (4,"chiaro",0,"Affettiva: la scala della depressione geriatrica. Nutrizionale: l'MNA. Sociale e ambientale: chi c'e' accanto, com'e' la casa, quali risorse ci sono."),
 (4,"chiaro",0,"In Veneto, per l'accesso ai servizi, la valutazione multidimensionale e' dell'UVMD, l'Unita' di Valutazione Multidimensionale Distrettuale, con la scheda SVaMA."),

 (5,"chiaro",0,"Le sindromi geriatriche: condizioni frequenti, causate da piu' fattori, che non corrispondono a una singola malattia. Non si curano con un farmaco: si gestiscono con l'assistenza."),
 (5,"chiaro",0,"Cadute, delirium, incontinenza, lesioni da pressione, malnutrizione e disfagia, immobilita', polifarmacoterapia, deficit sensoriali. Le hai incontrate tutte nei moduli due e tre."),
 (5,"chiaro",0,"Il punto e' che si influenzano a vicenda: l'immobilita' favorisce la lesione, il farmaco la caduta, la caduta l'immobilita'. Per questo si agisce su piu' fattori insieme. E' il terreno in cui l'infermiere fa piu' differenza."),

 (6,"chiaro",0,"Le tre D: delirium, demenza, depressione. Da distinguere, perche' e' una domanda frequente, e perche' cambiano il modo di assistere."),
 (6,"chiaro",0,"Il delirium: esordio acuto, in ore o giorni; decorso fluttuante; attenzione compromessa e coscienza alterata. Ed e' spesso reversibile, se si tratta la causa."),
 (6,"chiaro",0,"La demenza: esordio insidioso, in mesi o anni; decorso progressivo; e l'attenzione, nelle fasi iniziali, e' conservata. La vedremo nella prossima lezione."),
 (6,"chiaro",0,"La depressione: esordio subacuto, puo' simulare un deficit cognitivo, ed e' trattabile. E le tre possono coesistere: il delirium e' molto piu' frequente in chi ha gia' una demenza."),

 (7,"chiaro",0,"Il delirium ha tre forme. Iperattivo: agitazione, irrequietezza, a volte aggressivita'. E' quello che si nota, e che troppo spesso porta a sedare o a contenere."),
 (7,"chiaro",0,"Ipoattivo: sonnolenza, apatia, rallentamento. E' il piu' spesso non riconosciuto, perche' un anziano tranquillo e sonnolento sembra buono. E poi la forma mista."),
 (7,"chiaro",0,"Si riconosce con la CAM della lezione due punto tre. E va trattato come un'emergenza medica: e' il segno di qualcosa che non va. Infezione, farmaci, ritenzione, disidratazione, dolore."),

 (8,"chiaro",0,"La prevenzione del delirium e' in gran parte infermieristica, e non farmacologica. Orientamento: un orologio visibile, un calendario, presentarsi per nome a ogni contatto."),
 (8,"chiaro",0,"Occhiali e apparecchi acustici indossati: sembra banale, ma un anziano che non vede e non sente, in un ambiente sconosciuto, e' un candidato al delirium."),
 (8,"chiaro",0,"Sonno protetto, mobilizzazione precoce, idratazione, dolore controllato, niente stipsi ne' ritenzione, cateteri inutili rimossi, i familiari presenti. Ed evitare la contenzione, che lo peggiora."),

 (9,"chiaro",0,"La polifarmacoterapia, cinque o piu' farmaci, nell'anziano e' la regola, spesso con prescrittori diversi che non si parlano. E aumenta il rischio di interazioni e di reazioni avverse."),
 (9,"chiaro",0,"Alcuni farmaci sono potenzialmente inappropriati nell'anziano, secondo i criteri di Beers della lezione cinque punto uno: benzodiazepine, anticolinergici, alcuni antipsicotici."),
 (9,"chiaro",0,"E molte sindromi geriatriche, cadute, delirium, stipsi, ipotensione, sono effetti dei farmaci. Da qui la deprescrizione, e il ruolo dell'infermiere: segnalare il legame fra un farmaco e un sintomo nuovo."),

 (10,"chiaro",0,"Un concetto che all'orale distingue: il paradosso del ricovero. L'ospedale cura la malattia acuta, ma nell'anziano fragile puo' causare un declino funzionale."),
 (10,"chiaro",0,"L'immobilita' a letto, il delirium, la malnutrizione, la perdita delle abitudini. Molti anziani escono meno autonomi di come sono entrati, anche se la malattia e' guarita."),
 (10,"chiaro",0,"Per questo l'obiettivo e' mantenere l'autonomia residua durante la degenza: farlo camminare, mangiare seduto, andare in bagno. E pianificare una dimissione precoce."),

 (11,"chiaro",0,"Il caso. Un'anziana di ottantaquattro anni, ricoverata per un'infezione urinaria. Il secondo giorno e' molto sonnolenta, mangia poco, risponde a fatica."),
 (11,"chiaro",0,"E i familiari dicono: a casa non era cosi'. Che cosa pensi? Delirium ipoattivo, finche' non si dimostra il contrario. Non stanchezza, non eta'."),
 (11,"chiaro",0,"Che cosa fai? Valuti con la CAM. Parametri, glicemia, saturazione. Cerchi ritenzione urinaria e stipsi, verifichi idratazione e farmaci recenti. E segnali al medico."),
 (11,"chiaro",0,"Poi la prevenzione: occhiali, apparecchi, orientamento, familiari presenti, mobilizzazione. E la frase dei familiari, a casa non era cosi', e' il dato piu' importante del caso."),

 (12,"chiaro",0,"In Veneto la valutazione multidimensionale e' il cancello di accesso ai servizi per la non autosufficienza: l'UVMD distrettuale, con la SVaMA, definisce il percorso."),
 (12,"chiaro",0,"Domicilio con assistenza, centro diurno, Centro di Servizi: lo vedremo nella lezione undici punto sette. Con una popolazione fra le piu' anziane d'Italia, sono temi quotidiani."),

 (13,"chiaro",0,"La tabella. Fragilita' non e' eta'. Fried: peso, astenia, forza, velocita', attivita'; da tre in su, fragile. La VMD in sei dimensioni, e in Veneto l'UVMD con la SVaMA."),
 (13,"chiaro",0,"Le sindromi geriatriche, che si influenzano a vicenda. Il delirium: acuto, fluttuante, attenzione compromessa. E l'ipoattivo, il meno riconosciuto."),

 (14,"chiaro",0,"Un'attenzione alla comunicazione. Presentarsi. Parlare di fronte, con la luce sul proprio volto: molti anziani leggono le labbra."),
 (14,"chiaro",0,"Voce chiara, non per forza piu' forte. Frasi brevi. Verificare che apparecchi e occhiali ci siano. E dare il tempo di rispondere: la lentezza non e' confusione."),
 (14,"chiaro",0,"E non infantilizzare: chiamare nonno una persona che non e' nostro nonno lede la sua dignita'. Si usa il nome, e il lei, se e' cosi' che la persona vuole."),

 (15,"profondo",1.2,"[serious] Nell'anziano fragile, un cambiamento improvviso e' un sintomo."),
 (15,"chiaro",0,"Una nuova confusione, una caduta, un rifiuto del cibo, un'incontinenza nuova: dietro c'e' quasi sempre una causa da cercare. E chi conosce la persona da sempre, il familiare, e' spesso il primo ad accorgersene."),

 (16,"chiaro",0,"[warm] Nella prossima lezione: le demenze, con i disturbi del comportamento e gli approcci non farmacologici, che vengono prima dei farmaci."),
 (16,"chiaro",0,"E il sostegno a chi assiste: il caregiver, spesso un familiare, a volte anziano a sua volta. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Invecchiamento e fragilita'",3:"I criteri di Fried",4:"La valutazione multidimensionale",5:"Le sindromi geriatriche",6:"Le tre D",
 7:"Il delirium: i tipi",8:"La prevenzione del delirium",9:"La polifarmacoterapia",10:"Il paradosso del ricovero",11:"Il caso",12:"In Veneto",13:"La tabella",14:"La comunicazione",15:"La frase della lezione",16:"Chiusura"}

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
