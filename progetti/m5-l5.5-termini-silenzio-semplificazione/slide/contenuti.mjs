// Contenuto delle 48 scene della lezione 5.5. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 5. Termini, silenzio e semplificazione:
// L. 241/1990 artt. 2, 2-bis, 17-bis, 18, 19, 20, 14; DPR 445/2000.

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Termine generale **30 giorni**, fino a **90**, in casi particolari fino a **180**; **una sola** sospensione, massimo 30 giorni",
  "Silenzio inadempimento: il **potere sostitutivo** conclude nella **metà** del termine; ricorso al giudice entro **un anno**",
  "Silenzio assenso nei procedimenti **a istanza di parte**, non per **salute** e ambiente; con la **SCIA** si parte subito",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Procedimento amministrativo e accesso",
  titolo:"Termini, silenzio<br>e semplificazione", sottotitolo:"Lezione 5.5", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Hai presentato una domanda",
  titolo:"E nessuno **risponde**", punti:[
    {icona:"orologio", t:"passano i **giorni**, poi le **settimane**"},
    {icona:"libro", t:"la legge ha una risposta **precisa**", key:true}],
  etichette:{alto:{t:"Domanda presentata", key:true}}},
{id:"s03", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Tre significati del silenzio", box:[
  {n:"1", t:"Inadempimento", d:"contro cui reagire"},
  {n:"2", t:"Un sì", d:"il silenzio assenso"},
  {n:"3", t:"Partire subito", d:"senza aspettare risposta"}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Il **tempo** della pubblica amministrazione<br>ha delle **regole**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"orologio", t:"I termini"},
  {icona:"avviso", t:"Quando tace"},
  {icona:"spunta", t:"Il silenzio assenso"},
  {icona:"ingranaggio", t:"La semplificazione", d:"autocertificazione, SCIA, conferenza", key:true}]},

