// Contenuto delle 50 scene della lezione 3.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 3. La L.R. 56/1994:
// finalità e ruolo della Regione; ULSS e aziende ospedaliere; delega dei servizi
// sociali; Conferenza dei sindaci (art. 5); programmazione regionale (relazione
// annuale entro il 30/09); protocolli Regione-Università. Illustrazioni: illustra.mjs.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const DECRETO_REGIONI = [
  {n:"1", t:"Il quadro istituzionale", d:"del servizio sanitario regionale"},
  {n:"2", t:"Le unità locali", d:"e i loro ambiti territoriali"},
  {n:"3", t:"Le aziende ospedaliere", d:"quali ospedali lo diventano"},
  {n:"4", t:"L'organizzazione", d:"e il funzionamento delle unità locali", key:true},
];

const COMPITI = [
  {n:"1", t:"Osservazioni", d:"sulla proposta di piano socio-sanitario regionale"},
  {n:"2", t:"Piani di zona", d:"i servizi sociali a integrazione socio-sanitaria"},
  {n:"3", t:"Bilanci", d:"esame del preventivo e del consuntivo"},
  {n:"4", t:"Parere", d:"sul piano attuativo locale", key:true},
];

const TRE_COSE = [
  "La **Regione**: programmazione, indirizzo, controllo e vigilanza. La **gestione** spetta alle aziende",
  "La **Conferenza dei sindaci** (art. 5): indirizzo e valutazione — osservazioni sul piano, piani di zona, bilanci, parere sul piano attuativo",
  "Ogni anno, entro il **30 settembre**, la Giunta riferisce al Consiglio regionale sull'andamento del servizio",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Legislazione socio-sanitaria del Veneto",
  titolo:"La L.R. 56/1994:<br>il riordino", sottotitolo:"Lezione 3.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"municipio", sopratitolo:"Tremila abitanti, in collina",
  titolo:"Il sindaco", punti:[
    {icona:"divieto", t:"non gestisce l'ospedale"},
    {icona:"divieto", t:"non nomina i primari"},
    {icona:"chat", t:"eppure ha **voce** sulla sanità", key:true}],
  etichette:{insegna:"Comune", dx:{t:"Da dove viene?", key:true}}},
{id:"s03", tipo:"icone", tema:"chiaro", sopratitolo:"La L.R. 56/1994 disegna l'architettura", voci:[
  {icona:"libro",       t:"Chi **programma**"},
  {icona:"ingranaggio", t:"Chi **gestisce**"},
  {icona:"persone",     t:"Chi **partecipa**"},
  {icona:"occhio",      t:"Chi **controlla**"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Una legge di riordino<br>dice **chi fa che cosa**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"bilancia", t:"La Regione", d:"finalità e funzioni"},
  {icona:"ospedale", t:"Le aziende", d:"ULSS e ospedaliere"},
  {icona:"persone", t:"I Comuni", d:"la Conferenza dei sindaci", key:true},
  {icona:"cappello", t:"Programmazione", d:"e Università"}]},

