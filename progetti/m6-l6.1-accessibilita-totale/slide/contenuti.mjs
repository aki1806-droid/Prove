// Contenuto delle 49 scene della lezione 6.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6. Dall'accesso difensivo all'accessibilità
// totale: L. 241/1990 artt. 22, 24 c. 3; L. 190/2012; D.Lgs. 33/2013 artt. 1, 2, 2-bis, 3, 5 c. 11, 7, 41;
// D.Lgs. 97/2016.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "La 241 esclude il **controllo generalizzato**; il D.Lgs. **33/2013** definisce la trasparenza come **accessibilità totale**",
  "Due strumenti: **pubblicazione** sui siti e **accesso civico**; vale per tutte le PA, **aziende sanitarie** comprese",
  "Nasce dalla legge anticorruzione **190/2012**; nel **2016** il D.Lgs. 97 introduce il **FOIA**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Trasparenza nella pubblica amministrazione",
  titolo:"Dall'accesso difensivo<br>all'accessibilità totale", sottotitolo:"Lezione 6.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Una domanda da cittadino",
  titolo:"Puoi **saperlo**?", punti:[
    {icona:"euro", t:"quanto si spende per le **consulenze**"},
    {icona:"persona", t:"come sono stati scelti i **direttori**"},
    {icona:"spunta", t:"oggi **sì**, anche senza un interesse personale", key:true}],
  etichette:{titolo:{t:"Senza interesse personale", key:true}}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"vetro", sopratitolo:"Fino al 2013, di regola, serviva un interesse diretto",
  titolo:"Una casa di **vetro**", punti:[
    {icona:"occhio", t:"l'amministrazione si deve **vedere**", key:true},
    {icona:"documento", t:"carte e persone, **dentro** e fuori"}],
  etichette:{alto:{t:"Trasparenza", key:true}, dx:"Controllo"}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Dalla carta che serve **a me**,<br>alla carta che è **di tutti**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"lucchetto", t:"Il limite", d:"della 241"},
  {icona:"occhio", t:"Accessibilità totale", d:"D.Lgs. 33/2013"},
  {icona:"documento", t:"Due strumenti", d:"e chi li rispetta"},
  {icona:"scudo", t:"Anticorruzione", key:true}]},

// --- 3 · il limite dell'accesso difensivo
{id:"s06", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"L'accesso della 241 richiede un interesse", box:[
  {n:"1", t:"Diretto", d:"personale"},
  {n:"2", t:"Concreto", d:"reale, non ipotetico"},
  {n:"3", t:"Attuale", d:"e giuridicamente tutelato"}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"L. 241/1990, art. 24, c. 3", col:[
  {h:"Ammesso", t:"l'accesso per tutelare una **posizione**"},
  {h:"Non ammesso", t:"il **controllo generalizzato** sull'operato della PA", key:true}]},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Un accesso difensivo",
  titolo:"Protegge il **singolo**", punti:[
    {icona:"persona", t:"chi deve tutelare una **propria posizione**", key:true},
    {icona:"divieto", t:"non chi vuole **controllare** l'uso delle risorse"}],
  etichette:{alto:{t:"Difesa", key:true}}},
{id:"s09", tipo:"assetempo", tema:"chiaro", sopratitolo:"Due leggi, due epoche",
  da:1985, a:2020, decenni:[1990,2000,2010], tappe:[
  {anno:1990, et:"L. 241 — il cittadino nel procedimento"},
  {anno:2013, et:"D.Lgs. 33 — la trasparenza", key:true},
  {anno:2016, et:"D.Lgs. 97 — il FOIA"}]},
{id:"s10", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: un'associazione di cittadini", passi:[
  {icona:"persone", t:"Vuole capire", d:"quanto costa un servizio"},
  {icona:"lucchetto", t:"Con la sola 241", d:"nessun interesse qualificato"},
  {icona:"divieto", t:"Richiesta", d:"non ammissibile", key:true}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Anche quando l'accesso è ammesso",
  titolo:"Solo ciò che **serve**", punti:[
    {icona:"documento", t:"i documenti legati a **quella posizione**"},
    {icona:"divieto", t:"chi guarda da fuori, **resta fuori**", key:true}],
  etichette:{alto:{t:"Accesso limitato", key:true}}},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"La legge 241 consente un controllo diffuso sull'amministrazione",
   ok:"Lo esclude espressamente: art. 24, comma 3"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Un accesso per **difendersi**,<br>non per **controllare**."},

