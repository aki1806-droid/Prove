// Contenuto delle 49 scene della lezione 6.4. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 6. L'accesso civico generalizzato (FOIA):
// D.Lgs. 33/2013 art. 5 cc. 2-9, art. 5-bis, art. 46; linee guida ANAC (delibera 1309/2016).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "**Chiunque**, **senza motivazione**, su dati e documenti **detenuti**, ulteriori rispetto a quelli da pubblicare",
  "Controinteressati: **10 giorni**; risposta in **30**; contro diniego o silenzio **riesame RPCT in 20**, poi il giudice",
  "Limiti **relativi** (pregiudizio concreto) e **assoluti**; prima del no, **accesso parziale** e **differimento**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 6 · Trasparenza nella pubblica amministrazione",
  titolo:"Accesso civico<br>generalizzato · FOIA", sottotitolo:"Lezione 6.4", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Un giornalista scrive all'azienda",
  titolo:"Quante prestazioni **rinviate**?", punti:[
    {icona:"documento", t:"un dato **non** da pubblicare"},
    {icona:"persona", t:"nessun **interesse** personale"},
    {icona:"spunta", t:"deve comunque avere una **risposta**", key:true}],
  etichette:{sx:"Azienda", dx:"Giornalista", alto:{t:"Richiesta", key:true}}},
{id:"s03", tipo:"illustrata", tema:"chiaro", ill:"porta", sopratitolo:"Dal 2016",
  titolo:"Tutti i dati **detenuti**", punti:[
    {icona:"cartella", t:"anche **oltre** gli obblighi di pubblicazione"},
    {icona:"persone", t:"l'accesso civico **generalizzato**", key:true}],
  etichette:{alto:{t:"FOIA", key:true}}},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"La regola è la **conoscibilità**,<br>il rifiuto è l'**eccezione**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"occhio", t:"La portata"},
  {icona:"orologio", t:"La procedura", d:"controinteressati e tempi"},
  {icona:"lucchetto", t:"I limiti", d:"relativi e assoluti"},
  {icona:"bilancia", t:"La privacy", key:true}]},

