# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Lezione ad alta densita' procedurale, e per questo produce domande molto precise. La regola che l'attraversa da parte a parte e' una sola: la nutrizione enterale e' una somministrazione."),
 (1,"chiaro",0,"E come tale puo' uccidere se fatta male. Le due complicanze che i concorsi chiedono piu' spesso, inalazione e dislocazione, dipendono quasi sempre da un passaggio saltato."),

 (2,"chiaro",0,"Il principio da cui parte tutto: se l'intestino funziona, si usa l'intestino. La nutrizione enterale e' preferibile alla parenterale perche' e' piu' fisiologica e mantiene il trofismo della mucosa intestinale."),
 (2,"chiaro",0,"Riduce la traslocazione batterica, comporta meno complicanze infettive e metaboliche, e costa meno. La parenterale si usa quando la via enterale e' impraticabile o insufficiente, non prima."),

 (3,"chiaro",0,"Indicazioni: disfagia neurologica, coma, neoplasie del distretto testa-collo o esofagee, malnutrizione con apporto orale insufficiente, paziente critico."),
 (3,"chiaro",0,"Controindicazioni, e sono quelle che contano in un quiz: occlusione intestinale, ileo paralitico, perforazione, ischemia intestinale, peritonite, emorragia digestiva in atto, vomito incoercibile, shock non stabilizzato."),

 (4,"chiaro",0,"Le vie. Il sondino naso-gastrico per necessita' a breve termine, indicativamente fino a quattro-sei settimane. La via naso-digiunale nella gastroparesi e nell'alto rischio di inalazione."),
 (4,"chiaro",0,"La PEG, gastrostomia endoscopica percutanea, oltre le quattro-sei settimane: piu' confortevole, meno complicanze nasali e faringee, e migliore immagine di se'. E la PEJ, o digiunostomia, quando lo stomaco non e' utilizzabile."),

 (5,"chiaro",0,"La differenza che i quiz chiedono. Nello stomaco si puo' somministrare in boli, perche' lo stomaco e' un serbatoio con svuotamento regolato dal piloro."),
 (5,"chiaro",0,"Nel digiuno no: la somministrazione dev'essere continua, a velocita' controllata. Un bolo nel digiuno provoca distensione, crampi, dumping e diarrea. Niente serbatoio, niente boli."),

 (6,"chiaro",0,"Prima della tecnica, il limite. Il posizionamento del sondino e' competenza infermieristica nell'adulto, ma non sempre. Trauma cranio-facciale con sospetta frattura della base cranica: via nasale controindicata."),
 (6,"chiaro",0,"Poi varici esofagee note o sanguinamento in atto; stenosi o chirurgia recente di esofago e stomaco; alterazioni anatomiche del naso. Si informa il medico e si valuta un'altra via: e' una risposta che protegge sempre."),

 (7,"chiaro",0,"La misurazione, con il metodo NEX: punta del naso, lobo dell'orecchio, processo xifoideo. Si segna il punto sul sondino, e quel numero va registrato: sara' il riferimento per riconoscere una dislocazione al turno dopo."),

 (8,"chiaro",0,"Il passaggio critico. Quando la punta arriva in faringe, se la persona e' collaborante si chiede di flettere il capo in avanti e di deglutire. Perche'?"),
 (8,"chiaro",0,"L'iperestensione del capo allinea le vie aeree: e' quello che si fa per intubare. La flessione invece chiude la via aerea e favorisce quella esofagea."),
 (8,"chiaro",0,"E' l'opposto di quello che verrebbe istintivo, ed e' una domanda ricorrente. Stessa logica del chin tuck della lezione scorsa: il capo flesso protegge la via aerea."),

 (9,"chiaro",0,"E quando fermarsi. Tosse insistente, dispnea, cianosi, desaturazione, incapacita' di parlare: si interrompe immediatamente e si ritira il sondino."),
 (9,"profondo",1.2,"[serious] Non si insiste, non si prova ancora un po'. Un sondino che fa tossire e' un sondino nella via sbagliata, e si toglie."),

 (10,"chiaro",0,"La verifica della posizione, e qui c'e' la domanda discriminante dei concorsi recenti. Il metodo di riferimento per la conferma iniziale e' la radiografia, quando indicata."),
 (10,"chiaro",0,"Il metodo di verifica al letto e' la misurazione del pH dell'aspirato: un pH pari o inferiore a cinque virgola cinque e' compatibile con la sede gastrica."),
 (10,"chiaro",0,"E il metodo dell'insufflazione di aria con auscultazione, il whoosh test, non e' affidabile e non va usato come unica verifica: un sondino in via respiratoria puo' produrre lo stesso rumore. Nei quiz e' l'opzione sbagliata."),

 (11,"chiaro",0,"La verifica va fatta prima di ogni somministrazione e a ogni turno nella nutrizione continua, controllando anche la lunghezza esterna rispetto al valore registrato."),
 (11,"chiaro",0,"E un tranello: inibitori di pompa e antagonisti H2 alzano il pH gastrico, riducendo l'affidabilita' del test. In quei casi si integra con altri elementi e, nel dubbio, si chiede la radiografia."),
 (11,"tenue",0,"Nel dubbio non si somministra: stessa logica della prescrizione illeggibile della lezione due punto quattro. Un dubbio sulla posizione vale una radiografia, non un tentativo."),

 (12,"chiaro",0,"Tre modalita'. In boli, con siringa a stantuffo e lentamente: solo gastrica, ma piu' fisiologica e compatibile con la mobilita'. Intermittente per gravita', regolando la velocita', non aprendo tutto."),
 (12,"chiaro",0,"E continua con pompa: obbligatoria nel digiunale, indicata nel paziente critico, nel rischio elevato di inalazione e all'avvio della nutrizione, quando la tolleranza e' ancora da vedere."),

 (13,"chiaro",0,"Le sei regole della somministrazione. Testata a trenta-quarantacinque gradi durante e per almeno trenta-sessanta minuti dopo. Verificare la posizione prima di iniziare. Lavare la sonda prima, dopo e fra i farmaci."),
 (13,"chiaro",0,"Miscela a temperatura ambiente, mai fredda. Rispettare i tempi di appendimento e la pulizia del set. E iniziare gradualmente, aumentando la velocita' secondo tolleranza."),

 (14,"chiaro",0,"I farmaci. Uno: preferire la forma liquida se disponibile. Due: verificare che la forma solida sia frantumabile. Compresse a rilascio modificato, gastroresistenti, sublinguali e capsule molli non si frantumano ne' si aprono."),
 (14,"chiaro",0,"E' la Raccomandazione numero diciannove. Tre: somministrarli uno alla volta, mai miscelati. Quattro: lavare fra l'uno e l'altro. Cinque: mai aggiungerli alla miscela nutrizionale."),
 (14,"chiaro",0,"Sei: valutare le interazioni. Fenitoina e alcuni fluorochinoloni vedono ridotto l'assorbimento con la nutrizione, e la levotiroxina va a digiuno."),

 (15,"chiaro",0,"E la conseguenza. Quando la forma farmaceutica non e' manipolabile, la risposta corretta non e' la trito lo stesso. E' chiedere al medico o al farmacista una formulazione alternativa, e documentarlo."),
 (15,"chiaro",0,"Triturare una compressa a rilascio modificato significa somministrare in un colpo solo una dose pensata per dodici ore. Non e' una scorciatoia: e' un sovradosaggio."),

 (16,"chiaro",0,"Le complicanze. Ab ingestis: prevenuta da testata sollevata, verifica della posizione, velocita' controllata, igiene del cavo orale. Se sospetta, si sospende, si aspira se necessario, si da' ossigeno e si avvisa il medico."),
 (16,"chiaro",0,"Dislocazione: fissaggio corretto, controllo della lunghezza a ogni turno. Occlusione: si previene con i lavaggi, e si tenta con acqua tiepida e movimento alternato di stantuffo. Mai forzare, mai usare mandrini."),
 (16,"chiaro",0,"Diarrea: verificare velocita', temperatura, osmolarita', contaminazione del set, e farmaci. E la lesione da pressione dell'ala nasale: fissaggio senza trazione, rotazione del punto di ancoraggio, ispezione quotidiana."),

 (17,"chiaro",0,"La complicanza che i candidati preparati citano e gli altri no: la sindrome da rialimentazione. Un organismo a lungo digiuno riceve carboidrati, e l'insulina spinge fosforo, potassio e magnesio dentro le cellule."),
 (17,"chiaro",0,"Il crollo del fosforo plasmatico puo' provocare aritmie, insufficienza cardiaca e respiratoria, fino alla morte. La prevenzione: rialimentare lentamente, monitorare gli elettroliti e correggerli prima e durante."),
 (17,"chiaro",0,"Riguarda il malnutrito grave, l'anoressico, l'alcolista, l'oncologico e chi ha avuto un lungo digiuno post-operatorio. Piu' a lungo si e' digiunato, piu' lentamente si riparte."),

 (18,"chiaro",0,"La PEG. Nelle prime ventiquattro-quarantotto ore si segue la procedura aziendale e la medicazione e' sterile. A stomia matura, indicativamente dopo due-tre settimane, la gestione diventa pulita."),
 (18,"chiaro",0,"Acqua e sapone neutro, asciugatura accurata, nessuna medicazione occlusiva se la cute e' integra. Va ruotato il disco esterno e verificato che non sia troppo stretto."),
 (18,"chiaro",0,"Una trazione eccessiva causa il buried bumper, l'incarceramento del disco interno nella parete gastrica. E va registrata la misura di riferimento, cosi' che una variazione sia riconoscibile."),

 (19,"chiaro",0,"Un caso clinico ricorrente: la PEG si sfila accidentalmente. Il punto da sapere e' che la stomia puo' chiudersi in poche ore. Quindi: non tentare reinserimenti con dispositivi diversi, coprire, avvisare subito il medico."),
 (19,"profondo",1.2,"[serious] Aspetto il turno successivo e' la risposta sbagliata. Poche ore: e' il tempo che la stomia ha per chiudersi, e il tempo che hai tu per attivare la sostituzione."),
 (19,"chiaro",0,"E un equivoco da smontare: la PEG non elimina il rischio di inalazione. Non protegge dal reflusso, ne' dall'inalazione di saliva nel disfagico. L'igiene del cavo orale resta essenziale anche in chi non mangia per bocca."),

 (20,"chiaro",0,"Chiudo con un aggancio breve ma di grande peso, gia' visto nella lezione uno punto sei. La legge duecentodiciannove del duemiladiciassette qualifica la nutrizione e l'idratazione artificiale come trattamenti sanitari."),
 (20,"chiaro",0,"Ne consegue che sono soggette a consenso informato, possono essere rifiutate o interrotte dalla persona capace, e possono essere oggetto di disposizioni anticipate di trattamento."),
 (20,"chiaro",0,"[warm] E nella demenza avanzata terminale le evidenze non mostrano un beneficio della nutrizione enterale: torna nel modulo undici, sul fine vita. Prossima lezione: idratazione, bilancio idrico ed elettroliti."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Il principio guida",3:"Indicazioni e controindicazioni",4:"Le vie di accesso",
 5:"Stomaco si', digiuno no",6:"Quando non si procede",7:"Il metodo NEX",8:"Il passaggio faringeo",
 9:"Quando interrompere",10:"La verifica",11:"Verificare sempre",12:"Le modalita'",13:"Le regole di sicurezza",
 14:"I farmaci per sonda",15:"Se non si puo' frantumare",16:"Le complicanze",17:"La sindrome da rialimentazione",
 18:"PEG: la gestione",19:"Se la PEG si sfila",20:"La volonta' della persona"}
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
