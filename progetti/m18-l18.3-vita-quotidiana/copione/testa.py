# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 18.3). Le
# 13 scene di partenza stanno a ~535 caratteri l'una, contro un tetto di 225
# per blocco: ogni scena diventa tre o quattro blocchi, nello stesso ordine.
#
# Il parlato di partenza misura 6.947 caratteri, circa 7.010 con gli
# apostrofi: appena sotto la forchetta del modulo (7.020-7.120 con tredici
# capitoli). Le aggiunte (AGG) vengono dallo schermo dello stesso documento:
# «a portata di mano, tra l'altezza dell'anca e quella della spalla», «il
# rialzo fissato bene». NESSUN fatto nuovo.
#
# Registro del modulo: tecnico e pratico, ogni ausilio legato a un gesto. Tag:
# [warm] in apertura e in chiusura, [thoughtful] sul riepilogo.
#
# Il velo rosa sta sugli errori che i quiz chiedono: beccuccio e cannuccia
# nella disfagia, il presidio piu' assorbente, le traverse multiple.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato. Questa lezione riguarda gli ausili per la vita quotidiana, e parte da un'osservazione che chi lavora sul campo conferma: i piccoli ausili cambiano la giornata piu' dei grandi."),
 (1,"profondo",0,"Una posata con l'impugnatura ingrossata restituisce a una persona il pasto autonomo, che vale, per la dignita', quanto la carrozzina."),
 (1,"chiaro",1.2,"Vediamo alimentazione, vestizione, igiene, bagno, letto e ambiente."),

 (2,"chiaro",0,"Gli ausili per l'alimentazione. Le posate con impugnatura ingrossata o angolata servono a chi ha presa ridotta, tremore o limitazione del polso. Le posate appesantite riducono il tremore."),
 (2,"chiaro",0,"Il piatto con bordo rialzato e base antiscivolo consente di raccogliere il cibo senza spingerlo fuori. Il bicchiere con l'incavo per il naso consente di bere senza estendere il collo, che nella disfagia e' pericoloso."),
 (2,"chiaro",1.2,"Poi bicchieri con manici o con beccuccio, la tovaglietta antiscivolo, e il tagliere con fermo per chi usa una mano sola."),

 (3,"chiaro",0,"Il criterio di scelta per l'alimentazione. Prima si osserva quale gesto non riesce: portare alla bocca? Tagliare? Tenere il piatto fermo? Poi si cerca l'ausilio che compensa quel gesto specifico."),
 (3,"tenue",0,"Due avvertenze che i quiz chiedono. Il bicchiere con beccuccio non e' per tutti: nella disfagia puo' essere rischioso, perche' fa estendere il collo e non controlla il flusso."),
 (3,"tenue",0,"E la cannuccia accelera il flusso, quindi nella disfagia va valutata, come hai visto nel Modulo quattro."),
 (3,"chiaro",1.2,"L'ausilio per l'alimentazione si concorda con il logopedista o il terapista occupazionale."),

 (4,"chiaro",0,"Gli ausili per la vestizione. L'infilacalze e' per chi non si piega o non raggiunge i piedi, dopo una protesi d'anca o con limitazioni del tronco."),
 (4,"chiaro",0,"Il calzascarpe lungo, i lacci elastici, il velcro al posto dei bottoni, l'infilabottoni, il gancio vestitivo per pantaloni e giacche. La pinza prensile a manico lungo raccoglie oggetti da terra senza chinarsi."),
 (4,"chiaro",0,"E gli abiti stessi, che sono il primo ausilio: aperture anteriori, elastici in vita, tessuti morbidi, una taglia in piu'."),
 (4,"profondo",1.2,"Vestirsi da soli con dieci minuti in piu' e' autonomia."),

 (5,"chiaro",0,"Gli ausili per l'igiene personale. La spugna e la spazzola a manico lungo per schiena e piedi senza piegarsi. Il pettine e la spazzola con impugnatura angolata."),
 (5,"chiaro",0,"Lo spazzolino elettrico, o con impugnatura ingrossata, per chi ha presa debole. Il rasoio con impugnatura adattata, il dispenser di sapone a pompa che non richiede di afferrare una saponetta scivolosa."),
 (5,"chiaro",1.2,"Lo specchio inclinabile per chi e' seduto. L'obiettivo e' sempre lo stesso: fare da soli il piu' possibile, con l'operatore che supervisiona e interviene solo dove serve."),

 (6,"profondo",0,"Il bagno e' il luogo di casa con piu' cadute: superfici bagnate, spazi stretti, movimenti complessi come scavalcare la vasca."),
 (6,"chiaro",0,"Gli ausili essenziali. Il tappetino antiscivolo, dentro e fuori la doccia o la vasca. I maniglioni fissati a muro, non quelli a ventosa che si staccano: accanto al WC, nella doccia, alla vasca."),
 (6,"chiaro",0,"La sedia o lo sgabello da doccia, la panca per vasca che consente di entrare da seduti. La doccia a pavimento al posto della vasca, dove possibile."),
 (6,"chiaro",1.2,"E l'ambiente: luce adeguata, niente tappeti scivolosi, niente ostacoli."),

 (7,"chiaro",0,"Il WC. Il rialzo per WC riduce la flessione del ginocchio e dell'anca, e per molti anziani rende di nuovo possibile alzarsi da soli. Il rialzo con braccioli aggiunge un appoggio per alzarsi e sedersi."),
 (7,"chiaro",0,"La comoda e' un WC mobile da tenere accanto al letto, per chi non raggiunge il bagno di notte: molte cadute notturne avvengono nel tragitto verso il bagno."),
 (7,"profondo",1.2,"Si verificano il rialzo fissato bene, l'altezza e la pulizia. E va detto alla persona: la comoda in camera e' un ausilio di sicurezza, non una rinuncia."),

 (8,"chiaro",0,"I presidi per l'incontinenza. Il pannolone a mutandina per chi non si mobilizza o ha incontinenza grave. Il sagomato con mutandina a rete, piu' leggero, per chi si muove."),
 (8,"chiaro",0,"Il pannolino rettangolare per perdite lievi, la traversa per il letto. Il catetere esterno, o condom, per l'uomo. La padella e il pappagallo."),
 (8,"chiaro",0,"La scelta segue il tipo di incontinenza, la mobilita', la cute e la dignita' della persona."),
 (8,"tenue",1.2,"E un errore frequente: il presidio piu' assorbente non e' sempre il migliore. Va cambiato quando serve, non caricato per cambiarlo meno."),

 (9,"chiaro",0,"Le superfici antidecubito, che hai incontrato nel Modulo sette. Il materasso statico, in schiuma, gel o fibra, e' per il rischio basso o medio: distribuisce la pressione."),
 (9,"chiaro",0,"Il materasso dinamico, a pressione alternata o a cessione d'aria, e' per il rischio alto: varia i punti di appoggio. Il cuscino antidecubito per la carrozzina segue lo stesso principio, per la seduta."),
 (9,"chiaro",0,"Il presidio si sceglie in base al rischio valutato con la Braden, e alla mobilita'. Nessun presidio sostituisce i cambi posturali."),
 (9,"tenue",1.2,"E un solo strato tra persona e materasso: le traverse multiple annullano l'effetto."),

 (10,"chiaro",0,"Gli adattamenti dell'ambiente, che sono ausili a tutti gli effetti, e spesso i piu' economici. Si rimuovono tappeti, fili, soglie, oggetti a terra, mobili instabili."),
 (10,"chiaro",0,"Si aggiungono una luce notturna sul percorso tra letto e bagno, corrimano, punti luce. Le altezze: letto, sedie e poltrone ne' troppo bassi ne' troppo alti, con sedute dotate di braccioli."),
 (10,"chiaro",1.2,"Percorsi liberi per deambulatore e carrozzina, con porte di almeno ottanta centimetri. E gli oggetti d'uso frequente a portata di mano, tra l'altezza dell'anca e quella della spalla, per non chinarsi ne' salire."),

 (11,"chiaro",0,"Le barriere architettoniche. Una barriera architettonica e' un ostacolo fisico che impedisce o limita l'accesso: gradini, porte strette, bagni inaccessibili."),
 (11,"chiaro",0,"Le soluzioni sono le rampe, con pendenza massima dell'otto per cento, i montascale, i servoscala, gli ascensori."),
 (11,"chiaro",0,"Esistono contributi pubblici per l'abbattimento delle barriere, previsti dalla legge tredici del millenovecentottantanove."),
 (11,"profondo",1.2,"Al domicilio l'OSS osserva e segnala, perche' la barriera e' esattamente cio' che trasforma il deficit in esclusione, come dice l'ICF. L'assistente sociale e il terapista occupazionale hanno gli strumenti per intervenire."),

 (12,"chiaro",0,"Un professionista da conoscere: il terapista occupazionale. E' il professionista degli ausili per la vita quotidiana e dell'ambiente."),
 (12,"chiaro",0,"Valuta la persona nel suo ambiente e nelle sue attivita', e propone ausili, adattamenti e strategie. L'OSS e' il suo collaboratore naturale, perche' vede ogni giorno che cosa funziona e che cosa no."),
 (12,"chiaro",0,"E riferisce con precisione: con la posata ingrossata mangia da sola, ma il bicchiere lo rovescia."),
 (12,"profondo",1.2,"Questa frase vale piu' di una valutazione in ambulatorio, perche' descrive la vita reale."),

 (13,"chiaro",0,"[thoughtful] Riepiloghiamo. Per l'alimentazione: posate ingrossate, piatto con bordo, bicchiere con incavo, e cautela con beccuccio e cannuccia nella disfagia."),
 (13,"chiaro",0,"Per la vestizione: infilacalze, velcro, pinza, e gli abiti stessi come primo ausilio. Per il bagno: antiscivolo, maniglioni a muro, sedia doccia, rialzo WC, comoda."),
 (13,"chiaro",0,"Per l'incontinenza: il presidio giusto per la persona, non il piu' assorbente. Superfici antidecubito scelte per rischio, con un solo strato, senza sostituire i cambi."),
 (13,"chiaro",0,"E l'ambiente: rimuovere, aggiungere, altezze, percorsi, barriere. [warm] Nella prossima lezione: comunicazione, sensi e tecnologie assistive."),
]

CAPITOLI = {1:"La lezione",2:"L'alimentazione",3:"Il criterio di scelta",
 4:"La vestizione",5:"L'igiene personale",6:"Il bagno",
 7:"Il WC",8:"L'incontinenza",9:"Le superfici antidecubito",
 10:"L'ambiente",11:"Le barriere architettoniche",12:"Il terapista occupazionale",
 13:"Riepilogo"}
