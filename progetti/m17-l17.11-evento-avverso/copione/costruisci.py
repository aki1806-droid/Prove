# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Questo caso non ha un'emergenza clinica, ma un problema che preoccupa molti infermieri: un evento avverso che diventa una richiesta di risarcimento."),
 (1,"chiaro",0,"Che cosa si fa sul piano clinico e comunicativo, perche' la documentazione tutela paziente e professionista, che cosa dice la legge ventiquattro. Lezioni uno punto cinque, due punto cinque, due punto sei, sette punto due, dodici punto cinque."),

 (2,"chiaro",0,"Lo scenario. La signora Ines, settantanove anni, e' da tre settimane in medicina per una polmonite, a lungo allettata. All'ingresso la Braden era dodici, e la cute del sacro era descritta come integra."),
 (2,"chiaro",0,"In cartella: la Braden mai rivalutata dopo l'ingresso. Riposizionata, ma senza orari ne' posizioni. E il materasso antidecubito, chiesto in seconda giornata, arrivato in settima, senza solleciti documentati."),
 (2,"chiaro",0,"In quattordicesima giornata, una lesione da pressione sacrale di stadio tre. Il figlio fa reclamo all'URP, e annuncia una richiesta di risarcimento. Fermati: che cosa si fa adesso, e che cosa non si deve mai fare?"),

 (3,"chiaro",0,"[thoughtful] Prima di tutto la paziente. Si valuta la lesione: stadio, dimensioni, fondo, essudato, dolore, segni di infezione. La si documenta in modo completo, con misure ed eventuali foto, secondo procedura e consenso."),
 (3,"chiaro",0,"Si imposta il piano di trattamento: superficie antidecubito, riposizionamento programmato e documentato, medicazione avanzata, nutrizione, controllo del dolore."),
 (3,"chiaro",0,"Si rivaluta il rischio, e si coinvolge l'esperto in wound care, se presente. Un evento avverso non si gestisce solo sul piano legale: prima si cura."),

 (4,"chiaro",0,"[serious] E ora, che cosa non si deve mai fare. Non si modifica, non si cancella, e non si integra retroattivamente la documentazione."),
 (4,"chiaro",0,"La cartella clinica e' un atto pubblico: alterarla puo' configurare il reato di falso, che e' molto piu' grave di una documentazione incompleta."),
 (4,"chiaro",0,"Le correzioni si fanno solo secondo procedura, lasciando leggibile il testo errato, con data, ora, firma e motivazione. Un'annotazione tardiva porta la data e l'ora reali in cui si scrive, e dice a quale momento si riferisce."),
 (4,"chiaro",0,"Dopo un reclamo, la tentazione di aggiustare le cartelle e' comprensibile. Ma e' proprio cio' che trasforma un problema in un reato."),

 (5,"chiaro",0,"La segnalazione e l'analisi. L'evento si segnala con l'incident reporting della lezione due punto sei, e la funzione di risk management lo analizza, con un audit o un'analisi delle cause."),
 (5,"chiaro",0,"Le cause probabili sono organizzative e professionali insieme: la rivalutazione del rischio non eseguita, la documentazione assente, il materasso in ritardo senza un percorso di sollecito, forse carichi di lavoro elevati."),
 (5,"chiaro",0,"L'obiettivo sono le azioni di miglioramento, non la ricerca del colpevole. E la legge ventiquattro tutela questo processo: gli atti della gestione del rischio non si usano nei giudizi, per favorire segnalazioni sincere."),

 (6,"chiaro",0,"La comunicazione con la famiglia. Si ascolta il figlio e si riconosce la sua preoccupazione: vedere una lesione profonda sul corpo della propria madre e' doloroso."),
 (6,"chiaro",0,"Si comunica l'evento in modo onesto e trasparente, secondo le procedure aziendali, con il medico e, se previsto, con la direzione. Senza promesse, e senza attribuire colpe a colleghi o ad altri servizi."),
 (6,"chiaro",0,"Si informa sul piano di cura, si indicano i canali previsti, come l'URP e la direzione, e si documenta il colloquio. Una comunicazione sincera riduce i conflitti piu' di qualsiasi difesa."),

 (7,"chiaro",0,"La legge otto marzo duemiladiciassette, numero ventiquattro, nota come Gelli-Bianco, che hai visto nella lezione uno punto cinque. Il primo principio: la sicurezza delle cure e' parte del diritto alla salute."),
 (7,"chiaro",0,"Tutte le strutture devono attuare la gestione del rischio clinico. E ci sono centri regionali per la gestione del rischio, e un osservatorio nazionale delle buone pratiche."),
 (7,"chiaro",0,"Trasparenza: la documentazione sanitaria va fornita al paziente che la chiede entro sette giorni, con eventuali integrazioni entro trenta. E ci si attiene alle linee guida del Sistema Nazionale, o alle buone pratiche."),

 (8,"chiaro",0,"E la responsabilita'. Sul piano civile, verso il paziente risponde la struttura. Il dipendente risponde di norma a titolo extracontrattuale, e la struttura puo' rivalersi su di lui solo per dolo o colpa grave."),
 (8,"chiaro",0,"Sul piano penale, l'articolo cinquecentonovanta sexies del codice penale: se l'evento e' dovuto a imperizia, la punibilita' e' esclusa quando si sono rispettate linee guida o buone pratiche adeguate al caso concreto."),
 (8,"chiaro",0,"Ci sono anche l'obbligo di assicurazione, e un tentativo obbligatorio di conciliazione prima di una causa civile. E ricorda il patrocinio legale previsto dal contratto, della lezione dodici punto cinque."),

 (9,"chiaro",0,"Un approfondimento: la documentazione come tutela, della lezione due punto cinque. In giudizio vale una regola dura: cio' che non e' scritto si considera non fatto. Ines e' stata riposizionata, forse: la cartella non lo dimostra."),
 (9,"chiaro",0,"Una documentazione adeguata e' tempestiva, chiara, leggibile, firmata, con data e ora, oggettiva. Per le lesioni da pressione: il rischio all'ingresso e a ogni cambiamento, la prevenzione, i riposizionamenti con orari e posizioni."),
 (9,"chiaro",0,"L'ispezione della cute, le richieste di presidi e i solleciti, l'informazione alla famiglia. E alcune lesioni non sono evitabili, come nell'instabilita' grave o nel fine vita: la documentazione dimostra che la prevenzione c'e' stata."),

 (10,"chiaro",0,"L'infermiere coinvolto. Chi era in turno in quei giorni puo' vivere ansia, colpa, paura del giudizio: e' la condizione di seconda vittima della lezione due punto sei."),
 (10,"chiaro",0,"Non e' solo: ci sono il coordinatore, il risk management, i servizi aziendali di supporto, l'organizzazione sindacale, l'assicurazione, il patrocinio legale previsto dal contratto."),
 (10,"chiaro",0,"Non si rilasciano dichiarazioni improvvisate: si seguono le procedure aziendali. E si continua a lavorare con attenzione: un evento come questo e' anche un'occasione per migliorare il sistema."),

 (11,"chiaro",0,"Le azioni di miglioramento, che nascono dall'analisi. La rivalutazione della Braden a intervalli definiti e a ogni cambiamento, magari con un promemoria nella cartella informatizzata."),
 (11,"chiaro",0,"Una scheda di riposizionamento con orari e posizioni. Un percorso rapido per i presidi antidecubito, con un responsabile e tempi definiti. La formazione dell'equipe, e un'attribuzione chiara agli OSS, con verifica."),
 (11,"chiaro",0,"Gli indicatori, cioe' prevalenza e incidenza delle lesioni e aderenza alla rivalutazione. E un audit di verifica dopo qualche mese: e' il ciclo PDCA della lezione dodici punto sette."),

 (12,"chiaro",0,"Gli errori. Modificare o integrare retroattivamente la cartella. Non segnalare l'evento per paura. Scaricare la responsabilita' su colleghi o altri servizi davanti alla famiglia."),
 (12,"chiaro",0,"Comunicare in modo difensivo o reticente. Trascurare il trattamento della lesione. Documentare in modo generico. Non sollecitare e non documentare le richieste di presidi."),

 (13,"chiaro",0,"[curious] Le domande d'orale. Prima: la legge ventiquattro sulla responsabilita'? La struttura risponde verso il paziente. Il dipendente, di norma, a titolo extracontrattuale, con rivalsa solo per dolo o colpa grave."),
 (13,"chiaro",0,"Sul piano penale, per l'imperizia, la punibilita' e' esclusa se si rispettano linee guida o buone pratiche adeguate al caso. E ci sono l'obbligo di assicurazione e il tentativo di conciliazione."),
 (13,"chiaro",0,"Seconda: come si corregge un errore? Senza cancellare: il testo errato resta leggibile, con la correzione, data, ora, firma e motivazione. E le annotazioni tardive riportano la data reale."),
 (13,"chiaro",0,"Terza: dopo un evento avverso? Prima la cura della persona. Poi la segnalazione, la comunicazione onesta secondo le procedure, la documentazione accurata, e la partecipazione all'analisi delle cause."),

 (14,"chiaro",0,"La risposta modello. Paziente allettata da tre settimane, con una lesione da pressione sacrale di stadio tre, una documentazione carente e il reclamo dei familiari. Priorita': la cura della paziente."),
 (14,"chiaro",0,"Valuto e documento la lesione. Imposto con l'equipe superficie antidecubito, riposizionamento programmato e documentato, medicazione avanzata, nutrizione, controllo del dolore."),
 (14,"chiaro",0,"Non modifico ne' integro retroattivamente la cartella: le annotazioni tardive riportano data e ora reali. Segnalo l'evento, e partecipo all'analisi delle cause."),
 (14,"chiaro",0,"Partecipo a una comunicazione onesta con la famiglia, insieme al medico, senza attribuire colpe. Conosco le tutele della legge ventiquattro e del contratto. E contribuisco alle azioni di miglioramento."),

 (15,"chiaro",0,"I collegamenti: legge ventiquattro, uno punto cinque; documentazione, due punto cinque; rischio clinico, due punto sei; lesioni da pressione, sette punto due; contratto, dodici punto cinque; qualita' e URP, dodici punto sette."),

 (16,"chiaro",0,"E il punto di vista di chi lavora. La documentazione richiede tempo, e quel tempo va riconosciuto nei carichi di lavoro. Servono strumenti che la semplifichino, come schede strutturate e una buona cartella informatizzata."),
 (16,"chiaro",0,"E segnalare le criticita' organizzative, il personale insufficiente, i presidi che non arrivano, e' parte della responsabilita' professionale. La tutela del professionista passa anche dall'organizzazione."),

 (17,"profondo",1.2,"[serious] La frase del caso: la cartella racconta la cura. Va scritta in tempo, e mai riscritta dopo."),

 (18,"chiaro",0,"[warm] Nella prossima lezione chiudiamo il modulo diciassette, e con esso il blocco dei casi clinici: il riepilogo, e sei casi lampo su temi di etica e di responsabilita'. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"Lo scenario",3:"Prima di tutto: la paziente",4:"Che cosa non si deve mai fare",5:"La segnalazione e l'analisi",
 6:"La comunicazione con la famiglia",7:"La legge 24 del 2017: i principi",8:"La legge 24 del 2017: la responsabilita'",
 9:"Approfondimento: la documentazione come tutela",10:"L'infermiere coinvolto",11:"Le azioni di miglioramento",12:"Gli errori da evitare",
 13:"Le domande d'orale",14:"La risposta modello",15:"I collegamenti",16:"Il punto di vista di chi lavora",17:"La frase del caso",18:"Chiusura"}

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