// --- 4 · l'accessibilità totale
{id:"s14", tipo:"flusso", tema:"chiaro", sopratitolo:"La svolta", passi:[
  {icona:"scudo", t:"L. 190/2012", d:"legge anticorruzione"},
  {icona:"libro", t:"Delega", d:"riordino degli obblighi"},
  {icona:"documento", t:"D.Lgs. 33/2013", d:"testo unico trasparenza", key:true}]},
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 33/2013, art. 1", sigla:"Trasparenza",
  testo:"È **accessibilità totale** dei dati e dei documenti detenuti dalle pubbliche amministrazioni."},
{id:"s16", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Tre scopi", box:[
  {n:"1", t:"Tutelare", d:"i diritti dei cittadini"},
  {n:"2", t:"Partecipare", d:"all'attività amministrativa"},
  {n:"3", t:"Controllare", d:"funzioni e uso delle risorse pubbliche"}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"porta", sopratitolo:"La parola chiave",
  titolo:"**Chiunque**", punti:[
    {icona:"persone", t:"non serve dimostrare un **interesse**", key:true},
    {icona:"spunta", t:"un diritto di **tutti**"}],
  etichette:{alto:{t:"Chiunque", key:true}, sx:"Cittadino", dx:"Associazione"}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Concorre ad attuare", col:[
  {h:"Il principio democratico", t:"un'amministrazione che **rende conto**"},
  {h:"Imparzialità e buon andamento", t:"i principi dell'**art. 97** della Costituzione"}]},
{id:"s19", tipo:"ciclo", tema:"chiaro", sopratitolo:"L'amministrazione aperta",
  centro:"Aperta", dcentro:"al servizio del cittadino", fasi:[
  {icona:"documento", t:"Rende conto"},
  {icona:"cartella", t:"Apre i dati"},
  {icona:"persone", t:"Fa partecipare"},
  {icona:"occhio", t:"Si lascia controllare", key:true}]},
{id:"s20", tipo:"norma", tema:"chiaro", etichetta:"Art. 1, c. 3 · art. 117 Cost.", sigla:"Livello essenziale",
  testo:"La trasparenza vale in modo **uniforme** in tutto il paese."},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"Non è assoluta: restano fermi", voci:[
  {icona:"sigillo",   t:"Segreto di **Stato**"},
  {icona:"lucchetto", t:"Segreto d'**ufficio**"},
  {icona:"cartella",  t:"Segreto **statistico**"},
  {icona:"persona",   t:"Protezione dei **dati personali**"}]},
{id:"s22", tipo:"sigla", tema:"chiaro", sopratitolo:"D.Lgs. 97/2016 · nasce l'accesso civico generalizzato", lettere:[
  {l:"F", p:"Freedom"}, {l:"O", p:"of"}, {l:"I", p:"Information", key:true}, {l:"A", p:"Act"}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Trasparenza significa che tutto si pubblica",
   ok:"La legge fissa dei limiti, a partire dai dati personali"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Accessibilità **totale**,<br>dentro limiti **precisi**."},

// --- 5 · due strumenti, molte amministrazioni
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 2 · la libertà di accesso di chiunque", col:[
  {h:"Pubblicazione", t:"sui **siti istituzionali**", grande:true},
  {h:"Accesso civico", t:"su **richiesta**", grande:true}]},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Pubblicare significa",
  titolo:"Consultabile da **chiunque**", punti:[
    {icona:"occhio", t:"direttamente, **senza autenticazione**", key:true},
    {icona:"persona", t:"e senza **identificarsi**"}],
  etichette:{barra:"Sito istituzionale", menu:{t:"Amministrazione trasparente", key:true}}},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"I due strumenti si completano", col:[
  {h:"Obbligatorio", t:"deve stare **sul sito**"},
  {h:"Tutto il resto", t:"si può chiedere con l'**accesso civico**"}]},
{id:"s28", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Artt. 3 e 7 · ciò che è pubblico si può", box:[
  {n:"1", t:"Conoscere", d:"da chiunque"},
  {n:"2", t:"Usare", d:"gratuitamente"},
  {n:"3", t:"Riutilizzare", d:"citando la fonte"}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Il formato aperto", col:[
  {h:"Per chi legge", t:"consultabili sullo **schermo**"},
  {h:"Per i programmi", t:"**riutilizzabili** anche in automatico", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Art. 2-bis · chi deve rispettarlo",
  titolo:"Le pubbliche **amministrazioni**", punti:[
    {icona:"libro", t:"quelle del **D.Lgs. 165/2001**"},
    {icona:"ospedale", t:"comprese **aziende ed enti** del SSN", key:true}]},
{id:"s31", tipo:"norma", tema:"chiaro", etichetta:"Art. 41, c. 1", sigla:"SSN",
  testo:"Aziende sanitarie, ospedaliere ed enti del servizio sanitario: **tutti** gli obblighi di pubblicazione."},
{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"In quanto compatibile, anche", voci:[
  {icona:"ingranaggio", t:"Enti pubblici **economici**"},
  {icona:"certificato", t:"Ordini **professionali**"},
  {icona:"euro",        t:"Società in **controllo pubblico**"},
  {icona:"persone",     t:"Alcuni enti **privati** finanziati"}]},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 5, c. 11 · i due sistemi convivono", col:[
  {h:"Accesso documentale · L. 241", t:"per gli **interessati**"},
  {h:"Accesso civico · D.Lgs. 33", t:"per **chiunque**", key:true}]},
{id:"s34", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"L'accesso civico ha sostituito l'accesso documentale",
   ok:"Sono strumenti diversi, con scopi diversi: restano entrambi"}]},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"**Pubblicare** e **rispondere**:<br>due strade verso la stessa casa di vetro."},

