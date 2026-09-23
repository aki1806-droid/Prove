// Contenuto delle 49 scene della lezione 1.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 1 (D.Lgs. 502/1992).
// Il testo a schermo è l'ancora, non il sottotitolo: non ripete mai una frase
// intera del parlato (STANDARD §5). I numeri a schermo sono in cifre.
// Il tema di ogni scena concorda con copione/costruisci.py: `tenue` solo sulle
// slide degli errori (i distrattori, l'equivoco, lottizzazione).

const PRINCIPI = [
 {icona:"persone",  t:"**Universalità**", d:"tutta la popolazione, senza eccezioni"},
 {icona:"bilancia", t:"**Uguaglianza**",  d:"a parità di condizioni, senza distinzioni individuali o sociali"},
 {icona:"scudo",    t:"**Globalità**",    d:"prevenzione · cura · riabilitazione"},
];

// Prima e dopo la 833. Il segno (× / ✓) porta il giudizio insieme alla
// parola, mai il colore da solo.
const MUTUE_SSN = {
 colonne:["24%","38%","38%"],
 intestazioni:["", "Le mutue", "La legge 833"],
 righe:[
  ["Chi è coperto",      "no:chi è iscritto alla cassa della propria categoria", "si:tutta la popolazione"],
  ["Su che cosa<br>si fonda", "no:il contratto di lavoro", "si:la cittadinanza"],
  ["Le prestazioni",     "no:diverse da mutua a mutua",   "si:uguali per tutti"],
 ],
};

const CICLO = [
 {t:"Le USL spendono", d:"oltre il fondo"},
 {t:"Disavanzo", d:"la spesa supera le risorse"},
 {t:"Lo Stato ripiana", d:"per legge, a consuntivo"},
 {t:"Il ciclo ricomincia", d:"nessuna conseguenza per chi ha speso", key:true},
];

const TRE_COSE = [
 "**L. 833/1978** — il SSN: universalità, uguaglianza, globalità",
 "**Ripiano a piè di lista** — deresponsabilizzazione e azzardo morale",
 "**Maastricht** (feb.) → **L. 421** (ott.) → **D.Lgs. 502** (dic.) — tutto nel 1992",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · Legislazione sanitaria nazionale",
  titolo:"Dalla 833<br>alla crisi", sottotitolo:"Perché serviva la riforma · Lezione 1.1",
  ente:"CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità"},

// --- 1 · aggancio
{id:"s02", tipo:"numero", tema:"chiaro", sopratitolo:"Una scelta coraggiosa",
  cifra:"1978", testo:"Nasce il **Servizio Sanitario Nazionale**"},
{id:"s03", tipo:"frase", tema:"chiaro", sopratitolo:"Quattordici anni dopo",
  testo:"L'idea regge.<br>**La macchina no.**",
  sotto:"Nel 1992 una riforma ne cambia il motore."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Che cosa<br>si era **rotto**?",
  sotto:"Senza questa domanda, il 502 è un elenco di articoli."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Tre passaggi", voci:[
  {t:"Che cosa ha costruito la **legge 833**"},
  {t:"Perché la **spesa** è andata fuori controllo"},
  {t:"Che cosa ha imposto la **svolta del 1992**"}]},

// --- 3 · la legge 833
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Legge · 23 dicembre 1978", sigla:"833/1978",
  testo:"Istituisce il **Servizio Sanitario Nazionale**, in attuazione dell'art. 32 della Costituzione."},
{id:"s07", tipo:"tabella", tema:"chiaro", sopratitolo:"Prima e dopo la 833",
  ...MUTUE_SSN, chiave:[]},
{id:"s08", tipo:"tabella", tema:"chiaro", sopratitolo:"Prima e dopo la 833",
  ...MUTUE_SSN, chiave:[0,1]},
{id:"s09", tipo:"icone", tema:"chiaro", attive:[0], sopratitolo:"I tre principi della 833", voci:PRINCIPI},
{id:"s10", tipo:"icone", tema:"chiaro", attive:[0,1], sopratitolo:"I tre principi della 833", voci:PRINCIPI},
{id:"s11", tipo:"icone", tema:"chiaro", attive:[0,1,2], sopratitolo:"I tre principi della 833", voci:PRINCIPI},
{id:"s12", tipo:"titolo", tema:"profondo",
  titolo:"Universalità.<br>Uguaglianza.<br>**Globalità.**",
  sotto:"L'eredità della 833 che nessuna riforma ha cancellato."},

