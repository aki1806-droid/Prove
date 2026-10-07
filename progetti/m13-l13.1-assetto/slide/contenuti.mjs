// Contenuto delle 50 scene della lezione 13.1 — l'assetto del Servizio Socio
// Sanitario Regionale veneto. Le nove ULSS sono una griglia che si accende tre
// alla volta; la risposta al caso d'esame un percorso a cinque tappe che si
// completa in tre scene; gli enti del SSR, i temi del PSSR e il distretto
// tre raggiere.

const ULSS = (att, sop) => ({tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:sop, celle:[
  {n:"1", t:"**Dolomiti** · Belluno"}, {n:"2", t:"**Marca Trevigiana** · Treviso"}, {n:"3", t:"**Serenissima** · Venezia"},
  {n:"4", t:"**Veneto Orientale** · San Donà di Piave"}, {n:"5", t:"**Polesana** · Rovigo"}, {n:"6", t:"**Euganea** · Padova"},
  {n:"7", t:"**Pedemontana** · Bassano del Grappa"}, {n:"8", t:"**Berica** · Vicenza"}, {n:"9", t:"**Scaligera** · Verona"}], attive:att});

const RISPOSTA = (att, k) => ({tipo:"catena", tema:"chiaro", passi:[
  {t:"Socio-sanitario", d:"integrazione sanitario e sociale", key:k===0},
  {t:"L.R. 19/2016", d:"Azienda Zero · ULSS da 21 a 9 dal 2017", key:k===1},
  {t:"AOU e IOV", d:"Padova e Verona", key:k===2},
  {t:"Programmazione", d:"PSSR e schede di dotazione", key:k===3},
  {t:"Distretto", d:"il perno del territorio", key:k===4}], attive:att});

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 13 · Il Servizio Socio Sanitario del Veneto",
  titolo:"L'assetto<br>del sistema regionale", sottotitolo:"13.1 · Il Servizio Socio Sanitario Regionale, la L.R. 19/2016, le nove ULSS, la governance e la programmazione",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"Micro-lezione 1 di 8 · il bando è di Azienda Zero",
  testo:"Il modulo che più **distingue** chi si prepara per **questo** concorso."},
{id:"s03", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa si aspetta la commissione · cominciamo dall'assetto generale", voci:[
  {icona:"ospedale", t:"Le aziende", d:"quali esistono", key:true}, {icona:"ingranaggio", t:"Azienda Zero", d:"che cosa fa"},
  {icona:"goccia", t:"Rete ospedaliera"}, {icona:"persone", t:"Territorio"}, {icona:"cuoremano", t:"Non autosufficienza"}]},

{id:"s04", tipo:"venn", tema:"chiaro", sopratitolo:"Il primo tratto distintivo · da decenni una scelta della Regione",
  sx:{t:"Sanitario", d:"l'**assistenza**"},
  dx:{t:"Sociale", d:"i **servizi**"},
  centro:"Servizio **Socio** Sanitario Regionale: l'**integrazione**"},
{id:"s05", tipo:"catena", tema:"chiaro", sopratitolo:"ULSS · Unità Locali Socio Sanitarie", passi:[
  {t:"I **Comuni**"}, {t:"**Delegano**", d:"la gestione dei servizi socio-sanitari"},
  {t:"Le **ULSS**", d:"Unità Locali **Socio** Sanitarie", key:true}]},
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"L'integrazione, dentro e fuori l'azienda", col:[
  {h:"Nella direzione aziendale", t:"il direttore dei servizi **socio-sanitari**"},
  {h:"Nella programmazione", t:"i **Piani di Zona**, condivisi fra ULSS e Comuni", key:true}]},
{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"Per l'infermiere · un sistema costruito sull'integrazione", voci:[
  {icona:"persona", t:"L'infermiere", key:true}, {icona:"persone", t:"Gli assistenti sociali"}, {icona:"documento", t:"I servizi comunali"}]},

