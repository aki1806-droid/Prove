# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
BLOCCHI = [
 (1,"chiaro",0,"[warm] Apriamo il modulo dedicato al paziente chirurgico. L'intervento dura poche ore, ma il percorso comincia giorni prima e finisce settimane dopo, e l'infermiere lo accompagna in ogni tappa."),
 (1,"chiaro",0,"Questa prima lezione da' la cornice: le fasi, i ruoli in sala operatoria, lo strumento di sicurezza piu' importante, la check-list, e un modello che ha cambiato la chirurgia: l'ERAS."),

 (2,"chiaro",0,"Tre fasi. Preoperatoria: dalla decisione di operare fino all'ingresso in sala, con valutazione, preparazione e informazione. Intraoperatoria: dall'ingresso in sala al trasferimento in sala risveglio."),
 (2,"chiaro",0,"Postoperatoria: dal risveglio fino alla ripresa completa, che spesso si conclude a casa. Ogni fase ha i suoi rischi, e molte complicanze del post-operatorio si prevengono nel pre-operatorio."),

 (3,"chiaro",0,"Il blocco operatorio e' organizzato in zone a protezione crescente: dall'area esterna, attraverso i filtri, spogliatoi per il personale e zona di passaggio per i pazienti, alla zona pulita, fino alla sala operatoria."),
 (3,"chiaro",0,"I percorsi del materiale pulito e di quello sporco sono separati, l'accesso e' regolato e si entra solo con l'abbigliamento dedicato: divisa, copricapo, mascherina, calzature del blocco."),
 (3,"chiaro",0,"Ogni ingresso in sala durante l'intervento e' un potenziale rischio infettivo: ridurre il traffico in sala, e il numero di volte in cui la porta si apre, fa parte della prevenzione."),

 (4,"chiaro",0,"Tre ruoli infermieristici. Lo strumentista, che lavora sterile: prepara il tavolo servitore, passa gli strumenti al chirurgo, mantiene l'integrita' del campo sterile e gestisce la conta di garze e strumenti."),
 (4,"chiaro",0,"L'infermiere di sala, o circolante, che non e' sterile: collabora dall'esterno del campo, apre e fornisce i materiali, documenta e spesso coordina la check-list."),
 (4,"chiaro",0,"L'infermiere di anestesia, che collabora con l'anestesista nell'induzione, nel monitoraggio e nel risveglio. Tre competenze diverse, che i concorsi chiedono di saper distinguere."),
 (4,"chiaro",0,"Un distrattore frequente: lo strumentista che apre una confezione dall'esterno, o il circolante che tocca il tavolo servitore. Chi e' sterile tocca solo cio' che e' sterile; chi non lo e', mai."),

 (5,"chiaro",0,"La check-list per la sicurezza in sala operatoria, adottata dal Ministero della Salute a partire da quella dell'OMS. Si articola in tre momenti."),
 (5,"chiaro",0,"Sign in: prima dell'induzione dell'anestesia. Time out: prima dell'incisione della cute. Sign out: prima che il paziente lasci la sala."),
 (5,"chiaro",0,"C'e' un coordinatore della check-list, spesso l'infermiere di sala, che pone le domande ad alta voce e verifica le risposte. Nessun intervento dovrebbe iniziare con un punto in sospeso."),

 (6,"chiaro",0,"Il sign in, prima dell'induzione. Il paziente conferma, quando possibile, identita', sede, procedura e consenso. Si verifica la marcatura del sito."),
 (6,"chiaro",0,"Si controllano l'apparecchiatura di anestesia e il pulsossimetro. Si chiede delle allergie. Si valuta il rischio di vie aeree difficili o di inalazione, e il rischio di perdita ematica, con la disponibilita' di sangue."),

 (7,"chiaro",0,"Il time out, prima dell'incisione: i componenti dell'equipe si presentano, si conferma ad alta voce paziente, sede e procedura, e ciascuno dichiara gli eventi critici previsti."),
 (7,"chiaro",0,"Si verifica che la profilassi antibiotica sia stata somministrata entro sessanta minuti, e che le immagini siano disponibili."),
 (7,"chiaro",0,"Il sign out, prima dell'uscita: si registra la procedura eseguita, si conferma che la conta di garze, aghi e strumenti e' corretta."),
 (7,"chiaro",0,"La conta la fanno insieme strumentista e infermiere di sala, ad alta voce, prima della chiusura di ogni cavita' e alla fine: se non torna, non si chiude finche' il pezzo mancante non si trova."),
 (7,"chiaro",0,"Si verificano l'etichettatura dei campioni, eventuali problemi delle apparecchiature e le indicazioni per il post-operatorio."),

 (8,"chiaro",0,"La check-list mette in pratica due Raccomandazioni ministeriali. La numero due: la ritenzione di garze, strumenti o altro materiale nel sito chirurgico. La numero tre: l'identificazione corretta di paziente, sito e procedura."),
 (8,"chiaro",0,"L'intervento sul paziente sbagliato o sul lato sbagliato e' un evento sentinella: un evento avverso grave, da segnalare e analizzare nelle cause. Marcatura del sito e time out sono le barriere che lo prevengono."),

 (9,"chiaro",0,"La marcatura del sito. La esegue il chirurgo, o chi eseguira' la procedura, preferibilmente con il paziente sveglio e partecipe."),
 (9,"chiaro",0,"Il segno e' chiaro, indelebile, e deve restare visibile dopo la disinfezione e la preparazione del campo."),
 (9,"chiaro",0,"E' necessaria quando esiste una lateralita', destro o sinistro, strutture multiple come le dita, o livelli diversi, come le vertebre."),

 (10,"chiaro",0,"Il modello ERAS, Enhanced Recovery After Surgery: un insieme di interventi basati sulle evidenze che riducono lo stress dell'intervento e accelerano la ripresa."),
 (10,"chiaro",0,"Prima: informazione accurata, niente digiuno prolungato, i liquidi chiari sono consentiti fino a due ore prima, e niente preparazione intestinale di routine."),
 (10,"chiaro",0,"Spesso si aggiunge un carico di carboidrati: una bevanda zuccherina la sera prima e due ore prima dell'intervento, perche' il paziente entri in sala senza il digiuno e la sete di una notte intera."),
 (10,"chiaro",0,"Durante: normotermia, liquidi somministrati in modo mirato, analgesia multimodale con meno oppioidi, profilassi della nausea."),
 (10,"chiaro",0,"Dopo: alimentazione e mobilizzazione precoci, gia' nella giornata dell'intervento o in prima giornata, e rimozione precoce di catetere, sondino e drenaggi."),

 (11,"chiaro",0,"L'ERAS riduce complicanze e durata della degenza, e l'infermiere e' decisivo nel metterlo in pratica: e' lui che gestisce il digiuno, fa alzare il paziente la sera stessa, avvia l'alimentazione, controlla il dolore ed educa."),
 (11,"chiaro",0,"Richiede di abbandonare abitudini radicate, come il digiuno dalla mezzanotte per tutti, o il paziente tenuto a letto per giorni, per sicurezza."),
 (11,"chiaro",0,"Ricordi la sindrome da immobilizzazione della lezione tre punto due: qui trova la sua applicazione chirurgica."),
 (11,"chiaro",0,"E molte misure dell'ERAS coincidono con il bundle contro le infezioni del sito chirurgico della lezione sette punto quattro: normotermia, profilassi entro sessanta minuti, controllo della glicemia."),

 (12,"chiaro",0,"Il percorso perioperatorio e' una sequenza di passaggi: reparto, blocco operatorio, sala risveglio, di nuovo reparto."),
 (12,"chiaro",0,"A ogni passaggio servono consegne strutturate, con lo SBAR della lezione due punto sette, e check-list di trasferimento, con identificazione del paziente ripetuta. E' nei passaggi che le informazioni si perdono."),
 (12,"chiaro",0,"Chi riceve il paziente dalla sala risveglio verifica identita', intervento eseguito, parametri, dolore, drenaggi e medicazione, terapia prescritta: la consegna si prende, non si subisce."),

 (13,"chiaro",0,"Il caso. Al time out il chirurgo vuole procedere senza attendere la conferma della profilassi antibiotica, perche' c'e' fretta. Che cosa fai?"),
 (13,"chiaro",0,"Come coordinatore della check-list segnali che il punto non e' stato verificato, e chiedi di verificarlo prima dell'incisione: la profilassi e' efficace solo se somministrata prima."),
 (13,"chiaro",0,"Se il chirurgo insiste, documenti e segui la procedura aziendale. Non e' un conflitto di persone: e' una barriera di sicurezza che si attiva."),
 (13,"profondo",1.2,"[serious] La check-list esiste proprio per i momenti in cui c'e' fretta."),

 (14,"chiaro",0,"Nelle aziende venete la check-list e' adottata in tutte le sale operatorie, con verifiche sulla sua compilazione, e i percorsi ERAS sono attivi in diverse chirurgie, come la colorettale e l'ortopedica."),
 (14,"chiaro",0,"All'orale, la parola chiave e' sicurezza chirurgica, con la check-list come strumento e le Raccomandazioni due e tre come riferimento."),

 (15,"chiaro",0,"La sintesi. Strumentista sterile, infermiere di sala non sterile. Sign in prima dell'induzione, time out prima dell'incisione, sign out prima dell'uscita."),
 (15,"chiaro",0,"Raccomandazione due: ritenzione. Raccomandazione tre: identificazione. ERAS: liquidi chiari fino a due ore prima, mobilizzazione e alimentazione precoci."),
 (15,"chiaro",0,"E le due frasi da portare all'orale: chi e' sterile tocca solo cio' che e' sterile, e la check-list esiste per i momenti in cui c'e' fretta."),

 (16,"chiaro",0,"[warm] Nella prossima lezione entriamo nel dettaglio della preparazione all'intervento: digiuno, tricotomia, profilassi, gestione della terapia domiciliare e consenso. A tra poco."),
]

CAPITOLI = {1:"Apertura",2:"Le tre fasi",3:"Il blocco operatorio",4:"I ruoli in sala",5:"La check-list",6:"Sign in",7:"Time out e sign out",
 8:"Le Raccomandazioni",9:"La marcatura del sito",10:"Il modello ERAS",11:"Perche' funziona",12:"I passaggi",13:"Il caso",14:"In Veneto",15:"La sintesi",16:"Chiusura"}

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
