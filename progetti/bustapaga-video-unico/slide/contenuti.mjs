// Contenuto delle 218 scene del video unico «Leggere la busta paga».
// *accento*  **accento in semibold**
//
// Senza avatar: ogni scena è una slide, come nel prodotto che il MASTER
// descrive. Le 15 scene mute (copertina, 13 card di capitolo, chiusura) sono
// di tipo "copertina", ed è così che clips.mjs le esclude dall'animazione:
// restano immagini ferme nel montaggio, e le 203 con parlato hanno una clip
// ciascuna, una per mp3.
//
// Registro: il tu diretto del copione, mai paternalistico. Si spiega un
// documento, non si fa la predica a chi non lo capisce - il copione dice
// «sembra scritta apposta per non farsi leggere», e la colpa sta lì, non in
// chi legge.
//
// Il tema `tenue` è quello DEGLI ERRORI (MASTER §5). Non va su un contenuto
// solo perché è un avvertimento: s023 dice esplicitamente «non è un
// errore», e infatti resta chiaro.

const ENTE = "CISL FP Padova Rovigo";

// Le tre zone del cedolino: è il visual portante del video, e torna più
// volte. Rivelazioni progressive della STESSA figura: per il MASTER contano
// come una figura sola, non come tre.
const ZONE = [
 {n:"1", t:"Intestazione", d:"chi sei e qual è il tuo rapporto di lavoro"},
 {n:"2", t:"Corpo",        d:"l'elenco delle voci, una per riga"},
 {n:"3", t:"Piede",        d:"i totali, fino al netto a pagare"},
];

const CAPITOLI = [
 {n:"1",  t:"Com'è fatta la busta paga"}, {n:"2",  t:"Le colonne e i segni"},
 {n:"3",  t:"Lo stipendio fisso"},         {n:"4",  t:"Il salario accessorio"},
 {n:"5",  t:"Contributi e pensione"},      {n:"6",  t:"Le tasse in busta paga"},
 {n:"7",  t:"Trattenute e totali"},        {n:"8",  t:"I mesi speciali"},
 {n:"9",  t:"Dieci controlli"},            {n:"10", t:"Assenze e busta paga"},
 {n:"11", t:"Leggiamo un cedolino"},       {n:"12", t:"Lo stipendio in un anno"},
 {n:"13", t:"Le domande dello sportello"},
];

// s160 e s217 pronunciano la STESSA frase — «i nostri recapiti e gli orari di
// sportello qui a schermo» — quindi le due slide devono portare gli stessi dati.
// Stanno qui una volta sola: quando arrivano i recapiti veri si cambia un punto
// e non due, e le due slide non possono divergere.
// I recapiti veri non li ho: sono segnaposto dichiarati, come il rettangolo
// grigio del marchio. Vedi slide/marchio/LEGGIMI.md.
const RECAPITI = [
 {icona:"persone",  t:"Padova", d:"Via del Carmine 3<br>049 822 0630"},
 {icona:"persone",  t:"Rovigo", d:"Viale Tre Martiri 87/a<br>0425 399 239"},
 {icona:"orologio", t:"Orari",  d:"9–13 · 13–17"},
 {icona:"chat",     t:"Scrivici", d:"fp.padova.rovigo@cisl.it"},
];

const COSA_VEDREMO_ICONE = [
 {icona:"euro",       t:"Fisso e accessorio", d:"lo stipendio tabellare, i turni, le notti, i festivi"},
 {icona:"scudo",      t:"Contributi", d:"quelli che costruiscono la pensione"},
 {icona:"documento",  t:"Tasse e trattenute", d:"IRPEF, addizionali, e tutto il resto"},
 {icona:"orologio",   t:"I mesi speciali", d:"dicembre, gli arretrati, il 730"},
];

const DEVE_INDICARE = [
 {icona:"persona",    t:"**Chi sei**"},
 {icona:"cartella",   t:"**Che lavoro fai**"},
 {icona:"euro",       t:"Cosa ti viene **pagato**"},
 {icona:"documento",  t:"Cosa ti viene **trattenuto**"},
];

// Le cinque aree del nuovo ordinamento, in ordine. Piramide e non scala: con
// cinque strati e etichette lunghe la scala stringe il testo dentro i gradini,
// mentre la piramide le mette a destra, dove c'e' larghezza.
const AREE = [
 {t:"Personale di supporto"},
 {t:"Operatori", d:"per esempio gli OSS"},
 {t:"Assistenti", d:"amministrativi, tecnici diplomati"},
 {t:"Professionisti della salute e funzionari", d:"infermieri, tecnici laureati", key:true},
 {t:"Elevata qualificazione"},
];

const CONTROLLI_INTESTAZIONE = [
 {t:"Il **mese di liquidazione**", d:"è il mese in cui vieni pagato, non quello in cui hai lavorato"},
 {t:"**Area e profilo**", d:"la riga che conta di più: se è vecchia, lo stipendio è vecchio"},
 {t:"**Tipo di rapporto** e percentuale di part time"},
 {t:"Le **coordinate bancarie**"},
];

const INCARICHI = [
 {icona:"persona",     t:"Di base", d:"per tutti"},
 {icona:"ingranaggio", t:"Di funzione"},
 {icona:"persone",     t:"Di organizzazione"},
 {icona:"certificato", t:"Professionale"},
];