// --- 3 · finalità e Regione
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il titolo completo",
  titolo:"Norme e principi per il **riordino**", punti:[
    {icona:"ospedale", t:"del servizio sanitario regionale"},
    {icona:"documento", t:"in attuazione del **D.Lgs. 502/1992**"},
    {icona:"documento", t:"come modificato dal **D.Lgs. 517/1993**", key:true}],
  etichette:{titolo:{t:"L.R. 56/1994", key:true}, sotto:"14 settembre 1994"}},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Il punto di partenza",
  testo:"La Regione assicura i migliori **livelli uniformi** di assistenza.",
  sotto:"Sul territorio regionale, in relazione alle risorse disponibili."},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"Due parole da pesare",
  titolo:"Uniformi e **sostenibili**", punti:[
    {icona:"persone", t:"**uniformi**: uguali per tutti"},
    {icona:"euro", t:"**in relazione alle risorse**: dentro i conti", key:true}],
  etichette:{monti:"Belluno", pianura:"Rovigo", centro:{t:"Stessi livelli", key:true}}},
{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"Le funzioni della Regione sulle aziende", voci:[
  {icona:"libro",    t:"**Programmazione**"},
  {icona:"bilancia", t:"**Indirizzo**"},
  {icona:"occhio",   t:"**Controllo**"},
  {icona:"scudo",    t:"**Vigilanza**"}]},
{id:"s10", tipo:"ciclo", tema:"chiaro", sopratitolo:"Che cosa vuol dire, in pratica",
  centro:"La Regione", dcentro:"e poi si riparte", fasi:[
  {icona:"libro", t:"Programmare", d:"obiettivi e priorità"},
  {icona:"bilancia", t:"Indirizzare", d:"regole comuni"},
  {icona:"occhio", t:"Controllare e vigilare", d:"che le aziende le rispettino", key:true}]},
{id:"s11", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Lo spazio che il D.Lgs. 502 lascia alle Regioni", box:DECRETO_REGIONI},
{id:"s12", tipo:"tre", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Lo spazio che il D.Lgs. 502 lascia alle Regioni", box:DECRETO_REGIONI},
{id:"s13", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Un obiettivo scritto nella legge",
  titolo:"**Integrazione**, per legge", punti:[
    {icona:"ospedale", t:"politiche **sanitarie**"},
    {icona:"cuoremano", t:"e politiche **sociali**"},
    {icona:"certificato", t:"un **principio**, non un'abitudine", key:true}],
  etichette:{sx:"Sanitario", dx:{t:"Sociale", key:true}}},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La Regione gestisce direttamente gli ospedali",
   ok:"Programma, indirizza e controlla: la gestione spetta alle aziende"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"La Regione **governa**.<br>Le aziende **gestiscono**.",
  sotto:"E il cittadino sa a chi chiedere conto."},

// --- 4 · le aziende
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Due tipi di azienda", col:[
  {h:"Azienda ULSS", t:"unità locale **socio-sanitaria**", grande:true},
  {h:"Azienda ospedaliera", t:"uno o più **ospedali**", grande:true}],
  sotto:"Diverse per missione, dentro lo stesso sistema."},
{id:"s17", tipo:"rete", tema:"chiaro", sopratitolo:"La ULSS fa quasi tutto",
  centro:"ULSS", dcentro:"un territorio", nodi:[
  {t:"Prevenzione", icona:"scudo"}, {t:"Distretti", icona:"persone"}, {t:"Ospedali", icona:"ospedale"},
  {t:"Farmaceutica", icona:"goccia"}, {t:"Specialistica", icona:"occhio"}, {t:"Sociale delegato", icona:"cuoremano", key:true}]},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"L'azienda ospedaliera",
  titolo:"Alta **specializzazione**", punti:[
    {icona:"ospedale", t:"uno o più **ospedali**"},
    {icona:"cuoremano", t:"ricovero e cura"},
    {icona:"cappello", t:"ricerca e **formazione**", key:true}],
  etichette:{insegna:{t:"Azienda ospedaliera", key:true}, sx:"Ricovero e cura"}},
{id:"s19", tipo:"contatore", tema:"chiaro", sopratitolo:"Il Veneto oggi, dopo la L.R. 19/2016", sep:"·",
  valori:[{n:9, t:"aziende ULSS"}, {n:2, t:"aziende ospedaliere universitarie", key:true}, {n:1, t:"Istituto Oncologico Veneto"}],
  sotto:"Padova e Verona: le due aziende ospedaliere universitarie."},
{id:"s20", tipo:"flusso", tema:"chiaro", sopratitolo:"I livelli uniformi di assistenza", passi:[
  {icona:"documento", t:"Piano sanitario nazionale", d:"la cornice"},
  {icona:"libro", t:"Piano socio-sanitario regionale", d:"fissa i livelli"},
  {icona:"ospedale", t:"Le aziende", d:"assicurano le prestazioni", key:true}]},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Ogni azienda adotta",
  titolo:"Il piano generale **triennale**", punti:[
    {icona:"libro", t:"traduce la programmazione in **azioni**"},
    {icona:"documento", t:"lo vedremo nella lezione sulla **L.R. 55**", key:true}],
  etichette:{data:{t:"Tre anni", key:true}, nota:"Piano generale"}},
{id:"s22", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"La delega sociale",
  titolo:"Dai Comuni alle **ULSS**", punti:[
    {icona:"cuoremano", t:"la gestione dei **servizi sociali**"},
    {icona:"euro", t:"con **finanziamenti specifici**", key:true},
    {icona:"libro", t:"nei modi del piano socio-sanitario"}],
  etichette:{sx:"Comuni", dx:"ULSS", centro:{t:"Delega", key:true}}},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"casa", sopratitolo:"Per il cittadino",
  titolo:"Una sola **azienda**", punti:[
    {icona:"cuoremano", t:"l'assistenza a **domicilio**"},
    {icona:"persone", t:"i servizi per la **disabilità**"},
    {icona:"ospedale", t:"l'**ospedale**", key:true}],
  etichette:{insegna:"Domicilio", dx:{t:"Una sola regia", key:true}}},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Con la delega i Comuni perdono la titolarità dei servizi sociali",
   ok:"Ne affidano la gestione alla ULSS, che la esercita per loro"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Due aziende,<br>**un solo sistema**."},

