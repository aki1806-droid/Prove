// Contenuto delle 50 scene della lezione 2.1. *accento*  **accento in semibold**

const OBIETTIVI = [
 {t:"Le **cinque fasi** del processo", d:"e perché è ciclico"},
 {t:"La **diagnosi infermieristica**", d:"struttura PES, differenza dalla diagnosi medica, problema collaborativo"},
 {t:"**Obiettivi** e **priorità**", d:"come si scrive un obiettivo, con quale criterio si sceglie l'ordine"},
 {t:"Lo **schema in cinque passi**", d:"la struttura di risposta a qualunque caso clinico"},
];

const FASI = [
 {t:"Accertamento", d:"raccolgo"},
 {t:"Diagnosi", d:"interpreto"},
 {t:"Pianificazione", d:"decido"},
 {t:"Attuazione", d:"faccio"},
 {t:"Valutazione", d:"verifico", key:true},
];

const CRITERI = [
 {t:"**Centrato sulla persona** — il soggetto è lei"},
 {t:"**Specifico** e osservabile, non generico"},
 {t:"**Misurabile**, con un indicatore"},
 {t:"**Realistico** rispetto a condizioni e risorse"},
 {t:"**Condiviso** — quello che lei non accetta non si raggiunge"},
 {t:"**Temporalizzato** — entro quando"},
];

const PRIORITA = [
 {n:"1", t:"Sopravvivenza", d:"vie aeree, respiro, circolo"},
 {n:"2", t:"Gerarchia dei bisogni", d:"fisiologici e di sicurezza prima dei relazionali"},
 {n:"3", t:"Percezione della persona", d:"a parità di urgenza, il problema che lei vive come più grave", key:true},
];

