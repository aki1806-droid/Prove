// Contenuto delle 50 scene della lezione 9.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 9. Dalla frammentazione al Testo Unico:
// art. 2087 c.c.; Cost. artt. 32, 35, 41; D.P.R. 547/1955, 164/1956, 303/1956; L. 300/1970 art. 9;
// L. 833/1978; direttiva 89/391/CEE; D.Lgs. 626/1994 e 242/1996; L. 123/2007; D.Lgs. 81/2008; D.Lgs. 106/2009.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Le radici: **art. 2087** del codice civile, la **Costituzione**, i decreti tecnici degli **anni Cinquanta**",
  "Il **D.Lgs. 626/1994** recepisce la direttiva quadro: **valutazione dei rischi**, servizio di prevenzione, **RLS**, medico competente",
  "Il **D.Lgs. 81/2008** riunisce la materia, vale per **tutti i settori**, corretto nel **2009** e aggiornato più volte",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Salute e sicurezza sul lavoro",
  titolo:"Dalla frammentazione<br>al Testo Unico", sottotitolo:"Lezione 9.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"siringa", sopratitolo:"Un caso in reparto",
  titolo:"Una **puntura** d'ago", punti:[
    {icona:"orologio", t:"trent'anni fa: un **incidente del mestiere**"},
    {icona:"scudo", t:"oggi: da **prevenire**, registrare, analizzare", key:true}],
  etichette:{alto:{t:"Rischio biologico", key:true}}},
{id:"s03", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Un cambio di mentalità",
  da:{h:"Prima", t:"un elenco di divieti"},
  a:{h:"Con il D.Lgs. 81/2008", t:"la sicurezza come **organizzazione**"}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Dalla **regola** da rispettare<br>al **rischio** da governare."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"Gli anni Cinquanta"},
  {icona:"persone", t:"La svolta europea"},
  {icona:"documento", t:"Il Testo Unico", key:true},
  {icona:"orologio", t:"Dopo il 2008"}]},

