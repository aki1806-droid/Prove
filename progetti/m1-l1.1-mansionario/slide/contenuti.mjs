// Contenuto delle 50 scene. *accento*  **accento in semibold**
const CINQUE = [
 {t:"**Partecipa** all'identificazione dei bisogni di salute della persona e della collettività"},
 {t:"**Identifica** i bisogni di assistenza infermieristica e ne **formula** gli obiettivi"},
 {t:"**Pianifica, gestisce e valuta** l'intervento assistenziale infermieristico"},
 {t:"**Garantisce** la corretta applicazione delle prescrizioni diagnostico-terapeutiche"},
 {t:"**Agisce** da solo o con gli altri operatori, avvalendosi del personale di supporto"},
];
const TRE_DIFETTI = [
 {t:"Rigido", d:"ogni innovazione clinica rendeva l'elenco vecchio: l'atto nuovo non c'era scritto"},
 {t:"Deresponsabilizzante", d:"si rispondeva dell'esecuzione dell'atto, non della qualità dell'assistenza"},
 {t:"Incoerente con la formazione", d:"un laureato con in mano un elenco di mansioni"},
];
const TRE_COSE_42 = [
 {t:"**Abroga il mansionario**", d:"e con esso la logica dell'elenco chiuso"},
 {t:"Da professione sanitaria **ausiliaria** a professione **sanitaria**", d:"cade l'aggettivo che la definiva per relazione a un'altra"},
 {t:"**Individua i criteri**", d:"che delimitano il campo proprio di attività e responsabilità"},
];
const FONTI = [
 {n:"01", t:"Profilo professionale", d:"DM 739/1994"},
 {n:"02", t:"Ordinamenti didattici", d:"corso di laurea e formazione post-base"},
 {n:"03", t:"Codice deontologico", d:"FNOPI"},
];
const LIMITE = "le competenze previste per le professioni **mediche** e per le altre professioni del ruolo sanitario con formazione universitaria";
const TAPPE = [
 {anno:"1974", et:"mansionario"},
 {anno:"1992", et:"formazione universitaria"},
 {anno:"1994", et:"profilo professionale", key:true},
 {anno:"1999", et:"cade il mansionario", key:true},
 {anno:"2000", et:"autonomia professionale"},
 {anno:"2006", et:"albo obbligatorio"},
 {anno:"2018", et:"gli Ordini"},
];
const TRAPPOLE = [
 {sb:"«il mansionario è stato abrogato dal decreto del 1994»", ok:"il 1994 istituisce il profilo; l'abrogazione è del *1999*"},
 {sb:"«l'assistenza è di natura tecnica e relazionale»", ok:"incompleta: manca *educativa*"},
 {sb:"«l'infermiere è una professione sanitaria ausiliaria»", ok:"superata dalla *legge 42 del 1999*"},
];
const MEMO = [
 "Mansionario: **DPR 225/1974**, abrogato dalla **legge 42/1999**",
 "Profilo: **DM 739/1994** — responsabile dell'assistenza generale infermieristica",
 "Natura dell'assistenza: **tecnica, relazionale ed educativa**",
 "Le fonti del campo di attività sono **tre**, più il limite delle altre professioni laureate",
 "Autonomia: **L. 251/2000** · Albo obbligatorio: **L. 43/2006**",
];


