# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Il bando che stai preparando porta un'intestazione: Azienda Zero. Ma che cos'e', esattamente? Non e' un ospedale, e non ha pazienti."),
 (1,"chiaro",0,"E' l'ente che governa e centralizza alcune funzioni dell'intero sistema sanitario veneto. Conoscerlo e' una domanda d'orale probabile, e ti aiuta a capire come funziona il concorso stesso."),

 (2,"chiaro",0,"Il nome completo e' lungo: Azienda per il governo della sanita' della Regione del Veneto. Azienda Zero e' il nome breve, quello che trovi in testa al bando e che sentirai usare dalla commissione."),
 (2,"chiaro",0,"E' stata istituita dalla legge regionale diciannove del venticinque ottobre duemilasedici. La stessa legge che, come hai visto nella lezione tredici punto uno, ha ridotto le ULSS da ventuno a nove."),
 (2,"chiaro",0,"E' un ente del Servizio Sanitario Regionale, con personalita' giuridica di diritto pubblico. E con autonomia amministrativa, patrimoniale, organizzativa, tecnica e contabile."),
 (2,"chiaro",0,"Nell'esercizio delle sue funzioni e' soggetta al coordinamento dell'Area Sanita' e Sociale della Regione. Ed e' operativa dal duemiladiciassette, lo stesso anno in cui nascono le nove nuove ULSS."),

 (3,"chiaro",0,"[curious] Perche' proprio Zero? Perche' non eroga prestazioni ai pazienti. Si affianca alle aziende numerate del sistema come un livello di base, un livello che lavora per tutte."),
 (3,"chiaro",0,"Accentra funzioni tecniche e amministrative che, se ogni azienda le svolgesse per conto suo, sarebbero ripetute tante volte quante sono le aziende, e sarebbero meno efficienti."),
 (3,"chiaro",0,"Gli obiettivi sono quattro. L'uniformita' nel territorio regionale. Le economie di scala. Le competenze specializzate, concentrate in un solo ente. E la semplificazione."),
 (3,"chiaro",0,"Il risultato: le aziende sanitarie possono concentrarsi sull'assistenza. E attenzione alla confusione piu' comune all'esame: Azienda Zero non eroga prestazioni ai pazienti, non cura nessuno."),

 (4,"chiaro",0,"La prima funzione e' la Gestione Sanitaria Accentrata, la GSA. E' la gestione della parte del Fondo Sanitario Regionale che non viene assegnata direttamente alle aziende."),
 (4,"chiaro",0,"La prevede la normativa nazionale sui bilanci sanitari, il decreto legislativo centodiciotto del duemilaundici. In Veneto, le funzioni e le responsabilita' della GSA sono state attribuite ad Azienda Zero."),
 (4,"chiaro",0,"E accanto alla GSA, Azienda Zero supporta la Regione nella programmazione economico-finanziaria e nel controllo. Una parte importante dei conti della sanita' veneta, quindi, passa da qui."),

 (5,"chiaro",0,"La seconda funzione: gli acquisti centralizzati. Ad Azienda Zero e' stata trasferita la CRAV, la Centrale Regionale Acquisti per la Regione del Veneto."),
 (5,"chiaro",0,"La CRAV opera come soggetto aggregatore, secondo la normativa nazionale sulla centralizzazione degli acquisti pubblici. E bandisce gare regionali: farmaci, dispositivi medici, tecnologie, servizi."),
 (5,"chiaro",0,"Perfino le ambulanze del centodiciotto. Gli effetti sono due: prezzi piu' bassi, perche' si compra per tutta la regione insieme, e la standardizzazione dei prodotti."),
 (5,"chiaro",0,"Per l'infermiere significa che il catetere, la medicazione o la pompa che usi in reparto spesso e' stata scelta con una gara regionale. E che segnalare i problemi di un dispositivo serve a tutta la regione."),

 (6,"chiaro",0,"La terza funzione e' quella che ti riguarda direttamente: il reclutamento del personale. Azienda Zero gestisce le procedure concorsuali e di selezione per conto delle aziende del servizio sanitario regionale."),
 (6,"chiaro",0,"Lo fa con i concorsi unificati, cioe' aggregati, per i profili molto richiesti: gli infermieri, gli operatori socio-sanitari, e anche altri profili."),
 (6,"chiaro",0,"Un unico bando e un'unica procedura, invece di tanti concorsi aziendali, con graduatorie che le aziende utilizzano secondo le regole del bando. Uniformita' e tempi piu' rapidi. E' il caso di questo concorso."),

 (7,"chiaro",0,"[thoughtful] Che cosa significa per te, in pratica? Primo: leggi con attenzione il bando. I requisiti, le prove, i punteggi, le soglie. E' li' che trovi le regole della tua procedura."),
 (7,"chiaro",0,"Secondo: verifica le modalita' di scelta dell'azienda o dell'ambito di assegnazione, e come viene usata la graduatoria. Su questi punti, il riferimento e' sempre il bando vigente."),
 (7,"chiaro",0,"Terzo: segui le comunicazioni ufficiali sul sito di Azienda Zero. Sono l'unico canale valido per date e convocazioni, e una convocazione persa non si recupera chiedendo a un collega."),
 (7,"chiaro",0,"E ricorda un dettaglio che all'orale fa la differenza: Azienda Zero gestisce la selezione, ma il tuo datore di lavoro sara' l'azienda in cui verrai assunto."),

 (8,"chiaro",0,"Poi ci sono le altre funzioni, attribuite nel tempo. I sistemi informativi e la sanita' digitale, compreso il Fascicolo Sanitario Elettronico regionale."),
 (8,"chiaro",0,"Il portale e le app con cui il cittadino veneto accede ai servizi digitali, Sanita' km zero, sono della Regione e gestiti con Azienda Zero. Li vedrai nella lezione tredici punto sette."),
 (8,"chiaro",0,"La formazione. Gli affari legali e il contenzioso, con il patrocinio e la difesa delle aziende. E il supporto alla gestione del rischio e dei sinistri."),
 (8,"chiaro",0,"Le funzioni epidemiologiche e i registri: il sistema epidemiologico regionale, il Registro Tumori del Veneto, i registri di patologia. Ne riparliamo nella lezione tredici punto sei."),
 (8,"chiaro",0,"Il supporto al coordinamento di attivita' regionali, come l'emergenza-urgenza. La logistica e gli investimenti. E un punto di metodo: le funzioni sono definite e aggiornate dalla Giunta regionale."),

 (9,"chiaro",0,"L'organizzazione. Azienda Zero ha un direttore generale nominato dalla Giunta regionale, come i direttori generali delle altre aziende. Lo affiancano un direttore amministrativo e un direttore sanitario."),
 (9,"chiaro",0,"La sua organizzazione interna, con le unita' operative complesse e gli uffici, e' definita dall'atto aziendale, come per tutte le altre aziende. L'atto aziendale l'hai visto nella lezione dodici punto tre."),
 (9,"chiaro",0,"E ogni anno la Giunta regionale approva gli indirizzi per la sua attivita', collegati alla programmazione socio-sanitaria. La Regione indirizza; Azienda Zero da' supporto tecnico e gestisce."),

 (10,"chiaro",0,"Un modello osservato. Il Veneto ha scelto un ente di governance centralizzato, e altre Regioni ne hanno istituiti con funzioni simili. Il Piemonte, per esempio, ha creato una propria Azienda Zero."),
 (10,"chiaro",0,"All'orale puoi mostrare spirito critico. La centralizzazione porta dei vantaggi: l'uniformita' e le economie. Ma pone anche delle sfide: la distanza dai territori, e i tempi decisionali."),
 (10,"chiaro",0,"Saper dire tutte e due le cose ti distingue da chi ha solo imparato un elenco. Davanti a una commissione, un giudizio equilibrato vale piu' di un elogio."),

 (11,"chiaro",0,"Il caso d'esame. La domanda tipo: che cos'e' Azienda Zero, e quali funzioni svolge? Una risposta ordinata parte dalla natura dell'ente, e poi passa alle sue funzioni."),
 (11,"chiaro",0,"E' l'ente di governance della sanita' veneta, istituito dalla legge regionale diciannove del duemilasedici, con personalita' giuridica di diritto pubblico. Non eroga prestazioni ai pazienti."),
 (11,"chiaro",0,"Svolge funzioni centralizzate per tutte le aziende: la gestione sanitaria accentrata, gli acquisti con la CRAV, il reclutamento del personale con i concorsi unificati."),
 (11,"chiaro",0,"E poi i sistemi informativi e il Fascicolo Sanitario Elettronico, gli affari legali, la formazione, le funzioni epidemiologiche. In chiusura, un aggancio personale: e' l'ente che gestisce questo concorso."),

 (12,"chiaro",0,"Il legame con il lavoro quotidiano. I dispositivi e i farmaci arrivano da gare regionali: segnalarne i difetti con la dispositivo-vigilanza migliora le gare successive."),
 (12,"chiaro",0,"Il Fascicolo Sanitario Elettronico garantisce la continuita' delle informazioni sulla persona che assisti. E c'e' la formazione regionale, che passa anch'essa da Azienda Zero."),
 (12,"chiaro",0,"E i dati epidemiologici, raccolti nei registri, orientano la programmazione. Senza dati, la programmazione va alla cieca."),

 (13,"chiaro",0,"La tabella. Azienda per il governo della sanita' della Regione del Veneto. Legge regionale diciannove del duemilasedici, operativa dal duemiladiciassette."),
 (13,"chiaro",0,"Ente del Servizio Sanitario Regionale, con personalita' giuridica di diritto pubblico, coordinato dall'Area Sanita' e Sociale. Direttore generale nominato dalla Giunta, con indirizzi annuali."),
 (13,"chiaro",0,"Le funzioni: GSA, CRAV come soggetto aggregatore, concorsi unificati, sistemi informativi e FSE, formazione, affari legali, rischio e sinistri, epidemiologia e registri."),

 (14,"profondo",1.2,"[serious] La frase della lezione. Azienda Zero non cura i pazienti, ma rende possibile che le altre aziende li curino meglio."),

 (15,"chiaro",0,"[warm] Nella prossima lezione: la rete ospedaliera veneta, e il modello hub and spoke, che hai gia' incontrato nella lezione dodici punto tre."),
 (15,"chiaro",0,"Poi il SUEM centodiciotto, e le reti per l'ictus, l'infarto, il trauma e le altre patologie tempo-dipendenti. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Che cos'e'",3:"Perche' Zero",4:"La Gestione Sanitaria Accentrata",5:"Gli acquisti centralizzati",6:"Il reclutamento del personale",
 7:"Che cosa significa per il candidato",8:"Le altre funzioni",9:"La direzione e l'atto aziendale",10:"Un modello osservato",
 11:"Il caso d'esame",12:"Il legame con il lavoro infermieristico",13:"La tabella",14:"La frase della lezione",15:"Chiusura"}

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
