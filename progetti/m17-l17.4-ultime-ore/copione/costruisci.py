# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 17.4). Le
# 13 scene di partenza stanno a ~526 caratteri l'una, contro un tetto di 225
# per blocco: ogni scena diventa tre o quattro blocchi, nello stesso ordine.
#
# Il parlato di partenza misura 6.841 caratteri, e resta quasi intero: e' la
# lezione piu' delicata del modulo, e il documento la scrive gia' con cura. Le
# aggiunte (AGG) sono poche e marcate. NESSUN fatto nuovo.
#
# Misura del copione: la voce del modulo 17 ha letto fra 16,1 e 16,9 car/s
# netti. Un copione fra 7.050 e 7.150 caratteri sta nei 7:50 a tutte e due.
#
# Registro del modulo: sobrio, concreto, mai pietistico. Sul momento della
# morte (capitoli 6 e 7) il documento chiede niente musica: non ce n'e' in
# tutto il corso. Tag: [warm] in apertura e in chiusura, [thoughtful] sul
# riepilogo, nient'altro.
#
# Il velo rosa sta su che cosa NON si fa: rianimare chi e' in cure palliative,
# dire «e' stata una liberazione», mentire agli altri ospiti.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. Questa lezione affronta le ultime ore di vita, il momento della morte, e la cura della salma."),
 (1,"chiaro",0,"E' la parte del lavoro che nessuno insegna davvero, e che si impara quasi sempre sul campo, spesso male. La affrontiamo con lo stesso criterio di tutto il modulo: il linguaggio della competenza."),
 (1,"profondo",1.2,"Sapere che cosa succede e che cosa fare toglie paura. E la paura e' cio' che piu' spesso allontana l'operatore, proprio quando dovrebbe essere piu' vicino."),

 (2,"chiaro",0,"Gli ultimi giorni hanno segni riconoscibili. Sonnolenza crescente, risposte sempre piu' brevi, periodi di non risposta. Riduzione progressiva di cibo e liquidi, difficolta' a deglutire."),
 (2,"chiaro",0,"Riduzione della diuresi, con urine scure. Cute pallida, estremita' fredde, talvolta marezzate, cioe' con chiazze violacee, spesso a partire dalle gambe."),
 (2,"chiaro",0,"Nessuno di questi segni da solo e' decisivo, ma insieme indicano che la fase finale e' vicina."),
 (2,"profondo",1.2,"Riconoscerli consente due cose: preparare la famiglia, e adattare l'assistenza. E l'OSS, che li vede per primo, li riferisce."),

 (3,"chiaro",0,"Il respiro cambia. Diventa irregolare, con pause anche lunghe seguite da respiri profondi: e' il respiro di Cheyne-Stokes, e il suo nome e' chiesto nei quiz."),
 (3,"chiaro",0,"Compare il rantolo, un rumore prodotto dalle secrezioni che la persona non riesce piu' a eliminare."),
 (3,"profondo",0,"Il punto da sapere, e da dire ai familiari: il rantolo non indica sofferenza della persona. Ma e' molto disturbante per chi ascolta."),
 (3,"chiaro",1.2,"Aiuta la posizione laterale, o il capo ruotato, che fa defluire le secrezioni. Non si aspira di routine, perche' e' invasivo e poco efficace. Ed esiste una terapia, quindi si riferisce."),

 (4,"chiaro",0,"Che cosa fare nelle ultime ore. Il cavo orale si umetta spesso, e le labbra si proteggono. Il posizionamento segue il comfort, con delicatezza, senza cambi inutili."),
 (4,"chiaro",0,"L'ambiente: luce soffusa, una temperatura gradevole, silenzio, oppure cio' che la persona amava, una musica, una voce."),
 (4,"profondo",0,"La presenza: la persona non va lasciata sola. E se i familiari non ci sono, l'operatore resta. Si parla, si tocca, perche' l'udito e il tatto restano fino alla fine."),
 (4,"chiaro",1.2,"E si sospendono le manovre non necessarie: parametri, igiene completa, cambi di biancheria. Non servono piu', e disturbano."),

 (5,"chiaro",0,"Con i familiari nelle ultime ore. Si spiega cio' che accade, con parole semplici: il respiro, il colore, la non risposta. Perche' cio' che non si capisce spaventa."),
 (5,"chiaro",0,"Si danno permessi: di parlare alla persona, di toccarla, di riposare, di restare. Non si prevede l'ora: potrebbero essere ore, o giorni."),
 (5,"chiaro",0,"Non li si lascia soli nella stanza, se non lo desiderano. E si garantisce che riti e desideri siano rispettati."),
 (5,"profondo",1.2,"E una cosa da dire prima, non dopo: a volte la persona muore proprio quando il familiare si allontana. Non e' una colpa."),

 (6,"chiaro",0,"Il momento della morte. I segni sono l'assenza di respiro e di polso, le pupille fisse, il pallore, il rilassamento dei muscoli."),
 (6,"profondo",0,"La constatazione del decesso compete al medico, sempre. L'OSS annota l'ora in cui ha rilevato l'assenza di respiro, e avvisa immediatamente l'infermiere."),
 (6,"tenue",0,"Non inizia manovre di rianimazione, che per una persona in cure palliative non sono previste, e che sarebbero un atto sproporzionato."),
 (6,"profondo",1.2,"Resta con i familiari, se lo desiderano. E non ha fretta: la fretta, in quel momento, e' la cosa piu' violenta che si possa fare."),

 (7,"chiaro",0,"I primi momenti dopo. Si lascia ai familiari il tempo di stare con la persona, senza sollecitare. Non si interviene subito sul corpo: la composizione puo' attendere, e in molte culture deve attendere."),
 (7,"chiaro",0,"Si chiede se desiderano un ministro di culto o un rito, senza presumere. Si offrono gesti semplici: un luogo dove sedersi, un bicchiere d'acqua, una sedia accanto al letto."),
 (7,"tenue",1.2,"Non si dice e' stata una liberazione, anche se lo pensano: possono dirlo loro, non chi assiste. E non si riempie il silenzio."),

 (8,"chiaro",0,"La cura della salma. La composizione rientra tra le attivita' dell'OSS, su indicazione dell'infermiere e secondo la procedura aziendale."),
 (8,"profondo",0,"Con rispetto, delicatezza, riservatezza: la persona resta una persona, anche dopo."),
 (8,"chiaro",0,"Si rimuovono i presidi secondo indicazione, si esegue l'igiene, si chiudono occhi e bocca, si allinea il corpo prima che la rigidita' lo impedisca. Si veste secondo i desideri espressi, o secondo la famiglia."),
 (8,"chiaro",1.2,"Si usano i DPI e le precauzioni standard, perche' il rischio biologico non cessa con la morte. Identificazione corretta, effetti personali inventariati e consegnati."),

 (9,"chiaro",0,"Riti, culture, religioni. Alcune tradizioni prevedono che il corpo non sia toccato da estranei, o non da persone di sesso diverso. Altre prevedono lavaggi rituali, posizioni, oggetti, tempi di attesa."),
 (9,"chiaro",0,"Alcune richiedono la presenza di persone precise. Non si presume: si chiede prima, alla persona quando e' possibile, o alla famiglia. La procedura aziendale prevede spazi per il rispetto dei riti."),
 (9,"profondo",1.2,"In caso di dubbio la regola e' una: si attende e si chiede, non si procede. Un gesto fatto in buona fede puo' essere una ferita irreparabile."),

 (10,"chiaro",0,"Gli aspetti formali. La constatazione e la certificazione del decesso competono al medico. La comunicazione formale ai familiari compete al medico o all'infermiere, non all'OSS, anche se spesso l'OSS e' presente."),
 (10,"chiaro",0,"La documentazione: l'OSS registra cio' che ha fatto, e l'ora in cui ha rilevato l'assenza di respiro. Il trasferimento della salma avviene secondo procedura, con rispetto e discrezione."),
 (10,"chiaro",1.2,"Mai di fretta davanti ad altri assistiti. E le pratiche amministrative non competono all'OSS, che puo' pero' indirizzare la famiglia a chi se ne occupa."),

 (11,"chiaro",0,"Un aspetto spesso trascurato: in struttura, la morte di una persona riguarda anche gli altri ospiti. Il compagno di stanza, i vicini, le amicizie nate in anni di convivenza."),
 (11,"tenue",0,"Hanno diritto di sapere, con delicatezza. Non si nasconde, e non si mente dicendo e' stato trasferito: lo capiscono, e perdono fiducia."),
 (11,"chiaro",1.2,"Si consente un saluto a chi lo desidera. E si osservano le reazioni nei giorni successivi: tristezza, paura per se', agitazione. Ogni morte in struttura ricorda agli altri la propria."),

 (12,"chiaro",0,"E l'operatore. Chi assiste prova emozioni davanti alla morte, ed e' giusto cosi'. Il distacco totale non e' professionalita': e' una difesa, e nel tempo costa cara."),
 (12,"chiaro",0,"Ma anche il coinvolgimento senza confini porta all'esaurimento. Serve un modo per deporre cio' che si e' vissuto: parlarne in equipe, piccoli riti personali di chiusura, i debriefing quando ci sono."),
 (12,"profondo",1.2,"E quando una morte pesa piu' delle altre, per la giovane eta', per la somiglianza con qualcuno, per il modo in cui e' avvenuta, dirlo e' competenza. Non debolezza."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. I segni degli ultimi giorni: sonnolenza, meno cibo e liquidi, diuresi ridotta, estremita' fredde. Il respiro diventa irregolare: e' il respiro di Cheyne-Stokes."),
 (13,"chiaro",0,"Compare il rantolo, che non indica sofferenza e non si aspira di routine. Nelle ultime ore: bocca, comfort, presenza, e nessuna manovra inutile."),
 (13,"chiaro",0,"La constatazione del decesso compete al medico: l'OSS annota l'ora e avvisa. La composizione della salma si fa su indicazione, con rispetto e con i DPI, chiedendo prima dei riti."),
 (13,"chiaro",0,"[warm] Nella prossima lezione: le scelte di fine vita, il lutto dei familiari e quello dell'operatore. E chiudiamo il modulo."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Le ultime ore",2:"Riconoscere la fase finale",3:"Il respiro",
 4:"Che cosa fare nelle ultime ore",5:"Con i familiari",6:"Il momento della morte",
 7:"I primi momenti dopo",8:"La cura della salma",9:"Riti, culture, religioni",
 10:"Gli aspetti formali",11:"Gli altri assistiti",12:"L'operatore",13:"Riepilogo"}

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
