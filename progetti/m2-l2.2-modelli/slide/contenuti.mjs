// Contenuto delle 50 scene della lezione 2.2. *accento*  **accento in semibold**

const AUTORI = [
 ["**Nightingale**", "l'**ambiente**"],
 ["**Henderson**", "i **14 bisogni**"],
 ["**Orem**", "l'**autocura**"],
 ["**Gordon**", "gli **11 modelli funzionali**"],
 ["Watson", "il *caring*"],
 ["Peplau", "la relazione interpersonale"],
 ["Leininger", "il nursing transculturale"],
 ["Roy", "l'adattamento"],
 ["Neuman", "i sistemi"],
];

const BISOGNI_A = [
 {n:"1", t:"Respirare"}, {n:"2", t:"Mangiare e bere"}, {n:"3", t:"Eliminare"},
 {n:"4", t:"Muoversi e mantenere la postura"}, {n:"5", t:"Dormire e riposare"},
 {n:"6", t:"Vestirsi e svestirsi"}, {n:"7", t:"Mantenere la temperatura corporea"},
];
const BISOGNI_B = [
 {n:"8", t:"Tenere il corpo pulito"}, {n:"9", t:"Evitare i pericoli"},
 {n:"10", t:"Comunicare"}, {n:"11", t:"Praticare il proprio culto"},
 {n:"12", t:"Occuparsi in modo da realizzarsi"}, {n:"13", t:"Ricrearsi"},
 {n:"14", t:"**Apprendere**"},
];

const GORDON = [
 {n:"1", t:"Percezione e gestione della salute"},
 {n:"2", t:"Nutrizionale e metabolico"},
 {n:"3", t:"Eliminazione"},
 {n:"4", t:"Attività ed esercizio"},
 {n:"5", t:"Sonno e riposo"},
 {n:"6", t:"Cognitivo e percettivo — *il dolore sta qui*"},
 {n:"7", t:"Percezione di sé"},
 {n:"8", t:"Ruolo e relazioni"},
 {n:"9", t:"Sessualità e riproduzione"},
 {n:"10", t:"Coping e tolleranza allo stress"},
 {n:"11", t:"Valori e convinzioni"},
];

const OREM = [
 {t:"Totalmente compensativo", d:"la persona non compie **alcuna** attività di autocura — incosciente, terapia intensiva"},
 {t:"Parzialmente compensativo", d:"lei fa alcune cose, tu le altre — emiparesi che si alimenta ma va aiutata nell'igiene"},
 {t:"Di supporto ed educazione", d:"lei **può**, ma deve imparare — insulina, stomia, addestramento del caregiver", key:true},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Metodologia, documentazione e sicurezza",
  titolo:"Modelli teorici<br>e tassonomie", sottotitolo:"La griglia con cui si legge, il vocabolario con cui si scrive",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Dalla lezione 2.1 a questa",
  col:[
   {h:"2.1", t:"**Come** si ragiona: il processo in cinque fasi", grande:true},
   {h:"2.2", t:"**Con quali categorie**: i modelli e le tassonomie", grande:true}]},

{id:"s03", tipo:"venn", tema:"chiaro", sopratitolo:"Due cose diverse, e servono entrambe",
  sx:{t:"Il modello", d:"la **griglia**: senza, non sai dove guardare"},
  dx:{t:"La tassonomia", d:"il **vocabolario**: senza, non sai come dirlo"},
  centro:"Quello che non hai guardato non arriva a chi viene dopo di te"},

{id:"s04", tipo:"frase", tema:"tenue", sopratitolo:"Perché non vanno regalati",
  testo:"«**A chi si deve il modello dell'autocura?**»",
  sotto:"Domande secche. Si perdono in tre secondi e si recuperano in nessuno."},

{id:"s05", tipo:"elenco", tema:"chiaro", sopratitolo:"Quattro cose", numerato:true,
  voci:[
   {t:"A che cosa serve un **modello**"},
   {t:"I **nove autori** con il loro concetto chiave", d:"una domanda quasi sicura"},
   {t:"**Henderson, Gordon, Orem**", d:"i tre più chiesti, da vicino"},
   {t:"Le **tassonomie**", d:"NANDA, NOC, NIC"}]},

