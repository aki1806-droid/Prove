// Contenuto delle 50 scene della lezione 2.8 — il riepilogo del modulo.

const MAPPA = [
 {n:"2.1", t:"**Il processo di assistenza** — i cinque passi"},
 {n:"2.2", t:"**Modelli e tassonomie** — le categorie con cui si guarda"},
 {n:"2.3", t:"**Accertamento e scale**"},
 {n:"2.4", t:"**La documentazione infermieristica**"},
 {n:"2.5", t:"**EBP, linee guida, PDTA e procedure**"},
 {n:"2.6", t:"**Rischio clinico** e sicurezza del paziente"},
 {n:"2.7", t:"**Comunicazione clinica** e continuità", key:true},
];

const CATENA = [
 {t:"Raccolgo", d:"con le categorie della disciplina"},
 {t:"Decido", d:"sulle migliori evidenze disponibili"},
 {t:"Documento", d:"ciò che faccio"},
 {t:"Comunico", d:"nei passaggi"},
 {t:"Sorveglio", d:"il sistema: l'errore è prevedibile", key:true},
];

const CONF = [
 {n:"1", t:"**Obiettivo o intervento** — guarda il *soggetto* della frase"},
 {n:"2", t:"**Reale o di rischio** — con i segni, oppure senza"},
 {n:"3", t:"**Diagnosi o problema collaborativo** — si tratta, oppure si sorveglia"},
 {n:"4", t:"**Henderson 14, Gordon 11** — non il contrario"},
 {n:"5", t:"**NOC o NIC** — outcome, oppure interventi"},
 {n:"6", t:"**Braden o Conley** — lesioni inverso, cadute diretto"},
 {n:"7", t:"**Linea guida, procedura, PDTA** — cosa, come qui, chi lungo il percorso"},
 {n:"8", t:"**Near miss o evento avverso** — non arriva, oppure arriva", key:true},
];

const FORMULE = [
 {n:"1", t:"**PES** — problema, etiologia, segni e sintomi *(di rischio: PE)*"},
 {n:"2", t:"**PICO** — popolazione, intervento, confronto, esito"},
 {n:"3", t:"**SBAR** — situation, background, assessment, recommendation"},
 {n:"4", t:"**CAM** — 1 + 2 + (3 oppure 4)"},
 {n:"5", t:"**EBP** — evidenze + competenza clinica + valori della persona", key:true},
];

const VENETO = [
 {n:"1", t:"Il processo sta dentro la **cartella clinica elettronica** — scale integrate, rivalutazioni a intervalli definiti"},
 {n:"2", t:"La catena delle evidenze: **SNLG → indirizzo regionale e PDTA → procedura aziendale → pratica**, spesso dentro le **reti cliniche**"},
 {n:"3", t:"La filiera del rischio: **operatore → risk management → Centro regionale → Osservatorio nazionale**, con il **Difensore civico** Garante"},
 {n:"4", t:"La continuità verso il territorio: **dimissioni protette, COT, infermiere di famiglia e comunità**", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Riepilogo",
  titolo:"Ricomponiamo<br>il modulo", sottotitolo:"Nessun contenuto nuovo: la mappa, i numeri, le confusioni, i casi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Che cosa c'è in questo video",
  celle:[
   {n:"1", t:"La **mappa** delle sette lezioni"},
   {n:"2", t:"Il **filo** che le tiene insieme"},
   {n:"3", t:"I **numeri** e le **formule**"},
   {n:"4", t:"Le **confusioni** e i **casi tipici**", key:true}]},

{id:"s03", tipo:"titolo", tema:"chiaro", sopratitolo:"Come usarlo",
  titolo:"Guardalo **due volte**:<br>adesso, e la settimana<br>prima della prova.",
  sotto:"Quando serve rimettere in ordine quello che nel frattempo si è sparpagliato."},

{id:"s04", tipo:"titolo", tema:"tenue", sopratitolo:"Un avvertimento",
  titolo:"Un ripasso serve<br>a **trovare i buchi**,<br>non a riempirli tutti.",
  sotto:"Se un punto ti sfugge, riprendi quella lezione — non tutto il modulo da capo."},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3],
  sopratitolo:"La mappa del modulo", celle:MAPPA},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"La mappa del modulo", celle:MAPPA},
{id:"s07", tipo:"titolo", tema:"chiaro", sopratitolo:"Come tenerle insieme",
  titolo:"Non sette argomenti:<br>**sette punti di una<br>sola linea**.",
  sotto:"Ed è la linea che conviene saper raccontare all'orale."},

