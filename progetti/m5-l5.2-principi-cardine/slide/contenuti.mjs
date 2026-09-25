// Contenuto delle 48 scene della lezione 5.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 5. I principi cardine della L. 241/1990:
// art. 1 (legalità, cinque criteri, principi UE, c. 1-bis, 1-ter, c. 2 divieto di aggravamento,
// c. 2-bis collaborazione e buona fede); trasparenza, partecipazione, tempi certi, responsabilizzazione.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Fini della **legge**; criteri di **economicità**, **efficacia**, **imparzialità**, **pubblicità**, **trasparenza**; principi **UE**",
  "**Divieto di aggravamento**: solo per straordinarie e motivate esigenze dell'**istruttoria**",
  "Atti **non autoritativi**: **diritto privato**. Dal 2020: **collaborazione** e **buona fede**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Procedimento amministrativo e accesso",
  titolo:"I principi<br>cardine", sottotitolo:"Lezione 5.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"norma", tema:"chiaro", etichetta:"Legge 241/1990 · le prime righe", sigla:"Articolo 1",
  testo:"Breve, ma dentro c'è **tutto**: come deve comportarsi un'amministrazione."},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"I principi cardine", col:[
  {h:"Ai quiz", t:"un **elenco** da ricordare", grande:true},
  {h:"Nel lavoro", t:"la chiave per leggere **ogni altra regola**", grande:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Prima dei singoli articoli,<br>il modo di stare<br>davanti al **cittadino**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"L'articolo 1", d:"e i suoi criteri"},
  {icona:"occhio", t:"Trasparenza", d:"e partecipazione"},
  {icona:"orologio", t:"Tempi certi", d:"e responsabilità"},
  {icona:"spunta", t:"Semplificazione", d:"e buona fede", key:true}]},

// --- 3 · l'articolo 1
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il punto di partenza: la legalità",
  titolo:"I fini li fissa la **legge**", punti:[
    {icona:"bilancia", t:"l'attività persegue i **fini della legge**", key:true},
    {icona:"divieto", t:"l'amministrazione non sceglie **da sola** i suoi scopi"}],
  etichette:{titolo:{t:"Legalità", key:true}, sigillo:"Legge"}},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"I cinque criteri, nell'ordine della legge", celle:[
  {t:"**Economicità**"}, {t:"**Efficacia**"}, {t:"**Imparzialità**"},
  {t:"**Pubblicità**"}, {t:"**Trasparenza**"}, {t:"+ principi **UE**"}]},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Due criteri che vanno insieme", col:[
  {h:"Economicità", t:"usare le risorse **senza sprechi**", grande:true},
  {h:"Efficacia", t:"raggiungere davvero il **risultato**", grande:true}]},
{id:"s09", tipo:"icone", tema:"chiaro", sopratitolo:"Gli altri tre", voci:[
  {icona:"bilancia", t:"**Imparzialità**: tutti allo stesso modo"},
  {icona:"chat",     t:"**Pubblicità**: l'azione è conoscibile"},
  {icona:"occhio",   t:"**Trasparenza**: l'azione è comprensibile"}]},
{id:"s10", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio di imparzialità: una graduatoria per un incarico", passi:[
  {icona:"documento", t:"Criteri fissati prima"},
  {icona:"persone", t:"Uguali per tutti"},
  {icona:"divieto", t:"Non conta il nome", d:"di chi fa domanda", key:true}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Dall'ordinamento europeo",
  titolo:"Altri **principi**", punti:[
    {icona:"bilancia", t:"la **proporzionalità**"},
    {icona:"persone", t:"il **legittimo affidamento**", key:true}],
  etichette:{sx:"Italia", dx:"Unione europea", centro:{t:"Principi comuni", key:true}}},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Proporzionalità e ragionevolezza",
  titolo:"La misura **giusta**", punti:[
    {icona:"spunta", t:"**adeguata** allo scopo"},
    {icona:"divieto", t:"non più **pesante** del necessario", key:true},
    {icona:"giudice", t:"applicate dai **giudici**"}],
  etichette:{sx:"Scopo", dx:"Mezzo", alto:{t:"Equilibrio", key:true}}},
{id:"s13", tipo:"norma", tema:"chiaro", etichetta:"Art. 1, comma 1-bis", sigla:"Diritto privato",
  testo:"Per gli atti **non autoritativi**, salvo che la legge disponga **diversamente**."},
{id:"s14", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 1, comma 1-ter · i privati che svolgono attività amministrative", col:[
  {h:"Stessi criteri", t:"dell'amministrazione pubblica"},
  {h:"Garanzia", t:"**non inferiore** a quella pubblica"}]},
{id:"s15", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Tra i criteri dell'art. 1 ci sono produttività e profitto",
   ok:"Economicità, efficacia, imparzialità, pubblicità e trasparenza"}]},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"Fini fissati dalla **legge**,<br>cinque **criteri**<br>per raggiungerli."},

