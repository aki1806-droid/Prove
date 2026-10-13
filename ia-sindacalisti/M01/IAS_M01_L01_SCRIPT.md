# IAS · Modulo 1 · Lezione 1.1 — Come «ragiona» un modello linguistico

**Voce:** Achille nuovo 1 v4 (ElevenLabs) · **Durata finale attesa:** circa 12 minuti e mezzo dopo silenceremove e atempo 1,12
**Regola:** un blocco = una traccia audio. Le intestazioni non si leggono.

---

### B01 — Apertura
Chiedi all'intelligenza artificiale di spiegare a un neoassunto che cos'è la RSU. In pochi secondi arriva una risposta chiara, ben scritta, gentile. Poi, per curiosità, fai la stessa identica domanda una seconda volta. E la risposta è diversa. Non sbagliata, forse: diversa. Altre parole, un altro ordine, un esempio che prima non c'era. Viene spontaneo chiedersi: ma allora, che cosa c'è lì dentro?

### B02 — L'immagine sbagliata
La maggior parte delle persone usa questi strumenti come se fossero un motore di ricerca molto educato, oppure un'enciclopedia che risponde a voce. Sono due immagini comode, ma sbagliate. E finché le usiamo, continueremo a sorprenderci nel modo sbagliato: ci fideremo quando non dovremmo, e diffideremo quando invece potremmo stare tranquilli.

### B03 — Che cosa faremo
In questa lezione facciamo una cosa sola: capire come funziona davvero un modello linguistico, senza formule e senza parole tecniche inutili. Non per diventare esperti, ma perché chi capisce il meccanismo sa anche dove può fidarsi e dove no. Alla fine avrai in testa un'immagine semplice, che ti servirà per tutto il resto del corso.

### B04 — Il nome
Partiamo dal nome. ChatGPT, Claude e Gemini sono costruiti su quelli che si chiamano grandi modelli linguistici. Modello, perché è una rappresentazione matematica. Linguistico, perché lavora con il linguaggio. Grande, perché è stato costruito leggendo una quantità enorme di testi: libri, articoli, pagine web, documenti di ogni genere.

### B05 — Che cosa ha imparato
Che cosa ha imparato, leggendo tutto quel testo? Non ha imparato a memoria le pagine, come farebbe uno studente prima di un esame. Ha imparato gli schemi: quali parole tendono a stare vicine, come si costruisce una frase, che tono ha una lettera formale, come si articola un ragionamento, come risponde di solito un esperto a una certa domanda.

### B06 — Come ha imparato
Durante l'addestramento il modello ha fatto per un numero enorme di volte un esercizio: leggere un pezzo di testo con l'ultima parola nascosta, e indovinarla. Ogni volta che sbagliava, i suoi parametri venivano corretti di poco. Ripeti questo esercizio su una quantità immensa di testi, per settimane o mesi, su computer potentissimi, e alla fine ottieni un sistema che indovina la parola successiva in modo sorprendentemente buono. Tutto quello che vedrai, la scrittura, il riassunto, perfino qualcosa che somiglia al ragionamento, nasce da lì.

### B07 — La parola successiva
Ed ecco il cuore di tutto. Quando gli scrivi una domanda, il modello fa una cosa sola, ripetuta migliaia di volte: prevede la parola successiva. Guarda tutto quello che c'è scritto fin lì, la tua domanda e la parte di risposta già prodotta, e calcola quali parole potrebbero venire dopo, ciascuna con una sua probabilità. Ne sceglie una. Poi ricomincia.

### B08 — Un esempio di casa nostra
Facciamo un esempio. Se la frase è: il lavoratore che ha fatto il turno di notte ha diritto a un… quale parola viene dopo? Riposo è molto probabile. Permesso, meno. Indennità, possibile. Ombrello, quasi impossibile. Il modello non sa che cosa sia un turno di notte come lo sai tu, che magari l'hai fatto per anni. Sa che, nei testi che ha letto, dopo quelle parole compare spesso riposo.

### B09 — Come la tastiera del telefono
Se ti sembra un meccanismo familiare, hai ragione. È parente della tastiera del telefono, che mentre scrivi ti suggerisce la parola successiva. Solo che la tastiera tiene conto di poche parole, mentre un modello linguistico tiene conto di pagine intere, e ha imparato da una quantità di testo che nessun essere umano potrebbe leggere in mille vite. La differenza di scala diventa una differenza di qualità.

### B10 — Pezzi di parola
Una piccola precisazione. In realtà il modello non lavora con parole intere, ma con pezzi di parola. Una parola lunga come contrattazione può essere spezzata in più pezzi. Per noi non cambia molto, ma spiega alcune stranezze: per esempio perché a volte fatica a contare le lettere di una parola, o a rispettare un numero esatto di caratteri.

