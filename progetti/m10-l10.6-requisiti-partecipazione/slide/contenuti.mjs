// Contenuto delle 47 scene della lezione 10.6. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 10. Requisiti e forme di partecipazione:
// D.Lgs. 36/2023 artt. 94-98 (esclusione), 100 (requisiti speciali), 101 (soccorso istruttorio),
// 104 (avvalimento), 65-68 (raggruppamenti e consorzi), 119 (subappalto).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "I **requisiti generali** di affidabilità sono agli **artt. 94 e seguenti**: esclusioni automatiche e non automatiche",
  "Con l'**avvalimento** si prestano i requisiti speciali, non quelli generali; nel raggruppamento **orizzontale** tutti in solido",
  "Il **subappalto** va autorizzato; l'appaltatore resta responsabile e risponde **in solido** per i lavoratori",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Appalti pubblici",
  titolo:"Requisiti e forme di partecipazione", sottotitolo:"Lezione 10.6", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Una piccola impresa di pulizie",
  titolo:"La gara di un **grande ospedale**", punti:[
    {icona:"euro", t:"non ha il **fatturato** richiesto"},
    {icona:"avviso", t:"deve **rinunciare**?", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Non necessariamente", col:[
  {h:"Può", t:"**unirsi** ad altre imprese o **prendere in prestito** i requisiti"},
  {h:"Non si prestano", t:"i requisiti di **affidabilità morale**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Le **capacità** si possono sommare,<br>l'**onestà** no."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"I requisiti **generali** e le esclusioni"},
  {t:"I requisiti **speciali** e l'avvalimento"},
  {t:"I **raggruppamenti** temporanei"},
  {t:"Il **subappalto**"}]},

// --- 3 · i requisiti generali
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"I requisiti di ordine generale",
  titolo:"L'impresa dev'essere **affidabile**", punti:[
    {icona:"documento", t:"il codice elenca le **cause di esclusione**", key:true}],
  etichette:{}},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:5, spunta:false, sopratitolo:"Art. 94 · esclusione automatica: condanne definitive", celle:[
  {t:"**Corruzione**"}, {t:"**Turbativa** d'asta"}, {t:"**Terrorismo**"}, {t:"**Riciclaggio**"}, {t:"**Antimafia**"}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Automatiche anche", celle:[
  {t:"Gravi violazioni **fiscali e contributive** accertate"}, {t:"**Liquidazione** o fallimento"}, {t:"**False dichiarazioni** nel casellario"}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 95 · esclusione non automatica", col:[
  {h:"La stazione appaltante", t:"le **valuta**"},
  {h:"Per esempio", t:"sicurezza sul lavoro, **grave illecito professionale**", key:true}]},
{id:"s10", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 96 · il ravvedimento", passi:[
  {t:"Un illecito"},
  {t:"Il danno risarcito"},
  {t:"Misure per non ripeterlo"},
  {t:"Niente esclusione", key:true}]},
{id:"s11", tipo:"flusso", tema:"chiaro", sopratitolo:"Dichiarare e verificare", passi:[
  {icona:"documento", t:"Documento di gara", d:"unico europeo"},
  {icona:"cartella", t:"Fascicolo digitale", d:"dell'impresa"},
  {icona:"chat", t:"Soccorso istruttorio", d:"per le mancanze formali", key:true}]},
{id:"s12", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 101 · il soccorso istruttorio", max:10, banda:[5,10],
  inizio:"la richiesta", fine:"", tappe:[
  {a:5, v:"5", t:"giorni almeno"}, {a:10, v:"10", t:"giorni al massimo", key:true}]},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio", passi:[
  {t:"Dichiarazione dimenticata"},
  {t:"Richiesta di integrazione"},
  {t:"Presentata nei termini"},
  {t:"Resta in gara", key:true}]},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Le cause di esclusione sono all'articolo 80",
   ok:"Oggi sono agli articoli 94 e seguenti"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Prima l'**affidabilità**,<br>poi tutto il **resto**."},

