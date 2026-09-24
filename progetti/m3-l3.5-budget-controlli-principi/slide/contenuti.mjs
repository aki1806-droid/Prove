// Contenuto delle 50 scene della lezione 3.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 3. Budget, controlli e i tre
// principi guida: metodica di budget (L.R. 55/1994 artt. 13-19), contabilità analitica
// (art. 25) e centri di responsabilità, controllo di gestione (L.R. 56/1994 art. 20),
// reporting e revisione del budget, controllo regionale (visto di congruità, ispezione e
// vigilanza, commissario), integrazione, sussidiarietà, prossimità (PSSR 2019-2023).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "La metodica di budget ha **quattro livelli**: documento di **direttive**, budget **generale**, budget delle **strutture**, budget di **centro di responsabilità**",
  "Un centro di responsabilità: attività **omogenee**, risorse **significative**, un **responsabile**. Il controllo di gestione analizza gli **scostamenti**",
  "La Regione controlla con il **visto di congruità**, con **ispezione e vigilanza**, e con il **commissario** se il DG non adotta gli atti",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Legislazione socio-sanitaria del Veneto",
  titolo:"Budget, controlli<br>e i tre principi guida", sottotitolo:"Lezione 3.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Gennaio, un reparto di medicina",
  titolo:"Il **budget** del reparto", punti:[
    {icona:"ospedale", t:"quanti **ricoveri**"},
    {icona:"persone", t:"quanto **personale**, quanti **farmaci**"},
    {icona:"euro", t:"quanta **spesa** per l'anno", key:true}],
  etichette:{insegna:{t:"Medicina", key:true}}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Lo dice la legge 55",
  titolo:"Due **domande**", punti:[
    {icona:"documento", t:"da dove arriva quel **documento**?"},
    {icona:"occhio", t:"chi **controlla**, a fine anno?", key:true}],
  etichette:{titolo:{t:"Budget", key:true}}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Il budget non è un taglio.<br>È un **patto**.",
  sotto:"Obiettivi e risorse, scritti prima."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"euro", t:"Il budget"},
  {icona:"occhio", t:"I costi", d:"e il controllo di gestione"},
  {icona:"bilancia", t:"La Regione", d:"il controllo esterno"},
  {icona:"cuoremano", t:"I principi", d:"del modello veneto", key:true}]},

