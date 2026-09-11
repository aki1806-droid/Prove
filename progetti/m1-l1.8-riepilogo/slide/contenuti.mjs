// Contenuto delle 50 scene della lezione 1.8. *accento*  **accento in semibold**
const MAPPA_A = [
 {t:"**1.1** Le fonti del campo di attività", d:"profilo, formazione, Codice — e la fine del mansionario"},
 {t:"**1.2** Il profilo professionale", d:"DM 739/1994"},
 {t:"**1.3** Formazione, Ordine, ECM, carriera"},
];
const MAPPA_B = [
 {t:"**1.4** Il Codice deontologico", d:"FNOPI 2019"},
 {t:"**1.5** La responsabilità professionale", d:"i cinque piani e la legge 24/2017"},
 {t:"**1.6** Consenso, DAT, autodeterminazione", d:"legge 219/2017"},
 {t:"**1.7** Segreto, privacy, tutela della persona"},
];
const CATENA = [
 {n:"1", t:"Competenza", d:"profilo, formazione, deontologia"},
 {n:"2", t:"Autonomia", d:"decidere nel proprio ambito"},
 {n:"3", t:"Responsabilità", d:"cinque piani, autonomi e cumulabili"},
 {n:"4", t:"Documentazione", d:"è così che la responsabilità si dimostra", key:true},
];
const NUM_A = [
 {t:"Le **fonti** del campo di attività"},
 {t:"**Nature, tipi e funzioni** dell'assistenza"},
 {t:"Le **attività del comma 3** e le **aree post-base**"},
];
const NUM_B = [
 {t:"I **livelli professionali** — e le **sanzioni** dell'Ordine"},
 {t:"I **crediti ECM** nel triennio"},
 {t:"**Articoli e capi** del Codice deontologico"},
];
const NUM_C = [
 {t:"I **piani della responsabilità**"},
 {t:"Anni di **prescrizione**: struttura ed esercente"},
 {t:"L'anno per la **rivalsa**, dal pagamento"},
 {t:"Le ore per il **referto**"},
];
const OSS = [
 {n:"1", t:"Competenza", d:"dell'operatore a cui attribuisci"},
 {n:"2", t:"Condizioni", d:"della persona assistita"},
 {n:"3", t:"Contesto", d:"organizzativo in cui l'attività si svolge"},
];
const VENETO_A = [
 {t:"**Struttura delle professioni sanitarie**", d:"è lì che gli atti aziendali collocano la funzione infermieristica"},
];
const VENETO_B = [
 {t:"**Centro regionale** per la gestione del rischio sanitario<br>e **Difensore civico regionale**",
  d:"il Difensore civico è il Garante per il diritto alla salute — legge 24/2017"},
];
const VENETO_C = [
 {t:"**Procedure aziendali sulla contenzione**", d:"prescrizione, rivalutazione, registrazione"},
 {t:"**Fascicolo sanitario elettronico** e log di accesso", d:"l'accesso non giustificato è rilevato"},
];
const FINALE_A = [
 {t:"Il **mansionario** è il DPR 225/1974, abrogato dalla **legge 42/1999**"},
 {t:"Le **fonti del campo di attività** sono tre"},
 {t:"L'infermiere è **responsabile dell'assistenza generale infermieristica**"},
];
const FINALE_B = [
 {t:"L'assistenza è di natura **tecnica, relazionale, educativa**"},
 {t:"Chi **attribuisce** risponde della scelta, chi **esegue** della corretta esecuzione"},
 {t:"La **laurea abilita**, ma per esercitare serve l'**albo**"},
];
const FINALE_C = [
 {t:"**150 crediti** ECM nel triennio"},
 {t:"La **contenzione** è eccezionale — e **mai organizzativa**"},
 {t:"I piani della responsabilità sono **cinque**, autonomi e cumulabili"},
];
const FINALE_D = [
 {t:"**Dieci anni** la struttura, **cinque** l'esercente"},
 {t:"**Rivalsa** solo per dolo o colpa grave"},
 {t:"Nessun trattamento senza **consenso libero e informato**: si può *rifiutare* tutto, non *pretendere* tutto"},
];


