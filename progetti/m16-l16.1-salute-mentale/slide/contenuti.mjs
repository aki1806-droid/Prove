// Contenuto delle 48 scene della lezione 16.1. *accento*  **accento in semibold**
//
// Registro: fermo nel correggere i pregiudizi, mai moralistico. Nessuna
// drammatizzazione, nessun linguaggio pietistico. E sempre "persona con
// disturbo psichico": non c'e' una sola slide che usi un sostantivo al posto
// della persona, perche' e' esattamente la regola che il capitolo 2 insegna.

// La definizione, smontata nelle sue quattro parti: e' una definizione
// positiva, e un elenco di quattro voci lo fa vedere meglio di una frase.
const DEFINIZIONE = [
 {icona:"persona",     t:"Riconosce le proprie **capacità**"},
 {icona:"scudo",       t:"Affronta le **difficoltà** della vita"},
 {icona:"ingranaggio", t:"Lavora in modo **produttivo**"},
 {icona:"persone",     t:"Contribuisce alla propria **comunità**"},
];

// Il visual chiave della lezione. La separazione e' netta perche' la tabella
// ha una colonna per ciascun regime: il segno (× / ✓) porta il giudizio
// insieme alla parola, mai il colore da solo.
const PRIMA_DOPO = {
 colonne:["22%","39%","39%"],
 intestazioni:["", "Prima della 180", "Dopo la 180"],
 righe:[
  ["Dove",        "no:internamento in ospedale psichiatrico", "si:cura nei servizi territoriali"],
  ["Su che cosa<br>si fonda", "no:pericolosità e pubblico scandalo", "si:consenso, come per ogni condizione di salute"],
  ["Diritti civili", "no:perduti",                 "si:piena titolarità"],
  ["La persona è", "no:oggetto di custodia",       "si:soggetto di cura"],
 ],
};

const CONDIZIONI = [
 {t:"Esistono **alterazioni psichiche** tali da richiedere urgenti interventi terapeutici"},
 {t:"Gli interventi **non sono accettati** dalla persona"},
 {t:"**Non** è possibile adottare tempestive misure **extraospedaliere**"},
];

// Le tre sigle che i quiz scambiano. Il CSM e' marcato perche' e' il perno:
// e' l'unica delle tre che la lezione chiama cosi'.
const SIGLE = [
 {icona:"ingranaggio", t:"**DSM**", d:"Dipartimento di Salute Mentale — coordina tutti i servizi dell'azienda"},
 {icona:"cuoremano",   t:"**CSM**", d:"Centro di Salute Mentale — il servizio territoriale, il perno del sistema", key:true},
 {icona:"ospedale",    t:"**SPDC**", d:"Servizio Psichiatrico di Diagnosi e Cura — la fase acuta, posti letto limitati per legge"},
];

const FORME = [
 {n:"1", t:"Stigma sociale",       d:"i pregiudizi diffusi: pericolosità, imprevedibilità, inguaribilità"},
 {n:"2", t:"Autostigma",           d:"la persona interiorizza il pregiudizio: si ritira, si vergogna, rinuncia"},
 {n:"3", t:"Stigma istituzionale", d:"pratiche organizzative che trattano diversamente chi ha una diagnosi"},
];

const EFFETTI = [
 {t:"Ritardo nella **richiesta di aiuto**"},
 {t:"**Abbandono** dei percorsi di cura"},
 {t:"**Isolamento** sociale"},
 {t:"Difficoltà **lavorative e abitative**"},
];

const AMBITI = [
 {t:"SPDC"}, {t:"Strutture residenziali"}, {t:"Centri diurni"},
 {t:"Servizi territoriali"}, {t:"Domicilio"},
];

const OSSERVARE = [
 {t:"Comportamento"}, {t:"Ritmo **sonno-veglia**"},
 {t:"Alimentazione"}, {t:"Le **variazioni**"},
];

const NON_COMPETE = [
 {t:"Interpretare i **contenuti del pensiero**"},
 {t:"Gestire **autonomamente** la terapia"},
 {t:"Decidere **misure restrittive**"},
 {t:"Sostituirsi al **colloquio clinico**"},
];

const RIEPILOGO = [
 {t:"La salute mentale **non è assenza di disturbo** — e riguarda tutti"},
 {t:"Il disturbo è una **condizione**, non un tratto: non si *è*, si *ha*"},
 {t:"**L. 180/1978** — superamento manicomiale, cittadino con diritti, confluita nella **833**"},
 {t:"**TSO: le tre condizioni insieme**"},
 {t:"Proposta → convalida → **Sindaco** → **giudice tutelare**"},
 {t:"Non è ordine pubblico: si fonda sulla **necessità di cura**"},
 {t:"**DSM** coordina · **CSM** territorio · **SPDC** ospedale"},
 {t:"Stigma **sociale · auto · istituzionale** — e *diagnostic overshadowing*"},
];