export const SCENE = [

// ============================ apertura ============================
{id:"s001", tipo:"copertina", tema:"chiaro",
  modulo:"Sanità pubblica · Azienda Ospedale Università",
  titolo:"Leggere<br>la busta paga", sottotitolo:"Un'ora per non firmare più al buio",
  ente:ENTE},

{id:"s002", tipo:"frase", tema:"chiaro", sopratitolo:"Ogni mese arriva",
  testo:"La apri, guardi l'**ultima riga**, e la chiudi.",
  sotto:"Ti capisco: sembra scritta apposta per non farsi leggere. Codici, asterischi, sigle, colonne."},
{id:"s003", tipo:"tre", tema:"chiaro", sopratitolo:"Qualunque cedolino è diviso in tre zone",
  box:ZONE},
{id:"s004", tipo:"icone", tema:"chiaro",
  sopratitolo:"Che cosa vedremo", voci:COSA_VEDREMO_ICONE},
{id:"s005", tipo:"frase", tema:"chiaro", sopratitolo:"Non serve essere esperti di contabilità",
  testo:"Serve sapere **dove guardare**.",
  sotto:"Turni, notti, festivi: sono proprio queste le voci che si sbagliano più spesso — e quelle che nessuno controlla."},
{id:"s006", tipo:"numero", tema:"chiaro", sopratitolo:"Conserva le tue buste paga. Tutte.",
  cifra:"5", testo:"anni di tempo, in generale,<br>per chiedere somme **non pagate**"},
{id:"s007", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Tredici capitoli — salta a quello che ti serve", celle:CAPITOLI},
{id:"s008", tipo:"titolo", tema:"profondo",
  titolo:"Se qualcosa non ti torna,<br>**non restare con il dubbio**.",
  sotto:"Porta la tua busta paga alla CISL FP di Padova e Rovigo: la guardiamo insieme, voce per voce."},

// ======================= 1 · Com'è fatta =========================
{id:"s009", tipo:"copertina", tema:"profondo", modulo:"Capitolo 1",
  titolo:"Com'è fatta<br>la busta paga", sottotitolo:"", ente:ENTE},

{id:"s010", tipo:"icone", tema:"chiaro",
  sopratitolo:"Per legge il cedolino deve indicare", voci:DEVE_INDICARE},
{id:"s011", tipo:"tre", tema:"chiaro", sopratitolo:"Leggere bene vuol dire passare da una zona all'altra, nell'ordine",
  box:ZONE, attive:[0]},
{id:"s012", tipo:"elenco", tema:"chiaro", sopratitolo:"In cima all'intestazione", voci:[
  {t:"**Mese di liquidazione**", d:"attenzione: è il mese in cui vieni pagato, non sempre quello in cui hai lavorato"},
  {t:"**Matricola**", d:"il tuo numero identificativo in Azienda"},
  {t:"**Codice fiscale**"}]},
{id:"s013", tipo:"tre", tema:"chiaro", sopratitolo:"Subito dopo, tre date", box:[
  {t:"Nascita"},
  {t:"Assunzione", d:"da qui dipendono anzianità e differenziali", key:true},
  {t:"Cessazione", d:"eventuale"}]},
{id:"s014", tipo:"piramide", tema:"chiaro",
  sopratitolo:"La riga più importante: la posizione funzionale", strati:AREE},
{id:"s015", tipo:"frase", tema:"tenue", sopratitolo:"L'errore che si ripete ogni mese",
  testo:"Se l'intestazione resta **quella vecchia**, è molto probabile che anche lo **stipendio** sia rimasto quello vecchio.",
  sotto:"Controllala sempre dopo una progressione, un cambio di profilo o di incarico."},
{id:"s016", tipo:"confronto", tema:"chiaro", sopratitolo:"Tipo di rapporto di lavoro", col:[
  {h:"Normale", t:"vuol dire **tempo pieno**", grande:true},
  {h:"Part time", t:"deve comparire la **percentuale corretta**", grande:true}],
  sotto:"Lo stipendio fisso viene riproporzionato proprio su quella percentuale. Un errore qui si trascina su tutte le voci."},
{id:"s017", tipo:"frase", tema:"chiaro", sopratitolo:"Sede di lavoro e modalità di pagamento",
  testo:"Se hai cambiato **conto corrente**, è qui che verifichi che la comunicazione sia arrivata.",
  sotto:"Sembra un dettaglio. Non lo è."},
{id:"s018", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"I controlli dell'intestazione — quattro righe, trenta secondi",
  voci:CONTROLLI_INTESTAZIONE},
{id:"s019", tipo:"sostituzione", tema:"tenue", sopratitolo:"Un caso che vediamo spesso allo sportello",
  da:{h:"La busta dice ancora", t:"area degli **operatori**"},
  a:{h:"Ma la collega è passata a", t:"area degli **assistenti**"},
  sotto:"Tabellare vecchio, indennità vecchia. Tutto il resto sembra normale: l'errore si vede solo leggendo la **seconda riga**."},
{id:"s020", tipo:"confronto", tema:"chiaro", sopratitolo:"Part time", col:[
  {h:"Chi ci passa", t:"deve vedere la **percentuale** in intestazione, e le voci fisse scendono in proporzione"},
  {h:"Chi torna a tempo pieno", t:"deve rivedere la dicitura **normale**"}],
  sotto:"Un ritardo di un mese in questa riga vale, in genere, **alcune centinaia di euro**."},
// La barra piena arrivava al bordo e il valore finiva FUORI dalla slide: con
// max=100 la prima barra occupa tutta la larghezza utile e il testo non ha piu'
// dove stare. Senza `max` la libreria lascia l'8% di aria, e con l'etichetta
// piu' stretta e l'unita' corta il valore ci sta. Le note lunghe sono scese
// nel sottotitolo: a destra della barra non c'e' larghezza per una frase.
{id:"s021", tipo:"barre", tema:"chiaro",
  sopratitolo:"Come funziona il riproporzionamento — le voci fisse scendono in proporzione",
  unita:"%", unita1:"%", etichetta:360, barre:[
  {et:"Tempo pieno", v:100},
  {et:"Part time 83%", v:83, nota:"i 30 ore"},
  {et:"Part time 50%", v:50, nota:"la metà"}]},
{id:"s022", tipo:"frase", tema:"chiaro", sopratitolo:"La data di assunzione ha un altro effetto",
  testo:"Nel **primo triennio** di servizio le ferie sono meno che dopo.",
  sotto:"L'ipotesi di rinnovo equipara i neoassunti a chi ha più di tre anni."},
{id:"s023", tipo:"frase", tema:"chiaro", sopratitolo:"Chi lavora in più sedi",
  testo:"La sede indicata è quella **amministrativa**: non sempre è il reparto in cui timbri.",
  sotto:"Non è un errore. Ma se ti spostano in una **sede disagiata**, verifica che partano le indennità collegate."},
{id:"s024", tipo:"icone", tema:"chiaro", sopratitolo:"Ogni dipendente ha un incarico", voci:INCARICHI},
{id:"s025", tipo:"titolo", tema:"profondo",
  titolo:"Qualcosa non corrisponde?<br>**Passa da noi con il cedolino.**",
  sotto:"Verifichiamo insieme e, se serve, prepariamo la richiesta di correzione."},

// ==================== 2 · Le colonne e i segni ====================
{id:"s026", tipo:"copertina", tema:"profondo", modulo:"Capitolo 2",
  titolo:"Le colonne<br>e i segni", sottotitolo:"", ente:ENTE},

{id:"s027", tipo:"frase", tema:"chiaro", sopratitolo:"Il corpo del cedolino",
  testo:"È una **tabella**. Ogni riga è una voce, ogni colonna dice qualcosa di quella somma.",
  sotto:"Una volta capite le colonne, qualsiasi riga diventa leggibile — anche una che non hai mai visto."},
// Il visual portante del capitolo: la riga vera, con le sue colonne. Una
// tabella vera e non un elenco di nomi di colonna, perche' quello che serve
// e' riconoscerla quando la si ha davanti.
{id:"s028", tipo:"tabella", tema:"chiaro", sopratitolo:"Da sinistra a destra",
  colonne:["13%","30%","12%","16%","9%","20%"],
  intestazioni:["Codice","Descrizione","Quantità","Unitario","Segno","Importo"],
  righe:[
   ["0100","Stipendio tabellare","","","+","2.055,71"],
   ["4210","Indenn. turno","19,00","2,07000","+","39,33"],
   ["4230","Servizio notturno","24,00","2,74000","+","65,76"]]},
{id:"s029", tipo:"frase", tema:"chiaro", sopratitolo:"La prova del nove",
  testo:"**Quantità × unitario** deve dare l'**importo**.",
  sotto:"19 giorni di turno × 2,07 € = 39,33 €. Se il conto non torna, c'è qualcosa da chiarire."},
{id:"s030", tipo:"tre", tema:"chiaro", sopratitolo:"Il segno — forse la colonna più importante", box:[
  {n:"+", t:"Competenza", d:"soldi che ti spettano, e che si sommano"},
  {n:"−", t:"Trattenuta", d:"soldi che vengono tolti"},
  {n:"*", t:"Base di calcolo", d:"non sono soldi: non entrano né escono", key:true}]},
{id:"s031", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Le righe con l'asterisco servono a controllare i calcoli", celle:[
  {t:"Imponibile **previdenziale**"},
  {t:"Imponibile **fiscale**"},
  {t:"Le **detrazioni**"},
  {t:"Retribuzione utile per il **TFR**"},
  {t:"Il contributo che l'**Azienda** versa al fondo pensione"},
  {t:"Gli imponibili **eccedenti**"}]},
{id:"s032", tipo:"frase", tema:"chiaro", sopratitolo:"Ultima colonna: scadenza o riferimento",
  testo:"Se il riferimento è **diverso dal mese di liquidazione**, stai ricevendo qualcosa che riguarda un **periodo passato**.",
  sotto:"Indennità dei mesi precedenti, conguagli, arretrati. Oppure, per un prestito, la data di scadenza."},
{id:"s033", tipo:"citazione", tema:"chiaro",
  testo:"Ho fatto le notti ad agosto: perché non le trovo nella busta di agosto?",
  fonte:"Il dubbio più frequente allo sportello"},
{id:"s034", tipo:"frase", tema:"chiaro", sopratitolo:"Nella busta di ottobre",
  testo:"Turno, notte e festivo hanno riferimento **agosto**.",
  sotto:"Quando controlli i turni, confronta la busta con il foglio presenze del **mese indicato nel riferimento** — non con quello del mese corrente."},
// L'ordine delle voci e' una sequenza: la catena e' il tipo giusto, e dice
// dove cercare invece di far imparare i codici a memoria.
{id:"s035", tipo:"catena", tema:"chiaro", sopratitolo:"Le voci non sono messe a caso", passi:[
  {t:"Voci fisse", d:"tabellare, indennità"},
  {t:"Voci variabili", d:"turni, notti, festivi"},
  {t:"Ritenute", d:"contributi, tasse"},
  {t:"Imponibili", d:"le righe con l'asterisco", key:true}]},
{id:"s036", tipo:"titolo", tema:"profondo",
  titolo:"La busta paga si legge<br>sempre **in coppia con le presenze**.",
  sotto:"Tieni a portata di mano il prospetto turni, o il cartellino."},
{id:"s037", tipo:"frase", tema:"chiaro", sopratitolo:"Una prova del nove più difficile",
  testo:"24 ore notturne × 2,74 € = **65,76 €**",
  sotto:"6 pasti in mensa × 1,03 € = 6,20 €. Se ti trovi a fare questi conti, sei già a metà del lavoro di controllo."},
{id:"s038", tipo:"frase", tema:"chiaro", sopratitolo:"Il codice voce non è uguale in tutte le Aziende",
  testo:"La stessa indennità ha un numero **all'Azienda Ospedale Università** e un altro **all'ULSS**.",
  sotto:"Per questo qui impari a riconoscere le **descrizioni** e le **famiglie** di codici, non numeri a memoria."},
{id:"s039", tipo:"tabella", tema:"chiaro", sopratitolo:"Le sigle che ricorrono",
  colonne:["22%","78%"],
  intestazioni:["Sigla","Che cosa vuol dire"],
  righe:[
   ["I.V.C.","Indennità di **vacanza contrattuale**"],
   ["D.E.P.","**Differenziali** economici di professionalità"],
   ["I.Q.P.","La vecchia indennità di qualificazione professionale"],
   ["C.P.D.E.L.","La **cassa pensioni** dei dipendenti degli enti locali"],
   ["F.CREDITO","Il **fondo credito** INPS"],
   ["ADD.","Le **addizionali** regionale e comunale"],
   ["ARR. · CONG. · RIMB.","**Arretrati**, **conguaglio**, **rimborso**"]]},
{id:"s040", tipo:"frase", tema:"chiaro", sopratitolo:"Una trappola di lettura",
  testo:"L'importo unitario ha spesso **cinque decimali**, la quantità **due**.",
  sotto:"Non sono errori di stampa: il sistema paghe lavora così per non perdere centesimi nei mesi. Il totale di riga ha sempre due decimali."},
{id:"s041", tipo:"frase", tema:"chiaro", sopratitolo:"E i valori negativi tra gli asterischi?",
  testo:"Un imponibile col **segno meno** vuol dire che sei **sotto la soglia**.",
  sotto:"Niente soldi che escono: solo un numero che dice come stanno i conti."},
{id:"s042", tipo:"griglia", tema:"chiaro", colonne:3, spunta:false,
  sopratitolo:"Nel fac-simile, i codici della stessa famiglia cominciano uguale", celle:[
  {n:"59", t:"Ritenute **previdenziali**"},
  {n:"60", t:"**Addizionali**"},
  {n:"90·95", t:"**Imponibili**"}]},
{id:"s043", tipo:"tre", tema:"chiaro", sopratitolo:"Sul portale, cerca il testo — tre parole meritano sempre due minuti in più", box:[
  {t:"arretrati"}, {t:"conguaglio"}, {t:"recupero", key:true}]},

// ===================== 3 · Lo stipendio fisso =====================
{id:"s044", tipo:"copertina", tema:"profondo", modulo:"Capitolo 3",
  titolo:"Lo stipendio<br>fisso", sottotitolo:"", ente:ENTE},

{id:"s045", tipo:"frase", tema:"chiaro", sopratitolo:"Le voci fisse",
  testo:"Arrivano ogni mese, **uguali**, finché non cambia il tuo inquadramento o il contratto.",
  sotto:"Sono la base su cui si calcolano tredicesima, contributi e molte indennità. Se una voce fissa è sbagliata, **l'errore si ripete ogni mese**."},
{id:"s046", tipo:"frase", tema:"chiaro", sopratitolo:"La prima voce: lo stipendio tabellare",
  testo:"È la **paga base della tua area**, uguale per tutti quelli che vi sono inquadrati.",
  sotto:"La fissa il contratto nazionale. Nel nostro esempio: un'infermiera dell'area dei professionisti della salute."},
// Una linea del tempo IN SCALA: fra la decorrenza e la firma passano quasi due
// anni, fra una firma e l'altra meno di uno. A passo fisso direbbe il contrario.
{id:"s047", tipo:"assetempo", tema:"chiaro", sopratitolo:"I due contratti che contano",
  da:2024, a:2027, tappe:[
  {anno:2024, et:"decorrenza degli aumenti del CCNL 2022-2024"},
  {anno:2025, et:"firma definitiva, 27 ottobre", key:true},
  {anno:2026, et:"ipotesi di rinnovo 2025-2027, 29 luglio"},
  {anno:2027, et:"nuovi aumenti a regime"}]},
{id:"s048", tipo:"frase", tema:"chiaro", sopratitolo:"Indennità di vacanza contrattuale",
  testo:"Un **anticipo** che la legge riconosce quando il contratto è scaduto e il nuovo non è ancora in vigore.",
  sotto:"Alla firma definitiva viene **assorbita** dagli aumenti. Non la perdi: diventa parte dell'aumento."},
{id:"s049", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Perché gli arretrati sono più bassi del previsto",
  da:{h:"Quello che leggi nelle tabelle", t:"l'aumento **pieno**"},
  a:{h:"Quello che arriva come arretrato", t:"meno la **vacanza contrattuale**"},
  sotto:"Una parte l'hai già ricevuta, mese per mese. Non l'hai persa: era un anticipo."},
{id:"s050", tipo:"frase", tema:"chiaro", sopratitolo:"I differenziali economici di professionalità",
  testo:"Molti li chiamano ancora **fasce**: sono la progressione economica dentro la tua area.",
  sotto:"Si ottengono con procedure selettive periodiche. Ogni differenziale acquisito si somma al tabellare e **resta per sempre**."},
{id:"s051", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Le indennità fisse legate al profilo", celle:[
  {t:"Specificità **infermieristica**", },
  {t:"Tutela del **malato**"},
  {t:"Indennità **professionale specifica**"},
  {t:"Indennità di **funzione**, parte fissa"}]},
{id:"s052", tipo:"barre", tema:"chiaro",
  sopratitolo:"Quanto rivaluta il rinnovo: specificità infermieristica, al mese",
  unita:"euro", etichetta:420, barre:[
  {et:"Oggi", v:88},
  {et:"Dal 2026", v:181, nota:"con il rinnovo a regime"}]},
{id:"s053", tipo:"frase", tema:"chiaro", sopratitolo:"E se hai un incarico",
  testo:"Trovi l'indennità collegata all'**incarico che ricopri**.",
  sotto:"E se lavori in pronto soccorso, c'è un'indennità dedicata."},
{id:"s054", tipo:"frase", tema:"chiaro", sopratitolo:"La tredicesima",
  testo:"Arriva a dicembre ed è pari a **una mensilità delle voci fisse**.",
  sotto:"La riconosci così: le stesse voci fisse ripetute, con quantità 12 e riferimento all'anno. Se hai lavorato parte dell'anno, è proporzionata ai mesi."},
