// Contenuto delle 50 scene della lezione 2.6. *accento*  **accento in semibold**

const VOCE = [
 {n:"1", t:"**Near miss** — l'errore *non* raggiunge il paziente: intercettato in tempo"},
 {n:"2", t:"**Evento avverso** — danno involontario *dovuto alle cure*, non alla malattia"},
 {n:"3", t:"**Evento sentinella** — evento avverso di *particolare gravità*: indagine immediata"},
 {n:"4", t:"**Complicanza** — evento sfavorevole *atteso*, non necessariamente evitabile", key:true},
];

const LATENTI = [
 {icona:"avviso", t:"Farmaci LASA vicini", d:"simili nell'aspetto o nel nome, riposti accanto"},
 {icona:"orologio", t:"Turni con carichi insostenibili", d:"la stanchezza è una condizione, non una colpa"},
 {icona:"documento", t:"Una procedura ambigua", d:"scritta una volta e mai riletta"},
 {icona:"divieto", t:"L'assenza di un doppio controllo", d:"la barriera che non è mai stata costruita", key:true},
];

const FATTORI = [
 {icona:"persona", t:"Umani", d:"stanchezza, distrazione, addestramento"},
 {icona:"ingranaggio", t:"Organizzativi", d:"carichi, procedure, turni"},
 {icona:"lucchetto", t:"Tecnologici", d:"dispositivi, software, allarmi"},
 {icona:"ospedale", t:"Ambientali", d:"spazi, rumore, illuminazione"},
 {icona:"chat", t:"Comunicativi", d:"consegne, passaggi, ordini verbali", key:true},
];

const RACC = [
 {n:"1", t:"Cloruro di potassio e soluzioni concentrate"},
 {n:"2", t:"Ritenzione di garze e strumenti"},
 {n:"3", t:"Identificazione di paziente, sito e procedura"},
 {n:"5", t:"Reazione trasfusionale da incompatibilità AB0"},
 {n:"7", t:"**Errori in terapia**", key:true},
 {n:"8", t:"Violenza agli operatori"},
 {n:"12", t:"**Farmaci LASA**", key:true},
 {n:"13", t:"**Cadute**", key:true},
 {n:"17", t:"Riconciliazione della terapia"},
 {n:"19", t:"Manipolazione delle forme orali solide"},
];

// Sette barriere non stanno in una fila di icone: «icone» e' un flex orizzontale
// e sopra le cinque voci le colonne diventano illeggibili, qualunque sia il corpo.
// Sette voci vogliono una griglia.
const BARRIERE = [
 {n:"1", t:"**Identificazione attiva** — nome e data di nascita, e il braccialetto"},
 {n:"2", t:"**Doppio controllo** — farmaci ad alto rischio e trasfusioni"},
 {n:"3", t:"**Check-list** — in sala e nelle procedure invasive"},
 {n:"4", t:"**Standardizzazione** — di concentrazioni e diluizioni"},
 {n:"5", t:"**Fuori reparto le concentrate** — non stanno in corsia"},
 {n:"6", t:"**Riconciliazione e consegne** — a ogni passaggio di setting"},
 {n:"7", t:"**Segnalazione** — la barriera che alimenta tutte le altre", key:true},
];

const MEMO = [
 {t:"**Near miss** non raggiunge il paziente, l'**evento avverso** sì"},
 {t:"L'**evento sentinella** impone indagine immediata"},
 {t:"La **complicanza non è un errore**"},
 {t:"Reason: errore **attivo** e **latente** — formaggio svizzero, barriere multiple"},
 {t:"**Incident reporting e RCA** reattivi, **FMEA** proattiva"},
 {t:"Il reporting è **volontario e non punitivo** — e copre anche i near miss"},
 {t:"Raccomandazioni **7, 12, 13**"},
 {t:"Il doppio controllo funziona solo se **indipendente**"},
];

