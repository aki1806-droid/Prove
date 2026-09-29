// Contenuto delle 48 scene della lezione 10.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 10. Aggiudicazione e anomalia:
// D.Lgs. 36/2023 artt. 108 (criteri), 93 (commissione), 110 (offerte anomale), 54 (esclusione automatica).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Criteri: **offerta economicamente più vantaggiosa** (la regola) e **minor prezzo** (solo prestazioni standardizzate)",
  "OEPV **obbligatoria** per servizi sociali, ristorazione ospedaliera, alta intensità di manodopera; al prezzo al massimo **30 punti**",
  "L'**offerta anormalmente bassa** si verifica in contraddittorio; salari minimi e oneri di sicurezza non si giustificano",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 10 · Appalti pubblici",
  titolo:"Aggiudicazione e anomalia", sottotitolo:"Lezione 10.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"La gara per la mensa dei pazienti",
  titolo:"Un prezzo **molto più basso**", punti:[
    {icona:"euro", t:"di tutte le altre offerte"},
    {icona:"avviso", t:"vince **automaticamente**?", key:true}],
  etichette:{}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"No, per due ragioni", col:[
  {h:"Ristorazione ospedaliera", t:"conta la **qualità**"},
  {h:"Un prezzo troppo basso", t:"il servizio è **sostenibile**?", key:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Il prezzo più **basso**<br>non è sempre l'offerta **migliore**."},

// --- 2 · rotta
{id:"s05", tipo:"elenco", tema:"chiaro", numerato:true, grandi:true, sopratitolo:"Quattro passaggi", voci:[
  {t:"I due **criteri** di aggiudicazione"},
  {t:"Quando la **qualità** è obbligatoria"},
  {t:"La **commissione** e i punteggi"},
  {t:"Le offerte **anormalmente basse**"}]},

// --- 3 · i due criteri
{id:"s06", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 108 · due criteri", col:[
  {h:"La regola", t:"offerta **economicamente più vantaggiosa**", key:true},
  {h:"L'eccezione", t:"il **minor prezzo**"}]},
{id:"s07", tipo:"flusso", tema:"chiaro", sopratitolo:"Il miglior rapporto qualità/prezzo", passi:[
  {icona:"ingranaggio", t:"Elementi tecnici", d:"organizzazione, materiali, assistenza"},
  {icona:"euro", t:"Il prezzo"},
  {icona:"certificato", t:"Punteggio totale", d:"vince il più alto", key:true}]},
{id:"s08", tipo:"catena", tema:"chiaro", sopratitolo:"Il costo del ciclo di vita", passi:[
  {t:"Acquisto"},
  {t:"Consumi"},
  {t:"Manutenzione"},
  {t:"Smaltimento", key:true}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"carrello", sopratitolo:"Il secondo criterio",
  titolo:"Il **minor prezzo**", punti:[
    {icona:"euro", t:"vince chi offre **di meno**"},
    {icona:"spunta", t:"per prestazioni **standardizzate**", key:true}],
  etichette:{}},
{id:"s10", tipo:"icone", tema:"chiaro", sopratitolo:"Mai il minor prezzo", voci:[
  {icona:"divieto", t:"Servizi ad **alta intensità di manodopera**"},
  {icona:"persone", t:"Il ribasso finirebbe sui **lavoratori**", key:true}]},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio", col:[
  {h:"Siringhe monouso standard", t:"**minor prezzo**"},
  {h:"Apparecchiatura per radioterapia", t:"qualità, assistenza, **ciclo di vita**", key:true}]},
{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"Il criterio", col:[
  {h:"Si indica", t:"nel **bando**"},
  {h:"Non si cambia", t:"durante la **gara**", key:true}]},
{id:"s13", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Anche con il minor prezzo",
  titolo:"I **requisiti minimi** restano", punti:[
    {icona:"documento", t:"fissati nel **capitolato tecnico**"},
    {icona:"avviso", t:"chi non li rispetta **non è ammesso**", key:true}],
  etichette:{}},
{id:"s14", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il criterio ordinario è il minor prezzo",
   ok:"Di regola: offerta economicamente più vantaggiosa"}]},
{id:"s15", tipo:"titolo", tema:"profondo",
  titolo:"**Qualità** e **prezzo**<br>si valutano insieme, di regola."},