// La composizione del fisso: impila dice che il totale e' fatto di strati, ed
// e' esattamente la domanda «di che cosa e' fatto il mio stipendio».
{id:"s055", tipo:"barre", tema:"chiaro",
  sopratitolo:"Di che cosa è fatta la retribuzione fissa — un esempio, al mese",
  unita:"euro", etichetta:400, barre:[
  {et:"Tabellare", v:2056, nota:"la paga base dell'area"},
  {et:"Differenziali", v:186, nota:"quelli che hai acquisito"},
  {et:"Indennità", v:188, nota:"legate al profilo"}]},
{id:"s056", tipo:"frase", tema:"chiaro", sopratitolo:"Come si passa da un differenziale all'altro",
  testo:"Con **procedure selettive periodiche**, su esperienza e valutazione.",
  sotto:"L'ipotesi di rinnovo riduce a **due anni** la permanenza minima, per favorire anche i più giovani."},
{id:"s057", tipo:"frase", tema:"tenue", sopratitolo:"Un errore classico dopo una selezione",
  testo:"Il nuovo importo parte, ma **senza gli arretrati** dalla decorrenza indicata nell'accordo.",
  sotto:"Oppure parte l'importo del differenziale sbagliato. Prendi l'accordo integrativo, cerca la decorrenza, confrontala con la colonna riferimento."},
{id:"s058", tipo:"numero", tema:"chiaro", sopratitolo:"Quanto vale il rinnovo a regime, per un'infermiera",
  cifra:"220", testo:"euro **lordi** in più al mese,<br>per tredici mensilità"},
{id:"s059", tipo:"frase", tema:"chiaro", sopratitolo:"Ma gli aumenti sono lordi",
  testo:"In tasca arriva circa il **60-65%**, dopo contributi e tasse.",
  sotto:"È il motivo per cui la CISL FP chiede da anni la **detassazione** degli aumenti contrattuali."},
{id:"s060", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Voci fisse particolari — se hai una di queste funzioni, cercale", celle:[
  {t:"Indennità di **pronto soccorso**"},
  {t:"Personale del **118**"},
  {t:"**Servizi disagiati**"},
  {t:"**Coordinamento**, parte fissa e variabile"}]},
{id:"s061", tipo:"tabella", tema:"chiaro", sopratitolo:"Dalle vecchie categorie alle nuove aree",
  colonne:["18%","41%","41%"],
  intestazioni:["Prima","Chi","Oggi"],
  righe:[
   ["D","Infermieri, tecnici laureati","Professionisti della salute e funzionari"],
   ["C","Assistenti amministrativi, tecnici diplomati","Assistenti"],
   ["B S","Operatori socio sanitari","Operatori"]]},
{id:"s062", tipo:"frase", tema:"tenue", sopratitolo:"Il passaggio non ha cambiato gli importi acquisiti",
  testo:"Se dopo il passaggio hai visto **sparire una fascia**, è un errore da correggere con gli arretrati.",
  sotto:"Le vecchie fasce sono diventate differenziali con lo stesso valore."},

// =================== 4 · Il salario accessorio ====================
{id:"s063", tipo:"copertina", tema:"profondo", modulo:"Capitolo 4",
  titolo:"Il salario<br>accessorio", sottotitolo:"", ente:ENTE},

{id:"s064", tipo:"frase", tema:"chiaro", sopratitolo:"La parte viva della busta",
  testo:"Racconta **come hai lavorato**: turni, notti, festivi, reperibilità, ore in più.",
  sotto:"Sono anche le voci che si sbagliano più spesso, perché dipendono dalle presenze registrate."},
{id:"s065", tipo:"barre", tema:"chiaro",
  sopratitolo:"Come si compone una busta tipo — e per chi fa le 24 ore lo strato variabile pesa molto di più",
  unita:"euro", etichetta:400, barre:[
  {et:"Base fissa", v:2430, nota:"uguale ogni mese"},
  {et:"Strato variabile", v:141, nota:"cambia con i turni"}]},
{id:"s066", tipo:"icone", tema:"chiaro", sopratitolo:"Le principali voci accessorie", voci:[
  {icona:"orologio", t:"Turno", d:"chi copre le 24 ore — di solito a giornata"},
  {icona:"goccia",   t:"Notturna", d:"a ora, per le ore lavorate di notte"},
  {icona:"cappello", t:"Festiva", d:"per i turni in giorno festivo"},
  {icona:"chat",     t:"Pronta disponibilità", d:"per ogni turno di reperibilità"}]},
{id:"s067", tipo:"catena", tema:"chiaro", sopratitolo:"Il controllo è sempre lo stesso", passi:[
  {t:"Prendi i turni", d:"del mese di riferimento"},
  {t:"Conta", d:"giorni oppure ore"},
  {t:"Confronta", d:"con la colonna quantità"},
  {t:"Prova del nove", d:"quantità × unitario = importo", key:true}]},
{id:"s068", tipo:"barre", tema:"chiaro", sopratitolo:"Lo straordinario: le maggiorazioni sull'oraria",
  unita:"%", etichetta:420, barre:[
  {et:"Diurno", v:15},
  {et:"Notturno o festivo", v:30},
  {et:"Notturno e festivo", v:50, nota:"insieme"}]},
{id:"s069", tipo:"frase", tema:"chiaro", sopratitolo:"Una regola che molti non conoscono",
  testo:"In malattia, **nei primi dieci giorni di ogni episodio**, si perdono le voci accessorie.",
  sotto:"È una norma di legge, non un errore dell'ufficio paghe. Ma ci sono esclusioni: ricoveri, terapie salvavita, infortunio, gravidanza a rischio."},
{id:"s070", tipo:"tre", tema:"chiaro", sopratitolo:"Nel nostro esempio, busta di ottobre — tutti con riferimento agosto", box:[
  {n:"19", t:"giorni di turno"},
  {n:"24", t:"ore notturne"},
  {n:"2",  t:"festivi", key:true}]},
{id:"s071", tipo:"frase", tema:"chiaro", sopratitolo:"La produttività",
  testo:"Non arriva ogni mese: dipende dal **fondo aziendale**, dagli obiettivi e dalla valutazione.",
  sotto:"Quanto vale e come si distribuisce lo decide la **contrattazione integrativa**, dove RSU e sindacati trattano con l'Azienda."},
{id:"s072", tipo:"titolo", tema:"profondo",
  titolo:"Con il rinnovo, le indennità<br>**anche durante le ferie**.",
  sotto:"Un risultato ottenuto anche grazie alle cause patrocinate dalla CISL FP. Operativo con la firma definitiva."},
{id:"s073", tipo:"confronto", tema:"chiaro", sopratitolo:"La pronta disponibilità: due voci diverse", col:[
  {h:"L'indennità", t:"per il turno di reperibilità **in sé**, con un importo per 12 ore"},
  {h:"Le ore di chiamata", t:"se vieni chiamato: pagate come **straordinario**, o recuperate"}]},
{id:"s074", tipo:"frase", tema:"chiaro", sopratitolo:"C'è un limite contrattuale ai turni di reperibilità",
  testo:"Più reperibilità del previsto non è solo una questione di soldi: è **organizzazione del lavoro**.",
  sotto:"Passa dal tavolo con l'Azienda. Segnalacelo."},
{id:"s075", tipo:"frase", tema:"chiaro", sopratitolo:"Lo straordinario e l'autorizzazione",
  testo:"Se le ore risultano dal **cartellino** e sono state necessarie per il servizio, la pretesa di non pagarle **si può contestare**.",
  sotto:"Conserva le timbrature."},
{id:"s076", tipo:"barre", tema:"chiaro",
  sopratitolo:"Quanto vale un'ora, con i valori del rinnovo a regime",
  unita:"euro", etichetta:460, barre:[
  {et:"Retribuzione oraria", v:15.32},
  {et:"Straordinario diurno", v:17.62},
  {et:"Notturno o festivo", v:19.92},
  {et:"Notturno e festivo", v:22.99, nota:"insieme"}]},
{id:"s077", tipo:"frase", tema:"chiaro", sopratitolo:"Le prestazioni aggiuntive sono un'altra cosa",
  testo:"Ore oltre l'orario, **volontarie**, a tariffa fissata dall'accordo — e tassate al **15%**.",
  sotto:"Servono ad abbattere liste d'attesa o coprire carenze. In busta hanno una voce dedicata: verifica sempre tariffa e ore."},
{id:"s078", tipo:"numero", tema:"chiaro", sopratitolo:"Il rinnovo sul fondo della produttività",
  cifra:"221", testo:"euro pro capite in più, **in media**"},
{id:"s079", tipo:"frase", tema:"tenue", sopratitolo:"Le indennità più dimenticate",
  testo:"Il **sabato** e le **notti prefestive**.",
  sotto:"Il sistema conta il festivo dal turno di mattina, non dalla notte che lo precede. Se fai la notte del sabato, verifica come viene contata."},
{id:"s080", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"Tre strumenti per controllare l'accessorio", voci:[
  {t:"Il **prospetto turni** del mese di riferimento"},
  {t:"La **prova del nove**: quantità × unitario"},
  {t:"Le regole di **malattia e ferie** che le fanno sparire"}]},
{id:"s081", tipo:"titolo", tema:"profondo",
  titolo:"È qui che si nascondono<br>**più soldi non pagati**.",
  sotto:"Una notte non registrata, un festivo dimenticato, una reperibilità persa. Tieni il tuo conteggio — e se non torna, vieni con busta e turni."},

