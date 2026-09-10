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

{id:"s07", tipo:"tre", tema:"chiaro", sopratitolo:"La catena del modulo", box:CATENA},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"A che serve la catena",
  testo:"È lo schema con cui rispondere a **quasi ogni domanda aperta** del modulo.",
  sotto:"Anche a quelle che non hai preparato."},

{id:"s09", tipo:"timeline", tema:"chiaro", sopratitolo:"La linea del tempo · 1", tappe:[
  {anno:"1974", et:"Mansionario<br>DPR 225"},
  {anno:"1992", et:"D.Lgs. 502<br>formazione all'università"},
  {anno:"1994", et:"DM 739<br>il profilo"}]},
{id:"s10", tipo:"timeline", tema:"chiaro", sopratitolo:"1999 · due fonti nello stesso anno", tappe:[
  {anno:"1999", et:"**Legge 42**<br>abroga il mansionario, crea le tre fonti", key:true},
  {anno:"1999", et:"**D.Lgs. 229**<br>struttura l'ECM", key:true},
  {anno:"2000", et:"Legge 251<br>autonomia e dirigenza"}]},
{id:"s11", tipo:"frase", tema:"tenue", sopratitolo:"Se te ne chiedono uno solo",
  testo:"È il **1999**: l'anno in cui il mansionario sparisce."},

{id:"s12", tipo:"timeline", tema:"chiaro", sopratitolo:"La linea del tempo · 2", tappe:[
  {anno:"2006", et:"L. 43<br>albo e quattro livelli"},
  {anno:"2010", et:"L. 38<br>cure palliative e dolore"},
  {anno:"2016", et:"GDPR<br>Reg. UE 2016/679"}]},
{id:"s13", tipo:"timeline", tema:"chiaro", sopratitolo:"La linea del tempo · 3", tappe:[
  {anno:"2017", et:"L. 24 e L. 219", key:true},
  {anno:"2018", et:"L. 3<br>nascono gli Ordini"},
  {anno:"2019", et:"Codice<br>deontologico"}]},
{id:"s14", tipo:"numero", tema:"tenue", cifra:"2021",
  testo:"Legge 163: la **laurea diventa abilitante**. Dal mansionario, quarantasette anni."},

{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"2017 · le due leggi che i quiz scambiano", col:[
  {h:"Legge 24", t:"**RESPONSABILITÀ**<br>e sicurezza delle cure", grande:true},
  {h:"Legge 219", t:"**CONSENSO**<br>informato e DAT", grande:true}]},
{id:"s16", tipo:"confronto", tema:"profondo", sopratitolo:"1999 · la stessa coppia, un'altra volta", col:[
  {h:"Legge 42", t:"**MANSIONARIO**<br>abrogato", grande:true},
  {h:"D.Lgs. 229", t:"**ECM**<br>istituito", grande:true}],
  sotto:"Ventiquattro-responsabilità, duecentodiciannove-consenso. Quarantadue-mansionario, duecentoventinove-ECM."},

{id:"s17", tipo:"elenco", tema:"chiaro", sopratitolo:"I dieci numeri · 1", grandi:true,
  marcatori:["3","3·4·3","5"], voci:NUM_A},
{id:"s18", tipo:"elenco", tema:"chiaro", sopratitolo:"I dieci numeri · 2", grandi:true,
  marcatori:["4","150","53+8"], voci:NUM_B},
{id:"s19", tipo:"elenco", tema:"chiaro", sopratitolo:"I dieci numeri · 3", grandi:true,
  marcatori:["5","10+5","1","48"], voci:NUM_C},

{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Confusione 1 · il verbo giusto", col:[
  {h:"Bisogni di salute", t:"**partecipa**<br>all'identificazione"},
  {h:"Bisogni di assistenza infermieristica", t:"**identifica**<br>e formula gli obiettivi"}]},
{id:"s21", tipo:"titolo", tema:"profondo",
  titolo:"Il verbo cambia con il<br>**tipo di bisogno**.",
  sotto:"Non con il tipo di paziente. Dove il bisogno è infermieristico, la regia è tua."},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Confusione 2 · aree o livelli", col:[
  {h:"Cinque aree post-base", t:"ambiti **clinici** del profilo<br><small>DM 739/1994</small>"},
  {h:"Quattro livelli", t:"**carriera** professionale<br><small>legge 43/2006</small>"}]},