### B11 — Dalla parola al discorso
Viene spontanea un'obiezione: se prevede solo la parola successiva, come fa a scrivere un comunicato intero, coerente dall'inizio alla fine? La risposta è che gli schemi che ha imparato non riguardano solo le parole vicine, ma interi discorsi. Ha visto migliaia di lettere, di verbali, di spiegazioni. Sa come si apre un comunicato e come si chiude. E così, una parola dopo l'altra, costruisce un testo che regge.

### B12 — Niente archivio
Ora il punto più importante. Il modello non ha dentro un archivio da consultare. Quando gli chiedi un articolo di contratto, di solito non va a cercarlo in un cassetto: ricostruisce, parola dopo parola, il testo più probabile. A volte il testo più probabile coincide con quello vero. A volte gli assomiglia soltanto.

### B13 — Schemi, non schedario
Tienilo a mente con una formula: schemi, non schedario. Uno schedario restituisce esattamente ciò che contiene, oppure ti dice che non c'è. Gli schemi producono sempre qualcosa di verosimile, anche quando l'informazione precisa non c'è. Ed è proprio questa la radice degli errori sicuri, di cui parleremo nella prossima lezione.

### B14 — Il collega che ha letto tutto
Un'altra immagine può aiutarti. Pensa a un collega che ha letto tutto, davvero tutto, ma ricorda per sommi capi. Se gli chiedi come si scrive una lettera all'azienda, è bravissimo. Se gli chiedi il numero esatto di un comma, ti risponde con la stessa disinvoltura, ma lì la sua memoria è molto meno affidabile. E lui, purtroppo, non si accorge della differenza.

### B15 — Perché due risposte diverse
Torniamo alla domanda iniziale. Perché la stessa domanda dà due risposte diverse? Perché a ogni passo il modello non sceglie sempre la parola in assoluto più probabile: lascia un piccolo margine di variazione. È voluto: rende le risposte più naturali e meno ripetitive. Il risultato è che ogni risposta è una delle tante possibili, non la risposta.

### B16 — La variazione si può usare
Questo margine non è un difetto da combattere, ma qualcosa da usare. Se cerchi idee, per esempio dieci titoli per un volantino, la variazione ti regala alternative. Se invece ti serve precisione, la ottieni non sperando nella fortuna, ma dando istruzioni chiare e un testo di riferimento. Lo vedremo nel modulo quattro, quando impareremo a scrivere le richieste.

### B17 — A schermo: la prima risposta
Vediamolo a schermo. Apro ChatGPT e scrivo una domanda semplice: spiega in tre righe a un neoassunto che cos'è la RSU. Guarda come la risposta compare un pezzo alla volta: non è un effetto grafico, è proprio il modello che sta producendo una parola dopo l'altra.

### B18 — A schermo: la seconda risposta
Adesso apro una nuova conversazione e faccio esattamente la stessa domanda. Ecco la seconda risposta. Mettiamole una accanto all'altra. Il senso è simile, ma le parole cambiano, cambia l'ordine, e in una delle due compare un dettaglio che nell'altra non c'è. È qui che devi drizzare le orecchie: quel dettaglio in più è giusto? Da dove viene?

### B19 — A schermo: tre strumenti
Proviamo la stessa domanda in Claude e in Gemini. Anche qui, risposte simili ma non identiche. Ognuno dei tre strumenti è stato costruito e addestrato in modo diverso, con testi e scelte diverse, e questo si sente nel tono, nella lunghezza, nel modo di organizzare la risposta. Nessuno dei tre ha la risposta ufficiale: ciascuno ne produce una plausibile.

### B20 — A schermo: chiedilo a lui
Facciamo una prova curiosa: chiedo direttamente a Claude come produce le sue risposte. La spiegazione che dà è ragionevole, e coerente con quello che ti ho detto. Ma attenzione: anche questa è una risposta costruita con lo stesso meccanismo. Il modello non osserva se stesso dall'interno: descrive se stesso con le parole più probabili. Utile come spiegazione, non come prova.

### B21 — La conversazione è il materiale
C'è un altro elemento che conta moltissimo: tutto quello che scrivi nella conversazione diventa materiale su cui il modello costruisce la risposta. Se gli dai il testo di un accordo e gli chiedi di riassumerlo, lavora su quel testo, non sui suoi ricordi. Ed è per questo che le risposte su un documento che gli fornisci sono molto più affidabili delle risposte a memoria.

### B22 — A schermo: con e senza documento
Guarda la differenza. Chiedo: quali sono le fasce orarie del turno notturno nel nostro accordo? Senza documento, il modello risponde in modo generico, o peggio inventa. Ora incollo il testo di un accordo di esempio e rifaccio la domanda. La risposta adesso si appoggia a quel testo, e posso chiedergli di indicarmi esattamente il punto da cui l'ha presa.

