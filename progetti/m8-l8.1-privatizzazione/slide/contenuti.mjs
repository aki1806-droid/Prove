// Contenuto delle 50 scene della lezione 8.1. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 8. Dalla specialità alla privatizzazione:
// L. 421/1992, D.Lgs. 29/1993, L. 59/1997, D.Lgs. 80/1998, D.Lgs. 165/2001 artt. 1, 2, 3, 5, 63; art. 97 Cost.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Prima degli anni Novanta il rapporto era di **diritto pubblico**: nasceva da un **atto di nomina**, le liti andavano al **giudice amministrativo**",
  "La privatizzazione parte con il **D.Lgs. 29/1993**, prosegue con le leggi **Bassanini** e il D.Lgs. 80/1998, si riordina nel **D.Lgs. 165/2001**",
  "Oggi il rapporto segue **codice civile** e **contratti**; restano pubblici il **concorso**, la macro organizzazione, il personale dell'**art. 3**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 8 · Normativa sul pubblico impiego",
  titolo:"Dalla specialità<br>alla privatizzazione", sottotitolo:"Lezione 8.1", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"confronto", tema:"chiaro", sopratitolo:"Stesso turno di notte", col:[
  {h:"Ospedale pubblico", t:"un'infermiera **dipendente pubblica**"},
  {h:"Clinica privata", t:"un'infermiera **dipendente privata**"}],
  sotto:"Il rapporto di lavoro poggia sullo stesso **codice civile**."},
{id:"s03", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Trent'anni fa non era così",
  da:{h:"Prima", t:"uno statuto a parte"},
  a:{h:"Poi", t:"la **privatizzazione**"}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Stesso lavoro, regole sempre più<br>vicine a quelle di **tutti**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"libro", t:"Prima degli anni Novanta"},
  {icona:"orologio", t:"Le tappe della riforma"},
  {icona:"documento", t:"Che cosa vuol dire", d:"privatizzazione", key:true},
  {icona:"scudo", t:"Che cosa resta pubblico"}]},

// --- 3 · prima degli anni Novanta
{id:"s06", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Fino agli anni Novanta",
  titolo:"Un rapporto di **diritto pubblico**", punti:[
    {icona:"sigillo", t:"nasceva da un **atto di nomina**"},
    {icona:"divieto", t:"non da un **contratto**", key:true}],
  etichette:{titolo:"Decreto di nomina", sigillo:{t:"Nomina", key:true}}},
{id:"s07", tipo:"icone", tema:"chiaro", sopratitolo:"Testo unico del 1957 · tutto fissato per legge", voci:[
  {icona:"spunta",   t:"**Diritti**"},
  {icona:"avviso",   t:"**Doveri**"},
  {icona:"cappello", t:"**Carriera**"},
  {icona:"euro",     t:"**Stipendio**"}]},
{id:"s08", tipo:"flusso", tema:"chiaro", sopratitolo:"Legge quadro del 1983", passi:[
  {icona:"chat", t:"Accordo di comparto"},
  {icona:"sigillo", t:"Decreto del Presidente", d:"lo recepisce", key:true},
  {icona:"spunta", t:"Solo allora vale"}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"E le liti?",
  titolo:"Il giudice **amministrativo**", punti:[
    {icona:"giudice", t:"il **TAR**"},
    {icona:"documento", t:"come per ogni atto della **pubblica amministrazione**", key:true}],
  etichette:{alto:{t:"TAR", key:true}, sx:"Dipendente", dx:"Amministrazione"}},
{id:"s10", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, sopratitolo:"Un sistema rigido", celle:[
  {t:"Regole diverse per ogni **categoria**"}, {t:"Indennità a **singoli gruppi**"},
  {t:"Costi difficili da **controllare**"}, {t:"Poca attenzione ai **risultati**"}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"cruscotto", sopratitolo:"Inizio anni Novanta · la crisi dei conti pubblici",
  titolo:"Serve **efficienza**", punti:[
    {icona:"avviso", t:"la rigidità non è più **sostenibile**"},
    {icona:"euro", t:"costi sotto **controllo**", key:true}],
  etichette:{alto:{t:"Conti pubblici", key:true}, sx:"Costi", dx:"Risultati"}},
{id:"s12", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Prima della riforma il dipendente pubblico non aveva tutele",
   ok:"Aveva uno statuto proprio, di diritto pubblico"}]},
{id:"s13", tipo:"titolo", tema:"profondo",
  titolo:"Un rapporto di diritto pubblico,<br>nato da un **atto di nomina**."},