{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"Che cos'è un modello concettuale",
  testo:"Una **rappresentazione organizzata** dei concetti centrali della disciplina.",
  sotto:"Detta così sembra teoria per l'esame."},

{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"E invece serve a tre cose concrete",
  voci:[
   {icona:"occhio", t:"Orienta l'accertamento", d:"che cosa guardo"},
   {icona:"bilancia", t:"Giustifica gli interventi", d:"perché faccio questo e non un altro"},
   {icona:"persone", t:"Rende l'assistenza comunicabile", d:"anche a distanza di turni", key:true}]},

{id:"s08", tipo:"titolo", tema:"profondo",
  titolo:"Non è teoria per l'esame:<br>è la **struttura della raccolta dati**.",
  sotto:"Quello che non hai guardato non sai nemmeno di averlo perso."},

{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Il metaparadigma infermieristico · quattro concetti",
  celle:[{t:"**Persona**"}, {t:"**Ambiente**"}, {t:"**Salute**"}, {t:"**Assistenza infermieristica**"}]},

{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"Ogni teoria li declina a modo suo",
  righe:[
   {sb:"Un elenco che ne propone **cinque**", ok:"Sono **quattro**, sempre"},
   {sb:"Un elenco che mette **la malattia** al posto dell'ambiente", ok:"Il concetto è **ambiente** — è quello di Nightingale"}]},

{id:"s11", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella da fotografare · le quattro più chieste",
  intestazioni:["Autore","Concetto chiave"], colonne:["36%","64%"], chiave:[0,1,2,3],
  righe:AUTORI.slice(0,4)},
{id:"s12", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella da fotografare · le altre cinque",
  intestazioni:["Autore","Concetto chiave"], colonne:["36%","64%"],
  righe:AUTORI.slice(4)},

{id:"s13", tipo:"titolo", tema:"chiaro", sopratitolo:"Che cosa chiede davvero la domanda",
  titolo:"L'**accoppiata** nome e concetto.<br>Non la biografia.",
  sotto:"È esattamente quello che la domanda chiede, e non chiede nient'altro."},

{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Come impararle",
  righe:[
   {sb:"Recitare l'elenco in ordine, dal primo all'ultimo",
    ok:"Impararle a **coppie**: la domanda può partire dal concetto invece che dal nome"}]},

{id:"s15", tipo:"tre", tema:"chiaro", sopratitolo:"Se ne ricordi solo tre", cifre:true,
  box:[
   {n:"14", t:"Henderson", d:"bisogni"},
   {n:"—", t:"Orem", d:"autocura"},
   {n:"11", t:"Gordon", d:"modelli funzionali"}]},

{id:"s16", tipo:"icone", tema:"chiaro", sopratitolo:"La quarta più frequente",
  voci:[
   {icona:"goccia", t:"Nightingale", d:"l'**ambiente** — ed è la prima della storia della disciplina", key:true}]},

{id:"s17", tipo:"titolo", tema:"profondo",
  titolo:"**14** è Henderson.<br>**11** è Gordon.<br>Non il contrario.",
  sotto:"Il distrattore scambia questi due numeri quasi ogni volta."},

{id:"s18", tipo:"citazione", tema:"chiaro", sopratitolo:"Henderson · la definizione",
  testo:"Assistere la persona, malata o sana, nel compimento delle attività che contribuiscono alla salute o alla guarigione.",
  fonte:"Virginia Henderson — la funzione propria dell'infermiere"},

{id:"s19", tipo:"tre", tema:"chiaro", sopratitolo:"…che compirebbe da sé se avesse",
  box:[
   {n:"1", t:"Forza", d:"si **compensa**"},
   {n:"2", t:"Volontà", d:"si **sostiene**"},
   {n:"3", t:"Conoscenza", d:"si **insegna**"}]},

{id:"s20", tipo:"titolo", tema:"chiaro", sopratitolo:"Perché citarle testualmente",
  titolo:"Sono le **tre cause<br>della dipendenza** —<br>e sono tre cose diverse.",
  sotto:"Distingue chi ha studiato Henderson da chi l'ha solo sentita nominare."},

