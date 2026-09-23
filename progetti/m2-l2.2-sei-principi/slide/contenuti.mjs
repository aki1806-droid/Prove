// Contenuto delle 49 scene della lezione 2.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 2. I sei principi
// ispiratori della L.R. Veneto 19/2016, agganciati agli articoli: 14 (criteri e
// soglie), 15 (finalità della riorganizzazione), 16 (Osservatorio), 26 (distretto
// e Comitato dei Sindaci), 28 (liste d'attesa).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const PRINCIPI = [
 {icona:"cartella",    t:"**Ambiti ottimali**"},
 {icona:"ospedale",    t:"**Territorio**"},
 {icona:"cuoremano",   t:"**Integrazione**"},
 {icona:"persone",     t:"**Medicina generale**"},
 {icona:"ingranaggio", t:"**Innovazione**"},
 {icona:"chat",        t:"**Partecipazione**"},
];

const ULSS_PROV = {
 colonne:["30%","70%"],
 intestazioni:["Provincia", "Aziende ULSS"],
 righe:[
  ["Belluno",  "1 Dolomiti"],
  ["Treviso",  "2 Marca trevigiana"],
  ["Venezia",  "3 Serenissima · 4 Veneto Orientale"],
  ["Rovigo",   "5 Polesana"],
  ["Padova",   "6 Euganea"],
  ["Vicenza",  "7 Pedemontana · 8 Berica"],
  ["Verona",   "9 Scaligera"],
 ],
};

const TRE_COSE = [
 "La cornice: **equità e universalità**, prestazioni appropriate e **uniformi** in tutta la Regione",
 "**Art. 14**: i criteri della riorganizzazione · **art. 15**: le finalità per i servizi",
 "Le soglie: ospedali di comunità **+15%** entro il 2017 · MGI **60%** entro il 2017, **80%** entro il 2018",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Il sistema sanitario regionale del Veneto",
  titolo:"I sei principi<br>ispiratori", sottotitolo:"Lezione 2.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Dalla lezione 2.1", col:[
  {h:"Ieri", t:"i **quattro nodi**: il problema", grande:true},
  {h:"Oggi", t:"i **sei principi**: le idee per scioglierli", grande:true}]},
{id:"s03", tipo:"catena", tema:"chiaro", sopratitolo:"Dove stanno scritti", passi:[
  {t:"Nessun elenco numerato", d:"nella legge non c'è"},
  {t:"Criteri dell'art. 14"}, {t:"Finalità dell'art. 15"},
  {t:"Il corso li mette in fila", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"La cornice:<br>**equità e universalità**.",
  sotto:"Art. 14 · prestazioni appropriate e uniformi."},

// --- 2 · rotta
{id:"s05", tipo:"icone", tema:"chiaro", sopratitolo:"I sei principi", voci:PRINCIPI},

// --- 3 · ambiti ottimali
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Primo principio · art. 14, criterio b)", sigla:"Ambiti ottimali",
  testo:"Le **dimensioni ottimali** delle ULSS: qualità, efficienza, meno costi."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Ottimale vuol dire", col:[
  {h:"Abbastanza grande", t:"volumi, competenze, **forza negli acquisti**"},
  {h:"Abbastanza vicino", t:"**conoscere** il proprio territorio"}]},
{id:"s08", tipo:"tabella", tema:"chiaro", sopratitolo:"Una scelta in gran parte provinciale", ...ULSS_PROV, chiave:[0,1,3,4,6]},
{id:"s09", tipo:"tabella", tema:"chiaro", sopratitolo:"Due eccezioni: Venezia e Vicenza", ...ULSS_PROV, chiave:[2,5]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Nove aziende, nove nomi", celle:[
  {n:"1", t:"Dolomiti"}, {n:"2", t:"Marca trevigiana"}, {n:"3", t:"Serenissima"},
  {n:"4", t:"Veneto Orientale"}, {n:"5", t:"Polesana"}, {n:"6", t:"Euganea"},
  {n:"7", t:"Pedemontana"}, {n:"8", t:"Berica"}, {n:"9", t:"Scaligera"}]},
{id:"s11", tipo:"barre", tema:"chiaro", sopratitolo:"Abitanti per azienda, in media",
  unita:"", max:600, barre:[
  {et:"Media italiana", v:502, lab:"circa 502.000"},
  {et:"ULSS del Veneto", v:545, lab:"circa 545.000", colore:"#D70328"}]},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Ambiti più grandi vuol dire servizi più lontani",
   ok:"La legge chiede una rete capillare di sportelli e servizi"}]},

