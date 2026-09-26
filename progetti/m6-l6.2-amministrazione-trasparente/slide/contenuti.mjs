// Contenuto delle 50 scene della lezione 6.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6. La sezione «Amministrazione trasparente»:
// D.Lgs. 33/2013 artt. 6, 7, 7-bis, 8, 9, 13, 15, 16, 19, 20, 22, 26, 33, 35, 41; allegato A.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Sezione in **home page**; dati **aperti**; online di regola **5 anni** dal 1° gennaio successivo",
  "Sotto-sezioni: organizzazione, personale, **bandi di concorso**, performance, contratti, bilanci; consulenze e sovvenzioni: pubblicazione = **efficacia**",
  "**Art. 41**: spese e pagamenti, **nomine** dei direttori, strutture **accreditate**, **liste di attesa**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Trasparenza nella pubblica amministrazione",
  titolo:"Amministrazione<br>trasparente", sottotitolo:"Lezione 6.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Apri il sito della tua azienda sanitaria",
  titolo:"In fondo alla **pagina**", punti:[
    {icona:"cartella", t:"una voce: **Amministrazione trasparente**", key:true},
    {icona:"ospedale", t:"dietro, quasi tutta la vita dell'**azienda**"}],
  etichette:{barra:"Home page", menu:{t:"Amministrazione trasparente", key:true}}},
{id:"s03", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Stessa struttura per ogni amministrazione", celle:[
  {t:"**Organizzazione**"}, {t:"**Personale**"}, {t:"**Concorsi**"}, {t:"**Incarichi**"},
  {t:"**Contratti**"}, {t:"**Bilanci**"}, {t:"**Pagamenti**"}, {t:"**Tempi di attesa**"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Una sola **porta d'ingresso**<br>per tutte le informazioni pubbliche."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"Le regole", d:"della sezione"},
  {icona:"cartella", t:"La mappa", d:"delle sotto-sezioni"},
  {icona:"ospedale", t:"La sanità", d:"art. 41"},
  {icona:"lucchetto", t:"La riservatezza", key:true}]},

// --- 3 · la sezione e le sue regole
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 33/2013, art. 9", sigla:"In home page",
  testo:"Un'apposita sezione denominata «**Amministrazione trasparente**»."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa contiene", col:[
  {h:"Dati e documenti", t:"quelli a pubblicazione **obbligatoria**"},
  {h:"Oppure un collegamento", t:"ad altre pagine, per **non duplicare**"}]},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Vietato nascondersi",
  titolo:"Niente **filtri**", punti:[
    {icona:"divieto", t:"nessun ostacolo ai **motori di ricerca**", key:true},
    {icona:"occhio", t:"i contenuti devono essere **trovabili**"}],
  etichette:{titolo:{t:"Indicizzabile", key:true}}},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Una struttura uguale ovunque",
  titolo:"Impari una volta", punti:[
    {icona:"ospedale", t:"azienda sanitaria"},
    {icona:"persone", t:"comune, ministero: **stessa mappa**", key:true}],
  etichette:{barra:"Qualsiasi PA", menu:"Stesse voci"}},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Art. 6 · la qualità dei dati", celle:[
  {t:"**Integri**"}, {t:"**Aggiornati**"}, {t:"**Completi**"},
  {t:"**Tempestivi**"}, {t:"**Consultabili**"}, {t:"**Comprensibili**"}]},
{id:"s11", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Art. 7 · formato aperto", box:[
  {n:"1", t:"Riutilizzabili", d:"da chiunque"},
  {n:"2", t:"Citare la fonte", d:"l'unico obbligo"},
  {n:"3", t:"Integrità", d:"da rispettare"}]},
{id:"s12", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 8 · quanto restano online",
  max:6, banda:[1,5], inizio:"obbligo", fine:"",
  tappe:[{a:1, v:"1° gen.", t:"anno **successivo**"}, {a:5, v:"5 anni", t:"durata **ordinaria**", key:true}]},
{id:"s13", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Dopo la scadenza",
  titolo:"Non spariscono", punti:[
    {icona:"cartella", t:"i dati restano **conoscibili**"},
    {icona:"chat", t:"con una richiesta di **accesso civico**", key:true}],
  etichette:{cassetto:{t:"Oltre i 5 anni", key:true}}},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"La pubblicazione dura un anno",
   ok:"Di regola cinque anni, dal 1° gennaio successivo"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Una sezione in **home page**,<br>dati **aperti**, **cinque anni** online."},

