// Contenuto delle 47 scene della lezione 10.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 10. Soglie e procedure:
// D.Lgs. 36/2023 artt. 14, 48-55 (sotto soglia), 49, 50, 70-76 (procedure).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Le **soglie europee** cambiano ogni due anni; servizi e forniture delle aziende sanitarie: poco oltre **200.000 €**",
  "Sotto soglia: **affidamento diretto** sotto 140.000 € (servizi e forniture) e 150.000 € (lavori); oltre, **negoziata** con almeno 5 inviti",
  "Sopra soglia le procedure ordinarie sono **aperta** e **ristretta**; la **negoziata senza bando** richiede presupposti precisi",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Appalti pubblici",
  titolo:"Soglie e procedure", sottotitolo:"Lezione 10.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Tre acquisti nella stessa azienda", celle:[
  {t:"Una stampante: **2.000 €**"}, {t:"La manutenzione: **180.000 €**"}, {t:"Un padiglione: **10 milioni**"}]},
{id:"s03", tipo:"catena", tema:"chiaro", sopratitolo:"Il valore decide la procedura", passi:[
  {t:"Più valore"},
  {t:"Più apertura"},
  {t:"Più pubblicità"},
  {t:"Più rigore", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Il **valore** del contratto<br>decide la **strada** da seguire."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Le **soglie europee**"},
  {t:"Gli affidamenti **sotto soglia**"},
  {t:"Le procedure **ordinarie**: aperta e ristretta"},
  {t:"Le procedure **speciali**"}]},

// --- 3 · le soglie europee
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Le soglie di rilevanza europea", col:[
  {h:"Sopra soglia", t:"le regole **europee** per intero"},
  {h:"Sotto soglia", t:"procedure più **snelle**", key:true}]},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Ogni due anni",
  titolo:"Aggiornate dalla **Commissione europea**", punti:[
    {icona:"spunta", t:"conta l'**ordine di grandezza**", key:true}],
  etichette:{}},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli ordini di grandezza", col:[
  {h:"Lavori e concessioni", t:"poco oltre **5 milioni**"},
  {h:"Servizi e forniture delle aziende sanitarie", t:"poco oltre **200.000 €**", key:true}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"E ancora", col:[
  {h:"Forniture dei ministeri", t:"una soglia un po' più **bassa**"},
  {h:"Servizi sociali e specifici", t:"**750.000 €**", key:true}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Si confronta il valore stimato", col:[
  {h:"Al netto dell'IVA", t:"con **opzioni** e **rinnovi**"},
  {h:"Vietato", t:"**frazionare** per stare sotto", key:true}]},
{id:"s11", tipo:"contatore", tema:"chiaro", sopratitolo:"Lavanderia: 80.000 € l'anno, 3 anni + 2 di rinnovo", sep:"×",
  valori:[{n:80, t:"mila euro l'anno"}, {n:5, t:"anni, rinnovi compresi", key:true}],
  sotto:"Valore stimato **400.000 €**: sopra la soglia europea."},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Le soglie europee sono fisse",
   ok:"Cambiano ogni due anni: si controlla il biennio in corso"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Sopra la soglia, l'**Europa**;<br>sotto, regole più **snelle**."},

// --- 4 · sotto soglia
{id:"s14", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"La prima strada",
  titolo:"L'**affidamento diretto**", punti:[
    {icona:"persona", t:"la stazione appaltante **sceglie** l'operatore"},
    {icona:"documento", t:"e **motiva** la scelta", key:true}],
  etichette:{}},
{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 50 · affidamento diretto", col:[
  {h:"Servizi e forniture", t:"sotto **140.000 €**"},
  {h:"Lavori", t:"sotto **150.000 €**", key:true}]},
{id:"s16", tipo:"flusso", tema:"chiaro", sopratitolo:"La seconda strada: la procedura negoziata", passi:[
  {icona:"occhio", t:"Indagine di mercato", d:"o elenco di operatori"},
  {icona:"chat", t:"Inviti"},
  {icona:"bilancia", t:"Confronto", d:"delle offerte", key:true}]},
{id:"s17", tipo:"tabella", tema:"chiaro", sopratitolo:"La procedura negoziata: quanti inviti",
  colonne:["60%","40%"], intestazioni:["Valore", "Almeno"], righe:[
  ["Servizi e forniture, da 140.000 € alla soglia", "**5** operatori"],
  ["Lavori, da 150.000 € a 1 milione", "**5** operatori"],
  ["Lavori, da 1 milione alla soglia", "**10** operatori"]], chiave:[]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Anche sotto soglia", col:[
  {h:"Si può sempre", t:"usare una procedura **ordinaria**"},
  {h:"Le procedure semplificate", t:"una **facoltà**, non un obbligo", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 49 · la rotazione", col:[
  {h:"Di regola", t:"niente commessa consecutiva al **contraente uscente**"},
  {h:"Solo in casi motivati", t:"lo si **reinvita**", key:true}]},
{id:"s20", tipo:"contatore", tema:"chiaro", sopratitolo:"Deroga alla rotazione",
  valori:[{n:5000, t:"euro: sotto questa cifra, negli affidamenti diretti", key:true}],
  sotto:"Sopra, la deroga va **motivata** caso per caso."},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Due esempi", col:[
  {h:"La stampante da 2.000 €", t:"**affidamento diretto**"},
  {h:"La manutenzione da 180.000 €", t:"almeno **cinque inviti**", key:true}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Affidamento diretto vuol dire senza regole",
   ok:"Determina, requisiti, rotazione, pubblicazione dei dati"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"**Semplice** non vuol dire libero<br>da regole e **controlli**."},