// --- 3 · l'eredità degli anni Cinquanta
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Codice civile, art. 2087 · 1942", sigla:"Art. 2087",
  testo:"L'imprenditore tutela l'**integrità fisica** e la **personalità morale** di chi lavora."},
{id:"s07", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"La Costituzione", box:[
  {n:"32", t:"La salute", d:"diritto fondamentale"},
  {n:"35", t:"Il lavoro", d:"tutelato in tutte le sue forme"},
  {n:"41", t:"L'impresa", d:"non può danneggiare la sicurezza"}]},
{id:"s08", tipo:"assetempo", tema:"chiaro", sopratitolo:"I decreti tecnici",
  da:1950, a:1960, decenni:[1955,1960], tappe:[
  {anno:1955, et:"D.P.R. 547 — prevenzione infortuni", key:true},
  {anno:1956, et:"D.P.R. 164 e 303 — costruzioni, igiene"}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"casco", sopratitolo:"Norme minuziose",
  titolo:"Pensate per la **fabbrica**", punti:[
    {icona:"ingranaggio", t:"parapetti, **macchine**, aerazione"},
    {icona:"ospedale", t:"poco adatte all'**ospedale**", key:true}],
  etichette:{alto:{t:"Anni Cinquanta", key:true}, sx:"Fabbrica", dx:"Cantiere"}},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi era al centro", col:[
  {h:"Il datore di lavoro", t:"quasi tutta la **responsabilità**"},
  {h:"Il lavoratore", t:"da **proteggere**, non protagonista", key:true}]},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli anni Settanta", col:[
  {h:"1970 · Statuto dei lavoratori", t:"i lavoratori **controllano** la prevenzione"},
  {h:"1978 · Riforma sanitaria", t:"la vigilanza alle **USL**", key:true}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Un ospedale degli anni Settanta", col:[
  {h:"Doveva", t:"rispettare decine di **prescrizioni**"},
  {h:"Non doveva", t:"**valutare** i rischi reparto per reparto", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"La sicurezza sul lavoro nasce nel 2008",
   ok:"Nel 2008 si riordina; l'obbligo di tutela c'è dal 1942"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Tante **regole**,<br>scritte in tempi diversi,<br>ma nessun **sistema**."},

// --- 4 · la svolta europea
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"globo", sopratitolo:"Direttiva quadro 89/391/CEE",
  titolo:"La svolta dall'**Europa**", punti:[
    {icona:"occhio", t:"il datore di lavoro **valuta** i rischi"},
    {icona:"ingranaggio", t:"e **organizza** la prevenzione", key:true}],
  etichette:{alto:{t:"1989", key:true}}},
{id:"s16", tipo:"icone", tema:"chiaro", sopratitolo:"Il lavoratore partecipa", voci:[
  {icona:"chat", t:"**Informato**"},
  {icona:"cappello", t:"**Formato**"},
  {icona:"persone", t:"**Consultato**"}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il recepimento in Italia",
  titolo:"Il **D.Lgs. 626/1994**", punti:[
    {icona:"libro", t:"la sicurezza nel **linguaggio comune**"},
    {icona:"ospedale", t:"anche negli **ospedali**", key:true}],
  etichette:{titolo:"D.Lgs. 626/1994", sigillo:{t:"Recepito", key:true}}},
{id:"s18", tipo:"assetempo", tema:"chiaro", sopratitolo:"Il primo correttivo",
  da:1989, a:1998, decenni:[1990], tappe:[
  {anno:1989, et:"Direttiva quadro"},
  {anno:1994, et:"D.Lgs. 626", key:true},
  {anno:1996, et:"D.Lgs. 242 — correttivo"}]},
{id:"s19", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le figure che arrivano con il 626", box:[
  {n:"1", t:"Servizio di prevenzione", d:"e il suo responsabile"},
  {n:"2", t:"Rappresentante", d:"dei lavoratori per la sicurezza"},
  {n:"3", t:"Medico competente", d:"la sorveglianza sanitaria"}]},
{id:"s20", tipo:"flusso", tema:"chiaro", sopratitolo:"Gli strumenti", passi:[
  {icona:"documento", t:"Valutazione", d:"dei rischi"},
  {icona:"cappello", t:"Formazione", d:"dei lavoratori"},
  {icona:"persone", t:"Riunione", d:"periodica", key:true}]},
{id:"s21", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Per ogni reparto, i suoi rischi", celle:[
  {t:"**Laboratorio**"}, {t:"**Radiologia**"}, {t:"**Cucina**"}]},
{id:"s22", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Nelle aziende sanitarie",
  titolo:"I primi **servizi** di prevenzione", punti:[
    {icona:"persone", t:"poche **persone**"},
    {icona:"cartella", t:"molto lavoro **arretrato**", key:true}],
  etichette:{top:"Direzione", basso:{t:"Servizio di prevenzione", key:true}}},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Il quadro resta frammentato",
  titolo:"Norme **sparse**", punti:[
    {icona:"documento", t:"il 626 **accanto** ai decreti degli anni Cinquanta"},
    {icona:"avviso", t:"leggi speciali **non coerenti**", key:true}],
  etichette:{cassetto:{t:"1955 · 1956 · 1994", key:true}}},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il 626 è una legge nata in Italia da zero",
   ok:"Recepisce la direttiva quadro europea del 1989"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Dall'**Europa**, l'idea di<br>**valutare** e **organizzare**."},

