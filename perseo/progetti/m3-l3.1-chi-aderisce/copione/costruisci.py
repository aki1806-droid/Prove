# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Ogni mattina, all'ingresso del personale, passano badge diversi. Infermieri, tecnici, amministrativi, medici, operatori socio-sanitari."),
 (1,"chiaro",0,"C'e' chi ha un contratto a tempo indeterminato, chi a tempo determinato, chi lavora part-time da anni, chi e' appena arrivato con una supplenza di qualche mese."),
 (1,"chiaro",0,"La domanda e' semplice: possono aderire tutti a Perseo Sirio? La risposta e' quasi sempre si', ma con qualche condizione da conoscere bene."),
 (1,"chiaro",0,"In questa lezione le vediamo una per una: il comparto, il tipo di contratto, i tempi. Cosi' potrai rispondere con sicurezza, anche ai colleghi che te lo chiedono."),

 (2,"chiaro",0,'Partiamo dai comparti. Immagina un cancello con sopra il nome del Fondo: davanti, una fila di lavoratori che lo attraversano uno alla volta.'),
 (2,"chiaro",0,"Passano i dipendenti a cui si applica il contratto nazionale della sanita'. E' il gruppo piu' numeroso, ed e' probabilmente anche il tuo."),
 (2,"chiaro",0,"Passano quelli delle funzioni locali, cioe' regioni, comuni, province e altri enti territoriali, e quelli delle funzioni centrali: ministeri, agenzie fiscali, enti pubblici non economici."),
 (2,"chiaro",0,"Passano i dipendenti di universita' e centri di ricerca, e quelli di due enti particolari, l'ENAC e il CNEL."),
 (2,"chiaro",0,'Vale per il personale di comparto e per la dirigenza, compresa la dirigenza medica e veterinaria. Medici e dirigenti, quindi, hanno la stessa porta.'),
 (2,"chiaro",0,'Possono aderire anche i segretari comunali e provinciali, una volta firmato il relativo accordo.'),
 (2,"chiaro",0,'Resta fuori dal cancello solo la scuola. Come abbiamo detto nel primo modulo, il personale della scuola ha un fondo diverso: Espero.'),

 (3,"chiaro",0,"Ora il tipo di contratto. Qui le cose sono piu' semplici di quanto si pensi, e conviene saperlo, perche' su questo punto circolano molti dubbi."),
 (3,"chiaro",0,'Se sei a tempo indeterminato, a tempo pieno o part-time, puoi aderire sempre, in qualunque momento della tua carriera.'),
 (3,"chiaro",0,"Non conta neppure il profilo professionale: infermiere, amministrativo, tecnico o dirigente, la porta e' la stessa per tutti."),
 (3,"chiaro",0,"Se hai un contratto a tempo determinato, anche part-time, o un'altra forma di lavoro flessibile prevista dalla legge e dal contratto, puoi aderire a una condizione."),
 (3,"chiaro",0,"Che il rapporto di lavoro duri almeno tre mesi continuativi. Sotto questa soglia, l'adesione non e' prevista."),
 (3,"chiaro",0,"Il part-time non e' un ostacolo. Cambia solo l'importo dei contributi, che si calcolano sulla tua retribuzione: meno ore, contributi piu' piccoli, ma le stesse regole."),

 (4,"chiaro",0,"Per i contratti a termine c'e' un secondo dettaglio, che sfugge a molti. Immagina il contratto come una barra, con un inizio e una scadenza."),
 (4,"chiaro",0,"Lo Statuto del Fondo dice che chi e' a tempo determinato puo' aderire fino alla scadenza del contratto. Fin qui, nessun problema."),
 (4,"chiaro",0,"[serious] Ma attenzione: se manca troppo poco alla fine, l'ente non fa in tempo ad avviare i versamenti. Servono alcuni passaggi tecnici, e richiedono tempo."),
 (4,"chiaro",0,'In quel caso i primi versamenti partono solo dal tuo contratto successivo con un ente del Fondo. Tu risulti iscritto, ma per ora sul conto non arriva nulla.'),
 (4,"chiaro",0,"Per questo il Fondo consiglia di firmare almeno tre mesi prima della scadenza. E' l'ultimo tratto della barra: meglio non arrivarci."),
 (4,"chiaro",0,"Un esempio. Con un contratto che scade il 31 dicembre, conviene aderire entro settembre. Cosi' i versamenti partono subito, e non dal contratto dopo."),
 (4,"chiaro",0,"E perche' conviene aderire anche con un contratto breve? Perche' quei mesi di lavoro non vanno persi ai fini della previdenza complementare."),
 (4,"chiaro",0,"E la posizione puo' restare aperta anche dopo la scadenza, in attesa del prossimo contratto. Lo vedremo nell'ultima lezione del modulo."),

 (5,"chiaro",0,'E chi lavora accanto al pubblico, ma con un datore di lavoro privato? Pensa a una clinica convenzionata, o a una cooperativa che gestisce un servizio per il comune.'),
 (5,"chiaro",0,"Perseo Sirio puo' accogliere anche alcuni settori affini: il personale di case di cura private, di ospedali gestiti da enti religiosi."),
 (5,"chiaro",0,'E di servizi socio-sanitari, assistenziali ed educativi esternalizzati. Ma solo se il datore di lavoro ha firmato un apposito accordo di adesione.'),
 (5,"chiaro",0,"L'accordo lo firma il datore di lavoro, non il singolo dipendente. Per questo conviene chiedere in amministrazione se e' stato firmato."),
 (5,"chiaro",0,'In questo caso valgono in parte regole diverse, quelle dei lavoratori privati. Se sei in questa situazione, conviene chiedere al Fondo come funziona nel tuo caso.'),
 (5,"chiaro",0,"Infine, possono essere iscritti anche i familiari fiscalmente a carico di chi aderisce, per esempio un figlio. Ne parliamo nell'ultima lezione del modulo."),

 (6,"chiaro",0,"Riassumendo in una frase: se lavori in sanita' o nella pubblica amministrazione, esclusa la scuola, con un contratto di almeno tre mesi, puoi aderire."),
 (6,"chiaro",0,"E l'adesione e' libera e volontaria. Nessuno puo' obbligarti a entrare, e nessuno puo' impedirtelo, se hai i requisiti."),
 (6,"chiaro",0,"C'e' pero' un caso in cui potresti essere gia' iscritto senza aver firmato nulla: quello dei neoassunti. Lo vedremo nella terza lezione di questo modulo."),
 (6,"chiaro",0,"E c'e' un altro caso particolare, quello della polizia locale, che arriva al Fondo per una strada tutta sua. Anche a questo dedicheremo una lezione."),
 (6,"chiaro",0,'Per ora tieni a mente i due controlli da fare: in quale comparto lavori, e che tipo di contratto hai. Bastano questi due dati per sapere se puoi aderire.'),
 (6,"chiaro",0,"Se uno dei due non ti e' chiaro, l'ufficio del personale puo' dirtelo in pochi minuti."),

 (7,"profondo",1.2,"Anche un contratto breve e' un pezzo della tua pensione."),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: possono aderire i dipendenti di sanita', funzioni locali, funzioni centrali, universita' e ricerca, dirigenza compresa. La scuola ha un altro fondo."),
 (8,"chiaro",0,'Due: serve un contratto, anche a termine o part-time, di almeno tre mesi continuativi.'),
 (8,"chiaro",0,"Tre: se sei a tempo determinato, firma l'adesione presto, possibilmente almeno tre mesi prima della scadenza, cosi' i versamenti partono subito."),
 (8,"chiaro",0,'La mossa di oggi: sul tuo cedolino trova il contratto applicato e, se ne hai una, la data di scadenza. Ora sai se, e fino a quando, puoi aderire.'),
 (8,"chiaro",0,'[warm] Nella prossima lezione: come si aderisce, passo per passo.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'I comparti', 3: 'Il contratto', 4: 'I tre mesi', 5: 'Non solo pubblico', 6: 'In sintesi', 7: 'Memo', 8: 'Chiusura'}
CPS = 17.0   # GianP eleven_v3, misurata sul corso Infermiere: si rimisura sulla 1.1

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
