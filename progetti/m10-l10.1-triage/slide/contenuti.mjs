// Contenuto delle 50 scene della lezione 10.1 — il sistema dell'emergenza
// e il triage. Nessun corpo nuovo: la catena della chiamata è un percorso,
// i mezzi una scala, i cinque codici una tabella e cifre, le fasi del
// triage un percorso a cinque tappe, la rivalutazione il titolo profondo.

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Emergenza e area critica",
  titolo:"Il sistema dell'emergenza<br>e il triage", sottotitolo:"10.1 · 118 e 112, i mezzi, i cinque codici, le fasi, la rivalutazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · il modulo degli algoritmi e dei minuti che contano",
  testo:"Si comincia dall'**organizzazione**: come funziona il sistema che risponde a una chiamata di soccorso."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"E come il pronto soccorso decide chi viene visitato prima · un'attività infermieristica per eccellenza",
  testo:"Il modello nazionale a **cinque codici** è una domanda d'esame quasi certa."},

{id:"s04", tipo:"confronto", tema:"chiaro", sopratitolo:"Il sistema dell'emergenza territoriale", col:[
  {h:"118", t:"il sistema di **emergenza sanitaria** territoriale", key:true}, {h:"112", t:"**Numero Unico Europeo**: una centrale unica risponde e smista"}]},
{id:"s05", tipo:"percorso", tema:"chiaro", sopratitolo:"La centrale operativa sanitaria · sanitario, vigili del fuoco, forze dell'ordine", tappe:[
  {t:"Chiamata", d:""}, {t:"Dispatch", d:"intervista strutturata: la gravità", key:true}, {t:"Mezzo", d:"adeguato"}, {t:"Guida", d:"le prime manovre"}], attive:[0,1,2,3]},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"Per esempio la rianimazione cardiopolmonare al telefono",
  testo:"I minuti prima dell'arrivo del mezzo **non sono minuti vuoti**."},

{id:"s07", tipo:"scala", tema:"chiaro", sopratitolo:"I mezzi di soccorso", gradini:[
  {n:"1", t:"Mezzo di base: soccorritori formati"}, {n:"2", t:"Mezzo con infermiere: protocolli avanzati", key:true}]},
{id:"s08", tipo:"scala", tema:"chiaro", sopratitolo:"I mezzi di soccorso", gradini:[
  {n:"1", t:"Di base"}, {n:"2", t:"Con infermiere"}, {n:"3", t:"Avanzato con medico, o automedica", key:true}, {n:"4", t:"Elisoccorso: distanza, terreno"}]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"La centrale decide in base al codice di gravità e alla disponibilità · e spesso li combina",
  testo:"Un mezzo di base **arriva per primo**, un mezzo avanzato **lo raggiunge**."},

{id:"s10", tipo:"trappola", tema:"chiaro", sopratitolo:"Il triage intraospedaliero · all'arrivo in pronto soccorso", righe:[
  {sb:"Priorità in base all'ordine di arrivo", ok:"Priorità in base alla **gravità**"}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Chi lo fa e che cosa lo regola", celle:[
  {t:"Un **infermiere** con **formazione specifica**", key:true}, {t:"Le **Linee di indirizzo nazionali** sul triage intraospedaliero"}]},
{id:"s12", tipo:"norma", tema:"chiaro", etichetta:"Conferenza Stato-Regioni · uguale in tutta Italia: il modello che il concorso chiede", sigla:"2019",
  testo:"Il modello a **cinque codici**."},

{id:"s13", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I cinque codici · da sapere con numero, colore e tempo", celle:[
  {n:"1", t:"**Rosso** · emergenza · accesso **immediato** · compromissione delle funzioni vitali", key:true}]},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il codice che non può aspettare in sala, anche se il paziente cammina e parla", celle:[
  {n:"2", t:"**Arancione** · urgenza · entro **15 minuti** · rischio di compromissione delle funzioni vitali", key:true}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I cinque codici", celle:[
  {n:"3", t:"**Azzurro** · urgenza differibile · entro **60 minuti**", key:true}, {n:"4", t:"**Verde** · urgenza minore · entro **120 minuti**"}]},
{id:"s16", tipo:"tabella", tema:"chiaro", sopratitolo:"I cinque codici · l'azzurro è la novità rispetto al vecchio sistema a quattro colori", intestazioni:["Codice","Colore","Priorità","Tempo"], colonne:[0.7,1,1.6,1], righe:[
  ["1","**Rosso**","emergenza","immediato"],
  ["2","**Arancione**","urgenza","15 min"],
  ["3","**Azzurro**","urgenza differibile","60 min"],
  ["4","**Verde**","urgenza minore","120 min"],
  ["5","**Bianco**","non urgenza","240 min"]]},

