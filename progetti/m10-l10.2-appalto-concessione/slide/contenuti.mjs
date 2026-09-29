// Contenuto delle 50 scene della lezione 10.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 10. Appalto, concessione, ambito:
// D.Lgs. 36/2023 all. I.1 (definizioni), artt. 13, 14, 56, 177; contratti attivi e passivi.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "**Appalto**: lavori, forniture o servizi, pagati con un **prezzo** dall'amministrazione",
  "**Concessione**: l'impresa è ripagata con il **diritto di gestire** e si assume il **rischio operativo**",
  "**Valore stimato** al netto dell'IVA, con opzioni e rinnovi; vietato il **frazionamento** artificioso",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Appalti pubblici",
  titolo:"Appalto, concessione, ambito", sottotitolo:"Lezione 10.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"In ospedale, gestiti da imprese esterne", celle:[
  {t:"La **mensa** per i pazienti"}, {t:"Il **parcheggio** a pagamento"}, {t:"Il **bar** nell'atrio"}]},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Sono tutti appalti?", col:[
  {h:"No", t:"alcuni appalti, altri **concessioni**"},
  {h:"La domanda", t:"chi si assume il **rischio** della gestione?", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Tutto dipende da chi corre<br>il **rischio** della gestione."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"L'**appalto** e i suoi tipi"},
  {t:"La **concessione** e il rischio operativo"},
  {t:"Esempi dalla **sanità**"},
  {t:"L'**ambito** del codice"}]},

// --- 3 · l'appalto
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"L'appalto",
  titolo:"Un contratto **a titolo oneroso**", punti:[
    {icona:"documento", t:"stipulato per **iscritto**"},
    {icona:"ospedale", t:"tra **stazioni appaltanti**"},
    {icona:"persone", t:"e **operatori economici**", key:true}],
  etichette:{alto:{t:"Appalto", key:true}, sx:"Stazione appaltante", dx:"Impresa"}},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Oggetto e corrispettivo", col:[
  {h:"Oggetto", t:"lavori, **forniture**, servizi"},
  {h:"L'amministrazione", t:"paga un **prezzo**", key:true}]},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"I tipi di appalto", col:[
  {h:"Lavori", t:"costruire, **ristrutturare**, demolire"},
  {h:"Forniture", t:"acquisto, **locazione**, leasing di beni", key:true}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Servizi: né lavori né forniture", celle:[
  {t:"**Pulizie**"}, {t:"**Manutenzioni**"}, {t:"**Lavanderia**"},
  {t:"**Ristorazione**"}, {t:"**Vigilanza**"}, {t:"Servizi **informatici**"}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"I contratti misti", col:[
  {h:"Prestazioni", t:"di tipo **diverso**"},
  {h:"Si guarda", t:"all'**oggetto principale**", key:true}]},
{id:"s11", tipo:"catena", tema:"chiaro", sopratitolo:"Un contratto di diritto privato", passi:[
  {t:"Procedura pubblica", d:"scelta del contraente"},
  {t:"Contratto"},
  {t:"Codice civile", d:"insieme al codice", key:true}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Contratti passivi e attivi", col:[
  {h:"Passivi: appalto e concessione", t:"spesa o uso di **risorse pubbliche**", key:true},
  {h:"Attivi: vendita, affitto di beni", t:"seguono **altre regole**"}]},
{id:"s13", tipo:"illustrata", tema:"chiaro", ill:"microscopio", sopratitolo:"Un esempio",
  titolo:"Il **service** di laboratorio", punti:[
    {icona:"ingranaggio", t:"analizzatori, **reagenti**, assistenza"},
    {icona:"spunta", t:"fornitura **e** servizio insieme", key:true}],
  etichette:{}},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Locazione e leasing di beni sono fuori dal codice",
   ok:"Anche l'affitto di un'apparecchiatura è una fornitura"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"Lavori, forniture, servizi:<br>l'amministrazione **paga**."},

// --- 4 · la concessione
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"La concessione",
  titolo:"Cambia il **corrispettivo**", punti:[
    {icona:"ingranaggio", t:"il **diritto di gestire** l'opera o il servizio", key:true}],
  etichette:{}},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"L'elemento decisivo", col:[
  {h:"A volte", t:"anche un **prezzo** pubblico"},
  {h:"Sempre", t:"il **rischio operativo** al concessionario", key:true}]},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Il rischio operativo", col:[
  {h:"Non è garantito", t:"il recupero degli **investimenti**"},
  {h:"Il concessionario", t:"può **guadagnare** o **perdere**", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"Due lati del rischio", col:[
  {h:"Domanda", t:"meno **utenti** del previsto"},
  {h:"Offerta", t:"costi più alti, **standard** non rispettati", key:true}]},
{id:"s20", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Se i costi sono comunque garantiti",
  da:{h:"Il nome", t:"concessione"},
  a:{h:"La sostanza", t:"un **appalto**: il rischio non passa"}},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"La durata", col:[
  {h:"Quanto basta", t:"a recuperare gli **investimenti**"},
  {h:"Non di più", t:"o si **chiude** il mercato", key:true}]},
{id:"s22", tipo:"illustrata", tema:"chiaro", ill:"gru", sopratitolo:"Regole proprie nel codice",
  titolo:"Il **partenariato** pubblico privato", punti:[
    {icona:"euro", t:"capitali **privati**"},
    {icona:"ospedale", t:"finalità **pubbliche**", key:true}],
  etichette:{alto:{t:"Nuovo ospedale", key:true}}},
{id:"s23", tipo:"illustrata", tema:"chiaro", ill:"furgone", sopratitolo:"Un esempio",
  titolo:"Il **parcheggio** dell'ospedale", punti:[
    {icona:"euro", t:"l'impresa incassa le **tariffe**"},
    {icona:"avviso", t:"poche auto: **perde**", key:true}],
  etichette:{}},
{id:"s24", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Nella concessione l'amministrazione garantisce i ricavi",
   ok:"Il rischio operativo passa al concessionario"}]},
{id:"s25", tipo:"titolo", tema:"profondo",
  titolo:"Nella concessione il **rischio**<br>passa all'**impresa**."},