// --- 3 · la portata
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"D.Lgs. 33/2013, art. 5, c. 2", sigla:"Chiunque",
  testo:"Accede a dati e documenti detenuti dalle PA, **ulteriori** rispetto a quelli da pubblicare."},
{id:"s07", tipo:"confronto", tema:"chiaro", sopratitolo:"Lo scopo dichiarato", col:[
  {h:"Controllo diffuso", t:"su funzioni e **risorse pubbliche**"},
  {h:"Partecipazione", t:"al **dibattito pubblico**", key:true}]},
{id:"s08", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"Come l'accesso civico semplice", box:[
  {n:"1", t:"Chiunque", d:"nessun limite di legittimazione"},
  {n:"2", t:"Senza motivo", d:"la richiesta non si motiva"},
  {n:"3", t:"Gratuito", d:"salvo il costo di riproduzione"}]},
{id:"s09", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Una svolta culturale",
  da:{h:"Prima", t:"il cittadino spiegava perché"},
  a:{h:"Oggi", t:"la PA spiega **perché no**"}},
{id:"s10", tipo:"contatore", tema:"chiaro", sopratitolo:"Il costo",
  valori:[{n:0, t:"euro per il rilascio", key:true}],
  sotto:"Solo il **rimborso** del costo effettivo di riproduzione."},
{id:"s11", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"L'oggetto",
  titolo:"Ciò che **esiste già**", punti:[
    {icona:"cartella", t:"dati e documenti **detenuti**", key:true},
    {icona:"divieto", t:"non si pretendono **elaborazioni** apposta"}],
  etichette:{cassetto:{t:"Dati detenuti", key:true}}},
{id:"s12", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: un'associazione di pazienti", passi:[
  {icona:"persone", t:"Chiede", d:"gli interventi di un reparto"},
  {icona:"cartella", t:"Il dato esiste", d:"nei sistemi aziendali"},
  {icona:"spunta", t:"Accesso", d:"generalizzato", key:true}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"Il FOIA riguarda solo i dati a pubblicazione obbligatoria",
   ok:"Quello è l'accesso civico semplice; il generalizzato va oltre"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Tutto ciò che l'amministrazione **detiene**,<br>salvo limiti **precisi**."},

// --- 4 · la procedura
{id:"s15", tipo:"rete", tema:"chiaro", sopratitolo:"A chi si presenta, anche per via telematica",
  centro:"FOIA", dcentro:"richiesta", nodi:[
  {t:"Ufficio che detiene i dati", icona:"cartella", key:true}, {t:"URP", icona:"chat"},
  {t:"Altro ufficio indicato", icona:"ospedale"}], inizio:-Math.PI/2, rx:520, ry:240},
{id:"s16", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Nessun modulo obbligatorio",
  titolo:"Chiarezza", punti:[
    {icona:"documento", t:"indicare i **dati** richiesti"},
    {icona:"chat", t:"una richiesta generica si **precisa** insieme", key:true}],
  etichette:{titolo:"Richiesta", sigillo:{t:"Precisa", key:true}}},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"Art. 5, c. 5 · i controinteressati",
  titolo:"Vanno **informati**", punti:[
    {icona:"persona", t:"chi può subire un **pregiudizio** privato"},
    {icona:"chat", t:"raccomandata o **via telematica**", key:true}],
  etichette:{sx:"Ufficio", dx:"Controinteressato", alto:{t:"Avviso", key:true}}},
{id:"s18", tipo:"contatore", tema:"chiaro", sopratitolo:"L'opposizione",
  valori:[{n:10, t:"giorni per una motivata opposizione", key:true}],
  sotto:"Nel frattempo il termine per rispondere è **sospeso**."},
{id:"s19", tipo:"norma", tema:"chiaro", etichetta:"Art. 5, c. 6", sigla:"30 giorni",
  testo:"Provvedimento **espresso** e **motivato**: il no indica il limite dell'**art. 5-bis**."},
{id:"s20", tipo:"scadenza", tema:"chiaro", sopratitolo:"Accolto nonostante l'opposizione",
  max:17, banda:[0,15], inizio:"comunicazione", fine:"",
  tappe:[{a:15, v:"15", t:"giorni prima di **trasmettere**", key:true}]},
{id:"s21", tipo:"illustrata", tema:"chiaro", ill:"bivio", sopratitolo:"Contro il diniego o il silenzio",
  titolo:"Due **passi**", punti:[
    {icona:"scudo", t:"**riesame** dell'RPCT in 20 giorni", key:true},
    {icona:"giudice", t:"poi il **giudice** amministrativo"}],
  etichette:{sx:{t:"Riesame", key:true}, dx:"TAR"}},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Altre strade", col:[
  {h:"Atti di regioni ed enti locali", t:"anche il **difensore civico**"},
  {h:"Il controinteressato", t:"può chiedere a sua volta il **riesame**", key:true}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Nel FOIA il silenzio vale come accoglimento",
   ok:"Si attiva il riesame dell'RPCT, e poi il giudice"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"**Dieci** giorni per opporsi,<br>**trenta** per decidere,<br>**venti** per il riesame."},

// --- 5 · i limiti
{id:"s25", tipo:"norma", tema:"chiaro", etichetta:"Art. 5-bis, c. 1", sigla:"Interessi pubblici",
  testo:"Il no serve a evitare un **pregiudizio concreto**."},
{id:"s26", tipo:"griglia", tema:"chiaro", colonne:4, spunta:false, sopratitolo:"Gli interessi pubblici tutelati", celle:[
  {t:"**Sicurezza** e ordine pubblico"}, {t:"Sicurezza **nazionale**"}, {t:"**Difesa**"}, {t:"Relazioni **internazionali**"},
  {t:"Stabilità **finanziaria**"}, {t:"**Indagini** sui reati"}, {t:"Attività **ispettive**"}]},
{id:"s27", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 5-bis, c. 2 · gli interessi privati", voci:[
  {icona:"persona",   t:"**Dati personali**"},
  {icona:"lucchetto", t:"Segretezza della **corrispondenza**"},
  {icona:"euro",      t:"Interessi **economici e commerciali**"},
  {icona:"sigillo",   t:"**Proprietà intellettuale**"}]},
{id:"s28", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"In azienda sanitaria, per esempio",
  titolo:"I **fornitori**", punti:[
    {icona:"euro", t:"interessi **commerciali**"},
    {icona:"lucchetto", t:"segreti industriali in un'**offerta di gara**", key:true}],
  etichette:{alto:{t:"Segreto commerciale", key:true}}},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"bilancio", sopratitolo:"Limiti relativi",
  titolo:"Si **pesano**", punti:[
    {icona:"bilancia", t:"serve un **pregiudizio concreto**", key:true},
    {icona:"occhio", t:"valutazione **caso per caso**"}],
  etichette:{sx:"Accesso", dx:"Pregiudizio", alto:{t:"Bilanciamento", key:true}}},
{id:"s30", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 5-bis, c. 3 · eccezioni assolute", col:[
  {h:"Segreto di Stato", t:"e altri **divieti** di legge"},
  {h:"Esclusioni della 241", t:"qui **non** c'è bilanciamento", key:true}]},
{id:"s31", tipo:"confronto", tema:"chiaro", sopratitolo:"Due regole di proporzione", col:[
  {h:"Accesso parziale", t:"se il limite tocca solo **una parte**", grande:true},
  {h:"Differimento", t:"se basta **rinviare** nel tempo", grande:true}]},
{id:"s32", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"Se c'è un limite, l'accesso si rifiuta sempre",
   ok:"Prima si valutano l'accesso parziale e il differimento"}]},
{id:"s33", tipo:"titolo", tema:"profondo",
  titolo:"Limiti **relativi** da pesare,<br>eccezioni **assolute** da rispettare."},

