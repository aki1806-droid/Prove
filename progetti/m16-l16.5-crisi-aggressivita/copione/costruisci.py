# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md. Le 13 scene di
# partenza stanno a ~510 caratteri l'una, contro un tetto di 225 per blocco.
# I 13 argomenti restano nell'ordine in cui stanno; cambia il taglio.
#
# Il parlato di partenza misurava 6.631 caratteri. Le aggiunte sono segnate
# AGG e sono il "come": perche' i gradini vanno saputi in ordine, perche' la
# domanda sulla causa viene prima delle tecniche, i rimandi alle lezioni
# precedenti del modulo. NESSUN fatto nuovo — ne' clinico, ne' normativo, ne'
# sulle procedure: questa lezione dice che cosa fare addosso a una persona
# agitata, ed e' l'ultimo posto in cui inventare.
#
# Questa e' la lezione di chiusura del modulo: i capitoli 10, 11 e 12
# ricompongono le quattro lezioni precedenti. I contenuti richiamati sono
# quelli gia' consegnati nelle 16.1-16.4, e si citano con le stesse parole:
# un ripasso che riformula e' un ripasso che confonde.
#
# 47 blocchi, 49 scene: una sotto il tetto. La 16.4 e' finita esatta a 50 e
# ogni ritocco dopo e' diventato un incastro.
#
# Registro del modulo: sobrio e descrittivo. Qui si aggiunge che la paura
# dell'operatore e' reale e va nominata, mai minimizzata — e nemmeno
# drammatizzata.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato all'ultima lezione del Modulo sedici. Affrontiamo la crisi e l'aggressivita', cioe' le situazioni che piu' spaventano chi lavora in quest'area, e poi ricomponiamo il modulo."),
 (1,"profondo",0,"Parto da un dato che ribalta la paura: l'aggressivita' ha quasi sempre segnali precoci. Le esplosioni dal nulla sono molto piu' rare di quanto si pensi."),
 # AGG: che cosa rende questa una competenza e non un tratto caratteriale.
 (1,"chiaro",1.2,"Riconoscere i segnali e' la prima forma di prevenzione, ed e' una competenza che si impara. Non e' questione di coraggio ne' di carattere: e' questione di sapere che cosa guardare, e di guardarlo presto."),

 (2,"chiaro",0,"L'escalation e' un processo a gradini, non un evento improvviso. Primo gradino: la tensione, con irrequietezza, tono di voce alterato, sguardo fisso, mandibola serrata."),
 (2,"chiaro",0,"Secondo: l'agitazione, con il camminare avanti e indietro, gesti ampi, parole dure. Terzo: l'aggressivita' verbale, con minacce, insulti, invasione dello spazio personale."),
 (2,"chiaro",0,"Quarto: l'aggressione fisica. Ogni gradino e' un'occasione di intervento, e piu' si interviene presto piu' l'intervento e' semplice. Il momento migliore e' il primo."),
 # AGG: a che cosa serve saperli in ordine, visto che l'ordine e' il contenuto.
 (2,"profondo",1.2,"Ed e' il motivo per cui i gradini vanno saputi in ordine: servono a collocare quello che si ha davanti. Riconoscere di essere al secondo e non al terzo cambia che cosa si fa nei minuti successivi."),

 (3,"chiaro",0,"La prima domanda da porsi davanti a un'agitazione crescente e' una sola: c'e' una causa rimovibile? Il dolore. Un bisogno non espresso, come sete, bagno, fame, freddo."),
 (3,"chiaro",0,"La paura. Il rumore e la confusione dell'ambiente. Un'attesa troppo lunga senza spiegazioni. Una comunicazione che la persona ha sentito come umiliante."),
 (3,"chiaro",0,"Molto spesso il comportamento e' una richiesta che non trova altra forma. Rimuovere la causa e' l'intervento piu' efficace e il piu' semplice, e spesso basta."),
 # AGG: perche' la domanda viene prima delle tecniche, e non dopo.
 (3,"profondo",1.2,"Ed e' la ragione per cui la domanda viene prima delle tecniche: una tecnica applicata bene sopra un dolore non trattato non fa scendere niente."),

 (4,"chiaro",0,"La de-escalation, cioe' l'insieme delle tecniche per far scendere la tensione. Una sola persona parla, con tono basso e lento e frasi brevi."),
 (4,"chiaro",0,"Si mantiene la distanza di sicurezza, in posizione laterale e non frontale, con le mani visibili. Non si tocca. Non si bloccano le vie d'uscita, ne' le proprie ne' quelle della persona."),
 (4,"chiaro",0,"Si riducono gli stimoli: allontanare gli altri, abbassare luci e rumori. E si offrono scelte: preferisce sedersi o andare in stanza?"),
 # AGG: il rimando alla lezione precedente, che e' lo stesso meccanismo.
 (4,"profondo",1.2,"Una scelta restituisce controllo, e il controllo abbassa la tensione. E' lo stesso meccanismo della lezione sulla relazione: non si ottiene collaborazione esercitando autorita'."),

 (5,"tenue",0,"Che cosa non fare, perche' gli errori in questa fase sono quelli che portano al gradino successivo. Non sfidare, non minacciare, non fare ultimatum."),
 (5,"tenue",0,"Non alzare la voce per farsi sentire: alza la tensione, non l'ascolto. Non contraddire sul contenuto e non mettersi a discutere sul merito."),
 (5,"tenue",1.2,"Non avvicinarsi da dietro, ne' circondare la persona con piu' operatori: viene letto come un accerchiamento. E non promettere cio' che non si puo' mantenere: la promessa non mantenuta sara' la causa della crisi successiva."),

 (6,"profondo",0,"Se la de-escalation non funziona, ci si allontana e si chiama aiuto. Non e' una sconfitta e non e' una rinuncia ad assistere: e' la procedura."),
 (6,"chiaro",0,"E qui vale lo stesso principio del primo soccorso: le cose vanno conosciute prima, perche' durante non c'e' tempo. Dove sono le uscite, come si attiva l'allarme, chi chiamare, qual e' la procedura aziendale."),
 (6,"chiaro",1.2,"La propria sicurezza viene prima, e non per egoismo: un operatore ferito non aiuta nessuno, e un'aggressione subita in silenzio non protegge chi viene dopo."),

 (7,"tenue",0,"Un richiamo necessario. La contenzione non e' una tecnica di de-escalation e non e' una risposta all'aggressivita'."),
 (7,"chiaro",0,"E' una misura eccezionale, che richiede prescrizione medica motivata, temporaneita', sorveglianza continua e documentazione."),
 (7,"profondo",0,"L'OSS non la applica mai di propria iniziativa, in nessun contesto. Anche in SPDC, dove storicamente e' stata piu' usata, valgono tutte le regole della lezione quattordici punto sei."),
 (7,"chiaro",1.2,"E l'orientamento dei servizi e' verso la sua riduzione progressiva, perche' esistono alternative e perche' i rischi sono documentati."),

 (8,"chiaro",0,"Dopo l'evento. Si segnala sempre, anche l'aggressione verbale senza conseguenze fisiche, perche' e' dalle segnalazioni che si costruisce la prevenzione organizzativa."),
 # AGG: il rimando alla 16.2, che e' la stessa regola applicata qui.
 (8,"chiaro",0,"Si descrivono i fatti: cosa, quando, dove, chi era presente, cosa e' stato fatto. E' la stessa regola della seconda lezione del modulo: fatti, non interpretazioni."),
 (8,"chiaro",0,"Poi il debriefing in equipe: che cosa e' successo, che cosa ha funzionato, che cosa cambiare. Con l'approccio della lezione quattordici punto sette: l'evento serve a correggere il sistema, non a trovare un colpevole."),
 # AGG: che cosa costa una segnalazione non fatta, detto dal lato di chi viene dopo.
 (8,"profondo",1.2,"Chi ha subito l'aggressione ha diritto a sostegno, non a un giudizio. E una segnalazione non fatta e' un'informazione che manchera' a chi dovra' evitare la prossima."),

 (9,"chiaro",0,"L'aggressivita' non e' solo un problema individuale: e' un rischio organizzativo, valutato come tale nel Documento di Valutazione dei Rischi, come hai visto nel Modulo undici."),
 (9,"chiaro",0,"Gli ambienti contano: spazi non angusti, vie d'uscita, nessun oggetto pericoloso a portata di mano. L'organizzazione conta: organici adeguati, tempi di attesa comunicati, formazione alla de-escalation."),
 (9,"chiaro",1.2,"E i sistemi di allarme devono essere funzionanti e conosciuti da tutti. Un'aggressione in un servizio senza queste misure e' una condizione latente che si e' manifestata."),

 (10,"chiaro",0,"Il quadro completo del Modulo sedici. Nella prima lezione: la legge centottanta, il TSO con le tre condizioni che devono ricorrere insieme, i servizi DSM, CSM e SPDC, lo stigma e il diagnostic overshadowing."),
 (10,"chiaro",0,"Nella seconda: descrivere fatti e non interpretazioni, delirio contro allucinazione, e il delirium contro la demenza, che e' la distinzione piu' chiesta di tutte."),
 (10,"chiaro",0,"Nella terza: prevedibilita', calma, coerenza, la recovery che non coincide con la guarigione, il rifiuto della terapia che si riferisce e non si forza."),
 (10,"chiaro",1.2,"Nella quarta: la dipendenza come condizione di salute, tolleranza e astinenza, il SerD. E oggi: l'escalation a gradini e la de-escalation."),

 (11,"tenue",0,"I distrattori tipici del modulo, cioe' le trappole su cui si costruiscono i quiz. Delirio e delirium sono cose diverse, e allucinazione e delirio sono cose diverse."),
 (11,"tenue",0,"Sul TSO, le tre condizioni devono ricorrere insieme: ogni opzione che ne richieda una sola e' errata. E la contenzione non e' una tecnica di de-escalation."),
 (11,"tenue",1.2,"Sulle sigle: CSM e' il territorio, SPDC e' l'ospedale, DSM coordina. E l'accesso al SerD e' diretto e gratuito, senza bisogno di impegnativa."),

 (12,"chiaro",0,"Cinque domande di autovalutazione, con le risposte. Uno: quali sono le tre condizioni del TSO? Alterazioni psichiche con urgenza terapeutica, rifiuto degli interventi, impossibilita' di misure fuori dall'ospedale."),
 (12,"chiaro",0,"E devono ricorrere insieme. Due: che differenza c'e' fra delirio e allucinazione? Il delirio e' un'idea falsa, l'allucinazione e' una percezione senza stimolo."),
 (12,"chiaro",0,"Tre: che cos'e' il delirium? Uno stato confusionale acuto, fluttuante, di causa organica e reversibile. Quattro: che cos'e' la recovery? Costruire una vita soddisfacente anche in presenza del disturbo."),
 # AGG: che cosa farsene delle cinque domande, visto che sono un ripasso.
 (12,"chiaro",1.2,"Cinque: qual e' il primo passo davanti all'agitazione? Cercare una causa rimovibile. Se su una di queste cinque hai esitato, e' li' che conviene tornare prima dell'esame."),

 (13,"chiaro",0,"[thoughtful] Hai completato il Modulo sedici, cinque lezioni su un'area in cui molti OSS lavorano. Il filo che le tiene insieme e' uno: la persona prima della diagnosi."),
 (13,"chiaro",0,"Prevedibilita', calma, coerenza e nessun giudizio sono le quattro parole che valgono in ogni situazione vista in queste cinque lezioni."),
 (13,"profondo",0,"E ricorda il dato piu' prezioso che possiedi: sei spesso il primo a notare che non e' come ieri. Riferirlo in tempo puo' cambiare il percorso di una persona."),
 (13,"chiaro",0,"[warm] Nel prossimo modulo bonus affrontiamo le cure palliative, il fine vita e l'accompagnamento. Ci vediamo li'."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"I segnali precoci",2:"L'escalation a gradini",
 3:"La causa rimovibile",4:"La de-escalation",5:"Che cosa non fare",
 6:"Quando ci si allontana",7:"La contenzione",8:"Dopo l'evento",
 9:"La prevenzione organizzativa",10:"Il quadro del modulo",
 11:"I distrattori",12:"Autovalutazione",13:"La chiusura"}

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
for a,b in zip(blocchi, blocchi[1:]):
    if a["capitolo"]!=b["capitolo"] and not a["posa"]:
        errori.append(f'{a["id"]}: chiude il capitolo {a["capitolo"]} senza posa')

