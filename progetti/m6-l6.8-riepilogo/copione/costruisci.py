# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Chiudiamo il modulo sei. E' un modulo di procedure, e il modo migliore per ripassarlo e' metterle a confronto: che cosa hanno in comune, dove differiscono, dove si sbaglia."),
 (1,"chiaro",0,"Poi le confusioni che costano piu' punti, i casi tipici, e una breve autovalutazione: otto domande secche, di quelle che il quiz fa davvero."),
 (1,"chiaro",0,"Tieni a portata di mano il quaderno: i numeri di questo modulo si imparano scrivendoli, non ascoltandoli."),

 (2,"chiaro",0,"Sette lezioni: accessi periferici e scala VIP; accessi centrali e bundle; fluidoterapia e sovraccarico; emogasanalisi e ROME; nutrizione parenterale e rialimentazione; trasfusione e doppio controllo; preanalitica e provette."),
 (2,"chiaro",0,"Il filo comune e' uno: il sistema vascolare come porta d'accesso. Per curare, e per sbagliare. Ogni lezione e' una cosa che entra o che esce da una vena."),

 (3,"chiaro",0,"Che cosa hanno in comune tutte queste procedure? Identificazione attiva del paziente, sempre, prima di toccare qualsiasi cosa: nome, cognome e data di nascita detti da lui, confrontati con il braccialetto."),
 (3,"chiaro",0,"Asepsi, con clorexidina alcolica lasciata asciugare e niente ripalpazione. Disinfezione dei connettori, lo scrub the hub. Valutazione regolare del dispositivo."),
 (3,"chiaro",0,"La domanda quotidiana: serve ancora? Un dispositivo che non serve si rimuove. E la documentazione: inserimento, valutazione, rimozione, con data e firma."),

 (4,"chiaro",0,"Periferico e centrale a confronto. Periferico: calibro piu' piccolo possibile, sostituzione su indicazione clinica e non a scadenza fissa, scala VIP con rimozione da due."),
 (4,"chiaro",0,"Centrale: conferma della punta prima dell'uso, massime barriere sterili all'inserimento, medicazione trasparente ogni sette giorni, attenzione all'embolia gassosa."),
 (4,"chiaro",0,"E il Midline, che e' periferico: si inserisce come un PICC, in una vena del braccio, ma e' piu' corto, e la punta resta nell'ascellare o nella basilica. Chi lo chiama centrale perde il punto."),

 (5,"chiaro",0,"I numeri del modulo. Gauge: numero basso, calibro grande. Sopra novecento milliosmoli per litro, via centrale. Siringhe da almeno dieci millilitri per i lavaggi."),
 (5,"chiaro",0,"pH sette virgola trentacinque-sette virgola quarantacinque. CO2 trentacinque-quarantacinque. Bicarbonato ventidue-ventisei. Compressione dopo il prelievo arterioso: almeno cinque minuti."),
 (5,"chiaro",0,"Emazie a due-sei gradi, trasfuse entro quattro ore; piastrine a venti-ventiquattro gradi, in agitazione. Laccio meno di un minuto. Emocolture: otto-dieci millilitri per flacone."),
 (5,"chiaro",0,"Sono dodici numeri, e stanno in tre slide: fermati, copiali nel quaderno, e riparti. Un numero scritto una volta vale piu' di tre ascolti, e il quiz li chiede tutti e dodici."),

 (6,"chiaro",0,"Le tre sequenze di emergenza. Stravaso: fermare l'infusione, scollegare e aspirare dalla cannula, rimuovere, sollevare l'arto, avvisare il medico, delimitare e documentare."),
 (6,"chiaro",0,"Embolia gassosa: chiudere la via d'ingresso dell'aria, paziente in laterale sinistro in Trendelenburg, con il capo in basso, per intrappolare l'aria nel ventricolo destro, ossigeno, medico."),
 (6,"chiaro",0,"Reazione trasfusionale: fermare, accesso con fisiologica e deflussore nuovo, parametri, medico, ricontrollo di identita' e sacca, invio di sacca e campioni, urine, segnalazione."),

 (7,"chiaro",0,"Le confusioni che costano piu' punti. Uno: il Midline non e' centrale. Due: infiltrazione se la soluzione non e' vescicante, stravaso se lo e'."),
 (7,"chiaro",0,"Tre: la glucosata al cinque per cento non espande il volume circolante: dopo il metabolismo del glucosio resta acqua libera, che si distribuisce in tutti i compartimenti, e solo una piccola parte resta nei vasi."),
 (7,"chiaro",0,"Quattro: il donatore universale di emazie e' zero negativo, quello di plasma e' AB. L'inversione e' la domanda classica, e la risposta istintiva e' quella sbagliata."),

 (8,"chiaro",0,"Cinque: ROME. Respiratorio opposto, metabolico uguale: pH e CO2 in direzione opposta nel disturbo respiratorio, pH e bicarbonato nella stessa direzione in quello metabolico."),
 (8,"chiaro",0,"Sei: le piastrine mai in frigorifero. Sette: con il sangue solo fisiologica: la glucosata provoca emolisi, il Ringer con il suo calcio favorisce la coagulazione, i farmaci in linea mai."),
 (8,"chiaro",0,"Otto: emocolture con il butterfly, prima l'aerobio; con la siringa, prima l'anaerobio. L'aria del tubicino deve finire nel flacone che l'aria la tollera."),

 (9,"chiaro",0,"I casi. Cannula con VIP due e nessuna terapia endovenosa in corso: si rimuove e non si riposiziona. Due motivi per toglierla, nessuno per tenerla."),
 (9,"chiaro",0,"Brivido al lavaggio del PICC: si sospetta una CLABSI. Emocolture appaiate, dal catetere e da vena periferica nello stesso momento, e medico: il confronto dei tempi di positivizzazione dice se la sorgente e' il catetere."),
 (9,"chiaro",0,"Sacca di parenterale finita di notte: glucosata secondo procedura per evitare l'ipoglicemia da rimbalzo, glicemia, medico. Non si lascia la via vuota."),

 (10,"chiaro",0,"Paziente con BPCO sonnolento in ossigeno ad alto flusso, con CO2 alta: acidosi respiratoria. Medico, e rivalutazione dell'ossigeno con target ottantotto-novantadue."),
 (10,"chiaro",0,"Dolore lombare e ipotensione dopo dieci minuti di trasfusione: reazione emolitica. La sequenza, tutta, a partire da fermare."),
 (10,"chiaro",0,"Potassio alto in un prelievo difficoltoso: possibile emolisi, medico e ripetizione. Anziano cardiopatico in mantenimento da giorni, dispnoico: sovraccarico, ridurre l'infusione, medico."),

 (11,"chiaro",2.0,"L'autovalutazione. Due domande alla volta, risposta secca. Uno: qual e' la prima provetta dell'ordine di prelievo? Due: il Midline e' un accesso centrale?"),
 (11,"chiaro",0,"Uno: le emocolture, per prime, per non contaminarle. Due: no, il Midline e' periferico: la punta resta in una vena del braccio, e per questo non riceve cio' che richiede la via centrale."),
 (11,"chiaro",2.0,"Tre: qual e' il donatore universale di plasma? Quattro: le piastrine si conservano in frigorifero?"),
 (11,"chiaro",0,"Tre: AB, perche' il plasma AB non ha anticorpi anti-A ne' anti-B. Quattro: mai: a venti-ventiquattro gradi, in agitazione continua."),
 (11,"chiaro",2.0,"Cinque: pH basso e CO2 alta, disturbo respiratorio o metabolico? Sei: con il sangue, quale soluzione va in linea?"),
 (11,"chiaro",0,"Cinque: respiratorio, perche' pH e CO2 vanno in direzione opposta: ROME, respiratorio opposto. Sei: solo fisiologica."),
 (11,"chiaro",2.0,"Sette: cannula con VIP due, che cosa fai? Otto: sopra novecento milliosmoli per litro, quale via?"),
 (11,"chiaro",0,"Sette: si rimuove, e non si riposiziona se non serve. Otto: via centrale, perche' solo un vaso di grosso calibro tollera quella osmolarita'. Otto su otto e' il livello atteso: ogni errore ti dice quale lezione riguardare."),

 (12,"chiaro",0,"E i fili con gli altri moduli, utili all'orale per mostrare una visione d'insieme. Il bundle CLABSI si collega al modulo quattro. Il potassio, le compatibilita' e i calcoli al modulo cinque."),
 (12,"chiaro",0,"La sindrome da rialimentazione alla lezione tre punto quattro. L'identificazione e il doppio controllo al modulo due. Un modulo che si tiene con gli altri vale di piu' di uno isolato."),

 (13,"chiaro",0,"Gli agganci veneti. Team accessi vascolari con PICC e Midline a gestione infermieristica. Servizi trasfusionali e coordinamento regionale."),
 (13,"chiaro",0,"Procedure su sicurezza trasfusionale, preanalitica e valori critici, e in alcune realta' l'identificazione elettronica al letto. Nutrizione artificiale domiciliare con presa in carico distrettuale."),

 (14,"chiaro",0,"Come proseguire. Test del modulo, trenta domande, soglia ventuno. Rifai gli esercizi di emogasanalisi della lezione sei punto quattro finche' la lettura non diventa automatica: prima il pH, poi la CO2, poi il bicarbonato."),
 (14,"chiaro",0,"Nel quaderno: numeri, sequenze, ordine delle provette. E scrivi per intero il caso della reazione trasfusionale con lo schema in cinque passi: e' una traccia molto probabile."),
 (14,"chiaro",0,"Lo schema e' quello di tutti i casi: che cosa pensi, che cosa fai subito, chi avvisi, che cosa sorvegli, che cosa documenti."),

 (15,"profondo",1.2,"[serious] La frase del modulo: ogni accesso vascolare e' una porta aperta. Si apre con l'asepsi, si sorveglia ogni giorno, si chiude appena possibile."),

 (16,"chiaro",0,"Nel prossimo modulo passiamo dall'interno all'esterno del corpo: lesioni, medicazioni, stomie e drenaggi."),
 (16,"chiaro",0,"[warm] E' un'area in cui l'infermiere ha un'autonomia molto ampia, e i concorsi lo sanno. Modulo sette: wound care, stomie e drenaggi. Ci vediamo li'."),
]

CAPITOLI = {1:"Apertura",2:"La mappa",3:"Cio' che hanno in comune",4:"Periferico e centrale",5:"I numeri del modulo",
 6:"Le sequenze",7:"Le confusioni, prima parte",8:"Le confusioni, seconda parte",9:"I casi, prima parte",10:"I casi, seconda parte",
 11:"L'autovalutazione",12:"Il filo con gli altri moduli",13:"In Veneto",14:"Come proseguire",15:"La frase del modulo",16:"Chiusura"}

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