// =================== 5 · Contributi e pensione ====================
{id:"s082", tipo:"copertina", tema:"profondo", modulo:"Capitolo 5",
  titolo:"Contributi<br>e pensione", sottotitolo:"", ente:ENTE},

{id:"s083", tipo:"titolo", tema:"profondo",
  titolo:"I contributi<br>**non sono soldi persi**.",
  sotto:"Costruiscono la tua pensione e la tua liquidazione. Per questo vale la pena capire come funzionano."},
{id:"s084", tipo:"numero", tema:"chiaro", sopratitolo:"Cassa pensioni — in busta la trovi come CPDEL",
  cifra:"8,85%", testo:"la ritenuta **a tuo carico**,<br>su due righe: voci fisse e accessorie"},
{id:"s085", tipo:"frase", tema:"chiaro", sopratitolo:"Il contributo aggiuntivo dell'1%",
  testo:"Si applica **solo** sulla parte che supera una **soglia annua** fissata dalla legge.",
  sotto:"A volte viene trattenuto in un mese ricco, come dicembre, e poi restituito se a fine anno la soglia non è stata superata. Se vedi un rimborso, ecco il motivo."},
{id:"s086", tipo:"frase", tema:"chiaro", sopratitolo:"Lo 0,35% per il fondo credito",
  testo:"Ti dà accesso ai **prestiti agevolati** dell'INPS e alle prestazioni sociali.",
  sotto:"Borse di studio, soggiorni per i figli. Lo paghi ogni mese: vale la pena usarlo."},
{id:"s087", tipo:"confronto", tema:"chiaro", sopratitolo:"La liquidazione dipende da quando sei stato assunto", col:[
  {h:"Prima del 2001", t:"Trattamento di fine servizio", grande:true},
  {h:"Dal 2001 in poi", t:"Trattamento di fine rapporto", grande:true}],
  sotto:"Con il TFR trovi la voce *diminuzione retribuzione utile*: non è una perdita, è un meccanismo contabile che lascia **invariato il netto**."},
{id:"s088", tipo:"frase", tema:"chiaro", sopratitolo:"La previdenza complementare",
  testo:"Nel pubblico impiego il fondo si chiama **Perseo Sirio**.",
  sotto:"Se aderisci versi una percentuale che scegli tu, e l'Azienda **aggiunge un suo contributo**. È una seconda pensione."},
{id:"s089", tipo:"confronto", tema:"chiaro", sopratitolo:"In busta lo riconosci da due righe", col:[
  {h:"Col segno −", t:"il contributo del **dipendente**: lo paghi tu"},
  {h:"Con l'asterisco", t:"il contributo del **datore**: non entra in busta, va nel fondo **a tuo nome**"}],
  sotto:"In più, i contributi al fondo **riducono l'imponibile** su cui paghi le tasse."},
{id:"s090", tipo:"frase", tema:"chiaro", sopratitolo:"Per i neoassunti c'è il silenzio assenso",
  testo:"Se non ricordi di aver scelto, **controlla la busta**: se trovi il contributo al fondo, sei iscritto.",
  sotto:"È una scelta importante, e merita di essere fatta con consapevolezza."},
{id:"s091", tipo:"frase", tema:"chiaro", sopratitolo:"Lo sgravio contributivo degli anni scorsi",
  testo:"Dal 2025 è stato sostituito da **misure fiscali**.",
  sotto:"Non lo vedi più tra i contributi, ma tra le voci delle tasse. Ne parliamo nel prossimo capitolo."},
{id:"s092", tipo:"tabella", tema:"chiaro", sopratitolo:"Un esempio sul fac-simile",
  colonne:["46%","27%","27%"],
  intestazioni:["Su che cosa","Imponibile","Ritenuta 8,85%"],
  righe:[
   ["Tabellare e voci fisse","2.430 €","215 €"],
   ["Voci accessorie","141 €","12,50 €"]],
  chiave:[]},
{id:"s093", tipo:"frase", tema:"chiaro", sopratitolo:"L'imponibile previdenziale",
  testo:"Più alto del netto, più basso del lordo.",
  sotto:"Comprende quasi tutto quello che ti viene pagato, ma non i rimborsi e non alcune voci esenti. È il numero che alimenta il tuo **estratto conto contributivo**."},
{id:"s094", tipo:"frase", tema:"chiaro", sopratitolo:"Controlla l'estratto conto almeno una volta l'anno",
  testo:"Se un mese di contributi **manca**, la pensione futura ne risente.",
  sotto:"Con la busta in mano il confronto è immediato: l'imponibile con l'asterisco deve corrispondere a quello dichiarato all'INPS. Si consulta col **SPID**."},
{id:"s095", tipo:"confronto", tema:"chiaro", sopratitolo:"Previdenza complementare: due numeri per decidere", col:[
  {h:"La tua quota", t:"puoi versare **di più** del minimo, e quello che versi esce dall'imponibile"},
  {h:"La quota dell'Azienda", t:"la fissa l'accordo istitutivo — e **senza aderire non la ricevi**"}],
  sotto:"Alla pensione hai rendita o capitale, a seconda del comparto scelto."},
{id:"s096", tipo:"frase", tema:"chiaro", sopratitolo:"Chi ha il trattamento di fine servizio",
  testo:"I **tempi di pagamento** dopo la pensione possono essere lunghi.",
  sotto:"Ci sono strumenti che pochi conoscono, come l'anticipo bancario convenzionato. Ne parliamo volentieri in sede."},
{id:"s097", tipo:"numero", tema:"chiaro", sopratitolo:"Tutto quello che esce dal lordo per la previdenza",
  cifra:"10-12%", testo:"del lordo, per chi è **iscritto al fondo**"},

// ================== 6 · Le tasse in busta paga ====================
{id:"s098", tipo:"copertina", tema:"profondo", modulo:"Capitolo 6",
  titolo:"Le tasse<br>in busta paga", sottotitolo:"", ente:ENTE},

