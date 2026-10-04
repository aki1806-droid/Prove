# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Le malattie croniche, il diabete, lo scompenso, la BPCO, l'ipertensione, la malattia renale, accompagnano la persona per anni. E la maggior parte della loro gestione avviene a casa, non in ospedale."),
 (1,"chiaro",0,"Il protagonista della cura diventa la persona stessa, che ogni giorno decide che cosa mangiare, quando prendere i farmaci, se muoversi. E il professionista diventa un allenatore."),
 (1,"chiaro",0,"Questa lezione riguarda gli strumenti per farlo: i modelli organizzativi, l'aderenza, il colloquio motivazionale, l'educazione terapeutica e la telemedicina."),

 (2,"chiaro",0,"La cronicita' cresce con l'invecchiamento della popolazione, e molte persone hanno piu' malattie croniche insieme: e' la multimorbidita'. E le malattie croniche assorbono la maggior parte delle risorse sanitarie."),
 (2,"chiaro",0,"Il riferimento nazionale e' il Piano Nazionale della Cronicita' del duemilasedici, che indica un cambio di paradigma."),
 (2,"chiaro",0,"Dalla medicina di attesa, in cui il sistema aspetta che il paziente arrivi quando sta male, alla medicina di iniziativa, in cui il sistema va incontro alla persona prima che si aggravi."),

 (3,"chiaro",0,"Lo strumento operativo e' il PDTA, il Percorso Diagnostico-Terapeutico-Assistenziale. Traduce le linee guida nella realta' organizzativa di un territorio."),
 (3,"chiaro",0,"E definisce chi fa che cosa, quando e dove: quali esami, con quale frequenza, chi li prescrive, chi fa l'educazione, quando si invia allo specialista."),
 (3,"chiaro",0,"Integra ospedale e territorio, medico di medicina generale, specialista e infermiere, e prevede indicatori per misurare i risultati. Ne hai gia' incontrati diversi: diabete, scompenso, BPCO."),

 (4,"chiaro",0,"Il modello teorico di riferimento e' il Chronic Care Model di Wagner, con sei componenti. Uno: le risorse della comunita', cioe' associazioni, palestre, gruppi. Due: l'organizzazione del sistema sanitario."),
 (4,"chiaro",0,"Tre: il supporto all'autogestione, cioe' aiutare la persona a gestire da se' la propria malattia. Quattro: l'organizzazione del team e dell'erogazione dei servizi."),
 (4,"chiaro",0,"Cinque: il supporto alle decisioni cliniche, con le linee guida. Sei: i sistemi informativi clinici, come i registri di patologia."),
 (4,"chiaro",0,"Il risultato atteso e' l'incontro fra un paziente informato e attivo, e un team preparato e proattivo. Due meta' dello stesso lavoro."),

 (5,"chiaro",0,"L'aderenza terapeutica: il grado in cui il comportamento della persona corrisponde alle raccomandazioni concordate. E la parola concordate conta."),
 (5,"chiaro",0,"Secondo l'OMS, nelle malattie croniche circa la meta' dei pazienti non e' pienamente aderente. Le cause: terapie complesse, effetti collaterali, scarsa comprensione, convinzioni personali, costi, deficit cognitivi."),
 (5,"chiaro",0,"Le strategie: semplificare lo schema, perche' meno compresse e meno orari significano meno dimenticanze. Educare, usare ausili come il portapillole settimanale o i promemoria, e coinvolgere il caregiver."),
 (5,"chiaro",0,"E chiedere senza giudicare. Molte persone dimenticano qualche dose, a lei capita? ottiene risposte vere. Prende sempre tutto? no."),

 (6,"chiaro",0,"Cambiare un comportamento, smettere di fumare, muoversi di piu', mangiare diversamente, e' un processo. Il modello di Prochaska e DiClemente lo descrive in fasi."),
 (6,"chiaro",0,"Precontemplazione: la persona non pensa di dover cambiare. Contemplazione: ci pensa, ma e' ambivalente. Determinazione: decide e si prepara. Azione: cambia. E mantenimento."),
 (6,"chiaro",0,"E la ricaduta, che e' una parte normale del processo, non un fallimento. Il punto pratico: l'intervento va adattato alla fase. Dare istruzioni dettagliate a chi e' in precontemplazione non serve."),

 (7,"chiaro",0,"Il colloquio motivazionale: uno stile di colloquio collaborativo, che rafforza la motivazione della persona al cambiamento facendo emergere le sue ragioni."),
 (7,"profondo",1.2,"[serious] Le sue ragioni, non le nostre."),
 (7,"chiaro",0,"Il nemico principale e' il riflesso di correzione: l'impulso del professionista a spiegare, convincere, correggere, che provoca resistenza."),
 (7,"chiaro",0,"Le tecniche si ricordano con l'acronimo OARS: domande aperte, valorizzazioni, ascolto riflessivo, riassunti. E si rinforza il discorso di cambiamento, quando e' la persona a dare ragioni per cambiare."),

 (8,"chiaro",0,"Un esempio. Il riflesso di correzione: deve smettere di fumare, altrimenti la BPCO peggiora. La persona lo sa gia', e probabilmente se l'e' sentito dire cento volte."),
 (8,"chiaro",0,"Lo stile motivazionale: che cosa pensa del fumo, adesso che respira con piu' fatica? E poi un ascolto riflessivo che da' voce all'ambivalenza."),
 (8,"chiaro",0,"Da un lato le piace, dall'altro si preoccupa per il respiro. A quel punto e' la persona a cercare le ragioni per cambiare."),

 (9,"chiaro",0,"L'educazione terapeutica, secondo l'OMS, aiuta la persona ad acquisire le competenze per gestire la propria malattia. E' strutturata, continua e verificata: non un consiglio dato alla dimissione."),
 (9,"chiaro",0,"Si confronta con l'health literacy, l'alfabetizzazione sanitaria: la capacita' di ottenere, comprendere e usare le informazioni sanitarie."),
 (9,"chiaro",0,"Una health literacy bassa e' frequente e spesso nascosta, perche' ci si vergogna di dire che non si e' capito. Le strategie: linguaggio semplice, poche informazioni alla volta, teach-back, materiali con immagini."),

 (10,"chiaro",0,"Il self-care. Una teoria infermieristica molto usata, quella di Riegel, lo descrive in tre dimensioni. Il mantenimento: i comportamenti per restare stabili, cioe' terapia, dieta, attivita' fisica."),
 (10,"chiaro",0,"Il monitoraggio: osservare i propri segni, come peso, glicemia, sintomi. E la gestione: rispondere ai segni quando peggiorano."),
 (10,"chiaro",0,"Lo scompenso della lezione otto punto uno le contiene tutte: farmaci e poco sale, pesarsi ogni giorno, e sapere che cosa fare se il peso aumenta. Molti pazienti fanno le prime due, e non la terza."),

 (11,"chiaro",0,"La telemedicina, nelle sue forme principali. La televisita. Il teleconsulto, fra professionisti. Il telemonitoraggio: peso, pressione, saturazione, glicemia trasmessi a distanza e controllati."),
 (11,"chiaro",0,"E la teleassistenza, in cui l'infermiere segue la persona a distanza. E' regolata da indicazioni nazionali, e sostenuta dagli investimenti del PNRR."),
 (11,"chiaro",0,"I vantaggi: continuita', peggioramenti intercettati prima del ricovero, meno spostamenti. I limiti: competenze digitali, connettivita', privacy, con il GDPR della lezione uno punto sette."),

 (12,"chiaro",0,"Il caso. Un uomo di sessantotto anni con scompenso, al terzo ricovero in un anno. Prende i farmaci quando si ricorda, e non si pesa, perche' tanto non cambia niente."),
 (12,"chiaro",0,"Che cosa fai? Prima di tutto ascolti senza giudicare, e valuti la sua fase del cambiamento e quanto ha capito della malattia. Il terzo ricovero non e' sfortuna: e' un segnale."),
 (12,"chiaro",0,"Poi lavori con il colloquio motivazionale sulle sue ragioni: che cosa vorrebbe poter fare, se stesse meglio? Semplifichi lo schema con il medico, introduci ausili, coinvolgi un familiare."),
 (12,"chiaro",0,"Insegni a pesarsi, e soprattutto che cosa fare se il peso aumenta, verificando con il teach-back. E proponi il telemonitoraggio, o la presa in carico dell'infermiere di famiglia e comunita'."),

 (13,"chiaro",0,"Il Veneto e' stato fra le prime regioni a stratificare la popolazione per rischio e bisogno di cura, con il sistema ACG, per portare la medicina di iniziativa a chi ne ha piu' bisogno."),
 (13,"chiaro",0,"Ha PDTA regionali per le principali malattie croniche, progetti di telemonitoraggio e l'infermiere di famiglia e comunita'. All'orale, stratificazione e medicina di iniziativa sono due parole chiave."),

 (14,"chiaro",0,"La tabella. Piano Nazionale della Cronicita' duemilasedici. Medicina di iniziativa. PDTA: chi, che cosa, quando, dove. Chronic Care Model: sei componenti. Aderenza: circa meta' non aderente."),
 (14,"chiaro",0,"Prochaska: le sei fasi, ricaduta compresa. OARS. Health literacy e teach-back. Self-care: mantenimento, monitoraggio, gestione. Telemedicina nelle sue quattro forme."),

 (15,"profondo",1.2,"[serious] Nella cronicita' il professionista non e' l'eroe della storia. E' l'allenatore."),
 (15,"chiaro",0,"Il protagonista e' la persona, che vive con la sua malattia trecentosessantacinque giorni all'anno. Noi la vediamo per qualche ora."),

 (16,"chiaro",0,"[warm] Nella prossima lezione vediamo dove si svolge tutto questo: il territorio, con il decreto ministeriale settantasette del duemilaventidue."),
 (16,"chiaro",0,"Le Case della Comunita', l'infermiere di famiglia e comunita', e la rete dei servizi veneti, che all'orale conviene saper descrivere. A tra poco."),
]
CAPITOLI = {1:"Apertura",2:"La cronicita' e il Piano nazionale",3:"I PDTA",4:"Il Chronic Care Model",5:"L'aderenza terapeutica",6:"Le fasi del cambiamento",
 7:"Il colloquio motivazionale",8:"Un esempio",9:"Educazione terapeutica e health literacy",10:"Il self-care",11:"La telemedicina",12:"Il caso",
 13:"In Veneto",14:"La tabella",15:"La frase della lezione",16:"Chiusura"}

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
