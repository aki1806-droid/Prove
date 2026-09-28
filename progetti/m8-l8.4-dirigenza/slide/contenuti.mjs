// Contenuto delle 48 scene della lezione 8.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 8. La dirigenza:
// D.Lgs. 165/2001 artt. 15, 19, 21, 22, 23, 24, 28, 28-bis; D.Lgs. 502/1992; art. 28 Cost.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Dirigenza dello Stato su **due fasce**; si accede per **concorso** o corso concorso; la dirigenza **SSN** ha regole proprie (D.Lgs. 502)",
  "Qualifica a **tempo indeterminato**, incarico da **3 a 5 anni**, revocabile solo per responsabilità dirigenziale; retribuzione di **posizione** e **risultato**",
  "Responsabilità **civile**, **penale**, **amministrativo contabile**, **disciplinare**; per i dirigenti in più quella **dirigenziale**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Normativa sul pubblico impiego",
  titolo:"La dirigenza", sottotitolo:"Lezione 8.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Un funzionario vince il concorso",
  titolo:"Un nuovo **dirigente**", punti:[
    {icona:"documento", t:"firma il **contratto**"},
    {icona:"cartella", t:"l'ufficio arriva con l'**incarico**"},
    {icona:"scudo", t:"risponde di obiettivi, spesa, **personale**", key:true}],
  etichette:{top:"Nuovo dirigente", basso:{t:"Incarico", key:true}}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"La figura su cui la riforma ha scommesso", col:[
  {h:"Gestisce", t:"con i poteri del **datore di lavoro**"},
  {h:"Rende conto", t:"dei **risultati**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Più **autonomia** nella gestione,<br>più **responsabilità** nei risultati."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"cappello", t:"Fasce e accesso"},
  {icona:"documento", t:"Gli incarichi"},
  {icona:"euro", t:"Il trattamento economico", key:true},
  {icona:"scudo", t:"Le responsabilità"}]},

// --- 3 · fasce e accesso
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"D.Lgs. 165, art. 15 · la dirigenza dello Stato", col:[
  {h:"Prima fascia", t:"gli incarichi **più alti**"},
  {h:"Seconda fascia", t:"la base della **dirigenza**", key:true}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 28 · la seconda fascia", col:[
  {h:"Concorso", t:"per **esami**"},
  {h:"Corso concorso", t:"della **Scuola nazionale** dell'amministrazione", key:true}]},
{id:"s08", tipo:"contatore", tema:"chiaro", sopratitolo:"Per i dipendenti di ruolo con laurea", sep:"·",
  valori:[{n:5, t:"anni di servizio"}, {n:3, t:"con dottorato o specializzazione", key:true}],
  sotto:"In posizioni per cui è richiesta la **laurea**."},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 28-bis · la prima fascia", col:[
  {h:"Metà dei posti", t:"concorso pubblico per **titoli ed esami**", key:true},
  {h:"Il resto", t:"dalla seconda fascia, dopo **5 anni** di incarichi generali"}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"E nella sanità? D.Lgs. 502/1992",
  titolo:"La dirigenza del **SSN**", punti:[
    {icona:"cappello", t:"un **ruolo unico**, accesso per concorso"},
    {icona:"cartella", t:"incarichi di **struttura** e **professionali**", key:true}],
  etichette:{}},
{id:"s11", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio in azienda sanitaria", passi:[
  {icona:"certificato", t:"Concorso"},
  {icona:"cappello", t:"Qualifica", d:"di dirigente"},
  {icona:"cartella", t:"Incarico", d:"ufficio del personale", key:true},
  {icona:"orologio", t:"A tempo", d:"determinato"}]},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Per diventare dirigente c'è un concorso interno riservato",
   ok:"Si accede per concorso pubblico"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Si diventa dirigenti per **concorso**,<br>non per anzianità."},