// --- 4 · le tappe della riforma
{id:"s14", tipo:"flusso", tema:"chiaro", sopratitolo:"La svolta", passi:[
  {icona:"libro", t:"Legge delega", d:"421 del 1992"},
  {icona:"documento", t:"D.Lgs. 29/1993", key:true},
  {icona:"spunta", t:"Prima privatizzazione"}]},
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"firma", sopratitolo:"D.Lgs. 29/1993",
  titolo:"Dalla legge al **contratto**", punti:[
    {icona:"libro", t:"**codice civile** e contratti collettivi"},
    {icona:"persone", t:"nasce l'**ARAN**", key:true}],
  etichette:{alto:{t:"Contratto", key:true}, sx:"ARAN", dx:"Sindacati"}},
{id:"s16", tipo:"flusso", tema:"chiaro", sopratitolo:"Da allora, al tavolo", passi:[
  {icona:"persone", t:"ARAN e sindacati"},
  {icona:"documento", t:"Contratto nazionale", d:"di comparto", key:true},
  {icona:"ospedale", t:"Per esempio", d:"la sanità"}]},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"La seconda privatizzazione · le leggi Bassanini", col:[
  {h:"Legge 59/1997", t:"la **delega**"},
  {h:"D.Lgs. 80/1998", t:"il contratto anche per la **dirigenza**", key:true}]},
{id:"s18", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Le controversie di lavoro",
  da:{h:"Prima", t:"il TAR"},
  a:{h:"Dal 1° luglio 1998", t:"il **giudice del lavoro**"}},
{id:"s19", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 30 marzo 2001, n. 165", sigla:"Il riordino",
  testo:"Norme generali sull'**ordinamento del lavoro** alle dipendenze delle **amministrazioni pubbliche**."},
{id:"s20", tipo:"assetempo", tema:"chiaro", sopratitolo:"Le riforme, in fila",
  da:1990, a:2022, decenni:[2000,2010,2020], tappe:[
  {anno:1993, et:"D.Lgs. 29 — la svolta"},
  {anno:2001, et:"D.Lgs. 165 — il riordino"},
  {anno:2009, et:"D.Lgs. 150 — Brunetta", key:true},
  {anno:2017, et:"D.Lgs. 75 — Madia"}]},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Dal 2021", col:[
  {h:"Reclutamento", t:"nuove **misure**"},
  {h:"PIAO", t:"piano integrato di **attività e organizzazione**", key:true}]},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il D.Lgs. 165/2001 ha inventato la privatizzazione",
   ok:"L'ha raccolta e riordinata: la svolta è del 1993"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Dal **1993** al **2001**:<br>dalla legge al contratto."},

// --- 5 · che cosa vuol dire privatizzazione
{id:"s24", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 165, art. 2, c. 2", sigla:"Codice civile",
  testo:"I rapporti di lavoro sono regolati dal **codice civile** e dalle leggi sul lavoro nell'**impresa**."},
{id:"s25", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 2, cc. 2-3", col:[
  {h:"Salvo", t:"le regole **inderogabili** del decreto"},
  {h:"Trattamento economico", t:"solo con i **contratti collettivi**", key:true}]},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Art. 1, c. 2 · a chi si applica", celle:[
  {t:"**Stato**"}, {t:"**Regioni**"}, {t:"**Enti locali**"},
  {t:"**Scuole**"}, {t:"**Università**"}, {t:"Aziende ed enti del **SSN**"}]},
{id:"s27", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Art. 1 · gli scopi", box:[
  {n:"1", t:"Efficienza", d:"delle amministrazioni"},
  {n:"2", t:"Costi", d:"razionalizzati"},
  {n:"3", t:"Persone", d:"valorizzate, come nel privato"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Art. 5, c. 2",
  titolo:"I poteri del **privato datore**", punti:[
    {icona:"persone", t:"la **gestione** del personale"},
    {icona:"ingranaggio", t:"l'**organizzazione** del lavoro negli uffici", key:true}],
  etichette:{top:"Dirigente", basso:{t:"Datore di lavoro", key:true}}},
{id:"s29", tipo:"icone", tema:"chiaro", sopratitolo:"Un esempio: atti di gestione", voci:[
  {icona:"orologio",    t:"Il **turno**"},
  {icona:"spunta",      t:"Le **ferie**"},
  {icona:"ospedale",    t:"Il **reparto**"},
  {icona:"ingranaggio", t:"Decide il **dirigente**"}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"bilancia", sopratitolo:"Se nasce una lite",
  titolo:"Il **giudice del lavoro**", punti:[
    {icona:"persona", t:"un **trasferimento**, una **sanzione**"},
    {icona:"giudice", t:"lo stabilisce l'**art. 63**", key:true}],
  etichette:{alto:{t:"Art. 63", key:true}, sx:"Dipendente", dx:"Azienda"}},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Che cosa può fare quel giudice", col:[
  {h:"Disapplica", t:"l'atto amministrativo **illegittimo**"},
  {h:"Reintegra", t:"se il licenziamento è **illegittimo**", key:true}]},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Meglio dire contrattualizzazione", col:[
  {h:"L'ente", t:"resta **pubblico**"},
  {h:"Il rapporto", t:"si regola con il **contratto**", key:true}]},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Privatizzare vuol dire trasformare l'ospedale in azienda privata",
   ok:"Cambia la regola del rapporto, non la natura dell'ente"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"L'ente resta **pubblico**,<br>il rapporto diventa **contrattuale**."},