const SCHEMA = [
 {t:"Che cosa so", d:"e che cosa mi manca"},
 {t:"Il problema prioritario", d:"e con quale criterio l'ho scelto"},
 {t:"L'obiettivo", d:"sulla persona, misurabile, con un tempo"},
 {t:"Gli interventi", d:"autonomi, su prescrizione, collaborativi"},
 {t:"Come valuto", d:"con quale indicatore e quando", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Metodologia, documentazione e sicurezza",
  titolo:"Il processo di<br>assistenza", sottotitolo:"L'ossatura di ogni risposta a un caso clinico",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Dal modulo 1 al modulo 2",
  col:[
   {h:"Modulo 1", t:"La **grammatica** della professione", grande:true},
   {h:"Modulo 2", t:"La **sintassi**: il metodo con cui si costruisce una frase che regge", grande:true}]},

{id:"s03", tipo:"icone", tema:"chiaro", sopratitolo:"Perché è la lezione più redditizia",
  voci:[
   {icona:"documento", t:"Prova scritta", d:"quesiti a risposta sintetica"},
   {icona:"cartella", t:"Prova pratica", d:"anche in forma scritta"},
   {icona:"persone", t:"Orale", d:"la struttura si sente subito", key:true}]},

{id:"s04", tipo:"tabella", tema:"tenue", sopratitolo:"Dove arrivano i casi clinici",
  intestazioni:["Prova","Forma","Che cosa premia"], colonne:["26%","30%","44%"], chiave:[2],
  righe:[
   ["**Scritta**","quesiti a risposta sintetica","una struttura riconoscibile"],
   ["**Pratica**","caso clinico, anche scritto","l'ordine del ragionamento"],
   ["**Orale**","domanda aperta","dire il criterio, non solo la scelta"]]},

{id:"s05", tipo:"elenco", tema:"chiaro", sopratitolo:"Quattro traguardi", attive:[0,1],
  numerato:true, voci:OBIETTIVI},
{id:"s06", tipo:"elenco", tema:"chiaro", sopratitolo:"Quattro traguardi",
  numerato:true, voci:OBIETTIVI},

{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"La definizione",
  testo:"Il metodo **sistematico e razionale** con cui l'infermiere pianifica ed eroga l'assistenza.",
  sotto:"Non è un adempimento burocratico."},

{id:"s08", tipo:"norma", tema:"chiaro", sopratitolo:"Il fondamento",
  etichetta:"Legge", sigla:"251/2000",
  testo:"Le professioni infermieristiche operano «utilizzando **metodologie di pianificazione per obiettivi** dell'assistenza»."},

{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Il metodo non è un vincolo<br>all'autonomia: **ne è la prova**.",
  sotto:"Chi decide deve poter dire su quali dati ha deciso."},

{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Le cinque fasi", attive:[0,1,2],
  passi:FASI},
{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"Le cinque fasi · il processo è ciclico",
  passi:FASI},

{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"La fase che sparisce dagli elenchi",
  righe:[
   {sb:"Accertamento · diagnosi · pianificazione · attuazione",
    ok:"…e **valutazione**: è quella che manca nei distrattori"},
   {sb:"«Il processo si conclude con l'attuazione»",
    ok:"Il processo è **ciclico**: la valutazione rialimenta l'accertamento"}]},

{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Cinque o sei fasi?",
  col:[
   {h:"Modelli anglosassoni", t:"**Sei** fasi: i *risultati attesi* sono separati dalla pianificazione degli interventi"},
   {h:"Concorsi italiani", t:"**Cinque** fasi, ed è lo standard atteso", grande:true}]},

{id:"s14", tipo:"titolo", tema:"chiaro", sopratitolo:"La regola d'esame",
  titolo:"Se un quiz ne propone **sei**,<br>controlla se distingue<br>risultati e interventi.",
  sotto:"Ma la risposta attesa è quasi sempre cinque."},

{id:"s15", tipo:"icone", tema:"chiaro", sopratitolo:"L'accertamento è *continuo*",
  voci:[
   {icona:"cartella", t:"All'ingresso", d:"la raccolta strutturata"},
   {icona:"orologio", t:"A ogni turno", d:"non è un momento che si esaurisce"},
   {icona:"avviso", t:"A ogni variazione clinica", d:"il dato nuovo riapre il piano", key:true}]},

{id:"s16", tipo:"matrice", tema:"chiaro", sopratitolo:"Le due classificazioni del dato",
  assex:["Soggettivo","Oggettivo"], assey:["Primario","Secondario"],
  celle:[
   {t:"«Ho dolore quando mi giro»", d:"lo riferisce la persona", key:true},
   {t:"PA 150/95 · cute arrossata", d:"lo osservi o lo misuri tu"},
   {t:"«La notte si lamenta»", d:"lo riferisce la figlia"},
   {t:"Diuresi 350 ml/24h", d:"sta in cartella"}]},

{id:"s17", tipo:"tabella", tema:"chiaro", sopratitolo:"Come si scrive un dato",
  intestazioni:["Dato","Esempio","Fonte"], colonne:["24%","46%","30%"],
  righe:[
   ["**Soggettivo**","«ho dolore quando mi giro»","la persona"],
   ["**Oggettivo**","PA 150/95","misurazione"],
   ["**Oggettivo**","cute arrossata al sacro","osservazione"],
   ["**Secondario**","diuresi 350 ml/24h","cartella — *va attribuito*"]]},

{id:"s18", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'errore che si vede subito",
  da:{h:"Interpretazione", t:"«Il paziente<br>è **disidratato**»"},
  a:{h:"Dati", t:"Mucose asciutte · plica persistente<br>diuresi **350 ml/24h** · riferisce di bere poco"},
  sotto:"Prima i dati, **poi** la conclusione."},

{id:"s19", tipo:"griglia", tema:"tenue", colonne:2, sopratitolo:"I quattro dati, uno per uno",
  celle:[
   {t:"**Mucose asciutte**"},
   {t:"**Plica cutanea** persistente"},
   {t:"Diuresi **350 ml** in 24 ore"},
   {t:"Riferisce di **bere poco**"}]},

{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"La diagnosi infermieristica",
  testo:"Il **giudizio clinico** sulle risposte della persona a problemi di salute o a processi vitali, reali o potenziali.",
  sotto:"Della persona, della famiglia, della comunità."},

{id:"s21", tipo:"tabella", tema:"chiaro", sopratitolo:"La domanda più chiesta del modulo",
  intestazioni:["","Diagnosi medica","Diagnosi infermieristica"], colonne:["20%","40%","40%"], chiave:[2],
  righe:[
   ["**Oggetto**","il processo patologico","la risposta della persona"],
   ["**Chi la formula**","il medico","l'infermiere"],
   ["**Nel tempo**","stabile finché dura la malattia","può cambiare *di ora in ora*"]]},

{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Stessa persona, due sguardi",
  col:[
   {h:"Medica", t:"**Ictus ischemico**", grande:true},
   {h:"Infermieristica", t:"**Compromissione della mobilità**", grande:true}]},

{id:"s23", tipo:"tre", tema:"chiaro", sopratitolo:"La struttura PES", cifre:true,
  box:[
   {n:"P", t:"Problem", d:"l'etichetta diagnostica"},
   {n:"E", t:"Etiology", d:"i fattori correlati — *«correlato a»*"},
   {n:"S", t:"Signs", d:"le caratteristiche definenti — *«che si manifesta con»*"}]},

{id:"s24", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio completo",
  passi:[
   {t:"Compromissione della mobilità", d:"**P** · il problema"},
   {t:"correlata a dolore post-operatorio e timore di cadere", d:"**E** · la causa", key:true},
   {t:"che si manifesta con rifiuto di alzarsi e bisogno di aiuto nei trasferimenti", d:"**S** · i segni"}]},

{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Senza la **causa**,<br>l'intervento non ha bersaglio.",
  sotto:"È il pezzo che si dimentica più spesso."},

{id:"s26", tipo:"tabella", tema:"chiaro", sopratitolo:"Reale o di rischio",
  intestazioni:["","Diagnosi reale","Diagnosi di rischio"], colonne:["22%","39%","39%"],
  righe:[
   ["**Struttura**","**PES**","**PE**"],
   ["**Segni e sintomi**","si:ci sono","no:non ci sono ancora"],
   ["**Perché**","il problema c'è","il problema non si è manifestato"]]},

{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Una diagnosi di rischio, scritta bene",
  celle:[
   {n:"P", t:"**Rischio di lesione da pressione**"},
   {n:"E", t:"correlato a **immobilità** e **Braden 12**"},
   {n:"—", t:"*niente* «che si manifesta con»: se ci fossero segni, la lesione ci sarebbe già"}]},

{id:"s28", tipo:"trappola", tema:"chiaro", sopratitolo:"Il distrattore classico",
  righe:[
   {sb:"«Rischio di caduta correlato a instabilità, che si manifesta con caduta avvenuta»",
    ok:"Se la caduta è **avvenuta**, il problema è **reale**, non di rischio"}]},

{id:"s29", tipo:"albero", tema:"tenue", sopratitolo:"La regola che chiude la domanda",
  radice:"La diagnosi dice «**che si manifesta con**»?",
  rami:[
   {cond:"sì, ed è una diagnosi di rischio", esito:"opzione **errata**", key:true},
   {cond:"sì, ed è una diagnosi reale", esito:"formulazione **corretta**"},
   {cond:"no, ed è una diagnosi di rischio", esito:"formulazione **corretta** — è PE"}]},

{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"Il problema collaborativo",
  voci:[
   {icona:"occhio", t:"Sorveglia", d:"per rilevarne l'insorgenza"},
   {icona:"avviso", t:"Attiva", d:"secondo prescrizioni e protocolli"},
   {icona:"persone", t:"Gestisce con il medico", d:"«Complicanza potenziale: emorragia post-operatoria»", key:true}]},

{id:"s31", tipo:"venn", tema:"chiaro", sopratitolo:"La differenza sta nell'azione prevalente",
  sx:{t:"Diagnosi infermieristica", d:"l'infermiere **tratta**: decide lui l'intervento"},
  dx:{t:"Problema collaborativo", d:"l'infermiere **sorveglia** e **attiva**"},
  centro:"Li gestisce **entrambi** l'infermiere — e di entrambi risponde"},

{id:"s32", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Pianificazione · l'obiettivo",
  da:{h:"Intervento", t:"«**Mobilizzare** il paziente<br>tre volte al giorno»"},
  a:{h:"Obiettivo", t:"«**Il paziente mantiene** la stazione eretta<br>per 2 minuti con ausilio entro 48 ore»"},
  sotto:"Guarda il **soggetto** della frase: se è l'infermiere è un intervento, se è la persona è un obiettivo."},

{id:"s33", tipo:"titolo", tema:"chiaro", sopratitolo:"Una regola sola",
  titolo:"Il soggetto è **l'infermiere**?<br>È un intervento.<br>È **la persona**? È un obiettivo."},

{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3],
  sopratitolo:"I sei criteri dell'obiettivo", celle:CRITERI},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2,
  sopratitolo:"I sei criteri dell'obiettivo", celle:CRITERI},