// --- figure ricorrenti della lezione ---
// La linea del tempo e' in scala: fra il 1974 e il 1992 ci sono diciotto anni,
// fra il 1999 e il 2000 uno. Una timeline a passo fisso direbbe il contrario.
const TEMPO = [
 {anno:1974, et:"mansionario · DPR 225"},
 {anno:1992, et:"D.Lgs. 502 · l'università"},
 {anno:1994, et:"DM 739 · il profilo"},
 {anno:1999, et:"legge 42 · D.Lgs. 229", key:true},
 {anno:2000, et:"legge 251"},
 {anno:2006, et:"legge 43 · albo"},
 {anno:2010, et:"legge 38"},
 {anno:2016, et:"GDPR"},
 {anno:2018, et:"legge 3 · Ordini"},
 {anno:2021, et:"laurea abilitante"},
];
const DIECI = [
 {n:"3",       t:"le **fonti** del campo di attività"},
 {n:"3·4·3",   t:"**nature, tipi e funzioni** dell'assistenza"},
 {n:"5",       t:"le **attività** del comma 3 e le **aree post-base**"},
 {n:"4",       t:"i **livelli** professionali e le **sanzioni** dell'Ordine"},
 {n:"150",     t:"i **crediti ECM** nel triennio"},
 {n:"53+8",    t:"**articoli e capi** del Codice deontologico"},
 {n:"5",       t:"i **piani** della responsabilità"},
 {n:"10+5",    t:"anni di **prescrizione**: struttura ed esercente"},
 {n:"1",       t:"l'anno per la **rivalsa**, dal pagamento"},
 {n:"48",      t:"le ore per il **referto**"},
];
const MEMO18 = [
 {t:"Il **mansionario** è il DPR 225/1974, abrogato dalla **legge 42/1999**"},
 {t:"Le **fonti del campo di attività** sono tre"},
 {t:"L'infermiere è **responsabile dell'assistenza generale infermieristica**"},
 {t:"L'assistenza è di natura **tecnica, relazionale, educativa**"},
 {t:"Chi **attribuisce** risponde della scelta, chi **esegue** della corretta esecuzione"},
 {t:"La **laurea abilita**, ma per esercitare serve l'**albo**"},
 {t:"**150 crediti** ECM nel triennio"},
 {t:"La **contenzione** è eccezionale — e **mai organizzativa**"},
 {t:"I piani della responsabilità sono **cinque**, autonomi e cumulabili"},
 {t:"**Dieci anni** la struttura, **cinque** l'esercente"},
 {t:"**Rivalsa** solo per dolo o colpa grave"},
 {t:"Si può **rifiutare** tutto, non **pretendere** tutto"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · Riepilogo",
  titolo:"Ricomponiamo<br>il modulo", sottotitolo:"Mappa, numeri, confusioni, casi",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 8 di 8",
  testo:"Qui non aggiungiamo niente di nuovo: **ricomponiamo**.",
  sotto:"Una mappa unica delle sette lezioni, e una linea del tempo."},
{id:"s03", tipo:"frase", tema:"tenue", sopratitolo:"Come usare questo video",
  testo:"Guardalo **due volte**: adesso, e di nuovo nei giorni prima della prova."},

{id:"s04", tipo:"elenco", tema:"chiaro", sopratitolo:"La mappa del modulo · 1", voci:MAPPA_A},
{id:"s05", tipo:"elenco", tema:"chiaro", sopratitolo:"La mappa del modulo · 2", voci:MAPPA_B},
{id:"s06", tipo:"titolo", tema:"profondo",
  titolo:"All'autonomia corrisponde<br>la **responsabilità**.",
  sotto:"Sette lezioni, un filo solo."},

{id:"s07", tipo:"catena", tema:"chiaro", sopratitolo:"La catena del modulo", passi:[
  {t:"Competenza", d:"profilo, formazione, deontologia"},
  {t:"Autonomia", d:"decidere nel proprio ambito"},
  {t:"Responsabilità", d:"cinque piani, autonomi e cumulabili"},
  {t:"Documentazione", d:"è così che la responsabilità si dimostra", key:true}]},

{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"A che serve la catena",
  testo:"È lo schema con cui rispondere a **quasi ogni domanda aperta** del modulo.",
  sotto:"Anche a quelle che non hai preparato."},

{id:"s09", tipo:"assetempo", tema:"chiaro", sopratitolo:"La linea del tempo, in scala",
  da:1970, a:2024, decenni:[1980,1990,2000,2010,2020], tappe:TEMPO.slice(0,3)},

{id:"s10", tipo:"assetempo", tema:"chiaro", sopratitolo:"La linea del tempo, in scala",
  da:1970, a:2024, decenni:[1980,1990,2000,2010,2020], tappe:TEMPO.slice(0,4)},

{id:"s11", tipo:"assetempo", tema:"chiaro", sopratitolo:"La linea del tempo, in scala",
  da:1970, a:2024, decenni:[1980,1990,2000,2010,2020], tappe:TEMPO.slice(0,5)},

{id:"s12", tipo:"assetempo", tema:"chiaro", sopratitolo:"La linea del tempo, in scala",
  da:1970, a:2024, decenni:[1980,1990,2000,2010,2020], tappe:TEMPO.slice(0,8)},

{id:"s13", tipo:"assetempo", tema:"chiaro", sopratitolo:"La linea del tempo, in scala",
  da:1970, a:2024, decenni:[1980,1990,2000,2010,2020], tappe:TEMPO},

{id:"s14", tipo:"numero", tema:"tenue", cifra:"2021",
  testo:"Legge 163: la **laurea diventa abilitante**. Dal mansionario, quarantasette anni."},

{id:"s15", tipo:"tabella", tema:"chiaro", sopratitolo:"Le date gemelle: due coppie, quattro errori evitati",
  intestazioni:["Anno","La prima","La seconda"], colonne:["16%","42%","42%"],
  chiave:[0],
  righe:[
   ["**2017**","**legge 24** — responsabilità e sicurezza delle cure","**legge 219** — consenso e DAT"],
   ["**1999**","**legge 42** — abroga il mansionario","**D.Lgs. 229** — struttura l'ECM"]]},

{id:"s16", tipo:"confronto", tema:"profondo", sopratitolo:"1999 · la stessa coppia, un'altra volta", col:[
  {h:"Legge 42", t:"**MANSIONARIO**<br>abrogato", grande:true},
  {h:"D.Lgs. 229", t:"**ECM**<br>istituito", grande:true}],
  sotto:"Ventiquattro-responsabilità, duecentodiciannove-consenso. Quarantadue-mansionario, duecentoventinove-ECM."},

{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2],
  sopratitolo:"I dieci numeri del modulo", celle:DIECI},

