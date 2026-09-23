// Contenuto delle 45 scene della lezione 1.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 1. I LEA: D.Lgs.
// 229/1999, DPCM 29/11/2001, DPCM 12/1/2017. Il visual chiave sono le tre
// macroaree, rivelate una alla volta.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const AREE = [
 {icona:"scudo",    t:"**Prevenzione collettiva** e sanità pubblica", d:"vaccinazioni, screening, sicurezza alimentare, veterinaria, lavoro"},
 {icona:"persone",  t:"**Assistenza distrettuale**", d:"MMG e PLS, farmaceutica, specialistica, domiciliare, sociosanitaria"},
 {icona:"ospedale", t:"**Assistenza ospedaliera**", d:"pronto soccorso, ricoveri, day hospital e day surgery, riabilitazione"},
];

const ESCLUSIONI = [
 {t:"Senza **necessità assistenziale** tutelata", d:"es. chirurgia estetica non legata a malattia"},
 {t:"Senza **efficacia** dimostrata, o **inappropriate**", d:"il paziente non ne trarrebbe beneficio"},
 {t:"Non **economiche**", d:"se c'è un'alternativa ugualmente efficace e meno costosa"},
];

const TRE_COSE = [
 "**LEA**: introdotti dal **D.Lgs. 229/1999** — elenchi: **DPCM 2001**, vigente **DPCM 12/1/2017**",
 "Tre macroaree: **prevenzione collettiva**, **distrettuale**, **ospedaliera**",
 "Esclusi: senza necessità, senza efficacia o inappropriati, non economici",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · Legislazione sanitaria nazionale",
  titolo:"I livelli essenziali<br>di assistenza", sottotitolo:"Lezione 1.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Universale",
  da:{h:"Non vuol dire", t:"illimitato"},
  a:{h:"Allora", t:"che cosa ti è **garantito**?"}},
{id:"s03", tipo:"norma", tema:"chiaro", etichetta:"Livelli essenziali di assistenza", sigla:"LEA",
  testo:"Le prestazioni che il servizio pubblico deve assicurare a **ogni cittadino, in ogni Regione**."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Il diritto alla salute<br>smette di essere un principio<br>e diventa **una lista**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Tre passaggi", voci:[
  {t:"Da dove **nascono** i LEA"},
  {t:"Le **tre grandi aree**"},
  {t:"Che cosa entra, che cosa resta fuori: l'**appropriatezza**"}]},

// --- 3 · genesi
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"D.Lgs. 502/1992",
  testo:"«Livelli **uniformi** di assistenza».",
  sotto:"Un'espressione generica, senza un contenuto preciso."},
{id:"s07", tipo:"frase", tema:"chiaro", sopratitolo:"Senza un elenco",
  testo:"Serviva un **pavimento comune**, uguale in tutto il Paese.",
  sotto:"Ogni Regione interpretava il diritto a modo suo."},
{id:"s08", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 229/1999 riscrive l'art. 1 del 502", sigla:"LEA",
  testo:"Livelli **essenziali e uniformi** di assistenza, definiti dal **Piano Sanitario Nazionale**."},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"I principi che li ispirano", celle:[
  {t:"**Dignità** della persona"}, {t:"**Bisogno** di salute"}, {t:"**Equità** nell'accesso"},
  {t:"**Qualità** delle cure"}, {t:"**Appropriatezza**"}, {t:"**Economicità**"}]},
{id:"s10", tipo:"assetempo", tema:"chiaro", attive:[0,1], sopratitolo:"Gli elenchi",
  da:1997, a:2019, decenni:[2000,2010], tappe:[
  {anno:1999, et:"D.Lgs. 229 — nascono i LEA"},
  {anno:2001, et:"DPCM 29 novembre — il primo elenco"}]},
{id:"s11", tipo:"assetempo", tema:"chiaro", sopratitolo:"Gli elenchi",
  da:1997, a:2019, decenni:[2000,2010], tappe:[
  {anno:1999, et:"D.Lgs. 229 — nascono i LEA"},
  {anno:2001, et:"DPCM 29 novembre — il primo elenco"},
  {anno:2017, et:"DPCM 12 gennaio — i nuovi LEA", key:true}]},
{id:"s12", tipo:"norma", tema:"chiaro", etichetta:"Costituzione, art. 117 · riforma del 2001", sigla:"Titolo V",
  testo:"Livelli essenziali delle prestazioni: **competenza esclusiva dello Stato**."},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Lo Stato fissa **che cosa**.<br>Le Regioni decidono **come**.",
  sotto:"Possono aggiungere, con risorse proprie. Mai togliere."},

