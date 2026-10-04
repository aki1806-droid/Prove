# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il modulo dell'emergenza, quello degli algoritmi e dei minuti che contano. Si comincia dall'organizzazione: come funziona il sistema che risponde a una chiamata di soccorso."),
 (1,"chiaro",0,"E come il pronto soccorso decide chi viene visitato prima. Il triage e' un'attivita' infermieristica per eccellenza, e il modello nazionale a cinque codici e' una domanda d'esame quasi certa."),

 (2,"chiaro",0,"Il sistema dell'emergenza territoriale fa capo al centodiciotto. Dove e' attivo il Numero Unico Europeo centododici, una centrale unica risponde a tutte le chiamate e le smista al servizio competente."),
 (2,"chiaro",0,"Sanitario, vigili del fuoco, forze dell'ordine. La centrale operativa sanitaria riceve la chiamata e ne stabilisce la gravita' con un'intervista strutturata: il dispatch."),
 (2,"chiaro",0,"Invia il mezzo adeguato e, se serve, guida chi chiama nelle prime manovre, per esempio la rianimazione cardiopolmonare al telefono: i minuti prima dell'arrivo del mezzo non sono minuti vuoti."),

 (3,"chiaro",0,"I mezzi. Il mezzo di soccorso di base, con soccorritori formati. Il mezzo con infermiere, che in molte realta' applica protocolli avanzati."),
 (3,"chiaro",0,"Il mezzo avanzato con medico, o l'automedica, per i casi in cui servono farmaci e manovre che solo il medico puo' fare. E l'elisoccorso, quando la distanza o il terreno lo richiedono."),
 (3,"chiaro",0,"La centrale decide quale inviare in base al codice di gravita' e alla disponibilita', e spesso li combina: un mezzo di base arriva per primo, un mezzo avanzato lo raggiunge."),

 (4,"chiaro",0,"Il triage intraospedaliero: la funzione con cui, all'arrivo in pronto soccorso, si stabilisce la priorita' di accesso alle cure in base alla gravita', non all'ordine di arrivo."),
 (4,"chiaro",0,"E' svolto da un infermiere con formazione specifica, ed e' regolato dalle Linee di indirizzo nazionali sul triage intraospedaliero."),
 (4,"chiaro",0,"Approvate in Conferenza Stato-Regioni nel duemiladiciannove, hanno introdotto un modello a cinque codici, uguale in tutta Italia: e' il modello che il concorso chiede."),

 (5,"chiaro",0,"I cinque codici, da sapere con numero, colore e tempo. Codice uno, rosso: emergenza, accesso immediato, compromissione delle funzioni vitali."),
 (5,"chiaro",0,"Codice due, arancione: urgenza, entro quindici minuti, rischio di compromissione delle funzioni vitali. E' il codice che non puo' aspettare in sala, anche se il paziente cammina e parla."),
 (5,"chiaro",0,"Codice tre, azzurro: urgenza differibile, entro sessanta minuti. Codice quattro, verde: urgenza minore, entro centoventi minuti."),
 (5,"chiaro",0,"Codice cinque, bianco: non urgenza, entro duecentoquaranta minuti. Il codice azzurro e' la novita' rispetto al vecchio sistema a quattro colori."),

 (6,"chiaro",0,"Le fasi del triage. Uno: la valutazione immediata, il «colpo d'occhio» sulla porta: se ci sono segni di pericolo per la vita, il paziente entra subito con codice uno, senza completare le altre fasi."),
 (6,"chiaro",0,"Due: la valutazione soggettiva, con il sintomo principale e l'intervista: che cosa e' successo, da quando, che cosa e' cambiato. Tre: la valutazione oggettiva, con i parametri vitali, i segni e le scale."),
 (6,"chiaro",0,"Quattro: la decisione di triage, cioe' il codice e il percorso. Cinque: la rivalutazione. Cinque fasi, e la quinta e' quella che si dimentica piu' spesso."),

 (7,"chiaro",0,"La rivalutazione e' una parte essenziale del triage, e i concorsi la chiedono: il codice non e' definitivo."),
 (7,"profondo",1.2,"[serious] Il codice non e' definitivo."),
 (7,"chiaro",0,"I pazienti in attesa vengono rivalutati periodicamente, secondo i tempi previsti, e ogni volta che la loro situazione cambia o che riferiscono un peggioramento."),
 (7,"chiaro",0,"Il codice puo' essere modificato, in aumento o in diminuzione, e ogni modifica si documenta. Un paziente peggiorato in sala d'attesa senza essere rivalutato e' un evento evitabile."),

 (8,"chiaro",0,"Il triage non assegna solo un codice: indirizza a un percorso. Il fast track, che invia direttamente allo specialista i problemi minori e ben definiti, per esempio oculistici."),
 (8,"chiaro",0,"Il see and treat, in cui problemi minori vengono trattati da infermieri formati secondo protocolli: una piccola ferita, una distorsione, senza passare dal medico."),
 (8,"chiaro",0,"E i percorsi tempo-dipendenti: ictus, infarto, trauma, sepsi, in cui il triage attiva subito la catena delle lezioni otto punto uno e otto punto sei."),

 (9,"chiaro",0,"Il sovraffollamento del pronto soccorso, un problema strutturale. Una delle cause principali e' il boarding: pazienti per cui e' gia' stato deciso il ricovero, che restano in pronto soccorso perche' non c'e' un posto letto."),
 (9,"chiaro",0,"Le conseguenze sono documentate: ritardi, piu' eventi avversi, stress del personale, maggiore rischio di aggressioni. Ricordi la Raccomandazione otto."),
 (9,"chiaro",0,"Le strategie: gestione dei posti letto, percorsi alternativi, e il rafforzamento del territorio previsto dal decreto ministeriale settantasette del duemilaventidue."),

 (10,"chiaro",0,"L'OBI, Osservazione Breve Intensiva: un'area del pronto soccorso per i pazienti che richiedono un periodo di osservazione o accertamenti di breve durata prima di decidere se dimetterli o ricoverarli."),
 (10,"chiaro",0,"Per esempio un dolore toracico a basso rischio da sorvegliare con troponine ripetute, o una sincope da osservare qualche ora prima di decidere."),
 (10,"chiaro",0,"Ha una durata limitata, definita dalle indicazioni regionali, e serve a ridurre sia i ricoveri inappropriati sia le dimissioni premature: il tempo, qui, e' uno strumento diagnostico."),

 (11,"chiaro",0,"Esiste anche un triage extraospedaliero: il personale del centodiciotto valuta il paziente sul posto e decide non solo la gravita', ma la destinazione."),
 (11,"chiaro",0,"Il principio e' la centralizzazione: portare il paziente all'ospedale adeguato, che non e' necessariamente il piu' vicino. Qualche minuto di strada in piu' vale un centro che sa cosa fare."),
 (11,"chiaro",0,"Un grave politrauma va al centro traumatologico, un ictus candidato alla trombectomia al centro hub. E l'ospedale di destinazione viene avvisato in anticipo, per prepararsi."),

 (12,"chiaro",0,"Il triage e' un atto infermieristico autonomo, con una responsabilita' professionale diretta, come abbiamo visto nel modulo uno."),
 (12,"chiaro",0,"Per questo la documentazione e' essenziale: orario, parametri, motivazione del codice, rivalutazioni. Il codice si deve poter spiegare, a distanza di mesi, leggendo la scheda."),
 (12,"chiaro",0,"E la comunicazione con chi aspetta: informare sui tempi e sul motivo dell'attesa riduce la tensione. Un'ultima precisazione: il codice di triage non e' una diagnosi, ma una valutazione di priorita'."),

 (13,"chiaro",0,"Il caso. Uomo di cinquantacinque anni, dolore toracico oppressivo da trenta minuti, sudato, pressione centocinquanta su novanta, frequenza novantotto, saturazione novantasei. Quale codice?"),
 (13,"chiaro",0,"Non e' un codice uno, perche' le funzioni vitali sono conservate. Ma e' un codice due, arancione: c'e' un rischio di compromissione delle funzioni vitali."),
 (13,"chiaro",0,"E si attiva il percorso del dolore toracico, con l'ECG entro dieci minuti della lezione otto punto uno: il sudore freddo, in questo caso, pesa quanto i numeri."),
 (13,"chiaro",0,"Assegnare un codice basso perche' «i parametri sono buoni» e' l'errore che la domanda vuole intercettare."),

 (14,"chiaro",0,"In Veneto l'emergenza territoriale e' organizzata nel sistema SUEM centodiciotto, con le sue centrali operative, e i pronto soccorso hanno adottato il triage a cinque codici."),
 (14,"chiaro",0,"I percorsi tempo-dipendenti sono organizzati in rete: infarto, ictus, trauma. E Azienda Zero, l'ente che bandisce il concorso, ha un ruolo di coordinamento regionale anche in questo ambito."),
 (14,"chiaro",0,"All'orale, citare la rete e la centralizzazione e' un ottimo aggancio: dice che conosci il sistema in cui andrai a lavorare, non solo il manuale."),

 (15,"chiaro",0,"La tabella da fotografare. Uno rosso, immediato. Due arancione, quindici minuti. Tre azzurro, sessanta. Quattro verde, centoventi. Cinque bianco, duecentoquaranta."),
 (15,"chiaro",0,"Le fasi: valutazione immediata, soggettiva, oggettiva, decisione e rivalutazione. Il codice non e' definitivo, e non e' una diagnosi. E la centralizzazione verso l'ospedale adeguato, non il piu' vicino."),

 (16,"chiaro",0,"Nella prossima lezione vediamo lo strumento piu' importante di tutto il modulo: l'approccio ABCDE, che serve in pronto soccorso, in reparto, in ambulanza."),
 (16,"chiaro",0,"[warm] E che ti permette di valutare un paziente critico anche quando non sai ancora che cos'ha. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Il sistema dell'emergenza",3:"I mezzi di soccorso",4:"Il triage: che cos'e'",5:"I cinque codici",6:"Le fasi del triage",7:"La rivalutazione",
 8:"I percorsi",9:"Il sovraffollamento",10:"L'OBI",11:"Il triage extraospedaliero",12:"La responsabilita'",13:"Il caso",14:"In Veneto",15:"La tabella",16:"Chiusura"}

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
