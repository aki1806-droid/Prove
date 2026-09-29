// Contenuto delle 48 scene della lezione 9.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 9. Le figure della sicurezza:
// D.Lgs. 81/2008 art. 2 lett. b, d, e, f, h, i; artt. 16, 17, 18, 19, 20, 25, 31, 32, 33, 35, 47, 50.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il datore di lavoro **non delega** la valutazione dei rischi e la designazione del **RSPP**",
  "Il **dirigente** organizza e vigila, il **preposto** sovrintende e controlla; il lavoratore cura la sicurezza **sua e altrui**",
  "Il **servizio** supporta, il **medico competente** sorveglia, il **RLS** è eletto o designato dai lavoratori",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 9 · Salute e sicurezza sul lavoro",
  titolo:"Le figure della sicurezza", sottotitolo:"Lezione 9.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"cartello", sopratitolo:"Un caso in reparto",
  titolo:"Il sollevatore **guasto**", punti:[
    {icona:"orologio", t:"fermo da **settimane**"},
    {icona:"chat", t:"lo sanno tutti, c'è anche una **mail**"},
    {icona:"persone", t:"ma chi doveva fare **che cosa**?", key:true}],
  etichette:{alto:{t:"Guasto", key:true}}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Una catena di figure", col:[
  {h:"Se la catena funziona", t:"il problema si risolve in **fretta**"},
  {h:"Se si spezza", t:"qualcuno ne **risponde**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Ogni **anello** della catena<br>ha il suo **compito**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"giudice", t:"Il datore di lavoro"},
  {icona:"persone", t:"Dirigenti e preposti"},
  {icona:"scudo", t:"Servizio e medico", key:true},
  {icona:"persona", t:"Lavoratori e RLS"}]},

// --- 3 · il datore di lavoro
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 81/2008, art. 2, lett. b", sigla:"Art. 2",
  testo:"Nelle PA il datore di lavoro è il **dirigente con poteri di gestione**, individuato dall'**organo di vertice**."},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Se l'individuazione manca",
  titolo:"Coincide con l'**organo di vertice**", punti:[
    {icona:"ospedale", t:"in un'azienda sanitaria, di regola, il **direttore generale**", key:true}],
  etichette:{top:{t:"Vertice", key:true}}},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Risponde per primo", col:[
  {h:"Le sue scelte", t:"di **organizzazione** e di **spesa**"},
  {h:"Da cui dipende", t:"tutto il sistema di **prevenzione**", key:true}]},
{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 17 · obblighi non delegabili", voci:[
  {icona:"documento", t:"La **valutazione** dei rischi e il **documento**"},
  {icona:"persona", t:"La designazione del **RSPP**"}]},
{id:"s10", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 16 · la delega di funzioni", passi:[
  {icona:"documento", t:"Atto scritto", d:"con data certa"},
  {icona:"cappello", t:"Delegato capace", d:"professionalità ed esperienza"},
  {icona:"ingranaggio", t:"Tutti i poteri", d:"organizzare, gestire, controllare", key:true}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"Autonomia di **spesa**"}, {t:"**Accettazione** scritta"}, {t:"Adeguata **pubblicità**"}]},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Dopo la delega",
  titolo:"Resta l'obbligo di **vigilare**", punti:[
    {icona:"occhio", t:"che il delegato svolga **correttamente** le funzioni", key:true}],
  etichette:{}},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"La valutazione dei rischi si può delegare",
   ok:"Il datore si fa aiutare, ma la responsabilità resta sua"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Si delegano i **compiti**,<br>non la responsabilità di **valutare**."},