// --- 4 · trasparenza e partecipazione
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Il principio che ha cambiato di più",
  titolo:"La **trasparenza**", punti:[
    {icona:"occhio", t:"decisioni **conoscibili**"},
    {icona:"libro", t:"decisioni **comprensibili**"},
    {icona:"spunta", t:"per consentire un **controllo**", key:true}],
  etichette:{alto:"Trasparenza", dx:{t:"Controllo", key:true}}},
{id:"s18", tipo:"assetempo", tema:"chiaro", sopratitolo:"Come si è allargata",
  da:1988, a:2016, decenni:[1990,2000,2010], tappe:[
  {anno:1990, et:"Accesso e motivazione"}, {anno:2005, et:"Trasparenza in art. 1"},
  {anno:2013, et:"D.Lgs. 33: pubblicazione", key:true}]},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Protegge anche chi lavora",
  titolo:"Un **riparo**", punti:[
    {icona:"documento", t:"un procedimento **chiaro** e documentato"},
    {icona:"scudo", t:"al riparo da **sospetti** e **pressioni**", key:true}],
  etichette:{alto:{t:"Procedimento trasparente", key:true}}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Il secondo pilastro: la partecipazione", col:[
  {h:"Chi è toccato da una decisione", t:"non la **subisce** soltanto alla fine", grande:true},
  {h:"Può intervenire", t:"mentre la decisione **si forma**", grande:true}]},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Gli strumenti della partecipazione",
  titolo:"Dire la **propria**", punti:[
    {icona:"chat", t:"la **comunicazione** di avvio"},
    {icona:"occhio", t:"vedere gli **atti**"},
    {icona:"documento", t:"**memorie** e documenti, da valutare", key:true}],
  etichette:{sx:"Ufficio", dx:{t:"Interessato", key:true}, alto:"Avvio"}},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Partecipare conviene a tutti", col:[
  {h:"Al cittadino", t:"difende le sue **ragioni**", grande:true},
  {h:"All'amministrazione", t:"decide con **informazioni migliori**", grande:true}]},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Un esempio in sanità",
  titolo:"Ascoltare **prima**", punti:[
    {icona:"persone", t:"la richiesta di un **utente** o di un **dipendente**"},
    {icona:"chat", t:"le sue **ragioni**, ascoltate"},
    {icona:"bilancia", t:"e **pesate** nella decisione", key:true}],
  etichette:{insegna:{t:"Azienda", key:true}}},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Partecipare vuol dire decidere insieme",
   ok:"Decide l'amministrazione: deve valutare le memorie pertinenti e dire perché non le accoglie"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Vedere come si **decide**,<br>e poter dire la **propria**<br>prima della decisione."},