{id:"s099", tipo:"frase", tema:"chiaro", sopratitolo:"L'ufficio paghe fa da sostituto d'imposta",
  testo:"Calcola ogni mese l'**IRPEF** che dovresti pagare e la versa allo Stato **al posto tuo**.",
  sotto:"Capire questo calcolo spiega perché il netto cambia anche quando il lordo è lo stesso."},
{id:"s100", tipo:"frase", tema:"chiaro", sopratitolo:"Si parte dall'imponibile fiscale",
  testo:"È il **lordo meno i contributi** previdenziali e quelli al fondo pensione.",
  sotto:"Su quelli, infatti, non si pagano tasse. Lo trovi tra le voci con l'asterisco."},
{id:"s101", tipo:"tabella", tema:"chiaro", sopratitolo:"Le aliquote IRPEF dal 2026 — ognuna solo sulla sua fetta",
  colonne:["58%","42%"],
  intestazioni:["Fetta di reddito","Aliquota"],
  righe:[
   ["Fino a 28.000 €","23%"],
   ["Da 28.000 a 50.000 €","33%"],
   ["Oltre 50.000 €","43%"]]},
{id:"s102", tipo:"confronto", tema:"chiaro", sopratitolo:"Due aliquote diverse, e le trovi nei progressivi", col:[
  {h:"Marginale", t:"quella della **fetta più alta** del tuo reddito"},
  {h:"Media", t:"quella che **paghi davvero**, in proporzione, su tutto"}],
  sotto:"Guadagnare qualche euro in più **non ti fa mai perdere netto** per colpa degli scaglioni."},
{id:"s103", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Dall'imposta lorda si tolgono le detrazioni", celle:[
  {t:"Per **lavoro dipendente**", },
  {t:"Per il **coniuge** a carico"},
  {t:"Per i **figli** dai 21 ai 30 anni non compiuti"},
  {t:"Per **altri familiari** a carico"}]},
{id:"s104", tipo:"frase", tema:"tenue", sopratitolo:"Le detrazioni per familiari non sono automatiche",
  testo:"Se non le **aggiorni**, a fine anno arriva il conguaglio — e può essere **salato**.",
  sotto:"Un figlio che inizia a lavorare, un coniuge che supera il limite di reddito: vanno comunicati con un modulo all'ufficio personale."},
{id:"s105", tipo:"confronto", tema:"chiaro", sopratitolo:"Il taglio del cuneo, dal 2025 fiscale", col:[
  {h:"Fino a 20.000 €", t:"una somma **esente** da tasse, in percentuale sul reddito"},
  {h:"Da 20.000 a 40.000 €", t:"una **detrazione** fino a 1.000 € l'anno"}],
  sotto:"Piena fino a 32.000 €, poi decrescente."},
{id:"s106", tipo:"frase", tema:"chiaro", sopratitolo:"L'IRPEF netta che trovi in busta",
  testo:"È il risultato di tutto il calcolo, **rifatto ogni mese** su quanto hai guadagnato finora.",
  sotto:"Per questo, a fine anno, serve un **conguaglio** che rimette a posto i conti."},
{id:"s107", tipo:"frase", tema:"chiaro", sopratitolo:"Le addizionali, regionale e comunale",
  testo:"Si calcolano sul reddito dell'**anno precedente** e si trattengono a rate in quello **successivo**.",
  sotto:"Per la comunale c'è anche un acconto sull'anno in corso. Ecco perché a inizio anno trovi nuove trattenute anche se lo stipendio non è cambiato."},
{id:"s108", tipo:"titolo", tema:"profondo",
  titolo:"Dal 2026 il salario accessorio<br>è tassato al **15%**.",
  sotto:"Fino a 800 € l'anno, per i pubblici non dirigenti con reddito fino a 50.000 €. Si applica in automatico, salvo rinuncia scritta."},
{id:"s109", tipo:"tabella", tema:"chiaro", sopratitolo:"Il conto completo su 32.000 € imponibili",
  colonne:["46%","27%","27%"],
  intestazioni:["Fetta","Aliquota","Imposta"],
  righe:[
   ["Primi 28.000 €","23%","6.440 €"],
   ["Restanti 4.000 €","33%","1.320 €"],
   ["si:Imposta lorda","","7.760 €"]],
  chiave:[2]},
{id:"s110", tipo:"frase", tema:"chiaro", sopratitolo:"Poi si tolgono le detrazioni",
  testo:"Lavoro dipendente circa **1.900 €**, più **1.000 €** pieni di detrazione del cuneo.",
  sotto:"Siamo esattamente al limite dei 32.000 €. L'imposta netta scende **sotto i 5.000 €**."},
{id:"s111", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Perché due colleghi con lo stesso profilo hanno IRPEF diverse", celle:[
  {t:"**Accessorio** diverso: notti e festivi"},
  {t:"**Familiari a carico** diversi"},
  {t:"**Aliquota marginale** diversa"},
  {t:"Una **seconda entrata** in famiglia"}]},
{id:"s112", tipo:"frase", tema:"chiaro", sopratitolo:"Veneto e Comuni hanno aliquote diverse",
  testo:"La regionale è **progressiva per scaglioni**, la comunale la decide ogni Comune.",
  sotto:"Chi cambia residenza deve comunicarlo: l'addizionale comunale segue il Comune di residenza **al primo gennaio**."},
{id:"s113", tipo:"frase", tema:"tenue", sopratitolo:"Un errore che costa caro",
  testo:"Non comunicare che il **coniuge ha iniziato a lavorare**, o che un figlio ha superato il limite.",
  sotto:"Le detrazioni continuano ad essere applicate ogni mese, e a dicembre — o nel 730 — arriva un debito di **centinaia di euro**."},
{id:"s114", tipo:"barre", tema:"chiaro", sopratitolo:"Il bonus in busta, per chi ha redditi bassi",
  unita:"%", etichetta:420, barre:[
  {et:"Fino a 8.500 €", v:7.1},
  {et:"Fino a 15.000 €", v:5.3},
  {et:"Fino a 20.000 €", v:4.8}]},
{id:"s115", tipo:"numero", tema:"chiaro", sopratitolo:"1.000 € versati a Perseo Sirio, secondo scaglione",
  cifra:"330", testo:"euro di **IRPEF in meno**,<br>più le addizionali"},
{id:"s116", tipo:"frase", tema:"chiaro", sopratitolo:"Ultimo punto: il 730",
  testo:"Spese mediche, mutuo, figli, ristrutturazioni **non passano dalla busta paga**.",
  sotto:"Si recuperano con la dichiarazione. Il CAF CISL la fa per gli iscritti, e l'esito arriva in busta d'estate."},

// =================== 7 · Trattenute e totali ======================
{id:"s117", tipo:"copertina", tema:"profondo", modulo:"Capitolo 7",
  titolo:"Trattenute<br>e totali", sottotitolo:"", ente:ENTE},

{id:"s118", tipo:"frase", tema:"chiaro", sopratitolo:"Le trattenute varie",
  testo:"Non dipendono dalla legge in generale, ma **da te**: dalle tue scelte o dalla tua situazione.",
  sotto:"E poi c'è il piede della busta, dove tutti i numeri si incontrano."},
{id:"s119", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Le più comuni", celle:[
  {t:"Il **contributo sindacale**, se sei iscritto"},
  {t:"La **mensa**, con quantità e unitario"},
  {t:"Le rate di una **cessione del quinto**"},
  {t:"Eventuali **pignoramenti**"},
  {t:"Le **assenze non retribuite**"},
  {t:"Le voci di **recupero**"}]},
{id:"s120", tipo:"frase", tema:"chiaro", sopratitolo:"Cessione e delegazione",
  testo:"Alla scadenza, controlla che la trattenuta **sparisca davvero**.",
  sotto:"La colonna riferimento indica spesso la scadenza del prestito. Capita che continui un mese di troppo."},
{id:"s121", tipo:"frase", tema:"tenue", sopratitolo:"Attenzione alle voci di recupero",
  testo:"Un recupero che compare **all'improvviso**, senza spiegazioni, va sempre verificato.",
  sotto:"L'Azienda può recuperare una somma non dovuta, ma deve spiegarti il calcolo — e puoi chiedere di restituirla **a rate**."},
{id:"s122", tipo:"titolo", tema:"profondo",
  titolo:"Il piede si verifica<br>con **una sottrazione**.",
  sotto:"Qui la busta paga fa i conti finali, e c'è un modo semplice per controllarli."},
// La catena e' il tipo giusto: e' una sequenza di operazioni, e l'ordine conta.
{id:"s123", tipo:"catena", tema:"chiaro", sopratitolo:"Dal lordo al netto a pagare", passi:[
  {t:"Competenze lorde", d:"tutte le voci col +"},
  {t:"− Contributi e tasse"},
  {t:"− Ritenute varie"},
  {t:"= Netto"},
  {t:"± Arrotondamento", d:"e arrivi al netto a pagare", key:true}]},
{id:"s124", tipo:"frase", tema:"chiaro", sopratitolo:"L'arrotondamento",
  testo:"Porta la cifra **all'euro intero**.",
  sotto:"I centesimi tolti questo mese li ritrovi il mese dopo, nella voce *arrotondamento mese precedente*."},
{id:"s125", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Sotto i totali, i progressivi — le somme dall'inizio dell'anno", celle:[
  {t:"**Imponibile**"}, {t:"**Ritenute**"},
  {t:"**Detrazioni** applicate"}, {t:"**Aliquota media**"}]},
{id:"s126", tipo:"frase", tema:"chiaro", sopratitolo:"Un consiglio pratico",
  testo:"Segna ogni mese il **netto a pagare**, insieme ai turni fatti.",
  sotto:"Dopo qualche mese ti accorgi a colpo d'occhio di qualsiasi variazione strana."},
{id:"s127", tipo:"frase", tema:"chiaro", sopratitolo:"Il contributo sindacale",
  testo:"Lo scegli tu, con la **delega**. Nel fac-simile è poco più di **19 € al mese**.",
  sotto:"Circa lo 0,90% delle voci fisse. Se ti iscrivi o ti cancelli, il cambiamento arriva dal mese successivo alla comunicazione."},
{id:"s128", tipo:"barre", tema:"chiaro", sopratitolo:"Quanto possono trattenerti al massimo, sul netto mensile",
  unita:"%", etichetta:460, barre:[
  {et:"Cessione del quinto", v:20, nota:"un quinto"},
  {et:"+ delegazione", v:40, nota:"secondo quinto"}]},
{id:"s129", tipo:"frase", tema:"chiaro", sopratitolo:"Il pignoramento presso terzi",
  testo:"Funziona in modo simile: **un quinto**, e per gli alimenti può essere di più.",
  sotto:"Compare con una voce dedicata e il riferimento all'atto. Chiedi il conteggio, e verifica che alla fine del debito la trattenuta **cessi**."},
{id:"s130", tipo:"elenco", tema:"chiaro", sopratitolo:"Le assenze non retribuite — la colonna quantità dice quanti giorni sono stati decurtati", voci:[
  {t:"La riduzione per i **primi giorni di malattia**"},
  {t:"L'**aspettativa** non retribuita"},
  {t:"Lo **sciopero**"}]},
{id:"s131", tipo:"frase", tema:"chiaro", sopratitolo:"Un mese con un recupero di 300 €",
  testo:"Le competenze lorde non cambiano, ma le ritenute varie **salgono** e il netto **scende**.",
  sotto:"Se non sai perché, la cifra ti sembra un errore. Se sai leggere il piede, vedi subito dove è finita."},
{id:"s132", tipo:"frase", tema:"tenue", sopratitolo:"Un errore da non fare",
  testo:"Confondere il **netto** con il **netto a pagare**.",
  sotto:"Il netto è il risultato della sottrazione; il netto a pagare è quello arrotondato. Se confronti con l'accredito in banca devi usare il **secondo**."},
{id:"s133", tipo:"titolo", tema:"profondo",
  titolo:"Il fondo credito lo paghi<br>ogni mese. **Usalo.**",
  sotto:"L'INPS offre prestiti a condizioni spesso migliori delle finanziarie che si presentano in reparto. Prima di firmare una cessione, guarda tasso e assicurazione."},

// ===================== 8 · I mesi speciali ========================
{id:"s134", tipo:"copertina", tema:"profondo", modulo:"Capitolo 8",
  titolo:"I mesi<br>speciali", sottotitolo:"", ente:ENTE},

