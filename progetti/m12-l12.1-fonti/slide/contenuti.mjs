// Contenuto delle 50 scene della lezione 12.1 — le fonti e il diritto alla salute.
// La gerarchia delle fonti è un elenco che si accende; l'art. 32 una
// citazione per comma; i tre principi della 833 un «tre» che si accende;
// le sigle e il metodo fonte → contenuto → anno sono tabelle.

// La gerarchia è un elenco numerato dall'alto: in piramide sei strati non
// ci stanno (la rampa ha cinque tinte), in scala i gradini bassi tagliano il testo.
const FONTI = [
  {n:"1", t:"**Costituzione** · e leggi costituzionali"},
  {n:"2", t:"**Unione europea** · regolamenti e direttive"},
  {n:"3", t:"**Leggi dello Stato** · e atti con forza di legge"},
  {n:"4", t:"**Leggi regionali** · nelle materie di competenza"},
  {n:"5", t:"**Regolamenti** · DPR, decreti ministeriali"},
  {n:"6", t:"**Atti amministrativi** · delibere di Giunta regionale e aziendali"}];

const PRINCIPI = [
  {n:"1", t:"Universalità", d:"tutta la **popolazione**, non categorie"},
  {n:"2", t:"Uguaglianza", d:"a parità di bisogno, **parità di accesso**"},
  {n:"3", t:"Globalità", d:"**prevenzione**, **cura**, **riabilitazione**"}];

const SIGLE = (righe, sop) => ({tipo:"tabella", tema:"chiaro", sopratitolo:sop, colonne:["30%","70%"],
  intestazioni:["Sigla", "Si legge"], righe, chiave:[]});

const METODO = (righe, k, sop) => ({tipo:"tabella", tema:"chiaro", sopratitolo:sop, colonne:["34%","46%","20%"],
  intestazioni:["Fonte", "Contenuto", "Anno"], righe, chiave:k});
const M_COST = ["Costituzione, art. 32", "diritto alla **salute**", "**1948**"];
const M_TIT5 = ["L. cost. 3/2001", "Titolo V: salute materia **concorrente**", "**2001**"];
const M_833  = ["L. 833", "istituzione del **SSN**", "**1978**"];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 12 · Organizzazione, normativa e sicurezza",
  titolo:"Le fonti e il<br>diritto alla salute", sottotitolo:"12.1 · La gerarchia delle fonti, l'articolo 32, il Titolo V, la legge 833/1978",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · nei concorsi pubblici questa parte non manca mai",
  testo:"Non più il letto del paziente, ma il **sistema** in cui lavoriamo."},
{id:"s03", tipo:"tre", tema:"chiaro", sopratitolo:"Premia chi collega una norma al suo anno e al suo contenuto · le fondamenta", box:[
  {n:"1", t:"Le fonti del diritto"}, {n:"2", t:"L'articolo 32", d:"della **Costituzione**"}, {n:"3", t:"La legge del SSN", d:"che lo ha **istituito**"}]},

{id:"s04", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"La gerarchia delle fonti · l'UE prevale nelle materie di competenza europea",
  celle:FONTI, attive:[0,1]},
{id:"s05", tipo:"norma", tema:"chiaro", etichetta:"Leggi ordinarie e atti con forza di legge", sigla:"D.Lgs.",
  testo:"Il decreto legislativo: emanato dal **Governo** su **delega del Parlamento**."},
{id:"s06", tipo:"cifre", tema:"chiaro", sopratitolo:"Il decreto-legge · emanato dal Governo in casi di necessità e urgenza", voci:[
  {n:"60", suf:"giorni", d:"per la **conversione in legge**", key:true}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Sotto le leggi dello Stato", col:[
  {h:"Leggi regionali", t:"nelle materie di **competenza** delle Regioni"},
  {h:"Regolamenti", t:"per esempio **DPR** e **decreti ministeriali**", key:true}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Infine gli atti amministrativi: il gradino più vicino al lavoro di ogni giorno",
  celle:FONTI},
{id:"s09", tipo:"titolo", tema:"profondo",
  titolo:"Una fonte inferiore<br>non può contraddire<br>una **superiore**.",
  sotto:""},

{id:"s10", tipo:"citazione", tema:"chiaro", sopratitolo:"Da conoscere quasi a memoria · comma 1",
  testo:"La Repubblica tutela la salute come **fondamentale diritto dell'individuo** e **interesse della collettività**",
  fonte:"Costituzione · art. 32"},
{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Art. 32, comma 1 · e garantisce cure gratuite agli indigenti",
  testo:"L'unico diritto che la Costituzione definisce espressamente **fondamentale**."},
{id:"s12", tipo:"citazione", tema:"chiaro", sopratitolo:"Comma 2 · e mai oltre i limiti del rispetto della persona umana",
  testo:"Nessuno può essere obbligato a un determinato trattamento sanitario se non per **disposizione di legge**",
  fonte:"Costituzione · art. 32"},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Da qui derivano due cose", col:[
  {h:"Il principio", t:"del **consenso informato**"}, {h:"L'eccezione", t:"i trattamenti sanitari **obbligatori**", key:true}]},

