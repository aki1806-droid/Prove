// Contenuto delle 50 scene della lezione 3.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 3. La L.R. 55/1994:
// strumenti di programmazione (piani, programmi, progetti; piano generale = piano
// attuativo locale; piano della performance, D.Lgs. 150/2009); bilancio pluriennale e
// bilancio economico preventivo; contabilità economico-patrimoniale, piano dei conti
// (art. 23), libri obbligatori, patrimonio; bilancio d'esercizio; fonti di
// finanziamento (art. 5).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_STRUMENTI = [
  {n:"1", t:"Piani", d:"l'azienda nel suo insieme: finalità e obiettivi"},
  {n:"2", t:"Programmi", d:"le azioni per raggiungere un obiettivo"},
  {n:"3", t:"Progetti", d:"lo strumento più dettagliato"},
];

const TRE_COSE = [
  "Il **piano generale** lo approva il **DG**, sentita la Conferenza dei sindaci, e lo trasmette alla Giunta **entro il 31 dicembre**",
  "Bilancio economico **preventivo**: entro il **31 dicembre** dell'anno prima. Bilancio d'**esercizio**: entro il **30 aprile** dell'anno dopo",
  "L'**utile** va a investimenti, incentivi al personale e fondo di riserva. ULSS: **quota capitaria**; azienda ospedaliera: **prestazioni**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 3 · Legislazione socio-sanitaria del Veneto",
  titolo:"La L.R. 55/1994:<br>programmare e rendere conto", sottotitolo:"Lezione 3.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"casa", sopratitolo:"Una famiglia che vuole comprare casa",
  titolo:"Tre **mosse**", punti:[
    {icona:"spunta", t:"decide che cosa **vuole**"},
    {icona:"euro", t:"fa i **conti prima**"},
    {icona:"occhio", t:"alla fine **verifica** quanto ha speso", key:true}],
  etichette:{insegna:{t:"Casa", key:true}}},
{id:"s03", tipo:"norma", tema:"chiaro", etichetta:"L.R. 55 del 14 settembre 1994", sigla:"Due verbi",
  testo:"Assetto **programmatorio**, **contabile**, **gestionale** e **di controllo** delle ULSS e delle aziende ospedaliere."},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"**Programmare** prima,<br>**rendere conto** dopo.",
  sotto:"E in mezzo, tenere i conti in ordine."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"Programmare"},
  {icona:"documento", t:"I bilanci", d:"di previsione"},
  {icona:"bilancia", t:"I conti", d:"e il bilancio d'esercizio"},
  {icona:"euro", t:"I soldi", d:"le fonti di finanziamento", key:true}]},

