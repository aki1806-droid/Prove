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

];
