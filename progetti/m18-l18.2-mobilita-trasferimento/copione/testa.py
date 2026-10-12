# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 18.2). Le
# 13 scene di partenza stanno a ~520 caratteri l'una, contro un tetto di 225
# per blocco: ogni scena diventa tre o quattro blocchi, nello stesso ordine.
#
# Il parlato di partenza misura 6.785 caratteri, circa 6.850 con gli
# apostrofi: sotto la forchetta del modulo (7.020-7.120 con tredici capitoli).
# Le aggiunte (AGG) vengono dallo schermo dello stesso documento: l'elenco
# degli ausili della scena 1, «ancora» per chi si muove da solo, le verifiche
# della carrozzina e del letto come le scrive lo schermo, ganci e due operatori
# nel riepilogo, il titolo intero della lezione dopo. NESSUN fatto nuovo.
#
# Registro del modulo: tecnico e pratico. Questa e' la lezione piu' tecnica:
# misure, lati, ordini di manovra. Tag: [warm] in apertura e in chiusura,
# [thoughtful] sul riepilogo.
#
# Il velo rosa sta sugli errori: le pedane abbassate, il sollevatore, i
# distrattori.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. Questa lezione e' la piu' tecnica del modulo: gli ausili per la mobilita' e il trasferimento."),
 (1,"chiaro",0,"Bastoni, deambulatori, carrozzine, ausili minori, sollevatori, letti. Sono quelli che l'OSS usa ogni giorno, e sono quelli con cui si fanno piu' errori, perche' si usano per abitudine."),
 (1,"profondo",1.2,"Li vediamo in ordine crescente di supporto, dal bastone al sollevatore, con un criterio costante: l'ausilio giusto per il livello di autonomia giusto, verificato ogni volta."),

 (2,"chiaro",0,"Il bastone serve a chi ha un lieve deficit di equilibrio o di forza su un lato."),
 (2,"chiaro",0,"L'altezza giusta: con il braccio disteso lungo il fianco, l'impugnatura arriva al polso, cosi' che il gomito resti leggermente flesso. Si tiene dal lato sano e avanza insieme alla gamba debole, scaricandola."),
 (2,"chiaro",0,"Tripode e quadripode hanno una base piu' ampia, quindi piu' stabilita' ma piu' ingombro, e servono a chi ha bisogno di appoggio maggiore."),
 (2,"chiaro",1.2,"Si verificano il puntale di gomma, che consumato scivola, l'altezza regolata e l'impugnatura salda."),

 (3,"chiaro",0,"I deambulatori. Il deambulatore fisso, a quattro puntali, si solleva e si avanza: da' la massima stabilita', ma richiede forza nelle braccia."),
 (3,"chiaro",0,"Quello a due ruote anteriori si spinge senza sollevarlo, ed e' per chi non riesce a sollevare il fisso. Il rollator, a quattro ruote, con freni e seduta, e' per chi cammina ma si affatica e ha bisogno di sedersi."),
 (3,"chiaro",1.2,"I freni vanno controllati sempre. L'altezza e' quella del polso, come per il bastone. E la persona sta dentro il deambulatore, non dietro: dietro si sbilancia in avanti."),

 (4,"chiaro",0,"Le carrozzine. La carrozzina manuale puo' essere ad autospinta, con le ruote grandi che la persona muove da sola, o da transito, con le ruote piccole, spinta da altri."),
 (4,"chiaro",0,"La carrozzina elettrica e' per chi ha autonomia decisionale ma non forza fisica. La carrozzina basculante ha schienale e seduta che si reclinano insieme, per posture complesse e scarico della pressione."),
 (4,"chiaro",0,"Gli elementi da conoscere: freni, pedane, braccioli estraibili, cintura, cuscino antidecubito."),
 (4,"profondo",1.2,"E un principio: la carrozzina e' una seduta, non un letto. Il tempo in carrozzina va limitato."),

 (5,"chiaro",0,"La carrozzina: uso corretto. Prima di ogni trasferimento i freni vanno inseriti, le pedane sollevate o rimosse, i braccioli estratti se necessario."),
 (5,"tenue",0,"Il trasferimento con le pedane abbassate e' causa frequente di caduta."),
 (5,"chiaro",0,"La posizione corretta: bacino in fondo alla seduta, piedi sulle pedane, schiena appoggiata. Se la persona scivola in avanti ci sono rischio di caduta e forze di taglio: si riposiziona."),
 (5,"chiaro",1.2,"In discesa si procede all'indietro. Gradini e marciapiedi richiedono una tecnica specifica, e non si improvvisano. Si verificano pressione delle ruote, freni efficaci e cuscino in posizione."),

 (6,"chiaro",0,"Gli ausili minori per il trasferimento, i piu' utili e i meno usati. La tavola di scivolamento consente il passaggio tra superfici allo stesso livello a chi controlla il tronco."),
 (6,"chiaro",0,"Il telo ad alto scorrimento consente il riposizionamento nel letto senza trascinare: elimina la frizione, e protegge cute e schiena. Il disco girevole ruota la persona in piedi senza torsione."),
 (6,"chiaro",1.2,"La cintura di trasferimento da' una presa sicura all'operatore, e sostituisce la presa sotto le ascelle, che e' pericolosa. Maniglia, scaletta e trapezio servono a chi si muove ancora da solo."),

 (7,"chiaro",0,"I sollevatori. Il sollevatore passivo, a imbracatura, e' per chi non collabora o non ha carico sugli arti: solleva tutto il peso."),
 (7,"chiaro",0,"Il sollevatore attivo, a stazione eretta, e' per chi ha carico sugli arti inferiori e tiene il tronco: aiuta ad alzarsi mantenendo le capacita' residue."),
 (7,"chiaro",0,"Il sollevatore a soffitto scorre su binario, e ha meno ingombro. L'imbracatura deve essere della misura e del tipo corretti, integra, agganciata su tutti i punti."),
 (7,"profondo",1.2,"Si opera in due quando previsto, con batteria carica, freni, e rispettando la portata massima."),

 (8,"tenue",0,"Gli errori frequenti con il sollevatore, che sono causa di incidenti gravi. L'imbracatura di misura sbagliata o logora, che produce scivolamento e lesioni. I ganci non tutti agganciati, che producono cadute."),
 (8,"tenue",0,"La persona agitata o che non vuole: si rinvia, non si forza, come hai visto nel Modulo sedici. Usare il sollevatore per spostarsi nei corridoi: non e' un mezzo di trasporto."),
 (8,"tenue",1.2,"Lasciare la persona sospesa piu' del necessario. E non spiegare la manovra: il sollevamento spaventa, e una persona spaventata si irrigidisce o si agita."),

 (9,"chiaro",0,"I letti. Il letto articolato ha testata e pediera regolabili, per posizioni di comfort, di respiro, di alimentazione."),
 (9,"chiaro",0,"Il letto ad altezza variabile si tiene in basso per la sicurezza della persona, e si alza per la schiena dell'operatore durante le manovre: usarlo sempre basso costa la schiena."),
 (9,"chiaro",0,"Le sponde sono protezione, non contenzione: l'uso a scopo contenitivo richiede indicazione, come nel Modulo quattordici."),
 (9,"chiaro",1.2,"Il letto basso e' l'alternativa alle sponde per chi e' a rischio di caduta. Si verifica che i comandi funzionino, che le ruote siano frenate e le sponde integre."),

 (10,"chiaro",0,"Abbinare ausilio e persona, che e' la domanda tipica dei quiz. Chi cammina con lieve instabilita' usa il bastone. Chi cammina ma ha bisogno di appoggio bilaterale usa il deambulatore."),
 (10,"chiaro",0,"Chi cammina ma si affatica usa il rollator. Chi non cammina ma si trasferisce da solo usa la carrozzina con la tavola di scivolamento."),
 (10,"chiaro",0,"Chi si alza con aiuto e tiene il tronco usa il sollevatore attivo. Chi non collabora e non ha carico usa il sollevatore passivo."),
 (10,"profondo",1.2,"La valutazione e' dell'equipe; l'OSS verifica ogni giorno che sia ancora attuale."),

 (11,"chiaro",0,"La verifica prima dell'uso si fa ogni volta, non una volta al mese. Integrita': ruote, freni, puntali, imbracature, cinghie, comandi. Funzionamento: la batteria, i movimenti, i blocchi."),
 (11,"chiaro",0,"Idoneita': e' l'ausilio di questa persona, della misura giusta, per questa manovra? Pulizia: e' stato sanificato dopo l'uso precedente?"),
 (11,"chiaro",0,"Se qualcosa non va, non si usa, si segnala e si ricorre all'alternativa."),
 (11,"profondo",1.2,"Un sollevatore con la batteria scarica a meta' manovra e' un'emergenza evitabile con trenta secondi di verifica."),

 (12,"tenue",0,"I distrattori tipici. Il bastone si tiene dal lato sano, non dal lato debole. La persona sta dentro il deambulatore, non dietro."),
 (12,"tenue",0,"Le pedane vanno alzate prima del trasferimento, e in discesa si va all'indietro. La cintura di trasferimento sostituisce la presa ascellare, che e' pericolosa."),
 (12,"tenue",1.2,"Il sollevatore attivo e' per chi ha carico e tiene il tronco, il passivo per chi non collabora: i quiz li invertono. E le sponde non sono contenzione, salvo che vengano usate a scopo contenitivo."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. Il bastone si regola al polso e si tiene dal lato sano; nel deambulatore si sta dentro; il rollator ha freni da controllare."),
 (13,"chiaro",0,"La carrozzina richiede freni, pedane e posizione corretta, ed e' una seduta, non un letto. Tavola, telo, disco e cintura eliminano frizione e torsione."),
 (13,"chiaro",0,"Il sollevatore attivo e' per chi ha carico, il passivo per chi non collabora, con imbracatura giusta, ganci agganciati, portata rispettata e due operatori quando previsto."),
 (13,"chiaro",0,"I letti ad altezza variabile proteggono la schiena; le sponde non sono contenzione. [warm] Nella prossima lezione: gli ausili per la vita quotidiana, il bagno, il letto e l'ambiente."),
]

CAPITOLI = {1:"La lezione",2:"Bastoni e tripodi",3:"I deambulatori",
 4:"Le carrozzine",5:"La carrozzina: uso corretto",6:"Gli ausili minori",
 7:"I sollevatori",8:"Il sollevatore: errori",9:"I letti",
 10:"Abbinare ausilio e persona",11:"La verifica prima dell'uso",12:"I distrattori",
 13:"Riepilogo"}
