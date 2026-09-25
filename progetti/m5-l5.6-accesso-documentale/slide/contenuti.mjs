// Contenuto delle 48 scene della lezione 5.6. *accento*  **accento in semibold**
//
// Corso «Progressione verticale · Comparto Sanità», Modulo 5. Il diritto di accesso documentale:
// L. 241/1990 artt. 22, 23, 24, 25; D.P.R. 184/2006; confronto con l'accesso civico (D.Lgs. 33/2013).

const ENTE = "CISL FP Padova Rovigo · Progressione verticale · Comparto Sanità";

const TRE_COSE = [
  "Accesso agli **interessati**: interesse **diretto, concreto e attuale**; **controinteressati** = chi rischia la riservatezza",
  "Esclusioni dell'**art. 24**, niente **controllo generalizzato**, **differimento** invece del no; l'accesso **difensivo** è garantito",
  "Richiesta **motivata**; **10 giorni** per l'opposizione, **30** per concludere, silenzio = **rigetto**; TAR o **riesame**",
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 5 · Procedimento amministrativo e accesso",
  titolo:"Il diritto di accesso<br>documentale", sottotitolo:"Lezione 5.6", ente:ENTE},

// --- 1 · aggancio
{id:"s02", tipo:"illustrata", tema:"chiaro", ill:"archivio", sopratitolo:"Una graduatoria interna",
  titolo:"Puoi vedere le **carte**?", punti:[
    {icona:"persone", t:"qualche posizione sotto un **collega**"},
    {icona:"occhio", t:"capire come sono stati dati i **punteggi**", key:true}],
  etichette:{cassetto:{t:"Graduatoria", key:true}}},
{id:"s03", tipo:"confronto", tema:"chiaro", sopratitolo:"Il diritto di accesso serve a due cose", col:[
  {h:"A chi lo chiede", t:"per **difendere** i propri interessi", grande:true},
  {h:"All'amministrazione", t:"per essere più **imparziale** e **trasparente**", grande:true}]},
{id:"s04", tipo:"titolo", tema:"profondo",
  titolo:"Le carte non sono **segrete**<br>per chi ha un **interesse**."},

// --- 2 · rotta
{id:"s05", tipo:"flusso", tema:"chiaro", sopratitolo:"Quattro passaggi", passi:[
  {icona:"persona", t:"Chi accede", d:"e a che cosa"},
  {icona:"lucchetto", t:"I limiti"},
  {icona:"documento", t:"La richiesta"},
  {icona:"giudice", t:"Se è negato", key:true}]},

