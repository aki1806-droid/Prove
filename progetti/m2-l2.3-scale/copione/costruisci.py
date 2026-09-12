# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questa e' la lezione con la piu' alta densita' di numeri di tutto il corso. Le scale sono il terreno piu' fertile per domande secche: sono numeriche, univoche, facilissime da chiedere."),
 (1,"chiaro",0,"E sono anche il punto in cui si perde piu' facilmente, perche' la trappola e' quasi sempre la stessa: la direzione del punteggio. Non il valore, la direzione."),
 (1,"tenue",0,"In alcune scale il punteggio basso indica rischio alto; in altre e' il contrario. Questa lezione e' costruita intorno a quel problema: prima la regola, poi i numeri."),

 (2,"chiaro",0,"Quattro traguardi. Come si struttura un accertamento, e con quale ordine. Poi la regola che risolve da sola meta' delle domande sulle scale, qualunque scala sia."),
 (2,"chiaro",0,"Le scale che contano davvero, con i numeri esatti. E i limiti delle scale, che all'orale valgono quanto i numeri, perche' mostrano pensiero critico. Sapere i numeri e non sapere che cosa non dicono non basta."),

 (3,"chiaro",0,"L'accertamento all'ingresso raccoglie in modo ordinato i dati necessari a formulare i problemi. Sei aree. Dati anagrafici e sociali: con chi vive, chi e' il caregiver. Anamnesi: patologie, allergie, terapia, ausili."),
 (3,"chiaro",0,"Parametri e misure. Bisogni o modelli funzionali. Le scale previste dalla procedura. E gia' da qui l'educazione e la dimissione, perche' la dimissione si prepara dal primo giorno."),

 (4,"chiaro",0,"Le tecniche dell'esame obiettivo sono quattro, in quest'ordine: ispezione, palpazione, percussione, auscultazione. Con un'eccezione che e' una domanda ricorrente, e vale la pena impararla come una frase a se'."),
 (4,"profondo",1.2,"Sull'addome si ausculta prima di palpare e percuotere, per non alterare i rumori intestinali. Ispezione, auscultazione, percussione, palpazione."),

 (5,"chiaro",0,"Ecco la regola. Chiediti sempre: la scala misura un rischio o una capacita'? Se misura una capacita', Barthel, Tinetti, Glasgow, piu' alto e' meglio: il punteggio basso indica dipendenza o gravita'."),
 (5,"chiaro",0,"Se misura un rischio, Conley, NEWS, l'intensita' del dolore, piu' alto e' peggio. E poi ci sono le due eccezioni da imparare a parte."),
 (5,"profondo",1.2,"Braden e Norton misurano un rischio ma con punteggio inverso: piu' basso il punteggio, piu' alto il rischio. Sono due, e sono sempre quelle due."),

 (6,"chiaro",0,"Braden valuta il rischio di lesione da pressione. Sei item: percezione sensoriale, umidita', attivita', mobilita', nutrizione, frizione e scivolamento."),
 (6,"chiaro",0,"Punteggio da 6 a 23. Rischio presente da 16 in giu'. Sedici e' la soglia, e sotto quella soglia il piano cambia. Non e' un numero da annotare: e' un numero che fa succedere qualcosa."),
 (6,"tenue",0,"Un dettaglio da veri conoscitori: solo l'ultimo item, frizione e scivolamento, e' a tre livelli; gli altri cinque sono a quattro. E' da li' che vengono il 6 e il 23."),

 (7,"chiaro",0,"Norton misura lo stesso rischio con cinque item: condizioni generali, stato mentale, attivita', mobilita', incontinenza. Punteggio da 5 a 20, rischio da 14 in giu'."),
 (7,"chiaro",0,"E' piu' rapida di Braden, ma meno sensibile. Il che significa che intercetta meno persone a rischio: e' un compromesso fra tempo e copertura, non una scala migliore o peggiore."),
 (7,"chiaro",0,"Memorizza le due coppie insieme, perche' i quiz le scambiano di continuo: Braden da 6 a 23, soglia 16. Norton da 5 a 20, soglia 14. Sei item Braden, cinque Norton."),

 (8,"chiaro",0,"E la parte che i casi chiedono davvero: che cosa consegue da un Braden a rischio. Cambi posturali programmati. Superficie antidecubito adeguata. Gestione dell'umidita', che e' il fattore che si dimentica piu' spesso."),
 (8,"chiaro",0,"Valutazione nutrizionale. Ispezione quotidiana della cute. La clinica delle lesioni la vedremo nel modulo 7: qui conta la catena punteggio, intervento. A un Braden basso deve corrispondere una modifica del piano, scritta."),

 (9,"chiaro",0,"Conley misura il rischio di caduta. Sei item: precedenti cadute, vertigini, incontinenza o urgenza, deterioramento cognitivo, agitazione, compromissione della marcia."),
 (9,"chiaro",0,"Punteggio da 0 a 10, rischio da 2 in su. Basta poco per essere a rischio, ed e' voluto: e' uno screening sensibile, fatto per non lasciar fuori nessuno. Meglio qualche falso positivo che una caduta non prevista."),
 (9,"chiaro",0,"Tinetti misura equilibrio e andatura, da 0 a 28, rischio elevato sotto 19. E nota che Tinetti misura una capacita': si comporta al contrario di Conley. Due scale sullo stesso rischio, due direzioni opposte."),

 (10,"chiaro",0,"Barthel misura l'autonomia in dieci attivita' di vita quotidiana, da 0 a 100. Piu' basso, piu' dipendente: e' una capacita', quindi alto e' meglio. Cento vuol dire autonomo in tutte e dieci."),
 (10,"chiaro",0,"Le ADL di Katz sono sei attivita' di base: bagno, vestirsi, toilette, trasferimenti, continenza, alimentazione. Sono quelle che riguardano il corpo proprio."),
 (10,"chiaro",0,"Le IADL di Lawton sono otto attivita' strumentali: telefono, spesa, cucina, casa, bucato, trasporti, farmaci, denaro. Sei di base, otto strumentali: le strumentali riguardano il rapporto con il mondo fuori."),

 (11,"chiaro",0,"Domanda ricorrente: quale delle due intercetta prima il declino? Nel deterioramento cognitivo si perdono prima le IADL, la gestione dei farmaci, del denaro, dei trasporti. E poi le ADL."),
 (11,"tenue",1.2,"Ecco perche' le IADL sono piu' sensibili nel declino precoce: quando una persona non riesce piu' a gestire le proprie medicine ma si lava ancora da sola, il problema e' gia' iniziato."),

 (12,"chiaro",0,"Il dolore. NRS, numerica da zero a dieci: la piu' usata, perche' non richiede supporti. VAS, la linea di dieci centimetri su cui la persona segna un punto. VRS, descrittori verbali: nessuno, lieve, moderato, forte."),
 (12,"chiaro",0,"Wong Baker, le facce, per i bambini e per le barriere linguistiche. E poi le due osservazionali, che si usano quando la persona non puo' riferire il proprio dolore, e sono le due che nei casi clinici fanno la differenza."),
 (12,"chiaro",0,"PAINAD, cinque item per la demenza avanzata: respiro, vocalizzazione, espressione facciale, linguaggio del corpo, consolabilita'. E FLACC per il bambino piccolo: volto, gambe, attivita', pianto, consolabilita'."),

 (13,"chiaro",0,"E la regola d'oro: il dolore e' cio' che la persona dice che e'. Quando non puo' dirlo, non si conclude che non ne abbia: si passa a una scala osservazionale. Il dolore non misurabile con le parole resta un dolore."),
 (13,"profondo",1.2,"Il distrattore tipico propone: il paziente con demenza non e' valutabile. E' sempre errato, senza eccezioni. Non valutabile con la NRS non vuol dire non valutabile."),

 (14,"chiaro",0,"Glasgow. Apertura degli occhi da 1 a 4. Risposta verbale da 1 a 5. Risposta motoria da 1 a 6. Somma minima 3, non zero: e' l'errore piu' comune, e viene dal fatto che ogni item parte da uno e non da zero. Massimo 15."),
 (14,"chiaro",0,"Pari o inferiore a 8: coma. Fra 9 e 12 alterazione moderata, fra 13 e 15 lieve. Sono tre fasce, e la piu' chiesta e' sempre la prima."),
 (14,"chiaro",0,"Quattro, cinque, sei: se ricordi questi tre numeri ricostruisci tutto il resto. Tre e' la somma dei minimi, quindici la somma dei massimi, e la soglia del coma e' otto."),

 (15,"chiaro",0,"La CAM, per il delirium. Quattro caratteristiche. Uno: esordio acuto e andamento fluttuante. Due: disattenzione. Tre: pensiero disorganizzato. Quattro: alterato livello di coscienza."),
 (15,"chiaro",0,"E' positiva se sono presenti la 1 e la 2, piu' almeno una fra la 3 e la 4. La formula da ricordare e': uno piu' due, piu' tre o quattro. Le prime due sono obbligatorie, delle altre ne basta una."),

 (16,"chiaro",0,"NEWS 2 e MEWS sono sistemi di allerta precoce del deterioramento. Sommano parametri: frequenza respiratoria, saturazione, ossigeno, pressione sistolica, frequenza cardiaca, coscienza, temperatura."),
 (16,"chiaro",0,"E il punteggio determina frequenza del monitoraggio e livello di risposta. Non e' una diagnosi: e' un semaforo che dice quanto spesso guardare e chi chiamare, anche quando il paziente sembra stabile."),
 (16,"chiaro",0,"Sul versante nutrizionale: MUST per l'adulto, con BMI, calo ponderale ed effetto della malattia acuta, rischio alto da 2 in su. MNA per l'anziano, dove il punteggio basso indica peggiore stato nutrizionale."),

 (17,"chiaro",0,"Tre limiti, e all'orale valgono quanto i numeri. Uno: la scala non sostituisce il giudizio clinico. Se la persona e' a rischio e la scala dice di no, prevale l'osservazione, e si documenta il perche'."),
 (17,"chiaro",0,"Due: va usata per cio' per cui e' validata, cioe' per quella popolazione, quel setting, quell'eta'. Tre: va ripetuta, perche' il valore all'ingresso e' una fotografia e non un verdetto."),

 (18,"chiaro",0,"E l'avvertenza piu' importante. Compilare la scala e non modificare il piano e' l'errore piu' diffuso, ed e' anche il piu' facile da contestare in sede di responsabilita', perche' la scala compilata resta agli atti."),
 (18,"profondo",1.2,"Perche' dimostra che il rischio era noto e non e' stato gestito. Nella risposta a un caso, dopo il punteggio metti sempre l'intervento che ne consegue."),

 (19,"chiaro",0,"Ti lascio la tabella dei numeri. Braden da 6 a 23, soglia 16. Norton da 5 a 20, soglia 14. Conley da 0 a 10, rischio da 2 in su. Tinetti da 0 a 28, rischio elevato sotto 19."),
 (19,"chiaro",0,"Barthel da 0 a 100. Glasgow da 3 a 15, coma sotto o uguale a 8. CAM: uno piu' due, piu' tre o quattro. MUST: rischio alto da 2 in su. MNA: punteggio basso, stato nutrizionale peggiore."),
 (19,"chiaro",0,"[warm] Fotografa questa slide e riguardala la sera prima della prova. Nella prossima lezione parliamo di documentazione, cioe' di come tutto questo diventa verificabile. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"L'accertamento strutturato",
 4:"Le quattro tecniche",5:"La regola della direzione",6:"Braden",7:"Norton e il confronto",
 8:"Dal punteggio all'intervento",9:"Conley e Tinetti",10:"Barthel, ADL, IADL",
 11:"ADL o IADL?",12:"Le scale del dolore",13:"La regola d'oro",14:"Glasgow",
 15:"CAM e delirium",16:"NEWS, MEWS, nutrizionali",17:"I limiti delle scale",
 18:"Il punteggio serve se cambia qualcosa",19:"La tabella dei numeri"}
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
    if len(b["text"])>225: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
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
