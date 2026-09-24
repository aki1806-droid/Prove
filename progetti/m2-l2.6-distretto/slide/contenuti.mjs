// Contenuto delle 47 scene della lezione 2.6. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 2. Il distretto
// potenziato: L.R. Veneto 19/2016 art. 26; PSSR 2019-2023 cap. 6 («Il nuovo ruolo
// del Distretto»); dispensa CISL FP (Griggio); Case della Salute → Case della
// Comunità del DM 77/2022 (da confermare sul testo del decreto).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const SERVIZI = [
 {t:"**Assistenza primaria**: medici di famiglia e pediatri"},
 {t:"**Cure domiciliari** e assistenza a lungo termine"},
 {t:"**Consultori**, servizi per anziani e disabili"},
 {t:"**Prevenzione** e promozione della salute"},
 {t:"**Coordinamento** con ospedali e specialisti"},
 {t:"**Servizi amministrativi** all'utenza"},
];

const UO = [
 {t:"**Cure primarie**"}, {t:"Infanzia, adolescenza, famiglia e **consultori**"},
 {t:"**Disabilità** e non autosufficienza"}, {t:"**Cure palliative**"},
 {t:"Attività **specialistica**"},
];

const DIRETTORE = [
 {icona:"occhio",      t:"**Analisi** dei bisogni"},
 {icona:"libro",       t:"**Percorsi** assistenziali integrati"},
 {icona:"cuoremano",   t:"**Gestore** della cronicità complessa"},
 {icona:"persone",     t:"**Facilitatore** dell'integrazione"},
];

const NOMI = {
 colonne:["36%","64%"],
 intestazioni:["Il nome", "Che cos'è"],
 righe:[
  ["Casa della Salute",            "il nome **storico** del modello nazionale"],
  ["Casa della Comunità",          "il nome del **DM 77/2022**, con i fondi del PNRR"],
  ["Medicina di gruppo integrata", "il modello **veneto** dei medici di famiglia"],
 ],
};

const TRE_COSE = [
 "**L.R. 19/2016**: le vecchie ULSS diventano **distretti**; il distretto socio-sanitario si chiama **distretto**",
 "In ogni distretto il **Comitato dei Sindaci**: Piano di Zona, bilancio sociale, Piano locale per la non autosufficienza",
 "**PSSR 2019-2023**: il distretto è il **gestore della cronicità** e garantisce l'assistenza **h24, 7 giorni su 7**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Il sistema sanitario regionale del Veneto",
  titolo:"Il distretto<br>potenziato", sottotitolo:"Lezione 2.6", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"catena", tema:"chiaro", sopratitolo:"Il padre, appena dimesso", passi:[
  {t:"Infermiere a domicilio"}, {t:"Ausili"}, {t:"Un aiuto sociale"},
  {t:"A chi si rivolge? **Al distretto**", key:true}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"La parte della ULSS che incontri di più",
  testo:"Spesso **senza saperne il nome**.",
  sotto:"E la parte che la riforma ha caricato di più compiti."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"L'ospedale: la fase acuta.<br>Il distretto: **tutto il resto**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Che cos'è il **distretto**"},
  {t:"Come lo ridisegna la **legge 19**"},
  {t:"Che cosa gli chiede il **Piano 2019-2023**"},
  {t:"Dalle **Case della Salute** alle **Case della Comunità**"}]},

// --- 3 · che cos'è
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Un'articolazione territoriale della ULSS", sigla:"Distretto",
  testo:"Servizi sanitari e socio-sanitari per un territorio: di solito **un insieme di Comuni**."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Due funzioni di fondo", col:[
  {h:"Integrare", t:"assistenza **sanitaria** e servizi **sociali**", grande:true},
  {h:"Governare", t:"**pianificare**, coordinare e valutare i servizi", grande:true}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, attive:[0,1,2], sopratitolo:"Che cosa gestisce", celle:SERVIZI},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Che cosa gestisce", celle:SERVIZI},
{id:"s10", tipo:"citazione", tema:"chiaro",
  testo:"Garantire *continuità* tra ospedale, territorio e servizi sociali, evitando la *frammentazione* dei servizi.",
  fonte:"Dispensa CISL FP Padova, «Il distretto socio-sanitario»"},
{id:"s11", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il distretto è un'azienda, con personalità giuridica",
   ok:"È un'articolazione della ULSS, come l'ospedale e la prevenzione"}]},

