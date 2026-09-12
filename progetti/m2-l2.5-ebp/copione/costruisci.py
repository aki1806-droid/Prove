# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questa lezione ha un doppio interesse. Il primo e' metodologico: sapere da dove viene cio' che facciamo. Il secondo e' giuridico, ed e' il motivo per cui pesa nel concorso piu' di quanto il titolo lasci pensare."),
 (1,"chiaro",0,"Dopo la Gelli Bianco le linee guida non sono piu' solo uno strumento professionale, ma un parametro di valutazione della condotta professionale. Sono entrate nel processo, e da li' non sono piu' uscite."),
 (1,"tenue",0,"Chi confonde una linea guida con una procedura aziendale sbaglia due domande: una di metodo e una di diritto. E' una confusione che costa doppio, ed e' anche la piu' facile da evitare: bastano tre frasi."),

 (2,"chiaro",0,"Definizione, da citare per intero. L'Evidence Based Practice e' l'integrazione fra le migliori evidenze scientifiche disponibili, l'esperienza e la competenza clinica del professionista."),
 (2,"chiaro",0,"E i valori, le preferenze e il contesto della persona assistita. Tre elementi, non uno. Sono tre, e vanno detti tutti e tre: l'evidenza da sola non e' pratica basata sulle prove, e' solo letteratura."),
 (2,"profondo",1.2,"Il distrattore classico presenta l'EBP come pratica fondata esclusivamente sui risultati della ricerca. E' errato proprio perche' ne omette due su tre, e sono i due che riguardano le persone: chi cura e chi e' curato."),

 (3,"chiaro",0,"E non e' una moda importata. Il DM 739 del 1994 prevede che l'infermiere concorra direttamente all'aggiornamento del proprio profilo professionale e alla ricerca. E' scritto nel profilo, non in una circolare."),
 (3,"chiaro",0,"E il Codice deontologico impone di fondare il proprio operato su conoscenze validate. L'EBP e' la traduzione operativa di due norme che gia' conosci dal modulo 1."),

 (4,"chiaro",0,"Cinque passi, cinque A. Ask: formulare il quesito. Acquire: cercare le evidenze. Appraise: valutarle criticamente, perche' trovare uno studio non vuol dire ancora niente."),
 (4,"chiaro",0,"Apply: applicarle integrandole con l'esperienza clinica e con le preferenze della persona. E Assess: valutare l'esito di quello che si e' fatto."),
 (4,"chiaro",0,"Nota la simmetria con il processo di assistenza della lezione 2.1: anche qui si chiude con la valutazione, ed e' anche qui il passo che si dimentica."),

 (5,"chiaro",0,"Il quesito si scrive con PICO. P, la popolazione o il problema: chi. I, l'intervento. C, il confronto con un'alternativa, e puo' mancare. O, l'outcome, cioe' l'esito che si vuole misurare."),
 (5,"chiaro",0,"Un esempio: nei pazienti anziani allettati, l'uso di materassi a pressione alternata rispetto ai materassi in schiuma viscoelastica riduce l'incidenza di lesioni da pressione? Ci sono tutte e quattro le lettere."),
 (5,"chiaro",0,"Esistono varianti che aggiungono T per il tempo o S per il disegno di studio: PICOT, PICOS. Ma la forma base e' quella a quattro lettere, ed e' quella che viene chiesta."),

 (6,"chiaro",0,"Dove si cerca. PubMed per la letteratura biomedica. CINAHL, specifica per l'area infermieristica. La Cochrane Library, che raccoglie le revisioni sistematiche ed e' il primo posto dove guardare."),
 (6,"chiaro",0,"Il Joanna Briggs Institute, orientato alla pratica infermieristica. E il Sistema Nazionale Linee Guida dell'Istituto Superiore di Sanita', per le linee guida italiane: fra poco vedremo perche' e' quello che conta in giudizio."),

 (7,"chiaro",0,"La piramide. Al vertice revisioni sistematiche e metanalisi di studi randomizzati. Poi lo studio randomizzato controllato, l'RCT, in cui la randomizzazione distribuisce a caso i fattori di confondimento."),
 (7,"chiaro",0,"Poi lo studio di coorte, prospettico, che segue nel tempo esposti e non esposti. Poi il caso controllo, retrospettivo, che parte dall'esito e risale all'esposizione."),
 (7,"chiaro",0,"Poi studi trasversali e serie di casi. Alla base, caso singolo e opinione di esperti. Sei livelli, e la domanda chiede quasi sempre il vertice. Ma il vertice non e' tutta la storia."),

 (8,"chiaro",0,"Due precisazioni che all'orale distinguono subito. Prima: il livello riguarda il disegno, non la qualita' della singola ricerca. Un RCT mal condotto vale meno di uno studio di coorte eccellente."),
 (8,"chiaro",0,"Seconda: per molte domande infermieristiche, il vissuto della persona, il significato dell'esperienza, il disegno piu' appropriato e' qualitativo."),
 (8,"profondo",1.2,"E il qualitativo nella gerarchia classica sta in basso, pur essendo per quel quesito il migliore. I sistemi moderni come GRADE valutano infatti la qualita' complessiva delle prove, non solo il disegno."),

 (9,"chiaro",0,"Passiamo agli strumenti, e alle definizioni che i quiz mescolano. Linea guida: raccomandazioni elaborate sistematicamente sulla base delle evidenze."),
 (9,"chiaro",0,"Protocollo: sequenza rigida e predefinita di comportamenti, da seguire cosi' com'e'. Procedura: descrizione delle fasi di un processo, con responsabilita' e modalita'."),
 (9,"chiaro",0,"Istruzione operativa: dettaglio di una singola attivita' tecnica. Check list: elenco di controlli in sequenza. E il PDTA: il percorso diagnostico terapeutico assistenziale, che tiene insieme tutti gli altri."),

 (10,"chiaro",0,"Riducile a tre frasi. La linea guida dice che cosa e' raccomandato fare, in generale, in base alle evidenze. Non dice come, e non dice chi."),
 (10,"chiaro",0,"La procedura aziendale dice come si fa qui, con quali responsabilita' e risorse. Il PDTA dice chi fa che cosa lungo il percorso, dall'accesso alla dimissione al territorio."),
 (10,"profondo",1.2,"La prima e' di fonte scientifica; le altre due di fonte organizzativa. E' questa la distinzione che i quiz cercano, non la definizione a memoria."),

 (11,"chiaro",0,"La Gelli Bianco ha dato alle linee guida rilevanza giuridica. L'articolo 5 prevede che gli esercenti le professioni sanitarie si attengano, salve le specificita' del caso concreto, alle raccomandazioni."),
 (11,"chiaro",0,"Raccomandazioni previste da linee guida elaborate da enti, istituzioni e societa' scientifiche iscritte in apposito elenco, e pubblicate nel Sistema Nazionale Linee Guida presso l'Istituto Superiore di Sanita'."),
 (11,"chiaro",0,"In mancanza, ci si attiene alle buone pratiche clinico assistenziali. Sono due gradini, in quest'ordine: prima le linee guida accreditate, poi le buone pratiche."),

 (12,"chiaro",0,"E qui si chiude il cerchio con la lezione 1.5. Il rispetto delle linee guida accreditate, o in mancanza delle buone pratiche, adeguate alle specificita' del caso concreto, esclude la punibilita'."),
 (12,"chiaro",0,"Ma solo per la sola imperizia, non per negligenza e non per imprudenza. E' una esclusione stretta, e il confine conta. Quindi le linee guida non sono un vincolo burocratico: sono anche una protezione."),
 (12,"chiaro",0,"Una protezione con due condizioni pero': solo se accreditate, e solo se adeguate a quel paziente. Se manca una delle due, la protezione non c'e'."),

 (13,"chiaro",0,"Da cui un principio operativo importante. Discostarsi da una linea guida e' legittimo, quando le specificita' del caso lo richiedono."),
 (13,"chiaro",0,"Cio' che non e' legittimo e' discostarsene senza motivo e senza documentarlo. Sono due cose molto diverse, e la differenza sta tutta in cartella: e' la documentazione della lezione precedente a fare da ponte."),
 (13,"profondo",1.2,"Nei casi d'esame la risposta corretta non e' mai applico la linea guida comunque: e' applico la raccomandazione valutandone l'adeguatezza a questa persona, e se me ne discosto lo motivo."),

 (14,"chiaro",0,"Fra l'evidenza e il letto del paziente c'e' uno scarto noto. Gli ostacoli individuali: poca familiarita' con la ricerca, la barriera della lingua, la mancanza di tempo e l'abitudine, che e' il piu' forte dei quattro."),
 (14,"chiaro",0,"Organizzativi: risorse, accesso alle banche dati, cultura poco orientata al cambiamento. E legati all'evidenza stessa: risultati contrastanti, scarsa trasferibilita', popolazioni diverse."),

 (15,"chiaro",0,"E le leve che funzionano. Audit clinico e feedback, cioe' misurare e far vedere il risultato. Formazione sul campo, non in aula. Facilitatori, o champion, di reparto."),
 (15,"chiaro",0,"E soprattutto l'integrazione della raccomandazione dentro la procedura e dentro la cartella elettronica. E' il metodo piu' efficace, e vale la pena capire perche'."),
 (15,"profondo",1.2,"Perche' rende la buona pratica il percorso piu' semplice da seguire. E la strada piu' facile e' quella che le persone prendono."),

 (16,"chiaro",0,"In Veneto la catena ha nomi precisi, ed e' quella che conviene enunciare all'orale. Si parte dall'evidenza. Poi la linea guida del Sistema Nazionale Linee Guida. Poi l'indirizzo regionale o il PDTA."),
 (16,"chiaro",0,"Spesso elaborati dentro le reti cliniche: oncologica, stroke, trauma. Poi procedura aziendale. E infine pratica al letto."),
 (16,"chiaro",0,"Cinque anelli. Saperla dire in quest'ordine dimostra che hai capito come le evidenze arrivano davvero in reparto, e non solo che cos'e' una linea guida."),

 (17,"chiaro",0,"I sette punti. L'EBP ha tre pilastri. I cinque passi sono ask, acquire, appraise, apply, assess. Il quesito si scrive con PICO, quattro lettere."),
 (17,"chiaro",0,"Al vertice della gerarchia stanno revisioni sistematiche e metanalisi. Linea guida, procedura e PDTA sono cose diverse: la prima e' scientifica, le altre organizzative."),
 (17,"chiaro",0,"[warm] Rilevano le linee guida accreditate nel SNLG presso l'ISS, in mancanza le buone pratiche. E discostarsi e' legittimo, purche' motivato e documentato. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"I tre pilastri",3:"Il fondamento professionale",
 4:"I cinque passi",5:"Il quesito PICO",6:"Dove si cerca",7:"La gerarchia delle evidenze",
 8:"Gerarchia non e' automatismo",9:"Gli strumenti operativi",10:"La differenza che vale la domanda",
 11:"Le linee guida dopo la 24/2017",12:"Il collegamento con il 590-sexies",
 13:"Discostarsi si puo'",14:"Gli ostacoli",15:"Le leve",16:"In Veneto",17:"Chiusura"}
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
