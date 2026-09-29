// Contenuto delle 49 scene della lezione 10.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 10. I soggetti:
// D.Lgs. 36/2023 artt. 15, 16, 62-63, 65, 215, all. I.1, I.2, II.4; D.L. 66/2014 art. 9.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Stazioni appaltanti **qualificate** per le procedure complesse; per ogni procedura un **RUP**",
  "**Centrali di committenza** e **soggetti aggregatori** (Consip e regionali); per alcune categorie sono **obbligatori**",
  "L'**ANAC** vigila, gestisce banca dati ed elenco delle stazioni qualificate; le liti di gara al **giudice amministrativo**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Appalti pubblici",
  titolo:"I soggetti", sottotitolo:"Lezione 10.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"dpi", sopratitolo:"Guanti monouso per tutti i reparti",
  titolo:"Una gara **da sola**?", punti:[
    {icona:"ospedale", t:"oppure attraverso chi ha già fatto la gara per **molte aziende**", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Quasi sempre", col:[
  {h:"La risposta", t:"attraverso **qualcun altro**", key:true},
  {h:"Per capirlo", t:"i **soggetti** del sistema"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Ogni gara ha i suoi **protagonisti**,<br>con **ruoli** precisi."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Le **stazioni appaltanti** e il **RUP**"},
  {t:"Gli **operatori economici**"},
  {t:"**Centrali di committenza** e soggetti aggregatori"},
  {t:"Chi **controlla** e sostiene il sistema"}]},

// --- 3 · stazioni appaltanti e RUP
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"La stazione appaltante: chi affida il contratto", celle:[
  {t:"Amministrazioni dello **Stato**"}, {t:"**Regioni** ed enti locali"}, {t:"**Aziende sanitarie**"}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Il committente pubblico", col:[
  {h:"Per le concessioni", t:"**ente concedente**"},
  {h:"Decide", t:"che cosa, come, a quali **condizioni**", key:true}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Artt. 62-63 · la qualificazione dipende da", celle:[
  {t:"**Personale**"}, {t:"**Esperienza**"}, {t:"Strumenti **digitali**"}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Senza qualificazione", col:[
  {h:"Da sola", t:"affidamenti **diretti** e lavori minori"},
  {h:"Oltre", t:"una stazione **qualificata**", key:true}]},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 15 · il RUP segue tutte le fasi", passi:[
  {t:"Programmazione"},
  {t:"Progettazione"},
  {t:"Affidamento"},
  {t:"Esecuzione", key:true}]},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Il RUP", col:[
  {h:"Un dipendente", t:"con competenze **adeguate**"},
  {h:"Responsabili di fase", t:"possibili, ma il RUP resta **unico**", key:true}]},
{id:"s12", tipo:"contatore", tema:"chiaro", sopratitolo:"La struttura di supporto al RUP",
  valori:[{n:1, t:"per cento della base di gara, al massimo", key:true}],
  sotto:"Per incarichi di **assistenza**."},
{id:"s13", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 16 · il conflitto di interesse", passi:[
  {icona:"avviso", t:"Interesse personale"},
  {icona:"chat", t:"Si dichiara"},
  {icona:"divieto", t:"Ci si astiene", key:true}]},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"RUP: responsabile unico del procedimento",
   ok:"Oggi è il responsabile unico del progetto"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Un solo **responsabile**,<br>dall'idea al **collaudo**."},

// --- 4 · operatori economici
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Gli operatori economici", celle:[
  {t:"Imprese **individuali**"}, {t:"**Società**"}, {t:"**Cooperative**"}, {t:"**Consorzi**"}, {t:"**Professionisti**"}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"catena", sopratitolo:"Anche insieme",
  titolo:"Raggruppamenti e **consorzi**", punti:[
    {icona:"libro", t:"ne parliamo in una **lezione dedicata**", key:true}],
  etichette:{alto:{t:"Insieme", key:true}}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Per partecipare", col:[
  {h:"Requisiti generali", t:"**affidabilità** morale"},
  {h:"Requisiti speciali", t:"**capacità** per l'oggetto", key:true}]},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Gestito dall'ANAC",
  titolo:"Il **fascicolo digitale** dell'impresa", punti:[
    {icona:"certificato", t:"certificati e **regolarità**"},
    {icona:"occhio", t:"consultato dalle **stazioni appaltanti**", key:true}],
  etichette:{}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Le piccole e medie imprese", col:[
  {h:"Quando è possibile", t:"appalti divisi in **lotti**"},
  {h:"Altrimenti", t:"la scelta va **motivata**", key:true}]},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"Imprese dell'Unione europea", voci:[
  {icona:"bilancia", t:"Stesse **condizioni** delle imprese italiane"}]},
{id:"s22", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"Un esempio",
  titolo:"La manutenzione **in lotti**", punti:[
    {icona:"ospedale", t:"un lotto per **territorio**"},
    {icona:"persone", t:"partecipano anche le imprese **locali**", key:true}],
  etichette:{}},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Operatore economico vuol dire grande impresa",
   ok:"Anche un professionista o una piccola cooperativa"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Un mercato **aperto** è la prima<br>garanzia di prezzi **giusti**."},

