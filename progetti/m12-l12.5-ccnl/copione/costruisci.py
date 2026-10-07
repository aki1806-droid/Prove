# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Se vinci il concorso, diventi un dipendente pubblico del Servizio Sanitario Regionale, con diritti e doveri definiti da leggi e da un contratto collettivo nazionale."),
 (1,"chiaro",0,"E' una parte del programma che i candidati spesso trascurano, e che all'orale distingue chi ha capito che cosa significa lavorare in una pubblica amministrazione. Vediamo le fonti, il contratto, gli obblighi."),

 (2,"chiaro",0,"Le fonti. Il decreto legislativo centosessantacinque del duemilauno e' il testo unico sul pubblico impiego."),
 (2,"chiaro",0,"Il rapporto di lavoro dei dipendenti pubblici e' privatizzato: cioe' e' regolato dal codice civile, dalle leggi sul lavoro e, soprattutto, dai contratti collettivi."),
 (2,"chiaro",0,"I contratti nazionali sono negoziati dall'ARAN, l'agenzia che rappresenta le pubbliche amministrazioni, con i sindacati rappresentativi. Poi c'e' la contrattazione integrativa aziendale."),
 (2,"chiaro",0,"L'accesso avviene mediante concorso, come prevede l'articolo novantasette della Costituzione. E il rapporto di lavoro inizia con un periodo di prova."),

 (3,"chiaro",0,"Il contratto collettivo nazionale del Comparto Sanita' si applica a infermieri, ostetriche, tecnici, OSS e personale amministrativo del Servizio Sanitario Nazionale."),
 (3,"chiaro",0,"Due tappe recenti. Il contratto duemiladiciannove duemilaventuno, firmato il due novembre duemilaventidue, che ha introdotto il nuovo sistema di classificazione per aree."),
 (3,"chiaro",0,"E il contratto duemilaventidue duemilaventiquattro, firmato in via definitiva il ventisette ottobre duemilaventicinque. E' in avvio il rinnovo duemilaventicinque duemilaventisette: prima della prova, verifica le novita'."),

 (4,"chiaro",0,"Le aree di classificazione sono cinque: personale di supporto; operatori, dove si colloca l'OSS; assistenti; professionisti della salute e funzionari, dove si colloca l'infermiere; personale di elevata qualificazione."),
 (4,"chiaro",0,"Il contratto duemilaventidue duemilaventiquattro ha introdotto il profilo di assistente infermiere, gia' definito da un accordo Stato-Regioni, in posizione intermedia fra l'area dei professionisti e quella degli operatori."),
 (4,"chiaro",0,"L'infermiere resta il responsabile dell'assistenza generale infermieristica, come stabilisce il suo profilo professionale."),

 (5,"chiaro",0,"Gli incarichi di funzione sono di organizzazione, come il coordinamento di un'unita' operativa, o professionali: il professionista specialista, per esempio con un master in wound care, e il professionista esperto."),
 (5,"chiaro",0,"Gli incarichi si conferiscono con un avviso e una valutazione. Sono a tempo determinato, e sono rinnovabili. Ci sono poi le progressioni economiche all'interno dell'area."),
 (5,"chiaro",0,"Il nuovo contratto ha ampliato l'accesso all'elevata qualificazione: oltre alla laurea magistrale con almeno tre anni di incarico di funzione, anche la triennale o un titolo equipollente con almeno sette anni."),

 (6,"chiaro",0,"L'orario. L'orario ordinario e' di trentasei ore settimanali, che il contratto duemilaventidue duemilaventiquattro consente di articolare anche su quattro giorni, dove l'organizzazione lo permette."),
 (6,"chiaro",0,"Poi il decreto legislativo sessantasei del duemilatre', che vale per tutti i lavoratori e tutela la salute. Il riposo giornaliero: undici ore consecutive ogni ventiquattro."),
 (6,"chiaro",0,"Il riposo settimanale: ventiquattro ore consecutive, di norma cumulate con le undici ore. E una durata media massima di quarantotto ore settimanali, straordinario compreso."),
 (6,"chiaro",0,"Il lavoro notturno comporta una sorveglianza sanitaria. E la pronta disponibilita', cioe' la reperibilita', e' disciplinata dal contratto."),
 (6,"profondo",1.2,"[serious] Il riposo non e' un privilegio: e' sicurezza del paziente."),

 (7,"chiaro",0,"Ferie e permessi. Le ferie sono di ventotto giorni lavorativi con l'orario su cinque giorni, trentadue su sei giorni, piu' quattro giornate di festivita' soppresse."),
 (7,"chiaro",0,"Sono un diritto irrinunciabile, e di norma non si possono monetizzare. Il contratto duemilaventidue duemilaventiquattro ne ha introdotto la fruizione anche a ore."),
 (7,"chiaro",0,"I permessi: per motivi personali o familiari, per matrimonio, per lutto. I permessi della legge centoquattro, per l'assistenza a familiari con disabilita' grave."),
 (7,"chiaro",0,"I congedi parentali del decreto legislativo centocinquantuno del duemilauno. E il nuovo contratto ha esteso diverse tutele su permessi, assenze e congedi."),

 (8,"chiaro",0,"Il codice di comportamento dei dipendenti pubblici e' il DPR sessantadue del duemilatredici, aggiornato dal DPR ottantuno del duemilaventitre'."),
 (8,"chiaro",0,"L'aggiornamento ha aggiunto regole sull'uso delle tecnologie e dei social media: non si diffondono informazioni riservate, e non si danneggia l'immagine dell'amministrazione. Ogni azienda ha poi un codice integrativo."),
 (8,"chiaro",0,"Gli obblighi: diligenza, lealta', imparzialita', riservatezza. Non accettare regali oltre il modico valore. Astenersi in caso di conflitto di interessi."),
 (8,"chiaro",0,"La violazione e' fonte di responsabilita' disciplinare. E il codice si affianca al Codice deontologico della lezione uno punto quattro."),
 (8,"profondo",1.2,"[thoughtful] Uno vale come dipendente, l'altro come professionista."),

 (9,"chiaro",0,"Anticorruzione e trasparenza. La legge centonovanta del duemiladodici, sulla prevenzione della corruzione nella pubblica amministrazione, con il Responsabile della prevenzione della corruzione e della trasparenza."),
 (9,"chiaro",0,"Le misure di prevenzione sono oggi inserite nel PIAO, il Piano integrato di attivita' e organizzazione, introdotto nel duemilaventuno."),
 (9,"chiaro",0,"Il decreto legislativo trentatre' del duemilatredici riguarda la trasparenza: la sezione Amministrazione trasparente dei siti, e l'accesso civico."),
 (9,"chiaro",0,"Il whistleblowing, la tutela di chi segnala illeciti, e' oggi regolato dal decreto legislativo ventiquattro del duemilaventitre'. In sanita', aree a rischio sono per esempio le liste d'attesa e gli acquisti."),

 (10,"chiaro",0,"Il procedimento disciplinare: decreto centosessantacinque, articoli cinquantacinque e seguenti, e codice disciplinare del contratto. Le sanzioni sono graduate: rimprovero verbale e scritto, multa, sospensione, licenziamento."),
 (10,"chiaro",0,"Le garanzie: la contestazione scritta dell'addebito, il diritto di difesa, anche con l'assistenza di un rappresentante sindacale o di un legale, e termini precisi."),
 (10,"chiaro",0,"Le infrazioni piu' gravi sono di competenza dell'Ufficio per i procedimenti disciplinari. E il procedimento disciplinare e' autonomo rispetto a quello penale."),

 (11,"chiaro",0,"Incompatibilita'. Il dipendente pubblico lavora in regime di esclusivita': secondo l'articolo cinquantatre' del decreto centosessantacinque, puo' svolgere incarichi esterni solo se autorizzato, e se non incompatibili."),
 (11,"chiaro",0,"Per le professioni sanitarie del comparto sono state previste deroghe temporanee, legate alla carenza di personale. La materia cambia: verificala. Ma un doppio lavoro non autorizzato resta un illecito disciplinare."),

 (12,"chiaro",0,"Un tema sentito: le aggressioni. Il contratto duemilaventidue duemilaventiquattro prevede il patrocinio legale da parte dell'azienda, e la possibilita' di supporto psicologico per il dipendente aggredito."),
 (12,"chiaro",0,"La legge centotredici del duemilaventi ha introdotto aggravanti per le lesioni al personale sanitario, e l'osservatorio nazionale. Si collega alla Raccomandazione numero otto. Ogni aggressione va segnalata."),

 (13,"chiaro",0,"[curious] Il caso. Un collega pubblica sui social la foto di un paziente in reparto, senza il volto ma con dettagli riconoscibili. Quali norme viola?"),
 (13,"chiaro",0,"La riservatezza e la protezione dei dati personali, con il GDPR della lezione uno punto sette. Il codice di comportamento, che dal duemilaventitre' disciplina espressamente i social. E il Codice deontologico."),
 (13,"chiaro",0,"Puo' avere rilievo disciplinare e, nei casi piu' gravi, anche penale. Che cosa fai? Inviti il collega a rimuovere subito il contenuto e, se necessario, segnali secondo le procedure aziendali."),

 (14,"chiaro",0,"In Veneto ogni azienda ha la propria contrattazione integrativa e il proprio codice di comportamento. Il reclutamento del comparto passa in gran parte da Azienda Zero, come in questo concorso."),

 (15,"chiaro",0,"La tabella. Decreto centosessantacinque: privatizzazione, articolo cinquantatre', articoli cinquantacinque e seguenti. Decreto sessantasei: undici, ventiquattro, quarantotto ore. Ferie: ventotto o trentadue, piu' quattro."),
 (15,"chiaro",0,"Contratto duemiladiciannove duemilaventuno: le aree. Poi il duemilaventidue duemilaventiquattro: assistente infermiere, elevata qualificazione ampliata, ferie a ore, settimana su quattro giorni, patrocinio per le aggressioni."),

 (16,"chiaro",0,"Una nota di metodo. La materia contrattuale cambia con ogni rinnovo: per l'esame contano i principi e la struttura. I dettagli si verificano sul testo vigente, sul sito dell'ARAN, prima della prova."),

 (17,"chiaro",0,"[warm] Nella prossima lezione: la sicurezza sul lavoro, con il decreto legislativo ottantuno del duemilaotto, le figure della prevenzione e i rischi specifici dell'infermiere. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Le fonti del rapporto di lavoro pubblico",3:"Il CCNL del Comparto Sanita'",4:"Le aree",5:"Gli incarichi e la carriera",6:"Orario, turni e riposi",
 7:"Ferie e permessi",8:"Il codice di comportamento",9:"Anticorruzione e trasparenza",10:"Il procedimento disciplinare",11:"Incompatibilita' e libera professione",
 12:"Le tutele contro le aggressioni",13:"Il caso d'esame",14:"In Veneto",15:"La tabella",16:"Una nota di metodo",17:"Chiusura"}

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
