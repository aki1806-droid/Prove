// Contenuto delle 48 scene della lezione 10.7. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 10. Esecuzione del contratto:
// D.Lgs. 36/2023 artt. 17-18 (aggiudicazione e stipula), 114 (direzione dell'esecuzione), 120 (modifiche),
// 60 (revisione prezzi), 125-126 (pagamenti e penali), 116-117 (collaudo e garanzie), 122-123 (risoluzione e recesso).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "L'**aggiudicazione** è efficace dopo la verifica dei requisiti; si firma dopo lo **stand still**, in forma scritta elettronica",
  "L'esecuzione la dirige il **RUP**, con il **direttore dell'esecuzione** (servizi e forniture) o il **direttore dei lavori**",
  "Modifiche solo nei casi previsti, con il **quinto d'obbligo**; si paga dopo le verifiche, e alla fine il **collaudo**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Appalti pubblici",
  titolo:"Esecuzione del contratto", sottotitolo:"Lezione 10.7", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"furgone", sopratitolo:"Il nuovo servizio di lavanderia",
  titolo:"La gara è **finita**", punti:[
    {icona:"certificato", t:"l'impresa ha **vinto**"},
    {icona:"avviso", t:"il lavoro è **concluso**?", key:true}],
  etichette:{}},
{id:"s03", tipo:"catena", tema:"chiaro", sopratitolo:"No: comincia la parte più lunga", passi:[
  {t:"Firmato"},
  {t:"Eseguito e controllato"},
  {t:"Pagato"},
  {t:"Verificato alla fine", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"La gara si vince in un **giorno**,<br>il contratto si esegue per **anni**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"Dall'**aggiudicazione** alla firma"},
  {t:"Chi **dirige** l'esecuzione"},
  {t:"Le **modifiche** e le varianti"},
  {t:"**Pagamenti**, garanzie, penali, collaudo"}]},

// --- 3 · dall'aggiudicazione alla firma
{id:"s06", tipo:"catena", tema:"chiaro", sopratitolo:"Art. 17", passi:[
  {t:"Proposta di aggiudicazione"},
  {t:"Verifica dei requisiti"},
  {t:"Aggiudicazione efficace", key:true}]},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Art. 18",
  titolo:"Lo **stand still**", punti:[
    {icona:"chat", t:"l'aggiudicazione si comunica a **tutti**"},
    {icona:"orologio", t:"un termine di **attesa** prima della firma", key:true}],
  etichette:{}},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"A che cosa serve", col:[
  {h:"Chi ha perso", t:"può fare **ricorso** prima della firma"},
  {h:"Non si applica", t:"sotto soglia o con **una sola** offerta", key:true}]},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"La stipula", col:[
  {h:"Per iscritto, elettronica", t:"a pena di **nullità**", key:true},
  {h:"Affidamenti diretti e negoziate", t:"basta uno **scambio di lettere**"}]},
{id:"s10", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 117 · prima della firma, la garanzia definitiva",
  valori:[{n:10, t:"per cento dell'importo, di solito", key:true}],
  sotto:"Tutela l'amministrazione se l'impresa **non adempie**."},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Esecuzione anticipata", col:[
  {h:"In caso di urgenza", t:"con un provvedimento **motivato**"},
  {h:"È un'eccezione", t:"**non** la regola", key:true}]},
{id:"s12", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Trasparenza",
  titolo:"La **banca dati** nazionale", punti:[
    {icona:"documento", t:"l'esito della gara si **pubblica**"},
    {icona:"occhio", t:"i dati restano consultabili **fino al collaudo**", key:true}],
  etichette:{}},
{id:"s13", tipo:"catena", tema:"chiaro", sopratitolo:"La lavanderia", passi:[
  {t:"Antimafia"},
  {t:"Regolarità contributiva"},
  {t:"Termine di legge"},
  {t:"Firma", key:true}]},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"L'aggiudicazione è efficace prima della verifica e vale come contratto",
   ok:"Efficace dopo la verifica; la firma arriva dopo"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"**Aggiudicare**, verificare,<br>attendere, **firmare**."},

