// Contenuto delle 44 scene della lezione 1.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 1 (D.Lgs. 502/1992).
// Il testo a schermo è l'ancora, non il sottotitolo. Temi concordi con
// copione/costruisci.py: `tenue` solo sui distrattori.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const AUTONOMIE = [
 {n:"1", t:"Organizzativa"}, {n:"2", t:"Amministrativa"}, {n:"3", t:"Patrimoniale"},
 {n:"4", t:"Contabile"}, {n:"5", t:"Gestionale"}, {n:"6", t:"Tecnica"},
];

const DUE_MODELLI = {
 colonne:["26%","37%","37%"],
 intestazioni:["", "Unità sanitaria locale", "Azienda (502)"],
 righe:[
  ["Chi la guida",   "no:assemblea generale e comitato di gestione", "si:il **direttore generale**"],
  ["Nomina",         "no:consigli comunali, di fatto i partiti",      "si:la Regione"],
  ["Responsabilità", "no:collegiale, di nessuno",                    "si:personale, sui risultati"],
 ],
};

const DUE_CONTABILITA = {
 colonne:["28%","36%","36%"],
 intestazioni:["", "Finanziaria", "Economico-patrimoniale"],
 righe:[
  ["Che cosa registra", "entrate e uscite autorizzate", "costi e ricavi"],
  ["Quando",           "quando si impegna e si paga", "quando si **consumano** le risorse"],
  ["Che cosa ti dice", "se hai rispettato il bilancio", "quanto costa **produrre salute**"],
  ["Documento",        "bilancio di previsione", "**bilancio d'esercizio**"],
 ],
};

const TRE_COSE = [
 "**D.Lgs. 502/1992** — le USL diventano aziende: **ASL** e **AO**, personalità giuridica pubblica",
 "**Direttore generale** — nominato dalla Regione, contratto di diritto privato, 3-5 anni",
 "**Contabilità economico-patrimoniale** — principio della **competenza economica**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · Legislazione sanitaria nazionale",
  titolo:"Primo principio:<br>l'aziendalizzazione", sottotitolo:"Lezione 1.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Un ospedale pubblico, prima del 1992", box:[
  {t:"Nessun bilancio suo"}, {t:"Nessun responsabile dei conti"}, {t:"Un pezzo del Comune"}]},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Una parola che fece discutere",
  testo:"Non vendere la salute: dare a chi la gestisce gli **strumenti di un'impresa**.",
  sotto:"E le responsabilità che ne derivano."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Il primo principio<br>del 502:<br>**l'aziendalizzazione**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Le USL diventano **aziende**"},
  {t:"**Personalità giuridica** e autonomia"},
  {t:"Chi comanda: il **direttore generale**"},
  {t:"Come si tengono i **conti**"}]},

// --- 3 · da USL ad azienda
{id:"s06", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il punto debole della 833",
  da:{h:"Prima", t:"USL, struttura del Comune"},
  a:{h:"Dal 502", t:"**Azienda sanitaria locale**"},
  sotto:"Dal Comune alla Regione: senza personalità giuridica → con personalità giuridica."},
{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"Un cambio di natura, non di nome", voci:[
  {icona:"cartella",  t:"Un **patrimonio** proprio"},
  {icona:"documento", t:"Un **bilancio** proprio"},
  {icona:"persone",   t:"**Organi** propri"}]},
{id:"s08", tipo:"frase", tema:"chiaro", sopratitolo:"Cambia anche la dimensione",
  testo:"L'ambito dell'azienda coincide, di norma, con la **provincia**.",
  sotto:"Le vecchie USL, spesso piccolissime, vengono accorpate."},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Nel Veneto", col:[
  {h:"Il nome", t:"**ULSS**", grande:true},
  {h:"La natura giuridica", t:"la stessa: **azienda sanitaria locale**", grande:true}],
  sotto:"Le ritroverai nel modulo 2."},
{id:"s10", tipo:"norma", tema:"chiaro", etichetta:"Nasce una seconda figura", sigla:"AO",
  testo:"L'**azienda ospedaliera**: i grandi ospedali di rilievo nazionale e alta specializzazione, scorporati e autonomi."},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Due tipi di azienda, due ruoli", col:[
  {h:"Azienda sanitaria locale", t:"**tutela la salute** di chi risiede sul territorio"},
  {h:"Azienda ospedaliera", t:"**eroga** prestazioni ospedaliere di alta complessità"}]},
{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"Chi **garantisce** la salute<br>non è per forza<br>chi **eroga** ogni prestazione.",
  sotto:"È la base della lezione 1.3."},

// --- 4 · personalità e autonomia
{id:"s13", tipo:"frase", tema:"chiaro", sopratitolo:"Diventare azienda",
  testo:"**Personalità giuridica pubblica**: un soggetto di diritto che agisce in nome proprio."},
{id:"s14", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"Che cosa può fare", celle:[
  {t:"Stipulare **contratti**"}, {t:"Essere titolare di **beni**"},
  {t:"Stare in **giudizio**"}, {t:"Rispondere con il **proprio patrimonio**"}]},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Le sei autonomie dell'azienda", celle:AUTONOMIE},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Due autonomie da capire", col:[
  {h:"Patrimoniale", t:"beni suoi: **ospedali, attrezzature, immobili**"},
  {h:"Contabile", t:"un **bilancio proprio**, separato da quello della Regione"}]},
{id:"s17", tipo:"assetempo", tema:"chiaro", sopratitolo:"Le due tappe dell'azienda",
  da:1990, a:2001, decenni:[1990,2000], tappe:[
  {anno:1992, et:"D.Lgs. 502 — nasce l'azienda"},
  {anno:1993, et:"D.Lgs. 517 — correttivo"},
  {anno:1999, et:"D.Lgs. 229 — autonomia imprenditoriale", key:true}]},
{id:"s18", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'organizzazione interna",
  da:{h:"Non più", t:"una regola uguale per tutti"},
  a:{h:"Ma", t:"l'**atto aziendale**"},
  sotto:"Atto di **diritto privato**, adottato dal direttore generale (D.Lgs. 229/1999)."},
{id:"s19", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore", righe:[
  {sb:"Autonomia imprenditoriale = scopo di lucro",
   ok:"L'azienda resta un ente pubblico: il fine è la tutela della salute"}]},

