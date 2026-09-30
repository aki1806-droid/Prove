# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 11.2 del corso «Progressione verticale · Comparto Sanita'».
# Nucleo (M11): i principi contabili. D.Lgs. 118/2011 art. 3 e allegato 1 (principi generali o postulati:
# annualita', unita', universalita', integrita', veridicita' attendibilita' correttezza comprensibilita',
# significativita' e rilevanza, flessibilita', congruita', prudenza, coerenza, continuita' e costanza,
# comparabilita' e verificabilita', neutralita', pubblicita', equilibrio di bilancio, competenza finanziaria,
# competenza economica, prevalenza della sostanza sulla forma); allegato 4/2 (competenza finanziaria
# potenziata; accertamento, impegno, esigibilita'; fondo pluriennale vincolato; riaccertamento dei residui;
# fondo crediti di dubbia esigibilita'). Fonti: dispensa su Drive (con correzioni: "unicita'" e' "unita'",
# i principi sono 18); test su Drive; testo vigente da verificare.
BLOCCHI = [
 (1,"chiaro",0.8,"[serious] Un comune firma a dicembre un contratto per rifare una scuola. I lavori dureranno due anni e si pagheranno a stati di avanzamento. In quale bilancio va la spesa?"),
 (1,"chiaro",0,"Non tutta nell'anno della firma. Con il decreto 118 la spesa si imputa agli anni in cui i pagamenti diventano esigibili. Dietro questa scelta ci sono i principi contabili."),
 (1,"profondo",1.2,"I principi dicono come contare, prima ancora di cosa contare."),

 (2,"chiaro",0.6,"Quattro passaggi. I principi che danno forma al bilancio. I principi sulla qualita' dell'informazione. La competenza finanziaria potenziata. E la competenza economica, con l'equilibrio di bilancio."),

 (3,"chiaro",0.5,"I principi contabili generali, detti anche postulati, stanno nel primo allegato al decreto. Sono diciotto, e valgono per tutti gli enti che il decreto armonizza."),
 (3,"chiaro",0,"Il primo e' l'annualita': il bilancio si riferisce a un esercizio che coincide con l'anno solare, dal primo gennaio al trentuno dicembre, anche quando le previsioni sono pluriennali."),
 (3,"chiaro",0,"Il secondo e' l'unita': il bilancio e' uno solo, e il complesso delle entrate finanzia il complesso delle spese, salvo le entrate vincolate per legge a uno scopo preciso."),
 (3,"chiaro",0,"Il terzo e' l'universalita': nel bilancio devono comparire tutte le operazioni dell'ente. Non sono ammesse gestioni fuori bilancio, cioe' fondi che sfuggono ai conti."),
 (3,"chiaro",0,"Il quarto e' l'integrita': entrate e spese si iscrivono per intero, al lordo, senza compensazioni. Non si scrive solo la differenza tra quanto si incassa e quanto si paga."),
 (3,"chiaro",0,"Questi primi quattro principi disegnano la forma del bilancio: dicono che cosa ci deve stare e come ci deve stare, prima ancora di entrare nel merito dei numeri."),
 (3,"chiaro",0.6,"Un esempio: un'azienda paga una fornitura e incassa una penale dallo stesso fornitore. Nel bilancio compaiono due importi distinti, non il saldo fra i due."),
 (3,"tenue",0.8,"Occhio a un distrattore: il principio si chiama dell'unita' del bilancio, non dell'unicita'. Alcune dispense lo scrivono in modo sbagliato."),
 (3,"profondo",1.2,"Un anno, un bilancio, tutte le operazioni, per intero."),

 (4,"chiaro",0.5,"Un secondo gruppo riguarda la qualita' dell'informazione. Veridicita', attendibilita', correttezza e comprensibilita': i conti devono rappresentare la realta', in modo chiaro."),
 (4,"chiaro",0,"Poi la significativita' e la rilevanza: le stime devono essere ragionevoli e l'informazione deve servire a chi decide. E la flessibilita' e la congruita', che adattano mezzi e fini."),
 (4,"chiaro",0,"La prudenza impone di iscrivere le entrate solo se ragionevolmente certe, e le spese anche quando sono solo probabili. Meglio sottostimare le entrate che gonfiarle."),
 (4,"chiaro",0,"La coerenza lega programmazione, previsioni, gestione e rendiconto. La continuita' e la costanza chiedono di non cambiare criteri da un anno all'altro senza una ragione."),
 (4,"chiaro",0,"Vengono poi la comparabilita' e la verificabilita', la neutralita' o imparzialita' di chi redige i conti, e la pubblicita': i documenti contabili vanno resi accessibili."),
 (4,"chiaro",0,"L'ultimo e' la prevalenza della sostanza sulla forma: le operazioni si rappresentano secondo la loro realta' economica, non soltanto secondo la loro veste giuridica."),
 (4,"chiaro",0.6,"Un esempio: un ente cambia il metodo di valutazione delle rimanenze. Deve spiegarlo e renderne conto, altrimenti i bilanci di due anni non sono piu' confrontabili."),
 (4,"tenue",0.8,"Attenzione: i principi generali non sono diciassette, come in alcuni elenchi. Sono diciotto, e l'ultimo e' la prevalenza della sostanza sulla forma."),
 (4,"profondo",1.2,"Numeri veri, chiari, prudenti e confrontabili."),

 (5,"chiaro",0.5,"Il cuore della riforma per gli enti territoriali e' la competenza finanziaria potenziata. Stabilisce quando un'entrata o una spesa entra nei conti, e in quale anno."),
 (5,"chiaro",0,"Le obbligazioni giuridicamente perfezionate si registrano quando nascono, ma si imputano all'esercizio in cui vengono a scadenza, cioe' quando diventano esigibili."),
 (5,"chiaro",0,"Per l'entrata il momento chiave e' l'accertamento: si verifica la ragione del credito, si individua il debitore, si quantifica la somma e si fissa la scadenza."),
 (5,"chiaro",0,"Per la spesa e' l'impegno: si vincola una somma a uno scopo, individuando il creditore, l'importo e la scadenza. Poi vengono la liquidazione, l'ordinazione e il pagamento."),
 (5,"chiaro",0,"Se una spesa e' finanziata oggi ma si paghera' negli anni successivi, le risorse passano da un anno all'altro con il fondo pluriennale vincolato, che ne garantisce la copertura."),
 (5,"chiaro",0,"Entrate accertate e non riscosse diventano residui attivi; spese impegnate e non pagate, residui passivi. Ogni anno i residui si riaccertano, e restano solo quelli ancora dovuti."),
 (5,"chiaro",0,"L'effetto e' che il bilancio non accumula piu' impegni per spese che si faranno chissa' quando: i residui si riducono e i conti si avvicinano alla cassa reale."),
 (5,"chiaro",0.6,"Torniamo alla scuola. Il comune impegna la spesa alla firma, ma la imputa ai due anni dei lavori, secondo gli stati di avanzamento. Il fondo pluriennale porta la copertura."),
 (5,"tenue",0.8,"Un distrattore frequente: con la competenza potenziata la spesa non si imputa tutta all'anno della firma del contratto. Si imputa all'anno in cui diventa esigibile."),
 (5,"profondo",1.2,"Si registra quando nasce, si imputa quando scade."),

 (6,"chiaro",0.5,"Accanto alla competenza finanziaria c'e' la competenza economica: costi e ricavi si attribuiscono all'esercizio in cui si consumano le risorse o si producono i servizi."),
 (6,"chiaro",0,"E' il principio delle aziende sanitarie, che tengono solo la contabilita' economico patrimoniale. Gli enti territoriali la affiancano alla contabilita' finanziaria."),
 (6,"chiaro",0,"Un esempio di competenza economica e' l'ammortamento: un'apparecchiatura che dura dieci anni non pesa tutta sul primo anno, ma si distribuisce sugli anni in cui viene usata."),
 (6,"chiaro",0,"La prudenza ha anche uno strumento preciso: il fondo crediti di dubbia esigibilita'. Accantona risorse per la parte di crediti che, secondo l'esperienza, non si riuscira' a riscuotere."),
 (6,"chiaro",0,"Poi c'e' l'equilibrio di bilancio: le spese correnti vanno coperte da entrate correnti, e gli investimenti da entrate in conto capitale o da debito ammesso dalla legge."),
 (6,"chiaro",0,"Il debito, di regola, puo' finanziare solo investimenti, non la spesa corrente come stipendi e acquisti. Chi chiude in disavanzo deve recuperarlo negli esercizi successivi."),
 (6,"chiaro",0,"Per le aziende sanitarie l'equilibrio e' economico: i costi dell'anno devono trovare copertura nei ricavi e nei contributi assegnati dalla regione."),
 (6,"chiaro",0.6,"Un esempio: un comune accerta multe per un milione, ma ne riscuote di solito il sessanta per cento. Accantona nel fondo la parte che rischia di non incassare."),
 (6,"tenue",0.8,"Attenzione: il fondo crediti di dubbia esigibilita' non e' una spesa da pagare a qualcuno. E' un accantonamento prudenziale, che non si puo' impegnare."),
 (6,"profondo",1.2,"Contare il giusto, e non spendere cio' che non si incassa."),

 (7,"chiaro",0.8,"Le tre cose che ti chiederanno. La prima: i principi contabili generali sono diciotto, nel primo allegato al decreto, dall'annualita' alla prevalenza della sostanza sulla forma."),
 (7,"chiaro",0.8,"La seconda: con la competenza finanziaria potenziata le obbligazioni si registrano quando si perfezionano e si imputano all'esercizio in cui scadono; accertamento per le entrate, impegno per le spese."),
 (7,"chiaro",0.8,"La terza: le aziende sanitarie seguono la competenza economica; il fondo crediti di dubbia esigibilita' e l'equilibrio di bilancio tutelano la prudenza."),
 (7,"tenue",0.8,"L'ultimo distrattore: i residui attivi non sono entrate gia' incassate. Sono entrate accertate e non ancora riscosse alla fine dell'anno."),

 (8,"profondo",0,"[warm] In sintesi: regole comuni per contare nello stesso modo. Nella prossima lezione: i documenti del sistema di bilancio e il piano dei conti integrato."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1: 'Aggancio', 2: 'Rotta', 3: 'I principi della struttura', 4: "I principi della qualita'", 5: 'La competenza finanziaria potenziata', 6: 'Competenza economica ed equilibrio', 7: 'Le tre cose che ti chiederanno', 8: 'Chiusura'}
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
