// Contenuto delle 48 scene della lezione 6b.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6-bis, Anticorruzione. Il piano e la
// gestione del rischio: L. 190/2012 art. 1 cc. 8, 8-bis, 9, 16; D.L. 80/2021 art. 6 (PIAO);
// PNA 2013, aggiornamento 2015 (sanità), PNA 2019 (allegato 1, metodo), PNA 2022.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il piano lo **propone** l'RPCT e lo **adotta** l'organo di indirizzo entro il **31 gennaio**; non si affida all'**esterno**",
  "Con il **D.L. 80/2021** il piano confluisce nel **PIAO**, sezione **rischi corruttivi e trasparenza**, sopra i **50 dipendenti**",
  "Gestione del rischio: **contesto** e mappatura, **valutazione**, **trattamento** con misure generali e specifiche, **monitoraggio**",
];

const FASI = [
  {icona:"occhio", t:"Contesto", d:"esterno e interno"},
  {icona:"bilancia", t:"Valutazione", d:"eventi, fattori, livello"},
  {icona:"scudo", t:"Trattamento", d:"le misure"},
  {icona:"orologio", t:"Monitoraggio", d:"e riesame"}];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6-bis · Anticorruzione",
  titolo:"Il piano<br>e la gestione del rischio", sottotitolo:"Lezione 6b.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Un piano di 120 pagine",
  titolo:"Copiato da **un'altra** azienda", punti:[
    {icona:"documento", t:"quasi **tutto** uguale"},
    {icona:"avviso", t:"è in **regola**?", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Sulla carta forse sì", col:[
  {h:"Un documento di forma", t:"non **previene** niente"},
  {h:"La legge chiede", t:"un'analisi dei **rischi propri**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Un piano vale quanto<br>l'**analisi** che c'è dietro."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Il **piano**: chi lo scrive, chi lo adotta"},
  {t:"Il **PIAO**"},
  {t:"La gestione del **rischio**"},
  {t:"Le **aree** a rischio in sanità"}]},

// --- 3 · il piano
{id:"s06", tipo:"sigla", tema:"chiaro", sopratitolo:"Il piano di ogni amministrazione", lettere:[
  {l:"P", p:"Piano"}, {l:"T", p:"Triennale"}, {l:"P", p:"Prevenzione"}, {l:"C", p:"Corruzione"}, {l:"T", p:"Trasparenza", key:true}]},
{id:"s07", tipo:"catena", tema:"chiaro", sopratitolo:"L. 190/2012, art. 1, c. 8", passi:[
  {t:"L'RPCT", d:"propone"},
  {t:"L'organo di indirizzo", d:"in azienda, il direttore generale"},
  {t:"Adotta", d:"entro il 31 gennaio", key:true}]},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"porta", sopratitolo:"Art. 1, c. 8",
  titolo:"Il piano nasce **dentro**", punti:[
    {icona:"divieto", t:"non si affida a soggetti **estranei**"},
    {icona:"persone", t:"i consulenti possono solo **aiutare**", key:true}],
  etichette:{}},
{id:"s09", tipo:"piramide", tema:"chiaro", sopratitolo:"L'organo di indirizzo fissa gli obiettivi", strati:[
  {t:"Obiettivi strategici", d:"anticorruzione e trasparenza"},
  {t:"Programmazione dell'ente", d:"contenuto necessario"},
  {t:"Il piano", d:"che li traduce in misure"}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Ogni anno", col:[
  {h:"Si aggiorna", t:"scorrendo sul **triennio**"},
  {h:"Si pubblica", t:"in **Amministrazione trasparente**", key:true}]},
{id:"s11", tipo:"elenco", tema:"chiaro", numerato:true, sopratitolo:"Art. 1, c. 9 · che cosa deve fare il piano", voci:[
  {t:"individuare le attività a **rischio**"},
  {t:"meccanismi di **controllo** delle decisioni"},
  {t:"obblighi di **informazione** verso l'RPCT"},
  {t:"monitorare i **tempi** dei procedimenti"}]},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Art. 1, c. 9, lett. e",
  titolo:"Chi riceve **contratti** e vantaggi", punti:[
    {icona:"euro", t:"monitorare i **rapporti** con l'amministrazione"},
    {icona:"persone", t:"anche le **parentele** con dirigenti e dipendenti", key:true}],
  etichette:{}},
{id:"s13", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Art. 1, c. 8-bis · l'OIV",
  titolo:"Piano e **performance**", punti:[
    {icona:"bilancia", t:"verifica la **coerenza** con la programmazione"},
    {icona:"occhio", t:"la valutazione tiene conto dell'**anticorruzione**", key:true}],
  etichette:{}},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il piano lo adotta il responsabile anticorruzione",
   ok:"L'RPCT lo propone, l'organo di indirizzo lo adotta"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Il responsabile **propone**,<br>la direzione **adotta**."},