// --- figure ricorrenti della lezione ---
const DIFETTI = [
 {icona:"lucchetto", t:"Rigido", d:"ogni innovazione clinica rendeva l'elenco vecchio"},
 {icona:"divieto",   t:"Deresponsabilizzante", d:"si rispondeva dell'atto, non dell'assistenza"},
 {icona:"cappello",  t:"Incoerente con la formazione", d:"l'università formava un professionista, l'elenco un esecutore"},
];
const ATTIVITA = [
 {n:"1", t:"**Partecipa** all'identificazione dei bisogni **di salute**"},
 {n:"2", t:"**Identifica** i bisogni **di assistenza infermieristica** e formula gli obiettivi"},
 {n:"3", t:"**Pianifica, gestisce e valuta** l'intervento assistenziale"},
 {n:"4", t:"**Garantisce** la corretta applicazione delle prescrizioni"},
 {n:"5", t:"**Agisce** individualmente o in collaborazione, anche con il personale di supporto"},
];
const L42 = [
 {t:"Abroga il mansionario", d:"e con esso la logica dell'elenco chiuso"},
 {t:"Cambia la denominazione", d:"da «ausiliarie» a **professioni sanitarie**"},
 {t:"Individua i criteri", d:"che delimitano il campo proprio di attività", key:true},
];
const TAPPE11 = [
 {anno:1974, et:"mansionario"}, {anno:1992, et:"formazione all'università"},
 {anno:1994, et:"profilo · DM 739"}, {anno:1999, et:"legge 42", key:true},
 {anno:2000, et:"legge 251"}, {anno:2006, et:"albo · legge 43"}, {anno:2018, et:"Ordini"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · La professione infermieristica",
  titolo:"Dal mansionario<br>alle competenze", sottotitolo:"Le fonti del campo di attività",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8",
  testo:"Partiamo dal punto da cui *discende tutto il resto*."},
{id:"s03", tipo:"titolo", tema:"chiaro", sopratitolo:"La domanda di partenza",
  titolo:"Che cosa può fare<br>un infermiere?", sotto:"E soprattutto: *chi lo stabilisce*."},
{id:"s04", tipo:"icone", tema:"chiaro", sopratitolo:"In questa lezione", voci:[
  {icona:"libro",       t:"Il mansionario", d:"che cos'era e perché è caduto"},
  {icona:"bilancia",    t:"Le tre fonti", d:"il campo proprio di attività"},
  {icona:"certificato", t:"L'autonomia", d:"legge 251 e albo"},
  {icona:"avviso",      t:"Le trappole", d:"quelle che tornano nei quiz"}]},

{id:"s05", tipo:"norma", tema:"chiaro", sopratitolo:"Il mansionario",
  etichetta:"Fino al 1999", sigla:"DPR 225/1974", testo:"Un elenco *tassativo* di mansioni."},
{id:"s06", tipo:"tabella", tema:"chiaro", sopratitolo:"Due modi opposti di definire una professione",
  intestazioni:["","Mansionario (fino al 1999)","Dal 1999 in poi"], colonne:["20%","40%","40%"],
  righe:[
   ["La regola","Un **elenco tassativo** di mansioni","Un **perimetro** definito da tre fonti"],
   ["Il criterio","È consentito ciò che l'elenco prevede","È consentito ciò che rientra nel perimetro"],
   ["Il nome","Professioni sanitarie **ausiliarie**","Professioni **sanitarie**"]]},

{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"La collocazione della professione",
  testo:"Professioni sanitarie **ausiliarie**.",
  sotto:"Ausiliarie rispetto alla professione medica. Non un dettaglio lessicale: la posizione della professione dentro il sistema."},

{id:"s08", tipo:"icone", tema:"chiaro", sopratitolo:"I tre difetti che l'hanno condannato",
  attive:[0], voci:DIFETTI},

{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"I tre difetti che l'hanno condannato",
  attive:[0,1], voci:DIFETTI},

{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"I tre difetti che l'hanno condannato",
  attive:[0,1,2], voci:DIFETTI},

{id:"s11", tipo:"norma", tema:"chiaro", sopratitolo:"Il profilo professionale",
  etichetta:"Prima dell'abrogazione", sigla:"DM 739/1994",
  testo:"Individua la *figura* e il *profilo professionale* dell'infermiere."},
{id:"s12", tipo:"citazione", tema:"profondo", sopratitolo:"La formula da sapere alla lettera",
  testo:"L'infermiere è l'operatore sanitario **responsabile** dell'assistenza generale infermieristica",
  fonte:"DM 739/1994 · art. 1"},
{id:"s13", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il test",
  da:{h:"Non dice", t:"collabora · esegue"}, a:{h:"Dice", t:"risponde in proprio"},
  sotto:"Se puoi sostituire *responsabile* con *collabora* e la frase regge lo stesso, non l'hai capita."},

{id:"s14", tipo:"icone", tema:"chiaro", sopratitolo:"La natura dell'assistenza infermieristica", voci:[
  {icona:"ingranaggio", t:"Tecnica", d:"il gesto, la procedura, il presidio"},
  {icona:"cuoremano",   t:"Relazionale", d:"la relazione di cura con la persona"},
  {icona:"cappello",    t:"Educativa", d:"è quella che sparisce nei distrattori", key:true}]},

{id:"s15", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore più diffuso",
  righe:[{sb:"«di natura tecnica e relazionale»", ok:"tecnica, relazionale ed *educativa*: tre, non due"}]},

{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Le cinque attività · DM 739/1994 art. 1 c. 3",
  testo:"Il primo dei *due passaggi* da mandare a memoria.",
  sotto:"Le attività dell'infermiere in relazione al processo assistenziale."},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1],
  sopratitolo:"Le cinque attività — DM 739, comma 3", celle:ATTIVITA},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2],
  sopratitolo:"Le cinque attività — DM 739, comma 3", celle:ATTIVITA},