// --- 3 · la metodica di budget
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"L.R. 55/1994 · artt. 13-19", sigla:"Metodica di budget",
  testo:"Uno strumento di **pianificazione** e di **controllo** economico-finanziario."},
{id:"s07", tipo:"rete", tema:"chiaro", sopratitolo:"Serve a programmare",
  centro:"Budget", nodi:[
  {t:"Obiettivi", icona:"spunta"}, {t:"Attività", icona:"ingranaggio"},
  {t:"Fattori produttivi", icona:"persone"}, {t:"Risorse finanziarie", icona:"euro"},
  {t:"Investimenti", icona:"ospedale", key:true}]},
{id:"s08", tipo:"ciclo", tema:"chiaro", sopratitolo:"Prima si programma, poi si misura",
  centro:"Budget", dcentro:"costruisce il preventivo", fasi:[
  {icona:"spunta", t:"Obiettivi"},
  {icona:"ingranaggio", t:"Attività"},
  {icona:"certificato", t:"Risultati"},
  {icona:"occhio", t:"Verifica", key:true}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il primo dei quattro livelli",
  titolo:"Il documento di **direttive**", punti:[
    {icona:"spunta", t:"**obiettivi** e **criteri**"},
    {icona:"bilancia", t:"**vincoli** e **parametri**"},
    {icona:"euro", t:"per formulare il **budget**", key:true}],
  etichette:{titolo:{t:"Direttive", key:true}, sigillo:"Livello 1"}},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Per la dispensa, lo strumento di raccordo",
  titolo:"Dalla direzione **ai reparti**", punti:[
    {icona:"persona", t:"la programmazione **strategica**: la direzione"},
    {icona:"ospedale", t:"la programmazione **operativa**: i reparti", key:true}],
  etichette:{sx:"Strategica", dx:{t:"Operativa", key:true}, basso:"Direttive"}},
{id:"s11", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Il budget generale: l'intera azienda", box:[
  {n:"1", t:"Economico", d:"costi e ricavi"},
  {n:"2", t:"Finanziario", d:"entrate e uscite"},
  {n:"3", t:"Patrimoniale", d:"beni e investimenti"}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Poi si scende", col:[
  {h:"Budget delle strutture", t:"le strutture **fondamentali** dell'azienda"},
  {h:"Budget di centro di responsabilità", t:"le **unità operative**"}]},
{id:"s13", tipo:"piramide", tema:"chiaro", sopratitolo:"Dall'alto verso il basso", strati:[
  {t:"Documento di direttive", d:"obiettivi, criteri, vincoli"},
  {t:"Budget generale", d:"l'intera azienda"},
  {t:"Budget delle strutture", d:"le strutture fondamentali"},
  {t:"Budget di centro di responsabilità", d:"fino al singolo reparto"}]},
{id:"s14", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Torna al primario di medicina",
  titolo:"L'ultimo **gradino**", punti:[
    {icona:"spunta", t:"obiettivi di **attività**"},
    {icona:"euro", t:"**risorse** assegnate"},
    {icona:"chat", t:"**concordati** con la direzione", key:true}],
  etichette:{sx:"Direzione", dx:"Reparto", centro:{t:"Budget", key:true}}},
{id:"s15", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione a un errore comune", righe:[
  {sb:"Il budget generale è solo economico",
   ok:"Ha tre facce: economica, finanziaria e patrimoniale"}]},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"Dalle direttive al reparto:<br>quattro gradini,<br>**un solo filo**."},

