// Contenuto delle 49 scene della lezione 8.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 8. L'accesso:
// art. 97 Cost.; D.Lgs. 165/2001 artt. 35, 36, 37, 38, 52; L. 68/1999; D.P.R. 487/1994 e 220/2001.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Si entra con **procedure selettive**, con l'**avviamento dalle liste** (scuola dell'obbligo) o con le assunzioni delle **categorie protette**",
  "Il concorso segue l'**art. 35**: pubblicità, imparzialità, trasparenza, pari opportunità, una **commissione di soli esperti**",
  "La **graduatoria** vale per un periodo di legge; i vincitori restano **cinque anni** nella prima sede; gli interni crescono con la **procedura comparativa**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Normativa sul pubblico impiego",
  titolo:"L'accesso", sottotitolo:"Lezione 8.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Un bando dell'azienda sanitaria",
  titolo:"Assistente **amministrativo**", punti:[
    {icona:"documento", t:"**requisiti**, prove, scadenze"},
    {icona:"chat", t:"da dove viene tutta questa **procedura**?", key:true}],
  etichette:{barra:"Bandi di concorso", menu:{t:"Assistente amministrativo", key:true}}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Conoscere le regole serve due volte", col:[
  {h:"Per partecipare", t:"a un **concorso** pubblico"},
  {h:"Per capire", t:"la **selezione interna** che stai preparando", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Ogni posto pubblico si conquista<br>con una **prova aperta**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"persone", t:"Le vie d'ingresso"},
  {icona:"scudo", t:"I principi del concorso"},
  {icona:"documento", t:"Bando, requisiti, prove", key:true},
  {icona:"certificato", t:"La graduatoria"}]},