// --- 4 · le tre aree
{id:"s14", tipo:"icone", tema:"chiaro", attive:[0], sopratitolo:"Le tre macroaree", voci:AREE},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Prevenzione collettiva e sanità pubblica", celle:[
  {t:"Vaccinazioni"}, {t:"Screening"}, {t:"Sicurezza **alimentare**"},
  {t:"Sanità **veterinaria**"}, {t:"Salute nei luoghi di **lavoro**"}, {t:"Ambienti di **vita**"}]},
{id:"s16", tipo:"frase", tema:"chiaro", sopratitolo:"Un esempio",
  testo:"Le vaccinazioni del calendario nazionale **sono LEA**.",
  sotto:"Nessuna Regione può decidere di non offrirle."},
{id:"s17", tipo:"icone", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre macroaree", voci:AREE},
{id:"s18", tipo:"frase", tema:"chiaro", sopratitolo:"Il luogo dell'assistenza distrettuale",
  testo:"Il **distretto**.",
  sotto:"Nel Veneto: il distretto potenziato, nel modulo 2."},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Anche l'assistenza sociosanitaria", celle:[
  {t:"Persone **non autosufficienti**"}, {t:"Persone con **disabilità**"},
  {t:"**Disturbi mentali**"}, {t:"**Dipendenze**"}]},
{id:"s20", tipo:"icone", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre macroaree", voci:AREE},
{id:"s21", tipo:"frase", tema:"chiaro", sopratitolo:"Il ponte con la lezione 1.3",
  testo:"I ricoveri pagati con i **DRG** sono prestazioni dei **LEA ospedalieri**."},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione ai nomi", righe:[
  {sb:"Assistenza sanitaria collettiva in ambiente di vita e di lavoro (2001)",
   ok:"Prevenzione collettiva e sanità pubblica (2017) — il contenuto è simile"}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"Tutele per categorie particolari",
  testo:"Malattie **rare**, **croniche** e **invalidanti**: esenzione dal ticket.",
  sotto:"Per le prestazioni collegate alla patologia."},
{id:"s24", tipo:"piramide", tema:"chiaro", sopratitolo:"In quest'ordine: dalla popolazione all'ospedale", strati:[
  {t:"Prevenzione collettiva", d:"la popolazione"},
  {t:"Assistenza distrettuale", d:"il territorio"},
  {t:"Assistenza ospedaliera", d:"l'ospedale"}]},

// --- 5 · l'appropriatezza
{id:"s25", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0], sopratitolo:"Che cosa resta fuori", voci:ESCLUSIONI},
{id:"s26", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1], sopratitolo:"Che cosa resta fuori", voci:ESCLUSIONI},
{id:"s27", tipo:"elenco", tema:"chiaro", numerato:true, attive:[0,1,2], sopratitolo:"Che cosa resta fuori", voci:ESCLUSIONI},
{id:"s28", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La medicina basata sulle prove, nella legge",
  da:{h:"Non perché", t:"è richiesta"},
  a:{h:"Ma perché", t:"**funziona**"}},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due facce dell'appropriatezza", col:[
  {h:"Clinica", t:"la prestazione giusta, al **paziente** giusto, nel **momento** giusto"},
  {h:"Organizzativa", t:"nel **posto** giusto, con il **livello di assistenza** giusto"}]},
{id:"s30", tipo:"tabella", tema:"chiaro", sopratitolo:"Un esempio: l'intervento di cataratta",
  colonne:["34%","33%","33%"], intestazioni:["", "Ricovero ordinario", "Regime ambulatoriale"], righe:[
  ["Intervento", "si:corretto", "si:corretto"],
  ["Setting",    "no:inappropriato", "si:appropriato"]], chiave:[1]},
{id:"s31", tipo:"frase", tema:"chiaro", sopratitolo:"Ad alto rischio di inappropriatezza",
  testo:"Ammessi solo a **certe condizioni**, o spostati su un livello **meno intensivo**."},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un errore diffuso", righe:[
  {sb:"Appropriatezza = risparmio",
   ok:"Appropriatezza = dare ciò che serve. A volte costa di più"}]},

// --- 6 · diritti e sostenibilità
{id:"s33", tipo:"confronto", tema:"chiaro", attive:[0], sopratitolo:"Due esigenze opposte", col:[
  {h:"Il diritto", t:"garantito **in ogni Regione**: nessuna può negarlo", grande:true},
  {h:"La sostenibilità", t:"ogni prestazione aggiunta deve trovare **copertura**", grande:true}]},
{id:"s34", tipo:"catena", tema:"chiaro", sopratitolo:"Diritti e risorse, insieme", passi:[
  {t:"Nuova prestazione nei LEA"}, {t:"Costo stimato"},
  {t:"Copertura nel fondo sanitario", key:true}]},
{id:"s35", tipo:"catena", tema:"chiaro", sopratitolo:"In linea di principio", passi:[
  {t:"Che cosa garantire", d:"i LEA"},
  {t:"Quante risorse servono", d:"il finanziamento", key:true}]},
{id:"s36", tipo:"norma", tema:"chiaro", etichetta:"Presso il Ministero della salute", sigla:"Commissione LEA",
  testo:"Commissione nazionale per l'aggiornamento: **ogni anno**."},
{id:"s37", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il monitoraggio delle Regioni",
  da:{h:"Prima", t:"griglia LEA"},
  a:{h:"Oggi", t:"**Nuovo Sistema di Garanzia**"},
  sotto:"Indicatori per ciascuna delle tre macroaree."},
{id:"s38", tipo:"catena", tema:"chiaro", sopratitolo:"Una Regione che non garantisce i LEA", passi:[
  {t:"Inadempiente"}, {t:"Perde una quota del finanziamento"},
  {t:"Se è in disavanzo: piano di rientro", d:"lezione 1.6", key:true}]},
{id:"s39", tipo:"titolo", tema:"profondo",
  titolo:"Un diritto universale,<br>con un contenuto<br>**definito, misurabile, da finanziare**."},

// --- 7 · le tre cose
{id:"s40", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore", righe:[
  {sb:"I LEA li fissa ogni Regione",
   ok:"Li fissa lo Stato (competenza esclusiva); le Regioni possono solo aggiungere"}]},
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},

// --- 8 · chiusura
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"I LEA: il diritto alla salute,<br>**tradotto in elenco**."},

{id:"s45", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"1.6", sottotitolo:"Governance<br>e finanziamento", ente:ENTE},
];