{id:"s36", tipo:"scala", tema:"chiaro", sopratitolo:"Le priorità, in sequenza", attive:[0],
  gradini:PRIORITA},

{id:"s37", tipo:"trappola", tema:"chiaro", sopratitolo:"L'avvertenza sulla gerarchia",
  righe:[
   {sb:"«I bisogni fisiologici vengono sempre prima di tutto»",
    ok:"Il **dolore intenso** e l'**ansia grave** diventano prioritari: impediscono tutto il resto"}]},

{id:"s38", tipo:"scala", tema:"chiaro", sopratitolo:"Le priorità, in sequenza",
  gradini:PRIORITA},

{id:"s39", tipo:"albero", tema:"chiaro", sopratitolo:"«Quale intervento ha priorità?»",
  radice:"C'è un rischio **immediato** per la vita?",
  rami:[
   {cond:"sì", esito:"**ABC** — vie aeree, respiro, circolo", key:true},
   {cond:"no, ma c'è danno a breve", esito:"caduta imminente, stravaso, sanguinamento: **agisci lì**"},
   {cond:"no", esito:"guarda **l'impatto** sulla persona e quello che il piano prevede già"}]},

{id:"s40", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"L'ordine, sempre lo stesso",
  celle:[
   {n:"1", t:"Rischio **immediato per la vita** → ABC"},
   {n:"2", t:"Rischio di **danno a breve** → agisci lì"},
   {n:"3", t:"**Impatto** sulla persona e piano in corso"}]},

