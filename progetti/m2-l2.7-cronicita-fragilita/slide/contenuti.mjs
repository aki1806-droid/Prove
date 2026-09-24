// Contenuto delle 47 scene della lezione 2.7. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 2. Ospedali di
// comunità, cronicità e fragilità: PSSR 2019-2023 cap. 6 (cronicità e
// multimorbidità per intensità di cura, pp. 91-99), cap. 5 (p. 88);
// L.R. 19/2016 art. 14 c. 5 (+15% posti letto negli ospedali di comunità).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const SFIDE = [
 {t:"1 · La **popolazione che invecchia**"},
 {t:"2 · Il **personale** del territorio"},
 {t:"3 · L'**integrazione dei dati**"},
 {t:"4 · L'**uniformità** delle transizioni"},
 {t:"5 · Le **dimissioni difficili**"},
];

const TRE_COSE = [
 "Cure intermedie: **ospedale di comunità**, **URT** e **hospice**; degenza di norma entro **4-6 settimane**",
 "Cronicità per **intensità di cura**: semplice all'assistenza primaria, complessa ai team del distretto, avanzata alle **cure palliative**",
 "La **COT**, centrale operativa territoriale, è la **centrale della continuità**: governa le transizioni protette",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Il sistema sanitario regionale del Veneto",
  titolo:"Ospedali di comunità,<br>cronicità, fragilità", sottotitolo:"Lezione 2.7", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"catena", tema:"chiaro", sopratitolo:"85 anni, dimessa dopo una polmonite", passi:[
  {t:"Non ha più bisogno dell'ospedale"}, {t:"A casa, sola, non ce la fa"},
  {t:"**Dove va?**", key:true}]},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Fino a qualche anno fa", col:[
  {h:"Resta in ospedale", t:"e occupa un **letto per acuti**"},
  {h:"Torna a casa", t:"e dopo una settimana è di nuovo in **pronto soccorso**"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"La risposta sta **nel mezzo**:<br>le strutture intermedie."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Le **strutture intermedie** e l'ospedale di comunità"},
  {t:"La cronicità per **intensità di cura**"},
  {t:"Il **piano integrato di cura** e le transizioni"},
  {t:"Le **sfide aperte**"}]},

// --- 3 · le strutture intermedie
{id:"s06", tipo:"catena", tema:"chiaro", sopratitolo:"PSSR 2019-2023 · l'offerta per intensità di cura", passi:[
  {t:"Ospedale", d:"la fase acuta"},
  {t:"**Cure intermedie**", d:"in mezzo", key:true},
  {t:"Casa", d:"o residenza"}]},
{id:"s07", tipo:"tre", tema:"chiaro", sopratitolo:"Le strutture di cure intermedie", box:[
  {t:"Ospedale di comunità"}, {t:"Unità riabilitativa territoriale", d:"URT"}, {t:"Hospice"}]},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"A chi servono",
  testo:"A pazienti **stabilizzati**: non più da ospedale, non ancora da casa.",
  sotto:"Né, per ora, da residenza."},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Anziani con più malattie, a rischio di", celle:[
  {t:"un ricovero **troppo lungo**"}, {t:"un ricovero **inappropriato**"},
  {t:"un ingresso in struttura **evitabile**"}]},
{id:"s10", tipo:"numero", tema:"chiaro", sopratitolo:"Una degenza breve",
  cifra:"4-6", testo:"**settimane**, di norma: l'obiettivo è il recupero dell'autonomia"},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa conta", col:[
  {h:"In ospedale", t:"la dimensione **diagnostica** e terapeutica"},
  {h:"Nelle cure intermedie", t:"la dimensione **prognostica**: la persona che torna a casa"}]},
{id:"s12", tipo:"barre", tema:"chiaro", sopratitolo:"Posti letto intermedi, ogni 1.000 abitanti sopra i 45 anni",
  unita:"", max:1, barre:[
  {et:"Standard minimo", v:0.6, lab:"0,6"},
  {et:"Aree disagiate", v:0.8, lab:"0,8", colore:"#D70328", nota:"+0,2 · Bellunese, Polesine, montagna, laguna"}]},
{id:"s13", tipo:"numero", tema:"chiaro", sopratitolo:"L.R. 19/2016 · entro il 2017",
  cifra:"+15%", testo:"posti letto negli **ospedali di comunità**"},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Anche dentro gli ospedali",
  testo:"Letti di **ospedale di comunità** per i cronici con più malattie.",
  sotto:"Con protocolli precisi: l'ospedale resta il luogo della fase acuta."},
{id:"s15", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"L'ospedale di comunità è una lungodegenza o una casa di riposo",
   ok:"Ricovero breve, sanitario, per recuperare e tornare a casa"}]},

