// Contenuto delle 45 scene della lezione 1.3. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 1 (D.Lgs. 502/1992).
// A schermo la sigla DRG si scrive (nel parlato è «di erre gi»).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const FUNZIONI_REGIONE = [
 {n:"1", t:"Programmazione", d:"di che cosa ha bisogno la popolazione — piano sanitario regionale"},
 {n:"2", t:"Indirizzo", d:"obiettivi delle aziende e regole di finanziamento"},
 {n:"3", t:"Controllo", d:"verifica dei risultati, anche del direttore generale"},
];

const RUOLI = {
 colonne:["24%","38%","38%"],
 intestazioni:["", "Regione", "Azienda"],
 righe:[
  ["Funzione",    "programmazione, indirizzo, controllo", "gestione ed erogazione"],
  ["Decide",      "**che cosa** fare e con quali risorse",  "**come** farlo"],
  ["Risponde di", "i conti del sistema regionale",         "gli obiettivi assegnati"],
 ],
};

const DRG_PASSI = [
 {t:"Il ricovero", d:"diagnosi, interventi, età, complicanze"},
 {t:"La SDO", d:"scheda di dimissione ospedaliera"},
 {t:"Il gruppo DRG", d:"raggruppamento omogeneo"},
 {t:"La tariffa", d:"fissa, onnicomprensiva", key:true},
];

const TRE_COSE = [
 "**Regione**: programmazione, indirizzo, controllo — **azienda**: gestione ed erogazione",
 "**Quasi-mercato**: l'ASL **acquista**, AO e privati accreditati **erogano**, pagati a prestazione",
 "**DRG**: gruppi omogenei per diagnosi e interventi — **tariffa fissa** per gruppo",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · Legislazione sanitaria nazionale",
  titolo:"Indirizzo, gestione<br>e quasi-mercato", sottotitolo:"Lezione 1.3", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Due domande", col:[
  {h:"Quanti posti letto in una provincia?", t:"una scelta di **sistema**", grande:true},
  {h:"Chi di turno stanotte in reparto?", t:"una scelta di **gestione**", grande:true}],
  sotto:"Prima del 1992, spesso, rispondeva la stessa persona: la politica."},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Il secondo principio del 502", col:[
  {h:"Il sistema", t:"alla **Regione**", grande:true},
  {h:"La gestione", t:"all'**azienda**", grande:true}],
  sotto:"La distinzione tra **indirizzo** e **gestione**."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Un mercato,<br>ma non un mercato vero:<br>il **quasi-mercato**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Tre passaggi", voci:[
  {t:"Che cosa fa la **Regione**, che cosa fa l'**azienda**"},
  {t:"Chi **acquista** e chi **eroga**"},
  {t:"Come si paga un ricovero: i **DRG**"}]},

