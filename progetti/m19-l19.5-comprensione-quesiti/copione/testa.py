# -*- coding: utf-8 -*-
"""Costruisce blocchi.json dal copione riscritto e verifica i vincoli del MASTER."""
import json, re, sys

# (capitolo, tema slide, posa in secondi, testo parlato)
#
# Riscrittura del copione in origine/copione-di-partenza.md (lezione 19.5:
# comprensione dei testi, diciotto quesiti risolti, riepilogo del modulo e
# chiusura del corso). Le 13 scene di partenza stanno a ~550 caratteri l'una.
#
# La pausa per provare. Le note di produzione chiedono, per le scene 3-8, una
# pausa di tre secondi dopo ogni quesito, prima della risposta. Qui e' la posa
# del blocco: ogni quesito chiude un blocco con posa 3, e la risposta apre il
# blocco dopo, insieme al quesito successivo. Cosi' i diciotto quesiti stanno
# in 23 blocchi invece di 36, e la slide di ogni blocco mostra il quesito
# appena risolto e quello aperto.
# Per i quesiti 16-18 la voce di partenza da' la risposta di seguito, senza
# lasciare il tempo di provare: diventano «... Che cosa significa?» + posa.
#
# Il numero dei quesiti. Lo schermo e la voce della scena 1 dicono «dodici
# quesiti»; le scene 4-8 ne contengono diciotto, e le scene 9 e 10 dicono
# diciotto. Si dice diciotto.
#
# Ritocchi per la voce, dalle lezioni precedenti: nessuna «e» seguita da un
# termine inglese, che fa passare la voce all'inglese («and»). «present simple
# e continuous» diventa «present simple, present continuous»; «Never e always
# rovesciano la frase» diventa «Never, always: rovesciano la frase»; «E poi
# costruisci» diventa «Poi costruisci».
# Due aggiunte di sola traduzione, come le altre domande: «La temperatura era
# alta?» (quesito 6) e «in the room» (quesito 14, dallo schermo).
#
# Registro del modulo: rassicurante e pratico. Tag: [warm] in apertura e in
# chiusura del corso, [thoughtful] sul quadro del modulo. I blocchi che danno
# una risposta mostrano il quesito risolto, quindi stanno sul chiaro: le
# opzioni chiare sul verde pieno non si leggono.
BLOCCHI = [
 (1,"chiaro",0,"[warm] Bentornata e bentornato all'ultima lezione del Modulo diciannove, che e' anche l'ultima lezione di tutto il corso. Ascoltala con carta e penna."),
 (1,"profondo",1.2,"Qui mettiamo insieme il metodo per i testi di comprensione, diciotto quesiti risolti nei tre formati del concorso, e il riepilogo del modulo. I quesiti vanno provati prima di sentire la risposta."),

 (2,"chiaro",0,"Il metodo per i testi di comprensione, che e' lo stesso visto in italiano nel Modulo quindici. Uno: leggi prima la domanda, cosi' sai che cosa cercare."),
 (2,"chiaro",0,"Due: leggi il testo cercando le parole chiave della domanda. Tre: attenzione a not, never, always, only, but, che rovesciano il senso."),
 (2,"chiaro",1.2,"Quattro: rispondi solo con cio' che il testo dice, non con cio' che sai. Cinque: se non capisci una parola, vai avanti. Sei: le opzioni con tutti, sempre, mai sono quasi sempre errate."),

 (3,"chiaro",0,"Un testo tipo, della lunghezza che compare nei concorsi. Mrs Green is eighty years old. She lives in a nursing home."),
 (3,"chiaro",0,"Every morning the healthcare assistant helps her wash and dress. She can walk with a walking frame, but she needs help on the stairs."),
 (3,"chiaro",0,"Yesterday she did not eat her lunch because she had a headache. The nurse checked her temperature: it was normal."),
 (3,"chiaro",1.2,"Leggi con calma, e cerca gia' le parole che conosci: nursing home, healthcare assistant, walking frame, headache, temperature."),

 (4,"chiaro",3,"Le prime tre domande sul testo. Uno: where does Mrs Green live? Dove vive?"),
 (4,"chiaro",3,"Il testo dice she lives in a nursing home: la risposta e' c. Due: who helps her wash and dress? Chi la aiuta a lavarsi e vestirsi?"),
 (4,"chiaro",3,"Il testo dice the healthcare assistant: la risposta e' d. Tre: can she walk? Riesce a camminare?"),
 (4,"tenue",1.2,"Il testo dice she can walk with a walking frame: la risposta e' b. Nota che l'opzione a, no she cannot, e' il distrattore che ignora il but."),

 (5,"chiaro",3,"Altre tre domande. Quattro: why did she not eat her lunch? Perche' non ha mangiato il pranzo?"),
 (5,"chiaro",3,"Il testo dice because she had a headache: la risposta e' b. Le altre opzioni sono plausibili, ma non sono nel testo. Cinque: what did the nurse check? Che cosa ha controllato l'infermiere?"),
 (5,"chiaro",3,"Il testo dice checked her temperature: la risposta e' c. Sei: was the temperature high? La temperatura era alta?"),
 (5,"chiaro",1.2,"Il testo dice it was normal: la risposta e' b. Sei domande, e tutte le risposte sono scritte nel testo: nessuna richiede di sapere altro."),

 (6,"chiaro",3,"Quattro quesiti di traduzione. Sette: quale termine inglese indica il reparto? Room, ward, bed, hall."),
 (6,"chiaro",3,"La risposta e' ward. Otto: wheelchair significa barella, deambulatore, carrozzina, sollevatore?"),
 (6,"chiaro",3,"Carrozzina. Nove: quale termine indica la lesione da pressione? Wound, pressure ulcer, fracture, rash."),
 (6,"chiaro",3,"Pressure ulcer. Dieci: to swallow significa respirare, deglutire, tossire, dormire?"),
 (6,"tenue",1.2,"Deglutire. Nota che in ogni quesito le quattro opzioni appartengono alla stessa area: e' cosi' che si costruisce il distrattore, e si batte conoscendo tutte e quattro le parole."),

 (7,"chiaro",3,"Quattro quesiti di completamento, con il metodo della lezione precedente. Undici: the nurse, spazio, the patient's temperature every morning."),
 (7,"chiaro",3,"Every morning e' la spia del semplice, the nurse e' terza persona: takes, con la S, risposta b. Dodici: Mrs Rossi, spazio, now."),
 (7,"chiaro",3,"Now e' la spia del continuo: is sleeping, risposta c. Tredici: you, spazio, wash your hands before every patient."),
 (7,"chiaro",3,"E' un obbligo di sicurezza: must, risposta b. Quattordici: there, spazio, three patients in the room."),
 (7,"chiaro",1.2,"Three patients e' plurale: are, risposta b."),

 (8,"chiaro",3,"Quattro quesiti sui falsi amici e sulle strutture. Quindici: the patient has a temperature significa che il paziente ha freddo, ha la febbre, ha sete, o e' confuso?"),
 (8,"chiaro",3,"Ha la febbre, risposta b: e' il falso amico piu' frequente. Sedici: I am going to help you get up. Che cosa significa?"),
 (8,"chiaro",3,"Sto per aiutarla ad alzarsi, risposta b. Diciassette: the patient complains of pain. Che cosa significa?"),
 (8,"chiaro",3,"Lamenta dolore, risposta b. Diciotto: do not move him. Che cosa significa?"),
 (8,"chiaro",1.2,"Non spostarlo, risposta c. Do not e' il divieto, e nei quesiti di sicurezza va riconosciuto al volo."),

 (9,"chiaro",0,"Come usare questi quesiti. I diciotto quesiti di questa lezione sono il modello di cio' che troverai nel concorso. Rifalli tra una settimana senza guardare le risposte."),
 (9,"chiaro",0,"Per ogni errore chiediti di che tipo e': parola non conosciuta, struttura non riconosciuta, lettura frettolosa? Lessico: ripassa le schede. Struttura: ripassa la lezione quattro. Lettura: rallenta."),
 (9,"chiaro",1.2,"Poi costruisci quesiti tuoi: prendi una frase delle schede, togli una parola, e cerca di rimetterla. E' l'esercizio piu' efficace che esista."),

 (10,"chiaro",0,"[thoughtful] Il quadro completo del Modulo diciannove. Prima lezione: i tre tipi di quesito, il metodo, le persone, i luoghi, gli oggetti, il tempo, le parole di collegamento."),
 (10,"chiaro",0,"Seconda: il corpo, i sintomi, le condizioni, i parametri vitali, i verbi dell'assistenza, i presidi, la sicurezza. Terza: le frasi per situazione, le consegne, le domande, i falsi amici, le sette strutture."),
 (10,"chiaro",1.2,"Quarta: present simple, present continuous, past, futuro, modali, plurali, preposizioni, pronomi. Quinta: il metodo per i testi e diciotto quesiti risolti."),

 (11,"chiaro",0,"I distrattori tipici del modulo. Ward e' il reparto, stroke e' l'ictus, drip e' la flebo, temperature e' anche la febbre."),
 (11,"chiaro",0,"To attend non e' assistere una persona, sensible e' ragionevole, actually e' in realta'. He, she, it vogliono la S al presente; now vuole la forma in ING; yesterday il passato."),
 (11,"chiaro",0,"There is con il singolare, there are con il plurale. Must e' l'obbligo, must not il divieto. Never, always: rovesciano la frase. But introduce un'eccezione."),
 (11,"profondo",1.2,"Le opzioni della stessa area si battono conoscendo tutte le parole."),

 (12,"chiaro",0,"Le ultime due settimane. Ogni giorno, dieci minuti sulle schede del lessico, a voce alta. Ogni due giorni, rifare i diciotto quesiti di questa lezione."),
 (12,"chiaro",0,"Una volta a settimana, rileggere la lezione quattro sulla grammatica. Il giorno prima, solo i falsi amici e le sette strutture. Il giorno della prova, niente inglese nuovo."),
 (12,"profondo",1.2,"Perche', e lo ripeto per l'ultima volta, l'inglese del concorso si vince con il riconoscimento, non con la competenza linguistica."),

 (13,"chiaro",0,"[warm] Hai completato il Modulo diciannove, e con esso tutto il corso: quindici moduli, centotrentacinque micro-lezioni, quattro moduli bonus, e una banca di simulazioni fino al giorno della prova."),
 (13,"chiaro",0,"Hai studiato per mesi cio' che molti candidati affronteranno con un manuale letto in fretta. Non serve sapere tutto: serve arrivare preparato, lucido e con un metodo."),
 (13,"profondo",0,"Sono le tre cose che questo corso ti ha dato. Good luck. In bocca al lupo."),
]

CAPITOLI = {1:"La lezione",2:"Il metodo per i testi",3:"Un testo tipo",
 4:"Domande sul testo, uno",5:"Domande sul testo, due",6:"Quesiti di traduzione",
 7:"Quesiti di completamento",8:"Falsi amici e strutture",9:"Come usare i quesiti",
 10:"Il quadro del modulo",11:"I distrattori del modulo",12:"Le ultime due settimane",
 13:"La chiusura"}