export const SCENE = [
{id:"s01", tipo:"copertina", tema:"chiaro",
  modulo:"Modulo 2 · Metodologia, documentazione e sicurezza",
  titolo:"Rischio clinico e<br>sicurezza del paziente", sottotitolo:"Come un principio giuridico diventa un metodo",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},

{id:"s02", tipo:"norma", tema:"chiaro", sopratitolo:"Il punto di partenza — lezione 1.5",
  etichetta:"Legge", sigla:"24/2017 · art. 1",
  testo:"La **sicurezza delle cure** è parte costitutiva del **diritto alla salute**, e **tutto il personale** vi concorre."},

{id:"s03", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Che cosa facciamo oggi",
  da:{h:"Nella 1.5", t:"Un **principio**<br>giuridico"},
  a:{h:"Oggi", t:"Un **metodo**<br>di lavoro"},
  sotto:"Fra dire che la sicurezza è un diritto e sapere come si costruisce ci sono cinquant'anni di studi sull'errore."},

{id:"s04", tipo:"titolo", tema:"tenue", sopratitolo:"Perché rende nei concorsi",
  titolo:"Organizzazione,<br>**responsabilità**<br>e pratica quotidiana.",
  sotto:"Tre cose in una sola domanda."},

{id:"s05", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0],
  sopratitolo:"Il vocabolario esatto", celle:VOCE},
{id:"s06", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false, attive:[0,1,2],
  sopratitolo:"Il vocabolario esatto", celle:VOCE},
{id:"s07", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Il vocabolario esatto", celle:VOCE},

{id:"s08", tipo:"tabella", tema:"chiaro", sopratitolo:"Le tre distinzioni da fissare",
  intestazioni:["Il caso","L'errore","Il danno"], colonne:["44%","28%","28%"],
  righe:[
   ["**Near miss**","c'è stato","**no**"],
   ["**Evento avverso**","c'è stato","**sì**"],
   ["**Complicanza**","**non c'è**","possibile"]]},

{id:"s09", tipo:"trappola", tema:"profondo", sopratitolo:"Lo sbaglio concettuale più comune",
  righe:[
   {sb:"«Una deiscenza è sempre un **errore**»",
    ok:"In un paziente ad alto rischio, gestito correttamente, è una **complicanza**"}]},

{id:"s10", tipo:"titolo", tema:"chiaro", sopratitolo:"James Reason",
  titolo:"Due letture dell'errore —<br>e la scelta **decide tutto**<br>quello che viene dopo.",
  sotto:"Persona o sistema."},

{id:"s11", tipo:"confronto", tema:"chiaro", sopratitolo:"Persona o sistema",
  col:[
   {h:"Approccio alla persona", t:"Cerca il **colpevole**: individua chi ha sbagliato e lo sanziona"},
   {h:"Approccio al sistema", t:"Gli umani sbagliano: si interviene sulle **difese**, non sulle persone"}]},

{id:"s12", tipo:"confronto", tema:"chiaro", sopratitolo:"La distinzione fondamentale",
  col:[
   {h:"Errore attivo", t:"Dell'operatore in **prima linea**, con effetto **immediato**"},
   {h:"Errore latente", t:"Di chi **progetta** l'organizzazione: resta **silente** anche per anni"}]},

{id:"s13", tipo:"titolo", tema:"chiaro", sopratitolo:"L'errore latente",
  titolo:"Resta silente<br>**anche per anni** —<br>finché le circostanze<br>non lo fanno emergere.",
  sotto:"Non è un errore di qualcuno: è un errore di qualcosa."},

{id:"s14", tipo:"icone", tema:"chiaro", sopratitolo:"Quattro errori latenti", voci:LATENTI},

{id:"s15", tipo:"titolo", tema:"chiaro", sopratitolo:"Il modello del formaggio svizzero",
  titolo:"Nessuna barriera<br>è **integra**.",
  sotto:"Ciascuna ha i suoi buchi: le criticità latenti."},

{id:"s16", tipo:"catena", tema:"chiaro", sopratitolo:"L'incidente accade quando i buchi si allineano",
  passi:[
   {t:"Identificazione", d:"il braccialetto non c'è"},
   {t:"Prescrizione", d:"la sigla è ambigua"},
   {t:"Somministrazione", d:"il doppio controllo salta"},
   {t:"Il danno", d:"i tre buchi si sono allineati", key:true}]},

{id:"s17", tipo:"tre", tema:"profondo", sopratitolo:"Perché sono tre e non una",
  box:[
   {n:"1", t:"Doppio controllo", d:"sulla persona che esegue"},
   {n:"2", t:"Check-list", d:"sul processo"},
   {n:"3", t:"Braccialetto", d:"sull'identità", key:true}]},

{id:"s18", tipo:"confronto", tema:"chiaro", sopratitolo:"Le due famiglie di strumenti",
  col:[
   {h:"Reattivi — guardano indietro", t:"Incident reporting · **root cause analysis** · audit clinico · significant event audit"},
   {h:"Proattivo — guarda avanti", t:"**FMEA / FMECA**: analizza il processo *prima* che accada qualcosa"}]},

{id:"s19", tipo:"trappola", tema:"chiaro", sopratitolo:"La domanda ricorrente",
  righe:[
   {sb:"«Quale strumento è **proattivo**?»",
    ok:"**FMEA / FMECA** — tutti gli altri guardano indietro"}]},

{id:"s20", tipo:"tre", tema:"chiaro", sopratitolo:"L'incident reporting",
  box:[
   {n:"1", t:"Volontario", d:"«perché dovrei?»"},
   {n:"2", t:"Non punitivo", d:"«che cosa rischio?»"},
   {n:"3", t:"Per apprendere", d:"«a che cosa serve?»", key:true}]},

{id:"s21", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Che cosa raccoglie la scheda — e che cosa no",
  celle:[
   {n:"✓", t:"**Che cosa** è accaduto"},
   {n:"✓", t:"**Dove** e **quando**"},
   {n:"✓", t:"In quali **condizioni**"},
   {n:"✗", t:"Di **chi** è la colpa — la domanda non c'è, ed è una scelta", key:true}]},

{id:"s22", tipo:"titolo", tema:"chiaro", sopratitolo:"E soprattutto",
  titolo:"Si segnalano<br>anche i **near miss**.",
  sotto:"Apprendimento gratuito: nessuno si è fatto male, e il sistema ha mostrato dove si rompe."},

{id:"s23", tipo:"griglia", tema:"chiaro", colonne:1, spunta:false,
  sopratitolo:"Due precisazioni che valgono una domanda",
  celle:[
   {n:"1", t:"L'incident reporting **non sostituisce** la registrazione in **cartella clinica**"},
   {n:"2", t:"E **non sostituisce** gli **obblighi di comunicazione** previsti dalla legge", key:true}]},

{id:"s24", tipo:"tre", tema:"chiaro", sopratitolo:"Tre verbi, non tre modi di dire lo stesso",
  box:[
   {n:"1", t:"Segnalo", d:"al gestore del rischio"},
   {n:"2", t:"Registro", d:"in cartella clinica"},
   {n:"3", t:"Comunico", d:"secondo gli obblighi di legge", key:true}]},

{id:"s25", tipo:"catena", tema:"chiaro", sopratitolo:"La root cause analysis",
  passi:[
   {t:"Sequenza", d:"ricostruire che cosa è accaduto"},
   {t:"Fattori contribuenti", d:"cinque famiglie"},
   {t:"Cause radice", d:"chiedendosi «perché?» finché non si arriva"},
   {t:"Piano d'azione", d:"con responsabili e tempi", key:true}]},

{id:"s26", tipo:"icone", tema:"chiaro", sopratitolo:"I fattori contribuenti — cinque famiglie, si guardano tutte",
  voci:FATTORI},

{id:"s27", tipo:"trappola", tema:"profondo", sopratitolo:"Dove finisce un'analisi fatta bene",
  righe:[
   {sb:"L'analisi finisce con **un nome**",
    ok:"L'analisi finisce con **un'azione** — responsabili e tempi"}]},

{id:"s28", tipo:"titolo", tema:"chiaro", sopratitolo:"Gli eventi sentinella",
  titolo:"Di particolare **gravità** —<br>indicativi di una<br>**disfunzione del sistema**.",
  sotto:"Indagine immediata e misure correttive."},

{id:"s29", tipo:"norma", tema:"chiaro", sopratitolo:"Il monitoraggio nazionale",
  etichetta:"Sistema", sigla:"SIMES",
  testo:"**Sistema informativo per il monitoraggio degli errori in sanità.** La sigla va saputa per esteso: è quella che si chiede allo scritto."},

{id:"s30", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1],
  sopratitolo:"Le Raccomandazioni ministeriali", celle:RACC},
{id:"s31", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3,4],
  sopratitolo:"Le Raccomandazioni ministeriali", celle:RACC},
{id:"s32", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Le Raccomandazioni ministeriali", celle:RACC},

{id:"s33", tipo:"tre", tema:"chiaro", cifre:true, sopratitolo:"Se ne ricordi tre",
  box:[
   {n:"1", t:"7", d:"**Errori in terapia**"},
   {n:"2", t:"12", d:"**Farmaci LASA** — simili nell'aspetto o nel nome"},
   {n:"3", t:"13", d:"**Cadute**", key:true}]},

{id:"s34", tipo:"titolo", tema:"chiaro", sopratitolo:"E se ne ricordi una sola",
  titolo:"La **numero 7**.",
  sotto:"Errori in terapia: è la raccomandazione che compare più spesso nei quiz e nei casi."},

{id:"s35", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1],
  sopratitolo:"Le barriere nella pratica quotidiana", celle:BARRIERE},
{id:"s36", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false, attive:[0,1,2,3],
  sopratitolo:"Le barriere nella pratica quotidiana", celle:BARRIERE},
{id:"s37", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Le barriere nella pratica quotidiana", celle:BARRIERE},

{id:"s38", tipo:"sostituzione", tema:"chiaro", sopratitolo:"Il doppio controllo fatto male",
  da:{h:"Insieme", t:"Il secondo **conferma**<br>ciò che il primo ha detto"},
  a:{h:"Indipendente", t:"Ciascuno verifica **da solo**,<br>poi ci si confronta"},
  sotto:"Un effetto noto e misurato: guardare insieme la stessa fiala non è un controllo."},

{id:"s39", tipo:"titolo", tema:"profondo", sopratitolo:"La frase che all'orale fa impressione",
  titolo:"Non è un controllo.<br>È **un'eco**."},

{id:"s40", tipo:"titolo", tema:"chiaro", sopratitolo:"L'equivoco più diffuso",
  titolo:"**No blame** non significa<br>assenza di responsabilità.",
  sotto:"Significa che la risposta di sistema all'errore non è la caccia al colpevole."},

{id:"s41", tipo:"titolo", tema:"profondo", sopratitolo:"Perché punire non funziona",
  titolo:"Un sistema che punisce<br>non diventa più sicuro:<br>diventa più **silenzioso**.",
  sotto:"E il silenzio somiglia alla sicurezza."},

{id:"s42", tipo:"scala", tema:"chiaro", sopratitolo:"Just culture · tre categorie, tre risposte",
  gradini:[
   {n:"1", t:"Errore umano", d:"si sostiene chi ha sbagliato e si corregge il sistema"},
   {n:"2", t:"Comportamento a rischio", d:"la scorciatoia consapevole ma non malevola: si toglie l'incentivo"},
   {n:"3", t:"Condotta temeraria o dolosa", d:"risposta disciplinare", key:true}]},

{id:"s43", tipo:"griglia", tema:"chiaro", colonne:2, spunta:false,
  sopratitolo:"Dopo un evento avverso grave — l'impatto sull'operatore",
  celle:[
   {n:"1", t:"Senso di colpa"},
   {n:"2", t:"Insicurezza nelle decisioni"},
   {n:"3", t:"Disturbi del sonno"},
   {n:"4", t:"Fino all'**abbandono della professione**", key:true}]},

{id:"s44", tipo:"tre", tema:"chiaro", sopratitolo:"Le tre vittime di un evento avverso",
  box:[
   {n:"1", t:"Il paziente", d:"la prima vittima"},
   {n:"2", t:"L'operatore", d:"la **seconda vittima**: lasciato solo, è meno sicuro nei mesi dopo", key:true},
   {n:"3", t:"L'organizzazione", d:"la terza"}]},

{id:"s45", tipo:"catena", tema:"chiaro", sopratitolo:"La comunicazione trasparente dell'evento avverso",
  passi:[
   {t:"Informare", d:"che cosa è accaduto"},
   {t:"Spiegare", d:"perché"},
   {t:"Esprimere rammarico", d:"senza attribuire colpe"},
   {t:"Dire le azioni", d:"che cosa si farà perché non si ripeta", key:true}]},

{id:"s46", tipo:"titolo", tema:"chiaro", sopratitolo:"Il dato controintuitivo ma documentato",
  titolo:"La trasparenza<br>**riduce** il contenzioso.",
  sotto:"Chi riceve una spiegazione ricorre meno al giudice."},

{id:"s47", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2],
  sopratitolo:"Gli otto punti", celle:MEMO},
{id:"s48", tipo:"griglia", tema:"chiaro", colonne:1, attive:[0,1,2,3,4,5],
  sopratitolo:"Gli otto punti", celle:MEMO},
{id:"s49", tipo:"griglia", tema:"chiaro", colonne:1,
  sopratitolo:"Gli otto punti", celle:MEMO},

{id:"s50", tipo:"copertina", tema:"profondo",
  modulo:"Prossima lezione",
  titolo:"2.7", sottotitolo:"Comunicazione clinica<br>e continuità assistenziale",
  ente:"CISL FP Padova Rovigo · Concorso Azienda Zero"},
];