// --- 3 · le vie d'ingresso
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 165, art. 35, c. 1", sigla:"Contratto",
  testo:"L'assunzione avviene con **contratto individuale di lavoro**, per strade fissate dalla legge."},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"podio", sopratitolo:"La strada principale",
  titolo:"Le **procedure selettive**", punti:[
    {icona:"cappello", t:"accertano la **professionalità** richiesta"},
    {icona:"persone", t:"garantiscono l'accesso **dall'esterno**", key:true}],
  etichette:{alto:{t:"Concorso", key:true}}},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 35, c. 1, lett. b", col:[
  {h:"Avviamento dalle liste", t:"dei **centri per l'impiego**"},
  {h:"Solo per i profili", t:"con la sola **scuola dell'obbligo**", key:true}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Art. 35, c. 2 · legge 68 del 1999",
  titolo:"Le **categorie protette**", punti:[
    {icona:"persona", t:"persone con **disabilità** e altre categorie"},
    {icona:"sigillo", t:"assunzioni **obbligatorie**, anche per chiamata numerica", key:true}],
  etichette:{insegna:{t:"Collocamento mirato", key:true}}},
{id:"s10", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 35, c. 4 · si parte dalla programmazione", passi:[
  {icona:"libro", t:"Piano dei fabbisogni", d:"triennale"},
  {icona:"cartella", t:"Nel PIAO", key:true},
  {icona:"documento", t:"Avvio delle procedure"}]},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Prima di bandire un concorso", col:[
  {h:"Si verifica", t:"se il posto si copre con personale **già pubblico**"},
  {h:"Con la mobilità", t:"la vedremo nell'**ultima lezione**", key:true}]},
{id:"s12", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: operatori tecnici", passi:[
  {icona:"ospedale", t:"L'azienda", d:"chiede l'avviamento"},
  {icona:"persone", t:"Centro per l'impiego"},
  {icona:"spunta", t:"Prova", d:"di idoneità", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"L'avviamento dalle liste vale per qualunque profilo",
   ok:"Solo per i profili previsti, e con una prova di idoneità"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"**Tre strade**,<br>nessuna scelta a discrezione."},

// --- 4 · i principi del concorso
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Art. 35, c. 3, lett. a",
  titolo:"La **pubblicità**", punti:[
    {icona:"occhio", t:"il bando lo conoscono **tutti**"},
    {icona:"persone", t:"tutti quelli che possono **partecipare**", key:true}],
  etichette:{barra:"Albo online", menu:{t:"Bando pubblicato", key:true}}},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Poi", celle:[
  {t:"**Imparzialità**"}, {t:"**Economicità**"}, {t:"**Rapidità**"}, {t:"**Preselezioni** se i candidati sono molti"}]},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Lettere b e c", col:[
  {h:"Meccanismi oggettivi", t:"e **trasparenti**, adatti al posto", key:true},
  {h:"Pari opportunità", t:"tra **donne e uomini**"}]},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Lettera d",
  titolo:"Procedure **decentrate**", punti:[
    {icona:"ospedale", t:"ogni amministrazione **organizza** le sue selezioni"},
    {icona:"libro", t:"secondo il suo **piano dei fabbisogni**", key:true}],
  etichette:{top:"Amministrazione", basso:{t:"Selezione", key:true}}},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Lettera e · la commissione", voci:[
  {icona:"cappello", t:"Solo **esperti** di provata competenza"},
  {icona:"persone",  t:"Funzionari, docenti, **esterni**"},
  {icona:"divieto",  t:"Nessun **politico** dell'ente"},
  {icona:"divieto",  t:"Nessun rappresentante **sindacale**"}]},
{id:"s20", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: migliaia di domande", passi:[
  {icona:"persone", t:"Candidati"},
  {icona:"ingranaggio", t:"Preselezione", d:"quiz al computer", key:true},
  {icona:"documento", t:"Le prove"}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"I regolamenti", col:[
  {h:"Regolamento generale", t:"del **1994**, riscritto nel **2023**"},
  {h:"Comparto sanità", t:"un regolamento **specifico**, del 2001", key:true}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"In commissione non possono stare esperti esterni",
   ok:"Possono; sono esclusi politici e sindacalisti"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Pubblicità, imparzialità,<br>trasparenza, **esperti veri**."},

// --- 5 · bando, requisiti, prove
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"La legge del concorso",
  titolo:"Il **bando**", punti:[
    {icona:"cartella", t:"posti, requisiti, prove, **titoli**, scadenze"},
    {icona:"bilancia", t:"vincola candidati e **amministrazione**", key:true}],
  etichette:{titolo:"Bando di concorso", sigillo:{t:"Vincola", key:true}}},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"I requisiti generali", celle:[
  {t:"**Età** minima"}, {t:"**Idoneità** fisica"}, {t:"**Diritti politici**"},
  {t:"**Titolo di studio**"}, {t:"**Cittadinanza**"}, {t:"Requisiti del **profilo**"}]},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Per alcuni profili sanitari",
  titolo:"Requisiti **professionali**", punti:[
    {icona:"certificato", t:"il **titolo abilitante**"},
    {icona:"sigillo", t:"l'iscrizione all'**albo**", key:true}],
  etichette:{alto:{t:"Abilitazione", key:true}}},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"globo", sopratitolo:"D.Lgs. 165, art. 38",
  titolo:"I cittadini **europei**", punti:[
    {icona:"spunta", t:"accedono ai posti **pubblici**"},
    {icona:"divieto", t:"salvo **pubblici poteri** e interesse nazionale", key:true}],
  etichette:{alto:{t:"Unione europea", key:true}}},
{id:"s28", tipo:"icone", tema:"chiaro", sopratitolo:"Le prove", voci:[
  {icona:"documento",   t:"**Scritte**"},
  {icona:"ingranaggio", t:"**Pratiche**"},
  {icona:"chat",        t:"**Orali**"},
  {icona:"libro",       t:"**Inglese** e informatica"}]},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"lavoroagile", sopratitolo:"Sempre più digitali",
  titolo:"Il concorso **online**", punti:[
    {icona:"documento", t:"prove al **computer**"},
    {icona:"occhio", t:"bandi anche sul portale **inPA**", key:true}],
  etichette:{alto:{t:"inPA", key:true}}},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Nel bando anche", col:[
  {h:"Riserve di posti", t:"per esempio per i **militari congedati**"},
  {h:"Titoli di preferenza", t:"previsti dalla **legge**", key:true}]},
{id:"s31", tipo:"flusso", tema:"chiaro", sopratitolo:"Il bando da assistente amministrativo", passi:[
  {icona:"certificato", t:"Diploma", d:"requisito"},
  {icona:"documento", t:"Prova scritta"},
  {icona:"chat", t:"Prova orale", d:"con inglese e informatica", key:true},
  {icona:"cartella", t:"Titoli"}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il bando si può cambiare a piacere durante la procedura",
   ok:"Le regole si fissano prima, uguali per tutti"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Il bando è la regola<br>uguale per tutti,<br>**scritta prima**."},

// --- 6 · graduatoria e dopo
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"podio", sopratitolo:"Alla fine delle prove",
  titolo:"La **graduatoria** di merito", punti:[
    {icona:"spunta", t:"nei posti utili: i **vincitori**"},
    {icona:"persone", t:"gli altri che hanno superato le prove: gli **idonei**", key:true}],
  etichette:{alto:{t:"Graduatoria", key:true}, sx:"Idoneo", dx:"Idoneo"}},
{id:"s35", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 35, c. 5-ter · quanto vale (mesi)",
  max:28, banda:[0,24], inizio:"approvazione", fine:"",
  tappe:[{a:24, v:"2 anni", t:"di norma, poi **decade**", key:true}]},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio di scorrimento", col:[
  {h:"Dieci posti a bando", t:"il **quindicesimo** è idoneo"},
  {h:"L'anno dopo", t:"altri cinque posti: viene **assunto**", key:true}]},
{id:"s37", tipo:"flusso", tema:"chiaro", sopratitolo:"Chi vince", passi:[
  {icona:"documento", t:"Contratto individuale"},
  {icona:"orologio", t:"Periodo di prova", d:"fissato dal contratto"},
  {icona:"spunta", t:"Assunzione definitiva", key:true}]},
{id:"s38", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 35, c. 5-bis · il vincolo",
  valori:[{n:5, t:"anni nella sede di prima destinazione", key:true}],
  sotto:"Perché i posti non si svuotino subito dopo il concorso."},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 52, c. 1-bis · chi è già dentro", col:[
  {h:"Progressione tra le aree", t:"con la **procedura comparativa**", key:true},
  {h:"Almeno metà dei posti", t:"resta per l'accesso **dall'esterno**"}]},
{id:"s40", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa conta nella procedura comparativa", voci:[
  {icona:"certificato", t:"Valutazione positiva degli **ultimi tre anni**"},
  {icona:"scudo",       t:"Nessuna sanzione **disciplinare**"},
  {icona:"libro",       t:"Titoli e **competenze** ulteriori"},
  {icona:"cartella",    t:"Numero e tipo di **incarichi**"}]},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Se qualcosa va storto", col:[
  {h:"Nel concorso", t:"giudice **amministrativo**"},
  {h:"Dopo l'assunzione", t:"giudice del **lavoro**", key:true}]},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'idoneo ha diritto all'assunzione",
   ok:"Può essere chiamato se la graduatoria viene scorsa"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"**Vincere** apre la porta,<br>l'idoneità la tiene socchiusa."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"I cittadini dell'Unione europea non accedono ai posti pubblici",
   ok:"Accedono, salvo pubblici poteri e interesse nazionale"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Strade fissate dalla legge,<br>un **bando** uguale per tutti,<br>una **graduatoria** di merito.",
  sotto:"Prossima lezione: la dirigenza."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 8.4", sottotitolo:"La dirigenza", ente:ENTE},
];
