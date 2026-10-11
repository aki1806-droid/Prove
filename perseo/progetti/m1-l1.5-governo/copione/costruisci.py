# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Ma i miei soldi, poi, chi li tocca? E' la domanda piu' giusta che si possa fare, e la piu' frequente agli sportelli."),
 (1,"chiaro",0,"Ed e' una domanda che merita una risposta precisa, non un generico stai tranquillo."),
 (1,"chiaro",0,"In questa lezione rispondiamo in due tempi. Prima: chi prende le decisioni dentro Perseo Sirio. Poi: chi controlla quelle decisioni, e dove stanno davvero i soldi. E c'e' anche un ruolo per te."),

 (2,"chiaro",0,"Partiamo da chi decide. Alla base c'e' l'Assemblea dei delegati: sessanta persone."),
 (2,"chiaro",0,"Trenta sono elette dagli iscritti al Fondo, cioe' dai lavoratori. Trenta sono designate dalle amministrazioni."),
 (2,"chiaro",0,"I delegati restano in carica per il periodo stabilito dallo statuto, e poi si torna a votare. E' un meccanismo simile a quello delle elezioni delle rappresentanze sul posto di lavoro."),
 (2,"chiaro",0,"L'Assemblea elegge il Consiglio di amministrazione e il Collegio dei sindaci. Il Consiglio, a sua volta, elegge il Presidente e il Vicepresidente."),
 (2,"chiaro",0,"Il Consiglio di amministrazione e' l'organo che si riunisce piu' spesso, e che segue da vicino l'andamento degli investimenti e la vita quotidiana del Fondo."),
 (2,"chiaro",0,"Tutti questi organi hanno una caratteristica in comune: sono paritetici. Meta' rappresenta chi lavora, meta' rappresenta chi da' lavoro."),
 (2,"chiaro",0,"[serious] Nessuna delle due parti puo' decidere da sola. Ogni scelta importante richiede che le due meta' si trovino d'accordo."),

 (3,"chiaro",0,"Ed ecco il tuo ruolo. Quando aderisci, non compri un prodotto: entri in un'associazione."),
 (3,"chiaro",0,'Come iscritto partecipi alla vita del Fondo e, alle elezioni, voti i delegati che ti rappresentano in Assemblea.'),
 (3,"chiaro",0,"Le elezioni dei delegati si annunciano sul sito del Fondo e sui luoghi di lavoro. Partecipare costa pochi minuti, ed e' il modo piu' diretto per pesare sulle scelte."),
 (3,"chiaro",0,"Sembra un dettaglio, ma non lo e'. In un fondo commerciale il cliente sceglie se restare o andarsene. In un fondo negoziale l'iscritto ha anche una voce su come e' gestito."),
 (3,"chiaro",0,"E' la stessa logica della rappresentanza sul posto di lavoro: chi e' coinvolto in una scelta ha diritto di dire la sua, attraverso qualcuno che elegge."),

 (4,"chiaro",0,"Vediamo i compiti in breve. L'Assemblea e' l'organo piu' ampio: elegge gli altri organi e si esprime sulle scelte fondamentali, come il bilancio e le modifiche allo statuto."),
 (4,"chiaro",0,'Il Consiglio di amministrazione gestisce il Fondo nella pratica: decide le politiche di investimento, sceglie a chi affidare i soldi, e ne controlla i risultati.'),
 (4,"chiaro",0,"Il Presidente rappresenta il Fondo verso l'esterno. E il Collegio dei sindaci vigila che tutto avvenga nel rispetto delle leggi e dello statuto."),
 (4,"chiaro",0,"Chi siede negli organi deve avere requisiti di onorabilita' e di professionalita' fissati dalla legge. Non basta essere eletti: servono le competenze per decidere sui soldi di altri."),
 (4,"chiaro",0,"Poi c'e' la struttura che lavora ogni giorno, guidata da un direttore generale. Una parte dei servizi amministrativi e' affidata a un fornitore esterno, scelto dal Fondo."),

 (5,"chiaro",0,"Ora la domanda piu' concreta: dove sono i soldi? Il Fondo non li investe direttamente con propri operatori."),
 (5,"chiaro",0,"Affida la gestione a intermediari professionali, i gestori: banche, compagnie di assicurazione, societa' di gestione del risparmio. Come prevede la legge, i gestori vengono scelti con una gara."),
 (5,"chiaro",0,'I gestori lavorano su mandato: devono seguire le regole e i limiti di investimento fissati dal Fondo, e il Fondo ne verifica i risultati.'),
 (5,"chiaro",0,"I mandati di gestione hanno una durata definita. Alla scadenza il Fondo puo' confermare i gestori o sceglierne altri, sempre con una nuova selezione."),
 (5,"chiaro",0,"E i titoli acquistati non restano in mano a chi li gestisce. Sono custoditi da un altro soggetto, il depositario, anch'esso selezionato con gara."),
 (5,"chiaro",0,'Il depositario non si limita a custodire: controlla anche che le operazioni dei gestori rispettino le regole e la legge.'),
 (5,"chiaro",0,"Chi decide, chi investe e chi custodisce sono tre soggetti diversi. E' una separazione voluta, che riduce i rischi: nessuno ha da solo le chiavi di tutto."),

 (6,"chiaro",0,'E chi controlla? Ci sono due livelli. Quello interno: il Collegio dei sindaci, e due funzioni specifiche, la gestione dei rischi e la revisione interna.'),
 (6,"chiaro",0,'Verificano costantemente che il Fondo rispetti le regole, e che le sue procedure funzionino davvero, non solo sulla carta.'),
 (6,"chiaro",0,"E quello esterno: la COVIP, l'autorita' pubblica che vigila su tutti i fondi pensione italiani. Puo' chiedere informazioni, fare ispezioni, intervenire."),
 (6,"chiaro",0,'La COVIP pubblica anche dati e statistiche su tutti i fondi: rendimenti, costi, numero di iscritti. Sono un modo per confrontare il proprio fondo con gli altri, su numeri ufficiali.'),
 (6,"chiaro",0,"C'e' poi la trasparenza verso di te: ogni anno ricevi un prospetto con la tua posizione, i versamenti e i rendimenti. Lo vedremo nel dettaglio nel modulo due."),
 (6,"chiaro",0,"E ogni anno il Fondo pubblica il bilancio e il rendiconto di ciascun comparto. Sono sul sito, e chiunque puo' leggerli."),
 (6,"chiaro",0,"Un'ultima garanzia da conoscere: la posizione che accumuli nel fondo e' tua, ed e' separata dal patrimonio di chi la gestisce."),
 (6,"chiaro",0,'Se un gestore avesse problemi, i soldi degli iscritti non finirebbero tra i suoi debiti. Ne riparleremo quando vedremo cosa succede nei casi particolari della vita.'),

 (7,"profondo",1.2,'In Perseo Sirio non sei un cliente. Sei un associato.'),

 (8,"chiaro",0,"Le tre cose da ricordare. Uno: Perseo Sirio e' governato in modo paritetico, meta' lavoratori e meta' amministrazioni, e gli iscritti eleggono i propri delegati."),
 (8,"chiaro",0,'Due: i soldi sono investiti da gestori scelti con gara, e custoditi da un depositario separato che controlla le operazioni.'),
 (8,"chiaro",0,'Tre: ci sono controlli interni, con i sindaci, la gestione dei rischi e la revisione interna, e la vigilanza esterna della COVIP.'),
 (8,"chiaro",0,'La mossa di oggi: apri il sito del Fondo e leggi la pagina Il Fondo, nella sezione Chi siamo. Sono due minuti, e ora sai leggerla.'),
 (8,"chiaro",0,"Con questa lezione chiudiamo il primo modulo. Sai perche' esiste la previdenza complementare, quali forme esistono, e chi e' Perseo Sirio."),
 (8,"chiaro",0,'[warm] Nel prossimo modulo entriamo in un tema che riguarda tutti i dipendenti pubblici, iscritti o no: la liquidazione. TFS e TFR.'),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Apertura', 2: 'Chi decide', 3: 'Il tuo ruolo', 4: 'Chi fa cosa', 5: 'Chi tiene i soldi', 6: 'Chi controlla', 7: 'Memo', 8: 'Chiusura'}
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