// --- 4 · tre livelli e le USL
// La piramide disegna in SVG: niente ** nei testi degli strati (MASTER §5,
// trappola 1 — il markup dentro un <text> SVG non esiste).
{id:"s13", tipo:"piramide", tema:"chiaro", sopratitolo:"Un sistema su tre livelli", strati:[
  {t:"Stato", d:"programma (Piano Sanitario Nazionale) e ripartisce"},
  {t:"Regioni", d:"legiferano e programmano sul territorio"},
  {t:"Unità sanitarie locali", d:"gestiscono i servizi"}]},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Chi gestisce davvero",
  testo:"La gestione concreta passa alle **unità sanitarie locali**.",
  sotto:"Le USL: il livello più vicino al cittadino."},
{id:"s15", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il punto delicato",
  da:{h:"Non erano", t:"enti autonomi"},
  a:{h:"Erano", t:"strutture operative dei **Comuni**"},
  sotto:"Singoli o associati, e **senza personalità giuridica** propria."},
{id:"s16", tipo:"catena", tema:"chiaro", sopratitolo:"Chi guidava le USL", passi:[
  {t:"Consigli comunali"},
  {t:"Assemblea generale"},
  {t:"Comitato di gestione"},
  {t:"La direzione della sanità locale", d:"nominata dalla politica", key:true}]},
{id:"s17", tipo:"frase", tema:"tenue", sopratitolo:"Il fenomeno ha un nome",
  testo:"**Lottizzazione.**",
  sotto:"Incarichi spartiti tra i partiti: l'appartenenza prima della competenza."},
{id:"s18", tipo:"titolo", tema:"profondo",
  titolo:"Chi gestisce non risponde<br>dei **risultati**.",
  sotto:"Risponde a chi lo ha nominato."},

// --- 5 · la spesa
{id:"s19", tipo:"catena", tema:"chiaro", sopratitolo:"Il percorso delle risorse", passi:[
  {t:"Stato"},
  {t:"Fondo Sanitario Nazionale", d:"istituito dalla 833", key:true},
  {t:"Regioni"},
  {t:"Unità sanitarie locali"}]},
{id:"s20", tipo:"frase", tema:"chiaro", sopratitolo:"Il fondo",
  testo:"Sulla carta, un **tetto**.",
  sotto:"Nella realtà la spesa corre più veloce, anno dopo anno."},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"La spesa storica", col:[
  {h:"Chi l'anno prima", t:"ha speso **di più**", grande:true},
  {h:"L'anno dopo", t:"riceve **di più**", grande:true}],
  sotto:"Risparmiare non conveniva a nessuno."},
{id:"s22", tipo:"icone", tema:"chiaro", sopratitolo:"La domanda cresce da sola", voci:[
  {icona:"persona",     t:"La popolazione **invecchia**"},
  {icona:"ingranaggio", t:"La tecnologia **costa di più**"},
  {icona:"ospedale",    t:"Ogni servizio aperto è un **costo fisso**"}]},
{id:"s23", tipo:"numero", tema:"chiaro", sopratitolo:"I numeri",
  cifra:"5,8%", testo:"del **PIL**: la spesa sanitaria pubblica"},
{id:"s24", tipo:"barre", tema:"chiaro", sopratitolo:"La spesa sanitaria pubblica, in % del PIL",
  unita:"%", max:10, barre:[
  {et:"All'inizio", v:5.8, lab:"5,8%"},
  {et:"Alla vigilia del 1992", v:7, lab:"oltre 7%", colore:"#D70328",
   nota:"1 punto = oltre 10.000 mld di lire"}]},

// --- 6 · il ripiano a piè di lista
{id:"s25", tipo:"frase", tema:"chiaro", sopratitolo:"Il vero cuore del problema",
  testo:"Il ripiano dei disavanzi<br>**a piè di lista**."},
{id:"s26", tipo:"catena", tema:"chiaro", attive:[0,1,2], sopratitolo:"Come funzionava", passi:CICLO},
{id:"s27", tipo:"catena", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Come funzionava", passi:CICLO},
{id:"s28", tipo:"frase", tema:"chiaro", sopratitolo:"Moral hazard",
  testo:"**Azzardo morale**",
  sotto:"Se qualcun altro copre le tue perdite, smetti di essere prudente."},
{id:"s29", tipo:"frase", tema:"chiaro", sopratitolo:"Come un'assicurazione",
  testo:"che rimborsa **qualunque spesa**, senza limiti.",
  sotto:"Nessun motivo di stare attenti a quanto si spende."},
{id:"s30", tipo:"titolo", tema:"profondo",
  titolo:"Chi spende<br>**non è chi paga**.",
  sotto:"Le USL decidono la spesa, lo Stato la copre."},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione a un equivoco", righe:[
  {sb:"Il problema era l'universalismo",
   ok:"Il problema era separare la spesa dalla responsabilità di coprirla"}]},

