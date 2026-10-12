# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo caso ha due tempi. Il primo e' un'emergenza notturna: l'edema polmonare acuto. Il secondo e' meno drammatico, ma decide il futuro del paziente: la dimissione, cioe' come evitare che torni dopo un mese."),
 (1,"chiaro",0,"All'esame possono chiederti l'una o l'altra parte. E la seconda e' spesso quella in cui i candidati sono piu' deboli."),

 (2,"chiaro",0,"Lo scenario. Il signor Marco, ottant'anni, ha uno scompenso cardiaco noto, ed e' al terzo ricovero nell'anno. Vive con la moglie, di settantotto anni."),
 (2,"chiaro",0,"Alle due di notte, una dispnea improvvisa e intensa. E' seduto sul bordo del letto, agitato e sudato, e tossisce un espettorato schiumoso rosato."),
 (2,"chiaro",0,"[curious] Frequenza respiratoria trentadue, saturazione ottantacinque in aria, pressione centottanta su cento, frequenza centoventi, rantoli bilaterali fino ai campi medi. Che cosa sta succedendo, e che cosa fai?"),

 (3,"chiaro",0,"Il ragionamento. Dispnea improvvisa, ortopnea, espettorato schiumoso rosato, rantoli bilaterali, desaturazione: e' un edema polmonare acuto, l'emergenza dello scompenso sinistro della lezione otto punto uno."),
 (3,"chiaro",0,"La pressione alta suggerisce una forma ipertensiva. Si cercano subito le cause scatenanti: ischemia, aritmia come una fibrillazione atriale rapida, crisi ipertensiva, troppi liquidi o sale, terapia non assunta, infezione."),

 (4,"chiaro",0,"Le prime azioni. Chiami il medico con lo SBAR. Posizione seduta, con le gambe declivi, giu' dal letto: riduce il ritorno venoso al cuore e il carico sui polmoni."),
 (4,"chiaro",0,"Ossigeno secondo protocollo, con target fra novantaquattro e novantotto: non ha una BPCO nota. E la CPAP secondo prescrizione, la pressione positiva continua, molto efficace nell'edema polmonare acuto."),
 (4,"chiaro",0,"Monitoraggio, accesso venoso, ECG a dodici derivazioni, per cercare ischemia o aritmia. Prelievi: troponina, BNP, elettroliti, funzione renale, emogas."),
 (4,"chiaro",0,"Catetere vescicale se indicato e prescritto, per la diuresi oraria. E non lo lasci solo: la sensazione di soffocamento genera un'angoscia enorme."),

 (5,"chiaro",0,"La terapia, su prescrizione, e la sua sorveglianza. Il diuretico dell'ansa endovena, come la furosemide: si sorvegliano la diuresi, attesa in tempi brevi, la pressione e il potassio, che scende."),
 (5,"chiaro",0,"I nitrati endovena, indicati proprio perche' la pressione e' alta: si sorveglia la pressione, che puo' calare troppo, e la cefalea."),
 (5,"chiaro",0,"[thoughtful] Nota il confronto con il caso precedente: li' i nitrati erano una trappola, qui sono indicati. Non esiste il farmaco giusto in assoluto: esiste il farmaco giusto per quella pressione e quel quadro."),

 (6,"chiaro",0,"La valutazione dopo un'ora. Diuresi settecento millilitri, frequenza respiratoria ventidue, saturazione novantacinque con la CPAP, pressione centoquarantacinque su ottantacinque, frequenza novantotto."),
 (6,"chiaro",0,"E' meno agitato e parla in frasi complete: un ottimo segno clinico. L'ECG non mostra ischemia acuta. Si programma il potassio di controllo, dato il diuretico. Obiettivi raggiunti: si prosegue, e si rivaluta."),

 (7,"chiaro",0,"Al mattino, a crisi superata, una conversazione con calma rivela la causa vera. Si pesava, a casa? Ogni tanto. All'ingresso pesava tre chili in piu' in quattro giorni rispetto al peso abituale."),
 (7,"chiaro",0,"Un accumulo di liquidi che nessuno ha intercettato. Il diuretico della sera lo saltavo, perche' mi faceva alzare di notte. Mia moglie cucina come sempre, con il dado."),
 (7,"chiaro",0,"Tre problemi di self-care: il monitoraggio, l'aderenza, la dieta. Sono la ragione dei tre ricoveri nell'anno."),

 (8,"chiaro",0,"Il piano educativo, costruito sui suoi problemi, non su un opuscolo generico. Peso ogni giorno, al mattino, dopo la minzione, con la stessa bilancia, annotato in un diario."),
 (8,"chiaro",0,"E segnalare un aumento rapido: indicativamente, un chilo e mezzo o due in due o tre giorni. Il diuretico, invece di saltarlo, con un orario concordato con il medico che non disturbi la notte."),
 (8,"chiaro",0,"Per esempio, al mattino e nel primo pomeriggio. Il sale: ridurlo, con attenzione a dado, insaccati, formaggi stagionati, cibi pronti. I liquidi secondo indicazione."),
 (8,"chiaro",0,"I segni d'allarme: dispnea, gonfiore, il bisogno di piu' cuscini per dormire. E coinvolgere la moglie, che cucina e che puo' aiutarlo nel monitoraggio."),

 (9,"chiaro",0,"E come si educa, con gli strumenti della lezione undici punto sei. Il colloquio motivazionale: partire dalle sue ragioni. Che cosa vorrebbe poter fare, se stesse meglio? Magari tornare a fare l'orto."),
 (9,"chiaro",0,"Poche informazioni alla volta, materiale scritto semplice. Il teach-back: mi mostri come segna il peso; che cosa fa se il peso sale di due chili? E si comincia nei primi giorni, non il giorno della dimissione."),

 (10,"chiaro",0,"La continuita' con il territorio. Al terzo ricovero nell'anno serve una presa in carico proattiva. La lettera infermieristica riporta il peso secco, il peso a cui il paziente sta bene, il piano educativo e i problemi aperti."),
 (10,"chiaro",0,"Si segnala il caso al medico di famiglia o alla Medicina di Gruppo Integrata, e all'infermiere di famiglia e comunita'. Si attiva l'ambulatorio dello scompenso."),
 (10,"chiaro",0,"Il telemonitoraggio del peso e dei parametri, se disponibile, nel percorso del PDTA. E si valutano i bisogni di una coppia anziana: anche la moglie potrebbe aver bisogno di supporto."),

 (11,"chiaro",0,"Rileggiamo il caso con il self-care di Riegel. Il mantenimento, cioe' terapia, sale, attivita' fisica: il signor Marco lo faceva solo in parte. Il monitoraggio, il peso e i sintomi: quasi per niente."),
 (11,"chiaro",0,"La gestione, cioe' sapere che cosa fare quando il peso sale: per niente. Il piano educativo deve coprire tutte e tre le dimensioni, soprattutto la terza, quella che previene il ricovero."),

 (12,"tenue",0,"Gli errori. Lasciare sdraiato un paziente in edema polmonare. Non rivalutare l'ossigenazione. Dare il diuretico senza controllare diuresi e potassio. I nitrati senza controllare la pressione."),
 (12,"tenue",0,"Dimettere con un opuscolo e un generico si pesi ogni tanto. E soprattutto non chiedere perche' il paziente non segue la terapia: la risposta, mi faceva alzare la notte, conteneva la soluzione."),

 (13,"chiaro",0,"Un approfondimento farmacologico tipico dello scompenso. I diuretici dell'ansa fanno perdere potassio: l'ipokaliemia da' crampi, astenia e aritmie, e richiede controlli periodici e integrazione secondo prescrizione."),
 (13,"chiaro",0,"Molti di questi pazienti assumono anche la digossina. Prima di somministrarla si rileva la frequenza, all'apice, per un minuto intero. Se e' bassa, non si somministra e si segnala."),
 (13,"chiaro",0,"I segni di tossicita' da digossina: nausea, vomito, bradicardia, aritmie, e disturbi visivi, con un'alterata percezione dei colori."),
 (13,"chiaro",0,"[serious] E il collegamento che i quiz amano: l'ipokaliemia aumenta la tossicita' della digossina. Diuretico e digossina insieme richiedono un'attenzione doppia al potassio."),

 (14,"chiaro",0,"Le domande d'orale. Prima: i segni dello scompenso sinistro e destro? Il sinistro da' congestione polmonare: dispnea, ortopnea, dispnea parossistica notturna, rantoli."),
 (14,"chiaro",0,"Il destro da' congestione sistemica: edemi declivi, turgore giugulare, epatomegalia, ascite. Due quadri da non confondere: il sinistro si vede nel polmone, il destro in periferia."),
 (14,"chiaro",0,"Seconda: come insegna il monitoraggio del peso? Ogni mattina, dopo la minzione, stessa bilancia e abiti simili, il valore in un diario, il medico se aumenta in fretta. Poi gli fa ripetere che cosa farebbe."),
 (14,"chiaro",0,"Terza: che cos'e' il teach-back? La persona spiega o mostra con parole proprie cio' che ha imparato, per verificare la comprensione e correggere i fraintendimenti. Essere chiari resta compito del professionista."),

 (15,"chiaro",0,"La risposta modello. Scompenso, dispnea improvvisa, ortopnea, espettorato schiumoso rosato, rantoli, saturazione ottantacinque, pressione centottanta su cento: edema polmonare acuto. Ossigenazione, carico polmonare, causa."),
 (15,"chiaro",0,"Attivo il medico; seduto, gambe declivi; ossigeno con target novantaquattro-novantotto e CPAP; monitoraggio, accesso, ECG e prelievi. Diuretico e nitrati prescritti, sorvegliando diuresi, pressione e potassio."),
 (15,"chiaro",0,"Rassicuro e non lo lascio solo. Rivaluto dopo un'ora. Indago le cause e imposto un piano educativo su peso, aderenza, dieta e allarmi, con teach-back e la moglie. Garantisco la continuita' con il territorio."),

 (16,"chiaro",0,"I collegamenti. Il peso e il bilancio con la tre punto cinque. Lo scompenso e i nitrati con la otto punto uno. La CPAP con la otto punto due. Diuretici e potassio con la cinque punto cinque."),
 (16,"chiaro",0,"Self-care e colloquio motivazionale con la undici punto sei. Il territorio veneto con la tredici punto quattro. La fisiologia del precarico con la quattordici punto due."),

 (17,"chiaro",0,"Una domanda d'orale che questo caso prepara: come previene la riammissione di un paziente con scompenso? In tre parti: perche' e' stato ricoverato, che cosa sa fare a casa, chi lo seguira'. Cause, competenze, continuita'."),

 (18,"profondo",1.2,"La frase del caso: la crisi si cura in un'ora, la ricaduta si previene in una settimana. L'edema polmonare e' l'emergenza, ma a cambiare la vita del signor Marco sono l'educazione e la continuita'."),

 (19,"chiaro",0,"[warm] Nella prossima lezione: un'anziana fragile che, di notte, diventa confusa e cade dal letto. Dalla caduta alla dimissione protetta, attraverso tutta la rete veneta per la non autosufficienza. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"Le prime azioni",5:"La terapia e la sua sorveglianza",
 6:"La valutazione",7:"La causa: la conversazione del mattino",8:"Il piano educativo",9:"Come si educa",
 10:"La continuita' con il territorio",11:"Il self-care in tre dimensioni",12:"Gli errori da evitare",
 13:"Il potassio, i diuretici e la digossina",14:"Le domande d'orale",15:"La risposta in 15 righe",16:"I collegamenti",
 17:"All'orale",18:"La frase del caso",19:"Chiusura"}

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