// --- 3 · chi può accedere, e a che cosa
{id:"s06", tipo:"norma", tema:"chiaro", etichetta:"Art. 22", sigla:"Accesso",
  testo:"Il diritto degli interessati di **prendere visione** dei documenti amministrativi e di **estrarne copia**."},
{id:"s07", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Chi sono gli interessati",
  titolo:"Un interesse **collegato**", punti:[
    {icona:"persone", t:"soggetti privati, anche portatori di interessi **pubblici** o **diffusi**"},
    {icona:"documento", t:"collegato al **documento** richiesto", key:true}],
  etichette:{insegna:"Accesso agli atti", foglio:{t:"Richiesta", key:true}}},
{id:"s08", tipo:"tre", tema:"chiaro", attive:[0,1,2], sopratitolo:"L'interesse deve essere", box:[
  {n:"1", t:"Diretto", d:"personale"},
  {n:"2", t:"Concreto", d:"legato a una situazione reale"},
  {n:"3", t:"Attuale", d:"presente al momento della richiesta"}]},
{id:"s09", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"I controinteressati",
  titolo:"Chi rischia la **riservatezza**", punti:[
    {icona:"persona", t:"individuati o facilmente **individuabili**"},
    {icona:"lucchetto", t:"per esempio il **collega** di cui chiedi i titoli", key:true}],
  etichette:{alto:{t:"Riservatezza", key:true}}},
{id:"s10", tipo:"illustrata", tema:"chiaro", ill:"documento", sopratitolo:"Il documento amministrativo",
  titolo:"Ogni **rappresentazione**", punti:[
    {icona:"foto", t:"grafica, **elettronica** o di altro tipo"},
    {icona:"cartella", t:"anche atti **interni** o non legati a un procedimento", key:true}],
  etichette:{titolo:"Documento", sigillo:{t:"PA", key:true}}},
{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Documenti, non informazioni", col:[
  {h:"L'amministrazione", t:"non è tenuta a **elaborare dati**", grande:true},
  {h:"Si chiedono", t:"documenti che **esistono già**", grande:true}]},
{id:"s12", tipo:"icone", tema:"chiaro", sopratitolo:"Art. 23 · verso chi si esercita", voci:[
  {icona:"bilancia",   t:"Pubbliche **amministrazioni**"},
  {icona:"cartella",   t:"Enti **pubblici**"},
  {icona:"ingranaggio",t:"Gestori di **pubblici servizi**"},
  {icona:"ospedale",   t:"La tua **azienda sanitaria**"}]},
{id:"s13", tipo:"trappola", tema:"tenue", sopratitolo:"Occhio a un distrattore", righe:[
  {sb:"L'accesso documentale spetta a chiunque",
   ok:"Serve un interesse diretto, concreto e attuale, collegato al documento"}]},
{id:"s14", tipo:"titolo", tema:"profondo",
  titolo:"Un interesse **vero**,<br>un documento che **esiste**."},

// --- 4 · i limiti
{id:"s15", tipo:"norma", tema:"chiaro", etichetta:"Art. 22, c. 3", sigla:"La regola",
  testo:"Tutti i documenti amministrativi sono **accessibili**, salvo le eccezioni dell'**art. 24**."},
{id:"s16", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false, sopratitolo:"Art. 24 · l'accesso è escluso", celle:[
  {t:"**Segreto** di Stato e segreti di legge"}, {t:"Procedimenti **tributari**"},
  {t:"Atti **normativi**, generali, di pianificazione e programmazione"}]},
{id:"s17", tipo:"illustrata", tema:"chiaro", ill:"cassaforte", sopratitolo:"Nei procedimenti selettivi",
  titolo:"Test **psicoattitudinali** di terzi", punti:[
    {icona:"divieto", t:"esclusi i documenti con queste **informazioni** su altri"},
    {icona:"persone", t:"per esempio le valutazioni di altri **candidati**", key:true}],
  etichette:{alto:{t:"Esclusi", key:true}}},
{id:"s18", tipo:"illustrata", tema:"chiaro", ill:"calendario", sopratitolo:"Art. 24, cc. 2 e 5",
  titolo:"Categorie e **tempi**", punti:[
    {icona:"cartella", t:"ogni PA individua le **categorie** sottratte"},
    {icona:"orologio", t:"e per quanto **tempo** restano riservate", key:true}],
  etichette:{data:{t:"Riservato fino a", key:true}, nota:"Categoria"}},
{id:"s19", tipo:"icone", tema:"chiaro", sopratitolo:"Il regolamento può sottrarre documenti sulla riservatezza", voci:[
  {icona:"persona",   t:"Vita **privata**"},
  {icona:"cuoremano", t:"Interessi **sanitari**"},
  {icona:"cappello",  t:"Interessi **professionali**"},
  {icona:"euro",      t:"Interessi **economici**"}]},
{id:"s20", tipo:"illustrata", tema:"chiaro", ill:"scudo", sopratitolo:"Art. 24, c. 7 · il contrappeso",
  titolo:"L'accesso **difensivo**", punti:[
    {icona:"giudice", t:"per **curare** o **difendere** i propri interessi giuridici"},
    {icona:"spunta", t:"va **comunque** garantito", key:true}],
  etichette:{alto:{t:"Difesa", key:true}}},
{id:"s21", tipo:"confronto", tema:"chiaro", sopratitolo:"Per i dati sulla salute il limite è più stretto", col:[
  {h:"Il richiedente", t:"un interesse di **rango almeno pari**", key:true},
  {h:"La persona dei dati", t:"il suo diritto alla **riservatezza**"}]},
{id:"s22", tipo:"confronto", tema:"chiaro", sopratitolo:"Art. 24, cc. 3 e 4", col:[
  {h:"Non ammesso", t:"il **controllo generalizzato** sull'operato della PA"},
  {h:"Non si nega", t:"se basta il **differimento**, cioè rinviare", key:true}]},
{id:"s23", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione", righe:[
  {sb:"Se ci sono controinteressati, l'accesso è sempre negato",
   ok:"L'amministrazione bilancia i diritti; l'accesso difensivo pesa di più"}]},
{id:"s24", tipo:"titolo", tema:"profondo",
  titolo:"La regola è l'**accesso**:<br>le esclusioni sono **eccezioni**."},