{id:"s17", tipo:"percorso", tema:"chiaro", sopratitolo:"Le fasi del triage · uno: il «colpo d'occhio» sulla porta · segni di pericolo per la vita → codice 1, subito", tappe:[
  {t:"Immediata", d:"colpo d'occhio", key:true}, {t:"Soggettiva", d:""}, {t:"Oggettiva", d:""}, {t:"Decisione", d:""}, {t:"Rivalutazione", d:""}], attive:[0]},
{id:"s18", tipo:"percorso", tema:"chiaro", sopratitolo:"Due: sintomo principale e intervista · tre: parametri vitali, segni e scale", tappe:[
  {t:"Immediata", d:""}, {t:"Soggettiva", d:"che cosa, da quando", key:true}, {t:"Oggettiva", d:"parametri, scale", key:true}, {t:"Decisione", d:""}, {t:"Rivalutazione", d:""}], attive:[1,2]},
{id:"s19", tipo:"percorso", tema:"chiaro", sopratitolo:"Quattro: codice e percorso · cinque: la fase che si dimentica più spesso", tappe:[
  {t:"Immediata", d:""}, {t:"Soggettiva", d:""}, {t:"Oggettiva", d:""}, {t:"Decisione", d:"codice e percorso"}, {t:"Rivalutazione", d:"", key:true}], attive:[3,4]},

{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"La rivalutazione · una parte essenziale del triage, e i concorsi la chiedono",
  testo:"Il codice **non è definitivo**."},
{id:"s21", tipo:"titolo", tema:"profondo",
  titolo:"Il codice<br>**non è definitivo**.",
  sotto:""},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"I pazienti in attesa vengono rivalutati", celle:[
  {t:"**Periodicamente**, secondo i tempi previsti", key:true}, {t:"Ogni volta che la situazione **cambia** o riferiscono un **peggioramento**"}]},
{id:"s23", tipo:"trappola", tema:"chiaro", sopratitolo:"Il codice può essere modificato, in aumento o in diminuzione, e ogni modifica si documenta", righe:[
  {sb:"Un paziente peggiorato in sala d'attesa senza essere rivalutato", ok:"Un **evento evitabile**"}]},

{id:"s24", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Il triage indirizza a un percorso", celle:[
  {n:"1", t:"**Fast track**: direttamente allo specialista i problemi minori e ben definiti, per esempio oculistici", key:true}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"I percorsi · una piccola ferita, una distorsione, senza passare dal medico", celle:[
  {n:"2", t:"**See and treat**: problemi minori trattati da infermieri formati secondo protocolli", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I percorsi tempo-dipendenti · il triage attiva subito la catena delle lezioni 8.1 e 8.6", celle:[
  {n:"3", t:"**Ictus**", key:true}, {n:"3", t:"**Infarto**"}, {n:"3", t:"**Trauma**"}, {n:"3", t:"**Sepsi**"}]},

{id:"s27", tipo:"norma", tema:"chiaro", etichetta:"Il sovraffollamento · un problema strutturale · una delle cause principali", sigla:"Boarding",
  testo:"Pazienti con **decisione di ricovero** che restano in pronto soccorso perché **non c'è un posto letto**."},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le conseguenze sono documentate · la Raccomandazione 8", celle:[
  {n:"!", t:"**Ritardi**"}, {n:"!", t:"Più **eventi avversi**", key:true}, {n:"!", t:"**Stress** del personale"}, {n:"!", t:"Rischio di **aggressioni**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le strategie", celle:[
  {t:"Gestione dei **posti letto**"}, {t:"**Percorsi alternativi**"}, {t:"Rafforzamento del **territorio**: DM 77/2022", key:true}]},

{id:"s30", tipo:"norma", tema:"chiaro", etichetta:"Un'area del pronto soccorso", sigla:"OBI",
  testo:"**Osservazione Breve Intensiva**: osservazione o accertamenti di breve durata prima di decidere fra **dimissione** e **ricovero**."},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Per esempio", celle:[
  {n:"1", t:"Un **dolore toracico** a basso rischio, con troponine ripetute", key:true}, {n:"2", t:"Una **sincope** da osservare qualche ora"}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Durata limitata, definita dalle indicazioni regionali · il tempo, qui, è uno strumento diagnostico", col:[
  {h:"Riduce", t:"i **ricoveri inappropriati**"}, {h:"Riduce", t:"le **dimissioni premature**", key:true}]},

