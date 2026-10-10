# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La semeiotica e' l'arte di raccogliere segni e sintomi. Per l'infermiere significa saper osservare, toccare, ascoltare, e leggere un esame di laboratorio per capire quando un valore richiede un'azione."),
 (1,"chiaro",0,"Chiudiamo con la diagnostica per immagini, dove l'infermiere prepara il paziente e garantisce la sicurezza, in particolare con i mezzi di contrasto e in risonanza magnetica."),

 (2,"chiaro",0,"La prima distinzione. Il sintomo e' soggettivo: cio' che la persona riferisce, come il dolore, la nausea, la sensazione di mancanza d'aria. Il segno e' oggettivo: cio' che l'operatore rileva."),
 (2,"chiaro",0,"Segni sono la febbre, l'edema, l'ittero, la tachicardia. Si documentano entrambi, e le parole della persona hanno valore clinico: non riesco a respirare va scritto, anche se la saturazione e' buona."),

 (3,"chiaro",0,"Le quattro tecniche dell'esame obiettivo. L'ispezione: guardare. La palpazione: toccare, per valutare la temperatura, la consistenza, il dolore, i polsi."),
 (3,"chiaro",0,"La percussione: battere e ascoltare il suono, timpanico dove c'e' aria, ottuso dove c'e' liquido o tessuto solido. E l'auscultazione: ascoltare con il fonendoscopio."),
 (3,"chiaro",0,"Di solito si seguono in quest'ordine, con un'eccezione chiesta spesso: nell'addome si ausculta prima di percuotere e palpare, perche' la manipolazione altera la peristalsi."),

 (4,"chiaro",0,"L'auscultazione del torace. Il murmure vescicolare e' il rumore normale. I crepitii, o rantoli fini, indicano liquido negli alveoli: edema polmonare, polmonite."),
 (4,"chiaro",0,"I sibili: vie aeree ristrette, come nel broncospasmo. I ronchi: secrezioni nei bronchi. Lo sfregamento pleurico: la pleura infiammata. E un murmure ridotto o assente fa pensare a versamento, pneumotorace, atelettasia."),

 (5,"chiaro",0,"L'esame dell'addome. All'ispezione: la distensione, le cicatrici, le stomie. All'auscultazione, i rumori intestinali: assenti nell'ileo, metallici nell'occlusione."),
 (5,"chiaro",0,"Alla percussione: timpanismo per i gas, ottusita' per i liquidi o per un globo vescicale. Alla palpazione: il dolore e la difesa."),
 (5,"chiaro",0,"E tre segni da conoscere. Il segno di Blumberg: dolore al rilascio improvviso della pressione, che indica un'irritazione peritoneale."),
 (5,"chiaro",0,"Il segno di Murphy: dolore in inspirazione profonda palpando sotto l'arcata costale destra, nella colecistite. Il segno di Giordano: dolore alla percussione lombare, nella colica renale o nella pielonefrite."),

 (6,"chiaro",0,"Altri segni utili. L'edema con fovea: premendo con un dito resta un'impronta. Il turgore cutaneo ridotto nella disidratazione, poco affidabile nell'anziano, la cui cute e' meno elastica: meglio guardare le mucose."),
 (6,"chiaro",0,"Il riempimento capillare. La cute: il colorito, cioe' pallore, cianosi, ittero, poi la temperatura e l'integrita'. Le giugulari turgide nello scompenso destro. E lo stato di coscienza."),

 (7,"chiaro",0,"Gli esami di laboratorio, con una premessa: i valori sono indicativi e cambiano fra laboratori. Fa sempre fede l'intervallo riportato sul referto."),
 (7,"chiaro",0,"L'emocromo. L'emoglobina: circa fra tredici e diciassette grammi per decilitro nell'uomo, fra dodici e sedici nella donna. I globuli bianchi: circa fra quattromila e diecimila."),
 (7,"chiaro",0,"I neutrofili: sotto millecinquecento si parla di neutropenia, sotto cinquecento di neutropenia grave, come nella lezione otto punto sette. Le piastrine: circa fra centocinquantamila e quattrocentocinquantamila."),

 (8,"chiaro",0,"Elettroliti, glicemia e rene. Il sodio: fra centotrentacinque e centoquarantacinque. Il potassio: fra tre virgola cinque e cinque virgola zero, con le soglie di pericolo della lezione tre punto cinque."),
 (8,"chiaro",0,"Il calcio totale: circa fra otto virgola cinque e dieci virgola cinque, da correggere per l'albumina. La glicemia a digiuno: fra settanta e novantanove milligrammi per decilitro."),
 (8,"chiaro",0,"La creatinina: circa fra zero virgola sei e uno virgola due, sapendo che dipende dalla massa muscolare, e quindi va affiancata dal GFR stimato. E poi l'azotemia."),

 (9,"chiaro",0,"Coagulazione, fegato, infiammazione ed emogas. L'INR: circa fra zero virgola otto e uno virgola due, e in terapia con warfarin, di norma, fra due e tre. L'aPTT: circa fra venticinque e trentacinque secondi."),
 (9,"chiaro",0,"L'albumina: circa fra tre virgola cinque e cinque. La bilirubina totale: sotto circa uno virgola due. E la PCR, la proteina C reattiva, che aumenta nell'infiammazione."),
 (9,"chiaro",0,"I lattati: sotto due millimoli per litro. E la troponina, con soglie che dipendono dal metodo del laboratorio."),
 (9,"chiaro",0,"E l'emogas: il pH fra sette virgola trentacinque e sette virgola quarantacinque, la PaCO2 fra trentacinque e quarantacinque, la PaO2 circa fra ottanta e cento, il bicarbonato fra ventidue e ventisei."),

 (10,"chiaro",0,"[thoughtful] Il valore critico, o di panico: un risultato che indica un pericolo immediato per il paziente. Per esempio un potassio molto alto, una glicemia molto bassa, un'emoglobina crollata."),
 (10,"chiaro",0,"Il laboratorio lo comunica con una procedura dedicata, spesso per telefono. L'infermiere che lo riceve lo registra, e lo ripete per conferma: e' il read-back della lezione due punto sette."),
 (10,"chiaro",0,"Poi avvisa subito il medico, valuta il paziente e documenta. E prima di tutto si chiede se il campione puo' essere alterato, come nel caso dell'emolisi."),

 (11,"chiaro",0,"L'esame delle urine: l'aspetto e il colore; il peso specifico, che indica quanto sono concentrate; il pH; le proteine, il glucosio, i chetoni, ricordi la chetoacidosi, e il sangue."),
 (11,"chiaro",0,"Nitriti e leucociti suggeriscono un'infezione. L'urinocoltura nel cateterizzato si preleva dal raccordo, mai dalla sacca. E la batteriuria asintomatica, di norma, non si tratta."),

 (12,"chiaro",0,"La diagnostica per immagini. Radiografia e TC usano radiazioni ionizzanti: a una donna in eta' fertile si chiede sempre di una possibile gravidanza, e si applicano le regole di radioprotezione."),
 (12,"chiaro",0,"La TC usa spesso un mezzo di contrasto iodato. La risonanza magnetica non usa radiazioni, ma un campo magnetico intensissimo, sempre attivo, e un contrasto a base di gadolinio."),
 (12,"chiaro",0,"L'ecografia usa gli ultrasuoni, senza radiazioni. E la medicina nucleare usa i radiofarmaci, per la scintigrafia e per la PET."),

 (13,"chiaro",0,"Il mezzo di contrasto iodato richiede una preparazione precisa. Prima: il consenso, e l'anamnesi di reazioni precedenti al contrasto e di allergie, con eventuali premedicazioni secondo protocollo."),
 (13,"chiaro",0,"La funzione renale, con il GFR stimato, per il rischio di danno renale. L'idratazione. La gestione della metformina secondo protocollo. E un accesso venoso adeguato all'iniettore."),
 (13,"chiaro",0,"Durante e dopo, le reazioni vanno da quelle lievi, come calore, nausea, orticaria, fino all'anafilassi, che si tratta con l'adrenalina. Poi lo stravaso nella sede di iniezione, e la sorveglianza dopo l'esame."),

 (14,"chiaro",0,"La sicurezza in risonanza magnetica. Il magnete e' sempre attivo, anche quando non si fanno esami. Ogni paziente compila un questionario di sicurezza."),
 (14,"chiaro",0,"Si verificano le condizioni a rischio: pacemaker e defibrillatori non compatibili, clip vascolari cerebrali, impianti cocleari, neurostimolatori, schegge metalliche, soprattutto negli occhi."),
 (14,"chiaro",0,"In sala non entra nessun oggetto ferromagnetico: una bombola di ossigeno, una barella, una sedia a rotelle, una pompa non compatibile. Il campo magnetico lo trasforma in un proiettile."),
 (14,"chiaro",0,"Si usano solo dispositivi certificati come compatibili. Poi la claustrofobia, il rumore, i cerotti transdermici con parti metalliche. E in gravidanza serve una valutazione."),
 (14,"profondo",1.2,"[serious] La risonanza e' uno dei luoghi in cui un attimo di distrazione puo' uccidere. Il magnete e' sempre attivo."),

 (15,"chiaro",0,"La preparazione agli altri esami. Per l'ecografia dell'addome superiore, il digiuno, che mantiene la colecisti distesa e riduce i gas. Per l'ecografia pelvica, la vescica piena, che fa da finestra acustica."),
 (15,"chiaro",0,"Per la medicina nucleare dipende dal radiofarmaco: spesso l'idratazione, e per un periodo si limitano i contatti ravvicinati con bambini e donne in gravidanza. Le endoscopie le hai viste nella lezione otto punto cinque."),

 (16,"chiaro",0,"[curious] Il caso. Paziente diabetico in metformina, con GFR stimato ridotto, deve fare una TC con contrasto. Riferisce di aver avuto un'orticaria dopo un esame, anni fa. Che cosa fai?"),
 (16,"chiaro",0,"Tre segnalazioni al medico e al radiologo, prima dell'esame. La reazione precedente, che puo' richiedere una premedicazione o un esame alternativo. La funzione renale ridotta, che richiede valutazione e idratazione."),
 (16,"chiaro",0,"E la metformina, da gestire secondo protocollo. Poi prepari un accesso adeguato e il materiale per l'emergenza."),

 (17,"chiaro",0,"La tabella. Sintomo e segno. Le quattro tecniche, con l'addome che si ausculta prima. Crepitii, sibili, ronchi. Blumberg, Murphy, Giordano. I valori di laboratorio. Il valore critico. Il contrasto iodato. La risonanza."),

 (18,"chiaro",0,"[warm] Nella prossima lezione ricomponiamo il modulo quattordici con le tabelle dei valori normali e i collegamenti fra fisiologia e assistenza. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Segni e sintomi",3:"Le quattro tecniche dell'esame obiettivo",4:"L'auscultazione del torace",5:"L'esame dell'addome",
 6:"Altri segni utili",7:"L'emocromo",8:"Elettroliti, glicemia, funzione renale",9:"Coagulazione, fegato, infiammazione, emogas",10:"Il valore critico",
 11:"L'esame delle urine",12:"La diagnostica per immagini",13:"Il mezzo di contrasto iodato",14:"La sicurezza in risonanza magnetica",
 15:"La preparazione agli altri esami",16:"Il caso d'esame",17:"La tabella",18:"Chiusura"}

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
