// Contenuto delle 47 scene della lezione 11.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 11. Il Titolo II del D.Lgs. 118/2011:
// destinatari e perimetrazione, contabilità economico patrimoniale, documenti obbligatori,
// criteri di valutazione e sterilizzazione degli ammortamenti.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Il **Titolo II** (dall'**art. 19**) vale per sanità regionale, **GSA**, aziende sanitarie e ospedaliere, istituti di ricovero pubblici e **zooprofilattici**",
  "Contabilità **economico patrimoniale** e **codice civile**; preventivo economico annuale e bilancio d'esercizio adottato entro il **30 aprile**",
  "Rimanenze al **costo medio ponderato**, ammortamenti con aliquote fissate, contributi in conto capitale che **sterilizzano** gli ammortamenti",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 11 · Contabilità delle PA",
  titolo:"Il Titolo II: le aziende sanitarie", sottotitolo:"Lezione 11.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Un'azienda sanitaria",
  titolo:"Una **TAC** da un milione", punti:[
    {icona:"euro", t:"l'anno chiude con una **perdita**?"},
    {icona:"occhio", t:"e chi **controlla** i numeri?", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Le regole del Titolo secondo", col:[
  {h:"La TAC si ammortizza", t:"negli anni in cui si **usa**"},
  {h:"Se la paga la regione", t:"il costo si **neutralizza**", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"In sanità si contano i **costi**,<br>non solo i **pagamenti**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"A **chi** si applica il Titolo secondo"},
  {t:"La contabilità **economico patrimoniale**"},
  {t:"I **documenti** obbligatori"},
  {t:"I **criteri di valutazione**"}]},

// --- 3 · a chi si applica
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Decreto 118 · Titolo secondo", sigla:"Art. 19",
  testo:"Bilanci sanitari **omogenei**, confrontabili e **aggregabili**."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Si applica alle regioni", col:[
  {h:"Per la parte del bilancio", t:"che finanzia il servizio **sanitario**"},
  {h:"E alla gestione sanitaria", t:"**accentrata**: la prossima lezione", key:true}]},
{id:"s08", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"E agli enti del servizio sanitario", celle:[
  {t:"Aziende sanitarie **locali**"}, {t:"Aziende **ospedaliere**"},
  {t:"Aziende ospedaliero **universitarie**"}, {t:"Istituti di ricovero e cura **pubblici**"}]},
{id:"s09", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Anche gli zooprofilattici. Nel Veneto", celle:[
  {t:"Le aziende **ULSS**"}, {t:"Le ospedaliere universitarie di **Padova** e **Verona**"},
  {t:"L'istituto **oncologico** veneto"}, {t:"Lo **zooprofilattico** delle Venezie"}]},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Nel bilancio regionale",
  titolo:"La **perimetrazione**", punti:[
    {icona:"cartella", t:"entrate e spese sanitarie in un perimetro **separato**"},
    {icona:"ospedale", t:"la sanità non si **confonde** col resto", key:true}],
  etichette:{}},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Anche la cassa",
  titolo:"Conti di tesoreria **della sanità**", punti:[
    {icona:"lucchetto", t:"intestati alla **sanità**"},
    {icona:"divieto", t:"non usabili per **altre spese** della regione", key:true}],
  etichette:{}},
{id:"s12", tipo:"catena", tema:"chiaro", sopratitolo:"Un esempio: il fondo sanitario", passi:[
  {t:"La regione riceve"},
  {t:"Perimetro sanitario", d:"del bilancio regionale"},
  {t:"Conti della sanità"},
  {t:"Le aziende", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il Titolo secondo riguarda solo le aziende ULSS",
   ok:"Anche ospedaliere, universitarie, istituti pubblici e zooprofilattici"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Un **perimetro** chiaro<br>per il denaro della **salute**."},

// --- 4 · la contabilità economico patrimoniale
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"abaco", sopratitolo:"Contabilità economico patrimoniale",
  titolo:"In **partita doppia**", punti:[
    {icona:"euro", t:"effetti su **costi** e **ricavi**"},
    {icona:"bilancia", t:"e su **attività** e **passività**", key:true}],
  etichette:{}},
{id:"s16", tipo:"norma", tema:"chiaro", etichetta:"Codice civile · bilancio delle società", sigla:"Art. 2423 e ss.",
  testo:"Si applicano, **salvo** quanto il decreto dispone in modo diverso."},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Il piano dei conti dell'azienda", col:[
  {h:"Riconducibile", t:"voce per voce ai **modelli ministeriali**"},
  {h:"L'azienda può", t:"**aggiungere** sottovoci, non cambiarle", key:true}]},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Approvata con decreto ministeriale",
  titolo:"La casistica **applicativa**", punti:[
    {icona:"libro", t:"le operazioni più **frequenti**"},
    {icona:"spunta", t:"registrate da tutti allo **stesso modo**", key:true}],
  etichette:{}},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"La certificabilità",
  titolo:"Bilanci **certificabili**", punti:[
    {icona:"documento", t:"percorsi attuativi **regionali**"},
    {icona:"occhio", t:"conti verificabili da un **revisore esterno**", key:true}],
  etichette:{}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Il collegio sindacale", col:[
  {h:"Verifica", t:"la **regolarità** delle scritture"},
  {h:"Redige", t:"una **relazione** sui bilanci preventivo e d'esercizio", key:true}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio: le pulizie di dicembre", col:[
  {h:"Il costo", t:"nel conto economico di **quell'anno**", key:true},
  {h:"Il pagamento a febbraio", t:"non **sposta** il costo"}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le aziende sanitarie tengono la contabilità finanziaria, con impegni e accertamenti",
   ok:"Tengono la contabilità economico patrimoniale"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"**Partita doppia** e codice civile,<br>dentro **regole comuni**."},

