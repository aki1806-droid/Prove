# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 17.5,
# l'ultima del modulo). Le 14 scene di partenza stanno a ~545 caratteri l'una,
# contro un tetto di 225 per blocco.
#
# Il parlato di partenza misura 7.636 caratteri: PIU' di quanto stia nei 7:50
# alla velocita' della voce del modulo (16,1-16,9 car/s). Quattordici capitoli
# portano anche una posa in piu' (13 cambi, 15,6 s). La forchetta diventa
# 7.050-7.120 caratteri, e il copione va ASCIUGATO, non arricchito.
#
# Dove si taglia: le ripetizioni. Il quadro del modulo, i distrattori e
# l'autovalutazione dicono tre volte le stesse cose; le liste di segni e di
# decisioni perdono articoli e congiunzioni, non voci. Sul merito giuridico
# (legge 219/2017, sedazione palliativa, eutanasia, suicidio assistito) NON
# si toglie e non si aggiunge niente: le condizioni della Corte Costituzionale
# restano tutte e cinque, nell'ordine del documento.
#
# Tolta una sola affermazione: «le cure palliative sostengono la famiglia
# anche dopo la morte, COME PREVEDE LA LEGGE TRENTOTTO». Il sostegno al lutto
# sta negli standard della rete, non nel testo della legge 38/2010, che parla
# di malato e nucleo familiare. Il parlato tiene il fatto, non il rimando.
#
# Una riformulazione per la voce: «c'e' molto da fare, cambia che cosa» e'
# stato letto come una domanda nella 17.1 (Scribe l'ha trascritto con il punto
# interrogativo). Qui diventa «c'e' molto da fare, e cambia che cosa si fa».
#
# Registro del modulo: sobrio, concreto, mai pietistico. Le scene su sedazione
# ed eutanasia, dice il documento, «lette in modo neutro e preciso; nessuna
# enfasi, nessuna opinione»: nessun tag su quei capitoli.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato all'ultima lezione del Modulo diciassette. Affrontiamo le scelte di fine vita: che cosa la legge consente, e che cosa non consente."),
 (1,"chiaro",0,"Poi il lutto, dei familiari e dell'operatore. E chiudiamo il modulo."),
 (1,"profondo",1.2,"Il criterio di questa lezione e' la precisione: in quest'area le parole hanno conseguenze legali, e circolano confusioni che un operatore non puo' permettersi."),

 (2,"chiaro",0,"Il richiamo alla legge duecentodiciannove del duemiladiciassette, che hai studiato nel Modulo quattordici. Nessun trattamento senza consenso, revocabile in qualunque momento."),
 (2,"chiaro",0,"Nutrizione e idratazione artificiali sono trattamenti sanitari, e possono essere rifiutate. Il medico non e' tenuto a trattamenti contrari a legge, deontologia o buone pratiche."),
 (2,"profondo",1.2,"E nelle fasi finali vale il divieto di ostinazione irragionevole: astenersi da trattamenti inutili o sproporzionati. Questa legge e' il fondamento di tutta la lezione."),

 (3,"chiaro",0,"DAT e pianificazione condivisa, che i quiz chiedono di distinguere. Le DAT si redigono in previsione di una futura incapacita', da persona capace, con un possibile fiduciario, e sono revocabili."),
 (3,"chiaro",0,"La pianificazione condivisa si fa quando la malattia e' gia' in corso, tra persona e medico. Nelle cure palliative e' lo strumento principale."),
 (3,"chiaro",1.2,"Si parla di che cosa la persona vuole e non vuole, prima che non possa piu' dirlo. L'OSS riferisce i desideri che emergono nella quotidianita', ma non li raccoglie formalmente."),

 (4,"chiaro",0,"Le decisioni frequenti nella fase avanzata, prese dal medico con la persona o con chi la rappresenta. Non ricoverare in ospedale. Non rianimare. Non trasferire in terapia intensiva."),
 (4,"chiaro",0,"Sospendere nutrizione o idratazione artificiali. Sospendere terapie non piu' utili. Non eseguire esami che non cambierebbero nulla."),
 (4,"profondo",0,"Non sono abbandono: sono proporzionalita', cioe' adeguare i trattamenti alla condizione reale."),
 (4,"chiaro",1.2,"L'OSS le conosce, perche' sono documentate e condivise con l'equipe. Le rispetta. E non le discute con i familiari, che vanno rinviati al medico."),

 (5,"chiaro",0,"La sedazione palliativa. E' la riduzione intenzionale della coscienza, fino alla sedazione profonda e continua, per controllare un sintomo refrattario, cioe' non trattabile in altro modo."),
 (5,"chiaro",0,"Dolore, dispnea, agitazione, emorragie, nelle ultime fasi. Richiede un sintomo refrattario, il consenso della persona o di chi la rappresenta, la proporzionalita' e la documentazione."),
 (5,"profondo",1.2,"Il punto che i quiz chiedono: non abbrevia la vita. E' un trattamento, previsto dalla legge duecentodiciannove. E non e' eutanasia: cambia l'intenzione, cambia il mezzo, cambia l'esito."),

 (6,"chiaro",0,"Che cosa dice la legge. L'eutanasia, cioe' l'atto che provoca intenzionalmente la morte su richiesta, e' vietata in Italia."),
 (6,"chiaro",0,"Il suicidio assistito, in cui la persona compie l'atto con un aiuto, e' stato dichiarato non punibile dalla Corte Costituzionale nel duemiladiciannove. Ma solo a condizioni precise."),
 (6,"chiaro",0,"Patologia irreversibile, sofferenze intollerabili, dipendenza da sostegni vitali, capacita' di decidere, verifica del servizio sanitario. Non riguarda l'OSS in alcun modo."),
 (6,"profondo",1.2,"E va ripetuto: il rifiuto delle cure e la sedazione palliativa non sono eutanasia."),

 (7,"chiaro",0,"Davanti a una richiesta di morire: vorrei morire, mi aiuti a finirla. Non e' una richiesta da esaudire, e non e' una richiesta da ignorare."),
 (7,"profondo",0,"E' quasi sempre l'espressione di un dolore totale non controllato: fisico, psicologico, sociale o spirituale."),
 (7,"chiaro",0,"Si resta, si ascolta, si chiede che cosa rende insopportabile il presente. E si riferisce subito all'equipe: quasi sempre c'e' qualcosa da fare, un dolore da trattare, un'angoscia da accogliere, un problema da risolvere."),
 (7,"tenue",1.2,"Non si giudica, non si rimprovera, non si cambia discorso."),

 (8,"chiaro",0,"Il lutto dei familiari. E' un processo normale, non una malattia. Ha fasi non lineari: lo shock, la ricerca della persona perduta, la disorganizzazione, la riorganizzazione. Dura mesi, o anni."),
 (8,"chiaro",0,"Le cure palliative sostengono la famiglia anche dopo la morte. E quando il processo si blocca, e' il lutto complicato, e serve aiuto specialistico."),
 (8,"profondo",1.2,"E un dato che pesa sul lavoro dell'OSS: i familiari ricordano per sempre come e' stata trattata la persona negli ultimi giorni. E' li' che si costruisce il loro lutto."),

 (9,"chiaro",0,"Il lutto dell'operatore. Anche l'operatore vive lutti, e in alcune aree molti ogni anno. Un lutto non riconosciuto: nessuno lo nomina, nessun rito, si passa alla persona successiva."),
 (9,"chiaro",0,"L'accumulo produce esaurimento emotivo, distacco, cinismo: e' il burnout, che in quest'area ha un rischio elevato."),
 (9,"chiaro",0,"Che cosa aiuta: nominare le morti che pesano, riti di chiusura anche minimi, parlarne in equipe, i debriefing e la supervisione dove esistono."),
 (9,"profondo",1.2,"Chiedere sostegno e' competenza professionale, non fragilita'."),

 (10,"chiaro",0,"I segni da non ignorare in se' stessi. Irritabilita' crescente, difficolta' a dormire, evitare i pazienti piu' gravi, sentirsi indifferenti, cinismo verso le famiglie, errori di distrazione."),
 (10,"chiaro",0,"Portare il lavoro a casa, senza riuscire a staccare. E sintomi fisici: cefalea, disturbi gastrici, stanchezza persistente."),
 (10,"profondo",1.2,"Vanno riconosciuti e detti: al coordinatore, al medico competente, a un collega di fiducia. Lo stress lavoro correlato e' un rischio valutato e tutelato, come hai visto nel Modulo undici. Qui piu' che altrove."),

 (11,"chiaro",0,"[thoughtful] Il quadro del Modulo diciassette. Prima lezione: le cure palliative sono cura, nelle quattro dimensioni, con la legge trentotto e la rete."),
 (11,"chiaro",0,"Seconda: il dolore totale, la dispnea, il cavo orale, il cibo che si offre e non si forza. Terza: il diritto di sapere e di non sapere, sto morendo, Kübler-Ross, la famiglia."),
 (11,"chiaro",1.2,"Quarta: i segni degli ultimi giorni, il respiro, la constatazione del medico, la salma e i riti. Quinta: la legge duecentodiciannove, la sedazione palliativa distinta dall'eutanasia, il lutto."),

 (12,"tenue",0,"I distrattori tipici. Le cure palliative non sono solo gli ultimi giorni. La legge trentotto riguarda cure palliative e dolore; la duecentodiciannove, consenso, DAT e pianificazione."),
 (12,"tenue",0,"DAT prima, pianificazione condivisa durante. La sedazione palliativa non e' eutanasia, e nemmeno il rifiuto delle cure. Il rantolo non indica sofferenza."),
 (12,"profondo",1.2,"La constatazione compete al medico. E l'OSS non comunica diagnosi, ma non mente: ogni opzione che preveda una bugia rassicurante e' errata."),

 (13,"chiaro",0,"Cinque domande di autovalutazione, con le risposte. Uno: le quattro dimensioni del dolore totale sono fisica, psicologica, sociale e spirituale."),
 (13,"chiaro",0,"Due: la legge trentotto stabilisce il diritto alle cure palliative e alla terapia del dolore, istituisce due reti, e rende obbligatoria la registrazione del dolore."),
 (13,"chiaro",0,"Tre: la sedazione palliativa riduce la coscienza per un sintomo refrattario, e non abbrevia la vita. Quattro: la constatazione del decesso compete al medico."),
 (13,"chiaro",1.2,"Cinque: davanti a sto morendo, non si mente, non si diagnostica. Si resta, si restituisce, si riferisce."),

 (14,"profondo",0,"Hai completato il Modulo diciassette. Il filo che lo tiene insieme e' la frase della prima lezione: c'e' molto da fare, e cambia che cosa si fa."),
 (14,"chiaro",0,"Comfort, presenza, verita' senza crudelta', rispetto dei riti, cura di chi resta. E il tempo accanto alla persona e' assistenza a pieno titolo, non tempo sottratto ad altro."),
 (14,"chiaro",0,"[warm] Nel prossimo modulo bonus cambiamo registro: ausili, presidi e tecnologie assistive. Ci vediamo li'."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA, STACCO

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"L'ultima lezione",2:"La legge 219/2017",3:"DAT e pianificazione",
 4:"Le decisioni frequenti",5:"La sedazione palliativa",6:"Eutanasia e suicidio assistito",
 7:"Una richiesta di morire",8:"Il lutto dei familiari",9:"Il lutto dell'operatore",
 10:"I segni in se' stessi",11:"Il quadro del modulo",12:"I distrattori",
 13:"Autovalutazione",14:"La chiusura"}

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