// --- 3 · i termini
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Art. 2", sigla:"Concludere",
  testo:"Istanza di parte o avvio d'ufficio: il procedimento si chiude con un **provvedimento espresso**."},
{id:"s07", tipo:"contatore", tema:"chiaro", sopratitolo:"Il termine generale",
  valori:[{n:30, t:"giorni, se non è previsto un termine diverso", key:true}],
  sotto:"Vale quando legge o atti dell'amministrazione **non dispongono** altrimenti."},
{id:"s08", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi può fissare termini diversi", col:[
  {h:"Stato ed enti nazionali", t:"fino a **90 giorni**"},
  {h:"Regioni ed enti del SSN", t:"regolano i propri termini, nel rispetto delle **garanzie** della legge"}]},
{id:"s09", tipo:"scadenza", tema:"chiaro", sopratitolo:"Oltre i 90 giorni solo per ragioni particolari",
  max:200, banda:[90,180], inizio:"avvio", fine:"",
  tappe:[{a:30, v:"30", t:"regola **generale**"}, {a:90, v:"90", t:"termini **diversi**"},
         {a:180, v:"180", t:"limite **massimo**", key:true}]},
{id:"s10", tipo:"confronto", tema:"chiaro", sopratitolo:"Da quando decorre", col:[
  {h:"D'ufficio", t:"dall'**inizio** del procedimento"},
  {h:"A istanza di parte", t:"dal **ricevimento** della domanda", key:true}]},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"La sospensione",
  titolo:"**Una sola** volta", punti:[
    {icona:"orologio", t:"per non più di **30 giorni**", key:true},
    {icona:"documento", t:"per informazioni che l'ufficio non ha e non può avere da un'altra PA"}],
  etichette:{data:{t:"Sospensione", key:true}, nota:"max 30 gg"}},
{id:"s12", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: una domanda del personale", passi:[
  {icona:"documento", t:"Domanda", d:"termine: 60 giorni"},
  {icona:"cartella", t:"Manca un documento", d:"di un altro ente"},
  {icona:"orologio", t:"Sospensione", d:"una volta sola", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il termine si può sospendere più volte",
   ok:"Una sola sospensione, per non più di 30 giorni"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"**Trenta** giorni come regola,<br>**una** sola sospensione."},

// --- 4 · quando l'amministrazione tace
{id:"s15", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Il termine scade senza provvedimento",
  titolo:"Silenzio **inadempimento**", punti:[
    {icona:"avviso", t:"l'amministrazione è in **ritardo**"},
    {icona:"persona", t:"il privato ha **più strade**", key:true}],
  etichette:{alto:{t:"Termine scaduto", key:true}}},
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"organigramma", sopratitolo:"La prima strada",
  titolo:"Il potere **sostitutivo**", punti:[
    {icona:"persona", t:"una **figura apicale** o un'unità organizzativa"},
    {icona:"ingranaggio", t:"interviene se il responsabile **non conclude**", key:true}],
  etichette:{top:{t:"Potere sostitutivo", key:true}, basso:"Responsabile"}},
{id:"s17", tipo:"confronto", tema:"chiaro", sopratitolo:"Come funziona", col:[
  {h:"Il nome", t:"**pubblicato** sul sito, ben visibile"},
  {h:"Il tempo", t:"conclude entro la **metà** del termine originario", key:true}]},
{id:"s18", tipo:"scadenza", tema:"chiaro", sopratitolo:"Per esempio: un termine di 60 giorni",
  max:95, banda:[60,90], inizio:"domanda", fine:"",
  tappe:[{a:60, v:"60", t:"termine **scaduto**"}, {a:90, v:"+30", t:"conclude il **sostituto**", key:true}]},
{id:"s19", tipo:"illustrata", tema:"chiaro", ill:"bivio", sopratitolo:"La seconda strada",
  titolo:"Il giudice **amministrativo**", punti:[
    {icona:"giudice", t:"ricorso contro il **silenzio**"},
    {icona:"orologio", t:"finché dura, e non oltre **un anno** dalla scadenza", key:true}],
  etichette:{sx:"Sostituto", dx:{t:"Giudice", key:true}}},
{id:"s20", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 2-bis · e c'è il danno", col:[
  {h:"Risarcimento", t:"se il ritardo, doloso o colposo, causa un **danno ingiusto**"},
  {h:"Indennizzo", t:"in alcuni procedimenti, per il **solo ritardo**", key:true}]},
{id:"s21", tipo:"norma", tema:"chiaro", etichetta:"Art. 2, c. 8-bis · dal 2020", sigla:"Inefficaci",
  testo:"Alcuni atti di **assenso** adottati dopo la scadenza dei termini non producono effetti."},
{id:"s22", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il silenzio inadempimento equivale a un rifiuto",
   ok:"È un'omissione: il procedimento resta aperto e l'obbligo di decidere rimane"}]},
{id:"s23", tipo:"titolo", tema:"profondo",
  titolo:"Un **sostituto**, un **giudice**,<br>un **risarcimento**:<br>il ritardo ha un prezzo."},