// --- 4 · dopo la legge 19
{id:"s12", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L.R. 19/2016, art. 26 · cambia il nome",
  da:{h:"Prima", t:"distretto socio-sanitario"},
  a:{h:"Oggi", t:"**distretto**, con le stesse funzioni"}},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"Cambiano i confini", passi:[
  {t:"I bacini delle vecchie ULSS"},
  {t:"Diventano distretti", d:"delle nuove aziende"},
  {t:"Coordinano ospedale e territorio", key:true}]},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Le vecchie aziende non spariscono",
  testo:"Diventano il **livello di prossimità** della nuova ULSS.",
  sotto:"Più distretti nella stessa vecchia ULSS: restano, con un unico Comitato dei Sindaci."},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Il Comitato dei Sindaci di distretto elabora e approva", celle:[
  {t:"il **Piano di Zona**"}, {t:"il **bilancio di parte sociale**"},
  {t:"il **Piano locale per la non autosufficienza**"}]},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"E dà parere su", celle:[
  {t:"le **schede di dotazione territoriale**"}, {t:"la collocazione delle **strutture intermedie**"},
  {t:"l'attivazione delle **medicine di gruppo integrate**"}]},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"In ogni distretto, unità operative per", celle:UO},
{id:"s18", tipo:"albero", tema:"chiaro", sopratitolo:"Sopra i distretti",
  radice:"**Direttore dei servizi socio-sanitari**", rami:[
  {cond:"coordina", esito:"i **distretti**"},
  {cond:"in staff", esito:"una **UO per il sociale**", key:true}]},
{id:"s19", tipo:"titolo", tema:"profondo",
  titolo:"Il punto in cui<br>**ULSS e Comuni**<br>si incontrano."},

// --- 5 · il distretto potenziato
{id:"s20", tipo:"norma", tema:"chiaro", etichetta:"PSSR 2019-2023 · obiettivo strategico 1 sulla cronicità", sigla:"Gestore",
  testo:"Potenziare il ruolo del distretto come **gestore della cronicità**."},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"La definizione del Piano",
  testo:"L'articolazione deputata all'**integrazione** tra servizi e strutture.",
  sotto:"Per una risposta coordinata e continua ai bisogni della popolazione."},
{id:"s22", tipo:"scala", tema:"chiaro", attive:[0], sopratitolo:"Tre obiettivi", gradini:[
  {n:"1", t:"Misurare i bisogni", d:"stratificare la popolazione"},
  {n:"2", t:"Percorsi per le cronicità", d:"e per le persone fragili"},
  {n:"3", t:"Assistenza h24", d:"7 giorni su 7", key:true}]},
{id:"s23", tipo:"scala", tema:"chiaro", sopratitolo:"Tre obiettivi", gradini:[
  {n:"1", t:"Misurare i bisogni", d:"stratificare la popolazione"},
  {n:"2", t:"Percorsi per le cronicità", d:"e per le persone fragili"},
  {n:"3", t:"Assistenza h24", d:"7 giorni su 7", key:true}]},
{id:"s24", tipo:"icone", tema:"chiaro", sopratitolo:"Il nuovo direttore di distretto", voci:DIRETTORE},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Il direttore di distretto", col:[
  {h:"Organizza", t:"le risorse per i **PDTA**, i percorsi diagnostico-terapeutici"},
  {h:"Definisce", t:"il **budget** delle prestazioni specialistiche"}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Con chi fa accordi", col:[
  {h:"Dentro il distretto", t:"gli **specialisti ambulatoriali** interni"},
  {h:"Se serve", t:"le strutture **private accreditate** del territorio"}]},
{id:"s27", tipo:"numero", tema:"chiaro", sopratitolo:"Una scadenza del Piano",
  cifra:"2019", testo:"entro l'anno: il **Piano della domiciliarità** distrettuale"},
{id:"s28", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Gestore della cronicità: il distretto cura da solo",
   ok:"Coordina medici di famiglia, specialisti, ospedale e sociale"}]},
{id:"s29", tipo:"titolo", tema:"profondo",
  titolo:"Da erogatore di servizi<br>a **regista della presa in carico**."},