{id:"s08", tipo:"norma", tema:"chiaro", etichetta:"Legge regionale 25 ottobre 2016, n. 19", sigla:"L.R. 19/2016",
  testo:"La riforma da conoscere. Fa **due cose**."},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"La prima · l'azienda che bandisce questo concorso · lezione 13.2",
  testo:"Istituisce **Azienda Zero**, l'ente di **governance** della sanità regionale."},
{id:"s10", tipo:"cifre", tema:"chiaro", sopratitolo:"La seconda · le precedenti ULSS diventano i distretti delle nuove", voci:[
  {n:"21", t:"ULSS", d:"prima della riforma"}, {n:"9", t:"Aziende ULSS", d:"dal **1° gennaio 2017**", key:true}]},

{id:"s11", ...ULSS([0,1,2], "Le nove Aziende ULSS · nome e sede")},
{id:"s12", ...ULSS([3,4,5], "Polesana ed Euganea · il territorio di Padova e Rovigo")},
{id:"s13", ...ULSS([6,7,8], "Nove aziende, nove nomi · imparali con il loro numero")},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Se il concorso prevede la scelta dell'ambito di assegnazione",
  testo:"Conoscere i territori ti serve **anche in pratica**."},

{id:"s15", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli altri enti del SSR · due aziende ospedaliere universitarie", col:[
  {h:"Padova", t:"Azienda **Ospedale-Università**"},
  {h:"Verona", t:"Azienda Ospedaliera Universitaria **Integrata**"}]},
{id:"s16", tipo:"norma", tema:"chiaro", etichetta:"Istituto Oncologico Veneto · un IRCCS", sigla:"IOV",
  sopratitolo:"Le aziende universitarie integrano assistenza, didattica e ricerca",
  testo:"Istituto di **Ricovero e Cura** a Carattere **Scientifico**."},
{id:"s17", tipo:"raggiera", tema:"chiaro", sopratitolo:"Gli enti del SSR · più le strutture private accreditate", centro:"SSR", raggi:[
  {t:"9 ULSS"}, {t:"AOU Padova"}, {t:"AOUI Verona"}, {t:"IOV"}, {t:"Az. Zero", key:true}]},

{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"La governance regionale", passi:[
  {t:"**Giunta** e **Consiglio**", d:"indirizzi e programmazione"},
  {t:"**Area Sanità e Sociale**", d:"guidata da un direttore generale"},
  {t:"Gli **atti**", d:"gli indirizzi tradotti in atti", key:true}]},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"Azienda Zero · ne parliamo nella prossima lezione",
  testo:"Supporto **tecnico** e gestione delle **funzioni centralizzate**."},
{id:"s20", tipo:"percorso", tema:"chiaro", sopratitolo:"I direttori generali delle aziende", tappe:[
  {t:"Nomina", d:"dalla Giunta regionale"}, {t:"Obiettivi", d:"assegnati"}, {t:"Valutazione", d:"ogni anno", key:true}]},
{id:"s21", tipo:"icone", tema:"chiaro", sopratitolo:"Lo stesso legame fra azienda sanitaria e Comuni", voci:[
  {icona:"ospedale", t:"L'ULSS"}, {icona:"persone", t:"Conferenza dei sindaci", d:"dà voce ai territori", key:true}]},