// --- 4 · contabilità analitica e controllo di gestione
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Servono i numeri giusti",
  titolo:"Serve **zoomare**", punti:[
    {icona:"ospedale", t:"la contabilità generale: l'**azienda intera**"},
    {icona:"divieto", t:"non dice quanto costa **un reparto**", key:true}],
  etichette:{titolo:{t:"Un reparto?", key:true}}},
{id:"s18", tipo:"norma", tema:"chiaro", etichetta:"L.R. 55/1994 · art. 25", sigla:"Contabilità analitica",
  testo:"**Classifica**, **localizza** e **imputa** i costi, secondo i processi produttivi."},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Dove si spende e per che cosa: tre oggetti", voci:[
  {icona:"persone",     t:"**Centri di responsabilità**"},
  {icona:"ingranaggio", t:"**Aree produttive**, semplici o complesse"},
  {icona:"cuoremano",   t:"**Beni, servizi, prestazioni** per gli utenti"}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Che cos'è",
  titolo:"Il **centro di responsabilità**", punti:[
    {icona:"euro", t:"un'unità operativa con **risorse assegnate**"},
    {icona:"spunta", t:"per **attività** e **risultati** definiti", key:true}],
  etichette:{alto:{t:"Centro di responsabilità", key:true}}},
{id:"s21", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Tre caratteristiche", box:[
  {n:"1", t:"Omogeneità", d:"delle attività svolte"},
  {n:"2", t:"Significatività", d:"delle risorse impiegate"},
  {n:"3", t:"Un responsabile", d:"senza, non c'è centro"}]},
{id:"s22", tipo:"illustrata", tema:"chiaro", ill:"livelli", sopratitolo:"L.R. 56/1994 · art. 20",
  titolo:"Il controllo **di gestione**", punti:[
    {icona:"persona", t:"alle **dirette dipendenze** del DG", key:true},
    {icona:"persone", t:"lavora con i singoli **direttori**"}],
  etichette:{l1:"Direttore generale", l2:{t:"Controllo di gestione", key:true}, l3:"Direttori", l4:"Unità operative"}},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Lo scopo",
  titolo:"**Efficacia** ed **efficienza**", punti:[
    {icona:"euro", t:"nell'acquisizione e nell'impiego delle **risorse**"},
    {icona:"cartella", t:"con la contabilità **generale** e quella **analitica**", key:true}],
  etichette:{sx:"Generale", dx:{t:"Analitica", key:true}, basso:"Controllo di gestione"}},
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Il cuore del controllo",
  titolo:"Gli **scostamenti**", punti:[
    {icona:"documento", t:"quanto si era **previsto**"},
    {icona:"euro", t:"quanto si è davvero **speso**"},
    {icona:"occhio", t:"**perché** c'è una differenza", key:true}],
  etichette:{sx:"Budget", dx:{t:"Consuntivo", key:true}, alto:"Scostamento"}},
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"I risultati viaggiano con",
  titolo:"Il **reporting**", punti:[
    {icona:"documento", t:"il **rapporto di gestione**"},
    {icona:"chat", t:"comunica **programmazione** e **controllo**", key:true}],
  etichette:{titolo:{t:"Report", key:true}, sigillo:"Gestione"}},
{id:"s26", tipo:"rete", tema:"chiaro", sopratitolo:"Si prepara in base a chi lo legge",
  centro:"Report", dcentro:"obiettivi e risultati", nodi:[
  {t:"Direttore generale", icona:"persona", key:true}, {t:"Responsabili delle risorse", icona:"persone"},
  {t:"Altri dirigenti", icona:"cartella"}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s27", tipo:"flusso", tema:"chiaro", sopratitolo:"E se i conti vanno fuori strada?", passi:[
  {icona:"avviso", t:"Squilibrio", d:"economico e finanziario"},
  {icona:"persona", t:"Direttore generale", d:"decide"},
  {icona:"ingranaggio", t:"Revisione del budget", d:"durante l'anno", key:true}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Un esempio",
  titolo:"Giugno: il **report**", punti:[
    {icona:"avviso", t:"i farmaci corrono **sopra il previsto**"},
    {icona:"occhio", t:"si cerca il **perché**"},
    {icona:"ingranaggio", t:"se serve, si **corregge** il budget", key:true}],
  etichette:{data:{t:"Giugno", key:true}, nota:"Report"}},
{id:"s29", tipo:"titolo", tema:"profondo",
  titolo:"**Misurare**, confrontare,<br>**correggere**.",
  sotto:"Il budget vive tutto l'anno."},

// --- 5 · il controllo della Regione
{id:"s30", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Sopra le aziende: tre strumenti della Regione", box:[
  {n:"1", t:"Visto di congruità"},
  {n:"2", t:"Ispezione e vigilanza"},
  {n:"3", t:"Commissario"}]},
{id:"s31", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il primo strumento",
  titolo:"Il **visto di congruità**", punti:[
    {icona:"libro", t:"il **piano generale**"},
    {icona:"documento", t:"il bilancio **pluriennale** e il bilancio economico **preventivo**"},
    {icona:"euro", t:"la proposta di **copertura della perdita**", key:true}],
  etichette:{titolo:"Regione", sigillo:{t:"Visto", key:true}}},
{id:"s32", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Il secondo strumento",
  titolo:"Ispezione e **vigilanza**", punti:[
    {icona:"occhio", t:"la Regione verifica **direttamente**", key:true},
    {icona:"ospedale", t:"come lavorano le **aziende**"}],
  etichette:{titolo:{t:"Regione", key:true}}},
{id:"s33", tipo:"flusso", tema:"chiaro", sopratitolo:"Il terzo, il più forte", passi:[
  {icona:"persona", t:"Direttore generale", d:"non adotta gli atti dovuti"},
  {icona:"bilancia", t:"Regione", d:"interviene"},
  {icona:"sigillo", t:"Commissario", d:"li adotta al suo posto", key:true}]},
{id:"s34", tipo:"contatore", tema:"tenue", sopratitolo:"Occhio all'elenco del visto di congruità",
  valori:[{n:4, t:"atti, da ricordare insieme", key:true}],
  sotto:"Piano generale · bilancio pluriennale · bilancio economico preventivo · copertura della perdita."},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"L'azienda **gestisce**.<br>La Regione **vigila**.",
  sotto:"E se serve, interviene."},

