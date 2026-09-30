// Contenuto delle 47 scene della lezione 11.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 11. GSA, consolidato e AOU:
// la gestione sanitaria accentrata, Azienda Zero (L.R. Veneto 19/2016), il consolidato
// regionale e il ciclo di bilancio, le aziende ospedaliero universitarie (D.Lgs. 517/1999).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "La **GSA** è il centro di responsabilità regionale per le risorse sanitarie gestite direttamente: contabilità **economico patrimoniale** e un **terzo certificatore**",
  "Nel Veneto la GSA è in **Azienda Zero** (L.R. **19/2016**), il cui direttore generale ne è responsabile; il consolidato si approva entro il **30 giugno**",
  "Le **AOU** integrano **assistenza**, **didattica** e **ricerca**; il direttore generale è nominato dalla **regione d'intesa con il rettore**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Contabilità delle PA",
  titolo:"GSA, consolidato e AOU", sottotitolo:"Lezione 11.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Nel Veneto, ognuna con il suo bilancio", celle:[
  {t:"**9** aziende ULSS"}, {t:"**2** aziende ospedaliero universitarie"},
  {t:"**1** istituto oncologico"}, {t:"**Azienda Zero**"}]},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Non basta sommare i bilanci", col:[
  {h:"Bisogna aggiungere", t:"le spese gestite **direttamente** dalla regione"},
  {h:"E togliere", t:"gli **scambi** tra un'azienda e l'altra", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Tanti **bilanci**, un solo conto<br>della **sanità regionale**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"La gestione sanitaria **accentrata**"},
  {t:"Il Veneto e **Azienda Zero**"},
  {t:"Il **consolidato** e il ciclo di bilancio"},
  {t:"Le aziende ospedaliero **universitarie**"}]},

// --- 3 · la gestione sanitaria accentrata
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"timone", sopratitolo:"Non tutto va subito alle aziende",
  titolo:"Una parte la gestisce la **regione**", punti:[
    {icona:"euro", t:"fondi da **ripartire**"},
    {icona:"documento", t:"progetti **regionali**"},
    {icona:"persone", t:"la **mobilità** dei pazienti tra regioni", key:true}],
  etichette:{}},
{id:"s07", tipo:"norma", tema:"chiaro", etichetta:"Decreto 118 · Titolo secondo", sigla:"GSA",
  testo:"La gestione sanitaria **accentrata**: uno specifico **centro di responsabilità** della regione."},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Come le aziende",
  titolo:"Contabilità **economico patrimoniale**", punti:[
    {icona:"ospedale", t:"per le operazioni sanitarie della **regione**"},
    {icona:"bilancia", t:"in un bilancio **confrontabile**", key:true}],
  etichette:{}},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Due responsabili", col:[
  {h:"Responsabile della GSA", t:"tiene le **scritture** e redige i bilanci"},
  {h:"Responsabile della certificazione", t:"il **terzo certificatore**, che verifica", key:true}]},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Libri e bilanci della GSA", celle:[
  {t:"Libro **giornale**"}, {t:"Libro degli **inventari**"},
  {t:"Bilancio **preventivo**"}, {t:"Bilancio d'**esercizio**"}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Dove si raccolgono i conti",
  titolo:"Il servizio sanitario **regionale**", punti:[
    {icona:"persona", t:"il responsabile della **GSA**"},
    {icona:"documento", t:"predispone il bilancio **consolidato**", key:true}],
  etichette:{}},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio: un progetto di screening", passi:[
  {t:"Una quota del fondo", d:"trattenuta dalla regione"},
  {t:"La registra la GSA"},
  {t:"Alle aziende", d:"man mano che il progetto avanza", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"La GSA è un'azienda sanitaria in più",
   ok:"È un centro di responsabilità della regione"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Ciò che la **regione** gestisce,<br>la **GSA** lo registra."},

// --- 4 · nel Veneto: Azienda Zero
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Legge regionale del Veneto", sigla:"19/2016",
  testo:"Istituisce **Azienda Zero**, con le funzioni della gestione sanitaria **accentrata**."},
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Azienda Zero",
  titolo:"Gestisce la **cassa** della sanità", punti:[
    {icona:"euro", t:"i flussi del finanziamento **sanitario regionale**"},
    {icona:"libro", t:"e tiene le scritture della **GSA**", key:true}],
  etichette:{}},
{id:"s17", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Azienda Zero redige", celle:[
  {t:"Preventivo della **GSA**"}, {t:"Consuntivo della **GSA**"},
  {t:"Consolidato **preventivo**"}, {t:"Consolidato **consuntivo**"}]},
{id:"s18", tipo:"catena", tema:"chiaro", sopratitolo:"Il percorso dei bilanci", passi:[
  {t:"Azienda Zero", d:"redige"},
  {t:"Area Sanità e Sociale", d:"visto di congruità"},
  {t:"Commissione consiliare", d:"sentita"},
  {t:"Giunta regionale", d:"approva", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"I due ruoli, nel Veneto", col:[
  {h:"Responsabile della GSA", t:"il **direttore generale** di Azienda Zero"},
  {h:"Terzo certificatore", t:"il **collegio sindacale** di Azienda Zero", key:true}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Come prevede il decreto sulla certificabilità",
  titolo:"La certificazione **contabile**", punti:[
    {icona:"persone", t:"affidabile a una **società di revisione**"},
    {icona:"certificato", t:"iscritta nel registro dei **revisori**", key:true}],
  etichette:{}},
{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio: a fine anno", passi:[
  {t:"I bilanci delle aziende"},
  {t:"Consolidati con la GSA"},
  {t:"Alla regione", d:"per il visto e l'approvazione", key:true}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Nel Veneto il responsabile della GSA è il direttore di un'azienda ULSS",
   ok:"È il direttore generale di Azienda Zero"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Nel Veneto la **GSA**<br>ha un indirizzo: **Azienda Zero**."},

// --- 5 · il consolidato e il ciclo di bilancio
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"matrioska", sopratitolo:"Il servizio sanitario regionale",
  titolo:"Il bilancio **consolidato**", punti:[
    {icona:"cartella", t:"la **GSA** e gli **enti sanitari**"},
    {icona:"documento", t:"a preventivo e a **consuntivo**, stessi schemi", key:true}],
  etichette:{}},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Consolidare", col:[
  {h:"Non è solo", t:"**sommare**"},
  {h:"Si eliminano", t:"i **rapporti interni**: nessuna spesa contata due volte", key:true}]},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Il ciclo comincia prima dell'anno",
  titolo:"Il preventivo entro il **31 dicembre**", punti:[
    {icona:"ospedale", t:"delle aziende e **consolidato**"},
    {icona:"spunta", t:"coerente con la programmazione **regionale**", key:true}],
  etichette:{}},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"Durante l'anno",
  titolo:"Il **monitoraggio** dei conti", punti:[
    {icona:"orologio", t:"rilevazioni periodiche dei **costi**"},
    {icona:"avviso", t:"equilibrio a rischio: misure **correttive**", key:true}],
  etichette:{}},
{id:"s28", tipo:"catena", tema:"chiaro", sopratitolo:"A consuntivo", passi:[
  {t:"30 aprile", d:"aziende e GSA adottano il bilancio d'esercizio"},
  {t:"31 maggio", d:"la Giunta approva i bilanci delle aziende"},
  {t:"30 giugno", d:"la Giunta approva il consolidato", key:true}]},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"Dopo l'approvazione", col:[
  {h:"Pubblicazione", t:"entro **sessanta giorni**"},
  {h:"Il consolidato serve", t:"alle verifiche **nazionali** sull'equilibrio", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Un esempio: prestazioni tra aziende",
  titolo:"Costo e ricavo si **elidono**", punti:[
    {icona:"ospedale", t:"l'ULSS paga l'ospedaliera per i **residenti**"},
    {icona:"euro", t:"per la regione è la **stessa spesa**", key:true}],
  etichette:{}},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il consolidato si approva entro il 30 aprile",
   ok:"Entro il 30 giugno; ad aprile le aziende adottano i propri bilanci"}]},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"**Aprile** le aziende,<br>maggio la Giunta,<br>**giugno** il consolidato."},

