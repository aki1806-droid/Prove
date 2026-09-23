# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Lezione 1.1 del corso «Progressione verticale · Comparto Sanita'».
# Non c'e' uno script di partenza: il copione e' scritto qui sul nucleo del
# documento di struttura (origine/nucleo.md) — L. 833/1978 e l'universalismo;
# l'esplosione della spesa (5,8% -> oltre 7% del PIL); lottizzazione, ripiano
# dei deficit, moral hazard; Maastricht. Durata: «minimo 7 minuti» (profilo.py).
#
# Forma della lezione, dallo STANDARD del corso: aggancio senza «in questa
# lezione vedremo», rotta in tre punti, corpo, «le tre cose che ti
# chiederanno», chiusura con ponte alla 1.2. Seconda persona singolare,
# frasi corte, un numero alla volta, nessuna formula di cortesia.
# Sigle per esteso nel parlato: Servizio Sanitario Nazionale, unita' sanitarie
# locali (mai «USL», che la voce leggerebbe come parola).
BLOCCHI = [
 (1,"chiaro",0,"[serious] Nel 1978 l'Italia fa una scelta coraggiosa: garantire la salute a tutti i cittadini, qualunque sia il loro lavoro e qualunque sia il loro reddito. Nasce il Servizio Sanitario Nazionale."),
 (1,"chiaro",0,"Quattordici anni dopo, nel 1992, lo Stato scrive una riforma che ne cambia il motore. Non perche' l'idea fosse sbagliata, ma perche' la macchina costruita per realizzarla non reggeva piu'."),
 (1,"profondo",1.2,"Ed e' da qui che parte tutto il modulo. Se non capisci che cosa si era rotto, il decreto 502 ti sembrera' un elenco di articoli. Se lo capisci, ogni sua scelta diventa una risposta."),

 (2,"chiaro",0,"Tre passaggi. Primo: che cosa ha costruito la legge 833. Secondo: perche' la spesa e' andata fuori controllo. Terzo: che cosa ha imposto la svolta del 1992."),

 (3,"chiaro",0,"La legge 833 del 23 dicembre 1978 istituisce il Servizio Sanitario Nazionale. Da' attuazione all'articolo 32 della Costituzione, che tutela la salute come diritto fondamentale dell'individuo."),
 (3,"chiaro",0,"Prima della 833 la sanita' era affidata alle mutue: enti assicurativi divisi per categoria professionale. Chi lavorava era coperto dalla propria cassa, con prestazioni diverse da una mutua all'altra."),
 (3,"chiaro",0,"E chi non lavorava, o lavorava in una categoria debole, restava ai margini. La tutela della salute dipendeva dal contratto di lavoro, non dalla cittadinanza."),
 (3,"chiaro",0,"La 833 rovescia questa logica con tre principi. Il primo e' l'universalita': il servizio copre tutta la popolazione, senza eccezioni."),
 (3,"chiaro",0,"Il secondo e' l'uguaglianza: tutti accedono alle prestazioni a parita' di condizioni, senza distinzioni di condizioni individuali o sociali."),
 (3,"chiaro",0,"Il terzo e' la globalita': il servizio non si limita a curare la malattia. Comprende la prevenzione, la cura e la riabilitazione."),
 (3,"profondo",1.2,"Tre parole da tenere insieme: universalita', uguaglianza, globalita'. Sono l'eredita' della 833 che nessuna riforma successiva ha cancellato."),

 (4,"chiaro",0,"Per realizzare questi principi la legge costruisce un sistema su tre livelli. Lo Stato programma, con il Piano Sanitario Nazionale, e ripartisce le risorse."),
 (4,"chiaro",0,"Le Regioni legiferano e programmano sul proprio territorio. E la gestione concreta dei servizi passa alle unita' sanitarie locali."),
 (4,"chiaro",0,"Ed ecco il punto delicato. Le unita' sanitarie locali non erano enti autonomi: erano strutture operative dei Comuni, singoli o associati, senza una personalita' giuridica propria."),
 (4,"chiaro",0,"A guidarle erano organi espressi dai consigli comunali: l'assemblea generale e il comitato di gestione. In pratica, la direzione della sanita' locale la nominava la politica."),
 (4,"tenue",0,"Il fenomeno ha un nome, e lo troverai nelle dispense: lottizzazione. Gli incarichi venivano spartiti tra i partiti, secondo l'appartenenza piu' che la competenza."),
 (4,"profondo",1.2,"[thoughtful] Il risultato e' una sanita' in cui chi gestisce non risponde dei risultati economici. Risponde a chi lo ha nominato. E questa distanza tra potere e responsabilita' pesa sui conti."),

 (5,"chiaro",0,"Il finanziamento passa per il Fondo Sanitario Nazionale, istituito dalla stessa 833. Lo Stato raccoglie le risorse e le ripartisce tra le Regioni, che le assegnano alle unita' sanitarie locali."),
 (5,"chiaro",0,"Sulla carta il fondo e' un tetto. Nella realta' la spesa corre piu' veloce del fondo, anno dopo anno, perche' nessuno, dentro il sistema, ha un vero interesse a fermarla."),
 (5,"chiaro",0,"E c'e' un secondo difetto: il fondo si ripartiva, di fatto, sulla spesa storica. Chi aveva speso di piu' l'anno prima riceveva di piu' l'anno dopo. Risparmiare non conveniva a nessuno."),
 (5,"chiaro",0,"E intanto la domanda cresce da sola: la popolazione invecchia, la tecnologia medica costa sempre di piu', e ogni nuovo servizio aperto diventa un costo fisso."),
 (5,"chiaro",0,"I numeri lo dicono con chiarezza. La spesa sanitaria pubblica valeva circa il 5,8 per cento del prodotto interno lordo."),
 (5,"chiaro",0,"E arriva a superare il 7 per cento. Detto cosi' sembra poco. Ma ogni punto di prodotto interno lordo vale oltre diecimila miliardi di lire, spesi in piu' ogni anno."),

 (6,"chiaro",0,"Come si copre la differenza tra quello che si spende e quello che il fondo prevede? Con il meccanismo che e' il vero cuore del problema: il ripiano dei disavanzi a pie' di lista."),
 (6,"chiaro",0,"Funziona cosi'. Le unita' sanitarie locali spendono oltre il fondo, e si forma un disavanzo. Periodicamente lo Stato interviene con una legge che copre il debito, a consuntivo."),
 (6,"chiaro",0,"E poi il ciclo ricomincia. Chi aveva speso troppo non subisce nessuna conseguenza, e l'anno dopo ha le stesse ragioni per spendere ancora."),
 (6,"chiaro",0,"Gli economisti chiamano questa situazione azzardo morale, o moral hazard: quando sai che qualcun altro coprira' le tue perdite, smetti di comportarti con prudenza."),
 (6,"chiaro",0,"E' lo stesso meccanismo di chi ha un'assicurazione che rimborsa qualunque spesa, senza limiti: non ha nessun motivo di stare attento a quanto spende."),
 (6,"profondo",1.2,"[serious] Il nodo si riassume in una frase: chi spende non e' chi paga. Le unita' sanitarie locali decidono la spesa, lo Stato la copre. E un sistema cosi' non ha freni."),
 (6,"tenue",0,"Attenzione a un equivoco. Il problema non era l'universalismo, cioe' curare tutti. Era un'organizzazione che separava la decisione di spesa dalla responsabilita' di coprirla."),

 (7,"chiaro",0,"A rendere il problema non piu' rinviabile arriva un vincolo esterno. Il 7 febbraio 1992 l'Italia firma il Trattato di Maastricht, che fissa le condizioni per entrare nella moneta unica."),
 (7,"chiaro",0,"Due parametri su tutti. Il deficit pubblico non deve superare il 3 per cento del prodotto interno lordo. E il debito pubblico deve restare entro il 60 per cento."),
 (7,"chiaro",0,"Nel 1992 il debito pubblico italiano supera il cento per cento del prodotto interno lordo. E' quasi il doppio del limite fissato a Maastricht."),
 (7,"chiaro",0,"Per l'Italia di allora sono obiettivi lontanissimi. E la sanita', con una spesa che cresce da sola e i disavanzi ripianati a pie' di lista, e' una delle voci che piu' li allontanano."),
 (7,"chiaro",0,"Il vincolo europeo trasforma cosi' una questione interna in un obbligo: i conti della sanita' diventano un pezzo dei conti dello Stato da rimettere in ordine."),
 (7,"chiaro",0,"E il 1992 e' un anno di crisi profonda: la lira esce dal Sistema Monetario Europeo, e l'inchiesta Mani Pulite travolge il sistema dei partiti. Anche quello che aveva lottizzato la sanita'."),

 (8,"chiaro",0,"La risposta arriva in due tempi. Prima la legge delega 421 del 23 ottobre 1992: il Parlamento affida al Governo il riordino di sanita', pubblico impiego, previdenza e finanza territoriale."),
 (8,"chiaro",0,"Poi, il 30 dicembre 1992, il decreto legislativo 502: il riordino della disciplina in materia sanitaria. E' il testo su cui e' costruito tutto questo modulo."),
 (8,"chiaro",0,"Sara' corretto l'anno dopo dal decreto legislativo 517 del 1993, e profondamente rivisto nel 1999 dal decreto legislativo 229, la cosiddetta riforma Bindi."),
 (8,"chiaro",0,"Ogni problema che hai visto oggi trova nel 502 una risposta precisa. Alla gestione politica risponde l'azienda. Alla spesa senza freni risponde la responsabilita' di bilancio."),
 (8,"profondo",1.2,"Alla separazione tra chi spende e chi paga risponde un nuovo patto tra Stato e Regioni. Il principio universalistico resta: cambia il modo di governarlo."),

 (9,"chiaro",0,"E ora le tre cose che ti chiederanno. La prima: la legge 833 del 1978 istituisce il Servizio Sanitario Nazionale, fondato su universalita', uguaglianza e globalita'."),
 (9,"tenue",0,"Occhio al distrattore classico: la 833 non crea le aziende sanitarie. Crea le unita' sanitarie locali, strutture operative dei Comuni senza personalita' giuridica."),
 (9,"chiaro",0,"La seconda: il ripiano dei disavanzi a pie' di lista. Lo Stato copriva a consuntivo i debiti delle unita' sanitarie locali, e questo produceva deresponsabilizzazione e azzardo morale."),
 (9,"chiaro",0,"La terza: la sequenza delle norme. Il Trattato di Maastricht, a febbraio del 1992. La legge delega 421, a ottobre. Il decreto legislativo 502, a dicembre."),
 (9,"tenue",0,"E anche qui il distrattore e' sempre lo stesso: invertire la delega e il decreto. Prima viene la legge 421, che delega. Poi il decreto 502, che attua."),

 (10,"profondo",0,"[warm] In sintesi: la 833 ha dato all'Italia un diritto, il 502 ha provato a renderlo sostenibile. Nella prossima lezione il primo strumento di questa riforma: l'aziendalizzazione."),
]

import sys as _sys, pathlib as _pl
_sys.path.insert(0, str(_pl.Path(__file__).resolve().parent.parent))
from profilo import CPS, MAX_CAR_BLOCCO, MAX_SCENE, COPERTINA, CHIUSURA

ACCENTATE = "àèéìòùÀÈÉÌÒÙ"
CAPITOLI = {1:"Aggancio",2:"Rotta",3:"La legge 833",4:"Tre livelli e le USL",
 5:"La spesa",6:"Il ripiano a pie' di lista",7:"Maastricht e il 1992",
 8:"La risposta: 421 e 502",9:"Le tre cose che ti chiederanno",10:"Chiusura"}
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
