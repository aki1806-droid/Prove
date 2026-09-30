// Contenuto delle 48 scene della lezione 11.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 11. Perché l'armonizzazione:
// L. 42/2009, D.Lgs. 118/2011, D.Lgs. 126/2014; titoli e allegati del decreto.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il **D.Lgs. 118/2011** armonizza sistemi contabili e schemi di bilancio di regioni, enti locali e loro organismi",
  "Discende dalla **L. 42/2009** (federalismo fiscale); correttivo **D.Lgs. 126/2014**; a regime dal **2015**",
  "Obiettivi: **omogeneità**, **confrontabilità**, **trasparenza**; il **Titolo II** (art. 19) è la sanità",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Contabilità delle PA",
  titolo:"Perché l'armonizzazione", sottotitolo:"Lezione 11.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Veneto e Lombardia",
  titolo:"Confrontare **due bilanci**", punti:[
    {icona:"euro", t:"la stessa spesa per i **farmaci**"},
    {icona:"avviso", t:"un confronto quasi **impossibile**", key:true}],
  etichette:{}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"spartito", sopratitolo:"Il decreto legislativo 118 del 2011",
  titolo:"La **stessa lingua** per tutti i bilanci", punti:[
    {icona:"documento", t:"regole, schemi e voci **comuni**", key:true}],
  etichette:{}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Stessi **conti**, stessa **lingua**,<br>bilanci confrontabili."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"I conti **prima del 2011**"},
  {t:"La **delega** e il decreto"},
  {t:"Gli **obiettivi** dell'armonizzazione"},
  {t:"L'**architettura** del decreto"}]},