{id:"s14", tipo:"venn", tema:"chiaro", sopratitolo:"Le due anime dell'articolo 32",
  sx:{t:"Individuo", d:"un **diritto**"},
  dx:{t:"Collettività", d:"un **interesse**"},
  centro:"la salute: due anime che a volte si tengono in **equilibrio**"},
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Consenso informato · lezione 1.6", sigla:"L. 219/2017",
  testo:"Libertà di scegliere, e anche di **rifiutare** le cure."},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Interesse della collettività · solo in casi eccezionali, solo per legge", celle:[
  {n:"·", t:"Il **TSO** · lezione 11.3", key:true}, {n:"·", t:"Le **vaccinazioni** obbligatorie"}]},
{id:"s17", tipo:"titolo", tema:"profondo",
  titolo:"**Riserva di legge**:<br>solo una legge può imporre<br>un trattamento sanitario.",
  sotto:""},

{id:"s18", tipo:"tre", tema:"chiaro", sopratitolo:"Gli altri articoli che si collegano alla sanità", box:[
  {n:"Art. 2", t:"Solidarietà", d:"diritti **inviolabili** e doveri di solidarietà"},
  {n:"Art. 3", t:"Uguaglianza", d:"**formale** e **sostanziale**"}]},
{id:"s19", tipo:"tre", tema:"chiaro", sopratitolo:"Gli altri articoli che si collegano alla sanità", box:[
  {n:"Art. 13", t:"Libertà personale", d:"inviolabile · la ritroviamo nella **contenzione**"},
  {n:"Art. 117", t:"Riparto", d:"delle competenze fra **Stato** e **Regioni**"}]},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"Art. 97 · buon andamento e imparzialità della pubblica amministrazione",
  testo:"Agli impieghi pubblici si accede mediante **concorso**."},

{id:"s21", tipo:"norma", tema:"chiaro", etichetta:"Riforma del Titolo V della Costituzione", sigla:"L. cost. 3/2001",
  testo:"Ridisegna il **riparto** delle competenze fra Stato e Regioni."},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Tutela della salute: legislazione concorrente", col:[
  {h:"Lo Stato", t:"fissa i **principi fondamentali**"},
  {h:"Le Regioni", t:"legiferano nel **dettaglio** e **organizzano** i servizi", key:true}]},
{id:"s23", tipo:"norma", tema:"chiaro", etichetta:"Competenza esclusiva dello Stato", sigla:"LEA",
  testo:"Livelli essenziali delle prestazioni, **uniformi** su tutto il territorio."},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"La sede dell'accordo: la Conferenza Stato-Regioni · Modulo 13",
  testo:"La sanità veneta: **regole proprie** dentro una **cornice nazionale**."},

{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Prima del SSN, fino al 1978: il sistema mutualistico", col:[
  {h:"L'assistenza dipendeva", t:"dalla **categoria lavorativa**"}, {h:"E dipendeva", t:"dai **contributi** versati", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Numerosi enti mutualistici", celle:[
  {n:"!", t:"Prestazioni **diverse**"}, {n:"!", t:"Esclusi e **disuguaglianze**"},
  {n:"!", t:"**Crisi finanziaria** degli enti"}, {n:"→", t:"1978: la **svolta**", key:true}]},

{id:"s27", tipo:"norma", tema:"chiaro", etichetta:"Legge 23 dicembre 1978, n. 833", sigla:"L. 833/1978",
  testo:"Istituisce il **Servizio Sanitario Nazionale**."},
{id:"s28", tipo:"tre", tema:"chiaro", sopratitolo:"I tre principi · da dire sempre insieme", box:PRINCIPI, attive:[0,1]},
{id:"s29", tipo:"tre", tema:"chiaro", sopratitolo:"I tre principi · non solo la malattia", box:PRINCIPI, attive:[0,1,2]},
{id:"s30", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il finanziamento",
  da:{h:"Prima", t:"contributi delle categorie"}, a:{h:"Con la 833", t:"**fiscalità generale**"},
  sotto:"L'organizzazione: le **Unità Sanitarie Locali** (USL)."},
{id:"s31", tipo:"norma", tema:"chiaro", etichetta:"Legge 833/1978 · lezione 11.3", sigla:"Artt. 33-35",
  testo:"Accertamenti e trattamenti sanitari **volontari** e **obbligatori**."},

