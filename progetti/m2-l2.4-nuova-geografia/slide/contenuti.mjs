// Contenuto delle 50 scene della lezione 2.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 2. La nuova geografia
// sanitaria: L.R. Veneto 19/2016 art. 14 (soppressioni e incorporazioni dal
// 1/1/2017), artt. 16, 18-22, 26, 29, 31; AOU di Padova e Verona, IOV (PSSR 2019-2023).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const MAPPA = {
 colonne:["30%","25%","45%"],
 intestazioni:["Nuova ULSS", "Era", "Incorpora"],
 righe:[
  ["1 Dolomiti",          "ULSS 1 Belluno",   "Feltre"],
  ["2 Marca trevigiana",  "ULSS 9 Treviso",   "Pieve di Soligo · Asolo"],
  ["3 Serenissima",       "ULSS 12 Veneziana","Mirano · Chioggia"],
  ["4 Veneto Orientale",  "ULSS 10",          "— nessuna"],
  ["5 Polesana",          "ULSS 18 Rovigo",   "Adria"],
  ["6 Euganea",           "ULSS 16 Padova",   "Alta Padovana · Este"],
  ["7 Pedemontana",       "ULSS 3 Bassano",   "Alto Vicentino"],
  ["8 Berica",            "ULSS 6 Vicenza",   "Ovest Vicentino"],
  ["9 Scaligera",         "ULSS 20 Verona",   "Legnago · Bussolengo"],
 ],
};

const SOPPRESSE = [
 {t:"Feltre"}, {t:"Alto Vicentino"}, {t:"Ovest Vicentino"}, {t:"Pieve di Soligo"},
 {t:"Asolo"}, {t:"Mirano"}, {t:"Chioggia"}, {t:"Alta Padovana"},
 {t:"Este"}, {t:"Adria"}, {t:"Legnago"}, {t:"Bussolengo"},
];

const TRE_COSE = [
 "Dal **1° gennaio 2017** le ULSS passano da **21 a 9**: 12 soppresse, incorporate nelle altre 9",
 "**1** Dolomiti · **2** Marca trevigiana · **3** Serenissima · **4** Veneto Orientale · **5** Polesana · **6** Euganea · **7** Pedemontana · **8** Berica · **9** Scaligera",
 "Fuori dalla mappa delle ULSS: **AOU Padova**, **AOUI Verona**, **IOV**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Il sistema sanitario regionale del Veneto",
  titolo:"La nuova geografia<br>sanitaria", sottotitolo:"Lezione 2.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"frase", tema:"chiaro", sopratitolo:"A Feltre, a Chioggia, a Legnago",
  testo:"Dal 1° gennaio 2017 il tuo datore di lavoro **ha cambiato nome**.",
  sotto:"Senza trasferimenti e senza firme: l'ha deciso una legge."},
{id:"s03", tipo:"norma", tema:"chiaro", etichetta:"L.R. 19/2016 · articolo 14", sigla:"21 → 9",
  testo:"La nuova **mappa sanitaria** del Veneto."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Chi ha incorporato chi.<br>Dove sta la sede.<br>**Come si chiama oggi.**"},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Tre passaggi", voci:[
  {t:"Il **meccanismo**: da 21 a 9"},
  {t:"Le **nove ULSS**, una per una"},
  {t:"Fuori dalla mappa: **AOU** e **IOV**"}]},

// --- 3 · il meccanismo
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Due date da non confondere", col:[
  {h:"25 ottobre 2016", t:"la **legge**", grande:true},
  {h:"1° gennaio 2017", t:"il **nuovo assetto**", grande:true}]},
{id:"s07", tipo:"catena", tema:"chiaro", sopratitolo:"Soppressione con incorporazione", passi:[
  {t:"12 ULSS soppresse"},
  {t:"9 ULSS restano", d:"e cambiano nome"},
  {t:"Incorporano le soppresse", d:"del loro territorio", key:true}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Le dodici soppresse", celle:SOPPRESSE},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"Un dettaglio da quiz",
  testo:"Le incorporanti **mantengono la sede legale**.",
  sotto:"Treviso resta a Treviso, Bassano resta a Bassano."},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Cambia la numerazione", col:[
  {h:"Prima", t:"da **1 a 22**", grande:true},
  {h:"Dal 2017", t:"da **1 a 9**, con un **nome**", grande:true}]},
{id:"s11", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Incorporazione vuol dire chiusura dei servizi",
   ok:"Ospedali, distretti e sportelli restano, e passano all'incorporante"}]},