{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4,5],
  sopratitolo:"I dieci numeri del modulo", celle:DIECI},

{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4,5,6,7,8,9],
  sopratitolo:"I dieci numeri del modulo", celle:DIECI},

{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Confusione 1 · il verbo giusto", col:[
  {h:"Bisogni di salute", t:"**partecipa**<br>all'identificazione"},
  {h:"Bisogni di assistenza infermieristica", t:"**identifica**<br>e formula gli obiettivi"}]},
{id:"s21", tipo:"titolo", tema:"profondo",
  titolo:"Il verbo cambia con il<br>**tipo di bisogno**.",
  sotto:"Non con il tipo di paziente. Dove il bisogno è infermieristico, la regia è tua."},
{id:"s22", tipo:"tabella", tema:"chiaro", sopratitolo:"Confusione 2 — aree o livelli",
  intestazioni:["","Cinque aree post-base","Quattro livelli"], colonne:["22%","39%","39%"],
  righe:[
   ["La fonte","DM 739/1994","legge 43/2006"],
   ["Che cosa sono","ambiti **clinici**","gradi di **carriera**"],
   ["La domanda","**dove** lavori","**che ruolo** hai"]]},

{id:"s23", tipo:"tabella", tema:"chiaro", sopratitolo:"Confusione 3 — esonero o esenzione",
  intestazioni:["","Esonero","Esenzione"], colonne:["20%","40%","40%"],
  righe:[
   ["Perché","**stai studiando**","**sei assente**"],
   ["I casi","laurea, master, dottorato, specializzazione","maternità, malattia, aspettativa"],
   ["L'effetto","il debito si riduce in proporzione ai mesi","il debito si riduce in proporzione ai mesi"]]},