// --- 4 · gli incarichi
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"La distinzione decisiva", col:[
  {h:"La qualifica", t:"una volta, a **tempo indeterminato**"},
  {h:"L'incarico", t:"sempre **a tempo**", key:true}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Art. 19, c. 1 · come si sceglie", celle:[
  {t:"**Obiettivi** e complessità della struttura"}, {t:"**Attitudini** e capacità"},
  {t:"**Risultati** ottenuti prima"}, {t:"La loro **valutazione**"}]},
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"sito", sopratitolo:"Art. 19, c. 1-bis",
  titolo:"Posti **resi noti**", punti:[
    {icona:"documento", t:"posti disponibili e **criteri** di scelta"},
    {icona:"persone", t:"candidature **valutate**", key:true}],
  etichette:{barra:"Incarichi dirigenziali", menu:{t:"Avviso", key:true}}},
{id:"s17", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 19, c. 2 · quanto dura (anni)",
  max:6, banda:[3,5], inizio:"conferimento", fine:"",
  tappe:[{a:3, v:"3", t:"minimo"}, {a:5, v:"5", t:"**massimo**", key:true}]},
{id:"s18", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 19, c. 6 · incarichi a esterni, per lo Stato", sep:"·",
  valori:[{n:10, t:"% dei posti di prima fascia"}, {n:8, t:"% dei posti di seconda fascia", key:true}],
  sotto:"Persone con **qualità professionali** particolari."},
{id:"s19", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 165, art. 19, c. 4-bis", sigla:"Pari opportunità",
  testo:"I criteri per gli incarichi di livello generale tengono conto delle **pari opportunità**."},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 19, c. 1-ter · la revoca", col:[
  {h:"Si revoca", t:"solo per **responsabilità dirigenziale**, con contestazione", key:true},
  {h:"Non si revoca", t:"per un semplice **cambio di vertice**"}]},
{id:"s21", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 19, c. 8 · l'eccezione (giorni)",
  max:100, banda:[0,90], inizio:"fiducia al governo", fine:"",
  tappe:[{a:90, v:"90", t:"cessano gli incarichi di **vertice**", key:true}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'incarico dirigenziale dura da due a sette anni",
   ok:"Oggi dura da tre a cinque anni"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"La **qualifica** resta,<br>l'**incarico** si guadagna ogni volta."},

// --- 5 · il trattamento economico
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 24 · dai contratti delle aree dirigenziali", col:[
  {h:"Parte fondamentale", t:"uguale per **tutti**"},
  {h:"Parte accessoria", t:"legata a **funzioni** e **risultati**", key:true}]},
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"La parte accessoria",
  titolo:"Posizione e **risultato**", punti:[
    {icona:"cartella", t:"posizione: il **peso** dell'incarico"},
    {icona:"spunta", t:"risultato: gli **obiettivi** raggiunti", key:true}],
  etichette:{alto:{t:"Accessorio", key:true}, sx:"Posizione", dx:"Risultato"}},
{id:"s26", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 24, c. 1-bis · dirigenti dello Stato",
  valori:[{n:30, t:"% minimo della retribuzione legato al risultato", key:true}],
  sotto:"La regola non si applica alla dirigenza del **SSN**."},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 24, c. 1-quater", col:[
  {h:"Senza sistema di valutazione", t:"il risultato **non si paga**", key:true},
  {h:"Perché", t:"senza **misurare**, non si premia"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Art. 24, c. 3",
  titolo:"L'**onnicomprensività**", punti:[
    {icona:"euro", t:"lo stipendio remunera **tutte** le funzioni"},
    {icona:"ospedale", t:"i compensi aggiuntivi vanno all'**amministrazione**", key:true}],
  etichette:{alto:{t:"Tutto compreso", key:true}, sx:"Stipendio", dx:"Incarichi aggiuntivi"}},
{id:"s29", tipo:"contatore", tema:"chiaro", sopratitolo:"Per tutti i dipendenti pubblici",
  valori:[{n:240, t:"mila euro l'anno: il tetto massimo", key:true}],
  sotto:"Fissato dalla **legge**."},
{id:"s30", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"La retribuzione di risultato è uno stipendio fisso",
   ok:"Dipende da obiettivi e valutazione, e può non essere pagata"}]},
{id:"s31", tipo:"titolo", tema:"profondo",
  titolo:"**Posizione** per il peso<br>dell'incarico, **risultato**<br>per quello che si ottiene."},

