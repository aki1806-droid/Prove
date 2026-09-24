# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] La malnutrizione ospedaliera e' un problema enorme e sottostimato: allunga la degenza, rallenta la guarigione delle ferite, aumenta le infezioni e la mortalita'."),
 (1,"chiaro",0,"E per l'infermiere e' materia di competenza diretta: lo screening, la sorveglianza di quanto la persona mangia davvero e la sicurezza della somministrazione sono responsabilita' sue, e compaiono nei quiz come tali."),
 (1,"chiaro",0,"Dentro questa lezione c'e' poi un tema che vale da solo molte domande d'esame: la disfagia. Ci arriviamo a meta' strada, e ci restiamo fino alla fine, perche' e' li' che si gioca la sicurezza del paziente."),

 (2,"chiaro",0,"I numeri di riferimento nell'adulto. Energia: circa venticinque-trenta chilocalorie per chilo al giorno. Proteine: zero virgola otto-un grammo per chilo in condizioni basali."),
 (2,"chiaro",0,"Ma uno virgola due-uno virgola cinque grammi per chilo nell'anziano, nel malnutrito, in chi ha lesioni da pressione o e' nel post-operatorio: il fabbisogno sale proprio quando l'appetito scende."),
 (2,"chiaro",0,"Liquidi: circa trenta millilitri per chilo, cioe' un litro e mezzo-due nell'adulto medio. Fibre: venticinque-trenta grammi, sempre con acqua adeguata, altrimenti peggiorano la stipsi invece di risolverla."),

 (3,"chiaro",0,"Un principio che vale una domanda. Ogni grado sopra i trentasette aumenta il metabolismo basale di circa il dieci-tredici per cento, e comporta perdite idriche aggiuntive di alcune centinaia di millilitri al giorno."),
 (3,"chiaro",0,"Conseguenza assistenziale controintuitiva: il paziente febbrile ha bisogno di piu' calorie e piu' liquidi, proprio mentre mangia di meno. Chi risponde meno, per non affaticarlo, sbaglia."),

 (4,"chiaro",0,"Il BMI: peso in chili diviso l'altezza in metri al quadrato. Sotto diciotto e mezzo sottopeso. Da diciotto e mezzo a ventiquattro e nove normopeso. Da venticinque a ventinove e nove sovrappeso."),
 (4,"chiaro",0,"Da trenta obesita', di primo grado fino a trentaquattro e nove, di secondo fino a trentanove e nove, di terzo da quaranta in su. Sei classi, e le soglie sono quelle che i quiz chiedono."),
 (4,"chiaro",0,"Una nota utile: nell'anziano molte linee guida alzano la soglia inferiore di normalita' a circa ventidue, perche' un BMI basso in eta' avanzata e' associato a esiti peggiori."),

 (5,"chiaro",0,"Tre strumenti di screening. Il MUST, per l'adulto in tutti i setting, considera BMI, calo ponderale non intenzionale ed effetto della malattia acuta sull'assunzione di cibo: da due in su e' rischio alto."),
 (5,"chiaro",0,"L'MNA e' specifico per l'anziano, e qui il punteggio basso indica lo stato peggiore: attenzione al verso, perche' e' l'opposto del MUST. L'NRS-2002 e' pensato per l'ospedalizzato."),
 (5,"chiaro",0,"Combina stato nutrizionale, gravita' della malattia ed eta': da tre in su si interviene. E vale la regola della lezione due punto tre: il punteggio serve solo se cambia il piano."),

 (6,"chiaro",0,"Un limite da conoscere sugli esami. L'albumina viene spesso usata come indice nutrizionale, ma e' anche un indice di infiammazione: in fase acuta scende indipendentemente dallo stato nutrizionale."),
 (6,"chiaro",0,"Lo stesso vale per il peso nel paziente edematoso o disidratato: misura l'acqua, non il muscolo. Il dato piu' semplice e piu' informativo resta il calo ponderale non intenzionale nel tempo: la bilancia, ogni settimana."),

 (7,"chiaro",0,"Tre condizioni da non confondere. La malnutrizione per difetto e' uno squilibrio fra apporti e fabbisogni, ed e' reversibile con un apporto adeguato."),
 (7,"chiaro",0,"La sarcopenia e' perdita di massa e forza muscolare, e si valuta anche con la forza di presa e la velocita' del cammino, non solo con la massa: un muscolo puo' esserci e non funzionare."),
 (7,"chiaro",0,"La cachessia e' deperimento in corso di malattia cronica con infiammazione: neoplasia, scompenso, BPCO. La caratteristica decisiva: non si corregge con la sola nutrizione, c'e' una componente catabolica che il cibo non batte."),

 (8,"chiaro",0,"E il concetto che vale una risposta all'orale: un paziente obeso puo' essere malnutrito. La malnutrizione non e' sinonimo di magrezza: e' uno squilibrio fra apporti e fabbisogni, e convive con un BMI elevato."),
 (8,"profondo",1.2,"[serious] Si parla di obesita' sarcopenica, ed e' particolarmente insidiosa perche' non si vede. Dirlo mostra che hai capito il concetto, e non solo memorizzato le soglie del BMI."),

 (9,"chiaro",0,"Sei conseguenze, e nota come richiamino tutto cio' che abbiamo gia' studiato. Guarigione delle ferite rallentata: mancano proteine, zinco, vitamina C, calorie per sintetizzare il collagene."),
 (9,"chiaro",0,"Lesioni da pressione: la nutrizione e' uno dei sei item della scala di Braden. Infezioni, per compromissione dell'immunita'. Sarcopenia e cadute, che abbiamo appena visto."),
 (9,"chiaro",0,"Degenza e mortalita' aumentate. E risposta ai farmaci: l'ipoalbuminemia modifica la quota libera dei farmaci ad alto legame proteico, e lo vedremo nel modulo cinque. Sei conseguenze, sei motivi per pesare la persona."),

 (10,"chiaro",0,"Arriviamo al tema piu' importante della lezione. La disfagia e' la difficolta' a deglutire, e la sua complicanza temuta e' la polmonite ab ingestis: una polmonite che nasce da un pasto, o da un sorso d'acqua."),
 (10,"chiaro",0,"Si distingue in orofaringea, con difficolta' a iniziare la deglutizione: ictus, Parkinson, demenza, SLA, neoplasie testa-collo. Ed esofagea, con difficolta' di transito dopo l'inizio: stenosi, neoplasie, acalasia."),

 (11,"chiaro",0,"I segni. Tosse o schiarimento della voce durante o dopo la deglutizione. Voce umida o gorgogliante dopo aver bevuto: e' il segno piu' suggestivo di ristagno, ricordatelo."),
 (11,"chiaro",0,"Deglutizioni multiple per un solo boccone, pasto molto lungo. Fuoriuscita di cibo o ristagno di residui in bocca. Rifiuto dei liquidi, che spesso e' una difesa istintiva."),
 (11,"chiaro",0,"E i segni indiretti: calo ponderale, disidratazione, polmoniti ricorrenti senza altra spiegazione. Chi ha polmoniti che tornano va guardato mentre beve, non solo mentre respira."),

 (12,"chiaro",0,"E ora il punto che i quiz usano come distrattore. Una quota rilevante delle inalazioni avviene senza tosse e senza alcun segno evidente: si chiama aspirazione silente, e nessuno se ne accorge finche' non compare la febbre."),
 (12,"profondo",1.2,"[serious] Quindi il ragionamento non tossisce, quindi deglutisce bene e' falso. Se ricordi una cosa sola di questo video, ricorda questa."),

 (13,"chiaro",0,"La regola di sicurezza. Nulla per bocca, nemmeno l'acqua, nemmeno i farmaci, prima di aver verificato che la deglutizione sia sicura. E' una regola, non un consiglio, e vale dal primo minuto."),
 (13,"chiaro",0,"Nel paziente con ictus acuto, o con qualunque sospetto, si esegue lo screening della deglutizione prima della prima somministrazione orale. E' una delle risposte piu' sicure che si possano dare in una prova pratica."),

 (14,"chiaro",0,"Lo screening infermieristico piu' diffuso e' il test dell'acqua, in genere a volumi crescenti, osservando tosse, voce umida e desaturazione. Si parte da un cucchiaino, non da un bicchiere."),
 (14,"chiaro",0,"Un test positivo o dubbio comporta sospensione dell'alimentazione orale, segnalazione al medico e attivazione della valutazione logopedica, garantendo idratazione e terapia per altra via."),
 (14,"chiaro",0,"L'approfondimento strumentale, FEES o videofluoroscopia, e' specialistico. E la valutazione va ripetuta, perche' la disfagia puo' migliorare: nessuno va lasciato a dieta modificata piu' del necessario."),

 (15,"chiaro",0,"Le consistenze, e qui c'e' un'inversione controintuitiva. Nella disfagia orofaringea i liquidi fluidi sono i piu' pericolosi, non i solidi, perche' scorrono rapidamente e sfuggono al controllo."),
 (15,"chiaro",0,"Per questo si addensano. I solidi si modificano secondo indicazione: tritati, frullati, omogeneizzati, a seconda del livello prescritto. La consistenza e' una prescrizione, non un gusto."),
 (15,"tenue",0,"E vanno evitate le doppie consistenze: la minestrina con la pastina, i biscotti nel latte. Sono le piu' insidiose, perche' il liquido corre mentre il solido resta indietro."),

 (16,"chiaro",0,"Le strategie. Seduto a novanta gradi, capo leggermente flesso in avanti, il chin tuck, mai reclinato all'indietro. Ambiente silenzioso, niente distrazioni, non parlare mentre la persona ha il boccone in bocca."),
 (16,"chiaro",0,"Boccone piccolo, deglutire due volte, verificare che la bocca sia vuota prima del boccone successivo. Il ritmo lo da' chi mangia, non chi imbocca."),
 (16,"chiaro",0,"Dopo il pasto: seduto almeno trenta minuti, e igiene del cavo orale. Due gesti che sembrano di contorno e sono invece la parte che previene la polmonite."),

 (17,"chiaro",0,"E il collegamento che, detto all'orale, mostra comprensione reale. L'igiene del cavo orale nel disfagico non e' comfort: e' prevenzione della polmonite, e va fatta dopo ogni pasto."),
 (17,"chiaro",0,"I residui alimentari colonizzati vengono inalati durante il sonno. E' lo stesso meccanismo della VAP che abbiamo visto nella lezione tre punto uno. Due lezioni diverse, una sola fisiopatologia."),

 (18,"chiaro",0,"Due avvertenze pratiche. I farmaci: verificare se possono essere frantumati o aperti. Molte forme a rilascio modificato e gastroresistenti non possono, come dice la Raccomandazione numero diciannove."),
 (18,"chiaro",0,"Se non si puo', si chiede una formulazione alternativa, non si tritura lo stesso. E la tazza con beccuccio: sembra un aiuto, ma induce iperestensione del capo e aumenta il rischio. Nella disfagia va evitata."),

 (19,"chiaro",0,"Chiudo con l'anziano che non mangia. Prima di dire che e' inappetente, escludi: la bocca, con lesioni, candidosi, protesi incongrue; i farmaci, con nausea, gusto alterato, secchezza; il dolore non controllato."),
 (19,"chiaro",0,"[warm] La stipsi e il fecaloma; depressione e delirium; la disfagia; e l'organizzazione: orari incongrui, cibo freddo, nessuno che aiuti. Sette cause valgono piu' di un integratore. Prossima lezione: la nutrizione enterale."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"I fabbisogni",3:"Il principio della febbre",4:"Il BMI",
 5:"Gli strumenti di screening",6:"Attenzione all'albumina",7:"Malnutrizione, sarcopenia, cachessia",
 8:"Un obeso puo' essere malnutrito",9:"Sei conseguenze",10:"La disfagia",11:"I segni",
 12:"L'aspirazione silente",13:"Nulla per bocca",14:"Lo screening",15:"Le consistenze",
 16:"Le strategie",17:"Il collegamento",18:"Farmaci e beccuccio",19:"L'anziano che non mangia"}
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