// --- 6 · i tre principi guida
{id:"s36", tipo:"ciclo", tema:"chiaro", sopratitolo:"Annunciati nella lezione 3.1",
  centro:"Modello veneto", dcentro:"tre principi guida", fasi:[
  {icona:"cuoremano", t:"Integrazione", key:true},
  {icona:"persone", t:"Sussidiarietà"},
  {icona:"persona", t:"Prossimità"}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Il primo principio",
  titolo:"**Integrazione** socio-sanitaria", punti:[
    {icona:"ospedale", t:"sanità e sociale nello **stesso sistema**"},
    {icona:"persone", t:"i bisogni **non si dividono** per competenze", key:true}],
  etichette:{sx:"Sanità", dx:{t:"Sociale", key:true}, basso:"Integrazione"}},
{id:"s38", tipo:"icone", tema:"chiaro", sopratitolo:"L'integrazione lavora su tre piani", voci:[
  {icona:"bilancia", t:"**Istituzionale**: la delega dei Comuni"},
  {icona:"ospedale", t:"**Gestionale**: il distretto"},
  {icona:"persone",  t:"**Professionale**: lo stesso percorso"}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"livelli", sopratitolo:"Il secondo principio: sussidiarietà verticale",
  titolo:"Decidere **vicino**", punti:[
    {icona:"persone", t:"le decisioni al livello **più vicino**"},
    {icona:"spunta", t:"salgono solo **quando serve**"},
    {icona:"chat", t:"i Comuni nella **Conferenza dei sindaci**", key:true}],
  etichette:{l1:"Regione", l2:"ULSS", l3:"Conferenza dei sindaci", l4:{t:"Comuni", key:true}}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Sussidiarietà orizzontale",
  titolo:"La forza della **comunità**", punti:[
    {icona:"cuoremano", t:"**famiglie** e **volontariato**"},
    {icona:"persone", t:"**cooperazione** e **terzo settore**", key:true},
    {icona:"certificato", t:"per il PSSR, hanno fatto **tenere il modello**"}],
  etichette:{alto:{t:"Terzo settore", key:true}}},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"territorio", sopratitolo:"Il terzo principio, nel piano socio-sanitario",
  titolo:"La **prossimità**", punti:[
    {icona:"persone", t:"media e bassa complessità **vicino al cittadino**", key:true},
    {icona:"ospedale", t:"alta complessità **negli hub**"}],
  etichette:{centro:"Hub", comuni:{t:"Vicino", key:true}}},
{id:"s42", tipo:"illustrata", tema:"chiaro", ill:"casa", sopratitolo:"La prossimità, in concreto",
  titolo:"La casa, **primo luogo** di cura", punti:[
    {icona:"persone", t:"il **distretto**"},
    {icona:"cuoremano", t:"l'**assistenza domiciliare**", key:true},
    {icona:"ospedale", t:"l'ospedale per la **fase acuta**"}],
  etichette:{insegna:{t:"Domicilio", key:true}, dx:"Distretto"}},
{id:"s43", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"I tre principi si tengono insieme", box:[
  {n:"1", t:"Integrazione", d:"che cosa unire"},
  {n:"2", t:"Sussidiarietà", d:"chi decide"},
  {n:"3", t:"Prossimità", d:"dove portare i servizi"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"**Integrare**,<br>decidere vicino,<br>**curare vicino**."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il budget lo rivede la Regione",
   ok:"Lo rivede il direttore generale, in caso di squilibrio economico e finanziario"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Si **programma**, si misura,<br>si **corregge**.",
  sotto:"Prossimo modulo: l'organizzazione aziendale e l'Azienda Ospedale Università di Padova."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 4", sottotitolo:"Organizzazione aziendale<br>e Azienda Ospedale Università di Padova", ente:ENTE},
];