// --- 4 · il PIAO
{id:"s16", tipo:"sigla", tema:"chiaro", sopratitolo:"D.L. 80/2021, art. 6 · oltre 50 dipendenti", lettere:[
  {l:"P", p:"Piano"}, {l:"I", p:"Integrato"}, {l:"A", p:"Attività"}, {l:"O", p:"Organizzazione", key:true}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:5, sopratitolo:"Un solo documento al posto di più piani", celle:[
  {t:"Performance"},
  {t:"Fabbisogni di personale"},
  {t:"Lavoro agile"},
  {t:"Formazione"},
  {t:"Anticorruzione e trasparenza"}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Il piano anticorruzione dentro il PIAO", col:[
  {h:"Diventa", t:"la sottosezione **rischi corruttivi e trasparenza**"},
  {h:"Resta", t:"il contenuto della **legge 190**", key:true}],
  sotto:"Cambia il contenitore, non le regole."},
{id:"s19", tipo:"tre", tema:"chiaro", sopratitolo:"Anche il PIAO", box:[
  {n:"1", t:"Triennale"},
  {n:"2", t:"Aggiornato ogni anno"},
  {n:"3", t:"Entro il 31 gennaio", key:true}]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Dipende dalla dimensione", col:[
  {h:"Oltre 50 dipendenti", t:"PIAO **completo**: le aziende sanitarie"},
  {h:"Fino a 50", t:"PIAO **semplificato**", key:true}]},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Un esempio: dove lo trovi",
  titolo:"Il piano di un'azienda **ospedaliera**", punti:[
    {icona:"documento", t:"dentro il **PIAO**"},
    {icona:"occhio", t:"in **Amministrazione trasparente**", key:true}],
  etichette:{}},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio al distrattore", righe:[
  {sb:"Il PIAO ha abolito la prevenzione della corruzione",
   ok:"L'ha assorbita: la sezione resta obbligatoria"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Cambia il **contenitore**,<br>restano le **regole**."},

// --- 5 · gestione del rischio
{id:"s24", tipo:"ciclo", tema:"chiaro", sopratitolo:"PNA 2019 · un ciclo che si ripete ogni anno",
  centro:"Il rischio", dcentro:"gestito per fasi", fasi:FASI},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Prima fase: l'analisi del contesto", col:[
  {h:"Esterno", t:"territorio, **fornitori**, interessi in gioco"},
  {h:"Interno", t:"organizzazione e **mappatura dei processi**", key:true}]},
{id:"s26", tipo:"catena", tema:"chiaro", sopratitolo:"Mappare un processo", passi:[
  {t:"Chi fa", d:"che cosa"},
  {t:"In quali passaggi"},
  {t:"Con quali margini di scelta", key:true}]},
{id:"s27", tipo:"catena", tema:"chiaro", sopratitolo:"Seconda fase: la valutazione", passi:[
  {t:"Identificare", d:"gli eventi rischiosi"},
  {t:"Analizzare", d:"discrezionalità, controlli assenti"},
  {t:"Stimare", d:"il livello di esposizione", key:true}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Come si misura il rischio", col:[
  {h:"Non solo numeri", t:"un **giudizio motivato**"},
  {h:"Su indicatori", t:"**interesse economico**, eventi passati", key:true}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Terza fase: il trattamento", col:[
  {h:"Misure generali", t:"per **tutta** l'amministrazione"},
  {h:"Misure specifiche", t:"per un rischio **preciso** di un processo", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"Ultima fase: monitoraggio e riesame",
  titolo:"Attuate? **Funzionano**?", punti:[
    {icona:"spunta", t:"si verifica l'**attuazione**"},
    {icona:"orologio", t:"il piano dell'anno dopo **riparte** da qui", key:true}],
  etichette:{}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio: le sale operatorie", col:[
  {h:"Il rischio", t:"programmare interventi **per favore**"},
  {h:"La misura specifica", t:"criteri di programmazione **tracciati**", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Misure generali e specifiche sono alternative",
   ok:"Le generali valgono ovunque, le specifiche si aggiungono"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Contesto, **valutazione**,<br>trattamento, **monitoraggio**."},

// --- 6 · le aree
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Art. 1, c. 16 · le quattro aree della legge", celle:[
  {t:"Autorizzazioni e **concessioni**"},
  {t:"Scelta del **contraente**"},
  {t:"Sovvenzioni e **vantaggi** economici"},
  {t:"**Concorsi** e progressioni di carriera"}]},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Il PNA le amplia", celle:[
  {t:"Entrate, **spese**, patrimonio"},
  {t:"Controlli e **ispezioni**"},
  {t:"Incarichi e **nomine**"},
  {t:"Affari legali e **contenzioso**"}]},
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"carrello", sopratitolo:"PNA 2022",
  titolo:"I **contratti pubblici**", punti:[
    {icona:"euro", t:"anche per i fondi del **PNRR**"},
    {icona:"avviso", t:"l'area con il rischio **più alto**", key:true}],
  etichette:{}},
{id:"s37", tipo:"tre", tema:"chiaro", sopratitolo:"Aggiornamento 2015 · le aree della sanità", box:[
  {n:"", t:"Contratti", d:"anche farmaci e dispositivi"},
  {n:"", t:"Nomine", d:"anche le strutture complesse", key:true}]},
{id:"s38", tipo:"icone", tema:"chiaro", sopratitolo:"E ancora", voci:[
  {icona:"orologio", t:"Libera professione e **liste d'attesa**"},
  {icona:"ospedale", t:"Rapporti con i **privati accreditati**"},
  {icona:"goccia", t:"Farmaceutica e **sperimentazioni**", key:true}]},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"La voce che sorprende",
  testo:"Le attività conseguenti al **decesso** in ospedale.",
  sotto:"Per esempio, i rapporti con le imprese di **onoranze funebri**."},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Un esempio: la libera professione",
  titolo:"Due agende, **un** medico", punti:[
    {icona:"persona", t:"agenda **pubblica** e agenda privata"},
    {icona:"euro", t:"rischio: pazienti dirottati **a pagamento**", key:true}],
  etichette:{}},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio", righe:[
  {sb:"Le progressioni di carriera non sono un'area a rischio",
   ok:"Le indica la legge: anche la vostra procedura"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Dove si **decide**,<br>lì c'è **rischio**."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose da portare alla prova", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Un piano copiato da un'altra azienda è valido",
   ok:"La mappatura deve essere quella dei propri processi"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Un piano scritto **dentro** l'ente,<br>sui **propri** processi.",
  sotto:"Prossima lezione: il responsabile della prevenzione."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 6b.3", sottotitolo:"Il responsabile della prevenzione", ente:ENTE},
];
