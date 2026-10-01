# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Un accesso venoso e' centrale quando la sua punta si trova in una grande vena vicino al cuore, di norma la vena cava superiore o la giunzione fra cava e atrio destro."),
 (1,"chiaro",0,"Questi dispositivi permettono terapie che una vena periferica non tollera, ma portano con se' un rischio specifico: le batteriemie, le CLABSI."),
 (1,"chiaro",0,"La prevenzione delle CLABSI e' oggi uno degli indicatori di qualita' dell'assistenza infermieristica. Ed e' il filo di questa lezione."),

 (2,"chiaro",0,"Quando serve un accesso centrale? Per farmaci irritanti o vescicanti; per soluzioni con osmolarita' superiore a circa novecento milliosmoli per litro o con pH lontano dalla norma, come la nutrizione parenterale completa."),
 (2,"chiaro",0,"Per terapie prolungate; per il monitoraggio emodinamico nel paziente critico; e quando il patrimonio venoso periferico e' esaurito, come abbiamo visto nella lezione sei punto uno."),

 (3,"chiaro",0,"I dispositivi. Il CVC non tunnellizzato, inserito nella giugulare interna, nella succlavia o nella femorale, per il breve termine, tipico della terapia intensiva."),
 (3,"chiaro",0,"Il PICC, catetere centrale a inserzione periferica: si inserisce in una vena del braccio sotto ecoguida, ma la punta arriva in cava, quindi e' a tutti gli effetti un accesso centrale; dura settimane o mesi."),
 (3,"chiaro",0,"I CVC tunnellizzati, che decorrono sotto la cute prima di entrare in vena, per il lungo termine. E il port, totalmente impiantato sotto la cute, ideale per terapie intermittenti a lungo termine, come le chemioterapie."),

 (4,"chiaro",0,"Attenzione al Midline, perche' e' la trappola classica. Si inserisce come un PICC, in una vena del braccio, ma e' piu' corto: la sua punta resta in una vena periferica, l'ascellare o la basilica."),
 (4,"chiaro",0,"Quindi e' un accesso periferico, e attraverso il Midline si infondono solo soluzioni compatibili con la via periferica: niente nutrizione parenterale centrale, niente vescicanti."),
 (4,"chiaro",0,"E' utile per terapie di qualche settimana con farmaci non irritanti. Stessa vena del PICC, punta diversa: e' la punta che fa l'accesso, non il punto d'ingresso."),

 (5,"chiaro",0,"Una regola di sicurezza fondamentale: un accesso centrale non si usa finche' non e' stata confermata la posizione della punta, con la radiografia del torace o con il metodo dell'ECG intracavitario."),
 (5,"chiaro",0,"L'ECG intracavitario e' sempre piu' usato: permette la verifica gia' durante l'inserimento. Dopo un inserimento in giugulare o succlavia, la radiografia esclude anche lo pneumotorace, la complicanza meccanica piu' temuta."),

 (6,"chiaro",0,"Il bundle di prevenzione delle CLABSI si divide in due tempi. All'inserimento: igiene delle mani; massime barriere sterili."),
 (6,"chiaro",0,"Cuffia, mascherina, camice sterile, guanti sterili e un telo sterile che copra tutto il paziente: non un telino intorno alla sede, tutto il paziente."),
 (6,"chiaro",0,"Antisepsi con clorexidina al due per cento in alcol, lasciata asciugare; scelta del sito, evitando la femorale nell'adulto quando possibile."),
 (6,"chiaro",0,"E una check-list compilata da un osservatore, spesso l'infermiere, autorizzato a fermare la procedura se vede una violazione dell'asepsi."),
 (6,"profondo",1.2,"[serious] E' uno dei pochi momenti in cui l'infermiere ha esplicitamente il compito di dire stop."),

 (7,"chiaro",0,"Nella gestione, che e' interamente infermieristica: igiene delle mani prima di ogni accesso. Scrub the hub: si disinfetta il connettore prima di collegare."),
 (7,"chiaro",0,"Strofinando per cinque-quindici secondi con clorexidina alcolica o alcol, e lasciando asciugare. Il connettore e' la porta d'ingresso dei batteri nella gestione quotidiana."),
 (7,"chiaro",0,"La medicazione trasparente si cambia ogni sette giorni, ma subito se e' staccata, bagnata o sporca; quella in garza ogni due giorni. Dove previste, medicazioni o spugnette alla clorexidina sulla sede di uscita."),
 (7,"chiaro",0,"E la misura piu' efficace di tutte: chiedersi ogni giorno se il catetere serve ancora."),

 (8,"chiaro",0,"Il cambio delle linee. Infusioni continue senza lipidi: secondo procedura, fra novantasei ore e sette giorni. Lipidi e nutrizione parenterale con lipidi: ogni ventiquattro ore, perche' favoriscono la crescita batterica."),
 (8,"chiaro",0,"Per il propofol, ogni sei-dodici ore. Per il sangue, secondo la procedura trasfusionale, che vedremo nella lezione sei punto sei."),

 (9,"chiaro",0,"I lavaggi, o flush. Si lava con soluzione fisiologica prima e dopo ogni farmaco, fra farmaci diversi e dopo i prelievi. La tecnica e' pulsante, piccole spinte e pause, che crea turbolenza e pulisce meglio il lume."),
 (9,"chiaro",0,"Si usano siringhe da almeno dieci millilitri: le siringhe piccole generano pressioni molto alte e possono rompere il catetere. Si chiude a pressione positiva, per evitare il reflusso di sangue in punta."),
 (9,"chiaro",0,"Il lock, cioe' la soluzione lasciata nel catetere fra un uso e l'altro, dipende dal dispositivo e dalla procedura: spesso fisiologica, in alcuni casi altre soluzioni."),

 (10,"chiaro",0,"Il port si punge attraverso la cute con un ago di Huber, un ago speciale non carotante, che non asporta frammenti della membrana di silicone e ne preserva la durata."),
 (10,"chiaro",0,"La puntura richiede tecnica asettica; l'ago in sede si cambia secondo procedura. Quando il port non viene usato, va lavato periodicamente, secondo le indicazioni del produttore e della procedura aziendale."),

 (11,"chiaro",0,"Le complicanze, in tre famiglie. Meccaniche: all'inserimento pneumotorace, puntura arteriosa, malposizione, aritmie se la punta irrita il cuore."),
 (11,"chiaro",0,"Durante la gestione occlusione, rottura, dislocazione; e l'embolia gassosa, che merita una slide a se'. Per l'occlusione vale la regola della lezione precedente: non si forza con la siringa."),

 (12,"chiaro",0,"L'embolia gassosa: aria che entra nel circolo da un catetere aperto, una connessione staccata, una rimozione scorretta. I segni sono improvvisi: dispnea, dolore toracico, ipotensione, cianosi, coscienza alterata."),
 (12,"chiaro",0,"La condotta: chiudere la via d'ingresso dell'aria; paziente in decubito laterale sinistro, capo in basso, in Trendelenburg, per intrappolare l'aria nel ventricolo destro; ossigeno; chiamare il medico."),
 (12,"chiaro",0,"E la prevenzione al momento della rimozione del CVC: paziente supino o in Trendelenburg, rimozione in espirazione o durante una manovra di Valsalva, e medicazione occlusiva sulla sede."),

 (13,"chiaro",0,"Le complicanze trombotiche: una trombosi venosa del braccio o del collo, con edema, dolore, turgore delle vene superficiali, da segnalare subito. E quelle infettive: infezione della sede di uscita, del tunnel, batteriemia."),
 (13,"chiaro",0,"Un segno da conoscere: il brivido che compare durante o subito dopo il lavaggio del catetere suggerisce che il catetere sia colonizzato e che il lavaggio stia immettendo batteri in circolo. Va segnalato immediatamente."),

 (14,"chiaro",0,"Quando si sospetta un'infezione del catetere, le emocolture si prelevano in modo appaiato: un set dal catetere e uno da una vena periferica, nello stesso momento."),
 (14,"chiaro",0,"Il confronto fra i tempi in cui i due set diventano positivi aiuta a capire se la sorgente e' proprio il catetere. Rivedremo le emocolture nella lezione sei punto sette."),

 (15,"chiaro",0,"Il caso. Paziente con PICC per terapia antibiotica; dopo il lavaggio del catetere compare febbre a trentotto e otto con brivido. Che cosa fai?"),
 (15,"chiaro",0,"Sospendi l'uso del catetere, ispezioni la sede, rilevi i parametri, avvisi il medico; prepari le emocolture appaiate, dal PICC e da vena periferica, prima di qualunque modifica della terapia antibiotica."),
 (15,"chiaro",0,"Poi sara' il medico a decidere se il catetere va rimosso. Documenti l'episodio e l'orario esatto del brivido."),

 (16,"chiaro",0,"Nelle aziende venete il posizionamento di PICC e Midline e' spesso affidato a team infermieristici formati, con ecoguida e conferma ECG della punta: l'evoluzione delle competenze del modulo uno, in concreto."),
 (16,"chiaro",0,"Il bundle CLABSI e' integrato nelle procedure, e le batteriemie rientrano nella sorveglianza delle ICA. All'orale, citare il team accessi vascolari a gestione infermieristica e' un ottimo aggancio."),

 (17,"chiaro",0,"La tabella da fotografare. CVC non tunnellizzato: centrale, breve termine. PICC: centrale, medio-lungo termine. Midline: periferico, qualche settimana."),
 (17,"chiaro",0,"Tunnellizzato: centrale, lungo termine. Port: centrale, lungo termine, uso intermittente, ago di Huber. Cinque dispositivi, una sola domanda da farsi: dove sta la punta?"),

 (18,"chiaro",0,"Ricapitoliamo. Conferma della punta prima di usare un centrale. Massime barriere sterili e clorexidina alcolica all'inserimento. Scrub the hub. Medicazione trasparente ogni sette giorni, garza ogni due."),
 (18,"chiaro",0,"Siringhe da almeno dieci millilitri e tecnica pulsante. Embolia gassosa: laterale sinistro e Trendelenburg. Brivido al lavaggio: allarme."),
 (18,"chiaro",0,"[warm] E, ogni giorno, serve ancora? E' la stessa domanda della lezione sei punto uno, e vale ancora di piu' per un centrale. Nella prossima lezione: la fluidoterapia. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Perche' un accesso centrale",3:"I dispositivi",4:"Il Midline",5:"La conferma della punta",
 6:"Il bundle all'inserimento",7:"Il bundle nella gestione",8:"Il cambio delle linee",9:"Lavaggi e chiusura",10:"Il port",
 11:"Le complicanze meccaniche",12:"L'embolia gassosa",13:"Trombosi e infezioni",14:"Le emocolture",15:"Il caso",16:"In Veneto",17:"La tabella",18:"Chiusura"}

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