// --- 5 · come si chiede
{id:"s25", tipo:"norma", tema:"chiaro", etichetta:"Art. 25 · D.P.R. 184/2006", sigla:"Motivata",
  testo:"Rivolta a chi ha **formato** il documento o lo **detiene** stabilmente."},
{id:"s26", tipo:"illustrata", tema:"chiaro", ill:"sportello", sopratitolo:"Senza controinteressati",
  titolo:"Accesso **informale**", punti:[
    {icona:"chat", t:"anche **a voce**, all'ufficio competente"},
    {icona:"spunta", t:"accolto **subito**, senza formalità", key:true}],
  etichette:{insegna:"Ufficio", foglio:{t:"Subito", key:true}}},
{id:"s27", tipo:"flusso", tema:"chiaro", sopratitolo:"Un esempio: la tua selezione interna", passi:[
  {icona:"cartella", t:"Verbali e schede", d:"di valutazione"},
  {icona:"persone", t:"Altri candidati", d:"coinvolti"},
  {icona:"documento", t:"Procedura formale", key:true}]},
{id:"s28", tipo:"griglia", tema:"chiaro", colonne:3, spunta:true, sopratitolo:"Si passa alla procedura formale se ci sono", celle:[
  {t:"**Controinteressati**"}, {t:"Dubbi sull'**interesse**"}, {t:"Dubbi sull'**identità**"}]},
{id:"s29", tipo:"illustrata", tema:"chiaro", ill:"busta", sopratitolo:"I controinteressati ricevono copia",
  titolo:"**Dieci** giorni per opporsi", punti:[
    {icona:"chat", t:"una **motivata opposizione**"},
    {icona:"bilancia", t:"poi l'amministrazione **decide**", key:true}],
  etichette:{sx:"Ufficio", dx:"Controinteressato", alto:{t:"10 giorni", key:true}}},
{id:"s30", tipo:"scadenza", tema:"chiaro", sopratitolo:"I tempi del procedimento formale",
  max:34, banda:[0,30], inizio:"richiesta", fine:"",
  tappe:[{a:10, v:"10", t:"se è **irregolare**: comunicazione"}, {a:30, v:"30", t:"per **concludere**", key:true}]},
{id:"s31", tipo:"contatore", tema:"chiaro", sopratitolo:"Se l'accesso è accolto",
  valori:[{n:15, t:"giorni almeno per vedere i documenti", key:true}],
  sotto:"Esame **gratuito**; la copia costa solo la **riproduzione**, salvo il bollo."},
{id:"s32", tipo:"confronto", tema:"chiaro", sopratitolo:"Sempre motivati", col:[
  {h:"Rifiuto e limitazione", t:"con le **ragioni** dell'art. 24"},
  {h:"Differimento", t:"deve indicare **quanto dura**", key:true}]},
{id:"s33", tipo:"trappola", tema:"tenue", sopratitolo:"Un distrattore frequente", righe:[
  {sb:"La richiesta di accesso documentale non va motivata",
   ok:"Va motivata, spiegando l'interesse collegato al documento"}]},
{id:"s34", tipo:"titolo", tema:"profondo",
  titolo:"Chiedere per **iscritto**,<br>spiegare il **perché**,<br>conservare la **ricevuta**."},