{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"I 14 bisogni · dal fisiologico in su", celle:BISOGNI_A},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"I 14 bisogni · fino all'apprendere", celle:BISOGNI_B},

{id:"s23", tipo:"piramide", tema:"chiaro", sopratitolo:"Una scala che l'assistenza percorre tutta",
  strati:[
   {t:"Realizzazione", d:"occuparsi, ricrearsi, apprendere"},
   {t:"Spirituale", d:"praticare il proprio culto"},
   {t:"Relazionale", d:"comunicare"},
   {t:"Sicurezza", d:"evitare i pericoli"},
   {t:"Fisiologico", d:"respirare, mangiare, eliminare, muoversi, dormire"}]},

{id:"s24", tipo:"titolo", tema:"tenue", sopratitolo:"Perché l'elenco finisce con «apprendere»",
  titolo:"L'educazione non è un di più<br>che si fa **se avanza tempo**.",
  sotto:"È l'ultimo gradino dell'assistenza: quello che rende liberi."},

{id:"s25", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3,4],
  sopratitolo:"Gordon · gli 11 modelli funzionali", celle:GORDON},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3,4,5,6,7],
  sopratitolo:"Gordon · gli 11 modelli funzionali", celle:GORDON},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Gordon · gli 11 modelli funzionali", celle:GORDON},

{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"Il ponte con la lezione 2.1",
  passi:[
   {t:"Modello funzionale", d:"una delle undici aree"},
   {t:"Modello **disfunzionale**", d:"l'area è alterata"},
   {t:"Diagnosi infermieristica", d:"è lì che nasce", key:true}]},

{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Un consiglio molto pratico",
  testo:"«**Effettui l'accertamento di questo paziente.**»",
  sotto:"L'elenco ordinato degli undici modelli è una struttura di risposta già pronta."},

{id:"s30", tipo:"icone", tema:"tenue", sopratitolo:"Le tre aree che chi improvvisa salta",
  voci:[
   {icona:"scudo", t:"Coping", d:"e tolleranza allo stress"},
   {icona:"cuoremano", t:"Valori", d:"e convinzioni"},
   {icona:"persone", t:"Sessualità", d:"e riproduzione", key:true}]},

{id:"s31", tipo:"tre", tema:"chiaro", sopratitolo:"Orem · il deficit di autocura è uno scarto",
  box:[
   {n:"A", t:"Richieste di autocura", d:"quello che la persona **deve** fare per sé"},
   {n:"B", t:"Capacità della persona", d:"quello che **riesce** a fare"},
   {n:"A−B", t:"Deficit", d:"lo **scarto**: è qui che entra l'infermiere", key:true}]},

{id:"s32", tipo:"trappola", tema:"chiaro", sopratitolo:"La differenza che vale una domanda",
  righe:[
   {sb:"«L'intervento serve quando c'è una **malattia**»",
    ok:"Serve quando c'è uno **scarto**: una persona malata può non avere deficit, una sana può averne"}]},

{id:"s33", tipo:"scala", tema:"chiaro", sopratitolo:"I tre sistemi di Orem", attive:[0],
  gradini:OREM},
{id:"s34", tipo:"scala", tema:"chiaro", sopratitolo:"I tre sistemi di Orem", attive:[0,1],
  gradini:OREM},
{id:"s35", tipo:"scala", tema:"chiaro", sopratitolo:"I tre sistemi di Orem", gradini:OREM},

{id:"s36", tipo:"titolo", tema:"chiaro", sopratitolo:"Che cosa misurano davvero",
  titolo:"Non tre **gravità cliniche**:<br>tre misure dello **scarto**.",
  sotto:"Fra quello che la persona deve fare per sé e quello che riesce a fare."},

{id:"s37", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La regola d'esame",
  da:{h:"Opzione debole", t:"**Sostituire** la persona<br>— anche se è più rapido"},
  a:{h:"Opzione corretta", t:"Spostarla verso il sistema<br>**meno compensativo possibile**"}},