// --- 4 · la mappa delle sotto-sezioni
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Allegato A, poi gli schemi ANAC",
  titolo:"Una struttura **fissa**", punti:[
    {icona:"cartella", t:"sotto-sezioni di **primo** e secondo livello"},
    {icona:"libro", t:"aggiornata dall'**ANAC**", key:true}],
  etichette:{barra:"Amministrazione trasparente", menu:{t:"Sotto-sezioni", key:true}}},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Art. 13 · Organizzazione",
  titolo:"Chi fa **che cosa**", punti:[
    {icona:"persona", t:"organi di **indirizzo** e amministrazione"},
    {icona:"cartella", t:"uffici e **dirigenti** responsabili"},
    {icona:"chat", t:"telefoni, email, **PEC**", key:true}],
  etichette:{top:{t:"Organigramma", key:true}}},
{id:"s18", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 15 · Consulenti e collaboratori", passi:[
  {icona:"documento", t:"Atto, curriculum", d:"e compenso"},
  {icona:"occhio", t:"Pubblicazione", d:"sul sito"},
  {icona:"spunta", t:"Efficacia", d:"e pagamento del compenso", key:true}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Artt. 16-21 · Personale", celle:[
  {t:"**Dotazione** organica"}, {t:"**Costo** del personale"}, {t:"**Tassi di assenza**"},
  {t:"Incarichi **autorizzati**"}, {t:"Contratti **collettivi**"}, {t:"Contratti **integrativi**"}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Art. 19 · un esempio che ti riguarda",
  titolo:"Bandi di **concorso**", punti:[
    {icona:"documento", t:"i **bandi**"},
    {icona:"bilancia", t:"i **criteri** di valutazione della commissione"},
    {icona:"libro", t:"le **tracce** delle prove scritte", key:true}],
  etichette:{titolo:"Bando", sigillo:{t:"Tracce", key:true}}},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"percorso", sopratitolo:"Per chi prepara una selezione",
  titolo:"Una risorsa **preziosa**", punti:[
    {icona:"cartella", t:"bandi **precedenti**"},
    {icona:"occhio", t:"capire che cosa viene **chiesto**", key:true}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 20 · Performance", col:[
  {h:"Piani e relazioni", t:"obiettivi e **risultati**"},
  {h:"Premi", t:"stanziati, distribuiti, **differenziazione**, in forma aggregata", key:true}]},
{id:"s23", tipo:"rete", tema:"chiaro", sopratitolo:"Art. 22 · Enti controllati",
  centro:"Azienda", dcentro:"elenco annuale", nodi:[
  {t:"Enti vigilati", icona:"occhio"}, {t:"Società partecipate", icona:"euro", key:true},
  {t:"Enti privati controllati", icona:"cartella"}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s24", tipo:"icone", tema:"chiaro", sopratitolo:"E poi", voci:[
  {icona:"documento", t:"**Provvedimenti**"},
  {icona:"cartella",  t:"**Contratti** e gare"},
  {icona:"euro",      t:"**Bilanci**"},
  {icona:"giudice",   t:"**Controlli** e rilievi"}]},
{id:"s25", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 26 · sovvenzioni e contributi",
  valori:[{n:1000, t:"euro: sopra questa soglia la pubblicazione è condizione di efficacia", key:true}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Artt. 33 e 35", col:[
  {h:"Tempi di pagamento", t:"l'indicatore annuale di **tempestività**"},
  {h:"Per ogni procedimento", t:"il titolare del **potere sostitutivo**", key:true}]},
{id:"s27", tipo:"titolo", tema:"profondo",
  titolo:"Ogni voce del menu<br>è un **obbligo di legge**."},