{id:"s23", tipo:"confronto", tema:"chiaro", sopratitolo:"Confusione 3 · esonero o esenzione", col:[
  {h:"Esonero — perché studi", t:"laurea, master, dottorato, specializzazione"},
  {h:"Esente — perché assente", t:"maternità, malattia, aspettativa"}]},
{id:"s24", tipo:"frase", tema:"tenue", sopratitolo:"Come non sbagliarle",
  testo:"**Esonero quando studi, esenzione quando sei assente.**",
  sotto:"In tutti e due i casi i crediti si riducono in proporzione ai mesi."},
{id:"s25", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Confusione 4 · livello o incarico",
  da:{h:"Il titolo", t:"**abilita**"}, a:{h:"L'azienda", t:"**attribuisce**"},
  sotto:"Si può avere il master di coordinamento senza avere l'incarico di coordinatore."},

{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Confusione 5 · il doppio binario", col:[
  {h:"Struttura", t:"titolo **contrattuale**<br>prescrizione **10 anni**"},
  {h:"Esercente", t:"titolo **extracontrattuale**<br>prescrizione **5 anni**"}]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Confusione 6 · DAT o pianificazione", col:[
  {h:"DAT", t:"incapacità **futura ed eventuale**<br>la fa la persona, **da sola**"},
  {h:"Pianificazione condivisa", t:"patologia **già in atto**<br>si costruisce **con il medico**"}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Confusione 7 · i due segreti", col:[
  {h:"art. 622 — professionale", t:"procedibile **a querela**"},
  {h:"art. 326 — d'ufficio", t:"procedibile **d'ufficio**"}],
  sotto:"Sette confusioni: sono queste a decidere i punti nei quiz a risposta chiusa."},

{id:"s29", tipo:"trappola", tema:"chiaro", sopratitolo:"Caso 1 · prescrizione dubbia", righe:[
  {sb:"Eseguire perché è prescritto", ok:"Chiedere chiarimento; se il dubbio permane, **non dare corso** e documentare"}]},
{id:"s30", tipo:"frase", tema:"tenue", sopratitolo:"Il principio di affidamento",
  testo:"Cade davanti all'**errore palese**.",
  sotto:"Vale per ogni ruolo dell'équipe, non solo per il tuo."},
{id:"s31", tipo:"tre", tema:"chiaro", sopratitolo:"Caso 2 · attribuzione all'OSS", box:OSS},

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

{id:"s38", tipo:"elenco", tema:"chiaro", sopratitolo:"Dal Veneto · 1", numerato:true, voci:VENETO_A},
{id:"s39", tipo:"elenco", tema:"chiaro", sopratitolo:"Dal Veneto · 2", numerato:true, da:2, voci:VENETO_B},
{id:"s40", tipo:"elenco", tema:"chiaro", sopratitolo:"Dal Veneto · 3", numerato:true, da:3, voci:VENETO_C},

{id:"s41", tipo:"numero", tema:"chiaro", cifra:"12",
  testo:"Le domande di autovalutazione nella dispensa. **Più di 3 errori → torna alle lezioni segnalate.**"},
{id:"s42", tipo:"frase", tema:"tenue", sopratitolo:"Perché la regola è severa",
  testo:"Il modulo 1 è la **grammatica** di tutto il resto del corso.",
  sotto:"I moduli successivi lo danno per acquisito. Meglio due giorni in più adesso."},

{id:"s43", tipo:"elenco", tema:"chiaro", sopratitolo:"Come proseguire · 1", numerato:true, voci:[
  {t:"**Test finale del modulo**", d:"quaranta domande: il primo controllo serio"},
  {t:"**Solo le lezioni segnalate** dagli errori", d:"non tutto il modulo da capo"}]},
{id:"s44", tipo:"elenco", tema:"chiaro", sopratitolo:"Come proseguire · 2", numerato:true, da:3, voci:[
  {t:"**Formule e dieci numeri** nel quaderno di ripasso", d:"è la parte che si dimentica per prima"},
  {t:"**Modulo 2** — metodologia, documentazione, sicurezza", d:"riprende questi fili e li traduce in metodo"}]},

{id:"s45", tipo:"elenco", tema:"chiaro", sopratitolo:"Il memo finale · 1", voci:FINALE_A},
{id:"s46", tipo:"elenco", tema:"chiaro", sopratitolo:"Il memo finale · 2", voci:FINALE_B},
{id:"s47", tipo:"elenco", tema:"chiaro", sopratitolo:"Il memo finale · 3", voci:FINALE_C},
{id:"s48", tipo:"elenco", tema:"chiaro", sopratitolo:"Il memo finale · 4", voci:FINALE_D},
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Ciò che non è documentato<br>si presume **non fatto**.",
  sotto:"È la frase con cui conviene chiudere qualunque risposta all'orale."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Fine del Modulo 1",
  titolo:"Modulo 2", sottotitolo:"Metodologia infermieristica, documentazione<br>e sicurezza delle cure",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