// --- 5 · centrali di committenza e soggetti aggregatori
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"carrello", sopratitolo:"Comprare insieme",
  titolo:"La **centrale di committenza**", punti:[
    {icona:"persone", t:"gare per conto di **altre amministrazioni**"},
    {icona:"documento", t:"o contratti **già pronti**", key:true}],
  etichette:{}},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Consip, la centrale nazionale", celle:[
  {t:"**Convenzioni**"}, {t:"Accordi **quadro**"}, {t:"Mercato **elettronico**"}]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"I soggetti aggregatori", col:[
  {h:"Consip", t:"e le **centrali regionali**"},
  {h:"Una legge del 2014", t:"per **razionalizzare** la spesa", key:true}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Categorie obbligatorie: in sanità", celle:[
  {t:"**Farmaci**"}, {t:"**Vaccini**"}, {t:"**Dispositivi**"}, {t:"**Pulizie**"}, {t:"**Ristorazione**"}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli strumenti", col:[
  {h:"Convenzione", t:"già aggiudicata: si **ordina**"},
  {h:"Accordo quadro", t:"le **regole** dei contratti successivi", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"Nel Veneto, per la sanità",
  titolo:"**Azienda Zero**", punti:[
    {icona:"ospedale", t:"le gare per le **aziende sanitarie** della regione", key:true}],
  etichette:{}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Il RUP anche con la centrale", col:[
  {h:"L'azienda", t:"un RUP per il **singolo acquisto**", key:true},
  {h:"La centrale", t:"un RUP per le **sue attività**"}]},
{id:"s32", tipo:"catena", tema:"chiaro", sopratitolo:"Torniamo ai guanti", passi:[
  {t:"Convenzione regionale"},
  {t:"Adesione"},
  {t:"Ordine"},
  {t:"Prezzi già negoziati", key:true}]},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Consip è l'unica centrale di committenza",
   ok:"Ci sono le centrali regionali, spesso obbligatorie per la sanità"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Comprare **insieme** per comprare<br>meglio e spendere **meno**."},

// --- 6 · controllo e supporto
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"L'ANAC",
  titolo:"L'Autorità nazionale **anticorruzione**", punti:[
    {icona:"occhio", t:"**vigila** sui contratti pubblici"},
    {icona:"cartella", t:"gestisce la **banca dati** nazionale"},
    {icona:"certificato", t:"tiene l'elenco delle **stazioni qualificate**", key:true}],
  etichette:{}},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"L'ANAC inoltre", col:[
  {h:"Dà pareri", t:"per evitare il **contenzioso**"},
  {h:"Emana", t:"**bandi tipo** e atti di indirizzo", key:true}]},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Il supporto tecnico", celle:[
  {t:"Ministero delle **infrastrutture**"}, {t:"Consiglio superiore dei **lavori pubblici**"}, {t:"Collegio consultivo **tecnico**"}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"gru", sopratitolo:"Art. 215",
  titolo:"Il collegio consultivo **tecnico**", punti:[
    {icona:"chat", t:"risolve in fretta le **controversie**"},
    {icona:"ingranaggio", t:"perché il cantiere non si **fermi**", key:true}],
  etichette:{}},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"La Corte dei conti",
  titolo:"Il **danno erariale**", punti:[
    {icona:"euro", t:"uno **spreco** di denaro pubblico"},
    {icona:"giudice", t:"con **dolo** o **colpa grave**", key:true}],
  etichette:{}},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Le controversie", col:[
  {h:"Sulla gara", t:"giudice **amministrativo**", key:true},
  {h:"Sull'esecuzione", t:"di regola giudice **ordinario**"}]},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Un'impresa esclusa", col:[
  {h:"Può chiedere", t:"un **parere** all'ANAC"},
  {h:"Oppure ricorrere", t:"al **TAR**", key:true}]},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'ANAC decide le controversie come un giudice",
   ok:"Vigila, regola e dà pareri; decidono i giudici"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Chi **vigila**, chi **aiuta**,<br>chi **decide** le liti."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Comprando tramite una centrale non serve un RUP",
   ok:"L'azienda nomina comunque un RUP per il suo acquisto"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Chi **compra**, chi **vende**,<br>chi **aggrega**, chi **vigila**.",
  sotto:"Prossima lezione: soglie e procedure."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 10.4", sottotitolo:"Soglie e procedure", ente:ENTE},
];
