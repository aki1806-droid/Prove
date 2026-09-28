# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] L'antibiotico-resistenza e' considerata una delle principali minacce per la salute pubblica di questo secolo, e l'Italia e' fra i Paesi europei piu' colpiti. Questa lezione ha due parti: il nemico, e la strategia."),
 (1,"chiaro",0,"Per l'infermiere non e' un tema da microbiologi: la diffusione dei germi resistenti passa dalle mani e dall'ambiente, e l'uso corretto degli antibiotici passa anche dalla somministrazione."),

 (2,"chiaro",0,"L'antibiotico-resistenza e' la capacita' di un microrganismo di sopravvivere a un farmaco che normalmente lo eliminerebbe. E' un fenomeno naturale, che esiste da prima degli antibiotici."),
 (2,"chiaro",0,"Ma e' enormemente accelerato dall'uso eccessivo e inappropriato degli antibiotici, che uccide i germi sensibili e seleziona quelli resistenti: restano quelli che il farmaco non tocca, e si moltiplicano."),
 (2,"chiaro",0,"Quando un germe e' resistente a piu' classi di antibiotici si parla di MDRO, organismi multiresistenti. E' la sigla che torna in tutte le procedure di isolamento."),

 (3,"chiaro",0,"Il peso del problema. Le stime europee attribuiscono alle infezioni da germi resistenti decine di migliaia di decessi ogni anno nell'Unione, e l'Italia e' fra i Paesi con la quota piu' alta di questi decessi."),
 (3,"chiaro",0,"Un dato che ricorre: la resistenza ai carbapenemi, antibiotici di ultima linea, in Klebsiella pneumoniae e' in Italia fra le piu' elevate d'Europa. Non e' un problema futuro: e' nei nostri reparti."),

 (4,"chiaro",0,"I nomi da conoscere, con le sigle, scandite una per una. MRSA: Staphylococcus aureus resistente alla meticillina. VRE: enterococchi resistenti alla vancomicina, gli enterococchi dell'intestino."),
 (4,"chiaro",0,"ESBL: enterobatteri produttori di beta-lattamasi a spettro esteso. CRE: enterobatteri resistenti ai carbapenemi, fra cui la KPC, Klebsiella pneumoniae produttrice di carbapenemasi."),
 (4,"chiaro",0,"E poi Acinetobacter baumannii e Pseudomonas aeruginosa multiresistenti, i germi che si incontrano nelle terapie intensive e nei pazienti ventilati. Sei nomi, sei sigle da saper sciogliere."),
 (4,"chiaro",0,"Accanto a questi, il Clostridioides difficile, che non e' un MDRO in senso stretto ma e' figlio diretto dell'uso di antibiotici: lo ritroveremo alla fine della lezione."),

 (5,"chiaro",0,"Un punto chiave, ripreso dalla lezione quattro punto uno. La maggior parte dei portatori di MDRO e' colonizzata, non infetta: il germe e' nell'intestino, sulla cute, nel naso, senza causare malattia."),
 (5,"chiaro",0,"Ma il colonizzato e' un serbatoio, e la trasmissione avviene soprattutto per contatto: attraverso le mani degli operatori e l'ambiente, le superfici, i dispositivi condivisi."),
 (5,"profondo",1.2,"[serious] Per questo le precauzioni da contatto valgono per il colonizzato come per l'infetto. Non serve la febbre perche' il germe passi da un letto all'altro."),

 (6,"chiaro",0,"Lo screening serve a scoprire i colonizzati prima che trasmettano il germe: un tampone all'ingresso, e si sa chi isolare. Si esegue nei pazienti a rischio, secondo la procedura aziendale."),
 (6,"chiaro",0,"A rischio sono i pazienti con precedenti ricoveri, i trasferiti da altri ospedali o da RSA, chi entra in terapia intensiva. Per l'MRSA il tampone nasale; per CRE e VRE il tampone rettale."),
 (6,"chiaro",0,"In molte aziende i pazienti a rischio vengono gestiti con precauzioni da contatto in attesa del risultato: si isola prima, si conferma dopo."),

 (7,"chiaro",0,"La decolonizzazione. Per l'MRSA esistono protocolli con mupirocina nasale e lavaggi corporei con clorexidina, usati in indicazioni selezionate, per esempio prima di un intervento di chirurgia protesica o cardiaca."),
 (7,"chiaro",0,"Per gli enterobatteri resistenti ai carbapenemi, invece, non esiste una decolonizzazione efficace di routine: la difesa e' impedirne la trasmissione. Mani, contatto, ambiente."),

 (8,"chiaro",0,"Sul piano nazionale, le batteriemie da enterobatteri produttori di carbapenemasi sono oggetto di una sorveglianza specifica con segnalazione obbligatoria, secondo le indicazioni del Ministero della Salute."),
 (8,"chiaro",0,"E il quadro programmatorio e' il PNCAR, il Piano Nazionale di Contrasto all'Antibiotico-Resistenza, che abbiamo citato nella lezione quattro punto uno."),

 (9,"chiaro",0,"Seconda parte: la strategia. L'antimicrobial stewardship, letteralmente la buona amministrazione degli antimicrobici, e' l'insieme coordinato di interventi per promuovere l'uso appropriato degli antimicrobici."),
 (9,"chiaro",0,"Gli obiettivi sono quattro: migliori esiti clinici, meno resistenze, meno effetti avversi, meno infezioni da Clostridioides difficile. Non significa usare meno antibiotici a prescindere: significa usarli meglio."),

 (10,"chiaro",0,"Le regole dell'uso appropriato. Il farmaco giusto, alla dose giusta, per la via giusta, per la durata giusta: piu' breve possibile, compatibilmente con l'efficacia."),
 (10,"chiaro",0,"La de-escalation: iniziare con un farmaco ad ampio spettro se necessario, e restringere appena arriva l'antibiogramma. Il passaggio precoce dalla via endovenosa alla via orale."),
 (10,"chiaro",0,"E le colture prima di iniziare l'antibiotico, quando possibile. E' la regola che tocca l'infermiere piu' da vicino, e la vediamo subito."),

 (11,"chiaro",0,"Il ruolo dell'infermiere e' concreto, e comincia dai campioni. Le colture si prelevano prima della prima dose di antibiotico, altrimenti possono risultare falsamente negative."),
 (11,"chiaro",0,"Le emocolture: almeno due set, da siti diversi, con volume adeguato, indicativamente otto-dieci millilitri per flacone nell'adulto, perche' il volume e' il primo determinante della sensibilita'."),
 (11,"chiaro",0,"Antisepsi accurata della cute e del tappo del flacone, e niente prelievo dal catetere se non e' indicato. Una coltura contaminata porta a terapie inutili: e' stewardship anche questa."),

 (12,"chiaro",0,"Poi la somministrazione. Rispettare gli orari: per molti antibiotici l'efficacia dipende dal mantenimento di concentrazioni adeguate, e uno slittamento di ore conta."),
 (12,"chiaro",0,"Somministrare tempestivamente la prima dose nella sepsi, dove ogni ora di ritardo peggiora la prognosi. Rispettare i tempi di infusione prescritti: un'infusione troppo veloce o troppo lenta cambia l'effetto del farmaco."),
 (12,"chiaro",0,"Segnalare reazioni ed effetti avversi, a partire dalla diarrea. E contribuire a ricordare la rivalutazione della terapia a quarantotto-settantadue ore, quando arrivano le colture."),

 (13,"chiaro",0,"E la parte piu' potente del ruolo infermieristico: ogni infezione prevenuta e' un antibiotico non usato. Igiene delle mani, precauzioni, rimozione precoce dei dispositivi."),
 (13,"chiaro",0,"E l'educazione della persona e dei familiari: assumere l'antibiotico esattamente come prescritto, non conservare gli avanzi per la prossima volta."),
 (13,"profondo",1.2,"[serious] Non chiedere antibiotici per il raffreddore o l'influenza, che sono malattie virali. Ogni infezione prevenuta e' un antibiotico non usato: e' la frase da portare a casa."),

 (14,"chiaro",0,"Un concetto che chiude il quadro: One Health, una sola salute. La salute umana, quella animale e quella ambientale sono collegate, e le resistenze circolano fra le tre."),
 (14,"chiaro",0,"Gli antibiotici usati negli allevamenti e quelli dispersi nell'ambiente selezionano resistenze tanto quanto quelli usati in ospedale. E' l'approccio adottato dal PNCAR e dalle organizzazioni internazionali."),

 (15,"chiaro",0,"Un caso tipico. Paziente trasferito da una RSA, febbrile, con catetere vescicale da dieci giorni. Che cosa fai prima della prima dose di antibiotico?"),
 (15,"chiaro",0,"Precauzioni da contatto e screening secondo procedura, tampone rettale compreso, perche' proviene da una struttura a rischio: una RSA e' fra le provenienze che la procedura elenca."),
 (15,"chiaro",0,"Emocolture, due set, siti diversi, volume adeguato, e urinocoltura dal punto di prelievo del catetere, o meglio dal catetere sostituito se indicato, prima della prima dose. Poi l'antibiotico prescritto, subito."),
 (15,"chiaro",0,"E la domanda che nessuno fa: quel catetere serve ancora? Dieci giorni di catetere sono dieci giorni di porta aperta."),

 (16,"chiaro",0,"Un collegamento da portare all'orale. L'antibiotico altera la flora intestinale; la flora alterata lascia spazio al difficile; il difficile causa diarrea e si trasmette per contatto, con spore resistenti all'alcol."),
 (16,"chiaro",0,"Ecco perche' stewardship, igiene delle mani e isolamento sono la stessa battaglia vista da tre lati. Le lezioni tre punto sette, quattro punto tre e questa si tengono per mano."),

 (17,"chiaro",0,"Nelle aziende del servizio sanitario veneto operano programmi di antimicrobial stewardship con gruppi multidisciplinari: infettivologo, microbiologo, farmacista, infermiere. Quattro professioni allo stesso tavolo."),
 (17,"chiaro",0,"Monitorano i consumi di antibiotici, le resistenze locali e gli MDRO, e diffondono protocolli di terapia empirica. All'orale la parola chiave e' multidisciplinare: l'infermiere e' parte del programma, non esecutore a valle."),

 (18,"chiaro",0,"Ricapitoliamo. Le sigle: MRSA, VRE, ESBL, CRE e KPC. Il colonizzato e' un serbatoio. Screening nasale per l'MRSA, rettale per CRE e VRE."),
 (18,"chiaro",0,"La stewardship e' farmaco, dose, via e durata giusti, con de-escalation e passaggio precoce alla via orale. Le colture si prelevano prima della prima dose, e le emocolture in due set da siti diversi."),
 (18,"chiaro",0,"[warm] E la frase da ricordare: ogni infezione prevenuta e' un antibiotico non usato. Nella prossima lezione il rischio biologico per l'operatore, e la gestione dei rifiuti. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Che cos'e' la resistenza",3:"Il peso",4:"Gli MDRO",5:"Colonizzazione e serbatoio",
 6:"Lo screening",7:"La decolonizzazione",8:"La sorveglianza nazionale",9:"La stewardship",
 10:"Le regole",11:"I campioni",12:"La somministrazione",13:"Prevenzione ed educazione",14:"One Health",
 15:"Il caso d'esame",16:"Il nesso con il difficile",17:"In Veneto",18:"Chiusura"}

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