// --- 6 · le responsabilità
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"La prima: civile",
  titolo:"Costituzione, **art. 28**", punti:[
    {icona:"persona", t:"funzionari e dipendenti rispondono **direttamente**"},
    {icona:"documento", t:"degli **atti** compiuti", key:true}],
  etichette:{alto:{t:"Art. 28 Cost.", key:true}, sx:"Dipendente", dx:"Terzo"}},
{id:"s33", tipo:"flusso", tema:"chiaro", sopratitolo:"L'ente risponde in solido", passi:[
  {icona:"avviso", t:"Danno a un terzo"},
  {icona:"ospedale", t:"L'ente risarcisce"},
  {icona:"persona", t:"Rivalsa", d:"sul dipendente", key:true}]},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La seconda: penale · reati contro la PA", celle:[
  {t:"**Peculato**"}, {t:"**Concussione**"},
  {t:"**Corruzione**"}, {t:"**Falso** in atto pubblico"}]},
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"La terza: amministrativo contabile",
  titolo:"Il danno all'**erario**", punti:[
    {icona:"avviso", t:"con **dolo** o **colpa grave**"},
    {icona:"giudice", t:"davanti alla **Corte dei conti**", key:true}],
  etichette:{alto:{t:"Erario", key:true}}},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Due tipi di danno", col:[
  {h:"Diretto", t:"una **spesa** inutile"},
  {h:"Indiretto", t:"l'ente risarcisce un terzo e poi **chiede indietro**", key:true}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"La quarta: disciplinare",
  titolo:"I **doveri** violati", punti:[
    {icona:"libro", t:"del **contratto** e del codice di comportamento"},
    {icona:"orologio", t:"nella **prossima lezione**", key:true}],
  etichette:{titolo:"Codice disciplinare", sigillo:{t:"Illecito", key:true}}},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"In più per i dirigenti · art. 21",
  titolo:"La responsabilità **dirigenziale**", punti:[
    {icona:"avviso", t:"obiettivi mancati, direttive **non rispettate**"},
    {icona:"divieto", t:"niente **rinnovo** dell'incarico", key:true}],
  etichette:{alto:{t:"Art. 21", key:true}, sx:"Obiettivi", dx:"Direttive"}},
{id:"s39", tipo:"flusso", tema:"chiaro", sopratitolo:"Nei casi più gravi", passi:[
  {icona:"documento", t:"Contestazione"},
  {icona:"persone", t:"Comitato dei garanti", d:"il parere"},
  {icona:"sigillo", t:"Revoca o recesso", key:true}]},
{id:"s40", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 21, c. 1-bis · omessa vigilanza",
  valori:[{n:80, t:"% massimo di riduzione del risultato", key:true}],
  sotto:"Per chi non vigila sugli **standard** del proprio personale."},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'abuso d'ufficio è ancora un reato",
   ok:"Abrogato nel 2024; restano gli altri reati contro la PA"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"**Quattro** responsabilità per tutti,<br>**una in più** per chi dirige."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La responsabilità dirigenziale è una sanzione disciplinare",
   ok:"Riguarda risultati e direttive, e si somma alla disciplinare"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Si entra per **concorso**,<br>si guida per **incarichi** a tempo,<br>si risponde dei **risultati**.",
  sotto:"Prossima lezione: doveri e responsabilità disciplinare."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 8.5", sottotitolo:"Doveri e responsabilità<br>disciplinare", ente:ENTE},
];