export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 16 · Salute mentale, dipendenze e disagio psichico",
  titolo:"Concetti, stigma<br>e riferimenti normativi", sottotitolo:"Lezione 16.1",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Modulo 16 · lezione 1 di 3",
  testo:"Il primo di tre moduli di **approfondimento**.",
  sotto:"Un'area in cui molti OSS lavorano, e su cui il corso finora si era solo affacciato."},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Si parte dalla definizione",
  testo:"La salute mentale **non è l'assenza di disturbo**.",
  sotto:"È una condizione di *benessere*. La definizione è già una correzione di prospettiva."},
{id:"s04", tipo:"icone", tema:"chiaro", sopratitolo:"Una condizione di benessere in cui la persona",
  voci:DEFINIZIONE},

{id:"s05", tipo:"confronto", tema:"chiaro", sopratitolo:"La prima conseguenza", col:[
  {h:"Si può", t:"avere un **disturbo psichico** ed essere in una condizione di **benessere**"},
  {h:"Così come si può", t:"**stare male** senza avere alcuna **diagnosi**"}],
  sotto:"Riguarda tutti, non solo chi ha una diagnosi."},
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"La seconda conseguenza",
  testo:"Il disturbo psichico è una **condizione di salute**, non un **tratto della persona**.",
  sotto:"Ed è la fonte di molti fraintendimenti."},
// La sostituzione mette le due formule una accanto all'altra invece di
// spiegare la differenza: e' il tipo di correzione che si vede, non si ascolta.
{id:"s07", tipo:"sostituzione", tema:"profondo",
  da:{h:"Non si dice", t:"«è schizofrenico»"},
  a:{h:"Si dice", t:"«ha una diagnosi di schizofrenia»"},
  sotto:"Il linguaggio costruisce lo sguardo, e lo sguardo determina come si assiste."},

{id:"s08", tipo:"norma", tema:"chiaro", etichetta:"Legge", sigla:"180/1978",
  testo:"La persona con disturbo psichico è un **cittadino con diritti**."},
{id:"s09", tipo:"tabella", tema:"chiaro", sopratitolo:"La legge Basaglia — che cosa cambia",
  ...PRIMA_DOPO, chiave:[]},
{id:"s10", tipo:"tabella", tema:"chiaro", sopratitolo:"La legge Basaglia — che cosa cambia",
  ...PRIMA_DOPO, chiave:[3]},
{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Dove è finita la 180",
  testo:"Confluita nella **legge 833**, quella che istituisce il **Servizio Sanitario Nazionale**.",
  sotto:"Se di questo modulo ti chiedono una data sola, è il **1978**."},

{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"Il trattamento sanitario<br>è di norma **volontario**.",
  sotto:"Il TSO è l'eccezione, ed è disciplinato per legge."},
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Lo hai già incontrato nella lezione 12.1",
  testo:"Qui lo vediamo **nel dettaglio**.",
  sotto:"È la domanda più probabile dell'intero modulo."},

{id:"s14", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1],
  sopratitolo:"Le tre condizioni del TSO", voci:CONDIZIONI},
{id:"s15", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1,2],
  sopratitolo:"Le tre condizioni del TSO", voci:CONDIZIONI},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"Le tre condizioni devono<br>ricorrere **insieme**.",
  sotto:"Non basta il rifiuto delle cure. Non basta l'urgenza. Servono tutte e tre."},

{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"La procedura, in quest'ordine", passi:[
  {t:"Proposta", d:"di un medico"},
  {t:"Convalida", d:"di un secondo medico della struttura pubblica"},
  {t:"Ordinanza", d:"del Sindaco"},
  {t:"Comunicazione", d:"al giudice tutelare", key:true}]},
{id:"s18", tipo:"icone", tema:"chiaro", sopratitolo:"L'ordine dice chi decide che cosa", voci:[
  {icona:"persone",     t:"Due medici", d:"sulla necessità di cura"},
  {icona:"certificato", t:"Il Sindaco", d:"come autorità sanitaria locale"},
  {icona:"giudice",     t:"Il giudice tutelare", d:"a garanzia della persona"}]},

{id:"s19", tipo:"frase", tema:"tenue", sopratitolo:"Un fraintendimento diffuso anche tra gli operatori",
  testo:"Il TSO **non è una misura di ordine pubblico**."},
{id:"s20", tipo:"titolo", tema:"profondo",
  titolo:"Non si fonda sulla pericolosità.<br>Si fonda sulla **necessità di cura**.",
  sotto:"È il lascito della legge 180."},

{id:"s21", tipo:"icone", tema:"chiaro", attive:[0],
  sopratitolo:"Tre sigle da non confondere", voci:SIGLE},
{id:"s22", tipo:"icone", tema:"chiaro", attive:[0,1],
  sopratitolo:"Tre sigle da non confondere", voci:SIGLE},
{id:"s23", tipo:"icone", tema:"chiaro", attive:[0,1,2],
  sopratitolo:"Tre sigle da non confondere", voci:SIGLE},