{id:"s135", tipo:"frase", tema:"chiaro", sopratitolo:"Ci sono mesi in cui la busta cambia faccia",
  testo:"Se non lo sai, ti **spaventi** — o ti **illudi**.",
  sotto:"Impariamo a riconoscerli, così ogni sorpresa diventa prevedibile."},
// Il calendario dell'anno e' una sequenza con un ordine: la catena lo dice
// meglio di un elenco, perche' si legge come un percorso.
{id:"s136", tipo:"catena", tema:"chiaro", sopratitolo:"Il calendario dell'anno", passi:[
  {t:"Gennaio", d:"partono le rate delle addizionali"},
  {t:"Estate", d:"l'esito del 730"},
  {t:"Dicembre", d:"tredicesima e conguaglio", key:true},
  {t:"In qualunque mese", d:"arretrati e saldo di produttività"}]},
{id:"s137", tipo:"frase", tema:"chiaro", sopratitolo:"Dicembre: il mese più ricco e più complicato",
  testo:"Il netto **non è il doppio** di un mese normale.",
  sotto:"Sulla tredicesima, di norma, non si applicano detrazioni. E c'è il conguaglio, che ricalcola le tasse dell'intero anno."},
{id:"s138", tipo:"confronto", tema:"chiaro", sopratitolo:"Tra luglio e settembre arriva il 730", col:[
  {h:"Se sei a credito", t:"l'Azienda te lo **rimborsa** in busta", grande:true},
  {h:"Se sei a debito", t:"lo **trattiene** in busta", grande:true}],
  sotto:"Se il debito è alto, puoi chiedere nella dichiarazione di pagarlo a rate."},
{id:"s139", tipo:"frase", tema:"chiaro", sopratitolo:"Gli arretrati contrattuali",
  testo:"Li riconosci dalla colonna **riferimento**, che indica mesi e anni passati.",
  sotto:"E dall'indennità di vacanza contrattuale che viene riassorbita."},
{id:"s140", tipo:"confronto", tema:"chiaro", sopratitolo:"Perché due arretrati simili hanno netti diversi", col:[
  {h:"Di anni precedenti", t:"**tassazione separata**, con un'aliquota media"},
  {h:"Dell'anno in corso", t:"tassati **normalmente**"}]},
{id:"s141", tipo:"numero", tema:"chiaro", sopratitolo:"Le stime CISL FP per il rinnovo 2025-2027",
  cifra:"1.250", testo:"euro lordi di arretrato **in media**,<br>e di più per alcune categorie"},
{id:"s142", tipo:"frase", tema:"chiaro", sopratitolo:"Anche la produttività arriva a saldo",
  testo:"Quel mese il netto **sale**: non abituarti.",
  sotto:"E non spaventarti il mese dopo, quando torna normale."},
{id:"s143", tipo:"titolo", tema:"profondo",
  titolo:"Quando il netto cambia molto,<br>la spiegazione è quasi sempre<br>**in due posti**.",
  sotto:"Le voci con riferimento diverso dal mese, e le trattenute fiscali."},
{id:"s144", tipo:"frase", tema:"chiaro", sopratitolo:"Come si legge il conguaglio di dicembre",
  testo:"Molto accessorio nell'anno → spesso a **debito**. Hai lavorato meno → a **credito**.",
  sotto:"Il sistema somma il reddito dell'anno, calcola l'IRPEF dovuta e la confronta con quella già trattenuta mese per mese."},
{id:"s145", tipo:"frase", tema:"chiaro", sopratitolo:"Se il conguaglio a debito è troppo alto",
  testo:"La legge consente di **rateizzarlo** nei mesi successivi, con un piccolo interesse.",
  sotto:"Lo trovi nelle buste di gennaio e febbraio come *conguaglio anno precedente*."},
{id:"s146", tipo:"confronto", tema:"chiaro", sopratitolo:"Decorrenza e data di assunzione decidono l'importo", col:[
  {h:"Assunto prima della decorrenza", t:"arretrato **pieno**", grande:true},
  {h:"Assunto dopo", t:"arretrato **proporzionato**", grande:true}],
  sotto:"È successo con gli arretrati del 2024, arrivati a fine 2025. Succederà uguale con il nuovo rinnovo."},
{id:"s147", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"Che cosa aspettarsi con la firma definitiva", voci:[
  {t:"Gli **aumenti tabellari** 2025 e 2026", d:"in un'unica busta come arretrato, al netto della vacanza contrattuale"},
  {t:"Le **indennità rivalutate** dal 1° gennaio 2026", d:"con il loro arretrato"},
  {t:"Il **nuovo tabellare** da gennaio 2027"}]},
{id:"s148", tipo:"frase", tema:"tenue", sopratitolo:"Quando arriva la busta degli arretrati",
  testo:"**Non fidarti del totale**: guarda le righe.",
  sotto:"Ogni voce di arretrato ha il suo riferimento e il suo importo. Sommale e confrontale con la tabella della tua area."},
{id:"s149", tipo:"frase", tema:"chiaro", sopratitolo:"Altre due buste che spiazzano",
  testo:"Luglio o agosto, con il **saldo delle ferie non godute** per chi cessa.",
  sotto:"E gennaio, con le detrazioni ricalcolate sul reddito presunto: il netto può cambiare di qualche euro senza che sia successo nulla."},
{id:"s150", tipo:"titolo", tema:"profondo",
  titolo:"Alla firma definitiva<br>**vi avvisiamo noi.**",
  sotto:"Quel mese, tenete la busta e confrontatela con la tabella della vostra area. Se l'arretrato è più basso dell'atteso, o manca quello delle indennità, portatecela."},

// ============ 9 · Dieci controlli in cinque minuti ================
{id:"s151", tipo:"copertina", tema:"profondo", modulo:"Capitolo 9",
  titolo:"Dieci controlli<br>in cinque minuti", sottotitolo:"", ente:ENTE},

{id:"s152", tipo:"frase", tema:"chiaro", sopratitolo:"Adesso trasformiamo tutto in un'abitudine",
  testo:"**Cinque minuti**, con la busta paga da una parte e i tuoi **turni** dall'altra.",
  sotto:"Dieci controlli, sempre gli stessi, da fare ogni mese."},
// I dieci controlli su due slide da cinque: dieci voci su una sola sarebbero
// illeggibili, e l'elenco si stringerebbe da solo fino a non contare piu'.
{id:"s153", tipo:"elenco", tema:"chiaro", numerato:true, sopratitolo:"I primi cinque", voci:[
  {t:"Il **mese di liquidazione**"},
  {t:"**Area**, profilo e percentuale di part time"},
  {t:"Le **voci fisse**", d:"uguali al mese prima, se non è cambiato niente"},
  {t:"**Turno, notte e festivi**", d:"contro i turni del mese di riferimento"},
  {t:"**Straordinari** e reperibilità"}]},
{id:"s154", tipo:"elenco", tema:"chiaro", numerato:true, da:6, sopratitolo:"E gli altri cinque", voci:[
  {t:"Il **segno** di ogni voce nuova"},
  {t:"Le **trattenute varie**", d:"rata per rata"},
  {t:"Le **trattenute fiscali**", d:"soprattutto a inizio anno e a dicembre"},
  {t:"Il **piede**", d:"la sottrazione tra lordo, ritenute e netto"},
  {t:"Il **netto a pagare**", d:"contro l'accredito in banca"}]},
{id:"s155", tipo:"confronto", tema:"chiaro", sopratitolo:"E se trovi qualcosa che non va", col:[
  {h:"Prima regola", t:"**Non buttare niente**: busta, prospetto turni, comunicazioni"},
  {h:"Seconda regola", t:"Annota **voce, codice e mese di riferimento**"}],
  sotto:"Con questi tre elementi qualunque verifica diventa rapida."},
{id:"s156", tipo:"griglia", tema:"tenue", colonne:2, spunta:false,
  sopratitolo:"Gli errori più frequenti nelle buste della sanità", celle:[
  {t:"Notti e festivi **non registrati**"},
  {t:"Indennità che **non partono** dopo un cambio di profilo o reparto"},
  {t:"**Differenziali** non aggiornati"},
  {t:"**Detrazioni** per familiari non comunicate"},
  {t:"**Recuperi** senza spiegazioni"}]},
{id:"s157", tipo:"confronto", tema:"chiaro", sopratitolo:"Due strade", col:[
  {h:"Molti errori", t:"si risolvono con una **richiesta scritta** all'ufficio competente"},
  {h:"Altri", t:"richiedono un **intervento sindacale**: non riguardano solo te"}]},
{id:"s158", tipo:"titolo", tema:"profondo",
  titolo:"Quando lo stesso errore<br>si ripete su tanti colleghi,<br>**diventa una questione collettiva**.",
  sotto:"E le questioni collettive si risolvono ai tavoli, con la contrattazione — e quando serve, per vie legali."},
{id:"s159", tipo:"frase", tema:"chiaro", sopratitolo:"Alla CISL FP facciamo una cosa semplice",
  testo:"Guardiamo le buste paga **una per una**, con chi ce le porta.",
  sotto:"Porta le ultime buste e i tuoi turni: il controllo lo facciamo insieme."},
{id:"s160", tipo:"icone", tema:"chiaro", sopratitolo:"CISL FP Padova Rovigo — recapiti e orari",
  voci:RECAPITI},
{id:"s161", tipo:"elenco", tema:"chiaro", sopratitolo:"Come si scrive una segnalazione all'ufficio stipendi", voci:[
  {t:"Nome e **matricola**"},
  {t:"**Mese** della busta"},
  {t:"**Codice** e descrizione della voce"},
  {t:"Importo **atteso** e importo **trovato**"},
  {t:"In allegato, il **prospetto turni**"},
  {t:"E chiedi una **risposta scritta**"}]},
{id:"s162", tipo:"catena", tema:"chiaro", sopratitolo:"Se l'Azienda non risponde, o risponde di no senza motivare", passi:[
  {t:"Richiesta formale", d:"tramite il sindacato"},
  {t:"Diffida"},
  {t:"Ricorso", d:"come ultima strada", key:true}]},
{id:"s163", tipo:"numero", tema:"chiaro", sopratitolo:"I termini per chiedere differenze retributive",
  cifra:"5", testo:"anni, in generale.<br>**Prima ti muovi, più recuperi.**"},
{id:"s164", tipo:"frase", tema:"chiaro", sopratitolo:"La verifica mensile è un'abitudine",
  testo:"Come guardare il conto in banca: cinque minuti, **sempre lo stesso giorno**.",
  sotto:"Dopo tre mesi non ci pensi più — ed è quello il momento in cui l'errore, se arriva, lo prendi al volo."},
{id:"s165", tipo:"titolo", tema:"profondo",
  titolo:"La busta paga giusta<br>**non è scontata**.",
  sotto:"È il risultato di un contratto applicato bene, e di qualcuno che lo controlla. Anche scoprire che è tutto giusto vale quei cinque minuti."},