// --- 5 · le procedure ordinarie
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"martelletto", sopratitolo:"Art. 71",
  titolo:"La procedura **aperta**", punti:[
    {icona:"persone", t:"**qualsiasi** operatore può offrire"},
    {icona:"documento", t:"in risposta al **bando**", key:true}],
  etichette:{}},
{id:"s25", tipo:"contatore", tema:"chiaro", sopratitolo:"Procedura aperta · il termine minimo",
  valori:[{n:30, t:"giorni dalla trasmissione del bando", key:true}],
  sotto:"Riducibile per **urgenza** motivata."},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 72 · la procedura ristretta", passi:[
  {t:"Tutti chiedono", d:"di partecipare"},
  {t:"Selezione", d:"dei candidati"},
  {t:"Offrono solo", d:"gli invitati", key:true}]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Quando serve la ristretta", col:[
  {h:"Appalti complessi", t:"si selezionano i più **qualificati**"},
  {h:"Poi", t:"un numero **gestibile** di offerte", key:true}]},
{id:"s28", tipo:"contatore", tema:"chiaro", sopratitolo:"Nella ristretta, i candidati invitati",
  valori:[{n:5, t:"almeno, se ce ne sono abbastanza", key:true}],
  sotto:"Si può fissare prima anche un **numero massimo**."},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Tutto digitale",
  titolo:"Le piattaforme **telematiche**", punti:[
    {icona:"documento", t:"bando, documenti, **offerte**"},
    {icona:"chat", t:"e **comunicazioni**", key:true}],
  etichette:{}},
{id:"s30", tipo:"catena", tema:"chiaro", sopratitolo:"Le fasi", passi:[
  {t:"Decisione di contrarre"},
  {t:"Offerte e valutazione"},
  {t:"Verifica dei requisiti"},
  {t:"Aggiudicazione e stipula", key:true}]},
{id:"s31", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Un esempio",
  titolo:"La **ristorazione** per i pazienti", punti:[
    {icona:"orologio", t:"per **cinque anni**"},
    {icona:"persone", t:"procedura **aperta**: tutti possono offrire", key:true}],
  etichette:{}},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Nella procedura ristretta tutti possono presentare un'offerta",
   ok:"Tutti chiedono di partecipare; offrono solo gli invitati"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"**Aperta** a tutti,<br>oppure **ristretta** ai selezionati."},

// --- 6 · le procedure speciali
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 73 · competitiva con negoziazione", col:[
  {h:"Solo", t:"in presenza di **condizioni precise**"},
  {h:"Si negoziano", t:"le offerte **iniziali**", key:true}]},
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Art. 74",
  titolo:"Il **dialogo competitivo**", punti:[
    {icona:"avviso", t:"appalti particolarmente **complessi**"},
    {icona:"chat", t:"la soluzione si costruisce **dialogando**", key:true}],
  etichette:{}},
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"microscopio", sopratitolo:"Art. 75",
  titolo:"Il partenariato per l'**innovazione**", punti:[
    {icona:"libro", t:"si finanzia la **ricerca**"},
    {icona:"euro", t:"poi si acquista ciò che ne **risulta**", key:true}],
  etichette:{}},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Art. 76 · la negoziata senza bando: solo se", celle:[
  {t:"Gara **deserta**"}, {t:"Un **solo** operatore possibile"}, {t:"**Estrema urgenza**"}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"In questi casi", col:[
  {h:"Si consultano", t:"almeno **tre** operatori, se esistono"},
  {h:"L'urgenza", t:"da eventi **imprevedibili**", key:true}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"Un esempio",
  titolo:"I **ricambi originali**", punti:[
    {icona:"ingranaggio", t:"solo il **produttore** può fornirli"},
    {icona:"spunta", t:"la negoziata senza bando è **giustificata**", key:true}],
  etichette:{}},
{id:"s40", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il ritardo nel programmare giustifica l'urgenza",
   ok:"L'urgenza non deve essere imputabile all'amministrazione"}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Le eccezioni si **motivano**,<br>non si **presumono**."},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Procedura aperta: dieci giorni per le offerte",
   ok:"Trenta giorni dalla trasmissione del bando, salvo urgenza"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Il **valore** sceglie la strada,<br>i **principi** la guidano.",
  sotto:"Prossima lezione: aggiudicazione e anomalia."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 10.5", sottotitolo:"Aggiudicazione e anomalia", ente:ENTE},
];