// --- 4 · i requisiti speciali e l'avvalimento
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Art. 100 · i requisiti speciali", celle:[
  {t:"Idoneità **professionale**"}, {t:"Capacità **economica e finanziaria**"}, {t:"Capacità **tecniche e professionali**"}]},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Di solito", col:[
  {h:"Idoneità professionale", t:"iscrizione alla **camera di commercio**"},
  {h:"Capacità economica", t:"il **fatturato**", key:true}]},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le capacità tecniche", celle:[
  {t:"**Servizi analoghi** già svolti"}, {t:"**Personale** e attrezzature"},
  {t:"**Certificazioni** di qualità"}, {t:"Per i lavori: **qualificazione** per categorie"}]},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Requisiti proporzionati",
  titolo:"All'**oggetto** del contratto", punti:[
    {icona:"avviso", t:"un fatturato troppo alto **esclude** le piccole imprese", key:true}],
  etichette:{}},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Nei documenti di gara",
  titolo:"Chiari e **fin dall'inizio**", punti:[
    {icona:"occhio", t:"leggendo il bando, l'impresa sa se **può partecipare**", key:true}],
  etichette:{}},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Art. 104",
  titolo:"L'**avvalimento**", punti:[
    {icona:"persone", t:"ci si appoggia a un'impresa **ausiliaria**"},
    {icona:"ingranaggio", t:"che mette a disposizione **risorse e mezzi**", key:true}],
  etichette:{}},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Le regole", col:[
  {h:"Un contratto", t:"e l'ausiliaria risponde **in solido**"},
  {h:"Non vale", t:"per i requisiti **generali**", key:true}]},
{id:"s23", tipo:"catena", tema:"chiaro", sopratitolo:"Torniamo alla piccola impresa", passi:[
  {t:"Contratto di avvalimento"},
  {t:"Fatturato ed esperienza dell'ausiliaria"},
  {t:"Rispondono insieme", key:true}]},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Con l'avvalimento si prestano anche i requisiti morali",
   ok:"Onorabilità e assenza di condanne: ciascuna per sé"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Si possono prestare i **mezzi**,<br>non la **reputazione**."},

// --- 5 · i raggruppamenti temporanei
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Art. 68",
  titolo:"Il **raggruppamento temporaneo**", punti:[
    {icona:"persone", t:"un **mandato collettivo**"},
    {icona:"persona", t:"alla **mandataria**, che presenta l'offerta", key:true}],
  etichette:{}},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Nell'offerta", col:[
  {h:"Si indica", t:"chi esegue **quali parti**"},
  {h:"Nasce per la gara", t:"**non** è una nuova società", key:true}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Due forme", col:[
  {h:"Orizzontale", t:"la **stessa** prestazione, divisa"},
  {h:"Verticale", t:"una la **principale**, le altre le secondarie", key:true}]},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"catena", sopratitolo:"Chi risponde",
  titolo:"Verso la **stazione appaltante**", punti:[
    {icona:"persone", t:"orizzontale: **tutte** in solido"},
    {icona:"persona", t:"verticale: mandanti per la **propria parte**, mandataria per **tutto**", key:true}],
  etichette:{}},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"azienda", sopratitolo:"Art. 65",
  titolo:"I **consorzi**", punti:[
    {icona:"persone", t:"stabili o di **cooperative**"},
    {icona:"documento", t:"indicano le **consorziate** esecutrici", key:true}],
  etichette:{}},
{id:"s31", tipo:"icone", tema:"chiaro", sopratitolo:"Nella stessa gara", voci:[
  {icona:"divieto", t:"Non **da sola** e insieme **in raggruppamento**"},
  {icona:"bilancia", t:"Sarebbero **due offerte**", key:true}]},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Manutenzione degli impianti: un verticale", celle:[
  {t:"Impianti **elettrici**: la principale"}, {t:"Impianti **idraulici**"}, {t:"**Antincendio**"}]},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Nell'orizzontale risponde solo la mandataria",
   ok:"Tutte le imprese rispondono in solido"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Insieme per **vincere**,<br>insieme per **rispondere**."},

// --- 6 · il subappalto
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 119", col:[
  {h:"Il subappalto", t:"affida a un'altra impresa una **parte** delle prestazioni"},
  {h:"Il contratto d'appalto", t:"**non** si può cedere", key:true}]},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Il limite", col:[
  {h:"Nessuna", t:"percentuale **generale**"},
  {h:"La stazione appaltante", t:"indica le prestazioni da eseguire **direttamente**", key:true}]},
{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"Come si subappalta", passi:[
  {t:"Dichiarato nell'offerta"},
  {t:"Requisiti verificati"},
  {t:"Autorizzato", key:true}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"L'appaltatore resta responsabile", col:[
  {h:"Verso la stazione appaltante", t:"di **tutto** il contratto"},
  {h:"In solido", t:"per **retribuzioni** e **contributi**", key:true}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"I lavoratori del subappaltatore",
  titolo:"Lo **stesso trattamento**", punti:[
    {icona:"euro", t:"economico e **normativo**"},
    {icona:"documento", t:"compreso il **contratto collettivo**", key:true}],
  etichette:{}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"dpi", sopratitolo:"Un esempio",
  titolo:"La sanificazione delle **sale operatorie**", punti:[
    {icona:"certificato", t:"serve l'**autorizzazione**"},
    {icona:"persone", t:"i lavoratori hanno le **stesse tutele**", key:true}],
  etichette:{}},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il subappalto libera l'appaltatore",
   ok:"Resta responsabile, e in solido per i lavoratori"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Chi **subappalta**,<br>resta comunque **responsabile**."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il soccorso istruttorio corregge l'offerta economica",
   ok:"Integra documenti e dichiarazioni mancanti"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"**Affidabilità** per tutti, capacità anche insieme,<br>**responsabilità** sempre.",
  sotto:"Ultima lezione del modulo: l'esecuzione del contratto."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 10.7", sottotitolo:"Esecuzione del contratto", ente:ENTE},
];