// --- 4 · dirigenti e preposti
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Art. 2, lett. d",
  titolo:"Il **dirigente**", punti:[
    {icona:"ingranaggio", t:"attua le **direttive** del datore"},
    {icona:"occhio", t:"**organizza** l'attività e **vigila**", key:true}],
  etichette:{top:{t:"Direttive", key:true}}},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"In sanità · direttori di struttura e responsabili dei servizi", celle:[
  {t:"Designano gli addetti alle **emergenze**"}, {t:"Forniscono i **dispositivi**"}, {t:"**Formano** e informano"}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"casco", sopratitolo:"Art. 2, lett. e",
  titolo:"Il **preposto**", punti:[
    {icona:"occhio", t:"**sovrintende** e controlla l'esecuzione"},
    {icona:"spunta", t:"con un potere di **iniziativa**", key:true}],
  etichette:{alto:{t:"Sovrintende", key:true}}},
{id:"s18", tipo:"flusso", tema:"chiaro", sopratitolo:"Art. 19 · il preposto deve", passi:[
  {icona:"occhio", t:"Vigilare", d:"regole e dispositivi"},
  {icona:"lucchetto", t:"Filtrare", d:"le zone a rischio grave"},
  {icona:"avviso", t:"Segnalare", d:"subito carenze e pericoli", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Dal 2021", col:[
  {h:"Se vede un comportamento pericoloso", t:"**interviene** e, se serve, **interrompe**", key:true},
  {h:"Il datore di lavoro", t:"lo **individua** formalmente"}]},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Dirigenti e preposti", col:[
  {h:"Formazione", t:"**specifica**, in aggiunta a quella dei lavoratori"},
  {h:"Aggiornamento", t:"**periodico**", key:true}]},
{id:"s21", tipo:"catena", tema:"chiaro", sopratitolo:"Torniamo al sollevatore", passi:[
  {t:"Il preposto", d:"segnala subito"},
  {t:"Il dirigente", d:"provvede"},
  {t:"Intanto", d:"un'alternativa sicura", key:true}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Senza nomina scritta non si è preposti",
   ok:"Preposto è una funzione: conta chi di fatto sovrintende"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Chi dirige **organizza**,<br>chi sovrintende **vigila**."},

// --- 5 · servizio di prevenzione e medico competente
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Art. 2, lett. f e l",
  titolo:"Il servizio di **prevenzione e protezione**", punti:[
    {icona:"persone", t:"persone e mezzi a **supporto** del datore"},
    {icona:"persona", t:"guidato dal **RSPP**, designato dal datore", key:true}],
  etichette:{top:{t:"Datore", key:true}}},
{id:"s25", tipo:"griglia", tema:"chiaro", colonne:5, spunta:true, sopratitolo:"Art. 33 · i compiti", celle:[
  {t:"Individua i **rischi**"}, {t:"Contribuisce alla **valutazione**"}, {t:"Elabora **misure** e procedure"},
  {t:"Propone la **formazione**"}, {t:"Partecipa alla **riunione**"}]},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 32 · i requisiti", col:[
  {h:"Per farne parte", t:"**diploma** e corsi con verifica"},
  {h:"Per il responsabile", t:"formazione **ulteriore**", key:true}]},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Art. 31, cc. 6 e 7",
  titolo:"Ricovero e cura oltre **50** lavoratori", punti:[
    {icona:"ospedale", t:"servizio **interno**"},
    {icona:"persona", t:"e responsabile **interno**", key:true}],
  etichette:{}},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Art. 25 · il medico competente",
  titolo:"Nominato dal **datore**", punti:[
    {icona:"documento", t:"collabora alla **valutazione**"},
    {icona:"cuoremano", t:"programma la **sorveglianza** sanitaria", key:true},
    {icona:"occhio", t:"visita gli **ambienti** di lavoro"}],
  etichette:{}},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Il giudizio di idoneità alla mansione", celle:[
  {t:"**Idoneo**"}, {t:"Idoneo con **prescrizioni** o limitazioni"},
  {t:"Non idoneo **temporaneo**"}, {t:"Non idoneo **permanente**"}]},
{id:"s30", tipo:"contatore", tema:"chiaro", sopratitolo:"La cartella sanitaria e di rischio",
  valori:[{n:10, t:"anni di conservazione, almeno", key:true}],
  sotto:"Coperta dal **segreto professionale**."},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il RSPP è il datore di lavoro",
   ok:"È un consulente tecnico che lo supporta"}]},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"Il servizio **consiglia**,<br>il medico **sorveglia**, il datore **decide**."},

// --- 6 · lavoratori e rappresentanti
{id:"s33", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Art. 20 · i lavoratori",
  titolo:"Anche loro hanno **obblighi**", punti:[
    {icona:"persona", t:"curare la **propria** sicurezza"},
    {icona:"persone", t:"e quella delle **altre persone** presenti", key:true}],
  etichette:{}},
{id:"s34", tipo:"griglia", tema:"chiaro", colonne:5, spunta:true, sopratitolo:"Il lavoratore deve", celle:[
  {t:"Osservare le **istruzioni**"}, {t:"Usare bene **attrezzature**"}, {t:"**Segnalare** i pericoli"},
  {t:"Partecipare alla **formazione**"}, {t:"Fare i **controlli** sanitari"}]},
{id:"s35", tipo:"icone", tema:"chiaro", sopratitolo:"E non deve", voci:[
  {icona:"divieto", t:"**Rimuovere** o modificare i dispositivi di sicurezza"},
  {icona:"divieto", t:"Fare operazioni **non di sua competenza**"}]},
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Art. 47 e 50 · il RLS",
  titolo:"Il **rappresentante** dei lavoratori", punti:[
    {icona:"persone", t:"**eletto** o designato dai lavoratori"},
    {icona:"chat", t:"**consultato** sulla valutazione"},
    {icona:"documento", t:"riceve **copia** del documento", key:true}],
  etichette:{}},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Quanti rappresentanti", col:[
  {h:"Il numero", t:"cresce con le **dimensioni**"},
  {h:"In una grande azienda sanitaria", t:"**diversi**, per sedi e servizi", key:true}]},
{id:"s38", tipo:"flusso", tema:"chiaro", sopratitolo:"Il RLS può", passi:[
  {icona:"chat", t:"Proporre", d:"misure"},
  {icona:"avviso", t:"Segnalare", d:"i rischi"},
  {icona:"giudice", t:"Rivolgersi", d:"agli organi di vigilanza", key:true}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Art. 35 · oltre 15 lavoratori, almeno una volta l'anno", celle:[
  {t:"Datore di **lavoro**"}, {t:"**RSPP**"},
  {t:"Medico **competente**"}, {t:"**RLS**"}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"La riunione periodica",
  titolo:"Che cosa si **esamina**", punti:[
    {icona:"documento", t:"il **documento** di valutazione"},
    {icona:"cuoremano", t:"infortuni e **malattie** professionali"},
    {icona:"scudo", t:"dispositivi e **formazione**", key:true}],
  etichette:{titolo:"Verbale", sigillo:{t:"Riunione", key:true}}},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il RLS è nominato dal datore di lavoro",
   ok:"È eletto o designato dai lavoratori"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"La sicurezza è un lavoro di **squadra**,<br>con **ruoli** chiari."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La riunione periodica è facoltativa",
   ok:"Oltre 15 lavoratori, almeno una volta all'anno"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Un datore che **valuta**, preposti che **vigilano**,<br>lavoratori che **partecipano**.",
  sotto:"Prossima lezione: DVR, formazione e dispositivi di protezione."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 9.5", sottotitolo:"DVR, formazione, DPI", ente:ENTE},
];
