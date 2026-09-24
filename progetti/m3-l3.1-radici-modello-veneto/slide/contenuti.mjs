// Contenuto delle 50 scene della lezione 3.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 3. Le radici del modello
// veneto: L.R. 12/1974 e 64/1975 (consorzi socio-sanitari), L. 833/1978, L.R. 55/1982,
// D.Lgs. 502/1992 e 517/1993, L.R. 55 e 56 del 14 settembre 1994 (BUR n. 77/1994),
// L.R. 19/2016. Dal modulo 3: illustrazioni originali e diagrammi animati (illustra.mjs).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const DECRETO_REGIONI = [
  {n:"1", t:"Il quadro istituzionale", d:"del servizio sanitario regionale"},
  {n:"2", t:"Le unità locali", d:"e i loro ambiti territoriali"},
  {n:"3", t:"Le aziende ospedaliere", d:"quali ospedali lo diventano"},
  {n:"4", t:"L'organizzazione", d:"e il funzionamento delle unità locali"},
];

const GEMELLE = {
  colonne:["22%","42%","36%"],
  intestazioni:["Legge", "Che cosa regola", "In una immagine"],
  righe:[
    ["L.R. 56/1994", "chi fa che cosa: il **riordino** del servizio sanitario regionale", "la **pianta** dell'edificio"],
    ["L.R. 55/1994", "come si **programma**, si tengono i **conti** e si **controlla**", "il suo **impianto**"],
  ],
};

const TRE_COSE = [
  "**ULSS** = unità locale **socio**-sanitaria: gestisce anche i servizi sociali **delegati dai Comuni**",
  "**14 settembre 1994**: la **56** riordina il servizio sanitario regionale, la **55** regola programmazione, contabilità, gestione e controllo",
  "Entrambe attuano il **D.Lgs. 502/1992**, come modificato dal **D.Lgs. 517/1993**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Legislazione socio-sanitaria del Veneto",
  titolo:"Le radici<br>del modello veneto", sottotitolo:"Lezione 3.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"sigla", tema:"chiaro", sopratitolo:"Nel Veneto l'azienda sanitaria si chiama", lettere:[
  {l:"U", p:"Unità"}, {l:"L", p:"Locale"}, {l:"S", p:"Socio", key:true}, {l:"S", p:"Sanitaria"}],
  sotto:"Quella **esse** in più non è un dettaglio."},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Una scelta di cinquant'anni",
  titolo:"Tenere **insieme**", punti:[
    {icona:"ospedale", t:"la **sanità** e il **sociale**"},
    {icona:"cartella", t:"nella stessa organizzazione"},
    {icona:"persone", t:"governate con i **Comuni**", key:true}],
  etichette:{sx:"Sanità", dx:{t:"Sociale", key:true}}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Si parte dalle **radici**:<br>gli anni Settanta."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"persone", t:"La tradizione", d:"anni Settanta e Ottanta"},
  {icona:"avviso", t:"Il bivio", d:"la riforma del 1992"},
  {icona:"documento", t:"Le leggi gemelle", d:"55 e 56 del 1994", key:true},
  {icona:"bilancia", t:"La filosofia", d:"di governo"}]},