// --- 4 · le nove ULSS
{id:"s12", tipo:"tabella", tema:"chiaro", sopratitolo:"Le nove ULSS, da nord", ...MAPPA, chiave:[0]},
{id:"s13", tipo:"tabella", tema:"chiaro", sopratitolo:"Le nove ULSS, da nord", ...MAPPA, chiave:[1]},
{id:"s14", tipo:"tabella", tema:"chiaro", sopratitolo:"Le nove ULSS, da nord", ...MAPPA, chiave:[2]},
{id:"s15", tipo:"tabella", tema:"chiaro", sopratitolo:"Le nove ULSS, da nord", ...MAPPA, chiave:[3]},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Prima eccezione: la provincia di Venezia", col:[
  {h:"ULSS 3", t:"**Serenissima** · sede a Venezia", grande:true},
  {h:"ULSS 4", t:"**Veneto Orientale** · sede a San Donà di Piave", grande:true}]},
{id:"s17", tipo:"tabella", tema:"chiaro", sopratitolo:"Le nove ULSS, da nord", ...MAPPA, chiave:[4]},
{id:"s18", tipo:"tabella", tema:"chiaro", sopratitolo:"Le nove ULSS, da nord", ...MAPPA, chiave:[5]},
{id:"s19", tipo:"tabella", tema:"chiaro", sopratitolo:"Le nove ULSS, da nord", ...MAPPA, chiave:[6]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Seconda eccezione: la provincia di Vicenza", col:[
  {h:"ULSS 7", t:"**Pedemontana** · sede a Bassano del Grappa", grande:true},
  {h:"ULSS 8", t:"**Berica** · sede a Vicenza", grande:true}]},
{id:"s21", tipo:"tabella", tema:"chiaro", sopratitolo:"Le nove ULSS, da nord", ...MAPPA, chiave:[8]},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Quattro ULSS incorporano due aziende", celle:[
  {n:"2", t:"**Marca trevigiana**: Pieve di Soligo · Asolo"}, {n:"3", t:"**Serenissima**: Mirano · Chioggia"},
  {n:"6", t:"**Euganea**: Alta Padovana · Este"}, {n:"9", t:"**Scaligera**: Legnago · Bussolengo"}]},
{id:"s23", tipo:"impila", tema:"chiaro", sopratitolo:"Il conto delle soppresse",
  testa:"12 aziende soppresse", unita:"", segmenti:[
  {v:8, t:"4 ULSS × 2"}, {v:4, t:"4 ULSS × 1", chiaro:true, colore:"#A8CDBB"}]},
{id:"s24", tipo:"tabella", tema:"chiaro", sopratitolo:"I numeri ingannano",
  colonne:["30%","35%","35%"], intestazioni:["", "Vecchia ULSS", "Nuova ULSS"],
  righe:[["Numero 9", "Treviso", "Verona · Scaligera"], ["Numero 6", "Vicenza", "Padova · Euganea"]],
  chiave:[0,1]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Nove aziende, sette province.<br>Due ULSS a **Venezia**<br>e a **Vicenza**."},

// --- 5 · AOU e IOV
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Art. 14, criterio g) · tenere conto di", celle:[
  {t:"Azienda ospedaliera di **Padova**"}, {t:"Azienda ospedaliera di **Verona**"},
  {t:"**IOV**"}, {t:"**Azienda Zero**"}]},
{id:"s27", tipo:"norma", tema:"chiaro", etichetta:"Assistenza, didattica e ricerca · nel modulo 4", sigla:"AOU Padova",
  testo:"L'**Azienda Ospedale-Università** di Padova."},
{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Con l'Università di Verona", sigla:"AOUI Verona",
  testo:"L'Azienda Ospedaliera **Universitaria Integrata**. Con Padova: **hub di eccellenza** regionali."},
{id:"s29", tipo:"norma", tema:"chiaro", etichetta:"Istituto di ricovero e cura a carattere scientifico", sigla:"IOV",
  testo:"L'**Istituto Oncologico Veneto**: riferimento regionale per la patologia oncologica."},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Dentro il territorio, ma non parte della ULSS", col:[
  {h:"ULSS", t:"un **territorio** con i suoi residenti"},
  {h:"AOU e IOV", t:"aziende **autonome**, con i loro organi"}]},
{id:"s31", tipo:"piramide", tema:"chiaro", sopratitolo:"Il quadro complessivo", strati:[
  {t:"Azienda Zero", d:"le funzioni comuni"},
  {t:"2 AOU e lo IOV", d:"alta specializzazione e ricerca"},
  {t:"9 ULSS", d:"il territorio e i residenti"}]},
{id:"s32", tipo:"barre", tema:"chiaro", sopratitolo:"Abitanti per azienda, in media",
  unita:"", max:600, barre:[
  {et:"Media italiana", v:502, lab:"circa 502.000"},
  {et:"ULSS del Veneto", v:545, lab:"circa 545.000", colore:"#D70328"}]},