{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il triage extraospedaliero · il personale del 118 valuta sul posto",
  testo:"Decide non solo la gravità, ma la **destinazione**."},
{id:"s34", tipo:"trappola", tema:"chiaro", sopratitolo:"Il principio: la centralizzazione · qualche minuto di strada in più vale un centro che sa cosa fare", righe:[
  {sb:"L'ospedale più vicino", ok:"L'ospedale **adeguato**"}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"E l'ospedale di destinazione viene avvisato in anticipo, per prepararsi", celle:[
  {n:"→", t:"Grave **politrauma**: centro traumatologico", key:true}, {n:"→", t:"**Ictus** candidato alla trombectomia: centro hub"}]},

{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"La responsabilità · come abbiamo visto nel modulo 1",
  testo:"Il triage è un **atto infermieristico autonomo**, con una responsabilità professionale diretta."},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La documentazione · il codice si deve poter spiegare, a distanza di mesi, leggendo la scheda", celle:[
  {t:"**Orario**"}, {t:"**Parametri**"}, {t:"**Motivazione** del codice", key:true}, {t:"**Rivalutazioni**"}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"La comunicazione con chi aspetta riduce la tensione · un'ultima precisazione", col:[
  {h:"Il codice è", t:"una valutazione di **priorità**", key:true}, {h:"Il codice non è", t:"una **diagnosi**"}]},

{id:"s39", tipo:"cifre", tema:"chiaro", sopratitolo:"Il caso · uomo di 55 anni, dolore toracico oppressivo da 30 minuti, sudato · quale codice?", voci:[
  {n:"150/90", suf:"", d:"pressione"}, {n:"98", suf:"bpm", d:"frequenza"}, {n:"96", suf:"%", d:"saturazione", key:true}]},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Le funzioni vitali sono conservate, ma c'è un rischio di compromissione", col:[
  {h:"Codice 1?", t:"no: funzioni vitali conservate"}, {h:"Codice 2, arancione", t:"**sì**: rischio di compromissione", key:true}]},
{id:"s41", tipo:"frase", tema:"chiaro", sopratitolo:"Si attiva il percorso del dolore toracico · lezione 8.1 · il sudore freddo pesa quanto i numeri",
  testo:"**ECG entro dieci minuti**."},
{id:"s42", tipo:"trappola", tema:"chiaro", sopratitolo:"L'errore che la domanda vuole intercettare", righe:[
  {sb:"Un codice basso perché «i parametri sono buoni»", ok:"Il **rischio** conta, non solo i numeri"}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"1", t:"Il sistema **SUEM 118**, con le sue centrali operative", key:true}, {n:"2", t:"Pronto soccorso con il **triage a cinque codici**"}]},
{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In Veneto", celle:[
  {n:"3", t:"Percorsi tempo-dipendenti in **rete**: infarto, ictus, trauma", key:true}, {n:"4", t:"**Azienda Zero** nel coordinamento regionale"}]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"All'orale · citare la rete e la centralizzazione",
  testo:"Dice che conosci il **sistema** in cui andrai a lavorare, non solo il manuale."},

{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella da fotografare", intestazioni:["Codice","Colore","Tempo"], colonne:[0.7,1.2,1], righe:[
  ["1","**Rosso**","immediato"],["2","**Arancione**","15 min"],["3","**Azzurro**","60 min"],["4","**Verde**","120 min"],["5","**Bianco**","240 min"]]},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La tabella da fotografare", celle:[
  {n:"5", t:"**Fasi**: immediata, soggettiva, oggettiva, decisione, rivalutazione"}, {n:"!", t:"Il codice **non è definitivo**, e non è una diagnosi", key:true}, {n:"→", t:"**Centralizzazione**: l'ospedale adeguato, non il più vicino"}]},

{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · lo strumento più importante del modulo",
  testo:"L'approccio **ABCDE**: in pronto soccorso, in reparto, in ambulanza."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Valutare un paziente critico",
  testo:"Anche quando **non sai ancora che cos'ha**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"10.2<br>La valutazione del<br>paziente critico: ABCDE", sottotitolo:"Lo strumento di tutto il modulo",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