// --- 6 · trasparenza e anticorruzione
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"vetro", sopratitolo:"Perché nella legge anticorruzione",
  titolo:"Ciò che è **visibile**", punti:[
    {icona:"occhio", t:"è più difficile da piegare a **interessi privati**", key:true}],
  etichette:{alto:{t:"Visibile", key:true}}},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:4, spunta:true, sopratitolo:"Se sono pubblici, chiunque nota un'anomalia", celle:[
  {t:"**Incarichi**"}, {t:"**Compensi**"}, {t:"**Contratti**"}, {t:"**Pagamenti**"}]},
{id:"s38", tipo:"sigla", tema:"chiaro", sopratitolo:"Di regola, una sola figura", lettere:[
  {l:"R", p:"Responsabile"}, {l:"P", p:"Prevenzione"}, {l:"C", p:"Corruzione"}, {l:"T", p:"Trasparenza", key:true}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Per chi lavora in azienda sanitaria",
  titolo:"I **tuoi** dati", punti:[
    {icona:"cartella", t:"possono finire in **Amministrazione trasparente**"},
    {icona:"spunta", t:"completi, **corretti**, aggiornati", key:true}],
  etichette:{cassetto:{t:"Dati dell'ufficio", key:true}}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Un esempio in sanità",
  titolo:"Come si sceglie un **direttore**", punti:[
    {icona:"persona", t:"**DG**, direttore sanitario e amministrativo"},
    {icona:"ospedale", t:"incarichi di **struttura**"},
    {icona:"occhio", t:"procedure **pubbliche**", key:true}],
  etichette:{top:{t:"Direzione", key:true}, basso:"Strutture"}},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Art. 41, c. 1-bis",
  titolo:"Spese e **pagamenti**", punti:[
    {icona:"euro", t:"**tutti** i pagamenti effettuati"},
    {icona:"cartella", t:"per tipo di lavoro, **bene** o **servizio**", key:true}],
  etichette:{sx:"Spese", dx:"Pagamenti", alto:{t:"Pubblici", key:true}}},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La trasparenza è solo un adempimento informatico",
   ok:"È legata alla responsabilità dei dirigenti e alla performance"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Ciò che si **vede**,<br>chiunque lo può **controllare**."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Accessibilità totale vuol dire assenza di limiti",
   ok:"Restano i segreti e la protezione dei dati personali"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Da un accesso per **difendersi**<br>a una casa di vetro **aperta a tutti**.",
  sotto:"Prossima lezione: la sezione Amministrazione trasparente."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 6.2", sottotitolo:"Amministrazione<br>trasparente", ente:ENTE},
];