// --- 6 · se l'accesso è negato
{id:"s35", tipo:"illustrata", tema:"chiaro", ill:"clessidra", sopratitolo:"Art. 25, c. 4",
  titolo:"Il silenzio vale **rigetto**", punti:[
    {icona:"orologio", t:"dopo **30 giorni** senza risposta"},
    {icona:"divieto", t:"la richiesta si intende **respinta**", key:true}],
  etichette:{alto:{t:"30 giorni", key:true}}},
{id:"s36", tipo:"illustrata", tema:"chiaro", ill:"bivio", sopratitolo:"Contro il diniego o il differimento",
  titolo:"Due **strade**", punti:[
    {icona:"giudice", t:"il **TAR**, con il codice del processo amministrativo"},
    {icona:"chat", t:"oppure un **riesame**", key:true}],
  etichette:{sx:"TAR", dx:{t:"Riesame", key:true}}},
{id:"s37", tipo:"confronto", tema:"chiaro", sopratitolo:"Chi fa il riesame", col:[
  {h:"Difensore civico", t:"atti di **comuni**, **province** e **regioni**"},
  {h:"Commissione per l'accesso", t:"atti delle amministrazioni dello **Stato**"}]},
{id:"s38", tipo:"flusso", tema:"chiaro", sopratitolo:"Come si svolge", passi:[
  {icona:"chat", t:"Riesame", d:"si pronuncia in 30 giorni"},
  {icona:"avviso", t:"Diniego illegittimo", d:"comunicato alla PA"},
  {icona:"documento", t:"La PA", d:"30 giorni per confermare, motivando", key:true}]},
{id:"s39", tipo:"confronto", tema:"chiaro", sopratitolo:"E poi", col:[
  {h:"Se la PA non conferma", t:"l'accesso è **consentito**", key:true},
  {h:"Il ricorso al giudice", t:"decorre dall'**esito** del riesame"}]},
{id:"s40", tipo:"confronto", tema:"chiaro", sopratitolo:"Un ultimo confronto", col:[
  {h:"Accesso documentale · L. 241", t:"**interessati**, richiesta **motivata**"},
  {h:"Accesso civico · D.Lgs. 33/2013", t:"**chiunque**, senza motivare, altri limiti", key:true}]},
{id:"s41", tipo:"trappola", tema:"tenue", sopratitolo:"Attenzione a non confonderli", righe:[
  {sb:"Accesso documentale e accesso civico sono la stessa cosa",
   ok:"Il documentale tutela un interesse personale; il civico serve al controllo diffuso"}]},
{id:"s42", tipo:"titolo", tema:"profondo",
  titolo:"Il silenzio vale **no**,<br>ma la porta resta **aperta**."},

// --- 7 · le tre cose
{id:"s43", tipo:"memo", tema:"chiaro", attive:[0], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s44", tipo:"memo", tema:"chiaro", attive:[0,1], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s45", tipo:"memo", tema:"chiaro", attive:[0,1,2], sopratitolo:"Le tre cose che ti chiederanno", voci:TRE_COSE},
{id:"s46", tipo:"trappola", tema:"tenue", sopratitolo:"L'ultimo distrattore", righe:[
  {sb:"L'amministrazione deve creare i documenti richiesti",
   ok:"Si accede a quelli che esistono e che deve ancora conservare"}]},

// --- 8 · chiusura
{id:"s47", tipo:"titolo", tema:"profondo",
  titolo:"Un interesse **vero**,<br>una richiesta **motivata**,<br>rimedi **rapidi**.",
  sotto:"Prossimo modulo: la trasparenza nella pubblica amministrazione."},

{id:"s48", tipo:"copertina", tema:"profondo", modulo:"Prossimo modulo",
  titolo:"Modulo 6", sottotitolo:"Trasparenza nella<br>pubblica amministrazione", ente:ENTE},
];