// --- 4 · chi dirige l'esecuzione
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"timone", sopratitolo:"Art. 114",
  titolo:"Dirige il **RUP**", punti:[
    {icona:"occhio", t:"controlla la **qualità** delle prestazioni"},
    {icona:"persone", t:"con figure **specifiche**", key:true}],
  etichette:{}},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"Servizi e forniture",
  titolo:"Il **direttore dell'esecuzione**", punti:[
    {icona:"spunta", t:"verifica il servizio"},
    {icona:"avviso", t:"segnala i problemi, **propone** le penali", key:true}],
  etichette:{}},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"gru", sopratitolo:"Lavori",
  titolo:"Il **direttore dei lavori**", punti:[
    {icona:"ingranaggio", t:"controllo **tecnico** e **contabile**"},
    {icona:"persone", t:"con direttori operativi e **ispettori**", key:true}],
  etichette:{}},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"In sanità, chi usa il servizio", celle:[
  {t:"Un **coordinatore** infermieristico"}, {t:"Un **ingegnere** clinico"}, {t:"Un responsabile della **logistica**"}]},
{id:"s20", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I controlli si documentano", celle:[
  {t:"**Verbali** di avvio"}, {t:"Controlli **a campione**"},
  {t:"Segnalazioni dei **reparti**"}, {t:"**Relazioni** periodiche"}]},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Anche dopo la gara",
  titolo:"Chi controlla resta **imparziale**", punti:[
    {icona:"divieto", t:"nessun **interesse personale** legato all'impresa", key:true}],
  etichette:{}},
{id:"s22", tipo:"flusso", tema:"chiaro", sopratitolo:"La lavanderia", passi:[
  {icona:"ospedale", t:"I reparti", d:"segnalano i ritardi"},
  {icona:"documento", t:"Il direttore dell'esecuzione", d:"verbalizza"},
  {icona:"persona", t:"Il RUP", key:true}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il direttore dell'esecuzione sostituisce il RUP",
   ok:"Il RUP dirige; il direttore dell'esecuzione lo supporta"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Senza **controlli**,<br>il contratto resta sulla **carta**."},

// --- 5 · modifiche e varianti
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"cartello", sopratitolo:"Art. 120",
  titolo:"Il contratto può **cambiare**", punti:[
    {icona:"documento", t:"solo nei casi **ammessi**"},
    {icona:"avviso", t:"altrimenti si **aggirerebbe** la gara", key:true}],
  etichette:{}},
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"Sono ammesse", col:[
  {h:"Clausole chiare", t:"già nei documenti di gara, come le **opzioni**"},
  {h:"Circostanze imprevedibili", t:"entro **limiti** di valore", key:true}]},
{id:"s27", tipo:"confronto", tema:"chiaro", sopratitolo:"E ancora", col:[
  {h:"Prestazioni supplementari", t:"non affidabili ad altri senza **gravi inconvenienti**"},
  {h:"Modifiche non sostanziali", t:"non alterano la **natura** del contratto", key:true}]},
{id:"s28", tipo:"numero", tema:"chiaro", sopratitolo:"Il quinto d'obbligo",
  cifra:"1/5", testo:"dell'importo, in più o in meno, **alle stesse condizioni**"},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Art. 60",
  titolo:"La **revisione dei prezzi**", punti:[
    {icona:"documento", t:"clausole **obbligatorie** nei contratti"},
    {icona:"euro", t:"quando i costi cambiano **oltre una soglia**", key:true}],
  etichette:{}},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Ogni modifica", col:[
  {h:"Si motiva", t:"e si **documenta**"},
  {h:"Le più rilevanti", t:"si comunicano all'**ANAC**", key:true}]},
{id:"s31", tipo:"catena", tema:"chiaro", sopratitolo:"Apre un nuovo reparto", passi:[
  {t:"Serve più biancheria"},
  {t:"Entro un quinto"},
  {t:"Stesse condizioni", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il quinto d'obbligo è una scelta dell'impresa",
   ok:"Entro quel limite l'impresa è tenuta a eseguire"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Il contratto può **cambiare**,<br>ma dentro regole **precise**."},

// --- 6 · pagamenti, garanzie, collaudo
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 125 · il pagamento", col:[
  {h:"Dopo la verifica", t:"spesso per **stati di avanzamento**"},
  {h:"All'inizio", t:"un'**anticipazione**, garantita dall'impresa", key:true}]},
{id:"s35", tipo:"contatore", tema:"chiaro", sopratitolo:"I termini di pagamento", sep:"·",
  valori:[{n:30, t:"giorni: pubbliche amministrazioni"}, {n:60, t:"giorni: enti del servizio sanitario", key:true}],
  sotto:"I ritardi producono **interessi**."},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Pagamenti tracciabili", celle:[
  {t:"**Conti** dedicati"}, {t:"Il **codice** della gara"}, {t:"Regolarità **contributiva**"}]},
{id:"s37", tipo:"contatore", tema:"chiaro", sopratitolo:"Art. 126 · le penali, per ogni giorno di ritardo",
  valori:[{n:10, t:"per cento dell'importo, al massimo", key:true}],
  sotto:"Previste dal **contratto**."},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 116 · alla fine si verifica il risultato", col:[
  {h:"Lavori", t:"il **collaudo**"},
  {h:"Servizi e forniture", t:"la **verifica di conformità**", key:true}]},
{id:"s39", tipo:"catena", tema:"chiaro", sopratitolo:"La garanzia definitiva", passi:[
  {t:"Prestata alla firma"},
  {t:"Svincolata man mano"},
  {t:"Del tutto dopo il collaudo", key:true}]},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Artt. 122-123 · nei casi gravi", col:[
  {h:"Risoluzione", t:"per **grave inadempimento**"},
  {h:"Recesso", t:"si paga l'eseguito e **una parte** del resto", key:true}]},
{id:"s41", tipo:"catena", tema:"chiaro", sopratitolo:"La lavanderia in ritardo", passi:[
  {t:"Il direttore documenta"},
  {t:"Il RUP contesta"},
  {t:"Le penali"},
  {t:"Se grave, la risoluzione", key:true}]},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le penali si applicano senza contestazione",
   ok:"Prima le controdeduzioni dell'impresa"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Pagare bene, controllare **sempre**,<br>collaudare alla **fine**."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Aziende sanitarie: si paga entro trenta giorni",
   ok:"Entro sessanta giorni"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Una buona **gara**,<br>un'esecuzione **seguita**.",
  sotto:"Prossimo modulo: elementi di contabilità delle pubbliche amministrazioni."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 11", sottotitolo:"Contabilità delle pubbliche amministrazioni", ente:ENTE},
];