{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"Il filo del modulo, in cinque verbi", attive:[0,1],
  passi:CATENA},
{id:"s09", tipo:"catena", tema:"chiaro", sopratitolo:"Il filo del modulo, in cinque verbi",
  passi:CATENA},
{id:"s10", tipo:"tre", tema:"chiaro", sopratitolo:"Tre facce dello stesso lavoro",
  box:[
   {n:"1", t:"Metodo", d:"raccolgo e decido"},
   {n:"2", t:"Prova", d:"documento"},
   {n:"3", t:"Sicurezza", d:"comunico e sorveglio", key:true}]},

{id:"s11", tipo:"titolo", tema:"chiaro", sopratitolo:"Dalla 2.1 · il processo",
  titolo:"Cinque fasi,<br>e il processo è **ciclico**.",
  sotto:"La valutazione non chiude niente: riapre l'accertamento. Ed è il passo che si dimentica più spesso."},

{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due diagnosi",
  col:[
   {h:"Reale — PES", t:"**P**roblema · **E**tiologia · **S**egni e sintomi"},
   {h:"Di rischio — PE", t:"**Senza segni**: se i segni ci fossero, non sarebbe più un rischio"}]},

{id:"s13", tipo:"scala", tema:"chiaro", sopratitolo:"Le priorità, in quest'ordine",
  gradini:[
   {n:"1", t:"ABC", d:"prima di tutto"},
   {n:"2", t:"Rischio di danno a breve", d:"poi"},
   {n:"3", t:"Impatto e percezione", d:"sull'autonomia, e come la vive la persona", key:true}]},

{id:"s14", tipo:"tabella", tema:"chiaro", sopratitolo:"Dalla 2.2 · i numeri dei modelli",
  intestazioni:["Modello","Quanti"], colonne:["58%","42%"],
  righe:[
   ["**Metaparadigma**","**4** concetti"],
   ["**Henderson** — bisogni","**14**"],
   ["**Gordon** — modelli funzionali","**11**"],
   ["**Orem** — sistemi","**3**"]]},

{id:"s15", tipo:"catena", tema:"chiaro", sopratitolo:"La catena delle tassonomie",
  passi:[
   {t:"NANDA-I", d:"le diagnosi"},
   {t:"NOC", d:"i risultati — *outcome*"},
   {t:"NIC", d:"gli interventi", key:true}]},

{id:"s16", tipo:"titolo", tema:"chiaro", sopratitolo:"Come non sbagliare NOC e NIC",
  titolo:"NO**C** come out**c**ome.<br>NI**C** come **i**ntervento.",
  sotto:"La lettera che cambia nella sigla è la stessa che cambia nel significato."},