pose=sum(b["posa"] for b in blocchi)
parlato=tot/CPS+pose; durata=parlato+COPERTINA+CHIUSURA
print(f"blocchi   {len(blocchi)}        scene {nscene}/{MAX_SCENE}")
print(f"caratteri {tot}      media {tot/len(blocchi):.0f} car/blocco")
print(f"parlato   {parlato:.0f} s     montato {durata//60:.0f}:{durata%60:04.1f}   (stima a {CPS} car/s)")
print(f"tag       {tags}        pose {sum(1 for b in blocchi if b['posa'])} per {pose:.1f} s")
print()
cur=None
for b in blocchi:
    if b["capitolo"]!=cur:
        cur=b["capitolo"]; print(f'  cap {cur:2d}  {CAPITOLI[cur]}')
    p=f'  +{b["posa"]}s' if b["posa"] else ""
    print(f'    {b["id"]}  {len(b["text"]):3d} car  [{b["tema"]:8s}]{p} {b["text"][:50]}...')

acc=0; stacco=None
for b in blocchi:
    acc+=len(b["text"])
    if stacco is None and acc>tot/2: stacco=b["id"]
A=sum(len(b["text"]) for b in blocchi[:[x["id"] for x in blocchi].index(stacco)+1])
print(f"\nstacco tracce dopo {stacco}:  chunkA {A} car  ·  chunkB {tot-A} car   (limite 5000)")