// --- 5 · esempi in sanità
{id:"s26", tipo:"confronto", tema:"chiaro", sopratitolo:"In sanità gli appalti sono ovunque", col:[
  {h:"Forniture", t:"farmaci, **dispositivi**, apparecchiature"},
  {h:"Servizi", t:"pulizie, mensa, **lavanderia**, trasporto campioni", key:true}]},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"gru", sopratitolo:"I lavori",
  titolo:"Reparti e **padiglioni**", punti:[
    {icona:"ospedale", t:"ristrutturazioni e nuove **costruzioni**"},
    {icona:"ingranaggio", t:"la **manutenzione**: servizio o lavoro", key:true}],
  etichette:{alto:{t:"Lavori", key:true}}},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Le concessioni in ospedale", celle:[
  {t:"Il **bar** interno"}, {t:"I **distributori** automatici"},
  {t:"I **parcheggi**"}, {t:"Servizi ai **visitatori**"}]},
{id:"s29", tipo:"catena", tema:"chiaro", sopratitolo:"La finanza di progetto", passi:[
  {t:"Il privato costruisce"},
  {t:"Gestisce servizi", d:"non sanitari"},
  {t:"Si ripaga nel tempo", key:true}]},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Torniamo all'inizio", col:[
  {h:"La mensa, pagata dall'azienda", t:"**appalto** di servizi"},
  {h:"Parcheggio e bar, pagati dagli utenti", t:"di regola **concessioni**", key:true}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Perché la distinzione conta", celle:[
  {t:"Le **regole** di gara"}, {t:"La **durata**"},
  {t:"Il calcolo del **valore**"}, {t:"Chi sopporta le **perdite**"}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Il valore della concessione", col:[
  {h:"Non conta", t:"quanto paga l'**amministrazione**"},
  {h:"Conta", t:"il **fatturato** del concessionario, per tutta la durata", key:true}]},
{id:"s33", tipo:"illustrata", tema:"chiaro", ill:"carrello", sopratitolo:"Un esempio",
  titolo:"I **distributori** automatici", punti:[
    {icona:"euro", t:"l'impresa incassa, versa un **canone**"},
    {icona:"avviso", t:"il rischio di vendere poco resta **suo**", key:true}],
  etichette:{}},
{id:"s34", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Conta il nome che le parti danno al contratto",
   ok:"Contano il rischio e il modo in cui l'impresa è pagata"}]},
{id:"s35", tipo:"titolo", tema:"profondo",
  titolo:"La **sostanza** prevale sempre<br>sul **nome** del contratto."},

// --- 6 · l'ambito del codice
{id:"s36", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 13 · a chi si applica", col:[
  {h:"Appalti e concessioni", t:"delle **amministrazioni** pubbliche"},
  {h:"E degli altri obbligati", t:"come gli **organismi di diritto pubblico**", key:true}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Le aziende sanitarie",
  titolo:"Amministrazioni **aggiudicatrici**", punti:[
    {icona:"libro", t:"come ministeri, regioni, **comuni**"},
    {icona:"spunta", t:"il codice vale **per intero**", key:true}],
  etichette:{}},
{id:"s38", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"I settori speciali", celle:[
  {t:"**Acqua**"}, {t:"**Energia**"},
  {t:"**Trasporti**"}, {t:"Servizi **postali**"}]},
{id:"s39", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Art. 56 · alcuni contratti esclusi", celle:[
  {t:"Terreni e **fabbricati**"}, {t:"Contratti di **lavoro**"}, {t:"Alcuni servizi **legali**"}]},
{id:"s40", tipo:"icone", tema:"chiaro", sopratitolo:"Ma anche per gli esclusi valgono i principi", voci:[
  {icona:"spunta", t:"**Risultato**"},
  {icona:"cuoremano", t:"**Fiducia**"},
  {icona:"persone", t:"**Accesso** al mercato"},
  {icona:"occhio", t:"**Trasparenza**"}]},
{id:"s41", tipo:"confronto", tema:"chiaro", sopratitolo:"Il valore stimato", col:[
  {h:"Al netto dell'IVA", t:"con **opzioni** e **rinnovi**"},
  {h:"Vietato", t:"il **frazionamento** artificioso", key:true}]},
{id:"s42", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio da evitare", passi:[
  {t:"Una fornitura unica"},
  {t:"Dieci piccoli acquisti"},
  {t:"Affidamenti diretti"},
  {t:"Frazionamento vietato", key:true}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il valore si calcola IVA compresa e senza rinnovi",
   ok:"Al netto dell'IVA, con opzioni e rinnovi previsti"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"Il valore si misura **intero**,<br>senza trucchi."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il bar interno pagato dagli utenti è un appalto di servizi",
   ok:"Di regola è una concessione"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Chi **paga**, chi **gestisce**,<br>chi **rischia**.",
  sotto:"Prossima lezione: i soggetti del sistema."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 10.3", sottotitolo:"I soggetti", ente:ENTE},
];
