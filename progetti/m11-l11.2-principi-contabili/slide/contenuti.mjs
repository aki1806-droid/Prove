// Contenuto delle 49 scene della lezione 11.2. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 11. I principi contabili:
// i diciotto principi generali (allegato 1), la competenza finanziaria potenziata (allegato 4/2),
// la competenza economica, il fondo crediti di dubbia esigibilità, l'equilibrio di bilancio.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "I principi contabili generali sono **diciotto**, nell'**allegato 1** al decreto: dall'**annualità** alla **prevalenza della sostanza sulla forma**",
  "Competenza finanziaria **potenziata**: si registra quando l'obbligazione **nasce**, si imputa all'anno in cui è **esigibile**; **accertamento** ed **impegno**",
  "Aziende sanitarie: competenza **economica**; **fondo crediti di dubbia esigibilità** ed **equilibrio di bilancio** tutelano la prudenza",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Contabilità delle PA",
  titolo:"I principi contabili", sottotitolo:"Lezione 11.2", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"gru", sopratitolo:"Un contratto firmato a dicembre",
  titolo:"Rifare una **scuola**", punti:[
    {icona:"orologio", t:"lavori per **due anni**"},
    {icona:"euro", t:"pagamenti a **stati di avanzamento**", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"In quale bilancio va la spesa?", col:[
  {h:"Non tutta", t:"nell'anno della **firma**"},
  {h:"Con il decreto 118", t:"negli anni in cui i pagamenti sono **esigibili**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"I principi dicono **come** contare,<br>prima ancora di **cosa** contare."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"I principi della **struttura**"},
  {t:"I principi della **qualità**"},
  {t:"La competenza finanziaria **potenziata**"},
  {t:"Competenza **economica** ed **equilibrio**"}]},

// --- 3 · i principi della struttura
{id:"s06", tipo:"numero", tema:"chiaro", sopratitolo:"Allegato 1 al decreto 118",
  cifra:"18", testo:"principi contabili **generali**, o postulati"},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Il primo principio",
  titolo:"L'**annualità**", punti:[
    {icona:"orologio", t:"l'esercizio è l'**anno solare**"},
    {icona:"documento", t:"anche con previsioni **pluriennali**", key:true}],
  etichette:{}},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Il secondo: l'unità", col:[
  {h:"Un solo bilancio", t:"il **complesso** delle entrate finanzia il complesso delle spese"},
  {h:"L'eccezione", t:"le entrate **vincolate** per legge", key:true}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Il terzo principio",
  titolo:"L'**universalità**", punti:[
    {icona:"spunta", t:"**tutte** le operazioni dell'ente"},
    {icona:"divieto", t:"nessuna gestione **fuori bilancio**", key:true}],
  etichette:{}},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Il quarto: l'integrità", col:[
  {h:"Entrate e spese", t:"per **intero**, al **lordo**"},
  {h:"Senza compensazioni", t:"non solo la **differenza**", key:true}]},
{id:"s11", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La forma del bilancio", celle:[
  {t:"**Annualità**"}, {t:"**Unità**"}, {t:"**Universalità**"}, {t:"**Integrità**"}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio: lo stesso fornitore", col:[
  {h:"Si iscrive", t:"la fornitura **pagata**"},
  {h:"E si iscrive", t:"la penale **incassata**: due importi, non il saldo", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il principio dell'unicità del bilancio",
   ok:"Si chiama principio dell'unità"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Un **anno**, un **bilancio**,<br>tutte le operazioni, per **intero**."},

// --- 4 · i principi della qualità
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"La qualità dell'informazione",
  titolo:"Conti che rappresentano la **realtà**", punti:[
    {icona:"spunta", t:"veridicità, **attendibilità**"},
    {icona:"occhio", t:"correttezza, **comprensibilità**", key:true}],
  etichette:{}},
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"Altri quattro principi", col:[
  {h:"Significatività e rilevanza", t:"stime **ragionevoli**, utili a chi decide"},
  {h:"Flessibilità e congruità", t:"mezzi adeguati ai **fini**", key:true}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"salvadanaio", sopratitolo:"Meglio sottostimare che gonfiare",
  titolo:"La **prudenza**", punti:[
    {icona:"euro", t:"entrate solo se **ragionevolmente certe**"},
    {icona:"avviso", t:"spese anche solo **probabili**", key:true}],
  etichette:{}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Tenere il filo", col:[
  {h:"Coerenza", t:"programmazione, previsioni, gestione e **rendiconto**"},
  {h:"Continuità e costanza", t:"gli stessi **criteri** da un anno all'altro", key:true}]},
{id:"s19", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"E ancora", celle:[
  {t:"Comparabilità e **verificabilità**"}, {t:"**Neutralità** o imparzialità"}, {t:"**Pubblicità** dei documenti"}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"matrioska", sopratitolo:"Il diciottesimo principio",
  titolo:"La **sostanza** prevale sulla **forma**", punti:[
    {icona:"euro", t:"conta la realtà **economica**"},
    {icona:"documento", t:"non solo la veste **giuridica**", key:true}],
  etichette:{}},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"carrello", sopratitolo:"Un esempio: le rimanenze",
  titolo:"Cambia il **metodo** di valutazione", punti:[
    {icona:"chat", t:"l'ente deve **spiegarlo**"},
    {icona:"bilancia", t:"o i bilanci non sono più **confrontabili**", key:true}],
  etichette:{}},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"I principi contabili generali sono diciassette",
   ok:"Sono diciotto: l'ultimo è la prevalenza della sostanza sulla forma"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Numeri **veri**, chiari,<br>**prudenti** e confrontabili."},