// --- 3 · i conti prima del 2011
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Regioni ed enti locali", col:[
  {h:"Usavano", t:"la contabilità **finanziaria**"},
  {h:"Basata su", t:"entrate e spese **autorizzate** dal bilancio", key:true}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"La contabilità finanziaria", col:[
  {h:"Dice", t:"quanto si può **spendere** e quanto si è speso"},
  {h:"Da sola non dice", t:"quanto **costa** un servizio, quanto vale il **patrimonio**", key:true}]},
{id:"s08", tipo:"norma", tema:"chiaro", etichetta:"Decreto legislativo · 30 dicembre 1992", sigla:"502/1992",
  testo:"Le aziende sanitarie passano alla contabilità **economico patrimoniale**, in partita doppia."},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Ma ogni regione aveva le sue regole", col:[
  {h:"Nel Veneto", t:"una legge regionale del **1994**"},
  {h:"Altrove", t:"regole **diverse**", key:true}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Una babele", celle:[
  {t:"Piani dei conti **diversi**"}, {t:"Schemi di bilancio **diversi**"}, {t:"Criteri di valutazione **diversi**"}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"globo", sopratitolo:"Lo Stato e l'Unione europea",
  titolo:"Il conto delle **pubbliche amministrazioni**", punti:[
    {icona:"avviso", t:"difficile da costruire"},
    {icona:"euro", t:"serve per **deficit** e **debito**", key:true}],
  etichette:{}},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio: la stessa apparecchiatura", col:[
  {h:"Azienda A", t:"la registra in una **voce**"},
  {h:"Azienda B", t:"la registra in un'**altra**", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Le aziende sanitarie passano alla contabilità economica nel 2011",
   ok:"Ci erano arrivate con il decreto 502 del 1992"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Senza **regole comuni**, i numeri<br>non si possono **confrontare**."},

// --- 4 · la delega e il decreto
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Legge delega · federalismo fiscale", sigla:"42/2009",
  testo:"Artt. 1 e 2: **sistemi contabili** e **schemi di bilancio** omogenei."},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Lo stesso lavoro, su due fronti", col:[
  {h:"Legge 196/2009", t:"contabilità e finanza **pubblica**"},
  {h:"Decreto 118/2011", t:"**regioni**, **enti locali** e loro organismi", key:true}]},
{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Decreto legislativo · 23 giugno 2011", sigla:"118/2011",
  testo:"**Armonizzazione** dei sistemi contabili e degli schemi di bilancio."},
{id:"s18", tipo:"assetempo", tema:"chiaro", sopratitolo:"Le tappe, nella loro distanza vera",
  da:2008, a:2016, decenni:[2010], tappe:[
  {anno:2009, et:"L. 42 — la delega"},
  {anno:2011, et:"D.Lgs. 118 — il decreto"},
  {anno:2012, et:"sperimentazione"},
  {anno:2014, et:"D.Lgs. 126 — il correttivo"},
  {anno:2015, et:"a regime", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Il Titolo secondo, la sanità", col:[
  {h:"Si applica", t:"già **dal 2012**"},
  {h:"Perché", t:"la contabilità economica **c'era già**: andava uniformata", key:true}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Un decreto che si aggiorna",
  titolo:"La commissione **Arconet**", punti:[
    {icona:"documento", t:"decreti ministeriali di aggiornamento"},
    {icona:"occhio", t:"segue l'applicazione dei **principi contabili**", key:true}],
  etichette:{}},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"municipio", sopratitolo:"Un esempio, nel 2015",
  titolo:"Un comune adotta i **nuovi schemi**", punti:[
    {icona:"libro", t:"lo stesso **piano dei conti**"},
    {icona:"persone", t:"di ogni altro comune e di ogni **regione**", key:true}],
  etichette:{}},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La legge 42 del 2009 è il decreto sull'armonizzazione",
   ok:"È la legge delega sul federalismo fiscale"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Una **delega** nel 2009, un **decreto** nel 2011,<br>un **correttivo** nel 2014."},

// --- 5 · gli obiettivi
{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"Tre parole", box:[
  {n:"1", t:"Omogeneità", d:"stesse regole, schemi e piano dei conti"},
  {n:"2", t:"Confrontabilità", d:"enti diversi, anni diversi"},
  {n:"3", t:"Trasparenza", d:"conti leggibili e pubblicati"}]},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Confrontabilità", col:[
  {h:"Nello spazio", t:"enti **diversi**"},
  {h:"Nel tempo", t:"lo stesso ente in **anni diversi**", key:true}]},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"vetro", sopratitolo:"Trasparenza",
  titolo:"Conti **leggibili** da tutti", punti:[
    {icona:"persone", t:"cittadini e **organi di controllo**"},
    {icona:"documento", t:"documenti **pubblicati**", key:true}],
  etichette:{}},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli strumenti del decreto", celle:[
  {t:"Regole contabili **uniformi**"}, {t:"Piano dei conti **integrato**"},
  {t:"Bilancio **consolidato**"}, {t:"Indicatori di **risultato**"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"globo", sopratitolo:"Il raccordo con l'Europa",
  titolo:"I conti degli enti **confluiscono**", punti:[
    {icona:"euro", t:"nel conto delle **pubbliche amministrazioni**", key:true}],
  etichette:{}},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Coordinamento della finanza pubblica", col:[
  {h:"Se tutti contano allo stesso modo", t:"si verificano **equilibri** e **vincoli**"},
  {h:"Per ogni livello", t:"di **governo**", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"Gli indicatori",
  titolo:"Misure **uniformi**", punti:[
    {icona:"documento", t:"con previsione e **rendiconto**"},
    {icona:"bilancia", t:"enti **confrontabili** tra loro", key:true}],
  etichette:{}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio: l'assistenza farmaceutica", col:[
  {h:"Regione A e regione B", t:"costo **per abitante**"},
  {h:"Voce per voce", t:"senza **riclassificare** i bilanci", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Armonizzare vuol dire accentrare",
   ok:"Ogni ente resta autonomo; comuni sono le regole dei conti"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"**Omogeneità**, confrontabilità, **trasparenza**:<br>tre parole per un obiettivo."},

// --- 6 · l'architettura del decreto
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Titolo primo", col:[
  {h:"Principi contabili", t:"**generali** e **applicati**"},
  {h:"Per", t:"regioni, **enti locali** e loro enti strumentali", key:true}]},
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Titolo secondo, dall'articolo 19",
  titolo:"Il **settore sanitario**", punti:[
    {icona:"euro", t:"la parte sanitaria del bilancio **regionale**"},
    {icona:"cartella", t:"la gestione sanitaria **accentrata**"},
    {icona:"ospedale", t:"le aziende **sanitarie** e ospedaliere", key:true}],
  etichette:{}},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Titolo terzo", col:[
  {h:"Aggiunto nel 2014", t:"dal **correttivo**"},
  {h:"Disciplina", t:"l'ordinamento contabile delle **regioni**", key:true}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Per gli enti locali", col:[
  {h:"Il decreto 118", t:"le regole **armonizzate**"},
  {h:"Il testo unico degli enti locali", t:"aggiornato nel **2014**", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Le regole operative",
  titolo:"Negli **allegati**", punti:[
    {icona:"libro", t:"il primo: i principi **generali**"},
    {icona:"documento", t:"gli altri: i principi **applicati**", key:true}],
  etichette:{}},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I principi applicati", celle:[
  {t:"La **programmazione**"}, {t:"La contabilità **finanziaria**"},
  {t:"La contabilità **economico patrimoniale**"}, {t:"Il bilancio **consolidato**"}]},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Per le aziende sanitarie", col:[
  {h:"Il Titolo secondo", t:"del **decreto 118**"},
  {h:"Il codice civile", t:"per il bilancio d'**esercizio**", key:true}]},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"calcolatrice", sopratitolo:"Un esempio",
  titolo:"Un credito di **dubbia esigibilità**", punti:[
    {icona:"persona", t:"il ragioniere di un **comune**"},
    {icona:"libro", t:"consulta il principio applicato, **tra gli allegati**", key:true}],
  etichette:{}},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le aziende sanitarie seguono il Titolo primo",
   ok:"Il loro riferimento è il Titolo secondo, dall'art. 19"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"I **titoli** dicono a chi,<br>gli **allegati** dicono come."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il decreto 118 riguarda solo gli enti locali",
   ok:"Anche le regioni e, con il Titolo secondo, la sanità"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Una **lingua comune**<br>per i conti pubblici.",
  sotto:"Prossima lezione: i principi contabili."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 11.2", sottotitolo:"I principi contabili", ente:ENTE},
];
