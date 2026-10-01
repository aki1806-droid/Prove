# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] In neurologia c'e' una frase che riassume tutto: il tempo e' cervello. Durante un ictus si perdono neuroni a ogni minuto, e il trattamento dipende da quanto rapidamente si riconoscono i sintomi e si attiva il percorso."),
 (1,"chiaro",0,"Questa lezione e' costruita intorno all'ictus, e completa il quadro con la valutazione neurologica, l'ipertensione endocranica e le principali malattie croniche."),

 (2,"chiaro",0,"L'ictus e' di due tipi. Ischemico, circa l'ottanta-ottantacinque per cento: un'arteria cerebrale si occlude. Emorragico, il resto: un vaso si rompe."),
 (2,"chiaro",0,"I sintomi possono essere identici, e solo la TC distingue i due tipi: una distinzione decisiva, perche' il trattamento dell'uno e' dannoso per l'altro."),
 (2,"chiaro",0,"E l'attacco ischemico transitorio, il TIA: un deficit che regredisce completamente. Non e' un falso allarme: e' un segnale ad alto rischio di ictus nei giorni successivi, e richiede una valutazione urgente."),

 (3,"chiaro",0,"Il riconoscimento, con la scala FAST, che riprende la scala di Cincinnati. F, face: si chiede di sorridere e si osserva se il volto e' asimmetrico."),
 (3,"chiaro",0,"A, arms: si chiede di alzare le braccia a occhi chiusi per dieci secondi, e si osserva se un braccio cade. S, speech: si chiede di ripetere una frase, e si osserva se il linguaggio e' impastato o confuso."),
 (3,"chiaro",0,"T, time: si annota l'ora e si attiva subito il percorso. Anche un solo segno alterato basta per sospettare un ictus."),

 (4,"chiaro",0,"Il dato piu' prezioso che l'infermiere puo' raccogliere: l'ora di insorgenza, o meglio l'ultima volta in cui la persona e' stata vista in benessere."),
 (4,"chiaro",0,"Se la persona si sveglia con i sintomi, l'ora di riferimento non e' il risveglio, ma l'ora in cui e' andata a dormire. Da quell'orario dipende se si puo' fare la trombolisi o la trombectomia."),

 (5,"chiaro",0,"Il percorso stroke. Riconoscimento, centodiciotto, trasporto in un ospedale con stroke unit. TC dell'encefalo senza contrasto, urgente, per escludere l'emorragia."),
 (5,"chiaro",0,"Glicemia, sempre: un'ipoglicemia puo' dare sintomi identici a un ictus, e si corregge in un minuto."),
 (5,"chiaro",0,"Poi, nell'ictus ischemico, la trombolisi endovenosa, che scioglie il trombo, entro quattro ore e mezza dall'esordio, e nei casi selezionati la trombectomia meccanica, che lo rimuove con un catetere, di solito entro sei ore."),

 (6,"chiaro",0,"La trombolisi: un farmaco potente, con un rischio di sanguinamento. Prima: pressione sotto centottantacinque su centodieci; si controlla la glicemia, si posizionano gli accessi, si rileva il peso per la dose."),
 (6,"chiaro",0,"E si evitano le procedure invasive non indispensabili, catetere, sondino, intramuscolari, che poi sanguinerebbero."),
 (6,"chiaro",0,"Dopo: valutazioni neurologiche e pressione frequenti, per esempio ogni quindici minuti nelle prime ore, poi a intervalli crescenti secondo protocollo; pressione sotto centottanta su centocinque nelle prime ventiquattro ore."),
 (6,"chiaro",0,"E sorveglianza di sanguinamento, peggioramento neurologico, che puo' indicare un'emorragia cerebrale, e angioedema."),

 (7,"chiaro",0,"L'assistenza nell'ictus, dove l'infermiere fa molta differenza. Screening della deglutizione prima di qualsiasi cosa per bocca, nemmeno l'acqua, nemmeno i farmaci: lo abbiamo visto nella lezione tre punto tre."),
 (7,"chiaro",0,"Posizionamento corretto dell'arto plegico, sostenendo la spalla per prevenire la sublussazione: non si tira mai la persona per il braccio plegico."),
 (7,"chiaro",0,"Prevenzione di polmonite, trombosi, lesioni da pressione, cadute. Mobilizzazione precoce. Comunicazione con la persona afasica: frasi brevi, domande chiuse, tempo per rispondere."),
 (7,"chiaro",0,"Continenza e umore, perche' la depressione dopo l'ictus e' frequente. E' un'assistenza che dura settimane, e ogni giorno conta quanto il primo."),

 (8,"chiaro",0,"La valutazione neurologica. La Glasgow Coma Scale della lezione due punto tre: occhi quattro, verbale cinque, motoria sei, da tre a quindici. Le pupille: dimensione, simmetria, reattivita' alla luce."),
 (8,"chiaro",0,"Un'anisocoria di nuova comparsa, una pupilla piu' dilatata dell'altra, e' un segnale d'allarme: puo' indicare una compressione del cervello. La forza degli arti, i parametri vitali. Nell'ictus anche la scala NIHSS."),

 (9,"chiaro",0,"L'ipertensione endocranica: la pressione dentro il cranio aumenta, per un'emorragia, un trauma, un tumore, un edema. I segni: cefalea che peggiora, vomito improvviso, coscienza alterata, il primo da cogliere, anisocoria."),
 (9,"chiaro",0,"Un segno tardivo, che indica un'erniazione imminente, e' la triade di Cushing: ipertensione con pressione differenziale ampia, bradicardia e respiro irregolare."),
 (9,"chiaro",0,"Pressione alta e polso lento in un paziente neurologico non sono una contraddizione: sono un allarme."),

 (10,"chiaro",0,"L'assistenza. Testata a trenta gradi, per favorire il deflusso venoso dal cranio. Capo in asse, senza flessione o rotazione, che comprimerebbero le vene giugulari."),
 (10,"chiaro",0,"Evitare tutto cio' che aumenta la pressione: Valsalva, sforzi, tosse, quindi anche prevenire la stipsi, aspirazioni non necessarie o prolungate."),
 (10,"chiaro",0,"Mantenere normotermia e normoglicemia, controllare dolore e agitazione. E niente soluzioni ipotoniche, come abbiamo visto nella lezione sei punto tre."),

 (11,"chiaro",0,"La crisi epilettica. Durante la crisi: proteggere dai traumi, allontanando oggetti e sostenendo la testa; non mettere nulla in bocca, non si ingoia la lingua, e' un falso mito; non trattenere i movimenti; cronometrare."),
 (11,"chiaro",0,"Al termine: posizione laterale di sicurezza, ossigeno, aspirazione se necessaria, e la persona resta confusa per un po', nella fase post-critica. Si osservano e si documentano le caratteristiche."),
 (11,"chiaro",0,"E lo stato di male: una crisi che dura oltre cinque minuti, o crisi ripetute senza recupero, e' un'emergenza, che si tratta con una benzodiazepina secondo protocollo."),

 (12,"chiaro",0,"Il morbo di Parkinson: tremore a riposo, rigidita', lentezza dei movimenti, instabilita' posturale. Un punto infermieristico cruciale: la levodopa va somministrata puntualmente, agli orari esatti prescritti."),
 (12,"chiaro",0,"Un ritardo di un'ora puo' bloccare la persona, impedirle di camminare o di deglutire. I pasti ricchi di proteine possono ridurne l'assorbimento. E non si sospende mai bruscamente."),
 (12,"chiaro",0,"I rischi: cadute, disfagia, stipsi, ipotensione ortostatica. E alcuni farmaci comuni, come aloperidolo e metoclopramide, peggiorano i sintomi e vanno evitati: va segnalato se prescritti."),

 (13,"chiaro",0,"Due malattie croniche. La sclerosi multipla: demielinizzante, spesso a ricadute, colpisce giovani adulti, con fatica, disturbi visivi, sensitivi, motori e vescicali; il calore peggiora transitoriamente i sintomi."),
 (13,"chiaro",0,"La SLA: degenerazione progressiva dei motoneuroni, con debolezza, disfagia, che porta alla PEG, e insufficienza respiratoria, che porta alla NIV, mentre la mente resta spesso lucida."),
 (13,"chiaro",0,"Qui la comunicazione aumentativa e la pianificazione condivisa delle cure, prevista dalla legge duecentodiciannove, diventano centrali: la persona decide oggi le cure di domani."),

 (14,"chiaro",0,"Il caso. Ore dieci e trenta: un paziente ricoverato per polmonite non riesce piu' a sollevare il braccio destro e parla in modo confuso. Al giro delle nove era in ordine. Che cosa fai?"),
 (14,"chiaro",0,"FAST positiva: sospetto ictus. Annoti l'ultima volta visto in benessere: le nove. Attivi subito il medico secondo il percorso stroke intraospedaliero."),
 (14,"chiaro",0,"Glicemia, parametri, saturazione, GCS e pupille. Nulla per bocca. Accesso venoso."),
 (14,"profondo",1.2,"[serious] E' un ictus in ospedale, e il tempo conta esattamente come fuori."),

 (15,"chiaro",0,"In Veneto opera una rete per l'ictus con stroke unit, centri hub per la trombectomia e centri spoke, e il percorso preospedaliero del centodiciotto. All'orale, collega FAST, ora e rete: e' la catena che decide l'esito."),

 (16,"chiaro",0,"Le tabelle da fotografare. FAST: volto, braccia, linguaggio, tempo. Trombolisi entro quattro ore e mezza: prima pressione sotto centottantacinque su centodieci e glicemia; dopo sotto centottanta su centocinque."),
 (16,"chiaro",0,"Ipertensione endocranica: testata a trenta, capo in asse. Cushing: ipertensione, bradicardia, respiro irregolare. Crisi: niente in bocca, cronometrare; stato di male oltre cinque minuti. Levodopa puntuale."),

 (17,"chiaro",0,"I fili con gli altri moduli, utili all'orale: la disfagia della lezione tre punto tre, la GCS della due punto tre, le soluzioni ipotoniche della sei punto tre."),
 (17,"chiaro",0,"Gli anticoagulanti e la fibrillazione atriale, prima causa di ictus cardioembolico, delle lezioni cinque punto cinque e otto punto uno, e la legge duecentodiciannove della lezione uno punto sei."),

 (18,"chiaro",0,"[warm] Una frase da portare via: il tempo e' cervello. Riconoscere, annotare l'ora, attivare. Nella prossima lezione: oncologia ed ematologia, con la neutropenia febbrile, un'altra emergenza in cui ogni ora conta. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"I due tipi di ictus",3:"La FAST",4:"L'ora di insorgenza",5:"Il percorso stroke",6:"La trombolisi",
 7:"L'assistenza nell'ictus",8:"La valutazione neurologica",9:"L'ipertensione endocranica",10:"L'assistenza nell'ipertensione endocranica",11:"La crisi epilettica",12:"Il Parkinson",
 13:"Sclerosi multipla e SLA",14:"Il caso",15:"In Veneto",16:"Le tabelle",17:"I fili",18:"Chiusura"}

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