// --- 5 · la competenza finanziaria potenziata
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Il cuore della riforma",
  titolo:"La competenza finanziaria **potenziata**", punti:[
    {icona:"documento", t:"quando un'entrata o una spesa **entra nei conti**"},
    {icona:"orologio", t:"e in quale **anno**", key:true}],
  etichette:{}},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Le obbligazioni perfezionate", col:[
  {h:"Si registrano", t:"quando **nascono**"},
  {h:"Si imputano", t:"all'anno in cui sono **esigibili**", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"L'accertamento dell'entrata", celle:[
  {t:"La **ragione** del credito"}, {t:"Il **debitore**"},
  {t:"La **somma**"}, {t:"La **scadenza**"}]},
{id:"s27", tipo:"catena", tema:"chiaro", sopratitolo:"Le fasi della spesa", passi:[
  {t:"Impegno", d:"creditore, importo, scadenza", key:true},
  {t:"Liquidazione"},
  {t:"Ordinazione"},
  {t:"Pagamento"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"percorso", sopratitolo:"Da un anno all'altro",
  titolo:"Il fondo **pluriennale vincolato**", punti:[
    {icona:"euro", t:"risorse finanziate **oggi**"},
    {icona:"scudo", t:"coprono spese degli anni **successivi**", key:true}],
  etichette:{}},
{id:"s29", tipo:"confronto", tema:"chiaro", sopratitolo:"I residui, riaccertati ogni anno", col:[
  {h:"Residui attivi", t:"entrate accertate e **non riscosse**"},
  {h:"Residui passivi", t:"spese impegnate e **non pagate**", key:true}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"abaco", sopratitolo:"L'effetto",
  titolo:"Conti più vicini alla **cassa reale**", punti:[
    {icona:"divieto", t:"niente impegni per spese **lontane**"},
    {icona:"spunta", t:"residui che si **riducono**", key:true}],
  etichette:{}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Torniamo alla scuola", col:[
  {h:"Alla firma", t:"il comune **impegna** la spesa"},
  {h:"Nei due anni dei lavori", t:"la **imputa**; il fondo pluriennale porta la copertura", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"La spesa si imputa tutta all'anno della firma del contratto",
   ok:"Si imputa all'anno in cui diventa esigibile"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Si **registra** quando nasce,<br>si **imputa** quando scade."},

// --- 6 · competenza economica ed equilibrio
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Accanto alla competenza finanziaria",
  titolo:"La competenza **economica**", punti:[
    {icona:"euro", t:"costi e ricavi nell'anno in cui si **consumano** le risorse"},
    {icona:"persone", t:"o si producono i **servizi**", key:true}],
  etichette:{}},
{id:"s35", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi la usa", col:[
  {h:"Aziende sanitarie", t:"solo contabilità **economico patrimoniale**"},
  {h:"Enti territoriali", t:"la **affiancano** alla finanziaria", key:true}]},
{id:"s36", tipo:"numero", tema:"chiaro", sopratitolo:"L'ammortamento",
  cifra:"1/10", testo:"del costo **ogni anno**, per un'apparecchiatura che dura dieci anni"},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"salvadanaio", sopratitolo:"Lo strumento della prudenza",
  titolo:"Il fondo crediti di **dubbia esigibilità**", punti:[
    {icona:"euro", t:"accantona per i crediti che non si **riscuoteranno**"},
    {icona:"libro", t:"secondo l'**esperienza** degli anni", key:true}],
  etichette:{}},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"L'equilibrio di bilancio", col:[
  {h:"Spese correnti", t:"coperte da entrate **correnti**"},
  {h:"Investimenti", t:"da entrate in **conto capitale** o debito ammesso", key:true}]},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"La regola del debito",
  titolo:"Il debito finanzia solo **investimenti**", punti:[
    {icona:"divieto", t:"non stipendi e **acquisti correnti**"},
    {icona:"avviso", t:"il disavanzo si **recupera** negli anni dopo", key:true}],
  etichette:{}},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Per le aziende sanitarie",
  titolo:"Un equilibrio **economico**", punti:[
    {icona:"euro", t:"i **costi** dell'anno"},
    {icona:"bilancia", t:"coperti da **ricavi** e **contributi regionali**", key:true}],
  etichette:{}},
{id:"s41", tipo:"barre", tema:"chiaro", sopratitolo:"Un esempio: le multe di un comune",
  unita:"%", max:100, barre:[
  {et:"Accertate", v:100, lab:"1 milione"},
  {et:"Riscosse di solito", v:60, lab:"60%"},
  {et:"Nel fondo", v:40, lab:"40%", colore:"#D70328", nota:"la parte che rischia di non entrare"}]},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il fondo crediti di dubbia esigibilità è una spesa da pagare",
   ok:"È un accantonamento prudenziale, che non si può impegnare"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Contare il **giusto**, e non spendere<br>ciò che non si **incassa**."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"I residui attivi sono entrate già incassate",
   ok:"Sono entrate accertate e non ancora riscosse"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Regole **comuni**<br>per contare nello **stesso modo**.",
  sotto:"Prossima lezione: il sistema di bilancio."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 11.3", sottotitolo:"Il sistema di bilancio", ente:ENTE},
];