// L'albero e' in HTML e non in SVG: i riquadri crescono col contenuto, e qui
// le didascalie dei rami hanno lunghezze molto diverse fra loro.
{id:"s24", tipo:"albero", tema:"chiaro", sopratitolo:"La rete dei servizi",
  radice:"**DSM** — coordina tutti i servizi dell'azienda", rami:[
  {cond:"territorio",  esito:"**CSM**<br>accoglienza, presa in carico, cura, domiciliarità", key:true},
  {cond:"fase acuta",  esito:"**SPDC**<br>ricovero ospedaliero"},
  {cond:"di giorno",   esito:"**Centro diurno**<br>attività riabilitative e risocializzanti"},
  {cond:"residenza",   esito:"**Strutture residenziali**<br>comunità terapeutiche, gruppi appartamento"}]},

// I servizi sono graduali: la scala li mette in ordine di intensita'
// assistenziale, che e' il modo in cui la persona si muove fra i livelli.
{id:"s25", tipo:"scala", tema:"chiaro", sopratitolo:"Graduali, non alternativi — per intensità assistenziale",
  gradini:[
  {t:"Domicilio e territorio", d:"CSM, domiciliarità"},
  {t:"Centro diurno", d:"riabilitazione e risocializzazione"},
  {t:"Strutture residenziali", d:"a diversa intensità"},
  {t:"SPDC", d:"la fase acuta", key:true}]},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"Il baricentro è il **territorio**,<br>non l'ospedale.",
  sotto:"Lo stesso modello della rete per la non autosufficienza — lezione 13.5."},

{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Lo stigma",
  testo:"Un pregiudizio sociale che attribuisce caratteristiche negative, producendo **esclusione**.",
  sotto:"Si manifesta in tre forme."},
{id:"s28", tipo:"tre", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre forme dello stigma", box:FORME},
{id:"s29", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre forme dello stigma", box:FORME},

{id:"s30", tipo:"titolo", tema:"profondo",
  titolo:"La grande maggioranza<br>delle persone con disturbo psichico<br>**non è violenta**.",
  sotto:"Il pregiudizio più diffuso è quello della pericolosità. È anche il più dannoso."},
{id:"s31", tipo:"sostituzione", tema:"profondo",
  da:{h:"La rappresentazione comune", t:"una persona **pericolosa**"},
  a:{h:"Nei fatti", t:"una probabilità **più alta della media** di ***subire*** violenza"},
  sotto:"È l'esatto contrario."},

{id:"s32", tipo:"griglia", tema:"tenue", colonne:2, spunta:false,
  sopratitolo:"Gli effetti concreti dello stigma", celle:EFFETTI},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"E un effetto che riguarda direttamente il tuo lavoro",
  testo:"Il **peggioramento della salute fisica**."},

{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Un fenomeno documentato",
  testo:"***Diagnostic overshadowing***",
  sotto:"Attribuire **ogni sintomo** alla diagnosi psichiatrica."},
{id:"s35", tipo:"tre", tema:"chiaro", sopratitolo:"Va valutata esattamente come chiunque altro", box:[
  {t:"Riferisce dolore"}, {t:"Non mangia"}, {t:"È confusa"}]},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Attribuire tutto alla diagnosi<br>è un **errore clinico**.",
  sotto:"Può ritardare il riconoscimento di una condizione fisica grave."},

{id:"s37", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Dove lavora l'OSS", celle:AMBITI},
{id:"s38", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Sostegno all'autonomia",
  da:{h:"Non è", t:"fare **al posto di**"},
  a:{h:"È", t:"**accompagnare a fare**"},
  sotto:"Se la persona riesce a vestirsi in dieci minuti, quei dieci minuti *sono* assistenza."},
{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"Gli strumenti", voci:[
  {icona:"cuoremano", t:"Presenza e relazione", d:"in quest'area è lo strumento assistenziale principale", key:true},
  {icona:"orologio",  t:"Routine stabile", d:"il sostegno alla quotidianità"}]},
{id:"s40", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Osservare — e segnalare", celle:OSSERVARE},
{id:"s41", tipo:"elenco", tema:"tenue", vietato:true,
  sopratitolo:"Che cosa non compete all'OSS", voci:NON_COMPETE},

{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"L'assistenza di base non è<br>un contorno della cura:<br>spesso **è la cura**.",
  sotto:"È la sintesi della lezione, e vale la pena tenerla."},
{id:"s43", tipo:"frase", tema:"profondo",
  sopratitolo:"Riprendere a lavarsi, a mangiare con regolarità, a uscire di casa",
  testo:"Non sono **premesse** del percorso terapeutico: ne sono **parte**.",
  sotto:"E sono esattamente il terreno su cui lavora l'OSS."},

{id:"s44", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1],
  sopratitolo:"Riepilogo", celle:RIEPILOGO},
{id:"s45", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3],
  sopratitolo:"Riepilogo", celle:RIEPILOGO},
{id:"s46", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4,5,6],
  sopratitolo:"Riepilogo", celle:RIEPILOGO},
{id:"s47", tipo:"griglia", tema:"chiaro", colonne:2, attive:[0,1,2,3,4,5,6,7],
  sopratitolo:"Riepilogo", celle:RIEPILOGO},

{id:"s48", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"16.2", sottotitolo:"I quadri principali<br>e i segni da riconoscere",
  ente:"CISL FP Padova Rovigo · Concorso OSS Azienda Zero"},
];
