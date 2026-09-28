# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 8.5 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M8): doveri e responsabilita' disciplinare. Art. 98 Cost.; D.Lgs. 165 art. 53 (incompatibilita',
# autorizzazione), art. 54 (codice di comportamento; c. 3 violazione = illecito disciplinare; c. 5 codice
# dell'amministrazione), D.P.R. 62/2013 artt. 3, 4 (regali, modico valore: 150 euro in via orientativa), 6-7
# (conflitto di interessi, astensione), 11-12; D.P.R. 81/2023 (tecnologie e social, da verificare); art. 55 (c. 2:
# art. 2106 c.c., sanzioni nei contratti, pubblicazione del codice disciplinare), 55-bis (rimprovero verbale al
# responsabile; UPD; segnalazione 10 gg; contestazione entro 30 gg; preavviso 20 gg; conclusione 120 gg; termini
# perentori), 55-ter, 55-quater (licenziamento; c. 3-bis sospensione entro 48 ore), 55-sexies. Scala delle
# sanzioni: CCNL Sanita' (da verificare). Fonti: D.Lgs. 165 al 24/1/2020; D.P.R. 62/2013 originario; dispensa.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un dipendente timbra il cartellino e poi esce per una commissione privata. Un collega se ne accorge e lo dice al coordinatore. Che cosa succede adesso, e in quanto tempo?"),
 (1,"chiaro",0,"Succede un procedimento disciplinare, con tempi e garanzie fissati dalla legge. Ma prima di arrivarci bisogna sapere quali sono i doveri di chi lavora per un'amministrazione pubblica."),
 (1,"profondo",1.2,"Doveri chiari, sanzioni proporzionate, un procedimento con garanzie."),

 (2,"chiaro",0.6,"Quattro passaggi. I doveri del dipendente pubblico. Il codice di comportamento. Le sanzioni disciplinari. E il procedimento, con i suoi termini."),

 (3,"chiaro",0.5,"Tutto parte dalla Costituzione. L'articolo 98 dice che i pubblici impiegati sono al servizio esclusivo della Nazione. Non di un partito, non di un interesse privato."),
 (3,"chiaro",0,"L'articolo 54 del 165 traduce questo principio in doveri: diligenza, lealta', imparzialita' e servizio esclusivo alla cura dell'interesse pubblico."),
 (3,"chiaro",0,"A questi doveri si aggiungono quelli del contratto collettivo: rispettare l'orario, eseguire le disposizioni ricevute, tenere un comportamento corretto con colleghi e utenti."),
 (3,"chiaro",0,"E c'e' la riservatezza: le informazioni conosciute per ragioni d'ufficio non si usano a fini privati, e non si diffondono fuori dai casi previsti."),
 (3,"chiaro",0,"E c'e' l'esclusivita' del rapporto. L'articolo 53 vieta gli incarichi incompatibili, e per gli altri incarichi retribuiti serve l'autorizzazione dell'amministrazione."),
 (3,"chiaro",0.6,"Un esempio: un tecnico di radiologia che vuole fare qualche ora in un centro privato deve chiedere prima l'autorizzazione. Senza, il compenso va restituito all'amministrazione."),
 (3,"tenue",0.8,"Occhio a un distrattore: il divieto non riguarda solo il secondo lavoro fisso. Anche un incarico occasionale retribuito, se non autorizzato, e' una violazione."),
 (3,"profondo",1.2,"Al servizio della Nazione, non di un interesse privato."),

 (4,"chiaro",0.5,"Il codice di comportamento nazionale e' un regolamento del 2013, aggiornato nel 2023. Ogni amministrazione adotta poi un proprio codice, che lo integra e lo specifica."),
 (4,"chiaro",0,"Sui regali la regola e' netta: non si chiedono e non si accettano, salvo quelli d'uso di modico valore, di norma non oltre centocinquanta euro. Mai in cambio di un atto d'ufficio."),
 (4,"chiaro",0,"Sul conflitto di interessi: il dipendente deve astenersi dalle decisioni che coinvolgono interessi propri, di parenti o di persone con cui ha rapporti stretti, e deve comunicarlo."),
 (4,"chiaro",0,"Poi ci sono le regole in servizio e con il pubblico: non ritardare le pratiche, usare con cura i beni e gli strumenti dell'ufficio, rispondere con cortesia e farsi riconoscere."),
 (4,"chiaro",0,"L'aggiornamento del 2023 ha aggiunto regole sull'uso delle tecnologie e dei social: niente dichiarazioni che danneggino l'immagine dell'amministrazione, niente uso privato degli strumenti di lavoro."),
 (4,"chiaro",0,"E soprattutto: violare il codice di comportamento e' fonte di responsabilita' disciplinare. Le violazioni gravi o ripetute possono portare fino al licenziamento."),
 (4,"chiaro",0.6,"Un esempio: un familiare di un paziente offre una bottiglia di vino a Natale, per ringraziare. E' un regalo d'uso di modico valore. Una busta con del denaro, invece, no."),
 (4,"tenue",0.8,"Attenzione: il codice non e' un elenco di buone maniere senza conseguenze. La sua violazione e' un illecito disciplinare."),
 (4,"profondo",1.2,"Un codice che vale ogni giorno, in ogni reparto."),

 (5,"chiaro",0.5,"L'articolo 55 del 165 dice che al pubblico impiego si applica la regola del codice civile: la sanzione deve essere proporzionata alla gravita' dell'infrazione."),
 (5,"chiaro",0,"Il tipo di infrazioni e di sanzioni lo stabiliscono i contratti collettivi, nel codice disciplinare. E pubblicarlo sul sito dell'amministrazione vale come affiggerlo all'ingresso."),
 (5,"chiaro",0,"I contratti possono prevedere una conciliazione, ma non nei casi da licenziamento. E non esistono collegi interni per impugnare le sanzioni: si va dal giudice del lavoro."),
 (5,"chiaro",0,"Le sanzioni vanno per gradi. Il rimprovero verbale, il rimprovero scritto, la multa fino a quattro ore di retribuzione."),
 (5,"chiaro",0,"Poi la sospensione dal servizio senza retribuzione, fino a dieci giorni, e oltre, fino a sei mesi. Infine il licenziamento, con preavviso o senza preavviso."),
 (5,"chiaro",0,"Ci sono casi in cui il licenziamento e' previsto direttamente dalla legge, all'articolo 55 quater. Il primo e' la falsa attestazione della presenza in servizio, anche alterando il sistema di rilevazione."),
 (5,"chiaro",0,"Poi le assenze ingiustificate per piu' di tre giorni in un biennio, le falsita' per ottenere l'assunzione o una progressione, le condotte aggressive o moleste, le condanne penali con interdizione dai pubblici uffici."),
 (5,"chiaro",0,"E ancora le violazioni gravi o ripetute del codice di comportamento, e una valutazione negativa della performance ripetuta per tre anni."),
 (5,"tenue",0.8,"Un distrattore frequente: la sospensione dal servizio non arriva a un anno. Il massimo previsto dai contratti e' di sei mesi."),
 (5,"profondo",1.2,"Una scala di sanzioni, proporzionate alla gravita'."),

 (6,"chiaro",0.5,"Il procedimento e' nell'articolo 55 bis. Per le infrazioni minori, punite con il rimprovero verbale, decide il responsabile della struttura in cui lavora il dipendente."),
 (6,"chiaro",0,"Per tutto il resto c'e' l'ufficio per i procedimenti disciplinari. Il responsabile della struttura gli segnala i fatti subito, e comunque entro dieci giorni."),
 (6,"chiaro",0,"L'ufficio contesta l'addebito per iscritto, subito e comunque entro trenta giorni da quando ha ricevuto la segnalazione o ha avuto piena conoscenza dei fatti."),
 (6,"chiaro",0,"Poi convoca il dipendente per l'audizione a sua difesa, con un preavviso di almeno venti giorni. Il dipendente puo' farsi assistere da un avvocato o da un rappresentante sindacale."),
 (6,"chiaro",0,"La contestazione si invia con la posta elettronica certificata, se il dipendente ne ha una, oppure si consegna a mano o si spedisce con raccomandata."),
 (6,"chiaro",0,"Il procedimento si conclude entro centoventi giorni dalla contestazione, con l'archiviazione o con la sanzione. I termini di contestazione e di conclusione sono perentori."),
 (6,"chiaro",0,"E se il dipendente si trasferisce in un'altra amministrazione, il procedimento non si ferma: prosegue la', con nuovi termini."),
 (6,"chiaro",0,"Per la falsa attestazione della presenza c'e' una corsia rapida: sospensione cautelare senza stipendio entro quarantotto ore da quando il fatto e' noto, e un procedimento accelerato."),
 (6,"chiaro",0.6,"Torniamo al cartellino. Il coordinatore segnala, l'ufficio disciplinare sospende in via cautelare, contesta, ascolta il dipendente. Se il fatto e' provato, si arriva al licenziamento."),
 (6,"chiaro",0,"E il procedimento disciplinare va avanti anche se c'e' un processo penale sugli stessi fatti. Il dirigente che non avvia l'azione disciplinare quando deve, ne risponde a sua volta."),
 (6,"tenue",0.8,"Attenzione: il termine per contestare l'addebito non e' di venti giorni. E' di trenta giorni. I venti giorni sono il preavviso minimo per l'audizione."),
 (6,"profondo",1.2,"Trenta giorni per contestare, centoventi per concludere."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: i doveri sono diligenza, lealta', imparzialita' e servizio esclusivo all'interesse pubblico; gli incarichi esterni vanno autorizzati."),
 (7,"chiaro",0.8,"La seconda: il codice di comportamento e' del 2013, aggiornato nel 2023, e ogni ente ha il suo; regali solo di modico valore; la violazione e' un illecito disciplinare."),
 (7,"chiaro",0.8,"La terza: le sanzioni vanno dal rimprovero verbale al licenziamento; l'ufficio contesta entro trenta giorni, con preavviso di venti per l'audizione, e conclude entro centoventi."),
 (7,"tenue",0.8,"L'ultimo distrattore: il rimprovero verbale non lo decide l'ufficio per i procedimenti disciplinari. Lo decide il responsabile della struttura."),

 (8,"profondo",0,"[warm] In sintesi: doveri chiari, un codice che vale ogni giorno, sanzioni proporzionate e termini certi. Nell'ultima lezione del modulo: performance, mobilita' e lavoro agile."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'I doveri', 4: 'Il codice di comportamento', 5: 'Le sanzioni', 6: 'Il procedimento', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
blocchi=[]
for i,(cap,tema,posa,txt) in enumerate(BLOCCHI, start=2):
    blocchi.append({"id":f"s{i:02d}","capitolo":cap,"tema":tema,"posa":posa,"text":txt})

errori=[]
tot=sum(len(b["text"]) for b in blocchi)
nscene=len(blocchi)+2
if nscene>MAX_SCENE: errori.append(f"scene {nscene} > {MAX_SCENE}")
for b in blocchi:
    if any(c in ACCENTATE for c in b["text"]):
        errori.append(f'{b["id"]}: vocale accentata -> ' + "".join(sorted({c for c in b["text"] if c in ACCENTATE})))
    if len(b["text"])>MAX_CAR_BLOCCO: errori.append(f'{b["id"]}: {len(b["text"])} car, blocco troppo lungo')
tags=sum(len(re.findall(r"\[[a-z]+\]", b["text"])) for b in blocchi)
if tags>6: errori.append(f"tag di intenzione: {tags} > 6")

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
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

# Lo stacco va su un cambio di capitolo. Non il primo DOPO la meta': quello
# vicino alla meta', da una parte o dall'altra. Nella 1.1 del corso PV il
# primo dopo la meta' lasciava la traccia A a 4968 caratteri, a un soffio dal
# tetto di 5000 del servizio di sintesi, e la B a 2809.
acc=0; stacco=None; a=0; migliore=None
for i,b in enumerate(blocchi):
    acc+=len(b["text"])+1
    if i+1<len(blocchi) and b["capitolo"]!=blocchi[i+1]["capitolo"]:
        if migliore is None or abs(acc-tot/2) < abs(migliore[1]-tot/2):
            migliore=(b["id"],acc)
stacco,a=migliore
if a>=5000 or tot-a>=5000: errori.append(f"stacco dopo {stacco}: una traccia supera i 5000 caratteri")
print(f"\nstacco tracce dopo {stacco}:  chunkA {a} car  ·  chunkB {tot-a} car   (limite 5000)")
print("\n" + ("OK, nessun errore" if not errori else "ERRORI:\n  " + "\n  ".join(errori)))
json.dump(blocchi, open("copione/blocchi.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
