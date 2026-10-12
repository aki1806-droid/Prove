# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 17.2). Le
# 13 scene di partenza stanno a ~534 caratteri l'una, contro un tetto di 225
# per blocco: ogni scena diventa tre o quattro blocchi, nello stesso ordine.
#
# Il parlato di partenza misura 6.943 caratteri, piu' della 17.1: le aggiunte
# (AGG) sono quasi nulle. NESSUN fatto nuovo, ne' clinico ne' normativo.
#
# Registro del modulo: sobrio, concreto, mai pietistico. Tag: [warm] in
# apertura e in chiusura, [thoughtful] sul riepilogo.
#
# Due correzioni al copione di partenza:
# - il parlato scrive «Cecily Saunders», lo schermo «Cicely Saunders»: il nome
#   giusto e' Cicely, e il parlato lo segue;
# - «la legge duecentodiciannove» diventa «la legge duecentodiciannove del
#   duemiladiciassette», come sullo schermo dello stesso documento: e' la
#   stessa legge, detta per intero come la 38/2010 nella 17.1.
#
# Il velo rosa sta solo su che cosa NON si fa: e' il contenuto correttivo.
#
# Prima presa della voce: 16,12 car/s netti, il 4,4% piu' lenta della 17.1,
# montato 8:01. Tolte le sette aggiunte che c'erano (268 caratteri, nessuna
# del documento) e rigenerate le due tracce: con ~7.050 caratteri il montato
# sta nei 7:50 sia alla velocita' della prima presa (respiro ~0,15 s) sia a
# quella della 17.1 (respiro ~0,6 s, il tetto).
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. In questa lezione entriamo nei bisogni concreti della persona nella fase avanzata di malattia."),
 (1,"chiaro",0,"E parto da un concetto che ha fondato le cure palliative moderne: il dolore totale. Lo ha descritto Cicely Saunders, che ha aperto il primo hospice moderno."),
 (1,"profondo",1.2,"Il dolore della persona che muore non e' solo fisico. E' fisico, psicologico, sociale e spirituale insieme, e trattare solo la parte fisica non basta."),

 (2,"chiaro",0,"Le quattro dimensioni del dolore totale. Il dolore fisico, prodotto dalla malattia, dai trattamenti, dall'immobilita'. Il dolore psicologico: paura, rabbia, tristezza, perdita di controllo sulla propria vita."),
 (2,"chiaro",0,"Il dolore sociale: la perdita del ruolo, l'isolamento, la preoccupazione per chi resta. E il dolore spirituale: le domande sul senso, sulla colpa, su cio' che resta di se'."),
 (2,"profondo",1.2,"Il punto pratico e' questo: un dolore fisico che non risponde ai farmaci puo' avere radici in una delle altre tre dimensioni. E l'OSS, che sta accanto, spesso le vede."),

 # AGG: «nel Modulo otto», come nella 17.1 (il documento rimanda alla 8.5).
 (3,"chiaro",0,"Il dolore fisico. Lo hai incontrato come quinto parametro vitale, nel Modulo otto: qui diventa il parametro principale. E si rileva regolarmente, non solo su richiesta, perche' molti non lo chiedono."),
 (3,"chiaro",0,"Si usa la scala numerica da zero a dieci, o la scala delle facce. Per chi non comunica ci sono le scale osservazionali: l'espressione del volto, le vocalizzazioni, la postura, la consolabilita'."),
 (3,"chiaro",1.2,"E il dolore si descrive: dove, da quando, come, quanto, che cosa lo peggiora e che cosa lo allevia. E' questa descrizione che permette al medico di adattare la terapia."),

 (4,"chiaro",0,"Che cosa fa l'OSS sul dolore. Rileva e riferisce, in particolare il dolore che compare o che cambia. Osserva l'efficacia della terapia, e riferisce gli effetti riportati, come sonnolenza, nausea, stipsi."),
 (4,"chiaro",0,"Coordina le manovre con la terapia antalgica: si mobilizza quando il farmaco fa effetto, non prima. E usa gli interventi non farmacologici: posizione, calore o freddo su indicazione, ambiente tranquillo, presenza."),
 (4,"tenue",0,"Non modifica la terapia, e non somministra niente di propria iniziativa."),
 (4,"profondo",1.2,"E non dubita mai del dolore riferito. Il dolore e' quello che la persona dice che e'."),

 (5,"chiaro",0,"La dispnea, cioe' la sensazione di respiro difficile, e' uno dei sintomi piu' angoscianti, per la persona e per chi assiste."),
 (5,"chiaro",0,"Che cosa aiuta: la posizione seduta o semiseduta, e una finestra aperta o un ventilatore rivolto verso il viso, che riduce la sensazione di fame d'aria."),
 (5,"chiaro",0,"Un ambiente fresco, abiti non stretti, una presenza calma: l'ansia peggiora il respiro, e il respiro peggiora l'ansia. E lo sforzo si riduce frazionando le attivita'."),
 (5,"profondo",1.2,"Si riferisce sempre, perche' la terapia esiste ed e' efficace. E chi soffre di dispnea non va mai lasciato solo."),

 (6,"chiaro",0,"Tre sintomi frequenti. La nausea: aiutano pasti piccoli e frequenti, cibi freddi, che hanno meno odore, un ambiente senza odori forti. E la segnalazione."),
 (6,"chiaro",0,"La stipsi, molto frequente con i farmaci oppioidi: idratazione, mobilizzazione quando possibile, registrazione delle evacuazioni. E segnalazione, perche' la stipsi non trattata produce dolore e agitazione."),
 (6,"chiaro",0,"La bocca: secchezza e lesioni orali sono costanti nella fase avanzata. Igiene frequente, umettazione, ghiaccio tritato, protezione delle labbra."),
 (6,"profondo",1.2,"La cura del cavo orale e' l'intervento di comfort piu' importante che l'OSS puo' fare."),

 (7,"chiaro",0,"L'astenia e' una stanchezza profonda, che non migliora con il riposo. Si programmano le attivita' nei momenti di maggiore energia, si frazionano, non si insiste."),
 (7,"chiaro",0,"L'anoressia, cioe' la perdita dell'appetito, e' il sintomo che piu' angoscia i familiari. Nella fase avanzata non si alimenta per il fabbisogno: si offre per il piacere."),
 (7,"profondo",0,"Piccole quantita', cibi graditi, nessuna forzatura. E un concetto che aiuta i familiari: il calo dell'appetito non e' la causa del peggioramento. Ne e' un segno."),
 (7,"chiaro",1.2,"Forzare non cambia il decorso, e toglie il poco comfort che resta."),

 (8,"chiaro",0,"Idratazione e nutrizione artificiale. La decisione spetta al medico, insieme alla persona o a chi la rappresenta."),
 (8,"chiaro",0,"Sono trattamenti sanitari, come stabilisce la legge duecentodiciannove del duemiladiciassette, e possono essere rifiutati o sospesi. Nella fase terminale spesso non migliorano il comfort, e talvolta lo peggiorano."),
 (8,"profondo",0,"E un dato che sorprende: la sensazione di sete si tratta con la cura della bocca, non con i liquidi endovena."),
 (8,"chiaro",1.2,"L'OSS riferisce cio' che osserva, sostiene i familiari, che spesso vivono la sospensione con angoscia, e non esprime giudizi sulla decisione."),

 (9,"chiaro",0,"L'agitazione nella fase avanzata ha spesso cause rimovibili: dolore, ritenzione urinaria, stipsi, febbre, effetti dei farmaci. E il delirium, che hai visto nel Modulo sedici, e' frequente nelle ultime settimane."),
 (9,"chiaro",0,"Che cosa aiuta: un ambiente tranquillo, la luce soffusa, la presenza di volti noti, un orientamento gentile, senza insistere."),
 (9,"tenue",0,"Che cosa non si fa: non si contiene, e non si contraddice."),
 (9,"profondo",1.2,"E si riferisce, perche' esiste una terapia. Lasciare l'agitazione non trattata e' una sofferenza evitabile, per la persona e per chi le sta accanto."),

 (10,"chiaro",0,"La cute e il posizionamento. Nella fase avanzata la cute e' fragile, e le lesioni sono frequenti nonostante la prevenzione. L'igiene diventa breve, calda, delicata, fatta nei momenti giusti."),
 (10,"chiaro",0,"Il posizionamento segue il comfort: la posizione che da' sollievo e' quella giusta, anche se non e' quella da manuale. I cambi posturali possono essere meno frequenti, se dolorosi, con superfici antidecubito adeguate."),
 (10,"profondo",1.2,"E va detto, per togliere a chi assiste un senso di colpa frequente: alcune lesioni, nella fase terminale, non sono evitabili. E non sono un fallimento assistenziale."),

 (11,"chiaro",0,"I bisogni psicologici e sociali. Paura, rabbia, tristezza sono emozioni normali, non sintomi da correggere."),
 (11,"chiaro",0,"C'e' il bisogno di controllo: le scelte quotidiane, le informazioni, i tempi. Il bisogno di non essere un peso, che spinge a non chiedere. E il bisogno di sistemare le cose: relazioni, questioni pratiche, saluti."),
 (11,"chiaro",1.2,"L'OSS ascolta. Non consola a tutti i costi, perche' la consolazione frettolosa chiude il discorso. E riferisce all'equipe i bisogni che emergono, perche' molti hanno una risposta."),

 (12,"chiaro",0,"I bisogni spirituali. Spirituale non significa necessariamente religioso: riguarda le domande sul senso, sulla propria vita, su cio' che resta."),
 (12,"chiaro",0,"Il bisogno di riconciliazione, di lasciare qualcosa, di essere ricordati. L'assistenza spirituale e' un diritto, di ogni confessione e di nessuna, e va attivata quando e' richiesta."),
 (12,"profondo",1.2,"L'OSS non ha risposte da dare, e non deve averne. Ma puo' non sfuggire alla domanda: restare, ascoltare, dire che non sa, ma che e' li'. E' spesso tutto cio' che serve."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. Il dolore totale ha quattro dimensioni, e trattare solo quella fisica non basta. Il dolore si rileva regolarmente, si descrive, si riferisce, ed e' quello che la persona dice che e'."),
 (13,"chiaro",0,"La dispnea si allevia con la posizione, l'aria sul viso e la presenza. La stipsi e' frequente con gli oppioidi. E la cura del cavo orale e' l'intervento di comfort piu' importante."),
 (13,"chiaro",0,"Il cibo si offre per il piacere, e la sete si tratta con la cura della bocca."),
 (13,"chiaro",0,"[warm] Nella prossima lezione vediamo la relazione con la persona e con la famiglia."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Il dolore totale",2:"Le quattro dimensioni",3:"Rilevare il dolore",
 4:"Che cosa fa l'OSS sul dolore",5:"La dispnea",6:"Nausea, stipsi, bocca",
 7:"Astenia e anoressia",8:"Idratazione e nutrizione artificiale",
 9:"Agitazione e confusione",10:"La cute e il posizionamento",
 11:"I bisogni psicologici e sociali",12:"I bisogni spirituali",13:"Riepilogo"}

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