{id:"s24", tipo:"frase", tema:"tenue", sopratitolo:"Come non sbagliarle",
  testo:"**Esonero quando studi, esenzione quando sei assente.**",
  sotto:"In tutti e due i casi i crediti si riducono in proporzione ai mesi."},
{id:"s25", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Confusione 4 · livello o incarico",
  da:{h:"Il titolo", t:"**abilita**"}, a:{h:"L'azienda", t:"**attribuisce**"},
  sotto:"Si può avere il master di coordinamento senza avere l'incarico di coordinatore."},

{id:"s26", tipo:"barre", tema:"chiaro", sopratitolo:"Confusione 5 — il doppio binario",
  unita:"anni", etichetta:560, barre:[
   {et:"Struttura — contrattuale", v:10, nota:"artt. 1218 e 1228 c.c."},
   {et:"Esercente — extracontrattuale", v:5, colore:"#B07A12", nota:"art. 2043 c.c."}]},

{id:"s27", tipo:"tabella", tema:"chiaro", sopratitolo:"Confusione 6 — DAT o pianificazione",
  intestazioni:["","DAT","Pianificazione condivisa"], colonne:["20%","40%","40%"],
  righe:[
   ["Quando","incapacità **futura ed eventuale**","patologia **già in atto**"],
   ["Chi le fa","la persona, **da sola**","la persona **con il medico**"],
   ["Chi è tenuto","il medico","il medico **e l'équipe**"]]},

{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Confusione 7 · i due segreti", col:[
  {h:"art. 622 — professionale", t:"procedibile **a querela**"},
  {h:"art. 326 — d'ufficio", t:"procedibile **d'ufficio**"}],
  sotto:"Sette confusioni: sono queste a decidere i punti nei quiz a risposta chiusa."},

{id:"s29", tipo:"trappola", tema:"chiaro", sopratitolo:"Caso 1 · prescrizione dubbia", righe:[
  {sb:"Eseguire perché è prescritto", ok:"Chiedere chiarimento; se il dubbio permane, **non dare corso** e documentare"}]},
{id:"s30", tipo:"frase", tema:"tenue", sopratitolo:"Il principio di affidamento",
  testo:"Cade davanti all'**errore palese**.",
  sotto:"Vale per ogni ruolo dell'équipe, non solo per il tuo."},
{id:"s31", tipo:"icone", tema:"chiaro", sopratitolo:"Caso 2 — attribuzione all'OSS", voci:[
  {icona:"persone",   t:"Competenza", d:"dell'operatore a cui attribuisci"},
  {icona:"cuoremano", t:"Condizioni", d:"della persona assistita"},
  {icona:"ospedale",  t:"Contesto", d:"organizzativo in cui l'attività si svolge"}]},

{id:"s32", tipo:"trappola", tema:"chiaro", sopratitolo:"Caso 3 · ha firmato senza capire", righe:[
  {sb:"Rassicurarlo, o spiegargli tu l'intervento", ok:"**Sospendere**, informare il medico, **documentare**"}]},
{id:"s33", tipo:"trappola", tema:"chiaro", sopratitolo:"Caso 4 · contenzione per carenza di personale", righe:[
  {sb:"Contenere: il reparto è scoperto", ok:"**Rifiutare**, cercare alternative, **segnalare** la carenza, documentare"}]},
{id:"s34", tipo:"trappola", tema:"chiaro", sopratitolo:"Caso 5 · la foto in chat", righe:[
  {sb:"Inviarla ai colleghi per un parere", ok:"Documentare con gli **strumenti aziendali** e con il **consenso**"}]},

