# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il terzo modulo, e qui il metodo diventa clinica. Cominciamo dall'assistenza che nella prova pratica compare piu' spesso di qualunque altra: igiene, mobilizzazione, sicurezza dell'ambiente."),
 (1,"chiaro",0,"Un avvertimento subito: non sottovalutare questo blocco perche' e' di base. Qui si misura se un candidato sa sequenziare un intervento, proteggere la persona e riconoscere un rischio mentre lavora."),

 (2,"chiaro",0,"Prima cosa: l'igiene non e' un'attivita' alberghiera. Assolve quattro funzioni insieme. Preventiva: riduce la carica microbica e previene lesioni da pressione, macerazione e infezioni."),
 (2,"chiaro",0,"Di valutazione: e' il momento privilegiato per ispezionare la cute su tutta la superficie corporea. Relazionale: contatto prolungato e ravvicinato, ed e' quando la persona dice cio' che non dice in visita."),
 (2,"chiaro",0,"Di comfort e dignita': il benessere incide sull'umore, sull'appetito, sulla disponibilita' alla riabilitazione. Quattro funzioni insieme: la risposta che ne cita una sola e' il distrattore."),

 (3,"chiaro",0,"Ed ecco il consiglio che vale il video intero. Se in una prova pratica ti chiedono di descrivere l'igiene a letto, la risposta mediocre elenca i passaggi. La risposta forte dice che cosa valuti mentre la esegui."),
 (3,"profondo",1.2,"[serious] Integrita' cutanea, dolore alla mobilizzazione, tolleranza allo sforzo, autonomia residua, stato cognitivo, dispositivi. L'igiene e' anche un accertamento: tienilo come titolo della lezione."),

 (4,"chiaro",0,"Sei principi da enunciare sempre, prima di qualunque sequenza. Privacy e dignita': paravento, porta chiusa, scoprire solo la parte che si lava. Sicurezza: letto ad altezza di lavoro, freni inseriti, sponda sul lato opposto."),
 (4,"chiaro",0,"Autonomia residua: far fare alla persona tutto cio' che puo' fare da se', anche se ci mette il doppio. Dal pulito allo sporco, con cambio di acqua e panno quando serve."),
 (4,"chiaro",0,"Comfort termico: acqua a temperatura verificata, ambiente senza correnti, persona coperta nelle parti che non stai lavando. Ed ergonomia dell'operatore: la tua schiena e' parte dell'intervento."),

 (5,"chiaro",0,"La sequenza. Preparazione: informare e ottenere il consenso, verificare le condizioni, preparare tutto il materiale prima, igiene delle mani e DPI, regolare altezza del letto e temperatura dell'acqua."),
 (5,"chiaro",0,"Viso e collo, e gli occhi per primi. Poi arti superiori e torace: lavare, risciacquare, asciugare tamponando, non strofinando, con attenzione alle pieghe e al cavo ascellare."),
 (5,"chiaro",0,"Addome: ombelico e pliche, dove l'umidita' ristagna e la cute macera. In ogni zona il gesto e' lo stesso: lavare, risciacquare, asciugare, guardare."),

 (6,"chiaro",0,"Il primo dei tre dettagli che i quiz chiedono. Gli occhi si detergono dall'angolo interno verso l'esterno, e con un lato diverso del panno per ciascun occhio. E nessun sapone."),
 (6,"chiaro",0,"Il motivo e' duplice: non spingere le secrezioni verso il dotto lacrimale, e non trasferire un'infezione da un occhio all'altro. Una direzione e un panno: due dettagli che valgono una risposta."),

 (7,"chiaro",0,"Arti inferiori: cura particolare agli spazi interdigitali, che vanno asciugati bene, e ispezione dei piedi, soprattutto nel diabetico e nel vasculopatico, dove una piccola lesione diventa un problema serio."),
 (7,"chiaro",0,"Dorso: si mobilizza la persona sul fianco, si lava, e si ispeziona il sacro. E' il momento in cui valuti il rischio di lesione da pressione, con gli occhi e con le mani."),
 (7,"chiaro",0,"Genitali e perineo per ultimi, cambiando acqua e panno. E il riordino: biancheria pulita, posizione confortevole, campanello a portata di mano, smaltimento, igiene delle mani, registrazione di quanto eseguito e osservato."),

 (8,"chiaro",0,"Gli altri due dettagli. Nella donna la detersione va dal pube verso l'ano, mai il contrario: si evita di trasportare germi intestinali verso l'uretra, e con essi le infezioni delle vie urinarie."),
 (8,"chiaro",0,"Nell'uomo si retrae il prepuzio, si deterge, e poi, punto cruciale, lo si riposiziona. La mancata riduzione puo' causare parafimosi: edema e compromissione vascolare del glande."),
 (8,"tenue",0,"[thoughtful] E' un errore che si trova davvero nei reparti, e nei quiz vale una risposta. Tre dettagli, quindi: la direzione negli occhi, la direzione nel perineo, il prepuzio riposizionato."),

 (9,"chiaro",0,"Passiamo al cavo orale: la parte piu' trascurata nella pratica e piu' chiesta nei concorsi, perche' ha impatto diretto sulle infezioni. Paziente autonomo: almeno due volte al giorno, verificando che lo faccia davvero."),
 (9,"chiaro",0,"Dipendente cosciente: due o tre volte al giorno, con spazzolino a setole morbide e posizione seduta. Non collaborante o disfagico: ogni quattro-sei ore, capo ruotato di lato, aspirazione pronta e quantita' minime di liquidi."),
 (9,"chiaro",0,"Intubato: ogni due-quattro ore secondo procedura. Quattro frequenze, una logica: piu' la persona dipende da te, piu' spesso la bocca va guardata e pulita."),

 (10,"chiaro",0,"E qui il perche'. La polmonite associata a ventilazione origina in larga parte dalla microaspirazione di secrezioni oro-faringee colonizzate, che ristagnano sopra la cuffia del tubo tracheale."),
 (10,"chiaro",0,"Non arriva dall'esterno: arriva dalla bocca del paziente. Le secrezioni scendono lungo il tubo, superano la cuffia in piccole quantita', e raggiungono i polmoni gia' cariche di batteri."),
 (10,"profondo",1.2,"[serious] Ecco perche' lavare la bocca di un paziente intubato e' un intervento clinico, non un gesto di cortesia. Riduce la carica batterica proprio nel punto da cui la polmonite parte."),

 (11,"chiaro",0,"Il bundle di prevenzione, sei misure che funzionano insieme. Testata sollevata a trenta-quarantacinque gradi, salvo controindicazioni. Igiene del cavo orale secondo protocollo, con clorexidina dove previsto."),
 (11,"chiaro",0,"Aspirazione sub-glottica delle secrezioni, cioe' proprio di quelle che ristagnano sopra la cuffia. Controllo della pressione della cuffia: ne' troppo bassa, che lascia passare, ne' troppo alta, che lede la trachea."),
 (11,"chiaro",0,"Interruzione quotidiana della sedazione, con valutazione dello svezzamento. E profilassi della trombosi venosa profonda e dell'ulcera da stress. Sulla VAP torneremo nel modulo quattro: il primo presidio e' questo."),

 (12,"chiaro",0,"Tre note. Le protesi dentarie si rimuovono, si puliscono separatamente e si conservano in un contenitore identificato: una protesi smarrita e' anche un problema medico-legale ricorrente."),
 (12,"chiaro",0,"Nel paziente oncologico con mucosite e xerostomia: detersioni delicate e frequenti, sostituti salivari, niente collutori alcolici. E nel fine vita l'igiene della bocca e' uno degli interventi di comfort piu' efficaci."),

 (13,"chiaro",0,"L'unita' del paziente e' l'insieme di spazio, arredi e presidi destinati alla singola persona. La sua organizzazione non e' estetica: e' una barriera di sicurezza."),
 (13,"chiaro",0,"Letto: freni sempre inseriti, posizione bassa quando non sei presente. Campanello: a portata di mano, dal lato di autonomia, verificato funzionante. Occhiali, protesi acustiche, dentiere: disponibili e indossati."),
 (13,"chiaro",0,"Calzature chiuse e antiscivolo: le ciabatte aperte sono un classico fattore di caduta. Illuminazione notturna e percorso verso il bagno illuminato. Pavimenti asciutti, percorsi liberi, dispositivi ordinati e mai a terra."),

 (14,"chiaro",0,"La caduta e' l'evento avverso piu' frequente nelle strutture sanitarie, ed e' oggetto della Raccomandazione numero tredici. Le cause sono multifattoriali: la prevenzione efficace e' un pacchetto, non un gesto."),
 (14,"chiaro",0,"Fattori intrinseci: eta', cadute precedenti, deterioramento cognitivo e delirium, deficit visivi e uditivi, ipotensione ortostatica, disturbi dell'andatura, incontinenza con urgenza, e farmaci."),
 (14,"chiaro",0,"Fattori estrinseci: ambiente, calzature, letto, ausili, sorveglianza. Intrinseci ed estrinseci si sommano: per questo un solo intervento, per quanto buono, non basta mai."),

 (15,"chiaro",0,"Due informazioni che valgono da sole una domanda. Il predittore singolo piu' potente e' una caduta precedente: chiederlo all'ingresso e' obbligatorio, ed e' il primo item della scala di Conley."),
 (15,"chiaro",0,"Il fattore piu' modificabile e' la terapia farmacologica: sedativi, ipnotici, antipsicotici, antidepressivi, antipertensivi, diuretici, ipoglicemizzanti. Rivedere i farmaci a rischio e' fra gli interventi con piu' impatto."),
 (15,"chiaro",0,"Gli interventi: valutare all'ingresso e rivalutare a ogni variazione; informare persona e caregiver, chiamare prima di alzarsi, alzarsi in due tempi; curare l'ambiente; sorvegliare nelle ore a rischio."),

 (16,"tenue",0,"E attenzione: mobilizzazione precoce, perche' il decondizionamento aumenta il rischio. Immobilizzare per sicurezza e' controproducente. Poi il caso d'esame: la persona trovata a terra."),
 (16,"chiaro",0,"Non sollevo. Valuto: coscienza, respiro, circolo, dolore, deformita', ferite, parametri. Chiamo aiuto e avviso il medico. Mobilizzo in sicurezza secondo l'esito della valutazione."),
 (16,"chiaro",0,"Sorveglio nelle ore successive, con attenzione al trauma cranico in chi e' anticoagulato. Segnalo con la scheda aziendale. Documento in modo oggettivo, rivaluto il rischio. Chi dice lo rimetto a letto perde la parte che vale."),

 (17,"chiaro",0,"Il tema piu' delicato, e uno dei pochi in cui una risposta tecnicamente plausibile puo' essere giuridicamente sbagliata. La contenzione limita la liberta' personale, tutelata dall'articolo tredici della Costituzione."),
 (17,"chiaro",0,"Sei principi. Eccezionalita': mai di routine, mai organizzativa, mai sostitutiva della sorveglianza o del personale mancante. Prescrizione medica motivata, salvo urgenza indifferibile, da convalidare comunque."),
 (17,"chiaro",0,"Alternative esaurite: delirium e dolore gestiti, ambiente, familiari, sorveglianza. Durata minima con rivalutazione. Sorveglianza e cura: circolo, cute, postura, idratazione, eliminazione. E documentazione completa."),
 (17,"chiaro",0,"[warm] E le sponde, la domanda trabocchetto: non sono contenzione di per se', lo diventano se impediscono di alzarsi contro la volonta'. Nell'agitato che si muove aggravano la caduta. Prossima lezione: la mobilizzazione."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Le quattro funzioni",3:"La risposta che distingue",
 4:"I sei principi",5:"La sequenza, prima parte",6:"Gli occhi",7:"La sequenza, seconda parte",
 8:"Perineo e prepuzio",9:"Il cavo orale",10:"La VAP",11:"Il bundle",12:"Protesi e casi particolari",
 13:"L'unita' del paziente",14:"Le cadute",15:"Prevenire",16:"A terra",17:"Contenzione e sponde"}
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