### B23 — Una memoria corta
Questa memoria della conversazione però non è infinita. Ogni strumento può tenere in considerazione una certa quantità di testo alla volta. Se la conversazione diventa lunghissima, o se incolli documenti enormi, le parti più lontane possono perdere peso. Quando cambi argomento, spesso conviene aprire una conversazione nuova.

### B24 — Il tempo si ferma a una data
E poi c'è il tempo. Il modello ha imparato da testi raccolti fino a una certa data. Di quello che è successo dopo, per esempio un contratto firmato da poco o una legge appena approvata, può non sapere nulla. Alcuni strumenti possono fare ricerche sul web per colmare il vuoto; altri no, o non sempre. Quando conta l'attualità, chiedi sempre: da dove viene questa informazione?

### B25 — A schermo: fino a quando sa
Prova anche questa: chiedi allo strumento fino a quando arrivano le sue conoscenze, e poi chiedigli una notizia recente del tuo settore. A volte risponde con onestà che non lo sa, a volte cerca sul web e ti mostra le fonti, a volte risponde con informazioni superate. Ogni strumento si comporta a modo suo, ed è per questo che nel modulo due li metteremo a confronto.

### B26 — Perché sembra una persona
Resta un'ultima domanda: perché sembra così umano? Perché ha imparato dal linguaggio umano, e perché dopo la prima fase di apprendimento è stato allenato a rispondere in modo utile, gentile e ordinato, anche grazie al giudizio di persone che valutavano le sue risposte. Il risultato è un interlocutore che scrive come una persona competente. Ma scrivere come una persona competente non vuol dire esserlo.

### B27 — Che cosa non fa
Riassumiamo che cosa non fa. Non consulta un archivio, salvo quando gli dai un documento o fa una ricerca. Non ricorda le conversazioni precedenti, salvo funzioni apposite. Non capisce le situazioni come le capisci tu, che conosci le persone, i reparti, la storia di una vertenza. E non sa quando sta sbagliando.

### B28 — Che cosa fa benissimo
E che cosa fa benissimo? Scrive, riscrive, riassume, riordina, cambia tono, trasforma un testo per un pubblico diverso, mette in tabella, propone idee, simula una controparte. Tutto ciò che riguarda la forma del linguaggio lo fa in modo eccellente. Il contenuto, invece, va fornito o controllato da te.

### B29 — La forma è già moltissimo
Non sottovalutare questa parte. Nel lavoro sindacale la forma pesa: un comunicato chiaro viene letto, uno confuso no. Una lettera ordinata all'azienda è più difficile da ignorare. Un verbale scritto bene evita discussioni nella riunione successiva. Se l'intelligenza artificiale ti restituisce anche solo un'ora a settimana su queste cose, hai un'ora in più da passare nei reparti.

### B30 — Che cosa significa per noi
Tradotto nel nostro lavoro, questo significa tre cose. Quando ti serve la forma, una bozza, un riassunto, un tono diverso, lascialo lavorare e rifinisci. Quando ti servono i fatti di un documento, daglielo tu, e chiedi di indicare da dove prende ogni informazione. Quando ti serve un fatto a memoria, un numero, una norma, una data, prendilo come un'ipotesi da verificare, mai come una risposta.

### B31 — Errori tipici
Ecco allora gli errori tipici di chi comincia, che derivano tutti da un'immagine sbagliata del meccanismo. Primo errore: trattarlo come un motore di ricerca, e prendere per buono un dato preciso chiesto a memoria. Secondo errore: pensare che una risposta ripetuta due volte sia per forza vera, perché la coerenza non è una prova. Terzo errore: incollare un documento enorme e dare per scontato che l'abbia letto tutto con la stessa attenzione.

### B32 — Da ricordare
Se dovessi lasciarti una frase sola di questa lezione, sarebbe questa: il modello non cerca la risposta vera, costruisce la risposta probabile. Quasi sempre le due coincidono. Il tuo mestiere è accorgerti di quando non succede.

### B33 — La pratica di oggi
La pratica di oggi è semplice e molto istruttiva. Scegli una domanda che riguarda il tuo lavoro, una di cui conosci bene la risposta. Falla a uno dei tre strumenti, poi apri una nuova conversazione e falla di nuovo, con le stesse identiche parole. Confronta le due risposte: che cosa cambia? Che cosa resta uguale? C'è qualcosa di sbagliato, o di aggiunto, in una delle due? Annota quello che trovi nella scheda della pratica.

### B34 — Chiusura
Nella prossima lezione affrontiamo la conseguenza più delicata di tutto questo: perché l'intelligenza artificiale a volte sbaglia, e lo fa con assoluta sicurezza. Ci vediamo lì.