{id:"s17", tipo:"tabella", tema:"chiaro", sopratitolo:"Dalla 2.3 · la slide da fotografare",
  intestazioni:["Scala","Che cosa misura","Intervallo","Soglia"], colonne:["22%","38%","20%","20%"],
  righe:[
   ["**Braden**","lesioni da pressione","6 – 23","**≤ 16**"],
   ["**Norton**","lesioni da pressione","5 – 20","**≤ 14**"],
   ["**Conley**","rischio di caduta","0 – 10","**≥ 2**"],
   ["**Tinetti**","equilibrio e andatura","0 – 28","**< 19**"]]},
{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"Dalla 2.3 · la slide da fotografare",
  intestazioni:["Scala","Che cosa misura","Intervallo","Soglia"], colonne:["22%","38%","20%","20%"],
  righe:[
   ["**Barthel**","autonomia nelle ADL","0 – 100","—"],
   ["**Glasgow**","stato di coscienza","3 – 15","**coma ≤ 8**"],
   ["**CAM**","delirium","—","**1 + 2 + (3 o 4)**"],
   ["**MUST**","rischio nutrizionale","0 – 6","**≥ 2** alto"]]},
{id:"s19", tipo:"titolo", tema:"chiaro", sopratitolo:"Se devi trascrivere una cosa sola",
  titolo:"Otto scale,<br>**otto intervalli**.",
  sotto:"È la parte che si dimentica per prima, perché sono numeri senza appiglio."},

{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"La regola che risolve metà delle domande",
  col:[
   {h:"Misura una capacità", t:"**Più alto è meglio** — Barthel 100 è ottimo"},
   {h:"Misura un rischio", t:"**Più alto è peggio** — Conley 10 è pessimo"}]},

{id:"s21", tipo:"titolo", tema:"chiaro", sopratitolo:"Fin qui è intuitivo",
  titolo:"E infatti non è qui<br>che si sbaglia.",
  sotto:"Si sbaglia sulle due eccezioni."},

{id:"s22", tipo:"trappola", tema:"profondo", sopratitolo:"Le due eccezioni",
  righe:[
   {sb:"«Misura un rischio, quindi più alto è peggio»",
    ok:"**Braden e Norton** misurano un rischio con punteggio **inverso**: più basso, più a rischio"}]},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1],
  sopratitolo:"Le otto confusioni che costano di più", celle:CONF},
{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3],
  sopratitolo:"Le otto confusioni che costano di più", celle:CONF},
{id:"s25", tipo:"titolo", tema:"chiaro", sopratitolo:"Henderson o Gordon",
  titolo:"**14** Henderson.<br>**11** Gordon.",
  sotto:"Se non ricordi quale sia quale: quelli di Gordon sono modelli funzionali di salute, e sono i meno numerosi dei due."},

{id:"s26", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3,4,5],
  sopratitolo:"Le otto confusioni che costano di più", celle:CONF},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Le otto confusioni che costano di più", celle:CONF},
{id:"s28", tipo:"tre", tema:"chiaro", sopratitolo:"Le tre parole dell'evento",
  box:[
   {n:"1", t:"Near miss", d:"l'errore **non arriva** al paziente"},
   {n:"2", t:"Evento avverso", d:"il danno **c'è**"},
   {n:"3", t:"Complicanza", d:"**attesa** — non presuppone un errore", key:true}]},

{id:"s29", tipo:"trappola", tema:"chiaro", sopratitolo:"Caso · la traccia con dati incompleti",
  righe:[
   {sb:"Scegliere l'intervento più sensato fra quelli proposti",
    ok:"Si comincia **raccogliendo il dato mancante** — è quasi sempre quella l'opzione giusta"}]},

{id:"s30", tipo:"titolo", tema:"chiaro", sopratitolo:"Caso · «quale intervento ha la priorità?»",
  titolo:"**ABC**, poi rischio di<br>danno a breve, poi impatto<br>e percezione.",
  sotto:"In quest'ordine, sempre."},

{id:"s31", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Caso · Braden 12 in paziente allettato",
  celle:[
   {n:"1", t:"Cambi posturali **programmati**"},
   {n:"2", t:"Superficie **antidecubito**"},
   {n:"3", t:"Gestione dell'**umidità**"},
   {n:"4", t:"Valutazione **nutrizionale**"},
   {n:"5", t:"**Ispezione cutanea** a ogni turno", key:true}]},

{id:"s32", tipo:"titolo", tema:"profondo", sopratitolo:"Perché il punteggio non basta",
  titolo:"Una scala compilata e<br>non seguita da niente è<br>**peggio** di una non compilata.",
  sotto:"Dimostra che il rischio era noto. Al punteggio deve corrispondere una modifica del piano."},