// --- 5 · la Conferenza dei sindaci
{id:"s26", tipo:"rete", tema:"chiaro", sopratitolo:"L.R. 56/1994, articolo 5",
  centro:"Conferenza", dcentro:"dei sindaci", nodi:["Sindaco","Sindaco","Sindaco","Sindaco","Sindaco","Sindaco"],
  nota:"Il territorio di una ULSS comprende **molti Comuni**"},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Indirizzo e valutazione, non gestione", col:[
  {h:"La Conferenza dei sindaci", t:"**orienta** e **giudica**", grande:true},
  {h:"Il direttore generale", t:"**gestisce**", grande:true}]},
{id:"s28", tipo:"tre", tema:"chiaro", attive:[0], sopratitolo:"Quattro compiti da ricordare", box:COMPITI},
{id:"s29", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Quattro compiti da ricordare", box:COMPITI},
{id:"s30", tipo:"tre", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Quattro compiti da ricordare", box:COMPITI},
{id:"s31", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Come lavora",
  titolo:"Esecutivo e **presidente**", punti:[
    {icona:"certificato", t:"confermata dalla **L.R. 19/2016**"},
    {icona:"persone", t:"in ogni azienda ULSS"},
    {icona:"documento", t:"con rinvio all'**art. 5** della 56", key:true}],
  etichette:{alto:{t:"Conferenza dei sindaci", key:true}}},
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"livelli", sopratitolo:"Con la L.R. 19/2016",
  titolo:"Accanto, i **Comitati**", punti:[
    {icona:"persone", t:"uno per **distretto**"},
    {icona:"divieto", t:"non sostituiscono la Conferenza"},
    {icona:"spunta", t:"più **vicini** al territorio", key:true}],
  etichette:{l1:"Regione", l2:"Conferenza · ULSS", l3:{t:"Comitati · distretti", key:true}, l4:"Comuni"}},
{id:"s33", tipo:"flusso", tema:"chiaro", sopratitolo:"Perché conta", passi:[
  {icona:"bilancia", t:"La Regione", d:"nomina il direttore generale"},
  {icona:"persona", t:"Il direttore generale", d:"gestisce l'azienda"},
  {icona:"persone", t:"I sindaci", d:"a cui rende conto", key:true}]},
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"municipio", sopratitolo:"Torna al Comune in collina",
  titolo:"Ecco la sua **voce**", punti:[
    {icona:"libro", t:"sul **piano** dell'azienda"},
    {icona:"euro", t:"sui **bilanci**"},
    {icona:"cuoremano", t:"sui **servizi sociali** del territorio", key:true}],
  etichette:{insegna:"Comune", dx:{t:"La sua voce", key:true}}},
{id:"s35", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio ai nomi", righe:[
  {sb:"Conferenza dei sindaci e Comitato dei sindaci sono la stessa cosa",
   ok:"La Conferenza lavora sull'intera ULSS, il Comitato sul distretto"}]},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"I Comuni non gestiscono.<br>**Orientano e giudicano**."},

