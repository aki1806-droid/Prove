# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Nella lezione 1.5 abbiamo chiuso con una frase: cio' che non e' documentato si presume non fatto. Oggi quella frase diventa il centro del discorso, e smette di essere un avvertimento per diventare un metodo."),
 (1,"chiaro",0,"La documentazione non e' la coda burocratica dell'assistenza: e' l'atto con cui l'assistenza diventa verificabile, e quindi difendibile. Senza documento, l'assistenza esiste solo nella memoria di chi l'ha fatta."),
 (1,"tenue",0,"Nei concorsi e' materia molto presente, perche' tocca insieme tre cose: metodologia, diritto e sicurezza. Tre materie in una sola domanda, ed e' per questo che rende piu' di quasi ogni altro argomento del modulo."),

 (2,"chiaro",0,"Quattro blocchi. Natura giuridica e funzioni della cartella clinica, e dove sta dentro quella infermieristica. I sette requisiti di una corretta documentazione."),
 (2,"chiaro",0,"Come si corregge e come si conserva. E la scheda unica di terapia, che e' insieme un documento e una misura di sicurezza: la ritroveremo nella lezione sul rischio clinico."),

 (3,"chiaro",0,"La cartella clinica raccoglie i dati di un episodio di ricovero. Redatta da un pubblico ufficiale o da un incaricato di pubblico servizio nell'esercizio delle funzioni, ha natura di atto pubblico."),
 (3,"chiaro",0,"E fa fede fino a querela di falso di quanto il redattore attesta essere avvenuto in sua presenza. Sono parole tecniche e vanno dette con quelle parole: all'orale la formula esatta conta."),
 (3,"profondo",1.2,"Fa fede fino a querela di falso: significa che per contestarla non basta dire che e' sbagliata. Serve un procedimento penale. E' il livello di forza probatoria piu' alto che un documento possa avere nel nostro ordinamento."),

 (4,"chiaro",0,"Due conseguenze, e vanno viste come le due facce della stessa medaglia. Prima: l'annotazione falsa o alterata integra falso in atto pubblico, articoli 476 e seguenti del codice penale."),
 (4,"chiaro",0,"Seconda: cio' che non compare si presume non eseguito. La cartella protegge chi documenta bene ed espone chi documenta male. Non e' un adempimento contro di te: e' la tua prova, e a distanza di anni l'unica che avrai."),

 (5,"chiaro",0,"Sei funzioni. Clinico assistenziale: consente a ciascuno di riprendere il filo. Giuridica e probatoria. Gestionale: DRG e tariffazione, perche' la cartella e' anche il documento su cui l'ospedale viene pagato."),
 (5,"chiaro",0,"Epidemiologica e di ricerca. Formativa, per la didattica e l'audit. E di tutela della persona, che attraverso di essa esercita il diritto di accesso ai propri dati. Il documento sta in azienda, ma i dati sono della persona."),
 (5,"chiaro",0,"Sei funzioni per un solo documento, ed e' il motivo per cui la cartella ha requisiti cosi' rigidi: deve servire a sei scopi diversi, alcuni dei quali a distanza di anni."),

 (6,"chiaro",0,"La cartella infermieristica e' parte integrante della cartella clinica e ne condivide natura e requisiti. Non e' un allegato e non e' un quaderno di reparto: e' dentro l'atto pubblico, con tutto quello che ne consegue."),
 (6,"chiaro",0,"Documenta il processo di assistenza, e la sua struttura ne segue la sequenza. Accertamento all'ingresso. Scale con le rivalutazioni. Problemi o diagnosi, con data di apertura e di chiusura."),
 (6,"chiaro",0,"Obiettivi e pianificazione. Diario. Scheda terapeutica unica. Schede specifiche: bilancio idrico, medicazioni, glicemie, contenzione. Ed educazione e continuita', con la lettera infermieristica di dimissione."),

 (7,"chiaro",0,"Sette requisiti. Veridicita': si scrive cio' che e' realmente accaduto. Completezza: anche le omissioni motivate e i rifiuti. Chiarezza: leggibile, con abbreviazioni solo se ammesse."),
 (7,"chiaro",0,"Contestualita': si registra al momento, non a fine turno. Tracciabilita': data, ora, firma, cioe' chi ha fatto che cosa e quando. Tre elementi, e se ne manca uno la tracciabilita' non c'e'."),
 (7,"chiaro",0,"Pertinenza: solo i dati necessari, per il principio di minimizzazione. E oggettivita'. Sette parole, e le due che si vedono subito in una prova scritta sono contestualita' e oggettivita'."),

 (8,"chiaro",0,"Sull'oggettivita' fermiamoci. Si descrive, non si giudica. Paziente maleducato e' un giudizio, e indebolisce il documento: non e' verificabile da nessuno, e dice piu' di chi scrive."),
 (8,"tenue",1.2,"Rifiuta l'igiene e alza la voce quando gli viene proposta e' un dato. Stessa scena, due documenti con valore completamente diverso."),

 (9,"chiaro",0,"Tre annotazioni che non registrano un'azione, ma proteggono chi le scrive. La prima: il rifiuto, con l'informazione data sulle conseguenze. Non basta scrivere rifiuta: va scritto che cosa sapeva quando ha rifiutato."),
 (9,"chiaro",0,"La segnalazione fatta al medico o al coordinatore, con l'orario. E l'omissione motivata. Un intervento saltato e spiegato e' una scelta; un intervento saltato e muto e' una mancanza."),
 (9,"chiaro",0,"Sono le tre che mancano piu' spesso, e le tre che in giudizio pesano di piu'. Chi le scrive tutte e tre ha gia' risposto alle domande che gli verrebbero fatte dopo."),

 (10,"chiaro",0,"La regola della correzione. Si traccia una riga singola sul dato errato e si scrive accanto il dato corretto con data, ora e firma. Il dato sbagliato deve restare leggibile: e' parte della storia del documento."),
 (10,"chiaro",0,"Mai correttore, cancellature, sovrascritture, fogli strappati. Il motivo e' sottile e va capito, perche' e' esattamente il motivo che si chiede all'orale, dove non basta enunciare la regola."),
 (10,"profondo",1.2,"Cancellare un dato in un atto pubblico sposta il sospetto dall'errore all'occultamento. Un errore corretto correttamente e' un errore; un errore cancellato sembra qualcos'altro."),

 (11,"chiaro",0,"Quattro mai. Mai lasciare spazi bianchi: uno spazio bianco e' lo spazio in cui qualcuno potrebbe inserire qualcosa dopo. Mai firmare per altri e mai condividere le credenziali: la firma attesta chi ha eseguito."),
 (11,"chiaro",0,"Mai annotare in anticipo una somministrazione non ancora eseguita: e' falso anche se poi la esegui davvero. Il documento attesta un fatto, e in quel momento il fatto non c'e'."),
 (11,"chiaro",0,"E mai abbreviazioni ambigue: le sigle sono una fonte documentata di errore in terapia. Quattro mai, e nessuno dei quattro ammette eccezioni."),

 (12,"chiaro",0,"La scheda unica di terapia unifica su un unico supporto prescrizione, preparazione e somministrazione, eliminando le trascrizioni intermedie. Un solo supporto, tre momenti, nessuna ricopiatura."),
 (12,"chiaro",0,"Non e' un modulo in piu': e' una delle misure piu' efficaci di prevenzione dell'errore, perche' la trascrizione manuale da un supporto a un altro e' uno dei punti di maggior rischio del processo."),

 (13,"chiaro",0,"Sette elementi. Identificazione della persona. Farmaco e forma farmaceutica. Dose e unita' di misura, ed e' il punto in cui nascono gli errori piu' gravi: un milligrammo scambiato per un grammo e' un fattore mille."),
 (13,"chiaro",0,"Via di somministrazione: una via errata puo' essere letale. Orario e frequenza. Data, ora e firma del prescrittore, che rende la prescrizione un atto imputabile."),
 (13,"chiaro",0,"E firma di chi somministra, che chiude il ciclo. Sette elementi: se ne manca uno, la prescrizione non e' completa, e una prescrizione incompleta non si esegue."),

 (14,"chiaro",0,"E la conseguenza: una prescrizione incompleta o illeggibile non va eseguita, va chiarita. Chiedo chiarimento al prescrittore, se il dubbio permane non do corso, e documento il dubbio e la richiesta."),
 (14,"tenue",0,"E' la sequenza che conosci gia' dalle lezioni 1.2, 1.4 e 1.5. Tre lezioni diverse, un'unica risposta: e' il segno che il corso ha una spina dorsale."),

 (15,"chiaro",0,"I modelli di registrazione. Narrativo cronologico: semplice, ma disperde le informazioni su uno stesso problema. Orientato per problemi, il POMR, che raggruppa le annotazioni intorno al problema invece che intorno all'ora."),
 (15,"chiaro",0,"SOAP: soggettivo, oggettivo, analisi, piano. Esteso a SOAPIE con interventi e valutazione. Focus DAR: dato, azione, risposta. E' molto usato nelle cartelle informatizzate, perche' le tre voci diventano tre campi."),
 (15,"chiaro",0,"E la registrazione per eccezione: si annota solo cio' che si discosta da uno standard predefinito. Efficiente, ma rischiosa: cio' che non e' scritto vale come conforme, e va bene solo se tutti sanno a che cosa."),

 (16,"chiaro",0,"Qualunque modello tu usi, c'e' un elemento che non puo' mancare: la risposta della persona. E' cio' che trasforma l'annotazione da elenco di attivita' a documentazione di un processo."),
 (16,"chiaro",0,"Somministrata terapia non documenta nulla: non dice quale, non dice perche', non dice come e' andata. Somministrato paracetamolo un grammo endovena per NRS sette, rivalutato dopo quarantacinque minuti, NRS tre."),
 (16,"profondo",1.2,"Questa riga documenta intervento, motivo, rivalutazione ed esito. In una riga, tutte e cinque le fasi del processo."),

 (17,"chiaro",0,"La cartella clinica si conserva illimitatamente, in quanto atto ufficiale sanitario. La legge 24 del 2017 impone di renderla disponibile entro termini definiti su richiesta dell'interessato."),
 (17,"chiaro",0,"Nella cartella elettronica valgono gli stessi requisiti, con in piu' quattro cose: credenziali personali, tracciamento degli accessi, versionamento delle modifiche e firma elettronica."),
 (17,"chiaro",0,"E procedure di continuita' operativa in caso di blocco del sistema: registrazione su supporto cartaceo predefinito e riversamento tracciato. E' una domanda d'orale che quasi nessuno prepara."),

 (18,"chiaro",0,"Ricapitoliamo. La cartella clinica e' atto pubblico e quella infermieristica ne e' parte integrante. Sette requisiti. Si corregge senza cancellare. Mai annotazioni anticipate, mai firme per altri, mai spazi bianchi."),
 (18,"chiaro",0,"[warm] La scheda unica elimina le trascrizioni. Documenta sempre rifiuto, segnalazione e omissione motivata. Registra la risposta della persona. E cio' che non e' documentato si presume non fatto. A tra poco."),
]

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Apertura",2:"Obiettivi",3:"La cartella e' atto pubblico",
 4:"Le due conseguenze",5:"Le sei funzioni",6:"La cartella infermieristica",
 7:"I sette requisiti",8:"Descrivere, non giudicare",9:"Le tre annotazioni",
 10:"Correggere, non cancellare",11:"I quattro mai",12:"La scheda unica di terapia",
 13:"Gli elementi della prescrizione",14:"Prescrizione incompleta",
 15:"I modelli di registrazione",16:"L'elemento che non puo' mancare",
 17:"Conservazione e informatizzazione",18:"Chiusura"}
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
