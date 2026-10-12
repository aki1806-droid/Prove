# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo e' forse il caso piu' veneto del modulo, perche' attraversa tutta la rete della non autosufficienza. Comincia con una notte difficile: un delirium e una caduta."),
 (1,"chiaro",0,"E finisce con una domanda che ogni infermiere di reparto si sente fare: e adesso, dove va la mamma? Ci servono le lezioni tre punto uno, nove punto sei, undici punto uno, undici punto due e tredici punto cinque."),

 (2,"chiaro",0,"Lo scenario. La signora Elena ha ottantasei anni e una demenza lieve, e vive sola; la figlia abita vicino e lavora. E' ricoverata da due giorni in medicina per una pielonefrite."),
 (2,"chiaro",0,"In terapia ha un antibiotico endovena, un anticoagulante orale diretto per una fibrillazione atriale, e il lorazepam al bisogno per l'insonnia, che le viene dato alle ventidue."),
 (2,"chiaro",0,"Alle ventitre' e' agitata, vuole tornare a casa, si strappa la cannula. Alle tre viene trovata a terra accanto al letto, e le sponde erano alzate. Fermati un momento: che cosa fai, prima di tutto?"),

 (3,"chiaro",0,"Dopo una caduta la prima regola e' non sollevare subito la persona. Chiami aiuto e non la lasci sola. Valuti l'ABC, la coscienza con la GCS e le pupille, e cerchi i segni di un trauma cranico: ferite, ematomi."),
 (3,"chiaro",0,"Poi il dolore e le deformita'. L'arto inferiore destro e' accorciato ed extraruotato, con dolore all'inguine: e' il quadro tipico di una frattura del femore. Parametri, glicemia, e avvisi il medico."),

 (4,"chiaro",0,"[serious] E ora il dettaglio che cambia la priorita': la signora assume un anticoagulante. E non ricorda se ha battuto la testa."),
 (4,"chiaro",0,"Dopo una caduta, anche con un trauma cranico lieve o non riferito, c'e' il rischio di un'emorragia intracranica, che puo' manifestarsi anche ore dopo."),
 (4,"chiaro",0,"Si segue il protocollo, che di solito prevede la valutazione medica e una TC, e una sorveglianza neurologica ravvicinata: GCS, pupille, segni di lato, cefalea, vomito. E' cio' che il commissario vuole vedere scritto."),

 (5,"chiaro",0,"Poi si immobilizza l'arto, e la si solleva con piu' operatori e con gli ausili, come un telo ad alto scorrimento o un sollevatore. Analgesia secondo prescrizione, e un nuovo accesso venoso."),
 (5,"chiaro",0,"Si segnala l'evento con l'incident reporting, perche' e' una caduta con danno. Si documentano ora, circostanze, valutazione e interventi, e si informa la figlia."),
 (5,"chiaro",0,"Il riferimento e' la Raccomandazione numero tredici, sulla prevenzione e la gestione della caduta in ospedale."),

 (6,"chiaro",0,"[thoughtful] Perche' e' caduta? Il quadro della sera era un delirium iperattivo su una demenza, verificabile con la CAM: esordio acuto, andamento fluttuante, disattenzione."),
 (6,"chiaro",0,"I fattori: infezione, ambiente nuovo, notte, forse dolore o urgenza di urinare. E la benzodiazepina, che nell'anziano aumenta delirium e cadute: e' fra i farmaci potenzialmente inappropriati della lezione undici punto uno."),
 (6,"chiaro",0,"E le sponde alzate. In una persona agitata che vuole alzarsi non impediscono la caduta: la fanno avvenire scavalcandole, cioe' da piu' in alto e con piu' danno."),

 (7,"chiaro",0,"Al mattino la figlia, spaventata, chiede di legarla di notte. E' una richiesta comprensibile, ma la contenzione non previene le cadute: aumenta agitazione, lesioni e delirium, come nella lezione tre punto uno."),
 (7,"chiaro",0,"Lo spieghi con empatia, e proponi le alternative: letto basso, materassino a terra, sensori, sorveglianza, accompagnamento al bagno programmato, luce notturna, oggetti personali."),
 (7,"chiaro",0,"E la presenza di un familiare, quando e' possibile. Poi la revisione della terapia sedativa con il medico. Cosi' la figlia diventa un'alleata, non una spettatrice."),

 (8,"chiaro",0,"La radiografia conferma una frattura del collo del femore. Si attiva il percorso ortopedico, con l'obiettivo dell'intervento entro quarantotto ore, l'indicatore di qualita' della lezione nove punto sei."),
 (8,"chiaro",0,"L'anticoagulante si gestisce secondo indicazione. E intanto si previene il delirium: occhiali e apparecchi acustici, orientamento, dolore, idratazione, alvo, sonno. Talloni protetti, nutrizione: l'approccio ortogeriatrico."),

 (9,"chiaro",0,"Quinta giornata dopo l'intervento di protesi parziale d'anca. La signora cammina con il deambulatore, ma solo con assistenza. E' orientata di giorno, a tratti confusa la sera."),
 (9,"chiaro",0,"Vive sola, e la figlia lavora: oggi non puo' rientrare a casa in sicurezza. Serve una dimissione protetta, che andava pensata, e segnalata, fin dai primi giorni."),

 (10,"chiaro",0,"Il percorso e' quello della rete veneta, della lezione tredici punto cinque. Una segnalazione precoce alla COT, secondo procedura. Poi la valutazione multidimensionale dell'UVMD, con la SVaMA."),
 (10,"chiaro",0,"Alla valutazione partecipano la figlia, il medico di famiglia e l'assistente sociale. Il setting: prima la riabilitazione, in un'Unita' Riabilitativa Territoriale o in un Ospedale di Comunita', per recuperare autonomia."),
 (10,"chiaro",0,"Poi il rientro a casa, con l'ADI, il SAD, l'impegnativa di cura domiciliare, magari un centro diurno. Oppure, se il bisogno non sara' gestibile a casa, un Centro di Servizi."),

 (11,"chiaro",0,"E una lettera infermieristica che racconti la persona, non solo la frattura. L'autonomia attuale con la Barthel, la mobilita', gli ausili, le precauzioni per la protesi."),
 (11,"chiaro",0,"Lo stato cognitivo e il delirium serale, con cio' che la calma: un'informazione preziosa per chi la accoglie. Il rischio di caduta e le misure adottate. La cute e i talloni."),
 (11,"chiaro",0,"Alimentazione, idratazione, continenza. La terapia, con la riconciliazione: la benzodiazepina e' stata sospesa? La rete familiare, e l'educazione gia' fatta alla figlia."),

 (12,"chiaro",0,"La prevenzione: che cosa si poteva fare. All'ingresso, la valutazione del rischio di caduta e del delirium. Le misure non farmacologiche dal primo giorno. Niente benzodiazepine al bisogno in un'anziana con demenza."),
 (12,"chiaro",0,"Il letto basso invece delle sponde. L'accompagnamento programmato al bagno. Il coinvolgimento dei familiari. La segnalazione precoce dei bisogni di dimissione. Nessuna e' costosa, e tutte sono infermieristiche."),

 (13,"chiaro",0,"Gli errori da evitare. Sollevare subito la persona caduta. Dimenticare l'anticoagulante e la sorveglianza neurologica. Non segnalare l'evento."),
 (13,"chiaro",0,"Attribuire la confusione alla demenza, invece di riconoscere un delirium. Rispondere alla richiesta di contenzione con un si', o con un no secco senza alternative. E pensare alla dimissione il giorno prima."),

 (14,"chiaro",0,"Un approfondimento: parlare con una persona in delirium, che e' anche una forma di cura. Ci si avvicina di fronte, ci si presenta ogni volta, la si chiama per nome. Frasi brevi, una richiesta alla volta, tono calmo."),
 (14,"chiaro",0,"Non si contraddicono i contenuti e non si discute: si riconosce l'emozione. Capisco che vuole tornare a casa. Poi si riorienta con delicatezza, dicendo dove siamo e che ora e'."),
 (14,"chiaro",0,"Di notte si riducono rumori e luci forti. Aiutano gli oggetti familiari e le fotografie. E spesso l'intervento piu' efficace e' la presenza di un familiare: una voce conosciuta calma piu' di qualsiasi farmaco."),

 (15,"chiaro",0,"[curious] Le domande d'orale. Prima: delirium o demenza? Il delirium ha esordio acuto, decorso fluttuante, attenzione compromessa, ed e' spesso reversibile se si tratta la causa."),
 (15,"chiaro",0,"La demenza ha esordio insidioso e decorso progressivo, con l'attenzione conservata nelle fasi iniziali; e le due possono coesistere. Seconda: che cosa fa davanti a un paziente caduto?"),
 (15,"chiaro",0,"Non lo sollevo subito. Valuto coscienza, parametri, glicemia, segni di trauma cranico e di frattura. Chiamo aiuto e il medico, considero l'anticoagulante, lo mobilizzo con ausili, documento e segnalo."),
 (15,"chiaro",0,"Terza: che cos'e' l'UVMD? L'Unita' di Valutazione Multidimensionale Distrettuale: valuta la persona con bisogni complessi, con strumenti come la SVaMA, e definisce progetto individuale e accesso ai servizi."),

 (16,"chiaro",0,"La risposta modello. Anziana con demenza lieve, in terapia anticoagulante e con benzodiazepina serale, che in corso di infezione presenta delirium iperattivo e cade dal letto scavalcando le sponde."),
 (16,"chiaro",0,"Arto accorciato ed extraruotato: sospetta frattura di femore e rischio di emorragia intracranica. Non la sollevo subito: valuto ABC, coscienza, pupille, trauma cranico, dolore, parametri e glicemia."),
 (16,"chiaro",0,"Chiamo aiuto e avviso il medico. Immobilizzo l'arto e la sollevo con piu' operatori e ausili. Analgesia secondo prescrizione; avvio la sorveglianza neurologica e collaboro alla TC."),
 (16,"chiaro",0,"Segnalo l'evento, documento e informo la figlia, proponendo alternative alla contenzione. Segnalo la benzodiazepina. Prevengo delirium e lesioni dei talloni. Avvio presto la dimissione protetta, con COT e UVMD."),

 (17,"chiaro",0,"I collegamenti. Cadute e contenzione con la tre punto uno. Raccomandazione tredici e incident reporting con la due punto sei. La frattura di femore con la nove punto sei."),
 (17,"chiaro",0,"Il delirium e i farmaci inappropriati con la undici punto uno, la demenza con la undici punto due, la rete con la tredici punto cinque, la dimissione protetta con la nove punto sette e la undici punto sette."),

 (18,"profondo",1.2,"[serious] La frase del caso: le sponde non fermano chi vuole alzarsi, lo fanno cadere da piu' in alto. La sicurezza di un'anziana confusa si costruisce con la presenza e l'organizzazione, non con le barriere."),

 (19,"chiaro",0,"[warm] Nella prossima lezione: un paziente diabetico ricoverato per un'ulcera del piede, che alle sei del mattino e' sudato e tremante. Insulina, ipoglicemia, piede diabetico ed educazione. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Dopo la caduta: non sollevarla subito",4:"Il dettaglio che cambia la priorita'",
 5:"La mobilizzazione e la documentazione",6:"Perche' e' caduta",7:"La figlia: legatela",8:"La frattura di femore",
 9:"Quinta giornata dopo l'intervento",10:"Il percorso nella rete veneta",11:"La lettera infermieristica",12:"La prevenzione",
 13:"Gli errori da evitare",14:"Parlare con una persona in delirium",15:"Le domande d'orale",16:"La risposta modello",
 17:"I collegamenti",18:"La frase del caso",19:"Chiusura"}

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
