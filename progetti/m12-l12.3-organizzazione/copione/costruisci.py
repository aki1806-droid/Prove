# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Quando entri in un'azienda sanitaria, entri in un'organizzazione con una struttura precisa: un vertice, dei dipartimenti, delle unita' operative, una direzione delle professioni sanitarie."),
 (1,"chiaro",0,"E dentro ciascun reparto, un modello organizzativo dell'assistenza. Conoscerli ti serve all'esame, e ti serve per capire chi decide che cosa, fin dal primo giorno di lavoro."),

 (2,"chiaro",0,"L'atto aziendale e' il documento, di diritto privato, con cui l'azienda definisce la propria organizzazione e il proprio funzionamento."),
 (2,"chiaro",0,"Lo prevede il decreto legislativo cinquecentodue del novantadue, nel testo modificato dal decreto legislativo duecentoventinove del novantanove."),
 (2,"chiaro",0,"E' adottato dal direttore generale secondo gli indirizzi della Regione, e individua i dipartimenti, le strutture, i distretti, gli uffici di staff."),
 (2,"chiaro",0,"Ed e' pubblico: se vuoi capire come e' organizzata l'azienda in cui farai domanda, l'atto aziendale e' il primo documento da leggere."),

 (3,"chiaro",0,"Al vertice c'e' la direzione strategica: il direttore generale, il direttore sanitario, il direttore amministrativo e, in Veneto, anche il direttore dei servizi socio-sanitari."),
 (3,"chiaro",0,"Gli organi dell'azienda, invece, sono tre. Il primo e' il direttore generale. Il secondo e' il collegio sindacale, che vigila sulla regolarita' amministrativa e contabile."),
 (3,"chiaro",0,"Il terzo e' il collegio di direzione, che supporta la direzione dell'azienda nel governo clinico, nella programmazione e nella formazione."),

 (4,"chiaro",0,"Il dipartimento e' il modello ordinario di organizzazione delle attivita' sanitarie. Aggrega unita' operative omogenee, affini o complementari: per esempio cardiologia, emodinamica, cardiochirurgia."),
 (4,"chiaro",0,"Le unita' operative del dipartimento hanno obiettivi comuni e condividono le risorse: il personale, i posti letto, le tecnologie. A guidarlo c'e' un direttore di dipartimento."),
 (4,"chiaro",0,"Il dipartimento puo' essere strutturale, oppure funzionale, oppure interaziendale, quando coinvolge piu' aziende."),

 (5,"chiaro",0,"Poi le strutture. La struttura complessa, o UOC, ha autonomia gestionale, ed e' guidata da un direttore di struttura complessa."),
 (5,"chiaro",0,"La struttura semplice, o UOS, e' un'articolazione di una struttura complessa. Oppure e' a valenza dipartimentale, la UOSD, quando fa capo direttamente al dipartimento."),
 (5,"chiaro",0,"E sul piano dell'assistenza ci sono il coordinatore infermieristico e gli incarichi di funzione, che vedremo nella lezione dodici punto cinque."),

 (6,"chiaro",0,"Il servizio delle professioni sanitarie. La legge duecentocinquantuno del duemila riconosce l'autonomia e la responsabilita' delle professioni sanitarie."),
 (6,"chiaro",0,"E prevede che le aziende possano istituire il servizio dell'assistenza infermieristica e ostetrica, diretto da un dirigente delle professioni sanitarie."),
 (6,"chiaro",0,"Il dirigente dirige, organizza e valuta l'assistenza, e gestisce le risorse infermieristiche e quelle di supporto."),
 (6,"chiaro",0,"La legge quarantatre del duemilasei articola poi le funzioni: professionisti, coordinatori, specialisti e dirigenti. Le hai viste nel modulo uno; qui ne vedi il posto nell'organizzazione."),

 (7,"chiaro",0,"Il decreto ministeriale settanta del duemilaquindici e' il regolamento sugli standard qualitativi, strutturali, tecnologici e quantitativi dell'assistenza ospedaliera."),
 (7,"chiaro",0,"Fissa i posti letto a tre virgola sette per mille abitanti, di cui zero virgola sette per la riabilitazione e la lungodegenza post-acuzie. E un tasso di ospedalizzazione di centosessanta per mille."),
 (7,"chiaro",0,"E soglie minime di volume e di esito per alcune attivita', perche' la qualita' di certi interventi dipende da quanti se ne fanno: per esempio la chirurgia del tumore della mammella, o il bypass."),

 (8,"chiaro",0,"La classificazione degli ospedali secondo il DM settanta. Il presidio ospedaliero di base ha un bacino da ottantamila a centocinquantamila abitanti, e un pronto soccorso."),
 (8,"chiaro",0,"Poi l'ospedale sede di DEA di primo livello, cioe' di dipartimento di emergenza e accettazione, con un bacino da centocinquantamila a trecentomila abitanti."),
 (8,"chiaro",0,"L'ospedale sede di DEA di secondo livello ha un bacino da seicentomila a un milione e duecentomila abitanti, con le specialita' di alta complessita'. Piu' i presidi nelle zone disagiate, come la montagna."),
 (8,"chiaro",0,"E' il modello hub and spoke: i centri piu' attrezzati, gli hub, sostengono una rete di centri periferici, gli spoke."),

 (9,"chiaro",0,"Il DM settanta prevede anche le reti per le patologie tempo-dipendenti: la rete cardiologica per l'infarto, la rete traumatologica, la rete ictus. Quelle che hai visto nel modulo dieci."),
 (9,"chiaro",0,"[thoughtful] E altre reti: punti nascita, oncologia, trapianti, emergenza pediatrica. L'obiettivo e' portare il paziente all'ospedale giusto nel tempo giusto, anche se non e' il piu' vicino."),

 (10,"chiaro",0,"I modelli organizzativi dell'assistenza infermieristica. Il modello per compiti, o funzionale: ogni infermiere esegue un'attivita' per tutti i pazienti. Uno la terapia, uno le medicazioni, uno i parametri."),
 (10,"chiaro",0,"E' efficiente sulla carta, ma frammenta l'assistenza: nessuno conosce il paziente nella sua globalita'."),
 (10,"chiaro",0,"Poi il modello per piccole equipe. Il primary nursing, con un infermiere di riferimento per ogni paziente. E il case management: il coordinamento del percorso di pazienti complessi, spesso fra ospedale e territorio."),

 (11,"chiaro",0,"[curious] Il primary nursing merita un approfondimento, perche' e' il modello piu' chiesto. Si basa sulla responsabilita' individuale e continua di un infermiere per i suoi pazienti."),
 (11,"chiaro",0,"L'infermiere di riferimento e' responsabile della pianificazione dell'assistenza, dall'ingresso alla dimissione. Garantisce personalizzazione e continuita', e una relazione con il paziente e la famiglia."),
 (11,"chiaro",0,"Quando il primary non e' in turno, l'assistenza e' garantita da un infermiere associato, che segue il piano. E' il modello piu' coerente con il processo di assistenza del modulo due."),

 (12,"chiaro",0,"L'organizzazione per intensita' di cura rovescia il modello tradizionale: i pazienti non sono collocati per specialita' del medico, ma per complessita' assistenziale e instabilita' clinica."),
 (12,"chiaro",0,"Ci sono aree ad alta intensita', cioe' intensiva e semi-intensiva. Aree a media intensita', la degenza ordinaria per aree omogenee. E aree a bassa intensita', per la post-acuzie."),
 (12,"chiaro",0,"Il medico specialista segue il paziente dove si trova. E l'infermiere ha un ruolo centrale, nella valutazione della complessita' e nella gestione del percorso."),

 (13,"chiaro",0,"Il caso d'esame. La domanda tipo: descriva le differenze fra il modello per compiti e il primary nursing. Nel modello per compiti l'organizzazione e' centrata sulle attivita'."),
 (13,"chiaro",0,"Ogni infermiere ne esegue una per tutti, l'assistenza e' frammentata e la responsabilita' e' diffusa. Nel primary nursing, invece, l'organizzazione e' centrata sulla persona."),
 (13,"chiaro",0,"Un infermiere di riferimento ha la responsabilita' della pianificazione per un gruppo di pazienti: continuita', personalizzazione, relazione. E un infermiere associato nei suoi turni di assenza."),
 (13,"chiaro",0,"E poi un collegamento: il primary nursing realizza il processo di assistenza, e la responsabilita' professionale della legge quarantadue del novantanove."),

 (14,"chiaro",0,"In Veneto gli standard del DM settanta si traducono nelle schede di dotazione ospedaliera approvate dalla Regione, che stabiliscono per ogni ospedale le funzioni e i posti letto."),
 (14,"chiaro",0,"Con un modello hub and spoke in cui le Aziende Ospedaliere Universitarie di Padova e di Verona, e lo IOV, l'Istituto Oncologico Veneto, sono centri di riferimento. Lo approfondiamo nella lezione tredici punto tre."),

 (15,"chiaro",0,"La tabella. L'atto aziendale. Gli organi: direttore generale, collegio sindacale, collegio di direzione. Il dipartimento come modello ordinario. UOC, UOS, UOSD. La legge duecentocinquantuno."),
 (15,"chiaro",0,"Il DM settanta: tre virgola sette posti letto per mille, ospedalizzazione centosessanta per mille. Presidio di base, da ottanta a centocinquantamila abitanti. DEA di primo livello, da centocinquanta a trecentomila."),
 (15,"chiaro",0,"DEA di secondo livello, da seicentomila a un milione e duecentomila. Le reti tempo-dipendenti. Il modello per compiti contro il primary nursing. E l'intensita' di cura."),

 (16,"profondo",1.2,"[serious] Il modello organizzativo decide se il paziente incontra un'organizzazione o un infermiere. Nel modello per compiti incontra tanti gesti; nel primary nursing, una persona che conosce la sua storia."),

 (17,"chiaro",0,"[warm] Nella prossima lezione: come si finanzia il Servizio Sanitario Nazionale, che cosa sono i DRG, il budget e il controllo di gestione. Temi che sembrano lontani dall'infermiere, ma spiegano molte scelte. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"L'atto aziendale",3:"La direzione strategica e gli organi",4:"Il dipartimento",5:"Le strutture",6:"Il servizio delle professioni sanitarie",
 7:"Il DM 70/2015",8:"La classificazione degli ospedali",9:"Le reti tempo-dipendenti",10:"I modelli organizzativi",11:"Il primary nursing",12:"L'intensita' di cura",
 13:"Il caso d'esame",14:"In Veneto",15:"La tabella",16:"La frase della lezione",17:"Chiusura"}

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
