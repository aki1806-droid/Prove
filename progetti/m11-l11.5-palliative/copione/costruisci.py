# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Ci sono momenti in cui non e' piu' possibile guarire. Ma e' sempre possibile curare. Le cure palliative si occupano di questo."),
 (1,"chiaro",0,"Della qualita' della vita, del controllo dei sintomi, della dignita', dell'accompagnamento della persona e della famiglia. Non della malattia soltanto, ma della persona intera."),
 (1,"chiaro",0,"E' uno degli ambiti in cui l'assistenza infermieristica esprime di piu' il suo senso. E uno di quelli in cui i concorsi chiedono di distinguere concetti che spesso vengono confusi."),

 (2,"chiaro",0,"Le cure palliative sono cure attive e globali per la persona con una malattia inguaribile che progredisce. L'obiettivo e' la qualita' della vita, della persona e della famiglia."),
 (2,"chiaro",0,"Si occupano del dolore e degli altri sintomi, ma anche degli aspetti psicologici, sociali e spirituali. Non accelerano ne' ritardano la morte."),
 (2,"chiaro",0,"Non riguardano solo l'oncologia: anche lo scompenso, la BPCO, le demenze, le malattie neurologiche. E non solo gli ultimi giorni: le cure palliative precoci, della lezione otto punto sette, si affiancano alle terapie."),

 (3,"chiaro",0,"La legge trentotto del duemiladieci, che conosci dalla lezione tre punto sette. Garantisce il diritto di accesso alle cure palliative e alla terapia del dolore, organizzate in due reti distinte."),
 (3,"chiaro",0,"I nodi della rete palliativa: l'hospice, una struttura residenziale dedicata. Le cure palliative domiciliari, con equipe specializzate. Gli ambulatori. La consulenza in ospedale."),
 (3,"chiaro",0,"La legge ha anche reso obbligatoria la rilevazione del dolore in cartella, e ha semplificato la prescrizione degli oppioidi."),

 (4,"chiaro",0,"Il controllo dei sintomi. Il dolore, con la scala OMS e gli oppioidi. La dispnea, molto angosciante: posizione seduta e aria fresca sul volto. Anche un piccolo ventilatore riduce la fame d'aria."),
 (4,"chiaro",0,"Poi oppioidi a basse dosi, e ossigeno solo se davvero utile. Nausea e vomito. La stipsi, da prevenire sempre con gli oppioidi. Il delirium terminale."),
 (4,"chiaro",0,"La secchezza del cavo orale, frequentissima, che si cura con igiene e umidificazione frequenti. E l'ansia. Ogni sintomo controllato e' un pezzo di qualita' della vita restituito."),

 (5,"chiaro",0,"Le secrezioni terminali, il cosiddetto rantolo: un rumore dovuto a secrezioni che la persona, ormai debolissima, non riesce piu' a eliminare."),
 (5,"chiaro",0,"E' spesso piu' angosciante per i familiari che per la persona, che di solito e' incosciente. Si interviene con la posizione laterale, e con farmaci antisecretivi secondo prescrizione."),
 (5,"chiaro",0,"L'aspirazione profonda di routine non e' raccomandata: e' traumatica e poco efficace. E soprattutto si spiega ai familiari che cosa sta succedendo."),

 (6,"chiaro",0,"La sedazione palliativa. E' la riduzione intenzionale della coscienza con farmaci, per esempio il midazolam, per controllare sintomi refrattari, cioe' non controllabili in altro modo."),
 (6,"chiaro",0,"Una dispnea terminale, un delirium agitato, un dolore insopportabile. I farmaci si titolano: si dosano in proporzione al sintomo, quanto basta per controllarlo."),
 (6,"chiaro",0,"Richiede il consenso della persona, o il rispetto delle sue DAT o della pianificazione condivisa. E' una decisione dell'equipe, e si documenta."),
 (6,"chiaro",0,"La legge duecentodiciannove del duemiladiciassette, all'articolo due, prevede la sedazione palliativa profonda continua, associata alla terapia del dolore, con il consenso del paziente."),

 (7,"chiaro",0,"La distinzione che i concorsi chiedono, fra sedazione palliativa ed eutanasia, si fa con tre criteri."),
 (7,"profondo",1.2,"[serious] Intenzione, mezzi, esito."),
 (7,"chiaro",0,"L'intenzione: alleviare una sofferenza refrattaria, o causare la morte. I mezzi: farmaci titolati sul sintomo, o una dose letale. L'esito: la morte arriva per la malattia, o e' causata dal farmaco."),
 (7,"chiaro",0,"In Italia la sedazione palliativa e' lecita; l'eutanasia attiva non e' consentita. Sul suicidio assistito c'e' la sentenza duecentoquarantadue del duemiladiciannove della Corte costituzionale, e un dibattito aperto."),

 (8,"chiaro",0,"La nutrizione e l'idratazione a fine vita. Per la legge duecentodiciannove, quelle artificiali sono trattamenti sanitari: la persona puo' rifiutarle o chiederne l'interruzione."),
 (8,"chiaro",0,"Negli ultimi giorni spesso non migliorano il comfort, e possono causare sovraccarico, edemi e piu' secrezioni. La sete si allevia soprattutto con la cura del cavo orale: piccoli sorsi se possibile, umidificazione, igiene."),
 (8,"chiaro",0,"E le scelte si condividono con la persona e la famiglia. Per i familiari il non dare da mangiare ha spesso un forte significato emotivo, e va accompagnato."),

 (9,"chiaro",0,"I segni della morte imminente. Riduzione progressiva della coscienza. Un respiro irregolare, con pause, il respiro di Cheyne-Stokes, e il rantolo."),
 (9,"chiaro",0,"Marezzatura della cute, cioe' una colorazione a chiazze, ed estremita' fredde. Riduzione della diuresi. Polso debole, ipotensione."),
 (9,"chiaro",0,"Riconoscerli permette di preparare la famiglia, di favorirne la presenza, e di rivedere la terapia: sospendere esami, parametri ripetuti, farmaci che non servono al comfort."),

 (10,"chiaro",0,"L'accompagnamento. E' fatto di presenza e di ascolto. Di rispetto per i valori, le volonta', le credenze culturali e religiose della persona."),
 (10,"chiaro",0,"Di attenzione ai bisogni spirituali, che non coincidono per forza con quelli religiosi. Della presenza dei familiari, anche fuori dagli orari di visita. E di dignita' fino alla fine."),
 (10,"chiaro",0,"Nel fine vita il comfort diventa l'obiettivo assistenziale principale. E ogni intervento si valuta con una domanda: aiuta la persona a stare meglio?"),

 (11,"chiaro",0,"L'accertamento della morte. La constatazione e la certificazione sono atti medici. Con i criteri cardiaci, serve una registrazione ECG continua per almeno venti minuti, che documenti l'assenza di attivita' cardiaca."),
 (11,"chiaro",0,"L'infermiere avvisa tempestivamente il medico, documenta l'ora, e si occupa dei familiari. Sono gesti semplici, ma restano nella memoria di chi resta."),

 (12,"chiaro",0,"La cura della salma, un ultimo atto di rispetto. Avviene dopo la constatazione, con riservatezza. Igiene, posizione supina e allineata, chiusura di occhi e bocca, protesi dentarie in sede se possibile."),
 (12,"chiaro",0,"I dispositivi si rimuovono secondo procedura. Ma non se e' previsto un riscontro diagnostico, o se ci sono rilievi medico-legali: e' una domanda frequente."),
 (12,"chiaro",0,"Poi l'identificazione della salma, e l'inventario degli oggetti personali, da consegnare ai familiari. E il rispetto dei riti e delle volonta' culturali e religiose."),
 (12,"chiaro",0,"E tempo per il saluto dei familiari, prima del trasferimento in camera mortuaria secondo procedura."),

 (13,"chiaro",0,"Il lutto. I familiari si sostengono nel momento della morte e, quando possibile, dopo. Il lutto e' un processo normale; il lutto complicato, intenso e prolungato, va riconosciuto e indirizzato."),
 (13,"chiaro",0,"E anche gli operatori vivono il lutto. Il confronto in equipe, il debriefing dopo le situazioni difficili, la prevenzione del burnout sono parte della cura di chi cura."),

 (14,"chiaro",0,"Il caso. Un paziente oncologico terminale, con una dispnea refrattaria e grande angoscia. Nella pianificazione condivisa aveva espresso la volonta' di non soffrire."),
 (14,"chiaro",0,"L'equipe, con il suo consenso espresso prima, avvia una sedazione palliativa. La figlia chiede: lo state facendo morire? Che cosa rispondi?"),
 (14,"chiaro",0,"Con calma e chiarezza: la sedazione toglie una sofferenza che nessun'altra terapia controllava, i farmaci sono dosati sul sintomo, e la malattia segue il suo corso. Poi presenza, ascolto, e il medico per ogni chiarimento."),

 (15,"chiaro",0,"In Veneto la rete comprende hospice, Nuclei di Cure Palliative domiciliari nelle ULSS e consulenza in ospedale, e una rete pediatrica con un centro regionale. All'orale, cita l'integrazione fra hospice e domicilio."),

 (16,"chiaro",0,"La tabella. Legge trentotto: due reti. Cure palliative precoci. Dispnea: aria fresca e oppioidi. Rantolo: posizione, antisecretivi, niente aspirazione di routine."),
 (16,"chiaro",0,"Sedazione: sintomi refrattari, farmaci titolati, consenso, legge duecentodiciannove. Diversa dall'eutanasia per intenzione, mezzi, esito. ECG di venti minuti. Salma: dispositivi in sede se c'e' riscontro diagnostico."),

 (17,"profondo",1.2,"[warm] Quando non si puo' piu' guarire, si puo' sempre curare."),
 (17,"chiaro",0,"Nella prossima lezione: la cronicita', che riguarda milioni di persone e chiede un modo diverso di organizzare l'assistenza. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Che cosa sono le cure palliative",3:"La legge 38/2010",4:"Il controllo dei sintomi",5:"Le secrezioni terminali",6:"La sedazione palliativa",
 7:"Sedazione palliativa ed eutanasia",8:"Nutrizione e idratazione a fine vita",9:"I segni della morte imminente",10:"L'accompagnamento",11:"L'accertamento della morte",
 12:"La cura della salma",13:"Il lutto",14:"Il caso",15:"In Veneto",16:"La tabella",17:"Chiusura"}

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