// --- 3 · la tradizione territoriale
{id:"s06", tipo:"assetempo", tema:"chiaro", sopratitolo:"Il cammino, nella sua distanza vera",
  da:1968, a:1996, decenni:[1970,1980,1990], tappe:[
  {anno:1970, et:"le Regioni ordinarie", key:true},
  {anno:1974, et:"L.R. 12"},
  {anno:1978, et:"L. 833 — le USL"},
  {anno:1982, et:"L.R. 55/1982"},
  {anno:1992, et:"D.Lgs. 502"},
  {anno:1994, et:"L.R. 55 e 56"}]},
{id:"s07", tipo:"rete", tema:"chiaro", sopratitolo:"L.R. 12/1974 e L.R. 64/1975",
  centro:"Consorzio", dcentro:"socio-sanitario",
  nodi:["Comune","Comune","Comune","Comune","Comune","Comune"],
  nota:"I **consorzi socio-sanitari** fra Comuni"},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"Che cos'è un consorzio",
  titolo:"Comuni **insieme**", punti:[
    {icona:"persone", t:"servizi che **da soli** non reggerebbero"},
    {icona:"cuoremano", t:"**salute** e **aiuto sociale** già vicini", key:true}],
  etichette:{comuni:"Comuni vicini", centro:{t:"Servizi in comune", key:true}}},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"casa", sopratitolo:"Conta più l'idea delle date",
  titolo:"Una persona, **una rete**", punti:[
    {icona:"cuoremano", t:"le **cure**"},
    {icona:"persone", t:"l'**aiuto in casa**, il sostegno"},
    {icona:"avviso", t:"separarli = girare fra **sportelli**", key:true}],
  etichette:{insegna:"A casa", dx:{t:"Cure e aiuto", key:true}}},
{id:"s10", tipo:"norma", tema:"chiaro", etichetta:"Legge 833 del 1978", sigla:"USL",
  testo:"Nasce il Servizio sanitario nazionale e, sul territorio, le **unità sanitarie locali**."},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Il Veneto la applica a modo suo", col:[
  {h:"La legge 833", t:"USL: unità sanitaria locale", grande:true},
  {h:"Nel Veneto", t:"ULSS: unità locale **socio**-sanitaria", grande:true}]},
{id:"s12", tipo:"norma", tema:"chiaro", etichetta:"Legge regionale 55 del 1982", sigla:"1982",
  testo:"Le norme per le funzioni **socio-assistenziali** sul territorio: più stretto il legame con i Comuni."},
{id:"s13", tipo:"flusso", tema:"chiaro", sopratitolo:"Il meccanismo: la delega", passi:[
  {icona:"persone", t:"I Comuni", d:"titolari dei servizi sociali"},
  {icona:"documento", t:"Delegano", d:"la gestione"},
  {icona:"ospedale", t:"L'unità locale", d:"sanità e sociale: un solo gestore", key:true}]},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Una trappola di numeri", righe:[
  {sb:"La L.R. 55 del 1982 e la L.R. 55 del 1994 sono la stessa legge",
   ok:"Stesso numero, dodici anni di distanza, materie diverse"}]},
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"radici", sopratitolo:"Alla fine degli anni Ottanta",
  titolo:"Un sistema **radicato**", punti:[
    {icona:"persone", t:"i **Comuni** dentro il governo della sanità"},
    {icona:"cuoremano", t:"il **sociale** gestito col sanitario", key:true}],
  etichette:{r1:"Comuni", r2:"Consorzi", r3:"Unità locali", r4:{t:"Delega", key:true}, chioma:"Il sistema veneto"}},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"La persona<br>**non si divide**<br>fra due sportelli."},

// --- 4 · il bivio del 1992
{id:"s17", tipo:"norma", tema:"chiaro", etichetta:"Decreto legislativo 502/1992 · modulo 1", sigla:"Aziende",
  testo:"Le unità sanitarie locali diventano **aziende**."},
{id:"s18", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa cambia", voci:[
  {icona:"certificato", t:"Personalità giuridica **pubblica**"},
  {icona:"persona",     t:"Un **direttore generale**"},
  {icona:"euro",        t:"I conti in termini **economici**"},
  {icona:"ospedale",    t:"La spinta verso la **sola sanità**"}]},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"bivio", sopratitolo:"Per il Veneto, nel 1992",
  titolo:"Un **bivio**", punti:[
    {icona:"divieto", t:"**Separare**: aziende solo sanitarie, il sociale ai Comuni"},
    {icona:"spunta", t:"**Integrare**: aziende che restano socio-sanitarie", key:true}],
  etichette:{sx:"Separare", dx:{t:"Integrare", key:true}, anno:"1992"}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli argomenti delle due strade", col:[
  {h:"Separare", t:"bilanci più chiari, **un mestiere solo**, responsabilità nette"},
  {h:"Integrare", t:"**una sola porta** per il cittadino, percorsi che non si spezzano"}]},
{id:"s21", tipo:"tre", tema:"chiaro", attive:[0,1], sopratitolo:"Il D.Lgs. 502 lascia alle Regioni", box:DECRETO_REGIONI},
{id:"s22", tipo:"tre", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Il D.Lgs. 502 lascia alle Regioni", box:DECRETO_REGIONI},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"La porta che il Veneto usa",
  titolo:"La **delega**", punti:[
    {icona:"cuoremano", t:"servizi **socio-assistenziali**"},
    {icona:"persone", t:"gestiti dall'unità locale su delega dei **Comuni**"},
    {icona:"euro", t:"con i costi **a loro carico**", key:true}],
  etichette:{sx:"Comuni", dx:"Unità locale", centro:{t:"Delega", key:true}}},
{id:"s24", tipo:"frase", tema:"chiaro", sopratitolo:"La scelta è integrare",
  testo:"Le aziende venete restano **ULSS**.",
  sotto:"Aziende unità locali socio-sanitarie, con i servizi sociali delegati dai Comuni."},
{id:"s25", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il D.Lgs. 502/1992 obbliga a separare sanità e sociale",
   ok:"Lascia la scelta alle Regioni: il Veneto tiene insieme"}]},
{id:"s26", tipo:"titolo", tema:"profondo",
  titolo:"Molti hanno separato.<br>Il Veneto ha<br>**tenuto insieme**."},