{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3,4],
  sopratitolo:"Le cinque attività — DM 739, comma 3", celle:ATTIVITA},

{id:"s20", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il personale di supporto",
  da:{h:"Non è", t:"delegare la responsabilità"}, a:{h:"È", t:"avvalersi dell'opera"},
  sotto:"La responsabilità di ciò che gli attribuisci *resta tua*."},

{id:"s21", tipo:"sostituzione", tema:"tenue", sopratitolo:"Il punto che si sbaglia di più",
  da:{h:"Garantire non è", t:"eseguire automaticamente"},
  a:{h:"Garantire è", t:"rispondere che sia applicata correttamente"}},
{id:"s22", tipo:"elenco", tema:"chiaro", sopratitolo:"Che cosa comporta", numerato:false, voci:[
  {t:"**Verificare** la prescrizione"},
  {t:"**Rilevare** le incongruenze"},
  {t:"**Non dare corso** a una prescrizione palesemente errata senza prima averla chiarita"}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"L'errore speculare",
  righe:[{sb:"rifiutare di eseguire perché non si è d'accordo", ok:"il dovere è *chiarire*, non decidere al posto del medico"}]},

{id:"s24", tipo:"numero", tema:"chiaro", sopratitolo:"Lo spartiacque", cifra:"1999",
  testo:"Legge 42"},
{id:"s25", tipo:"catena", tema:"chiaro", sopratitolo:"Legge 42/1999 — tre cose in una",
  attive:[0,1], passi:L42},

{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Legge 42/1999 — tre cose in una",
  attive:[0,1,2], passi:L42},

{id:"s27", tipo:"titolo", tema:"profondo", sopratitolo:"Il secondo passaggio da mandare a memoria",
  titolo:"Il campo proprio di attività<br>e responsabilità", sotto:"è determinato da *tre fonti*."},
{id:"s28", tipo:"fonti", tema:"profondo", sopratitolo:"Le tre fonti · L. 42/1999",
  box:FONTI, testoLimite:LIMITE, limite:false},
{id:"s29", tipo:"fonti", tema:"profondo", sopratitolo:"Le tre fonti · L. 42/1999",
  box:FONTI, testoLimite:LIMITE, limite:true},
{id:"s30", tipo:"frase", tema:"chiaro", sopratitolo:"Perché tre e non una",
  testo:"Una fonte sola tornerebbe a essere *un elenco*.",
  sotto:"Se all'orale citi solo il profilo, hai dato una risposta *a un terzo*."},

{id:"s31", tipo:"perimetro", tema:"chiaro", sopratitolo:"Il cambio di paradigma",
  sx:"Elenco di atti consentiti", dx:"Perimetro",
  atti:["praticare iniezioni", "eseguire medicazioni", "rilevare i parametri", "e nient'altro"],
  voci:[
  "ciò che rientra nel profilo", "in ciò che ti è stato insegnato", "in ciò che la deontologia consente"]},
{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Fonti dinamiche",
  testo:"Il perimetro si sposta quando si spostano *formazione* e *profilo*.",
  sotto:"È esattamente l'elasticità che al mansionario mancava."},

{id:"s33", tipo:"norma", tema:"chiaro", sopratitolo:"L'autonomia professionale",
  etichetta:"Un anno dopo", sigla:"L. 251/2000",
  testo:"Attività dirette alla prevenzione, alla cura e alla salvaguardia della salute, *con autonomia professionale*."},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Pianificare per obiettivi",
  testo:"Scrivere il *risultato atteso* prima dell'intervento. E poi *misurarlo*."},
{id:"s35", tipo:"sostituzione", tema:"tenue", sopratitolo:"La sfumatura che vale punti",
  da:{h:"Autonomia non è", t:"indipendenza dall'équipe"},
  a:{h:"Autonomia è", t:"nel tuo campo decidi tu"},
  sotto:"E quindi *ne rispondi tu*. È un guadagno che arriva con un prezzo."},