// --- 6 · programmazione regionale e Università
{id:"s37", tipo:"flusso", tema:"chiaro", sopratitolo:"La programmazione regionale", passi:[
  {icona:"libro", t:"Piano socio-sanitario regionale"},
  {icona:"spunta", t:"Obiettivi e standard", d:"dei servizi"},
  {icona:"ingranaggio", t:"Programmi di intervento", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Ogni anno",
  titolo:"Entro il **30 settembre**", punti:[
    {icona:"persone", t:"la **Giunta** riferisce al **Consiglio**"},
    {icona:"occhio", t:"sull'andamento del servizio sanitario regionale"},
    {icona:"documento", t:"la **relazione annuale**", key:true}],
  etichette:{data:{t:"30 settembre", key:true}, nota:"Relazione annuale"}},
{id:"s39", tipo:"icone", tema:"chiaro", sopratitolo:"Le azioni strumentali", voci:[
  {icona:"cartella",    t:"Il **sistema informativo**"},
  {icona:"occhio",      t:"L'osservazione **epidemiologica**"},
  {icona:"ingranaggio", t:"Le **sperimentazioni** gestionali"}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Senza dati non si programma",
  titolo:"Gli **occhi** della Regione", punti:[
    {icona:"cartella", t:"il sistema informativo"},
    {icona:"occhio", t:"l'epidemiologia"},
    {icona:"ingranaggio", t:"sperimentare **prima** di estendere", key:true}],
  etichette:{titolo:{t:"Osservazione epidemiologica", key:true}}},
{id:"s41", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio", passi:[
  {icona:"occhio", t:"I dati", d:"crescono gli anziani soli"},
  {icona:"avviso", t:"Il segnale", d:"prima che le liste esplodano"},
  {icona:"libro", t:"La programmazione", d:"parte da lì", key:true}]},
{id:"s42", tipo:"illustrata", tema:"chiaro", ill:"universita", sopratitolo:"Poi l'Università",
  titolo:"Regione e **Università**", punti:[
    {icona:"cappello", t:"formare i **medici**"},
    {icona:"libro", t:"fare **ricerca**"},
    {icona:"documento", t:"i **protocolli d'intesa**", key:true}],
  etichette:{alto:{t:"Protocolli d'intesa", key:true}}},
{id:"s43", tipo:"tre", tema:"chiaro", sopratitolo:"I protocolli d'intesa servono a", box:[
  {n:"1", t:"L'apporto", d:"delle facoltà di medicina all'assistenza"},
  {n:"2", t:"La collaborazione", d:"reciproca"},
  {n:"3", t:"La formazione", d:"i corsi"}]},
{id:"s44", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Su questa base lavorano",
  titolo:"Le aziende **ospedaliere universitarie**", punti:[
    {icona:"ospedale", t:"**Padova**"},
    {icona:"ospedale", t:"**Verona**"},
    {icona:"cappello", t:"le vedremo nel **modulo 4**", key:true}],
  etichette:{insegna:{t:"Padova · Verona", key:true}}},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il piano di zona e il piano generale sono lo stesso documento",
   ok:"Il piano di zona è sociale e passa dalla Conferenza; il piano generale è dell'azienda"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"La Regione governa,<br>le aziende gestiscono,<br>i Comuni **orientano**.",
  sotto:"Prossima lezione: organi, distretti e dipartimenti."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 3.3", sottotitolo:"Organi, distretti<br>e dipartimenti", ente:ENTE},
];