// --- 5 · il Testo Unico
{id:"s26", tipo:"assetempo", tema:"chiaro", sopratitolo:"La delega e il decreto",
  da:2006, a:2010, decenni:[2008], tappe:[
  {anno:2007, et:"L. 123 — la delega"},
  {anno:2008, et:"D.Lgs. 81 — 9 aprile", key:true},
  {anno:2009, et:"D.Lgs. 106 — correttivo"}]},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"cartello", sopratitolo:"La spinta",
  titolo:"Gravi **incidenti**", punti:[
    {icona:"avviso", t:"la sicurezza torna al centro del **dibattito**"}],
  etichette:{alto:{t:"Anni Duemila", key:true}}},
{id:"s28", tipo:"sostituzione", tema:"chiaro", sopratitolo:"In vigore dal 15 maggio 2008",
  da:{h:"Abrogati", t:"il 626 e i decreti degli anni Cinquanta"},
  a:{h:"Un quadro unico", t:"i contenuti ancora **utili**, riordinati"}},
{id:"s29", tipo:"contatore", tema:"chiaro", sopratitolo:"Un testo ampio", sep:"·",
  valori:[{n:306, t:"articoli"}, {n:13, t:"titoli", key:true}],
  sotto:"Il **Titolo I**: i principi comuni a tutti i settori."},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I titoli sui rischi specifici", celle:[
  {t:"**Luoghi** di lavoro"}, {t:"**Attrezzature** e DPI"},
  {t:"**Cantieri** e segnaletica"}, {t:"**Carichi** e videoterminali"}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Gli agenti di rischio", celle:[
  {t:"Agenti **fisici**"}, {t:"Sostanze **pericolose**"},
  {t:"Agenti **cancerogeni** e **biologici**"}, {t:"Atmosfere **esplosive**"}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Il nome", col:[
  {h:"Nel linguaggio comune", t:"«**Testo Unico**»"},
  {h:"Formalmente", t:"un **decreto legislativo** su delega del 2007", key:true}]},
{id:"s33", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Art. 2 · nelle pubbliche amministrazioni",
  titolo:"Chi è il **datore di lavoro**", punti:[
    {icona:"persona", t:"il dirigente con **poteri di gestione**"},
    {icona:"ospedale", t:"in azienda sanitaria, di regola, il **direttore generale**", key:true}],
  etichette:{}},
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"2009",
  titolo:"Il correttivo, **D.Lgs. 106**", punti:[
    {icona:"documento", t:"modifica molti **articoli**"},
    {icona:"spunta", t:"l'**impianto** resta lo stesso", key:true}],
  etichette:{alto:{t:"D.Lgs. 106/2009", key:true}}},
{id:"s35", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il decreto 81 vale solo per le imprese private",
   ok:"Vale per tutti i settori, anche le aziende sanitarie"}]},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Un solo **testo**,<br>principi **comuni**, rischi **specifici**."},

// --- 6 · dopo il 2008
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Il decreto 81 non è rimasto fermo",
  titolo:"Modificato **molte volte**", punti:[
    {icona:"libro", t:"nuove **direttive** europee"},
    {icona:"avviso", t:"problemi emersi nei **luoghi di lavoro**", key:true}],
  etichette:{data:"2008 → oggi", nota:"Aggiornato", alto:{t:"Testo vigente", key:true}}},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"cartello", sopratitolo:"2021 · il preposto",
  titolo:"Intervenire e **interrompere**", punti:[
    {icona:"occhio", t:"vigila sui **comportamenti** pericolosi"},
    {icona:"cappello", t:"riviste le regole sulla **formazione**", key:true}],
  etichette:{alto:{t:"Preposto", key:true}, sx:"Lavoratore", dx:"Preposto"}},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"casco", sopratitolo:"2024 · nei cantieri",
  titolo:"La patente a **crediti**", punti:[
    {icona:"avviso", t:"le violazioni tolgono **punti**"},
    {icona:"divieto", t:"senza punti non si **lavora**", key:true}],
  etichette:{alto:{t:"Patente a crediti", key:true}}},
{id:"s40", tipo:"sostituzione", tema:"chiaro", sopratitolo:"La direzione",
  da:{h:"Meno", t:"adempimenti di carta"},
  a:{h:"Più", t:"**prevenzione reale**"}},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Per l'esame", col:[
  {h:"Le cifre", t:"le sanzioni vengono **rivalutate**"},
  {h:"Da ricordare", t:"i **principi** e le **figure**", key:true}]},
{id:"s42", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Un esempio in reparto",
  titolo:"Il coordinatore è un **preposto**", punti:[
    {icona:"orologio", t:"organizza i **turni**"},
    {icona:"occhio", t:"dal 2021, **vigilanza** più precisa", key:true}],
  etichette:{top:"Coordinatore", basso:{t:"Preposto", key:true}}},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il 626 del 1994 è ancora in vigore",
   ok:"È stato abrogato dal decreto 81 del 2008"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Una legge **viva**,<br>che cambia con il **lavoro**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"«Testo Unico» è il nome ufficiale",
   ok:"Decreto legislativo 9 aprile 2008, n. 81"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Dalle regole **sparse**<br>al **sistema**.",
  sotto:"Prossima lezione: i sei principi della prevenzione."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 9.2", sottotitolo:"I sei principi", ente:ENTE},
];