# Lo stacco che conta e' quello dichiarato in profilo.py, non quello suggerito
# qui: il suggerimento divide a meta' i caratteri, la scelta la fa chi scrive e
# va su un cambio di capitolo. I due file di testo finora si scrivevano a mano,
# ed e' il passaggio in cui lo stacco della lezione precedente sopravvive senza
# che nessun controllo se ne accorga — i conti tornano tutti, sui blocchi
# sbagliati. Quindi li scrive questo script, dallo STACCO dichiarato.
ids = [b["id"] for b in blocchi]
if STACCO not in ids:
    errori.append(f"STACCO «{STACCO}» non e\' un blocco di questa lezione")
else:
    k = ids.index(STACCO) + 1
    if blocchi[k-1]["capitolo"] == blocchi[k]["capitolo"]:
        errori.append(f"STACCO «{STACCO}» cade dentro il capitolo "
                      f"{blocchi[k]['capitolo']}, non a un cambio")
    if STACCO != stacco:
        print(f"  (STACCO dichiarato {STACCO}, il mezzo dei caratteri cade a {stacco})")

if errori:
    print("\nERRORI:"); [print("  -",e) for e in errori]; sys.exit(1)
qui = _pl.Path(__file__).parent
json.dump(blocchi, open(qui/"blocchi.json","w",encoding="utf-8"),
          indent=1, ensure_ascii=False)

k = ids.index(STACCO) + 1
for nome, parte in (("chunkA", blocchi[:k]), ("chunkB", blocchi[k:])):
    testo = " ".join(b["text"] for b in parte)
    (qui/f"{nome}.txt").write_text(testo + "\n", encoding="utf-8")
    print(f"{nome}.txt  {len(testo)} car  ({parte[0]['id']}-{parte[-1]['id']})")

print("\nOK, nessun errore")