// --- 6 · i servizi integrati
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Servizi integrati, per il cittadino", col:[
  {h:"Un solo", t:"**punto di accesso**", grande:true},
  {h:"Un solo", t:"**percorso**, anche con più professionisti", grande:true}]},
{id:"s31", tipo:"venn", tema:"chiaro",
  sx:{t:"Bisogni sanitari", d:"la **malattia**"},
  dx:{t:"Bisogni sociali", d:"la **famiglia**,<br>la casa"},
  centro:"la **valutazione multidimensionale**: un progetto unico"},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:1, spunta:true, sopratitolo:"Le medicine di gruppo: compiti aggiuntivi", celle:[
  {t:"**accessibilità**"}, {t:"presa in carico dei **cronici**"}, {t:"assistenza **domiciliare**"}]},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Accanto al medico di famiglia", col:[
  {h:"Infermieri", t:"un ruolo da **far crescere** nell'assistenza primaria"},
  {h:"Specialisti", t:"gli **ambulatoriali** del distretto"}]},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Anche la prevenzione",
  testo:"Il **Dipartimento di Prevenzione** affianca il medico di famiglia.",
  sotto:"Per cambiare gli stili di vita."},
{id:"s35", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"La farmacia dei servizi", celle:[
  {t:"**prevenzione**"}, {t:"**screening**"}, {t:"**prenotazioni**"}]},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Tanti professionisti,<br>**un solo percorso**."},

// --- 7 · case della salute e della comunità
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"La Casa della Salute: una sede unica per", celle:[
  {t:"**medici di famiglia**"}, {t:"**infermieri**"}, {t:"**specialisti**"}, {t:"**sportelli sociali**"}]},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Nel Veneto",
  testo:"La stessa idea, soprattutto come **medicina di gruppo integrata**.",
  sotto:"Con sedi uniche, spesso messe a disposizione dai Comuni."},
{id:"s39", tipo:"norma", tema:"chiaro", etichetta:"Decreto ministeriale 77/2022 · fondi del PNRR", sigla:"DM 77",
  testo:"L'assistenza territoriale ridisegnata: la **Casa della Comunità**."},
{id:"s40", tipo:"tre", tema:"chiaro", sopratitolo:"Nel DM 77 tornano i pezzi del modulo", box:[
  {t:"Casa della Comunità"}, {t:"Ospedale di comunità"}, {t:"Centrale operativa territoriale", d:"COT · lezione 2.7"}]},
{id:"s41", tipo:"tabella", tema:"chiaro", sopratitolo:"Occhio ai nomi nei quiz", ...NOMI, chiave:[0,1,2]},

// --- 8 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il distretto ha organi propri, come un'azienda",
   ok:"Ha un direttore di distretto, dentro l'organizzazione della ULSS"}]},

// --- 9 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"La ULSS **vicino a casa**,<br>dove sanitario e sociale<br>si incontrano.",
  sotto:"Ultima lezione del modulo: ospedali di comunità, cronicità, fragilità."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 2.7", sottotitolo:"Ospedali di comunità,<br>cronicità, fragilità", ente:ENTE},
];
