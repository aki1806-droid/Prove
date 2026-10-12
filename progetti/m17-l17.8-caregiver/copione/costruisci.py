# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo caso mostra il lavoro dell'infermiere di famiglia e comunita', la figura del DM settantasette che molti di voi potrebbero ricoprire."),
 (1,"chiaro",0,"A domicilio non ci sono colleghi nella stanza accanto: c'e' una persona fragile, una famiglia in difficolta' e una rete di servizi da attivare. Il problema clinico e' una lesione da pressione."),
 (1,"chiaro",0,"Il problema vero, spesso, e' un caregiver che non ce la fa piu'. Ci servono le lezioni tre punto tre, sette punto due, undici punto sette, tredici punto quattro e tredici punto cinque."),

 (2,"chiaro",0,"Lo scenario. La signora Bruna, ottantaquattro anni, ha gli esiti di un ictus da sei mesi: emiplegia destra, passa il giorno a letto o in carrozzina, ha una disfagia lieve e un'incontinenza."),
 (2,"chiaro",0,"Vive con il figlio Paolo, cinquantacinque anni, separato, che lavora a tempo pieno. La Medicina di Gruppo Integrata segnala all'infermiere di famiglia e comunita' una piaga al sacro."),
 (2,"chiaro",0,"Alla visita trovi una lesione sacrale profonda, con il tessuto adiposo visibile. Una Braden di dieci. Un materasso normale. Il peso in calo."),
 (2,"chiaro",0,"E Paolo, con le occhiaie, ti dice: non dormo, ho mal di schiena, non ce la faccio piu'. Fermati un momento: chi sono i tuoi pazienti?"),

 (3,"chiaro",0,"Il ragionamento. I pazienti sono due: Bruna e Paolo. Bruna ha una lesione da pressione di stadio tre, perche' il tessuto adiposo e' visibile, come nella lezione sette punto due."),
 (3,"chiaro",0,"Ha un rischio elevato, con una Braden di dieci, una malnutrizione, la disfagia, l'incontinenza e l'immobilita'. Paolo e' un caregiver con segni evidenti di sovraccarico fisico ed emotivo."),
 (3,"chiaro",0,"[thoughtful] E la lesione e' il segnale di un sistema di cura che non regge piu'. Medicarla bene e' necessario, ma non basta: serve una risposta di rete."),

 (4,"chiaro",0,"La valutazione a domicilio, multidimensionale. La lesione, con il metodo TIME: sede, stadio, dimensioni, fondo, essudato, margini, cute perilesionale, dolore, segni di infezione. Il rischio, con la Braden."),
 (4,"chiaro",0,"La nutrizione: peso, MNA, apporto, deglutizione. La continenza e la cute, con la dermatite associata all'incontinenza. L'autonomia, con la Barthel. L'ambiente: letto, materasso, bagno, spazi, ausili."),
 (4,"chiaro",0,"Il caregiver: il carico, per esempio con la scala di Zarit, la sua salute, il tempo, le risorse economiche, gli altri familiari. E la terapia, con la riconciliazione."),

 (5,"chiaro",0,"Il piano per la lesione. Una superficie antidecubito adeguata al rischio, materasso o sovramaterasso, da richiedere subito. Il riposizionamento programmato, sul fianco a trenta gradi, con lo scarico dei talloni."),
 (5,"chiaro",0,"La posizione seduta limitata nel tempo, con un cuscino antidecubito. La medicazione avanzata secondo valutazione, come nella lezione sette punto cinque. E il dolore durante le medicazioni."),
 (5,"chiaro",0,"L'incontinenza: igiene delicata, prodotti barriera, ausili assorbenti adeguati e cambiati per tempo, perche' l'umidita' macera la cute. E la rivalutazione periodica, con misurazioni documentate."),

 (6,"chiaro",0,"La nutrizione. Una lesione da pressione non guarisce senza un apporto adeguato di proteine e calorie. Consistenze adatte alla disfagia, come nella lezione tre punto tre, e una posizione corretta durante il pasto."),
 (6,"chiaro",0,"Integratori secondo prescrizione, dietista, peso periodico, idratazione. E una domanda concreta, che spiega il calo di peso: chi aiuta Bruna a mangiare quando Paolo e' al lavoro? Spesso, nessuno."),

 (7,"chiaro",0,"Il caregiver. Si ascolta Paolo e si riconosce la sua fatica, senza giudizio: non ce la faccio piu' non e' un'accusa a se stesso, e' una richiesta di aiuto."),
 (7,"chiaro",0,"Si valuta il suo carico, per esempio con la Zarit, e la sua salute: sonno, schiena, umore. Gli si insegna la mobilizzazione sicura con gli ausili della lezione tre punto due, che proteggono anche la sua schiena."),
 (7,"chiaro",0,"I diritti: i permessi della legge centoquattro, per assistere un familiare con disabilita' grave, e la definizione di caregiver familiare della legge di bilancio del duemiladiciotto. Il caregiver ha diritto a essere curato."),

 (8,"chiaro",0,"L'attivazione della rete, la competenza distintiva dell'infermiere di famiglia e comunita'. Il confronto con il medico di famiglia e la medicina di gruppo. La valutazione dell'UVMD con la SVaMA, della tredici punto cinque."),
 (8,"chiaro",0,"L'ADI, con infermieri per le medicazioni, fisioterapista e OSS per l'igiene. Gli ausili tramite il distretto: materasso antidecubito, letto articolato, sollevatore, carrozzina adeguata. Il SAD del Comune."),
 (8,"chiaro",0,"L'impegnativa di cura domiciliare. Un centro diurno, o un ricovero di sollievo perche' Paolo riposi. L'assistente sociale e le associazioni. Da soli, questi servizi non risolvono; insieme, cambiano la situazione."),

 (9,"chiaro",0,"[serious] Un approfondimento delicato: la trascuratezza involontaria. Una lesione profonda, un calo di peso, una persona lasciata sola per molte ore possono indicare una trascuratezza."),
 (9,"chiaro",0,"Molto spesso e' involontaria: un caregiver esausto, senza competenze e senza aiuto, come Paolo. Si valuta senza giudizio e senza accuse, si documentano i fatti, e si interviene con il supporto e la rete."),
 (9,"chiaro",0,"Se invece ci sono segni di maltrattamento o di pericolo, si segnala secondo procedure e normativa: servizi sociali, medico e, se serve, le autorita' competenti. Distinguere i due casi e' una competenza professionale."),

 (10,"chiaro",0,"Il piano condiviso. Gli obiettivi si concordano con Bruna, per quanto puo' partecipare, perche' l'afasia o la disfagia non la escludono dalle decisioni. E con Paolo."),
 (10,"chiaro",0,"Obiettivi realistici e misurabili: una riduzione delle dimensioni della lesione in quattro settimane, un peso stabile, nessuna nuova lesione, un carico del caregiver ridotto."),
 (10,"chiaro",0,"Si stabilisce chi fa che cosa e quando, con i numeri di riferimento. Una documentazione condivisa, la cartella domiciliare e il Fascicolo Sanitario Elettronico. E la rivalutazione, programmata."),

 (11,"chiaro",0,"Due mesi dopo. A casa ci sono un materasso antidecubito, un letto articolato e un sollevatore. L'ADI e' attiva, un'OSS del SAD arriva al mattino, Bruna va al centro diurno due giorni alla settimana."),
 (11,"chiaro",0,"La lesione si e' ridotta ed e' granuleggiante, il peso e' stabile. Paolo dorme di piu', ha usato i permessi, ha un ricovero di sollievo per agosto. La rete funziona, e va mantenuta con rivalutazioni periodiche."),

 (12,"chiaro",0,"Gli errori. Medicare la lesione senza cambiare le condizioni che l'hanno causata. Dimenticare la nutrizione. Giudicare o colpevolizzare il caregiver. Ignorare la sua salute."),
 (12,"chiaro",0,"Lavorare da soli, senza attivare la rete. Non distinguere fra trascuratezza involontaria e maltrattamento. Porsi obiettivi irrealistici. Non documentare."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: le funzioni dell'infermiere di famiglia e comunita'? E' il professionista di riferimento per la salute della persona, della famiglia e della comunita', uno ogni tremila abitanti."),
 (13,"chiaro",0,"Prende in carico fragilita' e cronicita', fa prevenzione ed educazione, lavora a domicilio e in rete con il medico di famiglia, i servizi sociali e il distretto."),
 (13,"chiaro",0,"Seconda: la lesione da pressione a domicilio? Valutazione del rischio e della lesione, superficie antidecubito, riposizionamento, scarico dei talloni, nutrizione, incontinenza, medicazione, educazione del caregiver."),
 (13,"chiaro",0,"Terza: come si sostiene un caregiver in difficolta'? Con l'ascolto, la valutazione del carico, la formazione, l'informazione sui diritti, e attivando i servizi di supporto e di sollievo."),

 (14,"chiaro",0,"La risposta modello. Anziana con esiti di ictus, allettata, disfagica e incontinente, con una lesione sacrale di stadio tre, rischio elevato e calo di peso, assistita da un figlio esausto."),
 (14,"chiaro",0,"Eseguo una valutazione multidimensionale a domicilio, compreso il carico del caregiver. Imposto il piano: superficie antidecubito e ausili, riposizionamento con scarico dei talloni, medicazione avanzata."),
 (14,"chiaro",0,"Gestisco l'incontinenza, la nutrizione adatta alla disfagia e il dolore. Ascolto il figlio senza giudizio, gli insegno la mobilizzazione sicura e lo informo sui diritti."),
 (14,"chiaro",0,"Con il medico di famiglia attivo la rete: UVMD con SVaMA, ADI, SAD, impegnativa di cura domiciliare, centro diurno, sollievo, assistente sociale. Concordo obiettivi misurabili, documento, rivaluto."),

 (15,"chiaro",0,"I collegamenti. Disfagia e nutrizione con la tre punto tre. Mobilizzazione e ausili con la tre punto due. Le lesioni da pressione con la sette punto due, le medicazioni avanzate con la sette punto cinque."),
 (15,"chiaro",0,"Il territorio con la undici punto sette. Le cure primarie venete con la tredici punto quattro. E la rete per la non autosufficienza con la tredici punto cinque."),

 (16,"chiaro",0,"Le competenze in gioco. L'autonomia decisionale, perche' a domicilio molte cose si decidono da soli. La valutazione multidimensionale. Competenze tecniche, come il wound care e la nutrizione. L'educazione e il coaching."),
 (16,"chiaro",0,"Una conoscenza concreta della rete dei servizi e delle procedure per accedervi. Il lavoro di squadra, e la comunicazione con le famiglie. E' il ruolo in cui tutto il corso si ricompone."),

 (17,"profondo",1.2,"[thoughtful] La frase del caso: a domicilio la lesione si cura con la medicazione, ma guarisce con la rete."),

 (18,"chiaro",0,"[warm] Nella prossima lezione: una notte in un Centro di Servizi per anziani non autosufficienti, un ospite con demenza che ha la febbre, e la decisione se mandarlo o no in pronto soccorso. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Il ragionamento",4:"La valutazione a domicilio",5:"La lesione: il piano",
 6:"La nutrizione",7:"Il caregiver",8:"L'attivazione della rete",9:"La trascuratezza involontaria",
 10:"Il piano condiviso",11:"Due mesi dopo",12:"Gli errori da evitare",13:"Le domande d'orale",
 14:"La risposta modello",15:"I collegamenti",16:"Le competenze in gioco",17:"La frase del caso",18:"Chiusura"}

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