// --- 6 · le aziende ospedaliero universitarie
{id:"s33", tipo:"norma", tema:"chiaro", etichetta:"Decreto legislativo · 1999", sigla:"517/1999",
  testo:"Le aziende ospedaliero **universitarie**: servizio sanitario e **università** insieme."},
{id:"s34", tipo:"tre", tema:"chiaro", sopratitolo:"Tre funzioni integrate", box:[
  {n:"1", t:"Assistenza", d:"la cura dei pazienti"},
  {n:"2", t:"Didattica", d:"si formano medici e professionisti"},
  {n:"3", t:"Ricerca", d:"nello stesso ospedale"}]},
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Regione e università",
  titolo:"I **protocolli d'intesa**", punti:[
    {icona:"persone", t:"l'**apporto** di ciascuna"},
    {icona:"ospedale", t:"le **strutture** per didattica e ricerca", key:true}],
  etichette:{}},
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi guida l'azienda", col:[
  {h:"Direttore generale", t:"nominato dalla **regione**, d'intesa con il **rettore**", key:true},
  {h:"Organo di indirizzo", t:"coerenza tra programmazione e attività **universitarie**"}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Organi e contabilità", col:[
  {h:"Gli altri organi", t:"collegio **sindacale** e collegio di **direzione**"},
  {h:"La contabilità", t:"il **Titolo secondo** del decreto 118", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"universita", sopratitolo:"Il bilancio d'esercizio",
  titolo:"Come le **altre aziende**", punti:[
    {icona:"documento", t:"stessi schemi e **criteri**"},
    {icona:"cartella", t:"rientra nel **consolidato** regionale", key:true}],
  etichette:{}},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Un esempio: l'azienda di Padova",
  titolo:"Un reparto diretto da un **professore**", punti:[
    {icona:"cappello", t:"un **universitario** alla guida"},
    {icona:"euro", t:"i costi nel bilancio dell'**azienda**", key:true}],
  etichette:{}},
{id:"s40", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il direttore generale di un'AOU è nominato dal rettore",
   ok:"Dalla regione, d'intesa con il rettore"}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Curare, insegnare, ricercare,<br>con un solo **bilancio**."},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il consolidato è la semplice somma dei bilanci",
   ok:"Si eliminano gli scambi interni tra le aziende"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Dai conti delle **aziende**<br>al conto della **sanità regionale**.",
  sotto:"Prossimo modulo: la prova, e le trappole ricorrenti dei quiz."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 12", sottotitolo:"La prova", ente:ENTE},
];
