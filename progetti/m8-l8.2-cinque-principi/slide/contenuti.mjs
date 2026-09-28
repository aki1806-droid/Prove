// Contenuto delle 50 scene della lezione 8.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 8. I cinque principi:
// D.Lgs. 165/2001 artt. 4, 14, 35, 36, 40, 52; art. 97 Cost.; D.Lgs. 150/2009 art. 3.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Gli **organi di governo** fissano obiettivi e controllano i risultati; i **dirigenti** gestiscono e ne rispondono **in via esclusiva**",
  "Si accede per **concorso** (art. 97 Cost.); il contratto ha **due livelli**: nazionale con l'**ARAN**, integrativo in azienda",
  "Fabbisogno ordinario a **tempo indeterminato**, lavoro flessibile solo per esigenze **temporanee**; la **valutazione** apre premi e progressioni",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Normativa sul pubblico impiego",
  titolo:"I cinque principi", sottotitolo:"Lezione 8.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"municipio", sopratitolo:"Una richiesta dall'alto",
  titolo:"«Assumi **lui**»", punti:[
    {icona:"persona", t:"un assessore chiede un'**assunzione diretta**"},
    {icona:"divieto", t:"senza **selezione**"},
    {icona:"chat", t:"il direttore dice **no**", key:true}],
  etichette:{insegna:{t:"Regione", key:true}}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Ha ragione il direttore", col:[
  {h:"Perché", t:"la riforma poggia su **principi**"},
  {h:"Che nessuno scavalca", t:"nemmeno **chi governa**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Cinque principi** tengono in piedi<br>tutto il resto."},

// --- 2 · rotta
{id:"s05", tipo:"griglia", tema:"chiaro", colonne:5, spunta:true, sopratitolo:"Eccoli", celle:[
  {t:"**Indirizzo** e gestione"}, {t:"**Concorso**"}, {t:"**Contrattazione**"}, {t:"**Flessibilità**"}, {t:"**Valutazione**"}]},

// --- 3 · chi decide e chi gestisce
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"timone", sopratitolo:"D.Lgs. 165, art. 4, c. 1",
  titolo:"L'**indirizzo** politico", punti:[
    {icona:"libro", t:"obiettivi, programmi, **priorità**"},
    {icona:"documento", t:"**direttive** generali", key:true}],
  etichette:{alto:{t:"La rotta", key:true}, sx:"Organi di governo", dx:"Obiettivi"}},
{id:"s07", tipo:"flusso", tema:"chiaro", sopratitolo:"Gli organi di governo", passi:[
  {icona:"euro", t:"Distribuiscono", d:"le risorse"},
  {icona:"sigillo", t:"Nominano", d:"nei casi di legge"},
  {icona:"occhio", t:"Verificano", d:"i risultati", key:true}]},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Art. 4, c. 2",
  titolo:"La **gestione** ai dirigenti", punti:[
    {icona:"documento", t:"atti e **provvedimenti**, anche verso l'esterno"},
    {icona:"euro", t:"autonomi poteri di **spesa** e organizzazione", key:true}],
  etichette:{top:"Dirigente", basso:{t:"Gestione", key:true}}},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 4, cc. 2-3", col:[
  {h:"Rispondono in via esclusiva", t:"di attività, gestione e **risultati**", key:true},
  {h:"Deroghe", t:"solo per **espressa** previsione di legge"}]},
{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 14 · gli atti dei dirigenti: il ministro non può", voci:[
  {icona:"divieto", t:"**Revocarli**"},
  {icona:"divieto", t:"**Riformarli**"},
  {icona:"divieto", t:"**Adottarli** al loro posto"},
  {icona:"documento", t:"Restano dei **dirigenti**"}]},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"La separazione protegge due cose", col:[
  {h:"Imparzialità", t:"regole stabili se cambia la **maggioranza**"},
  {h:"Responsabilità", t:"si sa **chi ha deciso** che cosa", key:true}]},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Art. 4, c. 4 · e nelle aziende sanitarie?",
  titolo:"Un vertice **non politico**", punti:[
    {icona:"occhio", t:"**indirizzo e controllo**, da un lato"},
    {icona:"ingranaggio", t:"**attuazione e gestione**, dall'altro", key:true}],
  etichette:{}},
{id:"s13", tipo:"confronto", tema:"chiaro", sopratitolo:"Torniamo all'assessore", col:[
  {h:"Scegliere chi assumere", t:"è un atto di **gestione**", key:true},
  {h:"Segue", t:"le regole del **reclutamento**"}]},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"La politica è esclusa dall'amministrazione",
   ok:"Decide gli obiettivi e controlla, ma non gestisce"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"La politica indica la **rotta**,<br>la dirigenza governa la **nave**."},