// --- 5 · i documenti obbligatori
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Il primo documento",
  titolo:"Il bilancio **preventivo economico** annuale", punti:[
    {icona:"spunta", t:"coerente con la programmazione **regionale**", key:true}],
  etichette:{}},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Il preventivo", col:[
  {h:"Comprende", t:"conto economico preventivo e **flussi di cassa** prospettici"},
  {h:"È corredato da", t:"nota illustrativa, piano degli **investimenti**, relazione del **direttore generale**", key:true}]},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"gru", sopratitolo:"Triennale, a scorrimento",
  titolo:"Il piano degli **investimenti**", punti:[
    {icona:"ospedale", t:"gli investimenti da **fare**"},
    {icona:"euro", t:"fabbisogno e **fonti** di finanziamento"},
    {icona:"persone", t:"e la relazione del **collegio sindacale**", key:true}],
  etichette:{}},
{id:"s27", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Il bilancio d'esercizio", celle:[
  {t:"Stato **patrimoniale**"}, {t:"Conto **economico**"},
  {t:"Rendiconto **finanziario**"}, {t:"Nota **integrativa**"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"cartellaclinica", sopratitolo:"Nella relazione sulla gestione",
  titolo:"Il **modello LA**", punti:[
    {icona:"euro", t:"i **costi** sostenuti"},
    {icona:"cuoremano", t:"per ciascun **livello essenziale** di assistenza", key:true}],
  etichette:{}},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"Il direttore generale lo adotta",
  titolo:"Entro il **30 aprile**", punti:[
    {icona:"orologio", t:"dell'anno **successivo**"},
    {icona:"documento", t:"schemi **ministeriali**, uguali in tutta Italia", key:true}],
  etichette:{}},
{id:"s30", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Un esempio: il modello LA", celle:[
  {t:"Prevenzione **collettiva**"}, {t:"Assistenza **distrettuale**"}, {t:"Assistenza **ospedaliera**"}]},
{id:"s31", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il bilancio d'esercizio è solo stato patrimoniale e conto economico",
   ok:"Ci sono anche rendiconto finanziario e nota integrativa"}]},
{id:"s32", tipo:"titolo", tema:"profondo",
  titolo:"**Prevedere** a dicembre,<br>rendere **conto** ad aprile."},

// --- 6 · i criteri di valutazione
{id:"s33", tipo:"illustrata", tema:"chiaro", ill:"siringa", sopratitolo:"Le rimanenze di beni fungibili",
  titolo:"Al **costo medio ponderato**", punti:[
    {icona:"goccia", t:"**farmaci** e dispositivi", key:true}],
  etichette:{}},
{id:"s34", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli ammortamenti", col:[
  {h:"Beni durevoli", t:"aliquote fissate dal **decreto**"},
  {h:"Eccezioni", t:"i **terreni** no; i beni modesti si spesano nell'**anno**", key:true}]},
{id:"s35", tipo:"catena", tema:"chiaro", sopratitolo:"I contributi in conto capitale", passi:[
  {t:"Il contributo"},
  {t:"Patrimonio netto"},
  {t:"Una quota a ricavo", d:"ogni anno"},
  {t:"Costo neutralizzato", key:true}]},
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Il bene finanziato dalla regione",
  titolo:"La **sterilizzazione** degli ammortamenti", punti:[
    {icona:"euro", t:"l'ammortamento è coperto dal **contributo**"},
    {icona:"spunta", t:"nessuna **perdita**", key:true}],
  etichette:{}},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Gli altri contributi", col:[
  {h:"Vincolati e non usati", t:"si **accantonano** per gli anni dopo"},
  {h:"Per ripianare le perdite", t:"in base all'**atto di assegnazione**", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"La regione verifica",
  titolo:"Fondi rischi **adeguati**", punti:[
    {icona:"divieto", t:"niente fondi **generici**"},
    {icona:"avviso", t:"rischio **determinato** e almeno probabile", key:true}],
  etichette:{}},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Torniamo alla TAC: dura otto anni", col:[
  {h:"Ogni anno, a costo", t:"un **ottavo** dell'ammortamento"},
  {h:"Ogni anno, a ricavo", t:"un ottavo del **contributo**: effetto nullo", key:true}]},
{id:"s40", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Le rimanenze di beni fungibili si valutano al prezzo dell'ultimo acquisto",
   ok:"Il decreto prevede il costo medio ponderato"}]},
{id:"s41", tipo:"titolo", tema:"profondo",
  titolo:"Il bene si **ammortizza**,<br>il contributo lo **neutralizza**."},

// --- 7 · le tre cose
{id:"s42", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il modello LA è un documento di cassa",
   ok:"Rileva i costi per ciascun livello essenziale di assistenza"}]},

// --- 8 · chiusura
{id:"s46", tipo:"titolo", tema:"profondo",
  titolo:"Conti **economici**,<br>uguali per **tutte** le aziende.",
  sotto:"Prossima lezione: GSA, consolidato e aziende ospedaliero universitarie."},

{id:"s47", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 11.5", sottotitolo:"GSA, consolidato e AOU", ente:ENTE},
];