// --- 3 · la Regione
{id:"s06", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre funzioni della Regione", box:FUNZIONI_REGIONE.map(b=>({n:b.n, t:b.t}))},
{id:"s07", tipo:"tre", tema:"chiaro", attive:[0], sopratitolo:"Le tre funzioni della Regione", box:FUNZIONI_REGIONE},
{id:"s08", tipo:"piramide", tema:"chiaro", sopratitolo:"Il piano sanitario regionale: la mappa", strati:[
  {t:"Dove servono gli ospedali"},
  {t:"Quanti posti letto"},
  {t:"Quali servizi sul territorio", d:"le aziende si muovono dentro la mappa"}]},
{id:"s09", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre funzioni della Regione", box:FUNZIONI_REGIONE},
{id:"s10", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 502/1992", sigla:"Art. 13",
  testo:"I disavanzi delle aziende li copre **la Regione, con risorse proprie**."},
{id:"s11", tipo:"titolo", tema:"profondo",
  titolo:"Chi programma la spesa<br>**ne risponde**.",
  sotto:"Il ripiano a piè di lista dello Stato non è più la regola."},

// --- 4 · l'azienda
{id:"s12", tipo:"griglia", tema:"chiaro", colonne:2, sopratitolo:"All'azienda: gestione ed erogazione", celle:[
  {t:"Organizzare i **servizi**"}, {t:"Assumere e gestire il **personale**"},
  {t:"Acquistare **beni**"}, {t:"Produrre **prestazioni**"}]},
{id:"s13", tipo:"albero", tema:"chiaro", sopratitolo:"L'atto aziendale organizza l'azienda",
  radice:"**Direttore generale** — atto aziendale", rami:[
  {cond:"specialità", esito:"**Dipartimenti**"},
  {cond:"territorio", esito:"**Distretti**"},
  {cond:"ospedali", esito:"**Presidi**"}]},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"In questa gestione",
  testo:"La politica **non entra**.",
  sotto:"Il direttore generale risponde degli obiettivi; sul come, decide lui."},
{id:"s15", tipo:"albero", tema:"chiaro", sopratitolo:"Lo stesso principio, in tutta la pubblica amministrazione",
  radice:"**L. 421/1992** — una sola legge delega", rami:[
  {cond:"sanità", esito:"**D.Lgs. 502/1992**", key:true},
  {cond:"pubblico impiego", esito:"**D.Lgs. 29/1993**<br>indirizzo ai politici, gestione ai dirigenti"}]},
{id:"s16", tipo:"tabella", tema:"chiaro", sopratitolo:"In una frase", ...RUOLI, chiave:[1]},
{id:"s17", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione al distrattore", righe:[
  {sb:"La Regione gestisce il personale e gli acquisti delle aziende",
   ok:"La gestione è dell'azienda; alla Regione programmazione, indirizzo e controllo"}]},

// --- 5 · il quasi-mercato
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Nel vecchio sistema, la stessa USL", passi:[
  {t:"Decideva"}, {t:"Produceva"}, {t:"Pagava", d:"con la spesa storica", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Il 502 separa due ruoli", col:[
  {h:"Chi acquista", t:"**per conto dei cittadini**", grande:true},
  {h:"Chi eroga", t:"**produce le prestazioni**", grande:true}]},
{id:"s20", tipo:"icone", tema:"chiaro", attive:[0], sopratitolo:"Acquirente ed erogatori", voci:[
  {icona:"persone", t:"**Acquirente**: l'azienda sanitaria locale", d:"compra per i residenti"},
  {icona:"ospedale", t:"**Erogatori**", d:"aziende ospedaliere, ospedali dell'ASL, privati accreditati"}]},
{id:"s21", tipo:"icone", tema:"chiaro", attive:[0,1], sopratitolo:"Acquirente ed erogatori", voci:[
  {icona:"persone", t:"**Acquirente**: l'azienda sanitaria locale", d:"compra per i residenti"},
  {icona:"ospedale", t:"**Erogatori**", d:"aziende ospedaliere, ospedali dell'ASL, privati accreditati — pagati a prestazione"}]},
{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio: una protesi d'anca", passi:[
  {t:"Il cittadino", d:"si opera nell'AO del capoluogo"},
  {t:"L'AO eroga", d:"e fattura la prestazione"},
  {t:"L'ASL di residenza paga", key:true}]},
{id:"s23", tipo:"frase", tema:"chiaro", sopratitolo:"E fuori Regione?",
  testo:"Paga la Regione di residenza: è la **mobilità sanitaria**.",
  sotto:"Le Regioni la compensano tra loro."},
{id:"s24", tipo:"citazione", tema:"chiaro",
  testo:"*Quasi-mercato*, o competizione amministrata.",
  fonte:"L'idea arriva dal servizio sanitario del Regno Unito, primi anni Novanta"},
{id:"s25", tipo:"tre", tema:"chiaro", sopratitolo:"Perché «quasi»", box:[
  {t:"Niente prezzo libero", d:"le tariffe le fissa il sistema pubblico"},
  {t:"Niente consumatore che paga", d:"paga il servizio sanitario, non il paziente"}]},
{id:"s26", tipo:"frase", tema:"chiaro", sopratitolo:"Il vantaggio atteso",
  testo:"Se **i soldi seguono il paziente**, gli erogatori competono su qualità ed efficienza."},
{id:"s27", tipo:"frase", tema:"chiaro", sopratitolo:"Nella pratica italiana",
  testo:"Un quasi-mercato **incompleto**.",
  sotto:"Molte ASL mantengono i propri ospedali: acquirente e produttore spesso coincidono."},