// --- 7 · Maastricht e il 1992
{id:"s32", tipo:"norma", tema:"chiaro", etichetta:"Trattato · 7 febbraio 1992", sigla:"Maastricht",
  testo:"Le condizioni per entrare nella **moneta unica**."},
{id:"s33", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"I due parametri", box:[
  {n:"DEFICIT PUBBLICO", t:"3%", d:"del PIL, al massimo"},
  {n:"DEBITO PUBBLICO", t:"60%", d:"del PIL"}]},
{id:"s34", tipo:"barre", tema:"chiaro", sopratitolo:"Il debito pubblico, in % del PIL",
  unita:"%", max:120, barre:[
  {et:"Limite di Maastricht", v:60, lab:"60%"},
  {et:"Italia, 1992", v:103, lab:"oltre 100%", colore:"#D70328", nota:"quasi il doppio del limite"}]},
{id:"s35", tipo:"frase", tema:"chiaro", sopratitolo:"Per l'Italia di allora",
  testo:"Obiettivi **lontanissimi**.",
  sotto:"E la sanità è una delle voci che più li allontanano."},
{id:"s36", tipo:"frase", tema:"chiaro", sopratitolo:"Il vincolo europeo",
  testo:"I conti della sanità diventano **conti dello Stato** da rimettere in ordine."},
{id:"s37", tipo:"icone", tema:"chiaro", sopratitolo:"1992, un anno di crisi profonda", voci:[
  {icona:"euro",    t:"La lira esce dallo **SME**", d:"Sistema Monetario Europeo"},
  {icona:"giudice", t:"**Mani Pulite**", d:"travolge il sistema dei partiti"}]},

// --- 8 · la risposta
{id:"s38", tipo:"tre", tema:"chiaro", sopratitolo:"Legge delega 421 · 23 ottobre 1992 — quattro riordini", box:[
  {n:"1", t:"Sanità", key:true},
  {n:"2", t:"Pubblico impiego"},
  {n:"3", t:"Previdenza"},
  {n:"4", t:"Finanza territoriale"}]},
{id:"s39", tipo:"norma", tema:"chiaro", etichetta:"Decreto legislativo · 30 dicembre 1992", sigla:"502/1992",
  testo:"**Riordino della disciplina in materia sanitaria.**"},
{id:"s40", tipo:"assetempo", tema:"chiaro", sopratitolo:"Le norme, nella loro distanza vera",
  da:1975, a:2002, decenni:[1980,1990,2000], tappe:[
  {anno:1978, et:"L. 833 — nasce il SSN"},
  {anno:1992, et:"D.Lgs. 502 — il riordino", key:true},
  {anno:1993, et:"D.Lgs. 517 — correttivo"},
  {anno:1999, et:"D.Lgs. 229 — riforma Bindi"}]},
{id:"s41", tipo:"tabella", tema:"chiaro", sopratitolo:"A ogni problema, una risposta",
  colonne:["46%","54%"], intestazioni:["Il problema", "La risposta del 502"], righe:[
  ["Gestione politica",          "si:l'**azienda**"],
  ["Spesa senza freni",          "si:la **responsabilità di bilancio**"],
  ["Chi spende non è chi paga",  "si:un nuovo **patto Stato-Regioni**"]], chiave:[]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"L'universalismo **resta**.",
  sotto:"Cambia il modo di governarlo."},

// --- 9 · le tre cose che ti chiederanno
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore classico", righe:[
  {sb:"La 833 crea le aziende sanitarie",
   ok:"Crea le unità sanitarie locali: strutture dei Comuni, senza personalità giuridica"}]},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"E il distrattore, anche qui", righe:[
  {sb:"Prima il D.Lgs. 502, poi la L. 421",
   ok:"Prima la L. 421, che delega. Poi il D.Lgs. 502, che attua."}]},

// --- 10 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"La 833 ha dato un **diritto**.<br>Il 502 ha provato<br>a renderlo **sostenibile**."},

{id:"s49", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"1.2", sottotitolo:"Primo principio:<br>l'aziendalizzazione",
  ente:"CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità"},
];
