// Contenuto delle 45 scene della lezione 1.6. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 1. Stato-Regioni
// (Titolo V, L. cost. 3/2001), finanziamento (quota capitaria, costi standard
// D.Lgs. 68/2011, piani di rientro), tipologie di azienda, direzione strategica.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TIPOLOGIE = [
 {icona:"persone",   t:"**Azienda sanitaria locale**", d:"nel Veneto: ULSS — tutela i residenti"},
 {icona:"ospedale",  t:"**Azienda ospedaliera**", d:"rilievo nazionale e alta specializzazione"},
 {icona:"cappello",  t:"**Azienda ospedaliero-universitaria**", d:"assistenza, didattica, ricerca — D.Lgs. 517/1999"},
 {icona:"occhio",    t:"**IRCCS**", d:"ricovero e cura a carattere scientifico — pubblici o privati"},
];

const ORGANI = {
 colonne:["34%","33%","33%"],
 intestazioni:["", "È organo?", "Chi lo nomina"],
 righe:[
  ["Direttore generale",      "si:sì", "la Regione"],
  ["Collegio di direzione",   "si:sì", "—"],
  ["Collegio sindacale",      "si:sì", "Regione, MEF, Ministero della salute"],
  ["Direttore sanitario",     "no:no", "il direttore generale"],
  ["Direttore amministrativo","no:no", "il direttore generale"],
 ],
};

const TRE_COSE = [
 "**Titolo V (2001)**: tutela della salute = legislazione **concorrente** — LEA allo **Stato** in esclusiva",
 "**Finanziamento**: fabbisogno fissato dallo Stato — quota capitaria ponderata, poi **costi standard** (D.Lgs. 68/2011)",
 "**Organi dell'azienda**: direttore generale, collegio di direzione, collegio sindacale",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 1 · Legislazione sanitaria nazionale",
  titolo:"Governance<br>e finanziamento", sottotitolo:"Lezione 1.6", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"tre", tema:"chiaro", sopratitolo:"Chi governa la sanità italiana?", box:[
  {n:"1", t:"Lo Stato"}, {n:"21", t:"Sistemi regionali"}, {n:"100+", t:"Aziende"}]},
{id:"s03", tipo:"numero", tema:"chiaro", sopratitolo:"E chi paga?",
  cifra:"100+", testo:"**miliardi di euro l'anno**: il finanziamento pubblico"},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Chi governa il sistema,<br>e **chi lo finanzia**.",
  sotto:"L'ultima lezione del modulo tiene insieme le altre."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"**Stato e Regioni**, e il Titolo V"},
  {t:"Il **finanziamento**: dal fondo ai costi standard"},
  {t:"Le **tipologie** di azienda"},
  {t:"La **direzione strategica**"}]},

// --- 3 · Stato e Regioni
{id:"s06", tipo:"frase", tema:"chiaro", sopratitolo:"Dopo il 502",
  testo:"La **regionalizzazione** del Servizio Sanitario Nazionale."},
{id:"s07", tipo:"norma", tema:"chiaro", etichetta:"Legge costituzionale 3/2001 · riforma del", sigla:"Titolo V",
  testo:"La tutela della salute diventa **legislazione concorrente**."},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Legislazione concorrente", col:[
  {h:"Lo Stato", t:"i **principi fondamentali**", grande:true},
  {h:"Le Regioni", t:"**tutto il resto**: leggi, organizzazione, programmazione", grande:true}]},
{id:"s09", tipo:"frase", tema:"chiaro", sopratitolo:"In esclusiva allo Stato",
  testo:"I **livelli essenziali delle prestazioni**: i LEA.",
  sotto:"La garanzia che il diritto alla salute sia uguale in tutto il Paese."},
{id:"s10", tipo:"impila", tema:"chiaro", sopratitolo:"21 servizi sanitari regionali",
  testa:"stesso quadro nazionale", unita:"", segmenti:[
  {v:19, t:"Regioni"}, {v:2, t:"Province autonome", d:"Trento e Bolzano", chiaro:true, colore:"#A8CDBB"}]},
{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"Dove Stato e Regioni si accordano", passi:[
  {t:"Conferenza Stato-Regioni"}, {t:"Intese"},
  {t:"Patti per la salute", d:"accordi pluriennali su risorse e obiettivi", key:true}]},
{id:"s12", tipo:"frase", tema:"tenue", sopratitolo:"Il prezzo della regionalizzazione",
  testo:"Differenze tra Regioni, nei **servizi** e nei **tempi di attesa**.",
  sotto:"La tensione permanente tra autonomia e uguaglianza."},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Lo Stato garantisce **l'uguaglianza**.<br>Le Regioni garantiscono **il servizio**."},

