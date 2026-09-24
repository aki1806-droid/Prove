// Contenuto delle 47 scene della lezione 2.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 2. La rete ospedaliera
// hub and spoke: PSSR 2019-2023 (allegato alla L.R. 48/2018), cap. 3.1 — diritto
// di scelta del luogo di cura, luoghi di cura, sistema a rete, Hub and Spoke,
// reti cliniche e reti tempo-dipendenti (DM 70/2015), emergenza-urgenza.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const LIVELLI = [
 {t:"**Hub**", d:"5, bacino di circa 1 milione di abitanti"},
 {t:"**Spoke**", d:"presidi di rete, bacino di circa 200.000"},
 {t:"**Nodi di rete**", d:"e strutture integrative della rete"},
];

const TEMPO = [
 {icona:"avviso",   t:"**Emergenza-urgenza**"},
 {icona:"cuoremano", t:"**Emergenze cardiologiche**"},
 {icona:"ospedale", t:"**Trauma**"},
 {icona:"orologio", t:"**Ictus**"},
];

const RISPOSTE = [
 {icona:"avviso",    t:"**Suem 118**", d:"porta il paziente nel luogo giusto"},
 {icona:"scudo",     t:"**Territori difficili**", d:"montagna, laguna, Polesine"},
 {icona:"chat",      t:"**Consulenza a distanza**", d:"la rete si muove al posto del paziente"},
 {icona:"persona",   t:"**Ritorno vicino a casa**", d:"dopo la fase acuta"},
];

const TRE_COSE = [
 "**Prossimità** per la media e bassa complessità · **centralizzazione** per l'alta complessità",
 "**5 hub** da circa 1 milione di abitanti (eccellenza: **Padova** e **Verona**; oncologia: **IOV**) · **spoke** da circa 200.000",
 "Reti **tempo-dipendenti**: emergenza-urgenza, emergenze cardiologiche, trauma, ictus",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Il sistema sanitario regionale del Veneto",
  titolo:"La rete ospedaliera<br>hub and spoke", sottotitolo:"Lezione 2.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"catena", tema:"chiaro", sopratitolo:"Un infarto in un paese di montagna", passi:[
  {t:"L'ospedale più vicino", d:"a pochi chilometri"},
  {t:"L'ambulanza lo supera"},
  {t:"Emodinamica aperta giorno e notte", d:"più lontano", key:true}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Perché?",
  testo:"Gli ospedali veneti **non sono tutti uguali**.",
  sotto:"Sono organizzati in una rete, con ruoli diversi."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Hub**: il mozzo.<br>**Spoke**: i raggi.",
  sotto:"Come nella ruota di una bicicletta."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"L'**idea** che regge il modello"},
  {t:"Chi è **hub** e chi è **spoke**"},
  {t:"Le **reti cliniche**"},
  {t:"Il problema della **distanza**"}]},

// --- 3 · l'idea
{id:"s06", tipo:"assetempo", tema:"chiaro", sopratitolo:"Da dove viene",
  da:2010, a:2024, decenni:[2012,2016,2020,2024], tappe:[
  {anno:2012, et:"PSSR 2012-2016 · L.R. 23/2012 — nasce il modello", key:true},
  {anno:2015, et:"DM 70/2015 — standard ospedalieri"},
  {anno:2018, et:"PSSR 2019-2023 · L.R. 48/2018 — confermato"}]},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Il principio, nelle parole del Piano", col:[
  {h:"Media e bassa complessità", t:"criterio di **prossimità**", grande:true},
  {h:"Alta complessità", t:"criterio di **centralizzazione**", grande:true}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Prossimità: vicino a casa", celle:[
  {t:"un'**appendicite**"}, {t:"una **frattura** semplice"}, {t:"una **polmonite**"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Centralizzazione: in pochi centri", celle:[
  {t:"**cardiochirurgia**"}, {t:"**neurochirurgia**"}, {t:"**grandi traumi**"}]},
{id:"s10", tipo:"frase", tema:"chiaro", sopratitolo:"Perché concentrare",
  testo:"**La qualità dipende dai volumi.**",
  sotto:"Lo misura il Programma Nazionale Esiti."},
{id:"s11", tipo:"frase", tema:"chiaro", sopratitolo:"Il Veneto ci arriva da lontano",
  testo:"L'ospedale come luogo della **sola fase acuta**.",
  sotto:"Tasso di ospedalizzazione tra i più bassi d'Italia."},
{id:"s12", tipo:"norma", tema:"chiaro", etichetta:"Decreto ministeriale 70/2015", sigla:"DM 70",
  testo:"Gli standard dell'assistenza ospedaliera: specialità assegnate per **bacini di popolazione**."},
{id:"s13", tipo:"impila", tema:"chiaro", sopratitolo:"Posti letto, al massimo, ogni mille abitanti",
  testa:"il tetto complessivo", unita:"", segmenti:[
  {v:3, t:"Acuti"}, {v:0.7, t:"Riabilitazione", chiaro:true, colore:"#A8CDBB"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Vicino a casa **il semplice**.<br>Nel centro giusto **il complesso**."},

// --- 4 · hub e spoke
{id:"s15", tipo:"numero", tema:"chiaro", sopratitolo:"Gli ospedali hub del Veneto",
  cifra:"5", testo:"con un bacino di circa **un milione di abitanti** ciascuno"},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Hub di eccellenza di rilievo regionale", col:[
  {h:"Padova", t:"Azienda **Ospedale-Università**", grande:true},
  {h:"Verona", t:"Azienda Ospedaliera **Universitaria Integrata**", grande:true}]},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"E ancora", col:[
  {h:"IOV", t:"hub regionale per la **patologia oncologica**"},
  {h:"Rovigo e Belluno", t:"ospedali provinciali **hub** per le specialità assegnate"}]},
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Il ruolo dell'hub", passi:[
  {t:"Alte specializzazioni", d:"tecnologie innovative"},
  {t:"Casi complessi", d:"anche solo la fase acuta"},
  {t:"Ritorno all'ospedale vicino", key:true}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"E sostiene gli altri",
  testo:"Consulenza, **anche a distanza**.",
  sotto:"Il vertice della piramide organizzativa del suo territorio."},
{id:"s20", tipo:"piramide", tema:"chiaro", sopratitolo:"Tre livelli", strati:LIVELLI},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Il terzo livello",
  testo:"Ospedali **nodi di rete** e strutture integrative.",
  sotto:"Completano l'offerta sul territorio."},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione a un equivoco", righe:[
  {sb:"Spoke vuol dire ospedale di serie B, da chiudere",
   ok:"Restano ospedali per acuti, da potenziare e ammodernare"}]},
{id:"s23", tipo:"catena", tema:"chiaro", sopratitolo:"Chi decide il ruolo di ogni ospedale", passi:[
  {t:"Giunta regionale"},
  {t:"Parere della commissione consiliare"},
  {t:"Schede di dotazione ospedaliera", d:"specialità e posti letto", key:true}]},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"Dentro la stessa ULSS",
  testo:"**Ospedali riuniti**: un dipartimento ad attività integrata.",
  sotto:"Risorse e personale gestiti in modo unitario tra più sedi."},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Tre livelli.<br>Ruoli **decisi prima**,<br>non caso per caso."},