// --- 3 · programmare
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"livelli", sopratitolo:"Gli strumenti di programmazione",
  titolo:"Si parte **dall'alto**", punti:[
    {icona:"libro", t:"piano sanitario **nazionale** e **regionale**"},
    {icona:"documento", t:"atti regionali di programmazione"},
    {icona:"ospedale", t:"dentro la cornice, l'**azienda**", key:true}],
  etichette:{l1:"Piano nazionale", l2:"Piano regionale", l3:"Atti regionali", l4:{t:"Azienda", key:true}}},
{id:"s07", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Dal più generale al più dettagliato", box:TRE_STRUMENTI},
{id:"s08", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il primo strumento",
  titolo:"I **piani**", punti:[
    {icona:"ospedale", t:"riguardano l'azienda **nel suo insieme**"},
    {icona:"spunta", t:"fissano **finalità** e **obiettivi**", key:true}],
  etichette:{titolo:{t:"Piano", key:true}, sigillo:"Obiettivi"}},
{id:"s09", tipo:"confronto", tema:"chiaro", sopratitolo:"Poi, sempre più concreti", col:[
  {h:"Programmi", t:"**attuano** i piani: le azioni per un obiettivo"},
  {h:"Progetti", t:"gli strumenti **più dettagliati** di tutti"}]},
{id:"s10", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio", passi:[
  {icona:"libro", t:"Piano", d:"ridurre le attese per le visite"},
  {icona:"orologio", t:"Programma", d:"ambulatori aperti anche il sabato"},
  {icona:"ingranaggio", t:"Progetto", d:"organizza ogni ambulatorio", key:true}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Il documento principale",
  titolo:"Il **piano generale**", punti:[
    {icona:"persona", t:"lo approva il **direttore generale**"},
    {icona:"documento", t:"lo trasmette alla **Giunta** entro il 31 dicembre", key:true},
    {icona:"orologio", t:"dura quanto il **piano sanitario regionale**"}],
  etichette:{data:{t:"31 dic", key:true}, nota:"Piano generale"}},
{id:"s12", tipo:"flusso", tema:"chiaro", sopratitolo:"Detto anche piano attuativo locale", passi:[
  {icona:"persone", t:"Conferenza dei sindaci", d:"esprime il parere"},
  {icona:"persona", t:"Direttore generale", d:"approva il piano", key:true},
  {icona:"bilancia", t:"Giunta regionale", d:"lo riceve"}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Non confonderlo", righe:[
  {sb:"Il piano di zona e il piano generale sono la stessa cosa",
   ok:"Il piano di zona programma i servizi sociali: lo approva la Conferenza dei sindaci"}]},
{id:"s14", tipo:"frase", tema:"chiaro", sopratitolo:"Una nota di realtà, secondo la dispensa",
  testo:"Il piano generale triennale **non è mai stato davvero adottato**.",
  sotto:"Di fatto l'ha sostituito il piano della performance."},
{id:"s15", tipo:"ciclo", tema:"chiaro", sopratitolo:"D.Lgs. 150/2009, la riforma Brunetta",
  centro:"Performance", dcentro:"la stessa logica", fasi:[
  {icona:"spunta", t:"Obiettivi"},
  {icona:"occhio", t:"Indicatori"},
  {icona:"certificato", t:"Risultati attesi", key:true}]},
{id:"s16", tipo:"titolo", tema:"profondo",
  titolo:"Dal **perché**<br>al **come**.",
  sotto:"Piano, programma, progetto: ogni passo più concreto del precedente."},

// --- 4 · i bilanci di previsione
{id:"s17", tipo:"icone", tema:"chiaro", sopratitolo:"Il bilancio pluriennale di previsione traduce il piano in termini", voci:[
  {icona:"euro",     t:"**Economici**"},
  {icona:"cartella", t:"**Finanziari**"},
  {icona:"ospedale", t:"**Patrimoniali**"}]},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Il bilancio economico preventivo",
  titolo:"Entro il **31 dicembre**", punti:[
    {icona:"orologio", t:"dell'anno **precedente**", key:true},
    {icona:"documento", t:"a quello a cui si riferisce"}],
  etichette:{data:{t:"31 dic", key:true}, nota:"Preventivo"}},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Prima dell'anno, non durante",
  titolo:"Sapere **in anticipo**", punti:[
    {icona:"euro", t:"quanto prevede di **spendere**"},
    {icona:"cartella", t:"quanto prevede di **incassare**"},
    {icona:"avviso", t:"senza preventivo, ogni spesa è una **sorpresa**", key:true}],
  etichette:{sx:"Spese", dx:"Entrate", alto:{t:"Preventivo", key:true}}},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"incastro", sopratitolo:"Come si costruisce",
  titolo:"La **metodica di budget**", punti:[
    {icona:"documento", t:"costruisce il bilancio economico **preventivo**"},
    {icona:"libro", t:"per intero nella **lezione 3.5**", key:true}],
  etichette:{sx:"Budget", dx:{t:"Preventivo", key:true}, basso:"Lezione 3.5"}},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Due sguardi sui documenti",
  titolo:"Chi **controlla**", punti:[
    {icona:"sigillo", t:"la **Regione**: il visto di congruità", key:true},
    {icona:"occhio", t:"il **collegio sindacale**: il parere preventivo"}],
  etichette:{sx:"Regione", dx:"Collegio", centro:{t:"Bilanci", key:true}}},
{id:"s22", tipo:"confronto", tema:"tenue", sopratitolo:"Occhio alle due date", col:[
  {h:"31 dicembre", t:"il **preventivo** dell'anno che viene", grande:true},
  {h:"30 aprile", t:"il **bilancio d'esercizio** dell'anno appena chiuso", grande:true}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Prima si **decide**.<br>Poi si spende.<br>Poi si **rende conto**."},

// --- 5 · tenere i conti e rendere conto
{id:"s24", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Poi la gestione vera",
  titolo:"Contabilità **economico-patrimoniale**", punti:[
    {icona:"ingranaggio", t:"come un'**impresa**"},
    {icona:"euro", t:"il **risultato economico** dell'esercizio"},
    {icona:"ospedale", t:"il **patrimonio** di funzionamento", key:true}],
  etichette:{sx:"Risultato", dx:{t:"Patrimonio", key:true}, alto:"Come un'impresa"}},
{id:"s25", tipo:"norma", tema:"chiaro", etichetta:"L.R. 55/1994 · art. 23", sigla:"Piano dei conti",
  testo:"L'insieme dei conti: ognuno raggruppa **valori omogenei**."},
{id:"s26", tipo:"icone", tema:"chiaro", sopratitolo:"I quattro libri obbligatori", voci:[
  {icona:"libro",    t:"Libro **giornale**"},
  {icona:"cartella", t:"Libro degli **inventari**"},
  {icona:"persona",  t:"Libro degli **atti del DG**"},
  {icona:"occhio",   t:"Adunanze e verbali del **collegio sindacale**"}]},
{id:"s27", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il libro degli atti del direttore generale",
  titolo:"La **memoria** ufficiale", punti:[
    {icona:"documento", t:"raccoglie le **deliberazioni** del DG"},
    {icona:"spunta", t:"quello che l'azienda **ha deciso**", key:true}],
  etichette:{titolo:{t:"Deliberazioni", key:true}, sigillo:"DG"}},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Il patrimonio: beni disponibili e indisponibili",
  titolo:"Beni **indisponibili**", punti:[
    {icona:"lucchetto", t:"un regime giuridico **speciale**"},
    {icona:"ospedale", t:"servono alle **funzioni istituzionali**", key:true}],
  etichette:{insegna:{t:"Indisponibile", key:true}}},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"A fine anno, il bilancio d'esercizio deve essere", voci:[
  {icona:"occhio",   t:"**Chiaro**"},
  {icona:"spunta",   t:"**Veritiero**"},
  {icona:"bilancia", t:"**Corretto**"}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Lo approva il direttore generale",
  titolo:"Entro il **30 aprile**", punti:[
    {icona:"orologio", t:"dell'anno **successivo**", key:true},
    {icona:"persona", t:"lo approva il **direttore generale**"}],
  etichette:{data:{t:"30 apr", key:true}, nota:"Esercizio"}},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Cinque documenti", celle:[
  {t:"**Stato patrimoniale**"}, {t:"**Conto economico**"}, {t:"**Nota integrativa**"},
  {t:"**Rendiconto finanziario**"}, {t:"**Relazione sulla gestione**"}, {t:"con il modello **LA**: costi per livelli di assistenza"}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Qualche criterio di redazione", col:[
  {h:"Immobilizzazioni", t:"i beni usati a lungo: al **costo** di acquisto o di produzione"},
  {h:"Scorte", t:"al **costo medio ponderato** mensile"}]},
{id:"s33", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Per il resto, il codice civile. E le indicazioni contabili",
  da:{h:"Un tempo", t:"la Giunta"},
  a:{h:"Oggi", t:"**Azienda Zero**"},
  sotto:"Per rendere **omogenei** i conti fra le aziende."},
{id:"s34", tipo:"rete", tema:"chiaro", sopratitolo:"Se c'è un utile: tre destinazioni",
  centro:"Utile", dcentro:"nessun dividendo", nodi:[
  {t:"Investimenti", icona:"ospedale"}, {t:"Incentivi al personale", icona:"persone", key:true},
  {t:"Fondo di riserva", icona:"lucchetto"}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"lente", sopratitolo:"Se c'è una perdita",
  titolo:"Spiegare e **coprire**", punti:[
    {icona:"chat", t:"la relazione sulla gestione ne spiega i **motivi**"},
    {icona:"sigillo", t:"la **copertura** passa dal controllo della Regione", key:true}],
  etichette:{titolo:{t:"Perdita", key:true}}},
{id:"s36", tipo:"titolo", tema:"profondo",
  titolo:"Il momento<br>della **verità**.",
  sotto:"Quello che si era previsto, contro quello che è successo."},

// --- 6 · da dove arrivano i soldi
{id:"s37", tipo:"norma", tema:"chiaro", etichetta:"L.R. 55/1994 · art. 5", sigla:"Fonti di finanziamento",
  testo:"Tante voci. **Una pesa più di tutte**."},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"comunita", sopratitolo:"Per una ULSS, la prima fonte",
  titolo:"La **quota capitaria**", punti:[
    {icona:"persone", t:"riparto regionale in base alla **popolazione**", key:true},
    {icona:"bilancia", t:"corretta con la **mobilità sanitaria**"}],
  etichette:{alto:{t:"Base capitaria", key:true}}},
{id:"s39", tipo:"flusso", tema:"chiaro", sopratitolo:"Come funziona la mobilità", passi:[
  {icona:"persona", t:"Un residente", d:"si cura altrove"},
  {icona:"ospedale", t:"Altra azienda", d:"o altra regione"},
  {icona:"bilancia", t:"Compensazione", d:"i soldi seguono il paziente", key:true}]},
{id:"s40", tipo:"illustrata", tema:"chiaro", ill:"stretta", sopratitolo:"Un paziente di Rovigo operato a Padova",
  titolo:"I soldi **seguono** il paziente", punti:[
    {icona:"euro", t:"la sua ULSS **paga**"},
    {icona:"ospedale", t:"l'azienda che l'ha curato **incassa**"},
    {icona:"bilancia", t:"i conti del sistema restano **in equilibrio**", key:true}],
  etichette:{sx:"Rovigo", dx:"Padova", centro:{t:"Compensazione", key:true}}},
{id:"s41", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"Poi", celle:[
  {t:"Contributi di **Regione** e **Stato**"}, {t:"Risorse da **convenzioni**"},
  {t:"Ricavi per **servizi resi**, anche libera professione"}, {t:"Concorsi, recuperi, **rimborsi**: i ticket"}]},
{id:"s42", tipo:"griglia", tema:"chiaro", colonne:2, spunta:true, sopratitolo:"E ancora", celle:[
  {t:"Ricavi e rendite del **patrimonio**"}, {t:"Contributi per il **ripiano delle perdite**"},
  {t:"**Utili** degli anni precedenti"}, {t:"**Donazioni**"},
  {t:"Anticipazione del **tesoriere**"}, {t:"**Mutui**"}]},
{id:"s43", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"Per l'azienda ospedaliera",
  titolo:"Le **prestazioni**", punti:[
    {icona:"spunta", t:"la lista è **quasi uguale**"},
    {icona:"divieto", t:"ma al posto della quota capitaria"},
    {icona:"euro", t:"gli introiti per le **prestazioni erogate**", key:true}],
  etichette:{insegna:{t:"Ospedaliera", key:true}}},
{id:"s44", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"ULSS e azienda ospedaliera si finanziano allo stesso modo",
   ok:"La ULSS in base alla popolazione; l'azienda ospedaliera in base alle prestazioni"}]},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Il bilancio d'esercizio lo approva la Giunta regionale",
   ok:"Lo approva il direttore generale; alla Regione spetta il controllo"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"**Programmare** prima,<br>tenere i conti durante,<br>**rendere conto** dopo.",
  sotto:"Prossima lezione: il budget, i controlli e i tre principi guida."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 3.5", sottotitolo:"Budget, controlli<br>e i tre principi guida", ente:ENTE},
];