// --- 6 · il bilanciamento con la privacy
{id:"s34", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"In sanità",
  titolo:"Il limite più **frequente**", punti:[
    {icona:"persona", t:"nomi, **condizioni di salute**"},
    {icona:"persone", t:"dati di **dipendenti** e **pazienti**", key:true}],
  etichette:{alto:{t:"Dati personali", key:true}}},
{id:"s35", tipo:"flusso", tema:"chiaro", sopratitolo:"Diniego per privacy, poi riesame", passi:[
  {icona:"scudo", t:"L'RPCT", d:"riesamina"},
  {icona:"chat", t:"Sente il Garante", d:"per la privacy"},
  {icona:"orologio", t:"10 giorni", d:"termine sospeso", key:true}]},
{id:"s36", tipo:"contatore", tema:"chiaro", sopratitolo:"Il parere del Garante",
  valori:[{n:10, t:"giorni; intanto il riesame è sospeso", key:true}]},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Un esempio", col:[
  {h:"Si può dare", t:"il numero di **interventi** del reparto", key:true},
  {h:"Non si dà", t:"l'elenco dei **pazienti** con i nomi"}]},
{id:"s38", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"La soluzione nel mezzo",
  titolo:"Accesso **parziale**", punti:[
    {icona:"lucchetto", t:"si **oscurano** i dati personali"},
    {icona:"spunta", t:"si concede il **resto**", key:true}],
  etichette:{titolo:"Documento", sigillo:{t:"Oscurato", key:true}}},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi riceve una richiesta si chiede", col:[
  {h:"Il dato esiste?", t:"è già **detenuto** dall'amministrazione", grande:true},
  {h:"Chi tutelare?", t:"i **controinteressati** da informare", grande:true}]},
{id:"s40", tipo:"norma", tema:"chiaro", etichetta:"Delibera ANAC 1309/2016", sigla:"Linee guida",
  testo:"Adottate d'intesa con il **Garante** per la protezione dei dati personali."},
{id:"s41", tipo:"norma", tema:"chiaro", etichetta:"Art. 46, c. 1", sigla:"Responsabilità",
  testo:"Negare o limitare fuori dall'**art. 5-bis** pesa sulla responsabilità **dirigenziale**."},
{id:"s42", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Il FOIA serve a ottenere i dati sanitari di altre persone",
   ok:"La privacy resta un limite forte, soprattutto in sanità"}]},
{id:"s43", tipo:"titolo", tema:"profondo",
  titolo:"Aprire i dati dell'**amministrazione**,<br>proteggere le **persone**."},

// --- 7 · le tre cose
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s47", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"Nel FOIA si deve spiegare perché si chiede un dato",
   ok:"La motivazione serve solo nell'accesso documentale"}]},

// --- 8 · chiusura
{id:"s48", tipo:"titolo", tema:"profondo",
  titolo:"Conoscere è la **regola**,<br>i limiti sono **precisi**,<br>la privacy si **protegge**.",
  sotto:"Prossima lezione: chi vigila e che cosa si rischia."},

{id:"s49", tipo:"copertina", tema:"profondo", modulo:"Prossima lezione",
  titolo:"Lezione 6.5", sottotitolo:"Chi vigila<br>e che cosa si rischia", ente:ENTE},
];