{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli obiettivi della 833 · ancora attuali", celle:[
  {t:"Una **coscienza sanitaria** nella popolazione", key:true}, {t:"**Prevenzione** di malattie e infortuni"},
  {t:"**Diagnosi** e cura"}, {t:"**Riabilitazione**"}]},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Molti temi di questo corso hanno qui la loro radice", celle:[
  {t:"Salute nei **luoghi di lavoro**"}, {t:"Igiene degli **alimenti**"}, {t:"Salute **mentale**"},
  {t:"Tutela **materno-infantile** e degli **anziani**"}, {t:"**Partecipazione** dei cittadini", key:true}]},

{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"In Veneto: l'integrazione fra sanitario e sociale", passi:[
  {t:"**SSN**", d:"Servizio Sanitario Nazionale"}, {t:"**Servizi sanitari regionali**"},
  {t:"Servizio **Socio** Sanitario Regionale", d:"il Veneto", key:true}]},
{id:"s35", tipo:"norma", tema:"chiaro", etichetta:"Le aziende in Veneto · lo approfondiamo nel Modulo 13", sigla:"ULSS",
  testo:"Unità Locali **Socio** Sanitarie: la S di socio."},

{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · una domanda d'orale tipica",
  testo:"«Quale articolo tutela la salute, e che cosa stabilisce sui **trattamenti obbligatori**?»"},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La risposta completa · è l'articolo 32", celle:[
  {t:"**Diritto fondamentale** dell'individuo", key:true}, {t:"**Interesse** della collettività"}, {t:"**Cure gratuite** agli indigenti"}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Al secondo comma", col:[
  {h:"L'obbligo", t:"solo **per legge**"}, {h:"Il limite", t:"il **rispetto della persona umana**", key:true}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Poi un collegamento · la norma legata alla pratica", celle:[
  {n:"→", t:"Il **TSO** della L. 833/1978"}, {n:"→", t:"Il **consenso** della L. 219/2017", key:true}]},

{id:"s40", ...SIGLE([["L.", "legge"], ["D.Lgs.", "decreto **legislativo**"], ["D.L.", "decreto-**legge**"],
       ["DPR", "decreto del **Presidente della Repubblica**"]], "Come si leggono le sigle")},
{id:"s41", ...SIGLE([["DM", "decreto **ministeriale**"], ["DPCM", "decreto del **Presidente del Consiglio** dei Ministri"],
       ["L.R.", "legge **regionale**"], ["DGR", "deliberazione della **Giunta regionale**"]],
      "Come si leggono le sigle · numero e anno identificano l'atto")},

{id:"s42", ...METODO([M_COST], [0], "Il metodo per tutto il modulo · anche nel quaderno")},
{id:"s43", ...METODO([M_COST, M_TIT5, M_833], [1,2], "Il metodo per tutto il modulo · la completeremo nel riepilogo")},

{id:"s44", tipo:"norma", tema:"chiaro", etichetta:"In Veneto · integrazione socio-sanitaria · Modulo 13", sigla:"L.R. 19/2016",
  testo:"Un modello proprio dentro il Titolo V: istituisce **Azienda Zero**."},

{id:"s45", tipo:"catena", tema:"chiaro", sopratitolo:"La tabella · la gerarchia delle fonti", passi:[
  {t:"**Costituzione**", key:true}, {t:"**UE**"}, {t:"**Leggi** e atti con forza di legge"},
  {t:"Leggi **regionali**"}, {t:"**Regolamenti**"}, {t:"Atti **amministrativi**"}]},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La tabella · l'articolo 32", celle:[
  {t:"Diritto **fondamentale** e interesse **collettivo**"}, {t:"**Cure gratuite** agli indigenti"},
  {t:"Trattamenti obbligatori **solo per legge**", key:true}, {t:"Nel **rispetto della persona**"}]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella", colonne:["32%","68%"],
  intestazioni:["Fonte", "Da ricordare"], righe:[
  ["Titolo V (2001)", "salute **concorrente** · LEA **esclusivi** dello Stato"],
  ["L. 833/1978", "SSN **universale**, **uguale**, **globale**"]], chiave:[1]},

{id:"s48", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · come è cambiato il SSN",
  testo:"Le riforme degli anni Novanta: l'**aziendalizzazione**."},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Competenza esclusiva dello Stato, come abbiamo visto oggi",
  testo:"I **LEA**: i livelli essenziali di assistenza."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"12.2<br>Le riforme del SSN<br>e i LEA", sottotitolo:"L'aziendalizzazione e i livelli essenziali di assistenza",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