// ================= 10 · Assenze e busta paga ======================
{id:"s166", tipo:"copertina", tema:"profondo", modulo:"Capitolo 10",
  titolo:"Assenze<br>e busta paga", sottotitolo:"", ente:ENTE},

{id:"s167", tipo:"frase", tema:"chiaro", sopratitolo:"Le assenze",
  testo:"Il punto in cui la busta cambia **senza che tu abbia fatto niente di diverso** al lavoro.",
  sotto:"Malattia, permessi, congedi, sciopero: ognuno ha una regola economica diversa."},
{id:"s168", tipo:"frase", tema:"chiaro", sopratitolo:"La malattia",
  testo:"Nei **primi dieci giorni** di ogni episodio si perdono le voci accessorie.",
  sotto:"Dall'undicesimo il trattamento torna intero, nei limiti del comporto. Se ti ammali tre volte, la decurtazione scatta tre volte."},
{id:"s169", tipo:"griglia", tema:"chiaro", colonne:2,
  sopratitolo:"Le esclusioni — qui la decurtazione non si applica", celle:[
  {t:"**Ricovero** ospedaliero e giorni successivi"},
  {t:"**Day hospital**"},
  {t:"Terapie **salvavita**"},
  {t:"**Infortunio** sul lavoro"},
  {t:"Malattie per **causa di servizio**"},
  {t:"**Gravidanza a rischio**"}]},
{id:"s170", tipo:"barre", tema:"chiaro", sopratitolo:"Il comporto: fino a 18 mesi nei tre anni precedenti",
  unita:"%", etichetta:420, barre:[
  {et:"Primi 9 mesi", v:100, nota:"retribuzione intera"},
  {et:"Poi", v:90},
  {et:"Infine", v:50}]},
{id:"s171", tipo:"frase", tema:"chiaro", sopratitolo:"La legge 104",
  testo:"I tre giorni al mese sono **retribuiti** e utili a tutti gli effetti, anche per la tredicesima.",
  sotto:"Non devi vedere trattenute. Se il sistema li registra come permesso non retribuito, il netto scende: **fallo correggere subito**."},
{id:"s172", tipo:"barre", tema:"chiaro", sopratitolo:"I congedi parentali: quanto è coperto",
  unita:"%", etichetta:440, barre:[
  {et:"Maternità obbligatoria", v:100, nota:"cinque mesi"},
  {et:"Congedo parentale", v:30, nota:"alcuni mesi di più"}]},
{id:"s173", tipo:"frase", tema:"chiaro", sopratitolo:"Durante maternità e congedi",
  testo:"Si perdono le voci accessorie legate ai turni: **non lavori di notte, non ti pagano la notte**.",
  sotto:"Ma il nuovo contratto riconosce le indennità nelle ferie: è un principio che vale la pena ricordare al tavolo."},
{id:"s174", tipo:"confronto", tema:"chiaro", sopratitolo:"Lo sciopero", col:[
  {h:"Giornata intera", t:"la fissa mensile divisa per i giorni del mese, o per **26**"},
  {h:"Sciopero breve", t:"**a ore**"}],
  sotto:"La trattenuta compare nel mese successivo, con il riferimento alla data."},
{id:"s175", tipo:"frase", tema:"tenue", sopratitolo:"Le aspettative per motivi personali",
  testo:"Senza stipendio e **senza contributi**: la busta può arrivare a zero.",
  sotto:"O addirittura con un saldo negativo, se restano trattenute fisse come una cessione. Prima di chiederne una, fai due conti con noi."},
{id:"s176", tipo:"frase", tema:"chiaro", sopratitolo:"Il buono pasto",
  testo:"Il diritto nei turni di **almeno sei ore** è riconosciuto da molte sentenze, e oggi dal contratto.",
  sotto:"Non è in busta come voce di paga, ma può esserci come trattenuta di quota parte. Se nel tuo reparto viene negato, la CISL FP assiste i ricorsi."},
{id:"s177", tipo:"confronto", tema:"chiaro", sopratitolo:"Le ferie", col:[
  {h:"Di regola", t:"**non si pagano: si devono fare**"},
  {h:"Si monetizzano", t:"solo **alla cessazione**, se non è stato possibile goderle per cause non dipendenti da te"}],
  sotto:"Sono retribuite con la retribuzione fissa, e il nuovo contratto riconosce anche le indennità. Se ti dicono che le perdi, chiedi a noi."},
{id:"s178", tipo:"griglia", tema:"chiaro", colonne:1,
  sopratitolo:"Quello che invece è orario di lavoro, o è retribuito", celle:[
  {t:"**Formazione obbligatoria** e corsi aziendali — se cadono fuori turno, vanno recuperati o pagati"},
  {t:"Le **150 ore** per il diritto allo studio"},
  {t:"I **permessi per visite mediche**, entro il monte ore annuo"}]},
{id:"s179", tipo:"tabella", tema:"chiaro", sopratitolo:"Come ogni assenza tocca la busta — da leggere quando serve",
  colonne:["34%","33%","33%"],
  intestazioni:["Assenza","Fisso","Accessorio"],
  righe:[
   ["Malattia, primi 10 giorni","si:intero","no:si perde"],
   ["Malattia, dall'11°","si:intero","si:torna"],
   ["Legge 104","si:intero","si:intero"],
   ["Maternità obbligatoria","si:100%","no:si perde"],
   ["Sciopero","no:trattenuto","no:trattenuto"],
   ["Aspettativa personale","no:nessuno","no:nessuno"]]},

// ============= 11 · Leggiamo insieme un cedolino ==================
{id:"s180", tipo:"copertina", tema:"profondo", modulo:"Capitolo 11",
  titolo:"Leggiamo insieme<br>un cedolino", sottotitolo:"", ente:ENTE},

{id:"s181", tipo:"frase", tema:"chiaro", sopratitolo:"Adesso mettiamo insieme tutto",
  testo:"Il cedolino di ottobre di **Giulia**, infermiera — letto come faresti tu a casa.",
  sotto:"Con il prospetto turni di agosto accanto. Seguimi zona per zona."},
{id:"s182", tipo:"tabella", tema:"chiaro", sopratitolo:"1 · Intestazione — tutto corrisponde",
  colonne:["38%","62%"],
  intestazioni:["Riga","Che cosa dice"],
  righe:[
   ["Mese","Ottobre 2026, liquidazione stipendio"],
   ["Area e profilo","Professionisti della salute · infermiere · incarico base"],
   ["Rapporto","Normale, cioè tempo pieno"],
   ["Assunzione","2015 — quindi TFR"],
   ["Sede","Azienda Ospedale Università"]]},
{id:"s183", tipo:"frase", tema:"chiaro", sopratitolo:"2 · Voci fisse",
  testo:"Le stesse del mese prima, **stessi importi**.",
  sotto:"Tabellare, vacanza contrattuale, un differenziale, professionale specifica, specificità infermieristica, funzione parte fissa. Nessun cambiamento inatteso."},
{id:"s184", tipo:"tabella", tema:"chiaro", sopratitolo:"3 · Voci accessorie — contro il prospetto turni di agosto",
  colonne:["40%","30%","30%"],
  intestazioni:["Voce","In busta","Nei turni"],
  righe:[
   ["Giorni di turno","19","si:19"],
   ["Ore di notte","24","si:24, tre notti da otto"],
   ["Festivi","2","si:ferragosto e la domenica dopo"]],
  chiave:[]},
{id:"s185", tipo:"numero", tema:"chiaro", sopratitolo:"4 · Contributi — la somma delle righe col meno",
  cifra:"309", testo:"euro.<br>È il numero che tolgo dal lordo<br>per arrivare all'**imponibile fiscale**"},
{id:"s186", tipo:"tabella", tema:"chiaro", sopratitolo:"5 · Tasse",
  colonne:["58%","42%"],
  intestazioni:["Voce","Importo"],
  righe:[
   ["Imponibile fiscale","2.261 €"],
   ["si:IRPEF netta","184 €"],
   ["Addizionali dell'anno scorso, a rate","in busta"],
   ["Acconto della comunale","in busta"]],
  chiave:[1]},
{id:"s187", tipo:"frase", tema:"chiaro", sopratitolo:"6 · Trattenute varie",
  testo:"Contributo sindacale e **sei pasti** in mensa. Niente prestiti, niente recuperi.",
  sotto:"E le righe con l'asterisco, in fondo: imponibili e detrazioni. Le uso solo per ricontrollare i conti delle tasse."},
// Il piede per intero: e' la sottrazione del capitolo 7, fatta sui numeri veri.
{id:"s188", tipo:"tabella", tema:"chiaro", sopratitolo:"7 · Il piede — la sottrazione, fino all'accredito",
  colonne:["58%","42%"],
  intestazioni:["Voce","Importo"],
  righe:[
   ["Competenze lorde","2.570,96 €"],
   ["− Contributi e tasse","554,87 €"],
   ["− Ritenute varie","25,62 €"],
   ["Netto","1.990,47 €"],
   ["− Arrotondamento","0,47 €"],
   ["si:Netto a pagare — e in banca arrivano","1.990 €"]],
  chiave:[5]},
{id:"s189", tipo:"frase", tema:"chiaro", sopratitolo:"Cinque passi, cinque minuti",
  testo:"La busta di Giulia è **corretta**.",
  sotto:"Se al passo 3 avessi trovato 22 notti invece di 24, avrei già pronta la segnalazione: matricola, busta di ottobre, voce servizio notturno, riferimento agosto, 24 attese e 22 pagate, allegato il prospetto."},
{id:"s190", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"Secondo esercizio: una busta di dicembre. Quale merita una domanda?", voci:[
  {t:"La **tredicesima** con quantità 12"},
  {t:"Il **conguaglio IRPEF** a debito di 320 €"},
  {t:"Un **arretrato** con riferimento a settembre"},
  {t:"Una voce **recupero** di 90 € senza riferimento"}]},
{id:"s191", tipo:"frase", tema:"tenue", sopratitolo:"La quarta",
  testo:"Le prime tre hanno una spiegazione **nella busta stessa**. Il recupero no.",
  sotto:"La domanda è semplice: a cosa si riferisce, e dov'è il conteggio. Per iscritto, con matricola e mese."},
{id:"s192", tipo:"elenco", tema:"tenue", sopratitolo:"Terzo esercizio: la busta dopo una progressione — due segnalazioni, non una", voci:[
  {t:"**L'indennità è ancora quella vecchia**", d:"il tabellare nuovo è partito, ma l'indennità è rimasta quella dell'area di prima"},
  {t:"**Manca l'arretrato**", d:"dalla decorrenza indicata nell'accordo fino al primo mese pagato"}]},