{id:"s22", tipo:"norma", tema:"chiaro", etichetta:"Lo strumento principale della programmazione", sigla:"PSSR",
  testo:"Piano **Socio** Sanitario Regionale: sanitario e sociale, anche nel nome."},
{id:"s23", tipo:"timeline", tema:"chiaro", sopratitolo:"Il piano vigente", tappe:[
  {anno:"28/12/2018", et:"la **L.R. n. 48** lo approva"},
  {anno:"2019–2023", et:"il **PSSR** vigente", key:true},
  {anno:"Oggi", et:"ancora il riferimento della programmazione"}]},
{id:"s24", tipo:"trappola", tema:"chiaro", sopratitolo:"In attesa di un nuovo piano", righe:[
  {sb:"Il PSSR 2019-2023 è un piano scaduto", ok:"Gli atti regionali lo **richiamano ancora**: prima della prova, **verifica** se ne è stato approvato uno nuovo"}]},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I temi del PSSR 2019-2023", celle:[
  {n:"1", t:"**Cronicità** e stratificazione della popolazione"}, {n:"2", t:"Rete ospedaliera **hub & spoke**"}, {n:"3", t:"**Territorio** e cure intermedie"},
  {n:"4", t:"**Integrazione** socio-sanitaria"}, {n:"5", t:"Il **personale**"}, {n:"6", t:"L'**innovazione**"}]},

{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Gli altri strumenti · approvate con delibera di Giunta regionale",
  testo:"Le **schede di dotazione** ospedaliera e territoriale: per ogni ospedale e territorio, **funzioni** e **posti letto**."},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli altri strumenti di programmazione", celle:[
  {t:"**Obiettivi annuali** ai direttori generali"}, {t:"I **Piani di Zona**"},
  {t:"Il **Piano Regionale della Prevenzione**"}, {t:"I **piani di settore** · dipendenze, cure palliative"}]},
{id:"s28", tipo:"icone", tema:"chiaro", sopratitolo:"La Relazione Socio Sanitaria · pubblicata ogni anno", voci:[
  {icona:"persone", t:"Stato di salute", d:"della popolazione"}, {icona:"ingranaggio", t:"Attività", d:"del sistema"},
  {icona:"cappello", t:"All'orale", d:"una fonte utile per prepararsi", key:true}]},

{id:"s29", tipo:"cifre", tema:"chiaro", sopratitolo:"Il contesto · fra le regioni con la popolazione più anziana", voci:[
  {n:"4,8", suf:"milioni", t:"abitanti", d:"circa", key:true}]},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Decine di milioni di presenze turistiche l'anno · un territorio vario", celle:[
  {n:"·", t:"**Montagna**"}, {n:"·", t:"**Pianura**"}, {n:"·", t:"**Laguna**"}, {n:"·", t:"**Delta** del Po"}]},
{id:"s31", tipo:"tre", tema:"chiaro", sopratitolo:"Le implicazioni per la sanità", box:[
  {n:"1", t:"Cronicità", d:"e non autosufficienza"}, {n:"2", t:"Picchi stagionali", d:"nelle zone turistiche"},
  {n:"3", t:"Zone disagiate", d:"montagna bellunese, delta polesano", key:true}]},

{id:"s32", tipo:"frase", tema:"chiaro", sopratitolo:"Il distretto · l'articolazione territoriale dell'ULSS",
  testo:"Il **perno** dell'integrazione: governa la **domanda** e la **presa in carico**."},
{id:"s33", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Che cosa comprende il distretto", celle:[
  {t:"Assistenza **primaria**"}, {t:"Specialistica **territoriale**"}, {t:"**ADI**"},
  {t:"**Residenzialità**"}, {t:"**Consultori**"}, {t:"Integrazione con i **Comuni**"}]},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Li approfondiamo nelle lezioni 13.4 e 13.5", col:[
  {h:"UVMD", t:"ha sede nel **distretto**"},
  {h:"COT", t:"coordina le **transizioni**"}]},

{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Il caso d'esame · la domanda tipo",
  testo:"«Descriva l'**assetto** del Servizio Socio Sanitario del Veneto»"},
{id:"s36", sopratitolo:"Una risposta strutturata · primo e secondo", ...RISPOSTA([0,1], 1)},
{id:"s37", sopratitolo:"Le ULSS da 21 a 9 · terzo: le aziende universitarie e lo IOV", ...RISPOSTA([0,1,2], 2)},
{id:"s38", sopratitolo:"Cinque elementi, un minuto e mezzo", ...RISPOSTA([0,1,2,3,4], 4)},

