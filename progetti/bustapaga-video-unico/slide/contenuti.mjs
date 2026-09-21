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
{id:"s016", tipo:"frase", tema:"chiaro", sopratitolo:"Tipo di rapporto di lavoro",
  testo:"*Normale* significa **tempo pieno**.",
  sotto:"In part time deve comparire la **percentuale corretta**: lo stipendio fisso viene riproporzionato proprio su quella. Un errore qui si trascina su tutte le voci."},
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
{id:"s033", tipo:"frase", tema:"chiaro", sopratitolo:"Il dubbio più frequente",
  testo:"«Ho fatto le notti ad **agosto**: perché non le trovo nella busta di agosto?»",
  sotto:"Perché le voci legate alle presenze si elaborano dopo la chiusura del mese. Non è un errore: è la colonna **riferimento** che te lo dice."},
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
{id:"s049", tipo:"frase", tema:"chiaro", sopratitolo:"Perché gli arretrati sono più bassi del previsto",
  testo:"Una parte l'hai **già ricevuta**, mese per mese, come vacanza contrattuale.",
  sotto:"È il motivo per cui l'importo non corrisponde a quello che leggi nelle tabelle."},
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
{id:"s055", tipo:"impila", tema:"chiaro", sopratitolo:"Di che cosa è fatta la retribuzione fissa",
  testa:"Un esempio", unita:"euro", segmenti:[
  {v:2056, t:"Tabellare", d:"la paga base dell'area"},
  {v:186,  t:"Differenziali", d:"quelli che hai acquisito"},
  {v:188,  t:"Indennità", d:"legate al profilo", chiaro:true}]},
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
{id:"s065", tipo:"impila", tema:"chiaro", sopratitolo:"Come si compone una busta tipo",
  testa:"Lordo del mese", unita:"euro", segmenti:[
  {v:2430, t:"Base fissa", d:"uguale ogni mese"},
  {v:141,  t:"Strato variabile", d:"cambia con i turni", chiaro:true}]},
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
{id:"s070", tipo:"frase", tema:"chiaro", sopratitolo:"Nel nostro esempio, busta di ottobre",
  testo:"19 giorni di turno, 24 ore notturne, 2 festivi — tutti con riferimento **agosto**.",
  sotto:"Quindi il confronto va fatto con i turni di agosto."},
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
{id:"s095", tipo:"frase", tema:"chiaro", sopratitolo:"Previdenza complementare: due numeri per decidere",
  testo:"Quello che versi **esce dall'imponibile**, quindi riduce le tasse.",
  sotto:"La quota minima tua e quella dell'Azienda le fissa l'accordo istitutivo. Alla pensione hai rendita o capitale."},
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
{id:"s105", tipo:"frase", tema:"chiaro", sopratitolo:"Il taglio del cuneo, dal 2025 fiscale",
  testo:"Fino a 20.000 € una somma **esente**; da 20.000 a 40.000 € una **detrazione** fino a 1.000 € l'anno.",
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
{id:"s111", tipo:"frase", tema:"chiaro", sopratitolo:"Perché due colleghi con lo stesso profilo hanno IRPEF diverse",
  testo:"Notti, festivi, familiari a carico, seconda entrata in famiglia.",
  sotto:"Divisa per dodici, quell'IRPEF netta è intorno ai 400 € al mese. Nel fac-simile, con un reddito più basso, è di 184 €."},
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
{id:"s125", tipo:"frase", tema:"chiaro", sopratitolo:"Sotto i totali trovi i progressivi",
  testo:"Le somme **dall'inizio dell'anno**: imponibile, ritenute, detrazioni, aliquota media.",
  sotto:"Servono per un controllo veloce, e per capire già in autunno se a dicembre ti aspetta un conguaglio."},
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
{id:"s130", tipo:"frase", tema:"chiaro", sopratitolo:"Le assenze non retribuite",
  testo:"La colonna **quantità** ti dice quanti giorni sono stati decurtati.",
  sotto:"Riduzione per i primi giorni di malattia, aspettativa non retribuita, sciopero. Confrontala con le assenze reali."},
{id:"s131", tipo:"frase", tema:"chiaro", sopratitolo:"Un mese con un recupero di 300 €",
  testo:"Le competenze lorde non cambiano, ma le ritenute varie **salgono** e il netto **scende**.",
  sotto:"Se non sai perché, la cifra ti sembra un errore. Se sai leggere il piede, vedi subito dove è finita."},
{id:"s132", tipo:"frase", tema:"tenue", sopratitolo:"Un errore da non fare",
  testo:"Confondere il **netto** con il **netto a pagare**.",
  sotto:"Il netto è il risultato della sottrazione; il netto a pagare è quello arrotondato. Se confronti con l'accredito in banca devi usare il **secondo**."},
{id:"s133", tipo:"titolo", tema:"profondo",
  titolo:"Il fondo credito lo paghi<br>ogni mese. **Usalo.**",
  sotto:"L'INPS offre prestiti a condizioni spesso migliori delle finanziarie che si presentano in reparto. Prima di firmare una cessione, guarda tasso e assicurazione."},

];