{id:"s38", tipo:"titolo", tema:"profondo",
  titolo:"Nei casi clinici vince<br>**autonomia ed educazione**.",
  sotto:"Anche quando sostituire sarebbe più rapido — e lo è quasi sempre."},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:1, sopratitolo:"Se ognuno descrive con parole proprie…", spunta:false,
  celle:[
   {t:"L'assistenza non è **confrontabile** fra reparti", n:"×"},
   {t:"Non è **misurabile** nel tempo", n:"×"},
   {t:"Non è **ricercabile**", n:"×"}]},

{id:"s40", tipo:"titolo", tema:"chiaro", sopratitolo:"Perché nascono le tassonomie",
  titolo:"Un **vocabolario comune**<br>è la condizione perché esista<br>una ricerca infermieristica.",
  sotto:"E non solo una raccolta di esperienze."},

{id:"s41", tipo:"icone", tema:"chiaro", sopratitolo:"Tre sistemi, tre domande",
  voci:[
   {icona:"documento", t:"NANDA-I", d:"«Qual è il **problema** di questa persona?»", key:true},
   {icona:"spunta", t:"NOC", d:"«Che **risultato** voglio, e con quale misura me ne accorgo?»"},
   {icona:"ingranaggio", t:"NIC", d:"«Che cosa **faccio** per ottenerlo?»"}]},

{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"Le tre sigle, per esteso",
  intestazioni:["Sigla","Per esteso","Classifica"], colonne:["16%","46%","38%"],
  righe:[
   ["**NANDA-I**","*NANDA International*","le **diagnosi**"],
   ["**NOC**","*Nursing Outcomes Classification*","i **risultati** attesi"],
   ["**NIC**","*Nursing Interventions Classification*","gli **interventi**"]]},

{id:"s43", tipo:"trappola", tema:"chiaro", sopratitolo:"La confusione più frequente delle tre",
  righe:[
   {sb:"«NIC sono gli **outcome**, NOC gli interventi»",
    ok:"**NOC** sono gli **esiti**, **NIC** gli **interventi** — O di *outcome*, I di *intervention*"}]},

{id:"s44", tipo:"catena", tema:"chiaro", sopratitolo:"La catena, e perché è in quest'ordine",
  passi:[
   {t:"NANDA", d:"la **diagnosi**"},
   {t:"NOC", d:"il **risultato**, scelto in funzione della diagnosi"},
   {t:"NIC", d:"l'**intervento**, scelto in funzione del risultato", key:true}]},

{id:"s45", tipo:"piramide", tema:"chiaro", sopratitolo:"La tassonomia NANDA è annidata, non un elenco",
  strati:[
   {t:"13 domini", d:"il primo livello"},
   {t:"Classi", d:"ciascun dominio si suddivide in classi"},
   {t:"Diagnosi", d:"e ciascuna classe raccoglie le diagnosi"}]},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"Che cosa NANDA definisce per ogni diagnosi",
  intestazioni:["Elemento","Diagnosi reale","Diagnosi di rischio"], colonne:["34%","33%","33%"], chiave:[3],
  righe:[
   ["**Etichetta**","si:","si:"],
   ["**Definizione**","si:","si:"],
   ["**Caratteristiche definenti**","si:","no:"],
   ["**Fattori**","correlati","di **rischio**"]]},

{id:"s47", tipo:"frase", tema:"chiaro", sopratitolo:"La precisazione che all'orale vale molto",
  testo:"Il linguaggio standardizzato è uno **strumento**, non un feticcio."},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Una diagnosi impeccabile<br>ma **non aderente alla persona**<br>vale meno dell'italiano corrente.",
  sotto:"La risposta migliore riconosce tutte e due le cose."},

{id:"s49", tipo:"trappola", tema:"chiaro", sopratitolo:"L'ultimo consiglio",
  righe:[
   {sb:"Studiare a memoria l'elenco delle diagnosi NANDA",
    ok:"I concorsi chiedono la **logica**, non il catalogo — quel tempo serve a farmacologia e a emergenza"}]},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"2.3", sottotitolo:"L'accertamento<br>e le scale di valutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