{id:"s33", tipo:"catena", tema:"chiaro", sopratitolo:"Caso · prescrizione illeggibile o dubbia",
  passi:[
   {t:"Chiedo chiarimento", d:"al prescrittore"},
   {t:"Non do corso", d:"se il dubbio permane"},
   {t:"Documento", d:"il dubbio e la richiesta", key:true}]},

{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Altri due casi, due risposte",
  col:[
   {h:"Near miss intercettato", t:"**Segnalo comunque** — è apprendimento gratuito"},
   {h:"Chiamata al medico", t:"Strutturo con **SBAR**, esplicitando **valutazione e richiesta**"}]},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1],
  sopratitolo:"Cinque formule da citare per intero", celle:FORMULE},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3],
  sopratitolo:"Cinque formule da citare per intero", celle:FORMULE},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Cinque formule da citare per intero", celle:FORMULE},

{id:"s38", tipo:"titolo", tema:"chiaro", sopratitolo:"La frase del modulo",
  titolo:"Ciò che non è documentato<br>si presume **non fatto**.",
  sotto:"L'abbiamo incontrata nella 1.5, e non ci ha più lasciati."},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Per che cosa vale — cioè per tutto",
  celle:[
   {n:"1", t:"La **scala** compilata"},
   {n:"2", t:"La **segnalazione** fatta al medico"},
   {n:"3", t:"Il **rifiuto** della persona"},
   {n:"4", t:"La **rivalutazione** del dolore", key:true}]},

{id:"s40", tipo:"titolo", tema:"profondo", sopratitolo:"Perché non è burocrazia",
  titolo:"La memoria non fa prova.<br>Il **documento** sì.",
  sotto:"È l'unico modo in cui il lavoro che hai fatto continua a esistere a distanza di anni."},

{id:"s41", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0],
  sopratitolo:"Quattro agganci veneti da portare all'orale", celle:VENETO},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1],
  sopratitolo:"Quattro agganci veneti da portare all'orale", celle:VENETO},
{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2],
  sopratitolo:"Quattro agganci veneti da portare all'orale", celle:VENETO},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Quattro agganci veneti da portare all'orale", celle:VENETO},
{id:"s45", tipo:"confronto", tema:"chiaro", sopratitolo:"Come proseguire · i primi due passi",
  col:[
   {h:"Primo", t:"Il **test del modulo** — 30 domande, soglia 21"},
   {h:"Secondo", t:"Riprendi **solo le lezioni** che gli errori ti hanno segnalato, non tutto il modulo da capo"}]},
{id:"s46", tipo:"titolo", tema:"chiaro", sopratitolo:"Terzo passo",
  titolo:"Nel quaderno di ripasso:<br>**i numeri delle scale**<br>e le **formule**.",
  sotto:"È la parte che si dimentica per prima, ed è anche l'unica che si recupera in cinque minuti."},

{id:"s47", tipo:"titolo", tema:"profondo", sopratitolo:"Il consiglio con il rendimento più alto del corso",
  titolo:"Lo schema in cinque passi<br>della 2.1, su **due casi**.",
  sotto:"Non su venti: su due, fatti bene."},

{id:"s48", tipo:"confronto", tema:"chiaro", sopratitolo:"Dove sei arrivato",
  col:[
   {h:"Modulo 1", t:"La **grammatica** della professione"},
   {h:"Modulo 2", t:"La **sintassi**: il metodo, la prova, la sicurezza"}]},

{id:"s49", tipo:"titolo", tema:"chiaro", sopratitolo:"E dal modulo 3",
  titolo:"Il metodo<br>diventa **clinica**.",
  sotto:"Bisogni fondamentali, comfort, assistenza di base avanzata: la parte che pesa di più nella prova pratica."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossimo modulo",
  titolo:"Modulo 3", sottotitolo:"Bisogni fondamentali, comfort<br>e assistenza di base avanzata",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