// --- 5 · il direttore generale
{id:"s20", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Chi guida l'azienda",
  da:{h:"Spariscono", t:"assemblea generale e comitato di gestione"},
  a:{h:"Arriva", t:"il **direttore generale**"}},
{id:"s21", tipo:"tabella", tema:"chiaro", sopratitolo:"Due modelli a confronto", ...DUE_MODELLI, chiave:[2]},
{id:"s22", tipo:"icone", tema:"chiaro", sopratitolo:"Il direttore generale", voci:[
  {icona:"certificato", t:"Nominato dalla **Regione**", d:"tra persone con esperienza di direzione"},
  {icona:"ingranaggio", t:"**Tutti i poteri** di gestione"},
  {icona:"giudice",     t:"La **rappresentanza legale**"}]},
{id:"s23", tipo:"scadenza", tema:"chiaro", sopratitolo:"Il contratto: diritto privato, esclusivo, a termine",
  max:6, banda:[3,5], inizio:"nomina", fine:"",
  tappe:[{a:3, v:"3 anni", t:"durata **minima**"}, {a:5, v:"5 anni", t:"durata **massima**", key:true}]},
{id:"s24", tipo:"catena", tema:"chiaro", sopratitolo:"La verifica dei risultati", passi:[
  {t:"Nomina"},
  {t:"18 mesi", d:"la Regione verifica i risultati"},
  {t:"Grave disavanzo o violazione di legge", d:"", key:true},
  {t:"Decadenza"}]},
{id:"s25", tipo:"albero", tema:"chiaro", sopratitolo:"Chi nomina chi",
  radice:"**Regione** → nomina il **direttore generale**", rami:[
  {cond:"nomina", esito:"**Direttore amministrativo**"},
  {cond:"nomina", esito:"**Direttore sanitario**"}]},
{id:"s26", tipo:"norma", tema:"chiaro", etichetta:"Organo di vigilanza", sigla:"Collegio",
  testo:"Dei **revisori** nel 1992, **sindacale** dal 1999: regolarità amministrativa e contabile."},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Dal 2016",
  testo:"Un **elenco nazionale di idonei**, presso il Ministero della salute.",
  sotto:"Un filtro in più contro le nomine di pura appartenenza."},
{id:"s28", tipo:"titolo", tema:"profondo",
  titolo:"Un solo responsabile.<br>Poteri veri.<br>**Obiettivi misurabili.**"},

// --- 6 · i conti
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"L'ultimo pilastro",
  testo:"Le USL usavano la **contabilità finanziaria**.",
  sotto:"Quella tipica della pubblica amministrazione."},
{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Due contabilità", ...DUE_CONTABILITA, chiave:[]},
{id:"s31", tipo:"tabella", tema:"chiaro", sopratitolo:"Il 502 porta nelle aziende quella delle imprese", ...DUE_CONTABILITA, chiave:[1,2,3]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Il bilancio d'esercizio", col:[
  {h:"Stato patrimoniale", t:"che cosa l'azienda **possiede** e che cosa **deve**"},
  {h:"Conto economico", t:"**costi e ricavi** dell'anno, e il risultato"}]},
{id:"s33", tipo:"frase", tema:"chiaro", sopratitolo:"Il principio che regge tutto",
  testo:"**Competenza economica**: si registra quando la risorsa si **consuma**, non quando si paga."},
{id:"s34", tipo:"barre", tema:"chiaro", sopratitolo:"Un'apparecchiatura da 1 milione, che dura 10 anni — costo nell'anno 1",
  max:1150000, barre:[
  {et:"Contabilità finanziaria", v:1000000, lab:"1.000.000 €", colore:"#D70328", nota:"tutto nell'anno dell'acquisto"},
  {et:"Economico-patrimoniale", v:100000, lab:"100.000 €", nota:"ogni anno, per 10 anni"}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"L'ammortamento",
  testo:"**100.000 € l'anno**, per dieci anni.",
  sotto:"Il bilancio racconta quanto costa davvero produrre salute, anno per anno."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Contabilità analitica: per centri di costo", celle:[
  {t:"Ogni **reparto**"}, {t:"Ogni **servizio**"}, {t:"Ogni **prestazione**"}]},
{id:"s37", tipo:"titolo", tema:"profondo",
  titolo:"Un bilancio suo,<br>un **risultato suo**.",
  sotto:"La risposta al ripiano a piè di lista."},

// --- 7 · le tre cose
{id:"s38", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s39", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore tipico", righe:[
  {sb:"Autonomia imprenditoriale: D.Lgs. 502/1992",
   ok:"Autonomia imprenditoriale e atto aziendale: D.Lgs. 229/1999"}]},
{id:"s40", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a chi nomina chi", righe:[
  {sb:"Il direttore sanitario lo nomina la Regione",
   ok:"Regione → direttore generale → direttore amministrativo e sanitario"}]},
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},

// --- 8 · chiusura
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Un responsabile.<br>Un bilancio.<br>**Conti da rendere.**"},

{id:"s44", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"1.3", sottotitolo:"Indirizzo, gestione<br>e quasi-mercato", ente:ENTE},
];