// --- 5 · le reti cliniche
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Sopra la rete degli ospedali",
  testo:"Le **reti cliniche**: un percorso per ogni patologia.",
  sotto:"Dall'ospedale di prossimità all'hub."},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Le reti tempo-dipendenti · DM 70/2015", voci:TEMPO},
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Il paziente di montagna", col:[
  {h:"Non conta", t:"l'ospedale **più vicino**"},
  {h:"Conta", t:"arrivare in fretta al centro che **riapre la coronaria**"}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Oltre venti reti, tra cui", celle:[
  {t:"Trapianti"}, {t:"Malattie rare"}, {t:"Oncologica"}, {t:"Breast unit"},
  {t:"Punti nascita"}, {t:"Cure palliative"}, {t:"Diabetologia"}, {t:"Demenze"}]},
{id:"s30", tipo:"catena", tema:"chiaro", sopratitolo:"I centri di riferimento", passi:[
  {t:"Uno o più per ogni rete"},
  {t:"Scelti anche sui dati del PNE"},
  {t:"Rivisti ogni tre anni", key:true}]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"L'emergenza-urgenza",
  testo:"Il **sensore** dell'intero sistema.",
  sotto:"I suoi dati correggono la programmazione."},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore da quiz", righe:[
  {sb:"Le reti cliniche sono un'alternativa all'hub and spoke",
   ok:"Sono organizzate al suo interno, e ne usano i ruoli"}]},

// --- 6 · la distanza
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il problema che si sente per primo",
  testo:"E se il centro giusto è **lontano**?"},
{id:"s34", tipo:"icone", tema:"chiaro", attive:[0], sopratitolo:"Quattro risposte", voci:RISPOSTE},
{id:"s35", tipo:"norma", tema:"chiaro", etichetta:"Nelle reti tempo-dipendenti", sigla:"Golden hour",
  testo:"L'**ora d'oro**: l'intervento nel minor tempo possibile."},
{id:"s36", tipo:"icone", tema:"chiaro", attive:[1], sopratitolo:"Quattro risposte", voci:RISPOSTE},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Il Piano cita Chioggia",
  testo:"Uno spoke indispensabile anche per i **flussi turistici**.",
  sotto:"Un bacino piccolo, ma un hub difficile da raggiungere."},
{id:"s38", tipo:"icone", tema:"chiaro", attive:[2], sopratitolo:"Quattro risposte", voci:RISPOSTE},
{id:"s39", tipo:"albero", tema:"chiaro", sopratitolo:"Il pronto soccorso ha tre uscite",
  radice:"**Pronto soccorso**", rami:[
  {cond:"se serve", esito:"Ricovero"},
  {cond:"se basta", esito:"Dimissione"},
  {cond:"se è il caso", esito:"**Struttura intermedia**", key:true}]},
{id:"s40", tipo:"icone", tema:"chiaro", attive:[3], sopratitolo:"Quattro risposte", voci:RISPOSTE},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Il paziente viaggia<br>**solo quando serve**.",
  sotto:"Il resto lo fa la rete."},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il modello hub and spoke nasce con il PSSR 2019-2023",
   ok:"Nasce con il PSSR 2012-2016; il successivo lo conferma"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Pochi centri per il difficile.<br>Molti ospedali vicini.<br>**Una rete che li tiene insieme.**",
  sotto:"Prossima lezione: il distretto."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 2.6", sottotitolo:"Il distretto potenziato", ente:ENTE},
];
