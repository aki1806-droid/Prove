// Contenuto delle 49 scene della lezione 11.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 11. Il sistema di bilancio:
// documenti (DUP, previsione, PEG, rendiconto, consolidato), classificazione di entrate e spese,
// piano dei conti integrato.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il sistema di bilancio: **programmazione**, bilancio di previsione **almeno triennale**, **PEG**, **rendiconto**, bilancio **consolidato**",
  "Entrate: **titoli**, **tipologie**, **categorie**. Spese: **missioni**, **programmi**, **titoli**, **macroaggregati**",
  "Il **piano dei conti integrato** collega contabilità finanziaria, economica e patrimoniale; il **DUP** è il documento unico di programmazione degli enti locali",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Contabilità delle PA",
  titolo:"Il sistema di bilancio", sottotitolo:"Lezione 11.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Una regione cerca nei suoi conti",
  titolo:"Quanto ha speso per la **salute**?", punti:[
    {icona:"euro", t:"la spesa dell'**anno**"},
    {icona:"ospedale", t:"e quanta in **investimenti**", key:true}],
  etichette:{}},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Ogni spesa ha un indirizzo", celle:[
  {t:"Una **missione**"}, {t:"Un **programma**"}, {t:"Un **titolo**"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Ogni **euro** ha un indirizzo,<br>scritto **uguale** per tutti."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"I **documenti** del sistema di bilancio"},
  {t:"Come si classificano le **entrate**"},
  {t:"Come si classificano le **spese**"},
  {t:"Il **piano dei conti** integrato e il **DUP**"}]},

// --- 3 · i documenti
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Si parte dalla programmazione", col:[
  {h:"Enti locali", t:"il **DUP**, documento unico di programmazione"},
  {h:"Regioni", t:"il documento di **economia e finanza** regionale", key:true}]},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Il bilancio di previsione finanziario",
  titolo:"Almeno **tre anni**", punti:[
    {icona:"documento", t:"per ciascuno, previsioni di **competenza**"},
    {icona:"euro", t:"per il primo, anche di **cassa**", key:true}],
  etichette:{}},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"Negli enti locali",
  titolo:"Entro il **31 dicembre**", punti:[
    {icona:"orologio", t:"dell'anno **precedente**"},
    {icona:"sigillo", t:"è il documento che **autorizza** la spesa", key:true}],
  etichette:{}},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Il piano esecutivo di gestione", col:[
  {h:"Lo approva", t:"la **giunta**"},
  {h:"Assegna ai dirigenti", t:"obiettivi e risorse, **capitolo per capitolo**", key:true}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il rendiconto, entro il 30 aprile", celle:[
  {t:"Conto del **bilancio**"}, {t:"Conto **economico**"}, {t:"Stato **patrimoniale**"}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Il risultato di amministrazione",
  titolo:"**Avanzo** o **disavanzo**", punti:[
    {icona:"lucchetto", t:"quote **vincolate** e **accantonate**"},
    {icona:"ospedale", t:"quote **destinate** agli investimenti", key:true}],
  etichette:{}},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"matrioska", sopratitolo:"Entro il 30 settembre",
  titolo:"Il bilancio **consolidato**", punti:[
    {icona:"documento", t:"i conti dell'**ente**"},
    {icona:"persone", t:"più enti e **società controllate**", key:true}],
  etichette:{}},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"Un comune, nel corso dell'anno", passi:[
  {t:"Dicembre", d:"bilancio dei tre anni"},
  {t:"Gennaio", d:"il PEG"},
  {t:"Aprile dopo", d:"il rendiconto", key:true},
  {t:"Settembre", d:"il consolidato"}]},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il bilancio di previsione degli enti territoriali è annuale",
   ok:"È almeno triennale, con la cassa per il primo anno"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"**Programmare**, prevedere, gestire,<br>rendicontare, **consolidare**."},