// =============== 12 · Lo stipendio in un anno =====================
{id:"s193", tipo:"copertina", tema:"profondo", modulo:"Capitolo 12",
  titolo:"Lo stipendio<br>in un anno", sottotitolo:"", ente:ENTE},

{id:"s194", tipo:"frase", tema:"chiaro", sopratitolo:"Un'ultima prospettiva: l'anno intero",
  testo:"Una volta l'anno l'Azienda tira le somme nella **certificazione unica**.",
  sotto:"Saperla leggere serve per il 730, per i prestiti, per l'ISEE, per i bandi di concorso."},
{id:"s195", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Che cosa riporta la certificazione unica, entro marzo", celle:[
  {t:"Reddito **imponibile**"},
  {t:"Ritenute **IRPEF** e addizionali"},
  {t:"**Detrazioni** applicate"},
  {t:"Contributi **previdenziali**"},
  {t:"**Giorni** di lavoro"},
  {t:"Somme a **tassazione separata**"}]},
{id:"s196", tipo:"titolo", tema:"profondo",
  titolo:"I progressivi di dicembre<br>e la certificazione unica<br>**devono coincidere**.",
  sotto:"Se non coincidono, uno dei due è sbagliato — e il 730 si farà su numeri sbagliati."},
{id:"s197", tipo:"confronto", tema:"chiaro", sopratitolo:"Due numeri diversi, che i moduli chiedono spesso", col:[
  {h:"Retribuzione annua lorda", t:"competenze lorde × 12, più tredicesima e accessorio"},
  {h:"Reddito imponibile", t:"quello **fiscale**, più basso: usa la certificazione"}]},
{id:"s198", tipo:"impila", tema:"chiaro", sopratitolo:"Un anno con il nostro fac-simile",
  testa:"Dal lordo al netto", unita:"euro", segmenti:[
  {v:24000, t:"Netto in tasca", d:"quello che arriva in banca"},
  {v:11000, t:"Tasse e contributi", d:"IRPEF, addizionali, pensione e fondo", chiaro:true}]},
{id:"s199", tipo:"catena", tema:"chiaro", sopratitolo:"Il cerchio che si chiude ogni anno", passi:[
  {t:"Dodici buste", d:"più la tredicesima"},
  {t:"Dicembre", d:"il conguaglio"},
  {t:"Marzo", d:"la certificazione unica"},
  {t:"Primavera", d:"il 730"},
  {t:"Estate", d:"l'esito in busta", key:true}]},
{id:"s200", tipo:"tabella", tema:"chiaro", sopratitolo:"La busta paga parla a molti uffici — per questo deve essere giusta",
  colonne:["34%","66%"],
  intestazioni:["Per","Serve"],
  righe:[
   ["ISEE","il reddito di due anni prima"],
   ["Mutui e prestiti","la certificazione unica e le ultime buste"],
   ["Concorsi interni","spesso il profilo e l'anzianità nell'intestazione"]]},
{id:"s201", tipo:"frase", tema:"chiaro", sopratitolo:"Chi ha due lavori, o ha cambiato Azienda nell'anno",
  testo:"Due certificazioni uniche, da **sommare nel 730** — e quasi sempre esce un debito.",
  sotto:"Perché ciascun datore ha applicato le detrazioni per intero. Non è un errore: è il motivo per cui si fa la dichiarazione."},
{id:"s202", tipo:"tre", tema:"chiaro", sopratitolo:"I tre documenti che ricostruiscono un anno di lavoro", box:[
  {t:"Busta di dicembre", d:"nei progressivi c'è l'anno intero", key:true},
  {t:"Prospetto ferie"},
  {t:"Prospetto permessi"}]},

// ============ 13 · Le domande dello sportello =====================
{id:"s203", tipo:"copertina", tema:"profondo", modulo:"Capitolo 13",
  titolo:"Le domande<br>dello sportello", sottotitolo:"", ente:ENTE},

{id:"s204", tipo:"frase", tema:"chiaro", sopratitolo:"Chiudiamo con le domande che sentiamo più spesso",
  testo:"Risposte brevi, **da tenere a mente**."},
{id:"s205", tipo:"tre", tema:"chiaro", sopratitolo:"«Perché il mio netto è più basso di quello di un collega?»", box:[
  {t:"Accessorio diverso"}, {t:"Familiari a carico diversi"}, {t:"Aliquota marginale diversa"}]},
{id:"s206", tipo:"frase", tema:"chiaro", sopratitolo:"«Posso avere la busta in formato cartaceo?»",
  testo:"Sì — ma oggi quasi tutte le Aziende la mettono nel **portale del dipendente**.",
  sotto:"Scaricala e archiviala ogni mese: il portale può non conservarla per sempre, e tra qualche anno potresti averne bisogno."},
{id:"s207", tipo:"citazione", tema:"chiaro",
  testo:"Ho fatto una notte in più che non è stata pagata: quanto tempo ho per chiederla?",
  fonte:"Il prima possibile — ma il diritto resta per anni"},
{id:"s208", tipo:"frase", tema:"chiaro", sopratitolo:"«Mi hanno tolto dei soldi con la voce recupero: possono?»",
  testo:"Sì, se la somma non era dovuta **e lo dimostrano**.",
  sotto:"Ma devono darti il conteggio, e non possono trattenere tutto in una volta se l'importo è alto. Chiedi la rateizzazione — e se è vecchio di anni, fatti aiutare a verificare la prescrizione."},
{id:"s209", tipo:"numero", tema:"chiaro", sopratitolo:"«Il buono pasto mi spetta col turno di sette ore?»",
  cifra:"6", testo:"ore di turno: da lì il **diritto è riconosciuto**.<br>Se nel tuo reparto non viene dato, segnalacelo"},
{id:"s210", tipo:"frase", tema:"chiaro", sopratitolo:"«La tredicesima è più bassa dello stipendio: è normale?»",
  testo:"Sì. Si calcola **solo sulle voci fisse**, ed è tassata senza detrazioni.",
  sotto:"Per questo il netto di dicembre non è il doppio di un mese normale."},
{id:"s211", tipo:"confronto", tema:"chiaro", sopratitolo:"«Passo da turni a orario diurno: cosa perdo?»", col:[
  {h:"Perdi", t:"le indennità di **turno**, di **notte** e i **festivi**"},
  {h:"Non cambia", t:"il **fisso**"}],
  sotto:"E se il nuovo reparto ha indennità proprie — pronto soccorso, terapia intensiva — devono partire dal primo giorno."},
{id:"s212", tipo:"catena", tema:"chiaro", sopratitolo:"«Il rinnovo è firmato: quando vedo gli aumenti?»", passi:[
  {t:"Ipotesi firmata", d:"ancora niente in busta"},
  {t:"Certificazione dei costi"},
  {t:"Via libera del Governo"},
  {t:"Firma definitiva", d:"da qui, in genere entro due o tre mesi", key:true}]},
{id:"s213", tipo:"frase", tema:"chiaro", sopratitolo:"«Posso far controllare la busta se non sono iscritta?»",
  testo:"Puoi venire in sede e **parlare con noi**.",
  sotto:"Le verifiche complete, l'assistenza legale e il 730 con il CAF sono servizi per gli iscritti: il contributo sindacale che hai visto in busta serve anche a questo."},
{id:"s214", tipo:"frase", tema:"chiaro", sopratitolo:"«Ho un part time e faccio le notti: le indennità sono ridotte?»",
  testo:"**No.** La notte che fai è pagata come quella di un collega a tempo pieno.",
  sotto:"Il fisso è riproporzionato, le voci accessorie no. Se vedi un'indennità notturna ridotta in proporzione al part time, **è un errore**."},
{id:"s215", tipo:"elenco", tema:"chiaro", numerato:true,
  sopratitolo:"«Mi conviene aderire al fondo pensione?» — per la maggior parte sì, per tre motivi", voci:[
  {t:"La **quota dell'Azienda**", d:"che altrimenti non ricevi"},
  {t:"La **deducibilità fiscale**"},
  {t:"La pensione pubblica sarà **più bassa**", d:"per chi è nel sistema contributivo"}]},
{id:"s216", tipo:"titolo", tema:"profondo",
  titolo:"Un'ora fa la busta paga<br>era un foglio di codici.<br>**Adesso sai dove guardare.**",
  sotto:"Conserva le buste, controlla ogni mese, segnala subito. E quando serve, portala alla CISL FP di Padova e Rovigo: la leggiamo insieme, voce per voce."},
// s217 dice «qui a schermo»: la slide DEVE portare i recapiti, e i recapiti
// veri non li ho. Le quattro voci sono segnaposto dichiarati, come il
// rettangolo grigio del marchio: cosi' e' impossibile consegnarla per sbaglio.
// Vedi slide/marchio/LEGGIMI.md.
{id:"s217", tipo:"icone", tema:"chiaro", sopratitolo:"CISL FP Padova Rovigo — recapiti e orari",
  voci:RECAPITI},

{id:"s218", tipo:"copertina", tema:"profondo",
  modulo:"Grazie",
  titolo:"Porta la tua<br>busta paga.", sottotitolo:"La leggiamo insieme, voce per voce",
  ente:ENTE},

];