// --- 5 · tempi certi e responsabilità
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Il terzo principio",
  titolo:"La certezza dei **tempi**", punti:[
    {icona:"documento", t:"un provvedimento **espresso**"},
    {icona:"orologio", t:"entro un **termine** stabilito", key:true},
    {icona:"libro", t:"i dettagli nella **lezione 5.5**"}],
  etichette:{alto:{t:"Termine", key:true}}},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Tempi certi vogliono dire poter programmare", voci:[
  {icona:"ingranaggio", t:"L'**impresa** sa quando partire"},
  {icona:"persona",     t:"Il **cittadino** sa quando avrà risposta"},
  {icona:"cuoremano",   t:"Il **dipendente** sa quando sarà deciso"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Il quarto principio: la responsabilizzazione",
  titolo:"Il ritardo ha un **nome**", punti:[
    {icona:"persona", t:"un **responsabile** per ogni procedimento"},
    {icona:"spunta", t:"pesa sulla **performance** di dirigente e funzionario", key:true}],
  etichette:{top:"Dirigente", basso:{t:"Responsabile", key:true}}},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Il ritardo può portare a", celle:[
  {t:"Responsabilità **disciplinare**"}, {t:"Responsabilità **amministrativo contabile**"}, {t:"**Risarcimento** del danno ingiusto"}]},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Il rovescio della responsabilità", col:[
  {h:"Chi guida un procedimento", t:"deve poter **lavorare**"},
  {h:"Con", t:"compiti **chiari** e termini fissati **in anticipo**"}]},
{id:"s31", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Responsabilizzare",
  da:{h:"Non vuol dire", t:"colpevolizzare"},
  a:{h:"Vuol dire", t:"rendere **visibile** chi fa che cosa"},
  sotto:"Il lavoro fatto bene si vede, i ritardi hanno un nome."},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il silenzio dell'amministrazione è una scelta libera, senza conseguenze",
   ok:"Anche quando la legge gli dà un valore, è un'eccezione precisa, non la regola"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Una **data** di scadenza e un **nome**:<br>la fine dell'attesa<br>senza risposta."},

// --- 6 · semplificazione e buona fede
{id:"s34", tipo:"norma", tema:"chiaro", etichetta:"Art. 1, comma 2 · il quinto principio", sigla:"Non aggravare",
  testo:"Solo per **straordinarie** e **motivate** esigenze dell'**istruttoria**."},
{id:"s35", tipo:"icone", tema:"chiaro", sopratitolo:"In pratica", voci:[
  {icona:"divieto",  t:"Niente passaggi **inutili**"},
  {icona:"documento",t:"Niente documenti chiesti **due volte**"},
  {icona:"cartella", t:"Ciò che l'amministrazione ha, lo acquisisce **d'ufficio**"}]},
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Un esempio: una domanda di mobilità interna",
  titolo:"Il **fascicolo** c'è già", punti:[
    {icona:"divieto", t:"non si chiedono certificati **già presenti**"},
    {icona:"cartella", t:"l'azienda li trova nel **fascicolo personale**", key:true}],
  etichette:{cassetto:{t:"Fascicolo personale", key:true}}},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Gli strumenti della semplificazione", celle:[
  {t:"L'**autocertificazione**"}, {t:"La **SCIA**"},
  {t:"Il **silenzio assenso**"}, {t:"La **conferenza di servizi**"}]},
{id:"s38", tipo:"norma", tema:"chiaro", etichetta:"Art. 1, comma 2-bis · dal 2020", sigla:"Buona fede",
  testo:"Rapporti tra cittadino e amministrazione improntati alla **collaborazione** e alla **buona fede**."},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Vale in due direzioni", col:[
  {h:"L'amministrazione", t:"non tende **tranelli**, non cambia le carte in tavola"},
  {h:"Il cittadino", t:"dichiara il **vero** e collabora"}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Collegato", titolo:"La **telematica**", punti:[
    {icona:"ingranaggio", t:"strumenti **informatici** e telematici"},
    {icona:"persone", t:"dentro l'ente, tra enti, con i **privati**", key:true}],
  etichette:{top:"Amministrazione", basso:{t:"Cittadini e imprese", key:true}}},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Semplificare vuol dire rinunciare ai controlli",
   ok:"Autocertificazioni e segnalazioni si verificano; chi dichiara il falso risponde anche penalmente"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Meno carte **inutili**,<br>più **fiducia** reciproca,<br>controlli dove servono."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La trasparenza è nell'art. 97 della Costituzione, o è nata con il D.Lgs. 33",
   ok:"È nell'art. 1 della 241 dal 2005"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Legalità, criteri **chiari**,<br>porte **aperte**, tempi **certi**,<br>meno burocrazia.",
  sotto:"Prossima lezione: il responsabile del procedimento."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 5.3", sottotitolo:"Il responsabile<br>del procedimento", ente:ENTE},
];