// --- 4 · il finanziamento
{id:"s14", tipo:"norma", tema:"chiaro", etichetta:"Ogni anno, lo fissa lo Stato", sigla:"Fabbisogno",
  testo:"Il **fabbisogno sanitario nazionale standard**: il livello complessivo del finanziamento."},
{id:"s15", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le fonti", celle:[
  {t:"**IRAP**"}, {t:"Addizionale regionale **IRPEF**"},
  {t:"Compartecipazione all'**IVA**"}, {t:"Entrate proprie delle aziende: **ticket**"}]},
{id:"s16", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 502/1992", sigla:"Quota capitaria",
  testo:"Una cifra per abitante, **ponderata per l'età**."},
{id:"s17", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Una rivoluzione rispetto alla lezione 1.1",
  da:{h:"Non più", t:"quanto si è speso"},
  a:{h:"Ma", t:"quante **persone** si devono curare"}},
{id:"s18", tipo:"norma", tema:"chiaro", etichetta:"Federalismo fiscale · D.Lgs. 68/2011", sigla:"Costi standard",
  testo:"Un criterio in più per ripartire le risorse."},
{id:"s19", tipo:"frase", tema:"chiaro", sopratitolo:"L'idea",
  testo:"Le Regioni **più virtuose** fanno da parametro per tutte.",
  sotto:"Quelle che garantiscono i LEA in equilibrio di bilancio."},
{id:"s20", tipo:"catena", tema:"chiaro", sopratitolo:"Il fabbisogno standard di una Regione", passi:[
  {t:"La sua popolazione"}, {t:"I LEA da garantire"},
  {t:"Ai costi delle Regioni di riferimento", key:true}]},
{id:"s21", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Costo standard = costo medio di tutte le Regioni",
   ok:"Costo standard = costo delle Regioni migliori"}]},
{id:"s22", tipo:"catena", tema:"chiaro", sopratitolo:"Poi, dentro la Regione", passi:[
  {t:"La Regione riceve"}, {t:"Distribuisce alle aziende", d:"con criteri propri"},
  {t:"Verifica i bilanci", d:"ogni anno"},
  {t:"Quota premiale", d:"alle Regioni in regola", key:true}]},
{id:"s23", tipo:"scala", tema:"chiaro", sopratitolo:"Chi non rientra: il piano di rientro", gradini:[
  {t:"Misure correttive"},
  {t:"Aumento delle imposte regionali"},
  {t:"Commissariamento", d:"nei casi estremi", key:true}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"La fine definitiva<br>del **ripiano a piè di lista**.",
  sotto:"Chi spende oltre il dovuto paga con risorse proprie."},

// --- 5 · le tipologie di azienda
{id:"s25", tipo:"icone", tema:"chiaro", attive:[0], sopratitolo:"Le aziende del sistema", voci:TIPOLOGIE},
{id:"s26", tipo:"icone", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le aziende del sistema", voci:TIPOLOGIE},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"Attenzione: due «517» diversi", col:[
  {h:"D.Lgs. 517/1993", t:"il **correttivo** del 502", grande:true},
  {h:"D.Lgs. 517/1999", t:"le aziende **ospedaliero-universitarie**", grande:true}]},
{id:"s28", tipo:"norma", tema:"chiaro", etichetta:"Un'azienda ospedaliero-universitaria", sigla:"AOUPD",
  testo:"L'**Azienda Ospedale Università di Padova**: nel modulo 4."},
{id:"s29", tipo:"icone", tema:"chiaro", attive:[0,1,2,3], sopratitolo:"Le aziende del sistema", voci:TIPOLOGIE},
{id:"s30", tipo:"norma", tema:"chiaro", etichetta:"Nel Veneto, in più", sigla:"Azienda Zero",
  testo:"Un ente di **governance regionale** con funzioni comuni: nel modulo 2."},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore", righe:[
  {sb:"L'azienda ospedaliera tutela la salute dei residenti",
   ok:"L'AO eroga prestazioni; la tutela della popolazione è dell'ASL"}]},

// --- 6 · la direzione strategica
{id:"s32", tipo:"albero", tema:"chiaro", sopratitolo:"La direzione strategica",
  radice:"**Direttore generale**", rami:[
  {cond:"affianca", esito:"**Direttore sanitario**"},
  {cond:"affianca", esito:"**Direttore amministrativo**"}]},
{id:"s33", tipo:"confronto", tema:"chiaro", sopratitolo:"Due direttori", col:[
  {h:"Direttore sanitario", t:"dirige i servizi sanitari — **un medico** con esperienza di direzione"},
  {h:"Direttore amministrativo", t:"dirige i **servizi amministrativi**"}]},
{id:"s34", tipo:"frase", tema:"chiaro", sopratitolo:"Chi li nomina",
  testo:"Il **direttore generale**.",
  sotto:"A lui restano la responsabilità ultima e la rappresentanza legale."},
{id:"s35", tipo:"norma", tema:"chiaro", etichetta:"Organo di controllo", sigla:"Collegio sindacale",
  testo:"Vigila sulla **regolarità amministrativa e contabile** e sulla gestione."},
{id:"s36", tipo:"tre", tema:"chiaro", sopratitolo:"Il collegio sindacale: tre componenti", box:[
  {n:"1", t:"Regione"}, {n:"2", t:"Ministero dell'economia e delle finanze"}, {n:"3", t:"Ministero della salute"}]},
{id:"s37", tipo:"norma", tema:"chiaro", etichetta:"I professionisti nel governo dell'azienda", sigla:"Collegio di direzione",
  testo:"Direttori di **dipartimento**, di **distretto**, di **presidio**: la base del governo clinico."},
{id:"s38", tipo:"frase", tema:"chiaro", sopratitolo:"L'organizzazione interna",
  testo:"La fissa l'**atto aziendale**.",
  sotto:"Nel modulo 4: la costituzione dell'azienda."},
{id:"s39", tipo:"titolo", tema:"profondo",
  titolo:"Tre organi:<br>direttore generale,<br>collegio di direzione,<br>**collegio sindacale**."},

// --- 7 · le tre cose
{id:"s40", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s41", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s42", tipo:"tabella", tema:"chiaro", sopratitolo:"La terza: gli organi dell'azienda", ...ORGANI, chiave:[0,1,2]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Il distrattore finale", righe:[
  {sb:"Direttore sanitario e amministrativo sono organi, nominati dalla Regione",
   ok:"Non sono organi; li nomina il direttore generale"}]},

// --- 8 · chiusura
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Lo Stato garantisce.<br>Le Regioni organizzano.<br>**Le aziende gestiscono.**"},

{id:"s45", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 2", sottotitolo:"Il sistema sanitario<br>regionale del Veneto", ente:ENTE},
];