// --- 5 · il silenzio che vale sì
{id:"s24", tipo:"norma", tema:"chiaro", etichetta:"Art. 20", sigla:"Silenzio assenso",
  testo:"Nei procedimenti **a istanza di parte**, il silenzio vale come **accoglimento**."},
{id:"s25", tipo:"flusso", tema:"chiaro", sopratitolo:"Come si forma", passi:[
  {icona:"documento", t:"Domanda"},
  {icona:"orologio", t:"Termine scaduto", d:"senza diniego né conferenza"},
  {icona:"spunta", t:"Accolta", d:"senza altre istanze o diffide", key:true}]},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Resta però un potere",
  titolo:"L'**autotutela**", punti:[
    {icona:"documento", t:"**revocare** o **annullare** l'atto formato col silenzio"},
    {icona:"bilancia", t:"alle **condizioni** previste dalla legge", key:true}],
  etichette:{alto:{t:"Autotutela", key:true}}},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Non vale in materie delicate", voci:[
  {icona:"sigillo",  t:"**Patrimonio** culturale e paesaggistico"},
  {icona:"goccia",   t:"**Ambiente**"},
  {icona:"scudo",    t:"**Difesa** e pubblica sicurezza"},
  {icona:"persone",  t:"**Immigrazione**, asilo, cittadinanza"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"ospedale", sopratitolo:"E soprattutto, per noi",
  titolo:"Non vale per la **salute**", punti:[
    {icona:"cuoremano", t:"salute e pubblica **incolumità**"},
    {icona:"documento", t:"serve di regola un provvedimento **espresso**", key:true}]},
{id:"s29", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Non vale nemmeno", celle:[
  {t:"Se il **diritto europeo** impone un atto formale"},
  {t:"Se la legge dice **rigetto**"},
  {t:"Dal 2021: si può chiedere l'**attestazione** dell'assenso"}]},
{id:"s30", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Art. 17-bis · tra amministrazioni",
  titolo:"Assenso **acquisito**", punti:[
    {icona:"orologio", t:"se non arriva entro **30 giorni**", key:true},
    {icona:"spunta", t:"l'assenso si intende **dato**"}],
  etichette:{sx:"PA procedente", dx:"PA che assente", alto:{t:"30 giorni", key:true}}},
{id:"s31", tipo:"contatore", tema:"chiaro", sopratitolo:"Per chi tutela interessi sensibili", sep:"·",
  valori:[{n:30, t:"giorni di regola"}, {n:90, t:"ambiente, paesaggio, beni culturali, salute", key:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Il silenzio assenso è la regola generale",
   ok:"Solo a istanza di parte, e non nelle materie escluse, tra cui la salute"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Il silenzio vale **sì**<br>solo dove la **legge** lo consente."},

// --- 6 · gli strumenti di semplificazione
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Primo strumento · art. 18",
  titolo:"Acquisizione **d'ufficio**", punti:[
    {icona:"cartella", t:"i documenti che la PA **ha già**"},
    {icona:"ospedale", t:"o che un'altra PA **detiene** per legge", key:true}],
  etichette:{cassetto:{t:"Documenti della PA", key:true}}},
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Al cittadino si chiede poco",
  titolo:"L'**autocertificazione**", punti:[
    {icona:"chat", t:"solo gli elementi per **trovarli**"},
    {icona:"documento", t:"fatti, stati e qualità: **DPR 445/2000**", key:true}],
  etichette:{insegna:"Ufficio", foglio:{t:"Autocertificazione", key:true}}},
{id:"s36", tipo:"norma", tema:"chiaro", etichetta:"Secondo strumento · art. 19", sigla:"SCIA",
  testo:"Sostituisce autorizzazioni e licenze che dipendono **solo** dai **requisiti** di legge."},
{id:"s37", tipo:"scadenza", tema:"chiaro", sopratitolo:"Si parte dalla presentazione, i controlli dopo",
  max:66, banda:[0,60], inizio:"SCIA", fine:"",
  tappe:[{a:30, v:"30", t:"in **edilizia**"}, {a:60, v:"60", t:"per **controllare**", key:true}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"La responsabilità di chi dichiara",
  titolo:"Il falso è **reato**", punti:[
    {icona:"avviso", t:"chi dichiara il **falso** in una SCIA"},
    {icona:"bilancia", t:"la semplificazione si regge sulla **responsabilità**", key:true}],
  etichette:{titolo:"SCIA", sigillo:{t:"Vero", key:true}}},
{id:"s39", tipo:"illustrata", tema:"chiaro", ill:"tavolo", sopratitolo:"Terzo strumento · art. 14",
  titolo:"La conferenza di **servizi**", punti:[
    {icona:"persone", t:"più pareri o assensi di **amministrazioni diverse**"},
    {icona:"spunta", t:"si esaminano **insieme**, non uno per uno", key:true}],
  etichette:{p1:"ASL", p2:"Comune", p3:"Regione", p4:"Tutela", alto:{t:"Conferenza", key:true}}},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Due tipi, di regola in forma semplificata e telematica", col:[
  {h:"Istruttoria", t:"per esaminare insieme gli **interessi**"},
  {h:"Decisoria", t:"quando servono **più assensi**", key:true}]},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"La SCIA è un provvedimento, o un silenzio assenso",
   ok:"Il privato parte, l'amministrazione controlla dopo"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Meno **attese**:<br>chi ha i requisiti **parte**,<br>i controlli arrivano dopo."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"confronto", tema:"tenue", sopratitolo:"L'ultimo distrattore: sono opposti", col:[
  {h:"Silenzio assenso", t:"la domanda è **accolta**", key:true},
  {h:"Silenzio inadempimento", t:"l'amministrazione è in **ritardo**"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Tempi **certi**,<br>rimedi contro l'**inerzia**,<br>silenzi con un **significato**.",
  sotto:"Prossima lezione: il diritto di accesso ai documenti."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 5.6", sottotitolo:"Il diritto di accesso<br>documentale", ente:ENTE},
];