// --- 6 · dopo il 1° gennaio 2017
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Art. 14, comma 6",
  testo:"Ogni riferimento ai vecchi bacini vale per i **nuovi ambiti**."},
{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 26 · le vecchie ULSS", passi:[
  {t:"Diventano distretti"},
  {t:"Coordinano ospedale e territorio"},
  {t:"Lezione 2.6", key:true}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Art. 14, comma 5",
  testo:"Una rete **capillare** di sportelli e servizi."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, sopratitolo:"Art. 14, comma 8 · modelli particolari, decisi dalla Giunta, per", celle:[
  {t:"**flussi turistici**"}, {t:"flussi dei **pazienti**"}, {t:"**emergenza-urgenza**"}]},
{id:"s37", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 14, comma 7 · i risparmi della fusione", passi:[
  {t:"Consuntivo 2017"},
  {t:"Area e Azienda Zero", d:"quantificano i risparmi"},
  {t:"Piano di interventi", d:"per servizi omogenei", key:true}]},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"Dove vanno i risparmi",
  testo:"Tornano ai **cittadini dello stesso territorio**."},
{id:"s39", tipo:"scala", tema:"chiaro", sopratitolo:"Art. 16 · la verifica", gradini:[
  {t:"Osservatori aziendali"}, {t:"Osservatorio regionale"},
  {t:"Verifica della Giunta", d:"dopo il primo triennio", key:true}]},
{id:"s40", tipo:"titolo", tema:"profondo",
  titolo:"Una mappa<br>**sottoposta a verifica**."},

// --- 7 · le direzioni
{id:"s41", tipo:"tre", tema:"chiaro", sopratitolo:"Art. 31 · gli organi di ULSS e aziende ospedaliere", box:[
  {n:"1", t:"Direttore generale"}, {n:"2", t:"Collegio di direzione"}, {n:"3", t:"Collegio sindacale"}]},
{id:"s42", tipo:"numero", tema:"chiaro", sopratitolo:"Direttore sanitario, amministrativo, dei servizi socio-sanitari",
  cifra:"2", testo:"**mandati consecutivi** al massimo, nella stessa azienda"},
{id:"s43", tipo:"confronto", tema:"chiaro", sopratitolo:"Per le aziende più grandi", col:[
  {h:"Oltre 3.000 posti letto", t:"un **coordinatore sanitario**"},
  {h:"Oltre 500.000 abitanti", t:"un **coordinatore amministrativo**"}]},
{id:"s44", tipo:"scadenza", tema:"chiaro", sopratitolo:"Art. 29 · il commissario, nominato dal Presidente della Giunta",
  max:2.4, banda:[0,2], inizio:"nomina", fine:"",
  tappe:[{a:1, v:"1 anno", t:"durata"}, {a:2, v:"2 anni", t:"con **un solo** rinnovo", key:true}]},

// --- 8 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore", righe:[
  {sb:"Il Veneto Orientale incorpora l'ULSS di Chioggia",
   ok:"Non incorpora nessuna azienda: Chioggia va alla Serenissima"}]},

// --- 9 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Dodici soppresse, nove incorporanti,<br>**sette province**.",
  sotto:"Prossima lezione: la rete ospedaliera hub and spoke."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 2.5", sottotitolo:"La rete ospedaliera<br>hub and spoke", ente:ENTE},
];