{id:"s36", tipo:"titolo", tema:"profondo", sopratitolo:"In Veneto",
  titolo:"La dirigenza infermieristica", sotto:"Discende dalla *legge 251 del 2000*."},
{id:"s37", tipo:"icone", tema:"chiaro", sopratitolo:"In Veneto", voci:[
  {icona:"ospedale", t:"Atti aziendali", d:"è lì che la funzione infermieristica è collocata"},
  {icona:"persone",  t:"Struttura delle professioni sanitarie", d:"la forma organizzativa che ne discende"},
  {icona:"certificato", t:"Dirigenza", d:"resa possibile dalla legge 251/2000"}]},

{id:"s38", tipo:"norma", tema:"chiaro", sopratitolo:"Albo obbligatorio",
  etichetta:"Requisito del bando", sigla:"L. 43/2006",
  testo:"Iscrizione all'albo *obbligatoria* per l'esercizio, anche per il dipendente pubblico."},
{id:"s39", tipo:"scala", tema:"chiaro", sopratitolo:"I quattro livelli — legge 43/2006", gradini:[
  {n:"1", t:"Professionista", d:"laurea e iscrizione all'albo"},
  {n:"2", t:"Coordinatore", d:"master di primo livello"},
  {n:"3", t:"Specialista", d:"master clinico"},
  {n:"4", t:"Dirigente", d:"laurea magistrale", key:true}]},

{id:"s40", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L. 3/2018 · legge Lorenzin",
  da:{h:"Prima", t:"Collegi IPASVI"}, a:{h:"Dal 2018", t:"Ordini OPI"},
  sotto:"Con la federazione nazionale *FNOPI*."},

{id:"s41", tipo:"assetempo", tema:"chiaro", sopratitolo:"Venticinque anni in una riga",
  da:1970, a:2022, decenni:[1980,1990,2000,2010,2020], tappe:TAPPE11.slice(0,4)},

{id:"s42", tipo:"assetempo", tema:"chiaro", sopratitolo:"Venticinque anni in una riga",
  da:1970, a:2022, decenni:[1980,1990,2000,2010,2020], tappe:TAPPE11},

{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"I distrattori tipici",
  righe:TRAPPOLE, attive:[0]},
{id:"s44", tipo:"trappola", tema:"tenue", sopratitolo:"I distrattori tipici",
  righe:TRAPPOLE, attive:[0,1,2]},
{id:"s45", tipo:"frase", tema:"chiaro", sopratitolo:"Il criterio di scelta",
  testo:"Fra due opzioni plausibili, scegli quella che *non toglie niente*."},

{id:"s46", tipo:"memo", tema:"profondo", sopratitolo:"I cinque punti che non si sbagliano",
  voci:MEMO, attive:[0,1]},
{id:"s47", tipo:"memo", tema:"profondo", sopratitolo:"I cinque punti che non si sbagliano",
  voci:MEMO, attive:[0,1,2,3]},
{id:"s48", tipo:"memo", tema:"profondo", sopratitolo:"I cinque punti che non si sbagliano",
  voci:MEMO, attive:[0,1,2,3,4]},
{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Se porti a casa una cosa sola",
  testo:"Non ti si chiede più di sapere *che cosa puoi fare*. Ti si chiede di saper dire *da dove viene*."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine della micro-lezione 1.1",
  titolo:"1.2 Il profilo<br>professionale", sottotitolo:"nel dettaglio, attività per attività",
  ente:"Nella dispensa: 15 quiz e la traccia di risposta sintetica già svolta"},
];