// --- 4 · le entrate
{id:"s16", tipo:"piramide", tema:"chiaro", sopratitolo:"Tre livelli, dal generale al particolare", strati:[
  {t:"Titoli", d:"la fonte di provenienza"},
  {t:"Tipologie", d:"la natura"},
  {t:"Categorie", d:"l'oggetto", key:true}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"municipio", sopratitolo:"Titolo primo",
  titolo:"Entrate **tributarie**, contributive e perequative", punti:[
    {icona:"euro", t:"tributi **propri**"},
    {icona:"bilancia", t:"compartecipazioni e fondi **perequativi**", key:true}],
  etichette:{}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Titoli secondo e terzo", col:[
  {h:"Trasferimenti correnti", t:"da altre **amministrazioni**"},
  {h:"Entrate extratributarie", t:"beni e servizi, proventi, **interessi**, rimborsi", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Titoli quarto e quinto", col:[
  {h:"In conto capitale", t:"contributi agli **investimenti**, alienazioni"},
  {h:"Riduzione di attività finanziarie", t:"il **quinto** titolo", key:true}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"E poi", celle:[
  {t:"Titolo 6 · **accensione** di prestiti"}, {t:"Titolo 7 · anticipazioni dal **tesoriere**"}, {t:"Conto **terzi** e partite di giro"}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"A che cosa serve distinguerli", col:[
  {h:"Entrate correnti", t:"i primi **tre** titoli"},
  {h:"Devono coprire", t:"spese **correnti** e rimborso dei **prestiti**", key:true}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio: due contributi della regione", col:[
  {h:"Per rifare un ponte", t:"conto **capitale**, titolo quarto", key:true},
  {h:"Per la gestione", t:"trasferimento **corrente**"}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le entrate si fermano a sei titoli",
   ok:"Ci sono anche anticipazioni dal tesoriere, conto terzi e partite di giro"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Da **dove** arriva il denaro<br>dice che cosa può **finanziare**."},

// --- 5 · le spese
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"missioni", sopratitolo:"Le missioni",
  titolo:"Le **funzioni** principali dell'ente", punti:[
    {icona:"occhio", t:"e gli obiettivi **strategici**"},
    {icona:"ospedale", t:"per le regioni, la **13** è la tutela della salute", key:true}],
  etichette:{}},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Le missioni si articolano in programmi", col:[
  {h:"Programmi", t:"aggregati **omogenei** di attività"},
  {h:"Dicono", t:"**a che cosa** servono le spese", key:true}]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"I titoli: la natura economica", col:[
  {h:"Titolo primo", t:"spese **correnti**"},
  {h:"Titolo secondo", t:"spese in **conto capitale**: gli investimenti", key:true}]},
{id:"s28", tipo:"elenco", tema:"chiaro", numerato:false, sopratitolo:"Gli altri titoli della spesa", voci:[
  {t:"Incremento di **attività finanziarie**"},
  {t:"**Rimborso** dei prestiti"},
  {t:"Chiusura delle **anticipazioni** dal tesoriere"},
  {t:"Uscite per **conto terzi** e partite di giro"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I macroaggregati delle spese correnti", celle:[
  {t:"Redditi da **lavoro dipendente**"}, {t:"Acquisto di **beni e servizi**"},
  {t:"**Trasferimenti**"}, {t:"**Interessi**"}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"globo", sopratitolo:"Il raccordo europeo",
  titolo:"Le **funzioni di governo**", punti:[
    {icona:"libro", t:"missioni e programmi **raccordati**"},
    {icona:"bilancia", t:"la spesa per la salute si confronta con **altri paesi**", key:true}],
  etichette:{}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi decide che cosa", col:[
  {h:"Il consiglio vota", t:"**tipologie** di entrata e **programmi** di spesa"},
  {h:"La giunta gestisce", t:"i **capitoli**, con il PEG", key:true}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Torniamo alla regione", col:[
  {h:"Missione tredici", t:"tutta la spesa per la **salute**"},
  {h:"Titolo secondo", t:"gli **investimenti**, come nuovi ospedali", key:true}]},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Le missioni indicano la natura economica della spesa",
   ok:"Indicano la finalità; la natura la dicono titoli e macroaggregati"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"La **missione** dice perché,<br>il **titolo** dice come."},

// --- 6 · piano dei conti e DUP
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Articolo 4 e allegato al decreto",
  titolo:"Il piano dei conti **integrato**", punti:[
    {icona:"documento", t:"**unico** per tutti gli enti"},
    {icona:"libro", t:"che adottano la contabilità **finanziaria**", key:true}],
  etichette:{}},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Integrato: tre contabilità collegate", celle:[
  {t:"**Finanziaria**"}, {t:"**Economica**"}, {t:"**Patrimoniale**"}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"livelli", sopratitolo:"Organizzato per livelli",
  titolo:"Dal **titolo** alla voce di dettaglio", punti:[
    {icona:"euro", t:"i codici viaggiano su **pagamenti** e **incassi**"},
    {icona:"occhio", t:"registrati dal sistema dei **tesorieri**", key:true}],
  etichette:{}},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Il DUP, presupposto di tutti i documenti", col:[
  {h:"Sezione strategica", t:"il **mandato** dell'amministrazione"},
  {h:"Sezione operativa", t:"il **triennio**", key:true}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Negli enti locali",
  titolo:"Il DUP entro il **31 luglio**", punti:[
    {icona:"persone", t:"la giunta lo presenta al **consiglio**"},
    {icona:"documento", t:"si aggiorna con il **bilancio di previsione**", key:true}],
  etichette:{}},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Gli indirizzi del DUP", celle:[
  {t:"Programma dei **lavori pubblici**"}, {t:"Fabbisogno di **personale**"}, {t:"Piano delle **alienazioni**"}]},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio: la casa di riposo", passi:[
  {t:"Il DUP", d:"decide di ristrutturarla"},
  {t:"Il programma dei lavori"},
  {t:"Il bilancio", d:"titolo secondo, missione giusta", key:true}]},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il DUP è facoltativo e riguarda le aziende sanitarie",
   ok:"È lo strumento di programmazione degli enti locali"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Un solo **piano dei conti**,<br>tre contabilità **collegate**."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il rendiconto degli enti locali si approva entro il 31 dicembre",
   ok:"Entro il 30 aprile dell'anno successivo"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Una **mappa comune**<br>per ogni euro pubblico.",
  sotto:"Prossima lezione: il Titolo II, le aziende sanitarie."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 11.4", sottotitolo:"Il Titolo II: le aziende sanitarie", ente:ENTE},
];