// --- 5 · le leggi gemelle del 1994
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"La scelta diventa legge",
  titolo:"14 settembre **1994**", punti:[
    {icona:"documento", t:"due leggi regionali, **stessa data**"},
    {icona:"libro", t:"la **55** e la **56**", key:true},
    {icona:"certificato", t:"insieme sul **Bollettino n. 77**"}],
  etichette:{titolo:{t:"L.R. 55 e 56/1994", key:true}, sotto:"BUR n. 77/1994"}},
{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Legge regionale 14 settembre 1994, n. 56", sigla:"L.R. 56",
  testo:"Norme e principi per il **riordino** del servizio sanitario regionale."},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Legge regionale 14 settembre 1994, n. 55",
  titolo:"La **55** fa girare la macchina", punti:[
    {icona:"libro", t:"l'assetto **programmatorio**"},
    {icona:"euro", t:"**contabile** e gestionale"},
    {icona:"occhio", t:"e di **controllo**", key:true}],
  sotto:"delle ULSS e delle aziende ospedaliere",
  etichette:{sx:"Programmare", dx:{t:"Rendere conto", key:true}}},
{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Detto in breve", ...GEMELLE, chiave:[0,1]},
{id:"s31", tipo:"flusso", tema:"chiaro", sopratitolo:"La traduzione veneta della riforma", passi:[
  {icona:"documento", t:"D.Lgs. 502/1992", d:"la riforma"},
  {icona:"documento", t:"D.Lgs. 517/1993", d:"il correttivo"},
  {icona:"certificato", t:"L.R. 55 e 56/1994", d:"l'attuazione veneta", key:true}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Nella L.R. 56/1994", col:[
  {h:"La Regione", t:"**programmazione**, indirizzo, controllo e vigilanza"},
  {h:"Le aziende", t:"la **gestione** dei servizi"}]},
{id:"s33", tipo:"illustrata", tema:"chiaro", ill:"municipio", sopratitolo:"Nella L.R. 56/1994",
  titolo:"La delega diventa **legge**", punti:[
    {icona:"cuoremano", t:"la gestione dei **servizi sociali**"},
    {icona:"persone", t:"dai **Comuni** alle ULSS"},
    {icona:"euro", t:"con **finanziamenti specifici**", key:true}],
  etichette:{insegna:"Comuni", dx:{t:"Delega alle ULSS", key:true}}},
{id:"s34", tipo:"ciclo", tema:"chiaro", sopratitolo:"Nella L.R. 55/1994: gli strumenti dell'azienda",
  centro:"L.R. 55/1994", dcentro:"programmare e rendere conto", fasi:[
  {icona:"libro", t:"Piano generale"},
  {icona:"euro", t:"Bilanci"},
  {icona:"documento", t:"Metodica di budget", key:true},
  {icona:"cartella", t:"Contabilità", d:"economico-patrimoniale"},
  {icona:"occhio", t:"Controllo di gestione"}]},
{id:"s35", tipo:"trappola", tema:"tenue", sopratitolo:"Un classico dei quiz", righe:[
  {sb:"La 55 è la legge del riordino, la 56 quella dei conti",
   ok:"Al contrario: la 56 riordina, la 55 programma e tiene i conti"}]},
{id:"s36", tipo:"assetempo", tema:"chiaro", sopratitolo:"Non sono storia chiusa",
  da:1990, a:2020, decenni:[2000,2010,2020], tappe:[
  {anno:1994, et:"L.R. 55 e 56"},
  {anno:2016, et:"L.R. 19 — modifica e richiama la 56", key:true}]},
{id:"s37", tipo:"titolo", tema:"profondo",
  titolo:"Trent'anni dopo,<br>le fondamenta<br>sono quelle del **1994**."},

// --- 6 · la filosofia di governo
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"Tre idee, tre principi guida", box:[
  {n:"1", t:"Integrazione", d:"socio-sanitaria"},
  {n:"2", t:"Sussidiarietà", d:"decisioni vicine ai cittadini"},
  {n:"3", t:"Prossimità", d:"servizi nei territori"}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"incastro", inverti:true, sopratitolo:"Il primo principio",
  titolo:"**Integrazione**", punti:[
    {icona:"cuoremano", t:"sanità e sociale nello **stesso sistema**"},
    {icona:"persone", t:"i bisogni **non si dividono** per competenze", key:true}],
  etichette:{sx:"Sanità", dx:{t:"Sociale", key:true}, basso:"Un solo sistema"}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"livelli", sopratitolo:"Il secondo principio",
  titolo:"**Sussidiarietà**", punti:[
    {icona:"persone", t:"decisioni **vicine** ai cittadini"},
    {icona:"chat", t:"la **Conferenza dei sindaci** accanto al direttore generale", key:true}],
  etichette:{l1:"Regione", l2:"ULSS", l3:"Conferenza dei sindaci", l4:{t:"Comuni", key:true}}},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"Il terzo principio",
  titolo:"**Prossimità**", punti:[
    {icona:"persone", t:"i servizi **dove vivi**"},
    {icona:"ospedale", t:"l'ospedale resta la **fase acuta**", key:true}],
  etichette:{centro:{t:"Distretto", key:true}, comuni:"Casa", monti:"Montagna", laguna:"Laguna"}},
{id:"s42", tipo:"rete", tema:"chiaro", sopratitolo:"Un anziano non autosufficiente",
  centro:"ULSS", dcentro:"una sola regia", nodi:[
  {t:"Infermiere", icona:"cuoremano"}, {t:"Medico", icona:"persona"},
  {t:"Assistente sociale", icona:"persone", key:true}, {t:"Aiuto a casa", icona:"ospedale"}],
  inizio:-Math.PI/4, rx:560, ry:230},
{id:"s43", tipo:"flusso", tema:"chiaro", sopratitolo:"Il metodo che le tiene insieme", passi:[
  {icona:"libro", t:"La Regione", d:"programma e controlla"},
  {icona:"ingranaggio", t:"Le aziende", d:"gestiscono con strumenti d'impresa"},
  {icona:"occhio", t:"I risultati", d:"si misurano", key:true}]},
{id:"s44", tipo:"contatore", tema:"chiaro", sopratitolo:"Questo equilibrio ha retto",
  valori:[{n:21, t:"ULSS fino al 2016"}, {n:9, t:"ULSS dal 2017", key:true}],
  sotto:"Ma restano **socio-sanitarie**, con la Conferenza dei sindaci."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il modello socio-sanitario veneto nasce nel 1994",
   ok:"Le radici sono negli anni Settanta, coi consorzi fra Comuni"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Una storia lunga,<br>una scelta costante:<br>**tenere insieme**.",
  sotto:"Prossima lezione: la L.R. 56/1994 — le ULSS, i Comuni, la Regione."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 3.2", sottotitolo:"La L.R. 56/1994:<br>il riordino", ente:ENTE},
];