{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Un esempio concreto · Padova e Rovigo", celle:[
  {n:"6", t:"ULSS **Euganea** · provincia di Padova"}, {n:"5", t:"ULSS **Polesana** · provincia di Rovigo"},
  {n:"PD", t:"Azienda **Ospedale-Università**"}, {n:"PD", t:"**IOV**"}]},
{id:"s40", tipo:"catena", tema:"chiaro", sopratitolo:"Una rete", passi:[
  {t:"**Hub**", d:"l'ospedale universitario · alte specialità"},
  {t:"**Spoke**", d:"gli ospedali delle ULSS"},
  {t:"**Territorio**", d:"garantisce la continuità", key:true}]},

{id:"s41", tipo:"icone", tema:"chiaro", sopratitolo:"Perché tutto questo serve a un infermiere", voci:[
  {icona:"persone", t:"Da chi dipendi", d:"e chi decide"},
  {icona:"chat", t:"A chi rivolgerti", d:"dimissione e presa in carico: distretto, COT, UVMD", key:true}]},
{id:"s42", tipo:"frase", tema:"chiaro", sopratitolo:"Collegare la pratica alla programmazione regionale · e all'orale",
  testo:"Dimostrare che conosci il **sistema** in cui chiedi di entrare."},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Le fonti da consultare per aggiornarti", celle:[
  {t:"Portale della **Regione del Veneto** · area Sanità e Sociale"}, {t:"Sito di **Azienda Zero**"},
  {t:"Siti delle **ULSS** · atti aziendali"}]},
{id:"s44", tipo:"confronto", tema:"chiaro", sopratitolo:"Le fonti da consultare", col:[
  {h:"BUR", t:"Bollettino Ufficiale della Regione: **leggi** e **delibere**"},
  {h:"Relazione Socio Sanitaria", t:"esce **ogni anno**"}]},

{id:"s45", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · il sistema e la riforma", colonne:["38%","62%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Il sistema", "Servizio **Socio** Sanitario Regionale"], ["L.R. 19/2016", "istituisce **Azienda Zero**"],
  ["Le ULSS", "da **21 a 9** dal **1° gennaio 2017**"]], chiave:[2]},
{id:"s46", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · le aziende", colonne:["32%","68%"],
  intestazioni:["Enti", "Nomi"], righe:[
  ["ULSS 1-3", "Dolomiti · Marca Trevigiana · Serenissima"], ["ULSS 4-6", "Veneto Orientale · Polesana · Euganea"],
  ["ULSS 7-9", "Pedemontana · Berica · Scaligera"], ["Universitarie", "AOU Padova · AOUI Verona"], ["IRCCS", "**IOV**"]], chiave:[]},
{id:"s47", tipo:"tabella", tema:"chiaro", sopratitolo:"La tabella · governo e programmazione", colonne:["42%","58%"],
  intestazioni:["Che cosa", "Da ricordare"], righe:[
  ["Regione", "Area **Sanità e Sociale**"], ["PSSR 2019-2023", "**L.R. 48/2018**"],
  ["Schede di dotazione", "ospedaliera e territoriale"], ["Piani di Zona", "ULSS e Comuni"], ["Distretto", "il **perno** del territorio"]], chiave:[1]},

{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Sanitario e sociale,<br>**insieme**.",
  sotto:"Nove ULSS, Azienda Zero: il sistema in cui chiedi di entrare, e che la commissione si aspetta che tu conosca."},

{id:"s49", tipo:"frase", tema:"chiaro", sopratitolo:"Nella prossima lezione · l'ente che bandisce questo concorso",
  testo:"**Azienda Zero**: che cos'è, che cosa fa, che cosa significa per te come **candidato**."},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"13.2<br>Azienda Zero", sottotitolo:"Che cos'è, che cosa fa, che cosa significa per te come candidato",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