// --- 6 · che cosa resta pubblico
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"municipio", sopratitolo:"D.Lgs. 165, art. 3",
  titolo:"Non tutto è **privato**", punti:[
    {icona:"scudo", t:"personale in regime di **diritto pubblico**"},
    {icona:"libro", t:"con i **rispettivi ordinamenti**", key:true}],
  etichette:{insegna:{t:"Diritto pubblico", key:true}}},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Art. 3 · restano fuori dal contratto", celle:[
  {t:"**Magistrati**"}, {t:"**Avvocati** dello Stato"}, {t:"**Militari** e polizia"},
  {t:"**Diplomatici** e prefetti"}, {t:"**Vigili** del fuoco"}, {t:"**Professori** universitari"}]},
{id:"s37", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"Art. 2, c. 1",
  titolo:"La **grande** organizzazione", punti:[
    {icona:"ingranaggio", t:"linee fondamentali e **uffici principali**"},
    {icona:"documento", t:"con **atti organizzativi**", key:true}],
  etichette:{top:"Atti organizzativi", basso:{t:"Pubblico", key:true}}},
{id:"s38", tipo:"norma", tema:"chiaro", etichetta:"Costituzione, art. 97", sigla:"Concorso",
  testo:"Agli impieghi pubblici si accede mediante **concorso**, salvo i casi stabiliti dalla legge."},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Due giudici, due momenti", col:[
  {h:"Concorso per l'assunzione", t:"giudice **amministrativo**"},
  {h:"Dopo l'assunzione", t:"giudice del **lavoro**", key:true}]},
{id:"s40", tipo:"icone", tema:"chiaro", sopratitolo:"Regole di legge speciali", voci:[
  {icona:"divieto", t:"**Incompatibilità**"},
  {icona:"libro",   t:"Codice di **comportamento**"},
  {icona:"giudice", t:"Procedimento **disciplinare**"},
  {icona:"scudo",   t:"**Responsabilità**"}]},
{id:"s41", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"E restano i vincoli di spesa",
  titolo:"Limiti fissati per **legge**", punti:[
    {icona:"persone", t:"quante persone **assumere**"},
    {icona:"euro", t:"quanto **costa** il personale", key:true}],
  etichette:{alto:{t:"Bilancio", key:true}, sx:"Assunzioni", dx:"Costo"}},
{id:"s42", tipo:"confronto", tema:"chiaro", sopratitolo:"L'infermiera dell'inizio", col:[
  {h:"Il turno", t:"con i poteri del **datore di lavoro**"},
  {h:"Ingresso e secondo lavoro", t:"**concorso** e **autorizzazione**", key:true}]},
{id:"s43", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Tutti i dipendenti pubblici sono contrattualizzati",
   ok:"Magistrati, militari, polizia e professori universitari no"}]},
{id:"s44", tipo:"titolo", tema:"profondo",
  titolo:"**Contratto** per il rapporto,<br>**legge** per l'accesso e le garanzie."},

// --- 7 · le tre cose
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s48", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Le liti sul rapporto di lavoro pubblico vanno al TAR",
   ok:"Al giudice ordinario; al TAR restano i concorsi"}]},

// --- 8 · chiusura
{id:"s49", tipo:"titolo", tema:"profondo",
  titolo:"Dalla **nomina** al contratto,<br>dal TAR al **giudice del lavoro**.",
  sotto:"Prossima lezione: i cinque principi della riforma."},

{id:"s50", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 8.2", sottotitolo:"I cinque principi", ente:ENTE},
];