// --- 4 · territorio
{id:"s13", tipo:"icone", tema:"chiaro", attive:[1], sopratitolo:"Secondo principio · art. 15", voci:PRINCIPI},
{id:"s14", tipo:"catena", tema:"chiaro", sopratitolo:"Continuità delle cure: nessun passaggio da capo", passi:[
  {t:"Ospedale → casa"}, {t:"Medico di famiglia → specialista"},
  {t:"Fase acuta → riabilitazione", key:true}]},
{id:"s15", tipo:"scala", tema:"chiaro", sopratitolo:"Le strutture intermedie", gradini:[
  {t:"Casa"},
  {t:"Ospedale di comunità", d:"ricovero breve, a bassa intensità", key:true},
  {t:"Ospedale", d:"la fase acuta"}]},
{id:"s16", tipo:"numero", tema:"chiaro", sopratitolo:"Art. 14, comma 5 · entro il 31/12/2017",
  cifra:"+15%", testo:"posti letto negli **ospedali di comunità**"},
{id:"s17", tipo:"frase", tema:"chiaro", sopratitolo:"E l'ospedale cambia ruolo",
  testo:"Un'offerta ospedaliera in **rete coordinata**.",
  sotto:"Lo vedremo nella lezione 2.5: hub and spoke."},
{id:"s18", tipo:"titolo", tema:"profondo",
  titolo:"Curare **vicino a casa**<br>tutto quello che non ha<br>bisogno dell'ospedale."},