// --- 4 · quando serve la qualità
{id:"s16", tipo:"confronto", tema:"chiaro", sopratitolo:"OEPV obbligatoria · il primo gruppo", col:[
  {h:"Servizi sociali", t:"assistenza alla **persona**"},
  {h:"Ristorazione", t:"**ospedaliera**, assistenziale, scolastica", key:true}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"dpi", sopratitolo:"Alta intensità di manodopera",
  titolo:"Il personale vale **almeno metà**", punti:[
    {icona:"persone", t:"del valore del **contratto**"},
    {icona:"spunta", t:"pulizie, **assistenza**, vigilanza", key:true}],
  etichette:{}},
{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Ancora", col:[
  {h:"Ingegneria e architettura", t:"e servizi tecnici da **140.000 €**"},
  {h:"Forniture e servizi", t:"**innovativi** o ad alta tecnologia", key:true}]},
{id:"s19", tipo:"confronto", tema:"chiaro", sopratitolo:"E infine", col:[
  {h:"Dialogo competitivo", t:"e partenariato per l'**innovazione**"},
  {h:"Appalto integrato", t:"chi **progetta** esegue i lavori", key:true}]},
{id:"s20", tipo:"icone", tema:"chiaro", sopratitolo:"Il divieto del massimo ribasso", voci:[
  {icona:"cuoremano", t:"Persone da **assistere**"},
  {icona:"persone", t:"Lavoratori da **tutelare**"},
  {icona:"divieto", t:"Il solo prezzo **non decide**", key:true}]},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"Nei contratti di servizi",
  titolo:"Il **contratto collettivo** da applicare", punti:[
    {icona:"documento", t:"lo indica la **stazione appaltante**"},
    {icona:"scudo", t:"niente concorrenza sui **salari**", key:true}],
  etichette:{}},
{id:"s22", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"La mensa: che cosa si valuta", celle:[
  {t:"Il **menù**"}, {t:"Le **materie prime**"}, {t:"Le **diete speciali**"}, {t:"I **tempi** di consegna"}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Pulizie di un ospedale: si può usare il minor prezzo",
   ok:"No: è un servizio ad alta intensità di manodopera"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"Dove ci sono **persone**,<br>decide anche la **qualità**."},

// --- 5 · la commissione e il punteggio
{id:"s25", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Art. 93",
  titolo:"La **commissione giudicatrice**", punti:[
    {icona:"documento", t:"valuta le offerte **tecniche**"},
    {icona:"orologio", t:"nominata **dopo** la scadenza", key:true}],
  etichette:{}},
{id:"s26", tipo:"contatore", tema:"chiaro", sopratitolo:"La composizione",
  valori:[{n:5, t:"componenti al massimo, in numero dispari", key:true}],
  sotto:"**Esperti** del settore, senza conflitti di interessi."},
{id:"s27", tipo:"contatore", tema:"chiaro", sopratitolo:"Il tetto al punteggio economico",
  valori:[{n:30, t:"punti su cento, al massimo, al prezzo", key:true}],
  sotto:"Criteri e punteggi sono indicati nel **bando**."},
{id:"s28", tipo:"barre", tema:"chiaro", sopratitolo:"Su cento punti", max:100, barre:[
  {et:"Qualità", v:70, lab:"almeno 70"},
  {et:"Prezzo", v:30, lab:"al massimo 30"}]},
{id:"s29", tipo:"catena", tema:"chiaro", sopratitolo:"Le buste, oggi digitali", passi:[
  {t:"Documentazione amministrativa"},
  {t:"Offerta tecnica"},
  {t:"Offerta economica", key:true}]},
{id:"s30", tipo:"catena", tema:"chiaro", sopratitolo:"Alla fine", passi:[
  {t:"Graduatoria"},
  {t:"Proposta di aggiudicazione"},
  {t:"Verifica dei requisiti"},
  {t:"Aggiudicazione", key:true}]},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Gara per dispositivi medici: la commissione", celle:[
  {t:"Un **farmacista**"}, {t:"Un **ingegnere clinico**"}, {t:"Un **medico** del reparto"}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"La commissione si nomina prima della scadenza",
   ok:"Si nomina dopo, per evitare pressioni"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Prima si guarda la **qualità**,<br>poi si apre il **prezzo**."},

// --- 6 · le offerte anomale
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Art. 110",
  titolo:"L'offerta **anormalmente bassa**", punti:[
    {icona:"euro", t:"per il prezzo o altri elementi"},
    {icona:"avviso", t:"non sembra **sostenibile**", key:true}],
  etichette:{}},
{id:"s35", tipo:"flusso", tema:"chiaro", sopratitolo:"Il contraddittorio", passi:[
  {icona:"chat", t:"Richiesta", d:"di spiegazioni scritte"},
  {icona:"orologio", t:"Un termine"},
  {icona:"documento", t:"L'impresa dimostra", d:"come sta nei costi", key:true}]},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Che cosa si può spiegare", celle:[
  {t:"L'economia del **processo produttivo**"}, {t:"Le **soluzioni tecniche**"},
  {t:"Condizioni **favorevoli**"}, {t:"L'**originalità** del progetto"}]},
{id:"s37", tipo:"icone", tema:"chiaro", sopratitolo:"Che cosa non si giustifica", voci:[
  {icona:"divieto", t:"Salari sotto i **minimi inderogabili**"},
  {icona:"divieto", t:"Oneri di **sicurezza** ridotti", key:true}]},
{id:"s38", tipo:"confronto", tema:"chiaro", sopratitolo:"Indicati a parte, nell'offerta", col:[
  {h:"I costi", t:"della **manodopera**"},
  {h:"Gli oneri", t:"della **sicurezza** aziendali", key:true}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"In ogni caso si motiva", col:[
  {h:"Se si esclude", t:"la decisione va **motivata**"},
  {h:"Se si accetta", t:"la valutazione va **dimostrata**", key:true}]},
{id:"s40", tipo:"contatore", tema:"chiaro", sopratitolo:"Sotto soglia, con il minor prezzo",
  valori:[{n:5, t:"offerte almeno: esclusione automatica possibile", key:true}],
  sotto:"Con un metodo di calcolo fissato negli **allegati**."},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Torniamo alla mensa",
  titolo:"Il prezzo **bassissimo** si spiega", punti:[
    {icona:"persone", t:"come paga **personale** e materie prime"},
    {icona:"avviso", t:"se non regge, l'offerta è **esclusa**", key:true}],
  etichette:{}},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Sopra soglia l'offerta anomala si esclude subito",
   ok:"Prima le spiegazioni, in contraddittorio"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Un ribasso si **spiega**,<br>oppure si **esclude**."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"La commissione ha un numero pari di componenti",
   ok:"Dispari, al massimo cinque"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"**Qualità** e prezzo insieme,<br>e i **ribassi** sotto controllo.",
  sotto:"Prossima lezione: requisiti e forme di partecipazione."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 10.6", sottotitolo:"Requisiti e forme di partecipazione", ente:ENTE},
];