{id:"s35", tipo:"citazione", tema:"profondo",
  testo:"L'infermiere è l'operatore sanitario **responsabile dell'assistenza generale infermieristica**.",
  fonte:"DM 739/1994, art. 1"},
{id:"s36", tipo:"citazione", tema:"profondo",
  testo:"L'assistenza è di natura **tecnica, relazionale, educativa**. La **sicurezza delle cure** è parte costitutiva del diritto alla salute.",
  fonte:"DM 739/1994 · Legge 24/2017, art. 1"},
{id:"s37", tipo:"citazione", tema:"profondo",
  testo:"Nessun trattamento sanitario può essere iniziato o proseguito senza il **consenso libero e informato** della persona interessata.",
  fonte:"Legge 219/2017, art. 1"},

{id:"s38", tipo:"icone", tema:"chiaro", sopratitolo:"Dal Veneto — 1", voci:[
  {icona:"ospedale", t:"Struttura delle professioni sanitarie",
   d:"è lì che gli atti aziendali collocano la funzione infermieristica", key:true}]},

{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"Dal Veneto — 2", voci:[
  {icona:"ingranaggio", t:"Centro regionale", d:"per la gestione del rischio sanitario"},
  {icona:"bilancia",    t:"Difensore civico regionale", d:"Garante per il diritto alla salute — legge 24/2017"}]},

{id:"s40", tipo:"icone", tema:"chiaro", sopratitolo:"Dal Veneto — 3", voci:[
  {icona:"documento", t:"Procedure sulla contenzione", d:"prescrizione, rivalutazione, registrazione"},
  {icona:"occhio",    t:"FSE e log di accesso", d:"l'accesso non giustificato è rilevato"}]},

{id:"s41", tipo:"numero", tema:"chiaro", cifra:"12",
  testo:"Le domande di autovalutazione nella dispensa. **Più di 3 errori → torna alle lezioni segnalate.**"},
{id:"s42", tipo:"frase", tema:"tenue", sopratitolo:"Perché la regola è severa",
  testo:"Il modulo 1 è la **grammatica** di tutto il resto del corso.",
  sotto:"I moduli successivi lo danno per acquisito. Meglio due giorni in più adesso."},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1],
  sopratitolo:"Come proseguire", celle:[
  {n:"1", t:"**Test finale del modulo**, quaranta domande: il primo controllo serio"},
  {n:"2", t:"Riprendi **solo le lezioni** segnalate dagli errori"},
  {n:"3", t:"Porta nel **quaderno di ripasso** le formule e i dieci numeri"},
  {n:"4", t:"Passa al **modulo 2** — metodologia, documentazione, sicurezza"}]},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3],
  sopratitolo:"Come proseguire", celle:[
  {n:"1", t:"**Test finale del modulo**, quaranta domande: il primo controllo serio"},
  {n:"2", t:"Riprendi **solo le lezioni** segnalate dagli errori"},
  {n:"3", t:"Porta nel **quaderno di ripasso** le formule e i dieci numeri"},
  {n:"4", t:"Passa al **modulo 2** — metodologia, documentazione, sicurezza"}]},

{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2],
  sopratitolo:"Il memo finale", celle:MEMO18},

{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4,5],
  sopratitolo:"Il memo finale", celle:MEMO18},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4,5,6,7,8],
  sopratitolo:"Il memo finale", celle:MEMO18},

{id:"s48", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4,5,6,7,8,9,10,11],
  sopratitolo:"Il memo finale", celle:MEMO18},

{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Ciò che non è documentato<br>si presume **non fatto**.",
  sotto:"È la frase con cui conviene chiudere qualunque risposta all'orale."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine del Modulo 1",
  titolo:"Modulo 2", sottotitolo:"Metodologia infermieristica, documentazione<br>e sicurezza delle cure",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