// --- 6 · i DRG
{id:"s28", tipo:"confronto", tema:"chiaro", sopratitolo:"Come si paga un ricovero?", col:[
  {h:"A giornata di degenza", t:"premia chi **trattiene** i pazienti"},
  {h:"A piè di lista", t:"non premia **nessuno**"}]},
{id:"s29", tipo:"norma", tema:"chiaro", etichetta:"Diagnosis Related Groups", sigla:"DRG",
  testo:"Nascono a **Yale**; il programma federale **Medicare** li adotta nel **1983**."},
{id:"s30", tipo:"assetempo", tema:"chiaro", sopratitolo:"I DRG in Italia",
  da:1980, a:2000, decenni:[1980,1990,2000], tappe:[
  {anno:1983, et:"USA — Medicare"},
  {anno:1994, et:"Italia — tariffe nazionali"},
  {anno:1995, et:"Italia — si pagano gli ospedali", key:true}]},
{id:"s31", tipo:"catena", tema:"chiaro", attive:[0,1,2], sopratitolo:"Come funzionano", passi:DRG_PASSI},
{id:"s32", tipo:"catena", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Come funzionano", passi:DRG_PASSI},
{id:"s33", tipo:"barre", tema:"chiaro", sopratitolo:"Stessa diagnosi, stesso intervento", unita:"", max:10, barre:[
  {et:"Ospedale A — degenza", v:4, lab:"4 giorni", nota:"stessa tariffa"},
  {et:"Ospedale B — degenza", v:8, lab:"8 giorni", colore:"#B07A12", nota:"stessa tariffa"}]},
{id:"s34", tipo:"sostituzione", tema:"chiaro", sopratitolo:"L'incentivo",
  da:{h:"Non premia più", t:"la durata"},
  a:{h:"Premia", t:"l'**efficienza**"}},
{id:"s35", tipo:"elenco", tema:"tenue", vietato:true, sopratitolo:"I rischi dell'incentivo", voci:[
  {t:"Dimissioni **troppo precoci**"},
  {t:"Selezione dei pazienti **meno costosi**"},
  {t:"Codifiche **gonfiate**", d:"per spostare il ricovero in un gruppo che rende di più"}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, sopratitolo:"Per questo, i controlli", celle:[
  {t:"Qualità delle **cartelle cliniche**"}, {t:"**Appropriatezza** dei ricoveri"},
  {t:"Codifica ↔ **diagnosi**"}]},
{id:"s37", tipo:"frase", tema:"chiaro", sopratitolo:"Anche l'ambulatorio",
  testo:"Una tariffa per ogni prestazione, in un **nomenclatore**.",
  sotto:"La logica è la stessa: si paga la prestazione."},
{id:"s38", tipo:"titolo", tema:"profondo",
  titolo:"Si paga il **prodotto**,<br>non la spesa.",
  sotto:"L'esatto contrario del ripiano a piè di lista."},

// --- 7 · le tre cose
{id:"s39", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s40", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore", righe:[
  {sb:"Quasi-mercato = privatizzazione",
   ok:"Prestazioni gratuite o con ticket, programmazione pubblica"}]},
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La tariffa DRG rimborsa il costo effettivo del ricovero",
   ok:"È una cifra prefissata per gruppo: da qui l'incentivo all'efficienza"}]},

// --- 8 · chiusura
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"La Regione governa.<br>L'azienda gestisce.<br>**I soldi seguono le prestazioni.**"},

{id:"s45", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"1.4", sottotitolo:"Accreditamento<br>e libertà di scelta", ente:ENTE},
];