// --- 5 · gli obblighi della sanità
{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Art. 41 · servizio sanitario", sigla:"In più",
  testo:"Tutti gli obblighi, **più alcuni** dedicati alla sanità."},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Primo · art. 41, c. 1-bis",
  titolo:"Tutte le **spese**", punti:[
    {icona:"euro", t:"tutti i **pagamenti** effettuati"},
    {icona:"cartella", t:"per tipo, **periodo** e **beneficiario**", key:true}],
  etichette:{sx:"Spese", dx:"Pagamenti", alto:{t:"Consultabili", key:true}}},
{id:"s30", tipo:"piramide", tema:"chiaro", sopratitolo:"Secondo · art. 41, c. 2 · gli incarichi", strati:[
  {t:"Direttore generale", d:"sanitario, amministrativo"},
  {t:"Responsabili di dipartimento", d:""},
  {t:"Strutture complesse e semplici", d:""}]},
{id:"s31", tipo:"flusso", tema:"chiaro", sopratitolo:"Si pubblica l'intera procedura", passi:[
  {icona:"documento", t:"Bandi", d:"e avvisi di selezione"},
  {icona:"ingranaggio", t:"Svolgimento", d:"della procedura"},
  {icona:"certificato", t:"Atto", d:"di conferimento", key:true}]},
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Terzo · art. 41, c. 4",
  titolo:"Le strutture **accreditate**", punti:[
    {icona:"cartella", t:"elenco aggiornato **ogni anno**"},
    {icona:"documento", t:"con gli **accordi** stipulati", key:true}]},
{id:"s33", tipo:"norma", tema:"chiaro", etichetta:"Art. 41, c. 5", sigla:"Accreditamento",
  testo:"Le Regioni inseriscono gli obblighi di **pubblicità** tra i requisiti."},
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Quarto · art. 41, c. 6",
  titolo:"Liste di **attesa**", punti:[
    {icona:"libro", t:"i **criteri** di formazione"},
    {icona:"orologio", t:"tempi **previsti** e tempi **medi effettivi**", key:true}],
  etichette:{alto:{t:"Per ogni prestazione", key:true}}},
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Art. 41, c. 3 · dirigenza sanitaria",
  titolo:"Anche l'**intramoenia**", punti:[
    {icona:"cuoremano", t:"tra le attività professionali da **pubblicare**"},
    {icona:"ospedale", t:"la libera professione **intramuraria**", key:true}],
  etichette:{titolo:"Attività professionali", sigillo:{t:"Intramoenia", key:true}}},
{id:"s36", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Le liste di attesa sono un'informazione facoltativa",
   ok:"Tempi previsti e tempi medi effettivi sono un obbligo di legge"}]},
{id:"s37", tipo:"titolo", tema:"profondo",
  titolo:"Spese, nomine, accreditati,<br>liste d'attesa: **la sanità in vetrina**."},

// --- 6 · trasparenza e riservatezza
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Art. 7-bis",
  titolo:"Non esporre le **persone**", punti:[
    {icona:"lucchetto", t:"i limiti della **protezione dei dati**", key:true}],
  etichette:{alto:{t:"Privacy", key:true}}},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"I dati personali pubblicati", col:[
  {h:"Per obbligo", t:"indicizzabili e **riutilizzabili**, salvo sensibili e giudiziari"},
  {h:"Senza obbligo", t:"resi **anonimi**", key:true}]},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Nei documenti pubblicati", col:[
  {h:"Resi non intelligibili", t:"dati **non pertinenti**, sensibili o giudiziari **non indispensabili**"},
  {h:"Visibile", t:"solo ciò che serve allo **scopo**", key:true}]},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Art. 7-bis, cc. 5 e 6",
  titolo:"La **salute** resta riservata", punti:[
    {icona:"divieto", t:"mai la natura delle **malattie** che causano assenze", key:true},
    {icona:"cuoremano", t:"fermi i limiti sui **dati sanitari**"}],
  etichette:{alto:{t:"Riservato", key:true}}},
{id:"s42", tipo:"norma", tema:"chiaro", etichetta:"Art. 26, c. 4 · contributi", sigla:"Non identificabili",
  testo:"Se dai dati si ricavano **salute** o **disagio** economico-sociale."},
{id:"s43", tipo:"confronto", tema:"tenue", sopratitolo:"Attenzione alla differenza", col:[
  {h:"Tasso di assenza dell'ufficio", t:"è un **obbligo**", key:true},
  {h:"Malattia di un collega", t:"è **vietato**"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Trasparenza sull'**amministrazione**,<br>rispetto per le **persone**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La trasparenza autorizza a pubblicare i dati sanitari delle persone",
   ok:"Il limite della riservatezza resta sempre"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Una **sezione**, una **mappa**,<br>obblighi precisi,<br>un confine con la **privacy**.",
  sotto:"Prossima lezione: l'accesso civico semplice."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 6.3", sottotitolo:"Accesso civico<br>semplice", ente:ENTE},
];