// --- 5 · integrazione
{id:"s19", tipo:"icone", tema:"chiaro", attive:[2], sopratitolo:"Terzo principio · art. 15, lettera i)", voci:PRINCIPI},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Integrazione, due significati", col:[
  {h:"Ospedale e territorio", t:"passare dall'uno all'altro **senza buchi**", grande:true},
  {h:"Sanitario e sociale", t:"**un solo percorso** per la persona", grande:true}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Le aree dell'integrazione", celle:[
  {t:"Famiglia e infanzia"}, {t:"Adolescenza e giovani"}, {t:"Anziani"},
  {t:"Disabili"}, {t:"Dipendenze"}, {t:"Salute mentale"},
  {t:"Sanità penitenziaria"}]},
{id:"s22", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Art. 26 · il nome dice la funzione",
  da:{h:"Prima", t:"direttore dei servizi sociali e della funzione territoriale"},
  a:{h:"Oggi", t:"direttore dei **servizi socio-sanitari**"}},
{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"In ogni distretto, unità operative per", celle:[
  {t:"**cure primarie**"}, {t:"infanzia, adolescenza, famiglia e **consultori**"},
  {t:"**disabilità** e non autosufficienza"}, {t:"**cure palliative**"},
  {t:"attività **specialistica**"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"La persona al centro,<br>e i servizi **intorno a lei**."},

// --- 6 · medicina generale
{id:"s25", tipo:"icone", tema:"chiaro", attive:[3], sopratitolo:"Quarto principio", voci:PRINCIPI},
{id:"s26", tipo:"norma", tema:"chiaro", etichetta:"La risposta del Veneto", sigla:"MGI",
  testo:"**Medicina di gruppo integrata**: più medici di famiglia nella stessa sede, con infermieri e segreteria."},
{id:"s27", tipo:"barre", tema:"chiaro", sopratitolo:"Medici di famiglia in MGI · art. 14, comma 5",
  unita:"%", max:100, barre:[
  {et:"Entro il 31/12/2017", v:60, lab:"almeno 60%"},
  {et:"Entro il 31/12/2018", v:80, lab:"almeno 80%", colore:"#D70328"}]},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Il Comitato dei Sindaci e le MGI · art. 26", col:[
  {h:"Esprime parere", t:"sull'**attivazione** delle medicine di gruppo integrate"},
  {h:"Collabora", t:"anche mettendo a disposizione **le sedi**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Anche nella prevenzione · art. 15, lettera g)", celle:[
  {t:"**Dipartimenti** di Prevenzione"}, {t:"**Distretti**"},
  {t:"**Medici** di famiglia"}, {t:"**Pediatri** di libera scelta"}]},
{id:"s30", tipo:"titolo", tema:"profondo",
  titolo:"Il medico di famiglia:<br>non da solo,<br>**dentro una squadra**."},

// --- 7 · innovazione
{id:"s31", tipo:"icone", tema:"chiaro", attive:[4], sopratitolo:"Quinto principio", voci:PRINCIPI},
{id:"s32", tipo:"norma", tema:"chiaro", etichetta:"Art. 2 · entro un anno, ad Azienda Zero", sigla:"FSE",
  testo:"Il **fascicolo sanitario elettronico**, e la tessera sanitaria elettronica per tutti i veneti."},
{id:"s33", tipo:"catena", tema:"chiaro", sopratitolo:"Il fascicolo vale anche per il privato", passi:[
  {t:"Enti privati convenzionati", d:"obbligo di partecipare"},
  {t:"Anche ai fini dell'accreditamento"},
  {t:"Una sola rete regionale", key:true}]},
{id:"s34", tipo:"norma", tema:"chiaro", etichetta:"Health Technology Assessment", sigla:"HTA",
  testo:"Nuove tecnologie e investimenti passano dal parere della **CRITE**."},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Verso il cittadino · art. 28", celle:[
  {t:"**CUP** on line"}, {t:"promemoria **automatico**"},
  {t:"disdetta a **qualunque ora**"}, {t:"ticket con lo **smartphone**"}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"L'innovazione organizzativa", celle:[
  {t:"sistemi informativi **unici**"}, {t:"flussi di dati **omogenei**"},
  {t:"**reti cliniche**"}, {t:"ricerca, sperimentazione, **servizi**"}]},
{id:"s37", tipo:"titolo", tema:"profondo",
  titolo:"Dati e tecnologie comuni,<br>governati **una volta sola**."},

// --- 8 · partecipazione
{id:"s38", tipo:"icone", tema:"chiaro", attive:[5], sopratitolo:"Sesto principio · art. 14, criterio c)", voci:PRINCIPI},
{id:"s39", tipo:"frase", tema:"chiaro", sopratitolo:"Art. 14, criterio f)",
  testo:"Le **prerogative degli enti locali** nella programmazione.",
  sotto:"I Comuni non sono spettatori della sanità."},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Due strumenti", col:[
  {h:"In ogni ULSS", t:"la **Conferenza dei Sindaci**"},
  {h:"In ogni distretto", t:"il **Comitato dei Sindaci**: Piano di Zona e bilancio della parte sociale"}]},
{id:"s41", tipo:"numero", tema:"chiaro", sopratitolo:"Art. 16 · l'Osservatorio regionale",
  cifra:"2/3", testo:"della popolazione: le **richieste dei Comitati dei Sindaci** che la rappresentano"},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il Piano di Zona lo approva la Regione",
   ok:"Lo elabora e lo approva il Comitato dei Sindaci del distretto"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Le scelte sulla salute<br>si fanno con chi<br>**amministra il territorio**."},

// --- 9 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Una ULSS per ogni provincia",
   ok:"Venezia e Vicenza hanno due ULSS ciascuna"}]},

// --- 10 · chiusura
{id:"s48", tipo:"icone", tema:"chiaro", sopratitolo:"I sei principi, insieme", voci:PRINCIPI},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 2.3", sottotitolo:"Azienda Zero<br>e la governance regionale", ente:ENTE},
];