// --- 4 · il concorso
{id:"s16", tipo:"norma", tema:"chiaro", etichetta:"Costituzione, art. 97", sigla:"Concorso",
  testo:"Agli impieghi nelle pubbliche amministrazioni si accede mediante **concorso**, salvo i casi stabiliti dalla legge."},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"podio", sopratitolo:"A che cosa serve",
  titolo:"**Merito** e imparzialità", punti:[
    {icona:"cappello", t:"scegliere i **più capaci**"},
    {icona:"persone", t:"la **stessa possibilità** per tutti", key:true}],
  etichette:{alto:{t:"Merito", key:true}}},
{id:"s18", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"D.Lgs. 165, art. 35", celle:[
  {t:"**Pubblicità** dei bandi"}, {t:"**Imparzialità**"}, {t:"**Economicità**"},
  {t:"**Rapidità**"}, {t:"Commissioni di **esperti**"}, {t:"**Pari opportunità**"}]},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 35, c. 3 · le commissioni", voci:[
  {icona:"divieto", t:"No all'**organo politico** dell'ente"},
  {icona:"divieto", t:"No a chi ha **cariche politiche**"},
  {icona:"divieto", t:"No ai rappresentanti **sindacali**"},
  {icona:"cappello", t:"Solo **esperti**"}]},
{id:"s20", tipo:"flusso", tema:"chiaro", sopratitolo:"Anche quando si cambia area", passi:[
  {icona:"persona", t:"Dipendente"},
  {icona:"cappello", t:"Area superiore", d:"un nuovo inquadramento"},
  {icona:"spunta", t:"Selettività", key:true}]},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"La procedura comparativa · almeno metà dei posti all'esterno", voci:[
  {icona:"certificato", t:"Valutazione degli **ultimi tre anni**"},
  {icona:"scudo",       t:"Nessuna **sanzione** disciplinare"},
  {icona:"libro",       t:"**Titoli** ulteriori"},
  {icona:"cartella",    t:"**Incarichi** svolti"}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Senza concorso non si entra mai nella pubblica amministrazione",
   ok:"Ci sono eccezioni, ma solo se stabilite dalla legge"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Si entra per **merito**,<br>con regole uguali per tutti."},

// --- 5 · la contrattazione
{id:"s24", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 165, art. 40, c. 1", sigla:"Contratto",
  testo:"La contrattazione collettiva disciplina il **rapporto di lavoro** e le **relazioni sindacali**."},
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"Due livelli",
  titolo:"Nazionale e **integrativo**", punti:[
    {icona:"persone", t:"nazionale: **ARAN** e sindacati, per comparto"},
    {icona:"ospedale", t:"integrativo: in ogni **azienda**", key:true}],
  etichette:{alto:{t:"CCNL", key:true}, sx:"ARAN", dx:"Sindacati"}},
{id:"s26", tipo:"flusso", tema:"chiaro", sopratitolo:"Il contratto nazionale", passi:[
  {icona:"orologio", t:"Dura tre anni", d:"normativa ed economica"},
  {icona:"euro", t:"Controllo dei costi"},
  {icona:"sigillo", t:"Corte dei conti", d:"certifica", key:true},
  {icona:"documento", t:"Firma definitiva"}]},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"I quattro comparti", celle:[
  {t:"Funzioni **centrali**"}, {t:"Funzioni **locali**"}, {t:"Istruzione e **ricerca**"}, {t:"**Sanità**"}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Il contratto integrativo", col:[
  {h:"Si muove", t:"sulle materie e nei limiti del **nazionale**", key:true},
  {h:"E nei vincoli", t:"di **bilancio**"}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio", col:[
  {h:"Il nazionale", t:"fissa **indennità** e criteri"},
  {h:"L'integrativo", t:"ripartisce le risorse per la **produttività**", key:true}]},
{id:"s30", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 40, c. 1 · escluse dal contratto", voci:[
  {icona:"divieto", t:"**Organizzazione** degli uffici"},
  {icona:"divieto", t:"**Prerogative** dei dirigenti"},
  {icona:"divieto", t:"Conferimento e revoca degli **incarichi**"},
  {icona:"libro",   t:"Le decide la **legge**"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Ammesse, nei limiti di legge", celle:[
  {t:"Sanzioni **disciplinari**"}, {t:"Valutazione per l'**accessorio**"}, {t:"**Mobilità**"}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il contratto integrativo può derogare al nazionale",
   ok:"Lo attua sulle materie che il nazionale gli affida"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Il **contratto** regola il rapporto,<br>la **legge** ne fissa i confini."},

// --- 6 · flessibilità e valutazione
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Il quarto principio",
  titolo:"La **flessibilità**", punti:[
    {icona:"ingranaggio", t:"l'organizzazione si **adatta** a compiti e programmi"},
    {icona:"spunta", t:"ampi margini **operativi**", key:true}],
  etichette:{}},
{id:"s35", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 165, art. 36, c. 1", sigla:"Indeterminato",
  testo:"Per il **fabbisogno ordinario** si assume a **tempo indeterminato**, con le procedure dell'art. 35."},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 36, c. 2 · art. 7, c. 5-bis", col:[
  {h:"Ammessi", t:"tempo determinato, somministrazione: solo per esigenze **temporanee**", key:true},
  {h:"Vietate", t:"le collaborazioni **organizzate dal committente**"}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Se le regole vengono violate", col:[
  {h:"Il rapporto", t:"non diventa **mai** a tempo indeterminato"},
  {h:"Il lavoratore", t:"ha diritto al **risarcimento**", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"D.Lgs. 150/2009, art. 3",
  titolo:"La **valutazione**", punti:[
    {icona:"ospedale", t:"migliorare i **servizi**"},
    {icona:"cappello", t:"far crescere le **competenze**", key:true}],
  etichette:{alto:{t:"Performance", key:true}}},
{id:"s39", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Tre piani di valutazione", box:[
  {n:"1", t:"L'ente", d:"nel suo complesso"},
  {n:"2", t:"Le unità", d:"organizzative"},
  {n:"3", t:"Ogni dipendente", d:"con il suo contributo"}]},
{id:"s40", tipo:"flusso", tema:"chiaro", sopratitolo:"Il sistema di misurazione", passi:[
  {icona:"libro", t:"Sistema", d:"di ogni ente"},
  {icona:"occhio", t:"Parere", d:"dell'organismo indipendente", key:true},
  {icona:"spunta", t:"Adozione"}]},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Una valutazione negativa conta", col:[
  {h:"Per i dirigenti", t:"pesa sulla **responsabilità**"},
  {h:"Per tre anni di fila", t:"può portare al **licenziamento**", key:true}]},
{id:"s42", tipo:"confronto", tema:"chiaro", sopratitolo:"Il premio di produttività in reparto", col:[
  {h:"Sì", t:"in base a **obiettivi** e valutazione", key:true},
  {h:"No", t:"a tutti in **parti uguali** per il solo servizio"}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Flessibilità vuol dire assumere a termine per posti stabili",
   ok:"Il tempo determinato è un'eccezione, non la regola"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Organizzazione **flessibile**,<br>lavoro **stabile**, merito misurato."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Un contratto a termine irregolare diventa un posto fisso",
   ok:"Dà diritto al risarcimento del danno, non al posto"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Indirizzo e gestione, concorso,<br>contratto, **flessibilità**, **valutazione**.",
  sotto:"Prossima lezione: l'accesso."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 8.3", sottotitolo:"L'accesso", ente:ENTE},
];
