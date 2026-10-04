# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La A dell'ABCDE viene prima di tutto, perche' senza vie aeree pervie la persona muore in pochi minuti. Ogni altra lettera dipende da questa."),
 (1,"chiaro",0,"In questa lezione: i presidi, dal piu' semplice al piu' avanzato; il ruolo dell'infermiere nell'intubazione; e la ventilazione meccanica, con un acronimo per il paziente ventilato che peggiora all'improvviso."),

 (2,"chiaro",0,"Le manovre le conosci dalla lezione dieci punto due: iperestensione del capo e sollevamento del mento, e nel trauma la sublussazione della mandibola. Poi i presidi semplici."),
 (2,"chiaro",0,"La cannula orofaringea, o di Guedel. La misura si sceglie dall'angolo della bocca all'angolo della mandibola. Troppo lunga spinge l'epiglottide sulla glottide; troppo corta spinge indietro la lingua."),
 (2,"chiaro",0,"E si usa solo nel paziente senza riflesso faringeo: nel paziente semicosciente provoca vomito e laringospasmo."),
 (2,"chiaro",0,"La cannula nasofaringea e' meglio tollerata nel semicosciente, ma e' controindicata nel sospetto di frattura della base cranica: la stessa regola del sondino della lezione tre punto quattro."),

 (3,"chiaro",0,"Il pallone autoespandibile con maschera, collegato all'ossigeno ad alto flusso e al reservoir. La difficolta' principale e' la tenuta della maschera."),
 (3,"chiaro",0,"La tecnica a due mani, con pollice e indice a formare una C sulla maschera e le altre dita a E sotto la mandibola, e' molto piu' efficace di quella a una mano. Un secondo operatore comprime il pallone."),
 (3,"chiaro",0,"Ventilazioni lente, che sollevano visibilmente il torace: insufflare troppo forte manda aria nello stomaco, con rischio di vomito e di inalazione."),

 (4,"chiaro",0,"I presidi sopraglottici, come la maschera laringea. Si inseriscono senza laringoscopio, si posizionano sopra la glottide e permettono di ventilare meglio della maschera facciale."),
 (4,"chiaro",0,"Sono molto utili in emergenza, anche per l'infermiere formato. Il limite: non proteggono del tutto dall'inalazione. Quando serve una protezione definitiva delle vie aeree, si passa all'intubazione."),

 (5,"chiaro",0,"L'intubazione orotracheale la esegue il medico, ma l'infermiere ha un ruolo decisivo: prepara e assiste. E un'intubazione riesce o fallisce anche per come e' stato preparato il materiale."),
 (5,"chiaro",0,"Il materiale. Il laringoscopio, verificando che la luce funzioni, con lame di misure diverse. Tubi di piu' calibri, il mandrino, la siringa per gonfiare la cuffia."),
 (5,"chiaro",0,"L'aspiratore, acceso e funzionante. Pallone e ossigeno. I farmaci secondo prescrizione. Il capnografo. Il materiale di fissaggio. E i presidi per le vie aeree difficili, pronti prima di cominciare."),
 (5,"chiaro",0,"Una preparazione incompleta si scopre nel momento peggiore: con il paziente gia' sedato, e senza ossigeno di riserva."),

 (6,"chiaro",0,"Dopo l'intubazione, la verifica. Il riferimento e' la capnografia: se il tubo e' in trachea, a ogni espirazione compare anidride carbonica. Se e' in esofago, no."),
 (6,"chiaro",0,"Poi il sollevamento simmetrico del torace e l'auscultazione, per escludere un tubo troppo profondo, in un solo bronco: di solito il destro, che e' piu' verticale."),
 (6,"chiaro",0,"La cuffia si porta a venti, trenta centimetri d'acqua, come per la tracheostomia della lezione otto punto due. Troppo gonfia lede la mucosa; troppo sgonfia lascia passare le secrezioni."),
 (6,"chiaro",0,"Si fissa il tubo e si annotano i centimetri all'arcata dentaria: e' il riferimento per accorgersi di uno spostamento. Poi la radiografia."),

 (7,"chiaro",0,"La ventilazione meccanica invasiva, nelle linee essenziali. Le modalita' controllate: a volume, in cui si imposta il volume di ogni respiro e la pressione varia di conseguenza."),
 (7,"chiaro",0,"Oppure a pressione, in cui si imposta la pressione e varia il volume. Poi le modalita' assistite o di supporto: e' il paziente ad avviare il respiro, e il ventilatore lo sostiene. Si usano nello svezzamento."),
 (7,"chiaro",0,"I parametri principali. Il volume corrente: con una strategia protettiva, intorno a sei, otto millilitri per chilo di peso ideale. La frequenza respiratoria. La FiO2, la frazione di ossigeno inspirata."),
 (7,"chiaro",0,"E la PEEP, la pressione positiva di fine espirazione, che tiene aperti gli alveoli alla fine di ogni espirazione, e migliora l'ossigenazione."),

 (8,"chiaro",0,"Gli allarmi. Alta pressione: c'e' un ostacolo al passaggio dell'aria. Secrezioni, tubo piegato o morso, tosse, broncospasmo, pneumotorace, un paziente che si oppone al ventilatore."),
 (8,"chiaro",0,"Bassa pressione, o basso volume: l'aria si perde. Disconnessione, perdita dalla cuffia o dal circuito, fino all'estubazione accidentale, la piu' grave."),
 (8,"profondo",1.2,"[serious] Mai silenziare un allarme senza averne capito la causa."),
 (8,"chiaro",0,"Vale per il ventilatore come per le pompe della lezione sei punto tre: l'allarme e' un'informazione, e chi lo spegne senza capirlo la butta via."),

 (9,"chiaro",0,"E l'acronimo per il paziente ventilato che peggiora improvvisamente: DOPE. Quattro lettere da scorrere in ordine, mentre si chiama aiuto."),
 (9,"chiaro",0,"D, dislocazione del tubo: estubazione, o tubo scivolato in un solo bronco. O, ostruzione: secrezioni, tubo piegato."),
 (9,"chiaro",0,"P, pneumotorace, soprattutto con pressioni di ventilazione alte. E, equipment: un guasto del ventilatore o della fornitura di ossigeno."),
 (9,"chiaro",0,"La regola pratica: nel dubbio, si stacca il paziente dal ventilatore e lo si ventila con il pallone. Se migliora, il problema e' nella macchina; se no, e' nel paziente o nel tubo."),

 (10,"chiaro",0,"La sicurezza del paziente ventilato. Al letto ci sono sempre il pallone con maschera e un aspiratore funzionante: se il ventilatore si ferma, sono le due cose che servono subito."),
 (10,"chiaro",0,"Si applica il bundle VAP della lezione tre punto uno: testata a trenta, quarantacinque gradi, igiene del cavo orale, aspirazione sub-glottica, controllo della cuffia, interruzione quotidiana della sedazione."),
 (10,"chiaro",0,"L'aspirazione si fa solo quando serve, con le regole della lezione otto punto due. E si previene l'estubazione accidentale: fissaggio, attenzione nei movimenti, controllo dell'agitazione."),

 (11,"chiaro",0,"La persona dietro il ventilatore. La sedazione si valuta con una scala, come la RASS, rispetto a un obiettivo prescritto: oggi si tende a una sedazione leggera. Il delirium, con la CAM-ICU."),
 (11,"chiaro",0,"La cura degli occhi: il paziente sedato non chiude bene le palpebre e rischia lesioni della cornea. La cute, e le lesioni da dispositivo: tubo, fissaggi, sondini. Il posizionamento."),
 (11,"chiaro",0,"E la comunicazione: si parla al paziente, anche se sedato, spiegando cio' che si fa, con calma e chiamandolo per nome. E si sostengono i familiari, che vedono la persona circondata da macchine."),

 (12,"chiaro",0,"Il caso. Paziente intubato: improvvisamente saturazione ottantadue, allarme di alta pressione, il paziente e' agitato e morde il tubo. Che cosa fai?"),
 (12,"chiaro",0,"Chiami aiuto, e applichi DOPE, lettera per lettera. Il tubo e' al suo posto, i centimetri sono quelli annotati? E' ostruito, dal morso o dalle secrezioni?"),
 (12,"chiaro",0,"Se il dubbio persiste, stacchi dal ventilatore e ventili con il pallone e l'ossigeno. Blocca-morso se previsto, aspirazione se ci sono secrezioni; il medico valuta la sedazione. Poi rivaluti."),

 (13,"chiaro",0,"In Veneto le terapie intensive e semintensive adottano protocolli su intubazione, bundle VAP, sedazione e svezzamento."),
 (13,"chiaro",0,"E l'infermiere di area critica ha percorsi di formazione avanzata: e' uno degli ambiti in cui l'evoluzione delle competenze del modulo uno si vede di piu'."),

 (14,"chiaro",0,"La tabella. Guedel dall'angolo della bocca all'angolo della mandibola, solo senza riflesso. Nasofaringea, no nella frattura della base cranica. Pallone a due mani."),
 (14,"chiaro",0,"Intubazione: preparare, provare la luce, aspiratore, capnografo. Verifica con la capnografia. Cuffia venti, trenta. Annotare i centimetri. Alta pressione, ostacolo; bassa pressione, perdita. DOPE."),

 (15,"profondo",1.2,"[serious] Nel dubbio, staccare e ventilare a mano."),
 (15,"chiaro",0,"Il pallone non si guasta, e non ha allarmi da interpretare: in pochi secondi dice se il problema e' nella macchina o nel paziente."),

 (16,"chiaro",0,"[warm] Nella prossima lezione passiamo alla C: lo shock nei suoi quattro tipi, e la sepsi, che abbiamo gia' incontrato nel caso della lezione dieci punto due."),
 (16,"chiaro",0,"Una delle emergenze piu' frequenti in ospedale, e una di quelle in cui il riconoscimento infermieristico fa piu' differenza. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Manovre e presidi semplici",3:"Il pallone",4:"I sopraglottici",5:"L'intubazione: la preparazione",6:"La verifica e il fissaggio",
 7:"La ventilazione meccanica",8:"Gli allarmi",9:"DOPE",10:"La sicurezza",11:"La persona dietro il ventilatore",12:"Il caso",13:"In Veneto",14:"La tabella",15:"La frase della lezione",16:"Chiusura"}

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
