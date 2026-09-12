# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Nella lezione precedente abbiamo visto come si ragiona. Oggi vediamo con quali categorie: i modelli teorici danno la griglia con cui si legge la persona assistita, prima ancora di interpretarla."),
 (1,"chiaro",0,"E le tassonomie danno il vocabolario con cui si scrive quello che si e' letto. Griglia e vocabolario: senza la prima non sai dove guardare, senza il secondo non sai come dirlo a chi viene dopo di te."),
 (1,"tenue",0,"Ti avviso: questa materia produce domande secche del tipo, a chi si deve il modello dell'autocura? Sono punti facili, e proprio per questo non vanno regalati. Si perdono in tre secondi e si recuperano in nessuno."),

 (2,"chiaro",0,"Quattro cose. A che cosa serve un modello. I nove autori con il loro concetto chiave: valgono una domanda quasi sicura. I tre modelli piu' chiesti, da vicino: Henderson, Gordon, Orem. E le tassonomie."),

 (3,"chiaro",0,"Un modello concettuale e' una rappresentazione organizzata dei concetti centrali della disciplina. Detta cosi' sembra teoria per l'esame, e invece serve a tre cose molto concrete."),
 (3,"chiaro",0,"Orientare l'accertamento: che cosa guardo. Giustificare gli interventi: perche' faccio questo e non un altro. E rendere l'assistenza comunicabile fra professionisti diversi, anche a distanza di turni."),
 (3,"profondo",1.2,"Non e' teoria per l'esame: e' la struttura della raccolta dati. Chi non ha una griglia raccoglie quello che gli capita sotto gli occhi, e quello che non ha guardato non sa nemmeno di averlo perso."),

 (4,"chiaro",0,"Prima domanda possibile, e diretta: quali sono i concetti del metaparadigma infermieristico? Persona, ambiente, salute, assistenza infermieristica. Quattro, e sono sempre quelli."),
 (4,"chiaro",0,"Ogni teoria li declina a proprio modo: per Nightingale pesa l'ambiente, per Watson la relazione. Ma se un elenco ne propone cinque, o sostituisce l'ambiente con la malattia, e' la risposta sbagliata."),

 (5,"chiaro",0,"Ecco la tabella da fotografare. Nightingale: l'ambiente. Henderson: i quattordici bisogni. Orem: l'autocura. Gordon: gli undici modelli funzionali. Sono le quattro piu' chieste in assoluto."),
 (5,"chiaro",0,"E poi. Watson: il caring. Peplau: la relazione interpersonale. Leininger: il nursing transculturale. Roy: l'adattamento. Neuman: i sistemi. In tutto nove autori, nove parole."),
 (5,"chiaro",0,"Non serve sapere la biografia di nessuno di loro: serve l'accoppiata nome e concetto, perche' e' esattamente quello che la domanda chiede, e non chiede nient'altro."),
 (5,"tenue",0,"E conviene impararle come coppie, non come elenco. E' la coppia che viene chiesta, e un elenco recitato in ordine non aiuta quando la domanda parte dal concetto invece che dal nome."),

 (6,"chiaro",0,"Se ricordi solo tre righe di quella tabella, ricorda queste. Henderson, quattordici bisogni. Orem, autocura. Gordon, undici modelli funzionali. Tre coppie, e hai coperto la maggior parte delle domande."),
 (6,"chiaro",0,"La quarta piu' frequente e' Nightingale con l'ambiente, che e' anche la piu' facile da ricordare perche' e' la prima della storia della disciplina. E poi c'e' l'inversione piu' comune dell'intero modulo."),
 (6,"profondo",1.2,"Quattordici e' Henderson, undici e' Gordon. Non il contrario. E' la coppia di numeri che decide piu' punti di tutta questa lezione, e il distrattore la scambia quasi ogni volta."),

 (7,"chiaro",0,"Henderson definisce la funzione propria dell'infermiere come l'assistere la persona, malata o sana, nel compimento delle attivita' che contribuiscono alla salute o alla guarigione."),
 (7,"chiaro",0,"Attivita' che la persona compirebbe da se' se avesse la forza, la volonta' o le conoscenze necessarie. Tre parole da tenere insieme: forza, volonta', conoscenza."),
 (7,"chiaro",0,"Sono le tre cause della dipendenza, e sono tre cose diverse: una si compensa, una si sostiene, una si insegna. Citarle testualmente distingue chi ha studiato Henderson da chi l'ha solo sentita nominare."),

 (8,"chiaro",0,"I quattordici bisogni, in ordine. Respirare. Mangiare e bere. Eliminare. Muoversi e mantenere la postura. Dormire e riposare. Vestirsi e svestirsi. Mantenere la temperatura corporea."),
 (8,"chiaro",0,"Tenere il corpo pulito. Evitare i pericoli. Comunicare. Praticare il proprio culto. Occuparsi in modo da realizzarsi. Ricrearsi. E infine apprendere. Quattordici, in quest'ordine."),
 (8,"chiaro",0,"Nota come si passi dai bisogni fisiologici a quelli relazionali, spirituali e di realizzazione. E' una scala che l'assistenza percorre tutta, non solo nella parte bassa dove sta il corpo."),
 (8,"tenue",0,"Ed e' anche il motivo per cui l'elenco finisce con apprendere: per Henderson l'educazione non e' un di piu' che si fa se avanza tempo, e' l'ultimo gradino dell'assistenza, quello che rende liberi."),

 (9,"chiaro",0,"Gordon organizza l'accertamento in undici modelli funzionali della salute. Percezione e gestione della salute. Nutrizionale e metabolico. Eliminazione. Attivita' ed esercizio."),
 (9,"chiaro",0,"Sonno e riposo. Cognitivo e percettivo, ed e' qui che sta il dolore: se una traccia ti chiede in quale modello collocarlo, la risposta e' questa. Percezione di se'. Ruolo e relazioni."),
 (9,"chiaro",0,"Sessualita' e riproduzione. Coping e tolleranza allo stress. Valori e convinzioni. Undici aree, e ciascuna e' una domanda che, avendo l'elenco in testa, non ti dimentichi di fare."),
 (9,"chiaro",0,"Quando un modello e' alterato si parla di modello disfunzionale, ed e' li' che nasce la diagnosi infermieristica. E' il ponte esatto fra la lezione precedente e questa."),

 (10,"chiaro",0,"Un consiglio molto pratico. Se in una prova pratica ti chiedono di effettuare l'accertamento di un paziente, l'elenco ordinato degli undici modelli e' una struttura di risposta gia' pronta, da usare cosi' com'e'."),
 (10,"tenue",1.2,"Dimostra sistematicita' e ti impedisce di dimenticare aree intere. Chi improvvisa salta coping, valori e sessualita': tre aree su undici, perse per fretta e non per ignoranza."),

 (11,"chiaro",0,"Orem parte da un'idea semplice: la persona tende naturalmente a prendersi cura di se'. L'intervento infermieristico serve quando c'e' un deficit di autocura, cioe' quando le richieste superano le capacita'."),
 (11,"chiaro",0,"Non quando c'e' una malattia: quando c'e' uno scarto. E' una differenza che vale una domanda, perche' una persona malata puo' non avere deficit, e una persona sana puo' averne."),

 (12,"chiaro",0,"Da li' i tre sistemi assistenziali. Totalmente compensativo: la persona non puo' compiere alcuna attivita' di autocura, e tu fai tutto. Paziente incosciente, terapia intensiva."),
 (12,"chiaro",0,"Parzialmente compensativo: la persona fa alcune cose, tu le altre. L'esempio tipico e' l'emiparesi che si alimenta da sola ma ha bisogno di aiuto per l'igiene e per i trasferimenti."),
 (12,"chiaro",0,"Di supporto ed educazione: la persona puo' fare, ma deve imparare o essere sostenuta. Educazione all'insulina, gestione della stomia, addestramento del caregiver."),
 (12,"chiaro",0,"Tre sistemi, e non sono tre gravita' cliniche: sono tre misure dello scarto fra quello che la persona deve fare per se' e quello che riesce a fare. Lo scarto, non la diagnosi."),

 (13,"chiaro",0,"Ed ecco il valore pratico, che vale anche come regola d'esame. L'obiettivo dell'assistenza e' spostare la persona verso il sistema meno compensativo possibile, un gradino alla volta."),
 (13,"profondo",1.2,"Nei casi clinici l'opzione che promuove autonomia ed educazione e' quasi sempre preferibile a quella che sostituisce la persona. Anche quando sostituirla sarebbe piu' rapido: e lo e' quasi sempre."),

 (14,"chiaro",0,"Passiamo al linguaggio. Il problema e' questo: se ogni infermiere descrive i problemi con parole proprie, l'assistenza non e' confrontabile fra reparti, non e' misurabile nel tempo."),
 (14,"chiaro",0,"E non e' ricercabile. Le tassonomie nascono per risolverlo: un vocabolario comune e' la condizione perche' esista una ricerca infermieristica, e non solo una raccolta di esperienze."),

 (15,"chiaro",0,"Tre sistemi, tre domande. NANDA International classifica le diagnosi, e risponde alla prima domanda: qual e' il problema di questa persona."),
 (15,"chiaro",0,"NOC, Nursing Outcomes Classification, classifica i risultati attesi con i loro indicatori, e risponde alla seconda: che risultato voglio, e con quale misura me ne accorgo."),
 (15,"chiaro",0,"NIC, Nursing Interventions Classification, classifica gli interventi: che cosa faccio per ottenerlo. NOC sono gli esiti, NIC gli interventi: e' la confusione piu' frequente delle tre sigle."),

 (16,"chiaro",0,"La catena e' NANDA, NOC, NIC, in quest'ordine. E l'ordine ha una ragione: l'intervento si sceglie in funzione del risultato atteso, e il risultato in funzione della diagnosi."),
 (16,"chiaro",0,"Talvolta la trovi indicata come collegamento NNN. E la tassonomia NANDA organizza le diagnosi in tredici domini, suddivisi a loro volta in classi: e' una struttura ad albero, non un elenco."),
 (16,"chiaro",0,"Per ciascuna diagnosi definisce etichetta, definizione, caratteristiche definenti e fattori correlati. O, per le diagnosi di rischio, i fattori di rischio al posto delle caratteristiche."),

 (17,"chiaro",0,"Chiudo con una precisazione che all'orale vale molto. Il linguaggio standardizzato e' uno strumento, non un feticcio."),
 (17,"profondo",1.2,"Una diagnosi formalmente impeccabile ma non aderente alla persona vale meno di una descrizione in italiano corrente che coglie il problema. La risposta migliore riconosce tutte e due le cose."),
 (17,"chiaro",0,"[warm] E un ultimo consiglio: non studiare a memoria l'elenco delle diagnosi NANDA. I concorsi chiedono la logica, non il catalogo, e quel tempo serve a farmacologia e a emergenza. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"A che cosa serve un modello",
 4:"Il metaparadigma",5:"La tabella degli autori",6:"Le tre associazioni",
 7:"Henderson: la definizione",8:"I quattordici bisogni",9:"Gordon: gli undici modelli",
 10:"Perche' conviene saperli",11:"Orem: il deficit di autocura",12:"I tre sistemi di Orem",
 13:"La conseguenza pratica",14:"Perche' servono le tassonomie",15:"NANDA, NOC, NIC",
 16:"La catena e la struttura",17:"Il limite e chiusura"}
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