// --- 4 · intensità di cura
{id:"s16", tipo:"norma", tema:"chiaro", etichetta:"PSSR 2019-2023 · capitolo 6", sigla:"Intensità",
  testo:"Presa in carico della **cronicità** e della **multimorbidità** per intensità di cura e di assistenza."},
{id:"s17", tipo:"catena", tema:"chiaro", sopratitolo:"Si parte dalla stratificazione", passi:[
  {t:"Classificazione del case mix", d:"strumenti come gli ACG"},
  {t:"Popolazione per malattie e rischio"},
  {t:"Il **medico di famiglia** conferma", key:true}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Due livelli, due modelli", col:[
  {h:"Cronicità", t:"**semplice**", grande:true},
  {h:"Cronicità", t:"**complessa** e avanzata", grande:true}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Cronicità semplice: l'assistenza primaria", celle:[
  {t:"**medicine di gruppo** e team multiprofessionali"},
  {t:"riconoscono i **malati cronici**"},
  {t:"li inseriscono nei percorsi, i **PDTA**"}]},
{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"Tre tipi di team · il cittadino sceglie", box:[
  {t:"Medici convenzionati", d:"aggregati"}, {t:"Medici dipendenti", d:"del servizio sanitario"},
  {t:"Soggetto privato", d:"accreditato"}]},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"Cronicità complessa: i team del distretto", voci:[
  {icona:"persona",   t:"Specialisti di area **geriatrica**"},
  {icona:"ospedale",  t:"Specialisti di area **internistica**"},
  {icona:"cuoremano", t:"**Cure palliative**"},
  {icona:"persone",   t:"**Infermieri** e assistenti sociali"}]},
{id:"s22", tipo:"piramide", tema:"chiaro", sopratitolo:"La piramide della cronicità", strati:[
  {t:"Avanzata", d:"circa l'1% · cure palliative, a domicilio"},
  {t:"Complessa", d:"team dedicati del distretto"},
  {t:"Semplice", d:"assistenza primaria"}]},
{id:"s23", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Presa in carico proattiva · medicina di iniziativa",
  da:{h:"Prima", t:"si aspetta il paziente in pronto soccorso"},
  a:{h:"Oggi", t:"lo si segue **prima** che la malattia si riacutizzi"}},
{id:"s24", tipo:"confronto", tema:"chiaro", sopratitolo:"Ogni team garantisce", col:[
  {h:"Domicilio", t:"programmato e non, **7 giorni su 7**"},
  {h:"Cure palliative", t:"una rete da **rafforzare**, a casa e in hospice"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Poco a chi serve poco,<br>molto a chi serve molto,<br>**prima dell'urgenza**."},

// --- 5 · piano integrato e transizioni
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Il piano integrato di cura",
  testo:"Un **progetto sulla persona**.",
  sotto:"Condiviso dal team e dal paziente, o dalla sua famiglia."},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Nel piano integrato di cura", celle:[
  {t:"le **preferenze** del paziente"}, {t:"le sue **direttive anticipate**"},
  {t:"nel **fascicolo sanitario elettronico**, per tutta la filiera"}]},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Il medico di famiglia resta nel percorso",
  testo:"Informato dal **fascicolo elettronico**.",
  sotto:"E può far parte del team che scrive e realizza il piano."},
{id:"s29", tipo:"numero", tema:"chiaro", sopratitolo:"Per i pazienti e le famiglie",
  cifra:"h24", testo:"un **numero unico**, attivo giorno e notte"},
{id:"s30", tipo:"catena", tema:"chiaro", sopratitolo:"Le transizioni", passi:[
  {t:"Ospedale"}, {t:"Struttura intermedia"},
  {t:"Casa", d:"i passaggi più a rischio", key:true}]},
{id:"s31", tipo:"norma", tema:"chiaro", etichetta:"Centrale operativa territoriale", sigla:"COT",
  testo:"La **centrale della continuità**: ogni passaggio avviene in modo protetto."},
{id:"s32", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa fa la COT", voci:[
  {icona:"occhio",      t:"**Mappa** le risorse della rete"},
  {icona:"ingranaggio", t:"Dimissioni e ammissioni **protette**"},
  {icona:"cuoremano",   t:"Bisogni **sanitari e sociali**"},
  {icona:"documento",   t:"Percorsi **tracciabili**"}]},
{id:"s33", tipo:"norma", tema:"chiaro", etichetta:"Unità valutativa multidimensionale", sigla:"UVMD",
  testo:"La valutazione multidimensionale: lo strumento per pianificare l'assistenza dei malati **più complessi**."},
{id:"s34", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"La COT è la centrale del 118",
   ok:"Il 118 gestisce l'emergenza, la COT la continuità delle cure"}]},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"Un solo progetto,<br>e una centrale che<br>**non la perde di vista**."},

// --- 6 · le sfide aperte
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0], sopratitolo:"Le sfide aperte", celle:SFIDE},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1], sopratitolo:"Le sfide aperte", celle:SFIDE},
{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"3 · I dati viaggiano con il paziente", passi:[
  {t:"Ospedale"}, {t:"Distretto"},
  {t:"Casa", d:"il piano di cura nel fascicolo elettronico", key:true}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2,3], sopratitolo:"Le sfide aperte", celle:SFIDE},
{id:"s40", tipo:"numero", tema:"chiaro", sopratitolo:"5 · Le dimissioni difficili",
  cifra:"24 h", testo:"al massimo nei **posti letto tecnici**, per non occupare letti per acuti"},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La farmacia, alleata del cronico", celle:[
  {t:"**aderenza** alle terapie"}, {t:"**screening**"}, {t:"**prenotazioni**"}]},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"I posti letto intermedi si calcolano su tutta la popolazione",
   ok:"Sugli abitanti sopra i 45 anni: 0,6 ogni 1.000"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Curare **prima**,<br>**vicino**, e **insieme**.",
  sotto:"Fine del modulo 2. Nel modulo 3: la legislazione socio-sanitaria del Veneto."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 3", sottotitolo:"La legislazione<br>socio-sanitaria del Veneto", ente:ENTE},
];