{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Valutare non è<br>**perdere tempo**.",
  sotto:"Spesso l'opzione corretta è «rilevo i parametri», non un intervento impulsivo."},

{id:"s42", tipo:"icone", tema:"chiaro", sopratitolo:"Quarta fase · l'attuazione",
  voci:[
   {icona:"ingranaggio", t:"Eroghi", d:"e adatti alla situazione reale"},
   {icona:"persone", t:"Coordini", d:"l'équipe"},
   {icona:"cuoremano", t:"Attribuisci", d:"al personale di supporto le attività compatibili"},
   {icona:"documento", t:"Registri", d:"è la fase in cui nasce la documentazione", key:true}]},

{id:"s43", tipo:"tre", tema:"chiaro", sopratitolo:"I tre tipi di intervento",
  box:[
   {n:"1", t:"Autonomo", d:"lo decide l'infermiere"},
   {n:"2", t:"Su prescrizione", d:"lo decide il medico, lo esegui tu"},
   {n:"3", t:"Collaborativo", d:"si decide insieme"}]},

{id:"s44", tipo:"tabella", tema:"chiaro", sopratitolo:"Quinta fase · e in tutti e tre i casi il piano si aggiorna",
  intestazioni:["Esito","Che cosa fai del piano"], colonne:["34%","66%"], chiave:[2],
  righe:[
   ["**Raggiunto**","chiudi la diagnosi risolta"],
   ["**Parzialmente raggiunto**","correggi l'obiettivo irrealistico"],
   ["**Non raggiunto**","cambi gli interventi inefficaci — o torni all'accertamento"]]},

{id:"s45", tipo:"icone", tema:"chiaro", sopratitolo:"Come si chiude una risposta",
  voci:[
   {icona:"orologio", t:"«Rivaluto dopo 30 minuti»"},
   {icona:"avviso", t:"«Rimisuro l'NRS»"},
   {icona:"goccia", t:"«Verifico la ripresa della diuresi»", key:true}]},

{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"Il punto che si perde per distrazione",
  righe:[
   {sb:"Elenco di interventi clinicamente perfetti — e finisce lì",
    ok:"…e **come verificherò l'esito**: senza questo la risposta è incompleta"}]},

{id:"s47", tipo:"catena", tema:"chiaro", sopratitolo:"Lo schema, su qualunque traccia", attive:[0,1],
  passi:SCHEMA},
{id:"s48", tipo:"catena", tema:"chiaro", sopratitolo:"Lo schema, su qualunque traccia",
  passi:SCHEMA},

{id:"s49", tipo:"titolo", tema:"chiaro", sopratitolo:"L'ultimo consiglio",
  titolo:"Una risposta **strutturata**<br>con qualche contenuto in meno<br>vale più di un elenco disordinato.",
  sotto:"Vale anche quando l'argomento clinico non è il tuo più forte."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"2.2", sottotitolo:"Modelli teorici<br>e tassonomie infermieristiche",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
